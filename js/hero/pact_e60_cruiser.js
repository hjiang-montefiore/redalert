/* ==================== js/hero/pact_e60_cruiser.js ======================
   HERO REFERENCE MODEL -- Project 58 "Kynda" class missile cruiser
   (Grozny, Admiral Fokin, Admiral Golovko, Varyag; 1962-1965).

   This is the style and period anchor for the e60 Eastern navy. Everything
   in it was drawn against photographs of Grozny and Varyag: a broadside
   aerial, a port-quarter aerial, a bow three-quarter colour shot and a
   recognition profile.

   What has to read from three-quarters at moderate zoom, in order of
   importance -- these are the reasons the file exists:

     1. TWO ENORMOUS QUADRUPLE SS-N-3 LAUNCHER BOXES, one on the forecastle
        and one on the quarterdeck. Each is a cluster of four 12 m tubes on
        its own trainable barbette and each is plainly bigger than any gun
        mount on the ship. Nothing else in 1962 looked like this. The
        forward one is the group the renderer trains ("turret").
     2. TWO PYRAMIDAL LATTICE MACKS -- mast and funnel combined into one
        tapering plated tower with the uptake emerging from its after face
        and an open truss topmast above. Each is crowned by a huge pair of
        parabolic SCOOP PAIR guidance dishes and a curved Head Net air
        search antenna.
     3. Twin SA-N-1 arm launcher on the forecastle forward of the bridge,
        with its two missiles on the rails.
     4. Twin 76 mm AK-726 mounts aft, superfiring, abaft the after
        launcher, with a bare helicopter platform on the quarterdeck.
     5. Dark grey Soviet Northern Fleet paint, heavy sheer forward, a raked
        stem, and a low quarterdeck.

   MODEL SPACE: +X bow, +Y port, +Z up, real metres, waterline at z = 0.
   render3d.js stands the model up with rotation.x = -PI/2, so anything
   authored +Y up lies on its side. Length overall 142.0 m.
   ASCII only -- a stray byte in a hex literal has broken this repo before.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKynda = (function () {
  "use strict";

  var PI = Math.PI;

  /* ===================================================== principal dims */
  var LOA   = 142.0;              /* length overall, metres              */
  var BEAM  = 15.80;
  var DRAFT = 5.35;

  /* Longitudinal station table, stern to stem. Columns:
       x        station, metres from midships (+X forward)
       w        HALF beam of the hull at that station
       dz       height of the weather deck above the waterline (the sheer)
       kz       height of the keel line (negative = below water)
       sqT      loft exponent for the topsides.  Deliberately well under
                the 0.45-0.60 the house brief suggests for a midsection:
                anything above about 0.25 leaves the topsides bulging out
                past the boot topping at the waterline knuckle, which read
                as a pot belly in the bow view.  warship3d.js squares its
                hulls off just as hard and for the same reason.
       sqL      loft exponent for the underbody (higher = rounded bilge,
                highest right forward so the forefoot pinches to an edge) */
  var STA = [
    [-71.0, 4.30, 4.70, -1.05, 0.20, 0.62],
    [-68.0, 5.60, 4.68, -2.65, 0.20, 0.60],
    [-63.0, 6.78, 4.66, -4.15, 0.19, 0.58],
    [-56.0, 7.52, 4.70, -4.98, 0.18, 0.55],
    [-46.0, 7.86, 4.82, -5.28, 0.17, 0.52],
    [-32.0, 7.90, 5.00, -5.34, 0.17, 0.50],
    [-16.0, 7.90, 5.22, -5.34, 0.17, 0.50],
    [  0.0, 7.86, 5.50, -5.32, 0.17, 0.50],
    [ 14.0, 7.62, 5.86, -5.26, 0.18, 0.54],
    [ 28.0, 7.05, 6.36, -5.06, 0.21, 0.62],
    [ 40.0, 6.20, 6.96, -4.66, 0.27, 0.76],
    [ 50.0, 5.12, 7.60, -4.00, 0.36, 0.94],
    [ 58.0, 3.88, 8.22, -3.05, 0.48, 1.12],
    [ 64.5, 2.46, 8.78, -1.95, 0.62, 1.30],
    [ 68.5, 1.22, 9.18, -0.90, 0.78, 1.44],
    [ 71.0, 0.32, 9.48, -0.22, 0.94, 1.55]
  ];

  var Z_BOOT = 1.26;   /* top of the boot topping band                   */
  var Z_TOP  = 1.12;   /* bottom of the grey topsides loft               */

  function pick(x, k) {
    var i;
    if (x <= STA[0][0]) return STA[0][k];
    for (i = 1; i < STA.length; i++) {
      if (x <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i];
        var f = (x - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * f;
      }
    }
    return STA[STA.length - 1][k];
  }
  function deckZ(x) { return pick(x, 2); }
  function halfB(x) { return pick(x, 1); }

  /* ============================================================ textures
     One canvas set, cached per team (the pennant number is drawn in the
     owner's colour so a busy map still reads at a glance).             */
  var TEX = {};

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function finish(THREE, cv, rep, off) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (rep) t.repeat.set(rep[0], rep[1]);
    if (off) t.offset.set(off[0], off[1]);
    /* This repo ships three.js r148. THREE.SRGBColorSpace is DEFINED there but
       Texture.colorSpace does nothing until r152, so testing for it first meant
       these canvases were never sRGB-decoded at all - which is why they came
       back twice as bright and were compensated with near-black colour tints.
       prepModel() then linearised those tints as well and the whole ship
       collapsed to a silhouette in game. Set the encoding the way every other
       hero in this folder does. */
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }

  /* --- the hull side elevation, painted once and blitted three times so
     that the loft's angular v lands the waterline where it belongs.
     u runs stern (0) to stem (1); hf runs hull bottom (0) to deck (1). */
  function sideElevation(team) {
    var W = 1024, H = 128, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(9173), i, x, y, h;

    g.fillStyle = hx(0x1b2025); g.fillRect(0, 0, W, H);

    /* tonal patchwork: no two strakes ever weather to the same grey */
    for (i = 0; i < 130; i++) {
      g.globalAlpha = R() < 0.5 ? 0.010 + R() * 0.020 : 0.05 + R() * 0.09;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 26 + R() * 120, 7 + R() * 16);
    }
    g.globalAlpha = 1;

    /* HORIZONTAL STRAKES -- the single most legible cue on a ship's side */
    g.strokeStyle = "rgba(14,18,22,0.42)";
    for (i = 1; i < 11; i++) {
      g.lineWidth = (i === 4 || i === 8) ? 2.0 : 1.2;
      y = i * H / 11;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.10)";
      g.beginPath(); g.moveTo(0, y + 1.6); g.lineTo(W, y + 1.6); g.stroke();
      g.strokeStyle = "rgba(14,18,22,0.42)";
    }
    /* VERTICAL BUTTS, staggered strake to strake */
    g.lineWidth = 1.0; g.strokeStyle = "rgba(14,18,22,0.30)";
    for (i = 0; i < 11; i++) {
      var y0 = i * H / 11, y1 = (i + 1) * H / 11, off = (i % 2) * 11;
      for (x = off; x < W; x += 22) {
        g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke();
      }
    }

    /* freeing ports and scuttles: dark slots, small enough to be paint */
    g.fillStyle = "rgba(10,13,16,0.55)";
    for (i = 0; i < 26; i++) g.fillRect(120 + i * 32, 16 + (i % 3) * 3, 9, 4);
    for (i = 0; i < 34; i++) {
      g.beginPath(); g.arc(60 + i * 27, 74 + (i % 2) * 13, 2.2, 0, 6.3); g.fill();
    }

    /* RUST WEEPING DOWN from every one of those ports, and from the hawse */
    for (i = 0; i < 26; i++) {
      var rx = 120 + i * 32 + 3, ry = 20 + (i % 3) * 3;
      var gr = g.createLinearGradient(0, ry, 0, ry - 22 - R() * 20);
      gr.addColorStop(0, "rgba(58,31,16,0.40)");
      gr.addColorStop(1, "rgba(58,31,16,0.0)");
      g.fillStyle = gr; g.fillRect(rx, ry - 34, 1.6 + R() * 1.6, 34);
    }
    /* hf grows upward on this canvas as y DECREASES, so a streak that runs
       DOWN the ship's side runs toward larger y here */
    for (i = 0; i < 34; i++) {
      var sx = 60 + i * 27, sy = 74 + (i % 2) * 13;
      var g2 = g.createLinearGradient(0, sy, 0, sy + 26 + R() * 26);
      g2.addColorStop(0, "rgba(62,34,18,0.42)");
      g2.addColorStop(1, "rgba(62,34,18,0.0)");
      g.fillStyle = g2; g.fillRect(sx - 1, sy, 1.5 + R() * 1.4, 44);
    }
    /* anchor rust: two long stains under the hawse pipes, right forward */
    for (i = 0; i < 2; i++) {
      var ax = 900 + i * 26;
      var g3 = g.createLinearGradient(0, 30, 0, 88);
      g3.addColorStop(0, "rgba(68,37,19,0.45)");
      g3.addColorStop(1, "rgba(68,37,19,0.0)");
      g.fillStyle = g3; g.fillRect(ax, 30, 4, 58);
    }

    /* EXHAUST STAINING trailing aft of the two macks (u about 0.50/0.38) */
    [0.505, 0.385].forEach(function (u) {
      var ex = u * W;
      var g4 = g.createLinearGradient(ex, 0, ex - 150, 0);
      g4.addColorStop(0, "rgba(28,26,24,0.30)");
      g4.addColorStop(1, "rgba(28,26,24,0.0)");
      g.fillStyle = g4; g.fillRect(ex - 150, 0, 150, 40);
    });

    /* BOOT TOPPING band and the darker ANTI-FOULING below it. The real
       waterline is carried by its own loft, but the paint has to agree. */
    g.fillStyle = hx(0x050607); g.fillRect(0, H - 15, W, 15);
    g.fillStyle = hx(0x180d0a); g.fillRect(0, H - 5, W, 5);
    g.globalAlpha = 0.35; g.fillStyle = "#000000";
    g.fillRect(0, H - 17, W, 3); g.globalAlpha = 1;

    /* PENNANT NUMBER on the bow, in the owner's colour with a white shade */
    g.save();
    g.fillStyle = hx(team); g.globalAlpha = 0.90;
    g.fillRect(838, 40, 46, 3);
    g.font = "bold 21px Arial"; g.textAlign = "center";
    g.fillText("810", 861, 60);
    g.globalAlpha = 1;
    /* a name board aft */
    g.font = "bold 15px Arial"; g.fillStyle = "rgba(84,90,96,0.85)";
    g.fillText("GROZNY", 96, 58);
    g.restore();
    return cv;
  }

  function hullTex(THREE, team) {
    var key = "hull" + team;
    if (TEX[key]) return TEX[key];
    var side = sideElevation(team);
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    g.fillStyle = hx(0x14181b); g.fillRect(0, 0, W, H);
    /* v = 0.75 is the bottom of the topsides loft, v = 0.25 the deck edge;
       starboard runs y 64 -> 192 upright, port is the mirror either side
       of the wrap. */
    g.drawImage(side, 0, 64);
    g.save(); g.translate(0, 64); g.scale(1, -1); g.drawImage(side, 0, 0); g.restore();
    g.save(); g.translate(0, 320); g.scale(1, -1); g.drawImage(side, 0, 0); g.restore();
    TEX[key] = finish(THREE, cv); return TEX[key];
  }

  /* underbody: anti-fouling with a boot topping band across its top */
  function underTex(THREE) {
    if (TEX.under) return TEX.under;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(3313), i;
    g.fillStyle = hx(0x0e0705); g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.05 + R() * 0.09;
      g.fillStyle = R() < 0.5 ? "#2c1912" : "#0a0605";
      g.fillRect(R() * W, R() * H, 14 + R() * 60, 8 + R() * 30);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(10,8,7,0.35)"; g.lineWidth = 1.2;
    for (i = 1; i < 9; i++) {
      g.beginPath(); g.moveTo(0, i * H / 9); g.lineTo(W, i * H / 9); g.stroke();
    }
    TEX.under = finish(THREE, cv, [6, 3]); return TEX.under;
  }

  /* neutral greyscale plate: the material colour supplies the scheme */
  function plateTex(THREE) {
    if (TEX.plate) return TEX.plate;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(2287), i, x, y;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.20; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 7; i++) {
      g.beginPath(); g.moveTo(0, i * H / 7); g.lineTo(W, i * H / 7); g.stroke();
      g.beginPath(); g.moveTo(i * W / 7, 0); g.lineTo(i * W / 7, H); g.stroke();
    }
    g.globalAlpha = 0.09;
    for (i = 0; i < 34; i++) {
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 16 + R() * 58, 10 + R() * 38);
    }
    /* watertight doors and scuttles, and soot streaks from the uptakes */
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 10; i++) {
      x = R() * W; y = R() * H;
      g.fillRect(x, y, 11, 20);
      g.beginPath(); g.arc(x + 40 + R() * 30, y + 8, 2.6, 0, 6.3); g.fill();
    }
    g.globalAlpha = 0.16; g.fillStyle = "#141312";
    for (i = 0; i < 16; i++) g.fillRect(R() * W, 0, 3 + R() * 5, 20 + R() * 60);
    g.globalAlpha = 0.13; g.fillStyle = "#6b3c22";
    for (i = 0; i < 22; i++) g.fillRect(R() * W, R() * H, 2, 10 + R() * 26);
    g.globalAlpha = 1;
    TEX.plate = finish(THREE, cv, [2, 2]); return TEX.plate;
  }

  /* weather deck: plate grid plus non-skid grit */
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(6151), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 44; i++) {
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 22 + R() * 76, 16 + R() * 56);
    }
    g.globalAlpha = 0.26; g.strokeStyle = "#000000"; g.lineWidth = 2;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 1400; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 0.10; g.fillStyle = "#6b3c22";
    for (i = 0; i < 30; i++) g.fillRect(R() * W, R() * H, 3, 9 + R() * 20);
    g.globalAlpha = 1;
    TEX.deck = finish(THREE, cv, [1, 1]); return TEX.deck;
  }

  /* helicopter platform: circle and H, plus a scorched non-skid ground */
  function padTex(THREE) {
    if (TEX.pad) return TEX.pad;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(4409), i;
    g.fillStyle = "#101315"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.07; g.fillStyle = i % 2 ? "#0b0d0f" : "#181c1f";
      g.fillRect(R() * W, R() * H, 26 + R() * 86, 18 + R() * 62);
    }
    g.globalAlpha = 0.28; g.fillStyle = "#000000";
    for (i = 0; i < 900; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.strokeStyle = "#565c62"; g.lineWidth = 8;
    g.beginPath(); g.arc(W / 2, H / 2, W * 0.30, 0, 6.3); g.stroke();
    g.save(); g.translate(W / 2, H / 2); g.rotate(PI / 2);
    g.fillStyle = "#565c62"; g.font = "bold 112px Arial"; g.textAlign = "center";
    g.fillText("H", 0, 40); g.restore();
    TEX.pad = finish(THREE, cv, [1 / 11.4, 1 / 12.4], [70.2 / 11.4, 6.2 / 12.4]);
    return TEX.pad;
  }

  /* ========================================================== materials
     Exactly three tiers: SKIN (painted steel, textured), METAL (bare
     fittings), GLASS (bridge windows).                                 */
  function makeMats(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({
        color: col, map: tex, roughness: r === undefined ? 0.87 : r, metalness: 0.06
      });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      /* ---- tier 1: SKIN ---- */
      hull:  skin(0xffffff, hullTex(THREE, team), 0.86),
      under: skin(0xffffff, underTex(THREE), 0.90),
      boot:  skin(0x23272b, underTex(THREE), 0.88),
      sup:   skin(0x1f252b, plateTex(THREE), 0.86),
      sup2:  skin(0x1a2025, plateTex(THREE), 0.88),
      sup3:  skin(0x252b31, plateTex(THREE), 0.85),
      deck:  skin(0x0f1214, deckTex(THREE), 0.95),
      pad:   skin(0xffffff, padTex(THREE), 0.95),
      dark:  skin(0x040506, plateTex(THREE), 0.90),
      canvas: skin(0x2b3137, plateTex(THREE), 0.92),
      team:  skin(team, plateTex(THREE), 0.84),
      mesh:  new THREE.MeshStandardMaterial({
        color: 0x2b3137, map: plateTex(THREE), roughness: 0.90,
        metalness: 0.06, side: THREE.DoubleSide
      }),
      /* ---- tier 2: METAL ---- */
      metal: metal(0x31363b, 0.52, 0.55),
      steel: metal(0x23282c, 0.58, 0.45),
      gun:   metal(0x16191c, 0.48, 0.60),
      brass: metal(0x2b2417, 0.50, 0.62),
      /* ---- tier 3: GLASS ---- */
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x05090b, roughness: 0.10, metalness: 0.0,
        transparent: true, opacity: 0.84
      })
    };
  }

  /* The colour tints above were chosen by eye against ALREADY-DECODED canvases,
     so they are the finished linear values, not sRGB ones. render3d.js
     prepModel() would otherwise run convertSRGBToLinear() over them a second
     time and drop 0x23272b to about (4,5,6), which is what turned this ship
     into a black silhouette in game while it looked right in the harness.
     Claiming the conversion here is the same guard destroyer_n.js uses. */
  function sealMats(M) {
    for (var k in M) {
      if (!M.hasOwnProperty(k) || !M[k]) continue;
      M[k].userData = M[k].userData || {};
      M[k].userData._srgbDone = true;
    }
    return M;
  }

  /* ================================================== geometry helpers */
  function box(THREE, p, lx, ly, lz, m, x, y, z, ry) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z);
    if (ry) b.rotation.y = ry;
    p.add(b); return b;
  }
  /* A four sided cylinder is a box whose top face scales independently --
     which is how every deckhouse and mack on this ship gets its inward
     battered sides for free. */
  function tbox(THREE, p, lx, ly, lz, top, m, x, y, z) {
    var g = new THREE.CylinderGeometry(top === undefined ? 1 : top, 1, lz, 4, 1);
    g.rotateX(PI / 2); g.rotateZ(PI / 4);
    g.scale(lx * 0.70710678, ly * 0.70710678, 1);
    g = g.toNonIndexed(); g.computeVertexNormals();
    var b = new THREE.Mesh(g, m); b.position.set(x, y, z); p.add(b); return b;
  }
  /* cylinder standing on +Z */
  function cylZ(THREE, p, rt, rb, h, seg, m, x, y, z, open) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open);
    g.rotateX(PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  /* cylinder lying along +X */
  function cylX(THREE, p, rt, rb, len, seg, m, x, y, z, open) {
    var g = new THREE.CylinderGeometry(rt, rb, len, seg, 1, !!open);
    g.rotateZ(-PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  /* cylinder lying along +Y */
  function cylY(THREE, p, rt, rb, len, seg, m, x, y, z, open) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, len, seg, 1, !!open), m);
    c.position.set(x, y, z); p.add(c); return c;
  }
  /* a thin cylinder stretched between two points: truss legs, wire runs */
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az;
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var g = new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true);
    var s = new THREE.Mesh(g, m);
    s.position.set((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
                                    new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  /* shallow parabolic reflector, mouth facing +X */
  function dish(THREE, p, r, seg, rows, m, x, y, z, yaw) {
    var g = new THREE.SphereGeometry(r, seg, rows, 0, PI * 2, 0, PI * 0.44);
    g.scale(1, 0.38, 1);          /* flatten it into a paraboloid        */
    g.rotateZ(PI / 2);            /* mouth from +Y to +X                 */
    var d = new THREE.Mesh(g, m);
    d.position.set(x, y, z);
    if (yaw) d.rotation.z = yaw;
    p.add(d); return d;
  }
  /* M.loft winds inward; flip it so a single sided material shades right */
  function loftMesh(THREE, M, secs, segs, m) {
    var g = M.loft(THREE, secs, segs), idx = g.getIndex(), i, t;
    if (idx) {
      var a = idx.array;
      for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      idx.needsUpdate = true;
    }
    g.computeVertexNormals();
    return new THREE.Mesh(g, m);
  }

  /* ================================================================ hull
     Three coaxial lofts, not one. A painted waterline cannot survive the
     loft's angular v, so the topsides, the boot topping and the
     anti-fouling are separate closed shells, each one slightly wider than
     the one it covers: grey above 0.80 m, black from -0.13 to 0.97 m,
     dark red below. The knuckle at the waterline comes out crisp and
     nothing z-fights. The two lower shells are also pulled AFT as they
     rise less, which is what gives the stem its rake. */
  function hullSections(kind) {
    var A = [], i;
    for (i = 0; i < STA.length; i++) {
      var s = STA[i], x = s[0], w = s[1], dz = s[2], kz = s[3], rake = 0;
      if (kind !== "top" && x > 34)
        rake = (kind === "low" ? 3.6 : 2.3) * Math.pow((x - 34) / 37, 1.6);
      var xx = x - rake;
      if (kind === "top")
        A.push({ x: xx, w: w + 0.07, h: (dz - Z_TOP) * 0.5, zc: (dz + Z_TOP) * 0.5, sq: s[4] });
      else if (kind === "boot")
        A.push({ x: xx, w: w + 0.035, h: 0.72, zc: 0.54, sq: 0.17 });
      else
        A.push({ x: xx, w: w, h: (0.18 - kz) * 0.5, zc: (0.18 + kz) * 0.5, sq: s[5] });
    }
    return A;
  }

  function buildHull(THREE, M, g, T) {
    g.add(loftMesh(THREE, M, hullSections("top"), 26, T.hull));
    g.add(loftMesh(THREE, M, hullSections("boot"), 18, T.boot));
    g.add(loftMesh(THREE, M, hullSections("low"), 20, T.under));
    /* transom: the stern is cut off square under the counter */
    tbox(THREE, g, 0.5, 8.5, 5.6, 0.86, T.hull, -70.9, 0, 2.0);
  }

  /* the weather deck as its own ribbon so it can carry non-skid paint and
     still follow the sheer exactly */
  function deckRibbon(THREE, m, x0, x1, inset, dz) {
    var xs = [x0], i, j, NC = 3, pos = [], uv = [], idx = [];
    for (i = 0; i < STA.length; i++)
      if (STA[i][0] > x0 + 0.4 && STA[i][0] < x1 - 0.4) xs.push(STA[i][0]);
    /* extra columns forward, where the sheer bends hardest */
    for (i = 0; i < 4; i++) {
      var xe = x1 - (x1 - x0) * 0.06 * (i + 1);
      if (xe > x0 + 0.4) xs.push(xe);
    }
    xs.push(x1);
    xs.sort(function (a, b) { return a - b; });
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = Math.max(0.06, halfB(x) - inset), z = deckZ(x) + dz;
      for (j = 0; j <= NC; j++) {
        pos.push(x, w * (1 - 2 * j / NC), z);
        uv.push((x - x0) / 11.0, (w * 2) * (j / NC) / 11.0);
      }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    var gg = new THREE.BufferGeometry();
    gg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    gg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    gg.setIndex(idx); gg.computeVertexNormals();
    return new THREE.Mesh(gg, m);
  }

  /* stanchion and wire guardrails down both deck edges. A warship without
     railings does not read as a warship. */
  function railRun(THREE, g, T, x0, x1, step, hgt, inset) {
    var s, x, n = Math.max(2, Math.round((x1 - x0) / step)), i, prev;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n;
        var y = s * (halfB(x) - inset), z = deckZ(x) + 0.04;
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.045, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98,
                x, y, z + hgt * 0.98, 0.028, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.52,
                x, y, z + hgt * 0.52, 0.024, 3);
        }
        prev = [x, y, z];
      }
    }
  }

  /* a box that tapers independently in x and y: deckhouses and macks */
  function tprism(THREE, p, lx0, ly0, lx1, ly1, lz, m, x, y, z) {
    var ax = lx0 * 0.5, ay = ly0 * 0.5, bx = lx1 * 0.5, by = ly1 * 0.5, hz = lz * 0.5;
    var V = [[-ax, -ay, -hz], [ax, -ay, -hz], [ax, ay, -hz], [-ax, ay, -hz],
             [-bx, -by, hz], [bx, -by, hz], [bx, by, hz], [-bx, by, hz]];
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7],
             [0, 1, 5], [0, 5, 4], [1, 2, 6], [1, 6, 5],
             [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]];
      pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.16, v[1] * 0.16);
      else if (i < 8) uv.push(v[0] * 0.16, v[2] * 0.16);
      else uv.push(v[1] * 0.16, v[2] * 0.16);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    var mm = new THREE.Mesh(g, m); mm.position.set(x, y, z); p.add(mm); return mm;
  }

  /* ====================================================== SS-N-3 LAUNCHER
     The whole reason a Kynda looks like a Kynda. Four 12 m tubes in a 2x2
     cluster on a trainable barbette, elevated a few degrees, muzzles at
     +X. Built at the origin so the caller can drop it anywhere and, for
     the forward one, so the renderer can train it. */
  function ssn3(THREE, g, T) {
    var i, s, t, y, z;
    /* barbette and training ring */
    cylZ(THREE, g, 3.35, 3.75, 1.35, 16, T.sup, 0, 0, 0.66);
    cylZ(THREE, g, 3.45, 3.45, 0.24, 16, T.dark, 0, 0, 1.44);

    /* everything above the trunnions elevates together */
    var e = new THREE.Group();
    e.position.set(0, 0, 1.56);
    e.rotation.y = -0.055;
    g.add(e);

    /* cradle and the two trunnion cheeks */
    tprism(THREE, e, 9.4, 6.0, 8.8, 5.6, 1.20, T.sup, -0.4, 0, 0.60);
    for (s = -1; s <= 1; s += 2)
      tprism(THREE, e, 5.0, 0.50, 4.6, 0.50, 4.6, T.sup2, -1.8, s * 3.25, 2.9);

    /* THE FOUR TUBES. A dark filler block sits in the cross between them
       so the gaps read as gaps and the cluster does not collapse into one
       grey lump at map zoom -- which is exactly what it did on the first
       pass. */
    tprism(THREE, e, 12.0, 3.10, 12.0, 3.10, 3.60, T.dark, 0.1, 0, 2.55);
    var pos = [[-1.62, 1.30], [1.62, 1.30], [-1.62, 3.80], [1.62, 3.80]];
    for (i = 0; i < 4; i++) {
      y = pos[i][0]; z = pos[i][1];
      cylX(THREE, e, 1.14, 1.14, 11.8, 12, T.sup, 0.0, y, z, true);
      /* forward door: a shallow cone inside a dark muzzle ring */
      cylX(THREE, e, 0.78, 1.14, 1.10, 12, T.sup2, 6.42, y, z);
      cylX(THREE, e, 0.86, 0.86, 0.18, 12, T.dark, 7.04, y, z);
      /* after end plate */
      cylX(THREE, e, 1.14, 1.06, 0.60, 12, T.sup2, -6.18, y, z);
      /* three reinforcing bands per tube -- they are what makes the
         cluster read as four separate containers */
      for (t = -1; t <= 1; t += 1)
        cylX(THREE, e, 1.23, 1.23, 0.34, 12, T.sup2, t * 3.1, y, z, true);
      /* rail strip along the top of each tube */
      box(THREE, e, 9.8, 0.24, 0.18, T.steel, 0.2, y, z + 1.16);
    }
    /* blast structure and loading gear at the after end */
    tprism(THREE, e, 1.7, 7.0, 1.3, 5.6, 6.1, T.sup2, -7.2, 0, 2.55);
    box(THREE, e, 2.4, 1.1, 0.8, T.steel, -5.6, 0, 5.70);
    /* elevating rams */
    for (s = -1; s <= 1; s += 2)
      strut(THREE, e, T.metal, -5.6, s * 3.40, 0.3, -0.6, s * 3.40, 2.3, 0.28, 6);
    return g;
  }

  /* =================================================== SA-N-1 twin arm */
  function sanOne(THREE, g, T) {
    var s, i;
    cylZ(THREE, g, 2.25, 2.55, 0.85, 14, T.sup, 0, 0, 0.42);
    tprism(THREE, g, 4.0, 5.0, 3.5, 4.5, 2.10, T.sup, -0.20, 0, 1.92);
    /* the training house carries a stub yoke; the two arms lift off it */
    box(THREE, g, 1.2, 4.0, 0.85, T.sup2, 1.0, 0, 3.20);
    var a = new THREE.Group();
    a.position.set(1.0, 0, 3.35); a.rotation.y = -0.30;
    g.add(a);
    for (s = -1; s <= 1; s += 2) {
      /* launch rail */
      box(THREE, a, 4.4, 0.36, 0.40, T.steel, 1.8, s * 1.25, 0);
      /* V-755 round: body, nose, boost stage, wings and fins */
      cylX(THREE, a, 0.44, 0.44, 3.90, 10, T.canvas, 1.6, s * 1.30, 0.62, true);
      cylX(THREE, a, 0.05, 0.44, 1.05, 10, T.canvas, 4.08, s * 1.30, 0.62);
      cylX(THREE, a, 0.44, 0.36, 1.15, 10, T.sup2, -0.95, s * 1.30, 0.62);
      box(THREE, a, 1.4, 0.08, 1.30, T.steel, -1.00, s * 1.30, 0.62);
      box(THREE, a, 1.4, 1.30, 0.08, T.steel, -1.00, s * 1.30, 0.62);
      box(THREE, a, 1.1, 0.07, 0.92, T.steel, 2.70, s * 1.30, 0.62);
      box(THREE, a, 1.1, 0.92, 0.07, T.steel, 2.70, s * 1.30, 0.62);
    }
    return g;
  }

  /* ================================================ AK-726 twin 76 mm */
  function ak726(THREE, g, T) {
    var s;
    cylZ(THREE, g, 1.70, 1.90, 0.55, 14, T.sup, 0, 0, 0.27);
    /* the gun house is a rounded drum with a domed top -- the AK-726
       "beehive" that every Soviet ship of the decade carried */
    cylZ(THREE, g, 1.62, 1.82, 1.95, 12, T.sup, -0.15, 0, 1.52);
    var d = new THREE.SphereGeometry(1.62, 12, 3, 0, PI * 2, 0, PI * 0.42);
    d.scale(1, 1, 0.55);
    var dm = new THREE.Mesh(d, T.sup);
    dm.rotation.x = PI / 2; dm.position.set(-0.15, 0, 2.48); g.add(dm);
    /* mantlet and the two barrels */
    tprism(THREE, g, 1.5, 2.5, 1.1, 2.0, 1.5, T.sup2, 1.35, 0, 1.65);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.15, 0.19, 3.30, 8, T.gun, 3.55, s * 0.50, 1.72, true);
      cylX(THREE, g, 0.21, 0.21, 0.30, 8, T.gun, 5.05, s * 0.50, 1.72);
    }
    return g;
  }

  /* ================================================ RBU-6000 ASW mortar */
  function rbu(THREE, g, T) {
    var i, a;
    cylZ(THREE, g, 0.80, 0.95, 0.45, 10, T.sup, 0, 0, 0.22);
    tprism(THREE, g, 1.5, 2.2, 1.3, 2.0, 0.7, T.sup, 0, 0, 0.78);
    /* twelve barrels on a horseshoe, all cocked up together */
    for (i = 0; i < 12; i++) {
      a = -1.30 + i * (2.60 / 11);
      var yy = Math.sin(a) * 1.02, xx = -0.35 + Math.cos(a) * 0.55;
      var b = new THREE.Group();
      b.position.set(xx, yy, 1.15); b.rotation.y = -0.55;
      g.add(b);
      cylX(THREE, b, 0.145, 0.145, 1.70, 6, T.gun, 0, 0, 0, true);
    }
    return g;
  }

  /* ============================================== Scoop Pair radar pair */
  function scoopPair(THREE, g, T, x, y, z, yaw, r) {
    var u = new THREE.Group();
    u.position.set(x, y, z); u.rotation.z = yaw || 0;
    g.add(u);
    cylZ(THREE, u, 0.85, 1.15, 1.20, 12, T.sup2, 0, 0, 0.60);
    box(THREE, u, 1.3, 5.4, 0.9, T.sup2, 0, 0, 1.55);
    var s, zc = 2.30 + r * 0.44;
    for (s = -1; s <= 1; s += 2) {
      dish(THREE, u, r, 16, 5, T.mesh, 0.35, s * (r + 0.16), zc);
      /* rim ring: an outline is what makes a parabola read as a parabola */
      cylX(THREE, u, r * 0.985, r * 0.985, 0.24, 16, T.steel,
           0.35 - r * 0.072, s * (r + 0.16), zc, true);
      /* ribs across the mouth and a back stay, so the reflector reads as
         a dish from behind as well as in front */
      var q;
      for (q = 0; q < 2; q++) {
        var rb = box(THREE, u, 0.14, r * 1.9, 0.14, T.steel,
                     0.35 - r * 0.10, s * (r + 0.16), zc);
        rb.rotation.x = q * PI / 2;
      }
      for (q = -1; q <= 1; q += 2)
        strut(THREE, u, T.steel, 0.35 - r * 0.40, s * (r + 0.16), zc,
              0.35 - r * 0.08, s * (r + 0.16) + q * r * 0.72, zc + q * r * 0.20,
              0.075, 4);
      /* yoke arms and the feed horn on its tripod */
      box(THREE, u, 0.40, 0.40, 1.7, T.steel, -0.20, s * (r + 0.16), zc - 1.15);
      cylX(THREE, u, 0.16, 0.34, 1.7, 8, T.metal, 1.45, s * (r + 0.16), zc);
    }
    return u;
  }

  /* ============= Head Net: the curved lattice air search "orange peel" */
  function headNet(THREE, g, T, x, y, z, span, hgt) {
    var u = new THREE.Group();
    u.position.set(x, y, z);
    g.add(u);
    var N = 7, i, f, yy, xx, top = [], bot = [];
    for (i = 0; i <= N; i++) {
      f = i / N - 0.5;
      yy = f * span;
      xx = -Math.pow(f * 2, 2) * 0.85;          /* the curve of the array */
      top.push([xx, yy, hgt * 0.5]);
      bot.push([xx, yy, -hgt * 0.5]);
      strut(THREE, u, T.metal, xx, yy, -hgt * 0.5, xx, yy, hgt * 0.5, 0.085, 4);
    }
    for (i = 0; i < N; i++) {
      strut(THREE, u, T.metal, top[i][0], top[i][1], top[i][2],
            top[i + 1][0], top[i + 1][1], top[i + 1][2], 0.09, 4);
      strut(THREE, u, T.metal, bot[i][0], bot[i][1], bot[i][2],
            bot[i + 1][0], bot[i + 1][1], bot[i + 1][2], 0.09, 4);
      strut(THREE, u, T.metal, bot[i][0], bot[i][1], bot[i][2],
            top[i + 1][0], top[i + 1][1], top[i + 1][2], 0.035, 3);
    }
    box(THREE, u, 0.5, 0.5, 1.1, T.steel, 0.25, 0, -hgt * 0.5 - 0.45);
    return u;
  }

  /* ============== small fire-control director: pedestal, house, dish */
  function director(THREE, g, T, x, y, z, r, sc) {
    var u = new THREE.Group();
    u.position.set(x, y, z); if (sc) u.scale.set(sc, sc, sc);
    g.add(u);
    cylZ(THREE, u, 0.75, 0.95, 0.85, 12, T.sup2, 0, 0, 0.42);
    tprism(THREE, u, 2.0, 2.4, 1.7, 2.0, 1.5, T.sup, -0.1, 0, 1.60);
    dish(THREE, u, r, 12, 4, T.mesh, 0.95, 0, 2.05);
    cylX(THREE, u, 0.10, 0.20, 0.9, 6, T.metal, 1.55, 0, 2.05);
    return u;
  }

  /* ============================================ mast and funnel (MACK) */
  function mack(THREE, g, T, o) {
    var cx = o.cx, s, i;
    /* the plated pyramid, in two stages so the taper reads as a pyramid
       and not as a cone */
    tprism(THREE, g, o.l0, o.w0, o.l1, o.w1, o.zM - o.z0, T.sup,
           cx, 0, (o.z0 + o.zM) * 0.5);
    tprism(THREE, g, o.l1, o.w1, o.l2, o.w2, o.zT - o.zM, T.sup2,
           cx, 0, (o.zM + o.zT) * 0.5);
    /* signal / searchlight platform partway up */
    tprism(THREE, g, o.l1 * 1.05, o.w1 + 3.6, o.l1 * 1.05, o.w1 + 3.6, 0.30,
           T.sup2, cx + 0.4, 0, o.zM);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, o.l1 * 1.02, 0.16, 1.05, T.sup, cx + 0.4,
          s * (o.w1 * 0.5 + 1.78), o.zM + 0.66);
      box(THREE, g, 0.16, 3.4, 1.05, T.sup, cx + o.l1 * 0.51,
          s * (o.w1 * 0.5 + 0.1), o.zM + 0.66);
      cylZ(THREE, g, 0.46, 0.46, 0.80, 10, T.canvas, cx + 1.8,
           s * (o.w1 * 0.5 + 1.15), o.zM + 0.85);
      /* a lower gallery breaks the taper again halfway down */
      box(THREE, g, o.l0 * 0.62, 0.55, 0.20, T.sup2, cx - 0.4,
          s * (o.w0 * 0.5 + 0.4), o.z0 + (o.zM - o.z0) * 0.42);
      box(THREE, g, o.l0 * 0.62, 0.14, 0.90, T.sup, cx - 0.4,
          s * (o.w0 * 0.5 + 0.66), o.z0 + (o.zM - o.z0) * 0.42 + 0.55);
    }

    /* ---- funnel: the uptake breaks out of the after face, raked aft, and
       is capped black with a team-coloured band under the cap ---- */
    var f = new THREE.Group();
    f.position.set(o.fx, 0, o.fz0);
    f.rotation.y = -0.055;
    g.add(f);
    var fh = o.fz1 - o.fz0;
    tprism(THREE, f, o.fl, o.fw, o.fl * 0.84, o.fw * 0.86, fh, T.sup, 0, 0, fh * 0.5);
    tprism(THREE, f, o.fl * 1.04, o.fw * 1.02, o.fl * 0.94, o.fw * 0.94, 1.70,
           T.dark, 0, 0, fh + 0.05);
    tprism(THREE, f, o.fl * 0.80, o.fw * 0.82, o.fl * 0.80, o.fw * 0.82, 0.30,
           T.team, 0, 0, fh - 0.42);
    /* uptake mouths in the cap */
    for (s = -1; s <= 1; s += 2)
      cylZ(THREE, f, o.fl * 0.22, o.fl * 0.22, 0.30, 10, T.dark,
           0, s * o.fw * 0.22, fh + 0.26);
    tprism(THREE, f, o.fl * 0.55, o.fw * 0.70, o.fl * 0.45, o.fw * 0.55, fh * 0.55,
           T.sup, o.fl * 0.72, 0, fh * 0.30);
    /* steam pipe up the after side */
    strut(THREE, f, T.metal, -o.fl * 0.44, 0.9, 0.5, -o.fl * 0.44, 0.9, fh + 1.5, 0.09, 5);

    /* ---- top platform and open truss topmast ---- */
    tprism(THREE, g, o.l2 + 2.2, o.w2 + 2.2, o.l2 + 2.2, o.w2 + 2.2, 0.22,
           T.sup2, cx, 0, o.zT + 0.10);
    var a = o.l2 * 0.5 + 0.4, b = o.w2 * 0.5 + 0.4, tp = o.zTop;
    var legs = [[a, b], [a, -b], [-a, -b], [-a, b]];
    var tips = [], k = 0.28;
    for (i = 0; i < 4; i++) {
      tips.push([legs[i][0] * k, legs[i][1] * k]);
      strut(THREE, g, T.metal, cx + legs[i][0], legs[i][1], o.zT + 0.2,
            cx + legs[i][0] * k, legs[i][1] * k, tp, 0.115, 4);
    }
    /* three bracing rings plus diagonals */
    for (i = 0; i < 3; i++) {
      var t = (i + 1) / 4, r0 = 1 - t * (1 - k), zz = o.zT + 0.2 + (tp - o.zT - 0.2) * t;
      var t2 = (i + 2) / 4, r1 = 1 - t2 * (1 - k);
      var z2 = o.zT + 0.2 + (tp - o.zT - 0.2) * t2;
      for (var j = 0; j < 4; j++) {
        var n = (j + 1) % 4;
        strut(THREE, g, T.metal, cx + legs[j][0] * r0, legs[j][1] * r0, zz,
              cx + legs[n][0] * r0, legs[n][1] * r0, zz, 0.055, 3);
        if (i === 1 && j < 2)
          strut(THREE, g, T.metal, cx + legs[j][0] * r0, legs[j][1] * r0, zz,
                cx + legs[n][0] * r1, legs[n][1] * r1, z2, 0.05, 3);
      }
    }
    /* yardarm with navigation radar and whip aerials */
    strut(THREE, g, T.metal, cx, -o.yard, tp - 2.6, cx, o.yard, tp - 2.6, 0.075, 4);
    for (s = -1; s <= 1; s += 2)
      strut(THREE, g, T.metal, cx, s * o.yard, tp - 2.6, cx - 0.4, s * o.yard * 0.75, tp - 0.6, 0.05, 3);
    strut(THREE, g, T.metal, cx, 0, tp, cx - 0.3, 0, tp + 3.4, 0.075, 4);
    return g;
  }

  /* =============================================================== BUILD */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, z;

    /* ------------------------------------------------------------ hull */
    buildHull(THREE, M, g, T);
    g.add(deckRibbon(THREE, T.deck, -70.4, 70.4, 0.02, 0.04));

    /* helicopter platform on the quarterdeck: no hangar, just a spot */
    var pad = [[-59.0, 5.5], [-64.0, 5.9], [-68.0, 4.9], [-70.0, 3.9],
               [-70.0, -3.9], [-68.0, -4.9], [-64.0, -5.9], [-59.0, -5.5]];
    var pm = new THREE.Mesh(M.slab(THREE, pad, 0.10), T.pad);
    pm.position.z = deckZ(-64) + 0.05; g.add(pm);

    /* ---- forecastle bulwark and breakwater ---- */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 5; i++) {
        var xa = 57.0 + i * 2.6, xb = xa + 2.6;
        var ya = s * (halfB(xa) - 0.10), yb = s * (halfB(xb) - 0.10);
        var za = deckZ(xa), zb = deckZ(xb);
        var mid = new THREE.Mesh(
          new THREE.BoxGeometry(Math.sqrt((xb - xa) * (xb - xa) + (yb - ya) * (yb - ya)),
                                0.13, 1.25), T.hull);
        mid.position.set((xa + xb) * 0.5, (ya + yb) * 0.5, (za + zb) * 0.5 + 0.62);
        mid.rotation.z = Math.atan2(yb - ya, xb - xa);
        g.add(mid);
      }
    }
    for (s = -1; s <= 1; s += 2) {
      var bw = box(THREE, g, 4.6, 0.16, 1.15, T.sup, 49.6, s * 1.9, deckZ(49.6) + 0.58);
      bw.rotation.z = s * 0.62;
    }

    /* ------------------------------------------------- superstructure */
    /* 01 deck: one long house from abaft the forward launcher to the
       after control position */
    tprism(THREE, g, 23.0, 11.2, 22.4, 10.7, 4.30, T.sup,   9.5, 0, 6.95);
    tprism(THREE, g, 29.0, 11.0, 28.4, 10.5, 4.10, T.sup, -16.5, 0, 6.85);
    /* 02 deck: bridge block forward, uptake casing aft */
    tprism(THREE, g, 29.0, 10.0, 28.4, 9.5, 3.30, T.sup,   5.5, 0, 10.75);
    tprism(THREE, g, 17.0,  9.4, 16.6, 9.0, 3.10, T.sup, -17.5, 0, 10.45);
    /* 03 deck: chart house / signal deck under the forward mack */
    tprism(THREE, g, 10.0, 7.2, 9.4, 6.6, 2.70, T.sup, 13.0, 0, 13.75);
    /* after control position */
    tprism(THREE, g, 5.4, 8.0, 5.0, 7.4, 2.70, T.sup, -28.6, 0, 10.25);

    /* bridge front: raked face, an eyebrow, and a band of glazing */
    box(THREE, g, 0.35, 9.0, 3.30, T.sup, 20.10, 0, 10.75);
    box(THREE, g, 0.40, 8.60, 1.15, T.glass, 20.28, 0, 11.72);
    box(THREE, g, 1.20, 9.20, 0.22, T.sup2, 20.60, 0, 12.42);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 3.60, 0.35, 1.05, T.glass, 18.20, s * 4.92, 11.68);
      /* pilothouse door and a small side scuttle band aft */
      box(THREE, g, 2.20, 0.30, 0.85, T.glass, 10.50, s * 4.85, 11.55);
    }
    /* bridge wings, with a team-coloured flash on the bulwark face */
    var wing = [[9.0, 7.30], [15.5, 7.30], [16.4, 5.00], [9.0, 5.00]];
    for (s = -1; s <= 1; s += 2) {
      var wm = new THREE.Mesh(M.slab(THREE, wing, 0.22), T.sup2);
      wm.position.z = 12.40; wm.scale.y = s; g.add(wm);
      box(THREE, g, 6.8, 0.16, 1.05, T.sup, 12.4, s * 7.24, 13.05);
      box(THREE, g, 2.4, 0.09, 0.44, T.team, 12.4, s * 7.34, 13.10);
      cylZ(THREE, g, 0.30, 0.30, 0.72, 10, T.canvas, 15.6, s * 6.6, 12.90);
    }
    /* 03 deck rail and the SA-N-1 director on the chart house roof */
    railRunFlat(THREE, g, T, 8.4, 17.6, 6.4, 15.10, 1.0);

    /* ---------------------------------------------------------- macks */
    mack(THREE, g, T, {
      cx: 1.0, z0: 12.40, zM: 18.60, zT: 22.60, zTop: 29.10,
      l0: 11.6, w0: 10.6, l1: 9.4, w1: 8.8, l2: 6.0, w2: 6.2,
      fx: -8.4, fz0: 12.40, fz1: 21.40, fl: 5.2, fw: 6.3, yard: 4.8
    });
    mack(THREE, g, T, {
      cx: -17.5, z0: 12.00, zM: 17.40, zT: 21.00, zTop: 27.00,
      l0: 10.4, w0: 10.0, l1: 8.4, w1: 8.2, l2: 5.4, w2: 5.6,
      fx: -24.1, fz0: 12.00, fz1: 19.60, fl: 4.4, fw: 5.7, yard: 4.4
    });

    /* THE SCOOP PAIRS -- one huge parabolic pair per mack. Forward mack
       looks ahead off a platform on its fore face; after mack looks astern
       off the platform on its head. */
    tprism(THREE, g, 4.0, 7.8, 4.0, 7.8, 0.24, T.sup2, 7.0, 0, 19.75);
    scoopPair(THREE, g, T, 6.6, 0, 19.88, 0.62, 2.15);
    tprism(THREE, g, 6.0, 7.4, 6.0, 7.4, 0.24, T.sup2, -22.6, 0, 21.15);
    scoopPair(THREE, g, T, -22.9, 0, 21.28, PI - 0.62, 2.00);

    /* HEAD NET air search at the head of each mack */
    headNet(THREE, g, T, 0.7, 0, 30.10, 7.6, 2.3);
    headNet(THREE, g, T, -17.8, 0, 28.00, 6.8, 2.1);

    /* ------------------------------------------------------- weapons */
    /* FORWARD SS-N-3: this is the group render3d.js trains. The outer
       group carries a fixed +90 deg roll so that the renderer's
       turret.rotation.y becomes a true yaw about the ship's vertical
       axis; the inner group takes it straight back out again, so at rest
       the launcher sits exactly where it was drawn. */
    var tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(30.0, 0, deckZ(30.0) - 0.05);
    /* No local pre-rotation - see the note in nato_e50_carrier.js. */
    ssn3(THREE, tw, T);
    g.add(tw);

    /* AFTER SS-N-3, trained astern */
    var aft = new THREE.Group();
    aft.position.set(-38.5, 0, deckZ(-38.5) - 0.05);
    aft.rotation.z = PI;
    ssn3(THREE, aft, T);
    g.add(aft);

    /* SA-N-1 twin arm on its magazine house, forward of the bridge */
    tprism(THREE, g, 13.0, 9.0, 12.4, 8.2, 3.00, T.sup, 46.5, 0, 7.20);
    var sa = new THREE.Group();
    sa.position.set(46.8, 0, 8.68);
    sanOne(THREE, sa, T);
    g.add(sa);

    /* twin 76 mm AK-726, superfiring aft of the after launcher */
    tprism(THREE, g, 7.4, 8.4, 6.8, 7.6, 3.00, T.sup, -48.6, 0, 6.20);
    var gunB = new THREE.Group();
    gunB.position.set(-48.4, 0, 7.68); gunB.rotation.z = PI;
    ak726(THREE, gunB, T); g.add(gunB);
    var gunA = new THREE.Group();
    gunA.position.set(-56.4, 0, deckZ(-56.4) + 0.04); gunA.rotation.z = PI;
    ak726(THREE, gunA, T); g.add(gunA);

    /* two RBU-6000 ASW mortars right forward */
    for (s = -1; s <= 1; s += 2) {
      var rb = new THREE.Group();
      rb.position.set(56.4, s * 2.15, deckZ(56.4) + 0.04);
      rbu(THREE, rb, T); g.add(rb);
    }

    /* triple 533 mm torpedo tubes on the side decks */
    for (s = -1; s <= 1; s += 2) {
      var tt = new THREE.Group();
      tt.position.set(-24.0, s * 6.45, deckZ(-24) + 0.10);
      tt.rotation.z = s * 0.17;
      g.add(tt);
      tprism(THREE, tt, 3.2, 1.9, 2.8, 1.7, 0.55, T.sup2, 0, 0, 0.28);
      for (i = -1; i <= 1; i++)
        cylX(THREE, tt, 0.30, 0.30, 8.2, 10, T.sup, 0.4, i * 0.66, 0.95, true);
      cylX(THREE, tt, 0.10, 0.36, 0.7, 10, T.sup2, 4.75, 0, 0.95);
    }

    /* directors: SA-N-1 guidance forward, 76 mm control aft */
    director(THREE, g, T, 13.0, 0, 15.10, 1.35, 1.0);
    director(THREE, g, T, -28.6, 0, 11.60, 1.10, 0.92);
    director(THREE, g, T, -44.0, 0, deckZ(-44) + 3.4, 0.85, 0.78);
    tprism(THREE, g, 3.0, 3.4, 2.6, 3.0, 3.4, T.sup, -44.0, 0, deckZ(-44) + 1.7);

    /* ------------------------------------------------------- fittings */
    /* ship's boats on davits, in the gap between the macks */
    for (s = -1; s <= 1; s += 2) {
      var bsec = [], k;
      for (k = 0; k <= 6; k++) {
        var t = k / 6, bx = -3.9 + t * 7.8;
        var bwid = 0.75 * Math.sin(Math.PI * Math.pow(t, 0.75)) + 0.18;
        bsec.push({ x: bx, w: Math.max(0.10, bwid), h: 0.62, zc: 0, sq: 0.55 });
      }
      var bt = loftMesh(THREE, M, bsec, 10, T.canvas);
      bt.position.set(-8.2, s * 6.95, 8.20); g.add(bt);
      for (k = -1; k <= 1; k += 2) {
        strut(THREE, g, T.metal, -8.2 + k * 3.3, s * 5.30, 8.90,
              -8.2 + k * 3.3, s * 7.35, 9.35, 0.16, 5);
        strut(THREE, g, T.metal, -8.2 + k * 3.3, s * 7.35, 9.35,
              -8.2 + k * 3.3, s * 6.95, 8.55, 0.09, 4);
      }
    }
    /* life raft canisters and mushroom vents along the 01 deck */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 5; i++) {
        x = -2.0 - i * 5.2;
        cylX(THREE, g, 0.42, 0.42, 1.30, 8, T.canvas, x, s * 5.85, 9.55);
      }
      for (i = 0; i < 3; i++) {
        cylZ(THREE, g, 0.34, 0.34, 0.80, 8, T.sup2, 17.5 - i * 6.0, s * 3.4, 9.50);
        cylZ(THREE, g, 0.46, 0.34, 0.24, 8, T.sup2, 17.5 - i * 6.0, s * 3.4, 10.00);
      }
      /* ready-service lockers on the forecastle */
      box(THREE, g, 2.4, 1.2, 1.0, T.sup, 38.0, s * 3.6, deckZ(38) + 0.54);
    }
    /* capstans, anchor gear, hawse anchors, staffs */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.55, 0.70, 0.70, 10, T.steel, 65.0, s * 1.55, deckZ(65) + 0.35);
      /* stock anchor stowed against the hull plating */
      var an = new THREE.Group();
      an.position.set(62.0, s * (halfB(62.0) + 0.02), deckZ(62.0) - 2.20);
      g.add(an);
      box(THREE, an, 2.90, 0.16, 0.42, T.gun, 0, 0, 0.55);
      box(THREE, an, 0.42, 0.16, 2.10, T.gun, 0, 0, -0.35);
      box(THREE, an, 1.05, 0.14, 0.46, T.gun, -0.72, 0, -1.28, 0.42);
      box(THREE, an, 1.05, 0.14, 0.46, T.gun, 0.72, 0, -1.28, -0.42);
    }
    cylZ(THREE, g, 0.05, 0.09, 3.10, 6, T.metal, 69.6, 0, deckZ(69.6) + 1.55);
    cylZ(THREE, g, 0.05, 0.09, 3.40, 6, T.metal, -70.0, 0, deckZ(-70) + 1.70);
    /* a pair of whip aerials abaft the after mack */
    for (s = -1; s <= 1; s += 2)
      strut(THREE, g, T.metal, -30.0, s * 5.0, 11.60, -31.4, s * 6.4, 18.60, 0.055, 3);

    /* --------------------------------------------------- underwater gear */
    for (s = -1; s <= 1; s += 2) {
      /* shaft, A-bracket, screw and rudder */
      cylX(THREE, g, 0.34, 0.34, 12.0, 8, T.steel, -57.5, s * 3.45, -4.55, true);
      strut(THREE, g, T.steel, -60.0, s * 3.45, -4.55, -61.6, s * 5.20, -2.30, 0.24, 5);
      strut(THREE, g, T.steel, -60.0, s * 3.45, -4.55, -60.4, s * 1.90, -2.60, 0.24, 5);
      cylX(THREE, g, 0.55, 0.85, 1.10, 10, T.brass, -63.6, s * 3.45, -4.25);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.55, 1.42), T.brass);
        bl.position.set(-63.6, s * 3.45, -4.25);
        bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.95);
        bl.rotation.y = 0.45;
        g.add(bl);
      }
      var rd = box(THREE, g, 3.20, 0.34, 3.60, T.steel, -66.8, s * 2.55, -3.30);
      rd.rotation.z = s * 0.03;
    }

    /* --------------------------------------------------------- railings */
    railRun(THREE, g, T, -69.0, -32.0, 5.4, 1.10, 0.22);
    railRun(THREE, g, T, -30.0, 22.0, 5.4, 1.10, 0.22);
    railRun(THREE, g, T, 24.0, 55.5, 5.2, 1.10, 0.22);

    /* team flashes: pennant number is painted into the hull skin, the
       funnel bands are set in mack(); add a hull band aft so ownership
       still reads when the bow is away from the camera */
    for (s = -1; s <= 1; s += 2)
      box(THREE, g, 5.6, 0.10, 0.42, T.team, -52.0, s * (halfB(-52) + 0.06), deckZ(-52) - 1.35);

    g.traverse(function (o) {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    return g;
  }

  /* railings on a flat platform (constant z), used on the signal deck */
  function railRunFlat(THREE, g, T, x0, x1, hw, z, hgt) {
    var i, s, n = 4, prev, x;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n;
        strut(THREE, g, T.metal, x, s * hw, z, x, s * hw, z + hgt, 0.045, 3);
        if (prev !== null)
          strut(THREE, g, T.metal, prev, s * hw, z + hgt * 0.96, x, s * hw, z + hgt * 0.96, 0.028, 3);
        prev = x;
      }
    }
  }

  return { build: build };
})();

/* Registration. Overwrite unconditionally: a hero model replaces whatever
   parametric hull already claimed this id. len is the real overall length
   of Project 58, 142.0 m. */
UNIT_MODELS["pact_e60_cruiser"] = {
  len: 142.0,
  build: function (THREE, M, C) { return HeroKynda.build(THREE, M, C); }
};
