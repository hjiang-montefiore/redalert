/* ============ pact_su25_frogfoot.js - HERO model: Sukhoi Su-25 Frogfoot ============
   The close-air-support jet of both Pact-side air forces: eight defs, one
   airframe, four fits. It flies at 46 m under the camera, so it gets a hero
   build of its own instead of the hand-built units3d.js entry (67 meshes, one
   key) and the parametric 106-mesh stand-ins the other seven keys drew.

   Published figures (Sukhoi Su-25 data sheets): length 15.53 m with the nose
   probe, span 14.36 m, height 4.80 m on the gear, wing area 30.1 m2, leading
   edge swept about 19.5 degrees. This model measures 15.5 / 14.4 / 4.8.

   Shapes taken from Wikimedia Commons photographs, never from a generic jet:
     RF-91974 and RF-93023 (Su-25SM3, parked, starboard and 3/4 from ahead)
     Czech 8076 (Su-25K, export fit, chute out)   RF-95480 "07" (Su-25, Kubinka)
     "Su-25 in flight 01" (early aircraft banking, planform from above)
     "MOD Su-25 (2)" (a pair from above and behind, nozzles and stabiliser)
     "Russian Air Force Sukhoi Su-25 (1)", RF "02", gear down (nacelle and
     main leg from below and ahead)
     "Belarus-Pruzhany-Stepan Gudimov Park-Su-25-1" (front on: pylons, gear)
     RF-95480 side on with the gear down also gives the heights below, scaled
     off its 0.84 m main tyre and 0.66 m nose tyre.
   What they fix, and what the old model had wrong:
     - The engines are two big round nacelles hung UNDER a high straight wing,
       intake lips just behind the cockpit, running the whole length to two
       close-set nozzles. The old model faired them as thin tubes.
     - It stands tall. RF-95480 puts the intake centre about 1.85 m off the
       ground (the mouth about 1.0 m across, its lower lip about 1.35 m up),
       the wing root about 2.25 m up and the spine about 2.8 m; the fin above
       it is about 2.1 m tall. RF-93023 and the Pruzhany aircraft show 0.3 to
       0.45 m of main leg between the tyre top and the nacelle. The model: intake centre 1.82 m, nacelle belly
       1.26 m, tyre top 0.84 m, wing root 2.20 m, spine 2.81 m, fin tip 4.80 m.
     - The cockpit is a narrow armoured tub standing proud of a drooped,
       pointed nose, with a short flat-plate windscreen and a small canopy.
       The 30 mm GSh-30-2 is a chin fairing on the PORT side (the starboard
       side photographs show a clean nose) and the probe is a long boom.
     - Ten pylons: five a side, evenly spread between the nacelle and the
       wingtip pod. Stores hang with their noses well ahead of the leading
       edge, and that overhang is what the top-down camera reads. The
       outermost sits at 4.85 m, not the 5.5 m or so the photographs give:
       at game scale the airbase's revetment walls are 5.1 m (model) off the
       centreline and the outer pylon hangs below their top, so a missile
       there went 0.48 m into a wall on the e80 bases (parked3d_check B).
     - The wingtip pods are long (about 3.4 m, ahead of the leading edge and
       behind the trailing edge). Their after part, behind the trailing edge,
       is the split airbrake: its petals open above and below the pod, so the
       model shows a joint ring and the horizontal split line. (The flare
       blocks are not in the pods; they sit on the rear fuselage and the
       nacelle tops.) The fin is raked, the tailplane swept, set at the
       fuselage mid-height above the nozzles with a little anhedral.
   Self-defence missile: none of the eight rows lists one. The light outermost
   pylon is the missile station: the Soviet aircraft carry one R-60 there on
   an APU-60-I single rail (two rounds in all, the type's usual fit), the SM
   an R-73, the round that upgrade cleared. Neither fit was checked against a
   photograph of that service. No photograph of a KPAF Su-25 was found on
   Commons, so the KPA aircraft carry only what their rows name, and their
   outermost pylons stay empty.
   Variants, one airframe (build functions at the foot):
     su25    Su-25 Frogfoot-A (pact_e80_cas, pact_e90_cas): Soviet camouflage
             (green, dark green, khaki and brown over light blue, as RF-95480
             and the 2017 Kubinka four-ship), FAB-500 and FAB-250 bombs, B-8M1
             rocket pods, one R-60 a side outboard.
     su25k   Su-25K (kpa_e80_cas, kpa_e90_cas, kpa_e00_cas): export fit, UB-32A
             pods (32 x 57 mm, shorter and fatter than a B-8M1) and FAB-500
             and FAB-250 bombs: "bombs and rocket pods", as the rows say.
             kpa_e80_cas is the Su-25K / Su-25UBK row; only the single seater
             is drawn.
     su25kb  Su-25K (bomber_k): the same aircraft with the "FAB-250 and FAB-500
             bombs" its row names, and no rocket pods.
             KPA PAINT IS A STAND-IN: it is the two-tone green over light grey
             of the Czech Su-25K 8076, the same export standard. No KPAF
             photograph was found to say otherwise.
     sm      Su-25SM (pact_e00_cas): the Soviet-pattern camouflage the Kubinka
             aircraft of 2015-2017 still wear (RF-95480, the 2017 four-ship),
             the R-73 outboard.
     sm3     Su-25SM3 (bomber_p): the Vitebsk-25 suite. RF-93023's caption names
             the L-370-3S ECM containers on the outer underwing pylons and the
             Zakhvat UV sensor beside the nose gear. The photograph shows the
             pod on the outermost pylon, nothing outboard of it and the
             pylons inboard of it empty, and a green and sand camouflage over
             a near-white belly whose scalloped edge runs high up the nose.
             The row names a KAB-500 guided bomb; it hangs inboard with two
             B-8M1 pods, and the fourth pylon stays empty.

   Model space: +X nose, +Y left (port), +Z up, real metres. The origin is the
   wing-root mid-chord at the height the wing sits; the wheels stand 2.00 m
   below it. render3d.js stands the model up and rescales by the measured X
   extent: the probe is the front of that box and the tail cone the back.
   NAMED NODES: "gear" only (a jet has no rotor). The gear group holds the
   lowest opaque points of the model, so a parked aircraft rests on its tyres.
   The team colour is exactly C.team, on surfaces that face up: fin bands,
   a band across each wing, a stripe over the deck behind the cockpit.
   Draw calls: at most 7 meshes and a 3-mesh gear group, 8 materials,
   7,400 to 7,900 triangles a variant.
   ================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSu25 = (function () {
  "use strict";

  var V = null;                                   /* THREE, set by build() */
  var PI = Math.PI;
  var GROUND = -2.00;                             /* tyre bottoms, below the origin */
  var FIN_TOP = 2.65;                             /* fin tip; its receiver tops out at 2.80 */

  /* ------------------------------------------------------------- paint --
     Canvas layout: four bands stacked, 40 px per metre both ways so a blotch
     is as round on the wing as on the nose. Faces are projected by their own
     normal: top, port side, starboard side, belly. */
  var PXM = 40, XMIN = -7.3, TW = 640;
  var TOPH = 600, SIDEH = 216, TH = TOPH + 2 * SIDEH + TOPH;
  var YMAX = 7.5, ZTOP = 3.5, ZSPAN = 5.4;

  /* Schemes: tones are authored a little dark because the ACES pass lifts
     untextured and painted mid-greys alike. */
  /* dem is the height (model z) of the pale demarcation on the sides: about a
     quarter of the way up the nose on RF-95480, more than half
     way up it on the SM3 RF-93023. */
  var SCHEMES = {
    soviet: { name: "soviet", seed: 25801, base: "#5e6a40", belly: "#98a8b2",
              blot: ["#3f4c2e", "#7c7d58", "#6e5c3c"], dem: -0.32 },
    /* stand-in for the KPA: the Czech Su-25K export scheme (see the header) */
    export: { name: "export", seed: 25802, base: "#4a5636", belly: "#8d9899",
              blot: ["#36432a", "#5f6742"], dem: -0.30 },
    /* RF-93023, sampled off the photograph and darkened for the ACES pass:
       green and sand in about equal shares (every other patch is the green
       again) over a near-white belly */
    sm3:    { name: "sm3", seed: 25804, base: "#5e6d50", belly: "#c4cac4",
              blot: ["#9c8a66", "#5e6d50"], dem: 0.08 }
  };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }

  function paint(S) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = S.seed, i, b, x, y, k;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    g.fillStyle = S.base; g.fillRect(0, 0, TW, TOPH + 2 * SIDEH);
    g.fillStyle = S.belly; g.fillRect(0, TOPH + 2 * SIDEH, TW, TOPH);
    /* disruptive patches on the upper surface and both sides */
    for (b = 0; b < 3; b++) {
      for (i = 0; i < (b ? 24 : 70); i++) {
        g.globalAlpha = 0.92; g.fillStyle = S.blot[i % S.blot.length];
        g.beginPath();
        g.ellipse(R() * TW, bandY[b] + R() * bandH[b], 24 + R() * 80,
                  (b ? 7 : 18) + R() * (b ? 22 : 52), R() * 3.14, 0, 6.283);
        g.fill();
      }
    }
    g.globalAlpha = 1;
    /* the pale lower sides up to the scheme's demarcation height, scalloped
       the way the hand-masked line is in the photographs */
    var dy = (ZTOP - S.dem) / ZSPAN * SIDEH;
    for (b = 1; b <= 2; b++) {
      g.fillStyle = S.belly; g.fillRect(0, bandY[b] + dy, TW, SIDEH - dy);
      for (i = 0; i < 46; i++) {
        g.fillStyle = (i & 1) ? S.belly : S.base;
        g.beginPath();
        g.ellipse(R() * TW, bandY[b] + dy + (R() - 0.5) * 8, 10 + R() * 26, 3 + R() * 7, 0, 0, 6.283);
        g.fill();
      }
    }
    g.fillStyle = S.belly; g.fillRect(0, TOPH + 2 * SIDEH, TW, TOPH);
    /* panel seams and rivet rows, heavier on the top band */
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1;
    for (b = 0; b < 4; b++) {
      x = 0;
      while (x < TW) { x += 22 + R() * 50; g.beginPath(); g.moveTo(x, bandY[b]); g.lineTo(x, bandY[b] + bandH[b]); g.stroke(); }
      y = bandY[b];
      while (y < bandY[b] + bandH[b]) { y += 18 + R() * 46; g.beginPath(); g.moveTo(0, y); g.lineTo(TW, y); g.stroke(); }
    }
    g.fillStyle = "rgba(0,0,0,0.22)";
    for (i = 0; i < 60; i++) {
      x = R() * TW * 0.9; y = R() * TH; k = 10 + ((R() * 30) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 5, y, 1.4, 1.4);
    }
    /* soot behind the nozzles (tail is low x), gun gas ahead, oil under the nacelles */
    var sx = pxX(-7.3);
    var gr = g.createLinearGradient(sx, 0, pxX(-3.4), 0);
    gr.addColorStop(0, "rgba(20,17,14,0.55)"); gr.addColorStop(1, "rgba(20,17,14,0)");
    g.fillStyle = gr; g.fillRect(sx, 0, pxX(-3.4) - sx, TH);
    for (i = 0; i < 80; i++) {
      g.fillStyle = "rgba(24,20,16," + (0.05 + R() * 0.12).toFixed(3) + ")";
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
     aft (leading edges, intake lips) would collapse to a line under an x
     projection, so they are laid out along x + y. */
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
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x5f6a48);
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    /* armoured glass photographs dark from outside */
    m.glass = new V.MeshStandardMaterial({ color: 0x1d2e33, roughness: 0.10, metalness: 0.35 });
    /* ordnance: olive-drab bombs and pods; missiles and ECM containers pale grey */
    m.store = new V.MeshStandardMaterial({ color: 0x4a5238, roughness: 0.80, metalness: 0.10 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xb7bdbd, roughness: 0.55, metalness: 0.15 });
    /* exactly C.team, so eraPaint's team test leaves it alone; the emissive
       keeps it from greying out under ACES */
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

  /* ----------------------------------------------------- airframe data --
     Wing: straight leading edge swept 19.5 deg, trailing edge straight to
     mid-span then swept back a little, anhedral 1.5 deg, 14.36 m over the
     tip pods. Root chord 3.2 m, tip chord 1.25 m, thickness 0.40 m to 0.17 m. */
  function wingLE(y) { return 1.65 - (y - 0.7) * 0.3545; }
  function wingTE(y) { return y <= 3.3 ? -1.55 : -1.55 - (y - 3.3) * 0.0648; }
  function wingZ(y) { return 0.2 - (y - 0.7) * 0.0262; }
  function wingT(y) { return 0.40 - (y - 0.7) * 0.0374; }
  function wingSec(y, s) {
    var z = wingZ(y);
    return foil([wingLE(y), s * y, z], [wingTE(y), s * y, z], wingT(y), [0, 0, 1]);
  }
  /* fin: root chord 4.05 m at the deck (z 0.5), tip chord 1.6 m at FIN_TOP,
     2.15 m above it as RF-95480 has it: 4.80 m on the gear */
  function finF(z) { return (z - 0.5) / (FIN_TOP - 0.5); }
  function finLE(z) { return -2.45 - finF(z) * 2.4525; }
  function finTE(z) { return -6.50 - finF(z) * 0.04725; }
  function finT(z) { return 0.22 - finF(z) * 0.11325; }
  function finSec(z) { return foil([finLE(z), 0, z], [finTE(z), 0, z], finT(z), [0, 1, 0]); }

  var FUS = [
    ls( 7.35, 0, -0.40, 0.03, 0.03, 1.00),
    ls( 7.10, 0, -0.40, 0.17, 0.15, 0.80),
    ls( 6.60, 0, -0.38, 0.30, 0.26, 0.70),
    ls( 6.00, 0, -0.30, 0.40, 0.38, 0.60),
    ls( 5.40, 0, -0.18, 0.48, 0.52, 0.50),
    ls( 4.80, 0, -0.08, 0.54, 0.62, 0.45),
    ls( 4.00, 0, -0.02, 0.58, 0.68, 0.42),
    ls( 3.20, 0,  0.00, 0.62, 0.70, 0.42),
    ls( 2.20, 0,  0.02, 0.74, 0.66, 0.45),
    ls( 1.00, 0,  0.08, 0.80, 0.60, 0.50),
    ls(-0.50, 0,  0.12, 0.78, 0.56, 0.55),
    ls(-2.00, 0,  0.16, 0.72, 0.50, 0.58),
    ls(-3.50, 0,  0.20, 0.60, 0.44, 0.62),
    ls(-5.00, 0,  0.24, 0.46, 0.36, 0.70),
    ls(-6.20, 0,  0.26, 0.34, 0.28, 0.80),
    ls(-6.85, 0,  0.26, 0.20, 0.18, 0.90),
    ls(-7.05, 0,  0.26, 0.06, 0.06, 1.00)
  ];
  /* Nacelles: an intake lip just behind the cockpit, full diameter along the
     wing root, then a taper to a close-set nozzle. The nozzles converge: the
     photographs from behind show them nearly touching. The nacelle tops run
     just under the wing's upper surface at the root, the intake centre about
     1.82 m off the ground (RF-95480); aft they drop a little so the nozzles
     pass under the tailplane. */
  function nacSecs(s) {
    return [
      ls( 3.05, s * 0.96, -0.18, 0.465, 0.465, 1.00),
      ls( 2.85, s * 0.97, -0.18, 0.512, 0.512, 1.00),
      ls( 2.40, s * 0.98, -0.18, 0.540, 0.540, 0.95),
      ls( 1.00, s * 0.99, -0.18, 0.558, 0.558, 0.92),
      ls(-1.00, s * 0.98, -0.17, 0.567, 0.558, 0.90),
      ls(-3.00, s * 0.94, -0.17, 0.540, 0.530, 0.92),
      ls(-4.50, s * 0.88, -0.19, 0.484, 0.484, 0.96),
      ls(-5.50, s * 0.80, -0.23, 0.409, 0.409, 1.00),
      ls(-6.20, s * 0.74, -0.25, 0.353, 0.353, 1.00),
      ls(-6.70, s * 0.72, -0.25, 0.326, 0.326, 1.00)
    ];
  }
  var CANOPY = [
    ls(5.35, 0, 0.40, 0.30, 0.03, 0.70),
    ls(5.00, 0, 0.64, 0.42, 0.30, 0.80),
    ls(4.55, 0, 0.78, 0.48, 0.50, 0.85),
    ls(3.95, 0, 0.80, 0.48, 0.52, 0.85),
    ls(3.40, 0, 0.78, 0.40, 0.38, 0.85),
    ls(3.00, 0, 0.72, 0.26, 0.20, 0.90),
    ls(2.75, 0, 0.70, 0.12, 0.08, 1.00)
  ];

  /* ----------------------------------------------------------- stores --
     Profiles are [x fraction of length, radius fraction], nose first. */
  var P_BOMB = [[0.50, 0.04], [0.38, 0.62], [0.22, 0.96], [0.05, 1.0], [-0.22, 1.0], [-0.38, 0.66], [-0.50, 0.42]];
  var P_POD  = [[0.50, 0.86], [0.485, 0.96], [0.46, 1.0], [-0.30, 1.0], [-0.44, 0.86], [-0.50, 0.50]];
  var P_ECM  = [[0.50, 0.22], [0.44, 0.68], [0.34, 0.95], [0.18, 1.0], [-0.26, 1.0], [-0.40, 0.84], [-0.50, 0.46]];
  var P_AAM  = [[0.50, 0.05], [0.44, 0.60], [0.36, 1.0], [-0.40, 1.0], [-0.50, 0.9]];
  var ST_Y = [1.85, 2.60, 3.35, 4.10, 4.85];

  function pylon(K, x, y, zTop, zBot, ch0, ch1) {
    var A = [[x - ch0 * 0.55, y - 0.045, zTop], [x + ch0 * 0.45, y - 0.045, zTop], [x + ch0 * 0.45, y + 0.045, zTop], [x - ch0 * 0.55, y + 0.045, zTop]];
    var B = [[x - ch1 * 0.30, y - 0.045, zBot], [x + ch1 * 0.70, y - 0.045, zBot], [x + ch1 * 0.70, y + 0.045, zBot], [x - ch1 * 0.30, y + 0.045, zBot]];
    K.skin.push(solid(A, B));
  }
  function finsAt(list, x, y, z, chord, span) {
    list.push(box(chord, span * 2, 0.025, x, y, z));
    list.push(box(chord, 0.025, span * 2, x, y, z));
  }
  function addStore(K, kind, s, st) {
    var y = s * ST_Y[st], ay = ST_Y[st];
    var zb = wingZ(ay) - wingT(ay) / 2;
    var xm = (wingLE(ay) + wingTE(ay)) / 2 - 0.10;
    var len, r, zc;
    if (kind === "fab500") { len = 2.25; r = 0.225; }
    else if (kind === "fab250") { len = 1.55; r = 0.16; }
    else if (kind === "kab500") { len = 3.05; r = 0.20; }
    else if (kind === "b8") { len = 3.45; r = 0.19; }
    else if (kind === "ub32") { len = 2.0; r = 0.21; }
    else if (kind === "ecm") { len = 2.7; r = 0.19; }
    else if (kind === "r60" || kind === "none") { len = 2.1; r = 0.06; }
    else if (kind === "empty") { len = 0; r = 0.10; }               /* a bare pylon */
    else { len = 2.9; r = 0.085; }                                  /* r73 */
    if (kind === "none" || kind === "r60") {
      /* the light outermost (missile) pylon, empty or with one R-60 on an
         APU-60-I single rail */
      zc = zb - 0.26;
      pylon(K, xm, y, zb + 0.03, zc + 0.05, 1.1, 0.8);
      if (kind === "none") return;
      K.dark.push(box(1.5, 0.07, 0.05, xm, y, zc + 0.03));
      push(K.pale, revolve(P_AAM, len, r, xm + 0.1, y, zc - 0.05, 10));
      finsAt(K.pale, xm - 0.8, y, zc - 0.05, 0.22, 0.14);
      return;
    }
    zc = zb - 0.10 - r;
    if (kind === "empty") { pylon(K, xm, y, zb + 0.03, zb - 0.20, 1.35, 1.0); return; }
    pylon(K, xm, y, zb + 0.03, zc + r * 0.4, 1.35, 1.0);
    if (kind === "r73") {
      K.dark.push(box(1.1, 0.07, 0.05, xm + 0.1, y, zc + r + 0.02));
      push(K.pale, revolve(P_AAM, len, r, xm + 0.3, y, zc, 12));
      finsAt(K.pale, xm - 1.05, y, zc, 0.34, 0.20);
      finsAt(K.pale, xm + 0.65, y, zc, 0.20, 0.13);                  /* canards */
    } else if (kind === "ecm") {
      push(K.pale, revolve(P_ECM, len, r, xm + 0.1, y, zc, 18));
      K.dark.push(cyl(r + 0.004, r + 0.004, 0.16, 14, "x", xm + 0.1 + len * 0.28, y, zc));
      K.dark.push(cyl(r + 0.004, r + 0.004, 0.16, 14, "x", xm + 0.1 - len * 0.30, y, zc));
    } else if (kind === "b8" || kind === "ub32") {
      push(K.store, revolve(P_POD, len, r, xm + 0.25, y, zc, 18));
      K.dark.push(cyl(r * 0.84, r * 0.84, 0.02, 14, "x", xm + 0.25 + len * 0.5 + 0.004, y, zc));   /* tube mouths */
    } else {                                                          /* bombs */
      push(K.store, revolve(P_BOMB, len, r, xm + 0.1, y, zc, 16));
      finsAt(K.store, xm + 0.1 - len * 0.42, y, zc, len * 0.20, r * 1.45);
      if (kind === "kab500") {
        K.dark.push(cyl(r * 0.30, r * 0.30, 0.10, 8, "x", xm + 0.1 + len * 0.5 - 0.02, y, zc));      /* seeker */
        finsAt(K.store, xm + 0.1 + len * 0.05, y, zc, len * 0.30, r * 1.30);                         /* lift wings */
      }
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

    /* fuselage and the long dorsal ridge that carries the fin */
    push(K.skin, loft(FUS, 28, 0.04, 0.03));
    push(K.skin, loft([ls(3.00, 0, 0.70, 0.22, 0.05, 0.8), ls(1.00, 0, 0.70, 0.36, 0.11, 0.7), ls(-1.00, 0, 0.71, 0.38, 0.12, 0.7),
                       ls(-2.60, 0, 0.72, 0.30, 0.14, 0.7), ls(-4.00, 0, 0.70, 0.20, 0.13, 0.75), ls(-5.20, 0, 0.62, 0.10, 0.08, 0.9)],
                      16, 0, 0));

    /* nacelles, intake faces, nozzle shrouds */
    for (s = -1; s <= 1; s += 2) {
      push(K.skin, loft(nacSecs(s), 32, null, null));
      K.dark.push(cyl(0.484, 0.484, 0.03, 24, "x", 2.97, s * 0.97, -0.18));        /* intake mouth, 0.97 m */
      push(K.metal, loft([ls(-6.00, s * 0.765, -0.245, 0.386, 0.386, 1), ls(-6.35, s * 0.74, -0.25, 0.361, 0.361, 1),
                          ls(-6.78, s * 0.72, -0.25, 0.337, 0.337, 1)], 20, 0, null));
      K.dark.push(cyl(0.340, 0.340, 0.03, 20, "x", -6.765, s * 0.72, -0.25));     /* nozzle bore */
    }
    K.dark.push(cyl(0.07, 0.06, 0.12, 10, "x", -7.03, 0, 0.26));                    /* tail stinger / chute door */

    /* wings, tailplane, fin */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(wingSec(0.7, s), wingSec(3.3, s)));
      K.skin.push(solid(wingSec(3.3, s), wingSec(6.85, s)));
      K.skin.push(solid(
        foil([-4.60, s * 0.5, 0.22], [-6.55, s * 0.5, 0.22], 0.22, [0, 0, 1]),
        foil([-5.75, s * 2.35, 0.13], [-6.55, s * 2.35, 0.13], 0.10, [0, 0, 1])));
    }
    K.skin.push(solid(finSec(0.5), finSec(FIN_TOP)));
    K.dark.push(box(0.42, 0.05, 0.20, -5.70, 0, FIN_TOP + 0.05));                    /* fin-tip receiver */

    /* wingtip pods: the after part is the split airbrake (petals open above
       and below), so a joint ring where it starts and its horizontal split
       line to the tail of the pod */
    for (s = -1; s <= 1; s += 2) {
      var py = s * 6.98;
      push(K.skin, loft([ls(0.55, py, 0.04, 0.025, 0.025), ls(0.35, py, 0.04, 0.11, 0.11), ls(0.05, py, 0.04, 0.18, 0.18),
                         ls(-0.80, py, 0.04, 0.21, 0.21), ls(-1.80, py, 0.04, 0.21, 0.21), ls(-2.35, py, 0.04, 0.17, 0.17),
                         ls(-2.70, py, 0.04, 0.08, 0.08), ls(-2.78, py, 0.04, 0.03, 0.03)], 18, 0.03, 0.02));
      K.dark.push(cyl(0.214, 0.214, 0.035, 14, "x", -1.90, py, 0.04));
      var spl = function (x, hw) {
        return [[x, py - hw, 0.028], [x, py + hw, 0.028], [x, py + hw, 0.052], [x, py - hw, 0.052]];
      };
      K.dark.push(solid(spl(-1.90, 0.216), spl(-2.35, 0.176)));
      K.dark.push(solid(spl(-2.35, 0.176), spl(-2.70, 0.086)));
    }

    /* nose: drooped cone, laser window under the tip, long probe with vanes,
       the port-side GSh-30-2 chin fairing */
    K.dark.push(box(0.22, 0.20, 0.10, 6.98, 0, -0.60, 0, 0.45, 0));
    K.metal.push(cyl(0.016, 0.022, 1.13, 6, "x", 7.865, 0, -0.38));
    K.metal.push(box(0.03, 0.30, 0.012, 8.33, 0, -0.38));
    K.metal.push(box(0.03, 0.012, 0.20, 8.33, 0, -0.38));
    push(K.skin, loft([ls(6.95, 0.19, -0.62, 0.10, 0.09, 0.9), ls(6.40, 0.22, -0.58, 0.15, 0.14, 0.8),
                       ls(5.50, 0.26, -0.52, 0.19, 0.17, 0.8), ls(4.60, 0.30, -0.50, 0.19, 0.15, 0.8)], 12, 0.05, null));
    K.dark.push(cyl(0.022, 0.022, 0.55, 6, "x", 7.18, 0.145, -0.64));
    K.dark.push(cyl(0.022, 0.022, 0.55, 6, "x", 7.18, 0.255, -0.64));
    K.dark.push(box(0.70, 0.62, 0.02, 5.62, 0, 0.27, 0, 0.40, 0));                    /* anti-glare panel */

    /* armoured canopy: flat-plate windscreen, small bubble, dark bows */
    push(K.glass, loft(CANOPY, 20, 0.04, 0.02));
    K.dark.push(bar([5.12, -0.40, 0.84], [5.12, 0.40, 0.84], 0.022, 6));
    K.dark.push(bar([4.20, -0.46, 0.96], [4.20, 0.46, 0.96], 0.022, 6));
    K.dark.push(bar([5.30, -0.36, 0.52], [3.15, -0.47, 0.76], 0.02, 6));
    K.dark.push(bar([5.30, 0.36, 0.52], [3.15, 0.47, 0.76], 0.02, 6));
    K.dark.push(bar([5.05, 0, 0.88], [5.28, 0, 0.55], 0.018, 6));
    K.dark.push(box(0.30, 0.34, 0.03, 5.18, 0, 0.90, 0, 0.5, 0));                     /* HUD hood */

    /* ten pylons and what they carry */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 5; i++) addStore(K, cfg.fit[i], s, i);
    if (cfg.uv) K.dark.push(box(0.13, 0.09, 0.07, 4.62, 0.26, -0.70));              /* Zakhvat UV sensor */

    /* team flashes: only faces that look up */
    var wb = function (y, sd) {
      var z = wingZ(y), h = wingT(y) * 0.47 + 0.008;
      return blk([wingLE(y), sd * y, z], [wingTE(y), sd * y, z], 0.32, 0.60, h, [0, 0, 1]);
    };
    var fb = function (z) {
      var h = finT(z) * 0.47 + 0.008;
      return blk([finLE(z), 0, z], [finTE(z), 0, z], 0.38, 0.80, h, [0, 1, 0]);
    };
    for (s = -1; s <= 1; s += 2) K.team.push(solid(wb(3.0, s), wb(4.5, s)));
    K.team.push(solid(fb(0.5 + 0.58 * (FIN_TOP - 0.5)), fb(0.5 + 0.94 * (FIN_TOP - 0.5))));
    K.team.push(box(1.5, 0.46, 0.03, -0.40, 0, 0.835));
    var sbk = function (y, sd) {
      var le = -4.60 - (y - 0.5) * 0.6216, z = 0.22 - (y - 0.5) * 0.0486, h = (0.22 - (y - 0.5) * 0.0649) * 0.47 + 0.008;
      return blk([le, sd * y, z], [-6.55, sd * y, z], 0.30, 0.76, h, [0, 0, 1]);
    };
    for (s = -1; s <= 1; s += 2) K.team.push(solid(sbk(0.95, s), sbk(2.0, s)));

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.store, T.store, "stores");
    mesh(g, K.pale, T.pale, "stores_pale");

    /* ---- landing gear: named "gear", hidden by the renderer in cruise. Its
       tyres are the lowest opaque points of the model. */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nz = GROUND + 0.33;
    G.metal.push(bar([4.28, 0, -0.60], [4.17, 0, nz + 0.06], 0.045, 8));
    G.metal.push(bar([4.18, -0.11, nz + 0.36], [4.16, -0.11, nz], 0.022, 6));       /* fork */
    G.metal.push(bar([4.18, 0.11, nz + 0.36], [4.16, 0.11, nz], 0.022, 6));
    G.metal.push(box(0.10, 0.26, 0.05, 4.18, 0, nz + 0.37));
    G.metal.push(bar([4.55, 0, -0.62], [4.22, 0, -1.20], 0.025, 6));                 /* drag brace */
    G.tyre.push(cyl(0.33, 0.33, 0.20, 28, "y", 4.16, 0, nz));
    G.metal.push(cyl(0.16, 0.16, 0.22, 16, "y", 4.16, 0, nz));
    G.dark.push(box(0.50, 0.40, 0.03, 4.16, 0, nz + 0.40, 0, 0.30, 0));              /* debris guard */
    /* main legs: some 0.4 m of oleo shows between the tyre top (0.84 m up)
       and the nacelle belly (1.26 m up), as RF-93023 and the Pruzhany
       aircraft show */
    var mz = GROUND + 0.42;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([0.55, s * 1.02, -0.55], [0.45, s * 1.22, mz + 0.05], 0.07, 8));
      G.metal.push(bar([0.95, s * 1.22, -0.40], [0.52, s * 1.19, -1.12], 0.035, 6));     /* drag strut */
      G.metal.push(bar([0.10, s * 1.18, -0.62], [0.45, s * 1.22, mz], 0.035, 6));
      G.tyre.push(cyl(0.42, 0.42, 0.30, 32, "y", 0.45, s * 1.22, mz));
      G.metal.push(cyl(0.20, 0.20, 0.32, 16, "y", 0.45, s * 1.22, mz));
      G.dark.push(box(1.05, 0.04, 0.40, 0.45, s * 0.86, -0.90, s * 0.35, 0, 0));     /* gear door */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    return g;
  }

  /* --------------------------------------------------------------- fits -- */
  /* stations inboard to outboard; the fifth is the light missile pylon */
  var FITS = {
    su25:   { node: "su25",    scheme: SCHEMES.soviet, fit: ["fab500", "b8",     "b8",     "fab250", "r60"] },
    su25k:  { node: "su25k",   scheme: SCHEMES.export, fit: ["fab500", "ub32",   "ub32",   "fab250", "none"] },
    su25kb: { node: "su25k",   scheme: SCHEMES.export, fit: ["fab500", "fab500", "fab250", "fab250", "none"] },
    sm:     { node: "su25sm",  scheme: SCHEMES.soviet, fit: ["fab500", "b8",     "b8",     "fab250", "r73"] },
    sm3:    { node: "su25sm3", scheme: SCHEMES.sm3,    fit: ["kab500", "b8",     "b8",     "empty",  "ecm"], uv: true }
  };
  function maker(f) { return function (THREE, M, C) { return buildAirframe(THREE, C, f); }; }
  return { su25: maker(FITS.su25), su25k: maker(FITS.su25k), su25kb: maker(FITS.su25kb),
           sm: maker(FITS.sm), sm3: maker(FITS.sm3) };
})();

/* len is the MEASURED x extent: the nose probe to the tail stinger. */
UNIT_MODELS["pact_e80_cas"] = { len: 15.52, build: HeroSu25.su25 };
UNIT_MODELS["pact_e90_cas"] = { len: 15.52, build: HeroSu25.su25 };
UNIT_MODELS["pact_e00_cas"] = { len: 15.52, build: HeroSu25.sm };
UNIT_MODELS["bomber_p"]     = { len: 15.52, build: HeroSu25.sm3 };
UNIT_MODELS["bomber_k"]     = { len: 15.52, build: HeroSu25.su25kb };
UNIT_MODELS["kpa_e80_cas"]  = { len: 15.52, build: HeroSu25.su25k };
UNIT_MODELS["kpa_e90_cas"]  = { len: 15.52, build: HeroSu25.su25k };
UNIT_MODELS["kpa_e00_cas"]  = { len: 15.52, build: HeroSu25.su25k };
