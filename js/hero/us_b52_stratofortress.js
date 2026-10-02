/* ================= us_b52_stratofortress.js  -  HERO MODEL =================
   Boeing B-52 Stratofortress: the D, the G and the H. One airframe, a guise
   for each of the six rows in js/heavyair.js:

     nato_e50_heavybomber "D50"  B-52D as delivered, 1956: bare metal over the
                                 anti-flash white belly, the tall fin, the
                                 gunner in a glazed tail with four .50s, J57
                                 turbojets, 3,000 US gal drop tanks, a clean
                                 wing - the 1950s D carried its bombs inside.
     nato_e60_heavybomber "D60"  B-52D Big Belly, Arc Light: the same aeroplane
                                 in South-East Asia camouflage with the black
                                 belly, sides and fin, and the 24 M117 750 lb
                                 bombs on the two wing racks.
     nato_e80_heavybomber "G80"  B-52G with AGM-86B: fin 8 ft shorter, the
                                 remote ASG-15 tail turret under its two
                                 radomes, still J57s, the fixed 700 gal tanks,
                                 the twin EVS chin turrets, the cheek and fin
                                 blisters, twelve ALCMs on two pylons.
     nato_e90_heavybomber "H90"  B-52H with AGM-86C CALCM: TF33 turbofans in
                                 their big fan cowls, the tail gun gone (1991)
                                 but its radomes kept over the plate that
                                 closes the turret opening, twelve CALCMs.
     nato_e00_heavybomber "H00"  B-52H with AGM-158 JASSM, gunship grey.
     hbomber_n            "H20"  B-52H with JASSM-ER and LRASM; LRASM is the
                                 JASSM-ER airframe, so the pylons look alike.

   References (Wikimedia Commons, each fetched once):
     - "Boeing B-52D Stratofortress 3-view line drawing": the dimensioned
       Boeing characteristics sheet. Span 185 ft 0 in, length 156 ft 6.9 in,
       height 48 ft 3.6 in; root chord 30 ft 11 in, tip chord 12 ft 4 in;
       leading edge 36.9 deg, quarter chord 35 deg; the leading edge meets
       the centreline 30 ft 9 in aft of the nose; nacelles at 34 ft 2 in and
       60 ft 0 in, drop tank at 77 ft 1 in from the centreline; outrigger
       tread 148 ft 5 in, 96 ft 6 in aft of the nose; main gear 40 ft 1 in aft
       of the nose, 49 ft 9 in between the trucks; stabiliser span 52 ft 0 in,
       tip chord 6 ft 11 in, 42 deg; fin root chord 25 ft 2 in, tip chord
       5 ft 0 in, 40.9 deg; 4 ft 4 in under the body; with the wing tanks full
       the nacelles stand 5 ft 9 in and 3 ft 8 in and the tank 1 ft 9 in off
       the ground and the outriggers just touch.
     - "Boeing B-52H Stratofortress 3-view line drawing": the fuselage
       profile and plan (deep, slab-sided, 3 m wide and 4 m deep, the aft
       body a tall narrow blade under the fin), the TF33 pods, the short fin
       and the faired tail, and the parked wing, its tip about 1.9 m below
       the root.
     - "B-52D with Mk 117 bombs Andersen AFB.jpg": the Arc Light D - fin all
       black, the black carried high up the fuselage sides, camouflage on top.
     - "An air-to-air front view of a B-52G ... armed with AGM-86B" (DF-ST-88-
       04694, 1988) and "AGM-86Bs attached to B-52.JPEG" (92nd BW, 1984): six
       missiles to a pylon between the fuselage and the inboard pod - three
       noses in a triangle at the front, the other three behind them - and
       the two EVS chin turrets of the G and H.
     - "B-52H Stratofortress with AGM-158 JASSM, Operation Epic Fury.jpg"
       (2026): the TF33 cowls, the chin turrets, four main wheels abreast.
     - "B-52H tail.JPG" (61-0017, Barksdale "BD", so after 1993): the H's
       tail since the gun came out - two big radomes and a small one over a
       round plate, a small pod under it - and the fin's oval fairing; and
       "B-52H Stratofortress 61-0015 96 BS 2 BW The Last Laugh.jpg" (fin).
     - "B52G 100 BW tail HAFB.jpg" (Hill Aerospace Museum) and "B-52G
       59-2584 Midnight Express": the G's radomes over the turret cone and
       its four .50s, and the fin fairing.
   Published: B-52H length 159 ft 4 in (48.5 m), height 40 ft 8 in (12.4 m);
   B-52G length 160 ft 10.9 in (49.05 m). The G and H fin is the D fin with
   8 ft taken off the top, which is why its tip chord is three metres.

   Model space: +X nose, +Y left, +Z up, real metres; the nose is at X 24.25
   and every station below is given as d, metres aft of the nose.
   Paint: the house tables in js/air3d_era.js (silver, white, green, darkgrey,
   black) carried on canvas sheets, so the scheme of each period reads: two
   coats per guise (top and under) plus the team flash on the fin tip and the
   upper wing tips, which is exactly C.team.
   Everything is baked into one mesh per material before it is returned
   (mergeByMaterial), the gear in a group of its own.
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroB52 = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var NOSE = 24.25;        /* X of the nose tip                                */
  var GROUND = -3.32;      /* z of the tyres' contact: 4 ft 4 in under a belly at -1.98 */
  function X(d) { return NOSE - d; }
  function sgp(v, e) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), e); }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ---------------------------------------------------------------- rows --
     fin: height of the fin above the fuselage top line at the tail. 9.55 m
     makes the D 48 ft 3.6 in overall and 7.25 m the G and H 40 ft 8 in.
     low: where the under coat stops on the fuselage side, as a fraction of
     the section above (+) or below (-) its widest line.                     */
  var VARIANTS = {
    D50: { id: "D50", fin: 9.55, tail: "manned", eng: "J57",  tank: "big",   evs: false, paint: "metal", store: "none",  low: 0.0,  nlow: 0.0 },
    D60: { id: "D60", fin: 9.55, tail: "manned", eng: "J57",  tank: "big",   evs: false, paint: "sea",   store: "m117",  low: 0.62, nlow: 0.45, blackFin: true },
    G80: { id: "G80", fin: 7.25, tail: "remote", eng: "J57",  tank: "small", evs: true,  paint: "siop",  store: "alcm",  low: -0.4, nlow: -0.3, ecm: true },
    H90: { id: "H90", fin: 7.25, tail: "faired", eng: "TF33", tank: "small", evs: true,  paint: "siop",  store: "alcm",  low: -0.4, nlow: -0.3, ecm: true },
    H00: { id: "H00", fin: 7.25, tail: "faired", eng: "TF33", tank: "small", evs: true,  paint: "grey",  store: "jassm", low: -0.4, nlow: -0.3, ecm: true },
    H20: { id: "H20", fin: 7.25, tail: "faired", eng: "TF33", tank: "small", evs: true,  paint: "grey",  store: "jassm", low: -0.4, nlow: -0.3, ecm: true }
  };
  /* ecm: the G's and H's antenna blisters - one on each cheek of the nose
     and an oval fairing on each side of the fin, in every photograph of
     both to hand (B-52G 1984 and 59-2584; B-52H 61-0015, 61-0017, 2026). */

  /* --------------------------------------------------------------- paint --
     metal: bare alloy (PAINT.silver) over anti-flash white (PAINT.white),
            the SAC finish of the late 1950s.
     sea:   T.O. 1-1-4 South-East Asia: tan FS 30219 and greens FS 34102 and
            FS 34079 above, black FS 17038 below (PAINT.green, PAINT.black).
     siop:  the 1980s strategic scheme, dark green FS 34086 with greys
            FS 36081 and FS 36118 (PAINT.darkgrey).
     grey:  gunship grey FS 36118 overall, the H since the late 1990s.     */
  var SHEETS = {
    metal: { top: { base: "#c2c7cb", spots: [["#b3b9be", 30, 10, 26], ["#d0d5d8", 26, 10, 24]], seam: 0.18, seed: 501 },
             low: { base: "#d9dcdd", spots: [["#cdd1d3", 16, 14, 34]], seam: 0.10, seed: 502 } },
    sea:   { top: { base: "#59663f", spots: [["#9a8763", 9, 46, 80], ["#36412f", 9, 46, 80]], seam: 0.10, seed: 601 },
             low: { base: "#26282b", spots: [["#2e3033", 12, 16, 40]], seam: 0.10, seed: 602 } },
    siop:  { top: { base: "#4f575d", spots: [["#48513f", 9, 46, 80], ["#3e4347", 8, 40, 72]], seam: 0.10, seed: 801 },
             low: { base: "#4b5257", spots: [["#454b50", 12, 16, 40]], seam: 0.09, seed: 802 } },
    grey:  { top: { base: "#545a5f", spots: [["#4d5358", 18, 12, 34], ["#5b6166", 16, 12, 30]], seam: 0.11, seed: 2001 },
             low: { base: "#52585d", spots: [["#4c5257", 12, 14, 36]], seam: 0.09, seed: 2002 } }
  };

  /* ============================================================== sheets ==
     Planar UVs (u = X/40, v = (Y + 0.55 Z)/40, repeating): the sheet is the
     airframe seen from above and a little from the side, so a camouflage
     blob lands on the wing as a blob and climbs the fuselage side instead of
     smearing. Cached at module scope: build() runs per key, team and era.  */
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
     gear, guns, at roughness 0.95 the tyres, intakes and wells. GLASS.
     Untextured values are dark on purpose: this three.js lifts a flat hex
     two to three stops on screen (see js/hero/pact_e90_fighter.js), 0x474d52
     lands near #a4a9ad.                                                   */
  var STORE = { none: 0x2b2f33, m117: 0x23281a, alcm: 0x8a8f92, jassm: 0x3b4044 };
  function materials(THREE, C, V) {
    var P = SHEETS[V.paint], bare = V.paint === "metal";
    function coat(which) {
      var t = sheet(THREE, V.paint + "/" + which, P[which]);
      var m = new THREE.MeshStandardMaterial({ color: 0xffffff,
        roughness: bare && which === "top" ? 0.45 : 0.86,
        metalness: bare && which === "top" ? 0.45 : 0.08, side: THREE.DoubleSide });
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
      store: new THREE.MeshStandardMaterial({ color: STORE[V.store], roughness: 0.7, metalness: 0.1, side: THREE.DoubleSide }),
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
     The caps are wound to agree with the sides; outward() then turns the
     whole part the right way out. */
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
  function secRing(x, yc, w, zt, zb, zw, e, N, k) {
    var r = [], j;
    k = k || 1;
    for (j = 0; j < N; j++) {
      var t = j / N * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
      var z = s >= 0 ? zw + (zt - zw) * sgp(s, e) * k : zw + (zw - zb) * sgp(s, e) * k;
      r.push([x, yc + w * k * sgp(c, e), z]);
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
  /* an ellipsoid baked in place, poles fore and aft, its UVs planar like
     the skin's so a paint sheet lands on it at the airframe's scale */
  function egg(THREE, mat, rx, ry, rz, x, y, z, ws, hs) {
    var geo = new THREE.SphereGeometry(1, ws || 12, hs || 8);
    geo.rotateZ(Math.PI / 2);
    geo.scale(rx, ry, rz);
    geo.translate(x, y, z);
    planarUV(THREE, geo);
    return new THREE.Mesh(geo, mat);
  }
  /* a flat disc facing along X (intake faces, nozzles, wells) */
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
     d, half width, top, bottom, squareness. Read off the H drawing (scaled
     to 48.5 m) and checked against the D sheet: 3.0 m wide (9 ft 10 in),
     4 m deep, the top line all but flat from the windscreen to the tail,
     the belly 4 ft 4 in off the ground, and behind the wing the body
     narrowing to a blade 0.6 m wide that carries the fin.                 */
  var FUS = [
    [0.00, 0.03, -0.12, -0.24, 0.95], [0.20, 0.30, 0.15, -0.48, 0.92],
    [0.50, 0.48, 0.39, -0.68, 0.90], [0.80, 0.66, 0.56, -0.83, 0.88],
    [1.10, 0.80, 0.74, -0.96, 0.86], [1.40, 0.93, 0.85, -1.10, 0.84],
    [1.70, 1.04, 0.98, -1.22, 0.82], [2.00, 1.14, 1.22, -1.33, 0.80],
    [2.30, 1.26, 1.45, -1.43, 0.78], [2.60, 1.37, 1.61, -1.52, 0.76],
    [2.90, 1.44, 1.73, -1.61, 0.74], [3.30, 1.48, 1.81, -1.72, 0.72],
    [3.90, 1.50, 1.89, -1.85, 0.70], [4.70, 1.50, 1.94, -1.93, 0.68],
    [6.00, 1.50, 1.97, -1.96, 0.66], [9.00, 1.50, 1.98, -1.97, 0.66],
    [13.0, 1.50, 1.97, -1.99, 0.66], [17.0, 1.50, 1.94, -2.01, 0.66],
    [21.0, 1.50, 1.90, -2.06, 0.66], [25.0, 1.49, 1.86, -2.13, 0.66],
    [28.0, 1.45, 1.83, -2.17, 0.67], [30.5, 1.38, 1.80, -2.14, 0.68],
    [33.0, 1.27, 1.78, -2.00, 0.70], [36.0, 1.14, 1.77, -1.67, 0.72],
    [39.0, 1.01, 1.76, -1.25, 0.74], [42.0, 0.86, 1.76, -0.86, 0.76],
    [44.5, 0.60, 1.76, -0.60, 0.78], [46.0, 0.42, 1.75, -0.52, 0.80],
    [47.0, 0.33, 1.72, -0.42, 0.82]
  ];
  var SEC = resample(FUS, 48);
  /* The end of the body, by tail.
     manned (the D): the gunner's canopy. On the D sheet the top line runs
       down in an S from about 46.3 m to the turret, whose guns are 12 ft 0 in
       off the ground; the body is not carried full height to the end.
     remote and faired (the G, and the H): the flat end face at 47.3 m of the
       B-52H drawing, the radomes over the turret on it, and on the H since
       the gun came out (1991) the plate over the old turret opening.       */
  var TAILROWS = {
    manned: [[46.35, 0.39, 1.70, -0.49, 0.80], [46.65, 0.36, 1.46, -0.45, 0.81],
             [46.9, 0.33, 1.08, -0.40, 0.82], [47.1, 0.29, 0.70, -0.30, 0.85]],
    remote: [[47.3, 0.30, 1.70, -0.40, 0.84]],
    faired: [[47.3, 0.30, 1.70, -0.40, 0.84]]
  };
  function secTab(V) {
    var cut = V.tail === "manned" ? 46.1 : 99;
    return SEC.filter(function (s) { return s[0] <= cut; }).concat(TAILROWS[V.tail] || []);
  }
  function zwOf(zt, zb) { return zb + 0.52 * (zt - zb); }
  function secAt(d, tab) {
    tab = tab || SEC;
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
  var NF = 26;
  function addFuselage(THREE, g, T, V) {
    var rows = secTab(V);
    var rings = rows.map(function (s) { return secRing(X(s[0]), 0, s[1], s[2], s[3], zwOf(s[2], s[3]), s[4], NF); });
    /* The coats part along one line of the hull, the ring angle nearest
       V.low: judged by height instead, the two triangles of a quad fell on
       either side wherever the section changes, and the edge came out
       saw-toothed at the nose and along the tail. */
    var tq = 2 * Math.PI / NF, td = Math.asin(sgp(Math.pow(Math.abs(V.low), 1 / 0.66), 1) * (V.low < 0 ? -1 : 1));
    var sd = Math.sin(Math.round(td / tq) * tq);
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz) {
      var s = secAt(NOSE - cx, rows), zw = zwOf(s[2], s[3]), e = s[4];
      var u = Math.max(-1, Math.min(1, cy / Math.max(0.01, s[1])));
      var v = Math.max(-1, Math.min(1, (cz - zw) / Math.max(0.01, cz >= zw ? s[2] - zw : zw - s[3])));
      return Math.sin(Math.atan2(sgp(v, 1 / e), sgp(u, 1 / e))) < sd - 1e-6 ? "low" : "top";
    });
    /* the refuelling receptacle behind the flight deck */
    g.add(box(THREE, T.ink, 0.9, 0.5, 0.04, X(6.4), 0, 1.985));
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
  function addCockpit(THREE, g, T, V) {
    /* windscreen: six panes round the front of the flight deck */
    g.add(new THREE.Mesh(hullPatch(THREE, 1.98, 2.78, 58, 122, 3, 6), T.glass));
    /* the pilots' side windows */
    g.add(new THREE.Mesh(hullPatch(THREE, 2.85, 3.95, 40, 60, 2, 2), T.glass));
    g.add(new THREE.Mesh(hullPatch(THREE, 2.85, 3.95, 120, 140, 2, 2), T.glass));
    /* the G and H: the two EVS turrets under the chin, FLIR and low-light TV */
    if (V.evs) for (var s = -1; s <= 1; s += 2) {
      var ev = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 8), T.low);
      ev.scale.set(1.45, 1, 0.9);
      ev.position.set(X(3.55), s * 0.62, -1.76);
      g.add(ev);
    }
    /* the cheek blisters: egg-shaped, at mid-height just aft of the radome,
       standing about 0.3 m off the side (B-52G 1984 head-on photograph) */
    if (V.ecm) for (var c = -1; c <= 1; c += 2)
      g.add(egg(THREE, T.top, 0.72, 0.30, 0.32, X(3.3), c * 1.50, -0.2));
  }

  /* ============================================================== tail == */
  function addTail(THREE, g, T, V) {
    var H = V.fin, Z0 = 1.74, NFOIL = 9, rings = [], hs = [-0.7, 0, H * 0.33, H * 0.66, H - 0.9, H];
    /* fin: leading edge 41.1 deg, trailing edge leaning 12.8 deg, root chord
       7.68 m at the top line; the D's is 9.55 m tall and its tip chord 1.5 m,
       the G and H stop 2.3 m lower where the chord is still 3 m */
    hs.forEach(function (h) {
      var dLE = 36.59 + 0.8724 * h, dTE = 44.27 + 0.227 * h, c = dTE - dLE, tc = 0.075 - 0.012 * Math.max(0, h) / H;
      rings.push(foil(NFOIL, tc, 0).map(function (p) { return [X(dLE + p[0] * c), p[1] * c, Z0 + h]; }));
    });
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz) {
      return cz > Z0 + H - 0.9 + 0.01 ? "team" : (V.blackFin ? "low" : "top");
    });
    /* stabiliser: 52 ft span, 42 deg leading edge, all-moving */
    for (var s = -1; s <= 1; s += 2) {
      var sr = [0.4, 1.29, 4.2, 7.92].map(function (y) {
        var dLE = 37.77 + (y - 1.29) * 0.8796, dTE = 45.15 + (y - 1.29) * 0.10, c = dTE - dLE;
        return foil(NFOIL, 0.085 - 0.02 * y / 7.92, 0).map(function (p) { return [X(dLE + p[0] * c), s * y, 0.45 + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, sr, true, true), T, function (cx, cy, cz, nx, ny, nz) { return nz < 0 ? "low" : "top"; });
    }
    /* the G's and H's oval antenna fairing, one each side of the fin, at
       about 45% of its height and 25-55% of the chord (photographs) */
    if (V.ecm) for (var q = -1; q <= 1; q += 2)
      g.add(egg(THREE, T.top, 0.85, 0.10, 0.25, X(41.63), q * 0.19, Z0 + 3.2, 12, 6));
    var i, k, tab = secTab(V);
    if (V.tail === "manned") {
      /* the D's gunner sat in the tail under the S of his canopy, four .50
         M3s in the turret below him */
      g.add(new THREE.Mesh(hullPatch(THREE, 46.2, 47.08, 22, 158, 3, 6, tab), T.glass));
      var ball = new THREE.Mesh(new THREE.SphereGeometry(0.34, 10, 8), T.metal);
      ball.position.set(X(47.12), 0, 0.30);
      g.add(ball);
      for (i = -1; i <= 1; i += 2) for (k = -1; k <= 1; k += 2)
        g.add(strut(THREE, T.metal, [X(47.2), i * 0.09, 0.30 + k * 0.09], [X(47.72), i * 0.09, 0.30 + k * 0.09], 0.035, 6));
    } else {
      /* The G and H: the fire-control radomes stacked on the end face over
         the turret, two big eggs standing 0.45 m proud of it (the B-52H
         drawing; the G's pair in the photographs of 59-2584 and of the Hill
         museum's G). */
      g.add(egg(THREE, T.top, 0.45, 0.30, 0.23, X(47.25), 0, 1.36, 14, 8));
      g.add(egg(THREE, T.top, 0.45, 0.30, 0.23, X(47.25), 0, 0.80, 14, 8));
      if (V.tail === "remote") {
        /* the G's turret, its gunner moved forward to the crew: a cone off
           the lower end face, the four .50s two over two at its tip */
        emit(THREE, g, lathe(THREE, [[0, 0.30, 0.46], [0.5, 0.29, 0.42], [1.0, 0.22, 0.30], [1.3, 0.16, 0.20], [1.45, 0.10, 0.12]],
          12, X(47.3), 0, 0.08, 1, false, true), T, null);
        for (i = -1; i <= 1; i += 2) for (k = -1; k <= 1; k += 2)
          g.add(strut(THREE, T.metal, [X(48.4), i * 0.12, 0.08 + k * 0.17], [X(49.05), i * 0.12, 0.08 + k * 0.17], 0.03, 6));
      } else {
        /* the H since the gun came out (1991): a third, small radome under
           the pair, the round plate over the old turret opening, and a
           small pod under the plate (photograph of 61-0017) */
        g.add(egg(THREE, T.top, 0.32, 0.17, 0.14, X(47.25), 0, 0.42, 12, 8));
        emit(THREE, g, lathe(THREE, [[0, 0.30, 0.31], [0.09, 0.30, 0.31], [0.12, 0.27, 0.28]],
          16, X(47.28), 0, 0.03, 1, false, true), T, null);
        g.add(egg(THREE, T.top, 0.28, 0.10, 0.08, X(47.3), 0, -0.34, 10, 6));
      }
    }
  }

  /* ============================================================= wings ==
     Leading edge 36.9 deg from the apex 9.37 m aft of the nose, trailing
     edge 27.7 deg, 9.6 m root and 3.6 m tip chords (D sheet). 6 deg of
     incidence at the root, 3 at the tip. Parked droop from the H drawing:
     0.047 s + 0.00112 s^2 below the root, s metres out from the body side,
     1.9 m at the tip. A station sits at each pod, the pylon, the outrigger
     and the inboard edge of the team flash.                               */
  var CAMBER = 0.015;
  var WST = [1.0, 2.6, 4.2, 5.4, 6.9, 8.6, 10.41, 12.4, 14.4, 16.4, 18.29, 20.4, 22.62, 24.1, 25.6, 26.95, 28.19];
  function wingAt(Y) {
    var s = Math.max(0, Y - 1.5), f = Y / 28.19, dLE = 9.37 + 0.7508 * Y, dTE = 19.34 + 0.525 * Y;
    return { dLE: dLE, c: dTE - dLE, zLE: 1.60 - (0.0466 * s + 0.00112 * s * s),
             inc: (6 - 3 * f) * D2R, tc: 0.115 - 0.035 * f };
  }
  /* height of the upper or lower skin at span Y, d aft of the nose */
  function wingZ(Y, d, upper) {
    var w = wingAt(Y), x = Math.min(1, Math.max(0, (d - w.dLE) / w.c));
    var yc = CAMBER * 4 * x * (1 - x), yt = naca(x, w.tc);
    return w.zLE - Math.sin(w.inc) * x * w.c + Math.cos(w.inc) * (upper ? yc + yt : yc - yt) * w.c;
  }
  function addWings(THREE, g, T, V) {
    var s;
    for (s = -1; s <= 1; s += 2) {
      var rings = WST.map(function (Y) {
        var w = wingAt(Y), ci = Math.cos(w.inc), si = Math.sin(w.inc);
        return foil(10, w.tc, CAMBER).map(function (p) {
          var x = p[0] * w.c, y = p[1] * w.c;
          return [X(w.dLE + x * ci + y * si), s * Y, w.zLE - x * si + y * ci];
        });
      });
      emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz, nx, ny, nz) {
        if (nz < 0) return "low";
        return Math.abs(cy) > 25.62 ? "team" : "top";
      });
    }
  }

  /* =========================================================== engines ==
     Four pods of two at 34 ft 2 in and 60 ft 0 in, the J57 cowl lips 12.0
     and 18.2 m aft of the nose (D sheet); pod centres set so the D's
     nacelles clear the ground by 5 ft 9 in and 3 ft 8 in. The TF33 lips
     12.9 and 18.9 m aft, measured off the B-52H drawing scaled to its
     length (the drawing has no dimensions): the TF33 is the J57 core with
     a fan in place of its front compressor stages (P&W JT3D), so its short
     fan inlet ends aft of the J57's long nose cowl on the same pylon.
     Profiles: [aft of the lip, radius]. J57: a slim turbojet nacelle,
     nearly parallel. TF33: the big fan cowl, the fan air leaving through
     the step a third of the way back, then the slim core cowl - the face
     of the H.                                                             */
  var J57 = [[0.30, 0.46], [0.0, 0.50], [0.12, 0.565], [0.5, 0.60], [1.6, 0.605], [3.4, 0.585], [4.8, 0.52], [5.8, 0.43], [6.3, 0.385]];
  var TF33 = [[0.35, 0.60], [0.0, 0.655], [0.14, 0.715], [0.6, 0.735], [1.5, 0.725], [2.15, 0.68], [2.2, 0.53], [3.3, 0.51], [4.6, 0.455], [5.4, 0.38], [5.8, 0.33]];
  /* [station out from the centreline, J57 lip, pod centre z, TF33 lip] */
  var PODS = [[10.41, 12.0, -0.95, 12.9], [18.29, 18.23, -1.55, 18.9]];
  function nacRule(V) {
    return function (cx, cy, cz, nx, ny, nz) { return nx < -0.75 ? "hot" : (nz < V.nlow ? "low" : "top"); };
  }
  function addEngines(THREE, g, T, V) {
    var tf = V.eng === "TF33", prof = tf ? TF33 : J57, L = prof[prof.length - 1][0], rule = nacRule(V);
    PODS.forEach(function (p) {
      for (var s = -1; s <= 1; s += 2) {
        var yc = s * p[0], dF = tf ? p[3] : p[1], zc = p[2], o;
        for (o = -1; o <= 1; o += 2) {
          var y = yc + o * 0.715;
          emit(THREE, g, lathe(THREE, prof, 14, X(dF), y, zc, 1, false, true), T, rule);
          g.add(disc(THREE, T.ink, prof[0][1] + 0.01, X(dF + prof[0][0]), y, zc));
          g.add(disc(THREE, T.hot, prof[prof.length - 1][1] - 0.05, X(dF + L + 0.01), y, zc, 12));
          if (tf) {
            var sp = outward(lathe(THREE, [[0, 0.02], [0.17, 0.14], [0.34, 0.2]], 8, X(dF + prof[0][0] - 0.34), y, zc, 1, false, true));
            sp.computeVertexNormals();
            g.add(new THREE.Mesh(sp, T.metal));
          }
        }
        /* J57 pods: the web that joins the two nacelles under the pylon */
        if (!tf) {
          emit(THREE, g, new THREE.BoxGeometry(5.0, 0.6, 0.5), T, rule);
          g.children[g.children.length - 1].position.set(X(dF + 3.1), yc, zc + 0.25);
        }
        var dl = wingAt(p[0]).dLE;
        emit(THREE, g, plate(THREE, [[X(dF + 1.2), zc + 0.35], [X(dF + 5.0), zc + 0.35],
          [X(dl + 3.6), wingZ(p[0], dl + 3.6, false) + 0.12], [X(dl - 0.1), wingZ(p[0], dl + 0.15, false) + 0.12]], yc, 0.16), T, rule);
      }
    });
  }

  /* ============================================================= tanks ==
     The D's 3,000 US gal drop tanks: 12.9 m by 1.37 m on the D sheet, at
     77 ft 1 in, hung so they clear the ground with the wing loaded. The G
     and H fixed 700 gal tanks, near the tips and close under the wing.    */
  var BIGTANK = [[0, 0.03], [0.5, 0.30], [1.4, 0.55], [2.8, 0.67], [4.8, 0.69], [8.4, 0.69], [10.4, 0.60], [11.9, 0.38], [12.86, 0.06]];
  var SMALLTANK = [[0, 0.03], [0.4, 0.24], [1.1, 0.40], [2.0, 0.46], [4.3, 0.46], [5.4, 0.38], [6.1, 0.20], [6.4, 0.04]];
  function addTanks(THREE, g, T, V) {
    var rule = nacRule(V);
    for (var s = -1; s <= 1; s += 2) {
      var Y, dF, zc, prof, a, b, c, d2;
      if (V.tank === "big") { Y = 23.5; dF = 20.86; zc = -1.55; prof = BIGTANK; a = 24.6; b = 30.2; c = 27.4; d2 = 30.6; }
      else { Y = 24.6; dF = 25.0; zc = wingZ(24.6, 28.6, false) - 0.62; prof = SMALLTANK; a = 27.6; b = 30.6; c = 28.2; d2 = 30.8; }
      var rr = prof[4][1];
      emit(THREE, g, lathe(THREE, prof, 14, X(dF), s * Y, zc, 1, true, true), T, rule);
      emit(THREE, g, plate(THREE, [[X(a), zc + rr - 0.12], [X(b), zc + rr - 0.12],
        [X(d2), wingZ(Y, d2, false) + 0.1], [X(c), wingZ(Y, c, false) + 0.1]], s * Y, 0.12), T, rule);
    }
  }

  /* ============================================================ stores ==
     The stores pylon sits between the body and the inboard pod. The 1984
     photograph of an ALCM pylon shows three noses at its front, two side
     by side against the beam and one under them, the other three riding
     behind: two rows of three. The JASSM pylon and the Big Belly rack (four
     rows, twelve bombs a side) are hung the same way; that is an
     approximation, as no photograph of their racks was to hand. AGM-86B/C
     6.32 m by 0.69 m; JASSM 4.27 m, faceted; M117 2.16 m by 0.41 m.       */
  var YS = 5.4;
  var ALCM = [[0, 0.04, 0.03], [0.3, 0.20, 0.17], [0.85, 0.30, 0.33], [5.5, 0.30, 0.34], [6.05, 0.20, 0.22], [6.32, 0.07, 0.07]];
  var JASSM = [[0, 0.04, 0.03], [0.35, 0.18, 0.13], [0.9, 0.275, 0.225], [3.95, 0.275, 0.225], [4.27, 0.15, 0.12]];
  var M117 = [[0, 0.03], [0.3, 0.16], [0.9, 0.205], [1.6, 0.19], [2.16, 0.09]];
  function addStores(THREE, g, T, V) {
    if (V.store === "none") return;
    var kind = V.store, rows, prof, dy, zu, zl, e, n, fin, d0, d1;
    if (kind === "m117") { rows = [12.7, 15.05, 17.4, 19.75]; prof = M117; dy = 0.25; zu = -0.10; zl = -0.48; e = 1; n = 7; d0 = 12.4; d1 = 22.2; }
    else if (kind === "alcm") { rows = [10.4, 16.9]; prof = ALCM; dy = 0.40; zu = -0.24; zl = -0.86; e = 0.8; n = 8; d0 = 10.9; d1 = 22.6; }
    else { rows = [11.2, 15.65]; prof = JASSM; dy = 0.34; zu = -0.12; zl = -0.58; e = 0.5; n = 8; d0 = 11.5; d1 = 19.8; }
    var L = prof[prof.length - 1][0];
    for (var s = -1; s <= 1; s += 2) {
      var yb = s * YS;
      /* the beam and the strut up into the wing */
      emit(THREE, g, new THREE.BoxGeometry(d1 - d0, 0.30, 0.30), T, null);
      g.children[g.children.length - 1].position.set(X((d0 + d1) / 2), yb, 0.16);
      emit(THREE, g, plate(THREE, [[X(14.2), 0.2], [X(19.4), 0.2], [X(20.0), wingZ(YS, 20.0, false) + 0.1],
        [X(14.0), wingZ(YS, 14.0, false) + 0.1]], yb, 0.14), T, null);
      rows.forEach(function (dn) {
        [[yb + dy, zu], [yb - dy, zu], [yb, zl]].forEach(function (q) {
          var body = outward(lathe(THREE, prof, n, X(dn), q[0], q[1], e, true, true));
          body.computeVertexNormals();
          g.add(new THREE.Mesh(body, T.store));
          if (kind === "m117") {
            g.add(box(THREE, T.store, 0.42, 0.56, 0.025, X(dn + L - 0.18), q[0], q[1]));
            g.add(box(THREE, T.store, 0.42, 0.025, 0.56, X(dn + L - 0.18), q[0], q[1]));
          } else {
            g.add(box(THREE, T.store, 0.45, 0.025, 0.30, X(dn + L - 0.3), q[0], q[1] + 0.3));
          }
        });
      });
    }
  }

  /* ============================================================== gear ==
     Bicycle gear: two stations of four wheels abreast (two twin trucks),
     40 ft 1 in aft of the nose and 49 ft 9 in apart, 56 in tyres; and the
     outriggers at 148 ft 5 in tread, 96 ft 6 in aft. With the tanks full the
     outriggers touch, so here both rest on the same ground - which makes the
     gear, outriggers included, the lowest thing on the aeroplane, as the
     parking code needs. Named "gear": render3d.js stows it in cruise.
     Track off the D sheet's front view: 11 ft 4 in between the outer tyre
     centres and about 1.55 m between the inner ones, so the outer wheels
     stand partly outside the body, and the doors hang from the body side
     outboard of them, flared out at the foot (1984 and 2026 photographs). */
  function addGear(THREE, g, T, V) {
    var gear = new THREE.Group();
    gear.name = "gear";
    var R = 0.68, W = 0.42, az = GROUND + R;
    [12.22, 27.38].forEach(function (d) {
      var x = X(d), sc = secAt(d), zb = sc[3], zw = zwOf(sc[2], zb);
      /* the door's hinge: where the body side is at 95% of its half width */
      var hc = Math.pow(0.95, 1 / sc[4]), y0 = 0.95 * sc[1];
      var z0 = zw - (zw - zb) * Math.pow(Math.sqrt(1 - hc * hc), sc[4]), y1 = 2.12, z1 = z0 - 1.0;
      gear.add(box(THREE, T.ink, 2.3, 2.5, 0.05, x, 0, zb + 0.01));
      for (var s = -1; s <= 1; s += 2) {
        gear.add(strut(THREE, T.metal, [x, s * 1.245, zb + 0.8], [x, s * 1.245, az + 0.05], 0.13, 8));
        gear.add(strut(THREE, T.metal, [x, s * 0.6, az], [x, s * 1.89, az], 0.07, 6));
        var dr = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.06, Math.sqrt((y1 - y0) * (y1 - y0) + 1.0)), T.low);
        dr.position.set(x, s * (y0 + y1) / 2, (z0 + z1) / 2);
        dr.rotation.x = s * Math.atan2(y1 - y0, z0 - z1);
        gear.add(dr);
        [0.775, 1.715].forEach(function (yy) {
          var t = new THREE.Mesh(new THREE.CylinderGeometry(R, R, W, 14, 1), T.tyre);
          t.position.set(x, s * yy, az);
          gear.add(t);
          var h = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.55, R * 0.55, W + 0.03, 10, 1), T.metal);
          h.position.set(x, s * yy, az);
          gear.add(h);
        });
      }
    });
    for (var s = -1; s <= 1; s += 2) {
      var x = X(29.41), y = s * 22.62, r = 0.405, top = wingZ(22.62, 29.41, false) + 0.1;
      gear.add(strut(THREE, T.metal, [x, y, top], [x, y, GROUND + r + 0.3], 0.09, 8));
      gear.add(box(THREE, T.metal, 0.16, 0.36, 0.55, x, y, GROUND + r + 0.25));
      var t = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.22, 12, 1), T.tyre);
      t.position.set(x, y, GROUND + r);
      gear.add(t);
      gear.add(box(THREE, T.low, 1.1, 0.05, 0.9, x + 0.1, y + s * 0.3, top - 0.5));
    }
    g.add(gear);
  }

  /* ===================================================== merge by material ==
     Each mesh costs a draw call, and one more for the shadow pass, per
     aircraft on screen: everything sharing a material becomes one geometry,
     the "gear" group kept a group of its own so the renderer can stow it.
     (The same merge as js/hero/pact_e90_fighter.js.)                       */
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
    var V = VARIANTS[which] || VARIANTS.H20;
    var T = materials(THREE, C, V);
    var g = new THREE.Group();
    addFuselage(THREE, g, T, V);
    addCockpit(THREE, g, T, V);
    addTail(THREE, g, T, V);
    addWings(THREE, g, T, V);
    addEngines(THREE, g, T, V);
    addTanks(THREE, g, T, V);
    addStores(THREE, g, T, V);
    addGear(THREE, g, T, V);
    return mergeByMaterial(THREE, g);
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of each guise - nose to tail guns on the D
   (156 ft 6.9 in) and the G (160 ft 10.9 in); on the H since 1991 nose to
   the radomes, the published 159 ft 4 in having included the gun */
UNIT_MODELS["nato_e50_heavybomber"] = {
  len: 47.72,
  build: function (THREE, M, C) { return HeroB52.build(THREE, M, C, "D50"); }
};
UNIT_MODELS["nato_e60_heavybomber"] = {
  len: 47.72,
  build: function (THREE, M, C) { return HeroB52.build(THREE, M, C, "D60"); }
};
UNIT_MODELS["nato_e80_heavybomber"] = {
  len: 49.05,
  build: function (THREE, M, C) { return HeroB52.build(THREE, M, C, "G80"); }
};
UNIT_MODELS["nato_e90_heavybomber"] = {
  len: 47.7,
  build: function (THREE, M, C) { return HeroB52.build(THREE, M, C, "H90"); }
};
UNIT_MODELS["nato_e00_heavybomber"] = {
  len: 47.7,
  build: function (THREE, M, C) { return HeroB52.build(THREE, M, C, "H00"); }
};
UNIT_MODELS["hbomber_n"] = {
  len: 47.7,
  build: function (THREE, M, C) { return HeroB52.build(THREE, M, C, "H20"); }
};
