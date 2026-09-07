/* ==========================================================================
   repairship3d.js -- SALVAGE AND REPAIR TENDER, unit id "repair_sea".

   The naval half of the recovery vehicle. A 110 m fleet auxiliary whose
   whole reason to exist is other people's damage, and the silhouette has to
   say so before the player reads the label:

     - Everything that steers, sleeps and navigates is crammed FORWARD. The
       bridge block sits on a raised forecastle in the forward third, which
       is the one proportion that separates an auxiliary from a warship at
       RTS zoom: on a frigate the superstructure is amidships.
     - The after two thirds is one large OPEN WORKING DECK, low, flat and
       walled by a solid bulwark rather than wire rails, because things get
       dragged across it.
     - The identity is the heavy A-FRAME straddling the transom, raked aft
       so its head and its sheave block overhang the water, with hydraulic
       luffing rams down to the quarterdeck.
     - Under it a stern roller in a notch in the transom bulwark, a towing
       staple and bollards: this ship tows cripples home.
     - Two SALVAGE WINCH drums on the working deck, wire on the barrels.
     - Workshop containers, gas bottle racks and hose reels for the bunkers
       (repair_sea carries oiler:true, so it fuels as well as mends).
     - Life raft canisters and a rescue boat on davits at the 01 deck edge,
       a pole mast with a small nav radar, and a hull number decal a side.

   No gun: repair_sea has weapons:[] and no turret field, so there is no
   group named "turret" here. render3d.js only drives parts named turret /
   mountwrap / roadwheel / rotor / rotordisc / tailrotor / gear, so nothing
   on this ship spins; the radar and the A-frame are static geometry.

   Model space follows models3d.js and warship3d.js: +X bow, +Y to port
   (left), +Z up, real metres, waterline at z = 0. render3d.js stands the
   model up with tpl.rotation.x = -PI/2 and rescales it by MEASURED length,
   so authoring this file +Y up would lay the ship on her side, and the len
   below is metadata, not the on-screen size.

   Hull, plating and paint follow mine_ship_layer.js so this ship sits
   beside the rest of the fleet:
     - two lofts, not one. The grey topsides run from just under the
       waterline up to the deck and are a few centimetres wider than the
       underbody loft inside them, which gives a crisp knuckle at the
       waterline, a dark boot topping below it, and no z-fighting.
     - M.loft winds its quads inward, so the winding is flipped and the
       normals recomputed rather than papered over with DoubleSide.
     - the main deck is a separate cambered ribbon lying on the hull top,
       so it carries the sheer and the forecastle step.

   Materials are the house three tiers only: SKIN (painted steel carrying a
   procedural CanvasTexture), METAL (rails, wire, gantry) and GLASS (the
   wheelhouse windows), plus one hi-vis for gear that is meant to be seen.

   ASCII only. A stray byte inside a hex literal has broken this repo.
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var RepairShip3D = (function () {
  "use strict";

  var PI = Math.PI;

  /* ------------------------------------------------ principal dimensions */
  var LOA  = 110.0;                /* length overall                        */
  var XA   = -55.0, XF = 55.0;     /* transom and stem                      */
  var BH   = 8.60;                 /* maximum half beam                     */
  var XBRK = 14.0;                 /* forecastle break                      */
  var DKA  = 4.05;                 /* freeboard at the transom              */
  var FCR  = 2.05;                 /* height of the forecastle step         */

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* ------------------------------------------------------------ hull form
     Half beam as a fraction of the maximum, stern (u = 0) to stem (u = 1).
     A salvage tender is a full-bodied workboat: long parallel midbody and a
     wide transom, because the working deck has to be a deck and not a point. */
  var HWT = [[0.000, 0.780], [0.040, 0.880], [0.100, 0.945], [0.190, 0.985],
             [0.320, 1.000], [0.520, 1.000], [0.660, 0.990], [0.760, 0.945],
             [0.840, 0.845], [0.905, 0.665], [0.950, 0.455], [0.980, 0.235],
             [1.000, 0.035]];

  function tbl(T, u) {
    var i;
    if (u <= T[0][0]) return T[0][1];
    for (i = 1; i < T.length; i++) {
      if (u <= T[i][0])
        return lerp(T[i - 1][1], T[i][1], (u - T[i - 1][0]) / (T[i][0] - T[i - 1][0]));
    }
    return T[T.length - 1][1];
  }
  function hwAt(x) { return BH * tbl(HWT, (x - XA) / LOA); }

  /* working deck aft of the break, forecastle deck forward of it, both with
     sheer; the step is what makes the after deck read as LOW and WORKING  */
  function deckZ(x) {
    if (x <= XBRK) return DKA + 0.85 * Math.pow((x - XA) / (XBRK - XA), 1.7);
    return DKA + 0.85 + FCR + 1.55 * Math.pow((x - XBRK) / (XF - XBRK), 1.75);
  }
  function keelZ(x) {
    if (x < -34.0) return -4.60 + 2.10 * Math.pow((-34.0 - x) / 21.0, 1.5);
    if (x >  26.0) return -4.60 + 4.05 * Math.pow((x - 26.0) / 29.0, 1.9);
    return -4.60;
  }
  /* superellipse exponent: well below 1 squares the topsides off, nearer 1
     rounds the bilge and pinches the entry in                              */
  function sqTop(x) {
    var u = (x - XA) / LOA;
    if (u < 0.15) return 0.34 - 0.10 * (u / 0.15);
    if (u < 0.74) return 0.24;
    return 0.24 + 0.36 * ((u - 0.74) / 0.26);
  }
  function sqLow(x) {
    var u = (x - XA) / LOA;
    if (u < 0.15) return 0.54 - 0.10 * (u / 0.15);
    if (u < 0.70) return 0.44;
    return 0.44 + 0.48 * ((u - 0.70) / 0.30);
  }

  /* stations: doubled either side of the forecastle break so the step is a
     step and not a ramp                                                    */
  var STX = [-55, -51, -46, -38, -28, -16, -4, 6, 13.85, 14.15,
             22, 30, 38, 44, 48, 51.5, 55];

  var UW = 0.14;   /* topsides loft dips this far below the waterline */
  var EX = 0.08;   /* and stands this much proud of the underbody     */

  /* ======================================================== textures */
  var TEX = {};

  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function finish(THREE, cv, rep) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (rep) t.repeat.set(rep[0], rep[1]);
    /* r148 ships SRGBColorSpace but Texture.colorSpace does nothing until
       r152, so the encoding field is the one that actually works here.    */
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }

  /* Hull skin. The loft's v runs around the section, so v = 0.25 is the
     deck edge, v = 0.75 the waterline: the boot topping and the heaviest
     streaking go either side of 0.75. An auxiliary is painted a shade
     lighter than the escorts and is dirtier than any of them.             */
  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rngOf(51103), i, y;

    g.fillStyle = "#727a82"; g.fillRect(0, 0, W, H);
    /* plate patchwork: this hull has been welded up after every job */
    for (i = 0; i < 96; i++) {
      g.globalAlpha = 0.05 + R() * 0.08;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 36 + R() * 150, 9 + R() * 32);
    }
    g.globalAlpha = 1;
    /* frame and strake seams */
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.4;
    for (i = 1; i < 44; i++) {
      g.beginPath(); g.moveTo(i * W / 44, 0); g.lineTo(i * W / 44, H); g.stroke();
    }
    g.lineWidth = 1;
    for (i = 1; i < 12; i++) {
      g.beginPath(); g.moveTo(0, i * H / 12); g.lineTo(W, i * H / 12); g.stroke();
    }
    /* The underbody loft already supplies the boot topping, so this is only
       the grime that collects just above the waterline.                   */
    g.globalAlpha = 0.22; g.fillStyle = "#2a211a";
    g.fillRect(0, H * 0.700, W, H * 0.110);
    g.globalAlpha = 1;
    /* rust weeping down the topsides, heavier the closer to the water */
    for (i = 0; i < 190; i++) {
      var side = R() < 0.5 ? 0.62 : 0.86;
      y = (side + (R() - 0.5) * 0.16) * H;
      g.globalAlpha = 0.08 + R() * 0.18;
      g.fillStyle = R() < 0.7 ? "#4a3324" : "#20180f";
      g.fillRect(R() * W, y, 2 + R() * 5, 5 + R() * 28);
    }
    /* black scuffing where other ships come alongside: this one lies against
       damaged hulls for a living and the paint shows it                    */
    g.globalAlpha = 0.16; g.fillStyle = "#15181b";
    for (i = 0; i < 40; i++) g.fillRect(R() * W, (0.56 + R() * 0.10) * H, 30 + R() * 120, 6 + R() * 10);
    /* scuff and salt haze right along the waterline */
    g.globalAlpha = 0.10; g.fillStyle = "#d8dde1";
    for (i = 0; i < 70; i++) g.fillRect(R() * W, (0.70 + R() * 0.10) * H, 20 + R() * 90, 3);
    g.globalAlpha = 1;

    TEX.hull = finish(THREE, cv); return TEX.hull;
  }

  /* neutral greyscale, so the material colour supplies the scheme */
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rngOf(7717), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 48; i++) {
      g.globalAlpha = 0.06 + R() * 0.09;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 18 + R() * 76, 12 + R() * 56);
    }
    g.globalAlpha = 0.30; g.strokeStyle = "#000000"; g.lineWidth = 2;
    for (i = 1; i < 8; i++) {
      g.beginPath(); g.moveTo(0, i * H / 8); g.lineTo(W, i * H / 8); g.stroke();
      g.beginPath(); g.moveTo(i * W / 8, 0); g.lineTo(i * W / 8, H); g.stroke();
    }
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 1100; i++) g.fillRect(R() * W, R() * H, 2, 2);   /* non-skid */
    /* oil and wire drag marks: the working deck is never clean */
    g.globalAlpha = 0.20; g.fillStyle = "#000000";
    for (i = 0; i < 34; i++) g.fillRect(R() * W, R() * H, 8 + R() * 54, 6 + R() * 24);
    g.globalAlpha = 1;
    TEX.deck = finish(THREE, cv); return TEX.deck;
  }

  function plateTex(THREE) {
    if (TEX.plate) return TEX.plate;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rngOf(3391), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.22; g.strokeStyle = "#000000"; g.lineWidth = 1.6;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.10;
    for (i = 0; i < 30; i++) {
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 16 + R() * 56, 10 + R() * 36);
    }
    /* scuttles and watertight doors, small enough to belong in the texture */
    g.globalAlpha = 0.32; g.fillStyle = "#000000";
    for (i = 0; i < 22; i++) {
      g.beginPath(); g.arc(R() * W, R() * H, 2.4 + R() * 2, 0, 6.29); g.fill();
    }
    /* streaking below the deck edge */
    g.globalAlpha = 0.09; g.fillStyle = "#000000";
    for (i = 0; i < 40; i++) g.fillRect(R() * W, H * 0.55 + R() * H * 0.42, 2 + R() * 3, 6 + R() * 24);
    g.globalAlpha = 1;
    TEX.plate = finish(THREE, cv); return TEX.plate;
  }

  /* The hull number cannot be painted into the hull canvas: the loft's u
     climbs with x on BOTH sides, so whichever way round the glyphs are
     drawn one side reads backwards. It goes on a thin decal box per side
     instead, one canvas each way up -- the same dodge mine_ship_sweeper.js
     uses for its pennant.                                                 */
  function numberTex(THREE, spin) {
    var key = "num_" + (spin ? 1 : 0);
    if (TEX[key]) return TEX[key];
    var W = 256, H = 80, cv = cvs(W, H), g = cv.getContext("2d");
    g.clearRect(0, 0, W, H);
    g.save();
    if (spin) { g.translate(W, H); g.scale(-1, -1); }
    g.font = "bold 54px Arial";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.lineWidth = 8; g.strokeStyle = "rgba(12,14,16,0.85)";
    g.strokeText("ARS 7", W * 0.5, H * 0.54);
    g.fillStyle = "#dbe2e7";
    g.fillText("ARS 7", W * 0.5, H * 0.54);
    g.restore();
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX[key] = t; return t;
  }

  /* ============================================================ materials */
  function makeMats(THREE, team) {
    var M = {};
    /* SKIN */
    M.hull  = new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE),
                                               roughness: 0.88, metalness: 0.08 });
    M.deck  = new THREE.MeshStandardMaterial({ color: 0x494f54, map: deckTex(THREE),
                                               roughness: 0.93, metalness: 0.05 });
    M.sup   = new THREE.MeshStandardMaterial({ color: 0x7c848c, map: plateTex(THREE),
                                               roughness: 0.84, metalness: 0.08 });
    M.boot  = new THREE.MeshStandardMaterial({ color: 0x4a2c26, roughness: 0.90, metalness: 0.06 });
    M.team  = new THREE.MeshStandardMaterial({ color: new THREE.Color(team),
                                               roughness: 0.84, metalness: 0.08 });
    /* METAL */
    M.steel = new THREE.MeshStandardMaterial({ color: 0x9aa1a6, roughness: 0.52, metalness: 0.58 });
    M.rail  = new THREE.MeshStandardMaterial({ color: 0x8b9298, roughness: 0.48, metalness: 0.62 });
    M.dark  = new THREE.MeshStandardMaterial({ color: 0x363b40, roughness: 0.58, metalness: 0.42 });
    M.blk   = new THREE.MeshStandardMaterial({ color: 0x22262a, roughness: 0.70, metalness: 0.22 });
    M.door  = new THREE.MeshStandardMaterial({ color: 0x4d545a, roughness: 0.72, metalness: 0.16 });
    M.wire  = new THREE.MeshStandardMaterial({ color: 0x5d6469, roughness: 0.44, metalness: 0.70 });
    M.trim  = new THREE.MeshStandardMaterial({ color: 0xc2c8cd, roughness: 0.60, metalness: 0.38 });
    M.rub   = new THREE.MeshStandardMaterial({ color: 0x191c1f, roughness: 0.95, metalness: 0.03 });
    /* one hi-vis, for the gear that is meant to be found in a hurry */
    M.hi    = new THREE.MeshStandardMaterial({ color: 0xd06a1e, roughness: 0.74, metalness: 0.08 });
    M.white = new THREE.MeshStandardMaterial({ color: 0xc9d0d5, roughness: 0.80, metalness: 0.06 });
    /* GLASS */
    M.glass = new THREE.MeshPhysicalMaterial({ color: 0x17232b, roughness: 0.12,
                                               metalness: 0.04, transparent: true,
                                               opacity: 0.84 });
    /* the hull number decals, starboard canvas mirrored */
    M.numP  = new THREE.MeshStandardMaterial({ color: 0xffffff, map: numberTex(THREE, true),
                                               alphaTest: 0.5, roughness: 0.86, metalness: 0.06 });
    M.numS  = new THREE.MeshStandardMaterial({ color: 0xffffff, map: numberTex(THREE, false),
                                               alphaTest: 0.5, roughness: 0.86, metalness: 0.06 });

    /* Colour space. render3d.js prepModel() converts every material colour
       sRGB -> linear once, guarded by userData._srgbDone; cmp.html does not.
       Doing it here and setting the flag makes the same hex read the same in
       the comparison page and in the game.                                */
    for (var k in M) {
      if (!Object.prototype.hasOwnProperty.call(M, k)) continue;
      if (M[k].color && M[k].color.convertSRGBToLinear) M[k].color.convertSRGBToLinear();
      M[k].userData = M[k].userData || {};
      M[k].userData._srgbDone = true;
    }
    return M;
  }

  /* ============================================================== helpers */

  /* a four sided cylinder is a box whose top face scales independently,
     which is where every deckhouse gets its inward leaning sides from */
  function tboxGeo(THREE, lx, ly, lz, top) {
    var g = new THREE.CylinderGeometry(top === undefined ? 1 : top, 1, lz, 4, 1);
    g.rotateX(PI / 2); g.rotateZ(PI / 4);
    g.scale(lx * 0.70710678, ly * 0.70710678, 1);
    g = g.toNonIndexed(); g.computeVertexNormals();
    return g;
  }
  function tbox(THREE, mtl, lx, ly, lz, top, x, y, z) {
    var m = new THREE.Mesh(tboxGeo(THREE, lx, ly, lz, top), mtl);
    m.position.set(x, y, z); return m;
  }
  function box(THREE, mtl, lx, ly, lz, x, y, z) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), mtl);
    m.position.set(x, y, z); return m;
  }
  function cylZ(THREE, mtl, r0, r1, h, seg, x, y, z, open) {
    var m = new THREE.Mesh(
      new THREE.CylinderGeometry(r0, r1, h, seg || 8, 1, !!open).rotateX(PI / 2), mtl);
    m.position.set(x, y, z); return m;
  }
  function cylX(THREE, mtl, r0, r1, h, seg, x, y, z) {
    var m = new THREE.Mesh(
      new THREE.CylinderGeometry(r0, r1, h, seg || 8).rotateZ(-PI / 2), mtl);
    m.position.set(x, y, z); return m;
  }
  /* a cylinder stretched between two points: stays, boom, topping lift */
  function strut(THREE, mtl, a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return new THREE.Object3D();
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), mtl);
    m.position.set((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
                                    new THREE.Vector3(dx, dy, dz).normalize());
    return m;
  }

  /* M.loft winds inward; flip it so a FrontSide material shows the outside */
  function loftMesh(THREE, M, secs, segs, mtl) {
    var g = M.loft(THREE, secs, segs), idx = g.getIndex(), i, t;
    if (idx) {
      var a = idx.array;
      for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      idx.needsUpdate = true;
    }
    g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* where a lofted section's top surface really is at a given fraction of
     its own half beam, so the deck plate lies ON the hull                 */
  function topZ(st, ky) {
    var c = Math.pow(clamp(ky, 0, 1), 1 / st.sq);
    var s = Math.sqrt(Math.max(0, 1 - c * c));
    return st.zc + st.h * Math.pow(s, st.sq);
  }
  /* and the inverse: how far out the topsides are at a given height, which
     is what keeps the number decals and the rubbing strake ON the plating
     instead of floating a hand's breadth off it                          */
  function sideY(x, z) {
    var w = hwAt(x) + EX, dz = deckZ(x), e = sqTop(x);
    var h = (dz + UW) * 0.5, zc = (dz - UW) * 0.5;
    var a = Math.pow(clamp(Math.abs(z - zc) / h, 0, 1), 1 / e);
    return w * Math.pow(Math.max(0, 1 - a * a), e * 0.5);
  }

  /* the main deck: a cambered ribbon lying on the hull top, sheer, step
     and all                                                               */
  function deckRibbon(THREE, ST, mtl, edge, repU, repV) {
    var kys = [-edge, -edge * 0.70, -edge * 0.36, 0, edge * 0.36, edge * 0.70, edge];
    var pos = [], uv = [], idx = [], i, j;
    var x0 = ST[0].x, x1 = ST[ST.length - 1].x;
    for (i = 0; i < ST.length; i++) {
      var st = ST[i];
      for (j = 0; j < kys.length; j++) {
        var ky = kys[j];
        pos.push(st.x, st.w * ky, topZ(st, Math.abs(ky)) + 0.04);
        uv.push((st.x - x0) / (x1 - x0) * repU, (ky + 1) * 0.5 * repV);
      }
    }
    var R = kys.length;
    for (i = 0; i < ST.length - 1; i++) for (j = 0; j < R - 1; j++) {
      var a = i * R + j, b = a + 1, c = a + R, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* stanchion and wire railing, for the decks a man walks along */
  function railRun(THREE, G, mtl, pts, h) {
    var i, k, n = pts.length;
    for (i = 0; i < n; i++) {
      var s = cylZ(THREE, mtl, 0.045, 0.045, h, 3, pts[i][0], pts[i][1],
                   pts[i][2] + h * 0.5, true);
      G.add(s);
    }
    for (i = 0; i < n - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      var dx = b[0] - a[0], dy = b[1] - a[1];
      var L = Math.sqrt(dx * dx + dy * dy + (b[2] - a[2]) * (b[2] - a[2]));
      for (k = 1; k <= 2; k++) {
        var w = new THREE.Mesh(new THREE.BoxGeometry(L, 0.05, 0.05), mtl);
        w.position.set((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5,
                       (a[2] + b[2]) * 0.5 + h * (k === 1 ? 0.55 : 1.0));
        w.rotation.z = Math.atan2(dy, dx);
        G.add(w);
      }
    }
  }
  function edgePts(xs, inset, lift) {
    var out = [], i;
    for (i = 0; i < xs.length; i++)
      out.push([xs[i], hwAt(xs[i]) - inset, deckZ(xs[i]) + (lift || 0.06)]);
    return out;
  }

  /* The working deck is walled by plate, not wire: one box per station pair,
     yawed to the local deck edge, which follows the flare without needing a
     second loft.                                                           */
  function bulwarkRun(THREE, G, mtl, xs, s, inset, h) {
    var i;
    for (i = 0; i < xs.length - 1; i++) {
      var xa = xs[i], xb = xs[i + 1];
      var ya = s * (hwAt(xa) - inset), yb = s * (hwAt(xb) - inset);
      var za = deckZ(xa), zb = deckZ(xb);
      var dx = xb - xa, dy = yb - ya;
      var L = Math.sqrt(dx * dx + dy * dy);
      var b = box(THREE, mtl, L + 0.10, 0.22, h,
                  (xa + xb) * 0.5, (ya + yb) * 0.5, (za + zb) * 0.5 + h * 0.5);
      b.rotation.z = Math.atan2(dy, dx);
      G.add(b);
    }
  }

  /* ============================================================== fittings */

  /* a salvage winch: two barrels on one athwartships shaft, wire built up on
     the drums, hydraulic motor and a bed. The wire is what says salvage.  */
  function winch(THREE, M, x, z, br, bw) {
    var G = new THREE.Group();
    G.position.set(x, 0, z);
    G.add(box(THREE, M.deck, br * 2.4, 8.60, 0.28, 0, 0, 0.14));
    G.add(cylX(THREE, M.steel, 0.16, 0.16, 8.20, 6, 0, 0, br * 1.25));
    var i, s, k;
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      /* barrel cheeks, then the wire itself a shade under the cheek radius */
      G.add(cylX(THREE, M.dark, br, br, 0.22, 12, 0, s * (2.10 - bw * 0.5), br * 1.25));
      G.add(cylX(THREE, M.dark, br, br, 0.22, 12, 0, s * (2.10 + bw * 0.5), br * 1.25));
      G.add(cylX(THREE, M.wire, br * 0.82, br * 0.82, bw * 0.94, 12, 0, s * 2.10, br * 1.25));
      for (k = 0; k < 3; k++)
        G.add(cylX(THREE, M.wire, br * 0.84, br * 0.84, 0.06, 10, 0,
                   s * (2.10 - bw * 0.32 + k * bw * 0.32), br * 1.25));
      /* the motor and gearbox outboard of each barrel */
      G.add(box(THREE, M.sup, br * 1.10, 1.20, br * 1.10, 0, s * 3.55, br * 1.15));
    }
    G.add(box(THREE, M.sup, br * 0.9, 1.60, br * 1.5, 0, 0, br * 1.00));
    return G;
  }

  /* a 20 ft workshop container, which is the cheapest way to say that the
     repairing happens on the deck and not in a hangar                     */
  function container(THREE, M, mtl, x, y, z, rot) {
    var G = new THREE.Group();
    G.position.set(x, y, z); G.rotation.z = rot || 0;
    G.add(box(THREE, mtl, 6.10, 2.44, 2.60, 0, 0, 1.30));
    G.add(box(THREE, M.dark, 6.18, 2.50, 0.16, 0, 0, 0.08));
    G.add(box(THREE, M.dark, 6.18, 2.50, 0.16, 0, 0, 2.52));
    G.add(box(THREE, M.door, 0.08, 2.20, 2.20, 3.07, 0, 1.28));
    var i, s;
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(box(THREE, M.dark, 0.20, 0.24, 2.60, s * 2.95, 1.10, 1.30));
      G.add(box(THREE, M.dark, 0.20, 0.24, 2.60, s * 2.95, -1.10, 1.30));
    }
    return G;
  }

  /* ================================================================ build */
  function build(THREE, MOD, C) {
    var G = new THREE.Group();
    var team = (C && C.team !== undefined && C.team !== null) ? C.team : "#3f7fd0";
    var M = makeMats(THREE, team);
    var i, s, k, x, z;

    /* ------------------------------------------------------------- hull */
    var TOP = [], LOW = [];
    for (i = 0; i < STX.length; i++) {
      x = STX[i];
      var w = hwAt(x), dz = deckZ(x), kz = keelZ(x);
      TOP.push({ x: x, w: w + EX, h: (dz + UW) * 0.5, zc: (dz - UW) * 0.5, sq: sqTop(x) });
      LOW.push({ x: x, w: w,      h: (dz - kz) * 0.5, zc: (dz + kz) * 0.5, sq: sqLow(x) });
    }
    G.add(loftMesh(THREE, MOD, LOW, 12, M.boot));
    G.add(loftMesh(THREE, MOD, TOP, 16, M.hull));
    G.add(deckRibbon(THREE, TOP, M.deck, 0.985, LOA / 13, 2.4));

    /* transom: dark below the waterline, grey above it */
    var twh = hwAt(XA), tdz = deckZ(XA), tkz = keelZ(XA);
    G.add(box(THREE, M.boot, 0.34, twh * 2.00, -tkz + 0.12, XA - 0.07, 0, tkz * 0.5 + 0.06));
    G.add(box(THREE, M.hull, 0.34, twh * 2.02, tdz + 0.06, XA - 0.07, 0, tdz * 0.5));

    /* twin screws and rudders, just enough to close the run aft */
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(cylX(THREE, M.boot, 0.62, 0.44, 5.00, 8, -49.5, s * 3.05, -2.85));
      var hb = new THREE.Mesh(new THREE.ConeGeometry(0.44, 1.05, 8).rotateZ(PI / 2), M.blk);
      hb.position.set(-52.5, s * 3.05, -2.85); G.add(hb);
      G.add(box(THREE, M.boot, 2.00, 0.22, 2.40, -52.1, s * 3.05, -1.70));
    }
    /* a bulbous forefoot: a full-bodied auxiliary carries one and it closes
       the underbody loft off at the stem                                  */
    var bulb = new THREE.Mesh(new THREE.SphereGeometry(1.55, 10, 7), M.boot);
    bulb.scale.set(1.90, 0.78, 0.78); bulb.position.set(52.4, 0, -1.45); G.add(bulb);

    /* --------------------------------------------- working deck bulwark
       Solid plate from the transom quarters up to the break, with a raised
       capping rail: wire would be shredded by the first tow wire.        */
    var BWX = [-53.5, -49, -44, -38, -31, -24, -17, -10, -3, 4, 10, 13.6];
    var FCX = [38.4, 41.5, 44.5, 47.0, 49.2, 51.0, 52.6, 53.8];
    var BWH = 1.25;
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      bulwarkRun(THREE, G, M.hull, BWX, s, 0.24, BWH);
      bulwarkRun(THREE, G, M.steel, BWX, s, 0.24, 0.10);
      /* freeing ports: the deck ships water and has to lose it again */
      for (k = 0; k < 5; k++) {
        x = -46 + k * 11;
        G.add(box(THREE, M.blk, 2.20, 0.30, 0.42, x, s * (hwAt(x) - 0.24),
                  deckZ(x) + 0.24));
      }
    }
    /* transom bulwark, stopped either side of the stern roller notch */
    var trz = deckZ(-53.6);
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(box(THREE, M.hull, 0.30, twh - 3.30, BWH, -53.6,
                s * (3.30 + (twh - 3.30) * 0.5), trz + BWH * 0.5));
    }

    /* ------------------------------------------------------ stern roller
       The notch in the transom, a free-turning roller in it, and the towing
       staple over the top: this is where a crippled ship's wire comes home. */
    G.add(cylX(THREE, M.steel, 0.90, 0.90, 6.20, 14, -53.9, 0, trz + 0.55));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(box(THREE, M.dark, 1.40, 0.55, 1.70, -53.9, s * 3.35, trz + 0.60));
      /* quarter fairleads, the closed panama type                         */
      G.add(box(THREE, M.steel, 1.30, 1.10, 1.05, -50.6, s * (hwAt(-50.6) - 0.55),
                trz + 0.62));
      G.add(box(THREE, M.blk, 1.50, 0.60, 0.42, -50.6, s * (hwAt(-50.6) - 0.55),
                trz + 0.62));
    }
    /* the towing staple: a heavy arch on the centreline forward of the roller */
    var stap = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.22, 5, 12, PI).rotateX(PI / 2).rotateZ(PI / 2), M.steel);
    stap.position.set(-47.5, 0, deckZ(-47.5) + 0.05); G.add(stap);
    /* bitts down both sides of the working deck */
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      for (k = 0; k < 4; k++) {
        x = -44 + k * 13;
        G.add(box(THREE, M.dark, 1.50, 0.80, 0.30, x, s * (hwAt(x) - 1.30),
                  deckZ(x) + 0.15));
        G.add(cylZ(THREE, M.dark, 0.28, 0.28, 1.05, 8, x - 0.50,
                   s * (hwAt(x) - 1.30), deckZ(x) + 0.55));
        G.add(cylZ(THREE, M.dark, 0.28, 0.28, 1.05, 8, x + 0.50,
                   s * (hwAt(x) - 1.30), deckZ(x) + 0.55));
      }
    }

    /* ------------------------------------------------------- the A-frame
       The identity of the ship. Two heavy legs off the quarters, raked aft
       so the head and the block hang over the water clear of the transom,
       a cross head between them, and luffing rams down to the deck.       */
    var AFX = -49.2, AHX = -57.6, AHZ = 14.20;
    var afz = deckZ(AFX) + 0.10;
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(box(THREE, M.deck, 2.40, 2.40, 0.34, AFX, s * 6.20, afz - 0.17));
      /* the leg, and a second lighter member behind it making a lattice */
      G.add(strut(THREE, M.steel, [AFX, s * 6.20, afz], [AHX, s * 2.90, AHZ], 0.46, 6));
      G.add(strut(THREE, M.steel, [AFX - 1.40, s * 6.20, afz],
                  [AHX + 0.55, s * 2.90, AHZ - 0.55], 0.20, 5));
      for (k = 0; k < 3; k++) {
        var t0 = 0.18 + k * 0.26;
        G.add(strut(THREE, M.steel,
                    [AFX + (AHX - AFX) * t0, s * (6.20 + (2.90 - 6.20) * t0),
                     afz + (AHZ - afz) * t0],
                    [AFX - 1.40 + (AHX + 0.55 - AFX + 1.40) * (t0 + 0.16),
                     s * (6.20 + (2.90 - 6.20) * (t0 + 0.16)),
                     afz + (AHZ - 0.55 - afz) * (t0 + 0.16)], 0.13, 4));
      }
      /* hydraulic luffing ram from a deck trunnion up to mid leg */
      G.add(strut(THREE, M.dark, [AFX + 7.60, s * 6.70, afz + 0.60],
                  [AFX - 3.10, s * 5.10, afz + 5.40], 0.34, 6));
      G.add(strut(THREE, M.trim, [AFX - 3.10, s * 5.10, afz + 5.40],
                  [AFX - 4.60, s * 4.55, afz + 6.10], 0.20, 6));
      G.add(box(THREE, M.dark, 1.40, 1.40, 1.10, AFX + 7.60, s * 6.70, afz + 0.55));
    }
    /* cross head, hi-vis so the gantry reads against the sea, and the block */
    G.add(box(THREE, M.steel, 1.90, 6.60, 1.10, AHX, 0, AHZ));
    G.add(box(THREE, M.hi, 1.96, 1.30, 1.16, AHX, 2.20, AHZ));
    G.add(box(THREE, M.hi, 1.96, 1.30, 1.16, AHX, -2.20, AHZ));
    G.add(box(THREE, M.team, 2.00, 6.70, 0.34, AHX, 0, AHZ + 0.70));
    G.add(strut(THREE, M.wire, [AHX, 0, AHZ - 0.55], [AHX, 0, AHZ - 3.40], 0.10, 4));
    G.add(box(THREE, M.dark, 1.10, 0.70, 1.60, AHX, 0, AHZ - 4.20));
    G.add(cylX(THREE, M.steel, 0.62, 0.62, 0.50, 12, AHX, 0, AHZ - 4.30));
    /* the wire leads forward off the block to the salvage winch */
    G.add(strut(THREE, M.wire, [AHX, 0, AHZ - 4.85], [-18.0, 0, deckZ(-18.0) + 1.90], 0.075, 4));

    /* ------------------------------------------------------ deck machinery */
    G.add(winch(THREE, M, -18.0, deckZ(-18.0), 1.55, 2.30));   /* main salvage */
    G.add(winch(THREE, M, -27.5, deckZ(-27.5), 1.15, 1.70));   /* tow and moor */

    /* workshop containers and the gas bottle racks that go with them */
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(container(THREE, M, M.sup, -34.0, s * 4.70, deckZ(-34.0), 0));
      G.add(container(THREE, M, i ? M.hi : M.sup, -41.0, s * 4.70, deckZ(-41.0), 0));
      G.add(box(THREE, M.dark, 2.60, 1.30, 0.24, -8.5, s * 5.60, deckZ(-8.5) + 0.12));
      for (k = 0; k < 4; k++)
        G.add(cylZ(THREE, M.steel, 0.24, 0.24, 1.60, 8, -9.4 + k * 0.62,
                   s * 5.60, deckZ(-8.5) + 1.04));
    }
    /* one container stacked, so the deck cargo has a second storey */
    G.add(container(THREE, M, M.sup, -34.0, 4.70, deckZ(-34.0) + 2.60, 0));

    /* bunkering hose reels against the deckhouse after bulkhead: repair_sea
       carries oiler:true and tops other ships up as well as mending them  */
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(cylZ(THREE, M.dark, 1.30, 1.30, 0.20, 14, 11.0, s * 3.80, deckZ(11.0) + 0.30));
      G.add(cylZ(THREE, M.dark, 1.30, 1.30, 0.20, 14, 11.0, s * 3.80, deckZ(11.0) + 2.05));
      G.add(cylZ(THREE, M.blk, 1.12, 1.12, 1.60, 14, 11.0, s * 3.80, deckZ(11.0) + 1.18));
      G.add(box(THREE, M.sup, 0.50, 0.50, 2.40, 11.0, s * 5.30, deckZ(11.0) + 1.20));
    }

    /* ------------------------------------------------------- deck crane
       A knuckle boom on the port side abaft the deckhouse, offset so the
       centreline stays clear for the A-frame's wire.                     */
    var KX = 7.20, KY = 5.30, KZ = deckZ(KX);
    G.add(box(THREE, M.deck, 3.40, 3.40, 0.30, KX, KY, KZ + 0.15));
    G.add(cylZ(THREE, M.sup, 0.95, 1.05, 2.30, 10, KX, KY, KZ + 1.45));
    G.add(cylZ(THREE, M.hi, 0.85, 0.85, 1.30, 10, KX, KY, KZ + 3.20));
    G.add(box(THREE, M.sup, 2.40, 2.00, 1.60, KX + 1.10, KY, KZ + 3.60));
    var cbA = [KX - 0.60, KY, KZ + 4.20], cbB = [KX - 9.80, KY - 1.60, KZ + 7.60];
    var cbC = [KX - 16.80, KY - 2.80, KZ + 5.40];
    G.add(strut(THREE, M.hi, cbA, cbB, 0.42, 6));
    G.add(strut(THREE, M.hi, cbB, cbC, 0.30, 6));
    G.add(strut(THREE, M.dark, [KX + 1.20, KY, KZ + 3.90],
                [KX - 4.60, KY - 0.80, KZ + 5.90], 0.24, 5));
    G.add(strut(THREE, M.wire, cbC, [cbC[0], cbC[1], KZ + 1.20], 0.06, 4));
    G.add(box(THREE, M.dark, 0.60, 0.50, 0.80, cbC[0], cbC[1], KZ + 0.85));

    /* ------------------------------------------------- deckhouse, bridge
       Forward third, three tiers, each one shorter than the one below it. */
    var DHZ = 6.90, DHH = 3.40, DHT = DHZ + DHH;          /* 01 deck        */
    G.add(tbox(THREE, M.sup, 23.00, 13.00, DHH, 0.97, 26.50, 0, DHZ + DHH * 0.5));
    G.add(box(THREE, M.deck, 22.90, 13.15, 0.16, 26.50, 0, DHT + 0.08));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(box(THREE, M.door, 0.14, 1.00, 1.90, 15.10, s * 3.60, DHZ + 0.95));
      G.add(box(THREE, M.glass, 22.00, 0.24, 0.85, 26.50, s * 6.35, DHZ + 2.10));
    }
    G.add(box(THREE, M.glass, 0.24, 11.60, 0.85, 38.05, 0, DHZ + 2.10));

    var L2Z = DHT + 0.16, L2H = 3.10, L2T = L2Z + L2H;     /* 02 deck       */
    G.add(tbox(THREE, M.sup, 17.00, 11.20, L2H, 0.96, 27.50, 0, L2Z + L2H * 0.5));
    G.add(box(THREE, M.deck, 16.90, 11.35, 0.16, 27.50, 0, L2T + 0.08));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(box(THREE, M.glass, 15.20, 0.24, 0.80, 27.50, s * 5.45, L2Z + 1.85));
    }

    var BRZ = L2T + 0.16, BRH = 2.90, BRT = BRZ + BRH;     /* bridge deck   */
    G.add(tbox(THREE, M.sup, 8.60, 10.40, BRH, 0.95, 32.60, 0, BRZ + BRH * 0.5));
    G.add(box(THREE, M.deck, 8.50, 10.55, 0.14, 32.60, 0, BRT + 0.07));
    /* bridge wings, the widest thing above the working deck */
    G.add(box(THREE, M.deck, 2.00, 13.60, 0.18, 35.90, 0, BRT + 0.09));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(box(THREE, M.sup, 1.90, 0.18, 0.95, 35.90, s * 6.70, BRT + 0.56));
      G.add(box(THREE, M.team, 1.40, 0.10, 0.48, 35.90, s * 6.80, BRT + 0.58));
      var sw = new THREE.Mesh(new THREE.BoxGeometry(7.20, 0.26, 1.15), M.glass);
      sw.position.set(32.20, s * 4.98, BRZ + 1.85); G.add(sw);
      G.add(box(THREE, M.door, 0.10, 1.40, 1.00, 28.35, s * 2.10, BRZ + 1.70));
    }
    /* GLASS: the wheelhouse front, raked back over the forecastle */
    var fw = new THREE.Mesh(new THREE.BoxGeometry(0.30, 9.30, 1.35), M.glass);
    fw.position.set(36.75, 0, BRZ + 1.85); fw.rotation.y = -0.15; G.add(fw);

    /* ----------------------------------------------------------- funnel
       Right at the after end of the house, so the whole block still reads
       as one lump forward and the working deck stays clear.              */
    var FZ = DHT + 0.16, FH = 4.40;
    G.add(tbox(THREE, M.sup, 4.40, 4.60, FH, 0.82, 18.60, 0, FZ + FH * 0.5));
    G.add(box(THREE, M.dark, 4.00, 4.40, 0.24, 18.60, 0, FZ + FH + 0.12));
    G.add(box(THREE, M.team, 4.16, 4.52, 0.80, 18.60, 0, FZ + FH * 0.72));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(cylZ(THREE, M.dark, 0.34, 0.34, 1.00, 6, 18.00, s * 1.10, FZ + FH + 0.62));
      /* engine room vents, both sides of the casing */
      G.add(cylZ(THREE, M.sup, 0.55, 0.55, 1.30, 8, 22.20, s * 4.30, DHT + 0.82));
      G.add(cylZ(THREE, M.dark, 0.62, 0.42, 0.46, 8, 22.20, s * 4.30, DHT + 1.66));
    }

    /* ------------------------------------------------------------- mast
       A plain pole and tripod on the bridge roof carrying one small nav
       radar. Nothing here rotates: render3d.js has no hook for it.       */
    var MZ = BRT + 0.14, MX = 30.20, MH = 8.40;
    G.add(cylZ(THREE, M.steel, 0.16, 0.26, MH, 6, MX, 0, MZ + MH * 0.5));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(strut(THREE, M.steel, [MX - 2.10, s * 2.30, MZ], [MX, 0, MZ + 4.30], 0.10, 4));
      G.add(cylZ(THREE, M.steel, 0.04, 0.05, 2.40, 4, MX, s * 3.35, MZ + 6.20, true));
    }
    G.add(box(THREE, M.deck, 2.00, 3.20, 0.14, MX, 0, MZ + 3.30));
    G.add(strut(THREE, M.steel, [MX, -3.50, MZ + 5.00], [MX, 3.50, MZ + 5.00], 0.09, 4));
    /* the nav set: a pedestal and a slotted waveguide scanner on top */
    G.add(cylZ(THREE, M.dark, 0.30, 0.34, 0.50, 8, MX, 0, MZ + MH - 0.90));
    G.add(box(THREE, M.trim, 0.28, 3.60, 0.32, MX, 0, MZ + MH - 0.48));
    G.add(box(THREE, M.trim, 0.65, 0.70, 0.62, MX, 0, MZ + MH + 0.20));
    G.add(cylZ(THREE, M.white, 0.42, 0.42, 0.70, 8, MX - 1.20, 0, MZ + 2.10));

    /* ------------------------------------------- life rafts, rescue boat */
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      for (k = 0; k < 2; k++) {
        x = 16.60 + k * 3.20;
        G.add(box(THREE, M.dark, 1.20, 2.60, 0.16, x, s * 4.90, DHT + 0.32));
        var rf = cylX(THREE, M.white, 0.62, 0.62, 2.20, 10, x, s * 4.90, DHT + 0.86);
        rf.rotation.z = PI / 2; G.add(rf);
        G.add(box(THREE, M.hi, 0.30, 0.30, 0.30, x, s * 4.90, DHT + 1.52));
      }
    }
    /* the rescue boat hangs in davits over the port side, outboard of the
       01 deck rail where a swung-out boat actually sits                   */
    var BX = 24.00, BY = 7.30, BZ = DHT + 0.40;
    G.add(tbox(THREE, M.hi, 6.60, 2.10, 1.10, 0.72, BX, BY, BZ + 0.55));
    G.add(box(THREE, M.dark, 5.60, 1.70, 0.22, BX, BY, BZ + 1.16));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(strut(THREE, M.steel, [BX + s * 2.40, 4.30, BZ - 0.30],
                  [BX + s * 2.40, BY + 0.30, BZ + 2.60], 0.14, 5));
      G.add(strut(THREE, M.wire, [BX + s * 2.40, BY + 0.30, BZ + 2.60],
                  [BX + s * 2.20, BY, BZ + 1.20], 0.05, 4));
    }

    /* -------------------------------------------------- forecastle gear */
    G.add(box(THREE, M.sup, 3.00, 4.40, 1.25, 45.50, 0, deckZ(45.5) + 0.63));
    G.add(cylX(THREE, M.dark, 0.80, 0.80, 4.80, 8, 45.50, 0, deckZ(45.5) + 1.25));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(cylZ(THREE, M.sup, 0.48, 0.56, 0.85, 8, 42.20, s * 2.20, deckZ(42.2) + 0.43));
      G.add(box(THREE, M.dark, 2.20, 1.20, 0.30, 49.20, s * 1.30, deckZ(49.2) + 0.15));
      /* anchor stowed in the hawse, low on the bow plating */
      G.add(box(THREE, M.dark, 2.10, 0.30, 1.55, 48.40,
                s * (sideY(48.40, deckZ(48.4) - 2.10) + 0.06), deckZ(48.4) - 2.10));
      /* forecastle bulwark: a straight box cannot follow this much flare,
         so it takes the same run of yawed plates as the working deck */
      bulwarkRun(THREE, G, M.hull, FCX, s, 0.22, 1.15);
      bulwarkRun(THREE, G, M.steel, FCX, s, 0.22, 0.10);
      /* breakwater across the forecastle in the usual shallow V */
      var bw = box(THREE, M.hull, 0.34, 5.60, 1.15, 40.60, s * 3.00, deckZ(40.6) + 0.58);
      bw.rotation.z = s * 0.26; G.add(bw);
    }
    /* the break itself: a plate face across the ship under the deckhouse */
    G.add(box(THREE, M.hull, 0.36, hwAt(14.0) * 1.96, FCR + 0.30, 14.10, 0,
              deckZ(14.0) + (FCR + 0.30) * 0.5));

    /* ------------------------------------------- rubbing strake, fenders
       She lies alongside damaged ships for a living, so she is fitted to be
       leaned on: a heavy strake the length of the topsides and three
       pneumatic fenders a side hung over it.                             */
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      for (k = 0; k < 9; k++) {
        var rx0 = -50 + k * 10.5, rx1 = rx0 + 10.5;
        var rz = deckZ((rx0 + rx1) * 0.5) - 1.15;
        var ry0 = s * (sideY(rx0, deckZ(rx0) - 1.15) + 0.10);
        var ry1 = s * (sideY(rx1, deckZ(rx1) - 1.15) + 0.10);
        var rl = Math.sqrt((rx1 - rx0) * (rx1 - rx0) + (ry1 - ry0) * (ry1 - ry0));
        var rb = box(THREE, M.rub, rl, 0.34, 0.46, (rx0 + rx1) * 0.5,
                     (ry0 + ry1) * 0.5, rz);
        rb.rotation.z = Math.atan2(ry1 - ry0, rx1 - rx0); G.add(rb);
      }
      for (k = 0; k < 3; k++) {
        x = -30 + k * 14;
        z = deckZ(x) - 1.90;
        G.add(cylX(THREE, M.rub, 0.95, 0.95, 2.30, 10, x,
                   s * (sideY(x, z) + 0.80), z));
      }
    }

    /* hull number, one decal a side, the starboard canvas mirrored */
    var PNX = 38.50, PNZ = 4.60;
    var pnSlope = (sideY(PNX + 2.0, PNZ) - sideY(PNX - 2.0, PNZ)) / 4.0;
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      var pn = box(THREE, i ? M.numP : M.numS, 5.20, 0.06, 1.55,
                   PNX, s * (sideY(PNX, PNZ) + 0.06), PNZ);
      pn.rotation.z = Math.atan(s * pnSlope); G.add(pn);
    }

    /* ensign staff over the transom, jackstaff at the stem */
    G.add(cylZ(THREE, M.steel, 0.06, 0.09, 3.20, 5, -53.4, 0, deckZ(-53.4) + 2.80));
    G.add(cylZ(THREE, M.steel, 0.06, 0.09, 2.60, 5, 53.4, 0, deckZ(53.4) + 1.30));

    /* ---------------------------------------------------------- railings
       Wire only where there is no plate: the side decks abreast the
       deckhouse and the 01 deck. Both working decks have bulwarks.       */
    var sideX = [14.6, 18.0, 22.0, 26.0, 30.0, 34.0, 37.8];
    var ps = edgePts(sideX, 0.34, 0.06);
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      var b = [], j;
      for (j = 0; j < ps.length; j++) b.push([ps[j][0], s * ps[j][1], ps[j][2]]);
      railRun(THREE, G, M.rail, b, 1.05);
      /* the 01 deck perimeter, aft face and both sides */
      railRun(THREE, G, M.rail, [
        [15.20, s * 6.40, DHT + 0.16], [22.00, s * 6.40, DHT + 0.16],
        [27.00, s * 6.40, DHT + 0.16], [33.00, s * 6.40, DHT + 0.16],
        [37.80, s * 6.20, DHT + 0.16]], 1.00);
      railRun(THREE, G, M.rail, [
        [15.20, s * 6.40, DHT + 0.16], [15.20, s * 2.20, DHT + 0.16]], 1.00);
    }

    G.userData.len = LOA;
    return G;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["repair_sea"] = {
  len: 110,
  build: function (THREE, M, C) { return RepairShip3D.build(THREE, M, C); }
};
