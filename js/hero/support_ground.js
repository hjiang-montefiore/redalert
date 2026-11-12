/* ===== support_ground.js - HERO models: the support ground units every army fields ==========
   Seven rows (js/rules.js), one file, one shared kit.  Each row's basis vehicle, its references
   and what is NOT CONFIRMED are given in its own section below.

     supply_r   "M977 HEMTT" (roc)               js/hero/us_hemtt.js CALLED (HeroUsHemtt.build), its paint
                                                 material swapped for plain ROC green afterwards
     supply_c   "SX2306 Logistics Truck" (pla)   Shaanxi SX2306 (HMV3 8x8), drawn here
     supply_k   "Sungri-58 Truck" (kpa)          the GAZ-51 the Sungri-58 copies, drawn here (no GAZ-51 or
                                                 ZIL truck exists in js/hero)
     mcv        "Mobile Construction Vehicle"    STAND-IN: Oshkosh M1075A1 PLS 10x10 with its Container
                (fac both)                       Handling Unit and a 20 ft ISO container, drawn here
     repair     "Armoured Recovery Vehicle"      STAND-IN: BREM-1 on the T-72A hull; js/hero/ru_t72.js
                (fac both)                       CALLED (HeroT72.build "a"), turret and skirts taken off
     mineclear  "Mine-Clearing Vehicle (plough   STAND-IN: Rheinmetall Keiler flail on the M48A2 hull;
                and flail)" (fac both)           js/hero/us_m48.js CALLED (HeroM48.build), turret taken off
     minelayer  "Armoured Mine-Laying Vehicle"   STAND-IN: GMZ-3 tracked minelayer, drawn here
                (fac both)

   The four fac:"both" rows are CROSS-ARMY STAND-INS: every army fields the same model, so one real
   vehicle was picked per row from its desc and painted a neutral olive (#575b3d), with the team
   colour only in small strips.  Why each was chosen is in its section.

   Load order: after js/hero/us_hemtt.js, js/hero/ru_t72.js and js/hero/us_m48.js (HeroUsHemtt,
   HeroT72 and HeroM48 are looked up when a model is BUILT, not when this file loads, so a missing
   host only fails that row's build).

   Contract: +X nose, +Y port, +Z up, metres, ground at z = 0.  "roadwheel" groups: tracked, one per
   axle station holding both sides (the hosts' own groups are kept); wheeled, one per axle holding
   both wheels (the HEMTT keeps its own eight single-wheel groups).  No row has a "turret": none of
   the seven basis vehicles has a trainable weapon station on the photographs used (the mineclear
   row's "hmg" has nothing to train on the Keiler, which carries no gun).  ASCII only.

   DETAIL PASS: the paint canvas (paintTex) now carries plate seams with lit edges, bolt rows, access
   panels, rain streaks, grime, dust, chips and oil spots over the base and its blots - every row,
   the three hosts' swapped skins included.  Fittings added per row (gazDetail, sxDetail, plsDetail,
   bremDetail, keilerDetail, gmzDetail; the shared grab / leaf / lash / liftEye / towCable helpers):
   listed above each function.  supply_r adds no geometry (the HEMTT host is not this file's).  Every
   added size is read off the row's references by proportion: NOT CONFIRMED. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSupportGround = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* paints: plain, no markings */
  var P_OLIVE = { base: "#575b3d", blots: ["#4f5337", "#5f6343"], seed: 4401 };   /* neutral olive, the "both" rows */
  var P_ROC = { base: "#55603f", blots: ["#4d5739", "#5d6845"], seed: 4402 };     /* ROC army green               */
  var P_PLA = { base: "#525c3a", blots: ["#4a5434", "#5a6442"], seed: 4403 };     /* PLA green (as the PLA heroes) */
  var P_KPA = { base: "#4b5535", blots: ["#434c2f", "#535e3b"], seed: 4404 };     /* KPA green                    */

  /* ------------------------------------------------------------ geometry kit (pla_type63_apc.js) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
      }
    }
  };
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c, fn;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(fn, fn) < 1e-14) continue;
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    var t;
    if (x0 > x1) { t = x0; x0 = x1; x1 = t; }
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
    if (z0 > z1) { t = z0; z0 = z1; z1 = t; }
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  /* a bar of rectangular section th (in XZ) from (x0, z0) to (x1, z1), y0..y1 */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  /* a square bar of half side h between two 3D points */
  function bar(bin, A, B, h) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = unit(cross(ax, t)), v = cross(ax, u);
    var c = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2], l = Math.sqrt(dot(sub(B, A), sub(B, A))) / 2;
    slab(bin, c, ax, u, v, l, h, h);
  }
  /* a pane on the segment (x0, z0)-(x1, z1) in XZ, centred on y with half width hy, stood off the
     surface it lies on by 0.02 m toward +X (the windscreens: the glass must not share the cab's plane) */
  function pane(bin, x0, z0, x1, z1, y, hy) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), n = [dz / l, 0, -dx / l];
    if (n[0] < 0) n = [-n[0], 0, -n[2]];
    slab(bin, [(x0 + x1) / 2 + n[0] * 0.02, y, (z0 + z1) / 2 + n[2] * 0.02], [dx / l, 0, dz / l], [0, 1, 0], n, l / 2 - 0.04, hy, 0.01);
  }
  function cyl(bin, A, B, r0, r1, seg, nocap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    if (!nocap) {
      base = V.length; na = [-ax[0], -ax[1], -ax[2]];
      V.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, V, F, N);
  }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a closed solid lofted through convex rings of [x, y, z] points; ends capped */
  function loftN(bin, L) {
    var V = [], F = [], n = L[0].length, m = L.length, i, k;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) V.push(L[k][i]);
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + (i + 1) % n, d = (k + 1) * n + i;
        F.push([a, b, c], [a, c, d]);
      }
    for (i = 1; i + 1 < n; i++) { F.push([0, i + 1, i]); F.push([(m - 1) * n, (m - 1) * n + i, (m - 1) * n + i + 1]); }
    solid(bin, V, F);
  }
  /* a chamfered section across Y at station x: half width hw, z0..z1, top corners cut by c */
  function secX(x, hw, z0, z1, c) {
    return [[x, -hw, z0], [x, hw, z0], [x, hw, z1 - c], [x, hw - c, z1], [x, -(hw - c), z1], [x, -hw, z1 - c]];
  }
  /* a horizontal section at height z: front x xf, back x xb, half width hw, front corners cut cx by cy */
  function secZ(z, xf, xb, hw, cx, cy) {
    return [[xb, -hw, z], [xf - cx, -hw, z], [xf, -hw + cy, z], [xf, hw - cy, z], [xf - cx, hw, z], [xb, hw, z]];
  }

  /* ------------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* DETAIL PAINT (the detail pass): a 512 px tile over 2.94 m of surface (UVs 0.34 a metre, 174 px a
     metre).  Over the base colour and its soft blots: plate seams with a lit edge, bolt rows along some
     of them, access-panel outlines with corner screws, rain streaks, grime, dust, chipped paint and oil
     spots.  Plain paint - no markings, numbers or camouflage. */
  function paintTex(THREE, P) {
    var key = P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var S = 512, cv = document.createElement("canvas"), q, R = rng(P.seed * 7 + 13), i, k, x, y, w, h, ox, oy, a, xs, n;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      /* soft mottling in the base's own shades, drawn wrapped so the tile repeats without a seam */
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 20; i++) {
          x = R() * S; y = R() * S; w = 26 + R() * 90; h = 16 + R() * 60; a = R() * Math.PI;
          q.globalAlpha = 0.22 + R() * 0.3;
          for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
            if (x + ox < -w - 4 || x + ox > S + w + 4 || y + oy < -w - 4 || y + oy > S + w + 4) continue;
            q.beginPath(); q.ellipse(x + ox, y + oy, w, h, a, 0, TAU); q.fill();
          }
        }
      }
      /* plate seams: four vertical butts across the tile, horizontal seams staggered between them */
      xs = [];
      for (i = 0; i < 4; i++) xs.push(Math.floor(i * 128 + 20 + R() * 80) + 0.5);
      for (i = 0; i < 4; i++) {
        q.globalAlpha = 1; q.strokeStyle = "rgba(14,15,10,0.42)"; q.lineWidth = 2;
        q.beginPath(); q.moveTo(xs[i], 0); q.lineTo(xs[i], S); q.stroke();
        q.strokeStyle = "rgba(255,250,225,0.12)"; q.lineWidth = 1;
        q.beginPath(); q.moveTo(xs[i] + 2, 0); q.lineTo(xs[i] + 2, S); q.stroke();
        y = Math.floor(60 + R() * 120) + 0.5;
        for (k = 0; k < 2; k++) {
          var xa = xs[i], xb = i < 3 ? xs[i + 1] : xs[0] + S;
          q.strokeStyle = "rgba(14,15,10,0.38)"; q.lineWidth = 2;
          q.beginPath(); q.moveTo(xa, y); q.lineTo(xb, y); q.stroke();
          q.beginPath(); q.moveTo(xa - S, y); q.lineTo(xb - S, y); q.stroke();
          q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1;
          q.beginPath(); q.moveTo(xa, y + 2); q.lineTo(xb, y + 2); q.stroke();
          /* a bolt row along every other seam */
          if ((i + k) % 2 === 0) for (x = xa + 8; x < xb - 4; x += 15) {
            q.fillStyle = "rgba(12,12,8,0.45)"; q.fillRect(x % S, y - 6, 3, 3);
            q.fillStyle = "rgba(255,250,225,0.18)"; q.fillRect(x % S, y - 7, 2, 1);
          }
          y = (y + 200 + Math.floor(R() * 60)) % S;
        }
      }
      /* access panels: outlined, a screw at each corner */
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * (S - 90)) + 10.5; y = Math.floor(R() * (S - 70)) + 10.5; w = 26 + Math.floor(R() * 60); h = 18 + Math.floor(R() * 44);
        q.strokeStyle = "rgba(14,15,10,0.36)"; q.lineWidth = 1.5; q.strokeRect(x, y, w, h);
        q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1; q.strokeRect(x + 1.5, y + 1.5, w, h);
        q.fillStyle = "rgba(12,12,8,0.5)";
        q.fillRect(x + 3, y + 3, 2, 2); q.fillRect(x + w - 5, y + 3, 2, 2); q.fillRect(x + 3, y + h - 5, 2, 2); q.fillRect(x + w - 5, y + h - 5, 2, 2);
      }
      q.globalAlpha = 1;
      /* rain streaks down the plates (side faces carry v along z) */
      for (i = 0; i < 260; i++) {
        q.fillStyle = (i % 4) ? "rgba(18,16,10,0.08)" : "rgba(230,225,200,0.06)";
        q.fillRect(R() * S, R() * S, 1 + R() * 2, 8 + R() * 54);
      }
      /* grime and dust patches */
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 3) ? "rgba(30,25,15,0.08)" : "rgba(150,135,100,0.08)";
        q.beginPath(); q.ellipse(R() * S, R() * S, 8 + R() * 46, 4 + R() * 22, R() * Math.PI, 0, TAU); q.fill();
      }
      /* chipped paint and scratches */
      for (i = 0; i < 180; i++) {
        q.fillStyle = (i % 2) ? "rgba(205,200,175,0.22)" : "rgba(10,10,8,0.30)";
        n = 1 + Math.floor(R() * 3); q.fillRect(R() * S, R() * S, n, n);
      }
      q.strokeStyle = "rgba(210,205,180,0.14)"; q.lineWidth = 1;
      for (i = 0; i < 14; i++) { x = R() * S; y = R() * S; q.beginPath(); q.moveTo(x, y); q.lineTo(x + (R() - 0.5) * 40, y + (R() - 0.5) * 14); q.stroke(); }
      /* oil and fuel spots */
      for (i = 0; i < 8; i++) {
        q.fillStyle = "rgba(12,10,6,0.16)";
        q.beginPath(); q.ellipse(R() * S, R() * S, 5 + R() * 12, 4 + R() * 9, 0, 0, TAU); q.fill();
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function paintMat(THREE, PA) {
    var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 }), tx = paintTex(THREE, PA);
    if (tx) m.map = tx; else m.color.set(PA.base);
    return m;
  }
  function materials(THREE, C, PA) {
    var T = {}, VC = THREE.VertexColors !== undefined ? THREE.VertexColors : true;
    T.paint = paintMat(THREE, PA);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.14, metalness: 0.35 });
    T.vc = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.05, vertexColors: VC });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.04, vertexColors: VC });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             vc: new Bin(T.vc, false, true), team: new Bin(T.team, false) };
  }
  function flush(THREE, group, B) {
    var k, b, geo, m;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      geo.computeBoundingSphere();
      m = new THREE.Mesh(geo, b.mat);
      m.castShadow = true; m.receiveShadow = true;
      group.add(m);
    }
  }
  function hex2rgb(h, k) { return [parseInt(h.substr(1, 2), 16) / 255 * k, parseInt(h.substr(3, 2), 16) / 255 * k, parseInt(h.substr(5, 2), 16) / 255 * k]; }

  /* a host's own painted material (the one carrying the canvas map, not vertex-coloured) is swapped
     for this file's plain paint; a host mesh whose material matches `drop` is taken out */
  function repaint(g, mat, drop) {
    var kill = [];
    g.traverse(function (o) {
      if (!o.isMesh || !o.material) return;
      if (drop && drop(o.material)) { kill.push(o); return; }
      if (o.material.map && !o.material.vertexColors) o.material = mat;
    });
    kill.forEach(function (o) { o.parent.remove(o); });
  }
  function dropNamed(g, name) {
    var hit = [];
    g.children.forEach(function (o) { if (o.name === name) hit.push(o); });
    hit.forEach(function (o) { g.remove(o); });
  }

  /* --------------------------------------------- truck wheel: tyre with block lugs, disc, hub */
  var TYRE = [0.11, 0.11, 0.115], RIM = [0.17, 0.18, 0.15];
  function truckWheel(W, y, R, w, s, disc, hubCol) {
    var i, a, ca, sa, yo = y + s * w / 2, yi = y - s * w / 2, n = Math.max(24, Math.round(R * 52));
    W.col = TYRE;
    cyl(W, [0, yi, 0], [0, yo, 0], R - 0.035, R - 0.035, 24);
    cyl(W, [0, yi - s * 0.012, 0], [0, yi + s * 0.03, 0], R - 0.09, R - 0.05, 24);
    cyl(W, [0, yo - s * 0.03, 0], [0, yo + s * 0.012, 0], R - 0.05, R - 0.09, 24);
    for (i = 0; i < n; i++) {                       /* the tread blocks, staggered */
      a = (i + 0.5) / n * TAU; ca = Math.cos(a); sa = Math.sin(a);
      slab(W, [ca * (R - 0.025), y + s * ((i % 2) ? 0.18 : -0.18) * w, sa * (R - 0.025)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca],
           0.022, w * 0.30, R * TAU / n * 0.28);
    }
    W.col = hubCol || RIM;
    cyl(W, [0, yo - s * 0.03, 0], [0, yo + s * 0.005, 0], disc, disc, 20);
    cyl(W, [0, yo, 0], [0, yo + s * 0.05, 0], disc * 0.36, disc * 0.30, 12);
    W.col = [0.09, 0.09, 0.09];
    for (i = 0; i < 8; i++) { a = i / 8 * TAU; cyl(W, [Math.cos(a) * disc * 0.55, yo, Math.sin(a) * disc * 0.55], [Math.cos(a) * disc * 0.55, yo + s * 0.025, Math.sin(a) * disc * 0.55], 0.018, 0.018, 6); }
  }
  function wheelGroup(THREE, g, T, x, z, fill) {
    var W = new Bin(T.wheel, false, true), wg = new THREE.Group();
    fill(W);
    wg.name = "roadwheel";
    wg.position.set(x, 0, z);
    flush(THREE, wg, { w: W });
    g.add(wg);
  }

  /* ---------------------------------------------- DETAIL PASS: small fittings shared by the rows */
  /* a U grab handle from A to B, standing off by the vector o */
  function grab(D, A, B, o, h) {
    var A2 = [A[0] + o[0], A[1] + o[1], A[2] + o[2]], B2 = [B[0] + o[0], B[1] + o[1], B[2] + o[2]];
    bar(D, A, A2, h || 0.012); bar(D, B, B2, h || 0.012); bar(D, A2, B2, h || 0.012);
  }
  /* a leaf spring under a frame rail: plates shortening downward, the eyes at the ends */
  function leaf(D, xc, y, zt, half) {
    var k;
    for (k = 0; k < 4; k++) box(D, xc - half * (1 - k * 0.22), xc + half * (1 - k * 0.22), y - 0.035, y + 0.035, zt - 0.025 * (k + 1), zt - 0.025 * k);
    cylY(D, xc - half, y - 0.04, y + 0.04, zt - 0.01, 0.03, 8);
    cylY(D, xc + half, y - 0.04, y + 0.04, zt - 0.01, 0.03, 8);
  }
  /* a lashing ring on a side rail (side s) */
  function lash(D, x, y, z, s) { box(D, x - 0.03, x + 0.03, s > 0 ? y : y - 0.025, s > 0 ? y + 0.025 : y, z - 0.03, z - 0.02); box(D, x - 0.03, x - 0.02, s > 0 ? y : y - 0.025, s > 0 ? y + 0.025 : y, z - 0.07, z - 0.02); box(D, x + 0.02, x + 0.03, s > 0 ? y : y - 0.025, s > 0 ? y + 0.025 : y, z - 0.07, z - 0.02); }
  /* a lifting eye on a deck */
  function liftEye(D, x, y, z) { box(D, x - 0.04, x + 0.04, y - 0.015, y + 0.015, z, z + 0.05); cylY(D, x, y - 0.017, y + 0.017, z + 0.06, 0.035, 8); }
  /* a coiled tow cable lying along a side face y (side s): two runs with an eye at each end */
  function towCable(D, x0, x1, y, z0, z1, s) {
    var o = s * 0.03;
    bar(D, [x0, y + o, z0], [x1, y + o, z0], 0.018); bar(D, [x0, y + o, z1], [x1, y + o, z1], 0.018);
    cylY(D, x0, y, y + o * 2, (z0 + z1) / 2, (z1 - z0) / 2 + 0.02, 10);
    cylY(D, x1, y, y + o * 2, (z0 + z1) / 2, (z1 - z0) / 2 + 0.02, 10);
    box(D, (x0 + x1) / 2 - 0.03, (x0 + x1) / 2 + 0.03, s > 0 ? y : y - 0.06, s > 0 ? y + 0.06 : y, z0 - 0.03, z1 + 0.03);
  }
  var AMBER = [0.78, 0.48, 0.12], REDL = [0.55, 0.10, 0.08], LENS = [0.78, 0.76, 0.62];

  /* ------------------------------------------------ generic cargo: drums and strapped crates */
  var DRUM = [0.24, 0.27, 0.17], BAND = [0.16, 0.18, 0.12], CRATE = [0.40, 0.40, 0.26], WOOD = [0.42, 0.34, 0.22], STRAP = [0.10, 0.10, 0.09];
  function drum(B, x, y, z) {
    B.vc.col = DRUM; cylZ(B.vc, x, y, z, z + 0.88, 0.29, 12);
    B.vc.col = BAND; cylZ(B.vc, x, y, z + 0.30, z + 0.34, 0.30, 12); cylZ(B.vc, x, y, z + 0.56, z + 0.60, 0.30, 12);
  }
  function crate(B, x0, x1, y0, y1, z0, z1) {
    B.vc.col = CRATE; box(B.vc, x0, x1, y0, y1, z0, z1);
    B.vc.col = STRAP;
    box(B.vc, x0 + (x1 - x0) * 0.3 - 0.025, x0 + (x1 - x0) * 0.3 + 0.025, y0 - 0.005, y1 + 0.005, z0, z1 + 0.008);
    box(B.vc, x0 + (x1 - x0) * 0.7 - 0.025, x0 + (x1 - x0) * 0.7 + 0.025, y0 - 0.005, y1 + 0.005, z0, z1 + 0.008);
  }

  /* =====================================================================================
     supply_r - M977 HEMTT (roc).  The ROC row is the same truck as supply_n: js/hero/us_hemtt.js
     is CALLED as it stands (its header holds the references, the station table and the
     NOT CONFIRMED list).  Its one canvas-painted material (the tan CARC body) is swapped for
     plain ROC army green (#55603f, the e80 ROC ground paint of js/hero/roc_ground.js); the wheels,
     frame shadows, lamps and the generic load keep the host's own materials.  Nothing is added.
     HeroUsHemtt has no paint option of its own: the swap is done on the built group.
     ===================================================================================== */
  function buildHemttRoc(THREE, M, C) {
    var g = HeroUsHemtt.build(THREE, M, C);
    g.name = "supply_r";
    repaint(g, paintMat(THREE, P_ROC));
    return g;
  }

  /* =====================================================================================
     supply_k - "Sungri-58 Truck": the GAZ-51 4x2 2.5 t cargo truck, which the Tokchon plant built
     from 1958 as the Sungri-58 (ru.wikipedia "GAZ-51": "Severnaya Koreya (Tokchon) as Sungri-58";
     en.wikipedia "GAZ-51" aka list).  No GAZ-51 / ZIL cargo truck exists in js/hero to reuse.
     References (Wikimedia Commons; cached in scratchpad/q_supg_ref):
       [S] "1976. Gaz-51.jpg" (USSR 1976 3-kopek stamp "GAZ-51 1946") - an exact side elevation,
           port side: THE STATION TABLE.  Scaled off the published 3,300 mm wheelbase: 184 px a
           metre; its tyres then measure 0.92 m (7.50-20: 0.93 m) and its platform 2.96 m (the
           GAZ-51 platform is 2.94 m inside), so the drawing is taken as true.
       [F] "GAZ-51 main variant.jpg" (museum, port front 3/4): the narrow hood with its vertical
           grille bars, the separate pontoon front fenders, the round headlamps set into the
           fender fronts, the plain bar bumper with two tow hooks, the split windscreen.
       [K] "SUNGRI 58 NORTH KOREAN TRUCK ... PYONGYANG ... OCT 2012 (8639998473).jpg" - a Sungri-58,
           port rear 3/4: the same cab and fenders in green, the plank drop-side body with its stakes,
           dual rear tyres on plain disc wheels, the round tail lamps.  (That truck has had a second
           rear axle added: the model keeps the 4x2 of [S] and the published figures.)
     Published (ru.wikipedia infobox): length 5,715, width 2,280, height 2,130 mm, wheelbase 3,300,
       track 1,589 front / 1,650 rear.
     Recognition: the long narrow hood between free-standing curved front fenders [S][F]; the tall
       vertical-barred grille [F]; the headlamps in the fender fronts [F]; the rounded cab with a
       two-pane screen [S][F]; the running board [S]; the plank body with stakes [S][K]; dual rears [K].
     Paint: KPA green (#4b5535, [K] lit #4d7a52 taken down to a field green); no numbers or
       slogans ([K] carries plates and lettering: not drawn).
     Load: drums and crates (the row: "hauling fuel drums and shell crates") - generic cargo.
     LENGTH: [S] measures 5.35 m bumper to tailboard; the published 5,715 mm is 0.36 m longer
       (the GAZ-51A's longer platform, or over the hitch): the drawing is followed, not stretched.
       Height: [S] gives 2.00 m to the cab roof against the published 2.13 m (laden / unladen
       attitude is not stated): not fitted.
     NOT CONFIRMED: cab, hood and fender half widths (0.96 / 0.42-0.56 / 1.00 m, from [F]'s
       proportions, no front drawing); the spare tyre's lateral place (under the body behind the
       cab in [S], drawn on the centre line); the tool box (port side under the tail in [S]); the
       body's floor height (1.09 m off [S]).
     Nodes: two "roadwheel" groups (front axle; rear axle with its duals).  Materials 5 + wheel.
     ===================================================================================== */
  var GZ = { XF: 1.90, XR: -1.40, R: 0.46 };
  function gzX(px) { return 1.90 + (355 - px) / 184; }        /* [S]: x from the stamp's pixel column */
  function gzZ(py) { return (500 - py) / 184; }                /* [S]: z from the stamp's pixel row    */
  function addGaz(B) {
    var s, i, a, x, y, P = B.paint, D = B.dark, G = B.glass;
    var XG = gzX(240), XC = gzX(440), XB = gzX(630);           /* grille face 2.53, cowl 1.44, cab back 0.41 */
    /* chassis frame and cross members */
    for (s = -1; s <= 1; s += 2) box(D, gzX(215), gzX(1175), s * 0.40, s * 0.48, 0.66, 0.86);
    [2.45, 0.5, -0.8, -2.0, -2.55].forEach(function (cx) { box(D, cx - 0.05, cx + 0.05, -0.40, 0.40, 0.70, 0.84); });
    /* front bumper and its two tow hooks [S][F] */
    box(D, gzX(212), gzX(200), -0.98, 0.98, 0.60, 0.73);
    for (s = -1; s <= 1; s += 2) { box(D, gzX(206), gzX(196), s * 0.40 - 0.03, s * 0.40 + 0.03, 0.70, 0.82); }
    /* hood: lofted, narrow at the grille, a rounded top falling slightly forward [S][F] */
    loftN(P, [secX(XG + 0.02, 0.42, 0.90, gzZ(228), 0.10), secX(XG - 0.30, 0.48, 0.90, gzZ(224), 0.12),
              secX(XC + 0.02, 0.56, 0.90, gzZ(214), 0.12)]);
    /* the grille: a tall panel with vertical bars [F] */
    box(P, XG, XG + 0.04, -0.40, 0.40, 0.84, gzZ(232));
    for (i = 0; i < 11; i++) { y = -0.33 + i * 0.066; box(D, XG + 0.035, XG + 0.055, y - 0.012, y + 0.012, 0.90, gzZ(240)); }
    box(P, XG + 0.03, XG + 0.06, -0.40, 0.40, 0.84, 0.90);
    /* front fenders: free-standing, an arc of plates round the front wheel, then the flat to the
       running board [S][F] */
    var AR = [], n = 9, r = 0.60;
    for (i = 0; i <= n; i++) { a = (12 + i * (156 / n)) * Math.PI / 180; AR.push([GZ.XF + Math.cos(a) * r, GZ.R + Math.sin(a) * r]); }
    for (s = -1; s <= 1; s += 2) {
      var ya = s > 0 ? 0.56 : -1.00, yb = s > 0 ? 1.00 : -0.56;
      for (i = 0; i < n; i++) belt(P, AR[i][0], AR[i][1], AR[i + 1][0], AR[i + 1][1], ya, yb, 0.04);
      belt(P, AR[n][0], AR[n][1], XC - 0.02, 0.66, ya, yb, 0.04);
      belt(P, AR[0][0], AR[0][1], AR[0][0] + 0.10, 0.62, ya, yb, 0.04);
      /* the valance between fender and hood */
      box(P, XC, XG - 0.04, s > 0 ? 0.42 : -0.56, s > 0 ? 0.56 : -0.42, 0.88, 1.02);
      /* headlamps set into the fender fronts [F] */
      cyl(P, [XG - 0.06, s * 0.70, 1.00], [XG + 0.08, s * 0.70, 1.00], 0.12, 0.125, 16);
      cyl(G, [XG + 0.08, s * 0.70, 1.00], [XG + 0.095, s * 0.70, 1.00], 0.10, 0.10, 16);
      /* running board [S] */
      box(D, XB - 0.04, XC, s * 0.62, s * 1.00, 0.55, 0.58);
    }
    /* cab: horizontal sections - the cowl foot, the belt line, the windscreen foot and head, roof [S] */
    var CB = [
      secZ(gzZ(395), XC, XB, 0.94, 0.06, 0.06),
      secZ(gzZ(250), XC - 0.02, XB, 0.96, 0.10, 0.10),
      secZ(gzZ(232), XC - 0.04, XB, 0.96, 0.10, 0.10),
      secZ(gzZ(165), gzX(470), XB, 0.92, 0.14, 0.16),
      secZ(gzZ(140), gzX(500), XB + 0.04, 0.86, 0.16, 0.20),
      secZ(gzZ(133), gzX(530), XB + 0.10, 0.78, 0.16, 0.20)
    ];
    loftN(P, CB);
    /* the two-pane windscreen, the door windows, the small back window [S][F] */
    for (s = -1; s <= 1; s += 2) {
      pane(G, XC - 0.04, gzZ(232), gzX(470), gzZ(165), s * 0.44, 0.38);
      box(G, gzX(590), gzX(465), s > 0 ? 0.955 : -0.965, s > 0 ? 0.965 : -0.955, gzZ(240), gzZ(170));
      box(D, gzX(600), gzX(450), s > 0 ? 0.958 : -0.970, s > 0 ? 0.970 : -0.958, gzZ(397), gzZ(395));
      box(D, gzX(452), gzX(450), s > 0 ? 0.958 : -0.970, s > 0 ? 0.970 : -0.958, gzZ(395), gzZ(160));
      box(D, gzX(600), gzX(598), s > 0 ? 0.958 : -0.970, s > 0 ? 0.970 : -0.958, gzZ(395), gzZ(160));
      box(D, gzX(585), gzX(560), s > 0 ? 0.96 : -0.99, s > 0 ? 0.99 : -0.96, gzZ(268), gzZ(262));
      /* the mirror on its rod [F] */
      bar(D, [XC - 0.05, s * 0.95, 1.70], [XC + 0.05, s * 1.12, 1.80], 0.012);
      box(D, XC + 0.03, XC + 0.06, s * 1.08, s * 1.20, 1.74, 1.92);
    }
    box(D, (XC - 0.04 + gzX(470)) / 2 - 0.01, (XC - 0.04 + gzX(470)) / 2 + 0.02, -0.03, 0.03, gzZ(232), gzZ(165));
    box(G, XB - 0.012, XB + 0.005, -0.32, 0.32, gzZ(225), gzZ(180));
    /* the body: plank drop sides on a floor, stakes, cross bearers under it [S][K] */
    var BF = gzX(640), BR = gzX(1185), ZF = gzZ(300), ZT = gzZ(205), BW = 1.14;
    box(P, BR, BF, -BW, BW, ZF - 0.06, ZF);
    for (x = BF - 0.25; x > BR; x -= 0.55) box(D, x - 0.05, x + 0.05, -BW + 0.05, BW - 0.05, 0.86, ZF - 0.06);
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * BW, y1 = s * (BW - 0.04);
      box(P, BR, BF, y0, y1, ZF, ZT);
      for (i = 1; i < 3; i++) box(D, BR + 0.02, BF - 0.02, s * (BW + 0.003), s * (BW - 0.01), ZF + i * (ZT - ZF) / 3 - 0.012, ZF + i * (ZT - ZF) / 3 + 0.012);
      [gzX(655), gzX(830), gzX(1000), gzX(1175)].forEach(function (sx) { box(P, sx - 0.04, sx + 0.04, s * (BW + 0.03), s * (BW - 0.01), ZF - 0.08, ZT + 0.02); });
      box(P, BR, BF, s * (BW + 0.02), s * (BW - 0.04), ZT - 0.03, ZT + 0.02);
    }
    box(P, BF - 0.05, BF, -BW, BW, ZF, ZT + 0.10);                  /* headboard, a little higher */
    box(P, BR, BR + 0.05, -BW, BW, ZF, ZT);                          /* tailboard */
    for (i = 1; i < 3; i++) box(D, BR - 0.005, BR + 0.01, -BW + 0.02, BW - 0.02, ZF + i * (ZT - ZF) / 3 - 0.012, ZF + i * (ZT - ZF) / 3 + 0.012);
    /* the spare under the body behind the cab [S] */
    B.vc.col = TYRE; cylZ(B.vc, gzX(740), 0, gzZ(368), gzZ(325), 0.46, 18);
    B.vc.col = RIM; cylZ(B.vc, gzX(740), 0, gzZ(368) - 0.01, gzZ(325) + 0.005, 0.27, 14);
    /* the tool box under the tail, port side [S]; tail lamps [K]; the rear wheel guards */
    box(P, gzX(1160), gzX(1085), 0.60, 1.05, gzZ(400), gzZ(315));
    for (s = -1; s <= 1; s += 2) {
      cyl(D, [BR - 0.01, s * 0.85, 0.80], [BR - 0.06, s * 0.85, 0.80], 0.06, 0.06, 10);
      box(D, GZ.XR - 0.55, GZ.XR + 0.55, s * 0.55, s * 1.10, ZF - 0.10, ZF - 0.06);
    }
    /* the cargo: drums and crates */
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) drum(B, BF - 0.40 - i * 0.62, s * 0.55, ZF);
    crate(B, BR + 0.10, BR + 1.30, -1.05, -0.05, ZF, ZF + 0.62);
    crate(B, BR + 0.10, BR + 1.10, 0.05, 1.05, ZF, ZF + 0.50);
    /* team colour: a strip along the headboard top and on the tailboard */
    box(B.team, BF - 0.06, BF + 0.005, -0.70, 0.70, ZT + 0.06, ZT + 0.10);
    box(B.team, BR - 0.006, BR + 0.01, -0.60, 0.60, ZT - 0.14, ZT - 0.06);
  }
  /* DETAIL PASS ([S][F][K]): the hood's side louvres, its centre hinge and catches, the leaf springs
     and axle beams, the door handles and hinges, wipers, the roof's drip rail, the body's rope hooks
     and the tailboard's hinges and chains, mudflaps, the silencer, the rear tow hook.  Sizes from
     [S]'s proportions: NOT CONFIRMED. */
  function gazDetail(B) {
    var s, i, x, D = B.dark, XG = gzX(240), XC = gzX(440), XB = gzX(630), BF = gzX(640), BR = gzX(1185), ZF = gzZ(300), ZT = gzZ(205), BW = 1.14;
    function hw(xx) { return 0.42 + (XG + 0.02 - xx) / (XG - XC) * 0.14; }
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 7; i++) { x = 1.72 + i * 0.09; box(D, x - 0.018, x + 0.018, s > 0 ? hw(x) - 0.005 : -hw(x) - 0.012, s > 0 ? hw(x) + 0.012 : -hw(x) + 0.005, 1.10, 1.34); }
      box(D, 2.35, 2.42, s > 0 ? hw(2.38) : -hw(2.38) - 0.03, s > 0 ? hw(2.38) + 0.03 : -hw(2.38), 1.18, 1.22);
      leaf(D, GZ.XF, s * 0.44, 0.66, 0.55);
      leaf(D, GZ.XR, s * 0.44, 0.66, 0.68);
      /* the door: handle at its back edge, two hinges at the front (the door seams are [S]'s) */
      box(D, gzX(590), gzX(570), s > 0 ? 0.96 : -0.99, s > 0 ? 0.99 : -0.96, 1.36, 1.39);
      for (i = 0; i < 2; i++) box(D, gzX(458), gzX(446), s > 0 ? 0.96 : -0.985, s > 0 ? 0.985 : -0.96, 1.10 + i * 0.38, 1.18 + i * 0.38);
      /* the wiper parked at the pane's foot */
      bar(D, [XC - 0.02, s * 0.20, gzZ(232) + 0.04], [XC - 0.05, s * 0.62, gzZ(225)], 0.008);
      /* the drip rail over the door */
      box(D, gzX(600), gzX(470), s > 0 ? 0.90 : -0.94, s > 0 ? 0.94 : -0.90, gzZ(160), gzZ(155));
      /* rope hooks under the side planks, the tailboard's hinges and chains [K] */
      for (x = BF - 0.30; x > BR + 0.10; x -= 0.55) box(D, x - 0.025, x + 0.025, s > 0 ? BW : -BW - 0.04, s > 0 ? BW + 0.04 : -BW, ZF - 0.04, ZF + 0.01);
      box(D, BR - 0.02, BR + 0.06, s * (BW - 0.25) - 0.05, s * (BW - 0.25) + 0.05, ZF - 0.04, ZF + 0.02);
      bar(D, [BR - 0.01, s * (BW - 0.02), ZT - 0.02], [BR - 0.01, s * (BW - 0.02), ZT - 0.30], 0.008);
      /* mudflaps behind the rear duals */
      box(D, GZ.XR - 0.60, GZ.XR - 0.58, s * 0.55, s * 1.07, 0.30, 0.82);
    }
    /* the hood's centre hinge and the crank-handle hole in the grille [F] */
    bar(D, [XG + 0.01, 0, gzZ(228) + 0.004], [XC + 0.03, 0, gzZ(214) + 0.004], 0.012);
    cylX(D, XG + 0.04, XG + 0.07, 0, 0.78, 0.03, 8);
    /* axle beams and the rear differential, the silencer under the right side, the rear tow hook */
    cylY(D, GZ.XF, -0.62, 0.62, GZ.R, 0.05, 8);
    cylY(D, GZ.XR, -0.58, 0.58, GZ.R, 0.07, 10);
    box(D, GZ.XR - 0.16, GZ.XR + 0.16, -0.16, 0.16, 0.28, 0.62);
    cylX(D, -0.40, 0.30, -0.66, 0.58, 0.10, 12);
    cyl(D, [-0.40, -0.66, 0.58], [-0.70, -0.75, 0.50], 0.035, 0.035, 8);
    box(D, BR - 0.06, BR + 0.05, -0.06, 0.06, 0.66, 0.80);
    cylZ(D, BR - 0.03, 0, 0.62, 0.82, 0.025, 8);
  }
  function buildGaz(THREE, M, C) {
    var T = materials(THREE, C, P_KPA), g = new THREE.Group(), B = bins(T), hub = hex2rgb(P_KPA.base, 0.95);
    g.name = "supply_k";
    addGaz(B);
    gazDetail(B);
    flush(THREE, g, B);
    wheelGroup(THREE, g, T, GZ.XF, GZ.R, function (W) { var s; for (s = -1; s <= 1; s += 2) truckWheel(W, s * 0.795, GZ.R, 0.21, s, 0.28, hub); });
    wheelGroup(THREE, g, T, GZ.XR, GZ.R, function (W) {
      var s;
      for (s = -1; s <= 1; s += 2) { truckWheel(W, s * 0.70, GZ.R, 0.21, -s, 0.28, hub); truckWheel(W, s * 0.95, GZ.R, 0.21, s, 0.28, hub); }
    });
    return g;
  }

  /* =====================================================================================
     supply_c - Shaanxi SX2306, the 8x8 10-tonne member of the PLA's third-generation HMV3 truck
     family (en.wikipedia "Shaanxi HMV3": SX2220 6x6 and SX2306 8x8, armoured cab, independent
     suspension, inducted 2019; en.wikipedia "HQ-17": "a Shaanxi SX2306 reloading truck equipped
     with a crane").
     References (Wikimedia Commons; scratchpad/q_supg_ref):
       [Z] "Zastava 2024 - HQ-17AE vozilo za dotur - 01.jpg" - an SX2306 (Serbian HQ-17AE reload
           truck), starboard front 3/4: THE ONLY SX2306 PHOTOGRAPH FOUND.  The flat-faced armoured
           cab with its sloping chin and two-pane screen under black sun visors, the round convex
           mirrors on arms ahead of the screen, the square door mirror, the step under the door,
           the spare standing on edge behind the cab, the axles in two pairs, the flat deck with
           boxes, the folded knuckle crane at the tail and the stabiliser legs.
       [W] "SX2220 wrecker front.jpg" - the 6x6 sister in PLA green, port front: the same cab head-on
           (face, chin, visors, mirrors, the round badge), the plain disc wheels.
     Published: NONE of length, width or height (the en.wikipedia infobox leaves them blank; the
       WEG pages it cites could not be reached).  The model is scaled from an ASSUMED 1.24 m tyre
       (the 14.00R20 class of 10-tonne 8x8 trucks) and from proportions read through [Z]'s
       perspective: EVERY dimension below is NOT CONFIRMED.
     Recognition: the tall flat-faced cab, vertical above, the chin raked back below [Z][W]; the
       two-pane screen with a black visor over each pane [Z][W]; the round mirrors out front [Z][W];
       the spare on edge behind the cab [Z]; four axles, 2 + 2 [Z]; deck, crane, legs [Z].
     Cargo: the supply row's load is drawn as crates and drums on the deck (generic, as on the
       HEMTT); [Z] carries missile reload canisters, which are not drawn.
     Paint: PLA green (#525c3a; [W] is plain green; [Z]'s Serbian camouflage is not drawn).
     NOT CONFIRMED: all dimensions (tyre 1.24 m assumed; axle spacing 1.50 / 2.70 / 1.45 m; cab
       2.50 m wide, roof 2.85 m; deck 1.45 m), the crane and leg geometry, the port side (no
       photograph), the fuel tank and battery boxes.
     Nodes: four "roadwheel" groups, one per axle.
     ===================================================================================== */
  var SX = { AX: [3.05, 1.55, -1.15, -2.60], R: 0.62, TY: 1.02, W: 0.38 };
  function addSx(B) {
    var s, i, x, P = B.paint, D = B.dark, G = B.glass;
    var XF = SX.AX[0] + 1.38, XK = SX.AX[0] - 0.72, HW = 1.25;
    /* frame */
    for (s = -1; s <= 1; s += 2) box(D, -3.55, XF - 0.30, s * 0.42, s * 0.52, 0.95, 1.25);
    /* the cab: horizontal sections - the chin raked back to the bumper, the vertical face, the
       screen a little raked, a flat roof [Z][W] */
    loftN(P, [
      secZ(1.05, XF - 0.42, XK + 0.55, HW - 0.08, 0.14, 0.14),
      secZ(1.20, XF - 0.34, XK, HW - 0.04, 0.16, 0.16),
      secZ(1.95, XF, XK, HW, 0.22, 0.22),
      secZ(2.68, XF - 0.12, XK, HW, 0.20, 0.20),
      secZ(2.80, XF - 0.18, XK + 0.05, HW - 0.06, 0.18, 0.18)
    ]);
    /* bumper, steps and tow points [Z][W] */
    box(D, XF - 0.52, XF - 0.32, -1.15, 1.15, 0.82, 1.05);
    for (s = -1; s <= 1; s += 2) {
      box(D, XF - 0.40, XF - 0.28, s * 0.55 - 0.06, s * 0.55 + 0.06, 0.62, 0.82);
      box(P, XF - 0.62, XF - 0.40, s * (HW - 0.32), s * (HW + 0.02), 0.70, 1.05);         /* the step box at each front corner */
      box(D, XF - 0.62, XF - 0.40, s * (HW - 0.30), s * (HW + 0.04), 0.72, 0.74);
      box(D, XF - 0.62, XF - 0.40, s * (HW - 0.30), s * (HW + 0.04), 0.48, 0.50);
    }
    /* the two-pane screen, centre post, the black visors over it [Z][W] */
    for (s = -1; s <= 1; s += 2) {
      pane(G, XF - 0.005, 2.00, XF - 0.115, 2.62, s * 0.56, 0.50);
      slab(D, [XF + 0.12, s * 0.58, 2.84], [Math.cos(0.25), 0, -Math.sin(0.25)], [0, 1, 0], [Math.sin(0.25), 0, Math.cos(0.25)], 0.30, 0.55, 0.015);
      bar(D, [XF - 0.10, s * 0.58, 2.78], [XF + 0.10, s * 0.58, 2.82], 0.015);
      /* the round convex mirror on its arm ahead of the screen, the square door mirror [Z][W] */
      bar(D, [XF - 0.10, s * (HW - 0.05), 2.62], [XF + 0.30, s * (HW + 0.10), 2.48], 0.018);
      cyl(D, [XF + 0.28, s * (HW + 0.12), 2.42], [XF + 0.34, s * (HW + 0.12), 2.42], 0.16, 0.14, 14);
      bar(D, [XK + 1.50, s * HW, 2.55], [XK + 1.50, s * (HW + 0.25), 2.50], 0.015);
      box(D, XK + 1.46, XK + 1.54, s * (HW + 0.18), s * (HW + 0.32), 2.05, 2.55);
      /* the door: its window, its outline, the grab rail [Z] */
      box(G, XK + 0.75, XK + 1.45, s * HW, s * (HW + 0.01), 2.12, 2.55);
      box(D, XK + 0.62, XK + 0.64, s * HW, s * (HW + 0.012), 1.25, 2.62);
      box(D, XK + 1.58, XK + 1.60, s * HW, s * (HW + 0.012), 1.25, 2.62);
      box(D, XK + 0.62, XK + 1.60, s * HW, s * (HW + 0.012), 1.24, 1.26);
      bar(D, [XK + 0.55, s * (HW + 0.04), 1.40], [XK + 0.55, s * (HW + 0.04), 2.30], 0.015);
      /* headlamp cluster and marker low on the face, either side of the chin [Z][W] */
      box(D, XF - 0.40, XF - 0.30, s * 0.95, s * 1.15, 1.30, 1.45);
      box(G, XF - 0.30, XF - 0.29, s * 0.97, s * 1.13, 1.32, 1.43);
    }
    box(D, XF - 0.06, XF + 0.005, -0.03, 0.03, 2.00, 2.62);
    cyl(D, [XF - 0.05, 0, 1.72], [XF + 0.005, 0, 1.72], 0.14, 0.14, 16);                  /* the round badge on the face */
    /* behind the cab: the spare standing on edge on the starboard side [Z], the intake on the
       port side (assumed), a box between */
    var XS = XK - 0.60;
    B.vc.col = TYRE; cylY(B.vc, XS, -1.05, -0.65, 2.02, 0.62, 22);
    B.vc.col = RIM; cylY(B.vc, XS, -1.07, -0.63, 2.02, 0.34, 16);
    box(P, XS - 0.30, XS + 0.30, -0.70, 0.70, 1.25, 1.42);
    box(P, XS - 0.25, XS + 0.25, 0.20, 0.90, 1.42, 2.10);
    cylZ(D, XS, 0.75, 2.10, 2.55, 0.10, 10);
    /* the deck: a flat floor on cross bearers, low side rails [Z] */
    var DF = XS - 0.42, DR = -3.55, ZD = 1.45, DW = 1.25;
    box(P, DR, DF, -DW, DW, ZD - 0.08, ZD);
    for (x = DF - 0.20; x > DR; x -= 0.60) box(D, x - 0.05, x + 0.05, -DW + 0.04, DW - 0.04, 1.25, ZD - 0.08);
    for (s = -1; s <= 1; s += 2) {
      box(P, DR, DF, s * DW, s * (DW - 0.05), ZD, ZD + 0.30);
      for (x = DF - 0.05; x > DR; x -= 0.60) box(P, x - 0.035, x + 0.035, s * (DW + 0.01), s * (DW - 0.05), ZD - 0.10, ZD + 0.30);
      /* the box between the tandems, the stabiliser leg ahead of the rear tandem and at the tail [Z] */
      box(D, SX.AX[1] - 1.05, SX.AX[1] - 0.55, s * 0.55, s * 0.95, 0.80, 1.25);
      box(P, SX.AX[2] + 0.70, SX.AX[2] + 0.90, s * (DW - 0.10), s * (DW + 0.05), 0.55, ZD - 0.05);
      cylZ(D, SX.AX[2] + 0.80, s * (DW - 0.02), 0.35, 0.60, 0.07, 10);
      box(P, DR - 0.15, DR + 0.05, s * (DW - 0.10), s * (DW + 0.05), 0.55, ZD + 0.10);
      cylZ(D, DR - 0.05, s * (DW - 0.02), 0.35, 0.60, 0.07, 10);
    }
    box(P, DF - 0.06, DF, -DW, DW, ZD, ZD + 0.85);                                       /* headboard */
    /* the folded knuckle crane at the tail: a column, the boom folded up and forward [Z] */
    var XCR = DR + 0.45;
    box(P, XCR - 0.30, XCR + 0.30, -0.40, 0.40, ZD, ZD + 0.35);
    cylZ(P, XCR, 0.15, ZD + 0.35, ZD + 1.45, 0.20, 14);
    bar(P, [XCR + 0.05, 0.15, ZD + 1.35], [XCR + 0.75, 0.15, ZD + 1.10], 0.13);
    bar(P, [XCR + 0.70, 0.15, ZD + 1.10], [XCR + 0.20, 0.15, ZD + 0.55], 0.11);
    bar(D, [XCR - 0.05, 0.15, ZD + 0.55], [XCR + 0.60, 0.15, ZD + 1.05], 0.05);
    box(D, XCR - 0.25, XCR - 0.10, -0.30, 0.30, ZD + 0.35, ZD + 0.75);                    /* the valve bank */
    /* cargo: two strapped crate stacks forward, four drums aft of them */
    crate(B, DF - 1.30, DF - 0.15, -1.15, -0.10, ZD, ZD + 1.05);
    crate(B, DF - 1.30, DF - 0.15, 0.10, 1.15, ZD, ZD + 0.90);
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) drum(B, DF - 1.75 - i * 0.66, s * 0.62, ZD);
    crate(B, DF - 3.30, DF - 2.50, -1.10, 1.10, ZD, ZD + 0.60);
    /* team colour: a strip across the cab roof's rear edge and on the headboard top */
    box(B.team, XK + 0.06, XK + 0.40, -0.90, 0.90, 2.80, 2.815);
    box(B.team, DF - 0.07, DF + 0.005, -0.80, 0.80, ZD + 0.72, ZD + 0.85);
  }
  /* DETAIL PASS ([Z][W]): wipers, the brow's marker lamps, a roof hatch and aerial base, the door
     handles, the deck's lashing rings, straps over the drums, the crane's hoses, the rear lamps and
     under-run bar.  Sizes from [Z]'s proportions: NOT CONFIRMED. */
  function sxDetail(B) {
    var s, i, x, D = B.dark, XF = SX.AX[0] + 1.38, XK = SX.AX[0] - 0.72, HW = 1.25, DF = XK - 0.60 - 0.42, DR = -3.55, ZD = 1.45, DW = 1.25;
    for (s = -1; s <= 1; s += 2) {
      bar(D, [XF + 0.005, s * 0.25, 2.06], [XF - 0.06, s * 0.70, 2.36], 0.009);
      box(D, XK + 1.40, XK + 1.52, s > 0 ? HW : -HW - 0.03, s > 0 ? HW + 0.03 : -HW, 1.75, 1.79);
      for (x = DF - 0.35; x > DR + 0.10; x -= 0.60) lash(D, x, s * DW, ZD + 0.02, s);
      B.vc.col = REDL; box(B.vc, DR - 0.03, DR, s * 1.00 - 0.08, s * 1.00 + 0.08, 1.05, 1.15);
      B.vc.col = AMBER; box(B.vc, DR - 0.03, DR, s * 0.82 - 0.05, s * 0.82 + 0.05, 1.05, 1.15);
      box(D, DR - 0.02, DR + 0.06, s * 1.10 - 0.12, s * 1.10 + 0.12, 1.00, 1.20);
    }
    B.vc.col = AMBER;
    for (i = 0; i < 3; i++) box(B.vc, XF - 0.22, XF - 0.17, -0.25 + i * 0.25 - 0.05, -0.25 + i * 0.25 + 0.05, 2.80, 2.85);
    box(B.paint, XK + 0.60, XK + 1.25, -0.35, 0.35, 2.80, 2.85);
    box(D, XK + 0.58, XK + 0.62, -0.30, 0.30, 2.80, 2.87);
    cylZ(D, XK + 0.20, 1.00, 2.80, 2.92, 0.04, 8);
    box(D, DR - 0.05, DR + 0.05, -0.90, 0.90, 0.75, 0.85);
    /* straps over the drums */
    B.vc.col = STRAP;
    for (i = 0; i < 2; i++) box(B.vc, DF - 1.75 - i * 0.66 - 0.03, DF - 1.75 - i * 0.66 + 0.03, -0.95, 0.95, ZD + 0.88, ZD + 0.90);
    /* the crane's hoses from the valve bank up the column */
    var XCR = DR + 0.45;
    bar(D, [XCR - 0.12, 0.05, ZD + 0.70], [XCR - 0.12, 0.05, ZD + 1.30], 0.018);
    bar(D, [XCR - 0.18, -0.05, ZD + 0.70], [XCR - 0.06, 0.15, ZD + 1.35], 0.018);
  }
  function buildSx(THREE, M, C) {
    var T = materials(THREE, C, P_PLA), g = new THREE.Group(), B = bins(T), i, hub = [0.07, 0.075, 0.07];
    g.name = "supply_c";
    addSx(B);
    sxDetail(B);
    flush(THREE, g, B);
    for (i = 0; i < 4; i++) wheelGroup(THREE, g, T, SX.AX[i], SX.R, function (W) { var s; for (s = -1; s <= 1; s += 2) truckWheel(W, s * SX.TY, SX.R, SX.W, s, 0.36, hub); });
    return g;
  }

  /* =====================================================================================
     mcv - "Mobile Construction Vehicle", STAND-IN for a cross-army row: the Oshkosh M1075A1 PLS
     (Palletized Load System) 10x10 with its Container Handling Unit (CHU) and a 20 ft ISO
     container.  Chosen because the row "unfolds into a second Construction Yard", and the yard it
     deploys (js/hero/conyard_engineer_yard.js) is built of ISO containers and "the mcv drives in as
     a crane truck with container modules on its deck": the PLS with its CHU is the real engineer
     and logistics vehicle that sets 20 ft containers down off its own deck.  The PLS was preferred
     over an armoured engineer vehicle (M9 ACE, IMR) because nothing in the desc is about digging.
     It is NOT the HEMTT (different cab, five axles, LHS/CHU instead of a cargo body), so
     js/hero/us_hemtt.js cannot be called for it.
     References (Wikimedia Commons; scratchpad/q_supg_ref):
       [C] "M1074A1 PLS with Oshkosh CHU.jpg" (Oshkosh) - starboard front 3/4 of an A1 with a 20 ft
           container on its CHU: the A1 cab (vertical face, chamfered corners, two-pane raked screen,
           markers on the brow, headlamp pods, the chin sloping back), the louvred cooling box behind
           the cab with the spare lying on it on the starboard side, the CHU's front frame and
           posts holding the container, the 2 + 3 axles, the container over the rear tridem.
       [S] "Palletized Loading System 185796.jpg" - an A0, port side, near side-on with perspective:
           THE AXLE TABLE, measured off its tyre heights (1600R20, 1.25 m) with a perspective
           correction (spacing taken as proportional to the change in 1/scale along the truck) and
           scaled to the published 10.795 m: nose to axle 1 2.30, axles 1.48 / 3.05 / 1.55 / 1.55
           (the tridem measures 1.73 / 1.36, drawn even), axle 5 to tail 0.86; the long round
           fuel tank on the port side ahead of axle 3, the LHS hook arm folded over the rear.
     Published (en.wikipedia "Palletized Load System", Jane's): 10.795 x 2.517 x 3.277 m (to the
       LHS hook), two front and three rear axles, 1600R20 Michelin XZL, "On PLS A1 variants the
       spare wheel ... on the right-hand side ... on the top of the engine/cooling compartments";
       CHU for "standard 20 ft ISO containers"; ISO 668: 6.058 x 2.438 x 2.591 m.
     Recognition: the five axles, 2 + 3, with the gap [S][C]; the A1 cab's flat face and corner
       facets [C]; the cooling box with the spare on it [C]; the container riding high on the CHU
       over the tridem, its front frame and posts [C]; the fuel tank [S].
     Paint: neutral olive #575b3d (the "both" rows); the container plain olive drab (#5d5c44) with
       corrugations; [C]'s tan container and the A0's tan are not drawn.
     NOT CONFIRMED: the perspective-corrected axle spacing (about 5 per cent); the cab heights
       (roof 2.55, face 1.40-1.95 m, read off [S] at the cab's own scale); the container's floor
       (1.55 m, so its roof is 4.15 m: the published 3.277 m is the bare truck to the hook); the CHU
       frame's exact shape; the port side of the cooling box; the CTIS lines and the hook arm's
       linkage are not drawn.
     Nodes: five "roadwheel" groups, one per axle.
     ===================================================================================== */
  var PL = { AX: [3.30, 1.82, -1.23, -2.78, -4.33], R: 0.625, TY: 1.015, W: 0.42 };
  function addPls(B) {
    var s, i, x, y, P = B.paint, D = B.dark, G = B.glass, A1 = PL.AX[0];
    var XF = A1 + 2.22, XK = A1 + 0.15, HW = 1.24;
    /* frame, cross members, the rear roller of the LHS */
    for (s = -1; s <= 1; s += 2) box(D, -5.15, XF - 0.25, s * 0.42, s * 0.52, 1.00, 1.34);
    for (i = 0; i < 7; i++) { x = 4.5 - i * 1.55; box(D, x - 0.05, x + 0.05, -0.42, 0.42, 1.06, 1.28); }
    cylY(D, -5.05, -0.70, 0.70, 1.10, 0.13, 14);
    /* the cab: horizontal sections - the chin, the vertical face, the raked screen, the roof; the
       back wall cut away over the front tyre below 1.31 m [C][S] */
    loftN(P, [
      secZ(0.85, XF - 0.30, A1 + 0.72, HW - 0.12, 0.26, 0.20),
      secZ(1.30, XF - 0.04, A1 + 0.72, HW - 0.02, 0.32, 0.26),
      secZ(1.31, XF - 0.03, XK, HW - 0.02, 0.32, 0.26),
      secZ(1.40, XF, XK, HW, 0.34, 0.28),
      secZ(1.95, XF, XK, HW, 0.34, 0.28),
      secZ(2.48, XF - 0.33, XK, HW - 0.02, 0.28, 0.24),
      secZ(2.55, XF - 0.38, XK + 0.03, HW - 0.05, 0.25, 0.22)
    ]);
    /* the screen: two panes split by a post, raked 30 degrees [C] */
    for (s = -1; s <= 1; s += 2) {
      pane(G, XF, 1.95, XF - 0.33, 2.48, s * 0.48, 0.40);
      /* the headlamp pods at the face corners, round lamps and markers [C] */
      box(D, XF - 0.02, XF + 0.06, s * 0.78, s * 1.02, 1.42, 1.62);
      cyl(G, [XF + 0.06, s * 0.84, 1.52], [XF + 0.075, s * 0.84, 1.52], 0.065, 0.065, 12);
      cyl(G, [XF + 0.06, s * 0.96, 1.52], [XF + 0.075, s * 0.96, 1.52], 0.05, 0.05, 12);
      /* side and door windows, the door outline, the mirrors on long arms [C][S] */
      box(G, XK + 0.80, XK + 1.40, s * HW, s * (HW + 0.01), 1.80, 2.32);
      box(G, XK + 0.18, XK + 0.55, s * HW, s * (HW + 0.01), 1.85, 2.32);
      box(D, XK + 0.64, XK + 0.66, s * HW, s * (HW + 0.012), 1.32, 2.40);
      box(D, XK + 1.52, XK + 1.54, s * HW, s * (HW + 0.012), 1.32, 2.40);
      bar(D, [XF - 0.30, s * (HW - 0.05), 2.30], [XF + 0.18, s * (HW + 0.22), 2.10], 0.016);
      cyl(D, [XF + 0.16, s * (HW + 0.24), 2.12], [XF + 0.22, s * (HW + 0.24), 2.12], 0.14, 0.12, 12);
      box(D, XF + 0.14, XF + 0.20, s * (HW + 0.16), s * (HW + 0.30), 1.55, 1.98);
      /* the step ladder under the door, the tow clevises [C] */
      box(D, XK + 0.75, XK + 1.25, s * (HW - 0.10), s * (HW - 0.02), 0.55, 0.58);
      box(D, XK + 0.75, XK + 1.25, s * (HW - 0.10), s * (HW - 0.02), 0.80, 0.83);
      box(D, XF - 0.40, XF - 0.24, s * 0.50 - 0.07, s * 0.50 + 0.07, 0.70, 0.88);
    }
    box(D, XF - 0.17, XF - 0.13, -0.03, 0.03, 1.96, 2.47);
    for (i = 0; i < 5; i++) box(D, XF - 0.36, XF - 0.33, -0.40 + i * 0.20 - 0.03, -0.40 + i * 0.20 + 0.03, 2.49, 2.53);   /* brow markers */
    box(D, XF - 0.10, XF - 0.02, -0.75, 0.75, 1.10, 1.25);                                                              /* the vent band on the chin */
    /* the engine / cooling compartment behind the cab: louvred, the spare lying on its starboard
       half, the intake head and air cleaner to port [C][S] */
    var XE = XK - 1.30;
    box(P, XE, XK - 0.04, -1.15, 1.15, 1.30, 2.40);
    for (i = 0; i < 8; i++) for (s = -1; s <= 1; s += 2) box(D, XE + 0.20 + i * 0.12, XE + 0.26 + i * 0.12, s * 1.15, s * 1.165, 1.55, 2.25);
    B.vc.col = TYRE; cylZ(B.vc, XE + 0.62, -0.50, 2.40, 2.82, 0.62, 22);
    B.vc.col = RIM; cylZ(B.vc, XE + 0.62, -0.50, 2.39, 2.825, 0.34, 16);
    cylZ(P, XE + 0.55, 0.80, 2.40, 2.75, 0.22, 14);
    cylZ(D, XE + 0.20, 0.95, 2.40, 3.05, 0.07, 10);
    /* the port fuel tank between axles 2 and 3 [S]; the battery box opposite */
    cyl(P, [PL.AX[1] - 0.95, 0.95, 1.02], [PL.AX[2] + 0.85, 0.95, 1.02], 0.32, 0.32, 18);
    box(P, PL.AX[1] - 1.60, PL.AX[1] - 0.80, -1.10, -0.65, 0.72, 1.25);
    /* the CHU: rails on the frame, the front frame of two posts and a top beam against the
       container's front, the LHS hook arm folded behind the cooling box [C][S] */
    var XCF = XE - 0.35, ZC = 1.55, CL = 6.058, CW = 1.219, CH = 2.591;
    for (s = -1; s <= 1; s += 2) {
      box(D, XCF - CL + 0.10, XCF, s * 0.45, s * 0.60, 1.34, ZC);
      box(P, XCF - 0.04, XCF + 0.16, s * (CW - 0.12), s * (CW + 0.04), ZC - 0.25, ZC + CH + 0.25);
      bar(D, [XCF + 0.10, s * 0.75, 1.40], [XCF + 0.10, s * 0.95, ZC + 1.40], 0.05);
      box(D, XCF - 0.10, XCF + 0.05, s * (CW - 0.10), s * (CW + 0.02), ZC + 0.05, ZC + 0.25);
      box(D, XCF - 0.10, XCF + 0.05, s * (CW - 0.10), s * (CW + 0.02), ZC + CH - 0.25, ZC + CH - 0.05);
    }
    box(P, XCF - 0.04, XCF + 0.16, -CW - 0.04, CW + 0.04, ZC + CH + 0.10, ZC + CH + 0.25);
    box(P, XCF + 0.05, XCF + 0.35, -0.30, 0.30, 1.34, 3.10);                     /* the hook arm, folded up */
    box(D, XCF + 0.12, XCF + 0.28, -0.08, 0.08, 3.10, 3.28);
    /* the container: shell, corrugated sides and roof edge, corner castings, the doors and their
       locking bars at the rear */
    var X0 = XCF - CL, X1 = XCF, ZT = ZC + CH;
    B.vc.col = [0.36, 0.36, 0.27]; box(B.vc, X0, X1, -CW, CW, ZC, ZT);
    B.vc.col = [0.31, 0.31, 0.23];
    for (x = X0 + 0.20; x < X1 - 0.15; x += 0.28) for (s = -1; s <= 1; s += 2) box(B.vc, x - 0.06, x + 0.06, s * CW, s * (CW + 0.025), ZC + 0.12, ZT - 0.12);
    for (s = -1; s <= 1; s += 2) {
      box(B.vc, X0, X1, s * (CW - 0.06), s * (CW + 0.03), ZT - 0.12, ZT);
      box(B.vc, X0, X1, s * (CW - 0.06), s * (CW + 0.03), ZC, ZC + 0.12);
    }
    B.vc.col = [0.15, 0.15, 0.13];
    [X0, X1 - 0.18].forEach(function (cx) { [-1, 1].forEach(function (sy) { [ZC, ZT - 0.12].forEach(function (cz) { box(B.vc, cx - 0.01, cx + 0.19, sy * (CW - 0.17), sy * (CW + 0.035), cz - 0.005, cz + 0.125); }); }); });
    for (i = 0; i < 4; i++) { y = -0.90 + i * 0.60; box(B.vc, X0 - 0.03, X0 + 0.005, y - 0.025, y + 0.025, ZC + 0.15, ZT - 0.15); }
    box(B.vc, X0 - 0.02, X0 + 0.005, -0.006, 0.006, ZC + 0.10, ZT - 0.10);
    /* rear lamps and the pintle */
    for (s = -1; s <= 1; s += 2) box(D, -5.20, -5.10, s * 0.95, s * 1.15, 1.05, 1.20);
    box(D, -5.25, -5.10, -0.12, 0.12, 0.85, 1.00);
    /* team colour: a panel on the cab roof, a strip along the container's front top */
    box(B.team, XK + 0.40, XK + 1.20, -0.70, 0.70, 2.55, 2.565);
    box(B.team, X1 - 0.60, X1 - 0.25, -0.90, 0.90, ZT, ZT + 0.015);
  }
  /* DETAIL PASS ([C][S]): wipers, door handles and grab rails, a roof hatch and aerial bases, the
     fuel tank's straps, the CHU's rams, the container doors' hinges, cam keepers and handles, the
     rear lamp lenses.  Sizes from [C]'s proportions: NOT CONFIRMED. */
  function plsDetail(B) {
    var s, i, y, D = B.dark, A1 = PL.AX[0], XF = A1 + 2.22, XK = A1 + 0.15, HW = 1.24, XE = XK - 1.30, XCF = XE - 0.35, ZC = 1.55, CL = 6.058, CW = 1.219, CH = 2.591, X0 = XCF - CL, ZT = ZC + CH;
    for (s = -1; s <= 1; s += 2) {
      bar(D, [XF - 0.02, s * 0.15, 2.00], [XF - 0.12, s * 0.60, 2.20], 0.009);
      box(D, XK + 1.30, XK + 1.42, s > 0 ? HW : -HW - 0.03, s > 0 ? HW + 0.03 : -HW, 1.62, 1.66);
      grab(D, [XK + 0.70, s * HW, 1.45], [XK + 0.70, s * HW, 2.20], [0, s * 0.05, 0]);
      /* the CHU's ram from the frame to the post */
      bar(D, [XCF - 0.40, s * 0.70, 1.36], [XCF + 0.05, s * (CW - 0.05), ZC + 1.00], 0.04);
      /* the container doors' hinges on the outer edges, the cam keepers top and bottom of each bar */
      for (i = 0; i < 4; i++) box(B.vc, X0 - 0.03, X0 + 0.005, s * (CW - 0.04) - 0.04, s * (CW - 0.04) + 0.04, ZC + 0.30 + i * 0.66, ZC + 0.40 + i * 0.66);
      B.vc.col = REDL; box(B.vc, -5.21, -5.20, s * 1.05 - 0.07, s * 1.05 + 0.07, 1.08, 1.17);
      B.vc.col = [0.15, 0.15, 0.13];
    }
    B.vc.col = [0.15, 0.15, 0.13];
    for (i = 0; i < 4; i++) {
      y = -0.90 + i * 0.60;
      box(B.vc, X0 - 0.05, X0 + 0.005, y - 0.04, y + 0.04, ZC + 0.12, ZC + 0.20);
      box(B.vc, X0 - 0.05, X0 + 0.005, y - 0.04, y + 0.04, ZT - 0.20, ZT - 0.12);
      box(B.vc, X0 - 0.06, X0 - 0.03, y - 0.02, y + 0.20, ZC + 1.05, ZC + 1.10);
    }
    /* the port fuel tank's two straps [S] */
    [0.55, -0.10].forEach(function (x) { box(D, x - 0.025, x + 0.025, 0.61, 1.29, 0.68, 1.36); });
    /* the cab roof's hatch and aerial bases, the air horns on the brow */
    box(B.paint, XK + 0.55, XK + 1.15, -0.35, 0.35, 2.55, 2.60);
    for (s = -1; s <= 1; s += 2) { cylZ(D, XK + 0.12, s * 1.05, 2.55, 2.68, 0.04, 8); cyl(D, [XF - 0.55, s * 0.25, 2.60], [XF - 0.35, s * 0.25, 2.60], 0.035, 0.05, 8); }
  }
  function buildPls(THREE, M, C) {
    var T = materials(THREE, C, P_OLIVE), g = new THREE.Group(), B = bins(T), i, hub = hex2rgb(P_OLIVE.base, 0.85);
    g.name = "mcv";
    addPls(B);
    plsDetail(B);
    flush(THREE, g, B);
    for (i = 0; i < 5; i++) wheelGroup(THREE, g, T, PL.AX[i], PL.R, function (W) { var s; for (s = -1; s <= 1; s += 2) truckWheel(W, s * PL.TY, PL.R, PL.W, s, 0.38, hub); });
    return g;
  }

  /* =====================================================================================
     repair - "Armoured Recovery Vehicle", STAND-IN for a cross-army row: the BREM-1, the T-72A's
     recovery vehicle.  Chosen over the M88 because it is the tank-hull ARV for which a hero hull
     already exists: js/hero/ru_t72.js is CALLED (HeroT72.build, variant "a": the T-72A hull, which
     ru.wikipedia gives as the BREM-1's base), and its turret group is taken off.  The host's rubber
     skirts are taken off too (all three BREM-1 photographs show the track bare): they are the only
     thing in the host's rubber material, so that mesh is removed whole.  The host's paint is
     swapped for the neutral olive; its road wheels keep their own (T-72 green) vertex colours.
     References (Wikimedia Commons; scratchpad/q_supg_ref):
       [F] "BREM-1 armoured recovery vehicle (1).jpg" - dead ahead: the full-width dozer blade carried
           high across the nose, the cargo platform's stowage boxes behind, the commander's cupola
           and searchlight to starboard, the crane's base and ram to port.
       [A] "BREM-1 ARV.jpg" (parade) - port front 3/4: the boom lying along the port side to the tail,
           the two cupolas, the platform, the blade; no skirts.
       [B] "BREM-1 - ETIF-2010 (4) (cropped).jpg" - port front 3/4: the blade's push arms, the crane
           column at the front port corner, the boom on its rest, the bare track.
       [P] "2008 Moscow Victory Day Parade - BREM-1.jpg" - port side 3/4: the heights, scaled off the
           0.75 m road wheel (100 px a metre at the near wheels): platform boxes 2.78 m, cupolas
           2.55 m, the boom 1.65-2.17 m.
     Published (ru.wikipedia "BREM-1"): 7,980 x 3,460 x 2,425 mm, base 4,278, gauge 2,790, blade 3.1 m
       wide, hook height 4.36 m, crew 3.
     Recognition: the dozer blade across the nose [F][A][B]; no turret, a boxy platform full of
       stowage boxes over the old fighting compartment [F][A][P]; the boom along the port side [A][P];
       the crane column at the front port corner [F][B]; two cupolas up front [A][P].
     Height: [P] gives 2.78 m over the stowage boxes and 2.55 m over the cupolas; the published
       2,425 mm is taken to be the hull roof / platform rim (2.43 m here).  Not fitted.
     Length: blade lip 4.22 to the host's rear -3.43 = 7.65 m; published 7.98 m (perhaps over the
       tow gear): the photographs' blade position is followed.
     NOT CONFIRMED: the blade's depth and travel height (0.71-1.22 m off [F] at 176 px a metre);
       the platform's plan (x -1.50 to 0.90 m, from [A][P] through perspective); the cupolas' places;
       the crane column's size; the rear (no rear photograph).  The host's small skirt hinge strips
       (dark, at the fender edge) remain: they are merged into its dark mesh.
     ===================================================================================== */
  function addBrem(B) {
    var s, i, x, P = B.paint, D = B.dark, ZD = 1.48;
    /* the dozer blade, raised for travel: a curved mouldboard of three facets, the cutting lip,
       end plates; push arms back to the hull sides and two rams to the glacis [F][A][B][P] */
    var BX = 4.00, HB = 1.55;
    belt(P, BX + 0.20, 0.71, BX + 0.08, 0.86, -HB, HB, 0.05);
    belt(P, BX + 0.08, 0.86, BX + 0.04, 1.06, -HB, HB, 0.05);
    belt(P, BX + 0.04, 1.06, BX + 0.12, 1.22, -HB, HB, 0.05);
    box(D, BX + 0.16, BX + 0.24, -HB, HB, 0.70, 0.75);
    for (s = -1; s <= 1; s += 2) {
      prismY(P, [[BX - 0.18, 0.75], [BX + 0.22, 0.71], [BX + 0.14, 1.22], [BX - 0.18, 1.18]], s * (HB - 0.04), s * HB);
      belt(P, BX - 0.10, 0.85, 2.70, 0.80, s * 1.10, s * 1.24, 0.16);
      cyl(D, [BX - 0.12, s * 0.55, 1.05], [3.15, s * 0.55, 1.20], 0.07, 0.07, 10);
      cylY(D, 2.70, s * 1.04, s * 1.30, 0.80, 0.10, 12);
    }
    box(P, BX - 0.22, BX - 0.10, -HB + 0.05, HB - 0.05, 0.80, 1.10);
    /* the crew compartment where the turret stood: a low box with a sloped front, the commander's
       cupola and searchlight to starboard, the second hatch [F][A][P] */
    prismY(P, [[0.90, ZD], [2.20, ZD], [2.20, 1.62], [1.90, 1.95], [0.90, 1.95]], -1.10, 0.78);
    cylZ(P, 1.50, -0.62, 1.95, 2.08, 0.38, 16);
    cylZ(P, 1.50, -0.62, 2.08, 2.20, 0.30, 16);
    cyl(D, [1.62, -0.92, 2.32], [1.82, -0.92, 2.32], 0.10, 0.11, 12);
    box(D, 1.55, 1.65, -0.96, -0.88, 2.15, 2.25);
    cylZ(P, 1.55, 0.25, 1.95, 2.06, 0.30, 14);
    cylZ(D, 1.55, 0.25, 2.06, 2.10, 0.22, 14);
    /* the cargo platform over the old fighting compartment: walls to 2.43 m, stowage boxes [F][A][P] */
    box(P, -1.50, 0.90, -1.15, 0.72, ZD, 2.43);
    var BXS = [[-1.40, -0.55, -1.10, -0.15, 2.78], [-0.50, 0.40, -1.10, -0.35, 2.70], [-0.50, 0.40, -0.30, 0.68, 2.62], [-1.40, -0.55, -0.10, 0.68, 2.74]];
    BXS.forEach(function (b) {
      box(P, b[0], b[1], b[2], b[3], 2.43, b[4]);
      box(D, b[0] + 0.02, b[1] - 0.02, b[2] - 0.005, b[3] + 0.005, b[4] - 0.06, b[4] - 0.04);
      box(D, (b[0] + b[1]) / 2 - 0.04, (b[0] + b[1]) / 2 + 0.04, b[2] - 0.01, b[2], b[4] - 0.14, b[4] - 0.08);
    });
    for (x = -1.30; x < 0.85; x += 0.55) box(D, x - 0.02, x + 0.02, -1.16, -1.15, 1.55, 2.38);
    /* the crane: a column at the front port corner with its ram, the box boom lying along the port
       side to the tail on a rest, the sheave head and hook [F][A][B][P] */
    box(P, 1.90, 2.60, 0.80, 1.50, ZD, 1.95);
    cylZ(P, 2.25, 1.15, 1.95, 2.10, 0.32, 16);
    cyl(D, [2.35, 1.00, 1.60], [1.35, 1.05, 1.88], 0.09, 0.09, 10);
    cyl(D, [2.10, 1.00, 1.70], [1.60, 1.02, 1.85], 0.12, 0.12, 10);
    loftN(P, [secX(2.25, 0.24, 1.70, 2.17, 0.04).map(function (p) { return [p[0], p[1] + 1.15, p[2]]; }),
              secX(-3.15, 0.18, 1.78, 2.10, 0.04).map(function (p) { return [p[0], p[1] + 1.15, p[2]]; })]);
    cylY(D, -3.25, 1.03, 1.27, 1.94, 0.20, 16);
    box(P, -3.40, -3.10, 1.03, 1.27, 1.80, 2.10);
    box(D, -3.42, -3.30, 1.10, 1.20, 1.30, 1.80);
    box(P, -2.95, -2.75, 0.95, 1.35, ZD, 1.78);
    /* the rear: tow hooks and the winch fairlead (assumed at the rear plate's centre) */
    for (s = -1; s <= 1; s += 2) box(D, -3.52, -3.40, s * 0.75 - 0.07, s * 0.75 + 0.07, 0.80, 0.95);
    box(D, -3.50, -3.40, -0.20, 0.20, 1.10, 1.30);
    /* team colour: strips on the platform sides */
    for (s = -1; s <= 1; s += 2) box(B.team, -0.90, 0.20, s > 0 ? 0.72 : -1.16, s > 0 ? 0.735 : -1.15, 2.20, 2.32);
  }
  /* DETAIL PASS ([F][A][B][P]): the stowage boxes' lid hinges, grab handles on the platform walls,
     lifting eyes at its corners, the crane's hook block and its rope along the boom, the blade's
     ribs, tow cables on the hull sides.  Sizes NOT CONFIRMED. */
  function bremDetail(B) {
    var s, i, D = B.dark, ZD = 1.48, BX = 4.00, HB = 1.55;
    var BXS = [[-1.40, -0.55, -1.10, -0.15, 2.78], [-0.50, 0.40, -1.10, -0.35, 2.70], [-0.50, 0.40, -0.30, 0.68, 2.62], [-1.40, -0.55, -0.10, 0.68, 2.74]];
    BXS.forEach(function (b) { box(D, b[0], b[0] + 0.04, b[2] + 0.04, b[3] - 0.04, b[4], b[4] + 0.02); });
    for (i = 0; i < 3; i++) grab(D, [-1.30 + i * 0.80, -1.15, 2.05], [-0.95 + i * 0.80, -1.15, 2.05], [0, -0.05, 0]);
    liftEye(D, 0.80, -1.05, 2.43); liftEye(D, -1.45, -1.05, 2.43); liftEye(D, -1.45, 0.60, 2.43);
    /* the hook block hanging at the boom's head on its rest, the rope back along the boom */
    bar(D, [-3.25, 1.15, 1.74], [-3.25, 1.15, 1.42], 0.012);
    box(D, -3.33, -3.17, 1.08, 1.22, 1.22, 1.42);
    cylY(D, -3.25, 1.12, 1.18, 1.14, 0.06, 10);
    bar(D, [2.10, 1.15, 2.19], [-3.20, 1.15, 2.13], 0.012);
    /* the blade's back ribs */
    for (i = 0; i < 6; i++) { var y = -1.30 + i * 0.52; box(D, BX - 0.20, BX - 0.14, y - 0.025, y + 0.025, 0.78, 1.16); }
    /* tow cables along the hull sides below the platform */
    for (s = -1; s <= 1; s += 2) towCable(D, -2.55, -0.20, s * 1.25, 1.62, 1.72, s);
  }
  function buildBrem(THREE, M, C) {
    var g = HeroT72.build(THREE, M, C, "a"), T = materials(THREE, C, P_OLIVE), B = bins(T), eg = new THREE.Group();
    g.name = "repair";
    dropNamed(g, "turret");
    repaint(g, T.paint, function (m) { return !m.map && !m.vertexColors && m.color && m.color.getHex() === 0x33362f; });
    addBrem(B);
    bremDetail(B);
    eg.name = "equipment";
    flush(THREE, eg, B);
    g.add(eg);
    return g;
  }

  /* =====================================================================================
     mineclear - "Mine-Clearing Vehicle (plough and flail)", STAND-IN for a cross-army row: the
     Rheinmetall Keiler mine flail.  Chosen because it is a flail clearer on a tank hull for which a
     hero hull exists: js/hero/us_m48.js is CALLED (HeroM48.build, the M48A2 hull; en.wikipedia
     "Keiler": "a conversion of the M48 Patton ... Developers removed the turret of the Patton"), and
     its turret group is taken off.  The row's "plough" is not on the Keiler; no plough vehicle with
     a hero hull was found (the M1 hull in js/hero/nato_e90_mbt.js has no "roadwheel" groups).
     References (Wikimedia Commons; scratchpad/q_supg_ref):
       [M] "Minenraumpanzer M 48 Keiler - Panzermuseum Munster-20240529 (1).JPG" - starboard side,
           square on, the flail STOWED: THE STATION TABLE.  Scaled off the M48's 0.77 m road-wheel
           pitch (114.5 px a metre; the host's six stations fall on the photograph's wheels):
           x = 1.78 + (px - 663) / 114.5, z = (613 - py) / 114.5.
       [G] "Minenraumpanzer Keiler im Gelande.jpg" - flailing, starboard side: the arms reaching
           ahead of the nose, the rear box, the plain M48 running gear.
     Published (en.wikipedia "Keiler"): 10.7 m long and 6.35 m wide with the flail deployed, 3.76 m
       high, crew 2, "In traveling mode, the mine flail folds over the vehicle", 24 chains on two
       shafts, "no defensive weapons except its smoke grenade dischargers".
     Station table off [M] (x, z in metres): raised superstructure -3.36..1.40, 1.38..1.86; rear box
       -3.18..-1.83 to 2.12; front box 1.40..3.50, 1.73..2.05; main flail arm -2.48..2.63 at 2.30
       (r 0.22); rear rotor head -2.87..-2.13, 2.74..3.30; front head 2.36..2.98, 2.74..3.13; rotor
       shafts at 3.20 (rear) and 2.93 (front); centre post -0.34..0.14 to 3.35; the boom tip 4.02 at
       3.39; struts -1.39..-0.34 and 0.71..1.40; nose brackets 2.98..3.41, 0.80..1.95.
     Height: [M] gives 3.51 m over the boom tip against the published 3.76 m (the flail's working
       attitude is not stated): not fitted.  Length: -3.62 (host pintle) to 4.13 m over the boom
       tip in travel; the published 10.7 m is with the flail out ahead.
     Paint: neutral olive (the "both" rows); [M] is UN white, [G] NATO three-colour: not drawn.
     NOT CONFIRMED: the flail's lateral position (drawn on the centre line; [M] is a pure side
       view); the superstructure's half widths (1.20 / 1.00 m, the M48 hull's); the chains' count
       per shaft (12 + 12 for the published 24); the lane-marking system at the rear (not seen).
     ===================================================================================== */
  function kX(px) { return 1.78 + (px - 663) / 114.5; }
  function kZ(py) { return (613 - py) / 114.5; }
  function addKeiler(B) {
    var s, i, x, P = B.paint, D = B.dark;
    /* the raised superstructure over the old hull roof, the rear box with its sloped back [M] */
    box(P, kX(75), kX(620), -1.20, 1.20, 1.40, kZ(400));
    box(D, kX(75) + 0.02, kX(620) - 0.02, -1.21, 1.21, kZ(400) - 0.03, kZ(400) - 0.01);
    prismY(P, [[kX(95), kZ(400)], [kX(250), kZ(400)], [kX(250), kZ(370)], [kX(130), kZ(370)], [kX(95), kZ(385)]], -1.00, 1.00);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) box(D, kX(280) + i * 0.10, kX(280) + i * 0.10 + 0.05, s * 1.20, s * 1.215, 1.50, 1.75);   /* the louvre on the side */
    /* the front box over the glacis [M] */
    prismY(P, [[kX(620), 1.45], [kX(745), 1.20], [kX(840), 1.20], [kX(862), kZ(415)], [kX(850), kZ(378)], [kX(620), kZ(378)]], -1.00, 1.00);
    /* the flail arms' pivot brackets on the nose [M][G] */
    for (s = -1; s <= 1; s += 2) {
      box(P, kX(800), kX(850), s * 0.80, s * 1.00, kZ(520), kZ(390));
      cylY(D, kX(825), s * 0.74, s * 1.06, kZ(470), 0.12, 14);
    }
    /* the flail stowed over the hull: the main arm tube, its rise to the rear head, the two heads,
       the rotor shafts with their chains, the centre post, the struts, the long boom ahead [M] */
    cylX(P, kX(175), kX(760), 0, 2.30, 0.22, 18);
    cyl(P, [kX(180), 0, 2.30], [kX(150), 0, 2.85], 0.20, 0.18, 14);
    box(P, kX(130), kX(215), -0.30, 0.30, kZ(300), kZ(235));
    box(P, kX(730), kX(800), -0.28, 0.28, kZ(300), kZ(255));
    cylY(D, kX(172), -0.32, 0.32, kZ(268), 0.16, 14);
    cylY(D, kX(765), -0.30, 0.30, kZ(278), 0.14, 14);
    cylX(D, kX(200), kX(450), 0, kZ(246), 0.06, 10);
    cylX(D, kX(480), kX(740), 0, kZ(278), 0.06, 10);
    function chains(x0, x1, z) {
      var k, cx;
      for (k = 0; k < 12; k++) {
        cx = x0 + (k + 0.5) / 12 * (x1 - x0);
        box(D, cx - 0.025, cx + 0.025, -0.025, 0.025, z - 0.62, z - 0.04);
        box(D, cx - 0.05, cx + 0.05, -0.05, 0.05, z - 0.80, z - 0.62);
      }
    }
    chains(kX(205), kX(445), kZ(246));
    chains(kX(485), kX(735), kZ(278));
    box(P, kX(420), kX(475), -0.20, 0.20, kZ(400), kZ(265));
    cylY(P, kX(460), -0.25, 0.25, kZ(250), 0.14, 14);
    for (s = -1; s <= 1; s += 2) {
      bar(P, [kX(300), s * 0.45, kZ(400)], [kX(360), s * 0.15, 2.12], 0.05);
      bar(P, [kX(420), s * 0.45, kZ(400)], [kX(360), s * 0.15, 2.12], 0.05);
      bar(P, [kX(540), s * 0.45, kZ(400)], [kX(580), s * 0.15, 2.12], 0.05);
      bar(P, [kX(620), s * 0.45, kZ(400)], [kX(580), s * 0.15, 2.12], 0.05);
    }
    cyl(P, [kX(780), 0, kZ(278) + 0.02], [kX(920), 0, kZ(225)], 0.12, 0.10, 14);
    box(P, kX(905), kX(925), -0.14, 0.14, kZ(240), kZ(205));
    /* smoke dischargers on the front box corners (en.wikipedia: smoke grenade dischargers; their
       place is NOT CONFIRMED and none is drawn) */
    /* team colour: strips along the superstructure's top edge */
    for (s = -1; s <= 1; s += 2) box(B.team, kX(300), kX(600), s > 0 ? 1.20 : -1.215, s > 0 ? 1.215 : -1.20, kZ(415), kZ(404));
  }
  /* DETAIL PASS ([M][G]): the hydraulic hoses along the flail arm, the pivot pins' caps, grab handles
     and lifting eyes on the superstructure, the hatch hinges, the side louvre's frame.  Sizes NOT
     CONFIRMED. */
  function keilerDetail(B) {
    var s, i, D = B.dark, zt = kZ(400);
    for (s = -1; s <= 1; s += 2) {
      bar(D, [kX(200), s * 0.24, 2.30], [kX(740), s * 0.24, 2.30], 0.02);
      bar(D, [kX(200), s * 0.26, 2.22], [kX(740), s * 0.26, 2.22], 0.02);
      cylY(D, kX(825), s * 1.06, s * 1.10, kZ(470), 0.07, 10);
      for (i = 0; i < 3; i++) grab(D, [kX(120) + i * 1.10, s * 1.20, 1.85], [kX(120) + i * 1.10 + 0.30, s * 1.20, 1.85], [0, s * 0.05, 0]);
      liftEye(D, kX(100), s * 1.05, zt); liftEye(D, kX(600), s * 1.05, zt);
      box(D, kX(280) - 0.04, kX(280) + 0.40, s > 0 ? 1.20 : -1.225, s > 0 ? 1.225 : -1.20, 1.46, 1.49);
      box(D, kX(280) - 0.04, kX(280) + 0.40, s > 0 ? 1.20 : -1.225, s > 0 ? 1.225 : -1.20, 1.76, 1.79);
    }
    box(D, kX(560), kX(580), -0.50, 0.50, zt, zt + 0.04);
    box(B.paint, kX(580), kX(500), -0.45, 0.45, zt, zt + 0.04);
  }
  function buildKeiler(THREE, M, C) {
    var g = HeroM48.build(THREE, M, C), T = materials(THREE, C, P_OLIVE), B = bins(T), eg = new THREE.Group();
    g.name = "mineclear";
    dropNamed(g, "turret");
    repaint(g, T.paint);
    addKeiler(B);
    keilerDetail(B);
    eg.name = "flail";
    flush(THREE, eg, B);
    g.add(eg);
    return g;
  }

  /* =====================================================================================
     minelayer - "Armoured Mine-Laying Vehicle", STAND-IN for a cross-army row: the GMZ-3 tracked
     minelayer (Soviet, 1984).  Chosen because it is the armoured, tracked, purpose-built minelayer
     the desc describes ("scatters anti-tank mines behind it ... back to base for more"); the
     M548-based carriers of js/hero/us_m548_family.js build only the M727 and M1015 bodies, and the
     GMZ-3's SU-100P-family chassis has SEVEN road wheels (en.wikipedia), so the six-wheel 2S3 hull
     (js/hero/ru_2s3.js) is not the same hull and is not called.  Drawn here.
     References (Wikimedia Commons; scratchpad/q_supg_ref):
       [A] "GMZ-3 at Engineering Technologies 2012.jpg" - starboard front 3/4: the ribbed trough
           across the bow, the round front mudguards, the front sprocket, seven road wheels, the low
           front deck, the tall box superstructure over the rear two thirds, the cupola with the PKT
           and searchlight at its rear, the raised mine-laying gear at the tail.
       [R] "Engineering Technologies - 2012 (5-43).jpg" - port rear 3/4: the plough and the chute
           folded up at the tail, the spare sprocket on the rear plate, the log on the port fender,
           the three smoke tubes, the rear idler, the cupola at the superstructure's rear port corner.
     Published (en.wikipedia "GMZ-3", from the WEG): 8.62 x 3.25 x 2.70 m, 28.5 t, crew 3, "seven road
       wheels, front" sprocket, PKT; ru.wikipedia: 9,300 mm long (taken as with the plough down),
       clearance 430-470 mm, on the SU-100P chassis.
     Recognition: the ribbed bow trough and round front mudguards [A]; seven road wheels, front
       sprocket, rear idler [A][R]; low front deck, tall box superstructure behind [A][R]; the cupola
       at the rear with its PKT [A][R]; the folded plough and chute over the tail [R].
     Running gear from the SU-100P family figures of js/hero/ru_2s3.js (gauge 2.72 m, wheel 0.64 m)
       with a seventh station at the same 0.92 m pitch; no side drawing of the GMZ-3 was found.
     Paint: neutral olive (the "both" rows); [A][R] are Russian green, the "131" is not drawn.
     NOT CONFIRMED (no side-on photograph or drawing; proportions read from two 3/4 views against
       the published 8.62 x 3.25 x 2.70 m): the wheel pitch (0.92 m), the deck (1.55 m) and
       superstructure (2.25 m) heights and its front (x 0.90), the cupola's place, the shape of the
       folded mine-laying gear, the return rollers (four drawn).
     Nodes: seven "roadwheel" groups.
     ===================================================================================== */
  var GM = { XW: [2.76, 1.84, 0.92, 0.0, -0.92, -1.84, -2.76], ZW: 0.32, RW: 0.32, TY: 1.36, TW: 0.24,
             SPR: { x: 3.55, z: 0.62, r: 0.30 }, IDL: { x: -3.45, z: 0.60, r: 0.28 }, XR: [2.30, 0.92, -0.46, -1.84], ZR: 0.86 };
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  function addGmzTracks(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [];
    for (i = 0; i < GM.XW.length; i++) C.push([GM.XW[i], GM.ZW, GM.RW + 0.035]);
    C.push([GM.IDL.x, GM.IDL.z, GM.IDL.r + 0.035], [GM.SPR.x, GM.SPR.z, GM.SPR.r + 0.035]);
    for (i = 0; i < GM.XR.length; i++) C.push([GM.XR[i], GM.ZR, 0.10]);
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts);
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    cnt = Math.round(tot / 0.17); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * GM.TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - GM.TW, y + GM.TW, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.04, pz - dz * 0.04, px + dx * 0.04, pz + dz * 0.04, y - GM.TW - 0.01, y + GM.TW + 0.01, 0.07);
      }
      /* the toothed sprocket at the FRONT, the idler at the rear, four return rollers [A][R] */
      cylY(B.dark, GM.SPR.x, y - 0.10, y + 0.10, GM.SPR.z, GM.SPR.r - 0.05, 18);
      for (i = 0; i < 13; i++) {
        var ta = i / 13 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [GM.SPR.x + ca * (GM.SPR.r - 0.02), y, GM.SPR.z + sa * (GM.SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.08, 0.03);
      }
      cylY(B.paint, GM.SPR.x, y + s * 0.10, y + s * 0.15, GM.SPR.z, 0.14, 14);
      cylY(B.paint, GM.IDL.x, y - 0.12, y + 0.12, GM.IDL.z, GM.IDL.r, 18);
      cylY(B.dark, GM.IDL.x, y + s * 0.12, y + s * 0.17, GM.IDL.z, 0.07, 10);
      for (i = 0; i < GM.XR.length; i++) cylY(B.paint, GM.XR[i], y - 0.10, y + 0.10, GM.ZR, 0.10, 12);
    }
  }
  function gmzWheel(W) {
    var s, y, i, a, base = hex2rgb(P_OLIVE.base, 1.08), hole = [0.15, 0.16, 0.12];
    for (s = -1; s <= 1; s += 2) {
      y = s * GM.TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.11, y + 0.11, 0, GM.RW, 20);
      W.col = base;
      cyl(W, [0, y + s * 0.11, 0], [0, y + s * 0.14, 0], GM.RW - 0.05, 0.11, 20);
      W.col = hole;
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * 0.17, y + s * 0.13, Math.sin(a) * 0.17], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.05, 0.010, 0.045);
      }
      W.col = base;
      cylY(W, 0, y + s * 0.13, y + s * 0.17, 0, 0.08, 10);
    }
  }
  function addGmz(B) {
    var s, i, x, P = B.paint, D = B.dark;
    var NOSE = 3.92, REAR = -3.55, ZB = 0.45, ZF = 1.12, FW = 1.62, HW = 1.12, ZD = 1.55, XS = 0.90, ZS = 2.25, SW = 1.45;
    /* lower hull between the tracks: belly, the nose under the trough, the rear plate */
    prismY(P, [[REAR, 0.70], [REAR + 0.15, ZB], [3.30, ZB], [3.70, 0.80], [3.70, ZF], [REAR, ZF]], -HW, HW);
    /* the fenders over the tracks, the round mudguards ahead of the sprocket [A] */
    for (s = -1; s <= 1; s += 2) {
      box(P, REAR + 0.05, 3.25, s * HW, s * FW, ZF - 0.04, ZF);
      var AR = [], k, a;
      for (k = 0; k <= 6; k++) { a = (90 - k * 15) * Math.PI / 180; AR.push([3.25 + Math.cos(a) * 0.55, ZF - 0.55 + Math.sin(a) * 0.55]); }
      for (k = 0; k < 6; k++) belt(P, AR[k][0], AR[k][1], AR[k + 1][0], AR[k + 1][1], s * (HW + 0.02), s * FW, 0.035);
    }
    /* upper hull: the low front deck and the short glacis falling to the bow trough [A] */
    prismY(P, [[XS - 0.1, ZF], [3.70, ZF], [3.70, 1.25], [3.05, ZD], [XS - 0.1, ZD]], -SW, SW);
    /* the ribbed trough across the bow [A] */
    box(P, 3.62, NOSE, -1.30, 1.30, 0.78, 1.28);
    for (i = 0; i < 9; i++) { var yr = -1.20 + i * 0.30; box(P, NOSE, NOSE + 0.04, yr - 0.025, yr + 0.025, 0.80, 1.26); }
    box(D, NOSE - 0.02, NOSE + 0.05, -1.30, 1.30, 1.26, 1.30);
    /* front deck fittings: driver's hatch to port, engine grille to starboard, headlamps [A] */
    box(P, 2.10, 2.70, 0.40, 1.00, ZD, ZD + 0.06);
    for (i = 0; i < 6; i++) box(D, 1.30 + i * 0.16, 1.36 + i * 0.16, -1.25, -0.25, ZD, ZD + 0.02);
    for (s = -1; s <= 1; s += 2) { cyl(D, [3.05, s * 1.20, 1.66], [3.18, s * 1.20, 1.66], 0.08, 0.08, 10); }
    /* the tall superstructure over the rear two thirds, a lower block at its front [A][R] */
    box(P, REAR, XS, -SW, SW, ZD - 0.10, ZS);
    prismY(P, [[XS, ZD], [XS + 0.55, ZD], [XS + 0.55, ZD + 0.25], [XS, ZS - 0.20]], -SW + 0.10, SW - 0.10);
    for (s = -1; s <= 1; s += 2) box(D, REAR + 0.05, XS - 0.05, s * SW, s * (SW + 0.012), ZS - 0.04, ZS - 0.02);
    box(P, -0.60, 0.40, -0.60, 0.20, ZS, ZS + 0.05);                                /* roof hatch */
    /* the commander's cupola at the rear port corner, PKT and searchlight [A][R] */
    cylZ(P, -2.70, 0.70, ZS, ZS + 0.18, 0.42, 18);
    cylZ(P, -2.70, 0.70, ZS + 0.18, ZS + 0.24, 0.34, 18);
    box(D, -2.58, -2.40, 0.62, 0.78, ZS + 0.24, ZS + 0.36);
    cyl(D, [-2.50, 0.70, ZS + 0.32], [-1.80, 0.70, ZS + 0.32], 0.022, 0.022, 8);
    cyl(D, [-2.95, 0.95, ZS + 0.38], [-2.80, 0.95, ZS + 0.38], 0.09, 0.10, 12);
    box(D, -2.92, -2.84, 0.92, 0.98, ZS + 0.24, ZS + 0.30);
    /* the port side: the log on the fender, three smoke tubes, a box [R] */
    cylX(P, -1.90, 1.00, FW - 0.14, ZF + 0.14, 0.13, 12);
    for (i = 0; i < 3; i++) cyl(D, [0.30 + i * 0.16, SW + 0.05, ZS - 0.15], [0.30 + i * 0.16 + 0.10, SW + 0.20, ZS + 0.05], 0.05, 0.05, 8);
    box(P, -0.20, 0.50, SW, SW + 0.10, 1.70, 2.00);
    /* the rear plate: the spare sprocket to port, a stowage box to starboard [R] */
    cyl(D, [REAR, 0.85, 1.75], [REAR - 0.08, 0.85, 1.75], 0.30, 0.30, 16);
    box(P, REAR - 0.25, REAR, -1.25, -0.55, 1.45, 1.95);
    /* the mine-laying gear folded up over the tail: two side frames, the conveyor chute between,
       the plough's two mouldboards with their reversed discharges [R] */
    for (s = -1; s <= 1; s += 2) {
      bar(P, [REAR, s * 0.90, 1.30], [REAR - 0.95, s * 0.90, 2.55], 0.07);
      bar(P, [REAR, s * 0.90, 2.10], [REAR - 0.95, s * 0.90, 2.55], 0.05);
      bar(D, [REAR, s * 0.55, 1.00], [REAR - 0.70, s * 0.60, 2.10], 0.04);
      prismY(P, [[REAR - 0.35, 0.95], [REAR - 0.75, 1.05], [REAR - 1.10, 1.85], [REAR - 0.70, 1.95]], s * 0.45, s * 1.10);
    }
    loftN(P, [
      [[REAR - 0.05, -0.40, 1.10], [REAR - 0.05, 0.40, 1.10], [REAR + 0.10, 0.40, 1.35], [REAR + 0.10, -0.40, 1.35]],
      [[REAR - 0.85, -0.40, 2.30], [REAR - 0.85, 0.40, 2.30], [REAR - 0.70, 0.40, 2.52], [REAR - 0.70, -0.40, 2.52]]
    ]);
    for (i = 0; i < 6; i++) { x = REAR - 0.10 - i * 0.13; cyl(D, [x, -0.38, 1.30 + i * 0.19], [x, 0.38, 1.30 + i * 0.19], 0.035, 0.035, 8); }
    /* team colour: strips on the superstructure sides near the top */
    for (s = -1; s <= 1; s += 2) box(B.team, -1.80, -0.60, s > 0 ? SW : -SW - 0.012, s > 0 ? SW + 0.012 : -SW, ZS - 0.24, ZS - 0.12);
  }
  /* DETAIL PASS ([A][R]): grab handles and a tow cable on the superstructure's sides, lifting eyes,
     the roof hatch's hinges, the driver's periscopes, headlamp guards, the cupola's vision blocks,
     rear tow hooks, the fenders' edge strips and the bow trough's bolts.  Sizes NOT CONFIRMED. */
  function gmzDetail(B) {
    var s, i, D = B.dark, REAR = -3.55, ZF = 1.12, FW = 1.62, ZD = 1.55, XS = 0.90, ZS = 2.25, SW = 1.45, NOSE = 3.92;
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) grab(D, [-2.90 + i * 1.20, s * SW, 2.05], [-2.60 + i * 1.20, s * SW, 2.05], [0, s * 0.05, 0]);
      liftEye(D, XS - 0.15, s * (SW - 0.12), ZS); liftEye(D, REAR + 0.15, s * (SW - 0.12), ZS);
      box(D, REAR + 0.05, 3.25, s > 0 ? FW - 0.02 : -FW, s > 0 ? FW : -FW + 0.02, ZF - 0.10, ZF);
      /* headlamp guards */
      bar(D, [3.20, s * 1.12, 1.56], [3.20, s * 1.28, 1.56], 0.008);
      bar(D, [3.20, s * 1.12, 1.76], [3.20, s * 1.28, 1.76], 0.008);
      bar(D, [3.20, s * 1.20, 1.56], [3.20, s * 1.20, 1.76], 0.008);
      box(D, REAR - 0.12, REAR, s * 0.80 - 0.07, s * 0.80 + 0.07, 0.75, 0.90);
    }
    towCable(D, -2.80, -0.80, -SW, 1.70, 1.80, -1);
    cylY(D, -0.60, -0.62, 0.22, ZS + 0.05, 0.025, 8);
    B.vc.col = [0.10, 0.12, 0.13];
    for (i = 0; i < 3; i++) box(B.vc, 2.72, 2.76, 0.48 + i * 0.18, 0.58 + i * 0.18, ZD + 0.06, ZD + 0.12);
    for (i = 0; i < 6; i++) { var a = i / 6 * TAU; box(B.vc, -2.70 + Math.cos(a) * 0.36 - 0.035, -2.70 + Math.cos(a) * 0.36 + 0.035, 0.70 + Math.sin(a) * 0.36 - 0.035, 0.70 + Math.sin(a) * 0.36 + 0.035, ZS + 0.18, ZS + 0.22); }
    for (i = 0; i < 9; i++) box(D, NOSE + 0.035, NOSE + 0.055, -1.20 + i * 0.30 - 0.015, -1.20 + i * 0.30 + 0.015, 1.18, 1.21);
  }
  function buildGmz(THREE, M, C) {
    var T = materials(THREE, C, P_OLIVE), g = new THREE.Group(), B = bins(T), i, wg, W;
    g.name = "minelayer";
    addGmz(B);
    gmzDetail(B);
    addGmzTracks(B);
    flush(THREE, g, B);
    for (i = 0; i < GM.XW.length; i++) {
      W = new Bin(T.wheel, false, true);
      gmzWheel(W);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(GM.XW[i], 0, GM.ZW);
      flush(THREE, wg, { w: W });
      g.add(wg);
    }
    return g;
  }

  return { buildHemttRoc: buildHemttRoc, buildGaz: buildGaz, buildSx: buildSx, buildPls: buildPls,
           buildBrem: buildBrem, buildKeiler: buildKeiler, buildGmz: buildGmz };
})();

/* len: the measured X extent of each build (tools/model3d/dump.js) */
UNIT_MODELS["supply_r"] = { len: 10.28, build: HeroSupportGround.buildHemttRoc };
UNIT_MODELS["supply_k"] = { len: 5.44, build: HeroSupportGround.buildGaz };
UNIT_MODELS["supply_c"] = { len: 8.54, build: HeroSupportGround.buildSx };
UNIT_MODELS["mcv"] = { len: 10.99, build: HeroSupportGround.buildPls };
UNIT_MODELS["repair"] = { len: 7.76, build: HeroSupportGround.buildBrem };
UNIT_MODELS["mineclear"] = { len: 7.69, build: HeroSupportGround.buildKeiler };
UNIT_MODELS["minelayer"] = { len: 8.62, build: HeroSupportGround.buildGmz };
