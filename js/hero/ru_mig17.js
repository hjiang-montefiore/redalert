/* ============================================================================
   ru_mig17.js  --  HERO model: MiG-17F "Fresco-C" (pact_e50_fighter)
   ----------------------------------------------------------------------------
   Resting on (fetched, cached; none of this is from memory alone):
     * Three-view silhouette "Mikoyan-Gurevich MiG-17F three-view silhouette"
       (Wikimedia Commons, public domain). Measured from its pixels with the
       9.63 m span as the scale: the wing planform (leading edge 47-48 deg to a
       kink at 2.6 m from the axis, 45 deg outboard; trailing edge straight at
       the root, then swept back about 39 deg; rounded tip), wing root at 1.9 m
       behind the nose, fence tops at 1.3 / 2.7 / 3.4 m (front view), canopy
       from 2.65 to 4.3 m ahead of the axis, the fin's profile, the tailplane
       set high on the fin (front view), the nozzle exit under the tail root,
       the fuselage depth (1.4 m) and width (1.3 m), and the vertical intake
       splitter (front view).
     * Photograph "MiG-17 at Central Air Force Museum Monino pic1" (Soviet air
       force airframe): bare natural-metal finish, a SINGLE small red star on
       the fin, the cannon pack under the nose, the tailplane on the fin.
     * Photographs "MiG-17F Fresco C Below Nose" (Commons, CFM) and "MiG-17F
       Fresco Nose-On" (Commons, NMUSAF): round intake lip, pitot probe on the
       top of the lip, and the gun layout under the nose: one large barrel to
       starboard (N-37D), a pair of small barrels to port (2 x NR-23).
     * Photograph "MiG-17F Fresco C, Czech air force 0872 pic1": the unpainted
       metal, the cannon pack, the main gear leg and wheel.
   Published figures used: length 11.36 m with probe, span 9.63 m, height
   about 3.8 m, wing sweep about 45 degrees, anhedral about 3 degrees.
   (air_specs.js: len 11.3, span 9.6, sweep 45, dihedral -3.)

   What is NOT confirmed and is therefore only approximated: the exact fence
   stations (the top-view lines and the front-view ticks differ a little), the
   exact barrel positions, the cannon-pack outline, and the splitter depth.
   No drop tanks (the row lists none), no airbrakes drawn open, no bort number
   (forbidden by the brief). The star is drawn on the fin only, where the
   Monino photograph places it.

   Model space: +X nose, +Y port, +Z up, metres. Geometry is merged per
   material at the end so the draw-call count stays small; "gear" is a group.
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMiG17 = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var _skinTex = null, _panelTex = null, _starTex = null;

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function tex(THREE, cv, repeat) {
    var t = new THREE.CanvasTexture(cv);
    if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }

  /* natural-metal sheet: pale aluminium, panel seams, rivets, soot */
  function paintMetal(g, W, H, R, fuselage) {
    var i, x, y;
    g.fillStyle = "#b7babb"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 26; i++) {
      g.globalAlpha = 0.10 + R() * 0.10;
      g.fillStyle = (i & 1) ? "#8f9496" : "#d2d4d3";
      g.beginPath();
      g.ellipse(R() * W, R() * H, 40 + R() * 120, 14 + R() * 40, R() * 3.14, 0, 6.29);
      g.fill();
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(40,42,44,0.34)"; g.lineWidth = 1.5;
    x = 0;
    while (x < W) { x += 26 + R() * 70; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    g.strokeStyle = "rgba(40,42,44,0.22)"; g.lineWidth = 1.2;
    y = 0;
    while (y < H) { y += 44 + R() * 80; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    g.fillStyle = "rgba(30,30,30,0.24)";
    for (i = 0; i < 40; i++) {
      var ry = R() * H, rx = R() * W * 0.7, n = 14 + ((R() * 36) | 0);
      for (var k = 0; k < n; k++) g.fillRect(rx + k * 6.5, ry, 1.6, 1.6);
    }
    if (fuselage) {
      /* u = nose(0) -> tail(1); belly at canvas y = H*0.25 */
      var sg = g.createLinearGradient(0, 0, 0, H);
      sg.addColorStop(0.0, "rgba(40,36,30,0)");
      sg.addColorStop(0.12, "rgba(40,36,30,0.30)");
      sg.addColorStop(0.28, "rgba(40,36,30,0.30)");
      sg.addColorStop(0.42, "rgba(40,36,30,0)");
      g.fillStyle = sg; g.fillRect(W * 0.08, 0, W * 0.34, H);   /* gun-gas soot under the nose */
      var eg = g.createLinearGradient(W, 0, W * 0.80, 0);
      eg.addColorStop(0, "rgba(34,30,26,0.55)"); eg.addColorStop(1, "rgba(34,30,26,0)");
      g.fillStyle = eg; g.fillRect(W * 0.80, 0, W * 0.20, H);   /* exhaust staining */
    }
  }
  function skinTexture(THREE) {
    if (_skinTex === null) {
      try {
        var cv = document.createElement("canvas"); cv.width = 1024; cv.height = 512;
        paintMetal(cv.getContext("2d"), 1024, 512, rngFor(170517), true);
        _skinTex = tex(THREE, cv, false);
      } catch (e) { _skinTex = false; }
    }
    return _skinTex;
  }
  function panelTexture(THREE) {
    if (_panelTex === null) {
      try {
        var cv = document.createElement("canvas"); cv.width = 512; cv.height = 512;
        paintMetal(cv.getContext("2d"), 512, 512, rngFor(53017), false);
        _panelTex = tex(THREE, cv, true);
        _panelTex.repeat.set(0.25, 0.25);
      } catch (e) { _panelTex = false; }
    }
    return _panelTex;
  }
  /* the Soviet star as pact_hind_mi24.js draws it: red, white border, thin red edge */
  function starTexture(THREE) {
    if (_starTex === null) {
      try {
        var cv = document.createElement("canvas"); cv.width = 128; cv.height = 128;
        var g = cv.getContext("2d"), cx = 64, cy = 64, r = 50;
        var path = function (k) {
          g.beginPath();
          for (var i = 0; i < 10; i++) {
            var a = -Math.PI / 2 + i * Math.PI / 5, q = (i & 1) ? 0.40 : 1;
            var x = cx + Math.cos(a) * q * r * k, y = cy + Math.sin(a) * q * r * k;
            if (i) g.lineTo(x, y); else g.moveTo(x, y);
          }
          g.closePath();
        };
        g.fillStyle = "#a8261f"; path(1.24); g.fill();
        g.fillStyle = "#e2e0d8"; path(1.12); g.fill();
        g.fillStyle = "#b22a22"; path(1.0); g.fill();
        _starTex = tex(THREE, cv, false);
      } catch (e) { _starTex = false; }
    }
    return _starTex;
  }

  /* ------------------------------------------------------------ materials */
  function skinMat(THREE) {
    var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.78, metalness: 0.10 });
    var t = skinTexture(THREE); if (t) m.map = t; else m.color.setHex(0xb7babb);
    return m;
  }
  function panelMat(THREE) {
    var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.78, metalness: 0.10 });
    var t = panelTexture(THREE); if (t) m.map = t; else m.color.setHex(0xb7babb);
    return m;
  }
  /* double-sided only where an open pipe is seen from inside (intake bore, jet pipe) */
  function metalMat(THREE, col, r, mt, dbl) {
    return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: mt, side: dbl ? THREE.DoubleSide : THREE.FrontSide });
  }
  function glassMat(THREE) {
    return new THREE.MeshPhysicalMaterial({
      color: 0x4e7f95, roughness: 0.11, metalness: 0.0, transparent: true, opacity: 0.80,
      clearcoat: 0.8, clearcoatRoughness: 0.10, side: THREE.DoubleSide });
  }
  function starMat(THREE) {
    var m = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.8, metalness: 0.0, transparent: true, side: THREE.DoubleSide,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2, depthWrite: false });
    var t = starTexture(THREE); if (t) m.map = t; else m.color.setHex(0xa8261f);
    return m;
  }

  /* -------------------------------------------------------------- helpers */
  function sec(x, w, h, zc, sq) { return { x: x, w: w, h: h, zc: zc || 0, sq: sq === undefined ? 1 : sq }; }
  function body(THREE, M, tbl, segs, mat) { return new THREE.Mesh(M.loft(THREE, tbl, segs), mat); }
  function box(THREE, sx, sy, sz, px, py, pz, mat) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat); b.position.set(px, py, pz); return b;
  }
  /* cylinder along X (a barrel, a pipe) */
  function xcyl(THREE, r0, r1, len, cx, cy, cz, seg, open, mat) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, len, seg, 1, !!open), mat);
    c.rotation.z = Math.PI / 2; c.position.set(cx, cy, cz); return c;
  }
  /* a cylinder between two points (a gear leg) */
  function strut(THREE, r, a, b, mat) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, d.length(), 10), mat);
    m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    return m;
  }
  /* merge every mesh under a group, per material, into one mesh each */
  function mergeGroup(THREE, grp) {
    grp.updateMatrixWorld(true);
    var by = {}, order = [];
    grp.traverse(function (o) {
      if (!o.isMesh) return;
      var gm = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      gm.applyMatrix4(o.matrixWorld);
      var id = o.material.uuid;
      if (!by[id]) { by[id] = { mat: o.material, p: [], n: [], u: [] }; order.push(id); }
      var p = gm.attributes.position.array, n = gm.attributes.normal ? gm.attributes.normal.array : null;
      var u = gm.attributes.uv ? gm.attributes.uv.array : null, i;
      for (i = 0; i < p.length; i++) by[id].p.push(p[i]);
      for (i = 0; i < p.length; i++) by[id].n.push(n ? n[i] : 0);
      for (i = 0; i < p.length / 3 * 2; i++) by[id].u.push(u ? u[i] : 0);
    });
    var out = new THREE.Group();
    out.name = grp.name;
    for (var k = 0; k < order.length; k++) {
      var e = by[order[k]], bg = new THREE.BufferGeometry();
      bg.setAttribute("position", new THREE.Float32BufferAttribute(e.p, 3));
      bg.setAttribute("normal", new THREE.Float32BufferAttribute(e.n, 3));
      bg.setAttribute("uv", new THREE.Float32BufferAttribute(e.u, 2));
      out.add(new THREE.Mesh(bg, e.mat));
    }
    return out;
  }
  /* a lifting surface outline for one side, mirrored for s = -1 */
  function side(pts, s) {
    var q = [], i;
    for (i = 0; i < pts.length; i++) q.push([pts[i][0], pts[i][1] * s]);
    return q;
  }

  /* --------------------------------------------------------------- build */
  var WZ = -0.06;          /* wing centre height on the fuselage axis          */
  var WT = 0.09;           /* nominal slab depth                               */
  var ANH = 3;             /* anhedral, degrees                                */
  /* planform read off the three-view (top view, scale from the 9.63 m span):
     leading edge 47-48 deg inboard to a kink at y 2.6 m, 45 deg outboard;
     short straight trailing edge at the root, then swept back about 39 deg;
     rounded tip. Points are [x, y] of the port wing. */
  var WING = [[4.08, 0.45], [1.67, 2.60], [-0.28, 4.55], [-0.62, 4.74], [-0.95, 4.82], [-1.40, 4.82],
              [-1.80, 4.72], [-2.00, 4.42], [0.07, 1.77], [0.40, 1.27], [0.40, 0.45]];
  function xLE(y) { return y < 2.6 ? 3.70 - 1.10 * (y - 0.76) : 1.67 - (y - 2.6); }
  function xTE(y) { return y < 1.27 ? 0.40 : 0.07 - 0.815 * (y - 1.77); }

  function build(THREE, M, C) {
    var root = new THREE.Group();
    root.name = "mig17";
    var g = new THREE.Group();

    var skin  = skinMat(THREE);
    var panel = panelMat(THREE);
    var steel = metalMat(THREE, 0x6e757a, 0.50, 0.55);
    var dark  = metalMat(THREE, 0x1b1d20, 0.65, 0.35, true);
    var burnt = metalMat(THREE, 0x4a4540, 0.55, 0.55, true);
    var rubber = metalMat(THREE, 0x131416, 0.95, 0.04);
    var team  = metalMat(THREE, C && C.team !== undefined ? C.team : 0xd03f3f, 0.55, 0.40);
    var glass = glassMat(THREE);
    var star  = starMat(THREE);

    /* ---- fuselage: deep body (1.4 m, top flat from the canopy to the fin
       root), intake at the front, ending in the VK-1F nozzle at x -3.75 */
    g.add(body(THREE, M, [
      sec( 5.45, 0.520, 0.460,  0.01),
      sec( 5.30, 0.535, 0.520,  0.00),
      sec( 5.00, 0.590, 0.600,  0.00),
      sec( 4.50, 0.635, 0.650,  0.00),
      sec( 3.80, 0.660, 0.690,  0.00),
      sec( 2.40, 0.660, 0.700,  0.00),
      sec( 0.00, 0.650, 0.700,  0.00),
      sec(-1.20, 0.610, 0.690,  0.00),
      sec(-2.10, 0.570, 0.640,  0.00),
      sec(-2.90, 0.530, 0.560, -0.02),
      sec(-3.45, 0.420, 0.440,  0.00),
    ], 80, skin));
    /* intake lip, bore and back wall and a thin vertical splitter (the three-view's front view shows it; one nose-on photograph shows a centre line) */
    var lip = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.035, 14, 72), skin);
    lip.rotation.y = Math.PI / 2; lip.position.set(5.44, 0, 0.01); lip.scale.set(1, 0.93, 1); g.add(lip);
    var face = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.52, 56), skin);   /* closes the front of the shell around the bore */
    face.rotation.y = Math.PI / 2; face.position.set(5.452, 0, 0.01); face.scale.set(1, 0.9, 1); g.add(face);
    g.add(xcyl(THREE, 0.43, 0.43, 0.95, 4.98, 0, 0.0, 48, true, dark));
    g.add(xcyl(THREE, 0.43, 0.43, 0.02, 4.52, 0, 0.0, 48, false, dark));
    g.add(box(THREE, 0.55, 0.03, 0.80, 4.85, 0, 0.0, steel));
    /* pitot probe on the top of the intake lip (both nose-on photographs), tip at the overall length */
    g.add(xcyl(THREE, 0.014, 0.008, 0.45, 5.50, 0, 0.47, 8, false, steel));

    /* ---- canopy: windscreen forward, sliding hood behind (x 4.3 to 2.65 from the side view) */
    g.add(body(THREE, M, [
      sec( 4.30, 0.04, 0.02, 0.66, 1.2),
      sec( 4.10, 0.30, 0.18, 0.74, 1.2),
      sec( 3.65, 0.37, 0.30, 0.76, 1.2),
      sec( 3.20, 0.36, 0.34, 0.76, 1.2),
      sec( 2.85, 0.30, 0.26, 0.74, 1.2),
      sec( 2.65, 0.08, 0.06, 0.70, 1.2),
    ], 32, glass));
    g.add(box(THREE, 0.05, 0.64, 0.05, 4.12, 0, 0.88, dark));            /* windscreen bow */

    /* ---- the cannon pack under the nose. Nose-on photograph (NMUSAF Fresco): one large
       barrel to starboard (N-37D), a pair of small barrels to port (2 x NR-23) */
    g.add(body(THREE, M, [
      sec( 4.78, 0.04, 0.03, -0.69, 0.8),
      sec( 4.70, 0.18, 0.09, -0.69, 0.8),
      sec( 4.30, 0.27, 0.14, -0.72, 0.8),
      sec( 3.00, 0.30, 0.15, -0.72, 0.8),
      sec( 1.80, 0.26, 0.12, -0.70, 0.8),
      sec( 1.50, 0.08, 0.04, -0.66, 0.8),
      sec( 1.40, 0.03, 0.02, -0.65, 0.8),
    ], 28, skin));
    g.add(xcyl(THREE, 0.034, 0.034, 0.55, 4.88, -0.22, -0.69, 12, false, steel));  /* N-37D */
    g.add(xcyl(THREE, 0.045, 0.045, 0.10, 5.12, -0.22, -0.69, 12, false, dark));   /* muzzle brake */
    g.add(xcyl(THREE, 0.024, 0.024, 0.40, 4.72, 0.30, -0.69, 10, false, steel));   /* NR-23 */
    g.add(xcyl(THREE, 0.024, 0.024, 0.40, 4.72, 0.40, -0.66, 10, false, steel));   /* NR-23 */

    /* ---- VK-1F afterburning pipe: the exit sits at x -3.75, under the tail root */
    g.add(xcyl(THREE, 0.40, 0.40, 0.55, -3.48, 0, 0, 40, true, burnt));
    g.add(xcyl(THREE, 0.37, 0.37, 0.55, -3.48, 0, 0, 40, true, dark));
    var er = new THREE.Mesh(new THREE.TorusGeometry(0.39, 0.022, 8, 40), steel);
    er.rotation.y = Math.PI / 2; er.position.set(-3.75, 0, 0); g.add(er);

    /* ---- wings: swept, mid-set, 3 degrees of anhedral, three fences each */
    var fenceY = [1.30, 2.70, 3.40];   /* three-view front view: fence tops at 1.3, 2.7 and 3.4 m */
    for (var s = -1; s <= 1; s += 2) {
      var wg = new THREE.Group();
      wg.position.z = WZ;
      wg.rotation.x = -s * ANH * D2R;
      var w = new THREE.Mesh(M.slab(THREE, side(WING, s), WT), panel);
      w.position.z = -WT * 0.5;
      wg.add(w);
      for (var f = 0; f < fenceY.length; f++) {
        var fy = fenceY[f], x0 = (f === 0 ? 2.85 : xLE(fy) - 0.02), x1 = xTE(fy) + 0.10;
        wg.add(box(THREE, x0 - x1, 0.022, 0.12, (x0 + x1) / 2, s * fy, 0.105, panel));
      }
      /* modest team strip near the tip, on the upper surface only */
      var tp = [[-0.50, 3.90], [-1.40, 3.90], [-1.55, 4.50], [-0.65, 4.50]];
      var tm = new THREE.Mesh(M.slab(THREE, side(tp, s), 0.03), team);
      tm.position.z = 0.069;
      wg.add(tm);
      g.add(wg);
    }

    /* ---- fin and tailplane. Side view: the fin runs from the top line at x -1.2 up to its
       tip at z 2.55; its trailing edge slopes forward down to the pipe. The tailplane is set
       on the fin, about 1.6 m above the axis. */
    var fin = [[-1.20, 0.0], [-1.20, 0.60], [-4.35, 2.52], [-4.60, 2.56], [-5.45, 2.52], [-5.62, 2.40],
               [-5.15, 1.62], [-4.61, 0.94], [-4.30, 0.52], [-3.45, 0.30], [-3.45, 0.0]];
    var fp = new THREE.Mesh(M.slab(THREE, fin, 0.07, "xz"), panel);
    fp.position.y = 0.035;
    g.add(fp);
    var tail = [[-3.50, 0.05], [-5.00, 1.62], [-5.62, 1.68], [-4.82, 0.05]];
    for (s = -1; s <= 1; s += 2) {
      var tg = new THREE.Mesh(M.slab(THREE, side(tail, s), 0.05), panel);
      tg.position.z = 1.62 - 0.025;
      g.add(tg);
    }
    /* one small Soviet star on each face of the fin (Monino photograph); decal, so drawn double-sided */
    for (s = -1; s <= 1; s += 2) {
      var pl = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.46), star);
      pl.rotation.x = Math.PI / 2;
      pl.position.set(-4.50, s * 0.045, 2.02);
      g.add(pl);
    }

    /* ---- undercarriage (named "gear"; lowest opaque part when parked, 1.25 m below the axis) */
    var gear = new THREE.Group();
    gear.name = "gear";
    for (s = -1; s <= 1; s += 2) {
      gear.add(strut(THREE, 0.045, [0.65, s * 1.45, -0.18], [0.65, s * 1.93, -0.92], steel));
      gear.add(strut(THREE, 0.025, [1.05, s * 1.50, -0.18], [0.65, s * 1.93, -0.85], steel));
      var tyre = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.20, 48), rubber);
      tyre.position.set(0.65, s * 1.98, -0.92); gear.add(tyre);
      var hub = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.22, 16), steel);
      hub.position.set(0.65, s * 1.98, -0.92); gear.add(hub);
    }
    gear.add(strut(THREE, 0.04, [4.00, 0, -0.78], [4.02, 0, -1.05], steel));
    var nt = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.15, 32), rubber);
    nt.position.set(4.02, 0, -1.05); gear.add(nt);
    var nh = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.17, 12), steel);
    nh.position.set(4.02, 0, -1.05); gear.add(nh);

    var out = mergeGroup(THREE, g);
    while (out.children.length) root.add(out.children[0]);
    root.add(mergeGroup(THREE, gear));
    return root;
  }

  return { build: build };
})();

UNIT_MODELS["pact_e50_fighter"] = {
  len: 11.36,
  build: function (THREE, M, C) { return HeroMiG17.build(THREE, M, C); },
};
