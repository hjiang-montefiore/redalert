/* ========== us_a7_corsair.js - HERO MODEL: LTV A-7D Corsair II (e60, NATO) ==========

   Row nato_e60_cas, "LTV A-7D Corsair II", service 1968 (the row text also
   names the Navy A-7A from 1967). The USAF A-7D is drawn: the Allison TF41
   engine, the M61A1 Vulcan in the port forward fuselage, no probe on the
   nose, and a land-based aircraft (it is not a carrier type; the arrestor
   hook is the land-field one).

   Published figures: length 14.06 m, span 11.80 m, height 4.90 m, wing
   area about 34.8 m2, wing leading edge swept 35 degrees to the
   fold, a slight anhedral, a chin intake below the short nose, a shoulder
   wing, a bubble canopy, a low-set all-moving tailplane, six wing pylons.

   PLANFORM rests on the LTV A-7 three-view line drawing on Wikimedia
   Commons (File:LTV A-7 Corsair II 3-view line drawing.gif), measured
   from the plan view with the scale fixed by length 14.06 m nose to
   tailplane tip and span 11.80 m (both agree to 1%): wing leading edge
   from s 5.3 m at the fuselage to the fold at y 3.25 m (s 6.9 m, 35 deg),
   then a steeper outer panel to the tip (y 5.9, s 9.5); trailing edge s 8.5
   at the root, 9.5 at the fold, 10.8 at the tip; the drawing shows no real
   dogtooth notch, so none is drawn; wing pylons at y 1.67 and 2.54 m from
   the drawing, the third (y 3.7, just outboard of the fold) is an
   estimate; tailplane root leading edge s 11.5 to tip s 13.6, tip trailing
   edge at the nose-to-tail length. NOT confirmed by any drawing: the
   main-gear track (3.0 m), the fin outline and the refuelling receptacle
   (not drawn).

   DETAIL PASS: added the canopy sill rails and mirror, the compressor face
   in the duct, two blade aerials, red beacons above and below, wingtip
   position lights, the tail light, static dischargers, the jet pipe's
   flameholder and turbine cone, the pylons' sway braces; on the gear the
   oleo collars, torque links, brake lines, hub caps and the taxi lamp; and
   on the paint sheet the frames and seams with fastener rows, the wing
   spars and panels, the avionics, engine and speed-brake outlines, fuel
   caps, gun-gas and exhaust soot and streaks. All placed from photographs
   of the A-7D, NOT measured.

   PAINT: the USAF Southeast Asia scheme of the period, FS 30219 tan with
   FS 34102 and 34079 green blotches on the upper surfaces over FS 36622
   light grey undersides. The pattern is a procedural canvas (blotch
   placement is not the real mask); faces looking down use a plain grey
   belly material, the lower fuselage sides are grey.

   Model space: +X nose, +Y port, +Z up, metres. Everything is written
   against a NOSE STATION s (metres aft of the nose tip), converted with
   X(s). The fuselage axis is z = 0; the ground is z = -2.15 so the tyres
   (the "gear" group) are the lowest opaque part and the fin tip stands
   4.90 m above them. */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  var NOSE = 7.03;
  var BELLY = null, SKIN = null;
  function X(s) { return NOSE - s; }
  var GROUND = -2.15;
  var ANHED = Math.tan(3 * Math.PI / 180);      /* 3 degrees of anhedral */

  /* wing planform, written by span station y (m) -> nose station s (m) */
  var TAN35 = Math.tan(35 * Math.PI / 180);
  var YF = 3.25;                                 /* the fold */
  function leS(y) {                              /* leading edge: 35 deg, then the outer panel */
    return y <= YF ? 5.05 + TAN35 * (y - 0.6) : 5.05 + TAN35 * (YF - 0.6) + 0.994 * (y - YF);
  }
  function teS(y) {
    return y <= YF ? 8.46 + 0.3745 * (y - 0.6) : 8.46 + 0.3745 * (YF - 0.6) + 0.496 * (y - YF);
  }
  function wingZ(y) { return 0.40 - ANHED * Math.abs(y); }

  function interp(rows, n) {                     /* n sub-steps between stations */
    var out = [], i, k, a, b, t, j;
    for (i = 0; i < rows.length - 1; i++) {
      a = rows[i]; b = rows[i + 1];
      for (k = 0; k < n; k++) {
        t = k / n; t = t * t * (3 - 2 * t);
        var r = [];
        for (j = 0; j < a.length; j++) r.push(a[j] + (b[j] - a[j]) * t);
        out.push(r);
      }
    }
    out.push(rows[rows.length - 1]);
    return out;
  }

  function loftRows(THREE, M, rows, segs, sub) {
    var secs = [], i, r, R = interp(rows, sub || 1);
    for (i = R.length - 1; i >= 0; i--) {
      r = R[i];
      secs.push({ x: X(r[0]), w: r[1], h: r[2], zc: r[3], sq: r[4] });
    }
    var geo = M.loft(THREE, secs, segs), a, k, t;
    /* M.loft winds its quads inward; flip them so the outside faces out */
    if (geo.index) {
      a = geo.index.array;
      for (k = 0; k < a.length; k += 3) { t = a[k + 1]; a[k + 1] = a[k + 2]; a[k + 2] = t; }
      geo.index.needsUpdate = true;
    } else {
      a = geo.attributes.position;
      for (k = 0; k < a.count; k += 3) {
        t = [a.getX(k + 1), a.getY(k + 1), a.getZ(k + 1)];
        a.setXYZ(k + 1, a.getX(k + 2), a.getY(k + 2), a.getZ(k + 2));
        a.setXYZ(k + 2, t[0], t[1], t[2]);
      }
    }
    geo.computeVertexNormals();
    return geo;
  }

  function box(THREE, mat, sx, sy, sz, px, py, pz) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(px, py, pz);
    return m;
  }

  /* a flat plate on the wing planform, sheared down by the anhedral */
  function wingPlate(THREE, M, pts, thick, zc) {
    var geo = M.slab(THREE, pts, thick);
    var p = geo.attributes.position, i, y;
    for (i = 0; i < p.count; i++) {
      y = p.getY(i);
      p.setZ(i, p.getZ(i) - thick / 2 + zc - ANHED * Math.abs(y) - 0.40 + 0.40);
    }
    p.needsUpdate = true;
    geo.computeVertexNormals();
    return new THREE.Mesh(geo);
  }

  /* one draw call per material: bake every mesh of a group into one geometry
     per material (the group's own transform is identity) */
  function mergeByMaterial(THREE, grp) {
    var buckets = [], meshes = [];
    grp.updateMatrixWorld(true);
    grp.traverse(function (o) { if (o.isMesh) meshes.push(o); });
    function bucketOf(mat) {
      var b = null, k;
      for (k = 0; k < buckets.length; k++) if (buckets[k].mat === mat) b = buckets[k];
      if (!b) { b = { mat: mat, pos: [], nor: [], uv: [], idx: [], n: 0 }; buckets.push(b); }
      return b;
    }
    meshes.forEach(function (o) {
      var geo = o.geometry.clone(), j, k, b;
      geo.applyMatrix4(o.matrixWorld);
      if (!geo.attributes.normal) geo.computeVertexNormals();
      if (o.material === SKIN) {                   /* camouflage up top, grey belly below */
        if (geo.index) geo = geo.toNonIndexed();
        var p = geo.attributes.position.array, nn = geo.attributes.normal.array, t;
        for (t = 0; t < p.length; t += 9) {
          var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
          var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
          var fx = uy * vz - uz * vy, fy = uz * vx - ux * vz, fz = ux * vy - uy * vx;
          var fl = Math.sqrt(fx * fx + fy * fy + fz * fz) || 1;
          fx /= fl; fy /= fl; fz /= fl;
          var band = fz > 0.5 ? 0 : fz < -0.5 ? 3 : (fy >= 0 ? 1 : 2);
          var endOn = Math.abs(fx) > Math.abs(fy) * 1.4;
          b = bucketOf(band === 3 ? BELLY : SKIN);
          for (k = 0; k < 3; k++) {
            var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, W;
            if (band === 0 || band === 3) { U = pxX(x); W = clamp((YMAX - y) * PXM, 2, TOPH - 2); }
            else { U = pxX(endOn ? x + y : x);
                   W = TOPH + (band - 1) * SIDEH + clamp((ZTOP - z) / ZSPAN * SIDEH, 2, SIDEH - 2); }
            b.pos.push(x, y, z);
            b.nor.push(nn[t + 3 * k], nn[t + 3 * k + 1], nn[t + 3 * k + 2]);
            b.uv.push(U / TW, 1 - W / TH);
            b.idx.push(b.n++);
          }
        }
        return;
      }
      b = bucketOf(o.material);
      var P = geo.attributes.position, N = geo.attributes.normal;
      for (j = 0; j < P.count; j++) {
        b.pos.push(P.getX(j), P.getY(j), P.getZ(j));
        b.nor.push(N.getX(j), N.getY(j), N.getZ(j));
        b.uv.push(0, 0);
      }
      if (geo.index) for (j = 0; j < geo.index.count; j++) b.idx.push(geo.index.getX(j) + b.n);
      else for (j = 0; j < P.count; j++) b.idx.push(j + b.n);
      b.n += P.count;
    });
    var out = new THREE.Group();
    buckets.forEach(function (b) {
      var bg = new THREE.BufferGeometry();
      bg.setAttribute("position", new THREE.Float32BufferAttribute(b.pos, 3));
      bg.setAttribute("normal", new THREE.Float32BufferAttribute(b.nor, 3));
      bg.setAttribute("uv", new THREE.Float32BufferAttribute(b.uv, 2));
      bg.setIndex(b.idx);
      out.add(new THREE.Mesh(bg, b.mat));
    });
    return out;
  }

  /* paint canvas: three bands stacked - top, port side, starboard side */
  var PXM = 40, XMIN = -7.2, TW = 590, YMAX = 6.0, ZTOP = 3.0, ZSPAN = 5.2;
  var TOPH = 480, SIDEH = 160, TH = TOPH + 2 * SIDEH;
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }
  function paint() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = 50507, i, j, b;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var blot = ["#47573a", "#2f4130"];
    g.fillStyle = "#8b7a52"; g.fillRect(0, 0, TW, TH);          /* FS 30219 tan */
    for (b = 0; b < 3; b++) {
      var y0 = b === 0 ? 0 : TOPH + (b - 1) * SIDEH, h = b === 0 ? TOPH : SIDEH;
      var n = b === 0 ? 36 : 14, fl = b === 0 ? 1 : 0.42;
      for (i = 0; i < n; i++) {
        g.fillStyle = blot[i % 2];                              /* FS 34102, 34079 */
        var cx = R() * TW, cy = y0 + R() * h;
        for (j = 0; j < 4; j++) {
          g.beginPath();
          g.ellipse(cx + (R() - 0.5) * 80, cy + (R() - 0.5) * 80 * fl,
                    24 + R() * 50, (14 + R() * 32) * fl, R() * 3.14, 0, 6.283);
          g.fill();
        }
      }
    }
    /* light grey (FS 36622) lower fuselage sides, below z = -0.30 */
    g.fillStyle = "#a9afb0";
    for (b = 1; b < 3; b++) {
      var zy = TOPH + (b - 1) * SIDEH + (ZTOP + 0.30) / ZSPAN * SIDEH;
      g.fillRect(0, zy, TW, TOPH + b * SIDEH - zy);
    }
    /* the detail pass: frames and longeron seams with a light lip and
       fastener rows, the wing spars, fold line and access panels, the gun
       bay and avionics doors, the big belly speed brake's outline seen on
       the sides, fuel caps, rain streaks, gun-gas and exhaust soot and the
       usual SEA-era grime (the A-7D photographs show a heavily weathered
       finish) */
    function sZ(z, b2) { return TOPH + (b2 - 1) * SIDEH + clamp((ZTOP - z) / ZSPAN * SIDEH, 0, SIDEH); }
    function tY(y) { return clamp((YMAX - y) * PXM, 2, TOPH - 2); }
    function seam(x0, y0, x1, y1) {
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1;
      g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.09)";
      g.beginPath(); g.moveTo(x0 + 1, y0 + 1); g.lineTo(x1 + 1, y1 + 1); g.stroke();
    }
    function rivets(x0, y0, x1, y1, n) {
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (var q = 0; q <= n; q++) g.fillRect(x0 + (x1 - x0) * q / n, y0 + (y1 - y0) * q / n, 1, 1);
    }
    var FR = [1.1, 2.0, 3.2, 4.6, 5.6, 6.5, 7.5, 8.5, 9.5, 10.5, 11.4, 12.2];
    for (b = 1; b < 3; b++) {
      seam(pxX(X(0.8)), sZ(0.35, b), pxX(X(13.2)), sZ(0.35, b));
      seam(pxX(X(1.5)), sZ(-0.30, b), pxX(X(12.8)), sZ(-0.30, b));
      rivets(pxX(X(0.9)), sZ(0.40, b), pxX(X(13.1)), sZ(0.40, b), 160);
      for (i = 0; i < FR.length; i++) {
        seam(pxX(X(FR[i])), sZ(0.80, b), pxX(X(FR[i])), sZ(-0.75, b));
        rivets(pxX(X(FR[i])) + 3, sZ(0.80, b), pxX(X(FR[i])) + 3, sZ(-0.75, b), 20);
      }
      g.strokeStyle = "rgba(0,0,0,0.34)";
      g.strokeRect(pxX(X(1.3)), sZ(0.25, b), 1.3 * PXM, 0.45 / ZSPAN * SIDEH);     /* avionics bay */
      g.strokeRect(pxX(X(5.9)), sZ(-0.45, b), 2.4 * PXM, 0.25 / ZSPAN * SIDEH);    /* speed brake edge */
      g.strokeRect(pxX(X(9.8)), sZ(0.30, b), 1.6 * PXM, 0.40 / ZSPAN * SIDEH);     /* engine access */
      for (i = 0; i < 26; i++) {
        var rx0 = R() * TW, ry0 = sZ(0.7 - R() * 1.2, b);
        var rg = g.createLinearGradient(0, ry0, 0, ry0 + 14 + R() * 18);
        rg.addColorStop(0, "rgba(30,28,24,0.14)"); rg.addColorStop(1, "rgba(30,28,24,0)");
        g.fillStyle = rg; g.fillRect(rx0, ry0, 1 + R() * 2, 32);
      }
    }
    /* gun gas behind the port muzzle, soot over the tail */
    var gg = g.createLinearGradient(pxX(X(1.2)), 0, pxX(X(3.4)), 0);
    gg.addColorStop(0, "rgba(20,18,16,0.45)"); gg.addColorStop(1, "rgba(20,18,16,0)");
    g.fillStyle = gg; g.fillRect(pxX(X(1.2)), sZ(0.05, 1), pxX(X(3.4)) - pxX(X(1.2)), 0.30 / ZSPAN * SIDEH);
    var sg2 = g.createLinearGradient(pxX(X(13.6)), 0, pxX(X(11.6)), 0);
    sg2.addColorStop(0, "rgba(20,18,16,0.40)"); sg2.addColorStop(1, "rgba(20,18,16,0)");
    g.fillStyle = sg2; g.fillRect(pxX(X(13.6)), 0, pxX(X(11.6)) - pxX(X(13.6)), TH);
    for (var sgn2 = -1; sgn2 <= 1; sgn2 += 2) {
      seam(pxX(X(leS(0.9) + 0.35)), tY(sgn2 * 0.9), pxX(X(leS(5.6) + 0.25)), tY(sgn2 * 5.6));
      seam(pxX(X(teS(0.9) - 0.75)), tY(sgn2 * 0.9), pxX(X(teS(5.6) - 0.55)), tY(sgn2 * 5.6));
      rivets(pxX(X(leS(0.9) + 0.40)), tY(sgn2 * 0.9), pxX(X(leS(5.6) + 0.30)), tY(sgn2 * 5.6), 70);
      rivets(pxX(X(teS(0.9) - 0.80)), tY(sgn2 * 0.9), pxX(X(teS(5.6) - 0.60)), tY(sgn2 * 5.6), 70);
      for (i = 0; i < 4; i++) {
        var yy = 1.2 + i * 1.1;
        g.strokeStyle = "rgba(0,0,0,0.24)";
        g.strokeRect(pxX(X((leS(yy) + teS(yy)) / 2)), tY(sgn2 * yy) - 5, 0.40 * PXM, 10);
      }
      g.fillStyle = "rgba(0,0,0,0.35)"; g.fillRect(pxX(X(7.6)), tY(sgn2 * 2.0) - 3, 6, 6);
    }
    seam(pxX(X(4.8)), tY(0), pxX(X(13.0)), tY(0));
    for (i = 0; i < 70; i++) {
      g.fillStyle = "rgba(24,22,20," + (0.03 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 50, 2 + R() * 7);
    }
    return cv;
  }
  var _tex;
  function skinTexture(THREE) {
    if (_tex !== undefined) return _tex;
    _tex = false;
    try {
      _tex = new THREE.CanvasTexture(paint());
      _tex.wrapS = _tex.wrapT = THREE.ClampToEdgeWrapping;
      _tex.anisotropy = 4;
      if (THREE.sRGBEncoding !== undefined) _tex.encoding = THREE.sRGBEncoding;
    } catch (e) { _tex = false; }
    return _tex;
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var tex = skinTexture(THREE);
    var skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.06,
                                                side: THREE.DoubleSide });
    if (tex) skin.map = tex; else skin.color.setHex(0x6a6a45);
    var belly = new THREE.MeshStandardMaterial({ color: 0xa9afb0, roughness: 0.86, metalness: 0.06,
                                                 side: THREE.DoubleSide });
    BELLY = belly; SKIN = skin;
    var team = new THREE.MeshStandardMaterial({
      color: new THREE.Color((C && C.team !== undefined) ? C.team : "#3f7fd0"),
      roughness: 0.60, metalness: 0.12,
      emissive: new THREE.Color((C && C.team !== undefined) ? C.team : "#3f7fd0"),
      emissiveIntensity: 0.10 });
    var metal = new THREE.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60,
                                                side: THREE.DoubleSide });
    var hot = new THREE.MeshStandardMaterial({ color: 0x45484a, roughness: 0.55, metalness: 0.50,
                                               side: THREE.DoubleSide });
    var ink = new THREE.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03,
                                               side: THREE.DoubleSide });
    var tyre = new THREE.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    var glass = new THREE.MeshStandardMaterial({ color: 0x4a5a58, roughness: 0.12, metalness: 0.55,
                                                 transparent: true, opacity: 0.80, side: THREE.DoubleSide });
    var sgn, m, i;

    /* ------------------------------------------------------------ fuselage */
    /* short blunt radome nose, deep cockpit and spine hump, a barrel that
       narrows to the nozzle at s = 13.2 */
    var BODY = [
      /*  s     w     h     zc    sq */
      [ 0.00, 0.020, 0.020, -0.15, 1.10],
      [ 0.45, 0.300, 0.280, -0.13, 1.08],
      [ 1.10, 0.540, 0.520, -0.09, 1.04],
      [ 2.00, 0.680, 0.650, -0.04, 1.00],
      [ 3.20, 0.730, 0.760,  0.00, 0.96],
      [ 4.60, 0.770, 0.830,  0.02, 0.92],
      [ 6.50, 0.790, 0.810,  0.00, 0.90],
      [ 8.50, 0.750, 0.730,  0.00, 0.92],
      [10.50, 0.670, 0.610,  0.00, 0.96],
      [12.20, 0.570, 0.510,  0.02, 1.00],
      [13.25, 0.520, 0.470,  0.04, 1.00],
    ];
    g.add(new THREE.Mesh(loftRows(THREE, M, BODY, 44, 3), skin));

    /* chin intake: an open oval mouth under the nose, the duct running back
       under the fuselage */
    var CHIN = [
      [3.25, 0.530, 0.400, -0.58, 1.00],
      [3.80, 0.570, 0.440, -0.56, 1.00],
      [5.00, 0.600, 0.450, -0.48, 1.00],
      [6.60, 0.520, 0.380, -0.38, 1.00],
      [7.60, 0.300, 0.200, -0.25, 1.00],
    ];
    g.add(new THREE.Mesh(loftRows(THREE, M, CHIN, 36, 2), skin));
    var thr = new THREE.CylinderGeometry(1, 1, 0.10, 28);
    thr.rotateZ(Math.PI / 2); thr.scale(1, 0.50, 0.37);
    m = new THREE.Mesh(thr, ink); m.position.set(X(4.30), 0, -0.56); g.add(m);
    /* splitter lip ring just inside the mouth, a lighter rim */
    var lip = new THREE.TorusGeometry(1, 0.06, 8, 36);
    lip.rotateY(Math.PI / 2); lip.scale(1, 0.55, 0.43);
    m = new THREE.Mesh(lip, metal); m.position.set(X(3.27), 0, -0.58); g.add(m);

    /* exhaust: the nozzle barrel and the dark bore */
    var noz = new THREE.CylinderGeometry(0.50, 0.46, 0.62, 24, 1, true);
    noz.rotateZ(Math.PI / 2);
    m = new THREE.Mesh(noz, hot); m.position.set(X(13.40), 0, 0.04); g.add(m);
    var bore = new THREE.CylinderGeometry(0.44, 0.44, 0.04, 24);
    bore.rotateZ(Math.PI / 2);
    m = new THREE.Mesh(bore, ink); m.position.set(X(13.12), 0, 0.04); g.add(m);
    var seg = 12;
    for (i = 0; i < seg; i++) {                       /* nozzle flap fingers */
      var an = i / seg * Math.PI * 2;
      m = box(THREE, hot, 0.36, 0.05, 0.14, X(13.58),
              Math.cos(an) * 0.49, 0.04 + Math.sin(an) * 0.49);
      m.rotation.x = an + Math.PI / 2; g.add(m);
    }

    /* ------------------------------------------------------------ cockpit */
    var CAN = [
      [1.90, 0.080, 0.050, 0.64, 1.00],
      [2.40, 0.340, 0.280, 0.70, 1.00],
      [3.20, 0.440, 0.420, 0.76, 1.00],
      [4.00, 0.400, 0.360, 0.74, 1.00],
      [4.75, 0.150, 0.120, 0.68, 1.00],
    ];
    g.add(new THREE.Mesh(loftRows(THREE, M, CAN, 20, 2), glass));
    g.add(box(THREE, ink, 0.62, 0.60, 0.10, X(2.10), 0, 0.70));          /* glare shield and HUD */
    g.add(box(THREE, ink, 0.36, 0.34, 0.50, X(3.50), 0, 0.62));          /* seat and headrest */
    g.add(box(THREE, metal, 0.12, 0.74, 0.07, X(2.45), 0, 0.98));        /* windscreen arch */
    g.add(box(THREE, metal, 0.12, 0.84, 0.07, X(4.30), 0, 0.92));        /* canopy rear bow */
    g.add(box(THREE, metal, 1.80, 0.07, 0.07, X(3.40), 0, 1.15));        /* canopy centre rail */

    /* M61A1 Vulcan, port forward fuselage: fairing and the muzzle opening */
    g.add(box(THREE, skin, 1.30, 0.20, 0.32, X(1.85), 0.54, -0.10));
    m = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.12, 12), ink);
    m.rotation.z = Math.PI / 2; m.position.set(X(1.19), 0.54, -0.10); g.add(m);

    /* antennas and the land-field arrestor hook */
    g.add(box(THREE, ink, 0.30, 0.04, 0.30, X(7.60), 0, 0.97));
    g.add(box(THREE, ink, 0.26, 0.04, 0.26, X(5.60), 0, -0.34 - 0.55));
    g.add(box(THREE, metal, 1.30, 0.10, 0.10, X(12.70), 0, -0.44));

    /* ------------------------------------------------------------- wing */
    var WING = [], y0 = 0.40, yK = YF, yT = 5.83;
    function plan(ya, yb) {
      var p = [[X(leS(ya)), ya]];
      p.push([X(leS(yb)), yb]);
      p.push([X(teS(yb)), yb]);
      p.push([X(teS(ya)), ya]);
      return p;
    }
    var outer = plan(yK, yT), inner = plan(y0, yK);
    for (sgn = -1; sgn <= 1; sgn += 2) {
      var op = outer.map(function (q) { return [q[0], sgn * q[1]]; });
      var ip = inner.map(function (q) { return [q[0], sgn * q[1]]; });
      m = wingPlate(THREE, M, op, 0.14, 0.40); m.material = skin; g.add(m);
      m = wingPlate(THREE, M, ip, 0.38, 0.40); m.material = skin; g.add(m);
      /* ailerons and flaps: dark hinge lines on the trailing edge */
      m = box(THREE, ink, 0.05, 2.30, 0.03, X(teS(4.6) - 0.50), sgn * 4.55, wingZ(4.55) + 0.075);
      m.rotation.x = -sgn * ANHED; g.add(m);
      m = box(THREE, ink, 0.05, 2.30, 0.03, X(teS(1.7) - 0.60), sgn * 1.75, wingZ(1.75) + 0.20);
      m.rotation.x = -sgn * ANHED; g.add(m);
      /* the wing-fold line */
      m = box(THREE, ink, 1.30, 0.04, 0.03, X((leS(YF) + teS(YF)) / 2 - 0.12), sgn * YF, wingZ(YF) + 0.075);
      m.rotation.x = -sgn * ANHED; g.add(m);
      /* team flash on the outer wing, upper surface */
      m = box(THREE, team, 1.15, 1.10, 0.05, X((leS(4.5) + teS(4.5)) / 2), sgn * 4.45, wingZ(4.45) + 0.115);
      m.rotation.x = -sgn * ANHED; g.add(m);
      /* and underneath */
      m = box(THREE, team, 1.15, 1.10, 0.05, X((leS(4.5) + teS(4.5)) / 2), sgn * 4.45, wingZ(4.45) - 0.115);
      m.rotation.x = -sgn * ANHED; g.add(m);
    }

    /* six wing pylons: three a side, an ejector rack under each */
    var PY = [1.67, 2.54, 3.70];
    for (sgn = -1; sgn <= 1; sgn += 2) {
      for (i = 0; i < PY.length; i++) {
        var py = PY[i], sc = leS(py) + 0.40 * (teS(py) - leS(py));
        var wb = wingZ(py) - (py < yK ? 0.19 : 0.07);
        var pp = [[X(sc - 0.85), wb + 0.03], [X(sc + 0.80), wb + 0.03],
                  [X(sc + 0.60), wb - 0.44], [X(sc - 0.45), wb - 0.44]];
        m = new THREE.Mesh(M.slab(THREE, pp, 0.10, "xz"), metal);
        m.position.y = sgn * py + 0.05; g.add(m);
        g.add(box(THREE, ink, 0.80, 0.16, 0.10, X(sc - 0.05), sgn * py, wb - 0.49));
      }
    }

    /* ---------------------------------------------------------- empennage */
    var FIN = [[X(10.50), 0.45], [X(12.45), 2.67], [X(13.95), 2.67], [X(13.40), 0.45]];
    m = new THREE.Mesh(M.slab(THREE, FIN, 0.14, "xz"), skin);
    m.position.y = 0.07; g.add(m);
    /* fin cap antenna and the team band */
    g.add(box(THREE, ink, 0.50, 0.10, 0.12, X(13.35), 0, 2.69));
    g.add(box(THREE, team, 1.30, 0.20, 0.45, X(12.85), 0, 2.00));
    g.add(box(THREE, skin, 1.10, 0.18, 0.12, X(11.40), 0, 0.50));           /* dorsal fillet */

    /* all-moving tailplane, low on the aft fuselage, with its pivot fairing */
    var ST = [[X(11.45), 0.45], [X(13.55), 2.60], [X(13.97), 2.60], [X(13.20), 0.45]];
    for (sgn = -1; sgn <= 1; sgn += 2) {
      var sp = ST.map(function (q) { return [q[0], sgn * q[1]]; });
      m = new THREE.Mesh(M.slab(THREE, sp, 0.12), skin);
      m.position.z = -0.12; g.add(m);
      g.add(box(THREE, skin, 0.90, 0.30, 0.22, X(13.30), sgn * 0.52, -0.06));
      m = box(THREE, team, 0.62, 0.80, 0.04, X(13.26), sgn * 1.70, -0.01);
      g.add(m);
    }
    g.add(box(THREE, team, 0.80, 0.30, 0.04, X(8.20), 0, 0.84));              /* spine flash */

    /* ------------------------------------------------- the detail pass */
    /* fittings the A-7D photographs show and the first pass left out: the
       canopy sill rails and the mirror on the arch, the compressor face down
       the intake duct, a blade aerial under the belly and one aft, the red
       anti-collision beacons above and below, the wingtip position lights
       (port red), the white tail light on the rudder, static dischargers on
       the wing tips and tailplane tips, the jet pipe's flameholder ring and
       turbine cone, the pylons' sway braces. Places and sizes NOT measured. */
    var lampR = new THREE.MeshStandardMaterial({ color: 0xc8261e, roughness: 0.3, metalness: 0.1,
                                                  emissive: 0x8a1410, emissiveIntensity: 0.6 });
    var lampG = new THREE.MeshStandardMaterial({ color: 0x1fa64a, roughness: 0.3, metalness: 0.1,
                                                  emissive: 0x0e6a2c, emissiveIntensity: 0.6 });
    function lamp(mat, r, px, py, pz) {
      var lg2 = new THREE.OctahedronGeometry(r, 1); lg2.scale(1.6, 1, 0.8);
      var lm2 = new THREE.Mesh(lg2, mat); lm2.position.set(px, py, pz); return lm2;
    }
    function rod(mat, p, q, r) {
      var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var rg2 = new THREE.CylinderGeometry(r, r, L, 5, 1, false);
      rg2.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L)));
      rg2.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
      return new THREE.Mesh(rg2, mat);
    }
    for (sgn = -1; sgn <= 1; sgn += 2) {
      g.add(rod(metal, [X(2.45), sgn * 0.42, 0.66], [X(4.30), sgn * 0.40, 0.66], 0.016));
      g.add(lamp(sgn > 0 ? lampR : lampG, 0.045, X(9.75), sgn * 5.76, wingZ(5.76)));
      for (i = 0; i < 2; i++) {
        var dy2 = 5.2 + i * 0.4;
        g.add(rod(ink, [X(teS(dy2) - 0.05), sgn * dy2, wingZ(dy2)], [X(teS(dy2) + 0.12), sgn * dy2, wingZ(dy2)], 0.007));
      }
      g.add(rod(ink, [X(13.90), sgn * 2.50, -0.12], [X(14.03), sgn * 2.50, -0.12], 0.007));
      for (i = 0; i < PY.length; i++) {
        var pyb = PY[i], scb = leS(pyb) + 0.40 * (teS(pyb) - leS(pyb)), wbb = wingZ(pyb) - (pyb < yK ? 0.19 : 0.07);
        g.add(rod(metal, [X(scb - 0.30), sgn * (pyb + 0.10), wbb - 0.46], [X(scb - 0.30), sgn * (pyb + 0.10), wbb - 0.56], 0.012));
        g.add(rod(metal, [X(scb + 0.20), sgn * (pyb + 0.10), wbb - 0.46], [X(scb + 0.20), sgn * (pyb + 0.10), wbb - 0.56], 0.012));
      }
    }
    g.add(box(THREE, metal, 0.03, 0.10, 0.05, X(2.50), 0, 1.03));            /* mirror */
    var cf = new THREE.CylinderGeometry(0.34, 0.34, 0.02, 20); cf.rotateZ(Math.PI / 2); cf.scale(1, 1.2, 0.85);
    m = new THREE.Mesh(cf, metal); m.position.set(X(5.4), 0, -0.48); g.add(m);
    var blade = function (s0, s1, zb, h) {
      var bp = [[X(s0), zb], [X(s1), zb], [X(s1 + 0.12), zb + h], [X(s0 + 0.06), zb + h]];
      var bm = new THREE.Mesh(M.slab(THREE, bp, 0.025, "xz"), ink); bm.position.y = 0.0125; return bm;
    };
    g.add(blade(10.0, 10.25, -0.60, -0.18));
    g.add(blade(3.0, 3.22, -0.86, -0.14));
    g.add(lamp(lampR, 0.05, X(9.3), 0, 0.69));
    g.add(lamp(lampR, 0.05, X(9.6), 0, -0.66));
    g.add(lamp(glass, 0.035, X(13.85), 0, 2.40));
    var fh = new THREE.TorusGeometry(0.30, 0.02, 4, 20); fh.rotateY(Math.PI / 2);
    m = new THREE.Mesh(fh, metal); m.position.set(X(13.28), 0, 0.04); g.add(m);
    var tc2 = new THREE.CylinderGeometry(0.03, 0.16, 0.30, 14); tc2.rotateZ(Math.PI / 2);
    m = new THREE.Mesh(tc2, metal); m.position.set(X(13.0), 0, 0.04); g.add(m);
    /* ---------------------------------------------------------------- gear */
    var gear = new THREE.Group();
    function wheel(px, py, hubZ, r, w) {
      var wg = new THREE.CylinderGeometry(r, r, w, 18);
      var wm = new THREE.Mesh(wg, tyre); wm.position.set(px, py, hubZ); gear.add(wm);
      var hg = new THREE.CylinderGeometry(r * 0.55, r * 0.55, w + 0.02, 12);
      var hm = new THREE.Mesh(hg, metal); hm.position.set(px, py, hubZ); gear.add(hm);
    }
    function leg(px, py, topZ, botZ, rad) {
      var lg = new THREE.CylinderGeometry(rad, rad * 1.15, topZ - botZ, 10);
      var lm = new THREE.Mesh(lg, metal);
      lm.position.set(px, py, (topZ + botZ) / 2); gear.add(lm);
    }
    /* nose leg under the intake duct, twin wheels */
    leg(X(4.90), 0, -0.80, -1.90, 0.09);
    wheel(X(4.90), 0.14, GROUND + 0.27, 0.27, 0.16);
    wheel(X(4.90), -0.14, GROUND + 0.27, 0.27, 0.16);
    g.add(box(THREE, ink, 0.70, 0.46, 0.05, X(4.40), 0, -0.99));             /* nose-gear door */
    /* main legs out of the wing roots */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      leg(X(8.20), sgn * 1.50, 0.05, -1.80, 0.11);
      wheel(X(8.20), sgn * 1.50, GROUND + 0.35, 0.35, 0.28);
      m = box(THREE, metal, 0.05, 0.05, 0.62, X(8.00), sgn * 1.50, -0.85);
      m.rotation.y = 0.40; gear.add(m);                                       /* drag brace */
      m = box(THREE, skin, 0.40, 0.04, 0.80, X(8.20), sgn * 1.64, -0.95);
      gear.add(m);                                                            /* leg door */
    }
    /* the detail pass: oleo collars, torque links, brake lines, hub caps,
       the nose leg's taxi lamp */
    var nlx = X(4.90);
    m = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.06, 12), metal); m.rotation.x = Math.PI / 2;
    m.position.set(nlx, 0, -1.30); gear.add(m);
    gear.add(rod(metal, [nlx + 0.06, 0, -1.62], [nlx + 0.20, 0, -1.48], 0.016));
    gear.add(rod(metal, [nlx + 0.20, 0, -1.48], [nlx + 0.08, 0, -1.34], 0.016));
    gear.add(box(THREE, metal, 0.10, 0.16, 0.10, nlx + 0.12, 0, -1.05));
    for (sgn = -1; sgn <= 1; sgn += 2) {
      var hc = new THREE.CylinderGeometry(0.10, 0.10, 0.18, 10);
      m = new THREE.Mesh(hc, ink); m.position.set(nlx, sgn * 0.14, GROUND + 0.27); gear.add(m);
      var mlx = X(8.20);
      m = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.06, 12), metal); m.rotation.x = Math.PI / 2;
      m.position.set(mlx, sgn * 1.50, -0.95); gear.add(m);
      gear.add(rod(metal, [mlx + 0.08, sgn * 1.50, -1.38], [mlx + 0.26, sgn * 1.50, -1.18], 0.02));
      gear.add(rod(metal, [mlx + 0.26, sgn * 1.50, -1.18], [mlx + 0.10, sgn * 1.50, -0.98], 0.02));
      gear.add(rod(ink, [mlx - 0.10, sgn * 1.42, 0.0], [mlx - 0.12, sgn * 1.42, -1.42], 0.010));
      m = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.31, 10), ink);
      m.position.set(mlx, sgn * 1.50, GROUND + 0.35); gear.add(m);
    }
    var root = mergeByMaterial(THREE, g);
    var gm = mergeByMaterial(THREE, gear);
    gm.name = "gear";
    root.add(gm);
    return root;
  }

  UNIT_MODELS["nato_e60_cas"] = { len: 14.06, build: build };
})();
