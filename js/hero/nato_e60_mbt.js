/* ============================================================================
   nato_e60_mbt.js  --  HERO REFERENCE MODEL: M60A1 Patton

   The style and period anchor for the e60 (early Cold War) armour roster.
   Hand built to a higher standard than the parametric vehicles in
   js/armour3d.js; the rest of the era is meant to be tuned to match it.

   Model space follows the house contract and js/models3d.js:
       +X nose / front, +Y left, +Z up, real metres, ground at z = 0.

   What an M60A1 IS, from the photographs in scratchpad/ref/m60_a.jpg,
   m60_b.jpg and m60_c.jpg:

     - a "needle nose" cast hull front: the whole prow is one steel casting
       that narrows in plan AND in elevation to a blunt vertical beak about
       mid height, with the upper glacis sweeping back and up to the deck and
       the lower plate sweeping back and down to the belly. Nothing else in
       the era has that boat prow.
     - six large dual road wheels a side under three return rollers, a raised
       toothed drive sprocket and a raised compensating idler. See the note on
       SPROCKET below: on a real M60 the sprocket is at the REAR.
     - a big elongated cast turret, widest a third of the way back and
       tapering to a narrow snout around a fat rounded mantlet.
     - the M68 105 mm with its bore evacuator a little past mid barrel and a
       plain muzzle - no brake.
     - the M19 commander's cupola: a tall drum standing well clear of the
       turret roof, ringed with vision blocks and carrying its own .50 in a
       mount on the front. It is the single tallest thing on the tank and the
       easiest way to tell an M60 from a T-62 at a distance.

   Colour is PAINT.olive from js/armour3d.js (0x4a5236) with that table's own
   secondary tones, because the era table says nato_e60_mbt is "olive".
   ==========================================================================*/
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  /* ------------------------------------------------- dimensions (metres) */
  /* M60A1: hull 6.946 long, 3.631 over the tracks, 3.27 to the cupola top,
     9.436 overall with the gun forward, 0.71 track, 0.66 road wheels.      */
  var XN = 3.475, XT = -3.475;      /* hull nose and tail                   */
  var HW = 1.815;                   /* half beam over the tracks            */
  var TKW = 0.71, TKY = 1.46;       /* track width and its centre line      */
  var BODY = 1.50;                  /* hull body half width                 */
  var ZB = 0.46, ZR = 1.75;         /* belly and roof                       */
  var RW = 0.33, ZW = 0.43;         /* road wheel radius and axle height    */
  var BELT = 0.10;                  /* track belt thickness                 */
  var IDL = { x: 3.02, z: 0.72, r: 0.35 };   /* front compensating idler    */
  var SPR = { x: -3.06, z: 0.78, r: 0.36 };  /* rear drive sprocket         */
  var GLB = 1.45, GLZ = 1.03;       /* glacis break, and the nose top       */
  var TRX = 0.18;                   /* turret ring centre                   */
  var TTH = 0.87;                   /* turret body height above the roof    */

  /* -------------------------------------------------------------- random */
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function frac(v) { return v - Math.floor(v); }

  /* ---------------------------------------------------------------- skin */
  /* One 2048 x 512 sheet. The aspect is deliberate: the hull loft's UVs are
     remapped below so u spans the 6.95 m length once and v spans the 1.29 m
     of hull height once, which makes a texel 292 px/m in BOTH directions.
     A square sheet stretched every blotch and bolt row five times sideways.

     v therefore means HEIGHT - so the dust band painted along the bottom of
     the canvas lands on the belly and the sponson skirt, and the deck stays
     clean. u means LENGTH from the tail, so the soot smeared into the left
     edge lands behind the rear exhaust louvres where it belongs.           */
  var _texDone = false, _tex = null;
  function skinTexture(THREE) {
    if (_texDone) return _tex;
    _texDone = true;
    try {
      var W = 2048, H = 512, i, j, x, y, w, h, n, st;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d");
      var R = rng(0x60a1);

      /* Base coat. PAINT.olive in js/armour3d.js is #4a5236, and that is the
         colour this tank is; but ACES plus the strong key light in this
         renderer flattens chroma badly, and painted at the table value the
         hull came back a dead khaki grey barely separable from the tracks.
         Same value, same hue family, chroma pushed from 0.34 to 0.50 so that
         what lands ON SCREEN is the olive drab the table means. */
      g.fillStyle = "#4a5a2e"; g.fillRect(0, 0, W, H);

      /* tonal drift, using the olive row's own secondary tones, so a big
         flat plate is never one dead colour under a flat RTS light */
      for (i = 0; i < 90; i++) {
        g.globalAlpha = 0.10 + R() * 0.14;
        g.fillStyle = R() < 0.5 ? "#333f20" : "#69763c";
        g.beginPath();
        g.ellipse(R() * W, R() * H, 50 + R() * 180, 30 + R() * 110,
                  R() * 3.1416, 0, 6.2832);
        g.fill();
      }
      g.globalAlpha = 1;

      /* cast armour pebbling. The M60's nose and turret are single castings
         and the surface really is visibly orange peel; it is what keeps the
         big smooth lofts from reading as plastic. */
      for (i = 0; i < 26000; i++) {
        x = R() * W; y = R() * H;
        g.fillStyle = R() < 0.5 ? "rgba(0,0,0,0.11)" : "rgba(255,255,255,0.06)";
        g.fillRect(x, y, 1 + R() * 2, 1 + R() * 2);
      }

      /* rolled plate seams: horizontal joins with a bright weld bead below */
      for (i = 0; i < 5; i++) {
        y = (i + 0.5) * H / 5 + (R() - 0.5) * 26;
        g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 2.4;
        g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
        g.strokeStyle = "rgba(255,255,255,0.08)"; g.lineWidth = 1.4;
        g.beginPath(); g.moveTo(0, y + 3.0); g.lineTo(W, y + 3.0); g.stroke();
      }
      /* and the vertical welds between plates */
      for (i = 0; i < 22; i++) {
        x = R() * W; y = R() * H; h = 50 + R() * 160;
        g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 2.0;
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + (R() - 0.5) * 12, y + h); g.stroke();
      }

      /* bolt and rivet rows along the seams and around the hatch rings */
      for (i = 0; i < 70; i++) {
        x = R() * W; y = R() * H;
        n = 5 + ((R() * 14) | 0); st = 8 + R() * 7;
        var vert = R() < 0.30;
        for (j = 0; j < n; j++) {
          var bx = vert ? x : x + j * st, by = vert ? y + j * st : y;
          g.fillStyle = "rgba(0,0,0,0.36)"; g.fillRect(bx, by, 3, 3);
          g.fillStyle = "rgba(255,255,255,0.11)"; g.fillRect(bx, by - 1.2, 2.4, 1.2);
        }
      }
      /* a couple of grab handle shadows */
      for (i = 0; i < 26; i++) {
        x = R() * W; y = R() * H; w = 16 + R() * 26;
        g.strokeStyle = "rgba(0,0,0,0.13)"; g.lineWidth = 2.4;
        g.beginPath(); g.arc(x, y, w * 0.5, 3.1416, 6.2832); g.stroke();
      }

      /* paint chipped back to dark primer along edges */
      for (i = 0; i < 260; i++) {
        x = R() * W; y = R() * H;
        g.fillStyle = "rgba(56,49,38,0.34)";
        g.beginPath();
        g.ellipse(x, y, 2 + R() * 8, 1.5 + R() * 4, R() * 3.1416, 0, 6.2832);
        g.fill();
      }

      /* rain, fuel and oil streaks running DOWN the plates (v decreasing) */
      for (i = 0; i < 150; i++) {
        x = R() * W; y = R() * H * 0.9; h = 20 + R() * 150;
        g.fillStyle = R() < 0.5 ? "rgba(28,26,22,0.15)" : "rgba(122,112,86,0.13)";
        g.fillRect(x, y, 1 + R() * 3.5, h);
      }

      /* dirt, heavier low down: the belly and the sponson skirt live in the
         spray thrown off the tracks */
      var dust = g.createLinearGradient(0, H, 0, H * 0.30);
      dust.addColorStop(0.00, "rgba(152,138,106,0.58)");
      dust.addColorStop(0.40, "rgba(152,138,106,0.24)");
      dust.addColorStop(1.00, "rgba(152,138,106,0.00)");
      g.fillStyle = dust; g.fillRect(0, H * 0.30, W, H * 0.70);
      for (i = 0; i < 320; i++) {
        x = R() * W; y = H - R() * R() * H * 0.62;
        g.fillStyle = "rgba(94,82,56,0.26)";
        g.beginPath(); g.ellipse(x, y, 3 + R() * 18, 2 + R() * 7, 0, 0, 6.2832); g.fill();
      }

      /* exhaust staining. The M60 vents through grilles in the rear plate,
         so everything within about a metre of the tail gets scorched. u = 0
         is the tail, so that is the left edge of the sheet. */
      var soot = g.createRadialGradient(0, H * 0.62, 10, 0, H * 0.62, W * 0.20);
      soot.addColorStop(0.00, "rgba(22,20,18,0.62)");
      soot.addColorStop(0.45, "rgba(22,20,18,0.28)");
      soot.addColorStop(1.00, "rgba(22,20,18,0.00)");
      g.fillStyle = soot; g.fillRect(0, 0, W * 0.20, H);
      for (i = 0; i < 90; i++) {
        x = R() * R() * W * 0.16; y = R() * H;
        g.fillStyle = "rgba(20,18,16,0.20)";
        g.fillRect(x, y, 2 + R() * 12, 4 + R() * 40);
      }

      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      _tex = t;
    } catch (e) { _tex = null; }
    return _tex;
  }

  /* ------------------------------------------------------- UV plumbing */
  /* Remap a lofted body so u runs tail-to-nose and v runs belly-to-roof.
     loft() hands back v = angle around the section, which smears the dust
     band up over the shoulders and puts clean paint on the belly. */
  function heightUV(geom, x0, x1, z0, z1) {
    var p = geom.attributes.position, uv = geom.attributes.uv, i;
    for (i = 0; i < p.count; i++)
      uv.setXY(i, (p.getX(i) - x0) / (x1 - x0), (p.getZ(i) - z0) / (z1 - z0));
    uv.needsUpdate = true;
    return geom;
  }
  function uvMul(geom, sx, sy, ox, oy) {
    var uv = geom.attributes.uv, i;
    if (!uv) return geom;
    for (i = 0; i < uv.count; i++)
      uv.setXY(i, ox + uv.getX(i) * sx, oy + uv.getY(i) * sy);
    uv.needsUpdate = true;
    return geom;
  }
  /* A painted box. Its UVs are squeezed into a square-ish window of the
     sheet (0.125 x 4 = 0.5 on a 4:1 canvas), chosen low down the sheet when
     the fitting itself sits low on the tank, so a fender box is dirty and a
     turret roof box is not. */
  function sbox(THREE, m, sx, sy, sz, x, y, z) {
    var g = new THREE.BoxGeometry(sx, sy, sz);
    var v = Math.max(0, Math.min(1, (z - 0.35) / 2.7));
    uvMul(g, 0.125, 0.44, frac(x * 0.41 + y * 0.17) * 0.86, 0.02 + v * 0.50);
    var o = new THREE.Mesh(g, m);
    o.position.set(x, y, z);
    return o;
  }
  function box(THREE, m, sx, sy, sz, x, y, z) {
    var o = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), m);
    o.position.set(x, y, z);
    return o;
  }
  /* a cylinder whose axis is left-right, i.e. an axle - Cylinder is already
     built along +Y so a road wheel needs no rotation at all */
  function axle(THREE, m, r, w, seg, x, y, z) {
    var o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w, seg), m);
    o.position.set(x, y, z);
    return o;
  }
  /* a painted disc - a road wheel centre or an idler - with its UVs pulled
     into a small, low, dirty window of the sheet instead of wrapping the
     whole 2048 px canvas round a 0.5 m wheel */
  function saxle(THREE, m, r, w, seg, x, y, z) {
    var g = new THREE.CylinderGeometry(r, r, w, seg);
    uvMul(g, 0.09, 0.26, frac(x * 0.37 + 0.13) * 0.80, 0.26);
    var o = new THREE.Mesh(g, m);
    o.position.set(x, y, z);
    return o;
  }
  function upright(THREE, m, rt, rb, h, seg, x, y, z) {
    var o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m);
    o.rotation.x = Math.PI / 2;
    o.position.set(x, y, z);
    return o;
  }
  /* Cylinder is built along +Y with radiusTop at the +Y end, and rotating
     -90 degrees about Z swings +Y onto -X - so a naive call puts radiusTop at
     the BACK. Every call site here reads rt as the FORWARD radius, so the two
     radii go in swapped. Before this was fixed the 105 grew fatter towards
     the muzzle and the mantlet shroud flared out into a trumpet. */
  function alongX(THREE, m, rt, rb, len, seg, x, y, z) {
    var o = new THREE.Mesh(new THREE.CylinderGeometry(rb, rt, len, seg), m);
    o.rotation.z = -Math.PI / 2;      /* +Y axis swung onto -X */
    o.position.set(x, y, z);
    return o;
  }
  function mirrorPts(pts) {
    var out = [], i;
    for (i = pts.length - 1; i >= 0; i--) out.push([pts[i][0], -pts[i][1]]);
    return out;
  }

  /* ------------------------------------------------------- track belt */
  /* The belt as a closed band swept along a path in the XZ plane. Drawn as
     two straight boxes, the way the parametric vehicles do it, the run over
     the raised sprocket simply is not there - and on this tank the rise of
     the belt from the road wheels up to the sprocket and the idler is a
     third of the side view. Alternate stations stand proud so the belt
     reads as steel links rather than a rubber loop. */
  function beltGeom(THREE, path, halfW, thick) {
    var n = path.length, pos = [], idx = [], out = [], inn = [], i, k;
    for (i = 0; i < n; i++) {
      var a = path[(i - 1 + n) % n], b = path[i], c = path[(i + 1) % n];
      var tx = c[0] - a[0], tz = c[1] - a[1];
      var l = Math.sqrt(tx * tx + tz * tz) || 1;
      var nx = tz / l, nz = -tx / l;          /* outward normal of a CCW loop */
      /* every other station stands a full link proud and the one between it
         only a third, so the SILHOUETTE saws in and out. At 0.25 m spacing
         that is about four pixels of tooth at RTS zoom, which is the whole
         difference between a track and a rubber band. */
      var t = thick * (i % 2 ? 0.32 : 1.00);
      out.push([b[0] + nx * t, b[1] + nz * t]);
      inn.push([b[0] - nx * thick * 0.42, b[1] - nz * thick * 0.42]);
    }
    for (i = 0; i < n; i++) {
      var o = out[i], q = inn[i];
      pos.push(o[0], halfW, o[1], o[0], -halfW, o[1],
               q[0], -halfW, q[1], q[0], halfW, q[1]);
    }
    for (i = 0; i < n; i++) {
      var A = i * 4, B = ((i + 1) % n) * 4;
      for (k = 0; k < 4; k++) {
        var a0 = A + k, a1 = A + (k + 1) % 4, b0 = B + k, b1 = B + (k + 1) % 4;
        idx.push(a0, b0, a1, a1, b0, b1);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* the belt's centre line: bottom run forward, up and over the idler, back
     along the top of the return rollers, down around the drive sprocket */
  function trackPath() {
    var p = [], i, a, f, z0, z1, br;
    /* the path is the belt's MID line and the links hang thick below it, so
       the bottom run sits one link height up and the tall links just touch
       z = 0 */
    for (i = 0; i <= 20; i++) p.push([-2.45 + 4.90 * i / 20, BELT]);
    br = IDL.r + BELT * 0.5;
    for (i = 0; i <= 9; i++) {
      a = (-75 + 190 * i / 9) * Math.PI / 180;
      p.push([IDL.x + br * Math.cos(a), IDL.z + br * Math.sin(a)]);
    }
    z0 = p[p.length - 1][1];
    var xF = p[p.length - 1][0], xR = SPR.x + (SPR.r + BELT * 0.5) * Math.cos(72 * Math.PI / 180);
    z1 = SPR.z + (SPR.r + BELT * 0.5) * Math.sin(72 * Math.PI / 180);
    for (i = 1; i <= 18; i++) {
      f = i / 18;
      p.push([xF + (xR - xF) * f,
              z0 + (z1 - z0) * f - 0.022 * Math.pow(Math.sin(3.4 * Math.PI * f), 2)]);
    }
    br = SPR.r + BELT * 0.5;
    for (i = 1; i <= 9; i++) {
      a = (72 + 180 * i / 9) * Math.PI / 180;
      p.push([SPR.x + br * Math.cos(a), SPR.z + br * Math.sin(a)]);
    }
    return p;
  }

  /* ============================================================= build */
  function build(THREE, M, C) {
    var G = new THREE.Group();
    var i, j, s, o, g2, pts, a;

    /* ------------------------------------------------------- materials */
    /* Three tiers only: SKIN (painted, textured), METAL (guns, running
       gear, fittings; rubber and track pads are METAL at roughness 0.95)
       and GLASS (vision blocks, lenses, lamps). */
    var skin = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.87, metalness: 0.06 });
    var tx = skinTexture(THREE);
    if (tx) skin.map = tx; else skin.color.setHex(0x4a5236);

    var team = new THREE.MeshStandardMaterial({
      color: (C && C.team) || 0x3f7fd0, roughness: 0.84, metalness: 0.08 });

    var metal = new THREE.MeshStandardMaterial({
      color: 0x50555a, roughness: 0.55, metalness: 0.50 });
    var dark = new THREE.MeshStandardMaterial({
      color: 0x2c2f31, roughness: 0.60, metalness: 0.42 });
    var rubber = new THREE.MeshStandardMaterial({
      color: 0x191b1c, roughness: 0.95, metalness: 0.04 });

    var glass = new THREE.MeshPhysicalMaterial({
      color: 0x93b6c9, roughness: 0.10, metalness: 0.0,
      transparent: true, opacity: 0.84, clearcoat: 1.0, clearcoatRoughness: 0.06 });
    var lamp = new THREE.MeshPhysicalMaterial({
      color: 0xd8cfb4, roughness: 0.08, metalness: 0.0,
      transparent: true, opacity: 0.86, clearcoat: 1.0, clearcoatRoughness: 0.05 });

    /* ============================================================= HULL */
    /* Stations as [x, halfWidth, bellyZ, deckZ, squareness]. The last five
       stations are the needle nose: the plan narrows from 1.44 to 0.22 while
       the deck drops from 1.75 to 1.03 and the belly rises from 0.46 to
       0.70, which is the boat prow. sq climbs from 0.34 (a boxy rolled hull)
       to 0.90 (a rounded casting) over the same run. */
    var HULL = [
      [-3.475, 1.40, 0.58, 1.70, 0.34],
      [-3.300, 1.48, 0.50, 1.750, 0.34, 1],
      [-2.600, 1.50, 0.46, 1.750, 0.34],
      [-0.600, 1.50, 0.46, 1.750, 0.34],
      [ 0.900, 1.50, 0.46, 1.750, 0.34],
      [ 1.450, 1.49, 0.46, 1.750, 0.34, 1],
      [ 2.200, 1.44, 0.46, 1.560, 0.38],
      [ 2.800, 1.27, 0.47, 1.355, 0.42],
      [ 3.150, 0.96, 0.53, 1.210, 0.46],
      [ 3.360, 0.58, 0.62, 1.105, 0.50],
      [ 3.475, 0.20, 0.72, 1.020, 0.55]
    ];
    var secs = [];
    for (i = 0; i < HULL.length; i++) {
      s = HULL[i];
      o = { x: s[0], w: s[1], h: (s[3] - s[2]) * 0.5, zc: (s[3] + s[2]) * 0.5, sq: s[4] };
      secs.push(o);
      /* a repeated ring kills the averaged normal, so the glacis break and
         the tail plate come out as hard creases instead of soft shoulders */
      if (s[5]) secs.push({ x: o.x, w: o.w, h: o.h, zc: o.zc, sq: o.sq });
    }
    /* loft() winds its quads so that DECREASING x gives outward normals;
       fed in nose-to-tail order the whole hull renders inside out. */
    secs.reverse();
    var hullGeo = M.loft(THREE, secs, 26);
    heightUV(hullGeo, XT, XN, ZB - 0.02, ZR);
    G.add(new THREE.Mesh(hullGeo, skin));
    /* loft() leaves both ends open. Uncapped, the beak showed as a black
       slot from three quarters on and the whole tail was a hole. */
    G.add(sbox(THREE, skin, 0.07, 0.42, 0.32, 3.455, 0, 0.870));
    G.add(sbox(THREE, skin, 0.08, 2.78, 1.10, -3.455, 0, 1.140));

    /* deck plate: the loft can only be widest at its own mid height, so
       without this the roof corners droop and the plan view is a loaf */
    var dt = 0.10;
    pts = [[GLB, 1.20], [GLB - 0.20, 1.52], [-3.28, 1.52], [-3.44, 1.34],
           [-3.44, -1.34], [-3.28, -1.52], [GLB - 0.20, -1.52], [GLB, -1.20]];
    g2 = M.slab(THREE, pts, dt);
    uvMul(g2, 0.143, 0.571, 0.50, 0.50);
    o = new THREE.Mesh(g2, skin); o.position.z = ZR - dt; G.add(o);

    /* ---------------------------------------------------------- fenders */
    /* Flat track guards the full length of the belt, dead level while the
       glacis falls away below them - that step is most of the M60's side
       profile forward of the turret. */
    var ft = 0.07, FY0 = 1.20, FY1 = HW + 0.02;
    var fp = [[3.34, FY0], [3.34, FY1], [-3.42, FY1], [-3.42, FY0]];
    for (s = 0; s < 2; s++) {
      g2 = M.slab(THREE, s ? mirrorPts(fp) : fp, ft);
      uvMul(g2, 0.143, 0.571, 0.10, 0.24);
      o = new THREE.Mesh(g2, skin); o.position.z = ZR - 0.05 - ft; G.add(o);
    }
    /* the drooping front mud flaps and the rear ones */
    for (s = -1; s <= 1; s += 2) {
      o = sbox(THREE, skin, 0.42, 0.60, 0.05, 3.44, s * 1.50, 1.50);
      o.rotation.y = 0.62; G.add(o);      /* leading edge DOWN over the idler */
      o = sbox(THREE, skin, 0.36, 0.60, 0.05, -3.52, s * 1.50, 1.50);
      o.rotation.y = -0.58; G.add(o);     /* trailing edge DOWN behind the sprocket */
    }
    /* fender stowage boxes: bulk on the sponson line, and the only thing
       that breaks up the long flat side of the tank */
    var FB = [[2.35, 0.80], [-1.05, 1.05], [-2.20, 0.95]];
    for (i = 0; i < FB.length; i++) for (s = -1; s <= 1; s += 2) {
      G.add(sbox(THREE, skin, FB[i][1], 0.50, 0.34,
                 FB[i][0], s * 1.53, ZR - 0.05 + 0.13));
      G.add(box(THREE, dark, FB[i][1] * 0.9, 0.03, 0.05,
                FB[i][0], s * 1.29, ZR - 0.05 + 0.13));
    }

    /* ------------------------------------------------------ glacis kit */
    /* a point a fraction f up the glacis, lifted d clear along its normal */
    var gdx = GLB - XN, gdz = ZR - GLZ;
    var grun = Math.sqrt(gdx * gdx + gdz * gdz);
    var gux = gdx / grun, guz = gdz / grun;
    var gnx = guz, gnz = -gux, gang = Math.atan2(guz, -gux);
    function onGlacis(f, d) {
      return { x: XN + gux * grun * f + gnx * d, z: GLZ + guz * grun * f + gnz * d };
    }

    /* driver's hatch, dead centre on an M60, with its three periscopes */
    var p = onGlacis(0.56, 0.045);
    o = sbox(THREE, skin, 0.66, 0.76, 0.10, p.x, 0, p.z);
    o.rotation.y = gang; G.add(o);
    for (i = -1; i <= 1; i++) {
      p = onGlacis(0.66, 0.075);
      o = box(THREE, dark, 0.13, 0.20, 0.10, p.x, i * 0.25, p.z);
      o.rotation.y = gang; G.add(o);
      p = onGlacis(0.66, 0.115);
      o = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.17, 0.07), glass);
      o.rotation.y = gang; o.position.set(p.x + 0.05, i * 0.25, p.z); G.add(o);
    }
    /* headlight clusters with brush guards, outboard on the upper glacis */
    for (s = -1; s <= 1; s += 2) {
      p = onGlacis(0.24, 0.16);
      o = sbox(THREE, skin, 0.30, 0.46, 0.34, p.x, s * 1.03, p.z);
      o.rotation.y = gang; G.add(o);
      for (j = 0; j < 2; j++) {
        o = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.05, 12), lamp);
        o.rotation.z = -Math.PI / 2; o.rotation.y = 0;
        o.position.set(p.x + 0.20, s * 1.03 + (j ? 0.12 : -0.12), p.z + 0.03);
        G.add(o);
      }
      G.add(box(THREE, metal, 0.05, 0.50, 0.04, p.x + 0.26, s * 1.03, p.z + 0.18));
      G.add(box(THREE, metal, 0.05, 0.50, 0.04, p.x + 0.26, s * 1.03, p.z - 0.18));
      for (j = -1; j <= 1; j += 2)
        G.add(box(THREE, metal, 0.05, 0.04, 0.40, p.x + 0.26, s * 1.03 + j * 0.23, p.z));
    }
    /* towing lugs low on the prow, and the shackle pins through them */
    for (s = -1; s <= 1; s += 2) {
      G.add(sbox(THREE, skin, 0.30, 0.13, 0.26, 3.20, s * 0.52, 0.80));
      G.add(axle(THREE, metal, 0.05, 0.24, 8, 3.30, s * 0.52, 0.80));
    }
    /* spare track links carried on the glacis, an M60 crew habit */
    for (s = -1; s <= 1; s += 2) for (j = 0; j < 6; j++) {
      p = onGlacis(0.32 + j * 0.062, 0.055);
      o = box(THREE, dark, 0.07, 0.44, 0.10, p.x, s * 0.78, p.z);
      o.rotation.y = gang; G.add(o);
    }

    /* ------------------------------------------------------ engine deck */
    var edx0 = -3.28, edx1 = -1.50, edz = ZR + 0.05;
    G.add(sbox(THREE, skin, edx1 - edx0, 2.70, 0.10, (edx0 + edx1) * 0.5, 0, edz));
    for (i = 0; i < 8; i++)
      G.add(box(THREE, dark, 0.10, 2.46, 0.09, edx0 + 0.16 + i * 0.215, 0, edz + 0.05));
    /* the two big circular grille caps either side of the deck */
    for (s = -1; s <= 1; s += 2)
      G.add(upright(THREE, dark, 0.34, 0.34, 0.07, 14, -2.05, s * 0.86, edz + 0.08));
    /* the tail plate: exhaust louvres, tow pintle, convoy lights */
    G.add(box(THREE, dark, 0.09, 1.70, 0.52, -3.52, 0, 1.16));
    for (i = 0; i < 5; i++)
      G.add(box(THREE, metal, 0.05, 1.62, 0.05, -3.57, 0, 0.98 + i * 0.11));
    G.add(sbox(THREE, skin, 0.22, 0.34, 0.24, -3.58, 0, 0.72));
    G.add(axle(THREE, metal, 0.07, 0.20, 8, -3.66, 0, 0.72));
    for (s = -1; s <= 1; s += 2) {
      G.add(sbox(THREE, skin, 0.14, 0.22, 0.22, -3.52, s * 1.22, 1.50));
      o = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.16, 0.16), lamp);
      o.position.set(-3.58, s * 1.22, 1.50); G.add(o);
    }

    /* ======================================================= RUNNING GEAR */
    /* SPROCKET NOTE. The brief for this model asked for a FRONT drive
       sprocket. Every reference photograph says otherwise and so does the
       layout of the tank: the AVDS-1790 and its cross drive transmission sit
       in the rear compartment, the final drives come out of the back of the
       hull, and the toothed sprocket is at the TAIL with a smooth
       compensating idler at the nose. m60_c.jpg shows it plainly. Built to
       the photographs; the discrepancy is reported rather than faked. */
    var path = trackPath();
    var WX = [2.28, 1.36, 0.44, -0.48, -1.40, -2.32];
    var ROL = [[1.55, 0.953], [0.15, 0.974], [-1.35, 0.996]];

    for (s = -1; s <= 1; s += 2) {
      var ty = s * TKY;
      /* the belt */
      o = new THREE.Mesh(beltGeom(THREE, path, TKW * 0.5, BELT), dark);
      o.position.y = ty; G.add(o);
      /* Six dual road wheels. An M60's wheels are dished STEEL discs in body
         colour with a black rubber tyre only on the rim - see m60_a.jpg. That
         matters more here than it does on the real tank: this renderer's key
         light plus ACES lifts every dark material to the same mid grey, so a
         black wheel inside a grey track is one undifferentiated sausage. An
         olive centre separates by HUE instead, which survives the tone map. */
      for (i = 0; i < WX.length; i++) {
        G.add(axle(THREE, rubber, RW, 0.16, 14, WX[i], ty - 0.10, ZW));
        G.add(axle(THREE, rubber, RW, 0.16, 14, WX[i], ty + 0.10, ZW));
        G.add(saxle(THREE, skin, RW * 0.78, 0.375, 14, WX[i], ty, ZW));
        G.add(axle(THREE, metal, RW * 0.20, 0.40, 8, WX[i], ty, ZW));
        /* the wheel arm coming out of the hull side */
        G.add(box(THREE, dark, 0.20, 0.14, 0.44, WX[i] - 0.16, s * 1.20, ZW + 0.20));
      }
      /* three return rollers on the top run */
      for (i = 0; i < ROL.length; i++) {
        G.add(axle(THREE, rubber, 0.10, 0.26, 10, ROL[i][0], ty, ROL[i][1]));
        G.add(box(THREE, dark, 0.12, 0.30, 0.20, ROL[i][0], s * 1.24, ROL[i][1] + 0.06));
      }
      /* front compensating idler: smooth rimmed, raised clear of the run */
      G.add(axle(THREE, rubber, IDL.r, 0.18, 14, IDL.x, ty - 0.11, IDL.z));
      G.add(axle(THREE, rubber, IDL.r, 0.18, 14, IDL.x, ty + 0.11, IDL.z));
      G.add(saxle(THREE, skin, IDL.r * 0.74, 0.415, 14, IDL.x, ty, IDL.z));
      G.add(axle(THREE, metal, IDL.r * 0.20, 0.44, 8, IDL.x, ty, IDL.z));
      /* rear drive sprocket: hub plus eleven teeth standing out of it */
      G.add(axle(THREE, metal, SPR.r * 0.70, 0.44, 14, SPR.x, ty, SPR.z));
      G.add(axle(THREE, dark, SPR.r * 0.36, 0.50, 10, SPR.x, ty, SPR.z));
      for (i = 0; i < 11; i++) {
        a = i / 11 * Math.PI * 2;
        o = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.42, 0.10), metal);
        o.position.set(SPR.x + Math.cos(a) * SPR.r * 0.88, ty,
                       SPR.z + Math.sin(a) * SPR.r * 0.88);
        o.rotation.y = -a; G.add(o);
      }
    }

    /* ============================================================ TURRET */
    var T = new THREE.Group();
    T.name = "turret";                       /* the renderer traverses for this */
    T.position.set(TRX, 0, ZR);

    /* Elongated cast turret: widest a third back, tapering to a narrow snout
       at the mantlet and rounded off over a short bustle. sq stays around
       0.5 so the roof is flat and the shoulders are round - a casting, not a
       sphere and not a welded box. */
    var TUR = [
      [-1.62, 0.68,  0.20, 0.72, 0.62],
      [-1.35, 0.95,  0.10, 0.80, 0.56],
      [-0.95, 1.24,  0.02, 0.85, 0.50],
      [-0.40, 1.42, -0.04, 0.87, 0.48],
      [ 0.15, 1.46, -0.06, 0.88, 0.48],
      [ 0.62, 1.40, -0.05, 0.87, 0.50],
      [ 1.05, 1.20, -0.02, 0.84, 0.56],
      [ 1.45, 0.90,  0.05, 0.78, 0.66],
      [ 1.78, 0.60,  0.13, 0.70, 0.78],
      [ 2.00, 0.42,  0.20, 0.62, 0.90]
    ];
    var tsec = [];
    for (i = 0; i < TUR.length; i++) {
      s = TUR[i];
      tsec.push({ x: s[0], w: s[1], h: (s[3] - s[2]) * 0.5,
                  zc: (s[3] + s[2]) * 0.5, sq: s[4] });
    }
    tsec.reverse();
    var turGeo = M.loft(THREE, tsec, 26);
    /* the same 292 px/m as the hull, biased into the cleaner upper half of
       the sheet because a turret roof does not live in the track spray */
    heightUV(turGeo, -3.360, 3.602, -0.408, 0.880);
    T.add(new THREE.Mesh(turGeo, skin));

    /* turret ring shroud, so the join with the deck is not a floating gap */
    T.add(upright(THREE, dark, 1.12, 1.16, 0.14, 20, 0, 0, -0.06));

    /* flat roof plate */
    var rt = 0.07;
    pts = [[1.30, 0.62], [1.05, 1.05], [0.30, 1.30], [-0.85, 1.20],
           [-1.32, 0.72], [-1.32, -0.72], [-0.85, -1.20], [0.30, -1.30],
           [1.05, -1.05], [1.30, -0.62]];
    g2 = M.slab(THREE, pts, rt);
    uvMul(g2, 0.143, 0.571, 0.55, 0.62);
    o = new THREE.Mesh(g2, skin); o.position.z = TTH - rt + 0.005; T.add(o);

    /* --------------------------------------------- M19 commander's cupola */
    /* The tallest thing on the tank and the M60's signature. A drum standing
       clear of the roof, ringed with vision blocks, with its own .50 in a
       mount across the front of it. Commander sits on the right = -Y. */
    var CX = 0.06, CY = -0.62, CZ = TTH;
    T.add(upright(THREE, skin, 0.50, 0.54, 0.10, 18, CX, CY, CZ + 0.05));
    o = upright(THREE, skin, 0.46, 0.47, 0.34, 18, CX, CY, CZ + 0.27);
    T.add(o);
    for (i = 0; i < 8; i++) {
      a = i / 8 * Math.PI * 2;
      o = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.17, 0.13), glass);
      o.position.set(CX + Math.cos(a) * 0.46, CY + Math.sin(a) * 0.46, CZ + 0.28);
      o.rotation.z = a; T.add(o);
    }
    T.add(upright(THREE, skin, 0.44, 0.47, 0.10, 18, CX, CY, CZ + 0.49));
    T.add(upright(THREE, skin, 0.30, 0.30, 0.07, 14, CX - 0.06, CY, CZ + 0.57));
    T.add(box(THREE, metal, 0.26, 0.05, 0.05, CX - 0.24, CY, CZ + 0.58));
    /* the cupola's own machine gun: M85 .50 in its external mount */
    T.add(box(THREE, dark, 0.30, 0.22, 0.20, CX + 0.44, CY, CZ + 0.30));
    T.add(box(THREE, metal, 0.36, 0.14, 0.16, CX + 0.52, CY, CZ + 0.44));
    T.add(alongX(THREE, metal, 0.030, 0.042, 0.72, 8, CX + 1.00, CY, CZ + 0.45));
    T.add(box(THREE, metal, 0.09, 0.16, 0.12, CX + 0.60, CY, CZ + 0.56));
    T.add(box(THREE, metal, 0.22, 0.05, 0.14, CX + 0.30, CY - 0.16, CZ + 0.40));

    /* ------------------------------------------------- loader's station */
    var LX = -0.34, LY = 0.72;
    T.add(upright(THREE, dark, 0.36, 0.36, 0.07, 16, LX, LY, TTH + 0.035));
    T.add(upright(THREE, skin, 0.32, 0.32, 0.09, 16, LX, LY, TTH + 0.10));
    T.add(box(THREE, dark, 0.18, 0.26, 0.12, LX + 0.46, LY, TTH + 0.07));
    o = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.20, 0.09), glass);
    o.position.set(LX + 0.55, LY, TTH + 0.09); T.add(o);
    /* the roof ventilator mushroom */
    T.add(upright(THREE, skin, 0.19, 0.16, 0.13, 14, -0.80, 0.05, TTH + 0.06));

    /* ------------------------------------------------- mantlet and gun */
    /* The M60A1's mantlet is a fat rounded casting with a shroud around the
       tube; it is what makes the front of the turret read as a snout. */
    o = new THREE.Mesh(new THREE.SphereGeometry(0.52, 16, 11), skin);
    o.scale.set(0.80, 1.22, 1.04);
    o.position.set(1.92, 0, 0.42);
    T.add(o);
    /* The canvas dust cover over the trunnions. It has to close DOWN onto the
       tube: left flaring, the exposed front annulus caught the key light and
       the whole gun mount read as a megaphone. */
    T.add(alongX(THREE, skin, 0.155, 0.33, 0.40, 14, 2.30, 0, 0.42));

    /* M68 105 mm: bore evacuator a little past mid barrel, plain muzzle */
    var GB = 2.15, GT = 5.78;                    /* breech end, muzzle       */
    T.add(alongX(THREE, metal, 0.072, 0.118, GT - GB, 16, (GB + GT) * 0.5, 0, 0.42));
    T.add(alongX(THREE, metal, 0.185, 0.185, 0.62, 16, 4.02, 0, 0.42));
    T.add(alongX(THREE, metal, 0.098, 0.098, 0.14, 14, GT - 0.07, 0, 0.42));
    /* the coaxial machine gun port beside the mantlet */
    T.add(box(THREE, dark, 0.30, 0.14, 0.14, 2.24, -0.44, 0.50));

    /* ------------------------------- AN/VSS-1 xenon searchlight over the gun */
    var SLX = 1.74, SLZ = 0.99;
    T.add(sbox(THREE, skin, 0.52, 0.72, 0.54, SLX, 0, SLZ));
    o = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.06, 16), lamp);
    o.rotation.z = -Math.PI / 2;
    o.position.set(SLX + 0.28, 0, SLZ); T.add(o);
    for (s = -1; s <= 1; s += 2)
      T.add(box(THREE, metal, 0.10, 0.08, 0.34, SLX + 0.02, s * 0.30, SLZ - 0.40));
    T.add(box(THREE, metal, 0.34, 0.16, 0.10, SLX - 0.16, 0, SLZ - 0.30));

    /* ------------------------------------------- smoke grenade launchers */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 6; i++)
      T.add(alongX(THREE, dark, 0.052, 0.052, 0.30, 7,
                   1.02 - (i % 3) * 0.11, s * 1.30,
                   0.50 + ((i / 3) | 0) * 0.14));
    for (s = -1; s <= 1; s += 2)
      T.add(box(THREE, dark, 0.34, 0.06, 0.30, 0.86, s * 1.36, 0.56));

    /* ------------------------------------------- turret bustle stowage rack */
    /* the wire basket hung off the back of the turret: pure Cold War US, and
       from a three quarter view it doubles the apparent length of the bustle */
    var BX0 = -1.62, BX1 = -2.24, BY = 0.74, BZ0 = 0.18, BZ1 = 0.62;
    T.add(box(THREE, dark, BX0 - BX1, BY * 2, 0.05, (BX0 + BX1) * 0.5, 0, BZ0));
    for (i = 0; i <= 3; i++)
      T.add(box(THREE, dark, 0.05, BY * 2, 0.05, BX0 - i * (BX0 - BX1) / 3, 0, BZ1));
    for (s = -1; s <= 1; s += 2) {
      T.add(box(THREE, dark, BX0 - BX1, 0.05, 0.05, (BX0 + BX1) * 0.5, s * BY, BZ1));
      for (i = 0; i < 4; i++)
        T.add(box(THREE, dark, 0.05, 0.05, BZ1 - BZ0,
                  BX0 - i * (BX0 - BX1) / 3, s * BY, (BZ0 + BZ1) * 0.5));
    }
    T.add(sbox(THREE, skin, 0.44, 0.80, 0.30, -1.90, 0.10, BZ0 + 0.20));

    /* two whip aerials at the back corners */
    for (s = -1; s <= 1; s += 2) {
      T.add(upright(THREE, dark, 0.055, 0.075, 0.16, 8, -1.28, s * 0.92, TTH - 0.02));
      T.add(upright(THREE, metal, 0.012, 0.028, 1.25, 5, -1.28, s * 0.92, TTH + 0.66));
    }
    /* spare track links on the turret cheek */
    for (i = 0; i < 4; i++)
      T.add(box(THREE, dark, 0.10, 0.44, 0.09, 0.42 - i * 0.12, 1.34, 0.24));

    /* ------------------------------------------------------ team colours */
    /* ownership has to read on a busy map from directly above as well as
       from the side, so: a band on each turret cheek and a roof panel */
    T.add(box(THREE, team, 0.62, 0.06, 0.15, -0.62, 1.345, 0.34));
    T.add(box(THREE, team, 0.62, 0.06, 0.15, -0.62, -1.345, 0.34));
    T.add(box(THREE, team, 0.58, 0.30, 0.04, -1.06, 0, TTH + 0.02));
    G.add(T);

    for (s = -1; s <= 1; s += 2)
      G.add(box(THREE, team, 0.54, 0.05, 0.16, 2.62, s * (HW + 0.03), ZR - 0.20));
    p = onGlacis(0.86, 0.055);
    o = box(THREE, team, 0.24, 1.34, 0.05, p.x, 0, p.z);
    o.rotation.y = gang; G.add(o);

    return G;
  }

  /* ------------------------------------------------------- registration */
  /* Unconditional: a hero model replaces whatever the parametric layer in
     armour3d.js registered for this id. */
  UNIT_MODELS["nato_e60_mbt"] = {
    len: 6.95,
    build: function (THREE, M, C) { return build(THREE, M, C); }
  };
})();
