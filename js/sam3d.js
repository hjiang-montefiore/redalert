/* ============ sam3d.js - mobile long-range surface-to-air missile vehicles ===
   The launchers for role "sam": the tier BELOW the static SAM Site building,
   which is emplaced, wired to the grid and stays where it was built. What
   these vehicles buy is that they shoot and then move before the reply
   arrives, which is the whole reason the S-300 family rewrote Western air
   planning in 1982. Everything in this file has to argue that at forty
   screen pixels.

   Model space follows models3d.js: +X nose, +Y left, +Z up, real metres.
   render3d.js applies rotation.x = -PI/2 to stand the model up, so this file
   is authored Z-UP and never Y-up, and it rescales by MEASURED length, so the
   `len` on each registration is the real overall extent and metadata only.

   WHAT THE SILHOUETTE HAS TO SAY, in order of importance:

     - It POINTS AT THE SKY. Four cold-launch canisters stood up on a slewing
       base is the single strongest read in the roster and the one thing that
       separates this vehicle from the ballistic launcher in ballistic_tel3d.js,
       which is the same class of chassis carrying the same class of round and
       keeps its missiles flat under a shroud. Tall and erect against long and
       low: that pair has to survive being sixty pixels tall.
     - The canisters are raked to 74.5 degrees and NOT to vertical. A true
       vertical column is featureless under this game's 49-degree camera - it
       presents one edge, it self-shadows into a single dark bar and it throws
       almost no shadow on the ground. Four degrees off the perpendicular is
       invisible as a fact and worth a great deal as a shape.
     - It is a WHEELED HEAVY TRACTOR, not a tank. Eight big road wheels with
       enormous single tyres, a low frame between them, no armour worth the
       name and a hull that is mostly deck. An air defence launcher that
       looked armoured would be lying about the 560-640 hp it actually has.
     - It is EMPLACED WHEN IT FIRES. Four hydraulic outriggers reach past the
       tyres to ground level, and a cable trunk runs the length of the deck
       from the cab to the launch base. Those two details are the deploy timer
       made visible: this thing cannot shoot until it has stopped and settled.
     - It EMITS, and that is what kills it. Where the vehicle carries its own
       engagement array it is on the ROTATING base, so it always looks where
       the canisters look. Where a nation's radar is genuinely a separate
       trailer - Patriot, Tien Kung, and the Pongae-5 whose radar nobody
       outside the country has ever verified - there is no array on the
       vehicle at all, because the silhouette should not claim a capability
       the unit description denies.

   THE ONE DELIBERATE INACCURACY, stated plainly: the 5P85 tube is round in
   real life and it is drawn here with a square section and a round mouth
   ring. Four cylinders standing shoulder to shoulder merge into one mass at
   RTS zoom - there is no shadow line between them - whereas four boxes keep
   their separating creases all the way down. The mouth rings put the round
   tube back where it can be seen. This is the same trade defences3d.js
   documents for its deliberately oversized gun barrels.

   THREE FAMILIES, THREE BUILDERS, and no copy-paste between nations:

     buildTelar()    the wheeled upright-canister launcher. S-400, HQ-9B,
                     Pongae-5 and Tien Kung III are one builder with different
                     axle counts, cab styles, canister lengths and radar
                     fits. The cab is the recognition cue: the MAZ/BAZ chassis
                     has two SEPARATED pods either side of the nose, the
                     Chinese Taian has a full-width forward-control armoured
                     cab, the North Korean copy has one plain wide box and no
                     array behind it at all, and the Taiwanese launcher wears
                     a commercial-pattern cab because the publicly shown
                     vehicles are visibly converted heavy transporters.
     buildPatriot()  the odd one in the class, and it must look it: an M983
                     HEMTT 8x8 TRACTOR towing an M860 semitrailer, launch
                     frame cranked to 38 degrees rather than stood up. PAC-3
                     swaps four big canister mouths for sixteen small ones in
                     a 4x4 block, and that grid is the whole recognition cue.
     buildRail()     the 1960s tier, which is a different machine entirely:
                     bare missiles lying on open rails on a TRACKED hull, with
                     no cover, no canister and no radar, because the
                     illuminator was a separate trailer and the launcher
                     visibly could not fight alone.

   ENGINE CONTRACT, checked against render3d.js before anything was drawn:
     - the whole launch assembly is one group named "turret" (render3d.js:1101
       sets turret.rotation.z), so the canisters and the array slew together;
     - every road wheel is a group named "roadwheel" (render3d.js:1068 spins
       them on rotation.y, which is the axle, so the wheels take no rotation);
     - a cylinder's own axis is +Y. To lay one along the vehicle it is turned
       rotation.z = PI/2 FIRST and only then raked with rotation.y - turning
       it about its own axis, which is what rotation.y alone does, moves
       nothing (js/armour3d.js:1845-1846 records that bug);
     - C.team arrives as a CSS hex STRING - "#4b8fe0" - so it goes straight
       into a material and no arithmetic may be done on it
       (js/mine_veh_layer.js:500-504);
     - the canister bodies are never painted C.team. render3d's eraPaint
       (:341-360) skips any material within 0.12 RGB of the team colour, and
       the canisters are the largest surface on the vehicle: team-coloured,
       they would be permanently exempt from the desert and tan era finishes.
       The team flash goes on a small marking panel and nowhere else.        */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  /* ------------------------------------------------------------- shorthand
     BoxGeometry(w, d, h) is X by Y by Z here. cylY takes no rotation and is
     therefore the axle case; cylX lies along the vehicle; cylZ stands up. */
  function box(THREE, w, d, h, mtl, x, y, z) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mtl);
    m.position.set(x || 0, y || 0, z || 0);
    return m;
  }
  function cylY(THREE, r1, r2, h, seg, mtl, x, y, z) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg), mtl);
    m.position.set(x || 0, y || 0, z || 0);
    return m;
  }
  function cylZ(THREE, r1, r2, h, seg, mtl, x, y, z) {
    var m = cylY(THREE, r1, r2, h, seg, mtl, x, y, z);
    m.rotation.x = Math.PI / 2;
    return m;
  }
  function cylX(THREE, r1, r2, h, seg, mtl, x, y, z) {
    var m = cylY(THREE, r1, r2, h, seg, mtl, x, y, z);
    m.rotation.z = Math.PI / 2;
    return m;
  }
  /* A cylinder spanning two arbitrary points. Rams, bracing struts and cable
     runs are all this, and doing them as trigonometry by hand is where these
     files go wrong - repairship3d.js:357 solves it the same way. */
  function link(THREE, mtl, r, a, b, seg) {
    var A = new THREE.Vector3(a[0], a[1], a[2]);
    var B = new THREE.Vector3(b[0], b[1], b[2]);
    var d = new THREE.Vector3().subVectors(B, A);
    var L = d.length();
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 8), mtl);
    m.position.copy(A).add(B).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    return m;
  }

  /* ------------------------------------------------------------- materials
     Three tiers and no more, exactly as the mine vehicles do it. SKIN is the
     painted bodywork: a procedural canvas with plate seams, bolt runs, stencil
     blocks and dust that gets heavier low down, cached per base colour so the
     five nations do not each pay for their own texture. METAL is running
     gear, frames, rams and rails. GLASS is the cab. */
  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hex(c) { return "#" + ("00000" + c.toString(16)).slice(-6); }

  var texCache = {};
  function skinTex(THREE, base, seed) {
    var key = base + ":" + seed;
    if (texCache[key] !== undefined) return texCache[key];
    texCache[key] = null;
    try {
      var W = 512, H = 512, i;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d");
      var R = rngFor(seed);

      g.fillStyle = hex(base); g.fillRect(0, 0, W, H);

      /* Disruptive blotches. A launcher spends its life under a camouflage
         net in a wood line, so the paint is patchy rather than uniform, and
         the patches are what stop a 12 m flat deck reading as a plank. */
      var lift = [0x0e0e08, -0x0c0c0a, 0x060a04];
      for (i = 0; i < 20; i++) {
        var t = lift[i % lift.length];
        var c2 = Math.max(0, Math.min(0xffffff, base + t));
        g.globalAlpha = 0.36; g.fillStyle = hex(c2);
        g.beginPath();
        g.ellipse(R() * W, R() * H, 34 + R() * 92, 20 + R() * 54, R() * 3.14, 0, 6.29);
        g.fill();
      }
      g.globalAlpha = 1;

      /* Plate seams and the light catching the plate above each one. */
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.5;
      for (i = 0; i < 22; i++) {
        var x = R() * W, y = R() * H, l = 60 + R() * 210;
        g.beginPath();
        if (R() < 0.6) { g.moveTo(x, y); g.lineTo(x + l, y + (R() - 0.5) * 10); }
        else { g.moveTo(x, y); g.lineTo(x + (R() - 0.5) * 10, y + l); }
        g.stroke();
      }
      g.strokeStyle = "rgba(255,255,255,0.07)"; g.lineWidth = 1.1;
      for (i = 0; i < 14; i++) {
        var hx = R() * W, hy = R() * H, hl = 50 + R() * 160;
        g.beginPath(); g.moveTo(hx, hy - 2); g.lineTo(hx + hl, hy - 2); g.stroke();
      }

      /* Bolt runs, and the stencil blocks that live all over a missile
         vehicle: lifting points, tyre pressures, earthing instructions. */
      g.fillStyle = "rgba(0,0,0,0.26)";
      for (i = 0; i < 26; i++) {
        var bx = R() * W, by = R() * H, n = 4 + ((R() * 8) | 0);
        for (var q = 0; q < n; q++) g.fillRect(bx + q * 6, by, 2, 2);
      }
      g.fillStyle = "rgba(216,214,196,0.24)";
      for (i = 0; i < 16; i++) {
        var sx = R() * W, sy = R() * H, rows = 1 + ((R() * 3) | 0);
        for (var rr = 0; rr < rows; rr++)
          g.fillRect(sx, sy + rr * 5, 14 + R() * 30, 2.4);
      }

      /* Chipped paint, then road dust: heavy low, nothing on the deck. */
      for (i = 0; i < 80; i++) {
        g.fillStyle = R() < 0.5 ? "rgba(128,118,98,0.28)" : "rgba(34,31,26,0.24)";
        g.fillRect(R() * W, R() * H, 2 + R() * 6, 2 + R() * 4);
      }
      var dust = g.createLinearGradient(0, H * 0.52, 0, H);
      dust.addColorStop(0, "rgba(160,147,116,0.00)");
      dust.addColorStop(1, "rgba(160,147,116,0.38)");
      g.fillStyle = dust; g.fillRect(0, H * 0.52, W, H * 0.48);
      g.fillStyle = "rgba(22,20,18,0.14)";
      for (i = 0; i < 30; i++) g.fillRect(R() * W, R() * H, 2 + R() * 4, 16 + R() * 58);

      var tex = new THREE.CanvasTexture(cv);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      /* r148 ships SRGBColorSpace but Texture.colorSpace is inert until r152,
         so the ONLY thing that works in this build is the old encoding field */
      if (THREE.sRGBEncoding !== undefined) tex.encoding = THREE.sRGBEncoding;
      tex.anisotropy = 8;
      texCache[key] = tex;
    } catch (e) { texCache[key] = null; }
    return texCache[key];
  }

  function skinMat(THREE, base, seed) {
    var m = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    var t = skinTex(THREE, base, seed || 1);
    if (t) m.map = t; else m.color.setHex(base);
    return m;
  }
  function mat(THREE, c, r, mt) {
    return new THREE.MeshStandardMaterial({
      color: c === undefined ? 0x54595d : c,
      roughness: r === undefined ? 0.58 : r,
      metalness: mt === undefined ? 0.42 : mt });
  }
  function glassMat(THREE) {
    return new THREE.MeshPhysicalMaterial({
      color: 0x27333c, roughness: 0.10, metalness: 0.0,
      transparent: true, opacity: 0.82 });
  }
  /* C.team is a CSS hex string and goes into the material untouched. */
  function teamMat(THREE, C) {
    return new THREE.MeshStandardMaterial({
      color: (C && C.team) ? C.team : "#4b8fe0", roughness: 0.56, metalness: 0.18 });
  }

  /* --------------------------------------------------------------- a wheel
     Named "roadwheel" so render3d.js finds it and spins it. A cylinder's
     axis is already +Y, which IS the axle, so nothing here is rotated. The
     hub stays a stop lighter than the tyre: on a turning wheel it is the
     only feature the eye can lock onto. */
  function roadWheel(THREE, r, w, rub, tread, hub, lod) {
    var G = new THREE.Group();
    G.name = "roadwheel";
    /* The tyre carries its own outer radius rather than wearing a separate
       tread band. The band was 48 triangles a wheel and there are sixteen
       wheels on the Patriot combination - that one saving is most of the
       difference between this file and the hand-authored support budget. */
    G.add(new THREE.Mesh(new THREE.CylinderGeometry(r, r, w * 0.78, 12), rub));
    /* sidewall bulge - a wheel without one is a plain disc */
    for (var s = -1; s <= 1; s += 2) {
      var wall = new THREE.Mesh(
        new THREE.CylinderGeometry(r * 0.84, r * 0.97, w * 0.13, 8), rub);
      wall.position.y = s * w * 0.44;
      G.add(wall);
    }
    /* the hub and its bolts are what the eye locks onto once the wheel is
       turning, so they stay a stop lighter than the tyre. Bolts are boxes:
       a six-sided cylinder costs twice as much and reads no better. */
    G.add(new THREE.Mesh(new THREE.CylinderGeometry(r * 0.40, r * 0.40, w * 1.02, 8), hub));
    if (lod !== 0)
      for (var b = 0; b < 5; b++) {
        var a = (b / 5) * Math.PI * 2 + 0.26;
        var bolt = new THREE.Mesh(
          new THREE.BoxGeometry(r * 0.13, w * 1.10, r * 0.13), hub);
        bolt.position.set(Math.cos(a) * r * 0.56, 0, Math.sin(a) * r * 0.56);
        G.add(bolt);
      }
    return G;
  }

  /* An arch over a tyre, in three segments, so it curves. Set flush it would
     be invisible; standing proud it is what gives the flank an outline. */
  function mudguard(THREE, g, skin, ax, y, r, w) {
    for (var k = 0; k < 3; k++) {
      var t = Math.PI * (0.20 + 0.60 * (k + 0.5) / 3);
      var seg = new THREE.Mesh(
        new THREE.BoxGeometry(r * 0.86, w * 1.66, 0.045), skin);
      seg.rotation.y = -(t + Math.PI / 2);
      seg.position.set(ax + Math.cos(t) * r * 1.24, y, r + Math.sin(t) * r * 1.24);
      g.add(seg);
    }
  }

  /* ------------------------------------------------------------ a canister
     Square body, round mouth ring, base plate, three strap bands and a
     stencil panel. Never painted the team colour: see the header. */
  function canister(THREE, g, len, r, tube, ring, dark, y, z, lod) {
    var i;
    g.add(box(THREE, len, r * 2, r * 2, tube, len * 0.5, y, z));
    /* mouth: the round tube put back where it can be seen */
    g.add(cylX(THREE, r * 1.06, r * 1.06, 0.13, lod ? 12 : 8, ring, len - 0.05, y, z));
    /* breech end and the gas-generator boss under it */
    g.add(box(THREE, 0.16, r * 2.14, r * 2.14, ring, 0.02, y, z));
    if (!lod) {
      /* A PAC-3 launcher carries SIXTEEN of these. At full dressing that is
         2,880 triangles for one fitting, and at forty screen pixels the 4x4
         grid of mouths is the entire read - the bands and the stencils on a
         0.31 m tube are not resolvable. So the small round is built plain. */
      g.add(box(THREE, 0.10, r * 2.10, r * 2.10, ring, len * 0.50, y, z));
      return;
    }
    g.add(cylX(THREE, r * 0.90, r * 0.90, 0.05, 12, dark, len + 0.03, y, z));
    g.add(box(THREE, 0.34, r * 0.9, r * 0.5, dark, 0.30, y, z - r * 1.05));
    for (i = 0; i < 3; i++)
      g.add(box(THREE, 0.11, r * 2.06, r * 2.06, ring,
                len * (0.24 + i * 0.26), y, z));
    /* the stencil block every sealed round wears on its flank */
    g.add(box(THREE, len * 0.30, 0.02, r * 0.42, dark, len * 0.55, y + r * 1.02, z + r * 0.30));
  }

  /* ================================================================ TELAR
     The wheeled upright-canister launcher: S-400, HQ-9B, Pongae-5, TK-III.
     P carries everything the nations differ by and nothing else. */
  function buildTelar(THREE, C, P) {
    var G = new THREE.Group();

    var skin  = skinMat(THREE, P.paint, P.seed);
    var steel = mat(THREE, 0x2f3438, 0.62, 0.40);
    var dark  = mat(THREE, 0x1d2124, 0.82, 0.18);
    var rub   = mat(THREE, 0x131518, 0.95, 0.02);
    var tread = mat(THREE, 0x0c0d0f, 0.97, 0.02);
    var hub   = mat(THREE, 0x474d51, 0.58, 0.40);
    var glass = glassMat(THREE);
    var team  = teamMat(THREE, C);
    /* The canisters get their own paint - a shade greener and darker than the
       bodywork. Painted the hull colour four tubes and a flat deck became one
       continuous mass and the vehicle stopped reading as a launcher. */
    var tube  = mat(THREE, P.canPaint, 0.86, 0.08);
    var ring  = mat(THREE, 0x3a4045, 0.60, 0.44);

    var L      = P.len;
    var X_NOSE = L * 0.5, X_TAIL = -L * 0.5;
    var HW     = P.halfW;
    var R      = P.wheelR;
    var TW     = R * 0.60;                     // tyre width
    var HY     = HW - 0.20;                    // half track
    var Z_TOP  = R + 1.05;                     // top of the frame rails
    var Z_DECK = Z_TOP + 0.16;                 // the deck everything sits on
    var i, s;

    /* ------------------------------------------------------------ chassis
       A heavy tractor is a frame, not a hull: a deep box between the wheels
       with the deck laid over it and nothing that could be called armour. */
    G.add(box(THREE, L * 0.94, HW * 1.42, Z_TOP - 0.60, skin,
              0, 0, (Z_TOP + 0.60) * 0.5));
    G.add(box(THREE, L * 0.90, HW * 2.00, 0.16, skin, -L * 0.02, 0, Z_DECK - 0.08));
    /* the frame rails showing under the deck lip, which is what stops the
       flank being one painted wall from the tyres up */
    for (s = -1; s <= 1; s += 2) {
      G.add(box(THREE, L * 0.88, 0.10, 0.30, steel, -L * 0.02, s * HW * 0.94, Z_TOP - 0.20));
      /* battery and air-tank lockers slung between the axles */
      G.add(box(THREE, 1.05, 0.34, 0.52, skin, -L * 0.02, s * (HW * 0.78), R + 0.42));
      G.add(box(THREE, 1.09, 0.38, 0.06, dark, -L * 0.02, s * (HW * 0.78), R + 0.70));
      G.add(cylX(THREE, 0.17, 0.17, 0.86, 10, steel, L * 0.16, s * (HW * 0.80), R + 0.36));
    }

    /* ------------------------------------------------------- running gear */
    for (i = 0; i < P.axleX.length; i++) {
      var ax = P.axleX[i];
      /* the axle beam and its differential, or the wheels hang off nothing */
      G.add(cylY(THREE, R * 0.13, R * 0.13, HY * 1.80, 8, steel, ax, 0, R));
      G.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.28, 6, 4), steel)
        .translateX(ax).translateY(-HY * 0.16).translateZ(R));
      for (s = -1; s <= 1; s += 2) {
        var wh = roadWheel(THREE, R, TW, rub, tread, hub, 1);
        wh.position.set(ax, s * HY, R);
        G.add(wh);
        mudguard(THREE, G, skin, ax, s * (HY + TW * 0.10), R, TW);
        /* the damper: a cylinder stands on end, so it is turned a quarter
           about X first and only then leaned in toward the frame */
        var st = cylY(THREE, R * 0.10, R * 0.085, R * 0.95, 7, steel,
                      ax, s * HY * 0.68, R * 1.36);
        st.rotation.x = Math.PI / 2 + s * 0.20;
        G.add(st);
      }
    }

    /* ------------------------------------------------------------ the cab
       The recognition cue, and the one place the four nations genuinely part
       company. Everything else about these vehicles is the same idea. */
    var CF = R + 0.50;                          // cab floor
    var CH = 1.42;                              // cab height
    var CX0 = X_NOSE - 2.45, CX1 = X_NOSE - 0.12;
    var CXC = (CX0 + CX1) * 0.5, CL = CX1 - CX0;

    function cabPod(hy, yc, wind, dx) {
      dx = dx || 0;
      G.add(box(THREE, CL, hy * 2, CH, skin, CXC + dx, yc, CF + CH * 0.5));
      /* windscreen: a plate laid on the front face and leaned back, so the
         cab has a face rather than a blank end */
      var w = box(THREE, 0.09, hy * 1.80, CH * 0.52, glass,
                  CX1 - 0.04 + dx, yc, CF + CH * 0.70);
      w.rotation.y = -0.22;
      G.add(w);
      if (wind) {
        /* side glass and a door line - a cab with no door is a container */
        G.add(box(THREE, CL * 0.42, 0.03, CH * 0.34, glass,
                  CXC - CL * 0.02 + dx, yc + hy * 1.01, CF + CH * 0.66));
        G.add(box(THREE, CL * 0.02, 0.03, CH * 0.86, dark,
                  CXC + CL * 0.24 + dx, yc + hy * 1.01, CF + CH * 0.48));
      }
      /* roof hatch, and the grab rail round it */
      G.add(box(THREE, 0.52, hy * 0.90, 0.07, dark, CXC - CL * 0.14 + dx, yc, CF + CH + 0.03));
      G.add(box(THREE, 0.60, hy * 1.00, 0.04, steel, CXC + CL * 0.20 + dx, yc, CF + CH + 0.02));
    }

    if (P.cab === "split") {
      /* The MAZ/BAZ signature: two separated crew pods either side of the
         nose with the engine between them. It is the single thing that tells
         a Russian launcher from its Chinese descendant at this zoom. */
      cabPod(0.62, 1.02, true);
      cabPod(0.62, -1.02, true);
      G.add(box(THREE, CL * 0.86, 0.86, CH * 0.60, skin, CXC - 0.10, 0, CF + CH * 0.32));
      for (i = 0; i < 5; i++)
        G.add(box(THREE, 0.06, 0.74, 0.09, dark, CX1 - 0.30 - i * 0.13, 0, CF + CH * 0.36));
    } else if (P.cab === "full") {
      /* Forward-control armoured cab across the full beam: the Taian TAS-5380
         and every Chinese TEL since. Longer, taller and a plain wall of glass. */
      cabPod(HW * 0.94, 0, false);
      G.add(box(THREE, 0.10, HW * 1.72, CH * 0.50, glass, CX1 - 0.02, 0, CF + CH * 0.72));
      for (s = -1; s <= 1; s += 2) {
        G.add(box(THREE, CL * 0.40, 0.03, CH * 0.32, glass,
                  CXC - CL * 0.04, s * HW * 0.95, CF + CH * 0.64));
        G.add(box(THREE, CL * 0.02, 0.03, CH * 0.88, dark,
                  CXC + CL * 0.22, s * HW * 0.95, CF + CH * 0.46));
      }
    } else if (P.cab === "wide") {
      /* One plain wide box with a hinged visor over the screen. The KPA
         vehicle is a copy made by an army that could not copy the radar, and
         the cab is where that shows first. */
      cabPod(HW * 0.88, 0, false);
      var vis = box(THREE, 0.62, HW * 1.60, 0.09, skin, CX1 - 0.18, 0, CF + CH * 1.02);
      vis.rotation.y = 0.42;
      G.add(vis);
      G.add(box(THREE, 0.09, HW * 1.56, CH * 0.42, glass, CX1 - 0.03, 0, CF + CH * 0.66));
    } else {
      /* Commercial pattern: a short BONNETED cab off a heavy road tractor,
         which is visibly what the publicly shown Taiwanese launchers are, and
         the only cab in the file that is not forward-control. The pod is set
         back to make room for the bonnet rather than the bonnet being hung
         off the front - hung off the front it pushed the measured extent 0.7 m
         past the nose and render3d rescaled the whole vehicle to compensate. */
      cabPod(HW * 0.74, 0, true, -0.80);
      G.add(box(THREE, 0.88, HW * 1.30, 0.62, skin, CX1 - 0.42, 0, CF + 0.31));
      G.add(box(THREE, 0.14, HW * 1.42, 0.34, dark, CX1 - 0.02, 0, CF + 0.14));
    }

    /* Bumper, headlamps and mirror arms. The rear crossmember matters for a
       reason that is not cosmetic: render3d.js:461 rescales every model by its
       MEASURED x extent, so a hull that stops short of its own tail plate is
       silently drawn oversized to make up the difference. */
    G.add(box(THREE, 0.22, HW * 1.76, 0.34, dark, X_NOSE - 0.10, 0, R + 0.20));
    G.add(box(THREE, 0.22, HW * 1.50, 0.34, dark, X_TAIL + 0.10, 0, R + 0.24));
    G.add(cylX(THREE, 0.10, 0.10, 0.26, 8, steel, X_TAIL + 0.02, 0, R + 0.24));
    for (s = -1; s <= 1; s += 2) {
      G.add(cylX(THREE, 0.13, 0.13, 0.16, 10, dark, X_NOSE - 0.14, s * HW * 0.72, R + 0.56));
      G.add(cylX(THREE, 0.11, 0.11, 0.04, 10, glass, X_NOSE - 0.04, s * HW * 0.72, R + 0.56));
      G.add(box(THREE, 0.05, 0.42, 0.05, steel, CX1 - 0.10, s * (HW * 1.02), CF + CH * 0.92));
      G.add(box(THREE, 0.06, 0.06, 0.36, dark, CX1 - 0.10, s * (HW * 1.20), CF + CH * 0.86));
    }

    /* -------------------------------------------------------- the deck kit
       A generator set, an operator cabin where the nation carries one, and
       the cable trunk that runs from the cab to the launch base. The trunk is
       the deploy timer made visible - the launcher is wired to the vehicle
       and neither can move until it is stowed. */
    var TX = P.turretX;
    var kitX = (CX0 + (TX + 1.55)) * 0.5, kitL = Math.max(0.6, CX0 - (TX + 1.55));
    G.add(box(THREE, kitL * 0.62, HW * 1.30, 0.86, skin, kitX + kitL * 0.16, 0, Z_DECK + 0.43));
    G.add(box(THREE, kitL * 0.64, HW * 1.34, 0.07, dark, kitX + kitL * 0.16, 0, Z_DECK + 0.88));
    for (i = 0; i < 4; i++)
      G.add(box(THREE, 0.07, HW * 1.20, 0.14, dark,
                kitX + kitL * 0.16 - kitL * 0.22 + i * kitL * 0.15, 0, Z_DECK + 0.52));
    /* exhaust stack off the generator, because it is a diesel and it is loud */
    G.add(cylZ(THREE, 0.10, 0.09, 0.72, 8, steel, kitX + kitL * 0.34, -HW * 0.62, Z_DECK + 1.22));
    /* the cable trunk down the left flank */
    G.add(box(THREE, kitL + 1.9, 0.24, 0.20, dark, kitX - 0.5, HW * 0.86, Z_DECK + 0.12));
    G.add(cylX(THREE, 0.30, 0.30, 0.36, 10, steel, TX + 1.30, HW * 0.72, Z_DECK + 0.32));
    /* spare-wheel or equipment pallet on the right, opposite the trunk */
    G.add(box(THREE, 1.10, 0.72, 0.42, skin, kitX - kitL * 0.24, -HW * 0.66, Z_DECK + 0.21));

    if (P.stowage) {
      /* lashed kit and a rolled net: an army that lives in the field */
      for (s = -1; s <= 1; s += 2) {
        G.add(box(THREE, 1.30, 0.34, 0.40, skin, -L * 0.30, s * (HW * 0.92), Z_DECK + 0.22));
        G.add(box(THREE, 1.34, 0.38, 0.05, dark, -L * 0.30, s * (HW * 0.92), Z_DECK + 0.44));
        G.add(cylX(THREE, 0.20, 0.20, 1.45, 8, mat(THREE, 0x4a4c38, 0.95, 0.02),
                   L * 0.06, s * (HW * 0.90), Z_DECK + 0.22));
      }
    }

    /* --------------------------------------------------------- outriggers
       Four hydraulic jacks reaching past the tyres to ground level. They are
       the honest reason this vehicle has a deploy timer at all, and their
       pads sit at z = 0.02 so the model's belly needs no snapping. */
    var jx = P.jackX, JY = HW + 0.26;
    for (i = 0; i < jx.length; i++)
      for (s = -1; s <= 1; s += 2) {
        var jy = s * JY;
        G.add(box(THREE, 0.34, JY - HW * 0.70, 0.22, steel,
                  jx[i], s * ((JY + HW * 0.70) * 0.5), Z_TOP - 0.30));
        G.add(cylZ(THREE, 0.13, 0.13, Z_TOP - 0.46, 6, steel, jx[i], jy, (Z_TOP - 0.40) * 0.5 + 0.20));
        G.add(cylZ(THREE, 0.09, 0.09, 0.34, 6, hub, jx[i], jy, 0.20));
        G.add(cylZ(THREE, 0.28, 0.32, 0.10, 8, dark, jx[i], jy, 0.05));
      }

    /* ============================================================ the launcher
       One group named "turret" so render3d slews the canisters and the array
       together. Inside it the cradle carries the whole raked assembly, and
       the rams are drawn between real points rather than guessed at. */
    var T = new THREE.Group();
    T.name = "turret";
    T.position.set(TX, 0, Z_DECK);
    G.add(T);

    /* turntable and its ring gear */
    T.add(cylZ(THREE, 1.36, 1.42, 0.16, 16, steel, 0, 0, 0.08));
    T.add(cylZ(THREE, 1.14, 1.14, 0.26, 12, skin, 0, 0, 0.28));
    for (i = 0; i < 8; i++) {
      var ta = (i / 8) * Math.PI * 2;
      T.add(box(THREE, 0.10, 0.10, 0.10, dark,
                Math.cos(ta) * 1.30, Math.sin(ta) * 1.30, 0.19));
    }

    var PIV_X = -1.72, PIV_Z = 0.44;            // the cradle trunnion
    /* trunnion bearings either side, or the cradle floats in the air */
    for (s = -1; s <= 1; s += 2)
      T.add(cylY(THREE, 0.26, 0.26, 0.22, 10, steel, PIV_X, s * 1.02, PIV_Z));
    T.add(box(THREE, 0.60, 2.36, PIV_Z, skin, PIV_X, 0, PIV_Z * 0.5));

    /* -------- the cradle
       Authored flat along +X and then raked. rotation.y alone is the whole
       elevation, and it is NEGATIVE because a negative rotation about +Y
       carries +X up toward +Z. */
    var CR = new THREE.Group();
    CR.position.set(PIV_X, 0, PIV_Z);
    CR.rotation.y = P.elev;                     // -1.30 rad = 74.5 degrees
    T.add(CR);

    /* The four tubes are spaced so there is a real gap between them. Set
       shoulder to shoulder - which is how they sit on the actual vehicle -
       they lit as one continuous slab under the game's single key light and
       the launcher read as a billboard on a lorry. Ten centimetres of air
       between the tubes puts four separate shadow lines back down the face,
       and that is what says FOUR ROUNDS rather than one large object. */
    var cl = P.canLen, cr = P.canR;
    var ys = P.canY;
    for (i = 0; i < ys.length; i++)
      canister(THREE, CR, cl, cr, tube, ring, dark, ys[i], 0.30 + cr, 1);

    /* the cradle frame the canisters are clamped into: two side beams, a
       heel plate and two cross straps */
    var fy = ys[0] + cr + 0.10;
    for (s = -1; s <= 1; s += 2) {
      CR.add(box(THREE, cl * 0.94, 0.11, 0.44, steel, cl * 0.48, s * fy, 0.30 + cr));
      CR.add(box(THREE, 0.16, 0.13, cr * 2.4, steel, cl * 0.20, s * fy, 0.30 + cr));
    }
    CR.add(box(THREE, 0.22, fy * 2, cr * 2.5, skin, 0.02, 0, 0.30 + cr));
    CR.add(box(THREE, 0.12, fy * 2.02, cr * 2.36, steel, cl * 0.62, 0, 0.30 + cr));
    /* the blast deflector under the heel: cold launch throws the round clear
       on a gas generator and the deck has to survive it */
    CR.add(box(THREE, 0.90, fy * 1.9, 0.10, dark, -0.30, 0, 0.20));

    /* -------- the erection rams
       Two of them, from the turntable up to a point on the cradle side beam.
       Computed with link() in the turret's own frame: the cradle end has to
       be rotated by hand because it lives in a rotated child. */
    var e = P.elev, ca = Math.cos(e), sa = Math.sin(e);
    var lx = cl * 0.34, lz = 0.30 + cr;
    /* forward rotation about +Y: x' = x cos + z sin, z' = -x sin + z cos */
    var wx = PIV_X + lx * ca + lz * sa;
    var wz = PIV_Z - lx * sa + lz * ca;
    for (s = -1; s <= 1; s += 2) {
      T.add(link(THREE, steel, 0.115, [0.62, s * 1.06, 0.30], [wx, s * (fy + 0.06), wz], 9));
      T.add(link(THREE, hub, 0.075, [0.62, s * 1.06, 0.30],
                 [(0.62 + wx) * 0.5, s * ((1.06 + fy) * 0.5), (0.30 + wz) * 0.5], 8));
      T.add(cylY(THREE, 0.17, 0.17, 0.24, 10, steel, 0.62, s * 1.06, 0.30));
    }

    /* -------- the engagement array, where the nation carries one on the
       vehicle at all. On the ROTATING base so it always looks where the
       canisters look; absent entirely where the radar is a separate trailer,
       because the silhouette must not claim what the description denies. */
    if (P.radar !== "none") {
      var mx = 1.05;
      T.add(box(THREE, 0.36, 0.96, 1.12, skin, mx, 0, 0.82));
      var face = new THREE.Group();
      face.position.set(mx + 0.22, 0, 1.62);
      face.rotation.y = -0.26;                  // tipped back off the vertical
      T.add(face);
      face.add(box(THREE, 0.18, 2.12, 1.62, dark, 0, 0, 0));
      face.add(box(THREE, 0.06, 1.98, 1.48, mat(THREE, 0x3d4a52, 0.42, 0.55), 0.12, 0, 0));
      if (P.radar === "planar") {
        /* HT-233: a flat phased array, so the face is ruled into modules */
        for (i = 0; i < 5; i++)
          face.add(box(THREE, 0.02, 1.96, 0.035, steel, 0.16, 0, -0.60 + i * 0.30));
        for (i = 0; i < 4; i++)
          face.add(box(THREE, 0.02, 0.035, 1.44, steel, 0.16, -0.74 + i * 0.50, 0));
      } else {
        /* the Russian grid: a coarser lattice with a feed horn on a boom */
        for (i = 0; i < 4; i++)
          face.add(box(THREE, 0.02, 1.96, 0.05, steel, 0.16, 0, -0.54 + i * 0.36));
        face.add(cylX(THREE, 0.09, 0.09, 0.60, 8, steel, 0.44, 0, 0));
        face.add(cylX(THREE, 0.10, 0.22, 0.30, 10, dark, 0.82, 0, 0));
      }
      /* the waveguide run down the back of the mast */
      T.add(box(THREE, 0.10, 0.16, 0.80, steel, mx - 0.20, 0.34, 0.88));
    } else {
      /* No array: a plain command box and a whip aerial, which is all a
         launcher gets when its radar is somebody else's vehicle. */
      T.add(box(THREE, 0.72, 0.96, 0.62, skin, 1.02, 0, 0.44));
      T.add(box(THREE, 0.16, 0.16, 0.10, dark, 1.02, 0.36, 0.80));
      T.add(cylZ(THREE, 0.024, 0.012, 1.30, 6, steel, 1.02, 0.36, 1.45));
    }

    /* ------------------------------------------------------- the team flash
       Small, on the cab side and on the cradle heel, and nowhere near the
       canisters - eraPaint skips anything within 0.12 RGB of the team colour
       and the canisters are the largest surface on the vehicle. */
    for (s = -1; s <= 1; s += 2) {
      G.add(box(THREE, 0.72, 0.04, 0.16, team, CXC - CL * 0.22,
                s * ((P.cab === "split" ? 1.65 : HW * 0.98)), CF + CH * 0.24));
      G.add(box(THREE, 0.56, 0.04, 0.14, team, -L * 0.16, s * (HW * 1.01), Z_TOP - 0.20));
    }
    CR.add(box(THREE, 0.30, 0.04, 0.20, team, 0.36, fy + 0.02, 0.30 + cr));

    return G;
  }

  /* ============================================================== PATRIOT
     A TRACTOR AND A SEMITRAILER, not one integrated 8x8, and it has to look
     like it or the class has no odd man out. The launch frame cranks to 38
     degrees rather than standing up, and PAC-3 replaces four big canister
     mouths with sixteen small ones in a 4x4 block - that grid is the entire
     recognition cue at forty screen pixels. The AN/MPQ-53/65 array is NOT on
     this vehicle: the radar is a separate trailer and the description says so. */
  function buildPatriot(THREE, C, P) {
    var G = new THREE.Group();

    var skin  = skinMat(THREE, P.paint, P.seed);
    var steel = mat(THREE, 0x2f3438, 0.62, 0.40);
    var dark  = mat(THREE, 0x1d2124, 0.82, 0.18);
    var rub   = mat(THREE, 0x131518, 0.95, 0.02);
    var tread = mat(THREE, 0x0c0d0f, 0.97, 0.02);
    var hub   = mat(THREE, 0x474d51, 0.58, 0.40);
    var glass = glassMat(THREE);
    var team  = teamMat(THREE, C);
    var tube  = mat(THREE, P.canPaint, 0.86, 0.08);
    var ring  = mat(THREE, 0x3a4045, 0.60, 0.44);

    var R = 0.62, TW = 0.44, HY = 1.22, i, s;
    var Z_FR = R + 0.86;                        // tractor frame top
    var Z_TD = R + 0.94;                        // trailer deck

    /* ------------------------------------------------------- the tractor
       M983A4 HEMTT: flat bonnet forward, a SHORT cab set well back off it,
       four axles in two close pairs. The short cab is what stops the front
       half reading as another long 8x8 like the Russian vehicle. */
    G.add(box(THREE, 7.6, 2.10, Z_FR - 0.58, skin, 4.10, 0, (Z_FR + 0.58) * 0.5));
    G.add(box(THREE, 7.4, 2.44, 0.14, skin, 4.10, 0, Z_FR + 0.07));
    /* bonnet, then the cab behind it */
    G.add(box(THREE, 1.55, 2.14, 0.72, skin, 6.72, 0, Z_FR + 0.50));
    var rad = box(THREE, 0.12, 1.90, 0.62, dark, 7.46, 0, Z_FR + 0.48);
    G.add(rad);
    for (i = 0; i < 5; i++)
      G.add(box(THREE, 0.05, 1.74, 0.07, steel, 7.52, 0, Z_FR + 0.26 + i * 0.11));
    G.add(box(THREE, 1.90, 2.44, 1.48, skin, 5.00, 0, Z_FR + 0.88));
    var wsc = box(THREE, 0.10, 2.08, 0.74, glass, 5.92, 0, Z_FR + 1.18);
    wsc.rotation.y = -0.20;
    G.add(wsc);
    for (s = -1; s <= 1; s += 2) {
      G.add(box(THREE, 0.78, 0.03, 0.50, glass, 4.94, s * 1.23, Z_FR + 1.06));
      G.add(box(THREE, 0.03, 0.03, 1.30, dark, 4.42, s * 1.23, Z_FR + 0.90));
      G.add(box(THREE, 0.05, 0.40, 0.05, steel, 5.86, s * 1.28, Z_FR + 1.40));
      G.add(box(THREE, 0.06, 0.06, 0.34, dark, 5.86, s * 1.48, Z_FR + 1.34));
      G.add(cylX(THREE, 0.12, 0.12, 0.16, 10, dark, 7.52, s * 0.86, R + 0.42));
      G.add(cylX(THREE, 0.10, 0.10, 0.04, 10, glass, 7.61, s * 0.86, R + 0.42));
    }
    G.add(box(THREE, 0.86, 2.44, 0.09, dark, 4.42, 0, Z_FR + 1.64));   // roof hatch
    G.add(cylZ(THREE, 0.09, 0.08, 1.30, 8, steel, 5.98, -1.12, Z_FR + 1.30)); // stack
    G.add(box(THREE, 0.22, 2.30, 0.36, dark, 7.62, 0, R + 0.14));       // bumper
    /* the fifth wheel the trailer rides on */
    G.add(cylZ(THREE, 0.52, 0.52, 0.14, 12, steel, 1.55, 0, Z_FR + 0.20));

    /* ------------------------------------------------------- the trailer
       M860: a long low deck on two rear axles with a gooseneck over the
       tractor's back bogie. The launch frame lives on the tail of it. */
    G.add(box(THREE, 8.95, 2.46, 0.30, skin, -3.02, 0, Z_TD - 0.15));
    G.add(box(THREE, 1.90, 2.10, 0.52, skin, 1.20, 0, Z_FR + 0.46));    // gooseneck
    var neck = box(THREE, 1.30, 2.10, 0.44, skin, 0.15, 0, Z_FR + 0.28);
    neck.rotation.y = 0.34;
    G.add(neck);
    for (s = -1; s <= 1; s += 2) {
      G.add(box(THREE, 8.75, 0.12, 0.34, steel, -3.02, s * 1.20, Z_TD - 0.34));
      /* deck stowage: cable reels, spares and the crew's kit */
      G.add(box(THREE, 1.20, 0.40, 0.42, skin, -0.40, s * 0.94, Z_TD + 0.21));
      G.add(box(THREE, 1.24, 0.44, 0.05, dark, -0.40, s * 0.94, Z_TD + 0.44));
    }
    G.add(cylX(THREE, 0.34, 0.34, 0.44, 12, steel, -1.60, 0.88, Z_TD + 0.34));

    /* running gear: tractor four axles, trailer two, and the trailer runs
       duals because it carries the whole launching station */
    var AX = [[6.05, 0], [4.72, 0], [1.40, 0], [0.08, 0], [-5.45, 1], [-6.72, 1]];
    for (i = 0; i < AX.length; i++) {
      var ax = AX[i][0], dual = AX[i][1];
      var zc = dual ? R : R;
      G.add(cylY(THREE, R * 0.13, R * 0.13, HY * 1.80, 8, steel, ax, 0, zc));
      for (s = -1; s <= 1; s += 2) {
        /* The trailer runs duals, so eight of the sixteen wheels are half
           buried in their own pair and are built plain. */
        var w1 = roadWheel(THREE, R, TW, rub, tread, hub, dual ? 0 : 1);
        w1.position.set(ax, s * HY, zc);
        G.add(w1);
        if (dual) {
          var w2 = roadWheel(THREE, R, TW, rub, tread, hub, 0);
          w2.position.set(ax, s * (HY - TW * 1.10), zc);
          G.add(w2);
        }
        mudguard(THREE, G, skin, ax, s * (HY + TW * 0.10), R, TW);
      }
    }

    /* landing legs under the gooseneck, down at ground level: with the
       tractor uncoupled this is what the trailer stands on, and it says the
       combination is two vehicles rather than one */
    for (s = -1; s <= 1; s += 2) {
      G.add(cylZ(THREE, 0.12, 0.12, Z_TD - 0.44, 8, steel, 1.90, s * 1.05, (Z_TD - 0.30) * 0.5));
      G.add(box(THREE, 0.40, 0.34, 0.10, dark, 1.90, s * 1.05, 0.05));
    }
    /* and the four outriggers the launching station is levelled on */
    var jx = [-2.40, -7.30];
    for (i = 0; i < jx.length; i++)
      for (s = -1; s <= 1; s += 2) {
        G.add(box(THREE, 0.32, 0.44, 0.20, steel, jx[i], s * 1.44, Z_TD - 0.30));
        G.add(cylZ(THREE, 0.12, 0.12, Z_TD - 0.42, 8, steel, jx[i], s * 1.66, (Z_TD - 0.30) * 0.5));
        G.add(cylZ(THREE, 0.28, 0.32, 0.10, 10, dark, jx[i], s * 1.66, 0.05));
      }

    /* ========================================================= the launcher
       Named "turret": the M901 does traverse in azimuth on its trailer, and
       the engine has to be able to point it. Elevation is fixed at 38 degrees
       - a Patriot canister is cranked, not stood up, and that shallower rake
       is the difference the player should see against the Russian vehicle. */
    var T = new THREE.Group();
    T.name = "turret";
    T.position.set(-6.10, 0, Z_TD + 0.02);
    G.add(T);
    T.add(cylZ(THREE, 1.24, 1.30, 0.16, 16, steel, 0, 0, 0.08));
    T.add(box(THREE, 1.30, 2.30, 0.42, skin, 0, 0, 0.37));
    for (s = -1; s <= 1; s += 2)
      T.add(cylY(THREE, 0.24, 0.24, 0.20, 10, steel, -0.10, s * 0.94, 0.58));

    var CR = new THREE.Group();
    CR.position.set(-0.10, 0, 0.58);
    CR.rotation.y = -0.66;                      // 38 degrees, the M901 setting
    T.add(CR);

    var cl = P.canLen, cr = P.canR;
    /* Four big mouths or sixteen small ones. Everything else about the two
       marks is identical, which is exactly the point: PAC-3 is a different
       missile in the same launching station. */
    var gy = [1.5, 0.5, -0.5, -1.5];
    var gz = P.grid ? [1.5, 0.5, -0.5, -1.5] : [0];
    for (i = 0; i < gy.length; i++)
      for (var j = 0; j < gz.length; j++)
        canister(THREE, CR, cl, cr, tube, ring, dark,
                 gy[i] * cr * 2.32, 0.42 + cr + gz[j] * cr * 2.32, !P.grid);

    /* the box frame the canisters ride in - on a Patriot the frame is the
       thing you see and the canisters sit inside it */
    var hwF = Math.abs(gy[0]) * cr * 2.32 + cr + 0.12;
    var hzF = (P.grid ? Math.abs(gz[0]) * cr * 2.32 : 0) + cr + 0.12;
    for (s = -1; s <= 1; s += 2) {
      CR.add(box(THREE, cl * 0.96, 0.10, hzF * 2, steel, cl * 0.48, s * hwF, 0.42 + cr));
      CR.add(box(THREE, cl * 0.96, hwF * 2, 0.10, steel, cl * 0.48, 0, 0.42 + cr + s * hzF));
    }
    CR.add(box(THREE, 0.16, hwF * 2.02, hzF * 2.02, skin, 0.04, 0, 0.42 + cr));
    CR.add(box(THREE, 0.12, hwF * 2.04, hzF * 2.04, steel, cl * 0.66, 0, 0.42 + cr));

    /* the elevation rams, drawn between real points in the turret frame */
    var ca = Math.cos(-0.66), sa = Math.sin(-0.66);
    var lx = cl * 0.30, lz = 0.42 + cr - hzF;
    var wx = -0.10 + lx * ca + lz * sa, wz = 0.58 - lx * sa + lz * ca;
    for (s = -1; s <= 1; s += 2) {
      T.add(link(THREE, steel, 0.11, [1.05, s * 0.92, 0.24], [wx, s * (hwF - 0.10), wz], 9));
      T.add(cylY(THREE, 0.16, 0.16, 0.22, 10, steel, 1.05, s * 0.92, 0.24));
    }
    /* the launching station's own generator and data link mast: no radar,
       because the radar is a mile away on its own trailer */
    T.add(box(THREE, 0.70, 1.00, 0.60, skin, 1.30, 0, 0.42));
    T.add(cylZ(THREE, 0.026, 0.014, 1.55, 6, steel, 1.30, 0.36, 1.50));
    T.add(box(THREE, 0.20, 0.20, 0.12, dark, 1.30, 0.36, 0.76));

    for (s = -1; s <= 1; s += 2) {
      G.add(box(THREE, 0.70, 0.04, 0.16, team, 4.94, s * 1.24, Z_FR + 0.62));
      G.add(box(THREE, 0.56, 0.04, 0.14, team, -3.60, s * 1.26, Z_TD - 0.34));
    }
    return G;
  }

  /* ================================================================= RAILS
     The 1960s tier, and a different machine entirely. Bare missiles lying on
     open rails on a TRACKED hull: no canister, no cover, no cab worth the
     name and no radar at all, because the illuminator was a separate trailer
     and the launcher visibly could not fight on its own. That is the whole
     argument of the era - the first vehicles that could move a long-range
     SAM were transporters with rails bolted on. */
  function missile(THREE, g, M, x0, y, z) {
    /* Laid along +X in the rail group's own frame. The body is a cylinder
       turned rotation.z = PI/2 FIRST; raking it afterwards is the caller's
       job and rotation.y alone would only spin it about its own axis. */
    var L = M.len, r = M.r;
    g.add(cylX(THREE, r, r, L * 0.74, 12, M.body, x0 + L * 0.37, y, z));
    /* ogive nose in two steps, which reads far better than one long cone */
    g.add(cylX(THREE, r * 0.74, r, L * 0.13, 12, M.body, x0 + L * 0.805, y, z));
    var cone = new THREE.Mesh(new THREE.ConeGeometry(r * 0.74, L * 0.13, 12), M.nose);
    cone.rotation.z = -Math.PI / 2;
    cone.position.set(x0 + L * 0.935, y, z);
    g.add(cone);
    /* tail: nozzle and the four fins */
    g.add(cylX(THREE, r * 0.88, r * 0.70, L * 0.06, 12, M.metal, x0 + L * 0.03, y, z));
    for (var f = 0; f < 4; f++) {
      var a = f * Math.PI / 2 + Math.PI / 4;
      var fin = new THREE.Mesh(new THREE.BoxGeometry(L * 0.18, r * 1.55, 0.045), M.metal);
      fin.rotation.x = a;
      fin.position.set(x0 + L * 0.09, y + Math.cos(a) * r * 1.05, z + Math.sin(a) * r * 1.05);
      g.add(fin);
      /* mid-body control surface, half the size and further forward */
      var wg = new THREE.Mesh(new THREE.BoxGeometry(L * 0.11, r * 1.05, 0.04), M.metal);
      wg.rotation.x = a;
      wg.position.set(x0 + L * 0.50, y + Math.cos(a) * r * 0.80, z + Math.sin(a) * r * 0.80);
      g.add(wg);
    }
    if (M.ducts) {
      /* 2K11's ramjets: four intake ducts wrapped round the body, and there
         is nothing else in the game that looks like this. */
      for (var d = 0; d < 4; d++) {
        var da = d * Math.PI / 2 + Math.PI / 4;
        var cy = y + Math.cos(da) * r * 1.28, cz = z + Math.sin(da) * r * 1.28;
        g.add(cylX(THREE, r * 0.40, r * 0.40, L * 0.46, 10, M.metal, x0 + L * 0.40, cy, cz));
        g.add(cylX(THREE, r * 0.44, r * 0.34, L * 0.10, 10, M.nose, x0 + L * 0.66, cy, cz));
        g.add(cylX(THREE, r * 0.30, r * 0.30, 0.06, 10, M.dark, x0 + L * 0.71, cy, cz));
      }
    }
    if (M.booster) {
      /* the HQ-2's strap-on first stage: fatter than the missile and half its
         length, which is why the round overhangs its own vehicle */
      var b = M.booster;
      g.add(cylX(THREE, b.r, b.r * 0.92, b.len, 12, M.body, x0 - b.len * 0.5 + 0.10, y, z));
      g.add(cylX(THREE, b.r * 0.96, b.r * 0.70, b.len * 0.10, 12, M.metal,
                 x0 - b.len + 0.14, y, z));
      for (var q = 0; q < 4; q++) {
        var qa = q * Math.PI / 2;
        var bf = new THREE.Mesh(new THREE.BoxGeometry(b.len * 0.30, b.r * 1.8, 0.05), M.metal);
        bf.rotation.x = qa;
        bf.position.set(x0 - b.len * 0.82, y + Math.cos(qa) * b.r * 1.15,
                        z + Math.sin(qa) * b.r * 1.15);
        g.add(bf);
      }
    }
  }

  function buildRail(THREE, C, P) {
    var G = new THREE.Group();

    var skin  = skinMat(THREE, P.paint, P.seed);
    var steel = mat(THREE, 0x2f3438, 0.62, 0.40);
    var dark  = mat(THREE, 0x1a1d20, 0.86, 0.14);
    var hub   = mat(THREE, 0x474d51, 0.58, 0.40);
    var team  = teamMat(THREE, C);
    var Mms = {
      len: P.mLen, r: P.mR, ducts: P.ducts, booster: P.booster,
      body: mat(THREE, P.mPaint, 0.80, 0.10),
      nose: mat(THREE, 0x2b2f33, 0.66, 0.30),
      metal: mat(THREE, 0x565c60, 0.52, 0.52),
      dark: dark,
    };

    var HL = P.hullLen, HW = P.halfW, i, s;
    var R = P.wheelR, BY = HW - 0.30, BW = P.beltW, BT = 0.09;
    var TRK = R * 2.32;                          // top of the upper belt run
    var Z_DECK = TRK + 0.72;

    /* ---- the hull. A tracked cargo carrier with the deck cleared: these
       vehicles were built on transporter and assault-gun chassis precisely
       because nobody was going to design a new hull for a missile rail. */
    G.add(box(THREE, HL * 0.92, HW * 1.62, Z_DECK - R * 0.55 - 0.14, skin,
              0, 0, (Z_DECK + R * 0.55 + 0.14) * 0.5 - 0.07));
    G.add(box(THREE, HL * 0.88, HW * 2.00, 0.14, skin, -HL * 0.02, 0, Z_DECK - 0.07));
    /* glacis: one plate leaned off the nose so the front is not a wall */
    var gl = box(THREE, 1.30, HW * 1.58, 0.14, skin, HL * 0.42, 0, Z_DECK - 0.44);
    gl.rotation.y = 0.62;
    G.add(gl);
    /* driver's station forward left, which is the only crew position visible */
    G.add(box(THREE, 1.05, 0.92, 0.46, skin, HL * 0.32, HW * 0.52, Z_DECK + 0.23));
    G.add(box(THREE, 0.10, 0.74, 0.22, glassMat(THREE), HL * 0.32 + 0.50, HW * 0.52, Z_DECK + 0.30));
    G.add(cylZ(THREE, 0.30, 0.30, 0.14, 12, skin, HL * 0.30, -HW * 0.55, Z_DECK + 0.07));

    /* ---- running gear. The belt is its two runs and not one solid slab:
       drawn as a slab it fills the space between the wheels and swallows
       them whole (js/mine_veh_layer.js:261). */
    var span = HL * 0.86;
    for (s = -1; s <= 1; s += 2) {
      var ty = s * BY;
      G.add(box(THREE, span, BW, BT, dark, 0, ty, BT * 0.5));
      G.add(box(THREE, span, BW, BT, dark, 0, ty, TRK - BT * 0.5));
      for (i = 0; i < P.wheels; i++) {
        var wx = -span * 0.40 + (span * 0.80) * (i / (P.wheels - 1));
        G.add(cylY(THREE, R, R, BW * 0.84, 12, dark, wx, ty, R));
        G.add(cylY(THREE, R * 0.34, R * 0.34, BW * 0.96, 8, hub, wx, ty, R));
      }
      G.add(cylY(THREE, R * 0.86, R * 0.86, BW * 0.74, 12, hub, span * 0.48, ty, R * 1.45));
      G.add(cylY(THREE, R * 0.76, R * 0.76, BW * 0.74, 12, dark, -span * 0.48, ty, R * 1.35));
      for (i = 0; i < 3; i++)
        G.add(cylY(THREE, 0.11, 0.11, BW * 0.50, 8, dark,
                   -span * 0.28 + i * span * 0.28, ty, TRK - BT - 0.12));
      /* fender and the stowage that lives on it */
      G.add(box(THREE, span * 0.92, BW + 0.10, 0.06, skin, 0, ty, TRK + 0.20));
      G.add(box(THREE, 1.10, BW * 0.80, 0.34, skin, -HL * 0.20, ty, TRK + 0.40));
      G.add(box(THREE, 1.14, BW * 0.84, 0.05, dark, -HL * 0.20, ty, TRK + 0.58));
    }

    /* ---- four screw jacks, because a rail launcher has to be levelled and
       staked before it fires just as much as a modern one does */
    for (i = -1; i <= 1; i += 2)
      for (s = -1; s <= 1; s += 2) {
        G.add(cylZ(THREE, 0.11, 0.11, TRK * 0.80, 8, steel,
                   i * HL * 0.34, s * (HW + 0.22), TRK * 0.42));
        G.add(cylZ(THREE, 0.26, 0.30, 0.09, 10, dark, i * HL * 0.34, s * (HW + 0.22), 0.045));
      }

    /* ======================================================== the launcher
       A slewing beam carrying bare rounds on open rails. Named "turret", so
       it tracks; elevated by the cradle exactly as the modern vehicles are,
       but to twenty-odd degrees instead of seventy-five, because a rail
       launcher throws its round onto a boost trajectory rather than popping
       it vertically out of a tube. */
    var T = new THREE.Group();
    T.name = "turret";
    T.position.set(P.turretX, 0, Z_DECK);
    G.add(T);
    T.add(cylZ(THREE, HW * 0.80, HW * 0.86, 0.16, 16, steel, 0, 0, 0.08));
    T.add(box(THREE, 1.50, HW * 1.30, 0.52, skin, 0, 0, 0.42));
    for (s = -1; s <= 1; s += 2)
      T.add(cylY(THREE, 0.22, 0.22, 0.20, 10, steel, -0.35, s * HW * 0.62, 0.72));

    var CR = new THREE.Group();
    CR.position.set(-0.35, 0, 0.72);
    /* NEGATIVE, exactly as on the modern vehicles: a negative rotation about
       +Y carries +X up toward +Z. Authored positive, the first pass of this
       file elevated every rail launcher twenty-four degrees INTO THE GROUND
       and the tell was a bounding box whose floor sat at -0.42 m. */
    CR.rotation.y = P.elev;
    T.add(CR);

    /* the beam, then the rails, then the rounds on them */
    var bl = P.mLen * (P.booster ? 0.92 : 0.86);
    CR.add(box(THREE, bl, P.railY.length * P.mR * 2.4 + 0.30, 0.20, steel, bl * 0.34, 0, 0));
    for (i = 0; i < P.railY.length; i++) {
      var ry = P.railY[i];
      /* the rail itself: a beam under the round with two shoe blocks */
      CR.add(box(THREE, bl, P.mR * 0.55, 0.13, steel, bl * 0.34, ry, P.mR * 0.72));
      CR.add(box(THREE, 0.22, P.mR * 1.20, 0.22, dark, bl * 0.10, ry, P.mR * 0.95));
      CR.add(box(THREE, 0.22, P.mR * 1.20, 0.22, dark, bl * 0.62, ry, P.mR * 0.95));
      missile(THREE, CR, Mms, P.booster ? P.booster.len * 0.55 : 0.10, ry, P.mR * 1.85);
    }
    /* the elevation ram, drawn between real points in the turret frame */
    var ca = Math.cos(P.elev), sa = Math.sin(P.elev);
    var lx = bl * 0.30, lz = -0.02;
    var wx = -0.35 + lx * ca + lz * sa, wz = 0.72 - lx * sa + lz * ca;
    for (s = -1; s <= 1; s += 2) {
      T.add(link(THREE, steel, 0.10, [0.55, s * HW * 0.58, 0.28],
                 [wx, s * (P.railY.length * P.mR * 1.2 + 0.10), wz], 9));
      T.add(cylY(THREE, 0.15, 0.15, 0.20, 10, steel, 0.55, s * HW * 0.58, 0.28));
    }
    /* the crew's launch console on the base, and a whip: there is no radar
       on this vehicle and there should not appear to be one */
    T.add(box(THREE, 0.60, 0.80, 0.52, skin, 0.85, 0, 0.42));
    T.add(cylZ(THREE, 0.024, 0.012, 1.20, 6, steel, 0.85, 0.30, 1.28));

    for (s = -1; s <= 1; s += 2)
      G.add(box(THREE, 0.62, 0.04, 0.14, team, HL * 0.10, s * (HW * 1.01), TRK + 0.44));
    return G;
  }

  /* ==================================================================== the
     registrations. One builder per family and a parameter block per nation:
     the differences below are the whole of what separates these armies, and
     every one of them is a real difference rather than a reskin.

     The era ids are registered against the same builders because in this
     class the stand-in is very often the literal truth - a PLA S-300PMU IS
     the Russian vehicle, China bought it in 1993 - and where it is not, the
     parameters carry the difference. armour_specs.js:469 calls registerAll()
     at load and index.html sources this file after it, so these win by plain
     assignment and the auto-generated "rocket" rows never see daylight for
     a unit named here.                                                     */

  var S300 = {                                  /* 5P85 on MAZ/BAZ 8x8       */
    len: 12.6, halfW: 1.55, wheelR: 0.72, seed: 5185,
    axleX: [4.55, 3.10, -2.30, -3.80], jackX: [3.90, -4.75],
    cab: "split", turretX: -1.39, elev: -1.30,
    canLen: 7.40, canR: 0.355, canY: [1.24, 0.42, -0.42, -1.24],
    radar: "grid", paint: 0x4a5340, canPaint: 0x3f4738,
  };
  var HQ9 = {                                   /* Taian TAS-5380 8x8        */
    len: 13.0, halfW: 1.55, wheelR: 0.72, seed: 9339,
    axleX: [4.80, 3.30, -2.30, -3.90], jackX: [4.05, -4.85],
    cab: "full", turretX: -1.45, elev: -1.30,
    canLen: 6.90, canR: 0.355, canY: [1.24, 0.42, -0.42, -1.24],
    radar: "planar", paint: 0x545b46, canPaint: 0x454b3a,
  };
  var PONGAE = {                                /* KN-06, the crude version  */
    len: 12.4, halfW: 1.54, wheelR: 0.70, seed: 6066,
    axleX: [4.40, 3.00, -2.25, -3.75], jackX: [3.80, -4.65],
    cab: "wide", turretX: -1.36, elev: -1.30,
    canLen: 7.00, canR: 0.355, canY: [1.23, 0.42, -0.42, -1.23],
    radar: "none", stowage: true, paint: 0x4c5339, canPaint: 0x414732,
  };
  var TK3 = {                                   /* a converted 6x6 transporter */
    len: 11.2, halfW: 1.44, wheelR: 0.66, seed: 3313,
    axleX: [4.00, -1.90, -3.40], jackX: [3.35, -4.30],
    cab: "civil", turretX: -1.25, elev: -1.30,
    canLen: 5.80, canR: 0.315, canY: [1.11, 0.38, -0.38, -1.11],
    radar: "none", paint: 0x5a6048, canPaint: 0x4b5140,
  };
  var PAC2 = {                                  /* M901 with four big rounds */
    len: 15.4, seed: 1042, canLen: 5.30, canR: 0.30, grid: false,
    paint: 0x555b44, canPaint: 0x4a4f3c,
  };
  var PAC3 = {                                  /* sixteen small mouths, 4x4 */
    len: 15.4, seed: 1043, canLen: 5.20, canR: 0.155, grid: true,
    paint: 0x6b6752, canPaint: 0x585541,
  };
  var PAC2_ROC = {
    len: 15.4, seed: 1044, canLen: 5.30, canR: 0.30, grid: false,
    paint: 0x4f5738, canPaint: 0x454b36,
  };

  var HAWK = {                                  /* M727 SP-HAWK, three rails */
    hullLen: 6.40, halfW: 1.35, wheelR: 0.30, beltW: 0.40, wheels: 5,
    turretX: -0.30, elev: -0.42, seed: 727,
    mLen: 5.03, mR: 0.185, railY: [0.60, 0, -0.60],
    paint: 0x4b5238, mPaint: 0xb9b7ab,
  };
  var KRUG = {                                  /* 2P24, two ramjet rounds   */
    hullLen: 7.60, halfW: 1.58, wheelR: 0.35, beltW: 0.46, wheels: 7,
    turretX: -0.40, elev: -0.35, seed: 2411,
    mLen: 8.80, mR: 0.42, ducts: true, railY: [0.86, -0.86],
    paint: 0x47523a, mPaint: 0x8e9188,
  };
  var HQ2 = {                                   /* one very large round, one rail */
    hullLen: 6.60, halfW: 1.50, wheelR: 0.40, beltW: 0.44, wheels: 5,
    turretX: -0.30, elev: -0.35, seed: 6322,
    mLen: 6.90, mR: 0.35, railY: [0], booster: { len: 4.20, r: 0.325 },
    paint: 0x4f5a35, mPaint: 0xa9a89c,
  };

  function reg(id, len, fn, P) {
    UNIT_MODELS[id] = {
      len: len,
      build: function (THREE, M, C) { return fn(THREE, C, P); },
    };
  }

  /* `len` is the MEASURED overall extent of the built model, not the real
     vehicle's catalogue length, exactly as js/mine_veh_layer.js:48 records
     8.00 m "over the plough arms". Where the two differ it is because a
     round overhangs its own chassis - the 2K11's ramjet missiles reach a
     metre and a half past the nose of the hull, and the HQ-2 overhangs at
     both ends, which is the whole point of that silhouette. */

  /* -- e20, the hand-finished tier ---------------------------------------- */
  reg("sam_p", 12.72, buildTelar, S300);          // S-400 Triumf, 5P85TE2
  reg("sam_c", 13.12, buildTelar, HQ9);           // HQ-9B on Taian TAS-5380
  reg("sam_k", 12.52, buildTelar, PONGAE);        // Pongae-5 / KN-06
  reg("sam_r", 11.32, buildTelar, TK3);           // Tien Kung III launcher
  reg("sam_n", 15.50, buildPatriot, PAC3);        // MIM-104F PAC-3 MSE

  /* -- the era rosters ---------------------------------------------------- */
  /* The S-300 launcher did not change between 1982 and 2001 - the round in
     the tube did - so one vehicle serves the whole Russian line, and the PLA
     row for the 1990s is that same vehicle because China bought it. */
  reg("pact_e80_sam", 12.72, buildTelar, S300);   // S-300PS, 5P85S
  reg("pact_e90_sam", 12.72, buildTelar, S300);   // S-300PM / PMU-1
  reg("pact_e00_sam", 12.72, buildTelar, S300);   // S-300PMU-2 Favorit
  reg("pla_e90_sam",  12.72, buildTelar, S300);   // S-300PMU, imported
  reg("pla_e00_sam",  13.12, buildTelar, HQ9);    // HQ-9

  reg("nato_e80_sam", 15.50, buildPatriot, PAC2); // MIM-104C, M901
  reg("nato_e90_sam", 15.50, buildPatriot, PAC2); // MIM-104D PAC-2 GEM
  reg("nato_e00_sam", 15.50, buildPatriot, PAC3); // MIM-104E PAC-3
  reg("roc_e00_sam",  15.50, buildPatriot, PAC2_ROC); // PAC-2 GEM+ (MADS)

  /* The 1960s tier. These are registered here rather than left to the
     armour_specs "rocket" generator because the generator draws a pack of
     tubes on a hull, and the whole point of this decade is that there is no
     pack: the round lies naked on a rail with nothing over it. */
  reg("nato_e60_sam", 6.89, buildRail, HAWK);    // M727 Self-Propelled HAWK
  reg("pact_e60_sam", 10.95, buildRail, KRUG);    // 2K11 Krug, 2P24
  reg("pla_e60_sam", 10.90, buildRail, HQ2);     // HQ-2 on a Type 63 hull
  reg("pla_e80_sam", 10.90, buildRail, HQ2);     // the same, twenty years on
})();
