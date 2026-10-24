/* ============ pact_su25_frogfoot.js - HERO model: Sukhoi Su-25 Frogfoot ============
   The close-air-support jet of both Pact-side air forces: eight defs, one
   airframe. Full-quality redo, 2026-10-24, lofted from a three-view.

   Keys (all kept from the earlier file): pact_e80_cas and pact_e90_cas
   (Su-25), pact_e00_cas (Su-25SM), bomber_p (Su-25SM3, the 2020s row),
   bomber_k, kpa_e80_cas, kpa_e90_cas, kpa_e00_cas (Su-25K).

   Published figures (ru.wikipedia "Су-25", its data table): length 15.36 m
   with the air-data probe, span 14.36 m, height 4.8 m, wing area 30.1 m2,
   leading-edge sweep 20 deg, anhedral 2.5 deg, wheelbase 3.57 m, track
   2.51 m. CORRECTED: the old header gave 15.53 m (en.wikipedia's figure);
   drawing A, scaled uniformly by its span, gives 15.34 m, so the ru figure
   is used. This model: 15.31 x 14.35 x 4.80 m, wing area 29.6 m2 off its
   own planform, wheelbase 3.57 m, track 2.51 m. The tyres (about 0.84 m
   main, 0.66 m nose) are the old file's figures, not re-checked.

   References (Wikimedia Commons, fetched at 960 px for this file):
     A "Suchoi Su-25.svg" (Kaboldy, CC BY-SA 3.0): side, plan and front
       views. The tables below were read at 43.85 px/m along x and 44.4
       px/m across; the finished airframe is then scaled by KX = 0.9876
       along x, i.e. the drawing at 44.4 px/m both ways, which gives the
       published span and length together (14.36 m, 15.34 m). Its heights
       are drawn about 12 % taller than its lengths (fin tip to belly 187 px
       would make the aircraft 5.3 m tall), so heights are read at 50.4
       px/m, which puts the fin tip at the published 4.8 m with the 1.08 m
       belly height the photographs give.
     B "Sukhoi Su-25 red 07 RF-95480 Kubinka 2015.jpg" (CC BY-SA 3.0): a
       Su-25 in the Soviet factory camouflage, port side, gear down.
     C "Sukhoi Su-25SM3 RF-93023 ARMY-2022.jpg" (CC BY-SA 3.0): SM3, three-
       quarter front; caption names the L-370-3S ECM containers on the outer
       pylons and the Zakhvat UV sensor beside the nose gear.
     D "Su-25 in flight 01.JPEG" (public domain, 29 Sep 1989): a Soviet
       Su-25 from below: the planform, the nacelles ending at the wing
       trailing edge, the long boom, the tip pods, the pylons.
     E "Sukhoi Su-25SM Frogfoot 06 red (8584628804).jpg" (CC BY-SA 2.0,
       12 Aug 2012): an SM just reworked at Kubinka "in the latest dark
       grey colour scheme" (its caption): dark grey over a pale blue-green
       belly with a straight demarcation.

   Recognition list (each item shows on the model):
     1. Straight shoulder wing: leading edge swept 20 deg, trailing edge
        unswept, 2.5 deg anhedral, chord 3.4 m on the centreline and 0.85 m
        at the pod (A plan, D; published taper 3.38) - wingLE/wingTE/wingZ.
     2. Wingtip pods 2.2 m long, standing 0.6 m ahead of the leading edge
        and behind the trailing edge; their after part is the split
        airbrake (A plan, B, D) - the pod loft with its joint and split.
     3. Two engines in nacelles hugging the fuselage sides, tall oval
        intakes just behind the cockpit at x 2.96 (A plan and front, B, C)
        - NAC table.
     4. The nacelles END at the wing trailing edge, nozzles at x -3.0; a
        long slim tail boom carries the fin and tailplane 3.8 m further aft
        (A side and plan, D). The old model ran the nacelles to the tail.
     5. A long drooped nose ending in the dark laser-rangefinder window,
        the air-data probe from its port upper side (A side, B, E).
     6. The armoured cockpit: a narrow tub with a flat-plate windscreen and
        a bulged hood standing proud of the fuselage sides; the dorsal
        spine runs level with the hood top to the fin (A, B, E).
     7. Tall fin, leading edge swept 40 deg, near-vertical trailing edge;
        the brake-chute container is the tail cone under the rudder (A side).
     8. Ten pylons, long, their noses well ahead of the leading edge
        (A plan and front, B, D).
     9. Tall stalky gear: big low-pressure main tyres under the nacelles,
        the nose leg under the cockpit with its mud guard (B, C, E).
    10. Period paint (below).

   Paint, sampled from the photographs and taken to about 0.8 of level:
     soviet  (pact_e80_cas, pact_e90_cas) B: green, dark green, khaki and
             tan blotches over a light blue belly that rises a third of the
             way up the sides, wavy. B is a 2015 photograph of the Soviet
             factory scheme; no colour photograph of the 1980s was found.
     grey    (pact_e00_cas, the SM) E: dark grey over a pale blue-green
             belly, straight demarcation. The e00 row runs into the 2010s,
             when the reworked SMs came out of Kubinka in this scheme.
     sm3     (bomber_p) C: green and sand over a near-white belly whose
             scalloped edge runs high up the nose and nacelles.
     export  (bomber_k, kpa_*) the KPA STAND-IN: two-tone green over light
             grey, the Czech Su-25K export standard. No KPAF photograph.
   Markings: the Russian red star with a white edge on each side of the fin
   (B; ru_su35.js draws it the same way), Russian rows only. No bort
   numbers, no text. The KPA rows carry none (no photograph).

   Stores (the rows name only the GSh-30-2 gun): FAB-500 and FAB-250 bombs
   and B-8M1 rocket pods inboard, one R-60 outboard on the Soviet aircraft,
   an R-73 on the SM (ru.wikipedia lists it as cleared by the SM upgrade;
   no photograph of that load was checked). The SM3 carries what C shows:
   the L-370-3S container on the outermost pylon, the Zakhvat UV sensor by
   the nose gear, plus the KAB-500 its row's guided bomb names and two
   B-8M1. The SM's other fittings were not drawn: E shows none outside.
   The outermost pylon sits at 4.85 m, not the 5.08 m of A: the airbase
   revetment walls stand 5.1 m off the centreline at game scale and a store
   there went into a wall (parked3d_check B).

   Model space: +X nose, +Y left (port), +Z up, real metres. The origin is
   the wing-root mid-chord; tyres stand at z -2.00. Gear RETRACTS (into the
   nacelles and under the cockpit), so its group is named "gear"; it holds
   the lowest opaque points. Team colour exactly C.team: one strip on each
   upper outer wing.
   ================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSu25 = (function () {
  "use strict";

  var V = null;                                   /* THREE, set by build() */
  var PI = Math.PI;
  var GROUND = -2.00;                             /* tyre bottoms */

  /* ------------------------------------------------------------- paint --
     Four bands stacked, 40 px per metre: top, port side, starboard side,
     belly. Faces take the band their normal looks into. */
  var PXM = 40, XMIN = -7.3, TW = 640;
  var TOPH = 600, SIDEH = 216, TH = TOPH + 2 * SIDEH + TOPH;
  var YMAX = 7.5, ZTOP = 3.5, ZSPAN = 5.4;

  var SCHEMES = {
    soviet: { name: "soviet", seed: 25801, base: "#5c6844", belly: "#8a9a9e", wavy: true,
              blot: ["#3e4c36", "#6b6446", "#76665a", "#3e4c36"], dem: -0.45, star: true },
    grey:   { name: "grey", seed: 25803, base: "#585654", belly: "#93b0a8", wavy: false,
              blot: [], dem: -0.52, star: true },
    sm3:    { name: "sm3", seed: 25804, base: "#5a6950", belly: "#bcc2bc", wavy: true,
              blot: ["#968566", "#5a6950"], dem: 0.08, star: true },
    export: { name: "export", seed: 25802, base: "#4a5636", belly: "#8d9899", wavy: true,
              blot: ["#36432a", "#5f6742"], dem: -0.40, star: false }
  };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }
  function pxZ(z) { return (ZTOP - z) / ZSPAN * SIDEH; }

  function star(g, cx, cy, r) {
    function path(k) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? 0.40 : 1;
        var x = cx + Math.cos(a) * q * r * k, y = cy + Math.sin(a) * q * r * k;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#d9dad6"; path(1.18); g.fill();
    g.fillStyle = "#b3261e"; path(1.0); g.fill();
  }

  function paint(S) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = S.seed, i, b, x, y, k;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    g.fillStyle = S.base; g.fillRect(0, 0, TW, TOPH + 2 * SIDEH);
    /* disruptive patches: big soft-edged blotches on the top, smaller on the sides */
    if (S.blot.length) for (b = 0; b < 3; b++) {
      for (i = 0; i < (b ? 26 : 64); i++) {
        g.fillStyle = S.blot[i % S.blot.length];
        x = R() * TW; y = bandY[b] + R() * bandH[b];
        var rx = (b ? 26 : 34) + R() * (b ? 60 : 80), ry = (b ? 10 : 20) + R() * (b ? 22 : 46), rot = R() * 3.14;
        g.beginPath();
        for (k = 0; k < 14; k++) {
          var a = k / 14 * 6.283, w = 0.78 + R() * 0.3;
          var px = Math.cos(a) * rx * w, py = Math.sin(a) * ry * w;
          var qx = x + px * Math.cos(rot) - py * Math.sin(rot), qy = y + px * Math.sin(rot) + py * Math.cos(rot);
          if (k) g.lineTo(qx, qy); else g.moveTo(qx, qy);
        }
        g.closePath(); g.fill();
      }
    }
    /* the pale lower sides up to the demarcation: a soft wavy line where the
       scheme was hand-masked (B, C), a straight one on the grey SM (E) */
    var dy = pxZ(S.dem);
    for (b = 1; b <= 2; b++) {
      var ph = R() * 6.283, amp = S.wavy ? 5 : 0;
      g.fillStyle = S.belly;
      g.beginPath(); g.moveTo(0, bandY[b] + SIDEH);
      for (x = 0; x <= TW; x += 8)
        g.lineTo(x, bandY[b] + dy + amp * Math.sin(x / 23 + ph) + amp * 0.6 * Math.sin(x / 9.5 + 2 * ph));
      g.lineTo(TW, bandY[b] + SIDEH); g.closePath(); g.fill();
    }
    g.fillStyle = S.belly; g.fillRect(0, bandY[3], TW, TOPH);
    /* panel seams and rivet rows */
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1;
    for (b = 0; b < 4; b++) {
      x = 0;
      while (x < TW) { x += 20 + R() * 44; g.beginPath(); g.moveTo(x, bandY[b]); g.lineTo(x, bandY[b] + bandH[b]); g.stroke(); }
      y = bandY[b];
      while (y < bandY[b] + bandH[b]) { y += 16 + R() * 40; g.beginPath(); g.moveTo(0, y); g.lineTo(TW, y); g.stroke(); }
    }
    g.fillStyle = "rgba(0,0,0,0.24)";
    for (i = 0; i < 70; i++) {
      x = R() * TW * 0.95; y = R() * TH; k = 10 + ((R() * 30) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 5, y, 1.4, 1.4);
    }
    /* nozzle soot along the boom behind the nacelles, gun gas, oil streaks */
    var gr = g.createLinearGradient(pxX(-3.0), 0, pxX(-5.6), 0);
    gr.addColorStop(0, "rgba(22,19,16,0.50)"); gr.addColorStop(1, "rgba(22,19,16,0)");
    g.fillStyle = gr;
    for (b = 1; b <= 3; b++) g.fillRect(pxX(-5.6), bandY[b], pxX(-3.0) - pxX(-5.6), bandH[b]);
    for (i = 0; i < 70; i++) {
      g.fillStyle = "rgba(24,20,16," + (0.05 + R() * 0.10).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 50, 2 + R() * 7);
    }
    /* the Russian star on each side of the fin (B) */
    if (S.star) for (b = 1; b <= 2; b++) star(g, pxX(-4.45), bandY[b] + pxZ(1.75), 0.42 * PXM);
    return cv;
  }

  var _tex = {};
  function skinTexture(S) {
    if (_tex[S.name] !== undefined) return _tex[S.name];
    var t = false;
    try {
      t = new V.CanvasTexture(paint(S));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex[S.name] = t;
    return t;
  }

  /* Face-normal projection into the four bands; faces looking fore or aft
     are laid out along x + y so they do not collapse to a line. */
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
        if (band === 0) { U = pxX(x); W = clamp((YMAX - y) * PXM, 2, TOPH - 2); }
        else if (band === 3) { U = pxX(x); W = TOPH + 2 * SIDEH + clamp((YMAX - y) * PXM, 2, TOPH - 2); }
        else {
          U = pxX(endOn ? x + y : x);
          W = TOPH + (band - 1) * SIDEH + clamp(pxZ(z), 2, SIDEH - 2);
        }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* --------------------------------------------------------- materials -- */
  function makeMats(C, S) {
    var tex = skinTexture(S), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x5f6a48);
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    /* armoured glass and the laser window photograph dark from outside */
    m.glass = new V.MeshStandardMaterial({ color: 0x1b2a30, roughness: 0.10, metalness: 0.40 });
    m.store = new V.MeshStandardMaterial({ color: 0x4a5238, roughness: 0.80, metalness: 0.10 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xb2b8b8, roughness: 0.55, metalness: 0.15 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit -- */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
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
  function mesh(parent, list, mat, name, skinned) {
    if (!list.length) return null;
    var geo = merge(list);
    if (skinned) projUV(geo);
    geo.scale(KX, 1, 1);                         /* the drawing's x to the published length */
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function push(list, geos) {
    if (geos instanceof Array) for (var i = 0; i < geos.length; i++) list.push(geos[i]);
    else list.push(geos);
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* a convex solid from its faces, every face wound away from the centre */
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0];
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var o = (a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz;
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
  /* aerofoil section, ten points: round nose, crest at 30 %, sharp tail */
  var FOIL = [[0, 0], [0.025, 0.55], [0.10, 0.84], [0.30, 1.0], [0.60, 0.80], [1, 0.04]];
  function foil(le, te, t, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    var o = [], i;
    for (i = 0; i < FOIL.length; i++) o.push(p(FOIL[i][0], FOIL[i][1] * t / 2));
    for (i = FOIL.length - 1; i >= 1; i--) o.push(p(FOIL[i][0], -FOIL[i][1] * t / 2));
    return o;
  }
  /* a strip lying on a lifting surface between chord fractions f0 and f1 */
  function blk(le, te, f0, f1, h, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(f0, h), p(f1, h), p(f1, -h), p(f0, -h)];
  }

  /* ---- the loft. A section: x, centre y, top z, bottom z, half-width, and
     superellipse exponents for its upper and lower halves (1 round, lower
     is boxier). Sections run nose to tail. */
  function sec(x, yc, zt, zb, w, eu, el) { return { x: x, yc: yc, zt: zt, zb: zb, w: w, eu: eu || 1, el: el || eu || 1 }; }
  function ls(x, yc, zc, w, h, e) { return sec(x, yc, zc + h, zc - h, w, e, e); }
  function sgn(v) { return v < 0 ? -1 : 1; }
  function ringOf(s, n) {
    var o = [], j, t, c, sn, zc = (s.zt + s.zb) / 2, h = (s.zt - s.zb) / 2;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      var e = sn >= 0 ? s.eu : s.el;
      o.push([s.yc + s.w * sgn(c) * Math.pow(Math.abs(c), e), zc + h * sgn(sn) * Math.pow(Math.abs(sn), e)]);
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
  function revolve(prof, len, r, x, y, z, n, capNose, capTail) {
    var secs = [], i;
    for (i = 0; i < prof.length; i++) secs.push(ls(x + prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], 1));
    return loft(secs, n, capNose === undefined ? 0 : capNose, capTail === undefined ? 0 : capTail);
  }

  /* ----------------------------------------------------- airframe tables --
     All read off drawing A: X = (px - 575) / 43.85, Y = (577.5 - py) / 44.4,
     Z = (151.6 - py) / 50.4 (see the header); x is scaled by KX at the end. */
  var KX = 0.9876;

  /* Fuselage: [x, half-width, top z, bottom z, upper exp, lower exp]. The
     forward body's top is the cockpit sill up to the hood (x 3.5), then the
     dorsal spine level with the hood top (z 0.63) all the way aft. The
     bottom is flat at the nacelle belly line (z -0.92), rising behind the
     nozzles into the slim tail boom (A side). */
  var BODY = [
    [7.47, 0.17, -0.40, -0.70, 0.85, 0.85],
    [7.30, 0.21, -0.36, -0.75, 0.80, 0.80],
    [7.00, 0.25, -0.30, -0.79, 0.75, 0.75],
    [6.59, 0.31, -0.19, -0.85, 0.72, 0.70],
    [6.20, 0.35, -0.10, -0.89, 0.70, 0.66],
    [5.77, 0.39,  0.00, -0.92, 0.70, 0.62],
    [5.40, 0.41,  0.10, -0.92, 0.66, 0.60],
    [4.80, 0.42,  0.14, -0.92, 0.62, 0.58],
    [4.00, 0.43,  0.16, -0.92, 0.62, 0.58],
    [3.55, 0.43,  0.30, -0.92, 0.70, 0.58],
    [3.20, 0.43,  0.60, -0.92, 0.80, 0.58],
    [2.40, 0.43,  0.63, -0.92, 0.70, 0.58],
    [1.00, 0.43,  0.63, -0.92, 0.66, 0.58],
    [-0.50, 0.42, 0.63, -0.92, 0.66, 0.58],
    [-1.60, 0.40, 0.63, -0.84, 0.66, 0.60],
    [-2.20, 0.36, 0.63, -0.74, 0.68, 0.66],
    [-2.70, 0.30, 0.63, -0.62, 0.70, 0.72],
    [-3.26, 0.26, 0.63, -0.40, 0.74, 0.80],
    [-3.80, 0.245, 0.63, -0.30, 0.76, 0.82],
    [-4.40, 0.23, 0.63, -0.18, 0.78, 0.84],
    [-4.90, 0.21, 0.63, -0.02, 0.80, 0.86],
    [-5.45, 0.19, 0.63, 0.12, 0.82, 0.88],
    [-6.00, 0.17, 0.62, 0.22, 0.86, 0.90],
    [-6.35, 0.12, 0.60, 0.30, 0.90, 0.92]
  ];

  /* Nacelles (A plan, side, front; D): [x, centre y, top z, bottom z,
     half-width, exp]. Intake lip at x 2.96; the tops rise under the wing,
     the outer edge sits 1.25 m out; aft of the wing they taper and close in
     to the nozzles at x -3.0, 0.64 m off the centreline. */
  var NAC = [
    [2.96, 0.84, 0.12, -0.92, 0.42, 0.92],
    [2.75, 0.84, 0.15, -0.93, 0.43, 0.90],
    [2.00, 0.84, 0.24, -0.93, 0.43, 0.86],
    [0.50, 0.84, 0.26, -0.93, 0.43, 0.84],
    [-1.00, 0.83, 0.24, -0.92, 0.42, 0.84],
    [-1.60, 0.81, 0.18, -0.85, 0.41, 0.86],
    [-2.20, 0.76, 0.08, -0.75, 0.39, 0.90],
    [-2.70, 0.70, 0.02, -0.63, 0.36, 0.94],
    [-2.96, 0.665, -0.01, -0.56, 0.33, 0.98]
  ];

  /* Wing (A plan): leading edge straight from the root to the tip pod,
     swept 20 deg; trailing edge unswept at x -1.505; 2.5 deg anhedral. */
  var TIPY = 6.93;
  function wingLE(y) { return 1.51 - 0.3766 * (y - 1.21); }
  function wingTE(y) { return -1.505; }
  function wingZ(y) { return 0.38 - 0.04366 * (y - 0.42); }
  function wingT(y) { return 0.40 - 0.0445 * (y - 0.42); }
  function wingSec(y, s) {
    var z = wingZ(y);
    return foil([wingLE(y), s * y, z], [wingTE(y), s * y, z], wingT(y), [0, 0, 1]);
  }
  /* Fin (A side): leading edge swept 40 deg, root on the spine at z 0.63,
     tip at z 2.74 under its cap. */
  var FIN_TOP = 2.74;                     /* the tip cap tops out at 2.80: 4.80 m on the gear */
  function finF(z) { return (z - 0.63) / (FIN_TOP - 0.63); }
  function finLE(z) { return -2.61 - (z - 0.63) * 0.853; }
  function finTE(z) { return -5.50 + (z - 0.63) * 0.15; }
  function finT(z) { return 0.22 - finF(z) * 0.13; }
  function finSec(z) { return foil([finLE(z), 0, z], [finTE(z), 0, z], finT(z), [0, 1, 0]); }
  /* Tailplane (A plan): root chord 1.82 m at the boom, tip 0.96 m at
     2.22 m out; set at the boom top with the slight dihedral A's side view
     shows. */
  function tpSec(y, s) {
    var f = (y - 0.20) / 2.02;
    var le = -3.95 - f * 0.79, te = -5.77 + f * 0.04, z = 0.50 + f * 0.17;
    return foil([le, s * y, z], [te, s * y, z], 0.17 - f * 0.10, [0, 0, 1]);
  }

  var CANOPY = [
    /* x, top z, half-width: flat-plate windscreen from the sill at x 5.47
       to its arch at x 4.85, then the bulged hood, whose sides stand out
       past the fuselage (A front: 0.9 m across) */
    [5.47, 0.11, 0.30], [5.25, 0.33, 0.35], [5.02, 0.52, 0.38], [4.85, 0.63, 0.40],
    [4.55, 0.70, 0.44], [4.10, 0.71, 0.45], [3.75, 0.69, 0.42], [3.52, 0.64, 0.36], [3.35, 0.61, 0.30]
  ];
  var SILL = 0.08;

  /* ----------------------------------------------------------- stores -- */
  var P_BOMB = [[0.50, 0.04], [0.38, 0.62], [0.22, 0.96], [0.05, 1.0], [-0.22, 1.0], [-0.38, 0.66], [-0.50, 0.42]];
  var P_POD  = [[0.50, 0.86], [0.485, 0.96], [0.46, 1.0], [-0.30, 1.0], [-0.44, 0.86], [-0.50, 0.50]];
  var P_ECM  = [[0.50, 0.22], [0.44, 0.68], [0.34, 0.95], [0.18, 1.0], [-0.26, 1.0], [-0.40, 0.84], [-0.50, 0.46]];
  var P_AAM  = [[0.50, 0.05], [0.44, 0.60], [0.36, 1.0], [-0.40, 1.0], [-0.50, 0.9]];
  /* pylon stations off the centreline (A front: 2.0, 2.8, 3.55, 4.33, and
     the outermost moved in to 4.85, see the header) */
  var ST_Y = [2.00, 2.80, 3.55, 4.33, 4.85];

  /* a pylon: long and slim, its nose well ahead of the leading edge (A, B) */
  function pylon(K, y, zTop, depth, x0, x1) {
    var hw = 0.05, zb = zTop - depth;
    var A = [[x1, y - hw, zTop], [x0, y - hw, zTop], [x0, y + hw, zTop], [x1, y + hw, zTop]];
    var B = [[x1 - 0.35, y - hw * 0.8, zb], [x0 + 0.25, y - hw * 0.8, zb], [x0 + 0.25, y + hw * 0.8, zb], [x1 - 0.35, y + hw * 0.8, zb]];
    K.skin.push(solid(A, B));
  }
  function finsAt(list, x, y, z, chord, span) {
    list.push(box(chord, span * 2, 0.025, x, y, z));
    list.push(box(chord, 0.025, span * 2, x, y, z));
  }
  function addStore(K, kind, s, st) {
    var y = s * ST_Y[st], ay = ST_Y[st];
    var zb = wingZ(ay) - wingT(ay) * 0.42;
    var le = wingLE(ay), te = wingTE(ay);
    var xm = le - 0.30;                          /* store centre sits under the leading edge */
    var len, r, zc, depth = 0.24;
    if (kind === "fab500") { len = 2.25; r = 0.225; }
    else if (kind === "fab250") { len = 1.55; r = 0.16; }
    else if (kind === "kab500") { len = 3.05; r = 0.20; }
    else if (kind === "b8") { len = 3.45; r = 0.19; }
    else if (kind === "ub32") { len = 2.0; r = 0.21; }
    else if (kind === "ecm") { len = 2.7; r = 0.19; }
    else if (kind === "r60" || kind === "none") { len = 2.1; r = 0.06; }
    else if (kind === "empty") { len = 0; r = 0.10; }
    else { len = 2.9; r = 0.085; }                                  /* r73 */
    if (kind === "none" || kind === "r60") {
      /* the light outermost (missile) pylon */
      pylon(K, y, zb + 0.04, 0.26, le + 0.55, te + 0.45);
      if (kind === "none") return;
      zc = zb - 0.30;
      K.dark.push(box(1.5, 0.07, 0.05, xm + 0.2, y, zc + 0.08));
      push(K.pale, revolve(P_AAM, len, r, xm + 0.3, y, zc, 10));
      finsAt(K.pale, xm - 0.6, y, zc, 0.22, 0.14);
      return;
    }
    pylon(K, y, zb + 0.04, depth, le + 0.85, te + 0.35);
    if (kind === "empty") return;
    zc = zb - depth - r + 0.02;
    if (kind === "r73") {
      K.dark.push(box(1.1, 0.07, 0.05, xm + 0.1, y, zc + r + 0.02));
      push(K.pale, revolve(P_AAM, len, r, xm + 0.3, y, zc, 12));
      finsAt(K.pale, xm - 1.05, y, zc, 0.34, 0.20);
      finsAt(K.pale, xm + 0.65, y, zc, 0.20, 0.13);
    } else if (kind === "ecm") {
      push(K.pale, revolve(P_ECM, len, r, xm + 0.1, y, zc, 18));
      K.dark.push(cyl(r + 0.004, r + 0.004, 0.16, 14, "x", xm + 0.1 + len * 0.28, y, zc));
      K.dark.push(cyl(r + 0.004, r + 0.004, 0.16, 14, "x", xm + 0.1 - len * 0.30, y, zc));
    } else if (kind === "b8" || kind === "ub32") {
      push(K.store, revolve(P_POD, len, r, xm + 0.25, y, zc, 18));
      K.dark.push(cyl(r * 0.84, r * 0.84, 0.02, 14, "x", xm + 0.25 + len * 0.5 + 0.004, y, zc));
    } else {
      push(K.store, revolve(P_BOMB, len, r, xm, y, zc, 16));
      finsAt(K.store, xm - len * 0.42, y, zc, len * 0.20, r * 1.45);
      if (kind === "kab500") {
        K.dark.push(cyl(r * 0.30, r * 0.30, 0.10, 8, "x", xm + len * 0.5 - 0.02, y, zc));
        finsAt(K.store, xm + len * 0.05, y, zc, len * 0.30, r * 1.30);
      }
    }
  }

  /* ------------------------------------------------------------ the build */
  function buildAirframe(THREE, C, cfg) {
    V = THREE;
    var T = makeMats(C, cfg.scheme);
    var g = new V.Group();
    g.name = cfg.node;
    var K = { skin: [], dark: [], metal: [], glass: [], team: [], store: [], pale: [] };
    var G = { metal: [], tyre: [], dark: [] };
    var s, i, b;

    /* ---- fuselage: nose to boom, from the BODY table */
    var fs = [];
    for (i = 0; i < BODY.length; i++) fs.push(sec(BODY[i][0], 0, BODY[i][2], BODY[i][3], BODY[i][1], BODY[i][4], BODY[i][5]));
    push(K.skin, loft(fs, 28, null, 0.02));
    /* the laser-rangefinder window: the nose ends in a dark glazed face,
       raked back at the bottom (A side, B, E) */
    push(K.glass, loft([sec(7.53, 0, -0.43, -0.64, 0.12, 0.9, 0.9), sec(7.47, 0, -0.40, -0.70, 0.17, 0.85, 0.85)], 28, 0.01, null));
    /* brake-chute container: the tail cone under the rudder (A side) */
    push(K.skin, loft([ls(-5.70, 0, 0.66, 0.16, 0.13, 1), ls(-6.40, 0, 0.70, 0.15, 0.13, 1),
                       ls(-6.72, 0, 0.72, 0.10, 0.09, 1), ls(-6.85, 0, 0.73, 0.04, 0.04, 1)], 14, null, 0.01));
    /* dorsal fillet running forward from the fin root */
    push(K.skin, loft([sec(-1.40, 0, 0.64, 0.56, 0.03), sec(-2.20, 0, 0.74, 0.56, 0.07), sec(-2.70, 0, 0.84, 0.56, 0.09)], 10, 0, null));

    /* ---- nacelles, intakes, nozzles */
    for (s = -1; s <= 1; s += 2) {
      var ns = [];
      for (i = 0; i < NAC.length; i++) ns.push(sec(NAC[i][0], s * NAC[i][1], NAC[i][2], NAC[i][3], NAC[i][4], NAC[i][5], NAC[i][5] * 0.92));
      push(K.skin, loft(ns, 30, null, null));
      /* the intake: a tall oval mouth about 0.7 m by 0.9 m behind a thin lip
         (the head-on photograph; A front draws the engine face smaller) */
      var lip = ns[0];
      push(K.skin, loft([sec(2.985, s * 0.845, 0.06, -0.87, 0.37, 0.9, 0.9), lip], 30, null, null));
      push(K.dark, loft([sec(2.99, s * 0.845, 0.04, -0.85, 0.35, 0.9, 0.9), sec(2.55, s * 0.845, 0.0, -0.81, 0.32, 0.9, 0.9)], 24, null, 0));
      /* nozzle: metal shroud, dark bore */
      var nz = NAC[NAC.length - 1];
      var zc = (nz[2] + nz[3]) / 2;
      push(K.metal, loft([ls(-2.90, s * nz[1], zc, 0.30, 0.27, 1), ls(-3.06, s * nz[1], zc, 0.28, 0.25, 1)], 20, null, null));
      K.dark.push(cyl(0.245, 0.245, 0.03, 18, "x", -3.05, s * nz[1], zc));
      /* gear bay doors: the main wheels retract forward into the nacelle belly */
      K.dark.push(box(1.30, 0.40, 0.012, 0.85, s * 0.84, -0.935));
    }

    /* ---- wings, tailplane, fin */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(wingSec(0.42, s), wingSec(3.0, s)));
      K.skin.push(solid(wingSec(3.0, s), wingSec(TIPY, s)));
      /* flap and aileron hinge lines, the slat line: thin dark rules on the upper skin */
      var hz = function (y, f) { return wingZ(y) + wingT(y) * 0.5 * (f < 0.3 ? 1 : 1 - (f - 0.3) * 0.85) + 0.006; };
      var fx = function (y, f) { return wingLE(y) + (wingTE(y) - wingLE(y)) * f; };
      K.dark.push(bar([-1.10, s * 1.30, hz(1.30, 0.86)], [-1.10, s * 4.60, hz(4.60, 0.72)], 0.011, 3));
      K.dark.push(bar([-1.20, s * 4.70, hz(4.70, 0.72)], [-1.20, s * 6.60, hz(6.60, 0.50)], 0.011, 3));
      K.dark.push(bar([fx(2.2, 0.18), s * 2.2, hz(2.2, 0.18)], [fx(6.6, 0.22), s * 6.6, hz(6.6, 0.22)], 0.011, 3));
      for (b = 0; b < 4; b++) {                                  /* flap track fairings under the trailing edge */
        var ty = 1.6 + b * 0.95;
        K.skin.push(box(0.55, 0.07, 0.08, -1.40, s * ty, wingZ(ty) - wingT(ty) * 0.18 - 0.05));
      }
      K.skin.push(solid(tpSec(0.20, s), tpSec(2.22, s)));
    }
    var fz = [0.63, 1.70, FIN_TOP];
    for (i = 0; i < fz.length - 1; i++) K.skin.push(solid(finSec(fz[i]), finSec(fz[i + 1])));
    /* fin tip: a rounded dielectric cap; rudder hinge lines on both faces */
    push(K.skin, loft([ls(finLE(FIN_TOP) + 0.02, 0, FIN_TOP + 0.02, 0.02, 0.02, 1), ls(finLE(FIN_TOP) - 0.15, 0, FIN_TOP + 0.03, 0.04, 0.03, 1),
                       ls(finTE(FIN_TOP) + 0.10, 0, FIN_TOP + 0.025, 0.03, 0.03, 1), ls(finTE(FIN_TOP) - 0.02, 0, FIN_TOP, 0.01, 0.02, 1)], 8, 0, 0));
    for (s = -1; s <= 1; s += 2) {
      K.dark.push(bar([finTE(0.95) + 0.55, s * (finT(0.95) * 0.32 + 0.004), 0.95], [finTE(2.70) + 0.55, s * (finT(2.70) * 0.32 + 0.004), 2.70], 0.010, 3));
      K.dark.push(bar([finTE(1.85) + 0.5, s * 0.06, 1.85], [finTE(1.85), s * 0.06, 1.85], 0.008, 3));
    }

    /* ---- wingtip pods (A plan, B, D): 2.2 m long, 0.48 m across; the after
       part is the split airbrake, so a joint ring and the split line */
    for (s = -1; s <= 1; s += 2) {
      var py = s * TIPY, pz = wingZ(TIPY);
      push(K.skin, loft([ls(0.11, py, pz, 0.05, 0.05), ls(0.02, py, pz, 0.15, 0.15), ls(-0.20, py, pz, 0.22, 0.22),
                         ls(-0.60, py, pz, 0.24, 0.24), ls(-1.20, py, pz, 0.24, 0.24), ls(-1.70, py, pz, 0.21, 0.21),
                         ls(-1.98, py, pz, 0.12, 0.12), ls(-2.05, py, pz, 0.04, 0.04)], 18, 0.02, 0.02));
      K.dark.push(cyl(0.243, 0.243, 0.035, 16, "x", -1.25, py, pz));
      var spl = function (x, hw) {
        return [[x, py - hw, pz - 0.012], [x, py + hw, pz - 0.012], [x, py + hw, pz + 0.012], [x, py - hw, pz + 0.012]];
      };
      K.dark.push(solid(spl(-1.25, 0.245), spl(-1.70, 0.215)));
      K.dark.push(solid(spl(-1.70, 0.215), spl(-2.00, 0.10)));
      K.glass.push(cyl(0.09, 0.12, 0.05, 12, "x", 0.06, py, pz));              /* landing light in the pod nose */
    }

    /* ---- nose: probe from the port upper side of the nose with its vanes,
       the GSh-30-2 fairing low on the port side (B) */
    K.metal.push(bar([7.10, 0.19, -0.37], [8.64, 0.19, -0.37], 0.018, 6));
    K.metal.push(box(0.03, 0.22, 0.012, 8.05, 0.19, -0.37));
    K.metal.push(box(0.03, 0.012, 0.16, 8.05, 0.19, -0.37));
    K.metal.push(box(0.03, 0.22, 0.012, 7.95, 0.19, -0.37));
    push(K.skin, loft([sec(6.70, 0.24, -0.62, -0.80, 0.07, 0.9), sec(6.30, 0.27, -0.56, -0.86, 0.12, 0.8),
                       sec(5.40, 0.30, -0.50, -0.93, 0.15, 0.8), sec(4.50, 0.31, -0.50, -0.93, 0.15, 0.8)], 12, 0.05, null));
    K.dark.push(cyl(0.024, 0.024, 0.40, 6, "x", 6.70, 0.21, -0.72));
    K.dark.push(cyl(0.024, 0.024, 0.40, 6, "x", 6.70, 0.28, -0.72));

    /* ---- the cockpit: flat-plate windscreen and bulged hood, dark frames */
    var cs = [];
    for (i = 0; i < CANOPY.length; i++) cs.push(sec(CANOPY[i][0], 0, CANOPY[i][1], SILL, CANOPY[i][2], 0.78, 1));
    push(K.glass, loft(cs, 24, 0, 0));
    function cz(x) {                                            /* hood top at x */
      for (var k = 0; k < CANOPY.length - 1; k++)
        if (x <= CANOPY[k][0] && x >= CANOPY[k + 1][0]) {
          var f = (CANOPY[k][0] - x) / (CANOPY[k][0] - CANOPY[k + 1][0]);
          return [CANOPY[k][1] + (CANOPY[k + 1][1] - CANOPY[k][1]) * f, CANOPY[k][2] + (CANOPY[k + 1][2] - CANOPY[k][2]) * f];
        }
      return [SILL, 0.3];
    }
    var fr = [4.86, 4.52, 3.60];                                /* windscreen arch, hood front, hood rear */
    for (i = 0; i < fr.length; i++) {
      var q = cz(fr[i]), arc = [];
      for (b = 0; b <= 8; b++) {
        var a = PI * b / 8, c = Math.cos(a), sn = Math.sin(a);
        arc.push([fr[i], q[1] * sgn(c) * Math.pow(Math.abs(c), 0.78) * 1.02, SILL + (q[0] - SILL) * Math.pow(sn, 1) * 1.01 + 0.005]);
      }
      for (b = 0; b < 8; b++) K.dark.push(bar(arc[b], arc[b + 1], 0.024, 4));
    }
    for (s = -1; s <= 1; s += 2) {
      K.dark.push(bar([5.47, s * 0.30, SILL + 0.03], [4.86, s * 0.41, 0.63 * 0.55], 0.022, 4));   /* windscreen side posts */
      K.dark.push(bar([5.47, s * 0.30, SILL + 0.02], [3.40, s * 0.31, SILL + 0.02], 0.03, 4));     /* sill rails */
    }
    K.dark.push(box(0.32, 0.12, 0.08, 4.15, 0, 0.745));          /* rear-view periscope on the hood */
    K.skin.push(box(0.44, 0.60, 0.10, 5.62, 0, 0.06, 0, 0.28, 0)); /* windscreen base fairing */

    /* ---- ten pylons and their stores */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 5; i++) addStore(K, cfg.fit[i], s, i);
    if (cfg.uv) K.dark.push(box(0.16, 0.10, 0.08, 4.40, -0.30, -0.95));   /* Zakhvat UV sensor (C) */

    /* ---- team colour: one strip lying on each upper outer wing */
    for (s = -1; s <= 1; s += 2) {
      var wb = function (y) {
        var z = wingZ(y) + wingT(y) * 0.30 + 0.012;
        return blk([wingLE(y), s * y, z], [wingTE(y), s * y, z], 0.34, 0.62, 0.012 + wingT(y) * 0.12, [0, 0, 1]);
      };
      K.team.push(solid(wb(4.6), wb(5.5)));
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.store, T.store, "stores");
    mesh(g, K.pale, T.pale, "stores_pale");

    /* ---- landing gear (it retracts): named "gear"; its tyres are the
       lowest opaque points. Wheelbase 3.57 m, track 2.51 m. */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var NX = 3.885, nzc = GROUND + 0.33;              /* 3.57 m ahead of the mains after KX */
    G.metal.push(bar([NX + 0.10, 0, -0.90], [NX, 0, nzc + 0.30], 0.05, 8));
    G.metal.push(bar([NX - 0.02, -0.12, nzc + 0.34], [NX - 0.02, -0.12, nzc], 0.024, 6));
    G.metal.push(bar([NX - 0.02, 0.12, nzc + 0.34], [NX - 0.02, 0.12, nzc], 0.024, 6));
    G.metal.push(box(0.10, 0.28, 0.05, NX - 0.02, 0, nzc + 0.36));
    G.metal.push(bar([NX + 0.50, 0, -0.92], [NX + 0.05, 0, -1.30], 0.026, 6));
    G.tyre.push(cyl(0.33, 0.33, 0.20, 28, "y", NX - 0.02, 0, nzc));
    G.metal.push(cyl(0.16, 0.16, 0.22, 16, "y", NX - 0.02, 0, nzc));
    G.dark.push(box(0.56, 0.42, 0.03, NX - 0.02, 0, nzc + 0.40, 0, 0.30, 0));       /* mud guard (E) */
    G.metal.push(box(0.85, 0.02, 0.22, NX + 0.30, 0.20, -1.03));                      /* nose bay doors */
    G.metal.push(box(0.85, 0.02, 0.22, NX + 0.30, -0.20, -1.03));
    var MX = 0.25, MY = 1.255, mzc = GROUND + 0.42;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([MX + 0.55, s * 1.00, -0.88], [MX + 0.05, s * (MY - 0.22), mzc + 0.25], 0.075, 8));   /* oleo */
      G.metal.push(bar([MX + 0.05, s * (MY - 0.22), mzc + 0.25], [MX, s * (MY - 0.20), mzc], 0.05, 6));       /* trailing arm */
      G.metal.push(bar([MX + 1.05, s * 0.95, -0.90], [MX + 0.45, s * 1.00, -1.25], 0.035, 6));                /* drag strut */
      G.metal.push(bar([MX, s * (MY - 0.22), mzc], [MX, s * MY, mzc], 0.04, 6));                              /* axle */
      G.tyre.push(cyl(0.42, 0.42, 0.36, 32, "y", MX, s * MY, mzc));
      G.metal.push(cyl(0.21, 0.21, 0.38, 16, "y", MX, s * MY, mzc));
      G.metal.push(box(1.05, 0.025, 0.30, 0.80, s * 1.10, -1.08, s * 0.30, 0, 0));      /* main bay door, hanging */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    return g;
  }

  /* --------------------------------------------------------------- fits -- */
  /* stations inboard to outboard; the fifth is the light missile pylon */
  var FITS = {
    su25:   { node: "su25",    scheme: SCHEMES.soviet, fit: ["fab500", "b8",     "b8",     "fab250", "r60"] },
    su25k:  { node: "su25k",   scheme: SCHEMES.export, fit: ["fab500", "ub32",   "ub32",   "fab250", "none"] },
    su25kb: { node: "su25k",   scheme: SCHEMES.export, fit: ["fab500", "fab500", "fab250", "fab250", "none"] },
    sm:     { node: "su25sm",  scheme: SCHEMES.grey,   fit: ["fab500", "b8",     "b8",     "fab250", "r73"] },
    sm3:    { node: "su25sm3", scheme: SCHEMES.sm3,    fit: ["kab500", "b8",     "b8",     "empty",  "ecm"], uv: true }
  };
  function maker(f) { return function (THREE, M, C) { return buildAirframe(THREE, C, f); }; }
  return { su25: maker(FITS.su25), su25k: maker(FITS.su25k), su25kb: maker(FITS.su25kb),
           sm: maker(FITS.sm), sm3: maker(FITS.sm3) };
})();

/* len is the MEASURED x extent: the nose probe to the tail cone. */
UNIT_MODELS["pact_e80_cas"] = { len: 15.31, build: HeroSu25.su25 };
UNIT_MODELS["pact_e90_cas"] = { len: 15.31, build: HeroSu25.su25 };
UNIT_MODELS["pact_e00_cas"] = { len: 15.31, build: HeroSu25.sm };
UNIT_MODELS["bomber_p"]     = { len: 15.31, build: HeroSu25.sm3 };
UNIT_MODELS["bomber_k"]     = { len: 15.31, build: HeroSu25.su25kb };
UNIT_MODELS["kpa_e80_cas"]  = { len: 15.31, build: HeroSu25.su25k };
UNIT_MODELS["kpa_e90_cas"]  = { len: 15.31, build: HeroSu25.su25k };
UNIT_MODELS["kpa_e00_cas"]  = { len: 15.31, build: HeroSu25.su25k };
