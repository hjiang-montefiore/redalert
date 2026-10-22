/* ============================================================================
   us_lcu1610.js -- HERO model: the LCU 1610-class utility landing craft,
   registered for nato_lcu, the row's only key. Drawn at its real size,
   41.07 m (134 ft 9 in) overall with the ramp raised; render3d.js rescales
   the template by its measured X extent, so only proportions reach the
   screen.

   REFERENCES (fetched with a generic User-Agent; Commons at 1000 px):
     - NavSource "LCU-1600 Class - overhead and side plan view" (archives
       10/18, 1018000006.jpg): a starboard profile drawn to the waterline and
       a plan. Every station below is read off it on a metre grid: the
       profile at 47.7 px a metre (stern to ramp tip 1960 px for 41.07 m),
       the plan at 46.77 (its own 1921 px for the same length), which makes
       the plan's beam 9.10 m - Friedman's 29 ft 10 in (9.09 m); NavSource's
       own text says 29 ft.
     - NavSource "LCU-1610" and en.wikipedia "Landing craft utility": 134 ft
       9 in, beam 29 ft 10 in (Friedman 2002 p 390), draft 6 ft 1 in, two
       Detroit 12V-71 diesels on two shafts in Kort nozzles, 11 knots, two
       .50 cal, LN-66 or SPS-53 navigation radar, "an anchor system on the
       starboard side aft to assist in retracting from the beach", bow ramp
       and "stern gate" so craft can be linked bow to stern.
     - "LCU 1630" beside an LHA, starboard beam (Commons, 2000s): the whole
       profile - the stern platform, the anchor A-frame, the long deckhouse,
       the pilot house at its forward end, the lower wall ahead of it, the
       high bow bulwark and the raised ramp forming the raked bow.
     - "US Navy 050621-N-8053S-047" (LCU 1685 in USS Wasp's well, from aft
       and above, starboard): the latticed stern gate standing at the after
       end of the well, the stern platform aft of it, the A-frame with its
       lightening holes, the deckhouse roof with rails and raft canisters,
       the port wing wall with its lockers.
     - "US Navy 040707-N-7586B-045" (overhead from astern, 2004): the plan -
       the full-width well, the bow narrowing to the ramp, the pilot house
       forward of amidships on the starboard side, the gate across the stern.
     - "US Navy 100209-N-4971L-019" (stern from above), "US Navy 050607-N-
       3666S-002" (stern gate marriage, from astern: the transom and its
       fender, the gate folded flat), "US Navy 081012-N-3392P-052" (port
       quarter, 2008: the port wall, the gate, the pilot house and its short
       pole mast with a yard), "US Navy 060330-N-4772B-141" (the raised ramp
       from inside, the bulwark tops with bitts and lifelines).

   RECOGNITION FEATURES (each with where it rests):
     1. The long open cargo well: flat non-skid deck from the stern gate to
        the ramp, 35 m, with three rows of tie-downs (drawing plan; 1685,
        2004 overhead, Fort McHenry).
     2. The bow ramp, raised, IS the bow: a wedge 4.9 m wide raked 36 deg
        from the horizontal, its toe at the waterline and its tip the
        craft's forward end, cleats on its inner face, hoist wires to its
        tip (drawing profile and plan; LCU 1630, Harpers Ferry, overhead).
     3. The high bow bulwarks either side of it, sheering up to 3.2 m, the
        well narrowing between them to the 4.2 m ramp opening, bitts and
        lifelines on their tops (drawing; 1630, Harpers Ferry).
     4. The long starboard deckhouse, 15 m, narrow aft and stepping wider
        forward, its railed roof with raft canisters and a .50 cal (drawing
        plan and profile; 1630, 1685).
     5. The pilot house at the deckhouse's FORWARD end, on the starboard
        side, forward of amidships, with its short pole mast, yard and
        navigation radar. The drawing, the 1630 profile and the 2004
        overhead all put it there; nothing shows it aft.
     6. The open, drive-through stern: the well deck runs out through the
        latticed stern gate onto a 2 m stern platform at the same level
        (1685, Fort McHenry, 2004 overhead, Carter Hall; Wikipedia).
     7. The anchor A-frame davit at the starboard quarter and the stern
        anchor outboard of it (drawing; 1630, 1685, Fort McHenry; Wikipedia).
     8. The low port wing wall the length of the well, lockers inboard
        (drawing plan; Fort McHenry, Carter Hall).
     9. The plan: 9.1 m amidships, rounding in to a 6 m transom aft and
        tapering to the 4.9 m bow (drawing plan; 2004 overhead).
    10. Twin screws in Kort nozzles under the stern, on skegs, with rudders
        (NavSource "two shafts (Kort nozzles)"; drawing profile, hatched).
    11. Low freeboard, 0.95 m, with a fender strake round the hull and
        across the transom (drawing; 1630, stern-gate marriage).
    12. Two exhaust goosenecks aft on the starboard wall (drawing profile).

   STATION TABLE (x from the middle of the 41.07 m; the fender's after face
   at -20.55, the transom plate at -20.43, the ramp tip at +20.55; z above
   the drawing's waterline; half-breadths at the deck edge, read off the
   plan; the keel off the profile, which is drawn trimmed by the stern):
       x        half-breadth     keel z
     -20.43         2.98          +0.30   (transom; the run's top)
     -19.38         3.41          -0.10
     -18.06         3.81          -0.68
     -16.13         4.13          -1.45
     -14.85         4.33          -1.85   (end of the run)
     -11.0          4.55          -1.87
      -2.45         4.55          -1.64
       3.97         4.44          -1.49
       8.24         4.14          -1.38
      13.59         3.46          -1.22   (forefoot begins)
      15.2          3.20          -0.78
      16.25         3.00          -0.13
      16.46         2.97          +0.29   (ramp toe)
      19.36         2.45            -     (bulwark ends)
   Deck and side top 0.95; fender 0.34-0.62 (drawing lines at 0.92, 0.61,
   0.34). The deckhouse roof 3.02 (drawing 3.02, the 1630 photograph 2.96),
   the wing walls 2.35, the bow bulwark 2.35 rising to 3.23, the ramp tip
   3.31 (drawing). The skegs reach the keel line, -1.9.

   WHERE THE REFERENCES DISAGREE. The drawing's pilot house is 1.8 m long
   with its roof at 5.5 m and a tall hinged mast to 11.7 m. Every photograph
   (1985-2014; LCU 1630, 1685 and the 2004 and 2008 craft, all of the
   1627-1680 sub-group that made up most of the class) shows a longer,
   lower pilot house - 3.3 m long, roof 4.7 m, measured on the 1630 at the
   deckhouse roof's scale - and only a short pole mast with a yard. They
   are drawn as photographed, which is also what fits a well deck. The
   pilot house's forward face stays where the drawing has it. The stern
   platform aft of the gate is the drawing's 2.0 m; in the photographs of
   1685 and the Fort McHenry craft it may be longer, but none is square
   enough to measure it.

   NOT DRAWN (no reference resolves it): the drawing's tall mast and its
   stays, the boom on the deckhouse roof, the awning some 2000s craft carry,
   deck markings (the 2004 craft has chevrons on the ramp; no other period
   is known), the propeller blade count, the rudders' exact form, hull
   numbers. The Kort nozzles' size and spacing are inferred: 1.3 m across
   inside the 1.85 m draught, one on each skeg.

   PAINT. Haze grey. The 1630 photograph is blown out (228); in the lit
   overhead of 2004 the deck reads 123,129,132, which at the brief's 0.9 is
   111,116,119 - the house #6c7379 of the Newport hero, used for the hull and
   walls, #737a80 for fittings. The non-skid on the stern-gate marriage
   photograph is 98,107,110, taken to #575e61. The boot top is dark, as the
   photographs show at the waterline. No hull numbers, names or ensigns.
   The team colour is exactly C.team: two flashes, on the pilot house roof
   and the deckhouse roof.

   NO "bowramp" NODE: nato_lcu has no def.bowRamp, so render3d.js never
   looks for one. The ramp is drawn raised and merged. Nothing is named
   "turret" (the row has no weapons). Model space: +X bow, +Y port, +Z up,
   metres, waterline z = 0. ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLCU1610 = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 41.1, XA = -20.55, XB = 20.55;        /* fender aft face, ramp tip */
  var XS = -20.43;                                /* the transom plate        */
  var ZD = 0.95;                                  /* deck and side top        */
  var ZF0 = 0.34, ZF1 = 0.62, FO = 0.12;          /* the fender strake        */
  var XG = -18.42;                                /* the stern gate           */
  var ZW = 2.35;                                  /* the wing walls' tops     */
  var XH0 = -12.2, XSTEP0 = -6.19, XSTEP1 = -5.55, ZH = 3.02;   /* deckhouse */
  var YH0 = -2.47, YH1 = -1.60;
  var XP0 = 2.9, XP1 = 5.8, YP = -2.1, ZP = 4.75;               /* pilot house */
  var XBW = 12.56, XBW1 = 13.6, YBW = 2.1;        /* the bow bulwarks        */
  var ZBW0 = 2.35, ZBW1 = 3.23, XBWE = 19.44;
  var RHW = 2.43;                                 /* the ramp's half-width   */
  /* the ramp, raised: outer face toe and tip, inner face toe and tip      */
  var RP0 = [16.46, 0.29], RP1 = [20.55, 3.31], RQ1 = [20.43, 3.47], RQ0 = [16.10, 0.77];
  var XDE = 16.34;                                /* the deck meets the ramp */
  var NZY = 1.85, NZX = -19.45, NZZ = -1.2;       /* the Kort nozzles        */

  /* ---------------------------------------------------------- tables */
  var HB = [[-20.55, 2.92], [-20.43, 2.98], [-20.28, 3.05], [-19.89, 3.21], [-19.38, 3.41], [-18.74, 3.61],
            [-18.06, 3.81], [-17.41, 3.97], [-16.13, 4.13], [-14.85, 4.33], [-13.57, 4.44], [-12.28, 4.50],
            [-11.0, 4.55], [-2.45, 4.55], [-0.31, 4.53], [1.83, 4.50], [3.97, 4.44], [6.10, 4.32],
            [8.24, 4.14], [10.38, 3.89], [11.02, 3.81], [13.59, 3.46], [14.87, 3.27], [16.15, 3.05],
            [17.44, 2.83], [18.72, 2.58], [19.36, 2.45], [20.0, 2.44]];
  var KEEL = [[-20.43, 0.30], [-19.6, -0.05], [-18.6, -0.45], [-17.6, -0.88], [-16.6, -1.30], [-15.6, -1.65],
              [-14.85, -1.85], [-13.1, -1.87], [-8.9, -1.76], [-2.6, -1.64], [3.7, -1.49], [9.96, -1.32],
              [13.1, -1.26], [14.15, -1.15], [15.2, -0.78], [15.84, -0.42], [16.25, -0.13], [16.46, 0.29]];
  var STATIONS = [-20.43, -20.2, -19.9, -19.6, -19.1, -18.6, -18.1, -17.6, -17.1, -16.6, -16.1, -15.6,
                  -15.2, -14.85, -14.0, -13.1, -12.3, -11.0, -8.0, -5.0, -2.0, 1.0, 4.0, 6.1, 8.2, 10.4,
                  12.0, 13.1, 13.6, 14.15, 14.7, 15.2, 15.55, 15.84, 16.05, 16.25, 16.37, 16.46];

  /* ================================================================ helpers */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function tbl(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++)
      if (x <= T[i][0]) return lerp(T[i - 1][1], T[i][1], (x - T[i - 1][0]) / (T[i][0] - T[i - 1][0]));
    return T[T.length - 1][1];
  }
  function hb(x) { return tbl(HB, x); }
  function keel(x) { return tbl(KEEL, x); }
  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function mkCv(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function finish(THREE, cv, clampIt) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = clampIt ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }

  /* ------------------------------------------------------------- batching:
     one per material. tile > 0 projects every triangle onto the world plane
     its face is closest to, one texture tile per "tile" metres.           */
  function Batch(tile) { this.p = []; this.n = []; this.u = []; this.tile = tile || 0; }
  Batch.prototype.add = function (geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
    var i, k = this.tile;
    for (i = 0; i < P.count; i++) {
      this.p.push(P.getX(i), P.getY(i), P.getZ(i));
      this.n.push(N.getX(i), N.getY(i), N.getZ(i));
      if (!k) { if (U) this.u.push(U.getX(i), U.getY(i)); else this.u.push(0, 0); }
    }
    if (k) {
      for (i = 0; i < P.count; i += 3) {
        var ax = P.getX(i), ay = P.getY(i), az = P.getZ(i);
        var bx = P.getX(i + 1) - ax, by = P.getY(i + 1) - ay, bz = P.getZ(i + 1) - az;
        var cx = P.getX(i + 2) - ax, cy = P.getY(i + 2) - ay, cz = P.getZ(i + 2) - az;
        var nx = Math.abs(by * cz - bz * cy), ny = Math.abs(bz * cx - bx * cz), nz = Math.abs(bx * cy - by * cx);
        for (var c = 0; c < 3; c++) {
          var px = P.getX(i + c), py = P.getY(i + c), pz = P.getZ(i + c);
          if (nz >= nx && nz >= ny) this.u.push(px / k, py / k);
          else if (ny >= nx) this.u.push(px / k, pz / k);
          else this.u.push(py / k, pz / k);
        }
      }
    }
    return this;
  };
  Batch.prototype.raw = function (pos, nrm, uv) {
    Array.prototype.push.apply(this.p, pos);
    Array.prototype.push.apply(this.n, nrm);
    Array.prototype.push.apply(this.u, uv);
  };
  Batch.prototype.mesh = function (THREE, mtl) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    g.computeBoundingSphere();
    return new THREE.Mesh(g, mtl);
  };

  var _o = null;
  function place(THREE, geo, x, y, z, rx, ry, rz) {
    if (!_o) _o = new THREE.Object3D();
    _o.position.set(x || 0, y || 0, z || 0);
    _o.rotation.set(rx || 0, ry || 0, rz || 0);
    _o.scale.set(1, 1, 1);
    _o.updateMatrix();
    geo.applyMatrix4(_o.matrix);
    return geo;
  }
  function box(THREE, lx, ly, lz, x, y, z, rx, ry, rz) {
    return place(THREE, new THREE.BoxGeometry(lx, ly, lz), x, y, z, rx, ry, rz);
  }
  function cylZ(THREE, rt, rb, h, seg, x, y, z0, open) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open);
    g.rotateX(PI / 2);
    return place(THREE, g, x, y, z0 + h * 0.5);
  }
  function cylX(THREE, r, h, seg, x, y, z) {
    var g = new THREE.CylinderGeometry(r, r, h, seg, 1, false);
    g.rotateZ(-PI / 2);
    return place(THREE, g, x, y, z);
  }
  var _v0 = null, _v1 = null;
  function strut(THREE, ax, ay, az, bx, by, bz, r, seg, open) {
    if (!_v0) { _v0 = new THREE.Vector3(0, 1, 0); _v1 = new THREE.Vector3(); }
    var dx = bx - ax, dy = by - ay, dz = bz - az;
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new THREE.CylinderGeometry(r, r, L, seg || 4, 1, open !== false);
    var q = new THREE.Quaternion().setFromUnitVectors(_v0, _v1.set(dx, dy, dz).normalize());
    g.applyQuaternion(q);
    g.translate((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
    return g;
  }
  /* loose triangles, each turned to face n                                 */
  function Tris() { this.pos = []; }
  Tris.prototype.tri = function (a, b, c, n) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    if (cx * cx + cy * cy + cz * cz < 1e-10) return this;
    if (cx * n[0] + cy * n[1] + cz * n[2] < 0) { var t = b; b = c; c = t; }
    this.pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    return this;
  };
  Tris.prototype.quad = function (a, b, c, d, n) { this.tri(a, b, c, n); return this.tri(a, c, d, n); };
  Tris.prototype.geo = function (THREE) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.pos, 3));
    g.computeVertexNormals();
    return g;
  };
  /* plan UVs onto the deck canvas: u over the length, v over y +/-DYH      */
  var DYH = 4.75;
  function planUV(geo) {
    var P = geo.getAttribute("position"), uv = new Float32Array(P.count * 2), i;
    for (i = 0; i < P.count; i++) { uv[i * 2] = (P.getX(i) - XA) / LOA; uv[i * 2 + 1] = (P.getY(i) + DYH) / (2 * DYH); }
    geo.setAttribute("uv", new THREE_.Float32BufferAttribute(uv, 2));
    return geo;
  }
  /* side-elevation UVs onto the hull canvas: port half above starboard    */
  var HZ0 = -2.2, HZ1 = 6.2;
  function sideV(z, side) { return (side > 0 ? 0.5 : 0) + 0.5 * clamp((z - HZ0) / (HZ1 - HZ0), 0.002, 0.998); }
  function sideUV(geo, side) {
    var P = geo.getAttribute("position"), uv = new Float32Array(P.count * 2), i;
    for (i = 0; i < P.count; i++) {
      uv[i * 2] = clamp((P.getX(i) - XA) / LOA, 0.0005, 0.9995);
      uv[i * 2 + 1] = sideV(P.getZ(i), side === undefined ? (P.getY(i) >= 0 ? 1 : -1) : side);
    }
    geo.setAttribute("uv", new THREE_.Float32BufferAttribute(uv, 2));
    return geo;
  }
  var THREE_ = null;

  /* A wall seen side-on: an (x, z) outline pushed out across y from face
     yA(x) to face yB(x), both of which may follow the hull's taper. Edges
     facing up go to "top" (non-skid, plan UVs), the rest to "side"; edges
     facing down are left off unless bottom is set (a wall stands on the
     deck). brk: extra x values at which the outline is cut, so a face
     follows a curved plan.                                                 */
  function sidePrism(THREE, xz, yA, yB, brk, bottom) {
    var a = 0, i, n = xz.length;
    for (i = 0; i < n; i++) { var p = xz[i], q = xz[(i + 1) % n]; a += p[0] * q[1] - q[0] * p[1]; }
    var src = a < 0 ? xz.slice().reverse() : xz.slice(), pts = [];
    for (i = 0; i < src.length; i++) {
      var p0 = src[i], p1 = src[(i + 1) % src.length];
      pts.push(p0);
      var cuts = (brk || []).filter(function (bx) { return bx > Math.min(p0[0], p1[0]) + 0.02 && bx < Math.max(p0[0], p1[0]) - 0.02; });
      cuts.sort(function (u, v) { return p1[0] > p0[0] ? u - v : v - u; });
      cuts.forEach(function (bx) { var t = (bx - p0[0]) / (p1[0] - p0[0]); pts.push([bx, lerp(p0[1], p1[1], t)]); });
    }
    /* the two faces in vertical strips between successive x cuts, so each
       quad is flat and a face that follows the hull's taper shades evenly
       (one long triangle across it would cut a chord and streak). Every
       outline here is x-monotone: a vertical line crosses it twice.        */
    var side = new Tris(), top = new Tris();
    var mid = pts.reduce(function (s, q) { return s + q[0]; }, 0) / pts.length;
    var sgn = yA(mid) < yB(mid) ? -1 : 1;
    var xs = pts.map(function (q) { return q[0]; }).sort(function (u, v) { return u - v; });
    xs = xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 1e-4; });
    function span(xx) {
      var lo = 1e9, hi = -1e9;
      for (var e = 0; e < pts.length; e++) {
        var u0 = pts[e], u1 = pts[(e + 1) % pts.length];
        var xa = Math.min(u0[0], u1[0]), xb = Math.max(u0[0], u1[0]);
        if (xx < xa - 1e-6 || xx > xb + 1e-6) continue;
        var zz = Math.abs(u1[0] - u0[0]) < 1e-6 ? null : lerp(u0[1], u1[1], (xx - u0[0]) / (u1[0] - u0[0]));
        if (zz === null) { lo = Math.min(lo, u0[1], u1[1]); hi = Math.max(hi, u0[1], u1[1]); }
        else { lo = Math.min(lo, zz); hi = Math.max(hi, zz); }
      }
      return [lo, hi];
    }
    for (i = 0; i < xs.length - 1; i++) {
      var xa = xs[i], xb = xs[i + 1], e = 1e-4;
      var sa = span(xa + e), sb = span(xb - e);
      [[yA, sgn], [yB, -sgn]].forEach(function (fc) {
        var f = fc[0], nn = [0, fc[1], 0];
        side.quad([xa, f(xa), sa[0]], [xb, f(xb), sb[0]], [xb, f(xb), sb[1]], [xa, f(xa), sa[1]], nn);
      });
    }
    for (i = 0; i < pts.length; i++) {
      var e0 = pts[i], e1 = pts[(i + 1) % pts.length];
      var dx = e1[0] - e0[0], dz = e1[1] - e0[1], L = Math.sqrt(dx * dx + dz * dz) || 1;
      var nx = dz / L, nz = -dx / L;
      if (nz < -0.99 && !bottom) continue;          /* flat on the deck */
      var dst = nz > 0.7 ? top : side;
      dst.quad([e0[0], yA(e0[0]), e0[1]], [e1[0], yA(e1[0]), e1[1]], [e1[0], yB(e1[0]), e1[1]], [e0[0], yB(e0[0]), e0[1]], [nx, 0, nz]);
    }
    return { side: side.geo(THREE), top: top.geo(THREE) };
  }
  function K(v) { return function () { return v; }; }

  /* ------------------------------------------------------------ hull form
     A barge's section: flat bottom, a tight bilge, vertical sides to the
     deck edge. The run sweeps the whole bottom up to the transom over the
     screws, the forefoot sweeps it up to the ramp's toe.                  */
  var ROWS = 7;
  function section(x) {
    var zk = keel(x), h = hb(x);
    var zz = [zk, zk, zk + 0.10, zk + 0.40, Math.max(zk + 0.40, ZF0), ZF1, ZD];
    var yy = [0, h - 0.40, h - 0.12, h, h, h, h];
    for (var k = 1; k < ROWS; k++) if (zz[k] < zz[k - 1]) zz[k] = zz[k - 1];
    for (k = 0; k < ROWS; k++) if (zz[k] > ZD) zz[k] = ZD;
    return zz.map(function (z, k) { return [yy[k], z]; });
  }

  /* ============================================================= textures */
  var C_HULL = "#6c7379", C_SUP = "#737a80", C_DECK = "#575e61", C_BOOT = "#1a1d1f";
  var TEX = {};
  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var W = 2048, H = 1024, HH = H / 2, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1610), i, k, x, s;
    var PXZ = HH / (HZ1 - HZ0), PXX = W / LOA;
    function U(xx) { return (xx - XA) * PXX; }
    for (s = 0; s < 2; s++) {                      /* s 0 port, 1 starboard   */
      var o = s * HH;
      var Y = function (z) { return o + (HZ1 - z) * PXZ; };
      g.save(); g.beginPath(); g.rect(0, o, W, HH); g.clip();
      g.fillStyle = C_HULL; g.fillRect(0, o, W, HH);
      for (i = 0; i < 160; i++) {
        g.globalAlpha = 0.015 + R() * 0.025;
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * W, Y(5.5) + R() * (Y(0.3) - Y(5.5)), 40 + R() * 200, 8 + R() * 30);
      }
      g.globalAlpha = 1;
      /* the boot top and the bottom below it                                */
      g.fillStyle = C_BOOT; g.fillRect(0, Y(0.22), W, o + HH - Y(0.22));
      g.fillStyle = "rgba(255,255,255,0.05)"; g.fillRect(0, Y(-0.25), W, o + HH - Y(-0.25));
      /* the fender strake: a shade lighter, with a dark shadow line under it */
      g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, Y(ZF1), W, Y(ZF0) - Y(ZF1));
      g.fillStyle = "rgba(0,0,0,0.35)"; g.fillRect(0, Y(ZF0), W, 3);
      g.fillStyle = "rgba(0,0,0,0.22)"; g.fillRect(0, Y(ZD) - 1, W, 2.5);
      /* plate butts on the hull side every 2.4 m                            */
      for (x = XA + 1.2; x < XB; x += 2.4) { g.fillStyle = "rgba(0,0,0,0.10)"; g.fillRect(U(x), Y(ZD), 1.5, Y(0.25) - Y(ZD)); }
      /* the walls: a seam along 1.72 m (drawing), frames every 2.4 m         */
      g.fillStyle = "rgba(0,0,0,0.20)"; g.fillRect(0, Y(1.72), W, 2);
      g.fillStyle = "rgba(255,255,255,0.06)"; g.fillRect(0, Y(1.72) + 2, W, 1.5);
      for (x = XG + 1.0; x < XBW; x += 2.4) { g.fillStyle = "rgba(0,0,0,0.12)"; g.fillRect(U(x), Y(ZW), 1.5, Y(ZD) - Y(ZW)); }
      /* the wall cap's drip line                                            */
      g.fillStyle = "rgba(0,0,0,0.25)"; g.fillRect(0, Y(ZW) + 2, W, 2);
      g.fillStyle = "rgba(0,0,0,0.25)"; g.fillRect(0, Y(ZH) + 2, W, 2);
      /* rust weeps under the scuppers and fittings                          */
      for (i = 0; i < 40; i++) {
        var rx = R() * W, rz = 0.5 + R() * 2.4, ry = Y(rz), len = 12 + R() * 40;
        var gr = g.createLinearGradient(0, ry, 0, ry + len);
        gr.addColorStop(0, "rgba(84,52,32,0.22)"); gr.addColorStop(1, "rgba(84,52,32,0)");
        g.fillStyle = gr; g.fillRect(rx, ry, 1.5 + R() * 2, len);
      }
      /* scuppers along the deck edge                                        */
      for (x = XG + 0.6; x < XBW; x += 3.0) { g.fillStyle = "rgba(8,10,12,0.75)"; g.fillRect(U(x), Y(ZD + 0.22), 10, 6); }
      if (s === 1) {
        /* starboard deckhouse: the door and the portholes (drawing at
           -3.9..-3.4 and -2.2, -0.1), two more in the pilot house's side    */
        g.fillStyle = "rgba(18,21,24,0.88)"; g.fillRect(U(-3.95), Y(2.65), U(-3.35) - U(-3.95), Y(ZD + 0.1) - Y(2.65));
        g.strokeStyle = "rgba(200,205,208,0.35)"; g.lineWidth = 1.5; g.strokeRect(U(-3.95), Y(2.65), U(-3.35) - U(-3.95), Y(ZD + 0.1) - Y(2.65));
        [-2.2, -0.1, 4.2, 4.75, -9.6, -7.9].forEach(function (px) {
          g.fillStyle = "rgba(8,10,12,0.92)"; g.beginPath(); g.arc(U(px), Y(2.6), 5.5, 0, 2 * PI); g.fill();
          g.strokeStyle = "rgba(220,224,226,0.30)"; g.lineWidth = 1.2; g.beginPath(); g.arc(U(px), Y(2.6), 7.5, 0, 2 * PI); g.stroke();
          g.fillStyle = "rgba(8,10,12,0.70)"; g.beginPath(); g.arc(U(px), Y(2.2), 4.0, 0, 2 * PI); g.fill();
        });
        /* the ladder rungs up the deckhouse's after end                    */
        g.fillStyle = "rgba(30,33,36,0.6)";
        for (k = 0; k < 6; k++) g.fillRect(U(-12.4), Y(1.2 + k * 0.3), 8, 2);
      } else {
        /* port wall: its outboard face is framed - vertical stiffeners with
           diagonal braces between them (Carter Hall, 2008)                   */
        for (x = XG + 0.6; x < XBW - 0.5; x += 1.2) {
          g.fillStyle = "rgba(0,0,0,0.20)"; g.fillRect(U(x), Y(ZW - 0.1), 3, Y(ZD + 0.05) - Y(ZW - 0.1));
          g.fillStyle = "rgba(255,255,255,0.07)"; g.fillRect(U(x) + 3, Y(ZW - 0.1), 2, Y(ZD + 0.05) - Y(ZW - 0.1));
          g.strokeStyle = "rgba(0,0,0,0.14)"; g.lineWidth = 2;
          g.beginPath(); g.moveTo(U(x) + 3, Y(ZD + 0.1)); g.lineTo(U(x + 1.2), Y(ZW - 0.15)); g.stroke();
        }
      }
      /* the draught marks fore and aft                                      */
      g.fillStyle = "rgba(225,228,230,0.65)";
      [15.4, -20.0].forEach(function (xx) { for (var dz = -0.4; dz < 0.9; dz += 0.3) g.fillRect(U(xx), Y(dz + 0.1), 4, 3); });
      g.restore();
    }
    TEX.hull = finish(THREE, cv, true);
    return TEX.hull;
  }

  /* the deck plan: non-skid, the tie-down rows (three, at y +2.43, +0.29,
     -1.82, every 1.5 m: the drawing's plan), the plate seams, the ramp's
     inner face with its cleat stripes, the roofs plain                     */
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1627), i, x, y;
    var SX = W / LOA, SY = H / (2 * DYH);
    function cx(xx) { return (xx - XA) * SX; }
    function cy(yy) { return H - (yy + DYH) * SY; }
    g.fillStyle = C_DECK; g.fillRect(0, 0, W, H);
    for (i = 0; i < 260; i++) {
      g.globalAlpha = 0.02 + R() * 0.04;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 20 + R() * 120, 8 + R() * 40);
    }
    g.globalAlpha = 0.18; g.fillStyle = "#000000";
    for (i = 0; i < 5000; i++) g.fillRect(R() * W, R() * H, 1.5, 1.5);
    g.globalAlpha = 0.08; g.fillStyle = "#d8dcdc";
    for (i = 0; i < 1600; i++) g.fillRect(R() * W, R() * H, 1.2, 1.2);
    g.globalAlpha = 1;
    /* plate seams across the well                                          */
    g.fillStyle = "rgba(0,0,0,0.22)";
    for (x = XG; x <= XDE; x += 1.83) g.fillRect(cx(x), cy(4.1), 1.4, 8.2 * SY);
    for (y = -3.6; y <= 3.7; y += 1.8) g.fillRect(cx(XG), cy(y), cx(XDE) - cx(XG), 1.0);
    /* the tie-downs: flush rings                                           */
    function ring(px, py) {
      g.fillStyle = "rgba(12,13,14,0.70)"; g.beginPath(); g.arc(cx(px), cy(py), 5.5, 0, 2 * PI); g.fill();
      g.strokeStyle = "rgba(190,195,196,0.35)"; g.lineWidth = 1.4; g.beginPath(); g.arc(cx(px), cy(py), 8.0, 0, 2 * PI); g.stroke();
    }
    for (x = -17.7; x < 15.9; x += 1.5) {
      ring(x, 2.43); if (x < 13.4) ring(x, 0.29); else ring(x, 0.0);
      if (x < XSTEP0 - 0.3 || (x > XP1 + 0.6 && x < 13.2)) ring(x, -1.82);
    }
    /* track and tyre scuffing down the well, heaviest near the ramp        */
    for (i = 0; i < 16; i++) {
      var sy = -1.4 + R() * 4.6, x0 = XG + R() * 6, x1 = XDE - R() * 6;
      g.strokeStyle = "rgba(0,0,0," + (0.10 + R() * 0.14).toFixed(2) + ")";
      g.lineWidth = 6 + R() * 10;
      g.beginPath(); g.moveTo(cx(x0), cy(sy)); g.lineTo(cx(x1), cy(sy + (R() - 0.5) * 0.6)); g.stroke();
    }
    /* the ramp's inner face: cleats every 0.42 m along its slope, which in
       plan is every 0.34 m, and its edge curbs                             */
    g.fillStyle = "rgba(0,0,0,0.42)";
    for (x = RQ0[0] + 0.25; x < RQ1[0] - 0.1; x += 0.34) g.fillRect(cx(x), cy(RHW - 0.12), 3, (2 * RHW - 0.24) * SY);
    g.fillStyle = "rgba(255,255,255,0.08)";
    for (x = RQ0[0] + 0.25; x < RQ1[0] - 0.1; x += 0.34) g.fillRect(cx(x) + 3, cy(RHW - 0.12), 2, (2 * RHW - 0.24) * SY);
    /* the stern platform: its hatch and the gate's hinge line              */
    g.strokeStyle = "rgba(10,10,10,0.6)"; g.lineWidth = 2;
    g.strokeRect(cx(-20.0), cy(0.5), 0.9 * SX, 1.0 * SY);
    g.fillStyle = "rgba(0,0,0,0.45)"; g.fillRect(cx(XG - 0.12), cy(3.4), 4, 6.8 * SY);
    /* the deckhouse roof: hatches                                          */
    g.strokeStyle = "rgba(10,10,10,0.55)"; g.lineWidth = 2;
    g.strokeRect(cx(-11.2), cy(-3.0), 0.8 * SX, 0.8 * SY);
    g.strokeRect(cx(-0.8), cy(-2.4), 0.8 * SX, 0.8 * SY);
    TEX.deck = finish(THREE, cv, true);
    return TEX.deck;
  }

  function supTex(THREE) {
    if (TEX.sup) return TEX.sup;
    var W = 256, H = 256, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1646), i;
    g.fillStyle = C_SUP; g.fillRect(0, 0, W, H);
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.015 + R() * 0.025;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 20 + R() * 80, 10 + R() * 50);
    }
    g.globalAlpha = 1;
    g.fillStyle = "rgba(0,0,0,0.18)"; g.fillRect(0, H / 2, W, 1.5); g.fillRect(W / 2, 0, 1.5, H);
    for (i = 0; i < 14; i++) {
      var sx = R() * W, sy = R() * H, len = 14 + R() * 40;
      var gr = g.createLinearGradient(0, sy, 0, sy + len);
      gr.addColorStop(0, "rgba(70,44,28,0.16)"); gr.addColorStop(1, "rgba(70,44,28,0)");
      g.fillStyle = gr; g.fillRect(sx, sy, 1.5 + R() * 2, len);
    }
    TEX.sup = finish(THREE, cv);
    return TEX.sup;
  }

  /* ================================================================= hull
     Lofted stern to bow through STATIONS; normals smoothed across faces
     within 38 degrees so the bilge rounds and the deck edge stays crisp.  */
  function hullGeo() {
    var st = STATIONS, i, j, s;
    var secs = st.map(section);
    var faces = [];
    function V(ii, jj, side) { var q = secs[ii][jj]; return [st[ii], side * q[0], q[1]]; }
    function key(ii, jj, side) { return (side > 0 ? 0 : 1e6) + ii * 100 + jj; }
    function tri(a, b, c, ka, kb, kc, side) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var ar = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (ar < 2e-6) return;
      faces.push({ p: [a, b, c], k: [ka, kb, kc], n: [nx, ny, nz], u: [nx / ar, ny / ar, nz / ar], s: side });
    }
    for (i = 0; i < st.length - 1; i++) {
      for (j = 0; j < ROWS - 1; j++) {
        for (s = 1; s >= -1; s -= 2) {
          var kA = key(i, j, s), kB = key(i + 1, j, s), kC = key(i + 1, j + 1, s), kD = key(i, j + 1, s);
          var A = V(i, j, s), Bq = V(i + 1, j, s), Cq = V(i + 1, j + 1, s), D = V(i, j + 1, s);
          if (s > 0) { tri(A, D, Bq, kA, kD, kB, s); tri(Bq, D, Cq, kB, kD, kC, s); }
          else { tri(A, Bq, D, kA, kB, kD, s); tri(Bq, Cq, D, kB, kC, kD, s); }
        }
      }
    }
    function ring(ii) {
      var r = [], jj, cont = [];
      for (jj = ROWS - 1; jj >= 0; jj--) r.push(V(ii, jj, 1));
      for (jj = 1; jj < ROWS; jj++) r.push(V(ii, jj, -1));
      r.forEach(function (q) {
        var l = cont[cont.length - 1];
        if (l && Math.abs(l[0] - q[1]) < 1e-4 && Math.abs(l[1] - q[2]) < 1e-4) return;
        cont.push([q[1], q[2]]);
      });
      return cont;
    }
    return { faces: faces, aft: ring(0), fwd: ring(st.length - 1) };
  }

  /* a Kort nozzle: an aerofoil ring turned on a lathe, axis along x        */
  var DUCT = [[0.62, 0.50], [0.66, 0.38], [0.67, 0.0], [0.65, -0.40], [0.60, -0.52], [0.56, -0.50],
              [0.53, -0.25], [0.52, 0.10], [0.54, 0.40], [0.58, 0.52], [0.62, 0.50]];
  function nozzle(THREE) {
    var v = [];
    for (var i = DUCT.length - 1; i >= 0; i--) v.push(new THREE.Vector2(DUCT[i][0], DUCT[i][1]));
    var g = new THREE.LatheGeometry(v, 18);
    g.rotateZ(-PI / 2);
    return g;
  }

  /* ================================================================ build */
  function build(THREE, Mdl, C) {
    THREE_ = THREE;
    var root = new THREE.Group();
    var i, s, x, k;
    var team = C && C.team !== undefined ? C.team : "#d6503f";

    var T = {};
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.86, metalness: 0.07 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: deckTex(THREE), roughness: 0.94, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: supTex(THREE), roughness: 0.86, metalness: 0.07 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x4a5258, roughness: 0.55, metalness: 0.40 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x15181a, roughness: 0.85, metalness: 0.08 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x0f1a22, roughness: 0.10, metalness: 0.0, transparent: true, opacity: 0.88,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xc8cbc6, roughness: 0.70, metalness: 0.04 });
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(team), roughness: 0.60, metalness: 0.10,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var B = {};
    Object.keys(T).forEach(function (kk) { B[kk] = new Batch(kk === "S" ? 4 : 0); });
    function wall(xz, yA, yB, brk, side, bottom) {
      var w = sidePrism(THREE, xz, yA, yB, brk, bottom);
      B.H.add(sideUV(w.side, side));
      B.D.add(planUV(w.top));
    }
    var HBX = HB.map(function (q) { return q[0]; });

    /* ------------------------------------------------------------- hull */
    var HG = hullGeo();
    var around = {}, COS = Math.cos(38 * PI / 180);
    HG.faces.forEach(function (f, fi) { f.k.forEach(function (kk) { (around[kk] || (around[kk] = [])).push(fi); }); });
    var hs = { pos: [], nrm: [], uv: [] };
    HG.faces.forEach(function (f) {
      for (var c = 0; c < 3; c++) {
        var q = f.p[c], sx = 0, sy = 0, sz = 0;
        around[f.k[c]].forEach(function (gi) {
          var g2 = HG.faces[gi];
          if (g2.u[0] * f.u[0] + g2.u[1] * f.u[1] + g2.u[2] * f.u[2] < COS) return;
          sx += g2.n[0]; sy += g2.n[1]; sz += g2.n[2];
        });
        var l = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
        hs.pos.push(q[0], q[1], q[2]);
        hs.nrm.push(sx / l, sy / l, sz / l);
        hs.uv.push(clamp((q[0] - XA) / LOA, 0.0005, 0.9995), sideV(q[2], f.s));
      }
    });
    B.H.raw(hs.pos, hs.nrm, hs.uv);
    /* the transom and the closed end under the ramp's toe                  */
    function endCap(cont, xx, nx) {
      var c2 = cont.map(function (q) { return new THREE.Vector2(q[0], q[1]); });
      if (c2.length > 2 && c2[0].distanceTo(c2[c2.length - 1]) < 1e-4) c2.pop();
      var tf = THREE.ShapeUtils.triangulateShape(c2, []), pos = [], nrm = [], uv = [];
      tf.forEach(function (f) {
        var a = c2[f[0]], b = c2[f[1]], c = c2[f[2]];
        var cr = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
        if ((cr > 0) === (nx < 0)) { var t0 = b; b = c; c = t0; }
        [a, b, c].forEach(function (p) { pos.push(xx, p.x, p.y); nrm.push(nx, 0, 0); uv.push(nx < 0 ? 0.003 : 0.9, sideV(p.y, 1)); });
      });
      B.H.raw(pos, nrm, uv);
    }
    endCap(HG.aft, XS, -1);
    endCap(HG.fwd, STATIONS[STATIONS.length - 1], 1);

    /* ------------------------------------------------------------- deck:
       the well and the stern platform, one plate at the side top           */
    (function () {
      /* to the hull's last station: the plate's forward strip lies inside
         the ramp's toe, and outboard of the ramp it closes the hull's top  */
      var XE = STATIONS[STATIONS.length - 1], xs = [XS];
      STATIONS.forEach(function (sx) { if (sx > XS + 0.05 && sx < XE - 0.05) xs.push(sx); });
      xs.push(XE);
      var tr = new Tris();
      for (var a = 0; a < xs.length - 1; a++) {
        var xa = xs[a], xb = xs[a + 1], ha = hb(xa), hc = hb(xb);
        for (var q = 0; q < 4; q++) {
          var t0 = -1 + 2 * q / 4, t1 = -1 + 2 * (q + 1) / 4;
          tr.quad([xa, ha * t0, ZD], [xb, hc * t0, ZD], [xb, hc * t1, ZD], [xa, ha * t1, ZD], [0, 0, 1]);
        }
      }
      B.D.add(planUV(tr.geo(THREE)));
    })();

    /* ----------------------------------------------------- fender strake:
       swept round the deck edge, starboard bow to stern, across the transom
       (its after face is the craft's after end) and back up the port side */
    (function () {
      var path = [], xs = STATIONS.filter(function (sx) { return sx > XS + 0.3; });
      for (k = xs.length - 1; k >= 0; k--) path.push([xs[k], -hb(xs[k])]);
      path.push([XS + 0.05, -hb(XS) + 0.25]);
      path.push([XS, -hb(XS) + 0.6]);
      path.push([XS, hb(XS) - 0.6]);
      path.push([XS + 0.05, hb(XS) - 0.25]);
      for (k = 0; k < xs.length; k++) path.push([xs[k], hb(xs[k])]);
      var prof = [[0, ZF0 - 0.04], [FO, ZF0 + 0.02], [FO, ZF1 - 0.02], [0, ZF1 + 0.04]];
      var n = path.length, nrm = [];
      for (k = 0; k < n; k++) {
        var p0 = path[Math.max(0, k - 1)], p1 = path[Math.min(n - 1, k + 1)];
        var dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.sqrt(dx * dx + dy * dy) || 1;
        nrm.push([-dy / L, dx / L]);       /* clockwise from above: left is out */
      }
      var tr = new Tris();
      for (k = 0; k < n - 1; k++) {
        for (var j = 0; j < prof.length - 1; j++) {
          var A = [path[k][0] + nrm[k][0] * prof[j][0], path[k][1] + nrm[k][1] * prof[j][0], prof[j][1]];
          var Bp = [path[k + 1][0] + nrm[k + 1][0] * prof[j][0], path[k + 1][1] + nrm[k + 1][1] * prof[j][0], prof[j][1]];
          var Cp = [path[k + 1][0] + nrm[k + 1][0] * prof[j + 1][0], path[k + 1][1] + nrm[k + 1][1] * prof[j + 1][0], prof[j + 1][1]];
          var D = [path[k][0] + nrm[k][0] * prof[j + 1][0], path[k][1] + nrm[k][1] * prof[j + 1][0], prof[j + 1][1]];
          var on = [nrm[k][0], nrm[k][1], (prof[j][1] + prof[j + 1][1]) / 2 > (ZF0 + ZF1) / 2 ? 0.5 : (j === 0 ? -0.5 : 0)];
          tr.quad(A, Bp, Cp, D, on);
        }
      }
      /* close its two ends forward, beside the ramp's toe                  */
      [0, n - 1].forEach(function (k2) {
        var q = prof.map(function (pr) { return [path[k2][0] + nrm[k2][0] * pr[0], path[k2][1] + nrm[k2][1] * pr[0], pr[1]]; });
        tr.quad(q[0], q[1], q[2], q[3], [1, 0, 0]);
      });
      B.H.add(sideUV(tr.geo(THREE)));
    })();

    /* ------------------------------------------- the walls round the well */
    function outerS(x) { return -hb(x); }
    function outerP(x) { return hb(x); }
    /* starboard: the low wall aft, from the gate to the deckhouse          */
    wall([[XG, ZD], [XH0, ZD], [XH0, ZW], [XG, ZW]], K(-3.3), outerS, HBX, -1);
    /* the deckhouse, narrow aft and stepping out forward (drawing plan)    */
    function dhIn(x) { return x <= XSTEP0 ? YH0 : x >= XSTEP1 ? YH1 : lerp(YH0, YH1, (x - XSTEP0) / (XSTEP1 - XSTEP0)); }
    wall([[XH0, ZD], [XP0, ZD], [XP0, ZH], [XH0, ZH]], dhIn, outerS, HBX.concat([XSTEP0, XSTEP1]), -1);
    /* the pilot house at its forward end                                   */
    wall([[XP0, ZD], [XP1, ZD], [XP1, ZP], [XP0, ZP]], K(YP), outerS, HBX, -1);
    /* the lower wall ahead of it to the bow bulwark                        */
    wall([[XP1, ZD], [XBW, ZD], [XBW, ZW], [XP1, ZW]], K(-3.6), outerS, HBX, -1);
    /* port: one low wall the length of the well                            */
    wall([[XG, ZD], [XBW, ZD], [XBW, ZW], [XG, ZW]], function (x) { return hb(x) - 0.47; }, outerP, HBX, 1);
    /* the bow bulwarks: the well narrows between them to the ramp opening,
       their tops sheer up forward and their forward edges lie along the
       ramp's inner face                                                    */
    function bwTop(x) { return ZBW0 + (ZBW1 - ZBW0) * (x - XBW) / (XBWE - XBW); }
    var bwOut = [[XBW, ZD], [XDE, ZD], [XBWE, ZBW1], [XBW, ZBW0]];
    for (s = -1; s <= 1; s += 2) {
      var yin0 = s > 0 ? hb(XBW) - 0.47 : 3.29;
      (function (sg, y0) {
        var inner = function (x) { return sg * (x <= XBW1 ? lerp(y0, YBW, (x - XBW) / (XBW1 - XBW)) : YBW); };
        wall(bwOut, inner, function (x) { return sg * hb(x); }, HBX.concat([XBW1, 15.0, 17.0, 18.2]), sg);
      })(s, yin0);
    }

    /* ----------------------------------------------- the ramp, raised: a
       wedge 4.86 m wide, thick at the toe, its inner face with cleats      */
    (function () {
      var w = sidePrism(THREE, [RP0, RP1, RQ1, RQ0], K(-RHW), K(RHW), [17.5, 18.5, 19.5], true);
      B.S.add(w.side);
      B.D.add(planUV(w.top));
      var dx = RQ1[0] - RQ0[0], dz = RQ1[1] - RQ0[1], L = Math.sqrt(dx * dx + dz * dz), ang = Math.atan2(dz, dx);
      for (k = 1; k < 13; k++) {
        var t = k / 13, cx = RQ0[0] + dx * t, cz = RQ0[1] + dz * t;
        B.M.add(box(THREE, 0.08, 2 * RHW - 0.3, 0.07, cx - 0.03, 0, cz + 0.035, 0, -ang, 0));
      }
      /* side curbs along the inner face, and stiffeners on the outer face  */
      for (s = -1; s <= 1; s += 2) {
        B.S.add(box(THREE, L, 0.16, 0.2, (RQ0[0] + RQ1[0]) / 2, s * (RHW - 0.08), (RQ0[1] + RQ1[1]) / 2 + 0.1, 0, -ang, 0));
      }
      var ox = RP1[0] - RP0[0], oz = RP1[1] - RP0[1], OL = Math.sqrt(ox * ox + oz * oz), oa = Math.atan2(oz, ox);
      [-1.6, 0, 1.6].forEach(function (yy) {
        B.S.add(box(THREE, OL - 0.4, 0.14, 0.12, (RP0[0] + RP1[0]) / 2 - 0.03, yy, (RP0[1] + RP1[1]) / 2 - 0.04, 0, -oa, 0));
      });
      /* the hinge knuckles at the toe                                       */
      for (k = 0; k < 4; k++) B.M.add(cylX(THREE, 0.16, 0.5, 8, RQ0[0] + 0.25, -1.8 + k * 1.2, RQ0[1] + 0.12).rotateZ(0));
      /* the hoist wires from the winches on the bulwark tops to the tip    */
      for (s = -1; s <= 1; s += 2) {
        B.M.add(strut(THREE, 13.4, s * 2.6, bwTop(13.4) + 0.35, RQ1[0] - 0.1, s * (RHW - 0.2), RQ1[1] + 0.02, 0.03, 3));
        B.M.add(place(THREE, new THREE.CylinderGeometry(0.28, 0.28, 0.55, 10), 13.2, s * 2.75, bwTop(13.2) + 0.32));
        B.S.add(box(THREE, 0.7, 0.75, 0.3, 13.2, s * 2.75, bwTop(13.2) + 0.12));
      }
    })();

    /* ------------------------------------------------ the stern gate: a
       lattice standing across the after end of the well (1685, 2008)       */
    (function () {
      var y0 = -3.3, y1 = hb(XG) - 0.47, z0 = ZD, z1 = 2.55, th = 0.16;
      var w = y1 - y0, yc = (y0 + y1) / 2;
      B.S.add(box(THREE, th, w, 0.16, XG, yc, z1 - 0.08));
      B.S.add(box(THREE, th, w, 0.2, XG, yc, z0 + 0.1));
      B.S.add(box(THREE, th, w, 0.1, XG, yc, (z0 + z1) / 2 + 0.25));
      B.S.add(box(THREE, th, w, 0.1, XG, yc, (z0 + z1) / 2 - 0.25));
      var nv = 11;
      for (k = 0; k <= nv; k++) B.S.add(box(THREE, th, k === 0 || k === nv ? 0.16 : 0.09, z1 - z0, XG, y0 + 0.08 + (w - 0.16) * k / nv, (z0 + z1) / 2));
      /* hinge knuckles at its foot, aft side                                */
      for (k = 0; k < 5; k++) B.M.add(cylX(THREE, 0.1, 0.4, 6, XG - 0.15, y0 + 0.6 + k * (w - 1.2) / 4, z0 + 0.1).rotateZ(0));
    })();

    /* ---------------------------------------- the stern anchor A-frame:
       two box legs on the starboard quarter, the head over the side, the
       anchor in its cradle outboard (drawing; 1630, 1685)                  */
    (function () {
      var ax0 = -17.1, ax1 = -15.2, axc = (ax0 + ax1) / 2, ay = -3.75, az = 3.44;
      [ax0, ax1].forEach(function (lx) {
        var dx = axc - lx, dz = az - ZD, L = Math.sqrt(dx * dx + dz * dz), an = Math.atan2(dx, dz);
        B.S.add(box(THREE, 0.26, 0.34, L, (lx + axc) / 2, ay, (ZD + az) / 2, 0, an, 0));
        /* lightening holes                                                  */
        for (var h = 1; h <= 3; h++) {
          var t = h / 4.2;
          B.K.add(place(THREE, new THREE.CylinderGeometry(0.09, 0.09, 0.36, 8), lx + dx * t, ay, ZD + dz * t));
        }
      });
      B.S.add(box(THREE, 0.5, 0.5, 0.42, axc, ay, az));
      B.M.add(cylX(THREE, 0.12, 0.6, 8, axc, ay - 0.3, az - 0.05));
      /* the cradle outboard and the anchor in it                           */
      var oy = -hb(axc) - 0.13;
      B.S.add(box(THREE, 1.5, 0.08, 0.9, axc, -hb(axc) - 0.04, 0.48));
      B.S.add(box(THREE, 0.14, 0.2, 1.0, axc - 0.7, oy + 0.02, 0.45));
      B.S.add(box(THREE, 0.14, 0.2, 1.0, axc + 0.7, oy + 0.02, 0.45));
      B.K.add(box(THREE, 0.18, 0.12, 1.0, axc, oy, 0.55));
      B.K.add(box(THREE, 1.2, 0.12, 0.16, axc, oy, 0.08));
      B.K.add(box(THREE, 0.3, 0.12, 0.45, axc - 0.5, oy, 0.25, 0, 0.6, 0));
      B.K.add(box(THREE, 0.3, 0.12, 0.45, axc + 0.5, oy, 0.25, 0, -0.6, 0));
      B.M.add(strut(THREE, axc, ay - 0.35, az - 0.2, axc, oy, 1.05, 0.03, 3));
      /* the anchor winch on the deck inboard of the frame                  */
      B.M.add(place(THREE, new THREE.CylinderGeometry(0.32, 0.32, 0.7, 10), axc, -2.85, ZD + 0.45));
      B.S.add(box(THREE, 1.0, 0.5, 0.55, axc, -2.3, ZD + 0.28));
    })();

    /* -------------------------- the exhaust goosenecks aft (drawing)       */
    [-17.9, -17.1].forEach(function (ex) {
      B.K.add(cylZ(THREE, 0.13, 0.13, 1.75, 8, ex, -3.45, ZW, true));
      B.K.add(strut(THREE, ex, -3.45, ZW + 1.72, ex - 0.18, -3.45, ZW + 2.0, 0.13, 8, false));
      B.K.add(strut(THREE, ex - 0.18, -3.45, ZW + 2.0, ex - 0.45, -3.45, ZW + 2.02, 0.13, 8, false));
    });

    /* ------------------------------------------------ rails and stanchions */
    function railRun(pts, h, step) {
      var kk; h = h || 1.0; step = step || 1.5;
      function post(px, py, pz) { B.M.add(strut(THREE, px, py, pz, px, py, pz + h, 0.03, 3)); }
      for (kk = 0; kk < pts.length - 1; kk++) {
        var a = pts[kk], b = pts[kk + 1];
        var L = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
        var n = Math.max(1, Math.round(L / step));
        for (var q = 0; q < n; q++) { var t = q / n; post(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)); }
        B.M.add(strut(THREE, a[0], a[1], a[2] + h, b[0], b[1], b[2] + h, 0.03, 3));
        B.M.add(strut(THREE, a[0], a[1], a[2] + h * 0.5, b[0], b[1], b[2] + h * 0.5, 0.022, 3));
      }
      var e = pts[pts.length - 1]; post(e[0], e[1], e[2]);
    }
    /* the deckhouse roof, all round                                        */
    railRun([[XH0 + 0.1, -hb(XH0) + 0.12, ZH], [-6.0, -hb(-6) + 0.12, ZH], [XP0 - 0.1, -hb(XP0) + 0.12, ZH]]);
    railRun([[XH0 + 0.1, -hb(XH0) + 0.12, ZH], [XH0 + 0.1, YH0 - 0.1, ZH], [XSTEP0, YH0 - 0.1, ZH], [XSTEP1, YH1 - 0.1, ZH],
             [XP0 - 0.1, YH1 - 0.1, ZH]]);
    /* the pilot house roof, where the craft is conned from (1630, 2008)    */
    railRun([[XP0 + 0.1, -hb(XP0) + 0.1, ZP], [XP1 - 0.1, -hb(XP1) + 0.1, ZP], [XP1 - 0.1, YP - 0.1, ZP],
             [XP0 + 0.1, YP - 0.1, ZP], [XP0 + 0.1, -hb(XP0) + 0.1, ZP]], 0.9, 1.0);
    /* lifelines on the bow bulwark tops (Harpers Ferry) and the stern
       platform's sides                                                     */
    for (s = -1; s <= 1; s += 2) {
      railRun([[XBW + 0.3, s * (hb(XBW + 0.3) - 0.15), bwTop(XBW + 0.3)], [19.0, s * (hb(19.0) - 0.15), bwTop(19.0)]], 0.9, 1.3);
      railRun([[XS + 0.3, s * (hb(XS + 0.3) - 0.2), ZD], [XG - 0.3, s * (hb(XG - 0.3) - 0.2), ZD]], 0.9, 0.9);
    }

    /* ------------------------------------------------- bitts and fittings */
    function bitt(bx, by, bz) {
      B.M.add(cylZ(THREE, 0.13, 0.13, 0.42, 8, bx - 0.24, by, bz));
      B.M.add(cylZ(THREE, 0.13, 0.13, 0.42, 8, bx + 0.24, by, bz));
      B.M.add(box(THREE, 0.75, 0.4, 0.06, bx, by, bz + 0.03));
    }
    for (s = -1; s <= 1; s += 2) {
      bitt(14.6, s * 2.75, bwTop(14.6));
      bitt(17.6, s * 2.45, bwTop(17.6));
      bitt(XS + 0.9, s * 2.35, ZD);
      B.M.add(box(THREE, 0.5, 0.2, 0.25, 16.2, s * (hb(16.2) - 0.25), bwTop(16.2) + 0.12));   /* chock */
    }
    bitt(-1.0, hb(-1.0) - 0.24, ZW);
    bitt(9.0, hb(9.0) - 0.24, ZW);
    /* lockers along the port wall's inboard face (drawing plan; Fort
       McHenry) and two ahead of the pilot house                            */
    [-15.0, -11.6, -8.2, -4.8, -1.4, 2.0, 5.4, 8.8].forEach(function (lx) {
      B.S.add(box(THREE, 1.1, 0.42, 0.95, lx, hb(lx) - 0.47 - 0.21, ZD + 0.475));
    });
    [7.6, 10.9].forEach(function (lx) { B.S.add(box(THREE, 1.2, 0.5, 0.95, lx, -3.6 + 0.25, ZD + 0.475)); });
    /* gooseneck vents on the wall tops                                     */
    [[-14.5, -1], [-8.5, 1], [-3.0, 1], [6.8, -1], [10.2, -1], [4.0, 1]].forEach(function (v) {
      var vy = v[1] * (hb(v[0]) - 0.25), vz = v[0] < XH0 || v[0] > XP1 || v[1] > 0 ? ZW : ZH;
      B.M.add(cylZ(THREE, 0.06, 0.06, 0.35, 6, v[0], vy, vz, true));
      B.M.add(strut(THREE, v[0], vy, vz + 0.33, v[0] + 0.12, vy, vz + 0.42, 0.06, 6, false));
    });

    /* ------------------------------------------ the deckhouse roof's gear */
    /* two raft canisters in cradles (1685, 1630)                           */
    [-9.7, -8.2, 0.2, 1.6].forEach(function (rx) {
      var g = new THREE.CylinderGeometry(0.3, 0.3, 1.25, 12); g.rotateZ(PI / 2);
      B.W.add(place(THREE, g, rx, -3.35, ZH + 0.42));
      B.M.add(box(THREE, 0.1, 0.62, 0.15, rx - 0.45, -3.35, ZH + 0.08));
      B.M.add(box(THREE, 0.1, 0.62, 0.15, rx + 0.45, -3.35, ZH + 0.08));
    });
    /* a ready locker and a hatch coaming                                    */
    B.S.add(box(THREE, 1.2, 0.8, 0.7, -2.5, -3.3, ZH + 0.35));
    B.S.add(box(THREE, 0.9, 0.9, 0.18, -10.8, -3.0, ZH + 0.09));

    /* ---------------------------------------------- the two .50 cal mounts:
       on the deckhouse roof and on the starboard wall ahead of the pilot
       house (drawing; the row's two machine guns)                          */
    function fifty(gx, gy, gz, ph, hd) {
      B.M.add(cylZ(THREE, 0.07, 0.1, ph, 6, gx, gy, gz));
      var c = Math.cos(hd), sn = Math.sin(hd), gh = gz + ph + 0.1;
      B.K.add(box(THREE, 0.62, 0.2, 0.22, gx + 0.12 * c, gy + 0.12 * sn, gh, 0, 0, hd));
      B.K.add(strut(THREE, gx + 0.4 * c, gy + 0.4 * sn, gh + 0.03, gx + 1.35 * c, gy + 1.35 * sn, gh + 0.05, 0.03, 5));
      B.M.add(box(THREE, 0.06, 0.36, 0.3, gx - 0.3 * c, gy - 0.3 * sn, gh, 0, 0, hd));
      B.K.add(box(THREE, 0.22, 0.12, 0.18, gx + 0.1 * c - 0.15 * sn, gy + 0.1 * sn + 0.15 * c, gh - 0.02, 0, 0, hd));
    }
    /* the drawing's heights: 4.36 m on the deckhouse roof, 2.45 m on a
       short post on the wall top forward                                  */
    fifty(-4.9, -2.75, ZH, 1.24, 0.0);
    fifty(9.6, -4.05, ZW, 0.12, 0.3);
    B.S.add(box(THREE, 0.9, 0.7, 0.12, 9.3, -4.0, ZW + 0.06));

    /* ------------------------------------------------- the pilot house:
       a window band all round, the conning rail on its roof (above), the
       short pole mast with its yard and masthead light, the LN-66 radar,
       a searchlight at its forward corner                                  */
    (function () {
      var zw0 = 3.9, zw1 = 4.4, zc = (zw0 + zw1) / 2, hz = zw1 - zw0;
      var yo = -hb(XP1), yi = YP;
      for (k = 0; k < 4; k++) {
        var wy = lerp(yi, yo, (k + 0.5) / 4);
        B.G.add(box(THREE, 0.04, 0.48, hz, XP1 + 0.01, wy, zc));
      }
      for (k = 0; k < 3; k++) {
        var wx = lerp(XP0 + 0.5, XP1 - 0.4, (k + 0.5) / 3);
        B.G.add(box(THREE, 0.62, 0.04, hz, wx, yi + 0.01, zc));
        B.G.add(box(THREE, 0.62, 0.04, hz, wx, -hb(wx) - 0.01, zc));
      }
      for (k = 0; k < 2; k++) B.G.add(box(THREE, 0.04, 0.55, hz, XP0 - 0.01, lerp(yi, -hb(XP0), (k + 0.5) / 2), zc));
      /* the sun visor over the front                                        */
      B.S.add(box(THREE, 0.32, hb(XP1) - 2.0, 0.05, XP1 + 0.15, (yi + yo) / 2, zw1 + 0.12));
      /* mast at the roof's after end                                        */
      var mx = XP0 + 0.45, my = -3.25;
      B.M.add(cylZ(THREE, 0.06, 0.09, 2.85, 6, mx, my, ZP));
      B.M.add(box(THREE, 0.08, 1.8, 0.08, mx, my, ZP + 2.25));
      B.W.add(cylZ(THREE, 0.09, 0.09, 0.2, 8, mx, my, ZP + 2.85));
      B.M.add(strut(THREE, mx, my + 0.8, ZP + 2.25, mx, my + 0.8, ZP + 3.2, 0.015, 3));
      /* the radar on a short pedestal                                       */
      B.S.add(cylZ(THREE, 0.16, 0.2, 0.42, 8, XP0 + 1.7, -3.3, ZP));
      B.K.add(box(THREE, 0.18, 1.2, 0.14, XP0 + 1.7, -3.3, ZP + 0.52));
      /* searchlight                                                         */
      B.W.add(cylZ(THREE, 0.18, 0.18, 0.3, 10, XP1 - 0.3, YP - 0.3, ZP + 0.02));
      /* team flash on the roof                                              */
      B.T.add(box(THREE, 1.0, 0.9, 0.04, XP0 + 1.5, -2.65, ZP + 0.04));
    })();
    B.T.add(box(THREE, 1.6, 1.0, 0.04, -7.0, -3.35, ZH + 0.04));

    /* ------------------------------------------- underwater: the skegs, the
       Kort nozzles with their screws and the rudders behind them           */
    for (s = -1; s <= 1; s += 2) {
      var ny = s * NZY;
      /* the skeg from the run down to the keel line, ending at the nozzle  */
      var sk = sidePrism(THREE, [[-18.85, -1.92], [-14.6, -1.92], [-14.6, keel(-14.6) + 0.05], [-16.6, keel(-16.6) + 0.05],
                                 [-18.85, keel(-18.85) + 0.05]], K(ny - 0.13), K(ny + 0.13), [-17.6, -16.6, -15.6], true);
      B.H.add(sideUV(sk.side, s)); B.H.add(sideUV(sk.top, s));
      /* the shoe under the nozzle to the rudder's heel                      */
      B.H.add(sideUV(box(THREE, 1.6, 0.22, 0.12, -19.6, ny, -1.86), s));
      /* the nozzle, its bracket up to the hull                              */
      B.S.add(place(THREE, nozzle(THREE), NZX, ny, NZZ));
      B.H.add(sideUV(box(THREE, 0.9, 0.14, 0.9, NZX + 0.05, ny, NZZ + 0.98), s));
      /* the screw: hub and four blades                                      */
      B.K.add(cylX(THREE, 0.13, 0.5, 8, NZX, ny, NZZ));
      for (k = 0; k < 4; k++) {
        var bg = new THREE.BoxGeometry(0.05, 0.42, 0.26);
        bg.translate(0, 0.3, 0); bg.rotateY(0.5); bg.rotateX(PI / 4 + k * PI / 2);
        B.K.add(place(THREE, bg, NZX, ny, NZZ));
      }
      /* the shaft forward into the skeg                                     */
      B.M.add(cylX(THREE, 0.07, 0.9, 6, NZX + 0.8, ny, NZZ));
      /* the rudder astern of the nozzle, inside the fender's line            */
      var rd = sidePrism(THREE, [[-20.48, -1.72], [-20.08, -1.72], [-20.08, 0.25], [-20.48, 0.25]], K(ny - 0.06), K(ny + 0.06), null, true);
      B.H.add(sideUV(rd.side, s)); B.H.add(sideUV(rd.top, s));
    }

    /* ------------------------------------------------ out as one mesh each */
    Object.keys(B).forEach(function (kk) {
      var mm = B[kk].mesh(THREE, T[kk]);
      if (mm) { mm.name = "lcu_" + kk; root.add(mm); }
    });
    root.userData.heroLen = LOA;
    return root;
  }

  return { build: build, len: LOA };
})();

/* Registration: the row's only key. len is the measured X extent, the
   fender's after face to the raised ramp's tip: 41.1 m, the published
   134 ft 9 in.                                                             */
UNIT_MODELS["nato_lcu"] = { len: 41.1, build: function (THREE, M, C) { return HeroLCU1610.build(THREE, M, C); } };
