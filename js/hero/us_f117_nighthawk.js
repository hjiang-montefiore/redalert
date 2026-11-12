/* ============ us_f117_nighthawk.js -- Lockheed F-117A Nighthawk (HERO MODEL) ====

   The United States' stealth attack aircraft, drawn for the two rows that
   fly it: nato_e80_stealthfighter (1983-88, still unacknowledged) and
   nato_e90_stealthfighter (the 1991 Gulf War and Serbia 1999). Both rows are
   the F-117A: the outer mould line never changed in service, so both keys
   build the same model. It replaces the parametric "faceted" stand-in from
   air3d_era.js (206 triangles, nine meshes, 21.9 m long where the aeroplane
   is 20.09 m) with the real shape.

   Published figures (USAF fact sheet): length 65 ft 11 in (20.09 m), span
   43 ft 4 in (13.20 m), height 12 ft 5 in (3.78 m, to the ruddervator
   tips), wing area 1,140 sq ft (105.9 m2), leading edge swept 67.5 degrees.
   This model measures 20.08 x 13.20 x 3.78 m, and its plan area works out
   at 105.4 m2 against the published 105.9.

   Drawings and photographs (Wikimedia Commons, US government works unless
   marked):
     "Lockheed F-117A Nighthawk.png" (three-view line drawing, public
        domain, 574 px wide): the whole planform was read off it at 13.6
        px/m: leading edge 22.4 degrees off the axis from the nose to the
        wingtip 15.9 m aft; a chopped tip 0.9 m long; the trailing edge
        swept FORWARD 47 degrees from the tip back to a notch 2.55 m off the
        centreline and 13.8 m aft of the nose; behind the notch the aft deck
        narrows at 45 degrees to the platypus; two ruddervators standing
        well aft of it with their tips at 20.09 m. Its side view gives the
        profile (nose ridge, canopy peak 4.8 m aft, the roof declining to a
        flat deck, the tail rising at 21 degrees) and its top view the
        canopy, the 1.7 m roof panel and the two pairs of intake grids.
     "Havef117.png" (CC BY-SA 4.0, the overhead size comparison of Have
        Blue with the F-117): the wingtip and the V-tail in plan.
     "A left rear view of a 37th Tactical Fighter Wing F-117A ... DPLA"
        (public domain, parked at Andrews): the ruddervator planform, the
        platypus under it, the single nose wheel and the two single main
        wheels, the faceted fuselage side and how high the belly stands.
     "Lockheed F-117A Nighthawk 7th FS.jpg" (public domain, crew chiefs at
        Holloman with the canopy open): the five-pane canopy frame and the
        pair of gridded intakes on the sloping fuselage side behind it.
     "F-117 Nighthawk Front.jpg" (public domain, Nellis, from ahead and
        above): the pyramid nose, the flat thin wing and the V-tail's cant.
     "Lockheed F-117A Nighthawk Persian Gulf 1996.jpg" (public domain, side
        on): the roof line falling from the canopy peak to the flat deck, the
        canopy and the ruddervator in profile.

   What makes it a Nighthawk and not "a black delta", at RTS zoom:
     1. The planform: an arrowhead with the trailing edge swept FORWARD from
        the tips to a notch, then a short aft deck and the platypus: the W.
     2. A faceted body of flat panels, every edge straight. No curve in the
        skin: the nose is a four-sided pyramid, the canopy a five-pane
        diamond, the roof a flat strip with a slab of side facet on each side.
     3. Two gridded intakes, a dark pair of panels on each sloping side
        behind the cockpit, on top of the wing roots, each panel a recessed
        dark grille under a frame and a mesh of bars.
     4. A V-tail of two all-moving ruddervators, canted out about 30 degrees,
        standing aft of the wing.
     5. Two louvred slot exhausts, one on each of the angled aft facets, over a
        flat platypus plate with a pointed trailing edge.
   Small things the photographs show and the model keeps: the hexagonal FLIR
   window in the starboard nose facet, four small air-data probes on the nose
   facets, the dorsal refuelling receptacle with its frame.
   DETAIL PASS (the outline is untouched): the skin carries a painted sheet
   (RAM sheets a shade apart, the lighter tape along the facet joints and
   leading edges, saw-toothed panel outlines, streaks and aft-deck grime);
   saw-toothed seams are laid on the belly bay doors and gear bays, the
   upper wing, the roof and the side facets; the nose gear doors are
   serrated like the mains'; wing-tip position lights and a flush roof
   beacon; hub caps with bolts, torque links, brake lines, a gland collar
   and a taxi lamp on the gear. Panel places are from the 7th FS and
   Andrews photographs, NOT measured.
   Nothing hangs outside: the two bays are in the belly and are drawn shut.
   The airframe carries no guns, pylons or tanks.
   Decals (team bands, the dark panels, the grilles) sit a few centimetres off
   the skin and their materials are polygon-offset, as the other heroes' are,
   so they do not flicker against it at RTS zoom.

   THE REDO (see "the redo" above build()): the wing's upper skin in two
   facets either side of a ridge, the lighter tape along every facet joint,
   deep intake frames under an eyebrow lip, the exhaust slots' overhanging
   lip and the platypus heat tiles, and open gear wells with the gear down.

   Model space: +X nose, +Y left (port), +Z up, metres. s below is metres
   aft of the nose tip, h metres above the ground with the gear down.
   The gear stands on z = ZG and is a group named "gear" so render3d.js can
   stow it. The airframe is merged into one mesh per material.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroF117 = (function () {
  "use strict";

  var V = null;                 /* THREE, set by build()                     */
  var LEN = 20.09;
  var XN = LEN / 2;             /* the nose tip; the ruddervator tips end at -XN */
  var ZG = -1.45;               /* the ground                                */
  function P(s, y, h) { return [XN - s, y, h + ZG]; }

  /* ---- the plate: wing and body underside in one flat slab ---------------
     The belly is a single plane that stands 1.15 m above the ground at the
     nose and rises 0.0175 m per metre aft (the three-view's belly line
     climbs about 0.3 m from nose to wing root). The plate is 0.22 m thick
     with a 0.30 m bevel round the leading edge, which is a knife edge. */
  function hlo(s) { return 1.15 + 0.0175 * s; }
  var TAN_LE = 0.4142;          /* tan 22.5: 67.5 degrees of sweep           */
  var BEV = 0.325;              /* the bevel's width across y                */
  var THK = 0.22;
  var EDGE = 0.025;             /* the leading edge's own thickness          */
  var FOOT = 2.55;              /* the fuselage's foot line, off the centreline */

  /* the plan outline, port side from the nose to the platypus centre */
  var OUT = [
    [0.00, 0.00],               /* 0 nose                                    */
    [15.93, 6.60],              /* 1 tip, leading corner                     */
    [16.85, 6.60],              /* 2 tip, the chopped end                    */
    [17.30, 5.90],              /* 3 tip, trailing corner                    */
    [13.80, 2.55],              /* 4 the notch where the TE meets the body   */
    [14.55, 2.45],              /* 5 aft deck begins                         */
    [16.35, 0.90],              /* 6 the 45 degree edge ends                 */
    [17.20, 0.90],              /* 7 platypus root                           */
    [17.90, 0.50],              /* 8 platypus lobe                           */
    [17.40, 0.00]               /* 9 centre notch of the W                   */
  ];
  /* plate thickness at each outline point (the platypus thins out) */
  var OTK = [EDGE, EDGE, THK, THK, THK, THK, THK, 0.20, 0.12, 0.12];

  /* ============================================================ helpers == */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function mid(a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]; }
  function mirY(p) { return [p[0], -p[1], p[2]]; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* a bag of flat triangles for one material; uv only where a texture needs it */
  function bag() { return { p: [], u: [], geos: [] }; }

  /* one triangle, wound so that its normal agrees with `hint` when given */
  function tri(B, a, b, c, hint, ua, ub, uc) {
    var n = cross(sub(b, a), sub(c, a));
    if (n[0] * n[0] + n[1] * n[1] + n[2] * n[2] < 1e-12) return;       /* sliver */
    if (hint && dot(n, hint) < 0) { var t = b; b = c; c = t; if (ua) { t = ub; ub = uc; uc = t; } }
    B.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    if (ua) B.u.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
  }
  function quad(B, a, b, c, d, hint) {
    tri(B, a, b, c, hint); tri(B, a, c, d, hint);
  }

  /* ear clipping for a planar polygon in any orientation */
  function earClip(pts) {
    var n = pts.length, i, k, q = [];
    var nx = 0, ny = 0, nz = 0;
    for (i = 0; i < n; i++) {
      var a = pts[i], b = pts[(i + 1) % n];
      nx += (a[1] - b[1]) * (a[2] + b[2]);
      ny += (a[2] - b[2]) * (a[0] + b[0]);
      nz += (a[0] - b[0]) * (a[1] + b[1]);
    }
    var ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz);
    for (i = 0; i < n; i++) {
      if (az >= ax && az >= ay) q.push([pts[i][0], pts[i][1]]);
      else if (ax >= ay) q.push([pts[i][1], pts[i][2]]);
      else q.push([pts[i][2], pts[i][0]]);
    }
    var area = 0;
    for (i = 0; i < n; i++) {
      var p0 = q[i], p1 = q[(i + 1) % n];
      area += p0[0] * p1[1] - p1[0] * p0[1];
    }
    var ccw = area > 0;
    function cr(a, b, c) {
      return (q[b][0] - q[a][0]) * (q[c][1] - q[a][1]) - (q[b][1] - q[a][1]) * (q[c][0] - q[a][0]);
    }
    function inside(a, b, c, p) {
      var d1 = cr(a, b, p), d2 = cr(b, c, p), d3 = cr(c, a, p);
      var neg = d1 < -1e-12 || d2 < -1e-12 || d3 < -1e-12;
      var pos = d1 > 1e-12 || d2 > 1e-12 || d3 > 1e-12;
      return !(neg && pos);
    }
    var idx = [], out = [], guard = 0;
    for (i = 0; i < n; i++) idx.push(i);
    while (idx.length > 3 && guard++ < 400) {
      var m = idx.length, found = false;
      for (i = 0; i < m; i++) {
        var ia = idx[(i + m - 1) % m], ib = idx[i], ic = idx[(i + 1) % m];
        var c = cr(ia, ib, ic);
        if (ccw ? c <= 1e-12 : c >= -1e-12) continue;
        var ok = true;
        for (k = 0; k < m; k++) {
          var ip = idx[k];
          if (ip === ia || ip === ib || ip === ic) continue;
          if (inside(ia, ib, ic, ip)) { ok = false; break; }
        }
        if (!ok) continue;
        out.push([ia, ib, ic]); idx.splice(i, 1); found = true; break;
      }
      if (!found) { out.push([idx[m - 1], idx[0], idx[1]]); idx.splice(0, 1); }
    }
    if (idx.length === 3) out.push([idx[0], idx[1], idx[2]]);
    return out;
  }
  function poly(B, pts, hint) {
    var t = earClip(pts), i;
    for (i = 0; i < t.length; i++) tri(B, pts[t[i][0]], pts[t[i][1]], pts[t[i][2]], hint);
  }

  /* a thin flat plate of any outline: two faces and the rim */
  function slab(B, pts, thick, grow) {
    var n = pts.length, i, nm = [0, 0, 0], c = [0, 0, 0];
    for (i = 0; i < n; i++) {
      var a = pts[i], b = pts[(i + 1) % n];
      nm[0] += (a[1] - b[1]) * (a[2] + b[2]);
      nm[1] += (a[2] - b[2]) * (a[0] + b[0]);
      nm[2] += (a[0] - b[0]) * (a[1] + b[1]);
      c[0] += a[0] / n; c[1] += a[1] / n; c[2] += a[2] / n;
    }
    var L = Math.sqrt(dot(nm, nm)) || 1;
    nm = [nm[0] / L, nm[1] / L, nm[2] / L];
    var h = thick / 2, up = [], dn = [];
    for (i = 0; i < n; i++) {
      up.push([pts[i][0] + nm[0] * h, pts[i][1] + nm[1] * h, pts[i][2] + nm[2] * h]);
      dn.push([pts[i][0] - nm[0] * h, pts[i][1] - nm[1] * h, pts[i][2] - nm[2] * h]);
    }
    poly(B, up, nm);
    poly(B, dn, [-nm[0], -nm[1], -nm[2]]);
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n, e = sub(mid(up[i], up[j]), c);
      quad(B, up[i], up[j], dn[j], dn[i], e);
    }
    return nm;
  }

  /* axis-aligned box in model space */
  function box(B, x0, x1, y0, y1, z0, z1) {
    var c = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2];
    function f(a, b, c2, d) { quad(B, a, b, c2, d, sub(mid(mid(a, b), mid(c2, d)), c)); }
    f([x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0]);
    f([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]);
    f([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]);
    f([x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]);
    f([x0, y0, z0], [x0, y1, z0], [x0, y1, z1], [x0, y0, z1]);
    f([x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]);
  }

  /* a solid standing on a surface: c holds eight points, the four on the
     surface first (a b c d) and the four lifted over them after; the face on
     the surface is left out, nothing sees it */
  function lift(B, c) {
    var i, cen = [0, 0, 0];
    for (i = 0; i < 8; i++) { cen[0] += c[i][0] / 8; cen[1] += c[i][1] / 8; cen[2] += c[i][2] / 8; }
    function f(a, b, c2, d) { quad(B, a, b, c2, d, sub(mid(mid(a, b), mid(c2, d)), cen)); }
    f(c[4], c[5], c[6], c[7]);
    f(c[0], c[1], c[5], c[4]); f(c[1], c[2], c[6], c[5]);
    f(c[2], c[3], c[7], c[6]); f(c[3], c[0], c[4], c[7]);
  }

  var _m4 = null, _q = null, _v = null, _u = null;
  /* cylinder between two points, smooth-shaded */
  function rod(B, a, b, r, seg, r1) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r1 === undefined ? r : r1, r, L, seg || 8, 1);   /* r1: the radius at b */
    _q.setFromUnitVectors(_u.set(0, 1, 0), _v.set(dx / L, dy / L, dz / L));
    _m4.makeRotationFromQuaternion(_q);
    _m4.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(_m4);
    B.geos.push(g);
  }
  /* a wheel: CylinderGeometry's own axis is Y, the axle across the aircraft */
  function wheel(B, r, w, x, y, z, seg) {
    var g = new V.CylinderGeometry(r, r, w, seg || 18, 1);
    g.translate(x, y, z);
    B.geos.push(g);
  }

  /* ============================================================ the body == */
  /* The plate: bottom, top, the leading-edge bevel and the rim. Everything
     outboard of the fuselage is this slab. */
  function outline() {
    var f = OUT.slice(), i;
    for (i = 8; i >= 1; i--) f.push([OUT[i][0], -OUT[i][1]]);
    return f;
  }
  function addPlate(K) {
    var full = outline(), n = full.length, i;
    var bot = [], top = [];
    for (i = 0; i < n; i++) bot.push(P(full[i][0], full[i][1], hlo(full[i][0])));
    poly(K.skin, bot, [0, 0, -1]);

    /* top face, inset from the leading edge by the bevel, up to the platypus */
    var T = [[BEV / TAN_LE, 0], [(6.60 + BEV) / TAN_LE, 6.60]], k;
    var mainPts = [T[0], T[1], OUT[2], OUT[3], OUT[4], OUT[5], OUT[6]];
    var ring = mainPts.slice();
    for (k = mainPts.length - 1; k >= 1; k--) ring.push([mainPts[k][0], -mainPts[k][1]]);
    top = ring.map(function (q) { return P(q[0], q[1], hlo(q[0]) + THK); });
    poly(K.skin, top, [0, 0, 1]);

    /* the platypus: a thinner plate whose trailing edge is the W */
    var plat = [OUT[6], OUT[7], OUT[8], OUT[9], [OUT[8][0], -OUT[8][1]], [OUT[7][0], -OUT[7][1]],
                [OUT[6][0], -OUT[6][1]]];
    var ptk = [THK, OTK[7], OTK[8], OTK[9], OTK[8], OTK[7], THK];
    poly(K.hot, plat.map(function (q, j) { return P(q[0], q[1], hlo(q[0]) + ptk[j]); }), [0, 0, 1]);

    /* leading-edge bevel and its knife-edge wall, both sides */
    var side;
    for (side = -1; side <= 1; side += 2) {
      var no = P(0, 0, hlo(0) + EDGE), l1 = P(OUT[1][0], side * 6.60, hlo(OUT[1][0]) + EDGE);
      var n2 = P(T[0][0], 0, hlo(T[0][0]) + THK), l2 = P(T[1][0], side * 6.60, hlo(T[1][0]) + THK);
      quad(K.skin, no, l1, l2, n2, [0, side * 0.35, 1]);
      var nb = P(0, 0, hlo(0)), lb = P(OUT[1][0], side * 6.60, hlo(OUT[1][0]));
      quad(K.skin, nb, lb, l1, no, [0.38, side * 0.925, 0]);
    }

    /* the rim: tip, trailing edge, notch, aft deck, platypus */
    function wall(a, b, ta, tb, outward) {
      quad(K.skin,
        P(a[0], a[1], hlo(a[0])), P(b[0], b[1], hlo(b[0])),
        P(b[0], b[1], hlo(b[0]) + tb), P(a[0], a[1], hlo(a[0]) + ta), outward);
    }
    var e, a, b, ds, dyy, ln, ow;
    for (side = -1; side <= 1; side += 2) {
      for (e = 2; e <= 8; e++) {
        a = [OUT[e][0], side * OUT[e][1]]; b = [OUT[e + 1][0], side * OUT[e + 1][1]];
        /* the outward normal of this port edge in model x,y, mirrored for starboard */
        ds = OUT[e + 1][0] - OUT[e][0]; dyy = OUT[e + 1][1] - OUT[e][1];
        ln = Math.sqrt(ds * ds + dyy * dyy) || 1;
        ow = [dyy / ln, side * ds / ln, 0];
        wall(a, b, OTK[e], OTK[e + 1], ow);
      }
    }
    /* the chopped tip's wall is a pentagon: it also takes the bevel's end */
    for (side = -1; side <= 1; side += 2) {
      var ya = side * 6.60;
      poly(K.skin, [P(OUT[1][0], ya, hlo(OUT[1][0]) + EDGE), P(T[1][0], ya, hlo(T[1][0]) + THK),
                    P(OUT[2][0], ya, hlo(OUT[2][0]) + THK), P(OUT[2][0], ya, hlo(OUT[2][0])),
                    P(OUT[1][0], ya, hlo(OUT[1][0]))], [0, side, 0]);
    }
  }

  /* ---- the fuselage: a faceted hump on the plate ------------------------
     Stations [s, foot y, foot h, roof half-width, roof h]. The foot is the
     leading edge itself as far aft as the foot line (2.55 m off the
     centreline, s 6.16), then runs straight aft; the roof is a flat strip.
     Heights are above the ground. The roof edge sits 0.85 m off the
     centreline from the cockpit to the tail, the three-view's 1.7 m panel. */
  function footH(s) {
    if (s <= 6.16) return hlo(s) + EDGE;
    var t = Math.min(1, (s - 6.16) / ((FOOT + BEV) / TAN_LE - 6.16));
    return hlo(s) + EDGE + (THK - EDGE) * t;
  }
  var HUMP = [
    [0.00, 0.000, 1.22, 0.000, 1.22],
    [1.45, 0.601, null, 0.090, 1.78],
    [2.90, 1.201, null, 0.500, 2.20],
    [3.80, 1.574, null, 0.820, 2.30],
    [5.00, 2.071, null, 0.850, 2.38],
    [5.95, 2.464, null, 0.850, 2.53],
    [6.16, 2.550, null, 0.850, 2.54],
    [6.94, 2.550, null, 0.850, 2.52],
    [9.00, 2.550, null, 0.850, 2.46],
    [11.00, 2.550, null, 0.850, 2.42],
    [13.80, 2.550, null, 0.850, 2.38],
    [14.55, 2.450, null, 0.820, 2.37],
    [15.50, 1.630, null, 0.700, 2.30],
    [16.35, 0.900, null, 0.600, 2.20]
  ];
  /* the facet plane at station s: height at lateral position y (0 < y < foot) */
  function stationAt(s) {
    var i, a, b, t;
    for (i = 1; i < HUMP.length; i++) {
      if (s <= HUMP[i][0] + 1e-9) {
        a = HUMP[i - 1]; b = HUMP[i];
        t = (s - a[0]) / (b[0] - a[0]);
        return { yf: lerp(a[1], b[1], t), hf: lerp(a[2] === null ? footH(a[0]) : a[2], b[2] === null ? footH(b[0]) : b[2], t),
                 yr: lerp(a[3], b[3], t), hr: lerp(a[4], b[4], t) };
      }
    }
    var l = HUMP[HUMP.length - 1];
    return { yf: l[1], hf: footH(l[0]), yr: l[3], hr: l[4] };
  }
  function facetH(s, y) {
    var st = stationAt(s), t = (y - st.yr) / ((st.yf - st.yr) || 1);
    return lerp(st.hr, st.hf, Math.max(0, Math.min(1, t)));
  }
  function addHump(K) {
    var i, r0, r1, s0, s1;
    function F(r, side) { return P(r[0], side * r[1], r[2] === null ? footH(r[0]) : r[2]); }
    function R(r, side) { return P(r[0], side * r[3], r[4]); }
    for (i = 0; i < HUMP.length - 1; i++) {
      r0 = HUMP[i]; r1 = HUMP[i + 1];
      quad(K.skin, F(r0, 1), R(r0, 1), R(r1, 1), F(r1, 1), [0, 0.5, 0.85]);
      quad(K.skin, F(r0, -1), R(r0, -1), R(r1, -1), F(r1, -1), [0, -0.5, 0.85]);
      quad(K.skin, R(r0, 1), R(r0, -1), R(r1, -1), R(r1, 1), [0, 0, 1]);
    }
    /* the aft face: the exhaust slots open in it */
    var e = HUMP[HUMP.length - 1];
    quad(K.skin, F(e, 1), R(e, 1), R(e, -1), F(e, -1), [-1, 0, 0]);
  }

  /* ---- the canopy: five flat panes ------------------------------------- */
  function addCanopy(K) {
    var S0 = P(2.90, 0, 2.23), S1 = P(3.80, 0.80, 2.31), S2 = P(5.10, 0.84, 2.41), S3 = P(5.95, 0, 2.54);
    var U0 = P(3.45, 0, 2.80), U1 = P(4.85, 0, 3.18);
    var S1r = mirY(S1), S2r = mirY(S2);
    tri(K.glass, S0, S1, U0, [0.4, 0.5, 0.8]);                    /* windshield, port      */
    tri(K.glass, S0, U0, S1r, [0.4, -0.5, 0.8]);                  /* windshield, starboard */
    quad(K.glass, S1, S2, U1, U0, [0, 0.7, 0.7]);                 /* side pane, port       */
    quad(K.glass, S1r, U0, U1, S2r, [0, -0.7, 0.7]);              /* side pane, starboard  */
    quad(K.glass, S2, S3, S2r, U1, [-0.6, 0, 0.8]);               /* rear pane             */
    /* the frame: a rod along every pane edge */
    var edges = [[S0, S1], [S0, S1r], [S1, S2], [S1r, S2r], [S2, S3], [S2r, S3],
                 [S0, U0], [S1, U0], [S1r, U0], [U0, U1], [S2, U1], [S2r, U1], [S3, U1]];
    for (var i = 0; i < edges.length; i++) rod(K.skin, edges[i][0], edges[i][1], 0.032, 5);
    /* the cockpit, seen through the glass: the coaming over the panel, the
       seat, the pilot's helmet and shoulders */
    box(K.ink, XN - 3.70, XN - 3.30, -0.30, 0.30, 2.18 + ZG, 2.40 + ZG);
    box(K.hot, XN - 4.62, XN - 4.18, -0.22, 0.22, 2.36 + ZG, 2.74 + ZG);
    box(K.hot, XN - 4.55, XN - 4.28, -0.34, 0.34, 2.50 + ZG, 2.66 + ZG);
    var hl = new V.SphereGeometry(0.13, 12, 8);
    hl.translate(XN - 4.40, 0, 2.82 + ZG);
    K.hot.geos.push(hl);
    box(K.hot, XN - 4.60, XN - 4.53, -0.13, 0.13, 2.74 + ZG, 2.99 + ZG);          /* the headrest */
    rod(K.hot, P(4.02, 0, 2.20), P(3.96, 0, 2.52), 0.016, 6);                      /* the stick    */
    /* the refuelling receptacle in the roof behind the canopy */
    var h0 = stationAt(6.50).hr + 0.016, h1 = stationAt(7.10).hr + 0.016;
    quad(K.ink, P(6.50, -0.17, h0), P(6.50, 0.17, h0), P(7.10, 0.17, h1), P(7.10, -0.17, h1), [0, 0, 1]);
    function rb(sa, sb, ya, yb) {
      var za = stationAt(sa).hr, zb = stationAt(sb).hr, e = 0.028;
      lift(K.hot, [P(sa, ya, za), P(sb, ya, zb), P(sb, yb, zb), P(sa, yb, za),
                   P(sa, ya, za + e), P(sb, ya, zb + e), P(sb, yb, zb + e), P(sa, yb, za + e)]);
    }
    rb(6.44, 6.50, -0.21, 0.21); rb(7.10, 7.16, -0.21, 0.21);
    rb(6.50, 7.10, 0.17, 0.21); rb(6.50, 7.10, -0.21, -0.17);
  }

  /* ---- the intake grids: two panels on each sloping side ------------------
     The photographs (the 7th FS close-up, the Nellis head-on) show one grille
     on each side of the fuselage behind the cockpit, in two panels with a rib
     between them. Each is drawn as a dark recessed panel (the texture) under
     a frame and a mesh of bars that stand proud of it. */
  /* a point on the side facet at (s, y), lifted off it along its normal */
  function gridPt(side, s, y, off) {
    if (off === undefined) off = 0.025;
    var st = stationAt(s), h = facetH(s, y);
    var slope = (st.hr - st.hf) / ((st.yf - st.yr) || 1), nl = Math.sqrt(1 + slope * slope);
    return P(s, side * (y + off * slope / nl), h + off / nl);
  }
  function addGrids(K) {
    var side, j, i, spans = [[7.35, 9.05], [9.15, 10.85]], y0 = 1.05, y1 = 2.30;
    var NV = 22, NH = 7, W = 0.010, FR = 0.045, O0 = 0.020, O1 = 0.048;
    /* a bar over the rectangle (s0..s1, ya..yb) of the facet */
    function bar(sd, s0, s1, ya, yb) {
      lift(K.hot, [gridPt(sd, s0, ya, O0), gridPt(sd, s1, ya, O0), gridPt(sd, s1, yb, O0), gridPt(sd, s0, yb, O0),
                   gridPt(sd, s0, ya, O1), gridPt(sd, s1, ya, O1), gridPt(sd, s1, yb, O1), gridPt(sd, s0, yb, O1)]);
    }
    for (side = -1; side <= 1; side += 2) {
      for (j = 0; j < spans.length; j++) {
        var sa = spans[j][0], sb = spans[j][1];
        var a = gridPt(side, sa, y0), b = gridPt(side, sb, y0), c = gridPt(side, sb, y1), d = gridPt(side, sa, y1);
        tri(K.grid, a, b, c, [0, side * 0.4, 1], [0, 0], [1, 0], [1, 1]);
        tri(K.grid, a, c, d, [0, side * 0.4, 1], [0, 0], [1, 1], [0, 1]);
        /* the frame (the redo: a deep frame standing proud, and the eyebrow
           of the upper lip over the panel, as the 7th FS close-up shows) */
        lift(K.hot, [gridPt(side, sa - 0.04, y0 - 0.06, O0), gridPt(side, sb + 0.04, y0 - 0.06, O0),
                     gridPt(side, sb + 0.04, y0 + FR, O0), gridPt(side, sa - 0.04, y0 + FR, O0),
                     gridPt(side, sa - 0.04, y0 - 0.06, 0.12), gridPt(side, sb + 0.04, y0 - 0.06, 0.12),
                     gridPt(side, sb + 0.04, y0 + FR, 0.10), gridPt(side, sa - 0.04, y0 + FR, 0.10)]);
        lift(K.hot, [gridPt(side, sa - 0.04, y0, O0), gridPt(side, sa + FR, y0, O0), gridPt(side, sa + FR, y1, O0), gridPt(side, sa - 0.04, y1, O0),
                     gridPt(side, sa - 0.04, y0, 0.10), gridPt(side, sa + FR, y0, 0.10), gridPt(side, sa + FR, y1, 0.07), gridPt(side, sa - 0.04, y1, 0.07)]);
        lift(K.hot, [gridPt(side, sb - FR, y0, O0), gridPt(side, sb + 0.04, y0, O0), gridPt(side, sb + 0.04, y1, O0), gridPt(side, sb - FR, y1, O0),
                     gridPt(side, sb - FR, y0, 0.10), gridPt(side, sb + 0.04, y0, 0.10), gridPt(side, sb + 0.04, y1, 0.07), gridPt(side, sb - FR, y1, 0.07)]);
        bar(side, sa, sb, y1 - FR, y1);
        /* the mesh: bars across the slope, bars along it */
        for (i = 1; i <= NV; i++) {
          var sv = lerp(sa, sb, i / (NV + 1));
          bar(side, sv - W, sv + W, y0 + FR, y1 - FR);
        }
        for (i = 1; i <= NH; i++) {
          var yv = lerp(y0, y1, i / (NH + 1));
          bar(side, sa + FR, sb - FR, yv - W, yv + W);
        }
      }
      /* the rib between the two panels */
      bar(side, spans[0][1], spans[1][0], y0, y1);
    }
  }

  /* ---- a point on a fuselage side facet ---------------------------------
     (s along the aircraft, t from the foot of the facet, 0, to its roof edge,
     1), lifted off it by `off` along its outward normal. Returns the point and,
     when asked, the facet's own axes. */
  function facetAt(side, s, t, off, axes) {
    var st = stationAt(s);
    var q = P(s, side * lerp(st.yf, st.yr, t), lerp(st.hf, st.hr, t));
    var d = 0.04, sa = Math.max(0.1, s - d), sb = Math.min(16.3, s + d);
    var A = stationAt(sa), B = stationAt(sb);
    var qa = P(sa, side * lerp(A.yf, A.yr, t), lerp(A.hf, A.hr, t));
    var qb = P(sb, side * lerp(B.yf, B.yr, t), lerp(B.hf, B.hr, t));
    var u = sub(qa, qb), v = [0, side * (st.yr - st.yf), st.hr - st.hf];
    var Lu = Math.sqrt(dot(u, u)) || 1, Lv = Math.sqrt(dot(v, v)) || 1, n = cross(u, v), Ln = Math.sqrt(dot(n, n)) || 1;
    n = [n[0] / Ln, n[1] / Ln, n[2] / Ln];
    if (dot(n, [0, side, 0.3]) < 0) n = [-n[0], -n[1], -n[2]];
    var o = off || 0, p = [q[0] + n[0] * o, q[1] + n[1] * o, q[2] + n[2] * o];
    if (axes) { axes.u = [u[0] / Lu, u[1] / Lu, u[2] / Lu]; axes.v = [v[0] / Lv, v[1] / Lv, v[2] / Lv]; axes.n = n; }
    return p;
  }

  /* ---- exhaust slots ----------------------------------------------------
     The exhausts are two long louvred slots, one on each of the angled aft
     facets, along their lower edge just over the platypus (the 1996 side view
     shows the row of vanes under the tail, and the three-view's side drawing
     the same strip, about 2 m long). A dark recess with a row of vanes. */
  function addExhaust(K) {
    var side, i, N = 18, s0 = 14.80, s1 = 16.22, t0 = 0.05, t1 = 0.40, w = 0.018, H = 0.06;
    for (side = -1; side <= 1; side += 2) {
      quad(K.ink, facetAt(side, s0 - 0.05, t0, 0.012), facetAt(side, s1 + 0.05, t0, 0.012),
                  facetAt(side, s1 + 0.05, t1, 0.012), facetAt(side, s0 - 0.05, t1, 0.012), [-0.4, side * 0.7, 0.6]);
      for (i = 0; i < N; i++) {
        var s = lerp(s0, s1, i / (N - 1));
        lift(K.hot, [facetAt(side, s - w, t0, 0.012), facetAt(side, s + w, t0, 0.012),
                     facetAt(side, s + w, t1, 0.012), facetAt(side, s - w, t1, 0.012),
                     facetAt(side, s - w, t0, H), facetAt(side, s + w, t0, H),
                     facetAt(side, s + w, t1, H), facetAt(side, s - w, t1, H)]);
      }
    }
  }

  /* ---- the nose: air-data probes and the FLIR window ----------------------
     The Nellis head-on photograph shows small probes on the nose facets just
     behind the tip, two a side. They are drawn 0.3 m long, pointing forward
     and a little out; their exact stations are estimates. The 7th FS close-up
     shows the hexagonal infrared window, with a stepped border, in the
     starboard nose facet below the canopy; no matching window was found on
     the port side, so none is drawn there. */
  function addNose(K) {
    var side, k, ST = [0.70, 1.05];
    for (side = -1; side <= 1; side += 2) {
      for (k = 0; k < ST.length; k++) {
        var base = facetAt(side, ST[k], 0.55, 0.01);
        rod(K.hot, base, [base[0] + 0.30, base[1] + side * 0.05, base[2] + 0.02], 0.020, 6, 0.004);
      }
    }
    /* the window: a hexagon in the facet, ink inside a lighter border */
    var ax = {}, c = facetAt(-1, 3.25, 0.42, 0.0, ax), pts, i, R;
    function hex(r, off) {
      var out = [];
      for (i = 0; i < 6; i++) {
        var a = i * Math.PI / 3;
        out.push([c[0] + ax.n[0] * off + r * (Math.cos(a) * ax.u[0] + Math.sin(a) * ax.v[0]),
                  c[1] + ax.n[1] * off + r * (Math.cos(a) * ax.u[1] + Math.sin(a) * ax.v[1]),
                  c[2] + ax.n[2] * off + r * (Math.cos(a) * ax.u[2] + Math.sin(a) * ax.v[2])]);
      }
      return out;
    }
    poly(K.hot, hex(0.34, 0.012), ax.n);
    poly(K.ink, hex(0.27, 0.018), ax.n);
  }

  /* ---- ruddervators ------------------------------------------------------
     Each is an all-moving plate canted about 30 degrees out of vertical,
     swept so that its leading edge rises 21 degrees from the aft deck to a
     flat tip 1.7 m long at the full 3.78 m, and its trailing edge climbs
     from the platypus to the tip's aft corner. The team colour caps the top. */
  function along(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }
  function addTails(K) {
    var side;
    for (side = -1; side <= 1; side += 2) {
      var RLE = P(14.90, side * 0.30, 2.34), RTE = P(17.70, side * 0.38, 1.66);
      var TTE = P(20.08, side * 1.28, 3.765), TLE = P(18.40, side * 1.20, 3.765);
      slab(K.skin, [RLE, RTE, TTE, TLE], 0.07);
      /* the team cap: the top 0.34 m of the blade, 3 cm proud of it (and the
         team material is polygon-offset, so the two never fight for the depth) */
      var tl = along(TLE, RLE, 0.19), tt = along(TTE, RTE, 0.15);
      slab(K.team, [tl, tt, TTE, TLE], 0.13);
    }
  }

  /* ---- the belly: both bays drawn shut ----------------------------------- */
  function addBelly(K) {
    var side, w = 0.035;
    function strip(s0, s1, y0, y1) {
      quad(K.ink, P(s0, y0, hlo(s0) - 0.014), P(s1, y0, hlo(s1) - 0.014), P(s1, y1, hlo(s1) - 0.014),
           P(s0, y1, hlo(s0) - 0.014), [0, 0, -1]);
    }
    for (side = -1; side <= 1; side += 2) {
      var ya = side * 0.10, yb = side * 1.06, lo = Math.min(ya, yb), hi = Math.max(ya, yb);
      strip(7.40, 11.60, lo, lo + w); strip(7.40, 11.60, hi - w, hi);
      /* the detail pass: the bay doors' fore and aft edges are saw-toothed,
         as on every door of the type (the rear three-quarter photograph) */
      zigPlane(K.ink, 7.40, lo, 7.40, hi, 4, 0.16, 0.035, function (q) { return hlo(q) - 0.014; }, -1);
      zigPlane(K.ink, 11.60, lo, 11.60, hi, 4, 0.16, 0.035, function (q) { return hlo(q) - 0.014; }, -1);
      /* the nose-gear bay and the main bays' outlines, saw-toothed fore and aft */
      zigPlane(K.ink, 4.30, side * 0.02, 4.30, side * 0.34, 2, 0.12, 0.03, function (q) { return hlo(q) - 0.014; }, -1);
      zigPlane(K.ink, 9.90, side * 1.55, 9.90, side * 2.45, 3, 0.14, 0.03, function (q) { return hlo(q) - 0.014; }, -1);
      zigPlane(K.ink, 11.70, side * 1.55, 11.70, side * 2.45, 3, 0.14, 0.03, function (q) { return hlo(q) - 0.014; }, -1);
      strip(9.90, 11.70, side > 0 ? 2.45 - w : -2.45, side > 0 ? 2.45 : -2.45 + w);
    }
  }

  /* ---- the detail pass: saw-toothed seams laid on the skin ----------------
     A zigzag chain of thin strips from (s0, y0) to (s1, y1) on a surface
     whose height is h(s), n teeth deep d, strips w wide, facing up (+1) or
     down (-1). The F-117's doors and access panels all have these edges (the
     7th FS close-up, the Andrews rear view). */
  function zigPlane(B, s0, y0, s1, y1, n, d, w, h, up) {
    var pts = [], k, m = 2 * n, ds = s1 - s0, dy = y1 - y0, L = Math.sqrt(ds * ds + dy * dy) || 1;
    var ps = -dy / L, py = ds / L;
    for (k = 0; k <= m; k++) {
      var t = k / m, o = (k % 2 ? d / 2 : -d / 2);
      pts.push([s0 + ds * t + ps * o, y0 + dy * t + py * o]);
    }
    for (k = 0; k < m; k++) {
      var a = pts[k], b = pts[k + 1], es = b[0] - a[0], ey = b[1] - a[1], el = Math.sqrt(es * es + ey * ey) || 1;
      var ns = -ey / el * w / 2, ny = es / el * w / 2;
      quad(B, P(a[0] + ns, a[1] + ny, h(a[0] + ns, a[1] + ny)), P(b[0] + ns, b[1] + ny, h(b[0] + ns, b[1] + ny)),
              P(b[0] - ns, b[1] - ny, h(b[0] - ns, b[1] - ny)), P(a[0] - ns, a[1] - ny, h(a[0] - ns, a[1] - ny)), [0, 0, up]);
    }
  }
  /* the same on a fuselage side facet, in (s, t) - t across the facet */
  function zigFacet(B, side, s0, t0, s1, t1, n, d, w) {
    var pts = [], k, m = 2 * n;
    for (k = 0; k <= m; k++) {
      var f = k / m, o = (k % 2 ? d / 2 : -d / 2);
      var ds = s1 - s0, dt = (t1 - t0) * 1.6, L = Math.sqrt(ds * ds + dt * dt) || 1;
      pts.push([s0 + ds * f - dt / L * o, t0 + (t1 - t0) * f + ds / L * o / 1.6]);
    }
    for (k = 0; k < m; k++) {
      var a = pts[k], b = pts[k + 1], es = b[0] - a[0], et = (b[1] - a[1]) * 1.6, el = Math.sqrt(es * es + et * et) || 1;
      var ns = -et / el * w / 2, nt = es / el * w / 2 / 1.6;
      quad(B, facetAt(side, a[0] + ns, a[1] + nt, 0.014), facetAt(side, b[0] + ns, b[1] + nt, 0.014),
              facetAt(side, b[0] - ns, b[1] - nt, 0.014), facetAt(side, a[0] - ns, a[1] - nt, 0.014), [0, side * 0.6, 0.8]);
    }
  }
  function addPanels(K) {
    var side, top = function (q, y) { return hlo(q) + THK + 0.02 + tentH(q, Math.abs(y || 0)); };
    for (side = -1; side <= 1; side += 2) {
      /* the upper wing's access panels inboard of the tips and behind the
         grids, fore and aft edges toothed, the sides straight */
      [[12.2, 13.3, 3.2, 4.3], [10.6, 11.5, 3.0, 3.7], [8.4, 9.2, 2.75, 3.25]].forEach(function (r) {
        zigPlane(K.ink, r[0], side * r[2], r[0], side * r[3], 3, 0.13, 0.03, top, 1);
        zigPlane(K.ink, r[1], side * r[2], r[1], side * r[3], 3, 0.13, 0.03, top, 1);
        zigPlane(K.ink, r[0], side * r[2], r[1], side * r[2], 1, 0.0, 0.03, top, 1);
        zigPlane(K.ink, r[0], side * r[3], r[1], side * r[3], 1, 0.0, 0.03, top, 1);
      });
      /* the side facets: the avionics bay under the canopy, the engine
         access panels behind the grids */
      zigFacet(K.ink, side, 3.60, 0.12, 3.60, 0.55, 2, 0.12, 0.03);
      zigFacet(K.ink, side, 4.60, 0.12, 4.60, 0.55, 2, 0.12, 0.03);
      zigFacet(K.ink, side, 3.60, 0.12, 4.60, 0.12, 1, 0.0, 0.03);
      zigFacet(K.ink, side, 11.30, 0.15, 11.30, 0.80, 3, 0.12, 0.03);
      zigFacet(K.ink, side, 12.80, 0.15, 12.80, 0.80, 3, 0.12, 0.03);
      zigFacet(K.ink, side, 11.30, 0.80, 12.80, 0.80, 1, 0.0, 0.03);
      /* the wing-tip position lights, port red, in the chopped tip */
      box(side > 0 ? K.lampR : K.lampG, XN - 16.55, XN - 16.25, side * 6.58 - 0.02, side * 6.58 + 0.02,
          hlo(16.4) + 0.06 + ZG, hlo(16.4) + 0.16 + ZG);
    }
    /* the roof panel behind the receptacle */
    var roof = function (q) { return stationAt(q).hr + 0.014; };
    zigPlane(K.ink, 7.70, -0.55, 7.70, 0.55, 3, 0.12, 0.03, roof, 1);
    zigPlane(K.ink, 9.20, -0.55, 9.20, 0.55, 3, 0.12, 0.03, roof, 1);
    /* the anti-collision light on the roof, retracted flush (a red lens) */
    box(K.lampR, XN - 10.05, XN - 9.85, -0.07, 0.07, stationAt(9.95).hr + ZG, stationAt(9.95).hr + 0.03 + ZG);
  }

  /* ---- team colour: a band across each wing near the tip, parallel to the
     trailing edge, laid on the top plane so the camera sees it ----------- */
  function addFlash(K) {
    var tip = [17.30, 5.90], d = [-0.723, -0.692], nf = [-0.692, 0.723];
    function at(t, o) { return [tip[0] + d[0] * t + nf[0] * o, tip[1] + d[1] * t + nf[1] * o]; }
    var c = [at(0.5, 0.35), at(2.9, 0.35), at(2.9, 1.05), at(0.5, 1.05)], side, i;
    /* (the redo) laid as a grid over the faceted wing, each corner lifted
       off the facet under it */
    var NA = 8, NB = 3, j;
    for (side = -1; side <= 1; side += 2) {
      for (i = 0; i < NA; i++) {
        for (j = 0; j < NB; j++) {
          var q = [at(0.5 + 2.4 * i / NA, 0.35 + 0.7 * j / NB), at(0.5 + 2.4 * (i + 1) / NA, 0.35 + 0.7 * j / NB),
                   at(0.5 + 2.4 * (i + 1) / NA, 0.35 + 0.7 * (j + 1) / NB), at(0.5 + 2.4 * i / NA, 0.35 + 0.7 * (j + 1) / NB)];
          quad(K.team, P(q[0][0], side * q[0][1], hlo(q[0][0]) + THK + 0.03 + tentH(q[0][0], q[0][1])),
                       P(q[1][0], side * q[1][1], hlo(q[1][0]) + THK + 0.03 + tentH(q[1][0], q[1][1])),
                       P(q[2][0], side * q[2][1], hlo(q[2][0]) + THK + 0.03 + tentH(q[2][0], q[2][1])),
                       P(q[3][0], side * q[3][1], hlo(q[3][0]) + THK + 0.03 + tentH(q[3][0], q[3][1])), [0, 0, 1]);
        }
      }
    }
  }

  /* ================================================================ gear ==
     Tricycle, one wheel on each leg, as the rear three-quarter photograph
     shows. No published wheelbase or track was found, so the placement is
     read off that photograph's ratios once perspective is allowed for: the
     nose leg 5.0 m aft of the nose and the mains 10.8 m (a 5.8 m wheelbase),
     which puts the mains at about half the length where the weight is, on a
     3.0 m track. The belly stands 1.15 m up at the nose and 1.4 m under the
     wing, so the legs are long; tyres about 0.58 m and 0.78 m across. These
     four numbers are estimates, not published figures. */
  function addGear(G) {
    var NS = 5.0, MS = 10.8, nr = 0.29, mr = 0.39, side, k;
    var hn = hlo(NS) + 0.02, hm = hlo(MS) + 0.02;
    /* nose: leg, fork, wheel, landing light, two long doors */
    rod(G.metal, P(NS - 0.14, 0, hn), P(NS, 0, 0.50), 0.060, 8);
    rod(G.metal, P(NS, 0.10, 0.52), P(NS, 0.10, nr), 0.030, 6);
    rod(G.metal, P(NS, -0.10, 0.52), P(NS, -0.10, nr), 0.030, 6);
    rod(G.metal, P(NS - 0.55, 0, hn), P(NS - 0.06, 0, 0.78), 0.028, 6);
    /* the torque links, a pair of arms from the leg's lower tube to the fork */
    rod(G.metal, P(NS - 0.04, 0.045, 0.92), P(NS + 0.10, 0.075, 0.62), 0.016, 5);
    rod(G.metal, P(NS - 0.04, -0.045, 0.92), P(NS + 0.10, -0.075, 0.62), 0.016, 5);
    box(G.metal, XN - NS - 0.10, XN - NS + 0.04, -0.07, 0.07, 0.78 + ZG, 0.96 + ZG);
    wheel(G.tyre, nr, 0.18, XN - NS, 0, nr + ZG, 28);
    wheel(G.metal, 0.12, 0.19, XN - NS, 0, nr + ZG, 16);
    /* the nose doors, their lower edges saw-toothed like the mains' (the
       detail pass; they were plain boxes) */
    for (side = -1; side <= 1; side += 2) {
      var ny2 = side * 0.285, nd = hn - 0.62, pn = [], kk, nn2 = 4, a0 = NS - 0.75, a1 = NS + 0.55;
      pn.push(P(a0, ny2, hn)); pn.push(P(a1, ny2, hn));
      for (kk = nn2; kk >= 0; kk--) pn.push(P(lerp(a0, a1, kk / nn2), ny2, (kk % 2 ? nd : nd + 0.10)));
      slab(G.skin, pn, 0.03);
    }
    /* hub caps, the oleo's gland collar, a taxi lamp lens (detail pass) */
    wheel(G.tyre, 0.08, 0.20, XN - NS, 0, nr + ZG, 10);
    rod(G.metal, P(NS - 0.08, 0, 0.98), P(NS - 0.08, 0, 1.04), 0.085, 10);
    box(G.metal, XN - NS + 0.12, XN - NS + 0.20, -0.06, 0.06, 1.10 + ZG, 1.20 + ZG);
    /* mains: oleo, side brace, axle, wheel, and a serrated door each */
    for (side = -1; side <= 1; side += 2) {
      rod(G.metal, P(MS - 0.10, side * 1.42, hm), P(MS, side * 1.52, 0.52), 0.080, 8);
      rod(G.metal, P(MS + 0.70, side * 1.05, hm), P(MS, side * 1.46, 0.66), 0.040, 6);
      rod(G.metal, P(MS - 0.62, side * 1.12, hm), P(MS - 0.04, side * 1.46, 0.66), 0.036, 6);
      rod(G.metal, P(MS, side * 1.52, mr), P(MS, side * 1.74, mr), 0.055, 8);
      /* the lower oleo, a thinner tube sliding in the upper, and the brake */
      rod(G.metal, P(MS - 0.02, side * 1.50, 0.86), P(MS, side * 1.52, 0.56), 0.060, 8);
      wheel(G.metal, 0.27, 0.05, XN - MS, side * 1.54, mr + ZG, 16);
      wheel(G.tyre, mr, 0.26, XN - MS, side * 1.65, mr + ZG, 28);
      wheel(G.metal, 0.19, 0.27, XN - MS, side * 1.65, mr + ZG, 16);
      /* the detail pass: hub cap and bolts, torque links, brake line */
      wheel(G.tyre, 0.10, 0.29, XN - MS, side * 1.65, mr + ZG, 10);
      for (k = 0; k < 6; k++)
        wheel(G.metal, 0.016, 0.30, XN - MS + Math.cos(k * Math.PI / 3) * 0.145, side * 1.65, mr + ZG + Math.sin(k * Math.PI / 3) * 0.145, 5);
      rod(G.metal, P(MS + 0.02, side * 1.51, 0.62), P(MS - 0.16, side * 1.50, 0.78), 0.018, 5);
      rod(G.metal, P(MS - 0.16, side * 1.50, 0.78), P(MS - 0.02, side * 1.49, 0.94), 0.018, 5);
      rod(G.tyre, P(MS + 0.06, side * 1.40, hm - 0.05), P(MS + 0.04, side * 1.48, 0.62), 0.010, 4);
      /* the door: a plate hanging from the bay edge, its lower edge saw-toothed */
      var y = side * 1.98, hd = hm - 0.62, k, pts = [], n = 5, s0 = MS - 0.85, s1 = MS + 0.85;
      pts.push(P(s0, y, hm)); pts.push(P(s1, y, hm));
      for (k = n; k >= 0; k--) {
        pts.push(P(lerp(s0, s1, k / n), y, (k % 2 ? hd : hd + 0.13)));
      }
      slab(G.skin, pts, 0.03);
    }
  }

  /* ---- the detail pass: the skin's paint sheet ----------------------------
     The radar-absorbent finish is not one flat black: the photographs show
     the RAM sheets as panels a shade apart, the lighter grey tape and filler
     along every facet joint and panel edge, the saw-toothed outlines of the
     doors and access panels, rain and fluid streaks and exhaust grime on the
     aft deck. Projected by face normal into top / port / starboard / belly. */
  var TXMIN = -10.3, TPX = 26, TYMAX = 6.9, TPY = 26, TZTOP = 2.4, TZSPAN = 4.0;
  var TTW = Math.round(20.6 * TPX), TTOPH = Math.round(2 * TYMAX * TPY), TSIDEH = 120, TTH = 2 * TTOPH + 2 * TSIDEH;
  function cl(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function tU(x) { return cl((x - TXMIN) * TPX, 2, TTW - 2); }
  function tY(y, band) { return (band === 3 ? TTOPH + 2 * TSIDEH : 0) + cl((TYMAX - y) * TPY, 2, TTOPH - 2); }
  function tZ(z, band) { return TTOPH + (band - 1) * TSIDEH + cl((TZTOP - z) / TZSPAN * TSIDEH, 2, TSIDEH - 2); }
  var _skinTex;
  function skinTex() {
    if (_skinTex !== undefined) return _skinTex;
    try {
      var cv = document.createElement("canvas");
      cv.width = TTW; cv.height = TTH;
      var g = cv.getContext("2d"), sd = 11701, i, b, side;
      var R = function () { sd = (sd * 16807) % 2147483647; return sd / 2147483647; };
      g.fillStyle = "#2e3136"; g.fillRect(0, 0, TTW, TTH);
      /* RAM sheets a shade apart */
      for (i = 0; i < 160; i++) {
        g.fillStyle = (i % 3 === 0) ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.07)";
        g.fillRect(R() * TTW, R() * TTH, 14 + R() * 46, 10 + R() * 30);
      }
      function tape(x0, y0, x1, y1, wdt) {
        g.strokeStyle = "rgba(150,154,158,0.30)"; g.lineWidth = wdt || 2;
        g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
      }
      function zig(x0, y0, x1, y1, n, dd) {
        var k, m = 2 * n, dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy) || 1;
        g.strokeStyle = "rgba(10,10,12,0.55)"; g.lineWidth = 1.2;
        g.beginPath();
        for (k = 0; k <= m; k++) {
          var o = (k % 2 ? dd : -dd) / 2, xx = x0 + dx * k / m - dy / L * o, yy = y0 + dy * k / m + dx / L * o;
          if (k) g.lineTo(xx, yy); else g.moveTo(xx, yy);
        }
        g.stroke();
      }
      /* top and belly: tape along the leading edges and the plate's joints,
         spanwise panel tapes, toothed access panels */
      for (b = 0; b <= 3; b += 3) for (side = -1; side <= 1; side += 2) {
        tape(tU(XN - 0.4), tY(side * 0.17, b), tU(XN - 15.9), tY(side * 6.55, b), 3);
        tape(tU(XN - 6.2), tY(side * 2.55, b), tU(XN - 13.8), tY(side * 2.55, b));
        tape(tU(XN - 13.8), tY(side * 2.55, b), tU(XN - 17.3), tY(side * 5.9, b));
        for (i = 0; i < 6; i++) {
          var ss = 8.0 + i * 1.3, yy = Math.min(6.4, ss * 0.4142 - 0.3);
          tape(tU(XN - ss), tY(side * 2.6, b), tU(XN - ss - 0.9), tY(side * yy, b), 1);
        }
        for (i = 0; i < 4; i++) {
          var s0 = 9.0 + i * 1.6, w0 = 2.9 + i * 0.6;
          zig(tU(XN - s0), tY(side * w0, b), tU(XN - s0), tY(side * (w0 + 0.7), b), 3, 6);
          zig(tU(XN - s0 - 0.8), tY(side * w0, b), tU(XN - s0 - 0.8), tY(side * (w0 + 0.7), b), 3, 6);
        }
      }
      /* the roof and the sides: tape along the facet joints, toothed panels */
      for (b = 1; b <= 2; b++) {
        tape(tU(XN - 1.0), tZ(1.0 + ZG + 0.6, b), tU(XN - 16.0), tZ(2.3 + ZG, b), 2);
        tape(tU(XN - 1.0), tZ(1.35 + ZG, b), tU(XN - 16.0), tZ(1.62 + ZG, b), 2);
        for (i = 0; i < 9; i++) zig(tU(XN - 2.0 - i * 1.6), tZ(2.45 + ZG, b), tU(XN - 2.0 - i * 1.6), tZ(1.50 + ZG, b), 3, 6);
        for (i = 0; i < 20; i++) {
          var rx0 = R() * TTW, ry0 = tZ(2.4 + ZG - R() * 1.2, b);
          var rg = g.createLinearGradient(0, ry0, 0, ry0 + 12 + R() * 12);
          rg.addColorStop(0, "rgba(120,124,128,0.10)"); rg.addColorStop(1, "rgba(120,124,128,0)");
          g.fillStyle = rg; g.fillRect(rx0, ry0, 1 + R() * 2, 24);
        }
      }
      tape(tU(XN - 3.0), tY(0, 0), tU(XN - 16.3), tY(0, 0), 1);
      /* exhaust grime on the aft deck and the platypus */
      var eg = g.createLinearGradient(tU(XN - 14.6), 0, tU(XN - 18.0), 0);
      eg.addColorStop(0, "rgba(70,62,52,0.0)"); eg.addColorStop(1, "rgba(70,62,52,0.35)");
      g.fillStyle = eg; g.fillRect(tU(XN - 18.0), 0, tU(XN - 14.6) - tU(XN - 18.0), TTOPH + 2 * TSIDEH);
      for (i = 0; i < 50; i++) {
        g.fillStyle = "rgba(0,0,0," + (0.04 + R() * 0.06).toFixed(3) + ")";
        g.fillRect(R() * TTW, R() * TTH, 10 + R() * 40, 2 + R() * 6);
      }
      _skinTex = new V.CanvasTexture(cv);
      _skinTex.wrapS = _skinTex.wrapT = V.ClampToEdgeWrapping;
      _skinTex.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) _skinTex.encoding = V.sRGBEncoding;
    } catch (e) { _skinTex = false; }
    return _skinTex;
  }
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
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
        if (band === 0 || band === 3) { U = tU(x); W = tY(y, band); }
        else { U = tU(endOn ? x + y : x); W = tZ(z, band); }
        uv[(t / 3 + k) * 2] = U / TTW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TTH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ========================================================== materials == */
  var _grid;
  function gridTex() {
    if (_grid !== undefined) return _grid;
    try {
      var cv = document.createElement("canvas");
      cv.width = 128; cv.height = 64;
      var g = cv.getContext("2d"), i;
      g.fillStyle = "#0a0b0c"; g.fillRect(0, 0, 128, 64);
      g.fillStyle = "#34383c";
      for (i = 0; i <= 8; i++) g.fillRect(Math.min(126, i * 15.8), 0, 2, 64);
      for (i = 0; i <= 4; i++) g.fillRect(0, Math.min(62, i * 15.7), 128, 2);
      _grid = new V.CanvasTexture(cv);
      _grid.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) _grid.encoding = V.sRGBEncoding;   /* r148 */
    } catch (e) { _grid = false; }
    return _grid;
  }
  /* SKIN: the radar-absorbent black, a shade off black so that the flat
     facets read against each other. METAL: the gear. GLASS: the canopy,
     tinted. The team colour is exactly C.team (eraPaint leaves it alone); the
     emissive keeps it from greying out under ACES. */
  function makeMats(C) {
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0x2e3136, roughness: 0.60, metalness: 0.18,
                                          side: V.DoubleSide });
    var st = skinTex();
    if (st) { m.skin.map = st; m.skin.color.set(0xffffff); }
    m.lampR = new V.MeshStandardMaterial({ color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 });
    m.lampG = new V.MeshStandardMaterial({ color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 });
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10,
                                          side: V.DoubleSide,
                                          polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    m.hot = new V.MeshStandardMaterial({ color: 0x3a3c3f, roughness: 0.55, metalness: 0.40,
                                         side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x07080a, roughness: 0.95, metalness: 0.03,
                                         side: V.DoubleSide,
                                         polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    /* the facet-joint tape: a lighter, flatter grey (the 7th FS close-up) */
    m.tape = new V.MeshStandardMaterial({ color: 0x55595e, roughness: 0.85, metalness: 0.08, side: V.DoubleSide,
                                          polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    m.glass = new V.MeshStandardMaterial({ color: 0x41381f, roughness: 0.12, metalness: 0.55,
                                           transparent: true, opacity: 0.86, side: V.DoubleSide });
    m.grid = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.80, metalness: 0.10,
                                          side: V.DoubleSide,
                                          polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var tx = gridTex();
    if (tx) m.grid.map = tx; else m.grid.color.setHex(0x0d0e10);
    return m;
  }


  /* ================================================================ the redo
     (the model evaluation: still among the plainest; the outline is kept,
     the facet and edge fidelity raised.) From the photographs named above:
       - the wing's upper skin is two facets, not one plane: a short facet
         rising from the leading-edge bevel to a ridge about 38 per cent
         back, a long one falling to the trailing edge (the Nellis head-on
         and the Persian Gulf side view, where the light breaks along that
         ridge); the ridge stands 6.5 cm (NOT CONFIRMED, read as a shading
         break, not measured);
       - every facet joint carries the lighter tape (the 7th FS close-up):
         drawn as raised strips along the bevel line, the ridges, the
         fuselage foot and roof edges;
       - the intake grids stand in a deep frame under an eyebrow lip;
       - the exhaust slots have the overhanging upper lip, and the platypus
         its heat-tile rows;
       - with the gear down the bays are open: dark wells with a rim,
         under the nose and the two mains (the Andrews rear view). */
  function teSAt(y) {
    if (y <= 5.90) return 13.80 + (y - 2.55) / (5.90 - 2.55) * (17.30 - 13.80);
    return 17.30 - (y - 5.90) / 0.70 * 0.45;
  }
  function leSAt(y) { return (y + BEV) / TAN_LE; }
  var RIDGE = 0.38, RH = 0.065, TENT0 = 0.006;
  function tentH(s, y) {
    if (y < 2.55 || y > 6.60) return 0;
    var a = leSAt(y), b = teSAt(y), r = a + RIDGE * (b - a);
    if (s <= a || s >= b) return 0;
    return TENT0 + (RH - TENT0) * (s <= r ? (s - a) / (r - a) : (b - s) / (b - r));
  }
  function tape(B, a, b, n, w) {
    var t = sub(b, a), sd = cross(t, n), L = Math.sqrt(dot(sd, sd)) || 1, nl = Math.sqrt(dot(n, n)) || 1;
    var o = [sd[0] / L * w / 2, sd[1] / L * w / 2, sd[2] / L * w / 2], lf = 0.012 / nl;
    var A = [a[0] + n[0] * lf, a[1] + n[1] * lf, a[2] + n[2] * lf], Bp = [b[0] + n[0] * lf, b[1] + n[1] * lf, b[2] + n[2] * lf];
    quad(B, [A[0] + o[0], A[1] + o[1], A[2] + o[2]], [Bp[0] + o[0], Bp[1] + o[1], Bp[2] + o[2]],
            [Bp[0] - o[0], Bp[1] - o[1], Bp[2] - o[2]], [A[0] - o[0], A[1] - o[1], A[2] - o[2]], n);
  }
  function addRedo(K, G) {
    var side, i, NY = 12, ys = [];
    for (i = 0; i <= NY; i++) ys.push(2.55 + (6.60 - 2.55) * i / NY);
    for (side = -1; side <= 1; side += 2) {
      var Lp = [], Rp = [], Tp = [];
      for (i = 0; i <= NY; i++) {
        var y = ys[i], a = leSAt(y), b = teSAt(y), r = a + RIDGE * (b - a);
        if (i === NY) { a = Math.min(a, 16.85); r = Math.min(r, 16.85); b = 16.85; }
        Lp.push(P(a, side * y, hlo(a) + THK + TENT0));
        Rp.push(P(r, side * y, hlo(r) + THK + RH));
        Tp.push(P(b, side * y, hlo(b) + THK + TENT0));
      }
      for (i = 0; i < NY; i++) {
        quad(K.skin, Lp[i], Lp[i + 1], Rp[i + 1], Rp[i], [0.25, side * 0.08, 1]);
        quad(K.skin, Rp[i], Rp[i + 1], Tp[i + 1], Tp[i], [-0.12, -side * 0.05, 1]);
        if (i < NY - 1) tape(K.tape, Rp[i], Rp[i + 1], [0, 0, 1], 0.05);
      }
      tri(K.skin, Lp[0], Rp[0], Tp[0], [0, -side, 0]);
      /* tape: the bevel's inner line, the fuselage foot and roof edges */
      tape(K.tape, P(BEV / TAN_LE, 0, hlo(BEV / TAN_LE) + THK), P((6.54 + BEV) / TAN_LE, side * 6.54, hlo((6.54 + BEV) / TAN_LE) + THK),
           [0, side * 0.3, 1], 0.05);
      for (i = 2; i < HUMP.length - 1; i++) {
        var r0 = HUMP[i], r1 = HUMP[i + 1];
        var f0 = P(r0[0], side * r0[1], footH(r0[0])), f1 = P(r1[0], side * r1[1], footH(r1[0]));
        var e0 = P(r0[0], side * r0[3], r0[4]), e1 = P(r1[0], side * r1[3], r1[4]);
        if (r0[0] >= 6.16) tape(K.tape, f0, f1, [0, side * 0.5, 1], 0.06);
        if (r0[0] >= 5.95) tape(K.tape, e0, e1, [0, side * 0.4, 1], 0.05);
      }
      /* the exhaust slot's upper lip, overhanging */
      lift(K.hot, [facetAt(side, 14.70, 0.40, 0.012), facetAt(side, 16.30, 0.40, 0.012),
                   facetAt(side, 16.30, 0.52, 0.012), facetAt(side, 14.70, 0.52, 0.012),
                   facetAt(side, 14.70, 0.40, 0.11), facetAt(side, 16.30, 0.40, 0.11),
                   facetAt(side, 16.30, 0.52, 0.05), facetAt(side, 14.70, 0.52, 0.05)]);
      /* open gear wells: the mains */
      var my0 = side * 1.58, my1 = side * 2.42, lo = Math.min(my0, my1), hi = Math.max(my0, my1);
      quad(G.tyre, P(9.95, lo, hlo(9.95) - 0.02), P(11.65, lo, hlo(11.65) - 0.02), P(11.65, hi, hlo(11.65) - 0.02),
           P(9.95, hi, hlo(9.95) - 0.02), [0, 0, -1]);
      box(G.metal, XN - 11.70, XN - 9.90, lo - 0.03, lo, hlo(10.8) - 0.10 + ZG, hlo(10.8) - 0.01 + ZG);
      box(G.metal, XN - 11.70, XN - 9.90, hi, hi + 0.03, hlo(10.8) - 0.10 + ZG, hlo(10.8) - 0.01 + ZG);
    }
    /* the nose well */
    quad(G.tyre, P(4.30, -0.30, hlo(4.3) - 0.02), P(5.75, -0.30, hlo(5.75) - 0.02), P(5.75, 0.30, hlo(5.75) - 0.02),
         P(4.30, 0.30, hlo(4.3) - 0.02), [0, 0, -1]);
    /* the platypus's heat tiles: rows across it */
    [16.55, 16.80, 17.05].forEach(function (s0) {
      var h0 = hlo(s0) + lerp(THK, OTK[7], (s0 - 16.35) / 0.85) + 0.012;
      quad(K.ink, P(s0 - 0.02, -0.86, h0), P(s0 + 0.02, -0.86, h0), P(s0 + 0.02, 0.86, h0), P(s0 - 0.02, 0.86, h0), [0, 0, 1]);
    });
    quad(K.ink, P(16.40, -0.02, hlo(16.4) + THK + 0.012), P(17.30, -0.02, hlo(17.3) + OTK[7] + 0.012),
         P(17.30, 0.02, hlo(17.3) + OTK[7] + 0.012), P(16.40, 0.02, hlo(16.4) + THK + 0.012), [0, 0, 1]);
  }

  /* ============================================================== build == */
  function finish(B) {
    var pos = [], nor = [], uv = [], i, j, g;
    for (i = 0; i < B.p.length; i += 9) {
      var a = [B.p[i], B.p[i + 1], B.p[i + 2]], b = [B.p[i + 3], B.p[i + 4], B.p[i + 5]],
          c = [B.p[i + 6], B.p[i + 7], B.p[i + 8]];
      var n = cross(sub(b, a), sub(c, a)), L = Math.sqrt(dot(n, n)) || 1;
      for (j = 0; j < 3; j++) { pos.push(B.p[i + 3 * j], B.p[i + 3 * j + 1], B.p[i + 3 * j + 2]);
                                nor.push(n[0] / L, n[1] / L, n[2] / L); }
    }
    var tris = pos.length / 9;
    if (B.u.length === tris * 6) uv = B.u.slice(); else for (i = 0; i < tris * 6; i++) uv.push(0);
    for (i = 0; i < B.geos.length; i++) {
      g = B.geos[i].index ? B.geos[i].toNonIndexed() : B.geos[i];
      var p = g.attributes.position.array, nn = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(nn[j]); }
      for (j = 0; j < p.length / 3; j++) uv.push(0, 0);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uv, 2));
    return out;
  }
  function emit(parent, lists, mats, order) {
    for (var i = 0; i < order.length; i++) {
      var key = order[i], B = lists[key];
      if (!B || (!B.p.length && !B.geos.length)) continue;
      var geo = finish(B);
      if (key === "skin") projUV(geo);
      parent.add(new V.Mesh(geo, mats[key]));
    }
  }

  function build(THREE, M, C) {
    V = THREE;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    var K = { skin: bag(), team: bag(), hot: bag(), ink: bag(), glass: bag(), grid: bag(), lampR: bag(), lampG: bag(), tape: bag() };
    var G = { skin: bag(), metal: bag(), tyre: bag() };
    addPlate(K);
    addHump(K);
    addCanopy(K);
    addGrids(K);
    addExhaust(K);
    addNose(K);
    addTails(K);
    addBelly(K);
    addFlash(K);
    addPanels(K);
    addGear(G);
    addRedo(K, G);

    var mats = makeMats(C);
    mats.tyre = mats.ink;
    var root = new V.Group();
    emit(root, K, mats, ["skin", "team", "tape", "hot", "ink", "grid", "glass", "lampR", "lampG"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["skin", "metal", "tyre"]);
    root.add(gear);
    return root;
  }

  return { build: build };
})();

/* Both rows are the F-117A (see the header); len is the measured X extent:
   the nose tip to the ruddervator tips. */
UNIT_MODELS["nato_e80_stealthfighter"] = {
  len: 20.08,
  build: function (THREE, M, C) { return HeroF117.build(THREE, M, C); }
};
UNIT_MODELS["nato_e90_stealthfighter"] = {
  len: 20.08,
  build: function (THREE, M, C) { return HeroF117.build(THREE, M, C); }
};
