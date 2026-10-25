/* ============ ru_whiskey.js -- HERO model: Project 613 Whiskey (pact_e50_sub) ============
   Soviet medium diesel-electric submarine, 215 built 1951-57. Full-quality redo, 2026-10-24.
   One row, one key: pact_e50_sub "Project 613 Whiskey" (eras.js, service 1951, e50 only);
   sub_specs.js gives 76 m, beam 6.3 m, two screws, deckGun:true ("twin 57 mm on the casing").
   No other file reads this key or HeroWhiskey613 (grep of js/, tools/ and the html).

   VARIANT: the boat as built in 1951-56, with her guns -- ru-wiki: a twin 57 mm SM-24-ZiF and
   a twin 25 mm 2M-8, both removed from 1956 (NATO "Whiskey II" fit). Drawn after the lead
   Leningrad boat S-61 as the Commons drawing shows her. The later gunless boats (Whiskey V,
   S-363 aground in Sweden 1981, the S-189 museum boat) are NOT drawn: their lower, rounded
   fin and lack of guns belong to a later row this key does not cover.

   References (Wikimedia Commons at width 960, cached in scratchpad/q_whiskey_ref):
     d1     "Whiskey I class SS.svg": colour side elevation of S-61, bow right (starboard side).
            THE source for every station: 957 px over the 76.0 m (12.592 px/m). Waterline taken
            at row 154 (the drawn boot line runs from row 150 aft to 158 forward); casing top
            row 133 = 1.67 m over it, keel row 212 = 4.6 m under it (published draught 4.55 m).
            It draws the 57 mm twin ABAFT the fin, its barrels laid aft, and the 25 mm twin in
            the low forward step of the fin, barrels over-under, out through its front.
     d5     "Whiskey V class SS.svg" (S-189): the same hull, stern and bow -- confirms the hull
            lines; its fin is the later one and is not used.
     p_pb   "A port bow view of a Soviet Whiskey class patrol submarine underway" (US Navy):
            the long narrow hull, flat casing deck, rows of free-flood holes, the posts and
            jackstay wires at the ends, the blunt round bow; dark paint.
     p_u64, p_sh3  US Navy, Pacific c1964: the long low hull awash, dark paint.
     p_pol  "Polski op proj.613.jpg", p_kon "ORP Kondor(1955).jpg" (Polish 613s): the casing
            posts and wires, the hole rows (p_kon: the long row high in the casing side seen
            from above), mid-dark grey paint with a lighter fin in sun.
     p_363, p_363b  S-363 aground at Karlskrona, 1981 (colour and b/w): dark grey paint, the
            round bow, the casing hole rows, the free-flood slots at the fin foot.
     p_bm1, p_bm2  Balaklava museum model of a 613: the stern planes behind the screws at
            shaft height, the keel drop and light panel under the forward keel, the step in
            the keel at its fore end, red anti-fouling. (Its bright red/black is model paint.)
     ru-wiki "Podvodnye lodki proekta 613": 1951-57, 215 built; 4 bow + 2 stern 533 mm tubes;
            rescue buoys over compartments 1 and 7; the guns and their 1956 removal.

   Recognition list (each one shows on the final sheets):
     1 the long narrow cigar, 76 x 6.3 m, flat casing deck 1.67 m over the waterline, the keel
       straight from the stern to the bow forefoot (d1 TOP/KEEL tables; p_pb, p_363).
     2 the knife stern: the hull keeps its depth to the end and narrows in plan to a blade,
       the counter over a tall rudder, the sole piece under it (d1; p_bm2).
     3 two screws on long lens-shaped shaft bossings, the stern planes behind them at shaft
       height (d1 rows 175-187; p_bm2).
     4 the round bow, the deck carried to a rounded nose over a raked stem, two bow-tube
       shutters a side (4 bow tubes, ru-wiki), the folding bow plane lying up against the
       side under its slot (d1).
     5 the keel drop forward with its light-grey panel and the step at its fore end (d1; p_bm1).
     6 the fin as drawn: tall after block with an after edge raked slightly forward, the low
       round-fronted forward step, the flared bridge front, the bridge front box, the shear
       housing, guard rails, the free-flood slots at its foot, the ladder (d1).
     7 the twin 57 mm SM-24-ZiF on its pedestal abaft the fin, barrels laid aft (d1; ru-wiki).
     8 the twin 25 mm 2M-8 in the forward step, barrels over-under through its front (d1).
     9 the masts as drawn: raked aerial mast, the DF loop, the dome-headed mast, the tall
       periscope, the snorkel head with its two pipes, three slim masts (d1).
    10 the rows of free-flood holes along the casing side (d1 columns, both sides; p_pb,
       p_kon, p_363) and the grated openings low on the hull (d1, painted).
    11 the casing posts, the stern and bow staffs and the jackstay wires (d1; p_pb, p_pol);
       the two rescue buoys fore and aft (d1; ru-wiki); bollards.
    12 paint: dark grey above the boot line, red-brown anti-fouling under it (d1 boot line;
       p_363, p_kon, p_pb), light-grey keel panel (d1).

   Paint, sampled and taken to about 0.7-0.85 of level: dark grey 0x46494c (p_363 hull with
   its blue film cast removed, about (60,62,66); the b/w period photos read mid-dark grey,
   lighter than the Foxtrot's black); red-brown 0x48281a (d1 (85,46,30) at 0.85); keel panel
   0x6e6c6a (d1 (150,145,140) at 0.75); casing deck 0x3e4042. Followed: the period paint of a
   Soviet boat (dark grey over red-brown). NOT followed: the drawing's light grey (an artist's
   colour), the S-189 museum light grey and green boot top, the Balaklava model's red/black.

   Waterline and the game: z = 0 is the drawing's mean waterline; render3d draws a submarine
   at a fixed datum and scales it by len, so the casing runs awash and the fin, guns and masts
   stand clear.
   Not confirmed, and so drawn plainly or not at all:
     - the hull plan (no plan drawing): beam 6.3 m (sub_specs, en-wiki) at 0.8 m under the
       waterline, the casing deck 2.3 m wide, a long knife run aft and a full round bow;
     - the fin plan: 2.9 m wide, round-fronted forward step (side view only);
     - the shaft spacing (+-1.5 m) and the stern-plane span (to +-2.9 m): side view only;
     - screws as drawn 1.67 m across, four blades (not countable in any source);
     - the grated oval on the after flank (d1 columns 234-262): drawn as drawn, both sides
       (only the starboard side is drawn), purpose not confirmed;
     - the anchor recess (d1, starboard bow): the port side is not seen, not drawn;
     - sub_specs.js calls the stern "cruciform": d1 and the Balaklava model show a single
       rudder under the counter and horizontal planes behind the screws, no upper fin --
       the drawing is followed (data mismatch reported, not edited).
   No hull number, name, flag, star, ensign or text (d1's "C-61" is not drawn).

   Model space: +X bow, +Y port, +Z up, metres; waterline z = 0. render3d scales a submarine by
   UNIT_MODELS[key].len (the true 76 m) and reads no named node of it; the row is not
   turret:true, so nothing is named "turret". Merged per material (one draw call each).
   ASCII only in code. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroWhiskey613 = (function () {
  "use strict";

  var PI = Math.PI;
  var L = 76.0;                     /* stern tip (u = 0) to bow tip (u = L) */
  var PXM = 957 / 76.0;             /* drawing px per metre (12.592) */
  var WLY = 154;                    /* drawing row of the mean waterline */
  var BEAM = 3.15;                  /* half of the published 6.3 m */
  var DECK = 1.15;                  /* half-width of the casing deck amidships */

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function U(x) { return (x - 1) / PXM; }          /* drawing column -> metres from the stern */
  function Z(y) { return (WLY - y) / PXM; }        /* drawing row -> metres over the waterline */
  function X(u) { return u - L / 2; }              /* metres from the stern -> model x */

  /* profile tables in drawing px [column, row], read off d1 column by column */
  var TOPPX = [[1, 154], [2, 152], [3, 150], [4, 149], [8, 147], [16, 144], [25, 143], [40, 142],
    [50, 141], [60, 139.5], [100, 138], [150, 136], [200, 134], [250, 133], [940, 133], [945, 134],
    [948, 134.8], [952, 135.5], [954, 136], [956, 137], [957, 139], [958, 141]];
  var KEELPX = [[36, 209], [50, 210], [150, 211], [250, 212], [700, 212], [720, 213], [750, 215],
    [780, 218], [800, 219], [815, 218.5], [819, 214], [821, 204], [823, 199.5], [870, 197],
    [900, 196], [930, 194], [935, 192], [940, 189], [945, 185], [948, 181], [950, 176], [952, 170],
    [954, 164], [956, 157], [957, 153], [958, 148]];
  /* the stem: forward-most column per row, top of the nose down to the forefoot */
  var STEMPX = [[133, 940], [134, 945], [135, 950], [136, 954], [137, 956], [139, 957], [141, 958],
    [148, 958], [153, 957], [157, 956], [164, 954], [170, 952], [176, 950], [181, 948], [185, 945],
    [189, 940], [192, 935], [194, 930], [196, 900], [197, 870], [199, 826], [200, 823.5], [220, 823.5]];
  function mk(tab, fx, fy) { return tab.map(function (p) { return [fx(p[0]), fy(p[1])]; }); }
  var TOP = mk(TOPPX, U, Z), KEEL = mk(KEELPX, U, Z);
  var STEM = mk(STEMPX, Z, U).reverse();            /* [z, u] by rising z */
  function lerpTab(t, a) {
    var i;
    if (a <= t[0][0]) return t[0][1];
    for (i = 1; i < t.length; i++) if (a <= t[i][0]) {
      var p = t[i - 1], q = t[i]; return p[1] + (q[1] - p[1]) * (a - p[0]) / (q[0] - p[0]);
    }
    return t[t.length - 1][1];
  }
  var UAP = U(34);                                  /* the rudder post: the counter ends here */
  function zTop(u) { return lerpTab(TOP, u); }
  function zKeel(u) {
    if (u < UAP) return Z(163.5);                   /* the counter bottom over the rudder (d1) */
    return lerpTab(KEEL, u);
  }
  function xStem(z) { return lerpTab(STEM, z); }

  /* plan: a long knife run aft (the hull keeps its depth, d1; p_bm2) and a full round bow */
  function planAft(u) { return u >= 26 ? 1 : Math.max(0.06, 1 - Math.pow((26 - u) / 26, 1.4)); }
  function planBow(u, z) {
    var u0 = 60 + 6 * clamp((z + 3) / 4.5, 0, 1);
    if (u <= u0) return 1;
    var p = 1.6 + 0.9 * clamp((z + 4) / 5.5, 0, 1), r = clamp((u - u0) / (xStem(z) - u0), 0, 1);
    return Math.max(0.004, Math.pow(1 - Math.pow(r, p), 1 / p));
  }

  /* port half-section at station u, keel -> side -> deck edge -> deck centre, as [y, z] */
  var NL = 9, NU = 8;
  function section(u) {
    var zt = zTop(u), zk = zKeel(u), zkb = Math.max(zk, Z(212.5)), zb = zkb + 0.6 * (zt - zkb);
    var fa = planAft(u);
    var pts = [], k, t, y, z;
    for (k = 0; k <= NL; k++) {
      t = (PI / 2) * (1 - k / NL);
      y = BEAM * Math.pow(Math.cos(t), 2 / 2.2); z = zb - (zb - zk) * Math.pow(Math.sin(t), 2 / 2.2);
      pts.push([y, z]);
    }
    for (k = 1; k <= NU; k++) {
      t = (PI / 2) * (k / NU);
      y = DECK + (BEAM - DECK) * Math.pow(Math.cos(t), 2 / 2.1); z = zb + (zt - zb) * Math.pow(Math.sin(t), 2 / 2.1);
      pts.push([y, z]);
    }
    pts.push([DECK * 0.5, zt], [0, zt]);
    for (k = 0; k < pts.length; k++) pts[k][0] *= fa * planBow(u, pts[k][1]);
    return pts;
  }
  /* half-width of the hull at height z, and the outward normal's tilt there (side part only) */
  function hullY(u, z) {
    var s = section(u), k;
    for (k = 1; k < s.length - 2; k++) {
      var a = s[k - 1], b = s[k];
      if ((z - a[1]) * (z - b[1]) <= 0 && a[1] !== b[1]) return a[0] + (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]);
    }
    return 0;
  }
  function hullNA(u, z) {
    var y0 = hullY(u, z - 0.1), y1 = hullY(u, z + 0.1);
    return Math.atan2(y0 - y1, 0.2);               /* rotation about x of a face lying on the side */
  }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function hex(c) { var s = c.toString(16); while (s.length < 6) s = "0" + s; return "#" + s; }

  var PAINT = { hull: 0x46494c, below: 0x48281a, panel: 0x6e6c6a, deck: 0x3e4042 };

  /* grated openings low on the hull, painted: [first col, last col, top row, bottom row] (d1) */
  var GRATES = [[61, 112, 200, 207], [123, 173, 166, 172], [257, 300, 186, 197], [391, 473, 187, 195],
    [600, 640, 184, 190], [640, 680, 181, 187], [660, 689, 180, 185], [705, 756, 202, 210],
    [735, 822, 168, 174], [808, 829, 188, 198], [832, 900, 193, 198], [742, 837, 150, 155]];

  /* ---------------------------------------------------------------- hull canvas
     u = metres from the stern / L; v by height: port rows run keel (v 0, z -5.3) to the top
     (v 0.5, z +1.9), starboard mirrors it -- so each row is one height. */
  var ZLO = -5.3, ZHI = 1.9;
  function vOf(z, port) { var v = clamp((z - ZLO) / (ZHI - ZLO), 0, 1) * 0.5; return port ? v : 1 - v; }
  var _tex = null;
  function hullTex(THREE) {
    if (_tex) return _tex;
    var W = 1024, H = 512, cv = cvs(W, H), g = cv.getContext("2d"), R1 = rng(6131), i, r, k;
    function rowOf(z) { return (1 - vOf(z, true)) * H; }       /* port half, canvas rows */
    function colOf(px) { return U(px) / L * W; }
    function rect(c0, c1, z1, z0, col) {                         /* both halves */
      var a = rowOf(z1), b = rowOf(z0);
      g.fillStyle = col; g.fillRect(c0, a, c1 - c0, b - a); g.fillRect(c0, H - b, c1 - c0, b - a);
    }
    g.fillStyle = hex(PAINT.hull); g.fillRect(0, 0, W, H);
    /* red-brown under the drawn boot line, row 150 aft to 158 forward */
    for (i = 0; i < W; i++) rect(i, i + 1, Z(150 + 8 * i / W), ZLO - 1, hex(PAINT.below));
    /* the light-grey panel on the keel drop (d1 757-822, rows 199-212.5) */
    rect(colOf(757), colOf(822), Z(199.5), Z(212.5), hex(PAINT.panel));
    /* plating: faint frame lines and strakes, a mottle of weathering */
    for (i = 0; i < 1400; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.08)";
      g.fillRect(R1() * W, R1() * H, 6 + R1() * 26, 2 + R1() * 5);
    }
    g.fillStyle = "rgba(0,0,0,0.26)";
    for (i = 0; i < W; i += 2.4 / L * W) g.fillRect(Math.round(i), 0, 1, H);
    var ST = [0.45, -1.5, -3.2];
    for (k = 0; k < ST.length; k++) { r = rowOf(ST[k]); g.fillRect(0, r, W, 1); g.fillRect(0, H - r, W, 1); }
    /* grated openings: squares about 0.55 m on a 0.66 m pitch */
    for (k = 0; k < GRATES.length; k++) {
      var gr = GRATES[k], c0 = colOf(gr[0]), c1 = colOf(gr[1]), pitch = 0.66 / L * W, w = 0.52 / L * W;
      for (var c = c0; c + w <= c1 + 0.5; c += pitch) {
        rect(c, c + w, Z(gr[2]), Z(gr[3]), "rgba(12,9,8,0.62)");
        rect(c + w * 0.45, c + w * 0.55, Z(gr[2]), Z(gr[3]), "rgba(80,60,50,0.35)");
      }
    }
    /* rust streaks running down from the hole row, sparse */
    for (i = 0; i < 60; i++) {
      var x = 30 + R1() * 960, z0 = 0.8 - R1() * 0.3, len = 0.3 + R1() * 0.8, hl = len / (ZHI - ZLO) * H / 2;
      g.fillStyle = "rgba(105,70,49," + (0.08 + R1() * 0.10).toFixed(3) + ")";
      r = rowOf(z0); g.fillRect(x, r, 1.5, hl); g.fillRect(x, H - r - hl, 1.5, hl);
    }
    var t = new THREE.CanvasTexture(cv);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex = t;
    return t;
  }
  /* 4 x 4 m repeat tiles: the casing deck and the fin plating */
  var _tt = {};
  function tileTex(THREE, id) {
    if (_tt[id]) return _tt[id];
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R1 = rng(id === "deck" ? 613 : 6130), i;
    g.fillStyle = hex(id === "deck" ? PAINT.deck : PAINT.hull); g.fillRect(0, 0, W, H);
    if (id === "deck") {
      for (i = 0; i < 70; i++) {
        g.fillStyle = "rgba(105,70,49," + (0.08 + R1() * 0.16).toFixed(3) + ")";
        var w = 6 + R1() * 40; g.fillRect(R1() * W, R1() * H, w, w * (0.3 + R1() * 0.7));
      }
      g.fillStyle = "rgba(0,0,0,0.30)";
      for (i = 0; i < W; i += 32) g.fillRect(i, 0, 1, H);          /* deck plating, 0.5 m slats */
    } else {
      for (i = 0; i < 500; i++) {
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.08)";
        g.fillRect(R1() * W, R1() * H, 4 + R1() * 18, 2 + R1() * 4);
      }
      g.fillStyle = "rgba(0,0,0,0.32)";                       /* weld seams: 1.0 m courses, 1.6 m plates */
      for (i = 0; i < 4; i++) {
        g.fillRect(0, i * 64, W, 1);
        for (var x = (i & 1) ? 51 : 0; x < W; x += 102) g.fillRect(x, i * 64, 1, 64);
      }
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tt[id] = t;
    return t;
  }

  /* ------------------------------------------------------ merge machinery */
  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    function put(mat, geo) {
      if (geo.index) geo = geo.toNonIndexed();
      if (!geo.attributes.normal) geo.computeVertexNormals();
      (by[mat] = by[mat] || []).push(geo);
    }
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz, sc) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        p.set(x || 0, y || 0, z || 0);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        put(mat, geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z), quat, s.set(1, 1, 1));
        geo.applyMatrix4(m);
        put(mat, geo);
      },
      done: function (T, g) {
        var k;
        for (k in by) {
          var list = by[k], n = 0, i, j;
          for (i = 0; i < list.length; i++) n += list[i].attributes.position.count;
          var P = new Float32Array(n * 3), N = new Float32Array(n * 3), UV = new Float32Array(n * 2), o = 0;
          for (i = 0; i < list.length; i++) {
            var a = list[i].attributes, c = a.position.count;
            for (j = 0; j < c * 3; j++) { P[o * 3 + j] = a.position.array[j]; N[o * 3 + j] = a.normal.array[j]; }
            if (a.uv) for (j = 0; j < c * 2; j++) UV[o * 2 + j] = a.uv.array[j];
            o += c;
          }
          var G = new THREE.BufferGeometry();
          G.setAttribute("position", new THREE.BufferAttribute(P, 3));
          G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
          G.setAttribute("uv", new THREE.BufferAttribute(UV, 2));
          var mesh = new THREE.Mesh(G, T[k]);
          mesh.name = "m_" + k;
          mesh.castShadow = true; mesh.receiveShadow = true;
          g.add(mesh);
        }
      }
    };
  }

  /* rings of [y, z] points at increasing x, wound outward; uv per point; optional fan caps */
  function ringLoft(THREE, rings, capA, capB) {
    var N = rings[0].pts.length, pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < rings.length; i++)
      for (j = 0; j < N; j++) {
        pos.push(rings[i].x, rings[i].pts[j][0], rings[i].pts[j][1]);
        uv.push(rings[i].uv[j][0], rings[i].uv[j][1]);
      }
    for (i = 0; i < rings.length - 1; i++)
      for (j = 0; j < N - 1; j++) {
        var a = i * N + j, b = a + N, c = a + 1, d = b + 1;
        idx.push(a, c, b, c, d, b);
      }
    function cap(ri, fwd) {
      var base = pos.length / 3, cy = 0, cz = 0, k, R = rings[ri];
      for (k = 0; k < N - 1; k++) { cy += R.pts[k][0]; cz += R.pts[k][1]; }
      pos.push(R.x, cy / (N - 1), cz / (N - 1)); uv.push(R.uv[0][0], 0.25);
      for (k = 0; k < N; k++) { pos.push(R.x, R.pts[k][0], R.pts[k][1]); uv.push(R.uv[k][0], R.uv[k][1]); }
      for (k = 0; k < N - 1; k++) {
        if (fwd) idx.push(base, base + 1 + k, base + 2 + k); else idx.push(base, base + 2 + k, base + 1 + k);
      }
    }
    if (capA) cap(0, false);
    if (capB) cap(rings.length - 1, true);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* vertical shell over plan outlines (CCW from above), top capped; uv in 4 m tiles */
  function shell(THREE, rings) {
    var N = rings[0].pts.length, Lr = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p;
    for (i = 0; i < Lr; i++) {
      var arc = 0;
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        if (j > 0) { var o = rings[i].pts[j - 1]; arc += Math.hypot(p[0] - o[0], p[1] - o[1]); }
        pos.push(p[0], p[1], rings[i].z); uv.push(arc / 4, rings[i].z / 4);
      }
    }
    for (i = 0; i < Lr - 1; i++)
      for (j = 0; j < N; j++) {
        var q = i * ring + j;
        idx.push(q, q + 1, q + ring, q + 1, q + ring + 1, q + ring);
      }
    var base = pos.length / 3, cx = 0, cy = 0, k, top = rings[Lr - 1];
    for (k = 0; k < N; k++) { cx += top.pts[k][0]; cy += top.pts[k][1]; }
    pos.push(cx / N, cy / N, top.z); uv.push(cx / N / 4, cy / N / 4);
    for (k = 0; k < N; k++) { p = top.pts[k]; pos.push(p[0], p[1], top.z); uv.push(p[0] / 4, p[1] / 4); }
    for (k = 0; k < N; k++) idx.push(base, base + 1 + k, base + 1 + ((k + 1) % N));
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* rounded-rectangle plan from x0 (aft) to x1 (fore), half-width hw, after corner radius ra,
     fore corner radius rf (rf = hw gives a round front); CCW from above */
  function rplan(x0, x1, hw, ra, rf) {
    var pts = [], n = 6, i, a;
    var cs = [[x1 - rf, -(hw - rf), -PI / 2, rf], [x1 - rf, hw - rf, 0, rf],
              [x0 + ra, hw - ra, PI / 2, ra], [x0 + ra, -(hw - ra), PI, ra]];
    for (var k = 0; k < 4; k++) {
      for (i = 0; i <= n; i++) {
        if (k === 1 && i === 0 && rf >= hw - 1e-6) continue;    /* the round front: no doubled point */
        a = cs[k][2] + (PI / 2) * i / n;
        pts.push([cs[k][0] + cs[k][3] * Math.cos(a), cs[k][1] + cs[k][3] * Math.sin(a)]);
      }
    }
    return pts;
  }
  function ext(THREE, pts, depth, xz) {
    var sh = new THREE.Shape(), i;
    sh.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    sh.closePath();
    var g = new THREE.ExtrudeGeometry(sh, { depth: depth, bevelEnabled: false });
    if (xz) g.rotateX(PI / 2);                     /* y -> z, thickness toward -y */
    g.computeVertexNormals();
    return g;
  }
  function strut(THREE, A, mat, r, a, b, seg, r2) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, len, seg || 8, 1, false), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }
  function box(THREE, A, mat, sx, sy, sz, x, y, z, rx, rz) {
    A.add(mat, new THREE.BoxGeometry(sx, sy, sz), x, y, z, rx || 0, 0, rz || 0);
  }
  function cylX(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, 0, 0, -PI / 2);
  }
  function cylZ(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, PI / 2, 0, 0);
  }

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    return {
      skin:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.82, metalness: 0.08 }),
      deck:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE, "deck"), roughness: 0.92, metalness: 0.05 }),
      plate:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE, "plate"), roughness: 0.82, metalness: 0.08 }),
      below:  std(PAINT.below, 0.85, 0.05),   /* rudder, planes, bossings: anti-fouling */
      dark:   std(0x0b0c0d, 0.85, 0.10),      /* holes, windows, shutters, recesses */
      metal:  std(0x34373a, 0.55, 0.40),      /* guns, posts, wires, fittings */
      mastlt: std(0x8c9195, 0.45, 0.45),      /* bright periscope and masts (d1 draws them light) */
      screw:  std(0x8a7140, 0.42, 0.70),      /* bronze */
      red:    std(0x8e2a20, 0.70, 0.05),      /* rescue buoy domes (d1) */
      team:   std(team, 0.86, 0.06)
    };
  }

  /* free-flood holes high in the casing side, rows 140-144 of d1 (z 0.8-1.1): [first, last] */
  var HOLES = [[175, 180], [183, 188], [191, 195], [198, 203], [213, 217], [221, 223], [227, 232],
    [235, 239], [242, 247], [250, 255], [257, 262], [265, 269], [280, 284], [295, 299], [302, 307],
    [310, 314], [317, 322], [332, 337], [340, 345], [347, 352], [355, 360], [363, 367], [370, 375],
    [379, 381], [385, 389], [392, 396], [407, 411], [414, 419], [422, 427], [440, 478], [482, 486],
    [489, 493], [496, 501], [504, 508], [511, 516], [519, 524], [526, 531], [534, 539], [541, 546],
    [549, 554], [557, 561], [564, 569], [579, 584], [587, 590], [593, 598], [608, 613], [616, 621],
    [623, 628], [639, 643], [646, 651], [654, 658], [661, 666], [669, 673], [684, 687], [698, 703],
    [705, 710], [713, 718], [728, 732], [766, 768], [840, 844], [854, 857], [861, 864], [867, 870],
    [874, 877], [907, 909]];

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, j, k, u;

    /* ---- hull loft: finer toward the ends and at the keel step (d1 col 819-823) ---- */
    var us = [0.0, 0.08, 0.2, 0.4, 0.7, 1.0, 1.4, 1.8, 2.2, UAP - 0.01, UAP + 0.01, 3.0, 3.6, 4.3];
    u = 5.0;
    while (u < L - 0.05) {
      us.push(u);
      u += u < 14 ? 1.0 : (u < 26 ? 2.0 : (u < 54 ? 2.5 : (u < 64 ? 1.0 : (u < 72 ? 0.8 : (u < 74.5 ? 0.4 : (u < 75.6 ? 0.15 : 0.08))))));
    }
    us.push(U(818), U(820), U(822), U(824), L);
    us.sort(function (a, b) { return a - b; });
    var rings = [], last = -1;
    for (i = 0; i < us.length; i++) {
      if (us[i] - last < 0.02) continue;
      last = us[i];
      var s = section(us[i]), pts = [], uvs = [], uu = us[i] / L;
      for (j = 0; j < s.length; j++) { pts.push([s[j][0], s[j][1]]); uvs.push([uu, vOf(s[j][1], true)]); }
      for (j = s.length - 2; j >= 0; j--) { pts.push([-s[j][0], s[j][1]]); uvs.push([uu, vOf(s[j][1], false)]); }
      rings.push({ x: X(us[i]), pts: pts, uv: uvs });
    }
    A.add("skin", ringLoft(THREE, rings, true, true), 0, 0, 0);

    /* ---- casing deck: a flat strip 2 cm over the hull's deck, stern to the bow nose ---- */
    var dps = [], dix = [], duv = [], n = 0;
    for (u = 1.2; u <= U(942) + 0.01; u += 1.0) {
      var hw = DECK * planAft(u) * planBow(u, zTop(u)) - 0.04;
      var zd = zTop(u) + 0.02;
      dps.push(X(u), hw, zd, X(u), -hw, zd); duv.push(u / 4, hw / 4, u / 4, -hw / 4);
      if (n > 0) { var b0 = (n - 1) * 2; dix.push(b0, b0 + 1, b0 + 2, b0 + 1, b0 + 3, b0 + 2); }
      n++;
    }
    var dg = new THREE.BufferGeometry();
    dg.setAttribute("position", new THREE.Float32BufferAttribute(dps, 3));
    dg.setAttribute("uv", new THREE.Float32BufferAttribute(duv, 2));
    dg.setIndex(dix); dg.computeVertexNormals();
    A.add("deck", dg, 0, 0, 0);

    /* ---- free-flood holes, both sides, column by column (d1 rows 140-144) ---- */
    for (k = 0; k < HOLES.length; k++) {
      var ua = U(HOLES[k][0] - 0.5), ub = U(HOLES[k][1] + 0.5), um = (ua + ub) / 2, zh = Z(142);
      var yh = hullY(um, zh), na = hullNA(um, zh);
      for (i = -1; i <= 1; i += 2) box(THREE, A, "dark", ub - ua, 0.06, 0.30, X(um), i * (yh + 0.005), zh, i * na);
    }

    /* ---- rescue buoys over compartments 1 and 7: grey ring, red dome (d1 cols 167, 737) ---- */
    var BU = [U(166.7), U(736.7)];
    for (k = 0; k < BU.length; k++) {
      var zr = zTop(BU[k]) + 0.03;
      A.add("metal", new THREE.CylinderGeometry(0.52, 0.55, 0.10, 20), X(BU[k]), 0, zr, PI / 2, 0, 0);
      A.add("red", new THREE.SphereGeometry(0.38, 14, 6, 0, 2 * PI, 0, PI / 2), X(BU[k]), 0, zr + 0.05, PI / 2, 0, 0, [1, 0.7, 1]);
    }
    /* ---- bollards (d1 cols 138, 146 aft; 833, 844, 850 forward) ---- */
    var BO = [138.3, 145.8, 833.3, 844, 850];
    for (k = 0; k < BO.length; k++) {
      var bu = U(BO[k]), zb0 = zTop(bu);
      for (i = -1; i <= 1; i += 2) {
        cylZ(THREE, A, "metal", 0.10, 0.10, 0.38, 8, X(bu), i * 0.62, zb0 + 0.19);
        cylZ(THREE, A, "metal", 0.15, 0.15, 0.05, 8, X(bu), i * 0.62, zb0 + 0.38);
      }
    }
    /* ---- casing posts, the stern and bow staffs (d1, [col, row] foot -> head) ---- */
    var PO = [[[59, 140], [53, 111]], [[141, 135], [146.5, 123]], [[199, 134], [205.8, 123]], [[266, 133], [266, 120]],
              [[643, 133], [643, 120]], [[748.5, 133], [748.5, 120]], [[859, 133], [855, 120]], [[924, 133], [924, 104]]];
    for (k = 0; k < PO.length; k++) {
      var fa0 = PO[k][0], fb0 = PO[k][1];
      strut(THREE, A, "metal", 0.055, [X(U(fa0[0])), 0, Math.max(Z(fa0[1]), zTop(U(fa0[0]))) - 0.05], [X(U(fb0[0])), 0, Z(fb0[1])], 6, 0.035);
    }
    /* ---- jackstay wires as drawn: deck aft -> fin top, fin -> bow, and the low runs on the posts ---- */
    var WI = [[[66, 139], [493, 85]], [[563, 77], [924, 131.5]], [[146.5, 123], [205.8, 123]], [[205.8, 123], [266, 120]],
              [[643, 120], [748.5, 120]], [[748.5, 120], [855, 120]]];
    for (k = 0; k < WI.length; k++)
      strut(THREE, A, "metal", 0.022, [X(U(WI[k][0][0])), 0, Z(WI[k][0][1])], [X(U(WI[k][1][0])), 0, Z(WI[k][1][1])], 4);

    /* ---- the bow: two torpedo-tube shutters a side (d1 917-949, rows 153-160 and 164-172) ---- */
    var SH = [[Z(156.5), 0.50, 917, 949], [Z(168), 0.55, 917, 947]];
    for (k = 0; k < SH.length; k++) {
      var sz = SH[k][0], sa = U(SH[k][2]), sb = Math.min(U(SH[k][3]), xStem(sz) - 0.3), nsg = 5;
      for (j = 0; j < nsg; j++) {
        var s0 = sa + (sb - sa) * j / nsg, s1 = sa + (sb - sa) * (j + 1) / nsg, smid = (s0 + s1) / 2;
        var sy0 = hullY(s0, sz), sy1 = hullY(s1, sz), syy = hullY(smid, sz), yaw = Math.atan2(sy0 - sy1, s1 - s0);
        var hh = SH[k][1] * Math.sin(PI * (j + 0.5) / nsg) * 0.5 + 0.05;    /* lens-shaped outline */
        for (i = -1; i <= 1; i += 2) {
          A.add("dark", new THREE.BoxGeometry(Math.hypot(s1 - s0, sy1 - sy0), 0.05, 0.05), X(smid), i * (syy + 0.01), sz + hh, 0, 0, -i * yaw);
          A.add("dark", new THREE.BoxGeometry(Math.hypot(s1 - s0, sy1 - sy0), 0.05, 0.05), X(smid), i * (syy + 0.01), sz - hh, 0, 0, -i * yaw);
        }
      }
    }
    /* the outline box round the shutters (d1 904-949, rows 152.5-173) -- its after edge */
    for (i = -1; i <= 1; i += 2) box(THREE, A, "dark", 0.05, 0.06, Z(152.5) - Z(173), X(U(904)), i * (hullY(U(904), Z(162.7)) + 0.01), Z(162.7));
    /* ---- the folding bow plane, lying up against the side under its slot (d1 815-839, rows 142-168) ---- */
    for (i = -1; i <= 1; i += 2) {
      var pa = U(787.5), pb = U(822), pz = Z(137.5), pm = (pa + pb) / 2;
      box(THREE, A, "dark", pb - pa, 0.08, 0.26, X(pm), i * (hullY(pm, pz) + 0.005), pz, i * hullNA(pm, pz));
      var bpU = U(827), bpZ = Z(155), bpY = hullY(bpU, bpZ), bpN = hullNA(bpU, bpZ);
      var bpg = new THREE.BoxGeometry(0.95, 0.14, 2.05);
      bpg.applyMatrix4(new THREE.Matrix4().makeShear(0, 0, 0, 0, -0.48, 0));      /* leans aft at the top, as drawn */
      A.add("plate", bpg, X(bpU), i * (bpY + 0.10), bpZ, i * bpN, 0, 0);
    }
    /* ---- anchor recess on the starboard bow (d1 882-896, rows 145-155) ---- */
    var au = U(889), az = Z(150), ay = hullY(au, az);
    box(THREE, A, "dark", 1.1, 0.06, 0.78, X(au), -(ay + 0.01), az, -hullNA(au, az));
    box(THREE, A, "metal", 0.7, 0.10, 0.16, X(au), -(ay + 0.03), az - 0.1, -hullNA(au, az));

    /* ---- stern: the tube shutter lens a side over the rudder (d1 14-50, rows 153-162; 2 stern tubes) ---- */
    for (i = -1; i <= 1; i += 2) {
      var tu = U(32), tz = Z(157.5), ty = hullY(tu, tz);
      A.add("dark", new THREE.SphereGeometry(1.0, 12, 6), X(tu), i * (ty + 0.01), tz, 0, 0, 0, [1.45, 0.05, 0.36]);
      A.add("below", new THREE.SphereGeometry(1.0, 12, 6), X(tu), i * (ty + 0.03), tz, 0, 0, 0, [1.30, 0.05, 0.28]);
    }
    /* the grated oval on the after flank (d1 234-262, rows 156-168), as drawn */
    for (i = -1; i <= 1; i += 2) {
      var eu = U(248), ez = Z(162.5), ey = hullY(eu, ez), en = hullNA(eu, ez);
      A.add("below", new THREE.SphereGeometry(1.0, 12, 6), X(eu), i * (ey - 0.05), ez, i * en, 0, 0, [1.15, 0.22, 0.42]);
      A.add("dark", new THREE.SphereGeometry(1.0, 12, 6), X(U(241.5)), i * (hullY(U(241.5), ez) + 0.12), ez, i * en, 0, 0, [0.62, 0.06, 0.34]);
      for (k = 0; k < 3; k++) box(THREE, A, "below", 0.06, 0.08, 0.62, X(U(238 + k * 3.5)), i * (hullY(U(241.5), ez) + 0.15), ez, i * en);
    }
    /* ---- rudder under the counter, sole piece under it (d1 3-32.5, rows 164-202.5; 204-208) ---- */
    var RD = [[U(3), Z(164)], [U(32), Z(164)], [U(32.5), Z(202.5)], [U(3), Z(202.5)]];
    var rg = ext(THREE, RD.map(function (p) { return [X(p[0]), p[1]]; }), 0.36, true); rg.translate(0, 0.18, 0);
    A.add("below", rg, 0, 0, 0);
    var SK = [[U(5), Z(204)], [U(5), Z(207.5)], [U(60), Z(210.2)], [U(60), Z(207)], [U(36), Z(204)]];
    var skg = ext(THREE, SK.map(function (p) { return [X(p[0]), p[1]]; }), 0.40, true); skg.translate(0, 0.20, 0);
    A.add("below", skg, 0, 0, 0);
    box(THREE, A, "below", 0.30, 0.30, Z(202.5) - Z(204) + 0.4, X(U(18)), 0, Z(203.2));     /* the heel bearing */

    /* ---- two screws on long lens bossings, the stern planes behind them (d1 rows 175-187) ---- */
    var bl = [[-0.10, 0.20], [-0.26, 0.45], [-0.34, 0.72], [-0.24, 0.93], [0.02, 1.0], [0.22, 0.86], [0.24, 0.58], [0.10, 0.22]];
    function screw(ux, y, z, rad) {
      cylX(THREE, A, "screw", 0.20, 0.12, 0.6, 14, X(ux), y, z);
      A.add("screw", new THREE.SphereGeometry(0.12, 10, 6), X(ux - 0.30), y, z);
      for (var b = 0; b < 4; b++) {
        var gb = ext(THREE, bl.map(function (p) { return [p[0] * rad, p[1] * rad]; }), 0.05);
        gb.translate(0, 0, -0.025);
        gb.rotateY(0.8);
        A.add("screw", gb, X(ux), y, z, b * PI / 2 + 0.4, 0, 0);
      }
    }
    var SZ = Z(181.7), SY = 1.5;
    for (i = -1; i <= 1; i += 2) {
      /* bossing: a lens from the flank (d1 63-171) tapering aft to the screw */
      var bq = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-1, 0, 0));
      var bA = U(63), bB = U(171), bM = U(120);
      A.addQ("below", new THREE.CylinderGeometry(0.48, 0.22, bM - bA, 14, 1, false), X((bA + bM) / 2), i * SY, SZ, bq);
      A.addQ("below", new THREE.CylinderGeometry(0.16, 0.48, bB - bM, 14, 1, false), X((bM + bB) / 2), i * SY, SZ, bq);
      cylX(THREE, A, "metal", 0.10, 0.10, 0.6, 10, X(U(60.5)), i * SY, SZ);
      screw(U(59.5), i * SY, SZ, 0.83);
      /* the stern plane behind the screw at shaft height (d1 32.5-57, rows 181-183) */
      var y0 = Math.max(0.15, hullY(U(45), SZ) - 0.1), sp = [[X(U(33)), i * y0], [X(U(56)), i * y0], [X(U(53)), i * 2.9], [X(U(36)), i * 2.9]];
      if (i < 0) sp.reverse();
      var spg = ext(THREE, sp, 0.16); spg.translate(0, 0, SZ - 0.08);
      A.add("below", spg, 0, 0, 0);
    }

    /* ---- the fin (d1 488-634): tall after block, low round-fronted forward step ---- */
    var FA = U(488), FA2 = U(491.5), FH = U(596), FF = U(634);
    var ZC = Z(133), ZS = Z(109.5), ZT = Z(91);
    var fr = [], FL = [ZC - 0.45, ZC, ZC + 0.12, ZC + 0.6, ZS - 0.12, ZS - 0.04, ZS];
    for (i = 0; i < FL.length; i++) {
      var zl = FL[i], fl = zl < ZC + 0.6 ? 0.12 * (1 - clamp((zl - ZC) / 0.6, 0, 1)) : 0, ins = zl >= ZS - 0.05 ? (zl >= ZS ? 0.10 : 0.03) : 0;
      fr.push({ z: zl, pts: rplan(X(FA) - fl + ins, X(FF) + fl - ins, 1.40 + fl - ins, 0.45, 1.40 + fl - ins) });
    }
    A.add("plate", shell(THREE, fr), 0, 0, 0);
    var hr = [], HL = [ZS - 0.2, ZT - 0.6, ZT - 0.12, ZT - 0.04, ZT];
    for (i = 0; i < HL.length; i++) {
      var zh2 = HL[i], ih = zh2 >= ZT - 0.05 ? (zh2 >= ZT ? 0.10 : 0.03) : 0, tp = 0.06 * (zh2 - ZS) / (ZT - ZS);
      hr.push({ z: zh2, pts: rplan(X(FA2) + ih, X(FH) - ih, 1.38 - tp - ih, 0.45, 0.65) });
    }
    A.add("plate", shell(THREE, hr), 0, 0, 0);
    /* the flared bridge front: a lip proud of the top's fore part (d1 568-598, rows 91-94) */
    var lr = [{ z: Z(94), pts: rplan(X(U(568)), X(FH) - 0.02, 1.36, 0.2, 0.6) }, { z: ZT + 0.06, pts: rplan(X(U(568)), X(U(598.5)), 1.46, 0.2, 0.7) }];
    A.add("plate", shell(THREE, lr), 0, 0, 0);
    /* the bridge front box with its two windows (d1 577.5-597, rows 86-91) */
    var bfr = [{ z: ZT, pts: rplan(X(U(577.5)), X(U(596)), 0.95, 0.15, 0.55) }, { z: Z(86), pts: rplan(X(U(578)), X(U(595)), 0.90, 0.15, 0.5) }];
    A.add("plate", shell(THREE, bfr), 0, 0, 0);
    for (i = -1; i <= 1; i += 2) box(THREE, A, "dark", 0.40, 0.05, 0.22, X(U(590)), i * 0.45, Z(88.5), 0, i * 0.5);
    /* the shear housing over the top (d1 526-569, rows 82.5-91), its frame lines */
    var shr = [{ z: ZT - 0.05, pts: rplan(X(U(526)), X(U(569)), 0.78, 0.3, 0.35) }, { z: Z(82.5), pts: rplan(X(U(526.5)), X(U(568.5)), 0.74, 0.3, 0.35) }];
    A.add("plate", shell(THREE, shr), 0, 0, 0);
    for (k = 0; k < 3; k++) for (i = -1; i <= 1; i += 2) box(THREE, A, "dark", 0.04, 0.03, Z(82.5) - ZT, X(U([530, 548, 559][k])), i * 0.77, (Z(82.5) + ZT) / 2);
    /* the bridge well behind the front box (open, men stand in it) */
    box(THREE, A, "dark", U(577) - U(569), 1.6, 0.04, X((U(577) + U(569)) / 2), 0, ZT + 0.02);
    /* guard rails round the after part of the top (d1 493-526, row 82.5): posts and a rail */
    for (i = -1; i <= 1; i += 2) {
      var ry = i * 1.22, rz = Z(82.5);
      strut(THREE, A, "metal", 0.025, [X(U(492.5)), ry, rz], [X(U(526)), ry, rz], 4);
      for (k = 0; k < 4; k++) strut(THREE, A, "metal", 0.025, [X(U(493 + k * 11)), ry, ZT], [X(U(493 + k * 11)), ry, rz], 4);
    }
    strut(THREE, A, "metal", 0.025, [X(U(492.5)), -1.22, Z(82.5)], [X(U(492.5)), 1.22, Z(82.5)], 4);
    /* fin side details (d1): the strake at row 119, the free-flood slots at the foot, scuttles, ladder */
    function finY(uu, zz) {
      if (zz > ZS + 0.01) return 1.38 - 0.06 * (zz - ZS) / (ZT - ZS);
      var r2 = 1.40, xf = FF - r2;
      if (uu <= xf) return r2;
      return Math.sqrt(Math.max(0, r2 * r2 - (uu - xf) * (uu - xf)));
    }
    for (i = -1; i <= 1; i += 2) {
      box(THREE, A, "dark", U(596) - U(489), 0.05, 0.05, X((U(596) + U(489)) / 2), i * (finY(42, Z(119)) + 0.01), Z(119));
      var FS = [[517.5, 525], [526, 532], [533.5, 540], [541.5, 548], [549, 555], [556, 563], [579, 585.5], [586.5, 593], [594, 600], [601, 607], [608, 615]];
      for (k = 0; k < FS.length; k++) {
        var fu = (U(FS[k][0]) + U(FS[k][1])) / 2;
        box(THREE, A, "dark", U(FS[k][1]) - U(FS[k][0]), 0.05, 0.22, X(fu), i * (finY(fu, Z(131)) + 0.13), Z(131));
      }
      for (k = 0; k < 3; k++) box(THREE, A, "dark", 0.22, 0.05, 0.16, X(U(499.5)), i * (finY(39.6, 4) + 0.01), Z(101 + k * 4));
      for (k = 0; k < 3; k++) box(THREE, A, "dark", 0.14, 0.05, 0.14, X(U(494)), i * (finY(39.1, 3) + 0.01), Z([117, 124, 128][k]));
      for (k = 0; k < 9; k++) box(THREE, A, "metal", 0.30, 0.09, 0.04, X(U(563.5)), i * (finY(44.6, 3) + 0.04), Z(97 + k * 3.8));
    }

    /* ---- the twin 57 mm SM-24-ZiF abaft the fin, barrels laid aft (d1 407-480, rows 113-133) ---- */
    var GU = U(459.8), GZ = Z(116.7);
    cylZ(THREE, A, "metal", 0.46, 0.60, Z(123) - ZC + 0.05, 16, X(GU), 0, (Z(123) + ZC) / 2);       /* pedestal */
    cylZ(THREE, A, "metal", 0.70, 0.70, 0.10, 16, X(GU), 0, Z(123));                                /* training ring */
    box(THREE, A, "metal", 1.9, 1.20, 0.55, X(U(456)), 0, Z(120));                                  /* carriage */
    for (i = -1; i <= 1; i += 2) {
      strut(THREE, A, "metal", 0.07, [X(U(452)), i * 0.5, Z(123)], [X(U(446)), i * 0.5, ZC + 0.05], 6);   /* legs as drawn */
      box(THREE, A, "metal", 1.5, 0.12, 0.70, X(U(452)), i * 0.62, GZ, 0, 0.0);                    /* cradle cheeks */
    }
    box(THREE, A, "metal", 2.4, 0.90, 0.40, X(U(452.5)), 0, GZ + 0.05);                             /* cradle */
    box(THREE, A, "metal", U(480) - U(464), 0.80, Z(113) - Z(117.5), X((U(480) + U(464)) / 2), 0, (Z(113) + Z(117.5)) / 2);  /* breech and sight box */
    for (i = -1; i <= 1; i += 2) {
      cylX(THREE, A, "metal", 0.060, 0.060, U(441) - U(410), 8, X((U(441) + U(410)) / 2), i * 0.22, GZ);
      cylX(THREE, A, "metal", 0.085, 0.085, U(410.5) - U(407.5), 8, X((U(410.5) + U(407.5)) / 2), i * 0.22, GZ);  /* muzzle brakes */
      cylX(THREE, A, "metal", 0.10, 0.10, 0.6, 8, X(U(443)), i * 0.22, GZ);                         /* barrel jackets */
    }
    cylZ(THREE, A, "metal", 0.36, 0.36, Z(127.5) - ZC, 14, X(U(432.5)), 0, (Z(127.5) + ZC) / 2);   /* ready-use locker */
    /* ---- the twin 25 mm 2M-8 in the forward step: sight box, barrels over-under (d1 611-645) ---- */
    box(THREE, A, "metal", U(621.7) - U(611.7), 0.70, Z(106.3) - ZS + 0.04, X((U(621.7) + U(611.7)) / 2), 0, (Z(106.3) + ZS) / 2);
    var BZ = [Z(110.8), Z(115.8)];
    for (k = 0; k < 2; k++) {
      cylX(THREE, A, "metal", 0.040, 0.040, U(645.5) - U(622), 8, X((U(645.5) + U(622)) / 2), 0, BZ[k]);
      cylX(THREE, A, "metal", 0.060, 0.060, 0.30, 8, X(U(644.3)), 0, BZ[k]);
    }

    /* ---- masts as drawn (d1 columns, tops by row), all on the centreline ---- */
    var MZ = ZT - 0.05, MH = Z(82.5) - 0.05;
    strut(THREE, A, "metal", 0.06, [X(U(493)), 0, Z(90)], [X(U(485)), 0, Z(55)], 6, 0.035);   /* raked aerial mast */
    strut(THREE, A, "mastlt", 0.06, [X(U(512.5)), 0, MZ], [X(U(512.5)), 0, Z(50)], 8);          /* DF loop */
    A.add("mastlt", new THREE.TorusGeometry(0.34, 0.045, 6, 18), X(U(512.5)), 0, Z(43.5), PI / 2, 0, 0, [1, 1.55, 1]);
    strut(THREE, A, "mastlt", 0.14, [X(U(521)), 0, MH], [X(U(521)), 0, Z(47)], 10, 0.12);      /* dome-headed mast */
    cylZ(THREE, A, "mastlt", 0.16, 0.12, Z(40) - Z(47), 10, X(U(521)), 0, (Z(40) + Z(47)) / 2);
    A.add("mastlt", new THREE.SphereGeometry(0.16, 10, 5), X(U(521)), 0, Z(47));
    strut(THREE, A, "mastlt", 0.14, [X(U(529)), 0, MH], [X(U(529)), 0, Z(57)], 12);             /* the tall periscope */
    strut(THREE, A, "mastlt", 0.075, [X(U(529)), 0, Z(57)], [X(U(529)), 0, Z(1)], 8, 0.055);
    cylZ(THREE, A, "mastlt", 0.10, 0.10, 0.12, 8, X(U(529)), 0, Z(31));
    for (k = 0; k < 2; k++) strut(THREE, A, "metal", 0.09, [X(U([533.5, 541.5][k])), 0, MH], [X(U([533.5, 541.5][k])), 0, Z(71)], 8);  /* snorkel pipes */
    box(THREE, A, "metal", U(545) - U(532.5), 0.72, Z(58) - Z(71), X((U(545) + U(532.5)) / 2), 0, (Z(58) + Z(71)) / 2);   /* its head */
    box(THREE, A, "dark", 0.5, 0.74, 0.12, X(U(538.5)), 0, Z(60));
    strut(THREE, A, "mastlt", 0.07, [X(U(550)), 0, MH], [X(U(550)), 0, Z(39)], 8, 0.05);
    strut(THREE, A, "mastlt", 0.045, [X(U(557.5)), 0, MH], [X(U(557.5)), 0, Z(45)], 6, 0.03);
    strut(THREE, A, "mastlt", 0.12, [X(U(561)), 0, MH], [X(U(561)), 0, Z(47)], 10, 0.10);
    strut(THREE, A, "mastlt", 0.05, [X(U(561)), 0, Z(47)], [X(U(561)), 0, Z(27)], 6, 0.03);
    box(THREE, A, "metal", U(568) - U(563), 0.45, Z(79) - ZT, X((U(568) + U(563)) / 2), 0, (Z(79) + ZT) / 2);   /* the hooded fitting */
    A.add("metal", new THREE.SphereGeometry(0.2, 8, 5, 0, 2 * PI, 0, PI / 2), X((U(568) + U(563)) / 2), 0, Z(79), PI / 2, 0, 0);

    /* ---- modest team strips: two flat panels on the casing, 2 cm over the deck strip ---- */
    box(THREE, A, "team", 2.6, 0.9, 0.04, X(64.0), 0, zTop(64.0) + 0.05);
    box(THREE, A, "team", 2.6, 0.9, 0.04, X(22.0), 0, zTop(22.0) + 0.05);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length of 76 m: render3d scales a submarine by it. */
UNIT_MODELS["pact_e50_sub"] = {
  len: 76,
  build: function (THREE, M, C) { return HeroWhiskey613.build(THREE, M, C); }
};
