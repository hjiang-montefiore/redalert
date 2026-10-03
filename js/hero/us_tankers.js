/* ================= us_tankers.js  -  HERO MODEL =================
   The United States Air Force's two jet tankers, three rows, two airframes:

     nato_e60_tanker "A"  Boeing KC-135A Stratotanker, 1957: four slim J57-P-59W
                          turbojets on long pylons, white over bare metal, the
                          flying boom under the tail.
     nato_e90_tanker "R"  KC-135R, from 1984: the same airframe re-engined with
                          four CFM56-2B (F108) turbofans, fat and low-slung,
                          all over light grey.
     tanker_n        "N"  Boeing KC-46A Pegasus (767-2C): two PW4062 turbofans,
                          the 767 wing, the boom under the tail and the two
                          wing aerial refuelling pods.
   The KC-97 (nato_e50_tanker) and the KC-10 (nato_e80_tanker) are not drawn
   here: they have models of their own, js/hero/us_kc97g.js and
   js/hero/us_kc10a.js.

   References (Wikimedia Commons, each fetched once):
     - "Boeing KC-135 Stratotanker line drawing - USAF medium res": the
       dimensioned side and front views. Length 135 ft 1 in nose to stabiliser
       tips, span 130 ft 10 in, height 41 ft 8 in; fuselage 13 ft 10 in deep
       and its top 17 ft 10 in off the ground, the belly 4 ft ahead of the wing;
       nose gear 45 ft 8 in ahead of the main trucks, trucks 22 ft 1 in apart,
       four wheels to a truck; stabiliser span 39 ft 8 in; the nacelle centres
       at 27 ft 2 in and 46 ft 1 in from the centreline and standing 1.5 m and
       2.1 m off the ground; the wing dihedral and the fin outline.
     - "Boeing KC-135A Stratotanker 3-view line drawing" (plan view): fuselage
       12 ft 0 in wide; nacelle lips 41 ft 0 in and 56 ft 3 in from the nose;
       from it the wing (leading edge swept 38 deg, trailing edge 26 deg, root
       chord 9.5 m, tip chord 2.8 m) and the stabiliser (40 deg / 19 deg) were
       measured station by station, scaled so that nose to stabiliser root is
       128 ft 10 in.
     - "KC-46 Pegasus at Pease Air National Guard Base on 7 February 2020",
       "The first KC-46A Pegasus lands at Seymour Johnson Air Force Base, June
       12, 2020" and "N461FT 4 Boeing 767-2C(2LK)-KC-46A": the 767 body, the
       big PW4062 pods slung under the wing, the six-wheel main trucks, the
       boom stowed under the tail on its fairing and the dark medium grey.
   Published: KC-135 length 136 ft 3 in (41.5 m, the boom's ruddevators being
   the last metre), span 130 ft 10 in (39.9 m), height 41 ft 8 in (12.7 m).
   KC-46A length 165 ft 6 in (50.5 m), span 157 ft 8 in (48.1 m), height 52 ft
   10 in (15.9 m); 767 fuselage 5.0 m wide; wing leading edge 35 deg, area
   283 sq m. The 767 wing root, the stabiliser and the fin chords come from the
   767-200 planform, not from a drawing of the KC-46 itself.

   Parking: the tankers are drawn near their real size (the game scales an
   aircraft by its length, and a tanker's is 49 m), so the 40-48 m wing of
   either airframe passes through the 3.66 m bins of the airbase's revetments
   (its underside is 2.7 m up where the walls stand): they are listed in the
   OVERSIZE table of tools/jsc/parked3d_check.js, as the B-52 is.

   Model space: +X nose, +Y left, +Z up, real metres, the origin on the
   fuselage axis; every station below is d, metres aft of the nose.
   Everything is baked into one mesh per material (mergeByMaterial), the gear
   in a group of its own, named "gear". The tyres are the lowest opaque thing,
   so the parked aircraft rests on them. The team flash is exactly C.team: the
   fin tip and the upper wing tips.
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTankers = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  function sgp(v, e) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), e); }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  /* the airframe being built; build() is synchronous, so a module variable is safe */
  var A = null;
  function X(d) { return A.NOSE - d; }

  /* ========================================================== airframes ==
     FUS rows: d, half width, top, bottom, squareness (z from the fuselage axis).
     WING / STAB rows: span station y, leading edge d, trailing edge d.
     FIN rows: height z, leading edge d, trailing edge d, thickness ratio.   */
  var KC135 = {
    id: "kc135", L: 41.5, NOSE: 20.75, GROUND: -3.40,
    /* Side profile off the USAF drawing, plan widths off the 3-view: a 3.7 m
       wide body, the top line flat, the belly 1.4 m off the ground, the tail
       cone sweeping up to a point at 40 m. */
    FUS: [
      [0.00, 0.03, -0.38, -0.52, 1.0], [0.25, 0.34, 0.02, -0.95, 0.95],
      [0.60, 0.55, 0.27, -1.05, 0.92], [1.00, 0.73, 0.47, -1.13, 0.90],
      [1.50, 0.90, 0.77, -1.47, 0.88], [2.00, 1.07, 1.05, -1.63, 0.86],
      [3.00, 1.32, 1.57, -1.87, 0.84], [4.00, 1.55, 1.84, -2.00, 0.84],
      [5.00, 1.72, 1.97, -1.97, 0.85], [6.00, 1.84, 2.04, -1.98, 0.86],
      [8.00, 1.86, 2.05, -1.99, 0.86], [12.0, 1.86, 2.07, -2.00, 0.86],
      [18.0, 1.86, 2.08, -2.00, 0.86], [23.0, 1.86, 2.08, -1.94, 0.86],
      [26.0, 1.85, 2.08, -1.73, 0.86], [28.0, 1.84, 2.08, -1.50, 0.86],
      [30.0, 1.80, 2.08, -1.37, 0.86], [32.0, 1.59, 2.07, -0.92, 0.86],
      [34.0, 1.21, 2.06, -0.30, 0.86], [36.0, 0.95, 2.02, 0.20, 0.88],
      [38.0, 0.66, 1.95, 0.80, 0.90], [39.2, 0.42, 1.82, 1.25, 0.92],
      [40.0, 0.12, 1.68, 1.52, 1.0]
    ],
    /* wing: leading edge 38 deg, trailing edge 26 deg outboard of 3 m, the
       root fillet taking the chord out to 9.5 m at the body */
    WING: [
      [1.40, 11.28, 21.35], [1.86, 11.64, 21.15], [3.00, 12.55, 20.65], [4.00, 13.34, 20.86],
      [5.50, 14.52, 21.60], [7.00, 15.71, 22.34], [8.20, 16.66, 22.93], [9.50, 17.69, 23.57],
      [11.0, 18.87, 24.31], [12.5, 20.06, 25.05], [13.95, 21.20, 25.77], [15.5, 22.43, 26.54],
      [17.0, 23.61, 27.28], [18.5, 24.80, 28.00], [19.94, 25.93, 28.74]
    ],
    wz: function (y) { return -1.51 + 0.1054 * y; },                /* 6 deg dihedral */
    wtc: function (y) { return 0.115 - 0.010 * Math.min(1, y / 19.94); },
    camber: 0.012, yTeam: 16.99,
    STAB: [[0.5, 34.14, 39.32], [1.0, 34.55, 39.49], [2.0, 35.39, 39.83], [3.5, 36.64, 40.34],
           [5.0, 37.89, 40.85], [6.05, 38.75, 41.17]],
    sz: function (y) { return 0.77 + 0.105 * (y - 2); },
    stc: function (y) { return 0.095 - 0.015 * Math.min(1, y / 6.05); },
    /* fin: the drawing's 7.8 m above the body top, scaled to the published
       12.7 m overall */
    FIN: [[1.2, 29.8, 38.55, 0.12], [2.10, 31.00, 38.60, 0.115], [2.76, 32.69, 38.74, 0.11],
          [3.71, 33.73, 38.90, 0.105], [4.66, 34.43, 39.10, 0.10], [5.61, 35.06, 39.27, 0.095],
          [6.56, 35.73, 39.44, 0.09], [7.51, 36.36, 39.60, 0.085], [8.18, 36.80, 39.74, 0.08],
          [8.56, 37.10, 39.80, 0.075], [9.27, 37.55, 39.92, 0.07]],
    finTeam: 8.17,
    gear: { nose: { d: 5.25, R: 0.47, W: 0.30, tr: 0.26 },
            main: { y: 3.37, ax: [18.38, 20.02], R: 0.58, W: 0.42, du: 0.40, wellD: 19.2, wellL: 3.6, wellA: 38 } },
    boom: { d0: 36.6, z0: 0.15, d1: 41.478, z1: 1.02, r0: 0.19, r1: 0.12, rud: 40.3 },
    podBay: { d: 35.9, rx: 1.9, ry: 0.55, rz: 0.36, z: -0.38 }
  };

  var KC46 = {
    id: "kc46", L: 50.5, NOSE: 25.25, GROUND: -4.15,
    /* the 767 body: 5.03 m wide, 5.3 m deep, the belly 1.5 m off the ground,
       the tail cone sweeping up over the stowed boom */
    FUS: [
      [0.00, 0.05, -0.60, -0.80, 1.0], [0.30, 0.55, -0.15, -1.15, 0.97],
      [0.80, 1.05, 0.35, -1.55, 0.96], [1.50, 1.60, 0.95, -1.95, 0.95],
      [2.50, 2.05, 1.55, -2.30, 0.95], [3.50, 2.35, 2.05, -2.50, 0.95],
      [5.00, 2.48, 2.50, -2.62, 0.95], [7.00, 2.515, 2.68, -2.65, 0.95],
      [20.0, 2.515, 2.68, -2.65, 0.95], [36.0, 2.515, 2.68, -2.65, 0.95],
      [38.0, 2.50, 2.67, -2.60, 0.95], [40.0, 2.40, 2.62, -2.42, 0.95],
      [42.0, 2.15, 2.52, -2.00, 0.95], [44.0, 1.80, 2.32, -1.45, 0.95],
      [46.0, 1.40, 2.06, -0.85, 0.95], [48.0, 0.95, 1.80, -0.30, 0.96],
      [49.0, 0.62, 1.66, 0.00, 0.97], [49.6, 0.26, 1.55, 0.18, 1.0]
    ],
    /* 767 wing: leading edge 34.9 deg from the root at 18.6 m, trailing edge
       nearly straight to the engine station and 21 deg beyond it */
    WING: [
      [2.00, 18.24, 28.57], [2.52, 18.60, 28.60], [4.00, 19.63, 28.70], [5.50, 20.68, 28.80],
      [7.00, 21.72, 28.90], [9.60, 23.53, 29.91], [12.0, 25.21, 30.85], [15.0, 27.30, 32.02],
      [18.0, 29.39, 33.19], [21.0, 31.48, 34.36], [24.05, 33.60, 35.55]
    ],
    wz: function (y) { return -1.65 + 0.0928 * (y - 2.52); },        /* 5.3 deg dihedral */
    wtc: function (y) { return 0.135 - 0.045 * Math.min(1, (y - 2.5) / 21.5); },
    camber: 0.012, yTeam: 20.99,
    STAB: [[1.2, 41.8, 48.25], [1.8, 42.3, 48.3], [4.0, 43.84, 48.64], [6.5, 45.59, 49.0],
           [9.3, 47.55, 49.45]],
    sz: function (y) { return 0.35 + 0.1228 * (y - 1.8); },
    stc: function (y) { return 0.10 - 0.015 * Math.min(1, y / 9.3); },
    FIN: [[1.5, 36.2, 47.5, 0.125], [2.7, 38.4, 47.55, 0.12], [4.0, 39.6, 47.7, 0.105],
          [6.0, 41.3, 48.0, 0.095], [8.0, 43.0, 48.3, 0.09], [10.0, 44.8, 48.7, 0.08],
          [11.2, 45.8, 49.0, 0.075], [11.75, 46.4, 49.1, 0.07]],
    finTeam: 9.99,
    gear: { nose: { d: 6.0, R: 0.50, W: 0.30, tr: 0.28 },
            main: { y: 5.4, ax: [26.2, 27.65, 29.1], R: 0.58, W: 0.42, du: 0.50, wellD: 27.4, wellL: 4.4, wellA: 34 } },
    boom: { d0: 43.2, z0: -1.55, d1: 50.467, z1: -0.30, r0: 0.30, r1: 0.20, rud: 48.4 },
    podBay: { d: 44.9, rx: 3.3, ry: 0.95, rz: 0.42, z: -1.75 }
  };
  [KC135, KC46].forEach(function (af) { af.SEC = null; });

  /* ---------------------------------------------------------------- rows --
     coats: "top" and "low" are the two paint sheets; wingTop is the one the
     upper surfaces take, tailTop the fin's, nacTop the pods'. */
  var VARIANTS = {
    A: { id: "A", af: KC135, eng: "J57", paint: "white", bare: "low", low: 0.30, nlow: -9,
         wingTop: "low", tailTop: "top", stabTop: "low", nacTop: "low",
         pods: [{ y: 8.2, lip: 12.5, z: -1.86 }, { y: 13.95, lip: 17.15, z: -1.26 }] },
    R: { id: "R", af: KC135, eng: "CFM56", paint: "grey135", bare: "", low: -0.30, nlow: -0.15,
         wingTop: "top", tailTop: "top", stabTop: "top", nacTop: "top",
         pods: [{ y: 8.2, lip: 11.6, z: -1.95 }, { y: 13.95, lip: 16.4, z: -1.35 }] },
    N: { id: "N", af: KC46, eng: "PW4062", paint: "grey46", bare: "", low: -0.30, nlow: -0.15,
         wingTop: "top", tailTop: "top", stabTop: "top", nacTop: "top", wingPods: true,
         pods: [{ y: 9.6, lip: 19.9, z: -2.20 }] }
  };

  /* --------------------------------------------------------------- paint --
     white:   anti-flash white over bare aluminium, the SAC tanker of the 1960s.
     grey135: the overall light grey (Compass Ghost) of the re-engined 135s.
     grey46:  the KC-46's medium grey, darker than it looks in a photograph
              because this renderer lifts a flat hex two stops.             */
  var SHEETS = {
    white:   { top: { base: "#cfd3d6", spots: [["#c4c9cc", 20, 8, 22], ["#d8dcde", 18, 8, 20]], seam: 0.14, seed: 311 },
               low: { base: "#b4babe", spots: [["#a9afb4", 26, 8, 22], ["#c2c7ca", 22, 8, 20]], seam: 0.20, seed: 312 } },
    grey135: { top: { base: "#747b80", spots: [["#6e7579", 18, 10, 30], ["#7b8286", 16, 10, 28]], seam: 0.10, seed: 321 },
               low: { base: "#838a90", spots: [["#7e858a", 12, 12, 30]], seam: 0.09, seed: 322 } },
    grey46:  { top: { base: "#636a70", spots: [["#5d6469", 18, 10, 30], ["#697074", 16, 10, 28]], seam: 0.10, seed: 331 },
               low: { base: "#6f767c", spots: [["#6a7176", 12, 12, 30]], seam: 0.09, seed: 332 } }
  };

  /* Planar UVs (u = X/40, v = (Y + 0.55 Z)/40, repeating): the sheet is the
     airframe seen from above and a little from the side. Cached at module
     scope: build() runs per key, team and era. */
  var _sheets = {};
  function blob(g, cx, cy, r, R, S) {
    var n = 12, pts = [], i, ox, oy;
    for (i = 0; i < n; i++) {
      var a = i / n * Math.PI * 2, rr = r * (0.7 + 0.5 * R());
      pts.push([Math.cos(a) * rr * 1.4, Math.sin(a) * rr]);
    }
    for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
      if (cx + ox + 2 * r < 0 || cx + ox - 2 * r > S || cy + oy + 2 * r < 0 || cy + oy - 2 * r > S) continue;
      g.beginPath();
      g.moveTo(cx + ox + pts[0][0], cy + oy + pts[0][1]);
      for (i = 1; i < n; i++) g.lineTo(cx + ox + pts[i][0], cy + oy + pts[i][1]);
      g.closePath(); g.fill();
    }
  }
  function sheet(THREE, key, P) {
    if (_sheets[key] !== undefined) return _sheets[key];
    var tex = null;
    try {
      var S = 512, cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      var g = cv.getContext("2d"), R = rngFor(P.seed), i, k;
      g.fillStyle = P.base; g.fillRect(0, 0, S, S);
      for (i = 0; i < P.spots.length; i++) {
        g.fillStyle = P.spots[i][0];
        for (k = 0; k < P.spots[i][1]; k++)
          blob(g, R() * S, R() * S, P.spots[i][2] + (P.spots[i][3] - P.spots[i][2]) * R(), R, S);
      }
      /* panel seams: across the airframe every 1.5 m, along it every 3 m */
      g.strokeStyle = "rgba(0,0,0," + P.seam + ")"; g.lineWidth = 1;
      for (i = 0; i < S; i += 19) { g.beginPath(); g.moveTo(i + 0.5, 0); g.lineTo(i + 0.5, S); g.stroke(); }
      for (i = 0; i < S; i += 38) { g.beginPath(); g.moveTo(0, i + 0.5); g.lineTo(S, i + 0.5); g.stroke(); }
      tex = new THREE.CanvasTexture(cv);
      tex.encoding = THREE.sRGBEncoding;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = 4;
    } catch (e) { tex = null; }
    _sheets[key] = tex;
    return tex;
  }

  /* ========================================================== materials ==
     Three tiers. SKIN: the two coats and the team flash. METAL: fittings,
     gear, nozzles; the tyres. GLASS. Untextured values are dark on purpose:
     this three.js lifts a flat hex two to three stops on screen. */
  function materials(THREE, C, V) {
    var P = SHEETS[V.paint];
    function coat(which) {
      var t = sheet(THREE, V.paint + "/" + which, P[which]), bare = V.bare === which;
      var m = new THREE.MeshStandardMaterial({ color: 0xffffff,
        roughness: bare ? 0.45 : 0.86, metalness: bare ? 0.45 : 0.08, side: THREE.DoubleSide });
      if (t) m.map = t; else m.color.set(P[which].base);
      return m;
    }
    return {
      top: coat("top"),
      low: coat("low"),
      /* exactly C.team, so eraPaint's team test leaves it alone */
      team: new THREE.MeshStandardMaterial({
        color: new THREE.Color((C && C.team !== undefined) ? C.team : 0x3f7fd0),
        roughness: 0.82, metalness: 0.06, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({ color: 0x474d52, roughness: 0.52, metalness: 0.55, side: THREE.DoubleSide }),
      hot: new THREE.MeshStandardMaterial({ color: 0x191a1a, roughness: 0.65, metalness: 0.36, side: THREE.DoubleSide }),
      ink: new THREE.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide }),
      tyre: new THREE.MeshStandardMaterial({ color: 0x070809, roughness: 0.95, metalness: 0.04 }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x27383f, roughness: 0.13, metalness: 0.30, clearcoat: 0.35,
        transparent: true, opacity: 0.83, side: THREE.DoubleSide })
    };
  }

  /* ========================================================== geometry == */
  function geoFrom(THREE, pos, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    return g;
  }
  /* Rings of equal length bridged in order, closed around, capped if asked.
     outward() then turns the whole part the right way out. */
  function gridGeo(THREE, rings, capA, capB) {
    var nr = rings.length, N = rings[0].length, pos = [], idx = [], i, j;
    for (i = 0; i < nr; i++) for (j = 0; j < N; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    for (i = 0; i < nr - 1; i++) for (j = 0; j < N; j++) {
      var a = i * N + j, b = i * N + (j + 1) % N, c = (i + 1) * N + j, d = (i + 1) * N + (j + 1) % N;
      idx.push(a, c, b, b, c, d);
    }
    function cap(r, base, flip) {
      var cx = 0, cy = 0, cz = 0, k;
      for (k = 0; k < N; k++) { cx += r[k][0]; cy += r[k][1]; cz += r[k][2]; }
      var ci = pos.length / 3;
      pos.push(cx / N, cy / N, cz / N);
      for (k = 0; k < N; k++) {
        var a = base + k, b = base + (k + 1) % N;
        if (flip) idx.push(ci, b, a); else idx.push(ci, a, b);
      }
    }
    if (capA) cap(rings[0], 0, false);
    if (capB) cap(rings[nr - 1], (nr - 1) * N, true);
    return geoFrom(THREE, pos, idx);
  }
  /* signed volume about the part's own centroid; a negative one is a part
     built inside out, and every triangle is turned */
  function outward(g) {
    var p = g.attributes.position.array, ix = g.index.array, n = p.length / 3, cx = 0, cy = 0, cz = 0, i, v = 0;
    for (i = 0; i < n; i++) { cx += p[3 * i]; cy += p[3 * i + 1]; cz += p[3 * i + 2]; }
    cx /= n; cy /= n; cz /= n;
    for (i = 0; i < ix.length; i += 3) {
      var a = 3 * ix[i], b = 3 * ix[i + 1], c = 3 * ix[i + 2];
      var ax = p[a] - cx, ay = p[a + 1] - cy, az = p[a + 2] - cz;
      var bx = p[b] - cx, by = p[b + 1] - cy, bz = p[b + 2] - cz;
      var qx = p[c] - cx, qy = p[c + 1] - cy, qz = p[c + 2] - cz;
      v += ax * (by * qz - bz * qy) + ay * (bz * qx - bx * qz) + az * (bx * qy - by * qx);
    }
    if (v < 0) for (i = 0; i < ix.length; i += 3) { var t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; }
    return g;
  }
  function planarUV(THREE, g) {
    var p = g.attributes.position.array, n = p.length / 3, uv = new Float32Array(n * 2), i;
    for (i = 0; i < n; i++) { uv[2 * i] = p[3 * i] / 40; uv[2 * i + 1] = (p[3 * i + 1] + 0.55 * p[3 * i + 2]) / 40; }
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  }
  /* A finished skin part: its triangles shared out between the coats, the
     team flash and the exhaust by rule(centroid, face normal). */
  function emit(THREE, grp, g, T, rule) {
    outward(g);
    g.computeVertexNormals();
    planarUV(THREE, g);
    var p = g.attributes.position.array, ix = g.index.array, out = {}, order = [], i;
    for (i = 0; i < ix.length; i += 3) {
      var a = 3 * ix[i], b = 3 * ix[i + 1], c = 3 * ix[i + 2];
      var ux = p[b] - p[a], uy = p[b + 1] - p[a + 1], uz = p[b + 2] - p[a + 2];
      var vx = p[c] - p[a], vy = p[c + 1] - p[a + 1], vz = p[c + 2] - p[a + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      var k = rule ? rule((p[a] + p[b] + p[c]) / 3, (p[a + 1] + p[b + 1] + p[c + 1]) / 3,
                          (p[a + 2] + p[b + 2] + p[c + 2]) / 3, nx / l, ny / l, nz / l) : "top";
      if (!out[k]) { out[k] = []; order.push(k); }
      out[k].push(ix[i], ix[i + 1], ix[i + 2]);
    }
    for (i = 0; i < order.length; i++) {
      var s = new THREE.BufferGeometry();
      s.setAttribute("position", g.attributes.position);
      s.setAttribute("normal", g.attributes.normal);
      s.setAttribute("uv", g.attributes.uv);
      s.setIndex(out[order[i]]);
      grp.add(new THREE.Mesh(s, T[order[i]]));
    }
  }
  /* section ring: superellipse, its widest line at zw, N points CCW seen from
     ahead, starting on the port side */
  function secRing(x, yc, w, zt, zb, zw, e, N) {
    var r = [], j;
    for (j = 0; j < N; j++) {
      var t = j / N * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
      var z = s >= 0 ? zw + (zt - zw) * sgp(s, e) : zw + (zw - zb) * sgp(s, e);
      r.push([x, yc + w * sgp(c, e), z]);
    }
    return r;
  }
  /* body of revolution along -X: prof rows [aft of the front, radius] */
  function lathe(THREE, prof, N, x0, yc, zc, capA, capB) {
    var rings = [], i;
    for (i = 0; i < prof.length; i++) {
      var w = Math.max(prof[i][1], 0.004);
      rings.push(secRing(x0 - prof[i][0], yc, w, zc + w, zc - w, zc, 1, N));
    }
    return gridGeo(THREE, rings, capA, capB);
  }
  /* convex outline in X-Z, extruded +-t about y0 */
  function plate(THREE, ol, y0, t) {
    var n = ol.length, pos = [], idx = [], i;
    for (i = 0; i < n; i++) pos.push(ol[i][0], y0 + t, ol[i][1]);
    for (i = 0; i < n; i++) pos.push(ol[i][0], y0 - t, ol[i][1]);
    for (i = 1; i < n - 1; i++) { idx.push(0, i, i + 1); idx.push(n, n + i + 1, n + i); }
    for (i = 0; i < n; i++) { var j = (i + 1) % n; idx.push(i, n + i, j, j, n + i, n + j); }
    return geoFrom(THREE, pos, idx);
  }
  /* a tapered tube from a to b */
  function taper(THREE, mat, a, b, r0, r1, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, L, seg || 8, 1), mat);
    m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
    return m;
  }
  function box(THREE, mat, sx, sy, sz, px, py, pz) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(px, py, pz);
    return m;
  }
  /* an ellipsoid baked in place, poles fore and aft */
  function egg(THREE, mat, rx, ry, rz, x, y, z, ws, hs) {
    var geo = new THREE.SphereGeometry(1, ws || 12, hs || 8);
    geo.rotateZ(Math.PI / 2);
    geo.scale(rx, ry, rz);
    geo.translate(x, y, z);
    planarUV(THREE, geo);
    return new THREE.Mesh(geo, mat);
  }
  /* a flat disc facing along X (intake faces, nozzles) */
  function disc(THREE, mat, r, x, y, z, n) {
    var m = new THREE.Mesh(new THREE.CircleGeometry(r, n || 14), mat);
    m.rotation.y = Math.PI / 2;
    m.position.set(x, y, z);
    return m;
  }
  /* NACA 4-digit section, ring from the trailing edge over the top to the
     nose and back under; x along the chord from the leading edge, y across */
  function naca(x, tc) {
    return 5 * tc * (0.2969 * Math.sqrt(x) - 0.1260 * x - 0.3516 * x * x + 0.2843 * x * x * x - 0.1036 * x * x * x * x);
  }
  function foil(n, tc, cam) {
    var pts = [], i, x;
    for (i = 0; i < n; i++) {
      x = 0.5 * (1 + Math.cos(Math.PI * i / (n - 1)));
      pts.push([x, cam * 4 * x * (1 - x) + naca(x, tc)]);
    }
    for (i = n - 2; i >= 1; i--) {
      x = 0.5 * (1 + Math.cos(Math.PI * i / (n - 1)));
      pts.push([x, cam * 4 * x * (1 - x) - naca(x, tc)]);
    }
    return pts;
  }
  function cr1(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  function resample(tab, n) {
    var m = tab.length, cols = tab[0].length, out = [], i, c;
    for (i = 0; i < n; i++) {
      var u = i / (n - 1) * (m - 1), k = Math.min(m - 2, Math.floor(u)), t = u - k, row = [];
      for (c = 0; c < cols; c++)
        row.push(cr1(tab[Math.max(0, k - 1)][c], tab[k][c], tab[k + 1][c], tab[Math.min(m - 1, k + 2)][c], t));
      out.push(row);
    }
    return out;
  }
  /* The body table is resampled so the loft is smooth, but the rows' d values
     are not evenly spaced: a Catmull-Rom spline in the row index would bunch
     the stations where the table is dense. So resample by d instead. */
  function resampleD(tab, n) {
    var d0 = tab[0][0], d1 = tab[tab.length - 1][0], out = [], i, j, c;
    for (i = 0; i < n; i++) {
      var d = d0 + (d1 - d0) * i / (n - 1), k = 0;
      for (j = 1; j < tab.length - 1; j++) if (tab[j][0] <= d) k = j;
      var a = tab[k], b = tab[k + 1], t = (d - a[0]) / Math.max(1e-6, b[0] - a[0]);
      var p0 = tab[Math.max(0, k - 1)], p3 = tab[Math.min(tab.length - 1, k + 2)], row = [d];
      for (c = 1; c < a.length; c++) row.push(cr1(p0[c], a[c], b[c], p3[c], t));
      out.push(row);
    }
    return out;
  }
  function zwOf(zt, zb) { return zb + 0.52 * (zt - zb); }
  function secAt(d, tab) {
    tab = tab || A.SEC;
    if (d <= tab[0][0]) return tab[0];
    for (var i = 1; i < tab.length; i++) {
      if (tab[i][0] >= d) {
        var a = tab[i - 1], b = tab[i], t = (d - a[0]) / Math.max(1e-6, b[0] - a[0]), r = [], c;
        for (c = 0; c < a.length; c++) r.push(a[c] + (b[c] - a[c]) * t);
        return r;
      }
    }
    return tab[tab.length - 1];
  }
  /* the wing at span station y: leading and trailing edge, mean plane, thickness */
  function wingAt(y) {
    var W = A.WING, i, a, b, t;
    y = Math.abs(y);
    if (y <= W[0][0]) return { dLE: W[0][1], dTE: W[0][2], zm: A.wz(y), tc: A.wtc(y) };
    for (i = 1; i < W.length; i++) {
      if (W[i][0] >= y) {
        a = W[i - 1]; b = W[i]; t = (y - a[0]) / (b[0] - a[0]);
        return { dLE: a[1] + (b[1] - a[1]) * t, dTE: a[2] + (b[2] - a[2]) * t, zm: A.wz(y), tc: A.wtc(y) };
      }
    }
    b = W[W.length - 1];
    return { dLE: b[1], dTE: b[2], zm: A.wz(y), tc: A.wtc(y) };
  }
  /* height of the upper or lower wing skin at span y, d aft of the nose */
  function wingZ(y, d, upper) {
    var w = wingAt(y), c = w.dTE - w.dLE, x = Math.min(1, Math.max(0, (d - w.dLE) / c));
    return w.zm + (A.camber * 4 * x * (1 - x) + (upper ? 1 : -1) * naca(x, w.tc)) * c;
  }

  /* ========================================================== fuselage ==
     The coats part along one line of the hull, the ring angle nearest V.low
     (judged by height the two triangles of a quad fell on either side
     wherever the section changes, and the edge came out saw-toothed). */
  var NF = 30;
  function addFuselage(THREE, g, T, V) {
    var rows = A.SEC;
    var rings = rows.map(function (s) { return secRing(X(s[0]), 0, s[1], s[2], s[3], zwOf(s[2], s[3]), s[4], NF); });
    var tq = 2 * Math.PI / NF, td = Math.asin(sgp(Math.pow(Math.abs(V.low), 1 / 0.86), 1) * (V.low < 0 ? -1 : 1));
    var sd = Math.sin(Math.round(td / tq) * tq);
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz) {
      var s = secAt(A.NOSE - cx, rows), zw = zwOf(s[2], s[3]), e = s[4];
      var u = Math.max(-1, Math.min(1, cy / Math.max(0.01, s[1])));
      var v = Math.max(-1, Math.min(1, (cz - zw) / Math.max(0.01, cz >= zw ? s[2] - zw : zw - s[3])));
      return Math.sin(Math.atan2(sgp(v, 1 / e), sgp(u, 1 / e))) < sd - 1e-6 ? "low" : "top";
    });
  }
  /* glass or a dark panel laid on the hull between stations and angles, a
     centimetre proud */
  function hullPatch(THREE, d0, d1, t0, t1, nd, nt) {
    var pos = [], idx = [], i, j;
    for (i = 0; i <= nd; i++) {
      var d = d0 + (d1 - d0) * i / nd, s = secAt(d), zw = zwOf(s[2], s[3]);
      for (j = 0; j <= nt; j++) {
        var t = (t0 + (t1 - t0) * j / nt) * D2R, c = Math.cos(t), sn = Math.sin(t), e = s[4];
        var z = sn >= 0 ? zw + (s[2] - zw) * sgp(sn, e) : zw + (zw - s[3]) * sgp(sn, e);
        pos.push(X(d), s[1] * sgp(c, e) * 1.012, zw + (z - zw) * 1.012 + 0.008);
      }
    }
    for (i = 0; i < nd; i++) for (j = 0; j < nt; j++) {
      var a = i * (nt + 1) + j, b = a + 1, cc = a + nt + 1, dd = cc + 1;
      idx.push(a, cc, b, b, cc, dd);
    }
    var g = geoFrom(THREE, pos, idx);
    g.computeVertexNormals();
    return g;
  }
  function addCockpit(THREE, g, T, V) {
    if (A.id === "kc135") {
      /* the 135's flight deck: a row of small panes round the nose top */
      g.add(new THREE.Mesh(hullPatch(THREE, 1.75, 2.45, 52, 128, 2, 7), T.glass));
      g.add(new THREE.Mesh(hullPatch(THREE, 2.5, 3.3, 38, 54, 2, 2), T.glass));
      g.add(new THREE.Mesh(hullPatch(THREE, 2.5, 3.3, 126, 142, 2, 2), T.glass));
    } else {
      /* the 767's six panes: a four-pane windscreen and a side window each side */
      g.add(new THREE.Mesh(hullPatch(THREE, 2.1, 3.2, 52, 128, 3, 8), T.glass));
      g.add(new THREE.Mesh(hullPatch(THREE, 3.25, 4.0, 36, 56, 2, 2), T.glass));
      g.add(new THREE.Mesh(hullPatch(THREE, 3.25, 4.0, 124, 144, 2, 2), T.glass));
      /* the aerial refuelling receptacle, a dark slipway on the crown behind the deck */
      g.add(new THREE.Mesh(hullPatch(THREE, 6.4, 8.8, 84, 96, 3, 1), T.ink));
    }
  }

  /* ============================================================== tail == */
  function addTail(THREE, g, T, V) {
    var NFOIL = 9, rings = [], s, i;
    /* fin */
    A.FIN.forEach(function (f) {
      var c = f[2] - f[1];
      rings.push(foil(NFOIL, f[3], 0).map(function (p) { return [X(f[1] + p[0] * c), p[1] * c, f[0]]; }));
    });
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz) {
      return cz > A.finTeam ? "team" : V.tailTop;
    });
    /* the 135's small fin-top cap, swept forward over the leading edge */
    if (A.id === "kc135") {
      var top = A.FIN[A.FIN.length - 1];
      emit(THREE, g, plate(THREE, [[X(top[1] - 1.5), top[0] - 0.1], [X(top[2] + 0.05), top[0] - 0.1],
        [X(top[2] + 0.05), top[0] + 0.07], [X(top[1] - 1.2), top[0] + 0.07]], 0, 0.06), T, function () { return "team"; });
    }
    /* stabilisers */
    for (s = -1; s <= 1; s += 2) {
      var sr = A.STAB.map(function (st) {
        var y = st[0], c = st[2] - st[1], zm = A.sz(y), tc = A.stc(y);
        return foil(NFOIL, tc, 0).map(function (p) { return [X(st[1] + p[0] * c), s * y, zm + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, sr, true, true), T, function (cx, cy, cz, nx, ny, nz) {
        return nz < 0 ? "low" : V.stabTop;
      });
    }
  }

  /* ============================================================= wings == */
  function addWings(THREE, g, T, V) {
    for (var s = -1; s <= 1; s += 2) {
      var rings = A.WING.map(function (st) {
        var y = st[0], c = st[2] - st[1], zm = A.wz(y), tc = A.wtc(y);
        return foil(11, tc, A.camber).map(function (p) { return [X(st[1] + p[0] * c), s * y, zm + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz, nx, ny, nz) {
        if (nz < 0) return "low";
        return Math.abs(cy) > A.yTeam ? "team" : V.wingTop;
      });
    }
    /* the wing-body fairing of the 767: the wing root blends into a bulge in
       the lower body that the plain loft does not make */
    if (A.id === "kc46") {
      var fr = egg(THREE, T[V.nacTop], 7.2, 2.95, 0.95, X(23.4), 0, -1.95, 16, 8);
      g.add(fr);
    }
  }

  /* =========================================================== engines ==
     Profiles: [aft of the lip, radius]; the first row is the inner wall of
     the intake a little way down, the second the lip itself.
     J57: the slim turbojet pod, 1.25 m across at its widest, measured off
     the 3-view. CFM56: a fan cowl 1.95 m across, a step where the fan air
     leaves, and the core cowl behind it. PW4062: the 767's pod, 2.7 m across,
     the fan cowl short and the core long and tapering to its plug.         */
  var J57 = [[0.30, 0.44], [0.0, 0.48], [0.12, 0.53], [0.5, 0.60], [1.1, 0.625], [2.2, 0.625], [3.0, 0.60],
             [3.6, 0.55], [4.4, 0.47], [5.0, 0.41], [5.5, 0.36]];
  var CFM56 = [[0.35, 0.80], [0.0, 0.88], [0.15, 0.94], [0.5, 0.975], [1.4, 0.975], [2.0, 0.93], [2.25, 0.62],
               [3.2, 0.56], [4.0, 0.44], [4.6, 0.30]];
  var PW4062 = [[0.50, 1.12], [0.0, 1.20], [0.25, 1.30], [0.8, 1.35], [1.8, 1.345], [2.8, 1.30], [3.35, 1.17],
                [3.4, 0.92], [4.2, 0.88], [5.0, 0.74], [5.5, 0.55], [5.9, 0.25]];
  function nacRule(V) {
    return function (cx, cy, cz, nx, ny, nz) {
      return nx < -0.75 ? "hot" : (nz < V.nlow ? "low" : V.nacTop);
    };
  }
  function addEngines(THREE, g, T, V) {
    var prof = V.eng === "J57" ? J57 : (V.eng === "CFM56" ? CFM56 : PW4062);
    var L = prof[prof.length - 1][0], R0 = prof[0][1], rule = nacRule(V), tf = V.eng !== "J57";
    var Rm = 0;
    prof.forEach(function (r) { Rm = Math.max(Rm, r[1]); });
    V.pods.forEach(function (p) {
      for (var s = -1; s <= 1; s += 2) {
        var yc = s * p.y, dF = p.lip, zc = p.z;
        emit(THREE, g, lathe(THREE, prof, tf ? 18 : 14, X(dF), yc, zc, false, true), T, rule);
        g.add(disc(THREE, T.ink, R0 + 0.01, X(dF + prof[0][0]), yc, zc, tf ? 18 : 14));
        g.add(disc(THREE, T.hot, prof[prof.length - 1][1] + 0.02, X(dF + L + 0.01), yc, zc, 12));
        if (tf) {
          /* the fan spinner */
          var sp = outward(lathe(THREE, [[0, 0.02], [0.22, 0.17], [0.46, 0.27]], 8, X(dF + prof[0][0] - 0.46), yc, zc, false, true));
          sp.computeVertexNormals();
          g.add(new THREE.Mesh(sp, T.metal));
        }
        /* the pylon: from the top of the pod up and back to the wing's leading edge */
        var w = wingAt(p.y), a1 = tf ? 1.2 : 1.4, a2 = tf ? 4.4 : 4.0, dT1 = w.dLE + 0.2, dT2 = w.dLE + 3.2;
        if (V.eng === "PW4062") { a1 = 1.8; a2 = 4.6; dT1 = w.dLE + 0.4; dT2 = w.dLE + 3.6; }
        var zT1 = wingZ(p.y, dT1, false) + 0.05, zT2 = wingZ(p.y, dT2, false) + 0.05;
        var th = V.eng === "PW4062" ? 0.22 : (tf ? 0.17 : 0.14);
        emit(THREE, g, plate(THREE, [[X(dF + a1), zc + Rm * 0.55], [X(dF + a2), zc + Rm * 0.62], [X(dT2), zT2], [X(dT1), zT1]], yc, th), T, rule);
      }
    });
    /* the KC-46's wing aerial refuelling pods, one under each wing outboard of the engine */
    if (V.wingPods) {
      var POD = [[0, 0.10], [0.3, 0.28], [0.9, 0.41], [1.6, 0.43], [3.3, 0.43], [3.8, 0.34], [4.2, 0.14]];
      for (var q = -1; q <= 1; q += 2) {
        var py = 15.2, dpl = wingAt(py).dLE - 2.6, zp = wingZ(py, dpl + 1.5, false) - 0.78;
        emit(THREE, g, lathe(THREE, POD, 12, X(dpl), q * py, zp, true, true), T, function (cx, cy, cz, nx) {
          return nx < -0.8 ? "hot" : "low";
        });
        emit(THREE, g, plate(THREE, [[X(dpl + 0.7), zp + 0.30], [X(dpl + 3.0), zp + 0.30],
          [X(dpl + 3.6), wingZ(py, dpl + 3.6, false) + 0.05], [X(dpl + 0.5), wingZ(py, dpl + 0.5, false) + 0.05]], q * py, 0.10), T, function () { return "low"; });
      }
    }
  }

  /* =============================================================== boom ==
     The flying boom stowed under the tail: the operator's bay as a fairing
     on the belly, the tube trailing aft along the upsweep of the tail cone and
     the two ruddevators near its end, a V open upward. */
  function addBoom(THREE, g, T, V) {
    var B = A.boom, P = A.podBay, s;
    g.add(egg(THREE, T.low, P.rx, P.ry, P.rz, X(P.d), 0, P.z, 14, 8));
    g.add(taper(THREE, T.low, [X(B.d0), 0, B.z0], [X(B.d1), 0, B.z1], B.r0, B.r1, 10));
    /* the nozzle end */
    g.add(disc(THREE, T.hot, B.r1 + 0.01, X(B.d1 + 0.01), 0, B.z1, 10));
    var big = A.id === "kc46", f = (B.rud - B.d0) / (B.d1 - B.d0), zr = B.z0 + (B.z1 - B.z0) * f;
    for (s = -1; s <= 1; s += 2) {
      var rd = new THREE.Mesh(new THREE.BoxGeometry(big ? 1.5 : 1.0, big ? 2.1 : 1.3, 0.06), T.low);
      rd.position.set(X(B.rud + (big ? 0.7 : 0.5)), s * (big ? 0.75 : 0.5), zr + (big ? 0.62 : 0.4));
      rd.rotation.x = s * 42 * D2R;
      g.add(rd);
    }
  }

  /* ============================================================== gear ==
     Named "gear": render3d.js stows it in cruise. The tyres are the lowest
     opaque thing on the aeroplane, which is what the parking code needs. */
  function addGear(THREE, g, T, V) {
    var gear = new THREE.Group(), G = A.gear, s, i, GR = A.GROUND;
    gear.name = "gear";
    /* nose: twin tyres on a single leg */
    var nd = G.nose, nz = GR + nd.R, nb = secAt(nd.d)[3];
    for (s = -1; s <= 1; s += 2) {
      var t = new THREE.Mesh(new THREE.CylinderGeometry(nd.R, nd.R, nd.W, 14, 1), T.tyre);
      t.position.set(X(nd.d), s * nd.tr, nz);
      gear.add(t);
      var h = new THREE.Mesh(new THREE.CylinderGeometry(nd.R * 0.55, nd.R * 0.55, nd.W + 0.03, 10, 1), T.metal);
      h.position.set(X(nd.d), s * nd.tr, nz);
      gear.add(h);
    }
    gear.add(taper(THREE, T.metal, [X(nd.d - 0.1), 0, nb + 0.2], [X(nd.d), 0, nz], 0.11, 0.09, 8));
    gear.add(taper(THREE, T.metal, [X(nd.d), -nd.tr, nz], [X(nd.d), nd.tr, nz], 0.05, 0.05, 6));
    gear.add(new THREE.Mesh(hullPatch(THREE, nd.d - 0.7, nd.d + 0.7, -118, -62, 2, 3), T.ink));
    /* mains: a truck of two or three axles of dual tyres each side */
    var M = G.main, mz = GR + M.R, dmid = (M.ax[0] + M.ax[M.ax.length - 1]) / 2;
    gear.add(new THREE.Mesh(hullPatch(THREE, M.wellD - M.wellL / 2, M.wellD + M.wellL / 2, -90 - M.wellA, -90 + M.wellA, 4, 4), T.ink));
    for (s = -1; s <= 1; s += 2) {
      var yc = s * M.y;
      for (i = 0; i < M.ax.length; i++) {
        [-1, 1].forEach(function (o) {
          var tt = new THREE.Mesh(new THREE.CylinderGeometry(M.R, M.R, M.W, 14, 1), T.tyre);
          tt.position.set(X(M.ax[i]), yc + o * M.du, mz);
          gear.add(tt);
          var hh = new THREE.Mesh(new THREE.CylinderGeometry(M.R * 0.55, M.R * 0.55, M.W + 0.03, 10, 1), T.metal);
          hh.position.set(X(M.ax[i]), yc + o * M.du, mz);
          gear.add(hh);
        });
        gear.add(taper(THREE, T.metal, [X(M.ax[i]), yc - M.du, mz], [X(M.ax[i]), yc + M.du, mz], 0.06, 0.06, 6));
      }
      /* the truck beam and the leg up into the wing */
      gear.add(taper(THREE, T.metal, [X(M.ax[0]), yc, mz + 0.05], [X(M.ax[M.ax.length - 1]), yc, mz + 0.05], 0.09, 0.09, 6));
      var top = wingZ(M.y, dmid, false) + 0.1;
      gear.add(taper(THREE, T.metal, [X(dmid), yc, top], [X(dmid), yc, mz + 0.05], 0.14, 0.11, 8));
    }
    g.add(gear);
  }

  /* ===================================================== merge by material ==
     Each mesh costs a draw call, and one more for the shadow pass, per
     aircraft on screen: everything sharing a material becomes one geometry,
     the "gear" group kept a group of its own so the renderer can stow it. */
  function mergeByMaterial(THREE, root) {
    var main = { order: [], by: {} }, gear = { order: [], by: {} };
    (function walk(node, pm, inGear) {
      for (var i = 0; i < node.children.length; i++) {
        var c = node.children[i];
        c.updateMatrix();
        var m = pm.clone().multiply(c.matrix);
        var ing = inGear || c.name === "gear";
        if (c.isMesh) {
          var b = ing ? gear : main, key = c.material.uuid;
          if (!b.by[key]) { b.by[key] = { mat: c.material, parts: [] }; b.order.push(key); }
          var geo = c.geometry.index ? c.geometry.toNonIndexed() : c.geometry.clone();
          geo.applyMatrix4(m);
          b.by[key].parts.push(geo);
        } else walk(c, m, ing);
      }
    })(root, new THREE.Matrix4(), false);
    function out(bucket, into) {
      for (var i = 0; i < bucket.order.length; i++) {
        var e = bucket.by[bucket.order[i]], n = 0, k, o = 0;
        for (k = 0; k < e.parts.length; k++) n += e.parts[k].attributes.position.count;
        var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2);
        for (k = 0; k < e.parts.length; k++) {
          var a = e.parts[k].attributes;
          P.set(a.position.array, o * 3);
          N.set(a.normal.array, o * 3);
          if (a.uv) U.set(a.uv.array, o * 2);
          o += a.position.count;
        }
        var geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
        geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
        geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
        into.add(new THREE.Mesh(geo, e.mat));
      }
    }
    var res = new THREE.Group();
    out(main, res);
    var gr = new THREE.Group();
    gr.name = "gear";
    out(gear, gr);
    res.add(gr);
    return res;
  }

  /* ============================================================= build == */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.N;
    A = V.af;
    if (!A.SEC) A.SEC = resampleD(A.FUS, 56);
    var T = materials(THREE, C, V);
    var g = new THREE.Group();
    addFuselage(THREE, g, T, V);
    addCockpit(THREE, g, T, V);
    addTail(THREE, g, T, V);
    addWings(THREE, g, T, V);
    addEngines(THREE, g, T, V);
    addBoom(THREE, g, T, V);
    addGear(THREE, g, T, V);
    return mergeByMaterial(THREE, g);
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent, nose to the end of the boom */
UNIT_MODELS["nato_e60_tanker"] = {
  len: 41.5,
  build: function (THREE, M, C) { return HeroTankers.build(THREE, M, C, "A"); }
};
UNIT_MODELS["nato_e90_tanker"] = {
  len: 41.5,
  build: function (THREE, M, C) { return HeroTankers.build(THREE, M, C, "R"); }
};
UNIT_MODELS["tanker_n"] = {
  len: 50.5,
  build: function (THREE, M, C) { return HeroTankers.build(THREE, M, C, "N"); }
};
