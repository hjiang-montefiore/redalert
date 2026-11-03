/* ===== ru_coastal_site.js - HERO model: the Soviet coastal 130 mm gun battery ====
   BUILDINGS id "coastal" ("Casemated 152mm guns that outrange most warships"),
   side "pact" (= USSR / Russia). It replaces the shared casemate (one 15 m gun in
   an embrasure of a concrete block) for the periods in which the Soviet Navy's
   coastal troops really kept FIXED 130 mm gun batteries (full-quality redo,
   2026-11-03):

       key                  period   drawn as
       coastal_pact_e50     1950s    the 1930s-built battery of Teriberka: B-13 with
       coastal_pact_e60     1960s      the BOX shield on concrete pads in parapets
       coastal_pact_e80     1980s    the Vladivostok batteries built in the 1970s:
                                       B-13 third series (B-13-IIIs) with the
                                       STREAMLINED shield in octagonal concrete pits

   NOT registered: e90, e00 and e20 (the shared casemate shows). The B-13 is
   documented in fixed coastal service "until the break-up of the USSR"
   (ru.wikipedia); the Vladivostok Defensive Region was abandoned in 1996 and
   its guns left "without control" (fortress.wl.dvgu.ru) - no source found for
   a manned fixed 130 mm battery after 1991. The 130 mm "Bereg" (A-222) is a
   wheeled vehicle, Bal / Bastion / Rubezh are vehicles, the Utes missile site is
   a tunnel complex and the 180 / 305 mm fort turrets are not plot-size: none of
   them is drawn here.

   SOURCES (cached in the builder's q_rucoast_work/ref):
     [W]  ru.wikipedia "130-mm korabelnaya pushka obraztsa 1935 goda (B-13)":
          barrel 6581 mm (50 cal); line of fire 1671 mm above the deck; swept
          radius 4985 mm at the muzzle, 2295 mm at the breech; height over the
          shield 2240 mm, width over the shield 2750 mm, front plate 13 mm;
          elevation -5/+45 deg; box shield on the first series (B-13-Ic),
          streamlined shield from the second half of 1939 (B-13-IIs), third
          series B-13-IIIs from 1948; "most coastal batteries" of 1941; over 600
          B-13 in Navy service and stores in the mid-1980s; in 1970, after
          Damansky, 90 B-13 in 20 batteries on the Muravyov-Amursky peninsula;
          in coastal service until the break-up of the USSR.
     [V]  "Naval Guns in the Land Defense of Vladivostok", fortress.wl.dvgu.ru
          (morgun_en.htm, web.archive 2011) and its photographs: 511.jpg
          (B-13-3s in the pit of former Battery No 511), ugl-1.jpg (B-13-3s in a
          1970s pit near Uglovoe), 875-2.jpg (a gun pit built in the 1970s at
          Battery 875, gun removed), dvor.gif / dvor-plan.gif (plan and section
          of the WWII 130 mm B-13 pit, scale 0-3 m). Text: during the 1970s
          B-13 third series were installed at the old WWII positions and, the
          batteries going from two guns to four, in "new simplified design
          circular concrete pits"; more than 20 batteries, ninety guns;
          abandoned 1996.
     [T]  Commons, Vsatinet (CC BY-SA 4.0), "Remains of 1930s coastal artillery
          battery near Teriberka" (199th battery): "199th coastal artillery
          battery, Teriberka, 2023 -01" and "-02", "199th artillery battery near
          Teriberka", "Orudiya 199-y beregovoy batarei ... 01", and
          "Teriberka Beregovaya batareya 2 / 3 / 5" (layout from the hill, a gun
          from the rear, the shelters).
     [S]  Commons "130 50 N Kuivasaari.JPG" (side view, streamlined shield),
          "130 mm B13 Pattern 1936.JPG" (Malaya Zemlya, rear three-quarter of the
          streamlined shield and the breech), "B-13 in Swinoujscie (Poland).jpg".

   RECOGNITION LIST (each drawn; source in brackets):
     1 long plain 130 mm/50 tube, a thicker sleeve where it leaves the shield,
       a slight muzzle swell, at rest a few degrees up [T -01, -02, near; S]
     2 e50/e60 BOX shield: flat front plate with the tube slot running up
       into a notch in the flat roof, a tall sight window on the right of the
       slot and a square one on its left; plain side plates with a chamfered
       lower rear corner and four grab handles by the rear edge; lifting
       lugs on the roof corners; open back [T -01, Orudiya 01, near, -02]
     3 e80 STREAMLINED shield: rounded front corners, the top edge rolled
       into the roof, the slot with raised strips either side, a side door,
       grab handles, sight hoods at the top front; open back [S; V 511, ugl-1]
     4 through the open back: the breech ring with the round breech, the
       loading tray, the cradle with the two recoil cylinders above the tube,
       the carriage cheeks, the sight column and handwheels, the horizontal
       bar across the bottom of the shield [T -02, near; S Malaya Zemlya]
     5 the fixed pedestal on its bolted base ring on the pad [T -02, near]
     6 e50/e60: concrete pad with a low concrete parapet round the rear and
       flanks, open to the sea [T -01, -02, Orudiya 01, 3]
     7 e50/e60: the ammunition shelter in the parapet: dark doorway under a
       flat concrete roof slab carried on a steel beam [T near, 3, 5]
     8 e50/e60: a dry-stone masonry wall closing the flank, granite outcrops
       round the pads [T Orudiya 01, -01]
     9 e80: the octagonal concrete pit wall, square ammunition niches in its
       inner face, the earth banked against the outside [V 875-2, ugl-1, 511,
       dvor plan]
    10 the battery: guns in a line abreast, all trained to the sea [T 2;
       V "four guns"]

   MEASUREMENTS (published [W] against the model, gun frame: pivot axis at
   x = y = 0, z = 0 the pad / deck the mount is bolted to):
     barrel 6.581 m                     drawn 6.581 m (lathe, breech face to muzzle)
     muzzle swept radius 4.985 m        drawn 4.985 m (tube level)
     breech swept radius 2.295 m        drawn 2.29 m (rear of the loading tray)
     line of fire 1.671 m               trunnions at 1.671 m
     height over shield 2.240 m         roof top 2.24 m (both shields)
     width over shield 2.750 m          2.75 m (both shields)
   Not published, scaled off the photographs (good to perhaps 8-10 per cent):
   shield depth (box 2.30 m: its side about as long as the plate is tall on
   the Teriberka photographs; streamlined 3.35 m: Kuivasaari side view, about
   1.6 times the plate height), top roll radius 0.60 m and front corner radius
   0.72 m of the streamlined shield, shield bottom 0.30 m over the pad, window and slot sizes, trunnion 0.35 m ahead of the pivot, base ring
   radius 1.30 m, cradle sleeve (0.45 m across, standing 0.45-0.55 m out of
   the shield: T near, Kuivasaari, ugl-1) and recoil-cylinder sizes. Pads: the WWII pit court is
   5.6 m across on the dvor drawing (scaled off its 3 m bar) and parapets 1.2 m
   over the floor; the 1970s pit is drawn 6.0 m across flats, wall 0.35 m thick
   and 1.15 m high (875-2, by the niche and the pedestal ring); the Teriberka
   parapet 3.65 m inner radius, 0.4 m thick, 1.0 m high (T -02, near).

   COULD NOT CONFIRM, so NOT drawn: the battery's fire-control post, rangefinder
   or command turret (V describes them for the WWII batteries; no photograph of
   one belonging to these batteries); roads, barracks, magazines; the brown
   patches seen on the 511 gun (paint is plain green); the service paint of the
   Teriberka guns (the 2019 photograph's grey is drawn; the white and red art of
   2023 is not); the underground access galleries of the WWII pits; where the
   1970s pit's entrance lies relative to the line of fire (875-2 shows a break
   in the wall beside a niche; drawn at the rear). Whether Teriberka's guns were
   still manned in the 1950s-60s is not documented: the e50/e60 rows rest on
   the type's coastal service to 1991 [W] and on this 1930s battery being the
   B-13 coastal position photographed with its box shields in place.

   WHAT THE COMPRESSION LEAVES OUT. A real battery has its four guns 50-300 m
   apart [V] with a command post, magazines, roads and quarters. Here: three
   guns abreast on pads 9.5 m apart, the middle one the "turret" (shield, gun,
   carriage and platform turn on the pedestal; base ring and pad stay), the
   flank guns baked pointing +X, the direction of the sea. The guns, shields
   and pits are at true size; only the spacing is compressed. Everything
   inside 30 x 30 m; ground z = 0; +X the way the guns point; Z up, metres.

   PAINT. Canvas textures with UVs in metres: Soviet naval grey (the Teriberka
   gun of the 2019 photograph, sampled 0x8d9395 taken to 0.8) and green
   (511, 0.8), with plate seams, rivet rows, rain streaks and chips; board-
   formed concrete with stains; pink-grey granite with lichen (Teriberka,
   sampled 0xa9a29c, taken pinker and darker to 0x7c6f69 so the light
   concrete reads against it) and grass-and-earth (Vladivostok). Owner colour
   exactly C.team: one small flat panel 2 cm above each shelter roof (e50/e60)
   or on the wall top by each pit's entrance (e80). No markings or numbers.
   BUDGET (dump.js): e50/e60 13.1k triangles, 7 draw calls, 5 materials;
   e80 15.4k, 8, 6 (the old site: 4.8k, 10, 8). Static meshes merged per
   material; the turret is two meshes (paint, dark). ASCII only. */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroCoastalSite = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------------ vectors */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, s) { return [a[0] * s, a[1] * s, a[2] * s]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* ------------------------------------------------- one bin per material
     Planar UVs from each face's dominant axis (k repeats per metre). */
  function Bin(mat, k) { this.mat = mat; this.P = []; this.N = []; this.U = []; this.k = k || 0.5; this.M = null; }
  Bin.prototype.push3 = function (a, b, c, na, nb, nc) {
    var f = cross(sub(b, a), sub(c, a)), k = this.k;
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
  Bin.prototype.geo = function (g, M) {
    var gg = g.index ? g.toNonIndexed() : g;
    if (M) gg.applyMatrix4(M);
    if (!gg.attributes.normal) gg.computeVertexNormals();
    var p = gg.attributes.position.array, n = gg.attributes.normal.array, i;
    for (i = 0; i + 8 < p.length; i += 9) {
      this.push3([p[i], p[i + 1], p[i + 2]], [p[i + 3], p[i + 4], p[i + 5]], [p[i + 6], p[i + 7], p[i + 8]],
                 [n[i], n[i + 1], n[i + 2]], [n[i + 3], n[i + 4], n[i + 5]], [n[i + 6], n[i + 7], n[i + 8]]);
    }
    if (gg !== g) gg.dispose();
    g.dispose();
  };
  /* one flat triangle facing away from ctr (toward it when inward), through M */
  Bin.prototype.tri = function (a, b, c, ctr, inward) {
    var f = unit(cross(sub(b, a), sub(c, a))), m = mul(add(add(a, b), c), 1 / 3);
    var d = dot(f, sub(m, ctr));
    if (inward ? d > 0 : d < 0) { var t = b; b = c; c = t; f = mul(f, -1); }
    if (this.M) {
      var e = this.M.elements;
      var tp = function (q) { return [e[0] * q[0] + e[4] * q[1] + e[8] * q[2] + e[12], e[1] * q[0] + e[5] * q[1] + e[9] * q[2] + e[13], e[2] * q[0] + e[6] * q[1] + e[10] * q[2] + e[14]]; };
      var tn = function (q) { return unit([e[0] * q[0] + e[4] * q[1] + e[8] * q[2], e[1] * q[0] + e[5] * q[1] + e[9] * q[2], e[2] * q[0] + e[6] * q[1] + e[10] * q[2]]); };
      a = tp(a); b = tp(b); c = tp(c); f = tn(f);
    }
    this.push3(a, b, c, f, f, f);
  };
  Bin.prototype.quad = function (a, b, c, d, ctr, inward) { this.tri(a, b, c, ctr, inward); this.tri(a, c, d, ctr, inward); };
  Bin.prototype.mesh = function (THREE, name) {
    if (!this.P.length) return null;
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(this.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(this.N), 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(this.U), 2));
    geo.computeBoundingSphere();
    var m = new THREE.Mesh(geo, this.mat);
    m.name = name || "";
    m.castShadow = true; m.receiveShadow = true;
    return m;
  };

  /* ------------------------------------------------------- shape kit */
  function Kit(THREE) { this.T = THREE; }
  Kit.prototype.m = function (F, x, y, z, rz, ry, rx) {
    var T = this.T, L = new T.Matrix4().makeTranslation(x, y, z);
    if (rz) L.multiply(new T.Matrix4().makeRotationZ(rz));
    if (ry) L.multiply(new T.Matrix4().makeRotationY(ry));
    if (rx) L.multiply(new T.Matrix4().makeRotationX(rx));
    return F ? F.clone().multiply(L) : L;
  };
  Kit.prototype.box = function (bin, F, cx, cy, cz, sx, sy, sz, rz, ry) {
    bin.geo(new this.T.BoxGeometry(sx, sy, sz), this.m(F, cx, cy, cz, rz, ry));
  };
  Kit.prototype.cyl = function (bin, F, a, b, r0, r1, seg) {
    var T = this.T, va = new T.Vector3(a[0], a[1], a[2]), vb = new T.Vector3(b[0], b[1], b[2]);
    var d = vb.clone().sub(va), len = d.length();
    var q = new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize());
    var L = new T.Matrix4().compose(va.clone().add(vb).multiplyScalar(0.5), q, new T.Vector3(1, 1, 1));
    bin.geo(new T.CylinderGeometry(r1, r0, len, seg || 12), F ? F.clone().multiply(L) : L);
  };
  /* lathe along local +X: prof [[x, r], ...] */
  Kit.prototype.latheX = function (bin, F, prof, seg) {
    var T = this.T, pts = [], i;
    for (i = 0; i < prof.length; i++) pts.push(new T.Vector2(Math.max(0.0008, prof[i][1]), prof[i][0]));
    var g = new T.LatheGeometry(pts, seg || 20);
    g.rotateZ(-Math.PI / 2);
    bin.geo(g, F);
  };
  /* lathe about local +Z: prof [[z, r], ...] */
  Kit.prototype.latheZ = function (bin, F, prof, seg, x, y) {
    var T = this.T, pts = [], i;
    for (i = 0; i < prof.length; i++) pts.push(new T.Vector2(Math.max(0.0008, prof[i][1]), prof[i][0]));
    var g = new T.LatheGeometry(pts, seg || 24);
    g.rotateX(Math.PI / 2);
    bin.geo(g, this.m(F, x || 0, y || 0, 0));
  };
  /* flat plate: outline [[u, v], ...] (+ holes) in the plane of unit u, v
     through O, thickness t along u x v */
  Kit.prototype.plate = function (bin, F, pts, O, u, v, t, holes) {
    var T = this.T, s = new T.Shape(), i, j, w = cross(u, v);
    s.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
    s.lineTo(pts[0][0], pts[0][1]);
    for (j = 0; holes && j < holes.length; j++) {
      var h = new T.Path(), H = holes[j];
      h.moveTo(H[0][0], H[0][1]);
      for (i = 1; i < H.length; i++) h.lineTo(H[i][0], H[i][1]);
      h.lineTo(H[0][0], H[0][1]);
      s.holes.push(h);
    }
    var g = new T.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 3 });
    g.translate(0, 0, -t / 2);
    var M = new T.Matrix4().makeBasis(new T.Vector3(u[0], u[1], u[2]), new T.Vector3(v[0], v[1], v[2]),
                                      new T.Vector3(w[0], w[1], w[2]));
    M.setPosition(O[0], O[1], O[2]);
    bin.geo(g, F ? F.clone().multiply(M) : M);
  };
  /* an earth bank along path [[x, y, hScale], ...], cross profile [[off, z], ...] */
  Kit.prototype.bank = function (bin, F, path, prof, closed) {
    var old = bin.M, i, j, rows = [], p, q, d, nrm, n = path.length;
    bin.M = F;
    for (i = 0; i < n; i++) {
      p = closed ? path[(i - 1 + n) % n] : path[Math.max(0, i - 1)];
      q = closed ? path[(i + 1) % n] : path[Math.min(n - 1, i + 1)];
      d = unit([q[0] - p[0], q[1] - p[1], 0]); nrm = [-d[1], d[0], 0];
      var row = [];
      for (j = 0; j < prof.length; j++)
        row.push([path[i][0] + nrm[0] * prof[j][0], path[i][1] + nrm[1] * prof[j][0], 0.02 + prof[j][1] * path[i][2]]);
      rows.push(row);
    }
    if (closed) rows.push(rows[0]);
    for (i = 0; i + 1 < rows.length; i++)
      for (j = 0; j + 1 < prof.length; j++) {
        var a = rows[i][j], b = rows[i][j + 1], c = rows[i + 1][j + 1], e = rows[i + 1][j];
        var below = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2, -50];
        bin.tri(a, b, c, below); bin.tri(a, c, e, below);
      }
    bin.M = old;
  };
  /* a low rounded rock: squashed icosahedron */
  Kit.prototype.rock = function (bin, F, x, y, sx, sy, sz, rz) {
    var T = this.T, g = new T.IcosahedronGeometry(1, 0);
    g.scale(sx, sy, sz);
    bin.geo(g, this.m(F, x, y, sz * 0.25, rz));
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
  /* naval paint: touch-up patches, plate seams every 0.5 m, rivet rows, rain
     streaks, rust chips; tile 2 m (UVs 0.5 per metre) */
  function paintTex(THREE, base, seed) {
    return canvasTex(THREE, "rcs_p" + base + "_" + seed, function (q) {
      var R = rng(seed), i, x, y, w;
      q.fillStyle = hex(base); q.fillRect(0, 0, 256, 256);
      for (i = 0; i < 16; i++) {
        x = R() * 256; y = R() * 256; w = 18 + R() * 50;
        q.fillStyle = (i % 2) ? "rgba(20,22,20,0.15)" : "rgba(200,205,200,0.09)";
        q.beginPath(); q.ellipse(x, y, w, w * (0.4 + R() * 0.5), R() * 3, 0, TAU); q.fill();
      }
      q.strokeStyle = "rgba(14,16,14,0.32)"; q.lineWidth = 1.3;
      for (i = 0; i < 4; i++) {
        q.beginPath(); q.moveTo(i * 64 + 30.5, 0); q.lineTo(i * 64 + 30.5, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 64 + 12.5); q.lineTo(256, i * 64 + 12.5); q.stroke();
      }
      q.fillStyle = "rgba(12,13,12,0.40)";
      for (i = 0; i < 32; i++) { q.fillRect(i * 8 + 3, 8, 2, 2); q.fillRect(26, i * 8 + 2, 2, 2); }
      for (i = 0; i < 120; i++) {
        q.fillStyle = (i % 3) ? "rgba(70,40,20,0.10)" : "rgba(230,230,220,0.06)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 2, 8 + R() * 40);
      }
      for (i = 0; i < 80; i++) { q.fillStyle = (i % 2) ? "rgba(90,50,25,0.35)" : "rgba(15,15,12,0.25)"; q.fillRect(R() * 256, R() * 256, 2 + R() * 2, 2); }
    });
  }
  /* board-formed concrete: lift lines every 0.25 m, form-board joints,
     water stains and cracks; tile 4 m (UVs 0.25 per metre) */
  function concreteTex(THREE, base, seed) {
    return canvasTex(THREE, "rcs_c" + base + "_" + seed, function (q) {
      var R = rng(seed), i, x, y, w;
      q.fillStyle = hex(base); q.fillRect(0, 0, 256, 256);
      for (i = 0; i < 22; i++) {
        x = R() * 256; y = R() * 256; w = 16 + R() * 50;
        q.fillStyle = (i % 3) ? "rgba(30,32,28,0.13)" : "rgba(235,235,225,0.10)";
        q.beginPath(); q.ellipse(x, y, w, w * (0.3 + R() * 0.6), R() * 3, 0, TAU); q.fill();
      }
      q.strokeStyle = "rgba(20,20,18,0.22)"; q.lineWidth = 1;
      for (i = 0; i < 16; i++) { q.beginPath(); q.moveTo(0, i * 16 + 0.5); q.lineTo(256, i * 16 + 0.5); q.stroke(); }
      for (i = 0; i < 40; i++) {
        x = (R() * 256) | 0; y = ((R() * 16) | 0) * 16;
        q.beginPath(); q.moveTo(x + 0.5, y); q.lineTo(x + 0.5, y + 16); q.stroke();
      }
      for (i = 0; i < 60; i++) {
        q.fillStyle = "rgba(25,25,20,0.10)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 10 + R() * 50);
      }
      q.strokeStyle = "rgba(15,15,12,0.35)";
      for (i = 0; i < 6; i++) {
        x = R() * 256; y = R() * 256; q.beginPath(); q.moveTo(x, y);
        for (var k = 0; k < 5; k++) { x += (R() - 0.5) * 30; y += R() * 18; q.lineTo(x, y); }
        q.stroke();
      }
    });
  }
  /* pink-grey granite with lichen and joints (Teriberka); or grass and
     beaten earth (Vladivostok); tile about 8 m */
  function groundTex(THREE, base, seed, kind) {
    return canvasTex(THREE, "rcs_g" + kind + base + "_" + seed, function (q) {
      var R = rng(seed), i, x, y, w;
      q.fillStyle = hex(base); q.fillRect(0, 0, 256, 256);
      for (i = 0; i < 30; i++) {
        x = R() * 256; y = R() * 256; w = 12 + R() * 46;
        if (kind === "rock") q.fillStyle = (i % 3) ? "rgba(60,58,55,0.15)" : "rgba(205,170,160,0.16)";
        else q.fillStyle = (i % 3) ? "rgba(40,50,20,0.20)" : "rgba(120,100,60,0.22)";
        q.beginPath(); q.ellipse(x, y, w, w * (0.5 + R() * 0.5), R() * 3, 0, TAU); q.fill();
      }
      if (kind === "rock") {
        q.strokeStyle = "rgba(30,28,26,0.45)"; q.lineWidth = 1.2;
        for (i = 0; i < 14; i++) {
          x = R() * 256; y = R() * 256; q.beginPath(); q.moveTo(x, y);
          for (var k = 0; k < 4; k++) { x += (R() - 0.3) * 50; y += (R() - 0.5) * 30; q.lineTo(x, y); }
          q.stroke();
        }
        for (i = 0; i < 260; i++) {
          q.fillStyle = (i % 3) ? "rgba(150,160,110,0.30)" : "rgba(35,35,30,0.25)";
          q.fillRect(R() * 256, R() * 256, 2 + R() * 3, 2 + R() * 3);
        }
      } else {
        for (i = 0; i < 520; i++) {
          q.fillStyle = (i % 3) ? "rgba(95,120,55,0.35)" : "rgba(60,48,30,0.30)";
          q.fillRect(R() * 256, R() * 256, 1, 2 + R() * 5);
        }
      }
    });
  }
  function texMat(THREE, tex, base, rough, metal) {
    var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: rough, metalness: metal });
    if (tex) m.map = tex; else m.color.set(base);
    return m;
  }

  /* ================================================================ the gun
     Gun frame: pivot axis at x = y = 0, z = 0 the pad the base ring sits on,
     tube toward +x. S = { P: paint, D: dark }. Figures from [W]. */
  var LOF = 1.671, XT = 0.35, ELEV = 0.09;          // line of fire, trunnion x, rest elevation
  var MUZ = 4.985, BAR = 6.581;                       // muzzle swept radius, barrel length
  var HW = 1.375, ZB = 0.30, ZT = 2.24;               // half width, bottom and top of the shield

  /* fixed part: bolted base ring and the pedestal drum (stays put) */
  function mountBase(K, S, F) {
    K.latheZ(S.D, F, [[0, 1.30], [0.08, 1.30], [0.10, 1.26], [0.10, 1.02], [0.0, 1.02]], 40);
    for (var i = 0; i < 16; i++) {
      var a = (i + 0.5) * TAU / 16;
      K.box(S.D, F, Math.cos(a) * 1.18, Math.sin(a) * 1.18, 0.125, 0.07, 0.07, 0.05, a);
    }
    K.latheZ(S.P, F, [[0.0, 1.06], [0.10, 1.06], [0.12, 0.96], [0.40, 0.80], [0.42, 0.98], [0.48, 0.98], [0.48, 0.001]], 32);
  }

  /* elevated tube frame: u along the bore from the trunnions */
  function tubeFrame(K, F) {
    var T = K.T, E = new T.Matrix4().makeTranslation(XT, 0, LOF);
    E.multiply(new T.Matrix4().makeRotationY(-ELEV));
    return F.clone().multiply(E);
  }

  /* rotating part except the shield: platform, carriage, cradle, breech, tube */
  function gunTop(K, S, F, su) {
    var i, s;
    /* platform disc on the pedestal */
    K.latheZ(S.P, F, [[0.48, 1.08], [0.58, 1.08], [0.58, 0.001]], 36);
    /* carriage cheeks either side of the cradle, trunnions at the top */
    for (s = -1; s <= 1; s += 2) {
      K.plate(S.P, F, [[-0.80, 0.58], [0.90, 0.58], [0.80, 1.22], [0.62, 1.82], [0.12, 1.88], [-0.30, 1.58], [-0.80, 1.05]],
              [0, s * 0.40, 0], [1, 0, 0], [0, 0, 1], 0.05);
      K.cyl(S.D, F, [XT, s * 0.42, LOF], [XT, s * 0.50, LOF], 0.13, 0.13, 14);
      /* bracing struts from the platform out to the shield sides */
      K.cyl(S.P, F, [0.55, s * 0.62, 0.60], [0.85, s * (HW - 0.06), 0.42], 0.035, 0.035, 6);
      K.cyl(S.P, F, [-0.70, s * 0.62, 0.60], [-1.05, s * (HW - 0.06), 0.42], 0.035, 0.035, 6);
      /* layers' seats */
      K.box(S.D, F, -0.55, s * 0.82, 1.00, 0.36, 0.34, 0.05);
      K.cyl(S.D, F, [-0.55, s * 0.82, 0.58], [-0.55, s * 0.82, 0.98], 0.03, 0.03, 6);
    }
    /* horizontal bar across the bottom of the shield, side rails */
    K.cyl(S.D, F, [-1.10, -HW + 0.06, 0.46], [-1.10, HW - 0.06, 0.46], 0.035, 0.035, 8);
    for (s = -1; s <= 1; s += 2) K.cyl(S.D, F, [-1.10, s * (HW - 0.06), 0.46], [0.80, s * (HW - 0.06), 0.46], 0.03, 0.03, 6);
    /* sight column with its handwheel (left, +y) and the training handwheel (right) */
    K.cyl(S.P, F, [-0.15, 0.80, 0.58], [-0.15, 0.80, 1.78], 0.06, 0.05, 8);
    K.box(S.D, F, -0.10, 0.80, 1.88, 0.42, 0.16, 0.20);
    K.cyl(S.D, F, [-0.31, 0.80, 1.90], [-0.42, 0.80, 1.90], 0.035, 0.035, 8);
    var T = K.T, tw;
    for (s = -1; s <= 1; s += 2) {
      tw = new T.TorusGeometry(0.17, 0.018, 4, 16);
      S.D.geo(tw, K.m(F, -0.38, s * 0.66, 1.30, 0, 0, Math.PI / 2));
      K.cyl(S.D, F, [-0.38, s * 0.66, 1.30], [-0.38, s * 0.44, 1.30], 0.025, 0.025, 6);
      for (i = 0; i < 3; i++) {
        var a = i * TAU / 3;
        K.cyl(S.D, F, [-0.38, s * 0.66, 1.30], [-0.38 + Math.cos(a) * 0.16, s * 0.66, 1.30 + Math.sin(a) * 0.16], 0.012, 0.012, 4);
      }
    }

    var E = tubeFrame(K, F);
    /* cradle and its front collar */
    /* cradle, its front sleeve standing out of the shield to u = su */
    K.latheX(S.P, E, [[-1.15, 0.001], [-1.15, 0.22], [-1.10, 0.25], [0.55, 0.25], [0.60, 0.225], [su - 0.06, 0.225], [su, 0.205], [su, 0.001]], 22);
    /* the two recoil cylinders above the tube */
    for (s = -1; s <= 1; s += 2) {
      K.cyl(S.P, E, [-1.05, s * 0.14, 0.30], [0.86, s * 0.14, 0.30], 0.075, 0.075, 12);
      K.cyl(S.D, E, [0.86, s * 0.14, 0.30], [0.92, s * 0.14, 0.30], 0.05, 0.05, 10);
    }
    /* breech ring (rear face at u = MUZ - XT - BAR), round breech, housing under it */
    var ub = MUZ - XT - BAR;                                  // -1.946
    K.box(S.P, E, ub + 0.23, 0, 0.02, 0.46, 0.60, 0.50);
    K.box(S.P, E, ub + 0.25, 0, -0.38, 0.40, 0.48, 0.30);
    K.latheX(S.D, E, [[ub - 0.02, 0.001], [ub - 0.02, 0.14], [ub + 0.01, 0.14], [ub + 0.01, 0.001]], 16);
    K.cyl(S.D, E, [ub + 0.05, 0.30, 0.10], [ub - 0.10, 0.48, -0.20], 0.025, 0.025, 6);   // breech lever
    /* loading tray behind the breech to the breech sweep radius */
    var u0 = -2.295 - XT;                                      // breech sweep radius 2.295 m
    K.box(S.D, E, (u0 + ub) / 2 - 0.02, 0, -0.17, ub - u0, 0.34, 0.025);
    for (s = -1; s <= 1; s += 2) K.box(S.D, E, (u0 + ub) / 2 - 0.02, s * 0.17, -0.11, ub - u0, 0.025, 0.12);
    /* the tube: plain, a sleeve where it leaves the shield, slight muzzle swell */
    var um = MUZ - XT;                                         // 4.635
    K.latheX(S.P, E, [[su - 0.10, 0.001], [su - 0.10, 0.160], [su + 0.04, 0.160], [su + 0.10, 0.152],
                      [2.40, 0.140], [3.40, 0.126], [4.40, 0.113], [4.47, 0.120], [um - 0.01, 0.120], [um, 0.112], [um, 0.068], [um - 0.30, 0.066]], 24);
    K.latheX(S.D, E, [[um - 0.30, 0.001], [um - 0.30, 0.066], [um - 0.005, 0.066], [um - 0.005, 0.001]], 12);
  }

  /* e50/e60: the BOX shield of the Teriberka guns */
  function boxShield(K, S, F) {
    var xf = 0.90, xr = -1.40, t = 0.03, s, i;
    /* front plate: slot from z 1.40 up through the top, tall window right, square window left */
    var fr = [[-HW, ZB], [HW, ZB], [HW, ZT], [0.19, ZT]];
    for (i = 0; i <= 6; i++) { var a = i * Math.PI / 6; fr.push([0.19 * Math.cos(a), 1.59 - 0.19 * Math.sin(a)]); }
    fr.push([-0.19, ZT], [-HW, ZT]);
    K.plate(S.P, F, fr, [xf, 0, 0], [0, 1, 0], [0, 0, 1], t,
            [[[-0.86, 1.52], [-0.66, 1.52], [-0.66, 2.06], [-0.86, 2.06]],
             [[0.44, 1.62], [0.68, 1.62], [0.68, 1.86], [0.44, 1.86]]]);
    /* side plates, chamfered lower rear corner */
    for (s = -1; s <= 1; s += 2)
      K.plate(S.P, F, [[xr + 0.38, ZB], [xf, ZB], [xf, ZT], [xr, ZT], [xr, ZB + 0.38]], [0, s * (HW - t / 2), 0], [1, 0, 0], [0, 0, 1], t);
    /* roof with the notch for the tube, rear lip */
    K.plate(S.P, F, [[xr - 0.02, -HW - 0.02], [xf + 0.03, -HW - 0.02], [xf + 0.03, -0.19], [xf - 0.70, -0.19], [xf - 0.70, 0.19],
                     [xf + 0.03, 0.19], [xf + 0.03, HW + 0.02], [xr - 0.02, HW + 0.02]], [0, 0, ZT - t / 2], [1, 0, 0], [0, 1, 0], t);
    K.box(S.P, F, xr + 0.04, 0, ZT - 0.08, 0.06, 2 * HW, 0.12);
    /* corner angles and the front stiffener along the bottom */
    for (s = -1; s <= 1; s += 2) {
      K.box(S.P, F, xf - 0.03, s * (HW - 0.03), (ZB + ZT) / 2, 0.06, 0.06, ZT - ZB);
      K.box(S.P, F, (xf + xr) / 2, s * (HW - 0.04), ZT - 0.05, xf - xr, 0.06, 0.06);
      /* four grab handles by the rear edge, outer face */
      for (i = 0; i < 4; i++) {
        var z = 0.85 + i * 0.33, y = s * (HW + 0.05);
        K.box(S.D, F, xr + 0.16, y, z, 0.16, 0.022, 0.022);
        K.box(S.D, F, xr + 0.08, s * (HW + 0.025), z, 0.022, 0.05, 0.022);
        K.box(S.D, F, xr + 0.24, s * (HW + 0.025), z, 0.022, 0.05, 0.022);
      }
      /* the two stays from the carriage up to the roof front (T -02) */
      K.cyl(S.D, F, [0.05, s * 0.45, 1.05], [xf - 0.30, s * 0.95, ZT - 0.12], 0.03, 0.03, 6);
      /* sight-hood boxes inside under the roof, either side */
      K.box(S.P, F, xf - 0.28, s * 0.80, ZT - 0.20, 0.42, 0.34, 0.30);
    }
    K.box(S.P, F, xf - 0.04, 0, ZB + 0.06, 0.06, 2 * HW - 0.1, 0.10);
    /* lifting lugs on the roof corners */
    [[xf - 0.12, HW - 0.12], [xf - 0.12, -HW + 0.12], [xr + 0.12, HW - 0.12], [xr + 0.12, -HW + 0.12]].forEach(function (p) {
      K.box(S.D, F, p[0], p[1], ZT + 0.07, 0.14, 0.02, 0.02);
      K.box(S.D, F, p[0] - 0.06, p[1], ZT + 0.035, 0.02, 0.02, 0.07);
      K.box(S.D, F, p[0] + 0.06, p[1], ZT + 0.035, 0.02, 0.02, 0.07);
    });
  }

  /* e80: the STREAMLINED shield (B-13-IIs / IIIs): an open shell lofted
     through rings, rounded front corners, the top edge rolled into the roof,
     the slot open from z 1.40 up into the roof */
  function roundShield(K, S, F) {
    var xf = 1.25, xr = -2.10, rc = 0.72, rt = 0.60, t = 0.03, gap = 0.19, zs = 1.40, i, j, s;
    var ctr = [xf - rc - 0.4, 0, 1.2];
    /* ring stations [z, inset] */
    var st = [[ZB, 0], [zs, 0], [ZT - rt, 0]];
    for (i = 1; i <= 4; i++) { var th = i * Math.PI / 8; st.push([ZT - rt + rt * Math.sin(th), rt * (1 - Math.cos(th))]); }
    /* half outline (side s), from the rear along the side, round the corner, to the slot edge */
    function half(z, d, sd, cut) {
      var p = [[xr, sd * (HW - d), z], [xf - rc, sd * (HW - d), z]], k;
      for (k = 1; k <= 7; k++) {
        var a = (Math.PI / 2) * (1 - k / 7);
        p.push([xf - rc + (rc - d) * Math.cos(a), sd * (HW - rc + (rc - d) * Math.sin(a)), z]);
      }
      p.push([xf - d, sd * (cut ? gap : 0.0), z]);
      return p;
    }
    function sheet(bin, ringA, ringB, inward) {
      for (var k = 0; k + 1 < ringA.length; k++) bin.quad(ringA[k], ringA[k + 1], ringB[k + 1], ringB[k], ctr, inward);
    }
    S.P.M = F;
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i + 1 < st.length; i++) {
        var cutA = i >= 1, cutB = i + 1 >= 1;
        var oA = half(st[i][0], st[i][1], s, cutA), oB = half(st[i + 1][0], st[i + 1][1], s, cutB);
        var iA = half(st[i][0], st[i][1] + t, s, cutA), iB = half(st[i + 1][0], st[i + 1][1] + t, s, cutB);
        if (i === 0) { oA[oA.length - 1][1] = 0; iA[iA.length - 1][1] = 0; oB[oB.length - 1][1] = 0; iB[iB.length - 1][1] = 0; }
        sheet(S.P, oA, oB, false);
        sheet(S.P, iA, iB, true);
        /* rear edge strip */
        S.P.quad(oA[0], oB[0], iB[0], iA[0], ctr, false);
        /* slot jamb strip */
        if (i >= 1) { var n = oA.length - 1; S.P.quad(oA[n], oB[n], iB[n], iA[n], [xf + 2, 0, 1.6], true); }
      }
      /* bottom edge strip */
      var ob = half(ZB, 0, s, false), ib = half(ZB, t, s, false);
      ob[ob.length - 1][1] = 0; ib[ib.length - 1][1] = 0;
      for (j = 0; j + 1 < ob.length; j++) S.P.quad(ob[j], ob[j + 1], ib[j + 1], ib[j], ctr, false);
      /* slot sill across the front at zs */
      var o1 = half(zs, 0, s, true), i1 = half(zs, t, s, true);
      S.P.quad(o1[o1.length - 1], [xf, 0, zs], [xf - t, 0, zs], i1[i1.length - 1], [xf, 0, zs + 1], true);
    }
    S.P.M = null;
    /* the roof plate (inset rt) with the notch running back from the slot */
    var d = rt, rf = [[xr, -(HW - d)], [xf - rc, -(HW - d)]];
    for (i = 1; i <= 7; i++) { var a2 = -(Math.PI / 2) * (1 - i / 7); rf.push([xf - rc + (rc - d) * Math.cos(a2), -(HW - rc) + (rc - d) * Math.sin(a2)]); }
    rf.push([xf - d, -gap], [xf - 1.05, -gap], [xf - 1.05, gap], [xf - d, gap]);
    for (i = 0; i <= 6; i++) { var a3 = (Math.PI / 2) * (i / 7); rf.push([xf - rc + (rc - d) * Math.cos(a3), (HW - rc) + (rc - d) * Math.sin(a3)]); }
    rf.push([xf - rc, HW - d], [xr, HW - d]);
    K.plate(S.P, F, rf, [0, 0, ZT - t / 2], [1, 0, 0], [0, 1, 0], t);
    /* raised strips either side of the slot, front and up the roll */
    for (s = -1; s <= 1; s += 2) {
      K.box(S.P, F, xf + 0.025, s * 0.27, (zs + ZT - rt) / 2 - 0.05, 0.05, 0.07, ZT - rt - zs + 0.1);
      for (i = 0; i < 4; i++) {                                   // the strips follow the roll
        var th2 = (i + 0.5) * Math.PI / 8, cth = Math.cos(th2), sth = Math.sin(th2);
        K.box(S.P, F, xf - rt + (rt + 0.025) * cth, s * 0.27, ZT - rt + (rt + 0.025) * sth, 0.05, 0.07, rt * 0.42, 0, -th2);
      }
      K.box(S.P, F, xf - rt - 0.25, s * 0.27, ZT + 0.025, 0.50, 0.07, 0.05);
      /* sight hoods at the top front */
      K.box(S.P, F, xf - rt - 0.25, s * 0.78, ZT + 0.07, 0.42, 0.30, 0.16);
      K.box(S.D, F, xf - rt - 0.03, s * 0.78, ZT + 0.07, 0.02, 0.22, 0.08);
      /* side door: raised frame and handle */
      var y = s * (HW + 0.012);
      K.box(S.P, F, 0.12, y, 0.62, 0.90, 0.025, 0.05);
      K.box(S.P, F, 0.12, y, 1.58, 0.90, 0.025, 0.05);
      K.box(S.P, F, -0.33, y, 1.10, 0.05, 0.025, 0.96);
      K.box(S.P, F, 0.57, y, 1.10, 0.05, 0.025, 0.96);
      K.box(S.D, F, 0.42, s * (HW + 0.04), 1.10, 0.02, 0.03, 0.16);
      /* grab handles along the rear part of the side */
      for (i = 0; i < 6; i++) {
        var hx = -0.75 - (i % 3) * 0.42, hz = 0.75 + Math.floor(i / 3) * 0.70;
        K.box(S.D, F, hx, s * (HW + 0.05), hz, 0.18, 0.022, 0.022);
        K.box(S.D, F, hx - 0.08, s * (HW + 0.025), hz, 0.022, 0.05, 0.022);
        K.box(S.D, F, hx + 0.08, s * (HW + 0.025), hz, 0.022, 0.05, 0.022);
      }
      /* rear edge stiffener */
      K.box(S.P, F, xr + 0.03, s * (HW - 0.03), (ZB + ZT - rt) / 2, 0.06, 0.06, ZT - rt - ZB);
    }
    /* lifting lugs on the roof */
    [[xr + 0.25, 0.7], [xr + 0.25, -0.7], [0.2, 0.7], [0.2, -0.7]].forEach(function (p) {
      K.box(S.D, F, p[0], p[1], ZT + 0.07, 0.14, 0.02, 0.02);
      K.box(S.D, F, p[0] - 0.06, p[1], ZT + 0.035, 0.02, 0.02, 0.07);
      K.box(S.D, F, p[0] + 0.06, p[1], ZT + 0.035, 0.02, 0.02, 0.07);
    });
    /* bottom stiffener across the front inside */
    K.box(S.P, F, xf - 0.06, 0, ZB + 0.06, 0.06, 2 * (HW - rc), 0.10);
  }

  /* ================================================================ pads */
  /* e50/e60 Teriberka pad: D-shaped slab, parapet round the rear and flanks
     open to the sea, a shelter in the right rear quarter, masonry wall
     closing the right flank. pf = pad frame (ground z = 0). Returns pad top. */
  var PAD_T = 0.10;
  function terPad(K, B, pf) {
    var Ri = 3.65, Ro = 4.05, xo = 1.7, i, a, out = [], inn = [];
    /* slab */
    var sl = [[2.6, -Ri - 0.05]];
    for (i = 0; i <= 16; i++) { a = -Math.PI / 2 - i * Math.PI / 16; sl.push([Math.cos(a) * (Ri + 0.05), Math.sin(a) * (Ri + 0.05)]); }
    sl.push([2.6, Ri + 0.05]);
    K.plate(B.C, pf, sl, [0, 0, PAD_T / 2], [1, 0, 0], [0, 1, 0], PAD_T);
    /* parapet: U wall 1.0 m over the pad */
    out.push([xo, Ro]);
    for (i = 0; i <= 16; i++) { a = Math.PI / 2 + i * Math.PI / 16; out.push([Math.cos(a) * Ro, Math.sin(a) * Ro]); }
    out.push([xo, -Ro], [xo, -Ri]);
    for (i = 16; i >= 0; i--) { a = Math.PI / 2 + i * Math.PI / 16; out.push([Math.cos(a) * Ri, Math.sin(a) * Ri]); }
    out.push([xo, Ri]);
    K.plate(B.C, pf, out, [0, 0, (PAD_T + 1.0) / 2], [1, 0, 0], [0, 1, 0], 1.0 - PAD_T);
    /* wall cap: slight lip */
    /* shelter, right rear quarter (225 deg): concrete box outside the wall,
       roof slab on a steel beam over a dark doorway facing the gun */
    var ang = -Math.PI * 0.80, F2 = K.m(pf, Math.cos(ang) * Ri, Math.sin(ang) * Ri, 0, ang);
    /* in F2: +x radial outward, wall inner face at x = 0 */
    K.box(B.C, F2, 1.35, 0, 0.62, 2.0, 2.6, 1.24);                       // the shelter block
    K.box(B.C, F2, 1.10, 0, 1.32, 2.7, 3.0, 0.16);                       // roof slab, overhanging toward the pad
    K.box(B.D, F2, -0.20, 0, 1.19, 0.10, 3.0, 0.14);                     // steel I-beam on its inner edge
    K.box(B.D, F2, 0.0, 0, 0.55, 0.06, 1.05, 0.90);                     // the doorway (dark)
    K.box(B.C, F2, -0.20, -0.62, 0.62, 0.42, 0.18, 1.12);               // door jambs carrying the beam
    K.box(B.C, F2, -0.20, 0.62, 0.62, 0.42, 0.18, 1.12);
    K.box(B.Q, F2, 1.6, 0.7, 1.42, 0.8, 0.6, 0.02);                     // team panel 2 cm over the roof
    /* masonry wall closing the right flank forward of the parapet end */
    K.box(B.A, pf, xo + 1.25, -Ri - 0.20, 0.30, 2.60, 0.62, 0.60);       // laid base course
    for (i = 0; i < 8; i++) {
      var bx0 = xo + 0.12 + i * 0.32 + ((i * 7) % 3) * 0.02, bh = 0.24 + ((i * 37) % 3) * 0.03;
      K.box(B.A, pf, bx0, -Ri - 0.20 + ((i * 5) % 3 - 1) * 0.03, 0.60 + bh / 2, 0.30, 0.52, bh, ((i * 13) % 7 - 3) * 0.03);
    }
  }

  /* e80 Vladivostok 1970s pit: octagonal concrete wall 1.15 m high, niches,
     a break at the rear, earth banked outside. */
  var PIT_T = 0.08;
  function vladPit(K, B, pf) {
    var ai = 3.0, ao = 3.35, h = 1.15, k, gapw = 0.95, side = 2 * ao * Math.tan(Math.PI / 8);
    /* floor: concrete octagon */
    var fl = [];
    for (k = 0; k < 8; k++) { var a = (k + 0.5) * Math.PI / 4; fl.push([Math.cos(a) * ai / Math.cos(Math.PI / 8), Math.sin(a) * ai / Math.cos(Math.PI / 8)]); }
    K.plate(B.C, pf, fl, [0, 0, PIT_T / 2], [1, 0, 0], [0, 1, 0], PIT_T);
    /* the eight walls, flats facing the axes; the rear one split by the entrance */
    var am = (ai + ao) / 2;
    for (k = 0; k < 8; k++) {
      var aa = k * Math.PI / 4, ca = Math.cos(aa), sa = Math.sin(aa);
      if (k === 4) {
        var seg = (side - gapw) / 2;
        for (var e = -1; e <= 1; e += 2) {
          var off = e * (gapw / 2 + seg / 2);
          K.box(B.C, pf, ca * am - sa * off, sa * am + ca * off, h / 2, ao - ai, seg, h, aa);
          /* passage walls running back from the break */
          K.box(B.C, pf, -ao - 0.65, e * (gapw / 2 + 0.15), (h - 0.1) / 2, 1.3, 0.30, h - 0.1);
        }
        continue;
      }
      K.box(B.C, pf, ca * am, sa * am, h / 2, ao - ai, side, h, aa);
    }
    /* square ammunition niches in the inner face (dark recesses) */
    [3, 5, 2, 6].forEach(function (k2) {
      var aa = k2 * Math.PI / 4, ca = Math.cos(aa), sa = Math.sin(aa);
      K.box(B.D, pf, ca * (ai - 0.005), sa * (ai - 0.005), 0.72, 0.02, 0.58, 0.55, aa);
      K.box(B.C, pf, ca * (ai - 0.05), sa * (ai - 0.05), 1.02, 0.10, 0.74, 0.06, aa);   // lintel
    });
    /* earth banked against the outside, up to 0.2 m under the wall top;
       open at the rear passage */
    var path = [], st = 20;
    for (k = 0; k <= st; k++) {
      var t = -Math.PI * 0.86 + k * (Math.PI * 1.72) / st;
      var m4 = ((t % (Math.PI / 4)) + Math.PI / 4) % (Math.PI / 4), dl = m4 - (Math.PI / 4) * Math.round(m4 / (Math.PI / 4));
      var r = (ao + 0.05) / Math.cos(dl);
      var hs = (k === 0 || k === st) ? 0.3 : 1;
      path.push([Math.cos(t) * r, Math.sin(t) * r, hs]);
    }
    K.bank(B.E, pf, path, [[-1.6, 0], [-1.1, 0.30], [-0.6, 0.62], [-0.2, 0.86], [0.0, 0.93]]);
    /* team placard on the wall top by the entrance */
    K.box(B.Q, pf, -am, gapw / 2 + seg0(side, gapw) / 2, h + 0.02, 0.30, 0.50, 0.02);
  }
  function seg0(side, gapw) { return (side - gapw) / 2; }

  /* ================================================================ site */
  var KINDS = {
    ter:  { paint: 0x717677, seed: 17, ground: 0x5e5f3f, gkind: "grass", rock: 0x7c6f69, conc: 0x8b8c86, pitch: 9.2, shift: 0.9 },
    vlad: { paint: 0x4f5a3a, seed: 29, ground: 0x66683f, gkind: "grass", conc: 0x6f6d63, pitch: 9.4, shift: 0.3 }
  };
  var KEYS = { e50: "ter", e60: "ter", e80: "vlad" };

  function build(THREE, M, C, kind) {
    var G = KINDS[kind], K = new Kit(THREE);
    var teamMat = new THREE.MeshStandardMaterial({
      color: (C && C.team !== undefined) ? C.team : 0x4b8fe0, roughness: 0.6, metalness: 0.1 });
    var paint = texMat(THREE, paintTex(THREE, G.paint, G.seed), G.paint, 0.7, 0.25);
    var dark = new THREE.MeshStandardMaterial({ color: 0x232426, roughness: 0.8, metalness: 0.2 });
    var concM = texMat(THREE, concreteTex(THREE, G.conc, G.seed + 3), G.conc, 0.95, 0.02);
    var grndM = texMat(THREE, groundTex(THREE, G.ground, G.seed + 5, G.gkind), G.ground, 0.97, 0.01);
    var B = {
      A: new Bin(grndM, 0.12), C: new Bin(concM, 0.25), P: new Bin(paint, 0.5), D: new Bin(dark), Q: new Bin(teamMat)
    };
    if (kind === "vlad") B.E = new Bin(texMat(THREE, groundTex(THREE, 0x5b5c3a, 41, "grass"), 0x5b5c3a, 0.97, 0.01), 0.2);
    /* Teriberka: tundra heath on the apron, the granite only on the outcrops (orchestrator,
       2026-11-03: a 28 m slab of pink granite read as a pink square on the game map) */
    if (kind === "ter") B.R = new Bin(texMat(THREE, groundTex(THREE, G.rock, G.seed + 7, "rock"), G.rock, 0.97, 0.01), 0.25);
    var I = new THREE.Matrix4(), root = new THREE.Group();
    /* ground apron, stepped edge */
    K.box(B.A, I, 0, 0, 0.0075, 28.0, 28.0, 0.015);
    var padT = kind === "ter" ? PAD_T : PIT_T;
    var ys = [0, G.pitch, -G.pitch], j;
    for (j = 0; j < 3; j++) {
      var pf = new THREE.Matrix4().makeTranslation(G.shift, ys[j], 0);
      if (kind === "ter") terPad(K, B, pf); else vladPit(K, B, pf);
      var gf = new THREE.Matrix4().makeTranslation(G.shift, ys[j], padT);
      mountBase(K, B, gf);
      if (j === 0) continue;
      gunTop(K, B, gf, kind === "ter" ? 1.05 : 1.45);
      if (kind === "ter") boxShield(K, B, gf); else roundShield(K, B, gf);
    }
    if (kind === "ter") {
      /* granite outcrops round the pads */
      [[-9.5, 12.6, 1.6, 1.0, 0.45, 0.3], [9.0, -12.4, 2.0, 1.2, 0.5, 1.1], [-10.0, -4.8, 1.3, 0.9, 0.35, 2.0],
       [-10.6, 5.2, 1.0, 0.8, 0.30, 0.6], [8.6, 4.8, 1.4, 0.7, 0.28, 0.2], [8.4, -4.6, 1.1, 0.8, 0.30, 2.4],
       [-6.0, 13.0, 1.2, 0.6, 0.25, 0.1], [11.6, 12.0, 1.3, 1.0, 0.35, 0.9]].forEach(function (r) {
        K.rock(B.R, I, r[0], r[1], r[2], r[3], r[4], r[5]);
      });
    }
    /* the turret: the middle gun's rotating part */
    var tS = { P: new Bin(paint, 0.5), D: new Bin(dark) };
    var tf = new THREE.Matrix4().makeTranslation(0, 0, padT);
    gunTop(K, tS, tf, kind === "ter" ? 1.05 : 1.45);
    if (kind === "ter") boxShield(K, tS, tf); else roundShield(K, tS, tf);
    var t = new THREE.Group(); t.name = "turret";
    [["tP", tS.P], ["tD", tS.D]].forEach(function (b) { var m = b[1].mesh(THREE, b[0]); if (m) t.add(m); });
    t.position.set(G.shift, 0, 0);
    root.add(t);
    ["A", "E", "R", "C", "P", "D", "Q"].forEach(function (k) { if (B[k]) { var m = B[k].mesh(THREE, k); if (m) root.add(m); } });
    root.userData.whole = true;
    return root;
  }

  return { build: build, KEYS: KEYS, KINDS: KINDS };
})();

Object.keys(HeroCoastalSite.KEYS).forEach(function (era) {
  var kind = HeroCoastalSite.KEYS[era];
  BLD_MODELS["coastal_pact_" + era] = { build: function (THREE, M, C) {
    return HeroCoastalSite.build(THREE, M, C, kind);
  } };
});
