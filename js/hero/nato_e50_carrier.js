/* ========= nato_e50_carrier.js - HERO reference model: USS Forrestal =====
   Style and period anchor for the e50 (1950s NATO) surface fleet.

   What has to read at a glance, from the reference photographs
   (forrestal_ss_crop, forrestal_stbd1955, forrestal_deck_crop,
    forrestal_bow_crop, forrestal_stern_crop, forrestal_island_crop):

     - ONE UNBROKEN FULL-WIDTH FLIGHT DECK, 325 m long and 70 m across at
       its widest, overhanging a 39.6 m hull by more than twenty metres on
       the port side. The deck is the ship; everything else hangs off it.
     - A PORT-SIDE ANGLED LANDING AREA cutting across the after deck at
       about 10.5 degrees, ending in a round-down that projects off the
       port quarter well abaft the starboard deck corner. The after deck
       edge is therefore a long diagonal, not a transom.
     - A SMALL ISLAND SET WELL AFT on the starboard deck edge - centre at
       roughly 0.36 of the length from the stern - with the funnel uptakes
       faired into its after end as a mack, and a heavy lattice mast
       carrying the 1950s radar suite: an orange-peel height finder, a
       parabolic air-search dish and a bedspring array.
     - AN OPEN BOW. No hurricane bow on the early units: the forward
       fifteen metres of flight deck is bare overhang carried on brackets,
       with daylight between it and the flared forecastle below, and two
       bridle-catcher horns poking forward past the deck edge.
     - FOUR CATAPULT TRACKS - two up the bow, two in the waist along the
       angle - and FOUR DECK-EDGE LIFTS, three to starboard and one to
       port abaft the island, each hung outboard of the deck edge as a
       rectangle that breaks the deck line.
     - 5-INCH SPONSONS AT THE DECK CORNERS, hung low on the hull side
       forward and aft, which is what stops a 1950s carrier reading as a
       modern one.

   Model space: +X bow, +Y port (left), +Z up. Real metres, waterline at
   z = 0, keel at z = -11.3, flight deck at z = 25.0. render3d.js stands
   the model up with rotation.x = -PI/2 and renormalises by length.

   Materials are the house three tiers only:
     SKIN  - painted steel, every instance carrying a procedural
             CanvasTexture (hull plating with strakes, butts, boot topping,
             anti-fouling and rust weeps; flight-deck non-skid with the
             full marking plan; superstructure plate with soot).
             roughness 0.84-0.95, metalness <= 0.10.
     METAL - masts, railings, barrels, screws, anchors, cranes. No map.
     GLASS - bridge and pri-fly glazing.

   ASCII only: a stray byte in a hex literal has broken this project.     */

var HeroForrestal = (function () {
  "use strict";

  var PI = Math.PI;

  /* ------------------------------------------------------- principal dims */
  var LOA     = 325.0;          /* flight deck, bridle horns excluded       */
  var HALF    = LOA * 0.5;      /* 162.5                                    */
  var FD_TOP  = 25.0;           /* flight deck surface above the waterline  */
  var FD_TH   = 1.0;            /* slab depth before the bevel is added     */
  var FD_BOT  = 23.3;           /* underside of the deck / gallery head     */
  var DRAFT   = 11.3;
  var HULL_HB = 19.8;           /* waterline half beam                      */
  var HANG_HB = 20.9;           /* hangar-side half beam (the knuckle)      */
  var ISL_X0  = -63.0, ISL_X1 = -31.0;   /* island, aft and forward ends    */
  var ISL_YO  = -25.6, ISL_YI = -13.4;   /* outboard and inboard faces      */
  var ANG_DEG = 10.5;                     /* landing area angle to port     */
  var ANG_T   = Math.tan(ANG_DEG * PI / 180);

  /* landing-area centreline: y as a function of x. Passes the deck
     centreline forward and walks out to port going aft.                    */
  function angY(x) { return -10.0 + (40.0 - x) * ANG_T; }

  /* ------------------------------------------------------ the deck outline
     Plan view, metres, bow first down the port side, across the diagonal
     after edge, then forward up the starboard side. Widest point is 70.5 m
     over the port sponson; the lifts carry the extreme beam out to 76.    */
  var DECK = [
    [ 162.5,  13.0], [ 157.0,  18.0], [ 148.0,  21.6], [ 136.0,  23.6],
    [ 112.0,  24.4], [  88.0,  24.6], [  64.0,  25.2], [  44.0,  26.6],
    [  22.0,  30.0], [   0.0,  33.8], [ -24.0,  38.2], [ -50.0,  42.0],
    [ -76.0,  43.6], [-104.0,  44.0], [-132.0,  44.0], [-152.0,  42.6],
    [-159.0,  39.0], [-163.0,  33.0],
    [-164.0,  22.0], [-160.0,  12.0], [-156.0,   2.0], [-152.0, -10.0],
    [-148.0, -19.0], [-142.0, -24.0],
    [-120.0, -26.0], [ -92.0, -26.6], [ -64.0, -26.6], [ -40.0, -26.0],
    [ -12.0, -25.8], [  16.0, -25.6], [  44.0, -25.8], [  70.0, -25.6],
    [  96.0, -25.2], [ 120.0, -24.2], [ 138.0, -22.2], [ 150.0, -19.0],
    [ 158.0, -15.5], [ 162.5, -13.0],
  ];

  /* deck-edge lifts: [centre x, side (+1 port / -1 starboard)]             */
  var LIFTS = [[ 46, -1], [ 2, -1], [-88, -1], [-70, 1]];

  /* ============================================================== helpers */
  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function mkCv(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function finish(THREE, cv, rw, rh) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (rw) t.repeat.set(rw, rh);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }

  /* a lofted body with the winding flipped, the way warship3d.js does it,
     so the outward faces light correctly                                   */
  function loftMesh(THREE, M, sections, segs, mtl) {
    var g = M.loft(THREE, sections, segs);
    var idx = g.getIndex();
    if (idx) {
      var a = idx.array, i, t;
      for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      idx.needsUpdate = true;
    }
    g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* a cylinder stretched between two points: truss legs, braces, davits    */
  function strut(THREE, mtl, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az;
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return new THREE.Object3D();
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1), mtl);
    m.position.set((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
                                    new THREE.Vector3(dx, dy, dz).normalize());
    return m;
  }

  function box(THREE, mtl, lx, ly, lz, x, y, z) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), mtl);
    m.position.set(x, y, z);
    return m;
  }

  /* a box whose top face is scaled in: every deckhouse and funnel casing
     gets its inward-sloping sides from this for free                       */
  function tbox(THREE, mtl, lx, ly, lz, top) {
    var g = new THREE.CylinderGeometry(top === undefined ? 1 : top, 1, lz, 4, 1);
    g.rotateX(PI / 2); g.rotateZ(PI / 4);
    g.scale(lx * 0.70710678, ly * 0.70710678, 1);
    g = g.toNonIndexed(); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* stanchion-and-wire run along a plan polyline. A warship without
     railings does not read as a warship, and on a carrier the catwalk
     railing is what fringes the deck edge in every photograph.            */
  function railing(THREE, G, mtl, pts, z, h, step, closed) {
    var i, j, n = pts.length, last = closed ? n : n - 1;
    var sg = new THREE.BoxGeometry(0.13, 0.13, h);
    for (i = 0; i < last; i++) {
      var a = pts[i], b = pts[(i + 1) % n];
      var dx = b[0] - a[0], dy = b[1] - a[1];
      var L = Math.sqrt(dx * dx + dy * dy);
      if (L < 0.5) continue;
      var ang = Math.atan2(dy, dx), k = Math.max(1, Math.round(L / step));
      for (j = 0; j < k; j++) {
        var f = j / k;
        var st = new THREE.Mesh(sg, mtl);
        st.position.set(a[0] + dx * f, a[1] + dy * f, z + h * 0.5);
        G.add(st);
      }
      for (j = 0; j < 2; j++) {
        var w = new THREE.Mesh(new THREE.BoxGeometry(L, 0.075, 0.075), mtl);
        w.position.set(a[0] + dx * 0.5, a[1] + dy * 0.5, z + h * (j ? 1.0 : 0.55));
        w.rotation.z = ang;
        G.add(w);
      }
    }
  }

  /* offset a closed plan polyline outward (positive) or inward by d       */
  function inset(pts, d) {
    var out = [], n = pts.length, i;
    /* the outline is convex enough that a per-vertex normal offset from
       the centroid is stable and much cheaper than a real miter          */
    var cx = 0, cy = 0;
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) {
      var px = pts[i][0] - cx, py = pts[i][1] - cy;
      var L = Math.sqrt(px * px + py * py) || 1;
      out.push([pts[i][0] + px / L * d, pts[i][1] + py / L * d]);
    }
    return out;
  }

  /* ============================================================= textures
     SKIN tier only. The hull map is the load-bearing one: the loft's v
     coordinate runs waterline -> deck -> waterline -> keel -> waterline,
     so with flipY the canvas reads

        row 0.00H  waterline, port side
        row 0.25H  keel
        row 0.50H  waterline, starboard side
        row 0.75H  hull top edge (the knuckle)
        row 1.00H  waterline, port side again

     which puts the whole underwater body in the top half of the image and
     both topsides bands in the bottom half, each with its own waterline to
     hang a boot topping off and its own deck edge to weep rust from.     */
  var PAINT = { hull: 0x737b83, sup: 0x7f878e, deck: 0x484d52 };
  var HULL_DR = 11.3;      /* metres of hull painted below the waterline   */
  var HULL_TZ = 13.0;      /* metres of topsides the map has to cover      */

  /* The loft hands back a cylindrical v that runs round the girth, which
     puts the waterline at a different height on every station and smears
     the plating. Rewrite v straight from the vertex z instead: v = 0.5 is
     the waterline everywhere, 1.0 the keel, 0.0 the deck edge. Anything
     built from hull plating gets the same treatment, boxes included. */
  function reuv(geo, x0, x1) {
    var pos = geo.getAttribute("position"), uv = geo.getAttribute("uv"), i, z, v;
    if (!pos || !uv) return geo;
    for (i = 0; i < pos.count; i++) {
      z = pos.getZ(i);
      v = z >= 0 ? 0.5 - 0.5 * Math.min(1, z / HULL_TZ)
                 : 0.5 + 0.5 * Math.min(1, -z / HULL_DR);
      uv.setXY(i, (pos.getX(i) - x0) / (x1 - x0), v);
    }
    uv.needsUpdate = true;
    return geo;
  }

  function hullTex(THREE) {
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(59171), i, y, len, gr;
    var WL = H * 0.5;                       /* the waterline row           */
    var PXU = WL / HULL_DR;                 /* pixels per metre, submerged */
    var PXT = (H - WL) / HULL_TZ;           /* pixels per metre, topsides  */

    /* --- anti-fouling, keel at row 0 up to the waterline at row WL ----- */
    g.fillStyle = "#5b392c"; g.fillRect(0, 0, W, WL);
    for (i = 0; i < 240; i++) {
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillStyle = R() < 0.45 ? "#7c4a37" : "#3a2019";
      g.fillRect(R() * W, R() * WL, 40 + R() * 200, 6 + R() * 26);
    }
    g.globalAlpha = 1;
    /* --- haze grey topsides, waterline at WL up to the deck edge ------- */
    g.fillStyle = hx(PAINT.hull); g.fillRect(0, WL, W, H - WL);
    for (i = 0; i < 260; i++) {
      g.globalAlpha = 0.04 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, WL + R() * (H - WL), 50 + R() * 240, 5 + R() * 16);
    }
    g.globalAlpha = 1;

    /* --- boot topping: 1.4 m of black right ABOVE the waterline --------
       Row 0 of this canvas is the keel and row WL the waterline, so WL minus
       anything is the submerged half of the map. Drawing the band there put
       the carrier's boot topping permanently under water and left her the one
       ship in the set whose haze grey ran straight into the sea. */
    g.fillStyle = "#191b1e";
    g.fillRect(0, WL, W, 1.4 * PXT);

    /* --- plate seams: vertical butts, horizontal strakes --------------- */
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 1.5;
    for (i = 1; i < 68; i++) {
      var bx = i * W / 68 + (R() - 0.5) * 5;
      g.beginPath(); g.moveTo(bx, 0); g.lineTo(bx, H); g.stroke();
    }
    g.lineWidth = 1.4;
    for (i = 1; i * 1.85 < HULL_TZ; i++) {          /* strakes, topsides   */
      y = WL + i * 1.85 * PXT;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    for (i = 1; i * 2.30 < HULL_DR; i++) {          /* strakes, submerged  */
      y = WL - i * 2.30 * PXU;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    /* a raised sheer strake and a knuckle strake, the two courses that
       actually catch the light on a real hull */
    g.strokeStyle = "rgba(255,255,255,0.18)"; g.lineWidth = 3.2;
    for (i = 0; i < 2; i++) {
      y = WL + (i ? 11.6 : 6.4) * PXT;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 2.0;
    for (i = 0; i < 2; i++) {
      y = WL + (i ? 11.9 : 6.7) * PXT;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    g.lineWidth = 1;

    /* --- rust weeping DOWN from freeing ports and scuppers -------------
       the topsides run waterline (row WL) to deck edge (row H), so world
       "down" is canvas-up and every streak walks toward WL.             */
    for (i = 0; i < 110; i++) {
      var x = R() * W;
      y = WL + (0.34 + R() * 0.54) * (H - WL);
      len = (2.6 + R() * 8.5) * PXT;
      gr = g.createLinearGradient(0, y, 0, y - len);
      gr.addColorStop(0, "rgba(88,54,34,0.42)");
      gr.addColorStop(0.35, "rgba(88,54,34,0.22)");
      gr.addColorStop(1, "rgba(88,54,34,0.0)");
      g.fillStyle = gr; g.fillRect(x, y - len, 1.6 + R() * 3.2, len);
      g.fillStyle = "rgba(26,22,20,0.40)"; g.fillRect(x - 1, y - 2.5, 4 + R() * 4, 3);
    }
    /* the long stains under the two hawse pipes, right forward */
    for (i = 0; i < 2; i++) {
      var ax = W * (0.955 + i * 0.017);
      y = WL + 10.4 * PXT; len = 7.0 * PXT;
      gr = g.createLinearGradient(0, y, 0, y - len);
      gr.addColorStop(0, "rgba(104,62,36,0.38)");
      gr.addColorStop(1, "rgba(104,62,36,0.0)");
      g.fillStyle = gr; g.fillRect(ax, y - len, 5, len);
    }
    /* --- exhaust staining carried aft along the topsides -------------- */
    gr = g.createLinearGradient(W * 0.40, 0, 0, 0);
    gr.addColorStop(0, "rgba(28,28,30,0.0)");
    gr.addColorStop(1, "rgba(28,28,30,0.26)");
    g.fillStyle = gr; g.fillRect(0, WL + (H - WL) * 0.45, W * 0.40, (H - WL) * 0.55);

    return finish(THREE, cv, 1, 1);
  }

  /* superstructure / hangar-side plate: seams, scuttles, soot            */
  function supTex(THREE) {
    var W = 1024, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(4409), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    for (i = 0; i < 150; i++) {
      g.globalAlpha = 0.05 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 140, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.5;
    for (i = 1; i < 26; i++) {
      g.beginPath(); g.moveTo(i * W / 26, 0); g.lineTo(i * W / 26, H); g.stroke();
      g.beginPath(); g.moveTo(0, i * H / 26); g.lineTo(W, i * H / 26); g.stroke();
    }
    /* scuttles and watertight doors stay in the paint, not in geometry */
    g.globalAlpha = 0.36; g.fillStyle = "#101214";
    for (i = 0; i < 46; i++) {
      g.beginPath(); g.arc(R() * W, R() * H, 2.4 + R() * 2.6, 0, 6.2832); g.fill();
    }
    g.globalAlpha = 1;
    /* rust weeping down from every deck edge */
    for (i = 0; i < 55; i++) {
      var x = R() * W, y = R() * H * 0.8, len = 8 + R() * 40;
      var gr = g.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(88,60,42,0.24)");
      gr.addColorStop(1, "rgba(88,60,42,0.0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.4 + R() * 2.6, len);
    }
    return finish(THREE, cv, 1, 1);
  }

  /* the mack casing: the same plate, burnt black around the uptake mouth */
  function stackTex(THREE) {
    var W = 512, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(881), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    var gr = g.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, "rgba(16,16,18,0.92)");
    gr.addColorStop(0.30, "rgba(24,24,26,0.55)");
    gr.addColorStop(0.75, "rgba(30,30,32,0.10)");
    gr.addColorStop(1, "rgba(30,30,32,0.0)");
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.6;
    for (i = 1; i < 12; i++) {
      g.beginPath(); g.moveTo(0, i * H / 12); g.lineTo(W, i * H / 12); g.stroke();
      g.beginPath(); g.moveTo(i * W / 12, 0); g.lineTo(i * W / 12, H); g.stroke();
    }
    g.globalAlpha = 0.30; g.fillStyle = "#0d0d0f";
    for (i = 0; i < 200; i++) g.fillRect(R() * W, R() * H * 0.55, 2 + R() * 8, 3 + R() * 26);
    g.globalAlpha = 1;
    return finish(THREE, cv, 1, 1);
  }

  /* the island's pennant number panel: the team flash, so ownership reads
     off the one part of a carrier everyone looks at                       */
  function numberTex(THREE, team) {
    var W = 512, H = 256, cv = mkCv(W, H), g = cv.getContext("2d");
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.18; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (var i = 1; i < 10; i++) {
      g.beginPath(); g.moveTo(0, i * H / 10); g.lineTo(W, i * H / 10); g.stroke();
    }
    g.globalAlpha = 1;
    g.font = "bold 168px Arial"; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillStyle = hx(team); g.fillText("59", W * 0.5, H * 0.52);
    g.lineWidth = 5; g.strokeStyle = "rgba(255,255,255,0.85)";
    g.strokeText("59", W * 0.5, H * 0.52);
    return finish(THREE, cv, 1, 1);
  }

  /* ---------------------------------------------------- flight deck skin
     One plan-view painting of the whole deck, sampled by the slab's own
     shape-space UVs, so every marking sits where a chart says it sits and
     none of it costs a triangle. Canvas x runs stern -> bow, canvas y runs
     port -> starboard (flipY puts port at the top).                       */
  var DX0 = -170, DX1 = 172, DY0 = -34, DY1 = 48;

  function deckTex(THREE, team) {
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1595), i;
    var SX = W / (DX1 - DX0), SY = H / (DY1 - DY0);
    function cx(x) { return (x - DX0) * SX; }
    function cy(y) { return H - (y - DY0) * SY; }
    function mline(x1, y1, x2, y2, wm, col, dash) {
      g.save();
      g.strokeStyle = col; g.lineWidth = Math.max(1.2, wm * SY);
      if (dash) g.setLineDash([dash[0] * SX, dash[1] * SX]);
      g.beginPath(); g.moveTo(cx(x1), cy(y1)); g.lineTo(cx(x2), cy(y2)); g.stroke();
      g.restore();
    }
    function mrect(xa, ya, xb, yb, col) {
      g.fillStyle = col;
      g.fillRect(cx(xa), cy(yb), (xb - xa) * SX, (yb - ya) * SY);
    }

    /* --- non-skid ----------------------------------------------------- */
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 420; i++) {
      g.globalAlpha = 0.05 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#8b9298" : "#23272b";
      g.fillRect(R() * W, R() * H, 24 + R() * 150, 10 + R() * 46);
    }
    g.globalAlpha = 0.24; g.fillStyle = "#14171a";
    for (i = 0; i < 5200; i++) g.fillRect(R() * W, R() * H, 2, 2);   /* grit */
    g.globalAlpha = 1;
    /* longitudinal deck plating, the seams a flight deck actually shows */
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.5;
    for (i = 0; i < 30; i++) {
      var py = cy(DY0 + (i + 0.5) * (DY1 - DY0) / 30);
      g.beginPath(); g.moveTo(0, py); g.lineTo(W, py); g.stroke();
    }
    g.strokeStyle = "rgba(0,0,0,0.09)"; g.lineWidth = 1.2;
    for (i = 0; i < 30; i++) {
      var px = cx(DX0 + (i + 0.5) * (DX1 - DX0) / 30);
      g.beginPath(); g.moveTo(px, 0); g.lineTo(px, H); g.stroke();
    }

    /* --- the angled landing area -------------------------------------- */
    var AX0 = -166, AX1 = 50, AW = 12.7;
    mrect(-170, -34, 172, 48, "rgba(0,0,0,0)");
    /* a slightly darker, more scuffed rectangle for the landing run */
    g.save();
    g.beginPath();
    g.moveTo(cx(AX0), cy(angY(AX0) + AW)); g.lineTo(cx(AX1), cy(angY(AX1) + AW));
    g.lineTo(cx(AX1), cy(angY(AX1) - AW)); g.lineTo(cx(AX0), cy(angY(AX0) - AW));
    g.closePath(); g.clip();
    g.fillStyle = "rgba(20,23,26,0.30)"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.10; g.fillStyle = "#0c0e10";
    for (i = 0; i < 500; i++)                                /* tyre scuffing */
      g.fillRect(cx(-160 + R() * 120), cy(angY(-160 + R() * 120) + (R() - 0.5) * 18),
                 14 + R() * 60, 2 + R() * 4);
    g.globalAlpha = 1; g.restore();

    mline(AX0, angY(AX0) + AW, AX1, angY(AX1) + AW, 0.75, "#e6eaec");
    mline(AX0, angY(AX0) - AW, AX1, angY(AX1) - AW, 0.75, "#e6eaec");
    mline(AX0, angY(AX0), AX1, angY(AX1), 0.75, "#e6eaec", [7, 7]);
    /* four cross-deck arrestor pendants over the after third */
    for (i = 0; i < 4; i++) {
      var wx = -136 + i * 12.5, wy = angY(wx);
      mline(wx + AW * ANG_T, wy - AW, wx - AW * ANG_T, wy + AW, 0.45, "#1b1e21");
    }
    /* the foul line, broken, just inboard of the starboard landing edge */
    mline(-150, angY(-150) - AW - 3.2, 40, angY(40) - AW - 3.2, 0.34,
          "rgba(166,84,62,0.55)", [4, 6]);

    /* --- catapults: two up the bow, two in the waist along the angle --- */
    function cat(x1, y1, x2, y2) {
      mline(x1, y1, x2, y2, 2.6, "#33383c");
      mline(x1, y1, x2, y2, 0.55, "#0e1013");
      mline(x1, y1, x2, y2, 3.6, "rgba(232,236,238,0.30)");
    }
    cat(30, -11.0, 152, -4.5);                               /* bow cat 1 */
    cat(30,   8.0, 152,  9.5);                               /* bow cat 2 */
    cat(-74, angY(-74) - 6.5, 26, angY(26) - 6.5);           /* waist cat 3 */
    cat(-74, angY(-74) + 5.5, 26, angY(26) + 5.5);           /* waist cat 4 */
    /* jet blast deflectors: a raised slab behind each catapult start */
    mrect(24, -15.5, 32, -6.5, "rgba(28,31,34,0.85)");
    mrect(24, 3.5, 32, 12.5, "rgba(28,31,34,0.85)");
    mrect(-80, angY(-80) - 11.0, -72, angY(-80) - 2.0, "rgba(28,31,34,0.85)");
    mrect(-80, angY(-80) + 1.0, -72, angY(-80) + 10.0, "rgba(28,31,34,0.85)");

    /* --- deck-edge lift outlines -------------------------------------- */
    for (i = 0; i < LIFTS.length; i++) {
      var lx = LIFTS[i][0], sd = LIFTS[i][1];
      var e0 = sd > 0 ? 30.0 : -18.0, e1 = sd > 0 ? 50.0 : -32.0;
      var ya = Math.min(e0, e1), yb = Math.max(e0, e1);
      g.save();
      g.strokeStyle = "rgba(226,230,232,0.80)"; g.lineWidth = Math.max(1.4, 0.55 * SY);
      g.strokeRect(cx(lx - 10.5), cy(yb), 21 * SX, (yb - ya) * SY);
      g.restore();
      mrect(lx - 10.5, ya, lx - 9.7, yb, "rgba(14,16,18,0.75)");
      mrect(lx + 9.7, ya, lx + 10.5, yb, "rgba(14,16,18,0.75)");
    }

    /* --- deck edge line all the way round ----------------------------- */
    g.save();
    g.strokeStyle = "rgba(226,230,232,0.55)";
    g.lineWidth = Math.max(1.4, 0.5 * SY);
    g.beginPath();
    var q = inset(DECK, -1.6);
    g.moveTo(cx(q[0][0]), cy(q[0][1]));
    for (i = 1; i < q.length; i++) g.lineTo(cx(q[i][0]), cy(q[i][1]));
    g.closePath(); g.stroke(); g.restore();

    /* --- soot from the island uptakes, drifting aft ------------------- */
    var sg = g.createLinearGradient(cx(ISL_X1), 0, cx(-165), 0);
    sg.addColorStop(0, "rgba(24,24,26,0.42)");
    sg.addColorStop(1, "rgba(24,24,26,0.0)");
    g.fillStyle = sg;
    g.fillRect(cx(-165), cy(-13.0), (ISL_X1 + 165) * SX, 20 * SY);

    /* --- pennant number, team coloured, forward and aft ---------------- */
    function num(x, y, size) {
      g.save();
      g.translate(cx(x), cy(y)); g.rotate(-PI / 2);
      g.font = "bold " + size + "px Arial";
      g.textAlign = "center"; g.textBaseline = "middle";
      g.fillStyle = hx(team); g.fillText("59", 0, 0);
      g.lineWidth = size * 0.045; g.strokeStyle = "rgba(238,242,244,0.9)";
      g.strokeText("59", 0, 0);
      g.restore();
    }
    num(120, 0, 96);
    num(-120, angY(-120), 62);

    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1 / (DX1 - DX0), 1 / (DY1 - DY0));
    t.offset.set(-DX0 / (DX1 - DX0), -DY0 / (DY1 - DY0));
    return t;
  }

  /* ================================================================ hull
     Two lofts. The lower one is the hull proper: fine forefoot, parallel
     midbody at 19.8 m half beam, squared transom. The upper one is the
     hangar and gallery box that carries the flight deck, a metre wider so
     a knuckle line runs the length of the ship, and it STOPS at x = 133 so
     the forward fifteen metres of deck is open bow, exactly as the early
     units were built.                                                     */
  var HULL_ST = [
    [-152.0, 13.0,  -8.6, 12.5, 0.30], [-146.0, 16.6, -10.4, 12.5, 0.34],
    [-136.0, 18.7, -11.1, 12.5, 0.40], [-110.0, 19.6, -11.3, 12.5, 0.46],
    [ -60.0, 19.8, -11.3, 12.6, 0.52], [   0.0, 19.8, -11.3, 12.9, 0.54],
    [  50.0, 19.7, -11.3, 13.4, 0.56], [  88.0, 18.9, -11.3, 14.4, 0.64],
    [ 112.0, 17.2, -11.1, 15.4, 0.74], [ 130.0, 13.8, -10.4, 16.6, 0.95],
    [ 142.0,  9.2,  -8.8, 17.6, 1.25], [ 150.0,  4.6,  -5.8, 18.4, 1.65],
    [ 156.0,  1.5,  -1.4, 19.0, 2.20], [ 158.0,  0.4,   2.4, 19.3, 2.70],
  ];
  var HANG_ST = [
    [-150.0, 14.6, 10.6, 23.3, 0.22], [-144.0, 17.9, 10.6, 23.3, 0.24],
    [-134.0, 19.9, 10.6, 23.3, 0.26], [-116.0, 20.8, 10.6, 23.3, 0.28],
    [ -60.0, 20.9, 10.6, 23.3, 0.28], [   0.0, 20.9, 10.6, 23.3, 0.28],
    [  60.0, 20.8, 10.8, 23.3, 0.28], [  92.0, 20.2, 11.0, 23.3, 0.30],
    [ 110.0, 18.8, 11.2, 23.3, 0.34], [ 120.0, 16.6, 11.8, 22.9, 0.42],
    [ 128.0, 13.0, 12.8, 21.6, 0.60], [ 133.0,  8.5, 14.0, 20.0, 0.85],
  ];
  function toSections(tbl) {
    var s = [], i;
    for (i = 0; i < tbl.length; i++) {
      var r = tbl[i];
      s.push({ x: r[0], w: r[1], h: (r[3] - r[2]) * 0.5,
               zc: (r[3] + r[2]) * 0.5, sq: r[4] });
    }
    return s;
  }
  function tblAt(tbl, x, col) {
    var i;
    if (x <= tbl[0][0]) return tbl[0][col];
    for (i = 1; i < tbl.length; i++) {
      if (x <= tbl[i][0]) {
        var f = (x - tbl[i - 1][0]) / (tbl[i][0] - tbl[i - 1][0]);
        return tbl[i - 1][col] + (tbl[i][col] - tbl[i - 1][col]) * f;
      }
    }
    return tbl[tbl.length - 1][col];
  }
  /* half width of the deck outline at a station, on the given side */
  function deckHB(x, side) {
    var best = 0, i;
    for (i = 0; i < DECK.length - 1; i++) {
      var a = DECK[i], b = DECK[i + 1];
      if (side * a[1] <= 0 || side * b[1] <= 0) continue;
      if ((x - a[0]) * (x - b[0]) > 0) continue;
      var f = Math.abs(b[0] - a[0]) < 1e-6 ? 0 : (x - a[0]) / (b[0] - a[0]);
      var y = Math.abs(a[1] + (b[1] - a[1]) * f);
      if (y > best) best = y;
    }
    return best;
  }

  /* a walkway plank laid along each leg of a plan polyline */
  function ribbon(THREE, G, mtl, pts, z, wide, th, closed) {
    var i, n = pts.length, last = closed ? n : n - 1;
    for (i = 0; i < last; i++) {
      var a = pts[i], b = pts[(i + 1) % n];
      var dx = b[0] - a[0], dy = b[1] - a[1];
      var L = Math.sqrt(dx * dx + dy * dy);
      if (L < 0.6) continue;
      var m = new THREE.Mesh(new THREE.BoxGeometry(L, wide, th), mtl);
      m.position.set(a[0] + dx * 0.5, a[1] + dy * 0.5, z);
      m.rotation.z = Math.atan2(dy, dx);
      G.add(m);
    }
  }

  /* ============================================================ 5in mount
     Mk 42 5"/54: a rounded aluminium gun house on a low barbette with one
     long tube. Built about its own vertical axis at its own centre so the
     renderer can train it.                                                */
  function fiveInch(THREE, T, aft) {
    var g = new THREE.Group();
    var bar = new THREE.Mesh(
      new THREE.CylinderGeometry(2.35, 2.55, 1.10, 14).rotateX(PI / 2), T.skinS);
    bar.position.z = 0.55; g.add(bar);

    var house = tbox(THREE, T.skinS, 5.6, 4.5, 2.5, 0.66);
    house.position.set(-0.35, 0, 2.35); g.add(house);
    var face = new THREE.Mesh(new THREE.BoxGeometry(2.0, 3.7, 0.55), T.skinS);
    face.position.set(2.05, 0, 2.75); face.rotation.y = 0.72; g.add(face);
    var cap = new THREE.Mesh(
      new THREE.CylinderGeometry(1.55, 1.95, 0.8, 10).rotateX(PI / 2), T.skinS);
    cap.position.set(-0.6, 0, 3.9); g.add(cap);

    var sl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.70, 1.6, 10).rotateZ(-PI / 2), T.metal);
    sl.position.set(2.7, 0, 3.05); g.add(sl);
    var bl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.20, 0.27, 7.2, 10).rotateZ(-PI / 2), T.metal);
    bl.position.set(6.9, 0, 3.28); bl.rotation.y = -0.055; g.add(bl);
    var mz = new THREE.Mesh(
      new THREE.CylinderGeometry(0.245, 0.245, 0.9, 10).rotateZ(-PI / 2), T.metal);
    mz.position.set(10.3, 0, 3.47); mz.rotation.y = -0.055; g.add(mz);
    if (aft) g.rotation.z = PI;
    return g;
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var root = new THREE.Group();
    var i, j, s, m, g2;

    /* ------------------------------------------------- three tiers only */
    var T = {};
    T.skinH = new THREE.MeshStandardMaterial({
      color: 0xffffff, map: hullTex(THREE), roughness: 0.86, metalness: 0.08 });
    T.skinS = new THREE.MeshStandardMaterial({
      color: 0xffffff, map: supTex(THREE), roughness: 0.87, metalness: 0.07 });
    T.skinD = new THREE.MeshStandardMaterial({
      color: 0xffffff, map: deckTex(THREE, team), roughness: 0.95, metalness: 0.04 });
    T.skinF = new THREE.MeshStandardMaterial({
      color: 0xffffff, map: stackTex(THREE), roughness: 0.88, metalness: 0.06 });
    T.skinN = new THREE.MeshStandardMaterial({
      color: 0xffffff, map: numberTex(THREE, team), roughness: 0.86, metalness: 0.06 });
    T.skinK = new THREE.MeshStandardMaterial({
      color: 0x262b30, map: supTex(THREE), roughness: 0.92, metalness: 0.04 });
    T.metal = new THREE.MeshStandardMaterial({
      color: 0x5d666d, roughness: 0.55, metalness: 0.50 });
    T.glass = new THREE.MeshPhysicalMaterial({
      color: 0x121c25, roughness: 0.12, metalness: 0.0,
      transparent: true, opacity: 0.86 });

    /* ------------------------------------------------------------- hull */
    var HX0 = HULL_ST[0][0], HX1 = HULL_ST[HULL_ST.length - 1][0];
    var hull = loftMesh(THREE, M, toSections(HULL_ST), 30, T.skinH);
    reuv(hull.geometry, HX0, HX1);
    root.add(hull);
    var hang = loftMesh(THREE, M, toSections(HANG_ST), 24, T.skinS);
    root.add(hang);

    /* transom: the loft closes to a 13 m half width, so cap it flat */
    var trg = new THREE.BoxGeometry(1.6, 24.0, 21.4);
    trg.translate(-152.6, 0, 1.9);
    root.add(new THREE.Mesh(reuv(trg, HX0, HX1), T.skinH));
    var tr2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 28.0, 12.6), T.skinS);
    tr2.position.set(-150.4, 0, 17.0); root.add(tr2);

    /* hangar bay side openings: big enough to read as shapes, so they are
       geometry; every scuttle and door around them stays in the paint */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) {
        var ox = -70 + i * 56;
        var oy = tblAt(HANG_ST, ox, 1) - 0.35;
        var op = new THREE.Mesh(new THREE.BoxGeometry(16.4, 1.2, 6.0), T.skinK);
        op.position.set(ox, s * oy, 16.0); root.add(op);
        var lip = new THREE.Mesh(new THREE.BoxGeometry(17.8, 0.9, 0.6), T.skinS);
        lip.position.set(ox, s * (oy + 0.30), 12.8); root.add(lip);
        var lip2 = new THREE.Mesh(new THREE.BoxGeometry(17.8, 0.9, 0.6), T.skinS);
        lip2.position.set(ox, s * (oy + 0.30), 19.3); root.add(lip2);
      }
    }

    /* ------------------------------------------------------ flight deck */
    var dg = M.slab(THREE, DECK, FD_TH);
    dg.computeBoundingBox();
    var deck = new THREE.Mesh(dg, [T.skinD, T.skinS]);
    deck.position.z = FD_TOP - dg.boundingBox.max.z;
    root.add(deck);

    /* deck-edge lifts, hung outboard so each one breaks the deck line */
    for (i = 0; i < LIFTS.length; i++) {
      var lx = LIFTS[i][0], sd = LIFTS[i][1];
      var ya = sd > 0 ? 30.0 : -32.0, yb = sd > 0 ? 50.0 : -18.0;
      var lp = [[lx - 10.5, ya], [lx + 10.5, ya], [lx + 10.5, yb], [lx - 10.5, yb]];
      var lgo = M.slab(THREE, lp, 0.8);
      lgo.computeBoundingBox();
      var lm = new THREE.Mesh(lgo, [T.skinD, T.skinS]);
      lm.position.z = FD_TOP - lgo.boundingBox.max.z;
      root.add(lm);
      /* the guide rails and lift house that hang below an outboard lift */
      var lo = sd > 0 ? 48.0 : -30.0;
      root.add(box(THREE, T.skinS, 22.0, 3.0, 2.6, lx, lo, FD_BOT - 1.6));
      for (j = -1; j <= 1; j += 2)
        root.add(box(THREE, T.skinS, 1.4, 5.0, 5.0,
                     lx + j * 10.0, sd > 0 ? 44.0 : -26.0, FD_BOT - 2.8));
    }

    /* ------------------------------------- sponsons, brackets, catwalks
       The deck overhangs the hull by more than twenty metres to port. It
       has to be seen to be carried, or the whole ship reads as a plate
       floating over a boat.                                              */
    var portSpon = [[-138, 20.0], [-24, 20.0], [-30, 41.0], [-96, 43.0], [-134, 43.0]];
    var psg = M.slab(THREE, portSpon, 3.0);
    psg.computeBoundingBox();
    var psm = new THREE.Mesh(psg, [T.skinS, T.skinS]);
    psm.position.z = FD_BOT - psg.boundingBox.max.z;
    root.add(psm);

    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 11; i++) {
        var bx = -136 + i * 26;
        var hw = tblAt(HANG_ST, bx, 1);
        var dw = deckHB(bx, s);
        if (dw < hw + 1.5) continue;
        var zt = bx > 120 ? 17.0 : 12.4;
        root.add(strut(THREE, T.metal, bx, s * (hw - 0.4), zt,
                       bx, s * (dw - 0.8), FD_BOT - 0.3, 0.42, 4));
        root.add(strut(THREE, T.metal, bx + 6, s * (hw - 0.4), zt,
                       bx, s * (dw - 0.8), FD_BOT - 0.3, 0.30, 4));
      }
    }

    /* catwalk plank and its railing, fringing the whole deck edge */
    var cw = inset(DECK, 0.9);
    ribbon(THREE, root, T.skinS, cw, FD_BOT - 1.35, 2.4, 0.26, true);
    railing(THREE, root, T.metal, cw, FD_BOT - 1.20, 1.15, 7.5, true);
    /* Knuckle strake and small working platforms. Without them the hull
       side is twenty-five metres of blank wall; every photograph of the
       class has a rubbing strake and a row of sponsons along it. */
    for (s = -1; s <= 1; s += 2) {
      var kp = [];
      for (i = 0; i < HANG_ST.length; i++)
        kp.push([HANG_ST[i][0], s * (HANG_ST[i][1] + 0.30)]);
      ribbon(THREE, root, T.skinS, kp, 12.3, 0.90, 0.70, false);
      for (i = 0; i < 4; i++) {
        var px2 = -104 + i * 62;
        var pw2 = tblAt(HANG_ST, px2, 1);
        root.add(box(THREE, T.skinS, 13.0, 4.6, 0.55, px2, s * (pw2 + 2.0), 17.4));
        railing(THREE, root, T.metal,
                [[px2 - 6.4, s * (pw2 + 4.1)], [px2 + 6.4, s * (pw2 + 4.1)]],
                17.7, 1.05, 4.5, false);
        root.add(strut(THREE, T.metal, px2, s * (pw2 + 0.4), 13.4,
                       px2, s * (pw2 + 4.0), 17.3, 0.28, 4));
      }
    }

    /* a second run along the island's own deck edge */
    railing(THREE, root, T.metal,
            [[ISL_X1 + 1, ISL_YO - 1.4], [ISL_X0 - 1, ISL_YO - 1.4]],
            FD_TOP, 1.1, 6.0, false);

    /* ------------------------------------------------------------ island
       Set well aft on the starboard deck edge, uptakes faired into its
       after end, the whole thing barely a tenth of the ship's length.    */
    var ISL = new THREE.Group(); root.add(ISL);
    var icx = (ISL_X0 + ISL_X1) * 0.5, icy = (ISL_YO + ISL_YI) * 0.5;

    var lvl0 = tbox(THREE, T.skinS, ISL_X1 - ISL_X0, ISL_YI - ISL_YO, 8.8, 0.95);
    lvl0.position.set(icx, icy, FD_TOP + 4.4); ISL.add(lvl0);
    /* pennant number panels, port and starboard faces: the team flash */
    for (s = -1; s <= 1; s += 2) {
      var np = box(THREE, T.skinN, 15.0, 0.25, 6.4,
                   icx + 3.0, s > 0 ? ISL_YI + 0.12 : ISL_YO - 0.12, FD_TOP + 4.6);
      ISL.add(np);
    }
    /* gallery platform round the top of the main block */
    ISL.add(box(THREE, T.skinS, 34.0, 14.6, 0.45, icx, icy, FD_TOP + 8.9));

    var lvl1 = tbox(THREE, T.skinS, 16.0, 11.4, 4.0, 0.94);
    lvl1.position.set(-39.0, -19.9, FD_TOP + 11.1); ISL.add(lvl1);
    ISL.add(box(THREE, T.glass, 0.35, 10.2, 1.75, -31.2, -19.9, FD_TOP + 11.9));
    ISL.add(box(THREE, T.glass, 14.6, 0.35, 1.75, -39.0, -25.5, FD_TOP + 11.9));
    ISL.add(box(THREE, T.skinS, 18.0, 13.6, 0.40, -39.0, -20.0, FD_TOP + 13.2));

    var lvl2 = tbox(THREE, T.skinS, 12.0, 9.8, 3.4, 0.92);
    lvl2.position.set(-39.0, -20.1, FD_TOP + 15.1); ISL.add(lvl2);
    ISL.add(box(THREE, T.glass, 0.35, 8.6, 1.5, -33.2, -20.1, FD_TOP + 15.7));
    ISL.add(box(THREE, T.glass, 10.6, 0.35, 1.5, -39.0, -24.9, FD_TOP + 15.7));
    ISL.add(box(THREE, T.skinS, 13.6, 11.2, 0.36, -39.0, -20.1, FD_TOP + 16.9));

    var lvl3 = tbox(THREE, T.skinS, 8.0, 7.0, 1.9, 0.88);
    lvl3.position.set(-39.0, -20.0, FD_TOP + 18.0); ISL.add(lvl3);

    /* the mack: uptakes faired into the after end of the island */
    var mack = tbox(THREE, T.skinF, 14.0, 11.0, 9.6, 0.88);
    mack.position.set(-56.0, -19.7, FD_TOP + 13.6); ISL.add(mack);
    ISL.add(box(THREE, T.skinF, 11.6, 9.0, 1.1, -56.0, -19.7, FD_TOP + 18.9));
    for (i = 0; i < 3; i++) {
      var up = new THREE.Mesh(
        new THREE.CylinderGeometry(1.05, 1.15, 2.6, 8).rotateX(PI / 2), T.metal);
      up.position.set(-60.0 + i * 3.8, -19.7, FD_TOP + 20.2); ISL.add(up);
    }
    /* boat-deck / flag bag platform out on the island's outboard side */
    ISL.add(box(THREE, T.skinS, 12.0, 4.4, 0.35, -48.0, -27.6, FD_TOP + 8.8));
    railing(THREE, ISL, T.metal,
            [[-42, -25.6], [-42, -29.6], [-54, -29.6], [-54, -25.6]],
            FD_TOP + 9.0, 1.05, 4.0, false);

    /* ------------------------------------------------------- lattice mast
       A heavy 1950s truss stepped just forward of the uptakes, carrying
       the whole radar fit. Everything above the island is METAL.         */
    var MX = -47.5, MY = -19.7, MZ0 = FD_TOP + 17.9, MH = 13.5;
    var wb = 4.0, wt = 1.35, r0 = 0.36;
    function ring(f) { return { w: wb + (wt - wb) * f, z: MZ0 + MH * f }; }
    for (i = 0; i < 4; i++) {
      var sx = (i < 2 ? 1 : -1), sy = (i % 2 ? 1 : -1);
      var a0 = ring(0), b0 = ring(1);
      ISL.add(strut(THREE, T.metal, MX + sx * a0.w, MY + sy * a0.w, a0.z,
                    MX + sx * b0.w, MY + sy * b0.w, b0.z, r0, 4));
    }
    for (var k = 0; k <= 4; k++) {
      var rg = ring(k / 4);
      var c4 = [[MX + rg.w, MY + rg.w], [MX + rg.w, MY - rg.w],
                [MX - rg.w, MY - rg.w], [MX - rg.w, MY + rg.w]];
      for (j = 0; j < 4; j++) {
        var p1 = c4[j], p2 = c4[(j + 1) % 4];
        ISL.add(strut(THREE, T.metal, p1[0], p1[1], rg.z, p2[0], p2[1], rg.z, r0 * 0.62, 4));
        if (k < 4) {
          var rg2 = ring((k + 1) / 4);
          ISL.add(strut(THREE, T.metal, p1[0], p1[1], rg.z,
                        MX + (p2[0] - MX) * rg2.w / rg.w,
                        MY + (p2[1] - MY) * rg2.w / rg.w, rg2.z, r0 * 0.55, 4));
        }
      }
    }
    var topz = MZ0 + MH;
    /* topmast and signal yard */
    var pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.34, 8.5, 7).rotateX(PI / 2), T.metal);
    pole.position.set(MX, MY, topz + 4.2); ISL.add(pole);
    ISL.add(strut(THREE, T.metal, MX, MY - 7.5, topz - 1.5,
                  MX, MY + 7.5, topz - 1.5, 0.18, 4));
    for (s = -1; s <= 1; s += 2)
      ISL.add(strut(THREE, T.metal, MX, MY + s * 7.5, topz - 1.5,
                    MX, MY, topz + 3.0, 0.10, 4));
    /* whip antennas along the island deck edge, folded up */
    for (i = 0; i < 4; i++)
      ISL.add(strut(THREE, T.metal, ISL_X0 + 4 + i * 8, ISL_YO - 1.6, FD_TOP,
                    ISL_X0 + 2 + i * 8, ISL_YO - 3.4, FD_TOP + 7.5, 0.10, 4));

    /* ------------------------------------------------------------ radars */
    /* SPS-8 height finder: the orange-peel screen on the after platform  */
    ISL.add(box(THREE, T.skinS, 8.0, 8.0, 0.35, MX, MY, MZ0 + 3.4));
    var opg = new THREE.CylinderGeometry(3.1, 3.1, 5.0, 10, 1, true,
                                         -PI * 0.35, PI * 0.70).rotateX(PI / 2);
    T.metal2 = T.metal.clone(); T.metal2.side = THREE.DoubleSide;
    var opm = new THREE.Mesh(opg, T.metal2);
    opm.position.set(MX + 4.6, MY, MZ0 + 6.2); opm.rotation.z = -PI * 0.5;
    ISL.add(opm);
    ISL.add(box(THREE, T.metal, 1.2, 1.2, 2.0, MX + 4.6, MY, MZ0 + 4.2));

    /* SPS-12 air search: a parabolic dish out on the port yard */
    var dg2 = new THREE.SphereGeometry(2.9, 12, 6, 0, PI * 2, 0, PI * 0.44)
                .rotateZ(PI / 2);
    var dsh = new THREE.Mesh(dg2, T.metal2);
    dsh.position.set(MX - 0.5, MY + 4.8, MZ0 + 9.6);
    dsh.rotation.z = 0.5; ISL.add(dsh);
    ISL.add(box(THREE, T.metal, 0.9, 5.4, 0.9, MX - 0.5, MY + 2.4, MZ0 + 9.0));

    /* SPS-6 bedspring: the flat mattress at the masthead */
    var bs = new THREE.Group();
    bs.position.set(MX, MY, topz + 1.2); bs.rotation.z = -0.35; ISL.add(bs);
    bs.add(box(THREE, T.metal, 0.35, 7.6, 2.3, 0, 0, 0));
    for (i = -1; i <= 1; i += 2)
      bs.add(box(THREE, T.metal, 0.22, 7.9, 0.22, 0, 0, i * 1.2));
    bs.add(box(THREE, T.metal, 0.9, 1.1, 0.9, 0, 0, -1.9));

    /* SPN approach-control dish low on the island's after face */
    var dg3 = new THREE.SphereGeometry(1.7, 10, 5, 0, PI * 2, 0, PI * 0.44)
                .rotateZ(PI / 2);
    var d3 = new THREE.Mesh(dg3, T.metal2);
    d3.position.set(ISL_X0 - 1.6, -19.7, FD_TOP + 7.0);
    d3.rotation.z = PI; ISL.add(d3);

    /* --------------------------------------------- 5in sponsons and guns
       Four Mk 42 mounts on sponsons hung at the deck corners, tucked in
       under the flight deck edge the way the early units carried them.  */
    function sponson(xa, xb, yi, yo, ztop, side) {
      var p = [[xa, side * yi], [xb, side * yi],
               [xb - 1.5, side * (yo - 1.0)], [xa + 2.5, side * yo]];
      var sg2 = M.slab(THREE, p, 1.1);
      sg2.computeBoundingBox();
      var sm = new THREE.Mesh(sg2, [T.skinS, T.skinS]);
      sm.position.z = ztop - sg2.boundingBox.max.z;
      root.add(sm);
      railing(THREE, root, T.metal, p, ztop, 1.05, 5.0, true);
      /* the bracket that hangs it off the hull */
      root.add(strut(THREE, T.metal, (xa + xb) * 0.5, side * (yi + 0.5), ztop - 5.6,
                     (xa + xb) * 0.5, side * (yo - 1.5), ztop - 0.6, 0.42, 4));
    }
    sponson(122, 145,  7.0, 20.5, 15.2,  1);
    sponson(122, 145,  7.0, 20.5, 15.2, -1);
    sponson(-147, -123, 12.0, 25.5, 14.6,  1);
    sponson(-147, -123, 12.0, 25.5, 14.6, -1);

    /* The forward starboard mount is the one the renderer trains. It sets
       turret.rotation.y, which in a +Z-up model would roll the mount onto
       its side, so the named group is pre-rotated a quarter turn about X
       and its contents counter-rotated. The two cancel at zero yaw, and
       any yaw the renderer writes then acts about the mount's OWN
       vertical axis, at its own centre. */
    var turret = new THREE.Group();
    turret.name = "turret";
    turret.position.set(133.5, -15.4, 15.2);
    /* No local pre-rotation. render3d.js trains a named turret about Z, which
       IS the model's vertical axis, so the plain convention every other model
       in the pack uses is now the correct one. */
    turret.add(fiveInch(THREE, T, false));
    root.add(turret);

    var gp = fiveInch(THREE, T, false);
    gp.position.set(133.5, 15.4, 15.2); root.add(gp);
    var ga = fiveInch(THREE, T, true);
    ga.position.set(-135.0, -20.2, 14.6); root.add(ga);
    var ga2 = fiveInch(THREE, T, true);
    ga2.position.set(-135.0, 20.2, 14.6); root.add(ga2);

    /* gun directors on tubs at the deck edge, one forward one aft */
    for (i = 0; i < 2; i++) {
      var dx2 = i ? -118.0 : 116.0;
      var tub = new THREE.Mesh(
        new THREE.CylinderGeometry(2.6, 2.8, 2.0, 10).rotateX(PI / 2), T.skinS);
      tub.position.set(dx2, (i ? 1 : -1) * (deckHB(dx2, i ? 1 : -1) - 3.0), 19.0);
      root.add(tub);
      var dir = new THREE.Mesh(
        new THREE.SphereGeometry(1.7, 10, 6), T.skinS);
      dir.scale.set(1.25, 1.0, 0.82);
      dir.position.set(dx2, tub.position.y, 20.9); root.add(dir);
    }

    /* --------------------------------------------------------- open bow
       No hurricane bow: forward of x = 133 the deck is carried on bare
       brackets with daylight under it, and two bridle-catcher horns poke
       out past the deck edge.                                            */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) {
        var obx = 136 + i * 7;
        root.add(strut(THREE, T.metal, obx, s * (tblAt(HULL_ST, obx, 1) - 0.6),
                       tblAt(HULL_ST, obx, 3) - 0.8,
                       obx, s * (deckHB(obx, s) - 1.2), FD_BOT - 0.3, 0.36, 4));
      }
      var horn = box(THREE, T.skinS, 8.6, 1.7, 0.75, 166.4, s * 11.4, FD_TOP - 0.6);
      horn.rotation.y = 0.11; root.add(horn);
      root.add(box(THREE, T.skinS, 1.0, 1.4, 1.7, 169.6, s * 11.4, FD_TOP - 1.6));
      /* anchor and hawse on the flare below */
      var ahb = tblAt(HULL_ST, 147, 1);
      root.add(box(THREE, T.metal, 3.0, 0.55, 3.6, 147.0, s * (ahb + 0.15), 10.6));
      root.add(box(THREE, T.metal, 0.9, 0.5, 2.4, 149.6, s * (ahb + 0.15), 12.4));
    }

    /* ------------------------------------------------ screws and rudders */
    var SH = [[5.6, -8.0], [12.9, -6.3]];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) {
        var sy2 = s * SH[i][0], sz = SH[i][1];
        root.add(strut(THREE, T.metal, -116, sy2, sz + 1.6, -143, sy2, sz, 0.62, 6));
        if (i === 1)
          root.add(strut(THREE, T.metal, -134, s * (SH[i][0] - 4.5), sz + 4.2,
                         -141, sy2, sz, 0.55, 4));
        var hub = new THREE.Mesh(
          new THREE.CylinderGeometry(0.95, 0.55, 2.0, 8).rotateZ(-PI / 2), T.metal);
        hub.position.set(-144.4, sy2, sz); root.add(hub);
        for (j = 0; j < 4; j++) {
          var bld = new THREE.Mesh(new THREE.BoxGeometry(0.42, 4.4, 1.7), T.metal);
          bld.position.set(-144.2, sy2, sz);
          bld.rotation.x = j * PI / 2 + 0.4;
          bld.translateY(2.5); bld.rotation.y = 0.34; root.add(bld);
        }
      }
      var rud = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.85, 9.2), T.metal);
      rud.position.set(-148.5, s * 7.6, -5.8); root.add(rud);
    }

    /* ------------------------------------------------- deck-edge crane
       The one on the port edge forward of the island, which every deck
       photograph of a Forrestal has in it.                              */
    var CR = new THREE.Group();
    CR.position.set(-22.0, 37.0, FD_TOP); root.add(CR);
    CR.add(box(THREE, T.skinS, 5.0, 5.0, 3.0, 0, 0, 1.5));
    CR.add(box(THREE, T.skinS, 3.6, 3.6, 2.2, 0, 0, 4.1));
    for (i = -1; i <= 1; i += 2) {
      CR.add(strut(THREE, T.metal, 1.2 * i, 0.9, 4.6, 8.0 * 0.55, 5.2, 11.0, 0.20, 4));
      CR.add(strut(THREE, T.metal, 1.2 * i, -0.9, 4.6, 8.0 * 0.55, 3.6, 11.0, 0.20, 4));
    }
    CR.add(strut(THREE, T.metal, 4.4, 5.2, 11.0, 4.4, 3.6, 11.0, 0.16, 4));
    CR.add(strut(THREE, T.metal, 4.4, 4.4, 11.0, 4.4, 4.4, 6.0, 0.10, 4));

    /* ---------------------------------------------------- boats in davits */
    for (i = 0; i < 2; i++) {
      var bxc = i ? 30.0 : -6.0;
      var bhb = deckHB(bxc, 1) - 3.4;
      var bsec = [
        { x: -5.2, w: 0.35, h: 0.30, zc: 0.30, sq: 1.4 },
        { x: -3.4, w: 1.10, h: 0.72, zc: 0.20, sq: 0.75 },
        { x:  0.4, w: 1.36, h: 0.86, zc: 0.14, sq: 0.62 },
        { x:  3.8, w: 1.05, h: 0.76, zc: 0.20, sq: 0.85 },
        { x:  5.8, w: 0.28, h: 0.40, zc: 0.34, sq: 1.6 },
      ];
      var bt2 = loftMesh(THREE, M, bsec, 10, T.skinS);
      bt2.position.set(bxc, bhb, 20.6); root.add(bt2);
      for (j = -1; j <= 1; j += 2)
        root.add(strut(THREE, T.metal, bxc + j * 4.4, bhb - 1.4, 19.6,
                       bxc + j * 5.0, bhb + 1.6, 23.0, 0.20, 4));
    }

    /* the after signal / homing beacon mast on the starboard quarter */
    root.add(strut(THREE, T.metal, -146, -18.0, FD_TOP,
                   -152, -19.5, FD_TOP + 9.0, 0.22, 4));

    root.userData.heroLen = LOA;
    return root;
  }

  return { build: build };
})();

/* Registration. Overwrite unconditionally: a hero model replaces whatever
   parametric hull already claimed this id.
   len is the real overall length of the flight deck, 325 m.              */
UNIT_MODELS["nato_e50_carrier"] = {
  len: 325,
  build: function (THREE, M, C) { return HeroForrestal.build(THREE, M, C); }
};
