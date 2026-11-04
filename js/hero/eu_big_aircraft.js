/* ================= eu_big_aircraft.js  -  HERO MODELS =================
   Four big European tankers and transports, one module each on a shared kit
   (EuBigKit, copied from js/hero/us_kc10a.js and js/hero/us_c130_hercules.js):

     gbr_e90_tanker   HeroVC10K3     Vickers VC10 K.3 (Type 1164, a Super VC10
                                     of East African Airways rebuilt as a
                                     three-point tanker, 101 Squadron).
     gbr_e00_tanker   HeroTriStarK1  Lockheed TriStar K.1 / KC.1 (L-1011-500,
                                     216 Squadron).
     deu_e00_tanker   HeroA310MRTT   Airbus A310-304 MRTT, Luftwaffe.
     fra_e00_airlift  HeroA400M      Airbus A400M Atlas, Armee de l'Air.

   No national markings anywhere: no roundels, crosses, fin flashes, serials,
   squadron badges, airline or air force titles. Plain paint. Team colour:
   exactly C.team, the fin tip (or the fin-top fairing) and the wing tips.

   References (Wikimedia Commons, fetched for these models; measured with a
   pixel scan of the ink, scratchpad q_eubig_ref/ and q_eubig_tools/):
     V1 "Vickers VC.10 K.3 three-view silhouette and K.2 side-view
        silhouette.png" (Greg Goebel, PD; fetched at 2x, 1320 px). Its views
        are at three scales: side 590 px nose to tailplane tip (11.28 px/m
        for 52.32 m), plan 598 px for the length and 513 px for the 44.55 m
        span (11.43 / 11.51 px/m), front 499 px for the span (11.20 px/m).
     V2 "RAF Vickers VC10 K3 over the North Sea Lofting.jpg": a K.3 side-on in
        the overall light grey; the paired Conways touching side by side, the
        Mk 32 pod on its short pylon under the outer wing, the probe on the
        nose crown, the fin-top bullet.
     T1 "Lockheed L-1011 TriStar v1.0.png" (Julien Scavini, dimensioned
        three-view of the L-1011-500): 50m04 long, 50m09 span, 16m87 high,
        6m22 wide. Side and plan both 14.77 px/m (739 px for 50.04 m, 740 px
        for 50.09 m); the side and front views stand on a ground line.
     T2 "Tristar tanker zd952 view2 arp.jpg": a KC.1 from below on approach -
        the grey scheme and the hose drum unit installation under the rear
        fuselage between the rear door and the tailplane root.
     A1 "Airbus A310 v1.0.png" (Scavini, dimensioned A310-300): 46m66, 43m89,
        15m80, 5m64; side and plan 15.09 px/m (704 px for 46.66 m, 663 px for
        43.89 m), the fuselage 85 px across in plan and 85 px deep in side
        (5.63 m) - the drawing is self-consistent.
     A2 "Airbus A310-304(MRTT), Germany - Air Force JP7415094.jpg": the MRTT on
        approach - the refuelling pod under the outer wing on a pylon, the
        wing-tip fences, the overall grey.
     A3 "Airbus A310MRTT 2 (7570360328).jpg": the nose and the CF6 nacelle
        close up, parked.
     M1 "Airbus A400M silhouettes.png" (front, side, plan; each with its own
        scale - side 1525 px for the 45.1 m length = 33.81 px/m, front 1427 px
        for the 42.4 m span = 33.66 px/m, plan 1506 px for the length =
        33.4 px/m and 1456 px for the span = 34.34 px/m). The front view's
        arrows show the props turning down between the engines of each pair.
     M2 "Size comparison C-17 A400M C-130J-30 C-130J.jpg": the A400M side-on
        at one scale (28.4 px/m): the probe over the flight deck, the
        nacelles reaching past the trailing edge, the eight-blade props.
   Published (en.wikipedia raw pages, saved in q_eubig_tools/):
     VC10 (Type 1101): 158 ft 8 in, span 146 ft 2 in (44.55 m), height 39 ft
       6 in (12.04 m); the Super VC10 is the Standard stretched by 13 ft
       ("Super 200 ... cut down to 13 ft"), i.e. 171 ft 8 in (52.32 m) - the
       length V1's side and plan views give at its span's scale (51.9 m and
       52.3 m). K.3: "a pair of wing-mounted refuelling pods and a single
       centreline Hose Drum Unit, installed in the rear freight bay;
       nose-mounted refuelling probes were also fitted".
     TriStar K1: 164 ft 3 in (50.06 m), span 164 ft 4 in (50.09 m), height
       55 ft 4 in (16.87 m); "Two Flight Refuelling Mk.17T Hose Drum Units in
       underside aft rear fuselage, with location precluding both from being
       used at the same time".
     A310: 46.66 m, span 43.90 m, width 5.64 m, height 15.867 m (at OEW);
       A310 MRTT page: 47.4 m, 43.9 m, 15.81 m.
     A400M: 45.1 m, span 42.4 m, height 14.7 m; eight-blade Ratier-Figeac
       props 5.3 m across, "FH385 anticlockwise on engines 2 and 4, FH386
       clockwise on engines 1 and 3".

   Where a drawing and a published figure disagree (each settled at one
   station, as written):
     - A310 height: A1 stands the airframe on its gear 1.05 deg nose down (the
       crown 8.08 m up at 8 m, 8.42 m at 26 m; the belly 2.45 and 2.78 - both
       lines rise together, so it is the stance, not the shape), which puts
       the fin top 16.2 m up against the published 15.80/15.867. The stance
       is the drawn gear's, kept as drawn; no part is reshaped for the height.
       A1's own dimension arrow (247 px) is drawn at a different scale from
       its views. Not resolved; no photo here is side-on and parked.
     - A310 MRTT length 47.4 m (wikipedia MRTT page) against the airliner's
       46.66: the conversion did not stretch the body and A1 gives 46.6 m
       nose to tail cone, so 46.6 is used. The 0.8 m is NOT explained.
     - A400M height: M1's front and side views both stand the aircraft 15.0 m
       to the fin-top fairing against the published 14.7. Ratio at one
       station (fin top above the crown / body depth, at 15% of the length
       from the nose): M1 291/170 px = 1.71, M2 256/141 px = 1.82 - the
       photograph has the fin taller still, so the fin is NOT cut down to
       meet 14.7; the stance is M1's drawn gear (belly 1.39 m up).
     - VC10 height: V1's front view (parked, on a ground line) puts the fin
       top 11.9 m up against the published 12.04 - within its resolution.
       V1's side view has the nose wheel 0.8 m higher than the mains (a flight
       pose, no ground line); the front view has the two within 0.27 m (3 px
       of a 2x upscale), so the parked stance is taken level from the front
       view.

   Recognition, at game zoom:
     VC10: four Conways in two side-by-side pairs on the tail (V1, V2); the
       big T-tail with the bullet at the top (V1, V2); the long slim body and
       the swept wing with no engines on it (V1); the nose probe (V1, V2); a
       Mk 32 pod under each outer wing (V1, V2); the centreline HDU fairing
       ending in a square step under the rear fuselage (V1 side).
     TriStar: three RB211s, the centre one fed by the S-duct whose intake sits
       on the crown ahead of the fin and exhausts at the very tail (T1); the
       wide body; the two HDUs under the rear fuselage (T2).
     A310 MRTT: a twin with the CF6s slung ahead of the wing (A1, A3), the
       wing-tip fences (A1, A2), the pod under each outer wing (A2).
     A400M: the high wing with its anhedral (M1 front); four big nacelles and
       the eight-blade scimitar props, each pair turning down between the
       engines (M1, wikipedia); the T-tail (M1, M2); the main-gear sponsons
       (M1); the upswept tail with the ramp (M1, M2); the probe over the
       flight deck (M1, M2).

   NOT CONFIRMED (estimated from proportions or a single weak view):
     - every cross-section's squareness and the fuselage taper behind the
       engines and under the fins where the silhouettes hide it;
     - VC10: the fuselage 3.90 m wide and 4.52 m deep is V1's silhouette (no
       published figure in hand); the HDU fairing's width and depth (only its
       aft step is drawn in V1); the stub pylon carrying the engine pairs; the
       pod pylon; the APU tail cone;
     - TriStar: the twin HDUs drawn as two shallow fairings in tandem on the
       centreline at 35.2-39.8 m - T2 shows the installation only from below
       at an angle; the S-duct fairing's sides; the wing-body fairing;
     - A310: the pod station 15.4 m out (from A2's far wing, one station
       ratio, foreshortened) and the pod size; the main-gear track (A1:
       4.35 m each side); the pylons;
     - A400M: the nacelle sections (from M1 plan widths only), the inboard and
       outboard hub heights from M1's blade tips, the blade planform; the
       probe 0.9 m to port (M1 plan only); the ramp outline (a darker panel).

   Model space: +X nose, +Y left (port), +Z up, real metres. Heights h are
   metres above the ground as each drawing stands, turned into z by Z(h) =
   h - HAX (HAX: the fuselage axis height); stations d are metres aft of the
   nose, X(d) = NOSE - d with NOSE set so the model is centred on its own X
   extent. One mesh per material; the gear sits in a group named "gear" and
   the tyres are the lowest opaque thing. Prop discs are see-through
   (render3d.js blurOf) so nothing stands on them.
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var EuBigKit = (function () {
  "use strict";
  var D2R = Math.PI / 180;
  function sgp(v, e) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), e); }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function X(S, d) { return S.NOSE - d; }
  function Z(S, h) { return h - S.HAX; }

  /* ------------------------------------------------------------ paint -- */
  var _sheets = {};
  function blob(g, cx, cy, r, R, Sz) {
    var n = 12, pts = [], i, ox, oy;
    for (i = 0; i < n; i++) {
      var a = i / n * Math.PI * 2, rr = r * (0.7 + 0.5 * R());
      pts.push([Math.cos(a) * rr * 1.4, Math.sin(a) * rr]);
    }
    for (ox = -Sz; ox <= Sz; ox += Sz) for (oy = -Sz; oy <= Sz; oy += Sz) {
      if (cx + ox + 2 * r < 0 || cx + ox - 2 * r > Sz || cy + oy + 2 * r < 0 || cy + oy - 2 * r > Sz) continue;
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
      var Sz = 512, cv = document.createElement("canvas");
      cv.width = Sz; cv.height = Sz;
      var g = cv.getContext("2d"), R = rngFor(P.seed), i, k;
      g.fillStyle = P.base; g.fillRect(0, 0, Sz, Sz);
      for (i = 0; i < P.spots.length; i++) {
        g.fillStyle = P.spots[i][0];
        for (k = 0; k < P.spots[i][1]; k++)
          blob(g, R() * Sz, R() * Sz, P.spots[i][2] + (P.spots[i][3] - P.spots[i][2]) * R(), R, Sz);
      }
      g.strokeStyle = "rgba(0,0,0," + P.seam + ")"; g.lineWidth = 1;
      for (i = 0; i < Sz; i += 19) { g.beginPath(); g.moveTo(i + 0.5, 0); g.lineTo(i + 0.5, Sz); g.stroke(); }
      for (i = 0; i < Sz; i += 38) { g.beginPath(); g.moveTo(0, i + 0.5); g.lineTo(Sz, i + 0.5); g.stroke(); }
      tex = new THREE.CanvasTexture(cv);
      tex.encoding = THREE.sRGBEncoding;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = 4;
    } catch (e) { tex = null; }
    _sheets[key] = tex;
    return tex;
  }
  /* a grey scheme: P = { key, top, low, seed }; the sheets carry a faint
     mottle and the panel seams. Untextured values are dark on purpose: this
     three.js lifts a flat hex two to three stops on screen. */
  function materials(THREE, C, P) {
    function coat(which, base, seed) {
      var sp = { base: base, spots: [[shade(base, -0.05), 20, 8, 22], [shade(base, 0.05), 18, 8, 20]], seam: 0.15, seed: seed };
      var t = sheet(THREE, P.key + "/" + which, sp);
      var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.10, side: THREE.DoubleSide });
      if (t) m.map = t; else m.color.set(base);
      return m;
    }
    var tc = (C && C.team !== undefined) ? C.team : 0x3f7fd0;
    return {
      top: coat("top", P.top, P.seed),
      low: coat("low", P.low, P.seed + 1),
      ramp: coat("ramp", P.ramp || shade(P.low, -0.12), P.seed + 2),
      /* exactly C.team, so eraPaint's team test leaves it alone */
      team: new THREE.MeshStandardMaterial({ color: new THREE.Color(tc), roughness: 0.70, metalness: 0.08,
        emissive: new THREE.Color(tc), emissiveIntensity: 0.08, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({ color: 0x474d52, roughness: 0.52, metalness: 0.55, side: THREE.DoubleSide }),
      hot: new THREE.MeshStandardMaterial({ color: 0x191a1a, roughness: 0.65, metalness: 0.36, side: THREE.DoubleSide }),
      ink: new THREE.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide }),
      tyre: new THREE.MeshStandardMaterial({ color: 0x070809, roughness: 0.95, metalness: 0.04 }),
      blade: new THREE.MeshStandardMaterial({ color: 0x17191c, roughness: 0.62, metalness: 0.30, side: THREE.DoubleSide }),
      blur: new THREE.MeshStandardMaterial({ color: 0xd2d8dc, roughness: 0.5, metalness: 0.0,
        transparent: true, opacity: 0.11, depthWrite: false, side: THREE.DoubleSide }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x27383f, roughness: 0.13, metalness: 0.30, clearcoat: 0.35,
        transparent: true, opacity: 0.83, side: THREE.DoubleSide })
    };
  }
  function shade(hex, f) {
    var n = parseInt(hex.slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    function c(v) { v = Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f); return ("0" + Math.max(0, Math.min(255, v)).toString(16)).slice(-2); }
    return "#" + c(r) + c(g) + c(b);
  }

  /* ------------------------------------------------------- geometry kit -- */
  function geoFrom(THREE, pos, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    return g;
  }
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
  /* a finished skin part, its triangles shared out between materials by
     rule(centroid x, y, z, face normal x, y, z) */
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
  /* superellipse section ring, widest at zw, N points CCW seen from ahead */
  function secRing(x, yc, w, zt, zb, zw, e, N) {
    var r = [], j;
    for (j = 0; j < N; j++) {
      var t = j / N * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
      var z = s >= 0 ? zw + (zt - zw) * sgp(s, e) : zw + (zw - zb) * sgp(s, e);
      r.push([x, yc + w * sgp(c, e), z]);
    }
    return r;
  }
  /* body of revolution along -X: prof rows [aft of x0, radius] */
  function lathe(THREE, prof, N, x0, yc, zc, capA, capB) {
    var rings = [], i;
    for (i = 0; i < prof.length; i++) {
      var w = Math.max(prof[i][1], 0.004);
      rings.push(secRing(x0 - prof[i][0], yc, w, zc + w, zc - w, zc, 1, N));
    }
    return gridGeo(THREE, rings, capA, capB);
  }
  /* convex outline in X-Z, extruded +-t about y0 (a vertical plate) */
  function plate(THREE, ol, y0, t) {
    var n = ol.length, pos = [], idx = [], i;
    for (i = 0; i < n; i++) pos.push(ol[i][0], y0 + t, ol[i][1]);
    for (i = 0; i < n; i++) pos.push(ol[i][0], y0 - t, ol[i][1]);
    for (i = 1; i < n - 1; i++) { idx.push(0, i, i + 1); idx.push(n, n + i + 1, n + i); }
    for (i = 0; i < n; i++) { var j = (i + 1) % n; idx.push(i, n + i, j, j, n + i, n + j); }
    return geoFrom(THREE, pos, idx);
  }
  /* convex outline in X-Y, extruded +-t about z0 (a horizontal plate) */
  function hplate(THREE, ol, z0, t) {
    var n = ol.length, pos = [], idx = [], i;
    for (i = 0; i < n; i++) pos.push(ol[i][0], ol[i][1], z0 + t);
    for (i = 0; i < n; i++) pos.push(ol[i][0], ol[i][1], z0 - t);
    for (i = 1; i < n - 1; i++) { idx.push(0, i, i + 1); idx.push(n, n + i + 1, n + i); }
    for (i = 0; i < n; i++) { var j = (i + 1) % n; idx.push(i, n + i, j, j, n + i, n + j); }
    return geoFrom(THREE, pos, idx);
  }
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
  function egg(THREE, mat, rx, ry, rz, x, y, z, ws, hs) {
    var geo = new THREE.SphereGeometry(1, ws || 12, hs || 8);
    geo.rotateZ(Math.PI / 2);
    geo.scale(rx, ry, rz);
    geo.translate(x, y, z);
    planarUV(THREE, geo);
    return new THREE.Mesh(geo, mat);
  }
  /* a flat disc facing along X, optionally squashed in z */
  function disc(THREE, mat, r, x, y, z, n, kz) {
    var geo = new THREE.CircleGeometry(r, n || 14);
    geo.rotateY(Math.PI / 2);
    if (kz) geo.scale(1, 1, kz);
    geo.translate(x, y, z);
    return new THREE.Mesh(geo, mat);
  }
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
  /* resample a station table evenly in d (column 0) with a Catmull-Rom spline */
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
  /* the wing at span y: leading and trailing edge d, mean height h, t/c */
  function wingAt(S, y) {
    var W = S.WING, i, a, b, t;
    y = Math.abs(y);
    if (y <= W[0][0]) return { dLE: W[0][1], dTE: W[0][2], h: S.wz(y), tc: S.wtc(y) };
    for (i = 1; i < W.length; i++) {
      if (W[i][0] >= y) {
        a = W[i - 1]; b = W[i]; t = (y - a[0]) / (b[0] - a[0]);
        return { dLE: a[1] + (b[1] - a[1]) * t, dTE: a[2] + (b[2] - a[2]) * t, h: S.wz(y), tc: S.wtc(y) };
      }
    }
    b = W[W.length - 1];
    return { dLE: b[1], dTE: b[2], h: S.wz(y), tc: S.wtc(y) };
  }
  /* height h of the upper or lower wing skin at span y, station d */
  function wingH(S, y, d, upper) {
    var w = wingAt(S, y), c = w.dTE - w.dLE, x = Math.min(1, Math.max(0, (d - w.dLE) / c));
    return w.h + ((S.camber || 0) * 4 * x * (1 - x) + (upper ? 1 : -1) * naca(x, w.tc)) * c;
  }

  /* ---------------------------------------------------------- airframe -- */
  var NF = 28;
  /* a lofted body: rows [d, half width, top h, bottom h, squareness], rule
     gives the material of each triangle; the fuselage parts its two coats
     along the ring angle nearest VLOW */
  var VLOW = -0.30;
  function addBody(THREE, g, T, S, rows, yc, capA, capB, rule) {
    var rings = rows.map(function (s) {
      return secRing(X(S, s[0]), yc, s[1], Z(S, s[2]), Z(S, s[3]), Z(S, zwOf(s[2], s[3])), s[4], NF);
    });
    var tq = 2 * Math.PI / NF, sd = Math.sin(Math.round(Math.asin(VLOW) / tq) * tq);
    emit(THREE, g, gridGeo(THREE, rings, capA, capB), T, rule || function (cx, cy, cz) {
      var s = secAt(S.NOSE - cx, rows), zw = Z(S, zwOf(s[2], s[3])), e = s[4];
      var u = Math.max(-1, Math.min(1, (cy - yc) / Math.max(0.01, s[1])));
      var v = Math.max(-1, Math.min(1, (cz - zw) / Math.max(0.01, cz >= zw ? Z(S, s[2]) - zw : zw - Z(S, s[3]))));
      return Math.sin(Math.atan2(sgp(v, 1 / e), sgp(u, 1 / e))) < sd - 1e-6 ? "low" : "top";
    });
  }
  function addFuselage(THREE, g, T, S) {
    if (!S.SEC) S.SEC = resampleD(S.FUS, S.NSEC || 52);
    addBody(THREE, g, T, S, S.SEC, 0, true, true);
  }
  /* a patch laid just proud of the fuselage between stations d0..d1 and
     ring angles t0..t1 (deg, 0 = port, 90 = crown, -90 = belly) */
  function hullPatch(THREE, S, d0, d1, t0, t1, nd, nt) {
    var pos = [], idx = [], i, j;
    for (i = 0; i <= nd; i++) {
      var d = d0 + (d1 - d0) * i / nd, s = secAt(d, S.SEC), zw = Z(S, zwOf(s[2], s[3]));
      for (j = 0; j <= nt; j++) {
        var t = (t0 + (t1 - t0) * j / nt) * D2R, c = Math.cos(t), sn = Math.sin(t), e = s[4];
        var z = sn >= 0 ? zw + (Z(S, s[2]) - zw) * sgp(sn, e) : zw + (zw - Z(S, s[3])) * sgp(sn, e);
        pos.push(X(S, d), s[1] * sgp(c, e) * 1.012, zw + (z - zw) * 1.012 + 0.008);
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
  function addWings(THREE, g, T, S) {
    for (var s = -1; s <= 1; s += 2) {
      var rings = S.WING.map(function (st) {
        var y = st[0], c = st[2] - st[1], zm = Z(S, S.wz(y)), tc = S.wtc(y);
        return foil(11, tc, S.camber || 0).map(function (p) { return [X(S, st[1] + p[0] * c), s * y, zm + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz, nx, ny, nz) {
        if (Math.abs(cy) > S.yTeam) return "team";
        return nz < 0 ? "low" : "top";
      });
    }
  }
  function addStab(THREE, g, T, S) {
    for (var s = -1; s <= 1; s += 2) {
      var sr = S.STAB.map(function (st) {
        var y = st[0], c = st[2] - st[1], zm = Z(S, S.sz(y)), tc = S.stc(y);
        return foil(9, tc, 0).map(function (p) { return [X(S, st[1] + p[0] * c), s * y, zm + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, sr, true, true), T, function (cx, cy, cz, nx, ny, nz) { return nz < 0 ? "low" : "top"; });
    }
  }
  /* fin rows [h, LE d, TE d, t/c] */
  function addFin(THREE, g, T, S) {
    var rings = S.FIN.map(function (f) {
      var c = f[2] - f[1];
      return foil(9, f[3], 0).map(function (p) { return [X(S, f[1] + p[0] * c), p[1] * c, Z(S, f[0])]; });
    });
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz) {
      return cz > Z(S, S.finTeam) ? "team" : "top";
    });
  }
  function engRule(cx, cy, cz, nx, ny, nz) { return nx < -0.75 ? "hot" : (nz < -0.15 ? "low" : "top"); }
  /* a turbofan pod: prof rows [aft of the lip, radius] (the first row is the
     lip's inside), the intake face dark, the nozzle hot, a spinner */
  function fanPod(THREE, g, T, prof, x0, yc, zc, spin) {
    var L = prof[prof.length - 1][0], R0 = prof[0][1];
    emit(THREE, g, lathe(THREE, prof, 20, x0, yc, zc, false, true), T, engRule);
    g.add(disc(THREE, T.ink, R0 + 0.01, x0 - prof[0][0], yc, zc, 20));
    g.add(disc(THREE, T.hot, prof[prof.length - 1][1] + 0.02, x0 - L - 0.01, yc, zc, 12));
    if (spin) {
      var sp = outward(lathe(THREE, [[0, 0.02], [0.22, R0 * 0.18], [0.5, R0 * 0.30]], 8, x0 - prof[0][0] + 0.5, yc, zc, false, true));
      sp.computeVertexNormals();
      g.add(new THREE.Mesh(sp, T.metal));
    }
  }
  /* an underwing pylon from the pod's crown up into the wing's lower skin */
  function pylon(THREE, g, T, S, y, dA, dB, hA, dC, dD, t) {
    var lo1 = wingH(S, y, dD, false) + 0.08, lo2 = wingH(S, y, dC, false) + 0.08;
    emit(THREE, g, plate(THREE, [[X(S, dA), Z(S, hA)], [X(S, dB), Z(S, hA)], [X(S, dC), Z(S, lo2)], [X(S, dD), Z(S, lo1)]],
      y, t), T, engRule);
  }

  /* --------------------------------------------------------------- gear -- */
  function tyreSet(THREE, gear, T, x, y, z, R, W) {
    var t = new THREE.Mesh(new THREE.CylinderGeometry(R, R, W, 16, 1), T.tyre);
    t.position.set(x, y, z);
    gear.add(t);
    var h = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.55, R * 0.55, W + 0.03, 10, 1), T.metal);
    h.position.set(x, y, z);
    gear.add(h);
  }
  /* G: { ax: [axle stations], R: tyre radius, W: tyre width, du: half the
     spacing of the two tyres on an axle }, legs up to topH (h) */
  function truck(THREE, gear, T, S, G, yc, topH) {
    var mz = Z(S, G.R), i, o, dmid = (G.ax[0] + G.ax[G.ax.length - 1]) / 2;
    for (i = 0; i < G.ax.length; i++) {
      for (o = -1; o <= 1; o += 2) tyreSet(THREE, gear, T, X(S, G.ax[i]), yc + o * G.du, mz, G.R, G.W);
      gear.add(taper(THREE, T.metal, [X(S, G.ax[i]), yc - G.du, mz], [X(S, G.ax[i]), yc + G.du, mz], 0.06, 0.06, 6));
    }
    if (G.ax.length > 1)
      gear.add(taper(THREE, T.metal, [X(S, G.ax[0]), yc, mz + 0.05], [X(S, G.ax[G.ax.length - 1]), yc, mz + 0.05], 0.09, 0.09, 6));
    gear.add(taper(THREE, T.metal, [X(S, dmid), yc, Z(S, topH)], [X(S, dmid), yc, mz + 0.05], 0.15, 0.11, 8));
  }

  /* --------------------------------------------------------- propeller --
     One blade: six stations along it, a twisted strip. a is its angle round
     the shaft from straight up; spin +1 turns it about +X (clockwise seen
     from behind), -1 the other way. The scimitar tip trails the rotation and
     the leading edge leads it. */
  function addBlade(THREE, g, mat, x, yc, zc, a, rp, spin, B) {
    var pos = [], idx = [], k;
    var PT = [55, 45, 36, 29, 24, 21];
    var er = [Math.sin(a), Math.cos(a)], et = [Math.cos(a), -Math.sin(a)];
    /* direction of motion of the blade at angle a: +X rotation turns +Y into
       +Z, i.e. the top moves toward -Y, which is -et */
    var m = [-spin * et[0], -spin * et[1]];
    for (k = 0; k < 6; k++) {
      var f = B.rr[k], r = f * rp, hc = B.ch[k] * rp / 2, pr = PT[k] * D2R;
      var sw = -B.sw * rp * f * f * f;          /* trailing: against the motion */
      var by = yc + er[0] * r + m[0] * sw, bz = zc + er[1] * r + m[1] * sw;
      pos.push(x + hc * Math.sin(pr), by + m[0] * hc * Math.cos(pr), bz + m[1] * hc * Math.cos(pr));
      pos.push(x - hc * Math.sin(pr), by - m[0] * hc * Math.cos(pr), bz - m[1] * hc * Math.cos(pr));
    }
    for (k = 0; k < 5; k++) { var a0 = 2 * k; idx.push(a0, a0 + 1, a0 + 2, a0 + 1, a0 + 3, a0 + 2); }
    var geo = geoFrom(THREE, pos, idx);
    geo.computeVertexNormals();
    g.add(new THREE.Mesh(geo, mat));
  }

  /* ---------------------------------------------------------- merging --
     One mesh per material for the airframe, one per material for the gear
     group (named "gear"). */
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
          if (!geo.attributes.normal) geo.computeVertexNormals();
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

  return {
    D2R: D2R, X: X, Z: Z, materials: materials, gridGeo: gridGeo, outward: outward, emit: emit,
    secRing: secRing, lathe: lathe, plate: plate, hplate: hplate, taper: taper, box: box, egg: egg,
    disc: disc, foil: foil, resampleD: resampleD, secAt: secAt, zwOf: zwOf, wingAt: wingAt,
    wingH: wingH, addBody: addBody, addFuselage: addFuselage, hullPatch: hullPatch, addWings: addWings,
    addStab: addStab, addFin: addFin, engRule: engRule, fanPod: fanPod, pylon: pylon,
    tyreSet: tyreSet, truck: truck, addBlade: addBlade, mergeByMaterial: mergeByMaterial
  };
})();

/* ======================================================= VICKERS VC10 K.3 ==
   All off V1 (side 11.28 px/m about the fuselage axis at row 387.5; plan
   11.43 px/m along, 11.51 across; front 11.20 px/m, ground row 203), the
   axis 4.15 m above the ground (front view: the belly 1.9 m up, the fin top
   11.9 m). Stations from the nose (the probe reaches 3.0 m ahead of it). */
var HeroVC10K3 = (function (K) {
  "use strict";
  var S = {
    HAX: 4.15, DMIN: -3.0, DMAX: 52.3,
    /* d, half width, top h, bottom h, squareness. The body is 3.90 m wide in
       plan and 4.52 m deep in side (1.89 to 6.41 m up); the nose droops to
       its tip 3.9 m up; the tail cone narrows behind the wing and ends at the
       APU 46.6 m aft. Under the engines the belly rises from 33 m; the HDU
       fairing below fills the step V1 draws at 38.3 m. */
    FUS: [
      [0.0, 0.10, 4.05, 3.75, 1.0], [0.3, 0.48, 4.45, 3.15, 0.97], [0.6, 0.74, 4.58, 2.95, 0.96],
      [1.0, 1.00, 4.75, 2.78, 0.95], [1.5, 1.17, 5.00, 2.60, 0.95], [2.0, 1.35, 5.52, 2.42, 0.95],
      [3.0, 1.60, 5.88, 2.24, 0.95], [4.0, 1.78, 6.14, 2.07, 0.95], [5.0, 1.92, 6.30, 1.95, 0.95],
      [6.5, 1.95, 6.41, 1.89, 0.95], [20.0, 1.95, 6.41, 1.85, 0.95], [30.0, 1.95, 6.41, 1.82, 0.95],
      [33.0, 1.93, 6.41, 1.87, 0.95], [35.0, 1.86, 6.39, 2.05, 0.95], [37.0, 1.72, 6.35, 2.45, 0.95],
      [38.3, 1.62, 6.30, 2.80, 0.95], [40.0, 1.35, 6.15, 3.13, 0.96], [42.0, 1.05, 5.95, 3.57, 0.97],
      [44.0, 0.75, 5.75, 4.02, 0.98], [45.5, 0.48, 5.50, 4.38, 1.0], [46.6, 0.18, 5.15, 4.80, 1.0]
    ],
    /* y, LE d, TE d: the trailing edge straight to 6.5 m, the leading edge
       swept 37.5 deg; the tip 1.9 m long at 22.27 m */
    WING: [[1.95, 18.90, 29.75], [6.5, 22.15, 29.75], [11.0, 25.6, 31.65], [16.0, 29.45, 33.75],
           [20.0, 32.5, 35.45], [22.27, 34.5, 36.45]],
    wz: function (y) { return 3.05 + 0.071 * (Math.abs(y) - 2); },     /* 4.1 deg (front view) */
    wtc: function (y) { return 0.125 - 0.035 * Math.min(1, Math.abs(y) / 22.27); },
    camber: 0.012, yTeam: 21.1,
    STAB: [[0.4, 44.6, 49.95], [3.5, 46.9, 50.9], [6.4, 49.1, 51.9], [6.7, 49.85, 52.3]],
    sz: function () { return 11.75; },
    stc: function () { return 0.09; },
    /* h, LE d, TE d, t/c: the leading edge swept 50 deg, the trailing edge
       46.4 m at the root to 49.2 m at the top (V1 side) */
    FIN: [[5.6, 33.4, 46.2, 0.07], [6.6, 36.6, 46.45, 0.10], [8.2, 40.0, 47.3, 0.11],
          [10.0, 42.1, 48.4, 0.10], [11.0, 43.2, 48.95, 0.095], [11.55, 43.85, 49.25, 0.09]],
    finTeam: 10.9,
    nose: { d: 4.9, R: 0.43, W: 0.30, tr: 0.30 },
    main: { y: 3.27, ax: [26.2, 28.8], R: 0.62, W: 0.42, du: 0.40 }
  };
  S.NOSE = (S.DMIN + S.DMAX) / 2;
  var X = function (d) { return K.X(S, d); }, Z = function (h) { return K.Z(S, h); };
  var PAINT = { key: "vc10k3", top: "#a2a8ab", low: "#959b9f", seed: 501 };

  /* Conway RCo.43 pods: lip 34.6 m, 6.6 m long, 1.6 m across, two side by
     side at 3.22 and 4.83 m, axis 5.0 m up (V1 front and plan, V2) */
  var CONWAY = [[0.30, 0.64], [0.0, 0.72], [0.25, 0.79], [1.2, 0.80], [4.6, 0.78], [5.7, 0.68], [6.6, 0.55]];
  function addEngines(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      K.fanPod(THREE, g, T, CONWAY, X(34.6), s * 3.22, Z(5.0), true);
      K.fanPod(THREE, g, T, CONWAY, X(34.6), s * 4.83, Z(5.0), true);
      /* the stub wing carrying the pair, over the nacelles' inner halves */
      K.emit(THREE, g, K.hplate(THREE, [[X(35.6), s * 1.5], [X(35.9), s * 4.2], [X(40.0), s * 4.2], [X(41.0), s * 1.5]],
        Z(5.55), 0.16), T, K.engRule);
    }
  }
  /* the Mk 32 pods 14.6 m out, nose at 26.2 m, 4.0 m long (V1 plan and
     front: 2.55 m up; V2: the length against the nacelles) */
  var MK32 = [[0, 0.04], [0.3, 0.30], [0.8, 0.45], [2.8, 0.47], [3.6, 0.36], [4.0, 0.12]];
  function addPods(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      K.emit(THREE, g, K.lathe(THREE, MK32, 14, X(26.2), s * 14.6, Z(2.55), true, true), T, K.engRule);
      K.pylon(THREE, g, T, S, s * 14.6, 27.0, 29.6, 2.95, 30.4, 28.3, 0.12);
    }
  }
  /* the HDU fairing under the rear fuselage ending in V1's square step at
     38.3 m, the hose exit dark on its aft face */
  function addHDU(THREE, g, T) {
    K.addBody(THREE, g, T, S, [[33.4, 0.15, 2.25, 2.10, 1.0], [34.3, 0.62, 2.45, 1.93, 0.9], [36.0, 0.70, 2.70, 1.89, 0.85],
      [38.3, 0.70, 3.00, 1.89, 0.85]], 0, true, true, function () { return "low"; });
    g.add(K.box(THREE, T.ink, 0.04, 0.85, 0.48, X(38.32), 0, Z(2.25)));
  }
  function addDetails(THREE, g, T) {
    /* the flight deck glazing */
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 1.55, 2.35, 38, 142, 3, 8), T.glass));
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 2.4, 3.3, 22, 40, 2, 2), T.glass));
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 2.4, 3.3, 140, 158, 2, 2), T.glass));
    /* the probe along the nose crown, 3.0 m ahead (V1 side, V2) */
    g.add(K.taper(THREE, T.metal, [X(-3.0), 0, Z(4.42)], [X(1.4), 0, Z(4.42)], 0.06, 0.09, 8));
    g.add(K.taper(THREE, T.metal, [X(-3.0), 0, Z(4.42)], [X(-2.75), 0, Z(4.42)], 0.04, 0.10, 8));
    /* the bullet at the top of the fin, ahead of the tailplane (V1, V2) */
    K.emit(THREE, g, K.lathe(THREE, [[0, 0.03], [0.6, 0.30], [1.4, 0.42], [3.2, 0.42], [4.4, 0.25]], 12, X(42.9), 0, Z(11.62), false, true),
      T, function (cx, cy, cz) { return "team"; });
    /* the APU exhaust at the end of the tail cone */
    g.add(K.disc(THREE, T.hot, 0.16, X(46.62), 0, Z(4.97), 10));
  }
  function addGear(THREE, g, T) {
    var gear = new THREE.Group(), N = S.nose, nz = Z(N.R), s;
    gear.name = "gear";
    for (s = -1; s <= 1; s += 2) K.tyreSet(THREE, gear, T, X(N.d), s * N.tr, nz, N.R, N.W);
    gear.add(K.taper(THREE, T.metal, [X(N.d - 0.1), 0, Z(K.secAt(N.d, S.SEC)[3] + 0.2)], [X(N.d), 0, nz], 0.10, 0.08, 8));
    gear.add(K.taper(THREE, T.metal, [X(N.d), -N.tr, nz], [X(N.d), N.tr, nz], 0.05, 0.05, 6));
    gear.add(new THREE.Mesh(K.hullPatch(THREE, S, N.d - 0.9, N.d + 0.9, -118, -62, 2, 3), T.ink));
    var M = S.main;
    for (s = -1; s <= 1; s += 2)
      K.truck(THREE, gear, T, S, M, s * M.y, K.wingH(S, M.y, (M.ax[0] + M.ax[1]) / 2 - 1.5, false) + 0.1);
    g.add(gear);
  }
  function build(THREE, M, C) {
    if (!S.SEC) S.SEC = K.resampleD(S.FUS, 56);
    var T = K.materials(THREE, C, PAINT), g = new THREE.Group();
    K.addFuselage(THREE, g, T, S);
    K.addWings(THREE, g, T, S);
    K.addFin(THREE, g, T, S);
    K.addStab(THREE, g, T, S);
    addEngines(THREE, g, T);
    addPods(THREE, g, T);
    addHDU(THREE, g, T);
    addDetails(THREE, g, T);
    addGear(THREE, g, T);
    return K.mergeByMaterial(THREE, g);
  }
  return { build: build, len: S.DMAX - S.DMIN };
})(EuBigKit);

/* ================================================== LOCKHEED TRISTAR K.1 ==
   All off T1 (14.77 px/m, ground row 274; heights h above that ground line,
   the fuselage axis 5.0 m up), the HDUs off T2. */
var HeroTriStarK1 = (function (K) {
  "use strict";
  var S = {
    HAX: 5.0, DMIN: 0, DMAX: 50.1,
    /* the body 6.22 m wide (T1's dimension) and 6.1 m deep, the crown 8.06 m
       up and the belly 2.10; the tail cone narrows from 34 m and runs into the
       centre engine's nacelle at 48 m */
    FUS: [
      [0.0, 0.10, 4.45, 4.15, 1.0], [0.3, 0.55, 4.87, 3.79, 0.97], [0.6, 0.85, 5.15, 3.59, 0.96],
      [1.0, 1.08, 5.35, 3.39, 0.95], [1.5, 1.35, 5.69, 3.25, 0.95], [2.0, 1.56, 6.23, 3.11, 0.95],
      [3.0, 1.96, 6.84, 2.91, 0.95], [4.0, 2.30, 7.24, 2.71, 0.95], [5.0, 2.57, 7.45, 2.57, 0.95],
      [6.0, 2.78, 7.65, 2.44, 0.95], [8.0, 3.05, 7.92, 2.23, 0.96], [10.0, 3.11, 8.06, 2.12, 0.96],
      [33.0, 3.11, 8.06, 2.10, 0.96], [36.0, 3.05, 8.04, 2.12, 0.96], [38.0, 2.84, 8.00, 2.44, 0.96],
      [40.0, 2.57, 7.95, 2.78, 0.96], [42.0, 2.23, 7.85, 3.25, 0.96], [44.0, 1.90, 7.75, 3.93, 0.97],
      [46.0, 1.49, 7.60, 4.60, 0.98], [47.0, 1.29, 7.50, 4.87, 1.0], [48.2, 1.05, 7.40, 5.40, 1.0]
    ],
    WING: [[3.11, 19.60, 31.20], [8.0, 23.22, 31.75], [12.0, 26.34, 33.24], [16.0, 29.45, 34.87],
           [20.0, 32.57, 36.70], [24.0, 35.68, 38.52], [25.05, 36.60, 38.95]],
    wz: function (y) { return 3.40 + 0.0935 * (Math.abs(y) - 3.11); },  /* 5.3 deg (T1 front) */
    wtc: function (y) { return 0.13 - 0.04 * Math.min(1, Math.abs(y) / 25.05); },
    camber: 0.012, yTeam: 23.9,
    STAB: [[1.6, 40.1, 47.1], [3.5, 41.57, 47.73], [7.0, 44.37, 48.82], [10.5, 47.19, 49.97], [10.9, 47.6, 50.1]],
    sz: function () { return 5.80; },
    stc: function () { return 0.09; },
    /* the rudder runs down behind the duct fairing to the tail engine, its
       trailing edge 48.75 m at 8.5 m up (T1 side) */
    FIN: [[8.4, 41.0, 48.73, 0.10], [10.6, 41.96, 49.08, 0.12], [12.0, 43.23, 49.31, 0.11], [14.0, 45.04, 49.64, 0.10],
          [16.0, 46.85, 49.97, 0.09], [16.85, 47.62, 50.05, 0.085]],
    finTeam: 16.0,
    nose: { d: 9.0, R: 0.43, W: 0.30, tr: 0.30 },
    main: { y: 5.40, ax: [27.5, 29.3], R: 0.60, W: 0.45, du: 0.45 }
  };
  S.NOSE = (S.DMIN + S.DMAX) / 2;
  var X = function (d) { return K.X(S, d); }, Z = function (h) { return K.Z(S, h); };
  var PAINT = { key: "tristar", top: "#8f969a", low: "#868c90", seed: 521 };

  /* RB211-524: lip 20.4 m, fan cowl to 25.1, core to 28.8, 10.3 m out, axis
     2.4 m up, 3.0 m across (T1 plan, side, front) */
  var RB211 = [[0.35, 1.30], [0.0, 1.40], [0.25, 1.50], [1.2, 1.50], [3.8, 1.42], [4.7, 1.20],
               [4.75, 0.95], [6.5, 0.85], [8.2, 0.62], [8.45, 0.42]];
  var TAILENG = [[0.0, 1.25], [2.0, 1.25], [3.6, 1.15], [4.8, 1.0], [5.6, 0.85], [6.0, 0.75]];
  function addEngines(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      K.fanPod(THREE, g, T, RB211, X(20.4), s * 10.3, Z(2.4), true);
      K.pylon(THREE, g, T, S, s * 10.3, 21.4, 25.3, 3.75, 29.6, 24.4, 0.22);
    }
    /* the centre engine: S-duct fairing on the crown, its intake 35.0 m aft
       of the nose, centre 9.65 m up, 2.7 m high, 2.6 m across (T1 side and
       front); the fairing 2.6 m wide to the fin; the engine exhausts at the
       very tail, 50.0 m aft, nozzle 0.75 m (T1 side) */
    K.addBody(THREE, g, T, S, [[35.0, 1.30, 11.0, 8.30, 0.9], [35.6, 1.32, 11.04, 7.90, 0.9], [41.0, 1.29, 11.10, 7.80, 0.9],
      [44.0, 1.25, 11.20, 7.60, 0.9], [45.6, 1.18, 10.90, 7.40, 0.92], [47.0, 1.05, 9.70, 7.30, 0.94],
      [48.3, 0.85, 8.70, 7.30, 0.96]], 0, false, true);
    g.add(K.disc(THREE, T.ink, 1.18, X(35.02), 0, Z(9.65), 18, 1.12));
    K.emit(THREE, g, K.lathe(THREE, TAILENG, 18, X(44.0), 0, Z(6.95), false, true), T, K.engRule);
    g.add(K.disc(THREE, T.hot, 0.70, X(50.02), 0, Z(6.95), 14));
  }
  /* the two Mk 17T HDUs in tandem under the rear fuselage (T2: between the
     rear door and the tailplane root, about 35-40 m aft) */
  function addHDU(THREE, g, T) {
    [[35.2, 37.0], [38.0, 39.8]].forEach(function (r) {
      var b0 = K.secAt(r[0], S.SEC)[3], b1 = K.secAt(r[1], S.SEC)[3];
      K.addBody(THREE, g, T, S, [[r[0], 0.20, b0 + 0.25, b0 + 0.05, 1.0], [r[0] + 0.5, 0.55, b0 + 0.3, b0 - 0.22, 0.85],
        [r[1], 0.55, b1 + 0.4, b1 - 0.22, 0.85]], 0, true, true, function () { return "low"; });
      g.add(K.box(THREE, T.ink, 0.04, 0.80, 0.30, X(r[1] + 0.02), 0, Z(b1 - 0.06)));
    });
  }
  function addDetails(THREE, g, T) {
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 2.1, 3.0, 42, 138, 3, 8), T.glass));
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 3.05, 3.9, 30, 46, 2, 2), T.glass));
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 3.05, 3.9, 134, 150, 2, 2), T.glass));
    /* the wing-body fairing under the centre section (T1 plan: 4.2 m out at
       30 m; side: the belly 1.90 m up) */
    g.add(K.egg(THREE, T.low, 8.6, 3.5, 0.80, X(25.5), 0, Z(2.65), 18, 8));
  }
  function addGear(THREE, g, T) {
    var gear = new THREE.Group(), N = S.nose, nz = Z(N.R), s;
    gear.name = "gear";
    for (s = -1; s <= 1; s += 2) K.tyreSet(THREE, gear, T, X(N.d), s * N.tr, nz, N.R, N.W);
    gear.add(K.taper(THREE, T.metal, [X(N.d - 0.1), 0, Z(K.secAt(N.d, S.SEC)[3] + 0.2)], [X(N.d), 0, nz], 0.12, 0.09, 8));
    gear.add(K.taper(THREE, T.metal, [X(N.d), -N.tr, nz], [X(N.d), N.tr, nz], 0.05, 0.05, 6));
    gear.add(new THREE.Mesh(K.hullPatch(THREE, S, N.d - 1.0, N.d + 1.0, -116, -64, 2, 3), T.ink));
    var M = S.main;
    for (s = -1; s <= 1; s += 2)
      K.truck(THREE, gear, T, S, M, s * M.y, K.wingH(S, M.y, (M.ax[0] + M.ax[1]) / 2, false) + 0.1);
    g.add(gear);
  }
  function build(THREE, M, C) {
    if (!S.SEC) S.SEC = K.resampleD(S.FUS, 56);
    var T = K.materials(THREE, C, PAINT), g = new THREE.Group();
    K.addFuselage(THREE, g, T, S);
    K.addWings(THREE, g, T, S);
    K.addFin(THREE, g, T, S);
    K.addStab(THREE, g, T, S);
    addEngines(THREE, g, T);
    addHDU(THREE, g, T);
    addDetails(THREE, g, T);
    addGear(THREE, g, T);
    return K.mergeByMaterial(THREE, g);
  }
  return { build: build, len: S.DMAX - S.DMIN };
})(EuBigKit);

/* ====================================================== AIRBUS A310 MRTT ==
   All off A1 (15.09 px/m, ground row 274, heights as drawn: the airframe
   stands 1.05 deg nose down on its gear and every row keeps that), the pods
   off A2. Axis about 5.45 m up. */
var HeroA310MRTT = (function (K) {
  "use strict";
  var S = {
    HAX: 5.45, DMIN: 0, DMAX: 46.6,
    FUS: [
      [0.0, 0.10, 4.95, 4.55, 1.0], [0.3, 0.45, 5.30, 4.17, 0.98], [0.6, 0.70, 5.50, 3.91, 0.98],
      [1.0, 0.96, 5.70, 3.71, 0.98], [1.5, 1.20, 6.10, 3.45, 0.98], [2.0, 1.42, 6.49, 3.25, 0.98],
      [2.5, 1.62, 6.83, 3.11, 0.98], [3.0, 1.82, 7.02, 2.98, 0.98], [4.0, 2.09, 7.36, 2.72, 0.98],
      [5.0, 2.28, 7.62, 2.55, 0.98], [6.0, 2.48, 7.89, 2.47, 0.98], [8.0, 2.75, 8.08, 2.45, 0.98],
      [10.0, 2.81, 8.12, 2.48, 0.98], [28.0, 2.81, 8.45, 2.82, 0.98], [30.0, 2.68, 8.48, 3.00, 0.98],
      [32.0, 2.48, 8.55, 3.31, 0.98], [34.0, 2.35, 8.61, 3.78, 0.98], [36.0, 2.10, 8.62, 4.37, 0.98],
      [38.0, 1.80, 8.62, 5.10, 0.98], [40.0, 1.49, 8.62, 5.90, 0.98], [42.0, 1.09, 8.60, 6.63, 1.0],
      [44.0, 0.70, 8.55, 7.22, 1.0], [46.0, 0.35, 8.50, 7.82, 1.0], [46.6, 0.18, 8.35, 8.05, 1.0]
    ],
    WING: [[2.9, 15.0, 24.9], [3.5, 15.76, 24.9], [8.0, 18.48, 24.9], [10.0, 19.67, 25.23], [14.0, 22.05, 26.69],
           [18.0, 24.44, 28.15], [21.0, 26.29, 29.21], [21.95, 26.89, 29.50]],
    wz: function (y) { return 4.40 + 0.092 * (Math.abs(y) - 2.9); },    /* 5.3 deg (A1 front) */
    wtc: function (y) { return 0.135 - 0.04 * Math.min(1, Math.abs(y) / 21.95); },
    camber: 0.012, yTeam: 20.9,
    STAB: [[1.2, 39.1, 44.0], [3.0, 40.4, 44.7], [5.0, 41.85, 45.43], [7.0, 43.38, 46.16], [8.13, 44.2, 46.5]],
    sz: function (y) { return 6.55 + 0.11 * (Math.abs(y) - 1.2); },     /* 6.3 deg (A1 front) */
    stc: function () { return 0.09; },
    FIN: [[8.2, 34.4, 43.0, 0.12], [9.0, 35.3, 43.34, 0.11], [12.0, 38.63, 44.5, 0.10],
          [14.0, 40.85, 45.29, 0.095], [16.0, 43.07, 46.06, 0.09], [16.2, 43.3, 46.14, 0.09]],
    finTeam: 15.3,
    nose: { d: 6.0, R: 0.43, W: 0.30, tr: 0.28 },
    main: { y: 4.35, ax: [21.9, 23.55], R: 0.58, W: 0.42, du: 0.42 }
  };
  S.NOSE = (S.DMIN + S.DMAX) / 2;
  var X = function (d) { return K.X(S, d); }, Z = function (h) { return K.Z(S, h); };
  var PAINT = { key: "a310mrtt", top: "#9ea4a8", low: "#949a9e", seed: 541 };

  /* CF6-80C2: lip 12.7 m, fan cowl to 17.2, core and plug to 20.0, 8.05 m
     out, axis 2.9 m up, 2.9 m across (A1 plan, side, front; A3) */
  var CF6 = [[0.35, 1.25], [0.0, 1.33], [0.25, 1.43], [1.2, 1.45], [3.6, 1.38], [4.5, 1.15],
             [4.55, 0.90], [6.3, 0.75], [7.1, 0.50], [7.3, 0.30]];
  function addEngines(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      K.fanPod(THREE, g, T, CF6, X(12.7), s * 8.05, Z(2.9), true);
      K.pylon(THREE, g, T, S, s * 8.05, 13.7, 17.4, 4.15, 22.8, 18.0, 0.22);
    }
  }
  /* the hose-and-drogue pods under the outer wing, 15.4 m out (A2), 4.0 m
     long on a pylon (size NOT CONFIRMED) */
  var POD = [[0, 0.05], [0.3, 0.28], [0.8, 0.42], [2.8, 0.44], [3.6, 0.34], [4.0, 0.12]];
  function addPods(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      K.emit(THREE, g, K.lathe(THREE, POD, 14, X(21.9), s * 15.4, Z(4.62), true, true), T, K.engRule);
      K.pylon(THREE, g, T, S, s * 15.4, 22.6, 25.2, 5.0, 25.9, 23.4, 0.10);
    }
  }
  /* the wing-tip fences, 0.5 m above and below the tip (A1 front, A2) */
  function addFences(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var h = S.wz(21.95);
      K.emit(THREE, g, K.plate(THREE, [[X(27.4), Z(h - 0.45)], [X(29.6), Z(h - 0.25)], [X(29.7), Z(h + 0.55)], [X(28.6), Z(h + 0.6)]],
        s * 21.98, 0.05), T, function () { return "team"; });
    }
  }
  function addDetails(THREE, g, T) {
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 1.85, 2.7, 44, 136, 3, 8), T.glass));
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 2.75, 3.5, 32, 46, 2, 2), T.glass));
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 2.75, 3.5, 134, 148, 2, 2), T.glass));
    /* the belly fairing over the gear bays and centre section */
    g.add(K.egg(THREE, T.low, 7.0, 2.95, 0.55, X(20.5), 0, Z(2.9), 18, 8));
    g.add(K.disc(THREE, T.hot, 0.14, X(46.62), 0, Z(8.2), 10));
  }
  function addGear(THREE, g, T) {
    var gear = new THREE.Group(), N = S.nose, nz = Z(N.R), s;
    gear.name = "gear";
    for (s = -1; s <= 1; s += 2) K.tyreSet(THREE, gear, T, X(N.d), s * N.tr, nz, N.R, N.W);
    gear.add(K.taper(THREE, T.metal, [X(N.d - 0.1), 0, Z(K.secAt(N.d, S.SEC)[3] + 0.2)], [X(N.d), 0, nz], 0.11, 0.08, 8));
    gear.add(K.taper(THREE, T.metal, [X(N.d), -N.tr, nz], [X(N.d), N.tr, nz], 0.05, 0.05, 6));
    gear.add(new THREE.Mesh(K.hullPatch(THREE, S, N.d - 0.9, N.d + 0.9, -116, -64, 2, 3), T.ink));
    var M = S.main;
    for (s = -1; s <= 1; s += 2)
      K.truck(THREE, gear, T, S, M, s * M.y, K.wingH(S, M.y, (M.ax[0] + M.ax[1]) / 2, false) + 0.1);
    g.add(gear);
  }
  function build(THREE, M, C) {
    if (!S.SEC) S.SEC = K.resampleD(S.FUS, 56);
    var T = K.materials(THREE, C, PAINT), g = new THREE.Group();
    K.addFuselage(THREE, g, T, S);
    K.addWings(THREE, g, T, S);
    K.addFin(THREE, g, T, S);
    K.addStab(THREE, g, T, S);
    addEngines(THREE, g, T);
    addPods(THREE, g, T);
    addFences(THREE, g, T);
    addDetails(THREE, g, T);
    addGear(THREE, g, T);
    return K.mergeByMaterial(THREE, g);
  }
  return { build: build, len: S.DMAX - S.DMIN };
})(EuBigKit);

/* ====================================================== AIRBUS A400M ======
   Off M1 (side 33.81 px/m, ground row 1033; plan 33.4 px/m along and 34.34
   across; front 33.66 px/m, ground row 542) and M2. Axis 3.9 m up. The probe
   reaches 0.35 m ahead of the nose. */
var HeroA400M = (function (K) {
  "use strict";
  var S = {
    HAX: 3.9, DMIN: -0.35, DMAX: 45.1,
    /* the body 5.6 m wide and 5.0 deep (1.39 to 6.42 m up), the radome tip
       3.35 m up, the flight deck roof rising to 6.3 m at 4 m; the belly
       sweeping up from 23 m to the end of the ramp at 39.6 m */
    FUS: [
      [0.0, 0.08, 3.45, 3.20, 1.0], [0.15, 0.55, 3.75, 3.00, 0.98], [0.44, 0.95, 4.05, 2.75, 0.96],
      [0.8, 1.22, 4.38, 2.51, 0.94], [1.15, 1.42, 4.61, 2.34, 0.93], [1.5, 1.58, 4.85, 2.19, 0.92],
      [1.86, 1.75, 5.24, 2.04, 0.92], [2.22, 1.92, 5.53, 1.95, 0.92], [3.0, 2.22, 6.09, 1.75, 0.92],
      [4.0, 2.55, 6.24, 1.54, 0.92], [5.0, 2.70, 6.33, 1.45, 0.92], [6.0, 2.79, 6.42, 1.39, 0.92],
      [13.0, 2.80, 6.50, 1.39, 0.92], [23.0, 2.80, 6.45, 1.39, 0.92], [24.0, 2.79, 6.48, 1.54, 0.92],
      [25.0, 2.79, 6.51, 1.72, 0.92], [26.0, 2.79, 6.60, 2.04, 0.92], [28.0, 2.76, 6.77, 2.69, 0.92],
      [30.0, 2.64, 6.92, 3.37, 0.93], [32.0, 2.38, 7.10, 4.02, 0.93], [34.0, 2.00, 7.25, 4.73, 0.94],
      [36.0, 1.65, 7.35, 5.41, 0.95], [38.0, 1.30, 7.42, 6.12, 0.96], [39.0, 1.10, 7.50, 6.51, 0.97],
      [39.6, 0.85, 7.50, 6.85, 1.0]
    ],
    /* the leading edge swept 19 deg, the trailing edge nearly straight */
    WING: [[2.8, 13.40, 20.45], [4.0, 13.56, 20.51], [10.0, 15.60, 21.02], [15.0, 17.34, 21.44],
           [20.0, 19.04, 21.83], [21.2, 19.55, 21.92]],
    wz: function (y) { return 6.35 - 0.064 * (Math.abs(y) - 3); },      /* anhedral, 3.7 deg (M1 front) */
    wtc: function (y) { return 0.15 - 0.04 * Math.min(1, Math.abs(y) / 21.2); },
    camber: 0.015, yTeam: 20.1,
    STAB: [[0.5, 36.6, 41.8], [2.0, 37.78, 42.37], [5.0, 40.06, 43.53], [7.0, 41.56, 44.28], [9.0, 43.53, 45.06], [9.2, 43.75, 45.1]],
    sz: function () { return 14.0; },
    stc: function () { return 0.09; },
    /* the dorsal fillet from 31 m, the leading edge 34.5 deg, the trailing
       edge raked back as far (M1 side) */
    FIN: [[6.9, 30.2, 38.2, 0.06], [7.5, 31.8, 38.9, 0.10], [8.0, 32.56, 39.25, 0.12], [10.0, 33.95, 40.61, 0.12],
          [12.0, 35.31, 41.97, 0.11], [14.3, 36.9, 43.5, 0.09]],
    finTeam: 99,
    nose: { d: 5.15, R: 0.50, W: 0.30, tr: 0.40 },
    main: { y: 3.15, ax: [16.6, 18.15, 19.7], R: 0.55, W: 0.40, du: 0.33 }
  };
  S.NOSE = (S.DMIN + S.DMAX) / 2;
  var X = function (d) { return K.X(S, d); }, Z = function (h) { return K.Z(S, h); };
  var PAINT = { key: "a400m", top: "#939a9f", low: "#888f94", ramp: "#73797d", seed: 561 };

  /* the engines: hub y and h (M1 front: the blade tips), prop plane d (M1
     plan), the sense of rotation about +X: engines 1 (port outboard) and 3
     (starboard inboard) clockwise seen from behind, 2 and 4 anticlockwise -
     down between the engines of each pair */
  var ENG = [{ y: 12.9, h: 4.70, dp: 12.8, spin: 1 }, { y: 7.0, h: 5.40, dp: 11.2, spin: -1 },
             { y: -7.0, h: 5.40, dp: 11.2, spin: 1 }, { y: -12.9, h: 4.70, dp: 12.8, spin: -1 }];
  /* nacelle rows [aft of the prop plane, half width, top, bottom about the
     hub]: the chin intake under the spinner, the nacelle running back past
     the trailing edge (M2) */
  var NAC = [[0.05, 0.50, 0.50, -0.62], [0.40, 0.68, 0.72, -0.95], [1.20, 0.76, 0.86, -1.05], [3.0, 0.78, 1.00, -1.05],
             [5.5, 0.72, 1.20, -0.90], [8.0, 0.52, 1.20, -0.55], [9.6, 0.20, 1.05, -0.05]];
  var BLADE = { rr: [0.16, 0.34, 0.55, 0.75, 0.92, 1.0], ch: [0.10, 0.13, 0.13, 0.11, 0.08, 0.04], sw: 0.10 };
  var RP = 2.65;
  function addEngines(THREE, g, T) {
    ENG.forEach(function (e) {
      var xP = X(e.dp), zh = Z(e.h), k;
      var rings = NAC.map(function (q) {
        var zt = zh + q[2], zb = zh + q[3];
        return K.secRing(xP - q[0], e.y, q[1], zt, zb, zh - 0.05, 0.85, 18);
      });
      K.emit(THREE, g, K.gridGeo(THREE, rings, true, true), T, function (cx, cy, cz, nx, ny, nz) {
        return nx > 0.6 ? "ink" : (nz < -0.2 ? "low" : "top");
      });
      var sp = K.outward(K.lathe(THREE, [[0, 0.03], [0.25, 0.22], [0.6, 0.38], [0.95, 0.46]], 12, xP + 0.95, e.y, zh, false, true));
      sp.computeVertexNormals();
      g.add(new THREE.Mesh(sp, T.metal));
      for (k = 0; k < 8; k++) K.addBlade(THREE, g, T.blade, xP + 0.02, e.y, zh, (e.spin > 0 ? 12 : -12) * K.D2R + k * Math.PI / 4, RP, e.spin, BLADE);
      g.add(K.disc(THREE, T.blur, RP, xP - 0.04, e.y, zh, 32));
    });
  }
  /* the main-gear sponsons, 3.88 m out, 1.2 to about 3.0 m up, 13.4 to
     21.4 m aft (M1 side and front) */
  function addSponsons(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      K.addBody(THREE, g, T, S, [[12.4, 0.25, 2.7, 2.1, 1.0], [13.4, 0.80, 3.2, 1.35, 0.75], [15.0, 0.95, 3.4, 1.20, 0.7],
        [20.0, 0.95, 3.4, 1.20, 0.7], [21.4, 0.82, 3.3, 1.30, 0.75], [23.2, 0.20, 3.0, 2.2, 1.0]], s * 2.93, true, true);
    }
  }
  function addDetails(THREE, g, T) {
    /* the big flight deck windows */
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 1.95, 2.85, 40, 140, 3, 8), T.glass));
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 2.9, 3.8, 26, 44, 2, 2), T.glass));
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 2.9, 3.8, 136, 154, 2, 2), T.glass));
    /* the ramp and the aft door on the upswept belly (M2) */
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 27.2, 39.4, -150, -30, 8, 6), T.ramp));
    /* the probe over the flight deck, 0.9 m to port (M1 plan), sloping
       down to 5.5 m at its tip 0.35 m ahead of the nose (M1, M2) */
    g.add(K.taper(THREE, T.metal, [X(-0.35), 0.9, Z(5.50)], [X(2.6), 0.9, Z(5.95)], 0.06, 0.08, 8));
    /* the fin-top fairing carrying the tailplane, 15.0 m at its top */
    K.emit(THREE, g, K.lathe(THREE, [[0, 0.04], [0.5, 0.30], [1.3, 0.45], [5.6, 0.45], [7.4, 0.22]], 12, X(36.3), 0, Z(14.55), false, true),
      T, function () { return "team"; });
    /* the wing-root fairing over the fuselage */
    g.add(K.egg(THREE, T.top, 4.4, 2.6, 0.55, X(17.2), 0, Z(6.55), 16, 8));
  }
  function addGear(THREE, g, T) {
    var gear = new THREE.Group(), N = S.nose, nz = Z(N.R), s;
    gear.name = "gear";
    for (s = -1; s <= 1; s += 2) K.tyreSet(THREE, gear, T, X(N.d), s * N.tr, nz, N.R, N.W);
    gear.add(K.taper(THREE, T.metal, [X(N.d - 0.1), 0, Z(1.6)], [X(N.d), 0, nz], 0.12, 0.09, 8));
    gear.add(K.taper(THREE, T.metal, [X(N.d), -N.tr, nz], [X(N.d), N.tr, nz], 0.05, 0.05, 6));
    var M = S.main;
    for (s = -1; s <= 1; s += 2) K.truck(THREE, gear, T, S, M, s * M.y, 1.6);
    g.add(gear);
  }
  function build(THREE, M, C) {
    if (!S.SEC) S.SEC = K.resampleD(S.FUS, 60);
    var T = K.materials(THREE, C, PAINT), g = new THREE.Group();
    K.addFuselage(THREE, g, T, S);
    K.addWings(THREE, g, T, S);
    K.addFin(THREE, g, T, S);
    K.addStab(THREE, g, T, S);
    addEngines(THREE, g, T);
    addSponsons(THREE, g, T);
    addDetails(THREE, g, T);
    addGear(THREE, g, T);
    return K.mergeByMaterial(THREE, g);
  }
  return { build: build, len: S.DMAX - S.DMIN };
})(EuBigKit);

/* len: the measured X extent of each (probe tip or nose to the tail) */
UNIT_MODELS["gbr_e90_tanker"] = {
  len: HeroVC10K3.len,
  build: function (THREE, M, C) { return HeroVC10K3.build(THREE, M, C); }
};
UNIT_MODELS["gbr_e00_tanker"] = {
  len: HeroTriStarK1.len,
  build: function (THREE, M, C) { return HeroTriStarK1.build(THREE, M, C); }
};
UNIT_MODELS["deu_e00_tanker"] = {
  len: HeroA310MRTT.len,
  build: function (THREE, M, C) { return HeroA310MRTT.build(THREE, M, C); }
};
UNIT_MODELS["fra_e00_airlift"] = {
  len: HeroA400M.len,
  build: function (THREE, M, C) { return HeroA400M.build(THREE, M, C); }
};
