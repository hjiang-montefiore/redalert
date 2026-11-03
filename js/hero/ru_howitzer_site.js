/* ===== ru_howitzer_site.js - HERO model: Soviet / Russian towed-howitzer battery
   BUILDINGS id "arty" ("Fixed 155mm battery" in the shared text), side "pact".
   The shared model is a single 155 mm tube with a US-style split trail and
   a round pit. For the Soviet / Russian army the same site is a battery of
   towed 152 mm guns, so this file registers BLD_MODELS["arty_pact_<era>"]:

     e50  ML-20 (M1937) 152 mm gun-howitzer. Built 1937-1946; "eventually
          replaced by the D-20, which entered production in 1956" (Wikipedia,
          "ML-20"); in Soviet service "for a long time after the war".
     e60  D-20 (M1955) 152 mm gun-howitzer, army-level gun of the 1960s
          (Wikipedia "D-20 howitzer": production from 1956).
     e80  D-20 again: the 2A65 Msta-B has been fielded "since at least 1987"
          (Wikipedia "2A65 Msta-B"; infobox "in service 1987-present"), the
          last year of the decade.
     e90, e00, e20  2A65 Msta-B (M1987) 152.4 mm, "in service with Russian front
          and army level artillery units as of 2022" (same page).
     D-30 122 mm is NOT drawn: it is a three-trail divisional howitzer.

   PUBLISHED FIGURES (Wikipedia infoboxes, re-read 2026-11-03) against the model
   (gun local frame, axle at x = 0; travel length taken muzzle to lunette with
   the trails closed and the tube level):
     ML-20  tube 4.412 m without brake (L/29)    drawn 4.412 m + 0.70 m brake
            width 2.35 m                          drawn 2.36 m over the hubs
            height 2.27 m travelling              drawn 2.27 m (equilibrator tops)
            length 8.18 m with limber, tube pulled back - not comparable; not used
     D-20   tube 5.195 m with brake (L/34)       drawn 5.195 m (brake 0.625 m)
            length 8.69 m travelling             drawn 8.69 m
            width 2.35 m                          drawn 2.39 m over the hubs (+1.7%)
            height 1.93 m                         drawn 1.94 m (sight top), shield 1.89 m
     2A65   tube 7.2 m L/47 without brake,       drawn 7.20 + 0.93 m brake = 8.13 m
            8.13 m L/53.3 with brake
            length 12.7 m travelling             drawn 12.71 m
            width, height: not given             drawn 2.66 m over the hubs, 2.35 m
   Trails are set so that, closed, the muzzle-to-lunette length is the
   published travel length (D-20, 2A65). Not published, read off the
   photographs (good to about 5-8 per cent): tyre sizes, track of the 2A65,
   trunnion heights, shield outlines, trail sections and spread, brake
   sections, spade and caster sizes; the ML-20 trail length (its travel
   figure includes the limber). The ML-20 brake length (0.70 m) is scaled
   off "152 mm howitzer-gun M1937 (ML-20) 1.jpg" against the 4.412 m tube.
   Cartridge case drawn 547.5 mm long (the D-20 infobox gives 152.4 x 547.5 mm R;
   the 2019 photographs show brass cases beside the 2A65, their length not
   published there); the projectile length (0.69 m) is scaled off the 2019
   photograph of a loader holding one.

   RECOGNITION LIST (each drawn; reference in brackets):
     1 ML-20: twelve-spoke wheels with narrow tyres  [ML-20 1; wartime pit photo]
     2 ML-20: long cylindrical slotted muzzle brake, ring rows of slots [ML-20 1]
     3 ML-20: thick recuperator along the top of the tube, the two tall
       equilibrator columns standing in front of the shield [ML-20 1; "Gaubitsa-
       pushka ML-20 vedet ogon'" (wartime firing photograph)]
     4 D-20: shield with the wavy (scalloped) top edge and side wings angled
       back over the wheels, a lower shield under the cradle [D-20-4597; D-20 of
       the Hungarian Armed Forces]
     5 D-20: boxy double-baffle brake with two big windows a side, round muzzle
       collar [Howitzer D-20.jpg]
     6 D-20: the two recoil cylinders on top of the cradle behind the shield;
       the equilibrator each side [D-20-4597]
     7 D-20: big truck tyres on green disc wheels, round firing-jack plate under
       the front, box trails with handles, the small wheel on each trail, spades
       [Howitzer D-20.jpg; Hungarian; "152mm D-20 Moldova"; Fire Shield 2019]
     8 2A65: long low L/53 tube with the long multi-slot brake [2A65 Msta-B.JPG;
       "2A65 Msta-B howitzer (14-11-2019) 05" (silhouette, deployed)]
     9 2A65: the tall flat shield with rounded top corners and the wings swept
       back, the long recoil cylinders on top running forward of the shield
       ["152-mm howitzer 2A65 Msta-B.JPG"; (14-11-2019) 02; (14-11-2019) 05]
    10 2A65: big single tyres, the large circular firing-jack plate, long box
       trails ending in wide wedge spades, a caster wheel swung up on top of
       each trail ["2A65 152 mm howitzer-4585.JPG"; Wikipedia]
    11 Position: three guns abreast, trails spread, the middle one trained.

   THE POSITION. e50: the wartime photograph "Batareya orudiy kapitana
   V.A.Gontarchuka na ognevoy pozitsii" (cited by the first version; form only,
   no wartime marking drawn) shows the ML-20 in a shallow pit with the spoil
   heaped as a low bank in front and at the sides, the trails lying in the open
   rear: a lofted horseshoe bank round each ML-20. e60/e80: Soviet-pattern D-20
   batteries fire from OPEN, UNDUG ground, guns side by side, trails spread
   ("Moldovan soldiers execute battery live fire", "152mm D-20 Moldova",
   Fire Shield 2019): no pit, bank or store is drawn. e90-e20: the Russian MoD
   photographs "ArtilleryExercise2019-09" and "-16" (2A65 of the 150th Motor
   Rifle Division, 29 May 2019) show the guns on open grass and, beside them,
   an AMMUNITION PIT dug in black earth with the spoil heaped round it, green
   wooden crates opened in it (grey projectiles two to a crate, brass
   cartridge cases in others), lids and loose boards lying about: two such
   pits are drawn between the guns, open toward the middle gun. Not drawn (no
   photograph found): gun pits for the 2A65 or D-20, dugouts, nets, tractors,
   crew, the battery fire-direction post. The 2017 photograph of a 2A65 behind
   a low green plank parapet ("(24-10-2017) 01") is a display at a range and is
   not drawn.

   GROUND APRON (all six keys). A plain flat apron of beaten earth, 26 x 26 m,
   3 cm thick with a stepped edge, in the dry soil-and-stubble colour of the
   ground in the Fire Shield photographs; only the plot's footprint so the site
   does not read as empty, not a fortification.

   LAYOUT AND COMPRESSION. A real battery is six guns at 30-40 m intervals; here
   three, 9-9.5 m apart, abreast, all at TRUE size, the central one the
   "turret" (the whole gun turns on its axle), the two flank guns baked, at the
   same 5-6 degree elevation, pointing +X. All inside 30 x 30 m (26 x 26 m);
   ground z = 0. Model space: Z up, metres, +X the direction the tube points
   at rest.

   PAINT (photo samples taken to about 0.8 of their level): Soviet green on a
   canvas texture (tonal touch-up patches, plate seams, rain streaks, chips) -
   ML-20 the darker wartime green, D-20 the museum and Moldovan-service green,
   2A65 the olive of the 2019 MoD photographs. Black earth of the 2019 pits for
   the spoil. Materials (9): apron, earth, paint, dark (tyres, slots, bores),
   crate green, raw wood, brass, projectile grey, TEAM (exactly C.team: one
   small flat placard 2 cm above the top of each gun's left trail, by the hinge). No markings,
   numbers or insignia.
   BUDGET (dump.js): e50 15.4k triangles, 8 draw calls, 5 materials; e60/e80
   15.0k, 7, 4; e90-e20 18.6k, 12, 9. The whole central gun is the turret and
   turns on its axle, as before; trained far off +X the 2A65's trails pass over
   the ammunition pits. ASCII only. */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroHowitzerSite = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------------ vectors */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, s) { return [a[0] * s, a[1] * s, a[2] * s]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }

  /* ------------------------------------------------- one bin per material
     Planar UVs from each face's dominant axis (k repeats per metre), so the
     canvas paint lands on every surface without stretching. */
  function Bin(mat, k) { this.mat = mat; this.P = []; this.N = []; this.U = []; this.k = k || 0.5; this.M = null; }
  Bin.prototype.push3 = function (a, b, c, na, nb, nc) {
    var e1 = sub(b, a), e2 = sub(c, a), f = cross(e1, e2), k = this.k;
    var ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), v = [a, b, c], n = [na, nb, nc], i, q;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
      else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
      else this.U.push(q[1] * k, q[2] * k);
    }
  };
  /* a three.js geometry through matrix M (and the bin's base matrix) */
  Bin.prototype.geo = function (g, M) {
    var gg = g.index ? g.toNonIndexed() : g;
    if (M) gg.applyMatrix4(M);
    if (this.M) gg.applyMatrix4(this.M);
    if (!gg.attributes.normal) gg.computeVertexNormals();
    var p = gg.attributes.position.array, n = gg.attributes.normal.array, i;
    for (i = 0; i + 8 < p.length; i += 9) {
      this.push3([p[i], p[i + 1], p[i + 2]], [p[i + 3], p[i + 4], p[i + 5]], [p[i + 6], p[i + 7], p[i + 8]],
                 [n[i], n[i + 1], n[i + 2]], [n[i + 3], n[i + 4], n[i + 5]], [n[i + 6], n[i + 7], n[i + 8]]);
    }
    if (gg !== g) gg.dispose();
    g.dispose();
  };
  /* one flat triangle turned to face away from the point ctr (base matrix applied) */
  Bin.prototype.tri = function (a, b, c, ctr) {
    var f = unit(cross(sub(b, a), sub(c, a))), m = mul(add(add(a, b), c), 1 / 3);
    if (dot(f, sub(m, ctr)) < 0) { var t = b; b = c; c = t; f = mul(f, -1); }
    if (this.M) {
      var e = this.M.elements;
      var tp = function (q) { return [e[0] * q[0] + e[4] * q[1] + e[8] * q[2] + e[12], e[1] * q[0] + e[5] * q[1] + e[9] * q[2] + e[13], e[2] * q[0] + e[6] * q[1] + e[10] * q[2] + e[14]]; };
      var tn = function (q) { return unit([e[0] * q[0] + e[4] * q[1] + e[8] * q[2], e[1] * q[0] + e[5] * q[1] + e[9] * q[2], e[2] * q[0] + e[6] * q[1] + e[10] * q[2]]); };
      a = tp(a); b = tp(b); c = tp(c); f = tn(f);
    }
    this.push3(a, b, c, f, f, f);
  };
  Bin.prototype.quad = function (a, b, c, d, ctr) { this.tri(a, b, c, ctr); this.tri(a, c, d, ctr); };
  Bin.prototype.mesh = function (THREE) {
    if (!this.P.length) return null;
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(this.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(this.N), 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(this.U), 2));
    geo.computeBoundingSphere();
    var m = new THREE.Mesh(geo, this.mat);
    m.castShadow = true; m.receiveShadow = true;
    return m;
  };

  /* ------------------------------------------------------- shape kit
     Every call takes a frame matrix F (the gun frame, or the elevated tube
     frame) and draws in that frame. */
  function Kit(THREE) { this.T = THREE; }
  Kit.prototype.m = function (F, x, y, z, rz, ry) {
    var T = this.T, L = new T.Matrix4().makeTranslation(x, y, z);
    if (rz) L.multiply(new T.Matrix4().makeRotationZ(rz));
    if (ry) L.multiply(new T.Matrix4().makeRotationY(ry));
    return F ? F.clone().multiply(L) : L;
  };
  Kit.prototype.box = function (bin, F, cx, cy, cz, sx, sy, sz, rz, ry) {
    bin.geo(new this.T.BoxGeometry(sx, sy, sz), this.m(F, cx, cy, cz, rz, ry));
  };
  /* cylinder or cone from point a (radius r0) to point b (radius r1) */
  Kit.prototype.cyl = function (bin, F, a, b, r0, r1, seg) {
    var T = this.T, va = new T.Vector3(a[0], a[1], a[2]), vb = new T.Vector3(b[0], b[1], b[2]);
    var d = vb.clone().sub(va), len = d.length();
    var q = new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize());
    var L = new T.Matrix4().compose(va.clone().add(vb).multiplyScalar(0.5), q, new T.Vector3(1, 1, 1));
    bin.geo(new T.CylinderGeometry(r1, r0, len, seg || 12), F ? F.clone().multiply(L) : L);
  };
  /* a lathe along local +X: prof = [[x, r], ...] with x increasing */
  Kit.prototype.latheX = function (bin, F, prof, seg, y, z) {
    var T = this.T, pts = [], i;
    for (i = 0; i < prof.length; i++) pts.push(new T.Vector2(Math.max(0.0008, prof[i][1]), prof[i][0]));
    var g = new T.LatheGeometry(pts, seg || 20);
    g.rotateZ(-Math.PI / 2);
    bin.geo(g, this.m(F, 0, y || 0, z || 0));
  };
  /* a lathe about an axis along local Y (wheels): prof = [[y, r], ...], y increasing */
  Kit.prototype.latheY = function (bin, F, prof, seg, x, y, z) {
    var T = this.T, pts = [], i;
    for (i = 0; i < prof.length; i++) pts.push(new T.Vector2(Math.max(0.0008, prof[i][1]), prof[i][0]));
    bin.geo(new T.LatheGeometry(pts, seg || 24), this.m(F, x, y, z));
  };
  /* a flat plate: outline pts [[u, v], ...] in the plane spanned by unit u
     (horizontal) and v (up) through O, thickness t along u x v */
  Kit.prototype.plate = function (bin, F, pts, O, u, v, t) {
    var T = this.T, s = new T.Shape(), i, w = cross(u, v);
    s.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
    s.lineTo(pts[0][0], pts[0][1]);
    var g = new T.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 3 });
    g.translate(0, 0, -t / 2);
    var M = new T.Matrix4().makeBasis(new T.Vector3(u[0], u[1], u[2]), new T.Vector3(v[0], v[1], v[2]),
                                      new T.Vector3(w[0], w[1], w[2]));
    M.setPosition(O[0], O[1], O[2]);
    bin.geo(g, F ? F.clone().multiply(M) : M);
  };
  /* a loft through rings of points (same count, convex), ends capped */
  Kit.prototype.loft = function (bin, F, rings) {
    var T = this.T, old = bin.M, i, j, n = rings[0].length, r, s, c0, c1, cc;
    bin.M = F ? (old ? old.clone().multiply(F) : F) : old;
    function cen(R) { var c = [0, 0, 0], k; for (k = 0; k < R.length; k++) c = add(c, R[k]); return mul(c, 1 / R.length); }
    for (i = 0; i + 1 < rings.length; i++) {
      r = rings[i]; s = rings[i + 1]; cc = lerp(cen(r), cen(s), 0.5);
      for (j = 0; j < n; j++) bin.quad(r[j], r[(j + 1) % n], s[(j + 1) % n], s[j], cc);
    }
    c0 = lerp(cen(rings[0]), cen(rings[1]), 0.5);
    c1 = lerp(cen(rings[rings.length - 1]), cen(rings[rings.length - 2]), 0.5);
    for (j = 1; j + 1 < n; j++) {
      bin.tri(rings[0][0], rings[0][j], rings[0][j + 1], c0);
      r = rings[rings.length - 1];
      bin.tri(r[0], r[j], r[j + 1], c1);
    }
    bin.M = old;
  };
  /* a box-section beam lofted from a to b through stations [[t, w, h], ...] */
  Kit.prototype.trail = function (bin, F, a, b, st) {
    var d = unit(sub(b, a)), dh = unit([d[0], d[1], 0]), ac = [-dh[1], dh[0], 0], up = [0, 0, 1], rings = [], i, c;
    for (i = 0; i < st.length; i++) {
      c = lerp(a, b, st[i][0]);
      var hw = st[i][1] / 2, hh = st[i][2] / 2;
      rings.push([add(add(c, mul(ac, hw)), mul(up, hh)), add(add(c, mul(ac, -hw)), mul(up, hh)),
                  add(add(c, mul(ac, -hw)), mul(up, -hh)), add(add(c, mul(ac, hw)), mul(up, -hh))]);
    }
    this.loft(bin, F, rings);
  };
  /* an earth bank: path [[x, y, hScale], ...], cross profile [[off, z], ...]
     (feet at z 0), faces turned up */
  Kit.prototype.bank = function (bin, F, path, prof) {
    var old = bin.M, i, j, rows = [], p, q, d, nrm;
    bin.M = F ? (old ? old.clone().multiply(F) : F) : old;
    for (i = 0; i < path.length; i++) {
      p = path[Math.max(0, i - 1)]; q = path[Math.min(path.length - 1, i + 1)];
      d = unit([q[0] - p[0], q[1] - p[1], 0]); nrm = [-d[1], d[0], 0];
      var row = [];
      for (j = 0; j < prof.length; j++)
        row.push([path[i][0] + nrm[0] * prof[j][0], path[i][1] + nrm[1] * prof[j][0], 0.03 + prof[j][1] * path[i][2]]);
      rows.push(row);
    }
    for (i = 0; i + 1 < rows.length; i++)
      for (j = 0; j + 1 < prof.length; j++) {
        var a = rows[i][j], b = rows[i][j + 1], c = rows[i + 1][j + 1], e = rows[i + 1][j];
        var below = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2, -50];
        bin.tri(a, b, c, below); bin.tri(a, c, e, below);
      }
    bin.M = old;
  };

  /* ---------------------------------------------------------- paint */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function canvasTex(THREE, key, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      draw(cv.getContext("2d"));
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function hex(c) { var s = c.toString(16); while (s.length < 6) s = "0" + s; return "#" + s; }
  /* Soviet green coat: touch-up patches, plate seams every 0.5 m, rain streaks
     and chips; one tile is 2 m of surface (UVs 0.5 per metre) */
  function paintTex(THREE, base, seed) {
    return canvasTex(THREE, "rhs_p" + base + "_" + seed, function (q) {
      var R = rng(seed), i, x, y, w;
      q.fillStyle = hex(base); q.fillRect(0, 0, 256, 256);
      for (i = 0; i < 18; i++) {
        x = R() * 256; y = R() * 256; w = 20 + R() * 50;
        q.fillStyle = (i % 2) ? "rgba(20,24,12,0.16)" : "rgba(170,175,130,0.10)";
        q.beginPath(); q.ellipse(x, y, w, w * (0.4 + R() * 0.5), R() * 3, 0, TAU); q.fill();
      }
      q.strokeStyle = "rgba(14,16,10,0.30)"; q.lineWidth = 1.2;
      for (i = 0; i < 4; i++) {
        q.beginPath(); q.moveTo(i * 64 + 20.5, 0); q.lineTo(i * 64 + 20.5, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 64 + 44.5); q.lineTo(256, i * 64 + 44.5); q.stroke();
      }
      q.fillStyle = "rgba(12,13,9,0.35)";
      for (i = 0; i < 32; i++) { q.fillRect(i * 8 + 3, 41, 2, 2); q.fillRect(17, i * 8 + 2, 2, 2); }
      for (i = 0; i < 110; i++) {
        q.fillStyle = (i % 3) ? "rgba(16,16,10,0.09)" : "rgba(230,225,200,0.06)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 6 + R() * 36);
      }
      for (i = 0; i < 70; i++) { q.fillStyle = (i % 2) ? "rgba(10,10,8,0.25)" : "rgba(120,100,70,0.22)"; q.fillRect(R() * 256, R() * 256, 2, 2); }
    });
  }
  /* beaten earth with stubble, clods and wheel-trodden patches; tile 6.7 m */
  function groundTex(THREE, base, seed, black) {
    return canvasTex(THREE, "rhs_g" + base + "_" + seed, function (q) {
      var R = rng(seed), i, x, y, w;
      q.fillStyle = hex(base); q.fillRect(0, 0, 256, 256);
      for (i = 0; i < 26; i++) {
        x = R() * 256; y = R() * 256; w = 14 + R() * 46;
        q.fillStyle = (i % 3) ? "rgba(40,32,22,0.16)" : "rgba(190,175,130,0.13)";
        q.beginPath(); q.ellipse(x, y, w, w * (0.5 + R() * 0.5), R() * 3, 0, TAU); q.fill();
      }
      for (i = 0; i < 420; i++) {
        x = R() * 256; y = R() * 256;
        q.fillStyle = black ? ((i % 2) ? "rgba(15,12,10,0.35)" : "rgba(110,95,80,0.25)")
                            : ((i % 3) ? "rgba(200,185,130,0.30)" : "rgba(50,42,28,0.30)");
        q.fillRect(x, y, black ? 3 : 1, black ? 3 : 2 + R() * 4);
      }
    });
  }
  function texMat(THREE, tex, base, rough, metal) {
    var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: rough, metalness: metal });
    if (tex) m.map = tex; else m.color.set(base);
    return m;
  }

  /* ---------------------------------------------------------------- guns
     Gun frame: axle on x = 0, y = 0, ground z = 0, tube toward +x.
     S = { P: paint bin, D: dark bin }. Each spec carries its own figures. */
  var GUNS = {
    ml20: { R: 0.62, track: 1.06, tx: 0.05, tz: 1.52, elev: 0.10, gap: 9.0, shift: 0.40,
            tube: -1.55, len: 4.412, brake: 0.70, paint: 0x404a2f, topz: 0.97,
            hinge: [-0.40, 0.25, 0.62], tlen: 4.30, spread: 0.42 },
    d20:  { R: 0.575, track: 1.025, tx: 0.15, tz: 1.36, elev: 0.10, gap: 9.0, shift: -0.28,
            tube: -1.05, len: 5.195, brake: 0.625, paint: 0x46533a, topz: 0.97,
            hinge: [-0.35, 0.24, 0.60], tlen: 3.70, spread: 0.44 },
    msta: { R: 0.63, track: 1.12, tx: 0.25, tz: 1.62, elev: 0.08, gap: 9.5, shift: -0.70,
            tube: -1.55, len: 8.13, brake: 0.93, paint: 0x4d5139, topz: 1.03,
            hinge: [-0.45, 0.28, 0.66], tlen: 5.08, spread: 0.28 }
  };
  var KEYS = { e50: "ml20", e60: "d20", e80: "d20", e90: "msta", e00: "msta", e20: "msta" };

  /* elevated tube frame: u along the bore from the trunnions, w left, h up */
  function tubeFrame(K, F, G) {
    var T = K.T, E = new T.Matrix4().makeTranslation(G.tx, 0, G.tz);
    E.multiply(new T.Matrix4().makeRotationY(-G.elev));
    return F.clone().multiply(E);
  }

  /* truck tyre on a green disc wheel (D-20, 2A65) */
  function discWheel(K, S, F, y, R, w, rimR) {
    var hw = w / 2, tread = [], i, n = 7;
    tread.push([-hw, rimR], [-hw, R - 0.07], [-hw + 0.035, R - 0.02]);
    for (i = 0; i <= n; i++) {                                         /* grooved tread: alternate radius */
      var yy = -hw + 0.06 + (w - 0.12) * i / n;
      tread.push([yy, (i % 2) ? R - 0.008 : R]);
    }
    tread.push([hw - 0.035, R - 0.02], [hw, R - 0.07], [hw, rimR], [-hw, rimR]);
    K.latheY(S.D, F, tread, 28, 0, y, R);
    var s = y > 0 ? 1 : -1, hub = 0.11;
    /* dished disc and hub, the outer face proud of the tyre wall */
    K.latheY(S.P, F, [[-hw + 0.02, 0.001], [-hw + 0.02, rimR + 0.01], [hw - 0.02, rimR + 0.01], [hw - 0.02, 0.001]], 20, 0, y, R);
    K.latheY(S.P, F, s > 0 ? [[hw - 0.10, hub * 1.6], [hw - 0.04, hub], [hw + 0.0, hub * 0.7], [hw + 0.02, 0.001]]
                           : [[-hw - 0.02, 0.001], [-hw - 0.0, hub * 0.7], [-hw + 0.04, hub], [-hw + 0.10, hub * 1.6]], 14, 0, y, R);
  }
  /* the ML-20's twelve-spoke wheel with a narrow tyre */
  function spokedWheel(K, S, F, y, R) {
    var T = K.T, w = 0.13, i;
    K.latheY(S.D, F, [[-w / 2, R - 0.07], [-w / 2, R - 0.02], [-w / 2 + 0.03, R], [w / 2 - 0.03, R], [w / 2, R - 0.02], [w / 2, R - 0.07], [-w / 2, R - 0.07]], 28, 0, y, R);
    K.latheY(S.P, F, [[-w / 2 - 0.005, R - 0.13], [-w / 2 - 0.005, R - 0.065], [w / 2 + 0.005, R - 0.065], [w / 2 + 0.005, R - 0.13], [-w / 2 - 0.005, R - 0.13]], 28, 0, y, R);
    var s = y > 0 ? 1 : -1;
    K.latheY(S.P, F, [[-0.10, 0.001], [-0.10, 0.09], [-0.07, 0.14], [0.07, 0.14], [0.10, 0.09], [0.10, 0.001]], 14, 0, y + s * 0.02, R);
    for (i = 0; i < 12; i++) {
      var a = i * TAU / 12, ca = Math.cos(a), sa = Math.sin(a);
      K.cyl(S.P, F, [ca * 0.13, y - s * 0.02, R + sa * 0.13], [ca * (R - 0.12), y, R + sa * (R - 0.12)], 0.034, 0.022, 6);
    }
  }
  /* split trails, spades, lunette; small wheel on each trail (D-20 small
     wheel at 0.88, 2A65 caster at 0.72) */
  function trails(K, S, F, G, sec, spade, small) {
    var s, h = G.hinge, tl = G.tlen, sp = G.spread;
    for (s = -1; s <= 1; s += 2) {
      var a = [h[0], s * h[1], h[2]];
      var b = [h[0] - tl * Math.cos(sp), s * (h[1] + tl * Math.sin(sp)), sec.endZ];
      K.trail(S.P, F, a, b, sec.st);
      var d = unit(sub(b, a)), dh = unit([d[0], d[1], 0]), ac = [-dh[1], dh[0], 0];
      var ang = Math.atan2(dh[1], dh[0]);
      /* carrying handles along the top */
      for (var k = 1; k <= 3; k++) {
        var c = lerp(a, b, 0.25 + k * 0.17), hh = sec.st[1][2] / 2;
        K.box(S.D, F, c[0], c[1], c[2] + hh + 0.035, 0.20, 0.03, 0.03, ang);
        K.box(S.D, F, c[0] + ac[0] * 0.0, c[1], c[2] + hh + 0.015, 0.03, 0.10, 0.03, ang);
      }
      /* hinge lugs to the lower carriage */
      K.cyl(S.P, F, [a[0], a[1], a[2] - 0.2], [a[0], a[1], a[2] + 0.2], 0.08, 0.08, 10);
      /* the spade: a trapezoid plate across the trail end, driven into the ground */
      var e = lerp(a, b, 1.0), sw = spade.w, sb = spade.wb;
      K.plate(S.P, F, [[-sw / 2, spade.top], [sw / 2, spade.top], [sb / 2, 0.0], [-sb / 2, 0.0]],
              [e[0] + dh[0] * 0.04, e[1] + dh[1] * 0.04, 0], ac, [0, 0, 1], 0.03);
      K.plate(S.P, F, [[-0.03, 0.0], [0.03, 0.0], [0.03, spade.top], [-0.03, spade.top]],
              [e[0] - dh[0] * 0.18, e[1] - dh[1] * 0.18, 0], ac, [0, 0, 1], 0.36);   /* brace */
      /* lunette on the left trail end */
      if (s > 0) {
        var L = [b[0] + dh[0] * 0.20, b[1] + dh[1] * 0.20, b[2] + 0.02];
        var tg = new K.T.TorusGeometry(0.11, 0.032, 6, 14);
        S.D.geo(tg, K.m(F, L[0], L[1], L[2], ang));
      }
      if (s > 0 && S.Q) {                                /* team placard 2 cm above the left trail top */
        var qa = lerp(a, b, 0.14), qb = lerp(a, b, 0.24), qh = sec.st[0][2] / 2 + 0.03;
        K.plate(S.Q, F, [[-0.15, -0.10], [0.15, -0.10], [0.15, 0.10], [-0.15, 0.10]],
                [(qa[0] + qb[0]) / 2, (qa[1] + qb[1]) / 2, (qa[2] + qb[2]) / 2 + qh], d, ac, 0.02);
      }
      if (small) {                                       /* small wheel upright on top of the trail */
        var p = lerp(a, b, small.t), top = p[2] + sec.st[1][2] / 2 + 0.03;
        var WM = K.m(F, p[0], p[1], 0, ang);
        K.latheY(S.D, WM, [[-small.w / 2, small.r * 0.55], [-small.w / 2, small.r - 0.03], [-small.w / 2 + 0.03, small.r],
                           [small.w / 2 - 0.03, small.r], [small.w / 2, small.r - 0.03], [small.w / 2, small.r * 0.55], [-small.w / 2, small.r * 0.55]], 16, 0, 0, top + small.r);
        K.latheY(S.P, WM, [[-small.w / 2 - 0.02, 0.001], [-small.w / 2 - 0.02, small.r * 0.6], [small.w / 2 + 0.02, small.r * 0.6], [small.w / 2 + 0.02, 0.001]], 12, 0, 0, top + small.r);
        K.box(S.P, WM, 0, small.w / 2 + 0.05, top + small.r * 0.5, 0.08, 0.03, small.r * 1.1);
        K.box(S.P, WM, 0, -small.w / 2 - 0.05, top + small.r * 0.5, 0.08, 0.03, small.r * 1.1);
        K.box(S.P, WM, 0, 0, top + 0.02, 0.22, small.w + 0.14, 0.04);
      }
    }
  }
  /* firing jack: round base plate on the ground, column up to the carriage */
  function jack(K, S, F, x, r, top) {
    K.latheY(S.P, F.clone().multiply(new K.T.Matrix4().makeRotationX(Math.PI / 2)),
             [[0.02, 0.001], [0.02, r], [0.06, r], [0.08, r * 0.45], [0.13, 0.16], [0.15, 0.001]], 24, x, 0.0, 0);
    K.box(S.P, F, (0.45 + x) / 2, 0, top, x - 0.40, 0.30, 0.14);
    K.cyl(S.P, F, [x, 0, 0.05], [x, 0, top], 0.075, 0.075, 12);
    K.cyl(S.D, F, [x, 0, top - 0.18], [x, 0, top - 0.02], 0.10, 0.10, 12);
  }
  /* axle and lower carriage */
  function carriage(K, S, F, G, bodyW, bodyH) {
    K.cyl(S.P, F, [0, -G.track + 0.1, G.R], [0, G.track - 0.1, G.R], 0.065, 0.065, 10);
    K.box(S.P, F, 0.02, 0, G.R + bodyH / 2 - 0.12, 1.05, bodyW, bodyH);
    K.box(S.P, F, -0.25, 0, G.R - 0.02, 0.55, bodyW * 0.85, 0.24);
    /* top carriage cheeks carrying the trunnions */
    for (var s = -1; s <= 1; s += 2) {
      K.plate(S.P, F, [[-0.55, G.R + bodyH - 0.14], [0.45, G.R + bodyH - 0.14], [0.35, G.tz + 0.05], [-0.05, G.tz + 0.18], [-0.45, G.tz - 0.05]],
              [G.tx, s * 0.31, 0], [1, 0, 0], [0, 0, 1], 0.05);
      K.cyl(S.P, null === F ? null : F, [G.tx, s * 0.26, G.tz], [G.tx, s * 0.37, G.tz], 0.09, 0.09, 12);
    }
  }

  /* -------- D-20 (M1955) */
  function gunD20(K, S, F) {
    var G = GUNS.d20, E = tubeFrame(K, F, G), i;
    for (var s = -1; s <= 1; s += 2) discWheel(K, S, F, s * G.track, G.R, 0.30, 0.36);
    carriage(K, S, F, G, 0.86, 0.42);
    /* tube: square breech ring, the barrel, collar, double-baffle brake */
    var u0 = G.tube, u1 = u0 + G.len, b0 = u1 - G.brake;
    K.box(S.P, E, u0 + 0.21, 0, 0, 0.42, 0.44, 0.44);
    K.box(S.D, E, u0 - 0.005, 0, 0, 0.02, 0.30, 0.30);                         /* breech-block face */
    K.latheX(S.P, E, [[u0 + 0.42, 0.20], [0.0, 0.19], [1.30, 0.175], [2.05, 0.155], [2.08, 0.145],
                      [b0 - 0.12, 0.125], [b0 - 0.10, 0.14], [b0 + 0.01, 0.14]], 22);
    /* brake: rear block, two baffles, top and bottom plates, round front collar */
    K.box(S.P, E, b0 + 0.07, 0, 0, 0.14, 0.36, 0.32);
    K.box(S.P, E, b0 + 0.31, 0, 0, 0.09, 0.36, 0.32);
    K.box(S.P, E, b0 + 0.49, 0, 0, 0.09, 0.36, 0.32);
    K.box(S.P, E, b0 + 0.28, 0, 0.14, 0.56, 0.36, 0.04);
    K.box(S.P, E, b0 + 0.28, 0, -0.14, 0.56, 0.36, 0.04);
    K.latheX(S.P, E, [[b0 + 0.535, 0.001], [b0 + 0.535, 0.15], [u1, 0.15], [u1, 0.001]], 20);
    K.box(S.D, E, b0 + 0.28, 0, 0, 0.50, 0.30, 0.24);                          /* the windows show dark */
    K.latheX(S.D, E, [[u1 - 0.01, 0.001], [u1 - 0.01, 0.078], [u1 + 0.004, 0.078], [u1 + 0.004, 0.001]], 16);
    /* cradle and the recoil cylinders on top */
    K.box(S.P, E, 0.40, 0, -0.02, 1.70, 0.38, 0.36);
    K.latheX(S.P, E, [[1.25, 0.001], [1.25, 0.21], [1.55, 0.20], [1.55, 0.001]], 20);
    for (s = -1; s <= 1; s += 2) {
      K.latheX(S.P, E, [[-0.98, 0.001], [-0.98, 0.075], [-0.92, 0.088], [1.20, 0.088], [1.26, 0.06], [1.26, 0.001]], 14, s * 0.11, 0.29);
      K.box(S.P, E, 0.15, s * 0.11, 0.20, 1.6, 0.06, 0.06);
    }
    /* equilibrators, sight box, handwheels */
    for (s = -1; s <= 1; s += 2) K.cyl(S.P, F, [G.tx - 0.55, s * 0.40, 0.90], [G.tx + 0.15, s * 0.40, 1.55], 0.065, 0.065, 10);
    K.box(S.D, F, G.tx - 0.45, 0.50, G.tz + 0.30, 0.24, 0.12, 0.22);
    K.cyl(S.D, F, [G.tx - 0.45, 0.50, G.tz + 0.41], [G.tx - 0.45, 0.50, G.tz + 0.58], 0.035, 0.035, 8);
    K.cyl(S.D, F, [G.tx - 0.30, 0.50, G.tz - 0.25], [G.tx - 0.30, 0.55, G.tz - 0.25], 0.14, 0.14, 12);
    K.cyl(S.D, F, [G.tx - 0.30, -0.50, G.tz - 0.25], [G.tx - 0.30, -0.55, G.tz - 0.25], 0.14, 0.14, 12);
    /* shield: wavy top, side wings angled back over the wheels, lower shield */
    var top = [], xs = 0.62, hw = 0.70;
    for (i = 0; i <= 10; i++) { var yy = -hw + 2 * hw * i / 10; top.push([yy, 1.84 + 0.05 * Math.cos(i * Math.PI / 2.5)]); }
    var main = [[hw, 0.98], [-hw, 0.98]].concat(top);
    main = [[-hw, 0.98], [hw, 0.98]].concat(top.slice().reverse());
    K.plate(S.P, F, main, [xs, 0, 0], [0, 1, 0], [0, 0, 1], 0.03);
    for (s = -1; s <= 1; s += 2) {
      var ph = 0.92, u = [-Math.sin(ph) * 0.62, s * Math.cos(ph) * 1.0, 0]; u = unit(u);
      var wl = 0.62, wpts = [[0, 1.02], [wl, 1.08]];
      for (i = 4; i >= 0; i--) wpts.push([wl * i / 4, 1.80 + 0.05 * Math.cos(i * Math.PI / 2 + (s > 0 ? 0 : 1))]);
      K.plate(S.P, F, wpts, [xs, s * hw, 0], u, [0, 0, 1], 0.03);
    }
    K.plate(S.P, F, [[-0.62, 0.64], [0.62, 0.64], [0.66, 0.96], [-0.66, 0.96]], [xs + 0.04, 0, 0], [0, 1, 0], [0, 0, 1], 0.03);
    jack(K, S, F, 0.42, 0.40, G.R - 0.10);
    trails(K, S, F, G, { st: [[0, 0.30, 0.40], [0.5, 0.26, 0.32], [1, 0.22, 0.22]], endZ: 0.20 },
           { w: 0.50, wb: 0.30, top: 0.28 }, { t: 0.86, r: 0.22, w: 0.10 });
  }

  /* -------- ML-20 (M1937) */
  function gunML20(K, S, F) {
    var G = GUNS.ml20, E = tubeFrame(K, F, G), i, s;
    for (s = -1; s <= 1; s += 2) spokedWheel(K, S, F, s * G.track, G.R);
    carriage(K, S, F, G, 0.90, 0.40);
    var u0 = G.tube, u1 = u0 + G.len, ub = u1 + G.brake;
    /* breech ring, jacketed rear half, thinner chase, muzzle */
    K.latheX(S.P, E, [[u0, 0.001], [u0, 0.20], [u0 + 0.05, 0.235], [u0 + 0.40, 0.235], [u0 + 0.42, 0.21],
                      [1.00, 0.20], [1.05, 0.17], [1.12, 0.165], [u1 - 0.05, 0.148], [u1, 0.15]], 22);
    K.latheX(S.D, E, [[u0 - 0.01, 0.001], [u0 - 0.01, 0.15], [u0 + 0.01, 0.15], [u0 + 0.01, 0.001]], 14);
    /* slotted cylindrical brake: eight ring bands over a dark core, six bars */
    K.latheX(S.D, E, [[u1, 0.001], [u1, 0.19], [ub, 0.19], [ub, 0.001]], 16);
    for (i = 0; i < 8; i++) {
      var a0 = u1 + 0.02 + i * (G.brake - 0.04) / 8;
      K.latheX(S.P, E, [[a0, 0.001], [a0, 0.215], [a0 + 0.045, 0.215], [a0 + 0.045, 0.001]], 18);
    }
    for (i = 0; i < 6; i++) {
      var an = i * TAU / 6 + TAU / 12;
      K.box(S.P, E, (u1 + ub) / 2, Math.cos(an) * 0.20, Math.sin(an) * 0.20, G.brake, 0.035, 0.035);
    }
    K.latheX(S.P, E, [[ub - 0.06, 0.001], [ub - 0.06, 0.22], [ub, 0.22], [ub, 0.001]], 18);
    K.latheX(S.D, E, [[ub, 0.001], [ub, 0.076], [ub + 0.004, 0.076], [ub + 0.004, 0.001]], 12);
    /* cradle, the recuperator on top running forward, the buffer underneath */
    K.box(S.P, E, -0.05, 0, -0.03, 1.80, 0.44, 0.40);
    K.latheX(S.P, E, [[-1.25, 0.001], [-1.25, 0.11], [-1.18, 0.13], [1.50, 0.13], [1.62, 0.10], [1.62, 0.001]], 16, 0, 0.33);
    K.box(S.P, E, 0.15, 0, 0.21, 2.3, 0.10, 0.06);
    K.latheX(S.P, E, [[-1.0, 0.001], [-1.0, 0.095], [0.95, 0.095], [0.95, 0.001]], 14, 0, -0.27);
    /* the two tall equilibrator columns in front of the shield */
    for (s = -1; s <= 1; s += 2) {
      K.cyl(S.P, F, [0.55, s * 0.36, 0.78], [0.45, s * 0.36, 2.18], 0.075, 0.075, 12);
      K.cyl(S.P, F, [0.45, s * 0.36, 2.18], [0.44, s * 0.36, 2.26], 0.085, 0.06, 12);
    }
    /* sight and handwheels */
    K.box(S.D, F, G.tx - 0.55, 0.50, G.tz + 0.30, 0.24, 0.12, 0.22);
    K.cyl(S.D, F, [G.tx - 0.35, 0.52, G.tz - 0.30], [G.tx - 0.35, 0.57, G.tz - 0.30], 0.15, 0.15, 12);
    K.cyl(S.D, F, [G.tx - 0.35, -0.52, G.tz - 0.30], [G.tx - 0.35, -0.57, G.tz - 0.30], 0.15, 0.15, 12);
    /* shield: arched top with the corners cut, small wings, lower shield */
    var xs = 0.30, sh = [[-0.80, 1.00], [0.80, 1.00], [0.80, 1.62], [0.62, 1.76], [0.30, 1.80], [-0.30, 1.80], [-0.62, 1.76], [-0.80, 1.62]];
    K.plate(S.P, F, sh, [xs, 0, 0], [0, 1, 0], [0, 0, 1], 0.03);
    for (s = -1; s <= 1; s += 2)
      K.plate(S.P, F, [[0, 1.10], [0.30, 1.27], [0.30, 1.55], [0, 1.62]], [xs, s * 0.80, 0], unit([-0.35, s * 1, 0]), [0, 0, 1], 0.03);
    K.plate(S.P, F, [[-0.66, 0.66], [0.66, 0.66], [0.70, 0.98], [-0.70, 0.98]], [xs + 0.03, 0, 0], [0, 1, 0], [0, 0, 1], 0.03);
    trails(K, S, F, G, { st: [[0, 0.30, 0.38], [0.45, 0.28, 0.32], [1, 0.24, 0.24]], endZ: 0.22 },
           { w: 0.58, wb: 0.34, top: 0.30 }, null);
  }

  /* -------- 2A65 Msta-B */
  function gunMsta(K, S, F) {
    var G = GUNS.msta, E = tubeFrame(K, F, G), i, s;
    for (s = -1; s <= 1; s += 2) discWheel(K, S, F, s * G.track, G.R, 0.38, 0.40);
    carriage(K, S, F, G, 1.00, 0.46);
    var u0 = G.tube, u1 = u0 + G.len, b0 = u1 - G.brake;
    K.box(S.P, E, u0 + 0.25, 0, 0, 0.50, 0.50, 0.50);
    K.box(S.D, E, u0 - 0.005, 0, 0, 0.02, 0.34, 0.34);
    K.latheX(S.P, E, [[u0 + 0.50, 0.215], [0.30, 0.21], [1.60, 0.19], [2.10, 0.172], [2.14, 0.162],
                      [b0 - 0.12, 0.132], [b0 - 0.10, 0.148], [b0 + 0.01, 0.148]], 24);
    /* long multi-slot brake: body, five slots a side, front collar, bore */
    K.latheX(S.P, E, [[b0, 0.001], [b0, 0.19], [u1 - 0.12, 0.19], [u1 - 0.10, 0.205], [u1, 0.205], [u1, 0.001]], 22);
    for (i = 0; i < 5; i++) {
      var c = b0 + 0.11 + i * 0.145;
      for (s = -1; s <= 1; s += 2) K.box(S.D, E, c, s * 0.168, 0, 0.09, 0.05, 0.25);
    }
    K.latheX(S.D, E, [[u1, 0.001], [u1, 0.078], [u1 + 0.004, 0.078], [u1 + 0.004, 0.001]], 14);
    /* cradle, front sleeve, the long recoil cylinders on top */
    K.box(S.P, E, 0.25, 0, -0.02, 2.40, 0.46, 0.44);
    K.latheX(S.P, E, [[1.40, 0.001], [1.40, 0.25], [2.05, 0.235], [2.05, 0.001]], 22);
    for (s = -1; s <= 1; s += 2) {
      K.latheX(S.P, E, [[-1.42, 0.001], [-1.42, 0.08], [-1.35, 0.098], [2.05, 0.098], [2.12, 0.07], [2.12, 0.001]], 14, s * 0.13, 0.33);
      K.box(S.P, E, 0.30, s * 0.13, 0.24, 2.6, 0.06, 0.06);
    }
    for (s = -1; s <= 1; s += 2) K.cyl(S.P, F, [G.tx - 0.70, s * 0.45, 0.95], [G.tx + 0.10, s * 0.45, 1.75], 0.075, 0.075, 10);
    /* sight, loading tray frame, handwheels */
    K.box(S.D, F, G.tx - 0.70, 0.55, G.tz + 0.34, 0.26, 0.14, 0.26);
    K.cyl(S.D, F, [G.tx - 0.70, 0.55, G.tz + 0.47], [G.tx - 0.70, 0.55, G.tz + 0.66], 0.04, 0.04, 8);
    K.cyl(S.D, F, [G.tx - 0.45, 0.56, G.tz - 0.30], [G.tx - 0.45, 0.61, G.tz - 0.30], 0.15, 0.15, 12);
    K.cyl(S.D, F, [G.tx - 0.45, -0.56, G.tz - 0.30], [G.tx - 0.45, -0.61, G.tz - 0.30], 0.15, 0.15, 12);
    /* shield: tall flat plate, top corners rounded, wings swept back */
    var xs = 0.90, hw = 0.98, z0 = 0.80, z1 = 2.08, sh = [[-hw, z0], [hw, z0]];
    for (i = 0; i <= 4; i++) { var a = i * Math.PI / 8; sh.push([hw - 0.28 + 0.28 * Math.cos(a), z1 - 0.28 + 0.28 * Math.sin(a)]); }
    for (i = 4; i >= 0; i--) { var b = i * Math.PI / 8; sh.push([-hw + 0.28 - 0.28 * Math.cos(b), z1 - 0.28 + 0.28 * Math.sin(b)]); }
    K.plate(S.P, F, sh, [xs, 0, 0], [0, 1, 0], [0, 0, 1], 0.035);
    for (s = -1; s <= 1; s += 2)
      K.plate(S.P, F, [[0, z0 + 0.04], [0.62, z0 + 0.34], [0.62, 1.70], [0.36, 1.90], [0, 1.98]], [xs, s * hw, 0], unit([-0.75, s * 0.66, 0]), [0, 0, 1], 0.035);
    K.plate(S.P, F, [[-0.80, 0.58], [0.80, 0.58], [0.84, 0.82], [-0.84, 0.82]], [xs + 0.04, 0, 0], [0, 1, 0], [0, 0, 1], 0.03);
    jack(K, S, F, 0.62, 0.55, G.R - 0.08);
    trails(K, S, F, G, { st: [[0, 0.34, 0.44], [0.4, 0.30, 0.36], [1, 0.24, 0.26]], endZ: 0.24 },
           { w: 0.72, wb: 0.40, top: 0.36 }, { t: 0.72, r: 0.30, w: 0.14 });
  }

  var BUILD = { ml20: gunML20, d20: gunD20, msta: gunMsta };

  /* ---------------------------------------------------------------- site */
  /* the ML-20 spoil bank: horseshoe round the gun, front and both sides, open
     at the rear where the trails lie (wartime photograph) */
  function ml20Bank(K, bin, F) {
    var path = [[-1.9, 3.0, 0.05], [-1.0, 3.05, 0.8], [0.5, 3.1, 1], [1.9, 2.9, 1], [2.9, 2.0, 1], [3.3, 0.8, 1],
                [3.35, 0, 1], [3.3, -0.8, 1], [2.9, -2.0, 1], [1.9, -2.9, 1], [0.5, -3.1, 1], [-1.0, -3.05, 0.8], [-1.9, -3.0, 0.05]];
    K.bank(bin, F, path, [[-1.15, 0], [-0.80, 0.20], [-0.42, 0.42], [0, 0.52], [0.42, 0.44], [0.82, 0.22], [1.2, 0]]);
  }
  /* the 2019 ammunition pit: black-earth floor, spoil heaped on three sides,
     open toward the middle gun (dir = +1 opens to -y) */
  function crate(K, B, F, x, y, rz, open, filler, lidSide) {
    var L = 0.88, W = 0.48, H = 0.26, t = 0.025, ca = Math.cos(rz), sa = Math.sin(rz);
    function at(u, v) { return [x + ca * u - sa * v, y + sa * u + ca * v]; }
    if (!open) {
      var p = at(0, 0);
      K.box(B.C, F, p[0], p[1], 0.03 + H / 2, L, W, H, rz);
      for (var e = -1; e <= 1; e += 2) { var q = at(e * (L / 2 + 0.01), 0); K.box(B.D, F, q[0], q[1], 0.03 + H * 0.65, 0.02, 0.16, 0.04, rz); }
      return;
    }
    var c0 = at(0, 0), w1 = at(0, W / 2 - t / 2), w2 = at(0, -W / 2 + t / 2), e1 = at(L / 2 - t / 2, 0), e2 = at(-L / 2 + t / 2, 0);
    K.box(B.W, F, c0[0], c0[1], 0.03 + t / 2, L, W, t, rz);
    K.box(B.C, F, w1[0], w1[1], 0.03 + H / 2, L, t, H, rz);
    K.box(B.C, F, w2[0], w2[1], 0.03 + H / 2, L, t, H, rz);
    K.box(B.C, F, e1[0], e1[1], 0.03 + H / 2, t, W - 2 * t, H, rz);
    K.box(B.C, F, e2[0], e2[1], 0.03 + H / 2, t, W - 2 * t, H, rz);
    /* the lid, opened and lying against the crate (raw inner face up) */
    var ld = at(0, (lidSide || 1) * (W / 2 + 0.26));
    K.box(B.W, F, ld[0], ld[1], 0.06, L, 0.48, 0.03, rz, 0);
    for (var k = -1; k <= 1; k += 2) {
      var s = at(0, k * 0.11), z = 0.03 + t + 0.085;
      if (filler === "shell") {                      /* projectile, nose toward +u, alternating */
        var T = K.T, pts = [[0, 0.07], [0.02, 0.076], [0.42, 0.076], [0.50, 0.070], [0.60, 0.050], [0.66, 0.026], [0.69, 0.001]], v = [], i;
        for (i = 0; i < pts.length; i++) v.push([pts[i][0] - 0.345, pts[i][1]]);
        v.unshift([-0.345, 0.001]);
        K.latheX(B.S, K.m(F, s[0], s[1], z, rz + (k > 0 ? 0 : Math.PI)), v, 10);
      } else {                                       /* brass cartridge case, 547.5 mm */
        K.latheX(B.B, K.m(F, s[0], s[1], z, rz), [[-0.274, 0.001], [-0.274, 0.086], [-0.262, 0.086], [-0.255, 0.079], [0.274, 0.079], [0.274, 0.001]], 12);
      }
    }
  }
  function ammoPit(K, B, F, x, y, dir) {
    /* floor of the pit: dug black earth, 4.4 x 2.0 m */
    K.box(B.E, F, x, y, 0.032, 4.4, 2.0, 0.01);
    /* spoil: along the far side and both ends */
    var fy = y + dir * 1.45;
    K.bank(B.E, F, [[x - 2.9, y - dir * 0.7, 0.1], [x - 2.85, fy - dir * 0.1, 0.85], [x - 1.4, fy + dir * 0.05, 1], [x + 0.2, fy, 1.05], [x + 1.6, fy + dir * 0.05, 1],
                    [x + 2.85, fy - dir * 0.1, 0.85], [x + 2.9, y - dir * 0.7, 0.1]],
           [[-0.80 * dir, 0], [-0.45 * dir, 0.36], [-0.12 * dir, 0.58], [0.2 * dir, 0.60], [0.55 * dir, 0.38], [0.95 * dir, 0]]);
    /* crates as photographed: projectiles two to a crate, cases in others, closed ones stacked */
    crate(K, B, F, x - 1.50, y - dir * 0.22, 0.04, true, "shell", -dir);
    crate(K, B, F, x - 0.55, y - dir * 0.20, -0.03, true, "shell", -dir);
    crate(K, B, F, x + 0.40, y - dir * 0.24, 0.02, true, "shell", -dir);
    crate(K, B, F, x + 1.40, y - dir * 0.30, 0.06, true, "case", -dir);
    crate(K, B, F, x - 1.10, y + dir * 0.55, 0.0, false);
    crate(K, B, F, x - 0.15, y + dir * 0.55, 0.0, false);
    crate(K, B, F, x + 0.80, y + dir * 0.55, 0.03, false);
    K.box(B.C, F, x - 1.10, y + dir * 0.55, 0.03 + 0.26 + 0.13, 0.88, 0.48, 0.26, 0.05);
    /* loose boards */
    K.box(B.W, F, x + 2.1, y - dir * 0.95, 0.05, 1.6, 0.16, 0.025, 0.25);
    K.box(B.W, F, x - 2.3, y - dir * 1.05, 0.05, 1.2, 0.14, 0.025, -0.5);
  }

  function build(THREE, M, C, kind) {
    var G = GUNS[kind], K = new Kit(THREE);
    var teamMat = new THREE.MeshStandardMaterial({
      color: (C && C.team !== undefined) ? C.team : 0x4b8fe0, roughness: 0.6, metalness: 0.1 });
    var paint = texMat(THREE, paintTex(THREE, G.paint, kind === "ml20" ? 11 : kind === "d20" ? 23 : 37), G.paint, 0.78, 0.18);
    var dark = new THREE.MeshStandardMaterial({ color: 0x1f2022, roughness: 0.88, metalness: 0.08 });
    var apronM = texMat(THREE, groundTex(THREE, 0x7a6f4d, 5, false), 0x7a6f4d, 0.97, 0.01);
    var earthM = texMat(THREE, groundTex(THREE, 0x4a4136, 7, true), 0x4a4136, 0.96, 0.01);
    var root = new THREE.Group();
    var B = {
      A: new Bin(apronM, 0.15), E: new Bin(earthM, 0.3), P: new Bin(paint, 0.5), D: new Bin(dark),
      C: new Bin(new THREE.MeshStandardMaterial({ color: 0x4d5636, roughness: 0.85, metalness: 0.02 })),
      W: new Bin(new THREE.MeshStandardMaterial({ color: 0x8c7f68, roughness: 0.9, metalness: 0.0 })),
      B: new Bin(new THREE.MeshStandardMaterial({ color: 0xa0803e, roughness: 0.35, metalness: 0.75 })),
      S: new Bin(new THREE.MeshStandardMaterial({ color: 0x8f8d80, roughness: 0.6, metalness: 0.25 })),
      Q: new Bin(teamMat)
    };
    var I = new THREE.Matrix4();
    K.box(B.A, I, 0, 0, 0.01, 26.0, 26.0, 0.02);                    /* beaten-earth footprint, stepped edge */
    K.box(B.A, I, 0, 0, 0.025, 25.2, 25.2, 0.01);

    /* the turret: the central gun, its own bins on the same materials */
    var tQ = new Bin(teamMat), tS = { P: new Bin(paint, 0.5), D: new Bin(dark), Q: tQ };
    BUILD[kind](K, tS, I);
    var t = new THREE.Group(); t.name = "turret";
    [tS.P, tS.D, tQ].forEach(function (b) { var m = b.mesh(THREE); if (m) t.add(m); });
    t.position.set(G.shift, 0, 0);
    root.add(t);

    /* baked flank guns, at the same elevation, pointing +X */
    [1, -1].forEach(function (s) {
      var F = new THREE.Matrix4().makeTranslation(G.shift, s * G.gap, 0);
      BUILD[kind](K, { P: B.P, D: B.D, Q: B.Q }, F);
    });
    /* the position */
    if (kind === "ml20") {
      [0, 1, -1].forEach(function (s) { ml20Bank(K, B.E, new THREE.Matrix4().makeTranslation(G.shift, s * G.gap, 0)); });
    } else if (kind === "msta") {
      ammoPit(K, B, I, G.shift - 2.6, 4.75, 1);
      ammoPit(K, B, I, G.shift - 2.6, -4.75, -1);
    }
    ["A", "E", "P", "D", "C", "W", "B", "S", "Q"].forEach(function (k) { var m = B[k].mesh(THREE); if (m) root.add(m); });
    root.userData.whole = true;
    return root;
  }

  return { build: build, KEYS: KEYS, GUNS: GUNS };
})();

Object.keys(HeroHowitzerSite.KEYS).forEach(function (era) {
  var kind = HeroHowitzerSite.KEYS[era];
  BLD_MODELS["arty_pact_" + era] = { build: function (THREE, M, C) {
    return HeroHowitzerSite.build(THREE, M, C, kind);
  } };
});
