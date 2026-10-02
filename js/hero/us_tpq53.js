/* ===== us_tpq53.js - HERO model: AN/TPQ-53 counterfire target acquisition radar =====
   Keys: radarv_n ("TPQ-53 Radar", present day) and nato_e00_radarv ("AN/TPQ-53
   Quick Reaction Capability Radar", the 2000s-10s).  One vehicle drawn under
   both keys: Lockheed Martin's radar did not change its outline between the
   2009 delivery (then called EQ-36) and today; the April 2020 gallium-nitride
   modules are inside the array and show nothing, and the "Quick Reaction
   Capability" in the early row is the programme's name, not a second
   configuration.  The old model was a 6x6 with a generator set, cable reels
   and a 3 m square pan-tilt array; none of that is on the real radar.

   What it is (the maker's and the Army's own pictures):
     - an Oshkosh FMTV 5-ton MTV, the M1083 series 6x6, in its armoured-cab
       A1P2 form: flat bolted armour plates, two big front windows with
       armour frames, a small side window, big rear-view mirrors on arms.
       Published for the M1083A1P2 cargo truck: 7.272 m long, 2.438 m wide,
       2.83 m high; no figure is published for the armoured cab, whose roof
       is drawn at 3.04 m, read off the Lockheed picture against the 1.18 m
       tyre (7 percent over the published height).  395/85R20 tyres: 1.18 m
       over the tread (2 x 0.395 x 0.85 + 0.508), 0.395 m wide.
     - the radar is NOT in a shelter on the bed.  Behind the cab stands a
       short equipment enclosure and on top of it a turntable carrying the
       phased array: an S-band active array, a tall flat portrait panel
       with a plain radome face and a thick housing behind it, hinged along
       its lower edge and leaning back a few degrees, held up by a long
       diagonal tilt tube on one edge and a post with a whip aerial on the
       other.  Lockheed's two-vehicle press picture and the Pentagon display
       of October 2012 show it stood up like this with the face looking
       forward over the cab; the Singapore Army Open House 2022 example shows
       the same arrangement from behind.  The array turns on the turntable
       (the game's turret: "turret" below), 90 degree sector or full 360.
     - two hydraulic stabiliser legs down at the sides under the enclosure,
       each with a diagonal brace, as in the operating photographs (the
       Singapore picture shows a second pair at the tail; not drawn); a low
       equipment box on the rear deck; a pintle at the tail.  The towed
       generator trailer of the press picture is not drawn: it is a trailer,
       it is not always hitched, and on a 7.3 m truck it would shrink the
       array by a third once the engine scales the model to its length.
   Not drawn because the references do not show it: a mast, a radome
   dome, camouflage netting, a cable reel.  Paint is Chemical Agent
   Resistant Coating tan (the 2012 Pentagon display, the 2014 press picture
   and the Estonia open-day vehicle of 2025 are all tan).  Woodland green
   exists on a Korea-based vehicle of 2025; one picture is no era split, so
   both rows are tan.

   Array size: not published anywhere I could reach.  Scaled off the
   photographs against the cab and the 1.18 m tyre: about 2.1 m wide by 2.45
   m tall, standing on a post so its lower edge just clears the cab roof
   (3.04 m) and its top is at about 5.5 m.  Flagged as an estimate.

   The array can stand at ANY yaw to the hull: entities.js sets tang when a
   unit spawns (a random heading) and when it aims at a target, and a radar
   vehicle has no weapon, while the hull ang follows the path; so render3d's
   rotation.z = -(tang - ang) is arbitrary for this unit.  Everything of the
   turret that is lower than the cab roof (3.04 m) is therefore kept inside
   1.22 m of the axis, the cab's rear wall being 1.25 m away, and the rest
   sweeps over the roof.  A full-circle sweep of the turret's triangles (one
   degree steps) against the cab, the enclosure, the rear box, the exhaust
   stack and the cab whips finds no contact.

   Named nodes: "turret" is the turntable and everything above it (ring,
   platform, array, tilt tube, aerial post); its origin is the turntable
   centre at the top of the enclosure and the array face looks along +X at
   rest, so render3d's  rotation.z = -(tang - ang)  slews the array toward
   its target.  The six tyres are Groups named "roadwheel" with the axle on
   local Y, lugged so that the turn shows.  The hubs are round, so they are
   baked into the body.

   Draw calls: five body meshes (paint, steel, dark, glass, team), two for the
   turret (paint, steel) and six tyres: 13.  Five materials.  About 6,000
   triangles.  Everything that does not move is merged per material, the
   way harvester_ore_hauler.js does it.  The team material is exactly C.team,
   the flash is the cab roof (and a stripe on the rear box), the surfaces a
   camera looking down actually sees.

   Model space: +X nose, +Y left (port), +Z up, real metres, tyres on z = 0.
   Nothing sticks out along X past the front bumper or the tail pintle, so
   render3d's length scaling measures the truck.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTpq53 = (function () {
  "use strict";

  /* ------------------------------------------------------------ geometry */
  var XF = 2.40, XR1 = -0.94, XR2 = -2.26;   /* axles: 4.00 m to the bogie centre, bogie 1.32 m */
  var TR = 0.59, YT = 1.02;                  /* 395/85R20 radius; tyre centre: 2.44 m over the tyres */
  var X_BUMP = 3.62, X_PIN = -3.65;          /* bumper face, pintle tip: 7.27 m, the spec-sheet length */
  var CAB_X0 = 1.25, CAB_HW = 1.16, CAB_Z1 = 3.04;
  var DECK = 1.34;                           /* bed floor */
  var ENC_Z = 2.52;                          /* enclosure roof = turntable */
  var PIV_X = 0.00;                          /* turntable axis: the array (1.12 m to its edge post) sweeps clear of the cab wall at x = 1.25 */
  var AW = 2.10, AH = 2.45;                  /* array: width, height (estimated) */
  var UVS = 1 / 6.5;                         /* paint canvas covers 6.5 m */

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ------------------------------------------------------------ SKIN tex */
  /* CARC tan, one canvas per page.  The merged paint mesh is mapped by
     position (box projection, 6.5 m to the canvas) so the bottom band of the
     canvas, which is where the road dust lives, lands on the lowest metre of
     every side. */
  var _skinCv = null;
  function skinCanvas() {
    if (_skinCv) return _skinCv;
    var R = rng(53053), W = 512, H = 512, i, x, y, w;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    q.fillStyle = "#b19b72"; q.fillRect(0, 0, W, H);
    for (i = 0; i < 40; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(226,208,168,0.08)" : "rgba(88,70,44,0.08)";
      q.fillRect(R() * W, R() * H, 40 + R() * 150, 24 + R() * 100);
    }
    q.fillStyle = "rgba(60,48,30,0.20)";
    for (i = 0; i < 36; i++) q.fillRect(R() * W, R() * H * 0.9, 6 + R() * 40, 1 + R() * 2);
    for (i = 0; i < 26; i++) {
      x = R() * W; y = R() * H * 0.7; w = 1 + R() * 3;
      q.fillStyle = "rgba(82,64,40," + (0.06 + R() * 0.10).toFixed(3) + ")";
      q.fillRect(x, y, w, 20 + R() * 90);
    }
    q.fillStyle = "rgba(50,40,26,0.30)";
    for (i = 0; i < 70; i++) q.fillRect(R() * (W - 3), R() * (H - 3), 2, 2);
    var gr = q.createLinearGradient(0, H * 0.80, 0, H);
    gr.addColorStop(0, "rgba(142,118,82,0.00)");
    gr.addColorStop(1, "rgba(142,118,82,0.55)");
    q.fillStyle = gr; q.fillRect(0, H * 0.80, W, H * 0.20);
    for (i = 0; i < 50; i++) {
      q.fillStyle = "rgba(120,98,68," + (0.10 + R() * 0.18).toFixed(3) + ")";
      q.fillRect(R() * W, H * 0.82 + R() * H * 0.18, 5 + R() * 26, 2 + R() * 8);
    }
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
    if (st) T.paint.map = st; else T.paint.color.setHex(0xa8946c);
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
     the separate meshes would.  UVs are box-projected from the position. */
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
      else { u = p[i]; v = p[i + 1]; }
      b.u.push(u * UVS, v * UVS);
    }
    g.dispose();
    return this;
  };
  Baker.prototype.box = function (key, sx, sy, sz, x, y, z, rx, ry, rz) {
    return this.put(key, new this.T.BoxGeometry(sx, sy, sz), mx(this.T, x, y, z, rx, ry, rz));
  };
  /* axis "y" is the cylinder's own; "x" and "z" turn it.  Top is -X for "x". */
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
  /* 395/85R20 military cross-country tread: a lathe for the carcass (axis
     = local Y, which is what render3d spins) and one transverse lug per
     step round the tread.  One geometry, shared by all six wheels. */
  function tyreGeometry(T) {
    var B = new Baker(T), i, a, N = 18;
    var prof = [[0.30, -0.20], [0.38, -0.213], [0.49, -0.205], [0.55, -0.185], [0.575, -0.15],
                [0.575, 0.15], [0.55, 0.185], [0.49, 0.205], [0.38, 0.213], [0.30, 0.20]];
    B.put("t", new T.LatheGeometry(prof.map(function (p) { return new T.Vector2(p[0], p[1]); }), 22));
    for (i = 0; i < N; i++) {
      a = i * Math.PI * 2 / N;
      B.box("t", 0.032, 0.31, 0.075, Math.cos(a) * 0.574, 0, Math.sin(a) * 0.574, 0, -a, 0);
    }
    return B.mesh("t", new T.MeshBasicMaterial()).geometry;
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var mats = makeMats(THREE, C);
    var B = new Baker(THREE);
    var i, s, x, y;

    /* ---- chassis: frame rails, axles, springs, tanks ------------------- */
    for (s = -1; s <= 1; s += 2) {
      B.box("dark", 6.9, 0.14, 0.26, -0.12, s * 0.50, 0.90);                 /* frame rail */
      B.box("dark", 1.0, 0.10, 0.09, XF, s * 0.62, 0.80);                    /* front spring */
      B.box("dark", 2.35, 0.10, 0.10, (XR1 + XR2) / 2, s * 0.62, 0.78);      /* bogie spring and walking beam */
    }
    var AX = [XF, XR1, XR2];
    for (i = 0; i < 3; i++) {
      B.cyl("dark", 0.09, 0.09, 1.9, AX[i], 0, TR, "y", 8);                  /* axle */
      B.cyl("dark", 0.20, 0.20, 0.34, AX[i], 0, TR, "x", 10);                /* differential */
      for (s = -1; s <= 1; s += 2) {
        B.cyl("paint", 0.31, 0.31, 0.44, AX[i], s * YT, TR, "y", 14);        /* rim, painted */
        B.cyl("steel", 0.15, 0.15, 0.50, AX[i], s * YT, TR, "y", 8);         /* hub */
      }
    }
    B.box("dark", 0.5, 1.0, 0.22, 0.4, 0, 0.90);                             /* transfer case and cross-member */
    B.box("dark", 0.5, 0.9, 0.2, -3.0, 0, 0.92);
    B.box("dark", 1.9, 1.70, 0.28, 2.35, 0, 1.08);                           /* engine bay under the cab */
    B.box("paint", 0.95, 0.46, 0.46, 1.05, 0.90, 0.80);                      /* fuel tank, port */
    B.box("paint", 0.75, 0.40, 0.40, 1.05, -0.90, 0.80);                     /* battery box, starboard */
    for (s = -1; s <= 1; s += 2) {
      B.box("dark", 0.02, 0.50, 0.50, XR2 - 0.66, s * 1.02, 0.36);           /* mud flap behind the bogie */
      B.box("paint", 1.0, 0.50, 0.05, XF, s * 1.03, 1.22);                   /* front fender plate */
      B.box("paint", 2.1, 0.30, 0.05, (XR1 + XR2) / 2, s * 1.10, 1.24);      /* bogie fender plate */
    }

    /* ---- cab: the FMTV armoured cab, one extruded profile -------------- */
    B.prism("paint", [[CAB_X0, 1.22], [3.38, 1.22], [3.45, 1.60], [3.44, 1.85], [3.31, 2.84],
                      [3.35, CAB_Z1], [CAB_X0, CAB_Z1]], -CAB_HW, CAB_HW);
    B.box("paint", 0.24, 2.24, 0.38, 3.51, 0, 0.80);                         /* bumper */
    B.box("dark", 0.03, 1.10, 0.34, 3.465, 0, 1.43);                         /* radiator grille */
    for (s = -1; s <= 1; s += 2) {
      B.box("glass", 0.06, 0.24, 0.15, X_BUMP - 0.01, s * 0.86, 0.80);       /* headlamps */
      B.box("glass", 0.06, 0.12, 0.10, X_BUMP - 0.01, s * 1.04, 0.62);       /* marker lamps */
      B.box("glass", 0.03, 0.80, 0.70, 3.389, s * 0.44, 2.33, 0, -0.1306, 0);   /* windscreen panes, raked */
      B.box("dark", 0.045, 0.88, 0.05, 3.385, s * 0.44, 2.71, 0, -0.1306, 0);   /* armour frame, top */
      B.box("dark", 0.045, 0.88, 0.05, 3.40, s * 0.44, 1.95, 0, -0.1306, 0);    /* armour frame, bottom */
      B.box("dark", 0.045, 0.05, 0.76, 3.395, s * 0.02, 2.33, 0, -0.1306, 0);   /* armour frame, between and outside the panes */
      B.box("dark", 0.045, 0.05, 0.76, 3.375, s * 0.88, 2.33, 0, -0.1306, 0);
      B.box("glass", 0.60, 0.03, 0.65, 2.85, s * 1.172, 2.33);               /* door window */
      B.box("dark", 0.025, 0.02, 1.62, 2.05, s * 1.168, 2.14);               /* door seams */
      B.box("dark", 0.025, 0.02, 1.62, 3.30, s * 1.168, 2.14);
      B.box("dark", 1.25, 0.02, 0.025, 2.68, s * 1.168, 1.33);
      B.box("steel", 0.14, 0.03, 0.04, 2.20, s * 1.175, 1.95);               /* door handle */
      B.box("dark", 0.30, 0.26, 0.04, 2.75, s * 1.10, 1.00);                 /* cab step */
      /* mirror: two arms, a dark frame and a glass plate, standing 0.55 m off the cab */
      B.rod("steel", 0.018, [3.10, s * 1.14, 2.62], [3.10, s * 1.70, 2.62], 5);
      B.rod("steel", 0.018, [3.10, s * 1.14, 2.12], [3.10, s * 1.70, 2.12], 5);
      B.box("dark", 0.05, 0.22, 0.58, 3.10, s * 1.72, 2.37);
      B.box("glass", 0.02, 0.19, 0.54, 3.07, s * 1.72, 2.37);
    }
    B.box("dark", 0.14, 1.0, 0.08, 3.28, 0, CAB_Z1 + 0.04);                  /* roof light bar */
    B.box("team", 1.00, 1.50, 0.03, 2.25, 0, CAB_Z1 + 0.015);                /* the team flash, flat on the roof */
    B.cyl("steel", 0.05, 0.05, 0.10, 2.95, 0.98, CAB_Z1 + 0.05, "z", 6);     /* aerial bases and whips */
    B.cyl("steel", 0.05, 0.05, 0.10, 1.45, -0.98, CAB_Z1 + 0.05, "z", 6);
    B.rod("steel", 0.012, [2.95, 0.98, CAB_Z1 + 0.10], [2.95, 0.98, CAB_Z1 + 2.70], 5);
    B.rod("steel", 0.012, [1.45, -0.98, CAB_Z1 + 0.10], [1.45, -0.98, CAB_Z1 + 2.20], 5);

    /* ---- bed: deck, enclosure under the array, rear box, tail ---------- */
    B.box("paint", 4.72, 2.32, 0.12, -1.14, 0, 1.28);                        /* deck plate */
    B.box("paint", 1.50, 2.24, ENC_Z - DECK, PIV_X, 0, (ENC_Z + DECK) / 2);  /* equipment enclosure */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 6; i++) B.box("dark", 0.90, 0.03, 0.045, PIV_X, s * 1.125, 1.72 + i * 0.12);   /* louvres */
      B.box("paint", 0.55, 0.03, 0.62, PIV_X - 0.35, s * 1.13, 1.78);       /* access door */
      B.box("steel", 0.04, 0.04, 0.16, PIV_X - 0.10, s * 1.15, 1.78);
    }
    B.box("paint", 1.50, 2.20, 0.72, -1.55, 0, DECK + 0.36);                 /* rear equipment box */
    B.box("team", 1.00, 1.80, 0.03, -1.55, 0, DECK + 0.735);                 /* team stripe on its roof */
    B.cyl("steel", 0.075, 0.075, 1.65, 1.05, -1.02, 2.12, "z", 8);           /* exhaust stack behind the cab */
    B.cyl("dark", 0.095, 0.095, 0.06, 1.05, -1.02, 2.97, "z", 8);
    B.box("dark", 0.16, 2.20, 0.30, -3.46, 0, 0.82);                         /* rear beam */
    B.box("steel", 0.30, 0.34, 0.22, -3.52, 0, 0.92);                        /* pintle */
    B.box("steel", 0.16, 0.10, 0.14, X_PIN + 0.08, 0, 0.92);
    for (s = -1; s <= 1; s += 2) B.box("glass", 0.03, 0.16, 0.10, -3.545, s * 0.95, 0.88);   /* tail lamps */

    /* ---- stabiliser legs, down: beam, post, foot, diagonal brace -------- */
    for (s = -1; s <= 1; s += 2) {
      B.box("dark", 0.22, 0.88, 0.14, 0.15, s * 0.99, 0.95);
      B.cyl("steel", 0.075, 0.075, 0.90, 0.15, s * 1.40, 0.51, "z", 8);
      B.box("steel", 0.46, 0.46, 0.05, 0.15, s * 1.40, 0.025);
      B.rod("steel", 0.03, [0.15, s * 1.40, 0.28], [-0.50, s * 0.62, 0.90], 5);
    }

    /* the body, one mesh per material */
    var kids = [["paint", mats.paint], ["steel", mats.steel], ["dark", mats.dark], ["glass", mats.glass], ["team", mats.team]];
    var m;
    for (i = 0; i < kids.length; i++) { m = B.mesh(kids[i][0], kids[i][1]); if (m) g.add(m); }

    /* ---- the tyres: six Groups named "roadwheel" ------------------------ */
    var tg = tyreGeometry(THREE), w;
    for (i = 0; i < 3; i++) {
      for (s = -1; s <= 1; s += 2) {
        w = new THREE.Group(); w.name = "roadwheel";
        w.position.set(AX[i], s * YT, TR);
        w.add(new THREE.Mesh(tg, mats.dark));
        g.add(w);
      }
    }

    /* ---- the turntable and the array: one Group named "turret" ---------- */
    var tur = new THREE.Group(); tur.name = "turret";
    tur.position.set(PIV_X, 0, ENC_Z);
    var A = new Baker(THREE); A.uvz = ENC_Z;
    A.cyl("steel", 0.68, 0.68, 0.12, 0, 0, 0.06, "z", 20);                   /* slew ring */
    A.box("paint", 1.10, 1.50, 0.18, 0, 0, 0.21);                            /* platform */
    for (s = -1; s <= 1; s += 2) A.box("paint", 0.30, 0.20, 0.26, 0, s * 0.66, 0.43);   /* hinge brackets */
    /* the array, hinged on its lower edge and leaning back 8 degrees */
    var TILT = mx(THREE, -0.02, 0, 0.56, 0, -0.14, 0);
    A.push(TILT);
    A.box("paint", 0.08, AW, AH, 0.14, 0, AH / 2);                           /* radome face */
    A.box("paint", 0.12, AW + 0.08, 0.07, 0.13, 0, AH + 0.035);              /* frame: top, bottom, sides */
    A.box("paint", 0.12, AW + 0.08, 0.07, 0.13, 0, -0.035);
    for (s = -1; s <= 1; s += 2) A.box("paint", 0.12, 0.07, AH, 0.13, s * (AW / 2 + 0.035), AH / 2);
    A.box("paint", 0.28, AW - 0.14, AH - 0.20, -0.04, 0, AH / 2);            /* housing behind the face */
    for (i = 0; i < 3; i++) A.box("paint", 0.04, AW - 0.30, 0.06, -0.20, 0, 0.55 + i * 0.72);   /* back ribs */
    for (s = -1; s <= 1; s += 2) A.box("paint", 0.04, 0.06, AH - 0.40, -0.20, s * 0.55, AH / 2);
    for (s = -1; s <= 1; s += 2) A.box("paint", 0.18, 0.24, 0.22, -0.04, s * 0.68, 0.10);        /* hinge lugs */
    A.box("paint", 0.16, 0.50, 0.34, -0.28, -0.40, 0.62);                    /* connector panel */
    /* aerial post along the left edge, with its whip */
    A.box("steel", 0.09, 0.09, AH - 0.02, -0.10, -(AW / 2 + 0.14), AH / 2 + 0.03);   /* its foot is above the cab roof at every yaw */
    A.rod("steel", 0.011, [-0.10, -(AW / 2 + 0.14), AH + 0.05], [-0.10, -(AW / 2 + 0.14), AH + 0.70], 5);
    /* the tilt tube on the left edge: array back to a foot on the platform's rear arm.  The foot sits
       1.12 m from the axis (not 1.6), so the swept tube never meets the cab. */
    var top = new THREE.Vector3(-0.22, AW / 2 + 0.14, AH * 0.80).applyMatrix4(TILT);
    A.pop();
    var foot = new THREE.Vector3(-0.60, 0.95, 0.30);
    var mid = new THREE.Vector3().lerpVectors(foot, top, 0.30);
    A.rod("steel", 0.050, [top.x, top.y, top.z], [foot.x, foot.y, foot.z], 8);
    A.rod("steel", 0.075, [foot.x, foot.y, foot.z], [mid.x, mid.y, mid.z], 8);   /* actuator body */
    A.box("steel", 0.12, 0.26, 0.12, -0.60, 0.87, 0.28);                     /* arm out from the platform */
    var tmesh = [["paint", mats.paint], ["steel", mats.steel]];
    for (i = 0; i < tmesh.length; i++) { m = A.mesh(tmesh[i][0], tmesh[i][1]); if (m) tur.add(m); }
    g.add(tur);

    return g;
  }

  return { build: build, len: 7.3 };
})();

UNIT_MODELS["radarv_n"] = { len: HeroTpq53.len, build: HeroTpq53.build };
UNIT_MODELS["nato_e00_radarv"] = { len: HeroTpq53.len, build: HeroTpq53.build };
