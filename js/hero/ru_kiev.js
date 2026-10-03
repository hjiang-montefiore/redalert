/* ==================== js/hero/ru_kiev.js ===============================
   HERO MODEL -- Project 1143.3 "Krechyet" heavy aviation cruiser
   NOVOROSSIYSK, as completed 1982 (third of the Kiev class).
   Key: pact_e80_carrier.  Length overall 273 m, waterline beam 32.6 m, flight
   deck beam about 49 m, draught drawn as 8.2 m (English Wikipedia
   "Kiev-class aircraft carrier": 273 m, beam 32.6 m; the 274 m scale bar of the
   profile below agrees).

   REFERENCES (Wikimedia Commons, fetched at 1000-1500 px; what each rests on):
     - "Kiev class aircraft carrier profile 1986.png" (starboard recognition
       silhouette, 274 m scale bar): every station and height was scaled off it
       at 5.8 px/m, waterline at the hull bottom - flight deck level about
       12.6 m, forecastle 14.5 m rising to 15.8 m at the stem, the raked stem,
       the island's stepped tiers (17.2, 18.8, 24.5, 26.7 m, tower 34.5 m, a
       lower forward block 27 -> 18.5 m), the raked uptake on the after part of
       the tower, the ball-topped tripod mast, the forward mast with the planar
       Head-Net-type antenna, two radar posts on the island roofs, the dish
       mounts at x -33 and +64 (taken as the two twin-arm M-11 launchers, the
       published fit puts one fore and one aft of the superstructure), the
       pedestal mount at +101 (taken as the SUW-N-1), the forecastle deckhouse
       and its mast, the open hangar/gallery recess in the hull side aft.
     - "Kiev-class Novorossiysk DD-ST-85-06598 r.jpg" (USN 1985, from ahead
       to starboard): island to starboard, the angled deck to port running
       from the stern to forward of the island with its centreline, edge lines
       and landing circles in pale lines on dark deck, the leading-edge
       fairing at the deck's forward end, four twin P-500 tube boxes in pairs
       on the forecastle with low blast walls, a white domed twin mount and a
       post with dish forward, deck-edge nets, the island's galleries and
       radomes, light grey hull and island, brownish forecastle deck.
       PAINT sampled from it (the print is washed out; hull and island are
       drawn a little darker than the sampled 0xd2dde2 / 0xc6cdce).
     - "Kiev-class Novorossiysk DN-SN-86-06938 r.jpg" (USN 1986, port side
       amidships): the two masts (ball on a tripod, the planar antenna mast
       forward of it), the dish to starboard of them, the sponson under the
       angled deck, the island's windows, the weapon cluster on its forward
       starboard corner, a Ka-27 on the deck.
     - "Project 1143 carrier simple drawing.png": plan of the angled deck and the
       forecastle order (launcher boxes, a mount and a pedestal forward).
     - English Wikipedia "Kiev-class aircraft carrier" and "Soviet aircraft
       carrier Novorossiysk": 4 twin P-500 Bazalt, 2 twin M-11 Shtorm, 2 AK-726,
       8 AK-630 in pairs at the corners, one SUW-N-1; angled deck 2/3 of the
       length; aerodynamic fairing and fences on the deck's leading edge added to
       Novorossiysk shortly after commissioning (the 1985 photograph shows it, so
       it is drawn).

   WHAT DIFFERS ON NOVOROSSIYSK (Project 11433) FROM KIEV AND MINSK:
   NO 9K33 Osa-M (SA-N-4) launchers, and no reload bunker and crane for the
   Bazalt missiles - so neither is drawn; the leading-edge fairing is fitted.

   NOT CONFIRMED and therefore not drawn or drawn plainly: the two aircraft
   lifts (no reference I could read showed their outline - nothing is painted
   for them), the torpedo tubes, hangar doors, the ship's boats, the numbers
   of rudders (not drawn), the identity of the small island antennas (drawn
   as plain dishes), and the exact athwartships position of the mounts and of
   the AK-630 pairs (the profile gives only x and height). No hull number,
   name or ensign.

   NO TRAINED MOUNT: the row has no turret flag, so nothing is named "turret";
   every launcher and gun is baked, at rest pointing forward.
   FLIGHT DECK: one clean flat plate, top at z = 12.6, from the stern to
   x = +26 (the angled port edge runs out to a 49 m overall beam), nothing
   stands on it (markings are painted into its texture); the island is at its
   starboard side, no deck-edge gear above the surface.  render3d's deckOf
   reads it from the aft eighth of the plan.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  Every part
   is merged into one mesh per material (10 materials, 10 draw calls).
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKiev = (function () {
  "use strict";
  var PI = Math.PI;
  var LOA = 273.0;
  var XS = -136.5, XB = 136.5;     /* nominal stern and stem                  */
  var FD = 12.6;                   /* flight deck top                         */
  var FDU = 11.7;                  /* flight deck underside                   */
  var XFD1 = 26.0;                 /* forward end of the flat deck            */
  var XD0 = -137.0, XD1 = 38.0, YD0 = -18.2, YD1 = 32.0; /* plan box of the painted deck */

  var HW = [[-136.5, 8.0], [-128, 12.4], [-115, 15.3], [-95, 16.3], [40, 16.3], [60, 15.5],
            [80, 13.0], [100, 9.2], [115, 4.8], [125, 2.0], [136.5, 0.0]];
  var HD = [[-136.5, 11.2], [-128, 15.4], [-115, 17.3], [-90, 17.8], [30, 17.8], [55, 17.4],
            [80, 15.6], [100, 12.0], [115, 7.4], [128, 3.0], [136.5, 0.4]];
  var KZ = [[-136.5, -2.0], [-122, -5.6], [-105, -8.2], [105, -8.2], [125, -6.0], [136.5, -3.0]];
  var BP = [[-136.5, 1.6], [-110, 2.6], [-60, 3.2], [60, 3.2], [100, 2.0], [136.5, 1.2]];
  var FL = [[-136.5, 1.9], [-60, 1.8], [0, 1.6], [60, 1.45], [136.5, 1.25]];
  function tab(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (x <= T[i][0]) {
      var a = T[i - 1], b = T[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * f;
    }
    return T[T.length - 1][1];
  }
  /* flight deck level to x = 26, a rise (the leading-edge fairing) to the
     forecastle at 14.5, then the sheer to 15.8 at the stem */
  function deckZ(x) {
    if (x <= XFD1) return FD;
    if (x < 38) { var f = (x - XFD1) / (38 - XFD1); return FD + (14.5 - FD) * f * f * (3 - 2 * f); }
    if (x <= 90) return 14.5;
    return 14.5 + 1.3 * Math.pow((x - 90) / 46.5, 2);
  }
  function xStemAt(z) {
    if (z >= 0) return 118.0 + 18.5 * Math.min(1, z / 15.8);
    return 118.0 - 10.0 * Math.pow(Math.min(1, -z / 8.2), 1.5);
  }
  function xSternAt(z) {
    if (z >= 0) return -133.3 - 3.2 * Math.min(1, z / 12.6);
    return -133.3 + 14.0 * Math.pow(Math.min(1, -z / 8.2), 1.6);
  }
  function xAt(xn, z) {
    var u = (xn - XS) / (XB - XS), a = xSternAt(z), b = xStemAt(z);
    return a + u * (b - a);
  }
  function sideY(xn, z) {
    var hw = tab(HW, xn), k = tab(KZ, xn);
    if (z <= 0) {
      var t = Math.max(0, Math.min(1, (z - k) / (0 - k))), p = tab(BP, xn);
      return hw * Math.pow(1 - Math.pow(1 - t, p), 1 / p);
    }
    var hd = tab(HD, xn), zr = deckZ(xn);
    return hw + (hd - hw) * Math.pow(Math.min(1, z / zr), tab(FL, xn));
  }
  /* angled port edge of the flight deck */
  function portEdge(x) { return 17.5 + 0.0958 * (x + 120); }

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
    var g = cv.getContext("2d"), R = rng(1143), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.14; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.06;
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
  /* the flight deck in plan: dark plating, weathering, the edge lines and the
     dashed centreline of the angled strip and its landing circles, in pale
     paint, no numbers or letters */
  function deckTex(THREE) {
    if (TEX.fd) return TEX.fd;
    var W = 1400, H = 400, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d"), R = rng(7311), i, x;
    var sx = W / (XD1 - XD0), sy = H / (YD1 - YD0);
    var px = function (X) { return (X - XD0) * sx; };
    var py = function (Y) { return (1 - (Y - YD0) / (YD1 - YD0)) * H; };
    g.fillStyle = "#575b5f"; g.fillRect(0, 0, W, H);   /* deck reads dark grey (sampled 0x5a5a5e in the 1985 photograph) */
    g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
    for (x = -136; x < 38; x += 6) { g.beginPath(); g.moveTo(px(x), 0); g.lineTo(px(x), H); g.stroke(); }
    for (i = -18; i <= 32; i += 2) { g.beginPath(); g.moveTo(0, py(i)); g.lineTo(W, py(i)); g.stroke(); }
    g.globalAlpha = 0.08;
    for (i = 0; i < 120; i++) {
      g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff";
      g.fillRect(R() * W, R() * H, 10 + R() * 70, 5 + R() * 24);
    }
    g.globalAlpha = 1;
    var pale = "#e8e8e2";
    var axis = function (X) { return portEdge(X) - 10.35; };
    /* edge lines of the angled strip */
    g.strokeStyle = pale; g.lineWidth = 0.4 * sx;
    [-0.6, -20.1].forEach(function (o) {
      g.beginPath();
      for (x = -122; x <= 26; x += 2) { var yy = portEdge(x) + o; if (x === -122) g.moveTo(px(x), py(yy)); else g.lineTo(px(x), py(yy)); }
      g.stroke();
    });
    /* dashed centreline */
    g.lineWidth = 0.35 * sx;
    for (x = -126; x < 22; x += 5) {
      g.beginPath(); g.moveTo(px(x), py(axis(x))); g.lineTo(px(x + 3), py(axis(x + 3))); g.stroke();
    }
    /* landing circles with a cross-bar */
    g.lineWidth = 0.45 * sx;
    [-112, -88, -64, -40, -16, 8].forEach(function (cx) {
      var cy = axis(cx);
      g.beginPath(); g.ellipse(px(cx), py(cy), 3.6 * sx, 3.6 * sy, 0, 0, PI * 2); g.stroke();
      g.beginPath(); g.moveTo(px(cx - 3.6), py(cy)); g.lineTo(px(cx + 3.6), py(cy)); g.stroke();
    });
    /* deck-edge line along the starboard side */
    g.lineWidth = 0.3 * sx;
    g.beginPath(); g.moveTo(px(-120), py(-17.0)); g.lineTo(px(26), py(-17.0)); g.stroke();
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
      hull:  skin(0xa6aeb2, plateTex(THREE, [24, 1.2]), 0.86),
      boot:  skin(0x1d2022, plateTex(THREE, [24, 1]), 0.9),
      under: skin(0x3a1e18, plateTex(THREE, [14, 2]), 0.9),
      sup:   skin(0xb4babd, plateTex(THREE, [3, 2]), 0.86),
      deck:  skin(0x786a68, plateTex(THREE, [14, 2]), 0.95),
      fdeck: skin(0xffffff, deckTex(THREE), 0.93),
      dark:  skin(0x0b0d0f, plateTex(THREE, [2, 2]), 0.9),
      team:  skin(team, plateTex(THREE, [1, 1]), 0.84),
      metal: metal(0x5e656b, 0.52, 0.55),
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
  /* a block from its bottom rectangle (x0a..x1a, y0a..y1a at z = za) to its
     top rectangle (x0b..x1b, y0b..y1b at z = zb); y not symmetric */
  function hexy(THREE, p, m, x0a, x1a, y0a, y1a, za, x0b, x1b, y0b, y1b, zb) {
    var V = [[x0a, y0a, za], [x1a, y0a, za], [x1a, y1a, za], [x0a, y1a, za],
             [x0b, y0b, zb], [x1b, y0b, zb], [x1b, y1b, zb], [x0b, y1b, zb]];
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
  /* upright block x0..x1, y0..y1, z0..z1 */
  function blk(THREE, p, m, x0, x1, y0, y1, z0, z1) {
    return hexy(THREE, p, m, x0, x1, y0, y1, z0, x0, x1, y0, y1, z1);
  }
  function tprism(THREE, p, lx0, ly0, lx1, ly1, lz, m, x, y, z) {
    var mm = hexy(THREE, p, m, -lx0 / 2, lx0 / 2, -ly0 / 2, ly0 / 2, -lz / 2, -lx1 / 2, lx1 / 2, -ly1 / 2, ly1 / 2, lz / 2);
    mm.position.set(x, y, z); return mm;
  }

  /* --------------------------------------------------------------- hull */
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
    var P = [], i, x;
    P.push([37, 19.5], [31, 27.5], [24, 31.3]);
    [0, -40, -80, -118].forEach(function (q) { P.push([q, portEdge(q)]); });
    var sx = [-124, -128, -131.5, -134.5, -136.4];
    sx.forEach(function (q) { P.push([q, tab(HD, q) + 0.3]); });
    P.push([-136.9, 0]);
    for (i = sx.length - 1; i >= 0; i--) P.push([sx[i], -(tab(HD, sx[i]) + 0.3)]);
    P.push([-118, -18.1], [-60, -18.1], [0, -18.1], [XFD1, -18.1]);
    P.push([XFD1, 18.1]);
    var Q = [];
    P.forEach(function (q) { var l = Q[Q.length - 1]; if (!l || Math.abs(l[0] - q[0]) + Math.abs(l[1] - q[1]) > 0.05) Q.push(q); });
    var sh = new THREE.Shape();
    sh.moveTo(Q[0][0], Q[0][1]);
    for (i = 1; i < Q.length; i++) sh.lineTo(Q[i][0], Q[i][1]);
    sh.closePath();
    var top = new THREE.ShapeGeometry(sh), pa = top.attributes.position, uv = [];
    for (i = 0; i < pa.count; i++) {
      uv.push((pa.getX(i) - XD0) / (XD1 - XD0), (pa.getY(i) - YD0) / (YD1 - YD0));
      pa.setZ(i, FD);
    }
    top.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    top.computeVertexNormals();
    g.add(new THREE.Mesh(top, T.fdeck));
    var bot = new THREE.ShapeGeometry(sh), pb = bot.attributes.position;
    for (i = 0; i < pb.count; i++) pb.setZ(i, FDU);
    var ix = bot.index.array;
    for (i = 0; i < ix.length; i += 3) { var t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; }
    bot.computeVertexNormals();
    g.add(new THREE.Mesh(bot, T.sup));
    var pos = [], uu = [], idx = [];
    for (i = 0; i < Q.length; i++) {
      var p0 = Q[i], p1 = Q[(i + 1) % Q.length], k = pos.length / 3;
      pos.push(p0[0], p0[1], FDU, p1[0], p1[1], FDU, p1[0], p1[1], FD, p0[0], p0[1], FD);
      uu.push(0, 0, 1, 0, 1, 0.1, 0, 0.1);
      idx.push(k, k + 1, k + 2, k, k + 2, k + 3);
    }
    g.add(geoMesh(THREE, pos, idx, uu, T.hull));

    /* the sponson under the angled deck: a sloping soffit from the hull side
       up to the deck's edge, and the bracing under it */
    var sp = [], su = [], si = [], xs = [];
    for (x = -118; x <= 36; x += 6) xs.push(x);
    var edgeAt = function (xx) { return xx > 24 ? 31.3 - (xx - 24) * 0.9 : portEdge(xx); };
    xs.forEach(function (xx) {
      var e = edgeAt(xx), h = tab(HD, xx);
      sp.push(xx, h, 7.6, xx, e, FDU);
      su.push(xx / 8, 0, xx / 8, 1);
    });
    for (i = 0; i < xs.length - 1; i++) {
      var A = 2 * i, B = A + 1, Cc = A + 2, D = A + 3;
      si.push(A, B, Cc, B, D, Cc);
    }
    /* orient the soffit down and out */
    var sg = geoMesh(THREE, sp, si, su, T.hull), na = sg.geometry.attributes.normal;
    if (na.getZ(0) > 0) {
      var ia = sg.geometry.index.array;
      for (i = 0; i < ia.length; i += 3) { var tt = ia[i + 1]; ia[i + 1] = ia[i + 2]; ia[i + 2] = tt; }
      sg.geometry.computeVertexNormals();
    }
    g.add(sg);
    for (x = -112; x <= 30; x += 7) {
      var e2 = edgeAt(x), h2 = tab(HD, x);
      strut(THREE, g, T.metal, x, h2 + 0.1, 8.2, x, e2 - 0.3, FDU, 0.16, 5);
      strut(THREE, g, T.metal, x, h2 + 0.1, 11.4, x, e2 - 0.3, FDU, 0.1, 4);
    }

    /* deck-edge safety nets: outriggers dropped below the deck top, both edges */
    var np = [], nu = [], ni = [];
    for (var s = -1; s <= 1; s += 2) {
      var b0 = np.length / 3, nx = [];
      for (x = -128; x <= 22; x += 3) nx.push(x);
      nx.forEach(function (xx) {
        var w = s > 0 ? edgeAt(xx) : tab(HD, xx) + 0.3;
        np.push(xx, s * (s > 0 ? w : w) , FD - 0.4, xx, s * (w + 1.15), FD - 0.8);
        nu.push(xx / 6, 0, xx / 6, 1);
      });
      for (i = 0; i < nx.length - 1; i++) {
        var A2 = b0 + 2 * i, B2 = A2 + 1, C2 = A2 + 2, D2 = A2 + 3;
        if (s > 0) ni.push(A2, C2, B2, B2, C2, D2); else ni.push(A2, B2, C2, B2, D2, C2);
      }
    }
    g.add(geoMesh(THREE, np, ni, nu, T.metal));
  }

  /* ------------------------------------------------------------- weapons */
  /* twin-arm launcher at rest, arms level and forward (M-11 Shtorm, SUW-N-1) */
  function twinArm(THREE, g, T, armLen, panels) {
    cylZ(THREE, g, 1.0, 1.15, 1.8, 12, T.sup, 0, 0, 0.9);
    tprism(THREE, g, 2.0, 2.0, 1.7, 1.8, 1.0, T.sup, 0, 0, 2.3);
    box(THREE, g, 1.4, 3.4, 0.7, T.sup, 0.2, 0, 3.1);
    for (var s = -1; s <= 1; s += 2) {
      box(THREE, g, armLen, 0.4, 0.5, T.sup, armLen * 0.38, s * 1.35, 3.75);
      box(THREE, g, armLen * 0.85, 0.16, 0.2, T.metal, armLen * 0.36, s * 1.35, 3.4);
      box(THREE, g, 0.6, 0.5, 0.6, T.dark, armLen * 0.38 + armLen * 0.5 - 0.3, s * 1.35, 3.75);
      if (panels) {
        var pn = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.8, 0.3), T.sup);
        pn.position.set(0.4, s * 3.4, 0.5); pn.rotation.x = -s * 0.3; g.add(pn);
      }
    }
    return g;
  }
  /* twin P-500 Bazalt: two big tubes side by side in a cradle, raised forward
     at a fixed angle, a blast wall behind */
  function bazalt(THREE, g, T) {
    var cr = new THREE.Group(); cr.position.set(-4.6, 0, 1.5); cr.rotation.y = -0.27; g.add(cr);
    var s;
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, cr, 0.82, 0.82, 9.6, 14, T.sup, 4.8, s * 1.0, 0.0);
      cylX(THREE, cr, 0.86, 0.86, 0.5, 14, T.metal, 9.4, s * 1.0, 0.0);
      cylX(THREE, cr, 0.84, 0.84, 0.3, 14, T.dark, 9.7, s * 1.0, 0.0);
      cylX(THREE, cr, 0.9, 0.9, 0.35, 14, T.metal, 1.5, s * 1.0, 0.0);
      cylX(THREE, cr, 0.9, 0.9, 0.35, 14, T.metal, 6.4, s * 1.0, 0.0);
    }
    box(THREE, cr, 9.0, 0.3, 0.3, T.metal, 4.5, 0, -0.9);
    blk(THREE, g, T.sup, -3.4, 3.4, -1.9, 1.9, 0, 0.9);
    blk(THREE, g, T.sup, -5.4, -4.6, -2.1, 2.1, 0, 3.3);
    box(THREE, g, 0.5, 2.6, 0.4, T.metal, -5.0, 0, 3.5);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -4.6, s * 1.9, 0.2, 1.8, s * 1.9, 1.3, 0.12, 4);
    return g;
  }
  /* AK-726: twin 76 mm in its domed shield, barrels forward */
  function ak726(THREE, g, T) {
    cylZ(THREE, g, 1.9, 2.1, 0.8, 16, T.sup, 0, 0, 0.4);
    var dg = new THREE.SphereGeometry(1.95, 16, 8, 0, PI * 2, 0, PI / 2); dg.rotateX(PI / 2); dg.scale(1.12, 1, 0.8);
    var d = new THREE.Mesh(dg, T.sup); d.position.set(0, 0, 0.8); g.add(d);
    blk(THREE, g, T.sup, 0.6, 2.2, -1.5, 1.5, 0.9, 2.3);
    for (var s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.1, 0.1, 4.2, 6, T.metal, 3.7, s * 0.5, 1.75, true);
      cylX(THREE, g, 0.18, 0.18, 0.7, 6, T.metal, 2.0, s * 0.5, 1.75);
    }
    return g;
  }
  /* a pair of AK-630 six-barrel mounts */
  function ak630(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.5, 0.6, 1.0, 10, T.sup, 0, s * 1.2, 0.5);
      box(THREE, g, 1.1, 0.9, 0.8, T.sup, 0, s * 1.2, 1.4);
      cylX(THREE, g, 0.2, 0.2, 1.7, 8, T.metal, 1.2, s * 1.2, 1.6);
      cylX(THREE, g, 0.1, 0.1, 0.5, 6, T.dark, 2.1, s * 1.2, 1.6);
    }
    box(THREE, g, 0.8, 2.0, 0.3, T.metal, -0.5, 0, 0.15);
    return g;
  }
  /* a pole with a dish, trained forward and tilted up */
  function dishPost(THREE, g, T, x, y, z, h, r, tilt) {
    cylZ(THREE, g, 0.12, 0.16, h, 6, T.metal, x, y, z + h / 2);
    var dg = new THREE.CylinderGeometry(r, r * 0.25, 0.35, 12, 1); dg.rotateZ(-PI / 2);
    var d = new THREE.Mesh(dg, T.metal); d.position.set(x + 0.5, y, z + h); d.rotation.y = -(tilt || 0.3); g.add(d);
    box(THREE, g, 1.0, 0.7, 0.7, T.sup, x - 0.2, y, z + h - 0.5);
    strut(THREE, g, T.metal, x - 0.2, y, z + h, x + 1.2, y, z + h, 0.05, 4);
  }
  /* lattice mast: four legs with bracing, from a base square to a top square */
  function lattice(THREE, g, T, cx, cy, b0, t0, z0, z1, rl) {
    var B = [[cx - b0, cy - b0], [cx - b0, cy + b0], [cx + b0, cy - b0], [cx + b0, cy + b0]];
    var Tt = [[cx - t0, cy - t0], [cx - t0, cy + t0], [cx + t0, cy - t0], [cx + t0, cy + t0]];
    var i, k;
    for (i = 0; i < 4; i++) strut(THREE, g, T.metal, B[i][0], B[i][1], z0, Tt[i][0], Tt[i][1], z1, rl, 5);
    var lev = function (f) { return B.map(function (b, q) { return [b[0] + (Tt[q][0] - b[0]) * f, b[1] + (Tt[q][1] - b[1]) * f, z0 + (z1 - z0) * f]; }); };
    var ring = [0, 2, 3, 1, 0];
    [0.2, 0.45, 0.7, 0.95].forEach(function (f) {
      var R4 = lev(f);
      for (k = 0; k < 4; k++) { var a = R4[ring[k]], b = R4[ring[k + 1]]; strut(THREE, g, T.metal, a[0], a[1], a[2], b[0], b[1], b[2], 0.06, 4); }
    });
    [[0, 2], [1, 3], [0, 1], [2, 3]].forEach(function (pr) {
      [0, 0.25, 0.5, 0.75].forEach(function (f) {
        var A = lev(f), Bq = lev(f + 0.25);
        strut(THREE, g, T.metal, A[pr[0]][0], A[pr[0]][1], A[pr[0]][2], Bq[pr[1]][0], Bq[pr[1]][1], Bq[pr[1]][2], 0.04, 3);
      });
    });
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, z;

    /* ---------------- hull */
    var mainXs = [-136.5, -134, -131, -127, -122, -116, -108, -98, -86, -72, -58, -44, -30, -16, -2, 12, 26, 32, 38, 46,
                  54, 62, 70, 78, 85, 92, 98, 104, 109, 114, 119, 123.5, 127.5, 131, 133.7, 135.5, 136.5];
    hullPiece(THREE, g, T, mainXs, deckZ, true);
    /* the forecastle and its ramp, from the end of the flat flight deck */
    var fx = [];
    for (x = XFD1; x < 134; x += 2.5) fx.push(x);
    fx.push(135.4, 136.3);
    g.add(ribbon(THREE, T.deck, fx, function (xn) { return deckZ(xn) + 0.04; }, 0.03, 6));

    /* ---------------- flight deck (nothing stands on it) */
    flightDeck(THREE, g, T);

    /* hull side: the dotted scuttle row, the hangar recess aft, small openings */
    for (x = -126; x <= 114; x += 3.4) {
      var zz = x > 30 ? 12.4 : 10.6;
      for (s = -1; s <= 1; s += 2) {
        box(THREE, g, 0.4, 0.07, 0.34, T.dark, xAt(x, zz), s * (sideY(x, zz) + 0.05), zz);
        box(THREE, g, 0.4, 0.07, 0.34, T.dark, xAt(x, zz - 2.4), s * (sideY(x, zz - 2.4) + 0.05), zz - 2.4);
      }
    }
    /* recess panels on both sides, flush on the hull skin */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) {
        var xr = -111 + i * 9.5, yr = s * (sideY(xr + 4, 6) + 0.06);
        box(THREE, g, 8.4, 0.08, 5.0, T.dark, xr + 4.2, yr, 6.0);
        box(THREE, g, 8.9, 0.1, 0.25, T.sup, xr + 4.2, yr, 8.65);
        box(THREE, g, 8.9, 0.1, 0.25, T.sup, xr + 4.2, yr, 3.35);
      }
    }
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 4.5, 0.08, 0.9, T.dark, 14, s * (sideY(14, 3.8) + 0.05), 3.8);
      box(THREE, g, 0.9, 0.1, 0.9, T.dark, xAt(122, 11.5), s * (sideY(122, 11.5) + 0.04), 11.5);
      /* anchor hawse */
    }

    /* ---------------- the island, to starboard (stations off the profile) */
    var YI0 = -16.9, YI1 = -4.4;                 /* outboard and inboard faces */
    blk(THREE, g, T.sup, -47.4, -38.3, YI0, YI1, FD, 17.2);
    blk(THREE, g, T.sup, -38.3, -25.3, YI0, YI1, FD, 18.8);
    blk(THREE, g, T.sup, -25.3, -21.0, YI0 + 0.8, YI1 - 0.8, FD, 24.5);
    blk(THREE, g, T.sup, -21.0, -11.6, YI0 + 0.6, YI1 - 0.6, FD, 26.7);
    blk(THREE, g, T.sup, -11.6, 24.6, YI0 + 1.4, YI1 - 1.2, FD, 34.5);
    blk(THREE, g, T.sup, 24.6, 31.5, YI0 + 0.8, YI1 - 0.6, FD, 27.0);
    blk(THREE, g, T.sup, 31.5, 40.0, YI0 + 0.4, YI1 - 0.4, 14.0, 24.0);
    blk(THREE, g, T.sup, 40.0, 48.8, YI0 + 0.4, YI1 - 0.2, 14.5, 18.5);
    /* the raked uptake on the after part of the tower, its dark mouth on the slope */
    hexy(THREE, g, T.sup, -11.6, 0.0, -14.6, -6.6, 34.5, -9.0, -1.4, -13.8, -7.2, 37.2);
    hexy(THREE, g, T.dark, -9.0, -1.4, -13.8, -7.2, 37.19, -8.9, -1.5, -13.6, -7.4, 37.23);
    /* galleries round the tiers */
    [[-47.4, -25.3, 17.2], [-25.3, -11.6, 24.5], [-21.0, -11.6, 26.7], [-11.6, 24.6, 28.0], [24.6, 31.5, 22.0], [31.5, 40.0, 23.0]].forEach(function (q, k) {
      blk(THREE, g, T.sup, q[0] - 0.5, q[1] + 0.3, YI0 - 0.7, YI1 + 0.5, q[2] - 0.2, q[2] + 0.04);
      if (k !== 1) strut(THREE, g, T.metal, q[0] - 0.5, YI0 - 0.65, q[2] + 0.04, q[0] - 0.5, YI0 - 0.65, q[2] + 0.9, 0.04, 3);
    });
    /* bridge wings and a projecting bridge on the tower's forward face */
    blk(THREE, g, T.sup, 20.0, 24.6, YI0 - 1.8, YI1 + 1.5, 28.4, 29.4);
    blk(THREE, g, T.sup, 24.6, 27.2, YI0 + 1.5, YI1 - 1.4, 28.2, 31.8);
    /* windows: rows on the outboard and inboard faces, glazing forward */
    var wr = [[-44, 14.4], [-33, 15.4], [-8, 20.0], [-8, 22.5], [-8, 30.6], [-6, 17.4], [10, 20.0], [10, 22.5], [10, 30.6], [-3, 25.0]];
    var wi, wx;
    for (wi = 0; wi < wr.length; wi++) {
      for (wx = wr[wi][0]; wx < wr[wi][0] + 26 && wx < 24; wx += 2.6) {
        if (wx < -11.6 && wr[wi][1] > 28) continue;
        box(THREE, g, 1.3, 0.1, 0.7, T.dark, wx, YI0 + (wr[wi][1] > 27 ? 1.4 : (wr[wi][1] > 24 ? 0.7 : 0.0)) - 0.02, wr[wi][1]);
        box(THREE, g, 1.3, 0.1, 0.7, T.dark, wx, YI1 - (wr[wi][1] > 27 ? 1.2 : (wr[wi][1] > 24 ? 0.7 : 0.0)) + 0.02, wr[wi][1]);
      }
    }
    for (i = 0; i < 6; i++) box(THREE, g, 0.12, 1.4, 0.9, T.glass, 27.25, YI0 + 2.4 + i * 1.7, 30.2);
    box(THREE, g, 0.12, 9.0, 0.8, T.glass, 40.05, (YI0 + YI1) / 2, 20.5);
    /* doors on the island's after face and the lowest deck on its port side */
    for (i = 0; i < 3; i++) box(THREE, g, 0.1, 1.8, 2.8, T.dark, -47.45, YI0 + 2.6 + i * 3.6, FD + 1.5);
    /* radomes on the tower sides and the island's after galleries */
    [[-6.0, 1], [4.0, 1], [-14.0, 1]].forEach(function (q) {
      var sp = new THREE.Mesh(new THREE.SphereGeometry(0.95, 12, 8), T.sup);
      sp.position.set(q[0], YI0 + 0.4, 25.8); g.add(sp);
      blk(THREE, g, T.sup, q[0] - 0.7, q[0] + 0.7, YI0 - 0.1, YI0 + 0.9, 24.3, 24.9);
    });
    for (s = 0; s < 2; s++) {
      var rd = new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 8), T.sup);
      rd.position.set(2.0 + s * 8.0, YI1 + 0.1, 29.2); g.add(rd);
    }

    /* ---------------- masts and radar */
    var mz0 = 34.5;
    /* aft mast: the ball-topped tripod of the profile at x +10 */
    lattice(THREE, g, T, 10.0, -9.8, 2.2, 0.8, mz0, 46.0, 0.14);
    cylZ(THREE, g, 0.45, 0.6, 1.8, 10, T.metal, 10.0, -9.8, 46.8);
    var ball = new THREE.Mesh(new THREE.SphereGeometry(2.1, 18, 12), T.sup); ball.position.set(10.0, -9.8, 49.9); g.add(ball);
    box(THREE, g, 0.2, 11.0, 0.2, T.metal, 10.0, -9.8, 44.6);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, 10.0, -9.8 + s * 5.4, 44.6, 10.0, -9.8 + s * 5.4, 45.8, 0.05, 4);
      strut(THREE, g, T.metal, 10.0, -9.8 + s * 2.8, 44.6, 10.0, -9.8 + s * 2.8, 45.4, 0.05, 4);
    }
    /* forward mast: slanted pole at +19 with the planar antenna leaning back */
    strut(THREE, g, T.metal, 19.0, -9.8, mz0, 18.2, -9.8, 46.6, 0.3, 6);
    strut(THREE, g, T.metal, 19.8, -8.4, mz0, 18.4, -9.4, 45.0, 0.09, 4);
    strut(THREE, g, T.metal, 19.8, -11.2, mz0, 18.4, -10.2, 45.0, 0.09, 4);
    var hn = new THREE.Group(); hn.position.set(17.0, -9.8, 42.4); hn.rotation.y = 0.22; g.add(hn);
    box(THREE, hn, 0.35, 6.0, 4.4, T.metal, 0, 0, 0);
    for (i = -2; i <= 2; i++) box(THREE, hn, 0.4, 0.09, 4.5, T.dark, 0.05, i * 1.15, 0);
    for (i = -1; i <= 1; i++) box(THREE, hn, 0.4, 6.1, 0.09, T.dark, 0.05, 0, i * 1.4);
    strut(THREE, g, T.metal, 18.2, -9.8, 40.0, 17.4, -9.8, 40.6, 0.08, 4);
    /* radar posts on the island roofs */
    dishPost(THREE, g, T, -21.0, -10.5, 26.7, 6.2, 1.4, 0.3);
    dishPost(THREE, g, T, 31.0, -10.4, 27.0, 5.8, 1.3, 0.3);
    dishPost(THREE, g, T, -14.0, -9.0, 34.5, 3.8, 1.2, 0.35);
    dishPost(THREE, g, T, 6.0, -5.9, 34.5, 2.6, 0.9, 0.2);
    dishPost(THREE, g, T, 24.0, -13.5, 34.5, 2.2, 0.8, 0.2);
    /* whip aerials on the tower roof and the after block */
    [[-5, -6.5], [3, -13.0], [-30, -14.5], [-44, -6.5], [22, -6.2]].forEach(function (q, k) {
      var zt = q[0] < -25 ? 18.8 : (q[0] < -11.6 ? 26.7 : 34.5);
      strut(THREE, g, T.metal, q[0], q[1], zt, q[0], q[1], zt + 3.4 + k * 0.4, 0.04, 3);
    });

    /* ---------------- aft weapons on the island roofs */
    var a1 = new THREE.Group(); a1.position.set(-43.0, -10.6, 17.2); ak726(THREE, a1, T); g.add(a1);
    var m1 = new THREE.Group(); m1.position.set(-32.0, -10.6, 18.8); twinArm(THREE, m1, T, 6.0, true); g.add(m1);
    [[43.5, -6.8, 18.5], [43.5, -12.8, 18.5]].forEach(function (q) {
      var ca = new THREE.Group(); ca.position.set(q[0], q[1], q[2]); ak630(THREE, ca, T); g.add(ca);
    });

    /* ---------------- the forecastle battery */
    /* four twin Bazalt boxes in pairs: aft row, forward row */
    [[56.0, 1], [56.0, -1], [70.0, 1], [70.0, -1]].forEach(function (q) {
      var bz = new THREE.Group(); bz.position.set(q[0], q[1] * 8.8, deckZ(q[0])); bazalt(THREE, bz, T); g.add(bz);
    });
    /* the forward M-11 on the centreline between the rows */
    cylZ(THREE, g, 2.6, 2.8, 1.4, 16, T.sup, 63.5, 0, deckZ(63.5) + 0.7);
    var m2 = new THREE.Group(); m2.position.set(63.5, 0, deckZ(63.5) + 1.4); twinArm(THREE, m2, T, 6.0, true); g.add(m2);
    /* deckhouse, its mast, the SUW-N-1 on its pedestal, the bow AK-726 */
    blk(THREE, g, T.sup, 84.5, 94.5, -5.0, 5.0, deckZ(88), 18.4);
    hexy(THREE, g, T.sup, 83.3, 84.5, -3.4, 3.4, 15.5, 84.5, 84.5, -3.4, 3.4, 18.4);
    box(THREE, g, 0.12, 6.4, 0.9, T.glass, 94.55, 0, 17.2);
    strut(THREE, g, T.metal, 80.5, 0, deckZ(80.5), 80.5, 0, 21.5, 0.1, 5);
    strut(THREE, g, T.metal, 80.5, 0, 20.0, 82.4, 0, 18.4, 0.05, 3);
    box(THREE, g, 0.2, 2.2, 0.15, T.metal, 80.5, 0, 20.4);
    cylZ(THREE, g, 2.0, 2.3, 1.0, 16, T.sup, 101.0, 0, deckZ(101) + 0.5);
    var l3 = new THREE.Group(); l3.position.set(101.0, 0, deckZ(101) + 1.0); twinArm(THREE, l3, T, 6.4, false); g.add(l3);
    var a2 = new THREE.Group(); a2.position.set(110.0, 0, deckZ(110)); ak726(THREE, a2, T); g.add(a2);
    [1, -1].forEach(function (sg) {
      var cb = new THREE.Group(); cb.position.set(97.0, sg * 10.6, deckZ(97)); ak630(THREE, cb, T); g.add(cb);
    });
    /* capstans, bollards, a jackstaff */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.6, 0.7, 0.8, 12, T.metal, 124.0, s * 1.9, deckZ(124) + 0.4);
      for (i = 0; i < 5; i++) cylZ(THREE, g, 0.22, 0.22, 0.6, 8, T.metal, 40 + i * 20, s * (sideY(40 + i * 20, deckZ(40 + i * 20)) - 1.0), deckZ(40 + i * 20) + 0.3);
    }
    strut(THREE, g, T.metal, 135.0, 0, deckZ(135), 135.0, 0, deckZ(135) + 3.0, 0.05, 4);
    /* low blast walls and hatch coamings on the forecastle */
    blk(THREE, g, T.sup, 50.0, 51.0, -3.0, 3.0, 14.5, 15.7);
    blk(THREE, g, T.sup, 74.5, 76.0, -3.0, 3.0, 14.5, 15.3);

    /* ---------------- railings: forecastle edges */
    for (s = -1; s <= 1; s += 2) {
      var prev = null;
      for (x = 38; x <= 133; x += 3.8) {
        var zd = deckZ(x) + 0.04, yd = s * (sideY(x, deckZ(x)) - 0.15), xx = xAt(x, deckZ(x));
        strut(THREE, g, T.metal, xx, yd, zd, xx, yd, zd + 1.0, 0.04, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + 0.98, xx, yd, zd + 0.98, 0.025, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + 0.5, xx, yd, zd + 0.5, 0.02, 3);
        }
        prev = [xx, yd, zd];
      }
    }
    /* ---------------- underwater: four shafts and screws */
    var shaft = [[-5.2, -3.4], [-10.6, -2.6]];
    for (s = -1; s <= 1; s += 2) shaft.forEach(function (sq) {
      var y0 = -s * sq[0], zz2 = sq[1];
      cylX(THREE, g, 0.34, 0.34, 24.0, 8, T.metal, -110.0, y0, zz2);
      strut(THREE, g, T.metal, -118.0, y0 * 0.75, zz2 + 2.4, -118.0, y0, zz2, 0.15, 4);
      cylX(THREE, g, 0.5, 0.65, 1.0, 8, T.metal, -122.5, y0, zz2);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.7, 2.0), T.metal);
        bl.position.set(-122.5, y0, zz2); bl.rotation.x = i * PI / 2 + 0.4;
        bl.translateZ(1.15); bl.rotation.y = 0.45; g.add(bl);
      }
    });
    /* bow thruster-free forefoot: sonar bulge under the stem (not confirmed: omitted) */

    /* ---------------- team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 4.0, 1.2, 0.04, T.team, -16.0, -10.4, 26.72);
    box(THREE, g, 4.0, 1.2, 0.04, T.team, -31.0, -6.8, 18.82);
    box(THREE, g, 4.0, 1.2, 0.04, T.team, 89.5, 0, 18.42);

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

UNIT_MODELS["pact_e80_carrier"] = {
  len: 273.0,
  build: function (THREE, M, C) { return HeroKiev.build(THREE, M, C); }
};
