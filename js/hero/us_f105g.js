/* ========== us_f105g.js - HERO MODEL: Republic F-105G Thunderchief Wild Weasel III (e60, NATO) ==========

   Key: nato_e60_sead (full name "Republic F-105G Thunderchief Wild Weasel III", 1968).

   Sources: a Republic F-105D three-view drawing (plan, side and front, scale
   checked on the 10.65 m span and the 19.6 m length; measured at 27.2 px/m)
   for every station, and a photograph of the USAF Museum F-105G 62-4420 (the
   "WW" tail) for the finish and the layout of the tandem cockpits.
   Published figures used:
     length   20.42 m (67 ft, USAF Museum F-105G fact sheet; = the F-105D's
                       64 ft 4.75 in plus the 31 in of the rear cockpit)
     span     10.65 m (34 ft 11 in, the same wing as the D)
     height   6.15 m  (the F/G has a taller fin than the D's 19 ft 8 in)
   The G cues drawn: tandem canopies; the F-105 wing-root intakes, area-ruled
   waist and thin 45-degree wing on a mid-fuselage position; the tall fin and
   low slab tailplane over the single nozzle; the G's wingtip RHAW fairings
   (the redesigned wingtips); the two long AN/ALQ-105 blisters under the
   fuselage; and the loadout the reference gives for a typical G sortie: two
   AGM-45 Shrikes on the outboard pylons, one AGM-78 Standard ARM on an
   inboard pylon balanced by a 450 gal tank on the other, a 650 gal centreline
   tank. Finish: Southeast Asia tan / two-green camouflage over light grey
   undersides and a black radome.
   NOT confirmed from the references: the exact length of the ALQ-105 blisters
   and their station, the side the Standard ARM hung on, the main gear track.

   Model space: +X nose, +Y port, +Z up, metres. S(s) converts a station s
   (metres aft of the nose tip) to x. Fuselage axis is z = 0; the ground is
   z = -2.35.
*/
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  /* The drawing stations run 0-21.2; the published F/G length is 67 ft
     (20.42 m, the D's 64 ft 4.75 in plus 31 in), so the 0.78 m surplus is
     taken out of the forward fuselage ahead of the intakes (station 9.0) and
     everything aft of it keeps its measured station, less the 0.78 m. */
  var L = 20.42;
  var NOSE = L / 2;
  var TRIM = 0.78, KNEE = 9.0;
  function S(s) { return NOSE - (s < KNEE ? s * (KNEE - TRIM) / KNEE : s - TRIM); }
  var GROUND = -2.35;

  /* ---------------------------------------------------------- paint sheet */
  var texCache = null;
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function makeSheet(THREE) {
    var W = 1024, H = 512;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var R = rngFor(0x105A6);
    function CY(v) { return (1 - v) * H; }
    g.fillStyle = "#566746"; g.fillRect(0, 0, W, H);       /* green 34102 base */
    var i, tone;
    for (i = 0; i < 38; i++) {                              /* tan 30219 and dark green 34079 */
      tone = (i & 1) ? "#8c7c58" : "#3b4932";
      g.globalAlpha = 0.9; g.fillStyle = tone;
      g.beginPath();
      g.ellipse(R() * W, R() * CY(0.52), 50 + R() * 150, 22 + R() * 60, R() * 3.14, 0, 6.29);
      g.fill();
    }
    g.globalAlpha = 1;
    /* light grey undersides, a hard edge below the flank */
    g.fillStyle = "#b9bdbe"; g.fillRect(0, CY(0.90), W, CY(0.60) - CY(0.90));
    g.fillStyle = "#a9adae"; g.fillRect(0, CY(0.84), W, 3);
    /* panel lines and rivet rows */
    var x = 0, y;
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.5;
    while (x < W) { x += 24 + R() * 60; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    for (i = 0; i < 14; i++) {
      y = R() * H; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    g.fillStyle = "rgba(0,0,0,0.2)";
    for (i = 0; i < 30; i++) {
      var rx = R() * W * 0.8, ry = R() * H, n = 14 + (R() * 30) | 0;
      for (var j = 0; j < n; j++) g.fillRect(rx + j * 6.5, ry, 1.5, 1.5);
    }
    /* exhaust soot at the tail end (u = s / L, so the tail is on the right) */
    var sg = g.createLinearGradient(W * 0.9, 0, W, 0);
    sg.addColorStop(0, "rgba(20,18,16,0)"); sg.addColorStop(1, "rgba(20,18,16,0.5)");
    g.fillStyle = sg; g.fillRect(W * 0.9, 0, W * 0.1, H);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }
  function sheet(THREE) {
    if (texCache === null) { try { texCache = makeSheet(THREE); } catch (e) { texCache = false; } }
    return texCache || null;
  }

  /* ------------------------------------------------------------- geometry */
  var V;
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* rows: [s, w, h, zc, sq] nose first; resampled to n stations */
  function resample(rows, n) {
    var out = [], i, k, t, a, b, f;
    for (i = 0; i < n; i++) {
      t = rows[0][0] + (rows[rows.length - 1][0] - rows[0][0]) * i / (n - 1);
      for (k = 0; k < rows.length - 2 && rows[k + 1][0] < t; k++) {}
      a = rows[k]; b = rows[k + 1];
      f = (t - a[0]) / (b[0] - a[0]);
      f = f * f * (3 - 2 * f) * 0.5 + f * 0.5;
      out.push([t, lerp(a[1], b[1], f), lerp(a[2], b[2], f), lerp(a[3], b[3], f), lerp(a[4], b[4], f)]);
    }
    return out;
  }
  /* round lofted body along X. Sections run nose to tail = decreasing x. */
  function body(M, rows, segs, n, yc, zoff, sMul) {
    var r = n ? resample(rows, n) : rows, secs = [], i;
    for (i = 0; i < r.length; i++) {
      secs.push({ x: S(r[i][0]), w: r[i][1], h: r[i][2], zc: r[i][3] + (zoff || 0), sq: r[i][4] || 1 });
    }
    var geo = M.loft(V, secs, segs);
    /* u runs along the body as s / L so the sheet reads the same on every part */
    var uv = geo.attributes.uv, pos = geo.attributes.position, k;
    for (k = 0; k < uv.count; k++) uv.setX(k, (NOSE - pos.getX(k)) / L);
    if (yc) geo.translate(0, yc, 0);
    return geo;
  }

  /* flat-faced convex solid from rings of 3D points; faces oriented outward.
     skinUV: sheet uv from the face normal (top camouflage or grey underside) */
  function prism(rings, skinUV) {
    var P = [], i, j, n = rings[0].length, cx = 0, cy = 0, cz = 0, c = 0;
    for (i = 0; i < rings.length; i++) for (j = 0; j < n; j++) {
      cx += rings[i][j][0]; cy += rings[i][j][1]; cz += rings[i][j][2]; c++;
    }
    cx /= c; cy /= c; cz /= c;
    function tri(a, b, d) { P.push([a, b, d]); }
    for (i = 0; i < rings.length - 1; i++) for (j = 0; j < n; j++) {
      var a = rings[i][j], b = rings[i][(j + 1) % n], d = rings[i + 1][j], e = rings[i + 1][(j + 1) % n];
      tri(a, b, d); tri(b, e, d);
    }
    for (j = 1; j < n - 1; j++) {
      tri(rings[0][0], rings[0][j], rings[0][j + 1]);
      var q = rings[rings.length - 1];
      tri(q[0], q[j], q[j + 1]);
    }
    var pos = [], uv = [], t, A, B, D, ux, uy, uz, vx, vy, vz, nx, ny, nz, mx, my, mz, k, top, p;
    for (k = 0; k < P.length; k++) {
      t = P[k]; A = t[0]; B = t[1]; D = t[2];
      ux = B[0] - A[0]; uy = B[1] - A[1]; uz = B[2] - A[2];
      vx = D[0] - A[0]; vy = D[1] - A[1]; vz = D[2] - A[2];
      nx = uy * vz - uz * vy; ny = uz * vx - ux * vz; nz = ux * vy - uy * vx;
      mx = (A[0] + B[0] + D[0]) / 3 - cx; my = (A[1] + B[1] + D[1]) / 3 - cy; mz = (A[2] + B[2] + D[2]) / 3 - cz;
      if (nx * mx + ny * my + nz * mz < 0) { t = [A, D, B]; nz = -nz; ny = -ny; nx = -nx; }
      top = nz > -0.25 * Math.sqrt(nx * nx + ny * ny + nz * nz);
      for (p = 0; p < 3; p++) {
        pos.push(t[p][0], t[p][1], t[p][2]);
        uv.push((NOSE - t[p][0]) / L, skinUV ? (top ? 0.08 + 0.34 * Math.min(1, (Math.abs(t[p][1]) + Math.abs(t[p][2])) / 6) : 0.66 + 0.2 * Math.min(1, Math.abs(t[p][1]) / 5.3)) : 0.5);
      }
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new V.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return g;
  }

  /* aerofoil section ring at a station: 4 points (leading edge, upper ridge at
     40 per cent chord, trailing edge, lower ridge), thickness along z */
  function wingRing(sLE, sTE, y, z, t) {
    var sm = sLE + (sTE - sLE) * 0.4;
    return [[S(sLE), y, z], [S(sm), y, z + t / 2], [S(sTE), y, z], [S(sm), y, z - t / 2]];
  }
  /* the same with thickness along y (fin): z is the height */
  function finRing(sLE, sTE, z, t) {
    var sm = sLE + (sTE - sLE) * 0.4;
    return [[S(sLE), 0, z], [S(sm), t / 2, z], [S(sTE), 0, z], [S(sm), -t / 2, z]];
  }

  function rod(p0, p1, r, seg) {
    var dx = p1[0] - p0[0], dy = p1[1] - p0[1], dz = p1[2] - p0[2];
    var len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, len, seg || 8, 1);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / len, dy / len, dz / len));
    g.applyMatrix4(new V.Matrix4().makeRotationFromQuaternion(q));
    g.translate((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, (p0[2] + p1[2]) / 2);
    return g;
  }
  /* wheel: axle along Y */
  function wheel(r, wdt, x, y, z, seg) {
    var g = new V.CylinderGeometry(r, r, wdt, seg || 20, 1);
    g.translate(x, y, z);
    return g;
  }
  function box(sx, sy, sz, x, y, z) {
    var g = new V.BoxGeometry(sx, sy, sz);
    g.translate(x, y, z);
    return g;
  }
  function addUV(g) {
    if (!g.attributes.uv) g.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    return g;
  }
  function merge(list) {
    var pos = [], nor = [], uv = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      addUV(g);
      var p = g.attributes.position.array, n = g.attributes.normal.array, u = g.attributes.uv.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < u.length; j++) uv.push(u[j]);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uv, 2));
    return out;
  }

  /* ------------------------------------------------------------ materials */
  function makeMats(C) {
    var tex = sheet(V), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.06, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x5b6a48);
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.6, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.dark = new V.MeshStandardMaterial({ color: 0x0b0c0d, roughness: 0.9, metalness: 0.04, side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x6a7075, roughness: 0.5, metalness: 0.55, side: V.DoubleSide });
    m.store = new V.MeshStandardMaterial({ color: 0xb4b8b8, roughness: 0.62, metalness: 0.1, side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: 0x3f5256, roughness: 0.12, metalness: 0.5,
                                           transparent: true, opacity: 0.8, side: V.DoubleSide });
    return m;
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    V = THREE;
    var K = { skin: [], dark: [], metal: [], store: [], glass: [], team: [] };
    var G = { metal: [], dark: [] };
    var sgn, i, k;

    /* --- fuselage: round-nosed, area-ruled waist, flat spine, narrow tail */
    var FUS = [
      [3.40, 0.44, 0.44, -0.27, 1.00],
      [4.90, 0.54, 0.62, -0.28, 0.92],
      [6.50, 0.60, 0.75, -0.12, 0.86],
      [8.50, 0.64, 0.85, -0.08, 0.82],
      [10.5, 0.72, 0.90, -0.03, 0.80],
      [12.5, 0.76, 0.92,  0.00, 0.80],
      [14.5, 0.74, 0.90,  0.00, 0.82],
      [16.5, 0.70, 0.85, -0.02, 0.86],
      [18.5, 0.62, 0.74, -0.05, 0.92],
      [20.2, 0.54, 0.58, -0.03, 1.00]
    ];
    K.skin.push(body(M, FUS, 40, 30));
    /* radome */
    var RAD = [
      [0.00, 0.02, 0.02, -0.25, 1], [0.35, 0.10, 0.10, -0.26, 1], [1.00, 0.23, 0.23, -0.27, 1],
      [1.80, 0.34, 0.34, -0.27, 1], [2.60, 0.41, 0.41, -0.27, 1], [3.40, 0.44, 0.44, -0.27, 1]
    ];
    K.dark.push(body(M, RAD, 40, 14));
    /* nozzle: burnt metal, flared, with the dark exhaust inside */
    var NOZ = [[20.2, 0.54, 0.58, -0.03, 1], [20.7, 0.52, 0.54, -0.03, 1], [21.2, 0.56, 0.58, -0.03, 1]];
    K.metal.push(body(M, NOZ, 28, 0));
    var cap = new V.CircleGeometry(0.50, 24);
    cap.rotateY(-Math.PI / 2); cap.translate(S(20.95), 0, -0.03);
    K.dark.push(cap);

    /* --- intakes in the wing roots: an oval scoop each side, dark mouth */
    var INT = [
      [9.20, 0.34, 0.46, 0.00, 0.95], [9.60, 0.42, 0.52, 0.00, 0.95], [10.8, 0.46, 0.54, 0.00, 0.95],
      [12.2, 0.40, 0.50, 0.00, 0.95], [13.4, 0.22, 0.34, 0.00, 0.95]
    ];
    for (sgn = -1; sgn <= 1; sgn += 2) {
      K.skin.push(body(M, INT, 28, 12, sgn * 0.66));
      var mouth = new V.CircleGeometry(1, 24);
      mouth.scale(0.46, 0.34, 1);
      mouth.rotateY(-Math.PI / 2);
      mouth.translate(S(9.32), sgn * 0.66, 0);
      K.dark.push(mouth);
    }

    /* --- canopies: front and rear, glass over dark sills and frames */
    var CF = [[4.70, 0.10, 0.06, 0.44, 1], [5.10, 0.33, 0.28, 0.62, 1], [5.90, 0.38, 0.34, 0.68, 1], [6.60, 0.32, 0.28, 0.62, 1]];
    var CR = [[6.80, 0.32, 0.28, 0.64, 1], [7.70, 0.37, 0.34, 0.70, 1], [8.60, 0.33, 0.30, 0.66, 1], [9.30, 0.12, 0.08, 0.50, 1]];
    K.glass.push(body(M, CF, 22, 8));
    K.glass.push(body(M, CR, 22, 8));
    K.dark.push(box(0.10, 0.74, 0.06, S(4.95), 0, 0.82));   /* windscreen bow */
    K.dark.push(box(0.14, 0.76, 0.08, S(6.70), 0, 0.90));   /* canopy divider */
    K.dark.push(box(0.12, 0.70, 0.08, S(9.15), 0, 0.82));
    K.dark.push(box(1.80, 0.62, 0.05, S(5.70), 0, 0.50));   /* front cockpit coaming */
    K.dark.push(box(1.90, 0.60, 0.05, S(7.80), 0, 0.50));
    K.dark.push(box(0.38, 0.28, 0.46, S(5.90), 0, 0.70));   /* ejection seats */
    K.dark.push(box(0.38, 0.28, 0.46, S(8.00), 0, 0.72));

    /* --- wing: 45 degree thin wing, slight anhedral */
    var W0 = { y: 0.55, le: 10.80, te: 13.60, z: -0.20, t: 0.30 };
    var W1 = { y: 5.20, le: 15.20, te: 17.20, z: -0.50, t: 0.10 };
    function wingAt(y) {
      var f = (y - W0.y) / (W1.y - W0.y);
      return { le: lerp(W0.le, W1.le, f), te: lerp(W0.te, W1.te, f), z: lerp(W0.z, W1.z, f), t: lerp(W0.t, W1.t, f) };
    }
    for (sgn = -1; sgn <= 1; sgn += 2) {
      K.skin.push(prism([wingRing(W0.le, W0.te, sgn * W0.y, W0.z, W0.t),
                         wingRing(W1.le, W1.te, sgn * W1.y, W1.z, W1.t)], true));
      /* team flash on the upper surface, proud of the skin */
      var wf = wingAt(2.9);
      K.team.push(box(0.95, 1.10, 0.05, S(wf.le + (wf.te - wf.le) * 0.42), sgn * 2.9, wf.z + wf.t * 0.5 + 0.015));
      /* G wingtip RHAW fairing: a slim pod standing ahead of the tip */
      var TIP = [[14.10, 0.03, 0.03, 0, 1], [14.60, 0.11, 0.11, 0, 1], [15.60, 0.14, 0.14, 0, 1], [17.30, 0.10, 0.10, 0, 1], [17.55, 0.03, 0.03, 0, 1]];
      var tpg = body(M, TIP, 14, 0, sgn * W1.y, W1.z + 0.0);
      K.store.push(tpg);
    }

    /* --- fin: tall, swept, with a rudder line */
    K.skin.push(prism([finRing(16.40, 19.00, 0.45, 0.28), finRing(19.70, 21.00, 3.80, 0.09)], true));
    for (sgn = -1; sgn <= 1; sgn += 2) {
      K.team.push(box(1.10, 0.025, 0.85, S(19.35), sgn * 0.075, 2.50));   /* fin band */
    }
    K.dark.push(box(0.10, 0.012, 1.20, S(20.35), 0.06, 2.20));

    /* --- all-moving tailplane, low on the tail */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      K.skin.push(prism([wingRing(18.00, 20.90, sgn * 0.45, -0.22, 0.20),
                         wingRing(20.40, 21.00, sgn * 2.60, -0.46, 0.07)], true));
    }

    /* --- the two AN/ALQ-105 blisters under the fuselage */
    var BL = [[12.4, 0.03, 0.03, 0, 1], [13.0, 0.13, 0.14, 0, 1], [14.6, 0.17, 0.17, 0, 1], [16.4, 0.15, 0.15, 0, 1], [16.9, 0.04, 0.04, 0, 1]];
    for (sgn = -1; sgn <= 1; sgn += 2) K.store.push(body(M, BL, 16, 0, sgn * 0.52, -0.84));

    /* --- stores: 650 gal centreline tank, 450 gal tank and AGM-78 on the
       inboard pylons, a Shrike on each outboard pylon */
    function tank(sA, sB, r, y, z) {
      var len = sB - sA;
      var rows = [[sA, 0.03, 0.03, 0, 1], [sA + len * 0.07, r * 0.62, r * 0.62, 0, 1], [sA + len * 0.2, r * 0.97, r * 0.97, 0, 1],
                  [sA + len * 0.62, r, r, 0, 1], [sA + len * 0.9, r * 0.7, r * 0.7, 0, 1], [sB, 0.03, 0.03, 0, 1]];
      return body(M, rows, 24, 14, y, z);
    }
    K.store.push(tank(8.80, 14.40, 0.40, 0, -1.45));            /* 650 gal centreline */
    K.metal.push(prism([[[S(11.0), -0.10, -0.85], [S(14.0), -0.10, -0.85], [S(14.0), 0.10, -0.85], [S(11.0), 0.10, -0.85]],
                        [[S(11.4), -0.08, -1.18], [S(13.4), -0.08, -1.18], [S(13.4), 0.08, -1.18], [S(11.4), 0.08, -1.18]]], false));
    /* inboard pylons */
    function pylon(y, sA, sB, zTop, zBot) {
      return prism([[[S(sA), y - 0.07, zTop], [S(sB), y - 0.07, zTop], [S(sB), y + 0.07, zTop], [S(sA), y + 0.07, zTop]],
                    [[S(sA + 0.3), y - 0.06, zBot], [S(sB - 0.4), y - 0.06, zBot], [S(sB - 0.4), y + 0.06, zBot], [S(sA + 0.3), y + 0.06, zBot]]], false);
    }
    K.metal.push(pylon(2.65, 12.5, 14.7, -0.33, -1.45));
    K.metal.push(pylon(-2.65, 12.5, 14.7, -0.33, -1.45));
    K.metal.push(pylon(3.90, 13.3, 15.0, -0.46, -1.02));
    K.metal.push(pylon(-3.90, 13.3, 15.0, -0.46, -1.02));
    K.store.push(tank(11.30, 15.30, 0.33, 2.65, -1.70));         /* 450 gal, port */
    /* AGM-78 Standard ARM, starboard inboard: 4.57 m, 0.34 m diameter */
    var STD = [[11.0, 0.03, 0.03, 0, 1], [11.5, 0.12, 0.12, 0, 1], [12.4, 0.17, 0.17, 0, 1], [14.6, 0.17, 0.17, 0, 1], [15.57, 0.15, 0.15, 0, 1]];
    K.store.push(body(M, STD, 18, 0, -2.65, -1.62));
    K.metal.push(box(0.8, 1.09, 0.02, S(14.9), -2.65, -1.62));   /* cruciform fins */
    K.metal.push(box(0.8, 0.02, 1.09, S(14.9), -2.65, -1.62));
    K.metal.push(box(0.9, 0.62, 0.02, S(13.0), -2.65, -1.62));
    K.metal.push(box(0.9, 0.02, 0.62, S(13.0), -2.65, -1.62));
    K.dark.push(box(0.5, 0.02, 0.34, S(11.9), -2.65, -1.62));
    /* AGM-45 Shrike, 3.05 m, 0.2 m diameter, one per outboard pylon */
    var SHR = [[12.9, 0.03, 0.03, 0, 1], [13.3, 0.07, 0.07, 0, 1], [13.9, 0.10, 0.10, 0, 1], [15.4, 0.10, 0.10, 0, 1], [15.95, 0.08, 0.08, 0, 1]];
    for (sgn = -1; sgn <= 1; sgn += 2) {
      K.store.push(body(M, SHR, 16, 0, sgn * 3.90, -1.14));
      K.metal.push(box(0.55, 0.9, 0.02, S(14.0), sgn * 3.90, -1.14));      /* mid-body wings */
      K.metal.push(box(0.45, 0.02, 0.9, S(14.0), sgn * 3.90, -1.14));
      K.metal.push(box(0.4, 0.5, 0.02, S(15.7), sgn * 3.90, -1.14));       /* tail fins */
      K.metal.push(box(0.4, 0.02, 0.5, S(15.7), sgn * 3.90, -1.14));
    }

    /* --- landing gear: nose leg, two mains; lowest opaque part of the model */
    var nx = S(7.6), mx = S(13.7), tr = 1.70;
    G.metal.push(rod([nx, 0, -0.85], [nx, 0, GROUND + 0.34], 0.07, 8));
    G.dark.push(wheel(0.33, 0.20, nx, 0.14, GROUND + 0.33, 20));
    G.dark.push(wheel(0.33, 0.20, nx, -0.14, GROUND + 0.33, 20));
    G.metal.push(box(0.45, 0.60, 0.04, nx, 0, -0.93));
    for (sgn = -1; sgn <= 1; sgn += 2) {
      G.metal.push(rod([mx, sgn * 0.85, -0.75], [mx - 0.05, sgn * tr, GROUND + 0.50], 0.09, 8));
      G.metal.push(rod([mx - 0.9, sgn * 0.7, -0.78], [mx - 0.05, sgn * (tr - 0.05), GROUND + 0.9], 0.045, 6));
      G.dark.push(wheel(0.50, 0.36, mx - 0.05, sgn * (tr + 0.12), GROUND + 0.50, 24));
      G.metal.push(wheel(0.28, 0.38, mx - 0.05, sgn * (tr + 0.12), GROUND + 0.50, 14));
      G.metal.push(box(1.5, 0.04, 0.64, mx - 0.05, sgn * (tr + 0.36), -0.35));  /* door */
    }

    var mats = makeMats(C);
    var root = new V.Group();
    ["skin", "dark", "metal", "store", "glass", "team"].forEach(function (key) {
      if (K[key].length) root.add(new V.Mesh(merge(K[key]), mats[key]));
    });
    var gear = new V.Group();
    gear.name = "gear";
    ["metal", "dark"].forEach(function (key) {
      if (G[key].length) gear.add(new V.Mesh(merge(G[key]), mats[key]));
    });
    root.add(gear);
    return root;
  }

  UNIT_MODELS["nato_e60_sead"] = { len: L, build: build };
})();
