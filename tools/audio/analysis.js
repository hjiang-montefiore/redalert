/* ============ tools/audio/analysis.js - the measurements, in jsc ============

   Everything numeric about a rendered sound is computed here, next to the
   samples, because JavaScriptCore's JIT does an FFT in microseconds and
   python3 without numpy would take minutes. audition.py only draws what this
   file hands it.

   Definitions (so two people quoting a number mean the same thing):
     peak_dbfs     largest |sample| over both channels, dBFS (sample peak, not
                   true peak)
     onset / end   first and last frame whose |sample| is within 60 dB of the
                   peak; dur60 = end - onset. dur50 is the same at 50 dB, the
                   threshold audio.js's own comments quote durations at.
     rms_dbfs      RMS over both channels between onset and end60
     crest_db      peak_dbfs - rms_dbfs
     lufs          ITU-R BS.1770-4 integrated loudness: K-weighting (the
                   +4 dB shelf at 1682 Hz and the 38 Hz high-pass), 400 ms
                   blocks at 75 % overlap, -70 LUFS absolute gate, -10 LU
                   relative gate, L and R weighted 1.0. A sound shorter than one
                   block is measured as if padded with silence to 400 ms, which
                   is what a meter shows for a single shot.
     lufs_mmax     the loudest single 400 ms block (BS.1770 momentary max)
     centroid_hz   power-weighted mean frequency of the long-window spectrum
                   averaged over onset..end60
   The spectrogram is of the mid signal (L+R)/2, two resolutions stitched on
   one log-frequency axis: a 4096-point Hann window (85 ms, 11.7 Hz bins)
   below 500 Hz where the sub-bass of a blast lives, a 1024-point window
   (21 ms) above it where the crack and the ring need time resolution. A
   sound under 300 ms (every selection cue) gets 2048 / 512 instead, or the
   long window would smear a 47 ms click across twice its own length. The
   hop is the length / 1100 (one frame per pixel column), at least 32 frames.
   ========================================================================= */

var AudioAnalysis = (function () {
  "use strict";

  function fft(re, im) {
    var n = re.length, i, j, k, m;
    for (i = 1, j = 0; i < n; i++) {
      var bit = n >> 1;
      for (; j & bit; bit >>= 1) j ^= bit;
      j ^= bit;
      if (i < j) { var tr = re[i]; re[i] = re[j]; re[j] = tr; var ti = im[i]; im[i] = im[j]; im[j] = ti; }
    }
    for (m = 2; m <= n; m <<= 1) {
      var ang = -2 * Math.PI / m, wr = Math.cos(ang), wi = Math.sin(ang), half = m >> 1;
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
  function hann(N) {
    var w = new Float64Array(N);
    for (var i = 0; i < N; i++) w[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / N);
    return w;
  }
  function db(x) { return x > 0 ? 20 * Math.log(x) * Math.LOG10E : -Infinity; }

  /* ---- BS.1770 K-weighting, from the standard's analogue prototypes so
     it is right at any rate (at 48 kHz these reproduce the published
     coefficients 1.53512486, -2.69169619, 1.19839281 / -1.69065929, 0.73248077
     and 1, -2, 1 / -1.99004745, 0.99007225) ---- */
  function kCoefs(sr) {
    var f0 = 1681.974450955533, G = 3.999843853973347, Q = 0.7071752369554196;
    var K = Math.tan(Math.PI * f0 / sr), Vh = Math.pow(10, G / 20), Vb = Math.pow(Vh, 0.4996667741545416);
    var a0 = 1 + K / Q + K * K;
    var s1 = { b: [(Vh + Vb * K / Q + K * K) / a0, 2 * (K * K - Vh) / a0, (Vh - Vb * K / Q + K * K) / a0],
               a: [2 * (K * K - 1) / a0, (1 - K / Q + K * K) / a0] };
    f0 = 38.13547087602444; Q = 0.5003270373238773; K = Math.tan(Math.PI * f0 / sr);
    var a0h = 1 + K / Q + K * K;
    var s2 = { b: [1, -2, 1], a: [2 * (K * K - 1) / a0h, (1 - K / Q + K * K) / a0h] };
    return [s1, s2];
  }
  function runBiquad(x, co) {
    var y = new Float64Array(x.length), x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    var b0 = co.b[0], b1 = co.b[1], b2 = co.b[2], a1 = co.a[0], a2 = co.a[1];
    for (var i = 0; i < x.length; i++) {
      var v = b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
      x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v;
    }
    return y;
  }

  function loudness(L, R, sr) {
    var co = kCoefs(sr);
    var blk = Math.round(0.4 * sr), step = Math.round(0.1 * sr);
    var n = Math.max(L.length, blk);
    function pad(x) { if (x.length >= n) return x; var p = new Float64Array(n); p.set(x); return p; }
    var yl = runBiquad(runBiquad(pad(L), co[0]), co[1]);
    var yr = runBiquad(runBiquad(pad(R), co[0]), co[1]);
    /* prefix sums of squares make every block O(1) */
    var cs = new Float64Array(n + 1);
    for (var i = 0; i < n; i++) cs[i + 1] = cs[i] + yl[i] * yl[i] + yr[i] * yr[i];
    var z = [];
    for (var s = 0; s + blk <= n; s += step) z.push((cs[s + blk] - cs[s]) / blk);
    function lk(v) { return -0.691 + 10 * Math.log(v) * Math.LOG10E; }
    var mmax = -Infinity, j;
    for (j = 0; j < z.length; j++) if (z[j] > 0) mmax = Math.max(mmax, lk(z[j]));
    var abs = z.filter(function (v) { return v > 0 && lk(v) > -70; });
    if (!abs.length) return { integrated: -Infinity, momentaryMax: mmax, blocks: z.length };
    var m1 = abs.reduce(function (a, b) { return a + b; }, 0) / abs.length;
    var rel = lk(m1) - 10;
    var gated = abs.filter(function (v) { return lk(v) > rel; });
    var m2 = gated.reduce(function (a, b) { return a + b; }, 0) / gated.length;
    return { integrated: lk(m2), momentaryMax: mmax, blocks: z.length };
  }

  function levels(L, R, sr) {
    var n = L.length, peak = 0, i;
    for (i = 0; i < n; i++) { var a = Math.abs(L[i]), b = Math.abs(R[i]); if (a > peak) peak = a; if (b > peak) peak = b; }
    var out = { peak: peak, peak_dbfs: db(peak), onset: -1, end60: -1, end50: -1, rms_dbfs: -Infinity, crest_db: NaN };
    if (peak <= 0) return out;
    var t60 = peak * 1e-3, t50 = peak * Math.pow(10, -2.5);
    for (i = 0; i < n; i++) if (Math.abs(L[i]) >= t60 || Math.abs(R[i]) >= t60) { out.onset = i; break; }
    for (i = n - 1; i >= 0; i--) if (Math.abs(L[i]) >= t60 || Math.abs(R[i]) >= t60) { out.end60 = i; break; }
    for (i = n - 1; i >= 0; i--) if (Math.abs(L[i]) >= t50 || Math.abs(R[i]) >= t50) { out.end50 = i; break; }
    var on50 = -1;
    for (i = 0; i < n; i++) if (Math.abs(L[i]) >= t50 || Math.abs(R[i]) >= t50) { on50 = i; break; }
    var ss = 0;
    for (i = out.onset; i <= out.end60; i++) ss += L[i] * L[i] + R[i] * R[i];
    var cnt = 2 * (out.end60 - out.onset + 1);
    out.rms_dbfs = 10 * Math.log(ss / cnt) * Math.LOG10E;
    out.crest_db = out.peak_dbfs - out.rms_dbfs;
    out.onset_ms = out.onset / sr * 1000;
    out.dur60_ms = (out.end60 - out.onset + 1) / sr * 1000;
    out.dur50_ms = (out.end50 - on50 + 1) / sr * 1000;
    out.end60_ms = out.end60 / sr * 1000;
    return out;
  }

  /* per-column min/max of each channel and the column's peak in dBFS */
  function envelope(L, R, cols) {
    var n = L.length, e = new Float32Array(cols * 5);
    for (var c = 0; c < cols; c++) {
      var a = Math.floor(c * n / cols), b = Math.max(a + 1, Math.floor((c + 1) * n / cols));
      var mnL = 0, mxL = 0, mnR = 0, mxR = 0, pk = 0;
      for (var i = a; i < b && i < n; i++) {
        var l = L[i], r = R[i];
        if (l < mnL) mnL = l; if (l > mxL) mxL = l;
        if (r < mnR) mnR = r; if (r > mxR) mxR = r;
        var m = Math.max(Math.abs(l), Math.abs(r)); if (m > pk) pk = m;
      }
      e[c * 5] = mnL; e[c * 5 + 1] = mxL; e[c * 5 + 2] = mnR; e[c * 5 + 3] = mxR;
      e[c * 5 + 4] = pk > 0 ? Math.max(-200, db(pk)) : -200;
    }
    return e;
  }

  /* multi-resolution log-frequency spectrogram of (L+R)/2 */
  function spectrogram(L, R, sr, opts) {
    opts = opts || {};
    var n = L.length, short = n < 0.3 * sr;
    var hop = opts.hop || Math.max(32, Math.ceil(n / (opts.maxFrames || 1100)));
    var rows = opts.rows || 256, fLo = opts.fLo || 20, fHi = opts.fHi || sr / 2;
    var dbLo = opts.dbLo === undefined ? -120 : opts.dbLo, dbHi = opts.dbHi === undefined ? 0 : opts.dbHi;
    var split = opts.split || 500;
    var NL = opts.NL || (short ? 2048 : 4096), NS = opts.NS || (short ? 512 : 1024);
    var mid = new Float64Array(n);
    for (var i = 0; i < n; i++) mid[i] = 0.5 * (L[i] + R[i]);
    var frames = Math.max(1, Math.ceil(n / hop));
    var wl = hann(NL), ws = hann(NS);
    /* row edges on a log axis, and the FFT bins each row reads */
    var edges = new Float64Array(rows + 1);
    for (var r = 0; r <= rows; r++) edges[r] = fLo * Math.pow(fHi / fLo, r / rows);
    function binMap(N) {
      var df = sr / N, lo = new Int32Array(rows), hi = new Int32Array(rows);
      for (var r2 = 0; r2 < rows; r2++) {
        var a = Math.ceil(edges[r2] / df), b = Math.floor(edges[r2 + 1] / df);
        if (b < a) { a = b = Math.round(Math.sqrt(edges[r2] * edges[r2 + 1]) / df); }
        lo[r2] = Math.max(1, Math.min(N / 2, a)); hi[r2] = Math.max(1, Math.min(N / 2, b));
      }
      return { lo: lo, hi: hi };
    }
    var mapL = binMap(NL), mapS = binMap(NS);
    var useLong = new Uint8Array(rows);
    for (var r3 = 0; r3 < rows; r3++) useLong[r3] = Math.sqrt(edges[r3] * edges[r3 + 1]) < split ? 1 : 0;
    var data = new Uint8Array(frames * rows);
    var reL = new Float64Array(NL), imL = new Float64Array(NL), reS = new Float64Array(NS), imS = new Float64Array(NS);
    var powL = new Float64Array(NL / 2 + 1), powS = new Float64Array(NS / 2 + 1);
    var avg = new Float64Array(NL / 2 + 1);
    var normL = (NL / 4) * (NL / 4), normS = (NS / 4) * (NS / 4);   // full-scale sine = 0 dB
    var span = opts.span || levels(L, R, sr), a0 = span.onset, a1 = span.end60, nAvg = 0;
    var scale = 255 / (dbHi - dbLo);
    for (var f = 0; f < frames; f++) {
      var c0 = f * hop, k, s;
      for (k = 0; k < NL; k++) { s = c0 - NL / 2 + k; reL[k] = (s >= 0 && s < n) ? mid[s] * wl[k] : 0; imL[k] = 0; }
      fft(reL, imL);
      for (k = 0; k <= NL / 2; k++) powL[k] = (reL[k] * reL[k] + imL[k] * imL[k]) / normL;
      for (k = 0; k < NS; k++) { s = c0 - NS / 2 + k; reS[k] = (s >= 0 && s < n) ? mid[s] * ws[k] : 0; imS[k] = 0; }
      fft(reS, imS);
      for (k = 0; k <= NS / 2; k++) powS[k] = (reS[k] * reS[k] + imS[k] * imS[k]) / normS;
      if (a0 >= 0 && c0 >= a0 && c0 <= a1) { for (k = 0; k <= NL / 2; k++) avg[k] += powL[k]; nAvg++; }
      for (var r4 = 0; r4 < rows; r4++) {
        var P = useLong[r4] ? powL : powS, mp = useLong[r4] ? mapL : mapS, best = 0;
        for (k = mp.lo[r4]; k <= mp.hi[r4]; k++) if (P[k] > best) best = P[k];
        var d = best > 0 ? 10 * Math.log(best) * Math.LOG10E : -300;
        var v = Math.round((d - dbLo) * scale);
        data[f * rows + r4] = v < 0 ? 0 : v > 255 ? 255 : v;
      }
    }
    var num = 0, den = 0;
    for (var k2 = 1; k2 <= NL / 2; k2++) { num += k2 * sr / NL * avg[k2]; den += avg[k2]; }
    return { data: data, frames: frames, rows: rows, hop: hop, fLo: fLo, fHi: fHi, dbLo: dbLo, dbHi: dbHi,
             split: split, NL: NL, NS: NS, centroid: den > 0 ? num / den : NaN };
  }

  return { fft: fft, hann: hann, db: db, kCoefs: kCoefs, loudness: loudness, levels: levels,
           envelope: envelope, spectrogram: spectrogram };
})();
