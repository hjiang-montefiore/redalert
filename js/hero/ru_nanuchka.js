/* ==================== js/hero/ru_nanuchka.js ============================
   HERO MODEL -- Project 1234 "Ovod" (NATO Nanuchka I) small missile ship
   (malyy raketnyy korabl'), the FIRST-SERIES ship as photographed in the
   1980s (1983-1988), NOT the later Project 1234.1 (Nanuchka III: single
   76 mm AK-176 aft, AK-630 on the after house, a taller bridge).
   Key (unchanged): pact_e80_corvette (eras.js "Project 1234 Nanuchka",
   service 1970, e80, turret:true; generations.js gun "twin 57mm AK-725").
   FULL-QUALITY REDO 2026-10-24: hull lofted from a station table measured off
   the photographs below, the superstructure re-measured, the launchers drawn
   as three-tube bins, canvas plate and deck paint.

   PUBLISHED FIGURES (kept from the first version; warship_specs.js row 59.3 /
   11.8): length 59.3 m, beam 11.8 m, draught about 2.6 m (3.0 m at full
   load), three shafts.  Armament of Project 1234: two triple P-120 Malakhit
   launchers, one 4K33 Osa-M (twin launcher retracting into a well on the
   forecastle), one twin 57 mm AK-725 aft.

   ROW CONFLICT (reported, unchanged): eras.js names "Project 1234
   Nanuchka", service 1970, and generations.js gives the gun as "twin 57mm
   AK-725" - all Nanuchka I.  warship_specs.js names "Project 1234.1",
   gunCal 76, gunPos "fore", ciws 1, and the eras.js weapons list carries
   ciws_ak630: Nanuchka III items (and the 76 mm was aft, not fore).  The
   model follows the row's own name, date and gun: the twin AK-725 at the
   stern, NO AK-630 and NO 76 mm are drawn.

   REFERENCES (Wikimedia Commons, width 960, cached in scratchpad
   q_nanuchka_ref):
     [USN] "Nanuchka class corvette.JPG" (US Navy, public domain; Burya-class
           category, Nanuchka I): from above her STARBOARD side, the whole
           ship near broadside - the MASTER PLAN: 59.3 m = 707 px, every
           station below (d = metres abaft the stem head) read off a metre
           grid laid over it.
     [DN]  "Nanuchka-I DN-SC-88-09637.jpg" (US DoD, 1980s, public domain):
           from above her PORT bow at speed - the bins' shape and tilt, the
           bridge, the T-director on the bridge roof, the small radome at the
           dome's foot, the after house and its director, the AK-725 shield.
     [S83] "Soviet-Nanuchka-1983.jpg" (starboard, low, alongside, 1983) -
           the HEIGHTS: read at 18.2 px a metre (the dome 3.3 m across, as
           measured on [USN]): deck 3.2 m amidships, 4.7 m at the stem head,
           after house roof 5.7 m, wheelhouse windows 8.7-9.5 m, dome
           drum base 10.9 m, dome top 14.4 m, mast top 19.7 m.
     [617] "Nanuchka class corvette 617.jpg" (Sevastopol, a Nanuchka III, near
           broadside) and [555] "Korvette Geyzer Nanuchka 555.jpg" (Nanuchka III,
           bow quarter): the SAME HULL - the raked stem (about 3 m of rake),
           the flare, the transom - and the three tube ends of a P-120 bin, two
           below and one above.  Their after ends (76 mm, AK-630), their mast
           and their taller bridge are NOT used.
     No published profile drawing was found on Commons.

   RECOGNITION LIST (each must read at game zoom; where it shows):
     1. Short beamy hull, a raked stem over a cut-away forefoot, strong flare
        forward, the sheer rising from d 26 to 4.7 m at the stem head, a
        broad transom [USN, S83, 617]: station table H, ring().
     2. The round, flush Osa-M well cover on the forecastle, d 12.6, 3.4 m
        across [USN, DN]: forecastle().
     3. The two triple P-120 Malakhit bins on the side decks either side of
        the forward superstructure, d 18.1-28.6, nose up about 10 deg, three
        tubes (two below, one above) with domed end caps [USN, DN, S83, 555]:
        bin().
     4. The sloped-sided forward block ahead of the bridge, d 14.4-19.4, a
        director on its roof (covered by a tarpaulin in [S83]) [USN, DN, S83].
     5. The bridge: a lower level with an open front platform, the wheelhouse
        set back above it with its window band, the T-shaped director on its
        roof [DN, USN, S83]: bridge().
     6. The big Band Stand radome on its pedestal at the after end of the
        bridge, centre d 28.5, 3.3 m across, top 14.4 m [all].
     7. A small radome on a column each side at the dome's foot, d 29.4 [USN
        starboard, DN port].
     8. The tall tapering four-leg lattice mast just abaft the dome, d 32.8,
        with its platforms, the wide yard and the antenna at the top, to
        19.7 m [all].
     9. The long low after house d 33.5-50.8 with the raised sloped-sided
        block at its fore end, boxes and raft canisters on the roof and the
        gun director on its pedestal at the after end, d 48.8 [USN, DN].
    10. The twin 57 mm AK-725 in its round, dome-topped shield on the stern
        deck, d 53.7 [USN, DN]: group "turret".
    11. Paint as photographed in the 1980s: Soviet navy grey hull and
        superstructure (the hull a little darker), red-brown decks, black
        boot topping, dark red bottom [USN, DN, S83].  Sampled [DN] launcher
        (sunlit) 0x6b737d, [USN] superstructure 0xbeb9b2 and hull 0xaca6a0
        (both over-exposed), deck 0xc99689; taken to: superstructure
        0x7a838a, hull 0x687178, deck 0x7a4c42, radomes 0x8a9298.
   CORRECTED against the first version: the bins are now three tubes
   (two below, one above, as [555]), not three in a row; the dome is 3.3 m
   across on a pedestal (was 3.5 m on the bridge roof); the deck is 3.2 m
   amidships and 4.7 m at the stem head (was 3.7 / 6.35); the forward block
   and the T-director are drawn (were missing); the two "Pop Group" dishes
   beside the dome were not photographed and are replaced by the small
   radomes [USN, DN] show; the after house is 4.0 m a side with its raised
   fore block and roof gear as [USN].
   NOT CONFIRMED and drawn only as marked: the type names of the forward and
   after directors and the small radomes (drawn as photographed, not named);
   the mast's antennas (arrangement roughly as photographed); the underwater
   gear (three shafts are published; props, brackets and the two rudders
   are not photographed).  No hull numbers, names, ensigns or other marks.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The twin
   57 mm AK-725 is the group named "turret", origin on its training axis,
   barrels along +X at rest; everything else is baked, one mesh per
   material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroNanuchka = (function () {
  "use strict";
  var TAU = Math.PI * 2, L = 59.3, X1 = L / 2;
  function X(d) { return X1 - d; }       /* x at d metres abaft the stem head */

  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function tbl(T, d) {
    if (d <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (d <= T[i][0]) {
      var t = (d - T[i - 1][0]) / ((T[i][0] - T[i - 1][0]) || 1);
      return lerp(T[i - 1][1], T[i][1], t);
    }
    return T[T.length - 1][1];
  }

  /* ------------------------------------------------------------ geometry bins
     one bin per material; UVs box-mapped in metres off the face normal, so the
     plate and deck canvases land on every surface at true scale (16 m repeat) */
  var UVS = 1 / 16;
  function Bin(mat) { this.mat = mat; this.P = []; this.N = []; this.U = []; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f], i;
    var ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      this.P.push(v[i][0], v[i][1], v[i][2]); this.N.push(n[i][0], n[i][1], n[i][2]);
      if (az >= ax && az >= ay) this.U.push(v[i][0] * UVS, v[i][1] * UVS);
      else if (ay >= ax) this.U.push(v[i][0] * UVS, v[i][2] * UVS);
      else this.U.push(v[i][1] * UVS, v[i][2] * UVS);
    }
  };
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      var cc = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(cc, cc) < 1e-12) continue;
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function skin(bin, x0, x1, y0, y1, z) {
    bin.tri([x0, y0, z], [x1, y0, z], [x1, y1, z], [0, 0, 1], [0, 0, 1], [0, 0, 1]);
    bin.tri([x0, y0, z], [x1, y1, z], [x0, y1, z], [0, 0, 1], [0, 0, 1], [0, 0, 1]);
  }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function cyl(bin, A, B, r0, r1, seg) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    base = V.length; na = [-ax[0], -ax[1], -ax[2]];
    V.push(A, B); N.push(na, ax);
    rA = base + 2; rB = base + 2 + seg;
    for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
    for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    solid(bin, V, F, N);
  }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg || 10); }
  /* loft through rings of equal point count, flat-capped */
  function loft(bin, rings) {
    var n = rings[0].length, V = [], F = [], k, r, a, b, Lr;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n;
      F.push([a, b, b + n], [a, b + n, a + n]);
    }
    for (k = 1; k + 1 < n; k++) F.push([0, k + 1, k]);
    Lr = (rings.length - 1) * n;
    for (k = 1; k + 1 < n; k++) F.push([Lr, Lr + k, Lr + k + 1]);
    solid(bin, V, F);
  }
  /* dome / sphere cap with smooth normals; zs squashes it vertically */
  function dome(bin, cx, cy, cz, r, rings, seg, lo, zs) {
    var i, k, a0 = lo === undefined ? -Math.PI * 0.45 : lo, R = [], q = zs || 1;
    for (i = 0; i <= rings; i++) {
      var a = a0 + (Math.PI / 2 - a0) * i / rings, rr = Math.cos(a) * r, z = cz + Math.sin(a) * r * q, ring2 = [];
      if (i === rings) rr = 0.0001;
      for (k = 0; k < seg; k++) ring2.push([cx + rr * Math.cos(k / seg * TAU), cy + rr * Math.sin(k / seg * TAU), z]);
      R.push(ring2);
    }
    function nrm(P) { return unit([P[0] - cx, P[1] - cy, (P[2] - cz) / (q * q)]); }
    for (i = 0; i + 1 < R.length; i++) for (k = 0; k < seg; k++) {
      var j = (k + 1) % seg, A = R[i][k], B = R[i][j], C2 = R[i + 1][j], D2 = R[i + 1][k];
      bin.tri(A, B, C2, nrm(A), nrm(B), nrm(C2)); bin.tri(A, C2, D2, nrm(A), nrm(C2), nrm(D2));
    }
    var zb = R[0][0][2], cb = [cx, cy, zb];
    for (k = 0; k < seg; k++) bin.tri(cb, R[0][(k + 1) % seg], R[0][k], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
  }
  /* box in an oriented frame: origin P, axes u (along), v (across), w (up) */
  function obox(bin, P, u, v, w, a0, a1, b0, b1, c0, c1) {
    var V = [], A = [a0, a1], Bq = [b0, b1], Cq = [c0, c1], i, j, o = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
    for (i = 0; i < 8; i++) {
      j = o[i];
      V.push([P[0] + u[0] * A[j[0]] + v[0] * Bq[j[1]] + w[0] * Cq[j[2]],
              P[1] + u[1] * A[j[0]] + v[1] * Bq[j[1]] + w[1] * Cq[j[2]],
              P[2] + u[2] * A[j[0]] + v[2] * Bq[j[1]] + w[2] * Cq[j[2]]]);
    }
    hexa(bin, V);
  }
  function flush(THREE, group, B) {
    var k, b, geo, me;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      me = new THREE.Mesh(geo, b.mat); me.castShadow = true; me.receiveShadow = true;
      group.add(me);
    }
  }

  /* ------------------------------------------------------------ canvas paint */
  var TEX = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function canvasTex(THREE, key, draw) {
    if (TEX[key]) return TEX[key];
    if (typeof document === "undefined" || !document.createElement) return null;
    var cv = document.createElement("canvas"); cv.width = 512; cv.height = 512;
    var g = cv.getContext && cv.getContext("2d");
    if (!g) return null;
    draw(g, 512);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    TEX[key] = t;
    return t;
  }
  /* welded plating, 16 m square: strakes every 1.6 m, staggered butts, faint
     weathering and rust runs (the 1980s photographs show a worn finish) */
  function drawPlate(g, S) {
    var R = rng(1234), i, k, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.02 + R() * 0.04; g.fillStyle = R() < 0.55 ? "#7e878d" : "#ffffff";
      g.fillRect(R() * S, R() * S, (1 + R() * 4) * m, (0.4 + R() * 1.2) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 10; k++) {
      var y = Math.round(k * 1.6 * m);
      g.fillStyle = "rgba(60,68,74,0.30)"; g.fillRect(0, y, S, 1.5);
      g.fillStyle = "rgba(255,255,255,0.30)"; g.fillRect(0, y + 1.5, S, 1);
      for (i = 0; i < 4; i++) { var x = Math.round(((i * 4 + (k % 2) * 2) % 16) * m); g.fillStyle = "rgba(60,68,74,0.22)"; g.fillRect(x, y, 1.5, 1.6 * m); }
    }
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.05 + R() * 0.07; g.fillStyle = "#5d5048";
      g.fillRect(R() * S, R() * S, 0.12 * m, (0.6 + R() * 1.8) * m);
    }
    g.globalAlpha = 1;
  }
  /* red-brown deck: non-skid panels 2 x 4 m with their seams */
  function drawDeck(g, S) {
    var R = rng(1970), i, j, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 4; i++) for (j = 0; j < 8; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(i * 4 * m + 2, j * 2 * m + 2, 4 * m - 4, 2 * m - 4);
    }
    g.fillStyle = "rgba(40,30,28,0.32)";
    for (i = 0; i <= 4; i++) g.fillRect(i * 4 * m - 1, 0, 2, S);
    for (j = 0; j <= 8; j++) g.fillRect(0, j * 2 * m - 1, S, 2);
    for (i = 0; i < 40; i++) {
      g.globalAlpha = 0.04 + R() * 0.05; g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * S, R() * S, (0.5 + R() * 2) * m, (0.3 + R() * 1) * m);
    }
    g.globalAlpha = 1;
  }

  function materials(THREE, C) {
    var plate = canvasTex(THREE, "plate", drawPlate), deckT = canvasTex(THREE, "deck", drawDeck);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(0x717a81, 0.84, 0.08, plate),     /* hull sides: Soviet navy grey, a shade darker */
      sup: mk(0x7a838a, 0.82, 0.08, plate),      /* superstructure, bins, gun shield */
      deck: mk(0x8f584a, 0.95, 0.04, deckT),     /* red-brown weather decks */
      boot: mk(0x1c1d1f, 0.8, 0.05),             /* black boot topping */
      bott: mk(0x4c2621, 0.9, 0.04),             /* dark red bottom */
      light: mk(0x8a9298, 0.6, 0.06),            /* radomes, raft canisters, cover discs */
      dark: mk(0x25292c, 0.75, 0.3),             /* recesses, doors, sensor faces */
      metal: mk(0x4b5257, 0.5, 0.55),            /* rails, mast, barrels, shafts */
      glass: mk(0x141d24, 0.15, 0.4),
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }

  /* ------------------------------------------------------------ the hull: station table
     d = metres abaft the stem head.  ZD deck-edge height, HD deck-edge half-breadth, HW waterline
     half-breadth, KL keel.  Heights from [S83] (deck 3.2 m amidships, 4.7 m at the stem head), the
     plan from [USN] (fine entry, full from d 22, broad transom), the beam 11.8 m published, the
     raked stem and cut-away forefoot from [617]; draught 2.6 m published. */
  var H = {
    stemTop: 4.7, stemFoot: 3.3,
    ZD: [[0, 4.7], [2, 4.55], [5, 4.3], [8, 4.05], [12, 3.78], [16, 3.55], [21, 3.38], [27, 3.27], [40, 3.2], [59.3, 3.15]],
    HD: [[0, 0.1], [1, 0.75], [2.5, 1.6], [5, 2.8], [8, 3.85], [11, 4.6], [14, 5.15], [18, 5.6], [22, 5.85], [26, 5.9],
         [46, 5.9], [52, 5.75], [56, 5.45], [59.3, 5.05]],
    HW: [[3.3, 0.04], [5, 0.8], [8, 1.9], [11, 2.85], [14, 3.7], [18, 4.5], [22, 5.05], [27, 5.4], [34, 5.5],
         [46, 5.45], [52, 5.2], [56, 4.8], [59.3, 4.3]],
    KL: [[3.3, 0], [4.5, -0.7], [6.5, -1.4], [9, -1.9], [13, -2.3], [18, -2.55], [45, -2.6], [51, -2.35],
         [55.5, -1.8], [59.3, -1.0]]
  };
  function zD(d) { return tbl(H.ZD, d); }
  function hD(d) { return tbl(H.HD, d); }
  function zLow(d) {
    if (d < H.stemFoot) return H.stemTop * (1 - d / H.stemFoot) * (1 - 0.1 * Math.sin(Math.PI * d / H.stemFoot));
    return tbl(H.KL, d);
  }
  /* one section, deck centre first, then port to starboard over the keel: deck edge, flare
     shoulder, boot top, waterline, bilge, keel; the flare is convex where the deck overhangs */
  function ring(d) {
    var x = X(d), zd = zD(d), hd = hD(d), hw = d < H.stemFoot ? 0.04 : tbl(H.HW, d);
    var kl = zLow(d), P = [];
    function pt(y, z) {
      if (z < kl) { z = kl; y = Math.min(Math.abs(y), 0.06) * (y < 0 ? -1 : 1); }
      return [x, y, z];
    }
    var zf = zd * 0.55, hf = hw + (hd - hw) * 0.72, hb = hw + (hd - hw) * 0.07;
    P.push([x, 0, zd + 0.1 * clamp01(hd / 3)]);
    P.push(pt(hd, zd), pt(hf, zf), pt(hb, 0.45), pt(hw, 0), pt(hw * 0.93, kl * 0.5), pt(hw * 0.4, kl * 0.96));
    P.push(pt(-hw * 0.4, kl * 0.96), pt(-hw * 0.93, kl * 0.5), pt(-hw, 0), pt(-hb, 0.45), pt(-hf, zf), pt(-hd, zd));
    return P;
  }
  function addHull(B) {
    var ds = [0, 0.3, 0.7, 1.2, 1.8, 2.5, H.stemFoot, 4.0, 4.8, 5.8, 7, 8.5, 10, 11.5, 13, 14.5, 16, 18, 20, 22, 24,
              26.5, 30, 34, 38, 42, 46, 49, 52, 54, 56, 57.6, 58.7, 59.3], i, k, n = 13;
    var R = ds.map(ring);
    var TAG = ["deck", "hi", "hi", "boot", "bot", "bot", "bot", "bot", "bot", "boot", "hi", "hi", "deck"];
    function binFor(t) { return t === "deck" ? B.deck : t === "boot" ? B.boot : t === "bot" ? B.bott : B.hull; }
    for (i = 0; i + 1 < R.length; i++) {
      var A = R[i], Bq = R[i + 1];
      for (k = 0; k < n; k++) {
        var j = (k + 1) % n, bin = binFor(TAG[k]);
        var p = A[k], q = A[j], r = Bq[j], s = Bq[k];
        var c1 = cross(sub(q, p), sub(r, p));
        if (dot(c1, c1) > 1e-12) bin.tri(p, q, r);
        var c2 = cross(sub(r, p), sub(s, p));
        if (dot(c2, c2) > 1e-12) bin.tri(p, r, s);
      }
    }
    /* transom, faces aft */
    var T = R[R.length - 1];
    function fanAft(bin, idx) {
      for (k = 1; k + 1 < idx.length; k++) {
        var p0 = T[idx[0]], p1 = T[idx[k]], p2 = T[idx[k + 1]], cc = cross(sub(p1, p0), sub(p2, p0));
        if (dot(cc, cc) < 1e-12) continue;
        if (cc[0] < 0) bin.tri(p0, p1, p2); else bin.tri(p0, p2, p1);
      }
    }
    fanAft(B.hull, [0, 1, 2, 3, 10, 11, 12]);
    fanAft(B.boot, [3, 4, 9, 10]);
    fanAft(B.bott, [4, 5, 6, 7, 8, 9]);
  }

  /* a block on its own deck: raked/sloped ends and tumbling sides; d along, z0..z1, half-widths w0 (foot) w1 (top) */
  function tier(bin, roofBin, dF, dFt, dBt, dB, z0, z1, w0, w1, yc) {
    var y = yc || 0;
    hexa(bin, [[X(dB), y - w0, z0], [X(dF), y - w0, z0], [X(dF), y + w0, z0], [X(dB), y + w0, z0],
               [X(dBt), y - w1, z1], [X(dFt), y - w1, z1], [X(dFt), y + w1, z1], [X(dBt), y + w1, z1]]);
    if (roofBin) skin(roofBin, X(dBt) + 0.05, X(dFt) - 0.05, y - w1 + 0.05, y + w1 - 0.05, z1 + 0.012);
  }
  /* a house standing on the sheer: its foot follows the deck, roof level zt */
  function house(bin, roofBin, dF, dFt, dBt, dB, zt, w0, w1) {
    var rings = [], ds = [dF, dFt], d, i;
    for (d = Math.ceil(dFt + 0.5); d < dBt; d += 3) ds.push(d);
    ds.push(dBt, dB);
    for (i = 0; i < ds.length; i++) {
      d = ds[i];
      var x = X(d), zb = zD(d) - 0.05, top;
      if (d <= dFt) top = zb + (zt - zb) * clamp01((d - dF) / Math.max(dFt - dF, 0.01));
      else if (d >= dBt) top = zb + (zt - zb) * clamp01((dB - d) / Math.max(dB - dBt, 0.01));
      else top = zt;
      top = Math.max(top, zb + 0.02);
      var ww = w0, wt = lerp(w0, w1, clamp01((top - zb) / Math.max(zt - zb, 0.01)));
      rings.push([[x, -ww, zb], [x, ww, zb], [x, wt, top], [x, -wt, top]]);
    }
    loft(bin, rings);
    if (roofBin) skin(roofBin, X(dBt) + 0.05, X(dFt) - 0.05, -w1 + 0.05, w1 - 0.05, zt + 0.012);
  }

  /* a thin panel (door, port, window) on a tumbled wall; wall(z0, z1, w0, w1) gives its half-width at z */
  function wall(z0, z1, w0, w1) { return function (z) { return lerp(w0, w1, clamp01((z - z0) / (z1 - z0))); }; }
  function sidePanel(bin, d0, d1, z0, z1, w, s) {
    var a = w(z0), b = w(z1);
    hexa(bin, [[X(d1), s * (a - 0.02), z0], [X(d0), s * (a - 0.02), z0], [X(d0), s * (a + 0.035), z0], [X(d1), s * (a + 0.035), z0],
               [X(d1), s * (b - 0.02), z1], [X(d0), s * (b - 0.02), z1], [X(d0), s * (b + 0.035), z1], [X(d1), s * (b + 0.035), z1]]);
  }
  /* guard rails along both deck edges: posts every 1.5 m, a top rail */
  function rails(B, da, db, inset) {
    var s, d, h = 1.0;
    for (s = -1; s <= 1; s += 2) {
      for (d = da; d < db - 0.01; d += 1.5) {
        var dn = Math.min(d + 1.5, db), y0 = s * (hD(d) - (inset || 0.12)), y1 = s * (hD(dn) - (inset || 0.12));
        if (Math.abs(y0) < 0.3) continue;
        var z0 = zD(d), z1 = zD(dn);
        cyl(B.metal, [X(d), y0, z0 + h], [X(dn), y1, z1 + h], 0.025, 0.025, 3);
        box(B.metal, X(d) - 0.025, X(d) + 0.025, y0 - 0.025, y0 + 0.025, z0, z0 + h);
      }
    }
  }
  function roofRail(B, x0, x1, y0, y1, z) {
    var k, n, pts = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    for (k = 0; k < 4; k++) {
      var a = pts[k], b = pts[(k + 1) % 4];
      cyl(B.metal, [a[0], a[1], z + 0.9], [b[0], b[1], z + 0.9], 0.02, 0.02, 3);
      for (n = 0; n < 3; n++) {
        var px = lerp(a[0], b[0], n / 3), py = lerp(a[1], b[1], n / 3);
        box(B.metal, px - 0.02, px + 0.02, py - 0.02, py + 0.02, z, z + 0.9);
      }
    }
  }

  /* ------------------------------------------------------------ forecastle and stern fittings */
  function forecastle(B) {
    var s, d, z;
    /* Osa-M well cover, flush, 3.4 m across, with its hinge seam and centre boss [USN, DN] */
    d = 12.6; z = zD(d);
    cylZ(B.dark, X(d), 0, z - 0.05, z + 0.1, 1.78, 32);
    cylZ(B.light, X(d), 0, z + 0.1, z + 0.15, 1.62, 32);
    box(B.dark, X(d) - 1.6, X(d) + 1.6, -0.03, 0.03, z + 0.15, z + 0.17);
    cylZ(B.light, X(d), 0, z + 0.15, z + 0.3, 0.32, 12);
    /* windlass with its two gypsies, chain pipes, hawse pockets */
    d = 7.6; z = zD(d);
    box(B.sup, X(d) - 0.5, X(d) + 0.5, -0.65, 0.65, z - 0.02, z + 0.5);
    for (s = -1; s <= 1; s += 2) {
      cylY(B.dark, X(d) + 0.1, s * 0.7, s * 1.05, z + 0.32, 0.26, 10);
      cyl(B.metal, [X(d) + 0.6, s * 0.85, z + 0.05], [X(4.4), s * (hD(4.4) - 0.5), zD(4.4) + 0.05], 0.06, 0.06, 4);
      cylZ(B.dark, X(4.4), s * (hD(4.4) - 0.5), zD(4.4) - 0.03, zD(4.4) + 0.06, 0.2, 10);
      box(B.dark, X(3.9) - 0.5, X(3.9) + 0.5, s * (hD(3.9) - 0.05) - 0.18, s * (hD(3.9) - 0.05) + 0.18, zD(3.9) - 1.3, zD(3.9) - 0.65);
      /* bollards: forecastle, abreast the forward block, aft deck */
      var BD = [5.5, 15.5, 30.5, 52.0, 57.0];
      for (var i = 0; i < BD.length; i++) {
        d = BD[i];
        cylZ(B.metal, X(d), s * (hD(d) - 0.55), zD(d), zD(d) + 0.36, 0.12, 8);
        cylZ(B.metal, X(d + 0.55), s * (hD(d) - 0.55), zD(d), zD(d) + 0.36, 0.12, 8);
      }
    }
    cyl(B.metal, [X(0.4), 0, zD(0.4) + 0.08], [X(0.4), 0, zD(0.4) + 2.4], 0.045, 0.025, 6);   /* jack staff (no flag) */
    cyl(B.metal, [X(58.9), 0, zD(58.9)], [X(58.9), 0, zD(58.9) + 3.2], 0.05, 0.025, 6);       /* ensign staff (no ensign) */
    /* scuttles along the forward topsides [S83, 617] */
    for (s = -1; s <= 1; s += 2) for (d = 7; d < 33; d += 2.6) {
      var y = s * (hD(d) - (hD(d) - tbl(H.HW, d)) * 0.25 + 0.02);
      box(B.dark, X(d) - 0.17, X(d) + 0.17, y - 0.03, y + 0.03, zD(d) - 1.25, zD(d) - 0.95);
    }
  }

  /* one triple P-120 bin: rear lower end at P, laid along u (nose up), three tubes,
     two below and one above [555]; domed end caps, three hoops, a cradle */
  function bin(B, P, el, side) {
    var u = [Math.cos(el), 0, Math.sin(el)], v = [0, 1, 0], w = [-Math.sin(el), 0, Math.cos(el)];
    var Lb = 10.4, r = 0.7, T = [[-0.72, 0.7], [0.72, 0.7], [0.1 * side * -1, 1.92]], i, k;
    function at(a, b, c) { return [P[0] + u[0] * a + v[0] * b + w[0] * c, P[1] + v[1] * b, P[2] + u[2] * a + w[2] * c]; }
    for (i = 0; i < 3; i++) {
      var tb = T[i][0], tc = T[i][1];
      cyl(B.sup, at(0.25, tb, tc), at(Lb - 0.35, tb, tc), r, r, 16);
      /* the domed front cover */
      var F0 = at(Lb - 0.35, tb, tc), F1 = at(Lb, tb, tc);
      cyl(B.sup, F0, at(Lb - 0.12, tb, tc), r, r * 0.86, 16);
      cyl(B.sup, at(Lb - 0.12, tb, tc), F1, r * 0.86, r * 0.45, 16);
      cyl(B.dark, at(Lb - 0.37, tb, tc), at(Lb - 0.33, tb, tc), r + 0.02, r + 0.02, 16);
      /* rear end plate and hoops */
      cyl(B.metal, at(0.0, tb, tc), at(0.25, tb, tc), r + 0.04, r + 0.04, 16);
      for (k = 0; k < 2; k++) cyl(B.metal, at(3.2 + k * 3.6, tb, tc), at(3.36 + k * 3.6, tb, tc), r + 0.04, r + 0.04, 16);
    }
    /* web plates between the tubes and a keel beam under the pair */
    obox(B.sup, P, u, v, w, 0.3, Lb - 0.5, -0.7, 0.7, 0.6, 1.9);
    obox(B.sup, P, u, v, w, 0.2, Lb - 0.6, -1.3, 1.3, -0.12, 0.3);
  }
  function launchers(B) {
    var s, el = 0.175;             /* about 10 deg, nose up [USN, DN] */
    for (s = -1; s <= 1; s += 2) {
      var yc = s * 4.45, P = [X(28.6), yc, 3.62];
      bin(B, P, el, s);
      /* cradle: rear pedestal and the sloped front support off the deck [DN] */
      box(B.sup, X(28.4), X(26.6), yc - 1.1, yc + 1.1, zD(27.5) - 0.05, 3.62 + 0.32);
      var zf = 3.62 + Math.sin(el) * 8.2 - 0.05;
      hexa(B.sup, [[X(22.0), yc - 1.0, zD(21) - 0.05], [X(19.4), yc - 1.0, zD(20) - 0.05], [X(19.4), yc + 1.0, zD(20) - 0.05], [X(22.0), yc + 1.0, zD(21) - 0.05],
                   [X(21.2), yc - 0.95, zf], [X(20.0), yc - 0.95, zf + 0.15], [X(20.0), yc + 0.95, zf + 0.15], [X(21.2), yc + 0.95, zf]]);
    }
  }

  /* ------------------------------------------------------------ superstructure */
  function forwardBlock(B) {
    /* sloped-sided block d 14.4-19.4 to 7.2 m [USN, DN, S83] */
    tier(B.sup, B.deck, 14.3, 15.9, 19.6, 19.6, zD(15) - 0.05, 7.6, 3.05, 2.3);
    /* doors on its sloped sides */
    var s;
    for (s = -1; s <= 1; s += 2) sidePanel(B.dark, 17.6, 18.6, 3.9, 5.6, wall(zD(15) - 0.05, 7.6, 3.05, 2.3), s);
    /* director on the roof: column, head, small dish (covered in [S83]) */
    var xd = X(17.0);
    cylZ(B.sup, xd, 0, 7.6, 8.25, 0.38, 12);
    box(B.sup, xd - 0.55, xd + 0.5, -0.5, 0.5, 8.25, 8.95);
    cyl(B.dark, [xd + 0.5, 0, 8.6], [xd + 0.62, 0, 8.6], 0.42, 0.42, 14);
    box(B.metal, xd - 0.2, xd + 0.2, -0.75, 0.75, 8.95, 9.02);
    roofRail(B, X(19.3), X(16.2), -2.15, 2.15, 7.6);
  }
  function bridge(B) {
    var s, j;
    /* main house (01 level) under the bridge and the dome, d 19.4-33.6, roof 5.8 */
    house(B.sup, B.deck, 19.4, 19.5, 33.4, 33.6, 5.8, 2.95, 2.9);
    /* bridge lower level d 19.9-28.4 to 7.8, open front platform with a rail */
    tier(B.sup, B.deck, 19.9, 20.3, 30.4, 30.7, 5.79, 7.8, 2.85, 2.75);
    roofRail(B, X(21.6), X(20.4), -2.65, 2.65, 7.8);
    /* wheelhouse set back, raked front, window band 8.75-9.45, roof 9.9 [DN, S83] */
    tier(B.sup, B.deck, 21.4, 22.2, 30.0, 30.3, 7.79, 9.9, 2.6, 2.4);
    var f = function (z) { return (z - 7.79) / (9.9 - 7.79); };
    var xa = X(lerp(21.4, 22.2, f(8.75))) + 0.03, xb = X(lerp(21.4, 22.2, f(9.45))) + 0.03;
    for (j = 0; j < 6; j++) {
      var ya = -2.1 + j * 0.71, yb = ya + 0.61;
      hexa(B.glass, [[xa - 0.07, ya, 8.75], [xa + 0.02, ya, 8.75], [xa + 0.02, yb, 8.75], [xa - 0.07, yb, 8.75],
                     [xb - 0.07, ya, 9.45], [xb + 0.02, ya, 9.45], [xb + 0.02, yb, 9.45], [xb - 0.07, yb, 9.45]]);
    }
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 5; j++) sidePanel(B.glass, 23.0 + j * 1.05, 23.8 + j * 1.05, 8.75, 9.4, wall(7.79, 9.9, 2.6, 2.4), s);
      sidePanel(B.dark, 29.0, 29.9, 5.85, 7.5, wall(5.79, 7.8, 2.85, 2.75), s);       /* doors */
      sidePanel(B.dark, 31.0, 31.9, 3.6, 5.4, wall(zD(31.5), 5.8, 2.95, 2.9), s);
      /* bridge wings on the lower level's roof edge */
      box(B.sup, X(23.6), X(21.9), s * 2.7, s * 3.25, 7.7, 7.82);
      cyl(B.metal, [X(23.6), s * 3.25, 8.7], [X(21.9), s * 3.25, 8.7], 0.02, 0.02, 3);
    }
    /* T-shaped director on the wheelhouse roof ahead of the dome [DN, USN] */
    var xt = X(24.4);
    cylZ(B.sup, xt, 0, 9.9, 10.75, 0.24, 10);
    box(B.sup, xt - 0.35, xt + 0.35, -0.35, 0.35, 10.75, 11.15);
    cylY(B.sup, xt, -1.0, 1.0, 11.0, 0.13, 8);
    for (s = -1; s <= 1; s += 2) cylX(B.sup, xt - 0.3, xt + 0.35, s * 1.05, 11.0, 0.24, 0.24, 12);
    roofRail(B, X(26.4), X(22.6), -2.35, 2.35, 9.9);
    /* the Band Stand on the wheelhouse roof: pedestal to 10.9, drum r 1.65 to 12.75, hemisphere to 14.4 */
    var xc = X(28.5);
    cylZ(B.sup, xc, 0, 9.88, 10.9, 1.4, 24);
    cylZ(B.dark, xc, 0, 10.88, 10.98, 1.62, 32);
    cylZ(B.light, xc, 0, 10.98, 12.75, 1.65, 32);
    dome(B.light, xc, 0, 12.75, 1.65, 9, 32, 0);
    /* small radome on a column each side at its foot [USN starboard, DN port] */
    for (s = -1; s <= 1; s += 2) {
      var xr = X(29.4), yr = s * 2.95;
      cylZ(B.sup, xr, yr, 7.79, 9.55, 0.4, 12);
      box(B.sup, xr - 0.3, xr + 0.3, s * 2.4, s * 2.7, 8.6, 9.0);
      cylZ(B.light, xr, yr, 9.55, 9.95, 0.6, 18);
      dome(B.light, xr, yr, 9.95, 0.6, 5, 18, 0);
    }
  }
  /* four-leg lattice mast d 32.8 from the 01 roof (5.8) to 19.7 m [all] */
  function mast(B) {
    var xm = X(32.8), z0 = 5.8, z1 = 17.6, nb = 8, s, b, lg;
    var ax0 = 1.15, ay0 = 1.35, a1 = 0.34;
    function leg(f, sx, sy) { return [xm + sx * lerp(ax0, a1, f), sy * lerp(ay0, a1, f), lerp(z0, z1, f)]; }
    for (lg = 0; lg < 4; lg++) {
      var sx = lg < 2 ? -1 : 1, sy = (lg % 2) ? -1 : 1;
      cyl(B.metal, leg(0, sx, sy), leg(1, sx, sy), 0.085, 0.06, 6);
    }
    for (b = 0; b < nb; b++) {
      var f0 = b / nb, f1 = (b + 1) / nb;
      for (s = -1; s <= 1; s += 2) {
        cyl(B.metal, leg(f0, -1, s), leg(f1, 1, s), 0.03, 0.03, 3);
        cyl(B.metal, leg(f0, s, -1), leg(f1, s, 1), 0.03, 0.03, 3);
        cyl(B.metal, leg(f1, -1, s), leg(f1, 1, s), 0.028, 0.028, 3);
        cyl(B.metal, leg(f1, s, -1), leg(f1, s, 1), 0.028, 0.028, 3);
      }
    }
    /* platform at 12.4 with a rail; the wide yard at 15.4 with its dipoles; head platform */
    box(B.sup, xm - 1.1, xm + 1.1, -1.25, 1.25, 12.3, 12.4);
    roofRail(B, xm - 1.1, xm + 1.1, -1.25, 1.25, 12.4);
    box(B.metal, xm - 0.07, xm + 0.07, -2.3, 2.3, 15.35, 15.45);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.metal, xm, s * 2.1, 14.7, 15.35, 0.03, 4);
      cylZ(B.metal, xm, s * 1.4, 14.8, 15.35, 0.03, 4);
      box(B.dark, xm - 0.15, xm + 0.15, s * 0.9 - 0.15, s * 0.9 + 0.15, 15.45, 15.8);
    }
    /* forward spur with a lamp/antenna box [USN] */
    cyl(B.metal, [xm + 0.5, 0, 13.6], [xm + 1.8, 0, 14.2], 0.04, 0.04, 4);
    box(B.dark, xm + 1.65, xm + 1.95, -0.15, 0.15, 14.05, 14.45);
    box(B.sup, xm - 0.6, xm + 0.6, -0.7, 0.7, 17.55, 17.65);
    /* the antenna at the head: a small slotted array on a turning base [USN, S83] */
    cylZ(B.metal, xm, 0, 17.65, 18.25, 0.18, 8);
    box(B.sup, xm - 0.22, xm + 0.22, -1.1, 1.1, 18.25, 18.75);
    box(B.dark, xm + 0.22, xm + 0.25, -1.0, 1.0, 18.3, 18.7);
    cyl(B.metal, [xm, 0, 18.75], [xm, 0, 19.7], 0.045, 0.025, 5);
    box(B.metal, xm - 0.03, xm + 0.03, -0.8, 0.8, 19.2, 19.25);
  }
  function afterHouse(B) {
    var s, j;
    /* the long low house d 33.4-50.8, roof 5.7 [USN, DN, S83] */
    house(B.sup, B.deck, 33.3, 33.4, 50.5, 50.8, 5.75, 4.0, 3.85);
    /* raised sloped-sided block at its fore end, d 34.2-40.0 to 7.3 [USN] */
    tier(B.sup, B.deck, 34.1, 34.9, 39.2, 40.1, 5.74, 7.6, 3.7, 2.2);
    /* roof gear: two long boxes, raft canisters, ventilators [USN, DN] */
    tier(B.sup, B.deck, 40.7, 40.8, 43.8, 43.9, 5.74, 6.65, 1.75, 1.7);
    tier(B.sup, B.deck, 44.3, 44.4, 47.3, 47.4, 5.74, 6.55, 1.5, 1.45);
    box(B.dark, X(43.6), X(41.0), -1.72, 1.72, 6.4, 6.42);
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 2; j++) cylX(B.light, X(46.3), X(44.7), s * (2.55 + j * 0.72), 6.1, 0.32, 0.32, 12);
      box(B.sup, X(46.6), X(44.4), s * 2.2, s * 3.6, 5.74, 5.82);
      box(B.sup, X(38.5), X(37.5), s * 3.55, s * 3.95, 5.74, 6.4);
      /* doors and ports on the house sides */
      var wa = wall(3.15, 5.75, 4.0, 3.85);
      sidePanel(B.dark, 41.3, 42.2, 3.5, 5.3, wa, s);
      for (j = 0; j < 4; j++) sidePanel(B.dark, 44.0 + j * 1.5, 44.35 + j * 1.5, 4.4, 4.75, wa, s);
      sidePanel(B.dark, 35.5, 36.4, 3.5, 5.3, wa, s);
    }
    /* gun director on its pedestal at the after end, d 48.8: a drum with a round face [DN] */
    var xd = X(48.8);
    tier(B.sup, null, 48.1, 48.2, 49.4, 49.5, 5.74, 7.05, 0.6, 0.5);
    cylY(B.sup, xd, -0.6, 0.6, 7.55, 0.52, 16);
    cylX(B.dark, xd + 0.45, xd + 0.62, 0, 7.55, 0.42, 0.42, 16);
    box(B.sup, xd - 0.5, xd - 0.2, -0.35, 0.35, 7.0, 7.25);
    cyl(B.metal, [xd - 0.2, 0.4, 7.9], [xd - 0.2, 0.4, 9.0], 0.025, 0.015, 4);
    roofRail(B, X(50.4), X(47.8), -3.6, 3.6, 5.75);
    /* the short pole mast just abaft the director [DN] */
    var xq = X(49.9);
    cyl(B.metal, [xq, 0, 5.75], [xq, 0, 10.2], 0.07, 0.04, 6);
    box(B.metal, xq - 0.03, xq + 0.03, -1.0, 1.0, 9.5, 9.56);
    /* ventilator cowls on the raised block [USN] */
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.sup, X(37.0), s * 1.2, 7.55, 8.05, 0.28, 10);
      cylZ(B.dark, X(37.0), s * 1.2, 8.05, 8.08, 0.22, 10);
    }
  }
  /* underwater: three shafts, brackets and props (published three shafts), two rudders (NOT CONFIRMED) */
  function running(B) {
    var sy = [-2.7, 0, 2.7], i, k, s;
    for (i = 0; i < 3; i++) {
      s = sy[i];
      var zs = s === 0 ? -1.75 : -1.6, xa = X(i === 1 ? 50.5 : 47.5), xp = X(57.6);
      cyl(B.metal, [xa, s * 0.8, zs + 0.5], [xp, s, zs], 0.13, 0.13, 8);
      cylX(B.metal, xp - 0.45, xp, s, zs, 0.18, 0.28, 10);
      if (s !== 0) cyl(B.metal, [xp + 0.8, s, zs], [xp + 0.8, s * 0.75, tbl(H.KL, 56.5) * 0.4], 0.07, 0.07, 4);
      for (k = 0; k < 4; k++) {
        var a = k / 4 * TAU + 0.3;
        obox(B.metal, [xp - 0.2, s, zs], [1, 0, 0], [0, Math.cos(a), Math.sin(a)], [0, -Math.sin(a), Math.cos(a)],
             -0.12, 0.12, 0.2, 0.84, -0.25, 0.25);
      }
    }
    for (s = -1; s <= 1; s += 2) hexa(B.metal, [[X(59.1), s * 1.35 - 0.08, -2.3], [X(57.8), s * 1.35 - 0.08, -2.3], [X(57.8), s * 1.35 + 0.08, -2.3], [X(59.1), s * 1.35 + 0.08, -2.3],
                                               [X(59.1), s * 1.35 - 0.08, -0.85], [X(57.6), s * 1.35 - 0.08, -0.85], [X(57.6), s * 1.35 + 0.08, -0.85], [X(59.1), s * 1.35 + 0.08, -0.85]]);
  }

  /* ------------------------------------------------------------ the AK-725 (group "turret", origin on the axis)
     round shield with a squashed dome roof, flat-faced front with the two embrasures, 57 mm L/75 barrels */
  var TD = 53.7, BARB = 0.35;
  function addTurret(B) {
    var s;
    cylZ(B.dark, 0, 0, -0.02, 0.1, 1.42, 24);
    cylZ(B.sup, 0, 0, 0.1, 1.2, 1.32, 24);
    dome(B.sup, 0, 0, 1.2, 1.32, 6, 24, 0, 0.5);
    /* flattened front with the gun ports */
    hexa(B.sup, [[0.8, -0.95, 0.15], [1.42, -0.8, 0.15], [1.42, 0.8, 0.15], [0.8, 0.95, 0.15],
                 [0.75, -0.85, 1.55], [1.25, -0.7, 1.45], [1.25, 0.7, 1.45], [0.75, 0.85, 1.55]]);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 1.3, 1.46, s * 0.4 - 0.2, s * 0.4 + 0.2, 0.75, 1.3);
      cylX(B.sup, 1.3, 1.85, s * 0.4, 1.02, 0.14, 0.12, 10);
      cylX(B.metal, 1.8, 4.6, s * 0.4, 1.02, 0.055, 0.05, 8);
      cylX(B.dark, 4.5, 4.85, s * 0.4, 1.02, 0.085, 0.085, 8);
    }
    /* sight hoods and a rear hatch box */
    box(B.sup, 0.1, 0.55, 0.5, 0.85, 1.6, 1.85);
    box(B.dark, 0.5, 0.56, 0.55, 0.8, 1.64, 1.8);
    box(B.sup, -1.55, -0.95, -0.6, 0.6, 0.3, 1.1);
  }

  function bins(T, names) { var o = {}; names.forEach(function (n) { o[n] = new Bin(T[n]); }); return o; }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group();
    var B = bins(T, ["hull", "sup", "deck", "boot", "bott", "light", "dark", "metal", "glass", "team"]);
    addHull(B);
    forecastle(B);
    forwardBlock(B);
    launchers(B);
    bridge(B);
    mast(B);
    afterHouse(B);
    running(B);
    rails(B, 1.0, 14.0);
    rails(B, 14.0, 50.5, 0.12);
    rails(B, 50.5, 59.0);
    /* gun barbette on the stern deck */
    var zg = zD(TD);
    cylZ(B.sup, X(TD), 0, zg - 0.05, zg + BARB, 1.55, 28);
    /* team colour, modest: the wheelhouse roof and the after house roof */
    box(B.team, X(26.2), X(25.1), -0.8, 0.8, 9.91, 9.93);
    box(B.team, X(43.0), X(41.6), -0.8, 0.8, 6.66, 6.68);
    flush(THREE, g, B);
    var TB = { sup: new Bin(T.sup), dark: new Bin(T.dark), metal: new Bin(T.metal) };
    addTurret(TB);
    var tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(X(TD), 0, zg + BARB);
    flush(THREE, tw, TB);
    g.add(tw);
    return g;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e80_corvette"] = {
  len: 59.3,
  build: function (THREE, M, C) { return HeroNanuchka.build(THREE, M, C); }
};
