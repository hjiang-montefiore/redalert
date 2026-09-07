/* ====== roc_e80_destroyer.js - HERO reference model: Gearing FRAM I ======
   Style and period anchor for the e80 surface roster. Subject is a Gearing
   class destroyer after the FRAM I rebuild -- the ROC navy's Wu Chin hulls
   were these same 1945 ships, so the shape that has to read is a wartime
   destroyer wearing 1960s ASW electronics.

   What has to read at a glance, from the reference photographs
   (USS Fiske DD-842 aerial 1971, USS Orleck DD-886 broadside and quarter,
   USS Rowan DD-782 before/after pair):

     - A LONG FLUSH-DECKED WW2 HULL. No forecastle break anywhere: one
       unbroken sheer line from transom to stem, nearly flat aft and lifting
       hard over the forward third to a stem that stands almost three metres
       higher than the quarterdeck. 119 m on a 12.4 m beam is a 9.6:1 hull
       and it has to look that thin.
     - A KNUCKLE. The forward topsides flare out over a hard horizontal chine
       about a metre below the deck edge, running from roughly a third of the
       way aft up to the stem. Without it the bow reads as a rounded tube.
     - TWO TWIN 5-INCH/38 ENCLOSED MOUNTS, one on the forecastle and one on
       the fantail. Mount 52, which sat superfiring on the wartime ship, is
       gone -- that gap forward is the fastest way to tell a FRAM from an
       unmodernised Gearing.
     - THE FRAM SIGNATURE: a big plain boxy helicopter hangar standing on the
       main deck aft with a landing pad abaft it, occupying the space the
       second stack and the after torpedo mount used to have.
     - ONE RAKED PIPE STACK, grey with a black cap.
     - A HEAVY TRIPOD MAST carrying the large flat rectangular air-search
       array (SPS-37/40) low on its face and the smaller curved surface-search
       antenna above it.
     - The ASROC MK 112 EIGHT-CELL BOX LAUNCHER on the 01 deck between the
       bridge and the stack.
     - Mk 32 triple torpedo tubes amidships, a Mk 37 director with its
       rangefinder ears and dish over the bridge, the SQS-23 bow sonar dome.

   Model space: +X bow, +Y port (left), +Z up. Real metres, waterline z = 0.
   The hull is modelled down to -4.5 m and everything above floats in +Z.
   Materials are the house three tiers only: SKIN (textured painted steel),
   METAL (barrels, masts, rails, screws), GLASS (bridge windows).
   ASCII only -- a stray byte in a hex literal has broken this project before.

   Three things measured on the renderer while building this, all of which
   the parametric ships in warship3d.js will want when they are tuned:

   1. M.loft winds its quads inward, so a single-sided material shows you the
      inside of the far wall. Everything lofted here goes through body(),
      which flips the winding and recomputes normals. warship3d.js already
      does this; air3d hides it with DoubleSide.

   2. M.loft's own UV is cylindrical -- v runs AROUND the section. On a hull
      station squared off to sq 0.05 that crushes the entire side of the ship
      into about half a per cent of the texture height, so a painted boot
      topping, plate strakes and a pennant number are all physically
      impossible to place. Every lofted hull body here has its UV REWRITTEN
      from world space afterwards: u = length fraction, v = height above the
      keel datum. A horizontal band in the canvas is then a horizontal band
      in metres, which is what a waterline is.

   3. sq cannot make a truly square section: the width always collapses to
      zero at the very top of the ring, so a hull lofted at the "0.45-0.60
      midsection" figure loses roughly a metre of half-beam at the deck edge
      and comes out with a rounded-down gunwale. This ship is therefore two
      lofts -- an UNDERBODY at sq 0.52 (the real hull form, rounded bilge)
      and a slightly wider TOPSIDES shell at sq 0.05 (slab sides, flat deck)
      dropped over it from z = -1.6 up. The deck plate is laid at the height
      the topsides shell actually reaches, not at a guessed number.         */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroGearingFram = (function () {
  "use strict";

  var PI = Math.PI;
  var TRI = 0;   /* running triangle tally, reported to the console */

  /* ==================================================== principal numbers */
  var LOA   = 119.0;   /* Gearing class, 390 ft 6 in                        */
  var BEAM  = 12.40;   /* 40 ft 10 in                                       */
  var XB    =  59.50;  /* stem                                              */
  var XS    = -59.50;  /* transom                                           */

  var Z01   = 8.15;    /* forward 01 deck (deckhouse roof) - one flat level */
  var Z01A  = 7.75;    /* amidships 01 deck, one step down                  */
  var ZBR   = 11.15;   /* pilothouse roof                                   */
  var ZOB   = 12.85;   /* open bridge / director platform                   */

  var X_M51 =  36.5;   /* forward 5 in mount, the animated "turret"         */
  var X_M53 = -46.0;   /* after 5 in mount                                  */
  var X_ASR =  15.2;   /* ASROC box launcher                                */
  var X_MST =   9.0;   /* tripod mast                                       */
  var X_FUN =  -3.2;   /* the one remaining stack                           */
  var X_MACK= -13.6;   /* after lattice, ECM drums and vestigial uptakes    */
  var HG_F  = -17.2;   /* hangar, forward face                              */
  var HG_A  = -30.4;   /* hangar, after face                                */
  var ZHG   =  8.75;   /* hangar roof                                       */
  var X_PAD = -36.2;   /* centre of the DASH landing circle                 */

  var ZTEXB = -5.0;    /* hull texture datum: canvas bottom row is this z   */
  var ZTEXT =  9.4;    /* ... and the top row is this z                     */

  /* --------------------------------------------------------- station table
     Twenty stations, stern to stem. w is HALF beam at the deck edge, dz the
     sheer height above the waterline, kz the keel. sqU shapes the underbody
     (rounded bilge, pinching hard into the forefoot); sqT shapes the
     topsides shell (slab-sided amidships, pinched to a fine entry).      */
  var ST_X  = [-59.5, -56.0, -52.0, -47.0, -41.0, -34.0, -26.0, -17.0, -8.0,
                 1.0,  10.0,  19.0,  27.0,  34.0,  41.0,  47.0,  52.0, 56.0,
                58.4,  59.5];
  var ST_W  = [ 4.05,  4.55,  5.10,  5.55,  5.85,  6.05,  6.16,  6.20, 6.20,
                6.16,  6.08,  5.85,  5.55,  5.15,  4.55,  3.75,  2.70, 1.55,
                0.62,  0.16];
  var ST_DZ = [ 3.30,  3.36,  3.44,  3.52,  3.62,  3.74,  3.88,  4.03, 4.22,
                4.46,  4.74,  5.10,  5.52,  5.98,  6.58,  7.22,  7.85, 8.35,
                8.60,  8.72];
  var ST_KZ = [-1.05, -2.35, -3.30, -3.95, -4.25, -4.40, -4.45, -4.46, -4.46,
               -4.44, -4.40, -4.32, -4.18, -3.95, -3.55, -2.95, -2.05, -0.85,
                0.95,  2.60];
  var ST_SU = [ 0.34,  0.38,  0.42,  0.46,  0.50,  0.52,  0.52,  0.52,  0.52,
                0.52,  0.52,  0.54,  0.58,  0.66,  0.80,  1.05,  1.40,  1.85,
                2.30,  2.60];
  var ST_ST = [ 0.05,  0.05,  0.05,  0.05,  0.05,  0.05,  0.05,  0.05,  0.05,
                0.05,  0.05,  0.05,  0.06,  0.09,  0.16,  0.36,  0.75,  1.35,
                2.00,  2.50];

  var ZTOP = -1.60;    /* constant lower edge of the topsides shell         */
  var TFAT =  0.10;    /* topsides shell sits this far outboard of the form */

  /* -------------------------------------------------------------- helpers */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + ((c >>> 0) & 0xffffff).toString(16)).slice(-6); }

  /* linear pick off the station table */
  function lerpTab(x, tab) {
    if (x <= ST_X[0]) return tab[0];
    var n = ST_X.length, i;
    if (x >= ST_X[n - 1]) return tab[n - 1];
    for (i = 1; i < n; i++) {
      if (x <= ST_X[i]) {
        var u = (x - ST_X[i - 1]) / (ST_X[i] - ST_X[i - 1]);
        return tab[i - 1] + (tab[i] - tab[i - 1]) * u;
      }
    }
    return tab[n - 1];
  }
  function deckZ(x) { return lerpTab(x, ST_DZ); }
  function halfB(x) { return lerpTab(x, ST_W); }
  function sqT(x)   { return lerpTab(x, ST_ST); }

  /* Lower edge of the topsides shell. Constant amidships, but forward of
     the forefoot the keel lifts clear of the water, and a shell that still
     reached down to -1.6 would be so much taller than the underbody inside
     it that the two sections stop nesting -- the dark underbody pokes out
     through the grey right at the stem, which is exactly what the first
     render did. Tie the shell's bottom to the keel up there. */
  function zBotT(x) {
    var k = lerpTab(x, ST_KZ) + 0.30;
    return k > ZTOP ? k : ZTOP;
  }
  /* topsides section parameters at an arbitrary x */
  function tsec(x) {
    var dz = deckZ(x), zb = zBotT(x);
    return { x: x, w: halfB(x) + TFAT, h: (dz - zb) * 0.5,
             zc: (dz + zb) * 0.5, sq: sqT(x), dz: dz };
  }
  /* height of the shell surface at a given fraction of its own half beam */
  function topZ(s, ky) {
    var c = Math.pow(clamp(Math.abs(ky), 0, 1), 1 / s.sq);
    var t = Math.sqrt(Math.max(0, 1 - c * c));
    return s.zc + s.h * Math.pow(t, s.sq);
  }
  /* the inverse: which fraction of the half beam lies at a given height.
     This is what puts the deck plate and the deck-edge railing ON the hull
     instead of hovering over it or poking out through the side.          */
  function edgeK(s, z) {
    var zn = clamp((z - s.zc) / s.h, -0.9999, 0.9999);
    var sn = Math.pow(Math.abs(zn), 1 / s.sq);
    var cs = Math.sqrt(Math.max(0, 1 - sn * sn));
    return Math.pow(cs, s.sq);
  }
  /* the deck edge point (half beam and height) at station x */
  function deckEdge(x) {
    var s = tsec(x), z = s.dz - 0.06;
    return { y: s.w * edgeK(s, z), z: z };
  }

  /* ------------------------------------------------------------ primitives */
  function tally(g) {
    var idx = g.getIndex();
    TRI += idx ? idx.count / 3 : g.getAttribute("position").count / 3;
    return g;
  }
  function mesh(THREE, parent, g, m) {
    tally(g);
    var o = new THREE.Mesh(g, m);
    if (parent) parent.add(o);
    return o;
  }
  function box(THREE, parent, sx, sy, sz, m, x, y, z) {
    var o = mesh(THREE, parent, new THREE.BoxGeometry(sx, sy, sz), m);
    o.position.set(x || 0, y || 0, z || 0);
    return o;
  }
  /* cylinder standing on +Z */
  function cylZ(THREE, parent, rt, rb, h, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1);
    g.rotateX(PI / 2);
    var o = mesh(THREE, parent, g, m);
    o.position.set(x || 0, y || 0, z || 0);
    return o;
  }
  /* cylinder lying along +X */
  function cylX(THREE, parent, rt, rb, h, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1);
    g.rotateZ(PI / 2);
    var o = mesh(THREE, parent, g, m);
    o.position.set(x || 0, y || 0, z || 0);
    return o;
  }
  /* a rod stretched between two points: truss legs, davits, braces */
  function strut(THREE, parent, m, a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var g = new THREE.CylinderGeometry(r, r, L, seg || 4, 1);
    var o = mesh(THREE, parent, g, m);
    o.position.set((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(dx, dy, dz).normalize());
    return o;
  }
  /* plan outline extruded upward: deckhouses, hangar, bulwarks */
  function house(THREE, M, parent, pts, hgt, m, z) {
    var g = M.slab(THREE, pts, hgt);
    var o = mesh(THREE, parent, g, m);
    o.position.z = z;
    return o;
  }
  /* side profile extruded athwartships: gun houses, boat hulls */
  function profile(THREE, M, parent, pts, wid, m, x, y, z) {
    var g = M.slab(THREE, pts, wid, "xz");
    g.translate(0, wid * 0.5, 0);
    var o = mesh(THREE, parent, g, m);
    o.position.set(x || 0, y || 0, z || 0);
    return o;
  }

  /* lofted body, winding flipped, optionally re-UVd from world space */
  function body(THREE, M, parent, sections, segs, m, worldUV) {
    var g = M.loft(THREE, sections, segs);
    var idx = g.getIndex();
    if (idx) {
      var a = idx.array, i, t;
      for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      idx.needsUpdate = true;
    }
    if (worldUV) {
      var p = g.getAttribute("position"), uv = g.getAttribute("uv"), j;
      for (j = 0; j < p.count; j++) {
        uv.setXY(j, (p.getX(j) - XS) / LOA,
                    (p.getZ(j) - ZTEXB) / (ZTEXT - ZTEXB));
      }
      uv.needsUpdate = true;
    }
    g.computeVertexNormals();
    return mesh(THREE, parent, g, m);
  }

  /* world-space UV for hand-built ribbon geometry, matching the hull skin */
  function worldUV(THREE, g) {
    var p = g.getAttribute("position"), uv = [], j;
    for (j = 0; j < p.count; j++) {
      uv.push((p.getX(j) - XS) / LOA, (p.getZ(j) - ZTEXB) / (ZTEXT - ZTEXB));
    }
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    return g;
  }

  /* ------------------------------------------------------------- railings
     A warship without railings does not read as a warship, but a stanchion
     modelled as a cylinder costs eight triangles and a destroyer needs a
     hundred and sixty of them. The whole run for one deck edge is therefore
     ONE geometry of flat quads lying in the plane of the rail: three wires
     and a stanchion every few metres, drawn DoubleSide. Two triangles each,
     and from any bearing but straight down it reads exactly right.       */
  function railGeo(THREE, pts, hgt, nwire) {
    var pos = [], idx = [], k = 0, i, w;
    function quad(a, b, c, d) {
      pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], d[0], d[1], d[2]);
      idx.push(k, k + 1, k + 2, k, k + 2, k + 3); k += 4;
    }
    for (w = 0; w < nwire; w++) {
      var hz = hgt * (w + 1) / nwire, t = 0.035;
      for (i = 0; i < pts.length - 1; i++) {
        var a = pts[i], b = pts[i + 1];
        quad([a[0], a[1], a[2] + hz - t], [b[0], b[1], b[2] + hz - t],
             [b[0], b[1], b[2] + hz + t], [a[0], a[1], a[2] + hz + t]);
      }
    }
    for (i = 0; i < pts.length; i++) {
      var p = pts[i];
      var q = pts[i < pts.length - 1 ? i + 1 : i - 1];
      var dx = q[0] - p[0], dy = q[1] - p[1];
      var L = Math.max(1e-4, Math.sqrt(dx * dx + dy * dy));
      var ex = dx / L * 0.045, ey = dy / L * 0.045;
      quad([p[0] - ex, p[1] - ey, p[2]], [p[0] + ex, p[1] + ey, p[2]],
           [p[0] + ex, p[1] + ey, p[2] + hgt], [p[0] - ex, p[1] - ey, p[2] + hgt]);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function rail(THREE, parent, pts, hgt, nwire, m) {
    if (pts.length < 2) return null;
    return mesh(THREE, parent, railGeo(THREE, pts, hgt, nwire), m);
  }
  /* deck-edge rail path down one side, following the real sheer */
  function edgePath(x0, x1, side, inset, step) {
    var pts = [], x, d = x1 > x0 ? 1 : -1;
    for (x = x0; d > 0 ? x <= x1 + 1e-6 : x >= x1 - 1e-6; x += d * step) {
      var e = deckEdge(x);
      pts.push([x, side * Math.max(0.05, e.y - inset), e.z + 0.06]);
    }
    return pts;
  }
  /* rectangular rail run round a deckhouse roof */
  function boxPath(xf, xa, hw, z, step) {
    var pts = [], x, y;
    for (x = xf; x >= xa; x -= step) pts.push([x, hw, z]);
    for (y = hw; y >= -hw; y -= step) pts.push([xa, y, z]);
    for (x = xa; x <= xf; x += step) pts.push([x, -hw, z]);
    return pts;
  }

  /* ============================================================== textures
     Everything painted is generated here. The hull skin is the one that
     matters: on this ship its v axis is HEIGHT IN METRES (see the header
     note), so the boot topping is a real horizontal band, the plate strakes
     are real horizontal strakes, and the rust really does run downhill. */
  var TEX = {};

  function canv(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  /* canvas row for a height in metres (CanvasTexture flips v, so row 0 is
     the TOP of the range) */
  function rowOf(z, H) { return (1 - (z - ZTEXB) / (ZTEXT - ZTEXB)) * H; }
  /* canvas column for a station in metres */
  function colOf(x, W) { return (x - XS) / LOA * W; }

  function hullTex(THREE, team) {
    var key = "hull_" + team;
    if (TEX[key]) return TEX[key];
    var W = 2048, H = 512, cv = canv(W, H), g = cv.getContext("2d");
    var R = rng(4482), i, x, y, z;

    var Y_DECK = rowOf(8.6, H);          /* above any real deck edge        */
    var Y_WL   = rowOf(0.0, H);          /* the waterline                   */
    var Y_BOOT = rowOf(1.05, H);         /* top of the boot topping         */
    var Y_AF   = rowOf(-0.65, H);        /* top of the anti-fouling         */
    var Y_KEEL = rowOf(-4.6, H);

    /* --- base coats. Haze grey off the PAINT table in warship3d.js, pulled
       down a little because this renderer tone-maps and the table value came
       back off the screen almost white. */
    g.fillStyle = "#6d757d"; g.fillRect(0, 0, W, Y_BOOT);
    g.fillStyle = "#141416"; g.fillRect(0, Y_BOOT, W, Y_AF - Y_BOOT);
    g.fillStyle = "#2b211d"; g.fillRect(0, Y_AF, W, H - Y_AF);

    /* --- the sheer is not flat, and neither is the paint. The boot topping
       is horizontal but the DECK EDGE climbs forward, so the grey has to run
       higher forward or the bow reads as unpainted. Paint the strip above
       the real deck line in the deck tone so any sliver of shell that shows
       above the plate blends in. */
    g.fillStyle = "#4a4f54";
    for (i = 0; i < 256; i++) {
      x = XS + LOA * (i / 255);
      var dz = deckZ(x);
      g.fillRect(colOf(x, W), 0, W / 255 + 2, rowOf(dz, H));
    }

    /* --- plate patchwork: adjacent strakes never weather the same */
    for (i = 0; i < 150; i++) {
      g.globalAlpha = 0.035 + R() * 0.055;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, Y_DECK + R() * (Y_BOOT - Y_DECK),
                 60 + R() * 260, 8 + R() * 26);
    }
    g.globalAlpha = 1;

    /* --- HORIZONTAL STRAKES. A riveted 1945 hull is built of six-foot
       plates and the strake laps are the single most legible thing on a
       ship's side. Draw the lap lines at real heights in metres. */
    var strakes = [7.4, 6.0, 4.6, 3.3, 2.1, 1.05, -0.1, -1.4, -2.7];
    g.lineWidth = 1.6;
    for (i = 0; i < strakes.length; i++) {
      y = rowOf(strakes[i], H);
      g.strokeStyle = "rgba(0,0,0,0.34)";
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.10)";
      g.beginPath(); g.moveTo(0, y + 1.6); g.lineTo(W, y + 1.6); g.stroke();
    }
    /* --- VERTICAL BUTTS, one every frame bay, staggered strake to strake */
    g.lineWidth = 1.2; g.strokeStyle = "rgba(0,0,0,0.26)";
    for (i = 0; i < strakes.length - 1; i++) {
      var yA = rowOf(strakes[i], H), yB = rowOf(strakes[i + 1], H);
      var off = (i % 2) * 0.5;
      for (var b = 0; b < 46; b++) {
        x = (b + off) / 46 * W;
        g.beginPath(); g.moveTo(x, yA); g.lineTo(x, yB); g.stroke();
      }
    }

    /* --- freeing ports and scuppers, with rust weeping DOWN from each */
    var ports = [];
    for (i = 0; i < 26; i++) ports.push(0.10 + 0.78 * (i / 25) + (R() - 0.5) * 0.012);
    for (i = 0; i < ports.length; i++) {
      var px = ports[i] * W, pz = 2.6 + R() * 1.4;
      var py = rowOf(pz, H);
      g.fillStyle = "rgba(18,20,22,0.75)";
      g.fillRect(px, py, 9, 5);
      var grad = g.createLinearGradient(0, py, 0, py + 90);
      grad.addColorStop(0, "rgba(96,52,26,0.50)");
      grad.addColorStop(1, "rgba(96,52,26,0.00)");
      g.fillStyle = grad;
      g.fillRect(px + 1, py + 4, 6 + R() * 4, 60 + R() * 50);
    }
    /* --- the anchors bleed the worst streaks on any ship */
    for (i = 0; i < 2; i++) {
      var ax = colOf(52.4, W) + i * 7;
      var ay = rowOf(5.6, H);
      var ag = g.createLinearGradient(0, ay, 0, ay + 150);
      ag.addColorStop(0, "rgba(112,58,26,0.62)");
      ag.addColorStop(1, "rgba(112,58,26,0.00)");
      g.fillStyle = ag; g.fillRect(ax, ay, 16, 150);
    }
    /* hawse pipe mouths */
    g.fillStyle = "rgba(14,14,16,0.85)";
    g.beginPath(); g.ellipse(colOf(53.2, W), rowOf(6.0, H), 13, 8, 0, 0, PI * 2); g.fill();

    /* --- EXHAUST STAINING aft of the funnel. The stack is at x = -3.2, and
       everything downwind of it on this hull is grubby. */
    var ex0 = colOf(X_FUN - 1.0, W), ex1 = colOf(X_FUN - 26.0, W);
    var eg = g.createLinearGradient(ex0, 0, ex1, 0);
    eg.addColorStop(0, "rgba(28,26,26,0.30)");
    eg.addColorStop(1, "rgba(28,26,26,0.00)");
    g.fillStyle = eg;
    g.fillRect(ex1, rowOf(8.4, H), ex0 - ex1, rowOf(3.4, H) - rowOf(8.4, H));

    /* --- salt and wash along the waterline, heaviest at the bow wave */
    var wg = g.createLinearGradient(0, Y_BOOT - 30, 0, Y_BOOT + 6);
    wg.addColorStop(0, "rgba(226,230,234,0.00)");
    wg.addColorStop(1, "rgba(214,219,224,0.16)");
    g.fillStyle = wg; g.fillRect(0, Y_BOOT - 30, W, 36);

    /* --- draught marks on the stem and by the transom */
    g.fillStyle = "#e8ecef"; g.font = "bold 15px sans-serif";
    for (i = 0; i < 7; i++) {
      z = -3.4 + i * 1.0;
      g.fillText("" + (10 + i * 2), colOf(55.6, W), rowOf(z, H));
      g.fillText("" + (10 + i * 2), colOf(-55.6, W), rowOf(z, H));
    }

    /* --- The pennant number itself CANNOT live in this texture. u runs from
       stern to stem for BOTH sides of the ship, so whichever side reads the
       right way round, the other reads it in a mirror -- the first render
       had "912" backwards in both views. The digits are separate decal
       ribbons (buildPennant); what stays here is the team stripe under
       them, which is symmetric and so survives the mirroring. */
    var tc = hx(team === undefined ? 0xd9dde1 : team);
    g.fillStyle = tc; g.globalAlpha = 0.92;
    g.fillRect(colOf(42.6, W), rowOf(2.2, H), colOf(53.0, W) - colOf(42.6, W), 7);
    g.globalAlpha = 1;

    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    if (THREE.SRGBColorSpace !== undefined) t.colorSpace = THREE.SRGBColorSpace;
    TEX[key] = t; return t;
  }

  /* underbody: dark anti-fouling with a bit of boot topping at its very top,
     cylindrically UVd because nothing down there needs placing */
  function underTex(THREE) {
    if (TEX.under) return TEX.under;
    var W = 512, H = 128, cv = canv(W, H), g = cv.getContext("2d"), R = rng(9311), i;
    g.fillStyle = "#382a25"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 60; i++) {
      g.globalAlpha = 0.05 + R() * 0.09;
      g.fillStyle = R() < 0.5 ? "#6a5348" : "#1c1512";
      g.fillRect(R() * W, R() * H, 30 + R() * 120, 8 + R() * 30);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.2;
    for (i = 1; i < 40; i++) { g.beginPath(); g.moveTo(i * W / 40, 0); g.lineTo(i * W / 40, H); g.stroke(); }
    for (i = 1; i < 9; i++) { g.beginPath(); g.moveTo(0, i * H / 9); g.lineTo(W, i * H / 9); g.stroke(); }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    if (THREE.SRGBColorSpace !== undefined) t.colorSpace = THREE.SRGBColorSpace;
    TEX.under = t; return t;
  }

  /* main deck: non-skid grit, deck seams, and the tie-down pattern */
  function deckTex(THREE) {
    if (TEX.deckt) return TEX.deckt;
    var W = 512, H = 512, cv = canv(W, H), g = cv.getContext("2d"), R = rng(2207), i;
    g.fillStyle = "#4c5157"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 46; i++) {
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 150, 30 + R() * 110);
    }
    g.globalAlpha = 0.32; g.strokeStyle = "#101214"; g.lineWidth = 2.4;
    for (i = 1; i < 7; i++) {
      g.beginPath(); g.moveTo(0, i * H / 7); g.lineTo(W, i * H / 7); g.stroke();
      g.beginPath(); g.moveTo(i * W / 7, 0); g.lineTo(i * W / 7, H); g.stroke();
    }
    g.globalAlpha = 0.30; g.fillStyle = "#0d0f10";
    for (i = 0; i < 5200; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(26, 3);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    if (THREE.SRGBColorSpace !== undefined) t.colorSpace = THREE.SRGBColorSpace;
    TEX.deckt = t; return t;
  }

  /* superstructure plating: lighter than the hull, with door and scuttle
     shadows and a lot of vertical stiffeners */
  function supTex(THREE) {
    if (TEX.sup) return TEX.sup;
    var W = 1024, H = 512, cv = canv(W, H), g = cv.getContext("2d"), R = rng(7717), i;
    g.fillStyle = "#7b838a"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 170, 20 + R() * 90);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.3;
    for (i = 1; i < 34; i++) { g.beginPath(); g.moveTo(i * W / 34, 0); g.lineTo(i * W / 34, H); g.stroke(); }
    for (i = 1; i < 10; i++) { g.beginPath(); g.moveTo(0, i * H / 10); g.lineTo(W, i * H / 10); g.stroke(); }
    /* watertight doors and scuttles */
    for (i = 0; i < 26; i++) {
      var x = R() * W, y = 0.42 * H + R() * 0.46 * H;
      g.fillStyle = "rgba(30,34,38,0.42)"; g.fillRect(x, y, 16, 30);
      g.fillStyle = "rgba(210,216,220,0.16)"; g.fillRect(x + 1, y + 1, 14, 4);
    }
    for (i = 0; i < 34; i++) {
      g.fillStyle = "rgba(24,28,32,0.40)";
      g.beginPath(); g.arc(R() * W, 0.35 * H + R() * 0.4 * H, 4.2, 0, PI * 2); g.fill();
    }
    /* soot down the after faces */
    g.globalAlpha = 0.13; g.fillStyle = "#1b1a19";
    for (i = 0; i < 40; i++) g.fillRect(R() * W, R() * H * 0.5, 3 + R() * 8, 30 + R() * 90);
    g.globalAlpha = 1;
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 2);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    if (THREE.SRGBColorSpace !== undefined) t.colorSpace = THREE.SRGBColorSpace;
    TEX.sup = t; return t;
  }

  /* The bow number. It gets its own small transparent canvas so it can be
     applied as a DECAL with per-side UVs -- see buildPennant. */
  function numTex(THREE, team) {
    var key = "num_" + team;
    if (TEX[key]) return TEX[key];
    var W = 512, H = 144, cv = canv(W, H), g = cv.getContext("2d");
    g.clearRect(0, 0, W, H);
    g.font = "bold 128px sans-serif";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.lineWidth = 9; g.lineJoin = "round";
    g.strokeStyle = "rgba(16,18,20,0.90)";
    g.strokeText("912", W * 0.5, H * 0.52);
    g.fillStyle = hx(team === undefined ? 0xe6eaee : team);
    g.fillText("912", W * 0.5, H * 0.52);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    if (THREE.SRGBColorSpace !== undefined) t.colorSpace = THREE.SRGBColorSpace;
    TEX[key] = t; return t;
  }

  /* canvas: boat covers, ready-service covers, radome cloth */
  function canvasTex(THREE) {
    if (TEX.cvs) return TEX.cvs;
    var W = 256, H = 256, cv = canv(W, H), g = cv.getContext("2d"), R = rng(1451), i;
    g.fillStyle = "#8d9196"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.14; g.strokeStyle = "#2c3034"; g.lineWidth = 1;
    for (i = 0; i < 64; i++) {
      g.beginPath(); g.moveTo(0, i * 4); g.lineTo(W, i * 4); g.stroke();
      g.beginPath(); g.moveTo(i * 4, 0); g.lineTo(i * 4, H); g.stroke();
    }
    g.globalAlpha = 0.10; g.fillStyle = "#000000";
    for (i = 0; i < 200; i++) g.fillRect(R() * W, R() * H, 5, 5);
    g.globalAlpha = 1;
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 3);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    if (THREE.SRGBColorSpace !== undefined) t.colorSpace = THREE.SRGBColorSpace;
    TEX.cvs = t; return t;
  }

  /* ============================================================= materials
     Three tiers, no more. SKIN carries a generated map and is rough and
     nearly non-metallic; METAL is bare and mid-rough; GLASS is the one
     physical material on the ship.                                       */
  function makeMats(THREE, C) {
    var team = (C && C.team !== undefined) ? C.team : 0xd0d4d8;
    function skin(col, map, rgh) {
      return new THREE.MeshStandardMaterial({
        color: col, map: map || null,
        roughness: rgh === undefined ? 0.87 : rgh, metalness: 0.06
      });
    }
    function metal(col, rgh, mtl) {
      return new THREE.MeshStandardMaterial({
        color: col, roughness: rgh === undefined ? 0.55 : rgh,
        metalness: mtl === undefined ? 0.50 : mtl
      });
    }
    return {
      team:  team,
      hull:  skin(0xffffff, hullTex(THREE, team), 0.86),
      hullP: skin(0x6d757d, null, 0.86),
      under: skin(0x8f7d72, underTex(THREE), 0.90),
      deck:  skin(0xb9c0c6, deckTex(THREE), 0.95),
      sup:   skin(0xd9dee2, supTex(THREE), 0.88),
      supD:  skin(0xb9bfc4, supTex(THREE), 0.88),
      cvs:   skin(0xcfd3d6, canvasTex(THREE), 0.93),
      boot:  skin(0x141518, null, 0.72),
      black: skin(0x1a1b1d, null, 0.80),
      mark:  skin(0xe4e8ea, null, 0.90),
      tteam: skin(team, null, 0.84),
      met:   metal(0x8b9196, 0.52, 0.52),
      metD:  metal(0x5c6266, 0.58, 0.45),
      gun:   metal(0x6f767b, 0.48, 0.58),
      rail:  new THREE.MeshStandardMaterial({
               color: 0x9aa1a6, roughness: 0.56, metalness: 0.46,
               side: THREE.DoubleSide }),
      net:   new THREE.MeshStandardMaterial({
               color: 0x3b4045, roughness: 0.62, metalness: 0.40,
               side: THREE.DoubleSide, transparent: true, opacity: 0.72 }),
      num:   new THREE.MeshStandardMaterial({
               map: numTex(THREE, team), transparent: true, alphaTest: 0.42,
               roughness: 0.86, metalness: 0.05, side: THREE.DoubleSide }),
      glass: new THREE.MeshPhysicalMaterial({
               color: 0x18262e, roughness: 0.10, metalness: 0.10,
               transparent: true, opacity: 0.84,
               clearcoat: 0.9, clearcoatRoughness: 0.06 })
    };
  }

  /* ================================================================= hull */
  function buildHull(THREE, M, G, T) {
    var i, A = [], B = [], s;

    for (i = 0; i < ST_X.length; i++) {
      var dz = ST_DZ[i], kz = ST_KZ[i], w = ST_W[i];
      /* underbody: real hull form, keel to deck, rounded bilge */
      A.push({ x: ST_X[i], w: w, h: (dz - kz) * 0.5, zc: (dz + kz) * 0.5, sq: ST_SU[i] });
      /* topsides shell: slab sides and flat deck, dropped over the top */
      var zb = zBotT(ST_X[i]);
      B.push({ x: ST_X[i], w: w + TFAT, h: (dz - zb) * 0.5,
               zc: (dz + zb) * 0.5, sq: ST_ST[i] });
    }
    body(THREE, M, G, A, 20, T.under, false);
    body(THREE, M, G, B, 24, T.hull, true);

    /* ---- transom. Gearings have a small flat transom over a cut-up run. */
    var e0 = deckEdge(XS);
    profile(THREE, M, G, [
      [-0.55, -1.00], [0.30, -1.05], [0.30, e0.z], [-0.55, e0.z - 0.02]
    ], e0.y * 1.86, T.hullP, XS + 0.55, 0, 0);

    /* ---- THE KNUCKLE. A hard horizontal chine a metre under the deck edge
       from a third of the way aft to the stem, flaring the forward topsides
       out over it. This is the difference between a Gearing bow and a pipe. */
    var kn = [], KX0 = 24.0, KX1 = 58.6;
    for (i = 0; i <= 20; i++) {
      var x = KX0 + (KX1 - KX0) * (i / 20);
      var se = tsec(x);
      var ztop = deckZ(x) - 0.30;
      var zmid = deckZ(x) - 1.05;
      var zlow = deckZ(x) - 1.95;
      var f = clamp((x - KX0) / 22.0, 0, 1);
      var out = 0.05 + 0.62 * f * f;
      kn.push({
        yt: se.w * edgeK(se, ztop) + 0.02, zt: ztop,
        ym: se.w * edgeK(se, zmid) + out, zm: zmid,
        yb: se.w * edgeK(se, zlow) + 0.02, zb: zlow, x: x
      });
    }
    var sgn;
    for (sgn = -1; sgn <= 1; sgn += 2) {
      var pos = [], idx = [], k = 0;
      for (i = 0; i < kn.length; i++) {
        var a = kn[i];
        pos.push(a.x, sgn * a.yt, a.zt, a.x, sgn * a.ym, a.zm, a.x, sgn * a.yb, a.zb);
      }
      for (i = 0; i < kn.length - 1; i++) {
        k = i * 3;
        idx.push(k, k + 3, k + 1, k + 1, k + 3, k + 4);
        idx.push(k + 1, k + 4, k + 2, k + 2, k + 4, k + 5);
      }
      var kg = new THREE.BufferGeometry();
      kg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      kg.setIndex(idx); worldUV(THREE, kg); kg.computeVertexNormals();
      mesh(THREE, G, kg, T.hull);
    }

    /* ---- main deck plate, cambered, laid where the shell actually is */
    var kys = [-1, -0.80, -0.50, 0, 0.50, 0.80, 1], dpos = [], duv = [], didx = [];
    var nrow = kys.length;
    for (i = 0; i < ST_X.length; i++) {
      s = tsec(ST_X[i]);
      var kE = edgeK(s, s.dz - 0.06);
      for (var j = 0; j < nrow; j++) {
        var ky = kys[j] * kE;
        dpos.push(s.x, s.w * ky, topZ(s, ky) + 0.03);
        duv.push((s.x - XS) / LOA, (kys[j] + 1) * 0.5);
      }
    }
    for (i = 0; i < ST_X.length - 1; i++)
      for (j = 0; j < nrow - 1; j++) {
        var a2 = i * nrow + j, b2 = a2 + 1, c2 = a2 + nrow, d2 = c2 + 1;
        didx.push(a2, c2, b2, b2, c2, d2);
      }
    var dg = new THREE.BufferGeometry();
    dg.setAttribute("position", new THREE.Float32BufferAttribute(dpos, 3));
    dg.setAttribute("uv", new THREE.Float32BufferAttribute(duv, 2));
    dg.setIndex(didx); dg.computeVertexNormals();
    mesh(THREE, G, dg, T.deck);

    /* ---- bilge keels: thin fins low on the turn of the bilge */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      var bp = [], bidx = [], bk = 0;
      for (i = 0; i <= 8; i++) {
        var bx = -30 + i * 7.5;
        var bw = halfB(bx) * 0.86;
        bp.push(bx, sgn * bw, -3.55, bx, sgn * (bw + 0.55), -3.30);
      }
      for (i = 0; i < 8; i++) {
        bk = i * 2;
        bidx.push(bk, bk + 2, bk + 1, bk + 1, bk + 2, bk + 3);
      }
      var bg = new THREE.BufferGeometry();
      bg.setAttribute("position", new THREE.Float32BufferAttribute(bp, 3));
      bg.setIndex(bidx); worldUV(THREE, bg); bg.computeVertexNormals();
      mesh(THREE, G, bg, T.hull);
    }

    /* ---- SQS-23 bow sonar dome: a FRAM fitting, and it changes the
       underwater silhouette completely */
    var dome = new THREE.SphereGeometry(1.0, 14, 9);
    dome.scale(3.6, 1.95, 1.55);
    var dm = mesh(THREE, G, dome, T.under);
    dm.position.set(38.5, 0, -4.55);

    /* ---- shafts, struts, screws, rudders */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      cylX(THREE, G, 0.30, 0.30, 13.0, 8, T.metD, -41.5, sgn * 2.55, -3.20);
      strut(THREE, G, T.metD, [-45.0, sgn * 2.55, -3.20], [-45.6, sgn * 4.30, -1.90], 0.22, 5);
      strut(THREE, G, T.metD, [-45.0, sgn * 2.55, -3.20], [-44.2, sgn * 1.35, -1.70], 0.22, 5);
      /* screw */
      var sc = new THREE.Group();
      cylX(THREE, sc, 0.44, 0.30, 1.05, 10, T.gun, 0, 0, 0);
      for (var bl = 0; bl < 4; bl++) {
        var bg2 = M.slab(THREE, [
          [-0.12, 0.42], [0.30, 0.90], [0.34, 1.62], [-0.02, 1.72], [-0.42, 1.20], [-0.40, 0.55]
        ], 0.13, "xz");
        var bm2 = mesh(THREE, sc, bg2, T.gun);
        bm2.rotation.x = bl * PI / 2 + 0.35;
        bm2.rotation.y = 0.42;
      }
      sc.position.set(-48.4, sgn * 2.55, -3.20);
      G.add(sc);
      /* rudder */
      var rg = M.slab(THREE, [
        [-1.55, -2.95], [0.95, -2.85], [1.15, -0.55], [-1.35, -0.35]
      ], 0.30, "xz");
      var rm = mesh(THREE, G, rg, T.under);
      rm.position.set(-51.6, sgn * 2.05 + 0.15, 0);
    }
  }

  /* =============================================== 5 in/38 twin gun mount
     Mk 38 enclosed base-ring mount: a slab-sided gun house with a sloped
     face and a rounded top, two 5 in barrels close together with canvas
     blast bags at the roots, a rangefinder hood on the crown. Built about
     its OWN vertical axis so the renderer can train it.                  */
  function gunMount(THREE, M, T) {
    var g = new THREE.Group();

    /* barbette the house turns on. The Mk 38 sits almost directly on the
       deck -- an earlier pass lifted it half a metre and then hung the guns
       low in the house, and the pair came out level with the top wire of the
       forecastle railing and disappeared into it in every render. */
    cylZ(THREE, g, 1.98, 2.08, 0.30, 16, T.supD, 0, 0, 0.15);

    /* Gun house: a FLAT-sided box with a sharply raked face and a flat roof,
       not the rounded lozenge a soft outline gives you. Measured off the
       Orleck bow photograph the house is 4.6 m long and 2.8 m tall, and the
       barrels come out of it 2.3 m above the deck. */
    var pr = [
      [-2.40, 0.28], [-2.40, 2.48], [-2.00, 2.92],
      [ 1.15, 2.92], [ 1.92, 2.52], [ 2.28, 1.42], [ 2.28, 0.28]
    ];
    profile(THREE, M, g, pr, 3.56, T.supD, 0, 0, 0.14);
    /* flat cheeks so the house does not read as a lozenge */
    box(THREE, g, 4.35, 3.64, 2.00, T.supD, -0.18, 0, 1.55);

    /* sight hoods either side of the face */
    var s;
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.10, 0.62, 0.58, T.supD, 1.30, s * 1.46, 3.05);
    }
    /* rangefinder / trainer hood on the crown */
    box(THREE, g, 1.75, 1.45, 0.48, T.supD, -0.60, 0, 3.30);
    box(THREE, g, 0.68, 2.50, 0.34, T.supD, -0.30, 0, 3.24);

    /* The guns. A 5 in/38 is a short, fat, unmistakably 1940s tube: a heavy
       slide out of the face, a canvas blast bag round it, then a barrel that
       is still 13 cm across at the muzzle. Note cylX puts radiusTop at -X,
       so the pair below taper the right way -- fat at the breech, fine at
       the muzzle -- which the first pass had backwards. */
    box(THREE, g, 1.60, 2.35, 1.45, T.supD, 2.45, 0, 2.28);
    for (s = -1; s <= 1; s += 2) {
      var y = s * 0.64;
      cylX(THREE, g, 0.52, 0.44, 1.25, 10, T.cvs, 2.78, y, 2.28);
      cylX(THREE, g, 0.345, 0.275, 2.35, 10, T.gun, 4.55, y, 2.28);
      cylX(THREE, g, 0.245, 0.190, 1.85, 10, T.gun, 6.62, y, 2.28);
      cylX(THREE, g, 0.225, 0.215, 0.26, 10, T.gun, 7.66, y, 2.28);
    }
    /* ready-service lockers on the house sides */
    for (s = -1; s <= 1; s += 2) box(THREE, g, 1.25, 0.32, 0.80, T.supD, -1.70, s * 1.92, 1.30);
    return g;
  }

  /* ======================================================== superstructure */
  function buildSuper(THREE, M, G, T) {
    var s, i;

    /* ---- 01 deckhouse, forward: mount 51 shelter, bridge base, ASROC deck.
       Its roof is one flat level; the sheer of the main deck rising forward
       is what makes it look lower at the front, exactly as on the ship. */
    var fwdPlan = [
      [31.9, 0.00], [31.55, 1.70], [30.75, 2.95], [29.40, 3.70],
      [24.00, 4.20], [16.00, 4.48], [ 6.50, 4.48], [ 2.20, 4.15],
      [ 2.20, -4.15], [ 6.50, -4.48], [16.00, -4.48], [24.00, -4.20],
      [29.40, -3.70], [30.75, -2.95], [31.55, -1.70]
    ];
    house(THREE, M, G, fwdPlan, Z01 - 4.05, T.sup, 4.05);

    /* ---- 01 deckhouse, amidships: carries the stack and the after mack */
    var midPlan = [
      [ 2.30, 3.35], [-8.00, 3.20], [-14.50, 3.00], [-17.10, 2.70],
      [-17.10, -2.70], [-14.50, -3.00], [-8.00, -3.20], [2.30, -3.35]
    ];
    house(THREE, M, G, midPlan, Z01A - 4.00, T.sup, 4.00);

    /* ---- 02 level: the pilothouse, faceted across the front */
    var brPlan = [
      [29.50, 0.00], [29.15, 1.28], [28.20, 2.30], [26.60, 2.92],
      [22.00, 3.05], [19.20, 3.05], [19.20, -3.05], [22.00, -3.05],
      [26.60, -2.92], [28.20, -2.30], [29.15, -1.28]
    ];
    house(THREE, M, G, brPlan, ZBR - Z01, T.sup, Z01);

    /* bridge wings: narrow platforms out to the ship's side */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, G, 3.60, 1.85, 0.22, T.sup, 25.4, s * 3.85, ZBR - 0.16);
      box(THREE, G, 3.60, 0.16, 1.05, T.sup, 25.4, s * 4.68, ZBR + 0.42);
    }

    /* pilothouse glazing: a continuous band of windows round the faceted
       front, canted forward at the top the way 1940s bridges were */
    var wz = ZBR - 1.15, wh = 1.05;
    var faces = [
      [29.36,  0.00, 0.00, 1.35],
      [28.85,  1.80, 0.42, 2.10],
      [27.55,  2.68, 0.95, 2.00],
      [24.30,  3.01, 1.57, 4.80],
      [28.85, -1.80, -0.42, 2.10],
      [27.55, -2.68, -0.95, 2.00],
      [24.30, -3.01, -1.57, 4.80]
    ];
    for (i = 0; i < faces.length; i++) {
      var f = faces[i];
      var gm = box(THREE, G, 0.14, f[3], wh, T.glass, f[0], f[1], wz);
      gm.rotation.z = f[2];
      gm.rotation.y = -0.13;
    }

    /* ---- 03 level: open bridge and the director platform over it */
    var obPlan = [
      [28.05, 0.00], [27.65, 1.05], [26.80, 1.90], [25.35, 2.35],
      [21.20, 2.40], [21.20, -2.40], [25.35, -2.35], [26.80, -1.90],
      [27.65, -1.05]
    ];
    house(THREE, M, G, obPlan, ZOB - ZBR, T.sup, ZBR);
    /* splinter shield round the open bridge */
    rail(THREE, G, [
      [27.9, 0.0, ZOB], [26.7, 1.8, ZOB], [25.1, 2.28, ZOB], [21.3, 2.33, ZOB],
      [21.3, -2.33, ZOB], [25.1, -2.28, ZOB], [26.7, -1.8, ZOB], [27.9, 0.0, ZOB]
    ], 1.05, 3, T.rail);

    /* ---- Mk 37 director. The rangefinder ears sticking out either side are
       the give-away; so is the Mk 25 dish sitting on the roof. */
    var dir = new THREE.Group();
    cylZ(THREE, dir, 1.05, 1.15, 0.55, 14, T.supD, 0, 0, 0.28);
    profile(THREE, M, dir, [
      [-1.35, 0.55], [-1.45, 1.90], [-1.05, 2.30], [1.15, 2.30],
      [1.50, 1.85], [1.55, 0.90], [1.30, 0.55]
    ], 2.55, T.supD, 0, 0, 0);
    /* rangefinder tube through the body */
    cylZ(THREE, dir, 0.24, 0.24, 4.55, 10, T.metD, -0.15, 0, 1.55).rotation.x = PI / 2;
    for (s = -1; s <= 1; s += 2) box(THREE, dir, 0.55, 0.35, 0.55, T.metD, -0.15, s * 2.30, 1.55);
    /* Mk 25 fire-control dish */
    var dish = new THREE.SphereGeometry(0.95, 14, 7, 0, PI * 2, 0, PI * 0.42);
    dish.scale(1, 1, 0.55); dish.rotateY(PI * 0.42);
    var dsh = mesh(THREE, dir, dish, T.met);
    dsh.position.set(0.35, 0, 2.92);
    box(THREE, dir, 0.35, 0.35, 0.62, T.metD, 0.0, 0, 2.55);
    dir.position.set(24.0, 0, ZOB);
    G.add(dir);

    /* ---- signal flag bags and the small deckhouse abaft the bridge */
    box(THREE, G, 2.40, 4.20, 1.45, T.sup, 20.4, 0, ZBR + 0.72);
    for (s = -1; s <= 1; s += 2) box(THREE, G, 1.30, 0.90, 0.95, T.supD, 19.0, s * 2.55, ZBR + 0.48);

    /* ---- ASROC MK 112: eight cells in two banks of four, on its own deck
       house between the bridge and the stack, trained fore and aft and
       elevated. Nothing else on a FRAM looks like this. */
    var asr = new THREE.Group();
    box(THREE, asr, 4.60, 5.40, 1.20, T.sup, 0, 0, 0.60);        /* pedestal */
    var lch = new THREE.Group();
    box(THREE, lch, 3.60, 5.00, 2.35, T.supD, 0, 0, 0);          /* cell box */
    box(THREE, lch, 0.32, 5.20, 2.60, T.supD, -1.85, 0, 0);      /* back plate */
    /* the eight muzzle covers, two rows of four */
    for (i = 0; i < 8; i++) {
      var cx = 1.86, cy = ((i % 4) - 1.5) * 1.20, cz = (i < 4 ? 0.58 : -0.58);
      cylX(THREE, lch, 0.50, 0.50, 0.26, 10, T.black, cx, cy, cz);
      cylX(THREE, lch, 0.55, 0.55, 0.16, 10, T.supD, cx - 0.19, cy, cz);
    }
    lch.position.set(0, 0, 2.20);
    lch.rotation.y = -0.13;   /* elevated a few degrees and no more: canted
                                 hard over it read as a solar panel, not a
                                 box of eight rocket cells */
    asr.add(lch);
    /* trunnion arms */
    for (s = -1; s <= 1; s += 2) box(THREE, asr, 0.60, 0.40, 1.60, T.supD, -0.30, s * 2.70, 1.75);
    asr.position.set(X_ASR, 0, Z01);
    G.add(asr);
    /* splinter screen round the launcher well, so it sits IN the ship the
       way it does in the photographs instead of perching on top of it */
    rail(THREE, G, [
      [X_ASR + 2.9, 0, Z01], [X_ASR + 2.7, 2.1, Z01], [X_ASR + 0.6, 3.3, Z01],
      [X_ASR - 2.6, 3.3, Z01], [X_ASR - 3.2, 2.1, Z01], [X_ASR - 3.2, 0, Z01],
      [X_ASR - 3.2, -2.1, Z01], [X_ASR - 2.6, -3.3, Z01], [X_ASR + 0.6, -3.3, Z01],
      [X_ASR + 2.7, -2.1, Z01], [X_ASR + 2.9, 0, Z01]
    ], 1.15, 3, T.rail);

    /* ---- Mk 32 triple torpedo tubes, one bank each side, trained outboard */
    for (s = -1; s <= 1; s += 2) {
      var tt = new THREE.Group();
      cylZ(THREE, tt, 0.45, 0.55, 0.60, 10, T.metD, 0, 0, 0.30);
      var tubes = [[0, 0.38, 0.95], [0, -0.38, 0.95], [0, 0, 1.63]];
      for (i = 0; i < 3; i++) {
        cylX(THREE, tt, 0.335, 0.335, 3.20, 10, T.metD, 0, tubes[i][1], tubes[i][2]);
        cylX(THREE, tt, 0.36, 0.36, 0.18, 10, T.black, 1.66, tubes[i][1], tubes[i][2]);
      }
      tt.position.set(-8.5, s * 3.30, Z01A);
      tt.rotation.z = s * 1.30;
      G.add(tt);
    }

    /* ---- boat deck: motor whaleboat under a davit each side */
    for (s = -1; s <= 1; s += 2) {
      var bt = new THREE.Group();
      var bh = M.slab(THREE, [
        [-3.40, 0.00], [-3.15, 0.80], [1.00, 0.96], [2.85, 0.74], [3.45, 0.04],
        [2.60, -0.48], [-2.60, -0.54]
      ], 1.85, "xz");
      var bhm = mesh(THREE, bt, bh, T.supD);
      bhm.position.y = 0.93;
      box(THREE, bt, 5.60, 1.92, 0.16, T.supD, -0.20, 0, 1.72);
      box(THREE, bt, 4.90, 1.62, 0.52, T.cvs, -0.20, 0, 2.02);
      bt.position.set(0.6, s * 5.10, Z01A - 0.55);
      G.add(bt);
      strut(THREE, G, T.metD, [4.3, s * 3.9, Z01A], [4.3, s * 5.9, Z01A + 2.9], 0.16, 5);
      strut(THREE, G, T.metD, [-3.2, s * 3.4, Z01A], [-3.2, s * 5.9, Z01A + 2.9], 0.16, 5);
      strut(THREE, G, T.metD, [4.3, s * 5.9, Z01A + 2.9], [-3.2, s * 5.9, Z01A + 2.9], 0.10, 4);
    }

    /* ---- ready-service lockers, life-raft canisters, deck fittings */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) {
        cylX(THREE, G, 0.52, 0.52, 2.10, 8, T.cvs, 18.5 - i * 3.0, s * 4.35, Z01 + 0.55);
      }
      box(THREE, G, 1.60, 1.10, 1.10, T.supD, 11.0, s * 3.30, Z01 + 0.55);
      box(THREE, G, 1.60, 1.10, 1.10, T.supD, -11.6, s * 2.40, Z01A + 0.55);
    }
    /* Mushroom ventilator cowls. A 1945 deckhouse is covered in them and
       they are most of what stops a long grey roof reading as a table. */
    var vents = [[27.0, 2.30], [23.0, 2.60], [17.5, 3.20], [12.2, 3.40],
                 [ 7.6, 3.40], [-5.6, 2.30], [-11.0, 2.10]];
    for (i = 0; i < vents.length; i++) {
      var vz = vents[i][0] > 2.2 ? Z01 : Z01A;
      for (s = -1; s <= 1; s += 2) {
        cylZ(THREE, G, 0.34, 0.30, 1.15, 8, T.metD, vents[i][0], s * vents[i][1], vz + 0.58);
        cylZ(THREE, G, 0.46, 0.34, 0.36, 8, T.metD, vents[i][0], s * vents[i][1], vz + 1.32);
      }
    }
    /* Inclined ladders between the levels: two sloping wires and a tread
       ribbon each, four triangles apiece, and they do more for the read of a
       ship than any amount of extra plating. */
    var lads = [[30.4, 2.10, Z01, 27.4, 2.10, ZBR],
                [19.6, 2.40, Z01, 21.6, 2.40, ZBR],
                [22.4, 1.90, ZBR, 24.4, 1.90, ZOB],
                [ 2.6, 3.00, Z01A, 4.6, 3.00, Z01],
                [-17.6, 2.20, deckZ(-17.6), -19.8, 2.20, ZHG]];
    for (i = 0; i < lads.length; i++) {
      var L = lads[i];
      for (s = -1; s <= 1; s += 2) {
        rail(THREE, G, [[L[0], s * L[1], L[2]], [L[3], s * L[4], L[5]]], 0.95, 2, T.rail);
        mesh(THREE, G, railGeo(THREE, [[L[0], s * (L[1] - 0.42), L[2]],
                                       [L[3], s * (L[4] - 0.42), L[5]]], 0.06, 1), T.rail);
      }
    }
    /* life-raft canisters in their racks along the deckhouse sides */
    var rafts = [21.5, 18.0, 9.5, 6.2, -6.5, -12.5];
    for (i = 0; i < rafts.length; i++) {
      var rz = rafts[i] > 2.2 ? Z01 : Z01A;
      var ry = rafts[i] > 2.2 ? 4.30 : 3.10;
      for (s = -1; s <= 1; s += 2)
        cylX(THREE, G, 0.48, 0.48, 1.95, 8, T.cvs, rafts[i], s * ry, rz + 0.52);
    }
    /* replenishment kingpost and boom abaft the stack */
    cylZ(THREE, G, 0.22, 0.32, 7.60, 6, T.met, -6.4, 0, Z01A + 3.80);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, G, T.met, [-6.4, s * 0.25, Z01A + 1.30],
                             [-6.4, s * 3.70, Z01A + 5.40], 0.15, 5);
      strut(THREE, G, T.met, [-6.4, s * 3.70, Z01A + 5.40],
                             [-6.4, s * 0.25, Z01A + 7.30], 0.07, 4);
    }

    /* searchlights on the after mack platform level */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, G, 0.62, 0.62, 0.42, 12, T.mark, 20.2, s * 3.05, ZBR + 1.70);
    }
  }

  /* ==================================================== the one raked stack */
  function buildFunnel(THREE, M, G, T) {
    var rake = 0.155;                       /* about nine degrees aft       */
    var fn = new THREE.Group();
    /* body: an oval pipe, longer fore and aft than athwartships */
    var pipe = new THREE.CylinderGeometry(1.08, 1.36, 6.60, 16, 1);
    pipe.rotateX(PI / 2);
    pipe.scale(1.36, 1.0, 1.0);
    var pm = mesh(THREE, fn, pipe, T.sup);
    pm.position.z = 3.30;
    /* black cap band */
    var cap = new THREE.CylinderGeometry(1.15, 1.12, 1.15, 16, 1);
    cap.rotateX(PI / 2); cap.scale(1.36, 1.0, 1.0);
    var cm = mesh(THREE, fn, cap, T.black);
    cm.position.z = 6.30;
    /* rain cap and the two uptake pipes standing proud of it */
    var top = new THREE.CylinderGeometry(1.18, 1.18, 0.18, 16, 1);
    top.rotateX(PI / 2); top.scale(1.36, 1.0, 1.0);
    mesh(THREE, fn, top, T.black).position.z = 6.94;
    cylZ(THREE, fn, 0.30, 0.30, 1.15, 8, T.black, 0.60, 0.52, 7.40);
    cylZ(THREE, fn, 0.30, 0.30, 1.15, 8, T.black, 0.60, -0.52, 7.40);
    cylZ(THREE, fn, 0.24, 0.24, 1.70, 8, T.metD, -0.95, 0, 7.65);
    /* two grab rails round the pipe */
    var r;
    for (r = 0; r < 2; r++) {
      var ring = new THREE.CylinderGeometry(1.28, 1.28, 0.09, 16, 1);
      ring.rotateX(PI / 2); ring.scale(1.36, 1.0, 1.0);
      mesh(THREE, fn, ring, T.metD).position.z = 1.75 + r * 2.20;
    }
    /* team band: the funnel is the other place ownership reads at range */
    var band = new THREE.CylinderGeometry(1.14, 1.19, 0.66, 16, 1);
    band.rotateX(PI / 2); band.scale(1.36, 1.0, 1.0);
    mesh(THREE, fn, band, T.tteam).position.z = 5.35;

    fn.position.set(X_FUN, 0, Z01A);
    fn.rotation.y = rake;
    G.add(fn);

    /* fiddley grating and the steam pipe up the after face */
    box(THREE, G, 3.60, 3.10, 0.30, T.metD, X_FUN, 0, Z01A + 0.14);
    strut(THREE, G, T.metD, [X_FUN - 1.8, 0.9, Z01A], [X_FUN - 2.9, 0.9, Z01A + 7.2], 0.13, 5);
  }

  /* ==================================================== tripod mast and air
     search array. The big flat rectangular antenna low on the mast face is
     the single most period-specific thing above this ship's deck.       */
  function buildMast(THREE, M, G, T) {
    var zb = Z01, i, s;
    var top = [X_MST - 1.35, 0, 25.40];

    /* three legs: one forward and heavy, two aft and splayed */
    strut(THREE, G, T.met, [X_MST + 0.85, 0, zb], [top[0], 0, top[2]], 0.44, 7);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, G, T.met, [X_MST - 3.30, s * 3.05, zb], [X_MST - 1.30, s * 0.30, 17.60], 0.34, 6);
      strut(THREE, G, T.met, [X_MST - 1.30, s * 0.30, 17.60], [top[0] + 0.05, s * 0.12, 22.60], 0.17, 5);
    }
    /* cross bracing */
    var lv = [10.6, 12.9, 15.2];
    for (i = 0; i < lv.length; i++) {
      var f = (lv[i] - zb) / (17.6 - zb);
      var g2 = (lv[i] - zb) / (25.4 - zb);
      var yy = 3.05 * (1 - f) + 0.30 * f;
      var xx = (X_MST - 3.30) * (1 - f) + (X_MST - 1.30) * f;
      var xf = (X_MST + 0.85) * (1 - g2) + top[0] * g2;
      strut(THREE, G, T.met, [xx, yy, lv[i]], [xx, -yy, lv[i]], 0.13, 4);
      for (s = -1; s <= 1; s += 2) {
        strut(THREE, G, T.met, [xx, s * yy, lv[i]], [xf, 0, lv[i]], 0.11, 4);
        if (i < lv.length - 1)
          strut(THREE, G, T.met, [xx, s * yy, lv[i]], [xf, 0, lv[i + 1]], 0.07, 4);
      }
    }
    /* lower platform with a rail round it */
    box(THREE, G, 3.80, 5.10, 0.18, T.sup, X_MST - 1.1, 0, 13.10);
    rail(THREE, G, boxPath(X_MST + 0.70, X_MST - 2.90, 2.50, 13.20, 1.4), 1.0, 3, T.rail);
    /* upper platform */
    box(THREE, G, 2.30, 2.90, 0.14, T.sup, X_MST - 1.20, 0, 20.60);
    rail(THREE, G, boxPath(X_MST - 0.20, X_MST - 2.20, 1.40, 20.67, 1.0), 0.95, 3, T.rail);

    /* ---- SPS-37/40 air search: a flat rectangular bedspring, five metres
       across, mounted on the mast face and canted back. Built as an open
       frame so it reads as a lattice antenna and not as a billboard. */
    var arr = new THREE.Group();
    var AW = 5.30, AH = 2.55, tb = 0.13;
    box(THREE, arr, tb, AW, tb, T.met, 0, 0, AH * 0.5);
    box(THREE, arr, tb, AW, tb, T.met, 0, 0, -AH * 0.5);
    box(THREE, arr, tb, tb, AH, T.met, 0, AW * 0.5, 0);
    box(THREE, arr, tb, tb, AH, T.met, 0, -AW * 0.5, 0);
    for (i = 0; i < 5; i++)
      box(THREE, arr, 0.07, AW - 0.10, 0.075, T.met, 0.16, 0, -AH * 0.36 + i * AH * 0.18);
    for (i = -1; i <= 1; i++)
      box(THREE, arr, 0.09, 0.09, AH, T.met, 0, i * AW * 0.26, 0);
    /* dipole bar standing off the reflector */
    box(THREE, arr, 0.10, AW * 0.80, 0.10, T.met, 0.52, 0, 0);
    for (i = -3; i <= 3; i++)
      strut(THREE, arr, T.met, [0.14, i * AW * 0.12, 0], [0.52, i * AW * 0.12, 0], 0.045, 4);
    arr.position.set(X_MST - 0.55, 0, 17.55);
    arr.rotation.z = 1.02;      /* trained on the port bow: the flat face has
                                   to be visible from abeam or the single most
                                   period-specific fitting on the ship is a
                                   vertical line */
    arr.rotation.y = -0.16;
    G.add(arr);
    /* the mount it turns on */
    cylZ(THREE, G, 0.36, 0.42, 0.75, 10, T.metD, X_MST - 1.25, 0, 16.35);

    /* ---- SPS-10 surface search: the small curved 'orange peel' above */
    var pe = new THREE.CylinderGeometry(1.05, 1.05, 2.30, 14, 1, true, PI * 0.62, PI * 0.76);
    pe.rotateX(PI / 2); pe.rotateZ(PI / 2);
    var pem = new THREE.Mesh(tally(pe), T.met);
    pem.material.side = THREE.DoubleSide;
    pem.position.set(X_MST - 0.85, 0, 21.75);
    G.add(pem);
    box(THREE, G, 0.16, 2.20, 0.16, T.met, X_MST - 0.35, 0, 21.75);
    cylZ(THREE, G, 0.24, 0.24, 0.80, 8, T.metD, X_MST - 1.30, 0, 21.05);

    /* ---- yardarm, IFF billboard, whips */
    strut(THREE, G, T.met, [X_MST - 1.25, 3.60, 19.30], [X_MST - 1.25, -3.60, 19.30], 0.11, 5);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, G, T.met, [X_MST - 1.25, s * 3.60, 19.30], [X_MST - 1.28, s * 1.10, 21.10], 0.06, 4);
      cylZ(THREE, G, 0.16, 0.16, 0.32, 8, T.mark, X_MST - 1.25, s * 3.55, 19.55);
    }
    box(THREE, G, 0.10, 2.10, 0.55, T.met, X_MST - 0.65, 0, 22.60);
    cylZ(THREE, G, 0.05, 0.09, 3.40, 4, T.met, X_MST - 1.65, 0, 27.00);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, G, 0.045, 0.075, 5.40, 4, T.met, X_MST - 3.10, s * 2.40, 13.90);
      cylZ(THREE, G, 0.045, 0.075, 4.60, 4, T.met, X_MACK - 1.40, s * 2.10, 17.70);
    }
  }

  /* =================================== after lattice: ECM drums, and the two
     short black uptakes that are all that is left of the second stack the
     FRAM rebuild took out. */
  function buildMack(THREE, M, G, T) {
    var zb = Z01A, s, i;
    var apex = 14.90;
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, G, T.met, [X_MACK + 2.05, s * 2.45, zb], [X_MACK - 0.20, s * 0.60, apex - 1.4], 0.21, 5);
      strut(THREE, G, T.met, [X_MACK - 2.25, s * 2.45, zb], [X_MACK - 0.20, s * 0.60, apex - 1.4], 0.21, 5);
    }
    for (i = 0; i < 2; i++) {
      var z = zb + 2.0 + i * 2.6;
      var f = (z - zb) / (apex - 1.4 - zb);
      var yy = 2.45 * (1 - f) + 0.60 * f;
      var xf = (X_MACK + 2.05) * (1 - f) + (X_MACK - 0.20) * f;
      var xa = (X_MACK - 2.25) * (1 - f) + (X_MACK - 0.20) * f;
      strut(THREE, G, T.met, [xf, yy, z], [xf, -yy, z], 0.09, 4);
      strut(THREE, G, T.met, [xa, yy, z], [xa, -yy, z], 0.09, 4);
      for (s = -1; s <= 1; s += 2) strut(THREE, G, T.met, [xf, s * yy, z], [xa, s * yy, z], 0.09, 4);
    }
    /* ECM outriggers with their drum antennas: the two dark cylinders that
       sit high on the after lattice of every FRAM I in the photographs */
    strut(THREE, G, T.met, [X_MACK - 0.20, 3.05, 13.05], [X_MACK - 0.20, -3.05, 13.05], 0.12, 5);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, G, 0.56, 0.56, 1.65, 12, T.black, X_MACK - 0.20, s * 2.60, 13.92);
      cylZ(THREE, G, 0.58, 0.44, 0.24, 12, T.metD, X_MACK - 0.20, s * 2.60, 14.86);
      strut(THREE, G, T.met, [X_MACK - 0.20, s * 3.05, 13.05], [X_MACK - 0.20, s * 0.60, 11.20], 0.09, 4);
    }
    cylZ(THREE, G, 0.42, 0.42, 1.35, 12, T.black, X_MACK - 0.20, 0, 15.55);
    box(THREE, G, 1.90, 2.40, 0.14, T.sup, X_MACK - 0.10, 0, 12.30);
    rail(THREE, G, boxPath(X_MACK + 0.85, X_MACK - 1.05, 1.15, 12.37, 0.95), 0.9, 3, T.rail);

    /* the vestigial after uptakes */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, G, 0.44, 0.50, 2.10, 10, T.black, X_MACK + 1.30, s * 1.05, zb + 1.05);
    }
    box(THREE, G, 3.20, 3.00, 0.28, T.metD, X_MACK + 0.60, 0, zb + 0.14);
  }

  /* =================== the FRAM signature: hangar, flight deck, after mount */
  function buildAft(THREE, M, G, T) {
    var s, i;
    var zdk = deckZ((HG_F + HG_A) * 0.5);

    /* ---- HANGAR. Plain, boxy, flat-roofed, standing on the main deck and
       nearly as wide as the ship. Nothing about it is subtle and nothing
       about it should be: it is the whole reason the class looks like this. */
    var hgPlan = [
      [HG_F, 3.45], [HG_F - 0.9, 3.55], [HG_A + 0.6, 3.55], [HG_A, 3.30],
      [HG_A, -3.30], [HG_A + 0.6, -3.55], [HG_F - 0.9, -3.55], [HG_F, -3.45]
    ];
    house(THREE, M, G, hgPlan, ZHG - (zdk - 0.10), T.sup, zdk - 0.10);
    /* roof coaming and a rail round the top */
    box(THREE, G, HG_F - HG_A - 0.4, 7.20, 0.22, T.supD, (HG_F + HG_A) * 0.5, 0, ZHG + 0.10);
    rail(THREE, G, boxPath(HG_F - 0.4, HG_A + 0.4, 3.35, ZHG + 0.20, 1.6), 1.0, 3, T.rail);
    /* the after face is the door: a big plain shutter with a stiffener grid */
    box(THREE, G, 0.22, 5.60, 3.55, T.supD, HG_A - 0.12, 0, zdk + 1.85);
    for (i = 0; i < 4; i++)
      box(THREE, G, 0.10, 5.40, 0.10, T.metD, HG_A - 0.26, 0, zdk + 0.55 + i * 0.85);
    /* team flash each side of the hangar: the biggest flat panel on the ship */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, G, 6.40, 0.14, 0.95, T.tteam, (HG_F + HG_A) * 0.5 + 0.9, s * 3.62, ZHG - 1.20);
    }
    /* hangar-top handling gear and the DASH control station */
    box(THREE, G, 2.30, 2.60, 1.35, T.supD, HG_A + 2.0, 0, ZHG + 0.90);
    box(THREE, G, 0.16, 2.30, 0.75, T.glass, HG_A + 0.85, 0, ZHG + 1.15);

    /* ---- FLIGHT DECK. The pad itself is deck plate, so what has to read is
       the circle, the safety nets round the edge and the clear run aft. */
    var ring = new THREE.RingGeometry(4.05, 4.45, 30, 1);
    var rm = mesh(THREE, G, ring, T.mark);
    rm.position.set(X_PAD, 0, deckZ(X_PAD) + 0.10);
    box(THREE, G, 0.42, 5.60, 0.05, T.mark, X_PAD, 0, deckZ(X_PAD) + 0.10);
    box(THREE, G, 5.60, 0.42, 0.05, T.mark, X_PAD, 0, deckZ(X_PAD) + 0.10);

    /* safety nets: angled panels hung outboard of the pad */
    for (s = -1; s <= 1; s += 2) {
      var np = [], nidx = [], nk = 0;
      for (i = 0; i <= 7; i++) {
        var nx = HG_A - 1.0 - i * 1.7;
        var e = deckEdge(nx);
        np.push(nx, s * (e.y - 0.15), e.z + 0.08, nx, s * (e.y + 1.15), e.z - 0.60);
      }
      for (i = 0; i < 7; i++) {
        nk = i * 2;
        nidx.push(nk, nk + 2, nk + 1, nk + 1, nk + 2, nk + 3);
      }
      var ng = new THREE.BufferGeometry();
      ng.setAttribute("position", new THREE.Float32BufferAttribute(np, 3));
      ng.setIndex(nidx); ng.computeVertexNormals();
      mesh(THREE, G, ng, T.net);
    }

    /* ---- after 5 in mount on the fantail, trained aft */
    var m53 = gunMount(THREE, M, T);
    m53.position.set(X_M53, 0, deckZ(X_M53));
    m53.rotation.z = PI;
    m53.name = "mount53";
    G.add(m53);
    /* its handling-room trunk */
    box(THREE, G, 5.20, 5.40, 0.55, T.sup, X_M53 - 0.4, 0, deckZ(X_M53) + 0.26);

    /* ---- fantail gear: towed-array reel and the depth charge racks the
       FRAM ships kept right aft */
    cylX(THREE, G, 0.95, 0.95, 2.20, 12, T.metD, -53.6, 0, deckZ(-53.6) + 1.05);
    box(THREE, G, 2.90, 3.20, 0.35, T.supD, -53.6, 0, deckZ(-53.6) + 0.18);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, G, 4.60, 0.85, 0.85, T.metD, -57.0, s * 1.65, deckZ(-57.0) + 0.45);
      cylZ(THREE, G, 0.30, 0.30, 0.95, 8, T.metD, -50.6, s * 2.90, deckZ(-50.6) + 0.48);
    }
  }

  /* ================================================== forecastle and ground
     tackle: anchors, windlass, capstans, breakwater */
  function buildFocsle(THREE, M, G, T) {
    var s, i;
    /* anchor windlass and its wildcats */
    box(THREE, G, 2.50, 4.20, 0.95, T.metD, 50.2, 0, deckZ(50.2) + 0.48);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, G, 0.62, 0.62, 0.75, 10, T.metD, 50.2, s * 1.70, deckZ(50.2) + 0.85);
      cylZ(THREE, G, 0.52, 0.60, 0.85, 10, T.metD, 46.0, s * 2.30, deckZ(46.0) + 0.42);
    }
    /* stockless anchors sitting in the hawses */
    for (s = -1; s <= 1; s += 2) {
      var an = new THREE.Group();
      var sh = M.slab(THREE, [
        [-1.55, -0.34], [0.70, -0.44], [1.20, 0.20], [0.60, 0.48], [-1.50, 0.40]
      ], 0.46, "xz");
      mesh(THREE, an, sh, T.metD);
      box(THREE, an, 0.38, 0.46, 2.40, T.metD, -1.50, 0, 0.18);
      var e = deckEdge(53.0);
      an.position.set(53.0, s * (e.y + 0.10), 5.55);
      an.rotation.x = s * PI * 0.5;
      an.rotation.z = -0.10;
      G.add(an);
    }
    /* anchor cable running from the wildcats out to the hawses */
    for (s = -1; s <= 1; s += 2) {
      mesh(THREE, G, railGeo(THREE, [
        [49.0, s * 1.70, deckZ(49.0) + 0.10], [51.5, s * 1.85, deckZ(51.5) + 0.10],
        [53.4, s * 2.20, deckZ(53.4) + 0.10]
      ], 0.10, 1), T.metD);
    }
    /* breakwater across the forecastle just forward of the deckhouse */
    var bw = [];
    var ee = deckEdge(33.4);
    bw.push([33.4, ee.y - 0.25, ee.z]);
    bw.push([34.6, 2.35, deckZ(34.6)]);
    bw.push([34.6, -2.35, deckZ(34.6)]);
    var e2 = deckEdge(33.4);
    bw.push([33.4, -(e2.y - 0.25), e2.z]);
    for (i = 0; i < bw.length - 1; i++) {
      var a = bw[i], b = bw[i + 1];
      var mx = (a[0] + b[0]) * 0.5, my = (a[1] + b[1]) * 0.5, mz = (a[2] + b[2]) * 0.5;
      var dx = b[0] - a[0], dy = b[1] - a[1];
      var L = Math.sqrt(dx * dx + dy * dy);
      var bwm = box(THREE, G, 0.22, L, 1.10, T.supD, mx, my, mz + 0.55);
      bwm.rotation.z = Math.atan2(dy, dx) + PI / 2;
    }
    /* bullnose and jackstaff */
    cylZ(THREE, G, 0.05, 0.10, 3.60, 4, T.met, 57.6, 0, deckZ(57.6) + 1.80);
    cylZ(THREE, G, 0.05, 0.10, 3.20, 4, T.met, -57.8, 0, deckZ(-57.8) + 1.60);
    /* ready-service and the ammunition hoist trunk behind mount 51 */
    box(THREE, G, 3.20, 4.60, 0.70, T.sup, 32.6, 0, deckZ(32.6) + 0.34);
  }

  /* ================================================== the bow number, as a
     DECAL rather than paint in the hull skin. The hull's u axis runs stern
     to stem on both sides at once, so anything with a reading direction has
     to be geometry: this is one curved ribbon per side, lying on the real
     hull surface, with the u axis reversed to starboard so the digits read
     the right way round from either beam. */
  function buildPennant(THREE, G, T) {
    var X0 = 40.6, X1 = 52.6, Z0 = 2.55, Z1 = 5.35, NX = 9, s, i, j;
    for (s = -1; s <= 1; s += 2) {
      var pos = [], uv = [], idx = [];
      for (i = 0; i < NX; i++) {
        var x = X0 + (X1 - X0) * (i / (NX - 1));
        var se = tsec(x);
        for (j = 0; j < 2; j++) {
          var z = Z0 + (Z1 - Z0) * j;
          var y = se.w * edgeK(se, z) + 0.07;
          pos.push(x, s * y, z);
          /* port sees +X to the left, starboard sees it to the right */
          uv.push(s > 0 ? 1 - i / (NX - 1) : i / (NX - 1), j);
        }
      }
      for (i = 0; i < NX - 1; i++) {
        var a = i * 2, b = a + 1, c = a + 2, d = a + 3;
        if (s > 0) idx.push(a, c, b, b, c, d);
        else idx.push(a, b, c, b, d, c);
      }
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      g.setIndex(idx); g.computeVertexNormals();
      mesh(THREE, G, g, T.num);
    }
  }

  /* ======================================================= railings, all of
     them: the main deck edge in three runs (broken where the hangar and the
     gun mounts stand), the 01 deck edges, and the forecastle. */
  function buildRails(THREE, G, T) {
    var s;
    for (s = -1; s <= 1; s += 2) {
      rail(THREE, G, edgePath(57.0, 33.0, s, 0.22, 2.4), 1.05, 3, T.rail);   /* focsle */
      rail(THREE, G, edgePath(32.0, -15.5, s, 0.22, 2.6), 1.05, 3, T.rail);  /* waist */
      rail(THREE, G, edgePath(-30.5, -41.0, s, 0.22, 2.4), 1.05, 3, T.rail); /* pad */
      rail(THREE, G, edgePath(-42.5, -58.0, s, 0.22, 2.4), 1.05, 3, T.rail); /* fantail */
      /* 01 deck edges */
      rail(THREE, G, [
        [30.6, s * 2.80, Z01], [28.6, s * 3.42, Z01], [22.0, s * 3.90, Z01],
        [14.0, s * 4.15, Z01], [6.5, s * 4.15, Z01], [2.4, s * 3.90, Z01]
      ], 1.0, 3, T.rail);
      rail(THREE, G, [
        [2.3, s * 3.60, Z01A], [-4.0, s * 3.55, Z01A], [-10.0, s * 3.40, Z01A],
        [-16.4, s * 3.00, Z01A]
      ], 1.0, 3, T.rail);
    }
    /* athwartships closers so the runs do not float */
    rail(THREE, G, [[-16.4, 3.0, Z01A], [-16.4, -3.0, Z01A]], 1.0, 3, T.rail);
    rail(THREE, G, [[2.4, 3.9, Z01], [2.4, -3.9, Z01]], 1.0, 3, T.rail);
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    TRI = 0;
    var G = new THREE.Group();
    var T = makeMats(THREE, C);

    buildHull(THREE, M, G, T);
    buildSuper(THREE, M, G, T);
    buildFunnel(THREE, M, G, T);
    buildMast(THREE, M, G, T);
    buildMack(THREE, M, G, T);
    buildAft(THREE, M, G, T);
    buildFocsle(THREE, M, G, T);
    buildRails(THREE, G, T);
    buildPennant(THREE, G, T);

    /* ---- the forward mount. render3d.js finds a descendant named "turret"
       and drives its rotation.y from the entity's target bearing, so this
       group has to sit on its own vertical axis at its own centre. */
    var turret = gunMount(THREE, M, T);
    turret.name = "turret";
    turret.position.set(X_M51, 0, deckZ(X_M51));
    G.add(turret);

    /* ---- remaining team flashes: a band round the bridge face and one on
       each bridge wing, so ownership reads from ahead as well as abeam */
    box(THREE, G, 0.14, 2.90, 0.30, T.tteam, 29.30, 0, ZBR - 2.20);
    var s;
    for (s = -1; s <= 1; s += 2) {
      box(THREE, G, 3.40, 0.13, 0.28, T.tteam, 25.4, s * 4.74, ZBR + 0.52);
    }

    G.traverse(function (o) {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    if (typeof console !== "undefined" && console.log) {
      console.log("HERO roc_e80_destroyer triangles:", TRI);
    }
    G.userData.tris = TRI;
    return G;
  }

  return { build: build };
})();

/* Registration. Overwrite unconditionally: a hero model replaces whatever
   parametric hull already claimed this id. len is the real overall length of
   a Gearing class destroyer, 390 ft 6 in.                                 */
UNIT_MODELS["roc_e80_destroyer"] = {
  len: 119.0,
  build: function (THREE, M, C) { return HeroGearingFram.build(THREE, M, C); }
};
