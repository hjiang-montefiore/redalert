/* ==================== js/hero/ru_moskva.js =============================
   HERO MODEL -- Project 1123 "Kondor" (Moskva class) anti-submarine
   helicopter cruiser, as built 1967-69 (Moskva, Leningrad).
   Key: pact_e60_carrier.  Length overall 189 m, waterline beam 23 m,
   flight deck beam 34 m (js/warship_specs.js: len 189, beam 23); draught
   drawn as about 7.7 m (published figures vary; not from a fetched source).

   REFERENCES (Wikimedia Commons, fetched small; what each feature rests on):
     - "Moskva-class helicopter carrier profile 1986.png" (recognition
       profile, 191 m scale bar): every station and height below was scaled
       off it at 4.78 px/m with the waterline at its hull bottom - the flush
       upper deck at 9.7 m with sheer rising to 11.2 m at the stem, the
       superstructure from 76 m to 116 m from the stern with its vertical
       after face, the stepped forward face, the uptake drum at 36-38 m, the
       lattice mast and the Top Sail at its head (top 54.6 m), the Head Net on
       the mast front, two directors stepped down the forward face, the three
       twin-arm launchers forward (30, 42 and 65 m from the bow; the after one
       on a raised deckhouse 14.3 m high, the middle one on a magazine trunk),
       a low deckhouse between them, two identical small launchers on the
       forecastle at 12 and 22 m from the bow (drawn as the two RBU-6000), and
       the open stern gallery under the after end of the flight deck (12 m
       long, 4.6 to 9.2 m above water).
     - "Moskva class Leningrad flightdeck cruiser, aerial bow view.jpg"
       (USN, Leningrad): the order forward - a launcher without side panels
       nearest the bow (taken as the SUW-N-1, the published fit has one twin
       SUW-N-1 and two twin SA-N-3 launchers), then two launchers each between
       a pair of rectangular panels (the SA-N-3 pair, the after one raised),
       two large multi-dish directors stacked on the centreline of the forward
       face (the SA-N-3 directors), round domed mounts on each side at the
       forward corners of the superstructure (the two twin 57 mm AK-725), four
       white spherical radomes on the superstructure sides, a lattice yard
       across the mast, boats at the deck edge beside the raised launcher.
     - "Moskva class Moskva flightdeck cruiser, starboard quarter view.jpg"
       (USN 1982) and "DN-SN-90-07613 Moskva cllass.jpg" (USN 1990, Leningrad
       from astern): the broad flight deck over the after half with its
       rounded stern, the big flare of the after hull, the pyramid-shaped
       superstructure narrowing to the uptake drum with its dark opening, the
       doors at the foot of the after face, the open stern gallery with its
       posts and the towed-sonar gear (Vega VDS, Russian Wikipedia), landing
       circles and lift outlines on the centreline, the fringe of deck-edge
       netting.
     - "38MoskvaoffMoroccoJan1970.jpg" (1970 broadside): the as-built layout
       forward and the flush hull side.
     - Russian Wikipedia "Kreisera proekta 1123": flight deck area 2200 m2,
       the hangar under it, strong flare aft, upper deck sheer forward, two
       capstans on the forecastle, working boats 8.5 m, VDS in the stern.
       English Wikipedia: 1 twin SUW-N-1, 2 RBU-6000, 2 twin SA-N-3, 2 twin
       57 mm.
     - PAINT: sampled from the 1982 colour photograph - mid-grey hull, a
       lighter superstructure, a pale weathered flight deck; boot topping and
       anti-fouling kept dark.
   NOT CONFIRMED and therefore not drawn or drawn plainly: the torpedo tubes
   (behind the hull side, not visible), the AK-725 directors and every small
   antenna whose identity I could not read off the references, rudders
   (number unknown - only the two published shafts and screws are drawn).
   The lift and landing-circle positions are painted after the 1990 stern
   photograph and are approximate; the two RBU-6000 are drawn on the
   centreline where the profile puts them (their athwartships position is
   not shown by a profile). No hull number, name or ensign.

   NO TRAINED MOUNT: the row has no turret flag, so nothing is named
   "turret"; every launcher and gun is baked, at rest pointing forward.
   FLIGHT DECK: one clean flat plate, top at z = 9.75, from the stern
   (x = -94.5) to the after face of the superstructure (x = -17.6), nothing
   standing on it (markings are painted into its texture). render3d's deckOf
   reads it from the aft eighth of the plan.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. Every part
   is merged into one mesh per material (10 materials, 10 draw calls).
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMoskva = (function () {
  "use strict";
  var PI = Math.PI;
  var LOA = 189.0;
  var XS = -93.0;            /* transom, below the stern gallery            */
  var XFD0 = -94.5;          /* flight deck after edge                      */
  var XFD1 = -17.6;          /* flight deck forward edge = superstructure   */
  var XG = -82.5;            /* forward end of the open stern gallery       */
  var FD = 9.75;             /* flight deck top                             */
  var FDU = 9.0;             /* flight deck underside                       */
  var GAL = 4.6;             /* stern gallery floor                         */

  /* ------------------------------------------------------ hull tables
     xn: nominal station (stern -93 .. stem 94.5) */
  var HW = [[-93, 8.6], [-85, 10.0], [-70, 11.0], [-50, 11.5], [20, 11.5], [40, 11.2],
            [55, 10.2], [68, 8.2], [78, 5.6], [86, 2.8], [91, 0.9], [94.5, 0.0]];
  var HD = [[-93, 13.2], [-88, 16.6], [-82, 16.8], [-40, 16.8], [-18, 15.6], [0, 14.2],
            [22, 13.2], [40, 12.4], [55, 11.2], [68, 9.2], [78, 6.8], [86, 4.0],
            [91, 1.8], [94.5, 0.25]];
  var KZ = [[-93, -1.6], [-86, -3.8], [-78, -6.4], [-68, -7.7], [94.5, -7.7]];
  var BP = [[-93, 1.6], [-70, 2.6], [-40, 3.2], [30, 3.2], [60, 2.2], [80, 1.4], [94.5, 1.2]];
  var FL = [[-93, 2.2], [-40, 2.0], [0, 1.7], [40, 1.5], [94.5, 1.25]];
  function tab(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (x <= T[i][0]) {
      var a = T[i - 1], b = T[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * f;
    }
    return T[T.length - 1][1];
  }
  /* upper deck: flush at 9.7 m, sheer rising forward to 11.2 m at the stem */
  function deckZ(x) { return x <= 25 ? 9.7 : 9.7 + 1.5 * Math.pow((x - 25) / 69.5, 2); }
  /* reference height of the flare: the deck edge, or the flight deck underside aft */
  function zRef(xn) { return xn < XFD1 ? FDU : deckZ(xn); }
  /* the stem: raked above water, a rounded forefoot below */
  function xStem(z) {
    if (z >= 0) return 89.3 + 5.2 * Math.min(1, z / 11.2);
    return 89.3 - 9.3 * Math.pow(Math.min(1, -z / 7.7), 1.5);
  }
  function xAt(xn, z) { var u = (xn - XS) / (94.5 - XS); return XS + u * (xStem(z) - XS); }
  function sideY(xn, z) {
    var hw = tab(HW, xn), k = tab(KZ, xn);
    if (z <= 0) {
      var t = Math.max(0, Math.min(1, (z - k) / (0 - k))), p = tab(BP, xn);
      return hw * Math.pow(1 - Math.pow(1 - t, p), 1 / p);
    }
    var hd = tab(HD, xn), zr = zRef(xn);
    return hw + (hd - hw) * Math.pow(Math.min(1, z / zr), tab(FL, xn));
  }
  /* flight deck plan: half width at x (0.3 m proud of the hull, rounded stern) */
  function fdHalf(x) {
    var w = tab(HD, Math.max(-88, x)) + 0.3;
    if (x < -88) w = w * Math.sqrt(Math.max(0, 1 - Math.pow((x + 88) / 6.5, 2)));
    return w;
  }

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
    var g = cv.getContext("2d"), R = rng(1123), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.16; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.07;
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
  /* the flight deck, painted in plan: plating, weathering, the deck-edge
     line, centreline, the two lifts and the landing circles */
  var FDY = 17.4;
  function deckTex(THREE) {
    if (TEX.fd) return TEX.fd;
    var W = 1024, H = 464, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d"), R = rng(6767), i, x, y;
    var px = function (X) { return (X - XFD0) / (XFD1 - XFD0) * W; };
    var py = function (Y) { return (1 - (Y + FDY) / (2 * FDY)) * H; };
    var sm = W / (XFD1 - XFD0);
    g.fillStyle = "#a3a49e"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
    for (y = -16; y <= 16; y += 2) { g.beginPath(); g.moveTo(0, py(y)); g.lineTo(W, py(y)); g.stroke(); }
    for (x = -94; x < -18; x += 6) { g.beginPath(); g.moveTo(px(x), 0); g.lineTo(px(x), H); g.stroke(); }
    g.globalAlpha = 0.07;
    for (i = 0; i < 70; i++) {
      g.fillStyle = R() < 0.55 ? "#000000" : "#ffffff";
      g.fillRect(R() * W, R() * H, 10 + R() * 70, 6 + R() * 30);
    }
    g.globalAlpha = 1;
    /* lifts: two on the centreline, 16.5 x 4.5 m */
    [[-38.5, -22.0], [-66.0, -49.5]].forEach(function (L) {
      g.fillStyle = "#8a8c88"; g.fillRect(px(L[0]), py(2.25), (L[1] - L[0]) * sm, 4.5 * sm);
      g.strokeStyle = "#e6e6df"; g.lineWidth = 3; g.strokeRect(px(L[0]), py(2.25), (L[1] - L[0]) * sm, 4.5 * sm);
    });
    /* centreline dashes */
    g.fillStyle = "#e6e6df";
    for (x = -93; x < -20; x += 4) if (!(x > -67 && x < -49) && !(x > -39.5 && x < -21)) g.fillRect(px(x), py(0.15), 2.2 * sm, 0.3 * sm);
    /* landing circles */
    g.strokeStyle = "#e6e6df"; g.lineWidth = 4;
    [[-84, 0], [-58, -8.5], [-30, 8.5]].forEach(function (c) {
      g.beginPath(); g.arc(px(c[0]), py(c[1]), 3.2 * sm, 0, PI * 2); g.stroke();
      g.fillRect(px(c[0]) - 1.6 * sm, py(c[1]) - 0.15 * sm, 3.2 * sm, 0.3 * sm);
    });
    /* deck-edge line, inset 0.7 m */
    g.lineWidth = 3; g.beginPath();
    for (x = XFD1; x >= XFD0 + 0.8; x -= 1) { var yy = fdHalf(x) - 0.7; if (yy < 0) continue; g.lineTo(px(x), py(yy)); }
    for (x = XFD0 + 0.8; x <= XFD1; x += 1) { var y2 = fdHalf(x) - 0.7; if (y2 < 0) continue; g.lineTo(px(x), py(-y2)); }
    g.stroke();
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX.fd = t; return t;
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
      hull:  skin(0x8a9297, plateTex(THREE, [16, 1.2]), 0.86),
      boot:  skin(0x111315, plateTex(THREE, [16, 1]), 0.9),
      under: skin(0x2a1712, plateTex(THREE, [10, 2]), 0.9),
      sup:   skin(0xa4abb1, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(0x7a8084, plateTex(THREE, [12, 1.5]), 0.95),
      fdeck: skin(0xffffff, deckTex(THREE), 0.93),
      dark:  skin(0x0b0d0f, plateTex(THREE, [2, 2]), 0.9),
      team:  skin(team, plateTex(THREE, [1, 1]), 0.84),
      metal: metal(0x5b6268, 0.52, 0.55),
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
  function geoMesh(THREE, pos, idx, uv, m) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, m);
  }
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
  /* a block from its bottom rectangle (x0a..x1a, |y| <= ya, z = za) to its
     top rectangle (x0b..x1b, |y| <= yb, z = zb) */
  function hexa(THREE, p, m, x0a, x1a, ya, za, x0b, x1b, yb, zb) {
    var V = [[x0a, -ya, za], [x1a, -ya, za], [x1a, ya, za], [x0a, ya, za],
             [x0b, -yb, zb], [x1b, -yb, zb], [x1b, yb, zb], [x0b, yb, zb]];
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]]; pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.12, v[1] * 0.12);
      else if (i < 8) uv.push(v[0] * 0.12, v[2] * 0.12);
      else uv.push(v[1] * 0.12, v[2] * 0.12);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    var mm = new THREE.Mesh(g, m); p.add(mm); return mm;
  }
  function tprism(THREE, p, lx0, ly0, lx1, ly1, lz, m, x, y, z) {
    var mm = hexa(THREE, p, m, -lx0 / 2, lx0 / 2, ly0 / 2, -lz / 2, -lx1 / 2, lx1 / 2, ly1 / 2, lz / 2);
    mm.position.set(x, y, z); return mm;
  }

  /* --------------------------------------------------------------- hull
     strips of one hull piece: each strip runs between two heights at every
     station, sampled at the given fractions; both sides, and an end cap at
     the first station when asked */
  function hullStrip(THREE, m, xs, zA, zB, F, cap) {
    var pos = [], uv = [], idx = [], n = F.length, i, j, s, xn, z, base;
    for (s = 0; s < 2; s++) {
      var sg = s === 0 ? 1 : -1;
      base = pos.length / 3;
      for (i = 0; i < xs.length; i++) {
        xn = xs[i];
        var a = zA(xn), b = zB(xn);
        for (j = 0; j < n; j++) {
          z = a + (b - a) * F[j];
          pos.push(xAt(xn, z), sg * sideY(xn, z), z);
          uv.push(xn / 12, z / 12);
        }
      }
      for (i = 0; i < xs.length - 1; i++) for (j = 0; j < n - 1; j++) {
        var A = base + i * n + j, B = A + 1, Cc = A + n, D = Cc + 1;
        if (sg > 0) idx.push(A, B, Cc, B, D, Cc); else idx.push(A, Cc, B, B, Cc, D);
      }
    }
    if (cap) {
      xn = xs[0]; base = pos.length / 3;
      var a0 = zA(xn), b0 = zB(xn);
      for (j = 0; j < n; j++) {
        z = a0 + (b0 - a0) * F[j]; var y = sideY(xn, z), xx = xAt(xn, z);
        pos.push(xx, y, z, xx, -y, z); uv.push(y / 12, z / 12, -y / 12, z / 12);
      }
      for (j = 0; j < n - 1; j++) {
        var P0 = base + 2 * j, S0 = P0 + 1, P1 = P0 + 2, S1 = P0 + 3;
        idx.push(P0, S0, P1, S0, S1, P1);
      }
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }
  var FU = [0, 0.02, 0.06, 0.13, 0.25, 0.42, 0.62, 0.82, 1.0];
  var FB = [0, 1];
  var FT = [0, 0.17, 0.34, 0.5, 0.66, 0.83, 1.0];
  function hullPiece(THREE, g, T, xs, top, cap) {
    var kz = function (xn) { return tab(KZ, xn); };
    g.add(hullStrip(THREE, T.under, xs, kz, function () { return -0.45; }, FU, cap));
    g.add(hullStrip(THREE, T.boot, xs, function () { return -0.45; }, function () { return 0.55; }, FB, cap));
    g.add(hullStrip(THREE, T.hull, xs, function () { return 0.55; }, top, FT, cap));
  }
  /* a flat deck ribbon over a run of stations at the hull's own edge */
  function ribbon(THREE, m, xs, zf, inset, NC) {
    var pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < xs.length; i++) {
      var xn = xs[i], z = zf(xn), w = Math.max(0.05, sideY(xn, z) - inset), x = xAt(xn, z);
      for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 10, w * (1 - 2 * j / NC) / 10); }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }

  /* ---------------------------------------------------- the flight deck */
  function flightDeck(THREE, g, T) {
    var out = [], x, i;
    /* the sides are straight between the HD stations: only those points, no collinear slivers */
    [XFD1, -18, -40, -82].forEach(function (q) { out.push([q, fdHalf(q)]); });
    for (i = 0; i <= 14; i++) {
      var a = i / 14 * PI / 2;                       /* round the stern */
      out.push([-88 - 6.5 * Math.sin(a), fdHalf(-88) * Math.cos(a)]);
    }
    for (i = 13; i >= 0; i--) {
      var b = i / 14 * PI / 2;
      out.push([-88 - 6.5 * Math.sin(b), -fdHalf(-88) * Math.cos(b)]);
    }
    [-88, -82, -40, -18, XFD1].forEach(function (q) { out.push([q, -fdHalf(q)]); });
    /* drop near-duplicates */
    var P = [];
    out.forEach(function (q) { var l = P[P.length - 1]; if (!l || Math.abs(l[0] - q[0]) + Math.abs(l[1] - q[1]) > 0.05) P.push(q); });
    var sh = new THREE.Shape();
    sh.moveTo(P[0][0], P[0][1]);
    for (i = 1; i < P.length; i++) sh.lineTo(P[i][0], P[i][1]);
    sh.closePath();
    /* top: flat plate at FD, UV over the plan box for the painted deck */
    var top = new THREE.ShapeGeometry(sh), pa = top.attributes.position, uv = [];
    for (i = 0; i < pa.count; i++) {
      uv.push((pa.getX(i) - XFD0) / (XFD1 - XFD0), (pa.getY(i) + FDY) / (2 * FDY));
      pa.setZ(i, FD);
    }
    top.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    top.computeVertexNormals();
    g.add(new THREE.Mesh(top, T.fdeck));
    /* underside, facing down */
    var bot = new THREE.ShapeGeometry(sh), pb = bot.attributes.position;
    for (i = 0; i < pb.count; i++) pb.setZ(i, FDU);
    var ix = bot.index.array;
    for (i = 0; i < ix.length; i += 3) { var t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; }
    bot.computeVertexNormals();
    g.add(new THREE.Mesh(bot, T.sup));
    /* fascia all round */
    var pos = [], uu = [], idx = [];
    for (i = 0; i < P.length; i++) {
      var p0 = P[i], p1 = P[(i + 1) % P.length], k = pos.length / 3;
      pos.push(p0[0], p0[1], FDU, p1[0], p1[1], FDU, p1[0], p1[1], FD, p0[0], p0[1], FD);
      uu.push(0, 0, 1, 0, 1, 0.1, 0, 0.1);
      idx.push(k, k + 1, k + 2, k, k + 2, k + 3);
    }
    g.add(geoMesh(THREE, pos, idx, uu, T.hull));
    /* deck-edge safety netting: outriggers below the deck top along both sides */
    var np = [], nu = [], ni = [];
    for (var s = -1; s <= 1; s += 2) {
      var b0 = np.length / 3, xs = [];
      for (x = -86; x <= -20; x += 3) xs.push(x);
      xs.forEach(function (xx) {
        var w = fdHalf(xx);
        np.push(xx, s * (w + 0.05), FD - 0.45, xx, s * (w + 1.2), FD - 0.75);
        nu.push(xx / 6, 0, xx / 6, 1);
      });
      for (i = 0; i < xs.length - 1; i++) {
        var A = b0 + 2 * i, B = A + 1, Cc = A + 2, D = A + 3;
        if (s > 0) ni.push(A, Cc, B, B, Cc, D); else ni.push(A, B, Cc, B, D, Cc);
      }
    }
    g.add(geoMesh(THREE, np, ni, nu, T.metal));
    return P;
  }

  /* ------------------------------------------------------------- weapons */
  /* twin-arm launcher, at rest trained forward with the arms level
     (SA-N-3 M-11 Shtorm and SUW-N-1 RPK-1 share the layout) */
  function twinArm(THREE, g, T, armLen, panels) {
    cylZ(THREE, g, 1.0, 1.15, 1.8, 12, T.sup, 0, 0, 0.9);
    tprism(THREE, g, 2.0, 2.0, 1.7, 1.8, 1.0, T.sup, 0, 0, 2.3);
    box(THREE, g, 1.4, 3.4, 0.7, T.sup, 0.2, 0, 3.1);
    for (var s = -1; s <= 1; s += 2) {
      box(THREE, g, armLen, 0.4, 0.5, T.sup, armLen * 0.38, s * 1.35, 3.75);
      box(THREE, g, armLen * 0.85, 0.16, 0.2, T.metal, armLen * 0.36, s * 1.35, 3.4);
      box(THREE, g, 0.6, 0.5, 0.6, T.dark, armLen * 0.38 + armLen * 0.5 - 0.3, s * 1.35, 3.75);
      if (panels) {
        var pn = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.0, 0.35), T.sup);
        pn.position.set(0.4, s * 3.7, 0.55); pn.rotation.x = -s * 0.32; g.add(pn);
      }
    }
    return g;
  }
  /* RBU-6000: twelve barrels in a ring on a trained cradle, forward */
  function rbu(THREE, g, T) {
    cylZ(THREE, g, 0.7, 0.85, 1.2, 10, T.sup, 0, 0, 0.6);
    box(THREE, g, 1.2, 1.9, 1.0, T.sup, -0.2, 0, 1.6);
    for (var i = 0; i < 12; i++) {
      var a = i / 12 * PI * 2;
      cylX(THREE, g, 0.11, 0.11, 1.7, 6, T.metal, 0.4, Math.cos(a) * 0.55, 2.7 + Math.sin(a) * 0.55);
    }
    cylX(THREE, g, 0.3, 0.3, 1.2, 8, T.sup, 0.1, 0, 2.7);
    return g;
  }
  /* twin 57 mm AK-725: domed turret, two barrels */
  function ak725(THREE, g, T) {
    cylZ(THREE, g, 1.55, 1.65, 0.5, 14, T.sup, 0, 0, 0.25);
    var dg = new THREE.SphereGeometry(1.5, 14, 6, 0, PI * 2, 0, PI / 2); dg.rotateX(PI / 2); dg.scale(1.15, 1, 0.85);
    var d = new THREE.Mesh(dg, T.sup); d.position.set(0, 0, 0.5); g.add(d);
    for (var s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.09, 0.09, 3.6, 6, T.metal, 3.0, s * 0.35, 1.05, true);
      cylX(THREE, g, 0.16, 0.16, 0.6, 6, T.metal, 1.45, s * 0.35, 1.05);
    }
    return g;
  }
  /* SA-N-3 director: pedestal, cabin, two large and two small dishes */
  function director(THREE, g, T, ped) {
    cylZ(THREE, g, 0.9, 1.1, ped, 12, T.sup, 0, 0, ped / 2);
    box(THREE, g, 2.8, 3.0, 2.0, T.sup, -0.3, 0, ped + 1.0);
    for (var s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 1.5, 0.55, 0.7, 14, T.sup, 1.4, s * 1.75, ped + 1.6);
      cylX(THREE, g, 0.65, 0.3, 0.45, 10, T.sup, 1.2, s * 0.75, ped + 2.75);
      box(THREE, g, 0.5, 0.18, 0.18, T.metal, 2.0, s * 1.75, ped + 1.6);
    }
    return g;
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, z;

    /* ---------------- hull: the stern below the gallery, then the main body */
    var aftXs = [-93, -91.5, -89.5, -87, -84.5, -82.5];
    hullPiece(THREE, g, T, aftXs, function () { return GAL; }, true);
    var mainXs = [-82.5, -80, -76, -70, -62, -54, -46, -38, -30, -24, -17.8, -17.4, -10, -2, 6, 14, 22,
                  30, 38, 46, 54, 61, 67, 72, 76, 80, 83.5, 86.5, 89, 91, 92.6, 93.7, 94.5];
    hullPiece(THREE, g, T, mainXs, zRef, true);
    /* the stern gallery floor and the forecastle and waist deck */
    g.add(ribbon(THREE, T.deck, aftXs, function () { return GAL + 0.02; }, 0.02, 3));
    var fx = [];
    for (x = -17.6; x < 93.7; x += 3) fx.push(x);
    fx.push(93.7, 94.4);
    g.add(ribbon(THREE, T.deck, fx, function (xn) { return deckZ(xn) + 0.04; }, 0.03, 4));

    /* ---------------- flight deck (nothing stands on it) */
    flightDeck(THREE, g, T);

    /* stern gallery: posts under the deck's after edge, the towed-sonar gear */
    for (i = -4; i <= 4; i++) {
      var yy = i * 2.3, xp = -92.6 + Math.abs(i) * 0.15;
      strut(THREE, g, T.metal, xp, yy, GAL, xp, yy, FDU, 0.18, 6);
    }
    for (s = -1; s <= 1; s += 2) [-89.5, -86.0].forEach(function (xq) {
      strut(THREE, g, T.metal, xq, s * (sideY(xq, GAL) - 0.3), GAL, xq, s * (sideY(xq, GAL) - 0.3), FDU, 0.18, 6);
    });
    box(THREE, g, 4.2, 3.6, 2.4, T.sup, -88.0, 0, GAL + 1.2);
    cylX(THREE, g, 0.9, 0.9, 3.4, 12, T.dark, -90.2, 0, GAL + 1.6);
    box(THREE, g, 0.3, 5.0, 3.0, T.metal, -91.6, 0, GAL + 2.6);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -91.6, s * 2.4, GAL, -91.6, s * 2.4, GAL + 4.0, 0.12, 6);

    /* scuttles along both sides, and the hawse pipes */
    for (x = -78; x <= 84; x += 4.2) {
      if (x > -22 && x < -14) continue;
      for (s = -1; s <= 1; s += 2) box(THREE, g, 0.32, 0.06, 0.32, T.dark, xAt(x, 6.6), s * (sideY(x, 6.6) + 0.04), 6.6);
    }
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.9, 0.1, 0.9, T.dark, xAt(85.5, 8.6), s * (sideY(85.5, 8.6) + 0.02), 8.6);
    }

    /* ---------------- superstructure (stations off the 1986 profile) */
    /* S1 base block, two decks */
    hexa(THREE, g, T.sup, -17.6, 22.0, 8.0, 9.7, -17.6, 22.0, 8.0, 18.3);
    /* S2 tier with the bridge front */
    hexa(THREE, g, T.sup, -17.6, 15.1, 7.0, 18.3, -17.6, 15.1, 7.0, 21.0);
    /* S3 the pyramid: after face upright, forward face sloping back */
    hexa(THREE, g, T.sup, -17.6, 4.0, 6.6, 21.0, -17.4, -1.5, 3.8, 34.0);
    /* galleries round the pyramid */
    [25.0, 29.5].forEach(function (zz) {
      var f = (zz - 21) / 13, xf = 4.0 + (-1.5 - 4.0) * f, w = 6.6 + (3.8 - 6.6) * f;
      hexa(THREE, g, T.sup, -18.2, xf + 0.7, w + 0.7, zz - 0.15, -18.2, xf + 0.7, w + 0.7, zz + 0.1);
    });
    /* forward tower carrying the upper director */
    hexa(THREE, g, T.sup, 2.0, 10.0, 2.7, 21.0, 0.0, 9.2, 2.4, 30.6);
    /* uptake drum on top, with its dark mouth */
    var ug = new THREE.CylinderGeometry(1, 1, 4.6, 20, 1); ug.rotateX(PI / 2); ug.scale(4.0, 3.4, 1);
    var up = new THREE.Mesh(ug, T.sup); up.position.set(-13.5, 0, 35.4); g.add(up);
    var mg = new THREE.CircleGeometry(1, 20); mg.scale(3.6, 3.0, 1);
    var mouth = new THREE.Mesh(mg, T.dark); mouth.position.set(-13.5, 0, 37.72); g.add(mouth);
    /* bridge glazing and windows */
    box(THREE, g, 0.12, 12.4, 0.95, T.glass, 15.16, 0, 19.75);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 7.0, 0.12, 0.85, T.glass, 11.0, s * 7.04, 19.75);
      for (i = 0; i < 9; i++) box(THREE, g, 1.0, 0.08, 0.6, T.dark, -14 + i * 4.0, s * 8.03, 16.6);
      for (i = 0; i < 9; i++) box(THREE, g, 1.0, 0.08, 0.6, T.dark, -14 + i * 4.0, s * 8.03, 13.2);
    }
    for (i = 0; i < 6; i++) box(THREE, g, 0.08, 1.0, 0.6, T.dark, 22.03, -6.25 + i * 2.5, 16.6);
    /* doors at the foot of the after face (1982 and 1990 photographs) */
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.12, 3.6, 4.4, T.dark, -17.66, s * 3.6, FD + 2.2);
    /* S1 forward corners: sponsons for the two AK-725 */
    for (s = -1; s <= 1; s += 2) {
      hexa(THREE, g, T.sup, 16.5, 21.5, 2.0, 9.7, 16.5, 21.5, 2.0, 10.3).position.set(0, s * 10.6, 0);
      var gun = new THREE.Group(); gun.position.set(19.0, s * 10.8, 10.3); ak725(THREE, gun, T); g.add(gun);
    }
    /* four spherical radomes on the superstructure sides */
    for (s = -1; s <= 1; s += 2) [[7.0, 25.9], [7.0, 28.0]].forEach(function (q) {
      var f = (q[1] - 21) / 13, w = 6.6 + (3.8 - 6.6) * f;
      var sp = new THREE.Mesh(new THREE.SphereGeometry(0.95, 12, 8), T.sup);
      sp.position.set(q[0] - 7.5, s * (w + 1.0), q[1]); g.add(sp);
      box(THREE, g, 1.2, 1.2, 0.15, T.sup, q[0] - 7.5, s * (w + 0.6), q[1] - 0.9);
    });
    /* the two directors for the SA-N-3 */
    var d1 = new THREE.Group(); d1.position.set(18.5, 0, 18.3); director(THREE, d1, T, 4.5); g.add(d1);
    var d2 = new THREE.Group(); d2.position.set(6.4, 0, 30.6); director(THREE, d2, T, 1.6); g.add(d2);

    /* ---------------- lattice mast, Head Net, Top Sail */
    var LB = [[-10.6, -3.4], [-10.6, 3.4], [-4.2, -3.4], [-4.2, 3.4]];
    var mz0 = 34.0, mz1 = 47.0, TP = [[-8.0, -0.9], [-8.0, 0.9], [-5.6, -0.9], [-5.6, 0.9]];
    for (i = 0; i < 4; i++) strut(THREE, g, T.metal, LB[i][0], LB[i][1], mz0, TP[i][0], TP[i][1], mz1, 0.16, 5);
    var lev = function (f) { return [LB.map(function (b, k) { return [b[0] + (TP[k][0] - b[0]) * f, b[1] + (TP[k][1] - b[1]) * f, mz0 + (mz1 - mz0) * f]; })]; };
    [0.25, 0.5, 0.75].forEach(function (f) {
      var R4 = lev(f)[0], ring = [0, 2, 3, 1, 0];
      for (var k = 0; k < 4; k++) { var a = R4[ring[k]], b = R4[ring[k + 1]]; strut(THREE, g, T.metal, a[0], a[1], a[2], b[0], b[1], b[2], 0.07, 4); }
    });
    [[0, 2], [1, 3], [0, 1], [2, 3]].forEach(function (pr) {
      [0, 0.25, 0.5, 0.75].forEach(function (f) {
        var A = lev(f)[0], B = lev(f + 0.25)[0];
        strut(THREE, g, T.metal, A[pr[0]][0], A[pr[0]][1], A[pr[0]][2], B[pr[1]][0], B[pr[1]][1], B[pr[1]][2], 0.05, 3);
      });
    });
    box(THREE, g, 3.8, 3.0, 0.25, T.metal, -6.8, 0, mz1 + 0.1);
    box(THREE, g, 3.0, 3.6, 0.2, T.metal, -7.3, 0, 41.0);
    /* yard across the mast with small antenna posts at its ends */
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, -7.6, s * 1.6, 43.6, -7.6, s * 9.0, 43.6, 0.08, 4);
      strut(THREE, g, T.metal, -7.6, s * 1.6, 44.4, -7.6, s * 9.0, 43.8, 0.06, 4);
      strut(THREE, g, T.metal, -7.6, s * 9.0, 43.6, -7.6, s * 9.0, 45.0, 0.05, 4);
      strut(THREE, g, T.metal, -7.6, s * 5.0, 43.6, -7.6, s * 5.0, 44.4, 0.05, 4);
    }
    /* Head Net (MR-310 Angara) on a bracket on the mast front */
    box(THREE, g, 2.6, 1.6, 0.25, T.metal, -3.4, 0, 38.6);
    cylZ(THREE, g, 0.3, 0.35, 0.8, 8, T.metal, -2.3, 0, 39.1);
    box(THREE, g, 0.35, 5.6, 1.4, T.metal, -2.0, 0, 40.2);
    box(THREE, g, 0.9, 0.12, 0.12, T.metal, -1.4, 0, 40.2);
    /* Top Sail (MR-600 Voskhod): the big reflector at the masthead, leaning back */
    cylZ(THREE, g, 0.6, 0.8, 1.6, 10, T.metal, -6.8, 0, mz1 + 1.0);
    var ts = new THREE.Group(); ts.position.set(-5.8, 0, 51.0); ts.rotation.y = -0.5; g.add(ts);
    /* curved in elevation (a cylindrical reflector), concave forward, ribbed */
    for (i = 0; i < 4; i++) {
      var f0 = -0.5 + i * 0.25, fm = f0 + 0.125, RR = 9.0;
      var pnl = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.6, 2.3), T.metal);
      pnl.position.set(RR * (1 - Math.cos(fm)), 0, RR * Math.sin(fm)); pnl.rotation.y = fm; ts.add(pnl);
      var rib = new THREE.Mesh(new THREE.BoxGeometry(0.35, 4.7, 0.14), T.dark);
      rib.position.set(RR * (1 - Math.cos(f0 + 0.25)) - 0.08, 0, RR * Math.sin(f0 + 0.25)); rib.rotation.y = f0 + 0.25; ts.add(rib);
    }
    for (i = -1; i <= 1; i++) box(THREE, ts, 0.4, 0.16, 8.4, T.dark, -0.25, i * 1.9, 0);
    box(THREE, ts, 0.3, 4.4, 0.3, T.metal, 3.0, 0, -0.4);
    for (s = -1; s <= 1; s += 2) strut(THREE, ts, T.metal, 0.4, s * 2.1, -2.6, 3.0, s * 2.1, -0.4, 0.06, 4);
    strut(THREE, g, T.metal, -8.4, 0, mz1, -8.4, 0, 49.6, 0.08, 4);

    /* ---------------- forward: deckhouses and launchers */
    /* raised deckhouse with the after SA-N-3 */
    hexa(THREE, g, T.sup, 23.0, 35.5, 5.0, 9.7, 23.0, 35.0, 4.8, 14.3);
    var l3 = new THREE.Group(); l3.position.set(30.3, 0, 14.3); twinArm(THREE, l3, T, 6.0, true); g.add(l3);
    /* low deckhouse */
    hexa(THREE, g, T.sup, 35.8, 49.1, 4.0, deckZ(35.8), 36.2, 48.6, 3.7, 12.2);
    /* forward SA-N-3 on its magazine trunk */
    cylZ(THREE, g, 2.4, 2.6, 2.4, 16, T.sup, 52.1, 0, deckZ(52.1) + 1.2);
    var l2 = new THREE.Group(); l2.position.set(52.1, 0, deckZ(52.1) + 2.3); twinArm(THREE, l2, T, 6.0, true); g.add(l2);
    /* SUW-N-1 nearest the bow, longer arms, no side panels */
    cylZ(THREE, g, 2.0, 2.2, 0.8, 16, T.sup, 64.6, 0, deckZ(64.6) + 0.4);
    var l1 = new THREE.Group(); l1.position.set(64.6, 0, deckZ(64.6) + 0.3); twinArm(THREE, l1, T, 7.4, false); g.add(l1);
    /* the two RBU-6000 */
    [72.1, 83.4].forEach(function (xr) {
      var r = new THREE.Group(); r.position.set(xr, 0, deckZ(xr)); rbu(THREE, r, T); g.add(r);
    });
    /* capstans, bollards */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.55, 0.65, 0.7, 12, T.metal, 87.5, s * 1.7, deckZ(87.5) + 0.35);
      for (i = 0; i < 3; i++) cylZ(THREE, g, 0.22, 0.22, 0.6, 8, T.metal, 40 + i * 18, s * (sideY(40 + i * 18, deckZ(40 + i * 18)) - 1.0), deckZ(40 + i * 18) + 0.3);
    }
    /* jackstaff */
    strut(THREE, g, T.metal, 93.9, 0, deckZ(93.9), 93.9, 0, deckZ(93.9) + 3.0, 0.05, 4);

    /* working boats at the deck edge beside the raised deckhouse */
    for (s = -1; s <= 1; s += 2) {
      tprism(THREE, g, 7.4, 1.8, 8.5, 2.5, 1.1, T.sup, 30.0, s * 9.3, 11.1);
      box(THREE, g, 3.2, 1.9, 0.9, T.sup, 29.0, s * 9.3, 12.1);
      for (i = -1; i <= 1; i += 2) box(THREE, g, 0.4, 2.2, 0.8, T.metal, 30 + i * 2.6, s * 9.3, 10.2);
    }

    /* ---------------- railings: waist and forecastle edges */
    for (s = -1; s <= 1; s += 2) {
      var prev = null;
      for (x = -16.5; x <= 91.5; x += 3.6) {
        var zd = deckZ(x) + 0.04, yd = s * (sideY(x, deckZ(x)) - 0.15), xx = xAt(x, deckZ(x));
        strut(THREE, g, T.metal, xx, yd, zd, xx, yd, zd + 1.0, 0.04, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + 0.98, xx, yd, zd + 0.98, 0.025, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + 0.5, xx, yd, zd + 0.5, 0.02, 3);
        }
        prev = [xx, yd, zd];
      }
    }

    /* ---------------- underwater: two shafts and screws */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.32, 0.32, 20.0, 8, T.metal, -68.0, s * 4.6, -5.0);
      strut(THREE, g, T.metal, -74.0, s * 4.6, -5.0, -74.0, s * 3.0, -2.6, 0.14, 4);
      cylX(THREE, g, 0.45, 0.6, 0.9, 8, T.metal, -78.4, s * 4.6, -5.0);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.6, 1.7), T.metal);
        bl.position.set(-78.4, s * 4.6, -5.0); bl.rotation.x = i * PI / 2 + 0.4;
        bl.translateZ(1.0); bl.rotation.y = 0.45; g.add(bl);
      }
    }

    /* ---------------- team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 4.0, 1.2, 0.04, T.team, 42.4, 0, 12.22);
    box(THREE, g, 1.2, 4.0, 0.04, T.team, 25.2, 0, 14.32);
    box(THREE, g, 1.2, 4.0, 0.04, T.team, 12.6, 0, 21.02);

    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }

  /* One mesh per material: bake every mesh under root into merged geometry */
  function bake(THREE, root) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
      if (!geo.attributes.normal) geo.computeVertexNormals();
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
  return { build: build };
})();

UNIT_MODELS["pact_e60_carrier"] = {
  len: 189.0,
  build: function (THREE, M, C) { return HeroMoskva.build(THREE, M, C); }
};
