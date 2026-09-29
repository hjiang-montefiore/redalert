/* ============ tools/audio/selftest.js - does the emulator tell the truth? ============

   Run:  python3 tools/audio/audition.py --selftest
   (or directly: jsc tools/audio/selftest.js -- /path/to/repo)

   A spectrogram of a gun is only worth looking at if the machine that drew it
   gets the basics right, so each check here is a number the Web Audio spec
   (or ITU-R BS.1770) states exactly, measured off the emulator's own output:
   a 1 kHz sine lands at 1 kHz and at the level the gain says; biquads hit the
   cookbook's gain at the cutoff with the spec's Q-in-dB convention; ramps and
   time constants land where the spec's formulas put them; modulation adds;
   oscillators are band-limited; the waveshaper maps the curve exactly; the
   compressor applies the spec's makeup gain; panning is equal-power; delay and
   start times are sample-exact. The last checks load the real js/audio.js and
   fire a real report through it.

   Note on "a lowpass is -3 dB at cutoff": under the spec's convention that
   is true for Q = -3.01 dB (Butterworth), NOT for Q = 0 dB - Q = 0 dB is a
   gain of exactly 1 (0 dB) at the cutoff, because the spec's alpha is
   sin(w0) / (2 * 10^(Q/20)). Both are checked below.
   ========================================================================= */

var __SELFTEST_ARGS = (typeof arguments !== "undefined") ? arguments : [];
(function () {
  var HERE = __SELFTEST_ARGS.length > 1 ? __SELFTEST_ARGS[1] : null;
  var ROOT = __SELFTEST_ARGS.length > 0 ? __SELFTEST_ARGS[0] : ".";
  var TOOL = HERE || (ROOT + "/tools/audio");
  load(TOOL + "/webaudio_emu.js");
  load(TOOL + "/analysis.js");

  var passed = 0, failed = 0, lines = [];
  function check(name, ok, detail) {
    if (ok) passed++; else failed++;
    print((ok ? "PASS " : "FAIL ") + name + (detail ? "  -- " + detail : ""));
  }
  function near(a, b, tol) { return Math.abs(a - b) <= tol; }
  function f4(x) { return (Math.round(x * 10000) / 10000).toString(); }
  function db(x) { return 20 * Math.log(x) / Math.LN10; }
  var SR = 48000;
  function mk() { return new WebAudioEmu.AudioContext({ sampleRate: SR }); }
  function ones(c) {
    var b = c.createBuffer(1, 256, SR); b.getChannelData(0).fill(1);
    var s = c.createBufferSource(); s.buffer = b; s.loop = true; return s;
  }
  function rms(x, a, b) { var s = 0; for (var i = a; i < b; i++) s += x[i] * x[i]; return Math.sqrt(s / (b - a)); }
  function sineThrough(build, f, amp, sec) {
    var c = mk(), o = c.createOscillator(); o.frequency.value = f;
    var g = c.createGain(); g.gain.value = amp;
    o.connect(g); var tail = build(c, g); tail.connect(c.destination);
    o.start(0); c.__renderTo(sec || 0.6);
    return c.__output();
  }
  /* frequency from interpolated upward zero crossings */
  function zcFreq(x, a, b) {
    var first = -1, last = -1, n = 0;
    for (var i = a + 1; i < b; i++) if (x[i - 1] < 0 && x[i] >= 0) {
      var t = (i - 1) + (-x[i - 1]) / (x[i] - x[i - 1]);
      if (first < 0) first = t; last = t; n++;
    }
    return (n - 1) * SR / (last - first);
  }
  function spectrumDb(x, a, N) {
    var re = new Float64Array(N), im = new Float64Array(N), w = AudioAnalysis.hann(N);
    for (var i = 0; i < N; i++) re[i] = x[a + i] * w[i];
    AudioAnalysis.fft(re, im);
    var out = new Float64Array(N / 2 + 1);
    for (var k = 0; k <= N / 2; k++) out[k] = 10 * Math.log((re[k] * re[k] + im[k] * im[k]) / ((N / 4) * (N / 4)) + 1e-30) / Math.LN10;
    return out;
  }
  function bandMax(s, N, f, halfBins) {
    var k0 = Math.round(f * N / SR), m = -400;
    for (var k = Math.max(0, k0 - halfBins); k <= Math.min(N / 2, k0 + halfBins); k++) m = Math.max(m, s[k]);
    return m;
  }

  /* ---- 1. a 1 kHz sine lands at 1 kHz at the right level ---- */
  (function () {
    var out = sineThrough(function (c, g) { return g; }, 1000, 0.5, 1.0);
    var f = zcFreq(out.L, 4800, 48000);
    var r = db(rms(out.L, 4800, 48000));
    var same = true;
    for (var i = 0; i < out.length; i++) if (out.L[i] !== out.R[i]) { same = false; break; }
    check("1 kHz sine measures 1000 Hz", near(f, 1000, 0.01), f4(f) + " Hz");
    check("sine at gain 0.5 is -9.03 dBFS RMS", near(r, db(0.5 / Math.SQRT2), 0.01), r.toFixed(3) + " dBFS");
    check("a mono voice is copied to both sides of the stereo destination (L == R)", same);
  })();

  /* ---- 2. biquads at the cutoff, spec Q conventions ---- */
  function filtGain(type, f0, Q, G, probe) {
    var out = sineThrough(function (c, g) {
      var b = c.createBiquadFilter(); b.type = type; b.frequency.value = f0; b.Q.value = Q; if (G) b.gain.value = G;
      g.connect(b); return b;
    }, probe || f0, 1, 0.8);
    return db(rms(out.L, 9600, 38400) * Math.SQRT2);
  }
  var QBW = 20 * Math.log(Math.SQRT1_2) / Math.LN10;      // -3.0103 dB
  var g1 = filtGain("lowpass", 1000, QBW);
  check("lowpass, Q = -3.01 dB (Butterworth): -3.01 dB at the cutoff", near(g1, -3.0103, 0.02), g1.toFixed(3) + " dB");
  var g2 = filtGain("lowpass", 1000, 0);
  check("lowpass, Q = 0 dB: 0.00 dB at the cutoff (spec: gain there = 10^(Q/20))", near(g2, 0, 0.02), g2.toFixed(3) + " dB");
  var g3 = filtGain("lowpass", 1000, 1);
  check("lowpass, default Q = 1 dB: +1.00 dB at the cutoff", near(g3, 1, 0.02), g3.toFixed(3) + " dB");
  var g4 = filtGain("lowpass", 1000, QBW, 0, 2000);
  check("Butterworth lowpass one octave up is 12 dB down", g4 < -11.8 && g4 > -12.8, g4.toFixed(2) + " dB");
  var g5 = filtGain("highpass", 1000, QBW);
  check("highpass, Q = -3.01 dB: -3.01 dB at the cutoff", near(g5, -3.0103, 0.02), g5.toFixed(3) + " dB");
  var g6 = filtGain("bandpass", 1000, 2);
  check("bandpass (Q a plain ratio): 0.00 dB at the centre", near(g6, 0, 0.02), g6.toFixed(3) + " dB");
  var g7 = filtGain("peaking", 2000, 0.9, 9);
  check("peaking +9 dB: +9.00 dB at the centre", near(g7, 9, 0.02), g7.toFixed(3) + " dB");
  (function () {
    var c = mk(), b = c.createBiquadFilter(); b.frequency.value = 1000; b.Q.value = QBW;
    var m = new Float32Array(1), p = new Float32Array(1);
    b.getFrequencyResponse(new Float32Array([1000]), m, p);
    check("getFrequencyResponse agrees: |H(1 kHz)| = 0.7071", near(m[0], Math.SQRT1_2, 1e-4), f4(m[0]));
  })();

  /* ---- 3. automation: ramps hit their targets ---- */
  function paramRun(setup, sec) {
    var c = mk(), s = ones(c), g = c.createGain();
    s.connect(g); g.connect(c.destination); s.start(0);
    setup(g.gain, c);
    c.__renderTo(sec);
    return c.__output().L;
  }
  (function () {
    var x = paramRun(function (p) { p.setValueAtTime(0, 0); p.linearRampToValueAtTime(1, 1.0); }, 1.2);
    check("linear ramp 0 -> 1 over 1 s is 0.5 at 0.5 s", near(x[24000], 0.5, 1e-4), f4(x[24000]));
    check("linear ramp ends at its target and holds it", x[48000] === 1 && x[55000] === 1, f4(x[48000]));
    var y = paramRun(function (p) { p.setValueAtTime(0.001, 0); p.exponentialRampToValueAtTime(1, 1.0); }, 1.2);
    check("exponential ramp 0.001 -> 1 is the geometric mean 0.03162 halfway", near(y[24000], Math.sqrt(0.001), 2e-6), y[24000].toFixed(6));
    check("exponential ramp ends at its target", near(y[48000], 1, 1e-6) && near(y[50000], 1, 1e-6), f4(y[48000]));
    var z = paramRun(function (p) { p.value = 0; p.setTargetAtTime(1, 0.1, 0.05); }, 0.5);
    check("setTargetAtTime reaches 1 - 1/e = 0.6321 after one time constant", near(z[7200], 1 - Math.exp(-1), 1e-4), f4(z[7200]));
    var w = paramRun(function (p) { p.setValueAtTime(0.25, 0); p.linearRampToValueAtTime(1, 1.0); p.cancelScheduledValues(0.5); }, 1.0);
    check("cancelScheduledValues removes the ramp: the value holds 0.25", near(w[24000], 0.25, 1e-7) && near(w[47000], 0.25, 1e-7), f4(w[47000]));
    /* spec: a ramp with no event before it starts from the current value at
       the moment it was scheduled - audio.js's beep() and under_fire rely on it */
    var c = mk(), s = ones(c), g = c.createGain();
    s.connect(g); g.connect(c.destination); s.start(0);
    c.__renderTo(0.5);
    var T0 = c.currentTime;                      // 0.50133 s: the clock sits on a quantum boundary
    g.gain.linearRampToValueAtTime(0, 1.5);
    c.__renderTo(1.6);
    var v = c.__output().L, want = 1 - (1.0 - T0) / (1.5 - T0);
    check("a ramp with no preceding event starts at currentTime from the current value", near(v[48000], want, 1e-6) && v[12000] === 1, f4(v[48000]) + " (spec " + f4(want) + ")");
    var c2 = mk(), s2 = ones(c2), g2 = c2.createGain();
    s2.connect(g2); g2.connect(c2.destination); s2.start(0);
    c2.__renderTo(0.2);
    g2.gain.setValueAtTime(0.25, 0.05);                 // in the past: lands at currentTime
    c2.__renderTo(0.3);
    var o2 = c2.__output().L, at = Math.round(c2.currentTime * SR) - 1;
    check("an automation time in the past is clamped to currentTime", o2[9599] === 1 && near(o2[at], 0.25, 1e-7), o2[9599] + " then " + f4(o2[at]));
    var u = paramRun(function (p) { p.setValueAtTime(0, 0); p.setValueCurveAtTime(new Float32Array([0, 1, 0.5]), 0.1, 0.2); }, 0.5);
    check("setValueCurveAtTime interpolates the curve", near(u[Math.round(0.2 * SR)], 1, 1e-3) && near(u[Math.round(0.25 * SR)], 0.75, 1e-3), f4(u[Math.round(0.25 * SR)]));
  })();

  /* ---- 4. modulation by connect(param): the torpedo's bubble LFO ---- */
  (function () {
    var c = mk(), s = ones(c), g = c.createGain(); g.gain.value = 0.5;
    var lfo = c.createOscillator(); lfo.frequency.value = 10;
    var lg = c.createGain(); lg.gain.value = 0.5;
    lfo.connect(lg); lg.connect(g.gain);
    s.connect(g); g.connect(c.destination); s.start(0); lfo.start(0);
    c.__renderTo(1.3);
    var x = c.__output().L, mn = 9, mx = -9;
    for (var i = 9600; i < 57600; i++) { mn = Math.min(mn, x[i]); mx = Math.max(mx, x[i]); }
    check("an oscillator connected to gain.gain adds to its value (0.5 +- 0.5)", near(mn, 0, 0.002) && near(mx, 1, 0.002), "min " + f4(mn) + " max " + f4(mx));
  })();

  /* ---- 5. oscillators are band-limited ---- */
  function oscSpec(type, f, N) {
    var c = mk(), o = c.createOscillator(); o.type = type; o.frequency.value = f;
    o.connect(c.destination); o.start(0); c.__renderTo(0.1 + N / SR + 0.01);
    return spectrumDb(c.__output().L, 4800, N);
  }
  (function () {
    /* test tones sit exactly on FFT bins (48000/16384 = 2.93 Hz), so a Hann
       window's scalloping cannot move a harmonic by the 0.6 dB it would
       cost a tone a third of a bin off */
    var N = 16384, F = 1600 * SR / N, s = oscSpec("sawtooth", F, N);   // 4687.5 Hz
    var fund = bandMax(s, N, F, 1), worst = -400, worstF = 0;
    for (var k = 1; k <= N / 2; k++) {
      var f = k * SR / N, h = f / F, dist = Math.abs(h - Math.round(h)) * F;
      if (dist < 150) continue;                   // a real harmonic and its window skirt
      if (s[k] > worst) { worst = s[k]; worstF = f; }
    }
    check("4.69 kHz sawtooth: nothing folds back (worst non-harmonic bin < -90 dB re fundamental)", worst - fund < -90, (worst - fund).toFixed(1) + " dB at " + worstF.toFixed(0) + " Hz");
    var h4 = bandMax(s, N, 4 * F, 1) - fund, h5 = bandMax(s, N, 5 * F, 1) - fund;
    check("4.69 kHz sawtooth keeps every partial under Nyquist at 1/n (4th -12.04, 5th -13.98 dB)", near(h4, db(1 / 4), 0.05) && near(h5, db(1 / 5), 0.05), h4.toFixed(2) + ", " + h5.toFixed(2) + " dB");
    var G = 512 * SR / N, q = oscSpec("square", G, N), qf = bandMax(q, N, G, 1);      // 1500 Hz
    var q2 = bandMax(q, N, 2 * G, 1) - qf, q3 = bandMax(q, N, 3 * G, 1) - qf;
    check("square wave: no even harmonics (2nd < -90 dB), 3rd at -9.54 dB", q2 < -90 && near(q3, db(1 / 3), 0.05), "2nd " + q2.toFixed(1) + ", 3rd " + q3.toFixed(2));
    var t = oscSpec("triangle", G, N), tf = bandMax(t, N, G, 1), t3 = bandMax(t, N, 3 * G, 1) - tf;
    check("triangle wave: 3rd harmonic at -19.08 dB (1/n^2)", near(t3, db(1 / 9), 0.05), t3.toFixed(2) + " dB");
    /* the Gibbs spike is narrower than a sample, so read the tables themselves */
    var ok = true, detail = [];
    ["square", "sawtooth", "triangle"].forEach(function (ty) {
      var W = WebAudioEmu.waveTables(ty), p0 = 0, pAll = 0;
      for (var ti = 0; ti < W.tables.length; ti++) {
        var tb = W.tables[ti];
        for (var i = 0; i < tb.length; i++) { var a = Math.abs(tb[i]); if (a > pAll) pAll = a; if (ti === 0 && a > p0) p0 = a; }
      }
      /* one shared scale, as Chrome does: a square down to its last two or
         three partials peaks at 1.08 (sin x + sin 3x / 3 overshoots) */
      if (!near(p0, 1, 1e-6) || pAll > 1.09) ok = false;
      detail.push(ty + " " + f4(p0) + " (max " + f4(pAll) + ")");
    });
    check("built-in waves share one normalisation: fullest table peaks at 1", ok, detail.join(", "));
  })();

  /* ---- 6. the waveshaper curve mapping ---- */
  (function () {
    function through(xv, os) {
      var c = mk(), s = ones(c), g = c.createGain(); g.gain.value = xv;
      var w = c.createWaveShaper(); w.curve = new Float32Array([0, 0.5, 1]); w.oversample = os || "none";
      s.connect(g); g.connect(w); w.connect(c.destination); s.start(0); c.__renderTo(0.05);
      return c.__output().L[1000];
    }
    var got = [through(0), through(0.5), through(-1), through(2), through(-0.5)];
    var want = [0.5, 0.75, 0, 1, 0.25];
    var ok = got.every(function (v, i) { return near(v, want[i], 1e-6); });
    check("waveshaper maps x through v = (N-1)/2 (x+1) with interpolation and end clamping", ok, got.map(f4).join(", "));
    var o2 = through(0.5, "2x");
    check("2x oversampling leaves a DC level where the curve puts it", near(o2, 0.75, 1e-3), f4(o2));
    function tanhSine(os) {
      var out = sineThrough(function (c, g) {
        var w = c.createWaveShaper(), n = 2048, cv = new Float32Array(n), k = 1.7, d = Math.tanh(k);
        for (var i = 0; i < n; i++) { var x = i * 2 / (n - 1) - 1; cv[i] = Math.tanh(x * k) / d; }
        w.curve = cv; w.oversample = os; g.connect(w); return w;
      }, 1000, 0.5, 0.4);
      return db(rms(out.L, 4800, 19200));
    }
    /* an identity curve through 2x must give the input back, 31 frames late
       (the up- and down-sampler's group delay), with the halfband's ripple
       at 1 kHz the only error */
    var c9 = mk(), o9 = c9.createOscillator(); o9.frequency.value = 1000;
    var w9 = c9.createWaveShaper(); w9.curve = new Float32Array([-1, 1]); w9.oversample = "2x";
    var sp9 = c9.createStereoPanner(); sp9.pan.value = -1;          // dry copy on L, shaped on R
    var m9 = c9.createGain(); var r9 = c9.createStereoPanner(); r9.pan.value = 1;
    o9.connect(sp9); o9.connect(w9); w9.connect(r9); sp9.connect(m9); r9.connect(m9); m9.connect(c9.destination);
    o9.start(0); c9.__renderTo(0.2);
    var O9 = c9.__output(), e9 = 0, s9 = 0;
    for (var i9 = 2000; i9 < 9000; i9++) { var dd = O9.R[i9] - O9.L[i9 - 31]; e9 += dd * dd; s9 += O9.L[i9 - 31] * O9.L[i9 - 31]; }
    var err9 = 10 * Math.log(e9 / s9) / Math.LN10;
    check("2x oversampler with an identity curve returns the input 31 frames late (error < -80 dB)", err9 < -80, err9.toFixed(1) + " dB");
    var a = tanhSine("none"), b = tanhSine("2x");
    check("audio.js's soft clip: 2x oversampling agrees with none within 0.05 dB at 1 kHz", near(a, b, 0.05), a.toFixed(3) + " vs " + b.toFixed(3));
  })();

  /* ---- 7. the compressor: static curve and the spec's makeup gain ---- */
  (function () {
    function comp(amp, thr, knee, ratio, att, rel) {
      var out = sineThrough(function (c, g) {
        var k = c.createDynamicsCompressor();
        k.threshold.value = thr; k.knee.value = knee; k.ratio.value = ratio; k.attack.value = att; k.release.value = rel;
        g.connect(k); return k;
      }, 1000, amp, 1.2);
      var pk = 0; for (var i = 48000; i < 57600; i++) pk = Math.max(pk, Math.abs(out.L[i]));
      return db(pk);
    }
    var quiet = comp(0.1, -9, 0, 20, 0.002, 0.2);
    check("limiter (-9 dB, 20:1) below threshold: +5.13 dB makeup, (1/curve(0 dBFS))^0.6", near(quiet, -20 + 5.13, 0.05), quiet.toFixed(2) + " dBFS out for -20 in");
    var loud = comp(1.0, -9, 0, 20, 0.002, 0.2);
    check("limiter at 0 dBFS in: about -8.55 + 5.13 = -3.42 dBFS out (+-1 dB: detector is not Chrome's)", near(loud, -3.42, 1.0), loud.toFixed(2) + " dBFS");
    var eng = comp(0.01, -26, 8, 8, 0.05, 0.4);
    check("engine compressor (-26 dB, 8:1, 8 dB knee): +11.55 dB makeup on a quiet bed", near(eng, -40 + 11.55, 0.05), eng.toFixed(2) + " dBFS out for -40 in");
  })();

  /* ---- 8. equal-power panning, sample-exact delay and start ---- */
  (function () {
    var c = mk(), s = ones(c), p = c.createStereoPanner(); p.pan.value = 0.5;
    s.connect(p); p.connect(c.destination); s.start(0); c.__renderTo(0.01);
    var o = c.__output();
    check("StereoPanner pan 0.5 on mono: L = cos(3pi/8), R = sin(3pi/8)", near(o.L[100], Math.cos(3 * Math.PI / 8), 1e-6) && near(o.R[100], Math.sin(3 * Math.PI / 8), 1e-6), f4(o.L[100]) + " / " + f4(o.R[100]));

    var c2 = mk(), b = c2.createBuffer(1, 4, SR); b.getChannelData(0)[0] = 1;
    var s2 = c2.createBufferSource(); s2.buffer = b;
    var d = c2.createDelay(0.5); d.delayTime.value = 0.01;
    s2.connect(d); d.connect(c2.destination); s2.start(0); c2.__renderTo(0.05);
    var x = c2.__output().L, first = -1;
    for (var i = 0; i < x.length; i++) if (x[i] !== 0) { first = i; break; }
    check("DelayNode 10 ms delays an impulse by exactly 480 frames", first === 480 && near(x[480], 1, 1e-6), "first at " + first);

    var c3 = mk(), s3 = ones(c3); s3.connect(c3.destination); s3.start(0.01); s3.stop(0.02); c3.__renderTo(0.05);
    var y = c3.__output().L, a = -1, z = -1;
    for (var j = 0; j < y.length; j++) if (y[j] !== 0) { if (a < 0) a = j; z = j; }
    check("start(0.01)/stop(0.02) play frames 480..959", a === 480 && z === 959, a + ".." + z);

    var c4 = mk(), rb = c4.createBuffer(1, 1000, SR), rd = rb.getChannelData(0);
    for (var k = 0; k < 1000; k++) rd[k] = k;
    var s4 = c4.createBufferSource(); s4.buffer = rb; s4.playbackRate.value = 0.5;
    s4.connect(c4.destination); s4.start(0); c4.__renderTo(0.01);
    var r4 = c4.__output().L;
    check("playbackRate 0.5 reads the buffer at half speed with linear interpolation", r4[3] === 1.5 && r4[100] === 50, r4[3] + ", " + r4[100]);

    var c5 = mk(), s5 = ones(c5); s5.connect(c5.destination); s5.start(0, 0.001);
    var ended = 0; s5.onended = function () { ended++; }; s5.stop(0.003); c5.__renderTo(0.02);
    check("onended fires once when a source stops", ended === 1, "fired " + ended);
  })();

  /* ---- 9. BS.1770: a 1 kHz sine at 0 dBFS in both channels reads 0.0 LUFS ---- */
  (function () {
    var n = 3 * SR, L = new Float32Array(n), R = new Float32Array(n);
    for (var i = 0; i < n; i++) L[i] = R[i] = Math.sin(2 * Math.PI * 997 * i / SR);
    var l0 = AudioAnalysis.loudness(L, R, SR).integrated;
    for (var j = 0; j < n; j++) { L[j] *= 0.1; R[j] = 0; }
    var l1 = AudioAnalysis.loudness(L, R, SR).integrated;
    check("BS.1770: 997 Hz at 0 dBFS in L and R = 0.0 LUFS", near(l0, 0, 0.05), l0.toFixed(3));
    check("BS.1770: 997 Hz at -20 dBFS in one channel = -23.01 LUFS", near(l1, -23.01, 0.05), l1.toFixed(3));
  })();

  /* ---- 10. OfflineAudioContext, for audio.js's own Sfx.render() ---- */
  (function () {
    var oc = new WebAudioEmu.OfflineAudioContext(2, 4800, SR), o = oc.createOscillator();
    o.connect(oc.destination); o.start(0);
    var got = null; oc.startRendering().then(function (b) { got = b; });
    drainMicrotasks();
    var op = 0; if (got) { var d1 = got.getChannelData(1); for (var i = 0; i < d1.length; i++) op = Math.max(op, Math.abs(d1[i])); }
    check("OfflineAudioContext.startRendering resolves with a 4800-frame stereo buffer", got && got.length === 4800 && got.numberOfChannels === 2 && op > 0.99, got ? "peak " + f4(op) : "no buffer");
  })();

  /* ---- 11. the real js/audio.js, fired through its public API ---- */
  (function () {
    var warns = [];
    try {
      globalThis.__IDS = {}; globalThis.__HASH = ""; globalThis.__SEARCH = ""; globalThis.__QUIET_CONSOLE = true;
      load(ROOT + "/tools/jsc/env.js");
      console.warn = function () { warns.push(Array.prototype.join.call(arguments, " ")); };
      WebAudioEmu.install(globalThis);
      ["util", "config", "facts", "rules", "eras", "heavyair", "generations"].forEach(function (f) { load(ROOT + "/js/" + f + ".js"); });
      globalThis.Render = { cam: { x: 1000, y: 1000, z: 1 } };
      load(ROOT + "/js/audio.js");
    } catch (e) { check("js/audio.js loads under the emulator", false, String(e)); return; }
    Sfx.ensure();
    var ctx = Sfx.ctx, before = ctx.__stats().nodes;
    Sfx.weapon(WEAPONS.gun_125, 1000, 1000);
    var made = ctx.__stats().nodes - before;
    ctx.__renderUntilQuiet(6);
    var o = ctx.__output(), pk = 0;
    for (var i = 0; i < o.length; i++) pk = Math.max(pk, Math.abs(o.L[i]), Math.abs(o.R[i]));
    check("Sfx.weapon(125 mm) at the camera builds a graph and renders", made > 10 && pk > 0.1, made + " nodes, peak " + db(pk).toFixed(1) + " dBFS, " + (o.length / SR).toFixed(2) + " s");
    check("no Web Audio call audio.js made is missing from the emulator", WebAudioEmu.unsupported.length === 0 && warns.length === 0, (WebAudioEmu.unsupported.concat(warns)).join("; "));
    var rb = null;
    Sfx.render({ weapon: "gun_125" }).then(function (b) { rb = b; });
    drainMicrotasks();
    var rp = 0; if (rb) { var d = rb.getChannelData(0); for (var j = 0; j < d.length; j++) rp = Math.max(rp, Math.abs(d[j])); }
    check("Sfx.render() (audio.js's own offline path) resolves and is not silent", rb && rb.length === 144000 && rp > 0.1, rb ? "peak " + db(rp).toFixed(1) + " dBFS" : "no buffer");
  })();

  print("==== " + passed + " passed, " + failed + " failed ====");
})();
