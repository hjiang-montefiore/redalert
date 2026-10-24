/* ============ ru_su24.js - HERO model: Sukhoi Su-24M "Fencer-D" with Kh-31P ===
   One airframe, the Su-24M, drawn for each SEAD row in the paint of its period:
     pact_e90_sead  "Su-24M SEAD"  Sukhoi Su-24M carrying Kh-31P      1990s
     pact_e00_sead  "Su-24M SEAD"  Sukhoi Su-24M (Kh-31P)             2000s
     sead_p         "Su-24M SEAD"  Su-24M (Kh-31P)  (js/rules.js)      today

   References (Wikimedia Commons / Wikipedia, fetched for this file):
     A "Sukhoi Su-24 3-view line drawing.png" (plan with the wings spread
       dashed, front and side views). Its fuselage comes out about 15% short
       against the span, so it is used for the layout only: where the
       intakes, the glove, the wing root, the tailplane and the tail sit
       along the body, the wide flat rear fuselage, the tailplane planform,
       and in the front view the pair of stores under the belly between the
       intake trunks and one under each outer wing.
     B "Sukhoi Su-24M and Su-24MP side-view silhouettes.png" - the Su-24M
       profile, measured column by column at 14.19 px/m (boom tip to fin-tip
       trailing edge = 24.59 m): the pointed radome on a drooped centre line,
       the windscreen rising to a canopy roof flush with the straight spine,
       the fin (leading edge about 63 deg) with its tip fairing and the stubs
       on its trailing edge, the belly rising to the nozzles and the ventral
       fins under the engine section. Its fin stands taller than the
       published 6.19 m height allows with the ground clearance C shows, so
       the fin here keeps the profile's planform brought down to 6.19 m.
     C "Sukhoi Su-24M on the MAKS-2009 (01).jpg" - front quarter, on the
       ground: the big white radome nearly as wide as the body, the boom with
       its vanes, the wide side-by-side cockpit whose two roof hatches hinge
       up, the tall rectangular intakes standing off the fuselage on their
       splitter plates, the twin nose wheels under a mudguard, the twin-wheel
       main legs well outboard, the red star with a white border on the fin.
     D "Sukhoi Su-24M on the MAKS-2009 (02).jpg" - rear quarter: the fin with
       its tip fairing, the brake-chute fairing and the aerial stubs on the
       fin trailing edge, the two nozzles side by side in the wide flat tail,
       the low all-moving tailplane, a ventral fin, the glove pylon and fence.
     E "Su-24 Fencer left side.jpg" (US DoD, 29 Sep 1989, public domain) -
       the late-Soviet finish: light grey all over, white radome, red star.
     F "Sukhoi Su-24 inflight Mishin.jpg" (Su-24M, May 2009) - the 2000s
       finish: one blue-grey all over, white radome.
     G "Russian Sukhoi Su-24 at Latakia (1).jpg" (3 Oct 2015, mil.ru, CC BY
       4.0) and "Sukhoi Su24M bn08 2021.jpg" (Russian Navy, 22 Jul 2021) -
       today's finish: a two-tone disruptive grey (large dark blue-grey
       patches over light grey) on the upper surfaces, sides and fin, light
       grey underneath, white radome. "Sukhoi Su-24M RF-92246 ARMY-2022.jpg"
       shows that a plain light grey one also flies today; the row is drawn
       in the two-tone scheme the two dated photographs show.
     H ru.wikipedia "Су-24" (Su-24M figures): length 24.594 m with the nose
       boom, span 17.638 m at 16 deg and 10.366 m at 69 deg, height 6.193 m,
       wing anhedral -4.5 deg, wheelbase 8.51 m, track 3.31 m.
       en.wikipedia "Sukhoi Su-24": the Su-24M's refuelling probe is
       RETRACTABLE (a parked or cruising aircraft shows only its door), the
       Kaira-24 sight sits in a bulge on the port lower fuselage, Kh-31A/P
       came to the Su-24M with the 2000 upgrade; eight hardpoints - two under
       the fixed gloves, two pivoting under the outer wings, four under the
       fuselage. en.wikipedia "Kh-31": 4.7 m, 0.36 m body, 0.914 m span.
     I "Kh-31 Armia-2018 1.jpg" (the missile: ogive nose, plain cylinder, four
       mid-body wings, four ramjet ducts and four tail fins).

   Recognition list (each shows in the model, with the reference it rests on):
     1. side-by-side two-seat cockpit under a WIDE short canopy, windscreen
        posts, two roof hatches meeting on the centre line, roof flush with
        the straight spine (B, C, G)                         [glass, dark]
     2. long nose: pointed white radome on a drooped centre line, about 3.4 m
        long, and the long boom with its vanes (B, C, G)     [radome, metal]
     3. the M's retractable refuelling probe: drawn stowed, its door outline
        on the nose ahead of the windscreen (H; the door's exact place is
        estimated)                                           [skin texture]
     4. tall rectangular box intakes standing off the body on splitter
        plates, trunks running back into the wide engine section (A, C, D)
     5. variable-sweep shoulder wing: the fixed glove (69 deg leading edge)
        with its fence, outer panels at the 16 deg spread with -4.5 deg
        anhedral, slats and flaps, pivot fairing (A, H)      [skin]
     6. the big single fin, leading edge about 63 deg, rudder, tip fairing,
        brake-chute fairing and aerial stubs on the trailing edge (B, D)
     7. twin ventral fins under the engine section, canted out (B, D, E)
     8. wide flat rear fuselage with the two AL-21F nozzles side by side and
        low all-moving tailplanes (A, B, D)                  [metal, dark]
     9. pylons: glove pylons with the Kh-31P pair, empty pivoting pylons
        under the outer wings, the four fuselage stations (A, H, I)
    10. long-legged gear: twin nose wheels under a mudguard, twin-wheel main
        legs well outboard, about 1 m of clearance under the belly (C, H)
    11. paint by period: E for the 1990s row, F for the 2000s row, G for
        today's row; red star with white and red border on the fin (C-G)

   The sweep. The wing is drawn at the 16 deg spread, as the Su-24 parks and
   cruises in the photographs. The game's wing-fold convention
   (tools/jsc/wingfold_check.js) gives a "wingfold" group only to carrier
   aircraft that fold or oversweep on a deck (the F-14A's sweep is its
   deck fold); a land-based swing-wing such as the EF-111A (us_ef111a.js) is
   drawn spread with no fold group, and the Su-24 follows it.

   Not drawn, for want of a reference: the Kh-58 the e00 row's weapon also
   names (the pair hung is the Kh-31P every row names), the L-080
   Fantasmagoria pod a data comment in eras.js mentions, external tanks.
   Corrections to the earlier file: its canopy ran 3.4 m back to the intake
   lips; B and G give a short canopy (about 2.2 m) ending well ahead of them.
   Its radome was blunt; B and G show a pointed cone. Its black anti-glare
   panel ahead of the windscreen is gone: none of C, F, G shows one. It had no ventral fins,
   no fin-tip fairing, no brake-chute fairing and one finish for all rows.
   Team colour exactly C.team, on two small strips on the upper outer wings.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSu24 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var GROUND = -2.10;                 /* tyre bottoms: 6.19 m under the fin tip (H) */
  var FIN_TOP = 4.09;

  var PXM = 37, XMIN = -12.4, TW = 920;
  var PYM = 24, YMAX = 9.0;
  var TOPH = 432, SIDEH = 190, TH = TOPH + 2 * SIDEH + TOPH;
  var ZTOP = 4.3, ZSPAN = 6.3;

  /* the finishes, sampled off the dated photographs and taken to about 0.85
     of their level for the renderer's ACES lift:
       e90  E (1989): light grey #c2c5c9 sides, #acb3bc fin
       e00  F (2009): blue-grey #aab5ba in sun, #777576 overcast (C)
       e20  G (2015, 2021): light grey #c7cbce, dark blue-grey #676969 */
  var PALS = {
    e90: { top: "#a2a7ab", side: "#a6abaf", belly: "#b4b8bb", dark: null },
    e00: { top: "#8c979c", side: "#919ba0", belly: "#aab1b4", dark: null },
    e20: { top: "#a3a9ad", side: "#a6acaf", belly: "#adb3b6", dark: "#5c6569" }
  };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }
  function pxY(y) { return (YMAX - y) * PYM; }

  /* the red star with its white and red border, as pact_hind_mi24.js draws it */
  function star(g, cx, cy, rx, ry) {
    function path(k) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? 0.40 : 1;
        var x = cx + Math.cos(a) * q * rx * k, y = cy + Math.sin(a) * q * ry * k;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#a8261f"; path(1.24); g.fill();
    g.fillStyle = "#e2e0d8"; path(1.12); g.fill();
    g.fillStyle = "#b22a22"; path(1.0); g.fill();
  }

  var _cv = {};
  function paint(per) {
    if (_cv[per]) return _cv[per];
    var P = PALS[per] || PALS.e20;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = 24101, i, b, x, y, k;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    function sideZ(z, band) { return bandY[band] + clamp((ZTOP - z) / ZSPAN * SIDEH, 0, SIDEH); }
    g.fillStyle = P.top; g.fillRect(0, 0, TW, TOPH);
    g.fillStyle = P.side; g.fillRect(0, TOPH, TW, 2 * SIDEH);
    g.fillStyle = P.belly; g.fillRect(0, TOPH + 2 * SIDEH, TW, TOPH);
    /* today's two-tone scheme (G): large irregular dark blue-grey patches
       over the light grey, on the upper surfaces, the sides from the
       intakes back, and the fin; the nose section and the belly stay light */
    if (P.dark) {
      g.fillStyle = P.dark;
      var blob = function (cx, cy, rx, ry) {
        g.beginPath();
        for (k = 0; k < 5; k++) {
          var a = k / 5 * 2 * PI + R() * 0.7, q = 0.55 + R() * 0.6;
          var bx = cx + Math.cos(a) * rx * q, by = cy + Math.sin(a) * ry * q;
          if (k) g.lineTo(bx, by); else g.moveTo(bx, by);
        }
        g.closePath(); g.fill();
      };
      for (i = 0; i < 15; i++)
        blob(pxX(-12 + (i % 5) * 3.6 + R() * 1.5), (Math.floor(i / 5) + 0.2 + R() * 0.6) * TOPH / 3,
             (1.5 + R() * 1.2) * PXM, (2.0 + R() * 1.8) * PYM);
      for (b = 1; b <= 2; b++) for (i = 0; i < 7; i++)
        blob(pxX(-11.5 + i * 2.3 + R() * 0.8), sideZ(-0.2 + R() * 3.4, b), (1.2 + R() * 0.9) * PXM, (1.0 + R() * 1.0) * SIDEH / ZSPAN);
    }
    /* the lower sides take the paler underside colour */
    for (b = 1; b <= 2; b++) {
      g.fillStyle = P.belly;
      g.fillRect(0, sideZ(-0.62, b), TW, bandY[b] + SIDEH - sideZ(-0.62, b));
    }
    /* panel lines: the frames and the access panels */
    g.strokeStyle = "rgba(0,0,0,0.17)"; g.lineWidth = 1;
    var PANEL_X = [6.6, 4.4, 3.2, 1.0, -1.2, -3.4, -5.6, -7.8, -9.6];
    for (b = 0; b < 4; b++) for (i = 0; i < PANEL_X.length; i++) {
      x = pxX(PANEL_X[i]); g.beginPath(); g.moveTo(x, bandY[b]); g.lineTo(x, bandY[b] + bandH[b]); g.stroke();
    }
    g.strokeStyle = "rgba(0,0,0,0.12)";
    for (b = 1; b <= 2; b++) for (i = 0; i < 14; i++) {
      x = pxX(6.4 - i * 1.25 + R() * 0.3); y = sideZ(0.2 - R() * 0.8, b);
      g.strokeRect(x, y, 0.45 * PXM + R() * 12, 0.30 * SIDEH / ZSPAN + R() * 4);
    }
    /* the stowed refuelling probe's door, on the nose ahead of the
       windscreen on the centre line (H; place estimated) */
    g.strokeStyle = "rgba(0,0,0,0.30)";
    g.strokeRect(pxX(6.86), pxY(0.11), 0.42 * PXM, 0.22 * PYM);
    /* the dielectric strip on the fin leading edge (D) is light: the fin
       sides near the leading edge take the belly tone */
    /* soot behind the nozzles and light weathering */
    var sx = pxX(-11.2), gr = g.createLinearGradient(sx, 0, pxX(-8.6), 0);
    gr.addColorStop(0, "rgba(22,18,14,0.42)"); gr.addColorStop(1, "rgba(22,18,14,0)");
    g.fillStyle = gr; g.fillRect(sx, 0, pxX(-8.6) - sx, TH);
    for (i = 0; i < 60; i++) {
      g.fillStyle = "rgba(24,20,16," + (0.03 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 50, 2 + R() * 8);
    }
    /* red star on both sides of the fin (C-G) */
    for (b = 1; b <= 2; b++) star(g, pxX(-9.55), sideZ(2.25, b), 0.48 * PXM, 0.48 * SIDEH / ZSPAN);
    _cv[per] = cv;
    return cv;
  }

  var _tex = {};
  function skinTexture(per) {
    if (_tex[per] !== undefined) return _tex[per];
    var t = false;
    try {
      t = new V.CanvasTexture(paint(per));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex[per] = t;
    return t;
  }

  /* each face takes the band its normal looks into: top, port, starboard, belly */
  function projUV(geo) {
    var p = geo.attributes.position.array;
    var uv = new Float32Array(p.length / 3 * 2);
    var t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.55 ? 0 : nz < -0.55 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, W;
        if (band === 0) { U = pxX(x); W = clamp(pxY(y), 2, TOPH - 2); }
        else if (band === 3) { U = pxX(x); W = TOPH + 2 * SIDEH + clamp(pxY(y), 2, TOPH - 2); }
        else {
          U = pxX(endOn ? x + y : x);
          W = TOPH + (band - 1) * SIDEH + clamp((ZTOP - z) / ZSPAN * SIDEH, 2, SIDEH - 2);
        }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C, per) {
    var tex = skinTexture(per), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.80, metalness: 0.10 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x9aa2a6);
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x34505a, roughness: 0.10, metalness: 0.30 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xd8dbd8, roughness: 0.50, metalness: 0.10 });
    m.msl   = new V.MeshStandardMaterial({ color: 0x9aa1a3, roughness: 0.45, metalness: 0.45 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit -- */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  /* a cylinder along model x, y or z; r0 is the end toward +axis */
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  /* a round bar from p to q */
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  /* one buffer per material: a single draw call (and one shadow draw) for what
     would otherwise be dozens */
  function merge(list) {
    var pos = [], nor = [], uvs = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3 * 2; j++) uvs.push(u ? u[j] : 0);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uvs, 2));
    return out;
  }
  function mesh(parent, list, mat, name, skinned) {
    if (!list.length) return null;
    var geo = merge(list);
    if (skinned) projUV(geo);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function push(list, geos) {
    if (geos instanceof Array) for (var i = 0; i < geos.length; i++) list.push(geos[i]);
    else list.push(geos);
  }
  /* flat-shaded triangles from corners, three per triangle */
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* A convex solid from its faces; every face is wound away from the centre,
     so the caller need not get the order right. */
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0], fc = [0, 0, 0];
      /* test each triangle against the centre of ITS face, not its first
         corner: on a long thin swept panel with anhedral the first corner
         sits far inboard of the solid's centre and turned the top skin in */
      for (j = 0; j < f.length; j++) { fc[0] += f[j][0] / f.length; fc[1] += f[j][1] / f.length; fc[2] += f[j][2] / f.length; }
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var o = (fc[0] - c[0]) * nx + (fc[1] - c[1]) * ny + (fc[2] - c[2]) * nz;
        if (o >= 0) out.push(a, b, d); else out.push(a, d, b);
      }
    }
    return tris(out);
  }
  /* a closed solid between two sections with the same number of corners */
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  /* aerofoil section: leading edge, crest 15% back, after-body at 75%, sharp
     trailing edge; thickness t along the unit normal nrm */
  function foil(le, te, t, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }
  /* a rectangular block section on a lifting surface, between chord fractions
     f0 and f1, half-thickness h along nrm: the team flashes */
  function blk(le, te, f0, f1, h, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(f0, h), p(f1, h), p(f1, -h), p(f0, -h)];
  }

  /* ---- the loft. A section is a superellipse: e 1 is round, lower e is a
     flat-sided box with rounded corners. Sections run from the nose to the
     tail (decreasing x) and the quads are wound (a, c, b), which for that
     order puts every normal outward. */
  function ls(x, yc, zc, w, h, e) { return { x: x, yc: yc, zc: zc, w: w, h: h, e: e || 1 }; }
  function sgn(v) { return v < 0 ? -1 : 1; }
  function ringOf(s, n) {
    var o = [], j, t, c, sn;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      o.push([s.yc + s.w * sgn(c) * Math.pow(Math.abs(c), s.e), s.zc + s.h * sgn(sn) * Math.pow(Math.abs(sn), s.e)]);
    }
    return o;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], i, j, r;
    for (i = 0; i < secs.length; i++) {
      r = ringOf(secs[i], n);
      for (j = 0; j < n; j++) pos.push(secs[i].x, r[j][0], r[j][1]);
    }
    for (i = 0; i < secs.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, c = (i + 1) * n + j, d = (i + 1) * n + (j + 1) % n;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    function cap(k, dx, front) {
      var s = secs[k], rr = ringOf(s, n), t = [], cy = 0, cz = 0;
      for (j = 0; j < n; j++) { cy += rr[j][0]; cz += rr[j][1]; }
      var o = [s.x + dx, cy / n, cz / n];
      for (j = 0; j < n; j++) {
        var p0 = [s.x, rr[j][0], rr[j][1]], p1 = [s.x, rr[(j + 1) % n][0], rr[(j + 1) % n][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (noseDx !== null && noseDx !== undefined) cap(0, noseDx, true);
    if (tailDx !== null && tailDx !== undefined) cap(secs.length - 1, -tailDx, false);
    return out;
  }
  /* a round body of revolution along x from a profile of [xFraction, radiusFraction],
     nose first, centred on (x, y, z) */
  function revolve(prof, len, r, x, y, z, n, capNose, capTail) {
    var secs = [], i;
    for (i = 0; i < prof.length; i++) secs.push(ls(x + prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], 1));
    return loft(secs, n, capNose === undefined ? 0 : capNose, capTail === undefined ? 0 : capTail);
  }

  function pylon(list, x0, x1, y, zTop, zBot, w) {
    var h = (w || 0.11) / 2, d = (x0 - x1) * 0.12;
    list.push(convex([
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1, y + h, zTop], [x0, y + h, zTop]],
      [[x0 - d, y - h, zBot], [x1 + d * 0.5, y - h, zBot], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1 + d * 0.5, y - h, zBot], [x0 - d, y - h, zBot]],
      [[x0, y + h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x0, y + h, zTop], [x0 - d, y + h, zBot], [x0 - d, y - h, zBot]],
      [[x1, y - h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x1 + d * 0.5, y - h, zBot]]
    ]));
  }
  /* four fins round a store; ang 0 is +, PI/4 is x */
  function fins(list, x, y, z, chordR, chordT, sweep, span, ang, th) {
    for (var k = 0; k < 4; k++) {
      var a = ang + k * PI / 2, cy = Math.cos(a), cz = Math.sin(a), r0 = 0.0, r1 = span;
      var A = [x, y + cy * r0, z + cz * r0], B = [x - chordR, y + cy * r0, z + cz * r0];
      var Cc = [x - sweep - chordT, y + cy * r1, z + cz * r1], D = [x - sweep, y + cy * r1, z + cz * r1];
      var nY = -cz * th, nZ = cy * th;
      list.push(solid([[A[0], A[1] + nY, A[2] + nZ], [B[0], B[1] + nY, B[2] + nZ], [Cc[0], Cc[1] + nY, Cc[2] + nZ], [D[0], D[1] + nY, D[2] + nZ]],
                      [[A[0], A[1] - nY, A[2] - nZ], [B[0], B[1] - nY, B[2] - nZ], [Cc[0], Cc[1] - nY, Cc[2] - nZ], [D[0], D[1] - nY, D[2] - nZ]]));
    }
  }

  /* ------------------------------------------------------------ planform --
     Glove (fixed, A): leading edge 69 deg, 2.36 m forward of the wing root
     where it meets the intake trunk (y 1.55), out to the panel joint at
     y 2.95; straight trailing edge at x -4.55.
     Outer panel at the 16 deg spread (H): root chord 3.41 m at y 2.95, tip
     at y 8.82 (17.64 m span), tip chord 1.5 m, -4.5 deg anhedral (H). */
  var ROOT = 0.90, PO = 2.95, TIP = 8.82;
  function gLE(y) { return 2.36 - (y - 1.55) * 2.605; }
  function gTE(y) { return -4.55; }
  function gT(y)  { return 0.40 - (y - ROOT) * 0.068; }
  function gZ(y)  { return 0.52 - (y - ROOT) * 0.02; }
  function oLE(y) { return gLE(PO) - (y - PO) * 0.2867; }
  function oTE(y) { return -4.70 + (y - PO) * 0.0392; }
  function oT(y)  { return 0.26 - (y - PO) * 0.027; }
  function oZ(y)  { return gZ(PO) - (y - PO) * 0.0787; }
  function gPart(y, s, f0, f1, tk) {
    var le = gLE(y), te = gTE(y), c = le - te;
    return foil([le - c * f0, s * y, gZ(y)], [le - c * f1, s * y, gZ(y)], gT(y) * (tk || 1), [0, 0, 1]);
  }
  function oPart(y, s, f0, f1, tk) {
    var le = oLE(y), te = oTE(y), c = le - te;
    return foil([le - c * f0, s * y, oZ(y)], [le - c * f1, s * y, oZ(y)], oT(y) * (tk || 1), [0, 0, 1]);
  }

  /* fin (B, brought to the published height): leading edge about 63 deg,
     trailing edge leaning back to the tip; root buried in the spine */
  var FIN_BASE = 0.45;
  function finLE(z) { return -5.04 - (z - 0.97) * 1.95; }
  function finTE(z) { return -11.16 - (z - 0.97) * 0.35; }
  function finT(z)  { return 0.30 - (z - FIN_BASE) / (FIN_TOP - FIN_BASE) * 0.20; }
  function finPart(z, f0, f1) {
    var le = finLE(z), te = finTE(z), c = le - te;
    return foil([le - c * f0, 0, z], [le - c * f1, 0, z], finT(z), [0, 1, 0]);
  }

  /* ---- station table, nose to tail. Side profile from B (measured at
     14.19 px/m, x = 12.34 - (374 - px) / 14.19, the body's depth taken at
     0.066 m/px so that fin, body and gear fit the published 6.19 m);
     widths from C and A.
       x      top    bottom   (B)
     10.72   -0.43   -0.43    radome tip
     10.30   -0.29   -0.56
      9.94   -0.16   -0.62
      9.24    0.00   -0.76
      8.53    0.17   -0.90
      7.13    0.43   -0.95    radome joint about 7.3 (G)
      6.85    0.56   -0.95    windscreen base
      5.9-5.0 1.10           canopy roof, a low hump over the spine (B, C)
      4.5-1.0 0.96   -0.98    spine; belly
     -5.6 to -9.2            ventral fins under the engine section
     -12.25                  fin-tip trailing edge                      */
  /* white radome: a pointed cone on a drooped centre line (B, G) */
  var NOSE = [ls(10.72, 0, -0.43, 0.03, 0.03), ls(10.58, 0, -0.428, 0.11, 0.09), ls(10.30, 0, -0.42, 0.22, 0.17),
              ls(9.94, 0, -0.405, 0.34, 0.26), ls(9.50, 0, -0.39, 0.47, 0.36), ls(8.90, 0, -0.37, 0.61, 0.47),
              ls(8.20, 0, -0.34, 0.74, 0.58, 0.95), ls(7.30, 0, -0.28, 0.85, 0.70, 0.90)];
  /* the body: wide flat-sided cockpit section (side-by-side seats), the
     straight spine from the canopy back, tapering to the tail cone */
  var FUS = [ls(7.30, 0, -0.28, 0.85, 0.70, 0.90), ls(6.85, 0, -0.22, 0.90, 0.78, 0.78),
             ls(6.20, 0, -0.19, 0.93, 0.80, 0.66), ls(5.00, 0, -0.18, 0.94, 0.80, 0.60),
             ls(4.65, 0, -0.12, 0.94, 0.88, 0.58), ls(4.30, 0, -0.03, 0.94, 0.98, 0.58),
             ls(3.30, 0, -0.01, 0.94, 0.97, 0.58), ls(1.00, 0, -0.01, 0.93, 0.97, 0.56),
             ls(-2.00, 0, -0.01, 0.92, 0.97, 0.56), ls(-4.50, 0, -0.01, 0.90, 0.97, 0.58),
             ls(-6.50, 0, 0.02, 0.84, 0.92, 0.62), ls(-8.50, 0, 0.10, 0.72, 0.78, 0.70),
             ls(-10.00, 0, 0.18, 0.55, 0.55, 0.75), ls(-10.90, 0, 0.20, 0.38, 0.38, 0.80),
             ls(-11.35, 0, 0.20, 0.20, 0.22, 0.90)];
  /* the broad flat engine section: intake trunks run into it, the two
     AL-21F nozzles leave it side by side; belly rising to the nozzles (B) */
  var REAR = [ls(0.60, 0, -0.25, 1.20, 0.60, 0.45), ls(-0.20, 0, -0.22, 1.50, 0.70, 0.40),
              ls(-2.50, 0, -0.22, 1.56, 0.72, 0.40), ls(-5.00, 0, -0.20, 1.52, 0.72, 0.42),
              ls(-7.00, 0, -0.14, 1.45, 0.68, 0.45), ls(-8.60, 0, -0.06, 1.36, 0.60, 0.50),
              ls(-9.80, 0, 0.06, 1.28, 0.50, 0.55), ls(-10.40, 0, 0.08, 1.24, 0.48, 0.60)];
  /* the wide two-seat canopy: about 2.3 m from the windscreen base to the
     hatch rear (B, G), nearly the body's width (C), roof just above the spine */
  var CAN = [ls(6.85, 0, 0.55, 0.26, 0.03), ls(6.62, 0, 0.58, 0.62, 0.22, 0.80),
             ls(6.25, 0, 0.61, 0.74, 0.39, 0.74), ls(5.80, 0, 0.62, 0.78, 0.47, 0.72),
             ls(5.10, 0, 0.62, 0.78, 0.48, 0.72), ls(4.75, 0, 0.62, 0.73, 0.44, 0.75),
             ls(4.50, 0, 0.62, 0.60, 0.38, 0.80)];
  function trunk(s) {
    return [ls(3.30, s * 1.29, -0.17, 0.29, 0.62, 0.22), ls(2.00, s * 1.30, -0.18, 0.30, 0.64, 0.28),
            ls(0.00, s * 1.30, -0.22, 0.29, 0.68, 0.35), ls(-1.50, s * 1.28, -0.24, 0.26, 0.66, 0.40)];
  }
  var P_KH = [[0.50, 0.03], [0.44, 0.45], [0.36, 0.80], [0.26, 0.96], [0.15, 1.0], [-0.10, 1.0], [-0.30, 0.95], [-0.50, 0.82]];
  var P_RAM = [[0.50, 0.30], [0.46, 0.90], [0.36, 1.0], [-0.40, 1.0], [-0.50, 0.70]];
  var P_POD = [[0.50, 0.05], [0.40, 0.70], [0.25, 1.0], [-0.30, 1.0], [-0.50, 0.45]];

  /* a section of a loft at any x, for the canopy frames */
  function secAt(secs, x) {
    for (var i = 0; i < secs.length - 1; i++) {
      var a = secs[i], b = secs[i + 1];
      if (x <= a.x && x >= b.x) {
        var t = (a.x - x) / (a.x - b.x);
        var L = function (p, q) { return p + (q - p) * t; };
        return ls(x, L(a.yc, b.yc), L(a.zc, b.zc), L(a.w, b.w), L(a.h, b.h), L(a.e, b.e));
      }
    }
    return secs[secs.length - 1];
  }
  /* a frame bar over the canopy at x, above the sill */
  function arch(list, x, zMin, r) {
    var s = secAt(CAN, x), q = ls(s.x, s.yc, s.zc, s.w * 1.012, s.h * 1.012, s.e), ring = ringOf(q, 32), j, prev = null;
    for (j = 0; j <= 16; j++) {
      var p = ring[j % 32];
      if (p[1] < zMin) { prev = null; continue; }
      var P = [x, p[0], p[1]];
      if (prev) list.push(bar(prev, P, r, 6));
      prev = P;
    }
  }
  function topAt(x) { var s = secAt(CAN, x); return s.zc + s.h * 1.01; }

  /* Kh-31P: 4.7 m, 0.36 m across, 0.914 m span (H); ramjet ducts and fins from I */
  function kh31(K, x, y, zTop) {
    var len = 4.7, r = 0.18, zc = zTop - 0.08 - r, i, a;
    push(K.msl, revolve(P_KH, len, r, x, y, zc, 20, 0, 0));
    push(K.pale, revolve([[0.50, 0.02], [0.44, 0.45], [0.38, 0.78]], 0.55, r, x + len * 0.5 - 0.14, y, zc, 20, 0, 0));  /* seeker radome */
    K.dark.push(cyl(r * 0.8, r * 0.7, 0.05, 14, "x", x - len * 0.5 - 0.02, y, zc));
    for (i = 0; i < 4; i++) {            /* ramjet ducts along the rear body */
      a = PI / 4 + i * PI / 2;
      push(K.msl, revolve(P_RAM, 1.45, 0.075, x - len * 0.5 + 0.95, y + Math.cos(a) * 0.235, zc + Math.sin(a) * 0.235, 8, 0, 0));
    }
    fins(K.msl, x + len * 0.04, y, zc, 0.50, 0.22, 0.28, 0.457, PI / 4, 0.010);
    fins(K.msl, x - len * 0.5 + 0.60, y, zc, 0.50, 0.22, 0.28, 0.457, 0, 0.010);
    K.metal.push(box(2.3, 0.10, 0.12, x + 0.2, y, zTop - 0.04));   /* launcher rail */
  }
  /* a flat disc facing aft (-x) */
  function aftDisc(r, seg, x, y, z) {
    var g = new V.CircleGeometry(r, seg);
    g.rotateY(-PI / 2);
    g.translate(x, y, z);
    return g;
  }
  /* the engine section's underside at x, a little inside the skin */
  function rearBottom(x) {
    var s = secAt(REAR, x);
    return s.zc - s.h * 0.97;
  }

  function buildAirframe(THREE, C, per) {
    V = THREE;
    var T = makeMats(C, per);
    var g = new V.Group();
    g.name = "su24";
    var K = { skin: [], dark: [], metal: [], glass: [], team: [], pale: [], msl: [] };
    var G = { metal: [], tyre: [], dark: [], skin: [] };
    var s, i, x, z;

    /* ---- radome (white), body, engine section, canopy */
    push(K.pale, loft(NOSE, 40, 0.02, null));
    push(K.skin, loft(FUS, 48, null, 0.03));
    push(K.skin, loft(REAR, 44, 0, 0));
    push(K.glass, loft(CAN, 36, 0.02, 0));
    /* canopy frames (C): the windscreen arch and its two posts, the two
       roof hatches meeting on the centre line, the hatch rear arch, sills */
    arch(K.dark, 6.25, 0.60, 0.034);
    arch(K.dark, 4.62, 0.62, 0.034);
    for (s = -1; s <= 1; s += 2) {
      K.dark.push(bar([6.80, s * 0.30, 0.60], [6.27, s * 0.40, topAt(6.27) - 0.10], 0.024, 6));
      K.dark.push(bar([6.25, s * 0.80, 0.63], [4.62, s * 0.76, 0.63], 0.026, 6));
    }
    for (x = 6.25; x > 4.62; x -= 0.40) K.dark.push(bar([x, 0, topAt(x)], [Math.max(4.62, x - 0.40), 0, topAt(Math.max(4.62, x - 0.40))], 0.030, 6));
    /* aerials on the spine: the mast behind the canopy (G) and the blade (B) */
    K.metal.push(bar([3.25, 0, 0.95], [3.15, 0, 1.30], 0.022, 6));
    K.metal.push(box(0.04, 0.22, 0.03, 3.15, 0, 1.30));
    K.skin.push(box(0.30, 0.04, 0.22, 1.50, 0, 1.05));
    /* the low fairing on the spine over the wing centre section (B, D) */
    push(K.skin, loft([ls(-1.45, 0, 0.93, 0.06, 0.03), ls(-1.75, 0, 0.93, 0.24, 0.13, 0.8), ls(-3.00, 0, 0.93, 0.26, 0.14, 0.8),
                       ls(-3.45, 0, 0.93, 0.06, 0.03)], 14, 0.02, 0.02));
    /* nose boom with its vanes (C), from the radome tip */
    K.metal.push(cyl(0.022, 0.06, 1.62, 10, "x", 11.53, 0, -0.43));
    K.metal.push(box(0.10, 0.24, 0.012, 11.84, 0, -0.43));
    K.metal.push(box(0.10, 0.012, 0.24, 11.98, 0, -0.43));
    /* Kaira-24 sight bulge, port lower fuselage (H; place estimated) */
    push(K.skin, loft([ls(5.30, 0.60, -0.92, 0.05, 0.03), ls(5.00, 0.60, -0.97, 0.20, 0.13), ls(4.20, 0.60, -0.97, 0.22, 0.13),
                       ls(3.90, 0.60, -0.94, 0.07, 0.05)], 14, 0.02, 0.02));
    K.dark.push(box(0.30, 0.20, 0.02, 4.75, 0.60, -1.101));

    /* ---- the two tall rectangular side intakes, trunks and splitter plates (C, A) */
    for (s = -1; s <= 1; s += 2) {
      push(K.skin, loft(trunk(s), 28, 0, 0));
      K.dark.push(box(0.02, 0.48, 1.12, 3.31, s * 1.29, -0.17));              /* the mouth */
      K.skin.push(box(2.20, 0.03, 1.36, 2.50, s * 0.965, -0.18));             /* splitter plate */
      K.skin.push(box(1.60, 0.10, 0.04, 2.40, s * 0.975, 0.44));              /* its top bracket */
      K.skin.push(box(0.06, 0.62, 0.05, 3.33, s * 1.29, 0.47));               /* the mouth's top lip */
      K.skin.push(box(0.06, 0.62, 0.05, 3.33, s * 1.29, -0.81));              /* and its bottom lip */
    }
    /* ---- twin AL-21F nozzles: metal shrouds, closed by a dark exit disc */
    for (s = -1; s <= 1; s += 2) {
      push(K.metal, loft([ls(-9.60, s * 0.72, 0.08, 0.57, 0.57), ls(-10.40, s * 0.72, 0.08, 0.56, 0.56),
                          ls(-11.02, s * 0.72, 0.08, 0.51, 0.51)], 28, null, 0));
      K.dark.push(aftDisc(0.44, 22, -11.025, s * 0.72, 0.08));
    }

    /* ---- glove, outer panels, flaps, glove fences, team strips */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(gPart(ROOT, s, 0, 1), gPart(1.55, s, 0, 1)));
      K.skin.push(solid(gPart(1.55, s, 0, 1), gPart(PO, s, 0, 1)));
      var fx0 = gLE(PO) - 0.05, fx1 = gTE(PO) - 0.05, fz = gZ(PO);
      K.skin.push(solid(
        [[fx0, s * (PO - 0.03), fz + 0.05], [fx1, s * (PO - 0.03), fz + 0.08], [fx1 + 0.4, s * (PO - 0.03), fz + 0.30], [fx0 - 0.8, s * (PO - 0.03), fz + 0.26]],
        [[fx0, s * (PO + 0.01), fz + 0.05], [fx1, s * (PO + 0.01), fz + 0.08], [fx1 + 0.4, s * (PO + 0.01), fz + 0.30], [fx0 - 0.8, s * (PO + 0.01), fz + 0.26]]));
      K.skin.push(solid(oPart(PO, s, 0, 0.14, 0.8), oPart(TIP - 0.05, s, 0, 0.14, 0.8)));       /* slat */
      K.skin.push(solid(oPart(PO, s, 0.15, 0.74), oPart(TIP - 0.05, s, 0.15, 0.74)));
      K.skin.push(solid(oPart(PO + 0.05, s, 0.755, 1.0, 0.85), oPart(6.0, s, 0.755, 1.0, 0.85)));  /* flaps */
      K.skin.push(solid(oPart(6.02, s, 0.755, 1.0, 0.85), oPart(TIP - 0.05, s, 0.755, 1.0, 0.85)));
      var tz = oZ(TIP);
      K.skin.push(solid(
        foil([oLE(TIP - 0.05), s * (TIP - 0.05), oZ(TIP - 0.05)], [oTE(TIP - 0.05), s * (TIP - 0.05), oZ(TIP - 0.05)], oT(TIP - 0.05), [0, 0, 1]),
        foil([oLE(TIP) - 0.10, s * TIP, tz], [oTE(TIP) + 0.06, s * TIP, tz], 0.015, [0, 0, 1])));
      var tb = function (yy) {
        var le = oLE(yy), te = oTE(yy), z = oZ(yy), h = oT(yy) * 0.47 + 0.01;
        return blk([le, s * yy, z], [te, s * yy, z], 0.28, 0.66, h, [0, 0, 1]);
      };
      K.team.push(solid(tb(6.3), tb(6.8)));
      /* the pivot's fairing under the glove trailing edge */
      push(K.skin, loft([ls(-3.20, s * 2.55, gZ(2.55) - 0.10, 0.05, 0.04), ls(-3.70, s * 2.55, gZ(2.55) - 0.12, 0.20, 0.13),
                         ls(-4.90, s * 2.55, gZ(2.55) - 0.10, 0.18, 0.11), ls(-5.30, s * 2.55, gZ(2.55) - 0.08, 0.04, 0.03)], 12, 0, 0));
    }

    /* ---- tailplane: low, all-moving slabs on the engine-section sides (A, B) */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(foil([-5.60, s * 1.20, -0.50], [-9.70, s * 1.20, -0.50], 0.26, [0, 0, 1]),
                        foil([-9.75, s * 4.25, -0.50], [-10.95, s * 4.25, -0.50], 0.08, [0, 0, 1])));
      K.metal.push(cyl(0.12, 0.12, 0.10, 12, "y", -8.10, s * 1.37, -0.50));
    }
    /* ---- twin ventral fins under the engine section, canted out (B, D, E):
       root -5.2 to -8.7, about 0.5 m deep, the lower edge rising aft */
    for (s = -1; s <= 1; s += 2) {
      var ca = 0.26, vy = 0.80, rA = rearBottom(-5.20) + 0.04, rB = rearBottom(-8.70) + 0.04;
      var P0 = [-5.20, s * vy, rA], P1 = [-8.70, s * vy, rB];
      var P2 = [-8.45, s * (vy + 0.30 * Math.sin(ca)), rB - 0.30 * Math.cos(ca)];
      var P3 = [-6.00, s * (vy + 0.52 * Math.sin(ca)), rA - 0.52 * Math.cos(ca)];
      var ny = Math.cos(ca) * 0.035 * s, nz = Math.sin(ca) * 0.035;
      var off = function (p, k) { return [p[0], p[1] + ny * k, p[2] + nz * k]; };
      K.skin.push(solid([off(P0, 1), off(P1, 1), off(P2, 1), off(P3, 1)], [off(P0, -1), off(P1, -1), off(P2, -1), off(P3, -1)]));
    }
    /* ---- fin with rudder */
    K.skin.push(solid(finPart(FIN_BASE, 0, 0.80), finPart(2.20, 0, 0.80)));
    K.skin.push(solid(finPart(2.20, 0, 0.80), finPart(FIN_TOP, 0, 0.80)));
    K.skin.push(solid(finPart(FIN_BASE, 0.80, 1.0), finPart(1.25, 0.80, 1.0)));
    K.skin.push(solid(finPart(1.27, 0.815, 1.0), finPart(FIN_TOP - 0.14, 0.815, 1.0)));     /* rudder */
    K.skin.push(solid(finPart(FIN_TOP - 0.12, 0.80, 1.0), finPart(FIN_TOP, 0.80, 1.0)));
    /* the fin-tip fairing, standing a little proud fore and aft (B, D) */
    push(K.skin, revolve(P_POD, 1.50, 0.09, -11.48, 0, FIN_TOP - 0.08, 12, 0, 0));
    /* on the fin trailing edge (B, D): the brake-chute fairing at its base
       and an aerial pod halfway up */
    push(K.skin, revolve([[0.50, 0.70], [0.42, 1.0], [-0.20, 1.0], [-0.50, 0.30]], 1.90, 0.21, -11.12, 0, 0.66, 14, 0, 0));
    z = 1.75;
    push(K.skin, revolve(P_POD, 0.95, 0.07, finTE(z) - 0.12, 0, z, 10, 0, 0));

    /* ---- pylons (A, H): glove pylons with the two Kh-31P (I); the pivoting
       outer-wing pylons and the four fuselage stations, empty. The fuselage
       stations stand in two side-by-side pairs between the trunks, as A's
       front view shows the pair; their tandem spacing is estimated. */
    for (s = -1; s <= 1; s += 2) {
      pylon(K.skin, 0.30, -2.50, s * 2.10, gZ(2.10), 0.06, 0.13);
      kh31(K, -0.85, s * 2.10, 0.06);
      var py = 5.0;
      pylon(K.skin, oLE(py) - 0.40, oLE(py) - 2.20, s * py, oZ(py) - 0.02, oZ(py) - 0.40, 0.12);
      pylon(K.skin, 1.40, 0.10, s * 0.45, -0.90, -1.17, 0.11);
      pylon(K.skin, -1.70, -3.00, s * 0.45, -0.90, -1.17, 0.11);
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.pale, T.pale, "radome");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.msl, T.msl, "stores");

    /* ---- landing gear (C; wheelbase 8.51 m and track 3.31 m from H): it
       retracts, so the group is named "gear"; the tyres are the lowest points */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = 6.05, nr = 0.33, nz = GROUND + nr;
    G.metal.push(bar([6.22, 0, -0.95], [nx + 0.02, 0, nz + 0.06], 0.07, 10));
    G.metal.push(cyl(0.045, 0.045, 0.62, 8, "y", nx, 0, nz));
    G.metal.push(bar([5.20, 0, -0.95], [nx + 0.02, 0, nz + 0.50], 0.035, 6));
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(cyl(nr, nr, 0.20, 22, "y", nx, s * 0.20, nz));
      G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.21, 12, "y", nx, s * 0.20, nz));
      G.skin.push(box(1.40, 0.02, 0.42, 5.95, s * 0.33, -1.17));               /* bay doors */
    }
    G.dark.push(box(0.78, 0.66, 0.04, nx - 0.02, 0, nz + nr + 0.07));         /* mudguard (C) */
    G.metal.push(bar([nx + 0.28, 0, nz + nr + 0.07], [6.20, 0, nz + nr + 0.30], 0.025, 6));
    var mx = -2.45, mr = 0.46, mz = GROUND + mr, my = 1.655;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([-1.80, s * 1.40, -0.82], [mx + 0.03, s * my, mz + 0.06], 0.09, 10));
      G.metal.push(cyl(0.06, 0.06, 0.66, 8, "y", mx, s * my, mz));
      G.metal.push(bar([-0.70, s * 1.36, -0.86], [mx + 0.05, s * (my - 0.04), mz + 0.55], 0.045, 6));
      for (i = -1; i <= 1; i += 2) {
        G.tyre.push(cyl(mr, mr, 0.28, 26, "y", mx, s * my + i * 0.18, mz));
        G.metal.push(cyl(mr * 0.52, mr * 0.52, 0.29, 14, "y", mx, s * my + i * 0.18, mz));
      }
      G.skin.push(box(1.40, 0.025, 0.52, -1.20, s * 1.60, -1.06));            /* main bay door */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    mesh(gr, G.skin, T.skin, "gear_doors", true);
    return g;
  }

  return { build: function (THREE, M, C, per) { return buildAirframe(THREE, C, per || "e20"); } };
})();

/* len is the measured x extent: nose-boom tip to the fin-tip fairing; each
   row takes the finish of its period */
UNIT_MODELS["pact_e90_sead"] = { len: 24.6, build: function (THREE, M, C) { return HeroSu24.build(THREE, M, C, "e90"); } };
UNIT_MODELS["pact_e00_sead"] = { len: 24.6, build: function (THREE, M, C) { return HeroSu24.build(THREE, M, C, "e00"); } };
UNIT_MODELS["sead_p"]        = { len: 24.6, build: function (THREE, M, C) { return HeroSu24.build(THREE, M, C, "e20"); } };
