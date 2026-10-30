/* ==================== js/hero/pla_type056.js ============================
   HERO MODEL -- Type 056 "Jiangdao" corvette (PLAN, first ship in service
   March 2013), drawn as the original Type 056 with its bow sonar only:
   the single 76 mm H/PJ-26 forward, the integrated faceted superstructure
   with its enclosed pyramid mast, two twin YJ-83 launchers crossed in the
   waist between the mast block and the funnel, two 30 mm H/PJ-17 remote
   mounts, the eight-round HHQ-10 (FL-3000N) launcher at the after end of
   the superstructure facing the flight deck, and the open helicopter deck
   over the stern with no hangar.  Key: pla_e00_corvette.

   WHICH VARIANT, AND WHY: the roster has two rows for the class.
   js/warship_specs.js gives corvette_c (era e20) the designation "Type
   056A Jiangdao", and js/eras.js notes it "Type 056A, the same".  The e00
   row (service "2013", the year the first ship commissioned) is therefore
   the original Type 056.  en.wikipedia: "Later ships were completed with a
   towed array sonar; these are commonly designated as the Type 056A and
   entered service in November 2014" and "The basic Type 056 is equipped
   with Type 347G (LR66) radar and bow-mounted sonar".  So the 056A's
   variable-depth sonar and towed-array well in the transom is NOT drawn
   here: the transom is plain, with the mooring openings both photographs
   show, and a bow sonar dome is drawn under the forefoot.

   DIMENSIONS: length 89 m overall (js/warship_specs.js 89; en.wikipedia
   gives "90 m" rounded, and its export C13B is also "90 m" -- 89 is used,
   and the photographs below measure 88.6-89.4 m against the beam); beam
   11.14 m (en.wikipedia), drawn as the maximum breadth at the knuckle;
   about 1,500 t (en.wikipedia "1,500 tons"; the full-load figure is the
   one most often quoted for the class).  Draught: en.wikipedia gives 4 m;
   the hull here is drawn to 3.2 m at the keel and the bow sonar dome to
   4.0 m, which is how the two figures are reconciled (NOT CONFIRMED).

   REFERENCES (Wikimedia Commons, fetched at 960 px):
     [P2] "Type 056 corvette in ShangHai (cropped).jpg" -- starboard
          broadside from far off (telephoto, little perspective), bow left,
          960 x 201.  Stem x 0 to transom x 952 = 89 m: 10.67 px/m along
          the length.  Its heights read low against its own lengths: the
          Z-9 on the pad is 34 px tall (Z-9 / AS365 height 4.0 m: 8.5 px/m)
          and every height in the print agrees with [P1] only at about
          8.7 px/m, so the print is taken as squeezed vertically and its
          heights are scaled at 8.7 px/m off the waterline at row 192.
          STATIONS read off it (metres from amidships, + forward): 76 mm
          gun house 22.9 to 27.1 (centre 26.0); foot of the superstructure
          front slope 20.6, top of it 17.8; bridge block 10.3 to 19.5; mast
          block 3.7 to 10.3 with the tower centred 5.1; funnel -2.4 to -6.9;
          the two small radomes -10.3; the after mast -12.6 to -15.0;
          the HHQ-10 -18.8 to -22.5; the after end of the superstructure
          -27.5, curving down to the pad by -29.5; pad to the transom -44.5.
          HEIGHTS (8.7 px/m): forecastle 5.0 m at the gun and 6.0 m at the
          stem head; superstructure roof 7.4 m; bridge roof 9.4 m; mast
          block roof 11.5 m; radar platform 16.3 m; radar top 18.0 m; top
          of the topmast 20.9 m; funnel top 13.3 m; after mast 12.8 m;
          HHQ-10 top 12.3 m; flight deck 6.3 m.
     [P1] "Type 056 corvette ?.jpg" (the title ends in a full-width
          question mark) -- port broadside at closer range,
          bow right, a Z-9 on the pad.  Strong perspective (the stern is
          about 40 per cent farther than the bow: the Z-9 measures 8.3 px/m
          on the pad, the whole ship 10.1 px/m on average), so it is used
          for ORDER and shape, not for stations: the same sequence as [P2]
          (gun, sloped front, bridge, mast block and pyramid tower, waist,
          louvred funnel, radomes, after mast, HHQ-10, a curved step down
          to the pad); the anchor in a pocket low in the stem; two square
          openings in the stern quarter; the forecastle low against the
          superstructure; the white fire-control dish forward of the tower.
     [Y]  "Type 056 corvette anti-ship missiles.jpg" -- the starboard
          waist from above: the YJ-83s are TWO launchers of TWO canisters
          STACKED one over the other, each on a braced pedestal, crossed
          in an X between the mast block and the funnel; the funnel is a
          tall tapered box with louvre panels and a dark top; the mast block
          has the fire-control dish on a pedestal forward of the tower; a
          30 mm remote mount stands low at the after corner of the mast
          block; oval openings in the bulwark.
     [F]  "Type 056 corvette FL-3000N 8-round SAM launcher.jpg" -- the
          after end of the superstructure roof: the HHQ-10 box (two rows of
          four cells, faced aft over the pad) carried on a side arm off a
          column on a round base; ahead of it the small faceted after mast
          with a yard, a white radome before it, two tall upright pipes
          beside it; railings round the roof edge.
     [H]  "PLANS Huangshi (FSG-502) 20170815.jpg" -- a 056A from the air,
          starboard: the plan of the forecastle (fine, with railings), the
          pad over the stern with no hangar, the red boot topping, the light
          grey.  Used for the plan and paint only, not for the 056A fit.
     [W]  en.wikipedia "Type 056 corvette": 1 x H/PJ-26 76 mm, 2 x H/PJ-17
          30 mm, 2 x 2 YJ-83 amidships, 1 x 8 HHQ-10, 2 x triple 324 mm
          tubes, Type 360 search and Type 347G fire-control radars, bow
          sonar; "a helicopter deck ... but no hangar"; 2 SEMT Pielstick
          diesels (two shafts).

   RECOGNITION LIST (where each shows):
     1. A flush stealth hull: flared sides up to a hard knuckle, then the
        sides carried straight up with a slight tumblehome as the side of
        the superstructure itself; low forecastle, raked straight stem
        [P1][P2][H] - STA, W(), shellBand().
     2. The 76 mm H/PJ-26 in a faceted gun house on the forecastle, the
        group named "turret" [P2][P1] - hpj26().
     3. The superstructure front: a long slope up from the forecastle to
        the roof, the raked bridge glazing over it [P2][P1] - deckZ().
     4. The enclosed integrated mast: a faceted block over the bridge and
        a pyramid tower on it, a platform with the Type 360 and a topmast
        [P1][P2][Y] - mast section.
     5. Two twin YJ-83 launchers, canisters stacked, crossed in an X in the
        waist [Y] - yj83().
     6. Two 30 mm H/PJ-17 remote mounts at the after corners of the mast
        block [Y][P1] - hpj17().
     7. The louvred tapered funnel amidships [Y][P2] - funnel section.
     8. The after mast with two radomes before it and two pipes beside it,
        then the HHQ-10 facing aft [F][P2] - hhq10().
     9. The helicopter deck over the stern, no hangar, with railings, a
        touchdown circle [W][P1][P2][H].
    10. Light grey all over; red boot topping and bottom [H][P1].
   NOT CONFIRMED and therefore drawn plainly or left off:
     - all heights: [P2]'s vertical scale is inferred from the Z-9 and
       from [P1]; they may be wrong by about 0.5 m;
     - the plan of the superstructure (widths, the chamfers of the bridge
       and mast block) is from the 3/4 views [Y][F][H] and proportions;
     - the yaw of the YJ-83 launchers (drawn 32 deg off the centreline) and
       which end fires (drawn: the outboard-forward end);
     - the two triple 324 mm tube mounts [W]: they are behind side doors
       in no reference here, and are NOT drawn;
     - the boats and liferafts (none resolved), the hull-side doors;
     - the detail of the Type 360 antenna (drawn as a back-to-back planar
       array) and of the topmast electronics;
     - the underwater body (the draught, the bow dome, the two shafts and
       rudders are from [W]'s two diesels, not from a photograph);
     - the use of the two upright pipes beside the after mast.
   No pennant numbers, names, flags or deck lettering.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The row
   has turret:true and its first weapon is the 76 mm H/PJ-26: the gun is
   the group named "turret"; everything else is baked, one mesh per
   material.  A hidden "helipad" node marks the middle of the pad.
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroType056 = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -44.5, XS1 = 44.5, XWL = 41.6, XST = -43.6;   /* transom, stem head, stem and transom at the waterline [P2][P1] */
  var ROOF = 7.4, PAD = 6.3, BRIDGE = 9.4, MBLK = 11.5;    /* [P2] at 8.7 px/m */

  /* HULL SECTION TABLE: x, half beam at the knuckle, half beam at the
     waterline, bottom z on the centreline, bilge fullness.  The knuckle
     half beam peaks at 5.57 m = 11.14 m [W]; the plan narrowing to the bow
     follows [H]; the forefoot cut-up follows [P1]. */
  var STA = [
    [-44.5, 5.25, 4.70, -0.30, 3.0],
    [-43.6, 5.30, 4.82, -0.90, 3.0],
    [-38.0, 5.45, 5.00, -2.20, 2.8],
    [-28.0, 5.55, 5.10, -3.00, 3.0],
    [-12.0, 5.57, 5.12, -3.20, 3.2],
    [  0.0, 5.57, 5.12, -3.20, 3.2],
    [ 10.0, 5.52, 5.02, -3.20, 3.0],
    [ 18.0, 5.35, 4.72, -3.15, 2.6],
    [ 24.0, 5.05, 4.20, -3.05, 2.2],
    [ 30.0, 4.45, 3.30, -2.85, 1.9],
    [ 35.0, 3.65, 2.25, -2.50, 1.7],
    [ 38.5, 2.85, 1.25, -1.80, 1.5],
    [ 41.6, 1.90, 0.00,  0.00, 1.3],
    [ 43.0, 1.00, 0.00,  0.00, 1.2],
    [ 44.5, 0.12, 0.00,  0.00, 1.2]
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
  /* the top of the side: the pad aft, a curved step up to the superstructure
     roof, the roof, the long front slope down to the forecastle, the
     forecastle rising to the stem head [P2] */
  function deckZ(x) {
    if (x <= -29.5) return PAD;
    if (x <= -27.5) return PAD + (ROOF - PAD) * Math.sin((x + 29.5) / 2.0 * PI / 2);
    if (x <= 17.8) return ROOF;
    if (x <= 20.6) return ROOF - (x - 17.8) / 2.8 * (ROOF - 4.85);
    return 4.85 + 1.15 * Math.pow((x - 20.6) / (XS1 - 20.6), 1.6);
  }
  var ZK = 4.5;                /* the knuckle: flare below, tumblehome above */
  var TH = 0.16;               /* tumblehome, about 9 deg */
  function zKn(x) { return Math.min(ZK, deckZ(x) - 0.05); }
  function zBot(x) {
    if (x > XWL) return deckZ(XS1) * (x - XWL) / (XS1 - XWL);
    if (x < XST) return -0.3 - 0.6 * (x - XS0) / (XST - XS0);
    return pick(x, 3);
  }
  /* half breadth at height z */
  function W(x, z) {
    var zd = deckZ(x), bk = pick(x, 1), bw = pick(x, 2), zb = zBot(x), zk = zKn(x);
    if (z > zd) z = zd;
    if (z <= zb) return 0;
    if (z >= zk) return Math.max(0.05, bk - (z - zk) * TH);
    if (x > XWL) return bk * Math.pow((z - zb) / (zk - zb), 0.62);
    if (x < XST) {
      var f = (XST - x) / (XST - XS0);
      return bk * Math.pow(Math.max(0, (z - zb) / (zk - zb)), 0.2 + 0.3 * f);
    }
    if (z >= 0) return bw + (bk - bw) * (z / zk);
    var n = pick(x, 4), t = Math.min(1, z / zb);
    return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
  }
  function halfTop(x) { return W(x, deckZ(x)); }

  /* ---------------------------------------------------------- textures */
  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function canvasTex(THREE, key, W0, H0, draw) {
    if (TEX[key]) return TEX[key];
    var cv = document.createElement("canvas"); cv.width = W0; cv.height = H0;
    draw(cv.getContext("2d"), W0, H0);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX[key] = t; return t;
  }
  /* hull plating: one tile is 24 m x 8 m (UVs are metres / tile): a welded
     stealth hull shows few seams, so the strakes are faint */
  function hullTex(THREE) {
    return canvasTex(THREE, "hull056", 512, 256, function (g, w, h) {
      var R = rng(5605), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.09; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 4; i++) { g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke(); }
      for (i = 0; i < 4; i++) {
        var xx = i * w / 4 + (i % 2) * 22;
        g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke();
      }
      g.globalAlpha = 0.06;
      for (i = 0; i < 40; i++) {
        g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff";
        g.fillRect(R() * w, R() * h, 2 + R() * 4, 16 + R() * 70);
      }
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "plate056", 256, 256, function (g, w, h) {
      var R = rng(5617), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.11; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke();
      }
      g.globalAlpha = 0.06;
      for (i = 0; i < 26; i++) {
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * w, R() * h, 12 + R() * 50, 8 + R() * 30);
      }
      g.globalAlpha = 1;
    });
  }
  function deckTex(THREE) {
    return canvasTex(THREE, "deck056", 256, 256, function (g, w, h) {
      var R = rng(5611), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 6; i++) { g.beginPath(); g.moveTo(0, i * h / 6); g.lineTo(w, i * h / 6); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }
  /* louvres, scuttle glass, gun ports, cell covers: dark grille bars */
  function grilleTex(THREE) {
    return canvasTex(THREE, "grille056", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

  /* paint: the light PLAN grey of [P1][H], the superstructure a touch
     lighter; dark grey deck, the pad's non-skid darker still; red boot
     topping and bottom [H] */
  var PAINT = { hull: 0x8c959b, sup: 0x959ea3, deck: 0x50575c, pad: 0x3e4448, soot: 0x26292c };
  function makeMats(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:  skin(PAINT.hull, hullTex(THREE), 0.86),
      boot:  skin(0x4a1a15, hullTex(THREE), 0.9),
      under: skin(0x3a1612, hullTex(THREE), 0.9),
      sup:   skin(PAINT.sup, plateTex(THREE), 0.86),
      deck:  skin(PAINT.deck, deckTex(THREE), 0.95),
      pad:   skin(PAINT.pad, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      white: skin(0xc9ccca, plateTex(THREE), 0.8),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: metal(0x5c636a, 0.52, 0.55),
      soot:  metal(PAINT.soot, 0.7, 0.35),
      gun:   metal(0x6d757a, 0.48, 0.45),
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
  function geoOf(THREE, pos, uv, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    if (idx) g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function box(THREE, p, lx, ly, lz, m, x, y, z, rz) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z); if (rz) b.rotation.z = rz; p.add(b); return b;
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
  function sphere(THREE, p, r, m, x, y, z, ws, hs) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, ws || 12, hs || 8), m);
    s.position.set(x, y, z); p.add(s); return s;
  }
  /* a faceted solid between two convex polygons (CCW from above), the lower
     at z0 and the upper at z1, each a list of [x, y]: the stealth
     superstructure, the mast tower, the funnel and the gun house are all
     this one shape */
  function frustum(THREE, p, m, lo, z0, hi, z1) {
    var pos = [], uv = [], n = lo.length, i, a, b, c, d;
    function tri(P, Q, R, side) {
      var v = [P, Q, R], k;
      for (k = 0; k < 3; k++) {
        pos.push(v[k][0], v[k][1], v[k][2]);
        if (side) uv.push((v[k][0] + v[k][1]) * 0.16, v[k][2] * 0.16); else uv.push(v[k][0] * 0.16, v[k][1] * 0.16);
      }
    }
    for (i = 1; i < n - 1; i++) {
      tri([hi[0][0], hi[0][1], z1], [hi[i][0], hi[i][1], z1], [hi[i + 1][0], hi[i + 1][1], z1], false);
      tri([lo[0][0], lo[0][1], z0], [lo[i + 1][0], lo[i + 1][1], z0], [lo[i][0], lo[i][1], z0], false);
    }
    for (i = 0; i < n; i++) {
      a = [lo[i][0], lo[i][1], z0]; b = [lo[(i + 1) % n][0], lo[(i + 1) % n][1], z0];
      c = [hi[(i + 1) % n][0], hi[(i + 1) % n][1], z1]; d = [hi[i][0], hi[i][1], z1];
      tri(a, b, c, true); tri(a, c, d, true);
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  /* a plan rectangle x0..x1, half width hw, its four corners chamfered by
     cf (cf may differ fore and aft); CCW from above */
  function chamf(x0, x1, hw, cfa, cff) {
    return [[x0 + cfa, -hw], [x1 - cff, -hw], [x1, -hw + cff], [x1, hw - cff],
            [x1 - cff, hw], [x0 + cfa, hw], [x0, hw - cfa], [x0, -hw + cfa]];
  }
  /* rings lofted along X (each ring a closed list of [y,z]); capped ends */
  function ringLoft(THREE, p, m, xs, rings, cap) {
    var pos = [], uv = [], idx = [], n = rings[0].length, i, j;
    for (i = 0; i < xs.length; i++) for (j = 0; j < n; j++) {
      pos.push(xs[i], rings[i][j][0], rings[i][j][1]); uv.push(xs[i] * 0.2, j / n);
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, c = a + n, d = b + n;
      idx.push(a, b, c, b, d, c);
    }
    if (cap) [0, xs.length - 1].forEach(function (i0, e) {
      var c0 = pos.length / 3, k, sy = 0, sz = 0;
      for (k = 0; k < n; k++) { sy += rings[i0][k][0]; sz += rings[i0][k][1]; }
      pos.push(xs[i0], sy / n, sz / n); uv.push(0, 0);
      for (k = 0; k < n; k++) {
        var q = i0 * n + k, r = i0 * n + (k + 1) % n;
        if (e === 0) idx.push(c0, r, q); else idx.push(c0, q, r);
      }
    });
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv, idx), m); p.add(mm); return mm;
  }

  /* ---------------------------------------------------------------- hull */
  function hullXs() {
    var xs = [], x, i;
    for (x = XS0; x < XS1 - 0.01; x += 2.0) xs.push(x);
    for (i = 0; i < STA.length; i++) xs.push(STA[i][0]);
    for (x = 34; x < XS1; x += 0.8) xs.push(x);
    for (x = XS0; x < XST; x += 0.3) xs.push(x);
    for (x = -29.5; x < -27.4; x += 0.4) xs.push(x);
    xs.push(17.8, 18.5, 19.2, 19.9, 20.6, XS1);
    xs.sort(function (a, b) { return a - b; });
    return xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.05; });
  }
  /* one band of the shell between heights zlo and zhi, both sides; the
     knuckle row is always one of the rows, so the chine stays hard */
  function shellBand(THREE, m, zlo, zhi, rows) {
    var xs = hullXs(), pos = [], uv = [], idx = [], i, j, s, NR;
    var zsAt = function (x) {
      var zb = zBot(x), zd = deckZ(x), zk = zKn(x);
      var a = Math.min(Math.max(zlo, zb), zd), b = Math.min(Math.max(zhi, zb), zd), out = [], k;
      for (k = 0; k <= rows; k++) out.push(a + (b - a) * k / rows);
      if (zk > a + 0.02 && zk < b - 0.02) {
        var best = 1, bd = 1e9;
        for (k = 1; k < rows; k++) if (Math.abs(out[k] - zk) < bd) { bd = Math.abs(out[k] - zk); best = k; }
        out[best] = zk;
      }
      return out;
    };
    NR = rows + 1;
    for (s = -1; s <= 1; s += 2) {
      var base = pos.length / 3;
      for (i = 0; i < xs.length; i++) {
        var x = xs[i], zz = zsAt(x);
        for (j = 0; j < NR; j++) { pos.push(x, s * W(x, zz[j]), zz[j]); uv.push(x / 24, zz[j] / 8); }
      }
      for (i = 0; i < xs.length - 1; i++) for (j = 0; j < rows; j++) {
        var p0 = base + i * NR + j, p1 = p0 + 1, p2 = p0 + NR, p3 = p2 + 1;
        if (s > 0) idx.push(p0, p1, p2, p1, p3, p2); else idx.push(p0, p2, p1, p1, p2, p3);
      }
    }
    var keep = [];
    for (i = 0; i < idx.length; i += 3) {
      var A = idx[i] * 3, B = idx[i + 1] * 3, Cc = idx[i + 2] * 3;
      var ux = pos[B] - pos[A], uy = pos[B + 1] - pos[A + 1], uz = pos[B + 2] - pos[A + 2];
      var vx = pos[Cc] - pos[A], vy = pos[Cc + 1] - pos[A + 1], vz = pos[Cc + 2] - pos[A + 2];
      var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
      if (cx * cx + cy * cy + cz * cz > 1e-8) keep.push(idx[i], idx[i + 1], idx[i + 2]);
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv, keep), m);
  }
  /* the weather surface edge to edge, 4 strips across, following deckZ:
     forecastle, the sloped superstructure front, the roof, the pad */
  function deckSheet(THREE, m, xa, xb) {
    var xs = hullXs().filter(function (v) { return v >= xa - 1e-6 && v <= xb + 1e-6; });
    var pos = [], uv = [], idx = [], i, j, NC = 4;
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = halfTop(x), z = deckZ(x);
      for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, (w * (1 - 2 * j / NC)) / 8); }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
  }
  /* the transom face [P1][P2] */
  function transom(THREE, g, T) {
    var x = XS0, zb = zBot(x), zd = deckZ(x), N = 8, j, k;
    var pos = [], uv = [];
    for (j = 0; j < N; j++) {
      var z0 = zb + (zd - zb) * j / N, z1 = zb + (zd - zb) * (j + 1) / N;
      var w0 = W(x + 0.001, z0), w1 = W(x + 0.001, z1);
      pos.push(x, -w0, z0, x, w1, z1, x, w0, z0, x, -w0, z0, x, -w1, z1, x, w1, z1);
      for (k = 0; k < 6; k++) uv.push(pos[pos.length - 18 + k * 3 + 1] / 24, pos[pos.length - 18 + k * 3 + 2] / 8);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.hull));
  }
  function edgeY(x) { return Math.max(0.1, halfTop(x) - 0.12); }
  function railRun(THREE, g, T, x0, x1, step, hgt, side) {
    var n = Math.max(2, Math.round(Math.abs(x1 - x0) / step)), s, i, prev, x, y, z;
    for (s = -1; s <= 1; s += 2) {
      if (side && s !== side) continue;
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n; y = s * edgeY(x); z = deckZ(x);
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.035, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.022, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.018, 3);
        }
        prev = [x, y, z];
      }
    }
  }
  function roofRail(THREE, g, T, pts, z, hgt) {
    var i, k;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 2.4));
      for (k = 0; k <= n; k++) {
        if (i > 0 && k === 0) continue;
        var px = a[0] + (b[0] - a[0]) * k / n, py = a[1] + (b[1] - a[1]) * k / n;
        strut(THREE, g, T.metal, px, py, z, px, py, z + hgt, 0.028, 3);
      }
      strut(THREE, g, T.metal, a[0], a[1], z + hgt, b[0], b[1], z + hgt, 0.02, 3);
      strut(THREE, g, T.metal, a[0], a[1], z + hgt * 0.5, b[0], b[1], z + hgt * 0.5, 0.016, 3);
    }
  }

  /* One mesh per material: bake every mesh under root into merged geometry
     in root's frame. */
  function bake(THREE, root) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      if (!geo.attributes.normal) geo.computeVertexNormals();
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

  /* ------------------------------------------------------------ fittings */
  /* a dish facing +X, rim radius rad */
  function dish(THREE, g, m, rad, x, y, z, tilt) {
    var dg = new THREE.SphereGeometry(rad, 14, 4, 0, PI * 2, 0, PI / 3.4);
    dg.scale(1, 0.4, 1); dg.rotateZ(PI / 2);
    if (tilt) dg.rotateY(-tilt);
    var d = new THREE.Mesh(dg, m); d.position.set(x, y, z); g.add(d); return d;
  }

  /* 76 mm H/PJ-26 at rest pointing +X, origin on the ring at the deck:
     a faceted gun house about 4.2 m long, 2.8 m wide and 2.5 m tall [P2],
     hard chines all round, the gun port in a raked nose, the L/62 barrel
     (4.7 m) with its cuff [P1][P2] */
  function hpj26(THREE, g, T) {
    cylZ(THREE, g, 1.35, 1.45, 0.25, 18, T.sup, -0.2, 0, 0.12);
    var lo = [[-2.2, -1.4], [0.9, -1.4], [1.9, -0.7], [1.9, 0.7], [0.9, 1.4], [-2.2, 1.4], [-2.4, 1.1], [-2.4, -1.1]];
    var mid = [[-2.25, -1.32], [0.85, -1.32], [1.75, -0.66], [1.75, 0.66], [0.85, 1.32], [-2.25, 1.32], [-2.45, 1.05], [-2.45, -1.05]];
    var hi = [[-1.9, -0.95], [0.2, -0.95], [0.75, -0.48], [0.75, 0.48], [0.2, 0.95], [-1.9, 0.95], [-2.1, 0.72], [-2.1, -0.72]];
    frustum(THREE, g, T.sup, lo, 0.25, mid, 1.15);
    frustum(THREE, g, T.sup, mid, 1.15, hi, 2.45);
    /* the gun port, the cuff, the barrel and the muzzle brake */
    box(THREE, g, 0.18, 0.8, 0.9, T.dark, 1.72, 0, 1.25);
    var bar = new THREE.Group(); bar.position.set(1.6, 0, 1.28); bar.rotation.y = -0.05;
    cylX(THREE, bar, 0.2, 0.24, 0.9, 12, T.gun, 0.4, 0, 0);
    cylX(THREE, bar, 0.075, 0.09, 4.0, 10, T.gun, 2.85, 0, 0, true);
    cylX(THREE, bar, 0.11, 0.11, 0.42, 10, T.gun, 4.95, 0, 0);
    g.add(bar);
    /* rear door, roof hatch, the team strip on the roof */
    box(THREE, g, 0.06, 0.8, 1.3, T.dark, -2.42, 0, 0.95);
    box(THREE, g, 0.7, 0.6, 0.08, T.sup, -0.9, 0.35, 2.48);
    box(THREE, g, 1.1, 0.7, 0.04, T.team, -1.2, -0.25, 2.47);
    return g;
  }
  /* 30 mm H/PJ-17 remote mount at rest pointing +X: a low drum, a boxy
     cradle with an electro-optic sight on its side, one barrel [Y] */
  function hpj17(THREE, g, T, s) {
    cylZ(THREE, g, 0.55, 0.65, 0.45, 12, T.sup, 0, 0, 0.22);
    frustum(THREE, g, T.white, chamf(-0.7, 0.6, 0.5, 0.15, 0.25), 0.45, chamf(-0.6, 0.45, 0.42, 0.12, 0.2), 1.25);
    box(THREE, g, 0.45, 0.32, 0.4, T.white, 0.05, s * 0.62, 1.0);
    box(THREE, g, 0.05, 0.22, 0.22, T.dark, 0.3, s * 0.62, 1.0);
    cylX(THREE, g, 0.09, 0.11, 0.55, 8, T.gun, 0.85, 0, 0.9);
    cylX(THREE, g, 0.045, 0.05, 1.9, 8, T.gun, 2.0, 0, 0.9, true);
    cylX(THREE, g, 0.065, 0.065, 0.2, 8, T.gun, 2.95, 0, 0.9);
    return g;
  }
  /* one YJ-83 launcher: two canisters stacked, on a braced pedestal, at
     rest pointing +X with a few degrees of elevation [Y].  Canister about
     6.3 x 0.9 x 0.9 m with the rib bands of [Y]. */
  function yj83(THREE, g, T) {
    var i, s;
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, -1.1, s * 0.45, 0, -0.6, s * 0.3, 0.65, 0.07, 5);
      strut(THREE, g, T.metal, 1.1, s * 0.45, 0, 0.6, s * 0.3, 0.65, 0.07, 5);
      strut(THREE, g, T.metal, -1.1, s * 0.45, 0, 1.1, s * 0.45, 0.0, 0.05, 4);
    }
    box(THREE, g, 1.8, 0.9, 0.18, T.metal, 0, 0, 0.7);
    var c = new THREE.Group(); c.position.set(0, 0, 0.8); c.rotation.y = -0.07; g.add(c);
    for (i = 0; i < 2; i++) {
      var z = 0.48 + i * 0.94;
      box(THREE, c, 6.3, 0.9, 0.9, T.white, 0, 0, z);
      box(THREE, c, 0.08, 0.96, 0.96, T.sup, 3.12, 0, z);
      box(THREE, c, 0.08, 0.96, 0.96, T.sup, -3.12, 0, z);
      box(THREE, c, 0.14, 0.95, 0.95, T.sup, -1.1, 0, z);
      box(THREE, c, 0.14, 0.95, 0.95, T.sup, 1.0, 0, z);
    }
    return g;
  }
  /* HHQ-10 (FL-3000N) at rest, its box faced aft over the pad [F]: a round
     base, a column on the starboard side, the eight-cell box (two rows of
     four) carried on the column's arm */
  function hhq10(THREE, g, T) {
    cylZ(THREE, g, 1.05, 1.15, 0.35, 16, T.sup, 0, 0, 0.17);
    cylZ(THREE, g, 0.85, 0.9, 0.4, 14, T.metal, 0, 0, 0.55);
    frustum(THREE, g, T.white, chamf(-0.6, 0.6, 0.38, 0.1, 0.1), 0.75, chamf(-0.45, 0.45, 0.32, 0.08, 0.08), 3.3);
    var bx = new THREE.Group(); bx.position.set(0, 0, 3.75); g.add(bx);
    frustum(THREE, bx, T.white, chamf(-1.3, 1.3, 0.3, 0.05, 0.05), -0.65, chamf(-1.3, 1.3, 0.3, 0.05, 0.05), 0.65);
    box(THREE, bx, 2.5, 1.55, 1.2, T.white, -0.1, 0.0, 0.0).position.y = 0.95;
    box(THREE, bx, 0.06, 1.4, 1.05, T.dark, -1.37, 0.95, 0.0);
    var i, k;
    for (i = 0; i < 2; i++) for (k = 0; k < 4; k++) {
      var c = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.08, 10), T.team);
      c.rotation.z = PI / 2; c.position.set(-1.4, 0.95 - 0.5 + k * 0.33, -0.27 + i * 0.54); bx.add(c);
    }
    box(THREE, bx, 2.5, 0.12, 0.5, T.white, 0.1, 0.25, 0.0);
    box(THREE, g, 1.2, 1.0, 0.7, T.white, 0.3, 0.0, 1.2);
    return g;
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, z;

    /* hull shell in three bands, transom, weather surfaces [P1][P2][H] */
    g.add(shellBand(THREE, T.under, -4, -0.35, 5));
    g.add(shellBand(THREE, T.boot, -0.35, 0.3, 1));
    g.add(shellBand(THREE, T.hull, 0.3, 8, 8));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.pad, XS0, -29.5));
    g.add(deckSheet(THREE, T.sup, -29.5, 20.6));
    g.add(deckSheet(THREE, T.deck, 20.6, XS1));

    /* bow sonar dome under the forefoot [W] (shape NOT CONFIRMED) */
    var bd = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 10), T.under);
    bd.scale.set(4.2, 0.95, 0.95); bd.position.set(33.5, 0, -3.05); g.add(bd);

    /* the anchor pockets low in the stem [P1][P2], scuttles, the two square
       mooring openings in each stern quarter [P1][P2], oval openings in the
       side of the waist [Y] */
    for (s = -1; s <= 1; s += 2) {
      var ax = 40.6, az = 2.6, ay = s * (W(ax, az) + 0.02);
      box(THREE, g, 1.5, 0.12, 0.9, T.dark, ax, ay, az, -s * 0.35);
      box(THREE, g, 1.0, 0.18, 0.6, T.gun, ax + 0.1, ay + s * 0.04, az - 0.05, -s * 0.35);
      [-42.4, -39.6].forEach(function (ox) {
        box(THREE, g, 1.7, 0.1, 1.2, T.dark, ox, s * (W(ox, 4.4) + 0.01), 4.4);
      });
      for (i = 0; i < 9; i++) {
        x = -24 + i * 4.6;
        z = 3.4;
        box(THREE, g, 0.36, 0.08, 0.36, T.dark, x, s * (W(x, z) + 0.01), z);
      }
      [-0.6, 1.8].forEach(function (ox) {
        var oz = 6.3, oy = W(ox, oz) + 0.01;
        box(THREE, g, 1.3, 0.08, 0.55, T.dark, ox, s * oy, oz);
      });
      /* boot topping line kept straight on the knuckle: the chine reads as
         a light line in [P1] -- a thin strip of superstructure grey */
      for (i = 0; i < 11; i++) {
        var xa = -44 + i * 6.0, xb = Math.min(xa + 6.0, 20.0);
        if (xa >= 20) break;
        strut(THREE, g, T.sup, xa, s * (pick(xa, 1) + 0.02), ZK, xb, s * (pick(xb, 1) + 0.02), ZK, 0.05, 4);
      }
    }

    /* ---- the bridge block, x 10.3 to 19.5 at the roof, raked front [P2][H] */
    var bLo = chamf(10.3, 19.4, 4.3, 0.3, 1.6), bHi = chamf(10.6, 17.9, 3.9, 0.3, 1.3);
    frustum(THREE, g, T.sup, bLo, ROOF - 0.05, bHi, BRIDGE);
    /* the glazing: a band round the front and the forward part of the
       sides, 0.03 m proud of the block [P1][H] */
    var gz0 = 8.35, gz1 = 9.15, f0 = (gz0 - ROOF) / (BRIDGE - ROOF), f1 = (gz1 - ROOF) / (BRIDGE - ROOF);
    function lerpP(a, b, f, zz) { return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, zz]; }
    function grow(P, e) { return [P[0] + (P[0] > 14 ? e : 0), P[1] + (P[1] > 0 ? e : -e)]; }
    var gLo = bLo.map(function (P, k) { return grow(lerpP(P, bHi[k], f0, 0), 0.03); });
    var gHi = bLo.map(function (P, k) { return grow(lerpP(P, bHi[k], f1, 0), 0.03); });
    frustum(THREE, g, T.glass, gLo, gz0, gHi, gz1);
    /* the after part of each side is plated, not glazed */
    for (s = -1; s <= 1; s += 2) {
      var py = (bLo[0][1] + (bHi[0][1] - bLo[0][1]) * (f0 + f1) / 2);
      var pp = box(THREE, g, 4.2, 0.06, gz1 - gz0 + 0.04, T.sup, 12.9, s * (Math.abs(py) + 0.06), (gz0 + gz1) / 2);
      pp.rotation.x = s * 0.17;
    }
    roofRail(THREE, g, T, [[10.8, 3.7], [17.6, 3.7], [17.95, 1.1], [17.95, -1.1], [17.6, -3.7], [10.8, -3.7]], BRIDGE, 0.9);
    /* bridge roof gear: EO director, two small domes, whip aerials [P1][P2] */
    cylZ(THREE, g, 0.38, 0.45, 0.9, 10, T.white, 15.8, 0, BRIDGE + 0.45);
    sphere(THREE, g, 0.42, T.white, 15.8, 0, BRIDGE + 1.15);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.12, 0.12, 0.8, 6, T.metal, 13.6, s * 2.6, BRIDGE + 0.4);
      sphere(THREE, g, 0.32, T.white, 13.6, s * 2.6, BRIDGE + 0.95);
      strut(THREE, g, T.metal, 12.2, s * 3.3, BRIDGE, 12.2, s * 3.3, BRIDGE + 4.5, 0.04, 4);
      /* liferaft canisters along the roof edge abaft the 01 front [P1] */
      for (i = 0; i < 2; i++)
        cylX(THREE, g, 0.33, 0.33, 1.2, 8, T.white, 15.4 + i * 1.5, s * 4.65, ROOF + 0.35);
    }

    /* ---- the mast block, x 3.7 to 10.3, and the pyramid tower [P2][Y] */
    var mLo = chamf(3.7, 10.4, 3.4, 0.6, 0.8), mHi = chamf(3.95, 10.0, 3.0, 0.5, 0.6);
    frustum(THREE, g, T.sup, mLo, ROOF - 0.05, mHi, MBLK);
    roofRail(THREE, g, T, [[4.2, 2.9], [9.9, 2.9], [9.9, -2.9], [4.2, -2.9]], MBLK, 0.9);
    var tLo = chamf(3.4, 8.4, 2.3, 0.5, 0.5), tHi = chamf(4.4, 6.4, 0.95, 0.3, 0.3);
    frustum(THREE, g, T.sup, tLo, MBLK - 0.05, tHi, 16.2);
    /* yards on the tower [P1] */
    box(THREE, g, 0.18, 5.2, 0.16, T.metal, 6.0, 0, 14.3);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, 6.0, s * 1.2, 13.6, 6.0, s * 2.5, 14.25, 0.04, 3);
    /* the platform and the Type 360 search radar on its pedestal [W][P1] */
    box(THREE, g, 3.0, 2.6, 0.16, T.metal, 5.4, 0, 16.3);
    roofRail(THREE, g, T, [[4.0, 1.25], [6.85, 1.25], [6.85, -1.25], [4.0, -1.25], [4.0, 1.25]], 16.35, 0.8);
    cylZ(THREE, g, 0.35, 0.45, 0.6, 10, T.metal, 5.4, 0, 16.7);
    box(THREE, g, 0.55, 2.8, 1.05, T.white, 5.4, 0, 17.5);
    box(THREE, g, 0.62, 2.65, 0.12, T.metal, 5.4, 0, 16.95);
    /* the topmast with the ESM drum and a small yard [P1][P2] */
    strut(THREE, g, T.metal, 4.5, 0, 16.3, 4.5, 0, 20.9, 0.09, 6);
    cylZ(THREE, g, 0.32, 0.32, 0.55, 10, T.white, 4.5, 0, 19.3);
    box(THREE, g, 0.1, 2.0, 0.1, T.metal, 4.5, 0, 20.1);
    /* the fire-control dish (Type 347G [W]) on its pedestal forward of the
       tower [Y][P1] */
    cylZ(THREE, g, 0.42, 0.55, 1.2, 10, T.white, 9.2, 0, MBLK + 0.6);
    cylZ(THREE, g, 0.45, 0.45, 0.35, 10, T.white, 9.2, 0, MBLK + 1.35);
    dish(THREE, g, T.white, 0.85, 9.55, 0, MBLK + 1.95, 0.15);

    /* ---- the 30 mm H/PJ-17 at the after corners of the mast block [Y][P1] */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 2.0, 1.7, 0.5, T.sup, 2.8, s * 4.1, ROOF + 0.2);
      var k17 = new THREE.Group(); k17.position.set(2.8, s * 4.1, ROOF + 0.45); hpj17(THREE, k17, T, s); g.add(k17);
    }

    /* ---- the YJ-83 launchers crossed in the waist, x -2.4 to 3.7 [Y]:
       the port launcher fires forward and to port, the starboard one
       forward and to starboard; they cross over the centreline */
    for (s = -1; s <= 1; s += 2) {
      var yl = new THREE.Group();
      yl.position.set(0.55 - (s > 0 ? 0.0 : 0.4), -s * 0.9, ROOF);
      yl.rotation.z = s * 0.56;
      yj83(THREE, yl, T);
      g.add(yl);
    }

    /* ---- the funnel x -2.4 to -6.9: tapered box, louvres, dark top [Y][P2] */
    var fLo = chamf(-6.9, -2.4, 2.15, 0.4, 0.5), fHi = chamf(-6.6, -2.9, 1.7, 0.3, 0.4);
    frustum(THREE, g, T.sup, fLo, ROOF - 0.05, fHi, 13.0);
    frustum(THREE, g, T.soot, fHi, 13.0, chamf(-6.55, -2.95, 1.65, 0.3, 0.4), 13.3);
    frustum(THREE, g, T.dark, chamf(-6.3, -3.2, 1.4, 0.2, 0.3), 13.25, chamf(-6.3, -3.2, 1.4, 0.2, 0.3), 13.32);
    /* louvre panels on the sides, leaning in with the casing [Y] */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++) {
      var lp = box(THREE, g, 1.5, 0.06, 2.4, T.dark, -5.6 + i * 2.1, s * 2.0, 10.6);
      lp.rotation.x = s * 0.08;
    }
    for (i = 0; i < 2; i++) box(THREE, g, 0.06, 1.2, 1.6, T.dark, -6.79, -0.75 + i * 1.5, 10.9);
    /* ---- the two radomes before the after mast [P2][F] */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.3, 0.38, 0.7, 10, T.sup, -10.3, s * 1.7, ROOF + 0.35);
      sphere(THREE, g, 0.62, T.white, -10.3, s * 1.7, ROOF + 1.15, 14, 10);
    }
    /* ---- the after mast, its yard and pole, the two pipes [F][P2] */
    frustum(THREE, g, T.sup, chamf(-15.0, -12.6, 1.15, 0.3, 0.3), ROOF - 0.05, chamf(-14.3, -13.3, 0.5, 0.15, 0.15), 11.0);
    box(THREE, g, 0.16, 3.4, 0.14, T.metal, -13.8, 0, 10.2);
    strut(THREE, g, T.metal, -13.8, 0, 11.0, -13.8, 0, 12.8, 0.06, 5);
    box(THREE, g, 0.5, 0.35, 0.3, T.white, -13.8, 0, 11.15);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.26, 0.28, 2.6, 10, T.sup, -15.4, s * 1.5, ROOF + 1.3);
      cylZ(THREE, g, 0.22, 0.22, 0.06, 10, T.soot, -15.4, s * 1.5, ROOF + 2.62);
    }

    /* ---- the HHQ-10 at the after end of the roof, faced aft [F][P2] */
    var hq = new THREE.Group(); hq.position.set(-20.6, 0, ROOF);
    hhq10(THREE, hq, T); g.add(hq);

    /* ---- roof rails round the superstructure [F][P1] */
    railRun(THREE, g, T, -27.4, 17.6, 2.6, 1.0);
    roofRail(THREE, g, T, [[-27.4, 4.95], [-27.4, -4.95]], ROOF, 1.0);

    /* ---- the flight deck over the stern, no hangar [W][P1][P2][H]:
       touchdown circle, centreline, edge lines, rails, nets */
    var tc = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.1, 3, 32), T.white);
    tc.scale.z = 0.25; tc.position.set(-37.0, 0, PAD + 0.03); g.add(tc);
    box(THREE, g, 13.6, 0.16, 0.03, T.white, -37.2, 0, PAD + 0.02);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 14.4, 0.14, 0.03, T.white, -37.0, s * 4.55, PAD + 0.02);
    box(THREE, g, 0.14, 9.0, 0.03, T.white, -44.2, 0, PAD + 0.02);
    railRun(THREE, g, T, XS0 + 0.2, -29.6, 2.4, 1.0);
    roofRail(THREE, g, T, [[XS0 + 0.2, 4.8], [XS0 + 0.2, -4.8]], PAD, 1.0);
    for (s = -1; s <= 1; s += 2) {
      /* the folded safety nets along the pad edge */
      strut(THREE, g, T.metal, -43.6, s * (W(-43.6, PAD) + 0.4), PAD - 0.15, -30.4, s * (W(-30.4, PAD) + 0.4), PAD - 0.15, 0.06, 4);
      /* bollards and fairleads on the pad edge */
      cylZ(THREE, g, 0.16, 0.16, 0.35, 6, T.metal, -42.8, s * 3.8, PAD + 0.17);
    }

    /* ---- forecastle: the gun's barbette, ground tackle, breakwater,
       jackstaff, railings [P1][P2][H] */
    cylZ(THREE, g, 1.6, 1.75, 0.4, 18, T.sup, 26.0, 0, deckZ(26.0) + 0.1);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.4, 0.46, 0.5, 10, T.metal, 36.4, s * 0.9, deckZ(36.4) + 0.25);
      box(THREE, g, 4.6, 0.16, 0.07, T.gun, 38.8, s * 1.2, deckZ(38.8) + 0.04, -s * 0.2);
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, 31.0, s * 3.4, deckZ(31) + 0.22);
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, 31.6, s * 3.35, deckZ(31.6) + 0.22);
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, 22.4, s * 4.3, deckZ(22.4) + 0.22);
      /* the low breakwater ahead of the gun, a V in plan */
      var bwA = [29.2, s * 3.2], bwB = [31.3, s * 0.15];
      strut(THREE, g, T.sup, bwA[0], bwA[1], deckZ(29.2) + 0.3, bwB[0], bwB[1], deckZ(31.3) + 0.3, 0.3, 4);
    }
    box(THREE, g, 1.1, 0.9, 0.5, T.metal, 35.0, 0, deckZ(35.0) + 0.25);
    strut(THREE, g, T.metal, 43.6, 0, deckZ(43.6), 43.6, 0, deckZ(43.6) + 2.4, 0.045, 4);
    railRun(THREE, g, T, 20.8, 43.4, 2.4, 1.0);

    /* ---- underwater gear: two shafts on A-brackets, screws, two rudders,
       bilge keels [W] (positions NOT CONFIRMED) */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.17, 0.17, 11.0, 8, T.metal, -33.0, s * 2.1, -2.3);
      strut(THREE, g, T.metal, -37.4, s * 2.1, -2.3, -37.4, s * 2.8, -0.9, 0.11, 4);
      strut(THREE, g, T.metal, -37.4, s * 2.1, -2.3, -37.4, s * 1.3, -1.1, 0.11, 4);
      cylX(THREE, g, 0.24, 0.34, 0.7, 8, T.metal, -38.9, s * 2.1, -2.3);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 1.0), T.metal);
        bl.position.set(-38.9, s * 2.1, -2.3); bl.rotation.x = i * PI / 2 + 0.3;
        bl.translateZ(0.6); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 1.8, 0.18, 2.0, T.metal, -41.2, s * 2.1, -1.2);
      box(THREE, g, 24.0, 0.07, 0.45, T.under, -6.0, s * (W(-6, -2.3) + 0.1), -2.35);
    }

    /* team: small strips on up-facing surfaces, 2 cm proud */
    box(THREE, g, 2.2, 0.9, 0.04, T.team, 14.4, 0, BRIDGE + 0.02);
    box(THREE, g, 2.0, 0.8, 0.04, T.team, -24.6, 0, ROOF + 0.02);
    box(THREE, g, 1.6, 0.7, 0.04, T.team, -43.2, 0, PAD + 0.03);

    /* trained mount: the 76 mm H/PJ-26 on the forecastle [P2]; the row's
       first weapon is "76mm H/PJ-26" */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(26.0, 0, deckZ(26.0) + 0.3); hpj26(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    var tb = bake(THREE, tw);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tb.children.slice().forEach(function (c) { tw.add(c); });
    root.add(tw);
    /* the middle of the pad, for render3d deckOf/padSpot (hidden, no
       geometry) */
    var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
    hp.position.set(-37.0, 0, PAD); root.add(hp);
    return root;
  }
  return { build: build };
})();

/* Registration: len is the overall length of the Type 056, 89 m. */
UNIT_MODELS["pla_e00_corvette"] = {
  len: 89.0,
  build: function (THREE, M, C) { return HeroType056.build(THREE, M, C); }
};
