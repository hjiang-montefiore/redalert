/* ============ air3d_era.js — parametric fixed-wing airframes ============
   Every aircraft in the game used to borrow a modern fighter's mesh, so a
   1953 MiG-17 flew over the map wearing an F-16's planform. This builder
   draws the airframe from its real geometry instead: leading-edge sweep,
   taper, where the air goes in, how many fins stand up at the back and
   whether there is a propeller on the front.

   Model space follows models3d.js: +X nose, +Y left, +Z up. Dimensions are
   real metres; render3d.js renormalises overall length, so what survives to
   the screen is the PROPORTION — a Starfighter's stubby wing against a
   Fishbed's delta against a Warthog's straight plank.

   The spec table lives in air_specs.js and is keyed by unit id.            */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }
if (typeof AIRFRAMES === "undefined") { var AIRFRAMES = {}; }

var Airframe3D = (function () {
  "use strict";

  var D2R = Math.PI / 180;

  /* ---------------------------------------------------------------- paint */
  var PAINT = {
    silver:   { c: 0xc0c5c9, r: 0.42, m: 0.52 },   /* bare polished alloy, 1950s */
    olive:    { c: 0x4a5236, r: 0.85, m: 0.06 },
    green:    { c: 0x3f5233, r: 0.84, m: 0.06 },   /* SE Asia camouflage */
    seagrey:  { c: 0x99a2a7, r: 0.70, m: 0.14 },   /* light gull grey */
    twotone:  { c: 0x768086, r: 0.72, m: 0.12 },   /* modern US grey-on-grey */
    darkgrey: { c: 0x4f575d, r: 0.74, m: 0.13 },
    bluegrey: { c: 0x7b8b9b, r: 0.76, m: 0.11 },   /* Soviet blue-grey */
    desert:   { c: 0xb3a281, r: 0.86, m: 0.06 },
    white:    { c: 0xd9dcdd, r: 0.62, m: 0.10 },   /* large radar aircraft */
    black:    { c: 0x26282b, r: 0.55, m: 0.24 },
  };

  function mat(THREE, c, r, m) {
    return new THREE.MeshStandardMaterial({
      color: c, roughness: r === undefined ? 0.72 : r,
      metalness: m === undefined ? 0.15 : m, side: THREE.DoubleSide });
  }

  /* ------------------------------------------------------------ paintwork */
  /* A real airframe is not a flat colour. It is a mosaic of panels with
     seams between them, rivet lines along the frames, walkway markings on
     the wing root, soot behind the exhaust and streaks under every vent.
     Painting that once per scheme and reusing it costs one texture and does
     more for the look than any amount of extra geometry. */
  var texCache = {};

  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function hex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }

  function skinCanvas(camo, seed) {
    var W = 1024, H = 512;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var p = PAINT[camo] || PAINT.twotone;
    var R = rngFor(seed);

    g.fillStyle = hex(p.c); g.fillRect(0, 0, W, H);

    /* the disruptive schemes get their second and third tones as soft blobs */
    var SCHEME = {
      green:    ["#2f3d28", "#6a5b35"],           /* south-east asia three-tone */
      twotone:  ["#5f6a72", "#8b959b"],           /* modern grey on grey */
      darkgrey: ["#3f464b", "#616a70"],
      bluegrey: ["#6a7d8e", "#93a4b2"],
      desert:   ["#9d8c68", "#c2b18b"],
      olive:    ["#3b4230", "#5b6344"],
      seagrey:  ["#8b949a", "#aab3b8"],
    };
    var tones = SCHEME[camo];
    if (tones) {
      for (var b = 0; b < 26; b++) {
        g.globalAlpha = 0.5;
        g.fillStyle = tones[b % tones.length];
        g.beginPath();
        g.ellipse(R() * W, R() * H, 55 + R() * 130, 28 + R() * 70, R() * 3.14, 0, 6.29);
        g.fill();
      }
      g.globalAlpha = 1;
    }

    /* bare metal is a patchwork of slightly different alloy panels */
    if (camo === "silver") {
      for (var m = 0; m < 90; m++) {
        g.globalAlpha = 0.05 + R() * 0.08;
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#7c828a";
        g.fillRect(R() * W, R() * H, 30 + R() * 110, 20 + R() * 70);
      }
      g.globalAlpha = 1;
    }

    /* panel seams: a few long ones across the airframe and many short ones */
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.6;
    var x = 0;
    while (x < W) {
      x += 26 + R() * 70;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    var y = 0;
    while (y < H) {
      y += 34 + R() * 78;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = 1;
    for (var q = 0; q < 46; q++) {
      var qx = R() * W, qy = R() * H, ql = 40 + R() * 150;
      g.beginPath();
      if (R() < 0.5) { g.moveTo(qx, qy); g.lineTo(qx + ql, qy); }
      else { g.moveTo(qx, qy); g.lineTo(qx, qy + ql * 0.6); }
      g.stroke();
    }

    /* rivet rows following the frames */
    g.fillStyle = "rgba(0,0,0,0.22)";
    for (var rr = 0; rr < 34; rr++) {
      var ry = R() * H, rx0 = R() * W * 0.7, n = 16 + (R() * 40) | 0;
      for (var i2 = 0; i2 < n; i2++) g.fillRect(rx0 + i2 * 7, ry, 1.6, 1.6);
    }

    /* access hatches and inspection panels */
    g.strokeStyle = "rgba(0,0,0,0.35)"; g.lineWidth = 1.3;
    for (var h2 = 0; h2 < 18; h2++) {
      var hx = R() * W, hy = R() * H, hw = 14 + R() * 34, hh = 10 + R() * 22;
      g.strokeRect(hx, hy, hw, hh);
      g.globalAlpha = 0.10; g.fillStyle = "#000"; g.fillRect(hx, hy, hw, hh);
      g.globalAlpha = 1;
    }

    /* weathering: exhaust soot to the rear, streaks trailing aft of vents */
    var soot = g.createLinearGradient(W * 0.62, 0, W, 0);
    soot.addColorStop(0, "rgba(20,18,16,0)");
    soot.addColorStop(1, "rgba(20,18,16,0.34)");
    g.fillStyle = soot; g.fillRect(W * 0.62, 0, W * 0.38, H);
    g.fillStyle = "rgba(24,22,20,0.13)";
    for (var st = 0; st < 40; st++) {
      var sx = R() * W, sy = R() * H;
      g.fillRect(sx, sy, 2 + R() * 4, 24 + R() * 90);
    }

    /* walkway lines along the wing root, and a warning stripe */
    g.strokeStyle = "rgba(20,20,20,0.45)"; g.lineWidth = 3;
    g.setLineDash([9, 7]);
    g.beginPath(); g.moveTo(W * 0.10, H * 0.50); g.lineTo(W * 0.62, H * 0.50); g.stroke();
    g.setLineDash([]);
    g.fillStyle = "rgba(190,40,30,0.55)";
    g.fillRect(W * 0.30, H * 0.44, 46, 4);

    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }

  function texFor(camo) {
    var key = camo || "twotone";
    if (texCache[key] === undefined) {
      try { texCache[key] = skinCanvas(key, key.length * 7919 + 13); }
      catch (e) { texCache[key] = null; }
    }
    return texCache[key];
  }

  /* the lofted body: its UVs already run 0..1 along and around, so the sheet
     wraps the fuselage exactly once */
  function skinOf(THREE, P) {
    var p = PAINT[P.camo] || PAINT.twotone;
    var m = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: p.r, metalness: p.m, side: THREE.DoubleSide });
    var t = texFor(P.camo);
    if (t) m.map = t; else m.color.setHex(p.c);
    return m;
  }

  /* An extruded surface carries UVs in model METRES, so with the sheet left
     at one repeat a seventeen-metre wing would tile the panel lines
     seventeen times and read as corduroy. Scale it to cover the wing once. */
  function skinPanel(THREE, P, L) {
    var p = PAINT[P.camo] || PAINT.twotone;
    var m = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: p.r, metalness: p.m, side: THREE.DoubleSide });
    var t = texFor(P.camo);
    if (!t) { m.color.setHex(p.c); return m; }
    var c = t.clone();
    c.needsUpdate = true;
    c.wrapS = c.wrapT = THREE.RepeatWrapping;
    var k = 1 / Math.max(2, L * 0.9);
    c.repeat.set(k, k);
    c.offset.set(0.34, 0.30);
    m.map = c;
    return m;
  }
  /* the underside of an aircraft is nearly always lighter than the top */
  function bellyOf(THREE, P) {
    var p = PAINT[P.camo] || PAINT.twotone;
    var c = new THREE.Color(p.c);
    c.lerp(new THREE.Color(0xffffff), P.camo === "silver" ? 0.05 : 0.20);
    return mat(THREE, c.getHex(), p.r, p.m);
  }

  /* ------------------------------------------------------------- fuselage */
  /* Station tables as fractions of overall length: x along the body, w half
     width, h half height, zc centreline offset. The nose is +X. */
  var BODY = {
    slim: [
      [ 0.500, 0.004, 0.004,  0.010],
      [ 0.440, 0.026, 0.026,  0.008],
      [ 0.340, 0.046, 0.048,  0.004],
      [ 0.180, 0.057, 0.060,  0.000],
      [ 0.000, 0.060, 0.062,  0.000],
      [-0.200, 0.056, 0.058,  0.000],
      [-0.380, 0.048, 0.050,  0.004],
      [-0.500, 0.042, 0.044,  0.008],
    ],
    /* the area-ruled waist of a 1950s supersonic design */
    area: [
      [ 0.500, 0.004, 0.004,  0.010],
      [ 0.430, 0.030, 0.030,  0.008],
      [ 0.320, 0.056, 0.056,  0.004],
      [ 0.170, 0.062, 0.064,  0.000],
      [ 0.040, 0.048, 0.052,  0.000],
      [-0.090, 0.046, 0.050,  0.000],
      [-0.250, 0.058, 0.058,  0.000],
      [-0.400, 0.050, 0.052,  0.004],
      [-0.500, 0.044, 0.046,  0.008],
    ],
    /* a twin-engine fighter is a slim nose that broadens into a flat
       engine deck aft — not a pancake from end to end */
    wide: [
      [ 0.500, 0.005, 0.005,  0.010],
      [ 0.430, 0.026, 0.026,  0.008],
      [ 0.320, 0.042, 0.040,  0.004],
      [ 0.150, 0.058, 0.048,  0.000],
      [ 0.000, 0.072, 0.050,  0.000],
      [-0.180, 0.082, 0.048,  0.000],
      [-0.360, 0.080, 0.044,  0.000],
      [-0.500, 0.074, 0.040,  0.000],
    ],
    airliner: [
      [ 0.500, 0.010, 0.012,  0.004],
      [ 0.455, 0.032, 0.036,  0.002],
      [ 0.400, 0.048, 0.052,  0.000],
      [ 0.320, 0.056, 0.060,  0.000],
      [ 0.000, 0.058, 0.062,  0.000],
      [-0.280, 0.056, 0.060,  0.000],
      [-0.390, 0.046, 0.052,  0.012],
      [-0.470, 0.026, 0.032,  0.028],
      [-0.500, 0.010, 0.014,  0.036],
    ],
    heavy: [
      [ 0.500, 0.006, 0.006,  0.006],
      [ 0.440, 0.028, 0.030,  0.004],
      [ 0.360, 0.044, 0.048,  0.002],
      [ 0.200, 0.052, 0.056,  0.000],
      [ 0.000, 0.054, 0.058,  0.000],
      [-0.220, 0.052, 0.055,  0.000],
      [-0.400, 0.040, 0.044,  0.006],
      [-0.500, 0.020, 0.024,  0.014],
    ],
  };

  function buildBody(THREE, M, P, L, skin) {
    var tbl = BODY[P.fuselage] || BODY.slim;
    var i;
    /* An aircraft whose nose IS the air intake does not taper to a point: it
       opens into a lip. Reshaping the front of the body is what makes a
       Sabre or a Fresco read correctly, instead of a pointed fuselage with a
       fatter ring bolted onto the end of it. */
    if (P.intake === "nose") {
      tbl = tbl.map(function (r) { return r.slice(); });
      var lip = tbl[3] ? tbl[3][1] * 0.86 : 0.048;
      tbl[0][1] = lip;        tbl[0][2] = lip;        tbl[0][3] = 0;
      tbl[1][1] = lip * 1.02; tbl[1][2] = lip * 1.02; tbl[1][3] = 0;
      if (tbl[2]) { tbl[2][1] = Math.max(tbl[2][1], lip * 1.02);
                    tbl[2][2] = Math.max(tbl[2][2], lip * 1.02); }
    }
    var secs = [];
    for (i = 0; i < tbl.length; i++) {
      secs.push({ x: tbl[i][0] * L, w: tbl[i][1] * L, h: tbl[i][2] * L,
                  zc: tbl[i][3] * L, sq: P.stealth > 0.55 ? 1.9 : 1.15 });
    }
    /* loft wants stations in increasing x */
    secs.reverse();
    return new THREE.Mesh(M.loft(THREE, secs, P.stealth > 0.55 ? 8 : 22), skin);
  }

  /* ------------------------------------------------------------ lifting surfaces */
  /* Root chord as a fraction of overall length. A delta's root chord runs
     most of the body; a straight wing's is short. */
  var ROOTC = { delta: 0.46, cropdelta: 0.38, trap: 0.34, swept: 0.26,
                straight: 0.22, swing: 0.30, fwing: 0.90, faceted: 0.62,
                biplane: 0.24 };
  var XLE   = { delta: 0.13, cropdelta: 0.09, trap: 0.07, swept: 0.06,
                straight: 0.07, swing: 0.05, fwing: 0.40, faceted: 0.24,
                biplane: 0.16 };

  function wingOutline(P, L, semi) {
    var pf = P.planform;
    var rootC = (ROOTC[pf] || 0.28) * L;
    /* ROOTC.swept is tuned for airliners (E-3, A-50, Y-8). A swept-wing
       FIGHTER — Eagle, Flanker, Fencer — carries a much longer root chord
       that grows aft, which is most of its wing area. */
    if (pf === "swept" && P.fuselage !== "airliner" && P.fuselage !== "heavy")
      rootC = 0.40 * L;
    var xLE = (XLE[pf] || 0.06) * L;
    var tipC = rootC * Math.max(0.05, Math.min(1, P.taper));
    var sw = Math.tan((P.sweep || 0) * D2R);
    var xTip = xLE - semi * sw;

    if (pf === "trap") {
      /* A fourth-generation wing carries a leading-edge root extension; a
         low-observable one does not — the F-22, F-35 and J-35 blend into a
         chine instead, and the LERX spike was running up their radomes. */
      if ((P.stealth || 0) >= 0.5) {
        var rcS = 0.36 * L, tcS = rcS * Math.max(0.05, Math.min(1, P.taper));
        return [[xLE, 0], [xTip, semi], [xTip - tcS, semi], [xLE - rcS, 0]];
      }
      return [
        [xLE + L * 0.17, 0],
        [xLE + L * 0.02, semi * 0.26],
        [xTip, semi],
        [xTip - tipC, semi],
        [xLE - rootC, 0],
      ];
    }
    if (pf === "delta") {
      /* pointed tip, long root: the Fishbed and the Mirage */
      return [
        [xLE, 0],
        [xTip, semi],
        [xTip - tipC, semi],
        [xLE - rootC, 0],
      ];
    }
    if (pf === "cropdelta") {
      return [
        [xLE, 0],
        [xTip, semi],
        [xTip - tipC, semi],
        [xLE - rootC, 0],
      ];
    }
    if (pf === "swing") {
      /* drawn at the swept-forward position: a glove at the root, then the
         movable panel, so the pivot is legible from above */
      var gl = semi * 0.30;
      return [
        [xLE + L * 0.05, 0],
        [xLE, gl],
        [xTip, semi],
        [xTip - tipC, semi],
        [xLE - rootC * 0.82, gl],
        [xLE - rootC, 0],
      ];
    }
    return [
      [xLE, 0],
      [xTip, semi],
      [xTip - tipC, semi],
      [xLE - rootC, 0],
    ];
  }

  /* leading- and trailing-edge x at a given span station, by walking the
     outline out along the leading edge and back along the trailing edge */
  function chordAt(pts, y) {
    if (!pts || pts.length < 3) return null;
    var iTip = 0, i;
    for (i = 0; i < pts.length; i++) if (pts[i][1] >= pts[iTip][1]) iTip = i;
    if (y > pts[iTip][1]) return null;
    function walk(a, b) {
      for (var k = a; k !== b; k += (b > a ? 1 : -1)) {
        var p0 = pts[k], p1 = pts[k + (b > a ? 1 : -1)];
        var lo = Math.min(p0[1], p1[1]), hi = Math.max(p0[1], p1[1]);
        if (y >= lo && y <= hi) {
          var t = (hi - lo) < 1e-6 ? 0 : (y - p0[1]) / (p1[1] - p0[1]);
          return p0[0] + (p1[0] - p0[0]) * t;
        }
      }
      return null;
    }
    var le = walk(0, iTip);
    var te = walk(pts.length - 1, iTip);
    return (le === null || te === null) ? null : [le, te];
  }

  function ZPOS(P, L) {
    var h = (BODY[P.fuselage] || BODY.slim)[4][2] * L;
    switch (P.wingpos) {
      case "high":     return  h * 0.85;
      case "shoulder": return  h * 0.45;
      case "mid":      return  0;
      default:         return -h * 0.55;
    }
  }

  /* a lifting surface, mirrored to both sides, with dihedral */
  function addPanels(THREE, M, g, pts, thick, z, dihedral, skin) {
    for (var s = -1; s <= 1; s += 2) {
      var q = [], i;
      for (i = 0; i < pts.length; i++) q.push([pts[i][0], pts[i][1] * s]);
      var mesh = new THREE.Mesh(M.slab(THREE, q, thick), skin);
      mesh.position.z = z - thick * 0.5;
      mesh.rotation.x = -s * (dihedral || 0) * D2R;
      g.add(mesh);
    }
  }

  /* ------------------------------------------------------------------ tail */
  function finShape(L, h, rootC, sweep) {
    var sw = Math.tan(sweep * D2R);
    return [
      [0, 0],
      [-sw * h, h],
      [-sw * h - rootC * 0.34, h],
      [-rootC, 0],
    ];
  }

  function addTail(THREE, M, g, P, L, semi, skin) {
    var xT = -L * 0.40;
    var bodyH = (BODY[P.fuselage] || BODY.slim)[4][2] * L;
    var bodyW = (BODY[P.fuselage] || BODY.slim)[4][1] * L;
    var thick = L * 0.006;
    var finH = L * (P.fuselage === "airliner" || P.fuselage === "heavy" ? 0.20 : 0.15);
    var finC = L * 0.16;
    var finSweep = Math.max(28, (P.sweep || 30) * 0.85);

    function fin(yOff, cant, hMul) {
      /* built flat as a lifting surface, then stood on edge, so the fin has a
         real aerofoil section rather than being a card with a bevel */
      var h = finH * (hMul || 1);
      var sw = Math.tan(finSweep * D2R);
      var pts = [
        [0, 0], [-sw * h, h], [-sw * h - finC * 0.34, h], [-finC, 0],
      ];
      var m = buildWingSolid(THREE, P, L, h, pts, 0, 0, skin, 0.075);
      m.rotation.x = Math.PI / 2;               /* span becomes height */
      m.position.set(xT, yOff, bodyH * 0.5);
      if (cant) m.rotation.y = -cant * D2R;
      g.add(m);
      return m;
    }

    /* horizontal stabiliser */
    function stab(z, span, anh, xoff) {
      var sSemi = span || semi * 0.38;
      var sC = L * 0.13;
      var sw = Math.tan(Math.max(20, (P.sweep || 25)) * D2R);
      var pts = [
        [xT + L * 0.06 + (xoff || 0), 0],
        [xT + L * 0.06 - sSemi * sw + (xoff || 0), sSemi],
        [xT + L * 0.06 - sSemi * sw - sC * 0.5 + (xoff || 0), sSemi],
        [xT + L * 0.06 - sC + (xoff || 0), 0],
      ];
      /* a tailplane is a wing too, just a thin one */
      g.add(buildWingSolid(THREE, P, L, sSemi, pts, z, anh || 0, skin, 0.055));
    }

    var stabZ = 0;
    switch (P.htail) {
      case "high":     stabZ =  bodyH * 0.6; break;
      case "mid":      stabZ =  0; break;
      case "anhedral": stabZ = -bodyH * 0.15; break;
      case "slab":     stabZ = -bodyH * 0.10; break;
      default:         stabZ = -bodyH * 0.35; break;
    }

    if (P.tail === "none") return;                       /* flying wing */

    if (P.tail === "ttail") {
      var f = fin(0, 0, 1.25);
      stab(bodyH * 0.5 + finH * 1.25, semi * 0.34, 0, -L * 0.02);
    } else if (P.tail === "twin") {
      /* Photographs of an Eagle, a Fulcrum or a Flanker show the fins standing
         on the outboard edges of the engine decks, well apart. Keyed to a
         fraction of body width they sat almost touching on the spine. */
      fin( bodyW * 1.20, 0, 0.92);
      fin(-bodyW * 1.20, 0, 0.92);
    } else if (P.tail === "twincant") {
      fin( bodyW * 1.20,  26, 0.88);
      fin(-bodyW * 1.20, -26, 0.88);
    } else if (P.tail === "quad") {
      /* the Hawkeye's four fins standing on one long stabiliser */
      var qs = semi * 0.42;
      stab(bodyH * 0.35, qs, 0, 0);
      var ys = [qs * 0.30, qs * 0.92];
      for (var k = 0; k < ys.length; k++) {
        for (var s2 = -1; s2 <= 1; s2 += 2) {
          var pts2 = finShape(L, finH * 0.72, finC * 0.62, 24);
          var m2 = new THREE.Mesh(M.slab(THREE, pts2, thick, "xz"), skin);
          m2.position.set(xT + L * 0.04, s2 * ys[k], bodyH * 0.35);
          m2.rotation.x = s2 * (k === 1 ? 16 : -8) * D2R;
          g.add(m2);
        }
      }
      return;
    } else if (P.tail === "twinboom") {
      /* the Warthog: a fin on the end of each engine boom, joined by a
         stabiliser that runs between them */
      /* the booms sit outboard of the nacelles, on the wing, not against
         the fuselage sides */
      var by = semi * 0.28;
      for (var s3 = -1; s3 <= 1; s3 += 2) {
        var boom = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.022, L * 0.020, L * 0.20, 10), skin);
        boom.rotation.z = Math.PI / 2;
        boom.position.set(xT + L * 0.03, s3 * by, bodyH * 0.30);
        g.add(boom);
        var pts3 = finShape(L, finH * 0.95, finC * 0.85, 12);
        var m3 = new THREE.Mesh(M.slab(THREE, pts3, thick, "xz"), skin);
        m3.position.set(xT - L * 0.05, s3 * by, bodyH * 0.30 + L * 0.018);
        g.add(m3);
      }
      var spY = semi * 0.338;                 /* real A-10 tailplane span */
      var sp = [
        [xT + L * 0.02,  spY],
        [xT + L * 0.02, -spY],
        [xT - L * 0.09, -spY],
        [xT - L * 0.09,  spY],
      ];
      var st = new THREE.Mesh(M.slab(THREE, sp, thick), skin);
      st.position.z = bodyH * 0.30;
      g.add(st);
      return;
    } else {
      fin(0, 0, 1);
    }

    if (P.htail !== "none") stab(stabZ, semi * 0.38, P.htail === "anhedral" ? -18 : 0);
  }

  /* ------------------------------------------------------------- propulsion */
  function propDisc(THREE, g, x, y, z, r, hub) {
    var disc = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, r * 0.035, 20),
      new THREE.MeshStandardMaterial({ color: 0x1a1c1e, roughness: 0.5, metalness: 0.3,
                                       transparent: true, opacity: 0.30, side: THREE.DoubleSide }));
    disc.rotation.z = Math.PI / 2;
    disc.position.set(x, y, z);
    g.add(disc);
    /* four blades so the disc still reads as a propeller when it is still */
    for (var b = 0; b < 4; b++) {
      var bl = new THREE.Mesh(new THREE.BoxGeometry(r * 0.06, r * 0.10, r * 1.9), hub);
      bl.position.set(x, y, z);
      bl.rotation.x = b * Math.PI / 4;
      g.add(bl);
    }
    var sp = new THREE.Mesh(new THREE.ConeGeometry(r * 0.16, r * 0.42, 12), hub);
    sp.rotation.z = -Math.PI / 2;
    sp.position.set(x + r * 0.20, y, z);
    g.add(sp);
  }

  function addPropulsion(THREE, M, g, P, L, semi, skin) {
    var bodyH = (BODY[P.fuselage] || BODY.slim)[4][2] * L;
    var bodyW = (BODY[P.fuselage] || BODY.slim)[4][1] * L;
    var dark = mat(THREE, 0x1c1f22, 0.55, 0.45);
    var hot  = mat(THREE, 0x3a3d40, 0.42, 0.70);
    var n, i, y;

    if (P.prop === "piston" || P.prop === "turboprop") {
      if (P.engMount === "nose" || P.engines === 1) {
        propDisc(THREE, g, L * 0.50, 0, bodyH * 0.10, L * 0.16, dark);
        return;
      }
      /* wing-mounted turboprops, evenly spread outboard of the root */
      n = Math.max(2, P.engines);
      for (i = 0; i < n / 2; i++) {
        y = semi * (0.30 + i * 0.28);
        for (var s = -1; s <= 1; s += 2) {
          var nac = new THREE.Mesh(
            new THREE.CylinderGeometry(L * 0.026, L * 0.022, L * 0.15, 12), skin);
          nac.rotation.z = Math.PI / 2;
          nac.position.set(L * 0.10, s * y, ZPOS(P, L) - L * 0.012);
          g.add(nac);
          propDisc(THREE, g, L * 0.185, s * y, ZPOS(P, L) - L * 0.012, L * 0.115, dark);
        }
      }
      return;
    }

    /* jets */
    if (P.engMount === "pod") {
      n = Math.max(2, P.engines);
      for (i = 0; i < n / 2; i++) {
        y = semi * (0.32 + i * 0.30);
        for (var s2 = -1; s2 <= 1; s2 += 2) {
          var pod = new THREE.Mesh(
            new THREE.CylinderGeometry(L * 0.036, L * 0.032, L * 0.155, 14), skin);
          pod.rotation.z = Math.PI / 2;
          pod.position.set(L * 0.06, s2 * y, ZPOS(P, L) - L * 0.055);
          g.add(pod);
          var lip = new THREE.Mesh(
            new THREE.CylinderGeometry(L * 0.036, L * 0.036, L * 0.012, 14), dark);
          lip.rotation.z = Math.PI / 2;
          lip.position.set(L * 0.138, s2 * y, ZPOS(P, L) - L * 0.055);
          g.add(lip);
          var pyl = new THREE.Mesh(
            new THREE.BoxGeometry(L * 0.10, L * 0.008, L * 0.055), skin);
          pyl.position.set(L * 0.05, s2 * y, ZPOS(P, L) - L * 0.026);
          g.add(pyl);
        }
      }
      return;
    }

    if (P.engMount === "rearpod") {
      /* the Warthog's nacelles sitting high on the rear fuselage */
      for (var s3 = -1; s3 <= 1; s3 += 2) {
        var rp = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.048, L * 0.044, L * 0.22, 14), skin);
        rp.rotation.z = Math.PI / 2;
        rp.position.set(-L * 0.16, s3 * bodyW * 1.05, bodyH * 0.75);
        g.add(rp);
        var rl = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.048, L * 0.048, L * 0.012, 14), dark);
        rl.rotation.z = Math.PI / 2;
        rl.position.set(-L * 0.052, s3 * bodyW * 1.05, bodyH * 0.75);
        g.add(rl);
      }
      return;
    }

    /* buried in the fuselage or in the wing roots: what shows is the nozzle */
    n = Math.max(1, Math.min(4, P.engines || 1));
    var offs = n === 1 ? [0] : (n === 2 ? [-1, 1] : [-1.6, -0.55, 0.55, 1.6]);
    /* wing-root engines sit outboard of the body, as on the Frogfoot */
    var spread = P.engMount === "wing" ? 1.15 : (n === 2 ? 0.45 : 0.30);
    for (i = 0; i < offs.length; i++) {
      var yo = offs[i] * bodyW * spread;
      var noz = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.030, L * 0.034, L * 0.075, 16), hot);
      noz.rotation.z = Math.PI / 2;
      noz.position.set(-L * 0.505, yo, 0);
      g.add(noz);
      nozzlePetals(THREE, g, L, -L * 0.532, yo, L * 0.034, hot, dark);
    }
  }

  /* ---------------------------------------------------------------- intakes */
  function addIntakes(THREE, M, g, P, L, semi, skin) {
    var bodyH = (BODY[P.fuselage] || BODY.slim)[4][2] * L;
    var bodyW = (BODY[P.fuselage] || BODY.slim)[4][1] * L;
    var dark = mat(THREE, 0x141618, 0.6, 0.2);
    var s;
    /* a podded or wing-buried engine already shows its own inlet; drawing a
       separate duct there would hang a second nacelle off the same wing */
    if ((P.engMount === "pod" || P.engMount === "rearpod" || P.engMount === "wing") &&
        (P.intake === "underwing" || P.intake === "wingroot")) return;
    if (P.prop !== "none") return;

    if (P.intake === "nose") {
      /* the body already opens into a lip; all that is wanted here is the
         dark throat inside it, and a shock cone if the design is supersonic */
      var lipR = (BODY[P.fuselage] || BODY.slim)[3][1] * L * 0.86;
      var hole = new THREE.Mesh(
        new THREE.CylinderGeometry(lipR * 0.80, lipR * 0.72, L * 0.05, 20), dark);
      hole.rotation.z = Math.PI / 2;
      hole.position.set(L * 0.487, 0, 0);
      g.add(hole);
      if (P.sweep > 50 || P.planform === "delta") {
        var cone = new THREE.Mesh(new THREE.ConeGeometry(lipR * 0.54, L * 0.10, 16), skin);
        cone.rotation.z = -Math.PI / 2;
        cone.position.set(L * 0.487, 0, 0);
        g.add(cone);
      }
      return;
    }
    if (P.intake === "cheek") {
      /* a duct that grows out of the fuselage side and fairs back into it,
         with a splitter plate standing off the skin at the lip */
      for (s = -1; s <= 1; s += 2) {
        var yo = s * (bodyW + L * 0.014);
        var duct = new THREE.Mesh(M.loft(THREE, [
          { x: -L * 0.10, w: L * 0.016, h: L * 0.020, zc: -L * 0.004 },
          { x:  L * 0.05, w: L * 0.028, h: L * 0.038, zc: -L * 0.004 },
          { x:  L * 0.20, w: L * 0.030, h: L * 0.042, zc: -L * 0.004 },
          { x:  L * 0.29, w: L * 0.027, h: L * 0.038, zc: -L * 0.004 },
        ], 14), skin);
        duct.position.set(0, yo, 0);
        g.add(duct);
        var lip = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.026, L * 0.026, L * 0.012, 14), dark);
        lip.rotation.z = Math.PI / 2;
        lip.position.set(L * 0.296, yo, -L * 0.004);
        g.add(lip);
        /* the boundary-layer splitter, a plate between duct and fuselage */
        var sp = new THREE.Mesh(new THREE.BoxGeometry(L * 0.20, L * 0.005, L * 0.048), skin);
        sp.position.set(L * 0.19, s * (bodyW - L * 0.004), -L * 0.004);
        g.add(sp);
      }
      return;
    }
    if (P.intake === "chin") {
      var duct2 = new THREE.Mesh(M.loft(THREE, [
        { x: -L * 0.02, w: L * 0.030, h: L * 0.020, zc: -bodyH * 0.72 },
        { x:  L * 0.12, w: L * 0.044, h: L * 0.030, zc: -bodyH * 0.80 },
        { x:  L * 0.24, w: L * 0.046, h: L * 0.031, zc: -bodyH * 0.82 },
        { x:  L * 0.31, w: L * 0.042, h: L * 0.028, zc: -bodyH * 0.82 },
      ], 16), skin);
      g.add(duct2);
      var mouth = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.030, L * 0.030, L * 0.012, 16), dark);
      mouth.rotation.z = Math.PI / 2;
      mouth.scale.set(1, 1, 1.35);
      mouth.position.set(L * 0.316, 0, -bodyH * 0.82);
      g.add(mouth);
      return;
    }
    if (P.intake === "dsi") {
      /* diverterless: a compression bump faired into the side of the body,
         with no splitter plate standing off it */
      for (s = -1; s <= 1; s += 2) {
        var bump = new THREE.Mesh(new THREE.SphereGeometry(L * 0.030, 12, 9), skin);
        bump.scale.set(2.9, 0.75, 1.25);
        bump.position.set(L * 0.185, s * bodyW * 0.86, -bodyH * 0.30);
        g.add(bump);
        var dm = new THREE.Mesh(new THREE.CylinderGeometry(L * 0.026, L * 0.026, L * 0.012, 10), dark);
        dm.rotation.z = Math.PI / 2;
        dm.position.set(L * 0.255, s * bodyW * 0.86, -bodyH * 0.30);
        g.add(dm);
      }
      return;
    }
    if (P.intake === "wingroot") {
      for (s = -1; s <= 1; s += 2) {
        var wr = new THREE.Mesh(new THREE.BoxGeometry(L * 0.11, L * 0.050, L * 0.045), dark);
        wr.position.set(L * 0.04, s * (bodyW + L * 0.018), ZPOS(P, L) + L * 0.010);
        g.add(wr);
      }
      return;
    }
    if (P.intake === "underwing") {
      for (s = -1; s <= 1; s += 2) {
        var uw = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.034, L * 0.030, L * 0.16, 12), skin);
        uw.rotation.z = Math.PI / 2;
        uw.position.set(L * 0.02, s * semi * 0.26, ZPOS(P, L) - L * 0.045);
        g.add(uw);
        var um = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.030, L * 0.030, L * 0.012, 12), dark);
        um.rotation.z = Math.PI / 2;
        um.position.set(L * 0.098, s * semi * 0.26, ZPOS(P, L) - L * 0.045);
        g.add(um);
      }
      return;
    }
    if (P.intake === "dorsal") {
      var dv = new THREE.Mesh(new THREE.BoxGeometry(L * 0.17, L * 0.070, L * 0.048), skin);
      dv.position.set(L * 0.06, 0, bodyH * 0.92);
      g.add(dv);
      var dvm = new THREE.Mesh(new THREE.BoxGeometry(L * 0.010, L * 0.064, L * 0.044), dark);
      dvm.position.set(L * 0.14, 0, bodyH * 0.92);
      g.add(dvm);
    }
  }

  /* ------------------------------------------------------------ furniture */
  function addCanopy(THREE, M, g, P, L, C) {
    var bodyH = (BODY[P.fuselage] || BODY.slim)[4][2] * L;
    var glass = new THREE.MeshPhysicalMaterial({
      color: 0x1d3038, metalness: 0.4, roughness: 0.12, clearcoat: 1,
      transparent: true, opacity: 0.86 });
    var big = P.fuselage === "airliner" || P.fuselage === "heavy";
    if (big) {
      /* a flight-deck window band rather than a bubble */
      var band = new THREE.Mesh(new THREE.BoxGeometry(L * 0.045, L * 0.075, L * 0.022), glass);
      band.position.set(L * 0.395, 0, bodyH * 0.62);
      g.add(band);
      return;
    }
    var cx = P.fuselage === "wide" ? L * 0.25 : L * 0.28;
    /* Real canopies are gold-film coated against radar and glare, which is
       why they read warm rather than black. Built as a lofted teardrop so it
       has a windscreen, a bubble and a spine fairing behind it. */
    var tint = new THREE.MeshPhysicalMaterial({
      color: 0x2a3b3a, metalness: 0.85, roughness: 0.09, clearcoat: 1,
      transparent: true, opacity: 0.80, side: THREE.DoubleSide });
    var cw = L * 0.040, chh = L * 0.036;
    var secs = [
      { x: cx + L * 0.100, w: cw * 0.16, h: chh * 0.20, zc: bodyH * 0.62 },
      { x: cx + L * 0.062, w: cw * 0.62, h: chh * 0.70, zc: bodyH * 0.70 },
      { x: cx + L * 0.014, w: cw * 1.00, h: chh * 1.00, zc: bodyH * 0.76 },
      { x: cx - L * 0.046, w: cw * 0.96, h: chh * 0.94, zc: bodyH * 0.76 },
      { x: cx - L * 0.098, w: cw * 0.60, h: chh * 0.52, zc: bodyH * 0.70 },
      { x: cx - L * 0.140, w: cw * 0.22, h: chh * 0.18, zc: bodyH * 0.62 },
    ];
    g.add(new THREE.Mesh(M.loft(THREE, secs, 16), tint));
  }

  function addRotodome(THREE, g, P, L, skin) {
    var bodyH = (BODY[P.fuselage] || BODY.slim)[4][2] * L;
    var fixed = !!P.fixedRadome;

    if (fixed) {
      /* Measured off photographs: the KJ-500's radome is about 7 m across on
         a 36 m airframe — roughly a fifth of the length, not a third — and it
         is a LENS, far wider than it is deep. An earlier attempt scaled two
         hemispheres and then rotated one of them, which flattens the wrong
         axis and produced a sphere. One oblate spheroid is both simpler and
         right. What marks it out as a fixed array is that it rides on a single
         broad blade pylon and never turns. */
      var rr = L * 0.102;
      var lens = new THREE.Mesh(new THREE.SphereGeometry(rr, 26, 14),
                                mat(THREE, 0xb4bbc0, 0.66, 0.10));
      lens.scale.set(1, 1, 0.30);
      lens.position.set(-L * 0.03, 0, bodyH + L * 0.098);
      g.add(lens);
      /* the darker seam around the equator of the fairing */
      var band = new THREE.Mesh(
        new THREE.CylinderGeometry(rr * 1.005, rr * 1.005, L * 0.005, 26),
        mat(THREE, 0x53595e, 0.7, 0.2));
      /* a cylinder's axis is +Y by default, so without this the "equator"
         stood up across the aircraft as a great vertical disc — which is what
         made the radome read as a ball in a side view. */
      band.rotation.x = Math.PI / 2;
      band.position.set(-L * 0.03, 0, bodyH + L * 0.098);
      g.add(band);
      /* one broad blade pylon, faired fore and aft */
      var pylon = new THREE.Mesh(new THREE.BoxGeometry(L * 0.095, L * 0.024, L * 0.075), skin);
      pylon.position.set(-L * 0.03, 0, bodyH + L * 0.042);
      g.add(pylon);
      return;
    }

    var dome = new THREE.Mesh(
      new THREE.CylinderGeometry(L * 0.175, L * 0.175, L * 0.030, 24),
      mat(THREE, 0xc9ccce, 0.66, 0.10));
    dome.position.set(-L * 0.05, 0, bodyH + L * 0.085);
    g.add(dome);
    var stripe = new THREE.Mesh(
      new THREE.CylinderGeometry(L * 0.177, L * 0.177, L * 0.008, 24),
      mat(THREE, 0x3a4045, 0.7, 0.2));
    stripe.position.set(-L * 0.05, 0, bodyH + L * 0.085);
    g.add(stripe);
    for (var s = -1; s <= 1; s += 2) {
      var py = new THREE.Mesh(new THREE.BoxGeometry(L * 0.050, L * 0.012, L * 0.075), skin);
      py.position.set(-L * 0.05, s * L * 0.030, bodyH + L * 0.040);
      g.add(py);
    }
  }

  function addCanoe(THREE, g, P, L, skin) {
    /* the side-looking radar canoe that identifies a JSTARS from below */
    var canoe = new THREE.Mesh(
      new THREE.CylinderGeometry(L * 0.030, L * 0.030, L * 0.26, 12),
      mat(THREE, 0x2f3437, 0.72, 0.14));
    canoe.rotation.z = Math.PI / 2;
    canoe.position.set(L * 0.18, 0, -(BODY[P.fuselage] || BODY.slim)[4][2] * L - L * 0.022);
    g.add(canoe);
  }

  function addCanards(THREE, M, g, P, L, semi, skin) {
    /* A tailless delta canard — J-20, J-10 — carries a big foreplane doing
       real work; a Flanker derivative's is a small destabiliser. One fixed
       fraction made the Mighty Dragon's canards look like fins. */
    var cs = semi * (P.htail === "none" ? 0.55 : 0.40);
    var csw = Math.tan(45 * D2R);
    var pts = [
      [L * 0.28, 0],
      [L * 0.28 - cs * csw, cs],
      [L * 0.28 - cs * csw - L * 0.035, cs],
      [L * 0.28 - L * 0.14, 0],
    ];
    addPanels(THREE, M, g, pts, L * 0.006,
              (BODY[P.fuselage] || BODY.slim)[4][2] * L * 0.20, 0, skin);
  }

  /* team flash so the player can still tell whose aircraft it is */
  function addTeamFlash(THREE, g, P, L, semi, C) {
    var team = mat(THREE, C.team, 0.55, 0.25);
    var bodyH = (BODY[P.fuselage] || BODY.slim)[4][2] * L;
    if (P.tail === "none" || P.planform === "fwing") {
      var pl = new THREE.Mesh(new THREE.BoxGeometry(L * 0.10, semi * 0.14, L * 0.006), team);
      pl.position.set(-L * 0.12, semi * 0.42, L * 0.012);
      g.add(pl);
      var pr = pl.clone(); pr.position.y = -semi * 0.42; g.add(pr);
      return;
    }
    /* a band across each wing. Read the local chord off the planform so the
       marking lands on the wing instead of floating beside it. */
    var yb = semi * 0.58;
    var ch = chordAt(P._outline, yb);
    if (ch) {
      var cx = (ch[0] + ch[1]) * 0.5, cw = Math.abs(ch[0] - ch[1]);
      var tcw = (THICK[P.planform] || 0.08) * cw;
      for (var s = -1; s <= 1; s += 2) {
        var band = new THREE.Mesh(
          new THREE.BoxGeometry(cw * 0.30, semi * 0.12, L * 0.004), team);
        /* sit it on the upper surface, allowing for the aerofoil thickness */
        band.position.set(cx, s * yb, ZPOS(P, L) + tcw * 0.62);
        g.add(band);
      }
    }
    var tip = new THREE.Mesh(new THREE.BoxGeometry(L * 0.045, L * 0.010, L * 0.030), team);
    tip.position.set(-L * 0.46, 0, bodyH * 0.5 + L * 0.13);
    g.add(tip);
  }

  /* ---------------------------------------------------- special planforms */
  function buildFlyingWing(THREE, M, P, C, L, semi, skin) {
    var g = new THREE.Group();
    var sw = Math.tan((P.sweep || 33) * D2R);
    /* the Spirit's sawtooth trailing edge, drawn as a W */
    var pts = [
      [ L * 0.50, 0],
      [ L * 0.50 - semi * sw, semi],
      [ L * 0.50 - semi * sw - L * 0.10, semi * 0.98],
      [-L * 0.10, semi * 0.50],
      [-L * 0.30, semi * 0.34],
      [-L * 0.12, semi * 0.16],
      [-L * 0.36, 0],
    ];
    var full = pts.slice();
    for (var i = pts.length - 2; i >= 1; i--) full.push([pts[i][0], -pts[i][1]]);
    var wing = new THREE.Mesh(M.slab(THREE, full, L * 0.030), skin);
    wing.position.z = -L * 0.015;
    g.add(wing);
    /* the centre body bulge that holds the crew and the bays */
    var bulge = new THREE.Mesh(new THREE.SphereGeometry(L * 0.16, 16, 12), skin);
    bulge.scale.set(1.9, 1.15, 0.42);
    bulge.position.set(L * 0.10, 0, L * 0.030);
    g.add(bulge);
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x1d3038, metalness: 0.4,
      roughness: 0.12, transparent: true, opacity: 0.85 });
    var cp = new THREE.Mesh(new THREE.SphereGeometry(L * 0.038, 12, 9), glass);
    cp.scale.set(1.7, 1.0, 0.55);
    cp.position.set(L * 0.30, 0, L * 0.055);
    g.add(cp);
    /* buried exhausts, shielded above the wing */
    for (var s = -1; s <= 1; s += 2) {
      var ex = new THREE.Mesh(new THREE.BoxGeometry(L * 0.11, L * 0.075, L * 0.020),
                              mat(THREE, 0x2a2d30, 0.5, 0.5));
      ex.position.set(-L * 0.02, s * L * 0.20, L * 0.042);
      g.add(ex);
    }
    addTeamFlash(THREE, g, P, L, semi, C);
    return g;
  }

  /* The Nighthawk is not a swept wing with a body on it: it is a single
     faceted solid. Built from explicit triangles with flat normals, because
     the whole point of the shape is that no surface curves. */
  function buildFaceted(THREE, M, P, C, L, semi, skin) {
    var g = new THREE.Group();

    /* chine line at mid height, the widest edge of the hull */
    var CH = [
      [ 0.500,  0.000],
      [ 0.180,  0.30],
      [-0.060,  0.72],
      [-0.250,  1.00],
      [-0.440,  0.55],
      [-0.500,  0.00],
    ];
    /* dorsal ridge and ventral keel, on the centreline */
    var TOP = [[0.500, 0.010], [0.240, 0.060], [-0.060, 0.082], [-0.400, 0.052], [-0.500, 0.026]];
    var BOT = [[0.500, 0.000], [0.240,-0.034], [-0.060,-0.048], [-0.400,-0.032], [-0.500,-0.020]];

    function ch(i, sgn) { return [CH[i][0] * L, sgn * CH[i][1] * semi, 0]; }
    function ridge(t, tbl) {
      /* centreline height interpolated at chine station t */
      var x = CH[t][0];
      for (var k = 0; k < tbl.length - 1; k++) {
        var a = tbl[k], b = tbl[k + 1];
        if (x <= a[0] && x >= b[0]) {
          var u = (a[0] - b[0]) < 1e-9 ? 0 : (a[0] - x) / (a[0] - b[0]);
          return [x * L, 0, (a[1] + (b[1] - a[1]) * u) * L];
        }
      }
      return [x * L, 0, tbl[tbl.length - 1][1] * L];
    }

    var pos = [];
    function tri(a, b, c) { pos.push(a[0],a[1],a[2], b[0],b[1],b[2], c[0],c[1],c[2]); }

    for (var s = -1; s <= 1; s += 2) {
      for (var i = 0; i < CH.length - 1; i++) {
        var c0 = ch(i, s), c1 = ch(i + 1, s);
        var t0 = ridge(i, TOP), t1 = ridge(i + 1, TOP);
        var b0 = ridge(i, BOT), b1 = ridge(i + 1, BOT);
        /* upper facet pair, wound so the outward normal faces up */
        if (s > 0) { tri(c0, c1, t1); tri(c0, t1, t0); tri(c0, b0, b1); tri(c0, b1, c1); }
        else       { tri(c1, c0, t1); tri(t1, c0, t0); tri(b0, c0, b1); tri(b1, c0, c1); }
      }
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.computeVertexNormals();          /* flat, because no vertices are shared */
    var hull = new THREE.Mesh(geo, skin);
    hull.material = hull.material.clone();
    hull.material.side = THREE.DoubleSide;
    hull.material.flatShading = true;
    hull.material.needsUpdate = true;
    g.add(hull);

    /* the faceted canopy: five flat panes, no curvature anywhere */
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x16232c, metalness: 0.55,
      roughness: 0.08, flatShading: true, side: THREE.DoubleSide });
    var cp = new THREE.Mesh(new THREE.SphereGeometry(L * 0.048, 5, 3), glass);
    cp.scale.set(1.7, 1.0, 0.52);
    cp.position.set(L * 0.235, 0, L * 0.080);
    g.add(cp);

    /* outward-canted V tails, well aft */
    for (var s2 = -1; s2 <= 1; s2 += 2) {
      var f = new THREE.Mesh(
        M.slab(THREE, finShape(L, L * 0.17, L * 0.17, 45), L * 0.007, "xz"), skin);
      f.position.set(-L * 0.36, s2 * semi * 0.14, L * 0.045);
      f.rotation.x = s2 * 42 * D2R;
      g.add(f);
    }
    /* the wide shallow exhaust slots along the trailing edge */
    for (var s3 = -1; s3 <= 1; s3 += 2) {
      var ex = new THREE.Mesh(new THREE.BoxGeometry(L * 0.05, L * 0.10, L * 0.014),
                              mat(THREE, 0x1a1d20, 0.5, 0.4));
      ex.position.set(-L * 0.455, s3 * semi * 0.26, L * 0.020);
      g.add(ex);
    }
    /* the retractable dorsal inlet grids */
    for (var s4 = -1; s4 <= 1; s4 += 2) {
      var gr = new THREE.Mesh(new THREE.BoxGeometry(L * 0.075, L * 0.070, L * 0.012),
                              mat(THREE, 0x101315, 0.75, 0.1));
      gr.position.set(L * 0.075, s4 * semi * 0.20, L * 0.075);
      g.add(gr);
    }
    addTeamFlash(THREE, g, P, L, semi, C);
    return g;
  }




  /* the fairing that blends a wing root into the fuselage; without it the
     wing looks glued on, which is the single biggest tell of a crude model */
  function wingFairing(THREE, M, P, L, semi, skin) {
    var pts = P._outline;
    if (!pts) return null;
    var ch = chordAt(pts, semi * 0.06);
    if (!ch) return null;
    var xLE = ch[0], xTE = ch[1], chord = xLE - xTE;
    var bw = (BODY[P.fuselage] || BODY.slim)[4][1] * L;
    var z = ZPOS(P, L);
    var secs = [
      { x: xTE - chord * 0.10, w: bw * 0.30, h: L * 0.010, zc: z },
      { x: xTE + chord * 0.30, w: bw * 1.32, h: L * 0.030, zc: z },
      { x: xLE - chord * 0.30, w: bw * 1.36, h: L * 0.034, zc: z },
      { x: xLE + chord * 0.16, w: bw * 0.34, h: L * 0.012, zc: z },
    ];
    return new THREE.Mesh(M.loft(THREE, secs, 16), skin);
  }

  /* the petals of a variable exhaust nozzle, which is what a jet tail is */
  function nozzlePetals(THREE, g, L, x, y, r, matA, matB) {
    for (var i = 0; i < 10; i++) {
      var a = i * Math.PI * 2 / 10;
      var pt = new THREE.Mesh(new THREE.BoxGeometry(L * 0.055, r * 0.62, r * 0.24), matA);
      pt.position.set(x, y + Math.cos(a) * r * 0.94, Math.sin(a) * r * 0.94);
      pt.rotation.x = a;
      g.add(pt);
    }
    var throat = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.66, r * 0.66, L * 0.02, 14), matB);
    throat.rotation.z = Math.PI / 2;
    throat.position.set(x - L * 0.022, y, 0);
    g.add(throat);
  }

  /* ------------------------------------------------------------ aerofoils */
  /* A wing is not a flat plate with a bevel on it. It has a rounded leading
     edge, a thickness that peaks about a third of the way back, and a sharp
     trailing edge. Building it as a lofted section rather than an extruded
     outline is the difference between a paper aeroplane and an aircraft, and
     it costs a few hundred triangles.

     Thickness follows the NACA four-digit symmetric distribution, which is
     what most of these wings actually are to within a draughtsman's eye. */
  function nacaT(x, tc) {
    return 5 * tc * (0.2969 * Math.sqrt(x) - 0.1260 * x - 0.3516 * x * x
                   + 0.2843 * x * x * x - 0.1015 * x * x * x * x);
  }

  var THICK = { delta: 0.045, cropdelta: 0.05, trap: 0.052, swept: 0.075,
                straight: 0.115, swing: 0.062, biplane: 0.105 };

  function buildWingSolid(THREE, P, L, semi, pts, zPos, dihedral, material, tcOverride) {
    var NS = 10, NC = 11;
    var tc = tcOverride !== undefined ? tcOverride : (THICK[P.planform] || 0.08);
    var pos = [], uv = [], idx = [];
    var dih = (dihedral || 0) * D2R;

    /* stations from root to tip; the last one is pulled in slightly so the
       wing closes to a tip rib rather than a knife edge */
    var ys = [], i, j;
    for (i = 0; i < NS; i++) {
      var t = i / (NS - 1);
      ys.push(semi * (t === 1 ? 0.995 : t) * 0.998);
    }

    var sideCount = 0;
    for (var sgn = -1; sgn <= 1; sgn += 2) {
      var base = sideCount * NS * NC * 2;
      for (i = 0; i < NS; i++) {
        var y = ys[i];
        var ch = chordAt(pts, y);
        if (!ch) ch = chordAt(pts, semi * 0.5) || [0, -1];
        var xLE = ch[0], xTE = ch[1];
        var chord = xLE - xTE;
        var zLift = Math.sin(dih) * y * sgn * sgn;   /* dihedral raises the tip */
        for (j = 0; j < NC; j++) {
          /* cosine spacing puts more points where the curvature is */
          var u = 0.5 * (1 - Math.cos(Math.PI * j / (NC - 1)));
          var x = xLE - chord * u;
          var th = nacaT(u, tc) * chord;
          for (var srf = 0; srf < 2; srf++) {
            var z = zPos + zLift + (srf ? -th : th);
            pos.push(x, sgn * y, z);
            uv.push(u, y / Math.max(0.001, semi));
          }
        }
      }
      /* stitch the surfaces */
      for (i = 0; i < NS - 1; i++) {
        for (j = 0; j < NC - 1; j++) {
          var a = base + (i * NC + j) * 2;
          var b = base + (i * NC + j + 1) * 2;
          var c = base + ((i + 1) * NC + j) * 2;
          var d = base + ((i + 1) * NC + j + 1) * 2;
          if (sgn > 0) {
            idx.push(a, c, b, b, c, d);                 /* upper */
            idx.push(a + 1, b + 1, c + 1, b + 1, d + 1, c + 1); /* lower */
          } else {
            idx.push(a, b, c, b, d, c);
            idx.push(a + 1, c + 1, b + 1, b + 1, c + 1, d + 1);
          }
        }
      }
      /* close the tip rib so the wing is a solid, not two shells */
      var tipBase = base + (NS - 1) * NC * 2;
      for (j = 0; j < NC - 1; j++) {
        var p0 = tipBase + j * 2, p1 = tipBase + (j + 1) * 2;
        idx.push(p0, p0 + 1, p1, p1, p0 + 1, p1 + 1);
      }
      sideCount++;
    }

    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    return new THREE.Mesh(geo, material);
  }

  /* control surfaces read as darker inset panels along the trailing edge */
  function addControlSurfaces(THREE, g, P, L, semi, pts, zPos) {
    var line = mat(THREE, 0x000000, 0.9, 0.0);
    line.transparent = true; line.opacity = 0.22;
    var spots = [[0.30, 0.56], [0.62, 0.92]];       /* flap inboard, aileron out */
    for (var k = 0; k < spots.length; k++) {
      var y0 = semi * spots[k][0], y1 = semi * spots[k][1];
      var c0 = chordAt(pts, y0), c1 = chordAt(pts, y1);
      if (!c0 || !c1) continue;
      var xm = ((c0[1] + c1[1]) * 0.5) + Math.abs(c0[0] - c0[1]) * 0.10;
      for (var sgn = -1; sgn <= 1; sgn += 2) {
        var m = new THREE.Mesh(
          new THREE.BoxGeometry(Math.abs(c0[0] - c0[1]) * 0.18, (y1 - y0) * 0.9, L * 0.0035), line);
        m.position.set(xm, sgn * (y0 + y1) * 0.5, zPos + L * 0.004);
        g.add(m);
      }
    }
  }

  /* ------------------------------------------------------------- ordnance */
  /* An aircraft with clean wings looks like a model kit nobody finished. What
     hangs under them is also era-truthful: a 1950s fighter carries guns and
     maybe rockets, a modern one carries missiles on rails, and a low-observable
     aircraft carries nothing at all outside because that is the entire point. */

  function missileBody(THREE, L, len, rad, matBody, matFin, seeker) {
    var g = new THREE.Group();
    var b = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad, len * 0.78, 10), matBody);
    b.rotation.z = Math.PI / 2;
    g.add(b);
    var nose = new THREE.Mesh(new THREE.ConeGeometry(rad, len * 0.22, 10),
                              seeker ? matFin : matBody);
    nose.rotation.z = -Math.PI / 2;
    nose.position.x = len * 0.50;
    g.add(nose);
    for (var i = 0; i < 4; i++) {
      var f = new THREE.Mesh(new THREE.BoxGeometry(len * 0.20, rad * 2.6, rad * 0.22), matFin);
      f.position.x = -len * 0.32;
      f.rotation.x = i * Math.PI / 4;
      g.add(f);
      var cf = new THREE.Mesh(new THREE.BoxGeometry(len * 0.13, rad * 2.0, rad * 0.20), matFin);
      cf.position.x = len * 0.22;
      cf.rotation.x = i * Math.PI / 4;
      g.add(cf);
    }
    return g;
  }

  function bombBody(THREE, len, rad, matBody, matFin) {
    var g = new THREE.Group();
    var b = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad * 0.82, len * 0.68, 10), matBody);
    b.rotation.z = Math.PI / 2;
    g.add(b);
    var nose = new THREE.Mesh(new THREE.SphereGeometry(rad, 10, 8), matBody);
    nose.scale.set(1.8, 1, 1);
    nose.position.x = len * 0.34;
    g.add(nose);
    for (var i = 0; i < 4; i++) {
      var f = new THREE.Mesh(new THREE.BoxGeometry(len * 0.24, rad * 2.4, rad * 0.18), matFin);
      f.position.x = -len * 0.36;
      f.rotation.x = i * Math.PI / 4 + Math.PI / 8;
      g.add(f);
    }
    return g;
  }

  function podBody(THREE, len, rad, matBody, matDark) {
    var g = new THREE.Group();
    var b = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad, len * 0.86, 12), matBody);
    b.rotation.z = Math.PI / 2;
    g.add(b);
    var face = new THREE.Mesh(new THREE.CylinderGeometry(rad * 0.92, rad * 0.92, len * 0.06, 12), matDark);
    face.rotation.z = Math.PI / 2;
    face.position.x = len * 0.44;
    g.add(face);
    var cap = new THREE.Mesh(new THREE.ConeGeometry(rad, len * 0.16, 12), matBody);
    cap.rotation.z = Math.PI / 2;
    cap.position.x = -len * 0.50;
    g.add(cap);
    return g;
  }

  function tankBody(THREE, len, rad, matBody) {
    var g = new THREE.Group();
    var b = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad, len * 0.62, 12), matBody);
    b.rotation.z = Math.PI / 2;
    g.add(b);
    var n = new THREE.Mesh(new THREE.ConeGeometry(rad, len * 0.24, 12), matBody);
    n.rotation.z = -Math.PI / 2; n.position.x = len * 0.43; g.add(n);
    var t = new THREE.Mesh(new THREE.ConeGeometry(rad, len * 0.30, 12), matBody);
    t.rotation.z = Math.PI / 2; t.position.x = -len * 0.46; g.add(t);
    return g;
  }

  /* what each role actually hangs on the wing, by period */
  function loadoutFor(P) {
    var era = P.era || "e20";
    var old = (era === "e50" || era === "e60");
    switch (P.role) {
      case "stealthfighter":
      case "stealthbomber":
      case "cstealth":
        return [];                                  /* it all goes inside */
      case "awacs": case "cawacs":
        return [];
      case "ewair":
        return [{ k: "pod", n: 2, at: 0.52 }, { k: "pod", n: 2, at: 0.80 },
                { k: "tank", n: 2, at: 0.34 }];
      case "sead":
        return [{ k: "missile", n: 2, at: 0.50, big: true },
                { k: "missile", n: 2, at: 0.74 },
                { k: "tank", n: 2, at: 0.32 }];
      case "cas":
        return old ? [{ k: "pod", n: 2, at: 0.46 }, { k: "bomb", n: 2, at: 0.66 },
                      { k: "bomb", n: 2, at: 0.84 }]
                   : [{ k: "pod", n: 2, at: 0.44 }, { k: "bomb", n: 2, at: 0.62 },
                      { k: "missile", n: 2, at: 0.80 }, { k: "tank", n: 2, at: 0.30 }];
      case "cfighter":
      case "fighter":
        return old ? [{ k: "missile", n: 2, at: 0.66, small: true },
                      { k: "tank", n: 2, at: 0.40 }]
                   : [{ k: "missile", n: 2, at: 0.86, small: true },
                      { k: "missile", n: 2, at: 0.62 },
                      { k: "tank", n: 2, at: 0.36 }];
      default:
        return [{ k: "missile", n: 2, at: 0.62 }];
    }
  }

  function addStores(THREE, g, P, L, semi, skin) {
    var list = loadoutFor(P);
    if (!list.length) return;
    var wingZ = ZPOS(P, L);
    var body = mat(THREE, 0x53594a, 0.86, 0.10);
    var fin  = mat(THREE, 0x3c4136, 0.88, 0.08);
    var dark = mat(THREE, 0x17191b, 0.75, 0.15);
    var pyl  = mat(THREE, 0x6a7169, 0.72, 0.24);

    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      var y = semi * it.at;
      var ch = chordAt(P._outline, y);
      if (!ch) continue;
      var xMid = (ch[0] + ch[1]) * 0.5;
      var chord = Math.abs(ch[0] - ch[1]);
      for (var sgn = -1; sgn <= 1; sgn += 2) {
        var hang, len, rad, drop;
        if (it.k === "missile") {
          len = L * (it.big ? 0.26 : it.small ? 0.15 : 0.20);
          rad = L * (it.big ? 0.016 : it.small ? 0.008 : 0.011);
          hang = missileBody(THREE, L, len, rad, body, fin, true);
          drop = L * 0.034;
        } else if (it.k === "bomb") {
          len = L * 0.17; rad = L * 0.020;
          hang = bombBody(THREE, len, rad, body, fin);
          drop = L * 0.038;
        } else if (it.k === "pod") {
          len = L * 0.16; rad = L * 0.026;
          hang = podBody(THREE, len, rad, body, dark);
          drop = L * 0.044;
        } else {
          len = L * 0.28; rad = L * 0.030;
          hang = tankBody(THREE, len, rad, skin);
          drop = L * 0.050;
        }
        hang.position.set(xMid + chord * 0.06, sgn * y, wingZ - drop);
        g.add(hang);
        /* the pylon that carries it */
        var pl = new THREE.Mesh(
          new THREE.BoxGeometry(chord * 0.34, L * 0.007, drop * 0.95), pyl);
        pl.position.set(xMid, sgn * y, wingZ - drop * 0.5);
        g.add(pl);
      }
    }
  }

  /* ------------------------------------------------------------ undercarriage */
  /* The undercarriage is named so the renderer can stow it: these aircraft
     spend nearly all their time at cruise altitude, where wheels down looks
     wrong, but they also park on the airbase apron where wheels up looks
     absurd. Building it once and toggling visibility covers both. */
  function addGear(THREE, g, P, L, semi, skin) {
    if (P.planform === "fwing" || P.planform === "faceted") return;
    var gearGrp = new THREE.Group();
    gearGrp.name = "gear";
    g.add(gearGrp);
    g = gearGrp;
    var tbl = BODY[P.fuselage] || BODY.slim;
    var belly = (tbl[4][3] - tbl[4][2]) * L;
    var strutM = mat(THREE, 0x8a9096, 0.5, 0.6);
    var tyre = mat(THREE, 0x18191b, 0.95, 0.03);
    var big = P.fuselage === "airliner" || P.fuselage === "heavy";
    var wr = L * (big ? 0.020 : 0.014);
    var legH = L * (big ? 0.085 : 0.060);

    function leg(x, y, r, h, twin) {
      var st = new THREE.Mesh(new THREE.CylinderGeometry(L * 0.006, L * 0.007, h, 7), strutM);
      st.position.set(x, y, belly - h * 0.5);
      g.add(st);
      var n = twin ? 2 : 1;
      for (var i = 0; i < n; i++) {
        var w = new THREE.Mesh(new THREE.CylinderGeometry(r, r, r * 0.62, 12), tyre);
        w.rotation.x = Math.PI / 2;
        w.position.set(x + (twin ? (i ? r * 0.7 : -r * 0.7) : 0), y, belly - h);
        g.add(w);
      }
    }
    /* nose leg forward, mains under the wing root */
    leg(L * 0.30, 0, wr * 0.82, legH * 0.92, big);
    var my = big ? semi * 0.16 : (tbl[4][1] * L * 1.05);
    leg(-L * 0.02,  my, wr, legH, big);
    leg(-L * 0.02, -my, wr, legH, big);
  }

  /* ------------------------------------------------------- cockpit and probes */
  function addCockpitDetail(THREE, g, P, L) {
    if (P.fuselage === "airliner" || P.fuselage === "heavy") return;
    var bodyH = (BODY[P.fuselage] || BODY.slim)[4][2] * L;
    var cx = P.fuselage === "wide" ? L * 0.24 : L * 0.27;
    var dark = mat(THREE, 0x15181a, 0.9, 0.05);
    /* the instrument coaming and the seat, just visible under the glass */
    var coam = new THREE.Mesh(new THREE.BoxGeometry(L * 0.030, L * 0.048, L * 0.016), dark);
    coam.position.set(cx + L * 0.042, 0, bodyH * 0.74);
    g.add(coam);
    var seat = new THREE.Mesh(new THREE.BoxGeometry(L * 0.026, L * 0.034, L * 0.040), dark);
    seat.position.set(cx - L * 0.018, 0, bodyH * 0.72);
    g.add(seat);
    var hb = new THREE.Mesh(new THREE.BoxGeometry(L * 0.006, L * 0.030, L * 0.026),
                            mat(THREE, 0x39474a, 0.35, 0.5));
    hb.position.set(cx + L * 0.028, 0, bodyH * 0.84);
    g.add(hb);
    /* canopy frame rails, which is what makes a canopy read as a canopy */
    var rail = mat(THREE, 0x4a4f52, 0.6, 0.35);
    for (var sgn = -1; sgn <= 1; sgn += 2) {
      var r = new THREE.Mesh(new THREE.BoxGeometry(L * 0.115, L * 0.006, L * 0.008), rail);
      r.position.set(cx, sgn * L * 0.028, bodyH * 0.72);
      g.add(r);
    }
    var bow = new THREE.Mesh(new THREE.BoxGeometry(L * 0.007, L * 0.058, L * 0.030), rail);
    bow.position.set(cx + L * 0.052, 0, bodyH * 0.76);
    g.add(bow);
  }

  function addProbes(THREE, g, P, L) {
    var m = mat(THREE, 0x6e747a, 0.5, 0.55);
    var dark = mat(THREE, 0x22262a, 0.8, 0.2);
    /* pitot boom: on a nose-intake fighter it stands out over the lip, which
       is a defining detail of the MiG family */
    var noseIn = P.intake === "nose";
    var pit = new THREE.Mesh(
      new THREE.CylinderGeometry(L * 0.0035, L * 0.005, L * (noseIn ? 0.16 : 0.10), 6), m);
    pit.rotation.z = Math.PI / 2;
    pit.position.set(L * (noseIn ? 0.575 : 0.535),
                     noseIn ? L * 0.030 : 0,
                     noseIn ? L * 0.020 : 0);
    g.add(pit);
    /* blade antennas above and below the spine */
    var bodyH = (BODY[P.fuselage] || BODY.slim)[4][2] * L;
    for (var i = 0; i < 2; i++) {
      var bl = new THREE.Mesh(new THREE.BoxGeometry(L * 0.022, L * 0.004, L * 0.026), dark);
      bl.position.set(-L * (0.02 + i * 0.16), 0, bodyH * (i ? -0.95 : 1.02));
      g.add(bl);
    }
    /* formation-light strip and the wingtip navigation lights */
    var red = new THREE.MeshStandardMaterial({ color: 0xd83a2a, emissive: 0x8a1a10,
                                               emissiveIntensity: 0.9, roughness: 0.4 });
    var grn = new THREE.MeshStandardMaterial({ color: 0x38d05a, emissive: 0x11761f,
                                               emissiveIntensity: 0.9, roughness: 0.4 });
    var tip = P._outline ? chordAt(P._outline, (P.span || 10) * 0.5 * 0.985) : null;
    if (tip) {
      var tx = (tip[0] + tip[1]) * 0.5, semi2 = (P.span || 10) * 0.5;
      for (var s2 = -1; s2 <= 1; s2 += 2) {
        var lamp = new THREE.Mesh(new THREE.SphereGeometry(L * 0.008, 8, 6),
                                  s2 > 0 ? red : grn);
        lamp.position.set(tx, s2 * semi2 * 0.985, ZPOS(P, L));
        g.add(lamp);
      }
    }
  }

  /* -------------------------------------------------------------- assembly */
  function build(THREE, M, C, P) {
    var L = P.len || 15, semi = (P.span || 10) * 0.5;
    var skin = skinOf(THREE, P);

    if (P.planform === "fwing") return buildFlyingWing(THREE, M, P, C, L, semi, skin);
    if (P.planform === "faceted") return buildFaceted(THREE, M, P, C, L, semi, skin);

    var g = new THREE.Group();
    var panel = skinPanel(THREE, P, L);
    g.add(buildBody(THREE, M, P, L, skin));

    var thick = L * (P.fuselage === "airliner" || P.fuselage === "heavy" ? 0.009 : 0.008);
    P._outline = wingOutline(P, L, semi);
    if (P.planform === "biplane") {
      /* two near-equal wings braced apart: the An-2 and the Po-2 */
      var bodyHb = (BODY[P.fuselage] || BODY.slim)[4][2] * L;
      var zUp = bodyHb * 1.25, zLo = -bodyHb * 0.55;
      var lower = [];
      for (var q = 0; q < P._outline.length; q++)
        lower.push([P._outline[q][0] - L * 0.02, P._outline[q][1] * 0.88]);
      g.add(buildWingSolid(THREE, P, L, semi, P._outline, zUp, P.dihedral || 0, panel, 0.105));
      g.add(buildWingSolid(THREE, P, L, semi * 0.88, lower, zLo, P.dihedral || 0, panel, 0.105));
      /* interplane N-struts and the cabane over the fuselage */
      var strut = mat(THREE, 0x8a8f93, 0.62, 0.35);
      for (var sg = -1; sg <= 1; sg += 2) {
        for (var j = 0; j < 2; j++) {
          var st2 = new THREE.Mesh(
            new THREE.CylinderGeometry(L * 0.006, L * 0.006, zUp - zLo, 6), strut);
          st2.position.set(P._outline[0][0] - L * (j ? 0.16 : 0.03),
                           sg * semi * 0.62, (zUp + zLo) * 0.5);
          g.add(st2);
        }
        var cab = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.005, L * 0.005, zUp - bodyHb * 0.4, 6), strut);
        cab.position.set(P._outline[0][0] - L * 0.06, sg * semi * 0.13,
                         (zUp + bodyHb * 0.4) * 0.5);
        cab.rotation.x = sg * 0.16;
        g.add(cab);
      }
    } else {
      g.add(buildWingSolid(THREE, P, L, semi, P._outline, ZPOS(P, L), P.dihedral || 0, panel));
      addControlSurfaces(THREE, g, P, L, semi, P._outline, ZPOS(P, L));
      var fr = wingFairing(THREE, M, P, L, semi, skin);
      if (fr) g.add(fr);
    }

    addTail(THREE, M, g, P, L, semi, panel);
    addPropulsion(THREE, M, g, P, L, semi, skin);
    addIntakes(THREE, M, g, P, L, semi, skin);
    addCanopy(THREE, M, g, P, L, C);
    addCockpitDetail(THREE, g, P, L);
    addStores(THREE, g, P, L, semi, skin);
    addGear(THREE, g, P, L, semi, skin);
    addProbes(THREE, g, P, L);
    if (P.canard) addCanards(THREE, M, g, P, L, semi, panel);
    if (P.rotodome) addRotodome(THREE, g, P, L, skin);
    if (P.canoe) addCanoe(THREE, g, P, L, skin);
    addTeamFlash(THREE, g, P, L, semi, C);
    return g;
  }

  /* Register every spec under its unit id. Hand-finished meshes already in
     UNIT_MODELS win: this layer exists to fill the gaps, not to replace the
     detailed models the present-day roster ships with. */
  function registerAll(override) {
    var made = 0, kept = 0;
    for (var id in AIRFRAMES) {
      if (!Object.prototype.hasOwnProperty.call(AIRFRAMES, id)) continue;
      /* a hand-finished mesh wins; an early parametric stand-in does not */
      if (!override && UNIT_MODELS[id] && !UNIT_MODELS[id].crude) { kept++; continue; }
      (function (P, key) {
        UNIT_MODELS[key] = {
          len: P.len || 15,
          build: function (THREE, M, C) { return build(THREE, M, C, P); },
        };
      })(AIRFRAMES[id], id);
      made++;
    }
    return { made: made, kept: kept };
  }

  return { build: build, registerAll: registerAll, PAINT: PAINT, BODY: BODY };
})();
