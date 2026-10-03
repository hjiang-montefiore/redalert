/* ======= ru_mi8.js - HERO model: the Mil Mi-8 Hip family =======
   Five defs that rotor_specs.js drew as one parametric helicopter:
     pact_e60_transport  "Mil Mi-8T Hip", e60                  -> HeroMi8.t
     pact_e80_transport  "Mil Mi-8MT / Mi-17 Hip-H", e80       -> HeroMi8.mt80
     pact_e90_transport  "Mil Mi-8MT / Mi-17", e90             -> HeroMi8.mt90
     pact_e00_transport  "Mil Mi-8AMTSh Terminator", e00       -> HeroMi8.amtsh
     trans_p             "Mi-8AMTSh Terminator" (rules.js)     -> HeroMi8.amtsh
   asw_helo_p is NOT a stand-in: units3d_air2.js ALIAS lists it against trans_p,
   but js/hero/pact_ka27_helix.js registers its own asw_helo_p (the Ka-27)
   after that file runs, so the Ka-27 hero is what it draws (checked with
   dump.js: 15.9 m coaxial hero, not this model). No def borrows these keys.

   References, and what each gave:
     en.wikipedia "Mil Mi-8": fuselage 18.17 m (Mi-8T) / 18.42 m (Mi-8MT),
       main rotor 21.29 m five blades, tail rotor 3.91 m three blades; "the
       only visible differences between the Mi-8 and Mi-17 are the position of
       the tail rotor (Mi-8 right side, Mi-17 left side), the shape of the
       exhausts (Mi-8 circular, Mi-17 oval) and dust shields in front of the
       engine air intakes for the Mi-17" - starboard pusher tail rotor and
       round pipes on the e60 Mi-8T, port tractor and oval pipes after.
     Commons "Mil Mi-8T two-view silhouette" (side and front, 466 px): the
       side profile was measured column by column, scaled to the 18.17 m
       fuselage - belly 0.65-0.7 m above the ground to the clamshell
       upsweep (x from the nose 7.7-10 m), roof line level at about 3.4 m
       from the cowl to the pylon, boom 0.5-0.7 m deep, fin top 4.7 m, nose
       wheel 2 m and main wheels 6.4 m behind the nose, main-wheel outer
       track 4.57 m (so 4.3 m between wheel centres), mast 5.3 m behind the
       nose. The heights rest on the 5.65 m published overall height; the
       silhouette's own vertical scale is a little doubtful.
     Photographs (Commons, one request each, generic UA):
       "Mil Mi-8T Hip 14 yellow" (museum Mi-8T, port side): round forward
         intakes, cowl hump with hatch seams, post antenna, crew door with its
         window and seams behind the cockpit, five round windows, the red star
         on the rear fuselage above the clamshell, the glazed chin;
       "Mil Mi-8T Hip 05 red" (green Mi-8T): tanks on side racks;
       "Mil Mi-8MT Hip (c n 93413)": Soviet-era Mi-8MT with plain intakes,
         six round windows, aft-raked main-gear strut;
       "Russian Air Force Mil Mi-8MT Dvurekov-8" (2010s): a Russian Mi-8MT
         with PLAIN intakes (no dust filters), oval exhausts, port tail rotor,
         star on the rear fuselage;
       "Mil Mi-8AMTSh at MAKS-2013": dust-filter housings, the big glazing of
         the armoured nose, outrigger beams and racks, a tank under the
         sponson, port tail rotor.
     Not obtained: a Commons Mi-8MT side silhouette (HTTP 429 after several
       backoffs) and a photograph dated to the 1990s.

   Variant decisions:
     t      starboard pusher tail rotor, round exhausts, plain intakes, side
            tanks (photo), Soviet green, Soviet red star.
     mt80   port tractor tail rotor, oval exhausts, plain intakes (Mi-8MT
            photographs), no tanks, Soviet star.
     mt90   as mt80 and the Soviet-style red star (red, white edge). The dust
            filters are NOT drawn: a Russian Mi-8MT photograph shows plain
            intakes, and no 1990s photograph shows filters on this row, so the
            Wikipedia "Mi-17 has dust shields" difference is left out as
            unconfirmed for it. The bordered Russian star (red, blue, white) is
            the 2010 marking (see pact_ka27_helix.js) and is only on amtsh.
     amtsh  the MT airframe with the filters, the large glazing, the outrigger
            beams WITH THEIR RACKS EMPTY, the tank, grey-green, the Russian
            star. The exhaust suppressors and the nose sensor that facts.js
            lists are NOT drawn: no photograph here shows them.
   Not drawn: sliding-door rails, wipers, blade antennas, no bort numbers, no
   Aeroflot livery, no wartime marking. Team colour: two small strips on the
   top of the tailplane only.

   NAMED NODES (as hero/pact_hind_mi24.js, tools/jsc/rotor_axes_check.js):
     rotor      -PI/2 about X inside a group leaning the shaft 4.5 deg
                forward; it turns clockwise from above, as every Mil rotor.
     rotordisc  inside the rotor, a transparent depthWrite:false disc.
     tailrotor  mount of the Mi-24: +PI/2 about X for the port tractor
                (top blade aft), -PI/2 for the starboard pusher of the
                Mi-8T (top blade forward); one blade built pointing aft.
     gear       the fixed tricycle undercarriage; the lowest opaque part.

   len follows pact_hind_mi24.js: the measured X extent with the rotors
   turning (main disc front to the tail rotor tip, here 25.025 m for the
   Mi-8T and 25.275 m for the others; published 25.24 / 25.35 m).
   Model space: +X nose, +Y port, +Z up, metres. The origin is under the
   mast, 2.00 m above the wheel contact plane. Nine materials: SKIN, METAL,
   DARK, BLADE, RUBBER, GLASS, TEAM (exactly C.team), the transparent DISC and
   MARK (vertex-coloured national star). ASCII only.                       */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMi8 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;

  var GROUND = -2.00;
  function Z(h) { return GROUND + h; }
  var HUB_H = 4.45, ROTOR_R = 10.65, CHORD = 0.52, MAST_TILT = 4.5 * D2R;
  var TR_R = 1.955, TR_CHORD = 0.22, TR_H = 3.70;
  var X_NOSE = 5.30;
  var NW_X = 3.20, NW_R = 0.30, NW_W = 0.19, NW_Y = 0.30;
  var MW_X = -1.40, MW_Y = 2.15, MW_R = 0.43, MW_W = 0.28;

  var VARIANTS = {
    t:     { key: "t",     len: 18.17, side: -1, oval: false, filt: false, tank: true,  rig: false,
             star: "soviet",  skin: "#46523a", glass: 0x1f2b30 },
    mt80:  { key: "mt80",  len: 18.42, side:  1, oval: true,  filt: false, tank: false, rig: false,
             star: "soviet",  skin: "#505a3f", glass: 0x1f2b30 },
    mt90:  { key: "mt90",  len: 18.42, side:  1, oval: true,  filt: false, tank: false, rig: false,
             star: "soviet",  skin: "#505a3f", glass: 0x1f2b30 },
    amtsh: { key: "amtsh", len: 18.42, side:  1, oval: true,  filt: true,  tank: true,  rig: true,
             star: "russian", skin: "#4d5a52", glass: 0x1a262b }
  };

  function makeMats(C, VR) {
    var m = {};
    m.skin   = new V.MeshStandardMaterial({ color: new V.Color(VR.skin), roughness: 0.84, metalness: 0.07 });
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.35 });
    m.blade  = new V.MeshStandardMaterial({ color: 0x3a3f3a, roughness: 0.78, metalness: 0.14 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.glass  = new V.MeshPhysicalMaterial({ color: VR.glass, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team   = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                            emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc   = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                            transparent: true, opacity: 0.05, depthWrite: false });
    m.mark   = new V.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.7, metalness: 0.02 });
    return m;
  }

  /* ---------------------------------------------------- geometry kit */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); }
  function cyl(r0, r1, len, seg, axis, x, y, z, open) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
    if (axis === "x") g.rotateZ(-PI / 2); else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs);
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg, capped) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  function mirrorY(geo) {
    var g = geo.index ? geo.toNonIndexed() : geo.clone();
    var p = g.attributes.position.array;
    var n = g.attributes.normal ? g.attributes.normal.array : null;
    var i, t, k, tmp;
    for (i = 0; i < p.length; i += 3) { p[i + 1] = -p[i + 1]; if (n) n[i + 1] = -n[i + 1]; }
    for (t = 0; t < p.length / 9; t++) for (k = 0; k < 3; k++) {
      tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
      if (n) { tmp = n[t * 9 + 3 + k]; n[t * 9 + 3 + k] = n[t * 9 + 6 + k]; n[t * 9 + 6 + k] = tmp; }
    }
    return g;
  }
  function both(list, geo) { list.push(geo); list.push(mirrorY(geo)); }
  function merge(list) {
    var pos = [], nor = [], uvs = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3 * 2; j++) uvs.push(u ? u[j] : 0);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uvs, 2));
    return out;
  }
  function mesh(parent, list, mat, name) {
    if (!list.length) return null;
    var m = new V.Mesh(merge(list), mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0];
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var o = (a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz;
        if (o >= 0) out.push(a, b, d); else out.push(a, d, b);
      }
    }
    return tris(out);
  }
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  function sec(x, zb, zt, zm, wb, wm, wt, e) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e, yc: 0 };
  }
  function ringPt(s, th) {
    var c = Math.cos(th), sn = Math.sin(th);
    var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
    var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
    var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
    return [W * Math.pow(Math.abs(c), s.e), z];
  }
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) pts.push(ringPt(s, -PI / 2 + PI * i / n));
    for (i = n - 1; i >= 1; i--) pts.push([-pts[i][0], pts[i][1]]);
    return pts;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], rl = 2 * n, i, j;
    for (i = 0; i < secs.length; i++) {
      var r = ringOf(secs[i], n);
      for (j = 0; j < rl; j++) pos.push(secs[i].x, r[j][0], r[j][1]);
    }
    for (i = 0; i < secs.length - 1; i++) for (j = 0; j < rl; j++) {
      var a = i * rl + j, b = i * rl + (j + 1) % rl, c = (i + 1) * rl + j, d = (i + 1) * rl + (j + 1) % rl;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    function cap(k, dx, front) {
      var s = secs[k], r = ringOf(s, n), t = [], cy = 0, cz = 0;
      for (j = 0; j < rl; j++) { cy += r[j][0]; cz += r[j][1]; }
      var o = [s.x + dx, cy / rl, cz / rl];
      for (j = 0; j < rl; j++) {
        var p0 = [s.x, r[j][0], r[j][1]], p1 = [s.x, r[(j + 1) % rl][0], r[(j + 1) % rl][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (noseDx !== null) cap(0, noseDx, true);
    if (tailDx !== null) cap(secs.length - 1, -tailDx, false);
    return out;
  }
  function secAt(secs, x) {
    for (var q = 0; q < secs.length - 1; q++) {
      var A = secs[q], B = secs[q + 1];
      if (x <= A.x && x >= B.x) {
        var f = (A.x - x) / (A.x - B.x), o = {};
        ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e"].forEach(function (k) { o[k] = A[k] + (B[k] - A[k]) * f; });
        return o;
      }
    }
    return null;
  }
  /* half-width of the lofted body at model x and absolute height z */
  function sideY(secs, x, z) {
    var s = secAt(secs, x);
    var up = z >= s.zm;
    var zn = Math.pow(Math.min(1, Math.abs(z - s.zm) / Math.max(0.01, up ? s.zt - s.zm : s.zm - s.zb)), 1 / s.e);
    return s.wm + ((up ? s.wt : s.wb) - s.wm) * zn;
  }

  /* a flat national star on a fuselage side, three coloured layers merged
     into one vertex-coloured mesh: Soviet red / white border / red, or the
     Russian red with a white border and a blue edge */
  function starLayers(list, cx, cz, y, sgn, r, kind) {
    var layers = kind === "soviet"
      ? [[1.24, [0.66, 0.15, 0.12]], [1.12, [0.88, 0.88, 0.85]], [1.0, [0.70, 0.16, 0.13]]]
      : [[1.26, [0.10, 0.18, 0.46]], [1.14, [0.88, 0.88, 0.85]], [1.0, [0.70, 0.16, 0.13]]];
    layers.forEach(function (L, li) {
      var pts = [], i, a, q, yy = y + sgn * 0.012 * (li + 1);
      for (i = 0; i < 10; i++) {
        a = PI / 2 + i * PI / 5; q = (i & 1) ? 0.40 : 1;
        pts.push([cx0(cx, a, q * r * L[0]), cz + Math.sin(a) * q * r * L[0]]);
      }
      var pos = [], col = [], nor = [];
      for (i = 0; i < 10; i++) {
        var p1 = pts[i], p2 = pts[(i + 1) % 10];
        var tri = [[cx, yy, cz], [p1[0], yy, p1[1]], [p2[0], yy, p2[1]]];
        /* outward normal must face sgn along Y: (b-a) x (c-a) y-component */
        var ux = tri[1][0] - tri[0][0], uz = tri[1][2] - tri[0][2];
        var vx = tri[2][0] - tri[0][0], vz = tri[2][2] - tri[0][2];
        var ny = uz * vx - ux * vz;
        if (ny * sgn < 0) { var t = tri[1]; tri[1] = tri[2]; tri[2] = t; }
        for (var k = 0; k < 3; k++) {
          pos.push(tri[k][0], tri[k][1], tri[k][2]); nor.push(0, sgn, 0); col.push(L[1][0], L[1][1], L[1][2]);
        }
      }
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
      g.setAttribute("color", new V.Float32BufferAttribute(col, 3));
      list.push(g);
    });
  }
  function cx0(cx, a, rr) { return cx + Math.cos(a) * rr; }
  function mergeColored(list) {
    var pos = [], nor = [], col = [], i, j;
    for (i = 0; i < list.length; i++) {
      var p = list[i].attributes.position.array, n = list[i].attributes.normal.array, c = list[i].attributes.color.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); col.push(c[j]); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("color", new V.Float32BufferAttribute(col, 3));
    return out;
  }

  /* ========================================================= the build == */
  function build(THREE, M, C, VR) {
    V = THREE;
    var T = makeMats(C, VR);
    var g = new V.Group();
    g.name = "mi8" + VR.key;
    var i, k, a;
    var skin = [], dark = [], metal = [], team = [], glass = [], marks = [];
    var gearM = [], gearR = [];
    var X_END = -(VR.len - X_NOSE);

    /* ---------------------------------------------- the main fuselage --
       Profile from the Mil Mi-8T two-view silhouette (Commons, scaled to
       the 18.17 m fuselage): belly 0.65-0.7 m above the ground to the
       clamshell upsweep, the roof line level at about 3.4 m from the cowl
       to the tail pylon, the boom 0.5-0.7 m deep. */
    function fsec(x, zb, zt, wm) {
      return sec(x, zb, zt, zb + 0.45 * (zt - zb), wm * 0.80, wm, wm * 0.82, 2.0);
    }
    var fus = [
      sec( 5.30, 0.95, 1.55, 1.25, 0.14, 0.22, 0.14, 1.0),
      sec( 4.95, 0.82, 2.00, 1.38, 0.50, 0.72, 0.52, 1.0),
      sec( 4.40, 0.72, 2.50, 1.45, 0.82, 1.02, 0.78, 1.15),
      sec( 3.60, 0.68, 2.72, 1.50, 1.04, 1.20, 0.94, 1.5),
      sec( 3.00, 0.66, 2.78, 1.50, 1.10, 1.25, 1.00, 2.0),
      sec( 2.00, 0.66, 2.78, 1.50, 1.15, 1.27, 1.05, 2.2),
      sec(-2.40, 0.66, 2.78, 1.50, 1.15, 1.27, 1.05, 2.2),
      fsec(-3.00, 0.74, 3.15, 1.18),
      fsec(-3.70, 1.30, 3.38, 1.05),
      fsec(-4.30, 1.95, 3.44, 0.86),
      fsec(-4.80, 2.45, 3.45, 0.68),
      fsec(-5.40, 2.62, 3.45, 0.58),
      fsec(-8.00, 2.70, 3.42, 0.44),
      fsec(-10.40, 2.86, 3.38, 0.31)
    ];
    loft(fus, 24, 0.14, 0.05).forEach(function (q) { skin.push(q); });

    /* the glazed chin, the windscreen panes and the dark cockpit behind them */
    glass.push(sph(0.46, 20, 10, 4.88, 0, Z(1.18), 0.8, 1.0, 0.55));
    both(glass, box(0.05, 0.80, 0.62, 4.62, 0.44, Z(2.10), 0, -0.55, -0.35));
    both(glass, box(0.05, 0.84, 0.62, 4.04, 0.88, Z(2.20), 0, 0, -0.05));   /* pilot side windows */
    both(glass, box(0.78, 0.04, 0.58, 4.00, 1.03, Z(2.20)));
    dark.push(box(0.50, 1.10, 0.55, 4.25, 0, Z(2.00)));
    both(dark, box(0.04, 0.05, 0.62, 4.62, 0.82, Z(2.10), 0, 0, -0.35));    /* windscreen posts */
    if (VR.rig) both(glass, sph(0.34, 14, 8, 4.35, 0.52, Z(1.08), 1.0, 0.8, 0.5));  /* big armoured-nose glazing */
    /* landing lamp in the chin, pitot tubes on the nose */
    glass.push(sph(0.10, 10, 6, 5.20, 0, Z(1.00), 1, 1, 1));
    both(metal, bar([4.95, 0.28, Z(2.05)], [5.45, 0.34, Z(2.02)], 0.018, 6, true));

    /* round cabin windows with their frames, five a side; the crew door's window on each side */
    var wx = [0.60, -0.25, -1.10, -1.95, -2.75], wz = 1.98;
    for (i = 0; i < wx.length; i++) {
      var w = sideY(fus, wx[i], Z(wz));
      both(dark, cyl(0.225, 0.225, 0.05, 16, "y", wx[i], w - 0.004, Z(wz)));
      both(glass, cyl(0.17, 0.17, 0.05, 16, "y", wx[i], w + 0.012, Z(wz)));
    }
    var dw = sideY(fus, 2.05, Z(1.75));
    both(glass, cyl(0.16, 0.16, 0.05, 16, "y", 2.05, dw + 0.008, Z(1.95)));
    /* crew door outline (the door sits just behind the cockpit): four seams, a handle and a step */
    both(dark, box(0.03, 0.025, 1.55, 1.50, dw + 0.004, Z(1.72)));
    both(dark, box(0.03, 0.025, 1.55, 2.60, dw + 0.004, Z(1.72)));
    both(dark, box(1.13, 0.025, 0.03, 2.05, dw + 0.004, Z(0.96)));
    both(dark, box(1.13, 0.025, 0.03, 2.05, dw + 0.004, Z(2.50)));
    both(metal, box(0.16, 0.05, 0.05, 1.62, dw + 0.03, Z(1.55)));
    both(metal, box(0.45, 0.30, 0.05, 2.05, dw + 0.12, Z(0.34)));

    /* ------------------------------------------- engine cowl and mast -- */
    var cowl = [
      sec( 3.35, 2.60, 3.05, 2.85, 0.40, 0.55, 0.40, 1.6),
      sec( 2.90, 2.55, 3.40, 3.05, 0.70, 0.90, 0.70, 1.8),
      sec( 1.80, 2.55, 3.55, 3.15, 0.78, 0.97, 0.78, 1.8),
      sec( 0.00, 2.55, 3.62, 3.15, 0.80, 1.00, 0.80, 1.8),
      sec(-1.60, 2.55, 3.57, 3.12, 0.78, 0.96, 0.78, 1.8),
      sec(-2.80, 2.55, 3.42, 3.00, 0.60, 0.80, 0.60, 1.7)
    ];
    loft(cowl, 18, 0.10, 0.10).forEach(function (q) { skin.push(q); });
    /* hatch seams across the cowl roof */
    [2.2, 0.9, -0.5, -1.7].forEach(function (hx) {
      var hs = secAt(cowl, hx);
      dark.push(box(0.04, 1.00, 0.012, hx, 0, hs.zt + 0.002));
    });
    /* two forward intakes, canted out, with a dark mouth; the dust-filter
       housings (AMTSh) swallow them in a rounded box */
    [1, -1].forEach(function (sg) {
      var ix = 3.05, iy = sg * 0.50, iz = Z(3.05);
      if (VR.filt) {
        skin.push(sph(0.46, 18, 10, ix + 0.20, iy, iz, 1.30, 0.80, 0.86));
        dark.push(place(new V.CircleGeometry(0.30, 16), ix + 0.84, iy + sg * 0.02, iz, 0, PI / 2, 0));
        metal.push(cyl(0.33, 0.33, 0.04, 16, "x", ix + 0.82, iy + sg * 0.02, iz));
      } else {
        metal.push(cyl(0.35, 0.33, 0.55, 20, "x", ix + 0.10, iy, iz, true));
        metal.push(cyl(0.38, 0.38, 0.06, 20, "x", ix + 0.36, iy, iz, true));
        dark.push(place(new V.CircleGeometry(0.30, 16), ix + 0.38, iy, iz, 0, PI / 2, 0));
        metal.push(sph(0.12, 10, 6, ix + 0.34, iy, iz, 1.3, 1, 1));
      }
      /* exhaust pipes at the cowl's tail: round on the Mi-8, oval on the Mi-17 line */
      var ex = new V.CylinderGeometry(0.23, 0.21, 0.72, 16, 1, true);
      ex.rotateZ(-PI / 2);
      if (VR.oval) ex.scale(1, 0.80, 1.28);
      ex.translate(-2.62, sg * 0.46, Z(3.18));
      metal.push(ex);
      var exd = new V.CircleGeometry(0.19, 16);
      if (VR.oval) exd.scale(1, 0.80, 1.28);
      exd.rotateY(-PI / 2); exd.translate(-2.97, sg * 0.46, Z(3.18));
      dark.push(exd);
    });
    /* post antenna ahead of the mast (Mi-8T photograph) */
    metal.push(bar([2.0, 0, Z(3.60)], [2.1, 0, Z(4.25)], 0.014, 5, true));
    /* the mast shroud under the head, leaned with the shaft */
    var tiltM = new V.Matrix4().makeRotationY(MAST_TILT).premultiply(new V.Matrix4().makeTranslation(0, 0, Z(HUB_H)));
    [cyl(0.34, 0.30, 0.70, 18, "z", 0, 0, -0.50), cyl(0.50, 0.50, 0.10, 20, "z", 0, 0, -0.78),
     cyl(0.40, 0.40, 0.12, 20, "z", 0, 0, -0.12)].forEach(function (q) {
      q.applyMatrix4(tiltM); metal.push(q);
    });

    /* ----------------------------------------- tail pylon and tailplane --
       The boom runs level to x = -10.4 m, then the pylon sweeps up to the
       fin (silhouette: fin top about 4.7 m, 18.17 m overall). */
    var TRX = X_END + 0.42, TRY = VR.side * 0.52;
    var fA = [[-10.20, 0.11, Z(2.86)], [X_END + 0.40, 0.07, Z(3.40)], [X_END, 0.06, Z(4.30)],
              [X_END + 0.85, 0.06, Z(4.80)], [-10.80, 0.11, Z(3.40)]];
    var fB = fA.map(function (p) { return [p[0], -p[1], p[2]]; });
    skin.push(solid(fA, fB));
    /* tail rotor gearbox on the fin's flank, and the tail rotor shaft fairing */
    metal.push(place(new V.CylinderGeometry(0.14, 0.14, 0.30, 14), TRX, VR.side * 0.20, Z(TR_H), PI / 2, 0, 0));
    metal.push(bar([TRX, VR.side * 0.10, Z(TR_H)], [TRX, VR.side * 0.40, Z(TR_H)], 0.07, 10, true));
    metal.push(bar([-10.4, 0, Z(3.40)], [TRX, 0, Z(TR_H + 0.25)], 0.05, 6, true));
    /* tailplane on the boom, just ahead of the pylon, end plates, and the tail skid */
    skin.push(box(0.70, 3.20, 0.06, -10.25, 0, Z(3.05)));
    both(skin, box(0.62, 0.05, 0.30, -10.25, 1.62, Z(3.05)));
    metal.push(bar([-9.9, 0, Z(2.86)], [-10.9, 0, Z(2.05)], 0.05, 8, true));
    metal.push(box(0.45, 0.14, 0.05, -10.95, 0, Z(2.02)));

    /* markings, team flash: the star on the rear fuselage (photographs of
       Mi-8T "14 yellow" and an Mi-8MT), two small team strips on the tailplane */
    var sy = sideY(fus, -3.25, Z(2.05));
    starLayers(marks, -3.25, Z(2.05), sy, 1, 0.32, VR.star);
    starLayers(marks, -3.25, Z(2.05), -sy, -1, 0.32, VR.star);
    both(team, box(0.30, 1.0, 0.012, -10.25, 0.95, Z(3.05) + 0.036));

    /* ---------------------------------------------- tanks, outriggers -- */
    if (VR.tank) {
      both(skin, sph(0.36, 14, 8, -0.30, 1.52, Z(1.02), 3.3, 0.85, 1.0));
      both(metal, bar([0.0, 1.20, Z(1.50)], [-0.1, 1.45, Z(1.28)], 0.04, 6, true));
      both(metal, bar([-1.0, 1.20, Z(1.50)], [-0.9, 1.45, Z(1.28)], 0.04, 6, true));
      [-0.75, 0.15].forEach(function (bx) {      /* the two retaining bands round the tank */
        var bd = new V.CylinderGeometry(1, 1, 0.05, 20, 1, true);
        bd.rotateZ(-PI / 2); bd.scale(1, 0.32, 0.375); bd.translate(bx, 1.52, Z(1.02));
        both(metal, bd);
      });
      both(metal, cyl(0.07, 0.07, 0.04, 10, "z", -0.30, 1.52, Z(1.02) + 0.355));   /* filler cap */
    }
    if (VR.rig) {
      /* the outrigger beam on each side; racks on it, left EMPTY */
      both(skin, box(0.55, 1.50, 0.10, -0.55, 1.95, Z(1.78)));
      both(metal, box(0.50, 0.14, 0.26, -0.55, 1.60, Z(1.55)));
      both(metal, box(0.50, 0.14, 0.26, -0.55, 2.30, Z(1.55)));
      both(metal, bar([-0.55, 1.20, Z(1.74)], [-0.55, 1.70, Z(1.80)], 0.05, 6, true));
      both(metal, bar([-0.30, 1.20, Z(1.50)], [-0.30, 1.70, Z(1.74)], 0.035, 6, true));
      both(metal, bar([-0.80, 1.20, Z(1.50)], [-0.80, 1.70, Z(1.74)], 0.035, 6, true));
      both(dark,  box(0.50, 0.04, 0.20, -0.55, 1.60, Z(1.70)));
      both(dark,  box(0.50, 0.04, 0.20, -0.55, 2.30, Z(1.70)));
    }

    /* ----------------------------------------------- the undercarriage --
       Fixed tricycle: twin nose wheels, one big wheel each side on an
       aft-raked strut with a brace (Mi-8MT photograph). */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    both(gearR, cyl(NW_R, NW_R, NW_W, 24, "y", NW_X, NW_Y, Z(NW_R)));
    both(gearM, cyl(0.17, 0.17, NW_W + 0.01, 16, "y", NW_X, NW_Y, Z(NW_R)));
    both(gearM, cyl(0.05, 0.05, NW_W + 0.04, 8, "y", NW_X, NW_Y, Z(NW_R)));
    gearM.push(box(0.50, 0.06, 0.04, NW_X + 0.02, 0, Z(0.62)));                    /* nose-gear yoke */
    gearM.push(cyl(0.04, 0.04, 2 * NW_Y + 0.08, 8, "y", NW_X, 0, Z(NW_R)));
    gearM.push(bar([NW_X - 0.05, 0, Z(0.80)], [NW_X, 0, Z(NW_R)], 0.06, 8, true));
    gearM.push(bar([NW_X + 0.18, 0, Z(0.86)], [NW_X, 0, Z(NW_R + 0.04)], 0.04, 8, true));
    both(gearR, cyl(MW_R, MW_R, MW_W, 28, "y", MW_X, MW_Y, Z(MW_R)));
    both(gearM, cyl(0.25, 0.25, MW_W + 0.01, 20, "y", MW_X, MW_Y, Z(MW_R)));
    both(gearM, cyl(0.07, 0.07, MW_W + 0.06, 8, "y", MW_X, MW_Y, Z(MW_R)));
    var axl = [MW_X, MW_Y - MW_W / 2 - 0.02, Z(MW_R)];
    both(gearM, bar(axl, [MW_X + 0.85, 1.05, Z(1.35)], 0.07, 8, true));
    both(gearM, bar(axl, [MW_X - 0.80, 0.95, Z(1.05)], 0.05, 8, true));
    both(gearM, bar([MW_X + 0.85, 1.12, Z(1.35)], [MW_X + 0.85, 0.30, Z(0.80)], 0.04, 6, true));
    mesh(gear, gearM, T.metal, "gear_struts");
    mesh(gear, gearR, T.rubber, "tyres");

    /* ------------------------------------------------ airframe meshes -- */
    mesh(g, skin, T.skin, "airframe");
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, team, T.team, "team");
    var mk = new V.Mesh(mergeColored(marks), T.mark);
    mk.name = "markings";
    g.add(mk);

    /* ============================================================ rotor == */
    var tilt = new V.Group();
    tilt.position.set(0, 0, Z(HUB_H));
    tilt.rotation.y = MAST_TILT;
    g.add(tilt);
    var mnt = new V.Group();
    mnt.rotation.x = -PI / 2;
    tilt.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = PI / 2;
    rotor.add(head);
    var hubM = [], hubD = [], blades = [];
    hubM.push(cyl(0.30, 0.34, 0.32, 16, "z", 0, 0, 0));
    hubM.push(cyl(0.40, 0.40, 0.05, 16, "z", 0, 0, -0.30));
    hubM.push(cyl(0.14, 0.16, 0.34, 10, "z", 0, 0, 0.28));
    /* the blade: 0.52 m chord, leading edge on -Y (clockwise from above) */
    var BP = [[1.10, -0.13], [1.40, -0.16], [ROTOR_R - 0.10, -0.16], [ROTOR_R, -0.10],
              [ROTOR_R, CHORD - 0.20], [ROTOR_R - 0.06, CHORD - 0.16], [1.40, CHORD - 0.16], [1.10, 0.26]];
    for (k = 0; k < 5; k++) {
      a = (36 + 72 * k) * D2R;
      var bl = M.slab(V, BP, 0.035);
      bl.translate(0, 0, -0.02);
      bl.rotateZ(a);
      blades.push(bl);
      var parts = [box(0.62, 0.22, 0.17, 0.56, 0, 0), box(0.40, 0.28, 0.13, 1.05, 0.05, 0),
                   cyl(0.05, 0.05, 0.58, 8, "x", 0.62, 0.22, 0.04)];
      for (i = 0; i < parts.length; i++) { parts[i].rotateZ(a); hubM.push(parts[i]); }
    }
    hubM.push(cyl(0.36, 0.36, 0.07, 20, "z", 0, 0, -0.16));                       /* swashplate */
    hubM.push(cyl(0.22, 0.22, 0.10, 14, "z", 0, 0, -0.22));
    for (k = 0; k < 5; k++) {
      a = (36 + 72 * k) * D2R;
      var pl = bar([0.30 * Math.cos(a), 0.30 * Math.sin(a), -0.14], [0.52 * Math.cos(a), 0.52 * Math.sin(a), 0.10], 0.018, 5, true);
      hubM.push(pl);
      var tip = box(0.20, 0.42, 0.05, ROTOR_R - 0.10, 0.08, 0.0);
      tip.rotateZ(a); hubM.push(tip);
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, blades, T.blade, "blades");
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       Three blades of 0.22 m chord, 3.91 m across; local -Z is outboard
       in both mounts (the +PI/2 port tractor and the -PI/2 starboard
       pusher). One blade points straight aft as built. */
    var tm = new V.Group();
    tm.position.set(TRX, TRY, Z(TR_H));
    tm.rotation.x = VR.side > 0 ? PI / 2 : -PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.11, 0.11, 0.18, 12, "z", 0, 0, 0), cyl(0.07, 0.02, 0.12, 10, "z", 0, 0, -0.15)];
    var trB = [];
    for (k = 0; k < 3; k++) {
      var ang = (180 + 120 * k) * D2R;
      var tb = box(TR_R - 0.25, TR_CHORD, 0.035, 0.25 + (TR_R - 0.25) / 2, 0, 0);
      tb.rotateX(8 * D2R);
      tb.rotateZ(ang);
      tb.translate(0, 0, -0.04);
      trB.push(tb);
      var cuff = box(0.26, 0.12, 0.10, 0.18, 0, 0);
      cuff.rotateZ(ang); cuff.translate(0, 0, -0.04);
      trM.push(cuff);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.blade, "tailrotor_blades");
    return g;
  }

  return {
    t:     function (THREE, M, C) { return build(THREE, M, C, VARIANTS.t); },
    mt80:  function (THREE, M, C) { return build(THREE, M, C, VARIANTS.mt80); },
    mt90:  function (THREE, M, C) { return build(THREE, M, C, VARIANTS.mt90); },
    amtsh: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.amtsh); }
  };
})();

UNIT_MODELS["pact_e60_transport"] = { len: 25.025, build: HeroMi8.t };
UNIT_MODELS["pact_e80_transport"] = { len: 25.275, build: HeroMi8.mt80 };
UNIT_MODELS["pact_e90_transport"] = { len: 25.275, build: HeroMi8.mt90 };
UNIT_MODELS["pact_e00_transport"] = { len: 25.275, build: HeroMi8.amtsh };
UNIT_MODELS["trans_p"]            = { len: 25.275, build: HeroMi8.amtsh };
