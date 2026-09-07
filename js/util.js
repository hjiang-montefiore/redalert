/* ============ util.js — math, RNG, containers ============ */
var U = (function () {
  const PI2 = Math.PI * 2;

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function dist(x1, y1, x2, y2) { const dx = x2 - x1, dy = y2 - y1; return Math.sqrt(dx * dx + dy * dy); }
  function dist2(x1, y1, x2, y2) { const dx = x2 - x1, dy = y2 - y1; return dx * dx + dy * dy; }

  /* smallest signed rotation from a to b, in (-PI, PI] */
  function angDiff(a, b) {
    let d = (b - a) % PI2;
    if (d > Math.PI) d -= PI2;
    if (d < -Math.PI) d += PI2;
    return d;
  }
  function turnToward(cur, tgt, maxStep) {
    const d = angDiff(cur, tgt);
    if (Math.abs(d) <= maxStep) return tgt;
    return cur + (d > 0 ? maxStep : -maxStep);
  }

  /* deterministic PRNG so a seed reproduces a map exactly */
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hashStr(s) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  /* binary min-heap keyed on .f — used by A* */
  class Heap {
    constructor() { this.a = []; }
    get size() { return this.a.length; }
    clear() { this.a.length = 0; }
    push(n) {
      const a = this.a; a.push(n);
      let i = a.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (a[p].f <= a[i].f) break;
        const t = a[p]; a[p] = a[i]; a[i] = t; i = p;
      }
    }
    pop() {
      const a = this.a, top = a[0], last = a.pop();
      if (a.length) {
        a[0] = last;
        let i = 0;
        for (;;) {
          const l = 2 * i + 1, r = l + 1; let m = i;
          if (l < a.length && a[l].f < a[m].f) m = l;
          if (r < a.length && a[r].f < a[m].f) m = r;
          if (m === i) break;
          const t = a[m]; a[m] = a[i]; a[i] = t; i = m;
        }
      }
      return top;
    }
  }

  /* uniform bucket grid for neighbour queries (targeting, collision) */
  class SpatialGrid {
    constructor(w, h, cell) {
      this.cell = cell;
      this.cw = Math.ceil(w / cell); this.ch = Math.ceil(h / cell);
      this.buckets = new Array(this.cw * this.ch);
      for (let i = 0; i < this.buckets.length; i++) this.buckets[i] = [];
    }
    clear() { for (let i = 0; i < this.buckets.length; i++) this.buckets[i].length = 0; }
    insert(e) {
      const cx = clamp((e.x / this.cell) | 0, 0, this.cw - 1);
      const cy = clamp((e.y / this.cell) | 0, 0, this.ch - 1);
      this.buckets[cy * this.cw + cx].push(e);
    }
    /* invokes fn(entity) for every entity in cells overlapping the radius */
    query(x, y, r, fn) {
      const c = this.cell;
      const x0 = clamp(((x - r) / c) | 0, 0, this.cw - 1), x1 = clamp(((x + r) / c) | 0, 0, this.cw - 1);
      const y0 = clamp(((y - r) / c) | 0, 0, this.ch - 1), y1 = clamp(((y + r) / c) | 0, 0, this.ch - 1);
      for (let cy = y0; cy <= y1; cy++) {
        const row = cy * this.cw;
        for (let cx = x0; cx <= x1; cx++) {
          const b = this.buckets[row + cx];
          for (let i = 0; i < b.length; i++) fn(b[i]);
        }
      }
    }
  }

  function fmt(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function mmss(s) {
    const m = Math.floor(s / 60), r = Math.floor(s % 60);
    return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
  }

  return { PI2, clamp, lerp, dist, dist2, angDiff, turnToward, mulberry32, hashStr, Heap, SpatialGrid, fmt, mmss };
})();
