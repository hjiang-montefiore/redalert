/* ================= nato_e50_fighter - North American F-86F Sabre =================
   HERO reference model for the e50 (early-1950s) NATO fighter, and the style
   anchor for that whole era. Built by hand, and every station in the tables
   below was MEASURED off the standard general-arrangement three-view rather
   than guessed: the drawing was decomposed pixel by pixel, the nose lip and
   the ground line used as the two datums, and 63.0 px = 1 m throughout. The
   photographs used to check it are a ROKAF F-86F three-quarter front, an
   IIAF machine in left profile, and a preserved ROKAF airframe at Jeju.

   Period cues this model exists to carry:
     - bare polished metal, no camouflage: a mosaic of alloy panels with a
       matt anti-glare panel ahead of the windscreen and squadron bands.
     - the OVAL NOSE INTAKE IS THE NOSE. There is no radome, no splitter and
       no cheek scoop: the duct mouth occupies the whole front of the
       aeroplane and you can see down the tunnel to the compressor face.
       There is NO pitot boom on the nose - the Sabre carries its boom on the
       starboard wing tip, and that is modelled instead.
     - 35-degree swept low wing, span 11.2 m, about 3 degrees of dihedral.
     - the all-flying slab tailplane sitting on the TOP of the rear fuselage
       with 10 degrees of dihedral, two metres BELOW the fin tip. That is the
       quickest way to tell a Sabre from a MiG-17, which carries its
       tailplane part way up the fin.
     - a clear one-piece bubble canopy whose crown stands 0.42 m proud of
       the spine.
     - three oval gun ports each side, in the staggered cluster the drawing
       shows: top port furthest aft, middle port furthest forward.

   Model space: +X nose, +Y left, +Z up. Real metres.
   Intake lip x = +5.81, tailplane tip trailing edge x = -5.81. The fuselage
   itself stops at x = -4.93: on a Sabre the fin and the tailplane overhang
   the jet pipe by nearly a metre, and getting that wrong makes the whole
   aeroplane read as too long in the tail.                                  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  var D2R = Math.PI / 180;

  /* Colour comes from the era, not from taste: PAINT.silver in
     js/air3d_era.js, the 1950s bare-polished-alloy entry. */
  var SILVER = 0xc0c5c9;

  var X0 = -4.93, X1 = 5.74;             /* fuselage loft end stations */

  /* ------------------------------------------------------------------ rng */
  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }

  /* =================================================================== skin
     Tier 1 of three. One painted CanvasTexture for the fuselage, mapped by
     the loft's own cylindrical UVs (u runs tail -> nose, v runs around the
     body: 0 left flank, 0.25 crown, 0.5 right flank, 0.75 belly), and one
     tiling panel sheet for the flying surfaces and the drop tanks.         */

  var TEX = {};

  function makeBodyCanvas() {
    var W = 1024, H = 512;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var R = rngFor(86861);
    function PX(x) { return (x - X0) / (X1 - X0) * W; }
    function PY(v) { return (1 - v) * H; }

    /* --- base: bare alloy ------------------------------------------------ */
    g.fillStyle = hex(SILVER); g.fillRect(0, 0, W, H);

    /* the "camouflage" of a natural-metal aeroplane is the panel mosaic:
       every skin panel is a slightly different batch of alloy and every one
       has weathered differently. */
    for (var m = 0; m < 170; m++) {
      g.globalAlpha = 0.05 + R() * 0.11;
      g.fillStyle = R() < 0.48 ? "#f2f5f7" : (R() < 0.5 ? "#8d949b" : "#a9b0b6");
      g.fillRect(R() * W, R() * H, 26 + R() * 120, 18 + R() * 64);
    }
    /* broad tonal bands: gun bay, centre section, heat-darkened tail pipe */
    g.globalAlpha = 0.16; g.fillStyle = "#8a8478";
    g.fillRect(0, 0, PX(-3.10), H);
    g.globalAlpha = 0.10; g.fillStyle = "#d7dde1";
    g.fillRect(PX(0.80), 0, PX(4.60) - PX(0.80), H);
    g.globalAlpha = 1;

    /* --- panel seams ----------------------------------------------------- */
    var frames = [];
    var fx = X0 + 0.25;
    while (fx < X1) { frames.push(fx); fx += 0.40 + R() * 0.52; }
    for (var i = 0; i < frames.length; i++) {
      var X = PX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(X, 0); g.lineTo(X, H); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.16)"; g.lineWidth = 1;
      g.beginPath(); g.moveTo(X + 1.6, 0); g.lineTo(X + 1.6, H); g.stroke();
    }
    var strv = [0.03, 0.10, 0.175, 0.25, 0.325, 0.40, 0.47, 0.53, 0.60, 0.675, 0.75, 0.825, 0.90, 0.97];
    for (var s2 = 0; s2 < strv.length; s2++) {
      var Y = PY(strv[s2]);
      g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.3;
      g.beginPath(); g.moveTo(0, Y); g.lineTo(W, Y); g.stroke();
    }
    g.strokeStyle = "rgba(0,0,0,0.17)"; g.lineWidth = 1;
    for (var q = 0; q < 60; q++) {
      var qx = R() * W, qy = R() * H, ql = 30 + R() * 130;
      g.beginPath();
      if (R() < 0.5) { g.moveTo(qx, qy); g.lineTo(qx + ql, qy); }
      else { g.moveTo(qx, qy); g.lineTo(qx, qy + ql * 0.55); }
      g.stroke();
    }

    /* --- bolt and rivet rows --------------------------------------------- */
    g.fillStyle = "rgba(0,0,0,0.26)";
    for (var f2 = 0; f2 < frames.length; f2++) {
      var rx = PX(frames[f2]) - 3.2;
      for (var ry = 3; ry < H; ry += 7) g.fillRect(rx, ry, 1.7, 1.7);
    }
    for (var s3 = 0; s3 < strv.length; s3++) {
      var ry2 = PY(strv[s3]) + 2.4;
      var x0r = R() * W * 0.5, x1r = x0r + 180 + R() * 620;
      for (var rx2 = x0r; rx2 < x1r && rx2 < W; rx2 += 7.5) g.fillRect(rx2, ry2, 1.7, 1.7);
    }
    /* heavy bolt fields round the gun bay and engine bay doors */
    g.fillStyle = "rgba(0,0,0,0.34)";
    for (var b2 = 0; b2 < 220; b2++) {
      var bx = PX(3.6 + R() * 2.0), by = R() * H;
      g.fillRect(bx, by, 2.1, 2.1);
    }

    /* --- access hatches --------------------------------------------------- */
    for (var h2 = 0; h2 < 26; h2++) {
      var hx = R() * W, hy = R() * H, hw = 16 + R() * 40, hh = 12 + R() * 26;
      g.globalAlpha = 0.09; g.fillStyle = "#000"; g.fillRect(hx, hy, hw, hh);
      g.globalAlpha = 1;
      g.strokeStyle = "rgba(0,0,0,0.36)"; g.lineWidth = 1.3;
      g.strokeRect(hx, hy, hw, hh);
    }

    /* --- anti-glare panel ahead of the windscreen ------------------------- */
    /* Matt olive-black so the sun off the polished nose does not blind the
       pilot; present on almost every natural-metal Sabre. The v half-width
       is only 0.039 because the nose section is FLATTENED - a given
       parametric angle covers far more of a squashed crown than of a round
       one, and at 0.10 the panel swallowed the entire nose. */
    g.fillStyle = "#0b0c09";
    g.beginPath();
    g.moveTo(PX(4.34), PY(0.2925));
    g.lineTo(PX(5.66), PY(0.2840));
    g.lineTo(PX(5.71), PY(0.2160));
    g.lineTo(PX(4.34), PY(0.2075));
    g.closePath(); g.fill();
    g.globalAlpha = 0.30; g.fillStyle = "#3a3d33";
    g.fillRect(PX(4.36), PY(0.2885), PX(5.62) - PX(4.36), 3);
    g.fillRect(PX(4.36), PY(0.2115), PX(5.62) - PX(4.36), 3);
    g.globalAlpha = 1;

    /* --- national insignia and titles ------------------------------------ */
    function star(cx, cy, r) {
      g.beginPath();
      for (var k = 0; k < 10; k++) {
        var rr = (k % 2) ? r * 0.40 : r;
        var a = -Math.PI / 2 + k * Math.PI / 5;
        var px2 = cx + Math.cos(a) * rr, py2 = cy + Math.sin(a) * rr;
        if (k === 0) g.moveTo(px2, py2); else g.lineTo(px2, py2);
      }
      g.closePath(); g.fill();
    }
    function insignia(cx, cy, r) {
      g.save();
      g.globalAlpha = 0.86;
      g.fillStyle = "#12386f";
      g.beginPath(); g.arc(cx, cy, r, 0, 6.2832); g.fill();
      g.fillRect(cx - r * 2.05, cy - r * 0.56, r * 1.10, r * 1.12);
      g.fillRect(cx + r * 0.95, cy - r * 0.56, r * 1.10, r * 1.12);
      g.fillStyle = "#e8ecee";
      g.fillRect(cx - r * 1.96, cy - r * 0.46, r * 1.01, r * 0.92);
      g.fillRect(cx + r * 0.95, cy - r * 0.46, r * 1.01, r * 0.92);
      star(cx, cy, r * 0.80);
      g.fillStyle = "#a41f2b";
      g.fillRect(cx - r * 1.96, cy - r * 0.15, r * 1.01, r * 0.30);
      g.fillRect(cx + r * 0.95, cy - r * 0.15, r * 1.01, r * 0.30);
      g.restore();
    }
    insignia(PX(-2.05), PY(0.045), 30);
    insignia(PX(-2.05), PY(0.455), 30);

    g.font = "bold 21px Helvetica, Arial, sans-serif";
    g.fillStyle = "rgba(18,20,22,0.80)";
    g.textBaseline = "middle";
    g.fillText("U.S. AIR FORCE", PX(-0.85), PY(0.455));
    g.save();
    g.translate(PX(1.25), PY(0.045)); g.scale(-1, 1);
    g.fillText("U.S. AIR FORCE", 0, 0);
    g.restore();
    g.font = "bold 11px Helvetica, Arial, sans-serif";
    g.fillStyle = "rgba(140,20,24,0.70)";
    g.fillText("RESCUE", PX(2.90), PY(0.115));
    g.fillStyle = "rgba(18,20,22,0.55)";
    g.fillText("NO STEP", PX(1.60), PY(0.700));

    /* --- weathering ------------------------------------------------------- */
    /* exhaust soot: u = 0 is the jet pipe, so the stain builds toward the
       left-hand edge of the sheet and wraps the whole rear fuselage. */
    var soot = g.createLinearGradient(0, 0, W * 0.30, 0);
    soot.addColorStop(0, "rgba(22,19,17,0.48)");
    soot.addColorStop(0.45, "rgba(26,23,20,0.19)");
    soot.addColorStop(1, "rgba(26,23,20,0)");
    g.fillStyle = soot; g.fillRect(0, 0, W * 0.30, H);
    g.strokeStyle = "rgba(20,18,16,0.20)";
    for (var t2 = 0; t2 < 40; t2++) {
      var ty = R() * H, tl = 40 + R() * 210;
      g.lineWidth = 1 + R() * 3.4;
      g.beginPath(); g.moveTo(0, ty); g.lineTo(tl, ty + (R() - 0.5) * 8); g.stroke();
    }
    /* grime is heaviest low down: v ~ 0.75 is the belly, canvas y ~ 0.25H */
    var dirt = g.createLinearGradient(0, 0, 0, H);
    dirt.addColorStop(0.00, "rgba(48,42,34,0.10)");
    dirt.addColorStop(0.12, "rgba(44,38,30,0.24)");
    dirt.addColorStop(0.25, "rgba(40,34,26,0.34)");
    dirt.addColorStop(0.38, "rgba(44,38,30,0.22)");
    dirt.addColorStop(0.52, "rgba(60,56,50,0.06)");
    dirt.addColorStop(0.75, "rgba(60,56,50,0.03)");
    dirt.addColorStop(1.00, "rgba(48,42,34,0.09)");
    g.fillStyle = dirt; g.fillRect(0, 0, W, H);
    g.strokeStyle = "rgba(34,28,20,0.26)";
    for (var d2 = 0; d2 < 60; d2++) {
      var dx = R() * W, dy = R() < 0.5 ? 0 : H, dir = dy ? -1 : 1;
      g.lineWidth = 0.8 + R() * 2.2;
      g.beginPath(); g.moveTo(dx, dy);
      g.lineTo(dx + (R() - 0.5) * 24, dy + dir * (30 + R() * 95));
      g.stroke();
    }
    /* gun-gas staining trailing aft of the six muzzle ports */
    for (var gs = 0; gs < 2; gs++) {
      var gy = gs ? PY(0.455) : PY(0.045);
      var gg = g.createLinearGradient(PX(4.80), 0, PX(1.90), 0);
      gg.addColorStop(0, "rgba(26,22,18,0.42)");
      gg.addColorStop(1, "rgba(26,22,18,0)");
      g.fillStyle = gg;
      g.fillRect(PX(1.90), gy - 30, PX(4.80) - PX(1.90), 60);
    }
    /* boot scuffing on the wing root walkway */
    g.globalAlpha = 0.18; g.fillStyle = "#2c2a26";
    g.fillRect(PX(0.20), PY(0.34), PX(2.90) - PX(0.20), 26);
    g.globalAlpha = 1;

    return cv;
  }

  function makePanelCanvas() {
    var S = 512;
    var cv = document.createElement("canvas");
    cv.width = S; cv.height = S;
    var g = cv.getContext("2d");
    var R = rngFor(4471);
    g.fillStyle = hex(SILVER); g.fillRect(0, 0, S, S);
    for (var m = 0; m < 90; m++) {
      g.globalAlpha = 0.05 + R() * 0.10;
      g.fillStyle = R() < 0.5 ? "#eef2f4" : "#8f969c";
      g.fillRect(R() * S, R() * S, 24 + R() * 90, 16 + R() * 60);
    }
    g.globalAlpha = 1;
    var cuts = [0, 0.14, 0.29, 0.46, 0.62, 0.79];
    for (var i = 0; i < cuts.length; i++) {
      var p = cuts[i] * S;
      g.strokeStyle = "rgba(0,0,0,0.27)"; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(p, 0); g.lineTo(p, S); g.stroke();
      g.beginPath(); g.moveTo(0, p); g.lineTo(S, p); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.14)"; g.lineWidth = 1;
      g.beginPath(); g.moveTo(p + 1.6, 0); g.lineTo(p + 1.6, S); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.25)";
      for (var r2 = 2; r2 < S; r2 += 8) { g.fillRect(p - 3.4, r2, 1.7, 1.7); g.fillRect(r2, p - 3.4, 1.7, 1.7); }
    }
    for (var h = 0; h < 16; h++) {
      var hx = R() * S, hy = R() * S, hw = 18 + R() * 44, hh = 14 + R() * 30;
      g.globalAlpha = 0.09; g.fillStyle = "#000"; g.fillRect(hx, hy, hw, hh); g.globalAlpha = 1;
      g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 1.2; g.strokeRect(hx, hy, hw, hh);
    }
    g.strokeStyle = "rgba(36,30,22,0.20)";
    for (var d = 0; d < 46; d++) {
      var dx = R() * S, dy = R() * S;
      g.lineWidth = 0.7 + R() * 2.0;
      g.beginPath(); g.moveTo(dx, dy); g.lineTo(dx + (R() - 0.5) * 16, dy + 24 + R() * 70); g.stroke();
    }
    g.globalAlpha = 0.10; g.fillStyle = "#2e2a22"; g.fillRect(0, 0, S, S); g.globalAlpha = 1;
    return cv;
  }

  function bodyTex(THREE) {
    if (!TEX.body) {
      var t = new THREE.CanvasTexture(makeBodyCanvas());
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      t.anisotropy = 4;
      TEX.body = t;
    }
    return TEX.body;
  }
  function panelTex(THREE) {
    if (!TEX.panel) {
      var t = new THREE.CanvasTexture(makePanelCanvas());
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = 4;
      TEX.panel = t;
    }
    return TEX.panel;
  }

  /* --------------------------------------------------------- three tiers */
  /* 1. SKIN - painted surface, textured, matte, barely metallic */
  function skinBody(THREE) {
    return new THREE.MeshStandardMaterial({
      color: 0xffffff, map: bodyTex(THREE),
      roughness: 0.83, metalness: 0.10, side: THREE.DoubleSide });
  }
  function skinPanel(THREE, ru, rv) {
    var t = panelTex(THREE).clone();
    t.needsUpdate = true;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(ru, rv);
    return new THREE.MeshStandardMaterial({
      color: 0xffffff, map: t,
      roughness: 0.84, metalness: 0.09, side: THREE.DoubleSide });
  }
  /* 2. METAL - fittings, undercarriage, gun ports, ducting, exhaust.
     NOTE: M.loft winds its triangles so the computed normals face INWARD.
     Every caller in models3d.js happens to use a DoubleSide material, so it
     never showed up there; a FrontSide material on a lofted part is culled
     from outside and appears only as a sliver at the silhouette. Anything
     lofted here therefore passes dbl = true. */
  function metal(THREE, c, r, m, dbl) {
    return new THREE.MeshStandardMaterial({
      color: c, roughness: r, metalness: m,
      side: dbl ? THREE.DoubleSide : THREE.FrontSide });
  }
  /* 3. GLASS - the bubble canopy */
  function glass(THREE) {
    return new THREE.MeshPhysicalMaterial({
      color: 0x38505c, roughness: 0.09, metalness: 0.0,
      transparent: true, opacity: 0.85,
      clearcoat: 1.0, clearcoatRoughness: 0.05,
      side: THREE.DoubleSide });
  }

  /* Tone mapping crushes colour separation in this renderer: 0x3f7fd0 laid on
     a brightly keyed convex flank came back with no blue in it at all. Take
     the team hue, saturate it fully and darken it, and it survives. */
  function punch(THREE, c) {
    var col = new THREE.Color(c), hsl = { h: 0, s: 0, l: 0 };
    col.getHSL(hsl);
    col.setHSL(hsl.h, Math.min(1, hsl.s * 1.6 + 0.25), Math.max(0.16, Math.min(0.34, hsl.l * 0.58)));
    return col.getHex();
  }

  /* ================================================================= tools */

  function secs(tbl) {
    var out = [];
    for (var i = 0; i < tbl.length; i++)
      out.push({ x: tbl[i][0], w: tbl[i][1], h: tbl[i][2], zc: tbl[i][3], sq: tbl[i][4] || 1 });
    return out;
  }

  /* A real aerofoil rather than a flat plate: NACA symmetric thickness over a
     cosine-spaced chord, lofted rib to rib so the section tapers with the
     planform and the leading edge stays round. ribs: {s, xle, xte, t, off}.
     For a wing or tailplane s is the spanwise station and off the chord-line
     height; for a fin s is the height and off the lateral offset.          */
  function foil(THREE, ribs, K, mtl, vertical, vs) {
    var pos = [], uv = [], idx = [];
    var ring = 2 * K, n = ribs.length, i, j;
    for (i = 0; i < n; i++) {
      var rb = ribs[i], c = rb.xle - rb.xte;
      for (j = 0; j < ring; j++) {
        var up = (j <= K), jj = up ? j : (2 * K - j);
        var s = 0.5 * (1 - Math.cos(Math.PI * jj / K));
        var yt = 5 * rb.t * c * (0.2969 * Math.sqrt(s) - 0.1260 * s
                 - 0.3516 * s * s + 0.2843 * s * s * s - 0.1015 * s * s * s * s);
        if (!up) yt = -yt;
        var x = rb.xle - s * c;
        if (vertical) pos.push(x, (rb.off || 0) + yt, rb.s);
        else          pos.push(x, rb.s, (rb.off || 0) + yt);
        uv.push(s, rb.s * vs);
      }
    }
    for (i = 0; i < n - 1; i++)
      for (j = 0; j < ring; j++) {
        var a = i * ring + j, b = i * ring + ((j + 1) % ring);
        idx.push(a, a + ring, b, b, a + ring, b + ring);
      }
    var base = (n - 1) * ring;
    for (j = 1; j < ring - 1; j++) idx.push(base, base + j, base + j + 1);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  function tube(THREE, a, b, r, mtl, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-4;
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg || 10), mtl);
    m.position.set((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    m.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / len, dy / len, dz / len));
    return m;
  }
  function box(THREE, sx, sy, sz, x, y, z, mtl) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mtl);
    m.position.set(x, y, z);
    return m;
  }

  /* =================================================================== body
     Station table, measured off the three-view. w and h are HALF width and
     half height, zc the height of the section centre. Two things here are
     not guesses and matter a great deal to the silhouette:
       - the section centre RISES from -0.15 at the intake to +0.27 at the
         jet pipe. The Sabre's duct is slung low and the tail cone is high;
         a fuselage built on a straight centreline reads as a MiG.
       - the fuselage STOPS at x = -4.93. Fin and tailplane overhang it.  */
  var FUS = [
    [-4.93, 0.345, 0.300,  0.268, 1.00],
    [-4.78, 0.380, 0.332,  0.258, 1.00],
    [-4.40, 0.462, 0.396,  0.244, 0.99],
    [-4.01, 0.522, 0.443,  0.228, 0.98],
    [-3.63, 0.572, 0.487,  0.212, 0.97],
    [-3.20, 0.618, 0.532,  0.190, 0.96],
    [-2.60, 0.664, 0.612,  0.148, 0.95],
    [-2.00, 0.692, 0.668,  0.100, 0.94],
    [-1.35, 0.712, 0.723,  0.046, 0.93],
    [-0.70, 0.724, 0.780, -0.012, 0.93],
    [ 0.10, 0.730, 0.806, -0.036, 0.92],
    [ 0.90, 0.732, 0.818, -0.050, 0.92],
    [ 1.60, 0.732, 0.822, -0.062, 0.92],
    [ 2.40, 0.730, 0.817, -0.075, 0.92],
    [ 3.10, 0.724, 0.807, -0.092, 0.92],
    [ 3.70, 0.714, 0.795, -0.120, 0.91],
    [ 4.20, 0.700, 0.760, -0.128, 0.89],
    [ 4.62, 0.682, 0.707, -0.130, 0.87],
    [ 5.00, 0.660, 0.644, -0.146, 0.85],
    [ 5.28, 0.640, 0.594, -0.162, 0.83],
    [ 5.55, 0.612, 0.505, -0.150, 0.82],
    [ 5.74, 0.575, 0.470, -0.130, 0.82],
  ];

  /* The intake lip rolls forward and then back INSIDE itself: the extreme
     nose of the aeroplane is this ring, at x = 5.808. Outer face 1.15 m
     across by 0.94 m deep, mouth 1.04 by 0.83 - a wide flattened oval that
     IS the nose, with a rolled lip about 40 mm thick all round. */
  var LIP = [
    [ 5.740, 0.575, 0.470, -0.130, 0.82],
    [ 5.808, 0.556, 0.452, -0.126, 0.82],
    [ 5.770, 0.518, 0.415, -0.124, 0.86],
    [ 5.660, 0.512, 0.409, -0.122, 0.90],
    [ 5.440, 0.508, 0.405, -0.120, 0.92],
  ];
  /* the duct, running back to the compressor face you can see from
     three-quarters front. This is the cue: the nose IS the intake. */
  var DUCT = [
    [ 4.05, 0.330, 0.262, -0.128, 0.95],
    [ 4.45, 0.378, 0.300, -0.128, 0.94],
    [ 4.90, 0.435, 0.345, -0.126, 0.93],
    [ 5.25, 0.482, 0.383, -0.123, 0.92],
    [ 5.43, 0.506, 0.403, -0.120, 0.92],
  ];

  /* ---- exact surface query on the fuselage loft ----------------------
     Interpolate the station table at x, then solve the superellipse for the
     half-width at height z. Used to seat the gun ports, the speed brakes and
     the team band flush on a curved flank instead of guessing at them. */
  function fusAt(x) {
    var i = 0, n = FUS.length;
    if (x <= FUS[0][0]) i = 0;
    else if (x >= FUS[n - 1][0]) i = n - 2;
    else { while (i < n - 2 && x > FUS[i + 1][0]) i++; }
    var a = FUS[i], b = FUS[i + 1];
    var t = (x - a[0]) / (b[0] - a[0]);
    if (t < 0) t = 0; if (t > 1) t = 1;
    return { w: a[1] + (b[1] - a[1]) * t, h: a[2] + (b[2] - a[2]) * t,
             zc: a[3] + (b[3] - a[3]) * t, sq: a[4] + (b[4] - a[4]) * t };
  }
  function fusY(x, z) {
    var s2 = fusAt(x);
    var r = (z - s2.zc) / s2.h;
    if (r < 0) r = -r;
    if (r >= 1) return 0;
    var sn = Math.pow(r, 1 / s2.sq);
    var cs = Math.sqrt(Math.max(0, 1 - sn * sn));
    return s2.w * Math.pow(cs, s2.sq);
  }
  function fusTop(x) { var s2 = fusAt(x); return s2.zc + s2.h; }

  /* ------------------------------------------------------------- canopy
     Crown at x = 2.89, z = 1.149. The spine under it is at 0.727, so the
     hood stands 0.42 m proud - it is a glass teardrop sitting ON the back
     of the aeroplane, not sunk into it. */
  var CANOPY = [
    [1.62, 0.090, 0.030, 0.740],
    [1.90, 0.215, 0.088, 0.800],
    [2.20, 0.310, 0.150, 0.868],
    [2.55, 0.372, 0.212, 0.934],
    [2.89, 0.392, 0.235, 0.948],
    [3.20, 0.386, 0.228, 0.934],
    [3.50, 0.360, 0.190, 0.880],
    [3.80, 0.312, 0.150, 0.822],
    [4.05, 0.250, 0.100, 0.760],
    [4.30, 0.160, 0.048, 0.690],
    [4.48, 0.050, 0.014, 0.630],
  ];
  function canAt(x) {
    var i = 0, n = CANOPY.length;
    if (x <= CANOPY[0][0]) i = 0;
    else if (x >= CANOPY[n - 1][0]) i = n - 2;
    else { while (i < n - 2 && x > CANOPY[i + 1][0]) i++; }
    var a = CANOPY[i], b = CANOPY[i + 1];
    var t = (x - a[0]) / (b[0] - a[0]);
    if (t < 0) t = 0; if (t > 1) t = 1;
    return [x, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t,
            a[3] + (b[3] - a[3]) * t];
  }
  /* a thin proud ring following the hood: windscreen bow, rear arch */
  function canRing(x0, x1, grow) {
    var A = canAt(x0), B = canAt(x1);
    return [[A[0], A[1] + grow, A[2] + grow, A[3], 0.95],
            [B[0], B[1] + grow, B[2] + grow, B[3], 0.95]];
  }

  /* ------------------------------------------------------------ planform
     Wing:  root LE  x = 3.71, root TE x = 0.33  (root chord 3.38 m)
            tip  LE  x = -1.19, tip TE x = -2.65 at s = 5.61
            LE sweep 41 deg (the 6-3 extended leading edge), TE sweep 28,
            quarter chord about 35. Span 11.22 m, dihedral 3 degrees.     */
  var WSPAN = 5.61, WROOT_Z = -0.520, WDIH = Math.tan(3.0 * D2R);
  function wingLE(s) { return 3.71 - s * 0.87344; }
  function wingTE(s) { return 0.33 - s * 0.53119; }
  var WSTA = [0.00, 0.55, 1.15, 1.80, 2.45, 3.10, 3.75, 4.40, 5.00, 5.42, 5.58, 5.61];

  /* Tailplane: an all-flying slab on TOP of the rear fuselage, root at
     z = 0.66 with 10.5 degrees of dihedral, tip trailing edge at x = -5.81
     which is the aft-most point of the whole aeroplane.                  */
  var TSPAN = 2.23, TROOT_Z = 0.660, TDIH = Math.tan(10.5 * D2R);
  function tailLE(s) { return -3.60 - s * 0.67265; }
  function tailTE(s) { return -4.95 - s * 0.38565; }
  var TSTA = [0.00, 0.55, 1.10, 1.62, 2.02, 2.18, 2.23];

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var teamCol = (C && C.team !== undefined) ? C.team : 0x3f7fd0;

    var SKIN = skinBody(THREE);
    var PANEL = skinPanel(THREE, 2.4, 1.0);
    var TANKMAT = skinPanel(THREE, 3.2, 1.6);
    var STEEL = metal(THREE, 0x9aa1a7, 0.52, 0.55);
    var DARKM = metal(THREE, 0x5c6167, 0.55, 0.45, true);
    var DUCTM = metal(THREE, 0x0b0e12, 0.62, 0.38, true);
    var VOID = metal(THREE, 0x030405, 0.65, 0.36, true);
    var HOT = metal(THREE, 0x6e6459, 0.50, 0.52, true);
    var RUBBER = metal(THREE, 0x1b1c1e, 0.95, 0.04);
    var GLASSM = glass(THREE);
    var TEAM = metal(THREE, punch(THREE, teamCol), 0.58, 0.36, true);

    /* ------------------------------------------------------------ fuselage */
    g.add(new THREE.Mesh(M.loft(THREE, secs(FUS), 40), SKIN));

    /* ------------------------------------------------- nose intake and duct */
    g.add(new THREE.Mesh(M.loft(THREE, secs(LIP), 40),
          metal(THREE, 0xb2b8bd, 0.46, 0.58, true)));
    g.add(new THREE.Mesh(M.loft(THREE, secs(DUCT), 28), DUCTM));
    g.add(new THREE.Mesh(M.loft(THREE, secs([
      [3.80, 0.045, 0.036, -0.128, 0.95],
      [3.93, 0.222, 0.176, -0.128, 0.95],
      [4.06, 0.331, 0.263, -0.128, 0.95],
    ]), 28), VOID));

    /* -------------------------------------------------------- jet pipe */
    g.add(new THREE.Mesh(M.loft(THREE, secs([
      [-5.00, 0.320, 0.278, 0.270],
      [-4.96, 0.333, 0.290, 0.269],
      [-4.93, 0.345, 0.300, 0.268],
    ]), 32), HOT));
    g.add(new THREE.Mesh(M.loft(THREE, secs([
      [-4.96, 0.296, 0.256, 0.270],
      [-4.40, 0.296, 0.256, 0.250],
      [-4.05, 0.305, 0.265, 0.235],
    ]), 24), VOID));
    g.add(new THREE.Mesh(M.loft(THREE, secs([
      [-4.00, 0.305, 0.265, 0.235],
      [-3.90, 0.180, 0.156, 0.235],
      [-3.85, 0.040, 0.036, 0.235],
    ]), 24), VOID));

    /* -------------------------------------------------------- gun ports */
    /* Six .50 calibre muzzles, three a side, in the staggered cluster the
       general-arrangement drawing shows beside the duct: the top port sits
       furthest AFT and the middle one furthest forward. */
    var GUN = metal(THREE, 0x141619, 0.60, 0.35, true);
    var GUNLIP = metal(THREE, 0x4a3524, 0.58, 0.38, true);
    var PORTS = [[4.43, 0.053], [4.72, -0.121], [4.71, -0.343]];
    for (var gi = 0; gi < PORTS.length; gi++) {
      for (var gs2 = -1; gs2 <= 1; gs2 += 2) {
        var px3 = PORTS[gi][0], pz3 = PORTS[gi][1];
        var ys = fusY(px3, pz3);
        var port = new THREE.Mesh(new THREE.CylinderGeometry(0.054, 0.048, 0.115, 14), GUN);
        port.scale.set(2.35, 1, 1);
        port.position.set(px3, gs2 * (ys - 0.030), pz3);
        g.add(port);
        var ring = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.030, 14), GUNLIP);
        ring.scale.set(2.30, 1, 1);
        ring.position.set(px3, gs2 * (ys - 0.008), pz3);
        g.add(ring);
      }
    }

    /* ------------------------------------------------------------ canopy */
    /* the raised spine the hood closes onto behind the cockpit */
    g.add(new THREE.Mesh(M.loft(THREE, secs([
      [0.40, 0.060, 0.008, 0.755, 0.80],
      [0.90, 0.150, 0.020, 0.760, 0.80],
      [1.40, 0.240, 0.036, 0.762, 0.80],
      [1.90, 0.300, 0.050, 0.752, 0.80],
    ]), 28), SKIN));

    g.add(new THREE.Mesh(M.loft(THREE, secs(CANOPY), 32), GLASSM));
    /* windscreen bow and the hood's rear arch */
    g.add(new THREE.Mesh(M.loft(THREE, secs(canRing(3.90, 3.97, 0.012)), 32), DARKM));
    g.add(new THREE.Mesh(M.loft(THREE, secs(canRing(1.98, 2.05, 0.012)), 32), DARKM));
    /* canopy sill rails down each side of the hood */
    for (var cs = -1; cs <= 1; cs += 2) {
      g.add(box(THREE, 1.95, 0.042, 0.038, 2.95, cs * 0.352, 0.742, DARKM));
    }

    /* cockpit tub, seat and headrest - these read through a clear bubble and
       an empty transparent shell does not. Instruments stay in the texture. */
    var TRIM = metal(THREE, 0x24282a, 0.62, 0.38, true);
    g.add(box(THREE, 1.34, 0.62, 0.40, 2.98, 0, 0.530, TRIM));
    g.add(box(THREE, 0.26, 0.44, 0.48, 2.74, 0, 0.720, TRIM));
    g.add(box(THREE, 0.13, 0.28, 0.18, 2.58, 0, 0.940, TRIM));
    g.add(box(THREE, 0.28, 0.44, 0.13, 3.60, 0, 0.800, TRIM));
    g.add(box(THREE, 0.13, 0.11, 0.18, 3.50, 0, 0.895, DARKM));

    /* ------------------------------------------------------------- wing */
    function wingRibs(sign) {
      var r = [], i;
      for (i = 0; i < WSTA.length; i++) {
        var s = WSTA[i], le = wingLE(s), te = wingTE(s), th = 0.110 - s * 0.0018;
        /* rounded, slightly raked tip */
        if (s > 5.40) { var k = (s - 5.40) / 0.21; le -= 0.10 * k; te += 0.16 * k; th *= (1 - 0.55 * k); }
        r.push({ s: sign * s, xle: le, xte: te, t: th, off: WROOT_Z + s * WDIH });
      }
      return r;
    }
    g.add(foil(THREE, wingRibs(1), 12, PANEL, false, 0.30));
    g.add(foil(THREE, wingRibs(-1), 12, PANEL, false, 0.30));

    /* boundary-layer fences: a real break in the wing outline from above */
    for (var wf = -1; wf <= 1; wf += 2) {
      var fs = 3.62, fx2 = (wingLE(fs) + wingTE(fs)) * 0.5 + 0.30;
      g.add(box(THREE, 0.92, 0.032, 0.155, fx2, wf * fs, WROOT_Z + fs * WDIH + 0.10, DARKM));
    }
    /* wing root fairing blending the centre section into the belly */
    g.add(new THREE.Mesh(M.loft(THREE, secs([
      [-1.10, 0.400, 0.085, -0.560, 0.70],
      [-0.10, 0.640, 0.155, -0.640, 0.70],
      [ 0.95, 0.790, 0.195, -0.680, 0.70],
      [ 2.00, 0.812, 0.190, -0.665, 0.70],
      [ 2.95, 0.712, 0.145, -0.600, 0.70],
      [ 3.60, 0.520, 0.080, -0.520, 0.70],
    ]), 24), SKIN));

    /* --------------------------------------------------- tail: slab and fin
       The tailplane is a one-piece all-flying slab on the top of the rear
       fuselage. Its tips reach z = 1.07 while the fin tip is at 2.80: low,
       and unmistakably NOT a T-tail.                                     */
    function tailRibs(sign) {
      var r = [], i;
      for (i = 0; i < TSTA.length; i++) {
        var s = TSTA[i], le = tailLE(s), te = tailTE(s), th = 0.095;
        if (s > 2.02) { var k = (s - 2.02) / 0.21; le -= 0.06 * k; te += 0.10 * k; th *= (1 - 0.5 * k); }
        r.push({ s: sign * s, xle: le, xte: te, t: th, off: TROOT_Z + s * TDIH });
      }
      return r;
    }
    g.add(foil(THREE, tailRibs(1), 10, PANEL, false, 0.55));
    g.add(foil(THREE, tailRibs(-1), 10, PANEL, false, 0.55));

    /* fin: leading edge 42 degrees, trailing edge raked 14 degrees AFT so
       the tip overhangs the jet pipe - measured off the drawing. */
    var FR = [
      { s: 0.62, xle: -2.72, xte: -4.90, t: 0.072, off: 0 },
      { s: 1.10, xle: -3.17, xte: -5.02, t: 0.072, off: 0 },
      { s: 1.50, xle: -3.54, xte: -5.12, t: 0.073, off: 0 },
      { s: 1.90, xle: -3.91, xte: -5.21, t: 0.074, off: 0 },
      { s: 2.25, xle: -4.24, xte: -5.30, t: 0.075, off: 0 },
      { s: 2.55, xle: -4.52, xte: -5.39, t: 0.077, off: 0 },
      { s: 2.72, xle: -4.66, xte: -5.44, t: 0.080, off: 0 },
      { s: 2.80, xle: -4.80, xte: -5.38, t: 0.070, off: 0 },
    ];
    g.add(foil(THREE, FR, 10, PANEL, true, 0.75));

    /* dorsal fin fillet running forward off the fin root */
    var fil = new THREE.Mesh(M.slab(THREE, [
      [-1.55, 0.320], [-2.20, 0.470], [-2.62, 0.600], [-2.90, 0.700],
      [-2.90, 0.430], [-1.55, 0.230],
    ], 0.12, "xz"), SKIN);
    fil.position.y = 0.060;
    g.add(fil);

    /* ------------------------------------------------------- speed brakes */
    /* the perforated panels on the aft fuselage flanks, shown closed */
    for (var ab = -1; ab <= 1; ab += 2) {
      var by2 = fusY(-1.30, -0.120) - 0.030;
      g.add(box(THREE, 1.12, 0.090, 0.78, -1.30, ab * by2, -0.120, PANEL));
      g.add(box(THREE, 1.12, 0.055, 0.055, -1.30, ab * (by2 + 0.012), 0.275, DARKM));
    }

    /* -------------------------------------------------- stores and pylons */
    /* Sabres in Korea flew almost everywhere on a pair of drop tanks */
    var TKY = 2.10, tkz = WROOT_Z + TKY * WDIH - 0.62;
    function dropTank(sign) {
      var t = new THREE.Group();
      t.add(new THREE.Mesh(M.loft(THREE, secs([
        [-1.95, 0.022, 0.022, 0],
        [-1.72, 0.120, 0.120, 0],
        [-1.30, 0.218, 0.218, 0],
        [-0.72, 0.281, 0.281, 0],
        [ 0.00, 0.300, 0.300, 0],
        [ 0.62, 0.296, 0.296, 0],
        [ 1.02, 0.262, 0.262, 0],
        [ 1.28, 0.185, 0.185, 0],
        [ 1.45, 0.055, 0.055, 0],
      ]), 24), TANKMAT));
      t.position.set(0.65, sign * TKY, tkz);
      return t;
    }
    for (var pk = -1; pk <= 1; pk += 2) {
      g.add(dropTank(pk));
      var pyl = new THREE.Mesh(M.slab(THREE, [
        [1.35, tkz + 0.44], [0.05, tkz + 0.44], [0.00, tkz + 0.16], [1.22, tkz + 0.14],
      ], 0.13, "xz"), PANEL);
      pyl.position.set(0, pk * TKY + 0.065, 0);
      g.add(pyl);
      g.add(box(THREE, 0.09, 0.30, 0.16, 1.20, pk * TKY, tkz + 0.26, STEEL));
      g.add(box(THREE, 0.09, 0.30, 0.16, 0.18, pk * TKY, tkz + 0.26, STEEL));
    }

    /* ---------------------------------------------------------- aerials */
    /* Pitot boom off the STARBOARD wing tip. The Sabre has no nose boom -
       that is a MiG-15 feature and the single most common way this aeroplane
       gets modelled wrong. */
    var bs = 5.50, bxl = wingLE(bs), bz = WROOT_Z + bs * WDIH;
    g.add(tube(THREE, [bxl, -bs, bz + 0.02], [bxl + 1.45, -bs, bz + 0.02], 0.030, STEEL, 8));
    g.add(tube(THREE, [bxl + 1.34, -bs, bz + 0.02], [bxl + 1.45, -bs, bz + 0.02], 0.042, DARKM, 8));
    /* radio blade on the spine */
    var bl = new THREE.Mesh(M.slab(THREE, [
      [0.18, 0.772], [-0.06, 0.772], [-0.12, 0.900], [0.10, 0.930],
    ], 0.038, "xz"), DARKM);
    bl.position.y = 0.023;
    g.add(bl);
    /* wingtip navigation light fairings */
    for (var nv = -1; nv <= 1; nv += 2) {
      var ns = 5.58, nx = (wingLE(ns) + wingTE(ns)) * 0.5;
      var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.060, 8, 6),
        new THREE.MeshPhysicalMaterial({ color: nv > 0 ? 0xc02a22 : 0x1e9e46,
          roughness: 0.12, metalness: 0.0, transparent: true, opacity: 0.86 }));
      lamp.position.set(nx, nv * 5.62, WROOT_Z + ns * WDIH + 0.02);
      g.add(lamp);
    }

    /* ============================================================== gear
       Named "gear" so render3d.js can stow it in cruise. Tricycle, single
       wheel on every leg. Measured stance: nose wheel at x = 5.13, mains at
       x = 0.40 on a 2.30 m track, wheels on the ground at z = -1.78. The
       nose leg is FAR forward, under the gun bay - not under the cockpit. */
    var GND = -1.78;
    var gear = new THREE.Group();
    gear.name = "gear";

    function wheel(x, y, z, r, w) {
      var tyre = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w, 20), RUBBER);
      tyre.position.set(x, y, z);
      gear.add(tyre);
      var hub = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.52, r * 0.52, w * 1.12, 14), STEEL);
      hub.position.set(x, y, z);
      gear.add(hub);
    }

    /* nose leg */
    var nwz = GND + 0.235;
    wheel(5.13, 0, nwz, 0.235, 0.140);
    gear.add(tube(THREE, [5.02, 0, -0.640], [5.11, 0, nwz + 0.20], 0.074, STEEL, 10));
    gear.add(tube(THREE, [5.11, 0, nwz + 0.21], [5.13, 0, nwz], 0.054, STEEL, 10));
    gear.add(box(THREE, 0.070, 0.17, 0.32, 5.21, 0, nwz + 0.13, DARKM));
    gear.add(tube(THREE, [5.03, 0, -0.700], [4.62, 0, -0.980], 0.036, STEEL, 8));
    for (var nd = -1; nd <= 1; nd += 2) {
      var ndoor = box(THREE, 0.90, 0.045, 0.40, 5.00, nd * 0.180, -0.880, PANEL);
      ndoor.rotation.x = nd * 0.22;
      gear.add(ndoor);
    }

    /* main legs */
    var mwz = GND + 0.320;
    for (var mg = -1; mg <= 1; mg += 2) {
      wheel(0.40, mg * 1.150, mwz, 0.320, 0.180);
      gear.add(tube(THREE, [0.46, mg * 1.010, -0.560], [0.40, mg * 1.135, mwz], 0.080, STEEL, 10));
      gear.add(tube(THREE, [0.50, mg * 0.840, -0.540], [0.42, mg * 1.090, mwz + 0.34], 0.044, STEEL, 8));
      gear.add(box(THREE, 0.070, 0.16, 0.32, 0.24, mg * 1.150, mwz + 0.16, DARKM));
      var mdoor = box(THREE, 1.16, 0.05, 0.52, 0.40, mg * 0.870, -0.830, PANEL);
      mdoor.rotation.x = mg * 0.10;
      gear.add(mdoor);
      var wdoor = box(THREE, 1.05, 0.60, 0.05, 0.36, mg * 1.520, -0.560, PANEL);
      gear.add(wdoor);
    }
    g.add(gear);

    /* ======================================================= team colours
       1950s practice puts squadron identity in bands, and it is exactly what
       an RTS player needs: a nose ring, a fin flash and a band on each wing.
       The ring is built from the measured fuselage sections plus 16 mm so it
       sits on the skin instead of fighting with it. */
    function ringAt(x, grow) {
      var s2 = fusAt(x);
      return [x, s2.w + grow, s2.h + grow, s2.zc, s2.sq];
    }
    g.add(new THREE.Mesh(M.loft(THREE, secs([
      ringAt(4.90, 0.016), ringAt(5.16, 0.016), ringAt(5.42, 0.016),
    ]), 40), TEAM));

    var flash = new THREE.Mesh(M.slab(THREE, [
      [-4.42, 2.20], [-5.32, 2.20], [-5.40, 2.62], [-4.60, 2.62],
    ], 0.075, "xz"), TEAM);
    flash.position.y = 0.0375;
    g.add(flash);

    for (var tb = -1; tb <= 1; tb += 2) {
      var bsn = 3.40, bcx = (wingLE(bsn) + wingTE(bsn)) * 0.5 - 0.10;
      var band = box(THREE, 0.66, 0.98, 0.070, bcx, tb * bsn,
                     WROOT_Z + bsn * WDIH + 0.074, TEAM);
      band.rotation.x = tb * 0.052;
      g.add(band);
    }

    return g;
  }

  UNIT_MODELS["nato_e50_fighter"] = {
    len: 11.5,
    build: function (THREE, M, C) { return build(THREE, M, C); },
  };
})();
