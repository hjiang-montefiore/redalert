/* ===== us_h19.js - HERO model: Sikorsky H-19D Chickasaw (S-55) =====
   Key: nato_e50_transport "Sikorsky H-19D Chickasaw (S-55)" (1950s).

   References (fetched with a generic agent string; nothing is copied, they
   gave the shape and the figures):
     - the Sikorsky H-19A three-view line drawing on Wikimedia Commons,
       with its dimensions: fuselage 42 ft 2.5 in (12.87 m), rotor 53 ft
       (16.15 m, blades 16.4 in chord), 9 ft 11 in from the nose to the
       rotor axis, rotor axis to tail rotor hub 31 ft 4 in, nose wheels
       10 ft 7 in ahead of the main wheels, nose wheels 4 ft 8 in apart,
       main wheels 11 ft 6 in apart, tail rotor 8 ft 8 in, tail rotor hub
       at 10 ft 10 in, rotor head top 13 ft 4 in; the side view gives the
       profile: radial in the nose behind clamshell doors, the cockpit
       perched over it, the cabin roof, the boom upswept behind the cabin
       and the fin leaning aft;
     - a photograph of a USAF H-19B (Commons, "Sikorsky UH-19B Chickasaw
       USAF"): twin nose wheels on a short strut, main wheels on long raked
       struts, two cockpit windows and two square cabin windows, the sliding
       door, the boom band, a horizontal tail plane on the boom.
   Not confirmed: the paint. rotor_specs.js gives "olive" for this row, so
   the machine is drawn olive drab (the photographed one is bare metal with
   a yellow band). The H-19D's inclined boom (three degrees, S-55C onward)
   is not drawn separately from the drawing's level one: the difference is
   under 0.7 m at the tail. The tail rotor is drawn on the port side from
   the drawing's plan view; the photograph does not settle it.

   Helicopter conventions as h60_hawk_family.js and de_bo105.js:
     rotor      hangs in a mount turned +PI/2 about X, the head inside is
                authored in model axes; three blades at 45, 165 and 285
                degrees so blade phase does not set the scale; turns
                anti-clockwise from above.
     rotordisc  see-through blur disc, own transparent material.
     tailrotor  the same mount pattern, hub axis along the model Y.
     gear       the four wheels (twin nose, two main), the lowest opaque
                part; the rotor, boom and fin are all above them.
   Team colour: exactly C.team on the boom band and the roof patch. */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroH19 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;

  /* x forward from the rotor axis; heights above the ground */
  var GROUND  = -1.80;
  function Z(h) { return GROUND + h; }
  var ROTOR_R = 8.075;                 /* 53 ft */
  var CHORD   = 0.417;                 /* 16.4 in */
  var HUB_H   = 3.72;                  /* blade plane */
  var TR_R    = 1.32;                  /* 8 ft 8 in */
  var TR_X = -9.55, TR_Y = 0.27, TR_H = 3.30;

  /* fuselage stations, nose to tail: x, floor, roof, half width, squareness */
  var SEC = [
    [ 3.00, 1.00, 1.90, 0.34, 2.6],
    [ 2.92, 0.80, 2.15, 0.55, 2.8],
    [ 2.75, 0.58, 2.35, 0.72, 3.0],
    [ 2.45, 0.42, 2.55, 0.82, 3.4],
    [ 2.05, 0.34, 2.45, 0.86, 3.8],
    [ 1.88, 0.34, 2.64, 0.86, 4.0],
    [ 1.28, 0.34, 3.17, 0.86, 4.0],
    [ 1.00, 0.34, 3.24, 0.86, 4.0],
    [ 0.00, 0.34, 3.26, 0.86, 4.0],
    [-1.00, 0.34, 3.18, 0.86, 4.0],
    [-1.70, 0.34, 2.92, 0.84, 3.6],
    [-2.30, 0.38, 2.80, 0.80, 3.2],
    [-2.80, 0.80, 2.78, 0.62, 2.8],
    [-3.20, 1.35, 2.78, 0.42, 2.4],
    [-4.50, 1.60, 2.76, 0.36, 2.2],
    [-6.50, 1.95, 2.76, 0.28, 2.2],
    [-8.50, 2.30, 2.74, 0.18, 2.2],
    [-8.80, 2.34, 2.72, 0.12, 2.2]
  ];
  function sect(x) {
    var i, a, b, t;
    for (i = 0; i < SEC.length - 1; i++) {
      a = SEC[i]; b = SEC[i + 1];
      if (x <= a[0] && x >= b[0]) {
        t = (a[0] - x) / (a[0] - b[0]);
        return [x, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t, a[4] + (b[4] - a[4]) * t];
      }
    }
    return SEC[SEC.length - 1];
  }

  /* ------------------------------------------------------- materials */
  function makeMats(C) {
    var m = {};
    m.skin  = new V.MeshStandardMaterial({ color: 0x424a30, roughness: 0.86, metalness: 0.08 });
    m.metal = new V.MeshStandardMaterial({ color: 0x6a7073, roughness: 0.48, metalness: 0.60 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x1f2222, roughness: 0.74, metalness: 0.15 });
    m.glass = new V.MeshPhysicalMaterial({ color: 0x1b2a31, roughness: 0.08, metalness: 0.20,
                                           clearcoat: 1.0, clearcoatRoughness: 0.05 });
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc  = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                           transparent: true, opacity: 0.05, depthWrite: false });
    return m;
  }

  /* --------------------------------------------------- geometry kit */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx) geo.rotateX(rx);
    if (ry) geo.rotateY(ry);
    if (rz) geo.rotateZ(rz);
    geo.translate(x, y, z);
    return geo;
  }
  function box(lx, ly, lz, x, y, z) { return place(new V.BoxGeometry(lx, ly, lz), x, y, z); }
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r1, r0, len, seg, 1);     /* radius r0 at the -axis end */
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    g.translate(x, y, z);
    return g;
  }
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs);
    g.scale(sx || 1, sy || 1, sz || 1);
    g.translate(x, y, z);
    return g;
  }
  function bar(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, len, seg || 6, 1);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / len, dy / len, dz / len));
    g.applyQuaternion(q);
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    return g;
  }
  function sgn(v) { return v < 0 ? -1 : 1; }
  /* a lofted tube through sections [x, floor, roof, half width, squareness],
     faces turned to face outwards whatever order the sections run in */
  function loft(secs, N, caps, grow) {
    var pos = [], idx = [], out = [], i, k, s, t, c, sn, zc, hh, ctr = [], a, b, d;
    grow = grow || 0;
    for (i = 0; i < secs.length; i++) {
      s = secs[i]; zc = (s[1] + s[2]) / 2; hh = (s[2] - s[1]) / 2 + grow;
      ctr.push([s[0], 0, zc]);
      for (k = 0; k < N; k++) {
        t = 2 * PI * k / N; c = Math.cos(t); sn = Math.sin(t);
        pos.push(s[0], (s[3] + grow) * sgn(c) * Math.pow(Math.abs(c), 2 / s[4]), zc + hh * sgn(sn) * Math.pow(Math.abs(sn), 2 / s[4]));
      }
    }
    function fix(i0, i1, i2, cy, cz) {
      var p0 = [pos[i0 * 3], pos[i0 * 3 + 1], pos[i0 * 3 + 2]], p1 = [pos[i1 * 3], pos[i1 * 3 + 1], pos[i1 * 3 + 2]], p2 = [pos[i2 * 3], pos[i2 * 3 + 1], pos[i2 * 3 + 2]];
      var ux = p1[0] - p0[0], uy = p1[1] - p0[1], uz = p1[2] - p0[2], vx = p2[0] - p0[0], vy = p2[1] - p0[1], vz = p2[2] - p0[2];
      var ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var cyv = (p0[1] + p1[1] + p2[1]) / 3 - cy, czv = (p0[2] + p1[2] + p2[2]) / 3 - cz;
      if (ny * cyv + nz * czv >= 0) idx.push(i0, i1, i2); else idx.push(i0, i2, i1);
    }
    for (i = 0; i < secs.length - 1; i++) {
      for (k = 0; k < N; k++) {
        a = i * N + k; b = i * N + (k + 1) % N; c = (i + 1) * N + k; d = (i + 1) * N + (k + 1) % N;
        fix(a, b, c, 0, ctr[i][2]); fix(b, d, c, 0, ctr[i][2]);
      }
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    out.push(g);
    if (caps) {
      var ends = [[0, 1], [secs.length - 1, secs.length - 2]];
      for (i = 0; i < 2; i++) {
        var e = ends[i][0], f = ends[i][1], cp = [], ci = [];
        for (k = 0; k < N; k++) cp.push(pos[(e * N + k) * 3], pos[(e * N + k) * 3 + 1], pos[(e * N + k) * 3 + 2]);
        cp.push(ctr[e][0], 0, ctr[e][2]);
        var dir = secs[e][0] > secs[f][0] ? 1 : -1;
        for (k = 0; k < N; k++) {
          var k2 = (k + 1) % N;
          /* triangle (k, k2, centre) has normal along +x when the ring runs anticlockwise seen from +x */
          var ay = cp[k2 * 3 + 1] - cp[k * 3 + 1], az = cp[k2 * 3 + 2] - cp[k * 3 + 2];
          var by = cp[N * 3 + 1] - cp[k * 3 + 1], bz = cp[N * 3 + 2] - cp[k * 3 + 2];
          if ((ay * bz - az * by) * dir >= 0) ci.push(k, k2, N); else ci.push(k, N, k2);
        }
        var cg = new V.BufferGeometry();
        cg.setAttribute("position", new V.Float32BufferAttribute(cp, 3));
        cg.setIndex(ci);
        cg.computeVertexNormals();
        out.push(cg);
      }
    }
    return out;
  }
  /* a flat plate from an (x, z) outline, thickness t across y, centred on y0 */
  function plate(pts, t, y0) {
    var sh = new V.Shape();
    sh.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    var g = new V.ExtrudeGeometry(sh, { depth: t, bevelEnabled: false });
    g.rotateX(PI / 2);                    /* (x, z) -> (x, z) with depth running to -y */
    g.translate(0, y0 + t / 2, 0);
    return g;
  }
  function flat(g) {
    if (g.index) g = g.toNonIndexed();
    if (!g.attributes.normal) g.computeVertexNormals();
    return g;
  }
  function merge(list) {
    var pos = [], nor = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    return out;
  }
  function mesh(parent, list, mat, name) {
    if (!list.length) return null;
    var m = new V.Mesh(merge(list), mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function zs(list, dz) { for (var i = 0; i < list.length; i++) list[i].translate(0, 0, dz); return list; }

  /* ============================================================ build == */
  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    var skin = [], metal = [], dark = [], glass = [], team = [];
    var i, k, s;

    /* ---- the fuselage: nose cowl over the radial, cockpit, cabin, boom */
    var stn = [];
    for (i = 0; i < SEC.length; i++) { stn.push(SEC[i]); if (i < SEC.length - 1) stn.push(sect((SEC[i][0] + SEC[i + 1][0]) / 2)); }
    var body = loft(stn, 40, true);
    for (i = 0; i < body.length; i++) skin.push(body[i].translate(0, 0, GROUND * 0));
    /* the main gearbox fairing standing out of the roof */
    skin.push(cyl(0.42, 0.27, 0.46, 16, "z", 0, 0, 3.32));
    metal.push(cyl(0.12, 0.12, 0.30, 10, "z", 0, 0, 3.58));
    /* the nose: clamshell doors' seam and the cooling-air face */
    dark.push(cyl(0.20, 0.20, 0.05, 14, "x", 3.00, 0, 1.45));
    dark.push(box(0.02, 0.01, 0.9, 2.95, 0, 1.45));
    for (s = -1; s <= 1; s += 2) {
      dark.push(box(0.30, 0.04, 0.55, 2.28, s * 0.80, 1.45));            /* engine cooling louvres */
      dark.push(box(0.22, 0.03, 0.30, 2.62, s * 0.66, 1.0));
    }
    /* panel lines: the sliding cabin door, the cockpit door, the nose doors */
    for (s = -1; s <= 1; s += 2) {
      var yy = s * 0.865;
      dark.push(box(0.02, 0.03, 1.55, 1.00, yy, 1.15), box(0.02, 0.03, 1.55, -0.80, yy, 1.15));
      dark.push(box(1.82, 0.03, 0.02, 0.10, yy, 0.45), box(1.82, 0.03, 0.02, 0.10, yy, 1.95));
      dark.push(box(0.02, 0.03, 0.95, 1.55, s * 0.855, 2.05), box(0.02, 0.03, 0.55, 0.00, s * 0.865, 2.55));
      dark.push(box(0.12, 0.03, 0.03, 0.78, yy, 1.30));                    /* door handle */
      dark.push(box(0.03, 0.03, 1.0, 2.62, s * 0.70, 1.40), box(0.03, 0.03, 0.8, 2.86, s * 0.60, 1.40));
    }
    dark.push(cyl(0.05, 0.05, 0.50, 8, "x", 2.30, -0.45, 0.40));            /* exhaust stub under the starboard nose */
    /* the boom band and the roof patch carry the team colour */
    var band = [];
    for (i = 0; i < 4; i++) band.push(sect(-5.2 - i * 0.2));
    var bg = loft(band, 20, false, 0.02);
    for (i = 0; i < bg.length; i++) team.push(bg[i]);
    team.push(box(1.2, 0.5, 0.03, -1.15, 0, 3.17));

    /* ---- glass: windshield, cockpit windows, cabin windows */
    var th = -48 * D2R;
    for (s = -1; s <= 1; s += 2) {
      glass.push(place(new V.BoxGeometry(0.05, 0.62, 0.78), 1.58, s * 0.34, 2.93, 0, th, 0));
      glass.push(box(0.58, 0.10, 0.55, 1.00, s * 0.84, 2.70));         /* cockpit door window */
      glass.push(box(0.55, 0.10, 0.52, 0.30, s * 0.84, 2.70));
      glass.push(box(0.36, 0.07, 0.38, -0.85, s * 0.86, 2.00));        /* cabin windows */
      glass.push(box(0.36, 0.07, 0.38, -1.55, s * 0.855, 2.00));
      glass.push(place(new V.BoxGeometry(0.30, 0.04, 0.34), 2.05, s * 0.64, 2.50, 0, 0, s * 0.2));
    }
    /* the cabin door's rail and the starboard hoist */
    for (s = -1; s <= 1; s += 2) metal.push(box(2.3, 0.04, 0.04, 0.45, s * 0.875, 2.08));
    metal.push(box(0.5, 0.25, 0.30, -0.60, -0.90, 2.65));

    /* ---- tail fin, tail plane, bumper, tail gearbox */
    skin.push(plate([[-8.35, 2.30], [-8.35, 2.74], [-9.0, 3.18], [-9.55, 3.85], [-9.90, 3.90], [-9.88, 3.25], [-9.72, 2.30]], 0.10, 0));
    skin.push(box(0.55, 1.22, 0.05, -9.10, 0, 2.26));
    metal.push(bar([-9.05, 0, 2.25], [-9.50, 0, 1.80], 0.035, 5));
    metal.push(cyl(0.09, 0.09, 0.26, 10, "y", TR_X, TR_Y / 2 + 0.05, TR_H));
    dark.push(box(0.20, 0.07, 0.12, -9.78, 0, 3.97));                    /* tail light / fin cap */
    /* a whip antenna and the pitot */
    metal.push(bar([-3.6, 0, 2.78], [-4.2, 0, 3.15], 0.012, 4));
    metal.push(bar([2.9, -0.2, 2.05], [3.25, -0.2, 2.05], 0.015, 4));

    /* all body parts so far were authored with height above ground in z:
       shift them to the model's z */
    function lowerAll(list) { for (var j = 0; j < list.length; j++) list[j].translate(0, 0, GROUND); }
    lowerAll(skin); lowerAll(metal); lowerAll(dark); lowerAll(glass); lowerAll(team);

    mesh(g, skin, T.skin, "fuselage");
    mesh(g, glass, T.glass, "glass");
    mesh(g, team, T.team, "team");
    mesh(g, dark, T.dark, "dark");
    mesh(g, metal, T.metal, "fittings");

    /* ---- the undercarriage: twin nose wheels, two main wheels on raked
       struts; the lowest opaque part */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    var gm = [], gt = [];
    var NX = 1.81, MX = -1.36, NR = 0.24, MR = 0.30;
    for (s = -1; s <= 1; s += 2) {
      gt.push(cyl(NR, NR, 0.15, 24, "y", NX, s * 0.71, Z(NR)));
      gm.push(cyl(0.09, 0.09, 0.17, 8, "y", NX, s * 0.71, Z(NR)));
      gm.push(bar([NX - 0.05, s * 0.36, Z(0.55)], [NX, s * 0.71, Z(NR)], 0.032, 6));
      gt.push(cyl(MR, MR, 0.22, 24, "y", MX, s * 1.60, Z(MR)));
      gm.push(cyl(0.12, 0.12, 0.25, 8, "y", MX, s * 1.60, Z(MR)));
      gm.push(bar([-1.80, s * 0.86, Z(1.30)], [MX, s * 1.60, Z(MR)], 0.045, 6));
      gm.push(bar([-0.70, s * 0.86, Z(0.95)], [MX + 0.1, s * 1.55, Z(MR + 0.1)], 0.03, 5));
    }
    gm.push(bar([NX - 0.05, -0.36, Z(0.55)], [NX - 0.05, 0.36, Z(0.55)], 0.03, 5));
    mesh(gear, gt, T.dark, "gear_tyres");
    mesh(gear, gm, T.metal, "gear_legs");

    /* ---- main rotor: mount turned +PI/2 about X, so render3d's turn about
       the parent's up axis becomes a turn about the mast; the head undoes it */
    var mnt = new V.Group();
    mnt.position.set(0, 0, Z(HUB_H));
    mnt.rotation.x = PI / 2;
    g.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = -PI / 2;
    rotor.add(head);

    var hm = [], hb = [], a;
    hm.push(cyl(0.22, 0.20, 0.20, 12, "z", 0, 0, 0));
    hm.push(cyl(0.12, 0.09, 0.16, 10, "z", 0, 0, 0.18));                 /* head top 4.06 m */
    hm.push(cyl(0.14, 0.14, 0.30, 10, "z", 0, 0, -0.25));               /* mast */
    hm.push(cyl(0.30, 0.30, 0.04, 14, "z", 0, 0, -0.32));               /* swashplate */
    for (k = 0; k < 3; k++) {
      a = (45 + 120 * k) * D2R;
      var sleeve = box(0.62, 0.13, 0.08, 0.40, 0, 0);                  /* hinge housing, flapping hinge 9 in out */
      sleeve.rotateZ(a);
      hm.push(sleeve);
      var rod = bar([0.30, 0, -0.30], [0.50, 0, -0.04], 0.012, 4);     /* pitch link */
      rod.rotateZ(a);
      hm.push(rod);
      var bl = box(ROTOR_R - 0.70, CHORD, 0.028, 0.70 + (ROTOR_R - 0.70) / 2, 0, 0);
      bl.rotateX(5 * D2R);
      bl.rotateZ(a);
      hb.push(bl);
    }
    mesh(head, hm, T.metal, "hub");
    mesh(head, hb, T.dark, "blades");
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    /* ---- tail rotor: same mount pattern, hub axis along the model Y, on
       the port side of the fin */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y, Z(TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.07, 0.07, 0.12, 10, "z", 0, 0, 0), cyl(0.04, 0.03, 0.06, 8, "z", 0, 0, -0.08),
               box(0.28, 0.07, 0.05, 0, 0, 0)];
    var trB = [];
    for (k = 0; k < 2; k++) {
      var tb = box(TR_R - 0.14, 0.20, 0.022, 0.14 + (TR_R - 0.14) / 2, 0, 0);
      tb.rotateX(8 * D2R);
      tb.rotateZ((50 + 180 * k) * D2R);
      trB.push(tb);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.dark, "tailrotor_blades");

    return g;
  }

  return { build: build };
})();

UNIT_MODELS["nato_e50_transport"] = { len: 18.55, build: HeroH19.build };
