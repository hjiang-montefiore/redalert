/* ===== us_tpq37.js - HERO model: AN/TPQ-37 Firefinder weapon-locating radar =====
   Key: nato_e80_radarv ("AN/TPQ-37 Firefinder weapon-locating radar (with the
   TPQ-36)", 1980s-90s).  Until now the row borrowed radarv_n, the TPQ-53: a
   2011 radar on an FMTV truck with a 3 m phased array, which is a different
   machine.  The TPQ-37 is the long-range Hughes Firefinder, in service from
   1980; it is NOT a radar on a truck bed.

   What the references show (four pictures from Wikimedia Commons, fetched
   with a generic agent string; only the first one's credit, US Army, public
   domain, was checked, and none of them is copied: they gave the shape):
     - "Q-37 (V) Firefinder Radar": the antenna-transceiver group (ATG)
       emplaced on its jacks, side-on, desert tan, Hesco barriers behind
       it: a later photograph than the row's period, used for shape only.
     - "TPQ-37 (51463)": a woodland 5-ton 6x6 cargo truck with a shelter on
       its bed, the ATG coupled behind it with the array stood up (so the
       1980s-90s coat; the date of the photograph itself is not given).
     - "AN TPQ-37 Firefinder radar": the woodland ATG side-on, array edge-on.
     - the Army pamphlet page "Firefinder Radars Q36 and Q37": "Transporter:
       2.5-ton cargo truck (AN/TPQ-36), 5-ton cargo truck (AN/TPQ-37)";
       "An operations shelter is set up on a cargo truck.  A generator and a
       radar antenna, which has lightweight Kevlar armor added ..., are towed
       behind the truck."  Range 50 km, 90 degree sector, crew 8-12.
     - the maker's 2003 datasheet: S-band, 90 degree sector, 120 kW; its Block I
       upgrade list ends "and add a tracked suspension system", so the
       tracked ATG is a later fit and is not drawn: a wheeled trailer.

   What is drawn, as one game vehicle (a choice, not a quotation):
     the prime mover and the ATG trailer hitched in a line, as in the woodland
     press photograph.
       1. a 5-ton 6x6 cargo truck: flat-fronted hood, hard cab, bumper, two
          big mirrors, 11.00-20 class tyres (1.04 m over the lugs), tandem rear
          bogie, with the operations shelter on its bed.  The pamphlet says
          "5-ton cargo truck" and nothing more: this is the M809/M939 family
          in outline, not a named model.  8.0 m long, 2.4 m over the tyres
          (3.6 m over the mirrors).
       2. a two-axle trailer with a long box body on a low frame, an A-frame
          drawbar, four leveling jacks down, mud flaps, six louvre panels on
          each side (four above, two below, where the side-on woodland
          photograph has them; the far side was not photographed and is drawn
          the same) and a raised equipment hood at the tail.  The propped-open
          awning flaps of the desert photograph are NOT drawn: no woodland
          picture shows them.
       3. the array stood up on the box roof on a slew ring at the FRONT edge
          of the box (the side-on woodland photograph puts the slab's
          mid-plane about 0.07 m behind the edge, its platform overhanging the
          front): a tall portrait slab (about 1.75 m wide by 3.5 m tall, 0.5 m
          deep with its frame and back) standing upright on its hinge blocks
          (the side-on photograph shows no lean), a raised frame round its
          face, back ribs, mounting lugs at the corners and mid-height, and one
          long tilt strut with its actuator down to a foot on the platform
          behind it.  The side-on photograph also has ears fore and aft of the
          slab at three levels (top, a third down, base): drawn at the slab's
          corners, about 0.7 of the photographed size, besides the lateral
          lugs that the oblique pictures show.
     The woodland photograph shows the array up with the truck still hitched,
     the desert one shows it up on its jacks: the pose drawn (hitched, jacks
     down, array up) combines the two, and it is what makes the vehicle read
     as a radar at the game zoom.  Whether crews ever towed it that way is not
     something the references say.
   NOT drawn: the 60 kW generator trailer, camouflage netting, antennas and
   cables.  The pamphlet has the shelter truck towing the ATG, which is what
   is drawn; a fuller system would also have a separate shelter truck.

   Not confirmed, flagged: no published size for the ATG was found (the
   datasheet gives none).  The trailer (5.7 m body, 2.4 m wide, roof at
   2.6 m), the array (1.75 x 3.5 m, top at 6.5 m over the ground) and the
   ratio roof : array (about 1 : 1.5; 1.4 to 1.7 across the three pictures)
   are scaled off the photographs against an 11.00-20 tyre, which is an
   assumption too (the trailer's tyre size is not published in what I
   found): treat the figures as +-15 percent; across the pictures the roof
   reads 2.4 to 3.1 m and the array top 6.7 to 8.4 m, so the drawn figures
   sit at the low end.  The truck is not a named model.  Which end of the box
   roof carries the raised block seen in the desert photograph is not certain
   (drawn at the tail, as the side-on woodland photograph has it; the desert
   photograph puts the array further back from the front edge, unresolved).
   The shelter's
   door, louvres and roof vents and the cab's door lines are generic truck
   and shelter practice, too small to read in the pictures.
   Paint: MERDC woodland, the 1980s Army scheme (the Humvee hero's colours).
   The Gulf War tan of 1991 and the single-colour green after 1993 are not
   drawn: the row is one key and carries one coat; the desert photograph is
   shape evidence only.

   Named nodes: "turret" is the array and everything that stands on the slew
   ring (ring, platform, hinge, slab, lugs, strut).  Its origin is the ring
   centre on the box roof and the array face looks along +X at rest.
   render3d trains it by -(tang - ang) about its own Z; a radar has no weapon,
   so tang keeps the heading it spawned with and the array stands at ANY yaw
   to the hull (see us_tpq53.js).  Everything of the turret is above the box
   roof and inside 1.27 m of the axis; the axis is 0.35 m behind the box front
   edge and 2.45 m from the truck's tail, so no yaw reaches the truck (the
   sweep stops 1.18 m short of it); at the front edge the ring and the array
   overhang the box as they do in the photograph (checked against every other
   vertex of the dump at roof height or above: the nearest is the roof's own
   front corner, 1.25 m out).  The five axles are Groups named "roadwheel"
   (each holds both tyres of its axle, lugged so the turn shows; the rims are
   round and are baked into the body).

   Draw calls: five body meshes (paint, steel, dark, glass, team), three for
   the turret (paint, steel, dark) and five axles: 13.  Five materials.  The
   team material is exactly C.team (stand-in rows rely on it); the flash is
   the shelter roof and the box roof, the surfaces a camera looking down sees.

   Model space: +X nose, +Y left (port), +Z up, real metres, tyres and jack
   pads on z = 0.  Nothing sticks out along X past the bumper or the trailer
   tail, so render3d's length scaling measures the rig (16 m).  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTpq37 = (function () {
  "use strict";

  /* ------------------------------------------------------------ geometry */
  var TR = 0.52;                              /* tyre radius over the lugs: 11.00-20 class */
  /* the truck: bumper face at +8.10, bed end at +0.10 (8.0 m) */
  var X_BUMP = 8.10, XF = 6.85, XR1 = 2.65, XR2 = 1.33, YT = 1.04;
  var CAB_X0 = 4.70, CAB_X1 = 6.25, CAB_Z1 = 2.88, DECK = 1.38;
  var SH_X0 = 0.60, SH_X1 = 4.35, SH_Z1 = 3.30;
  /* the ATG trailer: body from -2.00 to -7.70, frame and jacks to -7.97 */
  var TX0 = -2.00, TX1 = -7.70, TZ0 = 1.12, TZ1 = 2.60, YTT = 1.07;
  var TAX = [-4.65, -5.95];
  var PIV_X = -2.35, ROOF = TZ1;              /* slew ring axis: 0.35 m behind the box front edge, so the array's mid-plane (0.28 m ahead of it) is 0.07 m behind the edge */
  var AW = 1.75, AH = 3.50;                   /* array width and height (estimated) */
  var UVS = 1 / 9;                            /* paint canvas covers 9 m */

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ------------------------------------------------------------ SKIN tex */
  /* MERDC woodland: the Humvee hero's four colours (green, brown, black, dark
     green).  Each blob is drawn at nine offsets so the tile wraps without a
     seam.  Mapped by position, 9 m to the canvas, the pattern runs on from
     the shelter into the cab; the bottom 14 percent is road dust, so it
     lands on the lowest 1.3 m of every side. */
  var _skinCv = null;
  function blob(q, cx, cy, rad, sx, shp) {
    var n = shp.length, i, a, r;
    q.beginPath();
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; r = rad * shp[i];
      if (i === 0) q.moveTo(cx + Math.cos(a) * r * sx, cy + Math.sin(a) * r);
      else q.lineTo(cx + Math.cos(a) * r * sx, cy + Math.sin(a) * r);
    }
    q.closePath(); q.fill();
  }
  function skinCanvas() {
    if (_skinCv) return _skinCv;
    var R = rng(37037), W = 512, H = 512, i, k, dx, dy, cx, cy, rad, sx, shp, gr;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    q.fillStyle = "#4a5a36"; q.fillRect(0, 0, W, H);
    var cols = ["#5b4a30", "#3b4b2a", "#22251f", "#5b4a30", "#3b4b2a"];
    for (i = 0; i < 64; i++) {
      q.fillStyle = cols[i % cols.length];
      cx = R() * W; cy = R() * H; rad = 26 + R() * 44; sx = 1.4 + R() * 0.9;
      shp = []; for (k = 0; k < 9; k++) shp.push(0.55 + R() * 0.75);
      for (dx = -W; dx <= W; dx += W) for (dy = -H; dy <= H; dy += H) blob(q, cx + dx, cy + dy, rad, sx, shp);
    }
    q.fillStyle = "rgba(30,26,18,0.20)";
    for (i = 0; i < 50; i++) q.fillRect(R() * W, R() * H * 0.8, 8 + R() * 40, 1 + R() * 2);
    q.fillStyle = "rgba(20,18,12,0.35)";
    for (i = 0; i < 90; i++) q.fillRect(R() * W, R() * H, 2, 2);
    gr = q.createLinearGradient(0, H * 0.86, 0, H);
    gr.addColorStop(0, "rgba(150,126,92,0.00)");
    gr.addColorStop(1, "rgba(150,126,92,0.50)");
    q.fillStyle = gr; q.fillRect(0, H * 0.86, W, H * 0.14);
    _skinCv = cv;
    return cv;
  }

  function canvasTex(THREE, cv) {
    try {
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;   /* r148: encoding is the switch that works */
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }

  /* ---------------------------------------------------------- materials */
  function makeMats(THREE, C) {
    var T = {};
    var st = canvasTex(THREE, skinCanvas());
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (st) T.paint.map = st; else T.paint.color.setHex(0x4a5a36);
    T.steel = new THREE.MeshStandardMaterial({ color: 0x5d605e, roughness: 0.46, metalness: 0.55 });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x1d1e1c, roughness: 0.86, metalness: 0.05 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1a2831, roughness: 0.14, metalness: 0.35 });
    /* the owner's colour exactly, so era-painted stand-in rows leave it alone */
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    return T;
  }

  /* -------------------------------------------------------------- baker */
  /* Parts are made with the stock three.js primitives, moved into place by
     the current frame, and appended to one flat triangle list per material,
     each part keeping its own normals, so a merged mesh lights exactly as
     the separate meshes would.  UVs are box-projected from the position;
     faces that look up are offset half a tile so a roof never lands on the
     dust band. */
  function mx(T, x, y, z, rx, ry, rz) {
    var m = new T.Matrix4();
    if (rx || ry || rz) m.makeRotationFromEuler(new T.Euler(rx || 0, ry || 0, rz || 0, "XYZ"));
    m.setPosition(x || 0, y || 0, z || 0);
    return m;
  }

  function Baker(T) { this.T = T; this.bins = {}; this.frame = new T.Matrix4(); this.stack = []; this.uvz = 0; }
  Baker.prototype.push = function (m) { this.stack.push(this.frame); this.frame = this.frame.clone().multiply(m); return this; };
  Baker.prototype.pop = function () { this.frame = this.stack.pop(); return this; };
  Baker.prototype.put = function (key, geo, local) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    g.applyMatrix4(local ? this.frame.clone().multiply(local) : this.frame);
    var b = this.bins[key] || (this.bins[key] = { p: [], n: [], u: [] });
    var p = g.attributes.position.array, n = g.attributes.normal.array;
    var i, ax, ay, az, u, v;
    for (i = 0; i < p.length; i += 3) {
      b.p.push(p[i], p[i + 1], p[i + 2]);
      b.n.push(n[i], n[i + 1], n[i + 2]);
      ax = Math.abs(n[i]); ay = Math.abs(n[i + 1]); az = Math.abs(n[i + 2]);
      if (ax >= ay && ax >= az) { u = p[i + 1]; v = p[i + 2] + this.uvz; }
      else if (ay >= az) { u = p[i]; v = p[i + 2] + this.uvz; }
      else { u = p[i]; v = p[i + 1] + 4.5; }
      b.u.push(u * UVS, v * UVS);
    }
    g.dispose();
    return this;
  };
  Baker.prototype.box = function (key, sx, sy, sz, x, y, z, rx, ry, rz) {
    return this.put(key, new this.T.BoxGeometry(sx, sy, sz), mx(this.T, x, y, z, rx, ry, rz));
  };
  /* axis "y" is the cylinder's own; "x" and "z" turn it */
  Baker.prototype.cyl = function (key, r0, r1, h, x, y, z, axis, seg, open) {
    var T = this.T, g = new T.CylinderGeometry(r0, r1, h, seg || 10, 1, !!open);
    if (axis === "x") g.rotateZ(Math.PI / 2); else if (axis === "z") g.rotateX(Math.PI / 2);
    return this.put(key, g, mx(T, x, y, z));
  };
  /* a round rod from point a to point b */
  Baker.prototype.rod = function (key, r, a, b, seg) {
    var T = this.T, d = new T.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]), len = d.length();
    var q = new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize());
    var m = new T.Matrix4().compose(new T.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2), q, new T.Vector3(1, 1, 1));
    return this.put(key, new T.CylinderGeometry(r, r, len, seg || 6, 1, false), m);
  };
  /* an (x, z) outline extruded along Y from y0 to y1 */
  Baker.prototype.prism = function (key, pts, y0, y1) {
    var T = this.T, s = new T.Shape(), i;
    s.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
    var g = new T.ExtrudeGeometry(s, { depth: y1 - y0, bevelEnabled: false, steps: 1 });
    g.rotateX(Math.PI / 2); g.translate(0, y1, 0);
    return this.put(key, g);
  };
  Baker.prototype.mesh = function (key, mat) {
    var b = this.bins[key];
    if (!b || !b.p.length) return null;
    var T = this.T, geo = new T.BufferGeometry();
    geo.setAttribute("position", new T.Float32BufferAttribute(b.p, 3));
    geo.setAttribute("normal", new T.Float32BufferAttribute(b.n, 3));
    geo.setAttribute("uv", new T.Float32BufferAttribute(b.u, 2));
    geo.computeBoundingSphere();
    return new T.Mesh(geo, mat);
  };

  /* ---------------------------------------------------------------- tyre */
  /* 11.00-20 class cross-country tyre, 0.29 m wide.  A lathe (axis = local Y,
     which is what render3d spins) whose tread and shoulder rings are pushed
     out 0.02 m on every second step, so the turn shows as a saw-tooth tread
     without a single extra box; flat normals keep the teeth crisp.  252
     triangles.  One axle holds two of them, built as ONE geometry, so the
     whole rig is five wheel draws. */
  function tyreGeometry(T) {
    var N = 18, NP = 8, i, j, k, x, z, r, f;
    var prof = [[0.31, -0.138], [0.40, -0.147], [0.465, -0.128], [0.50, -0.082],
                [0.50, 0.082], [0.465, 0.128], [0.40, 0.147], [0.31, 0.138]];
    var lg = new T.LatheGeometry(prof.map(function (p) { return new T.Vector2(p[0], p[1]); }), N);
    var pos = lg.attributes.position;
    for (i = 0; i <= N; i += 2) {
      for (j = 2; j <= 5; j++) {
        k = i * NP + j; x = pos.getX(k); z = pos.getZ(k);
        r = Math.sqrt(x * x + z * z); f = (r + 0.02) / r;
        pos.setX(k, x * f); pos.setZ(k, z * f);
      }
    }
    var g = lg.toNonIndexed(); g.computeVertexNormals();
    lg.dispose();
    return g;
  }
  function axleGeometry(T, tg, yt) {
    var B = new Baker(T);
    B.put("t", tg.clone(), mx(T, 0, -yt, 0));
    B.put("t", tg.clone(), mx(T, 0, yt, 0));
    return B.mesh("t", new T.MeshBasicMaterial()).geometry;
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var mats = makeMats(THREE, C);
    var B = new Baker(THREE);
    var i, s, k, x;

    /* ================= the 5-ton truck, bumper at +8.10 ================= */
    /* ---- chassis: frame rails, springs, axles, rims, tanks ------------- */
    for (s = -1; s <= 1; s += 2) {
      B.box("dark", 7.40, 0.12, 0.26, 3.85, s * 0.46, 0.93);                 /* frame rail */
      B.box("dark", 1.05, 0.10, 0.09, XF, s * 0.62, 0.80);                   /* front spring */
      B.box("dark", 2.20, 0.10, 0.10, (XR1 + XR2) / 2, s * 0.62, 0.80);      /* bogie spring and walking beam */
    }
    var AXT = [XF, XR1, XR2];
    for (i = 0; i < 3; i++) {
      B.cyl("dark", 0.085, 0.085, 1.90, AXT[i], 0, TR, "y", 8);              /* axle */
      B.cyl("dark", 0.21, 0.21, 0.36, AXT[i], 0, TR, "x", 10);               /* differential */
      for (s = -1; s <= 1; s += 2) {
        B.cyl("steel", 0.30, 0.30, 0.30, AXT[i], s * YT, TR, "y", 10);       /* rim */
        B.cyl("dark", 0.14, 0.14, 0.34, AXT[i], s * YT, TR, "y", 6);         /* hub */
      }
    }
    B.box("dark", 0.50, 1.00, 0.22, 4.20, 0, 0.93);                          /* transfer case */
    B.box("dark", 1.80, 1.50, 0.30, 7.05, 0, 1.10);                          /* engine under the hood */
    B.box("paint", 1.10, 0.42, 0.50, 4.05, 0.86, 0.86);                      /* fuel tank, port */
    B.box("paint", 0.75, 0.40, 0.40, 5.20, -0.86, 0.90);                     /* battery box, starboard */
    for (s = -1; s <= 1; s += 2) {
      B.box("paint", 1.55, 0.50, 0.07, XF, s * 1.04, 1.30);                  /* front fender */
      B.box("paint", 1.55, 0.05, 0.28, XF, s * 1.29, 1.17);
      B.box("paint", 2.45, 0.46, 0.06, (XR1 + XR2) / 2, s * 1.12, 1.18);     /* bogie fender */
      B.box("dark", 0.03, 0.46, 0.46, XR2 - 0.66, s * YT, 0.40);             /* mud flap */
    }

    /* ---- hood, bumper, cab ---------------------------------------------- */
    B.box("paint", 0.28, 2.34, 0.34, X_BUMP - 0.14, 0, 0.70);                /* bumper */
    B.prism("paint", [[7.84, 1.28], [7.84, 1.98], [7.50, 2.10], [6.25, 2.10], [6.25, 1.28]], -0.85, 0.85);
    B.box("dark", 0.04, 1.10, 0.45, 7.855, 0, 1.62);                         /* grille */
    B.prism("paint", [[CAB_X1, 1.28], [CAB_X1, 2.10], [6.08, 2.80], [5.98, CAB_Z1], [CAB_X0, CAB_Z1], [CAB_X0, 1.28]], -1.15, 1.15);
    for (s = -1; s <= 1; s += 2) {
      B.box("glass", 0.06, 0.22, 0.17, 7.85, s * 0.60, 1.62);                /* headlamps */
      B.box("glass", 0.03, 0.98, 0.64, 6.177, s * 0.56, 2.45, 0, -0.238, 0); /* windscreen panes, raked 13.6 deg */
      B.box("glass", 0.95, 0.03, 0.55, 5.55, s * 1.162, 2.42);               /* door window */
      B.box("dark", 0.02, 0.02, 1.38, 6.02, s * 1.162, 2.00);                /* door seams */
      B.box("dark", 0.02, 0.02, 1.38, 4.95, s * 1.162, 2.00);
      B.box("dark", 1.08, 0.02, 0.02, 5.48, s * 1.162, 1.32);
      B.box("steel", 0.14, 0.03, 0.04, 5.10, s * 1.172, 2.00);               /* door handle */
      B.box("dark", 0.50, 0.20, 0.05, 5.60, s * 1.05, 0.98);                 /* cab step */
      /* mirror: two arms, a dark frame and a glass plate, 0.55 m off the door */
      B.rod("steel", 0.016, [6.05, s * 1.14, 2.62], [6.05, s * 1.66, 2.62], 5);
      B.rod("steel", 0.016, [6.05, s * 1.14, 2.10], [6.05, s * 1.66, 2.10], 5);
      B.box("dark", 0.05, 0.20, 0.62, 6.05, s * 1.70, 2.36);
      B.box("glass", 0.02, 0.17, 0.58, 6.03, s * 1.70, 2.36);
    }
    B.box("dark", 0.045, 2.20, 0.05, 6.14, 0, 2.77, 0, -0.238, 0);           /* windscreen frame: top, bottom, mullion */
    B.box("dark", 0.045, 2.20, 0.05, 6.22, 0, 2.13, 0, -0.238, 0);
    B.box("dark", 0.045, 0.06, 0.70, 6.18, 0, 2.45, 0, -0.238, 0);

    /* ---- bed: floor, boards, the operations shelter -------------------- */
    B.box("paint", 4.45, 2.40, 0.10, 2.325, 0, 1.33);                        /* floor, x 0.10 .. 4.55 */
    B.box("paint", 0.10, 2.40, 0.55, 4.50, 0, 1.65);                         /* headboard */
    B.box("paint", 0.06, 2.40, 0.30, 0.13, 0, 1.53);                         /* tailgate */
    for (s = -1; s <= 1; s += 2) B.box("paint", 4.40, 0.06, 0.30, 2.33, s * 1.17, 1.53);   /* side boards */
    B.box("paint", SH_X1 - SH_X0, 2.30, SH_Z1 - DECK, (SH_X0 + SH_X1) / 2, 0, (DECK + SH_Z1) / 2);   /* shelter */
    for (s = -1; s <= 1; s += 2) {
      B.box("dark", 0.90, 0.03, 0.42, 2.00, s * 1.157, 2.55);                /* louvre panels */
      B.box("dark", 0.90, 0.03, 0.42, 3.30, s * 1.157, 2.55);
    }
    B.box("dark", 0.02, 0.03, 1.70, 0.592, -0.05, 2.30);                     /* rear door: jambs, head, handle */
    B.box("dark", 0.02, 0.03, 1.70, 0.592, 0.85, 2.30);
    B.box("dark", 0.02, 0.88, 0.03, 0.592, 0.40, 3.15);
    B.box("steel", 0.04, 0.04, 0.16, 0.585, 0.75, 2.30);
    B.box("team", 1.80, 1.50, 0.03, 2.10, 0, SH_Z1 + 0.015);                 /* team flash, flat on the shelter roof */
    B.box("dark", 0.50, 0.50, 0.10, 3.85, 0.65, SH_Z1 + 0.05);               /* roof vents */
    B.box("dark", 0.50, 0.50, 0.10, 3.85, -0.65, SH_Z1 + 0.05);

    /* ---- tail: rear beam, pintle ------------------------------------------ */
    B.box("dark", 0.16, 2.24, 0.30, 0.04, 0, 0.86);
    B.box("steel", 0.30, 0.22, 0.20, -0.14, 0, 0.92);                        /* pintle hook */
    for (s = -1; s <= 1; s += 2) B.box("glass", 0.03, 0.16, 0.10, -0.045, s * 0.95, 0.95);   /* tail lamps */

    /* ================= the drawbar and the ATG trailer ================== */
    B.cyl("steel", 0.13, 0.13, 0.07, -0.42, 0, 0.93, "z", 10);               /* lunette eye */
    for (s = -1; s <= 1; s += 2) B.rod("steel", 0.045, [-0.50, 0, 0.93], [TX0 - 0.05, s * 0.55, 1.02], 6);   /* A-frame */
    B.box("steel", 0.06, 0.73, 0.06, -1.50, 0, 0.99);                        /* cross brace */

    /* frame, tandem axles, springs, guards, jacks */
    for (s = -1; s <= 1; s += 2) {
      B.box("dark", 6.00, 0.12, 0.22, -4.97, s * 0.62, 1.00);                /* main rail */
      B.box("dark", 2.60, 0.10, 0.10, (TAX[0] + TAX[1]) / 2, s * 0.68, 0.93);   /* walking beam */
      B.box("paint", 3.20, 0.42, 0.05, -5.30, s * 1.10, 1.17);               /* mudguard */
      B.box("dark", 0.03, 0.40, 0.45, TAX[1] - 0.66, s * YTT, 0.82);         /* mud flap */
    }
    B.box("dark", 0.14, 2.30, 0.18, -2.05, 0, 1.00);                         /* front and rear cross beams */
    B.box("dark", 0.14, 2.30, 0.18, -7.90, 0, 1.00);
    B.box("dark", 0.14, 1.30, 0.14, -4.30, 0, 1.00);
    for (i = 0; i < 2; i++) {
      B.cyl("dark", 0.085, 0.085, 2.00, TAX[i], 0, TR, "y", 8);
      for (s = -1; s <= 1; s += 2) {
        B.cyl("steel", 0.30, 0.30, 0.30, TAX[i], s * YTT, TR, "y", 10);
        B.cyl("dark", 0.14, 0.14, 0.34, TAX[i], s * YTT, TR, "y", 6);
      }
    }
    for (k = 0; k < 2; k++) {
      x = k === 0 ? -2.40 : -7.35;                                           /* leveling jacks, down on pads */
      for (s = -1; s <= 1; s += 2) {
        B.box("dark", 0.20, 0.55, 0.14, x, s * 1.07, 1.00);
        B.cyl("steel", 0.06, 0.06, 0.92, x, s * 1.30, 0.52, "z", 6);
        B.box("dark", 0.36, 0.36, 0.05, x, s * 1.30, 0.025);
      }
    }

    /* the box body and what is on its sides and roof */
    B.box("dark", 5.70, 2.30, 0.08, (TX0 + TX1) / 2, 0, TZ0 + 0.04);        /* underside plate */
    B.box("paint", 5.70, 2.40, TZ1 - TZ0 - 0.08, (TX0 + TX1) / 2, 0, (TZ0 + 0.08 + TZ1) / 2);   /* the body */
    /* louvre panels as the side-on woodland photograph has them (x, z of each centre): four in the
       upper row, two in the lower; the far side was not photographed and is drawn the same */
    var LVX = [[-2.70, 2.36], [-4.04, 2.36], [-4.94, 2.36], [-6.61, 2.36], [-3.30, 1.85], [-5.86, 1.85]];
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < LVX.length; k++) B.box("dark", 0.57, 0.03, 0.40, LVX[k][0], s * 1.205, LVX[k][1]);
      B.box("glass", 0.03, 0.16, 0.10, TX1 - 0.015, s * 1.00, 1.35);         /* tail lamps */
      B.box("glass", 0.03, 0.16, 0.10, -7.985, s * 1.00, 1.00);
    }
    B.box("paint", 1.00, 2.00, 0.34, -7.15, 0, TZ1 + 0.17);                  /* raised equipment hood at the tail */
    B.box("dark", 0.03, 1.20, 0.20, -7.665, 0, TZ1 + 0.17);
    B.box("team", 1.60, 1.70, 0.03, -5.55, 0, TZ1 + 0.015);                  /* team flash, flat on the roof */

    /* the body, one mesh per material */
    var kids = [["paint", mats.paint], ["steel", mats.steel], ["dark", mats.dark], ["glass", mats.glass], ["team", mats.team]];
    var m;
    for (i = 0; i < kids.length; i++) { m = B.mesh(kids[i][0], kids[i][1]); if (m) g.add(m); }

    /* ---- the axles: five Groups named "roadwheel" ------------------------ */
    var tg = tyreGeometry(THREE), gT = axleGeometry(THREE, tg, YT), gR = axleGeometry(THREE, tg, YTT), w;
    tg.dispose();
    for (i = 0; i < 3; i++) {
      w = new THREE.Group(); w.name = "roadwheel";
      w.position.set(AXT[i], 0, TR);
      w.add(new THREE.Mesh(gT, mats.dark));
      g.add(w);
    }
    for (i = 0; i < 2; i++) {
      w = new THREE.Group(); w.name = "roadwheel";
      w.position.set(TAX[i], 0, TR);
      w.add(new THREE.Mesh(gR, mats.dark));
      g.add(w);
    }

    /* ---- the slew ring and the array: one Group named "turret" ----------- */
    var tur = new THREE.Group(); tur.name = "turret";
    tur.position.set(PIV_X, 0, ROOF);
    var A = new Baker(THREE); A.uvz = ROOF;
    A.cyl("steel", 0.62, 0.62, 0.10, 0, 0, 0.05, "z", 20);                   /* slew ring */
    A.box("paint", 1.15, 1.55, 0.22, 0, 0, 0.21);                            /* platform, z .10 .. .32 */
    A.box("paint", 0.60, 0.34, 0.16, -0.88, 0, 0.20);                        /* rear arm for the strut foot */
    for (s = -1; s <= 1; s += 2) A.box("steel", 0.22, 0.20, 0.26, 0.28, s * 0.64, 0.42);   /* hinge blocks */
    /* the array on its hinge blocks, standing upright: the side-on photograph shows no lean */
    var TILT = mx(THREE, 0.28, 0, 0.40, 0, 0, 0);
    A.push(TILT);
    A.box("paint", 0.40, AW, AH, 0, 0, AH / 2);                              /* the slab, 0.5 m deep with its frame and back */
    A.box("paint", 0.05, AW, 0.07, 0.225, 0, AH - 0.035);                    /* raised frame on the face */
    A.box("paint", 0.05, AW, 0.07, 0.225, 0, 0.035);
    for (s = -1; s <= 1; s += 2) A.box("paint", 0.05, 0.07, AH, 0.225, s * (AW / 2 - 0.035), AH / 2);
    for (k = 1; k <= 2; k++) A.box("dark", 0.01, AW - 0.14, 0.02, 0.202, 0, AH * k / 3);   /* panel seams on the face */
    A.box("dark", 0.01, 0.02, AH - 0.14, 0.202, 0, AH / 2);
    A.box("paint", 0.06, AW - 0.40, AH - 0.70, -0.23, 0, AH / 2 + 0.05);    /* housing on the back */
    for (s = -1; s <= 1; s += 2) A.box("paint", 0.05, 0.08, AH - 0.30, -0.245, s * (AW / 2 - 0.12), AH / 2);
    for (k = 1; k <= 3; k++) A.box("paint", 0.05, AW - 0.30, 0.07, -0.245, 0, AH * k / 4);
    for (s = -1; s <= 1; s += 2) {                                           /* lugs: top, mid-height, bottom */
      A.box("paint", 0.30, 0.20, 0.24, -0.02, s * (AW / 2 + 0.10), AH - 0.14);
      A.box("paint", 0.32, 0.20, 0.30, 0.00, s * (AW / 2 + 0.10), AH * 0.55);
      A.box("paint", 0.30, 0.20, 0.26, 0.00, s * (AW / 2 + 0.10), 0.22);
    }
    /* ears fore and aft of the slab as the side-on photograph has them: a big one at the top, a small
       one a third of the way down, one at the base, at both lateral corners (about 0.7 of the photographed size) */
    var EARS = [[AH - 0.36, 0.45], [AH - 0.85, 0.26], [0.49, 0.36]];
    for (s = -1; s <= 1; s += 2) for (k = 0; k < EARS.length; k++) {
      A.box("paint", 0.34, 0.30, EARS[k][1], 0.375, s * 0.70, EARS[k][0]);
      A.box("paint", 0.25, 0.30, EARS[k][1] * 0.8, -0.375, s * 0.70, EARS[k][0]);
    }
    A.box("steel", 0.14, 0.18, 0.22, -0.33, 0, AH * 0.74);                   /* strut attachment */
    var top = new THREE.Vector3(-0.36, 0, AH * 0.74).applyMatrix4(TILT);
    A.pop();
    var foot = new THREE.Vector3(-1.10, 0, 0.36);
    var mid = new THREE.Vector3().lerpVectors(foot, top, 0.30);
    A.rod("steel", 0.045, [top.x, top.y, top.z], [mid.x, mid.y, mid.z], 8);  /* tilt strut */
    A.rod("steel", 0.080, [mid.x, mid.y, mid.z], [foot.x, foot.y, foot.z], 8);   /* actuator body */
    A.box("steel", 0.28, 0.30, 0.18, foot.x - 0.02, 0, 0.30);
    var tmesh = [["paint", mats.paint], ["steel", mats.steel], ["dark", mats.dark]];
    for (i = 0; i < tmesh.length; i++) { m = A.mesh(tmesh[i][0], tmesh[i][1]); if (m) tur.add(m); }
    g.add(tur);

    return g;
  }

  return { build: build, len: 16.1 };
})();

UNIT_MODELS["nato_e80_radarv"] = { len: HeroTpq37.len, build: HeroTpq37.build };
