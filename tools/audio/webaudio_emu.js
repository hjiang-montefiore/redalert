/* ============ tools/audio/webaudio_emu.js - offline Web Audio for jsc ============

   js/audio.js makes every sound in the game at runtime through the Web Audio
   graph, and the owner's rule is that nothing launches a browser here. This file is
   a Web Audio implementation in plain JavaScript so that audio.js can run under
   JavaScriptCore unchanged and be rendered to samples: the WAVs, the
   spectrograms and the numbers in tools/audio/ all come out of it.

   SCOPE: exactly the part of the API that audio.js uses, taken from the spec
   (W3C Web Audio API 1.0) rather than from any one browser:
     AudioContext / OfflineAudioContext, AudioBuffer, AudioParam automation
     (setValueAtTime, linearRampToValueAtTime, exponentialRampToValueAtTime,
     setTargetAtTime, setValueCurveAtTime, cancelScheduledValues,
     cancelAndHoldAtTime, the value setter, a-rate / k-rate, and modulation by
     node.connect(param)), GainNode, BiquadFilterNode (all eight types),
     OscillatorNode (band-limited sine/square/sawtooth/triangle),
     AudioBufferSourceNode (loop, offset, playbackRate), WaveShaperNode (none,
     2x, 4x oversampling), DynamicsCompressorNode, DelayNode, StereoPannerNode.
   Anything else audio.js might start calling (a convolver, an analyser, a
   PannerNode...) throws "not emulated" and is logged in WebAudioEmu.unsupported,
   so the tool fails loudly instead of rendering a quiet lie.

   Processing follows the spec's model: the graph is pulled once per 128-frame
   render quantum from the destination, inputs are summed with the "speakers"
   up/down-mix rules. A mono voice reaching the stereo destination is copied
   to both sides at full level, while a StereoPanner puts it at -3 dB a side
   even at centre - so a gun exactly under the camera, which audio.js gives
   no panner at all (pan 0 is falsy), measures 2.83 dB more energy than the
   same 125 mm shot 1 px off centre. A browser does the same; the tool shows
   it.

   WHERE IT IS NOT A BROWSER - read tools/audio/audition.py's header for the
   full list; in short: the compressor's envelope detector and knee are "a
   reasonable compressor", not Chrome's kernel; oscillator band-limiting picks
   one of 112 wavetables (the top partial always within a semitone of
   Nyquist) instead of crossfading two; the 2x oversampler is a 63-tap
   halfband, not Chrome's; sub-sample start times round up to the next frame.
   Levels agree with the spec's formulas to a hundredth of a dB
   (tools/audio/selftest.js checks them); timbre at the limiter is close, not
   identical.
   ========================================================================= */

var WebAudioEmu = (function () {
  "use strict";

  var RQ = 128;                                   // render quantum, frames
  var BIG = 3.4028234663852886e38;                // most-positive-single-float
  var TWO_PI = 2 * Math.PI;
  var unsupported = [];

  function clampN(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function err(name, msg) { var e = new Error(msg); e.name = name; return e; }

  /* ============================== AudioBuffer ============================== */
  function AudioBuffer(opts) {
    var n = (opts.numberOfChannels | 0) || 1, len = opts.length | 0, sr = +opts.sampleRate;
    if (len < 1 || !(sr > 0) || n < 1 || n > 32) throw err("NotSupportedError", "bad AudioBuffer " + JSON.stringify(opts));
    this.numberOfChannels = n; this.length = len; this.sampleRate = sr;
    this.duration = len / sr;
    this._ch = [];
    for (var c = 0; c < n; c++) this._ch.push(new Float32Array(len));
  }
  AudioBuffer.prototype.getChannelData = function (c) {
    if (c < 0 || c >= this.numberOfChannels) throw err("IndexSizeError", "channel " + c);
    return this._ch[c];
  };
  AudioBuffer.prototype.copyFromChannel = function (dest, c, start) {
    start = start | 0;
    var src = this.getChannelData(c);
    dest.set(src.subarray(start, Math.min(src.length, start + dest.length)));
  };
  AudioBuffer.prototype.copyToChannel = function (source, c, start) {
    start = start | 0;
    var dst = this.getChannelData(c);
    dst.set(source.subarray(0, Math.max(0, Math.min(source.length, dst.length - start))), start);
  };

  /* =============================== AudioParam ===============================
     The timeline is a sorted event list evaluated exactly as the spec's
     "Computation of Value" section describes: a ramp runs from the time and
     value of the event BEFORE it; a setTarget decays from whatever value the
     timeline had at its start time; a ramp scheduled with no event before it
     behaves as if setValueAtTime(current value, currentTime) had been called
     first (that is the case in audio.js's beep(), which ramps an oscillator's
     frequency with nothing scheduled ahead of it). Events wholly in the past
     are pruned as rendering passes them, so a param driven every frame (the
     intensity bed) does not grow a list thousands long.                     */
  var SET = 0, LIN = 1, EXP = 2, TGT = 3, CRV = 4;

  function AudioParam(ctx, def, min, max, rate) {
    this._ctx = ctx;
    this.defaultValue = def;
    this.minValue = min === undefined ? -BIG : min;
    this.maxValue = max === undefined ? BIG : max;
    this.automationRate = rate || "a-rate";
    this._v = def;             // [[current value]]
    this._base = def;          // value before the first retained event
    this._ev = [];
    this._dirty = false;
    this._k = -1;
    this._in = [];             // nodes modulating this param
    this._buf = new Float32Array(RQ);
    this._cq = -1;
    this._const = true;
    this._cv = def;
  }
  Object.defineProperty(AudioParam.prototype, "value", {
    get: function () { return this._v; },
    set: function (v) {
      v = +v;
      if (!isFinite(v)) throw new TypeError("AudioParam value must be finite");
      /* spec: assign [[current value]] and call setValueAtTime(v, currentTime) */
      this._v = clampN(v, this.minValue, this.maxValue);
      this.setValueAtTime(v, this._ctx.currentTime);
    },
  });
  /* spec: a negative or non-finite time throws; a time already in the past
     is clamped to currentTime */
  AudioParam.prototype._chkT = function (t, what) {
    if (!isFinite(t) || t < 0) throw new RangeError(what + ": time must be finite and >= 0, got " + t);
    return Math.max(+t, this._ctx.currentTime);
  };
  AudioParam.prototype._insert = function (e) {
    var ev = this._ev, i = ev.length;
    /* same-time events keep insertion order: the new one goes after them */
    while (i > 0 && ev[i - 1].t > e.t) i--;
    ev.splice(i, 0, e);
    this._dirty = true;
    this._ctx._autoEvents++;
    return this;
  };
  AudioParam.prototype._implicitStart = function (t) {
    var ev = this._ev;
    for (var i = 0; i < ev.length; i++) if (ev[i].t <= t) return;
    var now = this._ctx.currentTime;
    if (now < t) this._insert({ type: SET, t: now, v: this._v });
  };
  AudioParam.prototype.setValueAtTime = function (v, t) {
    t = this._chkT(t, "setValueAtTime");
    if (!isFinite(v)) throw new TypeError("setValueAtTime: value");
    return this._insert({ type: SET, t: t, v: +v });
  };
  AudioParam.prototype.linearRampToValueAtTime = function (v, t) {
    t = this._chkT(t, "linearRampToValueAtTime");
    if (!isFinite(v)) throw new TypeError("linearRampToValueAtTime: value");
    this._implicitStart(t);
    return this._insert({ type: LIN, t: t, v: +v });
  };
  AudioParam.prototype.exponentialRampToValueAtTime = function (v, t) {
    t = this._chkT(t, "exponentialRampToValueAtTime");
    if (!isFinite(v) || v === 0) throw new RangeError("exponentialRampToValueAtTime: value must be non-zero, got " + v);
    this._implicitStart(t);
    return this._insert({ type: EXP, t: t, v: +v });
  };
  AudioParam.prototype.setTargetAtTime = function (v, t, tau) {
    t = this._chkT(t, "setTargetAtTime");
    if (!(tau >= 0)) throw new RangeError("setTargetAtTime: timeConstant must be >= 0");
    if (tau === 0) return this._insert({ type: SET, t: t, v: +v });
    return this._insert({ type: TGT, t: t, v: +v, tau: +tau });
  };
  AudioParam.prototype.setValueCurveAtTime = function (values, t, dur) {
    t = this._chkT(t, "setValueCurveAtTime");
    if (!(dur > 0) || !values || values.length < 2) throw new RangeError("setValueCurveAtTime: need >= 2 values and duration > 0");
    return this._insert({ type: CRV, t: t, v: values[values.length - 1], curve: Float32Array.from(values), dur: +dur });
  };
  AudioParam.prototype.cancelScheduledValues = function (t) {
    t = this._chkT(t, "cancelScheduledValues");
    var ev = this._ev;
    for (var i = ev.length - 1; i >= 0; i--) if (ev[i].t >= t) ev.splice(i, 1);
    this._dirty = true;
    this._ctx._autoEvents++;
    return this;
  };
  AudioParam.prototype.cancelAndHoldAtTime = function (t) {
    t = this._chkT(t, "cancelAndHoldAtTime");
    if (this._dirty) this._prep();
    var v = this._valueAt(t);
    var ev = this._ev;
    for (var i = ev.length - 1; i >= 0; i--) if (ev[i].t > t || ev[i].type === CRV && ev[i].t + ev[i].dur > t) ev.splice(i, 1);
    return this._insert({ type: SET, t: t, v: v });
  };

  function curveAt(e, t) {
    var c = e.curve, N = c.length, TD = e.dur;
    if (t >= e.t + TD) return c[N - 1];
    var pos = (t - e.t) * (N - 1) / TD;
    var k = Math.floor(pos);
    if (k >= N - 1) return c[N - 1];
    return c[k] + (c[k + 1] - c[k]) * (pos - k);
  }

  /* value of the timeline at time t, with event k the last one at or before t */
  AudioParam.prototype._seg = function (k, t) {
    if (k < 0) return this._base;
    var ev = this._ev, e = ev[k], n = ev[k + 1];
    if (e.type === CRV && t < e.te) return curveAt(e, t);
    if (n !== undefined && (n.type === LIN || n.type === EXP) && t < n.t) {
      var T0 = e.te, V0 = e.ve, T1 = n.t, V1 = n.v;
      if (T1 <= T0) return V1;
      var f = (t - T0) / (T1 - T0);
      if (f < 0) f = 0;
      if (n.type === LIN) return V0 + (V1 - V0) * f;
      /* spec: an exponential ramp from 0, or across a sign change, holds V0 */
      if (V0 === 0 || V0 * V1 < 0) return V0;
      return V0 * Math.pow(V1 / V0, f);
    }
    if (e.type === TGT) return e.v + (e.sv - e.v) * Math.exp(-(t - e.t) / e.tau);
    if (e.type === CRV) return e.ve;
    return e.v;
  };
  /* start value (sv) and end time/value (te, ve) of every event, in order */
  AudioParam.prototype._prep = function () {
    var ev = this._ev;
    for (var i = 0; i < ev.length; i++) {
      var e = ev[i];
      e.te = e.type === CRV ? e.t + e.dur : e.t;
      if (e.type === TGT) {
        if (i === 0) { if (!e._known) e.sv = this._base; }
        else e.sv = this._seg(i - 1, e.t);
        e.ve = e.sv;          // a ramp after a setTarget starts where the target started
      } else if (e.type === CRV) { e.sv = e.curve[0]; e.ve = e.curve[e.curve.length - 1]; }
      else { e.sv = e.v; e.ve = e.v; }
      e._known = true;
    }
    this._dirty = false;
    this._k = -1;
  };
  AudioParam.prototype._valueAt = function (t) {
    var ev = this._ev, k = -1;
    while (k + 1 < ev.length && ev[k + 1].t <= t) k++;
    return this._seg(k, t);
  };

  /* Fills this._buf (or sets _const/_cv) for the quantum starting at frame q*RQ */
  AudioParam.prototype._compute = function (q) {
    if (this._cq === q) return;
    this._cq = q;
    if (this._dirty) this._prep();
    var sr = this._ctx.sampleRate, f0 = q * RQ, t0 = f0 / sr;
    var ev = this._ev, k = this._k;
    while (k + 1 < ev.length && ev[k + 1].t <= t0) k++;
    if (k > 0) {                                  // prune events the timeline has left behind
      ev.splice(0, k); k = 0;
      this._base = ev[0].sv;
    }
    this._k = k;
    var n = ev.length, krate = this.automationRate === "k-rate";
    var tEnd = (f0 + RQ - 1) / sr;
    var isConst = false, cv = 0;
    if (krate) { isConst = true; cv = this._seg(k, t0); }
    else if (k < 0) {
      if (n === 0 || ev[0].t > tEnd) { isConst = true; cv = this._base; }
    } else {
      var e = ev[k], nx = ev[k + 1];
      var nextIn = nx !== undefined && nx.t <= tEnd;
      var rampNext = nx !== undefined && (nx.type === LIN || nx.type === EXP);
      if (!nextIn && !rampNext) {
        if (e.type === SET || e.type === LIN || e.type === EXP) { isConst = true; cv = e.v; }
        else if (e.type === CRV && e.te <= t0) { isConst = true; cv = e.ve; }
        else if (e.type === TGT && Math.abs(e.sv - e.v) * Math.exp(-(t0 - e.t) / e.tau) < 1e-10) { isConst = true; cv = e.v; }
      }
    }
    var ins = this._in, lo = this.minValue, hi = this.maxValue;
    if (isConst && ins.length === 0) {
      cv = cv < lo ? lo : cv > hi ? hi : cv;
      this._const = true; this._cv = cv; this._v = cv;
      return;
    }
    var b = this._buf, i;
    if (isConst) { for (i = 0; i < RQ; i++) b[i] = cv; }
    else {
      for (i = 0; i < RQ; i++) {
        var t = (f0 + i) / sr;
        while (k + 1 < n && ev[k + 1].t <= t) k++;
        b[i] = this._seg(k, t);
      }
      this._k = k;
    }
    /* modulation: connected nodes are down-mixed to mono and added */
    for (var j = 0; j < ins.length; j++) {
      var src = ins[j];
      src._pull(q);
      if (src._silent) continue;
      var nc = src._outN, o0 = src._ob[0], o1 = nc > 1 ? src._ob[1] : null;
      if (krate) { b[0] += o1 ? 0.5 * (o0[0] + o1[0]) : o0[0]; }
      else if (o1) { for (i = 0; i < RQ; i++) b[i] += 0.5 * (o0[i] + o1[i]); }
      else { for (i = 0; i < RQ; i++) b[i] += o0[i]; }
    }
    if (krate) {
      cv = b[0]; cv = cv < lo ? lo : cv > hi ? hi : cv;
      this._const = true; this._cv = cv; this._v = cv;
      return;
    }
    if (lo > -BIG || hi < BIG) for (i = 0; i < RQ; i++) { var x = b[i]; b[i] = x < lo ? lo : x > hi ? hi : x; }
    this._const = false;
    this._v = b[0];
  };
  /* per-frame accessor used by node inner loops */
  AudioParam.prototype._at = function (i) { return this._const ? this._cv : this._buf[i]; };

  /* ================================ AudioNode ================================ */
  function AudioNode() {}
  AudioNode.prototype._init = function (ctx, type, nIn, nOut, cc, mode) {
    this.context = ctx;
    this._kind = type;
    this.numberOfInputs = nIn;
    this.numberOfOutputs = nOut;
    this.channelCount = cc;
    this.channelCountMode = mode;
    this.channelInterpretation = "speakers";
    this._srcs = [];
    this._dsts = [];
    this._q = -1;
    this._ob = [new Float32Array(RQ), new Float32Array(RQ)];
    this._outN = 1;
    this._silent = true;
    this._ib = [new Float32Array(RQ), new Float32Array(RQ)];
    this._inN = 1;
    this._inSilent = true;
    if (type !== "Destination") ctx._count(type);
  };
  AudioNode.prototype.connect = function (dst) {
    if (!dst) throw new TypeError("connect: no destination");
    if (dst instanceof AudioParam) {
      if (dst._ctx !== this.context) throw err("InvalidAccessError", "connect across contexts");
      if (dst._in.indexOf(this) < 0) { dst._in.push(this); this.context._connections++; }
      if (this._dsts.indexOf(dst) < 0) this._dsts.push(dst);
      return undefined;
    }
    if (dst.context !== this.context) throw err("InvalidAccessError", "connect across contexts");
    if (!dst.numberOfInputs) throw err("IndexSizeError", "destination has no input");
    if (dst._srcs.indexOf(this) < 0) { dst._srcs.push(this); this.context._connections++; }
    if (this._dsts.indexOf(dst) < 0) this._dsts.push(dst);
    return dst;
  };
  AudioNode.prototype.disconnect = function (dst) {
    var list = (dst === undefined || typeof dst === "number") ? this._dsts.slice() : [dst];
    for (var i = 0; i < list.length; i++) {
      var d = list[i], arr = (d instanceof AudioParam) ? d._in : d._srcs;
      var j = arr.indexOf(this);
      if (j >= 0) arr.splice(j, 1);
      var m = this._dsts.indexOf(d);
      if (m >= 0) this._dsts.splice(m, 1);
      else if (dst !== undefined && typeof dst !== "number") throw err("InvalidAccessError", "not connected");
    }
  };
  AudioNode.prototype._pull = function (q) {
    if (this._q !== q) { this._q = q; this._process(q); }
  };
  AudioNode.prototype._ensureOut = function (n) {
    while (this._ob.length < n) this._ob.push(new Float32Array(RQ));
    this._outN = n;
  };
  /* sum every connected input into this._ib with the speakers up/down-mix */
  AudioNode.prototype._mixIn = function (q) {
    var srcs = this._srcs, i, c;
    if (srcs.length === 0) { this._inN = 1; this._inSilent = true; return; }
    var maxC = 1, live = 0;
    for (i = 0; i < srcs.length; i++) {
      srcs[i]._pull(q);
      if (srcs[i]._outN > maxC) maxC = srcs[i]._outN;
      if (!srcs[i]._silent) live++;
    }
    var n = this.channelCountMode === "explicit" ? this.channelCount
          : this.channelCountMode === "clamped-max" ? Math.min(maxC, this.channelCount) : maxC;
    while (this._ib.length < n) this._ib.push(new Float32Array(RQ));
    this._inN = n;
    if (!live) { this._inSilent = true; return; }
    this._inSilent = false;
    var ib = this._ib;
    for (c = 0; c < n; c++) ib[c].fill(0);
    for (i = 0; i < srcs.length; i++) {
      var s = srcs[i];
      if (s._silent) continue;
      var sc = s._outN, ob = s._ob, k;
      if (sc === n) {
        for (c = 0; c < n; c++) { var d = ib[c], o = ob[c]; for (k = 0; k < RQ; k++) d[k] += o[k]; }
      } else if (sc === 1) {                       // mono -> N: copy to every speaker (L=R=M)
        var m = ob[0];
        for (c = 0; c < Math.min(n, 2); c++) { var d2 = ib[c]; for (k = 0; k < RQ; k++) d2[k] += m[k]; }
      } else if (n === 1 && sc === 2) {            // stereo -> mono: 0.5 (L + R)
        var L = ob[0], R = ob[1], d3 = ib[0];
        for (k = 0; k < RQ; k++) d3[k] += 0.5 * (L[k] + R[k]);
      } else {                                     // discrete fallback
        for (c = 0; c < Math.min(n, sc); c++) { var d4 = ib[c], o4 = ob[c]; for (k = 0; k < RQ; k++) d4[k] += o4[k]; }
      }
    }
  };
  var ZERO = new Float32Array(RQ);

  /* ================================ GainNode ================================ */
  function GainNode(ctx, opts) {
    this._init(ctx, "Gain", 1, 1, 2, "max");
    this.gain = new AudioParam(ctx, 1, -BIG, BIG);
    if (opts && opts.gain !== undefined) this.gain.value = opts.gain;
  }
  GainNode.prototype = Object.create(AudioNode.prototype);
  GainNode.prototype._process = function (q) {
    this._mixIn(q);
    var g = this.gain;
    g._compute(q);
    var n = this._inN;
    this._ensureOut(n);
    if (this._inSilent || (g._const && g._cv === 0)) { this._silent = true; return; }
    this._silent = false;
    for (var c = 0; c < n; c++) {
      var x = this._ib[c], y = this._ob[c], i;
      if (g._const) { var gv = g._cv; for (i = 0; i < RQ; i++) y[i] = x[i] * gv; }
      else { var gb = g._buf; for (i = 0; i < RQ; i++) y[i] = x[i] * gb[i]; }
    }
  };

  /* ============================ BiquadFilterNode ============================
     Audio EQ Cookbook with the spec's conventions: lowpass and highpass take
     Q in dB (alpha = sin w0 / (2 * 10^(Q/20)), so Q = 0 dB is a gain of
     exactly 1 at the cutoff and Q = -3.01 dB is Butterworth, -3 dB there);
     bandpass, notch, allpass and peaking take Q as a plain ratio; the shelves
     ignore Q (S = 1). Coefficients are normalised by a0 and recomputed every
     frame whenever frequency, detune, Q or gain is moving in that quantum,
     since all four are a-rate - audio.js sweeps filter cutoffs on almost
     every blast. Direct form I, one state set per channel.                 */
  function biquadCoefs(type, F, Q, G, sr, out) {
    var nyq = sr / 2;
    var b0, b1, b2, a0, a1, a2;
    if (F <= 0 || F >= nyq || (Q <= 0 && (type === "bandpass" || type === "notch" || type === "allpass" || type === "peaking"))) {
      /* the spec's degenerate cases */
      var A0 = Math.pow(10, G / 40);
      var pass = 1;
      switch (type) {
        case "lowpass":   pass = F >= nyq ? 1 : 0; break;
        case "highpass":  pass = F >= nyq ? 0 : 1; break;
        case "bandpass":  pass = (F > 0 && F < nyq && Q <= 0) ? 1 : 0; break;
        case "notch":     pass = (F > 0 && F < nyq && Q <= 0) ? 0 : 1; break;
        case "allpass":   pass = (F > 0 && F < nyq && Q <= 0) ? -1 : 1; break;
        case "peaking":   pass = (F > 0 && F < nyq && Q <= 0) ? A0 * A0 : 1; break;
        case "lowshelf":  pass = F >= nyq ? A0 * A0 : 1; break;
        case "highshelf": pass = F >= nyq ? 1 : A0 * A0; break;
      }
      out[0] = pass; out[1] = 0; out[2] = 0; out[3] = 0; out[4] = 0;
      return;
    }
    var w0 = TWO_PI * F / sr, cw = Math.cos(w0), sw = Math.sin(w0);
    var A = Math.pow(10, G / 40);
    var aQ = sw / (2 * Q);
    var aQdB = sw / (2 * Math.pow(10, Q / 20));
    var S = 1;                                    // shelf slope; the spec fixes it at 1
    var aS = (sw / 2) * Math.sqrt((A + 1 / A) * (1 / S - 1) + 2);
    switch (type) {
      case "lowpass":
        b0 = (1 - cw) / 2; b1 = 1 - cw; b2 = (1 - cw) / 2; a0 = 1 + aQdB; a1 = -2 * cw; a2 = 1 - aQdB; break;
      case "highpass":
        b0 = (1 + cw) / 2; b1 = -(1 + cw); b2 = (1 + cw) / 2; a0 = 1 + aQdB; a1 = -2 * cw; a2 = 1 - aQdB; break;
      case "bandpass":
        b0 = aQ; b1 = 0; b2 = -aQ; a0 = 1 + aQ; a1 = -2 * cw; a2 = 1 - aQ; break;
      case "notch":
        b0 = 1; b1 = -2 * cw; b2 = 1; a0 = 1 + aQ; a1 = -2 * cw; a2 = 1 - aQ; break;
      case "allpass":
        b0 = 1 - aQ; b1 = -2 * cw; b2 = 1 + aQ; a0 = 1 + aQ; a1 = -2 * cw; a2 = 1 - aQ; break;
      case "peaking":
        b0 = 1 + aQ * A; b1 = -2 * cw; b2 = 1 - aQ * A; a0 = 1 + aQ / A; a1 = -2 * cw; a2 = 1 - aQ / A; break;
      case "lowshelf": {
        var s1 = 2 * aS * Math.sqrt(A);
        b0 = A * ((A + 1) - (A - 1) * cw + s1); b1 = 2 * A * ((A - 1) - (A + 1) * cw);
        b2 = A * ((A + 1) - (A - 1) * cw - s1); a0 = (A + 1) + (A - 1) * cw + s1;
        a1 = -2 * ((A - 1) + (A + 1) * cw); a2 = (A + 1) + (A - 1) * cw - s1; break;
      }
      case "highshelf": {
        var s2 = 2 * aS * Math.sqrt(A);
        b0 = A * ((A + 1) + (A - 1) * cw + s2); b1 = -2 * A * ((A - 1) + (A + 1) * cw);
        b2 = A * ((A + 1) + (A - 1) * cw - s2); a0 = (A + 1) - (A - 1) * cw + s2;
        a1 = 2 * ((A - 1) - (A + 1) * cw); a2 = (A + 1) - (A - 1) * cw - s2; break;
      }
      default: throw new TypeError("biquad type " + type);
    }
    out[0] = b0 / a0; out[1] = b1 / a0; out[2] = b2 / a0; out[3] = a1 / a0; out[4] = a2 / a0;
  }
  var BQ_TYPES = { lowpass: 1, highpass: 1, bandpass: 1, lowshelf: 1, highshelf: 1, peaking: 1, notch: 1, allpass: 1 };

  function BiquadFilterNode(ctx) {
    this._init(ctx, "BiquadFilter", 1, 1, 2, "max");
    var nyq = ctx.sampleRate / 2;
    this.frequency = new AudioParam(ctx, 350, 0, nyq);
    this.detune = new AudioParam(ctx, 0, -153600, 153600);
    this.Q = new AudioParam(ctx, 1, -BIG, BIG);
    this.gain = new AudioParam(ctx, 0, -BIG, 1541);
    this._ftype = "lowpass";
    this._st = [new Float64Array(4), new Float64Array(4)];
    this._co = new Float64Array(5);
    this._cb = null;                              // per-frame coefficient arrays when moving
  }
  BiquadFilterNode.prototype = Object.create(AudioNode.prototype);
  Object.defineProperty(BiquadFilterNode.prototype, "type", {
    get: function () { return this._ftype; },
    set: function (t) { if (BQ_TYPES[t]) this._ftype = t; },   // invalid enum values are ignored, as in a browser
  });
  BiquadFilterNode.prototype._process = function (q) {
    this._mixIn(q);
    var P = [this.frequency, this.detune, this.Q, this.gain];
    for (var p = 0; p < 4; p++) P[p]._compute(q);
    var n = this._inN, sr = this.context.sampleRate;
    this._ensureOut(n);
    while (this._st.length < n) this._st.push(new Float64Array(4));
    if (this._inSilent) {
      var quiet = true;
      for (var c0 = 0; c0 < n; c0++) { var s0 = this._st[c0]; if (Math.abs(s0[0]) + Math.abs(s0[1]) + Math.abs(s0[2]) + Math.abs(s0[3]) > 1e-12) quiet = false; }
      if (quiet) { for (var c1 = 0; c1 < this._st.length; c1++) this._st[c1].fill(0); this._silent = true; return; }
    }
    this._silent = false;
    var moving = !(P[0]._const && P[1]._const && P[2]._const && P[3]._const);
    var co = this._co, i;
    if (!moving) {
      biquadCoefs(this._ftype, P[0]._cv * Math.pow(2, P[1]._cv / 1200), P[2]._cv, P[3]._cv, sr, co);
    } else {
      if (!this._cb) this._cb = new Float64Array(RQ * 5);
      var cb = this._cb, tmp = co, lastF = NaN, lastQ = NaN, lastG = NaN;
      for (i = 0; i < RQ; i++) {
        var F = P[0]._at(i) * (P[1]._const && P[1]._cv === 0 ? 1 : Math.pow(2, P[1]._at(i) / 1200));
        var Qv = P[2]._at(i), Gv = P[3]._at(i);
        if (F !== lastF || Qv !== lastQ || Gv !== lastG) {
          biquadCoefs(this._ftype, F, Qv, Gv, sr, tmp);
          lastF = F; lastQ = Qv; lastG = Gv;
        }
        var o = i * 5;
        cb[o] = tmp[0]; cb[o + 1] = tmp[1]; cb[o + 2] = tmp[2]; cb[o + 3] = tmp[3]; cb[o + 4] = tmp[4];
      }
    }
    for (var c = 0; c < n; c++) {
      var x = this._inSilent ? ZERO : this._ib[c], y = this._ob[c], s = this._st[c];
      var x1 = s[0], x2 = s[1], y1 = s[2], y2 = s[3], v;
      if (!moving) {
        var b0 = co[0], b1 = co[1], b2 = co[2], a1 = co[3], a2 = co[4];
        for (i = 0; i < RQ; i++) {
          var xi = x[i];
          v = b0 * xi + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
          x2 = x1; x1 = xi; y2 = y1; y1 = v;
          y[i] = v;
        }
      } else {
        var cbm = this._cb;
        for (i = 0; i < RQ; i++) {
          var k = i * 5, xj = x[i];
          v = cbm[k] * xj + cbm[k + 1] * x1 + cbm[k + 2] * x2 - cbm[k + 3] * y1 - cbm[k + 4] * y2;
          x2 = x1; x1 = xj; y2 = y1; y1 = v;
          y[i] = v;
        }
      }
      /* flush denormal-sized state: a decayed tail is silence, not work */
      if (Math.abs(y1) < 1e-30) y1 = 0;
      if (Math.abs(y2) < 1e-30) y2 = 0;
      s[0] = x1; s[1] = x2; s[2] = y1; s[3] = y2;
    }
  };
  BiquadFilterNode.prototype.getFrequencyResponse = function (freqs, mag, phase) {
    var co = new Float64Array(5), sr = this.context.sampleRate;
    biquadCoefs(this._ftype, this.frequency.value * Math.pow(2, this.detune.value / 1200), this.Q.value, this.gain.value, sr, co);
    for (var i = 0; i < freqs.length; i++) {
      var f = freqs[i];
      if (!(f >= 0 && f <= sr / 2)) { mag[i] = NaN; phase[i] = NaN; continue; }
      var w = TWO_PI * f / sr, c1 = Math.cos(w), s1 = Math.sin(w), c2 = Math.cos(2 * w), s2 = Math.sin(2 * w);
      var nr = co[0] + co[1] * c1 + co[2] * c2, ni = -(co[1] * s1 + co[2] * s2);
      var dr = 1 + co[3] * c1 + co[4] * c2, di = -(co[3] * s1 + co[4] * s2);
      var dd = dr * dr + di * di;
      var hr = (nr * dr + ni * di) / dd, hi = (ni * dr - nr * di) / dd;
      mag[i] = Math.sqrt(hr * hr + hi * hi);
      phase[i] = Math.atan2(hi, hr);
    }
  };

  /* ============================ OscillatorNode ============================
     Band-limited the way the spec asks: each waveform is its Fourier series
     (square b_n = 4/(n pi) for odd n; sawtooth b_n = (-1)^(n+1) 2/(n pi);
     triangle b_n = 8 sin(n pi/2)/(n pi)^2), built into 8192-point wavetables
     holding 4095, 3865, 3648 ... partials (a semitone apart) and then every
     count from 32 down to 1. Each
     frame reads the richest table whose top partial stays under Nyquist at the
     current frequency, so a sawtooth sweeping down through audio.js's motor
     rumble never folds harmonics back. All tables share one normalisation
     (peak of the fullest table = 1), as Chrome's built-in waves do.          */
  var TBL_N = 8192, TBL_MAXP = 4095;
  var tableCache = {};

  function fftInPlace(re, im, inverse) {
    var n = re.length, i, j, k, m;
    for (i = 1, j = 0; i < n; i++) {
      var bit = n >> 1;
      for (; j & bit; bit >>= 1) j ^= bit;
      j ^= bit;
      if (i < j) { var tr = re[i]; re[i] = re[j]; re[j] = tr; var ti = im[i]; im[i] = im[j]; im[j] = ti; }
    }
    for (m = 2; m <= n; m <<= 1) {
      var ang = (inverse ? 2 : -2) * Math.PI / m;
      var wr = Math.cos(ang), wi = Math.sin(ang), half = m >> 1;
      for (i = 0; i < n; i += m) {
        var cr = 1, ci = 0;
        for (k = 0; k < half; k++) {
          var a = i + k, b = a + half;
          var xr = re[b] * cr - im[b] * ci, xi = re[b] * ci + im[b] * cr;
          re[b] = re[a] - xr; im[b] = im[a] - xi;
          re[a] += xr; im[a] += xi;
          var nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr;
        }
      }
    }
  }

  function waveCoef(type, k) {
    switch (type) {
      case "sine":     return k === 1 ? 1 : 0;
      case "square":   return (k & 1) ? 4 / (k * Math.PI) : 0;
      case "sawtooth": return ((k & 1) ? 1 : -1) * 2 / (k * Math.PI);
      case "triangle": return 8 * Math.sin(k * Math.PI / 2) / ((Math.PI * k) * (Math.PI * k));
    }
    throw new TypeError("oscillator type " + type);
  }

  function waveTables(type) {
    if (tableCache[type]) return tableCache[type];
    var counts = [];
    if (type === "sine") counts = [1];
    else {
      /* semitone steps down to 32 partials, then every count to 1: a coarser
         ladder (third-octaves) drops a 5 kHz sawtooth's 20 kHz partial */
      for (var p = TBL_MAXP; p > 32; p = Math.floor(p * Math.pow(2, -1 / 12))) counts.push(p);
      for (var p2 = 32; p2 >= 1; p2--) counts.push(p2);
    }
    var tables = [], scale = 1;
    for (var t = 0; t < counts.length; t++) {
      var re = new Float64Array(TBL_N), im = new Float64Array(TBL_N);
      for (var k = 1; k <= counts[t]; k++) {
        var b = waveCoef(type, k);
        im[k] = -b / 2; im[TBL_N - k] = b / 2;
      }
      fftInPlace(re, im, true);                  // sum of b_k sin(2 pi k n / N)
      var tb = new Float32Array(TBL_N + 1);
      var peak = 0;
      for (var i = 0; i < TBL_N; i++) { tb[i] = re[i]; if (Math.abs(re[i]) > peak) peak = Math.abs(re[i]); }
      tb[TBL_N] = tb[0];                          // guard sample for interpolation
      if (t === 0) scale = peak > 0 ? 1 / peak : 1;
      tables.push(tb);
    }
    for (var u = 0; u < tables.length; u++) { var tt = tables[u]; for (var v = 0; v <= TBL_N; v++) tt[v] *= scale; }
    tableCache[type] = { counts: counts, tables: tables };
    return tableCache[type];
  }

  var OSC_TYPES = { sine: 1, square: 1, sawtooth: 1, triangle: 1 };

  function ScheduledSource() {}
  ScheduledSource.prototype = Object.create(AudioNode.prototype);
  ScheduledSource.prototype._schedInit = function () {
    this._start = -1; this._stop = Infinity; this._ended = false; this.onended = null;
  };
  ScheduledSource.prototype.start = function (when) {
    if (this._start >= 0) throw err("InvalidStateError", "start() called twice");
    when = when === undefined ? 0 : +when;
    if (!(when >= 0)) throw new RangeError("start: when must be >= 0");
    this._start = when;
    this.context._sources.push(this);
  };
  ScheduledSource.prototype.stop = function (when) {
    if (this._start < 0) throw err("InvalidStateError", "stop() before start()");
    when = when === undefined ? 0 : +when;
    if (!(when >= 0)) throw new RangeError("stop: when must be >= 0");
    this._stop = when;
  };
  /* frames [a, b) of this quantum during which the source plays */
  ScheduledSource.prototype._span = function (q) {
    if (this._start < 0 || this._ended) return null;
    var sr = this.context.sampleRate, f0 = q * RQ;
    var sf = Math.ceil(this._start * sr - 1e-9), ef = this._stop === Infinity ? Infinity : Math.ceil(this._stop * sr - 1e-9);
    if (ef <= sf) ef = sf;
    if (f0 + RQ <= sf) return null;
    if (f0 >= ef) { this._finish(); return null; }
    return [Math.max(0, sf - f0), Math.min(RQ, ef - f0)];
  };
  ScheduledSource.prototype._finish = function () {
    if (this._ended) return;
    this._ended = true;
    if (typeof this.onended === "function") this.context._endedQueue.push(this);
  };

  function OscillatorNode(ctx) {
    this._init(ctx, "Oscillator", 0, 1, 2, "max");
    this._schedInit();
    var nyq = ctx.sampleRate / 2;
    this.frequency = new AudioParam(ctx, 440, -nyq, nyq);
    this.detune = new AudioParam(ctx, 0, -153600, 153600);
    this._otype = "sine";
    this._phase = 0;
  }
  OscillatorNode.prototype = Object.create(ScheduledSource.prototype);
  Object.defineProperty(OscillatorNode.prototype, "type", {
    get: function () { return this._otype; },
    set: function (t) {
      if (t === "custom") throw err("InvalidStateError", "set a custom wave with setPeriodicWave");
      if (OSC_TYPES[t]) this._otype = t;
    },
  });
  OscillatorNode.prototype.setPeriodicWave = function () {
    unsupported.push("OscillatorNode.setPeriodicWave");
    throw err("NotSupportedError", "webaudio_emu: setPeriodicWave is not emulated");
  };
  OscillatorNode.prototype._process = function (q) {
    this.frequency._compute(q); this.detune._compute(q);
    this._ensureOut(1);
    var sp = this._span(q);
    if (!sp) { this._silent = true; return; }
    this._silent = false;
    var y = this._ob[0], a = sp[0], b = sp[1], i;
    for (i = 0; i < a; i++) y[i] = 0;
    for (i = b; i < RQ; i++) y[i] = 0;
    var W = waveTables(this._otype), counts = W.counts, tables = W.tables;
    var sr = this.context.sampleRate, nyq = sr / 2;
    var fq = this.frequency, dt = this.detune, ph = this._phase;
    var lastF = NaN, tb = tables[0];
    for (i = a; i < b; i++) {
      var f = fq._const ? fq._cv : fq._buf[i];
      if (!(dt._const && dt._cv === 0)) f *= Math.pow(2, (dt._const ? dt._cv : dt._buf[i]) / 1200);
      if (f !== lastF) {
        lastF = f;
        var af = Math.abs(f), j = 0;
        if (counts.length > 1) {
          /* the richest table whose top partial stays under Nyquist */
          var allowed = af > 0 ? nyq / af : Infinity, lo = 0, hi = counts.length - 1;
          while (lo < hi) { var mid = (lo + hi) >> 1; if (counts[mid] > allowed) lo = mid + 1; else hi = mid; }
          j = lo;
        }
        tb = tables[j];
      }
      var pos = ph * TBL_N, k = pos | 0, fr = pos - k;
      y[i] = tb[k] + (tb[k + 1] - tb[k]) * fr;
      ph += f / sr;
      ph -= Math.floor(ph);
    }
    this._phase = ph;
    if (b < RQ) this._finish();
  };

  /* ========================= AudioBufferSourceNode ========================= */
  function AudioBufferSourceNode(ctx) {
    this._init(ctx, "AudioBufferSource", 0, 1, 2, "max");
    this._schedInit();
    this._buffer = null;
    this.loop = false;
    this.loopStart = 0;
    this.loopEnd = 0;
    this.playbackRate = new AudioParam(ctx, 1, -BIG, BIG, "k-rate");
    this.detune = new AudioParam(ctx, 0, -BIG, BIG, "k-rate");
    this._offset = 0;
    this._dur = Infinity;
    this._pos = -1;
    this._played = 0;
  }
  AudioBufferSourceNode.prototype = Object.create(ScheduledSource.prototype);
  Object.defineProperty(AudioBufferSourceNode.prototype, "buffer", {
    get: function () { return this._buffer; },
    set: function (b) {
      if (b !== null && !(b instanceof AudioBuffer)) throw new TypeError("buffer must be an AudioBuffer");
      if (this._buffer && b) throw err("InvalidStateError", "buffer may only be set once");
      this._buffer = b;
    },
  });
  AudioBufferSourceNode.prototype.start = function (when, offset, duration) {
    ScheduledSource.prototype.start.call(this, when);
    this._offset = offset === undefined ? 0 : Math.max(0, +offset);
    this._dur = duration === undefined ? Infinity : Math.max(0, +duration);
  };
  AudioBufferSourceNode.prototype._process = function (q) {
    this.playbackRate._compute(q); this.detune._compute(q);
    var buf = this._buffer;
    this._ensureOut(buf ? buf.numberOfChannels : 1);
    var sp = this._span(q);
    if (!sp || !buf) { this._silent = true; return; }
    this._silent = false;
    var a = sp[0], b = sp[1], nc = buf.numberOfChannels, len = buf.length, i, c;
    for (c = 0; c < nc; c++) { var yy = this._ob[c]; for (i = 0; i < a; i++) yy[i] = 0; for (i = b; i < RQ; i++) yy[i] = 0; }
    var bsr = buf.sampleRate, csr = this.context.sampleRate;
    var ls = 0, le = len;
    if (this.loop && this.loopStart >= 0 && this.loopEnd > 0 && this.loopStart < this.loopEnd) {
      ls = Math.min(len, this.loopStart * bsr); le = Math.min(len, this.loopEnd * bsr);
    }
    if (this._pos < 0) {
      this._pos = this._offset * bsr;
      if (this.loop && this._pos >= le) this._pos = ls + ((this._pos - ls) % (le - ls));
    }
    var rate = this.playbackRate._cv * Math.pow(2, this.detune._cv / 1200) * bsr / csr;
    var pos = this._pos, ended = false, maxPlay = this._dur * csr;
    for (i = a; i < b; i++) {
      if (!this.loop && (pos >= len || pos < 0)) { ended = true; for (c = 0; c < nc; c++) this._ob[c][i] = 0; continue; }
      if (this._played >= maxPlay) { ended = true; for (c = 0; c < nc; c++) this._ob[c][i] = 0; continue; }
      var k = Math.floor(pos), fr = pos - k, k1 = k + 1;
      if (k1 >= le && this.loop) k1 = ls | 0;
      for (c = 0; c < nc; c++) {
        var d = buf._ch[c];
        var s0 = d[k], s1 = k1 < len ? d[k1] : 0;
        this._ob[c][i] = s0 + (s1 - s0) * fr;
      }
      pos += rate;
      this._played++;
      if (this.loop) {
        var span = le - ls;
        if (span > 0) { while (pos >= le) pos -= span; while (pos < ls) pos += span; }
      }
    }
    this._pos = pos;
    if (ended || b < RQ) this._finish();
  };

  /* ============================== DelayNode ============================== */
  function DelayNode(ctx, maxDelay) {
    maxDelay = maxDelay === undefined ? 1 : +maxDelay;
    if (!(maxDelay > 0 && maxDelay < 180)) throw err("NotSupportedError", "maxDelayTime out of range");
    this._init(ctx, "Delay", 1, 1, 2, "max");
    this.delayTime = new AudioParam(ctx, 0, 0, maxDelay);
    this._len = Math.ceil(maxDelay * ctx.sampleRate) + RQ + 4;
    this._dl = [new Float32Array(this._len)];
    this._w = 0;
    this._live = 0;
  }
  DelayNode.prototype = Object.create(AudioNode.prototype);
  DelayNode.prototype._process = function (q) {
    this._mixIn(q);
    this.delayTime._compute(q);
    var len = this._len, sr = this.context.sampleRate;
    while (this._dl.length < this._inN) this._dl.push(Float32Array.from(this._dl[0]));   // up-mix history
    var n = this._dl.length, i, c;
    this._ensureOut(n);
    if (this._inSilent && this._live <= 0) { this._w = (this._w + RQ) % len; this._silent = true; return; }
    this._silent = false;
    this._live = this._inSilent ? this._live - RQ : len;
    var dtp = this.delayTime, w0 = this._w;
    for (c = 0; c < n; c++) {
      var dl = this._dl[c], y = this._ob[c];
      var x = this._inSilent ? ZERO : (this._inN === 1 ? this._ib[0] : this._ib[c]);
      var w = w0;
      for (i = 0; i < RQ; i++) {
        dl[w] = x[i];
        var d = (dtp._const ? dtp._cv : dtp._buf[i]) * sr;
        var rp = w - d;
        if (rp < 0) rp += len;
        var k = Math.floor(rp), fr = rp - k, k1 = k + 1;
        if (k1 >= len) k1 -= len;
        y[i] = dl[k] + (dl[k1] - dl[k]) * fr;
        w++; if (w >= len) w = 0;
      }
    }
    this._w = (w0 + RQ) % len;
  };

  /* ============================ StereoPannerNode ============================
     The spec's equal-power law: a mono input at pan p goes out as
     cos(x pi/2), sin(x pi/2) with x = (p + 1) / 2 - so dead centre is -3 dB
     on each side, while a mono source with NO panner is up-mixed to both
     sides at full level.                                                     */
  function StereoPannerNode(ctx) {
    this._init(ctx, "StereoPanner", 1, 1, 2, "clamped-max");
    this.pan = new AudioParam(ctx, 0, -1, 1);
  }
  StereoPannerNode.prototype = Object.create(AudioNode.prototype);
  StereoPannerNode.prototype._process = function (q) {
    this._mixIn(q);
    this.pan._compute(q);
    this._ensureOut(2);
    if (this._inSilent) { this._silent = true; return; }
    this._silent = false;
    var L = this._ob[0], R = this._ob[1], p = this.pan, i, pv, x, gL, gR;
    if (this._inN === 1) {
      var m = this._ib[0];
      for (i = 0; i < RQ; i++) {
        pv = p._const ? p._cv : p._buf[i];
        x = (pv + 1) / 2;
        L[i] = m[i] * Math.cos(x * Math.PI / 2);
        R[i] = m[i] * Math.sin(x * Math.PI / 2);
      }
    } else {
      var iL = this._ib[0], iR = this._ib[1];
      for (i = 0; i < RQ; i++) {
        pv = p._const ? p._cv : p._buf[i];
        x = pv <= 0 ? pv + 1 : pv;
        gL = Math.cos(x * Math.PI / 2); gR = Math.sin(x * Math.PI / 2);
        if (pv <= 0) { L[i] = iL[i] + iR[i] * gL; R[i] = iR[i] * gR; }
        else { L[i] = iL[i] * gL; R[i] = iR[i] + iL[i] * gR; }
      }
    }
  };

  /* ============================= WaveShaperNode =============================
     The spec's curve mapping: v = (N-1)/2 (x+1), linear interpolation between
     curve[floor v] and curve[floor v + 1], clamped to the end values outside
     [-1, 1]. "2x" and "4x" run the curve at 2 or 4 times the rate between a
     63-tap Blackman-windowed halfband up- and down-sampler, so the harmonics
     the shaper makes above Nyquist are filtered instead of folding back. The
     pair adds 31 frames (0.65 ms) of latency per 2x stage.                  */
  var HB = (function () {
    var L = 63, M = 31, h = new Float64Array(L), s = 0;
    for (var n = 0; n < L; n++) {
      var x = n - M;
      var sinc = x === 0 ? 0.5 : Math.sin(Math.PI * x / 2) / (Math.PI * x);
      var w = 0.42 - 0.5 * Math.cos(TWO_PI * n / (L - 1)) + 0.08 * Math.cos(4 * Math.PI * n / (L - 1));
      h[n] = sinc * w; s += h[n];
    }
    for (var k = 0; k < L; k++) h[k] /= s;       // unity DC gain
    return h;
  })();
  /* A halfband is zero at every even offset from its centre, so each
     direction needs only the 32 even taps plus the centre one: polyphase,
     33 multiplies per base-rate frame instead of 189. */
  var HB_E = new Float64Array(32), HB_C = HB[31];
  for (var hbj = 0; hbj < 32; hbj++) HB_E[hbj] = HB[2 * hbj];
  function Resampler2x() {
    this.up = new Float64Array(32);              // base-rate history
    this.dn = new Float64Array(64);              // high-rate history
    this.ui = 0; this.di = 0;
  }
  /* x (n frames) -> y (2n frames); y[m] = sum_k h[k] z[m-k], z the
     zero-stuffed x doubled to keep the level */
  Resampler2x.prototype.upsample = function (x, n, y) {
    var hist = this.up, idx = this.ui, hE = HB_E, c2 = 2 * HB_C;
    for (var i = 0; i < n; i++) {
      hist[idx] = x[i];
      var acc = 0;
      for (var j = 0; j < 32; j++) acc += hE[j] * hist[(idx - j) & 31];
      y[2 * i] = 2 * acc;
      y[2 * i + 1] = c2 * hist[(idx - 15) & 31];
      idx = (idx + 1) & 31;
    }
    this.ui = idx;
  };
  /* x (2n frames) -> y (n frames), keeping the EVEN outputs of the filter:
     the odd ones would sit half a base-rate frame late (30.5 frames of
     latency instead of 31), a fractional delay that smears the waveform */
  Resampler2x.prototype.downsample = function (x, n, y) {
    var hist = this.dn, w = this.di, hE = HB_E, c = HB_C;
    for (var m = 0; m < 2 * n; m++) {
      hist[w] = x[m];
      if (!(m & 1)) {
        var acc = c * hist[(w - 31) & 63];
        for (var j = 0; j < 32; j++) acc += hE[j] * hist[(w - 2 * j) & 63];
        y[m >> 1] = acc;
      }
      w = (w + 1) & 63;
    }
    this.di = w;
  };

  function WaveShaperNode(ctx) {
    this._init(ctx, "WaveShaper", 1, 1, 2, "max");
    this._curve = null;
    this._os = "none";
    this._rs = [];                                // per channel: [stage1, stage2]
    this._t2 = new Float64Array(RQ * 2);
    this._t4 = new Float64Array(RQ * 4);
    this._t2b = new Float64Array(RQ * 2);
    this._tail = 0;
  }
  WaveShaperNode.prototype = Object.create(AudioNode.prototype);
  Object.defineProperty(WaveShaperNode.prototype, "curve", {
    get: function () { return this._curve; },
    set: function (c) {
      if (c === null) { this._curve = null; return; }
      if (c.length < 2) throw err("InvalidStateError", "curve needs at least 2 points");
      this._curve = Float32Array.from(c);           // the spec takes a copy
    },
  });
  Object.defineProperty(WaveShaperNode.prototype, "oversample", {
    get: function () { return this._os; },
    set: function (v) { if (v === "none" || v === "2x" || v === "4x") this._os = v; },
  });
  WaveShaperNode.prototype._shape = function (x) {
    var c = this._curve;
    if (!c) return x;
    var N = c.length, v = (N - 1) / 2 * (x + 1);
    if (v <= 0) return c[0];
    if (v >= N - 1) return c[N - 1];
    var k = Math.floor(v), f = v - k;
    return (1 - f) * c[k] + f * c[k + 1];
  };
  WaveShaperNode.prototype._process = function (q) {
    this._mixIn(q);
    var n = this._inN, i, c;
    this._ensureOut(n);
    var zeroMapsToZero = !this._curve || this._shape(0) === 0;
    if (this._inSilent && zeroMapsToZero && this._tail <= 0) { this._silent = true; return; }
    this._silent = false;
    this._tail = this._inSilent ? this._tail - RQ : 2 * HB.length;
    while (this._rs.length < n) this._rs.push([new Resampler2x(), new Resampler2x(), new Resampler2x(), new Resampler2x()]);
    for (c = 0; c < n; c++) {
      var x = this._inSilent ? ZERO : this._ib[c], y = this._ob[c];
      if (this._os === "none" || !this._curve) {
        for (i = 0; i < RQ; i++) y[i] = this._shape(x[i]);
      } else if (this._os === "2x") {
        var r = this._rs[c], t2 = this._t2;
        r[0].upsample(x, RQ, t2);
        for (i = 0; i < 2 * RQ; i++) t2[i] = this._shape(t2[i]);
        r[1].downsample(t2, RQ, y);
      } else {
        var r4 = this._rs[c], a2 = this._t2, a4 = this._t4, b2 = this._t2b;
        r4[0].upsample(x, RQ, a2);
        r4[1].upsample(a2, 2 * RQ, a4);
        for (i = 0; i < 4 * RQ; i++) a4[i] = this._shape(a4[i]);
        r4[2].downsample(a4, 2 * RQ, b2);
        r4[3].downsample(b2, RQ, y);
      }
    }
  };

  /* ========================= DynamicsCompressorNode =========================
     The spec fixes the pieces that decide LEVEL, and those are followed:
     the static curve is unity below threshold and 1/ratio above it (the soft
     knee here is a quadratic from threshold to threshold+knee, slope 1 to
     1/ratio), and MAKEUP GAIN is applied automatically:
         makeup = (1 / curve(0 dBFS))^0.6
     For audio.js's limiter (-9 dB, 20:1, hard knee) that is +5.13 dB on
     everything below threshold; for the engine compressor (-26 dB, 8:1, 8 dB
     knee) it is +11.55 dB, which almost exactly undoes ENGINE_MIX's 0.26
     (-11.7 dB) trim. That is what a browser does and the tool shows it.
     The envelope the spec leaves to the implementation: here a per-frame peak
     detector (max over channels) driving a one-pole gain smoother in dB
     with time constants = attack and release, applied through a 6 ms
     look-ahead delay (Chrome's pre-delay). Chrome's own kernel adapts its
     release and warps the envelope; transient peaks at the limiter can land
     a dB or so differently there.                                          */
  function DynamicsCompressorNode(ctx) {
    this._init(ctx, "DynamicsCompressor", 1, 1, 2, "clamped-max");
    this.threshold = new AudioParam(ctx, -24, -100, 0, "k-rate");
    this.knee = new AudioParam(ctx, 30, 0, 40, "k-rate");
    this.ratio = new AudioParam(ctx, 12, 1, 20, "k-rate");
    this.attack = new AudioParam(ctx, 0.003, 0, 1, "k-rate");
    this.release = new AudioParam(ctx, 0.25, 0, 1, "k-rate");
    this._pre = Math.max(1, Math.round(0.006 * ctx.sampleRate));
    this._dl = [new Float32Array(this._pre), new Float32Array(this._pre)];
    this._w = 0;
    this._r = 0;               // current gain reduction, dB (<= 0)
    this._reduction = 0;
    this._minR = 0;            // deepest reduction seen, dB
    this._live = 0;
  }
  DynamicsCompressorNode.prototype = Object.create(AudioNode.prototype);
  Object.defineProperty(DynamicsCompressorNode.prototype, "reduction", { get: function () { return this._reduction; } });
  function compGainDb(x, T, K, R) {
    if (x <= T) return 0;
    if (K > 0 && x < T + K) { var d = x - T; return (1 / R - 1) * d * d / (2 * K); }
    var yK = K > 0 ? T + K * (1 + 1 / R) / 2 : T;
    return yK + (x - T - K) / R - x;
  }
  DynamicsCompressorNode.prototype._makeupDb = function () {
    return -0.6 * compGainDb(0, this.threshold._cv, this.knee._cv, this.ratio._cv);
  };
  DynamicsCompressorNode.prototype._process = function (q) {
    this._mixIn(q);
    this.threshold._compute(q); this.knee._compute(q); this.ratio._compute(q);
    this.attack._compute(q); this.release._compute(q);
    var n = this._inN, sr = this.context.sampleRate, i, c;
    this._ensureOut(n);
    var T = this.threshold._cv, K = this.knee._cv, R = this.ratio._cv;
    var aA = 1 - Math.exp(-1 / (Math.max(this.attack._cv, 1 / sr) * sr));
    var aR = 1 - Math.exp(-1 / (Math.max(this.release._cv, 1 / sr) * sr));
    var mk = this._makeupDb();
    var r = this._r;
    if (this._inSilent && this._live <= 0) {
      /* nothing in, nothing in the look-ahead line: release towards 0 dB */
      r += (0 - r) * (1 - Math.pow(1 - aR, RQ));
      this._r = r; this._reduction = r;
      this._silent = true;
      return;
    }
    this._silent = false;
    this._live = this._inSilent ? this._live - RQ : this._pre + RQ;
    var pre = this._pre, w = this._w, dl0 = this._dl[0], dl1 = this._dl[1];
    var x0 = this._inSilent ? ZERO : this._ib[0], x1 = n > 1 ? (this._inSilent ? ZERO : this._ib[1]) : null;
    var y0 = this._ob[0], y1 = n > 1 ? this._ob[1] : null, minR = this._minR;
    for (i = 0; i < RQ; i++) {
      var a = Math.abs(x0[i]);
      if (x1) { var b = Math.abs(x1[i]); if (b > a) a = b; }
      var xdb = a > 1e-9 ? 20 * Math.log(a) * Math.LOG10E : -180;
      var tgt = compGainDb(xdb, T, K, R);
      r += (tgt - r) * (tgt < r ? aA : aR);
      if (r < minR) minR = r;
      var g = Math.pow(10, (r + mk) / 20);
      y0[i] = dl0[w] * g; dl0[w] = x0[i];
      if (x1) { y1[i] = dl1[w] * g; dl1[w] = x1[i]; }
      w++; if (w >= pre) w = 0;
    }
    this._w = w; this._r = r; this._reduction = r; this._minR = minR;
  };

  /* ============================ destination ============================ */
  function AudioDestinationNode(ctx, channels) {
    this._init(ctx, "Destination", 1, 0, channels, "explicit");
    this.maxChannelCount = channels;
  }
  AudioDestinationNode.prototype = Object.create(AudioNode.prototype);
  AudioDestinationNode.prototype._process = function (q) { this._mixIn(q); };

  /* ============================== contexts ============================== */
  function BaseAudioContext() {}
  BaseAudioContext.prototype._setup = function (sampleRate, channels) {
    if (!(sampleRate >= 3000 && sampleRate <= 768000)) throw err("NotSupportedError", "sampleRate " + sampleRate);
    this.sampleRate = sampleRate;
    this._frame = 0;
    this._q = 0;
    this._nodes = 0;
    this._byType = {};
    this._autoEvents = 0;
    this._connections = 0;
    this._buffers = 0;
    this._sources = [];
    this._endedQueue = [];
    this._comps = [];
    this.state = "running";
    this.onstatechange = null;
    this.listener = { positionX: new AudioParam(this, 0), positionY: new AudioParam(this, 0), positionZ: new AudioParam(this, 0) };
    this.destination = new AudioDestinationNode(this, channels);
  };
  Object.defineProperty(BaseAudioContext.prototype, "currentTime", { get: function () { return this._frame / this.sampleRate; } });
  BaseAudioContext.prototype._count = function (type) {
    this._nodes++;
    this._byType[type] = (this._byType[type] || 0) + 1;
  };
  BaseAudioContext.prototype.createGain = function () { return new GainNode(this); };
  BaseAudioContext.prototype.createBiquadFilter = function () { return new BiquadFilterNode(this); };
  BaseAudioContext.prototype.createOscillator = function () { return new OscillatorNode(this); };
  BaseAudioContext.prototype.createBufferSource = function () { return new AudioBufferSourceNode(this); };
  BaseAudioContext.prototype.createWaveShaper = function () { return new WaveShaperNode(this); };
  BaseAudioContext.prototype.createDynamicsCompressor = function () { var c = new DynamicsCompressorNode(this); this._comps.push(c); return c; };
  BaseAudioContext.prototype.createDelay = function (max) { return new DelayNode(this, max); };
  BaseAudioContext.prototype.createStereoPanner = function () { return new StereoPannerNode(this); };
  BaseAudioContext.prototype.createBuffer = function (ch, len, sr) {
    this._buffers++;
    return new AudioBuffer({ numberOfChannels: ch, length: len, sampleRate: sr });
  };
  ["createAnalyser", "createChannelMerger", "createChannelSplitter", "createConstantSource", "createConvolver",
   "createIIRFilter", "createPanner", "createPeriodicWave", "createScriptProcessor", "createMediaElementSource",
   "createMediaStreamSource", "createMediaStreamDestination", "decodeAudioData", "audioWorklet"].forEach(function (m) {
    BaseAudioContext.prototype[m] = function () {
      unsupported.push(m);
      throw err("NotSupportedError", "webaudio_emu: " + m + " is not emulated (tools/audio/webaudio_emu.js)");
    };
  });
  BaseAudioContext.prototype.resume = function () { this.state = "running"; return Promise.resolve(); };
  BaseAudioContext.prototype.suspend = function () { this.state = "suspended"; return Promise.resolve(); };
  BaseAudioContext.prototype.close = function () { this.state = "closed"; return Promise.resolve(); };

  /* one render quantum into out[c] at offset off */
  BaseAudioContext.prototype._renderQuantum = function (outs, off, count) {
    var d = this.destination, q = this._q;
    d._pull(q);
    var n = outs.length;
    for (var c = 0; c < n; c++) {
      var o = outs[c];
      if (d._inSilent) { for (var i = 0; i < count; i++) o[off + i] = 0; continue; }
      var src = d._ib[Math.min(c, d._inN - 1)];
      for (var k = 0; k < count; k++) o[off + k] = src[k];
    }
    this._q++;
    this._frame += RQ;
    if (this._endedQueue.length) {
      var list = this._endedQueue; this._endedQueue = [];
      for (var e = 0; e < list.length; e++) { try { list[e].onended({ target: list[e] }); } catch (x) {} }
    }
    return !d._inSilent;
  };

  /* ---- the "realtime" context: audio.js calls new AudioContext() ----
     Time only moves when the driver renders, exactly as if the JS that
     scheduled a sound ran between two render quanta of a real device. The
     output is recorded so the driver can take it away as samples.         */
  function AudioContext(opts) {
    opts = opts || {};
    this._setup(opts.sampleRate || WebAudioEmu.defaultSampleRate, 2);
    this.baseLatency = 0.005; this.outputLatency = 0.01;
    this._rec = [new Float32Array(1 << 16), new Float32Array(1 << 16)];
    this._recN = 0;
    this._lastLoud = -1;
    WebAudioEmu.lastContext = this;
  }
  AudioContext.prototype = Object.create(BaseAudioContext.prototype);
  AudioContext.prototype._grow = function (need) {
    if (need <= this._rec[0].length) return;
    var sz = this._rec[0].length;
    while (sz < need) sz *= 2;
    for (var c = 0; c < 2; c++) { var nb = new Float32Array(sz); nb.set(this._rec[c].subarray(0, this._recN)); this._rec[c] = nb; }
  };
  AudioContext.prototype.__renderQuanta = function (nq) {
    for (var j = 0; j < nq; j++) {
      this._grow(this._recN + RQ);
      var off = this._recN;
      var live = this._renderQuantum(this._rec, off, RQ);
      if (live) {
        var L = this._rec[0], R = this._rec[1];
        for (var i = RQ - 1; i >= 0; i--) if (Math.abs(L[off + i]) > 1e-6 || Math.abs(R[off + i]) > 1e-6) { this._lastLoud = off + i; break; }
      }
      this._recN += RQ;
    }
  };
  /* render until currentTime >= t */
  AudioContext.prototype.__renderTo = function (t) {
    var target = Math.ceil(t * this.sampleRate / RQ);
    if (target > this._q) this.__renderQuanta(target - this._q);
  };
  /* latest scheduled end among started sources (Infinity if one never stops) */
  AudioContext.prototype.__pendingEnd = function () {
    var end = 0, list = this._sources;
    for (var i = 0; i < list.length; i++) {
      var s = list[i];
      if (s._ended) continue;
      if (s._dsts.length === 0) continue;         // not connected: can never be heard
      var e = s._stop;
      if (s instanceof AudioBufferSourceNode && !s.loop && s._buffer && e === Infinity)
        e = s._start + (s._buffer.duration - s._offset) / Math.abs(s.playbackRate._v || 1);
      if (e > end) end = e;
    }
    return end;
  };
  /* render until every source has stopped and the output has been below
     -120 dBFS for quietSec, or until maxSec */
  AudioContext.prototype.__renderUntilQuiet = function (maxSec, quietSec) {
    quietSec = quietSec === undefined ? 0.3 : quietSec;
    var sr = this.sampleRate;
    while (this.currentTime < maxSec) {
      this.__renderQuanta(8);
      var pend = this.__pendingEnd();
      var quietFor = (this._recN - 1 - this._lastLoud) / sr;
      if (this.currentTime > pend && quietFor >= quietSec) break;
    }
  };
  /* advance the clock without rendering (for timing repeated calls only) */
  AudioContext.prototype.__jump = function (sec) {
    var nq = Math.ceil(sec * this.sampleRate / RQ);
    this._q += nq; this._frame += nq * RQ;
  };
  AudioContext.prototype.__output = function (trimTailSec) {
    var n = this._recN;
    if (trimTailSec !== undefined && this._lastLoud >= 0) n = Math.min(n, this._lastLoud + 1 + Math.round(trimTailSec * this.sampleRate));
    return { L: this._rec[0].subarray(0, n), R: this._rec[1].subarray(0, n), length: n, sampleRate: this.sampleRate };
  };
  AudioContext.prototype.__stats = function () {
    var by = {};
    for (var k in this._byType) by[k] = this._byType[k];
    return { nodes: this._nodes, byType: by, autoEvents: this._autoEvents, connections: this._connections, buffers: this._buffers };
  };
  AudioContext.prototype.__limiterMinDb = function () {
    return this._comps.map(function (c) { return c._minR; });
  };

  /* ---- OfflineAudioContext, for audio.js's own Sfx.render() ---- */
  function OfflineAudioContext(a, b, c) {
    var o = (typeof a === "object" && a !== null) ? a : { numberOfChannels: a, length: b, sampleRate: c };
    this._setup(+o.sampleRate, (o.numberOfChannels | 0) || 1);
    this.length = o.length | 0;
    this._outBuf = new AudioBuffer({ numberOfChannels: (o.numberOfChannels | 0) || 1, length: this.length, sampleRate: this.sampleRate });
    this.oncomplete = null;
    this.state = "suspended";
    WebAudioEmu.lastContext = this;
  }
  OfflineAudioContext.prototype = Object.create(BaseAudioContext.prototype);
  OfflineAudioContext.prototype.startRendering = function () {
    if (this._rendered) return Promise.reject(err("InvalidStateError", "already rendered"));
    this._rendered = true;
    this.state = "running";
    var outs = this._outBuf._ch, len = this.length;
    var tmp = outs.map(function () { return new Float32Array(RQ); });
    for (var f = 0; f < len; f += RQ) {
      var cnt = Math.min(RQ, len - f);
      this._renderQuantum(tmp, 0, RQ);
      for (var c = 0; c < outs.length; c++) outs[c].set(tmp[c].subarray(0, cnt), f);
    }
    this.state = "closed";
    var buf = this._outBuf;
    if (typeof this.oncomplete === "function") { try { this.oncomplete({ renderedBuffer: buf }); } catch (e) {} }
    return Promise.resolve(buf);
  };

  var api = {
    AudioContext: AudioContext,
    OfflineAudioContext: OfflineAudioContext,
    AudioBuffer: AudioBuffer,
    AudioParam: AudioParam,
    AudioNode: AudioNode,
    GainNode: GainNode,
    BiquadFilterNode: BiquadFilterNode,
    OscillatorNode: OscillatorNode,
    AudioBufferSourceNode: AudioBufferSourceNode,
    DelayNode: DelayNode,
    StereoPannerNode: StereoPannerNode,
    WaveShaperNode: WaveShaperNode,
    DynamicsCompressorNode: DynamicsCompressorNode,
    RENDER_QUANTUM: RQ,
    defaultSampleRate: 48000,
    lastContext: null,
    unsupported: unsupported,
    fft: fftInPlace,
    biquadCoefs: biquadCoefs,
    waveTables: waveTables,
    /* put the constructors where page code looks for them */
    install: function (g) {
      g.AudioContext = AudioContext;
      g.webkitAudioContext = undefined;
      g.OfflineAudioContext = OfflineAudioContext;
      g.webkitOfflineAudioContext = undefined;
      g.AudioBuffer = AudioBuffer;
      g.AudioParam = AudioParam;
    },
  };
  return api;
})();
