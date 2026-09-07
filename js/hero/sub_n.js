/* ============ sub_n.js -- HERO reference model: Los Angeles-class SSN ============
   Style and period anchor for the whole submarine family (e20 / modern USN).

   What has to read at a glance, measured off the references in
   scratchpad/ref (la688_prof.png elevation, la688_draw.png cutaway,
   la_3d.png elevation + PLAN with a scale bar, la_photo.jpg aerial,
   la_topeka_uw.jpg bow quarter):

     - An ALBACORE TEARDROP. Bluff, almost hemispherical bow that is at full
       10 m diameter only 12 per cent of the length aft of the stem, a long
       parallel midbody that holds that diameter from 25 to 67 per cent, and
       then one continuous fine run aft to a slim tail cone. Measured off the
       elevation: r = 5.03 m from s = 0.25 to s = 0.67, 4.34 at s = 0.84,
       3.30 at s = 0.92, 2.02 at s = 0.974. Those numbers are the station
       table below; the parametric boats in units3d_subs.js use a formula
       that makes the run aft far too short and the bow too pointed.
     - A TALL FAIRED SAIL SET WELL FORWARD. On the plan its top is a lens:
       round leading edge, chord tapering to a fine point aft. Centre at
       x = +21.0 m, which is 31 per cent of the length back from the stem --
       just forward of a third, exactly as the brief says. 8.4 m chord at the
       base, 5.45 m tall, and it narrows from 3.5 m wide at the casing to
       1.7 m at the top, so it is a faired tower and not a slab.
     - DIVING PLANES ON THE SAIL. The plan view settles this: a swept surface
       whose root leading edge is level with the sail's own leading edge and
       whose trailing edge is straight, spanning only +/- 4.6 m -- narrower
       than the hull, which is why they read as small from above.
     - FIVE MASTS, two of them run right up. Off the elevation the tallest is
       7.2 m above the sail top, the next 6.3 m, and one carries the ball
       radome that the Topeka photograph shows so plainly.
     - A CRUCIFORM STERN with a taller upper rudder than lower, big
       rectangular stern planes on a swept root fillet, and a single skewed
       seven-bladed screw abaft the lot.
     - TWELVE VLS HATCHES in the forward casing in the 2-4-4-2 pattern the
       plan view calls out, which is what makes this a post-SSN-719 boat.
     - ANECHOIC TILES: matte, near-black, a faint rectangular panel grid,
       tonal patchwork where tiles have been replaced, NOT glossy.

   Model space: +X bow, +Y port, +Z up. Real metres, waterline at z = 0.
   The hull axis sits at z = -3.60 so the crown of the pressure hull stands
   1.43 m proud and the boat draws 8.63 m, which is the ballast-blown
   surfaced trim in the aerial photograph rather than the awash trim.

   Materials are the house three tiers only: SKIN (textured, roughness 0.90,
   metalness 0.06 -- and 0.95 for the non-skid casing), METAL (masts, screw,
   safety-line stanchions), GLASS (the bridge clamshell windscreen).

   Two things measured on the renderer while building this:

   1. M.loft winds its quads (a, c, b), which puts the face normal radially
      INWARD -- at the +Y seam the tangent is +Z and X x Z = -Y. Under a
      FrontSide material you therefore see the far inner wall of the body and
      the shading comes out inverted. Every lofted body here goes through
      body() below, which flips the winding and recomputes normals.
   2. The loft's UVs are u = along the length from the FIRST section, v =
      around the girth with v = 0.25 at the crown and v = 0.75 at the keel.
      The waterline is therefore not a straight line in texture space: it is
      v = asin(3.60 / r(x)) / 2pi, which closes up completely wherever the
      hull is thinner than 7.2 m. hullTex() solves that per column, so the
      boot-topping actually follows the hull instead of cutting across it.

   ASCII only: a stray byte in a hex literal has broken this project before. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLosAngeles = (function () {
  "use strict";

  var PI = Math.PI;

  /* ------------------------------------------------- principal dimensions */
  var X_BOW   = 55.0;          /* stem                                      */
  var X_TAIL  = -52.0;         /* end of the tail cone                      */
  var HULL_L  = X_BOW - X_TAIL;/* 107.0 m of hull                           */
  var R       = 5.03;          /* max hull radius (10.06 m diameter)        */
  var ZA      = -3.60;         /* hull axis below the waterline             */
  var Z_TOP   = ZA + R;        /* 1.43 -- crown of the hull                 */
  var Z_DECK  = Z_TOP + 0.08;  /* top of the casing                         */

  var X_SAIL  = 21.0;          /* sail centre: 31 per cent aft of the stem  */
  var SAIL_C  = 4.22;          /* half chord at the base                    */
  var SAIL_W  = 2.12;          /* lens half-width parameter (0.84 of it is
                                  the real half-width -- see lens())        */
  var SAIL_H  = 5.45;          /* sail height above the casing              */
  var Z_SAILT = Z_DECK + SAIL_H;

  var X_PROP  = -53.4;         /* screw plane                               */
  var PROP_R  = 2.58;

  /* Station table: [s, r] with s the fraction of HULL_L aft of the stem.
     Read off la688_prof.png and la_3d.png and normalised to R = 5.03. */
  var STA = [
    [0.000, 0.06], [0.004, 0.95], [0.010, 1.55], [0.018, 2.08], [0.028, 2.58],
    [0.040, 3.02], [0.054, 3.40], [0.070, 3.72], [0.088, 4.02], [0.108, 4.30],
    [0.130, 4.54], [0.155, 4.74], [0.182, 4.88], [0.212, 4.97], [0.250, 5.02],
    [0.300, 5.03], [0.360, 5.03], [0.420, 5.03], [0.480, 5.03], [0.540, 5.03],
    [0.590, 5.03], [0.632, 5.03], [0.670, 5.02], [0.705, 4.98], [0.735, 4.91],
    [0.765, 4.80], [0.793, 4.66], [0.818, 4.52], [0.842, 4.34], [0.864, 4.13],
    [0.885, 3.87], [0.904, 3.60], [0.921, 3.30], [0.937, 2.98], [0.951, 2.65],
    [0.963, 2.34], [0.974, 2.02], [0.983, 1.72], [0.990, 1.44], [0.995, 1.20],
    [0.998, 1.05], [1.000, 0.95]
  ];

  function hullR(x) {
    var s = (X_BOW - x) / HULL_L, i;
    if (s <= 0) return STA[0][1];
    if (s >= 1) return STA[STA.length - 1][1];
    for (i = 1; i < STA.length; i++) {
      if (s <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i];
        var t = (s - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return STA[STA.length - 1][1];
  }
  function hullTop(x) { return ZA + hullR(x); }

  /* ------------------------------------------------------------- helpers */
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }

  /* A lofted body with its winding flipped so the skin faces outward. */
  function body(THREE, M, secs, segs) {
    var g = M.loft(THREE, secs, segs);
    var ix = g.getIndex(), a = ix.array, i, t;
    for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
    ix.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }

  /* A closed shell lofted between horizontal outlines stacked in z. Used for
     the sail, which wants a lens section that changes shape with height and
     is not a body of revolution. Points run counter-clockwise seen from
     above, so (a, b, c) with c one level up gives an outward normal. */
  function shell(THREE, rings) {
    var N = rings[0].pts.length, L = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p;
    /* u runs in METRES of arc round the outline and v in metres of height,
       so the shared tile texture keeps its 1.4 m pitch on the sail instead
       of stretching one whole hull-length of tiles round a 17 m girth. */
    for (i = 0; i < L; i++) {
      var run = 0, prevp = rings[i].pts[0];
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        run += Math.sqrt((p[0] - prevp[0]) * (p[0] - prevp[0]) +
                         (p[1] - prevp[1]) * (p[1] - prevp[1]));
        prevp = p;
        pos.push(p[0], p[1], rings[i].z);
        uv.push(run, rings[i].z);
      }
    }
    for (i = 0; i < L - 1; i++) {
      for (j = 0; j < N; j++) {
        var q = i * ring + j;
        idx.push(q, q + 1, q + ring, q + 1, q + ring + 1, q + ring);
      }
    }
    /* caps: a fan about the outline centroid at each end */
    function cap(level, up) {
      var base = pos.length / 3, cx = 0, cy = 0, k;
      for (k = 0; k < N; k++) { cx += rings[level].pts[k][0]; cy += rings[level].pts[k][1]; }
      cx /= N; cy /= N;
      pos.push(cx, cy, rings[level].z); uv.push(cx, cy);
      for (k = 0; k < N; k++) {
        p = rings[level].pts[k];
        pos.push(p[0], p[1], rings[level].z);
        uv.push(p[0], p[1]);
      }
      for (k = 0; k < N; k++) {
        var m = base + 1 + k, n = base + 1 + ((k + 1) % N);
        if (up) idx.push(base, m, n); else idx.push(base, n, m);
      }
    }
    cap(L - 1, true);
    cap(0, false);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* Sail plan outline: elliptical round nose forward, cusped fine tail aft.
     The pinch factor peaks at about 0.84 of hw, just forward of centre. */
  function lens(cx, ch, hw, n, tail) {
    var pts = [], i, th, f;
    for (i = 0; i < n; i++) {
      th = i / n * PI * 2;
      f = Math.pow((1 + Math.cos(th)) * 0.5, tail);
      pts.push([cx + ch * Math.cos(th), hw * Math.sin(th) * f]);
    }
    return pts;
  }

  function box(THREE, g, sx, sy, sz, mat, x, y, z) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(x, y, z); g.add(m); return m;
  }
  function tubeX(THREE, g, r1, r2, len, seg, mat, x, y, z) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), mat);
    m.rotation.z = -PI / 2;                /* cylinder axis +Y -> +X        */
    m.position.set(x, y, z); g.add(m); return m;
  }
  function post(THREE, g, r1, r2, len, seg, mat, x, y, z) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), mat);
    m.rotation.x = PI / 2;                 /* cylinder axis +Y -> +Z        */
    m.position.set(x, y, z); g.add(m); return m;
  }

  /* ============================================================= textures */
  var TEX = {};

  /* ---- hull skin. u = stern..bow, v = around the girth (0.25 crown). ---- */
  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var W = 1024, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(20347), i, j, x, r, wl, y0, y1;

    /* base: black rubber anechoic coating, not paint */
    g.fillStyle = "#23262a"; g.fillRect(0, 0, W, H);

    /* tonal patchwork -- replacement tile panels never match the old ones */
    for (i = 0; i < 190; i++) {
      g.globalAlpha = 0.014 + R1() * 0.030;
      g.fillStyle = R1() < 0.55 ? "#ffffff" : "#000000";
      g.fillRect(R1() * W, R1() * H, 22 + R1() * 96, 12 + R1() * 36);
    }
    g.globalAlpha = 1;

    /* the tile grid itself: the submarine equivalent of plate seams, laid in
       horizontal strakes along the length and vertical butts around the
       girth. Kept faint -- on a photograph you can only just see it. */
    var tw = 13, th = 21;
    for (j = 0; j < H; j += th) {
      for (i = 0; i < W; i += tw) {
        var off = ((j / th) | 0) % 2 ? tw * 0.5 : 0;
        g.fillStyle = "rgba(255,255,255," + (0.008 + R1() * 0.018).toFixed(3) + ")";
        g.fillRect(i + off + 1, j + 1, tw - 2, th - 2);
        if (R1() < 0.014) {                    /* a tile has come away      */
          g.fillStyle = "rgba(104,96,84,0.22)";
          g.fillRect(i + off + 1, j + 1, tw - 2, th - 2);
        }
      }
    }
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1;
    for (j = 0; j <= H; j += th) { g.beginPath(); g.moveTo(0, j); g.lineTo(W, j); g.stroke(); }
    for (i = 0; i <= W; i += tw) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }

    /* heavier frame bands every 6 m or so, which do show in photographs */
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.8;
    for (i = 0; i < W; i += 58) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }

    /* ---- boot topping and anti-fouling, solved column by column ----
       Above water is v in (wl, 0.5 - wl) with wl = asin(-ZA / r) / 2pi; where
       the hull is thinner than 2 * -ZA there is no above-water band at all,
       so the bow and the tail cone go under completely, which is exactly
       what the aerial photograph shows. */
    for (i = 0; i < W; i++) {
      x = X_TAIL + (i + 0.5) / W * HULL_L;
      r = hullR(x);
      wl = (r > -ZA) ? Math.asin(-ZA / r) / (PI * 2) : 0.25;
      y0 = wl * H; y1 = (0.5 - wl) * H;
      /* Underwater body: anti-fouling, but held to a whisper of warmth and a
         genuine darkening. The first pass laid this on at 0.40 alpha and the
         whole boat came out rust brown, which throws away the one cue that
         matters most -- a modern SSN is matte near-black rubber. */
      g.fillStyle = "rgba(26,18,16,0.26)";
      g.fillRect(i, 0, 1, y0);
      g.fillRect(i, y1, 1, H - y1);
      /* boot topping: a hard near-black band just under the waterline */
      g.fillStyle = "rgba(6,7,9,0.70)";
      g.fillRect(i, Math.max(0, y0 - 7), 1, 7);
      g.fillRect(i, y1, 1, 7);
    }

    /* ---- free-flood holes in two runs along the casing edge, and rows of
       limber holes low on the bow, both of which stain downward ---- */
    function holeRun(vc, x0, x1, step, w, h) {
      var px, yy = vc * H;
      for (px = x0; px < x1; px += step) {
        g.fillStyle = "rgba(0,0,0,0.72)";
        g.fillRect(px, yy, w, h);
      }
    }
    holeRun(0.163, 120, 900, 17, 8, 5);
    holeRun(0.337, 120, 900, 17, 8, 5);
    holeRun(0.120, 830, 985, 12, 7, 4);
    holeRun(0.380, 830, 985, 12, 7, 4);

    /* rust and salt streaks running DOWN from the ports -- away from the
       crown at v = 0.25 in both directions */
    for (i = 0; i < 110; i++) {
      var sx = 110 + R1() * 880;
      var up = R1() < 0.5;
      var sy = up ? 0.168 * H : 0.332 * H;
      var len = 8 + R1() * 30;
      g.fillStyle = "rgba(104,66,40," + (0.04 + R1() * 0.09).toFixed(3) + ")";
      g.fillRect(sx, up ? sy - len : sy, 1.6 + R1() * 2.4, len);
    }
    /* wash staining that gets heavier aft, and a dark plume abaft the sail
       where the fin sheds spray down the casing */
    var gr = g.createLinearGradient(W, 0, 0, 0);
    gr.addColorStop(0, "rgba(12,14,15,0.00)");
    gr.addColorStop(1, "rgba(12,14,15,0.30)");
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    var sg = g.createLinearGradient(760, 0, 560, 0);
    sg.addColorStop(0, "rgba(8,9,10,0.34)");
    sg.addColorStop(1, "rgba(8,9,10,0.00)");
    g.fillStyle = sg; g.fillRect(560, 0.18 * H, 200, 0.14 * H);

    /* draft marks forward and aft, the one piece of white on the hull */
    g.fillStyle = "rgba(206,212,214,0.55)";
    g.font = "bold 10px sans-serif";
    for (i = 0; i < 5; i++) {
      g.fillText(String(30 - i * 2), 942, 0.150 * H + i * 9);
      g.fillText(String(30 - i * 2), 942, 0.350 * H - i * 9);
      g.fillText(String(20 - i * 2), 108, 0.150 * H + i * 9);
      g.fillText(String(20 - i * 2), 108, 0.350 * H - i * 9);
    }

    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    TEX.hull = t;
    return t;
  }

  /* ---- casing non-skid ---- */
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 512, H = 128, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(9871), i;
    g.fillStyle = "#1b1e21"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 5200; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.10)";
      g.fillRect(R1() * W, R1() * H, 1.6, 1.6);
    }
    g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 1.4;
    for (i = 0; i < W; i += 21) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
    g.beginPath(); g.moveTo(0, H * 0.5); g.lineTo(W, H * 0.5); g.stroke();
    for (i = 0; i < 26; i++) {
      g.strokeStyle = "rgba(0,0,0,0.35)";
      g.strokeRect(R1() * W, R1() * H, 8 + R1() * 16, 5 + R1() * 8);
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.repeat.set(9, 1);
    TEX.deck = t;
    return t;
  }

  /* ---- seamless anechoic tile patch for parts whose UVs are in metres:
     the sail shell and every M.slab control surface. ExtrudeGeometry hands
     back raw shape coordinates as UVs, so wrapping the 107 m hull map onto a
     12 m rudder quilted it into a chequerboard; this patch is 2.8 m square
     and repeats honestly. ---- */
  function tileTex(THREE) {
    if (TEX.tile) return TEX.tile;
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d");
    var R1 = rng(5521), i, j;
    /* Tone matched to the HULL AFTER its anti-fouling wash, not to the raw
       base: the first pass left every control surface a visibly lighter grey
       than the body they grow out of. */
    g.fillStyle = "#1d2023"; g.fillRect(0, 0, S, S);
    for (j = 0; j < 2; j++) {
      for (i = 0; i < 2; i++) {
        g.fillStyle = "rgba(255,255,255," + (0.010 + R1() * 0.022).toFixed(3) + ")";
        g.fillRect(i * 64 + 2, j * 64 + 2, 60, 60);
      }
    }
    for (i = 0; i < 900; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.020)" : "rgba(0,0,0,0.05)";
      g.fillRect(R1() * S, R1() * S, 2, 2);
    }
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.6;
    for (i = 0; i <= S; i += 64) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i, S); g.stroke();
      g.beginPath(); g.moveTo(0, i); g.lineTo(S, i); g.stroke();
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.repeat.set(1 / 2.8, 1 / 2.8);
    t.anisotropy = 8;
    TEX.tile = t;
    return t;
  }

  /* ---- the hull number carried on the sail ---- */
  function numTex(THREE) {
    if (TEX.num) return TEX.num;
    var W = 256, H = 128, cv = cvs(W, H), g = cv.getContext("2d");
    g.fillStyle = "#1d2023"; g.fillRect(0, 0, W, H);
    g.fillStyle = "rgba(214,220,222,0.72)";
    g.font = "bold 104px sans-serif";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText("688", W * 0.5, H * 0.54);
    var t = new THREE.CanvasTexture(cv);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX.num = t;
    return t;
  }

  /* ============================================================ materials */
  function mats(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    /* The raw team colour under a 1.4 key with ACES tone mapping came back
       as a white-hot ring that swallowed the sail. Two thirds of it still
       reads as the same hue and sits inside the boat's value range. */
    var teamCol = new THREE.Color(team).multiplyScalar(0.62);
    return {
      /* 1. SKIN */
      skin: new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: 0.90, metalness: 0.06, map: hullTex(THREE) }),
      tile: new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: 0.90, metalness: 0.06, map: tileTex(THREE) }),
      plain: new THREE.MeshStandardMaterial({
        color: 0x282c30, roughness: 0.90, metalness: 0.06 }),
      deck: new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: 0.95, metalness: 0.04, map: deckTex(THREE) }),
      num: new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: 0.88, metalness: 0.05, map: numTex(THREE) }),
      team: new THREE.MeshStandardMaterial({
        color: teamCol, roughness: 0.86, metalness: 0.06 }),
      /* 2. METAL */
      metal: new THREE.MeshStandardMaterial({
        color: 0x383f45, roughness: 0.55, metalness: 0.48 }),
      dark: new THREE.MeshStandardMaterial({
        color: 0x272c30, roughness: 0.58, metalness: 0.42 }),
      screw: new THREE.MeshStandardMaterial({
        color: 0x5e5236, roughness: 0.50, metalness: 0.60 }),
      /* 3. GLASS */
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x2c3a44, roughness: 0.11, metalness: 0.0,
        transparent: true, opacity: 0.84 })
    };
  }

  /* ================================================================= hull */
  function buildHull(THREE, M, g, T) {
    var secs = [], i, s, x, r;
    for (i = STA.length - 1; i >= 0; i--) {       /* sections must increase in x */
      s = STA[i][0]; r = STA[i][1];
      x = X_BOW - s * HULL_L;
      secs.push({ x: x, w: r, h: r, zc: ZA, sq: 1.0 });
    }
    g.add(new THREE.Mesh(body(THREE, M, secs, 56), T.skin));

    /* seal the pin-hole left at the stem */
    var cap = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), T.plain);
    cap.position.set(X_BOW - 0.02, 0, ZA);
    g.add(cap);
  }

  /* -------- the flat walking casing along the crown of the hull --------
     Measured off the elevation: its edge sits about half a metre below the
     crown, which on a 5.03 m radius puts the deck edge at 1.9 m off the
     centreline. It stands slightly proud so the edge catches light. */
  function deckHalfWidth(x) {
    if (x < -36 || x > 50) return 0;
    if (x < -25) return 0.55 + (x + 36) * (1.35 / 11);
    if (x < 30) return 1.90;
    if (x < 42) return 1.90 - (x - 30) * (0.45 / 12);
    if (x < 47) return 1.45 - (x - 42) * (0.40 / 5);
    return Math.max(0.35, 1.05 - (x - 47) * (0.70 / 3));
  }
  function buildCasing(THREE, M, g, T) {
    var secs = [], x;
    for (x = -36; x <= 50.0001; x += 4) {
      var w = deckHalfWidth(Math.min(x, 50));
      secs.push({ x: x, w: Math.max(0.30, w), h: 0.26,
                  zc: hullTop(x) - 0.18, sq: 0.12 });
    }
    g.add(new THREE.Mesh(body(THREE, M, secs, 20), T.deck));

    /* the towed-array fairing that runs down the starboard shoulder: a long
       half-round blister from just abaft the sail almost to the stern */
    var fs = [];
    for (x = -39; x <= 36.0001; x += 5) {
      var rr = hullR(x);
      var zc = ZA + Math.sqrt(Math.max(0.04, rr * rr - 1.50 * 1.50)) - 0.12;
      var t = (x + 39) / 75;
      var rad = 0.34 * Math.min(1, Math.sin(t * PI) * 2.6);
      fs.push({ x: x, w: Math.max(0.06, rad), h: Math.max(0.06, rad), zc: zc, sq: 1.0 });
    }
    var fm = new THREE.Mesh(body(THREE, M, fs, 12), T.plain);
    fm.position.y = -1.50;
    g.add(fm);
  }

  /* ================================================================= sail */
  function buildSail(THREE, M, T, team) {
    var g = new THREE.Group();
    var N = 36;
    var lv = [
      [-0.90, 4.55, 2.34], [ 0.14, 4.22, 2.12], [ 1.25, 4.19, 2.08],
      [ 2.45, 4.15, 2.02], [ 3.55, 4.09, 1.94], [ 4.35, 4.01, 1.82],
      [ 4.90, 3.90, 1.62], [ 5.20, 3.66, 1.32], [ 5.45, 3.14, 0.88]
    ];
    var rings = [], i;
    for (i = 0; i < lv.length; i++) {
      var cx = X_SAIL - lv[i][0] * 0.055;      /* a touch of aft rake        */
      rings.push({ z: Z_DECK + lv[i][0], pts: lens(cx, lv[i][1], lv[i][2], N, 0.42) });
    }
    g.add(new THREE.Mesh(shell(THREE, rings), T.tile));

    /* ---- sail planes ----
       Root leading edge level with the sail's own stem, straight trailing
       edge, tip only +/- 4.6 m out: that is the plan view, and it is why an
       LA's fairwater planes look small from above and big from ahead. */
    var pp = [
      [21.37,  4.62], [22.82,  4.62], [25.28,  1.90], [25.28, -1.90],
      [22.82, -4.62], [21.37, -4.62], [21.03, -1.90], [21.03,  1.90]
    ];
    var plane = new THREE.Mesh(M.slab(THREE, pp, 0.34), T.tile);
    plane.position.z = Z_DECK + 3.40 - 0.17;
    g.add(plane);
    /* the trim tab let into the outboard trailing edge, as drawn */
    for (i = -1; i <= 1; i += 2) {
      box(THREE, g, 0.70, 1.30, 0.10, T.dark, 21.52, i * 3.70, Z_DECK + 3.40);
    }

    /* ---- masts ----
       Five, running aft to forward off the elevation; the two forward ones
       are run right up, the after ones are housed. */
    var MASTS = [
      [19.15, 2.60, 0.24, "box"],
      [19.95, 3.05, 0.26, "box"],
      [20.75, 4.40, 0.20, "ball"],
      [21.60, 6.30, 0.18, "whip"],
      [22.40, 7.20, 0.19, "whip"]
    ];
    var turret = null;
    for (i = 0; i < MASTS.length; i++) {
      var mx = MASTS[i][0], mh = MASTS[i][1], mr = MASTS[i][2];
      post(THREE, g, mr, mr * 1.18, mh, 10, T.metal, mx, 0, Z_SAILT + mh * 0.5 - 0.30);
      if (MASTS[i][3] === "box") {
        box(THREE, g, 0.62, 0.50, 0.85, T.dark, mx, 0, Z_SAILT + mh - 0.20);
      } else if (MASTS[i][3] === "ball") {
        /* the ESM / search-radar head. The renderer trains anything called
           "turret" about its own axis; a submarine has no gun mount, so the
           name goes on the one fitting that really does rotate and that a
           rotation cannot deform -- the spherical radome. */
        turret = new THREE.Group();
        turret.name = "turret";
        turret.position.set(mx, 0, Z_SAILT + mh + 0.05);
        turret.add(new THREE.Mesh(new THREE.SphereGeometry(0.46, 16, 12), T.metal));
        g.add(turret);
      } else {
        post(THREE, g, mr * 0.55, mr * 0.55, 1.30, 8, T.metal,
             mx, 0, Z_SAILT + mh + 0.55);
        box(THREE, g, 0.34, 0.30, 0.55, T.dark, mx, 0, Z_SAILT + mh - 0.10);
      }
    }
    /* the low fairing on the sail top that the masts come out of, kept short
       enough to leave the bridge cockpit clear */
    box(THREE, g, 3.20, 1.05, 0.36, T.tile, 20.55, 0, Z_SAILT + 0.05);
    /* team flash on the mast head so ownership reads from above */
    box(THREE, g, 0.34, 0.34, 0.70, T.team, 22.40, 0, Z_SAILT + 7.58);

    /* ---- bridge cockpit: a well let into the forward end of the sail top,
       with the clamshell windscreen standing proud of it. Buried inside the
       fin on the first pass, which meant the model carried no glass at all. */
    box(THREE, g, 1.95, 1.24, 0.62, T.dark, 22.20, 0, Z_SAILT - 0.12);
    box(THREE, g, 0.14, 1.30, 0.46, T.plain, 21.30, 0, Z_SAILT + 0.16);
    var wsh = new THREE.Mesh(new THREE.BoxGeometry(0.10, 1.28, 0.66), T.glass);
    wsh.position.set(23.02, 0, Z_SAILT + 0.24);
    wsh.rotation.y = -0.38;
    g.add(wsh);

    /* ---- team collar: a painted band round the sail just under the mast
       fairing. Two boxes on the cheeks vanished at game zoom; a band that
       goes all the way round reads from any bearing. ---- */
    var collar = [
      { z: Z_DECK + 1.30, pts: lens(X_SAIL - 0.07, 4.22, 2.11, N, 0.42) },
      { z: Z_DECK + 1.62, pts: lens(X_SAIL - 0.09, 4.21, 2.09, N, 0.42) }
    ];
    g.add(new THREE.Mesh(shell(THREE, collar), T.team));

    /* ---- hull number on the sail cheeks ---- */
    for (i = -1; i <= 1; i += 2) {
      var pl = new THREE.Mesh(new THREE.BoxGeometry(2.50, 0.06, 1.05), T.num);
      pl.position.set(X_SAIL + 0.15, i * 1.90, Z_DECK + 4.45);
      g.add(pl);
    }
    return g;
  }

  /* ================================================== stern control group */
  function buildStern(THREE, M, g, T) {
    /* Upper rudder taller than the lower one, both one slab through the tail
       cone, trailing edge straight and vertical, leading edge swept. */
    var rp = [
      [-51.5,  6.30], [-48.9,  6.30], [-46.4,  3.30], [-43.0,  0.30],
      [-43.0, -0.50], [-46.0, -3.10], [-48.6, -5.75], [-51.5, -5.75]
    ];
    var rud = new THREE.Mesh(M.slab(THREE, rp, 0.60, "xz"), T.tile);
    rud.position.set(0, 0.30, ZA);
    g.add(rud);

    /* stern planes: rectangular in plan with a swept root fillet */
    var sp = [
      [-51.4,  6.10], [-47.7,  6.10], [-47.7,  2.40], [-44.6,  1.05],
      [-44.6, -1.05], [-47.7, -2.40], [-47.7, -6.10], [-51.4, -6.10]
    ];
    var stp = new THREE.Mesh(M.slab(THREE, sp, 0.36), T.tile);
    stp.position.z = ZA - 0.28;
    g.add(stp);

    /* shaft fairing (hull, not bright metal) and the screw hub cone */
    tubeX(THREE, g, 0.92, 0.98, 1.70, 18, T.tile, -52.70, 0, ZA);
    var hub = new THREE.Mesh(new THREE.CylinderGeometry(0.94, 0.16, 3.40, 18), T.screw);
    hub.rotation.z = -PI / 2;
    hub.position.set(-55.15, 0, ZA);
    g.add(hub);

    /* seven skewed blades. The outline is built with x = chord and
       y = radius, so the blade group only has to be rolled about the shaft
       and the mesh twisted about its own radial axis for pitch. */
    var bp = [
      [-0.34, 0.74], [-0.62, 1.48], [-0.80, 2.26], [-0.48, 2.86],
      [ 0.10, 2.92], [ 0.52, 2.32], [ 0.62, 1.50], [ 0.40, 0.78]
    ];
    var k;
    for (k = 0; k < 7; k++) {
      var bg = new THREE.Group();
      bg.position.set(X_PROP, 0, ZA);
      bg.rotation.x = k * PI * 2 / 7;
      var bm = new THREE.Mesh(M.slab(THREE, bp, 0.13), T.screw);
      bm.rotation.y = 0.46;
      bg.add(bm);
      g.add(bg);
    }
  }

  /* ================================================== casing fittings */
  function buildFittings(THREE, g, T, team) {
    var i, j, x, y, r, z, tilt;

    /* Twelve vertical launch hatches in the forward casing, in the 2-4-4-2
       pattern the plan view calls out. They sit on the curve of the bow, so
       each one is laid on the local surface normal. */
    var VLS = [];
    for (i = 0; i < 4; i++) { VLS.push([43.90 + i * 0.98,  0.87]); VLS.push([43.90 + i * 0.98, -0.87]); }
    for (i = 0; i < 2; i++) { VLS.push([43.90 + i * 0.98,  1.78]); VLS.push([43.90 + i * 0.98, -1.78]); }
    for (i = 0; i < VLS.length; i++) {
      x = VLS[i][0]; y = VLS[i][1];
      r = hullR(x);
      z = ZA + Math.sqrt(Math.max(0.04, r * r - y * y));
      tilt = Math.atan2(y, z - ZA);
      var rim = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.16, 16), T.metal);
      rim.rotation.x = PI / 2 + tilt;
      rim.position.set(x, y, z + 0.01);
      g.add(rim);
      var h = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.20, 16), T.dark);
      h.rotation.x = PI / 2 + tilt;
      h.position.set(x, y, z + 0.03);
      g.add(h);
    }

    /* weapon-shipping and escape trunk hatches on the centreline */
    var HAT = [29.5, 10.1, -9.6];
    for (i = 0; i < HAT.length; i++) {
      x = HAT[i];
      var d = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.12, 16), T.dark);
      d.rotation.x = PI / 2;
      d.position.set(x, 0, hullTop(x) + 0.10);
      g.add(d);
    }

    /* retractable cleats fore and aft */
    for (i = 0; i < 4; i++) {
      x = [38.0, 26.0, -6.0, -22.0][i];
      box(THREE, g, 1.05, 0.42, 0.20, T.dark, x, 0.95, hullTop(x) + 0.12);
      box(THREE, g, 1.05, 0.42, 0.20, T.dark, x, -0.95, hullTop(x) + 0.12);
    }

    /* Rigged safety line: two runs of stanchion-and-wire down the casing,
       forward of the sail and abaft it, exactly as the boat is rigged when
       there are hands on deck in the Topeka photograph. */
    function run(x0, x1, step) {
      var px, prev = null;
      for (px = x0; px <= x1 + 0.001; px += step) {
        var zt = hullTop(px) + 0.08;
        post(THREE, g, 0.035, 0.035, 0.80, 6, T.metal, px, 0.60, zt + 0.40);
        post(THREE, g, 0.035, 0.035, 0.80, 6, T.metal, px, -0.60, zt + 0.40);
        if (prev !== null) {
          var zm = (hullTop(prev) + hullTop(px)) * 0.5 + 0.80;
          box(THREE, g, px - prev, 0.035, 0.035, T.metal, (px + prev) * 0.5, 0.60, zm);
          box(THREE, g, px - prev, 0.035, 0.035, T.metal, (px + prev) * 0.5, -0.60, zm);
        }
        prev = px;
      }
    }
    run(26.5, 40.0, 3.375);
    run(-19.0, 16.0, 3.5);

    /* team flash: a painted band on the forward casing where a surface ship
       would carry its pennant number */
    for (j = -1; j <= 1; j += 2) {
      var bx = 33.0, brr = hullR(bx);
      var bz = ZA + Math.sqrt(Math.max(0.04, brr * brr - 2.30 * 2.30));
      var bnd = new THREE.Mesh(new THREE.BoxGeometry(3.00, 0.09, 0.40), T.team);
      bnd.position.set(bx, j * 2.30, bz - 0.05);
      bnd.rotation.x = Math.atan2(j * 2.30, bz - ZA);
      g.add(bnd);
    }
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = mats(THREE, C || {});
    var team = (C && C.team) || 0x3f7fd0;

    buildHull(THREE, M, g, T);
    buildCasing(THREE, M, g, T);
    g.add(buildSail(THREE, M, T, team));
    buildStern(THREE, M, g, T);
    buildFittings(THREE, g, T, team);

    g.traverse(function (o) {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    return g;
  }

  return { build: build };
})();

/* Registration. Overwrite unconditionally: a hero model replaces whatever
   parametric boat already claimed this id (units3d_subs.js and
   units3d_salvage.js both do). len is the real overall length in metres. */
UNIT_MODELS["sub_n"] = {
  len: 110.3,
  build: function (THREE, M, C) { return HeroLosAngeles.build(THREE, M, C); }
};
