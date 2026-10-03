/* ======= ru_mi4.js - HERO model: Mil Mi-4 Hound, the 1950s Soviet transport =======
   One key. rotor_specs.js drew pact_e50_transport as a parametric pod
   helicopter; this is the Mi-4 itself.
     pact_e50_transport   "Mil Mi-4 Hound", e50, service 1953.
   (pla_e50_transport is a separate key for the PLA's Soviet-supplied Mi-4;
   it is NOT covered here. Any aircraft transport row with no model of its
   own that resolves to the first modelled same-role peer may reach this
   one through render3d.js modelKeyFor: dump.js -- check unit lists them.)

   References, and what each gave (fetched with the generic agent name):
     en.wikipedia "Mil Mi-4": ASh-82V radial in the nose AHEAD of the
       cockpit (the H-19 layout), length 16.8 m, height 4.4 m, main rotor
       21 m; the military versions have round windows, the civil Mi-4P
       square ones.
     ru.wikipedia "Mi-4": main rotor 21 m, tail rotor 3.6 m, fuselage
       16.8 m, height 4.4 m; the first Soviet helicopter with a rear cargo
       hatch with hinged (clamshell) doors and a lowering ramp; a
       ventral gondola with the NUV-1 gun is named for the type's armed
       variant, not for the plain transport.
     Commons "MIL Mi-4 HOUND.png" (US three-view): side, plan and front
       views. Scale from the 21 m rotor span against the 16.8 m fuselage:
       hub about 3.4 m behind the nose, main wheels 4.8 m behind it and
       the nose wheels 1.1 m behind it, cabin roof about 3.4 m up, the boom
       rising to a swept tail pylon carrying the tail rotor above the
       rotor plane's lower half; a small tailplane on the boom; the
       four-bladed main rotor, three-bladed tail rotor, four wheels.
     Commons "Mi4 Puspenerbad.jpg" (side photograph, port side): the high
       cockpit over the nose engine, the cargo-door line on the rear
       cabin, the belly rising into the boom, the twin nose wheels, the
       struts under the boom.
     Commons "IAF Mi-4 in NEFA 1962" and "Mi-4 at Namka Chu": the raised
       cockpit and the nose, black and white only (no colour from them).

   Why 25.2 m long: UNIT_MODELS.len is the MEASURED x extent, as the Mi-24
   (21.35), Mi-28N and Ka-27 heroes give it: the main disc's 7.1 m ahead of
   the nose to the aft tail-rotor blade tip (render3d.js scales by the
   measured extent, not by len).

   Not drawn, and why:
     - the ventral gondola with the gun: none of the three-views and photographs
       read for this file shows it on the plain transport, and the row is the
       transport, so there is none.
     - paint: no colour photograph of a Soviet Mi-4 was read, so the plain
       dark service green is used, no camouflage pattern is invented.
     - the red star is drawn where the Soviet practice puts it on the rear
       fuselage (as pact_hind_mi24.js does, both sides); none of the
       photographs read here shows a Soviet star, so its place is NOT
       confirmed from a Mi-4 photograph. No bort numbers.
     - the mast's forward lean: could not be read.
     - the red star's colour and exact place: see above; a Soviet Mi-4
       photograph was not found. Operators' Mi-4 photographs (Czech 9147,
       Indonesian AURI) put the national roundel on the rear cabin side
       just ahead of the boom root, which is where the star sits.
     CHECK-AND-FIX photographs: Commons "Mi-4 Kyiv Museum 2018 G1" (Aeroflot,
       starboard front three-quarter), "Mil Mi-4 '9147'" (Czech, port front),
       "Mil MI-4-Hound" (Indonesian, starboard front), "Republican helicopter".
     - bulk: belly 0.85 m, cabin roof 3.45 m above ground, 2.2-2.25 m wide, a
       tall boxy glasshouse on the roof behind the bulbous nose engine, top
       3.9 m (all three photographs, the side three-view); boom top about
       3.4 m, its underside rising into the tail.
     - tail rotor on the STARBOARD side: in both starboard three-quarter
       photographs the shaft carries the hub out to the near side, so it
       appears aft of the gearbox elbow and clear of the fin (a port rotor
       would sit forward of the elbow behind the fin). The US three-view's
       plan puts it to port; the photographs outrank it.

   NAMED NODES (as pact_hind_mi24.js, checked by tools/jsc/rotor_axes_check.js):
     rotor      -PI/2 about X mount, head turning clockwise from above
     rotordisc  the blur disc inside the main rotor
     tailrotor  -PI/2 about X mount on the starboard side of the fin, one blade
                pointing straight aft as built
     gear       the four-wheel undercarriage: lowest opaque part parked.
   Model space +X nose, +Y port, +Z up, metres. The origin is under the
   mast, 2.00 m above the wheel plane.
   Materials, ten: SKIN, GLASS, METAL, DARK, RUBBER, BLADE, TEAM (exactly
   C.team, one small roof panel), STAR red and white, DISC. ASCII only.      */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMi4 = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180;
  var V = null;

  var GROUND = -2.00;
  function Z(h) { return GROUND + h; }
  var HUB_H = 4.15;
  var ROTOR_R = 10.5, CHORD = 0.55;
  var TR_R = 1.8, TR_CHORD = 0.22;
  var TR_X = -12.90, TR_Y = -0.50, TR_H = 4.60;
  var RING_N = 24;

  /* ----------------------------------------------------------- geometry kit */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  function cyl(r0, r1, len, seg, axis, x, y, z, open) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg, capped) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
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
    var pos = [], nor = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      if (!g.attributes.normal) g.computeVertexNormals();
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
  /* an extruded convex outline in the xz plane, centred on y = 0 */
  function plank(pts, t) {
    var A = pts.map(function (p) { return [p[0], -t / 2, p[1]]; });
    var B = pts.map(function (p) { return [p[0], t / 2, p[1]]; });
    var faces = [A, B], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }

  /* --------------------------------------------------------- the fuselage */
  function sec(x, zb, zt, zm, wb, wm, wt, e) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e, yc: 0 };
  }
  function ringPt(s, th) {
    var c = Math.cos(th), sn = Math.sin(th);
    var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
    var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
    var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
    return [W * Math.pow(Math.abs(c), s.e) + s.yc, z];
  }
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) pts.push(ringPt(s, -PI / 2 + PI * i / n));
    for (i = n - 1; i >= 1; i--) pts.push([2 * s.yc - pts[i][0], pts[i][1]]);
    return pts;
  }
  function loft(secs, n) {
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
    function cap(k, front) {
      var s = secs[k], r = ringOf(s, n), t = [], cy = 0, cz = 0;
      for (j = 0; j < rl; j++) { cy += r[j][0]; cz += r[j][1]; }
      var o = [s.x, cy / rl, cz / rl];
      for (j = 0; j < rl; j++) {
        var p0 = [s.x, r[j][0], r[j][1]], p1 = [s.x, r[(j + 1) % rl][0], r[(j + 1) % rl][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    cap(0, true);
    cap(secs.length - 1, false);
    return out;
  }
  function lerpSec(A, B, f) {
    var o = {};
    ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e", "yc"].forEach(function (k) { o[k] = A[k] + (B[k] - A[k]) * f; });
    return o;
  }
  function densify(keys, sub) {
    var out = [], q, k;
    for (q = 0; q < keys.length - 1; q++) for (k = 0; k < sub; k++) out.push(lerpSec(keys[q], keys[q + 1], k / sub));
    out.push(keys[keys.length - 1]);
    return out;
  }
  /* x from the hub, forward positive; decreasing along the list.
              x      zb    zt    zm    wb    wm    wt    e              */
  var FUS = [
    sec( 3.40, 1.22, 2.18, 1.70, 0.30, 0.38, 0.30, 0.80),
    sec( 3.34, 1.08, 2.34, 1.70, 0.52, 0.64, 0.50, 0.72),
    sec( 3.12, 0.98, 2.50, 1.74, 0.70, 0.80, 0.62, 0.64),
    sec( 2.70, 0.92, 2.62, 1.77, 0.78, 0.88, 0.68, 0.60),
    sec( 2.40, 0.90, 2.66, 1.78, 0.80, 0.90, 0.70, 0.58),
    sec( 2.30, 0.90, 2.72, 1.82, 0.82, 0.92, 0.70, 0.54),
    sec( 1.95, 0.88, 3.05, 1.95, 0.88, 1.02, 0.74, 0.50),
    sec( 1.20, 0.86, 3.30, 2.08, 0.96, 1.10, 0.84, 0.48),
    sec( 0.00, 0.85, 3.45, 2.15, 1.00, 1.12, 0.90, 0.48),
    sec(-1.50, 0.85, 3.45, 2.15, 1.00, 1.12, 0.92, 0.48),
    sec(-3.00, 0.86, 3.40, 2.13, 0.94, 1.06, 0.86, 0.50),
    sec(-3.90, 1.02, 3.35, 2.18, 0.80, 0.95, 0.76, 0.54),
    sec(-4.90, 1.50, 3.30, 2.40, 0.62, 0.75, 0.62, 0.60),
    sec(-6.00, 2.05, 3.32, 2.68, 0.44, 0.52, 0.44, 0.70),
    sec(-8.00, 2.55, 3.38, 2.96, 0.32, 0.39, 0.32, 0.80),
    sec(-10.5, 2.80, 3.42, 3.11, 0.22, 0.26, 0.22, 0.80),
    sec(-12.4, 2.92, 3.48, 3.20, 0.15, 0.17, 0.15, 0.80)
  ];
  var DENSE = densify(FUS, 2);
  function secAt(x) {
    for (var q = 0; q < FUS.length - 1; q++) {
      var A = FUS[q], B = FUS[q + 1];
      if (x <= A.x && x >= B.x) return lerpSec(A, B, (A.x - x) / (A.x - B.x));
    }
    return FUS[FUS.length - 1];
  }
  /* the skin's half-width at height z and station x */
  function sideY(x, z) {
    var s = secAt(x), up = z >= s.zm;
    var m = up ? (z - s.zm) / (s.zt - s.zm) : (s.zm - z) / (s.zm - s.zb);
    m = Math.max(0, Math.min(1, m));
    var sn = Math.pow(m, 1 / s.e), cs = Math.sqrt(Math.max(0, 1 - sn * sn));
    var W = s.wm + ((up ? s.wt : s.wb) - s.wm) * m;
    return W * Math.pow(cs, s.e);
  }

  /* the Soviet star: red, white border, thin red edge, each point laid on
     the skin (y found per vertex) so it follows the rear fuselage side */
  function starTris(side, xc, zc, r, off) {
    var pts = [], i, a, q, x, z;
    for (i = 0; i < 10; i++) {
      a = PI / 2 + i * PI / 5; q = (i & 1) ? 0.40 : 1;
      x = xc + Math.cos(a) * q * r; z = zc + Math.sin(a) * q * r;
      pts.push([x, side * (sideY(x, z) + off), z]);
    }
    var c = [xc, side * (sideY(xc, zc) + off), zc], out = [];
    for (i = 0; i < 10; i++) {
      var p = pts[i], n = pts[(i + 1) % 10];
      var ny = (p[2] - c[2]) * (n[0] - c[0]) - (p[0] - c[0]) * (n[2] - c[2]);
      if (ny * side >= 0) out.push(c, p, n); else out.push(c, n, p);
    }
    return tris(out);
  }

  /* ======================================================== the build */
  function build(THREE, M, C) {
    V = THREE;
    var g = new V.Group();
    g.name = "mi4";
    var i, k, a, side;
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    var T = {
      skin:  new V.MeshStandardMaterial({ color: 0x4d5639, roughness: 0.84, metalness: 0.08 }),
      glass: new V.MeshPhysicalMaterial({ color: 0x1d2c33, roughness: 0.08, metalness: 0.20,
                                          clearcoat: 1.0, clearcoatRoughness: 0.05 }),
      metal: new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 }),
      dark:  new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.35 }),
      rubber: new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 }),
      blade: new V.MeshStandardMaterial({ color: 0x353a36, roughness: 0.78, metalness: 0.14 }),
      team:  new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 }),
      starR: new V.MeshStandardMaterial({ color: 0xa8261f, roughness: 0.7, metalness: 0.05 }),
      starW: new V.MeshStandardMaterial({ color: 0xe2e0d8, roughness: 0.7, metalness: 0.05 }),
      disc:  new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                          transparent: true, opacity: 0.05, depthWrite: false })
    };
    var skin = [], glass = [], metal = [], dark = [], team = [], starR = [], starW = [];
    var gearM = [], gearR = [];

    /* fuselage and boom, one loft */
    loft(DENSE, RING_N).forEach(function (q) { skin.push(q); });

    /* tail pylon: swept fin carrying the tail rotor gearbox, a shaft out to
       the starboard side where the rotor hangs */
    skin.push(plank([[-10.9, Z(3.38)], [-12.4, Z(3.30)], [-13.40, Z(4.50)], [-13.00, Z(4.78)]], 0.20));
    skin.push(cyl(0.13, 0.13, 0.36, 12, "y", TR_X, 0, Z(TR_H)));
    metal.push(cyl(0.085, 0.085, 0.50, 10, "y", TR_X, TR_Y / 2, Z(TR_H)));
    /* tailplane under the boom, braced to it by two short struts */
    skin.push(box(0.55, 2.40, 0.06, -9.30, 0, Z(2.76)));
    both(metal, bar([-9.30, 0.60, Z(2.79)], [-9.30, 0.22, Z(2.92)], 0.025, 6, true));
    /* tail skid under the boom */
    metal.push(bar([-11.1, 0, Z(2.98)], [-12.0, 0, Z(2.50)], 0.035, 6, true));

    /* nose engine: the cooling-air ring and starter disc on the face, the
       clamshell doors' centre seam and side hinge seams */
    var nz = Z(1.70);
    var ring = new V.RingGeometry(0.17, 0.30, 24, 1); ring.rotateY(PI / 2); ring.translate(3.405, 0, nz);
    dark.push(ring);
    var hubd = new V.CircleGeometry(0.10, 16); hubd.rotateY(PI / 2); hubd.translate(3.405, 0, nz);
    dark.push(hubd);
    dark.push(box(0.012, 0.03, 0.50, 3.41, 0, nz));
    for (side = -1; side <= 1; side += 2) {
      var zs = [1.10, 1.70, 2.30];
      for (i = 0; i < 2; i++) {
        var p0 = [2.55, side * (sideY(2.55, Z(zs[i])) + 0.01), Z(zs[i])];
        var p1 = [2.55, side * (sideY(2.55, Z(zs[i + 1])) + 0.01), Z(zs[i + 1])];
        dark.push(bar(p0, p1, 0.016, 5, true));
      }
      /* the cowl's lower door line along the side */
      for (i = 0; i < 3; i++) {
        var xa = 3.20 - i * 0.22, xb = xa - 0.22;
        dark.push(bar([xa, side * (sideY(xa, Z(1.30)) + 0.008), Z(1.30)],
                      [xb, side * (sideY(xb, Z(1.30)) + 0.008), Z(1.30)], 0.014, 5, true));
      }
    }

    /* cockpit: a tall glasshouse standing on the cabin roof behind the nose
       engine (three-view and photographs of a Soviet-built and an
       Indonesian Mi-4), a raked windscreen and side windows */
    var HZ = [Z(2.55), Z(3.10), Z(3.88), Z(3.92)];
    function hv(x, y, z) { return [x, y, z]; }
    var hullP = [];
    for (side = -1; side <= 1; side += 2) {
      hullP.push([hv(2.42, 0.62 * side, HZ[0]), hv(1.82, 0.52 * side, HZ[2]), hv(0.10, 0.58 * side, HZ[3]), hv(-0.15, 0.90 * side, HZ[1])]);
    }
    var HR = hullP[0], HL = hullP[1];
    skin.push(convex([HR, HL,
      [HR[0], HL[0], HL[1], HR[1]], [HR[1], HL[1], HL[2], HR[2]],
      [HR[2], HL[2], HL[3], HR[3]], [HR[3], HL[3], HL[0], HR[0]]]));
    function hullY(x, z) {
      var f = (2.42 - x) / 2.57;
      var yb = 0.62 + 0.28 * f, zbb = HZ[0] + (HZ[1] - HZ[0]) * f;
      var yt = 0.52 + 0.06 * Math.max(0, Math.min(1, (1.82 - x) / 1.72));
      var t = Math.max(0, Math.min(1, (z - zbb) / (HZ[2] - zbb)));
      return yb + (yt - yb) * t;
    }
    /* windscreen on the raked front face */
    glass.push(box(1.43, 0.95, 0.03, 2.12 + 0.027, 0, (HZ[0] + HZ[2]) / 2 + 0.013, 0, 65.2 * D2R, 0));
    for (side = -1; side <= 1; side += 2) {
      glass.push(box(0.46, 0.03, 0.52, 1.30, side * (hullY(1.30, Z(3.40)) + 0.012), Z(3.40)));
      glass.push(box(0.46, 0.03, 0.52, 0.62, side * (hullY(0.62, Z(3.40)) + 0.012), Z(3.40)));
      /* round cabin windows of the military version */
      for (i = 0; i < 4; i++) {
        var wx = -0.55 - i * 1.0;
        var wy = side * (sideY(wx, Z(2.35)) + 0.012);
        glass.push(cyl(0.17, 0.17, 0.035, 18, "y", wx, wy, Z(2.35)));
        dark.push(cyl(0.205, 0.205, 0.02, 18, "y", wx, wy, Z(2.35)).translate(0, side * -0.006, 0));
      }
    }

    /* the rear cargo hatch: clamshell door seams in the belly and sides */
    var bk = [-3.90, -4.50, -5.20, -6.00];
    for (i = 0; i < bk.length - 1; i++)
      dark.push(bar([bk[i], 0, secAt(bk[i]).zb - 0.006], [bk[i + 1], 0, secAt(bk[i + 1]).zb - 0.006], 0.018, 5, true));
    dark.push(box(0.03, 1.00, 0.02, -3.90, 0, secAt(-3.90).zb - 0.006));
    for (side = -1; side <= 1; side += 2) {
      var zk = [1.0, 1.5, 2.0, 2.5];
      for (i = 0; i < 3; i++) {
        dark.push(bar([-4.40, side * (sideY(-4.40, Z(zk[i])) + 0.008), Z(zk[i])],
                      [-4.40, side * (sideY(-4.40, Z(zk[i + 1])) + 0.008), Z(zk[i + 1])], 0.014, 5, true));
      }
    }

    /* the mast, its fairing, the swashplate */
    metal.push(cyl(0.13, 0.15, 1.10, 14, "z", 0, 0, Z(3.60)));
    skin.push(cyl(0.40, 0.55, 0.34, 20, "z", 0, 0, Z(3.70)));
    metal.push(cyl(0.34, 0.34, 0.06, 18, "z", 0, 0, Z(3.78)));
    for (i = 0; i < 4; i++) {
      a = (45 + 90 * i) * D2R;
      metal.push(bar([Math.cos(a) * 0.28, Math.sin(a) * 0.28, Z(3.80)], [Math.cos(a) * 0.20, Math.sin(a) * 0.20, Z(4.05)], 0.02, 5, true));
    }

    /* team colour: one small up-facing panel on the cabin roof aft of the mast */
    var roof = secAt(-2.2).zt;
    team.push(box(1.30, 0.80, 0.03, -2.2, 0, roof + 0.005));

    /* red star on the rear fuselage, both sides */
    for (side = -1; side <= 1; side += 2) {
      starR.push(starTris(side, -5.15, Z(2.36), 0.42, 0.016));
      starW.push(starTris(side, -5.15, Z(2.36), 0.375, 0.022));
      starR.push(starTris(side, -5.15, Z(2.36), 0.335, 0.028));
    }

    /* ------------------------------------------------ undercarriage ---- */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    /* nose: twin wheels on a trailing axle under the engine */
    var NWX = 2.30, NWR = 0.26;
    gearR.push(cyl(NWR, NWR, 0.13, 24, "y", NWX, 0.19, Z(NWR)));
    gearR.push(cyl(NWR, NWR, 0.13, 24, "y", NWX, -0.19, Z(NWR)));
    gearM.push(cyl(0.11, 0.11, 0.14, 12, "y", NWX, 0.19, Z(NWR)));
    gearM.push(cyl(0.11, 0.11, 0.14, 12, "y", NWX, -0.19, Z(NWR)));
    gearM.push(cyl(0.03, 0.03, 0.50, 8, "y", NWX, 0, Z(NWR)));
    gearM.push(bar([NWX + 0.12, 0, Z(1.00)], [NWX + 0.10, 0, Z(0.52)], 0.06, 10, true));
    gearM.push(bar([NWX + 0.10, 0, Z(0.52)], [NWX, 0, Z(NWR)], 0.045, 8, true));
    gearM.push(bar([NWX - 0.35, 0, Z(0.95)], [NWX + 0.06, 0, Z(0.50)], 0.03, 6, true));
    /* main: one wheel each side on a strut with a rear brace */
    var MWX = -1.40, MWY = 1.65, MWR = 0.44;
    for (side = -1; side <= 1; side += 2) {
      var wy = side * MWY;
      gearR.push(cyl(MWR, MWR, 0.24, 28, "y", MWX, wy, Z(MWR)));
      gearM.push(cyl(0.20, 0.20, 0.26, 14, "y", MWX, wy, Z(MWR)));
      gearM.push(cyl(0.05, 0.05, 0.34, 8, "y", MWX, wy - side * 0.10, Z(MWR)));
      gearM.push(bar([MWX, side * 0.80, Z(1.25)], [MWX, wy - side * 0.12, Z(MWR)], 0.06, 10, true));
      gearM.push(bar([MWX - 1.05, side * 0.50, Z(1.05)], [MWX, wy - side * 0.12, Z(MWR)], 0.04, 8, true));
      gearM.push(bar([MWX + 0.95, side * 0.50, Z(1.05)], [MWX, wy - side * 0.12, Z(MWR)], 0.04, 8, true));
      gearM.push(bar([MWX, side * 0.55, Z(1.05)], [MWX, side * 0.95, Z(1.30)], 0.035, 6, true));
    }
    mesh(gear, gearM, T.metal, "gear_struts");
    mesh(gear, gearR, T.rubber, "tyres");

    /* ------------------------------------------------- airframe meshes */
    mesh(g, skin, T.skin, "airframe");
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, team, T.team, "team");
    mesh(g, starR, T.starR, "star_red");
    mesh(g, starW, T.starW, "star_white");

    /* ---------------------------------------------------- main rotor ---- */
    var tilt = new V.Group();
    tilt.position.set(0, 0, Z(HUB_H));
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
    hubM.push(cyl(0.28, 0.32, 0.30, 18, "z", 0, 0, 0));
    hubM.push(cyl(0.38, 0.38, 0.05, 18, "z", 0, 0, -0.28));
    hubD.push(cyl(0.12, 0.15, 0.30, 12, "z", 0, 0, 0.28));
    var BP = [[1.10, -0.14], [1.40, -0.18], [ROTOR_R - 0.10, -0.18], [ROTOR_R, -0.12],
              [ROTOR_R, CHORD - 0.22], [ROTOR_R - 0.06, CHORD - 0.18], [1.40, CHORD - 0.18], [1.10, 0.30]];
    for (k = 0; k < 4; k++) {
      a = (45 + 90 * k) * D2R;
      var bl = M.slab(V, BP, 0.04);
      bl.translate(0, 0, -0.02);
      bl.rotateZ(a);
      blades.push(bl);
      var parts = [[box(0.60, 0.22, 0.17, 0.52, 0, 0), hubM],
                   [box(0.40, 0.28, 0.13, 1.00, 0.05, 0), hubM],
                   [cyl(0.05, 0.05, 0.55, 8, "x", 0.58, 0.22, 0.04), hubD],
                   [cyl(0.025, 0.025, 0.28, 6, "z", 0.48, -0.20, -0.15), hubD]];
      for (i = 0; i < parts.length; i++) { parts[i][0].rotateZ(a); parts[i][1].push(parts[i][0]); }
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD, T.dark, "hub_dampers");
    mesh(head, blades, T.blade, "blades");
    var dsc = new V.CircleGeometry(ROTOR_R, 48); dsc.translate(0, 0, 0.03);
    mesh(head, [dsc], T.disc, "rotordisc");

    /* --------------------------------------------------- tail rotor ---- */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y, Z(TR_H));
    tm.rotation.x = -PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.10, 0.10, 0.17, 12, "z", 0, 0, 0), cyl(0.065, 0.02, 0.12, 10, "z", 0, 0, -0.14)];
    var trB = [];
    for (k = 0; k < 3; k++) {
      var ang = (180 + 120 * k) * D2R;
      var tb = box(TR_R - 0.25, TR_CHORD, 0.035, 0.25 + (TR_R - 0.25) / 2, 0, 0);
      tb.rotateX(8 * D2R);
      tb.rotateZ(ang);
      tb.translate(0, 0, -0.04);
      trB.push(tb);
      var cuff = box(0.26, 0.11, 0.09, 0.18, 0, 0);
      cuff.rotateZ(ang); cuff.translate(0, 0, -0.04);
      trM.push(cuff);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.blade, "tailrotor_blades");

    return g;
  }

  return { build: build };
})();

UNIT_MODELS["pact_e50_transport"] = { len: 25.2, build: HeroMi4.build };
