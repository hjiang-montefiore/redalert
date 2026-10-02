/* ================= us_c130_hercules.js  -  HERO MODEL =================
   Lockheed C-130 Hercules: the transport and the gunship. One airframe, a
   guise for each of the ten rows that draw it (js/heavyair.js herc() and
   spectre(), js/eras.js for the RAF):

     nato_e50_airlift    "A50"  C-130A: three-blade Aeroproducts paddles on
                                the T56-A-9, no underwing tanks, white over bare
                                metal.
     nato_e80_airlift    "H80"  C-130H: the same airframe on Hamilton
                                Standard four-blade props, European One green.
     airlift_n           "J20"  C-130J-30 Super Hercules: 15 ft stretch in two
                                plugs, six-blade scimitar props, the slim
                                AE2100 nacelle with its chin scoop.
     gbr_e60_airlift     "K60"  Hercules C.1 (C-130K): the short body, four
                                blades, white over bare metal as delivered.
     gbr_e80_airlift     "K80"  Hercules C.3: the C-130K stretched 15 ft, the
                                refuelling probe over the flight deck,
                                RAF dark green and dark sea grey.
     gbr_e90_airlift     "K90"  the same C.3 in the 1990s fleet finish.
     nato_e60_gunshipair "G60"  AC-130A Spectre: four 7.62 mm miniguns and four
                                20 mm Vulcans on the port side forward of the
                                gear, no underwing tanks, SEA tan and green
                                over black.
     nato_e80_gunshipair "G80"  AC-130H Spectre: two 20 mm forward, the 40 mm
                                Bofors above the gear, the 105 mm howitzer aft
                                of it, the sensor ball, gunship grey.
     nato_e00_gunshipair "G00"  AC-130U Spooky II: the five-barrel 25 mm in
                                the place of the Vulcans, 40 mm and 105 mm.
     gunshipair_n        "G20"  AC-130J Ghostrider: the 30 mm GAU-23 forward,
                                the 105 mm aft, a chin sensor ball, six-blade
                                props. Built on the MC-130J, the short body.
   No other row draws this airframe: the roster has no KC-130, EC-130, HC-130
   or ROC, French or German Hercules (the Transall, Noratlas and A400M rows are
   other aeroplanes and keep standing in on the first model of their role).

   References (Wikimedia Commons, each fetched once):
     - "Lockheed C-130 Hercules 3-view.png" (public domain): span 40.4 m,
       length 29.8 m, fin top 11.66 m; the wing a constant 5.1 m chord out to
       the inboard nacelle (5.3 m) and then tapering to a 2.0 m tip (area
       160 m2 against the published 162.1), the engines at 5.3 m and 10.2 m
       out, the prop plane 8.9 m aft of the nose and 2.4 m ahead of the wing,
       the tanks between the engines, the fin 5.8 m at the root and 2.1 m at
       the tip with its leading edge 23 deg, the 16 m tailplane on top of the
       tail cone, and the belly rising straight to the tail from behind the
       gear.
     - "Lockheed Martin AC-130U Line Drawing.svg" (Jetijones, CC BY 3.0): the
       port side - the sensor ball just behind the nose gear, the gear
       fairing from 9.5 to 17.1 m with the main wheels in tandem at 12.6 and
       13.9 m, the nose gear at 4.1 m, the guns out of the left side, the
       105 mm well aft of the others.
     - "AC-130H flies along Northwest Florida coast.jpg", the AC-130J
       landing photograph over Hurlburt Field (its Commons title is in
       Cyrillic) and "Refueling AC-130J over U S CENTCOM (8942243).jpg": the
       fuel tanks between the engines on both the H and the J and NOTHING else
       under either wing - no pylon, no store - so none is drawn; the six-blade
       scimitar props of the J; the long thin barrel sticking out of the left
       side below the wing; the chin ball of the J.
     - "AC-130A pylon turn.jpg": the barrel and the ball under the left side of
       the A's flight deck.
     - "Lockheed C-130K Hercules C.3 XV307 of the RAF - 2006 RIAT at RAF
       Fairford.jpg": the RAF's dark green all over, belly included.
   Published: C-130H 97 ft 9 in (29.79 m), span 132 ft 7 in (40.41 m), 13 ft 6
   in props (4.11 m); C-130J-30 112 ft 9 in (34.36 m), the stretch 5 ft ahead
   of the wing and 10 ft behind it; AC-130J on the MC-130J, 97 ft 9 in and 38 ft
   10 in high (11.84 m); C-130K C.3 stretched 15 ft (4.6 m) by Marshall.

   Model space: +X nose, +Y left, +Z up, real metres; z = 0 is the fuselage
   axis, 2.75 m above the ground, and every height below is given above the
   ground (zg) and converted by Z(). Stations are d, metres aft of the nose of
   the short body; the stretch is applied by dm() and the wing frame.
   Paint: canvas sheets cached at module scope, two coats per guise (top and
   low) plus the team flash on the fin tip and the outer wing, which is
   exactly C.team. The props are static blades under a see-through blur disc.
   Everything is baked into one mesh per material before it is returned
   (mergeByMaterial), the gear in a group of its own: the wheels are the lowest
   opaque thing on the aeroplane, as the parking code needs.
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroC130 = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var GZ = 2.75;                 /* the ground lies this far below the fuselage axis */
  var NOSE = 14.9, S1 = 0, S2 = 0;   /* set per build: nose X, the forward and aft plugs */
  var PA = 9.6, PB = 17.6;       /* the plug stations: ahead of the wing, behind it */
  var RP = 2.06;                 /* 13 ft 6 in propellers */
  function X(d) { return NOSE - d; }
  function Z(zg) { return zg - GZ; }
  function dm(d) { return d + (d > PA ? S1 : 0) + (d > PB ? S2 : 0); }
  function sgp(v, e) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), e); }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ---------------------------------------------------------------- rows --
     s1, s2: the stretch plugs (15 ft in all). prop: blades. nac: T56 or the
     slimmer AE2100 with a chin scoop. low: where the under coat stops on the
     fuselage side, as a fraction of the section above (+) or below (-) its
     widest line. fin: its height above the tail's top line (6.95 m makes
     11.66 m, 7.1 the J's 11.84 m). probe: how far the refuelling probe stands
     ahead of the radome. ball: the sensor ball. rec: the receptacle. tanks:
     false for the C-130A and the AC-130A, which fly without the underwing
     tanks (AC-130A photograph: the wing clean between the engines).         */
  var VARIANTS = {
    A50: { id: "A50", len: 29.79, s1: 0, s2: 0, prop: 3, blade: "paddle", nac: "t56", paint: "white", low: 0.12, fin: 6.95, tanks: false },
    H80: { id: "H80", len: 29.79, s1: 0, s2: 0, prop: 4, blade: "paddle", nac: "t56", paint: "lizard", low: -0.25, fin: 6.95 },
    J20: { id: "J20", len: 34.36, s1: 1.52, s2: 3.05, prop: 6, blade: "scimitar", nac: "ae", paint: "ghost", low: -0.4, fin: 7.10 },
    K60: { id: "K60", len: 29.79, s1: 0, s2: 0, prop: 4, blade: "paddle", nac: "t56", paint: "white", low: 0.12, fin: 6.95 },
    K80: { id: "K80", len: 34.36, s1: 1.52, s2: 3.05, prop: 4, blade: "paddle", nac: "t56", paint: "olive", low: -0.3, fin: 6.95, probe: 1.0 },
    K90: { id: "K90", len: 34.36, s1: 1.52, s2: 3.05, prop: 4, blade: "paddle", nac: "t56", paint: "olive2", low: -0.3, fin: 6.95, probe: 1.0 },
    G60: { id: "G60", len: 29.79, s1: 0, s2: 0, prop: 3, blade: "paddle", nac: "t56", paint: "sea", low: 0.2, fin: 6.95, tanks: false, guns: "A", ball: "fwd" },
    G80: { id: "G80", len: 29.79, s1: 0, s2: 0, prop: 4, blade: "paddle", nac: "t56", paint: "grey", low: -0.4, fin: 6.95, guns: "H", ball: "fwd", rec: true },
    G00: { id: "G00", len: 29.79, s1: 0, s2: 0, prop: 4, blade: "paddle", nac: "t56", paint: "grey2", low: -0.4, fin: 6.95, guns: "U", ball: "fwd", rec: true },
    G20: { id: "G20", len: 29.79, s1: 0, s2: 0, prop: 6, blade: "scimitar", nac: "ae", paint: "grey3", low: -0.4, fin: 7.10, guns: "J", ball: "chin", rec: true }
  };
  function lenOf(which) { var V = VARIANTS[which]; return V.len + (V.probe || 0); }

  /* --------------------------------------------------------------- paint --
     white:  the early USAF and RAF Transport Command finish, gloss white over
             bare alloy (the low coat is the metal).
     lizard: European One, FS 34092 dark green and a grey, light grey belly.
     olive:  RAF dark green with dark sea grey, belly included (XV307, 2006);
             olive2 the greyer 1990s low-visibility wear of the same.
     sea:    T.O. 1-1-4 South-East Asia tan and greens over black, the AC-130A
             of 1969-70 (as the B-52D of js/hero/us_b52_stratofortress.js).
     grey:   gunship grey FS 36118 for the AC-130H, grey2 the U's, grey3 the
             J's; ghost the C-130J's light Compass Ghost FS 36375.          */
  var SHEETS = {
    white:  { top: { base: "#cdd1d3", spots: [["#c3c8cb", 18, 10, 26]], seam: 0.14, seed: 3101 },
              low: { base: "#a4abb0", spots: [["#989fa4", 14, 12, 30]], seam: 0.20, seed: 3102, gloss: true } },
    lizard: { top: { base: "#46553f", spots: [["#34432f", 9, 46, 80], ["#7a8268", 7, 40, 70]], seam: 0.10, seed: 3201 },
              low: { base: "#8a9297", spots: [["#80888d", 12, 16, 40]], seam: 0.09, seed: 3202 } },
    olive:  { top: { base: "#4b5841", spots: [["#3a4535", 9, 46, 80], ["#5f6657", 8, 40, 72]], seam: 0.10, seed: 3301 },
              low: { base: "#505b49", spots: [["#47523f", 12, 16, 40]], seam: 0.09, seed: 3302 } },
    olive2: { top: { base: "#4a5446", spots: [["#3c453b", 9, 46, 80], ["#5b6359", 8, 40, 72]], seam: 0.10, seed: 3401 },
              low: { base: "#535c52", spots: [["#4a534a", 12, 16, 40]], seam: 0.09, seed: 3402 } },
    sea:    { top: { base: "#59663f", spots: [["#9a8763", 9, 46, 80], ["#36412f", 9, 46, 80]], seam: 0.10, seed: 3501 },
              low: { base: "#26282b", spots: [["#2e3033", 12, 16, 40]], seam: 0.10, seed: 3502 } },
    grey:   { top: { base: "#545a5f", spots: [["#4d5358", 18, 12, 34], ["#5b6166", 16, 12, 30]], seam: 0.11, seed: 3601 },
              low: { base: "#52585d", spots: [["#4c5257", 12, 14, 36]], seam: 0.09, seed: 3602 } },
    grey2:  { top: { base: "#595f64", spots: [["#52585d", 18, 12, 34], ["#60666b", 16, 12, 30]], seam: 0.11, seed: 3701 },
              low: { base: "#575d62", spots: [["#51575c", 12, 14, 36]], seam: 0.09, seed: 3702 } },
    grey3:  { top: { base: "#5d6469", spots: [["#565d62", 18, 12, 34], ["#656c71", 16, 12, 30]], seam: 0.10, seed: 3801 },
              low: { base: "#5b6267", spots: [["#555c61", 12, 14, 36]], seam: 0.08, seed: 3802 } },
    ghost:  { top: { base: "#8e959a", spots: [["#868d92", 16, 12, 34], ["#969da2", 14, 12, 30]], seam: 0.10, seed: 3901 },
              low: { base: "#8b9297", spots: [["#838a8f", 12, 14, 36]], seam: 0.08, seed: 3902 } }
  };

  /* ============================================================== sheets ==
     Planar UVs (u = X/40, v = (Y + 0.55 Z)/40, repeating): the sheet is the
     airframe seen from above and a little from the side. Cached at module
     scope: build() runs per key, team and era.                             */
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
     guns, spinners; the tyres at roughness 0.95. GLASS. The blur is the
     propeller disc: transparent and depthWrite off, so the parking code does
     not stand the aeroplane on it.                                         */
  function materials(THREE, C, V) {
    var P = SHEETS[V.paint];
    function coat(which) {
      var s = P[which], t = sheet(THREE, V.paint + "/" + which, s);
      var m = new THREE.MeshStandardMaterial({ color: 0xffffff,
        roughness: s.gloss ? 0.5 : 0.86, metalness: s.gloss ? 0.35 : 0.08, side: THREE.DoubleSide });
      if (t) m.map = t; else m.color.set(s.base);
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
      ink: new THREE.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide }),
      blade: new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 0.62, metalness: 0.3, side: THREE.DoubleSide }),
      tyre: new THREE.MeshStandardMaterial({ color: 0x070809, roughness: 0.95, metalness: 0.04 }),
      blur: new THREE.MeshStandardMaterial({ color: 0xd2d8dc, roughness: 0.5, metalness: 0.0,
        transparent: true, opacity: 0.11, depthWrite: false, side: THREE.DoubleSide }),
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
     team flash and the dark parts by rule(centroid, face normal). */
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
  /* body of revolution (or a rounded box, with w, h, e) along -X:
     prof rows [aft of the front, half width, half height] */
  function lathe(THREE, prof, N, x0, yc, zc, e, capA, capB) {
    var rings = [], i;
    for (i = 0; i < prof.length; i++) {
      var w = Math.max(prof[i][1], 0.004), h = Math.max(prof[i].length > 2 ? prof[i][2] : prof[i][1], 0.004);
      rings.push(secRing(x0 - prof[i][0], yc, w, zc + h, zc - h, zc, e || 1, N));
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
  function strut(THREE, mat, a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 8, 1), mat);
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
  /* a flat disc facing along X (the propeller blur, nozzles) */
  function disc(THREE, mat, r, x, y, z, n) {
    var m = new THREE.Mesh(new THREE.CircleGeometry(r, n || 14), mat);
    m.rotation.y = Math.PI / 2;
    m.position.set(x, y, z);
    return m;
  }
  /* NACA 4-digit section, ring from the trailing edge over the top to the
     nose and back under; x along the chord, y across it, in chords */
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

  /* ========================================================== fuselage ==
     d, half width, top, bottom (both above the ground), squareness. Read off
     the 3-view and the AC-130U drawing scaled to 29.79 m: 3.4 m wide and 3.7
     m deep, the top line all but flat from the flight deck to the tail, the
     belly 0.9 m off the ground, the radome nose low (its tip 2.05 m up), and
     behind the gear the belly rising in one straight line to the tail
     cone's end 4 m up, the body narrowing to a blade under the fin. The two
     rows at PA and PB carry the stretch plugs: the same section, longer.   */
  var FUS = [
    [0.00, 0.05, 2.30, 1.80, 1.00], [0.25, 0.42, 2.92, 1.52, 0.96],
    [0.65, 0.78, 3.40, 1.26, 0.92], [1.15, 1.10, 3.80, 1.06, 0.90],
    [1.75, 1.36, 4.10, 0.97, 0.86], [2.50, 1.53, 4.34, 0.92, 0.82],
    [3.50, 1.64, 4.52, 0.91, 0.80], [4.80, 1.68, 4.61, 0.90, 0.78],
    [7.00, 1.68, 4.63, 0.90, 0.78], [9.60, 1.68, 4.64, 0.90, 0.78],
    [17.6, 1.68, 4.64, 0.92, 0.78], [19.6, 1.62, 4.66, 1.42, 0.78],
    [22.0, 1.42, 4.68, 2.06, 0.78], [24.5, 1.08, 4.70, 2.72, 0.80],
    [27.0, 0.78, 4.72, 3.36, 0.82], [29.0, 0.52, 4.72, 3.86, 0.84],
    [29.79, 0.38, 4.70, 3.95, 0.86]
  ];
  var NS = 60, NF = 40, RADOME = 2.2;   /* NF: the hull is round from the front at 40 points */
  function fusTable(V) {
    var rows = [], i, d, r;
    for (i = 0; i < FUS.length; i++) {
      d = FUS[i][0];
      r = [d, FUS[i][1], Z(FUS[i][2]), Z(FUS[i][3]), FUS[i][4]];
      if (d > PA) r[0] = d + V.s1;
      if (d > PB) r[0] = d + V.s1 + V.s2;
      rows.push(r);
      if (d === PA && V.s1) rows.push([PA + V.s1, r[1], r[2], r[3], r[4]]);
      if (d === PB && V.s2) rows.push([PB + V.s1 + V.s2, r[1], r[2], r[3], r[4]]);
    }
    return resample(rows, NS);
  }
  function zwOf(zt, zb) { return zb + 0.46 * (zt - zb); }
  function secAt(d, tab) {
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
  /* the port side of the hull at station d and height z */
  function hullY(tab, d, z) {
    var s = secAt(d, tab), zw = zwOf(s[2], s[3]);
    var v = z >= zw ? (z - zw) / Math.max(0.01, s[2] - zw) : (zw - z) / Math.max(0.01, zw - s[3]);
    v = Math.min(0.999, Math.max(0, v));
    var sn = Math.pow(v, 1 / s[4]), c = Math.sqrt(Math.max(0, 1 - sn * sn));
    return s[1] * Math.pow(c, s[4]);
  }
  function addFuselage(THREE, g, T, V, tab) {
    var rings = tab.map(function (s) { return secRing(X(s[0]), 0, s[1], s[2], s[3], zwOf(s[2], s[3]), s[4], NF); });
    /* The coats part along one line of the hull, the ring angle nearest
       V.low, so the edge falls on a ring line and not between two. */
    var tq = 2 * Math.PI / NF, td = Math.asin(sgp(Math.pow(Math.abs(V.low), 1 / 0.78), 1) * (V.low < 0 ? -1 : 1));
    var sd = Math.sin(Math.round(td / tq) * tq);
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz) {
      var d = NOSE - cx;
      if (d < RADOME) return "ink";
      var s = secAt(d, tab), zw = zwOf(s[2], s[3]), e = s[4];
      var u = Math.max(-1, Math.min(1, cy / Math.max(0.01, s[1])));
      var v = Math.max(-1, Math.min(1, (cz - zw) / Math.max(0.01, cz >= zw ? s[2] - zw : zw - s[3])));
      return Math.sin(Math.atan2(sgp(v, 1 / e), sgp(u, 1 / e))) < sd - 1e-6 ? "low" : "top";
    });
    /* the paratroop doors, one each side just behind the gear fairing, in
       the wing frame: the aft plug of the stretched bodies lies behind them */
    var dd = 19.0 + S1;
    for (var sd2 = -1; sd2 <= 1; sd2 += 2)
      g.add(box(THREE, T.ink, 1.0, 0.03, 1.7, X(dd), sd2 * (hullY(tab, dd, Z(2.9)) + 0.012), Z(2.9)));
    /* the air-refuelling receptacle behind the flight deck: AC-130H, U and J */
    if (V.rec) g.add(box(THREE, T.ink, 1.0, 0.5, 0.04, X(6.3), 0, Z(4.66)));
  }

  /* glass laid on the hull between stations and angles, a centimetre proud */
  function hullPatch(THREE, d0, d1, t0, t1, nd, nt, tab) {
    var pos = [], idx = [], i, j;
    for (i = 0; i <= nd; i++) {
      var d = d0 + (d1 - d0) * i / nd, s = secAt(d, tab), zw = zwOf(s[2], s[3]);
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
  function addCockpit(THREE, g, T, V, tab) {
    /* windscreen: four panes over the nose of the flight deck */
    g.add(new THREE.Mesh(hullPatch(THREE, 2.25, 3.4, 54, 126, 3, 8, tab), T.glass));
    /* the side windows, one each side */
    g.add(new THREE.Mesh(hullPatch(THREE, 3.2, 4.7, 34, 54, 2, 2, tab), T.glass));
    g.add(new THREE.Mesh(hullPatch(THREE, 3.2, 4.7, 126, 146, 2, 2, tab), T.glass));
  }

  /* ============================================================= wings ==
     Straight, high, on top of the body: a constant 5.1 m chord to 5.3 m out,
     then a linear taper to 2.0 m at the tip (leading edge 3.8 deg back, the
     trailing edge 8 deg forward), 18 per cent thick at the root and 12 at
     the tip, the tip 0.3 m above the root. In the wing frame, so the forward
     plug moves it aft with the engines, tanks and gear.                    */
  var CAMBER = 0.012;
  var WY = [0, 2.6, 5.3, 7.75, 10.3, 13.0, 16.0, 18.6, 20.2];
  function wingAt(Y) {
    var a = Math.abs(Y), k = Math.max(0, a - 5.3);
    return { dLE: 11.4 + 0.0671 * k + S1, c: 5.1 - 0.2080 * k, zc: Z(4.93 + 0.30 * a / 20.2), tc: 0.17 - 0.05 * a / 20.2 };
  }
  function wingZ(Y, d, upper) {
    var w = wingAt(Y), x = Math.min(1, Math.max(0, (d - w.dLE) / w.c));
    return w.zc + (CAMBER * 4 * x * (1 - x) + (upper ? 1 : -1) * naca(x, w.tc)) * w.c;
  }
  function addWings(THREE, g, T, V) {
    var s;
    for (s = -1; s <= 1; s += 2) {
      var rings = WY.map(function (Y) {
        var w = wingAt(Y);
        return foil(9, w.tc, CAMBER).map(function (p) { return [X(w.dLE + p[0] * w.c), s * Y, w.zc + p[1] * w.c]; });
      });
      emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz, nx, ny, nz) {
        if (nz < 0) return "low";
        return Math.abs(cy) > 17.9 ? "team" : "top";
      });
    }
  }

  /* ========================================================= sponsons ==
     The gear fairings on the lower body, 9.5 to 17.4 m aft of the nose (the
     AC-130U drawing), bulging 0.55 m out of the side.                      */
  var SPON = [[0.0, 0.10, 0.20], [0.5, 0.40, 0.55], [1.4, 0.55, 0.80], [6.4, 0.55, 0.84], [7.2, 0.42, 0.66], [7.9, 0.15, 0.30]];
  function addSponsons(THREE, g, T, V) {
    for (var s = -1; s <= 1; s += 2)
      emit(THREE, g, lathe(THREE, SPON, 12, X(9.5 + S1), s * 1.5, Z(1.55), 0.8, true, true), T,
        function (cx, cy, cz, nx, ny, nz) { return nz > 0.45 ? "top" : "low"; });
  }

  /* =========================================================== engines ==
     Four T56 (or AE2100) nacelles at 5.25 and 10.3 m, each hung under the
     leading edge, the prop plane 8.95 m aft of the nose. Props: static
     blades, 3 (A), 4 (H, K), 6 scimitar (J), each under a faint blur disc,
     and the spinner.                                                       */
  var NAC = {
    t56: { dF: 9.0, prof: [[0.0, 0.40], [0.18, 0.52], [0.7, 0.57], [2.2, 0.58], [3.2, 0.50], [3.9, 0.36]] },
    ae:  { dF: 8.95, prof: [[0.0, 0.36], [0.2, 0.46], [0.9, 0.52], [2.6, 0.54], [3.6, 0.46], [4.2, 0.32]] }
  };
  var SPIN = [[0, 0.03], [0.25, 0.16], [0.6, 0.29], [0.95, 0.35]];
  /* one blade: five stations, flat, pitched, swept back along the rotation
     for the scimitar; a = its angle round the axis, from up */
  function addBlade(THREE, g, T, V, x, yc, zc, a) {
    var RR = [0.34, 0.8, 1.3, 1.75, RP], pos = [], idx = [], k;
    var CH = V.blade === "scimitar" ? [0.26, 0.31, 0.30, 0.25, 0.14] : [0.30, 0.38, 0.40, 0.34, 0.22];
    var PT = [50, 40, 32, 26, 20];
    var er = [Math.sin(a), Math.cos(a)], et = [Math.cos(a), -Math.sin(a)];   /* radial and tangential in (Y, Z) */
    for (k = 0; k < 5; k++) {
      var r = RR[k], f = r / RP, sw = V.blade === "scimitar" ? 0.30 * f * f : 0;
      var rake = V.blade === "scimitar" ? -0.14 * f * f : 0, hc = CH[k] / 2, pr = PT[k] * D2R;
      var by = yc + er[0] * r, bz = zc + er[1] * r;
      pos.push(x + rake + hc * Math.sin(pr), by + et[0] * (sw + hc * Math.cos(pr)), bz + et[1] * (sw + hc * Math.cos(pr)));
      pos.push(x + rake - hc * Math.sin(pr), by + et[0] * (sw - hc * Math.cos(pr)), bz + et[1] * (sw - hc * Math.cos(pr)));
    }
    for (k = 0; k < 4; k++) idx.push(2 * k, 2 * k + 1, 2 * k + 2, 2 * k + 1, 2 * k + 3, 2 * k + 2);
    var bg = geoFrom(THREE, pos, idx);
    bg.computeVertexNormals();
    g.add(new THREE.Mesh(bg, T.blade));
  }
  function addEngines(THREE, g, T, V) {
    var nc = NAC[V.nac], dP = 8.95 + S1, dF = nc.dF + S1;
    [5.25, 10.3].forEach(function (Y) {
      for (var s = -1; s <= 1; s += 2) {
        var yc = s * Y, zc = Z(4.05 + 0.30 * Y / 20.2), k;
        emit(THREE, g, lathe(THREE, nc.prof, 20, X(dF), yc, zc, 1, false, true), T, function (cx, cy, cz, nx, ny, nz) {
          return nx < -0.75 ? "ink" : (nz < -0.35 ? "low" : "top");
        });
        g.add(disc(THREE, T.ink, nc.prof[0][1] + 0.01, X(dF), yc, zc, 16));
        var sp = outward(lathe(THREE, SPIN, 12, X(dP - 0.95), yc, zc, 1, false, true));
        sp.computeVertexNormals();
        g.add(new THREE.Mesh(sp, T.metal));
        for (k = 0; k < V.prop; k++) addBlade(THREE, g, T, V, X(dP), yc, zc, (k / V.prop + 0.07 * (Y > 6 ? 1 : 0) + 0.03 * s) * Math.PI * 2);
        g.add(disc(THREE, T.blur, RP, X(dP), yc, zc, 28));
        /* the web from the nacelle up into the leading edge */
        var wz = Z(4.05 + 0.30 * Y / 20.2);
        emit(THREE, g, plate(THREE, [[X(dF + 1.8), wz + 0.45], [X(dF + 3.7), wz + 0.45],
          [X(dF + 3.7), wingZ(Y, dF + 3.7, false) + 0.1], [X(dF + 2.4), wingZ(Y, dF + 2.4, false) + 0.1]], yc, 0.22), T,
          function (cx, cy, cz, nx, ny, nz) { return nz < 0 ? "low" : "top"; });
        /* the chin scoop under the spinner: a painted housing with a dark
           mouth, bigger on the AE2100 (AC-130H photograph, front view) */
        var sl = V.nac === "ae" ? 1.3 : 1.0, sw = V.nac === "ae" ? 0.5 : 0.55, sh = V.nac === "ae" ? 0.3 : 0.34;
        g.add(box(THREE, T.low, sl, sw, sh, X(dF + sl / 2 - 0.1), yc, zc - 0.6));
        g.add(box(THREE, T.ink, 0.04, sw * 0.8, sh * 0.7, X(dF - 0.12), yc, zc - 0.58));
      }
    });
  }

  /* ============================================================== tanks ==
     The 1,360 US gal underwing tanks between the engines, hung on a pylon: on
     the 3-view, in the H and J photographs and on the RAF C.3 (XV307), so on
     every row but the two A rows - the AC-130A photograph shows the wing
     clean between the engines, and nothing is drawn there that it does not.  */
  var TANK = [[0, 0.03], [0.4, 0.30], [1.1, 0.55], [2.0, 0.67], [3.4, 0.68], [4.0, 0.56], [4.5, 0.28], [4.75, 0.04]];
  function addTanks(THREE, g, T, V) {
    if (V.tanks === false) return;
    for (var s = -1; s <= 1; s += 2) {
      var Y = 7.75, dF = 9.75 + S1, zc = Z(2.9);
      emit(THREE, g, lathe(THREE, TANK, 18, X(dF), s * Y, zc, 1, true, true), T,
        function (cx, cy, cz, nx, ny, nz) { return nz < -0.2 ? "low" : "top"; });
      emit(THREE, g, plate(THREE, [[X(dF + 1.2), zc + 0.55], [X(dF + 3.9), zc + 0.55],
        [X(dF + 3.9), wingZ(Y, dF + 3.9, false) + 0.1], [X(dF + 1.8), wingZ(Y, dF + 1.8, false) + 0.1]], s * Y, 0.09), T,
        function (cx, cy, cz, nx, ny, nz) { return nz < 0 ? "low" : "top"; });
    }
  }

  /* ============================================================== tail ==
     The fin: 5.8 m at the root (23.2 to 29.0 aft of the nose) and 2.1 m at
     the tip, the leading edge 23 deg back and the trailing edge leaning 6 deg
     forward, on the tail's top line; the 16 m tailplane at 4.45 m on the
     tail cone.                                                             */
  function addTail(THREE, g, T, V) {
    var H = V.fin, Z0 = Z(4.72), NFOIL = 9, rings = [], T1 = S1 + S2;
    [-0.8, 0, H * 0.25, H * 0.5, H * 0.75, H - 1.3, H].forEach(function (h) {
      var dLE = 23.2 + 0.417 * h + T1, dTE = 29.0 - 0.115 * h + T1, c = dTE - dLE, tc = 0.11 - 0.02 * Math.max(0, h) / H;
      rings.push(foil(NFOIL, tc, 0).map(function (p) { return [X(dLE + p[0] * c), p[1] * c, Z0 + h]; }));
    });
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz) {
      return cz > Z0 + H - 1.3 + 0.01 ? "team" : "top";
    });
    for (var s = -1; s <= 1; s += 2) {
      var sr = [0.45, 1.3, 4.0, 8.02].map(function (y) {
        var dLE = 25.2 + (y - 0.45) * 0.1453 + T1, dTE = 28.5 - (y - 0.45) * 0.0264 + T1, c = dTE - dLE;
        return foil(NFOIL, 0.11 - 0.03 * y / 8.02, 0).map(function (p) { return [X(dLE + p[0] * c), s * y, Z(4.45) + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, sr, true, true), T, function (cx, cy, cz, nx, ny, nz) {
        if (nz < 0) return "low";
        return Math.abs(cy) > 6.6 ? "team" : "top";
      });
    }
  }

  /* ============================================================== guns ==
     Out of the LEFT side only: the renderer banks the AC-130 left and fires
     out of +Y. [kind, d, zg, barrel out of the hull, radius, muzzle radius];
     depressed 14 deg, the barrel from the hull side, a dark port panel
     behind it. The A: four miniguns and four Vulcans ahead of the gear (the
     1967 Gunship II fit; the game's row says four Vulcans). The
     H: two Vulcans, the Bofors above the gear fairing and the 105 mm aft of
     it. The U: the 25 mm where the Vulcans were. The J: the 30 mm there.   */
  var GUNS = {
    A: [["m7", 4.6, 2.5, 0.7, 0.035, 0.05], ["m7", 5.1, 2.5, 0.7, 0.035, 0.05],
        ["m7", 5.6, 2.5, 0.7, 0.035, 0.05], ["m7", 6.1, 2.5, 0.7, 0.035, 0.05],
        ["v20", 6.8, 2.2, 1.0, 0.065, 0.105], ["v20", 7.5, 2.2, 1.0, 0.065, 0.105],
        ["v20", 8.2, 2.2, 1.0, 0.065, 0.105], ["v20", 8.9, 2.2, 1.0, 0.065, 0.105]],
    H: [["v20", 6.2, 2.2, 1.0, 0.065, 0.105], ["v20", 7.1, 2.2, 1.0, 0.065, 0.105],
        ["b40", 10.4, 2.85, 1.5, 0.07, 0.09], ["h105", 17.9, 2.55, 1.9, 0.115, 0.17]],
    U: [["g25", 6.6, 2.15, 0.95, 0.085, 0.11], ["b40", 10.4, 2.85, 1.5, 0.07, 0.09], ["h105", 17.9, 2.55, 1.9, 0.115, 0.17]],
    J: [["g30", 6.6, 2.15, 1.35, 0.06, 0.075], ["h105", 17.9, 2.55, 1.9, 0.115, 0.17]]
  };
  function addGuns(THREE, g, T, V, tab) {
    if (V.guns) {
      var list = GUNS[V.guns], dy = Math.cos(14 * D2R), dz = -Math.sin(14 * D2R);
      list.forEach(function (q) {
        var d = dm(q[1]), z = Z(q[2]), yh = hullY(tab, d, z);
        var a = [X(d), yh - 0.06, z], b = [a[0], a[1] + q[3] * dy, a[2] + q[3] * dz];
        g.add(strut(THREE, T.metal, a, b, q[4], 8));
        g.add(strut(THREE, T.metal, [a[0], b[1] - 0.3 * dy, b[2] - 0.3 * dz], b, q[5], 8));
        g.add(box(THREE, T.ink, q[0] === "h105" ? 1.1 : 0.9, 0.03, q[0] === "h105" ? 0.9 : 0.7, X(d), yh + 0.015, z));
      });
    }
    if (V.ball === "fwd") {
      /* the sensor ball hung under the left side of the flight deck, behind
         the nose gear (AC-130U drawing, AC-130A photograph) */
      var bd = 7.6, bz = Z(0.78), by = hullY(tab, bd, bz) + 0.3;
      g.add(egg(THREE, T.metal, 0.46, 0.46, 0.46, X(bd), by, bz, 12, 8));
      g.add(egg(THREE, T.ink, 0.17, 0.17, 0.17, X(bd - 0.3), by + 0.3, bz, 8, 6));
    } else if (V.ball === "chin") {
      /* the J's ball under the nose, ahead of the nose gear */
      g.add(egg(THREE, T.metal, 0.40, 0.40, 0.40, X(2.9), 0.1, Z(0.86), 12, 8));
      g.add(egg(THREE, T.ink, 0.16, 0.16, 0.16, X(2.55), 0.1, Z(0.86), 8, 6));
    }
  }
  /* the C.1P and C.3P probe: a pipe over the flight deck reaching past the
     radome, its tip a metre ahead of it */
  function addProbe(THREE, g, T, V) {
    if (!V.probe) return;
    g.add(strut(THREE, T.metal, [X(3.4), 0, Z(4.7)], [X(-V.probe), 0, Z(4.38)], 0.08, 8));
    g.add(strut(THREE, T.metal, [X(-V.probe + 0.3), 0, Z(4.4)], [X(-V.probe), 0, Z(4.38)], 0.13, 8));
  }

  /* ============================================================== gear ==
     Named "gear": render3d.js stows it in cruise. Four main wheels in tandem
     pairs in the fairings at 12.55 and 13.85 m (wing frame), 1.35 m high and
     0.5 wide, twin nose wheels at 4.1 m; every tyre ends on the ground, so
     the gear is the lowest opaque part.                                    */
  function addGear(THREE, g, T, V, tab) {
    var gear = new THREE.Group();
    gear.name = "gear";
    var R = 0.675, W = 0.5, az = -GZ + R, s;
    [12.55, 13.85].forEach(function (d) {
      for (s = -1; s <= 1; s += 2) {
        var t = new THREE.Mesh(new THREE.CylinderGeometry(R, R, W, 20, 1), T.tyre);
        t.position.set(X(d + S1), s * 1.62, az);
        gear.add(t);
        var h = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.5, R * 0.5, W + 0.04, 10, 1), T.metal);
        h.position.set(X(d + S1), s * 1.62, az);
        gear.add(h);
      }
    });
    var rn = 0.46, an = -GZ + rn, xn = X(4.1);
    gear.add(strut(THREE, T.metal, [xn, 0, Z(1.05)], [xn, 0, an], 0.07, 8));
    for (s = -1; s <= 1; s += 2) {
      var tn = new THREE.Mesh(new THREE.CylinderGeometry(rn, rn, 0.3, 18, 1), T.tyre);
      tn.position.set(xn, s * 0.3, an);
      gear.add(tn);
      gear.add(strut(THREE, T.metal, [xn, s * 0.3, an], [xn, 0, an + 0.35], 0.04, 6));
    }
    g.add(gear);
  }

  /* ===================================================== merge by material ==
     Each mesh costs a draw call, and one more for the shadow pass, per
     aircraft on screen: everything sharing a material becomes one geometry,
     the "gear" group kept a group of its own so the renderer can stow it.
     (The same merge as js/hero/us_b52_stratofortress.js.)                  */
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
    var V = VARIANTS[which] || VARIANTS.H80;
    NOSE = (V.len - (V.probe || 0)) / 2; S1 = V.s1; S2 = V.s2;
    var T = materials(THREE, C, V), tab = fusTable(V);
    var g = new THREE.Group();
    addFuselage(THREE, g, T, V, tab);
    addCockpit(THREE, g, T, V, tab);
    addSponsons(THREE, g, T, V);
    addWings(THREE, g, T, V);
    addEngines(THREE, g, T, V);
    addTanks(THREE, g, T, V);
    addTail(THREE, g, T, V);
    addGuns(THREE, g, T, V, tab);
    addProbe(THREE, g, T, V);
    addGear(THREE, g, T, V, tab);
    return mergeByMaterial(THREE, g);
  }

  return { build: build, variants: VARIANTS, lenOf: lenOf };
})();

/* len: the measured X extent of each guise (nose to tail, probe included) */
UNIT_MODELS["nato_e50_airlift"] = {
  len: HeroC130.lenOf("A50"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "A50"); }
};
UNIT_MODELS["nato_e80_airlift"] = {
  len: HeroC130.lenOf("H80"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "H80"); }
};
UNIT_MODELS["airlift_n"] = {
  len: HeroC130.lenOf("J20"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "J20"); }
};
UNIT_MODELS["gbr_e60_airlift"] = {
  len: HeroC130.lenOf("K60"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "K60"); }
};
UNIT_MODELS["gbr_e80_airlift"] = {
  len: HeroC130.lenOf("K80"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "K80"); }
};
UNIT_MODELS["gbr_e90_airlift"] = {
  len: HeroC130.lenOf("K90"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "K90"); }
};
UNIT_MODELS["nato_e60_gunshipair"] = {
  len: HeroC130.lenOf("G60"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "G60"); }
};
UNIT_MODELS["nato_e80_gunshipair"] = {
  len: HeroC130.lenOf("G80"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "G80"); }
};
UNIT_MODELS["nato_e00_gunshipair"] = {
  len: HeroC130.lenOf("G00"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "G00"); }
};
UNIT_MODELS["gunshipair_n"] = {
  len: HeroC130.lenOf("G20"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "G20"); }
};
