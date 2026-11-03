/* ===== ru_sam_site.js - HERO models: the Soviet / Russian SAM site (BUILDINGS id "sam", side "pact") =====
   Redone 2026-11-03 to the full-quality standard: the LAUNCHERS ARE THE UNIT HEROES, built at run time and taken in
   their set-up pose, as js/hero/us_sam_site.js does with the Patriot.  One build, one option per system; the era map
   is the one the unit rows field (rules.js pact_e50_s75, pact_e60_s125, pact_e80/e90/e00_sam, sam_p), unchanged:
     sam_pact_e50  S-75 Dvina (SA-2, 1957): SNR-75 "Fan Song" antenna post in the middle, FOUR SM-63 launchers with
                   the V-750 (HeroS75S125.sm63) in horseshoe earth revetments round it, a cabin van and a power van
     sam_pact_e60  S-125 Neva (SA-3, 1961): SNR-125 "Low Blow" antenna post in the middle, THREE 5P73 launchers with
                   four V-600 each (HeroS75S125.p73) in revetments round it, a cabin van and a power van
     sam_pact_e80  S-300PS (1982): THREE 5P85S TELs (HeroS300.build "e80"), blocks stood up, and the 40V6M mast with
                   the fire-control antenna post on top
     sam_pact_e90  S-300PM / PMU-1 (1993): the same with the 5P85SE (HeroS300.build "e90"; the old file drew e80's truck)
     sam_pact_e00  S-300PMU-2 Favorit (2001): the same with the 5P85SE2 (HeroS300.build "e00")
     sam_pact_e20  S-400 Triumf (2007): THREE 5P85TE2 semi-trailer TELs (HeroS400.build) in spoil-bank pits and the
                   92N6 on its earth mound
   NO KEY (the shared model shows), as before: the S-25 (Moscow rings, no photograph, no unit row), the S-200 (the same),
   e00 S-400 (service from 2007; the e00 unit row is the S-300PMU-2).

   HOW THE HEROES ARE TAKEN APART (the hero files are not edited):
   - S-75 / S-125: the hidden "deploypose" (set up on the ground frame / base plate, loaded) is shown and the
     "travelpose" (the convoy, its tractor and its "roadwheel" carriages) is dropped.  The launcher at +X keeps the
     hero's own "turret" group, moved into the site and pointing +X at rest, with its "podelev" (rails) inside it
     raised by its userData.el to the hero's firing angle (S-75 35 deg, S-125 50 deg: the site on duty).  render3d
     slews a building's "turret" (rotation.z) but never lays a building's "podelev" (poseLauncher runs for units only),
     so the rails stay raised; launchOffset still finds the "podelev" and its userData.cells, so a round leaves the
     mouth of the central launcher's rail.  The other launchers are baked, trained outward over their banks with the
     rails raised the same way; their team plates are left off.
   - S-300 / S-400: the truck body and the set-up pose (block stood vertical, jacks down) are baked, the travel pose
     dropped, the eight / five "roadwheel" groups re-drawn as plain tyres with a hub at the hero's own axle positions,
     radii, widths and tracks.  Neither hero has a "turret" (the block never traverses); as in the old file the
     erected canister block of the TEL nearest the centre is the site's one "turret" (cut out of the hero's set-up
     pose by its footprint above 5 m, turning about its own axis, its lattice face toward +X at rest).  Only that TEL
     keeps the hero's small team strips.
   - Every mesh is merged by MATERIAL OBJECT (the hero's own materials and canvas paint, shared with the site's own
     parts), so the whole site is one draw call per material plus the turret's own few.  Exactly one "turret" and at
     most one "podelev"; no "deploypose", "travelpose" or "roadwheel" survives.

   SOURCES (Wikimedia Commons, fetched 2026-11-03 at 960 px, cached in the scratchpad q_rusam_ref):
     [FS1] "SNR-75M3 Fan Song E"; [FS2] "Fan Song fire control radar of the SA-2 SAM-system" (desert site, the post
           in its round pit on a mound).
     [LB1] "SNR-125 1"; [LB2] "SNR-125".
     [FL1] "30N6 (FLAP LID) fire control system-1"; [FL2] "76N6 acquisition radar and 30N6 fire control radar" (both
           on the 40V6M mast, braced by the lattice erector strut from the semi-trailer, guyed).
     [GS1] "92N6E radar at Almaz-Antey factory 01"; [GS2] "92N6A radar for S-400" (Vitaly Kuzmin).
     [V]   "North vietnamese S-75 SAM site" (aerial: the ring of round earth-banked pits round the centre, the road loop).
     [Y]   "S-400 Triumf SAM of the 31st Air Defense Division, Yevpatoria, Crimea" (launchers in pits between spoil banks
           higher than their decks; the 92N6 up on a high earth mound).
     [T1][T4] "414th Guards Anti-Aircraft Rocket Regiment's S-300PS in Tiksi (03-04-2020) 01 / 04" (TELs in a line on
           open ground, parallel, blocks up; NO berms).
     The launchers: the unit heroes' own sources (headers of ru_s75_s125.js, ru_s300.js, ru_s400.js).

   RECOGNITION (where it shows):
     1. S-75: the ring of horseshoe revetments, open toward the Fan Song in the middle [V][FS2]: horseshoe().
     2. Fan Song: the box cabin on its two-axle trailer, the lattice platform, the HORIZONTAL trough lying along it,
        the two big round dishes side by side above it, the tall narrow VERTICAL trough at one end, the small dish on
        its boom at the other [FS1][FS2]: fanSong().
     3. SM-63 with the V-750 raised outward from each pit (the hero) [V].
     4. Low Blow: two-axle trailer with jacks, the lattice pedestal, the railed platform, the column, the big
        rectangular antenna tipped well back on top, the wide five-sided antenna under it, the side boom with the small
        antenna box [LB1][LB2]: lowBlow().
     5. 5P73 four-rail launchers in their pits (the hero).
     6. S-300: three MAZ-543M TELs side by side, blocks up, in a line on open ground [T1]: buildSP().
     7. The fire-control antenna post on the tall 40V6M mast, with the lattice erector strut from its semi-trailer
        [FL1][FL2]: mast30n6().
     8. S-400: the TELs in deep pits between spoil banks, open at the rear; the 92N6 on its mound with a ramp [Y].
     9. 92N6: the flat-faced cab-over 8x8, the tall flat panel with rounded upper corners standing up over the middle,
        the rear equipment body, the mast with cross-arms behind the cab [GS1][GS2]: radar92().
    10. Paint: the unit heroes' canvas paint on everything (period olive / green), earth by canvas texture.

   MEASURES: launchers at the heroes' true size.  Fan Song: scaled off [FS1] from the trailer's 1.0 m wheels
     (ESTIMATED): cabin 4.4 x 2.4 m, top 2.9 m; dishes 2.2 m across, centres 5.45 m up, 2.4 m apart; vertical trough
     1.1 x 4.45 m, top 6.9 m.  Low Blow: from [LB1] against its 1.1 m wheels (ESTIMATED): platform 3.75 m, top of the
     upper antenna about 8.4 m, lower antenna 3.6 m across.  40V6M: about 21 m to the head, scaled off [FL2] against
     the trucks at its foot (the published height was not in what I read; the photograph is the authority here).
     92N6: truck 11.9 x 3.0 m, panel 3.2 x 3.9 m, scaled off [GS2] against the 1.4 m tyres (ESTIMATED).
     Cabin vans 6.4 x 2.5 m and 4.6 x 2.3 m (ESTIMATED; a box van on a two-axle trailer, no reference photograph of the
     SNR-75 / SNR-125 cabins was fetched - drawn plainly, no fittings beyond door, steps, vents, roof unit, whips).
   COMPRESSION (a real battery spreads over several hundred metres): equipment full size, the spacing compressed to a
     plot about 30 x 30 m; an S-75 site had six launchers, an S-125 four, an S-300 / S-400 battalion more: four /
     three / three / three are drawn.  Left out: the roads and road loop, cable runs, the PR-11 / PR-14 / 5T58 loaders,
     the S-300 / S-400 search radars (76N6, 64N6 / 96L6, 91N6) and command posts, the guy wires of the mast, camouflage
     nets, generators beyond the one power van, any marking.
   NOT CONFIRMED: the e80 radar is drawn as the 30N6 antenna post of [FL1][FL2]; the S-300PS used the 5N63S, NOT
     confirmed to look the same.  Revetment heights (S-75 / S-125 banks 1.5 / 1.4 m, S-400 spoil banks 3.0 m, the
     92N6 mound 3.4 m) are estimates: the photographs give no dimensions.  The S-300 positions in [T1] have no
     berms, so none are drawn there (the realism rule over a berm I could not source).  The S-300PS canisters in [T1]
     are a pale grey-blue; the unit hero paints them the vehicle green and the site follows the hero.
   BUDGET (dump.js): see the report; every period under 30,000 triangles, under 24 draw calls and 10 materials.
   LAUNCHER FIGURES are the heroes' (corrected from the old header's 22 deg, 10.8 m, r 1.85 m, 0.9 m): SM-63 rail at
     rest 17 deg, raised here to 35; V-750 10.6 m; 5P73 rails 1.1 m apart, raised here to 50 deg; V-600 5.9 m.
   Team colour C.team: the central launcher's own small team plates (hero), one roof panel on the radar or its cabin.
   Z up, metres, ground z = 0, +X the turret's rest direction.  ASCII only.  */
if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroSamSiteRu = (function () {
  "use strict";
  var TAU = Math.PI * 2, D2R = Math.PI / 180;

  /* ---------------------------------------------------------------- the baker
     One bin per material OBJECT (the unit hero's own materials are shared, so
     the launchers and the site's own parts merge into the same draw calls).
     The site's own parts get planar metre UVs (0.34 a metre on each face's
     dominant axis, as the unit heroes) so the canvas paint and the earth
     texture land on every face; a hero's mesh keeps its own UVs. */
  function Baker(THREE) { this.T = THREE; this.by = []; this.st = [new THREE.Matrix4()]; }
  Baker.prototype.push = function (m) { this.st.push(this.st[this.st.length - 1].clone().multiply(m)); };
  Baker.prototype.pop = function () { this.st.pop(); };
  Baker.prototype.bin = function (mat) {
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) return this.by[i];
    var b = { mat: mat, P: [], N: [], U: [] };
    this.by.push(b);
    return b;
  };
  /* own geometry, through the matrix stack */
  Baker.prototype.add = function (mat, g) {
    g.applyMatrix4(this.st[this.st.length - 1]);
    this.raw(mat, g, true);
  };
  /* geometry already in site space; planar: make metre UVs */
  Baker.prototype.raw = function (mat, g, planar) {
    if (g.index) g = g.toNonIndexed();
    if (!g.attributes.normal) g.computeVertexNormals();
    var b = this.bin(mat), p = g.attributes.position.array, n = g.attributes.normal.array;
    var u = (!planar && g.attributes.uv) ? g.attributes.uv.array : null, t, i, ex, ey, ez, fx, fy, fz, ax, ay, az;
    for (i = 0; i < p.length; i++) { b.P.push(p[i]); b.N.push(n[i]); }
    for (t = 0; t + 8 < p.length; t += 9) {
      if (u) { for (i = 0; i < 6; i++) b.U.push(u[t / 9 * 6 + i]); continue; }
      ex = p[t + 3] - p[t]; ey = p[t + 4] - p[t + 1]; ez = p[t + 5] - p[t + 2];
      fx = p[t + 6] - p[t]; fy = p[t + 7] - p[t + 1]; fz = p[t + 8] - p[t + 2];
      ax = Math.abs(ey * fz - ez * fy); ay = Math.abs(ez * fx - ex * fz); az = Math.abs(ex * fy - ey * fx);
      for (i = 0; i < 3; i++) {
        if (az >= ax && az >= ay) b.U.push(p[t + i * 3] * 0.34, p[t + i * 3 + 1] * 0.34);
        else if (ay >= ax) b.U.push(p[t + i * 3] * 0.34, p[t + i * 3 + 2] * 0.34);
        else b.U.push(p[t + i * 3 + 1] * 0.34, p[t + i * 3 + 2] * 0.34);
      }
    }
    g.dispose();
  };
  Baker.prototype.tris = function () { var n = 0; for (var i = 0; i < this.by.length; i++) n += this.by[i].P.length / 9; return n; };
  Baker.prototype.flush = function (group) {
    var T = this.T, i, b, geo, mesh;
    for (i = 0; i < this.by.length; i++) {
      b = this.by[i];
      if (!b.P.length) continue;
      geo = new T.BufferGeometry();
      geo.setAttribute("position", new T.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new T.BufferAttribute(new Float32Array(b.N), 3));
      geo.setAttribute("uv", new T.BufferAttribute(new Float32Array(b.U), 2));
      geo.computeBoundingSphere();
      mesh = new T.Mesh(geo, b.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };

  /* ---------------------------------------------------------------- geometry kit */
  function G(THREE) {
    var T = THREE, h = {};
    h.T = function (x, y, z) { return new T.Matrix4().makeTranslation(x, y, z || 0); };
    h.Rx = function (a) { return new T.Matrix4().makeRotationX(a); };
    h.Ry = function (a) { return new T.Matrix4().makeRotationY(a); };
    h.Rz = function (a) { return new T.Matrix4().makeRotationZ(a); };
    h.at = function (x, y, z, yaw) { return h.T(x, y, z || 0).multiply(h.Rz(yaw || 0)); };
    h.box = function (x0, x1, y0, y1, z0, z1) {
      var g = new T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
      g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return g;
    };
    h.cylX = function (x0, x1, r0, r1, seg, y, z) {
      var g = new T.CylinderGeometry(r1, r0, x1 - x0, seg, 1, false);
      g.rotateZ(-Math.PI / 2); g.translate((x0 + x1) / 2, y || 0, z || 0); return g;
    };
    h.cylY = function (y0, y1, r, seg, x, z) {
      var g = new T.CylinderGeometry(r, r, y1 - y0, seg, 1, false);
      g.translate(x || 0, (y0 + y1) / 2, z || 0); return g;
    };
    h.cylZ = function (z0, z1, r0, r1, seg, x, y) {
      var g = new T.CylinderGeometry(r1, r0, z1 - z0, seg, 1, false);
      g.rotateX(Math.PI / 2); g.translate(x || 0, y || 0, (z0 + z1) / 2); return g;
    };
    h.rod = function (a, b, r, seg) {
      var d = new T.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]), L = d.length();
      var g = new T.CylinderGeometry(r, r, L, seg || 5, 1, false);
      g.applyMatrix4(new T.Matrix4().makeRotationFromQuaternion(new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize())));
      g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2); return g;
    };
    /* a dish: a shallow paraboloid of radius r and depth d, its axis +X, rim at x = 0 */
    h.dish = function (r, d, seg) {
      var pts = [], i, k;
      for (i = 0; i <= 5; i++) { k = i / 5; pts.push(new T.Vector2(Math.max(r * k, 0.001), -d * (1 - k * k))); }
      var g = new T.LatheGeometry(pts, seg || 14);
      g.rotateZ(-Math.PI / 2); return g;
    };
    return h;
  }

  /* a truss between two chords a0-a1 and b0-b1 (points), n bays, zig-zag web */
  function truss(K, h, mat, a0, a1, b0, b1, n, rc, rw) {
    var i, t0, t1, A, B, C2;
    function lerp(p, q, t) { return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t]; }
    K.add(mat, h.rod(a0, a1, rc, 5)); K.add(mat, h.rod(b0, b1, rc, 5));
    for (i = 0; i < n; i++) {
      t0 = i / n; t1 = (i + 1) / n;
      A = lerp(a0, a1, t0); B = lerp(b0, b1, t0); C2 = lerp(a0, a1, t1);
      K.add(mat, h.rod(A, B, rw, 4));
      K.add(mat, h.rod(B, C2, rw, 4));
    }
    K.add(mat, h.rod(a1, b1, rw, 4));
  }

  /* ---------------------------------------------------------------- earth */
  var _etex = {};
  function earthTex(THREE, base, blots, seed) {
    var key = base + seed;
    if (_etex[key] !== undefined) return _etex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas"); cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = seed >>> 0, i, k, x, y, a, rr, ang, rd;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < blots.length; k++) {
        q.fillStyle = blots[k];
        for (i = 0; i < 14; i++) {
          x = R() * 256; y = R() * 256; rr = 10 + R() * 34;
          q.beginPath();
          for (a = 0; a < 8; a++) {
            ang = a / 8 * TAU; rd = rr * (0.5 + R() * 0.8);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd, y + Math.sin(ang) * rd); else q.lineTo(x + Math.cos(ang) * rd, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      for (i = 0; i < 260; i++) {                       /* clods and stones */
        q.fillStyle = (i % 3) ? "rgba(20,16,10,0.16)" : "rgba(220,205,170,0.12)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 1 + R() * 3);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    } catch (e) { t = null; }
    _etex[key] = t;
    return t;
  }
  function earthMat(THREE, E) {
    var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.97, metalness: 0.0 }), tx = earthTex(THREE, E.base, E.blots, E.seed);
    if (tx) m.map = tx; else m.color.set(E.base);
    return m;
  }

  /* A bank swept along a path [x, y, k]: a rounded section (base half-width b, crest half-width t, height H), scaled by
     k at each point (k < 1 runs the ends down into the ground). rough > 0 lifts and drops the crest point by point
     (a bulldozed spoil bank, as the Yevpatoria photograph) - a fixed pattern, not random per build. */
  function bank(K, mat, THREE, path, b, t, H, rough) {
    var n = path.length, i, j, rows = [], P = [], dx, dy, l, nx, ny, d1, d2, k, hz;
    var prof = [[-b, 0], [-(b + t) * 0.55, 0.62], [-t, 0.95], [0, 1.0], [t, 0.95], [(b + t) * 0.55, 0.62], [b, 0]];
    for (i = 0; i < n; i++) {
      d1 = path[Math.max(i - 1, 0)]; d2 = path[Math.min(i + 1, n - 1)];
      dx = d2[0] - d1[0]; dy = d2[1] - d1[1]; l = Math.sqrt(dx * dx + dy * dy) || 1; nx = -dy / l; ny = dx / l;
      k = path[i][2] === undefined ? 1 : path[i][2];
      hz = H * k * (1 + (rough ? rough * Math.sin(i * 2.7 + 0.6) * Math.cos(i * 1.3) : 0));
      var row = [];
      for (j = 0; j < prof.length; j++) row.push([path[i][0] + nx * prof[j][0] * Math.max(k, 0.35), path[i][1] + ny * prof[j][0] * Math.max(k, 0.35), prof[j][1] * hz]);
      rows.push(row);
    }
    function tri(a, bb, c) { P.push(a[0], a[1], a[2], bb[0], bb[1], bb[2], c[0], c[1], c[2]); }
    for (i = 0; i < n - 1; i++) for (j = 0; j < prof.length - 1; j++) {
      tri(rows[i][j], rows[i + 1][j], rows[i + 1][j + 1]); tri(rows[i][j], rows[i + 1][j + 1], rows[i][j + 1]);
    }
    for (j = 1; j < prof.length - 2; j++) { tri(rows[0][0], rows[0][j + 1], rows[0][j]); tri(rows[n - 1][0], rows[n - 1][j], rows[n - 1][j + 1]); }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(P), 3));
    g.computeVertexNormals();
    K.raw(mat, g, true);
  }
  /* a horseshoe bank round (cx, cy), centreline radius R, open toward angle `open` with half gap `gap` */
  function horseshoe(K, mat, THREE, cx, cy, R, open, gap, b, t, H) {
    var n = 26, i, a, span = TAU - 2 * gap, a0 = open + gap, path = [];
    for (i = 0; i <= n; i++) {
      a = a0 + i * span / n;
      path.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R, Math.min(1, 0.25 + Math.min(i, n - i) * 0.38)]);
    }
    bank(K, mat, THREE, path, b, t, H, 0);
  }
  /* a flat-topped earth mound with a ramp up its -X side: top x0..x1, y0..y1 at height H, side slope run s */
  function mound(K, mat, THREE, x0, x1, y0, y1, H, s, ramp) {
    var P = [];
    function quad(a, b, c, d) { P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]); }
    var A = [x0 - s, y0 - s, 0], B = [x1 + s, y0 - s, 0], C2 = [x1 + s, y1 + s, 0], D = [x0 - s, y1 + s, 0];
    var a = [x0, y0, H], b = [x1, y0, H], c = [x1, y1, H], d = [x0, y1, H];
    quad(a, b, c, d); quad(A, B, b, a); quad(B, C2, c, b); quad(C2, D, d, c); quad(D, A, a, d);
    if (ramp) {                                   /* the ramp: 4 m wide, from the top's -X edge down to the ground */
      var ym = (y0 + y1) / 2, r0 = [x0 - s - ramp, ym - 2.0, 0], r1 = [x0 - s - ramp, ym + 2.0, 0], t0 = [x0, ym - 2.0, H], t1 = [x0, ym + 2.0, H];
      quad(r0, t0, t1, r1);
      P.push(r0[0], r0[1], r0[2], x0 - s, ym - 2.0, 0, t0[0], t0[1], t0[2]);
      P.push(r1[0], r1[1], r1[2], t1[0], t1[1], t1[2], x0 - s, ym + 2.0, 0);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(P), 3));
    g.computeVertexNormals();
    K.raw(mat, g, true);
  }

  /* ---------------------------------------------------------------- the unit hero, taken apart */
  /* every mesh under obj, its geometry in the hero's frame (matrixWorld; the hero root is not in a scene) */
  function meshesOf(obj, skip) {
    var out = [];
    (function walk(o) {
      if (skip && skip(o)) return;
      if (o.isMesh) out.push(o);
      for (var i = 0; i < o.children.length; i++) walk(o.children[i]);
    })(obj);
    return out;
  }
  function heroGeo(mesh) {
    var g = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
    g.applyMatrix4(mesh.matrixWorld);
    return g;
  }
  /* split a non-indexed geometry by a per-triangle test on its positions: [kept, rest] */
  function split(THREE, g, pred) {
    var p = g.attributes.position.array, n = g.attributes.normal.array, u = g.attributes.uv ? g.attributes.uv.array : null;
    var A = { P: [], N: [], U: [] }, B = { P: [], N: [], U: [] }, t, i, o;
    for (t = 0; t * 9 < p.length; t++) {
      o = pred(p, t * 9) ? A : B;
      for (i = 0; i < 9; i++) { o.P.push(p[t * 9 + i]); o.N.push(n[t * 9 + i]); }
      if (u) for (i = 0; i < 6; i++) o.U.push(u[t * 6 + i]);
    }
    function mk(o) {
      var q = new THREE.BufferGeometry();
      q.setAttribute("position", new THREE.BufferAttribute(new Float32Array(o.P), 3));
      q.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(o.N), 3));
      if (u) q.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(o.U), 2));
      return q;
    }
    return [mk(A), mk(B)];
  }
  /* the hero's materials by role: paint carries the canvas map; the rest by colour (the hero files' own values) */
  function heroMats(THREE, u, C) {
    var m = {}, team = (C && C.team !== undefined) ? new THREE.Color(C.team).getHex() : null;
    u.traverse(function (o) {
      if (!o.isMesh) return;
      var mt = o.material, hx = mt.color.getHex();
      if (mt.map || hx === 0x4f5734) m.paint = mt;
      else if (hx === 0x2f3329 || hx === 0x2a2d29 || hx === 0x2c2e2a) m.dark = mt;
      else if (hx === 0x1b1c1d || hx === 0x1c1d1f || hx === 0x1d1e1f) m.tyre = mt;
      else if (hx === 0x26323a || hx === 0x1d2a33 || hx === 0x1b2730) m.glass = mt;
      else if (hx === 0x9c9f97) m.grey = mt;
      else if (hx === 0xc9c9c0) m.white = mt;
      else if (hx === 0x2a2c2e) m.black = mt;
      else if (hx === 0xc98a2a) m.lamp = mt;
      else if (team !== null && hx === team) m.team = mt;
    });
    if (!m.team) m.team = new THREE.MeshStandardMaterial({ color: team !== null ? team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    if (!m.grey) m.grey = m.dark;
    if (!m.black) m.black = m.dark;
    if (!m.glass) m.glass = m.dark;
    return m;
  }
  /* the pieces of a towed launcher's set-up pose (ru_s75_s125.js): the base meshes, the trained "turret" and its "podelev" */
  function towedParts(u) {
    var dep = u.getObjectByName("deploypose"), tur = dep.getObjectByName("turret"), pe = tur.getObjectByName("podelev");
    return { dep: dep, tur: tur, pe: pe };
  }
  /* bake one towed launcher, its traversing axis at (px, py), trained to yaw, rails raised by el (team plates left off) */
  function bakeTowed(K, THREE, u, M, px, py, yaw) {
    var q = towedParts(u), oldEl = q.pe.rotation.y, oldYaw = q.tur.rotation.z;
    q.pe.rotation.y = -(q.pe.userData.el || 0);
    q.tur.rotation.z = yaw;
    q.tur.position.x = q.tur.userData.x0; q.tur.position.y = 0;
    u.updateMatrixWorld(true);
    var W = new THREE.Matrix4().makeTranslation(px - q.tur.userData.x0, py, 0);
    var Wb = new THREE.Matrix4().makeTranslation(px, py, 0).multiply(new THREE.Matrix4().makeRotationZ(yaw)).multiply(new THREE.Matrix4().makeTranslation(-q.tur.userData.x0, 0, 0));
    meshesOf(q.dep, function (o) { return o === q.tur; }).forEach(function (m) {
      if (m.material === M.team) return;
      var g = heroGeo(m); g.applyMatrix4(Wb); K.raw(m.material, g, false);
    });
    q.tur.rotation.z = 0; u.updateMatrixWorld(true);
    meshesOf(q.tur).forEach(function (m) {
      if (m.material === M.team) return;
      var g = heroGeo(m);
      g.applyMatrix4(new THREE.Matrix4().makeTranslation(-q.tur.userData.x0, 0, 0));
      g.applyMatrix4(new THREE.Matrix4().makeRotationZ(yaw));
      g.applyMatrix4(new THREE.Matrix4().makeTranslation(px, py, 0));
      K.raw(m.material, g, false);
    });
    q.pe.rotation.y = oldEl; q.tur.rotation.z = oldYaw;
    void W;
  }
  /* the central towed launcher: the base baked, the hero's own "turret" group (with its "podelev", raised) moved into the site */
  function takeTowed(K, THREE, u, M, px, py, root) {
    var q = towedParts(u);
    u.updateMatrixWorld(true);
    meshesOf(q.dep, function (o) { return o === q.tur; }).forEach(function (m) {
      var g = heroGeo(m); g.applyMatrix4(new THREE.Matrix4().makeTranslation(px - q.tur.userData.x0, py, 0)); K.raw(m.material, g, false);
    });
    q.dep.remove(q.tur);
    q.tur.position.set(px, py, q.tur.position.z);
    q.tur.rotation.set(0, 0, 0);
    q.pe.rotation.y = -(q.pe.userData.el || 0);       /* raised, as a site on duty stands; render3d does not lay a building's rails */
    root.add(q.tur);
  }

  /* a self-propelled launcher (ru_s300.js / ru_s400.js): body and set-up pose baked, the travel pose dropped, the
     "roadwheel" groups re-drawn as plain tyres. block: "turret" -> the erected canister block goes into a group of
     its own (returned), "bake" -> baked with the rest. keepTeam: the hero's own small team strips stay. */
  function bakeSP(K, THREE, h, u, M, px, py, yaw, block, keepTeam) {
    u.updateMatrixWorld(true);
    var W = new THREE.Matrix4().makeTranslation(px, py, 0).multiply(new THREE.Matrix4().makeRotationZ(yaw));
    var dep = u.getObjectByName("deploypose"), list = [], tg = null;
    u.children.forEach(function (o) {
      if (o.isMesh) list.push(o);
      else if (o.name === "deploypose") o.children.forEach(function (c) { if (c.isMesh) list.push(c); });
      else if (o.name === "roadwheel") tyresOf(K, THREE, h, o, M, W);
    });
    var fp = null;
    if (block === "turret") {
      fp = { x0: 1e9, x1: -1e9, y0: 1e9, y1: -1e9 };
      dep.children.forEach(function (c) {
        if (!c.isMesh) return;
        var p = c.geometry.attributes.position.array, i;
        for (i = 0; i < p.length; i += 3) if (p[i + 2] > 5.0) {
          fp.x0 = Math.min(fp.x0, p[i]); fp.x1 = Math.max(fp.x1, p[i]); fp.y0 = Math.min(fp.y0, p[i + 1]); fp.y1 = Math.max(fp.y1, p[i + 1]);
        }
      });
      tg = new THREE.Group(); tg.name = "turret";
      tg.userData.K = new Baker(THREE);
      tg.userData.cx = (fp.x0 + fp.x1) / 2; tg.userData.cy = (fp.y0 + fp.y1) / 2;
    }
    function inBlock(p, o) {
      var k, x, y, zt = 0;
      for (k = 0; k < 3; k++) {
        x = p[o + k * 3]; y = p[o + k * 3 + 1]; zt = Math.max(zt, p[o + k * 3 + 2]);
        if (x < fp.x0 - 0.03 || x > fp.x1 + 0.03 || y < fp.y0 - 0.03 || y > fp.y1 + 0.03) return false;
      }
      return zt > 2.5;
    }
    list.forEach(function (m) {
      if (m.material === M.team && !keepTeam) return;
      var g = heroGeo(m), parts;
      if (tg && m.parent === dep) {
        parts = split(THREE, g, inBlock);
        parts[0].translate(-tg.userData.cx, -tg.userData.cy, 0);
        tg.userData.K.raw(m.material, parts[0], false);
        g = parts[1];
      }
      g.applyMatrix4(W);
      K.raw(m.material, g, false);
    });
    if (tg) {
      var c = new THREE.Vector3(tg.userData.cx, tg.userData.cy, 0).applyMatrix4(W);
      tg.position.set(c.x, c.y, 0);
      tg.rotation.z = 0;
      tg.userData.K.flush(tg);
      delete tg.userData.K;
    }
    return tg;
  }
  /* a hero's turning wheel group as one or two plain tyres with a hub (its own radius, width and track) */
  function tyresOf(K, THREE, h, wg, M, W) {
    var side, p, i, y, z, ys, best;
    var mesh = meshesOf(wg)[0]; if (!mesh) return;
    var g = heroGeo(mesh); p = g.attributes.position.array;
    for (side = -1; side <= 1; side += 2) {
      var y0 = 1e9, y1 = -1e9, zt = 0, x0 = 1e9, x1 = -1e9, n = 0;
      for (i = 0; i < p.length; i += 3) {
        y = p[i + 1]; z = p[i + 2];
        if ((y < 0 ? -1 : 1) !== side) continue;
        n++; y0 = Math.min(y0, y); y1 = Math.max(y1, y); zt = Math.max(zt, z); x0 = Math.min(x0, p[i]); x1 = Math.max(x1, p[i]);
      }
      if (!n) continue;
      var r = zt / 2, w = y1 - y0, xc = (x0 + x1) / 2, yc = (y0 + y1) / 2;
      var t = new THREE.CylinderGeometry(r, r, w, 16, 1, false); t.translate(xc, yc, r); t.applyMatrix4(W); K.raw(M.tyre, t, true);
      var hb = new THREE.CylinderGeometry(r * 0.5, r * 0.5, w + 0.03, 8, 1, false); hb.translate(xc, yc, r); hb.applyMatrix4(W); K.raw(M.paint, hb, true);
    }
    g.dispose();
    void ys; void best;
  }

  /* ---------------------------------------------------------------- the site's own pieces */
  /* a two-axle trailer chassis, long axis X, length L, track tr, wheel r; drawbar toward +X */
  function trailer(K, h, M, L, tr, r, z0) {
    var s, i, ax = [L / 2 - 1.1, -L / 2 + 1.1];
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
      K.add(M.tyre, h.cylY(s * tr / 2 - 0.16, s * tr / 2 + 0.16, r, 14, ax[i], r));
      K.add(M.paint, h.cylY(s * tr / 2 - 0.17, s * tr / 2 + 0.17, r * 0.45, 8, ax[i], r));
      K.add(M.paint, h.box(ax[i] - r - 0.1, ax[i] + r + 0.1, s * tr / 2 - 0.2, s * tr / 2 + 0.2, r + 0.2, r + 0.28));   /* mudguard */
    }
    K.add(M.dark, h.box(-L / 2, L / 2, -0.55, 0.55, r - 0.05, z0));                 /* frame */
    K.add(M.dark, h.rod([L / 2, 0.5, r], [L / 2 + 1.6, 0, r - 0.1], 0.05, 5));      /* drawbar */
    K.add(M.dark, h.rod([L / 2, -0.5, r], [L / 2 + 1.6, 0, r - 0.1], 0.05, 5));
    for (s = -1; s <= 1; s += 2) for (i = -1; i <= 1; i += 2) {                         /* screw jacks down at the corners */
      K.add(M.dark, h.cylZ(0.08, z0, 0.06, 0.06, 6, i * (L / 2 - 0.25), s * (tr / 2 + 0.05)));
      K.add(M.dark, h.cylZ(0, 0.08, 0.2, 0.2, 8, i * (L / 2 - 0.25), s * (tr / 2 + 0.05)));
    }
  }
  /* a towed equipment van (cabin), long axis X, its door and steps on the -Y side; teamRoof: a small roof panel */
  function cabinVan(K, h, M, L, W, H, teamRoof) {
    var r = 0.5, z0 = 1.15, s, i;
    trailer(K, h, M, L - 0.6, W - 0.35, r, z0);
    K.add(M.paint, h.box(-L / 2, L / 2, -W / 2, W / 2, z0, z0 + H));
    K.add(M.paint, h.box(-L / 2 - 0.03, L / 2 + 0.03, -W / 2 - 0.03, W / 2 + 0.03, z0 + H - 0.08, z0 + H));   /* roof edge */
    K.add(M.dark, h.box(-0.5, 0.5, -W / 2 - 0.03, -W / 2 + 0.01, z0 + 0.1, z0 + 1.95));                       /* door */
    K.add(M.dark, h.box(-0.4, 0.4, -W / 2 - 0.9, -W / 2 - 0.02, 0.0, 0.06));                                   /* steps */
    K.add(M.dark, h.box(-0.4, 0.4, -W / 2 - 0.6, -W / 2 - 0.02, 0.45, 0.5));
    K.add(M.dark, h.box(-0.4, 0.4, -W / 2 - 0.3, -W / 2 - 0.02, 0.85, 0.9));
    for (i = 0; i < 2; i++) {                                                                                 /* louvred vent panels */
      K.add(M.dark, h.box(L / 2 - 1.6 - i * 2.2, L / 2 - 0.9 - i * 2.2, W / 2 - 0.01, W / 2 + 0.03, z0 + 0.9, z0 + 1.5));
      K.add(M.glass, h.box(-L / 2 + 0.8 + i * 1.2, -L / 2 + 1.4 + i * 1.2, -W / 2 - 0.02, -W / 2 + 0.01, z0 + 1.3, z0 + 1.7));
    }
    K.add(M.dark, h.box(L / 2 - 1.3, L / 2 - 0.4, -0.5, 0.5, z0 + H, z0 + H + 0.45));                         /* air conditioner */
    for (s = -1; s <= 1; s += 2) K.add(M.dark, h.cylZ(z0 + H, z0 + H + 0.9, 0.03, 0.02, 4, -L / 2 + 0.4, s * 0.6));   /* whips */
    if (teamRoof) K.add(M.team, h.box(-L / 2 + 0.8, -L / 2 + 2.2, -0.45, 0.45, z0 + H, z0 + H + 0.02));
  }

  /* ---- SNR-75 antenna post ("Fan Song"), from "SNR-75M3 Fan Song E" and the desert photograph: a two-axle trailer, the
     box cabin, the lattice platform, the HORIZONTAL trough (long box lying along the platform) with the two round lattice
     dishes above it, the tall VERTICAL trough at one end and the small dish on its boom at the other. Scaled off the
     photograph from the 1.0 m wheels (estimated). Local: the trailer along Y, the antennas looking +X. */
  function fanSong(K, h, M, THREE) {
    var s, i, a;
    K.push(h.Rz(Math.PI / 2));                                         /* trailer drawn along X, turned to lie along Y */
    trailer(K, h, M, 4.6, 2.0, 0.5, 1.2);
    K.add(M.paint, h.box(-2.2, 2.2, -1.2, 1.2, 1.2, 2.9));                                     /* cabin */
    K.add(M.paint, h.box(-2.25, 2.25, -1.25, 1.25, 2.8, 2.9));
    for (i = 0; i < 3; i++) K.add(M.dark, h.box(-1.6 + i * 1.3, -0.9 + i * 1.3, 1.19, 1.24, 1.5, 2.45));   /* side panels and doors */
    K.add(M.dark, h.box(-2.0, -1.2, -1.24, -1.19, 1.4, 2.7));
    K.add(M.team, h.box(0.6, 1.8, -0.5, 0.5, 2.9, 2.92));                                      /* team panel: cabin roof */
    K.pop();
    /* turntable and the lattice platform above the cabin (local now: X forward = antenna look, Y along the trailer) */
    K.add(M.dark, h.cylZ(2.9, 3.1, 1.0, 1.0, 16, 0, 0));
    K.add(M.paint, h.box(-0.9, 0.6, -2.6, 2.6, 3.1, 3.2));                                     /* platform deck */
    truss(K, h, M.dark, [0.5, -3.3, 3.2], [0.5, 2.6, 3.2], [0.5, -3.3, 3.85], [0.5, 2.6, 3.85], 8, 0.05, 0.03);
    truss(K, h, M.dark, [-0.8, -2.6, 3.2], [-0.8, 2.6, 3.2], [-0.8, -2.6, 3.85], [-0.8, 2.6, 3.85], 7, 0.05, 0.03);
    /* the horizontal trough: a long box with its slot face forward, tipped up a little */
    K.push(h.T(0.15, 0, 4.2).multiply(h.Ry(-8 * D2R)));
    K.add(M.paint, h.box(-0.7, 0.45, -2.2, 2.2, -0.45, 0.45));
    K.add(M.dark, h.box(0.45, 0.5, -2.1, 2.1, -0.35, 0.35));                                   /* the slot face */
    K.add(M.paint, h.box(-0.95, -0.7, -1.6, 1.6, -0.3, 0.3));
    K.pop();
    /* the two big round dishes side by side above it, tipped back, spokes on the face, on struts from the trough */
    for (s = -1; s <= 1; s += 2) {
      K.push(h.T(0.25, s * 1.2, 5.45).multiply(h.Ry(-12 * D2R)));
      K.add(M.paint, h.cylX(-0.05, 0.05, 1.1, 1.1, 20, 0, 0));
      K.add(M.dark, h.cylX(0.05, 0.09, 1.1, 1.06, 20, 0, 0));
      for (i = 0; i < 4; i++) { a = i * Math.PI / 4; K.add(M.dark, h.rod([0.1, Math.cos(a) * 1.05, Math.sin(a) * 1.05], [0.1, -Math.cos(a) * 1.05, -Math.sin(a) * 1.05], 0.025, 3)); }
      K.add(M.dark, h.cylX(-0.55, 0.45, 0.08, 0.08, 6, 0, 0));
      K.pop();
      K.add(M.dark, h.rod([-0.35, s * 1.2, 4.5], [-0.1, s * 1.2, 5.3], 0.06, 5));
    }
    /* the vertical trough at the +Y end: a tall narrow box, its slot face forward, with its side equipment box */
    K.add(M.paint, h.box(-0.45, 0.4, 2.3, 3.4, 2.45, 6.9));
    K.add(M.dark, h.box(0.4, 0.45, 2.4, 3.3, 2.6, 6.75));
    K.add(M.paint, h.box(-0.9, -0.45, 2.4, 3.2, 3.2, 5.8));
    K.add(M.dark, h.box(-0.5, 0.45, 2.25, 3.45, 6.85, 6.95));
    /* the small dish on its boom at the -Y end */
    K.add(M.dark, h.rod([0.0, -2.6, 3.5], [0.2, -3.7, 3.45], 0.06, 6));
    K.push(h.T(0.3, -3.95, 3.4).multiply(h.Ry(-5 * D2R)));
    K.add(M.paint, h.cylX(-0.04, 0.04, 0.65, 0.65, 16, 0, 0));
    for (i = 0; i < 3; i++) { a = i * Math.PI / 3; K.add(M.dark, h.rod([0.06, Math.cos(a) * 0.62, Math.sin(a) * 0.62], [0.06, -Math.cos(a) * 0.62, -Math.sin(a) * 0.62], 0.02, 3)); }
    K.pop();
  }

  /* ---- SNR-125 antenna post ("Low Blow"), from "SNR-125 1" and "SNR-125": a two-axle trailer with screw jacks, the
     lattice pedestal on it, the railed platform with its ladder, the column, the turning head with the big rectangular
     antenna tipped well back on top, the wide five-sided antenna below it tipped less, and the boom to one side with the
     small antenna box. Scaled from the 1.1 m wheels (estimated). Local: the trailer along Y, the antennas looking +X. */
  function lowBlow(K, h, M, THREE) {
    var s, i, P = [], V;
    K.push(h.Rz(Math.PI / 2));
    trailer(K, h, M, 5.6, 2.2, 0.55, 1.2);
    K.add(M.paint, h.box(-1.8, 1.8, -0.75, 0.75, 1.2, 1.55));                       /* body under the pedestal */
    K.add(M.dark, h.rod([-2.6, 1.0, 0.1], [-1.6, 0.7, 1.0], 0.04, 4));               /* the loading ladder down to the ground */
    K.add(M.dark, h.rod([-2.6, 0.5, 0.1], [-1.6, 0.2, 1.0], 0.04, 4));
    K.pop();
    /* the lattice pedestal: four legs from the trailer to the platform, X-braced */
    var leg = [[1.0, 1.2], [-1.0, 1.2], [-1.0, -1.2], [1.0, -1.2]], top = [[0.55, 0.6], [-0.55, 0.6], [-0.55, -0.6], [0.55, -0.6]];
    for (i = 0; i < 4; i++) {
      K.add(M.paint, h.rod([leg[i][0], leg[i][1], 1.55], [top[i][0], top[i][1], 3.75], 0.08, 6));
      V = (i + 1) % 4;
      K.add(M.dark, h.rod([leg[i][0], leg[i][1], 1.55], [top[V][0], top[V][1], 3.75], 0.03, 4));
    }
    K.add(M.paint, h.cylZ(1.55, 3.75, 0.35, 0.3, 10, 0, 0));
    /* platform with hand rails */
    K.add(M.paint, h.box(-1.3, 1.3, -1.9, 1.9, 3.75, 3.95));
    for (s = -1; s <= 1; s += 2) {
      K.add(M.dark, h.rod([-1.3, s * 1.9, 4.95], [1.3, s * 1.9, 4.95], 0.025, 4));
      K.add(M.dark, h.rod([s * 1.3, -1.9, 4.95], [s * 1.3, 1.9, 4.95], 0.025, 4));
      for (i = -1; i <= 1; i++) { K.add(M.dark, h.rod([i * 1.3, s * 1.9, 3.95], [i * 1.3, s * 1.9, 4.95], 0.02, 4)); }
    }
    for (i = 0; i < 6; i++) K.add(M.dark, h.box(-1.35, -1.3, 1.5 - i * 0.35 - 0.02, 1.5 - i * 0.35 + 0.02, 0.6 + i * 0.55, 0.65 + i * 0.55));   /* ladder rungs */
    K.add(M.dark, h.rod([-1.33, 1.6, 0.4], [-1.33, -0.3, 3.75], 0.03, 4));
    /* column and the turning head */
    K.add(M.paint, h.cylZ(3.95, 5.3, 0.42, 0.42, 12, 0, 0));
    K.add(M.paint, h.box(-0.9, 0.7, -1.1, 1.1, 5.3, 6.1));
    K.add(M.dark, h.box(-0.95, 0.75, -1.15, 1.15, 5.25, 5.35));
    /* the wide lower antenna: five-sided, tipped back 30 deg, 3.6 m across */
    K.push(h.T(0.45, 0, 5.95).multiply(h.Ry(-35 * D2R)));
    var sh = new THREE.Shape();
    sh.moveTo(-1.8, -0.45); sh.lineTo(1.8, -0.45); sh.lineTo(1.6, 0.4); sh.lineTo(0.0, 0.85); sh.lineTo(-1.6, 0.4); sh.lineTo(-1.8, -0.45);
    var eg = new THREE.ExtrudeGeometry(sh, { depth: 1.2, bevelEnabled: false });
    eg.rotateY(-Math.PI / 2); eg.rotateX(Math.PI / 2); eg.rotateZ(Math.PI); eg.translate(-0.6, 0, 0);
    K.add(M.paint, eg);
    K.add(M.dark, h.box(0.6, 0.65, -1.65, 1.65, -0.38, 0.38));
    K.pop();
    /* the big upper antenna: a deep rectangular box 2.0 x 1.8 m, tipped back 50 deg, on its yoke */
    K.add(M.dark, h.rod([-0.3, 0.6, 6.1], [0.0, 0.6, 7.0], 0.08, 6));
    K.add(M.dark, h.rod([-0.3, -0.6, 6.1], [0.0, -0.6, 7.0], 0.08, 6));
    K.push(h.T(0.1, 0, 7.4).multiply(h.Ry(-50 * D2R)));
    K.add(M.paint, h.box(-0.5, 0.35, -1.0, 1.0, -0.9, 0.9));
    K.add(M.paint, h.box(0.35, 0.5, -1.05, 1.05, -0.95, 0.95));
    K.add(M.dark, h.box(0.5, 0.53, -0.9, 0.9, -0.8, 0.8));
    K.add(M.paint, h.box(-0.75, -0.5, -0.5, 0.5, -0.5, 0.5));
    K.pop();
    /* the boom out to -Y with the small antenna box on its end */
    K.add(M.paint, h.cylY(-3.4, -1.1, 0.12, 8, 0.1, 5.55));
    K.add(M.paint, h.box(-0.35, 0.55, -3.9, -3.3, 5.2, 5.85));
    K.add(M.dark, h.box(0.55, 0.58, -3.85, -3.35, 5.25, 5.8));
    void P;
  }

  /* ---- 40V6M mast with the 30N6 (S-300) antenna post, from "30N6 (FLAP LID) fire control system-1" and "76N6
     acquisition radar and 30N6 fire control radar": the mast stands at the rear of its long semi-trailer, braced by the
     lattice erector strut from the trailer, with a ladder up it; on top the antenna post: a box with the flat square
     array tipped back above its front and a small round antenna on its side. Mast height scaled from the photograph
     against the MAZ trucks at its foot (about 21 m to the head; the 40V6M figure is not in the references read).
     Local: the trailer along +X from the mast, the array looking +X. */
  function mast30n6(K, h, M, THREE, Hm) {
    var s, i, z;
    /* the semi-trailer: bed, three axles at the mast end, the gooseneck forward */
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2) {
      K.add(M.tyre, h.cylY(s * 1.05 - 0.32, s * 1.05 + 0.32, 0.6, 14, 0.9 + i * 1.45, 0.6));
      K.add(M.paint, h.cylY(s * 1.05 - 0.33, s * 1.05 + 0.33, 0.27, 8, 0.9 + i * 1.45, 0.6));
    }
    K.add(M.paint, h.box(-0.4, 9.5, -1.3, 1.3, 1.1, 1.5));
    K.add(M.paint, h.box(9.5, 12.5, -1.2, 1.2, 1.5, 2.0));
    K.add(M.dark, h.cylZ(0, 1.5, 0.1, 0.1, 6, 11.8, 0));                              /* landing leg under the gooseneck */
    for (s = -1; s <= 1; s += 2) {                                                     /* outriggers, pads down */
      K.add(M.dark, h.rod([0.2, s * 1.3, 1.2], [0.2, s * 3.6, 0.1], 0.09, 6));
      K.add(M.dark, h.cylZ(0, 0.08, 0.3, 0.3, 10, 0.2, s * 3.6));
      K.add(M.dark, h.rod([6.5, s * 1.3, 1.2], [6.5, s * 3.0, 0.1], 0.08, 6));
      K.add(M.dark, h.cylZ(0, 0.08, 0.28, 0.28, 10, 6.5, s * 3.0));
    }
    /* the mast: a base section, then the tube tapering to the head; collars at the section joints */
    K.add(M.paint, h.box(-0.9, 0.9, -0.9, 0.9, 1.5, 2.4));
    K.add(M.paint, h.cylZ(2.4, Hm, 0.5, 0.36, 14, 0, 0));
    for (z = 6; z < Hm - 1; z += 4.5) K.add(M.dark, h.cylZ(z, z + 0.25, 0.56 - z * 0.006, 0.56 - z * 0.006, 14, 0, 0));
    for (i = 0; i * 0.35 + 2.6 < Hm - 0.4; i++) K.add(M.dark, h.box(-0.08, 0.08, 0.52, 0.72, 2.6 + i * 0.35, 2.64 + i * 0.35));   /* ladder rungs */
    K.add(M.dark, h.rod([0, 0.62, 2.4], [0, 0.6, Hm - 0.3], 0.025, 4));
    /* the lattice erector strut: two chords from the trailer up to the mast at about 0.55 of its height */
    var top = Hm * 0.55;
    for (s = -1; s <= 1; s += 2) truss(K, h, M.paint, [7.4, s * 0.9, 1.5], [0.45, s * 0.35, top], [7.0, s * 0.9, 1.5], [0.3, s * 0.35, top - 0.9], 12, 0.11, 0.045);
    for (i = 1; i < 6; i++) { var t = i / 6; K.add(M.dark, h.rod([7.2 - 6.9 * t, -0.9 + 0.55 * t, 1.5 + (top - 1.5) * t], [7.2 - 6.9 * t, 0.9 - 0.55 * t, 1.5 + (top - 1.5) * t], 0.03, 4)); }
    /* the head: turntable, the equipment box, the flat array tipped back 20 deg above its front, the side antenna */
    K.add(M.dark, h.cylZ(Hm, Hm + 0.3, 0.75, 0.75, 14, 0, 0));
    K.add(M.paint, h.box(-1.2, 1.1, -1.25, 1.25, Hm + 0.3, Hm + 1.65));
    K.add(M.dark, h.box(-1.25, 1.15, -1.3, 1.3, Hm + 1.6, Hm + 1.7));
    for (i = 0; i < 3; i++) K.add(M.dark, h.box(-0.9 + i * 0.7, -0.4 + i * 0.7, -1.29, -1.25, Hm + 0.5, Hm + 1.4));
    K.add(M.team, h.box(-1.0, -0.2, -0.5, 0.5, Hm + 1.7, Hm + 1.72));
    K.push(h.T(0.7, 0, Hm + 1.7).multiply(h.Ry(-20 * D2R)));
    K.add(M.paint, h.box(-0.35, 0.0, -1.3, 1.3, 0.0, 2.6));
    K.add(M.dark, h.box(0.0, 0.05, -1.2, 1.2, 0.1, 2.5));
    K.add(M.paint, h.box(-0.55, -0.35, -0.6, 0.6, 0.6, 1.8));
    K.pop();
    K.add(M.dark, h.rod([-1.0, 0.6, Hm + 1.7], [0.4, 0.6, Hm + 2.6], 0.05, 4));       /* the array's back struts */
    K.add(M.dark, h.rod([-1.0, -0.6, Hm + 1.7], [0.4, -0.6, Hm + 2.6], 0.05, 4));
    K.push(h.T(0.2, 1.65, Hm + 1.0));
    K.add(M.paint, h.cylY(0.0, 0.5, 0.45, 12, 0, 0));
    K.add(M.dark, h.cylY(0.5, 0.55, 0.38, 12, 0, 0));
    K.pop();
  }

  /* ---- 92N6 (S-400) on its 8x8, from "92N6E radar at Almaz-Antey factory 01" and "92N6A radar for S-400": the flat-faced
     cab-over cab with its four-pane windscreen, the equipment body, and over the rear half the big flat antenna panel
     with rounded upper corners standing up on its turntable, tipped back a little; the mast with whips. Sizes ESTIMATED
     from the photographs against the 1.4 m tyres. Local: nose +X. */
  function radar92(K, h, M, THREE) {
    var s, i, ax = [4.3, 2.75, -1.6, -3.15], r = 0.7;
    for (i = 0; i < 4; i++) for (s = -1; s <= 1; s += 2) {
      K.add(M.tyre, h.cylY(s * 1.15 - 0.3, s * 1.15 + 0.3, r, 16, ax[i], r));
      K.add(M.paint, h.cylY(s * 1.15 - 0.31, s * 1.15 + 0.31, r * 0.48, 8, ax[i], r));
    }
    K.add(M.dark, h.box(-5.6, 5.4, -0.75, 0.75, 0.75, 1.25));                                /* frame */
    /* cab: lower face with grille, raked upper face with four panes, roof */
    K.add(M.paint, h.box(3.6, 6.0, -1.5, 1.5, 1.05, 2.2));
    K.add(M.dark, h.box(5.98, 6.04, -1.2, 1.2, 1.35, 1.9));
    K.add(M.paint, h.box(3.6, 5.8, -1.5, 1.5, 2.2, 3.35));
    for (i = 0; i < 4; i++) K.add(M.glass, h.box(5.79, 5.83, -1.4 + i * 0.71, -0.78 + i * 0.71, 2.35, 3.15));
    for (s = -1; s <= 1; s += 2) K.add(M.glass, h.box(4.6, 5.6, s * 1.5 - 0.02, s * 1.5 + 0.02, 2.4, 3.1));
    K.add(M.dark, h.box(5.9, 6.25, -1.5, 1.5, 0.95, 1.2));                                  /* bumper */
    K.add(M.lamp || M.dark, h.box(5.85, 5.9, -1.3, 1.3, 3.36, 3.42));
    /* body behind the cab, the rear cabin and the antenna's turntable box */
    K.add(M.paint, h.box(-5.6, 3.5, -1.5, 1.5, 1.25, 2.1));
    K.add(M.paint, h.box(-5.6, -2.4, -1.5, 1.5, 2.1, 3.7));
    K.add(M.dark, h.box(-5.65, -2.35, -1.53, 1.53, 3.62, 3.72));
    for (i = 0; i < 3; i++) K.add(M.dark, h.box(-5.3 + i * 1.0, -4.6 + i * 1.0, -1.53, -1.5, 2.3, 3.3));
    K.add(M.paint, h.box(-1.9, 1.6, -1.35, 1.35, 2.1, 3.0));
    K.add(M.dark, h.cylZ(3.0, 3.3, 1.1, 1.1, 16, -0.2, 0));
    K.add(M.team, h.box(-4.8, -3.4, -0.45, 0.45, 3.72, 3.74));
    /* the antenna panel: 3.4 m wide, 4.6 m tall with rounded top corners, 0.45 m deep, tipped back 12 deg, face +X */
    K.push(h.T(0.1, 0, 3.3).multiply(h.Ry(-12 * D2R)));
    var sh = new THREE.Shape(), w = 1.6, H = 3.9, rc = 0.5;
    sh.moveTo(-w, 0); sh.lineTo(w, 0); sh.lineTo(w, H - rc); sh.quadraticCurveTo(w, H, w - rc, H); sh.lineTo(-w + rc, H); sh.quadraticCurveTo(-w, H, -w, H - rc); sh.lineTo(-w, 0);
    var eg = new THREE.ExtrudeGeometry(sh, { depth: 0.45, bevelEnabled: false, curveSegments: 4 });
    eg.rotateY(Math.PI / 2); eg.rotateX(Math.PI / 2); eg.translate(-0.05, 0, 0);
    K.add(M.paint, eg);
    K.add(M.dark, h.box(-0.6, -0.05, -1.2, 1.2, 0.4, 2.9));                                   /* the back frame */
    K.add(M.dark, h.box(-0.6, 0.45, -1.75, 1.75, -0.1, 0.25));
    K.pop();
    /* the mast with whips at the rear */
    K.add(M.dark, h.cylZ(2.1, 9.0, 0.09, 0.05, 6, 3.1, 1.1));
    for (i = 0; i < 4; i++) K.add(M.dark, h.rod([3.1 - 0.5, 1.1, 6.2 + i * 0.7], [3.1 + 0.5, 1.1, 6.2 + i * 0.7], 0.02, 3));
  }

  /* ---------------------------------------------------------------- per-period earth */
  var EARTH = {
    s75:  { base: "#76694f", blots: ["#6a5f46", "#82745a", "#626145"], seed: 7501 },
    s125: { base: "#6f6750", blots: ["#645d46", "#7b7159", "#5d5f44"], seed: 12501 },
    s300: { base: "#6c6550", blots: ["#615a46", "#776f59", "#5c5e45"], seed: 30001 },
    s400: { base: "#6e5640", blots: ["#614b37", "#7a6249", "#5a5a3c"], seed: 40001 }
  };

  /* ---------------------------------------------------------------- the sites */
  function buildTowed(THREE, C, opt) {
    var h = G(THREE), s75 = opt === "s75";
    var u = s75 ? HeroS75S125.sm63(THREE, C) : HeroS75S125.p73(THREE, C), M = heroMats(THREE, u, C);
    var root = new THREE.Group(), K = new Baker(THREE), E = earthMat(THREE, EARTH[opt]), q = towedParts(u), i, a, px, py;
    root.name = "ru_sam_site_" + opt;
    q.tur.userData.x0 = q.tur.position.x;
    /* the launchers: S-75 four at 90 deg, S-125 three at 120 deg, each trained outward over the bank of its horseshoe
       revetment, the open side toward the guidance radar in the middle (the Vietnam aerial; the Egyptian pit) */
    var n = s75 ? 4 : 3, R = s75 ? 7.5 : 7.6, RR = s75 ? 4.7 : 4.2, OFF = s75 ? 1.6 : 0.9;
    for (i = n - 1; i >= 0; i--) {                 /* the central one last: its turret group leaves the hero */
      a = i * TAU / n; px = Math.cos(a) * R; py = Math.sin(a) * R;
      horseshoe(K, E, THREE, px + Math.cos(a) * OFF, py + Math.sin(a) * OFF, RR, a + Math.PI, 52 * D2R, 1.35, 0.3, s75 ? 1.5 : 1.4);
      if (i === 0) takeTowed(K, THREE, u, M, px, py, root);
      else bakeTowed(K, THREE, u, M, px, py, a);
    }
    /* the guidance radar in the middle, a cabin van and a power van in the open corners */
    if (s75) {
      K.push(h.at(-0.6, 0, 0, 0)); fanSong(K, h, M, THREE); K.pop();
      K.push(h.at(-9.6, 9.6, 0, -Math.PI / 4)); cabinVan(K, h, M, 6.4, 2.5, 2.2, false); K.pop();
      K.push(h.at(-9.6, -9.6, 0, Math.PI / 4)); cabinVan(K, h, M, 4.6, 2.3, 1.9, false); K.pop();
    } else {
      K.push(h.at(-0.4, 0, 0, 0)); lowBlow(K, h, M, THREE); K.pop();
      K.push(h.at(-10.5, 0.0, 0, Math.PI / 2)); cabinVan(K, h, M, 6.4, 2.5, 2.2, true); K.pop();
      K.push(h.at(5.2, 11.0, 0, 0)); cabinVan(K, h, M, 4.6, 2.3, 1.9, false); K.pop();
    }
    K.flush(root);
    root.userData.whole = true;
    return root;
  }

  function buildSP(THREE, C, opt) {
    var h = G(THREE), s400 = opt === "s400", e = opt === "s300e00" ? "e00" : opt === "s300e90" ? "e90" : "e80";
    var mk = function () { return s400 ? HeroS400.build(THREE, C) : HeroS300.build(THREE, C, e); };
    var u = mk(), M = heroMats(THREE, u, C), root = new THREE.Group(), K = new Baker(THREE), i, tg = null;
    var E = earthMat(THREE, EARTH[s400 ? "s400" : "s300"]);
    root.name = "ru_sam_site_" + opt;
    if (s400) {
      /* Yevpatoria photograph: the launchers side by side, each in a deep pit between spoil banks higher than the
         trailer deck, open to the rear; the 92N6 up on a high earth mound with a ramp, behind them */
      var ty = [-9.4, -2.8, 3.8], ox = 1.4;
      for (i = 0; i < 3; i++) {
        bank(K, E, THREE, [[ox - 8.6, ty[i] - 3.3, 0.3], [ox - 5.0, ty[i] - 3.3, 1], [ox + 0.5, ty[i] - 3.3, 1], [ox + 6.0, ty[i] - 3.3, 1],
          [ox + 8.6, ty[i] - 2.2, 1], [ox + 9.4, ty[i], 1], [ox + 8.6, ty[i] + 2.2, 1], [ox + 6.0, ty[i] + 3.3, 1], [ox + 0.5, ty[i] + 3.3, 1],
          [ox - 5.0, ty[i] + 3.3, 1], [ox - 8.6, ty[i] + 3.3, 0.3]], 1.6, 0.25, 3.0, 0.22);
        tg = bakeSP(K, THREE, h, u, M, ox, ty[i], 0, i === 1 ? "turret" : "bake", i === 1) || tg;
      }
      mound(K, E, THREE, -7.0, 5.8, 9.0, 13.5, 3.4, 1.4, 3.4);
      K.push(h.at(-0.6, 11.25, 3.4, 0)); radar92(K, h, M, THREE); K.pop();
    } else {
      /* Tiksi photographs: the TELs in a line on open ground, parallel, blocks stood up, no berms; the 30N6 on its
         40V6M mast beside them */
      var y3 = [-11.6, -6.0, -0.4];
      for (i = 0; i < 3; i++) tg = bakeSP(K, THREE, h, u, M, 2.9, y3[i], 0, i === 2 ? "turret" : "bake", i === 2) || tg;
      K.push(h.at(-7.8, 9.6, 0, 0)); mast30n6(K, h, M, THREE, 21.0); K.pop();
    }
    K.flush(root);
    if (tg) root.add(tg);
    root.userData.whole = true;
    return root;
  }

  function build(THREE, C, opt) {
    return (opt === "s75" || opt === "s125") ? buildTowed(THREE, C, opt) : buildSP(THREE, C, opt);
  }
  return { build: build };
})();

BLD_MODELS["sam_pact_e50"] = { build: function (THREE, M, C) { return HeroSamSiteRu.build(THREE, C, "s75"); } };
BLD_MODELS["sam_pact_e60"] = { build: function (THREE, M, C) { return HeroSamSiteRu.build(THREE, C, "s125"); } };
BLD_MODELS["sam_pact_e80"] = { build: function (THREE, M, C) { return HeroSamSiteRu.build(THREE, C, "s300"); } };
BLD_MODELS["sam_pact_e90"] = { build: function (THREE, M, C) { return HeroSamSiteRu.build(THREE, C, "s300e90"); } };
BLD_MODELS["sam_pact_e00"] = { build: function (THREE, M, C) { return HeroSamSiteRu.build(THREE, C, "s300e00"); } };
BLD_MODELS["sam_pact_e20"] = { build: function (THREE, M, C) { return HeroSamSiteRu.build(THREE, C, "s400"); } };
