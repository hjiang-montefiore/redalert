/* ======= eu_tels_radars.js - HERO models: French nuclear launchers and British / French weapon-locating radars =======
   Six rows, four vehicles in five modules (one module per type):
     fra_e60_tel, fra_e80_tel  "Pluton, missile nucleaire tactique sur chassis AMX-30"   -> HeroPluton
     fra_e90_tel               "Hades short-range nuclear missile system"                -> HeroHades
     fra_e00_radarv            "COBRA counter-battery radar" (French set, Renault TRM 10000 6x6) -> HeroCobraFr
     gbr_e60_radarv            "FV436 with Cymbeline mortar-locating radar" (FV432 hull) -> HeroCymbeline
     gbr_e00_radarv            "MAMBA (Saab ARTHUR) weapon locating radar" on the Bv206 -> HeroMamba
   BUILT ON: nothing in js/hero/ draws an AMX-30, an FV432, a Bv206, a TRM 10000 or any of these systems (grep -i
   "pluton|hades|cobra|cymbeline|mamba|arthur|fv432|bv206|amx" finds only unrelated words), so every hull here is new.
   The geometry kit (Bin, solid, box, slab, belt, cyl, prismY, loftN, the canvas paint, flush) and the tracked running
   gear are copied from js/hero/pla_type63_apc.js; the launcher idiom ("podelev" hinged at the rear, nose along +X,
   raised by render3d poseLauncher to userData.el, userData.cells = [mouth x, y, z, rear x]) follows js/hero/ru_tochka.js
   and js/hero/ru_scud_b.js; the radar idiom (ONE working pose with the array up, the array on its turntable as the
   "turret" trained by render3d with rotation.z) follows js/hero/us_tpq53.js.  The old stand-ins were the borrowed
   peer models (tel_n, the HIMARS, and nato_e00_radarv, the Q-53).

   REFERENCES (Wikimedia Commons, fetched at 640-1280 px, cached in scratchpad/q_eutr_ref):
     PL1 "AMX-30 Pluton 'VERDUN' at Musee des Blindes, Saumur (53333511072).jpg"  port side 3/4, container raised ~27 deg
     PL2 "AMX-30 Pluton, Tanks in the Musee des Blindes, France, pic-4/-13/-17/-6/-9/-20" (Saumur, the same vehicle): front
         3/4s, the front plates and lamp guards, the five road wheels with the toothed sprocket at the REAR (pic-9), the
         container's open rear end with the missile tail and its X-frame (pic-20, from behind)
     PL3 "Pluton 034.jpg"  near side-on, the container lying almost level on the hull, the nose far out past the bow
     PL4 "AMX-30 Pluton prototype (23807547689).jpg", "AMX30 Pluton.PNG P1040721.jpg", "Amx30 pluton.jpg"  the same
         Saumur vehicle raised at other angles (no other Pluton is on Commons)
     CO1 "Radar COBRA sur Renault TRM 10 000.jpg", CO2 "Radar COBRA sur Renault GBC 180 photo-21.jpg"  the French set
         side-on in travel order, Paris (the same truck: a TRM 10000 cab and 6x6)
     CO3 "Radar COBRA.jpg", CO4 "COBRA radar general view.jpg"  German sets (MAN 8x8) with the array RAISED: shape and
         size of the array only
     CY1 "Cymbeline FA 15 mortar locating radar Hameenlinna 1/2/4.JPG"  the radar head on its trailer, antenna folded
     CY2 "Cyberline Mortar Locating Radar fielded.png"  the head set up on the ground: the curved reflector raised
     FV1 "FV432 (7527891020).jpg", FV2 "20050626-006-FV-432.jpg"  the FV432 hull (front 3/4 and head-on); the
         Cymbeline's hull now follows the square-on measurement of js/hero/gb_light_armour.js (HeroFv430, its F1-F5:
         "GKN Sankey FV432 pic2.JPG" side-on and others), whose tables are copied into HeroCymbeline
     MA1 "Mobile Artillery Monitoring Battlefield Radar (MAMBA) MOD 45148327.jpg" (UK MOD, Iraq), MA2 "...45148329.jpg"
         (from the rear), MA3 "ARTHUR in position.JPG", MA4 "Bv206 of Singapore Army mounting ARTHUR counter-battery
         radar.jpg"  the Bv206 pair, the shelter on the rear car, the array on its post at the shelter's rear end
     Hades: NO photograph or drawing of the launcher was found on Commons (searched "Hades", "Hades missile",
         "Hades lanceur", "Hades Renault"); the sites a web search names (truck-encyclopedia.com, nuke.fas.org) are not
         reachable from this session.  See the Hades module header.
   PUBLISHED (en.wikipedia raw, fetched): Pluton missile 7.64 m, 0.65 m, 2,423 kg, "TEL platform on an AMX-30 chassis";
     AMX-30 width 3.10 m, "five double ... road wheels on either side", 570 mm tracks.  Hades missile 7.50 m, 0.53 m,
     "a tractor and a trailer with two missiles", "each trailer carrying two missiles in containers that also act as
     launch boxes", "carried horizontally, erected by the truck itself".  Renault TRM 10000 9.31 x 2.50 x 3.32 m (the
     cargo truck).  FV432 5.25 x 2.55 x 2.28 m, 5 road wheels.  Cymbeline: off its trailer "2.29 metres high with the
     antenna up, 1.07 metres with antenna folded, 1.7 metres wide and 1.5 metres long"; on the FV432 "the normal hatch
     covers over the rear compartment were replaced by a circular radar mounting, with three supports for the radar
     turntable ... for movement the antenna was lowered and the whole radar surrounded by a folding grille attached
     to decking around the radar".  Bv206 6.9 x 1.87 x 2.4 m.
   No national markings, numbers or camouflage on any of them (the museum Pluton and the COBRA wear three-colour
   camouflage, which is not drawn: plain French green).  Team colour: small up-facing C.team strips on each roof.
   Model space: +X nose, +Y left, +Z up, metres, tracks / tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroEuKit = (function () {
  "use strict";
  var TAU = Math.PI * 2;
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
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  /* a bar of square section between two points */
  function bar(bin, A, B, t) {
    var ax = unit(sub(B, A)), r = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = unit(cross(ax, r)), w = cross(ax, u);
    var L = Math.sqrt(dot(sub(B, A), sub(B, A)));
    slab(bin, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2], ax, u, w, L / 2, t / 2, t / 2);
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
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
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
  /* a body of revolution about the X axis from a profile [[x, r], ...] (r 0 allowed at the ends) */
  function lathe(bin, prof, y, z, seg) {
    var V = [], N = [], i, k, n = prof.length;
    for (k = 0; k < n; k++)
      for (i = 0; i < seg; i++) {
        var a = i / seg * TAU, c = Math.cos(a), s = Math.sin(a);
        var dr = k + 1 < n ? prof[k + 1][1] - prof[k][1] : prof[k][1] - prof[k - 1][1];
        var dx = k + 1 < n ? prof[k + 1][0] - prof[k][0] : prof[k][0] - prof[k - 1][0];
        V.push([prof[k][0], y + c * prof[k][1], z + s * prof[k][1]]);
        N.push(unit([-dr, c * dx, s * dx]));
      }
    for (k = 0; k + 1 < n; k++) for (i = 0; i < seg; i++) {
      var p = k * seg + i, q = k * seg + (i + 1) % seg, r = (k + 1) * seg + (i + 1) % seg, t = (k + 1) * seg + i;
      if (prof[k + 1][1] > 1e-4) bin.tri(V[p], V[r], V[t], N[p], N[r], N[t]);
      if (prof[k][1] > 1e-4) bin.tri(V[p], V[q], V[r], N[p], N[q], N[r]);
    }
    /* close a cut end (radius > 0) with a flat cap */
    [[0, -1], [n - 1, 1]].forEach(function (e) {
      if (prof[e[0]][1] <= 1e-4) return;
      var cx = [prof[e[0]][0], y, z], nrm = [e[1], 0, 0];
      for (i = 0; i < seg; i++) {
        var a2 = V[e[0] * seg + i], b2 = V[e[0] * seg + (i + 1) % seg];
        if (e[1] > 0) bin.tri(cx, a2, b2, nrm, nrm, nrm); else bin.tri(cx, b2, a2, nrm, nrm, nrm);
      }
    });
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE, PAINT) {
    var key = PAINT.base + PAINT.seed;
    if (_tex[key] !== undefined) return _tex[key];
    _tex[key] = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(PAINT.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = PAINT.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < PAINT.blots.length; k++) {
        q.fillStyle = PAINT.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
      }
      for (i = 0; i < 110; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      _tex[key] = t;
    } catch (e) { _tex[key] = null; }
    return _tex[key];
  }
  function materials(THREE, C, PAINT, extra) {
    var T = {}, tx = paintTex(THREE, PAINT), k;
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    for (k in (extra || {})) T[k] = new THREE.MeshStandardMaterial(extra[k]);
    return T;
  }
  function bins(T, keys) {
    var B = {}, i, k;
    keys = keys || ["paint", "dark", "team"];
    for (i = 0; i < keys.length; i++) { k = keys[i]; B[k] = new Bin(T[k], k === "paint"); }
    return B;
  }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      var m = new THREE.Mesh(geo, b.mat);
      m.castShadow = true; m.receiveShadow = true;
      group.add(m);
    }
  }
  function rgb(hex, k) {
    return [parseInt(hex.substr(1, 2), 16) / 255 * k, parseInt(hex.substr(3, 2), 16) / 255 * k, parseInt(hex.substr(5, 2), 16) / 255 * k];
  }

  /* ------------------------------------------------------------ tracked running gear (pla_type63_apc.js) */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  /* o: { xw: [], zw, rw, spr: {x, z, r}, idl: {x, z, r}, ty (track centre), tw (half width), pitch, th (belt),
     rollers: [[x, z, r]], teeth } ; the belt wraps the wheels, idler, sprocket and return rollers */
  function track(B, o) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [], th = o.th || 0.05;
    for (i = 0; i < o.xw.length; i++) C.push([o.xw[i], o.zw, o.rw + th * 0.7]);
    C.push([o.idl.x, o.idl.z, o.idl.r + th * 0.7], [o.spr.x, o.spr.z, o.spr.r + th * 0.7]);
    (o.rollers || []).forEach(function (r) { C.push([r[0], r[1], r[2] + th * 0.7]); });
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
    cnt = Math.round(tot / (o.pitch || 0.2)); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * o.ty;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - o.tw, y + o.tw, th);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.04, pz - dz * 0.04, px + dx * 0.04, pz + dz * 0.04, y - o.tw - 0.01, y + o.tw + 0.01, th + 0.025);
      }
      /* the drive sprocket, toothed */
      cylY(B.dark, o.spr.x, y - o.tw * 0.7, y + o.tw * 0.7, o.spr.z, o.spr.r - 0.05, 18);
      for (i = 0; i < (o.teeth || 11); i++) {
        var ta = i / (o.teeth || 11) * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [o.spr.x + ca * (o.spr.r - 0.02), y, o.spr.z + sa * (o.spr.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, o.tw * 0.55, 0.03);
      }
      cylY(B.paint, o.spr.x, y + s * o.tw * 0.7, y + s * (o.tw * 0.7 + 0.05), o.spr.z, o.spr.r * 0.55, 14);
      /* the idler */
      cylY(B.paint, o.idl.x, y - o.tw * 0.85, y + o.tw * 0.85, o.idl.z, o.idl.r, 18);
      cylY(B.dark, o.idl.x, y + s * o.tw * 0.85, y + s * (o.tw * 0.85 + 0.05), o.idl.z, o.idl.r * 0.3, 10);
      (o.rollers || []).forEach(function (r) { cylY(B.dark, r[0], y - o.tw * 0.5, y + o.tw * 0.5, r[1], r[2], 10); });
    }
  }
  /* a road-wheel pair (one axle position, both sides) about the group origin: rubber tyre, painted disc, hub;
     o.dbl: a double wheel (two tyres with a gap, the AMX-30's and FV432's) */
  function roadWheel(W, o, base) {
    var s, y, TY = rgb("#202224", 1), BODY = rgb(base, 1.12), HUB = rgb(base, 1.3), r = o.rw, hw = o.tw, i, a;
    for (s = -1; s <= 1; s += 2) {
      y = s * o.ty;
      var parts = o.dbl ? [[y - hw, y - 0.04], [y + 0.04, y + hw]] : [[y - hw * 0.85, y + hw * 0.85]];
      parts.forEach(function (p) {
        W.col = TY; cylY(W, 0, p[0], p[1], 0, r, 20);
      });
      var yo = s > 0 ? Math.max(parts[parts.length - 1][1], parts[0][1]) : Math.min(parts[0][0], parts[parts.length - 1][0]);
      W.col = BODY; cyl(W, [0, yo, 0], [0, yo + s * 0.025, 0], r - r * 0.16, r * 0.4, 20);
      W.col = HUB; cylY(W, 0, yo, yo + s * 0.06, 0, r * 0.22, 10);
      W.col = rgb(base, 0.8);
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * r * 0.55, yo + s * 0.02, Math.sin(a) * r * 0.55], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], r * 0.1, 0.012, r * 0.1);
      }
    }
  }
  /* a truck axle's tyres about the group origin: y the tyre centres (one per side, or two for duals) */
  function truckAxle(W, ys, r, w, base) {
    var TY = rgb("#1f2022", 1), RIM = rgb(base, 1.05), HUB = rgb("#2c2e30", 1);
    ys.forEach(function (y) {
      var s = y > 0 ? 1 : -1;
      W.col = TY; cyl(W, [0, y - w / 2, 0], [0, y + w / 2, 0], r, r, 22);
      for (var i = 0; i < 16; i++) {           /* the lugged tread */
        var a = i / 16 * TAU;
        slab(W, [Math.cos(a) * (r - 0.02), y, Math.sin(a) * (r - 0.02)], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.02, w * 0.42, 0.06);
      }
      W.col = RIM; cyl(W, [0, y + s * w / 2, 0], [0, y + s * (w / 2 + 0.01), 0], r * 0.55, r * 0.55, 16);
      W.col = HUB; cyl(W, [0, y + s * (w / 2 + 0.01), 0], [0, y + s * (w / 2 + 0.07), 0], r * 0.2, r * 0.16, 10);
    });
  }
  function wheelGroup(THREE, g, T, x, z, fill) {
    var WB = new Bin(T.wheel, false, true), wg = new THREE.Group();
    fill(WB);
    wg.name = "roadwheel";
    wg.position.set(x, 0, z);
    flush(THREE, wg, { wheel: WB });
    g.add(wg);
    return wg;
  }

  return {
    TAU: TAU, Bin: Bin, box: box, slab: slab, belt: belt, bar: bar, cyl: cyl, cylY: cylY, cylZ: cylZ, prismY: prismY,
    loftN: loftN, lathe: lathe, materials: materials, bins: bins, flush: flush, rgb: rgb, track: track,
    roadWheel: roadWheel, truckAxle: truckAxle, wheelGroup: wheelGroup
  };
})();

/* ====================================================================================================================
   PLUTON on the AMX-30 chassis (fra_e60_tel, fra_e80_tel: one vehicle, 1974-1993)
   Recognition list (each drawn; where it rests):
     1. the AMX-30 running gear: five big double road wheels a side, the toothed sprocket at the REAR, the idler at the
        front (PL2 pic-9, PL1)
     2. a tall flat-roofed box superstructure the full length of the hull, vertical sides over the tracks, louvred
        grilles at the rear of the side (PL1, PL3)
     3. the bow: a short lower nose plate, the long upper plate leaning back to the roof, a lamp cluster in a guard on
        a stalk at each front corner, spare track links bolted across the nose, a pair of tubes on the front corner
        (PL1, PL2 pic-17)
     4. the commander's hatch on the port front of the roof (the figure in PL1 sits in it)
     5. the square CONTAINER, open at both ends, hinged at the rear of the roof; the missile's long nose sticks far
        out of its front, the tail with its X frame shows at the open rear (PL1, PL2 pic-20, PL3)
     6. raised, the container stands up from the rear, nose forward (PL1, PL2: the museum shows it at 27-45 degrees)
   STATIONS (x from mid-hull, metres): bow +3.295, stern -3.295 (hull 6.59 m: the AMX-30's published hull length, not
   restated on the fetched pages - NOT CONFIRMED here); idler +2.85, wheels +1.90 .. -1.86 (pitch 0.94), sprocket
   -2.85; hinge -3.10 at 2.40; container 0.10 .. 4.25 along its own axis, missile tail 0.25, tip 7.89.
   MEASURED: in PL1 at the second road wheel's station (one station, so perspective cancels) the roof stands 2.87 wheel
   diameters above the ground and in PL3 3.15: 2.95 is taken, with a 0.78 m wheel -> roof 2.30 m.  The container's
   side in PL1 is 393 px along its axis against the 0.65 m missile body's 85 px at the mouth (the same depth): 3.0 m of
   box ahead of the cradle plus the cradle to the hinge, 4.15 m drawn; its width in PL2 pic-20 (from behind, the
   rear plate 440 px for the 3.10 m hull) 230 px -> 1.6 m; height in PL3 (near level) 150 px against 110 px of hull
   side above the track, about 1.45 m.  The nose overhangs the bow by 1.45 m in travel, as PL3 shows it far out.
   NOT CONFIRMED (proportions, no drawing found): the road wheel size (0.78 m) and pitch, the roof height 2.30, the
   superstructure's width (+-1.45), the front plates' angles, the container's 4.15 x 1.6 x 1.45 m, the hinge place,
   the launch elevation (45 degrees: not published here; the museum shows 27-45), the missile's ogive (cylinder to
   3.95 m from the tail, about the box's mouth, ogive beyond, read off PL1) and its tail fins (seen only inside the box, PL2 pic-20).
   NOT drawn: the 1980s three-colour camouflage (PL1, a museum scheme too), the "VERDUN" name and every number, the
   exhaust details on the rear plate, the return rollers (hidden behind the side in every photo), the cradle's
   hydraulic rams (only half seen under the raised box in PL1).
   Nodes: five "roadwheel" (one per axle position, both sides), "podelev" (the container and missile, hinged at its
   rear, level at rest, raised to userData.el; userData.cells: the motor's flash at the missile tail).  NO "turret"
   (turret:false).  Paint: the green of PL1's green patches at about 0.85 of level, #4d5a3b.  */
var HeroPluton = (function () {
  "use strict";
  var K = HeroEuKit;
  var PAINT = { base: "#4d5a3b", blots: ["#45512f", "#56623f"], seed: 3074 };
  var BOW = 3.295, STERN = -3.295, BELLY = 0.44, FEN = 1.05, ROOF = 2.30, HW = 1.45, FW = 1.55;
  var RG = { xw: [1.90, 0.96, 0.02, -0.92, -1.86], zw: 0.476, rw: 0.39, ty: 1.265, tw: 0.285, dbl: true,
             spr: { x: -2.85, z: 0.70, r: 0.33 }, idl: { x: 2.85, z: 0.60, r: 0.31 }, pitch: 0.17, th: 0.06, teeth: 13 };
  var HX = -3.10, HZ = 2.40, EL = 45 * Math.PI / 180;
  var BOXL = 4.25, BOXW = 1.60, BOXH = 1.45, MZ = 0.72, ML = 7.64, MT = 0.25;

  function hull(B) {
    var s, i;
    /* lower hull between the tracks, the lower nose plate (PL2) */
    K.prismY(B.paint, [[STERN, 0.62], [STERN + 0.25, BELLY], [2.70, BELLY], [BOW, 0.95], [BOW, FEN], [STERN, FEN]], -1.0, 1.0);
    /* the superstructure: vertical sides at +-HW over the fenders (PL1, PL3); bow plate leaning back to the roof */
    function sec(x, top, hw) { return [[x, -FW, FEN], [x, FW, FEN], [x, hw, FEN + 0.05], [x, hw, top], [x, -hw, top], [x, -hw, FEN + 0.05]]; }
    K.loftN(B.paint, [sec(STERN, ROOF - 0.10, HW - 0.04), sec(STERN + 0.08, ROOF, HW), sec(2.05, ROOF, HW), sec(2.45, 1.80, HW), sec(BOW, FEN + 0.02, HW)]);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * HW;
      /* fender lip over the track, the louvred grille at the rear of the side (PL1), the side's panel seams */
      K.box(B.paint, STERN + 0.05, BOW - 0.05, Math.min(s * HW, s * FW), Math.max(s * HW, s * FW), FEN - 0.03, FEN + 0.03);
      K.box(B.dark, -2.90, -1.35, s > 0 ? yo : yo - 0.015, s > 0 ? yo + 0.015 : yo, 1.62, 2.05);
      for (i = 0; i < 9; i++) K.box(B.paint, -2.88 + i * 0.17, -2.80 + i * 0.17, s > 0 ? yo + 0.012 : yo - 0.03, s > 0 ? yo + 0.03 : yo - 0.012, 1.63, 2.04);
      [0.85, -0.45].forEach(function (x) { K.box(B.dark, x - 0.012, x + 0.012, s > 0 ? yo : yo - 0.01, s > 0 ? yo + 0.01 : yo, FEN + 0.1, ROOF - 0.05); });
      /* stowage bin at the bow corner of the fender (PL2 pic-17) */
      K.box(B.paint, 2.25, 2.95, s * 1.18, s * FW, FEN + 0.03, FEN + 0.35);
      /* the lamp cluster in its guard on a stalk at each bow corner (PL1, PL2) */
      var ly = s * 1.15, lx = 2.62;
      K.cylZ(B.dark, lx, ly, 1.55, 1.78, 0.04, 6);
      K.cyl(B.paint, [lx - 0.08, ly, 1.86], [lx + 0.12, ly, 1.86], 0.11, 0.12, 12);
      K.cyl(B.dark, [lx + 0.12, ly, 1.86], [lx + 0.13, ly, 1.86], 0.10, 0.10, 12);
      K.box(B.dark, lx + 0.14, lx + 0.17, ly - 0.15, ly + 0.15, 1.72, 2.02);
      /* the pair of tubes on the port bow corner (PL1) */
      if (s > 0) [0.0, 0.16].forEach(function (dy) { K.cyl(B.dark, [2.05, 1.05 - dy, 1.95], [2.55, 1.05 - dy, 1.70], 0.07, 0.07, 10); });
    }
    /* spare track links across the nose plate (PL2 pic-17) */
    var ang = Math.atan2(BOW - 2.45, 1.80 - FEN), u = [Math.sin(ang) * -1, 0, Math.cos(ang)];
    for (i = 0; i < 4; i++) {
      var f = 0.18 + i * 0.2, cx = BOW - (BOW - 2.45) * f, cz = FEN + (1.80 - FEN) * f;
      K.slab(B.dark, [cx + 0.03, 0, cz + 0.02], [-(BOW - 2.45), 0, 1.80 - FEN].map(function (v, k) { var L = Math.hypot(BOW - 2.45, 1.80 - FEN); return k === 1 ? 0 : v / L; }), [0, 1, 0], [Math.cos(ang), 0, Math.sin(ang)], 0.07, 1.05, 0.03);
    }
    /* towing eyes on the lower nose */
    for (s = -1; s <= 1; s += 2) K.box(B.dark, BOW - 0.02, BOW + 0.10, s * 0.75 - 0.08, s * 0.75 + 0.08, 0.68, 0.84);
    /* roof: the commander's hatch on the port front (PL1), the driver's hatch, vents, the team strips */
    K.cylZ(B.paint, 1.35, 0.75, ROOF, ROOF + 0.16, 0.42, 16);
    K.cylZ(B.dark, 1.35, 0.75, ROOF + 0.16, ROOF + 0.19, 0.34, 16);
    for (i = 0; i < 6; i++) { var a = i / 6 * K.TAU; K.box(B.dark, 1.35 + Math.cos(a) * 0.40 - 0.05, 1.35 + Math.cos(a) * 0.40 + 0.05, 0.75 + Math.sin(a) * 0.40 - 0.05, 0.75 + Math.sin(a) * 0.40 + 0.05, ROOF + 0.10, ROOF + 0.20); }
    K.box(B.paint, 1.55, 1.95, -0.85, -0.35, ROOF, ROOF + 0.06);
    K.box(B.paint, -0.30, 0.30, -1.20, -0.80, ROOF, ROOF + 0.22);
    K.box(B.team, 0.55, 0.95, -0.25, 0.25, ROOF, ROOF + 0.015);
    K.box(B.team, -2.20, -1.60, 1.05, 1.30, ROOF, ROOF + 0.015);
    /* the cradle's seats on the roof and the hinge brackets at the stern (PL1, PL2 pic-20) */
    for (s = -1; s <= 1; s += 2) {
      K.box(B.paint, HX - 0.15, HX + 0.40, s * 0.95 - 0.10, s * 0.95 + 0.10, ROOF, HZ + 0.05);
      K.cylY(B.dark, HX, s * 0.85 - 0.10, s * 0.85 + 0.10, HZ, 0.12, 10);
      K.box(B.paint, 0.70, 0.95, s * 0.55 - 0.12, s * 0.55 + 0.12, ROOF, HZ - 0.02);
    }
    /* rear plate: lamps, the towing pintle */
    for (s = -1; s <= 1; s += 2) K.box(B.dark, STERN - 0.06, STERN, s * 1.20 - 0.12, s * 1.20 + 0.12, 1.75, 1.95);
    K.box(B.dark, STERN - 0.15, STERN, -0.12, 0.12, 0.75, 0.90);
  }

  /* the container and the missile, in the hinge's frame: +X along the box toward its open front */
  function launcher(B) {
    var w = BOXW / 2, t = 0.06, x0 = 0.10, x1 = BOXL, s, i;
    /* four walls, open at both ends (PL1, PL2 pic-20), dark inside */
    K.box(B.paint, x0, x1, -w, w, 0, t);
    K.box(B.paint, x0, x1, -w, w, BOXH - t, BOXH);
    for (s = -1; s <= 1; s += 2) K.box(B.paint, x0, x1, s > 0 ? w - t : -w, s > 0 ? w : -w + t, t, BOXH - t);
    K.box(B.dark, x0 + 0.02, x1 - 0.02, -w + t, w - t, t, t + 0.01);
    for (s = -1; s <= 1; s += 2) K.box(B.dark, x0 + 0.02, x1 - 0.02, s > 0 ? w - t - 0.01 : -w + t, s > 0 ? w - t : -w + t + 0.01, t, BOXH - t);
    /* the ribs and a lid seam along the sides and top (PL1, PL4) */
    for (i = 0; i < 5; i++) {
      var xr = x0 + 0.25 + i * (x1 - x0 - 0.5) / 4;
      K.box(B.paint, xr - 0.05, xr + 0.05, -w - 0.04, w + 0.04, BOXH - 0.02, BOXH + 0.04);
      for (s = -1; s <= 1; s += 2) K.box(B.paint, xr - 0.05, xr + 0.05, s > 0 ? w : -w - 0.04, s > 0 ? w + 0.04 : -w, 0, BOXH);
    }
    for (s = -1; s <= 1; s += 2) K.box(B.dark, x0 + 0.1, x1 - 0.1, s > 0 ? w + 0.005 : -w - 0.02, s > 0 ? w + 0.02 : -w - 0.005, BOXH * 0.55, BOXH * 0.55 + 0.03);
    /* the cradle under the box: two beams to the hinge (PL1) */
    for (s = -1; s <= 1; s += 2) {
      K.box(B.paint, -0.10, x1 - 0.6, s * 0.85 - 0.08, s * 0.85 + 0.08, -0.12, 0.0);
      K.box(B.paint, -0.15, 0.25, s * 0.85 - 0.10, s * 0.85 + 0.10, -0.15, 0.30);
    }
    /* the X frame holding the tail at the open rear (PL2 pic-20) */
    K.bar(B.dark, [x0 + 0.05, -w + 0.1, 0.1], [x0 + 0.05, w - 0.1, BOXH - 0.1], 0.05);
    K.bar(B.dark, [x0 + 0.05, w - 0.1, 0.1], [x0 + 0.05, -w + 0.1, BOXH - 0.1], 0.05);
    /* the missile: 7.64 x 0.65 m (published); the body cylinder to 3.6 m, the long ogive to the tip (PL1) */
    var r = 0.325, CL = 3.95, prof = [[MT, 0.26], [MT + 0.05, r], [MT + CL, r]], k;
    for (k = 1; k <= 8; k++) { var f = k / 8, xx = MT + CL + (ML - CL) * f; prof.push([xx, r * Math.sqrt(Math.max(0, 1 - f * f * 0.98)) * (1 - 0.15 * f)]); }
    prof[prof.length - 1][1] = 0.0;
    K.lathe(B.msl, prof, 0, MZ, 18);
    K.cyl(B.dark, [MT - 0.15, 0, MZ], [MT, 0, MZ], 0.18, 0.22, 12);
    /* four tail fins in X (PL2 pic-20) */
    for (i = 0; i < 4; i++) {
      var a = (i + 0.5) / 4 * K.TAU, c = Math.cos(a), sn = Math.sin(a);
      K.slab(B.msl, [MT + 0.45, c * (r + 0.18), MZ + sn * (r + 0.18)], [1, 0, 0], [0, c, sn], [0, -sn, c], 0.32, 0.18, 0.012);
    }
  }

  function build(THREE, M, C, key) {
    var T = K.materials(THREE, C, PAINT, { msl: { color: 0x4f5a3c, roughness: 0.6, metalness: 0.1 } });
    var g = new THREE.Group(), HB = K.bins(T), EB = K.bins(T, ["paint", "dark", "msl"]), i, E;
    hull(HB);
    K.track(HB, RG);
    K.flush(THREE, g, HB);
    for (i = 0; i < RG.xw.length; i++) K.wheelGroup(THREE, g, T, RG.xw[i], RG.zw, function (W) { K.roadWheel(W, RG, PAINT.base); });
    launcher(EB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(HX, 0, HZ);
    K.flush(THREE, E, EB);
    E.userData.el = EL;
    E.userData.cells = [[MT - 0.10, 0, MZ, MT - 0.60]];
    g.add(E);
    g.name = key;
    return g;
  }
  return { build: build };
})();

/* ====================================================================================================================
   HADES on its Renault tractor and semi-trailer (fra_e90_tel, 1992-1997)
   EVIDENCE: no photograph or drawing of the launcher could be fetched (see the file header).  What is drawn rests
   on the published words only, and the shapes are the plainest that carry them:
     - "wheeled platforms composed of a tractor and a trailer with two missiles" (en.wikipedia infobox)
     - "each trailer carrying two missiles in containers that also act as launch boxes"; "carried horizontally,
       erected by the truck itself, and launched immediately" (en.wikipedia)
     - a Renault R 380.26 6x4 tractor; "a long power unit and a large compartment-van at the front for the crew and
       the electronics"; "a two-axle bogie with dual wheels" (search-result summary of truck-encyclopedia.com, a
       secondary source, the page itself not reachable)
     - missile 7.50 m long, 0.53 m across (en.wikipedia)
   Drawn: a forward-control 6x4 tractor cab (Renault's R-series is a flat-fronted tilt cab over the front axle), the
   trailer with the van over the gooseneck, a low power unit along the deck, the two containers side by side as one
   box hinged at the trailer's rear, nose forward, a two-axle bogie with duals.
   NOT CONFIRMED (all of it beyond the words above): every dimension - tractor 6.3 m, trailer 12.9 m, 16.5 m overall,
   width 2.50 (the road limit), van 2.6 m long and 3.6 m high, containers 8.2 m long, 0.80 m square each; the
   hinge place; the launch elevation (70 degrees); the cab's shape and glazing; the bogie's place; the paint (French
   green as the other French rows).  NOT drawn: the erecting rams, stabiliser jacks, cables, the van's doors and any
   fitting a photograph would be needed for.  The row is turret:true; the launch box does not traverse in any
   description, so NO "turret" node is drawn and the box stays fore-and-aft.
   Nodes: five "roadwheel" (the tractor's three axles, the trailer's two), "podelev" (the box and its two rounds,
   hinged at its rear, raised to userData.el; two cells, one per container).  */
var HeroHades = (function () {
  "use strict";
  var K = HeroEuKit;
  var PAINT = { base: "#4d5a3b", blots: ["#45512f", "#56623f"], seed: 9019 };
  var FRONT = 8.25, REAR = -8.25, RT = 0.53;
  var AX = [6.90, 3.35, 2.00, -5.40, -6.75], DECK = 1.45, HX = -7.95, HZ = 2.05, EL = 70 * Math.PI / 180;
  var PL = 8.20, CW = 0.80, CH = 0.80, MZ = 0.45, MT = 0.30;

  function tractor(B) {
    var s, i, cx0 = 5.75, cx1 = FRONT, cz0 = 1.05, cz1 = 3.05, hw = 1.25;
    /* chassis rails, fuel tanks, the fifth-wheel plate */
    for (s = -1; s <= 1; s += 2) K.box(B.dark, 1.10, FRONT - 0.2, s * 0.40 - 0.07, s * 0.40 + 0.07, 0.75, 1.05);
    K.box(B.dark, 2.10, 3.30, -1.00, 1.00, 1.05, 1.20);
    K.box(B.paint, 3.95, 5.55, 0.80, 1.20, 0.65, 1.15);
    K.box(B.paint, 3.95, 5.20, -1.20, -0.80, 0.65, 1.15);
    /* the cab: a flat face, the windscreen on a slight rake, square shoulders */
    K.loftN(B.paint, [
      [[cx0, -hw, cz0], [cx0, hw, cz0], [cx0, hw, cz1], [cx0, -hw, cz1]],
      [[cx1 - 0.15, -hw, cz0], [cx1 - 0.15, hw, cz0], [cx1 - 0.30, hw, cz1], [cx1 - 0.30, -hw, cz1]],
      [[cx1, -hw + 0.06, cz0], [cx1, hw - 0.06, cz0], [cx1 - 0.12, hw - 0.06, 2.00], [cx1 - 0.12, -hw + 0.06, 2.00]]]);
    K.slab(B.glass, [cx1 - 0.21 + 0.02, 0, 2.53], [-0.169, 0, 0.986], [0, 1, 0], [0.986, 0, 0.169], 0.42, hw - 0.12, 0.012);
    K.box(B.glass, cx1 - 1.30, cx1 - 0.60, hw, hw + 0.01, 2.05, 2.80);
    K.box(B.glass, cx1 - 1.30, cx1 - 0.60, -hw - 0.01, -hw, 2.05, 2.80);
    K.box(B.dark, cx1 - 0.05, cx1 + 0.02, -1.0, 1.0, 1.25, 1.85);
    for (i = 0; i < 6; i++) K.box(B.paint, cx1 + 0.02, cx1 + 0.04, -0.95, 0.95, 1.30 + i * 0.09, 1.34 + i * 0.09);
    K.box(B.paint, cx1 - 0.10, cx1 + 0.15, -1.25, 1.25, 0.55, 0.95);
    for (s = -1; s <= 1; s += 2) {
      K.cyl(B.dark, [cx1 + 0.12, s * 0.95, 0.80], [cx1 + 0.16, s * 0.95, 0.80], 0.09, 0.09, 10);
      K.box(B.dark, cx1 - 0.60, cx1 - 0.55, s * hw, s * (hw + 0.25), 2.25, 2.30);
      K.box(B.dark, cx1 - 0.58, cx1 - 0.50, s * (hw + 0.22), s * (hw + 0.26), 1.95, 2.40);
      K.box(B.paint, 6.30, 7.55, s * 1.25 - 0.01, s * 1.25 + 0.01, 1.00, 1.15);       /* front mudguard */
      K.box(B.paint, 1.35, 4.00, s * 1.25 - 0.01, s * 1.25 + 0.01, 1.15, 1.20);
    }
    K.box(B.team, 6.4, 7.6, -0.4, 0.4, cz1, cz1 + 0.015);
    K.cylZ(B.dark, 5.62, -1.05, 1.1, 3.25, 0.07, 8);                                  /* exhaust stack */
  }

  function trailer(B) {
    var s, i;
    /* gooseneck and van at the front (published words), the deck behind */
    K.box(B.paint, 1.95, 4.60, -1.25, 1.25, 1.35, 3.60);
    K.box(B.dark, 4.60, 4.62, -0.6, 0.6, 2.0, 3.0);
    for (s = -1; s <= 1; s += 2) {
      [2.40, 3.40].forEach(function (x) { K.box(B.dark, x - 0.015, x + 0.015, s > 0 ? 1.25 : -1.27, s > 0 ? 1.27 : -1.25, 1.55, 3.15); });   /* door seams */
      K.box(B.dark, 2.40, 3.40, s > 0 ? 1.25 : -1.27, s > 0 ? 1.27 : -1.25, 3.13, 3.16);
      K.box(B.paint, REAR + 0.1, 2.0, s * 0.55 - 0.10, s * 0.55 + 0.10, 0.95, DECK);     /* main beams */
      K.box(B.paint, REAR + 0.1, 2.0, s > 0 ? 1.20 : -1.25, s > 0 ? 1.25 : -1.20, 1.05, DECK);
    }
    K.box(B.paint, REAR + 0.1, 2.0, -1.25, 1.25, DECK - 0.06, DECK);
    K.box(B.team, 2.6, 3.6, -0.5, 0.5, 3.60, 3.615);
    /* the long power unit on the deck under the front of the box (published words; place NOT CONFIRMED) */
    K.box(B.paint, -1.20, 1.90, -1.10, 1.10, DECK, 1.95);
    for (i = 0; i < 8; i++) K.box(B.dark, -1.05 + i * 0.34, -0.85 + i * 0.34, 1.10, 1.115, 1.55, 1.85);
    /* the box's rests and the hinge brackets */
    for (s = -1; s <= 1; s += 2) {
      K.box(B.paint, HX - 0.15, HX + 0.40, s * 0.70 - 0.10, s * 0.70 + 0.10, DECK, HZ);
      K.cylY(B.dark, HX, s * 0.62 - 0.10, s * 0.62 + 0.10, HZ, 0.11, 10);
      K.box(B.dark, -4.75, -4.65, s * 1.25 - 0.01, s * 1.25 + 0.01, 0.75, 1.40);
      K.box(B.paint, -7.45, -4.70, s * 1.25 - 0.01, s * 1.25 + 0.01, 1.30, 1.38);         /* mudguards */
      K.box(B.dark, REAR, REAR + 0.06, s * 1.05 - 0.12, s * 1.05 + 0.12, 0.95, 1.15);      /* lamps */
    }
    K.box(B.dark, -7.2, -4.9, -0.6, 0.6, 0.85, 0.95);                                       /* bogie frame */
  }

  /* the two containers as one box in the hinge's frame, +X toward the front (published: the containers are the
     launch boxes); the missiles' noses lie inside behind the front caps */
  function launcher(B) {
    var s, i, w = CW, h = CH;
    for (s = -1; s <= 1; s += 2) {
      var yc = s * (w / 2 + 0.02);
      K.box(B.paint, 0.05, PL, yc - w / 2, yc + w / 2, 0.0, h);
      K.box(B.dark, PL, PL + 0.04, yc - w / 2 + 0.06, yc + w / 2 - 0.06, 0.06, h - 0.06);      /* front cap */
      K.box(B.dark, 0.01, 0.05, yc - w / 2 + 0.06, yc + w / 2 - 0.06, 0.06, h - 0.06);        /* rear cap */
      for (i = 0; i < 6; i++) {
        var xr = 0.4 + i * (PL - 0.8) / 5;
        K.box(B.paint, xr - 0.05, xr + 0.05, yc - w / 2 - 0.03, yc + w / 2 + 0.03, -0.03, h + 0.03);
      }
      K.cyl(B.msl, [MT, yc, MZ], [MT + 0.4, yc, MZ], 0.20, 0.265, 12);                         /* tail of the round */
    }
    for (s = -1; s <= 1; s += 2) K.box(B.paint, -0.15, 0.30, s * 0.62 - 0.10, s * 0.62 + 0.10, -0.12, 0.25);
  }

  function build(THREE, M, C) {
    var T = K.materials(THREE, C, PAINT, { glass: { color: 0x22303a, roughness: 0.15, metalness: 0.4 },
                                            msl: { color: 0x5a6148, roughness: 0.6, metalness: 0.1 } });
    var g = new THREE.Group(), HB = K.bins(T, ["paint", "dark", "team", "glass"]), EB = K.bins(T, ["paint", "dark", "msl"]), E, i;
    tractor(HB); trailer(HB);
    K.flush(THREE, g, HB);
    for (i = 0; i < AX.length; i++) {
      var dual = i > 0, ys = dual ? [-0.92, -0.62, 0.62, 0.92] : [-1.02, 1.02];
      K.wheelGroup(THREE, g, T, AX[i], RT, function (W) { K.truckAxle(W, ys, RT, dual ? 0.29 : 0.36, PAINT.base); });
    }
    launcher(EB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(HX, 0, HZ);
    K.flush(THREE, E, EB);
    E.userData.el = EL;
    E.userData.cells = [[MT, CW / 2 + 0.02, MZ, -0.4], [MT, -CW / 2 - 0.02, MZ, -0.4]];
    g.add(E);
    g.name = "fra_e90_tel";
    return g;
  }
  return { build: build };
})();

/* ====================================================================================================================
   COBRA, the French set, on the Renault TRM 10000 6x6 (fra_e00_radarv, 2008)
   Recognition list:
     1. the TRM 10000's forward-control cab, open-topped in CO1 (the canvas roof off), the grille and the bumper (CO1)
     2. three axles: one under the cab, a tandem at the rear; big single lugged tyres (CO1, CO2)
     3. the spare wheel standing upright behind the cab, a tall louvred equipment module behind it (CO1)
     4. the long shelter over the rear two-thirds, the green fuel tank and stowage boxes under it (CO1, CO2)
     5. the array: a flat square panel standing on a turntable at the rear of the vehicle, a thick module on its back
        (CO3, CO4; in CO1/CO2 it lies folded on the rear section)
   One pose is drawn, the working pose with the array up (the row is not deploy:true: render3d never shows a
   travel pose, as us_tpq53.js explains).
   MEASURED off CO1 (side-on): 870 px bow to stern; the tyres 100 px (front) and 90 px (rear), the man at the rear
   155 px; at the 1.20 m tyre (14.00 R 20 NOT CONFIRMED) and 80 px/m the set is 10.9 m long, longer than the cargo
   TRM 10000's published 9.31 m (the man, 1.78 m, gives at most 87 px/m, so at least 10.0 m: the published figure is
   the cargo body's).  Stations from the bow: cab back 2.06, front axle 3.12, spare wheel 3.4-4.6, module to 6.2,
   shelter to 8.9, rear axles 8.1 and 9.3, stern 10.9; shelter roof 3.75, deck 1.45.  The array in CO3 is 1.15 times
   the rear face (2.50 m) wide and 1.3 times tall: 2.8 x 3.2 m, NOT CONFIRMED.
   NOT CONFIRMED: the cab's height (3.10), the array's size and its 6-degree backward lean, the turntable's place,
   the width 2.50 (published for the cargo truck).  NOT drawn: the camouflage (CO1), the crew figures, cables,
   the levelling jacks (none shown down in CO3/CO4), the generator trailer.
   Nodes: "turret" (the turntable on the rear section's roof, the array's face along +X at rest), three "roadwheel".  */
var HeroCobraFr = (function () {
  "use strict";
  var K = HeroEuKit;
  var PAINT = { base: "#4d5a3b", blots: ["#45512f", "#56623f"], seed: 2008 };
  var FRONT = 5.45, REAR = -5.45, RT = 0.60, HW = 1.25;
  var AX = [2.33, -2.65, -3.85], DECK = 1.45, ROOF = 3.75, PIV = { x: -4.45, z: 2.95 };
  var AW = 2.80, AH = 3.20;

  function truck(B) {
    var s, i, cx0 = 3.39, cz0 = 0.88, cz1 = 3.10;
    for (s = -1; s <= 1; s += 2) K.box(B.dark, REAR + 0.2, FRONT - 0.3, s * 0.45 - 0.07, s * 0.45 + 0.07, 0.95, 1.25);
    /* the cab: flat face with the grille band, the windscreen frame, open top with the hoops (CO1) */
    K.box(B.paint, cx0, FRONT, -HW, HW, cz0, 2.15);
    for (s = -1; s <= 1; s += 2) {
      K.box(B.paint, cx0, FRONT - 0.15, s > 0 ? HW - 0.08 : -HW, s > 0 ? HW : -HW + 0.08, 2.15, 2.55);
      K.box(B.paint, FRONT - 0.30, FRONT - 0.20, s > 0 ? HW - 0.10 : -HW, s > 0 ? HW : -HW + 0.10, 2.15, cz1);
      K.box(B.paint, cx0, cx0 + 0.10, s > 0 ? HW - 0.10 : -HW, s > 0 ? HW : -HW + 0.10, 2.15, cz1);
      K.box(B.dark, FRONT - 0.30, cx0, s > 0 ? HW - 0.08 : -HW, s > 0 ? HW : -HW + 0.08, cz1 - 0.06, cz1);
      K.box(B.dark, FRONT + 0.01, FRONT + 0.04, s * 0.95 - 0.12, s * 0.95 + 0.12, 1.20, 1.40);   /* lamps */
      K.box(B.dark, FRONT - 0.5, FRONT - 0.45, s * HW, s * (HW + 0.30), 2.40, 2.45);
      K.box(B.dark, FRONT - 0.48, FRONT - 0.40, s * (HW + 0.26), s * (HW + 0.30), 2.0, 2.6);
      K.box(B.paint, 1.65, 3.05, s * HW - 0.01, s * HW + 0.01, 1.30, 1.42);                  /* front mudguard */
    }
    K.box(B.glass, FRONT - 0.29, FRONT - 0.21, -HW + 0.10, HW - 0.10, 2.20, 2.95);
    K.box(B.paint, FRONT - 0.29, FRONT - 0.21, -0.03, 0.03, 2.15, 3.0);
    K.box(B.dark, FRONT, FRONT + 0.02, -0.9, 0.9, 1.45, 2.0);
    for (i = 0; i < 5; i++) K.box(B.paint, FRONT + 0.02, FRONT + 0.04, -0.85, 0.85, 1.50 + i * 0.1, 1.54 + i * 0.1);
    K.box(B.paint, FRONT - 0.05, FRONT + 0.15, -HW, HW, 0.70, 1.10);
    K.box(B.dark, cx0 + 0.6, FRONT - 0.5, -HW + 0.15, HW - 0.15, 2.15, 2.20);                  /* the cab floor seen */
    /* the spare wheel upright behind the cab (CO1) */
    K.cyl(B.dark, [1.35, -0.05, 2.30], [1.35, 0.33, 2.30], 0.60, 0.60, 18);
    K.box(B.paint, 0.80, 1.95, -0.25, 0.35, DECK, 1.75);
    /* the deck, the louvred module and the long shelter (CO1, CO2) */
    K.box(B.paint, REAR + 0.1, 2.95, -HW, HW, DECK - 0.15, DECK);
    K.box(B.paint, -0.79, 0.84, -HW, HW, DECK, ROOF);
    for (i = 0; i < 6; i++) K.box(B.dark, -0.10, 0.50, HW, HW + 0.015, 3.00 - i * 0.10, 3.05 - i * 0.10);
    K.box(B.paint, -3.54, -0.79, -HW, HW, DECK, ROOF - 0.05);
    for (s = -1; s <= 1; s += 2) {
      /* the shelter's hatches (CO1): proud panels with their hinge strips */
      [-1.2, -2.35].forEach(function (x) {
        K.box(B.paint, x - 0.40, x + 0.40, s > 0 ? HW : -HW - 0.02, s > 0 ? HW + 0.02 : -HW, 2.0, 3.3);
        K.box(B.dark, x - 0.40, x + 0.40, s > 0 ? HW + 0.02 : -HW - 0.03, s > 0 ? HW + 0.03 : -HW - 0.02, 3.22, 3.28);
        K.box(B.dark, x + 0.28, x + 0.34, s > 0 ? HW + 0.02 : -HW - 0.04, s > 0 ? HW + 0.04 : -HW - 0.02, 2.55, 2.75);
      });
      K.box(B.paint, -3.50, -0.85, s > 0 ? HW : -HW - 0.03, s > 0 ? HW + 0.03 : -HW, ROOF - 0.12, ROOF - 0.05);
      K.box(B.paint, -0.75, -0.35, s * HW - 0.01, s * HW + 0.01, 0.75, 1.25);                  /* fuel-tank cradle */
    }
    K.cyl(B.paint, [-1.40, 1.0, 0.95], [-0.20, 1.0, 0.95], 0.28, 0.28, 14);                   /* the green fuel tank */
    K.box(B.paint, -2.20, -1.65, -1.20, -0.70, 0.75, 1.30);
    K.box(B.paint, 0.95, 1.70, 0.80, 1.20, 0.80, 1.35);
    /* the rear section under the array (lower than the shelter, CO3) */
    K.box(B.paint, REAR, -3.54, -HW, HW, DECK, PIV.z);
    for (s = -1; s <= 1; s += 2) {
      K.box(B.paint, -4.45, -3.05, s * HW - 0.01, s * HW + 0.01, 1.30, 1.40);
      K.box(B.dark, REAR - 0.04, REAR, s * 1.0 - 0.12, s * 1.0 + 0.12, 1.55, 1.75);
    }
    K.box(B.team, -2.6, -1.2, -0.5, 0.5, ROOF - 0.05, ROOF - 0.035);
    K.box(B.team, 3.8, 4.6, -0.6, 0.6, 2.20, 2.215);
  }

  /* the array on its turntable, in the turntable's frame, the face along +X (CO3, CO4) */
  function array(B) {
    var s, k, hw = AW / 2, lean = 0.105, zb = 0.35;
    K.cylZ(B.dark, 0, 0, 0, 0.10, 0.80, 20);
    K.cylZ(B.paint, 0, 0, 0.10, 0.30, 0.70, 20);
    K.box(B.paint, -0.55, 0.45, -0.90, 0.90, 0.25, zb + 0.15);
    /* the panel, leaning back a little: a thick housing, the plain radome face, the module on its back */
    var c = [0.0 - Math.sin(lean) * AH / 2, 0, zb + Math.cos(lean) * AH / 2], u = [Math.cos(lean), 0, Math.sin(lean)], w = [-Math.sin(lean), 0, Math.cos(lean)];
    K.slab(B.paint, c, u, [0, 1, 0], w, 0.17, hw, AH / 2);
    K.slab(B.face, [c[0] + u[0] * 0.175, 0, c[2] + u[2] * 0.175], u, [0, 1, 0], w, 0.006, hw - 0.07, AH / 2 - 0.07);
    K.slab(B.paint, [c[0] - u[0] * 0.33, 0, c[2] - u[2] * 0.33 - 0.25], u, [0, 1, 0], w, 0.17, hw - 0.35, AH / 2 - 0.55);
    for (k = 0; k < 4; k++) K.slab(B.dark, [c[0] - u[0] * 0.505, 0, c[2] - 0.9 + k * 0.45], u, [0, 1, 0], w, 0.005, hw - 0.45, 0.03);
    for (s = -1; s <= 1; s += 2) K.bar(B.paint, [-0.40, s * 0.75, 0.30], [c[0] - u[0] * 0.2 + w[0] * 0.2, s * 0.75, zb + 1.0], 0.12);
    K.cylZ(B.dark, -0.6, 0.7, 0.30, 1.4, 0.02, 5);
  }

  function build(THREE, M, C) {
    var T = K.materials(THREE, C, PAINT, { glass: { color: 0x22303a, roughness: 0.15, metalness: 0.4 },
                                            face: { color: 0x515b45, roughness: 0.8, metalness: 0.05 } });
    var g = new THREE.Group(), HB = K.bins(T, ["paint", "dark", "team", "glass"]), AB = K.bins(T, ["paint", "dark", "face"]), i;
    truck(HB);
    var h = new THREE.Group(); h.name = "hull";
    K.flush(THREE, h, HB);
    g.add(h);
    for (i = 0; i < AX.length; i++) K.wheelGroup(THREE, g, T, AX[i], RT, function (W) { K.truckAxle(W, [-1.0, 1.0], RT, 0.42, PAINT.base); });
    array(AB);
    var tur = new THREE.Group(); tur.name = "turret";
    tur.position.set(PIV.x, 0, PIV.z);
    K.flush(THREE, tur, AB);
    g.add(tur);
    g.name = "fra_e00_radarv";
    return g;
  }
  return { build: build };
})();

/* ====================================================================================================================
   CYMBELINE Mk 2 on the FV436 (FV432 hull) (gbr_e60_radarv, 1975-2003)
   The row's "FV436 with Cymbeline" is the FV432 with the radar on its rear roof (published, en.wikipedia
   "Cymbeline (radar)": "Mk 2 was mounted on top of an FV432"; "FV430 series": FV436 "later Cymbeline radar").
   HULL: REBUILT on the FV432 that js/hero/gb_light_armour.js (HeroFv430) measured off a square-on photograph (its
   F1, "GKN Sankey FV432 pic2.JPG", 226 px/m at the published 5.25 m; F3 front 3/4, F4 head on, F5 front; the full
   working is in that file's header, SCALES "FV430 family").  The first version of this module guessed the hull from
   the two 3/4 photographs FV1/FV2 (a box prism with a bent front plate, roof 1.88 m, 0.70 m wheel pitch, single road
   wheels); the square-on measurement is the stronger evidence and replaces it.  HeroFv430 exposes only whole-vehicle
   builders (fv432 / abbot / fv438), no hull builder, so its measured tables are COPIED here (the stations, the
   glacis line, the roof, the running gear table G) and drawn with this file's kit; gb_light_armour.js is not
   loaded or called, so the two files keep no load-order dependency.
   Recognition list:
     1. the tall plain box with ONE straight glacis (58 deg) from the nose to the roof, vertical sides, the lower
        nose plate raking back to the belly (HeroFv430 F1, F3, F4)
     2. five DUAL road wheels a side, two return rollers, the toothed drive sprocket at the FRONT, the idler at the
        rear (F1, F3)
     3. the lamp clusters in grilled guards at the glacis's top corners, the triple smoke dischargers (F3, F4)
     4. the exhaust along the LEFT side and up the rear corner, the box on the left front (F1, F5)
     5. the driver's hatch front RIGHT with its periscopes, the commander's cupola behind it, the engine grille front
        LEFT (F5, published)
     6. the radar on its circular mounting over the rear compartment, in place of the FV432's round roof hatch: a
        turntable on three supports, decking around it (published), the long scanner drum box and the curved
        reflector standing on it (CY1, CY2)
     7. the rear door and the bins on the rear plate either side (F1)
   MEASURED (HeroFv430, F1): hull 5.22 m drawn (nose tip 2.615 to the rear plate -2.25, the bins to -2.55) for the
   published 5.25 m; roof 1.73 m; road wheels 0.62 m at a 0.66 m pitch (stations 1.403 .. -1.257), return rollers at
   1.097 and -0.969; sprocket 2.159, idler -1.92.  WIDTH (F4 head on): hull 2.55 m over the glacis, 2.80 m over the
   tracks: both published widths drawn.  The radar head (published): 1.7 m wide, 1.5 m long, 1.07 m high folded,
   2.29 m with the antenna up, both from its stand's foot.
   KEPT from the first version, re-seated on the 1.73 m roof: the decking (2.50 m long, now cut to the 2.55 m hull's
   width), the three supports, the circular mount (0.22 m tall), the scanner drum box and the reflector, unchanged
   in their own frame.  The mount is centred on the FV432's round-hatch station (x -1.00, HeroFv430), which the
   published text says the radar mounting replaced; it was x -1.20 on the old 5.25 m box.
   NOT CONFIRMED: everything HeroFv430 lists as NOT CONFIRMED for the FV432 (the widths below the glacis, the belly,
   the hatch and cupola sizes, the door, the bins); the decking's size and the mount's height (no photograph of the
   FV436 roof was fetched); the reflector's curve and lean (CY2: a cylindrical section, concave forward, leaning
   back).  NOT drawn: the folding grille (stowed down in the working pose: only its frame along the deck edge), the
   cupola's GPMG, the interior, the operators' cable drums.  British plain green; no markings.
   Nodes: "turret" (the turntable; the reflector faces +X at rest), five "roadwheel".  */
var HeroCymbeline = (function () {
  "use strict";
  var K = HeroEuKit;
  var PAINT = { base: "#4a5236", blots: ["#41492f", "#535b3e"], seed: 4361 };
  /* the FV432 hull, copied from HeroFv430 (gb_light_armour.js; F1 at 226 px/m): nose tip, glacis top, rear plate,
     fender, roof, half widths (glacis 2.55 m, lower hull between the tracks), belly */
  var NOSE = 2.615, NZ = 0.765, GX = 2.02, REAR = -2.25, FEN = 1.02, ROOF = 1.73, HW = 1.275, LW = 1.04, BELLY = 0.41;
  var GSL = (GX - NOSE) / (ROOF - NZ);
  function glX(z) { return NOSE + (z - NZ) * GSL; }
  var GA = Math.atan2(ROOF - NZ, NOSE - GX);       /* the glacis from horizontal, 58 deg */
  /* running gear: HeroFv430's G (XW, ZW, RW, RR at RRZ / RRR, SPR, IDL, TY, TW) in this kit's form; th 0.043 makes
     the belt stand 0.03 off the wheels as HeroFv430's does */
  var RG = { xw: [1.403, 0.739, 0.088, -0.562, -1.257], zw: 0.36, rw: 0.31, ty: 1.23, tw: 0.17, dbl: true,
             rollers: [[1.097, 0.76, 0.11], [-0.969, 0.76, 0.11]],
             spr: { x: 2.159, z: 0.566, r: 0.29 }, idl: { x: -1.92, z: 0.64, r: 0.29 }, pitch: 0.16, th: 0.043, teeth: 12 };
  /* the radar mount over the rear compartment, on the FV432's round-hatch station; its decking 2.50 m long */
  var PIV = { x: -1.00, z: ROOF + 0.22 }, DK0 = PIV.x - 1.25, DK1 = PIV.x + 1.25;

  function u2(x, z) { var l = Math.sqrt(x * x + z * z); return [x / l, 0, z / l]; }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { K.cyl(bin, [x0, y, z], [x1, y, z], r0, r1, seg); }
  /* a slab lying on the glacis (sloping down toward +X at angle a) */
  function onSlope(bin, x, y, z, a, hu, hv, hw) {
    var ca = Math.cos(a), sa = Math.sin(a), n = [sa, 0, ca];
    K.slab(bin, [x + n[0] * hw, y, z + n[2] * hw], [ca, 0, -sa], [0, 1, 0], n, hu, hv, hw);
  }
  /* the lamp cluster in its grilled guard (HeroFv430 lampCluster; the lenses in this module's glass) */
  function lampCluster(B, x, y, z) {
    var i;
    K.box(B.paint, x - 0.14, x - 0.02, y - 0.20, y + 0.20, z - 0.14, z + 0.12);
    cylX(B.glass, x - 0.02, x - 0.01, y - 0.09, z, 0.075, 0.075, 12);
    cylX(B.glass, x - 0.02, x - 0.01, y + 0.09, z, 0.075, 0.075, 12);
    for (i = 0; i < 6; i++) K.box(B.dark, x + 0.05, x + 0.07, y - 0.19 + i * 0.076, y - 0.175 + i * 0.076, z - 0.12, z + 0.12);
    K.box(B.dark, x - 0.02, x + 0.07, y - 0.205, y + 0.205, z + 0.11, z + 0.13);
    K.box(B.dark, x - 0.02, x + 0.07, y - 0.205, y + 0.205, z - 0.15, z - 0.13);
  }
  function smoke(B, x, y, z, n, dy, s) {
    for (var i = 0; i < n; i++) K.cyl(B.dark, [x - 0.06, y + (i - (n - 1) / 2) * dy, z], [x + 0.08, y + (i - (n - 1) / 2) * dy + s * 0.03, z + 0.10], 0.038, 0.038, 8);
  }

  function hull(B) {
    var P = B.paint, D = B.dark, s, i, x, y, z, a;
    /* between the tracks: the lower nose plate raking back to the belly (F4), the tail; towing eyes; mudflaps */
    K.prismY(P, [[NOSE, NZ], [2.25, BELLY], [-2.12, BELLY], [REAR, 0.56], [REAR, FEN], [NOSE - (FEN - NZ) * 0.6, FEN]], -LW, LW);
    for (s = -1; s <= 1; s += 2) K.box(D, NOSE - 0.20, NOSE + 0.04, s * 0.72 - 0.06, s * 0.72 + 0.06, NZ - 0.20, NZ - 0.06);
    for (s = -1; s <= 1; s += 2) K.slab(D, [REAR - 0.13, s * RG.ty, 0.93], u2(-0.6, -0.8), [0, 1, 0], u2(0.8, -0.6), 0.14, RG.tw + 0.02, 0.01);
    /* the upper box over the tracks: vertical sides, the one straight glacis (F1, F3) */
    K.prismY(P, [[glX(FEN), FEN], [REAR, FEN], [REAR, ROOF], [GX, ROOF]], -HW, HW);
    K.prismY(P, [[NOSE, NZ], [glX(FEN), FEN], [glX(FEN) - 0.16, FEN]], -HW, HW);
    for (s = -1; s <= 1; s += 2) K.box(D, REAR, glX(FEN) - 0.05, s > 0 ? HW - 0.01 : -HW - 0.035, s > 0 ? HW + 0.035 : -HW + 0.01, FEN - 0.02, FEN + 0.03);
    /* the glacis: the access plate and its hinge line, the lamp clusters and the smoke dischargers at the top
       corners (F3, F4) */
    onSlope(P, glX(1.20), 0.0, 1.20, GA, 0.30, 0.48, 0.012);
    onSlope(D, glX(1.47), 0.0, 1.47, GA, 0.015, 0.40, 0.016);
    for (s = -1; s <= 1; s += 2) {
      z = 1.48; x = glX(z) + 0.05;
      lampCluster(B, x + 0.04, s * 1.02, z);
      smoke(B, glX(1.66) - 0.02, s * 0.70, 1.66, 3, 0.09, s);
      K.box(D, glX(1.66) - 0.10, glX(1.66) + 0.02, s * 0.70 - 0.16, s * 0.70 + 0.16, 1.60, 1.66);
    }
    K.box(B.team, GX - 0.10, GX - 0.02, -0.30, 0.30, ROOF, ROOF + 0.012);
    /* the roof: the driver's hatch front RIGHT and his periscopes, the engine grille front LEFT (F5, published) */
    K.cylZ(P, 1.72, -0.70, ROOF, ROOF + 0.06, 0.30, 16);
    K.box(D, 1.46, 1.52, -0.92, -0.48, ROOF + 0.06, ROOF + 0.09);
    for (i = -1; i <= 1; i++) K.box(B.glass, 1.98, 2.02, -0.70 + i * 0.13 - 0.045, -0.70 + i * 0.13 + 0.045, ROOF, ROOF + 0.07);
    for (i = 0; i < 9; i++) { x = 1.85 - i * 0.11; K.box(D, x - 0.035, x + 0.035, 0.15, 1.10, ROOF, ROOF + 0.025); }
    K.box(P, 0.80, 1.92, 0.10, 1.15, ROOF, ROOF + 0.01);
    /* the commander's cupola behind the driver (published; HeroFv430's cupola, here fixed to the hull): the ring,
       the vision blocks, the closed lid */
    var cx = 1.05, cy = -0.62;
    K.cylZ(P, cx, cy, ROOF, ROOF + 0.18, 0.40, 18);
    K.cylZ(P, cx, cy, ROOF + 0.18, ROOF + 0.24, 0.36, 18);
    for (i = 0; i < 8; i++) {
      a = i / 8 * K.TAU;
      K.box(B.glass, cx + Math.cos(a) * 0.41 - 0.03, cx + Math.cos(a) * 0.41 + 0.03, cy + Math.sin(a) * 0.41 - 0.03, cy + Math.sin(a) * 0.41 + 0.03, ROOF + 0.10, ROOF + 0.15);
    }
    K.cylZ(P, cx - 0.04, cy, ROOF + 0.24, ROOF + 0.28, 0.30, 16);
    K.box(D, cx - 0.30, cx - 0.24, cy - 0.12, cy + 0.12, ROOF + 0.28, ROOF + 0.31);
    /* the box on the left front (F1, F5) */
    K.box(D, 0.49, 1.80, HW, HW + 0.12, 1.05, 1.63);
    K.box(D, 1.10, 1.14, HW + 0.12, HW + 0.13, 1.06, 1.62);
    /* the exhaust along the LEFT side: the silencer, its guard, the pipe back and up the rear corner (F1) */
    y = HW + 0.10;
    cylX(D, 0.18, 0.49, y, 1.28, 0.07, 0.07, 10);
    K.box(D, -1.04, 0.18, HW, HW + 0.09, 1.21, 1.41);
    cylX(D, -2.30, -1.04, y, 1.30, 0.05, 0.05, 8);
    K.cyl(D, [-2.30, y, 1.30], [-2.42, y, 1.45], 0.05, 0.05, 8);
    K.cylZ(D, -2.42, y, 1.45, 2.12, 0.05, 8);
    K.box(D, -2.40, -2.30, y - 0.03, y + 0.03, 1.55, 1.62);
    /* grab rails and the side's plate seam (F1) */
    for (s = -1; s <= 1; s += 2) {
      K.box(D, -2.15, -0.20, s > 0 ? HW : -HW - 0.02, s > 0 ? HW + 0.02 : -HW, ROOF - 0.06, ROOF - 0.03);
      K.box(D, -0.208, -0.192, s > 0 ? HW : -HW - 0.006, s > 0 ? HW + 0.006 : -HW, 1.06, 1.74);
    }
    /* the rear plate: the door hinged on the RIGHT (published), its hinges and handle; the bins either side
       (F1); the tail lamps */
    K.box(P, REAR - 0.05, REAR, -0.62, 0.46, 0.60, 1.62);
    for (i = 0; i < 3; i++) K.box(D, REAR - 0.08, REAR - 0.04, -0.68, -0.58, 0.70 + i * 0.40, 0.84 + i * 0.40);
    K.box(D, REAR - 0.09, REAR - 0.05, 0.30, 0.40, 1.05, 1.10);
    for (s = -1; s <= 1; s += 2) {
      var y0 = s > 0 ? 0.55 : -1.25, y1 = s > 0 ? 1.25 : -0.72;
      K.box(P, -2.55, REAR, y0, y1, 1.30, 1.70);
      K.box(D, -2.56, -2.54, y0 + 0.05, y1 - 0.05, 1.62, 1.66);
      K.box(D, REAR - 0.03, REAR, s * 1.18 - 0.05, s * 1.18 + 0.05, 1.12, 1.20);
    }
    /* the radar mounting in place of the round roof hatch: the decking around it, the three supports, the circular
       mount (published); the folded grille's frame lying along the deck edge */
    K.box(P, DK0, DK1, -HW, HW, ROOF, ROOF + 0.04);
    for (i = 0; i < 9; i++) K.box(D, DK0 + 0.05 + i * 0.28, DK0 + 0.07 + i * 0.28, -HW + 0.02, HW - 0.02, ROOF + 0.04, ROOF + 0.05);
    for (i = 0; i < 3; i++) { var b = i / 3 * K.TAU + 0.5; K.box(P, PIV.x + Math.cos(b) * 0.80 - 0.08, PIV.x + Math.cos(b) * 0.80 + 0.08, Math.sin(b) * 0.80 - 0.08, Math.sin(b) * 0.80 + 0.08, ROOF, PIV.z); }
    K.cylZ(D, PIV.x, 0, ROOF, PIV.z - 0.02, 0.95, 24);
    for (s = -1; s <= 1; s += 2) K.box(D, DK0, DK1, s > 0 ? HW - 0.06 : -HW, s > 0 ? HW : -HW + 0.06, ROOF + 0.04, ROOF + 0.10);
  }

  /* the radar head on the turntable (CY1, CY2; published 1.7 x 1.5 m, 1.07 m folded, 2.29 m antenna up) */
  function radar(B) {
    var s, i, k;
    K.cylZ(B.dark, 0, 0, 0, 0.08, 0.80, 20);
    /* the main electronic unit and the long scanner drum across the top (CY1, CY2) */
    K.box(B.paint, -0.70, 0.40, -0.70, 0.70, 0.08, 0.62);
    K.cyl(B.paint, [0.10, -0.85, 0.80], [0.10, 0.85, 0.80], 0.30, 0.30, 16);
    K.box(B.paint, -0.25, 0.42, -0.85, 0.85, 0.55, 0.92);
    for (i = 0; i < 6; i++) K.box(B.dark, 0.42, 0.44, -0.75 + i * 0.30, -0.70 + i * 0.30, 0.66, 0.76);   /* catches */
    K.box(B.paint, -0.75, -0.40, 0.30, 0.70, 0.08, 0.50);                                              /* generator */
    /* the reflector: a cylindrical section, concave toward +X, standing up behind the drum and leaning back (CY2):
       1.7 m wide, its top 2.29 m above the head's foot (published) */
    var N = 7, z0 = 0.95, z1 = 2.29, rows = [];
    for (k = 0; k <= N; k++) {
      var f = k / N, z = z0 + (z1 - z0) * f, x = -0.15 - 0.55 * f * f;
      rows.push([x, z]);
    }
    for (k = 0; k < N; k++) {
      var A = rows[k], Bp = rows[k + 1];
      K.belt(B.face, A[0], A[1], Bp[0], Bp[1], -0.85, 0.85, 0.03);
      K.belt(B.paint, A[0] - 0.04, A[1], Bp[0] - 0.04, Bp[1], -0.80, 0.80, 0.03);
    }
    for (s = -1; s <= 1; s += 2) {
      K.bar(B.paint, [0.05, s * 0.80, 0.90], [rows[N][0] - 0.05, s * 0.80, z1 - 0.05], 0.05);
      K.bar(B.dark, [-0.30, s * 0.55, 0.90], [rows[4][0] - 0.06, s * 0.55, rows[4][1]], 0.04);
    }
  }

  function build(THREE, M, C) {
    var T = K.materials(THREE, C, PAINT, { glass: { color: 0x22303a, roughness: 0.15, metalness: 0.4 },
                                            face: { color: 0x5b6249, roughness: 0.75, metalness: 0.1, side: 2 } });
    var g = new THREE.Group(), HB = K.bins(T, ["paint", "dark", "team", "glass"]), AB = K.bins(T, ["paint", "dark", "face"]), i;
    hull(HB);
    K.track(HB, RG);
    K.flush(THREE, g, HB);
    for (i = 0; i < RG.xw.length; i++) K.wheelGroup(THREE, g, T, RG.xw[i], RG.zw, function (W) { K.roadWheel(W, RG, PAINT.base); });
    radar(AB);
    var tur = new THREE.Group(); tur.name = "turret";
    tur.position.set(PIV.x, 0, PIV.z);
    K.flush(THREE, tur, AB);
    g.add(tur);
    g.name = "gbr_e60_radarv";
    return g;
  }
  return { build: build };
})();

/* ====================================================================================================================
   MAMBA: the Saab ARTHUR on the Hagglunds Bv206 (gbr_e00_radarv, 2003)
   Recognition list:
     1. two short tracked cars joined by the articulation: the front car with the cab (a rounded glass-house, square
        windows, the lamp guards on the roof front, MA4), the rear car carrying the box shelter (MA1-MA4)
     2. four rubber band tracks, each with five small road wheels, the sprocket at the front, the idler at the rear
        (MA2, MA4)
     3. the shelter on the rear car, square and flat-roofed, a little taller than the cab, a door in its side (MA1)
     4. the array: a tall narrow panel on a post at the shelter's REAR end, the post's pedestal on the rear wall
        (MA1, MA2, MA3)
     5. the levelling legs down at the rear car's four corners (MA1, MA2)
   PUBLISHED: Bv206 6.9 x 1.87 x 2.4 m.  MEASURED: the array in MA3 (nearly face-on) 65 x 145 px, in MA1 90 x 150 px
   seen at about 40 degrees: 1.55 m wide and 2.55 m tall against the 1.87 m shelter, NOT CONFIRMED.  Shelter roof
   2.35 m (MA1: within 0.1 m of the cab roof), the panel's foot 2.05 m (MA2: about level with the shelter's top),
   NOT CONFIRMED.  The cars' lengths (front 3.05, gap 0.40, rear 3.45 m) are read off MA1/MA4, NOT CONFIRMED.
   Paint: green (MA1/MA2, the British set in Iraq in 2003-2008 is green), #50573f.  NOT drawn: the mast and tripod
   antenna standing beside it (MA1), camouflage net, the white winter cover (MA3), the far-side fittings.
   Nodes: "turret" (the array's turntable on the shelter's rear end, face along +X at rest), ten "roadwheel" (an axle
   position each, both sides of one car; five on each car).  */
var HeroMamba = (function () {
  "use strict";
  var K = HeroEuKit;
  var PAINT = { base: "#50573f", blots: ["#474e37", "#596046"], seed: 2060 };
  var FRONT = 3.45, REAR = -3.45, HWD = 0.935;
  var F = { x0: 0.40, x1: FRONT }, R = { x0: REAR, x1: 0.0 };
  function rg(c) {
    var L = c.x1 - c.x0, m = (c.x0 + c.x1) / 2, p = (L - 1.0) / 4;
    return { xw: [m + 2 * p - 0.05, m + p - 0.05, m - 0.05, m - p - 0.05, m - 2 * p - 0.05], zw: 0.274, rw: 0.20, ty: 0.625, tw: 0.31,
             spr: { x: c.x1 - 0.32, z: 0.42, r: 0.25 }, idl: { x: c.x0 + 0.30, z: 0.30, r: 0.22 }, pitch: 0.12, th: 0.05, teeth: 12 };
  }
  var RGF = rg(F), RGR = rg(R);
  var PIV = { x: REAR + 0.40, z: 2.05 }, AW = 1.55, AH = 2.55;

  function cars(B) {
    var s, i;
    /* the front car: the tub over the tracks, the cab's glass-house (MA4) */
    K.loftN(B.paint, [
      [[F.x0, -HWD, 0.75], [F.x0, HWD, 0.75], [F.x0, HWD, 2.30], [F.x0, -HWD, 2.30]],
      [[F.x1 - 0.95, -HWD, 0.75], [F.x1 - 0.95, HWD, 0.75], [F.x1 - 0.95, HWD, 2.40], [F.x1 - 0.95, -HWD, 2.40]],
      [[F.x1 - 0.40, -HWD, 0.75], [F.x1 - 0.40, HWD, 0.75], [F.x1 - 0.55, HWD - 0.05, 2.32], [F.x1 - 0.55, -HWD + 0.05, 2.32]],
      [[F.x1, -HWD + 0.05, 0.85], [F.x1, HWD - 0.05, 0.85], [F.x1 - 0.10, HWD - 0.08, 1.45], [F.x1 - 0.10, -HWD + 0.08, 1.45]]]);
    K.slab(B.glass, [F.x1 - 0.325 + 0.018, 0, 1.885 + 0.009], [0.89, 0, 0.46], [0, 1, 0], [-0.46, 0, 0.89], 0.012, HWD - 0.14, 0.36);
    for (s = -1; s <= 1; s += 2) {
      K.box(B.glass, F.x1 - 1.55, F.x1 - 0.75, s > 0 ? HWD : -HWD - 0.01, s > 0 ? HWD + 0.01 : -HWD, 1.70, 2.20);
      K.box(B.glass, F.x0 + 0.35, F.x0 + 1.05, s > 0 ? HWD : -HWD - 0.01, s > 0 ? HWD + 0.01 : -HWD, 1.70, 2.20);
      K.box(B.dark, F.x1 - 1.70, F.x1 - 1.68, s > 0 ? HWD : -HWD - 0.01, s > 0 ? HWD + 0.01 : -HWD, 0.95, 2.25);
      /* the bull-bar and the lamps in guards on the roof front (MA4) */
      K.bar(B.dark, [F.x1 + 0.08, s * 0.85, 0.70], [F.x1 - 0.30, s * 0.85, 2.35], 0.05);
      K.box(B.dark, F.x1 - 0.55, F.x1 - 0.35, s * 0.65 - 0.12, s * 0.65 + 0.12, 2.32, 2.55);
      K.box(B.dark, F.x1 - 0.04, F.x1 + 0.02, s * 0.62 - 0.10, s * 0.62 + 0.10, 1.00, 1.20);
    }
    K.bar(B.dark, [F.x1 + 0.08, -0.85, 0.75], [F.x1 + 0.08, 0.85, 0.75], 0.06);
    K.box(B.team, F.x0 + 0.5, F.x0 + 1.4, -0.4, 0.4, 2.30, 2.315);
    /* the articulation: the steering rams and the joint (MA1) */
    K.box(B.dark, R.x1 - 0.05, F.x0 + 0.05, -0.20, 0.20, 0.55, 0.95);
    for (s = -1; s <= 1; s += 2) K.cyl(B.dark, [R.x1 - 0.05, s * 0.35, 0.80], [F.x0 + 0.05, s * 0.35, 0.80], 0.05, 0.05, 8);
    /* the rear car: the tub and the shelter (MA1, MA2) */
    K.box(B.paint, R.x0, R.x1, -HWD, HWD, 0.75, 1.10);
    K.box(B.paint, R.x0 + 0.02, R.x1 - 0.02, -HWD + 0.02, HWD - 0.02, 1.10, 2.35);
    for (s = -1; s <= 1; s += 2) {
      K.box(B.paint, -2.10, -1.30, s > 0 ? HWD - 0.02 : -HWD - 0.02, s > 0 ? HWD + 0.02 : -HWD + 0.02, 1.15, 2.20);   /* door (MA1) */
      K.box(B.dark, -1.42, -1.36, s > 0 ? HWD + 0.02 : -HWD - 0.04, s > 0 ? HWD + 0.04 : -HWD - 0.02, 1.60, 1.75);
      K.box(B.glass, -1.05, -0.55, s > 0 ? HWD - 0.02 : -HWD + 0.005, s > 0 ? HWD - 0.005 : -HWD + 0.02, 1.80, 2.10);
      /* the levelling legs at the corners, down (MA1, MA2) */
      [R.x0 + 0.15, R.x1 - 0.20].forEach(function (x) {
        K.box(B.dark, x - 0.06, x + 0.06, s * (HWD + 0.02), s * (HWD + 0.14), 0.95, 1.55);
        K.bar(B.dark, [x, s * (HWD + 0.08), 1.0], [x, s * (HWD + 0.30), 0.03], 0.07);
        K.box(B.dark, x - 0.12, x + 0.12, s * (HWD + 0.30) - 0.12, s * (HWD + 0.30) + 0.12, 0.0, 0.04);
      });
      K.box(B.dark, R.x0 + 0.5, R.x1 - 0.4, s > 0 ? HWD - 0.02 : -HWD - 0.04, s > 0 ? HWD + 0.04 : -HWD + 0.02, 2.30, 2.40);   /* roof rail */
    }
    /* the pedestal on the rear wall and the box on the roof (MA2) */
    K.box(B.paint, R.x0 - 0.06, R.x0 + 0.75, -0.45, 0.45, 2.35, PIV.z);
    K.box(B.paint, -1.4, -0.6, -0.5, 0.2, 2.35, 2.62);
    K.cylZ(B.dark, -0.4, 0.75, 2.35, 4.0, 0.015, 5);
    K.box(B.team, -2.4, -1.6, -0.4, 0.4, 2.35, 2.365);
  }

  /* the array on its post, face along +X (MA1-MA3) */
  function array(B) {
    var s, k, hw = AW / 2, zb = 0.45;
    K.cylZ(B.dark, 0, 0, 0, 0.08, 0.42, 16);
    K.box(B.paint, -0.30, 0.20, -0.25, 0.25, 0.08, zb + 0.30);
    K.box(B.paint, 0.0, 0.22, -hw, hw, zb, zb + AH);
    K.box(B.face, 0.22, 0.228, -hw + 0.05, hw - 0.05, zb + 0.05, zb + AH - 0.05);
    K.box(B.paint, -0.30, 0.0, -hw + 0.20, hw - 0.20, zb + 0.20, zb + AH - 0.35);
    for (k = 0; k < 5; k++) K.box(B.dark, -0.305, -0.30, -hw + 0.30, hw - 0.30, zb + 0.4 + k * 0.40, zb + 0.43 + k * 0.40);
    for (s = -1; s <= 1; s += 2) K.box(B.dark, -0.02, 0.24, s > 0 ? hw : -hw - 0.03, s > 0 ? hw + 0.03 : -hw, zb, zb + AH);
  }

  function build(THREE, M, C) {
    var T = K.materials(THREE, C, PAINT, { glass: { color: 0x22303a, roughness: 0.15, metalness: 0.4 },
                                            face: { color: 0x5a6148, roughness: 0.8, metalness: 0.05 } });
    var g = new THREE.Group(), HB = K.bins(T, ["paint", "dark", "team", "glass"]), AB = K.bins(T, ["paint", "dark", "face"]), i;
    cars(HB);
    K.track(HB, RGF); K.track(HB, RGR);
    K.flush(THREE, g, HB);
    /* ten "roadwheel" groups: each car's axle positions are its own (an axle position holds both of that car's
       sides), five on the front car and five on the rear */
    [RGF, RGR].forEach(function (o) {
      for (i = 0; i < o.xw.length; i++) K.wheelGroup(THREE, g, T, o.xw[i], o.zw, function (W) { K.roadWheel(W, o, PAINT.base); });
    });
    array(AB);
    var tur = new THREE.Group(); tur.name = "turret";
    tur.position.set(PIV.x, 0, PIV.z);
    K.flush(THREE, tur, AB);
    g.add(tur);
    g.name = "gbr_e00_radarv";
    return g;
  }
  return { build: build };
})();

/* len: the measured X extent of each build (dump.js): Pluton 8.24 x 3.22 x 3.89 m in travel (the hull 6.59 m, the
   nose 1.45 m past the bow); Hades 16.66 x 3.02 x 3.62; COBRA 11.09 x 3.10 (mirrors) x 6.50 (the array up);
   Cymbeline 5.22 (HeroFv430's measured hull: nose 2.615 to the rear bins -2.55; 5.25 published) x 2.92 (the road
   wheel hubs; tracks 2.80, hull 2.55) x 4.27 (reflector up); MAMBA 7.07
   (6.9 published, bull-bar and legs) x 2.71 (legs down; 1.87 body) x 5.05 (the array up) */
UNIT_MODELS["fra_e60_tel"] = { len: 8.24, build: function (THREE, M, C) { return HeroPluton.build(THREE, M, C, "fra_e60_tel"); } };
UNIT_MODELS["fra_e80_tel"] = { len: 8.24, build: function (THREE, M, C) { return HeroPluton.build(THREE, M, C, "fra_e80_tel"); } };
/* fra_e90_tel (Hades) is NOT registered: no photo or drawing of the
   launcher could be found, so HeroHades rests on published wording alone
   and the row keeps its stand-in until a reference is measured. */
/* UNIT_MODELS["fra_e90_tel"] = { len: 16.66, build: HeroHades.build }; */
UNIT_MODELS["fra_e00_radarv"] = { len: 11.09, build: HeroCobraFr.build };
UNIT_MODELS["gbr_e60_radarv"] = { len: 5.22, build: HeroCymbeline.build };
UNIT_MODELS["gbr_e00_radarv"] = { len: 7.07, build: HeroMamba.build };
