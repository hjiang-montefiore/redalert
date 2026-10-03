/* ========== us_ef111a.js - HERO MODEL: General Dynamics/Grumman EF-111A Raven (e80, NATO) ==========

   Registered: nato_e80_ewair.

   Built from a published three-view (Wikimedia Commons, "General Dynamics
   EF-111A Raven 3-view line drawing") and a USAF photograph of 66-0015 parked
   on the apron at Cannon AFB, nose left. Published figures used: length
   23.16 m, span 19.20 m wings spread (16 deg) / 9.74 m fully swept (72.5 deg),
   height 6.10 m.

   WING POSITION: the model is parked WINGS SWEPT. The reference photograph
   shows exactly that - the Raven standing on its apron with the wings folded
   back along the fuselage - and parked F-111s were routinely left that way.
   Span 9.74 m, which also lets the type stand between the airbase revetment
   walls. (Spread, 19.2 m on 23.16 m of length, would be a quite different
   aeroplane in the game's scale-by-length drawing.)

   What makes it an EF-111A and not an F-111: the fin-tip pod (ALQ-99 receivers,
   from the fin top a little forward and well aft of the fin), the long ventral
   "canoe" radome (ALQ-99 jamming transmitters) in the weapons bay, the missing
   gun/pylons (no stores). Side-by-side crew capsule under a hinged canopy,
   the long ogival radome, two side intakes with half-cone spikes.

   Not confirmed from the references and therefore approximate: the exact
   intake lip station, the shape of the ventral strakes (left out), the nose
   pitot boom (left out so it cannot shrink the scale), small blade antennas.
   Paint: overall light grey as in the photograph; no camouflage texture.

   Station reference: s = metres aft of the radome tip, X(s) = NOSE - s.
        0.00 radome tip      3.10 radome base      4.80 windscreen
        7.50 canoe starts    8.60 intake lip      12.3 wing leading edge at the glove
       17.10 fin root LE     20.2 fin pod starts   23.16 tailplane / pod aft end
*/
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  var NOSE = 11.58;
  function X(s) { return NOSE - s; }
  var GROUND = -2.10;                /* tyre bottoms: the lowest opaque point */

  function mats(THREE, C) {
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    return {
      skin: new THREE.MeshStandardMaterial({ color: 0x9aa3a8, roughness: 0.80, metalness: 0.08, side: THREE.DoubleSide }),
      radome: new THREE.MeshStandardMaterial({ color: 0xb9b3a0, roughness: 0.60, metalness: 0.05, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({ color: 0x8d9399, roughness: 0.52, metalness: 0.50 }),
      steel: new THREE.MeshStandardMaterial({ color: 0x6f757a, roughness: 0.48, metalness: 0.60 }),
      burnt: new THREE.MeshStandardMaterial({ color: 0x5d5751, roughness: 0.52, metalness: 0.58, side: THREE.DoubleSide }),
      dark: new THREE.MeshStandardMaterial({ color: 0x15181a, roughness: 0.95, metalness: 0.05 }),
      rubber: new THREE.MeshStandardMaterial({ color: 0x17181a, roughness: 0.95, metalness: 0.04 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x1d2e33, roughness: 0.10, metalness: 0.35, side: THREE.DoubleSide }),
      /* exactly C.team so eraPaint's team test leaves it alone */
      team: new THREE.MeshStandardMaterial({ color: new THREE.Color(tc), roughness: 0.58, metalness: 0.15,
                                             emissive: new THREE.Color(tc), emissiveIntensity: 0.10 })
    };
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = mats(THREE, C);
    var i, sgn, m;

    function loft(rows, segs, mat, yc) {
      var secs = [];
      for (var k = rows.length - 1; k >= 0; k--) {
        var r = rows[k];
        secs.push({ x: X(r[0]), w: r[1], h: r[2], zc: r[3], sq: r[4] });
      }
      var geo = M.loft(THREE, secs, segs);
      if (yc) geo.translate(0, yc, 0);
      var mm = new THREE.Mesh(geo, mat); g.add(mm); return mm;
    }
    function box(mat, sx, sy, sz, px, py, pz) {
      var b = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
      b.position.set(px, py, pz); g.add(b); return b;
    }
    function cyl(mat, r0, r1, len, axis, px, py, pz, seg) {
      var c = new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, len, seg || 12), mat);
      if (axis === "x") c.rotation.z = Math.PI / 2;
      else if (axis === "y") c.rotation.x = Math.PI / 2;
      c.position.set(px, py, pz); g.add(c); return c;
    }
    /* a flat plate from (s, y) points, mirrored for sgn */
    function plate(pts, sg, thick, mat, z0) {
      var p = [];
      for (var k = 0; k < pts.length; k++) p.push([X(pts[k][0]), sg * pts[k][1]]);
      if (sg < 0) p.reverse();                 /* mirrored outline: keep the winding outward */
      var mm = new THREE.Mesh(M.slab(THREE, p, thick), mat);
      mm.position.z = z0; g.add(mm); return mm;
    }

    /* ---------------------------------------------------------- fuselage */
    /* radome: long ogive, dielectric */
    loft([
      [0.00, 0.02, 0.02, -0.34, 1.1],
      [0.70, 0.17, 0.17, -0.33, 1.1],
      [1.60, 0.37, 0.36, -0.30, 1.08],
      [2.40, 0.54, 0.52, -0.26, 1.04],
      [3.15, 0.66, 0.64, -0.22, 1.0]
    ], 56, T.radome);
    /* forward fuselage with the crew capsule, then the broad centre section and tail */
    loft([
      [3.10, 0.66, 0.64, -0.22, 1.0],
      [4.60, 0.86, 0.80, -0.14, 1.2],
      [6.00, 0.96, 1.04, -0.10, 1.5],
      [8.00, 1.00, 1.12, -0.08, 1.8],
      [10.5, 1.04, 1.14, -0.10, 2.0],
      [14.0, 1.10, 1.12, -0.10, 2.0],
      [17.0, 1.12, 1.04, -0.12, 2.0],
      [19.5, 1.06, 0.80, -0.18, 1.8],
      [21.5, 1.02, 0.58, -0.26, 1.5],
      [22.2, 0.90, 0.44, -0.28, 1.3]
    ], 88, T.skin);
    /* spine fairing from the canopy back to the fin root */
    loft([
      [7.0, 0.40, 0.20, 0.78, 1.5],
      [9.5, 0.62, 0.26, 0.76, 1.8],
      [13.0, 0.66, 0.24, 0.74, 1.8],
      [17.0, 0.55, 0.20, 0.70, 1.6],
      [21.0, 0.34, 0.14, 0.60, 1.4]
    ], 40, T.skin);

    /* crew capsule canopy: two seats side by side under one hinged canopy */
    loft([
      [4.75, 0.14, 0.06, 0.62, 1.0],
      [5.30, 0.62, 0.40, 0.76, 1.0],
      [6.00, 0.84, 0.54, 0.92, 1.0],
      [6.80, 0.84, 0.50, 0.94, 1.0],
      [7.50, 0.56, 0.30, 0.86, 1.0]
    ], 56, T.glass);
    box(T.metal, 0.07, 1.62, 0.05, X(6.25), 0, 1.44);        /* centre bow / canopy frame */
    box(T.metal, 0.06, 1.50, 0.05, X(5.20), 0, 1.02);        /* windscreen frame */

    /* ------------------------------------------------- ventral canoe radome */
    /* the ALQ-99 jamming transmitters, about 4.9 m long, in the weapons bay */
    loft([
      [7.50, 0.20, 0.08, -1.12, 1.2],
      [8.30, 0.52, 0.26, -1.14, 1.3],
      [9.80, 0.60, 0.33, -1.14, 1.4],
      [11.4, 0.54, 0.30, -1.14, 1.4],
      [12.4, 0.22, 0.10, -1.12, 1.2]
    ], 48, T.radome);

    /* ------------------------------------------------------------ intakes */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      var iy = sgn * 1.20;
      loft([
        [8.60, 0.34, 0.60, -0.14, 2.4],
        [10.0, 0.40, 0.62, -0.12, 2.4],
        [12.0, 0.44, 0.62, -0.12, 2.0],
        [14.0, 0.44, 0.56, -0.14, 1.6]
      ], 40, T.skin, iy);
      box(T.dark, 0.06, 0.58, 1.05, X(8.64), iy, -0.14);      /* dark mouth */
      /* half-cone spike */
      var sp = new THREE.Mesh(new THREE.ConeGeometry(0.26, 1.0, 36), T.metal);
      sp.rotation.z = Math.PI / 2;              /* tip toward +X */
      sp.position.set(X(8.15), iy, -0.14); g.add(sp);
    }

    /* ---------------------------------------------------------- wings */
    /* swept to 72.5 deg: glove, then the swept panel lying back along the
       fuselage towards the tailplane. Tip at y = 4.87 (span 9.74 m). */
    var GLOVE = [[7.6, 0.95], [12.3, 2.20], [17.7, 2.20], [19.2, 0.95]];
    var PANEL = [[12.3, 2.20], [20.0, 4.80], [20.9, 4.80], [17.9, 2.20]];
    for (sgn = -1; sgn <= 1; sgn += 2) {
      plate(GLOVE, sgn, 0.34, T.skin, 0.18);
      plate(PANEL, sgn, 0.20, T.skin, 0.30);
      box(T.metal, 1.10, 0.34, 0.26, X(14.9), sgn * 2.20, 0.40);   /* pivot fairing */
      box(T.team, 1.20, 1.00, 0.04, X(18.0), sgn * 3.50, 0.52);    /* upper flash */
    }

    /* ------------------------------------------------------- tailplanes */
    var TAIL = [[18.9, 0.95], [21.3, 3.40], [22.8, 3.30], [22.9, 0.95]];
    for (sgn = -1; sgn <= 1; sgn += 2) {
      plate(TAIL, sgn, 0.16, T.skin, -0.34);
      box(T.skin, 1.60, 0.50, 0.40, X(20.8), sgn * 1.20, -0.26);   /* pivot fairing */
    }

    /* -------------------------------------------------------------- fin */
    var FIN = [[X(17.1), 0.70], [X(20.2), 3.44], [X(22.4), 3.44], [X(22.5), 0.70]];
    m = new THREE.Mesh(M.slab(THREE, FIN, 0.26, "xz"), T.skin);
    m.position.y = 0.13; g.add(m);
    box(T.skin, 0.12, 0.28, 2.50, X(22.35), 0, 2.00);              /* rudder hinge line */
    box(T.team, 1.70, 0.32, 0.80, X(21.2), 0, 2.15);               /* fin band, both faces */
    /* the ALQ-99 receiver pod on the fin tip */
    loft([
      [20.10, 0.10, 0.12, 3.64, 1.2],
      [20.60, 0.38, 0.36, 3.64, 1.3],
      [21.40, 0.52, 0.55, 3.64, 1.5],
      [22.30, 0.50, 0.55, 3.64, 1.5],
      [23.10, 0.30, 0.30, 3.64, 1.3]
    ], 48, T.radome);
    box(T.skin, 1.30, 0.62, 0.10, X(21.7), 0, 4.09);               /* pod crown */
    box(T.dark, 0.50, 0.04, 0.34, X(20.9), 0.51, 3.59);            /* receiver apertures */
    box(T.dark, 0.50, 0.04, 0.34, X(20.9), -0.51, 3.59);

    /* ---------------------------------------------------------- nozzles */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      var ny = sgn * 0.60;
      cyl(T.burnt, 0.50, 0.44, 1.30, "x", X(21.95), ny, -0.30, 40).material = T.burnt;
      for (i = 0; i < 24; i++) {
        var a = i / 24 * Math.PI * 2;
        var rib = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.12), T.steel);
        rib.position.set(X(21.95), ny + Math.cos(a) * 0.47, -0.30 + Math.sin(a) * 0.47);
        rib.rotation.x = -a; g.add(rib);
      }
      cyl(T.dark, 0.38, 0.30, 0.50, "x", X(22.45), ny, -0.30, 14);
    }
    box(T.metal, 0.70, 0.30, 0.30, X(22.0), 0, 0.50);              /* drag chute fairing */
    box(T.metal, 1.10, 0.14, 0.14, X(20.3), 0, -0.62);             /* hook */

    /* ----------------------------------------------------------- gear */
    var gear = new THREE.Group(); gear.name = "gear"; g.add(gear);
    function gmesh(geo, mat, px, py, pz, rx) {
      var mm = new THREE.Mesh(geo, mat); mm.position.set(px, py, pz);
      if (rx) mm.rotation.x = rx; gear.add(mm); return mm;
    }
    var nr = 0.28, nhub = GROUND + nr;
    gmesh(new THREE.CylinderGeometry(0.07, 0.09, 1.0, 8), T.steel, X(6.9), 0, -1.32);
    for (sgn = -1; sgn <= 1; sgn += 2) {
      gmesh(new THREE.CylinderGeometry(nr, nr, 0.17, 28), T.rubber, X(6.9), sgn * 0.17, nhub, Math.PI / 2);
    }
    gmesh(new THREE.BoxGeometry(1.2, 0.08, 0.7), T.skin, X(7.2), 0.30, -1.0);
    var mr = 0.52, mhub = GROUND + mr;
    for (sgn = -1; sgn <= 1; sgn += 2) {
      gmesh(new THREE.CylinderGeometry(0.11, 0.13, 1.0, 8), T.steel, X(14.7), sgn * 1.40, -1.1);
      gmesh(new THREE.CylinderGeometry(mr, mr, 0.36, 36), T.rubber, X(14.7), sgn * 1.40, mhub, Math.PI / 2);
      gmesh(new THREE.CylinderGeometry(0.26, 0.26, 0.40, 24), T.metal, X(14.7), sgn * 1.40, mhub, Math.PI / 2);
      gmesh(new THREE.BoxGeometry(2.4, 0.07, 0.8), T.skin, X(14.5), sgn * 1.08, -1.05);
    }

    /* ------------------------------------------------- small fittings */
    box(T.dark, 0.30, 0.05, 0.30, X(9.2), 0, 0.98);
    box(T.dark, 0.30, 0.05, 0.28, X(5.0), 0, -0.88);
    for (sgn = -1; sgn <= 1; sgn += 2) {
      box(T.steel, 0.30, 0.05, 0.14, X(2.6), sgn * 0.52, -0.16);   /* AoA vanes */
      box(T.dark, 0.9, 0.04, 0.40, X(5.8), sgn * 0.84, -0.40);     /* crew capsule hatch seam */
    }
    /* panel and hinge detail: weapons-bay door seams, flap and aileron fairings,
       vortex generators, formation and nav lights, pitot probes, blade antennas */
    for (i = 0; i < 4; i++) box(T.dark, 0.05, 1.0, 0.03, X(7.9 + i * 1.5), 0, -1.40);
    for (sgn = -1; sgn <= 1; sgn += 2) {
      for (i = 0; i < 3; i++) box(T.metal, 0.42, 0.14, 0.14, X(18.4 + i * 0.4), sgn * (2.8 + i * 0.7), 0.20);
      for (i = 0; i < 3; i++) box(T.skin, 0.80, 0.10, 0.10, X(13.2 + i * 1.0), sgn * (2.5 + i * 0.5), 0.46);
      cyl(T.steel, 0.025, 0.03, 0.55, "x", X(1.3), sgn * 0.33, -0.36, 8);
      box(T.dark, 0.40, 0.04, 0.30, X(10.2), sgn * 1.64, -0.12);       /* intake bleed louvre */
      box(T.metal, 0.22, 0.16, 0.26, X(20.7), sgn * 0.57, 3.76);        /* pod antennas */
      box(T.metal, 0.5, 0.05, 0.05, X(20.5), sgn * 3.28, 0.30);
      box(T.dark, 0.9, 0.05, 0.50, X(14.2), sgn * 1.12, -1.02);          /* main gear door seams */
      box(T.metal, 0.12, 0.12, 0.60, X(7.0), sgn * 0.20, -1.30);         /* nose gear drag brace */
    }
    box(T.dark, 0.34, 0.05, 0.34, X(12.8), 0, -1.48);
    box(T.dark, 0.30, 0.05, 0.30, X(16.0), 0, -1.00);
    box(T.team, 1.10, 0.60, 0.04, X(14.0), 0, 0.99);               /* spine flash */
    mergeByMaterial(THREE, g);
    mergeByMaterial(THREE, gear);
    return g;
  }

  /* one mesh per material: direct child meshes of grp are merged, groups are left alone */
  function mergeByMaterial(THREE, grp) {
    var by = [], k, ch, list = grp.children.slice();
    for (k = 0; k < list.length; k++) {
      ch = list[k];
      if (!ch.isMesh) continue;
      ch.updateMatrix();
      var e = null;
      for (var q = 0; q < by.length; q++) if (by[q].mat === ch.material) e = by[q];
      if (!e) { e = { mat: ch.material, items: [] }; by.push(e); }
      e.items.push(ch);
      grp.remove(ch);
    }
    for (k = 0; k < by.length; k++) {
      var pos = [], nor = [], uv = [], idx = [], base = 0;
      by[k].items.forEach(function (it) {
        var geo = it.geometry.index ? it.geometry : null;
        var gg = it.geometry.clone();
        gg.applyMatrix4 ? gg.applyMatrix4(it.matrix) : gg.applyMatrix(it.matrix);
        var P = gg.attributes.position, N = gg.attributes.normal, U = gg.attributes.uv, n = P.count, j;
        for (j = 0; j < n; j++) {
          pos.push(P.getX(j), P.getY(j), P.getZ(j));
          nor.push(N.getX(j), N.getY(j), N.getZ(j));
          uv.push(U ? U.getX(j) : 0, U ? U.getY(j) : 0);
        }
        if (gg.index) for (j = 0; j < gg.index.count; j++) idx.push(gg.index.getX(j) + base);
        else for (j = 0; j < n; j++) idx.push(j + base);
        base += n;
      });
      var mg = new THREE.BufferGeometry();
      mg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      mg.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
      mg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      mg.setIndex(idx);
      grp.add(new THREE.Mesh(mg, by[k].mat));
    }
  }

  UNIT_MODELS["nato_e80_ewair"] = { len: 23.16, build: build };
})();
