/* ============ ru_khrizantema.js - HERO model: the 9P157-2 Khrizantema-S ATGM tank destroyer ============
   One row, one vehicle:
     atgmv_p   9P157-2 Khrizantema-S (js/armour_specs.js; js/facts.js: 2 ready 9M123 missiles, radar and laser
               beam guidance, BMP-3 chassis, crew 2; in service 2005)   present day, plain Russian green

   REDO 2026-10-24 (full-quality procedure). References, Wikimedia Commons, width 960, cached in
   scratchpad/q_khriz_ref (the BMP-3 running gear from the committed js/hero/ru_bmp3.js and its drawing):
     K1  "Oboronexpo2014part3-34.jpg" (V. Kuzmin, 2014) - port side, launcher RAISED: hull profile, the
         raised launcher (twin column, gimbal head with the ribbed elevation drum, the two containers about
         15 deg up), the radar dish ahead of the column, plate seams, the round plug, the whip.
     K2  "Oboronexpo2014part3-33.jpg" - starboard front 3/4, raised: the dish on its grey box to port of
         the column, the two containers side by side, the sight box on the starboard front of the roof,
         the capped cylinder on the port front, periscopes along the roof front, the corner lamps.
     K3  "Oboronexpo2014part3-35.jpg" - port rear 3/4, raised: the transverse tube along the top of the
         stern, the rear deck rail, the dish box, the drum, the twin column, the flat housing top.
     K4  "Oboronexpo2014part3-36.jpg" - rear: the stern plate's two panels, hinges, tow hooks, the
         corner mudguards, the dish box to port of the column.
     K5  "...Engineering Technologies 2012.jpg" - starboard rear 3/4 (2012 exhibit, three-tone): the
         louvred vent on the starboard rear wall, the ladder, the lifting eyes.
     K6  "...Engineering Technologies 2012 Front.jpg" - dead ahead: column 0.1 m to starboard of the
         centre line, dish 0.5 m to port (measured across the 2.66 m front).
     K7  "Mashina 9P157-2 ... Kontrolnaya proverka kursantov 01.jpg" (Russian MoD, CC BY 4.0) - starboard
         front 3/4 of a service vehicle: the trim-vane board as the whole bow face with its crease, the
         sight box with its window, the capped cylinder, the dish.
     K8  "TankBiathlon14final-71.jpg" (V. Kuzmin, 2014) - port side, STOWED: measured with a 0.5 m grid
         (wheel span 4.27 m against the BMP-3's 4.20): the roof 1.90 m, the skirt top 1.47 m at the front
         falling to about 1.33 at the rear, the idler high (centre about 0.95 m) and only 0.7 m behind the
         bow, the sprocket 0.84 m behind the last wheel, the stern plate 6.9 m behind the bow, and NOTHING
         of the launcher or the dish above the roof: both are drawn retracted at rest.
   Published figures: 7.1 m long (armour_specs.js), 3.2 m wide (drawn 3.17 m over the tracks and hubs, 3.05 m over the skirts), 18.7 t
   (facts.js; rules.js mass 19.4 from ru.wikipedia), 2 ready 9M123 rounds.  Kept from the old header and
   confirmed: the column 0.44 of the length from the bow (K1: x +0.45), the dish about 0.6 m across, gold
   (K1-K4), ahead of the column and 0.5 m over the roof.

   CORRECTIONS against the previous model:
   - the hull is the BMP-3's lower hull and running gear under a FLAT roof that runs from a short glacis
     to the stern (K1, K8), not the BMP-3's long glacis; the road wheels sit 0.45 m further forward under
     it than on the IFV (K8), the idler high and close behind the bow, the skirt the BMP-3's rounded
     segmented section, its top falling 0.14 m to the rear (K1, K8);
   - the bow is the folded trim-vane board as the whole front face, creased once (K7), not a plate on a
     glacis; the stern is a plain plate with two panels and the transverse tube along its top (K3, K4, K8),
     not the IFV's doors;
   - the containers are raised about 15 deg in both true side views (K1, K3; the 28.6 deg before came from
     foreshortened front views), on a gimbal head with the ribbed elevation drum on its port side;
   - the dish is ON the launcher platform and retracts with it (K8 shows no dish when stowed); it is drawn
     on a grey transceiver box on a pedestal, 0.55 m to port of the column;
   - the tall glazed cylinder and its two shield plates were the 2012 exhibit vehicle only (K6); the 2014
     and service vehicles carry a box sight with a window there (K2, K7), as drawn now;
   - the whip stands 0.5 m behind the column on the box there (K1), 1.35 m.

   Recognition list (what makes it read at game zoom, and its source):
     1. long flat-roofed box hull, roof 1.90 m, from a short glacis to a plain vertical stern - K1, K8
     2. the BMP-3 running gear: six small wheels, widest gap behind the second, high idler - K8, D1
     3. the rounded segmented skirt over the track, curling down at the bow - K1, K8
     4. the folded trim-vane board as the bow face - K2, K7
     5. RAISED: two khaki 9M123 containers side by side on one arm, about 15 deg up - K1, K3
     6. RAISED: the twin column and grey gimbal head with the ribbed drum to port - K1, K3
     7. RAISED: the round gold dish on its grey box ahead and to port of the column - K1, K2, K6
     8. STOWED: nothing above the roof but the low housing and the box behind it - K8
     9. sight box with a window on the starboard front of the roof - K2, K7
    10. the tube along the top of the stern - K3, K4, K8
    11. starboard rear louvred vent, ladder and lifting eyes - K5, K7
    12. plate seams and the round plug on the port wall - K1, K8
   Paint (sampled, then taken to about 0.8 of level for the ACES pass): wall #67716d (K8, overcast) and
   #3c3d36 (K1, shade) -> base #4b5143, the BMP-3 hero's plain green family; containers #989470 -> #7a7656;
   head and radar box #4d5252 -> #454a4a; dish #a8854d (K2) -> #8f7141 (K7, a service vehicle in sun,
   shows it more orange). No numbers, flags, red transit tags (K3, K7) or text.
   NOT CONFIRMED, left off: the stowed state of the radar inside the hull (only that it is gone, K8);
   the 2012 vehicle's low tube along the starboard running gear (K5 only); the reload stowage; the
   cable runs on the roof (K1, K3: too fine); a second aerial.
   Materials: PAINT (canvas texture, metre UVs: base, plate seams, bolt rows, grime), DARK, GLASS,
   WHEEL (vertex colours), KIT (vertex colours: containers, head, radar box, dish), and the team colour
   exactly as handed in (C.team) on two 0.25 x 0.85 m strips on the rear deck.
   Nodes: "turret" (on the column axis on the roof, rest pointing +X) carrying the group "podelev"
   (userData.el = EL and userData.cells = the two container mouths: mouth x, y, z and the rear x, in its
   own frame) and six "roadwheel" groups (axle on local Y, both sides in one mesh).
   render3d poseLauncher only turns "podelev" about its local Y by -el. The hinge is VIRTUAL: solved at
   build time so that the one rotation by EL carries the gimbal from its rest point (0.45 m behind the
   column, 0.45 m under the roof, containers level) onto the raised point 0.72 m over the roof, the
   containers then 15 deg up; at rest every part lies under the roof and within 1.2 m of the column axis,
   so training the turret never pushes it through a wall.
   Model space +X bow, +Y left (port), +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKhrizantema = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var BASE = "#4b5143";

  /* running gear (K8 grid; spacing as the BMP-3, D1/P7): six 0.60 m wheels, the widest gap behind the second */
  var XW = [2.18, 1.37, 0.40, -0.42, -1.20, -2.02], ZW = 0.37, RW = 0.30;
  var TY = 1.37, TW = 0.19;
  var SPR = { x: -2.86, z: 0.64, r: 0.30 }, IDL = { x: 2.86, z: 0.95, r: 0.24 };
  var XR = [1.80, -0.02, -1.62], ZR = 0.97, RR = 0.075;   /* the top run hidden behind the skirt (K8) */
  var ROOF = 1.90;
  var XH = 0.45, YH = -0.10;                 /* the column axis on the roof (K1, K6) */
  var EL = 0.26;                              /* the containers' raise, rad: 14.9 deg (K1, K3) */
  var QZ = 0.72, PX = -0.45, PZ = -0.45;      /* gimbal over the roof raised; its rest point (turret frame) */
  var TS = 0.105, TR = 0.10, TA = -0.50, TB = 1.50, TU = 0.27;   /* half spacing, radius, ends, axis over the drum */

  /* ------------------------------------------------------------ geometry kit (as ru_bmp3.js) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc, us) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.us = us || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.us;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
      }
    }
  };
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, sx, sy, sz, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      sx = s[i][0] * hu; sy = s[i][1] * hv; sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  function cyl(bin, A, B, r0, r1, seg, nocap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    if (!nocap) {
      base = V.length; na = [-ax[0], -ax[1], -ax[2]];
      V.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, V, F, N);
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  function loftN(bin, L) {
    var V = [], F = [], n = L[0].length, m = L.length, i, k;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) V.push(L[k][i]);
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + (i + 1) % n, d = (k + 1) * n + i;
        F.push([a, b, c], [a, c, d]);
      }
    for (i = 1; i + 1 < n; i++) { F.push([0, i + 1, i]); F.push([(m - 1) * n, (m - 1) * n + i, (m - 1) * n + i + 1]); }
    solid(bin, V, F);
  }
  function pwl(T, x) {
    var i, t;
    if (x <= T[0][0]) return T[0][1];
    for (i = 0; i + 1 < T.length; i++) if (x <= T[i + 1][0]) { t = (x - T[i][0]) / (T[i + 1][0] - T[i][0]); return T[i][1] + (T[i + 1][1] - T[i][1]) * t; }
    return T[T.length - 1][1];
  }
  function hexRGB(c, k) { return [parseInt(c.substr(1, 2), 16) / 255 * k, parseInt(c.substr(3, 2), 16) / 255 * k, parseInt(c.substr(5, 2), 16) / 255 * k]; }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function canvasTex(THREE, key, size, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = size; cv.height = size;
      draw(cv.getContext("2d"), size);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function blob(q, S, R, cx, cy, rx, ry, col) {
    var k, n = 9, pts = [], a, r, ox, oy;
    for (k = 0; k < n; k++) { a = k / n * TAU; r = 0.65 + R() * 0.5; pts.push([Math.cos(a) * rx * r, Math.sin(a) * ry * r]); }
    q.fillStyle = col;
    for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
      q.beginPath();
      for (k = 0; k < n; k++) q[k ? "lineTo" : "moveTo"](cx + ox + pts[k][0], cy + oy + pts[k][1]);
      q.closePath(); q.fill();
    }
  }
  /* plain green (K1, K7, K8): one tile is 1 / 0.34 = 2.9 m; mottling, plate seams with bolt rows,
     rain streaks and dust (K8 shows the bolted seams; K1 and K7 the dust) */
  function paintTex(THREE) {
    return canvasTex(THREE, "khriz" + BASE, 512, function (q, S) {
      var R = rng(2014), i, k, x, y, w;
      q.fillStyle = BASE; q.fillRect(0, 0, S, S);
      for (i = 0; i < 26; i++) { q.globalAlpha = 0.16 + R() * 0.18; blob(q, S, R, R() * S, R() * S, 30 + R() * 70, 20 + R() * 50, i % 2 ? "#40463a" : "#5a604f"); }
      q.globalAlpha = 1;
      for (i = 0; i < 8; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.40)";
        for (k = 6; k < w; k += 16) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(225,215,190,0.06)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE), VC = THREE.VertexColors !== undefined ? THREE.VertexColors : true;
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(BASE);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: VC });
    T.kit = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.72, metalness: 0.12, vertexColors: VC });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true, false, 0.34), dark: new Bin(T.dark), glass: new Bin(T.glass), team: new Bin(T.team),
             kit: new Bin(T.kit, false, true) };
  }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ---------------------------------------------------------------- hull */
  /* side profile measured off K8 (bow left, 0.5 m grid, 123 px a metre) and checked against K1:
     the roof flat at 1.90 to the glacis edge at x 3.04; the short glacis falls to the top of the vane
     board at x 3.45, z 1.73; the board leans back to its crease at 1.14 (K7) and the lower board runs
     back under the nose to 0.62; the belly 0.50; the stern a vertical plate at x -3.45. */
  var TOP = [[-3.45, 1.86], [-3.42, 1.90], [3.04, 1.90], [3.45, 1.73]];
  var BOT = [[-3.45, 0.95], [-3.32, 0.62], [-3.12, 0.50], [2.62, 0.50], [2.90, 0.56], [3.12, 0.62], [3.36, 1.14]];
  var WS = [[-3.45, 1.31], [-3.40, 1.33], [3.20, 1.33], [3.45, 1.28]];      /* wall half width (3.05 m over the skirts) */
  var WL = [[-3.45, 1.06], [-3.30, 1.10], [2.62, 1.10], [3.12, 1.04], [3.36, 1.00]];
  /* skirt top falls from 1.47 at the front to 1.33 at the rear, its foot 1.04 to 1.00 (K1, K8) */
  function skTop(x) { return pwl([[-3.30, 1.33], [2.60, 1.47]], x); }
  function skFoot(x) { return pwl([[-3.30, 1.00], [2.60, 1.04]], x); }
  function zsp(x) { return skFoot(x) + 0.02; }
  var UXS = [-3.45, -3.42, -2.5, -1.0, 0.5, 2.0, 2.6, 3.04, 3.20, 3.30, 3.36, 3.42, 3.45];
  function upperRing(x) {
    var zt = pwl(TOP, x), zb = x > 3.20 ? Math.max(zsp(x), pwl([[3.20, zsp(3.2)], [3.36, 1.14], [3.45, 1.70]], x)) : zsp(x);
    var w = pwl(WS, x), e = Math.min(0.03, (zt - zb) / 3);
    return [[x, w, zb], [x, w, zt - e], [x, w - e, zt], [x, -(w - e), zt], [x, -w, zt - e], [x, -w, zb]];
  }
  var LXS = [-3.45, -3.32, -3.12, 2.62, 2.90, 3.12, 3.34];
  function lowerRing(x) {
    var zb = pwl(BOT, x), w = pwl(WL, x), wb = w - 0.06, zt = zsp(x) + 0.04;
    return [[x, wb, zb], [x, w, zb + 0.06], [x, w, zt], [x, -w, zt], [x, -w, zb + 0.06], [x, -wb, zb]];
  }
  /* the BMP-3 rounded skirt section (ru_bmp3.js SK), stretched to this hull's skirt height */
  var SK = [[0.00, 1.0], [0.09, 0.933], [0.17, 0.76], [0.215, 0.52], [0.205, 0.227], [0.155, 0.053], [0.07, 0.0], [0.00, 0.0]];
  function skirtRing(x, s, dz, sc, grow, hs) {
    var R = [], i, w = pwl(WS, x) - 0.02, zt = skTop(x), zf = skFoot(x), h = (zt - zf) * (hs || 1);
    for (i = 0; i < SK.length; i++) R.push([x, s * (w + SK[i][0] * sc + (i && i < SK.length - 1 ? grow : 0)), zf + SK[i][1] * h + dz + (grow && (i === 0 || i === SK.length - 1) ? (i ? -grow : grow) : 0)]);
    return R;
  }
  function addHull(B) {
    var R = [], i, k, s, x, y, z, w;
    for (i = 0; i < UXS.length; i++) R.push(upperRing(UXS[i]));
    loftN(B.paint, R);
    R = [];
    for (i = 0; i < LXS.length; i++) R.push(lowerRing(LXS[i]));
    loftN(B.paint, R);

    /* the folded trim-vane board (K7): the whole bow face, 2.6 m wide, creased at 1.14; a lip along its
       top, the crease line; the front corner lamps in guards and the U-handles over them (K2, K8) */
    belt(B.paint, 3.37, 1.14, 3.475, 1.735, -1.29, 1.29, 0.035);
    belt(B.paint, 3.13, 0.61, 3.37, 1.14, -1.29, 1.29, 0.035);
    belt(B.paint, 3.43, 1.76, 3.53, 1.72, -1.30, 1.30, 0.045);
    belt(B.dark, 3.365, 1.13, 3.38, 1.16, -1.25, 1.25, 0.04);
    belt(B.paint, 3.11, 0.59, 3.16, 0.63, -1.30, 1.30, 0.05);
    for (s = -1; s <= 1; s += 2) {
      slab(B.paint, [3.22, s * 1.31, 1.30], unit([0.4, 0, 0.92]), [0, 1, 0], unit([-0.92, 0, 0.4]), 0.36, 0.022, 0.04);
      cylY(B.dark, 3.08, s * 1.27, s * 1.34, 1.02, 0.045, 8);
      /* lamp in its guard on the top corner of the face (K2) */
      cylX(B.dark, 3.40, 3.52, s * 1.08, 1.82, 0.07, 0.075, 12);
      cylX(B.glass, 3.52, 3.53, s * 1.08, 1.82, 0.06, 0.06, 12);
      belt(B.dark, 3.38, 1.78, 3.58, 1.80, s * 1.08 - 0.11, s * 1.08 - 0.09, 0.02);
      belt(B.dark, 3.38, 1.78, 3.58, 1.80, s * 1.08 + 0.09, s * 1.08 + 0.11, 0.02);
      /* U-handle and towing clamp at the front top of the wall (K1, K8) */
      belt(B.dark, 3.20, 1.86, 3.62, 1.86, s * 0.70 - 0.012, s * 0.70 + 0.012, 0.03);
      belt(B.dark, 3.20, 1.86, 3.62, 1.86, s * 0.46 - 0.012, s * 0.46 + 0.012, 0.03);
      belt(B.dark, 3.60, 1.86, 3.60, 1.87, s * 0.46, s * 0.70, 0.03);
      /* tow hooks low on the board */
      cylX(B.dark, 3.12, 3.24, s * 0.62, 0.72, 0.04, 0.04, 8);
    }
    /* periscope heads along the roof front (K2) and the driver's hatch */
    for (k = 0; k < 4; k++) {
      y = [-0.92, -0.30, 0.30, 0.92][k];
      box(B.paint, 2.86, 3.00, y - 0.12, y + 0.12, ROOF - 0.01, ROOF + 0.07);
      box(B.glass, 3.00, 3.012, y - 0.09, y + 0.09, ROOF + 0.015, ROOF + 0.055);
    }
    cylZ(B.paint, 2.50, -0.30, ROOF - 0.01, ROOF + 0.05, 0.27, 18);
    cylZ(B.dark, 2.50, -0.30, ROOF + 0.05, ROOF + 0.065, 0.23, 16);
    cylZ(B.paint, 2.50, 0.62, ROOF - 0.01, ROOF + 0.05, 0.25, 18);
    cylZ(B.dark, 2.50, 0.62, ROOF + 0.05, ROOF + 0.065, 0.21, 16);

    addDeck(B);

    for (s = -1; s <= 1; s += 2) {
      w = pwl(WS, 0);
      /* the rounded skirt and its rubber-jointed segments, the curl down at the bow, the rear mudguard */
      R = [];
      /* the curl at the bow keeps its foot near 1.0 m while its top drops to 1.1 (K8); the rear end
         turns down over the sprocket (K4, K8) */
      R.push(skirtRing(-3.47, s, -0.10, 0.6, 0, 0.55), skirtRing(-3.42, s, -0.05, 0.85, 0, 0.8), skirtRing(-3.30, s, -0.01, 0.97, 0, 0.95), skirtRing(-3.15, s, 0, 1, 0),
             skirtRing(2.80, s, 0, 1, 0), skirtRing(3.05, s, 0, 1, 0, 0.95), skirtRing(3.28, s, -0.01, 0.98, 0, 0.75), skirtRing(3.46, s, -0.03, 0.92, 0, 0.45),
             skirtRing(3.55, s, -0.06, 0.7, 0, 0.25));
      loftN(B.paint, R);
      for (x = -2.95; x < 2.80; x += 0.34) loftN(B.dark, [skirtRing(x, s, 0, 1, 0.008), skirtRing(x + 0.022, s, 0, 1, 0.008)]);
      /* plate seams with bolt heads on the upper wall (K1, K8: seams at x 2.95, 1.50, 0.65 and -0.39;
         the bolted plates span them) */
      for (k = 0; k < 4; k++) {
        x = [2.95, 1.50, 0.65, -0.39][k];
        box(B.dark, x - 0.012, x + 0.012, s > 0 ? w - 0.005 : -(w + 0.016), s > 0 ? w + 0.016 : -(w - 0.005), skTop(x) + 0.03, ROOF - 0.05);
      }
      box(B.paint, -0.39, 2.95, s > 0 ? w - 0.005 : -(w + 0.025), s > 0 ? w + 0.025 : -(w - 0.005), skTop(1.0) + 0.04, ROOF - 0.06);
      for (x = -0.30; x < 2.92; x += 0.36) {
        cylY(B.dark, x, s * w, s * (w + 0.04), ROOF - 0.10, 0.018, 5);
        cylY(B.dark, x, s * w, s * (w + 0.04), skTop(x) + 0.09, 0.018, 5);
      }
      /* lifting eyes on the wall top (K5, K8) */
      for (k = 0; k < 2; k++) {
        x = [1.05, -1.56][k];
        slab(B.dark, [x, s * (w + 0.03), ROOF - 0.12], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.10, 0.025, 0.07);
        cylY(B.dark, x, s * (w + 0.005), s * (w + 0.06), ROOF - 0.04, 0.05, 10);
      }
      addTrack(B, s);
    }
    /* port wall: the round plug and the small port (K1, K8) */
    w = pwl(WS, 0);
    cylY(B.paint, -0.49, w, w + 0.035, 1.61, 0.11, 16);
    cylY(B.dark, -0.49, w + 0.035, w + 0.045, 1.61, 0.07, 12);
    cylY(B.dark, 1.65, w, w + 0.03, 1.75, 0.05, 10);
    /* starboard wall: the louvred vent with five cells on the rear half (K5, K7), the ladder (K5) */
    box(B.paint, -3.05, -1.30, -(w + 0.02), -(w - 0.01), 1.50, 1.80);
    for (k = 0; k < 5; k++) {
      x = -3.00 + k * 0.34;
      box(B.dark, x, x + 0.29, -(w + 0.03), -(w + 0.02), 1.55, 1.75);
      box(B.paint, x, x + 0.29, -(w + 0.045), -(w + 0.03), 1.64, 1.66);
    }
    for (s = 0; s < 2; s++) belt(B.dark, 0.72 + s * 0.26, ROOF + 0.06, 0.72 + s * 0.26, skTop(0.85) - 0.30, -(w + 0.07), -(w + 0.04), 0.03);
    for (k = 0; k < 6; k++) { z = skTop(0.85) - 0.22 + k * 0.17; box(B.dark, 0.72, 0.98, -(w + 0.07), -(w + 0.04), z, z + 0.025); }

    /* stern (K3, K4, K8): a vertical plate, two raised panels with hinges, a seam, the lower panel, the
       tow hooks, the tube along the top edge on three brackets */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -3.48, -3.45, s > 0 ? 0.11 : -0.63, s > 0 ? 0.71 : -0.01, 1.28, 1.76);
      box(B.dark, -3.495, -3.475, s > 0 ? 0.68 : -0.66, s > 0 ? 0.76 : -0.58, 1.36, 1.44);
      box(B.dark, -3.495, -3.475, s > 0 ? 0.68 : -0.66, s > 0 ? 0.76 : -0.58, 1.58, 1.66);
      cylX(B.dark, -3.52, -3.45, s * 0.85, 0.72, 0.10, 0.10, 12);
      cylX(B.dark, -3.53, -3.52, s * 0.85, 0.72, 0.06, 0.06, 10);
      cylX(B.dark, -3.50, -3.45, s * 1.15, 1.40, 0.05, 0.05, 10);
      box(B.dark, -3.58, -3.45, s * 0.98 - 0.04, s * 0.98 + 0.04, 1.70, 1.80);
    }
    box(B.dark, -3.47, -3.45, -1.25, 1.25, 1.15, 1.17);
    box(B.paint, -3.475, -3.45, -0.38, 0.38, 0.72, 0.98);
    box(B.dark, -3.58, -3.45, -0.04, 0.04, 1.70, 1.80);
    cylY(B.paint, -3.535, -1.42, 1.42, 1.86, 0.085, 16);
    cylY(B.dark, -3.535, 1.42, 1.44, 1.86, 0.07, 12);
    cylY(B.dark, -3.535, -1.44, -1.42, 1.86, 0.07, 12);
  }

  /* ---------------------------------------------------------- the roof */
  function addDeck(B) {
    var k, s, x, y;
    /* the low housing the launcher and the radar rise out of (K8 stowed: 0.25 m high, x 0.20 to 1.45; K1
       and K3: the flat top the column stands through), its lid outline */
    box(B.paint, 0.20, 1.45, -0.42, 0.78, ROOF - 0.01, ROOF + 0.25);
    belt(B.paint, 1.45, ROOF + 0.25, 1.55, ROOF + 0.02, -0.42, 0.78, 0.04);
    box(B.dark, 0.26, 1.40, -0.36, 0.72, ROOF + 0.25, ROOF + 0.258);
    box(B.paint, 0.30, 1.36, -0.32, 0.68, ROOF + 0.258, ROOF + 0.27);
    /* the box behind the column, its top sloping down to the rear (K1, K8), and the whip on it (K1) */
    loftN(B.paint, [[[0.05, -0.40, ROOF - 0.01], [0.05, 0.40, ROOF - 0.01], [0.05, 0.40, ROOF + 0.38], [0.05, -0.40, ROOF + 0.38]],
                    [[-0.55, -0.40, ROOF - 0.01], [-0.55, 0.40, ROOF - 0.01], [-0.55, 0.40, ROOF + 0.32], [-0.55, -0.40, ROOF + 0.32]]]);
    box(B.dark, -0.50, 0.00, -0.36, 0.36, ROOF + 0.33, ROOF + 0.34);
    cylZ(B.dark, -0.05, -0.30, ROOF + 0.36, ROOF + 0.48, 0.04, 8);
    cylZ(B.dark, -0.05, -0.30, ROOF + 0.48, ROOF + 1.75, 0.008, 4);
    /* sight box on the starboard front, its window facing forward, rounded hood (K2, K7) */
    box(B.paint, 1.58, 1.94, -0.84, -0.42, ROOF - 0.01, ROOF + 0.24);
    cylY(B.paint, 1.76, -0.84, -0.42, ROOF + 0.24, 0.18, 14);
    box(B.paint, 1.58, 1.94, -0.84, -0.42, ROOF + 0.24, ROOF + 0.26);
    box(B.glass, 1.94, 1.95, -0.76, -0.50, ROOF + 0.06, ROOF + 0.30);
    box(B.dark, 1.94, 1.955, -0.80, -0.46, ROOF + 0.31, ROOF + 0.33);
    /* capped cylinder on the port front (K2, K7) */
    cylZ(B.paint, 2.10, 0.55, ROOF - 0.01, ROOF + 0.26, 0.085, 14);
    cylZ(B.dark, 2.10, 0.55, ROOF + 0.26, ROOF + 0.30, 0.10, 14);
    /* hatches on the rear deck and the tubular rail round it (K3, K4) */
    for (k = 0; k < 2; k++) {
      x = -1.30; y = k ? 0.50 : -0.50;
      box(B.paint, x - 0.32, x + 0.32, y - 0.30, y + 0.30, ROOF - 0.01, ROOF + 0.035);
      box(B.dark, x - 0.29, x + 0.29, y - 0.27, y + 0.27, ROOF + 0.035, ROOF + 0.043);
      box(B.paint, x - 0.27, x + 0.27, y - 0.25, y + 0.25, ROOF + 0.043, ROOF + 0.06);
    }
    for (s = -1; s <= 1; s += 2) {
      belt(B.dark, -0.70, ROOF + 0.17, -2.00, ROOF + 0.17, s * 0.97 - 0.012, s * 0.97 + 0.012, 0.025);
      for (k = 0; k < 3; k++) { x = [-0.72, -1.35, -1.98][k]; belt(B.dark, x, ROOF, x, ROOF + 0.18, s * 0.97 - 0.012, s * 0.97 + 0.012, 0.025); }
    }
    belt(B.dark, -2.00, ROOF + 0.17, -2.00, ROOF + 0.18, -0.97, 0.97, 0.025);
    /* the team colour: two strips on the rear deck */
    box(B.team, -2.55, -2.30, -1.00, -0.15, ROOF + 0.02, ROOF + 0.032);
    box(B.team, -2.55, -2.30, 0.15, 1.00, ROOF + 0.02, ROOF + 0.032);
  }

  /* ------------------------------------------------------- running gear (ru_bmp3.js) */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  var _loop = null;
  function trackLoop() {
    if (_loop) return _loop;
    var C = [], i, k, pts = [], n, a, b, l, segs = [], tot = 0;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.035]);
    C.push([IDL.x, IDL.z, IDL.r + 0.04], [SPR.x, SPR.z, SPR.r + 0.03]);
    for (i = 0; i < XR.length; i++) C.push([XR[i], ZR, RR + 0.04]);
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts); n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    _loop = { segs: segs, tot: tot };
    return _loop;
  }
  function addTrack(B, s) {
    var L = trackLoop(), segs = L.segs, n = segs.length, cnt = Math.round(L.tot / 0.15), step = L.tot / cnt;
    var y = s * TY, i, k, q = 0, rem = 0, d, t, a, b, dx, dz, px, pz;
    for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.05);
    for (k = 0; k < cnt; k++) {
      d = (k + 0.5) * step;
      while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
      t = (d - rem) / segs[q][2];
      a = segs[q][0]; b = segs[q][1];
      dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
      px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
      if (pz > 0.95 && px > -2.6 && px < 2.55) continue;          /* the top run under the skirt */
      belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.005, y + TW + 0.005, 0.07);
    }
    cylY(B.dark, SPR.x, y - 0.17, y + 0.17, SPR.z, SPR.r - 0.02, 18);
    for (k = 0; k < 13; k++) {
      t = k / 13 * TAU;
      slab(B.dark, [SPR.x + Math.cos(t) * SPR.r, y, SPR.z + Math.sin(t) * SPR.r], [Math.cos(t), 0, Math.sin(t)], [0, 1, 0], [-Math.sin(t), 0, Math.cos(t)], 0.035, 0.12, 0.03);
    }
    cylY(B.paint, SPR.x, y + s * 0.16, y + s * 0.20, SPR.z, 0.24, 16);
    cylY(B.dark, SPR.x, y + s * 0.20, y + s * 0.215, SPR.z, 0.08, 10);
    for (k = 0; k < 6; k++) { t = k / 6 * TAU; cylY(B.dark, SPR.x + Math.cos(t) * 0.155, y + s * 0.19, y + s * 0.205, SPR.z + Math.sin(t) * 0.155, 0.045, 8); }
    /* the idler: spoked (K8), high behind the bow */
    cylY(B.dark, IDL.x, y - 0.17, y + 0.17, IDL.z, IDL.r, 18);
    cylY(B.paint, IDL.x, y + s * 0.15, y + s * 0.19, IDL.z, 0.20, 16);
    cylY(B.dark, IDL.x, y + s * 0.19, y + s * 0.205, IDL.z, 0.07, 10);
    for (k = 0; k < 6; k++) { t = k / 6 * TAU + 0.3; cylY(B.dark, IDL.x + Math.cos(t) * 0.12, y + s * 0.185, y + s * 0.20, IDL.z + Math.sin(t) * 0.12, 0.04, 8); }
    for (k = 0; k < XR.length; k++) cylY(B.dark, XR[k], y - 0.12, y + 0.12, ZR, RR, 10);
    /* suspension arms and the dampers between the wheels and the hull (K1, K8) */
    for (k = 0; k < XW.length; k++) slab(B.dark, [XW[k] + 0.20, s * (TY - 0.26), ZW + 0.22], unit([0.55, 0, 0.84]), [0, 1, 0], unit([-0.84, 0, 0.55]), 0.22, 0.04, 0.045);
    for (k = 0; k < XW.length; k += 5) cyl(B.dark, [XW[k] + 0.30, s * (TY - 0.30), ZW + 0.25], [XW[k] + 0.55, s * (TY - 0.30), 0.95], 0.05, 0.05, 8);
  }
  var TYRE = [0.13, 0.135, 0.125], NUT = [0.17, 0.18, 0.16];
  function addWheel(W) {
    var s, y, i, a, BODY = hexRGB(BASE, 1.12);
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.16, y - 0.09, 0, RW, 20);
      cylY(W, 0, y + 0.09, y + 0.16, 0, RW, 20);
      W.col = BODY;
      cylY(W, 0, y - 0.09, y + 0.09, 0, RW - 0.04, 18);
      cyl(W, [0, y + s * 0.16, 0], [0, y + s * 0.175, 0], RW - 0.03, 0.14, 18);
      cylY(W, 0, y + s * 0.17, y + s * 0.195, 0, 0.10, 12);
      W.col = NUT;
      for (i = 0; i < 6; i++) { a = i / 6 * TAU; cylY(W, Math.cos(a) * 0.075, y + s * 0.19, y + s * 0.205, Math.sin(a) * 0.075, 0.016, 6); }
      cylY(W, 0, y + s * 0.195, y + s * 0.21, 0, 0.04, 8);
    }
  }

  /* ------------------------------------------------------------ launcher */
  /* Drawn RAISED in the turret frame (origin on the column axis at roof level, +X forward), measured
     off K1 and K3 (124 px a metre): the drum centre 0.72 over the roof; the containers' axis 0.25 m over
     it, 15 deg up, from 0.50 behind it to 1.50 ahead (2.0 m containers, 0.20 m across, side by side,
     K2 and K4; K1 measures 1.9 m projected); the head a block 0.46 m long under the drum (K1); the dish centre 0.65 ahead of the column, 0.55 to port and 0.53 over the roof. */
  var KH = hexRGB("#7a7656", 1), GR = hexRGB("#454a4a", 1), GD = hexRGB("#8f7141", 1), CAP = hexRGB("#b8b8ae", 1);
  function launcher(B) {
    var K = B.kit, se = Math.sin(EL), ce = Math.cos(EL), s, k, y, u = [ce, 0, se], nrm = [-se, 0, ce];
    var O = [0, 0, QZ];
    function at(t, h, yy) { return [O[0] + u[0] * t + nrm[0] * h, yy, O[2] + u[2] * t + nrm[2] * h]; }
    /* twin column (K1, K3) and its collar at the housing top */
    K.col = GR;
    cylZ(K, 0, 0, 0.15, QZ - 0.10, 0.075, 16);
    cylZ(K, -0.10, -0.08, 0.15, QZ - 0.14, 0.04, 10);
    cylZ(K, 0, 0, 0.30, 0.38, 0.105, 16);
    /* the gimbal head: housing, the ribbed elevation drum to port, a smaller boss to starboard,
       the round unit at the back with its pale cap (K3, K5) */
    box(K, -0.22, 0.24, -0.17, 0.17, QZ - 0.32, QZ + 0.10);
    box(K, -0.12, 0.30, -0.15, 0.15, QZ - 0.40, QZ - 0.32);
    cylY(K, 0, 0.17, 0.25, QZ, 0.19, 20);
    for (k = 0; k < 8; k++) {
      var a = k / 8 * TAU;
      slab(K, [Math.cos(a) * 0.10, 0.255, QZ + Math.sin(a) * 0.10], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.08, 0.008, 0.012);
    }
    cylY(K, 0, 0.25, 0.27, QZ, 0.05, 10);
    cylY(K, 0, -0.17, -0.24, QZ, 0.12, 14);
    cylX(K, -0.44, -0.14, 0.0, QZ - 0.02, 0.075, 0.075, 14);
    K.col = CAP;
    cylX(K, -0.47, -0.44, 0.0, QZ - 0.02, 0.07, 0.07, 14);
    /* the arm: a girder from the head up under the containers, a cross-frame at each end */
    K.col = GR;
    s = at(-0.20, TU - 0.14, 0); k = at(0.95, TU - 0.14, 0);
    cyl(K, [s[0], -0.05, s[2]], [k[0], -0.05, k[2]], 0.05, 0.05, 8);
    cyl(K, [s[0], 0.05, s[2]], [k[0], 0.05, k[2]], 0.05, 0.05, 8);
    slab(K, at(0.0, TU - 0.12, 0), u, [0, 1, 0], nrm, 0.16, 0.22, 0.04);
    slab(K, at(0.90, TU - 0.12, 0), u, [0, 1, 0], nrm, 0.07, 0.22, 0.03);
    slab(K, at(-0.38, TU - 0.12, 0), u, [0, 1, 0], nrm, 0.06, 0.22, 0.03);
    slab(K, at(0.0, 0.07, 0), u, [0, 1, 0], nrm, 0.12, 0.10, 0.10);
    /* the two 9M123 containers: tube, thicker muzzle collar and rear end, three bands, the end caps */
    for (s = -1; s <= 1; s += 2) {
      y = s * TS;
      K.col = KH;
      cyl(K, at(TA, TU, y), at(TB, TU, y), TR, TR, 16);
      cyl(K, at(TB - 0.20, TU, y), at(TB, TU, y), TR + 0.014, TR + 0.014, 16);
      cyl(K, at(TA, TU, y), at(TA + 0.26, TU, y), TR + 0.012, TR + 0.012, 16);
      for (k = 0; k < 3; k++) cyl(K, at(TA + 0.55 + k * 0.42, TU, y), at(TA + 0.60 + k * 0.42, TU, y), TR + 0.016, TR + 0.016, 14);
      K.col = GR;
      cyl(K, at(TB, TU, y), at(TB + 0.02, TU, y), TR + 0.006, TR + 0.006, 16);
      cyl(K, at(TA - 0.03, TU, y), at(TA, TU, y), TR - 0.005, TR - 0.005, 14);
    }
    /* the radar: pedestal, the grey transceiver box, a boss on its port side, the gold dish facing
       forward, tipped back 8 deg, a shallow dome in front of its rim (K1-K4, K6) */
    var DX = 0.65, DY = 0.58, DZ = 0.53, tb = 0.14, dax = [Math.cos(tb), 0, Math.sin(tb)];
    K.col = GR;
    cylZ(K, 0.40, DY, 0.15, 0.30, 0.11, 14);
    box(K, 0.28, 0.58, DY - 0.20, DY + 0.18, 0.30, 0.74);
    cylY(K, 0.42, DY + 0.18, DY + 0.24, 0.52, 0.09, 12);
    cyl(K, [0.58, DY, DZ], [DX - 0.02, DY, DZ], 0.07, 0.07, 10);
    K.col = GD;
    var c0 = [DX, DY, DZ];
    cyl(K, [c0[0] - dax[0] * 0.03, DY, c0[2] - dax[2] * 0.03], [c0[0] + dax[0] * 0.03, DY, c0[2] + dax[2] * 0.03], 0.29, 0.29, 28);
    cyl(K, [c0[0] + dax[0] * 0.03, DY, c0[2] + dax[2] * 0.03], [c0[0] + dax[0] * 0.07, DY, c0[2] + dax[2] * 0.07], 0.29, 0.20, 28);
    cyl(K, [c0[0] + dax[0] * 0.07, DY, c0[2] + dax[2] * 0.07], [c0[0] + dax[0] * 0.095, DY, c0[2] + dax[2] * 0.095], 0.20, 0.06, 28);
    /* cells: the container mouths and rear ends, raised, in the turret frame */
    return [[at(TB + 0.02, TU, TS), at(TA - 0.03, TU, TS)], [at(TB + 0.02, TU, -TS), at(TA - 0.03, TU, -TS)]];
  }
  /* rotation about Y by th, as three.js turns a node: x' = x cos + z sin, z' = -x sin + z cos */
  function rotY(p, th) { var c = Math.cos(th), s = Math.sin(th); return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c]; }
  /* the virtual hinge H: rotY(P - H, -EL) + H = Q, P the gimbal at rest, Q raised */
  function hinge() {
    var c = Math.cos(-EL), s = Math.sin(-EL), P = [PX, PZ], Q = [0, QZ];
    var rp = [P[0] * c + P[1] * s, -P[0] * s + P[1] * c];
    var b = [Q[0] - rp[0], Q[1] - rp[1]];
    var m00 = 1 - c, m01 = -s, m10 = s, m11 = 1 - c, det = m00 * m11 - m01 * m10;
    return [(b[0] * m11 - m01 * b[1]) / det, (m00 * b[1] - m10 * b[0]) / det];
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), EB = bins(T), i, wg, WB, tur, E, cells, H, key, b, p, n;
    addHull(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    cells = launcher(EB);
    /* carry everything from the raised pose to the rest pose about the hinge, into the hinge frame */
    H = hinge();
    for (key in EB) {
      b = EB[key];
      for (i = 0; i < b.P.length; i += 3) {
        p = rotY([b.P[i] - H[0], b.P[i + 1], b.P[i + 2] - H[1]], EL);
        b.P[i] = p[0]; b.P[i + 1] = p[1]; b.P[i + 2] = p[2];
        n = rotY([b.N[i], b.N[i + 1], b.N[i + 2]], EL);
        b.N[i] = n[0]; b.N[i + 1] = n[1]; b.N[i + 2] = n[2];
      }
    }
    for (i = 0; i < cells.length; i++) {
      p = rotY([cells[i][0][0] - H[0], cells[i][0][1], cells[i][0][2] - H[1]], EL);
      n = rotY([cells[i][1][0] - H[0], cells[i][1][1], cells[i][1][2] - H[1]], EL);
      cells[i] = [p[0], p[1], p[2], n[0]];
    }
    tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(XH, YH, ROOF);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(H[0], 0, H[1]);
    flush(THREE, E, EB);
    E.userData.cells = cells;
    E.userData.el = EL;
    tur.add(E);
    g.add(tur);
    return g;
  }
  return { build: build };
})();

/* len: the measured X extent (models3d convention): the stern tube at -3.62, the bow mudguard tips and
   the front U-handles at +3.62; hull 7.1 m published */
UNIT_MODELS["atgmv_p"] = {
  len: 7.24,
  build: function (THREE, M, C) { return HeroKhrizantema.build(THREE, M, C); }
};
