/* ============ early_jets.js - HERO models: three 1950s jets =====================
   Three rows, one builder (module) each:
     fra_e50_fighter  "Super Mystere B.2"  Dassault, Atar 101G   1958  HeroSuperMystere
     fra_e50_cas      "MD.450 Ouragan"     Dassault, Nene 104B   1952  HeroOuragan
     gbr_e50_cas      "Venom FB.4"         de Havilland, Ghost   1955  HeroVenom
   None of the three had a model before this file (grep -i -E
   "mystere|ouragan|venom|vampire" js/hero: nothing) and none has a row in
   air_specs.js. In the game the fighter was drawn as its same-role peer
   fighter_n (an F-16C) and both CAS rows as bomber_n (16.3 x 17.5 m). The
   kit is gb_hunter.js's (from gb_lightning.js / ru_su24.js); the layout of
   each module follows gb_hunter.js. No national markings, codes or fin
   flashes anywhere; the team colour (C.team exactly) on small strips.

   Model space (all three): +X nose, +Y port, +Z up, metres. Each airframe
   is built in its drawing's own datum and then pitched, as one piece, about
   its main-wheel contact into the parked attitude the drawn gear and the
   photographs give (see each module's STANCE note), so every tyre touches
   the ground. Only the stance pitch is applied: nothing is scaled to a
   height.

   Photographs were measured only with ratios whose two ends lie at ONE
   station of the aeroplane (both ends at the same distance from the
   camera), so yaw and range drop out. Longitudinal ratios off 3/4 photos
   were never used.

   Materials per module: skin (a painted canvas projected top / port /
   starboard / belly), dark, metal, glass, team; in "gear": metal, tyres,
   doors. Node: "gear" (landing gear and its doors; hidden in flight).
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

/* ------------------------------------------------------------------------
   Shared kit (gb_hunter.js's, unchanged in behaviour). Each module calls
   EarlyJetKit(THREE) once per build and uses what it returns.            */
var EarlyJetKit = function (V) {
  "use strict";
  var PI = Math.PI;
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); }
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-4;
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  function merge(list) {
    var pos = [], nor = [], uvs = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3 * 2; j++) uvs.push(u ? u[j] : 0);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uvs, 2));
    return out;
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0], fc = [0, 0, 0];
      for (j = 0; j < f.length; j++) { fc[0] += f[j][0] / f.length; fc[1] += f[j][1] / f.length; fc[2] += f[j][2] / f.length; }
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var o = (fc[0] - c[0]) * nx + (fc[1] - c[1]) * ny + (fc[2] - c[2]) * nz;
        if (o >= 0) out.push(a, b, d); else out.push(a, d, b);
      }
    }
    return tris(out);
  }
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  /* an aerofoil section from leading to trailing edge, thickness t along nrm */
  function foil(le, te, t, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }
  function blk(le, te, f0, f1, h, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(f0, h), p(f1, h), p(f1, -h), p(f0, -h)];
  }
  function ls(x, yc, zc, w, h, e) { return { x: x, yc: yc, zc: zc, w: w, h: h, e: e || 1 }; }
  function sgn(v) { return v < 0 ? -1 : 1; }
  function ringOf(s, n) {
    var o = [], j, t, c, sn;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      o.push([s.yc + s.w * sgn(c) * Math.pow(Math.abs(c), s.e), s.zc + s.h * sgn(sn) * Math.pow(Math.abs(sn), s.e)]);
    }
    return o;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], i, j, r;
    for (i = 0; i < secs.length; i++) {
      r = ringOf(secs[i], n);
      for (j = 0; j < n; j++) pos.push(secs[i].x, r[j][0], r[j][1]);
    }
    for (i = 0; i < secs.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, c = (i + 1) * n + j, d = (i + 1) * n + (j + 1) % n;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    function cap(k, dx, front) {
      var s = secs[k], rr = ringOf(s, n), t = [], cy = 0, cz = 0;
      for (j = 0; j < n; j++) { cy += rr[j][0]; cz += rr[j][1]; }
      var o = [s.x + dx, cy / n, cz / n];
      for (j = 0; j < n; j++) {
        var p0 = [s.x, rr[j][0], rr[j][1]], p1 = [s.x, rr[(j + 1) % n][0], rr[(j + 1) % n][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (noseDx !== null && noseDx !== undefined) cap(0, noseDx, true);
    if (tailDx !== null && tailDx !== undefined) cap(secs.length - 1, -tailDx, false);
    return out;
  }
  function revolve(prof, len, r, x, y, z, n) {
    var secs = [], i;
    for (i = 0; i < prof.length; i++) secs.push(ls(x + prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], 1));
    return loft(secs, n, 0, 0);
  }
  function aftDisc(r, seg, x, y, z) {
    var g = new V.CircleGeometry(r, seg);
    g.rotateY(-PI / 2);
    g.translate(x, y, z);
    return g;
  }
  function foreDisc(rw, rh, seg, x, y, z) {
    var g = new V.CircleGeometry(1, seg);
    g.scale(rw, rh, 1);
    g.rotateY(PI / 2);
    g.translate(x, y, z);
    return g;
  }
  function secAt(secs, x) {
    for (var i = 0; i < secs.length - 1; i++) {
      var a = secs[i], b = secs[i + 1];
      if (x <= a.x && x >= b.x) {
        var t = (a.x - x) / ((a.x - b.x) || 1);
        var L = function (p, q) { return p + (q - p) * t; };
        return ls(x, L(a.yc, b.yc), L(a.zc, b.zc), L(a.w, b.w), L(a.h, b.h), L(a.e, b.e));
      }
    }
    return secs[secs.length - 1];
  }
  function arch(list, CAN, x, zMin, r) {
    var s = secAt(CAN, x), q = ls(s.x, s.yc, s.zc, s.w * 1.02, s.h * 1.02, s.e), ring = ringOf(q, 32), j, prev = null;
    for (j = 0; j <= 16; j++) {
      var p = ring[j % 32];
      if (p[1] < zMin) { prev = null; continue; }
      var P = [x, p[0], p[1]];
      if (prev) list.push(bar(prev, P, r, 6));
      prev = P;
    }
  }
  /* linear interpolation in a table of [key, value...] rows (keys monotonic) */
  function lerpTab(tab, k, col) {
    var i, n = tab.length, up = tab[n - 1][0] > tab[0][0];
    for (i = 0; i < n - 1; i++) {
      var a = tab[i][0], b = tab[i + 1][0];
      if (up ? (k >= a && k <= b) : (k <= a && k >= b)) {
        var t = (k - a) / ((b - a) || 1);
        return tab[i][col] + (tab[i + 1][col] - tab[i][col]) * t;
      }
    }
    return (up ? k < tab[0][0] : k > tab[0][0]) ? tab[0][col] : tab[n - 1][col];
  }

  /* ---- projected skin: one canvas in four bands (top, port, starboard,
     belly); cfg = {XMIN, XMAX, YMAX, ZTOP, ZSPAN, PXM, PYM, draw(g, M)} */
  function skin(cfg) {
    var TW = Math.round((cfg.XMAX - cfg.XMIN) * cfg.PXM) + 4;
    var TOPH = Math.round(2 * cfg.YMAX * cfg.PYM), SIDEH = Math.round(cfg.ZSPAN * cfg.PYM * 1.2);
    var TH = TOPH + 2 * SIDEH + TOPH;
    var M = {
      TW: TW, TH: TH, TOPH: TOPH, SIDEH: SIDEH, bandY: [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH],
      X: function (x) { return clamp((x - cfg.XMIN) * cfg.PXM, 2, TW - 2); },
      Y: function (y) { return (cfg.YMAX - y) * cfg.PYM; },
      Z: function (z, band) { return M.bandY[band] + clamp((cfg.ZTOP - z) / cfg.ZSPAN * SIDEH, 0, SIDEH); }
    };
    var tex;
    function texture() {
      if (tex !== undefined) return tex;
      var t = false;
      try {
        var cv = document.createElement("canvas");
        cv.width = TW; cv.height = TH;
        cfg.draw(cv.getContext("2d"), M);
        t = new V.CanvasTexture(cv);
        t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
        t.anisotropy = 4;
        if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      } catch (e) { t = false; }
      tex = t;
      return t;
    }
    function projUV(geo) {
      var p = geo.attributes.position.array;
      var uv = new Float32Array(p.length / 3 * 2);
      var t, k;
      for (t = 0; t < p.length; t += 9) {
        var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
        var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        nx /= nl; ny /= nl; nz /= nl;
        var band = nz > 0.55 ? 0 : nz < -0.55 ? 3 : (ny >= 0 ? 1 : 2);
        var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
        for (k = 0; k < 3; k++) {
          var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, W;
          if (band === 0) { U = M.X(x); W = clamp(M.Y(y), 2, TOPH - 2); }
          else if (band === 3) { U = M.X(x); W = TOPH + 2 * SIDEH + clamp(M.Y(y), 2, TOPH - 2); }
          else {
            U = M.X(endOn ? x + y : x);
            W = TOPH + (band - 1) * SIDEH + clamp((cfg.ZTOP - z) / cfg.ZSPAN * SIDEH, 2, SIDEH - 2);
          }
          uv[(t / 3 + k) * 2] = U / TW;
          uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
        }
      }
      geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
      return geo;
    }
    return { texture: texture, projUV: projUV, M: M };
  }

  /* natural-metal finish: panel mosaic, frame lines, soot aft of xSoot */
  function metalDraw(seed, base, frames, xSoot, extra) {
    return function (g, M) {
      var s = seed, i, b;
      function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
      g.fillStyle = base; g.fillRect(0, 0, M.TW, M.TH);
      for (i = 0; i < 150; i++) {
        g.globalAlpha = 0.05 + R() * 0.10;
        g.fillStyle = R() < 0.45 ? "#eef1f3" : (R() < 0.5 ? "#80878d" : "#a4abb0");
        g.fillRect(R() * M.TW, R() * M.TH, 12 + R() * 60, 8 + R() * 40);
      }
      g.globalAlpha = 1;
      g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1;
      for (b = 0; b < 4; b++) for (i = 0; i < frames.length; i++) {
        var X = M.X(frames[i]);
        g.beginPath(); g.moveTo(X, M.bandY[b]); g.lineTo(X, M.bandY[b] + (b === 0 || b === 3 ? M.TOPH : M.SIDEH)); g.stroke();
      }
      g.strokeStyle = "rgba(0,0,0,0.12)";
      for (i = 0; i < 40; i++) g.strokeRect(R() * M.TW, R() * M.TH, 6 + R() * 22, 5 + R() * 14);
      if (extra) extra(g, M, R);
      var sx = M.X(xSoot - 1.6), gr = g.createLinearGradient(M.X(xSoot), 0, sx, 0);
      gr.addColorStop(0, "rgba(30,26,22,0.45)"); gr.addColorStop(1, "rgba(30,26,22,0)");
      g.fillStyle = gr; g.fillRect(M.X(xSoot - 0.05), M.TOPH, sx - M.X(xSoot - 0.05), M.TH - M.TOPH);
    };
  }

  function mats(T, C, fallback) {
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: T.rough, metalness: T.metal });
    var tx = T.texture();
    if (tx) m.skin.map = tx; else m.skin.color.set(fallback);
    m.dark  = new V.MeshStandardMaterial({ color: 0x151719, roughness: 0.72, metalness: 0.28 });
    m.metal = new V.MeshStandardMaterial({ color: 0x6a6f72, roughness: 0.46, metalness: 0.62 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x34505a, roughness: 0.10, metalness: 0.30 });
    m.door  = new V.MeshStandardMaterial({ color: 0x9a9fa1, roughness: 0.55, metalness: 0.35 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }
  function mesh(parent, list, mat, name, proj) {
    if (!list.length) return null;
    var geo = merge(list);
    if (proj) proj(geo);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function push(list, geos) {
    if (geos instanceof Array) for (var i = 0; i < geos.length; i++) list.push(geos[i]);
    else list.push(geos);
  }
  /* the parked attitude: the body pitched nose-up by `pitch` (rad) about the
     contact point (cx, cz) of the main wheels */
  function stance(root, cx, cz, pitch) {
    var piv = new V.Group(); piv.name = "stance";
    piv.position.set(cx, 0, cz); piv.rotation.y = -pitch;
    var body = new V.Group(); body.position.set(-cx, 0, -cz);
    piv.add(body); root.add(piv);
    return body;
  }
  /* a tyre with its hub, axle along y */
  function wheel(G, x, y, z, r, w) {
    G.tyre.push(cyl(r, r, w, 22, "y", x, y, z));
    G.metal.push(cyl(r * 0.55, r * 0.55, w + 0.01, 12, "y", x, y, z));
  }
  return { PI: PI, clamp: clamp, place: place, box: box, cyl: cyl, bar: bar, tris: tris, convex: convex, solid: solid,
           foil: foil, blk: blk, ls: ls, loft: loft, revolve: revolve, aftDisc: aftDisc, foreDisc: foreDisc, secAt: secAt,
           arch: arch, lerpTab: lerpTab, skin: skin, metalDraw: metalDraw, mats: mats, mesh: mesh, push: push,
           stance: stance, wheel: wheel };
};


/* ==========================================================================
   HeroOuragan - Dassault MD.450 Ouragan (fra_e50_cas)

   References:
     A "Dassault Ouragan 3-view.svg" (Commons, rendered 1800 x 2091 px): side
       view with BOTH WHEELS DRAWN on their ground lines (the legs are not
       drawn), plan (nose left) with the tip tanks, front view (on its side,
       ground to the left). Every station below is read off A in drawing
       pixels and converted by px(), pz(), py():
         x = (613 - col) / 111.55   nose lip col 14 -> +5.37, rudder tip
                                    col 1211 -> -5.36: 1197 px = the
                                    published 10.73 m
         z = (298 - row) / 111.55   side view, row 298 = fuselage axis
         y = halfwidth / 113.53     plan centreline row 1297; tip tanks'
                                    outer edges rows 550 / 2044: 1494 px =
                                    the published 13.16 m
       A's plan is 1.8 % wider than its side view is long, so x and y take
       separate scales (the same treatment as gb_hunter.js's drawing).
     B "Dassault MD 450 Ouragan 01.jpg" (Brussels, '320 UQ', near profile
       starboard): natural metal, the stance, the tip tank with its upper
       and outboard fins, the nose leg ahead of the cockpit, the main legs
       with their doors, the two-piece nose doors of the MD.450B.
     C "Dassault MD 450 Ouragan 06.jpg" (Brussels, 3/4 rear): the plain
       round jet pipe, the swept tailplane part way up the fin, the bubble
       canopy, the tank fins.
     D "Ouragan Hatzerim 280404.jpg": the round nose intake with its
       vertical splitter, the four cannon ports in the lower nose, the
       windscreen and canopy framing (its painted shark mouth is NOT used).
     E en.wikipedia "Dassault Ouragan": length 10.73 m, span 13.16 m,
       height 4.14 m, wing area 23.8 m2; "single divided air intake in the
       nose", bubble canopy, tricycle gear, swept fin and tailplane, thin
       tapered wing, 4 x 20 mm Hispano "beneath the engine intake",
       450 l tip tanks standard.

   Recognition list: 1 the stubby cylindrical fuselage with the round nose
   intake and splitter (A, D, E); 2 the straight tapered wing with the big
   tip tanks, each with an upper and an outboard fin (A, B, C); 3 the bubble
   canopy well forward (A, B); 4 the tall swept fin with the tailplane part
   way up, crossed by a bullet fairing (A, C); 5 the plain jet pipe under
   the fin (A, C); 6 the four cannon ports under the intake (A, D); 7 the
   tricycle gear: nose leg under the cockpit, mains under the wing at a
   2.29 m track (A side + front, B) [gear]; 8 natural metal (B, C).

   STANCE (drawn gear, checked against a photograph): A draws the nose tyre
   (0.53 m) on a ground line 7 px lower than the main tyre's (0.72 m): the
   aeroplane sits 1.07 deg nose-up on level ground. Check at ONE station,
   the nose wheel, belly-to-ground over the fuselage depth just ahead of
   the windscreen: A 0.88, photo B 0.87. Kept as drawn; the fin then
   stands 4.16 m (published 4.14 m, +0.5 %).

   NOT CONFIRMED:
     - A draws no gear legs; the legs and doors are placed from B (main leg
       from the wing's lower surface, a door outboard of it; nose leg with
       its two-piece doors).
     - the wing height and 2.8 deg dihedral are A's front view (its vertical
       scale is 8 % larger than the side view's, so the wing's height at the
       root, z -0.53 at y 2.2, is taken in fuselage depths, not pixels).
     - the tip tanks are drawn 0.59 m across (A plan, which with A's length
       gives about the published 450 l); photograph B makes them look
       fatter (length / diameter 4.3 against A's 5.1, B being 3/4 from the
       front). A's figure is used.
     - the bullet fairing's length: A's side view (1.9 m) is used, its plan
       draws the aft spike 0.2 m longer.
     - the canopy's plan half-width (0.37 m) is read off A's plan outline.
   DETAIL PASS: added the seat headrest, mirror and canopy sill rails, the
   intake's lip ring (D), a spine and a belly blade aerial, the tip tanks'
   position lights and a tail light, the jet pipe's liner and lip ring,
   the rudder hinge fairing, hub faces with bolts, brakes and brake lines,
   torque links and the nose leg's taxi lamp (B, C, D); seams with rivet
   rows, the wing's spars and access panels, the airbrake outlines, tank
   fuel caps and oil streaks on the skin. The aerials' places and the
   small parts' sizes are NOT confirmed.
   Not drawn: pitot, flap lines (painted only), stores.
   ======================================================================== */

var HeroOuragan = (function () {
  "use strict";
  var SX = 111.55, SY = 113.53;
  function px(c) { return (613 - c) / SX; }
  function pz(r) { return (298 - r) / SX; }
  function py(h) { return h / SY; }

  /* fuselage (A): [col, side top row, side bottom row, plan half-width px];
     the top is the sill line under the canopy and the spine under the fin */
  var FUS = [
    [16, 256, 338, 42], [35, 252, 342, 48], [60, 246, 349, 54], [90, 240, 355, 61], [120, 235, 359, 66],
    [150, 229, 364, 70], [180, 226, 368, 74], [210, 225, 371, 77], [240, 224, 373, 79], [300, 222, 378, 83],
    [360, 220, 382, 87], [420, 216, 384, 90], [470, 213, 385, 92], [585, 212, 385, 92], [660, 213, 384, 91],
    [720, 214, 383, 90], [780, 216, 379, 87], [840, 221, 375, 82], [900, 230, 369, 75], [960, 238, 360, 67],
    [1020, 247, 347, 57], [1060, 252, 340, 53], [1086, 257, 335, 50]];
  /* canopy (A side, plan): [col, top row, half-width px] on the sill */
  var CAN = [[160, 226, 6], [200, 200, 24], [240, 182, 36], [280, 172, 41], [310, 169, 42], [350, 173, 40],
             [390, 183, 35], [410, 189, 31]];
  var FAIR = [[400, 186, 33], [430, 197, 26], [455, 205, 16], [478, 211, 4]];
  /* fin (A side): [row, LE col, TE col, thickness m] */
  var FIN = [[236, 790, 1170, 0.12], [212, 820, 1172, 0.12], [200, 873, 1174, 0.115], [187, 910, 1177, 0.11],
             [173, 935, 1179, 0.105], [150, 958, 1183, 0.10], [100, 1004, 1192, 0.09], [50, 1050, 1201, 0.075],
             [26, 1078, 1207, 0.06], [17, 1100, 1200, 0.05]];

  /* wing (A plan, front): LE 1.749 - 0.3258 y (17.5 deg), TE nearly straight */
  function wLE(y) { return 1.749 - 0.3258 * y; }
  function wTE(y) { return -1.181 + 0.0263 * y; }
  function wZ(y)  { return -0.525 + 0.0484 * (y - 2.18); }            /* 2.8 deg dihedral */
  function wT(y)  { return (wLE(y) - wTE(y)) * (0.12 - 0.02 * y / 6); }
  var WTIP = 5.99, TKY = 6.285, TKR = 0.295, TKX0 = 0.63, TKX1 = -2.44, TKZ = -0.37;
  /* tailplane (A plan, side): LE -3.245 - 0.460 (y - 0.19), TE -4.894 - 0.1415 y; tip y 2.19 */
  var TZ = pz(158), TTIP = 2.19;
  function tLE(y) { return -3.245 - 0.460 * (y - 0.19); }
  function tTE(y) { return -4.894 - 0.1415 * y; }

  var SK = null;
  function skinCfg(K) {
    return K.skin({ XMIN: -5.6, XMAX: 5.6, YMAX: 6.7, ZTOP: 2.7, ZSPAN: 4.5, PXM: 44, PYM: 24,
      draw: K.metalDraw(40213, "#b4b9bc", [4.6, 3.9, 2.6, 1.4, 0.2, -1.0, -2.2, -3.2, -4.2], px(1086),
        function (g, M) {
          /* flap / aileron hinge lines (top and belly) and the gun bay panel */
          var b, s;
          g.strokeStyle = "rgba(0,0,0,0.25)";
          for (b = 0; b <= 3; b += 3) for (s = -1; s <= 1; s += 2) {
            var Yb = function (yy) { return M.bandY[b] + M.Y(s * yy); };
            g.beginPath(); g.moveTo(M.X(wTE(1.0) + 0.45), Yb(1.0)); g.lineTo(M.X(wTE(3.3) + 0.42), Yb(3.3)); g.stroke();
            g.beginPath(); g.moveTo(M.X(wTE(3.4) + 0.40), Yb(3.4)); g.lineTo(M.X(wTE(5.8) + 0.36), Yb(5.8)); g.stroke();
          }
          for (b = 1; b <= 2; b++) g.strokeRect(M.X(px(345)), M.Z(pz(330), b), (px(240) - px(345)) * 44, 0.35 / 4.5 * M.SIDEH);
          /* the detail pass: lengthwise seams with rivet rows on the sides,
             the spine and the belly, the frames riveted, the wing spars, the
             fuselage airbrakes' and the tank fuel caps' outlines, and oil
             streaks aft of the wing root (B, C: a riveted natural-metal
             skin) */
          function seam(x0, y0, x1, y1) {
            g.strokeStyle = "rgba(0,0,0,0.26)"; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
            g.fillStyle = "rgba(40,44,48,0.35)";
            var L = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)), n = Math.floor(L / 4), j;
            for (j = 0; j <= n; j++) g.fillRect(x0 + (x1 - x0) * j / Math.max(n, 1) + 1.5, y0 + (y1 - y0) * j / Math.max(n, 1) + 1.5, 1, 1);
          }
          [[5.2, -4.2, 0.45], [5.2, -4.2, -0.30], [4.0, -3.6, 0.10]].forEach(function (q) {
            for (b = 1; b <= 2; b++) seam(M.X(q[1]), M.Z(q[2], b), M.X(q[0]), M.Z(q[2], b));
          });
          [4.6, 3.9, 2.6, 1.4, 0.2, -1.0, -2.2, -3.2, -4.2].forEach(function (x) {
            for (b = 0; b < 4; b++) seam(M.X(x) + 2, M.bandY[b] + (b === 0 || b === 3 ? M.Y(0.85) : 0), M.X(x) + 2, M.bandY[b] + (b === 0 || b === 3 ? M.Y(-0.85) : M.SIDEH));
          });
          for (b = 0; b <= 3; b += 3) for (s = -1; s <= 1; s += 2) {
            seam(M.X(-4.2), M.bandY[b] + M.Y(s * 0.40), M.X(5.0), M.bandY[b] + M.Y(s * 0.40));
            seam(M.X(wLE(0.9) - 0.45), M.bandY[b] + M.Y(s * 0.9), M.X(wLE(5.9) - 0.30), M.bandY[b] + M.Y(s * 5.9));
            seam(M.X(wTE(0.9) + 0.75), M.bandY[b] + M.Y(s * 0.9), M.X(wTE(5.9) + 0.65), M.bandY[b] + M.Y(s * 5.9));
            for (var q = 0; q < 4; q++) {
              var yy = 1.4 + q * 1.1;
              g.strokeStyle = "rgba(0,0,0,0.22)";
              g.strokeRect(M.X((wLE(yy) + wTE(yy)) / 2 + 0.15), M.bandY[b] + M.Y(s * yy) - 3, 0.30 * 44, 6);
            }
            if (b === 0) { g.fillStyle = "rgba(0,0,0,0.35)"; g.fillRect(M.X(-0.30), M.bandY[0] + M.Y(s * 6.285) - 2, 5, 5); }
          }
          g.strokeStyle = "rgba(0,0,0,0.30)";
          for (b = 1; b <= 2; b++) g.strokeRect(M.X(-2.6), M.Z(0.20, b), 0.6 * 44, 0.30 / 4.5 * M.SIDEH);
          for (b = 1; b <= 2; b++) for (s = 0; s < 10; s++) {
            g.fillStyle = "rgba(30,28,24,0.10)";
            g.fillRect(M.X(-1.2 - s * 0.25), M.Z(-0.55, b), 26 + s * 6, 1.5);
          }
        }) });
  }

  function build(THREE, M, C) {
    var K = EarlyJetKit(THREE), V = THREE;
    if (!SK) SK = skinCfg(K);
    var T = K.mats({ texture: SK.texture, rough: 0.42, metal: 0.55 }, C, "#b4b9bc");
    var root = new V.Group(); root.name = "ouragan";
    /* main contact: tyre bottom under the main axle (A: wheel centre col 628,
       row 450, r 0.36; ground row 491) */
    var MX = px(628), MZC = pz(450), MR = 0.36, NX = px(253.5), NZC = pz(468), NR = 0.265;
    var GZ = MZC - MR;
    var g = K.stance(root, MX, GZ, Math.atan2(GZ - (NZC - NR), NX - MX));   /* 1.07 deg nose-up, as drawn */
    var S = { skin: [], dark: [], metal: [], glass: [], team: [] };
    var G = { metal: [], tyre: [], door: [] };
    var i, s, r;

    /* ---- fuselage */
    var body = [];
    for (i = 0; i < FUS.length; i++) {
      r = FUS[i];
      body.push(K.ls(px(r[0]), 0, (pz(r[1]) + pz(r[2])) / 2, py(r[3]), (pz(r[1]) - pz(r[2])) / 2, 0.98));
    }
    K.push(S.skin, K.loft(body, 36, null, null));
    /* the intake: dark duct face behind the lip, the vertical splitter (A front, D) */
    var lip = body[0];
    S.dark.push(K.foreDisc(lip.w * 0.86, lip.h * 0.86, 28, lip.x - 0.12, 0, lip.zc));
    K.push(S.skin, K.loft([K.ls(lip.x + 0.001, 0, lip.zc, lip.w, lip.h, 1), K.ls(lip.x - 0.12, 0, lip.zc, lip.w * 0.86, lip.h * 0.86, 1)], 28, null, null));
    S.metal.push(K.box(0.30, 0.035, lip.h * 1.7, lip.x - 0.20, 0, lip.zc));
    /* jet pipe (A: exit col 1088, centre row 296, r 0.33) */
    var JX = px(1088), JZ = pz(296);
    K.push(S.metal, K.loft([K.ls(px(1080), 0, JZ, 0.34, 0.34, 1), K.ls(JX, 0, JZ, 0.33, 0.33, 1)], 26, null, null));
    S.dark.push(K.aftDisc(0.31, 24, JX + 0.03, 0, JZ));

    /* ---- canopy and its fairing (A, B) */
    var SILL = pz(222), cs = [], fs = [];
    for (i = 0; i < CAN.length; i++) cs.push(K.ls(px(CAN[i][0]), 0, SILL, py(CAN[i][2]), Math.max(0.01, pz(CAN[i][1]) - SILL), 1));
    for (i = 0; i < FAIR.length; i++) fs.push(K.ls(px(FAIR[i][0]), 0, SILL - 0.04, py(FAIR[i][2]), pz(FAIR[i][1]) - SILL + 0.04, 0.95));
    K.push(S.glass, K.loft(cs, 26, 0.01, 0.01));
    K.push(S.skin, K.loft(fs, 22, null, 0.02));
    K.arch(S.dark, cs, px(205), SILL, 0.022);
    K.arch(S.dark, cs, px(250), SILL, 0.022);
    K.arch(S.dark, cs, px(400), SILL, 0.022);

    /* ---- wing (A), tip tanks with their two fins (A, B, C) */
    function wSec(y, sg) { return K.foil([wLE(y), sg * y, wZ(y)], [wTE(y), sg * y, wZ(y)], wT(y), [0, 0, 1]); }
    var TKP = [[0.5, 0.06], [0.44, 0.62], [0.32, 0.92], [0.12, 1.0], [-0.12, 0.98], [-0.32, 0.80], [-0.45, 0.42], [-0.5, 0.05]];
    var TKL = TKX0 - TKX1, TKC = (TKX0 + TKX1) / 2;
    for (s = -1; s <= 1; s += 2) {
      S.skin.push(K.solid(wSec(0.7, s), wSec(2.2, s)));
      S.skin.push(K.solid(wSec(2.2, s), wSec(4.2, s)));
      S.skin.push(K.solid(wSec(4.2, s), wSec(WTIP, s)));
      K.push(S.skin, K.revolve(TKP, TKL, TKR, TKC, s * TKY, TKZ, 20));
      /* upper fin and outboard fin at the tank's tail (A side: the fin
         stands 0.40 m over the tank, cols 800-880; plan; B) */
      var FTOP = TKZ + TKR + 0.40;
      S.skin.push(K.solid([[px(800), s * (TKY - 0.02), TKZ + 0.18], [px(880), s * (TKY - 0.02), TKZ + 0.10], [px(880), s * (TKY - 0.02), FTOP], [px(845), s * (TKY - 0.02), FTOP]],
                          [[px(800), s * (TKY + 0.02), TKZ + 0.18], [px(880), s * (TKY + 0.02), TKZ + 0.10], [px(880), s * (TKY + 0.02), FTOP], [px(845), s * (TKY + 0.02), FTOP]]));
      S.skin.push(K.solid([[px(790), s * (TKY + 0.20), TKZ + 0.02], [px(870), s * (TKY + 0.12), TKZ + 0.02], [px(880), s * py(2044 - 1297), TKZ + 0.02], [px(845), s * py(2044 - 1297), TKZ + 0.02]],
                          [[px(790), s * (TKY + 0.20), TKZ - 0.02], [px(870), s * (TKY + 0.12), TKZ - 0.02], [px(880), s * py(2044 - 1297), TKZ - 0.02], [px(845), s * py(2044 - 1297), TKZ - 0.02]]));
      /* team strips on the upper outer wings */
      var tb = function (yy) {
        var h = wT(yy) * 0.5 + 0.012;
        return K.blk([wLE(yy), s * yy, wZ(yy)], [wTE(yy), s * yy, wZ(yy)], 0.25, 0.60, h, [0, 0, 1]);
      };
      S.team.push(K.solid(tb(4.6), tb(5.05)));
    }

    /* ---- tailplane part way up the fin, and the bullet fairing (A) */
    function tSec(y, sg, t) { return K.foil([tLE(y), sg * y, TZ], [tTE(y), sg * y, TZ], t, [0, 0, 1]); }
    for (s = -1; s <= 1; s += 2) {
      S.skin.push(K.solid(tSec(0.05, s, 0.08), tSec(1.5, s, 0.06)));
      S.skin.push(K.solid(tSec(1.5, s, 0.06), (function () {
        return K.foil([tLE(TTIP) - 0.12, s * TTIP, TZ], [tTE(TTIP) + 0.10, s * TTIP, TZ], 0.03, [0, 0, 1]); })()));
    }
    K.push(S.skin, K.revolve([[0.5, 0.05], [0.40, 0.72], [0.22, 1.0], [-0.25, 0.9], [-0.42, 0.5], [-0.5, 0.04]],
                             px(930) - px(1192), 0.15, (px(930) + px(1192)) / 2, 0, pz(165), 16));

    /* ---- fin (A side) */
    for (i = 0; i < FIN.length - 1; i++) {
      var a = FIN[i], b = FIN[i + 1];
      S.skin.push(K.solid(K.foil([px(a[1]), 0, pz(a[0])], [px(a[2]), 0, pz(a[0])], a[3], [0, 1, 0]),
                          K.foil([px(b[1]), 0, pz(b[0])], [px(b[2]), 0, pz(b[0])], b[3], [0, 1, 0])));
    }
    /* team band across the fin tip */
    S.team.push(K.solid(K.foil([px(1086) - 0.02, 0, pz(36)], [px(1203), 0, pz(36)], 0.075, [0, 1, 0]),
                        K.foil([px(1098) - 0.02, 0, pz(19)], [px(1200), 0, pz(19)], 0.062, [0, 1, 0])));

    /* ---- four cannon ports under the intake (A: troughs cols 130-215, D) */
    for (s = -1; s <= 1; s += 2) {
      S.dark.push(K.box(0.70, 0.06, 0.07, px(175), s * 0.36, pz(335), 0, 0, -s * 0.12));
      S.dark.push(K.box(0.70, 0.06, 0.07, px(165), s * 0.24, pz(350), 0, 0, -s * 0.08));
    }

    /* ---- the detail pass: fittings B, C and D show that the first pass
       left out (see "Detail pass" in the header) */
    S.lampR = []; S.lampG = [];
    /* the seat headrest and the mirror under the canopy, the sill rails */
    S.dark.push(K.box(0.16, 0.42, 0.28, px(345), 0, SILL + 0.30));
    S.dark.push(K.box(0.34, 0.40, 0.10, px(310), 0, SILL + 0.10));
    S.metal.push(K.box(0.03, 0.10, 0.04, px(250), 0, pz(180) - 0.02));
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < CAN.length - 1; i++) S.dark.push(K.bar([px(CAN[i][0]), s * py(CAN[i][2]) * 1.02, SILL + 0.01], [px(CAN[i + 1][0]), s * py(CAN[i + 1][2]) * 1.02, SILL + 0.01], 0.018, 5));
    /* the intake's lip ring (D) */
    var lr = new V.TorusGeometry(lip.w * 0.99, 0.026, 4, 30);
    lr.rotateY(Math.PI / 2); lr.scale(1, 1, lip.h / lip.w); lr.translate(lip.x - 0.03, 0, lip.zc);
    S.metal.push(lr);
    /* aerials: a blade on the spine behind the canopy fairing and one under
       the belly; the tip tanks' position lights (port red), the white tail
       light on the bullet fairing */
    var at = function (x) { return K.secAt(body, x); };
    var sp = at(-0.5), bp = at(-1.2);
    S.skin.push(K.solid([[-0.35, -0.012, sp.zc + sp.h - 0.02], [-0.65, -0.012, sp.zc + sp.h - 0.02], [-0.78, -0.012, sp.zc + sp.h + 0.24], [-0.65, -0.012, sp.zc + sp.h + 0.24]],
                        [[-0.35, 0.012, sp.zc + sp.h - 0.02], [-0.65, 0.012, sp.zc + sp.h - 0.02], [-0.78, 0.012, sp.zc + sp.h + 0.24], [-0.65, 0.012, sp.zc + sp.h + 0.24]]));
    S.skin.push(K.solid([[-1.05, -0.012, bp.zc - bp.h + 0.02], [-1.30, -0.012, bp.zc - bp.h + 0.02], [-1.40, -0.012, bp.zc - bp.h - 0.16], [-1.28, -0.012, bp.zc - bp.h - 0.16]],
                        [[-1.05, 0.012, bp.zc - bp.h + 0.02], [-1.30, 0.012, bp.zc - bp.h + 0.02], [-1.40, 0.012, bp.zc - bp.h - 0.16], [-1.28, 0.012, bp.zc - bp.h - 0.16]]));
    for (s = -1; s <= 1; s += 2)
      (s > 0 ? S.lampR : S.lampG).push(K.cyl(0.035, 0.035, 0.12, 8, "x", -0.30, s * (TKY + TKR * 0.85), TKZ));
    S.glass.push(K.cyl(0.03, 0.04, 0.05, 8, "x", px(1192) + 0.03, 0, pz(165)));
    /* the jet pipe's inner liner and its lip ring (A, C) */
    S.metal.push(K.cyl(0.345, 0.345, 0.04, 26, "x", JX + 0.02, 0, JZ));
    S.dark.push(K.cyl(0.29, 0.29, 0.30, 20, "x", JX + 0.20, 0, JZ));
    /* the rudder's hinge fairing and the elevators' mass-balance horns */
    S.metal.push(K.bar([px(1150), 0, pz(100)], [px(1150), 0, pz(30)], 0.022, 5));

    K.mesh(g, S.skin, T.skin, "skin", SK.projUV);
    K.mesh(g, S.dark, T.dark, "dark");
    K.mesh(g, S.metal, T.metal, "metal");
    K.mesh(g, S.glass, T.glass, "glass");
    K.mesh(g, S.team, T.team, "team");
    K.mesh(g, S.lampR, new V.MeshStandardMaterial({ color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 }), "lamp_red");
    K.mesh(g, S.lampG, new V.MeshStandardMaterial({ color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 }), "lamp_green");

    /* ---- gear (A wheels, A front-view track 2.29 m, B legs and doors) */
    var gr = new V.Group(); gr.name = "gear"; g.add(gr);
    var MY = py(1425 - 1297) * 1.0, belN = pz(366);
    K.wheel(G, NX, 0, NZC, NR, 0.17);
    G.metal.push(K.bar([NX + 0.10, 0, belN + 0.05], [NX + 0.04, 0, NZC + 0.20], 0.05, 10));
    G.metal.push(K.bar([NX + 0.04, 0, NZC + 0.22], [NX, 0.10, NZC], 0.025, 6));
    G.metal.push(K.bar([NX + 0.04, 0, NZC + 0.22], [NX, -0.10, NZC], 0.025, 6));
    G.metal.push(K.bar([NX - 0.45, 0, belN + 0.04], [NX + 0.07, 0, NZC + 0.55], 0.024, 6));
    for (s = -1; s <= 1; s += 2) G.door.push(K.box(0.85, 0.02, 0.42, NX + 0.05, s * 0.21, belN - 0.18, s * 0.10));
    for (s = -1; s <= 1; s += 2) {
      var ly = s * (MY - 0.12), wb = wZ(MY) - wT(MY) * 0.35;
      K.wheel(G, MX, s * MY, MZC, MR, 0.20);
      G.metal.push(K.bar([MX + 0.05, ly, wb], [MX, ly, MZC + 0.06], 0.065, 10));
      G.metal.push(K.bar([MX - 0.55, ly, wb], [MX, ly, MZC + 0.55], 0.03, 6));
      G.metal.push(K.bar([MX, ly, MZC], [MX, s * (MY + 0.10), MZC], 0.045, 8));
      /* the leg door outboard of the leg (B) */
      G.door.push(K.solid([[MX + 0.32, s * (MY + 0.14), wb - 0.03], [MX - 0.32, s * (MY + 0.14), wb - 0.03], [MX - 0.24, s * (MY + 0.14), MZC + 0.30], [MX + 0.26, s * (MY + 0.14), MZC + 0.30]],
                          [[MX + 0.32, s * (MY + 0.16), wb - 0.03], [MX - 0.32, s * (MY + 0.16), wb - 0.03], [MX - 0.24, s * (MY + 0.16), MZC + 0.30], [MX + 0.26, s * (MY + 0.16), MZC + 0.30]]));
    }
    /* the detail pass: hub faces and bolts, brakes and brake lines, the
       legs' torque links, the nose leg's taxi lamp (B) */
    G.dark = [];
    function hubs(x, y, z, r, w) {
      for (var q = -1; q <= 1; q += 2) {
        G.metal.push(K.cyl(r * 0.62, r * 0.66, 0.025, 16, "y", x, y + q * (w / 2 + 0.006), z));
        for (var k = 0; k < 6; k++) G.dark.push(K.cyl(0.012, 0.012, 0.03, 5, "y", x + Math.cos(k * Math.PI / 3) * r * 0.40, y + q * (w / 2 + 0.018), z + Math.sin(k * Math.PI / 3) * r * 0.40));
      }
    }
    hubs(NX, 0, NZC, NR, 0.17);
    G.metal.push(K.bar([NX + 0.05, 0, NZC + 0.30], [NX + 0.16, 0, NZC + 0.42], 0.014, 5), K.bar([NX + 0.16, 0, NZC + 0.42], [NX + 0.07, 0, NZC + 0.55], 0.014, 5));
    G.metal.push(K.box(0.06, 0.10, 0.08, NX + 0.12, 0, NZC + 0.70));
    for (s = -1; s <= 1; s += 2) {
      var ly2 = s * (MY - 0.12);
      hubs(MX, s * MY, MZC, MR, 0.20);
      G.dark.push(K.cyl(MR * 0.55, MR * 0.55, 0.05, 12, "y", MX, s * (MY - 0.125), MZC));
      var lk = [MX + 0.18, ly2, MZC + 0.24], lb = [MX + 0.03, ly2, MZC + 0.40];
      G.metal.push(K.bar([MX + 0.01, ly2, MZC + 0.12], lk, 0.018, 5), K.bar(lk, lb, 0.018, 5));
      G.dark.push(K.bar([MX + 0.08, ly2 + s * 0.06, wZ(MY) - 0.12], [MX + 0.02, ly2 + s * 0.06, MZC + 0.14], 0.009, 4));
    }
    K.mesh(gr, G.dark, T.dark, "gear_dark");
    K.mesh(gr, G.metal, T.metal, "gear_metal");
    K.mesh(gr, G.tyre, T.tyre, "gear_tyres");
    K.mesh(gr, G.door, T.door, "gear_doors");
    return root;
  }
  return { build: build };
})();


/* ==========================================================================
   HeroSuperMystere - Dassault Super Mystere B.2 (fra_e50_fighter)

   References:
     A "Dassault Super Mystere B.2 three-view silhouette.png" (Commons,
       464 x 310 px, the only general arrangement found): side view (nose
       right, gear up), plan (nose up), front view. Small, so every station
       below is a pixel of A (6 cm), read off zoomed crops:
         side  x = (col - 316.5) / 17.48   lip col 440 -> +7.07, fin tip
                                           col 193 -> -7.07: 247 px = 14.13 m
               z = (98 - row) / 17.48      row 98 = fuselage axis
         plan  x = (151.5 - row) / 17.76   lip row 26, tailplane tips 277
               y = halfwidth / 18.54       tips cols 19 / 213: 195 px = 10.52 m
       A's plan and side disagree by 3 % in length; each view takes the
       scale that makes it the published length (and span), as for the
       Hunter.
     B "Gatow Dassault Super Mystere (2009).jpg" (10-SA, port side,
       panorama): natural metal, the black anti-glare panel from the
       windscreen over the nose, the oval intake, the jet pipe under the
       fin, the gear.
     C "SuperMystereB2.JPG" (12-YH on a pole, Savigny): natural metal, the
       raked intake lip (upper lip forward), the wing.
     D "Super Mystere B2 camo.JPG" (12-YG, port side): the main legs with
       their big outer doors, the nose leg under the windscreen.
     F "Dassault Super Mystere B2 pic1.JPG" (12-YP, near profile): stance
       and tail ratios (below). Its 1970s camouflage is NOT used: the 1958
       row is drawn in natural metal as B and C show.
     H en.wikipedia "Dassault Super Mystere": length 14.13 m, span 10.51 m,
       height 4.6 m (the row's brief gives 4.55 m), wing area 32 m2, 45 deg
       sweep, Atar 101G single engine.

   Recognition list: 1 the wide oval nose intake with its raked lip (A, C);
   2 the 45 deg swept low wing with anhedral and a saw-tooth (A); 3 the
   long, slab-sided fuselage with the canopy far forward and the black
   anti-glare panel (A, B); 4 the big swept fin with the tailplane part way
   up it (A, F); 5 the single Atar pipe under the fin (A, B); 6 tall
   tricycle gear with the main doors outboard (B, D) [gear]; 7 natural
   metal (B, C).

   STANCE and FIN (A draws no gear): from F, at ONE station each:
     nose wheel: belly-to-ground / fuselage depth = 1.03 (F)
     main wheels (mean of the near and far tyre): 0.68 (F)
     tail: (fin tip - tailplane) / (tailplane - fuselage bottom) = 1.05 (F),
       A as drawn 1.16. A's fin above the tailplane is therefore scaled by
       the MEASURED 0.905; nothing else is changed.
   With A's depths (1.49 m at the nose wheel, 1.83 m at the mains) that puts
   the ground 1.53 m under the nose belly and 1.24 m under the wing root:
   1.4 deg nose-up. The fin tip then stands about 4.8 m against the
   published 4.55 / 4.6 m (+4 to +5 %). The photographed aircraft are
   museum airframes, empty, on fully extended oleos; that, and A's coarse
   pixels (1 px = 6 cm), is the likeliest remainder. It is NOT fitted.

   NOT CONFIRMED:
     - THE MAIN TRACK (3.0 m) and the wheel stations: A draws no gear. The
       nose wheel is put under the windscreen (B, D, F: just behind its
       front frame, 2.2 m aft of the lip); the mains under mid-chord of the
       wing root (D, F); the track from F's two main tyres, bounded 2.4 to
       3.3 m by the yaw that photograph can have.
     - the 4.3 deg anhedral is A's front view only.
     - the wing's saw-tooth (A plan: a step at y 3.3; its depth is drawn at
       8 cm).
     - the jet nozzle radius (0.40 m) and the ventral fairing below it (B).
     - tyre sizes (nose 0.50 m, mains 0.66 m) from F, in fuselage depths.
   DETAIL PASS: added the two pitot probes under the intake (C), the DEFA
   ports and the louvred vents on the nose sides (B), the canopy sill rails
   and the windscreen's centre frame (B), a spine and a belly blade aerial
   and a whip aft, a beacon and wingtip nav lights, the jet pipe's liner and
   lip ring, a fuel vent, hub faces with bolts, brakes, the main legs'
   torque links and the nose leg's mudguard and taxi lamp (B, D); seams with
   rivet rows, access panels, the belly airbrake outlines and oil streaks
   on the skin. The aerials' places and the small parts' sizes are NOT
   confirmed. 3978 -> 6026 tris, 8 -> 11 draw calls; extents unchanged.
   Not drawn: the ranging radar, rocket pack.
   ======================================================================== */

var HeroSuperMystere = (function () {
  "use strict";
  var SXS = 17.48, SXP = 17.76, SY = 18.54;
  function sx(c) { return (c - 316.5) / SXS; }
  function sz(r) { return (98 - r) / SXS; }
  function prx(r) { return (151.5 - r) / SXP; }

  /* side: [col, top row, bottom row] (top = sill line under the canopy);
     the raked intake face (upper lip col 440, lower lip col 436) is taken
     as the first, upright section */
  var SIDE = [[440, 93.5, 104.5], [436, 92.8, 106.5], [432, 92, 108], [428, 91, 108.5], [424, 90, 109], [416, 89, 110],
              [408, 87, 110], [400, 86, 111], [390, 85, 111], [380, 84.5, 112], [370, 84, 113], [360, 83, 113],
              [345, 82, 113], [320, 82, 114], [300, 82, 113.5], [280, 82, 113], [260, 82.5, 112], [240, 83.5, 110],
              [225, 84.5, 108.5], [213, 85.5, 107], [208, 86.5, 105.5]];
  /* plan half-widths [row, half px] */
  var PLAN = [[26, 10.5], [29, 10.8], [33, 11], [42, 12], [54, 13], [69, 14], [97, 15], [110, 16], [170, 15.5],
              [179, 14], [228, 14], [232, 12.5], [245, 11.5], [262, 10.5]];
  /* canopy: [col, top row, half-width m] and its fairing */
  var CAN = [[404, 86, 0.10], [397, 81.5, 0.28], [389, 78, 0.37], [380, 77, 0.40], [372, 77.5, 0.38]];
  var FAIR = [[374, 77.5, 0.37], [362, 79.5, 0.27], [348, 81.2, 0.12], [336, 82, 0.03]];
  /* fin (A side): [row, LE col, TE col]; above the tailplane x 0.905 (F) */
  var FIN = [[84, 274, 207], [75, 262, 205.5], [69, 250, 204.5], [64, 240, 203], [58, 230, 201],
             [53, 220, 199], [48, 210, 195.5], [46, 203, 193.2]];
  var TP_ROW = 79, FK = 0.905;
  function fz(r) { var z = sz(r), zt = sz(TP_ROW); return z > zt ? zt + (z - zt) * FK : z; }

  /* wing (A plan, front) */
  var WR = 0.86, WTIP = 5.26, DT = 3.30;     /* tips: (213 - 19 + 1) / 2 px */
  function wLE0(y) { return 2.956 - (y - WR) * 1.2318; }
  function wLE(y) { return y >= DT ? wLE0(y) + 0.08 : wLE0(y); }
  function wTE(y) { return y <= 1.19 ? -1.548 : -1.548 - (y - 1.19) * 0.696; }
  function wZ(y)  { return -0.30 - 0.075 * (y - WR); }                /* 4.3 deg anhedral (A front) */
  function wT(y)  { return (wLE0(y) - wTE(y)) * (0.065 - 0.012 * y / 5.2); }
  /* tailplane (A plan) */
  var TZ = sz(TP_ROW), TTIP = 1.86;
  function tLE(y) { return -4.589 - (y - 0.70) * 1.217; }
  function tTE(y) { return -6.22 - (y - 0.49) * 0.598; }

  var SK = null;
  function skinCfg(K) {
    return K.skin({ XMIN: -7.4, XMAX: 7.4, YMAX: 5.5, ZTOP: 3.1, ZSPAN: 5.2, PXM: 38, PYM: 26,
      draw: K.metalDraw(77731, "#b8bdc1", [6.2, 5.3, 4.0, 2.9, 1.8, 0.6, -0.7, -1.9, -3.1, -4.3, -5.4], -6.2,
        function (g, M) {
          var b, s;
          /* the black anti-glare panel from the windscreen over the nose (B) */
          g.fillStyle = "#16181a";
          g.fillRect(M.X(sx(404)), M.Y(0.30), M.X(6.95) - M.X(sx(404)), 0.60 * 26);
          for (b = 1; b <= 2; b++) g.fillRect(M.X(sx(404)), M.Z(sz(84), b), M.X(6.95) - M.X(sx(404)), (sz(84) - sz(90)) / 5.2 * M.SIDEH);
          /* flap and aileron lines */
          g.strokeStyle = "rgba(0,0,0,0.25)";
          for (b = 0; b <= 3; b += 3) for (s = -1; s <= 1; s += 2) {
            var Yb = function (yy) { return M.bandY[b] + M.Y(s * yy); };
            g.beginPath(); g.moveTo(M.X(wTE(1.3) + 0.55), Yb(1.3)); g.lineTo(M.X(wTE(3.2) + 0.50), Yb(3.2)); g.stroke();
            g.beginPath(); g.moveTo(M.X(wTE(3.3) + 0.45), Yb(3.3)); g.lineTo(M.X(wTE(5.0) + 0.40), Yb(5.0)); g.stroke();
          }
          /* the detail pass: lengthwise seams with rivet rows on the sides, the
             spine and the belly, access panels and the belly airbrakes'
             outlines, oil streaks aft of the wing root (B: a riveted
             natural-metal skin) */
          function seam(x0, y0, x1, y1) {
            g.strokeStyle = "rgba(0,0,0,0.24)"; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
            g.fillStyle = "rgba(40,44,48,0.35)";
            var L = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)), n = Math.floor(L / 4), j;
            for (j = 0; j <= n; j++) g.fillRect(x0 + (x1 - x0) * j / Math.max(n, 1) + 1.5, y0 + (y1 - y0) * j / Math.max(n, 1) + 1.5, 1, 1);
          }
          [[6.6, -6.4, 0.55], [6.6, -6.4, -0.25], [5.0, -6.0, -0.80], [3.0, -6.6, 1.05]].forEach(function (q) {
            for (b = 1; b <= 2; b++) seam(M.X(q[1]), M.Z(q[2], b), M.X(q[0]), M.Z(q[2], b));
          });
          [6.2, 5.3, 4.0, 2.9, 1.8, 0.6, -0.7, -1.9, -3.1, -4.3, -5.4].forEach(function (x) {
            for (b = 0; b < 4; b++) seam(M.X(x) + 2, M.bandY[b], M.X(x) + 2, M.bandY[b] + (b === 0 || b === 3 ? M.TOPH : M.SIDEH));
          });
          for (b = 0; b <= 3; b += 3) for (s = -1; s <= 1; s += 2) seam(M.X(-6.4), M.bandY[b] + M.Y(s * 0.45), M.X(6.0), M.bandY[b] + M.Y(s * 0.45));
          g.strokeStyle = "rgba(0,0,0,0.30)";
          [[1, 4.6, 4.0, 0.40, 0.05], [1, 1.4, 0.7, 0.70, 0.30], [1, -2.2, -2.9, 0.45, 0.05], [1, 3.2, 2.6, -0.30, -0.65]].forEach(function (q) {
            for (b = 1; b <= 2; b++) g.strokeRect(M.X(q[2]), M.Z(q[3], b), M.X(q[1]) - M.X(q[2]), M.Z(q[4], b) - M.Z(q[3], b));
          });
          for (s = -1; s <= 1; s += 2) g.strokeRect(M.X(-1.6), M.bandY[3] + M.Y(s > 0 ? 0.70 : -0.25), M.X(-0.5) - M.X(-1.6), 0.45 * 26);
          for (b = 1; b <= 2; b++) for (s = 0; s < 10; s++) {
            g.fillStyle = "rgba(30,28,24,0.10)";
            g.fillRect(M.X(-1.6 - s * 0.3), M.Z(-0.55, b), 30 + s * 6, 1.5);
          }
        }) });
  }

  function build(THREE, M, C) {
    var K = EarlyJetKit(THREE), V = THREE;
    if (!SK) SK = skinCfg(K);
    var T = K.mats({ texture: SK.texture, rough: 0.40, metal: 0.58 }, C, "#b8bdc1");
    var root = new V.Group(); root.name = "super_mystere";
    /* stance from F's ratios (see the header): ground 1.53 m under the
       belly at the nose wheel (x 4.87), 1.24 m under it at the mains */
    var NX = 4.87, NBEL = sz(111), NGZ = NBEL - 1.03 * (sz(85) - sz(111));
    var MX = 0.225, MBEL = sz(114), MGZ = MBEL - 0.68 * (sz(82) - sz(114));
    var NR = 0.25, MR = 0.33, MY = 1.50;
    var g = K.stance(root, MX, MGZ, Math.atan2(MGZ - NGZ, NX - MX));
    var S = { skin: [], dark: [], metal: [], glass: [], team: [] };
    var G = { metal: [], tyre: [], door: [] };
    var i, s;

    /* ---- fuselage: side profile with the plan half-width at each station */
    var body = [];
    for (i = 0; i < SIDE.length; i++) {
      var r = SIDE[i], x = sx(r[0]);
      var hw = K.lerpTab(PLAN, 151.5 - x * SXP, 1) / SY;
      body.push(K.ls(x, 0, (sz(r[1]) + sz(r[2])) / 2, hw, (sz(r[1]) - sz(r[2])) / 2, 0.92));
    }
    K.push(S.skin, K.loft(body, 36, null, null));
    /* the intake: a wide oval, the duct face set back (A front, B, C) */
    var lip = body[0], l2 = body[2];
    K.push(S.skin, K.loft([K.ls(lip.x, 0, lip.zc, lip.w, lip.h, 0.92), K.ls(lip.x - 0.15, 0, l2.zc, lip.w * 0.84, lip.h * 0.80, 0.92)], 32, null, null));
    S.dark.push(K.foreDisc(lip.w * 0.84, lip.h * 0.80, 28, lip.x - 0.15, 0, l2.zc));
    /* the jet pipe and its nozzle under the fin (A, B) */
    var tail = body[body.length - 1], JX = tail.x - 0.18, JZ = tail.zc + 0.05;
    K.push(S.metal, K.loft([K.ls(tail.x + 0.05, 0, JZ, 0.44, 0.44, 1), K.ls(JX, 0, JZ, 0.40, 0.40, 1)], 26, null, null));
    S.dark.push(K.aftDisc(0.37, 24, JX + 0.03, 0, JZ));
    /* the ventral fairing under the nozzle (A rows 100-105) */
    S.skin.push(K.convex([[[tail.x + 0.6, -0.18, tail.zc - tail.h + 0.05], [tail.x + 0.6, 0.18, tail.zc - tail.h + 0.05], [tail.x - 0.25, 0.14, tail.zc - tail.h + 0.12], [tail.x - 0.25, -0.14, tail.zc - tail.h + 0.12]],
                          [[tail.x + 0.6, -0.18, tail.zc - tail.h - 0.04], [tail.x + 0.6, 0.18, tail.zc - tail.h - 0.04], [tail.x - 0.25, 0.14, tail.zc - tail.h + 0.02], [tail.x - 0.25, -0.14, tail.zc - tail.h + 0.02]]]));

    /* ---- canopy and fairing (A) */
    var SILL = sz(86), cs = [], fs = [];
    for (i = 0; i < CAN.length; i++) cs.push(K.ls(sx(CAN[i][0]), 0, SILL, CAN[i][2], Math.max(0.01, sz(CAN[i][1]) - SILL), 1));
    for (i = 0; i < FAIR.length; i++) fs.push(K.ls(sx(FAIR[i][0]), 0, SILL - 0.05, FAIR[i][2], sz(FAIR[i][1]) - SILL + 0.05, 0.95));
    K.push(S.glass, K.loft(cs, 26, 0.01, 0.01));
    K.push(S.skin, K.loft(fs, 22, null, 0.02));
    K.arch(S.dark, cs, sx(397), SILL, 0.022);
    K.arch(S.dark, cs, sx(373), SILL, 0.024);

    /* ---- wing (A plan + front), with the saw-tooth at y 3.3 */
    function wSec(y, sg, le) { return K.foil([le === undefined ? wLE(y) : le, sg * y, wZ(y)], [wTE(y), sg * y, wZ(y)], wT(y), [0, 0, 1]); }
    for (s = -1; s <= 1; s += 2) {
      S.skin.push(K.solid(wSec(0.5, s, wLE0(0.5)), wSec(1.19, s)));
      S.skin.push(K.solid(wSec(1.19, s), wSec(DT - 0.001, s)));
      S.skin.push(K.solid(wSec(DT, s), wSec(4.9, s)));
      S.skin.push(K.solid(wSec(4.9, s), wSec(WTIP, s, wLE(WTIP) - 0.10)));
      var tb = function (yy) {
        var h = wT(yy) * 0.5 + 0.012;
        return K.blk([wLE(yy), s * yy, wZ(yy)], [wTE(yy), s * yy, wZ(yy)], 0.25, 0.62, h, [0, 0, 1]);
      };
      S.team.push(K.solid(tb(4.05), tb(4.50)));
    }

    /* ---- tailplane part way up the fin (A plan, F) */
    for (s = -1; s <= 1; s += 2) {
      S.skin.push(K.solid(K.foil([tLE(0.05), s * 0.05, TZ], [tTE(0.05), s * 0.05, TZ], 0.09, [0, 0, 1]),
                          K.foil([tLE(1.6), s * 1.6, TZ], [tTE(1.6), s * 1.6, TZ], 0.06, [0, 0, 1])));
      S.skin.push(K.solid(K.foil([tLE(1.6), s * 1.6, TZ], [tTE(1.6), s * 1.6, TZ], 0.06, [0, 0, 1]),
                          K.foil([tLE(TTIP) - 0.10, s * TTIP, TZ], [tTE(TTIP), s * TTIP, TZ], 0.035, [0, 0, 1])));
    }
    /* ---- fin (A, above the tailplane x 0.905 measured off F) */
    for (i = 0; i < FIN.length - 1; i++) {
      var a = FIN[i], b = FIN[i + 1];
      var ta = 0.12 - 0.07 * i / (FIN.length - 1), tb2 = 0.12 - 0.07 * (i + 1) / (FIN.length - 1);
      S.skin.push(K.solid(K.foil([sx(a[1]), 0, fz(a[0])], [sx(a[2]), 0, fz(a[0])], ta, [0, 1, 0]),
                          K.foil([sx(b[1]), 0, fz(b[0])], [sx(b[2]), 0, fz(b[0])], tb2, [0, 1, 0])));
    }
    S.team.push(K.solid(K.foil([sx(213.5) + 0.02, 0, fz(49.5)], [sx(196.5) - 0.02, 0, fz(49.5)], 0.075, [0, 1, 0]),
                        K.foil([sx(205) + 0.02, 0, fz(46.4)], [sx(193.5) - 0.02, 0, fz(46.4)], 0.07, [0, 1, 0])));

    /* ---- the detail pass: fittings B, C and D show that the first pass
       left out (see "Detail pass" in the header) */
    var at = function (x) { return K.secAt(body, x); };
    S.lampR = []; S.lampG = [];
    /* the canopy's sill rails and the windscreen's centre frame (B) */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < CAN.length - 1; i++) S.dark.push(K.bar([sx(CAN[i][0]), s * CAN[i][2] * 1.02, SILL + 0.01], [sx(CAN[i + 1][0]), s * CAN[i + 1][2] * 1.02, SILL + 0.01], 0.02, 5));
    }
    S.dark.push(K.bar([sx(404) - 0.02, 0, SILL + 0.02], [sx(397), 0, sz(81.5) + 0.02], 0.02, 5));
    /* the two pitot probes under the intake (C) */
    for (s = -1; s <= 1; s += 2) {
      var pb = K.secAt(body, lip.x - 0.70), pz0 = pb.zc - pb.h * 0.97 - 0.01;
      S.metal.push(K.bar([lip.x - 0.75, s * 0.28, pz0 - 0.03], [lip.x - 0.06, s * 0.28, pz0 - 0.03], 0.016, 5));
      S.metal.push(K.bar([lip.x - 0.70, s * 0.28, pz0 - 0.03], [lip.x - 0.64, s * 0.28, pz0 + 0.06], 0.02, 5));
    }
    /* the 30 mm DEFA ports low on the nose sides and their louvred vents (B) */
    for (s = -1; s <= 1; s += 2) {
      var gs = at(5.2), gy = gs.w * 0.86, gz = gs.zc - gs.h * 0.50;
      S.dark.push(K.box(0.30, 0.10, 0.09, 5.30, s * gy, gz));
      for (i = 0; i < 5; i++) S.dark.push(K.box(0.03, 0.04, 0.12, 4.20 - i * 0.07, s * at(4.1).w * 0.98, at(4.1).zc - at(4.1).h * 0.30));
      /* nav lights at the wingtips, port red */
      (s > 0 ? S.lampR : S.lampG).push(K.cyl(0.035, 0.04, 0.14, 8, "x", wLE(WTIP) - 0.30, s * (WTIP - 0.07), wZ(WTIP)));
    }
    /* aerials: a blade on the spine behind the canopy fairing, one under the
       belly, a whip aft (B: the spine aerials) */
    var sp = at(1.6), bp = at(-1.0);
    S.skin.push(K.solid([[1.75, -0.012, sp.zc + sp.h - 0.02], [1.45, -0.012, sp.zc + sp.h - 0.02], [1.32, -0.012, sp.zc + sp.h + 0.22], [1.45, -0.012, sp.zc + sp.h + 0.22]],
                        [[1.75, 0.012, sp.zc + sp.h - 0.02], [1.45, 0.012, sp.zc + sp.h - 0.02], [1.32, 0.012, sp.zc + sp.h + 0.22], [1.45, 0.012, sp.zc + sp.h + 0.22]]));
    S.skin.push(K.solid([[-0.8, -0.012, bp.zc - bp.h + 0.02], [-1.1, -0.012, bp.zc - bp.h + 0.02], [-1.22, -0.012, bp.zc - bp.h - 0.18], [-1.1, -0.012, bp.zc - bp.h - 0.18]],
                        [[-0.8, 0.012, bp.zc - bp.h + 0.02], [-1.1, 0.012, bp.zc - bp.h + 0.02], [-1.22, 0.012, bp.zc - bp.h - 0.18], [-1.1, 0.012, bp.zc - bp.h - 0.18]]));
    var wp = at(-3.0);
    S.dark.push(K.bar([-3.0, 0, wp.zc + wp.h - 0.02], [-3.25, 0, wp.zc + wp.h + 0.55], 0.010, 4));
    S.lampR.push(K.cyl(0.05, 0.05, 0.05, 8, "z", -0.3, 0, at(-0.3).zc + at(-0.3).h + 0.01));
    /* the jet pipe's inner liner and the nozzle's lip ring (A, B) */
    S.metal.push(K.cyl(0.41, 0.41, 0.05, 26, "x", JX + 0.01, 0, JZ));
    S.dark.push(K.cyl(0.36, 0.36, 0.30, 20, "x", JX + 0.18, 0, JZ));
    /* the tail cone's fuel vent and the fin's rudder hinge fairing */
    S.metal.push(K.bar([JX - 0.05, 0, JZ + 0.46], [JX - 0.30, 0, JZ + 0.42], 0.025, 5));

    K.mesh(g, S.skin, T.skin, "skin", SK.projUV);
    K.mesh(g, S.dark, T.dark, "dark");
    K.mesh(g, S.metal, T.metal, "metal");
    K.mesh(g, S.glass, T.glass, "glass");
    K.mesh(g, S.team, T.team, "team");
    K.mesh(g, S.lampR, new V.MeshStandardMaterial({ color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 }), "lamp_red");
    K.mesh(g, S.lampG, new V.MeshStandardMaterial({ color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 }), "lamp_green");

    /* ---- gear (stations and track: see NOT CONFIRMED; legs and doors B, D) */
    var gr = new V.Group(); gr.name = "gear"; g.add(gr);
    var NZC = NGZ + NR;
    K.wheel(G, NX, 0, NZC, NR, 0.16);
    G.metal.push(K.bar([NX + 0.12, 0, NBEL + 0.05], [NX + 0.05, 0, NZC + 0.22], 0.055, 10));
    G.metal.push(K.bar([NX + 0.05, 0, NZC + 0.24], [NX, 0.10, NZC], 0.026, 6));
    G.metal.push(K.bar([NX + 0.05, 0, NZC + 0.24], [NX, -0.10, NZC], 0.026, 6));
    G.metal.push(K.bar([NX - 0.55, 0, NBEL + 0.04], [NX + 0.08, 0, NZC + 0.75], 0.026, 6));
    for (s = -1; s <= 1; s += 2) G.door.push(K.box(0.95, 0.02, 0.40, NX - 0.05, s * 0.22, NBEL - 0.17, s * 0.12));
    var MZC = MGZ + MR, LY = MY + 0.12;
    for (s = -1; s <= 1; s += 2) {
      var wb = wZ(LY) - wT(LY) * 0.35;
      K.wheel(G, MX, s * MY, MZC, MR, 0.22);
      G.metal.push(K.bar([MX + 0.10, s * LY, wb], [MX, s * LY, MZC + 0.06], 0.07, 10));
      G.metal.push(K.bar([MX - 0.70, s * (LY - 0.05), wb], [MX, s * LY, MZC + 0.80], 0.032, 6));
      G.metal.push(K.bar([MX, s * LY, MZC], [MX, s * (MY - 0.10), MZC], 0.045, 8));
      /* the big outer leg door (D) */
      G.door.push(K.solid([[MX + 0.42, s * (LY + 0.12), wb - 0.02], [MX - 0.40, s * (LY + 0.12), wb - 0.02], [MX - 0.30, s * (LY + 0.12), MZC + 0.30], [MX + 0.34, s * (LY + 0.12), MZC + 0.30]],
                          [[MX + 0.42, s * (LY + 0.14), wb - 0.02], [MX - 0.40, s * (LY + 0.14), wb - 0.02], [MX - 0.30, s * (LY + 0.14), MZC + 0.30], [MX + 0.34, s * (LY + 0.14), MZC + 0.30]]));
    }
    /* the detail pass: hub faces and bolts, brakes, the main legs' torque
       links, the nose leg's taxi lamp and its mudguard (B, D) */
    function hubs(x, y, z, r, w) {
      for (var q = -1; q <= 1; q += 2) {
        G.metal.push(K.cyl(r * 0.62, r * 0.66, 0.025, 16, "y", x, y + q * (w / 2 + 0.006), z));
        for (var k = 0; k < 6; k++) G.dark.push(K.cyl(0.012, 0.012, 0.03, 5, "y", x + Math.cos(k * Math.PI / 3) * r * 0.40, y + q * (w / 2 + 0.018), z + Math.sin(k * Math.PI / 3) * r * 0.40));
      }
    }
    G.dark = [];
    hubs(NX, 0, NZC, NR, 0.16);
    G.door.push(K.box(0.42, 0.24, 0.02, NX, 0, NZC + NR + 0.06));
    G.metal.push(K.box(0.06, 0.10, 0.08, NX + 0.10, 0, NZC + 0.55));
    for (s = -1; s <= 1; s += 2) {
      hubs(MX, s * MY, MZC, MR, 0.22);
      G.dark.push(K.cyl(MR * 0.55, MR * 0.55, 0.05, 12, "y", MX, s * (MY - 0.135), MZC));
      var lb = [MX + 0.03, s * LY, MZC + 0.32], lk = [MX + 0.20, s * LY, MZC + 0.20];
      G.metal.push(K.bar([MX + 0.01, s * LY, MZC + 0.10], lk, 0.018, 5), K.bar(lk, lb, 0.018, 5));
    }
    K.mesh(gr, G.dark, T.dark, "gear_dark");
    K.mesh(gr, G.metal, T.metal, "gear_metal");
    K.mesh(gr, G.tyre, T.tyre, "gear_tyres");
    K.mesh(gr, G.door, T.door, "gear_doors");
    return root;
  }
  return { build: build };
})();


/* ==========================================================================
   HeroVenom - de Havilland Venom FB.4 (gbr_e50_cas)

   References:
     A "De Havilland Venom FB1 3-view silhouette.jpg" (Commons, 936 x 1216
       px): plan (nose up, tip tanks, booms, tailplane between the booms),
       side (gear up), front. The pod, wing, tanks, booms and tailplane are
       read off A:
         plan  x = (614 - row) / 64.0    nose row 303 -> +4.86
               y = (478 - col) / 65.9    tanks' outer edges cols 59 / 896:
                                         837 px = the published 12.70 m
         side  x = (488.5 - col) / 64.85 nose col 174 -> +4.85, rudder
                                         col 803: 629 px = the published
                                         FB.1 length 9.70 m (31 ft 10 in)
               z = (1118 - row) / 64.85  row 1118 = the wing's chord plane
       A's front view puts the booms at +-1.52 m, its plan at +-0.96 m. The
       plan is used: photograph B's tailplane overhang outboard of the near
       boom, over the boom spacing, is 0.7; A's plan gives 0.55 and its
       front view 0.19.
     A2 "De Havilland Venom 3-view line drawing.png" (Commons, 2008, NF.3
       with an FB.1 profile): the NF.3 side view DRAWS THE GEAR on a ground
       line and has the FB.4-type tail (the extended rudders below the
       booms, the fin without the FB.1 acorn). Its scale bars disagree with
       each other by 7 %, so its scale is taken from the tip tank (A front
       31 px = 0.47 m; A2 front 28.5 px): 60.6 px/m. The fins and the
       rudders' extension below the booms, the main wheel station (5.92 m
       ahead of the rudder trailing edge), the wheels (main 0.59 m, nose
       0.43 m) and the wheelbase (3.53 m) are A2's.
     A3 "De Havilland Venom FB.4 three-view silhouette.png" (535 x 250 px):
       confirms the FB.4 tail outline (rudders below the booms).
     B "DH.112 Venom FB4 WR540 Ringway 25.03.56 edited-2.jpg": an RAF FB.4
       in service (1956), near profile: camouflage upper surfaces, the
       stance, the nose wheel right under the nose cone, the tip tanks.
     D "De Havilland DH112 Venom FB.4 'J-1704' (40111290543).jpg" (Swiss
       FB.4 in a museum, 3/4 front): the wing-root intakes, canopy framing,
       the tip tanks' pointed tails, the fins; its tail sits on a museum
       support, so it was NOT used for the stance.
     E "Fairford 1987 Venom WR410 (ex J-1790).jpg" (in flight, from below):
       the booms, fins and tailplane overhang, the jet pipe.
     H en.wikipedia "de Havilland Venom" (FB.1 specification): length
       31 ft 10 in (9.70 m), span 41 ft 8 in (12.70 m), height 6 ft 2 in
       (1.88 m), wing area 279 sq ft.

   THE HEIGHT. H's 1.88 m (6 ft 2 in) cannot be the height to the fin tips:
   A2's drawn gear puts the fin tips 2.54 m above the ground, and at ONE
   station, the tail, (fin tip - boom bottom) / (boom bottom - ground) is
   1.17 in A2 and 1.2 in photograph B (in service, camera low). At ONE
   station, the nose wheel, belly-to-ground over pod depth is 1.0 in B.
   Those two ratios set the parked attitude of A's airframe: 2.7 deg
   nose-up relative to A's own datum (A's booms rise toward the tail more
   than A2's do). The fins then stand about 2.5 m. 1.88 m is not fitted.
   THE LENGTH. The brief's 10.06 m (33 ft) is not supported: A gives
   length / span 0.75 (9.54 m on the 12.70 m span), A3 0.73, and A agrees
   with H's FB.1 figure 9.70 m to 1.6 %. A2's FB.4-type rudder ends where
   A's does. The model is 9.76 m (9.70 m as drawn, the rest is the
   stance pitch carrying the fin tips aft).

   Recognition list: 1 the short pod with the bubble canopy and the jet
   pipe at its tail (A, B, D); 2 the twin booms from the wing to the twin
   fins, joined by the tailplane that overhangs them (A, E); 3 the straight
   wing, swept on the leading edge only, with big permanent tip tanks (A,
   B, D); 4 the wing-root intakes either side of the pod (A, D); 5 the
   FB.4 fins with the rudders reaching below the booms (A2, A3); 6 the
   nose wheel right under the nose and the mains just outboard of the
   booms (A2, B) [gear]; 7 RAF Dark Green / Dark Sea Grey over silver (B).
   No roundels, fin flashes, serials or the Suez stripes.

   NOT CONFIRMED:
     - THE MAIN TRACK: no reference draws it. A's plan shows the wheel
       wells outboard of the booms, centred at y 2.02; the wheel is put at
       y 1.45 under the leg pivot just outboard of the boom (B shows the
       wheel close outboard of the boom). Track 2.9 m.
     - the nose wheel at x 4.55 (A2's wheelbase gives 4.60; B and D put
       the tyre's front under the nose cone).
     - the 1.9 deg dihedral is A's front view only.
     - the pod half-widths under the wing (A's plan is solid there; 0.76 m
       is held from the last visible station).
     - the wing-root intake mouths' extent (A plan slots y 0.3 to 1.3; D).
     - the camouflage pattern (generic disruptive blobs) and demarcation.
   DETAIL PASS: added the seat headrest, mirror and canopy sill rails, a
   blade aerial above and one below the pod, the tip tanks' position lights
   and the fin-tip tail lights, the jet pipe's liner and lip ring, hub
   faces with bolts, brakes, brake lines and torque links (B, D, E); seams
   with rivet rows, the wing spars and access panels, tank fuel caps, rain
   and oil streaks on the skin. The aerials' places and the small parts'
   sizes are NOT confirmed.
   Not drawn: the gun ports' blast tubes (only dark slots), pitot,
   underwing rails and stores.
   ======================================================================== */

var HeroVenom = (function () {
  "use strict";
  var PXS = 64.0, PYS = 65.9, SXS = 64.85, NFS = 60.6;
  function sx(c) { return (488.5 - c) / SXS; }
  function sz(r) { return (1118 - r) / SXS; }
  function prx(r) { return (614 - r) / PXS; }

  /* pod (A side): [col, top row, bottom row]; top = sill under the canopy */
  var SIDE = [[175, 1118, 1132], [180, 1109, 1140], [195, 1099, 1147], [210, 1092, 1151], [225, 1088, 1153],
              [240, 1087, 1154], [270, 1081, 1156], [300, 1076, 1157], [330, 1071, 1158], [360, 1064, 1158],
              [390, 1062, 1157], [420, 1062, 1157], [450, 1061, 1156], [480, 1063, 1153], [510, 1068, 1148],
              [540, 1075, 1140], [570, 1084, 1130], [595, 1093, 1121], [607, 1099, 1115]];
  /* pod half-widths (A plan) [row, half px] */
  var PLAN = [[303, 4], [315, 17], [330, 24], [345, 29], [360, 33], [375, 36], [390, 38.5], [405, 40.5],
              [420, 44], [435, 48], [460, 50], [540, 50], [600, 46], [630, 40], [660, 32], [690, 28], [705, 22], [718, 15]];
  /* canopy: [col, top row, half-width m] on the sill line */
  var CAN = [[226, 1087, 0.06], [240, 1076, 0.22], [255, 1065, 0.30], [270, 1055, 0.33], [285, 1050, 0.34],
             [300, 1048, 0.34], [315, 1051, 0.33], [330, 1055, 0.30], [345, 1061, 0.20], [358, 1064, 0.05]];

  /* wing (A plan, front) */
  var WR = 0.62, BY = 0.96, WTIP = 5.86;
  function wLE(y) { return 2.745 - 0.326 * y; }
  function wTE(y) { return y >= BY ? -0.44 : -0.44 - (BY - y) * 2.4; }
  function wZ(y)  { return 0.10 + 0.033 * (y - 0.76); }               /* 1.9 deg (A front) */
  function wT(y)  { return (wLE(y) - (y >= BY ? -0.44 : -0.44)) * (0.10 - 0.025 * y / WTIP); }
  var TKY = 6.11, TKR = 0.25, TKX0 = prx(495), TKX1 = prx(690);
  /* booms (A plan y 0.96; A side centre line, radius 0.16 aft of the wing) */
  var BOOM = [[1.31, 0.10, 0.05], [0.90, 0.13, 0.20], [0.20, 0.17, 0.26], [-0.44, 0.24, 0.22],
              [-1.72, 0.35, 0.17], [-3.34, 0.49, 0.16], [-4.40, 0.58, 0.155], [-4.70, 0.60, 0.13]];
  function boomZ(x) { return K0.lerpTab(BOOM, x, 1); }
  /* tailplane between and outboard of the booms (A plan rows 855-925) */
  var TPLE = prx(855), TPTE = prx(925), TPY = 2.03;
  /* FB.4 fin (A2): [row, LE col, TE col] in A2 pixels; z above A2's boom
     bottom (row 307), x from the rudder trailing edge (col 1228) */
  var FIN = [[307, 1182, 1224], [292, 1060, 1226], [285, 1090, 1227], [276, 1120, 1228], [266, 1140, 1226],
             [251, 1160, 1223], [240, 1168, 1220], [232, 1175, 1214], [227, 1180, 1205], [225, 1186, 1197]];
  var RUD = [[307, 1182, 1224], [318, 1196, 1218]];
  var K0 = null;

  var SK = null;
  function skinCfg(K) {
    var Z_DEM = 0.0;
    return K.skin({ XMIN: -5.1, XMAX: 5.1, YMAX: 6.5, ZTOP: 2.4, ZSPAN: 3.4, PXM: 48, PYM: 24,
      draw: function (g, M) {
        /* RAF Dark Green / Dark Sea Grey over High Speed Silver (B), as
           gb_hunter.js has them */
        var P = { green: "#46502f", grey: "#565e63", silver: "#a3a8aa" }, s = 61873, i, b;
        function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
        function blob(cx, cy, rx, ry) {
          var n = 12, pts = [], k;
          for (k = 0; k < n; k++) { var a = 2 * Math.PI * k / n, f = 0.70 + 0.45 * R(); pts.push([cx + Math.cos(a) * rx * f, cy + Math.sin(a) * ry * f]); }
          g.beginPath(); g.moveTo((pts[0][0] + pts[n - 1][0]) / 2, (pts[0][1] + pts[n - 1][1]) / 2);
          for (k = 0; k < n; k++) { var q = pts[(k + 1) % n]; g.quadraticCurveTo(pts[k][0], pts[k][1], (pts[k][0] + q[0]) / 2, (pts[k][1] + q[1]) / 2); }
          g.closePath(); g.fill();
        }
        g.fillStyle = P.grey; g.fillRect(0, 0, M.TW, M.TOPH);
        g.fillStyle = P.green;
        for (i = 0; i < 18; i++) blob(M.X(-5 + i * 0.6 + R() * 0.3), (0.1 + 0.8 * R()) * M.TOPH, (0.7 + R() * 0.6) * 48, (1.0 + R() * 1.6) * 24);
        for (b = 1; b <= 2; b++) {
          var zd = M.Z(Z_DEM, b);
          g.fillStyle = P.grey; g.fillRect(0, M.bandY[b], M.TW, zd - M.bandY[b]);
          g.fillStyle = P.green;
          for (i = 0; i < 10; i++) blob(M.X(-5 + i * 1.0 + R() * 0.4), Math.min(M.bandY[b] + (0.15 + R() * 0.4) * M.SIDEH, zd - 6), (0.6 + R() * 0.5) * 48, (0.08 + R() * 0.08) * M.SIDEH);
          g.fillStyle = P.silver; g.fillRect(0, zd, M.TW, M.bandY[b] + M.SIDEH - zd);
        }
        g.fillStyle = P.silver; g.fillRect(0, M.bandY[3], M.TW, M.TOPH);
        g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1;
        var FR = [4.2, 3.4, 2.4, 1.2, 0.0, -0.9];
        for (b = 1; b <= 2; b++) for (i = 0; i < FR.length; i++) {
          var X = M.X(FR[i]); g.beginPath(); g.moveTo(X, M.Z(0.8, b)); g.lineTo(X, M.Z(-0.8, b)); g.stroke();
        }
        for (b = 0; b <= 3; b += 3) for (var sg = -1; sg <= 1; sg += 2) {
          var Yb = function (yy) { return M.bandY[b] + M.Y(sg * yy); };
          g.beginPath(); g.moveTo(M.X(-0.15), Yb(1.2)); g.lineTo(M.X(-0.15), Yb(3.4)); g.stroke();
          g.beginPath(); g.moveTo(M.X(-0.12), Yb(3.5)); g.lineTo(M.X(-0.12), Yb(5.6)); g.stroke();
        }
        /* the detail pass: seams with rivet rows on the pod, the booms and
           the wing spars, access panels, tank fuel caps, rain streaks down
           the pod sides and oil streaks under the pod (B, D) */
        function seam(x0, y0, x1, y1) {
          g.strokeStyle = "rgba(0,0,0,0.26)"; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
          g.fillStyle = "rgba(40,44,48,0.35)";
          var L = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)), n = Math.floor(L / 4), j;
          for (j = 0; j <= n; j++) g.fillRect(x0 + (x1 - x0) * j / Math.max(n, 1) + 1.5, y0 + (y1 - y0) * j / Math.max(n, 1) + 1.5, 1, 1);
        }
        for (b = 1; b <= 2; b++) {
          seam(M.X(-1.0), M.Z(0.35, b), M.X(4.6), M.Z(0.35, b));
          seam(M.X(-1.0), M.Z(-0.40, b), M.X(4.4), M.Z(-0.40, b));
          for (i = 0; i < FR.length; i++) seam(M.X(FR[i]) + 2, M.Z(0.75, b), M.X(FR[i]) + 2, M.Z(-0.75, b));
          seam(M.X(-4.7), M.Z(0.40, b), M.X(0.0), M.Z(0.25, b));
          g.strokeStyle = "rgba(0,0,0,0.30)";
          g.strokeRect(M.X(3.6), M.Z(-0.15, b), 0.7 * 48, 0.25 / 3.4 * M.SIDEH);
          g.strokeRect(M.X(1.0), M.Z(0.50, b), 0.6 * 48, 0.22 / 3.4 * M.SIDEH);
          for (i = 0; i < 16; i++) {
            var rx0 = M.X(-1 + R() * 5.5), ry0 = M.Z(0.6 - R() * 1.0, b);
            var rg = g.createLinearGradient(0, ry0, 0, ry0 + 12 + R() * 12);
            rg.addColorStop(0, "rgba(30,28,24,0.12)"); rg.addColorStop(1, "rgba(30,28,24,0)");
            g.fillStyle = rg; g.fillRect(rx0, ry0, 1 + R() * 2, 24);
          }
        }
        for (b = 0; b <= 3; b += 3) for (var sg2 = -1; sg2 <= 1; sg2 += 2) {
          var Yq = function (yy) { return M.bandY[b] + M.Y(sg2 * yy); };
          seam(M.X(wLE(1.0) - 0.40), Yq(1.0), M.X(wLE(5.8) - 0.30), Yq(5.8));
          seam(M.X(0.35), Yq(1.0), M.X(0.30), Yq(5.8));
          seam(M.X(-4.6), Yq(0.96), M.X(1.2), Yq(0.96));
          for (i = 0; i < 4; i++) {
            var yy = 1.4 + i * 1.1;
            g.strokeStyle = "rgba(0,0,0,0.22)";
            g.strokeRect(M.X(0.9), Yq(yy) - 3, 0.30 * 48, 6);
          }
          if (b === 0) { g.fillStyle = "rgba(0,0,0,0.35)"; g.fillRect(M.X(0.6), Yq(6.11) - 2, 5, 5); }
        }
        for (i = 0; i < 12; i++) {
          var ox = M.X(0.2 - R() * 1.0), oy2 = M.bandY[3] + M.Y((R() - 0.5) * 0.8);
          var og = g.createLinearGradient(ox, 0, ox - 40 - R() * 40, 0);
          og.addColorStop(0, "rgba(26,22,16,0.22)"); og.addColorStop(1, "rgba(26,22,16,0)");
          g.fillStyle = og; g.fillRect(ox - 80, oy2, 80, 2 + R() * 2);
        }
        var gr = g.createLinearGradient(M.X(-1.6), 0, M.X(-0.6), 0);
        gr.addColorStop(0, "rgba(24,20,16,0.45)"); gr.addColorStop(1, "rgba(24,20,16,0)");
        g.fillStyle = gr; g.fillRect(M.X(-1.6), M.TOPH, M.X(-0.6) - M.X(-1.6), M.TH - M.TOPH);
        for (i = 0; i < 50; i++) {
          g.fillStyle = "rgba(24,20,16," + (0.03 + R() * 0.05).toFixed(3) + ")";
          g.fillRect(R() * M.TW, R() * M.TH, 8 + R() * 30, 2 + R() * 5);
        }
      } });
  }

  function build(THREE, M, C) {
    var K = EarlyJetKit(THREE), V = THREE;
    K0 = K;
    if (!SK) SK = skinCfg(K);
    var T = K.mats({ texture: SK.texture, rough: 0.72, metal: 0.15 }, C, "#565e63");
    var root = new V.Group(); root.name = "venom";
    var S = { skin: [], dark: [], metal: [], glass: [], team: [] };
    var G = { metal: [], tyre: [], door: [] };
    var i, s;

    /* ---- STANCE (header): B's ratios at the nose and the tail */
    var NX = 4.55, NR = 0.215, MX = 1.07, MR = 0.295, MY = 1.45;
    var nBel = sz(1146), nTop = sz(1099);
    var NGZ = nBel - 1.0 * (nTop - nBel);                    /* nose station, B: 1.0 */
    var finTopAbove = (307 - 225) / NFS;                     /* A2: fin tip over the boom bottom */
    var xT = -4.6, bBot = boomZ(xT) - 0.155;
    var TGZ = bBot - finTopAbove / 1.2;                      /* tail station, B: 1.2 */
    var pitch = Math.atan2(TGZ - NGZ, NX - xT);              /* the ground in A's frame rises aft */
    var MGZ = NGZ + (TGZ - NGZ) * (NX - MX) / (NX - xT);
    var g = K.stance(root, MX, MGZ, pitch);

    /* ---- pod */
    var body = [];
    for (i = 0; i < SIDE.length; i++) {
      var r = SIDE[i], x = sx(r[0]);
      var hw = K.lerpTab(PLAN, 614 - x * PXS, 1) / PYS;
      body.push(K.ls(x, 0, (sz(r[1]) + sz(r[2])) / 2, hw, (sz(r[1]) - sz(r[2])) / 2, 0.97));
    }
    K.push(S.skin, K.loft(body, 34, 0.03, null));
    var tail = body[body.length - 1], JX = tail.x - 0.10;
    K.push(S.metal, K.loft([K.ls(tail.x + 0.02, 0, tail.zc, 0.21, 0.21, 1), K.ls(JX, 0, tail.zc, 0.20, 0.20, 1)], 22, null, null));
    S.dark.push(K.aftDisc(0.18, 20, JX + 0.02, 0, tail.zc));
    /* the four 20 mm Hispano ports under the nose (A side marks; B) */
    for (s = -1; s <= 1; s += 2) {
      S.dark.push(K.box(0.30, 0.05, 0.05, sx(212), s * 0.22, sz(1146), 0, 0, -s * 0.15));
      S.dark.push(K.box(0.30, 0.05, 0.05, sx(222), s * 0.12, sz(1151), 0, 0, -s * 0.10));
    }

    /* ---- canopy (A side, D) */
    var cs = [];
    for (i = 0; i < CAN.length; i++) {
      var sill = sz(K.lerpTab(SIDE, CAN[i][0], 1));
      cs.push(K.ls(sx(CAN[i][0]), 0, sill, CAN[i][2], Math.max(0.01, sz(CAN[i][1]) - sill), 1));
    }
    K.push(S.glass, K.loft(cs, 24, 0.01, 0.01));
    K.arch(S.dark, cs, sx(242), sz(1087), 0.02);
    K.arch(S.dark, cs, sx(300), sz(1076), 0.018);

    /* ---- wing: pod to boom, boom to tip; the root intakes (A, D) */
    function wSec(y, sg) { return K.foil([wLE(y), sg * y, wZ(y)], [wTE(y), sg * y, wZ(y)], wT(y), [0, 0, 1]); }
    for (s = -1; s <= 1; s += 2) {
      S.skin.push(K.solid(wSec(WR, s), wSec(BY, s)));
      S.skin.push(K.solid(wSec(BY, s), wSec(3.0, s)));
      S.skin.push(K.solid(wSec(3.0, s), wSec(WTIP, s)));
      var mo = function (y0, y1, dx) {
        return [[wLE(y0) + dx, s * y0, wZ(y0) + wT(y0) * 0.30], [wLE(y1) + dx, s * y1, wZ(y1) + wT(y1) * 0.30],
                [wLE(y1) + dx, s * y1, wZ(y1) - wT(y1) * 0.25], [wLE(y0) + dx, s * y0, wZ(y0) - wT(y0) * 0.25]];
      };
      S.dark.push(K.solid(mo(0.66, 0.88, 0.01), mo(0.66, 0.88, -0.25)));
      S.dark.push(K.solid(mo(1.08, 1.30, 0.01), mo(1.08, 1.30, -0.25)));
      /* the tip tank (A plan; B, D: rounded nose, pointed tail) */
      K.push(S.skin, K.revolve([[0.5, 0.05], [0.45, 0.55], [0.34, 0.88], [0.15, 1.0], [-0.10, 0.97], [-0.30, 0.72], [-0.44, 0.32], [-0.5, 0.03]],
                               TKX0 - TKX1, TKR, (TKX0 + TKX1) / 2, s * TKY, wZ(TKY), 20));
      var tb = function (yy) {
        var h = wT(yy) * 0.5 + 0.012;
        return K.blk([wLE(yy), s * yy, wZ(yy)], [wTE(yy), s * yy, wZ(yy)], 0.25, 0.60, h, [0, 0, 1]);
      };
      S.team.push(K.solid(tb(4.7), tb(5.15)));
    }

    /* ---- booms (A plan, side) */
    for (s = -1; s <= 1; s += 2) {
      var bs = [];
      for (i = 0; i < BOOM.length; i++) bs.push(K.ls(BOOM[i][0], s * BY, BOOM[i][1], BOOM[i][2], BOOM[i][2], 1));
      K.push(S.skin, K.loft(bs, 18, 0.25, 0.10));
    }
    /* ---- tailplane between the booms, overhanging them (A plan, E) */
    var TPZ = bBot + (307 - 283) / NFS;
    S.skin.push(K.solid(K.foil([TPLE, TPY - 0.25, TPZ], [TPTE, TPY - 0.25, TPZ], 0.07, [0, 0, 1]),
                        K.foil([TPLE, -TPY + 0.25, TPZ], [TPTE, -TPY + 0.25, TPZ], 0.07, [0, 0, 1])));
    for (s = -1; s <= 1; s += 2)
      S.skin.push(K.solid(K.foil([TPLE, s * (TPY - 0.25), TPZ], [TPTE, s * (TPY - 0.25), TPZ], 0.07, [0, 0, 1]),
                          K.foil([TPLE - 0.25, s * TPY, TPZ], [TPTE + 0.12, s * TPY, TPZ], 0.03, [0, 0, 1])));
    /* ---- FB.4 fins and the rudders below the booms (A2, A3) */
    function fx(c) { return -4.85 + (1228 - c) / NFS; }
    function fzz(rw) { return bBot + (307 - rw) / NFS; }
    for (s = -1; s <= 1; s += 2) {
      for (i = 1; i < FIN.length - 1; i++) {
        var a = FIN[i], b = FIN[i + 1], ta = 0.10 - 0.05 * i / FIN.length, tb2 = 0.10 - 0.05 * (i + 1) / FIN.length;
        S.skin.push(K.solid(K.foil([fx(a[1]), s * BY, fzz(a[0])], [fx(a[2]), s * BY, fzz(a[0])], ta, [0, 1, 0]),
                            K.foil([fx(b[1]), s * BY, fzz(b[0])], [fx(b[2]), s * BY, fzz(b[0])], tb2, [0, 1, 0])));
      }
      S.skin.push(K.solid(K.foil([fx(RUD[0][1]), s * BY, fzz(RUD[0][0]) + 0.05], [fx(RUD[0][2]), s * BY, fzz(RUD[0][0]) + 0.05], 0.07, [0, 1, 0]),
                          K.foil([fx(RUD[1][1]), s * BY, fzz(RUD[1][0])], [fx(RUD[1][2]), s * BY, fzz(RUD[1][0])], 0.04, [0, 1, 0])));
      S.team.push(K.solid(K.foil([fx(1176) + 0.02, s * BY, fzz(231)], [fx(1215) - 0.02, s * BY, fzz(231)], 0.08, [0, 1, 0]),
                          K.foil([fx(1182) + 0.02, s * BY, fzz(226)], [fx(1203) - 0.02, s * BY, fzz(226)], 0.07, [0, 1, 0])));
    }

    /* ---- the detail pass (see "Detail pass" in the header): the seat
       headrest, the mirror, the canopy's sill rails, a blade aerial on the
       pod behind the canopy and one under it, the tip tanks' position
       lights (port red), the white tail lights on the fin tips, the jet
       pipe's liner and lip ring (B, D, E) */
    S.lampR = []; S.lampG = [];
    var atv = function (x) { return K.secAt(body, x); };
    var sAt = atv(sx(312));
    S.dark.push(K.box(0.15, 0.40, 0.26, sx(318), 0, sAt.zc + sAt.h + 0.14));
    S.metal.push(K.box(0.03, 0.10, 0.04, sx(244), 0, sz(1072)));
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < cs.length - 1; i++) S.dark.push(K.bar([cs[i].x, s * cs[i].w * 1.02, cs[i].zc + 0.01], [cs[i + 1].x, s * cs[i + 1].w * 1.02, cs[i + 1].zc + 0.01], 0.016, 5));
    var spv = atv(1.0), bpv = atv(0.0);
    S.skin.push(K.solid([[1.15, -0.012, spv.zc + spv.h - 0.02], [0.90, -0.012, spv.zc + spv.h - 0.02], [0.80, -0.012, spv.zc + spv.h + 0.22], [0.92, -0.012, spv.zc + spv.h + 0.22]],
                        [[1.15, 0.012, spv.zc + spv.h - 0.02], [0.90, 0.012, spv.zc + spv.h - 0.02], [0.80, 0.012, spv.zc + spv.h + 0.22], [0.92, 0.012, spv.zc + spv.h + 0.22]]));
    S.skin.push(K.solid([[0.15, -0.012, bpv.zc - bpv.h + 0.02], [-0.10, -0.012, bpv.zc - bpv.h + 0.02], [-0.20, -0.012, bpv.zc - bpv.h - 0.15], [-0.08, -0.012, bpv.zc - bpv.h - 0.15]],
                        [[0.15, 0.012, bpv.zc - bpv.h + 0.02], [-0.10, 0.012, bpv.zc - bpv.h + 0.02], [-0.20, 0.012, bpv.zc - bpv.h - 0.15], [-0.08, 0.012, bpv.zc - bpv.h - 0.15]]));
    for (s = -1; s <= 1; s += 2) {
      (s > 0 ? S.lampR : S.lampG).push(K.cyl(0.03, 0.03, 0.10, 8, "x", (TKX0 + TKX1) / 2 + 0.3, s * (TKY + TKR * 0.85), wZ(TKY)));
      S.glass.push(K.cyl(0.025, 0.03, 0.05, 8, "x", -4.62, s * BY, boomZ(-4.62)));
    }
    S.metal.push(K.cyl(0.215, 0.215, 0.03, 22, "x", JX + 0.015, 0, tail.zc));
    S.dark.push(K.cyl(0.17, 0.17, 0.22, 18, "x", JX + 0.14, 0, tail.zc));

    K.mesh(g, S.skin, T.skin, "skin", SK.projUV);
    K.mesh(g, S.dark, T.dark, "dark");
    K.mesh(g, S.metal, T.metal, "metal");
    K.mesh(g, S.glass, T.glass, "glass");
    K.mesh(g, S.team, T.team, "team");
    K.mesh(g, S.lampR, new V.MeshStandardMaterial({ color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 }), "lamp_red");
    K.mesh(g, S.lampG, new V.MeshStandardMaterial({ color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 }), "lamp_green");

    /* ---- gear (A2 wheels and wheelbase; B; track NOT CONFIRMED) */
    var gr = new V.Group(); gr.name = "gear"; g.add(gr);
    var NGZx = NGZ + (TGZ - NGZ) * 0;                         /* the nose station is NX itself */
    var NZC = NGZx + NR;
    K.wheel(G, NX, 0, NZC, NR, 0.13);
    G.metal.push(K.bar([NX - 0.10, 0, nBel + 0.06], [NX - 0.04, 0, NZC + 0.18], 0.045, 10));
    G.metal.push(K.bar([NX - 0.04, 0, NZC + 0.20], [NX, 0.08, NZC], 0.022, 6));
    G.metal.push(K.bar([NX - 0.04, 0, NZC + 0.20], [NX, -0.08, NZC], 0.022, 6));
    for (s = -1; s <= 1; s += 2) G.door.push(K.box(0.55, 0.02, 0.26, NX - 0.25, s * 0.15, nBel - 0.10, s * 0.10));
    var MZC = MGZ + MR;
    for (s = -1; s <= 1; s += 2) {
      var LY = MY - 0.06, wb = wZ(LY) - wT(LY) * 0.35;
      K.wheel(G, MX, s * MY, MZC, MR, 0.17);
      G.metal.push(K.bar([MX + 0.05, s * LY, wb], [MX, s * LY, MZC + 0.05], 0.055, 10));
      G.metal.push(K.bar([MX - 0.45, s * LY, wb], [MX, s * LY, MZC + 0.45], 0.026, 6));
      G.metal.push(K.bar([MX, s * LY, MZC], [MX, s * (MY + 0.08), MZC], 0.04, 8));
      G.door.push(K.solid([[MX + 0.30, s * (LY - 0.09), wb - 0.02], [MX - 0.30, s * (LY - 0.09), wb - 0.02], [MX - 0.25, s * (LY - 0.09), MZC + 0.20], [MX + 0.25, s * (LY - 0.09), MZC + 0.20]],
                          [[MX + 0.30, s * (LY - 0.11), wb - 0.02], [MX - 0.30, s * (LY - 0.11), wb - 0.02], [MX - 0.25, s * (LY - 0.11), MZC + 0.20], [MX + 0.25, s * (LY - 0.11), MZC + 0.20]]));
    }
    /* the detail pass: hub faces and bolts, brakes and brake lines, the
       legs' torque links (B) */
    G.dark = [];
    function hubs(x, y, z, r, w) {
      for (var q = -1; q <= 1; q += 2) {
        G.metal.push(K.cyl(r * 0.62, r * 0.66, 0.025, 16, "y", x, y + q * (w / 2 + 0.006), z));
        for (var k = 0; k < 6; k++) G.dark.push(K.cyl(0.010, 0.010, 0.03, 5, "y", x + Math.cos(k * Math.PI / 3) * r * 0.40, y + q * (w / 2 + 0.018), z + Math.sin(k * Math.PI / 3) * r * 0.40));
      }
    }
    hubs(NX, 0, NZC, NR, 0.13);
    G.metal.push(K.bar([NX - 0.02, 0, NZC + 0.24], [NX + 0.09, 0, NZC + 0.34], 0.012, 5), K.bar([NX + 0.09, 0, NZC + 0.34], [NX - 0.05, 0, NZC + 0.44], 0.012, 5));
    for (s = -1; s <= 1; s += 2) {
      var ly3 = s * (MY - 0.06);
      hubs(MX, s * MY, MZC, MR, 0.17);
      G.dark.push(K.cyl(MR * 0.55, MR * 0.55, 0.04, 12, "y", MX, s * (MY - 0.105), MZC));
      var lk3 = [MX + 0.15, ly3, MZC + 0.20], lb3 = [MX + 0.03, ly3, MZC + 0.34];
      G.metal.push(K.bar([MX + 0.01, ly3, MZC + 0.10], lk3, 0.015, 5), K.bar(lk3, lb3, 0.015, 5));
      G.dark.push(K.bar([MX + 0.07, ly3 + s * 0.05, wZ(MY) - 0.10], [MX + 0.02, ly3 + s * 0.05, MZC + 0.12], 0.008, 4));
    }
    K.mesh(gr, G.dark, T.dark, "gear_dark");
    K.mesh(gr, G.metal, T.metal, "gear_metal");
    K.mesh(gr, G.tyre, T.tyre, "gear_tyres");
    K.mesh(gr, G.door, T.door, "gear_doors");
    return root;
  }
  return { build: build };
})();

/* len: the measured x extent of each model as dumped (the stance pitch
   moves the fin tips aft a few cm): 14.20 / 10.73 / 9.76 m */
UNIT_MODELS["fra_e50_fighter"] = { len: 14.20, build: function (THREE, M, C) { return HeroSuperMystere.build(THREE, M, C); } };
UNIT_MODELS["fra_e50_cas"]     = { len: 10.73, build: function (THREE, M, C) { return HeroOuragan.build(THREE, M, C); } };
UNIT_MODELS["gbr_e50_cas"]     = { len: 9.76,  build: function (THREE, M, C) { return HeroVenom.build(THREE, M, C); } };
