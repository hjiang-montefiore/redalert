/* ==================== js/hero/ru_kuznetsov.js ===========================
   HERO MODEL -- Project 1143.5 heavy aviation cruiser "Admiral Flota Sovetskogo
   Soyuza Kuznetsov" (Tbilisi), as the 1991 photographs show her.
   Keys: pact_e90_carrier, pact_e00_carrier, carrier_p (see VARIANTS).
   Length overall 305 m, waterline beam 35.4 m, flight deck beam drawn 71 m
   (published 72 m), draught 10.5 m, height keel to masthead about 65.9 m
   (published figures: English Wikipedia "Russian aircraft carrier Admiral
   Kuznetsov", Russian MoD fact sheet quoted there).

   REFERENCES (Wikimedia Commons, fetched at 1000 px, six read; what each rests on):
     - "A port beam view of the Soviet aircraft carrier FLEET ADMIRAL of the
       SOVIET UNION KUZNETSOV underway south of Italy ... DPLA" (USN, Jan
       1992, from the air to port; the 1991 ship): the ski-jump bow with its
       white lip, the angled deck to port with a long sponson swept out under
       it, the landing circles and dashed centreline of the angled strip, the
       island at the starboard edge in the after half of the ship, the
       white cylindrical Fregat radome forward on the island and the dark
       capped funnel behind it, the deck-edge gallery fittings forward on
       the port side, the stern with its wide overhanging deck, a Ka-27 pair
       parked aft. PAINT sampled: hull 0x748486 in sun, boot-top 0x626564,
       deck 0x7b6e71 - 0x9e8b8a (weathered, brownish dark grey), island
       0x9f9f9b, sponson and deck rim light grey 0xb2a9a9.
     - "Kuznetsov 960111-N-9085M-001" (USN 1996, from ahead to port) and its
       twin file: the bow's flare into the ski-jump, the circular
       portholes and the long unlettered grey hull, the island seen
       from forward-port with the cylinder and the funnel, the Su-33s on the
       starboard side of the deck with wings folded.
     - "Aircraft carrier Admiral Kuznetsov (in dock)" and "Admiral Kuznetsov,
       Russian Aircraft Carrier (18996981764)" (both Murmansk floating dock,
       2000s): the flat Mars-Passat array faces on the island's corners (large
       octagonal flat panels on the forward and after faces of the
       tower), the island's stepped tiers and galleries, a square
       Fregat cylinder with a flat Top Plate antenna on top (the 2009 file),
       the dark hull flare and round portholes forward, the red anti-fouling
       below the waterline (sampled 0x683840), the sweep of the ski-jump lip.
     - Published figures only (no drawing was found on Commons - the searches
       returned none): 12-degree ramp, 12 P-700 Granit cells under the
       forward flight deck, 4 shafts, hull width 35.4 m.

   VARIANTS. One build serves pact_e90_carrier, pact_e00_carrier and carrier_p.
   The 2000s photographs fetched (2009, Murmansk dock; 2016 satellite frame,
   unusable for shape) show the same island, masts, sponsons and deck as the
   1991-96 ones at game scale; the post-2017 refit (hull and island rebuilt
   in dry dock 2018-22) has no photograph I fetched that shows a finished
   refitted ship, so nothing of it is drawn ("do not invent a refit").

   WHAT I COULD NOT CONFIRM, and so did not draw or drew plainly:
     - the exact positions and counts of the Kinzhal VLS hatches and the
       RBU-12000s (not drawn);
     - the Granit hatch rows: twelve flush hatches in two rows of six are
       painted into the deck between the island's forward end and the ramp
       (published: under the forward flight deck; the hatch angle and size
       are drawn plainly, aligned with the ship);
     - the Kashtan modules (four drawn at deck-edge sponsons: bow and stern
       pairs, after the silhouettes) and the AK-630 positions (six, plain);
     - the aircraft lifts (two on the starboard deck edge; only their outlines
       are painted flat), the island's smaller radars (domes and posts),
       hull openings aft, the boats.
   No hull number, name, ensign or guards ribbon.

   NO TRAINED MOUNT: no carrier row has turret:true - nothing is named
   "turret"; every weapon is baked at rest, pointing forward.
   FLIGHT DECK: one flat top at z = 19.5 from the stern to x = +78 (the ramp
   rises from it, curved, to 12 degrees at the lip: 7.9 m); nothing stands on
   it - markings (angled strip circles, wires, lift outlines, Granit hatches)
   are painted in its texture. The island stands at the starboard edge.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. Every part is
   merged into one mesh per material. ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKuznetsov = (function () {
  "use strict";
  var PI = Math.PI;
  var XS = -152.5, XB = 152.5;      /* nominal stern and stem (deck lip)        */
  var FD = 19.5;                    /* flight deck top, aft of the ramp         */
  var XR0 = 78.0, KR = 0.00285;     /* ramp starts here; z = FD + KR/2 dx^2     */
  var XD0 = -156.0, XD1 = 156.0, YD0 = -27.0, YD1 = 50.0; /* plan box of the deck texture */

  var HW = [[-152.5, 8.0], [-140, 14.5], [-125, 17.2], [-100, 17.7], [20, 17.7], [60, 16.6],
            [90, 14.0], [115, 10.0], [135, 4.5], [150, 0.8], [152.5, 0.0]];
  var HD = [[-152.5, 12.0], [-140, 20.0], [-120, 21.5], [-90, 21.5], [40, 21.5], [60, 22.0],
            [80, 20.8], [100, 18.8], [120, 16.0], [135, 12.5], [146, 8.5], [152.5, 4.0]];
  var KZ = [[-152.5, -3.0], [-135, -6.5], [-110, -9.5], [-80, -10.5], [60, -10.5], [100, -8.5],
            [125, -6.0], [152.5, -3.0]];
  var BP = [[-152.5, 1.6], [-110, 2.6], [-60, 3.2], [60, 3.2], [100, 2.0], [152.5, 1.2]];
  var FL = [[-152.5, 1.9], [-60, 1.8], [0, 1.7], [60, 1.5], [152.5, 1.3]];
  function tab(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (x <= T[i][0]) {
      var a = T[i - 1], b = T[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * f;
    }
    return T[T.length - 1][1];
  }
  /* flight deck level: flat, then the ski-jump parabola to 12 degrees at the lip */
  function deckZ(x) {
    if (x <= XR0) return FD;
    var d = x - XR0; return FD + 0.5 * KR * d * d;
  }
  function xStemAt(z) {
    if (z >= 0) return 138.0 + 14.5 * Math.min(1, z / 27.4);
    return 138.0 - 12.0 * Math.pow(Math.min(1, -z / 10.5), 1.5);
  }
  function xSternAt(z) {
    if (z >= 0) return -148.0 - 4.5 * Math.min(1, z / FD);
    return -148.0 + 14.0 * Math.pow(Math.min(1, -z / 10.5), 1.6);
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
  /* flight deck edges (positive magnitudes) */
  function edgeS(xn) {
    if (xn <= 30) return 24.0;                 /* straight starboard edge, square stern */
    var f = Math.max(0, Math.min(1, (70 - xn) / 40));
    return tab(HD, xn) + 2.5 * f;
  }
  /* port edge: the straight angled-deck edge (7 degrees, from the square stern
     out to the sponson), the sponson's raked front, then the narrowing forward deck */
  var PE = [[-152.5, 23.0], [38.0, 46.4], [44.0, 46.4], [66.0, 22.8]];
  function edgeP(xn) {
    if (xn <= 66) return tab(PE, xn);
    return tab(HD, xn) + 0.4;
  }
  /* centreline of the angled landing strip, about 7 degrees to port of the keel line */
  function axisA(x) { return 8.0 + 0.1228 * (x + 140); }

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

  /* the flight deck in plan: dark weathered plating, the angled strip's edge
     lines, dashed centreline, landing circles and arrestor-wire dashes, the
     lift outlines at the starboard edge, the twelve flush Granit hatches, a
     dashed ramp centreline - pale paint, no numbers or letters */
  function deckTex(THREE) {
    if (TEX.fd) return TEX.fd;
    var W = 1920, H = 480, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d"), R = rng(5113), i, x;
    var sx = W / (XD1 - XD0), sy = H / (YD1 - YD0);
    var px = function (X) { return (X - XD0) * sx; };
    var py = function (Y) { return (1 - (Y - YD0) / (YD1 - YD0)) * H; };
    g.fillStyle = "#6a6264"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
    for (x = -150; x < 156; x += 7) { g.beginPath(); g.moveTo(px(x), 0); g.lineTo(px(x), H); g.stroke(); }
    g.globalAlpha = 0.09;
    for (i = 0; i < 260; i++) {
      g.fillStyle = R() < 0.55 ? "#000000" : "#c8b8b4";
      g.fillRect(R() * W, R() * H, 12 + R() * 70, 5 + R() * 20);
    }
    g.globalAlpha = 1;
    var pale = "#e2ded4";
    var seg = function (x0, y0, x1, y1, w) {
      g.lineWidth = w * sx; g.beginPath(); g.moveTo(px(x0), py(y0)); g.lineTo(px(x1), py(y1)); g.stroke();
    };
    g.strokeStyle = pale;
    seg(-146, axisA(-146) - 12.0, 12, axisA(12) - 12.0, 0.4);
    seg(-146, axisA(-146) + 12.0, 12, axisA(12) + 12.0, 0.4);
    for (x = -146; x < 10; x += 6) seg(x, axisA(x), x + 3.6, axisA(x + 3.6), 0.35);
    g.lineWidth = 0.45 * sx;
    [-122, -96, -70, -44, -18].forEach(function (cx) {
      var cy = axisA(cx);
      g.beginPath(); g.ellipse(px(cx), py(cy), 3.8 * sx, 3.8 * sy, 0, 0, PI * 2); g.stroke();
      seg(cx - 3.8, cy, cx + 3.8, cy, 0.35);
    });
    for (i = 0; i < 4; i++) {
      var wx = -108 + i * 4.2;
      seg(wx, axisA(wx) - 11.0, wx + 1.4, axisA(wx) + 11.0, 0.12);
    }
    for (x = 70; x < 150; x += 6) seg(x, 0, x + 3.5, 0, 0.35);
    seg(-60, -4.0, 70, -4.0, 0.3);
    seg(-130, -23.2, 40, -23.2, 0.25);
    g.strokeStyle = "#b9b4aa";
    [[-7.0, 11.0], [-128.0, -110.0]].forEach(function (q) {
      seg(q[0], -23.0, q[1], -23.0, 0.3); seg(q[0], -9.0, q[1], -9.0, 0.3);
      seg(q[0], -23.0, q[0], -9.0, 0.3); seg(q[1], -23.0, q[1], -9.0, 0.3);
    });
    for (i = 0; i < 6; i++) [4.4, -4.4].forEach(function (yc) {
      var xc = 22 + i * 9.0;
      g.fillStyle = "#3d393b"; g.fillRect(px(xc - 3.5), py(yc + 1.5), 7.0 * sx, 3.0 * sy);
      g.strokeStyle = "#a9a49c"; g.lineWidth = 0.2 * sx;
      g.strokeRect(px(xc - 3.5), py(yc + 1.5), 7.0 * sx, 3.0 * sy);
    });
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
      hull:  skin(0x6f7d84, plateTex(THREE, [30, 1.2]), 0.86),
      boot:  skin(0x2c3236, plateTex(THREE, [30, 1]), 0.9),
      under: skin(0x683840, plateTex(THREE, [16, 2]), 0.9),
      sup:   skin(0xa0a4a4, plateTex(THREE, [3, 2]), 0.86),
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
  function hexy(THREE, p, m, x0a, x1a, y0a, y1a, za, x0b, x1b, y0b, y1b, zb, nobot) {
    var V = [[x0a, y0a, za], [x1a, y0a, za], [x1a, y1a, za], [x0a, y1a, za],
             [x0b, y0b, zb], [x1b, y0b, zb], [x1b, y1b, zb], [x0b, y1b, zb]];
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = nobot ? 2 : 0; i < F.length; i++) for (j = 0; j < 3; j++) {
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
  function blk(THREE, p, m, x0, x1, y0, y1, z0, z1, nobot) {
    return hexy(THREE, p, m, x0, x1, y0, y1, z0, x0, x1, y0, y1, z1, nobot);
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
        if (j === 0 && Math.abs(pos[P0 * 3 + 1]) < 1e-6) idx.push(S0, S1, P1);  /* keel line: one triangle */
        else idx.push(P0, S0, P1, S0, S1, P1);
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

  /* A mesh from points and triangles whose faces are turned to face want(centroid) */
  function orient(THREE, pos, idx, uv, m, want) {
    var i, a, b, c, ux, uy, uz, vx, vy, vz, nx, ny, nz, cx, cy, cz, w, t;
    for (i = 0; i < idx.length; i += 3) {
      a = idx[i] * 3; b = idx[i + 1] * 3; c = idx[i + 2] * 3;
      ux = pos[b] - pos[a]; uy = pos[b + 1] - pos[a + 1]; uz = pos[b + 2] - pos[a + 2];
      vx = pos[c] - pos[a]; vy = pos[c + 1] - pos[a + 1]; vz = pos[c + 2] - pos[a + 2];
      nx = uy * vz - uz * vy; ny = uz * vx - ux * vz; nz = ux * vy - uy * vx;
      cx = (pos[a] + pos[b] + pos[c]) / 3; cy = (pos[a + 1] + pos[b + 1] + pos[c + 1]) / 3;
      cz = (pos[a + 2] + pos[b + 2] + pos[c + 2]) / 3;
      w = want(cx, cy, cz);
      if (nx * w[0] + ny * w[1] + nz * w[2] < 0) { t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }
  /* ruled strip between two polylines (arrays of [x,y,z]) */
  function ruled(THREE, A, B, m, want, uvf) {
    var pos = [], uv = [], idx = [], i;
    for (i = 0; i < A.length; i++) {
      pos.push(A[i][0], A[i][1], A[i][2], B[i][0], B[i][1], B[i][2]);
      uv.push.apply(uv, uvf(A[i], B[i]));
    }
    for (i = 0; i < A.length - 1; i++) { var a = 2 * i; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    return orient(THREE, pos, idx, uv, m, want);
  }

  /* the flight deck: top (planform from the edge tables), its rim, the soffit
     under the overhang and the angled sponson, with a few braces */
  function flightDeck(THREE, g, T) {
    var xs = [], i, j, x, s;
    for (x = XS; x < XR0; x += 6) xs.push(x);
    for (x = XR0; x < XB - 0.1; x += 3) xs.push(x);
    xs.push(XB, 38.0, 44.0, 66.0);
    xs.sort(function (p, q) { return p - q; });
    for (i = xs.length - 1; i > 0; i--) if (xs[i] - xs[i - 1] < 0.5) xs.splice(i - 1, 1);
    var NJ = 4, pos = [], uv = [], idx = [];
    var plan = function (xn, y) { return [xAt(xn, deckZ(xn)), y, deckZ(xn)]; };
    for (i = 0; i < xs.length; i++) {
      var xn = xs[i], yp = edgeP(xn), ys = -edgeS(xn);
      for (j = 0; j <= NJ; j++) {
        var p = plan(xn, yp + (ys - yp) * j / NJ);
        pos.push(p[0], p[1], p[2]);
        uv.push((p[0] - XD0) / (XD1 - XD0), (p[1] - YD0) / (YD1 - YD0));
      }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NJ; j++) {
      var a = i * (NJ + 1) + j, b = a + 1, c = a + NJ + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    g.add(orient(THREE, pos, idx, uv, T.fdeck, function () { return [0, 0, 1]; }));

    /* rim: a pale band round the outline, 0.9 m deep */
    var Pn = [], Sn = [], Ptop = [], Pbot = [], Stop = [], Sbot = [];
    xs.forEach(function (xn) {
      var pt = plan(xn, edgeP(xn)), st = plan(xn, -edgeS(xn));
      Ptop.push(pt); Pbot.push([pt[0], pt[1], pt[2] - 0.9]);
      Stop.push(st); Sbot.push([st[0], st[1], st[2] - 0.9]);
    });
    var outw = function (x0, y0) { return [0, y0, 0]; };
    var uvr = function (a) { return [a[0] / 8, a[2] / 8, a[0] / 8, a[2] / 8 - 0.1]; };
    var nz = function () { return [0, 0, 1]; };
    g.add(ruled(THREE, Ptop, Pbot, T.sup, function (cx, cy) { return [0, 1, 0]; }, uvr));
    g.add(ruled(THREE, Stop, Sbot, T.sup, function (cx, cy) { return [0, -1, 0]; }, uvr));
    /* transom of the deck's after edge */
    var tr0 = plan(xs[0], edgeP(xs[0])), tr1 = plan(xs[0], -edgeS(xs[0]));
    g.add(ruled(THREE, [tr0, tr1], [[tr0[0], tr0[1], tr0[2] - 0.9], [tr1[0], tr1[1], tr1[2] - 0.9]], T.sup,
                function () { return [-1, 0, 0]; }, function (a) { return [a[1] / 8, 0, a[1] / 8, 0.1]; }));

    /* soffit: from the hull side up to the deck edge, sloping down inboard when the deck overhangs a lot */
    [1, -1].forEach(function (sg) {
      var inner = [], outer = [];
      xs.forEach(function (xn) {
        var e = sg > 0 ? edgeP(xn) : edgeS(xn), over = e - tab(HD, xn);
        var zo = deckZ(xn) - 0.9, za = Math.max(6.0, zo - Math.min(9.0, 0.9 * over));
        var xi = xAt(xn, za);
        inner.push([xi, sg * sideY(xn, za), za]);
        outer.push([xAt(xn, deckZ(xn)), sg * e, zo]);
      });
      g.add(ruled(THREE, inner, outer, T.hull, function () { return [0, 0, -1]; },
                  function (a, b) { return [a[0] / 8, 0, b[0] / 8, 1]; }));
    });
    /* braces under the angled sponson */
    for (x = -140; x <= 40; x += 6) {
      var e = edgeP(x), zo = deckZ(x) - 0.9, hy = tab(HD, x);
      var over = e - hy, za = Math.max(6.0, zo - Math.min(9.0, 0.9 * over));
      if (over < 4) continue;
      strut(THREE, g, T.metal, xAt(x, za), sideY(x, za) - 0.1, za + 0.4, xAt(x, deckZ(x)), e - 0.3, zo - 0.1, 0.18, 5);
    }
  }

  /* Kashtan (CADS-N-1) module: a drum base, the gun/radar housing, two 30 mm
     six-barrel clusters, a radar dome and the missile tubes, barrels forward */
  function kashtan(THREE, g, T, side) {
    cylZ(THREE, g, 1.7, 1.8, 0.9, 14, T.sup, 0, 0, 0.45);
    blk(THREE, g, T.sup, -1.4, 1.4, -1.5, 1.5, 0.9, 3.0);
    var d = new THREE.Mesh(new THREE.SphereGeometry(0.75, 10, 6, 0, PI * 2, 0, PI / 2), T.sup);
    d.position.set(-0.5, 0, 3.0); g.add(d);
    for (var s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.28, 0.28, 2.0, 8, T.metal, 1.8, s * 1.0, 2.1);
      cylX(THREE, g, 0.12, 0.12, 0.7, 6, T.dark, 3.0, s * 1.0, 2.1);
      box(THREE, g, 1.4, 0.55, 0.55, T.metal, -0.1, s * 1.75, 2.6);
      box(THREE, g, 1.4, 0.4, 0.4, T.metal, -0.1, s * 1.75, 2.1);
    }
    box(THREE, g, 0.8, 0.7, 0.8, T.dark, 1.5, 0, 2.7);
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
    var s, i, x, z, k;

    /* ---------------- hull: lofted from the station tables, top at the deck rim */
    var mainXs = [-152.5, -149, -145, -139, -132, -124, -114, -102, -88, -72, -56, -40, -24, -8, 8, 24, 40, 56, 70, 80,
                  88, 96, 104, 112, 120, 127, 133, 138, 142, 146, 149.5, 152.5];
    hullPiece(THREE, g, T, mainXs, function (xn) { return deckZ(xn) - 0.9; }, true);
    /* close the stem: a vertical plate across the last station above the waterline */
    var bp = [], bs = [], zz;
    for (i = 0; i <= 8; i++) {
      zz = 0.55 + (deckZ(XB) - 0.9 - 0.55) * i / 8;
      bp.push([xAt(XB, zz), sideY(XB, zz), zz]); bs.push([xAt(XB, zz), -sideY(XB, zz), zz]);
    }
    g.add(ruled(THREE, bp, bs, T.hull, function () { return [1, 0, 0]; }, function (a) { return [a[1] / 8, a[2] / 8, a[1] / 8, a[2] / 8]; }));
    flightDeck(THREE, g, T);

    /* hull side: a row of scuttles, the round portholes forward, hawse pipes */
    for (x = -140; x <= 126; x += 5) {
      for (s = -1; s <= 1; s += 2) {
        box(THREE, g, 0.4, 0.07, 0.34, T.dark, xAt(x, 13.0), s * (sideY(x, 13.0) + 0.04), 13.0);
        box(THREE, g, 0.4, 0.07, 0.34, T.dark, xAt(x + 2.5, 9.6), s * (sideY(x + 2.5, 9.6) + 0.04), 9.6);
      }
    }
    for (i = 0; i < 6; i++) for (s = -1; s <= 1; s += 2) {
      var zp = 11.0 + (i % 2) * 2.5, xp = 96 + Math.floor(i / 2) * 8.5;
      cylZ(THREE, g, 0.32, 0.32, 0.1, 8, T.dark, xAt(xp, zp), s * (sideY(xp, zp) + 0.02), zp).rotation.x = 0;
    }
    for (s = -1; s <= 1; s += 2) {
      var ha = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.3, 12), T.dark);
      ha.position.set(xAt(134, 9.0), s * (sideY(134, 9.0) + 0.05), 9.0); g.add(ha);
    }

    /* ---------------- the island, starboard edge, after half of the ship */
    var YI0 = -22.8, YI1 = -10.4;
    blk(THREE, g, T.sup, -66.0, -9.0, YI0, YI1, FD, 27.5);                /* tier A */
    blk(THREE, g, T.sup, -58.0, -16.0, YI0 + 0.8, YI1 - 0.4, 27.5, 33.5, true); /* tier B */
    blk(THREE, g, T.sup, -47.0, -22.0, YI0 + 1.6, YI1 - 1.2, 33.5, 39.5, true); /* tier C: bridge and tower */
    /* galleries round the tiers */
    [[-66.0, -9.0, 27.5], [-58.0, -16.0, 33.5], [-47.0, -22.0, 39.5]].forEach(function (q) {
      blk(THREE, g, T.sup, q[0] - 0.6, q[1] + 0.6, YI0 - 0.9, YI1 + 0.7, q[2] - 0.25, q[2] + 0.05);
      strut(THREE, g, T.metal, q[0] - 0.5, YI0 - 0.85, q[2] + 0.05, q[0] - 0.5, YI0 - 0.85, q[2] + 1.0, 0.04, 3);
      strut(THREE, g, T.metal, q[1] + 0.5, YI0 - 0.85, q[2] + 0.05, q[1] + 0.5, YI0 - 0.85, q[2] + 1.0, 0.04, 3);
    });
    /* bridge wings */
    blk(THREE, g, T.sup, -29.0, -25.0, YI0 - 2.2, YI1 + 2.4, 36.0, 37.0);
    /* windows and doors on the forward faces and the outboard side */
    var wr = [[FD + 3.0, -62, -14], [FD + 6.2, -62, -14], [29.8, -54, -20], [35.8, -44, -26]];
    wr.forEach(function (q, qi) {
      for (x = q[1]; x < q[2]; x += 2.7) {
        var yo = qi < 2 ? YI0 : (qi === 2 ? YI0 + 0.8 : YI0 + 1.6);
        box(THREE, g, 1.3, 0.1, 0.7, T.dark, x, yo - 0.02, q[0]);
      }
    });
    for (i = 0; i < 7; i++) box(THREE, g, 0.12, 1.5, 0.9, T.glass, -22.0 + 0.0, YI0 + 2.2 + i * 1.5, 37.3);
    for (i = 0; i < 3; i++) box(THREE, g, 0.1, 1.6, 2.6, T.dark, -66.05, YI0 + 2.4 + i * 3.4, FD + 1.5);
    /* Mars-Passat: four flat array faces on the tower's corners, angled outward */
    [[-23.2, 1], [-23.2, -1], [-45.8, 1], [-45.8, -1]].forEach(function (q, qi) {
      var fy = (YI0 + 1.6 + YI1 - 1.2) / 2 + q[1] * 4.6, fwd = qi < 2 ? 1 : -1;
      var pg = new THREE.CylinderGeometry(2.7, 2.7, 0.35, 8, 1); pg.rotateZ(PI / 2);
      var pm = new THREE.Mesh(pg, T.sup);
      pm.position.set(q[0] + fwd * 0.5, fy, 36.2); pm.rotation.z = fwd * q[1] * 0.35; g.add(pm);
      var rg = new THREE.CylinderGeometry(2.3, 2.3, 0.3, 8, 1); rg.rotateZ(PI / 2);
      var rm = new THREE.Mesh(rg, T.metal); rm.position.set(q[0] + fwd * 0.62, fy, 36.2); rm.rotation.z = fwd * q[1] * 0.35; g.add(rm);
    });
    /* funnel: capped oval behind the radome cylinder */
    var fn = new THREE.CylinderGeometry(3.2, 3.4, 4.6, 16, 1); fn.rotateX(PI / 2); fn.scale(1.15, 1, 1);
    var fm = new THREE.Mesh(fn, T.sup); fm.position.set(-52.0, -16.8, 35.8); g.add(fm);
    var fc = new THREE.CylinderGeometry(2.9, 2.9, 0.2, 16, 1); fc.rotateX(PI / 2); fc.scale(1.15, 1, 1);
    var fcm = new THREE.Mesh(fc, T.dark); fcm.position.set(-52.0, -16.8, 38.2); g.add(fcm);
    /* Fregat tower: radome cylinder on the tower roof with the flat antenna on top, and the mast above */
    var YC = (YI0 + YI1) / 2 - 0.4;
    cylZ(THREE, g, 2.8, 2.9, 8.0, 14, T.sup, -32.0, YC, 43.5);
    cylZ(THREE, g, 2.6, 2.6, 0.5, 14, T.metal, -32.0, YC, 47.7);
    box(THREE, g, 0.7, 6.4, 3.6, T.metal, -32.0, YC, 49.9);
    for (i = -2; i <= 2; i++) box(THREE, g, 0.75, 0.07, 3.7, T.dark, -31.96, YC + i * 1.2, 49.9);
    strut(THREE, g, T.metal, -32.0, YC, 51.7, -32.0, YC, 55.4, 0.12, 5);
    /* a lattice mast aft of the funnel carries the rear radars and aerials */
    lattice(THREE, g, T, -38.0, -13.6, 1.2, 0.5, 39.5, 48.0, 0.1);
    box(THREE, g, 0.3, 4.6, 2.2, T.metal, -38.0, -13.6, 48.8);
    /* radomes and radar posts on the tier roofs */
    [[-12.5, YI0 + 1.0, 28.4], [-12.5, YI1 - 1.0, 28.4], [-20.0, YI0 + 2.4, 34.4], [-48.0, YI1 - 2.0, 34.4]].forEach(function (q) {
      var sp = new THREE.Mesh(new THREE.SphereGeometry(1.0, 12, 8), T.sup);
      sp.position.set(q[0], q[1], q[2]); g.add(sp);
    });
    dishPost(THREE, g, T, -62.0, -19.0, 27.5, 4.6, 1.4, 0.3);
    dishPost(THREE, g, T, -14.0, -20.0, 27.5, 3.8, 1.2, 0.3);
    dishPost(THREE, g, T, -54.0, -13.0, 33.5, 3.2, 1.1, 0.25);
    [[-60, -12.5, 27.5], [-26, -12.5, 39.5], [-44, -20.0, 39.5], [-16, -15.0, 33.5]].forEach(function (q, k2) {
      strut(THREE, g, T.metal, q[0], q[1], q[2], q[0], q[1], q[2] + 3.6 + k2 * 0.4, 0.04, 3);
    });


    /* railings on the island galleries */
    [[-66.0, -9.0, 27.5], [-58.0, -16.0, 33.5], [-47.0, -22.0, 39.5]].forEach(function (q) {
      var yo = YI0 - 0.85, yi = YI1 + 0.65, z0 = q[2] + 0.05, xa = q[0] - 0.5, xb = q[1] + 0.5, p;
      for (p = xa; p <= xb + 0.01; p += 2.4) {
        strut(THREE, g, T.metal, p, yo, z0, p, yo, z0 + 1.0, 0.035, 3);
        strut(THREE, g, T.metal, p, yi, z0, p, yi, z0 + 1.0, 0.035, 3);
      }
      strut(THREE, g, T.metal, xa, yo, z0 + 1.0, xb, yo, z0 + 1.0, 0.03, 3);
      strut(THREE, g, T.metal, xa, yi, z0 + 1.0, xb, yi, z0 + 1.0, 0.03, 3);
    });
    /* ECM and communications fairings round the tower */
    [[-26.5, YI0 + 1.0, 38.6], [-42.0, YI0 + 1.0, 38.6], [-27.0, YI1 - 1.4, 38.6], [-43.0, YI1 - 1.4, 38.6],
     [-60.0, YI0 + 1.2, 28.3], [-12.0, YI0 + 1.2, 28.3], [-60.0, YI1 - 0.8, 28.3], [-18.0, YI1 - 0.8, 34.3]].forEach(function (q, qi) {
      blk(THREE, g, T.metal, q[0] - 0.8, q[0] + 0.8, q[1] - 0.5, q[1] + 0.5, q[2], q[2] + 0.9);
      cylZ(THREE, g, 0.45, 0.45, 0.8, 8, T.sup, q[0], q[1], q[2] + 1.3);
    });
    /* rudders under the stern, a pair on the shaft lines */
    for (s = -1; s <= 1; s += 2) {
      var rd = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.5, 5.6), T.under);
      rd.position.set(-140.5, s * 5.0, -2.2); g.add(rd);
    }

    /* ---------------- weapons on deck-edge sponsons: Kashtan modules (bow and stern pairs), AK-630s */
    var mount = function (xn, sg, fn2) {
      var zb = FD - 3.8, yb = sg * (tab(HD, xn) + 2.2), xx = xAt(xn, zb);
      var pl = new THREE.Mesh(new THREE.BoxGeometry(5.6, 4.6, 0.5), T.sup);
      pl.position.set(xx, yb, zb - 0.25); g.add(pl);
      var m = new THREE.Group(); m.position.set(xx, yb, zb); g.add(m);
      fn2(m);
    };
    [74, -118].forEach(function (xn) { [1, -1].forEach(function (sg) { mount(xn, sg, function (m) { kashtan(THREE, m, T, sg); }); }); });
    [[100, 1], [100, -1], [-136, 1], [-136, -1], [-80, 1], [-80, -1]].forEach(function (q) {
      mount(q[0], q[1], function (m) { ak630(THREE, m, T); });
    });

    /* ---------------- underwater: four shafts and screws */
    var shaft = [[-5.0, -3.4], [-10.4, -2.6]];
    for (s = -1; s <= 1; s += 2) shaft.forEach(function (sq) {
      var y0 = -s * sq[0], zz2 = sq[1];
      cylX(THREE, g, 0.38, 0.38, 26.0, 8, T.metal, -134.0, y0, zz2);
      strut(THREE, g, T.metal, -142.0, y0 * 0.75, zz2 + 2.4, -142.0, y0, zz2, 0.17, 4);
      cylX(THREE, g, 0.55, 0.7, 1.0, 8, T.metal, -147.0, y0, zz2);
      for (i = 0; i < 5; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.8, 2.3), T.metal);
        bl.position.set(-147.0, y0, zz2); bl.rotation.x = i * 2 * PI / 5 + 0.4;
        bl.translateZ(1.3); bl.rotation.y = 0.45; g.add(bl);
      }
    });

    /* ---------------- team: three small strips on up-facing island roofs, 2 cm proud */
    box(THREE, g, 4.0, 1.2, 0.04, T.team, -50.0, -15.5, 27.52);
    box(THREE, g, 4.0, 1.2, 0.04, T.team, -26.0, -14.5, 33.52);
    box(THREE, g, 4.0, 1.2, 0.04, T.team, -42.0, -18.5, 39.52);

    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }

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

UNIT_MODELS["pact_e90_carrier"] = {
  len: 305.0,
  build: function (THREE, M, C) { return HeroKuznetsov.build(THREE, M, C); }
};
UNIT_MODELS["pact_e00_carrier"] = UNIT_MODELS["pact_e90_carrier"];
UNIT_MODELS["carrier_p"] = UNIT_MODELS["pact_e90_carrier"];
