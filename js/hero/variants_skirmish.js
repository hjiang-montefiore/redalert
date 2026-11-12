/* ============ variants_skirmish.js - HERO variants: four skirmish rows built on existing hero models ============
   Four skirmish rows (js/rules.js) whose vehicle is a later variant of a hero model another file already draws.
   Each build CALLS that file's builder (AGENT_POLICY rule 5) and then removes or adds only what the
   photographs below show to differ.  No hero file is edited and nothing is copied out of one.

     KEY         ROW (rules.js full name)     BUILT ON                                   TEAM
     fighter_c   J-10C Vigorous Dragon        HeroJ10.build   (js/hero/pla_j10.js, J-10A)    pla
     helo_c      Z-10ME Attack Helicopter     HeroZ10.build   (js/hero/pla_z10.js, Z-10)     pla
     hvy_r       M1A2T Abrams                 HeroAbrams.build(..., "sepv3") (js/hero/nato_e90_mbt.js)  roc
     ifv_r       CM-34 30mm IFV               HeroRocGround.buildYunpao (js/hero/roc_ground.js, CM-32/33)  roc

   WHAT THE BASE BUILDERS ALLOW.  Each merges its parts into one mesh per material, so a single part can be
   taken away only where it has a mesh or group of its own:
     - pla_j10.js: the black radome is its own mesh ("radome") and is removed here.  The intake trunk, the
       splitter plate and its posts are merged into "skin" and "metal" with the whole airframe: they are not
       removed.  The J-10C intake is therefore drawn as parts ADDED over the old one (a forward cowl and the
       DSI bump that hide the splitter inside them).  The nose pitot (merged into "metal", its ring into
       "dark") lies alone on the nose axis ahead of X 7.60, so its triangles are dropped from those meshes
       (stripNear, the js/hero/roc_kpa_ground2.js idiom); J1-J4 show no pitot, and no stub is drawn.
     - pla_z10.js: everything static is merged ("airframe", "fittings", ...): the side-facing round exhausts,
       the intake screens and the nose sight drum stay; the Z-10ME parts are added over them.
     - nato_e90_mbt.js: merged per material; the variant switches are its own VARIANTS table.  The SEPv3 row
       (CITV, thermal management unit, CROWS-LP, no Trophy) is called, its one textured paint material swapped
       for a plain one, and the loader's gun shield added.
     - roc_ground.js: the CM-32/33 remote weapon station is its own group ("turret") and is removed whole; the
       CM-34 turret is drawn new.  The roof box behind the old weapon station is merged into the hull and stays.

   REFERENCES (Wikimedia Commons through commons.wikimedia.org/w/thumb.php, cached in scratchpad/q_varsk_ref):
     J1 "J-10CY AUG01 07 taxiing at CCAS2025 (20250923115628).jpg" (file description "07 (single-seat J-10C)")
        - a J-10C from the STARBOARD side, nearly square on, 1600 px: the long radome and its joint, the IRST
        ball on a fairing ahead of the windscreen, the fixed refuelling probe on the starboard side, the
        intake mouth with no splitter and the bump above it, the pod across the fin near its tip.  Measured.
     J2 "J-10C LIMA 2023.jpg" - an August 1st team J-10C from the starboard side, 1280 px: the same; measured.
     J3 "J-10C 20250921.jpg" - PLAAF J-10C, front starboard 3/4: the grey radome (#585e66 sampled), the IRST,
        the probe, the fin-top pod, the plain grey paint.
     J4 "J-10C at Changchun Air Show 20250921.jpg" - the same aircraft from the front PORT 3/4: the IRST ball and
        the probe stand beyond the nose crest, so both are on the STARBOARD side; the intake mouth, cover fitted.
     J0 "China - Air Force Chengdu J-10A.jpg" (pla_j10.js's P1) - a J-10A side on, used to calibrate J1/J2.
     Z1 "(SGP-Singapore) Aviation Industry Corporation of China Changhe Z10-ME Z10ME-02 @ Singapore Airshow
        2024-02-25.jpg" - the Z-10ME, front port 3/4, 1600 px: the mast-mounted radar (a flattened ball on a
        stalk above the head), the ribbed drum at the front of each nacelle, the exhaust turned up and aft
        behind each nacelle with a pale nozzle, the large ball sensor turret in the nose.  The only Z-10ME
        photograph found on Commons (searches "Z-10ME", "Z10ME", "Changhe Z-10", "Z-10K").
     A1 "07.10 <Chinese title: President inspects M1A2T conversion training>-54645274900.jpg" (ROC Presidential Office, 2025) - an ROC M1A2T head
        on: CROWS on the commander's ring, the CITV, the loader's M240 behind an armoured shield, the smoke
        launchers, the NATO three-tone paint.
     A2 "07.10 <same Chinese title> -54645185729.jpg" - the same tanks, front right 3/4: the loader's gun
        shield with a large window and a side wing, CROWS, the bustle basket, side skirts, no Trophy.
     L1 "<Chinese title: CM-34 IFV shown at the ROC 110th National Day> (cropped).jpg" - CM-34 from the RIGHT, low, 1446 px: the turret
        profile, the wedge mantlet, the long 30 mm barrel, the smoke clusters on the turret front corners, the
        basket on the turret rear.  Turret stations measured (CM-34 TURRET below).
     L2 "<Chinese title: President Ma Ying-jeou inspects the CM-34 30 mm IFV> (cropped).jpg" - CM-34 head on, 1600 px (en.wikipedia caption "CM34
        with 30 mm cannon and modular ceramic armor"): the turret's width and height against the hull, the gun
        near the turret centre line, the coaxial MG right of it, a six-tube smoke cluster on each front corner,
        two round roof hatches, a T74 on the right hatch.  Measured.
     L3 "CM-34 of 586 Armored Brigade.jpg" - head on, on the road: the turret centred on the hull, the coaxial MG
        right of the gun, the two smoke clusters.
   PUBLISHED: en.wikipedia "Chengdu J-10" (the J-10B/C "diverterless supersonic inlet, a longer nose radome ...
     IRST ... a new electronic warning or countermeasures pod atop the vertical stabiliser"; length 16.9 m, span
     9.8 m, height 5.7 m); "Changhe Z-10" (14.2 m, 3.85 m high, rotor 13.0 m; the later "upward-facing" exhausts);
     "M1 Abrams" (9.77 m gun forward, 3.66 m wide, 2.44 m high); "Clouded Leopard Armored Vehicle" (7 x 2.7 x
     2.23 m; CM34 "30 mm Mk44 Bushmaster II chaingun", "Type 74 7.62 mm machine gun (co-axial)").

   J-10C MEASUREMENTS.  Ratios, each read off ONE photograph along the nose, scaled to pla_j10.js's own model by
     the canopy (whose length the J-10A model takes from its three-view):
              canopy rear -> windscreen foot -> radome joint -> nose tip          nose/canopy  radome/canopy
       J0 (A)        776          850              871            928                 1.05          0.77
       J2 (C)        820          997             1057           1212                 1.21          0.88
       J1 (C)       1030         1270             1325           1580                 1.29          1.06
     The model's J-10A nose (windscreen foot 5.69 to the radome tip 7.66) is 1.97 m at J0's 1.05, so the C nose
     at 1.25 (J1/J2 mean) is 2.35 m: tip at X 8.04, 0.38 m beyond the A's.  Radome 1.97 x 0.97 / 1.05 = 1.82 m
     from a joint at 6.22, against the A's 6.15: within the reading, so the joint is kept at the A's 6.15 and only
     the tip moves.  The profile is a slightly convex cone (J1), its tip on the nose axis (J1: 0.70 of the way
     down the joint section).  IRST ball (J1, 132 px/m at the nose): centre 0.42 m ahead of the windscreen foot
     (X 6.11), 0.74 m above the nose axis, 0.30 m across, on a low fairing back to the windscreen.  Refuelling
     probe (J1 and J2 averaged): root at X 4.9 low on the starboard side, bent at X 5.5 at the canopy rail
     height (Z 0.85), its tip at X 5.9.  Intake (J1, J2): the lip's leading point at X 4.95 (J1 4.97, J2 4.92),
     the lower lip back at 4.66 (J1 4.90, J2 4.42 - averaged); no splitter gap, the bump bulging into the mouth.
     Fin pod (J1, J2): a slim pod across the fin 0.2-0.5 m below its tip, 1.56 fin chords long, reaching 0.4 m
     ahead of the fin's leading edge.
   Z-10ME MEASUREMENTS (Z1, scaled on the gearbox fairing's top, 0.6 m across in pla_z10.js): radar ball 0.60 m
     across and 0.43 m high, its centre 0.55 m above the rotor hub; nacelle drum 0.57 m across, ten ribs; the
     exhaust riser about 0.6 m tall, the pale nozzle about 0.6 m long; the nose ball about as wide as the old
     sight drum.
   CM-34 TURRET (L1 mapped by a perspective fit of its four wheel hubs to the Yunpao axles 2.173 / 0.768 / -1.090
     / -2.426, which then puts the nose at 3.46, roc_ground.js's measured nose; L2 at the turret's own depth):
     turret body from X -0.85 to 0.75 (L1 px 345 and 650), mantlet to 1.30 (px 710), rear basket to -1.20 (px
     300), the smoke clusters at X 0.2-0.55 (px 500-560); body 0.45 m tall above the roof and 1.9 m wide at its
     foot (L2: 725 px of turret against the 1290 px, 2.7 m, nose plate, corrected to the turret's depth); the gun
     axis 0.42 m above the roof; the turret centred on the hull (L3).

   NOT CONFIRMED (estimated, not measured):
     fighter_c - the radome's profile between joint and tip; the IRST's lateral place (Y -0.20) and its fairing;
       the probe's lateral place (Y -0.46 to -0.55) and diameter; the intake cowl's widths and the bump's shape
       (no head-on or underside view); the fin pod's height (Z 3.30), length and diameter; the radome grey.
       Whether the J-10C has a pitot stub at the radome tip (J2 may show a few centimetres; not drawn).  The J-10A splitter plate stays inside the new cowl, hidden.  Stores, paint, gear and
       team strips are the J-10A model's (PL-12 / PL-8, not the J-10C's PL-15 / PL-10).
     helo_c - all sizes and places above (one oblique photograph): the radar's height, the drum's length (0.85 m)
       and place on the nacelle nose, the riser and nozzle (the far side drawn as a mirror of the near), the nose
       ball (r 0.31).  The side-facing round exhaust, the domed intake screen and the sight drum of pla_z10.js stay
       under the new parts (merged; not removable).  Paint is the Z-10 model's plain dark grey (Z1 is camouflaged).
     hvy_r - the loader's shield sizes (A2, by eye against the turret roof).  Everything else is the SEPv3 model.
     ifv_r - the barrel's length (L1 is elevated and foreshortened: 1.7 m drawn beyond the mantlet), the mantlet's
       width, the hatch and sight places, the basket's frame, the gun's offset (+0.08 m, L2/L3 by eye).  The CM-32
       roof box behind the old weapon station stays (merged into the hull) partly under the new basket.
   NOT DRAWN: markings, numbers, camouflage (A1/A2 three-tone, L1 three-tone, Z1 two-tone, J1/J2 display scheme);
     the Z-10ME's ammunition chute and wire cutters; the CM-34's ceramic glacis panels (L2), its turret crew; the
     J-10C's PL-15 / PL-10 load.
   PAINT: J-10C - the J-10A model's skin; radome #4a4f56 (J3 #585e66 at about 0.8).  Z-10ME - the Z-10 model's
     skin, its additions plain #40484c (pla_z10.js PAINT.base); radar #9a9e9f (Z1 lit 0.8).  M1A2T - plain
     #4a5636, the green of the NATO three-tone A1/A2 show (nato_e90_mbt.js's own untextured "nato" colour).
     CM-34 - the Yunpao's own paint material (roc_ground.js PAINT.cm32), reused from the hull it builds.
   NODES: fighter_c "gear" (pla_j10.js).  helo_c "rotor" (with "rotordisc" inside it) and "tailrotor"
     (pla_z10.js, unchanged; the radar is static, on the mast above the head).  hvy_r "turret" (nato_e90_mbt.js;
     the shield is added inside it).  ifv_r "turret" (new, origin on the ring at the roof, gun along +X) and the
     four "roadwheel" axle groups (roc_ground.js).
   LOAD ORDER: after js/hero/pla_j10.js, js/hero/pla_z10.js, js/hero/nato_e90_mbt.js and js/hero/roc_ground.js
     (and after the generic armour/air spec files that register these keys).  A missing base leaves its row on
     its old model.  Model space: +X nose, +Y left (port), +Z up, metres.  ASCII only.
   DETAIL PASS 2 (the owner: the models looked plainer than the old ones): hvy_r: the plain green is a canvas (dpWeather: seams, bolts, panels, grime; no camouflage), and the
     crew's kit is added in the bustle rack and on the turret-side boxes in its own canvas-coloured material
     (mesh "m1a2t_kit").  8452 -> 9196 tris, 13 -> 14 draw calls.  The other three rows are unchanged.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroVariantsSkirmish = (function () {
  "use strict";
  var V = null, PI = Math.PI;

  /* ------------------------------------------------------------------ kit */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); }
  /* a box from its corner ranges */
  function bx(x0, x1, y0, y1, z0, z1) { return box(x1 - x0, y1 - y0, z1 - z0, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); }
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 8, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs);
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(g, x, y, z);
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* a superelliptic section across X, optionally raked (x moves with z), as the pla_j10.js sections are read */
  function sec(x, yc, zc, w, hu, hl, e, rake) { return { x: x, yc: yc, zc: zc, w: w, hu: hu, hl: hl, e: e || 1, rake: rake || 0 }; }
  function ring(s, n) {
    var o = [], j, t, c, sn, z;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      z = s.zc + (sn >= 0 ? s.hu : -s.hl) * Math.pow(Math.abs(sn), s.e);
      o.push([s.x + s.rake * (z - s.zc), s.yc + s.w * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), s.e), z]);
    }
    return o;
  }
  /* loft through rings of equal count (each ring a closed list of points); smooth normals; optional fan caps */
  function loftRings(R, capA, capB) {
    var n = R[0].length, pos = [], idx = [], i, j, out = [];
    for (i = 0; i < R.length; i++) for (j = 0; j < n; j++) pos.push(R[i][j][0], R[i][j][1], R[i][j][2]);
    for (i = 0; i < R.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, c = (i + 1) * n + j, d = (i + 1) * n + (j + 1) % n;
      idx.push(a, b, c, b, d, c);
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    out.push(g);
    function cap(r, flip) {
      var cx = 0, cy = 0, cz = 0, t = [], k;
      for (k = 0; k < n; k++) { cx += r[k][0]; cy += r[k][1]; cz += r[k][2]; }
      var o = [cx / n, cy / n, cz / n];
      for (k = 0; k < n; k++) { if (flip) t.push(o, r[(k + 1) % n], r[k]); else t.push(o, r[k], r[(k + 1) % n]); }
      return tris(t);
    }
    if (capA) out.push(cap(R[0], true));
    if (capB) out.push(cap(R[R.length - 1], false));
    return out;
  }
  function loft(secs, n, capA, capB) {
    var R = [], i;
    for (i = 0; i < secs.length; i++) R.push(ring(secs[i], n));
    return loftRings(R, capA, capB);
  }

  /* bins of geometry, one mesh per material */
  function Bins() { this.list = {}; this.order = []; }
  Bins.prototype.add = function (key, g) {
    if (!this.list[key]) { this.list[key] = []; this.order.push(key); }
    if (g instanceof Array) for (var i = 0; i < g.length; i++) this.list[key].push(g[i]);
    else this.list[key].push(g);
  };
  function merge(list, uvScale) {
    var pos = [], nor = [], uv = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, nn = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(nn[j]); }
      for (j = 0; j < p.length; j += 3) uv.push((p[j] + p[j + 1] * 0.5) * uvScale, (p[j + 2] + p[j + 1] * 0.5) * uvScale);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uv, 2));
    return out;
  }
  function flush(parent, B, mats, prefix) {
    for (var i = 0; i < B.order.length; i++) {
      var k = B.order[i];
      if (!B.list[k].length || !mats[k]) continue;
      var m = new V.Mesh(merge(B.list[k], 0.25), mats[k]);
      m.name = prefix + "_" + k;
      m.castShadow = true; m.receiveShadow = true;
      parent.add(m);
    }
  }
  function mat(hex, rough, metal, extra) {
    var o = { color: hex, roughness: rough, metalness: metal, side: V.DoubleSide };
    if (extra) for (var k in extra) o[k] = extra[k];
    return new V.MeshStandardMaterial(o);
  }
  function teamMat(C) {
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    return new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.6, metalness: 0.1, side: V.DoubleSide });
  }
  function dropNamed(root, name) {
    var o = root.getObjectByName(name);
    if (o && o.parent) { o.parent.remove(o); return true; }
    return false;
  }

  /* drop the triangles of a merged mesh lying wholly ahead of x0 within radius r of the nose axis
     (the js/hero/roc_kpa_ground2.js stripGun idiom); the mesh gets a new filtered geometry */
  function stripNear(mesh, x0, r) {
    if (!mesh || !mesh.geometry) return;
    var geo = mesh.geometry, P = geo.getAttribute("position"), idx = geo.index, n = idx ? idx.count : P.count;
    var keep = [], t, k, v, drop;
    for (t = 0; t < n; t += 3) {
      drop = true;
      for (k = 0; k < 3; k++) {
        v = idx ? idx.getX(t + k) : t + k;
        if (!(P.getX(v) > x0 && Math.sqrt(P.getY(v) * P.getY(v) + P.getZ(v) * P.getZ(v)) < r)) { drop = false; break; }
      }
      if (!drop) for (k = 0; k < 3; k++) keep.push(idx ? idx.getX(t + k) : t + k);
    }
    var g2 = new V.BufferGeometry();
    ["position", "normal", "uv", "color"].forEach(function (nm) {
      var A = geo.getAttribute(nm), w, o, i, j;
      if (!A) return;
      w = A.itemSize; o = new Float32Array(keep.length * w);
      for (i = 0; i < keep.length; i++) for (j = 0; j < w; j++) o[i * w + j] = A.array[keep[i] * w + j];
      g2.setAttribute(nm, new V.BufferAttribute(o, w));
    });
    mesh.geometry = g2;
  }

  /* ============================================================ J-10C ===
     pla_j10.js model space: Z 0 is the nose axis, tyres at Z -2.12. */
  function buildJ10C(THREE, M, C) {
    var g = HeroJ10.build(THREE, M, C);
    V = THREE;
    dropNamed(g, "radome");                     /* the J-10A's short black radome: its own mesh */
    /* the J-10A's nose pitot (X 7.66 to 8.57 on the nose axis, merged into "metal", its ring into "dark"):
       J1-J4 show none on the J-10C, so its triangles are dropped from those two meshes (copies of the
       geometry; pla_j10.js is not touched).  No stub is drawn: none is resolved in the references. */
    stripNear(g.getObjectByName("metal"), 7.60, 0.06);
    stripNear(g.getObjectByName("dark"), 7.60, 0.06);
    var B = new Bins(), i, s;
    var T = { skin: mat(0x97a2b2, 0.80, 0.08), belly: mat(0xa1abb8, 0.80, 0.08), radome: mat(0x4a4f56, 0.55, 0.10),
              dark: mat(0x17191b, 0.75, 0.2), glass: mat(0x26353c, 0.12, 0.35), metal: mat(0x6a6d70, 0.45, 0.6) };

    /* ---- the long radome: the A's joint section (X 6.15) to the tip at 8.04 on the nose axis (J1, J2) */
    var rs = [], N = 14;
    for (i = 0; i <= N; i++) {
      var t = i / N, f = (1 - t) * (1 + 0.35 * t);
      rs.push(sec(6.15 + 1.89 * t, 0, 0.10 * (1 - t), 0.49 * f + 0.0005, 0.51 * f + 0.0005, 0.37 * f + 0.0005, 1.0));
    }
    B.add("radome", loft(rs, 40, false, true));

    /* ---- IRST ball ahead of the windscreen, starboard of the crest (J1, J3, J4), on its fairing */
    var IX = 6.11, IY = -0.20, IZ = 0.72;
    B.add("skin", cyl(0.125, 0.14, 0.18, 16, "z", IX, IY, 0.58));
    B.add("glass", sph(0.15, 18, 12, IX, IY, IZ));
    B.add("skin", loft([sec(IX - 0.02, IY, 0.60, 0.11, 0.08, 0.08, 1.0), sec(5.82, IY, 0.62, 0.10, 0.06, 0.08, 1.0),
                        sec(5.66, IY, 0.66, 0.08, 0.03, 0.06, 1.0)], 14, true, true));

    /* ---- fixed refuelling probe, starboard side (J1-J4): root low, bent at the canopy rail, tip forward */
    B.add("skin", box(0.30, 0.10, 0.14, 4.92, -0.54, 0.30));
    B.add("metal", bar([4.92, -0.53, 0.30], [5.42, -0.46, 0.85], 0.055, 10));
    B.add("metal", sph(0.055, 10, 6, 5.42, -0.46, 0.85));
    B.add("metal", bar([5.42, -0.46, 0.85], [5.86, -0.46, 0.86], 0.05, 10));
    B.add("dark", cyl(0.05, 0.035, 0.10, 10, "x", 5.91, -0.46, 0.86));

    /* ---- the DSI: the bump under the nose ahead of the mouth (no splitter gap: J1, J2) */
    B.add("belly", loft([sec(5.62, 0, -0.22, 0.18, 0.04, 0.05, 1.0), sec(5.30, 0, -0.22, 0.42, 0.04, 0.13, 0.9),
                         sec(5.00, 0, -0.22, 0.55, 0.04, 0.18, 0.85), sec(4.70, 0, -0.22, 0.60, 0.04, 0.18, 0.85),
                         sec(4.40, 0, -0.22, 0.60, 0.04, 0.15, 0.85)], 28, true, true));
    /* ---- the cowl: its lip forward to X 4.95 (upper) / 4.66 (lower), fairing back onto the A's trunk;
       it encloses the A's raked mouth, splitter plate and posts (merged in pla_j10.js, not removable) */
    var RK = 0.475, CE = 0.36;
    B.add("belly", loft([sec(4.805, 0, -0.615, 0.70, 0.315, 0.315, CE, RK), sec(4.30, 0, -0.615, 0.70, 0.315, 0.315, CE, RK),
                         sec(3.60, 0, -0.615, 0.705, 0.315, 0.315, CE, 0), sec(2.70, 0, -0.61, 0.71, 0.31, 0.31, CE, 0)],
                        32, false, true));
    var lip = ring(sec(4.808, 0, -0.615, 0.70, 0.315, 0.315, CE, RK), 32);
    for (i = 0; i < 32; i++) B.add("belly", bar(lip[i], lip[(i + 1) % 32], 0.02, 4));
    /* the dark duct 0.3 m deep behind the lip */
    B.add("dark", loft([sec(4.79, 0, -0.615, 0.675, 0.29, 0.29, CE, RK), sec(4.50, 0, -0.615, 0.665, 0.28, 0.28, CE, RK)], 32, false, true));

    /* ---- the pod across the fin near its tip (J1-J3).  Fin LE at Z 3.30: -6.85; TE -8.44 */
    var PZ = 3.30;
    B.add("skin", loft([sec(-6.40, 0, PZ, 0.005, 0.005, 0.005), sec(-6.62, 0, PZ, 0.08, 0.08, 0.08), sec(-6.95, 0, PZ, 0.11, 0.11, 0.11),
                        sec(-8.40, 0, PZ, 0.11, 0.11, 0.11), sec(-8.62, 0, PZ, 0.08, 0.08, 0.08)], 16, true, true));
    B.add("dark", cyl(0.07, 0.07, 0.04, 12, "x", -8.64, 0, PZ));

    var add = new V.Group();
    add.name = "j10c_parts";
    flush(add, B, T, "j10c");
    g.add(add);
    return g;
  }

  /* =========================================================== Z-10ME ===
     pla_z10.js model space: the origin under the mast, the wheels' contact plane at Z -1.70. */
  function buildZ10ME(THREE, M, C) {
    var g = HeroZ10.build(THREE, M, C);
    V = THREE;
    var GR = -1.70;
    function Z(h) { return GR + h; }
    var B = new Bins(), s, k;
    var T = { skin: mat(0x40484c, 0.78, 0.12), dark: mat(0x1e2224, 0.7, 0.3), rib: mat(0x2b3134, 0.6, 0.35),
              pale: mat(0x9a9e9f, 0.6, 0.08), glass: mat(0x1d2a33, 0.12, 0.35) };

    /* ---- mast-mounted radar: a flattened ball on a stalk above the head (Z1) */
    B.add("rib", cyl(0.07, 0.07, 0.32, 12, "z", 0, 0, Z(4.01)));
    B.add("rib", cyl(0.10, 0.13, 0.08, 14, "z", 0, 0, Z(4.14)));
    B.add("pale", sph(0.30, 24, 12, 0, 0, Z(4.32), 1, 1, 0.72));

    for (s = -1; s <= 1; s += 2) {
      /* ---- the ribbed drum on each nacelle nose (Z1), over pla_z10.js's domed intake screen */
      var DY = s * 0.78, DZ = Z(2.46);
      B.add("skin", cyl(0.30, 0.30, 0.85, 22, "x", 0.52, DY, DZ));
      for (k = 0; k < 10; k++) B.add("rib", cyl(0.325, 0.325, 0.035, 22, "x", 0.90 - k * 0.085, DY, DZ));
      B.add("dark", cyl(0.26, 0.26, 0.02, 20, "x", 0.955, DY, DZ));
      B.add("skin", cyl(0.31, 0.31, 0.03, 22, "x", 0.94, DY, DZ));

      /* ---- the exhaust turned up and aft (Z1): a collar over the old round nozzle, a riser, a pale nozzle */
      var col = cyl(0.36, 0.36, 0.22, 18, "x", 0, 0, 0);
      col.rotateZ(s * 40 * PI / 180);
      col.translate(-2.74, s * 1.00, Z(2.30));
      B.add("skin", col);
      B.add("skin", bar([-2.82, s * 1.02, Z(2.30)], [-2.88, s * 1.02, Z(2.92)], 0.17, 14));
      B.add("skin", sph(0.17, 14, 8, -2.88, s * 1.02, Z(2.95)));
      B.add("pale", loft([sec(-2.86, s * 1.02, Z(2.97), 0.15, 0.15, 0.15), sec(-3.10, s * 1.02, Z(3.00), 0.17, 0.15, 0.15),
                          sec(-3.36, s * 1.02, Z(3.03), 0.15, 0.13, 0.13), sec(-3.48, s * 1.02, Z(3.04), 0.11, 0.09, 0.09)], 16, true, false));
      B.add("dark", cyl(0.10, 0.10, 0.02, 14, "x", -3.485, s * 1.02, Z(3.04)));
    }

    /* ---- the ball sensor turret in the nose (Z1), round the lower half of the old sight drum */
    B.add("dark", sph(0.31, 22, 14, 4.55, 0, Z(1.05)));
    B.add("glass", cyl(0.15, 0.15, 0.03, 16, "x", 4.855, 0.05, Z(1.05)));
    B.add("glass", cyl(0.06, 0.06, 0.03, 10, "x", 4.84, -0.15, Z(1.12)));

    var add = new V.Group();
    add.name = "z10me_parts";
    flush(add, B, T, "z10me");
    g.add(add);
    /* the draw-call budget (16 a vehicle): the radar stalk and drum ribs and the dark discs and nose
       ball are drawn with pla_z10.js's dark fittings, all static (Armour3D.tint keeps each colour,
       written linear, and its diffuse; the rib's metalness is the fittings' own, roughness 0.60 /
       0.70 -> 0.62; all three are closed solids wound outward, so the fittings' single side draws
       them as the double side did), then join - "z10me_rib" and "z10me_dark" stay, empty. 18 -> 16 */
    var fd = null, rib = null, dk = null, ch = g.children, i;
    for (i = 0; i < ch.length; i++) if (ch[i].isMesh && ch[i].name === "fittings_dark") fd = ch[i];
    for (i = 0; i < add.children.length; i++) {
      if (add.children[i].name === "z10me_rib") rib = add.children[i];
      if (add.children[i].name === "z10me_dark") dk = add.children[i];
    }
    if (typeof Armour3D !== "undefined" && Armour3D.tint && Armour3D.join && fd && rib && dk) {
      Armour3D.tint(THREE, [g, add], [[fd.material], [rib.material], [dk.material]], { fittings_dark: 1, z10me_rib: 1, z10me_dark: 1 });
      Armour3D.join(THREE, fd, [rib, dk]);
    }
    return g;
  }

  /* =========================================================== M1A2T ===
     nato_e90_mbt.js: ground at z 0, turret group "turret" at the ring (0.15, 0, 1.48). */
  /* DETAIL PASS 2: the weathered paint.  The module's own paint canvas (or a flat base colour) drawn
     onto a 512 px tile, then plate seams with a lit edge, bolt rows along some of them, access-panel
     outlines with corner screws, rain streaks, grime and dust, chipped paint and oil spots.  Plain
     paint: no markings, numbers or camouflage.  Cached per source. */
  var __DPW = {};
  function dpWeather(THREE, src, base, seed) {
    var key = (src && src.uuid ? src.uuid : "flat") + "|" + base + "|" + seed;
    if (__DPW[key] !== undefined) return __DPW[key];
    var t = null;
    try {
      var S = 512, cv = document.createElement("canvas"), q, i, k, x, y, w, h, n, xs = [];
      var rs = (seed * 7 + 13) >>> 0, R = function () { rs = (Math.imul(rs, 1664525) + 1013904223) >>> 0; return rs / 4294967296; };
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = base || "#555544"; q.fillRect(0, 0, S, S);
      if (src && src.image) { try { q.drawImage(src.image, 0, 0, S, S); } catch (e) { /* flat base */ } }
      /* plate seams: four vertical butts, horizontal seams staggered between them, a bolt row on some */
      for (i = 0; i < 4; i++) xs.push(Math.floor(i * 128 + 20 + R() * 80) + 0.5);
      for (i = 0; i < 4; i++) {
        q.globalAlpha = 1; q.strokeStyle = "rgba(14,15,10,0.42)"; q.lineWidth = 2;
        q.beginPath(); q.moveTo(xs[i], 0); q.lineTo(xs[i], S); q.stroke();
        q.strokeStyle = "rgba(255,250,225,0.12)"; q.lineWidth = 1;
        q.beginPath(); q.moveTo(xs[i] + 2, 0); q.lineTo(xs[i] + 2, S); q.stroke();
        y = Math.floor(60 + R() * 120) + 0.5;
        for (k = 0; k < 2; k++) {
          var xa = xs[i], xb = i < 3 ? xs[i + 1] : xs[0] + S;
          q.strokeStyle = "rgba(14,15,10,0.38)"; q.lineWidth = 2;
          q.beginPath(); q.moveTo(xa, y); q.lineTo(xb, y); q.stroke();
          q.beginPath(); q.moveTo(xa - S, y); q.lineTo(xb - S, y); q.stroke();
          q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1;
          q.beginPath(); q.moveTo(xa, y + 2); q.lineTo(xb, y + 2); q.stroke();
          if ((i + k) % 2 === 0) for (x = xa + 8; x < xb - 4; x += 15) {
            q.fillStyle = "rgba(12,12,8,0.45)"; q.fillRect(x % S, y - 6, 3, 3);
            q.fillStyle = "rgba(255,250,225,0.18)"; q.fillRect(x % S, y - 7, 2, 1);
          }
          y = (y + 200 + Math.floor(R() * 60)) % S;
        }
      }
      /* access panels, a screw at each corner */
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * (S - 90)) + 10.5; y = Math.floor(R() * (S - 70)) + 10.5; w = 26 + Math.floor(R() * 60); h = 18 + Math.floor(R() * 44);
        q.strokeStyle = "rgba(14,15,10,0.36)"; q.lineWidth = 1.5; q.strokeRect(x, y, w, h);
        q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1; q.strokeRect(x + 1.5, y + 1.5, w, h);
        q.fillStyle = "rgba(12,12,8,0.5)";
        q.fillRect(x + 3, y + 3, 2, 2); q.fillRect(x + w - 5, y + 3, 2, 2); q.fillRect(x + 3, y + h - 5, 2, 2); q.fillRect(x + w - 5, y + h - 5, 2, 2);
      }
      /* rain streaks, grime and dust, chips and scratches, oil spots */
      for (i = 0; i < 260; i++) { q.fillStyle = (i % 4) ? "rgba(18,16,10,0.08)" : "rgba(230,225,200,0.06)"; q.fillRect(R() * S, R() * S, 1 + R() * 2, 8 + R() * 54); }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 3) ? "rgba(30,25,15,0.08)" : "rgba(150,135,100,0.08)";
        q.beginPath(); q.ellipse(R() * S, R() * S, 8 + R() * 46, 4 + R() * 22, R() * Math.PI, 0, 2 * Math.PI); q.fill();
      }
      for (i = 0; i < 180; i++) { q.fillStyle = (i % 2) ? "rgba(205,200,175,0.22)" : "rgba(10,10,8,0.30)"; n = 1 + Math.floor(R() * 3); q.fillRect(R() * S, R() * S, n, n); }
      q.strokeStyle = "rgba(210,205,180,0.14)"; q.lineWidth = 1;
      for (i = 0; i < 14; i++) { x = R() * S; y = R() * S; q.beginPath(); q.moveTo(x, y); q.lineTo(x + (R() - 0.5) * 40, y + (R() - 0.5) * 14); q.stroke(); }
      for (i = 0; i < 8; i++) { q.fillStyle = "rgba(12,10,6,0.16)"; q.beginPath(); q.ellipse(R() * S, R() * S, 5 + R() * 12, 4 + R() * 9, 0, 0, 2 * Math.PI); q.fill(); }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (src && src.repeat && t.repeat) t.repeat.copy(src.repeat);
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    __DPW[key] = t;
    return t;
  }
  function buildM1A2T(THREE, M, C) {
    var g = HeroAbrams.build(THREE, M, C, "sepv3");
    V = THREE;
    /* plain paint: the one textured material (the merged SKIN) becomes plain green.  DETAIL PASS 2: the
       green is a canvas now (dpWeather over the flat #4a5636: plate seams, bolt rows, panels, streaks,
       grime and chips - no camouflage, no markings), in place of the flat colour */
    var plain = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.90, metalness: 0.05, flatShading: true });
    var ptx = dpWeather(V, null, "#4a5636", 1992);
    if (ptx) { ptx.repeat.set(0.85, 0.85); plain.map = ptx; } else plain.color.setHex(0x4a5636);
    g.traverse(function (o) { if (o.isMesh && o.material && o.material.map) o.material = plain; });
    var tur = g.getObjectByName("turret");
    if (!tur) return g;
    /* ---- the loader's armoured gun shield (A1, A2): a front plate with a large window ahead of the M240 on
       its skate, and a windowed side wing outboard.  Turret-local: loader's hatch at (-0.18, 0.76). */
    var B = new Bins(), T = { skin: plain, glass: mat(0x2b3a44, 0.10, 0.10) };
    var FX = 0.36, Y0 = 0.55, Y1 = 1.17, Z0 = 1.08, Z1 = 1.60, WZ0 = 1.32, WZ1 = 1.52;
    B.add("skin", bx(FX - 0.02, FX + 0.02, Y0, Y1, Z0, WZ0));            /* below the window: the gun passes here */
    B.add("skin", bx(FX - 0.02, FX + 0.02, Y0, Y1, WZ1, Z1));
    B.add("skin", bx(FX - 0.02, FX + 0.02, Y0, Y0 + 0.08, WZ0, WZ1));
    B.add("skin", bx(FX - 0.02, FX + 0.02, Y1 - 0.08, Y1, WZ0, WZ1));
    B.add("glass", bx(FX - 0.012, FX + 0.012, Y0 + 0.08, Y1 - 0.08, WZ0, WZ1));
    B.add("skin", bx(FX - 0.34, FX - 0.02, Y1 - 0.04, Y1, Z0, WZ0));      /* the side wing, its window above */
    B.add("skin", bx(FX - 0.34, FX - 0.02, Y1 - 0.04, Y1, WZ1, Z1 - 0.04));
    B.add("skin", bx(FX - 0.34, FX - 0.26, Y1 - 0.04, Y1, WZ0, WZ1));
    B.add("glass", bx(FX - 0.26, FX - 0.02, Y1 - 0.03, Y1 - 0.01, WZ0, WZ1));
    B.add("skin", bx(FX - 0.10, FX - 0.02, Y0 + 0.22, Y0 + 0.30, 0.94, Z0));   /* its post on the hatch ring */
    /* DETAIL PASS 2: the crew's kit in the bustle rack (A2 shows it loaded; contents by proportion, NOT
       CONFIRMED) - kit bags strapped in a row, a rolled tarpaulin across the top, two jerrycans at the
       right end.  The kit is its own canvas-coloured material ("m1a2t_kit", one more draw call, 14) so it
       reads against the green; the jerrycans are in the plain paint */
    T.kit = mat(0x6a6247, 0.95, 0.02);
    var bi, bxs = [-1.22, -0.84, -0.46, -0.08, 0.30];
    for (bi = 0; bi < bxs.length; bi++) {
      var bh = 0.40 + (bi % 2) * 0.12;
      B.add("kit", bx(-2.99, -2.67, bxs[bi], bxs[bi] + 0.36, 0.30, 0.30 + bh));
      B.add("kit", bx(-3.005, -2.655, bxs[bi] + 0.16, bxs[bi] + 0.20, 0.30, 0.31 + bh));
    }
    B.add("kit", cyl(0.11, 0.11, 2.30, 12, "y", -2.83, 0, 0.86));
    for (bi = 0; bi < 3; bi++) B.add("kit", cyl(0.122, 0.122, 0.05, 12, "y", -2.83, -0.8 + bi * 0.8, 0.86));
    /* a rolled tarpaulin or net strapped on each turret-side stowage box (A2) */
    for (bi = -1; bi <= 1; bi += 2) {
      B.add("kit", cyl(0.09, 0.09, 1.10, 12, "x", -1.10, bi * 1.71, 0.91));
      for (var bj = 0; bj < 3; bj++) B.add("kit", cyl(0.10, 0.10, 0.04, 12, "x", -1.50 + bj * 0.40, bi * 1.71, 0.91));
    }
    for (bi = 0; bi < 2; bi++) {
      B.add("skin", bx(-2.99, -2.66, 0.80 + bi * 0.18, 0.96 + bi * 0.18, 0.30, 0.77));
      B.add("skin", bx(-2.90, -2.75, 0.85 + bi * 0.18, 0.91 + bi * 0.18, 0.77, 0.80));
    }
    flush(tur, B, T, "m1a2t");
    return g;
  }

  /* ============================================================ CM-34 ===
     roc_ground.js Yunpao: ground at z 0, roof at 2.23, axles 2.173 / 0.768 / -1.090 / -2.426. */
  var CM = { TX: -0.05, RZ: 2.23, GY: 0.08, GZ: 0.42 };
  function buildCM34(THREE, M, C) {
    var g = HeroRocGround.buildYunpao(THREE, C);
    V = THREE;
    dropNamed(g, "turret");                     /* the CM-32/33 remote weapon station: its own group */
    var paint = null;
    g.traverse(function (o) { if (!paint && o.isMesh && o.material && o.material.map) paint = o.material; });
    var T = { paint: paint || mat(0x5d7a46, 0.88, 0.07), dark: mat(0x25272a, 0.78, 0.3), glass: mat(0x1d2a33, 0.14, 0.35),
              team: teamMat(C) };
    var B = new Bins(), s, i, j;

    /* ---- the turret body: a faceted frustum, sides and front leaning in (L1, L2), on the roof */
    var foot = [[0.80, -0.55, 0], [0.80, 0.55, 0], [0.50, 0.95, 0], [-0.80, 0.95, 0], [-0.80, -0.95, 0], [0.50, -0.95, 0]];
    var top = [[0.55, -0.42, 0.45], [0.55, 0.42, 0.45], [0.35, 0.76, 0.45], [-0.74, 0.78, 0.45], [-0.74, -0.78, 0.45], [0.35, -0.76, 0.45]];
    var body = loftRings([foot, top], true, true);
    for (i = 0; i < body.length; i++) body[i] = body[i].toNonIndexed(), body[i].computeVertexNormals();
    B.add("paint", body);
    /* bolted plate joints on the sides (L2) */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) B.add("dark", bx(0.10 - i * 0.40, 0.12 - i * 0.40, s * 0.95 - 0.01, s * 0.95 + 0.01, 0.04, 0.20));

    /* ---- the wedge mantlet round the gun, the 30 mm Mk44 barrel and its muzzle device (L1, L2) */
    var GY = CM.GY, GZ = CM.GZ;
    B.add("paint", loftRings([
      [[0.50, GY - 0.25, 0.16], [0.50, GY + 0.25, 0.16], [0.50, GY + 0.25, 0.58], [0.50, GY - 0.25, 0.58]],
      [[1.15, GY - 0.15, 0.30], [1.15, GY + 0.15, 0.30], [1.15, GY + 0.15, 0.52], [1.15, GY - 0.15, 0.52]]], false, true));
    B.add("dark", cyl(0.085, 0.085, 0.30, 14, "x", 1.28, GY, GZ));
    B.add("dark", cyl(0.048, 0.048, 1.70, 12, "x", 2.28, GY, GZ));
    B.add("dark", cyl(0.072, 0.072, 0.22, 12, "x", 3.20, GY, GZ));
    /* the coaxial T74, right of the gun (L2, L3) */
    B.add("dark", bx(0.40, 0.62, -0.32, -0.20, 0.32, 0.44));
    B.add("dark", cyl(0.025, 0.025, 0.40, 8, "x", 0.80, -0.26, 0.38));

    /* ---- a six-tube smoke cluster on each front corner, aimed forward, up and out (L1, L2, L3) */
    for (s = -1; s <= 1; s += 2) {
      var cx = 0.40, cy = s * 0.78, cz = 0.40;
      B.add("paint", bx(cx - 0.16, cx + 0.06, cy - 0.12, cy + 0.12, cz - 0.12, cz - 0.02));
      var d = [0.85, s * 0.30, 0.43], L = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
      d = [d[0] / L, d[1] / L, d[2] / L];
      for (i = 0; i < 2; i++) for (j = 0; j < 3; j++) {
        var o = [cx, cy + (j - 1) * 0.10, cz + i * 0.09 + (j === 1 ? 0.045 : 0)];
        B.add("dark", bar(o, [o[0] + d[0] * 0.22, o[1] + d[1] * 0.22, o[2] + d[2] * 0.22], 0.045, 8));
      }
    }

    /* ---- two round roof hatches (L2): the commander right, the gunner left; a sight block ahead of each */
    var H = [[-0.15, -0.40], [-0.25, 0.38]];
    for (i = 0; i < 2; i++) {
      B.add("paint", cyl(0.30, 0.30, 0.06, 18, "z", H[i][0], H[i][1], 0.48));
      B.add("paint", cyl(0.26, 0.26, 0.05, 18, "z", H[i][0], H[i][1], 0.53));
      B.add("paint", bx(H[i][0] + 0.30, H[i][0] + 0.48, H[i][1] - 0.14, H[i][1] + 0.14, 0.45, 0.60));
      B.add("glass", bx(H[i][0] + 0.48, H[i][0] + 0.49, H[i][1] - 0.10, H[i][1] + 0.10, 0.50, 0.57));
    }
    /* the T74 on the commander's hatch (L2) */
    B.add("dark", bar([-0.05, -0.62, 0.50], [-0.05, -0.62, 0.78], 0.025, 6));
    B.add("dark", bx(-0.25, 0.20, -0.66, -0.58, 0.76, 0.86));
    B.add("dark", cyl(0.02, 0.02, 0.50, 8, "x", 0.45, -0.62, 0.81));

    /* ---- the stowage basket on the turret rear (L1): a tubular frame */
    var BX0 = -0.78, BX1 = -1.15;
    for (s = -1; s <= 1; s += 2) {
      B.add("dark", bar([BX0, s * 0.78, 0.10], [BX1, s * 0.78, 0.10], 0.02, 6));
      B.add("dark", bar([BX0, s * 0.78, 0.42], [BX1, s * 0.78, 0.42], 0.02, 6));
      B.add("dark", bar([BX1, s * 0.78, 0.10], [BX1, s * 0.78, 0.42], 0.02, 6));
    }
    B.add("dark", bar([BX1, -0.78, 0.10], [BX1, 0.78, 0.10], 0.02, 6));
    B.add("dark", bar([BX1, -0.78, 0.42], [BX1, 0.78, 0.42], 0.02, 6));
    for (i = 0; i < 4; i++) B.add("dark", bar([BX1, -0.78 + i * 0.52, 0.10], [BX1, -0.78 + i * 0.52, 0.42], 0.015, 6));
    B.add("dark", bx(BX1, BX0, -0.78, 0.78, 0.08, 0.10));

    /* ---- team colour: a strip along each roof edge */
    for (s = -1; s <= 1; s += 2) B.add("team", bx(-0.60, 0.10, s * 0.70 - 0.05, s * 0.70 + 0.05, 0.45, 0.465));

    var tg = new V.Group();
    tg.name = "turret";
    tg.position.set(CM.TX, 0, CM.RZ);
    flush(tg, B, T, "cm34");
    g.add(tg);
    return g;
  }

  return { buildJ10C: buildJ10C, buildZ10ME: buildZ10ME, buildM1A2T: buildM1A2T, buildCM34: buildCM34 };
})();

/* Registration: only when the base hero is loaded; len is the measured X extent (tools/model3d/dump.js):
   J-10C 16.70 (the radome tip 8.04 to the fin pod -8.66), Z-10ME 16.41, M1A2T 9.77, CM-34 7.04 (as their bases). */
if (typeof HeroJ10 !== "undefined")
  UNIT_MODELS["fighter_c"] = { len: 16.70, build: HeroVariantsSkirmish.buildJ10C };
if (typeof HeroZ10 !== "undefined")
  UNIT_MODELS["helo_c"] = { len: 16.41, build: HeroVariantsSkirmish.buildZ10ME };
if (typeof HeroAbrams !== "undefined")
  UNIT_MODELS["hvy_r"] = { len: 9.77, build: HeroVariantsSkirmish.buildM1A2T };
if (typeof HeroRocGround !== "undefined")
  UNIT_MODELS["ifv_r"] = { len: 7.04, build: HeroVariantsSkirmish.buildCM34 };
