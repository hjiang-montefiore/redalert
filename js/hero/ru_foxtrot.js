/* ============ ru_foxtrot.js -- HERO model: Project 641 Foxtrot (pact_e60_sub) ============
   Soviet long-range diesel-electric attack submarine, three shafts, 1958-. Full-quality redo,
   2026-10-24. One row, one key: pact_e60_sub "Project 641 Foxtrot" (eras.js, service 1958, e60);
   sub_specs.js gives 91.3 m, beam 7.4 m, three screws, no deck gun, black. No other row and no
   other file reads this key or HeroFoxtrot641 (grep of js/, tools/ and the html). Drawn as the
   base Project 641 as photographed in the 1960s-80s (no 641B, no later refits).

   References (Wikimedia Commons at width 960, cached in scratchpad/q_foxtrot_ref):
     d      "Foxtrot class SS.svg": colour side elevation, bow right (starboard side). THE source
            for every station: 958 px over the 91.3 m (10.485 px/m). It draws the white waterline
            at row 198, the casing 2.1-2.7 m over it and the keel 5.05 m under it (published
            draught 5.1 m, en-wiki; ru-wiki gives 5.9 m -- the drawing is followed, flagged).
     p_stb  "A starboard view of a Soviet-built Cuban Foxtrot Class patrol submarine underway"
            (US Navy): the fin with its upright round nose, windows forward, the raised after
            step overhanging the raked after edge, the concave fillet at its foot, the tall mast
            at the after end, the casing rows of free-flood holes, black paint, a rust-weathered
            casing deck.
     p_pbow "A port bow view of a Soviet-built Cuban Foxtrot class patrol submarine underway":
            the long narrow hull from above, the narrow flat casing deck, the light-grey bow cap,
            red-brown below the boot line, the white-ringed rescue buoys on the casing.
     p_cub  "Cuban Foxtrot submarine.jpg": bow quarter, the light bow cylinder, the fin windows.
     p_fox  "Foxtrot Class submarine.JPEG": silhouette, fin windows forward, two masts raised.
     p_b36  1962 photograph of B-36 escorted by USS Charles P. Cecil (period, Soviet boat: black).
     B-39 (San Diego, museum): "B-39 conning tower front.JPG" (p_ctf: the narrow bullet-nosed fin
            head-on, four big windows low and four small ones high round the nose; the red star
            and white window frames are museum display paint, NOT drawn), "B-39 conning tower
            port side 1.JPG" (p_ctp), "B-39 aerial.JPG" (p_aer: the tall hinged aerial mast at
            the after edge of the fin), "B-39 starboard bow plane.JPG" (p_bp: the bow plane
            folded into its long slot high in the casing side), "B-39 stern 1.JPG" (p_st1: the
            narrow flat stern casing), "B-39 bow 1.JPG" (p_bow1: the bluff round bow).
     "B-413 v doke.JPG" (Cyrillic file name) (p_dock, Kaliningrad, in dock): the bow out of water -- the light-grey
            bow cap and the tall light cylinder on the bow, the bow-plane slot, the hole rows.
     "B-440 in Vytegra.JPG" (p_vyt, on land): the whole starboard side forward of the stern --
            bow cap, bow cylinder, bow-plane slot outline, anchor recess, tube shutters, hole rows.
     ru-wiki "Podvodnye lodki proekta 641": 91.3 m, beam 7.4 m, 6 bow and 4 stern 533 mm tubes.

   Recognition list (each one shows on the final sheets):
     1 the long narrow hull, 91.3 x 7.4 m, its flat-sided section with the casing deck on top
       (d stations, column by column; p_pbow, p_dock) -- the hull loft, tables TOP and KEEL.
     2 the bluff bow with the top overhanging the raked stem by 2 m, the light-grey bow cap
       (d; p_dock, p_vyt, p_pbow) -- per-height stem table STEM, painted cap.
     3 the tall light cylinder on the bow top, 2.2 m across, with its narrow head (d; p_dock,
       p_vyt, p_cub).
     4 the tall fin 40 % back: upright round nose, after edge raked into a concave fillet, the
       raised after step overhanging aft (d at 10.485 px/m; p_stb, p_fox, p_ctr).
     5 fin windows: four big ones low and five small ones high round the nose (p_ctf; rows from
       d), three tall ones high aft (d); the bullet-topped section (p_ctf); the open bridge well.
     6 the masts as drawn: the tall aerial mast at the fin's after edge (p_aer, p_stb), pole,
       hook mast, dome-headed mast, the loop aerial, the thick snorkel with its head valve, the
       whip and two slim masts (d).
     7 rows of square free-flood holes along the casing side (d hole groups, both sides; p_stb,
       p_cub, p_dock, p_vyt) and the low rows near the keel (d; p_bow1).
     8 the folding bow planes housed in their long slot high in the casing side (d; p_bp, p_vyt).
     9 three torpedo-tube shutters a side on the stem (d; p_vyt), two oval stern-tube shutters a
       side on the stern quarter (d; 4 stern tubes per ru-wiki).
    10 the stern as drawn: the counter, the rudder behind the centre screw in its aperture, the
       sole piece, two wing screws on long shaft bossings, the stern planes behind them -- THREE
       screws (d; sub_specs.js).
    11 the white-ringed red rescue buoys on the casing fore and aft (d; p_pbow).
    12 paint: black overall above the drawing's boot line 2.1 m under the waterline, red-brown
       below it (d; red-brown in p_pbow, p_cub), rust weathering on the casing deck (p_stb).

   Paint, sampled and taken to about 0.7-0.85 of level: black 0x2b2c2f (p_stb fin in sun
   (23,19,25) is darker than the game can show; the Kilo's Soviet black is kept for the set);
   red-brown 0x46291a (d (82,48,29) at 0.85); bow cap 0x807c78 (d light grey (170,165,160) at
   0.75); deck rust rgba(105,70,49) over black (p_stb deck (150,100,70) at 0.7). Followed: the
   period paint (black, red-brown below); NOT the museum display paint (B-39 red star, white
   window frames; B-413 green boot top; draught marks).

   Waterline and the game: z = 0 is the drawing's waterline; render3d draws a submarine at a
   fixed datum (y -1.2 under a 0.35 sea), which with the length scaling puts the sea about
   z = +2.9 here: the casing runs awash and the fin and masts stand clear.
   Not confirmed, and so drawn plainly or not at all:
     - the hull plan (no plan drawing): beam 7.4 m at 1.3 m under the waterline, the casing deck
       3.0 m wide, a long fine stern and a bow cap round in plan (p_pbow, p_st1, p_dock);
     - the wing shafts' spacing (+-2.2 m) and the stern-plane span (to +-3.4 m): side view only;
     - screw sizes as drawn (centre 1.6 m, wing 1.7 m), four blades (not countable);
     - sub_specs.js calls the stern "cruciform": the drawing shows a ship-type stern (rudder
       behind the centre screw, horizontal planes) and no upper fin -- the drawing is followed
       (data mismatch reported, not edited);
     - the drawing's lower lens under the wing shafts and its stern grates: unidentified, not drawn;
     - the drawing's white waterline stripe (only museum boats show it): not drawn;
     - the anchor recess: on the starboard bow (d, p_vyt); the port side is not seen, not drawn.
   No hull number, name, flag, star, ensign, draught marks, rails or text.

   Model space: +X bow, +Y port, +Z up, metres; waterline z = 0. render3d scales a submarine by
   UNIT_MODELS[key].len (the true 91.3 m) and reads no named node of it; the row is not
   turret:true, so nothing is named "turret". Merged per material (one draw call each).
   ASCII only in code. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroFoxtrot641 = (function () {
  "use strict";

  var PI = Math.PI;
  var L = 91.3;                     /* stern tip (u = 0) to bow tip (u = L) */
  var PXM = 10.485;                 /* drawing px per metre */
  var WLY = 198;                    /* drawing row of the waterline */
  var BEAM = 3.7;                   /* half of the published 7.4 m */
  var DECK = 1.5;                   /* half-width of the casing deck amidships */
  var BOOT = -2.1;                  /* the drawing's boot line (row 220) */

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function U(x) { return (x - 1) / PXM; }          /* drawing column -> metres from the stern */
  function Z(y) { return (WLY - y) / PXM; }        /* drawing row -> metres over the waterline */
  function X(u) { return u - L / 2; }              /* metres from the stern -> model x */

  /* profile tables in drawing px [column, row], read off d column by column */
  var TOPPX = [[1, 213], [2, 210], [3, 207], [4, 204], [6, 201], [9, 198], [13, 195], [23, 192],
    [48, 189], [60, 188.6], [100, 185], [140, 182], [200, 179], [240, 177], [280, 176], [480, 176],
    [640, 174], [700, 173], [720, 171.5], [820, 170], [880, 169.6], [924, 169], [945, 169],
    [951, 170], [954, 171], [956, 172.5], [957.4, 175], [958, 178]];
  var KEELPX = [[46, 246], [60, 247.5], [100, 249.5], [160, 250.5], [200, 251], [930, 251],
    [933, 250], [935, 248.5], [936, 247], [937, 244], [937.8, 241], [938.2, 214], [939, 213],
    [940, 211], [941, 208], [942, 205], [944, 202], [946, 199], [948, 196], [951, 193],
    [953, 190], [955, 187], [957, 184], [958, 180]];
  /* the stem: forward-most column per row (bow cap overhanging the raked stem) */
  var STEMPX = [[169, 950], [172, 956], [175, 958], [181, 958], [184, 957], [187, 955], [190, 953],
    [193, 951], [196, 948], [199, 946], [202, 944], [205, 942], [208, 941], [211, 940], [214, 939],
    [241, 938], [244, 937], [247, 936], [250, 933], [251, 931]];
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
  var UAP = 4.3;                                    /* the aperture's forward edge (d col 46) */
  function zTop(u) { return lerpTab(TOP, u); }
  function zKeel(u) {
    if (u < UAP) return -1.43 - 0.67 * u / UAP;     /* counter bottom over the rudder (d rows 213-220) */
    return lerpTab(KEEL, u);
  }
  function xStem(z) { return lerpTab(STEM, z); }

  /* plan: a long fine run aft (p_st1, p_b39full) and a bow full at the cap, finer at the forefoot */
  function planAft(u) { return u >= 30 ? 1 : Math.max(0.004, 1 - Math.pow((30 - u) / 30, 1.6)); }
  function planBow(u, z) {
    var u0 = 76 + 3 * clamp((z + 1) / 3, 0, 1);      /* the cap stays broad further forward (p_dock) */
    if (u <= u0) return 1;
    var p = 1.5 + 1.1 * clamp((z + 5) / 5.5, 0, 1), r = clamp((u - u0) / (xStem(z) - u0), 0, 1);
    return Math.max(0.004, Math.pow(1 - Math.pow(r, p), 1 / p));
  }

  /* port half-section at station u, keel -> side -> deck edge -> deck centre, as [y, z] */
  var NL = 9, NU = 8;
  function section(u) {
    var zt = zTop(u), zk = zKeel(u), zb = zk + 0.53 * (zt - zk), fa = planAft(u);
    var pts = [], k, t, y, z;
    for (k = 0; k <= NL; k++) {
      t = (PI / 2) * (1 - k / NL);
      y = BEAM * Math.pow(Math.cos(t), 2 / 2.5); z = zb - (zb - zk) * Math.pow(Math.sin(t), 2 / 2.5);
      pts.push([y, z]);
    }
    for (k = 1; k <= NU; k++) {
      t = (PI / 2) * (k / NU);
      y = DECK + (BEAM - DECK) * Math.pow(Math.cos(t), 2 / 2.4); z = zb + (zt - zb) * Math.pow(Math.sin(t), 2 / 2.4);
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

  var PAINT = { hull: 0x2b2c2f, below: 0x46291a, cap: 0x807c78, deck: 0x2c2826 };

  /* ---------------------------------------------------------------- hull canvas
     u = metres from the stern / L; v by height: port rows run keel (v 0, z -5.2) to the top
     (v 0.5, z +3.0), starboard mirrors it -- so each row is one height and the boot line, the
     bow cap and the strakes are straight rows. */
  var ZLO = -5.2, ZHI = 3.0;
  function vOf(z, port) { var v = clamp((z - ZLO) / (ZHI - ZLO), 0, 1) * 0.5; return port ? v : 1 - v; }
  var _tex = null;
  function hullTex(THREE) {
    if (_tex) return _tex;
    var W = 1024, H = 512, cv = cvs(W, H), g = cv.getContext("2d"), R1 = rng(6411), i, r, k;
    function rowOf(z) { return (1 - vOf(z, true)) * H; }       /* port half, canvas rows */
    function band(z0, z1, col) {                                 /* both halves */
      var a = rowOf(z1), b = rowOf(z0);
      g.fillStyle = col; g.fillRect(0, a, W, b - a); g.fillRect(0, H - b, W, b - a);
    }
    g.fillStyle = hex(PAINT.hull); g.fillRect(0, 0, W, H);
    band(ZLO - 1, BOOT, hex(PAINT.below));
    /* plating: faint frame lines and strakes, a mottle of weathering */
    for (i = 0; i < 1400; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.08)";
      g.fillRect(R1() * W, R1() * H, 6 + R1() * 26, 2 + R1() * 5);
    }
    g.fillStyle = "rgba(0,0,0,0.28)";
    for (i = 0; i < W; i += 2.4 / L * W) g.fillRect(Math.round(i), 0, 1, H);
    var ST = [0.35, -1.6, -3.4];
    for (k = 0; k < ST.length; k++) { r = rowOf(ST[k]); g.fillRect(0, r, W, 1); g.fillRect(0, H - r, W, 1); }
    /* rust streaks running down from the hole row (p_stb), sparse */
    for (i = 0; i < 70; i++) {
      var x = 60 + R1() * 840, z0 = 0.9 - R1() * 0.3, len = 0.4 + R1() * 1.0;
      g.fillStyle = "rgba(105,70,49," + (0.10 + R1() * 0.12).toFixed(3) + ")";
      r = rowOf(z0); g.fillRect(x, r, 1.5, len / (ZHI - ZLO) * H / 2); g.fillRect(x, H - r - len / (ZHI - ZLO) * H / 2, 1.5, len / (ZHI - ZLO) * H / 2);
    }
    /* the light-grey bow cap: forward of d column 899, from 0.95 m to the top */
    var c0 = Math.round(U(899) / L * W);
    var a0 = rowOf(ZHI), b0 = rowOf(0.95);
    var gr = g.createLinearGradient(c0 - 6, 0, c0 + 4, 0);
    gr.addColorStop(0, "rgba(128,124,120,0)"); gr.addColorStop(1, hex(PAINT.cap));
    g.fillStyle = gr;
    g.fillRect(c0 - 6, a0, W - c0 + 6, b0 - a0); g.fillRect(c0 - 6, H - b0, W - c0 + 6, b0 - a0);
    g.fillStyle = "rgba(0,0,0,0.10)";
    for (i = 0; i < 40; i++) g.fillRect(c0 + R1() * (W - c0), a0 + R1() * (b0 - a0), 3 + R1() * 8, 1 + R1() * 2);
    var t = new THREE.CanvasTexture(cv);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex = t;
    return t;
  }
  /* 4 x 4 m repeat tiles: the casing deck (black, rust-weathered) and the fin plating */
  var _tt = {};
  function tileTex(THREE, id) {
    if (_tt[id]) return _tt[id];
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R1 = rng(id === "deck" ? 641 : 6410), i;
    g.fillStyle = hex(id === "deck" ? PAINT.deck : PAINT.hull); g.fillRect(0, 0, W, H);
    if (id === "deck") {
      for (i = 0; i < 90; i++) {
        g.fillStyle = "rgba(105,70,49," + (0.10 + R1() * 0.22).toFixed(3) + ")";
        var w = 6 + R1() * 40; g.fillRect(R1() * W, R1() * H, w, w * (0.3 + R1() * 0.7));
      }
      g.fillStyle = "rgba(0,0,0,0.30)";
      for (i = 0; i < W; i += 64) g.fillRect(i, 0, 1, H);
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
  /* fin plan: round nose (radius hw), flat sides to xs, then a taper to a rounded after end of
     half-width ha; CCW from above */
  function finPlan(x0, x1, xs, hw, ha) {
    var pts = [], i, a, n1 = 14, n2 = 6;
    for (i = 0; i <= n1; i++) { a = -PI / 2 + PI * i / n1; pts.push([x1 - hw + hw * Math.cos(a), hw * Math.sin(a)]); }
    pts.push([xs, hw]);
    for (i = 0; i <= n2; i++) { a = PI / 2 + PI * i / n2; pts.push([x0 + ha + ha * Math.cos(a), ha * Math.sin(a)]); }
    pts.push([xs, -hw]);
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
      skin:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.80, metalness: 0.08 }),
      deck:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE, "deck"), roughness: 0.92, metalness: 0.05 }),
      plate:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE, "plate"), roughness: 0.80, metalness: 0.08 }),
      below:  std(PAINT.below, 0.85, 0.05),   /* rudder, planes, skeg, bossings: anti-fouling */
      light:  std(PAINT.cap, 0.70, 0.15),     /* the bow cylinder, buoy rings */
      dark:   std(0x0b0c0d, 0.85, 0.10),      /* holes, windows, shutters, recesses */
      metal:  std(0x26292c, 0.55, 0.40),      /* dark masts, the planes in their slots */
      mastlt: std(0x8c9195, 0.45, 0.45),      /* bright periscope and aerial masts (d) */
      screw:  std(0x8a7140, 0.42, 0.70),      /* bronze */
      red:    std(0x8e2a20, 0.70, 0.05),      /* rescue buoys (d, p_pbow) */
      team:   std(team, 0.86, 0.06)
    };
  }

  /* free-flood holes, row 183-187 of d (z 1.05-1.43), [first, last column] per hole */
  var HOLES = [[158, 161], [164, 166], [170, 172], [196, 199], [202, 205], [208, 210], [267, 271],
    [279, 282], [296, 299], [302, 306], [308, 312], [338, 341], [343, 347], [349, 353], [361, 365],
    [398, 402], [404, 407], [410, 413], [416, 419], [431, 435], [437, 440], [443, 446], [456, 458],
    [461, 464], [475, 478], [499, 503], [518, 522], [524, 528], [529, 533], [535, 538], [541, 544],
    [547, 550], [552, 555], [565, 569], [571, 574], [577, 580], [589, 593], [595, 599], [650, 654],
    [656, 660], [662, 665], [692, 695], [697, 700], [713, 716], [718, 722], [724, 728], [730, 734],
    [736, 739], [764, 767], [769, 773], [775, 778], [795, 799], [801, 805], [807, 811]];
  /* low openings near the keel, rows 243-247 (z -4.3 to -4.7) */
  var LOWHOLES = [[294, 333], [406, 418], [537, 552], [854, 873]];

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, j, k, u, q;

    /* ---- hull loft: finer toward the ends; the aperture front is a step at u 4.3 ---- */
    var us = [0.0, 0.12, 0.3, 0.55, 0.85, 1.2, 1.7, 2.3, 2.9, 3.5, 4.0, UAP - 0.01, UAP + 0.01];
    u = 5.0;
    while (u < L - 0.05) {
      us.push(u);
      u += u < 16 ? 1.0 : (u < 30 ? 2.0 : (u < 76 ? 2.5 : (u < 86 ? 1.0 : (u < 88.6 ? 0.5 : (u < 90.6 ? 0.2 : 0.12)))));
    }
    us.push(L);
    var rings = [];
    for (i = 0; i < us.length; i++) {
      var s = section(us[i]), pts = [], uvs = [], uu = us[i] / L;
      for (j = 0; j < s.length; j++) { pts.push([s[j][0], s[j][1]]); uvs.push([uu, vOf(s[j][1], true)]); }
      for (j = s.length - 2; j >= 0; j--) { pts.push([-s[j][0], s[j][1]]); uvs.push([uu, vOf(s[j][1], false)]); }
      /* ring runs keel -> port -> deck -> starboard -> keel */
      rings.push({ x: X(us[i]), pts: pts, uv: uvs });
    }
    A.add("skin", ringLoft(THREE, rings, true, true), 0, 0, 0);

    /* ---- casing deck: a flat strip 2 cm over the hull's deck, stern to the bow cap ---- */
    var dps = [], dix = [], duv = [], n = 0;
    for (u = 4.8; u <= U(899) + 0.01; u += 1.0) {
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

    /* ---- free-flood holes, both sides, in the drawing's groups ---- */
    for (k = 0; k < HOLES.length; k++) {
      var ua = U(HOLES[k][0] - 0.5), ub = U(HOLES[k][1] + 0.5), um = (ua + ub) / 2, zh = Z(185);
      var yh = hullY(um, zh), na = hullNA(um, zh);
      for (i = -1; i <= 1; i += 2) box(THREE, A, "dark", ub - ua, 0.06, 0.40, X(um), i * (yh + 0.005), zh, i * na);
    }
    for (k = 0; k < LOWHOLES.length; k++) {
      var la = U(LOWHOLES[k][0]), lb = U(LOWHOLES[k][1]), nh = Math.max(2, Math.round((lb - la) / 0.55));
      for (j = 0; j < nh; j++) {
        var lu = la + (lb - la) * (j + 0.5) / nh, lz = -4.45, ly = hullY(lu, lz);
        for (i = -1; i <= 1; i += 2) box(THREE, A, "dark", 0.32, 0.06, 0.32, X(lu), i * (ly + 0.005), lz, i * hullNA(lu, lz));
      }
    }

    /* ---- rescue buoys: white ring, red dome (d columns 175 and 771) ---- */
    var BU = [U(175), U(771)];
    for (k = 0; k < BU.length; k++) {
      var zr = zTop(BU[k]) + 0.03;
      A.add("light", new THREE.CylinderGeometry(0.55, 0.55, 0.08, 20), X(BU[k]), 0, zr, PI / 2, 0, 0);
      A.add("red", new THREE.SphereGeometry(0.40, 14, 6, 0, 2 * PI, 0, PI / 2), X(BU[k]), 0, zr + 0.04, PI / 2, 0, 0);
    }
    /* ---- retractable bollards in pairs (d columns 799-810, 833-843, 208-218) ---- */
    var BO = [U(800), U(809), U(834), U(842), U(209), U(217)];
    for (k = 0; k < BO.length; k++) {
      var zb0 = zTop(BO[k]);
      cylZ(THREE, A, "metal", 0.11, 0.11, 0.40, 8, X(BO[k]), 0.75, zb0 + 0.2);
      box(THREE, A, "metal", 0.12, 0.42, 0.07, X(BO[k]), 0.75, zb0 + 0.40);
    }
    /* ---- the small open frame on the casing abaft the fin (d columns 352-385, 0.6 m high) ---- */
    for (i = -1; i <= 1; i += 2) {
      var fa0 = U(352), fb0 = U(385), fz = Z(170.5);
      strut(THREE, A, "metal", 0.04, [X(fa0), i * 0.8, zTop(fa0)], [X(fa0), i * 0.8, fz], 6);
      strut(THREE, A, "metal", 0.04, [X(fb0), i * 0.8, zTop(fb0)], [X(fb0), i * 0.8, fz], 6);
      strut(THREE, A, "metal", 0.04, [X(fa0), i * 0.8, fz], [X(fb0), i * 0.8, fz], 6);
    }
    /* the stern light housing on the casing (d columns 48-55) */
    box(THREE, A, "plate", 0.75, 0.45, 0.30, X(U(51.5)), 0, zTop(U(51.5)) + 0.12);

    /* ---- the bow cylinder: 2.2 m across, 1.4 m high, a narrow head (d 898-922; p_dock) ---- */
    var bu = U(909.5), bz = zTop(bu);
    cylZ(THREE, A, "light", 1.02, 1.10, Z(154) - bz + 0.1, 24, X(bu), 0, (bz - 0.1 + Z(154)) / 2);
    A.add("light", new THREE.SphereGeometry(1.02, 24, 4, 0, 2 * PI, 0, PI / 2), X(bu), 0, Z(154), PI / 2, 0, 0, [1, 0.22, 1]);
    cylZ(THREE, A, "light", 0.26, 0.33, Z(147) - Z(154), 12, X(U(918.5)), 0, (Z(147) + Z(154)) / 2 + 0.1);

    /* ---- bow planes folded into their slots, high in the casing side (d 814-848, rows 181-187) ---- */
    for (i = -1; i <= 1; i += 2) {
      var pa = U(814), pb = U(848), pz = Z(184), pm = (pa + pb) / 2, py = hullY(pm, pz), pn = hullNA(pm, pz);
      box(THREE, A, "dark", pb - pa, 0.08, 0.55, X(pm), i * (py + 0.01), pz, i * pn);
      box(THREE, A, "metal", pb - pa - 0.4, 0.10, 0.30, X(pm - 0.1), i * (py + 0.04), pz - 0.04, i * pn);
      A.add("dark", new THREE.SphereGeometry(1.0, 10, 6), X(pa + 0.15), i * (py + 0.01), pz, 0, 0, 0, [0.35, 0.05, 0.28]);
    }
    /* ---- anchor recess on the starboard bow (d 880-898, rows 191-197; p_vyt) ---- */
    var au = U(889), az = Z(194), ay = hullY(au, az);
    box(THREE, A, "dark", 1.6, 0.06, 0.62, X(au), -(ay + 0.01), az, -hullNA(au, az));
    box(THREE, A, "metal", 1.2, 0.10, 0.18, X(au), -(ay + 0.03), az, -hullNA(au, az));

    /* ---- torpedo-tube shutters on the stem, three a side (d 913-936, rows 200-226; p_vyt) ---- */
    var SH = [[Z(203.5), 0.62], [Z(212.5), 0.62], [Z(221.5), 0.62]];
    for (k = 0; k < SH.length; k++) {
      var sz = SH[k][0], sa = U(913), sb = xStem(sz) - 0.35, sm = (sa + sb) / 2, nsg = 4;
      for (j = 0; j < nsg; j++) {
        var s0 = sa + (sb - sa) * j / nsg, s1 = sa + (sb - sa) * (j + 1) / nsg, smid = (s0 + s1) / 2;
        var sy = hullY(smid, sz), sy0 = hullY(s0, sz), sy1 = hullY(s1, sz), yaw = Math.atan2(sy0 - sy1, s1 - s0);
        for (i = -1; i <= 1; i += 2) {
          A.add("dark", new THREE.BoxGeometry(Math.hypot(s1 - s0, sy1 - sy0), 0.05, 0.05), X(smid), i * (sy + 0.01), sz + SH[k][1] / 2, 0, 0, -i * yaw);
          A.add("dark", new THREE.BoxGeometry(Math.hypot(s1 - s0, sy1 - sy0), 0.05, 0.05), X(smid), i * (sy + 0.01), sz - SH[k][1] / 2, 0, 0, -i * yaw);
        }
      }
      for (i = -1; i <= 1; i += 2) {
        box(THREE, A, "dark", 0.05, 0.06, SH[k][1], X(sa), i * (hullY(sa, sz) + 0.01), sz);
      }
    }
    /* ---- two oval stern-tube shutters a side on the stern quarter (d 27-68, rows 202-216) ---- */
    var TS = [[Z(205), 0.55], [Z(213), 0.50]];
    for (k = 0; k < TS.length; k++) {
      var tu = U(48), tz = TS[k][0], ty = hullY(tu, tz);
      for (i = -1; i <= 1; i += 2)
        A.add("dark", new THREE.SphereGeometry(1.0, 12, 6), X(tu), i * (ty + 0.0), tz, 0, 0, i * 0.09, [2.0, 0.07, TS[k][1] / 2]);
    }

    /* ---- stern: rudder and the plate over the aperture, sole piece and skeg (d) ---- */
    var RD = [[0.0, -1.43], [UAP + 0.05, -2.1], [UAP + 0.05, -2.25], [U(32), -2.25], [U(32), Z(245)],
              [0.12, Z(245)], [0.0, Z(243)]];
    var rg = ext(THREE, RD.map(function (p) { return [X(p[0]), p[1]]; }), 0.42, true); rg.translate(0, 0.21, 0);
    A.add("below", rg, 0, 0, 0);
    for (i = -1; i <= 1; i += 2) box(THREE, A, "dark", 0.04, 0.03, 2.2, X(U(30)), i * 0.215, -3.4);   /* rudder hinge */
    var SK = [[U(13), Z(246)], [U(13), Z(250)], [U(200), Z(251.3)], [U(200), Z(249)], [UAP + 0.1, -4.3], [UAP + 0.1, Z(246)]];
    var skg = ext(THREE, SK.map(function (p) { return [X(p[0]), p[1]]; }), 0.50, true); skg.translate(0, 0.25, 0);
    A.add("below", skg, 0, 0, 0);

    /* ---- three screws: the centre one in the aperture, the wing ones on long bossings ---- */
    var bl = [[-0.10, 0.20], [-0.26, 0.45], [-0.34, 0.72], [-0.24, 0.93], [0.02, 1.0], [0.22, 0.86], [0.24, 0.58], [0.10, 0.22]];
    function screw(ux, y, z, rad) {
      cylX(THREE, A, "screw", 0.22, 0.12, 0.7, 14, X(ux), y, z);
      A.add("screw", new THREE.SphereGeometry(0.13, 10, 6), X(ux - 0.35), y, z);
      for (var b = 0; b < 4; b++) {
        var gb = ext(THREE, bl.map(function (p) { return [p[0] * rad, p[1] * rad]; }), 0.05);
        gb.translate(0, 0, -0.025);
        gb.rotateY(0.8);
        A.add("screw", gb, X(ux), y, z, b * PI / 2 + 0.4, 0, 0);
      }
    }
    var CZ = Z(232.3), WZ = Z(231), WY = 2.2;
    cylX(THREE, A, "metal", 0.12, 0.12, UAP - 3.6, 10, X((UAP + 3.6) / 2), 0, CZ);
    screw(U(40.3), 0, CZ, 0.80);
    for (i = -1; i <= 1; i += 2) {
      /* bossing: from the hull at u 15 tapering aft to the screw (d 82-148, rows 222-233) */
      var bq = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-1, 0, 0));
      A.addQ("below", new THREE.CylinderGeometry(0.48, 0.20, 11.0 - 8.0, 14, 1, false), X(9.5), i * WY, WZ, bq);
      A.addQ("below", new THREE.CylinderGeometry(0.30, 0.48, 15.5 - 11.0, 14, 1, false), X(13.25), i * (WY - 0.1), WZ, bq);
      cylX(THREE, A, "metal", 0.11, 0.11, 0.6, 10, X(7.75), i * WY, WZ);
      screw(U(78), i * WY, WZ, 0.86);
      /* stern plane behind the wing screw, at the shaft height (d 50-72, rows 226-233) */
      var y0 = hullY(5.6, Z(229.5)) - 0.1, sp = [[X(U(50)), i * y0], [X(U(72)), i * y0], [X(U(70)), i * 3.4], [X(U(53)), i * 3.4]];
      if (i < 0) sp.reverse();
      var spg = ext(THREE, sp, 0.20); spg.translate(0, 0, Z(229.5) - 0.10);
      A.add("below", spg, 0, 0, 0);
    }

    /* ---- the fin: upright round nose, after edge raked into a concave fillet (d 485-623) ---- */
    var FN = U(622.5), FT = Z(127), FB = zTop(U(550));
    function finAft(z) {                                    /* after edge, metres from the stern */
      if (z <= FB) return U(485);
      if (z < Z(165)) { var f = (z - FB) / (Z(165) - FB); return U(485) + (U(497) - U(485)) * Math.sqrt(f); }
      return U(497) + (U(509) - U(497)) * (z - Z(165)) / (FT - Z(165));
    }
    var LV = [FB - 0.5, FB, FB + 0.15, FB + 0.4, Z(165), 4.0, 5.0, FT - 0.9, FT - 0.6, FT - 0.4, FT - 0.22, FT - 0.08, FT];
    var frs = [];
    for (i = 0; i < LV.length; i++) {
      var zl = LV[i], e2 = clamp((zl - (FT - 0.45)) / 0.45, 0, 1), ee = 1 - Math.sqrt(1 - e2 * e2);
      var w2 = clamp((zl - (FT - 0.9)) / 0.9, 0, 1), ew = 1 - Math.sqrt(1 - w2 * w2);   /* bullet top, p_ctf */
      var hwf = 1.30 - 0.15 * clamp((zl - FB) / (FT - FB), 0, 1) - ew * 0.62;
      var fl = zl < FB + 0.4 ? 0.35 * (1 - clamp((zl - FB) / 0.4, 0, 1)) : 0;      /* foot flare */
      var xn = FN - ee * 0.9 - (zl > 6.0 ? (zl - 6.0) * 0.9 : 0);
      frs.push({ z: zl, pts: finPlan(X(finAft(zl)) + ee * 0.3, X(xn), X(U(560)), hwf + fl, Math.min(hwf, 0.55) + fl * 0.5) });
    }
    A.add("plate", shell(THREE, frs), 0, 0, 0);
    /* the raised after step, overhanging the raked edge (d 503-544, rows 118-127; p_stb) */
    var ar = [], av = [FT - 0.1, Z(122), Z(119.5), Z(118)];
    for (i = 0; i < av.length; i++) {
      var sh2 = i === av.length - 1 ? 0.12 : 0;
      ar.push({ z: av[i], pts: finPlan(X(U(503)) + sh2, X(U(544)) - sh2, X(U(536)), 0.82 - sh2, 0.62 - sh2) });
    }
    A.add("plate", shell(THREE, ar), 0, 0, 0);
    /* the open bridge well forward on the top (p_stb: men stand in it) */
    box(THREE, A, "dark", 3.0, 1.5, 0.05, X(FN - 2.6), 0, FT + 0.01);
    function onFin(u2, z2) {                                /* fin half-width at a point on its side */
      var w2 = clamp((z2 - (FT - 0.9)) / 0.9, 0, 1), ew = 1 - Math.sqrt(1 - w2 * w2);
      var hw2 = 1.30 - 0.15 * clamp((z2 - FB) / (FT - FB), 0, 1) - ew * 0.62, ha2 = Math.min(hw2, 0.55);
      var xa = finAft(z2) + ha2, xs2 = U(560);
      return u2 >= xs2 ? hw2 : ha2 + (hw2 - ha2) * clamp((u2 - xa) / (xs2 - xa), 0, 1);
    }
    for (i = -1; i <= 1; i += 2) {
      /* three tall windows high aft (d 524-540, rows 130-140) */
      for (k = 0; k < 3; k++) {
        var wu = U(526 + k * 5.5), wa = Math.atan2(onFin(wu + 0.3, Z(135)) - onFin(wu - 0.3, Z(135)), 0.6);
        A.add("dark", new THREE.BoxGeometry(0.30, 0.05, 0.92), X(wu), i * (onFin(wu, Z(135)) + 0.01), Z(135), 0, 0, i * wa);
      }
      /* the door low on the side, the rubbing strake, the ladder rungs, the side light, two ports */
      box(THREE, A, "dark", 0.60, 0.05, 1.20, X(U(561)), i * (onFin(U(561), Z(164.5)) + 0.005), Z(164.5));
      for (u = U(499); u < U(620) - 0.5; u += 1.0) {                 /* rubbing strake, following the plan */
        var sa2 = Math.atan2(onFin(u + 1.0, Z(165)) - onFin(u, Z(165)), 1.0);
        A.add("dark", new THREE.BoxGeometry(1.02, 0.05, 0.05), X(u + 0.5), i * (onFin(u + 0.5, Z(165)) + 0.01), Z(165), 0, 0, i * sa2);
      }
      for (k = 0; k < 9; k++) box(THREE, A, "metal", 0.30, 0.10, 0.04, X(U(592)), i * (onFin(U(592), 2.6 + k * 0.48) + 0.04), 2.6 + k * 0.48);
      box(THREE, A, "dark", 0.65, 0.10, 0.40, X(U(579)), i * (onFin(U(579), 4.5) + 0.04), Z(150.5));
      for (k = 0; k < 2; k++) cylX(THREE, A, "dark", 0.12, 0.12, 0.02, 8, X(U(578 + k * 6)), i * (onFin(U(580), 2.8) + 0.01), Z(169));
    }
    /* windows round the nose: four big low, five small high (p_ctf; d rows 147-157 and 137-142) */
    var NR = [[Z(152), 0.95, 0.52, [-0.95, -0.33, 0.33, 0.95]], [Z(139.5), 0.48, 0.40, [-1.1, -0.55, 0, 0.55, 1.1]]];
    for (k = 0; k < NR.length; k++) {
      var wz = NR[k][0], hwn = Math.max(0.3, 1.30 - 0.15 * clamp((wz - FB) / (FT - FB), 0, 1));
      for (j = 0; j < NR[k][3].length; j++) {
        var an = NR[k][3][j], wx = X(FN) - hwn + (hwn + 0.005) * Math.cos(an), wy = (hwn + 0.005) * Math.sin(an);
        A.add("dark", new THREE.BoxGeometry(0.05, NR[k][2], NR[k][1]), wx, wy, wz, 0, 0, an);
      }
    }

    /* ---- masts as drawn (d columns, tops by row), all on the centreline ---- */
    var MZ = FT - 0.05;
    /* the tall aerial mast at the after edge, foot on the casing (p_aer: hinged to the fin) */
    var mu = U(507);
    strut(THREE, A, "metal", 0.20, [X(mu), 0, zTop(mu)], [X(mu), 0, Z(64)], 10, 0.12);
    strut(THREE, A, "metal", 0.05, [X(mu), 0, Z(64)], [X(mu), 0, Z(3)], 6, 0.02);
    box(THREE, A, "metal", 0.8, 0.35, 0.30, X(mu + 0.35), 0, FT - 0.4);                    /* hinge bracket */
    cylZ(THREE, A, "metal", 0.32, 0.38, 0.6, 10, X(mu), 0, zTop(mu) + 0.3);                 /* foot */
    var ML = [[541, 67, 0.07, "mastlt", "band"], [551, 90, 0.08, "mastlt", "hook"], [561, 90, 0.10, "mastlt", "dome"],
              [566, 100, 0.05, "metal", "tip"], [582, 63, 0.03, "mastlt", "tip"], [585, 82, 0.07, "mastlt", "knob"],
              [597, 90, 0.08, "mastlt", "spike"]];
    for (k = 0; k < ML.length; k++) {
      var m = ML[k], mx = X(U(m[0])), mt = Z(m[1]), mr = m[2], mm = m[3], hd = m[4];
      strut(THREE, A, mm, mr, [mx, 0, MZ], [mx, 0, mt], 8);
      if (hd === "hook") {
        strut(THREE, A, mm, 0.06, [mx, 0, mt], [mx - 0.15, 0, mt + 0.45], 6);
        strut(THREE, A, mm, 0.05, [mx - 0.15, 0, mt + 0.45], [mx + 0.12, 0, mt + 0.62], 6);
      } else if (hd === "dome") {
        cylZ(THREE, A, mm, 0.21, 0.17, 0.7, 12, mx, 0, mt + 0.35);
        A.add(mm, new THREE.SphereGeometry(0.21, 12, 6), mx, 0, mt + 0.7);
      } else if (hd === "band") {
        cylZ(THREE, A, "dark", 0.10, 0.10, 0.25, 8, mx, 0, Z(86));
      } else if (hd === "knob") {
        A.add(mm, new THREE.SphereGeometry(0.11, 8, 6), mx, 0, Z(85));
      } else if (hd === "spike") {
        strut(THREE, A, mm, 0.05, [mx, 0, mt], [mx, 0, Z(78)], 6, 0.015);
      }
    }
    /* the loop aerial on the top (d 555-562, rows 113-127) */
    A.add("mastlt", new THREE.TorusGeometry(0.33, 0.04, 6, 18), X(U(558.5)), 0, Z(118.5), PI / 2, 0, 0, [1, 1, 1.6]);
    strut(THREE, A, "mastlt", 0.04, [X(U(558.5)), 0, MZ], [X(U(558.5)), 0, Z(118.5)], 6);
    /* the snorkel: thick tube, head valve, the fore box (d 567-589, rows 89-117) */
    var su = U(572);
    strut(THREE, A, "metal", 0.38, [X(su), 0, MZ], [X(su), 0, Z(95)], 14);
    box(THREE, A, "metal", U(582) - U(566), 0.80, Z(89) - Z(100), X((U(566) + U(582)) / 2), 0, (Z(89) + Z(100)) / 2);
    box(THREE, A, "metal", U(581) - U(576), 0.45, Z(98) - Z(117), X((U(576) + U(581)) / 2), 0, (Z(98) + Z(117)) / 2);
    A.add("metal", new THREE.SphereGeometry(0.20, 10, 5, 0, 2 * PI, 0, PI / 2), X(U(594)), 0, FT, PI / 2, 0, 0);

    /* ---- modest team strips: two flat panels on the casing, 2 cm over the deck strip ---- */
    box(THREE, A, "team", 2.6, 0.9, 0.04, X(70.0), 0, zTop(70.0) + 0.05);
    box(THREE, A, "team", 2.6, 0.9, 0.04, X(25.0), 0, zTop(25.0) + 0.05);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length of 91.3 m: render3d scales a submarine by it. */
UNIT_MODELS["pact_e60_sub"] = {
  len: 91.3,
  build: function (THREE, M, C) { return HeroFoxtrot641.build(THREE, M, C); }
};
