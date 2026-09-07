/* ==========================================================================
   mine_ship_layer.js -- NAVAL MINELAYER, unit id "navminelayer".

   A 70 m coastal minelayer. Everything about the silhouette is the STERN:
   the after two thirds of the ship is one long low mine deck carrying two
   parallel mine rails that run all the way out to an open transom, moored
   mines sat on their sinker trolleys along both rails, and a rounded stern
   gate arched over each rail opening in the transom bulwark. Forward of
   the mine deck sits a modest deckhouse with a bridge on top, one funnel,
   a single pole mast, a deck crane on the centreline for striking mines
   down, and a raised forecastle with a light gun mount on it.

   Model space follows models3d.js and warship3d.js: +X bow, +Y to port
   (left), +Z up, real metres, waterline at z = 0. render3d.js stands the
   model up with tpl.rotation.x = -PI/2, so authoring this file +Y up would
   lay the ship on her side.

   Hull, plating and paint follow warship3d.js so this ship sits beside the
   rest of the fleet:
     - two lofts, not one. The grey topsides run from just under the
       waterline up to the deck and are a few centimetres wider than the
       underbody loft inside them, which gives a crisp knuckle at the
       waterline, a dark boot topping below it, and no z-fighting.
     - M.loft winds its quads inward, so the winding is flipped and the
       normals recomputed rather than papered over with DoubleSide.
     - the main deck is a separate cambered ribbon lying on the hull top,
       so it carries the sheer and the forecastle step.

   Materials are the house three tiers only: SKIN (painted steel carrying a
   procedural CanvasTexture), METAL (rails, barrels, wire, mine horns) and
   GLASS (the wheelhouse windows).

   ASCII only. A stray byte inside a hex literal has broken this repo.
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var MineLayer3D = (function () {
  "use strict";

  var PI = Math.PI;

  /* ------------------------------------------------ principal dimensions */
  var LOA  = 70.0;                 /* length overall                        */
  var XA   = -35.0, XF = 35.0;     /* transom and stem                      */
  var BH   = 5.50;                 /* maximum half beam                     */
  var XBRK = 17.0;                 /* forecastle break                      */
  var DKA  = 2.55;                 /* freeboard at the transom              */
  var FCR  = 1.18;                 /* height of the forecastle step         */

  var Y_RAIL = 2.60;               /* mine rail centres, port and starboard */
  var X_RAIL_A = -35.85;           /* rails overhang the open transom       */
  var X_RAIL_F = 0.60;

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* ------------------------------------------------------------ hull form
     Half beam as a fraction of the maximum, stern (u = 0) to stem (u = 1).
     A minelayer is a wide flat-sterned box: the transom is still four fifths
     of the full beam so the mines have somewhere to roll off from.        */
  var HWT = [[0.000, 0.82], [0.040, 0.90], [0.100, 0.96], [0.200, 0.995],
             [0.340, 1.000], [0.520, 1.000], [0.640, 0.985], [0.740, 0.940],
             [0.830, 0.830], [0.900, 0.660], [0.945, 0.450], [0.975, 0.240],
             [1.000, 0.035]];

  function tbl(T, u) {
    var i;
    if (u <= T[0][0]) return T[0][1];
    for (i = 1; i < T.length; i++) {
      if (u <= T[i][0])
        return lerp(T[i - 1][1], T[i][1], (u - T[i - 1][0]) / (T[i][0] - T[i - 1][0]));
    }
    return T[T.length - 1][1];
  }
  function hwAt(x) { return BH * tbl(HWT, (x - XA) / LOA); }

  /* main deck aft of the break, forecastle deck forward of it, both with
     sheer; the step is what makes the mine deck read as LOW                */
  function deckZ(x) {
    if (x <= XBRK) return DKA + 0.62 * Math.pow((x - XA) / (XBRK - XA), 1.7);
    return DKA + 0.62 + FCR + 1.35 * Math.pow((x - XBRK) / (XF - XBRK), 1.75);
  }
  function keelZ(x) {
    if (x < -22.0) return -2.60 + 1.20 * Math.pow((-22.0 - x) / 13.0, 1.5);
    if (x >  15.0) return -2.60 + 2.15 * Math.pow((x - 15.0) / 20.0, 1.9);
    return -2.60;
  }
  /* superellipse exponent: well below 1 squares the topsides off, nearer 1
     rounds the bilge and pinches the entry in                              */
  function sqTop(x) {
    var u = (x - XA) / LOA;
    if (u < 0.15) return 0.36 - 0.12 * (u / 0.15);
    if (u < 0.72) return 0.24;
    return 0.24 + 0.36 * ((u - 0.72) / 0.28);
  }
  function sqLow(x) {
    var u = (x - XA) / LOA;
    if (u < 0.15) return 0.52 - 0.10 * (u / 0.15);
    if (u < 0.70) return 0.42;
    return 0.42 + 0.50 * ((u - 0.70) / 0.30);
  }

  /* stations: doubled either side of the forecastle break so the step is a
     step and not a ramp                                                    */
  var STX = [-35, -32.5, -28, -22, -14, -5, 5, 12, 16.85, 17.15,
             22, 27, 30.5, 33, 34.4, 35];

  var UW = 0.12;   /* topsides loft dips this far below the waterline */
  var EX = 0.07;   /* and stands this much proud of the underbody     */

  /* ======================================================== textures */
  var TEX = {};

  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function finish(THREE, cv, rep) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (rep) t.repeat.set(rep[0], rep[1]);
    /* r148 ships SRGBColorSpace but Texture.colorSpace does nothing until
       r152, so the encoding field is the one that actually works here.    */
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }

  /* Hull skin. The loft's v runs around the section, so v = 0.25 is the
     deck edge, v = 0.75 the waterline: the boot topping and the heaviest
     streaking go either side of 0.75, which is where a real hull is
     filthiest.                                                            */
  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rngOf(20347), i, y;

    g.fillStyle = "#69717a"; g.fillRect(0, 0, W, H);
    /* plate patchwork: no two adjacent strakes weather to the same tone */
    for (i = 0; i < 84; i++) {
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 36 + R() * 140, 9 + R() * 30);
    }
    g.globalAlpha = 1;
    /* frame and strake seams */
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.4;
    for (i = 1; i < 40; i++) {
      g.beginPath(); g.moveTo(i * W / 40, 0); g.lineTo(i * W / 40, H); g.stroke();
    }
    g.lineWidth = 1;
    for (i = 1; i < 12; i++) {
      g.beginPath(); g.moveTo(0, i * H / 12); g.lineTo(W, i * H / 12); g.stroke();
    }
    /* The underbody loft already supplies the boot topping, so this is only
       the grime that collects just above the waterline.                   */
    g.globalAlpha = 0.20; g.fillStyle = "#2a211a";
    g.fillRect(0, H * 0.700, W, H * 0.105);
    g.globalAlpha = 1;
    /* rust weeping down the topsides, heavier the closer to the water */
    for (i = 0; i < 150; i++) {
      var side = R() < 0.5 ? 0.62 : 0.86;
      y = (side + (R() - 0.5) * 0.16) * H;
      g.globalAlpha = 0.08 + R() * 0.16;
      g.fillStyle = R() < 0.7 ? "#4a3324" : "#20180f";
      g.fillRect(R() * W, y, 2 + R() * 5, 5 + R() * 26);
    }
    /* scuff and salt haze right along the waterline */
    g.globalAlpha = 0.10; g.fillStyle = "#d8dde1";
    for (i = 0; i < 60; i++) g.fillRect(R() * W, (0.70 + R() * 0.10) * H, 20 + R() * 90, 3);
    g.globalAlpha = 1;

    TEX.hull = finish(THREE, cv); return TEX.hull;
  }

  /* neutral greyscale, so the material colour supplies the scheme */
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rngOf(6151), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 44; i++) {
      g.globalAlpha = 0.06 + R() * 0.08;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 18 + R() * 76, 12 + R() * 56);
    }
    g.globalAlpha = 0.30; g.strokeStyle = "#000000"; g.lineWidth = 2;
    for (i = 1; i < 8; i++) {
      g.beginPath(); g.moveTo(0, i * H / 8); g.lineTo(W, i * H / 8); g.stroke();
      g.beginPath(); g.moveTo(i * W / 8, 0); g.lineTo(i * W / 8, H); g.stroke();
    }
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 1100; i++) g.fillRect(R() * W, R() * H, 2, 2);   /* non-skid */
    g.globalAlpha = 0.16; g.fillStyle = "#000000";
    for (i = 0; i < 26; i++) g.fillRect(R() * W, R() * H, 8 + R() * 40, 6 + R() * 22);
    g.globalAlpha = 1;
    TEX.deck = finish(THREE, cv); return TEX.deck;
  }

  function plateTex(THREE) {
    if (TEX.plate) return TEX.plate;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rngOf(2287), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.22; g.strokeStyle = "#000000"; g.lineWidth = 1.6;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.10;
    for (i = 0; i < 30; i++) {
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 16 + R() * 56, 10 + R() * 36);
    }
    /* scuttles and watertight doors, small enough to belong in the texture */
    g.globalAlpha = 0.32; g.fillStyle = "#000000";
    for (i = 0; i < 20; i++) {
      g.beginPath(); g.arc(R() * W, R() * H, 2.4 + R() * 2, 0, 6.29); g.fill();
    }
    /* streaking below the deck edge */
    g.globalAlpha = 0.09; g.fillStyle = "#000000";
    for (i = 0; i < 40; i++) g.fillRect(R() * W, H * 0.55 + R() * H * 0.42, 2 + R() * 3, 6 + R() * 24);
    g.globalAlpha = 1;
    TEX.plate = finish(THREE, cv); return TEX.plate;
  }

  /* ============================================================ materials */
  function makeMats(THREE, team) {
    var M = {};
    /* SKIN */
    M.hull  = new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE),
                                               roughness: 0.86, metalness: 0.08 });
    M.deck  = new THREE.MeshStandardMaterial({ color: 0x464c51, map: deckTex(THREE),
                                               roughness: 0.92, metalness: 0.05 });
    M.sup   = new THREE.MeshStandardMaterial({ color: 0x767e86, map: plateTex(THREE),
                                               roughness: 0.84, metalness: 0.08 });
    M.boot  = new THREE.MeshStandardMaterial({ color: 0x4a2c26, roughness: 0.90, metalness: 0.06 });
    M.mine  = new THREE.MeshStandardMaterial({ color: 0x2a2f33, roughness: 0.84, metalness: 0.09 });
    M.team  = new THREE.MeshStandardMaterial({ color: new THREE.Color(team),
                                               roughness: 0.84, metalness: 0.08 });
    /* METAL */
    M.steel = new THREE.MeshStandardMaterial({ color: 0x9aa1a6, roughness: 0.52, metalness: 0.58 });
    M.rail  = new THREE.MeshStandardMaterial({ color: 0x8b9298, roughness: 0.48, metalness: 0.62 });
    M.dark  = new THREE.MeshStandardMaterial({ color: 0x363b40, roughness: 0.58, metalness: 0.42 });
    M.blk   = new THREE.MeshStandardMaterial({ color: 0x22262a, roughness: 0.70, metalness: 0.22 });
    M.door  = new THREE.MeshStandardMaterial({ color: 0x4d545a, roughness: 0.72, metalness: 0.16 });
    M.horn  = new THREE.MeshStandardMaterial({ color: 0x9c7f3a, roughness: 0.55, metalness: 0.50 });
    M.trim  = new THREE.MeshStandardMaterial({ color: 0xc2c8cd, roughness: 0.60, metalness: 0.38 });
    /* GLASS */
    M.glass = new THREE.MeshPhysicalMaterial({ color: 0x17232b, roughness: 0.12,
                                               metalness: 0.04, transparent: true,
                                               opacity: 0.84 });

    /* Colour space. render3d.js prepModel() converts every material colour
       sRGB -> linear once, guarded by userData._srgbDone; cmp.html does not.
       Doing it here and setting the flag makes the same hex read the same in
       the comparison page and in the game -- without it an anti-fouling
       brown comes out salmon pink in one of the two.                      */
    for (var k in M) {
      if (!Object.prototype.hasOwnProperty.call(M, k)) continue;
      if (M[k].color && M[k].color.convertSRGBToLinear) M[k].color.convertSRGBToLinear();
      M[k].userData = M[k].userData || {};
      M[k].userData._srgbDone = true;
    }
    return M;
  }

  /* ============================================================== helpers */

  /* a four sided cylinder is a box whose top face scales independently,
     which is where every deckhouse gets its inward leaning sides from */
  function tboxGeo(THREE, lx, ly, lz, top) {
    var g = new THREE.CylinderGeometry(top === undefined ? 1 : top, 1, lz, 4, 1);
    g.rotateX(PI / 2); g.rotateZ(PI / 4);
    g.scale(lx * 0.70710678, ly * 0.70710678, 1);
    g = g.toNonIndexed(); g.computeVertexNormals();
    return g;
  }
  function tbox(THREE, mtl, lx, ly, lz, top, x, y, z) {
    var m = new THREE.Mesh(tboxGeo(THREE, lx, ly, lz, top), mtl);
    m.position.set(x, y, z); return m;
  }
  function box(THREE, mtl, lx, ly, lz, x, y, z) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), mtl);
    m.position.set(x, y, z); return m;
  }
  function cylZ(THREE, mtl, r0, r1, h, seg, x, y, z, open) {
    var m = new THREE.Mesh(
      new THREE.CylinderGeometry(r0, r1, h, seg || 8, 1, !!open).rotateX(PI / 2), mtl);
    m.position.set(x, y, z); return m;
  }
  function cylX(THREE, mtl, r0, r1, h, seg, x, y, z) {
    var m = new THREE.Mesh(
      new THREE.CylinderGeometry(r0, r1, h, seg || 8).rotateZ(-PI / 2), mtl);
    m.position.set(x, y, z); return m;
  }
  /* a cylinder stretched between two points: stays, boom, topping lift */
  function strut(THREE, mtl, a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return new THREE.Object3D();
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), mtl);
    m.position.set((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
                                    new THREE.Vector3(dx, dy, dz).normalize());
    return m;
  }

  /* M.loft winds inward; flip it so a FrontSide material shows the outside */
  function loftMesh(THREE, M, secs, segs, mtl) {
    var g = M.loft(THREE, secs, segs), idx = g.getIndex(), i, t;
    if (idx) {
      var a = idx.array;
      for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      idx.needsUpdate = true;
    }
    g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* where a lofted section's top surface really is at a given fraction of
     its own half beam, so the deck plate lies ON the hull                 */
  function topZ(st, ky) {
    var c = Math.pow(clamp(ky, 0, 1), 1 / st.sq);
    var s = Math.sqrt(Math.max(0, 1 - c * c));
    return st.zc + st.h * Math.pow(s, st.sq);
  }

  /* the main deck: a cambered ribbon lying on the hull top, sheer, step
     and all                                                               */
  function deckRibbon(THREE, ST, mtl, edge, repU, repV) {
    var kys = [-edge, -edge * 0.70, -edge * 0.36, 0, edge * 0.36, edge * 0.70, edge];
    var pos = [], uv = [], idx = [], i, j;
    var x0 = ST[0].x, x1 = ST[ST.length - 1].x;
    for (i = 0; i < ST.length; i++) {
      var st = ST[i];
      for (j = 0; j < kys.length; j++) {
        var ky = kys[j];
        pos.push(st.x, st.w * ky, topZ(st, Math.abs(ky)) + 0.04);
        uv.push((st.x - x0) / (x1 - x0) * repU, (ky + 1) * 0.5 * repV);
      }
    }
    var R = kys.length;
    for (i = 0; i < ST.length - 1; i++) for (j = 0; j < R - 1; j++) {
      var a = i * R + j, b = a + 1, c = a + R, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* stanchion and wire railing. A ship without these does not read as one,
     and on a minelayer the whole mine deck is open, so they are most of
     what edges it.                                                        */
  function railRun(THREE, G, mtl, pts, h) {
    var i, k, n = pts.length;
    for (i = 0; i < n; i++) {
      var s = cylZ(THREE, mtl, 0.045, 0.045, h, 3, pts[i][0], pts[i][1],
                   pts[i][2] + h * 0.5, true);
      G.add(s);
    }
    for (i = 0; i < n - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      var dx = b[0] - a[0], dy = b[1] - a[1];
      var L = Math.sqrt(dx * dx + dy * dy + (b[2] - a[2]) * (b[2] - a[2]));
      for (k = 1; k <= 2; k++) {
        var w = new THREE.Mesh(new THREE.BoxGeometry(L, 0.05, 0.05), mtl);
        w.position.set((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5,
                       (a[2] + b[2]) * 0.5 + h * (k === 1 ? 0.55 : 1.0));
        w.rotation.z = Math.atan2(dy, dx);
        G.add(w);
      }
    }
  }
  function edgePts(xs, inset, lift) {
    var out = [], i;
    for (i = 0; i < xs.length; i++)
      out.push([xs[i], hwAt(xs[i]) - inset, deckZ(xs[i]) + (lift || 0.06)]);
    return out;
  }

  /* ============================================================== fittings */

  /* one moored mine on its sinker trolley: a spherical case with lead
     horns sat on the wheeled anchor box that goes over the side with it */
  function mine(THREE, M, x, y, z) {
    var G = new THREE.Group();
    G.position.set(x, y, z);
    G.add(box(THREE, M.blk, 1.05, 0.98, 0.52, 0, 0, 0.26));
    var b = new THREE.Mesh(new THREE.SphereGeometry(0.60, 8, 5), M.mine);
    b.position.set(0, 0, 1.10); G.add(b);
    var i, a;
    for (i = 0; i < 4; i++) {
      a = PI * 0.25 + i * PI * 0.5;
      var hn = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.34, 5), M.horn);
      hn.position.set(Math.cos(a) * 0.62, Math.sin(a) * 0.62, 1.52);
      hn.rotateZ(a - PI / 2); hn.rotateX(0.60);
      G.add(hn);
    }
    var tp = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.34, 5), M.horn);
    tp.position.set(0, 0, 1.82); G.add(tp);
    return G;
  }

  /* the light gun mount on the forecastle. The splinter tub is fixed to the
     deck; only the group named "turret" trains, which is what render3d.js
     spins about Z.                                                        */
  function gunMount(THREE, M, G, x, zb) {
    G.add(cylZ(THREE, M.sup, 1.42, 1.50, 0.98, 10, x, 0, zb + 0.49, true));
    G.add(cylZ(THREE, M.deck, 1.42, 1.42, 0.10, 8, x, 0, zb + 0.05));

    var T = new THREE.Group();
    T.name = "turret";
    T.position.set(x, 0, zb + 0.34);
    G.add(T);

    T.add(cylZ(THREE, M.dark, 0.46, 0.56, 0.86, 8, 0, 0, 0.43));
    T.add(tbox(THREE, M.sup, 1.55, 1.40, 1.00, 0.72, -0.10, 0, 1.36));
    var sh = box(THREE, M.sup, 0.34, 1.45, 0.80, 0.68, 0, 1.55);
    sh.rotation.y = 0.42; T.add(sh);
    var i, s;
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      var bl = cylX(THREE, M.blk, 0.078, 0.092, 2.70, 6, 1.95, s * 0.26, 1.72);
      bl.rotation.y = -0.10; T.add(bl);
      T.add(cylX(THREE, M.steel, 0.165, 0.175, 0.44, 6, 0.86, s * 0.26, 1.68));
    }
    T.add(box(THREE, M.dark, 0.42, 0.40, 0.42, -0.45, 0.72, 1.92));
    T.add(box(THREE, M.dark, 0.42, 0.40, 0.42, -0.45, -0.72, 1.92));
    T.add(box(THREE, M.trim, 0.30, 0.24, 0.60, 0.55, 0.90, 1.95));
  }

  /* ================================================================ build */
  function build(THREE, MOD, C) {
    var G = new THREE.Group();
    var team = (C && C.team !== undefined && C.team !== null) ? C.team : "#3f7fd0";
    var M = makeMats(THREE, team);
    var i, s, x, z;

    /* ------------------------------------------------------------- hull */
    var TOP = [], LOW = [];
    for (i = 0; i < STX.length; i++) {
      x = STX[i];
      var w = hwAt(x), dz = deckZ(x), kz = keelZ(x);
      TOP.push({ x: x, w: w + EX, h: (dz + UW) * 0.5, zc: (dz - UW) * 0.5, sq: sqTop(x) });
      LOW.push({ x: x, w: w,      h: (dz - kz) * 0.5, zc: (dz + kz) * 0.5, sq: sqLow(x) });
    }
    G.add(loftMesh(THREE, MOD, LOW, 10, M.boot));
    G.add(loftMesh(THREE, MOD, TOP, 14, M.hull));
    G.add(deckRibbon(THREE, TOP, M.deck, 0.985, LOA / 13, 2.2));

    /* transom: dark below the waterline, grey above it */
    var twh = hwAt(XA), tdz = deckZ(XA), tkz = keelZ(XA);
    G.add(box(THREE, M.boot, 0.30, twh * 2.00, -tkz + 0.10, XA - 0.06, 0, tkz * 0.5 + 0.05));
    G.add(box(THREE, M.hull, 0.30, twh * 2.02, tdz + 0.06, XA - 0.06, 0, tdz * 0.5));

    /* twin screws and rudders, just enough to close the run aft */
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(cylX(THREE, M.boot, 0.42, 0.30, 3.20, 8, -32.6, s * 1.95, -1.85));
      var hb = new THREE.Mesh(new THREE.ConeGeometry(0.30, 0.70, 8).rotateZ(PI / 2), M.blk);
      hb.position.set(-34.5, s * 1.95, -1.85); G.add(hb);
      var rd = box(THREE, M.boot, 1.30, 0.16, 1.60, -34.2, s * 1.95, -1.05);
      G.add(rd);
    }

    /* ------------------------------------------- transom bulwark and gate
       The identity of the ship. The transom is open: the bulwark stops
       either side of each mine rail and a rounded stern gate arches over
       the opening the mines roll out through.                            */
    var bz = deckZ(-34.85), bw = hwAt(-34.85);
    G.add(box(THREE, M.sup, 0.34, 3.50, 0.96, -34.85, 0, bz + 0.48));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(box(THREE, M.sup, 0.34, bw - 3.45, 0.96, -34.85,
                s * (3.45 + (bw - 3.45) * 0.5), bz + 0.48));
      /* the rounded gate itself */
      var arch = new THREE.Mesh(
        new THREE.TorusGeometry(0.94, 0.16, 4, 10, PI).rotateX(PI / 2).rotateZ(PI / 2), M.steel);
      arch.position.set(-34.85, s * Y_RAIL, bz + 0.10); G.add(arch);
      G.add(box(THREE, M.team, 0.20, 0.34, 1.00, -34.66, s * (Y_RAIL + 0.94), bz + 0.50));
    }
    /* short bulwark returns up the quarters so the gate does not float */
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(box(THREE, M.sup, 5.20, 0.22, 0.92, -32.2, s * (hwAt(-32.2) - 0.22),
                deckZ(-32.2) + 0.46));
    }

    /* ------------------------------------------------------- mine rails */
    var rl = X_RAIL_F - X_RAIL_A, rcx = (X_RAIL_F + X_RAIL_A) * 0.5;
    var rza = deckZ(X_RAIL_A + 0.9) + 0.11, rzf = deckZ(X_RAIL_F) + 0.11;
    var slope = -Math.atan2(rzf - rza, rl);
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      var R1 = new THREE.Group();
      R1.position.set(rcx, s * Y_RAIL, (rza + rzf) * 0.5);
      R1.rotation.y = slope;
      G.add(R1);
      R1.add(box(THREE, M.deck, rl, 0.86, 0.22, 0, 0, 0));
      R1.add(box(THREE, M.rail, rl, 0.11, 0.15, 0, 0.30, 0.18));
      R1.add(box(THREE, M.rail, rl, 0.11, 0.15, 0, -0.30, 0.18));
      /* stop and roller at the after end, right in the gate */
      R1.add(box(THREE, M.steel, 0.24, 0.90, 0.42, -rl * 0.5 + 0.14, 0, 0.32));
    }

    /* ------------------------------------------------- mines on the rails */
    for (i = 0; i < 6; i++) {
      x = -31.0 + i * 4.0;
      z = deckZ(x) + 0.33;
      G.add(mine(THREE, M, x, Y_RAIL, z));
      G.add(mine(THREE, M, x, -Y_RAIL, z));
    }

    /* ------------------------------------------------- deckhouse, bridge */
    var DHZ = 2.88, DHH = 3.05, DHT = DHZ + DHH;          /* 01 deck        */
    G.add(tbox(THREE, M.sup, 15.10, 7.40, DHH, 0.97, 9.05, 0, DHZ + DHH * 0.5));
    G.add(box(THREE, M.deck, 15.00, 7.55, 0.14, 9.05, 0, DHT + 0.07));
    /* watertight doors and the boat recess read as blocks, not paint */
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(box(THREE, M.door, 0.14, 0.95, 1.80, 1.62, s * 2.20, DHZ + 0.90));
      G.add(cylX(THREE, M.sup, 0.46, 0.46, 1.60, 8, 5.60, s * 4.05, 3.46));
      G.add(box(THREE, M.deck, 1.70, 1.10, 0.16, 5.60, s * 4.05, 3.04));
    }

    var BRZ = DHT + 0.14, BRH = 2.65, BRT = BRZ + BRH;    /* bridge deck    */
    G.add(tbox(THREE, M.sup, 8.40, 6.40, BRH, 0.95, 12.40, 0, BRZ + BRH * 0.5));
    G.add(box(THREE, M.deck, 8.30, 6.55, 0.14, 12.40, 0, BRT + 0.07));
    /* bridge wings, the widest thing above the main deck */
    G.add(box(THREE, M.deck, 1.70, 8.60, 0.16, 15.70, 0, BRT + 0.08));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(box(THREE, M.sup, 1.60, 0.16, 0.86, 15.70, s * 4.22, BRT + 0.50));
      G.add(box(THREE, M.team, 1.20, 0.09, 0.44, 15.70, s * 4.31, BRT + 0.52));
    }
    /* GLASS: wheelhouse front and sides */
    var fw = new THREE.Mesh(new THREE.BoxGeometry(0.30, 5.70, 1.20), M.glass);
    fw.position.set(16.42, 0, BRZ + 1.72); fw.rotation.y = -0.14; G.add(fw);
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      var sw = new THREE.Mesh(new THREE.BoxGeometry(4.60, 0.26, 1.06), M.glass);
      sw.position.set(13.60, s * 3.06, BRZ + 1.72); G.add(sw);
      G.add(box(THREE, M.door, 0.10, 1.30, 0.95, 8.28, s * 1.70, BRZ + 1.62));
    }

    /* ----------------------------------------------------------- funnel */
    var FZ = DHT + 0.14, FH = 2.55;
    G.add(tbox(THREE, M.sup, 2.90, 3.10, FH, 0.84, 4.10, 0, FZ + FH * 0.5));
    G.add(box(THREE, M.dark, 2.60, 2.95, 0.18, 4.10, 0, FZ + FH + 0.09));
    G.add(box(THREE, M.team, 2.72, 3.02, 0.52, 4.10, 0, FZ + FH * 0.74));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(cylZ(THREE, M.dark, 0.22, 0.22, 0.72, 6, 3.70, s * 0.72, FZ + FH + 0.42));
    }
    /* engine room vents each side of the casing */
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(cylZ(THREE, M.sup, 0.40, 0.40, 0.90, 8, 6.60, s * 2.55, DHT + 0.60));
      G.add(cylZ(THREE, M.dark, 0.46, 0.30, 0.34, 8, 6.60, s * 2.55, DHT + 1.20));
    }

    /* ------------------------------------------------------------- mast */
    var MZ = BRT + 0.14, MX = 9.90, MTOP = MZ + 6.60;
    G.add(cylZ(THREE, M.steel, 0.11, 0.19, 6.60, 6, MX, 0, MZ + 3.30));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(strut(THREE, M.steel, [MX - 1.55, s * 1.70, MZ], [MX, 0, MZ + 3.40], 0.075, 4));
    }
    G.add(box(THREE, M.deck, 1.50, 2.40, 0.12, MX, 0, MZ + 2.55));
    G.add(strut(THREE, M.steel, [MX, -2.70, MZ + 3.90], [MX, 2.70, MZ + 3.90], 0.075, 4));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(cylZ(THREE, M.steel, 0.035, 0.045, 1.90, 4, MX, s * 2.55, MZ + 4.85, true));
    }
    /* navigation set on the masthead */
    G.add(cylZ(THREE, M.dark, 0.24, 0.28, 0.42, 8, MX, 0, MZ + 4.55));
    G.add(box(THREE, M.trim, 0.26, 3.10, 0.30, MX, 0, MZ + 4.86));
    G.add(box(THREE, M.trim, 0.55, 0.60, 0.55, MX, 0, MZ + 5.60));

    /* ------------------------------------------------ mine handling crane
       King post on the centreline just abaft the deckhouse, boom topped up
       over the mine deck between the rails.                              */
    var KZ = deckZ(0.0), KX = 0.20;
    G.add(box(THREE, M.deck, 2.60, 2.60, 0.26, KX, 0, KZ + 0.13));
    G.add(cylZ(THREE, M.sup, 0.34, 0.44, 4.40, 8, KX, 0, KZ + 2.30));
    G.add(cylZ(THREE, M.dark, 0.50, 0.50, 0.34, 8, KX, 0, KZ + 4.55));
    var bA = [KX - 0.55, 0, KZ + 0.95], bB = [-8.70, 0, KZ + 3.55];
    G.add(strut(THREE, M.steel, bA, bB, 0.21, 5));
    G.add(strut(THREE, M.steel, [KX, 0, KZ + 4.55], [-8.40, 0, KZ + 3.62], 0.055, 4));
    G.add(strut(THREE, M.steel, [-8.70, 0, KZ + 3.45], [-8.70, 0, KZ + 1.55], 0.045, 4));
    G.add(box(THREE, M.dark, 0.34, 0.34, 0.55, -8.70, 0, KZ + 1.30));
    G.add(box(THREE, M.sup, 1.60, 1.90, 0.90, KX + 1.15, 0, KZ + 0.71));

    /* --------------------------------------------------- deck equipment */
    G.add(box(THREE, M.deck, 2.40, 1.70, 0.30, -13.50, 0, deckZ(-13.5) + 0.19));
    G.add(box(THREE, M.deck, 2.40, 1.70, 0.30, -20.50, 0, deckZ(-20.5) + 0.19));
    G.add(cylZ(THREE, M.sup, 0.42, 0.48, 0.70, 8, -26.50, 0, deckZ(-26.5) + 0.35));
    G.add(box(THREE, M.dark, 1.30, 1.10, 0.55, -25.10, 0, deckZ(-25.1) + 0.28));
    /* ensign staff over the open transom, jackstaff at the stem */
    G.add(cylZ(THREE, M.steel, 0.05, 0.08, 2.60, 5, -34.60, 0, deckZ(-34.6) + 2.20));
    G.add(cylZ(THREE, M.steel, 0.05, 0.08, 2.10, 5, 34.30, 0, deckZ(34.3) + 1.05));
    /* forecastle: windlass, cable and a pair of capstans */
    G.add(box(THREE, M.sup, 2.10, 3.10, 0.95, 30.20, 0, deckZ(30.2) + 0.48));
    G.add(cylX(THREE, M.dark, 0.55, 0.55, 3.30, 8, 30.20, 0, deckZ(30.2) + 0.95));
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      G.add(cylZ(THREE, M.sup, 0.34, 0.40, 0.62, 8, 27.60, s * 1.55, deckZ(27.6) + 0.31));
      G.add(box(THREE, M.dark, 1.60, 0.90, 0.24, 32.60, s * 0.95, deckZ(32.6) + 0.12));
      /* anchor stowed in the hawse on the bow */
      G.add(box(THREE, M.dark, 1.50, 0.30, 1.10, 31.90, s * (hwAt(31.9) - 0.05),
                deckZ(31.9) - 1.30));
    }
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      var bwp = box(THREE, M.sup, 0.26, 5.00, 0.95, 20.30, s * 2.30, deckZ(20.3) + 0.48);
      bwp.rotation.z = s * 0.28; G.add(bwp);
    }

    /* the light gun on the forecastle */
    gunMount(THREE, M, G, 24.60, deckZ(24.6) + 0.10);

    /* ------------------------------------------------------- railings */
    var mainX = [-32.6, -28.5, -24.2, -19.9, -15.6, -11.3, -7.0, -2.7, 1.6, 6.0, 10.4, 14.6, 16.6];
    var foreX = [17.6, 21.0, 24.6, 27.8, 30.4, 32.4, 33.8];
    var pm = edgePts(mainX, 0.32, 0.06), pf = edgePts(foreX, 0.30, 0.06);
    for (i = 0; i < 2; i++) {
      s = i ? 1 : -1;
      var a = [], b = [], j;
      for (j = 0; j < pm.length; j++) a.push([pm[j][0], s * pm[j][1], pm[j][2]]);
      for (j = 0; j < pf.length; j++) b.push([pf[j][0], s * pf[j][1], pf[j][2]]);
      railRun(THREE, G, M.rail, a, 1.02);
      railRun(THREE, G, M.rail, b, 1.00);
      /* the break itself, athwartships across the forecastle front */
      railRun(THREE, G, M.rail,
        [[17.20, s * 0.60, deckZ(17.2) + 0.06], [17.20, s * (hwAt(17.2) - 0.30), deckZ(17.2) + 0.06]],
        1.00);
    }

    G.userData.len = LOA;
    return G;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["navminelayer"] = {
  len: 70,
  build: function (THREE, M, C) { return MineLayer3D.build(THREE, M, C); }
};
