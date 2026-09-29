/* ============ tools/model3d/dump.js - a model as triangles, with no browser ============
   Builds one UNIT_MODELS or BLD_MODELS entry under JavaScriptCore and writes
   every triangle it would draw, in model space, with the colour it is painted.
   tools/model3d/shot.py turns that into a contact sheet.

   Why this exists: every model in the game is procedural, so the only way to
   look at one used to be the game in a browser, and the browser is off limits
   for testing (tools/jsc/env.js says why). This builds the model with the
   real three.min.js and the real model scripts, so what comes out is exactly
   the geometry the engine would get - only the lighting is ours.

   usage (any working directory; the repo is found from this file's own path):
     jsc tools/model3d/dump.js -- unit KEY [TEAM] OUT.json [options]
     jsc tools/model3d/dump.js -- bld  KEY [TEAM] OUT.json [options]
     jsc tools/model3d/dump.js -- list [unit|bld] [SUBSTRING] [options]
     jsc tools/model3d/dump.js -- check [unit|bld] [SUBSTRING] [options]
                       builds every matching key, one line each: triangles,
                       size, and any NaN, throw or engine-box mismatch
   TEAM   a faction id from CFG.FACTION_COLORS (nato, pact, pla, kpa, roc, ...)
          or a hex colour such as #4b8fe0. Default nato.
   options
     --extra FILE.js   load a model file that is not in index.html yet, after
                       the index model scripts, where a new hero file goes
                       (repeatable; relative to the working directory).
     --root DIR        read index.html and its scripts from another tree - the
                       untouched repo, say - to dump the "before" of a change.
     --verbose         report every script as it loads.

   Model space is the house contract from js/models3d.js: +X nose, +Y left,
   +Z up, metres, ground (or waterline) at z = 0. Nothing is rescaled: the
   engine normalises scale by measured X extent in render3d getModel, and a
   modeller needs to see the real metres to check them against a drawing.

   Output JSON
     key, kind, team, len        len is the entry's own metadata
     materials  [{ color, emissive, opacity, side, type, name, map, vcol }]
                color is the authored sRGB colour times the mean colour of
                its map. The canvas stub below keeps a coarse raster of every
                painted texture, because the hero models tint white and let a
                CanvasTexture carry the paint: without it an olive M60 dumps
                white.
     tris       [[x1,y1,z1, x2,y2,z2, x3,y3,z3, materialIndex, "#rrggbb"?]]
                wound the way the GPU sees them (a mirrored transform, which
                three.js compensates for with frontFace, is unflipped here);
                the optional colour is the mean of the triangle's vertex colours
     nodes      named objects and their world positions - the engine animates
                turret, roadwheel, rotor, rotordisc, tailrotor, gear, ...
     stats      counts, the visible bbox, the Box3.setFromObject extent the
                engine scales by, NaN and degenerate triangles
   ========================================================================== */
var __m3dArgv = (typeof arguments !== "undefined") ? Array.prototype.slice.call(arguments) : [];
var __m3dT0 = Date.now();

/* ------------------------------------------------------------ the arguments */
var __m3d = (function () {
  var here = String(callerSourceOrigin()).replace(/^file:\/\//, "");
  here = decodeURIComponent(here);
  var toolDir = here.replace(/\/[^\/]*$/, "");
  var o = { root: toolDir.replace(/\/tools\/model3d$/, ""), extra: [], verbose: false, pos: [] };
  for (var i = 0; i < __m3dArgv.length; i++) {
    var a = __m3dArgv[i];
    if (a === "--extra") o.extra.push(__m3dArgv[++i]);
    else if (a === "--root") o.root = String(__m3dArgv[++i]).replace(/\/+$/, "");
    else if (a === "--verbose") o.verbose = true;
    else if (a === "-h" || a === "--help") o.help = true;
    else o.pos.push(a);
  }
  o.cmd = o.pos[0];
  return o;
})();


/* ================================================================ the browser
   Just enough of one for the model scripts and the game tables they read at
   load time. Nothing draws, nothing ticks. */
var window = this, self = this;
var navigator = { userAgent: "jsc-model3d", language: "en", hardwareConcurrency: 1, platform: "jsc" };
var __m3dStore = {};
var localStorage = {
  getItem: function (k) { return Object.prototype.hasOwnProperty.call(__m3dStore, k) ? __m3dStore[k] : null; },
  setItem: function (k, v) { __m3dStore[k] = String(v); },
  removeItem: function (k) { delete __m3dStore[k]; },
  clear: function () { __m3dStore = {}; },
};
var sessionStorage = localStorage;
var location = { hash: "", search: "", href: "file:///model3d", pathname: "/index.html", reload: function () {} };
var history = { replaceState: function () {}, pushState: function () {} };
var performance = { now: function () { return typeof preciseTime === "function" ? preciseTime() * 1000 : Date.now(); } };
var __m3dTimers = [];
function setTimeout(fn) { if (typeof fn === "function") __m3dTimers.push(fn); return __m3dTimers.length; }
function clearTimeout() {}
function setInterval() { return 0; }
function clearInterval() {}
function requestAnimationFrame() { return 0; }
function cancelAnimationFrame() {}
function queueMicrotask(fn) { setTimeout(fn); }
var console = {
  log: function () { if (__m3d.verbose) print("[console] " + Array.prototype.join.call(arguments, " ")); },
  info: function () {}, debug: function () {}, trace: function () {},
  warn: function () { if (__m3d.verbose) print("[warn] " + Array.prototype.join.call(arguments, " ")); },
  error: function () { print("[console.error] " + Array.prototype.join.call(arguments, " ")); },
  time: function () {}, timeEnd: function () {}, group: function () {}, groupEnd: function () {},
};
var alert = function () {}, confirm = function () { return false; }, prompt = function () { return null; };

/* ----------------------------------------------------------- colour parsing */
var __m3dNamed = {
  black: "#000000", white: "#ffffff", red: "#ff0000", green: "#008000", lime: "#00ff00",
  blue: "#0000ff", yellow: "#ffff00", cyan: "#00ffff", aqua: "#00ffff", magenta: "#ff00ff",
  fuchsia: "#ff00ff", gray: "#808080", grey: "#808080", silver: "#c0c0c0", maroon: "#800000",
  olive: "#808000", navy: "#000080", purple: "#800080", teal: "#008080", orange: "#ffa500",
  brown: "#a52a2a", tan: "#d2b48c", khaki: "#f0e68c", darkgray: "#a9a9a9", darkgrey: "#a9a9a9",
  lightgray: "#d3d3d3", lightgrey: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969",
  darkolivegreen: "#556b2f", darkgreen: "#006400", gold: "#ffd700", pink: "#ffc0cb",
  beige: "#f5f5dc", ivory: "#fffff0", wheat: "#f5deb3", sienna: "#a0522d", slategray: "#708090",
  slategrey: "#708090", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", steelblue: "#4682b4",
  crimson: "#dc143c", firebrick: "#b22222", darkred: "#8b0000", orangered: "#ff4500",
};
var __m3dColCache = {};
/* -> [r, g, b, a], channels 0..1, or null for something that is not a colour */
function __m3dParseColor(s) {
  if (s == null) return null;
  s = String(s).trim().toLowerCase();
  if (__m3dColCache.hasOwnProperty(s)) return __m3dColCache[s];
  var out = null, m;
  if (s === "transparent") out = [0, 0, 0, 0];
  else if (__m3dNamed[s]) out = __m3dParseColor(__m3dNamed[s]);
  else if (s.charAt(0) === "#") {
    var h = s.slice(1);
    if (h.length === 3 || h.length === 4) h = h.split("").map(function (c) { return c + c; }).join("");
    if (h.length === 6) h += "ff";
    if (h.length === 8 && /^[0-9a-f]{8}$/.test(h))
      out = [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255,
             parseInt(h.slice(4, 6), 16) / 255, parseInt(h.slice(6, 8), 16) / 255];
  } else if ((m = s.match(/^rgba?\(([^)]*)\)$/))) {
    var p = m[1].split(/[\s,\/]+/).filter(function (x) { return x; });
    var ch = function (x) { return /%$/.test(x) ? parseFloat(x) / 100 : parseFloat(x) / 255; };
    if (p.length >= 3) out = [ch(p[0]), ch(p[1]), ch(p[2]),
      p.length > 3 ? (/%$/.test(p[3]) ? parseFloat(p[3]) / 100 : parseFloat(p[3])) : 1];
  } else if ((m = s.match(/^hsla?\(([^)]*)\)$/))) {
    var q = m[1].split(/[\s,\/]+/).filter(function (x) { return x; });
    if (q.length >= 3) {
      var H = ((parseFloat(q[0]) % 360) + 360) % 360 / 360, S = parseFloat(q[1]) / 100, L = parseFloat(q[2]) / 100;
      var f = function (n) { var k = (n + H * 12) % 12, a2 = S * Math.min(L, 1 - L);
        return L - a2 * Math.max(-1, Math.min(k - 3, 9 - k, 1)); };
      out = [f(0), f(8), f(4), q.length > 3 ? (/%$/.test(q[3]) ? parseFloat(q[3]) / 100 : parseFloat(q[3])) : 1];
    }
  }
  if (out) for (var i = 0; i < 4; i++) { if (!isFinite(out[i])) out[i] = i === 3 ? 1 : 0; out[i] = Math.max(0, Math.min(1, out[i])); }
  __m3dColCache[s] = out;
  return out;
}

/* ============================================================ the canvas
   A coarse raster. Every texture is painted onto a grid of at most 48 cells
   a side, each cell holding premultiplied RGBA, and every fill, stroke, text
   run, gradient, pattern and drawImage lands on the cells it covers with its
   exact area share (polygons are clipped to each cell). Nothing is legible,
   but the MEAN colour of the sheet - which is all a flat-shaded triangle can
   show - comes out right to within a few levels. */
var __M3D_CELLS = 48;
function __m3dCanvas() {
  var cv = { tagName: "CANVAS", nodeName: "CANVAS", style: {}, dataset: {}, __isM3dCanvas: true };
  var W = 300, H = 150, grid = null, gw = 0, gh = 0, cw = 1, ch = 1;
  function reset() { grid = null; }
  function ensure() {
    if (grid) return;
    var n = __M3D_CELLS, big = Math.max(1, W, H);
    gw = Math.max(1, Math.min(n, Math.round(n * W / big)));
    gh = Math.max(1, Math.min(n, Math.round(n * H / big)));
    cw = Math.max(1e-6, W / gw); ch = Math.max(1e-6, H / gh);
    grid = new Float64Array(gw * gh * 4);
  }
  Object.defineProperty(cv, "width", { get: function () { return W; }, set: function (v) { W = Math.max(0, v | 0); reset(); } });
  Object.defineProperty(cv, "height", { get: function () { return H; }, set: function (v) { H = Math.max(0, v | 0); reset(); } });
  cv.setAttribute = function (k, v) { if (k === "width" || k === "height") cv[k] = +v; };
  cv.getAttribute = function (k) { return cv[k]; };
  cv.addEventListener = cv.removeEventListener = function () {};
  cv.getBoundingClientRect = function () { return { left: 0, top: 0, width: W, height: H, right: W, bottom: H }; };
  cv.toDataURL = function () { return "data:,"; };
  cv.toBlob = function (f) { if (f) f(null); };
  /* mean premultiplied colour of the whole sheet */
  cv.__mean = function () {
    if (!grid) return [0, 0, 0, 0];
    var s = [0, 0, 0, 0], n = gw * gh;
    for (var i = 0; i < n; i++) for (var k = 0; k < 4; k++) s[k] += grid[i * 4 + k];
    return [s[0] / n, s[1] / n, s[2] / n, s[3] / n];
  };
  cv.__painted = function () { return !!grid; };

  var ctx = null;
  cv.getContext = function (kind) {
    if (kind !== "2d") return null;
    if (!ctx) ctx = makeCtx();
    return ctx;
  };

  function makeCtx() {
    var st = { fillStyle: "#000000", strokeStyle: "#000000", globalAlpha: 1, lineWidth: 1,
               globalCompositeOperation: "source-over", font: "10px sans-serif",
               textAlign: "start", textBaseline: "alphabetic", tf: [1, 0, 0, 1, 0, 0] };
    var stack = [], path = [], cur = null;
    var c = {
      canvas: cv, lineCap: "butt", lineJoin: "miter", miterLimit: 10, shadowBlur: 0,
      shadowColor: "rgba(0,0,0,0)", shadowOffsetX: 0, shadowOffsetY: 0, filter: "none",
      imageSmoothingEnabled: true, direction: "ltr", lineDashOffset: 0,
    };
    ["fillStyle", "strokeStyle", "globalAlpha", "lineWidth", "globalCompositeOperation",
     "font", "textAlign", "textBaseline"].forEach(function (k) {
      Object.defineProperty(c, k, { get: function () { return st[k]; },
        set: function (v) {
          if (k === "globalAlpha") { v = +v; if (!isFinite(v)) return; v = Math.max(0, Math.min(1, v)); }
          if (k === "lineWidth") { v = +v; if (!(v > 0)) return; }
          st[k] = v; } });
    });
    function T(x, y) { var m = st.tf; return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]; }
    function inv() {
      var m = st.tf, d = m[0] * m[3] - m[1] * m[2];
      if (Math.abs(d) < 1e-12) return null;
      return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d, (m[2] * m[5] - m[3] * m[4]) / d, (m[1] * m[4] - m[0] * m[5]) / d];
    }
    function tscale() { var m = st.tf; return Math.sqrt(Math.abs(m[0] * m[3] - m[1] * m[2])) || 0; }
    function mul(a) {
      var m = st.tf;
      st.tf = [m[0] * a[0] + m[2] * a[1], m[1] * a[0] + m[3] * a[1],
               m[0] * a[2] + m[2] * a[3], m[1] * a[2] + m[3] * a[3],
               m[0] * a[4] + m[2] * a[5] + m[4], m[1] * a[4] + m[3] * a[5] + m[5]];
    }

    /* ---- paint sources: a flat colour, a gradient evaluated per cell, a pattern */
    function paintOf(style) {
      if (style && style.__grad) return style;
      if (style && style.__pattern) return { flat: style.__pattern() };
      var col = __m3dParseColor(style);
      return { flat: col || [0, 0, 0, 1] };
    }
    function paintAt(p, px, py) {
      if (p.flat) return p.flat;
      var iv = p.inv, ux = px, uy = py;
      if (iv) { ux = iv[0] * px + iv[2] * py + iv[4]; uy = iv[1] * px + iv[3] * py + iv[5]; }
      return p.at(ux, uy);
    }
    function gradient(kind, a) {
      var stops = [];
      var g = {
        __grad: true,
        addColorStop: function (o, col) {
          var cc = __m3dParseColor(col); if (!cc) return;
          stops.push([Math.max(0, Math.min(1, +o)), cc]);
          stops.sort(function (p, q) { return p[0] - q[0]; });
        },
        at: function (x, y) {
          var t;
          if (kind === "linear") {
            var dx = a[2] - a[0], dy = a[3] - a[1], L2 = dx * dx + dy * dy;
            t = L2 > 1e-12 ? ((x - a[0]) * dx + (y - a[1]) * dy) / L2 : 0;
          } else if (kind === "radial") {
            var d = Math.sqrt((x - a[3]) * (x - a[3]) + (y - a[4]) * (y - a[4]));
            t = Math.abs(a[5] - a[2]) > 1e-9 ? (d - a[2]) / (a[5] - a[2]) : 0;
          } else {
            t = (Math.atan2(y - a[2], x - a[1]) - a[0]) / (2 * Math.PI); t -= Math.floor(t);
          }
          t = Math.max(0, Math.min(1, t));
          if (!stops.length) return [0, 0, 0, 0];
          if (t <= stops[0][0]) return stops[0][1];
          for (var i = 1; i < stops.length; i++) if (t <= stops[i][0]) {
            var p0 = stops[i - 1], p1 = stops[i], f = (t - p0[0]) / Math.max(1e-9, p1[0] - p0[0]);
            /* canvas interpolates in premultiplied space */
            var A = p0[1][3] + (p1[1][3] - p0[1][3]) * f, out = [0, 0, 0, A];
            for (var k = 0; k < 3; k++) {
              var v = p0[1][k] * p0[1][3] + (p1[1][k] * p1[1][3] - p0[1][k] * p0[1][3]) * f;
              out[k] = A > 1e-6 ? v / A : 0;
            }
            return out;
          }
          return stops[stops.length - 1][1];
        },
      };
      return g;
    }

    /* ---- the one blend every operation ends in */
    function blendCell(i, col, k) {
      var ea = col[3] * st.globalAlpha * k;
      if (!(ea > 0)) return;
      if (ea > 1) ea = 1;
      var o = i * 4, op = st.globalCompositeOperation;
      if (op === "destination-out") { for (var q = 0; q < 4; q++) grid[o + q] *= (1 - ea); return; }
      if (op === "lighter") {
        for (q = 0; q < 3; q++) grid[o + q] = Math.min(1, grid[o + q] + col[q] * ea);
        grid[o + 3] = Math.min(1, grid[o + 3] + ea); return;
      }
      if (op === "multiply") {
        for (q = 0; q < 3; q++) grid[o + q] = grid[o + q] * (1 - ea) + grid[o + q] * col[q] * ea +
          col[q] * ea * (1 - grid[o + 3]);
        grid[o + 3] = ea + grid[o + 3] * (1 - ea); return;
      }
      if (op === "screen") {
        for (q = 0; q < 3; q++) { var d = grid[o + q]; grid[o + q] = d * (1 - ea) + (col[q] + d - col[q] * d) * ea; }
        grid[o + 3] = ea + grid[o + 3] * (1 - ea); return;
      }
      if (op === "destination-over") {
        var room = 1 - grid[o + 3];
        for (q = 0; q < 3; q++) grid[o + q] += col[q] * ea * room;
        grid[o + 3] += ea * room; return;
      }
      if (op === "source-atop") ea *= grid[o + 3];
      else if (op === "destination-in") { for (q = 0; q < 4; q++) grid[o + q] *= (1 - k) + k * col[3] * st.globalAlpha; return; }
      else if (op === "copy") { for (q = 0; q < 3; q++) grid[o + q] = grid[o + q] * (1 - k) + col[q] * ea; grid[o + 3] = grid[o + 3] * (1 - k) + ea; return; }
      /* source-over and everything it is a fair stand-in for (overlay,
         soft-light, darken, lighten, hue...) at this resolution */
      for (q = 0; q < 3; q++) grid[o + q] = col[q] * ea + grid[o + q] * (1 - ea);
      grid[o + 3] = ea + grid[o + 3] * (1 - ea);
    }
    /* area of polygon pts (device px) inside the cell [x0,x1]x[y0,y1] */
    function clipArea(pts, x0, y0, x1, y1) {
      var poly = pts, e, out, i, a, b, ia, ib;
      for (e = 0; e < 4 && poly.length; e++) {
        out = [];
        for (i = 0; i < poly.length; i++) {
          a = poly[i]; b = poly[(i + 1) % poly.length];
          ia = e === 0 ? a[0] >= x0 : e === 1 ? a[0] <= x1 : e === 2 ? a[1] >= y0 : a[1] <= y1;
          ib = e === 0 ? b[0] >= x0 : e === 1 ? b[0] <= x1 : e === 2 ? b[1] >= y0 : b[1] <= y1;
          if (ia) out.push(a);
          if (ia !== ib) {
            var t = e < 2 ? ((e === 0 ? x0 : x1) - a[0]) / (b[0] - a[0]) : ((e === 2 ? y0 : y1) - a[1]) / (b[1] - a[1]);
            out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
          }
        }
        poly = out;
      }
      var s = 0;
      for (i = 0; i < poly.length; i++) { a = poly[i]; b = poly[(i + 1) % poly.length]; s += a[0] * b[1] - b[0] * a[1]; }
      return Math.abs(s) * 0.5;
    }
    /* paint a device-space polygon with a paint, weighting by covered area */
    function paintPoly(pts, paint, weight) {
      if (!pts || pts.length < 3) return;
      ensure();
      var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, i;
      for (i = 0; i < pts.length; i++) {
        var p = pts[i];
        if (!isFinite(p[0]) || !isFinite(p[1])) return;
        if (p[0] < x0) x0 = p[0]; if (p[0] > x1) x1 = p[0];
        if (p[1] < y0) y0 = p[1]; if (p[1] > y1) y1 = p[1];
      }
      var gx0 = Math.max(0, Math.floor(x0 / cw)), gx1 = Math.min(gw - 1, Math.floor(x1 / cw));
      var gy0 = Math.max(0, Math.floor(y0 / ch)), gy1 = Math.min(gh - 1, Math.floor(y1 / ch));
      if (gx0 > gx1 || gy0 > gy1) return;
      /* an axis-aligned rectangle - nearly every fillRect - needs no clipping */
      var rect = pts.length === 4 &&
        ((pts[0][1] === pts[1][1] && pts[1][0] === pts[2][0] && pts[2][1] === pts[3][1] && pts[3][0] === pts[0][0]) ||
         (pts[0][0] === pts[1][0] && pts[1][1] === pts[2][1] && pts[2][0] === pts[3][0] && pts[3][1] === pts[0][1]));
      var cellA = cw * ch;
      for (var gy = gy0; gy <= gy1; gy++) for (var gx = gx0; gx <= gx1; gx++) {
        var cx0 = gx * cw, cy0 = gy * ch, cx1 = cx0 + cw, cy1 = cy0 + ch, a;
        if (rect) a = Math.max(0, Math.min(x1, cx1) - Math.max(x0, cx0)) * Math.max(0, Math.min(y1, cy1) - Math.max(y0, cy0));
        else a = clipArea(pts, cx0, cy0, cx1, cy1);
        if (a <= 0) continue;
        var col = paintAt(paint, cx0 + cw / 2, cy0 + ch / 2);
        blendCell(gy * gw + gx, col, Math.min(1, a / cellA) * (weight == null ? 1 : weight));
      }
    }
    function withInv(p) { if (p.__grad) return { at: p.at, inv: inv() }; return p; }
    function rectPts(x, y, w, h) { return [T(x, y), T(x + w, y), T(x + w, y + h), T(x, y + h)]; }
    function strokeSegs(sub, closed, paint, weight) {
      var hw = Math.max(0.5, st.lineWidth * tscale()) / 2;
      var n = sub.length, last = closed ? n : n - 1;
      for (var i = 0; i < last; i++) {
        var a = sub[i], b = sub[(i + 1) % n];
        var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy);
        if (L < 1e-9) continue;
        var nx = -dy / L * hw, ny = dx / L * hw;
        paintPoly([[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]], paint, weight);
      }
    }
    function fontPx() { var m = String(st.font).match(/([\d.]+)px/); return m ? parseFloat(m[1]) : 10; }
    function textBox(text, x, y) {
      var sz = fontPx(), w = String(text).length * sz * 0.55, h = sz * 0.72;
      var ax = st.textAlign === "center" ? -w / 2 : (st.textAlign === "right" || st.textAlign === "end") ? -w : 0;
      var ay = st.textBaseline === "top" || st.textBaseline === "hanging" ? 0 : st.textBaseline === "middle" ? -h / 2 : -h;
      return [x + ax, y + ay, w, h];
    }
    function arcPts(cx, cy, rx, ry, rot, a0, a1, ccw) {
      var sweep = a1 - a0;
      if (ccw) { if (sweep > 0) sweep -= Math.ceil(sweep / (2 * Math.PI)) * 2 * Math.PI; if (sweep < -2 * Math.PI) sweep = -2 * Math.PI; }
      else { if (sweep < 0) sweep += Math.ceil(-sweep / (2 * Math.PI)) * 2 * Math.PI; if (sweep > 2 * Math.PI) sweep = 2 * Math.PI; }
      var n = Math.max(4, Math.ceil(Math.abs(sweep) / (Math.PI / 12)));
      var cr = Math.cos(rot || 0), sr = Math.sin(rot || 0), out = [];
      for (var i = 0; i <= n; i++) {
        var t = a0 + sweep * i / n, ex = rx * Math.cos(t), ey = ry * Math.sin(t);
        out.push(T(cx + ex * cr - ey * sr, cy + ex * sr + ey * cr));
      }
      return out;
    }
    function addPts(pts) { if (!cur) { cur = { pts: [], closed: false }; path.push(cur); } for (var i = 0; i < pts.length; i++) cur.pts.push(pts[i]); }
    function lastUser() { return cur && cur.u ? cur.u : [0, 0]; }

    c.save = function () { stack.push({ fillStyle: st.fillStyle, strokeStyle: st.strokeStyle, globalAlpha: st.globalAlpha,
      lineWidth: st.lineWidth, globalCompositeOperation: st.globalCompositeOperation, font: st.font,
      textAlign: st.textAlign, textBaseline: st.textBaseline, tf: st.tf.slice() }); };
    c.restore = function () { var s = stack.pop(); if (s) st = s; };
    c.translate = function (x, y) { mul([1, 0, 0, 1, +x || 0, +y || 0]); };
    c.scale = function (x, y) { mul([+x, 0, 0, +y, 0, 0]); };
    c.rotate = function (a) { var co = Math.cos(a), si = Math.sin(a); mul([co, si, -si, co, 0, 0]); };
    c.transform = function (a, b, cc, d, e, f) { mul([a, b, cc, d, e, f]); };
    c.setTransform = function (a, b, cc, d, e, f) {
      if (a && typeof a === "object") st.tf = [a.a, a.b, a.c, a.d, a.e, a.f];
      else st.tf = a === undefined ? [1, 0, 0, 1, 0, 0] : [a, b, cc, d, e, f];
    };
    c.resetTransform = function () { st.tf = [1, 0, 0, 1, 0, 0]; };
    c.getTransform = function () { var m = st.tf; return { a: m[0], b: m[1], c: m[2], d: m[3], e: m[4], f: m[5] }; };
    c.createLinearGradient = function (x0, y0, x1, y1) { return gradient("linear", [x0, y0, x1, y1]); };
    c.createRadialGradient = function (x0, y0, r0, x1, y1, r1) { return gradient("radial", [x0, y0, r0, x1, y1, r1]); };
    c.createConicGradient = function (a, x, y) { return gradient("conic", [a, x, y]); };
    c.createPattern = function (src) {
      return { __pattern: function () {
        if (src && src.__mean) { var m = src.__mean(); return m[3] > 1e-6 ? [m[0] / m[3], m[1] / m[3], m[2] / m[3], m[3]] : [0, 0, 0, 0]; }
        return [0.5, 0.5, 0.5, 1]; }, setTransform: function () {} };
    };
    c.beginPath = function () { path = []; cur = null; };
    c.moveTo = function (x, y) { cur = { pts: [T(x, y)], closed: false, u: [x, y] }; path.push(cur); };
    c.lineTo = function (x, y) { if (!cur) { c.moveTo(x, y); return; } cur.pts.push(T(x, y)); cur.u = [x, y]; };
    c.closePath = function () { if (cur) { cur.closed = true; var s = cur.pts[0]; cur = { pts: [s], closed: false, u: cur.u }; path.push(cur); } };
    c.rect = function (x, y, w, h) { path.push({ pts: rectPts(x, y, w, h), closed: true }); cur = { pts: [T(x, y)], closed: false, u: [x, y] }; path.push(cur); };
    c.roundRect = function (x, y, w, h) { c.rect(x, y, w, h); };
    c.arc = function (x, y, r, a0, a1, ccw) { addPts(arcPts(x, y, r, r, 0, a0, a1, ccw)); cur.u = [x + r * Math.cos(a1), y + r * Math.sin(a1)]; };
    c.ellipse = function (x, y, rx, ry, rot, a0, a1, ccw) { addPts(arcPts(x, y, rx, ry, rot, a0, a1, ccw)); };
    c.arcTo = function (x1, y1) { c.lineTo(x1, y1); };
    c.quadraticCurveTo = function (cx, cy, x, y) {
      var p = lastUser();
      for (var i = 1; i <= 8; i++) { var t = i / 8, u = 1 - t;
        c.lineTo(u * u * p[0] + 2 * u * t * cx + t * t * x, u * u * p[1] + 2 * u * t * cy + t * t * y); }
    };
    c.bezierCurveTo = function (c1x, c1y, c2x, c2y, x, y) {
      var p = lastUser();
      for (var i = 1; i <= 10; i++) { var t = i / 10, u = 1 - t;
        c.lineTo(u * u * u * p[0] + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * x,
                 u * u * u * p[1] + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * y); }
    };
    c.fill = function () {
      var paint = withInv(paintOf(st.fillStyle));
      for (var i = 0; i < path.length; i++) if (path[i].pts.length >= 3) paintPoly(path[i].pts, paint);
    };
    c.stroke = function () {
      var paint = withInv(paintOf(st.strokeStyle));
      for (var i = 0; i < path.length; i++) if (path[i].pts.length >= 2) strokeSegs(path[i].pts, path[i].closed, paint);
    };
    c.clip = function () {};
    c.fillRect = function (x, y, w, h) { paintPoly(rectPts(x, y, w, h), withInv(paintOf(st.fillStyle))); };
    c.strokeRect = function (x, y, w, h) { strokeSegs(rectPts(x, y, w, h), true, withInv(paintOf(st.strokeStyle))); };
    c.clearRect = function (x, y, w, h) {
      var op = st.globalCompositeOperation, ga = st.globalAlpha;
      st.globalCompositeOperation = "destination-out"; st.globalAlpha = 1;
      paintPoly(rectPts(x, y, w, h), { flat: [0, 0, 0, 1] });
      st.globalCompositeOperation = op; st.globalAlpha = ga;
    };
    /* stencil letters cover roughly a third of their box */
    c.fillText = function (t, x, y) { var b = textBox(t, x, y); paintPoly(rectPts(b[0], b[1], b[2], b[3]), withInv(paintOf(st.fillStyle)), 0.35); };
    c.strokeText = function (t, x, y) { var b = textBox(t, x, y); paintPoly(rectPts(b[0], b[1], b[2], b[3]), withInv(paintOf(st.strokeStyle)), 0.2); };
    c.measureText = function (t) { var w = String(t).length * fontPx() * 0.55; return { width: w, actualBoundingBoxAscent: fontPx() * 0.72, actualBoundingBoxDescent: fontPx() * 0.2 }; };
    c.drawImage = function (src) {
      var a = Array.prototype.slice.call(arguments, 1), sw = (src && src.width) || 0, sh = (src && src.height) || 0, d;
      if (a.length >= 8) d = [a[4], a[5], a[6], a[7]];
      else if (a.length >= 4) d = [a[0], a[1], a[2], a[3]];
      else d = [a[0], a[1], sw, sh];
      var col = [0.5, 0.5, 0.5, 1];
      if (src && src.__mean) { var m = src.__mean(); col = m[3] > 1e-6 ? [m[0] / m[3], m[1] / m[3], m[2] / m[3], m[3]] : [0, 0, 0, 0]; }
      paintPoly(rectPts(d[0], d[1], d[2], d[3]), { flat: col });
    };
    c.createImageData = function (w, h) { if (w && w.width) { h = w.height; w = w.width; } return { width: w, height: h, data: new Uint8ClampedArray(Math.max(1, w * h * 4)) }; };
    c.getImageData = function (x, y, w, h) {
      ensure();
      var img = c.createImageData(w, h), d = img.data;
      for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) {
        var gx = Math.max(0, Math.min(gw - 1, Math.floor((x + i) / cw))), gy = Math.max(0, Math.min(gh - 1, Math.floor((y + j) / ch)));
        var o = (gy * gw + gx) * 4, A = grid[o + 3], p = (j * w + i) * 4;
        d[p] = A > 1e-6 ? grid[o] / A * 255 : 0; d[p + 1] = A > 1e-6 ? grid[o + 1] / A * 255 : 0;
        d[p + 2] = A > 1e-6 ? grid[o + 2] / A * 255 : 0; d[p + 3] = A * 255;
      }
      return img;
    };
    c.putImageData = function (img, x, y) {
      if (!img || !img.data) return;
      var d = img.data, n = img.width * img.height, s = [0, 0, 0, 0];
      for (var i = 0; i < n; i++) { var A = d[i * 4 + 3] / 255; s[0] += d[i * 4] / 255 * A; s[1] += d[i * 4 + 1] / 255 * A; s[2] += d[i * 4 + 2] / 255 * A; s[3] += A; }
      var col = s[3] > 1e-6 ? [s[0] / s[3], s[1] / s[3], s[2] / s[3], s[3] / Math.max(1, n)] : [0, 0, 0, 0];
      var op = st.globalCompositeOperation, ga = st.globalAlpha, tf = st.tf;
      st.globalCompositeOperation = "copy"; st.globalAlpha = 1; st.tf = [1, 0, 0, 1, 0, 0];
      paintPoly(rectPts(x, y, img.width, img.height), { flat: col });
      st.globalCompositeOperation = op; st.globalAlpha = ga; st.tf = tf;
    };
    c.setLineDash = function () {}; c.getLineDash = function () { return []; };
    c.isPointInPath = function () { return false; }; c.isPointInStroke = function () { return false; };
    return c;
  }
  return cv;
}

/* -------------------------------------------------------------- the DOM */
function __m3dEl(tag, id) {
  if (String(tag).toLowerCase() === "canvas") return __m3dCanvas();
  var e = {
    tagName: String(tag || "div").toUpperCase(), id: id || "", style: {}, dataset: {}, children: [],
    childNodes: [], className: "", innerHTML: "", textContent: "", value: "", hidden: false,
    classList: { add: function () {}, remove: function () {}, toggle: function () {}, contains: function () { return false; } },
    appendChild: function (x) { this.children.push(x); return x; }, removeChild: function (x) { return x; },
    insertBefore: function (x) { return x; }, append: function () {}, prepend: function () {}, remove: function () {},
    setAttribute: function () {}, getAttribute: function () { return null; }, removeAttribute: function () {},
    addEventListener: function () {}, removeEventListener: function () {}, dispatchEvent: function () { return true; },
    querySelector: function () { return null; }, querySelectorAll: function () { return []; },
    getBoundingClientRect: function () { return { left: 0, top: 0, width: 0, height: 0, right: 0, bottom: 0 }; },
    getContext: function () { return null; }, focus: function () {}, blur: function () {}, click: function () {},
    closest: function () { return null; }, contains: function () { return false; },
  };
  return e;
}
var __m3dBody = __m3dEl("body");
var document = {
  readyState: "loading", body: __m3dBody, head: __m3dEl("head"), documentElement: __m3dEl("html"), hidden: false,
  createElement: function (t) { return __m3dEl(t); },
  createElementNS: function (ns, t) { return __m3dEl(t); },
  createTextNode: function (t) { return { textContent: t }; },
  createDocumentFragment: function () { return __m3dEl("fragment"); },
  /* a game table that looks up its menu at load time gets nothing, as it
     would before the DOM is built; the model scripts never ask */
  getElementById: function () { return null; },
  getElementsByTagName: function () { return []; }, getElementsByClassName: function () { return []; },
  querySelector: function () { return null; }, querySelectorAll: function () { return []; },
  addEventListener: function () {}, removeEventListener: function () {},
  fonts: { ready: { then: function () {} } },
};
window.addEventListener = window.removeEventListener = function () {};
window.dispatchEvent = function () { return true; };
window.matchMedia = function () { return { matches: false, addEventListener: function () {}, addListener: function () {} }; };
window.innerWidth = 1280; window.innerHeight = 800; window.devicePixelRatio = 1;
window.getComputedStyle = function () { return { getPropertyValue: function () { return ""; } }; };
var Image = function () { var e = __m3dEl("img"); e.width = 0; e.height = 0; e.complete = false; return e; };
var OffscreenCanvas = function (w, h) { var c = __m3dCanvas(); c.width = w; c.height = h; return c; };
var ResizeObserver = function () { return { observe: function () {}, unobserve: function () {}, disconnect: function () {} }; };
var MutationObserver = ResizeObserver, IntersectionObserver = ResizeObserver;
var Event = function (t) { this.type = t; }, CustomEvent = Event;
var AudioContext, webkitAudioContext;

/* ============================================================ the scripts
   index.html order, from the first script to the last one before the
   renderer proper. Everything after that point (bloom3d, fx3d, render3d,
   icons3d, ui, game, main, ...) draws or runs the game, and no model entry
   depends on it; a model file added after sub_n.js lands inside the range. */
var __M3D_STOP = /(^|\/)(bloom3d|fx3d|render3d|icons3d|ui|save|game|loading|main|gallery)\.js$/;
var __M3D_SKIP = /(^|\/)(audio|mapedit)\.js$/;   /* sound and the theatre editor: nothing a model reads */
var __m3dLoaded = [], __m3dLoadErrors = [];
function __m3dLoad(path, label) {
  try { load(path); __m3dLoaded.push(label); if (__m3d.verbose) print("[load] " + label); return true; }
  catch (e) {
    __m3dLoadErrors.push(label + ": " + e);
    print("[load error] " + label + ": " + e + (__m3d.verbose ? "\n" + e.stack : ""));
    return false;
  }
}
(function loadAll() {
  var html;
  try { html = readFile(__m3d.root + "/index.html"); }
  catch (e) { print("[model3d] cannot read " + __m3d.root + "/index.html - is --root a repo checkout?"); throw e; }
  var re = /<script\b[^>]*\bsrc\s*=\s*["']([^"'?]+)(?:\?[^"']*)?["'][^>]*>/gi, m, list = [];
  while ((m = re.exec(html))) list.push(m[1]);
  for (var i = 0; i < list.length; i++) {
    if (__M3D_STOP.test(list[i])) break;
    if (__M3D_SKIP.test(list[i])) continue;
    __m3dLoad(__m3d.root + "/" + list[i], list[i]);
  }
  for (var j = 0; j < __m3d.extra.length; j++) __m3dLoad(__m3d.extra[j], "--extra " + __m3d.extra[j]);   /* load() resolves a relative path against the cwd */
  /* anything a script deferred with setTimeout runs now, once */
  for (var k = 0; k < __m3dTimers.length && k < 10000; k++) {
    try { __m3dTimers[k](); } catch (e) { if (__m3d.verbose) print("[timer error] " + e); }
  }
  document.readyState = "complete";
})();

/* ================================================================ list */
function __m3dList(kind, filter) {
  var tables = [];
  if (!kind || kind === "unit") tables.push(["unit", typeof UNIT_MODELS !== "undefined" ? UNIT_MODELS : {}]);
  if (!kind || kind === "bld") tables.push(["bld", typeof BLD_MODELS !== "undefined" ? BLD_MODELS : {}]);
  var n = 0;
  tables.forEach(function (t) {
    var keys = Object.keys(t[1]).filter(function (k) { return t[1][k] && typeof t[1][k].build === "function"; }).sort();
    keys.forEach(function (k) {
      if (filter && k.indexOf(filter) < 0) return;
      var e = t[1][k], tag = [];
      if (e.len) tag.push("len " + e.len);
      if (e.crude) tag.push("crude");
      print(t[0] + "\t" + k + (tag.length ? "\t" + tag.join(", ") : ""));
      n++;
    });
  });
  print("[model3d] " + n + " keys" + (filter ? " matching '" + filter + "'" : "") + ", " + __m3dLoaded.length +
        " scripts loaded" + (__m3dLoadErrors.length ? ", " + __m3dLoadErrors.length + " load errors" : ""));
}

/* ================================================================ dump */
function __m3dTeamColor(team) {
  team = team || "nato";
  if (/^#?[0-9a-f]{6}$/i.test(team)) return team.charAt(0) === "#" ? team : "#" + team;
  if (typeof CFG !== "undefined" && CFG.FACTION_COLORS && CFG.FACTION_COLORS[team]) return CFG.FACTION_COLORS[team].main;
  throw new Error("unknown team '" + team + "': use a faction id (" +
    (typeof CFG !== "undefined" && CFG.FACTION_COLORS ? Object.keys(CFG.FACTION_COLORS).join(", ") : "nato, pact, ...") +
    ") or a hex colour");
}
function __m3dR(v) { return Math.round(v * 1000) / 1000; }
function __m3dHex(r, g, b) {
  var h = function (v) { v = Math.max(0, Math.min(255, Math.round(v * 255))); return (v < 16 ? "0" : "") + v.toString(16); };
  return "#" + h(r) + h(g) + h(b);
}

function __m3dBuild(kind, key, team) {
  var table = kind === "bld" ? (typeof BLD_MODELS !== "undefined" ? BLD_MODELS : {}) : (typeof UNIT_MODELS !== "undefined" ? UNIT_MODELS : {});
  var entry = table[key];
  if (!entry || typeof entry.build !== "function") {
    var near = Object.keys(table).filter(function (k) { return k.indexOf(key) >= 0 || key.indexOf(k) >= 0; }).slice(0, 12);
    throw new Error("no " + (kind === "bld" ? "BLD_MODELS" : "UNIT_MODELS") + "['" + key + "']" +
      (near.length ? " - near: " + near.join(", ") : " - try: list " + kind + " " + key.split("_")[0]));
  }
  var teamHex = __m3dTeamColor(team);
  var tb = Date.now();
  var root = entry.build(THREE, typeof Models3D !== "undefined" ? Models3D : undefined, { team: teamHex });
  var buildMs = Date.now() - tb;
  if (!root || !root.isObject3D) throw new Error(key + ".build returned " + root + ", not an Object3D");
  root.updateMatrixWorld(true);

  var mats = [], matIndex = {}, texIds = {}, tris = [], nodes = [], stats = {
    meshes: 0, drawCalls: 0, triangles: 0, hiddenMeshes: 0, hiddenTriangles: 0, lines: 0, points: 0, sprites: 0,
    instanced: 0, nan: 0, degenerate: 0, mirrored: 0, textures: 0, vertexColoured: 0,
  };
  var issues = [], nanAt = {};
  var bb = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
  var ENGINE_PARTS = { turret: 1, roadwheel: 1, rotor: 1, rotordisc: 1, tailrotor: 1, gear: 1, mountwrap: 1,
                       "leg.L": 1, "leg.R": 1, core: 1, flame: 1, prop: 1 };

  function pathOf(o) {
    var p = [];
    for (var x = o; x && x !== root.parent; x = x.parent) p.unshift(x.name || (x === root ? "root" : x.type));
    return p.join("/");
  }
  function texMean(tex) {
    if (!tex) return null;
    var img = tex.image;
    if (img && img.__mean && img.__painted()) {
      if (!texIds[tex.uuid]) { texIds[tex.uuid] = 1; stats.textures++; }
      return img.__mean();
    }
    /* a DataTexture: average its bytes */
    if (img && img.data && img.width && img.height) {
      if (!texIds[tex.uuid]) { texIds[tex.uuid] = 1; stats.textures++; }
      var d = img.data, n = img.width * img.height, st = Math.max(1, Math.floor(n / 4096)), s = [0, 0, 0, 0], c = 0;
      var per = d.length / n, sc = d instanceof Float32Array ? 1 : 255;
      for (var i = 0; i < n; i += st) {
        var o = i * per, A = per >= 4 ? d[o + 3] / sc : 1;
        s[0] += d[o] / sc * A; s[1] += (per >= 3 ? d[o + 1] : d[o]) / sc * A; s[2] += (per >= 3 ? d[o + 2] : d[o]) / sc * A; s[3] += A; c++;
      }
      return [s[0] / c, s[1] / c, s[2] / c, s[3] / c];
    }
    return null;
  }
  function matOf(m, geoHasColor) {
    var id = m.uuid + (geoHasColor ? "|vc" : "");
    if (matIndex.hasOwnProperty(id)) return matIndex[id];
    var col = m.color ? [m.color.r, m.color.g, m.color.b] : [0.8, 0.8, 0.8];
    var opacity = m.opacity == null ? 1 : m.opacity;
    var tm = texMean(m.map);
    if (tm) {
      /* canvas pixels reach the GPU premultiplied-then-unpremultiplied:
         fully clear texels are black unless the material blends them away */
      var blend = m.transparent || m.alphaTest > 0;
      var tc = blend && tm[3] > 1e-6 ? [tm[0] / tm[3], tm[1] / tm[3], tm[2] / tm[3]] : [tm[0], tm[1], tm[2]];
      col = [col[0] * tc[0], col[1] * tc[1], col[2] * tc[2]];
      if (blend) opacity *= tm[3];
    }
    if (m.alphaMap) { var am = texMean(m.alphaMap); if (am && (m.transparent || m.alphaTest > 0)) opacity *= am[1]; }
    var em = null;
    if (m.emissive && (m.emissive.r + m.emissive.g + m.emissive.b) > 0) {
      var ei = m.emissiveIntensity == null ? 1 : m.emissiveIntensity, et = texMean(m.emissiveMap);
      em = [m.emissive.r * ei, m.emissive.g * ei, m.emissive.b * ei];
      if (et) em = [em[0] * et[0], em[1] * et[1], em[2] * et[2]];
    }
    var rec = {
      color: __m3dHex(col[0], col[1], col[2]),
      emissive: em ? __m3dHex(em[0], em[1], em[2]) : null,
      opacity: __m3dR(m.transparent ? opacity : 1),
      side: m.side === 2 ? "double" : m.side === 1 ? "back" : "front",
      type: m.type, name: m.name || "",
      map: !!m.map, vcol: !!(m.vertexColors && geoHasColor),
      rough: m.roughness == null ? null : __m3dR(m.roughness), metal: m.metalness == null ? null : __m3dR(m.metalness),
      wire: !!m.wireframe, visible: m.visible !== false,
    };
    if (m.map && !tm) rec.mapUnread = true;
    matIndex[id] = mats.length; mats.push(rec);
    return matIndex[id];
  }

  var vA = new THREE.Vector3(), vB = new THREE.Vector3(), vC = new THREE.Vector3();
  var mW = new THREE.Matrix4(), mI = new THREE.Matrix4();
  var heavy = [];

  function emitMesh(o, visible) {
    var g = o.geometry;
    if (!g || !g.isBufferGeometry || !g.attributes.position) return;
    var pos = g.attributes.position, idx = g.index, colA = g.attributes.color;
    var mlist = Array.isArray(o.material) ? o.material : [o.material];
    var groups = (Array.isArray(o.material) && g.groups && g.groups.length) ? g.groups :
      [{ start: 0, count: Infinity, materialIndex: 0 }];
    var nIdx = idx ? idx.count : pos.count;
    var dr0 = g.drawRange ? g.drawRange.start : 0, dr1 = g.drawRange ? Math.min(nIdx, dr0 + g.drawRange.count) : nIdx;
    var inst = o.isInstancedMesh ? o.count : 1;
    var meshTris = 0, before = tris.length;
    if (!visible) {
      for (var gi0 = 0; gi0 < groups.length; gi0++) meshTris += Math.floor(Math.max(0, Math.min(dr1, groups[gi0].start + groups[gi0].count) - Math.max(dr0, groups[gi0].start)) / 3);
      stats.hiddenMeshes++; stats.hiddenTriangles += meshTris * inst; return;
    }
    stats.meshes++;
    if (o.isInstancedMesh) stats.instanced++;
    for (var k = 0; k < inst; k++) {
      mW.copy(o.matrixWorld);
      if (o.isInstancedMesh) { o.getMatrixAt(k, mI); mW.multiply(mI); }
      var flip = mW.determinant() < 0;
      if (flip) stats.mirrored++;
      for (var gi = 0; gi < groups.length; gi++) {
        var grp = groups[gi], mat = mlist[grp.materialIndex || 0];
        if (!mat || mat.visible === false) continue;
        var hasVC = !!(mat.vertexColors && colA);
        if (hasVC) stats.vertexColoured++;
        var mi = matOf(mat, hasVC);
        stats.drawCalls++;
        var s0 = Math.max(dr0, grp.start), s1 = Math.min(dr1, grp.start + grp.count);
        for (var t = s0; t + 2 < s1; t += 3) {
          var ia = idx ? idx.getX(t) : t, ib = idx ? idx.getX(t + 1) : t + 1, ic = idx ? idx.getX(t + 2) : t + 2;
          vA.fromBufferAttribute(pos, ia).applyMatrix4(mW);
          vB.fromBufferAttribute(pos, ib).applyMatrix4(mW);
          vC.fromBufferAttribute(pos, ic).applyMatrix4(mW);
          var P = flip ? [vA, vC, vB] : [vA, vB, vC];
          var bad = false, row = [];
          for (var q = 0; q < 3; q++) {
            if (!isFinite(P[q].x) || !isFinite(P[q].y) || !isFinite(P[q].z)) bad = true;
            row.push(__m3dR(P[q].x), __m3dR(P[q].y), __m3dR(P[q].z));
          }
          if (bad) { stats.nan++; var np = pathOf(o); nanAt[np] = (nanAt[np] || 0) + 1; continue; }
          var ux = vB.x - vA.x, uy = vB.y - vA.y, uz = vB.z - vA.z, wx = vC.x - vA.x, wy = vC.y - vA.y, wz = vC.z - vA.z;
          var cx = uy * wz - uz * wy, cy = uz * wx - ux * wz, cz = ux * wy - uy * wx;
          var area2 = Math.sqrt(cx * cx + cy * cy + cz * cz);
          /* a square millimetre: below that a triangle draws nothing and
             usually means a collapsed loft ring or a zero-length extrusion */
          if (area2 < 2e-6) { stats.degenerate++; continue; }
          row.push(mi);
          if (hasVC) {
            var r = (colA.getX(ia) + colA.getX(ib) + colA.getX(ic)) / 3,
                gg = (colA.getY(ia) + colA.getY(ib) + colA.getY(ic)) / 3,
                b = (colA.getZ(ia) + colA.getZ(ib) + colA.getZ(ic)) / 3;
            /* three multiplies vertex colour into the material colour (and its map) */
            var mc = mats[mi].color;
            row.push(__m3dHex(r * parseInt(mc.slice(1, 3), 16) / 255, gg * parseInt(mc.slice(3, 5), 16) / 255,
                              b * parseInt(mc.slice(5, 7), 16) / 255));
          }
          for (q = 0; q < 3; q++) {
            if (P[q].x < bb[0]) bb[0] = P[q].x; if (P[q].y < bb[1]) bb[1] = P[q].y; if (P[q].z < bb[2]) bb[2] = P[q].z;
            if (P[q].x > bb[3]) bb[3] = P[q].x; if (P[q].y > bb[4]) bb[4] = P[q].y; if (P[q].z > bb[5]) bb[5] = P[q].z;
          }
          tris.push(row);
        }
      }
    }
    heavy.push([tris.length - before, pathOf(o)]);
  }

  (function walk(o, visible) {
    visible = visible && o.visible !== false;
    if (o.name && o !== root) {
      var wp = new THREE.Vector3(); o.getWorldPosition(wp);
      nodes.push({ name: o.name, type: o.type, pos: [__m3dR(wp.x), __m3dR(wp.y), __m3dR(wp.z)],
                   visible: visible, engine: !!ENGINE_PARTS[o.name] });
    }
    if (o.isMesh) emitMesh(o, visible);
    else if (o.isLine) stats.lines++;
    else if (o.isPoints) stats.points++;
    else if (o.isSprite) stats.sprites++;
    /* a LOD draws one level at a time; the nearest is the one a modeller means */
    var kids = o.isLOD && o.levels && o.levels.length ? [o.levels[0].object] : o.children;
    for (var i = 0; i < kids.length; i++) walk(kids[i], visible);
  })(root, true);

  Object.keys(nanAt).slice(0, 6).forEach(function (p) {
    issues.push(nanAt[p] + " triangle(s) with a NaN vertex in " + p + " (dropped)");
  });
  stats.triangles = tris.length;
  stats.materials = mats.length;
  if (!tris.length) bb = [0, 0, 0, 0, 0, 0];
  stats.bbox = { min: [__m3dR(bb[0]), __m3dR(bb[1]), __m3dR(bb[2])], max: [__m3dR(bb[3]), __m3dR(bb[4]), __m3dR(bb[5])],
                 size: [__m3dR(bb[3] - bb[0]), __m3dR(bb[4] - bb[1]), __m3dR(bb[5] - bb[2])] };
  /* The engine scales a unit by THIS box (render3d getModel), and it is not
     the visible one twice over: Box3.setFromObject counts hidden meshes, and
     without `precise` it boxes each mesh's bounding-box corners, so a rotated
     part counts wider than it is. Both are reported, each with its cause. */
  var notes = [];
  var eb = new THREE.Box3().setFromObject(root), ebp = new THREE.Box3().setFromObject(root, true);
  if (isFinite(eb.min.x)) {
    stats.engineBox = { min: [__m3dR(eb.min.x), __m3dR(eb.min.y), __m3dR(eb.min.z)], max: [__m3dR(eb.max.x), __m3dR(eb.max.y), __m3dR(eb.max.z)] };
    var ex = eb.max.x - eb.min.x, epx = ebp.max.x - ebp.min.x, vx = bb[3] - bb[0], tol = Math.max(0.05, vx * 0.02);
    /* only units are scaled by it; a building keeps CFG.BLD_SCALE */
    if (kind !== "unit") vx = 0;
    if (vx > 0 && Math.abs(epx - vx) > tol)
      issues.push("engine length " + __m3dR(epx) + " m != visible length " + __m3dR(vx) + " m: " +
        (stats.hiddenMeshes ? stats.hiddenMeshes + " hidden mesh(es)" : "geometry that draws nothing") +
        " change the in-game scale");
    else if (vx > 0 && Math.abs(ex - vx) > tol)
      notes.push("the engine measures " + __m3dR(ex) + " m long (a rotated part counts by its box corners), visible " +
        __m3dR(vx) + " m: in game it is drawn at " + Math.round(vx / ex * 1000) / 10 + "% of the size its visible length implies");
  }
  /* len is informational for most entries (the engine measures the box and a
     gun counts in it), but render3d draws a submarine to its len, so there a
     gap between the two is the size the boat appears in the game */
  var isSub = (typeof UNITS !== "undefined" && UNITS[key] && UNITS[key].layer === "sub") || /(^|_)sub(_|$)/.test(key);
  if (kind === "unit" && isSub && entry.len && tris.length) {
    var vx2 = bb[3] - bb[0];
    if (Math.abs(vx2 - entry.len) > Math.max(0.5, entry.len * 0.03))
      notes.push("a submarine is drawn to its len (" + entry.len + " m), not its measured length (" + __m3dR(vx2) + " m)");
  }
  var named = {}; nodes.forEach(function (n) { if (n.engine) named[n.name] = (named[n.name] || 0) + 1; });
  stats.engineParts = named;
  stats.namedNodes = nodes.length;
  heavy.sort(function (a, b) { return b[0] - a[0]; });
  stats.heaviest = heavy.slice(0, 8).map(function (h) { return { tris: h[0], path: h[1] }; });
  mats.forEach(function (m) { if (m.mapUnread) issues.push("material " + (m.name || m.type) + " has a map that is not a canvas or data texture; colour is its tint only"); });
  stats.buildMs = buildMs;
  stats.issues = issues;
  stats.notes = notes;

  return { kind: kind, key: key, team: team, teamHex: teamHex, entry: entry, stats: stats,
           mats: mats, nodes: nodes, tris: tris, issues: issues, notes: notes };
}

function __m3dDump(kind, key, team, out) {
  var R = __m3dBuild(kind, key, team), stats = R.stats;
  /* written as a stream of rows: a carrier is a few hundred thousand */
  var parts = [];
  parts.push('{"key":' + JSON.stringify(key) + ',"kind":' + JSON.stringify(kind) + ',"team":' + JSON.stringify(team) +
    ',"teamColor":' + JSON.stringify(R.teamHex) + ',"len":' + JSON.stringify(R.entry.len || null) +
    ',"root":' + JSON.stringify(__m3d.root) + ',"extra":' + JSON.stringify(__m3d.extra) +
    ',\n"stats":' + JSON.stringify(stats) + ',\n"materials":' + JSON.stringify(R.mats) +
    ',\n"nodes":' + JSON.stringify(R.nodes.slice(0, 2000)) + ',\n"tris":[\n');
  var CH = 2000, tris = R.tris;
  for (var i = 0; i < tris.length; i += CH)
    parts.push(tris.slice(i, i + CH).map(function (r) { return JSON.stringify(r); }).join(",\n") + (i + CH < tris.length ? ",\n" : ""));
  parts.push("\n]}\n");
  writeFile(out, parts.join(""));
  var sz = stats.bbox.size;
  print("[model3d] " + kind + " " + key + " (" + team + " " + R.teamHex + ") -> " + out);
  print("[model3d] " + stats.triangles + " tris, " + stats.meshes + " meshes, " + stats.drawCalls + " draw calls, " +
        stats.materials + " materials, " + stats.textures + " textures; " + sz[0] + " x " + sz[1] + " x " + sz[2] +
        " m (L x W x H); built in " + stats.buildMs + " ms, " + (Date.now() - __m3dT0) + " ms total");
  if (stats.nan || stats.degenerate) print("[model3d] " + stats.nan + " NaN and " + stats.degenerate + " zero-area triangles dropped");
  R.issues.forEach(function (s) { print("[model3d] issue: " + s); });
  R.notes.forEach(function (s) { print("[model3d] note: " + s); });
  if (__m3dLoadErrors.length) print("[model3d] " + __m3dLoadErrors.length + " script(s) failed to load (see above)");
}

/* check: build every matching key once and print one line each, so a sweep
   over the roster finds the NaN, the throw and the stray helper box without
   a sheet per model. Nothing is written. */
function __m3dCheck(kind, filter, team) {
  var kinds = kind ? [kind] : ["unit", "bld"], n = 0, bad = 0;
  kinds.forEach(function (k) {
    var table = k === "bld" ? (typeof BLD_MODELS !== "undefined" ? BLD_MODELS : {}) : (typeof UNIT_MODELS !== "undefined" ? UNIT_MODELS : {});
    Object.keys(table).sort().forEach(function (key) {
      if (!table[key] || typeof table[key].build !== "function" || (filter && key.indexOf(filter) < 0)) return;
      n++;
      try {
        var R = __m3dBuild(k, key, team), s = R.stats, z = s.bbox.size;
        var flag = R.issues.length ? "  ! " + R.issues.join("; ") : "";
        if (R.issues.length) bad++;
        print(k + "\t" + key + "\t" + s.triangles + " tris\t" + s.meshes + " meshes\t" + z[0] + "x" + z[1] + "x" + z[2] + " m" + flag);
      } catch (e) {
        bad++;
        print(k + "\t" + key + "\tTHROWS " + e);
      }
    });
  });
  print("[model3d] checked " + n + " keys, " + bad + " with issues, " + (Date.now() - __m3dT0) + " ms");
}

/* ================================================================ main */
(function main() {
  var p = __m3d.pos, cmd = __m3d.cmd;
  var USAGE = "usage: jsc tools/model3d/dump.js -- unit|bld KEY [TEAM] OUT.json [--extra FILE.js]... [--root DIR]\n" +
              "       jsc tools/model3d/dump.js -- list  [unit|bld] [SUBSTRING] [--extra FILE.js]...\n" +
              "       jsc tools/model3d/dump.js -- check [unit|bld] [SUBSTRING] [--extra FILE.js]...";
  if (__m3d.help || !cmd) { print(USAGE); return; }
  if (cmd === "list" || cmd === "check") {
    var k = p[1] === "unit" || p[1] === "bld" ? p[1] : null;
    if (cmd === "list") __m3dList(k, k ? p[2] : p[1]);
    else __m3dCheck(k, k ? p[2] : p[1], "nato");
    return;
  }
  if (cmd !== "unit" && cmd !== "bld") { print(USAGE); throw new Error("unknown command " + cmd); }
  if (p.length < 3) { print(USAGE); throw new Error("need KEY and OUT.json"); }
  var key = p[1], team = p.length >= 4 ? p[2] : "nato", out = p.length >= 4 ? p[3] : p[2];
  if (!/\.json$/i.test(out)) throw new Error("OUT must end in .json (got " + out + ")");
  __m3dDump(cmd, key, team, out);
})();
