/* ======= ru_ka50.js - HERO model: Kamov Ka-50 Black Shark =======
   The single-seat coaxial attack helicopter, for
     pact_e90_gunship  "Ka-50 Black Shark" / "Kamov Ka-50" (service 1995)
   Before this file the key had no hero (eras.js row, rotor_specs.js entry
   config "coaxial", 3 blades, stubs, camo "black"; generations.js gives it
   the 2A42 30 mm cannon and the 9K121 Vikhr). No other row uses this key
   as its own model; the key is only borrowed by stand-ins (modelKeyFor
   picks the first same-category peer of ROLES.gunship that has a model),
   see the report.

   References (Wikimedia Commons, fetched at 800 px; none is a dimensioned
   three-view, so every figure below that is not a published one is a scale
   off these photographs):
     - "Hokum drawing" (port-side line drawing): the long sloped nose, the
       cockpit glazing, the coaxial rotors with the lower head just above
       the cabin roof, the raked tail fin and the low tail boom.
     - "Russian Air Force Kamov Ka-50" (starboard, in flight, nose right):
       the dark-green and tan-olive blotched upper scheme with the black
       nose cap and a black patch under the cockpit, round engine intake
       and the round exhaust grille on the flank, the stub wing with its
       wingtip pod and pylons, the 2A42 cannon low on the starboard side,
       the tailplane with its endplate plates and the red star on the fin.
     - "KA50 weapons" (front three-quarter, ground): the forward-facing
       round engine intakes on the twin nacelles, the wing with a 20-tube
       rocket pod on the inner pylon and a six-tube Vikhr pack on the outer
       pylon, the cannon fairing and barrel, the tricycle gear.
     - "Ka-50 Heck" (tail close-up): the fin shape and the endplates.
     - a 1990s black demonstrator photograph (Ka-50 at Paris, black paint)
       for the gear, the cockpit side glazing and the pod loads; the black
       scheme itself is NOT used - the row is the service helicopter.
   Published figures: fuselage length about 15.0 m with the cannon,
   rotor diameter 14.5 m, height 4.93 m, wing span about 7.3 m. Gear
   track, mast spacing, wing chord, fin and nacelle sizes are photo scale.
   Paint: ONE plain dark green (material colour 0x55633f, no vertex colours,
   so the renderer's sRGB conversion treats it like every other material).
   NOT CONFIRMED: no dated photograph of an in-service (Torzhok, 1995-2000)
   Ka-50 exists on Commons; the only 1990s pictures (MAKS 1993, "Ka-50 NTW
   7 8 93") show the black demonstrators "021" / "H317", which are not used,
   and the blotched green-tan scheme is of the 2005 aircraft only, so it is
   not copied. The green is the dominant colour of that 2005 scheme. The red
   star (thin white edge) on both sides of the fin only, as on the 2005
   photographs; no bort number, no badge, no lettering.
   Nose: blunt, deep rounded chin as in the 1993 side and front photographs
   (the first cut tapered to a point). Mains sit under the stub wing.
   Stores, from the photographs and the row only: inner pylons with a
   20-round rocket pod, outer pylons with a six-tube Vikhr pack.
   Team colour: one small up-facing strip on top of each stub wing.
   Not modelled: the Shkval sight window and the pitot are only a black
   nose cap; flare dispensers and the gear doors are not drawn.
   Rotors: two "rotor" heads on one mast, each with a "rotordisc", the same
   mount as pact_ka27_helix.js and ru_ka25.js (the renderer turns the second
   head the other way). "gear" is the lowest opaque part, drawn extended.
   ASCII only.

   Model space +X nose, +Y port, +Z up, metres; z = 0 is 2.30 m above the
   wheel contact plane, the origin is the mast axis. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKa50 = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180;
  var V = null;
  var GROUND = -2.30;
  function Z(h) { return GROUND + h; }
  var ROTOR_R = 7.25, H_LO = 3.54, H_UP = 4.68;
  var FIN = [[-5.95, 1.30], [-8.40, 1.25], [-8.55, 2.95], [-7.55, 3.02]];

  /* ---- geometry kit (the same as ru_ka25.js) ---- */
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz) geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); }
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2); else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs); g.scale(sx || 1, sy || 1, sz || 1); return place(g, x, y, z);
  }
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  function mirrorY(geo) {
    var g = geo.index ? geo.toNonIndexed() : geo.clone();
    var p = g.attributes.position.array, n = g.attributes.normal ? g.attributes.normal.array : null;
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
  function mesh(parent, list, mat, name, paint) {
    if (!list.length) return null;
    var geo = merge(list);
    if (paint) paint(geo);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function finSlab(poly, yc, th) {
    var pts = [], n = poly.length, i, cx = 0, ch = 0;
    for (i = 0; i < n; i++) { cx += poly[i][0] / n; ch += poly[i][1] / n; }
    var yp = yc + th / 2, ym = yc - th / 2;
    function P(i, y) { return [poly[i][0], y, Z(poly[i][1])]; }
    var C1 = [cx, yp, Z(ch)], C0 = [cx, ym, Z(ch)];
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      pts.push(C1, P(i, yp), P(j, yp));
      pts.push(C0, P(j, ym), P(i, ym));
      pts.push(P(i, ym), P(j, yp), P(i, yp), P(i, ym), P(j, ym), P(j, yp));
    }
    return tris(pts);
  }
  /* a flat star on the +y face at offset y, in (x, z) */
  function starGeo(cx, cz, r, y) {
    var pts = [], i, P = [];
    for (i = 0; i < 10; i++) {
      var a = PI / 2 + i * PI / 5, q = (i & 1) ? r * 0.40 : r;
      P.push([cx + Math.cos(a) * q, y, cz + Math.sin(a) * q]);
    }
    var o = [cx, y, cz];
    for (i = 0; i < 10; i++) pts.push(o, P[(i + 1) % 10], P[i]);
    return tris(pts);
  }

  /* ---- loft ---- */
  function sec(x, zb, zt, zm, wb, wm, wt, e) { return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e }; }
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) {
      var th = -PI / 2 + PI * i / n, c = Math.cos(th), sn = Math.sin(th);
      var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
      var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
      var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
      pts.push([W * Math.pow(Math.abs(c), s.e), z]);
    }
    for (i = n - 1; i >= 1; i--) pts.push([-pts[i][0], pts[i][1]]);
    return pts;
  }
  function loft(secs, n, noseDx, tailDx, dy) {
    var pos = [], idx = [], rl = 2 * n, i, j;
    dy = dy || 0;
    for (i = 0; i < secs.length; i++) {
      var r = ringOf(secs[i], n);
      for (j = 0; j < rl; j++) pos.push(secs[i].x, r[j][0] + dy, r[j][1]);
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
      var o = [s.x + dx, cy / rl + dy, cz / rl];
      for (j = 0; j < rl; j++) {
        var p0 = [s.x, r[j][0] + dy, r[j][1]], p1 = [s.x, r[(j + 1) % rl][0] + dy, r[(j + 1) % rl][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (noseDx !== null) cap(0, noseDx, true);
    if (tailDx !== null) cap(secs.length - 1, -tailDx, false);
    return out;
  }
  /* ---- conformal glazing: rays against the loft triangles ---- */
  function triList(geo) {
    var p = geo.attributes.position.array, ix = geo.index ? geo.index.array : null;
    var n = ix ? ix.length : p.length / 3, out = [], i, a, b, c;
    for (i = 0; i < n; i += 3) {
      a = 3 * (ix ? ix[i] : i); b = 3 * (ix ? ix[i + 1] : i + 1); c = 3 * (ix ? ix[i + 2] : i + 2);
      out.push([p[a], p[a + 1], p[a + 2], p[b], p[b + 1], p[b + 2], p[c], p[c + 1], p[c + 2]]);
    }
    return out;
  }
  function cast(tl, o, d) {
    var best = null, i;
    for (i = 0; i < tl.length; i++) {
      var T = tl[i];
      var ax = T[3] - T[0], ay = T[4] - T[1], az = T[5] - T[2];
      var bx = T[6] - T[0], by = T[7] - T[1], bz = T[8] - T[2];
      var px = d[1] * bz - d[2] * by, py = d[2] * bx - d[0] * bz, pz = d[0] * by - d[1] * bx;
      var det = ax * px + ay * py + az * pz;
      if (Math.abs(det) < 1e-12) continue;
      var inv = 1 / det, tx = o[0] - T[0], ty = o[1] - T[1], tz = o[2] - T[2];
      var u = (tx * px + ty * py + tz * pz) * inv;
      if (u < 0 || u > 1) continue;
      var qx = ty * az - tz * ay, qy = tz * ax - tx * az, qz = tx * ay - ty * ax;
      var v = (d[0] * qx + d[1] * qy + d[2] * qz) * inv;
      if (v < 0 || u + v > 1) continue;
      var t = (bx * qx + by * qy + bz * qz) * inv;
      if (t > 0 && (!best || t < best.t)) {
        var nx = ay * bz - az * by, ny = az * bx - ax * bz, nz = ax * by - ay * bx;
        var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        if (nx * d[0] + ny * d[1] + nz * d[2] > 0) nl = -nl;
        best = { t: t, n: [nx / nl, ny / nl, nz / nl] };
      }
    }
    return best;
  }
  function pane(tl, nu, nv, ray, lift) {
    var P = [], pts = [], i, j;
    for (j = 0; j <= nv; j++) for (i = 0; i <= nu; i++) {
      var r = ray(i / nu, j / nv), o = r[0], d = r[1], h = cast(tl, o, d);
      if (!h) return null;
      P.push([o[0] + d[0] * h.t + h.n[0] * lift, o[1] + d[1] * h.t + h.n[1] * lift,
              o[2] + d[2] * h.t + h.n[2] * lift, h.n]);
    }
    function at(a, b) { return P[b * (nu + 1) + a]; }
    function tri(a, b, c) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2], m = a[3];
      if ((uy * vz - uz * vy) * m[0] + (uz * vx - ux * vz) * m[1] + (ux * vy - uy * vx) * m[2] < 0) pts.push(a, c, b);
      else pts.push(a, b, c);
    }
    for (j = 0; j < nv; j++) for (i = 0; i < nu; i++) {
      tri(at(i, j), at(i + 1, j), at(i + 1, j + 1));
      tri(at(i, j), at(i + 1, j + 1), at(i, j + 1));
    }
    return tris(pts);
  }

  function makeMats(C) {
    var m = {};
    m.skin  = new V.MeshStandardMaterial({ color: 0x55633f, roughness: 0.82, metalness: 0.06 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.35 });
    m.blade = new V.MeshStandardMaterial({ color: 0x33372f, roughness: 0.80, metalness: 0.10 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshPhysicalMaterial({ color: 0x1c2e34, roughness: 0.08, metalness: 0.20, clearcoat: 1.0,
                                           clearcoatRoughness: 0.05, polygonOffset: true,
                                           polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    m.light = new V.MeshStandardMaterial({ color: 0xd8dad4, roughness: 0.60, metalness: 0.05 });
    m.red   = new V.MeshStandardMaterial({ color: 0xa8271f, roughness: 0.70, metalness: 0.02,
                                           polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                          transparent: true, opacity: 0.05, depthWrite: false });
    return m;
  }

  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "ka50";
    var i, k, s, a;
    var skin = [], glass = [], dark = [], metal = [], team = [], light = [], red = [];

    /* fuselage: x, belly, top, widest, wb, wm, wt, e (heights above ground) */
    var FUS = [
      sec( 6.38, 1.08, 1.50, 1.30, 0.14, 0.26, 0.14, 0.70),
      sec( 6.20, 0.98, 1.68, 1.34, 0.26, 0.40, 0.24, 0.60),
      sec( 5.70, 0.92, 1.96, 1.44, 0.36, 0.52, 0.34, 0.54),
      sec( 4.60, 0.88, 2.30, 1.56, 0.40, 0.62, 0.36, 0.50),
      sec( 3.30, 0.85, 2.55, 1.62, 0.48, 0.70, 0.40, 0.48),
      sec( 1.80, 0.85, 2.62, 1.62, 0.50, 0.74, 0.46, 0.48),
      sec( 0.20, 0.88, 2.62, 1.64, 0.50, 0.74, 0.50, 0.50),
      sec(-1.50, 0.95, 2.60, 1.66, 0.48, 0.70, 0.48, 0.52),
      sec(-2.80, 1.05, 2.48, 1.70, 0.36, 0.52, 0.38, 0.58),
      sec(-4.20, 1.10, 2.00, 1.56, 0.24, 0.30, 0.22, 0.70),
      sec(-5.80, 1.10, 1.70, 1.40, 0.17, 0.20, 0.16, 0.76),
      sec(-7.20, 1.12, 1.55, 1.33, 0.13, 0.15, 0.12, 0.80),
      sec(-8.30, 1.12, 1.45, 1.28, 0.09, 0.10, 0.08, 0.82)
    ];
    var fusLoft = loft(FUS, 30, 0.12, 0.10);
    skin = skin.concat(fusLoft);
    var tl = triList(fusLoft[0]);

    /* twin engine nacelles side by side over the cabin roof */
    var NAC = [
      sec( 1.40, 2.30, 2.80, 2.56, 0.12, 0.30, 0.20, 0.60),
      sec( 1.25, 2.20, 3.00, 2.62, 0.22, 0.40, 0.28, 0.52),
      sec( 0.60, 2.15, 3.06, 2.62, 0.26, 0.44, 0.30, 0.50),
      sec(-1.40, 2.15, 3.06, 2.62, 0.26, 0.44, 0.30, 0.50),
      sec(-2.50, 2.18, 2.96, 2.58, 0.24, 0.40, 0.26, 0.52),
      sec(-3.10, 2.22, 2.62, 2.42, 0.14, 0.22, 0.14, 0.60)
    ];
    for (s = -1; s <= 1; s += 2) skin = skin.concat(loft(NAC, 22, 0.05, 0.05, s * 0.52));
    for (s = -1; s <= 1; s += 2) {
      /* round intakes facing forward, with a bullet and a bright ring */
      dark.push(cyl(0.33, 0.33, 0.08, 20, "x", 1.43, s * 0.52, Z(2.62)));
      metal.push(cyl(0.38, 0.36, 0.07, 20, "x", 1.37, s * 0.52, Z(2.62)));
      metal.push(sph(0.13, 10, 8, 1.50, s * 0.52, Z(2.62), 1.3, 1, 1));
      /* exhaust nozzles turned out to the flank, behind the nacelle shoulders */
      dark.push(cyl(0.27, 0.22, 0.30, 16, "y", -2.35, s * 0.97, Z(2.55)));
      metal.push(cyl(0.31, 0.31, 0.06, 16, "y", -2.35, s * 0.82, Z(2.55)));
    }
    /* mast gearbox fairing and the two mast tubes */
    skin.push(cyl(0.46, 0.56, 0.60, 18, "z", 0, 0, Z(3.05)));
    metal.push(cyl(0.16, 0.16, 1.70, 12, "z", 0, 0, Z(3.95)));
    metal.push(cyl(0.26, 0.26, 0.08, 18, "z", 0, 0, Z(3.10)));
    for (k = 0; k < 3; k++) {
      a = k * PI * 2 / 3 + 0.4;
      metal.push(bar([Math.cos(a) * 0.27, Math.sin(a) * 0.27, Z(H_LO + 0.04)], [Math.cos(a) * 0.27, Math.sin(a) * 0.27, Z(H_UP + 0.02)], 0.022, 5));
    }

    /* glazing: windscreen (two panes round a post), cockpit side windows */
    var p1 = pane(tl, 5, 4, function (u, v) { return [[8, 0.04 + u * 0.46, Z(1.72 + v * 0.50)], [-1, 0, 0]]; }, 0.012);
    var p2 = pane(tl, 5, 4, function (u, v) { return [[8, -0.04 - u * 0.46, Z(1.72 + v * 0.50)], [-1, 0, 0]]; }, 0.012);
    if (p1) glass.push(p1); if (p2) glass.push(p2);
    for (s = -1; s <= 1; s += 2) {
      var q = pane(tl, 5, 3, function (u, v) { return [[3.35 + u * 1.15, s * 3, Z(1.76 + v * 0.50)], [0, -s, 0]]; }, 0.012);
      if (q) glass.push(q);
      q = pane(tl, 3, 3, function (u, v) { return [[2.15 + u * 0.80, s * 3, Z(1.80 + v * 0.46)], [0, -s, 0]]; }, 0.012);
      if (q) glass.push(q);
    }

    /* the 2A42 cannon low on the starboard side: fairing, barrel, muzzle ring */
    skin.push(box(1.90, 0.34, 0.42, 2.70, -0.62, Z(1.02)));
    dark.push(cyl(0.055, 0.055, 2.50, 10, "x", 4.15, -0.70, Z(1.05)));
    dark.push(cyl(0.085, 0.085, 0.24, 10, "x", 5.38, -0.70, Z(1.05)));

    /* stub wings (span 7.3 m): slab, wingtip pod, two pylons and a store on each */
    var WING = [[-0.15, 0.55], [-0.50, 3.55], [-1.35, 3.55], [-1.70, 0.55]];
    function slabHalf(sg) {
      var pts = WING.map(function (q) { return [q[0], sg * q[1]]; });
      var gm = M.slab(V, pts, 0.10);
      gm.translate(0, 0, Z(1.45) - 0.05);
      return gm;
    }
    skin.push(slabHalf(1)); skin.push(slabHalf(-1));
    for (s = -1; s <= 1; s += 2) {
      skin.push(cyl(0.14, 0.14, 1.20, 14, "x", -0.95, s * 3.64, Z(1.43)));
      skin.push(sph(0.14, 12, 8, -0.35, s * 3.64, Z(1.43), 1.4, 1, 1));
      skin.push(sph(0.14, 12, 8, -1.55, s * 3.64, Z(1.43), 1.6, 1, 1));
      /* inner pylon and a 20-round rocket pod */
      metal.push(box(0.55, 0.08, 0.30, -0.95, s * 1.55, Z(1.28)));
      metal.push(cyl(0.24, 0.24, 2.20, 18, "x", -0.95, s * 1.55, Z(1.00)));
      metal.push(sph(0.24, 14, 8, 0.15, s * 1.55, Z(1.00), 1.3, 1, 1));
      dark.push(cyl(0.20, 0.20, 0.04, 16, "x", -2.06, s * 1.55, Z(1.00)));
      /* outer pylon and a six-tube Vikhr pack, three tubes over three */
      metal.push(box(0.55, 0.08, 0.30, -0.95, s * 2.65, Z(1.28)));
      metal.push(box(2.00, 0.36, 0.06, -0.95, s * 2.65, Z(1.10)));
      for (k = 0; k < 6; k++) {
        var ty = s * (2.65 - 0.12 + 0.12 * (k % 3)), tz = (k < 3) ? 1.00 : 0.86;
        metal.push(cyl(0.065, 0.065, 2.40, 8, "x", -0.95, ty, Z(tz)));
        dark.push(cyl(0.050, 0.050, 0.03, 8, "x", 0.26, ty, Z(tz)));
      }
      /* team strip on the upper face of each wing */
      team.push(box(0.46, 0.95, 0.014, -0.95, s * 2.10, Z(1.50) + 0.002));
    }

    /* tail: tailplane with endplate plates, the raked fin with the star */
    skin.push(box(0.90, 3.50, 0.06, -5.10, 0, Z(1.12)));
    for (s = -1; s <= 1; s += 2) skin.push(box(0.80, 0.05, 1.00, -5.05, s * 1.75, Z(1.05)));
    skin.push(finSlab(FIN, 0, 0.10));
    for (s = -1; s <= 1; s += 2) {
      var yo = 0.05 + 0.006;
      var st1 = starGeo(-7.72, Z(2.12), 0.46, yo), st2 = starGeo(-7.72, Z(2.12), 0.38, yo + 0.004);
      light.push(s > 0 ? st1 : mirrorY(st1));
      red.push(s > 0 ? st2 : mirrorY(st2));
    }
    dark.push(sph(0.06, 8, 6, -8.50, 0, Z(2.98)));

    /* ---- undercarriage: tricycle, extended; twin nose wheels, two mains ---- */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    var legs = [], tyres = [];
    for (s = -1; s <= 1; s += 2) {
      tyres.push(cyl(0.36, 0.36, 0.20, 26, "y", -1.35, s * 1.28, Z(0.36)));
      legs.push(cyl(0.12, 0.12, 0.24, 10, "y", -1.35, s * 1.28, Z(0.36)));
      legs.push(bar([-1.35, s * 0.55, Z(1.20)], [-1.35, s * 1.24, Z(0.40)], 0.075, 8));
      legs.push(bar([-1.95, s * 0.45, Z(1.10)], [-1.37, s * 1.20, Z(0.56)], 0.04, 6));
      tyres.push(cyl(0.26, 0.26, 0.13, 22, "y", 3.70, s * 0.17, Z(0.26)));
    }
    legs.push(bar([3.55, 0, Z(1.00)], [3.70, 0, Z(0.30)], 0.06, 8));
    legs.push(cyl(0.05, 0.05, 0.50, 8, "y", 3.70, 0, Z(0.26)));
    legs.push(bar([3.0, 0, Z(0.95)], [3.66, 0, Z(0.60)], 0.035, 6));
    mesh(gear, legs, T.metal, "gear_legs");
    mesh(gear, tyres, T.rubber, "tyres");

    mesh(g, skin, T.skin, "airframe");
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, light, T.light, "star_edge");
    mesh(g, red, T.red, "star");
    mesh(g, team, T.team, "team");

    /* ---- the two heads, the same mount as pact_ka27_helix.js / ru_ka25.js ---- */
    function head(h, azs) {
      var mnt = new V.Group();
      mnt.position.set(0, 0, Z(h));
      mnt.rotation.x = PI / 2;
      g.add(mnt);
      var rotor = new V.Group();
      rotor.name = "rotor";
      mnt.add(rotor);
      var hd = new V.Group();
      hd.rotation.x = -PI / 2;
      rotor.add(hd);
      var hubM = [], blades = [], j;
      hubM.push(cyl(0.22, 0.27, 0.30, 24, "z", 0, 0, 0));
      hubM.push(cyl(0.32, 0.32, 0.05, 24, "z", 0, 0, -0.17));
      hubM.push(cyl(0.09, 0.16, 0.10, 12, "z", 0, 0, 0.20));
      var BP = [[0.75, -0.15], [6.60, -0.15], [ROTOR_R, -0.08], [ROTOR_R, 0.08], [6.60, 0.15], [0.75, 0.15]];
      for (j = 0; j < 3; j++) {
        a = azs[j] * D2R;
        var bl = M.slab(V, BP, 0.04);
        bl.translate(0, 0, -0.02);
        bl.rotateZ(a);
        blades.push(bl);
        var parts = [box(0.60, 0.20, 0.13, 0.52, 0, 0), box(0.28, 0.26, 0.15, 0.26, 0, -0.02),
                     cyl(0.035, 0.035, 0.45, 8, "x", 0.55, 0.18, 0.05)];
        for (i = 0; i < parts.length; i++) { parts[i].rotateZ(a); hubM.push(parts[i]); }
      }
      for (j = 0; j < 3; j++) {
        a = azs[j] * D2R;
        hubM.push(bar([0.30 * Math.cos(a), 0.30 * Math.sin(a), -0.35], [0.48 * Math.cos(a), 0.48 * Math.sin(a), -0.05], 0.022, 6));
      }
      mesh(hd, hubM, T.metal, "hub");
      mesh(hd, blades, T.blade, "blades");
      mesh(hd, [place(new V.CircleGeometry(ROTOR_R, 56), 0, 0, 0.03)], T.disc, "rotordisc");
    }
    head(H_LO, [40, 160, 280]);
    head(H_UP, [70, 190, 310]);
    return g;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e90_gunship"] = { len: 15.8, build: function (THREE, M, C) { return HeroKa50.build(THREE, M, C); } };
