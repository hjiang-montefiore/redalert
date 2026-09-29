/* ====== hero/lcac_landing_craft.js - LCAC air-cushion landing craft (def "lst") ======
   HERO reference model. Replaces the units3d_salvage.js builder for the one
   def that every faction fields as its transport_sea in every era, and so
   the unit with the biggest share of the screen in a naval game.

   Model space follows models3d.js: +X bow, +Y port, +Z up, real metres,
   WATERLINE AT z = 0. render3d.js stands the template up with rotation.x =
   -PI/2 and rescales it by its measured X extent, so only proportions reach
   the screen - which is why nothing on this model is allowed to poke out
   past the skirt fore or aft. The old model's bow ramp, cocked up at 60 deg,
   and its whip aerials set its length at 30.3 m and squashed everything else
   to fit; this one is 26.8 m end to end, which is the craft on cushion.

   PUBLISHED FIGURES. The production LCAC (LCAC 1-91, Textron Marine and
   Avondale, in service 1986), from the GlobalSecurity LCAC specification
   sheet and the US Navy fact file:
     length   structure 81 ft (24.69 m), on cushion 87 ft 11 in (26.80 m)
     beam     structure 43 ft 8 in (13.31 m), on cushion 47 ft 0 in (14.33 m)
     height   on cushion 23 ft 6 in (7.16 m)
     cargo    1,809 sq ft on a deck 27 ft 0 in (8.23 m) wide, so 67 ft long
     ramps    bow 28 ft 4 in (8.64 m) wide, stern 14 ft 10 in (4.52 m) wide
     two shrouded four-blade reversible-pitch propellers, 11.75 ft (3.58 m)
     four 63 in (1.60 m) double-entry centrifugal lift fans
     four TF40B gas turbines, two propelling and two lifting

   WHAT FOLLOWS FROM THEM, in this file's coordinates (midships x = 0):
     hard structure x +/-12.345, y +/-6.655
     skirt bag bulge 0.51 m abeam and 1.05 m at bow and stern, which is
       exactly the on-cushion figures less the structure figures
     the deck is 8.23 m between the side structures, so each side
       structure is 2.54 m wide, y 4.115 .. 6.655
     shroud bore 1.84 m round the 1.79 m propeller tips, outer radius 2.08.
       Its outer rim is flush with the side structure's outboard wall, so
       the axis is at y +/-4.575. Two 4.16 m shrouds and the 4.52 m stern
       ramp between them make 12.84 m, inside the 13.31 m beam: the ramp
       clears each shroud by 0.23 m.
     the highest point is the mast truck at 7.15 m; the shroud tops 7.08 m

   INFERRED, NOT MEASURED. No photograph was measured for this file. Check
   these against photographs of LCAC 1-91 and the SSC:
     buoyancy box bottom 1.50 m on cushion (the quoted 5 ft cushion),
       cargo deck 2.45 m, side structure top 4.85 m
     the order along each side-structure top: bow thruster, cab, hatch,
       team panel, two lift-fan intakes (mouths 2.0 m across over the 1.6 m
       fans), two turbine exhausts, the gearbox
     cab sizes (starboard 3.2 x 2.3 m, roof 6.45 m; port smaller and
       lower), the mast and radar, the 2.4 m shroud chord, the rudders, and
       the pylon, gearbox nacelle and outboard brace that carry each shroud
     the deck plate runs hinge to hinge, x -11.6 .. 10.35 (21.95 m). That
       is 1.5 m more than the 67 ft the cargo rating implies; where the
       rated area stops is not known here.
     the bow ramp is drawn 8.1 m wide, not 8.64 m, so that it fits between
       the side structures. The real one must overlap their forward ends
       in a way this file does not know. It is 2.95 m long and stowed at
       12 deg. The stern ramp is 2.05 m long and stowed at 35 deg.

   The propellers are NOT called "rotor". When render3d spun the first
   "rotor" it found about the world vertical, applied in the parent's frame,
   the old model's port propeller tumbled end over end through its duct and
   the starboard one never moved at all. It now turns every "rotor" about
   whichever of the part's own axes lies nearest the craft's up, and every
   "tailrotor" about the one across it: a helicopter's shafts. A propeller
   shaft runs fore and aft, so either name would still turn it about the
   wrong line, and render3d has no name for a fore-and-aft shaft; nothing
   here carries an animated name. The blades are stopped
   at 45 deg so they read as blades and not as a disc.

   Draw calls. About four of these are alive at once, and every mesh costs a
   draw plus a shadow draw per copy, so every part is baked into one
   geometry per material: nine meshes for the whole craft where the old one
   had 182. Nothing in the geometry depends on the team, so it is baked
   once per page and every team colour shares it; build() makes only the
   materials. render3d scales the template's Object3D, never its geometry.

   The old builder in units3d_salvage.js stays. _play.html, _replay.html,
   _models.html, _comp.html, mysheet.html and unitsheet.html load that file
   but not this one, and it is still their LCAC.                         */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  var PI = Math.PI;

  /* ------------------------------------------------------------ dimensions */
  var HX0 = -12.345, HX1 = 12.345;  /* hard structure: 81 ft                */
  var HY = 6.655;                   /* half of the 43 ft 8 in structure     */
  var ZB = 1.50, ZD = 2.45;         /* buoyancy box bottom, cargo deck      */
  var RB = 2.2, RS = 1.6;           /* planform corner radii, bow and stern */
  var SY0 = 4.115, SY1 = HY;        /* side structure faces: 27 ft deck     */
  var SYC = (SY0 + SY1) / 2;        /* side structure centreline            */
  var SX0 = -9.9;                   /* side structures end ahead of shrouds */
  var ZS = 4.85;                    /* side structure top                   */
  var DKX0 = -11.6, DKX1 = 10.35;   /* cargo deck, stern ramp to bow ramp  */
  var BRW = 8.1, SRW = 4.52;        /* bow ramp (drawn), stern ramp widths  */
  var DRI = 1.84, DRO = 2.08;       /* shroud bore and outer radius         */
  /* shroud axis: the outer rim flush with the side structure's outboard
     wall. 6.655 - 2.08 = 4.575, which puts the inner rim at 2.495, just
     outboard of the 2.26 m half-width of the stern ramp between them.    */
  var DUX = -11.3, DUY = HY - DRO, DUZ = 5.0;

  /* --------------------------------------------------------------- paint
     The house haze grey from the PAINT table in js/warship3d.js (hull
     0x737b83, deck 0x484e54): an LCAC is painted like the rest of the
     amphibious fleet it sails with. The skirt is black neoprene-coated
     nylon and weathers to charcoal with salt bloom along the bottom.     */
  var C_SKIN = "#737b83";
  var C_WALK = "#43484d";
  var C_DECK = "#484e54";
  var C_SKRT = "#1b1d1f";

  var TEX = {};                     /* canvases are painted once per page   */

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function finish(THREE, cv, clampEdge) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = clampEdge ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }
  function blotch(g, R, W, H, n, a0, a1, w0, w1, h0, h1) {
    for (var i = 0; i < n; i++) {
      g.globalAlpha = a0 + R() * a1;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, w0 + R() * w1, h0 + R() * h1);
    }
    g.globalAlpha = 1;
  }

  /* =============================================================== texture
     SKIN: welded aluminium plate on the side structures, cabs and shrouds.
     World-projected, one tile per 6 m, so a seam is the same size on a cab
     wall as on a side structure.                                          */
  function skinTex(THREE) {
    if (TEX.skin) return TEX.skin;
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(4471), i, x, y;
    g.fillStyle = C_SKIN; g.fillRect(0, 0, W, H);
    blotch(g, R, W, H, 70, 0.03, 0.05, 30, 150, 20, 90);
    /* plate butts every 1.5 m, strakes every 1.2 m: aluminium comes in
       smaller sheets than steel and the seams show */
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.6;
    for (i = 1; i < 4; i++) { x = i * W / 4; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    for (i = 1; i < 5; i++) { y = i * H / 5; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    g.strokeStyle = "rgba(235,240,244,0.10)"; g.lineWidth = 1;
    for (i = 1; i < 5; i++) { y = i * H / 5 - 2; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    /* bolted access panels over the machinery spaces */
    for (i = 0; i < 6; i++) {
      x = 20 + R() * (W - 120); y = 20 + R() * (H - 110);
      g.strokeStyle = "rgba(0,0,0,0.36)"; g.lineWidth = 2;
      g.strokeRect(x, y, 60 + R() * 40, 44 + R() * 30);
      g.fillStyle = "rgba(255,255,255,0.04)"; g.fillRect(x, y, 60, 44);
    }
    /* dried salt running down from every edge - the craft lives in spray */
    for (i = 0; i < 90; i++) {
      x = R() * W; y = R() * H; var l = 18 + R() * 70;
      var gr = g.createLinearGradient(0, y, 0, y + l);
      gr.addColorStop(0, "rgba(226,230,228,0.16)");
      gr.addColorStop(1, "rgba(226,230,228,0.0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.4 + R() * 3, l);
    }
    for (i = 0; i < 40; i++) {
      x = R() * W; y = R() * H; var l2 = 14 + R() * 46;
      var gk = g.createLinearGradient(0, y, 0, y + l2);
      gk.addColorStop(0, "rgba(20,22,24,0.18)");
      gk.addColorStop(1, "rgba(20,22,24,0.0)");
      g.fillStyle = gk; g.fillRect(x, y, 1.2 + R() * 2.4, l2);
    }
    TEX.skin = finish(THREE, cv, false);
    return TEX.skin;
  }

  /* WALK: the grey-black non-skid on the side structure tops, cab roofs,
     ramps and aprons. One tile per 3 m.                                  */
  function walkTex(THREE) {
    if (TEX.walk) return TEX.walk;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(9127), i;
    g.fillStyle = C_WALK; g.fillRect(0, 0, W, H);
    blotch(g, R, W, H, 30, 0.04, 0.05, 20, 90, 20, 90);
    g.globalAlpha = 0.34; g.fillStyle = "#000000";
    for (i = 0; i < 1500; i++) g.fillRect(R() * W, R() * H, 1.6, 1.6);
    g.globalAlpha = 0.14; g.fillStyle = "#c9d0d4";
    for (i = 0; i < 500; i++) g.fillRect(R() * W, R() * H, 1.2, 1.2);
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.4;
    g.beginPath(); g.moveTo(W / 2, 0); g.lineTo(W / 2, H); g.stroke();
    g.beginPath(); g.moveTo(0, H / 2); g.lineTo(W, H / 2); g.stroke();
    TEX.walk = finish(THREE, cv, false);
    return TEX.walk;
  }

  /* DECK: the cargo deck, mapped once over x -11.6 .. 10.35, y +/-4.1.
     Non-skid, flush tie-down fittings on a grid, the painted lane limits and
     the scuffing from tracks and tyres that is the first thing a photograph
     of a working LCAC shows.                                              */
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 1024, H = 384, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(2203), i, k;
    var LX = DKX1 - DKX0, LY = 2 * SY0;
    function PX(x) { return (x - DKX0) / LX * W; }
    function PY(y) { return (SY0 - y) / LY * H; }
    g.fillStyle = C_DECK; g.fillRect(0, 0, W, H);
    blotch(g, R, W, H, 90, 0.04, 0.05, 30, 150, 16, 70);
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 3200; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    /* deck plate seams, 1.8 m by 1.37 m panels */
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.4;
    for (i = 1; i < 12; i++) { g.beginPath(); g.moveTo(i * W / 12, 0); g.lineTo(i * W / 12, H); g.stroke(); }
    for (i = 1; i < 6; i++) { g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke(); }
    /* flush tie-down fittings */
    for (i = 0; i < 17; i++) for (k = 0; k < 6; k++) {
      var tx = PX(-10.4 + i * 1.28), ty = PY(-3.3 + k * 1.32);
      g.fillStyle = "rgba(16,18,20,0.70)";
      g.beginPath(); g.arc(tx, ty, 3.6, 0, 6.2832); g.fill();
      g.strokeStyle = "rgba(170,176,180,0.30)"; g.lineWidth = 1;
      g.beginPath(); g.arc(tx, ty, 5.2, 0, 6.2832); g.stroke();
    }
    /* track and tyre scuffing down the lanes, heaviest near the ramps */
    for (i = 0; i < 14; i++) {
      var sy = -3.2 + R() * 6.4, x0 = DKX0 + R() * 5, x1 = DKX1 - R() * 7;
      g.strokeStyle = "rgba(0,0,0," + (0.16 + R() * 0.16).toFixed(2) + ")";
      g.lineWidth = 6 + R() * 8;
      g.beginPath(); g.moveTo(PX(x0), PY(sy)); g.lineTo(PX(x1), PY(sy + (R() - 0.5) * 0.6)); g.stroke();
    }
    /* sand carried aboard off the beach */
    for (i = 0; i < 26; i++) {
      var bxp = R() < 0.5 ? PX(DKX1 - R() * 3.5) : PX(DKX0 + R() * 3.0);
      var byp = R() * H;
      var sg = g.createRadialGradient(bxp, byp, 2, bxp, byp, 26 + R() * 30);
      sg.addColorStop(0, "rgba(150,132,98,0.20)");
      sg.addColorStop(1, "rgba(150,132,98,0.0)");
      g.fillStyle = sg; g.fillRect(bxp - 60, byp - 60, 120, 120);
    }
    /* lane limit lines inboard of the side structure walls */
    g.strokeStyle = "rgba(206,182,58,0.80)"; g.lineWidth = 4;
    var ly = SY0 - 0.36;
    g.beginPath(); g.moveTo(PX(DKX0 + 0.4), PY(ly)); g.lineTo(PX(DKX1 - 0.3), PY(ly)); g.stroke();
    g.beginPath(); g.moveTo(PX(DKX0 + 0.4), PY(-ly)); g.lineTo(PX(DKX1 - 0.3), PY(-ly)); g.stroke();
    TEX.deck = finish(THREE, cv, true);
    return TEX.deck;
  }

  /* SKIRT: black rubber. u runs round the craft (one tile per 3 m), v is
     height (0 at the waterline, 1 at 2.6 m).                              */
  function skirtTex(THREE) {
    if (TEX.skirt) return TEX.skirt;
    var W = 512, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(6607), i, x;
    g.fillStyle = C_SKRT; g.fillRect(0, 0, W, H);
    blotch(g, R, W, H, 50, 0.03, 0.05, 20, 90, 14, 60);
    /* segment seams in the bag */
    g.strokeStyle = "rgba(0,0,0,0.50)"; g.lineWidth = 2;
    for (i = 0; i < 6; i++) { x = i * W / 6; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    g.strokeStyle = "rgba(255,255,255,0.05)"; g.lineWidth = 2;
    for (i = 0; i < 6; i++) { x = i * W / 6 + 4; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    /* salt bloom along the bottom, where the fingers drag through spray.
       Canvas y runs down and v runs up, so the bottom of the canvas is the
       waterline. */
    var sb = g.createLinearGradient(0, H * 0.55, 0, H);
    sb.addColorStop(0, "rgba(190,196,198,0.0)");
    sb.addColorStop(1, "rgba(190,196,198,0.24)");
    g.fillStyle = sb; g.fillRect(0, H * 0.55, W, H * 0.45);
    for (i = 0; i < 40; i++) {
      g.fillStyle = "rgba(205,210,212," + (0.05 + R() * 0.08).toFixed(2) + ")";
      g.fillRect(R() * W, H * 0.6 + R() * H * 0.4, 6 + R() * 30, 2 + R() * 6);
    }
    TEX.skirt = finish(THREE, cv, false);
    return TEX.skirt;
  }

  /* hull number, light grey on the grey with a dark keyline, as the craft
     carry it on the outboard face of each side structure */
  function numTex(THREE) {
    if (TEX.num) return TEX.num;
    var W = 256, H = 128, cv = cvs(W, H), g = cv.getContext("2d");
    g.clearRect(0, 0, W, H);
    g.font = "bold 100px Arial"; g.textAlign = "center"; g.textBaseline = "middle";
    g.lineWidth = 8; g.strokeStyle = "rgba(24,27,30,0.85)";
    g.strokeText("62", W / 2, H * 0.54);
    g.fillStyle = "#e3e7ea";
    g.fillText("62", W / 2, H * 0.54);
    TEX.num = finish(THREE, cv, true);
    return TEX.num;
  }

  /* ============================================================= materials
     Three tiers, as the other hero files: SKIN (painted canvases, rough,
     almost no metalness), METAL (bare fittings, untextured) and GLASS.
     Nine materials in all. Colours are authored as final sRGB hexes and
     converted here, flagged so render3d's prepModel leaves them alone; the
     team colour is left for prepModel so eraPaint still recognises it.   */
  function mats(THREE, team) {
    var M = {};
    M.skin  = new THREE.MeshStandardMaterial({ color: 0xffffff, map: skinTex(THREE),  roughness: 0.84, metalness: 0.08 });
    M.walk  = new THREE.MeshStandardMaterial({ color: 0xffffff, map: walkTex(THREE),  roughness: 0.94, metalness: 0.04 });
    M.deck  = new THREE.MeshStandardMaterial({ color: 0xffffff, map: deckTex(THREE),  roughness: 0.93, metalness: 0.05 });
    M.skirt = new THREE.MeshStandardMaterial({ color: 0xffffff, map: skirtTex(THREE), roughness: 0.90, metalness: 0.02,
                                               side: THREE.DoubleSide });
    M.metal = new THREE.MeshStandardMaterial({ color: 0x8b9298, roughness: 0.52, metalness: 0.50 });
    M.dark  = new THREE.MeshStandardMaterial({ color: 0x2c3034, roughness: 0.62, metalness: 0.40 });
    M.glass = new THREE.MeshPhysicalMaterial({ color: 0x22313b, roughness: 0.10, metalness: 0.0,
                                               transparent: true, opacity: 0.86, clearcoat: 0.6 });
    M.num   = new THREE.MeshStandardMaterial({ color: 0xffffff, map: numTex(THREE), roughness: 0.85, metalness: 0.05,
                                               transparent: true, alphaTest: 0.4 });
    for (var k in M) {
      if (!M.hasOwnProperty(k)) continue;
      M[k].color.convertSRGBToLinear();
      M[k].userData = M[k].userData || {};
      M[k].userData._srgbDone = true;
    }
    M.team  = new THREE.MeshStandardMaterial({ color: new THREE.Color(team || "#3f7fd0"), roughness: 0.60, metalness: 0.10 });
    return M;
  }

  /* ================================================================= bins
     A bin gathers triangles for one material and becomes one mesh. Parts
     are dropped in with their placement matrix; a mirrored matrix has its
     winding put back. A bin with a uv scale re-projects every triangle onto
     the world plane its face normal is closest to, so a seam on the paint
     is the same size wherever it lands. A part added with an "up" bin sends
     its upward faces there instead: a roof or a walkway takes the non-skid
     while its walls keep the paint. "inv" turns a part inside out, for the
     bore of an open intake, which is only ever seen from inside.         */
  function Bin(uvScale) { this.p = []; this.n = []; this.u = []; this.s = uvScale || 0; }
  Bin.prototype.add = function (geo, mtx, up, inv) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (mtx) g.applyMatrix4(mtx);
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
    var flip = (!!mtx && mtx.determinant() < 0) !== !!inv;
    for (var i = 0; i + 2 < P.count; i += 3) {
      var a = i, b = flip ? i + 2 : i + 1, c = flip ? i + 1 : i + 2;
      var ax = P.getX(a), ay = P.getY(a), az = P.getZ(a);
      var ux = P.getX(b) - ax, uy = P.getY(b) - ay, uz = P.getZ(b) - az;
      var vx = P.getX(c) - ax, vy = P.getY(c) - ay, vz = P.getZ(c) - az;
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (nl < 1e-9) continue;                 /* cone tips and the like */
      nx /= nl; ny /= nl; nz /= nl;
      var dst = (up && nz > 0.8) ? up : this;
      dst.tri(P, N, U, a, b, c, nx, ny, nz, inv ? -1 : 1);
    }
    return this;
  };
  Bin.prototype.tri = function (P, N, U, a, b, c, fx, fy, fz, ns) {
    var s = this.s, ax = Math.abs(fx), ay = Math.abs(fy), az = Math.abs(fz), ids = [a, b, c];
    for (var k = 0; k < 3; k++) {
      var j = ids[k], x = P.getX(j), y = P.getY(j), z = P.getZ(j);
      this.p.push(x, y, z);
      this.n.push(ns * N.getX(j), ns * N.getY(j), ns * N.getZ(j));
      if (s) {
        if (az >= ax && az >= ay) this.u.push(x / s, y / s);
        else if (ay >= ax) this.u.push(x / s, z / s);
        else this.u.push(y / s, z / s);
      } else if (U) this.u.push(U.getX(j), U.getY(j));
      else this.u.push(0, 0);
    }
  };
  Bin.prototype.geometry = function (THREE) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    g.computeBoundingSphere();
    return g;
  };

  /* placement matrix: translate, Euler XYZ, scale */
  function T(THREE, x, y, z, rx, ry, rz) {
    var m = new THREE.Matrix4();
    m.compose(new THREE.Vector3(x || 0, y || 0, z || 0),
              new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)),
              new THREE.Vector3(1, 1, 1));
    return m;
  }
  function box(THREE, lx, ly, lz) { return new THREE.BoxGeometry(lx, ly, lz); }
  /* cylinders along z (up) and along x (fore and aft), y for across */
  function cylZ(THREE, r1, r2, h, seg, open) {
    var g = new THREE.CylinderGeometry(r1, r2, h, seg || 12, 1, !!open); g.rotateX(PI / 2); return g;
  }
  function cylX(THREE, r1, r2, h, seg, open) {
    var g = new THREE.CylinderGeometry(r1, r2, h, seg || 12, 1, !!open); g.rotateZ(-PI / 2); return g;
  }
  function cylY(THREE, r1, r2, h, seg) {
    return new THREE.CylinderGeometry(r1, r2, h, seg || 12, 1);
  }
  /* a straight bar between two points */
  function bar(THREE, bin, a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new THREE.CylinderGeometry(r, r, L, seg || 5, 1, true);
    var q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0),
              new THREE.Vector3(dx / L, dy / L, dz / L));
    var m = new THREE.Matrix4().compose(new THREE.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2),
              q, new THREE.Vector3(1, 1, 1));
    bin.add(g, m);
  }
  /* extrude a plan outline (x, y pairs) from z0 to z1 */
  function prism(THREE, pts, z0, z1, bevel) {
    var s = new THREE.Shape();
    s.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
    s.closePath();
    var bv = bevel || 0;
    var g = new THREE.ExtrudeGeometry(s, { depth: (z1 - z0) - 2 * bv, bevelEnabled: bv > 0,
      bevelThickness: bv, bevelSize: bv, bevelSegments: 1, curveSegments: 4 });
    g.translate(0, 0, z0 + bv);
    return g;
  }
  /* an explicit quad with its own uvs, wound so its face looks along n */
  function quad(THREE, a, b, c, d, uv) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute([].concat(a, b, c, a, c, d), 3));
    uv = uv || [0, 0, 1, 0, 1, 1, 0, 1];
    g.setAttribute("uv", new THREE.Float32BufferAttribute([uv[0], uv[1], uv[2], uv[3], uv[4], uv[5],
                                                           uv[0], uv[1], uv[4], uv[5], uv[6], uv[7]], 2));
    g.computeVertexNormals();
    return g;
  }

  /* =========================================================== planform
     The hard structure is a rectangle with generous bow corners and tighter
     stern ones. The path runs anticlockwise seen from above, starting on the
     bow centreline, so its outward normal is the tangent turned right.   */
  function planSegs() {
    var bY = HY - RB, sY = HY - RS;
    return [
      { l: [HX1, 0, HX1, bY] },
      { a: [HX1 - RB, bY, RB, 0, PI / 2] },
      { l: [HX1 - RB, HY, HX0 + RS, HY] },
      { a: [HX0 + RS, sY, RS, PI / 2, PI] },
      { l: [HX0, sY, HX0, -sY] },
      { a: [HX0 + RS, -sY, RS, PI, 1.5 * PI] },
      { l: [HX0 + RS, -HY, HX1 - RB, -HY] },
      { a: [HX1 - RB, -bY, RB, 1.5 * PI, 2 * PI] },
      { l: [HX1, -bY, HX1, 0] }
    ];
  }
  function segLen(sg) {
    if (sg.l) return Math.hypot(sg.l[2] - sg.l[0], sg.l[3] - sg.l[1]);
    return sg.a[2] * (sg.a[4] - sg.a[3]);
  }
  function segAt(sg, t) {
    if (sg.l) {
      var L = sg.l, dx = L[2] - L[0], dy = L[3] - L[1], len = Math.hypot(dx, dy);
      return { x: L[0] + dx * t, y: L[1] + dy * t, nx: dy / len, ny: -dx / len };
    }
    var A = sg.a, ang = A[3] + (A[4] - A[3]) * t;
    return { x: A[0] + A[2] * Math.cos(ang), y: A[1] + A[2] * Math.sin(ang), nx: Math.cos(ang), ny: Math.sin(ang) };
  }
  /* samples: straights every "step" metres, arcs every "arcStep" radians,
     or (uniform) evenly by arc length. Each carries its distance s. */
  function planSamples(step, arcStep, uniformN) {
    var segs = planSegs(), out = [], i, k, s0 = 0, tot = 0;
    for (i = 0; i < segs.length; i++) tot += segLen(segs[i]);
    if (uniformN) {
      var d = tot / uniformN, si = 0, acc = 0;
      for (k = 0; k < uniformN; k++) {
        var want = k * d;
        while (si < segs.length - 1 && want > acc + segLen(segs[si])) { acc += segLen(segs[si]); si++; }
        var p = segAt(segs[si], Math.min(1, (want - acc) / segLen(segs[si])));
        p.s = want; out.push(p);
      }
      return { pts: out, total: tot };
    }
    for (i = 0; i < segs.length; i++) {
      var L = segLen(segs[i]);
      var n = segs[i].l ? Math.max(1, Math.ceil(L / step)) : Math.max(2, Math.ceil((segs[i].a[4] - segs[i].a[3]) / arcStep));
      for (k = 0; k < n; k++) { var q = segAt(segs[i], k / n); q.s = s0 + L * k / n; out.push(q); }
      s0 += L;
    }
    return { pts: out, total: tot };
  }
  /* bag bulge: (47 ft 0 in - 43 ft 8 in) / 2 = 0.508 m abeam and
     (87 ft 11 in - 81 ft) / 2 = 1.054 m at bow and stern (see the header) */
  function bulge(p) { return 0.508 + 0.546 * p.nx * p.nx; }

  /* sweep a profile round the planform. prof(p, k) -> [d outward, z]. The
     ring is closed; triangles face outward. */
  function sweep(THREE, S, K, prof, uScale) {
    var pts = S.pts, n = pts.length, pos = [], uv = [], idx = [], i, k;
    for (i = 0; i <= n; i++) {
      var p = pts[i % n], s = i < n ? p.s : S.total;
      for (k = 0; k < K; k++) {
        var dz = prof(p, k, i % n);
        pos.push(p.x + p.nx * dz[0], p.y + p.ny * dz[0], dz[1]);
        uv.push(s / uScale, dz[1] / 2.6);
      }
    }
    for (i = 0; i < n; i++) for (k = 0; k < K - 1; k++) {
      var A = i * K + k, B = (i + 1) * K + k, C = A + 1, D = B + 1;
      idx.push(A, C, B, B, C, D);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* ================================================================ skirt
     Bag and finger, the LCAC's defining silhouette. The bag is attached
     along the top of the buoyancy box and bulges out; the fingers hang from
     its lower edge to the water in a row of rounded lobes, each one cut up
     at its edges so the separate fingers show at the waterline.         */
  var BAG = [[-0.12, 2.52, 1], [0.38, 2.47], [0.70, 2.32], [0.90, 2.08], [1.00, 1.78],
             [0.97, 1.50], [0.86, 1.28], [0.72, 1.14], [0.50, 1.06]];
  function buildSkirt(THREE, bins) {
    var bagS = planSamples(1.8, PI / 14, 0);
    bins.skirt.add(sweep(THREE, bagS, BAG.length, function (p, k) {
      var r = BAG[k], D = bulge(p);
      return [r[2] ? r[0] : r[0] * D, r[1]];
    }, 3.0));
    /* one finger per 0.85 m of periphery, four samples across each */
    var tot = planSamples(1, 1, 8).total, NF = Math.round(tot / 0.85), SPF = 4;
    var fS = planSamples(0, 0, NF * SPF);
    bins.skirt.add(sweep(THREE, fS, 3, function (p, k, i) {
      var t = (i % SPF) / SPF, lobe = Math.sin(PI * t), D = bulge(p);
      if (k === 0) return [0.74 * D + 0.05 * lobe, 1.17];
      if (k === 1) return [0.64 * D - 0.02 + 0.20 * lobe, 0.56];
      return [0.54 * D - 0.06 + 0.17 * lobe, -0.04 + 0.34 * Math.pow(1 - lobe, 1.5)];
    }, 3.0));
  }

  /* ======================================================= hard structure */
  function buildHull(THREE, bins) {
    /* buoyancy box: the full rounded planform, 0.95 m deep. Its walls are
       inside the bag; its top shows only fore and aft as the ramp aprons. */
    var S = planSamples(2.5, PI / 8, 0), ring = [];
    for (var i = S.pts.length - 1; i >= 0; i--) ring.push([S.pts[i].x, S.pts[i].y]);
    bins.skin.add(prism(THREE, ring, ZB, ZD, 0), null, bins.walk);

    /* cargo deck: one quad with the whole painted texture across it, 5 cm
       proud of the box top - close enough to read as one surface, far
       enough apart that the depth buffer never has to choose at range */
    bins.deck.add(quad(THREE, [DKX0, -SY0, ZD + 0.05], [DKX1, -SY0, ZD + 0.05],
                              [DKX1, SY0, ZD + 0.05], [DKX0, SY0, ZD + 0.05],
                              [0, 0, 1, 0, 1, 1, 0, 1]));

    /* side structures: buoyancy tanks below, machinery above, 2.4 m high and
       2.35 m wide, running the full length. The outboard bow corner follows
       the planform's bow radius. */
    for (var sg = -1; sg <= 1; sg += 2) {
      var pts = [[SX0, SY0], [HX1 - 0.05, SY0]];
      for (var a = 0; a <= 6; a++) {
        var ang = (a / 6) * (PI / 2);
        var r = RB - 0.05;
        pts.push([HX1 - RB + r * Math.cos(ang), HY - RB + r * Math.sin(ang)]);
      }
      pts.push([SX0, SY1 - 0.05]);
      var P2 = [];
      for (var q = 0; q < pts.length; q++) P2.push([pts[q][0], sg * pts[q][1]]);
      bins.skin.add(prism(THREE, P2, ZD, ZS, 0.06));
    }
  }

  /* ======================================================= side furniture */
  function buildSides(THREE, bins) {
    var i, k, sg;
    for (k = 0; k < 2; k++) {
      sg = k ? 1 : -1;                     /* -1 starboard, +1 port       */
      var yc = sg * SYC;

      /* ---- bow thruster: a swivelling hood on a drum, fed with lift air,
         on the forward end of each side structure. Stowed facing outboard. */
      var bx = 10.95;
      bins.skin.add(cylZ(THREE, 0.74, 0.78, 0.26, 20), T(THREE, bx, yc, ZS + 0.13));
      bins.skin.add(cylZ(THREE, 0.66, 0.68, 0.78, 20), T(THREE, bx, yc, ZS + 0.65), bins.walk);
      bins.dark.add(cylZ(THREE, 0.70, 0.70, 0.08, 20), T(THREE, bx, yc, ZS + 0.30));
      /* the nozzle: a short square-mouthed elbow off the drum */
      bins.skin.add(box(THREE, 0.9, 0.95, 0.62), T(THREE, bx, yc + sg * 0.62, ZS + 0.64));
      bins.dark.add(box(THREE, 0.74, 0.06, 0.48), T(THREE, bx, yc + sg * 1.11, ZS + 0.64));

      /* ---- lift-fan intakes: two per side, round mouths with a coaming
         and a grille, over the centrifugal fans in the machinery spaces. */
      var fx = [-1.3, -4.1];
      for (i = 0; i < 2; i++) {
        var cx = fx[i];
        bins.skin.add(cylZ(THREE, 0.98, 1.02, 0.30, 24, true), T(THREE, cx, yc, ZS + 0.15));
        bins.dark.add(cylZ(THREE, 0.92, 0.92, 0.26, 24, true), T(THREE, cx, yc, ZS + 0.15), null, true);
        bins.dark.add(cylZ(THREE, 0.93, 0.93, 0.02, 24), T(THREE, cx, yc, ZS + 0.08));
        for (var gb = -3; gb <= 3; gb++) {
          var hw = Math.sqrt(Math.max(0.01, 0.92 * 0.92 - (gb * 0.25) * (gb * 0.25)));
          bins.metal.add(box(THREE, 2 * hw, 0.05, 0.07), T(THREE, cx, yc + gb * 0.25, ZS + 0.27));
        }
        bins.metal.add(box(THREE, 0.05, 1.84, 0.07), T(THREE, cx, yc, ZS + 0.27));
      }

      /* ---- turbine exhausts: two TF40Bs a side, each venting through a
         short oval uptake canted outboard, just ahead of the shrouds. */
      var ex = [-6.3, -7.8];
      for (i = 0; i < 2; i++) {
        var eg = cylZ(THREE, 0.44, 0.52, 0.95, 16);
        eg.scale(1.25, 1, 1);
        bins.skin.add(eg, T(THREE, ex[i], sg * (SYC + 0.17), ZS + 0.38, -sg * 0.35, 0, 0));
        var mouth = cylZ(THREE, 0.38, 0.38, 0.04, 16); mouth.scale(1.25, 1, 1);
        bins.dark.add(mouth, T(THREE, ex[i], sg * (SYC + 0.33), ZS + 0.84, -sg * 0.35, 0, 0));
      }
      /* the turbine air inlets: louvred panels on the outboard face */
      for (i = 0; i < 2; i++) {
        bins.dark.add(box(THREE, 1.3, 0.06, 0.9), T(THREE, ex[i], sg * (SY1 + 0.04), 3.95));
        for (var lv = 0; lv < 5; lv++)
          bins.metal.add(box(THREE, 1.2, 0.09, 0.05), T(THREE, ex[i], sg * (SY1 + 0.07), 3.60 + lv * 0.18));
      }

      /* ---- machinery hatches and bollards along the walkway */
      var hx = [5.6];
      for (i = 0; i < hx.length; i++)
        bins.skin.add(box(THREE, 0.95, 0.75, 0.08), T(THREE, hx[i], yc - sg * 0.35, ZS + 0.04));
      var bol = [-9.3, -2.7, 0.9, 5.9];
      for (i = 0; i < bol.length; i++) {
        bins.metal.add(cylZ(THREE, 0.11, 0.11, 0.28, 6), T(THREE, bol[i] - 0.18, sg * (SY1 - 0.3), ZS + 0.14));
        bins.metal.add(cylZ(THREE, 0.11, 0.11, 0.28, 6), T(THREE, bol[i] + 0.18, sg * (SY1 - 0.3), ZS + 0.14));
      }

      /* ---- lifelines on stanchions along the outboard edge */
      var r0 = -9.4, r1 = 6.6, ns = 10, ry = sg * (SY1 - 0.17);
      for (i = 0; i <= ns; i++) {
        var sx = r0 + (r1 - r0) * i / ns;
        bar(THREE, bins.metal, [sx, ry, ZS], [sx, ry, ZS + 1.0], 0.035, 4);
      }
      bar(THREE, bins.metal, [r0, ry, ZS + 1.0], [r1, ry, ZS + 1.0], 0.03, 4);
      bar(THREE, bins.metal, [r0, ry, ZS + 0.55], [r1, ry, ZS + 0.55], 0.025, 4);

      /* ---- team panel: an identification panel on the side structure
         top, where the RTS camera sees it */
      bins.team.add(box(THREE, 3.4, 1.5, 0.05), T(THREE, 2.6, yc - sg * 0.05, ZS + 0.03));

      /* ---- hull number on the outboard face, forward of the inlets */
      var nx0 = 1.8, nx1 = 5.0, nz0 = 3.05, nz1 = 4.45, ny = sg * (SY1 + 0.075);
      if (sg < 0) bins.num.add(quad(THREE, [nx0, ny, nz0], [nx1, ny, nz0], [nx1, ny, nz1], [nx0, ny, nz1]));
      else        bins.num.add(quad(THREE, [nx1, ny, nz0], [nx0, ny, nz0], [nx0, ny, nz1], [nx1, ny, nz1]));
    }
  }

  /* ================================================================= cabs
     Starboard forward: the operator control cab, craftmaster, engineer and
     navigator, glazed all round because the craftmaster drives by eye. Port
     forward: the smaller cab for the loadmaster and deck engineer.       */
  function cab(THREE, bins, x0, x1, y0, y1, zb, zw, zt, zr) {
    var L = x1 - x0, W = y1 - y0, xc = (x0 + x1) / 2, yc = (y0 + y1) / 2;
    bins.skin.add(box(THREE, L, W, zw - zb), T(THREE, xc, yc, (zb + zw) / 2));
    bins.glass.add(box(THREE, L - 0.06, W - 0.06, zt - zw), T(THREE, xc, yc, (zw + zt) / 2));
    bins.skin.add(box(THREE, L + 0.16, W + 0.16, zr - zt), T(THREE, xc, yc, (zt + zr) / 2), bins.walk);
    /* window frames: corner posts and mullions, a sill and a head rail */
    var i, n, zc = (zw + zt) / 2, h = zt - zw;
    n = Math.max(2, Math.round(L / 0.8));
    for (i = 0; i <= n; i++) {
      var px = x0 + L * i / n;
      bins.skin.add(box(THREE, 0.09, 0.09, h), T(THREE, px, y0, zc));
      bins.skin.add(box(THREE, 0.09, 0.09, h), T(THREE, px, y1, zc));
    }
    n = Math.max(2, Math.round(W / 0.8));
    for (i = 1; i < n; i++) {
      var py = y0 + W * i / n;
      bins.skin.add(box(THREE, 0.09, 0.09, h), T(THREE, x0, py, zc));
      bins.skin.add(box(THREE, 0.09, 0.09, h), T(THREE, x1, py, zc));
    }
    /* sun visor over the forward glazing */
    bins.skin.add(box(THREE, 0.34, W + 0.1, 0.05), T(THREE, x1 + 0.2, yc, zt - 0.02, 0, -0.2, 0));
  }
  function buildCabs(THREE, bins) {
    /* starboard operator cab */
    var y0 = -(SY1 - 0.1), y1 = -(SY0 + 0.15), my = (y0 + y1) / 2;
    cab(THREE, bins, 6.9, 10.1, y0, y1, ZS, 5.55, 6.26, 6.45);
    /* its roof: a short pole mast with the surface-search radar and the
       navigation lights - kept low, as the craft's own is. The truck is
       the highest point, at the 23 ft 6 in (7.16 m) on-cushion height. */
    bins.skin.add(cylZ(THREE, 0.2, 0.24, 0.24, 12), T(THREE, 8.9, my, 6.57));
    bins.dark.add(box(THREE, 0.34, 1.25, 0.16), T(THREE, 8.9, my, 6.80));
    bins.metal.add(cylZ(THREE, 0.05, 0.07, 0.62, 6), T(THREE, 7.5, my, 6.76));
    bins.metal.add(box(THREE, 0.07, 0.9, 0.06), T(THREE, 7.5, my, 6.96));
    bins.metal.add(cylZ(THREE, 0.07, 0.07, 0.1, 8), T(THREE, 7.5, my, 7.10));
    bins.team.add(box(THREE, 0.03, 0.46, 0.3), T(THREE, 7.43, my + 0.28, 6.80));
    /* port loadmaster's cab: smaller and lower */
    cab(THREE, bins, 7.6, 9.8, SY0 + 0.3, SY1 - 0.25, ZS, 5.45, 5.98, 6.14);
  }

  /* ============================================================ propulsion
     Two 3.58 m four-blade propellers, each in a shroud of about 4.2 m, on
     the after end of each side structure, a pair of air rudders astern of
     each. The shroud is an aerofoil ring turned on a lathe.              */
  /* (radius, axial) round the section, leading edge forward. The lathe is
     fed the loop backwards: fed forwards it faces inward. */
  var DUCT = [
    [1.98, 1.20], [2.05, 1.05], [2.08, 0.65], [2.08, 0.05], [2.05, -0.60], [1.99, -1.18],
    [1.90, -1.20], [1.85, -0.65], [1.84, 0.20], [1.86, 0.78], [1.92, 1.10], [1.98, 1.20]
  ];
  function shroud(THREE) {
    var v = [];
    for (var i = DUCT.length - 1; i >= 0; i--) v.push(new THREE.Vector2(DUCT[i][0], DUCT[i][1]));
    var g = new THREE.LatheGeometry(v, 36);
    g.rotateZ(-PI / 2);              /* lathe axis y -> the craft's x axis   */
    return g;
  }
  function blade(THREE) {
    /* radial along y, chord along z, thickness along x; twisted and tapered
       from a 45 deg root to a 22 deg tip */
    var R0 = 0.36, R1 = 1.79, L = R1 - R0;       /* 11.75 ft propeller */
    var g = new THREE.BoxGeometry(0.07, L, 1, 1, 6, 1);
    var p = g.getAttribute("position");
    for (var i = 0; i < p.count; i++) {
      var x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      var t = (y + L / 2) / L;
      var ch = 0.46 + 0.30 * Math.sin(PI * Math.min(1, t * 0.85 + 0.12));
      if (t > 0.9) ch *= 1 - (t - 0.9) * 3.5;
      z *= ch;
      var tw = 0.78 - 0.40 * t, c = Math.cos(tw), s = Math.sin(tw);
      p.setXYZ(i, x * c - z * s, y + R0 + L / 2, x * s + z * c);
    }
    g.computeVertexNormals();
    return g;
  }
  function buildPropulsion(THREE, bins) {
    for (var k = 0; k < 2; k++) {
      var sg = k ? 1 : -1, yc = sg * DUY;
      /* shroud */
      bins.skin.add(shroud(THREE), T(THREE, DUX, yc, DUZ));
      /* pylon down to the after corner of the buoyancy box */
      bins.skin.add(prism(THREE, [[-10.4, -0.28], [-12.2, -0.28], [-12.2, 0.28], [-10.4, 0.28]], ZD, DUZ - (DRI + DRO) / 2, 0),
                    T(THREE, 0, yc, 0));
      /* gearbox nacelle: the drive comes aft out of the side structure's
         after face into the hub. The shroud axis is only 0.46 m outboard
         of the side structure's inner wall, so the nacelle starts at that
         face rather than inside the structure, where it would bulge out
         over the deck. The gearbox housing on the side structure top caps
         its forward end and stays on the structure. */
      bins.skin.add(cylX(THREE, 0.46, 0.42, 0.95, 16), T(THREE, -10.325, yc, DUZ - 0.08));
      bins.skin.add(box(THREE, 1.2, 1.25, 0.62), T(THREE, -9.28, sg * (SY0 + 0.635), ZS + 0.31), bins.walk);
      /* hub, spinner pointing aft */
      bins.dark.add(cylX(THREE, 0.40, 0.38, 0.55, 16), T(THREE, -11.05, yc, DUZ));
      bins.dark.add(cylX(THREE, 0.02, 0.38, 0.62, 16), T(THREE, -11.63, yc, DUZ, 0, 0, PI));
      /* the propeller: four blades, stopped at 45 deg. Nothing spins them,
         so they bake into the dark bin with the hub. */
      for (var b = 0; b < 4; b++) bins.dark.add(blade(THREE), T(THREE, -11.05, yc, DUZ, PI / 4 + b * PI / 2, 0, 0));
      /* shroud brace: from the outboard edge of the side structure top,
         just aft of the last lifeline stanchion, up to the shroud's
         leading-edge lip 55 deg outboard of the top (radius 2.0 m, 1.15 m
         ahead of the axis centre, where the lip wall runs 1.95 .. 2.00).
         It stays along the rim. An inboard twin would have to start near
         the axis and cross the propeller's intake face, so there is none. */
      var sx = DUX + 1.15, sdy = 2.0 * Math.sin(0.96), sdz = 2.0 * Math.cos(0.96);
      bar(THREE, bins.skin, [-9.62, sg * (SY1 - 0.15), ZS], [sx, sg * (DUY + sdy), DUZ + sdz], 0.09, 6);
      /* twin air rudders astern, hung between brackets off the shroud */
      for (var r = -1; r <= 1; r += 2) {
        var ry = yc + r * 0.92, span = 3.2;
        var sec = [[0, 0], [-0.22, 0.085], [-0.48, 0.065], [-0.76, 0.014], [-0.76, -0.014], [-0.48, -0.065], [-0.22, -0.085]];
        var ru = prism(THREE, sec, -span / 2, span / 2, 0);
        bins.skin.add(ru, T(THREE, -12.58, ry, DUZ));
        bins.metal.add(cylZ(THREE, 0.05, 0.05, span + 0.35, 6), T(THREE, -12.58, ry, DUZ));
      }
      bins.skin.add(box(THREE, 0.5, 2.2, 0.12), T(THREE, -12.5, yc, DUZ + 1.72));
      bins.skin.add(box(THREE, 0.5, 2.2, 0.12), T(THREE, -12.5, yc, DUZ - 1.72));
      bins.skin.add(box(THREE, 0.45, 0.12, 0.24), T(THREE, -12.32, yc, DUZ + 1.82));
      bins.skin.add(box(THREE, 0.45, 0.12, 0.24), T(THREE, -12.32, yc, DUZ - 1.82));
    }
  }

  /* ================================================================ ramps
     Bow ramp the full width between the side structures, stowed only just
     raised - it is the spray fence on the run in, not a wall. The narrow
     stern ramp sits between the shrouds, stowed up.                      */
  function ramp(THREE, bins, hx, dir, w, len, ang) {
    var z0 = ZD + 0.06, hw = w / 2, th = 0.22;
    /* the plate */
    var g = new THREE.BoxGeometry(len, w, th);
    g.translate(len / 2, 0, th / 2);
    var m = new THREE.Matrix4().makeRotationY(-ang);
    if (dir < 0) m = new THREE.Matrix4().makeRotationZ(PI).multiply(m);
    m.setPosition(hx, 0, z0);
    bins.skin.add(g, m, bins.walk);
    /* transverse cleats so a track can climb it */
    var n = Math.round(len / 0.45);
    for (var i = 1; i < n; i++) {
      var cg = new THREE.BoxGeometry(0.07, w - 0.3, 0.06);
      cg.translate(i * len / n, 0, th + 0.03);
      var mc = new THREE.Matrix4().makeRotationY(-ang);
      if (dir < 0) mc = new THREE.Matrix4().makeRotationZ(PI).multiply(mc);
      mc.setPosition(hx, 0, z0);
      bins.dark.add(cg, mc);
    }
    /* side curbs and the hinge knuckles */
    for (var sd = -1; sd <= 1; sd += 2) {
      var kg = new THREE.BoxGeometry(len, 0.12, 0.16);
      kg.translate(len / 2, sd * (hw - 0.06), th + 0.08);
      var mk = new THREE.Matrix4().makeRotationY(-ang);
      if (dir < 0) mk = new THREE.Matrix4().makeRotationZ(PI).multiply(mk);
      mk.setPosition(hx, 0, z0);
      bins.skin.add(kg, mk);
    }
    var nk = Math.max(3, Math.round(w / 1.4));
    for (i = 0; i < nk; i++) {
      var ky = -hw + 0.4 + (w - 0.8) * i / (nk - 1);
      bins.metal.add(cylY(THREE, 0.13, 0.13, 0.5, 8), T(THREE, hx, ky, z0 + 0.05));
    }
  }
  function buildRamps(THREE, bins) {
    ramp(THREE, bins, DKX1, 1, BRW, 2.95, 0.21);
    ramp(THREE, bins, DKX0, -1, SRW, 2.05, 0.62);
    /* the fixed ramp-hinge sills across the deck ends */
    bins.dark.add(box(THREE, 0.18, 2 * SY0, 0.1), T(THREE, DKX1 - 0.1, 0, ZD + 0.05));
    bins.dark.add(box(THREE, 0.18, SRW + 0.2, 0.1), T(THREE, DKX0 + 0.1, 0, ZD + 0.05));
    /* stern ramp side walls where the deck runs out between the shrouds */
    var wy = SRW / 2 + 0.24;
    bins.skin.add(box(THREE, 1.7, 0.2, 0.6), T(THREE, DKX0 + 0.55, wy, ZD + 0.3), bins.walk);
    bins.skin.add(box(THREE, 1.7, 0.2, 0.6), T(THREE, DKX0 + 0.55, -wy, ZD + 0.3), bins.walk);
  }

  /* =============================================================== build */
  /* The baked geometry, one BufferGeometry per material, made on the first
     build and shared by every team colour after it: getModel builds once
     per key and team, and nothing here depends on the team. Clones already
     share geometry with their template, so this is the same sharing one
     step further up. */
  var ORDER = ["skirt", "skin", "walk", "deck", "metal", "dark", "glass", "team", "num"];
  var GEO = null;
  function bake(THREE) {
    if (GEO) return GEO;
    var bins = {
      skin: new Bin(6.0), walk: new Bin(3.0), deck: new Bin(0), skirt: new Bin(0),
      metal: new Bin(0), dark: new Bin(0), glass: new Bin(0), team: new Bin(0), num: new Bin(0)
    };
    buildSkirt(THREE, bins);
    buildHull(THREE, bins);
    buildSides(THREE, bins);
    buildCabs(THREE, bins);
    buildPropulsion(THREE, bins);
    buildRamps(THREE, bins);
    var out = {};
    for (var i = 0; i < ORDER.length; i++) out[ORDER[i]] = bins[ORDER[i]].geometry(THREE);
    GEO = out;
    return GEO;
  }

  function build(THREE, M, C) {
    var team = (C && C.team) || "#3f7fd0";
    var MT = mats(THREE, team), geo = bake(THREE);
    var G = new THREE.Group();
    for (var i = 0; i < ORDER.length; i++) {
      if (!geo[ORDER[i]]) continue;
      var m = new THREE.Mesh(geo[ORDER[i]], MT[ORDER[i]]);
      m.name = "lcac_" + ORDER[i];
      G.add(m);
    }
    return G;
  }

  UNIT_MODELS["lst"] = { len: 26.8, build: build };
})();
