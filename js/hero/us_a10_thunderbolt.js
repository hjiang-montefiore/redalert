/* ============ us_a10_thunderbolt.js - HERO model: Fairchild Republic A-10 Thunderbolt II ============
   The US close-air-support jet in three rows: the A-10A of the 1980s and
   1990s (nato_e80_cas), the precision-engagement A-10C of 2007 on
   (nato_e00_cas) and today's A-10C (bomber_n). One airframe, three fits. It
   replaces the hand-built units3d.js bomber_n (73 meshes, 16.85 m long and
   3.65 m high against the real 4.47) and the parametric stand-ins the two
   era rows drew (about 90 meshes, 19.1 m long).

   Published figures (USAF fact sheet): length 16.26 m (53 ft 4 in) over the
   gun, span 17.53 m (57 ft 6 in), height 4.47 m (14 ft 8 in); wing area
   47.0 m2; two GE TF34-GE-100A turbofans. Jane's gives a wheel track of
   5.25 m and a wheelbase of 5.40 m. This model measures 16.26 / 17.53 /
   4.48 m (the team cap stands 12 mm proud of the fin tips), track 5.26 m,
   wheelbase 5.40 m.

   Shapes taken from Wikimedia Commons, never from a generic jet:
     "Fairchild Republic A-10 Thunderbolt II 3-view.svg" (2013): every
       station, height and chord below was read off it at 86 px/m. Its own
       ground line sits 0.15 m lower than the published height puts it, so
       its heights are read with its fin tips at the published 4.47 m.
     "A U.S. Air Force A-10C ... receives fuel from a KC-135 ... over
       Afghanistan 131002-F-IG195-913" (2013, from the boom: the A-10C from
       above and ahead): the gear pods standing well ahead of the leading
       edge with the wheel showing in their mouths, the GAU-8 muzzle under
       the nose, the receptacle ahead of the windscreen, and the targeting
       pod on the starboard wing's second station from the tip (10).
     "A-10 with Pave Penny at RIAT 1998" (an A-10A, grey by then): the Pave
       Penny laser spot tracker on its pylon on the starboard side of the
       nose, over the nose leg, and a pair of AIM-9s on the starboard
       outermost station (11).
     "A-10 Warthog on static display (7674505450).jpg" (2012, an A-10C
       side on): the rear fuselage as deep as the drawing has it, the
       tailplane low at the foot of the tail cone and the fins running well
       below it.
   What they fix:
     - The engines are two big round TF34 nacelles, 1.44 m across, on short
       stub pylons high on the rear fuselage, centres 1.45 m off the
       centreline and 3.17 m off the ground, boat-tailed to the fan exhaust
       and the core plug; the intake lips sit over the wing's trailing edge
       and the exhausts well ahead of the tailplane. The references differ
       here. With its fin tips at 4.47 m the drawing's two views put the
       centres 3.0-3.1 m up and the nacelles 1.47-1.50 m across; on its own
       ground line the tops are 3.87 m up. The 2012 photograph gives centres
       about 3.2 m up, 1.3-1.4 m across and tops 3.88 m up, and the
       TF34-GE-100 inside is 1.24 m across. This model takes 3.17 m and
       1.44 m, which puts the tops 3.89 m up.
     - The rear fuselage keeps its depth to the tail: its belly is 1.64 m
       off the ground behind the wing and still 1.80 m at the fins, about a
       metre below the spine, before it closes into the tail cone.
     - The wing is straight and low, flush with the belly: a constant-chord
       centre section (3.05 m) out to the gear pods, then outer panels with
       6.5 degrees of dihedral tapering to 2.09 m, and drooped tips.
     - The main wheels retract forward into pods hung under the wing at
       2.7 m, their noses 1.15 m ahead of the leading edge; a wheel shows in
       each pod's mouth. The nose leg is offset to starboard (0.33 m) because
       the gun is on the centreline.
     - The tailplane is a plain rectangle, 5.7 m across and 1.9 m in chord,
       set low at the foot of the tail cone, 2.10 m off the ground. The two
       fins stand on its tips, 3.06 m from tip to heel: 2.37 m above the
       tailplane and a keel 0.69 m deep below it, whose foot slopes up from
       the heel to the trailing edge. The fin's leading edge starts 0.24 m
       ahead of the tailplane's.
     - Eleven stations: 1 and 11 at 5.87 m, 2 and 10 at 4.80 m, 3 and 9 at
       3.60 m just outboard of the pods, 4 and 8 at 1.63 m, and three under
       the fuselage. 5 and 7 carry empty pylons here; the centreline (6)
       carries nothing in any fit, so it is not drawn.
   Variants, one airframe (build functions at the foot):
     a10a     A-10A (nato_e80_cas, 1977 into the 1990s): "European I", the
              wrap-around FS 34092 / 34102 / 36081 greens and grey it wore
              through the 1980s and into Desert Storm. Pave Penny on the
              nose. The row's Mavericks: two AGM-65s on each LAU-88 at 3 and
              9 (the inboard shoulder rail is left empty there, clear of the
              gear pod).
              The row's 500 lb guided bomb: a GBU-12 at 4 and 8. An ALQ-119
              ECM pod at 1.
     a10c     A-10C (nato_e00_cas, 2007 on): the two-tone FS 36118 / 36270
              grey with its dark false canopy under the nose. A Litening
              targeting pod at 10, where the boom photograph has its pod;
              two AIM-9M on a LAU-105 at 11, where the RIAT aircraft has its
              pair; an ALQ-131 at 1, one AGM-65 on a LAU-117 at 3, GBU-12s at
              4 and 8, a LAU-131 rocket pod at 9.
     a10cNow  A-10C today (bomber_n): the same aircraft with a Sniper pod at
              10 and the row's JDAM - GBU-38s at 4 and 8.
     The AIM-9 pair is the A-10C's usual self-defence fit; no row lists it.
     The A-10A in its 1980s paint carries none: the one A-10A photograph at
     hand with the pair is from 1998, in grey.

   Model space: +X nose, +Y left (port), +Z up, real metres. The origin is
   the middle of the length at the height of the fuselage centre over the
   wing; the wheels stand 2.30 m below it. render3d.js stands the model up
   and rescales by the measured X extent: the gun muzzle is the front of
   that box and the tail cone the back.
   NAMED NODES: "gear" only (a jet has no rotor). The gear group holds the
   lowest opaque points of the model, so a parked aircraft rests on its
   tyres.
   The team colour is exactly C.team: a band wrapped round each outer wing
   (over and under it), the fin tips (where the squadrons paint their
   colours), a stripe on the spine behind the canopy. bomber_n also stands
   in for other nations' and periods' CAS rows, which the renderer repaints
   and which rely on that.
   Draw calls: 7 meshes and a 3-mesh gear group, 8 materials, 8,730 to
   8,940 triangles a variant.
   ================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroA10 = (function () {
  "use strict";

  var V = null;                                   /* THREE, set by build() */
  var PI = Math.PI;
  var GROUND = -2.30;                             /* tyre bottoms, below the origin */
  var FIN_TOP = 2.17;                             /* 4.47 m on the gear */
  var FIN_ROOT = -0.42;                           /* where each fin's keel begins */
  var FIN_Y = 2.85;                               /* the fins stand on the tailplane tips */
  var TAIL_Z = -0.20;                             /* tailplane chord plane, 2.10 m up */
  var NAC_Y = 1.45, NAC_Z = 0.87;                 /* TF34 centres, 3.17 m up */

  /* ------------------------------------------------------------- paint --
     Canvas layout: four bands stacked, 40 px per metre both ways. Faces are
     projected by their own normal: top, port side, starboard side, belly. */
  var PXM = 40, XMIN = -8.4, TW = 680;
  var TOPH = 720, SIDEH = 188, TH = TOPH + 2 * SIDEH + TOPH;
  var YMAX = 9.0, ZTOP = 2.3, ZSPAN = 4.7;

  /* Schemes, authored a little dark because the ACES pass lifts painted
     mid-tones. European I is a wrap-around: the belly is camouflaged too.
     The greys: FS 36270 over most of it, FS 36118 in big patches on top
     and down the sides, the belly the lighter grey. */
  var SCHEMES = {
    euro1: { name: "euro1", seed: 10801, base: "#56603c",
             blot: ["#333f2f", "#47494a"], belly: null, nTop: 46, nSide: 22, nBelly: 40 },
    ghost: { name: "ghost", seed: 10802, base: "#7d858a",
             blot: ["#50575c"], belly: "#899095", nTop: 30, nSide: 12, nBelly: 4, falseCanopy: true }
  };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }

  function paint(S) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = S.seed, i, j, b, x, y, k;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    g.fillStyle = S.base; g.fillRect(0, 0, TW, TH);
    if (S.belly) { g.fillStyle = S.belly; g.fillRect(0, bandY[3], TW, TOPH); }
    /* camouflage patches: clusters of overlapping ellipses, so the edges
       wander the way a hand-sprayed pattern does */
    for (b = 0; b < 4; b++) {
      var n = b === 0 ? S.nTop : b === 3 ? S.nBelly : S.nSide;
      var flat = (b === 0 || b === 3) ? 1 : 0.42;
      for (i = 0; i < n; i++) {
        g.fillStyle = S.blot[i % S.blot.length];
        var cx = R() * TW, cy = bandY[b] + R() * bandH[b];
        for (j = 0; j < 4; j++) {
          g.beginPath();
          g.ellipse(cx + (R() - 0.5) * 74, cy + (R() - 0.5) * 74 * flat,
                    22 + R() * 44, (14 + R() * 30) * flat, R() * 3.14, 0, 6.283);
          g.fill();
        }
      }
    }
    if (S.falseCanopy) {
      /* the dark false canopy painted under the nose of the grey aircraft */
      var bx0 = pxX(3.5), bx1 = pxX(6.2), byc = bandY[3] + (YMAX - 0) * PXM;
      g.fillStyle = "#3a3f44";
      g.beginPath();
      g.ellipse((bx0 + bx1) / 2, byc, (bx1 - bx0) / 2, 0.40 * PXM, 0, 0, 6.283);
      g.fill();
    }
    /* panel seams and rivet rows */
    g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1;
    for (b = 0; b < 4; b++) {
      x = 0;
      while (x < TW) { x += 24 + R() * 52; g.beginPath(); g.moveTo(x, bandY[b]); g.lineTo(x, bandY[b] + bandH[b]); g.stroke(); }
      y = bandY[b];
      while (y < bandY[b] + bandH[b]) { y += 20 + R() * 48; g.beginPath(); g.moveTo(0, y); g.lineTo(TW, y); g.stroke(); }
    }
    g.fillStyle = "rgba(0,0,0,0.18)";
    for (i = 0; i < 60; i++) {
      x = R() * TW * 0.92; y = R() * TH; k = 10 + ((R() * 30) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 5, y, 1.4, 1.4);
    }
    /* exhaust soot on the tailplane and between the fins, behind each TF34 */
    for (k = -1; k <= 1; k += 2) {
      var vy = (YMAX - k * 1.45) * PXM;
      var gr = g.createLinearGradient(pxX(-5.0), 0, pxX(-8.2), 0);
      gr.addColorStop(0, "rgba(22,20,18,0.42)"); gr.addColorStop(1, "rgba(22,20,18,0.10)");
      g.fillStyle = gr;
      g.fillRect(pxX(-8.2), vy - 0.55 * PXM, pxX(-5.0) - pxX(-8.2), 1.1 * PXM);
    }
    /* gun gas under and beside the nose */
    for (b = 1; b < 4; b++) {
      var gg = g.createLinearGradient(pxX(8.2), 0, pxX(6.4), 0);
      gg.addColorStop(0, "rgba(18,16,14,0.55)"); gg.addColorStop(1, "rgba(18,16,14,0)");
      g.fillStyle = gg;
      if (b === 3) g.fillRect(pxX(6.4), bandY[3] + (YMAX - 0.6) * PXM, pxX(8.2) - pxX(6.4), 1.2 * PXM);
      else g.fillRect(pxX(6.4), bandY[b] + (ZTOP + 0.25) / ZSPAN * SIDEH, pxX(8.2) - pxX(6.4), 0.5 / ZSPAN * SIDEH);
    }
    for (i = 0; i < 70; i++) {
      g.fillStyle = "rgba(24,22,20," + (0.04 + R() * 0.10).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 60, 2 + R() * 9);
    }
    return cv;
  }

  var _tex = {};
  function skinTexture(S) {
    if (_tex[S.name] !== undefined) return _tex[S.name];
    var t = false;
    try {
      t = new V.CanvasTexture(paint(S));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;   /* r148: colorSpace does nothing */
    } catch (e) { t = false; }
    _tex[S.name] = t;
    return t;
  }

  /* Face-normal projection into the four bands. Faces looking mostly fore or
     aft (intake lips, leading edges) are laid out along x + y so they do not
     collapse to a line. */
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
        if (band === 0) { U = pxX(x); W = clamp((YMAX - y) * PXM, 2, TOPH - 2); }
        else if (band === 3) { U = pxX(x); W = TOPH + 2 * SIDEH + clamp((YMAX - y) * PXM, 2, TOPH - 2); }
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

  /* --------------------------------------------------------- materials -- */
  function makeMats(C, S) {
    var tex = skinTexture(S), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(S === SCHEMES.ghost ? 0x7d858a : 0x56603c);
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    /* the armoured glass photographs dark from outside */
    m.glass = new V.MeshStandardMaterial({ color: 0x1d2e33, roughness: 0.10, metalness: 0.35 });
    /* olive-drab bomb bodies; missiles, pods and launchers light grey */
    m.store = new V.MeshStandardMaterial({ color: 0x4a5238, roughness: 0.80, metalness: 0.10 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xb4babd, roughness: 0.55, metalness: 0.15 });
    /* exactly C.team, so eraPaint's team test leaves it alone; the emissive
       keeps it from greying out under ACES */
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
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
      var f = faces[i], a = f[0];
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var o = (a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz;
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
  /* aerofoil section, 13 corners: a round nose, the crest 28% back and a
     thin trailing edge; thickness t along the unit normal nrm */
  var FOIL_F = [0.025, 0.10, 0.28, 0.55, 0.85, 1.0];
  var FOIL_T = [0.30, 0.46, 0.50, 0.42, 0.20, 0.02];
  function foil(le, te, t, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    var out = [p(0, 0)], i;
    for (i = 0; i < FOIL_F.length; i++) out.push(p(FOIL_F[i], FOIL_T[i] * t));
    for (i = FOIL_F.length - 1; i >= 0; i--) out.push(p(FOIL_F[i], -FOIL_T[i] * t));
    return out;
  }
  /* a sleeve section round the same aerofoil between chord fractions f0 and
     f1, standing pad proud of it on both faces: the team bands, which
     follow the wing's curve instead of sitting on it as a slab */
  function sleeve(le, te, t, f0, f1, nrm, pad) {
    var F = [0].concat(FOIL_F), Tk = [0].concat(FOIL_T);
    function half(f) {
      for (var i = 1; i < F.length; i++) if (f <= F[i]) return Tk[i - 1] + (Tk[i] - Tk[i - 1]) * (f - F[i - 1]) / (F[i] - F[i - 1]);
      return Tk[Tk.length - 1];
    }
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    var fs = [f0], i, out = [];
    for (i = 0; i < FOIL_F.length; i++) if (FOIL_F[i] > f0 && FOIL_F[i] < f1) fs.push(FOIL_F[i]);
    fs.push(f1);
    for (i = 0; i < fs.length; i++) out.push(p(fs[i], half(fs[i]) * t + pad));
    for (i = fs.length - 1; i >= 0; i--) out.push(p(fs[i], -half(fs[i]) * t - pad));
    return out;
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
  /* four fins in an X, as stores hang on a rail or a rack: chord along x,
     each fin reaching span from the axis */
  function finsX(list, x, y, z, chord, span) {
    list.push(box(chord, span * 2, 0.022, x, y, z, PI / 4, 0, 0));
    list.push(box(chord, span * 2, 0.022, x, y, z, -PI / 4, 0, 0));
  }

  /* ----------------------------------------------------- airframe data --
     Wing (3-view): centre section to the pods at constant chord, LE x 1.10,
     TE x -1.95, 16% thick; outer panels taper to a 2.09 m chord at 8.45 m
     with 6.5 deg of dihedral, 13% thick at the tip; the tip itself droops. */
  function wingLE(y) { return y <= 2.85 ? 1.10 : 1.10 - (y - 2.85) * 0.0946; }
  function wingTE(y) { return y <= 2.85 ? -1.95 : -1.95 + (y - 2.85) * 0.0768; }
  function wingZ(y) { return y <= 2.85 ? -0.42 : -0.42 + (y - 2.85) * 0.114; }
  function wingT(y) { return y <= 2.85 ? 0.49 : 0.49 - (y - 2.85) * 0.0393; }
  function wingSec(y, s) {
    var z = wingZ(y);
    return foil([wingLE(y), s * y, z], [wingTE(y), s * y, z], wingT(y), [0, 0, 1]);
  }
  /* fins (3-view, side and plan agree): chord 2.19 m at the keel joint,
     1.24 m at the tip; leading edge 5.71 m aft at the root and raked back
     0.44 m, trailing edge raked forward 0.51 m; 0.24 m thick at the root */
  function finF(z) { return (z - FIN_ROOT) / (FIN_TOP - FIN_ROOT); }
  function finLE(z) { return -5.71 - finF(z) * 0.44; }
  function finTE(z) { return -7.90 + finF(z) * 0.51; }
  function finT(z) { return 0.24 - finF(z) * 0.12; }
  function finSec(z, s) { return foil([finLE(z), s * FIN_Y, z], [finTE(z), s * FIN_Y, z], finT(z), [0, 1, 0]); }
  /* the keel under each fin: its leading edge rounds back into the heel,
     0.89 m below the fuselage centre line, and the foot slopes up to the
     trailing edge. [LE x, LE z, TE z, thickness]; the TE stays at -7.90 */
  var KEEL = [[-5.76, -0.70, -0.43, 0.21], [-6.10, -0.89, -0.44, 0.15]];
  function keelSec(k, s) {
    var q = KEEL[k];
    return foil([q[0], s * FIN_Y, q[1]], [-7.90, s * FIN_Y, q[2]], q[3], [0, 1, 0]);
  }

  /* fuselage: the 3-view's side and plan outlines, section by section.
     Aft of the wing the spine falls gently and the belly stays low, so the
     rear fuselage is still about a metre deep where the fins begin. */
  var FUS = [
    ls( 7.80, 0, -0.23, 0.10, 0.08, 1.00),
    ls( 7.62, 0, -0.22, 0.27, 0.21, 0.85),
    ls( 7.30, 0, -0.17, 0.42, 0.33, 0.70),
    ls( 6.90, 0, -0.12, 0.54, 0.42, 0.62),
    ls( 6.40, 0, -0.06, 0.63, 0.52, 0.58),
    ls( 5.60, 0, -0.02, 0.70, 0.60, 0.55),
    ls( 4.60, 0,  0.02, 0.72, 0.67, 0.55),
    ls( 3.40, 0,  0.11, 0.74, 0.80, 0.55),
    ls( 2.40, 0,  0.10, 0.75, 0.80, 0.55),
    ls( 1.00, 0,  0.06, 0.75, 0.76, 0.55),
    ls(-0.50, 0,  0.015, 0.72, 0.715, 0.55),
    ls(-2.00, 0, -0.01, 0.66, 0.65, 0.60),
    ls(-3.00, 0, -0.02, 0.60, 0.59, 0.62),
    ls(-4.00, 0, -0.025, 0.54, 0.545, 0.66),
    ls(-5.00, 0, -0.025, 0.49, 0.495, 0.70),
    ls(-6.00, 0, -0.015, 0.44, 0.465, 0.75),
    ls(-7.00, 0, -0.025, 0.38, 0.365, 0.80),
    ls(-7.70, 0, -0.03, 0.30, 0.28, 0.85),
    ls(-8.00, 0, -0.04, 0.18, 0.13, 0.90),
    ls(-8.10, 0, -0.04, 0.07, 0.05, 1.00)
  ];
  /* the bubble canopy: flat-plate windscreen sloping from 6.4 m to the arch
     at 5.3 m, the top 3.70 m off the ground, faired into the spine at 3 m */
  var CANOPY = [
    ls(6.42, 0, 0.40, 0.28, 0.10, 0.80),
    ls(6.10, 0, 0.40, 0.44, 0.37, 0.80),
    ls(5.70, 0, 0.45, 0.50, 0.68, 0.82),
    ls(5.30, 0, 0.50, 0.52, 0.90, 0.85),
    ls(4.70, 0, 0.56, 0.53, 0.84, 0.85),
    ls(4.10, 0, 0.63, 0.50, 0.69, 0.85),
    ls(3.60, 0, 0.72, 0.45, 0.45, 0.85),
    ls(3.10, 0, 0.82, 0.32, 0.17, 0.90),
    ls(2.90, 0, 0.86, 0.15, 0.04, 1.00)
  ];
  /* TF34 nacelle: 1.44 m across, intake lip at -1.72, boat-tailed to the
     fan exhaust at -4.95, which sits a little below the intake */
  function nacSecs(s) {
    var y = s * NAC_Y, z = NAC_Z;
    return [
      ls(-1.72, y, z, 0.575, 0.575, 1), ls(-1.78, y, z, 0.66, 0.66, 1),
      ls(-1.96, y, z, 0.71, 0.71, 1), ls(-2.60, y, z, 0.72, 0.72, 1),
      ls(-3.60, y, z, 0.715, 0.715, 1), ls(-4.15, y, z - 0.02, 0.67, 0.67, 1),
      ls(-4.60, y, z - 0.07, 0.595, 0.595, 1), ls(-4.95, y, z - 0.13, 0.48, 0.48, 1)
    ];
  }
  /* main-gear pod: nose 1.15 m ahead of the leading edge, belly 1.29 m off
     the ground, tail 0.1 m behind the trailing edge */
  function podSecs(s) {
    var y = s * 2.70;
    return [
      ls( 2.25, y, -0.42, 0.04, 0.04, 1.00), ls( 2.12, y, -0.45, 0.20, 0.25, 0.90),
      ls( 1.85, y, -0.49, 0.30, 0.40, 0.85), ls( 1.35, y, -0.53, 0.35, 0.48, 0.80),
      ls( 0.40, y, -0.54, 0.35, 0.47, 0.80), ls(-0.40, y, -0.52, 0.32, 0.40, 0.80),
      ls(-1.20, y, -0.48, 0.24, 0.27, 0.85), ls(-1.80, y, -0.44, 0.13, 0.14, 0.90),
      ls(-2.05, y, -0.42, 0.04, 0.04, 1.00)
    ];
  }

  /* ----------------------------------------------------------- stores --
     Profiles are [x fraction of length, radius fraction], nose first. */
  var P_GBU12 = [[0.50, 0.30], [0.47, 0.62], [0.30, 0.70], [0.27, 0.78], [0.18, 1.0], [-0.30, 1.0], [-0.40, 0.80], [-0.50, 0.62]];
  var P_MK82  = [[0.50, 0.04], [0.40, 0.55], [0.25, 0.92], [0.12, 1.0], [-0.20, 1.0], [-0.30, 0.92], [-0.50, 0.78]];
  var P_AGM65 = [[0.50, 0.10], [0.49, 0.62], [0.465, 0.88], [0.43, 1.0], [-0.50, 1.0]];
  var P_AIM9  = [[0.50, 0.05], [0.44, 0.62], [0.38, 1.0], [-0.50, 1.0]];
  var P_POD   = [[0.50, 0.62], [0.47, 0.92], [0.42, 1.0], [-0.40, 1.0], [-0.50, 0.85]];
  var P_LIT   = [[0.50, 0.55], [0.47, 0.85], [0.40, 1.0], [-0.42, 1.0], [-0.50, 0.70]];
  /* station: lateral position (port +) and the kind of pylon */
  var STN = { 1: [5.87, "lt"], 2: [4.80, "lt"], 3: [3.60, "hv"], 4: [1.63, "hv"], 5: [0.60, "fu"],
              7: [-0.60, "fu"], 8: [-1.63, "hv"], 9: [-3.60, "hv"], 10: [-4.80, "lt"], 11: [-5.87, "lt"] };

  function pylon(K, x, y, zTop, zBot, ch0, ch1) {
    var A = [[x - ch0 * 0.55, y - 0.06, zTop], [x + ch0 * 0.45, y - 0.06, zTop], [x + ch0 * 0.45, y + 0.06, zTop], [x - ch0 * 0.55, y + 0.06, zTop]];
    var B = [[x - ch1 * 0.40, y - 0.055, zBot], [x + ch1 * 0.60, y - 0.055, zBot], [x + ch1 * 0.60, y + 0.055, zBot], [x - ch1 * 0.40, y + 0.055, zBot]];
    K.skin.push(solid(A, B));
  }
  function aim9(K, x, y, z) {
    push(K.pale, revolve(P_AIM9, 2.87, 0.0635, x, y, z, 10));
    finsX(K.pale, x + 1.435 - 0.36, y, z, 0.16, 0.13);                       /* canards */
    finsX(K.pale, x - 1.435 + 0.17, y, z, 0.30, 0.17);                       /* tail fins */
  }
  function agm65(K, x, y, z) {
    push(K.pale, revolve(P_AGM65, 2.49, 0.152, x, y, z, 14));
    K.glass.push(cyl(0.05, 0.13, 0.07, 12, "x", x + 1.245 + 0.005, y, z));   /* seeker dome */
    finsX(K.pale, x - 0.50, y, z, 1.05, 0.36);                               /* long-chord delta wings */
    finsX(K.pale, x - 1.12, y, z, 0.22, 0.30);                               /* control fins */
  }

  function addStation(K, kind, st) {
    var y = STN[st][0], typ = STN[st][1], ay = Math.abs(y), sOut = y > 0 ? 1 : -1;
    var zb, xm, dep, c0, c1;
    if (typ === "fu") { zb = -0.66; xm = -0.10; dep = 0.22; c0 = 1.6; c1 = 1.3; }
    else {
      zb = wingZ(ay) - wingT(ay) / 2;
      xm = (wingLE(ay) + wingTE(ay)) / 2 + 0.15;
      dep = 0.32; c0 = typ === "hv" ? 2.1 : 1.6; c1 = typ === "hv" ? 1.7 : 1.3;
    }
    if (!kind) return;
    var zp = zb - dep;                                                       /* pylon foot */
    pylon(K, xm, y, zb + 0.04, zp, c0, c1);
    if (kind === "empty") return;
    K.dark.push(box(0.70, 0.17, 0.05, xm + 0.05, y, zp - 0.02));            /* rack and sway braces */
    var zr = zp - 0.045, xs, r, zc;
    if (kind === "gbu12") {
      r = 0.137; zc = zr - r - 0.02; xs = xm - 0.25;
      push(K.store, revolve(P_GBU12, 3.27, r, xs, y, zc, 16));
      K.dark.push(cyl(0.035, 0.05, 0.05, 10, "x", xs + 1.66, y, zc));        /* seeker window */
      finsX(K.store, xs + 1.635 - 0.42, y, zc, 0.24, 0.17);                 /* canards */
      finsX(K.store, xs - 1.635 + 0.30, y, zc, 0.50, 0.26);                 /* folded tail wings */
    } else if (kind === "gbu38") {
      r = 0.137; zc = zr - r - 0.02; xs = xm - 0.05;
      push(K.store, revolve(P_MK82, 2.36, r, xs, y, zc, 16));
      K.pale.push(cyl(0.143, 0.118, 0.72, 16, "x", xs - 1.18 + 0.36, y, zc)); /* JDAM tail kit */
      finsX(K.pale, xs - 1.18 + 0.17, y, zc, 0.32, 0.27);
      K.pale.push(box(0.80, 0.03, 0.03, xs - 0.10, y + 0.14, zc));            /* strakes */
      K.pale.push(box(0.80, 0.03, 0.03, xs - 0.10, y - 0.14, zc));
    } else if (kind === "lau117") {
      K.metal.push(box(2.20, 0.12, 0.10, xm - 0.05, y, zr - 0.03));
      agm65(K, xm - 0.05, y, zr - 0.08 - 0.152);
    } else if (kind === "lau88") {
      /* triple launcher, two rounds: the outboard shoulder and the bottom
         rail; the inboard shoulder would foul the gear pod */
      var zl = zr - 0.10;
      K.metal.push(box(2.50, 0.34, 0.16, xm - 0.10, y, zl));
      K.metal.push(box(2.20, 0.06, 0.20, xm - 0.10, y, zl - 0.17));
      agm65(K, xm - 0.15, y + sOut * 0.31, zl - 0.20);
      agm65(K, xm - 0.05, y, zl - 0.44);
    } else if (kind === "lau105") {
      K.metal.push(box(1.60, 0.30, 0.09, xm, y, zr - 0.01));
      K.metal.push(box(1.50, 0.05, 0.08, xm, y + 0.18, zr - 0.08));
      K.metal.push(box(1.50, 0.05, 0.08, xm, y - 0.18, zr - 0.08));
      aim9(K, xm + 0.05, y + 0.18, zr - 0.19);
      aim9(K, xm + 0.05, y - 0.18, zr - 0.19);
    } else if (kind === "alq119" || kind === "alq131") {
      var L = kind === "alq119" ? 3.80 : 2.84, hw = 0.13, hh = kind === "alq119" ? 0.19 : 0.16;
      zc = zr - hh - 0.01; xs = xm - 0.15;
      var mat = kind === "alq119" ? K.store : K.pale;
      push(mat, loft([ls(xs + L / 2, y, zc, hw * 0.35, hh * 0.40, 1), ls(xs + L / 2 - 0.18, y, zc, hw * 0.85, hh * 0.85, 0.75),
                      ls(xs + L / 2 - 0.45, y, zc, hw, hh, 0.62), ls(xs - L / 2 + 0.40, y, zc, hw, hh, 0.62),
                      ls(xs - L / 2 + 0.12, y, zc, hw * 0.80, hh * 0.80, 0.75), ls(xs - L / 2, y, zc, hw * 0.40, hh * 0.45, 1)],
                     14, 0.02, 0.02));
      K.dark.push(box(0.30, hw * 2 + 0.01, hh * 1.2, xs + L / 2 - 0.70, y, zc));   /* antenna window band */
    } else if (kind === "litening") {
      r = 0.203; zc = zr - r - 0.01; xs = xm - 0.10;
      push(K.pale, revolve(P_LIT, 2.20, r, xs, y, zc, 18));
      push(K.glass, revolve([[0.50, 0.10], [0.30, 0.85], [0.0, 1.0], [-0.30, 0.90], [-0.50, 0.55]], 0.40, 0.18, xs + 1.10 + 0.12, y, zc, 14));
    } else if (kind === "sniper") {
      r = 0.150; zc = zr - r - 0.01; xs = xm - 0.10;
      push(K.pale, revolve([[0.24, 1.0], [-0.45, 1.0], [-0.50, 0.80]], 2.39, r, xs, y, zc, 16, null, 0));
      push(K.glass, revolve([[0.50, 0.04], [0.38, 0.45], [0.25, 0.86], [0.24, 1.0]], 2.39, r, xs, y, zc, 16, 0, null));
    } else if (kind === "lau131") {
      r = 0.13; zc = zr - r - 0.01; xs = xm + 0.10;
      push(K.pale, revolve(P_POD, 1.70, r, xs, y, zc, 16));
      K.dark.push(cyl(0.085, 0.085, 0.02, 14, "x", xs + 0.85 + 0.003, y, zc));  /* frangible nose fairing seam */
    }
  }

  /* ------------------------------------------------------------ the build */
  function buildAirframe(THREE, C, cfg) {
    V = THREE;
    var T = makeMats(C, cfg.scheme);
    var g = new V.Group();
    g.name = cfg.node;
    var K = { skin: [], dark: [], metal: [], glass: [], team: [], store: [], pale: [] };
    var G = { metal: [], tyre: [], dark: [] };
    var s, i;

    /* fuselage */
    push(K.skin, loft(FUS, 28, 0.04, 0.03));

    /* wings: centre section, outer panel, drooped tip */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(wingSec(0.60, s), wingSec(2.85, s)));
      K.skin.push(solid(wingSec(2.85, s), wingSec(8.45, s)));
      K.skin.push(solid(wingSec(8.45, s), foil([0.38, s * 8.765, 0.03], [-1.40, s * 8.765, 0.03], 0.10, [0, 0, 1])));
    }

    /* gear pods, with the wheel showing in each mouth */
    for (s = -1; s <= 1; s += 2) {
      push(K.skin, loft(podSecs(s), 20, 0.02, 0.02));
      K.dark.push(cyl(0.40, 0.40, 0.26, 22, "y", 1.08, s * 2.70, -0.74));
    }

    /* TF34 nacelles on stub pylons: open intake with the fan face just
       inside the lip, spinner, fan exhaust and core plug */
    for (s = -1; s <= 1; s += 2) {
      var ey = s * NAC_Y, ez = NAC_Z - 0.13;                                /* exhaust centre */
      push(K.skin, loft(nacSecs(s), 32, null, 0));
      K.dark.push(cyl(0.575, 0.575, 0.04, 28, "x", -1.80, s * NAC_Y, NAC_Z));
      /* the duct wall between lip and fan, sections run aft to fore so its
         faces look inward and show from inside the intake */
      push(K.dark, loft([ls(-1.80, s * NAC_Y, NAC_Z, 0.575, 0.575, 1), ls(-1.72, s * NAC_Y, NAC_Z, 0.575, 0.575, 1)], 28, null, null));
      push(K.metal, revolve([[0.50, 0.05], [0.10, 0.70], [-0.50, 1.0]], 0.30, 0.165, -1.84, s * NAC_Y, NAC_Z, 12, 0, null));
      K.dark.push(cyl(0.42, 0.42, 0.03, 26, "x", -4.96, ey, ez));
      push(K.metal, revolve([[0.50, 1.0], [0.20, 0.92], [-0.30, 0.50], [-0.50, 0.15]], 0.45, 0.27, -5.17, ey, ez, 16, 0, 0.01));
      /* stub pylon from the upper fuselage to the nacelle's lower inboard side */
      var ny = -0.408 * s, nz = 0.913, Pf = [s * 0.40, 0.48], Pr = [s * 0.36, 0.36], P1 = [s * 0.85, 0.63];
      var faceA = [[-2.10, Pf[0] + ny * 0.07, Pf[1] + nz * 0.07], [-4.50, Pr[0] + ny * 0.07, Pr[1] + nz * 0.07],
                   [-4.20, P1[0] + ny * 0.07, P1[1] + nz * 0.07], [-2.30, P1[0] + ny * 0.07, P1[1] + nz * 0.07]];
      var faceB = [[-2.10, Pf[0] - ny * 0.07, Pf[1] - nz * 0.07], [-4.50, Pr[0] - ny * 0.07, Pr[1] - nz * 0.07],
                   [-4.20, P1[0] - ny * 0.07, P1[1] - nz * 0.07], [-2.30, P1[0] - ny * 0.07, P1[1] - nz * 0.07]];
      K.skin.push(solid(faceA, faceB));
    }

    /* tailplane, low on the tail cone, and the twin fins on its tips, each
       with its keel below */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(foil([-5.95, s * 0.12, TAIL_Z], [-7.85, s * 0.12, TAIL_Z], 0.20, [0, 0, 1]),
                        foil([-5.95, s * FIN_Y, TAIL_Z], [-7.85, s * FIN_Y, TAIL_Z], 0.15, [0, 0, 1])));
      K.skin.push(solid(finSec(FIN_ROOT, s), finSec(FIN_TOP, s)));
      K.skin.push(solid(finSec(FIN_ROOT, s), keelSec(0, s)));
      K.skin.push(solid(keelSec(0, s), keelSec(1, s)));
    }

    /* the GAU-8/A: seven barrels out of the chin fairing, muzzle clamp and
       gas diverter, the cluster 0.08 m to port so the firing barrel is on
       the centreline */
    K.skin.push(cyl(0.17, 0.20, 1.00, 14, "x", 7.15, 0.08, -0.50));
    K.dark.push(cyl(0.17, 0.17, 0.02, 14, "x", 7.655, 0.08, -0.50));
    for (i = 0; i < 7; i++) {
      var a = 2 * PI * i / 7;
      K.metal.push(cyl(0.028, 0.028, 0.50, 8, "x", 7.70, 0.08 + 0.105 * Math.cos(a), -0.50 + 0.105 * Math.sin(a)));
    }
    K.metal.push(cyl(0.17, 0.17, 0.17, 18, "x", 8.045, 0.08, -0.50));
    K.dark.push(cyl(0.14, 0.14, 0.02, 16, "x", 8.12, 0.08, -0.50));

    /* nose: refuelling receptacle ahead of the windscreen; blade aerials on the spine */
    K.dark.push(box(0.42, 0.24, 0.03, 7.02, 0, 0.255, 0, 0.32, 0));
    K.dark.push(box(0.30, 0.025, 0.22, 1.90, 0, 0.98));
    K.dark.push(box(0.24, 0.025, 0.16, 0.90, 0, 0.87));

    /* canopy and its windscreen arch */
    push(K.glass, loft(CANOPY, 20, 0.02, 0.02));
    var arch = ringOf({ yc: 0, zc: 0.50, w: 0.535, h: 0.915, e: 0.85 }, 24);
    for (i = 1; i < 12; i++) {
      if (arch[i][1] < 0.60 || arch[i + 1][1] < 0.60) continue;
      K.dark.push(bar([5.30, arch[i][0], arch[i][1]], [5.30, arch[i + 1][0], arch[i + 1][1]], 0.025, 6));
    }
    for (s = -1; s <= 1; s += 2)
      K.dark.push(bar([6.40, s * 0.28, 0.42], [5.33, s * 0.41, 1.15], 0.02, 6));   /* windscreen side frames */

    /* Pave Penny laser spot tracker, A-10A only: a pylon on the starboard
       side of the nose over the nose leg */
    if (cfg.pave) {
      K.skin.push(box(0.50, 0.06, 0.46, 5.10, -0.66, -0.55));
      push(K.pale, revolve([[0.50, 0.70], [0.42, 1.0], [-0.42, 1.0], [-0.50, 0.70]], 0.81, 0.105, 5.10, -0.68, -0.87, 14));
      K.glass.push(cyl(0.07, 0.07, 0.02, 12, "x", 5.51, -0.68, -0.87));
    }

    /* stations and what they carry */
    for (i = 1; i <= 11; i++) if (STN[i]) addStation(K, cfg.st[i], i);

    /* team flashes: a band wrapped round each outer wing, the fin caps and
       a stripe on the spine */
    var wb = function (y, sd) {
      var z = wingZ(y);
      return sleeve([wingLE(y), sd * y, z], [wingTE(y), sd * y, z], wingT(y), 0.28, 0.62, [0, 0, 1], 0.018);
    };
    for (s = -1; s <= 1; s += 2) {
      K.team.push(solid(wb(5.25, s), wb(6.55, s)));
      var fc = function (z) {
        return foil([finLE(z) + 0.012, s * FIN_Y, z], [finTE(z) - 0.012, s * FIN_Y, z], finT(z) * 1.08 + 0.012, [0, 1, 0]);
      };
      K.team.push(solid(fc(1.72), fc(FIN_TOP + 0.012)));
    }
    K.team.push(solid([[2.40, -0.28, 0.885], [2.40, 0.28, 0.885], [2.40, 0.28, 0.925], [2.40, -0.28, 0.925]],
                      [[0.60, -0.28, 0.785], [0.60, 0.28, 0.785], [0.60, 0.28, 0.825], [0.60, -0.28, 0.825]]));

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.store, T.store, "stores");
    mesh(g, K.pale, T.pale, "stores_pale");

    /* ---- landing gear: named "gear", hidden by the renderer in cruise. Its
       tyres (36x11 main, 24x7.7 nose) are the lowest opaque points. */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    /* nose leg, offset 0.33 m to starboard */
    var nx = 5.15, ny0 = -0.33, nzc = GROUND + 0.305;
    G.metal.push(bar([5.24, ny0, -0.56], [nx + 0.02, ny0, nzc + 0.30], 0.06, 8));
    G.metal.push(box(0.10, 0.32, 0.06, nx + 0.02, ny0, nzc + 0.31));
    G.metal.push(bar([nx + 0.02, ny0 + 0.14, nzc + 0.30], [nx, ny0 + 0.14, nzc], 0.026, 6));   /* fork */
    G.metal.push(bar([nx + 0.02, ny0 - 0.14, nzc + 0.30], [nx, ny0 - 0.14, nzc], 0.026, 6));
    G.metal.push(bar([5.85, ny0, -0.60], [5.21, ny0, -1.25], 0.03, 6));                       /* drag brace */
    G.tyre.push(cyl(0.305, 0.305, 0.20, 26, "y", nx, ny0, nzc));
    G.metal.push(cyl(0.14, 0.14, 0.22, 14, "y", nx, ny0, nzc));
    for (s = -1; s <= 1; s += 2)
      G.dark.push(box(1.00, 0.03, 0.42, 5.25, ny0 + s * 0.22, -0.74));                         /* bay doors */
    /* main legs out of the pods' bellies, wheels 2.63 m out */
    var mzc = GROUND + 0.455;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([0.32, s * 2.48, -0.90], [-0.22, s * 2.42, mzc + 0.05], 0.08, 8));
      G.metal.push(bar([-0.25, s * 2.40, mzc], [-0.25, s * 2.64, mzc], 0.045, 6));            /* axle */
      G.metal.push(bar([1.10, s * 2.56, -0.95], [0.06, s * 2.45, -1.42], 0.04, 6));            /* drag brace */
      G.tyre.push(cyl(0.455, 0.455, 0.28, 30, "y", -0.25, s * 2.63, mzc));
      G.metal.push(cyl(0.22, 0.22, 0.30, 16, "y", -0.25, s * 2.63, mzc));
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    return g;
  }

  /* --------------------------------------------------------------- fits -- */
  /* station 1 is the port wingtip, 11 the starboard; 6 (centreline) not fitted */
  var FITS = {
    a10a: { node: "a10a", scheme: SCHEMES.euro1, pave: true,
            st: { 1: "alq119", 2: "empty", 3: "lau88", 4: "gbu12", 5: "empty",
                  7: "empty", 8: "gbu12", 9: "lau88", 10: "empty", 11: "empty" } },
    a10c: { node: "a10c", scheme: SCHEMES.ghost,
            st: { 1: "alq131", 2: "empty", 3: "lau117", 4: "gbu12", 5: "empty",
                  7: "empty", 8: "gbu12", 9: "lau131", 10: "litening", 11: "lau105" } },
    a10cNow: { node: "a10c", scheme: SCHEMES.ghost,
            st: { 1: "alq131", 2: "empty", 3: "lau117", 4: "gbu38", 5: "empty",
                  7: "empty", 8: "gbu38", 9: "lau131", 10: "sniper", 11: "lau105" } }
  };
  function maker(f) { return function (THREE, M, C) { return buildAirframe(THREE, C, f); }; }
  return { a10a: maker(FITS.a10a), a10c: maker(FITS.a10c), a10cNow: maker(FITS.a10cNow) };
})();

/* len is the MEASURED x extent: the GAU-8 muzzle to the tail cone. */
UNIT_MODELS["nato_e80_cas"] = { len: 16.26, build: HeroA10.a10a };
UNIT_MODELS["nato_e00_cas"] = { len: 16.26, build: HeroA10.a10c };
UNIT_MODELS["bomber_n"]     = { len: 16.26, build: HeroA10.a10cNow };
