/* ============ ru_tu160.js -- TUPOLEV Tu-160 BLACKJACK and Tu-160M (HERO MODEL) ============

   Two rows draw it:
     pact_e80_stealthbomber  "Tu-160 Blackjack" (1980s; in service 1987-): Soviet star on the fin.
     sbomber_p               "Tu-160M Blackjack" (present day): Russian star on the fin.
   The shape is the same airframe. The modernisation (Tu-160M) is mostly engines, avionics and
   weapons; the photographs of the M examined (Commons "Tupolev Tu160M bn18 2020", a Tu-160M
   landing, and "Tupolev Tu-160 Alabino 220415 58") show no outline difference from the Tu-160, so
   none is drawn. Only the national star differs. No other row borrows these two keys by role
   (sbomber_n and sbomber_c have their own ids). js/models3d_east.js still defines an older
   HD_MODELS["sbomber_p"]; this file loads after it (index.html / cmp.html order) and replaces it
   in UNIT_MODELS.

   WHAT EACH FEATURE RESTS ON
     - Commons "Tupolev Tu-160 3-view graphic.svg" (plan, front, side, with a scale bar; one wing
       drawn at about 20 degrees of sweep, the other swept back): length 54.1 m, spread span 55.7 m,
       height about 13 m. The plan gives: the long pointed nose, the glove leading edge running
       from the nose to the wing pivot at about 8.8 m off the centreline and 26 m from the nose,
       the spread wing LE sweep about 22 degrees to a tip chord of about 2.5 m, the trailing edge
       of the glove from the pivot to the tail root, the four engines in two pairs of nacelles under
       the glove (3.2 m wide a pair, from 24.7 m to 38.3 m aft of the nose, intakes ahead, nozzles
       aft), the swept tailplane (about 13 m span) and the swept tall fin (tip 12.9 m high,
       trailing edge 50.7 m aft of the nose), the nose gear at about 12 m and the three-axle main
       bogies at 28.6 to 31.4 m, track 5.3 m. Side and front views give heights above the ground
       (fuselage top 6.1 m, glove 4.2 m, nacelles 1.7 to 4.1 m, wheels 0.6 m radius, nose wheels
       0.5 m).
       THE SWING WING: render3d has no swing-wing mechanism; the wings are drawn at the spread
       sweep the drawing and the photographs of landing aircraft show (about 20 degrees), the
       position of a parked aircraft.
     - Photographs: "Tupolev Tu-160 Alabino 220415 58" (underside: nacelle layout, glove, white
       overall, a red star on the fin and on each wing underside, wing planform), "Tupolev Tu160M
       bn18 2020" (side view: fin, all-white finish, a plain red star on the fin, nose and
       cockpit), "Tupolev Tu-160 in 1997" (gear and nacelles from below).
     - NOT confirmed or left out: the refuelling probe (retracted on photographs of the parked
       or landing aircraft, so none is drawn); the all-moving upper fin's join line, weapon-bay
       doors, flap-track fairings, slat lines, gear doors and pitot tubes; the radome and nose are
       plain white; the Tu-160M has no extra outline feature in the photographs, none is added;
       the 1980s row's star placement rests on the 1988 US DIA painting "Soviet Blackjack bomber
       with escorts" (Commons Blackjack-DIA.jpg: a star on the fin and on each wing top, outboard;
       an artist's depiction, no photograph of a 1987-91 aircraft was found; its silver-grey finish
       is not copied, the white overall of the photographs is kept for both rows).
       The Russian star form (plain red, no border) is from the Alabino photograph (fin and wing
       undersides); the underside stars are not drawn. Nacelle intakes: Alabino underside shows
       large rectangular mouths, drawn as two dark rectangles per nacelle with a thin splitter
       wedge; bay and gear doors are not visible at game scale and are not drawn. The upper fin's
       join (faint line near the tailplane level in the bn18 photograph) is a thin dark band.
   Markings: Soviet star (red, white border, red edge as pact_hind_mi24.js draws it) on each side
   of the fin for the 1980s row (the DIA painting's wing stars are not drawn: a painting, not a photograph); the plain red Russian star for the present-day row. No names,
   bort numbers, badges or lettering.
   Team colour (C.team): only a small strip on the top of each wing near the tip.
   The nose and main gear are in the "gear" group, lowest of all (wheel bottoms at z = 0).
   Model space +X nose, +Y port, +Z up, metres; z = 0 is the ground, x = 0 about mid-length.
   ================================================================== */
var HeroTu160 = (function () {
  var V = null;
  var NOSE = 27.05;                      /* x of the nose tip: the tables use n, the distance aft of the nose */
  function X(n) { return NOSE - n; }
  /* piecewise-linear table lookup: pairs [n, value] */
  function pl(tab, n) {
    var i;
    if (n <= tab[0][0]) return tab[0][1];
    for (i = 0; i + 1 < tab.length; i++) if (n <= tab[i + 1][0]) {
      return lerp(tab[i][1], tab[i + 1][1], (n - tab[i][0]) / (tab[i + 1][0] - tab[i][0]));
    }
    return tab[tab.length - 1][1];
  }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  function foil(xle, xte, th, m) {
    var p = [], i, f, c = xle - xte, tc = th / c;
    for (i = 0; i <= m; i++) { f = 0.5 * (1 + Math.cos(Math.PI * i / m)); p.push([xle - f * c, yt(f, tc) * c]); }
    for (i = m - 1; i >= 1; i--) { f = 0.5 * (1 + Math.cos(Math.PI * i / m)); p.push([xle - f * c, -yt(f, tc) * c]); }
    return p;
  }
  function loft(rings) {
    var n = rings[0].length, pos = [], idx = [], i, j, r, a, b, c, d;
    for (r = 0; r < rings.length; r++) for (j = 0; j < n; j++) pos.push(rings[r][j][0], rings[r][j][1], rings[r][j][2]);
    for (r = 0; r + 1 < rings.length; r++) for (j = 0; j < n; j++) {
      a = r * n + j; b = r * n + (j + 1) % n; c = (r + 1) * n + j; d = (r + 1) * n + (j + 1) % n;
      idx.push(a, b, c, b, d, c);
    }
    [0, rings.length - 1].forEach(function (e) {
      var cx = 0, cy = 0, cz = 0;
      for (j = 0; j < n; j++) { cx += rings[e][j][0]; cy += rings[e][j][1]; cz += rings[e][j][2]; }
      var ci = pos.length / 3; pos.push(cx / n, cy / n, cz / n);
      for (j = 0; j < n; j++) { var p = e * n + j, q = e * n + (j + 1) % n; if (e === 0) idx.push(ci, q, p); else idx.push(ci, p, q); }
    });
    var vol = 0;
    for (i = 0; i < idx.length; i += 3) {
      var A = idx[i] * 3, B = idx[i + 1] * 3, Cc = idx[i + 2] * 3;
      vol += pos[A] * (pos[B + 1] * pos[Cc + 2] - pos[B + 2] * pos[Cc + 1])
           - pos[A + 1] * (pos[B] * pos[Cc + 2] - pos[B + 2] * pos[Cc])
           + pos[A + 2] * (pos[B] * pos[Cc + 1] - pos[B + 1] * pos[Cc]);
    }
    if (vol < 0) for (i = 0; i < idx.length; i += 3) { var t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function cr(p0, p1, p2, p3, t) {
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  function sub(arr, i, t) {
    var n = arr.length;
    return cr(arr[Math.max(i - 1, 0)], arr[i], arr[Math.min(i + 1, n - 1)], arr[Math.min(i + 2, n - 1)], t);
  }
  function box(sx, sy, sz, x, y, z) { var g = new V.BoxGeometry(sx, sy, sz); g.translate(x, y, z); return g; }
  function cylX(r0, r1, len, x, y, z, seg) {   /* r0 at the +X end */
    var g = new V.CylinderGeometry(r0, r1, len, seg || 16);
    g.rotateZ(-Math.PI / 2); g.translate(x, y, z); return g;
  }
  function cylY(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 20); g.translate(x, y, z); return g; }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 8);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L));
    var m = new V.Matrix4().makeRotationFromQuaternion(q);
    m.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(m); return g;
  }
  function merge(list) {
    var pos = [], nor = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(pos.length / 3 * 2), 2));
    return out;
  }
  function emit(parent, lists, mats, order) {
    order.forEach(function (key) { if (lists[key] && lists[key].length) parent.add(new V.Mesh(merge(lists[key]), mats[key])); });
  }
  /* a flat five-point star in the X-Z plane at y (normal along Y), radius r */
  function starGeo(cx, y, cz, r) {
    var pos = [], i, a, q;
    for (i = 0; i < 10; i++) {
      a = Math.PI / 2 + i * Math.PI / 5; q = (i & 1) ? 0.40 : 1;
      var a2 = Math.PI / 2 + (i + 1) * Math.PI / 5, q2 = ((i + 1) & 1) ? 0.40 : 1;
      pos.push(cx, y, cz, cx + Math.cos(a) * q * r, y, cz + Math.sin(a) * q * r, cx + Math.cos(a2) * q2 * r, y, cz + Math.sin(a2) * q2 * r);
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }


  /* the same star lying flat on a wing top (normal +Z), one point toward +X */
  function starFlat(cx, cy, z, r) {
    var pos = [], i, a, q, a2, q2;
    for (i = 0; i < 10; i++) {
      a = i * Math.PI / 5; q = (i & 1) ? 0.40 : 1;
      a2 = (i + 1) * Math.PI / 5; q2 = ((i + 1) & 1) ? 0.40 : 1;
      pos.push(cx, cy, z, cx + Math.cos(a) * q * r, cy + Math.sin(a) * q * r, z, cx + Math.cos(a2) * q2 * r, cy + Math.sin(a2) * q2 * r, z);
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }

  /* blended body and glove, half widths and heights from the three-view (n = metres aft of the nose) */
  var TW  = [[0, 0.04], [1, 0.35], [3, 0.8], [6, 1.15], [9, 1.4], [12, 1.8], [15.4, 3.3], [18, 4.6], [20.7, 5.9], [23.5, 7.4], [26, 8.8], [28.5, 8.9],
             [31, 7.8], [33.5, 5.2], [36, 2.8], [40, 2.0], [45, 1.1], [50, 0.6], [54.1, 0.12]];
  var TB  = [[0, 0.04], [1, 0.35], [3, 0.8], [6, 1.15], [9, 1.45], [14, 1.7], [20, 2.0], [30, 2.1], [36, 2.0], [42, 1.5], [46, 1.0], [50, 0.6], [54.1, 0.12]];
  var TZT = [[0, 4.0], [1, 4.3], [3, 4.8], [5, 5.4], [7, 5.8], [9.5, 6.05], [20, 6.1], [34, 5.9], [40, 6.7], [45, 7.3], [48, 6.9], [51, 6.0], [54.1, 4.5]];
  var TZB = [[0, 3.9], [1, 3.75], [3, 3.45], [6, 3.2], [10, 3.1], [20, 3.0], [34, 3.0], [36, 3.1], [45, 3.6], [50, 3.9], [54.1, 4.2]];
  var TZW = [[0, 3.95], [6, 4.4], [14, 4.3], [20, 4.2], [36, 4.3], [45, 5.2], [54.1, 4.3]];
  var STN = [0, 0.4, 1, 2, 3.5, 5, 6.5, 8, 9.5, 11, 12.5, 14, 15.4, 17, 18.5, 20, 21.5, 23, 24.5, 26, 27.5, 29, 30.5, 32, 33.5, 35, 36.5, 38, 40, 42, 44, 46, 48, 50, 52, 54.1];
  var SF = [1, 0.95, 0.89, 0.82, 0.74, 0.65, 0.56, 0.47, 0.38, 0.29, 0.21, 0.14, 0.07, 0];   /* fractions of the half width */

  function bodyRing(n) {
    var hb = pl(TB, n), W = Math.max(pl(TW, n), hb), zt = pl(TZT, n), zb = pl(TZB, n), zw = pl(TZW, n);
    var up = [], lo = [], i, ys = [];
    SF.forEach(function (f) { ys.push(f); });
    for (i = SF.length - 2; i >= 0; i--) ys.push(-SF[i]);          /* +W ... 0 ... -W */
    var pts = ys.map(function (s) {
      var y = s * W, u = Math.min(1, Math.abs(y) / hb), bump = Math.pow(1 - u * u, 2);
      var e = 0.05 + 0.40 * Math.pow(Math.max(0, 1 - Math.abs(y) / W), 0.7);
      var top = zw + e + (zt - zw - e) * bump, bot = zw - e + (zb - zw + e) * bump;
      if (top < bot + 0.06) { var m = (top + bot) / 2; top = m + 0.03; bot = m - 0.03; }
      return [y, top, bot];
    });
    pts.forEach(function (p) { up.push([X(n), p[0], p[1]]); });
    for (i = pts.length - 2; i >= 1; i--) lo.push([X(n), pts[i][0], pts[i][2]]);
    return up.concat(lo);
  }

  function wingStations() {
    /* spread wing: y from the glove to the tip; LE and TE as distance aft of the nose */
    var st = [], ys = [7.6, 9.5, 12, 15, 18, 21, 24, 26.5, 27.85], i;
    for (i = 0; i < ys.length; i++) {
      var y = ys[i], le = 26.1 + (y - 8.5) * 0.388, te = 32.6 + (y - 8.5) * 0.185, c = te - le, t = (y - 7.6) / (27.85 - 7.6);
      st.push([y, le, te, 4.2 - (y - 8) * 0.012, c * (0.085 - 0.015 * t)]);
    }
    return st;
  }
  function wingRing(s, side, m) {
    return foil(X(s[1]), X(s[2]), s[4], m).map(function (p) { return [p[0], side * s[0], s[3] + p[1]]; });
  }
  function sring(x, hw, zt, zb, N, e) {
    var p = [], i, a, c, s, zc = (zt + zb) / 2, b = (zt - zb) / 2;
    for (i = 0; i < N; i++) {
      a = i / N * Math.PI * 2; c = Math.cos(a); s = Math.sin(a);
      p.push([x, hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 2 / e), zc + b * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), 2 / e)]);
    }
    return p;
  }

  function makeMats(C) {
    var m = {}, tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.skin = new V.MeshStandardMaterial({ color: 0xe3e5e6, roughness: 0.55, metalness: 0.10 });
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x8a9094, roughness: 0.45, metalness: 0.60 });
    m.ink = new V.MeshStandardMaterial({ color: 0x1b1d1f, roughness: 0.90, metalness: 0.05 });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x3f4d52, roughness: 0.12, metalness: 0.55, transparent: true, opacity: 0.85, side: V.DoubleSide });
    m.starRed = new V.MeshStandardMaterial({ color: 0xb22a22, roughness: 0.7, metalness: 0.0, side: V.DoubleSide,
                                             polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    m.starWhite = new V.MeshStandardMaterial({ color: 0xe2e0d8, roughness: 0.7, metalness: 0.0, side: V.DoubleSide,
                                               polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
    return m;
  }

  function build(THREE, M, C, soviet) {
    V = THREE;
    var side, K = { skin: [], team: [], metal: [], ink: [], glass: [], starRed: [], starWhite: [] };
    var G = { metal: [], tyre: [] };

    /* body and glove */
    K.skin.push(loft(STN.map(bodyRing)));

    /* cockpit: windscreen and side windows */
    var ws = box(2.1, 1.25, 0.14, 0, 0, 0); ws.rotateY(0.22); ws.translate(X(7.1), 0, pl(TZT, 7.1) + 0.02); K.glass.push(ws);
    [-1, 1].forEach(function (sd) {
      K.glass.push(box(1.5, 0.05, 0.28, X(7.0), sd * (pl(TB, 7.0) * 0.97), pl(TZT, 7.0) - 0.28));
    });

    /* spread wings */
    var WS = wingStations();
    for (side = -1; side <= 1; side += 2) {
      K.skin.push(loft(WS.map(function (s) { return wingRing(s, side, 14); })));
      var s0 = WS[7];
      K.team.push(box(1.1, 1.3, 0.025, X((s0[1] + s0[2]) / 2 + 0.2), side * 25.9, s0[3] + s0[4] * 0.5 + 0.015));
    }

    /* nacelles: two engines side by side in each, intake under the glove, nozzles aft */
    var NS = [[24.7, 1.6, 4.1, 1.7], [26, 1.62, 4.1, 1.68], [30, 1.62, 4.1, 1.7], [34, 1.55, 4.0, 1.8], [36.9, 1.45, 3.9, 1.95]];
    for (side = -1; side <= 1; side += 2) {
      var yc = side * 5.05;
      K.skin.push(loft(NS.map(function (q) {
        return sring(X(q[0]), q[1], q[2], q[3], 28, 3.6).map(function (p) { return [p[0], yc + p[1], p[2]]; });
      })));
      /* a thin vertical splitter wedge ahead of the intake mouth, between the engine pair */
      K.skin.push(loft([[23.2, 0.03, 3.9, 2.0], [24.7, 0.10, 4.0, 1.85]].map(function (q) {
        return sring(X(q[0]), q[1], q[2], q[3], 12, 2).map(function (p) { return [p[0], yc + p[1], p[2]]; });
      })));
      [-0.8, 0.8].forEach(function (dy) {
        K.ink.push(box(0.05, 1.4, 2.0, X(24.66), yc + dy, 2.9));                         /* the two rectangular inlets */
        K.ink.push(cylX(0.68, 0.68, 1.5, X(37.6), yc + dy, 2.9, 20));                    /* nozzle */
        K.metal.push(cylX(0.74, 0.74, 0.28, X(36.95), yc + dy, 2.9, 20));
      });
    }

    /* fin: stations z, LE n, TE n, thickness */
    var FS = [[6.0, 41.2, 51.0, 0.60], [7.5, 42.6, 50.9, 0.50], [9.5, 44.8, 50.8, 0.40], [11.2, 46.6, 50.8, 0.30], [12.9, 48.4, 50.7, 0.15]];
    K.skin.push(loft(FS.map(function (q) { return foil(X(q[1]), X(q[2]), q[3], 12).map(function (p) { return [p[0], p[1], q[0]]; }); })));
    /* the join of the all-moving upper fin: a thin dark band at z 7.1 around the fin section */
    (function () {
      var t = (7.1 - 6.0) / 1.5, le = lerp(41.2, 42.6, t), te = lerp(51.0, 50.9, t), th = lerp(0.60, 0.50, t) * 1.05 + 0.01;
      K.ink.push(loft([7.08, 7.12].map(function (zz) {
        return foil(X(le), X(te), th, 12).map(function (p) { return [p[0], p[1], zz]; });
      })));
    })();
    /* tailplane */
    var TP = [[0.5, 44.8, 50.6, 0.45], [3.5, 47.7, 51.6, 0.22], [6.7, 50.5, 52.6, 0.07]];
    for (side = -1; side <= 1; side += 2) {
      K.skin.push(loft(TP.map(function (q) {
        return foil(X(q[1]), X(q[2]), q[3], 10).map(function (p) { return [p[0], side * q[0], 6.9 + p[1]]; });
      })));
    }

    /* no wing stars: the only evidence for them on a 1980s Tu-160 is the 1988 DIA painting, not a photograph */
    /* national star on each side of the fin */
    for (side = -1; side <= 1; side += 2) {
      var sx = X(47.9), sy0 = side * 0.20, sr = 0.72, sz = 9.5;
      if (soviet) {
        K.starRed.push(starGeo(sx, sy0, sz, sr * 1.24));
        K.starWhite.push(starGeo(sx, sy0 + side * 0.006, sz, sr * 1.12));
        K.starRed.push(starGeo(sx, sy0 + side * 0.012, sz, sr));
      } else {
        K.starRed.push(starGeo(sx, sy0, sz, sr * 1.05));
      }
    }

    /* undercarriage, the lowest part */
    var nx = X(12.0);
    G.metal.push(rod([nx, 0, 3.45], [nx, 0, 0.5], 0.13, 8));
    G.metal.push(rod([nx - 0.9, 0, 3.0], [nx, 0, 1.4], 0.06, 6));
    G.metal.push(cylY(0.07, 0.9, nx, 0, 0.5, 8));
    [-0.27, 0.27].forEach(function (dy) { G.tyre.push(cylY(0.50, 0.30, nx, dy, 0.5, 22)); });
    for (side = -1; side <= 1; side += 2) {
      var y0 = side * 2.65, mx = X(30.0);
      G.metal.push(rod([mx, y0, 4.0], [mx, y0, 0.8], 0.15, 8));
      G.metal.push(rod([mx - 1.2, y0, 3.8], [mx, y0, 1.6], 0.06, 6));
      G.metal.push(rod([X(28.6), y0, 0.64], [X(31.4), y0, 0.64], 0.09, 8));        /* the bogie beam */
      [28.6, 30.0, 31.4].forEach(function (an) {
        G.metal.push(cylY(0.08, 1.3, X(an), y0, 0.6, 8));
        [-0.4, 0.4].forEach(function (dy) { G.tyre.push(cylY(0.60, 0.40, X(an), y0 + dy, 0.6, 22)); });
      });
    }

    var mats = makeMats(C);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "team", "ink", "glass", "metal", "starRed", "starWhite"]);
    var gear = new V.Group(); gear.name = "gear";
    emit(gear, G, mats, ["metal", "tyre"]);
    root.add(gear);
    return root;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e80_stealthbomber"] = { len: 54.1, build: function (THREE, M, C) { return HeroTu160.build(THREE, M, C, true); } };
UNIT_MODELS["sbomber_p"] = { len: 54.1, build: function (THREE, M, C) { return HeroTu160.build(THREE, M, C, false); } };
