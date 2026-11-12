/* ============ redo_pla_roc_ground.js - HERO models: five rows still on the old generic builders, redone ============
   ROW                 VEHICLE                                         HOW                                        PAINT
   nato_e90_lighttank  M8 Armored Gun System (XM8), level I armour     NEW  buildM8, measured off the published    US green
                                                                       dimensioned drawing [D1]
   pla_e90_tel         DF-15 (M-9) on the WS2400 TEL                   REUSED HeroPlaGroundModern.buildDf15b      the module's
                                                                       (js/hero/pla_ground_modern.js), the DF-15B's
                                                                       re-entry-vehicle fins taken off (VARIANT)
   sam_r               Tien Kung III (Sky Bow III) launcher trailer    NEW  buildTk3: "deploypose" / "travelpose"  ROC green
                       and its tractor                                 [R1-R4]
   radarv_c            SLC-2 weapon-locating radar                     NEW  buildSlc2, the radar as photographed   PLA green
                                                                       on the export Volvo FM 6x6 - a STAND-IN
                                                                       carrier [S1-S4]
   HELD (not registered here; the generic model stays):
   atgmv_c             AFT-10 (HJ-10 on the ZBD-04A chassis): no photograph or drawing of the vehicle was found.
                       Searched (2026-11-12): Commons "AFT-10", "HJ-10 missile", "HJ-10 anti-tank vehicle",
                       "Hongjian-10", "Red Arrow 10", Category:HJ-10 (one file: the round on a stand), "2015 China
                       Victory Day Parade" (the five kremlin.ru parade stills "Parade in Honour of the Victory in the
                       War of Resistance against Japan 01-07" read through: none shows it); en.wikipedia "HJ-10"
                       (one image, the round) and "ZBD-04" (eight images, all the IFV with its turret).
                       zh.wikipedia is refused by this session's proxy.  js/hero/pla_zbd04.js would be the hull to call.
   SEARCHES for the other rows are given in each section.

   References (Wikimedia Commons through thumb.php, cached in scratchpad q_redo_prg_ref and q_rocretry_ref):
     D1  "M8 AGS dimensions.png" - US Army dimensioned side and front views, inches and centimetres: THE MEASURING
         DRAWING for nato_e90_lighttank.  A1 "M8 Armored Gun System level 1 armor 1994.jpg" - port front quarter:
         the bolted level I armour, the smoke clusters, the .50 cal, the whips, the lamp guards, the pepperpot brake.
     R1-R4 (sam_r) and S1-S4 (radarv_c): listed in their sections.  pla_e90_tel: the module's own references.
   Model space: +X nose, +Y left (port), +Z up, metres, ground at z = 0.  ASCII only.  Plain paint: no national
   markings, numbers, banners or camouflage patterns (the TK-3 and SLC-2 photographs show camouflage and markings;
   neither is drawn); the team colour in small strips.  Materials: paint (the detail canvas texture of
   js/hero/roc_kpa_ground2.js: seams, bolt rows, panels, streaks, grime, chips), dark, glass, team, red (lamps),
   metal (ram rods, exhaust), wheel (vertex colours).
   LOAD ORDER: after js/hero/pla_ground_modern.js (HeroPlaGroundModern, for pla_e90_tel; the row is not registered
   if it is missing).  Nothing else is needed.
   ========================================================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRedoPlaRocGround = (function () {
  "use strict";
  var TAU = Math.PI * 2, D2R = Math.PI / 180;

  /* ------------------------------------------------------------ geometry kit (js/hero/roc_kpa_ground2.js, the Sherman's) */
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
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* a box on one side: s the side (+1 port), y the face, t the thickness outward */
  function sideBox(bin, s, y, t, x0, x1, z0, z1) { box(bin, x0, x1, s > 0 ? y : -y - t, s > 0 ? y + t : -y, z0, z1); }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  /* a square bar of half side h between two 3D points (the detail pass) */
  function bar(bin, A, B, h) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = unit(cross(ax, t)), v = cross(ax, u);
    var c = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2], l = Math.sqrt(dot(sub(B, A), sub(B, A))) / 2;
    slab(bin, c, ax, u, v, l, h, h);
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg || 14); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg || 14); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg || 14); }
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
  /* rings of a plan (x, y) scaled per level: L = [[z, sx, sy], ...] */
  function planLoft(bin, plan, L, x0) {
    var R = [], k, i;
    for (k = 0; k < L.length; k++) { R.push([]); for (i = 0; i < plan.length; i++) R[k].push([(x0 || 0) + plan[i][0] * L[k][1], plan[i][1] * L[k][2], L[k][0]]); }
    loftN(bin, R);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  var __DTEX = {};
  /* DETAIL PAINT (the detail pass): a 512 px tile over 2.94 m of surface (UVs 0.34 a metre, 174 px a
     metre).  Over the base colour and its soft blots: plate seams with a lit edge, bolt rows along some
     of them, access-panel outlines with corner screws, rain streaks, grime, dust, chipped paint and oil
     spots.  Plain paint - no markings, numbers or camouflage. */
  function detailTex(THREE, P) {
    var key = "detail" + P.seed + P.base;
    if (__DTEX[key] !== undefined) return __DTEX[key];
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
    __DTEX[key] = t;
    return t;
  }
  function materials(THREE, C, P) {
    var T = {}, tx = detailTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.red = new THREE.MeshStandardMaterial({ color: 0x8c3b34, roughness: 0.6, metalness: 0.05 });
    T.metal = new THREE.MeshStandardMaterial({ color: 0x8a8d88, roughness: 0.45, metalness: 0.6 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false),
             red: new Bin(T.red, false), metal: new Bin(T.metal, false) };
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
      m = new THREE.Mesh(geo, b.mat); m.castShadow = true; m.receiveShadow = true;
      group.add(m);
    }
  }
  function group(THREE, name, x, y, z) { var g = new THREE.Group(); if (name) g.name = name; g.position.set(x || 0, y || 0, z || 0); return g; }
  function rgb(h, k) { return [parseInt(h.substr(1, 2), 16) / 255 * k, parseInt(h.substr(3, 2), 16) / 255 * k, parseInt(h.substr(5, 2), 16) / 255 * k]; }

  /* a body of revolution about +X from a profile of [x, r] (js/hero/pla_ground_modern.js's lathe) */
  function lathe(bin, prof, seg, y, z) {
    var V = [], F = [], n = prof.length, i, k, a, b, c, d;
    y = y || 0; z = z || 0;
    for (k = 0; k < n; k++) for (i = 0; i < seg; i++) {
      a = i / seg * TAU;
      V.push([prof[k][0], y + Math.cos(a) * Math.max(prof[k][1], 1e-4), z + Math.sin(a) * Math.max(prof[k][1], 1e-4)]);
    }
    for (k = 0; k + 1 < n; k++) for (i = 0; i < seg; i++) {
      a = k * seg + i; b = k * seg + (i + 1) % seg; c = (k + 1) * seg + (i + 1) % seg; d = (k + 1) * seg + i;
      F.push([a, b, c], [a, c, d]);
    }
    for (i = 1; i + 1 < seg; i++) { F.push([0, i + 1, i]); F.push([(n - 1) * seg, (n - 1) * seg + i, (n - 1) * seg + i + 1]); }
    solid(bin, V, F);
  }

  /* ---------------------------------------------------------------- truck tyres
     js/hero/pla_ground_modern.js's lugged tyre (from the PHL-03 hero), scaled to radius R and half width H, the
     wheel painted in the vehicle's base colour; one "roadwheel" group per axle, origin on the axle centre */
  var TYRE = [0.11, 0.115, 0.12];
  function tyre(W, yc, s, R, H, base, nseg) {
    var N = nseg || 16, kr = R / 0.75, kh = H / 0.30;
    var P = [[-0.30, 0.47, 0, 0], [-0.30, 0.64, 0, 0], [-0.25, 0.73, 1, 0], [-0.10, 0.75, 1, 0], [-0.02, 0.75, 1, 1],
             [0.02, 0.75, 1, 0], [0.10, 0.75, 1, 1], [0.25, 0.73, 1, 1], [0.30, 0.64, 0, 0], [0.30, 0.47, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = P.length, RIM = rgb(base, 1.05), HUB = rgb(base, 1.2);
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = P[i][1] * kr;
      if (P[i][2] && ((j + P[i][3]) % 2)) r -= 0.04 * kr;
      a = j / N * TAU;
      V.push([r * Math.cos(a), yc + P[i][0] * kh, r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([0, yc + P[0][0] * kh, 0], [0, yc + P[m - 1][0] * kh, 0]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    W.col = TYRE;
    solid(W, V, F);
    W.col = RIM;
    cyl(W, [0, yc + s * 0.29 * kh, 0], [0, yc + s * 0.33 * kh, 0], 0.46 * kr, 0.40 * kr, N, false);
    W.col = HUB;
    cylY(W, 0, yc + s * 0.33 * kh, yc + s * 0.40 * kh, 0, 0.17 * kr, 10);
    var nn = N < 16 ? 5 : 8;
    for (j = 0; j < nn; j++) {
      a = (j + 0.5) / nn * TAU;
      cylY(W, Math.cos(a) * 0.26 * kr, yc + s * 0.32 * kh, yc + s * 0.355 * kh, Math.sin(a) * 0.26 * kr, 0.022 * kr, N < 16 ? 4 : 6);
    }
  }
  /* AX the axle stations; dual: twin tyres on each side (the outer pair at TY, the inner at TY - 2.1 H) */
  function addAxles(THREE, g, T, AX, R, H, TY, base, dual, nseg) {
    var i, wg, W, s;
    for (i = 0; i < AX.length; i++) {
      W = new Bin(T.wheel, false, true);
      for (s = -1; s <= 1; s += 2) {
        tyre(W, s * TY, s, R, H, base, nseg);
        if (dual && dual[i]) tyre(W, s * (TY - 2.1 * H), s, R, H, base, nseg);
      }
      W.col = [0.14, 0.15, 0.16];
      cylY(W, 0, -(TY - 0.25), TY - 0.25, 0, 0.11, 8);
      box(W, -0.20, 0.20, -0.28, 0.28, -0.18, 0.18);
      wg = group(THREE, "roadwheel", AX[i], 0, R);
      flush(THREE, wg, { wheel: W });
      g.add(wg);
    }
  }

  /* convex hull of 2D points (the track run round its wheels) */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  /* the track: a belt round the circles C = [[x, z, r]], shoes every `pitch`, a centre guide on
     every other shoe; both sides at +-ty, half width tw */
  function track(bin, C, ty, tw, pitch) {
    var pts = [], i, k, n, a, b, l, segs = [], tot = 0, q, rem, d, t, dx, dz, px, pz, s, y, cnt;
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts); n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length; cnt = Math.round(tot / pitch);
    var step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * ty;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(bin, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - tw + 0.02, y + tw - 0.02, 0.035);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(bin, px - dx * pitch * 0.38, pz - dz * pitch * 0.38, px + dx * pitch * 0.38, pz + dz * pitch * 0.38, y - tw, y + tw, 0.06);
        if (k % 2 === 0) belt(bin, px - dx * 0.025 - dz * 0.05, pz - dz * 0.025 + dx * 0.05, px + dx * 0.025 - dz * 0.05, pz + dz * 0.025 + dx * 0.05, y - 0.025, y + 0.025, 0.07);
      }
    }
  }
  function sprocket(bin, paint, x, z, r, ty, n) {
    var s, h, k, t, y;
    for (s = -1; s <= 1; s += 2) {
      y = s * ty;
      for (h = -1; h <= 1; h += 2) {
        cylY(bin, x, y + h * 0.10 - 0.035, y + h * 0.10 + 0.035, z, r - 0.03, 20);
        for (k = 0; k < n; k++) {
          t = k / n * TAU;
          slab(bin, [x + Math.cos(t) * (r - 0.01), y + h * 0.10, z + Math.sin(t) * (r - 0.01)], [Math.cos(t), 0, Math.sin(t)], [0, 1, 0], [-Math.sin(t), 0, Math.cos(t)], 0.04, 0.03, 0.03);
        }
      }
      cyl(paint, [x, y + s * 0.14, z], [x, y + s * 0.20, z], r - 0.06, r - 0.14, 16);
      cylY(bin, x, y + s * 0.20, y + s * 0.24, z, 0.09, 12);
    }
  }

  /* ======================================================================== M8 AGS (nato_e90_lighttank)
     Recognition list (what makes it read, and its source):
       1. Six large road wheels with no return rollers drawn, a front idler and a REAR sprocket (D1 side view).
       2. The long low hull: a shallow upper glacis from the nose to the turret ring, the flat roof, the raised
          engine deck at the rear with its back plate overhanging the track (D1, A1).
       3. The wide, low, slab-sided turret set well forward, its sides sloping in, the cheeks undercut at the
          front, the gun high in a narrow flat front face (D1 front and side, A1).
       4. The long 105 mm XM35 with its pepperpot muzzle brake and a collar half way (A1, D1).
       5. Smoke grenade clusters on both front cheeks of the turret (D1 front view, A1: eight tubes a side).
       6. The commander's cupola on the right with the .50 cal on its tall pintle; two whips at the left
          rear (D1 front view, A1).
       7. Bolt heads all over the level I armour, the headlamp housings with their guard rings on the glacis (A1).
     MEASURED off D1 (side view: 87.1 px per metre from the published 240 in hull; front view 85.5 px per metre
     from the 106 in width; ground line y 297).  Stations, hull origin at mid hull (D1 x 962.5): nose +3.05,
     rear -3.05; road wheels +1.85, +1.12, +0.39, -0.27, -1.02, -1.76 (first to last 3.61 m: the published
     142.2 in), radius 0.31 at z 0.35; idler +2.76 / z 0.60, sprocket -2.46 / z 0.62; hull bottom 0.42
     (published 16 in), the sponson line 0.80, the roof 1.47, the engine deck 1.76 (published 69.8 in = 1.77);
     turret ring at x +0.25, its roof 2.31, the cupola's top 2.52 (published 100.6 in = 2.55); gun axis 1.92,
     muzzle +6.08 (published overhang 121.4 in = 3.08 m).  Track centres +-1.09, shoes 0.38 (published 15 in).
     NOT CONFIRMED: the turret's plan between the front and side views (lofted through four measured levels);
     the hull's plan at the nose (D1 shows a straight full-width front); the cupola's periscope count; the
     engine deck grille pattern; the gun's collar position (A1, by eye).  Not drawn: the level II / III add-on
     armour (the drawing's panel rows are drawn as seams on the level I hull), the crew. */
  var M8 = {
    P: { base: "#4d5638", blots: ["#434c31", "#58613f"], seed: 1996 },
    XW: [1.85, 1.12, 0.39, -0.27, -1.02, -1.76], RW: 0.31, ZW: 0.38,
    SPR: [-2.46, 0.62, 0.25], IDL: [2.76, 0.60, 0.23], TY: 1.09, TW: 0.19,
    NOSE: 3.05, REAR: -2.93, BOT: 0.42, SPON: 0.80, ROOF: 1.47, DECK: 1.76, HW: 1.31, LW: 0.86,
    TX: 0.25, GZ: 0.45, MUZ: 5.83
  };
  function m8Hull(B) {
    var s, k, x, y, F = M8;
    /* the lower hull between the tracks: the lower nose plate up to the glacis, the rear plate (D1) */
    prismY(B.paint, [[2.95, 0.80], [2.66, F.BOT], [-2.60, F.BOT], [-2.74, F.SPON]], -F.LW, F.LW);
    /* the upper hull full width over the tracks: glacis from the nose to the ring, roof, rear plate leaning out */
    prismY(B.paint, [[F.NOSE, 1.06], [2.94, F.SPON], [-2.74, F.SPON], [-2.88, F.ROOF], [1.60, F.ROOF]], -F.HW, F.HW);
    /* the raised engine deck (D1: from x -1.80 up to 1.76, back to the rear plate's top) */
    prismY(B.paint, [[-1.80, F.ROOF], [-1.97, F.DECK], [F.REAR, F.DECK], [-2.88, F.ROOF]], -F.HW + 0.04, F.HW - 0.04);
    /* the belly plate's lip, the sponson floor */
    box(B.dark, -2.60, 2.66, -F.LW - 0.01, F.LW + 0.01, F.BOT - 0.02, F.BOT + 0.02);
    for (s = -1; s <= 1; s += 2) {
      /* the panel seams of the hull side (D1: six butts) and the bolt rows of the level I armour (A1) */
      [2.26, 1.04, 0.49, -0.05, -0.60, -1.14].forEach(function (xs) { sideBox(B.dark, s, F.HW, 0.012, xs - 0.012, xs + 0.012, F.SPON + 0.04, F.ROOF - 0.03); });
      sideBox(B.dark, s, F.HW, 0.01, -2.70, 2.90, 1.13, 1.145);
      for (x = -2.62; x < 2.85; x += 0.27) {
        box(B.dark, x - 0.016, x + 0.016, s > 0 ? F.HW : -F.HW - 0.02, s > 0 ? F.HW + 0.02 : -F.HW, F.ROOF - 0.086, F.ROOF - 0.054);
        box(B.dark, x + 0.119, x + 0.151, s > 0 ? F.HW : -F.HW - 0.02, s > 0 ? F.HW + 0.02 : -F.HW, F.SPON + 0.044, F.SPON + 0.076);
      }
      /* the track guard's edge along the sponson foot and the front fender plate over the idler (A1) */
      box(B.dark, -2.80, 2.95, s > 0 ? F.HW - 0.02 : -F.HW - 0.03, s > 0 ? F.HW + 0.03 : -F.HW + 0.02, F.SPON - 0.03, F.SPON + 0.01);
      box(B.paint, 2.90, 3.04, s > 0 ? F.LW : -F.HW, s > 0 ? F.HW : -F.LW, 0.80, 1.04);
      /* the headlamp housings with their guard rings on the glacis corners (A1, D1 front view) */
      var hx = 2.55, hz = 1.06 + (F.NOSE - hx) * 0.287 + 0.02, hy = s * 1.02;
      box(B.paint, hx - 0.14, hx + 0.12, hy - 0.13, hy + 0.13, hz - 0.04, hz + 0.18);
      cylX(B.glass, hx + 0.12, hx + 0.14, hy, hz + 0.08, 0.075, 0.075, 12);
      cyl(B.dark, [hx + 0.20, hy, hz + 0.08], [hx + 0.24, hy, hz + 0.08], 0.13, 0.13, 14, true);
      for (k = -1; k <= 1; k += 2) bar(B.dark, [hx + 0.10, hy + k * 0.13, hz - 0.02], [hx + 0.22, hy + k * 0.12, hz + 0.08], 0.012);
      /* towing eyes on the nose and at the rear (D1) */
      cylY(B.dark, F.NOSE - 0.05, s * 0.55 - 0.05, s * 0.55 + 0.05, 0.98, 0.07, 10);
      cylY(B.dark, -2.80, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.62, 0.07, 10);
      /* rear lamps, the engine deck's grab rail */
      box(B.glass, -2.95, -2.91, s * 1.12 - 0.07, s * 1.12 + 0.07, 1.48, 1.58);
      bar(B.dark, [-2.10, s * 1.20, F.DECK + 0.10], [-2.80, s * 1.20, F.DECK + 0.10], 0.012);
      bar(B.dark, [-2.10, s * 1.20, F.DECK], [-2.10, s * 1.20, F.DECK + 0.10], 0.012);
      bar(B.dark, [-2.80, s * 1.20, F.DECK], [-2.80, s * 1.20, F.DECK + 0.10], 0.012);
      /* shovel and pick on the sponson roof by the engine deck (stowage, A1 shows tools on the sides) */
      box(B.dark, -1.75, -0.55, s * 1.16 - 0.05, s * 1.16 + 0.05, F.ROOF, F.ROOF + 0.04);
      box(B.paint, -0.50, -0.20, s * 1.16 - 0.07, s * 1.16 + 0.07, F.ROOF, F.ROOF + 0.05);
    }
    /* the driver's hatch and periscopes on the glacis' top, left of centre (D1 side: x 2.2-1.6) */
    box(B.paint, 1.70, 2.20, 0.10, 0.70, 1.38, 1.47);
    cylZ(B.paint, 1.98, 0.40, 1.44, 1.52, 0.26, 16);
    for (k = 0; k < 3; k++) box(B.glass, 2.20, 2.24, 0.15 + k * 0.20, 0.30 + k * 0.20, 1.40, 1.46);
    /* the nose's bolted front plate and its light guards (A1) */
    for (y = -1.15; y <= 1.16; y += 0.23) cylX(B.dark, F.NOSE - 0.04, F.NOSE + 0.01, y, 0.98, 0.02, 0.02, 4);
    /* the engine deck: louvred grille panels, the access doors, the exhaust grille on the rear plate (D1, A1) */
    for (k = 0; k < 9; k++) box(B.dark, -2.85 + k * 0.10, -2.81 + k * 0.10, -0.95, -0.15, F.DECK, F.DECK + 0.02);
    box(B.dark, -2.85, -2.05, 0.15, 0.95, F.DECK, F.DECK + 0.012);
    box(B.paint, -2.80, -2.10, 0.20, 0.90, F.DECK + 0.012, F.DECK + 0.03);
    for (k = 0; k < 6; k++) box(B.dark, -2.95, -2.90, -0.80, 0.80, 1.20 + k * 0.06, 1.23 + k * 0.06);
    /* the tow pintle and the rear plate's stowage box */
    box(B.dark, -3.05, -2.80, -0.12, 0.12, 0.70, 0.86);
    box(B.paint, -3.02, -2.86, -1.25, -0.65, 0.90, 1.20);
  }
  function m8Gear(B) {
    var s, y, F = M8;
    var C = F.XW.map(function (x) { return [x, F.ZW, F.RW + 0.04]; });
    C.push([F.SPR[0], F.SPR[1], F.SPR[2] + 0.04], [F.IDL[0], F.IDL[1], F.IDL[2] + 0.04]);
    track(B.dark, C, F.TY, F.TW, 0.15);
    sprocket(B.dark, B.paint, F.SPR[0], F.SPR[1], F.SPR[2], F.TY, 11);
    for (s = -1; s <= 1; s += 2) {
      y = s * F.TY;
      cylY(B.dark, F.IDL[0], y - 0.15, y - 0.03, F.IDL[1], F.IDL[2], 18);
      cylY(B.dark, F.IDL[0], y + 0.03, y + 0.15, F.IDL[1], F.IDL[2], 18);
      cylY(B.paint, F.IDL[0], y + s * 0.15, y + s * 0.19, F.IDL[1], 0.10, 10);
      /* torsion bar arms, trailing, and the bump stops under the sponson (D1) */
      F.XW.forEach(function (x) {
        cyl(B.dark, [x + 0.30, s * (F.LW + 0.02), F.ZW + 0.20], [x, s * (F.LW + 0.02), F.ZW], 0.045, 0.045, 8);
        box(B.dark, x + 0.22, x + 0.36, s > 0 ? F.LW : -F.LW - 0.10, s > 0 ? F.LW + 0.10 : -F.LW, F.SPON - 0.12, F.SPON);
      });
      /* the track tensioner by the idler */
      cyl(B.dark, [F.IDL[0] - 0.05, s * (F.LW + 0.04), F.IDL[1]], [F.IDL[0] - 0.55, s * (F.LW + 0.04), 0.72], 0.04, 0.04, 8);
    }
  }
  function m8Wheel(W) {
    var BODY = rgb(M8.P.base, 1.1), RIM = rgb(M8.P.base, 1.25), TYRE = [0.12, 0.125, 0.115], s, y, h, i, a, R = M8.RW;
    for (s = -1; s <= 1; s += 2) {
      y = s * M8.TY;
      for (h = -1; h <= 1; h += 2) {
        W.col = TYRE; cylY(W, 0, y + h * 0.035, y + h * 0.17, 0, R, 16);
        W.col = BODY; cylY(W, 0, y + h * 0.03, y + h * 0.175, 0, R - 0.05, 12);
      }
      /* the dished outer disc with its six lightening holes, the hub and its nuts (D1) */
      W.col = RIM; cyl(W, [0, y + s * 0.175, 0], [0, y + s * 0.195, 0], R - 0.06, 0.11, 14);
      for (i = 0; i < 6; i++) {
        a = i / 6 * TAU; W.col = TYRE;
        slab(W, [Math.cos(a) * 0.17, y + s * 0.192, Math.sin(a) * 0.17], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.035, 0.006, 0.035);
      }
      W.col = BODY; cylY(W, 0, y + s * 0.19, y + s * 0.23, 0, 0.07, 8);
      for (i = 0; i < 6; i++) { a = (i + 0.5) / 6 * TAU; W.col = TYRE; box(W, Math.cos(a) * 0.05 - 0.01, Math.cos(a) * 0.05 + 0.01, s > 0 ? y + 0.23 : y - 0.24, s > 0 ? y + 0.24 : y - 0.23, Math.sin(a) * 0.05 - 0.01, Math.sin(a) * 0.05 + 0.01); }
    }
  }
  /* the turret (origin on the ring at the roof, x +0.25): four plan levels lofted (D1 side and front views) */
  function m8Plan(z, xf, wf, w, xr, wr) {
    return [[xf, -wf, z], [xf, wf, z], [xf - 0.42, w, z], [xr + 0.25, w, z], [xr, wr, z], [xr, -wr, z], [xr + 0.25, -w, z], [xf - 0.42, -w, z]];
  }
  function m8Turret(B) {
    var s, k, i, a, F = M8, GZ = F.GZ, TOP = 0.84;
    loftN(B.paint, [m8Plan(0.0, 0.95, 0.50, 1.04, -1.33, 0.88), m8Plan(0.21, 1.56, 0.62, 1.19, -1.40, 0.98),
                    m8Plan(0.68, 1.52, 0.58, 1.10, -1.52, 0.94), m8Plan(TOP, 1.30, 0.48, 0.80, -1.50, 0.78)]);
    /* the ring's skirt under the turret */
    cylZ(B.dark, 0, 0, -0.03, 0.02, 1.00, 24);
    /* the flat front face and the mantlet, the gun with its collar and pepperpot muzzle brake (A1, D1) */
    box(B.paint, 1.50, 1.70, -0.30, 0.30, GZ - 0.24, GZ + 0.22);
    cylX(B.paint, 1.70, 1.95, 0, GZ, 0.15, 0.12, 16);
    cylX(B.dark, 1.95, 4.00, 0, GZ, 0.085, 0.080, 16);
    cylX(B.dark, 3.95, 4.08, 0, GZ, 0.10, 0.10, 16);
    cylX(B.dark, 4.08, F.MUZ - 0.42, 0, GZ, 0.075, 0.070, 16);
    cylX(B.dark, F.MUZ - 0.42, F.MUZ, 0, GZ, 0.105, 0.105, 16);
    for (k = 0; k < 4; k++) for (i = 0; i < 8; i++) {
      a = i / 8 * TAU;
      slab(B.glass, [F.MUZ - 0.355 + k * 0.09, Math.cos(a) * 0.104, GZ + Math.sin(a) * 0.104], [1, 0, 0], [0, -Math.sin(a), Math.cos(a)], [0, Math.cos(a), Math.sin(a)], 0.022, 0.018, 0.004);
    }
    cylX(B.glass, F.MUZ - 0.01, F.MUZ + 0.005, 0, GZ, 0.06, 0.06, 12);
    /* the coaxial MG port and the gunner's sight head on the roof (D1 front: the box right of the gun) */
    cylX(B.dark, 1.62, 1.78, 0.36, GZ - 0.05, 0.03, 0.03, 8);
    box(B.paint, 0.85, 1.25, -0.62, -0.30, TOP, TOP + 0.20);
    box(B.glass, 1.25, 1.27, -0.58, -0.34, TOP + 0.05, TOP + 0.16);
    for (s = -1; s <= 1; s += 2) {
      /* the smoke grenade clusters on each front cheek, eight tubes (D1 front, A1) */
      for (k = 0; k < 8; k++) {
        var cy = s * (0.82 + (k % 3) * 0.10), cz = 0.30 + Math.floor(k / 3) * 0.12 + (k % 3 === 1 ? 0.06 : 0);
        cyl(B.dark, [1.18, cy, cz], [1.42, cy, cz + 0.06], 0.045, 0.045, 8);
      }
      box(B.paint, 1.05, 1.20, s * 0.78 - 0.02, s * 1.05 + 0.02, 0.22, 0.70);
      /* bolt rows on the turret sides (A1), the lifting eyes, the team strips */
      for (k = 0; k < 12; k++) {
        var bx = 1.20 - k * 0.22;
        cylY(B.dark, bx, s * 1.12, s * 1.16, 0.55, 0.02, 4);
        cylY(B.dark, bx - 0.11, s * 1.17, s * 1.20, 0.25, 0.02, 4);
      }
      cylY(B.dark, 1.35, s * 0.55 - 0.02, s * 0.55 + 0.02, TOP + 0.06, 0.06, 10);
      cylY(B.dark, -1.30, s * 0.70 - 0.02, s * 0.70 + 0.02, TOP + 0.06, 0.06, 10);
      sideBox(B.team, s, 1.11, 0.02, -1.10, -0.40, 0.62, 0.70);
      /* the stowage rack round the bustle */
      bar(B.dark, [-1.48, s * 0.95, 0.45], [-1.85, s * 0.95, 0.45], 0.015);
      bar(B.dark, [-1.48, s * 0.95, 0.20], [-1.85, s * 0.95, 0.20], 0.015);
      bar(B.dark, [-1.85, s * 0.95, 0.20], [-1.85, s * 0.95, 0.45], 0.015);
    }
    bar(B.dark, [-1.85, -0.95, 0.45], [-1.85, 0.95, 0.45], 0.015);
    bar(B.dark, [-1.85, -0.95, 0.20], [-1.85, 0.95, 0.20], 0.015);
    box(B.dark, -1.84, -1.50, -0.92, 0.92, 0.18, 0.21);
    box(B.paint, -1.80, -1.52, -0.80, -0.10, 0.21, 0.42);
    /* the commander's cupola on the right, its periscopes and hatch; the .50 cal on its tall pintle (D1 front) */
    var cx = -0.45, cyy = -0.75;
    cylZ(B.paint, cx, cyy, TOP - 0.02, TOP + 0.10, 0.36, 18);
    for (k = 0; k < 7; k++) { a = k / 7 * TAU; slab(B.glass, [cx + Math.cos(a) * 0.36, cyy + Math.sin(a) * 0.36, TOP + 0.06], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.012, 0.06, 0.03); }
    cylZ(B.paint, cx, cyy, TOP + 0.10, TOP + 0.17, 0.28, 16);
    cylZ(B.dark, cx, cyy - 0.30, TOP + 0.10, TOP + 0.52, 0.035, 8);
    box(B.dark, cx - 0.20, cx + 0.10, cyy - 0.36, cyy - 0.24, TOP + 0.48, TOP + 0.62);
    cylX(B.dark, cx + 0.10, cx + 0.95, cyy - 0.30, TOP + 0.58, 0.025, 0.022, 8);
    cylX(B.dark, cx - 0.35, cx - 0.20, cyy - 0.30, TOP + 0.56, 0.04, 0.04, 8);
    box(B.dark, cx - 0.12, cx + 0.05, cyy - 0.45, cyy - 0.36, TOP + 0.44, TOP + 0.56);
    /* the loader's hatch on the left; two whips at the left rear on their bases (D1 front: one by the centre) */
    cylZ(B.paint, -0.35, 0.45, TOP - 0.02, TOP + 0.06, 0.30, 16);
    box(B.dark, -0.42, -0.28, 0.20, 0.70, TOP + 0.06, TOP + 0.08);
    [[-1.05, 0.07], [-1.15, 0.71]].forEach(function (q) {
      cylZ(B.dark, q[0], q[1], TOP, TOP + 0.14, 0.05, 8);
      cyl(B.dark, [q[0], q[1], TOP + 0.14], [q[0], q[1], TOP + 1.60], 0.010, 0.005, 4);
    });
    /* the vent dome on the roof's centre */
    cylZ(B.dark, 0.35, 0.20, TOP, TOP + 0.06, 0.12, 10);
  }
  function buildM8(THREE, M, C) {
    var T = materials(THREE, C, M8.P), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, W;
    m8Hull(HB);
    m8Gear(HB);
    flush(THREE, g, HB);
    for (i = 0; i < M8.XW.length; i++) {
      W = new Bin(T.wheel, false, true); m8Wheel(W);
      wg = group(THREE, "roadwheel", M8.XW[i], 0, M8.ZW); flush(THREE, wg, { wheel: W }); g.add(wg);
    }
    m8Turret(TB);
    wg = group(THREE, "turret", M8.TX, 0, M8.ROOF); flush(THREE, wg, TB); g.add(wg);
    g.name = "nato_e90_lighttank";
    return g;
  }

  /* ======================================================================== DF-15 on the WS2400 (pla_e90_tel)
     POLICY 5: the WS2400 TEL and the DF-15 family round are already drawn by js/hero/pla_ground_modern.js for
     pla_e00_tel (the DF-15B, measured off "Dongfeng-15B.JPG", the 2015 parade).  Both rows name the same
     carrier ("on a WS2400 TEL"), so HeroPlaGroundModern.buildDf15b is called as it comes and nothing of it is
     copied.  The one VARIANT change: en.wikipedia "DF-15" (Design) - "The DF-15A is a variant that employs
     control fins at the rear of the missile and on the reentry vehicle ... The DF-15B is a further upgraded
     variant with similar features" - so the original DF-15 / M-9 of 1991 had NO control fins on its re-entry
     vehicle, and the four small fins that module draws on the DF-15B's re-entry vehicle are taken off here (the
     triangles of the podelev group's dark mesh lying on the round between stations 5.50 and 6.27 m from its
     tail, outside its 0.37 m body radius, dropped from that build's own geometry; nothing shared is touched).
     NOT CONFIRMED (no photograph of the M-9 round or its 1990s TEL was found - searches in the report): the
     re-entry vehicle's shape (drawn as the DF-15B's cone); the tail fins (kept: the same text puts "control
     fins at the rear" on the DF-15A, which may mean the original had fixed fins there or none); the round's
     0.80 m measured diameter against the published 1.0 m (the module's measurement).  Paint, nodes ("podelev"
     with userData.el and .cells, four "roadwheel"), size: the module's (11.38 m). */
  var DF15_RV = { HX: -5.30, HZ: 2.45, MT: -4.92, ZT: 2.85, PITCH: 4.0, U0: 5.50, U1: 6.27, R0: 0.37 };
  function stripRvFins(THREE, mesh) {
    var D = DF15_RV, geo = mesh.geometry, P = geo.getAttribute("position"), idx = geo.index;
    var n = idx ? idx.count : P.count, keep = [], t, k, v, X, Y, Z, u, w, fin;
    var cp = Math.cos(D.PITCH * D2R), sp = Math.sin(D.PITCH * D2R), xt = D.MT - D.HX, zt = D.ZT - D.HZ;
    for (t = 0; t < n; t += 3) {
      fin = true;
      for (k = 0; k < 3 && fin; k++) {
        v = idx ? idx.getX(t + k) : t + k;
        X = P.getX(v) - xt; Y = P.getY(v); Z = P.getZ(v) - zt;
        u = X * cp + Z * sp; w = -X * sp + Z * cp;
        if (!(u > D.U0 && u < D.U1 && Math.sqrt(Y * Y + w * w) > D.R0)) fin = false;
      }
      if (!fin) for (k = 0; k < 3; k++) keep.push(idx ? idx.getX(t + k) : t + k);
    }
    if (keep.length === n) return 0;
    var g2 = new THREE.BufferGeometry();
    ["position", "normal", "uv", "color"].forEach(function (name) {
      var A = geo.getAttribute(name), w2, o, i, j;
      if (!A) return;
      w2 = A.itemSize; o = new Float32Array(keep.length * w2);
      for (i = 0; i < keep.length; i++) for (j = 0; j < w2; j++) o[i * w2 + j] = A.array[keep[i] * w2 + j];
      g2.setAttribute(name, new THREE.BufferAttribute(o, w2));
    });
    mesh.geometry = g2;
    return (n - keep.length) / 3;
  }
  function buildDf15(THREE, M, C) {
    var g = HeroPlaGroundModern.buildDf15b(THREE, M, C), pe = null;
    g.traverse(function (o) { if (!pe && o.name === "podelev") pe = o; });
    if (pe) pe.children.forEach(function (o) {
      if (o.isMesh && !o.geometry.getAttribute("uv") && o.material && o.material.color && o.material.color.getHex() === 0x25272a) stripRvFins(THREE, o);
    });
    g.name = "pla_e90_tel";
    return g;
  }

  /* ======================================================================== Tien Kung III launcher (sam_r)
     The launcher is a semitrailer: a gooseneck with a big generator / equipment box on it behind a guard rail,
     a long flat deck, a tandem axle at the rear, and at the very rear two canister boxes (four rounds: en.wikipedia
     "Sky Bow", TK-3 "Launch platform: Towed quad launchers") that lie along the deck on the road and stand
     upright over the rear to fire, propped by two long rams from the deck.
     Recognition list (what makes it read, and its source):
       1. The two tall ribbed canister boxes standing upright side by side over the trailer's rear, the base
          structure under them down to the ground (R1, R2, R3).
       2. The two long rams from mid-deck to the boxes' front faces, the coiled cable runs beside them (R1).
       3. The tandem rear axle, the long flat deck with its stowage lockers under the side (R1, R2).
       4. The gooseneck with the large equipment box and the guard rail round its walkway, a whip aerial (R1, R2).
       5. On the march: the boxes lying along the deck, two cells high, behind a forward-control tractor with
          its flat face, split windscreen and the spare wheel behind the cab (R4).
     References (Wikimedia Commons, through thumb.php; scratchpad q_rocretry_ref and q_redo_prg_ref):
       R1 "TK-3 MEL.jpg" - port rear quarter, near side-on to the rear half: THE MEASURING PHOTO.
       (the Commons titles spell "III" with the Roman-numeral character U+2162; written "III" here)
       R2 "Tien Kung III Missile Model with Launcher Trailer Display at Military Academy Ground 20140531b.jpg" -
          port side from ahead of the gooseneck: the equipment box, the rail, the deck, the jacks, the boxes.
       R3 "...20140531a.jpg" and "Tien Kung III Missile Launcher Trailer Display at Military Academy Ground
          20140531.jpg" - the front and the starboard rear: the boxes side by side, the walkway.
       R4 the Commons file titled "Taipei - " and four Chinese characters ("centenary National Day parade"; the
          title is not ASCII, so it is described, not copied: it is the 10 Oct 2011 parade photo, 2656 x
          1768 px) - the launcher ON THE MARCH: the boxes lying level, each two cells high, the tractor's cab.
     Published: the round 5.498 m x 0.40 m (en.wikipedia "Sky Bow", TK-3).  No published size of the trailer.
     SCALE (NOT CONFIRMED, a chain): the trailer's tyre taken as 1.24 m (a 14.00 R 20 military tyre; R1 shows a
     large single tyre), 118 px at the rear axle in R1; the people beside the gooseneck (taken as 1.70 m, 85 px) give
     the scale at the front; the scale is taken as linear in image x between them and integrated along the side.
     That gives: trailer 10.9 m over the gooseneck rail, the tandem axles 1.84 and 3.13 m from the rear, the ram
     pivots 4.3 m, the equipment box 7.1-9.6 m; the deck top 1.70, the gooseneck deck 2.10; the boxes 6.4 m long
     (longer than the 5.5 m round, as they must be), standing to 7.95 m.
     NOT CONFIRMED: everything the scale chain sets; the boxes' section (1.0 x 1.0 m each, two cells; R4 shows two
     cells high when lying); the hinge (the lying boxes drawn on saddles, the standing ones on their base); the
     tractor behind the cab (R4 shows the cab and its front wheels only: two rear axles under the fifth wheel are
     drawn as a tractor must have them); the jack positions (R1, R2 show two at the rear and two by the
     gooseneck); the hidden starboard side.  Paint: plain ROC green (the parade and display launchers wear a
     camouflage pattern, which is not drawn).
     Nodes: "deploypose" (the trailer set up, uncoupled as R1 shows it, boxes upright, jacks down; hidden in the
     template) and "travelpose" (tractor and trailer, boxes lying, jacks up; shown), as js/hero/ru_s75_s125.js:
     the convoy is drawn at k of its true scale (userData.k) so it fits the set-up trailer's footprint, and len is
     the set-up trailer's length.  "roadwheel" groups: the trailer's two axles in each pose, the tractor's three.
     No "turret" (the boxes never traverse: js/hero/ru_s300.js's convention) and no "podelev". */
  var TK = {
    P: { base: "#4a5640", blots: ["#414c37", "#55614a"], seed: 2011 },
    XF: 5.45, XR: -5.45, AX: [-3.61, -2.32], RT: 0.62, TH: 0.20, TY: 1.02,
    ZD: 1.70, ZDF: 1.30, ZG: 2.10, XG: 2.29, HW: 1.25, E0: 1.61, E1: 4.14, KP: 4.45, RP: -1.16,
    BOXL: 6.40, BOXW: 1.00, BOXY: 0.56, BX0: -5.45, BX1: -4.40, BZ0: 1.55
  };
  function tkTrailer(B) {
    var s, k, x, F = TK;
    /* the main deck: the side beams, the top, the lockers under it between the gooseneck and the axles (R1, R2) */
    box(B.paint, F.BX1 + 0.05, F.XG + 0.30, -F.HW, F.HW, F.ZD - 0.12, F.ZD);
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.paint, s, F.HW - 0.12, 0.12, F.BX1 + 0.05, F.XG + 0.30, F.ZDF, F.ZD);
      for (k = 0; k < 6; k++) { x = -1.95 + k * 0.62; sideBox(B.paint, s, F.HW - 0.30, 0.18, x, x + 0.56, 0.85, F.ZDF); sideBox(B.dark, s, F.HW - 0.12, 0.012, x + 0.04, x + 0.52, 0.89, F.ZDF - 0.04); sideBox(B.dark, s, F.HW - 0.11, 0.03, x + 0.24, x + 0.32, 1.05, 1.09); }
      /* the mudguards over the tandem, the rear lamps and the team strip on the deck edge */
      box(B.dark, F.AX[0] - 0.75, F.AX[1] + 0.75, s * (F.TY - 0.30), s * (F.TY + 0.28), F.RT * 2 + 0.06, F.RT * 2 + 0.10);
      sideBox(B.dark, s, F.TY + 0.24, 0.04, F.AX[0] - 0.75, F.AX[1] + 0.75, F.RT * 2 - 0.25, F.RT * 2 + 0.10);
      sideBox(B.team, s, F.HW, 0.015, -1.20, -0.20, F.ZD - 0.10, F.ZD - 0.02);
      /* the spring hangers and the walking beam of the tandem */
      box(B.dark, F.AX[0] - 0.10, F.AX[1] + 0.10, s * 0.70 - 0.08, s * 0.70 + 0.08, F.RT + 0.05, F.RT + 0.22);
      box(B.dark, F.AX[0] - 0.80, F.AX[1] + 0.80, s * 0.70 - 0.06, s * 0.70 + 0.06, F.RT + 0.22, F.ZDF);
      /* tie-down rings along the deck edge */
      for (x = -4.2; x < -2.4; x += 0.6) sideBox(B.dark, s, F.HW, 0.03, x - 0.04, x + 0.04, F.ZD - 0.08, F.ZD - 0.02);
    }
    for (x = F.XG + 0.30; x > F.BX1; x -= 1.20) box(B.dark, x - 0.04, x, -F.HW + 0.02, F.HW - 0.02, F.ZD, F.ZD + 0.015);
    /* the frame rails under the deck */
    for (s = -1; s <= 1; s += 2) box(B.dark, F.BX1, F.XG + 0.30, s * 0.55 - 0.10, s * 0.55 + 0.10, 1.00, F.ZDF);
    /* the gooseneck: the step, the upper deck, its nose, the kingpin plate (R1, R2) */
    prismY(B.paint, [[F.XG, F.ZD - 0.12], [F.XG, F.ZG], [F.XF - 0.15, F.ZG], [F.XF, F.ZG - 0.15], [F.XF, 1.48], [F.XG + 0.30, 1.48]], -F.HW, F.HW);
    box(B.dark, F.XF - 1.60, F.XF - 0.50, -0.50, 0.50, 1.38, 1.48);
    cylZ(B.dark, F.KP, 0, 1.22, 1.38, 0.05, 8);
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.dark, s, F.HW, 0.012, F.XG + 0.05, F.XF - 0.10, 1.70, 1.72);
      /* the stowage lockers in the gooseneck's side (R2) */
      sideBox(B.dark, s, F.HW, 0.012, F.XG + 0.30, F.XG + 1.30, 1.55, 2.00);
      sideBox(B.dark, s, F.HW + 0.012, 0.03, F.XG + 1.20, F.XG + 1.26, 1.74, 1.82);
    }
    /* the equipment box on the gooseneck (R1, R2: about 1.9 m high, nearly the deck's width), its door, louvres,
       the air conditioner on its rear face, the lifting eyes */
    box(B.paint, F.E0, F.E1, -1.10, 1.10, F.ZG, F.ZG + 1.90);
    box(B.dark, F.E0 - 0.01, F.E1 + 0.01, -1.11, 1.11, F.ZG + 1.84, F.ZG + 1.88);
    box(B.paint, F.E0 + 0.05, F.E1 - 0.05, -1.05, 1.05, F.ZG + 1.88, F.ZG + 1.92);
    box(B.dark, F.E0 + 0.40, F.E0 + 1.20, -0.50, 0.30, F.ZG + 1.92, F.ZG + 2.12);
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.dark, s, 1.10, 0.012, F.E0 + 0.30, F.E0 + 1.20, F.ZG + 0.10, F.ZG + 1.70);
      sideBox(B.paint, s, 1.112, 0.012, F.E0 + 0.34, F.E0 + 1.16, F.ZG + 0.14, F.ZG + 1.66);
      sideBox(B.dark, s, 1.124, 0.03, F.E0 + 1.04, F.E0 + 1.10, F.ZG + 0.85, F.ZG + 1.00);
      for (k = 0; k < 8; k++) sideBox(B.dark, s, 1.10, 0.02, F.E0 + 1.50, F.E1 - 0.20, F.ZG + 0.50 + k * 0.12, F.ZG + 0.54 + k * 0.12);
      for (k = 0; k < 2; k++) cylY(B.dark, F.E0 + 0.20 + k * (F.E1 - F.E0 - 0.40), s * 1.10, s * 1.16, F.ZG + 1.80, 0.05, 6);
    }
    box(B.paint, F.E0 - 0.35, F.E0, -0.60, 0.60, F.ZG + 0.60, F.ZG + 1.40);
    for (k = 0; k < 6; k++) box(B.dark, F.E0 - 0.36, F.E0 - 0.34, -0.50, 0.50, F.ZG + 0.70 + k * 0.11, F.ZG + 0.75 + k * 0.11);
    /* the guard rail round the walkway behind the box and along the gooseneck (R1, R2: posts and two rails) */
    for (s = -1; s <= 1; s += 2) {
      for (x = F.XG + 0.05; x <= F.XF - 0.05; x += 0.62) bar(B.dark, [x, s * (F.HW - 0.04), F.ZG], [x, s * (F.HW - 0.04), F.ZG + 1.10], 0.02);
      bar(B.dark, [F.XG + 0.05, s * (F.HW - 0.04), F.ZG + 1.10], [F.XF - 0.05, s * (F.HW - 0.04), F.ZG + 1.10], 0.02);
      bar(B.dark, [F.XG + 0.05, s * (F.HW - 0.04), F.ZG + 0.55], [F.XF - 0.05, s * (F.HW - 0.04), F.ZG + 0.55], 0.015);
    }
    bar(B.dark, [F.XG + 0.05, -F.HW + 0.04, F.ZG + 1.10], [F.XG + 0.05, -0.40, F.ZG + 1.10], 0.02);
    bar(B.dark, [F.XG + 0.05, F.HW - 0.04, F.ZG + 1.10], [F.XG + 0.05, 0.40, F.ZG + 1.10], 0.02);
    /* the ladder down from the walkway, the whip aerial on its mount at the gooseneck's port front (R1) */
    for (k = 0; k < 4; k++) box(B.dark, F.XG - 0.30, F.XG - 0.02, -0.35, 0.35, 0.55 + k * 0.38, 0.58 + k * 0.38);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [F.XG - 0.30, s * 0.36, 0.50], [F.XG - 0.30, s * 0.36, F.ZG], 0.02);
    cylZ(B.dark, F.XF - 0.30, 1.00, F.ZG, F.ZG + 0.30, 0.05, 8);
    cyl(B.dark, [F.XF - 0.30, 1.00, F.ZG + 0.30], [F.XF - 0.30, 1.00, F.ZG + 5.00], 0.015, 0.008, 4);
    /* the ram pivots on the deck (R1) */
    for (s = -1; s <= 1; s += 2) box(B.dark, F.RP - 0.20, F.RP + 0.20, s * F.BOXY - 0.14, s * F.BOXY + 0.14, F.ZD, F.ZD + 0.25);
    /* the rear frame end, its lamps */
    box(B.dark, F.BX1 - 0.05, F.BX1 + 0.10, -F.HW, F.HW, 1.10, F.ZD);
    for (s = -1; s <= 1; s += 2) box(B.red, F.BX1 - 0.07, F.BX1 - 0.04, s * 1.05 - 0.08, s * 1.05 + 0.08, 1.20, 1.32);
  }
  /* the jacks: two by the gooseneck, two at the rear (R1, R2), down (set up) or up (on the march) */
  function tkJacks(B, down) {
    var s, F = TK, xs = [F.XG - 0.55, F.BX1 + 0.40], i, z0 = down ? 0.0 : 0.70;
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
      var y = s * (F.HW + 0.18);
      box(B.dark, xs[i] - 0.10, xs[i] + 0.10, s > 0 ? F.HW : -F.HW - 0.28, s > 0 ? F.HW + 0.28 : -F.HW, F.ZDF, F.ZDF + 0.20);
      cylZ(B.paint, xs[i], y, Math.max(z0 + 0.25, 0.75), F.ZDF + 0.10, 0.11, 10);
      cylZ(B.dark, xs[i], y, z0 + 0.08, z0 + 0.80, 0.07, 8);
      /* the bellows boot (R1: the ribbed sleeve) and the round foot */
      for (var k = 0; k < 3; k++) cylZ(B.dark, xs[i], y, z0 + 0.30 + k * 0.13, z0 + 0.36 + k * 0.13, 0.10, 8);
      cylZ(B.dark, xs[i], y, z0, z0 + 0.08, 0.22, 12);
    }
    /* the gooseneck's landing leg */
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.dark, F.XF - 1.10, s * 0.80, down ? 0.10 : 0.80, 1.45, 0.07, 8);
      box(B.dark, F.XF - 1.30, F.XF - 0.90, s * 0.80 - 0.15, s * 0.80 + 0.15, down ? 0 : 0.70, down ? 0.10 : 0.80);
    }
  }
  /* one canister box, two cells: its long axis along u (the box's foot end at A), w across the cells' stacking;
     ribbed sides (R1: hoops every 0.17 m, drawn every 0.24 m), the end caps, the lifting brackets (R1, R2) */
  function tkBox(B, A, u, v, w) {
    var F = TK, L = F.BOXL, h = F.BOXW / 2, k, t;
    function P(a, b, c) { return [A[0] + u[0] * a + v[0] * b + w[0] * c, A[1] + u[1] * a + v[1] * b + w[1] * c, A[2] + u[2] * a + v[2] * b + w[2] * c]; }
    slab(B.paint, P(L / 2, 0, 0), u, v, w, L / 2, h, h);
    for (t = 0.25; t < L - 0.1; t += 0.24) slab(B.dark, P(t, 0, 0), u, v, w, 0.025, h + 0.012, h + 0.012);
    /* the seam between the two cells, the end caps, the corner brackets the rams and saddles take */
    slab(B.dark, P(L / 2, 0, 0), u, v, w, L / 2 - 0.05, h + 0.016, 0.012);
    slab(B.paint, P(L - 0.06, 0, 0), u, v, w, 0.06, h + 0.03, h + 0.03);
    slab(B.paint, P(0.06, 0, 0), u, v, w, 0.06, h + 0.03, h + 0.03);
    for (k = 0; k < 2; k++) {
      var at = k ? L * 0.62 : L * 0.30;
      slab(B.dark, P(at, 0, 0), u, v, w, 0.07, h + 0.05, h + 0.05);
    }
    slab(B.dark, P(L * 0.45, -h - 0.03, h * 0.3), u, v, w, 0.20, 0.03, 0.16);
  }
  function tkBoxes(B, up) {
    var F = TK, s;
    for (s = -1; s <= 1; s += 2) {
      if (up) tkBox(B, [(F.BX0 + F.BX1) / 2, s * F.BOXY, F.BZ0], [0, 0, 1], [0, 1, 0], [-1, 0, 0]);
      else tkBox(B, [F.BX0 + 0.55, s * F.BOXY, F.ZD + 0.20 + F.BOXW / 2], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
    }
    if (up) {
      /* the base under the standing boxes, down to its ground plate (R1: the block from the ground to the boxes'
         foot), and the two rams from the deck to the boxes' front faces with the coiled cables beside them */
      box(B.paint, F.BX0, F.BX1, -1.10, 1.10, 0.15, F.BZ0);
      box(B.dark, F.BX0 - 0.10, F.BX1 + 0.10, -1.20, 1.20, 0.0, 0.15);
      for (s = -1; s <= 1; s += 2) {
        var top = [F.BX1 + 0.02, s * F.BOXY, 3.95], bot = [F.RP, s * F.BOXY, F.ZD + 0.15];
        cyl(B.paint, bot, [bot[0] + (top[0] - bot[0]) * 0.55, s * F.BOXY, bot[2] + (top[2] - bot[2]) * 0.55], 0.10, 0.10, 10);
        cyl(B.metal, [bot[0] + (top[0] - bot[0]) * 0.50, s * F.BOXY, bot[2] + (top[2] - bot[2]) * 0.50], top, 0.06, 0.06, 8);
        for (var k = 0; k < 14; k++) {
          var f = 0.30 + k * 0.045;
          cyl(B.dark, [bot[0] + (top[0] - bot[0]) * f, s * (F.BOXY - 0.16), bot[2] + (top[2] - bot[2]) * f + 0.10],
                      [bot[0] + (top[0] - bot[0]) * (f + 0.03), s * (F.BOXY - 0.16), bot[2] + (top[2] - bot[2]) * (f + 0.03) + 0.10], 0.06, 0.06, 6);
        }
      }
    } else {
      /* the saddles the lying boxes ride on, and the rams laid along the deck */
      [F.BX0 + 1.4, F.BX0 + 4.2].forEach(function (x) { box(B.dark, x - 0.12, x + 0.12, -1.10, 1.10, F.ZD, F.ZD + 0.20); });
      for (s = -1; s <= 1; s += 2) cyl(B.paint, [F.RP, s * (F.BOXY + 0.0), F.ZD + 0.15], [F.RP - 2.6, s * F.BOXY, F.ZD + 0.15], 0.08, 0.08, 8);
    }
  }
  /* the tractor (R4: the cab and its front wheels; the rest NOT CONFIRMED), in the convoy's frame */
  var TKT = { XN: 9.05, XC: 7.15, CW: 1.22, ZC: 2.95, ZF: 1.05, AX: [8.15, 5.20, 3.90], RT: 0.62, TH: 0.20, TY: 0.98, FW: 4.45 };
  function tkTractor(B) {
    var s, k, F = TKT, XN = F.XN, XC = F.XC, CW = F.CW;
    /* the cab: flat face, the windscreen leaning back a little, square roof (R4) */
    prismY(B.paint, [[XC, F.ZF], [XC, F.ZC], [XN - 0.25, F.ZC], [XN - 0.08, 2.05], [XN, 1.95], [XN, F.ZF]], -CW, CW);
    box(B.dark, XC - 0.02, XN - 0.10, -CW + 0.25, CW - 0.25, 0.80, F.ZF);
    /* the split windscreen, its centre post and wipers */
    var ang = Math.atan2(0.17, F.ZC - 2.05), L = (F.ZC - 2.12) / Math.cos(ang);
    for (s = -1; s <= 1; s += 2) {
      slab(B.glass, [XN - 0.165 + 0.012, s * 0.58, 2.10 + L * 0.5 * Math.cos(ang)], [-Math.sin(ang), 0, Math.cos(ang)], [0, 1, 0], [Math.cos(ang), 0, Math.sin(ang)], L * 0.5 - 0.04, 0.52, 0.015);
      bar(B.dark, [XN - 0.06, s * 0.30, 2.10], [XN - 0.12, s * 0.75, 2.45], 0.01);
      /* the door with its window, the window behind it, the handle, the steps (R4) */
      sideBox(B.dark, s, CW, 0.012, XC + 0.55, XN - 0.20, 1.10, F.ZC - 0.10);
      sideBox(B.paint, s, CW + 0.012, 0.01, XC + 0.59, XN - 0.24, 1.14, F.ZC - 0.14);
      sideBox(B.glass, s, CW + 0.022, 0.01, XC + 0.75, XN - 0.35, 2.10, F.ZC - 0.25);
      sideBox(B.dark, s, CW + 0.022, 0.03, XC + 0.70, XC + 0.85, 1.80, 1.86);
      for (k = 0; k < 2; k++) sideBox(B.dark, s, CW - 0.15, 0.20, XC + 0.70, XN - 0.30, 0.55 + k * 0.30, 0.60 + k * 0.30);
      /* the mirror on its arm off the cab front corner (R4) */
      bar(B.dark, [XN - 0.15, s * CW, 2.70], [XN + 0.05, s * (CW + 0.35), 2.75], 0.02);
      box(B.dark, XN + 0.00, XN + 0.10, s * (CW + 0.30) - 0.10, s * (CW + 0.30) + 0.10, 2.20, 2.70);
      /* the head lamps in the bumper, the louvred panel at the face's lower corner (R4), the amber roof lamps */
      box(B.glass, XN + 0.01, XN + 0.03, s * 0.95 - 0.12, s * 0.95 + 0.12, 1.20, 1.38);
      for (k = 0; k < 6; k++) box(B.dark, XN, XN + 0.02, s * (0.30 + k * 0.08) - 0.02, s * (0.30 + k * 0.08) + 0.02, 1.15, 1.85);
      for (k = 0; k < 2; k++) box(B.red, XN - 0.30, XN - 0.18, s * (0.85 + k * 0.20) - 0.05, s * (0.85 + k * 0.20) + 0.05, F.ZC, F.ZC + 0.08);
      /* the mudguard over the front wheel */
      box(B.paint, F.AX[0] - 0.75, F.AX[0] + 0.75, s * (F.TY - 0.30), s * (F.TY + 0.25), 1.30, 1.34);
      /* the fuel tank and battery box under the cab rear, the frame rails */
      cyl(B.paint, [XC - 1.20, s * 0.85, 0.85], [XC - 0.10, s * 0.85, 0.85], 0.28, 0.28, 12);
      box(B.dark, F.AX[2] - 0.70, XC, s * 0.45 - 0.08, s * 0.45 + 0.08, 0.80, 1.10);
      box(B.dark, F.AX[2] - 0.70, F.AX[1] + 0.70, s * (F.TY - 0.30), s * (F.TY + 0.25), 1.30, 1.34);
    }
    /* the bumper, the tow eyes, the team strip on the roof edge */
    box(B.paint, XN - 0.05, XN + 0.15, -CW, CW, 0.75, 1.05);
    for (s = -1; s <= 1; s += 2) cylY(B.dark, XN + 0.12, s * 0.65 - 0.05, s * 0.65 + 0.05, 0.85, 0.07, 8);
    box(B.team, XC + 0.30, XN - 0.60, -0.12, 0.12, F.ZC, F.ZC + 0.015);
    /* the spare wheel standing behind the cab on the left (R4), the exhaust stack on the right */
    cylY(B.dark, XC - 0.40, 0.40, 0.70, 2.10, 0.60, 16);
    cylY(B.paint, XC - 0.40, 0.70, 0.72, 2.10, 0.32, 12);
    box(B.dark, XC - 0.30, XC - 0.05, 0.30, 0.80, 1.10, 2.00);
    cylZ(B.dark, XC - 0.15, -0.95, 1.50, 3.10, 0.07, 8);
    /* the fifth wheel on its plate */
    box(B.dark, F.FW - 0.70, F.FW + 0.70, -0.75, 0.75, 1.10, 1.22);
    cylZ(B.dark, F.FW, 0, 1.22, 1.30, 0.60, 16);
  }
  function tkTrailerSet(THREE, T, g, B) {
    tkTrailer(B);
    addAxles(THREE, g, T, TK.AX, TK.RT, TK.TH, TK.TY, TK.P.base, null, 12);
  }
  function buildTk3(THREE, M, C) {
    var T = materials(THREE, C, TK.P), root = new THREE.Group(), dep = new THREE.Group(), trv = new THREE.Group(), DB = bins(T), TB = bins(T);
    dep.name = "deploypose"; trv.name = "travelpose";
    /* set up: the trailer uncoupled on its jacks, boxes standing (R1) */
    tkTrailerSet(THREE, T, dep, DB);
    tkJacks(DB, true);
    tkBoxes(DB, true);
    flush(THREE, dep, DB);
    dep.visible = false;
    /* on the march: the tractor, the trailer on it, boxes lying, jacks up (R4) */
    tkTrailerSet(THREE, T, trv, TB);
    tkJacks(TB, false);
    tkBoxes(TB, false);
    tkTractor(TB);
    addAxles(THREE, trv, T, TKT.AX, TKT.RT, TKT.TH, TKT.TY, TK.P.base, null, 12);
    flush(THREE, trv, TB);
    root.add(dep, trv);
    /* the convoy drawn at k of its true scale over the set-up trailer's footprint (js/hero/ru_s75_s125.js
       fitTravel) */
    var bd = new THREE.Box3().setFromObject(dep), bt = new THREE.Box3().setFromObject(trv);
    var k = (bd.max.x - bd.min.x) / (bt.max.x - bt.min.x);
    trv.scale.setScalar(k);
    trv.position.x = (bd.min.x + bd.max.x) / 2 - k * (bt.min.x + bt.max.x) / 2;
    trv.userData.k = k;
    root.name = "sam_r";
    return root;
  }

  /* ======================================================================== SLC-2 (radarv_c)
     A STAND-IN CARRIER: the only photographs of the SLC-2 weapon-locating radar found are of the Bangladesh
     Army's export sets, all on a Volvo FM 6x6 (S1-S4); no photograph of a PLA SLC-2 vehicle was found (searches
     in the report).  So this is the SLC-2 as photographed - its shelter body, the equipment cabinet, the array
     folded flat on top for the road - on the truck those photographs show, as js/hero/pla_retry.js draws the
     pla_e60_sam row on the towed HQ-2 launcher that was photographed.  Replace the truck if a PLA one turns up.
     Recognition list (what makes it read, and its source):
       1. The flat array lying over the shelter body for the road, on its frame and the hinge gear (S1, S3, S4).
       2. The box shelter body with its side lockers, the tall equipment cabinet between it and the cab (S4).
       3. The 6x6: one axle under the cab, the tandem under the body, the long gap (S1, S4).
       4. The forward-control high cab with its upright face, the slatted grille, the two tall pipes behind the
          cab (exhaust and air intake), the spare wheel standing at the rear with a ladder by it (S1, S3, S4).
     References (Wikimedia Commons, through thumb.php; scratchpad q_redo_prg_ref):
       S4 "Weapon locating RADAR SLC-2 Bangladesh Army (23115638624).jpg" - port side, square on: THE MEASURING
          PHOTO.  S3 "Bangladesh Army SLC-2 weapon locating Radar (25040973326).jpg" - front left: the cab front,
          the array's width.  S1 "Bangladesh Army SLC-2 radar on Volvo FM400 chassis. (31715708712).jpg" - port
          side, array under a cover.  S2 "Bangladesh Army SLC-2 Weapon Locating Radar on Volvo FM400 chassis.
          (33618734446).jpg" - the cab front close, the array's back face.
     MEASURED off S4 (125 px a metre, from the front tyre taken as 1.20 m - a 395/85 R 20; NOT CONFIRMED: no
     published size of the SLC-2 vehicle was found).  Bumper to rear frame 9.40 m; axles +3.04, -0.92, -2.38 from
     mid length (wheelbase to the tandem's centre 4.69 m); cab face +4.54, rear +2.18, roof 3.32; the body -3.22 to
     +0.74, 1.40-2.56 high; the array -3.38 to +0.78 (4.16 m), 3.08-3.80 high; the cabinet +0.78 to +1.62, to 3.52;
     the pipes to 4.12.  Width 2.50 m (NOT CONFIRMED: S3 shows the array about as wide as the cab).
     NOT CONFIRMED: the width; the starboard side; the array's mechanism (drawn as a frame and two hinge arms, S4
     shows the dark gap); the cab's face detail beyond S2/S3 (the grille, lamps and bumper drawn plain).  Not
     drawn: the array raised (no photograph of it set up), the camouflage cover of S1, the markings and the banner
     of S4.  Paint: plain PLA green.  Nodes: three "roadwheel" groups.  No "turret": the array is never seen
     traversing, only folded.  */
  var SL = {
    P: { base: "#525c3a", blots: ["#485232", "#5c6642"], seed: 2002 },
    AX: [3.04, -0.92, -2.38], RT: 0.60, TH: 0.20, TY: 1.00,
    XB: 4.70, XN: 4.54, XC: 2.18, ZC: 3.32, CW: 1.25, BW: 1.25, BX0: -3.22, BX1: 0.74, BZ0: 1.40, BZ1: 2.56,
    AX0: -3.38, AX1: 0.78, AZ0: 3.08, AZ1: 3.80, XR: -4.70
  };
  function slcTruck(B) {
    var s, k, x, F = SL, XN = F.XN, XC = F.XC, CW = F.CW;
    /* the cab (S3, S4): upright face, the windscreen leaning back, the high roof with its rounded front edge */
    prismY(B.paint, [[XC, 1.30], [XC, F.ZC - 0.05], [XC + 0.10, F.ZC], [XN - 0.20, F.ZC], [XN - 0.06, F.ZC - 0.12], [XN, 2.05], [XN, 1.00], [XN - 0.45, 0.85], [XC + 0.40, 1.30]], -CW, CW);
    /* the windscreen and the side windows (S4: x 1035-1150, the rear window 930-1005) */
    var ang = Math.atan2(0.06, 1.15);
    slab(B.glass, [XN - 0.015, 0, 2.62], [-Math.sin(ang), 0, Math.cos(ang)], [0, 1, 0], [Math.cos(ang), 0, Math.sin(ang)], 0.48, CW - 0.12, 0.015);
    /* the sun visor over the windscreen and the marker lamps on it (S2, S3), the wipers */
    box(B.paint, XN - 0.20, XN + 0.12, -CW + 0.05, CW - 0.05, F.ZC - 0.16, F.ZC - 0.10);
    for (k = 0; k < 5; k++) box(B.red, XN + 0.02, XN + 0.10, -0.60 + k * 0.30 - 0.05, -0.60 + k * 0.30 + 0.05, F.ZC - 0.10, F.ZC - 0.05);
    for (k = -1; k <= 1; k += 2) bar(B.dark, [XN + 0.01, k * 0.20, 2.12], [XN - 0.01, k * 0.75, 2.55], 0.01);
    /* the headlamps in the face over the bumper, the step in the bumper (S2) */
    for (k = -1; k <= 1; k += 2) { box(B.glass, XN + 0.00, XN + 0.03, k * 0.85 - 0.20, k * 0.85 + 0.20, 1.20, 1.40); box(B.dark, XN - 0.01, XN + 0.01, k * 0.85 - 0.24, k * 0.85 + 0.24, 1.17, 1.43); }
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.glass, s, CW, 0.012, 3.26, 4.18, 2.24, 3.00);
      sideBox(B.glass, s, CW, 0.012, 2.42, 3.02, 2.48, 3.00);
      sideBox(B.dark, s, CW, 0.012, 3.15, 3.18, 1.35, 3.10);
      sideBox(B.dark, s, CW, 0.012, 4.25, 4.28, 1.35, 3.10);
      sideBox(B.dark, s, CW + 0.012, 0.03, 3.30, 3.42, 2.05, 2.09);
      /* the steps up to the door, the grab handle (S2, S3) */
      for (k = 0; k < 3; k++) sideBox(B.dark, s, CW - 0.25, 0.25, 3.40, 3.95, 0.50 + k * 0.33, 0.55 + k * 0.33);
      sideBox(B.dark, s, CW, 0.04, XC + 0.12, XC + 0.16, 1.60, 2.80);
      /* the mirrors on their arms (S2, S3) */
      bar(B.dark, [XN - 0.10, s * CW, 2.95], [XN + 0.10, s * (CW + 0.25), 3.00], 0.02);
      box(B.dark, XN + 0.05, XN + 0.15, s * (CW + 0.20) - 0.12, s * (CW + 0.20) + 0.12, 2.30, 2.95);
      /* the lamp clusters in the bumper corners, the indicator lamps */
      box(B.glass, F.XB - 0.01, F.XB + 0.01, s * 0.95 - 0.16, s * 0.95 + 0.16, 0.95, 1.12);
      box(B.red, XN + 0.00, XN + 0.02, s * 1.15 - 0.05, s * 1.15 + 0.05, 1.70, 1.80);
      /* the front mudguard, the frame rails, the tandem's mudguards (S4) */
      box(B.dark, F.AX[0] - 0.70, F.AX[0] + 0.70, s * (F.TY - 0.25), s * (F.TY + 0.25), 1.30, 1.36);
      box(B.dark, F.XR + 0.25, F.XC, s * 0.45 - 0.08, s * 0.45 + 0.08, 1.04, 1.40);
      box(B.dark, F.AX[2] - 0.70, F.AX[1] + 0.70, s * (F.TY - 0.25), s * (F.TY + 0.25), 1.30, 1.36);
      /* the fuel tank and the battery box between the axle groups (S4: x 600-720) */
      cyl(B.paint, [-0.22, s * 0.90, 0.95], [0.74, s * 0.90, 0.95], 0.30, 0.30, 12);
      for (k = 0; k < 2; k++) cyl(B.dark, [0.0 + k * 0.5, s * 0.90, 0.95], [0.04 + k * 0.5, s * 0.90, 0.95], 0.315, 0.315, 12);
      box(B.dark, 1.70, 2.10, s * 0.95 - 0.30, s * 0.95 + 0.30, 0.70, 1.20);
    }
    /* the grille's slats and the bumper (S2, S3), the tow pin */
    for (k = 0; k < 5; k++) box(B.dark, XN, XN + 0.02, -0.75, 0.75, 1.55 + k * 0.08, 1.59 + k * 0.08);
    box(B.paint, XN - 0.10, F.XB, -CW, CW, 0.62, 1.15);
    box(B.dark, F.XB - 0.02, F.XB + 0.02, -0.12, 0.12, 0.70, 0.90);
    box(B.team, XC + 0.40, XN - 0.50, -0.12, 0.12, F.ZC, F.ZC + 0.015);
    /* the mudflaps behind each wheel group, the roof hatch and its rails (S1) */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, F.AX[0] - 0.72, F.AX[0] - 0.68, s * (F.TY - 0.25), s * (F.TY + 0.25), 0.40, 1.30);
      box(B.dark, F.AX[2] - 0.72, F.AX[2] - 0.68, s * (F.TY - 0.25), s * (F.TY + 0.25), 0.40, 1.30);
      bar(B.dark, [XC + 0.30, s * 0.90, F.ZC + 0.10], [XN - 0.50, s * 0.90, F.ZC + 0.10], 0.015);
      for (k = 0; k < 3; k++) bar(B.dark, [XC + 0.30 + k * 0.75, s * 0.90, F.ZC], [XC + 0.30 + k * 0.75, s * 0.90, F.ZC + 0.10], 0.015);
    }
    box(B.paint, 2.70, 3.30, -0.35, 0.35, F.ZC, F.ZC + 0.06);
    /* the exhaust and air-intake pipes behind the cab (S4: x 870-895 to 4.12, x 935-955 to 3.64) */
    cylZ(B.metal, 2.04, -0.95, 1.40, 4.12, 0.10, 10);
    cylZ(B.dark, 2.54, 0.95, 2.20, 3.64, 0.08, 10);
    /* the tall equipment cabinet between the cab and the body (S4), its doors and vents */
    box(B.paint, 0.78, 1.62, -1.15, 1.15, 0.56 + 0.84, 3.52);
    box(B.paint, 0.78, 1.62, -0.80, 0.80, 0.56, 1.40);
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.dark, s, 1.15, 0.012, 0.86, 1.54, 1.55, 3.35);
      sideBox(B.paint, s, 1.162, 0.012, 0.90, 1.50, 1.59, 3.31);
      for (k = 0; k < 6; k++) sideBox(B.dark, s, 1.174, 0.015, 0.98, 1.42, 2.80 + k * 0.07, 2.83 + k * 0.07);
      sideBox(B.dark, s, 1.174, 0.03, 1.40, 1.46, 2.30, 2.45);
    }
  }
  function slcBody(B) {
    var s, k, x, F = SL;
    /* the shelter body (S4): the side lockers along its foot, panel seams, the handles */
    box(B.paint, F.BX0, F.BX1, -F.BW, F.BW, F.BZ0, F.BZ1);
    box(B.dark, F.BX0 - 0.02, F.BX1 + 0.02, -F.BW - 0.02, F.BW + 0.02, F.BZ1 - 0.03, F.BZ1);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 5; k++) {
        x = F.BX0 + 0.15 + k * 0.78;
        sideBox(B.dark, s, F.BW, 0.012, x, x + 0.70, F.BZ0 + 0.05, F.BZ0 + 0.58);
        sideBox(B.paint, s, F.BW + 0.012, 0.012, x + 0.04, x + 0.66, F.BZ0 + 0.09, F.BZ0 + 0.54);
        sideBox(B.dark, s, F.BW + 0.024, 0.03, x + 0.30, x + 0.40, F.BZ0 + 0.44, F.BZ0 + 0.48);
      }
      [-2.10, -0.95, 0.10].forEach(function (xs) { sideBox(B.dark, s, F.BW, 0.012, xs - 0.01, xs + 0.01, F.BZ0 + 0.62, F.BZ1 - 0.05); });
      sideBox(B.team, s, F.BW, 0.015, -0.80, 0.20, F.BZ1 - 0.20, F.BZ1 - 0.12);
      /* grab handles and tie-down rings along the top edge, the lamps on the corners */
      for (x = F.BX0 + 0.30; x < F.BX1; x += 0.50) sideBox(B.dark, s, F.BW, 0.03, x - 0.04, x + 0.04, F.BZ1 - 0.10, F.BZ1 - 0.04);
      for (k = 0; k < 2; k++) bar(B.dark, [F.BX0 + 0.60 + k * 2.6, s * (F.BW + 0.05), F.BZ0 + 0.70], [F.BX0 + 0.90 + k * 2.6, s * (F.BW + 0.05), F.BZ0 + 0.70], 0.015);
      cylY(B.dark, F.BX0 + 0.10, s * F.BW, s * (F.BW + 0.05), F.BZ1 - 0.10, 0.05, 8);
      /* the tandem's spring hangers, the body's sub-frame */
      box(B.dark, F.AX[2] - 0.10, F.AX[1] + 0.10, s * 0.75 - 0.08, s * 0.75 + 0.08, F.RT + 0.05, F.RT + 0.25);
      box(B.dark, F.BX0, F.BX1, s * 0.55 - 0.08, s * 0.55 + 0.08, 1.30, F.BZ0);
    }
    /* the rear: the frame end, the carrier with the spare wheel standing on it, the ladder beside it (S1, S4) */
    box(B.dark, F.XR, F.BX0, -1.10, 1.10, 1.04, 1.30);
    box(B.dark, F.XR, F.XR + 0.12, -0.80, 0.80, 1.30, 2.70);
    cylY(B.dark, F.XR + 0.48, -0.70, -0.30, 1.92, 0.60, 16);
    cylY(B.paint, F.XR + 0.48, -0.30, -0.28, 1.92, 0.32, 12);
    for (k = 0; k < 6; k++) box(B.dark, F.XR + 0.05, F.XR + 0.30, 0.25, 0.75, 0.60 + k * 0.33, 0.63 + k * 0.33);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [F.XR + 0.18, 0.50 + s * 0.25, 0.55], [F.XR + 0.18, 0.50 + s * 0.25, 2.60], 0.02);
    for (s = -1; s <= 1; s += 2) box(B.red, F.XR - 0.02, F.XR + 0.01, s * 1.00 - 0.08, s * 1.00 + 0.08, 1.10, 1.22);
    /* the array's frame on the body roof and its two hinge arms (S4: the dark gap 2.56-3.08) */
    box(B.dark, F.BX0 + 0.10, F.BX1 - 0.10, -1.05, 1.05, F.BZ1, F.BZ1 + 0.10);
    for (s = -1; s <= 1; s += 2) {
      bar(B.dark, [-2.80, s * 0.85, F.BZ1 + 0.10], [-2.80, s * 0.85, F.AZ0], 0.06);
      bar(B.dark, [0.30, s * 0.85, F.BZ1 + 0.10], [0.30, s * 0.85, F.AZ0], 0.06);
      bar(B.paint, [-2.40, s * 0.70, F.BZ1 + 0.12], [-0.30, s * 0.70, F.AZ0 - 0.05], 0.08);
    }
    cylY(B.dark, -2.80, -1.10, 1.10, F.BZ1 + 0.30, 0.10, 10);
    /* the folded array (S3, S4): its back face up, the edge frame, the stiffener ribs, the corner lugs */
    box(B.paint, F.AX0, F.AX1, -1.22, 1.22, F.AZ0, F.AZ1);
    box(B.dark, F.AX0 - 0.03, F.AX1 + 0.03, -1.25, 1.25, F.AZ0 + 0.30, F.AZ0 + 0.36);
    for (k = 0; k < 7; k++) box(B.dark, F.AX0 + 0.25 + k * 0.60, F.AX0 + 0.31 + k * 0.60, -1.20, 1.20, F.AZ1, F.AZ1 + 0.04);
    box(B.dark, F.AX0 + 0.10, F.AX1 - 0.10, -0.04, 0.04, F.AZ1, F.AZ1 + 0.04);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) cylY(B.dark, k ? F.AX1 - 0.15 : F.AX0 + 0.15, s * 1.22, s * 1.30, F.AZ1 - 0.10, 0.06, 8);
  }
  function buildSlc2(THREE, M, C) {
    var T = materials(THREE, C, SL.P), g = new THREE.Group(), HB = bins(T);
    slcTruck(HB);
    slcBody(HB);
    flush(THREE, g, HB);
    addAxles(THREE, g, T, SL.AX, SL.RT, SL.TH, SL.TY, SL.P.base);
    g.name = "radarv_c";
    return g;
  }

  return { buildM8: buildM8, buildDf15: buildDf15, buildTk3: buildTk3, buildSlc2: buildSlc2 };
})();

UNIT_MODELS["nato_e90_lighttank"] = { len: 9.13, build: HeroRedoPlaRocGround.buildM8 };
if (typeof HeroPlaGroundModern !== "undefined" && typeof HeroPlaGroundModern.buildDf15b === "function") {
  UNIT_MODELS["pla_e90_tel"] = { len: 11.38, build: HeroRedoPlaRocGround.buildDf15 };
}
UNIT_MODELS["sam_r"] = { len: 11.00, build: HeroRedoPlaRocGround.buildTk3 };
UNIT_MODELS["radarv_c"] = { len: 9.54, build: HeroRedoPlaRocGround.buildSlc2 };
/* HELD - no reference found (see the header for the searches):
UNIT_MODELS["atgmv_c"] = ...;   AFT-10: no photograph or drawing of the vehicle
*/
