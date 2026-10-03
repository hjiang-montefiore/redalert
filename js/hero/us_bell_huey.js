/* ======= us_bell_huey.js - HERO models: the Bell AH-1G HueyCobra and the UH-1D Iroquois =======
   Two defs, two airframes, one file; they share the Bell two-blade
   semi-rigid rotor head (with its stabiliser bar), the skid gear kit and
   the tail rotor mount.

     nato_e60_gunship    Bell AH-1G HueyCobra (1967): the 0.96 m wide tandem
                         fuselage, the chin M28 turret, the stub wings with an
                         M200 19-tube rocket pod inboard and a 7-tube pod
                         outboard on each side, the two-blade rotor.
     nato_e60_transport  Bell UH-1D Iroquois (1963): the long cabin Huey,
                         the glazed nose, the sliding cabin doors, the
                         two-blade 48 ft rotor, skids.

   REFERENCES, and what each gave
     Wikimedia Commons "Bell UH-1H Iroquois 3-view line drawing" (the
       Army operator's manual figure with its dimensions): fuselage 41 ft
       5.0 in (12.62 m), length rotors turning 57 ft 0.67 in, main rotor 48 ft
       3.2 in (14.71 m), blade chord 1 ft 9.0 in, tail rotor 8 ft 6.0 in
       (2.59 m), tail rotor top 14 ft 8.2 in, tail rotor hub 10 ft 2.5 in
       up, rotor head 13 ft 7.4 in, skid track 8 ft 6.6 in, belly 1 ft 3.5 in
       off the ground, mast 11 ft 8.65 in behind the nose, tailplane 9 ft 4.3
       in span and 2 ft 6.5 in chord. Station positions of the cabin, doors,
       windows, the skid struts and the tail were traced off its side view.
       (The drawing is the UH-1H, the same airframe; its roof pitot is
       not drawn here, and the UH-1D's own nose pitot was not confirmed in
       a picture, so none is drawn.)
     Wikimedia Commons "Bell AH-1G Cobra orthographical image": the Cobra
       drawing; scaled to the 44 ft rotor (13.41 m), giving the nose 4.30 m
       ahead of the mast, the canopy, the cowling, the boom and fin lines, the
       skids, the stub wings, the pod stations and the chin turret.
       Wikipedia "Bell AH-1 Cobra" AH-1G specification: fuselage 44 ft 5 in
       (13.54 m), rotor 13.4 m, height 13 ft 6 in, stub wings 10 ft 4 in span;
       armament M28 turret (minigun and/or M129), 7-round M158 and 19-round
       M200 rocket launchers.
     Wikimedia Commons "AH-1G Cobra Vietnam" (photograph): olive drab, the
       pods under the stub wings, the skid shape, the chin turret.
     Wikimedia Commons "UH-1D helicopters in Vietnam 1966" (photograph): olive
       drab, the large glazed nose, the sliding door, the skids, the
       stabiliser bar.

   TAIL ROTOR SIDE: PORT (left) on both. The UH-1H manual drawing draws the
   whole tail rotor disc on the near side of its nose-left (port) side view,
   and the AH-1G photograph (port side, nose left) shows the hub on the fin's
   near face; Wikipedia says Cobra tail rotors moved "from the left to the
   right" in later models, so the early AH-1G is on the left. (The first cut
   put both on the starboard side.)
   ROCKET PODS: checked against the AH-1G photograph (port wing, nose left):
   a fatter pod low and inboard and a slimmer one higher and outboard, both
   under the stub wing, M200 (19 tubes) inboard and M158 (7 tubes) outboard.
   UH-1D smoothing: the fuselage is resampled through a cardinal blend of the
   stations traced off the drawing (more triangles, same stations).
   NOT CONFIRMED: the AH-1G blade chord (0.69 m) and the stabiliser bar and
   paddle sizes (scaled off the UH-1 drawing); the AH-1G tail rotor diameter
   (taken as the UH-1's 2.59 m); the UH-1D drive-shaft cover and pitch-link
   sizes. Not drawn: the M134 minigun pods (the drawing carries none),
   markings, door guns.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres, x from the mast.
   The skids stand on z = -GROUND_OFFSET; they are fixed and stay down in
   flight, so they are NOT named "gear" (render3d hides "gear" above 18 m).
   WHAT SETS THE SCALE: the faint rotor disc ahead of the mast and the tail
   rotor blade built straight aft; the two main blades sit at 45 degrees.    */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBellHuey = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180;
  var V = null;

  /* ------------------------------------------------------------ kit -- */
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
    var g = new V.SphereGeometry(r, ws, hs); g.scale(sx || 1, sy || 1, sz || 1); return place(g, x, y, z);
  }
  function bar(p, q, r, seg, capped) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 8, 1, !capped);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function disc(r, seg, c, n) {
    var g = new V.CircleGeometry(r, seg);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 0, 1), new V.Vector3(n[0], n[1], n[2]).normalize()));
    g.translate(c[0], c[1], c[2]);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
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
  /* an indexed geometry from vertices and triangles, wound to face away
     from `ctr(i)` (the point inside the part nearest vertex i) */
  function orientedGeo(verts, idx, outward) {
    var a = idx[0], b = idx[1], c = idx[2];
    var ux = verts[b][0] - verts[a][0], uy = verts[b][1] - verts[a][1], uz = verts[b][2] - verts[a][2];
    var vx = verts[c][0] - verts[a][0], vy = verts[c][1] - verts[a][1], vz = verts[c][2] - verts[a][2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var o = outward(a);
    if (nx * o[0] + ny * o[1] + nz * o[2] < 0) {
      for (var i = 0; i < idx.length; i += 3) { var t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    }
    var pos = [];
    for (var j = 0; j < verts.length; j++) pos.push(verts[j][0], verts[j][1], verts[j][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* A superelliptic fuselage lofted through sections [x, halfwidth, zbottom,
     ztop], nose to tail. a0..a1 (degrees, 90 = top centre, 0 = port) keeps
     only an arc of each ring (a window strip or a flash); scale grows it
     off the skin. Closed rings are capped. */
  var PW = 2.3;
  function sgn(u, e) { return (u < 0 ? -1 : 1) * Math.pow(Math.abs(u), e); }
  function interp(secs, x) {
    var i;
    for (i = 0; i < secs.length - 1; i++) {
      if (x <= secs[i][0] && x >= secs[i + 1][0]) {
        var f = (secs[i][0] - x) / (secs[i][0] - secs[i + 1][0] || 1), r = [x], k;
        for (k = 1; k < 4; k++) r.push(secs[i][k] + (secs[i + 1][k] - secs[i][k]) * f);
        return r;
      }
    }
    return null;
  }
  /* a cardinal (Catmull-Rom) blend of the stations, held between the two
     neighbours so it never overshoots: the UH-1D's rounded cabin and nose
     are resampled through it, finer than the stations traced from the drawing */
  var SMOOTH = false;
  function interpS(secs, x) {
    var i, k;
    for (i = 0; i < secs.length - 1; i++) {
      if (x <= secs[i][0] && x >= secs[i + 1][0]) {
        var h = secs[i][0] - secs[i + 1][0], f = h ? (secs[i][0] - x) / h : 0, r = [x];
        var f2 = f * f, f3 = f2 * f, h00 = 2 * f3 - 3 * f2 + 1, h10 = f3 - 2 * f2 + f, h01 = -2 * f3 + 3 * f2, h11 = f3 - f2;
        for (k = 1; k < 4; k++) {
          var a = secs[i][k], b = secs[i + 1][k];
          var pa = i > 0 ? (b - secs[i - 1][k]) / (secs[i - 1][0] - secs[i + 1][0]) : (b - a) / h;
          var pb = i + 2 < secs.length ? (secs[i + 2][k] - a) / (secs[i][0] - secs[i + 2][0]) : (b - a) / h;
          var v = h00 * a + h10 * h * pa + h01 * b + h11 * h * pb;
          r.push(Math.max(Math.min(a, b), Math.min(Math.max(a, b), v)));
        }
        return r;
      }
    }
    return null;
  }
  function loft(secs, nseg, a0, a1, scale, xa, xb) {
    var full = (a0 === undefined), s = scale || 1, i, j, verts = [], idx = [], ring;
    var list = [];
    if (xa !== undefined) {                    /* resample between xa and xb */
      var xs = [], n = Math.max(2, Math.round((xa - xb) / (SMOOTH ? 0.4 : 0.2)));
      for (i = 0; i <= n; i++) xs.push(xa + (xb - xa) * i / n);
      for (i = 0; i < secs.length; i++) if (secs[i][0] < xa && secs[i][0] > xb) xs.push(secs[i][0]);
      xs.sort(function (p, q) { return q - p; });
      for (i = 0; i < xs.length; i++) { var q2 = (SMOOTH ? interpS : interp)(secs, xs[i]); if (q2) list.push(q2); }
    } else list = secs;
    var lo = full ? 0 : a0 * D2R, hi = full ? 2 * PI : a1 * D2R;
    var cen = [];
    for (i = 0; i < list.length; i++) {
      var sc = list[i], zm = (sc[2] + sc[3]) / 2, hh = (sc[3] - sc[2]) / 2 * s, w = sc[1] * s;
      cen.push([sc[0], 0, zm]);
      var cnt = full ? nseg : nseg + 1;
      for (j = 0; j < cnt; j++) {
        var t = lo + (hi - lo) * j / nseg;
        verts.push([sc[0], w * sgn(Math.cos(t), 2 / PW), zm + hh * sgn(Math.sin(t), 2 / PW)]);
      }
    }
    var per = full ? nseg : nseg + 1, jn = full ? nseg : nseg;
    for (i = 0; i < list.length - 1; i++) for (j = 0; j < jn; j++) {
      var j2 = full ? (j + 1) % nseg : j + 1;
      var A = i * per + j, B = (i + 1) * per + j, C = (i + 1) * per + j2, D = i * per + j2;
      idx.push(A, B, C, A, C, D);
    }
    var g = orientedGeo(verts, idx, function (v) {
      var c = cen[Math.floor(v / per)]; return [verts[v][0] - c[0], verts[v][1] - c[1], verts[v][2] - c[2]];
    });
    var out = [g];
    if (full) for (var e = 0; e < 2; e++) {      /* caps, own vertices */
      var si = e ? list.length - 1 : 0, cv = [[list[si][0], 0, (list[si][2] + list[si][3]) / 2]], ci = [];
      for (j = 0; j < nseg; j++) cv.push(verts[si * per + j]);
      for (j = 0; j < nseg; j++) ci.push(0, 1 + j, 1 + (j + 1) % nseg);
      out.push(orientedGeo(cv, ci, function () { return [e ? 1 : -1, 0, 0]; }));
    }
    return out;
  }
  /* a prism: polygon pts [u, v] mapped to model space by mp(u, v, w),
     thickness from w0 to w1; star-shaped about its centroid */
  function prism(pts, w0, w1, mp) {
    var n = pts.length, cu = 0, cv = 0, i;
    for (i = 0; i < n; i++) { cu += pts[i][0]; cv += pts[i][1]; }
    cu /= n; cv /= n;
    var verts = [], idx = [];
    for (i = 0; i < n; i++) verts.push(mp(pts[i][0], pts[i][1], w0));
    for (i = 0; i < n; i++) verts.push(mp(pts[i][0], pts[i][1], w1));
    var c0 = mp(cu, cv, (w0 + w1) / 2);
    for (i = 0; i < n; i++) {
      var k = (i + 1) % n;
      idx.push(i, k, n + k, i, n + k, n + i);
    }
    var side = orientedGeo(verts, idx, function (v) {
      var p = verts[v % n]; return [p[0] - c0[0], p[1] - c0[1], p[2] - c0[2]];
    });
    var caps = [];
    for (var e = 0; e < 2; e++) {
      var cvv = [mp(cu, cv, e ? w1 : w0)], ci = [];
      for (i = 0; i < n; i++) cvv.push(verts[(e ? n : 0) + i]);
      for (i = 0; i < n; i++) ci.push(0, 1 + i, 1 + (i + 1) % n);
      var base = mp(cu, cv, e ? w1 : w0), mid = c0;
      caps.push(orientedGeo(cvv, ci, function () { return [base[0] - mid[0], base[1] - mid[1], base[2] - mid[2]]; }));
    }
    return [side].concat(caps);
  }
  function inXZ(u, v, w) { return [u, w, v]; }         /* (x, z) polygon, thickness along y */
  function inXY(u, v, w) { return [u, v, w]; }         /* (x, y) polygon, thickness along z */

  /* ======================================================= materials == */
  function makeMats(C, olive) {
    var m = {}, tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    m.skin  = new V.MeshStandardMaterial({ color: olive, roughness: 0.88, metalness: 0.06 });
    m.metal = new V.MeshStandardMaterial({ color: 0x575d60, roughness: 0.48, metalness: 0.60 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x1b1d1d, roughness: 0.66, metalness: 0.30 });
    m.blade = new V.MeshStandardMaterial({ color: 0x25272a, roughness: 0.80, metalness: 0.06 });
    m.store = new V.MeshStandardMaterial({ color: 0x4a5037, roughness: 0.80, metalness: 0.10 });
    m.glass = new V.MeshPhysicalMaterial({ color: 0x1b2a31, roughness: 0.08, metalness: 0.20, clearcoat: 1.0, clearcoatRoughness: 0.05 });
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc  = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                           transparent: true, opacity: 0.05, depthWrite: false, side: V.DoubleSide });
    return m;
  }

  /* ===================== the Bell rotor head and the tail rotor ========= */
  function rotors(g, T, o) {
    var i, k;
    /* the mount: +PI/2 about X points the rotor node's local +Y up the mast
       (asw_helo_fit / Bo 105 pattern), so it turns anti-clockwise from above;
       head undoes the turn so it is authored in model axes */
    var mnt = new V.Group();
    mnt.position.set(0, 0, o.hubZ);
    mnt.rotation.x = PI / 2;
    g.add(mnt);
    var rotor = new V.Group(); rotor.name = "rotor"; mnt.add(rotor);
    var head = new V.Group(); head.rotation.x = -PI / 2; rotor.add(head);
    var hubM = [], hubD = [], blades = [];
    hubM.push(cyl(0.16, 0.20, 0.20, 14, "z", 0, 0, 0));
    hubM.push(cyl(0.11, 0.11, 0.10, 10, "z", 0, 0, 0.14));
    hubM.push(cyl(0.22, 0.22, 0.04, 14, "z", 0, 0, -0.14));
    var LE = o.chord * 0.25, TE = LE - o.chord, R = o.R;
    for (k = 0; k < 2; k++) {
      var a = (45 + 180 * k) * D2R;
      var bo = [[0.50, LE - 0.05], [1.0, LE], [R, LE], [R, TE], [1.0, TE], [0.50, TE + 0.05]];
      var bl = prism(bo, -0.018, 0.018, inXY);
      var parts = [[cyl(0.07, 0.08, 0.50, 10, "x", 0.38, 0, 0), hubM, 0], [box(0.22, 0.26, 0.08, 0.70, 0, 0), hubM, 0]];
      for (i = 0; i < bl.length; i++) { bl[i].rotateY(-2 * D2R); bl[i].rotateZ(a); blades.push(bl[i]); }
      for (i = 0; i < parts.length; i++) { parts[i][0].rotateZ(a); parts[i][1].push(parts[i][0]); }
      /* pitch horn and link */
      var ph = box(0.18, 0.05, 0.05, 0.42, LE + 0.12, -0.05); ph.rotateZ(a); hubD.push(ph);
      /* the stabiliser bar paddles, at 90 degrees to the blades */
      var b2 = a + PI / 2;
      var pad = prism([[o.bar / 2 - 0.55, -0.11], [o.bar / 2, -0.11], [o.bar / 2, 0.11], [o.bar / 2 - 0.55, 0.11]], -0.015, 0.015, inXY);
      for (i = 0; i < pad.length; i++) { pad[i].translate(0, 0, o.barZ); pad[i].rotateZ(b2); blades.push(pad[i]); }
    }
    hubD.push(cyl(0.03, 0.03, o.bar - 1.0, 8, "x", 0, 0, o.barZ));
    hubD[hubD.length - 1].rotateZ(45 * D2R + PI / 2);
    hubD.push(box(0.30, 0.09, 0.07, 0, 0, o.barZ - 0.04));
    mesh(head, hubM, T.metal, "hub");
    mesh(head, blades.concat(hubD), T.blade, "blades");
    mesh(head, [place(new V.CircleGeometry(R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    /* tail rotor: PORT (left) side of the fin - the UH-1H drawing draws the
       whole disc on the near (port) side of its side view, and the AH-1G
       photograph (port side, nose left) shows the rotor hub on the fin's
       near face; -PI/2 about X so local +Z is the model's port side (+Y),
       the hub axis; blades built fore and aft (the aft one sets the extent) */
    var tm = new V.Group();
    tm.position.set(o.trX, o.trY, o.trZ);
    tm.rotation.x = -PI / 2;
    g.add(tm);
    var trot = new V.Group(); trot.name = "tailrotor"; tm.add(trot);
    var trM = [cyl(0.07, 0.08, 0.14, 12, "z", 0, 0, 0.01), cyl(0.04, 0.025, 0.07, 8, "z", 0, 0, 0.10),
               box(0.34, 0.07, 0.05, 0, 0, 0.02)];
    var trB = [];
    for (k = 0; k < 2; k++) {
      var tb = box(o.trR - 0.16, o.trC, 0.025, 0.16 + (o.trR - 0.16) / 2, 0, 0.02);
      tb.rotateX(8 * D2R);
      tb.rotateZ(k * PI);
      trB.push(tb);
    }
    /* the pitch-change spider and links, outboard of the hub */
    for (k = 0; k < 4; k++) {
      var la = k * PI / 2 + PI / 4;
      trM.push(bar([Math.cos(la) * 0.05, Math.sin(la) * 0.05, 0.13], [Math.cos(la) * 0.15, Math.sin(la) * 0.15, 0.02], 0.012, 6, true));
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, [place(new V.CircleGeometry(o.trR, 32), 0, 0, 0.02)], T.disc, "rotordisc");
    mesh(trot, trB, T.blade, "tailrotor_blades");
  }

  /* skids: two bowed cross tubes and two skid tubes with up-turned toes */
  function skids(out, o) {
    var k, sk = o.skid, r = o.skidR, list = [];
    function cross(x, sgnY) {
      var y = sgnY * sk;
      var pts = [[x, sgnY * 0.50, o.belly + 0.03], [x, sgnY * o.cy1, o.belly - 0.12], [x, sgnY * (sk - 0.10), 0.24], [x, y, r * 2 + 0.03]];
      for (var i = 0; i < pts.length - 1; i++) {
        list.push(bar(pts[i], pts[i + 1], r * 0.9, 8, true));
        list.push(sph(r * 0.9, 8, 4, pts[i + 1][0], pts[i + 1][1], pts[i + 1][2]));
      }
    }
    for (k = 0; k < o.xt.length; k++) { cross(o.xt[k], 1); cross(o.xt[k], -1); }
    for (var s = -1; s <= 1; s += 2) {
      var pts2 = [[o.sx1, s * sk, r + 0.25], [o.sx1 - 0.18, s * sk, r + 0.05], [o.sx1 - 0.35, s * sk, r], [o.sx0, s * sk, r]];
      for (k = 0; k < pts2.length - 1; k++) list.push(bar(pts2[k], pts2[k + 1], r, 10, true));
      list.push(sph(r, 10, 6, o.sx0, s * sk, r));
      /* the saddle clamps on the skid tubes */
      for (k = 0; k < o.xt.length; k++) list.push(box(0.18, 0.10, 0.09, o.xt[k], s * sk, r + 0.07));
    }
    for (k = 0; k < list.length; k++) { list[k].translate(0, 0, o.gr); out.push(list[k]); }
  }

  /* a rocket pod: round tube with a nose cap, a tail cap, dark tube mouths */
  function pod(store, dark, x, y, z, len, rad, tubes) {
    store.push(cyl(rad, rad, len, 16, "x", x, y, z, true));
    store.push(cyl(rad * 0.5, rad, len * 0.10, 16, "x", x + len / 2 + len * 0.05, y, z));
    store.push(cyl(rad, rad * 0.55, len * 0.10, 16, "x", x - len / 2 - len * 0.05, y, z));
    var tr = tubes === 19 ? rad * 0.17 : rad * 0.28, pos = [], i;
    if (tubes === 19) {
      pos.push([0, 0]);
      for (i = 0; i < 6; i++) pos.push([Math.cos(i * PI / 3) * rad * 0.40, Math.sin(i * PI / 3) * rad * 0.40]);
      for (i = 0; i < 12; i++) pos.push([Math.cos(i * PI / 6 + 0.13) * rad * 0.78, Math.sin(i * PI / 6 + 0.13) * rad * 0.78]);
    } else {
      pos.push([0, 0]);
      for (i = 0; i < 6; i++) pos.push([Math.cos(i * PI / 3) * rad * 0.58, Math.sin(i * PI / 3) * rad * 0.58]);
    }
    for (i = 0; i < pos.length; i++)
      dark.push(disc(tr, 8, [x + len / 2 + len * 0.10 + 0.004, y + pos[i][0], z + pos[i][1]], [1, 0, 0]));
    dark.push(disc(rad * 0.8, 12, [x - len / 2 - len * 0.10 - 0.004, y, z], [-1, 0, 0]));
  }

  /* ====================================================== the AH-1G ===== */
  var COB = [   /* x, half width, z bottom, z top  (heights above the ground) */
    [4.30, 0.04, 1.12, 1.30], [4.10, 0.26, 0.85, 1.42], [3.66, 0.40, 0.62, 1.50], [3.10, 0.47, 0.58, 1.90],
    [2.60, 0.49, 0.58, 2.38], [1.90, 0.49, 0.58, 2.42], [0.90, 0.50, 0.58, 2.44], [0.85, 0.58, 0.58, 2.50],
    [0.30, 0.62, 0.58, 2.56], [-0.90, 0.62, 0.60, 2.54], [-1.50, 0.50, 0.64, 2.30], [-2.20, 0.40, 0.70, 1.90],
    [-2.60, 0.34, 0.72, 1.66], [-4.00, 0.26, 0.82, 1.64], [-6.00, 0.17, 1.00, 1.62], [-7.60, 0.11, 1.19, 1.60]
  ];
  function buildCobra(THREE, M, C) {
    V = THREE;
    var GR = -1.9, Z = function (h) { return GR + h; };
    function zs(secs) { return secs.map(function (s) { return [s[0], s[1], Z(s[2]), Z(s[3])]; }); }
    var S = zs(COB), T = makeMats(C, 0x40492f);
    SMOOTH = false;
    var g = new V.Group(); g.name = "ah1g";
    var skin = [], glass = [], dark = [], metal = [], store = [], team = [], i, s;
    skin = skin.concat(loft(S, 32));
    /* the transmission and engine fairing: a rounded block around the mast */
    skin.push(sph(0.5, 16, 10, -0.2, 0, Z(2.50), 1.55, 1.15, 0.34));
    /* glass: the front and rear cockpit under the canopy bows, a frame between */
    glass = glass.concat(loft(S, 14, 18, 162, 1.012, 3.72, 2.06));
    glass = glass.concat(loft(S, 14, 18, 162, 1.012, 1.98, 0.95));
    /* the team flashes on the engine deck and the boom top */
    team = team.concat(loft(S, 6, 55, 125, 1.018, 0.20, -1.10));
    team = team.concat(loft(S, 6, 55, 125, 1.03, -3.20, -5.00));
    /* the fin, the tailplane, the ventral fin, the gearbox */
    var fin = [[-6.6, Z(1.60)], [-8.0, Z(2.95)], [-8.5, Z(3.05)], [-8.9, Z(2.95)], [-8.75, Z(2.30)], [-7.75, Z(1.20)], [-7.4, Z(1.19)]];
    skin = skin.concat(prism(fin, -0.045, 0.045, inXZ));
    skin = skin.concat(prism([[-7.6, Z(1.19)], [-8.35, Z(0.92)], [-8.1, Z(1.30)]], -0.03, 0.03, inXZ));
    var tp = [[-5.05, 0.18], [-5.80, 0.18], [-5.95, 1.00], [-5.55, 1.06], [-5.10, 0.95]];
    var tpc = prism(tp, Z(1.27), Z(1.33), inXY);
    for (i = 0; i < tpc.length; i++) both(skin, tpc[i]);
    /* stub wings, 3.15 m over the tips, below the mast; pylons and pods */
    var wing = [[0.50, 0.38], [-0.62, 0.38], [-0.62, 1.575], [0.45, 1.575]];
    var wp = prism(wing, Z(1.25), Z(1.35), inXY);
    for (i = 0; i < wp.length; i++) both(skin, wp[i]);
    both(store, cyl(0.20, 0.20, 1.60, 16, "x", -0.20, 0.80, Z(0.93), true));
    both(store, cyl(0.07, 0.20, 0.17, 16, "x", 0.68, 0.80, Z(0.93)));
    both(store, cyl(0.20, 0.11, 0.17, 16, "x", -1.08, 0.80, Z(0.93)));
    var tr19 = [], q;
    for (q = 0; q < 19; q++) {
      var pp = q === 0 ? [0, 0] : q < 7 ? [Math.cos((q - 1) * PI / 3) * 0.08, Math.sin((q - 1) * PI / 3) * 0.08]
                                        : [Math.cos((q - 7) * PI / 6 + 0.13) * 0.155, Math.sin((q - 7) * PI / 6 + 0.13) * 0.155];
      both(dark, disc(0.034, 8, [0.775 + 0.004, 0.80 + pp[0], Z(0.93) + pp[1]], [1, 0, 0]));
    }
    both(dark, disc(0.16, 12, [-1.165, 0.80, Z(0.93)], [-1, 0, 0]));
    both(store, cyl(0.135, 0.135, 1.20, 16, "x", -0.10, 1.43, Z(1.10), true));
    both(store, cyl(0.05, 0.135, 0.13, 16, "x", 0.565, 1.43, Z(1.10)));
    both(store, cyl(0.135, 0.08, 0.13, 16, "x", -0.765, 1.43, Z(1.10)));
    for (q = 0; q < 7; q++) {
      var p7 = q === 0 ? [0, 0] : [Math.cos((q - 1) * PI / 3) * 0.075, Math.sin((q - 1) * PI / 3) * 0.075];
      both(dark, disc(0.04, 8, [0.634, 1.43 + p7[0], Z(1.10) + p7[1]], [1, 0, 0]));
    }
    both(dark, disc(0.11, 12, [-0.835, 1.43, Z(1.10)], [-1, 0, 0]));
    /* pylons from the wing to the pods */
    both(metal, box(0.55, 0.05, 0.30, -0.20, 0.80, Z(1.12)));
    both(metal, box(0.45, 0.05, 0.20, -0.10, 1.43, Z(1.22)));
    /* the chin turret: the M28 with its gun barrels, under the nose */
    skin.push(cyl(0.24, 0.20, 0.30, 16, "z", 3.58, 0, Z(0.80)));
    metal.push(sph(0.20, 14, 8, 3.66, 0, Z(0.62), 1.3, 1.0, 0.8));
    dark.push(cyl(0.04, 0.04, 0.80, 8, "x", 4.00, 0.07, Z(0.64)));
    dark.push(cyl(0.04, 0.04, 0.50, 8, "x", 3.85, -0.07, Z(0.64)));
    /* engine exhaust and intake details on the deck */
    dark.push(cyl(0.15, 0.12, 0.30, 12, "x", -1.45, 0, Z(2.28)));
    dark.push(box(0.05, 0.40, 0.30, 0.82, 0, Z(2.58)));
    /* the mast and its swashplate */
    metal.push(cyl(0.09, 0.10, 0.80, 12, "z", 0, 0, Z(3.30)));
    metal.push(cyl(0.20, 0.20, 0.04, 14, "z", 0, 0, Z(3.50)));
    /* tail rotor housing on the fin top */
    dark.push(box(0.46, 0.14, 0.34, -8.5, 0.07, Z(2.95)));
    /* skids: 2.0 m track, 3.6 m long */
    skids(dark, { gr: GR, skid: 0.99, skidR: 0.05, belly: 0.58, cy1: 0.78, xt: [1.25, -0.75], sx1: 2.32, sx0: -1.27 });
    /* the rear tail skid under the ventral fin? none drawn */
    (function () {
      mesh(g, skin, T.skin, "airframe"); mesh(g, glass, T.glass, "glass"); mesh(g, dark, T.dark, "fittings_dark");
      mesh(g, metal, T.metal, "fittings"); mesh(g, store, T.store, "stores"); mesh(g, team, T.team, "team");
      rotors(g, T, { hubZ: Z(3.70), R: 6.705, chord: 0.69, bar: 2.40, barZ: 0.13,
                            trX: -8.40, trY: 0.20, trZ: Z(2.86), trR: 1.295, trC: 0.22 });
    })();
    return g;
  }

  /* ====================================================== the UH-1D ===== */
  var HUEY = [
    [3.66, 0.05, 1.15, 1.30], [3.45, 0.50, 0.80, 1.55], [3.00, 0.85, 0.60, 1.85], [2.40, 1.02, 0.52, 2.25],
    [1.70, 1.10, 0.50, 2.42], [0.90, 1.15, 0.45, 2.52], [-0.50, 1.18, 0.47, 2.62], [-1.40, 1.15, 0.52, 2.60],
    [-2.00, 0.85, 0.70, 2.40], [-2.60, 0.45, 0.90, 1.90], [-3.20, 0.36, 1.00, 1.86], [-6.00, 0.22, 1.30, 1.88],
    [-8.40, 0.13, 1.50, 1.90]
  ];
  function buildHuey(THREE, M, C) {
    V = THREE;
    var GR = -2.0, Z = function (h) { return GR + h; };
    var S = HUEY.map(function (s) { return [s[0], s[1], Z(s[2]), Z(s[3])]; });
    var T = makeMats(C, 0x40492f);
    SMOOTH = true;
    var g = new V.Group(); g.name = "uh1d";
    var skin = [], glass = [], dark = [], metal = [], team = [], i, k;
    skin = skin.concat(loft(S, 36, undefined, undefined, 1, 3.66, -8.40));
    /* the transmission and engine fairing, mast base, rounded */
    skin.push(sph(0.5, 16, 10, -0.35, 0, Z(2.58), 1.60, 1.30, 0.30));
    /* the glazed nose and the cockpit: chin bubbles and the windscreen */
    glass = glass.concat(loft(S, 16, 8, 172, 1.012, 3.30, 1.95));
    glass = glass.concat(loft(S, 8, 190, 350, 1.012, 3.30, 2.60));
    /* the cabin door windows, the cockpit door windows, both sides */
    var wins = [[2.67, 1.93, 1.10, 2.08], [0.94, 0.26, 1.30, 1.88], [0.02, -0.62, 1.30, 1.88]];
    for (k = 0; k < wins.length; k++) {
      var wd = interp(S, (wins[k][0] + wins[k][1]) / 2);
      both(glass, box(wins[k][0] - wins[k][1], 0.03, wins[k][3] - wins[k][2], (wins[k][0] + wins[k][1]) / 2,
                      wd[1] * 0.97 + 0.01, Z((wins[k][2] + wins[k][3]) / 2)));
    }
    /* sliding door tracks and the door edges on the cabin side */
    var ed = [[1.12, 0.90, 2.20], [-0.97, 0.90, 2.20]];
    for (k = 0; k < ed.length; k++) {
      var wq = interp(S, ed[k][0]);
      both(dark, box(0.03, 0.03, ed[k][2] - ed[k][1], ed[k][0], wq[1] + 0.012, Z((ed[k][1] + ed[k][2]) / 2)));
    }
    both(dark, box(2.10, 0.035, 0.04, 0.07, 1.16, Z(2.22)));
    both(dark, box(2.10, 0.035, 0.04, 0.07, 1.17, Z(0.92)));
    both(dark, box(0.04, 0.03, 0.14, -0.20, 1.18, Z(1.45)));
    both(dark, box(0.12, 0.03, 0.03, 1.00, 1.17, Z(1.50)));
    both(dark, box(0.12, 0.03, 0.03, 1.60, 1.12, Z(1.38)));
    /* the engine deck: team flash, the intake, the exhaust */
    team = team.concat(loft(S, 6, 62, 118, 1.018, 1.0, -1.60));
    team = team.concat(loft(S, 6, 55, 125, 1.03, -3.40, -5.40));
    dark.push(box(0.50, 0.55, 0.14, 0.45, 0, Z(2.84)));
    dark.push(cyl(0.16, 0.13, 0.35, 12, "x", -1.55, 0, Z(2.45)));
    /* the tail: fin, tail rotor housing, tailplane, the tail skid */
    var fin = [[-6.9, Z(1.88)], [-8.2, Z(3.12)], [-8.7, Z(3.30)], [-9.05, Z(3.20)], [-8.95, Z(2.4)], [-8.55, Z(1.52)], [-7.9, Z(1.52)]];
    skin = skin.concat(prism(fin, -0.05, 0.05, inXZ));
    dark.push(box(0.46, 0.14, 0.34, -8.6, 0.07, Z(3.12)));
    var tp = [[-5.40, 0.20], [-6.20, 0.20], [-6.20, 1.42], [-5.55, 1.42]];
    var tpc = prism(tp, Z(1.56), Z(1.62), inXY);
    for (i = 0; i < tpc.length; i++) both(skin, tpc[i]);
    dark.push(bar([-8.0, 0, Z(1.45)], [-8.95, 0, Z(1.00)], 0.04, 8, true));
    /* the mast and swashplate */
    metal.push(cyl(0.10, 0.11, 1.18, 12, "z", 0, 0, Z(3.20)));
    metal.push(cyl(0.22, 0.22, 0.04, 14, "z", 0, 0, Z(3.62)));
    /* the four pitch links from the swashplate up to the grip horns */
    for (k = 0; k < 4; k++) {
      var pa = k * PI / 2 + PI / 4;
      metal.push(bar([Math.cos(pa) * 0.20, Math.sin(pa) * 0.20, Z(3.64)], [Math.cos(pa) * 0.16, Math.sin(pa) * 0.16, Z(3.84)], 0.014, 6, true));
    }
    /* the tail rotor drive shaft cover along the top of the tail boom */
    skin.push(cyl(0.07, 0.05, 4.70, 10, "x", -5.65, 0, Z(1.93)));
    skin.push(sph(0.09, 8, 6, -3.30, 0, Z(1.93), 1.6, 1, 0.8));
    /* skids: 2.60 m track, 3.7 m long, cross tubes under the cockpit and the rear of the cabin */
    skids(dark, { gr: GR, skid: 1.30, skidR: 0.05, belly: 0.46, cy1: 0.95, xt: [1.68, -0.60], sx1: 2.60, sx0: -1.10 });
    mesh(g, skin, T.skin, "airframe"); mesh(g, glass, T.glass, "glass"); mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings"); mesh(g, team, T.team, "team");
    rotors(g, T, { hubZ: Z(3.88), R: 7.355, chord: 0.533, bar: 2.63, barZ: 0.12,
                   trX: -8.60, trY: 0.20, trZ: Z(3.12), trR: 1.295, trC: 0.21 });
    SMOOTH = false;
    return g;
  }

  return { ah1g: buildCobra, uh1d: buildHuey };
})();

UNIT_MODELS["nato_e60_gunship"]   = { len: 16.4, build: HeroBellHuey.ah1g };
UNIT_MODELS["nato_e60_transport"] = { len: 17.1, build: HeroBellHuey.uh1d };
