/* ========== kpa_ground3.js - HERO models: North Korean ground rows retried with Wikipedia's own images ==========
   ROW              VEHICLE (js/eras.js full name)                      HOW
   kpa_e00_ifv      M2010 wheeled APC ("M2010 Chunma-D")               REUSED HeroRuBtr8x8.b80 (js/hero/ru_btr8x8.js,
                                                                        the BTR-80 hull, wheels and running gear) with
                                                                        its BTR-80 turret replaced by the M2010's (m2010())
   HELD (registration commented out at the foot, AGENT_POLICY rule 1):
   kpa_e80_spaag, kpa_e00_spaag, spaag_k   M-1989 twin 37 mm SPAAG      no photograph or drawing found (below)
   kpa_e90_spaag                           M1992 twin 30 mm SPAAG       no photograph or drawing found (below)
   kpa_e90_recon, kpa_e00_recon, recon_k   M-1992 armoured car          no photograph of the vehicle found (below)

   REFERENCES (cached in scratchpad/q_kpag3_ref):
     W1  en.wikipedia "List of equipment of the Korean People's Army Ground Force", the armoured fighting
         vehicles table, row "M2010" (IISS 2024 p. 282; "6x6 and 8x8 versions based on the BTR-60 and BTR-80",
         Hinata-Yamaguchi 2021 p. 139; "At least 10", Foss 2011 p. 603), photo "File:M-2010 Chunma-D.webp"
         (Wikimedia Commons, Uri Tours, CC BY-SA 4.0, 2013 Victory Day parade; Commons: "North Korean Armored
         personnel Carrier based on the BTR-80"; "extracted from" the next file).  THE ROW'S TIE TO THE PHOTO.
     W2  "File:Tank in the DPRK Victory Day Parade.jpg" (Commons; the uncropped frame of W1): two of the 8x8s,
         "501" from the front left at about 40 deg off the nose, "502" behind it nearly side-on from the left
         front.  The parade three-colour pattern and the white numbers are NOT drawn.
     What W1/W2 show, against the BTR-80 of ru_btr8x8.js (its references A-F; see its header):
       the SAME hull: four evenly spaced big tyres in two pairs with the wide gap between the second and third
       axles; the boat bow with the trim vane folded on the lower front plate; the chine round the hull; the
       driver's and commander's windscreens with their armoured shutters raised in the upper front plate; the
       headlamps in tubular guards at its corners; the side door between the second and third axles straddling
       the chine; the level roof to the stern.  Nothing in W1/W2 departs from the BTR-80 hull at their
       resolution, so ru_btr8x8.js's BTR-80 build is called unchanged for hull and wheels (rule 5).
       A DIFFERENT TURRET: a low, wide truncated cone with a twin machine-gun mount on its front right (two
       barrels side by side), three smoke-grenade tubes on its front left laid forward and up, a commander's
       hatch on the roof right (crewman standing in it, lid open behind him), a small vision dome on the roof
       left, and a man-portable SAM launcher (a long tube with the gripstock box under it) on a post on the
       roof left rear, laid aft and up on both vehicles.
     Measured off W1 (one station: vehicle "501", near-side tyres and the turret; the 1.10 m tyre of the
       BTR-80, ru_btr8x8.js RT 0.55, gives the scale, so these are ratios to the BTR-80, not published):
       - roof over ground / tyre at the front axle: 1.92 (the BTR-80 drawn: 1.95 / 1.10 = 1.77; the near
         camera and the parade crowd's eye height account for the difference) - the hull is the BTR-80's;
       - turret base across: 210 px against about 105 px a metre at the turret's depth (between the front
         tyre's 134 and the second tyre's 100 px a metre): 2.0 m; W2 "502" (nearly square on): 300 px against
         the front tyre's 185 px = 1.78 m.  Drawn 1.84 m (the BTR-80's cone: 1.32 m);
       - turret height over the roof: 60 px (W1) = 0.57 m, 75 px (W2) = 0.45 m.  Drawn 0.50 m.
     Published figures: none for the M2010 (W1 gives counts and lineage only).  BTR-80 (ru.wikipedia, via
       ru_btr8x8.js): 7.65 x 2.90 x 2.35-2.46 m.  Drawn 7.67 x 2.93 x 3.29 m (2.48 m to the turret roof; 3.29 m
       to the upper end of the SAM tube, laid aft and up as photographed: 0.78 m over the turret roof, W1 reads 0.76).
       The height over the turret roof is the BTR-80's 2.46 m plus 0.02: the M2010's turret is wider, not taller.

   HELD ROWS, the searches made (2026-11-04), one request at a time:
     - en.wikipedia "List of equipment of the Korean People's Army Ground Force": the SP AA table (M-1984,
       M-1992 23 mm, M-1992 37 mm, M-1985 57 mm) and the M1985 / M-1989 240 mm and KN-09 rows carry NO photo;
       the "M1992/1" APC row is illustrated with a BRDM-2 ("Stalin line - BRDM-2 (left).JPG"), the vehicle it is
       "based on", not the M-1992 itself - not a reference for the row.
     - en.wikipedia articles "KN-09 (multiple rocket launcher)" (no image) and "Songun-915" (redirects to
       "Pokpung-ho"; one image, the Chonma-216 of 2013).
     - en.wikipedia/Commons file searches: "Songun", "Chonma tank", "Pyongyang parade tank", "KN-09", "M1992
       North Korea", "M1989 North Korea anti-aircraft", "37 mm self-propelled anti-aircraft North Korea",
       "240 mm multiple rocket launcher North Korea", "300 mm multiple rocket launcher North Korea", "M-2010 APC",
       "North Korea anti-aircraft self-propelled", "M1992 armoured car": nothing of these vehicles.
     - ru.wikipedia file searches ("Songun", and North Korean SP AA gun, armoured car, MRL, APC in Russian): nothing.
     - Commons categories "Military vehicles of North Korea", "Armored fighting vehicles of North Korea" (BTR-80 in
       North Korean service = W1/W2 only; VTT-323), "Self-propelled multiple rocket launchers of North Korea" (BM-11,
       M-1985, M-1991), and the 65 photographs of the 2015 Workers' Party parade (categorised trucks, flags, troops):
       no M-1989, M1992 SPAAG or M-1992 car.  The TRADOC "Threat Tactics Report - North Korea vs the United States"
       (2018, Commons PDF) pictures only Soviet/Chinese types (T-62, Type 63, ZPU-2, S-60, M-1939 ...).
     - ko.wikipedia, zh.wikipedia, fr.wikipedia, ja.wikipedia: NOT REACHABLE from this machine (the network
       proxy refuses the connection: "connect_rejected"), so not searched.

   Paint: the M2010 keeps ru_btr8x8.js's BTR-80 paint (#50573f, plain green), which is within a few units of the
     KPA green of kpa_artillery.js (#50553a); the new turret uses the same material.  W1/W2 show the parade
     pattern and white numbers: not drawn.  Team colour: the BTR-80's roof strips plus one on the turret roof.

   NOT CONFIRMED (judgement, not measured or published):
     - kpa_e00_ifv: every hull detail is the BTR-80's (W1/W2 agree at their resolution; no side photograph);
       the turret ring station (the BTR-80's, x 1.05; W1 puts the turret over the front axle pair, consistent);
       the calibre of the twin mount (two barrels are seen; drawn 1.0 m long, 14.5 mm-sized); the turret's
       rear (not seen); the SAM launcher's type (an Igla-class tube, 1.6 m drawn); the hatch lid drawn closed;
       the 8x8 is drawn (W1 shows the 8x8; en.wikipedia also names a 6x6 version, not drawn).
   ENGINE (js/damage3d.js ENGINE_AT, not edited): kpa_e00_ifv falls to its role default; the BTR-80's engine is
     at the REAR (ru.wikipedia), so a front default would burn in the wrong place - see the report.
   Launchers: no row here carries "ord".
   Nodes: "turret" (origin on the ring at the roof, at rest forward), four "roadwheel" axle groups (the
     BTR-80's).  Load AFTER js/hero/ru_btr8x8.js.
   Model space: +X nose, +Y left (port), +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKpaGround3 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ---- geometry kit: copied from js/hero/pla_type63_apc.js (Bin, solid, box, cyl, flush) ---- */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function Bin(mat, uv) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
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
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  /* a body of revolution about local Z: prof = [[z, r], ...] bottom to top (ru_btr8x8.js's lathe) */
  function lathe(bin, prof, cx, cy, seg) {
    var V = [], F = [], i, j, k, a, m = prof.length;
    for (i = 0; i < m; i++) for (j = 0; j < seg; j++) {
      a = (j + 0.5) / seg * TAU;
      V.push([cx + prof[i][1] * Math.cos(a), cy + prof[i][1] * Math.sin(a), prof[i][0]]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < seg; j++) {
      k = (j + 1) % seg;
      F.push([i * seg + j, i * seg + k, (i + 1) * seg + k], [i * seg + j, (i + 1) * seg + k, (i + 1) * seg + j]);
    }
    V.push([cx, cy, prof[0][0]], [cx, cy, prof[m - 1][0]]);
    for (j = 0; j < seg; j++) { k = (j + 1) % seg; F.push([m * seg, k, j], [m * seg + 1, (m - 1) * seg + j, (m - 1) * seg + k]); }
    solid(bin, V, F);
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
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ================================================================ M2010 (kpa_e00_ifv)
     The M2010 turret, in the turret group's frame (origin on the ring at the roof, +X forward):
     a low truncated cone 1.84 m across and 0.50 m high (W1, W2, measured in the header); on its front
     right the twin machine-gun mount, two barrels side by side (W1, W2); on its front left three smoke
     tubes laid forward and up (W1); the commander's hatch on the right of the roof (W1: crewman standing
     in it); the small vision dome on the left of the roof (W2); the SAM launcher on a post on the left
     rear, laid aft and up as both W1 and W2 show it. */
  var M10 = { R0: 0.92, R1: 0.66, H: 0.50 };
  function m2010Turret(B) {
    var H = M10.H, i, s, a, c, sn;
    /* the cone, a slight shoulder at the roof edge */
    lathe(B.paint, [[0.0, M10.R0], [0.05, M10.R0], [H - 0.06, M10.R1 + 0.04], [H, M10.R1]], 0, 0, 24);
    /* the twin mount: a box housing on the front right face, two barrels side by side */
    box(B.paint, 0.48, 0.86, -0.50, -0.14, 0.14, 0.40);
    for (i = 0; i < 2; i++) {
      var y = -0.25 - i * 0.14;
      cyl(B.dark, [0.84, y, 0.30], [1.86, y, 0.32], 0.026, 0.024, 8);
      cyl(B.dark, [0.84, y, 0.30], [1.02, y, 0.305], 0.045, 0.045, 8);
    }
    /* three smoke tubes on the front left, laid forward and up (W1) */
    c = Math.cos(0.55); sn = Math.sin(0.55);
    box(B.dark, 0.50, 0.70, 0.22, 0.70, 0.24, 0.29);
    for (i = 0; i < 3; i++) {
      a = 0.30 + i * 0.17;
      cyl(B.dark, [0.58, a, 0.28], [0.58 + 0.26 * c, a + 0.04, 0.28 + 0.26 * sn], 0.045, 0.045, 10);
    }
    /* commander's hatch on the roof right: ring and lid */
    cylZ(B.paint, -0.10, -0.32, H - 0.01, H + 0.06, 0.32, 18);
    cylZ(B.dark, -0.10, -0.32, H + 0.06, H + 0.09, 0.27, 18);
    /* the vision dome on the roof left (W2) */
    lathe(B.paint, [[H - 0.01, 0.17], [H + 0.08, 0.16], [H + 0.15, 0.10], [H + 0.17, 0.0]], 0.18, 0.40, 12);
    box(B.dark, 0.30, 0.32, 0.32, 0.48, H + 0.04, H + 0.10);
    /* the SAM launcher on its post, left rear, laid aft and up (W1, W2): tube 1.6 m, the gripstock
       box under its middle */
    var PX = -0.45, PY = 0.42, PZ = H + 0.35, el = 25 * Math.PI / 180, dx = Math.cos(el), dz = Math.sin(el);
    cylZ(B.dark, PX, PY, H - 0.01, PZ - 0.04, 0.035, 8);
    box(B.dark, PX - 0.08, PX + 0.08, PY - 0.06, PY + 0.06, PZ - 0.06, PZ);
    cyl(B.paint, [PX + 0.75 * dx, PY, PZ + 0.07 - 0.75 * dz], [PX - 0.85 * dx, PY, PZ + 0.07 + 0.85 * dz], 0.04, 0.04, 10);
    box(B.dark, PX - 0.15, PX + 0.15, PY - 0.04, PY + 0.04, PZ - 0.02, PZ + 0.06);
    /* the team strip on the turret roof */
    box(B.team, -0.55, -0.30, -0.12, 0.12, H, H + 0.02);
  }

  function m2010(THREE, M, C) {
    var g = HeroRuBtr8x8.b80(THREE, M, C), old = null, paint = null, dark = null, team = null, i, ch;
    for (i = 0; i < g.children.length; i++) if (g.children[i].name === "turret") old = g.children[i];
    /* take the BTR-80's own materials so the new turret matches the hull and adds no draw calls */
    g.traverse(function (o) {
      if (!o.isMesh || o.parent === null || o.parent.name === "roadwheel") return;
      if (o.material.map && !paint) paint = o.material;
    });
    for (i = 0; i < g.children.length; i++) {
      ch = g.children[i];
      if (ch.isMesh && ch.material !== paint) {
        if (C && C.team !== undefined && ch.material.color && ch.material.color.getHex() === new THREE.Color(C.team).getHex()) team = ch.material;
      }
    }
    if (old) old.traverse(function (o) { if (o.isMesh && o.material !== paint && !dark) dark = o.material; });
    var tg = new THREE.Group();
    tg.name = "turret";
    if (old) { tg.position.copy(old.position); g.remove(old); } else tg.position.set(1.05, 0, 1.98);
    if (!paint) paint = new THREE.MeshStandardMaterial({ color: 0x50573f, roughness: 0.9, metalness: 0.05 });
    if (!dark) dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    if (!team) team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    var B = { paint: new Bin(paint, true), dark: new Bin(dark, false), team: new Bin(team, false) };
    m2010Turret(B);
    flush(THREE, tg, B);
    g.add(tg);
    g.name = "kpa_m2010";
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { m2010: m2010 };
})();

/* ------------------------------------------------------------------ registration
   len is the measured X extent of each build (tools/model3d/dump.js). */
if (typeof HeroRuBtr8x8 !== "undefined") UNIT_MODELS["kpa_e00_ifv"] = { len: 7.67, build: HeroKpaGround3.m2010 };
/* held, rule 1 (see the header):
   kpa_e80_spaag, kpa_e00_spaag, spaag_k - M-1989 twin 37 mm: no reference found (en.wikipedia list row has no photo).
   kpa_e90_spaag  - M1992 twin 30 mm: no reference found.
   kpa_e90_recon, kpa_e00_recon, recon_k - M-1992 armoured car: no reference found (the en.wikipedia list
                    shows a BRDM-2, the vehicle it is based on, not the M-1992). */
