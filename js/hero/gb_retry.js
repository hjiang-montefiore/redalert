/* ======== gb_retry.js - HERO rows retried with Wikipedia's images: the Royal Artillery's M270s ========
   LOAD AFTER js/hero/us_m270_himars.js (this file calls HeroUsMlrs and adds rows to its exposed
   table HeroUsMlrs.rows, as js/hero/deu_us_pattern.js and js/hero/fr_armour2.js do).  Nothing here
   edits another file; the module is called unchanged.

   Rows and what draws them:
     gbr_e80_mlrs  M270, 39 Regiment RA (1989)   REUSED  HeroUsMlrs.build, two M26 pods, the British
                                                         two-colour on a new canvas
     gbr_e90_mlrs  M270, Royal Artillery         REUSED  the same build and paint
     gbr_e00_mlrs  M270B1 (as at home, 2015)     REUSED  HeroUsMlrs.build with GMLRS pods and the A1's
                                                         louvred module panel, plain British green
                                                         (a colour scale), plus the B1's nose basket,
                                                         smoke dischargers and the port cab-side box
   ROWS LOOKED AT AND STILL NOT REGISTERED (their generic models stand; see the report):
     gbr_e60_mlrs (Honest John on the M386).  The only references that are certainly the M386, the
       IWM Duxford launcher ("International Harvester M386 TEL with an Honest John Nuclear Missile
       (5781692428).jpg" and "(5781143913).jpg", Commons, both on en.wikipedia's search), show the
       front half only - the closed cab, the hood, the front wheel, the round's nose over the cab -
       the rear (the short rail, its pedestal and the deck) being hidden behind a Ferret.  The
       en.wikipedia "MGR-1 Honest John" article's images are the M289 (long rail: "Een International
       M139D ... (2155 046863).jpg", captioned M386 in the infobox but drawn with the long rail) and a
       small overview ("Overzicht van voertuigen ... (2155 007716).jpg", B/W, 3/4 from above, the
       M386 at the far left about 400 px across, its rear lost in the trucks in front); the two
       Nationaal Militair Museum frames on Commons ("MGR-1 Honest John rocket on M139D launching truck
       pic1.JPG" / "pic2.JPG") show a rail RAISED and running past the round's nose, which is not the
       short rail, so they are not taken for the M386.  The short rail and the deck cannot be drawn
       from what is in hand, so the row is not built.  Not seen (Wikimedia answered HTTP 429 "robot
       policy" to every fetch for the last hour): Commons "MGR-1 Honest John 01.jpg", "05.jpg",
       "06.jpg" and "Honest John Rocket, CFB Petawawa.JPG" (a search for "M386" lists them).
     gbr_e80_spg (M109A2 in British service).  No photograph of a British M109 of any period was
       found: en.wikipedia "M109 howitzer", "Royal Artillery", "26th / 39th / 4th Regiment Royal
       Artillery", "176 (Abu Klea) Battery", "1st / 2nd Regiment Royal Horse Artillery", "British Army
       of the Rhine", "Battle of Norfolk", "List of Gulf War military equipment", "Abbot (artillery)",
       "M110 howitzer" carry none; Commons searches "M109 British Army", "M109 Royal Artillery",
       "M109 howitzer BAOR", "M109A2 Gulf War British", "self-propelled howitzer Royal Artillery
       1980s" find only Canadian, Dutch, Moroccan and US vehicles ("M109, Artillery School (2).JPG" could
       not be fetched to see whose school it is).  The paint cannot be settled, so
       HeroPaladin "e80" is not repainted and the row is not registered.

   REFERENCES (en.wikipedia "M270 Multiple Launch Rocket System" images; cached in
   scratchpad/q_gbr_ref and q_gbm2_ref):
     [RIAT] "M270 at RIAT 1998.jpg" (Commons, 1998-07-26): a 39 Regiment RA launcher with its
            Royal Artillery display board, port side, module stowed: DARK GREEN with broad BLACK
            disruptive patches over the module side and the cab, no brown.  Sampled (median over the
            module's port side, x 300..560, y 225..300 of the 960 px frame): green 66,68,50 and black
            22,22,23, the black about four tenths of that panel.
     [OTB]  "MLRS firing on the ranges at Otterburn. MOD 45158572.jpg" (en.wikipedia: "British M270
            firing at Otterburn Training Area in 2015", so an M270B1, 48 KJ 62 of the same KJ series
            as the Bastion launchers): port front 3/4: the M270 cab with its THREE louvred shutters
            (hinged up here), the two lamp clusters, the tow eyes - the module's own cab; and the B1's
            fittings: a tube-framed BASKET of crew kit hung on the nose under the lamp band, from the
            starboard edge to inboard of the port lamps; TWO CLUSTERS OF FOUR SMOKE DISCHARGERS on the
            lamp band; a tall BOX on the port side of the cab behind the door (fire extinguishers on
            it); plain green all over (lit cab side 68,72,67 under a snow sky).
     [BAS]  "MLRS (Multiple Launch Rocket System) Vehicles at Camp Bastion, Afghanistan MOD
            45148148.jpg" (2008): two B1s in sand with the bar-armour cage round the cab and module,
            the shutters raised on the windows, a weapon station: the operational armour kit.  NOT
            drawn (HeroUsMlrs cannot draw the cage and this file does not replace its cab).
     Module references (us_m270_himars.js): [G19] the M270A1's louvred panel low on the port side
            of the module (the B1 is the British M270A1, en.wikipedia: "M270B1 ... variant of the
            M270A1, which includes an enhanced armor package").
     Text: en.wikipedia "M270 Multiple Launch Rocket System": 6.85 m (the module measures 7.00),
            2.97 m wide, 2.57 m stowed (British Army figure); the UK bought it in 1989-90; the B1.

   PAINT, by row (no roundels, numbers, plates or unit signs: [RIAT] carries a Union flag on the cab
   and [OTB] the registration and a unit sign, NOT drawn):
     e80, e90: the British two-colour of [RIAT]: green #424432 (the sampled level; the module's
       nato3 green is #424d2f) under black #1b1b1a patches, about 0.39 of the surface.
     e00: plain green #3d413c ([OTB] 68,72,67 at 0.9).
   CAN THE MODULE'S MATERIALS BE RECOLOURED AFTERWARDS?  Partly.  Its paint keys are canvases
     (merdc four colours, nato3 green / brown / black, carc plain green) on a SKIN material made
     fresh for each build.  A colour scale on that material (deu_us_pattern.js' repaint) moves the
     whole canvas by one factor per channel: it turns the plain carc green into another plain green
     (done for e00), but it cannot drop nato3's brown or add black to carc.  So e80/e90 are built
     with "carc" and the build's own SKIN material is given a new two-colour canvas (this file's,
     the module's tile size, worldUV 6.0 kept); the module's cached canvases are not touched and its
     US rows are unchanged.  The painted road-wheel discs are vertex colours: the carc hub colour is
     rewritten to the new green on the build's own wheel geometry.
   ORD (render3d.js looks the round up by the row's weapon key): gbr_e80_mlrs fires
     w_e80_nato_mlrs, so it copies nato_e80_mlrs' ord as it stands, {w_e80_nato_mlrs: "m26"};
     gbr_e90_mlrs fires w_e90_gbr_mlrs, so nato_e90_mlrs' round "m26" is keyed to that weapon;
     gbr_e00_mlrs fires w_e00_gbr_mlrs ("GMLRS - one rocket, one target"): "gmlrs", as mlrs_n.
   NOT CONFIRMED: the black patches' layout (drawn as the module lays its blots, the share and
     colours from [RIAT]); whether the 1989-91 launchers wore the same scheme ([RIAT] is 1998; no
     1989-91 photograph of a British M270 was found: the IWM GLF855 frame is a US launcher at night
     and "Mlrs1stgulfwar.jpg", Feb 1991, is not said to be British); the B1 basket's depth and drop (0.38 m out, z 0.66..1.24,
     from [OTB]'s one oblique view against the 2.9 m cab), the dischargers' places across the band
     (y -0.90 and +0.52 read off [OTB] with no correction for its perspective) and their elevation
     (30 deg); the port box's size; the louvred module panel on a British B1 (from [G19], a US A1:
     [OTB] shows the port side of the module but too dark to tell).  The B1's raised shutters
     ([OTB]) are drawn lowered, as the module draws them for firing.
   Draw calls: 16 for e80/e90 (the module's own), 18 for e00 (+ the fittings' paint and dark).
   Nodes: the module's ("turret" = the launcher module, "podelev", six "roadwheel").
   Model space: +X nose, +Y left (port), +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

/* ======================================================================================================
   THE ROYAL ARTILLERY'S M270s: HeroUsMlrs (js/hero/us_m270_himars.js) builds them, unchanged; this
   file adds three rows to its exposed table and repaints / fits out the group it returns.
   ====================================================================================================== */
var HeroGbRetry = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* the British two-colour of [RIAT] (median of the module's port side: green 66,68,50 and the
     black 22,22,23), authored at the sampled level: the module's own "nato3" green is #424d2f */
  var GB2 = { base: "#424432", band: "#1b1b1a", seed: 1989 };
  /* the plain green of the 2015 M270B1 at [OTB] (the cab's lit port side 68,72,67) at 0.9 */
  var GBB1 = "#3d413c";
  /* the module's "carc" field and hub colour, which the rows below are built with */
  var CARC = "#4b5442", CARC_HUB = 0x4b5442;

  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function s2l(c) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  function hex3(h) { return [parseInt(h.substr(1, 2), 16) / 255, parseInt(h.substr(3, 2), 16) / 255, parseInt(h.substr(5, 2), 16) / 255]; }

  /* the two-colour canvas, on the module's own tile (256 px over 6 m of surface, worldUV 6.0):
     the green field broken by big irregular black patches 1.2 to 3 m long, about a third of the
     surface, as [RIAT] shows them on the module side and the cab; each patch drawn again across
     the tile's edges so it repeats; then the module's own dust and streaks. */
  var _cv;
  function gbCanvas() {
    if (_cv !== undefined) return _cv;
    var W = 256, R = rng(GB2.seed), cv = null, q, i, k, j, a, x0, w, d, pts, ox, oy;
    try {
      cv = document.createElement("canvas"); cv.width = W; cv.height = W;
      q = cv.getContext("2d");
      q.fillStyle = GB2.base; q.fillRect(0, 0, W, W);
      q.fillStyle = GB2.band;
      /* seven big irregular patches, 1.5 times as long as high, laid as the module lays its blots */
      for (i = 0; i < 7; i++) {
        x0 = R() * W; a = R() * W; w = 34 * (0.7 + R() * 0.6); d = (R() - 0.5) * 0.8;
        pts = [];
        for (k = 0; k < 9; k++) {
          var an = k / 9 * TAU, rd = w * (0.5 + R() * 0.75), px = Math.cos(an) * rd * 1.5, py = Math.sin(an) * rd;
          pts.push([px * Math.cos(d) - py * Math.sin(d), px * Math.sin(d) + py * Math.cos(d)]);
        }
        for (j = 0; j < 9; j++) {
          ox = x0 + ((j % 3) - 1) * W; oy = a + (((j / 3) | 0) - 1) * W;
          q.beginPath();
          for (k = 0; k < 9; k++) { if (k) q.lineTo(ox + pts[k][0], oy + pts[k][1]); else q.moveTo(ox + pts[k][0], oy + pts[k][1]); }
          q.closePath(); q.fill();
        }
      }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i & 1) ? "rgba(214,200,160,0.06)" : "rgba(20,18,12,0.08)";
        q.fillRect(R() * W, R() * W, 3 + R() * 18, 1 + R() * 3);
      }
      for (i = 0; i < 30; i++) { q.fillStyle = "rgba(25,25,18,0.06)"; q.fillRect(R() * W, R() * W, 1 + R() * 2, 20 + R() * 50); }
    } catch (e) { cv = null; }
    _cv = cv;
    return cv;
  }
  function gbTex(THREE) {
    var cv = gbCanvas(), t;
    if (!cv) return null;
    try {
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }

  /* the module's materials, found on the group it returns: SKIN (the painted canvas coat, worldUV
     6.0), the DARK metal (#23241f), the WHEEL (vertex colours).  Each build makes its own. */
  function mats(root) {
    var o = { skin: null, dark: null, wheel: null, wheelGeos: [] };
    root.traverse(function (m) {
      if (!m.isMesh || !m.material) return;
      var t = m.material;
      if (t.vertexColors) { o.wheel = t; if (o.wheelGeos.indexOf(m.geometry) < 0) o.wheelGeos.push(m.geometry); }
      else if (t.userData && t.userData.worldUV === 6.0) o.skin = t;
      else if (!o.dark && t.color && t.color.getHex() === 0x23241f) o.dark = t;
    });
    return o;
  }
  /* the painted wheel discs are vertex colours (linear): the module's carc hub to the new green */
  function rehub(o, to) {
    var a = [(CARC_HUB >> 16) & 255, (CARC_HUB >> 8) & 255, CARC_HUB & 255].map(function (c) { return s2l(c / 255); });
    var b = hex3(to).map(s2l), i, k, c, n;
    for (k = 0; k < o.wheelGeos.length; k++) {
      c = o.wheelGeos[k].attributes.color;
      if (!c) continue;
      for (i = 0; i < c.count; i++) {
        if (Math.abs(c.getX(i) - a[0]) < 1e-4 && Math.abs(c.getY(i) - a[1]) < 1e-4 && Math.abs(c.getZ(i) - a[2]) < 1e-4) c.setXYZ(i, b[0], b[1], b[2]);
      }
      c.needsUpdate = true;
    }
  }
  /* REPAINT (the js/hero/deu_us_pattern.js idea): a colour scale on the skin material, taken in
     linear light so that the canvas' field "from" renders as "to".  It changes one hue to another
     and so cannot turn a three-colour coat into a two-colour one, nor draw bands on a plain coat:
     the two-colour rows take a new canvas on the same material instead (the material is the
     build's own; the module's cached canvases are not touched, so its US rows do not change). */
  function scale(m, from, to) {
    var a = hex3(from), b = hex3(to), f = [0, 1, 2].map(function (i) { return s2l(b[i]) / s2l(a[i]); });
    var l2s = function (c) { return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; };
    m.color.setRGB(l2s(s2l(m.color.r) * f[0]), l2s(s2l(m.color.g) * f[1]), l2s(s2l(m.color.b) * f[2]));
  }

  /* --------------------------------------------- a small kit for the B1's fittings (from js/hero/pla_type63_apc.js) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.uvs = 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.uvs;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k + 0.5, q[2] * k);
      }
    }
  };
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function cyl(bin, A, B, r0, r1, seg, nocap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    if (!nocap) {
      base = V.length; na = [-ax[0], -ax[1], -ax[2]];
      V.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, V, F, N);
  }
  /* a thin square bar between two points */
  function bar(bin, A, B, w) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
  }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      var m = new THREE.Mesh(geo, b.mat);
      m.castShadow = true; m.receiveShadow = true;
      group.add(m);
    }
  }

  /* the M270B1 as [OTB] shows it at home (2015), on the module's M270 hull (cab front: the vertical
     lamp band x 3.40, z 1.06..1.52, the lamps at z 1.20..1.44, y 0.96..1.32 a side; the shutters
     above; the nose sloping down from (3.40, 0.98) to (2.75, 0.45); the cab sides y +-1.45 from
     x 0.70 to 2.92):
       - the crew-kit basket hung on the nose under the lamp band, from the starboard edge to just
         inboard of the port lamps, a tube frame with mesh sides;
       - two clusters of four smoke dischargers on the lamp band, pointing forward and up;
       - the box on the port side of the cab behind the door. */
  function b1Fittings(THREE, root, o) {
    var P = new Bin(o.skin, true), D = new Bin(o.dark || o.skin, false), i, k, s, y, a;
    P.uvs = 1 / 6;
    var X0 = 3.42, X1 = 3.80, Y0 = -1.36, Y1 = 0.90, Z0 = 0.66, Z1 = 1.24, T = 0.035;
    /* the basket: floor, four corner posts, top and middle rails, uprights every 0.38 m on the
       front, a dark mesh panel inside each face */
    box(D, X0, X1, Y0, Y1, Z0, Z0 + 0.03);
    [[X0, Y0], [X1, Y0], [X1, Y1], [X0, Y1]].forEach(function (c) { bar(D, [c[0], c[1], Z0], [c[0], c[1], Z1], T); });
    [Z1, (Z0 + Z1) / 2].forEach(function (z) {
      bar(D, [X1, Y0, z], [X1, Y1, z], T); bar(D, [X0, Y0, z], [X1, Y0, z], T); bar(D, [X0, Y1, z], [X1, Y1, z], T);
    });
    for (y = Y0 + 0.38; y < Y1 - 0.1; y += 0.38) bar(D, [X1, y, Z0], [X1, y, Z1], T * 0.8);
    box(D, X1 - 0.012, X1 - 0.004, Y0, Y1, Z0 + 0.03, Z1 - 0.02);
    box(D, X0, X1, Y0 + 0.004, Y0 + 0.012, Z0 + 0.03, Z1 - 0.02);
    box(D, X0, X1, Y1 - 0.012, Y1 - 0.004, Z0 + 0.03, Z1 - 0.02);
    /* the brackets back to the nose */
    for (s = -1; s <= 1; s += 2) bar(D, [X0, s > 0 ? 0.6 : -1.0, Z0 + 0.04], [3.25, s > 0 ? 0.6 : -1.0, 0.86], 0.05);
    /* the smoke dischargers: a mounting plate, four tubes in a 2 x 2 block, 30 deg up */
    [-0.90, 0.52].forEach(function (yc) {
      box(P, 3.40, 3.46, yc - 0.17, yc + 0.17, 1.46, 1.52);
      for (i = 0; i < 2; i++) for (k = 0; k < 2; k++) {
        var c = [3.44, yc + (k ? 0.075 : -0.075), 1.55 + i * 0.13];
        a = 30 * Math.PI / 180;
        cyl(P, c, [c[0] + Math.cos(a) * 0.24, c[1], c[2] + Math.sin(a) * 0.24], 0.055, 0.055, 10);
        cyl(D, [c[0] + Math.cos(a) * 0.235, c[1], c[2] + Math.sin(a) * 0.235], [c[0] + Math.cos(a) * 0.245, c[1], c[2] + Math.sin(a) * 0.245], 0.042, 0.042, 10);
      }
    });
    /* the port-side box behind the cab door, its lid and hasp */
    box(P, 0.72, 1.06, 1.45, 1.66, 1.12, 2.12);
    box(D, 0.70, 1.08, 1.45, 1.67, 2.12, 2.15);
    box(D, 1.06, 1.07, 1.50, 1.60, 1.70, 1.80);
    flush(THREE, root, { paint: P, dark: D });
  }

  /* one row: build it in the module's plain "carc" coat, then paint it */
  function m270(key, THREE, M, C) {
    var g = HeroUsMlrs.build(key, THREE, M, C), o = mats(g), t;
    if (key === "gbr_e00_mlrs") {
      if (o.skin) scale(o.skin, CARC, GBB1);           /* textured (colour 1) or not (colour = CARC) alike */
      rehub(o, GBB1);
      if (o.skin) b1Fittings(THREE, g, o);
    } else {
      t = o.skin ? gbTex(THREE) : null;
      if (t) { o.skin.map = t; o.skin.color.setHex(0xffffff); }
      else if (o.skin) scale(o.skin, CARC, GB2.base);
      rehub(o, GB2.base);
    }
    return g;
  }

  return { m270: m270, GB2: GB2 };
})();

/* the three rows in the M270 module's own table, as deu_us_pattern.js and fr_armour2.js add theirs.
   ord: the round each row's weapon is drawn as in flight (render3d.js looks it up by weapon key):
   the M26 of the source rows nato_e80_mlrs / nato_e90_mlrs, GMLRS for the B1 (as mlrs_n). */
HeroUsMlrs.rows.gbr_e80_mlrs = { veh: "m270", paint: "carc", pods: "rocket", turret: true, louvre: false, ord: { w_e80_nato_mlrs: "m26" } };
HeroUsMlrs.rows.gbr_e90_mlrs = { veh: "m270", paint: "carc", pods: "rocket", turret: true, louvre: false, ord: { w_e90_gbr_mlrs: "m26" } };
HeroUsMlrs.rows.gbr_e00_mlrs = { veh: "m270", paint: "carc", pods: "rocket", turret: true, louvre: true, ord: { w_e00_gbr_mlrs: "gmlrs" } };

/* len is the measured X extent of each build (dump.js) */
UNIT_MODELS["gbr_e80_mlrs"] = { len: 7.00, ord: HeroUsMlrs.rows.gbr_e80_mlrs.ord,
                                build: function (THREE, M, C) { return HeroGbRetry.m270("gbr_e80_mlrs", THREE, M, C); } };
UNIT_MODELS["gbr_e90_mlrs"] = { len: 7.00, ord: HeroUsMlrs.rows.gbr_e90_mlrs.ord,
                                build: function (THREE, M, C) { return HeroGbRetry.m270("gbr_e90_mlrs", THREE, M, C); } };
UNIT_MODELS["gbr_e00_mlrs"] = { len: 7.30, ord: HeroUsMlrs.rows.gbr_e00_mlrs.ord,
                                build: function (THREE, M, C) { return HeroGbRetry.m270("gbr_e00_mlrs", THREE, M, C); } };
