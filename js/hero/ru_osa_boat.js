/* ==================== js/hero/ru_osa_boat.js ===========================
   HERO MODEL -- Project 205 "Osa" (Osa I) missile boat, 1960s.
   Key: pact_e60_missileboat.  Length 38.6 m, beam 7.6 m, draught about 1.7 m.

   REFERENCES (what each feature rests on):
     - Commons "Raketenschnellboot - Projekt 205 (OSA 1 Klasse).jpg" (a
       three-view drawing with the 38.6 m and 7.6 m dimensions): stations,
       sheer, the positions of the four launchers (aft pair about x -15.7 to
       -8, forward pair about -5.5 to +2.2, measured with 16.2 px per metre),
       the low pilothouse, the mast just abaft the bridge, the Drum Tilt drum on
       a railed pedestal on the centreline between the aft launchers, the
       centreline casing, the two gun mounts fore and aft, the three shafts.
     - Commons "Project205-1983.jpg" (bow-on photograph of a Project 205):
       the tapered launcher boxes with a pitched lid and an open, hooded
       front on a dark open frame, the pilothouse face with three windows,
       the bridge with a windscreen and roof, lifelines and stanchions along
       the bow, the forward twin 30 mm mount (two rounded cheeks, open front).
     - Commons "Osa-I class Project205 DN-SN-84-01770.jpg" (quarter view at
       speed): launcher elevation (muzzle end forward and raised), mast with
       side-mounted square arrays and a top radar, Drum Tilt pedestal aft,
       grey hull with the dark underbody, house with windows and a door.
     - Armament counts (4 x P-15 Termit / SS-N-2 Styx containers, 2 x twin
       30 mm AK-230 fore and aft) are the published figures in this game's
       own data rows; the radar names (Square Tie on the mast, Drum Tilt in
       the aft drum antenna) follow the brief and the published fit.
     - PAINT: mid grey topsides and lighter superstructure as the period
       photographs read; dark underbody. No hull number, name or ensign.
   NOT CONFIRMED and therefore not drawn: any Osa II refits, Osa-II type
   launcher changes, named IFF fits, small boats, the funnel (none: exhaust
   is through the quarters), hull number. Lifeline stanchion count, window
   positions on the house sides and the exact mast clutter are approximate.
   Square Tie is drawn as a plain flat array on the mast head.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. The forward
   twin AK-230 is the group named "turret"; everything else is baked.
   Every static part is merged into one mesh per material. ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroOsaBoat = (function () {
  "use strict";
  var PI = Math.PI, LOA = 38.6;

  /* x, half beam, deck z, keel z, chine z */
  var STA = [
    [-19.3, 3.55, 1.75, -1.15, -0.45],
    [-17.0, 3.70, 1.75, -1.35, -0.45],
    [-10.0, 3.80, 1.92, -1.50, -0.45],
    [ -2.0, 3.80, 2.17, -1.50, -0.45],
    [  4.0, 3.72, 2.35, -1.45, -0.40],
    [  8.0, 3.45, 2.42, -1.30, -0.25],
    [ 11.0, 3.00, 2.55, -1.00,  0.00],
    [ 14.0, 2.35, 2.62, -0.45,  0.25],
    [ 16.5, 1.55, 2.80,  0.35,  0.80],
    [ 18.2, 0.80, 2.92,  1.10,  1.50],
    [ 19.3, 0.08, 3.00,  2.20,  2.50]
  ];
  function pick(x, k) {
    var i;
    if (x <= STA[0][0]) return STA[0][k];
    for (i = 1; i < STA.length; i++) if (x <= STA[i][0]) {
      var a = STA[i - 1], b = STA[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[k] + (b[k] - a[k]) * f;
    }
    return STA[STA.length - 1][k];
  }
  function deckZ(x) { return pick(x, 2); }
  function halfB(x) { return pick(x, 1); }

  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function plateTex(THREE, rep) {
    var key = "p" + rep[0] + "_" + rep[1];
    if (TEX[key]) return TEX[key];
    var W = 256, H = 256, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d"), R = rng(2051), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.16; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 5; i++) {
      g.beginPath(); g.moveTo(0, i * H / 5); g.lineTo(W, i * H / 5); g.stroke();
      g.beginPath(); g.moveTo(i * W / 5, 0); g.lineTo(i * W / 5, H); g.stroke();
    }
    g.globalAlpha = 0.08;
    for (i = 0; i < 30; i++) {
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 16 + R() * 58, 10 + R() * 38);
    }
    g.globalAlpha = 1;
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(rep[0], rep[1]);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX[key] = t; return t;
  }
  function makeMats(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      hull:  skin(0x8e979c, plateTex(THREE, [10, 1]), 0.86),
      under: skin(0x2a2d30, plateTex(THREE, [6, 2]), 0.9),
      sup:   skin(0x9ba4a9, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(0x6c7478, plateTex(THREE, [8, 1.5]), 0.95),
      dark:  skin(0x08090a, plateTex(THREE, [2, 2]), 0.9),
      team:  skin(team, plateTex(THREE, [1, 1]), 0.84),
      metal: metal(0x555b61, 0.52, 0.55),
      gun:   metal(0x3b4146, 0.48, 0.60),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x05090b, roughness: 0.1, metalness: 0,
                                              transparent: true, opacity: 0.84 })
    };
  }
  function sealMats(M) {
    for (var k in M) if (M.hasOwnProperty(k)) {
      M[k].userData = M[k].userData || {}; M[k].userData._srgbDone = true;
    }
    return M;
  }

  /* ------------------------------------------------------------ helpers */
  function box(THREE, p, lx, ly, lz, m, x, y, z, ry) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z); if (ry) b.rotation.y = ry; p.add(b); return b;
  }
  function cylZ(THREE, p, rt, rb, h, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1); g.rotateX(PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function cylX(THREE, p, rt, rb, len, seg, m, x, y, z, open) {
    var g = new THREE.CylinderGeometry(rt, rb, len, seg, 1, !!open); g.rotateZ(-PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), m);
    s.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  /* convex solid from vertices and triangle faces; each face is wound to
     point away from the centroid. faces: [i, j, k, mat?] */
  function solid(THREE, p, defM, V, F, xf) {
    var bins = [], i, j, c = [0, 0, 0], W = [];
    for (i = 0; i < V.length; i++) {
      var q = xf ? xf(V[i]) : V[i]; W.push(q);
      c[0] += q[0] / V.length; c[1] += q[1] / V.length; c[2] += q[2] / V.length;
    }
    function bin(m) {
      for (var b = 0; b < bins.length; b++) if (bins[b].m === m) return bins[b];
      var nb = { m: m, P: [], U: [] }; bins.push(nb); return nb;
    }
    for (i = 0; i < F.length; i++) {
      var a = W[F[i][0]], b2 = W[F[i][1]], d = W[F[i][2]];
      var ux = b2[0] - a[0], uy = b2[1] - a[1], uz = b2[2] - a[2];
      var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      if (nx * nx + ny * ny + nz * nz < 1e-10) continue;
      var fx = (a[0] + b2[0] + d[0]) / 3 - c[0], fy = (a[1] + b2[1] + d[1]) / 3 - c[1], fz = (a[2] + b2[2] + d[2]) / 3 - c[2];
      var tri = (nx * fx + ny * fy + nz * fz) >= 0 ? [a, b2, d] : [a, d, b2];
      var B = bin(F[i][3] || defM);
      for (j = 0; j < 3; j++) {
        B.P.push(tri[j][0], tri[j][1], tri[j][2]);
        B.U.push(tri[j][0] * 0.16, tri[j][2] * 0.16 + tri[j][1] * 0.1);
      }
    }
    bins.forEach(function (B) {
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(B.P, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(B.U, 2));
      g.computeVertexNormals();
      p.add(new THREE.Mesh(g, B.m));
    });
  }
  /* prism: rect rings (x0..x1 at z0, x0b..x1b at z1), half width hw0 / hw1 */
  function house(THREE, p, m, x0, x1, hw0, z0, x0b, x1b, hw1, z1, x, y, extra) {
    var V = [[x0, -hw0, z0], [x1, -hw0, z0], [x1, hw0, z0], [x0, hw0, z0],
             [x0b, -hw1, z1], [x1b, -hw1, z1], [x1b, hw1, z1], [x0b, hw1, z1]];
    var F = [[0, 1, 2], [0, 2, 3], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    solid(THREE, p, m, V, F, function (q) { return [q[0] + (x || 0), q[1] + (y || 0), q[2]]; });
  }

  /* ------------------------------------------------------------- hull */
  function hullGeoms(THREE, T, g) {
    var XS = [], i, k, n = 4;
    for (i = 0; i < STA.length - 1; i++)
      for (k = 0; k < n; k++) XS.push(STA[i][0] + (STA[i + 1][0] - STA[i][0]) * k / n);
    XS.push(STA[STA.length - 1][0]);
    /* half-section path (right side positive y), keel .. sheer */
    function path(x) {
      var w = halfB(x), dz = deckZ(x), kz = pick(x, 3), cz = pick(x, 4);
      var wz = Math.min(Math.max(cz, 0.12), dz - 0.05);
      var cw = w * 0.9, ww = cw + (w - cw) * Math.max(0, (wz - cz) / Math.max(0.01, dz - cz));
      return [[0, kz], [cw, cz], [ww, wz], [w, dz]];
    }
    var P = XS.map(path), pu = [], uu = [], ph = [], uh = [];
    function tri(arr, uvs, a, b, c, mx, my, mz) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      if (nx * nx + ny * ny + nz * nz < 1e-10) return;
      var cx = (a[0] + b[0] + c[0]) / 3 - mx, cy = (a[1] + b[1] + c[1]) / 3, cz = (a[2] + b[2] + c[2]) / 3 - mz;
      var t = (nx * cx + ny * cy + nz * cz) >= 0 ? [a, b, c] : [a, c, b], j;
      for (j = 0; j < 3; j++) { arr.push(t[j][0], t[j][1], t[j][2]); uvs.push(t[j][0] / 6, t[j][2] / 6 + t[j][1] / 12); }
    }
    for (i = 0; i < XS.length - 1; i++) {
      var A = P[i], B = P[i + 1], x0 = XS[i], x1 = XS[i + 1], s, j;
      var mz0 = (A[0][1] + A[3][1]) / 2;
      for (s = -1; s <= 1; s += 2) for (j = 0; j < 3; j++) {
        var a = [x0, s * A[j][0], A[j][1]], b = [x1, s * B[j][0], B[j][1]],
            c = [x1, s * B[j + 1][0], B[j + 1][1]], d = [x0, s * A[j + 1][0], A[j + 1][1]];
        var arr = j < 2 ? pu : ph, uv = j < 2 ? uu : uh;
        tri(arr, uv, a, b, c, (x0 + x1) / 2, 0, mz0); tri(arr, uv, a, c, d, (x0 + x1) / 2, 0, mz0);
      }
    }
    /* transom (hull colour) */
    var Q = P[0], ring = [], tp = [], tu = [];
    for (j = 0; j < 4; j++) ring.push([XS[0], Q[j][0], Q[j][1]]);
    for (j = 3; j >= 1; j--) ring.push([XS[0], -Q[j][0], Q[j][1]]);
    ring.push([XS[0], Q[0][0], Q[0][1]]);
    var cen = [XS[0], 0, 0.3];
    for (j = 0; j < ring.length - 1; j++) tri(tp, tu, cen, ring[j], ring[j + 1], XS[0] + 5, 0, 0.3);
    function mk(arr, uv, m) {
      var gg = new THREE.BufferGeometry();
      gg.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
      gg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      gg.computeVertexNormals(); g.add(new THREE.Mesh(gg, m));
    }
    mk(pu, uu, T.under); mk(ph, uh, T.hull); mk(tp, tu, T.hull);
    /* deck */
    var dp = [], du = [];
    for (i = 0; i < XS.length - 1; i++) {
      var xa = XS[i], xb = XS[i + 1], wa = halfB(xa), wb = halfB(xb),
          za = deckZ(xa) + 0.03, zb = deckZ(xb) + 0.03;
      tri(dp, du, [xa, -wa, za], [xb, -wb, zb], [xb, wb, zb], 0, 0, -10);
      tri(dp, du, [xa, -wa, za], [xb, wb, zb], [xa, wa, za], 0, 0, -10);
    }
    mk(dp, du, T.deck);
  }

  function bake(THREE, root) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
      var id = o.material.uuid;
      if (!bins[id]) { bins[id] = { m: o.material, P: [], N: [], U: [] }; order.push(id); }
      var b = bins[id], pa = geo.attributes.position.array, na = geo.attributes.normal.array;
      var ua = geo.attributes.uv ? geo.attributes.uv.array : null, i;
      for (i = 0; i < pa.length; i++) { b.P.push(pa[i]); b.N.push(na[i]); }
      for (i = 0; i < pa.length / 3; i++) b.U.push(ua ? ua[i * 2] : 0, ua ? ua[i * 2 + 1] : 0);
    });
    var out = new THREE.Group();
    order.forEach(function (id) {
      var b = bins[id], g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(b.P, 3));
      g.setAttribute("normal", new THREE.Float32BufferAttribute(b.N, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(b.U, 2));
      var me = new THREE.Mesh(g, b.m); me.castShadow = true; me.receiveShadow = true; out.add(me);
    });
    return out;
  }

  /* ------------------------------------------------------------ weapons */
  /* twin 30 mm AK-230 at rest pointing +X: round base, two rounded cheeks
     with an open front (photograph), two barrels */
  function ak230(THREE, g, T) {
    cylZ(THREE, g, 0.55, 0.62, 0.55, 16, T.sup, 0, 0, 0.27);
    cylZ(THREE, g, 0.62, 0.62, 0.08, 16, T.metal, 0, 0, 0.58);
    var s;
    for (s = -1; s <= 1; s += 2) {
      var sg = new THREE.SphereGeometry(0.40, 14, 10); sg.scale(1.1, 0.62, 1.0);
      var m1 = new THREE.Mesh(sg, T.sup); m1.position.set(0, s * 0.36, 1.0); g.add(m1);
      cylX(THREE, g, 0.040, 0.040, 1.5, 6, T.gun, 0.95, s * 0.30, 1.0, true);
      cylX(THREE, g, 0.070, 0.070, 0.30, 8, T.gun, 0.30, s * 0.30, 1.0);
      cylX(THREE, g, 0.055, 0.055, 0.12, 8, T.gun, 1.72, s * 0.30, 1.0);
    }
    box(THREE, g, 0.5, 0.45, 0.5, T.dark, 0.25, 0, 0.95);
    box(THREE, g, 0.4, 0.24, 0.5, T.sup, -0.4, 0, 0.88);
    return g;
  }

  /* SS-N-2 launch container: hexagonal-section box, lid pitched, hooded open
     front. Local origin = rear bottom centre, +x along the axis. */
  function launcher(THREE, g, T, s, bx, by, bz) {
    var L = 7.2, hw = 1.12, h1 = 1.30, h2 = 2.20, hwt = 0.80, hood = 0.6, h1f = 1.65, h2f = 3.30;
    var V = [], F = [], i, pitch = 4 * PI / 180, sp = s * 4 * PI / 180;
    var ring = [[-hw, 0], [hw, 0], [hw, h1], [hwt, h2], [-hwt, h2], [-hw, h1]];
    for (i = 0; i < 6; i++) V.push([0, ring[i][0], ring[i][1]]);
    var ringF = [[-hw, 0], [hw, 0], [hw, h1f], [hwt, h2f], [-hwt, h2f], [-hw, h1f]];
    for (i = 0; i < 6; i++) V.push([i < 2 ? L : L + hood, ringF[i][0], ringF[i][1]]);
    for (i = 0; i < 6; i++) {
      var j = (i + 1) % 6;
      F.push([i, j, 6 + j], [i, 6 + j, 6 + i]);
    }
    F.push([0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 5]);
    F.push([6, 7, 8, T.dark], [6, 8, 9, T.dark], [6, 9, 10, T.dark], [6, 10, 11, T.dark]);
    /* the faces under the hood (bottom front edge to the hood) read dark */
    F.forEach(function (f) {
      if (f.length === 3 && f[0] >= 6 && f[1] >= 6 && f[2] >= 6) f[3] = T.dark;
    });
    /* only the two underside slopes (side-bottom to side-lower) are dark;
       the front cap shows the open end */
    var cp = Math.cos(pitch), sn = Math.sin(pitch), cs = Math.cos(sp), ss = Math.sin(sp);
    function xf(q) {
      var x = q[0] * cp - q[2] * sn, z = q[0] * sn + q[2] * cp, y = q[1];
      return [bx + x * cs - y * ss, by + x * ss + y * cs, bz + z];
    }
    solid(THREE, g, T.sup, V, F, xf);
    /* guide beams and lid ribs, in the container frame */
    function P(x, y, z) { return xf([x, y, z]); }
    var k, a, b;
    for (k = 0; k < 6; k++) {
      var xr = 0.8 + k * 1.15, f = xr / (L + hood);
      var zt = h2 + (h2f - h2) * f, zs = h1 + (h1f - h1) * f;
      a = P(xr, -hwt, zt + 0.03); b = P(xr, hwt, zt + 0.03);
      strut(THREE, g, T.metal, a[0], a[1], a[2], b[0], b[1], b[2], 0.03, 4);
      a = P(xr, hwt, zt - 0.02); b = P(xr, hw + 0.02, zs + 0.02);
      strut(THREE, g, T.metal, a[0], a[1], a[2], b[0], b[1], b[2], 0.025, 3);
      a = P(xr, -hwt, zt - 0.02); b = P(xr, -hw - 0.02, zs + 0.02);
      strut(THREE, g, T.metal, a[0], a[1], a[2], b[0], b[1], b[2], 0.025, 3);
    }
    var yy;
    for (yy = -1; yy <= 1; yy += 2) {
      a = P(L - 0.1, yy * 0.7, 0.3); b = P(L + hood + 0.05, yy * 0.7, 1.0);
      strut(THREE, g, T.gun, a[0], a[1], a[2], b[0], b[1], b[2], 0.05, 5);
    }
    /* dark open frame below the raised front, with posts */
    var rs = P(L * 0.45, 0, 0), fr = P(L, 0, 0);
    var fv = [[0.5, -hw + 0.1, 0], [L, -hw + 0.1, 0], [L, hw - 0.1, 0], [0.5, hw - 0.1, 0]];
    var V2 = [], F2 = [[0, 1, 2], [0, 2, 3], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4], [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    for (i = 0; i < 4; i++) V2.push([fv[i][0], fv[i][1], 0.0]);
    for (i = 0; i < 4; i++) V2.push([fv[i][0], fv[i][1], 0.12]);
    solid(THREE, g, T.dark, V2, F2, function (q) { return [bx + (q[0] * 0.9) * cs - q[1] * ss, by + (q[0] * 0.9) * ss + q[1] * cs, q[2] + bz - 0.0 - 0.0]; });
    /* open frame posts at the front */
    var pz = [P(L - 0.2, -hw + 0.1, 0), P(L - 0.2, hw - 0.1, 0)];
    pz.forEach(function (q) {
      box(THREE, g, 0.12, 0.12, q[2] - bz + 0.2, T.metal, q[0], q[1], bz + (q[2] - bz) / 2 - 0.05);
    });
    var mid = P(L * 0.5, 0, 0);
    box(THREE, g, 0.14, 2.2, 0.14, T.metal, mid[0], mid[1], mid[2] - 0.08);
    return g;
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, z, k;

    hullGeoms(THREE, T, g);
    /* rubbing strake and scuppers along the hull sides */
    for (i = 0; i < 28; i++) {
      x = -18.0 + i * 1.2;
      for (s = -1; s <= 1; s += 2) {
        box(THREE, g, 1.1, 0.05, 0.10, T.under, x, s * (halfB(x) + 0.02), deckZ(x) - 0.55, 0);
        if (i % 3 === 1) box(THREE, g, 0.30, 0.04, 0.16, T.dark, x + 0.3, s * (halfB(x) + 0.02), deckZ(x) - 0.12);
      }
    }
    /* sea chest openings and the stem fitting */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.10, 0.10, 0.1, 10, T.dark, 9.0, s * (halfB(9) - 0.1), 1.0);
      cylX(THREE, g, 0.07, 0.07, 0.1, 10, T.dark, 13.0, s * (halfB(13) - 0.1), 1.3);
    }

    /* centreline casing between the launcher pairs and the house */
    house(THREE, g, T.sup, -13.0, 2.4, 1.0, 1.9, -12.8, 2.2, 0.9, 2.55, 0, 0);
    for (i = 0; i < 6; i++) box(THREE, g, 0.7, 0.05, 0.28, T.dark, -11.0 + i * 2.0, 0.93, 2.35);
    for (i = 0; i < 6; i++) box(THREE, g, 0.7, 0.05, 0.28, T.dark, -11.0 + i * 2.0, -0.93, 2.35);

    /* launchers: aft pair and forward pair, muzzles forward and raised */
    for (s = -1; s <= 1; s += 2) {
      launcher(THREE, g, T, s, -15.8, s * 2.0, deckZ(-15.8) + 0.02);
      launcher(THREE, g, T, s, -5.4, s * 2.0, deckZ(-5.4) + 0.02);
    }

    /* pilothouse: raked face, three windows, side windows, door */
    var hz = deckZ(4.7);
    house(THREE, g, T.sup, 2.4, 7.1, 1.7, hz, 2.5, 6.6, 1.55, hz + 2.2, 0, 0);
    box(THREE, g, 0.05, 0.62, 0.42, T.glass, 6.78, 0.0, hz + 1.50, -0.12);
    box(THREE, g, 0.05, 0.62, 0.42, T.glass, 6.78, 0.9, hz + 1.50, -0.12);
    box(THREE, g, 0.05, 0.62, 0.42, T.glass, 6.78, -0.9, hz + 1.50, -0.12);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) box(THREE, g, 0.5, 0.05, 0.4, T.glass, 3.6 + i * 1.1, s * 1.64, hz + 1.5);
      box(THREE, g, 0.6, 0.06, 1.5, T.dark, 6.0, s * 1.65, hz + 0.8);
    }
    /* upper bridge: low walls, windscreen, roof */
    var bz = hz + 2.2;
    house(THREE, g, T.sup, 3.0, 6.0, 1.25, bz, 3.0, 5.7, 1.2, bz + 0.7, 0, 0);
    box(THREE, g, 0.07, 2.2, 0.6, T.glass, 5.85, 0, bz + 0.95, 0.28);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 2.4, 0.06, 0.5, T.glass, 4.5, s * 1.22, bz + 1.0);
    box(THREE, g, 3.3, 2.7, 0.10, T.sup, 4.3, 0, bz + 1.25);
    /* bridge top rail */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++)
      strut(THREE, g, T.metal, 3.0 + i * 0.95, s * 1.3, bz + 1.3, 3.0 + i * 0.95, s * 1.3, bz + 1.8, 0.025, 4);
    strut(THREE, g, T.metal, 3.0, 1.3, bz + 1.75, 5.85, 1.3, bz + 1.75, 0.02, 3);
    strut(THREE, g, T.metal, 3.0, -1.3, bz + 1.75, 5.85, -1.3, bz + 1.75, 0.02, 3);
    /* searchlight and signal lamps */
    cylZ(THREE, g, 0.2, 0.2, 0.3, 10, T.gun, 5.2, 0.6, bz + 1.5);
    cylZ(THREE, g, 0.14, 0.14, 0.25, 8, T.gun, 5.2, -0.6, bz + 1.45);

    /* mast just abaft the bridge: tube, two cross-arms with side arrays,
       top plate array (Square Tie) and whip antennas */
    var mx = 2.05, mb = bz + 0.6, mt = 10.4;
    cylZ(THREE, g, 0.22, 0.28, mt - mb, 10, T.metal, mx, 0, (mt + mb) / 2);
    cylZ(THREE, g, 0.32, 0.32, 0.5, 10, T.sup, mx, 0, mb + 0.3);
    box(THREE, g, 0.30, 3.3, 0.12, T.metal, mx, 0, 8.2);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.12, 0.8, 0.7, T.metal, mx, s * 1.5, 8.5);
      for (i = 1; i < 4; i++) box(THREE, g, 0.04, 0.8, 0.03, T.dark, mx + 0.07, s * 1.5, 8.2 + i * 0.17);
      strut(THREE, g, T.metal, mx, s * 0.25, 8.0, mx - 0.6, s * 1.2, 6.4, 0.02, 3);
    }
    box(THREE, g, 0.9, 0.9, 0.12, T.metal, mx, 0, 9.0);
    box(THREE, g, 0.10, 2.4, 1.1, T.metal, mx, 0, 10.2);
    for (i = 1; i < 5; i++) box(THREE, g, 0.14, 2.4, 0.03, T.dark, mx + 0.01, 0, 9.65 + i * 0.22);
    for (i = -2; i <= 2; i++) box(THREE, g, 0.14, 0.03, 1.1, T.dark, mx + 0.01, i * 0.45, 10.2);
    box(THREE, g, 0.4, 0.4, 0.2, T.gun, mx, 0, 10.9);
    strut(THREE, g, T.metal, mx, 0, 10.9, mx, 0, 12.0, 0.02, 4);
    strut(THREE, g, T.metal, mx - 0.4, 1.3, bz + 0.9, mx - 0.6, 1.3, bz + 4.7, 0.015, 3);
    strut(THREE, g, T.metal, mx - 1.0, -1.3, 4.6, mx - 1.5, -1.3, 8.6, 0.015, 3);
    strut(THREE, g, T.metal, mx, 0, 10.0, 6.0, 0, bz + 1.3, 0.008, 3);
    strut(THREE, g, T.metal, mx, 0, 10.0, -6.0, 0, 3.5, 0.008, 3);

    /* aft ball radome on a railed pedestal, centreline between the aft pair */
    var rx = -12.5, rz = deckZ(-12.5);
    cylZ(THREE, g, 0.68, 0.78, 3.2, 14, T.sup, rx, 0, rz + 1.6);
    cylZ(THREE, g, 1.1, 1.1, 0.12, 14, T.metal, rx, 0, rz + 3.25);
    for (i = 0; i < 12; i++) {
      var an = i * PI / 6;
      strut(THREE, g, T.metal, rx + 1.05 * Math.cos(an), 1.05 * Math.sin(an), rz + 3.3, rx + 1.05 * Math.cos(an), 1.05 * Math.sin(an), rz + 4.0, 0.025, 4);
    }
    cylZ(THREE, g, 1.07, 1.07, 0.03, 14, T.metal, rx, 0, rz + 3.75);
    /* Drum Tilt: a drum antenna on a yoke, face tilted up toward the bow
       (the drawing shows a tilted rounded drum, not a ball) */
    var dg = new THREE.CylinderGeometry(0.78, 0.78, 1.15, 20, 1); dg.rotateZ(-PI / 2);
    dg.rotateY(-0.5);
    var dome = new THREE.Mesh(dg, T.sup); dome.position.set(rx, 0, rz + 4.5); g.add(dome);
    cylZ(THREE, g, 0.12, 0.12, 0.5, 8, T.metal, rx, 0, rz + 3.9);
    cylZ(THREE, g, 0.42, 0.55, 0.45, 12, T.sup, rx, 0, rz + 3.5);
    box(THREE, g, 0.3, 0.5, 1.1, T.dark, rx - 0.55, 0, rz + 2.3);
    strut(THREE, g, T.metal, rx - 0.9, 0, rz + 3.3, rx - 0.9, 0, rz + 0.1, 0.03, 3);
    strut(THREE, g, T.metal, rx + 0.0, 1.0, rz + 3.25, rx + 0.0, 1.05, rz + 0.1, 0.03, 3);

    /* after twin 30 mm, trained aft, on its own low base */
    var ag = new THREE.Group(); ag.position.set(-17.3, 0, deckZ(-17.3)); ag.rotation.z = PI;
    ak230(THREE, ag, T); g.add(ag);

    /* deck fittings: hatches, mushroom vents, bollards, anchor, lifelines */
    box(THREE, g, 0.7, 0.7, 0.08, T.metal, 9.2, 0.0, deckZ(9.2) + 0.08);
    box(THREE, g, 0.7, 0.7, 0.08, T.metal, 13.4, 0.8, deckZ(13.4) + 0.08);
    box(THREE, g, 0.8, 0.8, 0.12, T.metal, 8.0, -1.8, deckZ(8) + 0.1);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.12, 0.14, 0.3, 8, T.metal, 8.4, s * 2.2, deckZ(8.4) + 0.15);
      cylZ(THREE, g, 0.26, 0.10, 0.12, 10, T.metal, 8.4, s * 2.2, deckZ(8.4) + 0.36);
      cylZ(THREE, g, 0.10, 0.12, 0.28, 8, T.metal, 15.0, s * 1.1, deckZ(15) + 0.14);
      cylZ(THREE, g, 0.22, 0.09, 0.1, 10, T.metal, 15.0, s * 1.1, deckZ(15) + 0.33);
    }
    for (s = -1; s <= 1; s += 2) {
      [-18.0, -13.0, 1.0, 9.0, 12.0, 15.0].forEach(function (cx) {
        box(THREE, g, 0.30, 0.08, 0.06, T.metal, cx, s * (halfB(cx) - 0.2), deckZ(cx) + 0.1);
        cylZ(THREE, g, 0.04, 0.05, 0.14, 5, T.metal, cx - 0.1, s * (halfB(cx) - 0.2), deckZ(cx) + 0.05);
        cylZ(THREE, g, 0.04, 0.05, 0.14, 5, T.metal, cx + 0.1, s * (halfB(cx) - 0.2), deckZ(cx) + 0.05);
      });
    }
    cylZ(THREE, g, 0.30, 0.30, 0.4, 12, T.metal, 15.3, 0, deckZ(15.3) + 0.2);
    cylZ(THREE, g, 0.1, 0.1, 0.1, 8, T.dark, 15.3, 0, deckZ(15.3) + 0.45);
    box(THREE, g, 0.6, 0.12, 0.5, T.gun, 18.2, 0, deckZ(18.2) + 0.25);
    function lifelines(x0, x1, step) {
      var n = Math.max(2, Math.round((x1 - x0) / step)), q, p0 = null, xx, yy, zz;
      for (s = -1; s <= 1; s += 2) {
        p0 = null;
        for (q = 0; q <= n; q++) {
          xx = x0 + (x1 - x0) * q / n; yy = s * (halfB(xx) - 0.14); zz = deckZ(xx) + 0.03;
          strut(THREE, g, T.metal, xx, yy, zz, xx, yy, zz + 0.9, 0.025, 4);
          if (p0) {
            strut(THREE, g, T.metal, p0[0], p0[1], p0[2] + 0.88, xx, yy, zz + 0.88, 0.012, 3);
            strut(THREE, g, T.metal, p0[0], p0[1], p0[2] + 0.45, xx, yy, zz + 0.45, 0.010, 3);
          }
          p0 = [xx, yy, zz];
        }
      }
    }
    lifelines(7.4, 18.2, 0.9);
    lifelines(-19.0, -17.8, 0.8);
    lifelines(-14.0, -13.0, 0.8);
    /* bow: stem rail across and jackstaff */
    strut(THREE, g, T.metal, 18.5, 0, deckZ(18.5) + 0.03, 18.5, 0, deckZ(18.5) + 1.2, 0.02, 4);
    strut(THREE, g, T.metal, 18.6, 0.0, deckZ(18.6) + 0.2, 17.2, 1.2, deckZ(17.2) + 0.2, 0.02, 3);

    /* underwater gear: three shafts with three-blade screws, rudders */
    for (i = -1; i <= 1; i++) {
      var sy = i * 1.55;
      cylX(THREE, g, 0.07, 0.07, 1.6, 6, T.metal, -18.1, sy, -1.05, false);
      strut(THREE, g, T.metal, -17.9, sy, -1.02, -17.3, sy * 1.0, -0.45, 0.06, 4);
      cylX(THREE, g, 0.12, 0.08, 0.4, 8, T.metal, -19.0, sy, -1.05);
      for (k = 0; k < 3; k++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 0.55), T.metal);
        bl.position.set(-19.12, sy, -1.05); bl.rotation.x = k * 2 * PI / 3;
        bl.translateZ(0.3); g.add(bl);
      }
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.9, 0.06, 1.0, T.metal, -19.0, s * 0.8, -0.8);

    /* team: two small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 1.2, 0.5, 0.02, T.team, 4.3, 0, bz + 1.25 + 0.08);
    box(THREE, g, 1.2, 0.5, 0.02, T.team, -17.2, 1.3, deckZ(-17.2) + 0.05);

    /* trained mount: forward twin 30 mm */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(10.2, 0, deckZ(10.2)); ak230(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    var tb = bake(THREE, tw);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tb.children.forEach(function (c) { tw.add(c); });
    root.add(tw);
    return root;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e60_missileboat"] = {
  len: 38.6,
  build: function (THREE, M, C) { return HeroOsaBoat.build(THREE, M, C); }
};
