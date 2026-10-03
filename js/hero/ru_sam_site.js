/* ===== ru_sam_site.js - HERO models: the Soviet / Russian SAM site (BUILDINGS id "sam", side "pact") =====
   One build, one option per system. Registers BLD_MODELS["sam_pact_<era>"] for FIVE periods; e60 .. is the system the
   unit rows of that period field (rules.js pact_e50_s75, pact_e60_s125, pact_e80/e90/e00_sam, sam_p):
     sam_pact_e50  S-75 Dvina (SA-2 Guideline, 1957): SNR-75 Fan Song in the middle, SM-63 launchers in earth revetments
     sam_pact_e60  S-125 Neva (SA-3 Goa, 1961):       SNR-125 Low Blow post and its cabin, 5P73 four-rail launchers on
                                                       their round bases, in earth revetments
     sam_pact_e80  S-300PS (SA-10 Grumble, 1982):     mast radar and three 5P85S TELs, canister blocks erected
     sam_pact_e90  S-300PM / PMU-1 (1993):            same picture (same 5P85SE truck in the unit hero)
     sam_pact_e00  S-300PMU-2 Favorit (2001):         same picture, the e00 olive of the unit hero
     sam_pact_e20  S-400 Triumf (in service 2007):    92N6E radar and three 5P85TE2 semi-trailer TELs
   NO KEY (shared model shows): e50 S-25 Berkut (Moscow rings 1955) - no photograph of its B-200 / V-300 launchers
   was found and they are not in the unit rows; S-200 (1967+) - the same, no photograph, no unit row; the S-75 and
   S-125 sites of the other periods (the unit rows name one system per period, so one picture per period); e00 S-400
   (service from 2007, the e00 unit row is the S-300PMU-2).  Option "s75" (BLD_MODELS builder arg) keeps the S-75 site
   available, but only e50 registers it.
   REALISM NOTE: S-75 and S-125 sites were truly FIXED (revetted, prepared) sites; the S-300 and S-400 are MOBILE
   systems that stand in prepared positions. POSITIONS (check-and-fix pass): S-400 e20 is drawn as the Commons photograph
   "S-400 Triumf SAM of the 31st Air Defense Division, Yevpatoria, Crimea" shows it: each launcher stands in its own
   U-shaped earth bank (sides and nose, open to the rear), the radar on a raised earth mound with a ramp. The photograph
   gives no dimensions: bank 1.4 m high, mound 2.2 m high are the model's estimates (the radar and launchers are at their
   true size). S-300PS e80/e90/e00: the only position photograph found ("414th Guards Anti-Aircraft Rocket Regiment's
   S-300PS in Tiksi", 2020) shows the vehicles in line on open ground with no berms, so NONE are drawn; the e80/e90 tubes
   are the pale grey-blue of that photograph (S-300PS; the e90 PM and the e00 PMU-2 colour is NOT confirmed - e00 keeps the
   unit hero's green). S-75 / S-125 revetments are smooth earth banks (horseshoe, open to the guidance station), as the
   Vietnam aerial (round earth-banked pits round the centre) and the Egyptian pit photograph (smooth earth bank with a
   sandbag edge) show; a swept trapezoid section, 1.2 - 1.3 m high (height estimated).
   WHAT EACH ELEMENT RESTS ON (Wikimedia Commons, cached in the scratchpad ru_sam_site_ref):
     "North vietnamese S-75 SAM site" (aerial): six revetted launcher positions round a centre, access roads; drawn as a
         ring (four of six) of 3-sided earth banks open toward the guidance station.
     "SNR-75M3 Fan Song E": two-axle trailer, boxy cabin, lattice platform on it carrying two round dishes and, at the
         other end, a pair of tall narrow flat boards; and the units in ru_s75_s125.js (SM-63 frame 5.8 x 4.6 m, rail at
         22 deg, V-750 10.8 m: same dimensions).
     "Egyptian S-75 Dvina SAM Site Overrun by Israeli Forces" (SM-63 with V-750 on sand, sandbag-lined pit): the missile
         and its paint; the pit's sandbag edge supports the plain bank.
     "Antenna post RPN and Missiles sighting station SNR-125": the lattice pedestal on a wheeled trailer, platform with
         rails, two long rectangular antenna boxes and a dish above, a second trailer with an upright flat antenna board.
     5P73 and V-600: dimensions of ru_s75_s125.js (base plate r 1.85, rails 4 at 0.9 m, 25 deg).
     "76N6 acquisition radar and 30N6 fire control radar" (Szolnok-type museum shot): the 30N6 (right) has its antenna
         on a slender mast about 13 m up raised from a vehicle, braced by a lattice strut. The e80 5N63S set is drawn
         from the same photograph (NOT confirmed to look the same). 76N6 / 64N6 / command post not drawn (no photograph
         of the site layout; they are not in the unit rows).
     ru_s300.js: the 8x8 11.47 x 3.2 m truck, tyres 1.5 m, canister block 2 x 2 tubes 1.0 x 7.2 m erected at the rear.
     "92N6E radar at Almaz-Antey factory", "S-400 Triumf with 96L6" and ru_s400.js: 92N6E on an 8x8 with cab-over cab and
         a tall flat antenna panel up behind it; the 5P85TE2 tractor and semi-trailer 15.3 m long with the block erected.
   NOT CONFIRMED and not drawn: the number of launchers (a real S-75 or S-300 site has six or more; here three or four),
     the true spacing (compressed to a 30 m plot: equipment is at full size, the distances between pieces are not), cable
     runs, roads, the PR-11 / PR-14 loaders, generators, command-post vans, the early-warning radars, any marking.
   Paint: Soviet green as the unit heroes (S-75: 0x4d5636; S-300: 0x47523a, e00 0x4b5538; S-400: 0x4a5a3a), missiles
     white / grey as the photographs show. Owner colour: ONE small flat panel (2 cm) per site, on the Fan Song / SNR-125 cabin roof or the radar cabin roof.
   Exactly one group "turret": the launcher on the +X ring position (S-75 / S-125) or the erected block of the TEL on the
     +X position (S-300 / S-400: they launch vertically, so it only turns in place). Everything else baked.
   Materials: earth, paint, steel, rubber, glass, tube (S-300PS only), white, grey, team. Z up, metres, ground z = 0. ASCII. */
if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroSamSiteRu = (function () {
  "use strict";
  var TAU = Math.PI * 2, D2R = Math.PI / 180;

  function Col(THREE) { this.T = THREE; this.bins = {}; this.st = [new THREE.Matrix4()]; }
  Col.prototype.push = function (m) { this.st.push(this.st[this.st.length - 1].clone().multiply(m)); };
  Col.prototype.pop = function () { this.st.pop(); };
  Col.prototype.add = function (key, g) {
    var b = this.bins[key] || (this.bins[key] = { P: [], N: [] });
    g.applyMatrix4(this.st[this.st.length - 1]);
    if (g.index) g = g.toNonIndexed();
    var p = g.attributes.position.array, n = g.attributes.normal.array, i;
    for (i = 0; i < p.length; i++) { b.P.push(p[i]); b.N.push(n[i]); }
    g.dispose();
  };
  Col.prototype.addRaw = function (key, g) {
    var b = this.bins[key] || (this.bins[key] = { P: [], N: [] }), m = this.st[this.st.length - 1], p = g.attributes.position.array, n = g.attributes.normal.array, i;
    g.applyMatrix4(m);
    p = g.attributes.position.array; n = g.attributes.normal.array;
    for (i = 0; i < p.length; i++) { b.P.push(p[i]); b.N.push(n[i]); }
    g.dispose();
  };
  Col.prototype.flush = function (group, mats) {
    var k, b, geo, T = this.T;
    for (k in this.bins) {
      b = this.bins[k];
      if (!b.P.length) continue;
      geo = new T.BufferGeometry();
      geo.setAttribute("position", new T.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new T.BufferAttribute(new Float32Array(b.N), 3));
      group.add(new T.Mesh(geo, mats[k]));
    }
  };
  Col.prototype.tris = function () { var n = 0, k; for (k in this.bins) n += this.bins[k].P.length / 9; return n; };

  function G(THREE) {
    var T = THREE, h = {};
    h.T = function (x, y, z) { return new T.Matrix4().makeTranslation(x, y, z); };
    h.Ry = function (a) { return new T.Matrix4().makeRotationY(a); };
    h.Rz = function (a) { return new T.Matrix4().makeRotationZ(a); };
    h.at = function (x, y, z, yaw) { return h.T(x, y, z || 0).multiply(h.Rz(yaw || 0)); };
    h.box = function (x0, x1, y0, y1, z0, z1) {
      var g = new T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
      g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
      return g;
    };
    h.cylX = function (x0, x1, r0, r1, seg, y, z) {
      var g = new T.CylinderGeometry(r1, r0, x1 - x0, seg, 1, false);
      g.rotateZ(-Math.PI / 2); g.translate((x0 + x1) / 2, y || 0, z || 0); return g;
    };
    h.cylZ = function (z0, z1, r0, r1, seg, x, y) {
      var g = new T.CylinderGeometry(r1, r0, z1 - z0, seg, 1, false);
      g.rotateX(Math.PI / 2); g.translate(x || 0, y || 0, (z0 + z1) / 2); return g;
    };
    h.cylY = function (y0, y1, r, seg, x, z) {
      var g = new T.CylinderGeometry(r, r, y1 - y0, seg, 1, false);
      g.translate(x || 0, (y0 + y1) / 2, z || 0); return g;
    };
    h.between = function (a, b, r, seg) {
      var d = new T.Vector3().subVectors(b, a), L = d.length();
      var g = new T.CylinderGeometry(r, r, L, seg || 6, 1, false);
      var q = new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), d.clone().normalize());
      g.applyMatrix4(new T.Matrix4().makeRotationFromQuaternion(q));
      g.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2); return g;
    };
    h.lathe = function (pts, seg) {
      var v = [], i;
      for (i = 0; i < pts.length; i++) v.push(new T.Vector2(Math.max(pts[i][1], 0.0001), pts[i][0]));
      var g = new T.LatheGeometry(v, seg); g.rotateZ(-Math.PI / 2); return g;
    };
    h.fin = function (poly, t, roll) {
      var s = new T.Shape(), i;
      s.moveTo(poly[0][0], poly[0][1]);
      for (i = 1; i < poly.length; i++) s.lineTo(poly[i][0], poly[i][1]);
      var g = new T.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, steps: 1 });
      g.translate(0, 0, -t / 2); g.rotateX(roll); return g;
    };
    /* a box turned about Z, centred at (cx, cy), base on z0 */
    h.boxR = function (len, wid, hh, cx, cy, z0, rot) {
      var g = new T.BoxGeometry(len, wid, hh);
      g.rotateZ(rot); g.translate(cx, cy, z0 + hh / 2); return g;
    };
    return h;
  }

  function materials(THREE, C, paint) {
    function std(col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); }
    return {
      earth: std(0x7a6a4c, 0.97, 0.0), paint: std(paint, 0.88, 0.05), steel: std(0x30353a, 0.66, 0.36),
      rubber: std(0x1b1c1d, 0.92, 0.02), glass: std(0x26323a, 0.25, 0.5),
      tube: std(0x8d9ba3, 0.85, 0.08), white: std(0xd6d4c8, 0.8, 0.08), grey: std(0xa4a69b, 0.78, 0.12),
      team: new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x4b8fe0, roughness: 0.84, metalness: 0.06 })
    };
  }

  /* ------------------------------------------------------------ missiles */
  function v750(c, h, x0) {                 /* S-75 V-750, 10.8 m, booster 0.68 m, sustainer 0.5 m (ru_s75_s125.js) */
    var i, a, seg = 14;
    c.push(h.T(x0, 0, 0));
    c.add("steel", h.lathe([[0, 0.20], [0.10, 0.27], [0.32, 0.24], [0.60, 0.34]], seg));
    c.add("white", h.lathe([[0.60, 0.33], [3.20, 0.33], [3.65, 0.25]], seg));
    c.add("grey", h.lathe([[3.55, 0.25], [9.55, 0.254]], seg));
    c.add("steel", h.lathe([[9.55, 0.254], [9.80, 0.235], [10.2, 0.16], [10.55, 0.07], [10.80, 0.012]], seg));
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2;
      c.add("grey", h.fin([[0.0, 0.30], [1.9, 0.30], [0.9, 1.20], [0.0, 1.20]], 0.045, a));
      c.add("grey", h.fin([[5.0, 0.24], [7.0, 0.24], [6.5, 1.05], [5.7, 1.05]], 0.04, a));
      c.add("white", h.fin([[3.55, 0.24], [4.35, 0.24], [4.1, 0.62], [3.8, 0.62]], 0.035, i * Math.PI / 2));
    }
    c.pop();
  }
  function v600(c, h, x0) {                 /* S-125 V-600, 5.9 m, 0.52 m / 0.38 m */
    var i, a, seg = 10;
    c.push(h.T(x0, 0, 0));
    c.add("steel", h.lathe([[0, 0.13], [0.07, 0.18], [0.20, 0.17]], seg));
    c.add("white", h.lathe([[0.20, 0.26], [1.8, 0.26], [2.10, 0.19]], seg));
    c.add("grey", h.lathe([[2.0, 0.19], [5.2, 0.192]], seg));
    c.add("steel", h.lathe([[5.2, 0.192], [5.4, 0.18], [5.65, 0.11], [5.9, 0.008]], seg));
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2;
      c.add("grey", h.fin([[0.0, 0.24], [1.3, 0.24], [0.6, 0.86], [0.0, 0.86]], 0.035, a));
      c.add("grey", h.fin([[3.5, 0.18], [4.5, 0.18], [4.2, 0.68], [3.8, 0.68]], 0.03, a));
    }
    c.pop();
  }

  /* ------------------------------------------------------------ earth banks */
  /* A smooth earth bank swept along a polyline path (x, y, k): trapezoid section, base half-width b, top half-width t,
     height H, scaled by k at each point (k < 1 tapers the ends into the ground). Closed with end caps. */
  function bank(c, h, path, b, t, H) {
    var T = h.T, n = path.length, i, j, P = [], N = [], rows = [], V = c.T.Vector3, dx, dy, l, nx, ny, d1, d2, m, k, pr, q, e;
    var prof = [[-b, 0], [-t, 1], [t, 1], [b, 0]];
    for (i = 0; i < n; i++) {
      d1 = path[Math.max(i - 1, 0)]; d2 = path[Math.min(i + 1, n - 1)];
      dx = d2[0] - d1[0]; dy = d2[1] - d1[1]; l = Math.sqrt(dx * dx + dy * dy) || 1; nx = -dy / l; ny = dx / l;
      k = path[i][2] === undefined ? 1 : path[i][2];
      var row = [];
      for (j = 0; j < 4; j++) row.push([path[i][0] + nx * prof[j][0] * k, path[i][1] + ny * prof[j][0] * k, prof[j][1] * H * k]);
      rows.push(row);
    }
    function tri(a, bb, cc) {
      var u = new V(bb[0] - a[0], bb[1] - a[1], bb[2] - a[2]), v = new V(cc[0] - a[0], cc[1] - a[1], cc[2] - a[2]), nn = u.cross(v).normalize(), z;
      for (z = 0; z < 3; z++) { var q2 = [a, bb, cc][z]; P.push(q2[0], q2[1], q2[2]); N.push(nn.x, nn.y, nn.z); }
    }
    for (i = 0; i < n - 1; i++) for (j = 0; j < 3; j++) {
      pr = rows[i]; q = rows[i + 1];
      tri(pr[j], q[j], q[j + 1]); tri(pr[j], q[j + 1], pr[j + 1]);
    }
    for (e = 0; e < 2; e++) {                      /* end caps (flat, tiny after the taper) */
      m = e ? rows[n - 1] : rows[0];
      if (e) { tri(m[0], m[1], m[2]); tri(m[0], m[2], m[3]); } else { tri(m[0], m[2], m[1]); tri(m[0], m[3], m[2]); }
    }
    var g = new c.T.BufferGeometry();
    g.setAttribute("position", new c.T.BufferAttribute(new Float32Array(P), 3));
    g.setAttribute("normal", new c.T.BufferAttribute(new Float32Array(N), 3));
    c.addRaw("earth", g);
  }
  /* S-75 / S-125 revetment: a horseshoe bank round (cx, cy), centreline radius R, open toward angle `open` (half gap `gap`) */
  function revetment(c, h, cx, cy, R, open, gap, b, t, H) {
    var n = 28, i, a, span = TAU - 2 * gap, a0 = open + gap, path = [], k;
    for (i = 0; i <= n; i++) {
      a = a0 + i * span / n; k = Math.min(1, 0.2 + Math.min(i, n - i) * 0.4);
      path.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R, k]);
    }
    bank(c, h, path, b, t, H);
  }
  /* S-400 position: a U-shaped bank (sides and nose, open at the rear -X) round a vehicle, x0 .. x1, y0 .. y1 */
  function ubank(c, h, x0, x1, y0, y1, b, t, H) {
    bank(c, h, [[x0, y0, 0.25], [x0 + 0.8, y0, 1], [x1 - 0.8, y0, 1], [x1, y0 + 0.8, 1], [x1, y1 - 0.8, 1], [x1 - 0.8, y1, 1], [x0 + 0.8, y1, 1], [x0, y1, 0.25]], b, t, H);
  }
  /* a flat-topped earth mound with a ramp, x0 .. x1, y0 .. y1, top height H, slope run s */
  function mound(c, h, x0, x1, y0, y1, H, s) {
    var P = [], N = [], V = c.T.Vector3;
    function quad(a, b, cc, d) { tri(a, b, cc); tri(a, cc, d); }
    function tri(a, b, cc) {
      var u = new V(b[0] - a[0], b[1] - a[1], b[2] - a[2]), v = new V(cc[0] - a[0], cc[1] - a[1], cc[2] - a[2]), n = u.cross(v).normalize(), z, q;
      for (z = 0; z < 3; z++) { q = [a, b, cc][z]; P.push(q[0], q[1], q[2]); N.push(n.x, n.y, n.z); }
    }
    var A = [x0 - s, y0 - s, 0], B = [x1 + s, y0 - s, 0], C2 = [x1 + s, y1 + s, 0], D = [x0 - s, y1 + s, 0];
    var a = [x0, y0, H], b = [x1, y0, H], cc = [x1, y1, H], d = [x0, y1, H];
    quad(a, b, cc, d); quad(A, B, b, a); quad(B, C2, cc, b); quad(C2, D, d, cc); quad(D, A, a, d);
    var g = new c.T.BufferGeometry();
    g.setAttribute("position", new c.T.BufferAttribute(new Float32Array(P), 3));
    g.setAttribute("normal", new c.T.BufferAttribute(new Float32Array(N), 3));
    c.addRaw("earth", g);
  }

  /* ------------------------------------------------------------ S-75 pieces */
  function sm63Frame(c, h) {                /* cruciform ground frame, pedestal ring (z 0 .. 0.62) */
    var i, e = [[2.7, 0], [-2.7, 0], [0, 2.1], [0, -2.1]];
    c.add("paint", h.box(-2.9, 2.9, -0.21, 0.21, 0.16, 0.50));
    c.add("paint", h.box(-0.21, 0.21, -2.3, 2.3, 0.16, 0.50));
    for (i = 0; i < 4; i++) {
      c.add("steel", h.box(e[i][0] - 0.42, e[i][0] + 0.42, e[i][1] - 0.42, e[i][1] + 0.42, 0, 0.14));
      c.add("steel", h.cylZ(0.14, 0.62, 0.09, 0.09, 6, e[i][0], e[i][1]));
    }
    c.add("steel", h.cylZ(0.5, 0.62, 1.15, 1.15, 16, 0, 0));
    c.add("paint", h.cylZ(0.16, 0.5, 1.05, 1.05, 16, 0, 0));
  }
  function sm63Swing(c, h, THREE, loaded) { /* about the ring centre at z 0.62; rail at 22 deg */
    var j, y, HZ = 1.95, V = THREE.Vector3;
    c.add("steel", h.cylZ(0, 0.14, 1.25, 1.25, 16, 0, 0));
    c.add("paint", h.box(-1.9, 1.0, -1.0, 1.0, 0.14, 0.42));
    c.add("paint", h.box(-1.85, -0.35, -0.85, 0.85, 0.42, 0.80));
    for (j = -1; j <= 1; j += 2) {
      y = j * 0.72;
      c.add("paint", h.between(new V(-0.85, y, 0.42), new V(0, y, HZ), 0.10, 6));
      c.add("paint", h.between(new V(0.85, y, 0.42), new V(0, y, HZ), 0.10, 6));
    }
    c.add("steel", h.cylY(-0.98, 0.98, 0.09, 8, 0, HZ));
    c.push(h.T(0, 0, HZ).multiply(h.Ry(-22 * D2R)));
    c.add("paint", h.box(-3.5, 3.9, -0.17, 0.17, -0.17, 0.17));
    c.add("steel", h.box(-0.35, 0.35, -0.7, 0.7, -0.22, -0.17));
    [-3.1, -1.7, 1.7, 3.3].forEach(function (x) { c.add("steel", h.box(x - 0.25, x + 0.25, -0.2, 0.2, 0.17, 0.4)); });
    if (loaded) { c.push(h.T(0, 0, 0.55)); v750(c, h, -3.8); c.pop(); }
    c.pop();
  }
  /* SNR-75 Fan Song: two-axle trailer, cabin, lattice platform, two dishes one end, two flat boards the other */
  function fanSong(c, h, THREE) {
    var V = THREE.Vector3, i, s;
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) c.add("rubber", h.cylY(s * 1.2 - 0.18, s * 1.2 + 0.18, 0.5, 10, i ? -1.5 : 1.5, 0.5));
    c.add("steel", h.box(-2.6, 2.6, -1.0, 1.0, 0.55, 0.85));
    c.add("paint", h.box(-2.3, 2.3, -1.3, 1.3, 0.85, 3.05));
    c.add("team", h.box(1.5, 2.1, -0.5, 0.5, 3.05, 3.07));                  /* the one team panel, cabin roof */
    c.add("steel", h.box(-2.3, 2.3, -1.34, 1.34, 2.95, 3.05));
    c.add("paint", h.box(-2.0, 1.2, -0.75, 0.75, 3.05, 3.2));
    for (s = -1; s <= 1; s += 2) {
      c.add("steel", h.between(new V(-2.0, s * 0.7, 3.2), new V(1.2, s * 0.7, 3.2), 0.04, 5));
      c.add("steel", h.between(new V(-2.0, s * 0.7, 3.2), new V(1.2, s * 0.7, 3.9), 0.03, 4));
    }
    c.add("paint", h.box(-1.7, -0.2, -0.45, 0.45, 3.2, 3.9));          /* antenna housing */
    c.add("grey", h.cylX(-2.35, -2.27, 0.85, 0.85, 14, 0.7, 3.9));      /* dishes */
    c.add("grey", h.cylX(-2.35, -2.27, 0.85, 0.85, 14, -0.7, 3.9));
    c.add("steel", h.cylX(-2.27, -1.7, 0.08, 0.08, 6, 0.7, 3.9));
    c.add("steel", h.cylX(-2.27, -1.7, 0.08, 0.08, 6, -0.7, 3.9));
    c.add("grey", h.cylX(-1.6, -1.52, 0.7, 0.7, 12, 0, 3.0));
    c.add("paint", h.box(1.0, 1.35, -0.95, -0.25, 3.2, 7.6));          /* two tall flat boards */
    c.add("paint", h.box(1.0, 1.35, 0.25, 0.95, 3.2, 7.6));
    c.add("paint", h.box(0.7, 1.0, -0.6, 0.6, 3.2, 4.4));
  }

  /* ------------------------------------------------------------ S-125 pieces */
  function p73Ground(c, h) {                /* 8-sided base plate r 1.85, skirted pedestal, ring top z 0.72 */
    var i, s;
    c.add("paint", h.cylZ(0, 0.2, 1.85, 1.85, 8, 0, 0));
    c.add("paint", h.cylZ(0.2, 0.62, 1.35, 1.05, 14, 0, 0));
    c.add("steel", h.cylZ(0.62, 0.72, 1.0, 1.0, 14, 0, 0));
    for (i = 0; i < 8; i++) { s = (i + 0.5) * TAU / 8; c.add("steel", h.cylZ(0, 0.26, 0.2, 0.2, 6, Math.cos(s) * 1.75, Math.sin(s) * 1.75)); }
  }
  function p73Swing(c, h, THREE, loaded) {  /* about the ring centre at z 0.72; beam at 25 deg */
    var i, j, y, HZ = 1.55, V = THREE.Vector3, RY = [-1.35, -0.45, 0.45, 1.35];
    c.add("paint", h.box(-0.55, 0.55, -0.5, 0.5, 0.0, 0.62));
    for (j = -1; j <= 1; j += 2) {
      y = j * 0.46;
      c.add("paint", h.between(new V(-0.45, y, 0.55), new V(0, y, HZ), 0.075, 6));
      c.add("paint", h.between(new V(0.45, y, 0.55), new V(0, y, HZ), 0.075, 6));
    }
    c.add("steel", h.cylY(-0.62, 0.62, 0.075, 8, 0, HZ));
    c.push(h.T(0, 0, HZ).multiply(h.Ry(-25 * D2R)));
    c.add("paint", h.box(-0.2, 0.2, -2.15, 2.15, -0.14, 0.14));
    for (i = 0; i < 4; i++) {
      y = RY[i];
      c.add("paint", h.box(-2.1, 1.6, y - 0.075, y + 0.075, -0.1, 0.1));
      c.add("steel", h.box(-0.3, 0.3, y - 0.16, y + 0.16, 0.1, 0.22));
      if (loaded) { c.push(h.T(0, y, 0.34)); v600(c, h, -2.05); c.pop(); }
    }
    for (i = 0; i < 3; i++) {
      c.add("steel", h.between(new V(-1.4, RY[i], 0), new V(0.9, RY[i + 1], 0), 0.03, 4));
      c.add("steel", h.between(new V(0.9, RY[i], 0), new V(-1.4, RY[i + 1], 0), 0.03, 4));
    }
    c.pop();
  }
  /* SNR-125 antenna post on a wheeled trailer: lattice pedestal, railed platform, two long boxes, a dish; and the
     second trailer with its upright flat board (both from the museum photograph) */
  function lowBlow(c, h, THREE) {
    var V = THREE.Vector3, i, s;
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) c.add("rubber", h.cylY(s * 1.0 - 0.15, s * 1.0 + 0.15, 0.45, 10, i ? -1.4 : 1.4, 0.45));
    c.add("steel", h.box(-2.3, 2.3, -0.9, 0.9, 0.5, 0.8));
    for (i = 0; i < 4; i++) {
      var sx = (i & 1) ? 1 : -1, sy = (i & 2) ? 1 : -1;
      c.add("paint", h.between(new V(sx * 1.3, sy * 0.8, 0.8), new V(sx * 0.6, sy * 0.5, 3.1), 0.07, 5));
    }
    c.add("steel", h.between(new V(-1.2, -0.7, 1.5), new V(0.5, 0.45, 2.3), 0.03, 4));
    c.add("steel", h.between(new V(1.2, -0.7, 1.5), new V(-0.5, 0.45, 2.3), 0.03, 4));
    c.add("paint", h.box(-1.1, 1.1, -0.7, 0.7, 3.1, 3.3));                       /* platform */
    c.add("steel", h.box(-1.1, 1.1, -0.72, -0.68, 3.3, 4.0));                     /* rail */
    c.add("paint", h.box(-0.45, 0.45, -0.45, 0.45, 3.3, 4.6));                    /* antenna column housing */
    for (s = -1; s <= 1; s += 2) c.add("paint", h.box(-1.8, 1.4, s * 0.95 - 0.45, s * 0.95 + 0.45, 3.9, 4.8));   /* two long boxes */
    c.add("paint", h.box(-0.3, 0.3, -1.0, 1.0, 4.2, 4.5));
    c.add("grey", h.cylX(-0.1, -0.02, 0.7, 0.7, 12, 0, 5.6));                      /* dish above, tipped up */
    c.add("steel", h.cylZ(4.6, 5.5, 0.07, 0.07, 6, 0, 0));
    /* second trailer, 4.5 m to the side: box with the flat antenna board standing up */
    c.push(h.T(0, 4.6, 0));
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) c.add("rubber", h.cylY(s * 1.0 - 0.15, s * 1.0 + 0.15, 0.45, 10, i ? -1.3 : 1.3, 0.45));
    c.add("steel", h.box(-2.0, 2.0, -0.9, 0.9, 0.5, 0.8));
    c.add("paint", h.box(-1.9, 1.0, -1.1, 1.1, 0.8, 2.9));
    c.add("team", h.box(-1.2, 0.3, -0.5, 0.5, 2.9, 2.92));
    c.add("paint", h.box(0.9, 1.25, -1.2, 1.2, 1.6, 4.4));                          /* upright flat board */
    c.pop();
  }

  /* ------------------------------------------------------------ 8x8 truck shared by the S-300 TEL and the radars */
  function truck8(c, h, THREE, o) {          /* nose +X; o.front = nose x, o.ax = axle x list, o.r = tyre radius */
    var i, s, f = o.front;
    for (i = 0; i < o.ax.length; i++) for (s = -1; s <= 1; s += 2) c.add("rubber", h.cylY(s * 1.19 - 0.3, s * 1.19 + 0.3, o.r, 12, o.ax[i], o.r));
    c.add("steel", h.box(o.rear, f - 0.5, -0.95, 0.95, o.r + 0.15, o.r + 0.55));   /* frame */
    c.add("paint", h.box(f - 3.0, f, -1.6, 1.6, o.r + 0.3, o.r + 1.5));              /* full-width front body */
    c.add("glass", h.box(f - 0.02, f + 0.02, -1.4, -0.05, o.r + 0.6, o.r + 1.2));    /* grille / lamps band */
    c.add("paint", h.box(f - 2.7, f - 0.8, 0.1, 1.5, o.r + 1.5, o.r + 2.55));        /* port cab pod */
    c.add("glass", h.box(f - 0.82, f - 0.78, 0.2, 1.4, o.r + 1.75, o.r + 2.4));
    c.add("paint", h.box(f - 2.7, f - 0.8, -1.5, -0.1, o.r + 1.5, o.r + 2.3));      /* starboard pod */
  }

  /* ------------------------------------------------------------ S-300 TEL and radar */
  var S300 = { front: 5.74, rear: -5.74, ax: [4.46, 2.26, -1.04, -3.24], r: 0.75 };
  function tel300(c, h, THREE) {            /* truck + housing + rear table + jacks; nose +X */
    var s, i;
    truck8(c, h, THREE, S300);
    c.add("paint", h.box(-0.6, 2.7, -1.5, 1.5, 1.2, 3.4));                            /* control housing */
    c.add("steel", h.box(-0.6, 2.7, -1.52, 1.52, 3.0, 3.1));
    c.add("paint", h.box(-3.2, -0.6, -1.4, 1.4, 1.25, 1.9));                          /* equipment cases */
    c.add("steel", h.box(-5.05, -3.45, -1.25, 1.25, 1.7, 1.82));                      /* foot table of the block */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) c.add("steel", h.cylZ(0, 1.12, 0.07, 0.07, 6, [-2.14, -4.85][i], s * 1.35));
      c.add("steel", h.between(new THREE.Vector3(-3.6, s * 0.5, 1.8), new THREE.Vector3(-3.7, s * 0.5, 4.2), 0.09, 6));
    }
    c.add("steel", h.box(-2.5, -2.3, -1.4, 1.4, 1.2, 1.9));
  }
  function block(c, h, CR, CS, CL, tk) {         /* 2 x 2 canister block standing on z = 0, symmetrical about the axis */
    var i, j;
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2) {
      c.add(tk || "paint", h.cylZ(0, CL, CR, CR, 12, i * CS, j * CS));
      c.add("steel", h.cylZ(CL, CL + 0.1, CR - 0.08, CR - 0.1, 12, i * CS, j * CS));
    }
    c.add("steel", h.box(-CS - CR, CS + CR, -CS - CR, CS + CR, -0.1, 0.12));
    c.add("steel", h.box(-0.05, 0.05, -CS - CR, CS + CR, CL * 0.35, CL * 0.35 + 0.1));
    c.add("steel", h.box(-CS - CR, CS + CR, -0.05, 0.05, CL * 0.7, CL * 0.7 + 0.1));
  }
  /* 30N6-type radar: 8x8 truck, antenna on a mast ~13 m up with a lattice brace (museum photograph) */
  function radar300(c, h, THREE) {
    var V = THREE.Vector3;
    truck8(c, h, THREE, S300);
    c.add("paint", h.box(-4.5, 2.7, -1.5, 1.5, 1.2, 3.0));
    c.add("steel", h.box(-4.5, 2.7, -1.52, 1.52, 2.9, 3.0));
    c.add("paint", h.cylZ(3.0, 13.0, 0.36, 0.3, 10, -2.0, 0));                           /* mast */
    c.add("steel", h.cylZ(3.0, 3.6, 0.6, 0.6, 10, -2.0, 0));
    c.add("steel", h.between(new V(-5.0, 0.0, 3.0), new V(-2.3, 0.0, 9.0), 0.1, 5));      /* braces */
    c.add("steel", h.between(new V(-5.0, 0.0, 3.0), new V(-2.3, 0.0, 9.0), 0.1, 5));
    c.add("paint", h.box(-2.7, -1.2, -1.0, 1.0, 12.6, 13.6));                              /* antenna head */
    c.push(h.T(-2.0, 0, 13.3).multiply(h.Ry(-25 * D2R)));
    c.add("paint", h.box(0.5, 0.85, -1.9, 1.9, -1.2, 1.4));                                /* antenna panel */
    c.pop();
    c.add("team", h.box(-3.9, -2.9, -0.3, 0.3, 3.0, 3.02));
  }

  /* ------------------------------------------------------------ S-400 TEL (semi-trailer) and 92N6E */
  function tel400(c, h, THREE) {            /* 15.3 m, nose +X (ru_s400.js) */
    var i, s, ax = [5.05, 1.15, -0.45];
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2) c.add("rubber", h.cylY(s * 1.18 - 0.3, s * 1.18 + 0.3, 0.8, 12, ax[i], 0.8));
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) c.add("rubber", h.cylY(s * 1.18 - 0.25, s * 1.18 + 0.25, 0.55, 12, [-6.6, -5.45][i], 0.55));
    c.add("steel", h.box(-1.5, 5.8, -0.95, 0.95, 0.95, 1.4));                      /* tractor frame */
    c.add("paint", h.box(5.0, 7.65, -1.55, 1.55, 1.0, 3.15));                       /* flat cab-over cab */
    c.add("glass", h.box(7.63, 7.67, -1.35, -0.05, 2.0, 2.7));
    c.add("glass", h.box(7.63, 7.67, 0.05, 1.35, 2.0, 2.7));
    c.add("paint", h.box(1.7, 4.6, -1.1, 1.1, 1.4, 2.4));                           /* equipment housing */
    c.add("paint", h.box(-7.65, 0.2, -1.25, 1.25, 1.15, 1.75));                     /* semi-trailer deck */
    c.add("paint", h.box(-4.8, 0.0, -1.4, 1.4, 0.9, 1.4));                          /* equipment cases along the frame */
    c.add("steel", h.box(-7.75, -5.35, -1.25, 1.25, 1.75, 1.85));                   /* the block's table */
    for (s = -1; s <= 1; s += 2) {
      c.add("steel", h.between(new THREE.Vector3(-3.2, s * 1.3, 1.3), new THREE.Vector3(-3.2, s * 1.7, 0.1), 0.08, 5));
      c.add("steel", h.between(new THREE.Vector3(-7.35, s * 1.3, 1.3), new THREE.Vector3(-7.35, s * 1.7, 0.1), 0.08, 5));
      c.add("steel", h.between(new THREE.Vector3(-5.5, s * 0.45, 1.9), new THREE.Vector3(-5.6, s * 0.45, 4.0), 0.09, 6));
    }
  }
  function radar92(c, h, THREE) {            /* 8x8, cab-over cab, tall flat panel up behind it (92N6E photographs) */
    truck8(c, h, THREE, { front: 5.74, rear: -5.74, ax: [4.46, 2.26, -1.04, -3.24], r: 0.75 });
    c.add("paint", h.box(-5.0, 2.7, -1.5, 1.5, 1.2, 3.2));
    c.add("steel", h.box(-5.0, 2.7, -1.52, 1.52, 3.1, 3.25));
    c.add("steel", h.box(-1.8, -0.6, -1.3, 1.3, 3.25, 4.0));
    c.push(h.T(-1.2, 0, 3.9).multiply(h.Ry(8 * D2R)));
    c.add("paint", h.box(-0.2, 0.2, -1.6, 1.6, 0, 4.4));                              /* antenna panel 3.2 x 4.4 */
    c.add("steel", h.box(-0.3, 0.3, -1.65, 1.65, 0, 0.3));
    c.pop();
    c.add("team", h.box(-4.4, -3.2, -0.4, 0.4, 3.25, 3.27));
  }

  /* ------------------------------------------------------------ the sites */
  function build(THREE, C, opt) {
    var h = G(THREE), paint = opt === "s75" ? 0x4d5636 : opt === "s125" ? 0x4d5636 : opt === "s300e00" ? 0x4b5538 :
        opt === "s400" ? 0x4a5a3a : 0x47523a;
    var M = materials(THREE, C, paint), root = new THREE.Group(), base = new Col(THREE), tur = new Col(THREE);
    var tg = new THREE.Group(), i, a, px, py, tk = opt === "s300" ? "tube" : "paint";
    tg.name = "turret";
    if (opt === "s75" || opt === "s125") {
      var s75 = opt === "s75", R = s75 ? 8.6 : 8.2;
      if (s75) fanSong(base, h, THREE); else { base.push(h.T(-0.3, -2.3, 0)); lowBlow(base, h, THREE); base.pop(); }
      for (i = 0; i < 4; i++) {
        a = i * Math.PI / 2; px = Math.cos(a) * R; py = Math.sin(a) * R;
        revetment(base, h, px, py, s75 ? 4.4 : 3.5, a + Math.PI, 55 * D2R, s75 ? 1.35 : 1.25, 0.45, s75 ? 1.3 : 1.2);
        if (i === 0) {                                      /* the turret launcher: swing part into the turret group */
          base.push(h.at(px, py, 0, a));
          if (s75) sm63Frame(base, h); else p73Ground(base, h);
          base.pop();
          if (s75) sm63Swing(tur, h, THREE, true); else p73Swing(tur, h, THREE, true);
          tg.position.set(px, py, s75 ? 0.62 : 0.72);
        } else {
          base.push(h.at(px, py, 0, a));
          if (s75) { sm63Frame(base, h); base.push(h.T(0, 0, 0.62)); sm63Swing(base, h, THREE, true); base.pop(); }
          else { p73Ground(base, h); base.push(h.T(0, 0, 0.72)); p73Swing(base, h, THREE, true); base.pop(); }
          base.pop();
        }
      }
    } else if (opt === "s400") {
      /* Yevpatoria photograph: each TEL stands in its own U-shaped earth bank (sides and nose, open to the rear), the
         radar on a raised earth mound with a ramp. Three TELs side by side (middle one = turret), mound behind them. */
      var ty = [-8.8, -2.4, 4.0], ox = 2.6;
      mound(base, h, -6.4, 6.4, 9.6, 13.2, 2.2, 1.3);
      base.push(h.at(0, 11.4, 2.2, 0)); radar92(base, h, THREE); base.pop();
      for (i = 0; i < 3; i++) {
        ubank(base, h, -13.4, ox + 7.7 + 1.3, ty[i] - 3.2, ty[i] + 3.2, 1.6, 0.5, 1.4);
        base.push(h.at(ox, ty[i], 0, 0));
        tel400(base, h, THREE);
        if (i !== 1) { base.push(h.T(-6.55, 0, 1.85)); block(base, h, 0.52, 0.54, 6.3); base.pop(); }
        base.pop();
      }
      tg.position.set(ox - 6.55, ty[1], 1.85);
      block(tur, h, 0.52, 0.54, 6.3);
    } else {
      radar300(base, h, THREE);
      for (i = 0; i < 3; i++) {
        a = i * TAU / 3; px = Math.cos(a) * 9.4; py = Math.sin(a) * 9.4;
        base.push(h.at(px, py, 0, a + Math.PI / 2));
        tel300(base, h, THREE);
        if (i !== 0) { base.push(h.T(-4.25, 0, 1.82)); block(base, h, 0.5, 0.52, 6.95, tk); base.pop(); }
        base.pop();
        if (i === 0) {
          var c2 = Math.cos(a + Math.PI / 2), s2 = Math.sin(a + Math.PI / 2);
          tg.position.set(px - 4.25 * c2, py - 4.25 * s2, 1.82);
          block(tur, h, 0.5, 0.52, 6.95, tk);
        }
      }
    }
    base.flush(root, M);
    tur.flush(tg, M);
    root.add(tg);
    root.userData.whole = true;
    root.userData.tris = base.tris() + tur.tris();
    return root;
  }
  return { build: build };
})();

BLD_MODELS["sam_pact_e50"] = { build: function (THREE, M, C) { return HeroSamSiteRu.build(THREE, C, "s75"); } };
BLD_MODELS["sam_pact_e60"] = { build: function (THREE, M, C) { return HeroSamSiteRu.build(THREE, C, "s125"); } };
BLD_MODELS["sam_pact_e80"] = { build: function (THREE, M, C) { return HeroSamSiteRu.build(THREE, C, "s300"); } };
BLD_MODELS["sam_pact_e90"] = { build: function (THREE, M, C) { return HeroSamSiteRu.build(THREE, C, "s300"); } };
BLD_MODELS["sam_pact_e00"] = { build: function (THREE, M, C) { return HeroSamSiteRu.build(THREE, C, "s300e00"); } };
BLD_MODELS["sam_pact_e20"] = { build: function (THREE, M, C) { return HeroSamSiteRu.build(THREE, C, "s400"); } };
