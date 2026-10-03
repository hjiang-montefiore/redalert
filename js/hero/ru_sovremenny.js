/* ==================== js/hero/ru_sovremenny.js ==========================
   HERO MODEL -- Project 956 "Sovremenny" class destroyer (Sarych), the class
   as built from 1980.  Keys: pact_e80_destroyer (early fit), pact_e90_destroyer
   and destroyer_p (late fit).  Published figures: length overall about
   156.5 m, beam 17.3 m, draught 6.5 m (row in js/warship_specs.js 156.5 /
   17.3).  Hull and funnel, bridge, masts, mounts: one build, two variants.

   REFERENCES (what each feature rests on; all Wikimedia Commons, fetched small):
     - "Sovremennyy-class destroyer profile 1987.png" (recognition profile,
       1060 px = 156.5 m): stations of every feature below were scaled off it -
       raked stem and the long raised forecastle with the forward twin AK-130
       about 50 m forward of amidships, the bridge block with its tall tower
       carrying the air-search antenna (tilted mesh array, grid visible), the
       Band Stand dome on the bridge roof, the two Moskit tubes angled up on the
       forecastle break, the one big boxy funnel casing with a lattice mast on
       it (tall block), then the after part described under AFTER PART.
     - "Sovremennyy1982-aug2.jpg" (starboard side from above and abaft the
       beam, 1982, hull 618) and
       "Sovremennyy1986.jpg" (high starboard bow, 1986, hull 441): EARLY FIT.
       The 1986 view shows the whole plan: forward AK-130 on the bow, a flat
       house with the forward Uragan, the bridge with its Band Stand dome and
       two Front Dome directors, the two Moskit quads beside the bridge,
       the boxy funnel, then the after part (AFTER PART below).
       Antenna on the tower top: the open tilted mesh (Top Steer).  Pale grey
       hull and house in both.
     - "Aerial port bow view ... Rastoropny (BRK-420) ... DN-SN-97-01603.jpg"
       (1997) and "US Navy 050606-N-5258M-011 ... Nastoychivyy (DD 610) ...
       BALTOPS 2005.jpg": LATE FIT.  The antenna on the tower top is a solid
       trapezoid panel on a short pedestal (Top Plate), the lattice mast
       behind it carries a wide yardarm, the hull is a darker mid grey (2005
       photograph measured at about rgb 120,125,123 where lit); the bow
       view shows the flared bow, the two Moskit quads lying on the forecastle
       break either side of the bridge pointing forward and up, the Band Stand
       dome and the forward AK-130 and Uragan house on the forecastle.
   WHAT VARIES: only the antenna on the tower top (open Top Steer mesh in the
   1982/1986 photographs, solid Top Plate panel in the 1997/2005 ones) and
   the paint.  NOT CONFIRMED from these photographs: the year the Top Plate
   ships entered service (it is a later batch, not a refit I can date - the
   early ships keep their fit in later years), any other late-fit difference
   (nothing else changes at game scale), the forward AK-630 and Front Dome
   positions (placed from the 1986 aerial and the profile, approximately),
   the sonar dome (not visible, not drawn), hull numbers and names (never
   drawn).

   AFTER PART (funnel to stern), settled on the 1987 profile (orthographic:
   stations and heights scaled at 6.735 px/m), the 1986 aerial of 441, the
   1982 photograph of 618 and three more dated Commons photographs: OKRYLENNY
   port beam at anchor 22 Dec 1989 (DPLA 3a4b43ac..., and its crop
   "Okrylennyy1989.jpg"), BOEVOI aerial port view 21 Dec 1987
   ("Boevoy1987Yaponskoe-more.jpg") and BESPOKOYNY at Kronstadt 13 May 2018
   ("DestroyerRestless2018-04/-07.jpg").  Stations in the photographs were
   scaled between the aft AK-130 and the funnel; they agree to about 2 m.
   The 2018 ship is a late Top Plate ship; its after part
   matches the 1980s photographs.
     - Quarterdeck: open and flat from the stern to x -50, plating z 4.6.
     - Aft twin AK-130: x -56.5 (profile -56.8, 1989 beam -56.0), trained
       aft, on a round raised base 8.6 m across and 1.5 m high (profile: a
       base 1.6 m up from x -61.6 to -52.1; the ring shows in the 1982, 1986
       and 2018 photographs).
     - 01-level after house: x -50 to under the funnel, roof 3.4 m above the
       quarterdeck (profile), after corners cut (1986 aerial), doors on its
       sides (1982).
     - Aft 3S90 Uragan launcher: on the 01 roof on the centreline, x -45,
       just abaft the pad block, arm trained aft.  The 1986 aerial shows its
       round base there with the rail pointing aft over the aft gun; the 1982
       (x -46.6 to -43.8), 1987 BOEVOI (-44.7) and 1989 (-42 +-2.5)
       photographs put a launcher-shaped object at the after end of the pad
       block, and the 2018 BESPOKOYNY photograph shows the launcher, arm
       raised, at that same place.  The 1987 profile draws a small mount at
       x -41 to -37, 3 to 4 m further forward; the photographs are followed.
       Nothing stands between the pad and the funnel but the hangar.
     - Helicopter pad: on the roof of a 02-level block x -42 to -30, deck
       z 10.0 (5.5 m above the quarterdeck; the profile's top line, 6.4 m,
       takes in the pad's rail and folded nets, which the 1989 photograph
       shows standing above it), plated as the hexagon painted on it in the
       1986 aerial (corners cut fore and aft; the painted circle and guide
       lines are markings, not drawn).
     - Hangar: the telescopic hangar, retracted, x -30 to the funnel casing,
       roof 0.84 m above the pad (z 10.84, the profile's top line): the 1987
       BOEVOI aerial shows this short block a little higher than the pad,
       the 1986 aerial the pad's guide lines running into it.  Its real
       height when run out and its sections are NOT confirmed.
     - Aft Front Dome pair: on sponsons at the after corners of the funnel
       casing, x -24, dome centre z 13 (1986 aerial, 1989, 1997 and 2018
       photographs; the profile shows the casing overhang there).  A second,
       higher dome on each side of the funnel in the 1997 and 2018
       photographs is not drawn: its station is not clear.
     - Aft AK-630 pair: x -31.9, port and starboard, at pad level on the
       block corners outside the pad's cut corners (1986 aerial: a round
       mount with its barrels at the starboard fore corner of the pad; 1982:
       a domed mount rising above the pad edge on the far side at the same
       station).  No mount stands on the 01 roof abaft the pad in the 1982
       or 1986 views, so none is drawn there.
     - Bass Tilt (AK-630 director): NOT identified in any reference aft, so
       not drawn.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The forward
   twin AK-130 is the group named "turret"; everything else is baked, one mesh
   per material.  render3d's deckOf takes the deck level from the after
   eighth, the quarterdeck, so the game sets the Ka-27 down on the
   quarterdeck abaft the aft gun, not on the pad.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSovremenny = (function () {
  "use strict";
  var PI = Math.PI;
  var XA = -78.25, XB = 80.0;

  /* x, half beam, deck z, keel z, sqTop, sqLow */
  var STA = [
    [-78.25, 6.60, 3.90, -1.70, 0.20, 0.62],
    [-74.0,  7.50, 4.40, -3.60, 0.20, 0.60],
    [-66.0,  8.30, 4.40, -5.40, 0.19, 0.56],
    [-50.0,  8.65, 4.40, -6.30, 0.18, 0.52],
    [-26.0,  8.65, 4.40, -6.50, 0.17, 0.50],
    [-4.0,   8.65, 5.40, -6.50, 0.17, 0.50],
    [ 14.0,  8.55, 5.90, -6.45, 0.18, 0.54],
    [ 27.0,  8.30, 8.40, -6.30, 0.22, 0.64],
    [ 40.0,  7.50, 8.70, -5.80, 0.30, 0.80],
    [ 55.0,  5.70, 9.00, -4.60, 0.40, 1.00],
    [ 69.0,  3.30, 9.40, -2.90, 0.55, 1.25],
    [ 77.5,  1.20, 9.70, -1.00, 0.75, 1.50],
    [ 80.00, 0.30, 9.85, -0.30, 0.85, 1.55]
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

  /* ---------------------------------------------------------- textures */
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
    var g = cv.getContext("2d"), R = rng(9561), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.18; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
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


  function makeMats(THREE, C, V) {
    var team = (C && C.team) || 0x3f7fd0;
    var late = V === "late";
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:  skin(late ? 0x858d90 : 0x959da0, plateTex(THREE, [20, 1.2]), 0.86),
      boot:  skin(0x0d0f11, plateTex(THREE, [20, 1]), 0.9),
      under: skin(0x180d0a, plateTex(THREE, [10, 2]), 0.9),
      sup:   skin(late ? 0x959c9f : 0xa6adb0, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(0x5c6368, plateTex(THREE, [16, 1.5]), 0.95),
      dark:  skin(0x050607, plateTex(THREE, [2, 2]), 0.9),
      team:  skin(team, plateTex(THREE, [1, 1]), 0.84),
      metal: metal(0x5f666c, 0.52, 0.55),
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
  function tprism(THREE, p, lx0, ly0, lx1, ly1, lz, m, x, y, z) {
    var ax = lx0 / 2, ay = ly0 / 2, bx = lx1 / 2, by = ly1 / 2, hz = lz / 2;
    var V = [[-ax, -ay, -hz], [ax, -ay, -hz], [ax, ay, -hz], [-ax, ay, -hz],
             [-bx, -by, hz], [bx, -by, hz], [bx, by, hz], [-bx, by, hz]];
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]]; pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.16, v[1] * 0.16);
      else if (i < 8) uv.push(v[0] * 0.16, v[2] * 0.16);
      else uv.push(v[1] * 0.16, v[2] * 0.16);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    var mm = new THREE.Mesh(g, m); mm.position.set(x, y, z); p.add(mm); return mm;
  }
  /* convex polygon (CCW from above) extruded z0..z1 */
  function polyPrism(THREE, p, m, pts, z0, z1) {
    var pos = [], uv = [], n = pts.length, i, a, b;
    function tri(P, Q, R) {
      var k, v = [P, Q, R];
      for (k = 0; k < 3; k++) { pos.push(v[k][0], v[k][1], v[k][2]); uv.push(v[k][0] * 0.16, v[k][1] * 0.16); }
    }
    for (i = 1; i < n - 1; i++) {
      tri([pts[0][0], pts[0][1], z1], [pts[i][0], pts[i][1], z1], [pts[i + 1][0], pts[i + 1][1], z1]);
      tri([pts[0][0], pts[0][1], z0], [pts[i + 1][0], pts[i + 1][1], z0], [pts[i][0], pts[i][1], z0]);
    }
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      tri([a[0], a[1], z0], [b[0], b[1], z0], [b[0], b[1], z1]);
      tri([a[0], a[1], z0], [b[0], b[1], z1], [a[0], a[1], z1]);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    var mm = new THREE.Mesh(g, m); p.add(mm); return mm;
  }
  function loftMesh(THREE, M, secs, segs, m) {
    var g = M.loft(THREE, secs, segs), idx = g.getIndex(), a = idx.array, i, t;
    for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
    idx.needsUpdate = true; g.computeVertexNormals();
    return new THREE.Mesh(g, m);
  }
  function bowRake(x, k) { return x > 56 ? k * Math.pow((x - 56) / 24, 1.6) : 0; }
  function hullSections(kind) {
    var A = [], i, XS = [];
    for (i = 0; i < 52; i++) XS.push(XA + (XB - XA) * (i / 51));
    for (i = 0; i < XS.length; i++) {
      var x = XS[i], w = pick(x, 1), dz = pick(x, 2), kz = pick(x, 3);
      var xx = x - bowRake(x, kind === "low" ? 4.6 : 3.0);
      if (kind === "top")
        A.push({ x: xx, w: w + 0.06, h: (dz - 0.5) / 2, zc: (dz + 0.7) / 2, sq: pick(x, 4) });
      else if (kind === "boot")
        A.push({ x: xx, w: w + 0.03, h: 0.45, zc: 0.30, sq: 0.17 });
      else
        A.push({ x: xx, w: w, h: (0.12 - kz) / 2, zc: (0.12 + kz) / 2, sq: pick(x, 5) });
    }
    return A;
  }
  /* deck plating: 0.2 m above the deck line, clear of the top of the hull
     shell (deck line + 0.1) so the two never fight in the depth buffer */
  function deckRibbon(THREE, m, x0, x1) {
    var xs = [x0, x1], i, j, NC = 3, pos = [], uv = [], idx = [], x;
    for (i = 0; i < STA.length; i++) if (STA[i][0] > x0 + 0.3 && STA[i][0] < x1 - 0.3) xs.push(STA[i][0]);
    for (x = 16; x < x1 - 0.3; x += 1.5) xs.push(x);
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (v, n) { return n === 0 || v - xs[n - 1] > 0.05; });
    for (i = 0; i < xs.length; i++) {
      x = xs[i]; var xo = x, k;
      for (k = 0; k < 4; k++) xo = x + bowRake(xo, 3.0);
      var w = Math.max(0.06, halfB(xo) - 0.02), z = deckZ(xo) + 0.2;
      for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, (w * 2) * (j / NC) / 8); }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    var gg = new THREE.BufferGeometry();
    gg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    gg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    gg.setIndex(idx); gg.computeVertexNormals();
    return new THREE.Mesh(gg, m);
  }
  /* deck edge x shifted for the rake, so rails and fittings sit on the plating */
  function edgeY(x) {
    var xo = x, k; for (k = 0; k < 4; k++) xo = x + bowRake(xo, 3.0);
    return Math.max(0.1, halfB(xo) - 0.2);
  }
  function railRun(THREE, g, T, x0, x1, step, hgt) {
    var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n; y = s * edgeY(x); z = deckZ(x) + 0.04;
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.04, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.025, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.02, 3);
        }
        prev = [x, y, z];
      }
    }
  }
  /* box with raked ends / sloped roof: 8 corner points, same face table as tprism */
  function hexa(THREE, p, m, V) {
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]]; pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.16, v[1] * 0.16);
      else if (i < 8) uv.push(v[0] * 0.16, v[2] * 0.16);
      else uv.push(v[1] * 0.16, v[2] * 0.16);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    var mm = new THREE.Mesh(g, m); p.add(mm); return mm;
  }
  /* uptake casing: bottom rect x0..x1 half width w0 at z0, roof inset w1 and
     sloping from zb (aft edge) to zf (fore edge) */
  function casing(THREE, p, m, x0, x1, w0, w1, z0, zb, zf, inset) {
    return hexa(THREE, p, m, [
      [x0, -w0, z0], [x1, -w0, z0], [x1, w0, z0], [x0, w0, z0],
      [x0 + inset, -w1, zb], [x1 - inset * 0.3, -w1, zf], [x1 - inset * 0.3, w1, zf], [x0 + inset, w1, zb]]);
  }
  /* One mesh per material: bake every mesh under root (except named
     children listed in skip) into merged geometry in root's frame. */
  function bake(THREE, root, skip) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var p = o.parent, bad = false;
      while (p && p !== root) { if (skip.indexOf(p) >= 0) bad = true; p = p.parent; }
      if (bad) return;
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

  /* twin 76 mm AK-726 in its enclosed oval shield, at rest pointing +X */
  function lattice(THREE, g, T, cx, bx, by, tx, ty, z0, z1, n, r) {
    var i, j, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    function pt(k, f) {
      var sx = bx + (tx - bx) * f, sy = by + (ty - by) * f;
      return [cx + c[k][0] * sx, c[k][1] * sy, z0 + (z1 - z0) * f];
    }
    for (j = 0; j < 4; j++) {
      var a = pt(j, 0), b = pt(j, 1);
      strut(THREE, g, T.metal, a[0], a[1], a[2], b[0], b[1], b[2], r, 4);
    }
    for (i = 0; i <= n; i++) {
      var f = i / n;
      for (j = 0; j < 4; j++) {
        var p = pt(j, f), q = pt((j + 1) % 4, f);
        if (i > 0) strut(THREE, g, T.metal, p[0], p[1], p[2], q[0], q[1], q[2], r * 0.6, 3);
        if (i < n) {
          var p2 = pt(j, f + 1 / n), q2 = pt((j + 1) % 4, f + 1 / n);
          strut(THREE, g, T.metal, p[0], p[1], p[2], q2[0], q2[1], q2[2], r * 0.4, 3);
        }
      }
    }
  }
  function dish(THREE, g, m, rad, x, y, z, tilt) {
    var dg = new THREE.SphereGeometry(rad, 18, 5, 0, PI * 2, 0, PI / 3.2);
    dg.scale(1, 0.35, 1);
    dg.rotateZ(PI / 2 + tilt);
    var d = new THREE.Mesh(dg, m); d.position.set(x, y, z); g.add(d); return d;
  }


  /* twin 130 mm AK-130 in its big enclosed shield, at rest pointing +X */
  function ak130(THREE, g, T) {
    cylZ(THREE, g, 2.7, 3.0, 1.3, 16, T.sup, 0, 0, 0.65);
    hexa(THREE, g, T.sup, [
      [-3.2, -2.5, 1.3], [2.3, -2.3, 1.3], [2.3, 2.3, 1.3], [-3.2, 2.5, 1.3],
      [-2.6, -2.0, 3.9], [1.3, -1.8, 3.6], [1.3, 1.8, 3.6], [-2.6, 2.0, 3.9]]);
    hexa(THREE, g, T.sup, [
      [2.3, -1.8, 1.4], [3.1, -1.4, 1.5], [3.1, 1.4, 1.5], [2.3, 1.8, 1.4],
      [1.3, -1.8, 3.4], [2.5, -1.4, 3.0], [2.5, 1.4, 3.0], [1.3, 1.8, 3.4]]);
    var s;
    box(THREE, g, 0.4, 2.8, 0.9, T.dark, 3.15, 0, 2.3);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.2, 0.2, 1.4, 10, T.gun, 3.2, s * 0.55, 2.3);
      cylX(THREE, g, 0.115, 0.115, 6.0, 10, T.gun, 6.2, s * 0.55, 2.3, true);
    }
    return g;
  }
  /* 3K90 Uragan (SA-N-7) single-arm launcher: pedestal, trainer, one beam
     rail with its missile, raised a few degrees; at rest pointing +X */
  function uragan(THREE, g, T) {
    cylZ(THREE, g, 1.6, 1.8, 0.7, 14, T.sup, 0, 0, 0.35);
    hexa(THREE, g, T.sup, [
      [-1.6, -1.6, 0.7], [1.4, -1.6, 0.7], [1.4, 1.6, 0.7], [-1.6, 1.6, 0.7],
      [-1.2, -1.2, 1.7], [1.0, -1.2, 1.7], [1.0, 1.2, 1.7], [-1.2, 1.2, 1.7]]);
    var arm = new THREE.Group(); arm.position.set(0.2, 0, 2.1); arm.rotation.y = -0.12;
    box(THREE, arm, 6.4, 0.3, 0.34, T.metal, 2.0, 0, -0.1);
    box(THREE, arm, 0.4, 0.3, 0.9, T.metal, -0.9, 0, 0.2);
    cylX(THREE, arm, 0.25, 0.25, 4.6, 10, T.sup, 2.3, 0, 0.3);
    cylX(THREE, arm, 0.03, 0.25, 0.8, 10, T.sup, 5.0, 0, 0.3);
    var k;
    for (k = 0; k < 4; k++) {
      var f = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 0.5), T.sup);
      f.position.set(0.5, 0, 0.3); f.rotation.x = k * PI / 2 + PI / 4; f.translateZ(0.28); arm.add(f);
    }
    g.add(arm);
    return g;
  }
  /* P-270 Moskit quad launcher: four fixed tubes in a 2 x 2 block, along +X */
  function moskit(THREE, g, T) {
    var a, b;
    for (a = -1; a <= 1; a += 2) for (b = -1; b <= 1; b += 2) {
      cylX(THREE, g, 0.5, 0.5, 8.8, 12, T.sup, 0, a * 0.56, b * 0.56);
      cylX(THREE, g, 0.52, 0.52, 0.3, 12, T.dark, 4.4, a * 0.56, b * 0.56);
      cylX(THREE, g, 0.51, 0.51, 0.3, 12, T.metal, -4.3, a * 0.56, b * 0.56);
    }
    box(THREE, g, 8.2, 2.4, 0.16, T.metal, 0, 0, 0.0);
    box(THREE, g, 0.3, 2.4, 2.4, T.metal, -1.6, 0, 0);
    box(THREE, g, 0.3, 2.4, 2.4, T.metal, 1.8, 0, 0);
    return g;
  }
  /* AK-630 six-barrel 30 mm mount */
  function ak630(THREE, g, T) {
    cylZ(THREE, g, 0.55, 0.65, 0.5, 10, T.sup, 0, 0, 0.25);
    box(THREE, g, 1.3, 1.0, 1.0, T.sup, 0, 0, 1.0);
    cylX(THREE, g, 0.17, 0.17, 1.9, 8, T.gun, 1.3, 0, 1.1, true);
    cylX(THREE, g, 0.27, 0.27, 0.5, 8, T.gun, 0.55, 0, 1.1);
    return g;
  }
  /* Front Dome fire-control dome on a short stalk */
  function frontDome(THREE, g, T, x, y, z) {
    cylZ(THREE, g, 0.45, 0.6, 0.5, 8, T.sup, x, y, z + 0.25);
    var sg = new THREE.SphereGeometry(0.85, 12, 8, 0, PI * 2, 0, PI * 0.62);
    sg.rotateX(PI / 2);
    var d = new THREE.Mesh(sg, T.sup); d.position.set(x, y, z + 0.65); g.add(d);
  }
  /* Top Steer: open tilted mesh array, grid of bars in a frame (1982/1986) */
  function topSteer(THREE, g, T, x, z) {
    var a = new THREE.Group(); a.position.set(x, 0, z); a.rotation.y = -0.32;
    var i;
    box(THREE, a, 0.16, 7.4, 0.2, T.metal, 0, 0, -2.0);
    box(THREE, a, 0.16, 7.4, 0.2, T.metal, 0, 0, 2.0);
    for (i = 0; i < 4; i++) box(THREE, a, 0.1, 7.2, 0.1, T.metal, 0, 0, -1.2 + i * 0.8);
    for (i = 0; i < 9; i++) box(THREE, a, 0.16, 0.2, 4.0, T.metal, 0, -3.6 + i * 0.9, 0);
    box(THREE, a, 0.5, 0.4, 3.8, T.metal, 0.5, 0, 0);
    g.add(a);
  }
  /* Top Plate: solid trapezoid panel on a short pedestal (1997/2005) */
  function topPlate(THREE, g, T, x, z) {
    var a = new THREE.Group(); a.position.set(x, 0, z); a.rotation.y = -0.32;
    hexa(THREE, a, T.sup, [
      [-0.2, -3.6, -1.9], [0.2, -3.6, -1.9], [0.2, 3.6, -1.9], [-0.2, 3.6, -1.9],
      [-0.2, -3.0, 1.9], [0.2, -3.0, 1.9], [0.2, 3.0, 1.9], [-0.2, 3.0, 1.9]]);
    box(THREE, a, 0.5, 7.4, 0.2, T.metal, 0.05, 0, -1.9);
    box(THREE, a, 0.5, 6.3, 0.2, T.metal, 0.05, 0, 1.9);
    box(THREE, a, 0.6, 0.3, 3.8, T.metal, 0.4, 0, 0);
    g.add(a);
  }

  function build(THREE, M, C, V) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C, V));
    var late = V === "late";
    var s, i, x, z;

    /* hull: three coaxial shells, transom, deck */
    g.add(loftMesh(THREE, M, hullSections("top"), 22, T.hull));
    g.add(loftMesh(THREE, M, hullSections("boot"), 8, T.boot));
    g.add(loftMesh(THREE, M, hullSections("low"), 12, T.under));
    tprism(THREE, g, 0.4, 13.0, 0.4, 12.2, 3.4, T.hull, -78.1, 0, 2.2);
    g.add(deckRibbon(THREE, T.deck, -78.0, 77.4));

    /* scuttles along the sides, anchor recesses, hull doors */
    for (i = 0; i < 38; i++) {
      x = -68 + i * 3.4;
      if (x > 14 && x < 30) continue;
      for (s = -1; s <= 1; s += 2) {
        var sg = new THREE.PlaneGeometry(0.3, 0.3); sg.rotateX(-s * PI / 2);
        var sc = new THREE.Mesh(sg, T.dark); sc.position.set(x, s * (halfB(x) + 0.09), deckZ(x) - 1.3); g.add(sc);
      }
    }
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.6, 0.08, 0.8, T.dark, 66.0, s * (halfB(62.5) - 0.55), deckZ(62) - 1.5);
      box(THREE, g, 2.0, 0.06, 1.6, T.dark, -22.0, s * (halfB(-22) + 0.1), 2.6);
    }

    /* forecastle house: forward Uragan base, lower deckhouse ahead of the bridge */
    tprism(THREE, g, 11.0, 8.8, 10.2, 8.0, 2.0, T.sup, 31.5, 0, 9.65);
    /* main bridge house (tier A), bridge (tier B), upper bridge (tier C) */
    tprism(THREE, g, 24.0, 10.8, 22.8, 10.0, 6.4, T.sup, 12.0, 0, 8.6);
    tprism(THREE, g, 18.0, 11.0, 16.6, 9.8, 3.7, T.sup, 15.0, 0, 13.65);
    tprism(THREE, g, 9.0, 8.4, 8.0, 7.4, 2.7, T.sup, 10.5, 0, 16.85);
    box(THREE, g, 0.1, 10.4, 0.9, T.glass, 24.1, 0, 14.0);
    box(THREE, g, 0.1, 7.0, 0.8, T.glass, 15.05, 0, 17.0);
    box(THREE, g, 9.0, 0.1, 0.8, T.glass, 10.5, 4.15, 17.0);
    box(THREE, g, 9.0, 0.1, 0.8, T.glass, 10.5, -4.15, 17.0);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 14.0, 0.1, 0.8, T.glass, 15.0, s * 5.45, 14.0);
      box(THREE, g, 3.4, 2.4, 0.16, T.sup, 20.0, s * 6.2, 13.1);
      for (i = 0; i < 12; i++) box(THREE, g, 0.8, 0.05, 0.55, T.dark, 2.0 + i * 1.8, s * 5.42, 10.4);
      for (i = 0; i < 4; i++) box(THREE, g, 1.0, 0.05, 1.0, T.dark, 5.0 + i * 4.8, s * 5.42, 7.4);
    }
    /* roofs */
    box(THREE, g, 9.4, 8.6, 0.12, T.sup, 10.5, 0, 18.25);

    /* Band Stand dome, Front Dome pair on the bridge roof, small directors */
    var bd = new THREE.SphereGeometry(2.0, 18, 12); bd.scale(1, 1, 0.95);
    var bm = new THREE.Mesh(bd, T.sup); bm.position.set(18.0, 0, 17.0); g.add(bm);
    cylZ(THREE, g, 1.2, 1.6, 0.8, 12, T.sup, 18.0, 0, 15.9);
    for (s = -1; s <= 1; s += 2) {
      frontDome(THREE, g, T, 21.5, s * 3.6, 15.5);
      frontDome(THREE, g, T, 5.5, s * 3.3, 18.3);
    }

    /* tower aft of the bridge: enclosed mast carrying the air-search antenna */
    tprism(THREE, g, 6.4, 6.2, 4.2, 4.4, 9.4, T.sup, 3.4, 0, 16.5);
    box(THREE, g, 4.8, 5.4, 0.14, T.metal, 3.4, 0, 21.3);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 3.0, 0.1, 0.8, T.dark, 3.4, s * 2.15, 18.6);
    strut(THREE, g, T.metal, 3.4, 0, 21.3, 3.4, 0, 26.2, 0.32, 8);
    box(THREE, g, 1.8, 1.8, 0.8, T.sup, 3.4, 0, 22.0);
    if (late) topPlate(THREE, g, T, 3.4, 28.1); else topSteer(THREE, g, T, 3.4, 28.1);
    cylZ(THREE, g, 0.5, 0.5, 1.2, 10, T.sup, 5.0, -1.6, 22.0);
    strut(THREE, g, T.metal, 2.0, 0, 21.4, 2.0, 0, 25.0, 0.04, 3);
    strut(THREE, g, T.metal, 3.4, 1.5, 22.0, 3.4, 1.5, 27.0, 0.03, 3);

    /* funnel casing, lattice mast on it, house between casing and bridge */
    tprism(THREE, g, 17.0, 12.4, 14.4, 9.6, 11.2, T.sup, -15.0, 0, 11.0);
    tprism(THREE, g, 14.0, 9.6, 11.5, 8.0, 1.8, T.sup, -15.0, 0, 17.5);
    box(THREE, g, 6.5, 4.6, 0.1, T.dark, -11.0, 0, 18.45);
    tprism(THREE, g, 7.2, 10.0, 6.4, 9.0, 8.0, T.sup, -3.4, 0, 9.4);
    cylZ(THREE, g, 0.7, 0.8, 1.4, 10, T.sup, -2.0, 0, 13.9);
    cylZ(THREE, g, 0.62, 0.62, 0.08, 10, T.dark, -2.0, 0, 14.65);
    lattice(THREE, g, T, -17.5, 2.0, 1.7, 0.7, 0.6, 18.4, 28.0, 6, 0.09);
    box(THREE, g, 3.4, 3.0, 0.12, T.metal, -17.5, 0, 28.0);
    box(THREE, g, 1.0, 7.8, 0.14, T.metal, -17.5, 0, 25.0);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.3, 0.3, 0.9, 8, T.sup, -17.5, s * 3.6, 24.4);
      dish(THREE, g, T.metal, 0.9, -16.8, s * 1.4, 28.8, 0.3);
    }
    strut(THREE, g, T.metal, -17.5, 0, 28.0, -17.5, 0, 33.0, 0.05, 4);
    box(THREE, g, 0.1, 2.6, 0.1, T.metal, -17.5, 0, 31.5);
    for (i = 0; i < 5; i++) for (s = -1; s <= 1; s += 2)
      box(THREE, g, 1.1, 0.12, 1.2, T.dark, -21.0 + i * 3.0, s * 5.78, 9.0);
    /* davit boats on the spar deck either side of the house */
    for (s = -1; s <= 1; s += 2) {
      tprism(THREE, g, 7.0, 2.0, 5.2, 1.4, 1.0, T.sup, -3.5, s * 6.55, 6.4);
      box(THREE, g, 2.0, 0.2, 0.9, T.dark, -3.0, s * 6.55, 7.0);
    }

    /* AFT OF THE FUNNEL, bow to stern (see the header for what each rests
       on).  Quarterdeck 4.4 (plating 4.6); 01 roof z 7.84; pad deck z 10.0;
       hangar roof z 10.84 (the profile's top line, 6.4 m up). */
    var Z1 = 7.84, ZP = 10.0;
    /* 01-level after house: from under the funnel to x -50, its after end
       chamfered as the 1986 aerial shows */
    tprism(THREE, g, 38.8, 12.0, 38.6, 11.8, Z1 - 4.4, T.sup, -28.6, 0, (Z1 + 4.4) / 2);
    hexa(THREE, g, T.sup, [
      [-50.0, -4.0, 4.4], [-47.98, -6.0, 4.4], [-47.98, 6.0, 4.4], [-50.0, 4.0, 4.4],
      [-50.0, -3.9, Z1], [-47.98, -5.9, Z1], [-47.98, 5.9, Z1], [-50.0, 3.9, Z1]]);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) box(THREE, g, 1.0, 0.06, 1.9, T.dark, -45.5 + i * 5.2, s * 6.0, 5.45);
      box(THREE, g, 0.06, 1.0, 1.9, T.dark, -50.03, s * 2.2, 5.45);
    }
    /* pad block (02 level) x -42..-30, the pad plate on its roof: the
       hexagon the 1986 aerial shows, corners cut fore and aft */
    tprism(THREE, g, 12.0, 11.0, 11.9, 10.9, ZP - 0.06 - Z1, T.sup, -36.0, 0, (ZP - 0.06 + Z1) / 2);
    polyPrism(THREE, g, T.deck, [[-42.0, -4.2], [-39.8, -6.4], [-34.4, -6.4], [-30.2, -3.2],
                                 [-30.2, 3.2], [-34.4, 6.4], [-39.8, 6.4], [-42.0, 4.2]], ZP - 0.06, ZP);
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < 4; i++) box(THREE, g, 0.9, 0.05, 0.6, T.dark, -40.5 + i * 2.6, s * 5.47, 9.0);
    /* pad edge: low rail posts and the folded net frames */
    var PR = [[-42.0, -4.2], [-39.8, -6.4], [-34.4, -6.4], [-30.4, -3.35]], pr, q, k2;
    for (s = -1; s <= 1; s += 2) for (k2 = 0; k2 < PR.length - 1; k2++) {
      var a0 = PR[k2], a1 = PR[k2 + 1], L2 = Math.hypot(a1[0] - a0[0], a1[1] - a0[1]);
      var nP = Math.max(1, Math.round(L2 / 1.8));
      for (q = 0; q <= nP; q++) {
        if (k2 > 0 && q === 0) continue;
        pr = [a0[0] + (a1[0] - a0[0]) * q / nP, s * (a0[1] + (a1[1] - a0[1]) * q / nP)];
        strut(THREE, g, T.metal, pr[0], pr[1], ZP, pr[0], pr[1], ZP + 0.8, 0.035, 3);
      }
      strut(THREE, g, T.metal, a0[0], s * a0[1], ZP + 0.78, a1[0], s * a1[1], ZP + 0.78, 0.025, 3);
    }
    strut(THREE, g, T.metal, -42.0, -4.2, ZP + 0.78, -42.0, 4.2, ZP + 0.78, 0.025, 3);
    /* retracted telescopic hangar between the pad and the funnel casing,
       its roof a little above the pad (1987 aerial, 1987 profile) */
    tprism(THREE, g, 7.4, 10.8, 7.2, 10.6, 10.84 - Z1, T.sup, -26.6, 0, (10.84 + Z1) / 2);
    for (i = -2; i <= 2; i++) box(THREE, g, 0.06, 0.12, 0.7, T.dark, -30.32, i * 2.0, 10.42);
    /* aft 3S90 Uragan: on the 01 roof just abaft the pad block, trained
       aft (1986 aerial, 1982, 1987 and 2018 photographs) */
    var au = new THREE.Group(); au.position.set(-45.0, 0, Z1); au.rotation.z = PI; uragan(THREE, au, T); g.add(au);
    for (s = -1; s <= 1; s += 2) {
      /* aft Front Dome pair on sponsons at the after corners of the funnel
         casing, high (1986 aerial, 1989, 1997, 2018 photographs) */
      box(THREE, g, 2.4, 2.0, 0.25, T.sup, -23.8, s * 4.0, 12.2);
      strut(THREE, g, T.metal, -24.6, s * 4.0, 12.1, -23.0, s * 4.0, 10.84, 0.08, 4);
      frontDome(THREE, g, T, -24.0, s * 4.0, 12.32);
      /* aft AK-630 pair at the fore corners of the pad block, at pad level
         outside the cut corners of the pad (1986 aerial, 1982 photograph) */
      box(THREE, g, 1.9, 1.5, 0.12, T.sup, -31.9, s * 5.75, ZP - 0.06);
      var ac = new THREE.Group(); ac.position.set(-31.9, s * 5.85, ZP); ac.rotation.z = s * PI / 2; ak630(THREE, ac, T); g.add(ac);
    }
    /* two more AK-630 abeam of the tier A house */
    for (s = -1; s <= 1; s += 2) {
      var ad = new THREE.Group(); ad.position.set(0.5, s * 6.4, deckZ(0.5) + 0.04); ak630(THREE, ad, T); g.add(ad);
    }

    /* forecastle: forward Uragan, Moskit quads angled on the break */
    var fu = new THREE.Group(); fu.position.set(31.5, 0, 10.7); uragan(THREE, fu, T); g.add(fu);
    for (s = -1; s <= 1; s += 2) {
      var mk = new THREE.Group(); mk.position.set(20.0, s * 6.9, 9.5); mk.rotation.y = -0.36; moskit(THREE, mk, T); g.add(mk);
      box(THREE, g, 1.8, 2.4, 2.6, T.sup, 16.5, s * 6.9, 6.9);
      box(THREE, g, 1.8, 2.4, 3.3, T.sup, 23.8, s * 6.9, 7.4);
    }
    cylZ(THREE, g, 0.6, 0.6, 0.7, 10, T.metal, 61.0, 0, deckZ(61) + 0.35);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.2, 0.2, 0.5, 6, T.metal, 40.0, s * 5.0, deckZ(40) + 0.25);
      cylZ(THREE, g, 0.2, 0.2, 0.5, 6, T.metal, -70.0, s * 5.5, deckZ(-70) + 0.25);
    }
    box(THREE, g, 1.4, 0.5, 0.2, T.metal, 64.0, 0, deckZ(64) + 0.25);
    strut(THREE, g, T.metal, 74.0, 0, 9.85, 74.0, 0, 12.5, 0.05, 4);

    /* aft AK-130 (at rest pointing aft) on its raised round base, 1.5 m
       (1987 profile; the ring in the 1982, 1986 and 2018 photographs) */
    cylZ(THREE, g, 4.1, 4.3, 1.5, 24, T.sup, -56.5, 0, 5.15);
    var ag = new THREE.Group(); ag.position.set(-56.5, 0, 5.9); ag.rotation.z = PI; ak130(THREE, ag, T); g.add(ag);

    /* underwater gear: two shafts on A-brackets, props, rudders */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.24, 0.24, 8.0, 8, T.metal, -68.0, s * 3.4, -2.9);
      strut(THREE, g, T.metal, -71.5, s * 3.4, -2.9, -71.5, s * 5.0, -1.2, 0.15, 4);
      cylX(THREE, g, 0.38, 0.55, 0.9, 8, T.metal, -73.3, s * 3.4, -2.9);
      for (i = 0; i < 5; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 1.3), T.metal);
        bl.position.set(-73.3, s * 3.4, -2.9); bl.rotation.x = i * 2 * PI / 5 + 0.35;
        bl.translateZ(0.85); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 2.4, 0.2, 2.6, T.metal, -75.2, s * 1.2, -1.8);
    }

    /* rails: not over the flight deck and quarterdeck, which stay clean */
    railRun(THREE, g, T, -26.0, 20.0, 4.5, 1.0);
    railRun(THREE, g, T, 28.0, 74.0, 4.0, 1.0);

    /* team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.6, 0.9, 0.04, T.team, -27.0, 0, 10.88);
    box(THREE, g, 2.6, 0.9, 0.04, T.team, 11.5, 0, 18.33);
    box(THREE, g, 2.6, 0.9, 0.04, T.team, 44.0, 0, deckZ(44.0) + 0.24);

    /* trained mount: forward AK-130 */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(50.0, 0, deckZ(50.0)); ak130(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g, []);
    var tb = bake(THREE, tw, []);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tb.children.forEach(function (c) { tw.add(c); });
    root.add(tw);
    /* the middle of the pad's surface, for render3d's deckOf: the pad
       stands on the 02 block 5.4 m above the quarterdeck, not at the level
       of her after eighth, so it is marked (hidden, no geometry) */
    var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
    hp.position.set(-36.1, 0, ZP); root.add(hp);
    return root;
  }
  return { build: build };
})();

/* the early ships (1980s photographs) */
UNIT_MODELS["pact_e80_destroyer"] = {
  len: 156.5,
  build: function (THREE, M, C) { return HeroSovremenny.build(THREE, M, C, "early"); }
};
/* the 1990s and present day: the later ships' Top Plate antenna (1997 and 2005 photographs) */
UNIT_MODELS["pact_e90_destroyer"] = {
  len: 156.5,
  build: function (THREE, M, C) { return HeroSovremenny.build(THREE, M, C, "late"); }
};
UNIT_MODELS["destroyer_p"] = {
  len: 156.5,
  build: function (THREE, M, C) { return HeroSovremenny.build(THREE, M, C, "late"); }
};
