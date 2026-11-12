/* ================ gb_misc_aircraft.js  -  HERO MODELS ================
   Four rows, one builder (module) each, no national markings anywhere (no
   roundels, crosses, fin flashes, serials or squadron codes):

     gbr_e80_ewair    HeroNimrodR1      Hawker Siddeley Nimrod R.1
     gbr_e60_awacs    HeroShackleton    Avro Shackleton AEW.2
     gbr_e50_airlift  HeroBeverley      Blackburn Beverley C.1
     deu_e50_cas      HeroF84F          Republic F-84F Thunderstreak (Luftwaffe)

   None of the four had a model of its own (grep -i -E "nimrod|comet|
   shackleton|beverley|f-84|f84|thunderstreak" js/hero: only passing
   mentions - the F-84G in airbase_revetments.js, an "F-84" squadron in
   us_f14_tomcat.js), so nothing here is built on an earlier model. None of
   the four rows is in js/air_specs.js.

   The kit is js/hero/fr_transports.js's (itself us_c130_hercules.js's):
   Shell, superellipse rings, aerofoil lofts, pods, blades with a
   see-through prop disc, rods, merge per material, and projected paint
   UVs. The paint sheet's layout is made per aircraft here (layout()), as
   the four differ from 10 to 49 m in span. Each builder's own header lists
   its references, the published figures, how every station was measured,
   the recognition features and what is NOT CONFIRMED.

   The references (Wikimedia Commons, fetched for this file, cached in the
   scratchpad folder q_gbmisc_ref/) were measured on a pixel grid
   (gbm_tools/grid.py) and, for the black silhouettes, with a run scan of
   the ink (gbm_tools/scan.py).

   Stance. Every model stands on its drawn undercarriage. The F-84F does not
   sit level on it: it is built in its drawing's level frame and pitched as
   a whole 0.98 deg nose up about the main-wheel contact (pivot(), below),
   the ground line of its 3-view. The Shackleton, a tail-dragger, follows
   this game's tail-dragger convention (js/hero/ru_il10.js, us_skyraider.js):
   the same model flies, so the airframe sits level with its main wheels as
   measured and its tail-wheel leg drawn long enough to reach the ground;
   its real parked attitude (8.4 deg nose up) is recorded in its header.
   The Nimrod and the Beverley stand level (their photographs).

   Model space: +X nose, +Y left (port), +Z up, metres. Within a builder, d
   is metres aft of the nose and h metres above that builder's reference
   (stated in its header); X(d) and Z(h) convert. The undercarriage is the
   group named "gear" (render3d.js hides it in flight). One mesh per
   material; team colour (C.team exactly) on the wing tips and the fin tops.
   ===================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroNimrodR1 = null, HeroShackleton = null, HeroBeverley = null, HeroF84F = null;

(function () {
  "use strict";

  /* =================================================== the shared kit ==
     Copied from js/hero/fr_transports.js; the paint layout is a parameter. */
  var V = null;
  var D2R = Math.PI / 180;
  var _m4 = null, _q = null, _v = null, _u = null;
  var K = null, G = null;            /* the lists, one per material: airframe and gear */
  var L = null;                      /* the paint sheet's layout (layout()) */
  function put(key, g) { (K[key] || (K[key] = [])).push(g); }
  function gput(key, g) { (G[key] || (G[key] = [])).push(g); }
  function sgp(v, e) { return v < 0 ? -Math.pow(-v, e) : Math.pow(v, e); }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function cr(p0, p1, p2, p3, t) {
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
                  (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  /* a smooth look-up in a table whose first column is the station */
  function tab(rows, s) {
    var n = rows.length, i = 0, k, out = [];
    if (s <= rows[0][0]) return rows[0].slice(1);
    if (s >= rows[n - 1][0]) return rows[n - 1].slice(1);
    while (rows[i + 1][0] < s) i++;
    var a = rows[Math.max(i - 1, 0)], b = rows[i], c = rows[i + 1], d = rows[Math.min(i + 2, n - 1)];
    var t = (s - b[0]) / Math.max(1e-6, c[0] - b[0]);
    for (k = 1; k < b.length; k++) out.push(cr(a[k], b[k], c[k], d[k], t));
    return out;
  }
  /* a straight-line look-up (for profiles with corners) */
  function lin(rows, s) {
    var n = rows.length, i = 0, k, out = [];
    if (s <= rows[0][0]) return rows[0].slice(1);
    if (s >= rows[n - 1][0]) return rows[n - 1].slice(1);
    while (rows[i + 1][0] < s) i++;
    var b = rows[i], c = rows[i + 1], t = (s - b[0]) / Math.max(1e-6, c[0] - b[0]);
    for (k = 1; k < b.length; k++) out.push(b[k] + (c[k] - b[k]) * t);
    return out;
  }
  function lin1(rows, s) { return lin(rows, s)[0]; }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function Shell() { this.P = []; this.T = []; }
  Shell.prototype.vert = function (p) { this.P.push(p); return this.P.length - 1; };
  Shell.prototype.tri = function (a, b, c, cat, od) {
    var P = this.P, pa = P[a], pb = P[b], pc = P[c];
    var ux = pb[0] - pa[0], uy = pb[1] - pa[1], uz = pb[2] - pa[2];
    var vx = pc[0] - pa[0], vy = pc[1] - pa[1], vz = pc[2] - pa[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * od[0] + ny * od[1] + nz * od[2] < 0) { var t = b; b = c; c = t; }
    this.T.push([a, b, c, cat]);
  };
  Shell.prototype.fan = function (ring, c, ref, cat) {
    var n = ring.length, ic = this.vert(c), ids = [], i;
    var od = [c[0] - ref[0], c[1] - ref[1], c[2] - ref[2]];
    for (i = 0; i < n; i++) ids.push(this.vert(ring[i]));
    for (i = 0; i < n; i++) this.tri(ic, ids[i], ids[(i + 1) % n], cat, od);
  };
  Shell.prototype.loft = function (rings, catOf, capA, capB) {
    var R = rings.length, n = rings[0].length, r, i, j, idx = [], cent = [];
    for (r = 0; r < R; r++) {
      var row = [], cx = 0, cy = 0, cz = 0;
      for (i = 0; i < n; i++) {
        var p = rings[r][i];
        row.push(this.vert(p)); cx += p[0]; cy += p[1]; cz += p[2];
      }
      idx.push(row); cent.push([cx / n, cy / n, cz / n]);
    }
    for (r = 0; r + 1 < R; r++) {
      var mc = [(cent[r][0] + cent[r + 1][0]) / 2, (cent[r][1] + cent[r + 1][1]) / 2, (cent[r][2] + cent[r + 1][2]) / 2];
      for (i = 0; i < n; i++) {
        j = (i + 1) % n;
        var A = rings[r][i], B = rings[r][j], C = rings[r + 1][j], D = rings[r + 1][i];
        var od = [(A[0] + B[0] + C[0] + D[0]) / 4 - mc[0], (A[1] + B[1] + C[1] + D[1]) / 4 - mc[1],
                  (A[2] + B[2] + C[2] + D[2]) / 4 - mc[2]];
        var cat = catOf ? catOf(i, r, A, B, C, D) : "skin";
        this.tri(idx[r][i], idx[r][j], idx[r + 1][j], cat, od);
        this.tri(idx[r][i], idx[r + 1][j], idx[r + 1][i], cat, od);
      }
    }
    if (capA) this.fan(rings[0], cent[0], cent[1], capA);
    if (capB) this.fan(rings[R - 1], cent[R - 1], cent[R - 2], capB);
  };
  Shell.prototype.sheet = function (grid, cat, ref) {
    var ids = [], i, j;
    for (i = 0; i < grid.length; i++) {
      var row = [];
      for (j = 0; j < grid[i].length; j++) row.push(this.vert(grid[i][j]));
      ids.push(row);
    }
    for (i = 0; i + 1 < grid.length; i++) {
      for (j = 0; j + 1 < grid[i].length; j++) {
        var A = grid[i][j], B = grid[i][j + 1], C = grid[i + 1][j + 1], D = grid[i + 1][j];
        var od = [(A[0] + B[0] + C[0] + D[0]) / 4 - ref[0], (A[1] + B[1] + C[1] + D[1]) / 4 - ref[1],
                  (A[2] + B[2] + C[2] + D[2]) / 4 - ref[2]];
        this.tri(ids[i][j], ids[i][j + 1], ids[i + 1][j + 1], cat, od);
        this.tri(ids[i][j], ids[i + 1][j + 1], ids[i + 1][j], cat, od);
      }
    }
  };
  Shell.prototype.emit = function (into) {
    var P = this.P, Tr = this.T, N = [], i, k;
    for (i = 0; i < P.length; i++) N.push([0, 0, 0]);
    for (k = 0; k < Tr.length; k++) {
      var t = Tr[k], pa = P[t[0]], pb = P[t[1]], pc = P[t[2]];
      var ux = pb[0] - pa[0], uy = pb[1] - pa[1], uz = pb[2] - pa[2];
      var vx = pc[0] - pa[0], vy = pc[1] - pa[1], vz = pc[2] - pa[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      for (i = 0; i < 3; i++) { var q = N[t[i]]; q[0] += nx; q[1] += ny; q[2] += nz; }
    }
    for (i = 0; i < N.length; i++) {
      var m = Math.sqrt(N[i][0] * N[i][0] + N[i][1] * N[i][1] + N[i][2] * N[i][2]) || 1;
      N[i][0] /= m; N[i][1] /= m; N[i][2] /= m;
    }
    var by = {};
    for (k = 0; k < Tr.length; k++) {
      var cat = Tr[k][3];
      if (!by[cat]) by[cat] = { pos: [], nor: [] };
      for (i = 0; i < 3; i++) {
        var p = P[Tr[k][i]], nn = N[Tr[k][i]];
        by[cat].pos.push(p[0], p[1], p[2]); by[cat].nor.push(nn[0], nn[1], nn[2]);
      }
    }
    for (var key in by) {
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(by[key].pos, 3));
      g.setAttribute("normal", new V.Float32BufferAttribute(by[key].nor, 3));
      if (into) (into[key] || (into[key] = [])).push(g); else put(key, g);
    }
  };

  /* general ring: a superellipse about (x, yc), half-width w, top and bottom
     zt / zb (model z), widest at zw, squareness eU / eL */
  function ringSE(x, yc, w, zt, zb, zw, eU, eL, n) {
    var out = [], j;
    for (j = 0; j < n; j++) {
      var t = j / n * Math.PI * 2, c = Math.cos(t), s = Math.sin(t), e = s >= 0 ? eU : eL;
      out.push([x, yc + w * sgp(c, e), s >= 0 ? zw + (zt - zw) * sgp(s, e) : zw + (zw - zb) * sgp(s, e)]);
    }
    return out;
  }
  /* an airfoil ring: frame "w" across the span at y = a, chord plane at
     z = o; frame "f" up a fin at z = a, centred on y = o; s the leading
     edge's X; t the thickness-chord ratio */
  var FK = 10;
  function foilRing(s, c, t, a, o, frame, cam) {
    var up = [], lo = [], j, u, th, cm, ring = [];
    for (j = 0; j <= FK; j++) {
      u = (1 - Math.cos(Math.PI * j / FK)) / 2;
      th = t * c * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u);
      cm = (cam || 0) * 4 * u * (1 - u) * c;
      if (frame === "w") { up.push([s - u * c, a, o + cm + th]); lo.push([s - u * c, a, o + cm - th]); }
      else { up.push([s - u * c, o + th, a]); lo.push([s - u * c, o - th, a]); }
    }
    for (j = 0; j <= FK; j++) ring.push(up[j]);
    for (j = FK - 1; j >= 1; j--) ring.push(lo[j]);
    return ring;
  }
  function foilT(u) {
    return 1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u;
  }
  function foilLoft(rings, cat, capA, capB) {
    var sh = new Shell();
    sh.loft(rings, function () { return cat; }, capA ? cat : null, capB ? cat : null);
    sh.emit();
  }
  /* a body of revolution along -X from x0: prof rows [distance aft, radius] */
  function pod(x0, yc, zc, prof, n, capA, capB, cat, into) {
    var rings = prof.map(function (q) {
      var r = Math.max(q[1], 0.005), out = [], j;
      for (j = 0; j < n; j++) {
        var a = j / n * Math.PI * 2;
        out.push([x0 - q[0], yc + r * Math.cos(a), zc + r * Math.sin(a)]);
      }
      return out;
    });
    var sh = new Shell();
    sh.loft(rings, function () { return cat; }, capA ? cat : null, capB ? cat : null);
    sh.emit(into);
  }
  /* one blade, a twisted strip of six stations; a = its angle round the
     shaft from straight up; B: radii (fractions of the tip radius) and
     chords */
  function addBlade(B, rp, x, yc, zc, a, sense) {
    var pos = [], k;
    var PT = [52, 42, 33, 26, 21, 18];
    var er = [Math.sin(a), Math.cos(a)], et = [Math.cos(a), -Math.sin(a)];
    for (k = 0; k < 6; k++) {
      var r = B.rr[k] * rp, hc = B.ch[k] / 2, pr = PT[k] * D2R * (sense || 1);
      var by = yc + er[0] * r, bz = zc + er[1] * r;
      pos.push([x + hc * Math.sin(pr), by + et[0] * hc * Math.cos(pr), bz + et[1] * hc * Math.cos(pr)]);
      pos.push([x - hc * Math.sin(pr), by - et[0] * hc * Math.cos(pr), bz - et[1] * hc * Math.cos(pr)]);
    }
    var grid = [];
    for (k = 0; k < 6; k++) grid.push([pos[2 * k], pos[2 * k + 1]]);
    var sh = new Shell();
    sh.sheet(grid, "blade", [x + 1, yc, zc]);
    sh.emit();
  }
  /* a propeller: n static blades, the lowest a little off straight down,
     and the see-through disc (us_c130_hercules.js); sense -1 pitches the
     blades the other way (the rear row of a contra-rotating pair) */
  function addProp(B, n, rp, x, yc, zc, turn, sense) {
    var a0 = (180 - turn) * D2R, k;
    for (k = 0; k < n; k++) addBlade(B, rp, x + 0.01, yc, zc, a0 + k * Math.PI * 2 / n, sense);
    var dg = new V.CircleGeometry(rp, 28);
    dg.rotateY(Math.PI / 2); dg.translate(x - 0.03, yc, zc);
    put("blur", dg);
  }
  function rod(a, b, r, seg, r2) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var Ln = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r2 === undefined ? r : r2, r, Ln, seg || 8);
    _q.setFromUnitVectors(_u.set(0, 1, 0), _v.set(dx / Ln, dy / Ln, dz / Ln));
    _m4.makeRotationFromQuaternion(_q);
    _m4.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(_m4);
    return g;
  }
  function boxG(sx, sy, sz, x, y, z) {
    var g = new V.BoxGeometry(sx, sy, sz);
    g.translate(x, y, z);
    return g;
  }
  function egg(rx, ry, rz, x, y, z, ws, hs) {
    var g = new V.SphereGeometry(1, ws || 12, hs || 8);
    g.scale(rx, ry, rz);
    g.translate(x, y, z);
    return g;
  }
  function wheelG(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 18); g.translate(x, y, z); return g; }
  /* a tyre and its hub, axle along Y */
  function wheel(r, w, x, y, z) {
    gput("tyre", wheelG(r, w, x, y, z, 20));
    gput("metal", wheelG(r * 0.55, w * 1.06, x, y, z, 10));
  }

  /* ------------------------------------------------------------ paint --
     Four plan views on one sheet, along the aeroplane (x) and: across it
     from above (y), the port side (z), the starboard side (z), across it
     from below (y). layout() sizes the bands for each aircraft. */
  function layout(xmin, xmax, ymax, zmin, zmax) {
    var TW = 1024, TH = 2048, PX = (TW - 4) / (xmax - xmin);
    var PY = Math.min(PX, 640 / (2 * ymax)), PZ = Math.min(PX * 1.5, 300 / (zmax - zmin));
    var TOPH = Math.ceil(2 * ymax * PY) + 2, SIDEH = Math.ceil((zmax - zmin) * PZ) + 2;
    var B_PORT = TOPH + 4, B_STBD = B_PORT + SIDEH + 4, B_BOT = B_STBD + SIDEH + 4;
    return { TW: TW, TH: TH, PX: PX, PY: PY, PZ: PZ, XMIN: xmin, YMAX: ymax, ZMAX: zmax,
             TOPH: TOPH, SIDEH: SIDEH, B_PORT: B_PORT, B_STBD: B_STBD, B_BOT: B_BOT };
  }
  function cu(x) { return clamp((x - L.XMIN) * L.PX, 1, L.TW - 1); }
  function rTop(y) { return clamp((L.YMAX - y) * L.PY, 1, L.TOPH - 1); }
  function rBot(y) { return L.B_BOT + clamp((L.YMAX - y) * L.PY, 1, L.TOPH - 1); }
  function rSide(z, stbd) { return (stbd ? L.B_STBD : L.B_PORT) + clamp((L.ZMAX - z) * L.PZ, 1, L.SIDEH - 1); }
  function Painter(seed, P) {
    var cv = document.createElement("canvas");
    cv.width = L.TW; cv.height = L.TH;
    this.cv = cv; this.g = cv.getContext("2d"); this.R = rngFor(seed); this.P = P;
    this.LINE = "rgba(18,22,24," + P.seam + ")";
  }
  Painter.prototype.line = function (pts, col, lw) {
    var g = this.g;
    g.strokeStyle = col || this.LINE; g.lineWidth = lw || 1;
    g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
    for (var j = 1; j < pts.length; j++) g.lineTo(pts[j][0], pts[j][1]);
    g.stroke();
  };
  Painter.prototype.disc = function (c, r, col) {   /* r in metres, on a side band */
    var g = this.g;
    g.fillStyle = col; g.save(); g.translate(c[0], c[1]); g.scale(L.PX, L.PZ);
    g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.closePath(); g.fill(); g.restore();
  };
  /* the coats: P.top over the top band and the sides above demarcZ, P.low
     below it and on the belly; a faint mottle of the two and weathering */
  Painter.prototype.coats = function (demarcZ) {
    var g = this.g, P = this.P, R = this.R, i;
    g.fillStyle = P.top; g.fillRect(0, 0, L.TW, L.TOPH + 2);
    g.fillRect(0, L.B_PORT, L.TW, L.B_BOT - L.B_PORT);
    g.fillStyle = P.low; g.fillRect(0, L.B_BOT - 2, L.TW, L.TH - L.B_BOT + 2);
    if (demarcZ !== null && demarcZ !== undefined) {
      for (var s = 0; s < 2; s++) {
        var r0 = rSide(demarcZ, s === 1);
        g.fillRect(0, r0, L.TW, (s ? L.B_STBD : L.B_PORT) + L.SIDEH - r0);
      }
    }
    for (i = 0; i < 90; i++) {                         /* a faint weathering */
      g.fillStyle = R() < 0.5 ? "rgba(0,0,0," + (P.gloss ? 0.035 : 0.05) + ")" : "rgba(255,255,255,0.04)";
      g.beginPath(); g.arc(R() * L.TW, R() * L.TH, 5 + R() * 20, 0, Math.PI * 2); g.closePath(); g.fill();
    }
  };
  Painter.prototype.texture = function () {
    var tex = new V.CanvasTexture(this.cv);
    tex.wrapS = tex.wrapT = V.ClampToEdgeWrapping;
    tex.anisotropy = 4;
    if (V.sRGBEncoding !== undefined) tex.encoding = V.sRGBEncoding;   /* r148 */
    return tex;
  };
  /* projected UVs: each triangle into the band its normal faces; faces that
     look fore or aft go to the plan views, laid along x plus a share of the
     span (us_c130_hercules.js) */
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var endOn = Math.abs(nx) > 0.8;
      var band = endOn ? (nz < -0.3 ? 3 : 0) : (nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2));
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], yy = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, Rr;
        U = cu(endOn ? x + 0.35 * yy : x);
        if (band === 0) Rr = rTop(yy);
        else if (band === 3) Rr = rBot(yy);
        else Rr = rSide(z, band === 2);
        uv[(t / 3 + k) * 2] = U / L.TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - Rr / L.TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* materials: SKIN the painted sheet; DOME radomes; TEAM exactly C.team;
     METAL; INK flat black of intakes, exhausts and openings; BLADE; BLUR the
     see-through prop disc (depthWrite off, and the parking code does not
     stand an aeroplane on it); GLASS; TYRE */
  function makeMats(C, P, tex) {
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: P.gloss ? 0.50 : 0.84,
                                          metalness: P.gloss ? 0.40 : 0.08, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.top);
    m.dome = new V.MeshStandardMaterial({ color: P.dome, roughness: 0.55, metalness: 0.05, side: V.DoubleSide });
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10, side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.ink = new V.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: V.DoubleSide });
    m.blade = new V.MeshStandardMaterial({ color: P.blade || 0x17191c, roughness: 0.62, metalness: 0.30, side: V.DoubleSide });
    m.blur = new V.MeshStandardMaterial({ color: 0xd2d8dc, roughness: 0.5, metalness: 0.0,
                                          transparent: true, opacity: 0.11, depthWrite: false, side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: 0x24333b, roughness: 0.12, metalness: 0.45,
                                           transparent: true, opacity: 0.86, side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.gskin = m.skin;
    /* position lights (only builders that put "lampR" / "lampG" draw them) */
    m.lampR = new V.MeshStandardMaterial({ color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 });
    m.lampG = new V.MeshStandardMaterial({ color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 });
    return m;
  }
  function merge(list) {
    var pos = [], nor = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(pos.length / 3 * 2), 2));
    return out;
  }
  /* PIV: the stance (pivot()), applied to every merged geometry after its
     paint UVs are projected in the level drawing frame */
  var PIV = null;
  function emit(parent, lists, mats, order) {
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      if (!lists[key] || !lists[key].length) continue;
      var geo = merge(lists[key]);
      if (key === "skin" || key === "gskin") projUV(geo);
      if (PIV) geo.applyMatrix4(PIV);
      parent.add(new V.Mesh(geo, mats[key]));
    }
  }
  /* a pitch of the whole model by a (radians, + nose down, - nose up) about the point
     (x, z) - the main-wheel contact - so it rests on all its wheels */
  function pivot(a, x, z) {
    if (!a) { PIV = null; return; }
    var t1 = new V.Matrix4().makeTranslation(-x, 0, -z);
    var r = new V.Matrix4().makeRotationY(a);
    var t2 = new V.Matrix4().makeTranslation(x, 0, z);
    PIV = t2.multiply(r).multiply(t1);
  }
  function begin(THREE, lay) {
    V = THREE; L = lay; PIV = null;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    K = {}; G = {};
  }
  function finish(C, P, tex) {
    var mats = makeMats(C, P, tex);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "dome", "team", "metal", "ink", "blade", "glass", "blur", "lampR", "lampG"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["gskin", "metal", "tyre"]);
    root.add(gear);
    return root;
  }
  /* a texture per guise, made once */
  function sheetOnce(cache, id, fn) {
    if (cache[id] !== undefined) return cache[id];
    try { cache[id] = fn(); } catch (e) { cache[id] = false; }
    return cache[id];
  }

  /* a fuselage from a station table: rows d, half-width, top h, bottom h,
     the widest line's h, squareness of the upper and lower halves; X, Z the
     builder's converters; smooth (tab) or straight (lin) between rows */
  function Body(rows, X, Z, straight) {
    var look = straight ? lin : tab;
    function sec(d) { return look(rows, d); }
    function secPt(r, t) {
      var c = Math.cos(t), s = Math.sin(t), e = s >= 0 ? r[4] : r[5];
      return [r[0] * sgp(c, e), s >= 0 ? r[3] + (r[1] - r[3]) * sgp(s, e) : r[3] + (r[3] - r[2]) * sgp(s, e)];
    }
    function hullY(d, h) {
      var r = sec(d), up = h >= r[3], e = up ? r[4] : r[5];
      var v = up ? (h - r[3]) / Math.max(0.01, r[1] - r[3]) : (r[3] - h) / Math.max(0.01, r[3] - r[2]);
      v = clamp(v, 0, 0.999);
      var sn = Math.pow(v, 1 / e), c = Math.sqrt(Math.max(0, 1 - sn * sn));
      return r[0] * Math.pow(c, e);
    }
    function hullTopH(d, y) {
      var r = sec(d), e = r[4], c = Math.min(0.999, Math.abs(y) / r[0]);
      var cc = Math.pow(c, 1 / e), sn = Math.sqrt(Math.max(0, 1 - cc * cc));
      return r[3] + (r[1] - r[3]) * Math.pow(sn, e);
    }
    function loft(FST, FN, catOf, capA, capB) {
      var rings = [], r, i, sh = new Shell();
      for (r = 0; r < FST.length; r++) {
        var s = sec(FST[r]), ring = [];
        for (i = 0; i < FN; i++) {
          var p = secPt(s, i / FN * Math.PI * 2);
          ring.push([X(FST[r]), p[0], Z(p[1])]);
        }
        rings.push(ring);
      }
      sh.loft(rings, catOf ? function (i, r) { return catOf((FST[r] + FST[r + 1]) / 2, i); } : null, capA, capB);
      sh.emit();
    }
    /* a pane laid 3 cm proud of the skin: on the side between stations d0-d1
       and heights h0-h1, or on the top between half-widths y0-y1 */
    function paneSide(sh, d0, d1, h0, h1, side) {
      var grid = [], i, j;
      for (i = 0; i <= 2; i++) {
        var d = d0 + (d1 - d0) * i / 2, row = [];
        for (j = 0; j <= 2; j++) {
          var h = h0 + (h1 - h0) * j / 2, r = sec(d), y = hullY(d, h);
          var dz = h - r[3], dy = y, Ln = Math.sqrt(dy * dy + dz * dz) || 1;
          row.push([X(d), side * (y + 0.03 * dy / Ln), Z(h + 0.03 * dz / Ln)]);
        }
        grid.push(row);
      }
      sh.sheet(grid, "glass", [X((d0 + d1) / 2), 0, Z(sec((d0 + d1) / 2)[3])]);
    }
    function paneTop(sh, d0, d1, y0, y1) {
      var grid = [], i, j;
      for (i = 0; i <= 2; i++) {
        var d = d0 + (d1 - d0) * i / 2, row = [];
        for (j = 0; j <= 2; j++) {
          var y = y0 + (y1 - y0) * j / 2, r = sec(d), h = hullTopH(d, y);
          var dz = h - r[3], Ln = Math.sqrt(y * y + dz * dz) || 1;
          row.push([X(d), y + 0.03 * y / Ln, Z(h + 0.03 * dz / Ln)]);
        }
        grid.push(row);
      }
      sh.sheet(grid, "glass", [X((d0 + d1) / 2), 0, Z(sec((d0 + d1) / 2)[3])]);
    }
    return { sec: sec, secPt: secPt, hullY: hullY, hullTopH: hullTopH, loft: loft, paneSide: paneSide, paneTop: paneTop };
  }
  /* station tables from separate side and plan lists (straight between
     readings): rows [d, hw, top, bottom, widest, eU, eL] at stations FST */
  function rowsFrom(FST, HW, TOP, BOT, eU, eL, wid) {
    return FST.map(function (d) {
      var t = lin1(TOP, d), b = lin1(BOT, d);
      return [d, Math.max(0.02, lin1(HW, d)), t, b, wid ? wid(d, t, b) : (t + b) / 2,
              typeof eU === "function" ? eU(d) : eU, typeof eL === "function" ? eL(d) : eL];
    });
  }

  /* ================================================================
     ================ REPUBLIC F-84F THUNDERSTREAK ==================
     deu_e50_cas: the Luftwaffe's F-84F (1956). js/hero has no F-84 of any
     kind (grep above), so this is a new model, drawn plain (no crosses, no
     codes) in the bare metal the Luftwaffe flew it in.

     References (scratchpad q_gbmisc_ref/):
     D "Republic F-84F Thunderstreak 3-view line drawing.png" (1708 x 2568
        px), a dimensioned factory three-view: length 43'3.8" (13.20 m),
        span 33'7" (10.24 m), height 14'4.52" (4.38 m), main track 20'2.31"
        (6.16 m), wheelbase 19'5.64" (5.94 m), 40 deg sweep at the quarter
        chord of wing and tailplane, 3 deg 30' anhedral. Read on a pixel
        grid (gbm_tools/grid.py):
          side   d = (px - 118) / 97.85  (nose lip px 118, the 13.20 m
                                         dimension 1292 px); heights
                 h = (2338 - row) / 97.85 above the intake axis (row 2338);
                 the fin top at row 2066 = 4.35 m over the ground line
                 under it (dimension 4.38 m: -0.7 %);
          plan   97.7 px/m across (the span dimension, 1000 px); along the
                 aeroplane its 1275 px nose-to-tailplane is 1.2 % short of
                 the side, so plan stations are read at 96.6 px/m (the
                 published length) - the wing then spans d 3.21-9.33 and the
                 side view's wing lens 3.26-9.44 agrees;
          front  99.1 px/m (the 6.16 m track, 610 px; the span then reads
                 10.29 m, +0.5 %).
        Measured: the nose intake 0.82 m deep (lip), the fuselage top and
        bottom lines (TOP, BOT), the canopy 1.95-4.1 m with its top 1.31 m
        over the axis, the dorsal spine falling from 1.21 m at 4.75 m to
        0.70 m at 8.3 m, the plan half-widths (HW; widest 0.64 m, the front
        view 0.68), the nozzle 0.58 m across ending at 11.80 m; the wing
        root chord at the fuselage side (0.645 m out) 3.21-6.89 m, the tip
        chord 4.96 m out 7.14-9.33 m, the rounded tip to 5.12 m, the chord
        plane at the axis at the root (front view); the tailplane 1.13 m
        chord, 40 deg, root leading edge 10.57 m, 2.16 m half span, 1.05 m
        over the axis on the fin; the fin leading edge from 9.86 m (0.95 m
        up) to 11.74 m (2.78 m up), its top chord to 12.80 m, the trailing
        edge back down to 11.80 m at the nozzle; the dorsal fillet from the
        spine at 9.2 m. Gear: the main wheels 0.77 m across at 6.22 m, 6.16
        m apart, their centres 1.29 m under the axis; the nose wheel 0.50 m
        across 0.25 m aft of the lip, 1.53 m under the axis.
     P1 "Republic F-84F-76-RE (DF+316) 2009-04-16 Andre Gerwing Collection
        ID 014905.jpg" (a Luftwaffe F-84F, museum): the oval nose intake,
        the bare metal, the single nose wheel on a straight leg just behind
        the intake, the main legs far out in the wing, the framed canopy.
     P2 "DD-113 Republic F-84F Thunderstreak in Memmingen.jpg" (a Luftwaffe
        F-84F on a pole, port side): bare metal overall, the tailplane high
        on the fin reaching well aft of the nozzle, the dorsal spine.
   Published (en.wikipedia "Republic F-84F Thunderstreak"): length 13.23 m,
   span 10.25 m, height 4.39 m, wing area 30 m2 (D's plan: 29.4 m2 outside
   the fuselage plus the part inside).

   Stance: D draws its ground line 1.0 deg off the airframe's datum - the
   nose wheel's bottom 0.10 m further under the axis than the main wheels'
   - so the aircraft sits 0.98 deg nose up on its drawn gear; the model is
   pitched by that much about the main-wheel contact.

   Recognition: the swept wing with anhedral, the round-lipped oval nose
   intake, the framed canopy running into a dorsal spine, the tall swept fin
   with the swept tailplane high on it, the main gear far out in the wing.

   NOT CONFIRMED: the wing and tail thickness (9 / 8 per cent, not drawn in
   D); the gear legs' doors and braces (P1 shows a plain leg and a door, the
   doors are not drawn); no stores are drawn (the row's rockets varied from
   sortie to sortie). The red intake lip on P1 is a unit marking and is not
   drawn. Paint: bare aluminium all over (P1, P2).
   DETAIL PASS: the M3 muzzles in the nose ports, seat headrest, mirror,
   canopy sill rails, a spine whip and a belly blade, wing-tip position
   lights and a tail light, the jet pipe's lip ring and liner; on the gear
   torque links, collars, brake lines, hub caps with bolts, the nose well's
   doors and taxi lamp; on the sheet longeron seams with fastener rows,
   access panels, wing spars, fuel caps, gun-gas and exhaust soot and rain
   streaks. All placed from P1 and P2, NOT measured.
   Model space: x = 6.6 - d, z = h (the intake axis), before the stance. */
  HeroF84F = (function () {
    var NOSE = 6.6;
    function X(d) { return NOSE - d; }
    function Z(h) { return h; }
    var PAINT = { top: "#a6acb0", low: "#a2a8ac", seam: 0.17, gloss: true, dome: 0x2a2e31, blade: 0x1b1d20 };

    /* -------------------------------------------------------- fuselage --
       D side (TOP, BOT) and plan (HW); the top under the canopy is the
       sill (0.80 m, D front: the body's oval top 0.83 m over the axis), the
       canopy is glazing laid over it. */
    var TOP = [[0, 0.36], [0.06, 0.41], [0.30, 0.52], [0.66, 0.593], [1.10, 0.65], [1.53, 0.695], [1.94, 0.76],
               [2.30, 0.80], [4.00, 0.80], [4.12, 1.24], [4.75, 1.21], [5.77, 1.06], [6.63, 0.87], [7.48, 0.74],
               [8.33, 0.70], [9.20, 0.70], [10.0, 0.645], [11.0, 0.52], [11.8, 0.36]];
    var BOT = [[0, -0.36], [0.06, -0.41], [0.30, -0.49], [0.66, -0.542], [1.5, -0.66], [2.36, -0.756], [3.6, -0.83],
               [4.9, -0.879], [6.63, -0.818], [8.33, -0.726], [10.0, -0.562], [10.9, -0.409], [11.8, -0.225]];
    var HW = [[0, 0.26], [0.06, 0.31], [0.30, 0.37], [0.68, 0.43], [1.83, 0.52], [2.98, 0.61], [4.13, 0.635],
              [6.43, 0.64], [8.74, 0.58], [9.89, 0.48], [10.57, 0.37], [11.2, 0.32], [11.8, 0.29]];
    var FST = [0, 0.06, 0.15, 0.30, 0.5, 0.66, 0.9, 1.2, 1.53, 1.94, 2.3, 3.0, 3.6, 4.0, 4.12, 4.4, 4.75, 5.3, 5.77,
               6.2, 6.63, 7.0, 7.48, 8.0, 8.33, 8.8, 9.2, 9.6, 10.0, 10.5, 10.9, 11.3, 11.6, 11.8];
    /* the spine behind the canopy is a narrow ridge: a pointed top there */
    function eUp(d) { return d < 4.05 ? 1.0 : d < 9.4 ? 1.7 : 1.15; }
    var B = null;
    function addFuselage() {
      B = Body(rowsFrom(FST, HW, TOP, BOT, eUp, 1.0, function (d, t, b) { return d < 1 ? (t + b) / 2 : -0.05; }), X, Z, true);
      B.loft(FST, 28, null, "ink", "ink");
    }
    /* the canopy: D side and front (0.71 m across), framed glass from the
       windscreen at 1.95 m to the spine at 4.12 m */
    var CAN = [[1.95, 0.24, 0.78], [2.20, 0.30, 0.96], [2.60, 0.34, 1.22], [2.88, 0.35, 1.31], [3.50, 0.35, 1.31],
               [4.08, 0.33, 1.30], [4.14, 0.28, 1.25]];
    function addCanopy() {
      var rings = CAN.map(function (q) { return ringSE(X(q[0]), 0, q[1], Z(q[2]), Z(0.62), Z(0.70), 0.85, 1.0, 16); });
      var sh = new Shell();
      sh.loft(rings, function () { return "glass"; }, "glass", null);
      sh.emit();
      /* the windscreen arch and the frame at the sliding hood's front (P1) */
      [2.58, 3.05].forEach(function (d) {
        var q = lin(CAN.map(function (r) { return [r[0], r[1], r[2]]; }), d), pts = [], j;
        for (j = 0; j <= 8; j++) {
          var t = Math.PI * j / 8;
          pts.push([X(d), (q[0] + 0.02) * Math.cos(t), Z(0.70 + (q[1] - 0.70 + 0.02) * Math.sin(t))]);
        }
        for (j = 0; j < 8; j++) put("metal", rod(pts[j], pts[j + 1], 0.022, 5));
      });
    }

    /* ------------------------------------------------------------ wing --
       D plan: the leading edge 42.3 deg (40 deg at the quarter chord), the
       trailing edge 29.5 deg; the chord plane on the axis at the root and
       3.5 deg of anhedral (D front: the tip 0.33 m under the axis). */
    function wLE(a) { return 3.21 + (Math.abs(a) - 0.645) * 0.911; }
    function wTE(a) { return 6.89 + (Math.abs(a) - 0.645) * 0.565; }
    function wH(a) { return 0.02 - 0.0612 * Math.abs(a); }
    function wTC(a) { return 0.09 - 0.01 * Math.min(1, Math.abs(a) / 5.12); }
    var WTEAM = 4.75, WTIP = 5.12;
    function wingRing(a, k) {
      var le = wLE(a), c = wTE(a) - le;
      if (k) { le += c * (1 - k) * 0.55; c *= k; }
      return foilRing(X(le), c, wTC(a), a, Z(wH(a)), "w", 0.008);
    }
    function wingLow(a, d) {
      var le = wLE(a), c = wTE(a) - le, u = clamp((d - le) / c, 0, 1);
      return wH(a) + 0.008 * 4 * u * (1 - u) * c - wTC(a) * c * foilT(u);
    }
    function addWing() {
      var ys = [-WTEAM, -4.0, -3.0, -2.0, -1.0, 0, 1.0, 2.0, 3.0, 4.0, WTEAM];
      foilLoft(ys.map(function (a) { return wingRing(a); }), "skin", false, false);
      for (var s = -1; s <= 1; s += 2) {
        foilLoft([wingRing(s * WTEAM), wingRing(s * 5.0, 0.86), wingRing(s * WTIP, 0.5)], "team", false, true);
      }
    }
    /* ------------------------------------------------------------ tail --
       the tailplane (D): 1.13 m chord, 40 deg, on the fin 1.05 m up; the
       fin (D side): leading edge 9.86 m at 0.95 m to 11.74 m at 2.78 m,
       the dorsal fillet from the spine at 9.2 m, top chord to 12.80 m,
       trailing edge to 11.80 m at the nozzle */
    function tpLE(a) { return 10.57 + Math.max(0, Math.abs(a) - 0.12) * 0.84; }
    function tpRing(a, k) {
      var le = tpLE(a), c = 1.13;
      if (k) { le += c * (1 - k) * 0.5; c *= k; }
      return foilRing(X(le), c, 0.08, a, Z(1.05), "w", 0);
    }
    function finLE(h) { return h < 0.95 ? 9.86 - (0.95 - h) * 2.6 : 9.86 + (h - 0.95) * 1.027; }
    function finTE(h) { return 11.80 + (h - 0.44) * 0.427; }
    function finRing(h, k) {
      var le = finLE(h), te = finTE(h), c = te - le;
      if (k) { le += c * (1 - k) * 0.5; c *= k; }
      return foilRing(X(le), c, Math.min(0.08, 0.20 / c), Z(h), 0, "f", 0);
    }
    function addTail() {
      foilLoft([0.45, 0.70, 0.95, 1.5, 2.1, 2.55].map(function (h) { return finRing(h); }), "skin", true, false);
      foilLoft([finRing(2.55), finRing(2.70), finRing(2.78, 0.8)], "team", false, true);
      var ys = [-2.16, -2.0, -1.4, -0.7, 0, 0.7, 1.4, 2.0, 2.16];
      foilLoft(ys.map(function (a) { var b = Math.abs(a); return tpRing(a, b > 2.1 ? 0.5 : b > 1.9 ? 0.9 : 0); }), "skin", true, true);
    }

    /* ------------------------------------------------------------ gear --
       D: main wheels 0.77 m across at 6.22 m, 3.08 m out, centres 1.29 m
       under the axis, the leg inboard of the wheel up into the wing; the
       nose wheel (single, P1) 0.50 m across at 0.25 m, 1.53 m under the
       axis, its leg straight up into the fuselage behind the intake (P1). */
    var MAIN = { d: 6.22, y: 3.08, h: -1.293, r: 0.385 }, NOSEW = { d: 0.25, h: -1.53, r: 0.25 };
    function addGear() {
      for (var s = -1; s <= 1; s += 2) {
        var x = X(MAIN.d), yl = s * (MAIN.y - 0.17), top = wingLow(MAIN.y - 0.17, MAIN.d) + 0.05;
        wheel(MAIN.r, 0.22, x, s * MAIN.y, Z(MAIN.h));
        gput("metal", rod([x, yl, Z(MAIN.h)], [x - 0.08, yl, Z(top)], 0.07, 8));
        gput("metal", rod([x, yl, Z(MAIN.h)], [x, s * (MAIN.y - 0.02), Z(MAIN.h)], 0.05, 6));
        gput("metal", rod([x - 0.05, yl, Z(MAIN.h + 0.45)], [x - 0.75, s * (MAIN.y - 0.45), Z(top)], 0.035, 6));
        /* the leg door outboard of the leg (P1) */
        gput("gskin", boxG(0.62, 0.025, 0.85, x - 0.05, s * (MAIN.y - 0.30), Z(top - 0.48)));
      }
      var xn = X(NOSEW.d);
      wheel(NOSEW.r, 0.16, xn, 0, Z(NOSEW.h));
      gput("metal", rod([xn + 0.01, 0.10, Z(NOSEW.h)], [X(0.55), 0.10, Z(-0.50)], 0.05, 8));
      gput("metal", rod([xn + 0.01, -0.10, Z(NOSEW.h)], [X(0.55), -0.10, Z(-0.50)], 0.05, 8));
      gput("metal", rod([xn, -0.11, Z(NOSEW.h)], [xn, 0.11, Z(NOSEW.h)], 0.035, 6));
      gput("metal", rod([X(0.55), 0, Z(-0.85)], [X(1.25), 0, Z(-0.62)], 0.035, 6));
      /* the detail pass (P1, P2): the nose leg's torque links, gland collar
         and taxi lamp, the nose well's doors; the main legs' torque links,
         collars and brake lines; hub caps with bolts */
      gput("metal", rod([xn + 0.05, 0, Z(NOSEW.h + 0.14)], [xn - 0.10, 0, Z(NOSEW.h + 0.30)], 0.014, 4));
      gput("metal", rod([xn - 0.10, 0, Z(NOSEW.h + 0.30)], [xn - 0.20, 0, Z(NOSEW.h + 0.48)], 0.014, 4));
      gput("metal", rod([X(0.48), 0, Z(-0.80)], [X(0.48), 0, Z(-0.74)], 0.12, 10));
      gput("metal", boxG(0.08, 0.14, 0.08, X(0.40), 0, Z(-0.66)));
      for (var sd = -1; sd <= 1; sd += 2) {
        gput("gskin", boxG(0.80, 0.022, 0.30, X(0.95), sd * 0.20, Z(-0.80)));
        gput("tyre", wheelG(0.09, 0.18, xn, 0, Z(NOSEW.h), 10));
        var xm = X(MAIN.d), ym = sd * (MAIN.y - 0.17);
        gput("metal", rod([xm + 0.02, ym, Z(MAIN.h + 0.10)], [xm + 0.18, ym, Z(MAIN.h + 0.28)], 0.017, 4));
        gput("metal", rod([xm + 0.18, ym, Z(MAIN.h + 0.28)], [xm - 0.02, ym, Z(MAIN.h + 0.46)], 0.017, 4));
        gput("metal", rod([xm - 0.03, ym, Z(MAIN.h + 0.52)], [xm - 0.035, ym, Z(MAIN.h + 0.58)], 0.10, 10));
        gput("tyre", rod([xm - 0.10, ym - sd * 0.06, Z(MAIN.h + 0.95)], [xm - 0.02, ym - sd * 0.06, Z(MAIN.h + 0.12)], 0.009, 4));
        gput("tyre", wheelG(0.12, 0.235, xm, sd * MAIN.y, Z(MAIN.h), 10));
        for (var b = 0; b < 6; b++)
          gput("metal", wheelG(0.015, 0.24, xm + Math.cos(b * Math.PI / 3) * 0.17, sd * MAIN.y, Z(MAIN.h) + Math.sin(b * Math.PI / 3) * 0.17, 5));
      }
    }
    /* ---- the detail pass, airframe (P1, P2; places NOT measured): the
       M3 muzzles in the four nose ports, the seat headrest and the mirror
       under the hood, the canopy sill rails, a blade aerial on the spine
       and one under the belly, the wing-tip position lights (port red) and
       the tail light, the jet pipe's lip ring and dark liner */
    function addDetail() {
      var s;
      for (s = -1; s <= 1; s += 2) {
        put("metal", rod([X(0.82), s * 0.41, Z(0.30)], [X(0.62), s * 0.41, Z(0.30)], 0.022, 6));
        put("metal", rod([X(0.82), s * 0.43, Z(0.18)], [X(0.62), s * 0.43, Z(0.18)], 0.022, 6));
        put("ink", rod([X(2.0), s * 0.36, Z(0.80)], [X(4.10), s * 0.34, Z(0.80)], 0.016, 4));
        put(s > 0 ? "lampR" : "lampG", boxG(0.16, 0.05, 0.05, X(wLE(5.04) + 0.30), s * 5.04, Z(wH(5.04))));
      }
      put("ink", boxG(0.16, 0.40, 0.30, X(3.85), 0, Z(1.04)));
      put("metal", boxG(0.03, 0.10, 0.04, X(2.60), 0, Z(1.25)));
      put("skin", rod([X(5.30), 0, Z(1.10)], [X(5.55), 0, Z(1.36)], 0.012, 4));
      put("ink", boxG(0.26, 0.025, 0.18, X(5.0), 0, Z(-0.96)));
      put("glass", boxG(0.06, 0.05, 0.06, X(12.58), 0, Z(2.40)));
      var lr = new V.TorusGeometry(0.30, 0.02, 4, 24); lr.rotateY(Math.PI / 2); lr.scale(1, 1, 1.0);
      lr.translate(X(11.78), 0, Z(0.07)); put("metal", lr);
      var ln = new V.CylinderGeometry(0.26, 0.26, 0.40, 18, 1, true); ln.rotateZ(Math.PI / 2);
      ln.translate(X(11.60), 0, Z(0.07)); put("ink", ln);
    }

    /* ----------------------------------------------------------- paint --
       Bare metal (P1, P2): panel lines, the ailerons and flaps (D plan),
       the elevators and rudder, the speed-brake doors on the rear fuselage
       sides (D side), the gun ports beside the intake. */
    var _tex = {};
    function paintSheet() {
      var pt = new Painter(8417, PAINT), d, k, s, a;
      pt.coats(null);
      function T_(dd, yy) { return [cu(X(dd)), rTop(yy)]; }
      function B_(dd, yy) { return [cu(X(dd)), rBot(yy)]; }
      function S_(dd, hh, st) { return [cu(X(dd)), rSide(Z(hh), st)]; }
      for (d = 1.0; d < 11.6; d += 0.75) { pt.line([T_(d, -0.7), T_(d, 0.7)]); pt.line([B_(d, -0.7), B_(d, 0.7)]); }
      for (s = -1; s <= 1; s += 2) {
        for (var bnd = 0; bnd < 2; bnd++) {
          var P_ = bnd ? B_ : T_, hp = [], ap = [];
          for (a = 0.7; a <= 2.95; a += 0.25) hp.push(P_(wLE(a) + 0.78 * (wTE(a) - wLE(a)), s * a));
          for (a = 2.95; a <= 4.9; a += 0.25) ap.push(P_(wLE(a) + 0.76 * (wTE(a) - wLE(a)), s * a));
          pt.line(hp, pt.LINE, 1.4); pt.line(ap, pt.LINE, 1.4);
          [0.7, 2.95, 4.9].forEach(function (aa) {
            pt.line([P_(wLE(aa) + 0.77 * (wTE(aa) - wLE(aa)), s * aa), P_(wTE(aa), s * aa)], pt.LINE, 1.2);
          });
          var lp = [];
          for (a = 0.7; a <= 4.9; a += 0.4) lp.push(P_(wLE(a) + 0.15 * (wTE(a) - wLE(a)), s * a));
          pt.line(lp, pt.LINE, 0.9);
          var ep = [];
          for (a = 0.2; a <= 2.1; a += 0.3) ep.push(P_(tpLE(a) + 0.70, s * a));
          pt.line(ep, pt.LINE, 1.2);
        }
      }
      for (k = 0; k < 2; k++) {
        var st = k === 1;
        for (d = 1.0; d < 11.6; d += 0.75) pt.line([S_(d, -0.75, st), S_(d, 0.65, st)], "rgba(18,22,24,0.10)", 1);
        pt.line([S_(0.18, -0.38, st), S_(0.18, 0.38, st)], "rgba(18,22,24,0.30)", 1.2);       /* the lip joint */
        /* the speed-brake doors on the rear fuselage (D side, the lens 7.5-9.4 m) */
        pt.line([S_(7.6, -0.25, st), S_(9.4, -0.20, st), S_(9.4, -0.62, st), S_(7.6, -0.66, st), S_(7.6, -0.25, st)],
                "rgba(12,14,16,0.40)", 1.3);
        pt.line([S_(12.05, 1.0, st), S_(11.75, 0.62, st)], pt.LINE, 1.2);                     /* rudder hinge */
        pt.line([S_(12.10, 1.05, st), S_(12.65, 2.65, st)], pt.LINE, 1.2);
        /* the gun ports either side of the intake (P1) */
        pt.disc(S_(0.70, 0.30, st), 0.035, "rgba(10,12,14,0.85)");
        pt.disc(S_(0.70, 0.18, st), 0.035, "rgba(10,12,14,0.85)");
        /* the detail pass: longeron seams with fastener rows, access panels,
           gun-gas soot behind the ports, exhaust soot, rain streaks */
        [0.45, -0.05, -0.55].forEach(function (hh) {
          pt.line([S_(0.6, hh, st), S_(11.6, hh * 0.7, st)], "rgba(18,22,24,0.16)", 1);
          for (var q = 0; q < 120; q++) {
            var dq = 0.6 + q * 11.0 / 120, pq = S_(dq, hh * (1 - 0.3 * (dq - 0.6) / 11) + 0.05, st);
            pt.g.fillStyle = "rgba(18,22,24,0.22)"; pt.g.fillRect(pq[0], pq[1], 1, 1);
          }
        });
        [[1.3, 0.35, 0.8, 0.30], [5.3, 0.30, 0.9, 0.35], [9.6, 0.25, 0.8, 0.30]].forEach(function (r) {
          var a0 = S_(r[0], r[1], st), a1 = S_(r[0] + r[2], r[1] - r[3], st);
          pt.line([a0, [a1[0], a0[1]], a1, [a0[0], a1[1]], a0], "rgba(12,14,16,0.30)", 1);
        });
        var gg = pt.g.createLinearGradient(S_(0.75, 0, st)[0], 0, S_(2.2, 0, st)[0], 0);
        gg.addColorStop(0, "rgba(20,18,16,0.45)"); gg.addColorStop(1, "rgba(20,18,16,0)");
        pt.g.fillStyle = gg; pt.g.fillRect(S_(0.75, 0.40, st)[0], S_(0.75, 0.40, st)[1], S_(2.2, 0, st)[0] - S_(0.75, 0, st)[0], S_(0.75, 0.08, st)[1] - S_(0.75, 0.40, st)[1]);
        var eg = pt.g.createLinearGradient(S_(11.8, 0, st)[0], 0, S_(10.2, 0, st)[0], 0);
        eg.addColorStop(0, "rgba(30,26,22,0.45)"); eg.addColorStop(1, "rgba(30,26,22,0)");
        pt.g.fillStyle = eg; pt.g.fillRect(S_(11.8, 0.6, st)[0], S_(11.8, 0.6, st)[1], S_(10.2, 0, st)[0] - S_(11.8, 0, st)[0], S_(11.8, -0.5, st)[1] - S_(11.8, 0.6, st)[1]);
        for (var r2 = 0; r2 < 18; r2++) {
          var rp = S_(1 + pt.R() * 10, 0.6 - pt.R() * 0.9, st);
          var rg = pt.g.createLinearGradient(0, rp[1], 0, rp[1] + 16);
          rg.addColorStop(0, "rgba(40,40,36,0.12)"); rg.addColorStop(1, "rgba(40,40,36,0)");
          pt.g.fillStyle = rg; pt.g.fillRect(rp[0], rp[1], 1 + pt.R() * 2, 26);
        }
      }
      /* wing spars and fastener rows, the fuel caps, top and belly */
      for (s = -1; s <= 1; s += 2) {
        for (var bb = 0; bb < 2; bb++) {
          var PP = bb ? B_ : T_, sp1 = [], sp2 = [];
          for (a = 0.7; a <= 4.9; a += 0.35) { sp1.push(PP(wLE(a) + 0.30 * (wTE(a) - wLE(a)), s * a)); sp2.push(PP(wLE(a) + 0.62 * (wTE(a) - wLE(a)), s * a)); }
          pt.line(sp1, "rgba(18,22,24,0.14)", 1); pt.line(sp2, "rgba(18,22,24,0.14)", 1);
          for (a = 0; a < sp1.length; a++) { pt.g.fillStyle = "rgba(18,22,24,0.25)"; pt.g.fillRect(sp1[a][0] + 2, sp1[a][1], 1, 1); pt.g.fillRect(sp2[a][0] + 2, sp2[a][1], 1, 1); }
        }
        pt.g.fillStyle = "rgba(10,12,14,0.45)"; var fc = T_(wLE(2.0) + 1.0, s * 2.0); pt.g.fillRect(fc[0] - 2, fc[1] - 2, 5, 5);
      }
      return pt.texture();
    }

    function build(THREE, M, C) {
      begin(THREE, layout(-6.7, 6.7, 5.2, -1.8, 2.9));
      addFuselage();
      addCanopy();
      addWing();
      addTail();
      addGear();
      addDetail();
      /* the stance: D's ground line, 0.98 deg nose up about the mains */
      var hm = MAIN.h - MAIN.r, hn = NOSEW.h - NOSEW.r;
      pivot(Math.atan2(hn - hm, MAIN.d - NOSEW.d), X(MAIN.d), Z(hm));
      return finish(C, PAINT, sheetOnce(_tex, "f84", paintSheet));
    }
    return { build: build };
  })();

  /* ================================================================
     =================== AVRO SHACKLETON AEW.2 ======================
     gbr_e60_awacs: one of the twelve MR.2s converted in 1971 with the
     AN/APS-20 from the Gannet AEW.3 (js/eras.js; en.wikipedia "Avro
     Shackleton"). An MR.2 airframe: the long nose, no dorsal turret (all
     removed after delivery), twin tail wheels, the glazed tail lookout; the
     AEW radome under the forward fuselage.

     References (scratchpad q_gbmisc_ref/):
     S  "Avro Shackleton MR2 3-view silhouette.jpg" (951 x 1107 px, black
        silhouettes, no undercarriage drawn): front view (top), plan (nose
        up), side (nose left). Scanned for runs of ink (gbm_tools/scan.py):
          plan   span px 70-918 = 848 px for the published 36.58 m: 23.18
                 px/m; nose row 250 to the tail tip row 866 = 616 px = 26.57
                 m against the published 26.62 m, so one scale serves;
                 centreline px 498; d = (row - 250) / 23.18;
          side   nose px 228 to the tail tip 843 = 615 px: 23.18 px/m too;
                 d = (px - 228) / 23.18, h = (997 - row) / 23.18 (row 997
                 the middle of the deepest section);
          front  23.26 px/m off the span.
        Read off S: the fuselage's top and bottom lines (TOP, BOT: the low
        nose ahead of the cockpit step at 3.1-4.4 m, the deepest section
        3.3 m under the wing, the long tapering tail to the lookout), its
        plan half-widths (HW, 1.2 m), the wing (the centre section's
        leading edge straight across at 7.77 m out to 6.4 m, then swept to
        9.06 m at 17.5 m out; the trailing edge 12.25 m at the root, 12.08
        m at 6.9 m out, then forward to 10.79 m at 17.3 m; the tip round
        to 18.29 m), the chord plane 0.17 m over the fuselage middle, level
        to the inner nacelles and rising to 0.95 m at the tips (front); the
        nacelles 3.67 and 7.72 m out, 1.42 m wide (plan) and 1.55 m deep,
        their axes 0.43 / 0.30 m under the fuselage middle (front), the
        spinner tips at 4.55 / 5.15 m, the inner nacelles running aft past
        the trailing edge to 13.4 m, the outer ones ending under the wing
        at 10.7 m (plan); the tailplane 2.16 m chord from 20.9 m, 10.4 m
        across, 1.38 m up and level (front); the two oval fins at its tips
        5.15 m out (front 5.07, plan 5.2), 2.7 m in chord centred at 21.7
        m, from 0.09 m under the fuselage middle to 4.18 m over it (side;
        front: 2.4 m over the fuselage top).
     P1 "G-SKTN (WR963).jpg" (an AEW.2, starboard side, 1600 px, close to
        broadside, its radome removed): the cockpit glazing, the nose, the
        nacelles and their exhaust stubs, the twin main wheels under the
        inner nacelles, the tail wheels under the front of the fins, the
        astrodome, the beacon and masts on the spine, the glazed tail cone.
        Ratios measured at one station each: the tail wheels 0.64 m across
        (35 px against S's 2.07 m fuselage depth there, 113 px) and their
        bottom 0.73 m under the belly (40 px), at 20.9 m (0.21 of the fin
        chord aft of its leading edge); the main wheels 59 px across, 1.05
        m at the 55-60 px/m of the mid fuselage.
     P2 "AVRO AEW. Mk. 2 front view.jpg" (WL790, Pima, head on, 1600 px):
        the radome - 2.58 m across (170 px against the fuselage's 158 px =
        2.4 m), hanging 1.06 m under the belly (70 px) with its bottom 0.3 m
        off the ground (20 px); the main gear: 95 px from the inner nacelle's
        bottom to the wheels' at the prop plane's 57 px/m (the prop disc
        230 px = 4.06 m) = 1.67 m; the six-blade contra-rotating props.
     P3 "Avro 696 Shack WL795 8 Sq GC 310776 edited-2.jpg" (an 8 Sqn AEW.2
        in service, starboard rear): the radome under the forward fuselage,
        the overall dark grey, the tail wheels, the oval fins.
     P4 "Fairford 87 Takeoff Shackleton AEW.2.jpg": the radome from ahead
        between the inner nacelles, behind the nose and ahead of the main
        legs.
   Published (en.wikipedia "Avro Shackleton", whose specification is the
   MR.3's): length 26.62 m, span 36.58 m, height 5.33 m, wing area 132 m2
   (S: 125 m2 plus the part inside the fuselage), four Griffon 57A, de
   Havilland contra-rotating props 4.06 m (13 ft 4 in) across.

   Stance. S draws no gear. From P2, the main wheels' bottom 1.67 m under
   the inner nacelle's (S front: the nacelle bottom 1.20 m under the
   fuselage middle), so 2.87 m under it at 7.6 m (the main legs, P1); from
   P1 the tail wheels' bottom 0.73 m under S's belly at 20.9 m, 0.90 m
   under the middle. The ground line through both: 8.4 deg (atan 1.97 /
   13.3). Two checks: the radome's bottom then clears the ground by 0.30 m
   (P2: 0.3 m), and the top of P1's fuselage falls 6.1 deg toward the tail
   after a perspective correction (S's top line rises 1.3 deg aft: 7.4 deg),
   P3 about 9 deg. An earlier reading of P1's nacelle against its wheel
   (1.2 m, the nacelle's top hidden) gave 6.4 deg and a radome in the
   ground; P2's direct measure is taken. On that 8.4 deg ground line the
   fin top would stand 4.92 m up. The published 5.33 m is the MR.3's (a
   tricycle on the level); no reference gives an MR.2's height.
   As modelled - the game's tail-dragger convention (js/hero/ru_il10.js,
   us_skyraider.js), because the same model flies: the airframe sits LEVEL
   (the fuselage middle line horizontal), the main wheels at the height
   above (their bottom 2.87 m under the middle), and the tail-wheel leg
   lengthened from the 0.73 m P1 shows under the belly to 2.6 m, so the twin
   tail wheels reach the same ground. Level, the radome's bottom clears the
   ground by 0.10 m (0.30 m at the real attitude) and the fin top is 7.05 m
   up. The parked attitude of 8.4 deg nose up is NOT drawn.

   Recognition: four Griffons in long nacelles with six-blade contra-props,
   the straight wing with the swept-back outer leading edge, the deep
   fuselage with the cockpit step, the big radome bulging under the nose,
   the twin oval fins on the tailplane tips, the twin tail wheels, the
   pointed glazed tail.

   NOT CONFIRMED: the radome's length and plan (4.4 m from 3.2 m: P2 gives
   width and depth, P3/P4 only its place between nose and main legs); the
   main wheels' diameter (1.05 m, P1 within 0.15 m) and station (7.6 m,
   P1/P3 under the inner nacelle's front); the leg and strut layout (P2's
   is in shadow); the wing and fin thickness (NACA 23018 root, 23012 tip
   from Wikipedia; the fins 12 %); the exhaust stubs' extent; the astrodome
   (7.2 m), beacon (10.0 m) and masts (8.5 m) stations, from P1's
   perspective. The wire aerials are not drawn. Paint: Dark Sea Grey all
   over (P2, P3), black blades.
   Model space: x = 13.3 - d, z = h (the fuselage middle), level. */
  HeroShackleton = (function () {
    var NOSE = 13.3;
    function X(d) { return NOSE - d; }
    function Z(h) { return h; }
    var PAINT = { top: "#4c545a", low: "#4a5258", seam: 0.18, dome: 0x40474c, blade: 0x121314 };

    /* -------------------------------------------------------- fuselage --
       S side (TOP, BOT) and plan (HW); the last 0.9 m is the glazed
       lookout (P1) */
    var TOP = [[0, 0.40], [0.09, 0.62], [0.30, 0.72], [0.52, 0.78], [3.10, 0.80], [3.55, 1.10], [3.97, 1.40],
               [4.60, 1.50], [7.42, 1.55], [11.7, 1.64], [16.0, 1.77], [20.4, 1.90], [23.8, 1.98], [24.7, 1.94],
               [25.5, 1.81], [26.0, 1.70], [26.35, 1.56], [26.57, 1.47]];
    var BOT = [[0, -0.25], [0.09, -0.52], [0.52, -0.99], [0.95, -1.25], [1.81, -1.34], [3.10, -1.51], [4.83, -1.68],
               [6.56, -1.77], [9.15, -1.68], [11.7, -1.51], [14.3, -1.12], [16.0, -0.86], [18.6, -0.47], [20.4, -0.22],
               [23.4, 0.26], [24.7, 0.56], [25.5, 0.95], [26.0, 1.20], [26.35, 1.40], [26.57, 1.46]];
    var HW = [[0, 0.32], [0.09, 0.45], [0.30, 0.58], [0.86, 0.71], [1.73, 0.99], [2.59, 1.10], [3.45, 1.19],
              [4.75, 1.21], [14.2, 1.19], [16.8, 1.08], [18.6, 0.97], [20.3, 0.82], [22.0, 0.68], [23.7, 0.52],
              [24.6, 0.43], [25.45, 0.32], [26.0, 0.22], [26.35, 0.12], [26.57, 0.03]];
    var FST = [0, 0.09, 0.30, 0.52, 0.95, 1.4, 1.81, 2.4, 3.1, 3.35, 3.55, 3.75, 3.97, 4.3, 4.83, 5.6, 6.56, 7.42,
               9.15, 11.7, 13.0, 14.3, 15.2, 16.0, 17.3, 18.6, 19.5, 20.4, 21.9, 23.4, 24.2, 24.7, 25.1, 25.5, 25.66,
               26.0, 26.2, 26.35, 26.47, 26.57];
    var B = null, LOOK = 25.66;
    function addFuselage() {
      B = Body(rowsFrom(FST, HW, TOP, BOT, 0.85, 0.75, null), X, Z, true);
      B.loft(FST, 28, function (dm) { return dm > LOOK ? "glass" : "skin"; }, "skin", "glass");
    }
    /* the cockpit glazing on the step (P1): the windscreen panes, the side
       panes behind them, the astrodome on the spine (7.2 m) */
    function addGlass() {
      var sh = new Shell(), s;
      for (s = -1; s <= 1; s += 2) {
        B.paneTop(sh, 3.22, 3.80, s * 0.06, s * 0.52);
        B.paneTop(sh, 3.30, 3.88, s * 0.58, s * 0.88);
        B.paneSide(sh, 3.95, 4.55, 1.05, 1.38, s);
        B.paneSide(sh, 4.62, 5.15, 1.08, 1.40, s);
        B.paneSide(sh, 1.0, 1.55, 0.05, 0.40, s);                 /* the nose position's side window */
      }
      sh.emit();
      put("glass", egg(0.34, 0.34, 0.22, X(7.2), 0, Z(lin1(TOP, 7.2) - 0.02), 12, 6));
    }
    /* the spine fittings (P1): the beacon and the two short masts */
    function addSpine() {
      var hb = lin1(TOP, 10.0), hm = lin1(TOP, 8.5);
      put("metal", rod([X(10.0), 0, Z(hb - 0.05)], [X(10.0), 0, Z(hb + 0.42)], 0.09, 8, 0.07));
      put("dome", egg(0.10, 0.10, 0.12, X(10.0), 0, Z(hb + 0.50), 8, 6));
      [-0.16, 0.16].forEach(function (y) { put("metal", rod([X(8.5), y, Z(hm - 0.05)], [X(8.45), y, Z(hm + 0.42)], 0.035, 6)); });
    }

    /* --------------------------------------------------------- radome --
       The APS-20 radome (P2: 2.58 m across, 1.06 m under the belly; place
       P3, P4; length NOT CONFIRMED) */
    var RAD = [[3.20, 0.25, 0.12], [3.55, 0.85, 0.55], [4.20, 1.20, 0.92], [5.40, 1.29, 1.06], [6.60, 1.20, 0.95],
               [7.25, 0.85, 0.58], [7.60, 0.25, 0.12]];
    function addRadome() {
      var rings = RAD.map(function (q) {
        var hb = lin1(BOT, q[0]);
        return ringSE(X(q[0]), 0, q[1], Z(hb + 0.20), Z(hb - q[2]), Z(hb - q[2] * 0.42), 1.0, 0.62, 20);
      });
      var sh = new Shell();
      sh.loft(rings, function () { return "dome"; }, "dome", "dome");
      sh.emit();
    }

    /* ------------------------------------------------------------ wing -- */
    var WTIP = 18.29, WTEAM = 17.3;
    function wLE(a) { a = Math.abs(a); return a < 6.4 ? 7.77 : 7.77 + (a - 6.4) * 0.116; }
    function wTE(a) { a = Math.abs(a); return a < 6.9 ? 12.25 - a * 0.0246 : 12.08 - (a - 6.9) * 0.124; }
    function wH(a) { a = Math.abs(a); return 0.17 + Math.max(0, a - 3.67) * 0.0524; }
    function wTC(a) { return 0.18 - 0.06 * Math.min(1, Math.abs(a) / WTIP); }
    function wingRing(a, k) {
      var le = wLE(a), c = wTE(a) - le;
      if (k) { le += c * (1 - k) * 0.6; c *= k; }
      return foilRing(X(le), c, wTC(a), a, Z(wH(a)), "w", 0.012);
    }
    function addWing() {
      var ys = [0, 1.2, 2.6, 3.67, 5.0, 6.4, 6.9, 7.72, 9.5, 12.0, 14.5, 16.3, WTEAM], all = [], i;
      for (i = ys.length - 1; i > 0; i--) all.push(-ys[i]);
      all = all.concat(ys);
      foilLoft(all.map(function (a) { return wingRing(a); }), "skin", false, false);
      for (var s = -1; s <= 1; s += 2) {
        foilLoft([wingRing(s * WTEAM), wingRing(s * 17.9, 0.8), wingRing(s * WTIP, 0.42)], "team", false, true);
      }
    }

    /* -------------------------------------------------------- nacelles --
       S plan/front; the prop pair 0.40 m apart (P1: 20 px at 55 px/m), the
       front disc 1.0 m behind the spinner tip; the cowl behind the rear
       disc with the radiator under it (P1, P2); rows: the fraction of the
       nacelle's length, half-width, top and bottom about the hub */
    var NACF = [[0.0, 0.50, 0.50, -0.55], [0.05, 0.66, 0.70, -0.82], [0.20, 0.71, 0.75, -0.90], [0.40, 0.70, 0.75, -0.86],
                [0.60, 0.62, 0.72, -0.70], [0.80, 0.45, 0.66, -0.45], [1.0, 0.08, 0.55, 0.08]];
    var SPIN = [[0, 0.03], [0.30, 0.20], [0.65, 0.32], [1.00, 0.40], [1.45, 0.45]];
    var BLADE = { rr: [0.13, 0.30, 0.48, 0.70, 0.90, 1.0], ch: [0.20, 0.30, 0.33, 0.31, 0.26, 0.17] };
    var RP = 2.03;
    var NACS = [{ y: 3.67, hub: -0.43, tip: 4.55, end: 13.4 }, { y: 7.72, hub: -0.30, tip: 5.15, end: 10.7 }];
    function addNacelles() {
      NACS.forEach(function (n) {
        var fr = n.tip + 1.0, rr = fr + 0.40, Ln = n.end - rr - 0.05;
        for (var s = -1; s <= 1; s += 2) {
          var yc = s * n.y, zh = Z(n.hub);
          var rings = NACF.map(function (q) {
            var zt = zh + q[2], zb = zh + q[3];
            return ringSE(X(rr + 0.05 + q[0] * Ln), yc, q[1], zt, zb, clamp(zh - 0.10, zb + 0.03, zt - 0.03), 0.85, 0.75, 18);
          });
          var sh = new Shell();
          sh.loft(rings, null, "ink", "skin");
          sh.emit();
          pod(X(n.tip), yc, zh, SPIN, 14, false, true, "metal");
          addProp(BLADE, 3, RP, X(fr), yc, zh, s * 15, 1);
          addProp(BLADE, 3, RP, X(rr), yc, zh, s * 15 + 60, -1);
          /* the exhaust stubs along each side of the cowl (P1) */
          for (var k = -1; k <= 1; k += 2) {
            put("ink", boxG(1.10, 0.10, 0.16, X(rr + 1.25), yc + k * 0.66, zh + 0.22));
          }
        }
      });
    }

    /* ------------------------------------------------------------ tail --
       the tailplane (S): 2.16 m chord from 20.9 m, out to the fins, 1.38 m
       up, level; the fins (S side): 2.7 m chord centred at 21.7 m, from
       -0.09 to 4.18 m, a superellipse outline (n 2.6) */
    var FINY = 5.15, TPH = 1.38;
    function tpRing(a, k) {
      var le = 20.9, c = 2.16;
      if (k) { le += c * (1 - k) * 0.5; c *= k; }
      return foilRing(X(le), c, 0.11, a, Z(TPH), "w", 0);
    }
    function finHalf(h) { var v = clamp(Math.abs((h - 2.045) / 2.135), 0, 0.999); return 1.32 * Math.pow(1 - Math.pow(v, 2.6), 1 / 2.6); }
    function finRing(yc, h) {
      var c = 2 * finHalf(h);
      return foilRing(X(21.7 - c / 2), Math.max(c, 0.05), 0.12, Z(h), yc, "f", 0);
    }
    function addTail() {
      var ys = [-FINY, -3.5, -1.5, 0, 1.5, 3.5, FINY];
      foilLoft(ys.map(function (a) { return tpRing(a); }), "skin", true, true);
      for (var s = -1; s <= 1; s += 2) {
        var yc = s * FINY;
        foilLoft([-0.08, 0.05, 0.4, 0.9, 1.5, 2.05, 2.6, 3.2, 3.62].map(function (h) { return finRing(yc, h); }), "skin", true, false);
        foilLoft([3.62, 3.9, 4.1, 4.17].map(function (h) { return finRing(yc, h); }), "team", false, true);
      }
    }

    /* ------------------------------------------------------------ gear --
       Main: twin wheels 1.05 m across (P1) under each inner nacelle at 7.6 m,
       their bottom 2.87 m under the fuselage middle (P2, above), two oleo
       legs between them and a drag strut up to the nacelle; tail: twin
       wheels 0.64 m across at 20.9 m (P1), on a leg lengthened to the
       main wheels' ground (the game's tail-dragger convention, header):
       P1's real leg puts them 0.90 m under the middle, drawn 2.87 m. */
    var MAIN = { d: 7.6, y: 3.67, r: 0.525, hb: -2.87 }, TAIL = { d: 20.9, r: 0.32, hb: -2.87 };
    function addGear() {
      var s, x = X(MAIN.d), ha = MAIN.hb + MAIN.r, hn = -0.43 - 0.85;
      for (s = -1; s <= 1; s += 2) {
        var y = s * MAIN.y;
        wheel(MAIN.r, 0.34, x, y - 0.36, Z(ha));
        wheel(MAIN.r, 0.34, x, y + 0.36, Z(ha));
        gput("metal", rod([x, y - 0.40, Z(ha)], [x, y + 0.40, Z(ha)], 0.07, 8));
        gput("metal", rod([x, y - 0.12, Z(ha)], [x + 0.05, y - 0.12, Z(hn)], 0.10, 8));
        gput("metal", rod([x, y + 0.12, Z(ha)], [x + 0.05, y + 0.12, Z(hn)], 0.10, 8));
        gput("metal", rod([x, y, Z(ha + 0.55)], [X(MAIN.d + 1.3), y, Z(hn + 0.05)], 0.06, 6));
      }
      var xt = X(TAIL.d), ht = TAIL.hb + TAIL.r, hbt = lin1(BOT, TAIL.d - 0.3) + 0.05;
      for (s = -1; s <= 1; s += 2) wheel(TAIL.r, 0.18, xt, s * 0.19, Z(ht));
      gput("metal", rod([xt, -0.30, Z(ht)], [xt, 0.30, Z(ht)], 0.04, 6));
      gput("metal", rod([xt, 0, Z(ht)], [X(TAIL.d - 0.45), 0, Z(hbt)], 0.08, 8));
      gput("metal", rod([xt, 0, Z(ht + 0.6)], [X(TAIL.d - 1.3), 0, Z(lin1(BOT, TAIL.d - 1.3) + 0.05)], 0.045, 6));
    }

    /* ----------------------------------------------------------- paint --
       Dark Sea Grey all over (P2, P3): frames, the flaps and ailerons, the
       windows and the crew door (P1), the elevators and rudders. */
    var _tex = {};
    function paintSheet() {
      var pt = new Painter(6911, PAINT), d, k, s, a;
      pt.coats(null);
      var DARK = "rgba(8,10,12,0.85)", EDGE = "rgba(8,10,12,0.45)";
      function T_(dd, yy) { return [cu(X(dd)), rTop(yy)]; }
      function B_(dd, yy) { return [cu(X(dd)), rBot(yy)]; }
      function S_(dd, hh, st) { return [cu(X(dd)), rSide(Z(hh), st)]; }
      for (d = 2.0; d < 25.5; d += 1.2) { pt.line([T_(d, -1.1), T_(d, 1.1)]); pt.line([B_(d, -1.0), B_(d, 1.0)]); }
      for (s = -1; s <= 1; s += 2) {
        for (var bnd = 0; bnd < 2; bnd++) {
          var P_ = bnd ? B_ : T_, fl = [], al = [];
          for (a = 1.3; a <= 11.0; a += 0.5) fl.push(P_(wLE(a) + 0.76 * (wTE(a) - wLE(a)), s * a));
          for (a = 11.0; a <= 17.2; a += 0.5) al.push(P_(wLE(a) + 0.74 * (wTE(a) - wLE(a)), s * a));
          pt.line(fl, pt.LINE, 1.3); pt.line(al, pt.LINE, 1.3);
          var ep = [];
          for (a = 0.6; a <= 5.0; a += 0.4) ep.push(P_(22.35, s * a));
          pt.line(ep, pt.LINE, 1.2);
        }
      }
      for (k = 0; k < 2; k++) {
        var st = k === 1;
        for (d = 2.0; d < 25.5; d += 1.2) pt.line([S_(d, -1.5, st), S_(d, 1.6, st)], "rgba(16,18,20,0.12)", 1);
        [6.2, 8.6, 10.6, 13.4, 15.6, 18.4].forEach(function (dd) { pt.disc(S_(dd, 0.65, st), 0.14, DARK); });
        if (st) pt.line([S_(16.0, -0.45, st), S_(16.9, -0.45, st), S_(16.9, 1.05, st), S_(16.0, 1.05, st), S_(16.0, -0.45, st)], EDGE, 1.5);
      }
      return pt.texture();
    }

    function build(THREE, M, C) {
      begin(THREE, layout(-13.5, 13.5, 18.6, -3.0, 4.4));
      addFuselage();
      addGlass();
      addSpine();
      addRadome();
      addWing();
      addNacelles();
      addTail();
      addGear();
      /* level: the tail-dragger convention (header); no pivot */
      return finish(C, PAINT, sheetOnce(_tex, "shk", paintSheet));
    }
    return { build: build };
  })();

  /* ================================================================
     ================= HAWKER SIDDELEY NIMROD R.1 ===================
     gbr_e80_ewair: one of 51 Squadron's three SIGINT Nimrods (1974-2011).
     An MR.1 airframe without the MAD boom (Wikipedia: "the only significant
     visual differences being the absence of the MAD boom ... and the
     presence of radomes on the front of the external wing fuel tanks and on
     the tailcone"), with what the photographs of the R.1s show: the ESM
     pod on the fin top, pods on the wing tips, the refuelling probe over the
     cockpit (fitted 1982) and the small fins on the tailplane that came
     with it, and a row of blade aerials along the crown.

     Commons has no three-view of the Nimrod (searched "Nimrod 3-view",
     "silhouette", "line drawing", "three-view"), so the side is measured
     off a broadside photograph and the planform off the Comet 4C's (the
     Nimrod keeps the Comet 4C's wing and tailplane).

     References (scratchpad q_gbmisc_ref/):
     P1 "Nimrod R1 (10023582274).jpg" (XV249 at Cosford, port side, nearly
        broadside, 1600 px; the crown is level in the frame from 6 to 28 m,
        the main and nose wheels' bottoms within 5 px): nose tip px 67 to
        the tail cone px 1460 = the published 35.97 m: 38.73 px/m;
        d = (px - 67) / 38.73, h = (460 - row) / 38.73 (row 460 the
        ground). Read: the nose (the tip 1.58 m up, the lower lobe drawn
        forward into it, the top line rising to the windscreen at 2.25-3.07
        m), the crown 5.01 m up, the belly 0.72 m up, the double-bubble
        crease 2.63 m up (the Comet's upper lobe, 2.97 m across, then has
        its centre 3.52 m up and meets the lower lobe 1.19 m out); the
        intakes in the wing root 13.4-15.2 m, about 1.0 m across and 2.0 m
        up; the main wheels 0.95 m across at 19.25 / 20.35 m, the nose
        wheels 0.7 m at 3.8 m; the dorsal fillet leaving the crown at 28.2
        m, the fin leading edge 28.6 m (5.2 m up) - 31.5 m (6.45 m) - 32.7 m
        (7.75 m), the fin top 8.2 m up from 33.0 to 34.45 m, the trailing
        edge 34.75 m; the fin-top pod 31.9-34.9 m, 8.18-8.78 m up; the
        probe from the crown at 5.6 m to 0.83 m ahead of the nose, 4.78 m
        up; the blade aerials along the crown; the tail cone's end 4.0 m up,
        0.77 m across.
     D1 "De Havilland Comet 4C top-view silhouette.png" (302 x 343 px):
        span px 13-289 for the published 35.00 m (7.886 px/m across), nose
        row 17 to the tail row 292 for 35.97 m (7.645 px/m along); centre
        px 151. Read: the wing leading edge 14.26 m at 2.66 m out, swept at
        0.48 m a metre (25.6 deg) to the tip; the trailing edge 22.6 m
        inboard, 22.4 m from 4.2 to 9.4 m out, 23.05 m at the tip; the jet
        pipe fairings to 24.3 m between 1.5 and 4.2 m out; the pinion tanks
        13.25 m out, their noses at 16.9 m; the tailplane 13.95 m across,
        leading edge 32.6 m at 1.5 m out to 34.1 m at 7.0 m, trailing edge
        35.8 m; the fuselage tapering from 27.9 m.
     D2 "De Havilland Comet 4B three-view silhouette.png" (534 x 312 px):
        the front view - the main track (64 px at 7.82 px/m: 8.2 m), the
        tailplane's dihedral.
     P2 "Hawker-Siddeley Nimrod R1 XV249 (27975488495).jpg" (from the
        starboard bow): the double bubble, the cockpit glazing, the probe
        on its strut, the twin intakes of each wing root, the pinion tank
        on the leading edge, the four-wheel main bogies.
     P3 "XW664 HS801 Nimrod R1.jpg" (East Midlands): the port wing tip pod,
        the pinion tank with its radome nose, the fin-top pod, the crown
        aerials.
     P4 "Nimrod R1 XV249 RAF Museum Cosford - geograph.org.uk - 3737745.jpg"
        (from the port quarter): the tail cone with its cream radome and no
        MAD boom, the tailplane's dihedral and its two small fins, the
        twin jet pipes in each wing root, the fin-top pod wider than deep.
     P5 "Nimrod R1 1974 - 2011 (10023436914).jpg": the nose and windscreen
        close up.
   Published (en.wikipedia "Hawker Siddeley Nimrod R1"): length 35.97 m
   (118 ft 0 in), span 35.00 m (114 ft 10 in), height 9.07 m (29 ft 9 in);
   (the parent article) wing area 197 m2, four Spey turbofans.

   Stance: level (P1: the crown level, all wheels on the ground); the fin
   pod's top is 8.78 m up in P1 (-3 % on the published 9.07 m, taken as
   P1's perspective at the tail and not corrected).

   Recognition: the long Comet fuselage with the deep lower lobe and the
   radome nose under the cockpit, the four Speys buried in the wing roots
   with twin intakes and twin jet pipes each side, the pinion tanks on the
   leading edges, the swept fin with its dorsal fillet and the pod on top,
   the tail ending in a short cone (no MAD boom), the probe over the
   cockpit.

   NOT CONFIRMED: the rear fuselage's lower line (behind the wing in P1;
   from P4 and D1's taper); the wing's thickness (12 / 9 %) and dihedral
   (2.5 deg) and the root chord plane's height (1.85 m, between the
   intakes and the belly); the tailplane's dihedral (9 deg, P4/D2) and
   height (4.1 m); the pinion tank's size (5.0 m, 0.94 m across, from P1/P3);
   the wing-tip pod's size (2.6 m, 0.46 m across); the fin pod's width
   (1.6 m: P4 shows it wider than deep, its depth 0.6 m is P1's); the small
   tailplane fins' size and place (0.9 m chord, 1.3 m tall, 5.2 m out, P4);
   the aerials' heights; the main track (D2 is a Comet 4B). The hemp of
   the 1970s is not drawn: the grey of the photographs (2000s) is.
   Model space: x = 18.0 - d, z = h - 2.5 (h above the ground). */
  HeroNimrodR1 = (function () {
    var NOSE = 18.0, PROBE = 0.83;
    function X(d) { return NOSE - d; }
    function Z(h) { return h - 2.5; }
    var PAINT = { top: "#8e9599", low: "#8b9296", seam: 0.15, dome: 0xb8b39c, blade: 0x1b1d20 };

    /* -------------------------------------------------------- fuselage --
       The double bubble: rows d, the upper lobe's centre height zc and
       radius R, the lower lobe's bottom hb. The lobes meet at the crease,
       0.6 R under zc and 0.8 R out (P1: 0.89 m under, 1.19 m out). */
    var FUS = [[0.00, 1.57, 0.05, 1.50], [0.20, 1.60, 0.45, 1.22], [0.72, 1.80, 0.76, 0.98], [1.52, 2.39, 1.12, 0.82],
               [2.17, 2.62, 1.30, 0.74], [3.00, 2.92, 1.40, 0.72], [3.60, 3.13, 1.44, 0.72], [5.24, 3.405, 1.475, 0.72],
               [6.84, 3.525, 1.485, 0.72], [22.0, 3.525, 1.485, 0.72], [25.0, 3.53, 1.485, 1.10], [28.0, 3.55, 1.45, 1.90],
               [30.0, 3.62, 1.27, 2.55], [32.0, 3.75, 0.92, 3.05], [34.0, 3.88, 0.60, 3.40], [35.0, 3.95, 0.46, 3.62],
               [35.6, 4.00, 0.38, 3.72]];
    var FST = [0, 0.06, 0.2, 0.4, 0.72, 1.1, 1.52, 2.17, 3.0, 3.6, 4.4, 5.24, 6.84, 9, 12, 15, 18, 20, 22, 23.5, 25,
               26.5, 28, 29, 30, 31, 32, 33, 34, 35, 35.6];
    function sec(d) { var r = lin(FUS, d); r[2] = Math.min(r[2], r[0] - 0.6 * r[1] - 0.03); return r; }
    var KA = Math.asin(0.6);
    function ringAt(d) {
      var r = sec(d), zc = r[0], R = r[1], hb = r[2], zcr = zc - 0.6 * R, out = [], j;
      for (j = 0; j <= 20; j++) {
        var t = -KA + (Math.PI + 2 * KA) * j / 20;
        out.push([X(d), R * Math.cos(t), Z(zc + R * Math.sin(t))]);
      }
      for (j = 1; j <= 11; j++) {
        var p = Math.PI + Math.PI * j / 12;
        out.push([X(d), 0.8 * R * sgp(Math.cos(p), 0.62), Z(zcr + (zcr - hb) * sgp(Math.sin(p), 0.75))]);
      }
      return out;
    }
    function topH(d) { var r = sec(d); return r[0] + r[1]; }
    function addFuselage() {
      var sh = new Shell();
      sh.loft(FST.map(ringAt), null, "skin", "skin");
      sh.emit();
      /* the tail cone's radome (P4: cream) */
      put("dome", egg(0.40, 0.38, 0.38, X(35.6), 0, Z(4.0), 14, 8));
    }
    /* glazing on the upper lobe (P1, P5): the windscreen and the side
       panes, a grid on the arc 3 cm proud; th = the angle up from the side */
    function paneArc(sh, d0, d1, t0, t1, s) {
      var grid = [], i, j;
      for (i = 0; i <= 2; i++) {
        var d = d0 + (d1 - d0) * i / 2, r = sec(d), row = [];
        for (j = 0; j <= 2; j++) {
          var t = (t0 + (t1 - t0) * j / 2) * D2R;
          row.push([X(d), s * (r[1] + 0.03) * Math.cos(t), Z(r[0] + (r[1] + 0.03) * Math.sin(t))]);
        }
        grid.push(row);
      }
      var rm = sec((d0 + d1) / 2);
      sh.sheet(grid, "glass", [X((d0 + d1) / 2), 0, Z(rm[0])]);
    }
    function addGlass() {
      var sh = new Shell();
      for (var s = -1; s <= 1; s += 2) {
        paneArc(sh, 2.25, 2.75, 52, 80, s);
        paneArc(sh, 2.35, 3.05, 30, 50, s);
        paneArc(sh, 3.15, 3.75, 22, 42, s);
      }
      sh.emit();
    }
    /* the probe (P1, P2): a pipe along the centreline from the crown at
       5.6 m to 0.83 m ahead of the nose, 4.78 m up, a strut at 3.6 m */
    function addProbe() {
      var a = [X(5.6), 0, Z(topH(5.6) - 0.05)], b = [X(-PROBE), 0, Z(4.78)];
      put("metal", rod(a, b, 0.075, 8));
      put("metal", rod([X(-PROBE + 0.40), 0, Z(4.78)], b, 0.11, 8, 0.065));
      put("skin", rod([X(3.6), 0, Z(topH(3.6) - 0.05)], [X(3.5), 0, Z(4.80)], 0.07, 6, 0.05));
      put("skin", egg(0.70, 0.16, 0.12, X(5.4), 0, Z(topH(5.4)), 10, 6));
    }
    /* blade aerials along the crown (P1, P3), heights NOT CONFIRMED */
    function addAerials() {
      [5.45, 6.79, 11.3, 15.4, 17.5, 21.8, 24.6, 25.9, 27.4].forEach(function (d, i) {
        var ht = i % 3 === 1 ? 0.30 : 0.42, z = topH(d);
        put("skin", boxG(0.32, 0.05, ht, X(d), 0, Z(z + ht / 2 - 0.03)));
      });
    }

    /* ------------------------------------------------------------ wing -- */
    var WTIP = 17.5;
    function wLE(a) { a = Math.abs(a); return 14.26 + Math.max(0, a - 2.66) * 0.48; }
    function wTE(a) { return lin1([[0, 22.6], [4.2, 22.4], [9.4, 22.4], [17.5, 23.05]], Math.abs(a)); }
    function wH(a) { a = Math.abs(a); return 1.85 + Math.max(0, a - 1.5) * 0.0437; }
    function wTC(a) { return 0.12 - 0.03 * Math.min(1, Math.abs(a) / WTIP); }
    function wingRing(a, k) {
      var le = wLE(a), c = wTE(a) - le;
      if (k) { le += c * (1 - k) * 0.6; c *= k; }
      return foilRing(X(le), c, wTC(a), a, Z(wH(a)), "w", 0.010);
    }
    function addWing() {
      var ys = [0, 1.5, 2.66, 4.2, 6.0, 9.4, 12.0, 13.25, 14.6, 16.2, 16.9], all = [], i;
      for (i = ys.length - 1; i > 0; i--) all.push(-ys[i]);
      all = all.concat(ys);
      foilLoft(all.map(function (a) { return wingRing(a); }), "skin", false, false);
      for (var s = -1; s <= 1; s += 2) foilLoft([wingRing(s * 16.9), wingRing(s * WTIP)], "team", false, true);
    }
    /* the Speys: two pods a side in the root, the intake lips at 13.6 m
       (P1), the jet pipes out at 24.3 m (D1, P4) */
    function addEngines() {
      [2.0, 3.15].forEach(function (a) {
        for (var s = -1; s <= 1; s += 2) {
          var hc = 2.0, prof = [[0, 0.46], [0.15, 0.53], [0.6, 0.56], [3.0, 0.56], [7.5, 0.53], [10.0, 0.48], [10.7, 0.44]];
          pod(X(13.6), s * a, Z(hc), prof, 16, true, true, "skin");
          put("ink", egg(0.04, 0.42, 0.42, X(13.62), s * a, Z(hc), 12, 6));
          put("ink", egg(0.04, 0.38, 0.38, X(24.28), s * a, Z(hc), 12, 6));
        }
      });
    }
    /* the pinion tanks (D1: 13.25 m out, noses at 16.9 m) with the R.1's
       radome noses (Wikipedia, P3), and the wing-tip pods (P3, P4) */
    function addPods() {
      for (var s = -1; s <= 1; s += 2) {
        var yp = s * 13.25, hp = wH(13.25) - 0.10;
        pod(X(16.9), yp, Z(hp), [[0, 0.04], [0.25, 0.26], [0.6, 0.40], [0.9, 0.46]], 16, true, false, "dome");
        pod(X(17.8), yp, Z(hp), [[0, 0.46], [1.5, 0.47], [3.0, 0.40], [3.9, 0.22], [4.1, 0.05]], 16, false, true, "skin");
        var yt = s * (WTIP + 0.05), ht = wH(WTIP), d0 = wLE(WTIP) - 0.7;
        pod(X(d0), yt, Z(ht), [[0, 0.03], [0.2, 0.17], [0.5, 0.23]], 12, true, false, "dome");
        pod(X(d0 + 0.5), yt, Z(ht), [[0, 0.23], [1.6, 0.23], [2.1, 0.12], [2.2, 0.03]], 12, false, true, "skin");
      }
    }

    /* ------------------------------------------------------------ tail -- */
    function finLE(h) { return lin1([[4.6, 27.2], [5.0, 28.2], [5.16, 28.6], [6.45, 31.5], [7.75, 32.7], [8.2, 33.0]], h); }
    function finTE(h) { return lin1([[4.6, 34.75], [8.2, 34.45]], h); }
    function finRing(h) {
      var le = finLE(h), c = finTE(h) - le;
      return foilRing(X(le), c, Math.min(0.11, 0.42 / c), Z(h), 0, "f", 0);
    }
    function tpLE(a) { return 32.6 + Math.max(0, Math.abs(a) - 1.5) * 0.29; }
    function tpH(a) { return 4.1 + Math.abs(a) * 0.158; }
    function tpRing(a, k) {
      var le = tpLE(a), c = 35.8 - le;
      if (k) { le += c * (1 - k) * 0.5; c *= k; }
      return foilRing(X(le), c, 0.10, a, Z(tpH(a)), "w", 0);
    }
    var FP = [[0, 0.05], [0.10, 0.50], [0.30, 0.86], [0.60, 1.0], [0.85, 0.80], [1.0, 0.10]];
    function addTail() {
      foilLoft([4.6, 5.0, 5.4, 6.0, 6.8, 7.6].map(finRing), "skin", true, false);
      foilLoft([7.6, 7.9, 8.2].map(finRing), "team", false, false);
      /* the fin-top pod (P1, P3, P4) */
      var rings = FP.map(function (q) {
        var f = q[1];
        return ringSE(X(31.9 + q[0] * 3.0), 0, 0.80 * f, Z(8.48 + 0.30 * f), Z(8.48 - 0.30 * f), Z(8.48), 0.9, 0.9, 18);
      });
      var sh = new Shell();
      sh.loft(rings, null, "skin", "skin");
      sh.emit();
      var ys = [-6.98, -6.7, -5.0, -3.0, -1.5, 0, 1.5, 3.0, 5.0, 6.7, 6.98];
      foilLoft(ys.map(function (a) { return tpRing(a, Math.abs(a) > 6.9 ? 0.6 : 0); }), "skin", true, true);
      /* the small fins on the tailplane (P4) */
      for (var s = -1; s <= 1; s += 2) {
        var a = s * 5.2, h0 = tpH(a), le = tpLE(a) + 0.25;
        foilLoft([h0 - 0.35, h0, h0 + 0.95].map(function (h) { return foilRing(X(le), 0.9, 0.10, Z(h), a, "f", 0); }), "skin", true, true);
      }
    }

    /* ------------------------------------------------------------ gear --
       P1: main bogies of four wheels 0.95 m across, axles 19.25 / 20.35 m,
       4.1 m out (D2); nose: twin wheels 0.70 m across at 3.8 m. */
    function addGear() {
      var s, r = 0.475, hb = 1.96 - 0.42;
      for (s = -1; s <= 1; s += 2) {
        var y = s * 4.1;
        [19.25, 20.35].forEach(function (d) {
          wheel(r, 0.30, X(d), y - 0.33, Z(r));
          wheel(r, 0.30, X(d), y + 0.33, Z(r));
          gput("metal", rod([X(d), y - 0.45, Z(r)], [X(d), y + 0.45, Z(r)], 0.06, 6));
        });
        gput("metal", rod([X(19.1), y, Z(r)], [X(20.5), y, Z(r)], 0.09, 8));
        gput("metal", rod([X(19.8), y, Z(r)], [X(19.7), y, Z(hb)], 0.12, 8));
        gput("metal", rod([X(19.8), y, Z(r + 0.6)], [X(21.0), y * 0.97, Z(hb)], 0.05, 6));
      }
      var rn = 0.35, xn = X(3.8);
      for (s = -1; s <= 1; s += 2) wheel(rn, 0.24, xn, s * 0.24, Z(rn));
      gput("metal", rod([xn, -0.36, Z(rn)], [xn, 0.36, Z(rn)], 0.045, 6));
      gput("metal", rod([xn, 0, Z(rn)], [X(3.9), 0, Z(0.85)], 0.08, 8));
      gput("metal", rod([xn, 0, Z(rn + 0.2)], [X(4.6), 0, Z(0.80)], 0.035, 6));
    }

    /* ----------------------------------------------------------- paint --
       The grey of P1-P4: frames, the windows (P1: few, small and round),
       the crew door on the port side ahead of the wing, the radome joint,
       the bomb-bay lines under the belly, the flaps and ailerons. */
    var _tex = {};
    function paintSheet() {
      var pt = new Painter(5527, PAINT), d, k, s, a;
      pt.coats(null);
      var DARK = "rgba(8,10,12,0.80)", EDGE = "rgba(8,10,12,0.42)";
      function T_(dd, yy) { return [cu(X(dd)), rTop(yy)]; }
      function B_(dd, yy) { return [cu(X(dd)), rBot(yy)]; }
      function S_(dd, hh, st) { return [cu(X(dd)), rSide(Z(hh), st)]; }
      for (d = 3.0; d < 34.0; d += 1.3) { pt.line([T_(d, -1.3), T_(d, 1.3)]); }
      pt.line([B_(7.0, -0.55), B_(21.0, -0.55), B_(21.0, 0.55), B_(7.0, 0.55), B_(7.0, -0.55)], EDGE, 1.4);  /* the bay */
      pt.line([B_(7.0, 0), B_(21.0, 0)], EDGE, 1.2);
      for (s = -1; s <= 1; s += 2) {
        for (var bnd = 0; bnd < 2; bnd++) {
          var P_ = bnd ? B_ : T_, fl = [], al = [];
          for (a = 4.3; a <= 11.5; a += 0.5) fl.push(P_(wLE(a) + 0.78 * (wTE(a) - wLE(a)), s * a));
          for (a = 11.5; a <= 16.6; a += 0.5) al.push(P_(wLE(a) + 0.76 * (wTE(a) - wLE(a)), s * a));
          pt.line(fl, pt.LINE, 1.3); pt.line(al, pt.LINE, 1.3);
          var ep = [];
          for (a = 1.6; a <= 6.8; a += 0.4) ep.push(P_(tpLE(a) + 0.65 * (35.8 - tpLE(a)), s * a));
          pt.line(ep, pt.LINE, 1.2);
        }
      }
      for (k = 0; k < 2; k++) {
        var st = k === 1;
        for (d = 3.0; d < 34.0; d += 1.3) pt.line([S_(d, 0.8, st), S_(d, 4.9, st)], "rgba(16,18,20,0.09)", 1);
        pt.line([S_(0.0, 2.63, st), S_(30.0, 2.63, st)], "rgba(16,18,20,0.22)", 1.2);       /* the crease */
        pt.line([S_(1.3, 0.9, st), S_(1.3, 2.4, st)], "rgba(16,18,20,0.30)", 1.2);          /* radome joint */
        [7.0, 10.3, 12.4, 16.6, 19.0, 25.6].forEach(function (dd) { pt.disc(S_(dd, 3.95, st), 0.12, DARK); });
        if (!st) pt.line([S_(4.4, 2.75, st), S_(5.2, 2.75, st), S_(5.2, 4.45, st), S_(4.4, 4.45, st), S_(4.4, 2.75, st)], EDGE, 1.5);
        pt.line([S_(34.0, 5.0, st), S_(33.85, 7.6, st)], pt.LINE, 1.2);                      /* rudder hinge */
      }
      return pt.texture();
    }

    function build(THREE, M, C) {
      begin(THREE, layout(-18.4, 19.3, 18.0, -2.6, 6.4));
      addFuselage();
      addGlass();
      addProbe();
      addAerials();
      addWing();
      addEngines();
      addPods();
      addTail();
      addGear();
      return finish(C, PAINT, sheetOnce(_tex, "nim", paintSheet));
    }
    return { build: build };
  })();

  /* ================================================================
     ==================== BLACKBURN BEVERLEY C.1 ====================
     gbr_e50_airlift: the RAF's heavy tactical freighter, 1956-1967.

     References (scratchpad q_gbmisc_ref/):
     D1 "Production Beverley - GAW drawing.jpg" (General Aircraft's general
        arrangement, 4960 x 7015 px, fetched at 2400 px): front, plan (nose
        down) and side (nose left) with the undercarriage, lettered "span
        162'-0", length 99'-2", height 37'-6"". Read on a pixel grid:
          side   nose px 625 to the tail cone px 1879 = 1254 px; scaled to
                 the published 30.30 m (D1's own 99'2" = 30.23 m differs
                 0.2 %): 41.39 px/m; d = (px - 625) / 41.39, h = (2851 -
                 row) / 41.39 (row 2851 the bottom of the wheels);
          plan   span px 204-2258 = 2054 px for 49.38 m (41.6 px/m), nose
                 row 2368 to the tail row 1119 = 1249 px (30.17 m at that
                 scale): 41.4 px/m both ways; centreline px 1216;
          front  41.25 px/m off the span.
        Read: the bluff nose (the tip 4.67 m up, its upper line rising to
        the flight-deck roof 6.45 m up at 2.8 m, its lower line falling to
        the hold floor), the hold's belly 0.82-1.01 m up from 3.4 to 17.1
        m, then sweeping up past the clamshell doors to the boom's underside
        4.64 m up at 22.5 m and 4.93 m at 29.6 m; the top line 6.38-6.6 m
        to 19.5 m and 6.9 m at the fin; the plan's half-widths (1.9 m the
        hold, 1.88-1.55 m the boom, D1 front 2.0 m); the wing's leading edge
        8.04 m at the root to 10.17 m at 24.3 m out, its trailing edge 15.56
        m to 13.36 m, the round tip to 24.69 m; the wing's top 6.25 m up and
        nearly level, the root 1.28 m thick (front view), the tip 0.48 m
        thick and its middle 6.2 m up; the nacelles 4.8 and 9.9 m out, 1.7
        m across, the spinner tips at 5.34 / 5.63 m and the prop planes at
        5.89 / 6.14 m, the props 4.9-5.0 m across, the hubs about 4.9 m up;
        the tailplane from the boom's top (6.9 m) at 8.5 deg of dihedral
        (front view) to the fins 6.75 m out (plan 6.6, front 6.88), its
        chord 25.8-30.05 m at the root, 26.4-29.5 m at the tip; the fins
        from 26.48 to 29.6 m, 4.74 to 10.58 m up, the rudder line; the
        nose wheels 1.05 m across at 2.92 m, the main wheels 1.14 m across
        on two axles at 10.97 / 12.18 m, two abreast 5.0 and 5.6 m out
        (front), under the inner nacelles on a faired leg, braced to the
        fuselage side 1.45 m up (front).
     D2 "Blackburn Beverley C1 3-view silhouette.jpg" (946 x 1238 px): a
        second, independent three-view: length 513 px for 30.23 m (16.97
        px/m), the fin top 179 px = 10.55 m over the wheels' bottom.
     P1 "Blackburn Beverley C.1 XB289 47.V Blackpool 10.06.57 edited-2.jpg"
        (in flight, 1957, the fixed gear): the Transport Command finish -
        white over the cabin and boom, bare metal below and on the wings,
        black anti-glare panel; the tandem twin main wheels, the twin nose
        wheels, the leg fairings, the boom windows.
     P2 "XH124 Blackburn B-101 Beverley C1 RAF Hendon Museum (55241598596)
        .jpg" and P3 "Blackburn Beverley - geograph.org.uk - 5056085.jpg"
        (XB259, Fort Paull): the box fuselage and the boom, the fins and
        tailplane, the Centaurus cowls, the four-blade props, the round
        windows. P4 "Blackburn Beverley C.1 'XB261' (50321224012).jpg": the
        flight deck's glazing - three panes ahead, two a side, eyebrows.
   Published (en.wikipedia "Blackburn Beverley"): length 30.30 m (99 ft 5
   in), span 49.38 m (162 ft), height 11.81 m (38 ft 9 in), wing area 271
   m2 (D1: 262 m2 outside the fuselage), four Bristol Centaurus 173,
   de Havilland reversible-pitch props.

   The height. D1's side draws the fin top 10.58 m over the wheels, D2
   10.55 m, D1's front 11.0 m (its own label says 11.43 m, Wikipedia 11.81
   m). The two side views agree with each other and with D1's front in the
   wing (its top 6.25 / 6.26 m up), and at the nose station P2's ratio of
   the belly's height over the ground to the fuselage's depth (67 / 230 px
   = 0.29) matches D1's (57 / 210 = 0.27); P2's fin height to chord (288 /
   150 px = 1.92) matches D1's (1.88). So the drawn side is followed: the
   fin top is 10.6 m up, 10 % under the published figure, which no
   reference consulted bears out.

   Stance: level on its fixed gear (D1 side, P2).

   Recognition: the huge slab-sided hold with the bluff nose and the flight
   deck high on it, the boom running back from the wing to the twin
   rectangular fins on a dihedral tailplane, the long straight tapered wing
   on top, four big radial cowls with four-blade props, the fixed gear on
   faired legs with tandem twin wheels, the clamshell doors under the boom.

   NOT CONFIRMED: the nacelles' rear lines under the wing (D1 dashed); the
   gear's leg fairing chord (1.0 m at the top to 0.55 m, D1 side) and the
   brace's exact line; the cabin windows' count (D1 side and P1 differ by
   one); the paint's demarcation height (P1, 4.9 m up).
   Model space: x = 15.15 - d, z = h - 4.0 (h above the ground). */
  HeroBeverley = (function () {
    var NOSE = 15.15;
    function X(d) { return NOSE - d; }
    function Z(h) { return h - 4.0; }
    var PAINT = { top: "#d6d9d8", low: "#a3a9ad", wing: "#a7adb1", seam: 0.15, gloss: true, dome: 0x2a2e31, blade: 0x1b1d20 };

    /* -------------------------------------------------------- fuselage --
       D1 side (TOP, BOT) and plan (HW); a boxy section (P2, P3) */
    var TOP = [[0, 4.72], [0.19, 5.05], [0.60, 5.40], [1.40, 5.85], [2.20, 6.26], [2.80, 6.45], [5.0, 6.55], [9.47, 6.40],
               [14.0, 6.45], [19.5, 6.60], [25.6, 6.90], [29.0, 6.95], [29.6, 6.92], [30.0, 6.80], [30.3, 6.55]];
    var BOT = [[0, 4.60], [0.19, 3.33], [0.60, 2.51], [1.40, 1.91], [2.42, 1.52], [3.43, 1.21], [7.44, 1.01], [13.5, 0.82],
               [17.1, 1.01], [17.8, 1.40], [18.5, 1.91], [19.5, 2.92], [20.5, 3.94], [21.55, 4.45], [22.5, 4.64], [25.6, 4.83],
               [29.6, 4.93], [30.0, 5.60], [30.3, 6.45]];
    var HW = [[0, 0.06], [0.19, 0.55], [0.80, 0.85], [2.2, 1.35], [3.6, 1.64], [5.0, 1.76], [7.9, 1.90], [17.5, 1.92],
              [19.5, 1.90], [22.1, 1.88], [25.0, 1.69], [25.7, 1.55], [28.0, 1.30], [29.6, 1.00], [30.0, 0.60], [30.3, 0.08]];
    var FST = [0, 0.06, 0.19, 0.4, 0.6, 1.0, 1.4, 1.9, 2.42, 2.8, 3.43, 4.2, 5.0, 6.2, 7.9, 9.5, 11.5, 13.5, 15.5, 17.1,
               17.8, 18.5, 19.0, 19.5, 20.0, 20.5, 21.0, 21.55, 22.5, 24.0, 25.6, 27.0, 28.5, 29.6, 30.0, 30.3];
    var B = null;
    function addFuselage() {
      B = Body(rowsFrom(FST, HW, TOP, BOT, function (d) { return d < 1.0 ? 0.9 : 0.55; },
                        function (d) { return d < 1.5 ? 0.8 : 0.5; }, null), X, Z, true);
      B.loft(FST, 32, null, "skin", "skin");
    }
    /* the flight deck's glazing (P4, D1): three panes ahead and the
       eyebrows, two side panes a side */
    function addGlass() {
      var sh = new Shell(), s;
      B.paneTop(sh, 1.55, 2.05, -0.30, 0.30);
      for (s = -1; s <= 1; s += 2) {
        B.paneTop(sh, 1.60, 2.15, s * 0.36, s * 0.95);
        B.paneTop(sh, 2.25, 2.60, s * 0.30, s * 0.85);
        B.paneSide(sh, 2.05, 2.70, 5.65, 6.10, s);
        B.paneSide(sh, 2.80, 3.30, 5.75, 6.20, s);
      }
      sh.emit();
    }

    /* ------------------------------------------------------------ wing -- */
    var WTIP = 24.69, WTEAM = 23.9;
    function wLE(a) { return 8.04 + (Math.abs(a) - 2.0) * 0.0955; }
    function wTE(a) { return 15.56 - (Math.abs(a) - 2.0) * 0.0987; }
    function wH(a) { return 5.61 + Math.abs(a) * 0.0245; }
    function wTC(a) { return 0.17 - 0.02 * Math.min(1, Math.abs(a) / WTIP); }
    function wingRing(a, k) {
      var le = wLE(a), c = wTE(a) - le;
      if (k) { le += c * (1 - k) * 0.55; c *= k; }
      return foilRing(X(le), c, wTC(a), a, Z(wH(a)), "w", 0.015);
    }
    function wingLow(a, d) {
      var le = wLE(a), c = wTE(a) - le, u = clamp((d - le) / c, 0, 1);
      return wH(a) + 0.015 * 4 * u * (1 - u) * c - wTC(a) * c * foilT(u);
    }
    function addWing() {
      var ys = [0, 2.0, 4.8, 7.3, 9.9, 13.0, 16.5, 20.0, WTEAM], all = [], i;
      for (i = ys.length - 1; i > 0; i--) all.push(-ys[i]);
      all = all.concat(ys);
      foilLoft(all.map(function (a) { return wingRing(a); }), "skin", false, false);
      for (var s = -1; s <= 1; s += 2) foilLoft([wingRing(s * WTEAM), wingRing(s * 24.4, 0.85), wingRing(s * WTIP, 0.45)], "team", false, true);
    }

    /* -------------------------------------------------------- nacelles --
       D1: Centaurus cowls 1.7 m across from behind the prop to the
       leading edge, tapering under the wing to 11.0 m; the hub 4.9 m up;
       four blades, 4.88 m across (D1: 4.9-5.0 m) */
    var NAC = [[0.0, 0.62, 0.62, -0.62], [0.20, 0.82, 0.84, -0.84], [0.80, 0.85, 0.86, -0.86], [1.80, 0.82, 0.86, -0.84],
               [2.80, 0.72, 0.90, -0.74], [4.0, 0.55, 0.95, -0.55], [5.0, 0.30, 0.95, -0.20]];
    var SPIN = [[0, 0.03], [0.18, 0.22], [0.38, 0.34], [0.55, 0.40]];
    var BLADE = { rr: [0.15, 0.30, 0.48, 0.70, 0.90, 1.0], ch: [0.30, 0.40, 0.42, 0.40, 0.34, 0.24] };
    var NACS = [{ y: 4.8, tip: 5.34, dp: 5.89 }, { y: 9.9, tip: 5.63, dp: 6.14 }];
    var HUB = 4.9, RP = 2.44;
    function addNacelles() {
      NACS.forEach(function (n) {
        for (var s = -1; s <= 1; s += 2) {
          var yc = s * n.y, zh = Z(HUB);
          var rings = NAC.map(function (q) {
            var zt = zh + q[2], zb = zh + q[3];
            return ringSE(X(n.dp + 0.05 + q[0]), yc, q[1], zt, zb, clamp(zh, zb + 0.03, zt - 0.03), 0.95, 0.85, 18);
          });
          var sh = new Shell();
          sh.loft(rings, null, "ink", "skin");
          sh.emit();
          pod(X(n.tip), yc, zh, SPIN, 14, false, true, "metal");
          addProp(BLADE, 4, RP, X(n.dp), yc, zh, s * 20, 1);
        }
      });
    }

    /* ------------------------------------------------------------ tail -- */
    var FINY = 6.75, TP0 = 6.9, TPD = Math.tan(8.5 * D2R);
    function tpLE(a) { return 25.8 + Math.abs(a) / FINY * 0.6; }
    function tpTE(a) { return 30.05 - Math.abs(a) / FINY * 0.55; }
    function tpH(a) { return TP0 + Math.abs(a) * TPD; }
    function tpRing(a) { var le = tpLE(a); return foilRing(X(le), tpTE(a) - le, 0.12, a, Z(tpH(a)), "w", 0); }
    /* the fins: rectangles with rounded corners (D1, P2), 26.48-29.6 m,
       4.74-10.58 m up */
    function finChord(h) {
      var r = 0.55, lo = 4.74, hi = 10.58, c0 = 26.48, c1 = 29.6, k = 0;
      if (h > hi - r) k = r - Math.sqrt(Math.max(0, r * r - Math.pow(h - (hi - r), 2)));
      if (h < lo + r) k = r - Math.sqrt(Math.max(0, r * r - Math.pow(lo + r - h, 2)));
      return [c0 + k, c1 - k];
    }
    function finRing(yc, h) { var c = finChord(h); return foilRing(X(c[0]), Math.max(0.05, c[1] - c[0]), 0.10, Z(h), yc, "f", 0); }
    function addTail() {
      var ys = [-FINY, -4.5, -2.0, 0, 2.0, 4.5, FINY];
      foilLoft(ys.map(tpRing), "skin", true, true);
      for (var s = -1; s <= 1; s += 2) {
        var yc = s * FINY;
        foilLoft([4.74, 4.80, 4.95, 5.3, 6.5, 8.0, 9.4, 9.9].map(function (h) { return finRing(yc, h); }), "skin", true, false);
        foilLoft([9.9, 10.2, 10.45, 10.58].map(function (h) { return finRing(yc, h); }), "team", false, true);
      }
    }

    /* ------------------------------------------------------------ gear --
       Fixed (D1, P1): the main units under the inner nacelles - a faired
       leg 5.3 m out, two axles at 10.97 / 12.18 m with wheels 5.0 and 5.6 m
       out, 1.14 m across; a brace from the fuselage side 1.45 m up; the
       twin nose wheels 1.05 m across at 2.92 m. */
    function addGear() {
      var s, r = 0.57, rn = 0.525;
      for (s = -1; s <= 1; s += 2) {
        var yl = s * 5.3, top = wingLow(5.3, 11.6) - 0.6;
        [10.97, 12.18].forEach(function (d) {
          wheel(r, 0.32, X(d), s * 5.0, Z(r));
          wheel(r, 0.32, X(d), s * 5.6, Z(r));
          gput("metal", rod([X(d), s * 4.8, Z(r)], [X(d), s * 5.8, Z(r)], 0.07, 6));
        });
        gput("metal", rod([X(10.8), yl, Z(r)], [X(12.35), yl, Z(r)], 0.10, 8));
        /* the leg fairing, 1.0 m chord at the top tapering to 0.55 m */
        var rings = [[r + 0.25, 0.55], [1.6, 0.68], [top - 0.4, 0.92], [top + 0.3, 1.0]].map(function (q) {
          return foilRing(X(11.3 + q[1] / 2), q[1], 0.30, Z(q[0]), yl, "f", 0);
        });
        var sh = new Shell();
        sh.loft(rings, function () { return "gskin"; }, "gskin", null);
        sh.emit(G);
        gput("metal", rod([X(11.55), s * 1.85, Z(1.45)], [X(11.55), yl, Z(1.45)], 0.09, 8));
      }
      var xn = X(2.92);
      for (s = -1; s <= 1; s += 2) wheel(rn, 0.30, xn, s * 0.30, Z(rn));
      gput("metal", rod([xn, -0.45, Z(rn)], [xn, 0.45, Z(rn)], 0.05, 6));
      gput("metal", rod([xn, 0, Z(rn)], [X(3.05), 0, Z(1.45)], 0.10, 8));
    }

    /* ----------------------------------------------------------- paint --
       Transport Command (P1): white over the hold and boom down to 4.9 m,
       bare metal below and on the wings and tail, a black anti-glare panel
       ahead of the flight deck; the round windows of the hold and the boom,
       the doors, the clamshells. */
    var _tex = {};
    function paintSheet() {
      var pt = new Painter(4423, PAINT), g = pt.g, d, k, s, a;
      pt.coats(Z(4.9));
      /* the wings and tail from above: bare metal */
      g.fillStyle = PAINT.wing;
      g.fillRect(0, 0, L.TW, rTop(2.0)); g.fillRect(0, rTop(-2.0), L.TW, L.TOPH - rTop(-2.0));
      g.fillRect(0, 0, cu(X(25.6)), L.TOPH);
      g.fillStyle = "rgba(14,16,18,0.92)";                                  /* anti-glare (P1) */
      g.fillRect(cu(X(1.55)), rTop(1.2), cu(X(0.3)) - cu(X(1.55)), rTop(-1.2) - rTop(1.2));
      var DARK = "rgba(10,12,14,0.85)", EDGE = "rgba(10,12,14,0.45)";
      function T_(dd, yy) { return [cu(X(dd)), rTop(yy)]; }
      function B_(dd, yy) { return [cu(X(dd)), rBot(yy)]; }
      function S_(dd, hh, st) { return [cu(X(dd)), rSide(Z(hh), st)]; }
      for (d = 3.0; d < 29.5; d += 1.4) { pt.line([T_(d, -1.8), T_(d, 1.8)]); pt.line([B_(d, -1.8), B_(d, 1.8)]); }
      pt.line([B_(17.4, -1.7), B_(22.4, -1.6), B_(22.4, 1.6), B_(17.4, 1.7)], "rgba(10,12,14,0.55)", 1.6);  /* clamshells */
      pt.line([B_(17.6, 0), B_(22.4, 0)], "rgba(10,12,14,0.55)", 1.4);
      for (s = -1; s <= 1; s += 2) {
        for (var bnd = 0; bnd < 2; bnd++) {
          var P_ = bnd ? B_ : T_, fl = [], al = [];
          for (a = 2.2; a <= 15.5; a += 0.6) fl.push(P_(wLE(a) + 0.74 * (wTE(a) - wLE(a)), s * a));
          for (a = 15.5; a <= 23.8; a += 0.6) al.push(P_(wLE(a) + 0.72 * (wTE(a) - wLE(a)), s * a));
          pt.line(fl, pt.LINE, 1.3); pt.line(al, pt.LINE, 1.3);
          var ep = [];
          for (a = 0.4; a <= 6.6; a += 0.5) ep.push(P_(tpLE(a) + 0.66 * (tpTE(a) - tpLE(a)), s * a));
          pt.line(ep, pt.LINE, 1.2);
        }
      }
      for (k = 0; k < 2; k++) {
        var st = k === 1;
        g.fillStyle = "rgba(14,16,18,0.92)";
        var p0 = S_(1.0, 6.0, st), p1 = S_(0.25, 5.0, st);
        g.fillRect(p0[0], p0[1], p1[0] - p0[0], p1[1] - p0[1]);
        for (d = 3.0; d < 29.5; d += 1.4) pt.line([S_(d, 1.0, st), S_(d, 6.5, st)], "rgba(16,18,20,0.10)", 1);
        [3.4, 5.4, 6.6, 7.8, 8.9, 10.1, 11.2, 12.4, 13.5, 14.6].forEach(function (dd) { pt.disc(S_(dd, 2.4, st), 0.13, DARK); });
        [11.6, 12.85, 14.1, 15.35, 16.6, 17.85, 19.1, 20.35, 21.6, 22.85].forEach(function (dd) { pt.disc(S_(dd, 5.6, st), 0.12, DARK); });
        pt.line([S_(17.4, 1.0, st), S_(17.4, 4.9, st)], EDGE, 1.6);                                  /* clamshell hinge line */
        pt.line([S_(3.3, 1.2, st), S_(4.1, 1.2, st), S_(4.1, 3.3, st), S_(3.3, 3.3, st), S_(3.3, 1.2, st)], EDGE, 1.5);
        pt.line([S_(15.5, 1.1, st), S_(16.4, 1.1, st), S_(16.4, 3.0, st), S_(15.5, 3.0, st), S_(15.5, 1.1, st)], EDGE, 1.5);
        pt.line([S_(28.6, 5.0, st), S_(28.6, 10.3, st)], pt.LINE, 1.2);                             /* rudder hinge */
      }
      return pt.texture();
    }

    function build(THREE, M, C) {
      begin(THREE, layout(-15.4, 15.4, 25.0, -4.2, 6.8));
      addFuselage();
      addGlass();
      addWing();
      addNacelles();
      addTail();
      addGear();
      return finish(C, PAINT, sheetOnce(_tex, "bev", paintSheet));
    }
    return { build: build };
  })();

})();

/* len: the measured X extent of each model (dump.js) */
UNIT_MODELS["deu_e50_cas"] = { len: 13.27, build: function (THREE, M, C) { return HeroF84F.build(THREE, M, C); } };
UNIT_MODELS["gbr_e60_awacs"] = { len: 26.57, build: function (THREE, M, C) { return HeroShackleton.build(THREE, M, C); } };
UNIT_MODELS["gbr_e80_ewair"] = { len: 36.83, build: function (THREE, M, C) { return HeroNimrodR1.build(THREE, M, C); } };
UNIT_MODELS["gbr_e50_airlift"] = { len: 30.3, build: function (THREE, M, C) { return HeroBeverley.build(THREE, M, C); } };
