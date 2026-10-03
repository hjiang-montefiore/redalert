/* ======= ru_ka25.js - HERO model: Kamov Ka-25PL Hormone-A =======
   The Soviet Navy's first shipborne anti-submarine helicopter, for
     pact_e60_aswhelo  "Ka-25PL Hormone-A"  (service 1968; no other row
                       uses this key as its own model)
   Before this file pact_e60_aswhelo had no hero of its own: eras.js row
   only; js/rotor_specs.js and js/asw_helo_fit.js carry no entry for it (the
   Ka-27 hero pact_ka27_helix.js says it "is left to the stand-in").

   Reference (Wikimedia Commons, fetched small):
     - "Kamov Ka-25PLO Hormone 77 yellow" (port side, a Ka-25PL in Soviet
       Navy colours on a stand): the compact whale fuselage, cowl on the cabin
       roof, sideways exhaust stubs just ahead of the rear cowl, tall mast with
       two three-blade heads, long boom with the tailplane and big outer fins
       carrying the red star, chin radome, the four-wheel gear with its
       raked struts. Station scaling taken from this photograph on 9.75 m.
     - "Ka-25 Kiev3" (front three-quarter, Soviet-period paint) for the
       front: twin round intakes on the cowl front, windscreen and chin radome.
     - "Kamov Ka-25PL Kiyv 2019 01" (nose close-up: chin radome, nose gear
       and windscreen) and "Kiyv 2019 04" (tail close-up: outer fins and the
       smaller inboard fins on the tailplane).
     - the Ka-25 line drawing "Schema Kamow Ka-25" (twin coaxial discs, the
       fuselage plan, intakes and exhausts).
   Published figures: fuselage length 9.75 m, rotor diameter 15.74 m, height
   5.37 m. The rest (cabin width, wheel track, mast height, fin size) is
   measured off the photographs and is approximate; I did not find a
   dimensioned three-view, so every such figure is a photo scale.
   Paint: the pale blue-grey of Soviet naval helicopters of the period, from
   the photographs; the red star with a white edge on each outer fin, as the
   Ka-25PL photographs show it. No bort number, no naval ensign.
   Team colour: two small strips only, one on top of each tailplane half (no strip on the cowl).
   Height set to the published 5.37 m (hub cap at 5.37 above the wheel contact).
   Inboard fins: four fins in all as photograph Kiyv 04 shows; no centre fin is drawn.
   Not modelled because the photographs I had do not show it clearly: the
   weapons bay doors and the sonar housing are only dark patches on the belly
   (dark-grey panels), and the flotation-bag containers are small cylinders
   beside the main struts - their exact siting is not confirmed.
   Rotors: two "rotor" heads on one mast, each with a "rotordisc", the same
   mount as pact_ka27_helix.js (the renderer turns the second head the other
   way). "gear" is the lowest opaque part. ASCII only.

   Model space +X nose, +Y port, +Z up, metres; z = 0 is 2.30 m above the
   wheel contact plane, the origin is the mast axis, 4.0 m behind the nose. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKa25 = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180;
  var V = null;
  var GROUND = -2.30;
  function Z(h) { return GROUND + h; }
  var ROTOR_R = 7.87, H_LO = 3.83, H_UP = 5.10;
  var FIN_Y = 1.45, FIN_T = 0.07;
  var FIN = [[-4.45, 1.30], [-5.15, 1.30], [-5.75, 1.42], [-5.78, 2.60], [-5.62, 2.86], [-4.95, 2.86], [-4.50, 2.30]];

  /* ---- geometry kit ---- */
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
  function mesh(parent, list, mat, name) {
    if (!list.length) return null;
    var m = new V.Mesh(merge(list), mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  /* a vertical slab from an outline in (x, height above ground), thickness
     along y, centred on y = yc; the outline is wound so the +y face is outward */
  function finSlab(poly, yc, th) {
    var pts = [], n = poly.length, i, cx = 0, ch = 0;
    for (i = 0; i < n; i++) { cx += poly[i][0] / n; ch += poly[i][1] / n; }
    var yp = yc + th / 2, ym = yc - th / 2;
    function P(i, y) { return [poly[i][0], y, Z(poly[i][1])]; }
    var C1 = [cx, yp, Z(ch)], C0 = [cx, ym, Z(ch)];
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      /* polygon order is nose-bottom -> aft-bottom -> up, i.e. counter-clockwise seen from +y */
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
    for (i = 0; i < 10; i++) pts.push(o, P[(i + 1) % 10], P[i]);   /* faces +y */
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
    m.skin  = new V.MeshStandardMaterial({ color: 0x7b97aa, roughness: 0.80, metalness: 0.08 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.35 });
    m.blade = new V.MeshStandardMaterial({ color: 0x3a3e40, roughness: 0.80, metalness: 0.10 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshPhysicalMaterial({ color: 0x20343a, roughness: 0.08, metalness: 0.20, clearcoat: 1.0,
                                           clearcoatRoughness: 0.05, polygonOffset: true,
                                           polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    m.light = new V.MeshStandardMaterial({ color: 0xd2d6d2, roughness: 0.60, metalness: 0.05 });
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
    g.name = "ka25";
    var i, k, s, a;
    var skin = [], glass = [], dark = [], metal = [], team = [], light = [], red = [];

    /* fuselage: x, belly, top, widest, wb, wm, wt, e (heights above ground) */
    var FUS = [
      sec( 3.62, 1.30, 1.80, 1.52, 0.08, 0.14, 0.08, 0.80),
      sec( 3.50, 1.12, 2.22, 1.62, 0.26, 0.42, 0.24, 0.66),
      sec( 3.25, 1.00, 2.80, 1.70, 0.44, 0.66, 0.40, 0.55),
      sec( 2.90, 0.96, 3.04, 1.78, 0.60, 0.80, 0.56, 0.48),
      sec( 2.20, 0.95, 3.08, 1.80, 0.72, 0.84, 0.68, 0.45),
      sec( 0.60, 0.95, 3.10, 1.82, 0.74, 0.86, 0.70, 0.45),
      sec(-1.40, 0.95, 3.08, 1.82, 0.72, 0.84, 0.68, 0.46),
      sec(-2.40, 1.00, 2.98, 1.80, 0.60, 0.74, 0.55, 0.52),
      sec(-3.10, 1.30, 2.70, 1.95, 0.36, 0.42, 0.33, 0.66),
      sec(-3.90, 1.52, 2.52, 2.02, 0.22, 0.27, 0.21, 0.76),
      sec(-4.60, 1.68, 2.32, 2.00, 0.15, 0.18, 0.14, 0.82),
      sec(-5.10, 1.74, 2.22, 1.98, 0.11, 0.13, 0.10, 0.85)
    ];
    var fusLoft = loft(FUS, 32, 0.08, 0.10);
    skin = skin.concat(fusLoft);
    var tl = triList(fusLoft[0]);

    /* engine cowl on the cabin roof: two engines side by side */
    var COWL = [
      sec( 1.95, 2.95, 3.28, 3.12, 0.20, 0.50, 0.38, 0.55),
      sec( 1.75, 2.90, 3.44, 3.20, 0.32, 0.58, 0.46, 0.50),
      sec( 1.20, 2.90, 3.50, 3.22, 0.36, 0.60, 0.48, 0.48),
      sec(-1.00, 2.90, 3.50, 3.22, 0.36, 0.60, 0.48, 0.48),
      sec(-2.00, 2.90, 3.38, 3.14, 0.34, 0.56, 0.42, 0.52),
      sec(-2.55, 2.88, 3.05, 2.96, 0.20, 0.34, 0.24, 0.60)
    ];
    skin = skin.concat(loft(COWL, 24, 0.05, 0.05));
    /* round intakes on the front of the cowl, one over each engine */
    for (s = -1; s <= 1; s += 2) {
      dark.push(cyl(0.20, 0.20, 0.06, 16, "x", 1.96, s * 0.28, Z(3.22)));
      metal.push(cyl(0.23, 0.23, 0.05, 16, "x", 1.90, s * 0.28, Z(3.22)));
    }
    /* sideways exhaust stubs just ahead of the rear cowl, soot behind them */
    for (s = -1; s <= 1; s += 2) {
      dark.push(cyl(0.17, 0.15, 0.40, 14, "y", -0.35, s * 0.74, Z(3.22)));
      dark.push(box(0.60, 0.02, 0.36, -0.95, s * 0.62, Z(3.20)));
    }
    /* gearbox fairing and the mast */
    skin.push(cyl(0.42, 0.52, 0.50, 18, "z", 0, 0, Z(3.68)));
    metal.push(cyl(0.13, 0.13, 1.30, 12, "z", 0, 0, Z(4.55)));
    metal.push(cyl(0.30, 0.30, 0.05, 18, "z", 0, 0, Z(4.40)));
    metal.push(cyl(0.34, 0.34, 0.06, 18, "z", 0, 0, Z(4.08)));
    for (k = 0; k < 3; k++) {
      a = k * PI * 2 / 3 + 0.4;
      metal.push(bar([Math.cos(a) * 0.30, Math.sin(a) * 0.30, Z(4.02)], [Math.cos(a) * 0.30, Math.sin(a) * 0.30, Z(5.12)], 0.022, 5));
    }

    /* chin search radome, lower on the nose */
    light.push(sph(1, 28, 18, 3.38, 0, Z(1.02), 0.66, 0.46, 0.30));

    /* glazing: windscreen (two panes round a post), cockpit side windows,
       cabin door window and three small cabin windows */
    var p1 = pane(tl, 5, 4, function (u, v) { return [[6, 0.04 + u * 0.50, Z(2.25 + v * 0.66)], [-1, 0, 0]]; }, 0.012);
    var p2 = pane(tl, 5, 4, function (u, v) { return [[6, -0.04 - u * 0.50, Z(2.25 + v * 0.66)], [-1, 0, 0]]; }, 0.012);
    if (p1) glass.push(p1); if (p2) glass.push(p2);
    for (s = -1; s <= 1; s += 2) {
      var q = pane(tl, 5, 3, function (u, v) { return [[2.55 + u * 0.55, s * 3, Z(2.25 + v * 0.60)], [0, -s, 0]]; }, 0.012);
      if (q) glass.push(q);
      q = pane(tl, 4, 3, function (u, v) { return [[0.15 + u * 0.55, s * 3, Z(2.25 + v * 0.60)], [0, -s, 0]]; }, 0.012);
      if (q) glass.push(q);
      [-1.0, -1.45, -1.90].forEach(function (wx) {
        var w = pane(tl, 2, 2, function (u, v) { return [[wx + u * 0.26, s * 3, Z(2.35 + v * 0.34)], [0, -s, 0]]; }, 0.010);
        if (w) glass.push(w);
      });
      /* door edge lines: thin dark strips on the cabin flank */
      dark.push(box(0.04, 0.03, 1.20, -0.30, s * 0.855, Z(1.92)));
      dark.push(box(0.04, 0.03, 1.20, 1.15, s * 0.855, Z(1.92)));
      dark.push(box(1.45, 0.03, 0.04, 0.42, s * 0.855, Z(1.32)));
    }

    /* belly: weapons bay doors and the sonar housing, as dark panels */
    dark.push(box(0.95, 0.95, 0.045, -0.20, 0, Z(0.93)));
    dark.push(box(0.80, 0.95, 0.045, -1.25, 0, Z(0.93)));
    dark.push(cyl(0.28, 0.28, 0.12, 16, "z", -2.15, 0, Z(0.96)));

    /* tail: tailplane, two big outer fins, two small inboard fins */
    skin.push(box(0.70, 3.00, 0.07, -5.00, 0, Z(1.98)));
    var finMesh = finSlab(FIN, FIN_Y, FIN_T);
    both(skin, finMesh);
    var SMALL = [[-4.30, 1.75], [-5.05, 1.75], [-5.20, 2.20], [-5.10, 2.90], [-4.55, 2.90], [-4.35, 2.40]];
    both(skin, finSlab(SMALL, 0.55, 0.05));
    /* red stars on the outer faces, white edge under them */
    for (s = -1; s <= 1; s += 2) {
      var yo = FIN_Y + FIN_T / 2 + 0.006;
      var st1 = starGeo(-5.12, Z(2.08), 0.40, yo), st2 = starGeo(-5.12, Z(2.08), 0.31, yo + 0.004);
      light.push(s > 0 ? st1 : mirrorY(st1));
      red.push(s > 0 ? st2 : mirrorY(st2));
      /* team flash: a thin strip on top of each tailplane half, and one across the cowl */
      var tb = box(0.46, 0.80, 0.014, -5.00, s * 0.80, Z(2.02) + 0.001);
      team.push(tb);
    }
    skin.push(sph(0.07, 8, 6, -5.20, 0, Z(1.95)));
    dark.push(sph(0.05, 6, 4, -5.28, 0, Z(1.95)));

    /* ---- undercarriage: four wheels, fixed, raked struts, flotation bags ---- */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    var legs = [], tyres = [], bags = [];
    for (s = -1; s <= 1; s += 2) {
      tyres.push(cyl(0.32, 0.32, 0.17, 28, "y", -1.65, s * 1.55, Z(0.32)));
      legs.push(cyl(0.17, 0.17, 0.20, 12, "y", -1.65, s * 1.55, Z(0.32)));
      legs.push(bar([-0.97, s * 0.80, Z(2.05)], [-1.65, s * 1.50, Z(0.34)], 0.055, 7));
      legs.push(bar([-1.80, s * 0.55, Z(1.00)], [-1.65, s * 1.40, Z(0.60)], 0.035, 6));
      bags.push(cyl(0.11, 0.11, 0.60, 10, "x", -1.30, s * 0.98, Z(1.50)));
      tyres.push(cyl(0.21, 0.21, 0.14, 24, "y", 2.30, s * 0.66, Z(0.21)));
      legs.push(cyl(0.12, 0.12, 0.17, 10, "y", 2.30, s * 0.66, Z(0.21)));
      legs.push(bar([2.00, s * 0.45, Z(1.15)], [2.30, s * 0.64, Z(0.24)], 0.045, 6));
      legs.push(bar([1.60, s * 0.40, Z(1.05)], [2.30, s * 0.64, Z(0.50)], 0.028, 5));
    }
    mesh(gear, legs, T.metal, "gear_legs");
    mesh(gear, tyres, T.rubber, "tyres");
    dark = dark.concat(bags);

    mesh(g, skin, T.skin, "airframe");
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, light, T.light, "radome_star_edge");
    mesh(g, red, T.red, "star");
    mesh(g, team, T.team, "team");

    /* ---- the two heads, the same mount as pact_ka27_helix.js ---- */
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
      hubM.push(cyl(0.25, 0.30, 0.34, 28, "z", 0, 0, 0));
      hubM.push(cyl(0.36, 0.36, 0.05, 28, "z", 0, 0, -0.19));
      hubM.push(cyl(0.10, 0.18, 0.10, 14, "z", 0, 0, 0.22));
      var BP = [[0.85, -0.23], [7.70, -0.23], [ROTOR_R, -0.10], [ROTOR_R, 0.10], [7.70, 0.23], [0.85, 0.23]];
      for (j = 0; j < 3; j++) {
        a = azs[j] * D2R;
        var bl = M.slab(V, BP, 0.04);
        bl.translate(0, 0, -0.02);
        bl.rotateZ(a);
        blades.push(bl);
        var parts = [box(0.70, 0.22, 0.15, 0.58, 0, 0), box(0.32, 0.30, 0.17, 0.28, 0, -0.02),
                     cyl(0.04, 0.04, 0.50, 8, "x", 0.60, 0.20, 0.05)];
        for (i = 0; i < parts.length; i++) { parts[i].rotateZ(a); hubM.push(parts[i]); }
      }
      hubM.push(cyl(0.34, 0.34, 0.07, 28, "z", 0, 0, -0.40));
      hubM.push(cyl(0.40, 0.40, 0.03, 28, "z", 0, 0, -0.45));
      for (j = 0; j < 3; j++) {
        a = azs[j] * D2R;
        hubM.push(bar([0.34 * Math.cos(a), 0.34 * Math.sin(a), -0.40], [0.52 * Math.cos(a), 0.52 * Math.sin(a), -0.05], 0.025, 8));
        hubM.push(bar([0.26 * Math.cos(a + 1.0), 0.26 * Math.sin(a + 1.0), -0.40], [0.26 * Math.cos(a + 1.0), 0.26 * Math.sin(a + 1.0), -0.22], 0.02, 6));
      }
      mesh(hd, hubM, T.metal, "hub");
      mesh(hd, blades, T.blade, "blades");
      mesh(hd, [place(new V.CircleGeometry(ROTOR_R, 56), 0, 0, 0.03)], T.disc, "rotordisc");
    }
    head(H_LO, [40, 160, 280]);
    head(H_UP, [100, 220, 340]);
    return g;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e60_aswhelo"] = { len: 15.74, build: function (THREE, M, C) { return HeroKa25.build(THREE, M, C); } };
