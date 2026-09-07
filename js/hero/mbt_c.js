/* ================== js/hero/mbt_c.js ==================================
   HERO reference model - ZTZ-99A (Type 99A) main battle tank.  Era e20,
   PLA.  Hand built to be the style and period anchor for the whole e20
   armour roster; the parametric vehicles in armour3d.js get tuned to
   match this, not the other way round.

   Model space follows the house contract and models3d.js:
     +X nose / front, +Y left, +Z up, real metres, ground at z = 0.
   render3d.js lays the model down with rotation.x = -PI/2 and rescales
   by the MEASURED x extent, so the gun overhang is authored real -
   exactly as the parametric tanks do it.

   What identifies a 99A at a glance, and therefore what this file spends
   its polygons on:
     - six road wheels, drive sprocket at the REAR and raised well above
       the road wheel line, idler low at the front;
     - heavy segmented side skirts, six removable panels a side behind a
       thicker angled forward section;
     - a big slab-sided welded turret with a VERY deep bustle running
       most of the way back over the engine deck;
     - the arrow: a chevron of thick applique/ERA blocks bolted across
       the turret front in three stepped bands, the outline that makes
       the turret read as an arrowhead from above;
     - the commander's panoramic sight standing tall on the right of the
       roof, gunner's sight box on the left, 12.7 mm on the cupola;
     - external fuel drums across the tail plate.

   Materials are the three contract tiers only: SKIN (the procedural camo
   CanvasTexture, plus one untextured SKIN-tier variant in the team colour
   for the ownership flashes), METAL (with a rubber variant of the same
   tier for the track and tyres) and GLASS.
   ASCII only in this file - a stray character inside a hex literal has
   broken this project before.
   ====================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMbtC = (function () {
  "use strict";

  /* ------------------------------------------------- vehicle dimensions */
  var NOSE = 3.75, TAIL = -3.85;      /* hull, 7.60 m nose to tail plate  */
  var DECK = 1.50;                    /* hull roof                        */
  var FEND = 1.28;                    /* fender line = top of the skirts  */

  var TY = 1.44, BELT_HW = 0.28, BELT_T = 0.09;   /* track belt           */
  var RW = 0.35, WZ = BELT_T + RW;                /* road wheel + centre  */
  var WHEEL_X = [2.48, 1.52, 0.56, -0.40, -1.36, -2.32];
  var IDL = { x: 3.36, z: BELT_T * 0.5 + 0.31 + BELT_T * 0.5, r: 0.31 };
  var SPR = { x: -3.34, z: 0.92, r: 0.33 };       /* REAR drive sprocket  */

  var TUR_X = 0.16;                   /* turret ring, just ahead of mid   */

  /* glacis: one very long shallow plate off an almost ground level nose  */
  var GB_X = 1.30, GB_Z = DECK;       /* glacis break at the turret front */
  var GN_X = 3.75, GN_Z = 0.70;       /* nose                             */
  var GL_SLOPE = (GN_Z - GB_Z) / (GN_X - GB_X);
  var GL_ROT = Math.atan(-GL_SLOPE);  /* rotation.y that lays a box on it */
  function glacisZ(x) { return GB_Z + GL_SLOPE * (x - GB_X); }

  /* ---------------------------------------------------------- palette */
  /* Straight out of the PAINT table at the top of js/armour3d.js. The
     spec row for mbt_c asks for "twotone"; the disruptive tones are that
     scheme's own secondaries plus the table's green / olive / desert, so
     the digital pattern is mixed from published values and not invented. */
  var PAINT = {
    base:  0x6b6f63,   /* armour3d PAINT.twotone                          */
    green: 0x3d4a30,   /* armour3d PAINT.green                            */
    sand:  0xb0a07c,   /* armour3d PAINT.desert                           */
    olive: 0x4a5236,   /* armour3d PAINT.olive                            */
    dark:  0x4d5148,   /* armour3d twotone secondary, dark                */
    dgrn:  0x2c3826,   /* armour3d SEC.green, dark                         */
    lite:  0x7d8377    /* armour3d twotone secondary, light               */
  };

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }

  /* Deepen and saturate a colour before it is handed to a material. The
     renderer's ACES pass plus the strong key light drags every mid tone
     toward white: the team blue 0x3f7fd0 measured on screen as a nearly
     neutral pale grey, so ownership did not read at all. Pushing each
     channel down against the brightest one restores the hue and comes
     back out of the tone mapper as the colour that was asked for. */
  function punch(c) {
    var r = (c >> 16) & 255, g = (c >> 8) & 255, b = c & 255;
    var mx = Math.max(1, r, g, b), k = 0.85;
    r = Math.round(mx * Math.pow(r / mx, 2.2) * k);
    g = Math.round(mx * Math.pow(g / mx, 2.2) * k);
    b = Math.round(mx * Math.pow(b / mx, 2.2) * k);
    return (r << 16) | (g << 8) | b;
  }

  /* ------------------------------------------------------- the skin map */
  /* One 1024 canvas: PLA digital camouflage quantised onto a 64 cell grid,
     then plate seams, bolt rows and weathering that gets heavier low down
     and behind the exhaust. The hull and turret lofts carry cylindrical
     UVs (u along the length from the tail, v around the section, so the
     belly sits near v = 0.75 and the tail near u = 0) which is what the
     dirt and soot are aimed at. */
  var _tex;
  function skinTex(THREE) {
    if (_tex !== undefined) return _tex;
    _tex = null;
    try {
      var SZ = 1024, N = 64, CELL = SZ / N;
      var cv = document.createElement("canvas");
      cv.width = SZ; cv.height = SZ;
      var g = cv.getContext("2d");
      var R = rngFor(0x99a1);
      /* Every tone here is a published value out of the armour3d PAINT
         table or one of its own secondaries - nothing invented. What IS
         tuned is the MIX: an even spread of five tones came out of the
         ACES tone mapper as one flat pale grey, so the sheet is weighted
         hard toward the two greens with tan only as a disruptor. */
      var cols = [PAINT.green, PAINT.dgrn, PAINT.olive, PAINT.sand,
                  PAINT.dark, PAINT.base];
      var WEIGHT = [1, 1, 1, 2, 2, 3, 3, 4, 5];
      var grid = new Array(N * N), i, j, k, pass;
      for (i = 0; i < N * N; i++) grid[i] = 0;

      /* large soft blobs first: real digital camo is a coarse disruptive
         pattern that happens to be drawn out of squares, not static */
      for (k = 0; k < 30; k++) {
        var ci = WEIGHT[(R() * WEIGHT.length) | 0];
        var cx = R() * N, cy = R() * N;
        var rx = 4 + R() * 13, ry = 3 + R() * 9, rot = R() * 3.14159;
        var cs = Math.cos(rot), sn = Math.sin(rot);
        for (j = 0; j < N; j++) for (i = 0; i < N; i++) {
          var dx = i + 0.5 - cx, dy = j + 0.5 - cy;
          var u = (dx * cs + dy * sn) / rx, v = (-dx * sn + dy * cs) / ry;
          if (u * u + v * v < 1 - 0.45 * R()) grid[j * N + i] = ci;
        }
      }
      /* pixel fringe: bleed cells into their neighbours a couple of times */
      for (pass = 0; pass < 2; pass++) {
        var cp = grid.slice();
        for (j = 1; j < N - 1; j++) for (i = 1; i < N - 1; i++) {
          if (R() < 0.14) {
            var d2 = (R() * 4) | 0;
            var oj = d2 === 0 ? 1 : (d2 === 1 ? -1 : 0);
            var oi = d2 === 2 ? 1 : (d2 === 3 ? -1 : 0);
            grid[j * N + i] = cp[(j + oj) * N + (i + oi)];
          }
        }
      }
      for (j = 0; j < N; j++) for (i = 0; i < N; i++) {
        g.fillStyle = hx(cols[grid[j * N + i]]);
        g.fillRect(i * CELL, j * CELL, CELL + 1, CELL + 1);
      }

      /* plate seams: a coarse jittered lattice, the way rolled armour
         plate is actually laid out, plus a few long weld runs */
      g.lineCap = "round";
      g.strokeStyle = "rgba(18,20,17,0.34)"; g.lineWidth = 2.4;
      for (i = 0; i < 7; i++) {
        var yy = (i + 0.5) * SZ / 7 + (R() - 0.5) * 40;
        g.beginPath(); g.moveTo(0, yy);
        for (k = 1; k <= 8; k++) g.lineTo(k * SZ / 8, yy + (R() - 0.5) * 12);
        g.stroke();
      }
      for (i = 0; i < 9; i++) {
        var xx = (i + 0.5) * SZ / 9 + (R() - 0.5) * 40;
        g.beginPath(); g.moveTo(xx, 0);
        for (k = 1; k <= 8; k++) g.lineTo(xx + (R() - 0.5) * 12, k * SZ / 8);
        g.stroke();
      }
      g.strokeStyle = "rgba(210,214,206,0.13)"; g.lineWidth = 1.2;
      for (i = 0; i < 20; i++) {
        var wx = R() * SZ, wy = R() * SZ, wl = 70 + R() * 260;
        g.beginPath();
        if (R() < 0.5) { g.moveTo(wx, wy - 2); g.lineTo(wx + wl, wy - 2 + (R() - 0.5) * 12); }
        else { g.moveTo(wx - 2, wy); g.lineTo(wx - 2 + (R() - 0.5) * 12, wy + wl); }
        g.stroke();
      }

      /* bolt and rivet rows along the seams */
      for (k = 0; k < 46; k++) {
        var bx = R() * SZ, by = R() * SZ, n = 5 + ((R() * 12) | 0);
        var horiz = R() < 0.5, pitch = 9 + R() * 5;
        for (i = 0; i < n; i++) {
          var px = bx + (horiz ? i * pitch : 0), py = by + (horiz ? 0 : i * pitch);
          g.fillStyle = "rgba(16,18,15,0.40)";
          g.fillRect(px, py, 3, 3);
          g.fillStyle = "rgba(215,220,212,0.15)";
          g.fillRect(px, py, 3, 1);
        }
      }

      /* weathering. Heaviest around v = 0.75 (the belly and the sponson
         undersides on the lofted bodies) and toward the bottom of the
         sheet, with soot at u near 0 which is the tail and the exhaust. */
      var dust = g.createLinearGradient(0, SZ * 0.58, 0, SZ);
      dust.addColorStop(0.00, "rgba(150,138,108,0.00)");
      dust.addColorStop(0.45, "rgba(150,138,108,0.18)");
      dust.addColorStop(0.72, "rgba(142,130,100,0.30)");
      dust.addColorStop(1.00, "rgba(112,102,80,0.22)");
      g.fillStyle = dust; g.fillRect(0, SZ * 0.58, SZ, SZ * 0.42);
      g.fillStyle = "rgba(140,128,100,0.15)";
      for (k = 0; k < 70; k++) {
        var sx = R() * SZ, sy = SZ * 0.55 + R() * SZ * 0.45;
        g.fillRect(sx, sy, 3 + R() * 7, 24 + R() * 90);
      }
      var soot = g.createLinearGradient(0, 0, SZ * 0.30, 0);
      soot.addColorStop(0, "rgba(22,20,18,0.46)");
      soot.addColorStop(1, "rgba(22,20,18,0.00)");
      g.fillStyle = soot; g.fillRect(0, 0, SZ * 0.30, SZ);
      g.fillStyle = "rgba(20,18,16,0.24)";
      for (k = 0; k < 40; k++) g.fillRect(R() * SZ * 0.28, R() * SZ, 3 + R() * 6, 30 + R() * 120);
      /* chipping on the high corners */
      g.fillStyle = "rgba(58,56,48,0.34)";
      for (k = 0; k < 140; k++) g.fillRect(R() * SZ, R() * SZ, 2 + R() * 4, 2 + R() * 3);

      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      _tex = t;
    } catch (e) { _tex = null; }
    return _tex;
  }

  /* ---------------------------------------------------------- helpers */
  function std(THREE, c, r, m) {
    return new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  }
  function box(THREE, mtl, sx, sy, sz, x, y, z) {
    var o = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mtl);
    o.position.set(x, y, z);
    return o;
  }
  function cylX(THREE, mtl, r1, r2, len, seg, x, y, z) {
    var o = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), mtl);
    o.rotation.z = Math.PI / 2;
    o.position.set(x, y, z);
    return o;
  }
  function cylY(THREE, mtl, r1, r2, len, seg, x, y, z) {
    var o = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), mtl);
    o.position.set(x, y, z);
    return o;
  }
  function cylZ(THREE, mtl, r1, r2, len, seg, x, y, z) {
    var o = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), mtl);
    o.rotation.x = Math.PI / 2;
    o.position.set(x, y, z);
    return o;
  }
  /* {x, halfWidth, bottom, top} -> the section record loft() wants */
  function sec(x, w, bot, top, sq) {
    return { x: x, w: w, h: (top - bot) * 0.5, zc: (top + bot) * 0.5, sq: sq };
  }
  function lofted(THREE, M, rows, segs, sq, mtl) {
    var s = [], i;
    for (i = 0; i < rows.length; i++) {
      s.push(sec(rows[i][0], rows[i][1], rows[i][2], rows[i][3], sq));
      if (rows[i][4]) s.push(sec(rows[i][0], rows[i][1], rows[i][2], rows[i][3], sq));
    }
    return new THREE.Mesh(M.loft(THREE, s, segs), mtl);
  }

  /* ===================================================== track belt ==== */
  /* The belt is a closed rectangular-section strip swept along the real
     run: ground line, idler wrap, top run climbing to the raised rear
     sprocket, sprocket wrap, then the descending run back to the last
     road wheel. Alternate vertices are pushed out a little so the outer
     face comes out serrated - that is the track link pitch, and it costs
     nothing because the vertices are there anyway. */
  function trackPath() {
    var P = [], i, t;
    function line(x0, z0, x1, z1, step) {
      var dx = x1 - x0, dz = z1 - z0, len = Math.sqrt(dx * dx + dz * dz);
      var n = Math.max(1, Math.round(len / step));
      for (i = 0; i < n; i++) { t = i / n; P.push([x0 + dx * t, z0 + dz * t]); }
    }
    function arc(cx, cz, r, a0, a1, step) {
      var n = Math.max(1, Math.round(Math.abs(a1 - a0) / step));
      for (i = 0; i < n; i++) {
        t = a0 + (a1 - a0) * i / n;
        P.push([cx + r * Math.cos(t), cz + r * Math.sin(t)]);
      }
    }
    var r1 = IDL.r + BELT_T * 0.5, r2 = SPR.r + BELT_T * 0.5;
    var GZ = IDL.z - r1;                       /* belt centreline on ground */
    var RX = WHEEL_X[WHEEL_X.length - 1];      /* last road wheel           */
    /* upper external tangent between idler and sprocket */
    var dx = SPR.x - IDL.x, dz = SPR.z - IDL.z;
    var dl = Math.sqrt(dx * dx + dz * dz);
    var aT = Math.atan2(dz, dx) - Math.acos((r2 - r1) / dl);
    var T1x = IDL.x + r1 * Math.cos(aT), T1z = IDL.z + r1 * Math.sin(aT);
    var T2x = SPR.x + r2 * Math.cos(aT), T2z = SPR.z + r2 * Math.sin(aT);
    /* tangent from the sprocket down onto the last road wheel */
    var vx = RX - SPR.x, vz = GZ - SPR.z;
    var vl = Math.sqrt(vx * vx + vz * vz);
    var aB = Math.atan2(vz, vx) - Math.acos(r2 / vl);
    var Bx = SPR.x + r2 * Math.cos(aB), Bz = SPR.z + r2 * Math.sin(aB);
    var D = Math.PI / 180;

    line(RX, GZ, IDL.x, GZ, 0.30);
    arc(IDL.x, IDL.z, r1, -90 * D, aT, 18 * D);
    line(T1x, T1z, T2x, T2z, 0.30);
    arc(SPR.x, SPR.z, r2, aT, aB + Math.PI * 2, 18 * D);
    line(Bx, Bz, RX, GZ, 0.30);
    return P;
  }

  function beltGeom(THREE, path) {
    var n = path.length, i, pos = [], nrm = [];
    for (i = 0; i < n; i++) {
      var p0 = path[(i - 1 + n) % n], p1 = path[i], p2 = path[(i + 1) % n];
      var ax = p1[0] - p0[0], az = p1[1] - p0[1];
      var al = Math.sqrt(ax * ax + az * az) || 1;
      var bx = p2[0] - p1[0], bz = p2[1] - p1[1];
      var bl = Math.sqrt(bx * bx + bz * bz) || 1;
      var nx = az / al + bz / bl, nz = -ax / al - bx / bl;
      var nl = Math.sqrt(nx * nx + nz * nz) || 1;
      nrm.push([nx / nl, nz / nl]);
    }
    var hw = BELT_HW, ht = BELT_T * 0.5;
    function O(k) {
      var s = (k & 1) ? 0.026 : 0.0;
      return [path[k][0] + nrm[k][0] * (ht + s), path[k][1] + nrm[k][1] * (ht + s)];
    }
    function I(k) {
      return [path[k][0] - nrm[k][0] * ht, path[k][1] - nrm[k][1] * ht];
    }
    function quad(a, b, c, d) {
      pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
      pos.push(a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]);
    }
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      var o0 = O(i), o1 = O(j), i0 = I(i), i1 = I(j);
      quad([o0[0], -hw, o0[1]], [o0[0], hw, o0[1]], [o1[0], hw, o1[1]], [o1[0], -hw, o1[1]]);
      quad([i0[0], hw, i0[1]], [i0[0], -hw, i0[1]], [i1[0], -hw, i1[1]], [i1[0], hw, i1[1]]);
      quad([o0[0], hw, o0[1]], [i0[0], hw, i0[1]], [i1[0], hw, i1[1]], [o1[0], hw, o1[1]]);
      quad([i0[0], -hw, i0[1]], [o0[0], -hw, o0[1]], [o1[0], -hw, o1[1]], [i1[0], -hw, i1[1]]);
    }
    var gg = new THREE.BufferGeometry();
    gg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    gg.computeVertexNormals();
    return gg;
  }

  function runningGear(THREE, G, MAT) {
    var path = trackPath(), s, i;
    for (s = -1; s <= 1; s += 2) {
      var belt = new THREE.Mesh(beltGeom(THREE, path), MAT.rubber);
      belt.position.y = s * TY;
      G.add(belt);
      /* six road wheels: dished disc, pale hub cap outboard */
      for (i = 0; i < WHEEL_X.length; i++) {
        /* a dark rubber tyre with a pale hub disc standing proud in the
           middle of it. Only the bottom half of a road wheel is ever
           visible under the skirts, so it is that value step - not the
           spokes - that makes six wheels read as six wheels. */
        G.add(cylY(THREE, MAT.rubber, RW, RW, 0.44, 14, WHEEL_X[i], s * TY, WZ));
        G.add(cylY(THREE, MAT.metal, RW * 0.54, RW * 0.54, 0.48, 12,
                   WHEEL_X[i], s * TY, WZ));
      }
      /* front idler, low */
      G.add(cylY(THREE, MAT.metal, IDL.r, IDL.r, 0.42, 14, IDL.x, s * TY, IDL.z));
      G.add(cylY(THREE, MAT.metal, 0.12, 0.12, 0.06, 8, IDL.x, s * (TY + 0.23), IDL.z));
      /* REAR drive sprocket, raised above the road wheel line, toothed */
      G.add(cylY(THREE, MAT.metal, SPR.r * 0.90, SPR.r * 0.90, 0.36, 14,
                 SPR.x, s * TY, SPR.z));
      for (i = 0; i < 9; i++) {
        var a = i / 9 * Math.PI * 2;
        var tooth = box(THREE, MAT.metal, 0.11, 0.34, 0.13,
                        SPR.x + Math.cos(a) * SPR.r * 0.95, s * TY,
                        SPR.z + Math.sin(a) * SPR.r * 0.95);
        tooth.rotation.y = -a;
        G.add(tooth);
      }
      G.add(cylY(THREE, MAT.metal, 0.13, 0.13, 0.07, 8, SPR.x, s * (TY + 0.20), SPR.z));
    }
  }

  /* ========================================================= the hull == */
  function buildHull(THREE, M, G, MAT) {
    var skin = MAT.skin, dark = MAT.rubber, metal = MAT.metal, s, i;

    /* the body: flat deck of constant width from the glacis break all the
       way to the tail, then one straight glacis plane down to the nose */
    var rows = [
      [TAIL,  1.40, 0.94, 1.42],
      [-3.66, 1.56, 0.86, DECK, 1],
      [-1.20, 1.56, 0.86, DECK],
      [GB_X - 0.02, 1.56, 0.86, DECK, 1],
      [2.30,  1.52, 0.86, glacisZ(2.30)],
      [3.10,  1.42, 0.74, glacisZ(3.10)],
      [3.58,  1.24, 0.64, glacisZ(3.58)],
      [NOSE,  1.02, 0.66, GN_Z]
    ];
    G.add(lofted(THREE, M, rows, 18, 0.30, skin));

    /* lower hull between the tracks, and the tail plate that caps the loft */
    G.add(box(THREE, skin, 7.30, 2.28, 0.52, -0.20, 0, 0.69));
    G.add(box(THREE, skin, 0.14, 2.84, 0.56, TAIL - 0.02, 0, 1.18));

    /* the roof plate. A lofted section is only ever widest at its own mid
       height, so without this the deck corners droop and the tank reads as
       a loaf from overhead; it also gives every roof fitting one height. */
    var deck = new THREE.Mesh(M.slab(THREE, [
      [GB_X + 0.05, 1.42], [GB_X - 0.25, 1.68], [-3.62, 1.68], [TAIL + 0.05, 1.42],
      [TAIL + 0.05, -1.42], [-3.62, -1.68], [GB_X - 0.25, -1.68], [GB_X + 0.05, -1.42]
    ], 0.07), skin);
    deck.position.z = DECK - 0.07;
    G.add(deck);

    for (s = -1; s <= 1; s += 2) {
      /* hull side above the skirts, flush with them */
      G.add(box(THREE, skin, 5.95, 0.12, 0.24, -0.62, s * 1.62, 1.39));
      /* front fender over the idler */
      var fend = new THREE.Mesh(M.slab(THREE, [
        [3.42, 1.40], [3.42, 1.72], [GB_X - 0.20, 1.72], [GB_X - 0.20, 1.40]
      ], 0.05), skin);
      fend.position.z = FEND - 0.05;
      fend.scale.y = s;
      G.add(fend);
      /* the big rounded front mudguard that hangs over the front of the
         track - a strong, very recognisable part of the front silhouette */
      var mg = new THREE.Mesh(M.slab(THREE, [
        [3.74, 1.16], [3.70, 0.86], [3.48, 0.66], [3.12, 0.56],
        [3.12, 0.66], [3.44, 0.75], [3.62, 0.92], [3.66, 1.16]
      ], 0.34, "xz"), skin);
      mg.position.y = s * 1.72 + 0.17;   /* slab extrudes -y: centre it */
      G.add(mg);
      /* rear mud flap */
      G.add(box(THREE, dark, 0.06, 0.44, 0.40, TAIL + 0.10, s * 1.50, 1.06));
    }

    /* glacis: one bolted applique plate with ribs, the splash guard across
       the break, the driver's hatch and his periscopes */
    var gp = box(THREE, skin, 2.05, 2.55, 0.10, 2.28, 0, glacisZ(2.28) + 0.05);
    gp.rotation.y = GL_ROT; G.add(gp);
    for (i = 0; i < 4; i++) {
      var rx = 1.75 + i * 0.52;
      var rib = box(THREE, skin, 0.10, 2.45, 0.07, rx, 0, glacisZ(rx) + 0.13);
      rib.rotation.y = GL_ROT; G.add(rib);
    }
    G.add(box(THREE, skin, 0.16, 2.70, 0.11, GB_X + 0.06, 0, DECK + 0.04));

    var hxx = 2.02;
    var hatch = box(THREE, skin, 0.52, 0.62, 0.08, hxx, 0, glacisZ(hxx) + 0.13);
    hatch.rotation.y = GL_ROT; G.add(hatch);
    for (i = -1; i <= 1; i++) {
      var per = box(THREE, MAT.glass, 0.10, 0.20, 0.09, hxx + 0.30, i * 0.24,
                    glacisZ(hxx + 0.30) + 0.17);
      per.rotation.y = GL_ROT; G.add(per);
    }
    /* the row of blocks across the lower nose */
    for (i = -2; i <= 2; i++)
      G.add(box(THREE, skin, 0.13, 0.30, 0.22, 3.66, i * 0.44, 0.80));
    /* tow eyes */
    for (s = -1; s <= 1; s += 2) {
      G.add(box(THREE, skin, 0.22, 0.16, 0.16, 3.60, s * 1.00, 0.62));
      G.add(cylX(THREE, metal, 0.05, 0.05, 0.24, 8, 3.68, s * 1.00, 0.62));
    }

    /* headlights and the marker light cluster on the front fenders */
    for (s = -1; s <= 1; s += 2) {
      G.add(box(THREE, skin, 0.24, 0.28, 0.26, 3.30, s * 1.52, 1.42));
      G.add(cylX(THREE, metal, 0.13, 0.13, 0.10, 12, 3.44, s * 1.52, 1.42));
      G.add(cylX(THREE, MAT.glass, 0.115, 0.115, 0.04, 12, 3.49, s * 1.52, 1.42));
      for (i = 0; i < 3; i++)
        G.add(box(THREE, MAT.glass, 0.08, 0.09, 0.09, 3.16, s * (1.36 + i * 0.13), 1.35));
    }

    /* engine deck: two raised radiator grilles with louvres, and the
       exhaust port low on the left rear side */
    for (i = 0; i < 2; i++) {
      var ex = -1.95 - i * 1.10;
      G.add(box(THREE, skin, 0.96, 2.50, 0.09, ex, 0, DECK + 0.045));
      for (var k = 0; k < 5; k++)
        G.add(box(THREE, dark, 0.10, 2.34, 0.07, ex - 0.36 + k * 0.18, 0, DECK + 0.11));
    }
    G.add(box(THREE, skin, 0.62, 0.16, 0.40, -3.05, 1.66, 1.12));
    G.add(box(THREE, dark, 0.50, 0.06, 0.30, -3.05, 1.75, 1.12));

    /* external fuel drums on the tail plate - Chinese MBT signature. They
       lie FORE AND AFT in their cradles, not across, so what you see from
       behind is two circular drum ends standing clear of the tail. */
    for (s = -1; s <= 1; s += 2) {
      G.add(cylX(THREE, skin, 0.28, 0.28, 0.92, 14, -4.12, s * 0.80, 1.14));
      G.add(cylX(THREE, metal, 0.30, 0.30, 0.05, 12, -3.86, s * 0.80, 1.14));
      G.add(cylX(THREE, metal, 0.30, 0.30, 0.05, 12, -4.38, s * 0.80, 1.14));
      G.add(box(THREE, skin, 0.14, 0.20, 0.62, -4.30, s * 0.80, 1.06));
      G.add(box(THREE, skin, 0.14, 0.20, 0.62, -3.92, s * 0.80, 1.06));
    }
    /* unditching beam across the tail between the two drums */
    G.add(box(THREE, dark, 0.22, 1.00, 0.22, -4.02, 0, 1.28));
    /* stowage on the rear deck corners */
    for (s = -1; s <= 1; s += 2)
      G.add(box(THREE, skin, 0.60, 0.42, 0.26, -3.42, s * 1.24, DECK + 0.13));
  }

  /* ======================================================= the skirts == */
  function buildSkirts(THREE, M, G, MAT) {
    /* Six heavy bolt-on panels, one per road wheel station. Each is cut
       away at BOTH bottom corners, so where two panels meet the cuts open
       a V down to the wheel - that scalloped bottom line is the single
       most recognisable thing about a 99A from the side, and a plain
       rectangular skirt loses it completely. */
    var s, i, LOW = 0.50, NOTCH = 0.80, HW = 0.47, CUT = 0.21, TH = 0.11;
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 6; i++) {
        var cxp = WHEEL_X[i];
        var pan = new THREE.Mesh(M.slab(THREE, [
          [cxp - HW, FEND], [cxp + HW, FEND], [cxp + HW, NOTCH],
          [cxp + HW - CUT, LOW], [cxp - HW + CUT, LOW], [cxp - HW, NOTCH]
        ], TH, "xz"), MAT.skin);
        pan.position.y = s * 1.655 + TH * 0.5;
        G.add(pan);
        /* the inspection port each panel carries - a distinct dark
           rectangle that reads at three quarter zoom */
        G.add(box(THREE, MAT.rubber, 0.16, 0.03, 0.16, cxp, s * 1.716, 1.02));
      }
      /* the heavier angled forward section over the idler */
      var fs = new THREE.Mesh(M.slab(THREE, [
        [3.32, FEND], [3.32, 0.60], [2.96, 0.44], [2.96, FEND]
      ], 0.17, "xz"), MAT.skin);
      fs.position.y = s * 1.70 + 0.085;
      G.add(fs);
      /* a rail along the top of the skirts so the fender line reads */
      G.add(box(THREE, MAT.skin, 6.20, 0.15, 0.08, -0.32, s * 1.66, FEND + 0.02));
    }
  }

  /* ======================================================= the turret == */
  /* Named "turret" exactly: render3d.js finds it by name and traverses it. */
  function buildTurret(THREE, M, MAT) {
    var T = new THREE.Group();
    T.name = "turret";
    var skin = MAT.skin, metal = MAT.metal, dark = MAT.rubber, glass = MAT.glass;
    var s, i;

    /* the core: a slab sided welded box that widens to a shoulder just
       behind the arrow and then runs back as one very deep bustle */
    var rows = [
      [-2.34, 1.06, 0.24, 0.74],
      [-2.28, 1.14, 0.20, 0.80, 1],
      [-1.30, 1.24, 0.10, 0.84],
      [-0.40, 1.34, -0.02, 0.86],
      [0.20,  1.38, -0.02, 0.86, 1],
      [0.76,  1.24, 0.02, 0.84],
      [1.04,  0.84, 0.10, 0.79],
      [1.20,  0.54, 0.18, 0.71]
    ];
    T.add(lofted(THREE, M, rows, 18, 0.26, skin));

    /* flat roof plate: the plan outline is what makes the turret read as
       an arrowhead from a high camera */
    var roof = new THREE.Mesh(M.slab(THREE, [
      [1.18, 0.46], [0.70, 1.18], [0.12, 1.37], [-1.30, 1.26], [-2.28, 1.14],
      [-2.33, 0.58], [-2.33, -0.58], [-2.28, -1.14], [-1.30, -1.26],
      [0.12, -1.37], [0.70, -1.18], [1.18, -0.46]
    ], 0.06), skin);
    roof.position.z = 0.80;
    T.add(roof);
    /* bustle rear plate and its stowage rack */
    T.add(box(THREE, skin, 0.13, 2.18, 0.62, -2.38, 0, 0.48));
    /* the open stowage cage hung off the bustle tail: uprights, a floor,
       a top rail and the rolled tarp and can that live in it. The rear
       of a Chinese MBT is never a clean plate. */
    for (i = 0; i < 4; i++)
      T.add(box(THREE, metal, 0.34, 0.07, 0.48, -2.60, (i - 1.5) * 0.62, 0.52));
    T.add(box(THREE, metal, 0.36, 2.02, 0.06, -2.60, 0, 0.29));
    T.add(box(THREE, metal, 0.36, 2.02, 0.06, -2.60, 0, 0.76));
    T.add(box(THREE, metal, 0.06, 2.02, 0.48, -2.76, 0, 0.52));
    T.add(cylX(THREE, dark, 0.16, 0.16, 1.20, 10, -2.58, 0.48, 0.62));
    T.add(box(THREE, skin, 0.28, 0.42, 0.38, -2.58, -0.74, 0.60));

    /* --------------- THE ARROW: the applique / ERA array on the front ---
       Three stepped bands, each shifted back so the whole face leans away
       from the gun; in plan the two arms form the chevron that gives the
       99A its arrowhead outline. */
    var ARM = [[1.48, 0.26], [0.42, 1.50], [0.02, 1.50], [1.00, 0.26]];
    var BAND = [[0.02, 0.46, 0.00], [0.46, 0.80, -0.14]];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < BAND.length; i++) {
        var b = BAND[i], p = [], k;
        for (k = 0; k < ARM.length; k++) p.push([ARM[k][0] + b[2], s * ARM[k][1]]);
        var blk = new THREE.Mesh(M.slab(THREE, p, b[1] - b[0]), skin);
        blk.position.z = b[0];
        T.add(blk);
      }
      /* the vertical corner block that closes the outboard end */
      T.add(box(THREE, skin, 0.62, 0.26, 0.82, 0.22, s * 1.40, 0.42));
      /* laser warning receivers at the roof corners */
      T.add(box(THREE, skin, 0.14, 0.14, 0.16, 0.60, s * 1.02, 0.92));
      T.add(box(THREE, skin, 0.14, 0.14, 0.14, -2.16, s * 1.02, 0.90));
    }

    /* mantlet: the slot between the two arms, with its canvas boot */
    var mant = lofted(THREE, M, [
      [0.86, 0.36, 0.14, 0.74],
      [1.30, 0.31, 0.20, 0.68],
      [1.54, 0.24, 0.26, 0.62],
      [1.64, 0.17, 0.31, 0.57]
    ], 16, 0.45, skin);
    T.add(mant);
    T.add(cylX(THREE, dark, 0.30, 0.26, 0.22, 14, 1.22, 0, 0.44));

    /* --------------- 125 mm smoothbore -------------------------------- */
    T.add(cylX(THREE, metal, 0.118, 0.112, 2.70, 14, 2.90, 0, 0.44));   /* sleeve */
    T.add(cylX(THREE, metal, 0.148, 0.148, 0.52, 14, 4.51, 0, 0.44));   /* evacuator */
    T.add(cylX(THREE, metal, 0.084, 0.076, 2.16, 12, 5.85, 0, 0.44));   /* tube */
    T.add(cylX(THREE, metal, 0.098, 0.098, 0.16, 12, 6.86, 0, 0.44));   /* muzzle */

    /* --------------- roof ---------------------------------------------
       gunner's sight box on the left, the commander's panoramic sight
       standing tall on the right, then his cupola and the 12.7 mm.     */
    T.add(box(THREE, skin, 0.50, 0.44, 0.30, 0.42, 0.52, 1.01));
    T.add(box(THREE, skin, 0.10, 0.46, 0.12, 0.66, 0.52, 1.12));
    T.add(box(THREE, glass, 0.06, 0.32, 0.19, 0.69, 0.52, 1.00));

    T.add(cylZ(THREE, metal, 0.20, 0.20, 0.34, 12, 0.06, -0.56, 1.00));
    T.add(box(THREE, skin, 0.42, 0.48, 0.42, 0.06, -0.56, 1.38));
    T.add(box(THREE, glass, 0.05, 0.32, 0.22, 0.28, -0.56, 1.40));
    T.add(box(THREE, glass, 0.05, 0.32, 0.22, -0.16, -0.56, 1.40));
    T.add(cylZ(THREE, skin, 0.16, 0.16, 0.13, 10, 0.06, -0.56, 1.65));

    T.add(cylZ(THREE, skin, 0.37, 0.37, 0.15, 14, -0.60, -0.62, 0.92));
    T.add(cylZ(THREE, skin, 0.33, 0.33, 0.09, 14, -0.60, -0.62, 1.03));
    T.add(box(THREE, skin, 0.12, 0.56, 0.30, -0.90, -0.62, 1.20));  /* MG shield */
    T.add(box(THREE, metal, 0.46, 0.13, 0.15, -0.34, -0.62, 1.20)); /* receiver */
    T.add(cylX(THREE, metal, 0.035, 0.030, 0.90, 8, 0.42, -0.62, 1.24));
    T.add(box(THREE, metal, 0.24, 0.18, 0.18, -0.48, -0.44, 1.16)); /* ammo box */
    /* the gunner's hatch on the left */
    T.add(cylZ(THREE, skin, 0.31, 0.31, 0.11, 14, -0.66, 0.62, 0.90));

    /* --------------- smoke grenade dischargers, front corners --------- */
    for (s = -1; s <= 1; s += 2) {
      var bank = new THREE.Group(), r2;
      for (r2 = 0; r2 < 2; r2++)
        for (i = 0; i < 4; i++)
          bank.add(cylX(THREE, metal, 0.062, 0.062, 0.36, 8,
                        0, (i - 1.5) * 0.135, r2 * 0.135));
      bank.add(box(THREE, metal, 0.10, 0.62, 0.30, -0.18, 0, 0.07));
      bank.rotation.set(0, -0.26, s * 0.50);
      bank.position.set(0.30, s * 1.32, 0.84);
      T.add(bank);
    }

    /* --------------- stowage, aerials, sensor mast -------------------- */
    for (s = -1; s <= 1; s += 2) {
      /* the run of bolt-on armour boxes down the bustle flank */
      T.add(box(THREE, skin, 1.86, 0.14, 0.34, -1.30, s * 1.26, 0.44));
      T.add(box(THREE, skin, 0.62, 0.40, 0.24, -1.44, s * 0.60, 0.98));
      /* whip aerial */
      T.add(box(THREE, metal, 0.12, 0.12, 0.12, -2.12, s * 0.90, 0.90));
      var whip = cylZ(THREE, metal, 0.018, 0.010, 1.50, 6, -2.12, s * 0.90, 1.70);
      whip.rotation.y = s * 0.05;
      T.add(whip);
    }
    T.add(cylZ(THREE, metal, 0.026, 0.026, 0.42, 6, -1.86, 0, 1.08));
    T.add(box(THREE, metal, 0.20, 0.20, 0.07, -1.86, 0, 1.31));

    return T;
  }

  /* ======================================================== assembly === */
  function build(THREE, M, C) {
    var G = new THREE.Group();

    var tex = skinTex(THREE);
    var skin = std(THREE, tex ? 0xffffff : PAINT.base, 0.88, 0.06);
    if (tex) skin.map = tex;

    var MAT = {
      skin:   skin,
      /* These two are darker than the numbers a photograph suggests, on
         purpose. The renderer's sRGB output plus ACES tone mapping lifts
         an untextured surface hard - measured on screen, a 0x1b1e20 track
         came back as mid grey 129,134,134 and the tank read as a toy with
         chrome running gear. Pick for the render, not the hex. */
      metal:  std(THREE, 0x1f2427, 0.58, 0.46),
      rubber: std(THREE, 0x090a0b, 0.95, 0.04),
      glass:  new THREE.MeshPhysicalMaterial({
        color: 0x3d5a63, roughness: 0.10, metalness: 0.10,
        transparent: true, opacity: 0.84
      }),
      team:   std(THREE, punch((C && C.team) || 0x3f7fd0), 0.86, 0.02)
    };

    buildHull(THREE, M, G, MAT);
    runningGear(THREE, G, MAT);
    buildSkirts(THREE, M, G, MAT);

    var T = buildTurret(THREE, M, MAT);
    T.position.set(TUR_X, 0, DECK);
    G.add(T);

    /* team colour so ownership reads on a busy map: turret flanks, the
       bustle tail plate and a flash on each hull side */
    var s;
    for (s = -1; s <= 1; s += 2) {
      T.add(box(THREE, MAT.team, 0.56, 0.05, 0.20, -0.30, s * 1.30, 0.62));
      G.add(box(THREE, MAT.team, 0.62, 0.05, 0.15, -2.30, s * 1.70, 1.39));
    }
    T.add(box(THREE, MAT.team, 0.05, 0.66, 0.18, -2.45, 0, 0.66));
    T.add(box(THREE, MAT.team, 0.46, 0.86, 0.05, -1.66, 0, 0.89));

    return G;
  }

  return { build: build };
})();

UNIT_MODELS["mbt_c"] = {
  len: 7.60,
  build: function (THREE, M, C) { return HeroMbtC.build(THREE, M, C); }
};
