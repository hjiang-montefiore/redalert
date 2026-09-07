/* ========== pact_e80_mbt.js - HERO reference model: T-80U MBT ============
   Style and period anchor for the e80 (1980s Pact) armour roster.

   Reference photographs, all cached in ref/ and all looked at while this
   was built:
     t80u_a, t80u_c   Alabino, head-on and front three-quarter.  The whole
                      Kontakt-5 field is legible: four courses of bricks on
                      the glacis notched around the driver, the heavy brow
                      wedges swept round both turret cheeks, the flat course
                      laid along the front roof edge.
     t80_museum       Verkhnyaya Pyshma, skirts off.  Running gear bare --
                      six road wheels, REAR sprocket, front idler, five
                      small return rollers, and the ERA field wrapping over
                      the fender top.
     t80_spb          pure side elevation.  Wheel spacing, sprocket height,
                      the row of ERA boxes along the upper hull side.
     t80u_g05         4th Guards line-up, skirts fitted: the skirts are
                      BLACK rubber, not painted steel, and that dark band
                      under the fender is half of what makes a T-80 read.
     t80ud_patriot    Park Patriot: the big black dust shields at the front
                      of each fender and the snorkel across the bustle.
     mbt_p_t90a_34    the same Kontakt-5 glacis geometry, shot square on.

   WHAT WENT WRONG LAST TIME, and what this rebuild changes:

   1. The whole vehicle was baked into six merged meshes.  8,972 triangles
      arrived as TEN parts where the M1A2 beside it has 386, and a merged
      buffer cannot be lit, culled or read as separate ironmongery -- the
      ERA field existed in the geometry and simply disappeared into the
      casting.  Every fitting here is its own mesh again.

   2. M.loft winds its quads (a, c, b), which puts the face normal radially
      INWARD.  Under a FrontSide material the outer skin is culled and you
      are looking at the far inner wall: that is why the old hull shaded
      like a soft loaf.  Every lofted body now goes through body() below,
      which flips the winding and recomputes normals.

   3. Everything was one texture at one repeat, so bricks, skirts, wheels
      and hull were the same washed olive and nothing separated.  The paint
      is darker and greener now, the ERA carries its own slightly darker
      shade of the same paint, and the skirts, dust shields and tyres are
      rubber, which is what they are made of.

   Model space: +X nose/front, +Y left, +Z up.  Real metres, track belly on
   z = 0.  render3d.js stands the model up with rotation.x = -PI/2 and
   rescales by the MEASURED x extent.
   Materials are the house three tiers only: SKIN (textured paint,
   roughness 0.82-0.94, metalness <= 0.10), METAL (fittings, track, rubber),
   GLASS (vision blocks and sight windows).
   ASCII only: a stray byte inside a hex literal has broken this before.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT80U = (function () {
  "use strict";

  /* ------------------------------------------------------------ geometry */
  /* Every number two parts have to agree about lives here, so the running
     gear, the skirts and the ERA field cannot drift apart. */
  var X_TAIL   = -3.50;   /* rear plate                                    */
  var X_NOSE   =  3.28;   /* the beak                                      */
  var HW       =  1.69;   /* hull half width over the sponsons             */
  var DECK     =  1.44;   /* flat hull roof                                */
  var BREAK    =  1.40;   /* where the deck folds down into the glacis     */
  var Z_NOSE   =  0.62;   /* beak height                                   */

  var GL_DX = X_NOSE - BREAK;              /* 1.88                         */
  var GL_DZ = DECK - Z_NOSE;               /* 0.82                         */
  var GL_RUN = Math.sqrt(GL_DX * GL_DX + GL_DZ * GL_DZ);
  var GL_ANG = Math.atan2(GL_DZ, GL_DX);   /* 0.4111 rad, 23.6 deg         */
  var GL_NX = GL_DZ / GL_RUN;              /* glacis outward normal, x      */
  var GL_NZ = GL_DX / GL_RUN;              /* glacis outward normal, z      */

  var TT       = 0.100;   /* track belt thickness, pad included            */
  var BW       = 0.58;    /* track width -- T-80 runs a 580 mm belt        */
  var TY       = 1.36;    /* track centreline offset                       */
  var WR       = 0.335;   /* road wheel radius (670 mm wheels)             */
  var WZ       = TT + WR; /* road wheel centre height                      */
  var WX       = [2.25, 1.45, 0.65, -0.15, -0.95, -1.75];   /* SIX of them */
  var RRX      = [2.00, 0.95, -0.10, -1.15, -2.20];         /* return rlrs */
  var RRZ      = 0.86, RRR = 0.105;
  var SPR      = { x: -2.96, z: 0.72, r: 0.300, tr: 0.345 };  /* REAR drive */
  var IDL      = { x:  2.90, z: 0.40, r: 0.300 };             /* front idler*/

  var SK_Y     = 1.720;   /* skirt plane                                   */
  var SK_TH    = 0.050;
  var SK_TOP   = 1.400;
  var SK_BOT   = 0.720;

  var TUR      = { x: 0.16, z: DECK };   /* turret ring centre             */
  var GUN_Z    = 0.30;                   /* gun axis, turret local          */

  /* ------------------------------------------------------------- helpers */
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* a point on the glacis plane, lifted `up` along its own outward normal */
  function onGlacis(s, up) {
    return { x: BREAK + GL_DX * s + GL_NX * up,
             z: DECK - GL_DZ * s + GL_NZ * up };
  }

  /* ------------------------------------------------------------ SKIN tex */
  /* One 1024 canvas carries the whole paint job.  Layout matters, because
     the lofted hull takes it at repeat 1 with cylindrical UVs: u runs nose
     to tail, v runs around the section, so v = 0.75 is the BELLY and
     u > 0.84 is the rear plate.  The dust wash therefore lives at high v
     and the turbine soot at high u, and both land where they belong on the
     real vehicle without a second material.
     The small-fitting materials sample the top-left corner at a reduced
     repeat, so that corner is kept clean: base coat, seams and bolts only.
     PAINT.green in armour3d.js is 0x3d4a30.  The old model washed it out to
     sand by laying 30 tan blotches at 0.46 alpha over it and then a dust
     gradient at 0.42 on top; the fix is to keep the disruptive tones inside
     the green family and halve the dust, not to darken the base into a
     hole.  Probed twice against the render: base 0x2b3521 measured the hull
     at (51,59,37), which put the tank two stops under the M1A2 and the
     M60A1 standing beside it and swallowed the ERA field at map zoom.
     0x3f4c2f brought the hull to (75,87,52), but the whole vehicle still
     measured a median 72 against 103 for the M60A1 and 148 for the M1A2 in
     the same three-up: right in rank order, too far down the scale to hold
     detail at map zoom.  0x4a5936 lands the median near 84 -- still the
     darkest tank of the three, which is what a Soviet green scheme should
     be, with enough range left for the brick field to read. */
  var _cv = null;
  function paintCanvas() {
    if (_cv) return _cv;
    var W = 1024, H = 1024, i, j, x, y, n, w2, h2;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var R = rng(0x80c0de);

    g.fillStyle = "#4a5936"; g.fillRect(0, 0, W, H);

    /* disruptive camouflage: low contrast, all of it inside the green
       family bar one weathered khaki, which is how a worn Soviet scheme
       actually reads at a hundred metres */
    var tones = ["#3c4a2c", "#586a33", "#646b44", "#425031"];
    for (i = 0; i < 26; i++) {
      g.globalAlpha = 0.22 + R() * 0.16;
      g.fillStyle = tones[i & 3];
      g.beginPath();
      g.ellipse(R() * W, R() * H, 46 + R() * 120, 24 + R() * 64,
                R() * 3.14, 0, 6.2832);
      g.fill();
    }
    g.globalAlpha = 1;

    /* transverse plate joins: a dark line with a lit lip above it */
    for (i = 0; i < 22; i++) {
      x = 18 + R() * (W - 36);
      g.strokeStyle = "rgba(0,0,0,0.36)"; g.lineWidth = 2.0;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
      g.strokeStyle = "rgba(198,204,178,0.10)"; g.lineWidth = 1.2;
      g.beginPath(); g.moveTo(x + 2.2, 0); g.lineTo(x + 2.2, H); g.stroke();
    }
    /* longitudinal joins: the fender line and the sponson weld, each with
       a wandering pale weld bead sitting on it */
    var lon = [0.09, 0.20, 0.33, 0.44, 0.56, 0.68, 0.81, 0.92];
    for (i = 0; i < lon.length; i++) {
      y = lon[i] * H;
      g.strokeStyle = "rgba(0,0,0,0.32)"; g.lineWidth = 2.0;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      g.strokeStyle = "rgba(186,192,166,0.12)"; g.lineWidth = 2.4;
      g.beginPath(); g.moveTo(0, y - 2.4);
      for (j = 0; j < 34; j++) g.lineTo(j * (W / 33), y - 2.4 + (R() - 0.5) * 3.2);
      g.stroke();
    }

    /* bolt and rivet rows -- geometry never, texture always */
    for (i = 0; i < 62; i++) {
      x = R() * W; y = R() * H;
      n = 5 + ((R() * 12) | 0);
      var step = 7 + R() * 5, vert = R() < 0.42;
      for (j = 0; j < n; j++) {
        var bx = vert ? x : x + j * step, by = vert ? y + j * step : y;
        g.fillStyle = "rgba(0,0,0,0.36)"; g.fillRect(bx, by, 3, 3);
        g.fillStyle = "rgba(206,212,186,0.18)"; g.fillRect(bx, by - 1, 3, 1);
      }
    }

    /* anti-slip hatching on deck sized patches */
    for (i = 0; i < 8; i++) {
      x = R() * W * 0.8; y = R() * H * 0.8; w2 = 70 + R() * 130; h2 = 50 + R() * 90;
      g.strokeStyle = "rgba(0,0,0,0.15)"; g.lineWidth = 1;
      for (j = 0; j < w2; j += 6) {
        g.beginPath(); g.moveTo(x + j, y); g.lineTo(x + j - h2 * 0.4, y + h2); g.stroke();
      }
    }

    /* paint chipping down to primer and bare steel */
    for (i = 0; i < 210; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(132,138,128,0.22)" : "rgba(62,54,40,0.28)";
      g.fillRect(R() * W, R() * H, 1 + R() * 5, 1 + R() * 2);
    }

    /* --- weathering.  Dust peaks on the belly line (v = 0.75) and falls
       off toward the flanks, so every lofted surface gets grubbier the
       lower it sits.  Held well below the old value: at 0.42 alpha it
       bleached the whole lower hull to sand. */
    var gr = g.createLinearGradient(0, 0.55 * H, 0, 0.78 * H);
    gr.addColorStop(0, "rgba(132,120,92,0.00)");
    gr.addColorStop(1, "rgba(132,120,92,0.26)");
    g.fillStyle = gr; g.fillRect(0, 0.55 * H, W, 0.23 * H);
    gr = g.createLinearGradient(0, 0.78 * H, 0, H);
    gr.addColorStop(0, "rgba(132,120,92,0.26)");
    gr.addColorStop(1, "rgba(132,120,92,0.04)");
    g.fillStyle = gr; g.fillRect(0, 0.78 * H, W, 0.22 * H);
    /* splash thrown up off the track */
    for (i = 0; i < 300; i++) {
      y = 0.58 * H + R() * 0.42 * H;
      g.fillStyle = "rgba(104,92,68," + (0.08 + R() * 0.18).toFixed(3) + ")";
      g.beginPath();
      g.ellipse(R() * W, y, 2 + R() * 9, 1.5 + R() * 5, 0, 0, 6.2832);
      g.fill();
    }
    /* rain streaks running down off every horizontal join */
    for (i = 0; i < 130; i++) {
      x = R() * W; y = R() * H * 0.9;
      g.fillStyle = "rgba(30,30,24," + (0.05 + R() * 0.10).toFixed(3) + ")";
      g.fillRect(x, y, 1 + R() * 2, 20 + R() * 90);
    }

    /* turbine soot: the GTD-1250 dumps out of the rear plate, and u > 0.84
       IS the rear plate once the loft sections are written nose-last */
    gr = g.createLinearGradient(0.84 * W, 0, W, 0);
    gr.addColorStop(0, "rgba(20,19,17,0.00)");
    gr.addColorStop(1, "rgba(20,19,17,0.50)");
    g.fillStyle = gr; g.fillRect(0.84 * W, 0, 0.16 * W, H);
    for (i = 0; i < 90; i++) {
      x = 0.84 * W + R() * 0.16 * W;
      g.fillStyle = "rgba(16,15,14," + (0.10 + R() * 0.26).toFixed(3) + ")";
      g.fillRect(x, R() * H, 2 + R() * 7, 26 + R() * 150);
    }

    _cv = cv;
    return _cv;
  }

  function skinTex(THREE, rx, ry, ox, oy) {
    try {
      var t = new THREE.CanvasTexture(paintCanvas());
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      /* r148 ships SRGBColorSpace but Texture.colorSpace does nothing until
         r152.  encoding is the only switch that works here. */
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      t.repeat.set(rx, ry);
      if (ox || oy) t.offset.set(ox || 0, oy || 0);
      return t;
    } catch (e) { return null; }
  }

  /* ---------------------------------------------------------- materials */
  function makeMats(THREE, C) {
    var T = {}, k;

    function paint(rx, ry, ox, oy, tint, flat) {
      var m = new THREE.MeshStandardMaterial(
        { color: tint === undefined ? 0xffffff : tint,
          roughness: 0.88, metalness: 0.06 });
      var t = skinTex(THREE, rx, ry, ox, oy);
      if (t) m.map = t; else m.color.setHex(0x4a5936);
      if (flat) m.flatShading = true;
      return m;
    }
    /* SKIN tier -------------------------------------------------------- */
    /* The lofted bodies take a FLAT-shaded copy.  Averaged normals turn a
       squared-off station straight back into a soft cast dome, which is the
       rounded blob this project keeps producing; flat shading is what makes
       a chamfer read as a plate edge. */
    T.skinL = paint(1, 1, 0, 0, 0xffffff, true);
    T.skinS = paint(0.26, 0.26, 0.02, 0.02);        /* small fittings      */
    /* Reactive armour.  Physically the bricks wear the same green as the
       hull; the tint here is a tenth of a stop under it, measured at
       (72,81,47) against the hull's (86,99,59).  That is not decoration.
       cmp.html and the game both light this model with no shadow map, so a
       brick painted EXACTLY the hull colour has nothing but its own side
       faces to separate it, and at map zoom the array flattens back into
       the plate.  It is honest as well: replacement cassettes are always a
       different age of paint from the tank that carries them. */
    T.era   = paint(0.15, 0.15, 0.34, 0.06, 0xa6ac96, true);

    /* METAL tier ------------------------------------------------------- */
    /* The previous build recorded 0x555b52 coming back off the render at
       (202,203,195): a material colour is LINEAR in r148, and under ACES
       with a 1.4 key over 0.5 ambient an untextured face lifts about six
       times, so a hex that looks like dark steel on paper renders as the
       brightest thing on the tank.  Measured here: 0x1a1d18 averages
       (98,103,93) and 0x101114 averages (64,66,71), which puts fittings
       just above the paint and the track just below it. */
    T.metal = new THREE.MeshStandardMaterial(
      { color: 0x1a1d18, roughness: 0.55, metalness: 0.45 });
    T.dark  = new THREE.MeshStandardMaterial(
      { color: 0x101114, roughness: 0.62, metalness: 0.40 });
    /* Rubber: tyres, skirts, dust shields, mudflaps.  Getting these DARK is
       the single biggest thing separating a T-80 from a green box, and the
       same linear-hex trap caught them twice.  0x15161a reads as black
       written down and rendered as a pale grey band lighter than the tank;
       0x0b0c0f still measured (73,77,84), brighter than the hull.  0x0a0b0d
       lands the band near (58,61,66) -- under the paint, which is where a
       rubber skirt sits in every one of the reference photographs. */
    T.rub   = new THREE.MeshStandardMaterial(
      { color: 0x0a0b0d, roughness: 0.95, metalness: 0.04 });

    /* GLASS tier ------------------------------------------------------- */
    var GC = THREE.MeshPhysicalMaterial || THREE.MeshStandardMaterial;
    T.glass = new GC({ color: 0x16202c, roughness: 0.10, metalness: 0.08,
                       transparent: true, opacity: 0.84 });

    /* Team flash.  C.team arrives as a CSS hex STRING from the game and as
       a number from cmp.html; THREE.Color eats both, and no bit arithmetic
       is done on it.  Handed over raw it burnt out to near white under the
       key light and ownership stopped reading, so the value is taken down
       and only the value -- the hue is the caller's throughout.  It stays
       in the SKIN tier because it IS paint. */
    T.team = new THREE.MeshStandardMaterial(
      { color: 0xffffff, roughness: 0.86, metalness: 0.06 });
    T.team.color.set((C && C.team !== undefined) ? C.team : 0x3f7fd0);
    T.team.color.multiplyScalar(0.36);

    /* render3d.js prepModel() runs convertSRGBToLinear on every material
       colour once unless userData._srgbDone is set.  Every value above was
       probed against cmp.html, which does NOT decode, so the flag is set
       here and the game gets exactly the tank that was tuned. */
    for (k in T) if (T[k] && T[k].userData) T[k].userData._srgbDone = true;
    return T;
  }

  /* ------------------------------------------------------- lofted bodies */
  /* M.loft emits its quads wound (a, c, b), which for its section walk puts
     the face normal radially INWARD: with a FrontSide material the outer
     skin is culled and you look through the body at its own far wall.  Flip
     the winding, recompute, keep FrontSide. */
  function body(THREE, M, secs, segs) {
    var geo = M.loft(THREE, secs, segs);
    var ix = geo.getIndex ? geo.getIndex() : null;
    if (ix && ix.array) {
      var a = ix.array, i, t;
      for (i = 0; i + 2 < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      ix.needsUpdate = true;
      geo.computeVertexNormals();
    }
    return geo;
  }
  /* stations written as (x, halfWidth, top, bottom) because a plate layout
     is easier to reason about than a centre-and-half-height */
  function stations(list, sq) {
    var out = [], i, s;
    for (i = 0; i < list.length; i++) {
      s = list[i];
      out.push({ x: s[0], w: s[1], h: (s[2] - s[3]) * 0.5,
                 zc: (s[2] + s[3]) * 0.5, sq: sq });
    }
    out.reverse();                 /* loft wants a decreasing-x walk       */
    return out;
  }

  /* --------------------------------------------------------- primitives */
  function box(THREE, p, m, w, d, h, x, y, z, rx, ry, rz) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), m);
    b.position.set(x, y, z);
    if (rx || ry || rz) b.rotation.set(rx || 0, ry || 0, rz || 0);
    p.add(b);
    return b;
  }
  /* a cylinder's own axis is +Y, which for a road wheel IS the axle: do not
     roll it a quarter turn or the tank stands on flat discs */
  function wheel(THREE, p, m, r, len, seg, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg), m);
    c.position.set(x, y, z);
    p.add(c);
    return c;
  }
  /* axis along +X, r1 at the FRONT: gun tubes, drums, cables */
  function tube(THREE, p, m, r1, r2, len, seg, x, y, z, open) {
    var c = new THREE.Mesh(
      new THREE.CylinderGeometry(r1, r2, len, seg, 1, !!open), m);
    c.rotation.z = -Math.PI / 2;
    c.position.set(x, y, z);
    p.add(c);
    return c;
  }
  /* axis along +Z: cupolas, hatch rings, masts */
  function post(THREE, p, m, r1, r2, len, seg, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), m);
    c.rotation.x = Math.PI / 2;
    c.position.set(x, y, z);
    p.add(c);
    return c;
  }

  /* Walk a plan outline and stand a course of reactive armour bricks along
     it, each pushed out along that outline's own normal and turned to face
     the way the plate faces.  The first attempt at the turret array laid
     the bricks on a circle of radius 1.28 -- INSIDE a cheek 1.32 half-wide
     -- and the whole course vanished into the casting.  Walking the real
     outline is what keeps every block proud. */
  function eraRun(THREE, p, m, poly, sd, z, out, thk, wid, hgt, pitch) {
    var k, n, q, t, px, py, nx, ny, L, dx, dy;
    for (k = 0; k < poly.length - 1; k++) {
      dx = poly[k + 1][0] - poly[k][0];
      dy = poly[k + 1][1] - poly[k][1];
      L = Math.sqrt(dx * dx + dy * dy);
      if (L < 1e-6) continue;
      nx = dy / L; ny = -dx / L;             /* outward on the +Y cheek    */
      n = Math.max(1, Math.round(L / pitch));
      for (q = 0; q < n; q++) {
        t = (q + 0.5) / n;
        px = poly[k][0] + dx * t + nx * out;
        py = poly[k][1] + dy * t + ny * out;
        box(THREE, p, m, thk, wid, hgt, px, sd * py, z,
            0, 0, Math.atan2(sd * ny, nx));
      }
    }
  }

  /* ================================================================ HULL */
  function buildHull(THREE, M, g, T) {
    var i, s;

    /* Upper body: a flat deck of constant beam from the tail to the deck
       break, then the long shallow glacis down to the beak.  Repeated
       stations are creases -- the zero-area quad between the twin rings
       contributes no normal, so computeVertexNormals stops averaging the
       deck into the glacis and the fold comes out hard.
       sq is well BELOW 1 so the section squares off.  It does not square as
       hard as the number suggests once a station is wide and shallow: the
       exponent acts in normalised space, so 0.34 on a 3.38 m beam gives a
       0.40 m shoulder chamfer and reads as a loaf.  0.11 gives a crisp
       deck edge. */
    g.add(new THREE.Mesh(body(THREE, M, stations([
      [X_TAIL, 1.58, 1.440, 0.940],
      [-3.42,  1.66, 1.440, 0.900],
      [-3.40,  1.66, 1.440, 0.900],
      [-2.20,  1.69, 1.440, 0.880],
      [ 0.60,  1.69, 1.440, 0.880],
      [ 1.38,  1.69, 1.440, 0.880],
      [ 1.40,  1.69, 1.435, 0.880],
      [ 2.20,  1.67, 1.080, 0.860],
      [ 2.80,  1.58, 0.810, 0.760],
      [ 3.10,  1.34, 0.700, 0.670],
      [X_NOSE, 0.92, 0.630, 0.615]
    ], 0.11), 22), T.skinL));

    /* Lower tub between the tracks.  Mostly hidden by the running gear, but
       it closes the hull under the beak and stops daylight under the
       sponsons. */
    g.add(new THREE.Mesh(body(THREE, M, stations([
      [-3.42, 1.02, 0.930, 0.470],
      [-3.20, 1.10, 0.930, 0.450],
      [-1.00, 1.10, 0.930, 0.445],
      [ 1.40, 1.10, 0.930, 0.445],
      [ 2.55, 1.06, 0.900, 0.450],
      [ 3.00, 0.90, 0.760, 0.520],
      [ 3.24, 0.60, 0.640, 0.600]
    ], 0.18), 14), T.skinL));

    /* A lofted section is only ever widest at its own mid height, so left
       alone the deck corners droop and the tank reads as a loaf from above.
       The deck plate is what makes the plan view a rectangle. */
    var dp = new THREE.Mesh(M.slab(THREE,
      [[1.40, HW], [-3.24, HW], [-3.48, 1.42], [-3.48, -1.42],
       [-3.24, -HW], [1.40, -HW]], 0.17), T.skinL);
    dp.position.z = DECK - 0.16;
    g.add(dp);

    /* The glacis as one flat plate carried out to the full beam.  Its outer
       face is what the Kontakt-5 array is bolted to.  M.slab lays the shape
       in XY and extrudes along +Z, so after RY(GL_ANG) the shape's own x
       runs DOWN the slope and the extrusion runs out along the normal. */
    var gp = new THREE.Mesh(M.slab(THREE,
      [[0.02, HW], [1.45, 1.66], [1.86, 1.34], [2.02, 0.84],
       [2.02, -0.84], [1.86, -1.34], [1.45, -1.66], [0.02, -HW]], 0.13),
      T.skinL);
    gp.rotation.y = GL_ANG;
    gp.position.set(BREAK - GL_NX * 0.132, 0, DECK - GL_NZ * 0.132);
    g.add(gp);

    /* rear plate, nose cap, and the crisp fender line that separates hull
       from track in every side-on photograph */
    box(THREE, g, T.skinL, 0.09, 3.14, 0.98, X_TAIL - 0.02, 0, 1.00);
    box(THREE, g, T.skinS, 0.08, 1.64, 0.10, X_NOSE + 0.15, 0, 0.565);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, T.skinS, 6.62, 0.12, 0.07, -0.20, s * 1.715, 1.415);
      /* fender plate over the front of the track, raked onto the glacis */
      box(THREE, g, T.skinS, 1.24, 0.62, 0.07, 2.62, s * 1.40, 1.28, 0, 0.19, 0);
      /* rear fender plate over the sprocket */
      box(THREE, g, T.skinS, 0.90, 0.62, 0.07, -3.02, s * 1.40, 1.41);
    }

    /* driver's station.  He sits on the centreline at the top of the
       glacis; the hatch is a shallow disc let into the plate with the
       centre periscope in front of it and a wiper guard each side. */
    var h = onGlacis(0.170, 0.055);
    post(THREE, g, T.skinS, 0.29, 0.30, 0.09, 14, h.x, 0, h.z);
    var hr = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.05, 16), T.skinS);
    hr.rotation.set(Math.PI / 2, 0, 0); hr.rotation.y = GL_ANG;
    hr.position.set(h.x - GL_NX * 0.03, 0, h.z - GL_NZ * 0.03);
    g.add(hr);
    var hp = onGlacis(0.085, 0.10);
    box(THREE, g, T.glass, 0.06, 0.24, 0.10, hp.x, 0, hp.z, 0, GL_ANG, 0);
    for (i = -1; i <= 1; i += 2) {
      var sp = onGlacis(0.085, 0.09);
      box(THREE, g, T.skinS, 0.10, 0.19, 0.09, sp.x, i * 0.30, sp.z, 0, GL_ANG, 0);
    }

    /* tow eyes on the beak and lifting eyes at the tail */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, T.metal, 0.24, 0.11, 0.17, X_NOSE + 0.10, s * 0.62, 0.60);
    }
  }

  /* ============================================ KONTAKT-5 ON THE GLACIS */
  /* Four courses of bricks laid square across the plate, notched around the
     driver's hatch, a course of wedges along the nose lip, and a pair of
     blocks turned out over each fender so the field wraps the shoulder the
     way it does in the Alabino and Pyshma photographs.  This array is the
     single most recognisable thing on the vehicle and the old model did not
     have it -- it had it, and then merged it away. */
  function buildGlacisEra(THREE, g, T) {
    var r, c, i, s, p, q;
    var rows = [0.130, 0.325, 0.520, 0.715];
    var BL = 0.345, BWD = 0.345, BT = 0.115, PITCH = 0.400;

    for (r = 0; r < rows.length; r++) {
      for (c = 0; c < 7; c++) {
        if (c === 3 && r < 2) continue;            /* driver's hatch notch */
        p = onGlacis(rows[r], 0.055 + BT * 0.5);
        box(THREE, g, T.era, BL, BWD, BT,
            p.x, (c - 3) * PITCH, p.z, 0, GL_ANG, 0);
      }
    }
    /* the course of wedges along the very front lip of the nose */
    for (c = 0; c < 4; c++) {
      p = onGlacis(0.905, 0.050 + 0.05);
      box(THREE, g, T.era, 0.24, 0.46, 0.10,
          p.x, (c - 1.5) * 0.545, p.z, 0, GL_ANG, 0);
    }
    /* blocks canted out over each fender top */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) {
        q = onGlacis(0.26 + i * 0.26, 0.03);
        box(THREE, g, T.era, 0.36, 0.30, 0.11,
            q.x, s * 1.52, q.z + 0.10, s * 0.58, GL_ANG, 0);
      }
      /* and the flat course carried back onto the deck ahead of the ring */
      box(THREE, g, T.era, 0.36, 0.40, 0.11, 1.16, s * 0.88, DECK + 0.055);
      box(THREE, g, T.era, 0.36, 0.40, 0.11, 1.16, s * 0.44, DECK + 0.055);
    }
    box(THREE, g, T.era, 0.36, 0.40, 0.11, 1.16, 0, DECK + 0.055);

    /* Headlamps, sitting ON the glacis where the array leaves a gap.  The
       first pass hung them off onGlacis(0.30, 0.10) and then added 0.14 in
       x and 0.20 in z on top, which put both lamps 0.37 m clear of the
       plate: two grey drums floating in front of the tank.  The lift is
       part of the onGlacis call now, so they cannot drift again. */
    for (s = -1; s <= 1; s += 2) {
      p = onGlacis(0.365, 0.170);
      tube(THREE, g, T.metal, 0.112, 0.118, 0.19, 12, p.x, s * 0.98, p.z);
      var lens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.096, 0.096, 0.04, 12), T.glass);
      lens.rotation.z = -Math.PI / 2;
      lens.position.set(p.x + 0.10, s * 0.98, p.z);
      g.add(lens);
      box(THREE, g, T.metal, 0.05, 0.26, 0.05, p.x + 0.06, s * 0.98, p.z + 0.17);
    }
  }

  /* ============================================ HULL SIDE REACTIVE ARMOUR */
  /* The forward half of each skirt carries its own row of heavy cassettes.
     From the side that band of boxes above the wheels is the second thing
     that says T-80U, after the glacis. */
  function buildSideEra(THREE, g, T) {
    var s, i;
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) {
        box(THREE, g, T.era, 0.50, 0.10, 0.40,
            2.24 - i * 0.58, s * (SK_Y + 0.075), 1.13);
      }
    }
  }

  /* ====================================================== RUNNING GEAR   */
  /* Six road wheels, idler FORWARD, drive sprocket at the REAR, five small
     return rollers.  Getting the sprocket to the front is the fastest way
     to turn a T-80 into something else. */
  function buildRunningGear(THREE, g, T) {
    var s, i;

    /* The belt as a closed path in side profile.  Written as a path rather
       than two straight slabs so it climbs UP and OVER the raised rear
       sprocket, which is most of how rear drive reads at a glance.  Walked
       counter-clockwise in XZ, so the OUTWARD normal is the tangent turned
       -90 deg: get that backwards and the ground pads sit on top of the
       belt. */
    var P = [
      [-2.10, 0.050], [ 2.55, 0.050],
      [ 3.02, 0.071], [ 3.20, 0.310], [ 3.02, 0.729],
      [ 2.40, 0.930], [-2.30, 1.030],
      [-2.86, 1.100], [-3.28, 0.900], [-3.32, 0.500], [-2.96, 0.180]
    ];

    /* Walk the loop once and measure it, then lay REAL LINKS along it at a
       fixed pitch instead of a slab per path segment with pads scattered on
       top.  The first build did it the other way and spent ninety-eight
       separate meshes on pads alone -- a fifth of the whole model on a band
       four pixels deep at map zoom.  One box per link is the same read for
       half the parts, and alternating the material and the depth link by
       link gives the grouser pattern for nothing. */
    var segd = [], cum = [0], total = 0;
    for (i = 0; i < P.length; i++) {
      var a = P[i], b = P[(i + 1) % P.length];
      var ddx = b[0] - a[0], ddz = b[1] - a[1];
      var len = Math.sqrt(ddx * ddx + ddz * ddz);
      segd.push({ x: a[0], z: a[1], dx: ddx, dz: ddz, L: len });
      total += len; cum.push(total);
    }
    var nlink = Math.round(total / 0.630), pitch = total / nlink;

    for (s = -1; s <= 1; s += 2) {
      var y = s * TY;

      for (i = 0; i < nlink; i++) {
        var d = (i + 0.5) * pitch, q = 0;
        while (q < segd.length - 1 && cum[q + 1] < d) q++;
        var sg = segd[q], f = sg.L > 1e-6 ? (d - cum[q]) / sg.L : 0;
        var th = Math.atan2(sg.dz, sg.dx);
        var deep = (i & 1) === 1;
        box(THREE, g, deep ? T.metal : T.dark,
            pitch * 0.94, BW, deep ? TT * 1.30 : TT,
            sg.x + sg.dx * f, y, sg.z + sg.dz * f, 0, -th, 0);
      }

      /* six road wheels: black rubber tyre, dished disc standing proud of
         it on the outer face, hub cap in the middle */
      for (i = 0; i < WX.length; i++) {
        wheel(THREE, g, T.rub, WR, BW * 0.86, 14, WX[i], y, WZ);
        wheel(THREE, g, T.skinS, WR * 0.74, BW * 0.96, 12, WX[i], y, WZ);
        wheel(THREE, g, T.dark, WR * 0.20, BW * 1.02, 8, WX[i], y, WZ);
      }

      /* return rollers carrying the top run, small and rubber tyred */
      for (i = 0; i < RRX.length; i++)
        wheel(THREE, g, T.rub, RRR, 0.20, 10, RRX[i], y, RRZ);

      /* front idler, on the same line as the road wheels */
      wheel(THREE, g, T.dark, IDL.r, BW * 0.82, 14, IDL.x, y, IDL.z);
      wheel(THREE, g, T.skinS, IDL.r * 0.58, BW * 0.94, 10, IDL.x, y, IDL.z);

      /* REAR drive sprocket: hub, centre boss and real teeth */
      wheel(THREE, g, T.dark, SPR.r, BW * 0.64, 14, SPR.x, y, SPR.z);
      wheel(THREE, g, T.metal, SPR.r * 0.40, BW * 0.88, 8, SPR.x, y, SPR.z);
      for (i = 0; i < 8; i++) {
        var ang = i * Math.PI * 2 / 8;
        box(THREE, g, T.metal, 0.12, BW * 0.58, 0.15,
            SPR.x + Math.cos(ang) * SPR.tr, y,
            SPR.z + Math.sin(ang) * SPR.tr, 0, -ang, 0);
      }
      /* final drive housing where the sprocket enters the hull */
      wheel(THREE, g, T.skinS, 0.30, 0.24, 12, SPR.x, s * (TY - 0.42), SPR.z);
    }
  }

  /* =========================================================== SKIRTS    */
  /* Segmented RUBBER side skirts.  In every line photograph they are the
     black band under the fender, not a painted steel plate, and the front
     dust shield hanging ahead of the idler is the same material. */
  function buildSkirts(THREE, M, g, T) {
    var s, i;
    var x0 = -2.98, x1 = 2.58, gap = 0.035;
    var segN = 6, segW = ((x1 - x0) - gap * (segN - 1)) / segN;
    var mid = (SK_TOP - 0.08 + SK_BOT) * 0.5, hgt = SK_TOP - SK_BOT - 0.08;

    for (s = -1; s <= 1; s += 2) {
      var yc = s * SK_Y;
      /* the hanger rail every segment bolts to */
      box(THREE, g, T.skinS, x1 - x0 + 0.08, SK_TH * 1.6, 0.10,
          (x0 + x1) * 0.5, yc, SK_TOP - 0.03);
      for (i = 0; i < segN; i++) {
        var sx = x0 + segW * 0.5 + i * (segW + gap);
        box(THREE, g, T.rub, segW, SK_TH, hgt, sx, yc, mid);
        /* the bracket at each joint keeps the segmentation reading at zoom */
        if (i < segN - 1)
          box(THREE, g, T.metal, 0.05, SK_TH * 2.0, hgt - 0.06,
              sx + segW * 0.5 + gap * 0.5, yc, mid);
      }
      /* the big angled dust shield ahead of the idler.  It hangs in the
         PLANE of the track, so it is thin across the beam: built the other
         way up it stood 0.20 m proud and measured the tank out at 3.92 m
         over the skirts against a real 3.60 m. */
      box(THREE, g, T.rub, 0.76, SK_TH * 1.4, 0.86, 2.86, yc, 0.74, 0, 0.20, 0);
      /* rear mudflap behind the sprocket */
      box(THREE, g, T.rub, 0.06, 0.56, 0.52, -3.56, s * 1.36, 0.42);
    }

    /* the broad rubber apron slung under the beak, in four panels so it
       flogs the way the real one does -- unmistakable head on */
    for (i = 0; i < 4; i++)
      box(THREE, g, T.rub, 0.07, 0.52, 0.56, X_NOSE + 0.06, (i - 1.5) * 0.545, 0.30);
    box(THREE, g, T.metal, 0.06, 2.24, 0.07, X_NOSE + 0.05, 0, 0.56);
  }

  /* ======================================================== DECK AND TAIL */
  function buildDeck(THREE, g, T) {
    var i, s;

    /* turret ring collar */
    post(THREE, g, T.skinS, 1.17, 1.21, 0.10, 20, TUR.x, 0, DECK - 0.02);

    /* engine deck: the GTD-1250's intake stack and its louvre field */
    box(THREE, g, T.skinS, 2.00, 2.84, 0.07, -2.30, 0, DECK + 0.035);
    for (i = 0; i < 5; i++)
      box(THREE, g, T.dark, 0.15, 2.60, 0.09, -1.52 - i * 0.34, 0, DECK + 0.085);
    box(THREE, g, T.skinS, 0.84, 1.68, 0.16, -2.26, 0, DECK + 0.145);
    for (i = 0; i < 3; i++)
      box(THREE, g, T.dark, 0.11, 1.54, 0.05, -2.54 + i * 0.26, 0, DECK + 0.235);

    /* the turbine exhaust grille, low on the rear plate and left of centre */
    box(THREE, g, T.skinS, 0.09, 0.98, 0.46, X_TAIL - 0.07, 0.56, 1.10);
    for (i = 0; i < 3; i++)
      box(THREE, g, T.dark, 0.05, 0.92, 0.06, X_TAIL - 0.12, 0.56, 0.96 + i * 0.14);

    /* filler caps and deck hatches */
    for (i = 0; i < 2; i++)
      post(THREE, g, T.metal, 0.13, 0.13, 0.05, 10, -1.18 - i * 0.62,
           (i & 1) ? 1.14 : -1.14, DECK + 0.035);

    /* tow cables down each flank, and the stowage bins they run over */
    for (s = -1; s <= 1; s += 2) {
      tube(THREE, g, T.metal, 0.042, 0.042, 3.40, 6, -0.90, s * 1.655, 1.36);
      box(THREE, g, T.skinS, 0.86, 0.28, 0.32, -0.62, s * 1.56, DECK + 0.17);
      box(THREE, g, T.skinS, 0.58, 0.28, 0.28, 0.42, s * 1.56, DECK + 0.15);
    }

    /* the unditching log, chained across the rear plate */
    tube(THREE, g, T.metal, 0.11, 0.11, 0.30, 8, -3.66, 0, 0.78);
    var log = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.115, 2.40, 10), T.skinS);
    log.position.set(-3.68, 0, 0.78);
    g.add(log);
    for (s = -1; s <= 1; s += 2)
      box(THREE, g, T.metal, 0.20, 0.07, 0.30, -3.62, s * 0.92, 0.80);

    /* external long-range fuel drums on the rear plate brackets: Pact
       standard fit and a period cue in its own right */
    for (s = -1; s <= 1; s += 2) {
      tube(THREE, g, T.skinS, 0.255, 0.255, 0.82, 14, -3.86, s * 1.10, 1.16);
      tube(THREE, g, T.metal, 0.270, 0.270, 0.05, 12, -3.50, s * 1.10, 1.16, true);
      tube(THREE, g, T.metal, 0.270, 0.270, 0.05, 12, -4.22, s * 1.10, 1.16, true);
      /* the cradle and its strap */
      box(THREE, g, T.metal, 0.62, 0.08, 0.14, -3.86, s * 0.84, 1.06);
    }
  }

  /* =========================================================== TURRET    */
  function buildTurret(THREE, M, T) {
    var t = new THREE.Group();
    t.name = "turret";                 /* the renderer rotates this by name */
    t.position.set(TUR.x, 0, TUR.z);
    var i, s, a;

    /* The casting.  Rounded in plan and in section -- a T-80U turret IS a
       rounded casting, and it is the reactive armour bolted to it that
       gives the vehicle its angular front, not the shell underneath. */
    t.add(new THREE.Mesh(body(THREE, M, stations([
      [-1.55, 0.95, 0.520, -0.10],
      [-1.34, 1.10, 0.580, -0.10],
      [-0.90, 1.24, 0.660, -0.10],
      [-0.30, 1.32, 0.700, -0.10],
      [ 0.22, 1.30, 0.700, -0.10],
      [ 0.70, 1.16, 0.680, -0.10],
      [ 1.05, 0.92, 0.630, -0.06],
      [ 1.28, 0.62, 0.540,  0.04]
    ], 0.50), 22), T.skinL));

    /* flat roof plate, same argument as the hull deck */
    var rp = new THREE.Mesh(M.slab(THREE,
      [[1.02, 0.86], [0.60, 1.18], [0.00, 1.30], [-0.70, 1.26],
       [-1.20, 1.10], [-1.52, 0.88], [-1.52, -0.88], [-1.20, -1.10],
       [-0.70, -1.26], [0.00, -1.30], [0.60, -1.18], [1.02, -0.86]], 0.15),
      T.skinL);
    rp.position.z = 0.70 - 0.14;
    t.add(rp);

    /* ---- Kontakt-5 on the turret front.  Two heavy courses swept round
       each cheek and a flat course laid along the front roof edge.  This is
       the brow that makes a T-80U read as a T-80U from three quarters on,
       and beside the M1A2 it is the whole difference between a Soviet tank
       and a green wedge. */
    var cheek = [[1.24, 0.50], [1.06, 0.88], [0.72, 1.14], [0.24, 1.29],
                 [-0.24, 1.33]];
    var brow  = [[0.98, 0.42], [0.82, 0.78], [0.52, 1.02], [0.14, 1.16]];

    for (s = -1; s <= 1; s += 2) {
      eraRun(THREE, t, T.era, cheek, s, 0.11, 0.07, 0.26, 0.31, 0.34, 0.36);
      eraRun(THREE, t, T.era, cheek, s, 0.50, 0.03, 0.22, 0.31, 0.28, 0.36);
      eraRun(THREE, t, T.era, brow,  s, 0.745, 0.00, 0.34, 0.28, 0.13, 0.34);
      /* the big brow wedge hard against the mantlet */
      box(THREE, t, T.era, 0.40, 0.30, 0.40, 1.16, s * 0.30, 0.24, 0, 0, s * 0.34);
    }
    /* two blocks close the roof course across the centreline */
    for (i = -1; i <= 1; i += 2)
      box(THREE, t, T.era, 0.34, 0.26, 0.13, 0.96, i * 0.16, 0.745);

    /* ---- side rails: applique boxes and stowage down each flank */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++)
        box(THREE, t, T.skinS, 0.44, 0.14, 0.30, -0.26 - i * 0.52, s * 1.26, 0.30);
      box(THREE, t, T.metal, 1.30, 0.05, 0.05, -0.64, s * 1.20, 0.56);
    }

    /* ---- bustle: stowage rack, boxes and the OPVT snorkel stowed across
       it, exactly as it is carried in the Park Patriot photograph */
    box(THREE, t, T.skinS, 0.20, 1.46, 0.32, -1.66, 0, 0.32);
    for (i = 0; i < 3; i++)
      box(THREE, t, T.metal, 0.10, 1.52, 0.05, -1.76, 0, 0.17 + i * 0.16);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, t, T.skinS, 0.44, 0.38, 0.28, -1.24, s * 0.84, 0.76);
    }
    var sn = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.105, 1.40, 10), T.metal);
    sn.position.set(-1.60, 0, 0.60);
    t.add(sn);

    /* ---- mantlet: the canvas boot over the trunnions */
    t.add(new THREE.Mesh(body(THREE, M, [
      { x: 1.62, w: 0.20, h: 0.18, zc: GUN_Z, sq: 0.90 },
      { x: 1.52, w: 0.28, h: 0.22, zc: GUN_Z, sq: 0.85 },
      { x: 1.36, w: 0.46, h: 0.30, zc: GUN_Z, sq: 0.75 },
      { x: 1.14, w: 0.62, h: 0.36, zc: GUN_Z, sq: 0.72 },
      { x: 0.94, w: 0.68, h: 0.40, zc: GUN_Z, sq: 0.72 }
    ], 14), T.skinL));

    /* ---- 2A46M-1, 125 mm.  Thermal sleeve in two sections with the fat
       bore evacuator standing proud between them, then the bare tube out to
       the muzzle.  The barrel is PAINTED, not bright steel: on every T-80U
       photograph it is the same green as the turret. */
    tube(THREE, t, T.skinS, 0.150, 0.158, 1.08, 14, 2.10, 0, GUN_Z, true);
    tube(THREE, t, T.metal, 0.170, 0.170, 0.07, 12, 2.67, 0, GUN_Z, true);
    tube(THREE, t, T.skinS, 0.138, 0.144, 0.70, 14, 3.06, 0, GUN_Z, true);
    tube(THREE, t, T.skinS, 0.205, 0.150, 0.10, 14, 3.46, 0, GUN_Z, true);
    tube(THREE, t, T.skinS, 0.205, 0.205, 0.52, 14, 3.77, 0, GUN_Z, true);
    tube(THREE, t, T.skinS, 0.112, 0.205, 0.10, 14, 4.08, 0, GUN_Z, true);
    tube(THREE, t, T.skinS, 0.098, 0.104, 1.34, 12, 4.80, 0, GUN_Z, true);
    tube(THREE, t, T.metal, 0.114, 0.114, 0.18, 14, 5.56, 0, GUN_Z);

    /* ---- commander's station, RIGHT hand side (-Y).  Cupola, all round
       vision blocks, the PZU-7 sight and the NSVT 12.7 mm on its ring with
       the ammunition box and the curved splinter shield behind it. */
    post(THREE, t, T.skinS, 0.42, 0.44, 0.15, 14, -0.08, -0.62, 0.74);
    post(THREE, t, T.skinS, 0.37, 0.37, 0.09, 14, -0.08, -0.62, 0.86);
    for (i = 0; i < 4; i++) {
      a = -1.35 + i * 0.72;
      box(THREE, t, T.glass, 0.10, 0.17, 0.11,
          -0.08 + 0.42 * Math.cos(a), -0.62 + 0.42 * Math.sin(a), 0.78, 0, 0, a);
    }
    box(THREE, t, T.skinS, 0.32, 0.28, 0.30, 0.10, -0.94, 1.00);
    box(THREE, t, T.glass, 0.05, 0.22, 0.16, 0.27, -0.94, 1.03);
    box(THREE, t, T.metal, 0.16, 0.14, 0.28, -0.08, -0.62, 1.02);
    /* the gun itself: receiver, barrel, flash hider, ammunition box */
    box(THREE, t, T.metal, 0.52, 0.14, 0.16, 0.06, -0.62, 1.22);
    tube(THREE, t, T.metal, 0.034, 0.038, 0.82, 8, 0.72, -0.62, 1.24);
    tube(THREE, t, T.metal, 0.052, 0.052, 0.12, 8, 1.18, -0.62, 1.24);
    box(THREE, t, T.metal, 0.16, 0.06, 0.22, 0.26, -0.62, 1.09);
    box(THREE, t, T.skinS, 0.26, 0.24, 0.24, -0.22, -0.44, 1.22);
    /* the curved splinter shield, three plates so it reads as a curve */
    box(THREE, t, T.skinS, 0.06, 0.36, 0.34, 0.30, -0.44, 1.32, 0, -0.30, 0);
    box(THREE, t, T.skinS, 0.06, 0.30, 0.34, 0.24, -0.78, 1.32, 0, -0.30, 0.45);
    box(THREE, t, T.skinS, 0.06, 0.26, 0.30, -0.02, -0.98, 1.28, 0, -0.20, 0.95);

    /* ---- gunner's station, LEFT hand side (+Y) */
    post(THREE, t, T.skinS, 0.34, 0.35, 0.11, 14, -0.30, 0.58, 0.73);
    post(THREE, t, T.skinS, 0.30, 0.30, 0.08, 12, -0.30, 0.58, 0.82);
    box(THREE, t, T.glass, 0.10, 0.20, 0.10, 0.00, 0.58, 0.78);
    /* 1G46 day sight: the big square head ahead of the gunner with its
       hinged armoured lid -- a strong roof silhouette on this mark */
    box(THREE, t, T.skinS, 0.50, 0.44, 0.30, 0.40, 0.46, 0.83);
    box(THREE, t, T.glass, 0.05, 0.32, 0.20, 0.66, 0.46, 0.85);
    box(THREE, t, T.skinS, 0.52, 0.46, 0.05, 0.38, 0.46, 1.00, 0, -0.18, 0);
    /* the domed periscope head behind it */
    post(THREE, t, T.skinS, 0.13, 0.14, 0.12, 12, -0.06, 0.92, 0.79);
    /* TPN-4 night channel, right of the gun */
    box(THREE, t, T.skinS, 0.34, 0.30, 0.26, 0.54, -0.32, 0.81);
    box(THREE, t, T.glass, 0.05, 0.22, 0.16, 0.72, -0.32, 0.83);
    /* the round IR illuminator beside the mantlet */
    tube(THREE, t, T.metal, 0.16, 0.16, 0.20, 12, 0.94, -0.78, 0.44);
    var ir = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.04, 12), T.glass);
    ir.rotation.z = -Math.PI / 2;
    ir.position.set(1.05, -0.78, 0.44);
    t.add(ir);

    /* ---- 902B Tucha smoke dischargers, a bank of four each side of the
       turret front, sitting on top of the forward reactive armour and
       canted out and up the way they are on every line photograph */
    for (s = -1; s <= 1; s += 2) {
      var bank = new THREE.Group();
      /* the first pass parked the bank at y = 1.14 on a cheek 1.18 wide and
         z = 0.62 against an upper ERA course whose top is 0.64: three of
         the four tubes were inside the armour.  It stands on a bracket
         clear of both now. */
      bank.position.set(0.50, s * 1.30, 0.70);
      bank.rotation.set(0, -0.44, s * 0.52);
      box(THREE, bank, T.skinS, 0.16, 0.70, 0.11, -0.02, 0, -0.10);
      for (i = 0; i < 4; i++)
        tube(THREE, bank, T.metal, 0.062, 0.062, 0.36, 8, 0.04, (i - 1.5) * 0.170, 0);
      t.add(bank);
    }

    /* ---- masts.  The whip is most of what tells a moving tank from a
       parked one at RTS zoom; the little cross on the short mast is the
       DVE-BS wind sensor, which is a T-80U roof fitting in its own right. */
    post(THREE, t, T.metal, 0.012, 0.036, 1.55, 6, -1.30, 0.82, 1.44);
    post(THREE, t, T.metal, 0.055, 0.075, 0.14, 8, -1.30, 0.82, 0.72);
    post(THREE, t, T.metal, 0.022, 0.026, 0.52, 6, -1.20, -0.62, 0.94);
    box(THREE, t, T.metal, 0.30, 0.04, 0.03, -1.20, -0.62, 1.19);
    box(THREE, t, T.metal, 0.04, 0.30, 0.03, -1.20, -0.62, 1.19);


    /* ---- team flash.  Small, flat and high on the flanks where an RTS
       camera can always see it, plus a panel on the bustle rear. */
    for (s = -1; s <= 1; s += 2)
      box(THREE, t, T.team, 0.44, 0.05, 0.15, -0.78, s * 1.29, 0.52);
    box(THREE, t, T.team, 0.05, 0.52, 0.16, -1.78, 0, 0.44);

    return t;
  }

  /* =========================================================== ASSEMBLY  */
  function build(THREE, M, C) {
    var T = makeMats(THREE, C);
    var g = new THREE.Group();
    g.name = "t80u";
    var s;

    buildHull(THREE, M, g, T);
    buildGlacisEra(THREE, g, T);
    buildSideEra(THREE, g, T);
    buildRunningGear(THREE, g, T);
    buildSkirts(THREE, M, g, T);
    buildDeck(THREE, g, T);

    /* hull team flash: the rear plate panel you see when the tank drives
       away from you, and a band on the rear fender */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, T.team, 0.06, 0.46, 0.18, X_TAIL - 0.08, s * 1.02, 1.30);
      box(THREE, g, T.team, 0.62, 0.05, 0.13, -2.30, s * (SK_Y + 0.03), 1.16);
    }

    g.add(buildTurret(THREE, M, T));

    g.traverse(function (o) {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    return g;
  }

  return { build: build };
})();

/* A hero model replaces whatever parametric version armour3d.js made.
   len is the MEASURED x extent, muzzle to fuel drum, not the catalogue
   hull length: render3d.js normalises on the measurement anyway. */
UNIT_MODELS["pact_e80_mbt"] = { len: 10.08, build: HeroT80U.build };
