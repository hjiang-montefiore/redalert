/* ==================== js/hero/ru_kronshtadt.js =========================
   HERO MODEL -- Project 122bis "Kronshtadt" class large submarine chaser
   (bolshoy okhotnik, BO; MPK from 1956), as built 1947-55 and as the
   Polish ships were photographed in the 1950s-60s.  Key (unchanged):
   pact_e50_patrol ("Project 122bis", e50, service 1947, turret:true,
   weapons ["hmg"]).  facts.js: one 85 mm and depth charges, 289 t, crew
   52.  No warship_specs row.
   FULL-QUALITY REDO 2026-10-24: hull lofted from a station table measured
   off the Zawziety profile (sheer rising to a raked, strongly flared stem,
   the low bulwark round the forecastle, the counter stern, the rubbing
   strake); the house re-measured in three steps (deckhouse, faceted
   wheelhouse with its open bridge, after block) with the oval raked funnel;
   the 90-K redrawn as the closed faceted shield of the Gdynia mount; the
   37 mm redrawn as two SINGLE 70-K in tandem aft (the old model drew twin
   mounts); the depth-charge rails, BMB-1 throwers, boat, davits, the pole
   mast with its yards, gaff, DF loop and the radar drum; canvas paint.

   PHOTOGRAPHS FOLLOWED (Wikimedia Commons at width 960):
     [Z] "ORP Zawziety 1953.jpg" - Polish ex-BO-417 (built 1953), starboard
         beam from a little above, 1950s-60s: THE MASTER for the profile.
         Stem 915 px to stern 47 px = 52.24 m, 16.6 px/m; d below = metres
         abaft the stem head.  90-K at d 12; the forecastle bulwark ending
         at d 15; deckhouse d 15.3-31.3; wheelhouse front d 17; after block
         to d 27.7; the funnel d 27.7-31.0 leaning aft; the pole mast at
         d 26 to about 17 m over the deck, yards at 13.8 and 15.7 m, a gaff
         aft; the DF loop abaft the mast; 37 mm shields at d 36.8 and 43.2;
         davit posts at d 35.5 and 45; the depth-charge frame d 47-52.
     [D] "Polski scigacz op proj.122bis dok.jpg" - Polish ship in dock, port
         bow: the broad flared bow with its rim, the anchor high in the
         port bow, the 90-K on the forecastle, the flat-fronted wheelhouse
         with four windows under a roof rim, the 12.7 mm mount on its
         platform before the bridge, the drum radar on the mast.
     [K] "37mm 70-K proj.122bis.jpg" - the two single 70-K in tandem on the
         after deck of a Polish 122bis, flat shields with angled cheeks,
         trained aft; the boat on chocks beside the forward one (port).
     [G] "90-K 85 mm Gdynia.jpg" - a 90-K from a 122bis in the Gdynia naval
         museum: the closed shield with chamfered front corners, two sight
         hoods on the roof, a side door, on a round base.
     [A] "Project122bis-2007-Pashaliman.jpg" - Albanian P 207 (built 1954),
         port quarter, colour, 2007: used for the paint, the scuttles and
         the rubbing strake only (its slotted radar is a later fit and is
         NOT drawn).
   WRITTEN SOURCES: en.wikipedia "Kronshtadt-class submarine chaser" (52.24
   x 6.55 x 2.2 m, 289-302 t standard, three diesels on three shafts; 85 mm
   52-K, 2 x 1 37 mm, six 12.7 mm, two depth-charge rails, two BMB-1 or
   BMB-2; RBU on later ships; radar Guis-1 or Zarya); ru.wikipedia "Malye
   protivolodochnye korabli proekta 122-A": flush-decked with the house
   amidships; the 85 mm 90-K in the bow, two 37 mm 70-K AFT, two stern
   droppers and BMB-1 throwers, THREE 12.7 mm DShK mounts, radar "Gyuys",
   sonar Tamir-10; the first 122bis carried an RBM rocket launcher and the
   last two RBU-1200.
   CORRECTED against the first version: length 52.24 m (was 51.8); the 37 mm
   are two SINGLE 70-K (was twin) at d 36.8/43.2; the 90-K is a closed
   faceted shield on a short barbette (was a generic light shield); the
   house, funnel and mast re-measured off [Z]; the forecastle bulwark, the
   rubbing strake, the boat and davits, the DF loop and the radar drum
   added; the 12.7 mm on the bridge wings removed (no photograph shows
   them there).
   TURRET NODE: the row's first (only) weapon is "hmg", the 12.7 mm.  The
   12.7 mm DShK twin mount on the platform before the wheelhouse ([Z], [D])
   is the group named "turret"; the 90-K is baked, trained forward.

   RECOGNITION LIST (where each shows):
     1. Small flush hull, freeboard about 1.75 m aft and amidships, the sheer
        rising forward to a raked stem 2.7 m high [Z]: table H, ring().
     2. Broad, strongly flared bow with a low bulwark round the forecastle
        ending at d 15, the anchor high in the bow [Z][D]: bulwark(), anchor.
     3. The 90-K closed faceted shield on the forecastle at d 12 [Z][D][G]:
        k90().
     4. The deckhouse d 15.3-31.3 with a gun platform at its forward end
        carrying the 12.7 mm twin mount [Z][D]: house L, "turret".
     5. The faceted wheelhouse with four front windows under a roof rim and
        the open bridge screen above it, the after block to d 27.7 with two
        lifebuoys on each side [Z][D][A]: house B, house C.
     6. The oval funnel abaft the bridge, leaning aft, raked top with a
        dark cap [Z][A]: funnel().
     7. The tall pole mast at d 26 with two yards and a gaff, the DF loop
        abaft it, the radar drum on its forward side [Z][D][A]: mast().
     8. Two single 37 mm 70-K in tandem on the after deck, trained aft
        [Z][K]: k70().
     9. Depth-charge rails and frame over the stern, two BMB-1 throwers on
        the quarters [Z] + en/ru.wikipedia: stern().
    10. The boat on chocks by the forward 37 mm and the davit posts [K][Z].
    11. The rubbing strake low along the side, scuttles forward [A][Z].
    12. Paint: mid grey hull and house, dark grey deck, red-brown boot and
        underbody.  Sampled [A] (sunlit, blue cast): hull 105,125,142 and
        112,127,146, house 91,102,121; the blue cast of the sea light taken
        out and the level taken to about 0.8: hull 0x717a81, house 0x79828a,
        deck 0x4d5357, underbody 0x5a2c24.  [Z] (monochrome) agrees: hull
        darker than the shields and the house front.
   NOT CONFIRMED and therefore not drawn: the RBM / MBU rocket launcher
   (ru.wikipedia puts it on the first 122bis but no photograph here shows
   where); the RBU-1200 of the last ships; the other two 12.7 mm mounts
   (positions not seen); the Tamir sonar dome (retractable); hull numbers,
   names and ensigns.  Approximate: the BMB-1 positions (on the quarters),
   the radar drum's exact height, the propellers (three, generic) and one
   centreline rudder.
   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The
   12.7 mm twin mount is the group named "turret"; everything else is
   baked, one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKronshtadt = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var L = 52.24, X1 = L / 2, SF = 2.0, ZWL = 0.12;
  function X(d) { return X1 - d; }          /* x at d metres abaft the stem head */

  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function tbl(T, d) {
    if (d <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (d <= T[i][0]) {
      var t = (d - T[i - 1][0]) / ((T[i][0] - T[i - 1][0]) || 1);
      t = t * t * (3 - 2 * t) * 0.3 + t * 0.7;      /* eased so the sheer reads as a curve */
      return lerp(T[i - 1][1], T[i][1], t);
    }
    return T[T.length - 1][1];
  }

  /* ------------------------------------------------------------ geometry bins
     one bin per material; UVs box-mapped in metres off the face normal (the
     canvas textures repeat every 8 m) */
  var UVS = 1 / 8;
  function Bin(mat) { this.mat = mat; this.P = []; this.N = []; this.U = []; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f], i;
    var ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      this.P.push(v[i][0], v[i][1], v[i][2]); this.N.push(n[i][0], n[i][1], n[i][2]);
      if (az >= ax && az >= ay) this.U.push(v[i][0] * UVS, v[i][1] * UVS);
      else if (ay >= ax) this.U.push(v[i][0] * UVS, v[i][2] * UVS);
      else this.U.push(v[i][1] * UVS, v[i][2] * UVS);
    }
  };
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      var cc = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(cc, cc) < 1e-12) continue;
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function cyl(bin, A, B, r0, r1, seg) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    base = V.length; na = [-ax[0], -ax[1], -ax[2]];
    V.push(A, B); N.push(na, ax);
    rA = base + 2; rB = base + 2 + seg;
    for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
    for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    solid(bin, V, F, N);
  }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg || 10); }
  /* loft through rings of equal point count, flat fans at both ends (rings convex), faceted */
  function loft(bin, rings) {
    var n = rings[0].length, V = [], F = [], k, r, a, b, c0, c1, Lr;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    for (k = 1; k + 1 < n; k++) F.push([0, k + 1, k]);
    Lr = (rings.length - 1) * n;
    for (k = 1; k + 1 < n; k++) F.push([Lr, Lr + k, Lr + k + 1]);
    solid(bin, V, F);
  }
  /* a thin plate standing proud of a planar face given by its 4 corners, offset along the face normal */
  function plate(bin, Q, t0, t1) {
    var n = unit(cross(sub(Q[1], Q[0]), sub(Q[3], Q[0]))), V = [], k, o;
    for (o = 0; o < 2; o++) for (k = 0; k < 4; k++) {
      var tt = o ? t1 : t0;
      V.push([Q[k][0] + n[0] * tt, Q[k][1] + n[1] * tt, Q[k][2] + n[2] * tt]);
    }
    solid(bin, V, HEXF);
  }
  /* a thin vertical wall between plan points a and b ([x,y]) from z0 to z1, t thick */
  function wall(bin, a, b, z0, z1, t) {
    var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy) || 1, nx = -dy / l * t / 2, ny = dx / l * t / 2;
    hexa(bin, [[a[0] - nx, a[1] - ny, z0], [b[0] - nx, b[1] - ny, z0], [b[0] + nx, b[1] + ny, z0], [a[0] + nx, a[1] + ny, z0],
               [a[0] - nx, a[1] - ny, z1], [b[0] - nx, b[1] - ny, z1], [b[0] + nx, b[1] + ny, z1], [a[0] + nx, a[1] + ny, z1]]);
  }
  /* a ring (torus) of seg straight pieces in the plane through c spanned by u and v */
  function hoop(bin, c, u, v, R, r, seg) {
    var i, p = [];
    for (i = 0; i <= seg; i++) {
      var a = i / seg * TAU, ca = Math.cos(a) * R, sa = Math.sin(a) * R;
      p.push([c[0] + u[0] * ca + v[0] * sa, c[1] + u[1] * ca + v[1] * sa, c[2] + u[2] * ca + v[2] * sa]);
    }
    for (i = 0; i < seg; i++) cyl(bin, p[i], p[i + 1], r, r, 4);
  }
  function earcut2(P) {          /* ear clipping of a simple polygon given as [y,z]; returns index triples */
    var idx = [], out = [], i, n, guard = 0, area = 0;
    for (i = 0; i < P.length; i++) { idx.push(i); var j = (i + 1) % P.length; area += P[i][0] * P[j][1] - P[j][0] * P[i][1]; }
    var sgn = area > 0 ? 1 : -1;
    function cr(a, b, c) { return ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) * sgn; }
    function inside(p, a, b, c) { return cr(a, b, p) > 0 && cr(b, c, p) > 0 && cr(c, a, p) > 0; }
    while (idx.length > 3 && guard++ < 4000) {
      n = idx.length;
      for (i = 0; i < n; i++) {
        var a = P[idx[(i + n - 1) % n]], b = P[idx[i]], c = P[idx[(i + 1) % n]];
        if (cr(a, b, c) <= 1e-9) continue;
        var ok = true;
        for (var k = 0; k < n && ok; k++) {
          var q = idx[k];
          if (q === idx[(i + n - 1) % n] || q === idx[i] || q === idx[(i + 1) % n]) continue;
          if (inside(P[q], a, b, c)) ok = false;
        }
        if (!ok) continue;
        out.push([idx[(i + n - 1) % n], idx[i], idx[(i + 1) % n]]);
        idx.splice(i, 1);
        break;
      }
      if (i === n) idx.splice(0, 1);               /* degenerate: drop a point */
    }
    if (idx.length === 3) out.push([idx[0], idx[1], idx[2]]);
    return out;
  }
  function flush(THREE, group, B) {
    var k, b, geo, me;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      me = new THREE.Mesh(geo, b.mat); me.castShadow = true; me.receiveShadow = true;
      group.add(me);
    }
  }

  /* ------------------------------------------------------------ canvas paint */
  var TEX = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function canvasTex(THREE, key, draw) {
    if (TEX[key]) return TEX[key];
    if (typeof document === "undefined" || !document.createElement) return null;
    var cv = document.createElement("canvas"); cv.width = 512; cv.height = 512;
    var g = cv.getContext && cv.getContext("2d");
    if (!g) return null;
    draw(g, 512);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    TEX[key] = t;
    return t;
  }
  /* welded plating, 8 m square: strakes every 1.2 m, butts staggered every 2.7 m, weld beads, rust runs
     and faint weathering, as the hull of [A] shows */
  function drawPlate(g, S) {
    var R = rng(1220), i, k, m = S / 8;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 80; i++) {
      g.globalAlpha = 0.02 + R() * 0.04; g.fillStyle = R() < 0.55 ? "#7d878d" : "#ffffff";
      g.fillRect(R() * S, R() * S, (0.5 + R() * 2.2) * m, (0.2 + R() * 0.6) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 7; k++) {
      var y = Math.round(k * 1.2 * m);
      g.fillStyle = "rgba(55,62,68,0.30)"; g.fillRect(0, y, S, 2);
      g.fillStyle = "rgba(255,255,255,0.28)"; g.fillRect(0, y + 2, S, 1);
      for (i = 0; i < 3; i++) { var x = Math.round(((i * 2.7 + (k % 2) * 1.35) % 8) * m); g.fillStyle = "rgba(55,62,68,0.22)"; g.fillRect(x, y, 2, 1.2 * m); }
    }
    for (i = 0; i < 26; i++) {
      g.globalAlpha = 0.05 + R() * 0.07; g.fillStyle = "#6a4232";
      g.fillRect(R() * S, R() * S, 0.05 * m, (0.3 + R() * 0.9) * m);
    }
    g.globalAlpha = 1;
  }
  /* deck: welded plates 1.5 x 4 m, seams, faded paint and scuffing */
  function drawDeck(g, S) {
    var R = rng(1947), i, j, m = S / 8;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 2; i++) for (j = 0; j < 6; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(i * 4 * m + 2, j * 1.5 * m + 2, 4 * m - 4, 1.5 * m - 4);
    }
    g.fillStyle = "rgba(30,32,34,0.35)";
    for (i = 0; i <= 2; i++) g.fillRect(Math.round(i * 4 * m) - 1, 0, 2, S);
    for (j = 0; j <= 6; j++) g.fillRect(0, Math.round(j * 1.5 * m) - 1, S, 2);
    for (i = 0; i < 40; i++) {
      g.globalAlpha = 0.04 + R() * 0.05; g.fillStyle = R() < 0.5 ? "#000000" : "#ffffff";
      g.fillRect(R() * S, R() * S, (0.3 + R()) * m, (0.05 + R() * 0.2) * m);
    }
    g.globalAlpha = 1;
  }

  function materials(THREE, C) {
    var plateT = canvasTex(THREE, "plate", drawPlate), deckT = canvasTex(THREE, "deck", drawDeck);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(0x717a81, 0.84, 0.07, plateT),     /* hull sides, transom, bulwark */
      sup: mk(0x79828a, 0.84, 0.06, plateT),      /* house, funnel, mounts, boat */
      under: mk(0x5a2c24, 0.88, 0.04, plateT),    /* red-brown boot and underbody */
      deck: mk(0x4d5357, 0.95, 0.04, deckT),      /* dark grey deck and roofs */
      dark: mk(0x222528, 0.78, 0.3),              /* funnel cap, openings, doors, gun slots */
      metal: mk(0x50575c, 0.5, 0.55),             /* rails, mast, guns, racks, props */
      glass: mk(0x16202a, 0.15, 0.4),
      white: mk(0xc4c6c2, 0.7, 0.02),             /* lifebuoys */
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }

  /* ------------------------------------------------------------ hull station table, d metres abaft the stem
     head.  ZD deck edge (off [Z] at 16.6 px/m: 1.74-1.85 m aft and amidships, rising to 2.7 m at the stem);
     HD / HW half-breadths at the deck edge and the waterline (6.55 m beam, 6.1 m at the water, the flare of
     [D]); KL the keel line (2.05 m hull draught, the cut-up forefoot, the counter stern of [Z] clear of the
     water); NB bilge fullness (super-ellipse power); PF flare power above the water (over 1 = flared). */
  var H = {
    ZD: [[0, 2.62], [1.5, 2.50], [4, 2.32], [8, 2.13], [12, 2.02], [16, 1.95], [22, 1.90], [32, 1.88], [42, 1.88], [48, 1.90], [L, 1.95]],
    HD: [[0, 0.55], [0.6, 1.15], [1.5, 1.65], [3, 2.15], [5, 2.55], [8.5, 2.93], [12, 3.12], [16, 3.23], [20, 3.275], [36, 3.275], [42, 3.21], [46, 3.07], [49.5, 2.8], [L, 2.36]],
    HW: [[2.0, 0.03], [3.5, 0.52], [6, 1.18], [9, 1.8], [13, 2.42], [17, 2.84], [22, 3.05], [36, 3.05], [42, 2.95], [46, 2.76], [49.5, 2.42], [L, 2.08]],
    KL: [[2.0, 0.12], [3.0, -0.55], [4.5, -1.05], [7, -1.52], [10, -1.82], [15, -1.98], [30, -2.05], [40, -2.0], [44, -1.75], [47, -1.25], [50, -0.45], [L, 0.35]],
    NB: [[0, 1.3], [6, 1.6], [12, 2.2], [20, 2.7], [38, 2.7], [46, 3.0], [L, 3.4]],
    PF: [[0, 1.5], [2, 1.7], [5, 1.9], [10, 1.55], [18, 1.05], [L, 1.0]]
  };
  function zD(d) { return tbl(H.ZD, d); }
  function hD(d) { return tbl(H.HD, d); }
  function zBot(d) { return d < SF ? ZWL + (H.ZD[0][1] - ZWL) * Math.pow(clamp01(1 - d / SF), 1.15) : tbl(H.KL, d); }
  function zWat(d) { return Math.min(Math.max(ZWL, zBot(d)), zD(d) - 0.05); }
  function hullY(d, z) {
    var zd = zD(d), hd = hD(d), zb = zBot(d), zw = zWat(d);
    if (z >= zd) return hd;
    if (d < SF) return hd * Math.pow(clamp01((z - zb) / Math.max(zd - zb, 0.01)), tbl(H.PF, d));
    var hw = tbl(H.HW, d), pf = tbl(H.PF, d);
    if (z >= zw) return hw + (hd - hw) * Math.pow(clamp01((z - zw) / Math.max(zd - zw, 0.01)), pf);
    var n = tbl(H.NB, d), t = clamp01((zw - z) / Math.max(zw - zb, 0.01));
    return hw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
  }
  var NA = 5, NBt = 7;
  function ring(d) {
    var x = X(d), zd = zD(d), zb = zBot(d), zw = zWat(d), half = [], P = [], i, z, k;
    for (i = 0; i <= NA; i++) { z = zd + (zw - zd) * i / NA; half.push([hullY(d, z), z]); }
    for (i = 1; i <= NBt; i++) { z = zw + (zb - zw) * i / NBt; half.push([Math.max(0.015, hullY(d, z)), z]); }
    P.push([x, 0, zd + 0.07 * clamp01(hD(d) / 1.5)]);
    for (k = 0; k < half.length; k++) P.push([x, half[k][0], half[k][1]]);
    for (k = half.length - 1; k >= 0; k--) P.push([x, -half[k][0], half[k][1]]);
    return P;
  }
  function addHull(B) {
    var ds = [0, 0.25, 0.6, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.2, 6.0, 7.0, 8.0, 9.0, 10.0, 11.5, 13, 14.5, 16, 18, 20,
              23, 26, 29, 32, 35, 38, 40.5, 42.5, 44.5, 46, 47.2, 48.4, 49.5, 50.5, 51.3, 51.9, L], i, k;
    var R = ds.map(ring), NR = R[0].length;
    for (i = 0; i + 1 < R.length; i++) {
      var A = R[i], Bq = R[i + 1];
      for (k = 0; k < NR; k++) {
        var j = (k + 1) % NR, p = A[k], q = A[j], r = Bq[j], s = Bq[k], bin;
        if (k === 0 || k === NR - 1) bin = B.deck;
        else bin = (p[2] + q[2] + r[2] + s[2]) / 4 > ZWL - 0.005 ? B.hull : B.under;
        var c1 = cross(sub(q, p), sub(r, p));
        if (dot(c1, c1) > 1e-12) bin.tri(p, q, r);
        var c2 = cross(sub(r, p), sub(s, p));
        if (dot(c2, c2) > 1e-12) bin.tri(p, r, s);
      }
    }
    /* transom: the last ring, ear-clipped (all of it above the water: the counter of [Z]) */
    var T = R[R.length - 1], xt = T[0][0], P2 = T.map(function (p) { return [p[1], p[2]]; });
    earcut2(P2).forEach(function (t) {
      var a = [xt, P2[t[0]][0], P2[t[0]][1]], b = [xt, P2[t[1]][0], P2[t[1]][1]], c = [xt, P2[t[2]][0], P2[t[2]][1]];
      var cc = cross(sub(b, a), sub(c, a));
      if (dot(cc, cc) < 1e-12) return;
      if (cc[0] < 0) B.hull.tri(a, b, c); else B.hull.tri(a, c, b);
    });
  }
  /* a band laid on the hull side between heights zlo(d)..zhi(d), standing out by `out` */
  function band(bin, d0, d1, zlo, zhi, out, step) {
    var d, s, st = step || 1.0;
    for (s = -1; s <= 1; s += 2) for (d = d0; d < d1 - 0.01; d += st) {
      var dn = Math.min(d + st, d1), za0 = zlo(d), zb0 = zhi(d), za1 = zlo(dn), zb1 = zhi(dn);
      var ya0 = hullY(d, za0), yb0 = hullY(d, zb0), ya1 = hullY(dn, za1), yb1 = hullY(dn, zb1);
      hexa(bin, [[X(d), s * (ya0 - 0.01), za0], [X(dn), s * (ya1 - 0.01), za1], [X(dn), s * (ya1 + out), za1], [X(d), s * (ya0 + out), za0],
                 [X(d), s * (yb0 - 0.01), zb0], [X(dn), s * (yb1 - 0.01), zb1], [X(dn), s * (yb1 + out), zb1], [X(d), s * (yb0 + out), zb0]]);
    }
  }
  /* the low bulwark round the forecastle, stem to d 15, its top a light capping bar [Z][D] */
  function bulwark(B) {
    var d, s, st = 1.0;
    function hb(dd) { return 0.30 + 0.16 * clamp01(1 - dd / 15); }
    for (s = -1; s <= 1; s += 2) for (d = 0.12; d < 15 - 0.01; d = dn) {
      var dn = Math.min(d + (d < 4 ? 0.5 : st), 15), y0 = hD(d), y1 = hD(dn), z0 = zD(d), z1 = zD(dn);
      hexa(B.hull, [[X(d), s * (y0 - 0.05), z0 - 0.02], [X(dn), s * (y1 - 0.05), z1 - 0.02], [X(dn), s * (y1 + 0.01), z1 - 0.02], [X(d), s * (y0 + 0.01), z0 - 0.02],
                    [X(d), s * (y0 - 0.05), z0 + hb(d)], [X(dn), s * (y1 - 0.05), z1 + hb(dn)], [X(dn), s * (y1 + 0.01), z1 + hb(dn)], [X(d), s * (y0 + 0.01), z0 + hb(d)]]);
      hexa(B.sup, [[X(d), s * (y0 - 0.08), z0 + hb(d)], [X(dn), s * (y1 - 0.08), z1 + hb(dn)], [X(dn), s * (y1 + 0.03), z1 + hb(dn)], [X(d), s * (y0 + 0.03), z0 + hb(d)],
                   [X(d), s * (y0 - 0.08), z0 + hb(d) + 0.05], [X(dn), s * (y1 - 0.08), z1 + hb(dn) + 0.05], [X(dn), s * (y1 + 0.03), z1 + hb(dn) + 0.05], [X(d), s * (y0 + 0.03), z0 + hb(d) + 0.05]]);
    }
    /* the break at d 15 */
    for (s = -1; s <= 1; s += 2) box(B.hull, X(15.05), X(14.95), s * hD(15) - 0.06, s * hD(15) + 0.06, zD(15) - 0.02, zD(15) + 0.3);
  }
  /* lifelines: stanchions along both deck edges and two wires, from da to db, skipping where skip(d) */
  function rails(B, da, db, h, inset, skip) {
    var s, d, hh = h || 0.9, st = 2.1;
    for (s = -1; s <= 1; s += 2) {
      for (d = da; d < db - 0.01; d += st) {
        var dn = Math.min(d + st, db), y0 = s * (hD(d) - inset), y1 = s * (hD(dn) - inset);
        if (skip && skip(d)) continue;
        var z0 = zD(d), z1 = zD(dn);
        cyl(B.metal, [X(d), y0, z0 + hh], [X(dn), y1, z1 + hh], 0.017, 0.017, 3);
        cyl(B.metal, [X(d), y0, z0 + hh * 0.5], [X(dn), y1, z1 + hh * 0.5], 0.013, 0.013, 3);
        box(B.metal, X(d) - 0.022, X(d) + 0.022, y0 - 0.022, y0 + 0.022, z0, z0 + hh);
      }
      box(B.metal, X(db) - 0.022, X(db) + 0.022, s * (hD(db) - inset) - 0.022, s * (hD(db) - inset) + 0.022, zD(db), zD(db) + hh);
    }
  }
  /* rails round a roof edge given as a plan polyline of [d, y] */
  function roofRail(B, pts, z, h) {
    var i, k;
    for (i = 0; i + 1 < pts.length; i++) {
      var a = pts[i], b = pts[i + 1], l = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(l / 1.4));
      for (k = 0; k <= n; k++) {
        if (i > 0 && k === 0) continue;
        var dd = lerp(a[0], b[0], k / n), yy = lerp(a[1], b[1], k / n);
        box(B.metal, X(dd) - 0.02, X(dd) + 0.02, yy - 0.02, yy + 0.02, z, z + h);
      }
      cyl(B.metal, [X(a[0]), a[1], z + h], [X(b[0]), b[1], z + h], 0.016, 0.016, 3);
      cyl(B.metal, [X(a[0]), a[1], z + h * 0.5], [X(b[0]), b[1], z + h * 0.5], 0.012, 0.012, 3);
    }
  }
  function mushroom(B, d, y) {
    var z = zD(d);
    cylZ(B.sup, X(d), y, z - 0.02, z + 0.55, 0.13, 10);
    cyl(B.sup, [X(d), y, z + 0.55], [X(d), y, z + 0.72], 0.3, 0.22, 12);
  }
  function bitts(B, d, y) {
    var z = zD(d);
    cylZ(B.metal, X(d) + 0.18, y, z - 0.02, z + 0.32, 0.08, 8);
    cylZ(B.metal, X(d) - 0.18, y, z - 0.02, z + 0.32, 0.08, 8);
    box(B.metal, X(d) - 0.28, X(d) + 0.28, y - 0.12, y + 0.12, z - 0.02, z + 0.05);
  }

  /* ------------------------------------------------------------ superstructure, absolute heights.
     House L (deckhouse) d 15.3-31.3 to RL; house B (wheelhouse) d 17.0-24.6 and house C (after block)
     d 24.6-27.7 to RB; open-bridge screen to RB + 0.95.  Off [Z] (16.6 px/m, from a little above) and [D]. */
  var RL = 4.1, RB = 6.35;
  function P3(p, z) { return [X(p[0]), p[1], z]; }
  function houseRing(plan, zf) { return plan.map(function (p) { return P3(p, typeof zf === "function" ? zf(p[0]) : zf); }); }
  /* point on a plan edge a->b (plan points [d, y]) at fraction u, height z */
  function onEdge(a, b, u, z) { return [X(lerp(a[0], b[0], u)), lerp(a[1], b[1], u), z]; }
  function facePanel(bin, a, b, u0, u1, z0, z1, t0, t1) {
    plate(bin, [onEdge(a, b, u0, z0), onEdge(a, b, u1, z0), onEdge(a, b, u1, z1), onEdge(a, b, u0, z1)], t0, t1);
  }
  function scuttle(B, x, y, z, s, rim) {
    cylY(B.dark, x, y - 0.02 * s, y + 0.025 * s, z, 0.13, 8);
    if (rim) cylY(B.metal, x, y - 0.01 * s, y + 0.035 * s, z, 0.155, 6);
  }

  function addHouses(B) {
    var s, i, d;
    function zb(dd) { return zD(dd) - 0.05; }
    /* ---- house L: chamfered front, portholes, doors, a platform on its forward end */
    var PL = [[15.3, 1.3], [16.3, 2.2], [31.3, 2.2], [31.3, -2.2], [16.3, -2.2], [15.3, -1.3]];
    loft(B.sup, [houseRing(PL, zb), houseRing(PL, RL)]);
    box(B.deck, X(31.25), X(16.35), -2.15, 2.15, RL, RL + 0.015);
    box(B.deck, X(16.35), X(15.4), -1.3, 1.3, RL, RL + 0.015);
    for (s = -1; s <= 1; s += 2) {
      [17.6, 18.9, 23.5, 24.8, 26.1, 30.3].forEach(function (dd) { scuttle(B, X(dd), s * 2.2, 3.0, s); });
      [[21.0, 22.0], [27.6, 28.6]].forEach(function (dr) {     /* doors */
        box(B.dark, X(dr[1]), X(dr[0]), s * 2.2 - 0.03, s * 2.2 + 0.03, zb(dr[0]) + 0.25, zb(dr[0]) + 1.95);
        box(B.sup, X(dr[1]) - 0.05, X(dr[0]) + 0.05, s * 2.2 - 0.02, s * 2.2 + 0.05, zb(dr[0]) + 1.95, zb(dr[0]) + 2.05);
      });
    }
    /* the front of house L: two portholes on each chamfer, one in the middle */
    for (s = -1; s <= 1; s += 2) facePanel(B.dark, [15.3, s * 1.3], [16.3, s * 2.2], 0.35, 0.65, 2.8, 3.15, -0.01, 0.03);
    plate(B.dark, [[X(15.3), 0.25, 2.75], [X(15.3), -0.25, 2.75], [X(15.3), -0.25, 3.25], [X(15.3), 0.25, 3.25]], -0.01, 0.03);
    /* rails round the gun platform at the forward end of house L ([Z][D]) */
    roofRail(B, [[17.0, 1.75], [16.3, 2.15], [15.35, 1.28], [15.35, -1.28], [16.3, -2.15], [17.0, -1.75]], RL, 0.9);

    /* ---- house B: faceted wheelhouse, four front windows, roof rim [D] */
    var PB = [[17.0, 1.05], [17.7, 1.75], [24.6, 1.75], [24.6, -1.75], [17.7, -1.75], [17.0, -1.05]];
    loft(B.sup, [houseRing(PB, RL - 0.02), houseRing(PB, RB)]);
    var PBr = [[16.86, 1.1], [17.62, 1.88], [24.7, 1.88], [24.7, -1.88], [17.62, -1.88], [16.86, -1.1]];
    loft(B.sup, [houseRing(PBr, RB), houseRing(PBr, RB + 0.1)]);
    box(B.deck, X(24.6), X(17.8), -1.8, 1.8, RB + 0.1, RB + 0.115);
    /* front windows: two on the centre facet, one on each chamfer, with eyebrows */
    var fc0 = [17.0, 1.05], fc1 = [17.0, -1.05];
    facePanel(B.glass, fc0, fc1, 0.12, 0.42, 5.15, 5.6, -0.01, 0.025);
    facePanel(B.glass, fc0, fc1, 0.58, 0.88, 5.15, 5.6, -0.01, 0.025);
    facePanel(B.sup, fc0, fc1, 0.08, 0.92, 5.66, 5.72, -0.01, 0.1);
    for (s = -1; s <= 1; s += 2) {
      var ca = [17.0, s * 1.05], cb = [17.7, s * 1.75];
      facePanel(B.glass, ca, cb, 0.22, 0.78, 5.15, 5.6, -0.01, 0.025);
      facePanel(B.sup, ca, cb, 0.15, 0.85, 5.66, 5.72, -0.01, 0.1);
      facePanel(B.dark, ca, cb, 0.35, 0.65, 4.45, 4.75, -0.01, 0.03);
      /* side: portholes, a door, the side light box on its bracket [D] */
      [18.6, 19.9, 21.2].forEach(function (dd) { scuttle(B, X(dd), s * 1.75, 5.3, s); });
      box(B.dark, X(23.5), X(22.6), s * 1.75 - 0.03, s * 1.75 + 0.03, RL + 0.1, RL + 1.85);
      box(B.sup, X(18.3), X(17.8), s * 1.78, s * 2.05, 5.0, 5.45);
      box(B.metal, X(18.2), X(17.9), s * 1.76, s * 1.85, 4.7, 5.0);
    }
    /* open-bridge screen round the forward part of the roof, the windscreen lip, the compass binnacle */
    var zs0 = RB + 0.1, zs1 = RB + 1.0;
    wall(B.sup, P2d(fc0), P2d(fc1), zs0, zs1, 0.06);
    for (s = -1; s <= 1; s += 2) {
      wall(B.sup, P2d([16.88, s * 1.08]), P2d([17.62, s * 1.86]), zs0, zs1, 0.06);
      wall(B.sup, P2d([17.62, s * 1.86]), P2d([22.0, s * 1.86]), zs0, zs1, 0.06);
    }
    wall(B.metal, P2d([16.86, 0.95]), P2d([16.86, -0.95]), zs1, zs1 + 0.22, 0.03);
    cylZ(B.sup, X(18.4), 0, zs0, zs0 + 0.95, 0.16, 10);
    cylZ(B.metal, X(18.4), 0, zs0 + 0.95, zs0 + 1.15, 0.2, 10);
    /* ---- house C: the after block under the mast, lifebuoys on its sides [Z][A] */
    var PC = [[24.6, 1.6], [27.7, 1.6], [27.7, -1.6], [24.6, -1.6]];
    loft(B.sup, [houseRing(PC, RL - 0.02), houseRing(PC, RB)]);
    box(B.deck, X(27.65), X(24.65), -1.55, 1.55, RB, RB + 0.015);
    for (s = -1; s <= 1; s += 2) {
      [25.4, 26.7].forEach(function (dd) {
        cylY(B.white, X(dd), s * 1.58, s * 1.68, 5.0, 0.34, 16);
        cylY(B.sup, X(dd), s * 1.6, s * 1.7, 5.0, 0.19, 12);
      });
      box(B.dark, X(27.5), X(27.0), s * 1.6 - 0.03, s * 1.6 + 0.03, RL + 0.1, RL + 1.75);
      /* ladders from the deckhouse roof up the after block */
      for (i = 0; i < 6; i++) box(B.metal, X(27.75) - 0.04, X(27.75) + 0.02, s * 0.9 - 0.25, s * 0.9 + 0.25, RL + 0.3 + i * 0.32, RL + 0.33 + i * 0.32);
    }
    roofRail(B, [[22.0, 1.8], [24.6, 1.8], [24.6, 1.55], [27.65, 1.55], [27.65, -1.55], [24.6, -1.55], [24.6, -1.8], [22.0, -1.8]], RB + 0.1, 0.9);
    void d;
  }
  function P2d(p) { return [X(p[0]), p[1]]; }

  /* the oval funnel d 27.7-31.0 on the deckhouse, leaning aft, top raked down aft, a dark cap [Z][A] */
  function funnel(B) {
    var dc = 29.6, a = 1.42, b = 1.2, N = 22, lean = 0.12;
    function rng2(z, ztf, zta, sc, cut) {
      var r = [], k;
      for (k = 0; k < N; k++) {
        var t = k / N * TAU, c = Math.cos(t), s = Math.sin(t);
        var lx = a * sc * c, ly = b * sc * s, zz = cut ? lerp(zta, ztf, (lx / a + 1) / 2) : z;
        r.push([X(dc) + lx - lean * (zz - RL), ly, zz]);
      }
      return r;
    }
    var zf = 6.7, za = 6.1;
    loft(B.sup, [rng2(RL - 0.03, 0, 0, 1.0, false), rng2(0, zf - 0.32, za - 0.32, 1.0, true)]);
    loft(B.dark, [rng2(0, zf - 0.32, za - 0.32, 1.012, true), rng2(0, zf, za, 1.012, true)]);
    /* the forward steam pipe and the siren */
    cyl(B.metal, [X(dc) + a + 0.08, 0.35, RL], [X(dc) + a + 0.08 - lean * 2.6, 0.35, zf + 0.25], 0.07, 0.07, 8);
    cylZ(B.metal, X(dc) + a - 0.02, -0.3, zf - 0.05, zf + 0.25, 0.09, 8);
  }

  /* the pole mast at d 26 from the after block roof to about 17 m over the deck: two yards, a gaff aft,
     shrouds; the radar drum on its forward side [D]; the DF loop abaft it [Z][A] */
  function mast(B) {
    var x0 = X(26.0), zt = 18.9, s, rk = 0.065;
    function mx(z) { return x0 - (z - RB) * rk; }             /* the mast rakes aft about 4 deg [Z] */
    cyl(B.metal, [x0, 0, RB], [mx(15.6), 0, 15.6], 0.13, 0.09, 10);
    cyl(B.metal, [mx(15.6), 0, 15.6], [mx(zt), 0, zt], 0.07, 0.035, 8);
    box(B.metal, mx(15.52) - 0.05, mx(15.52) + 0.05, -2.05, 2.05, 15.48, 15.56);   /* lower yard */
    box(B.metal, mx(17.45) - 0.04, mx(17.45) + 0.04, -0.85, 0.85, 17.42, 17.48);  /* upper yard */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [mx(15.0), 0, 15.0], [mx(15.5), s * 1.6, 15.5], 0.015, 0.015, 3);
      cyl(B.metal, [mx(14.6), 0, 14.6], [X(26.2), s * 1.5, RB + 0.1], 0.012, 0.012, 3);  /* shrouds */
      cyl(B.metal, [mx(14.6), 0, 14.6], [X(27.5), s * 1.5, RB + 0.1], 0.012, 0.012, 3);
      cylZ(B.metal, mx(15.4), s * 1.95, 15.3, 15.48, 0.03, 4);                       /* yard-arm lamps */
    }
    /* gaff, rising aft */
    cyl(B.metal, [mx(12.0) - 0.05, 0, 12.0], [X(28.9), 0, 13.3], 0.04, 0.03, 5);
    cyl(B.metal, [mx(14.6), 0, 14.6], [X(28.9), 0, 13.3], 0.01, 0.01, 3);
    cylZ(B.metal, mx(zt), 0, zt, zt + 0.12, 0.08, 8);
    /* stays to the stem and the stern */
    cyl(B.metal, [mx(17.0), 0, 17.0], [X(0.4), 0, zD(0.4) + 3.2], 0.009, 0.009, 3);
    cyl(B.metal, [mx(16.6), 0, 16.6], [X(L - 0.3), 0, zD(L - 0.3) + 3.4], 0.009, 0.009, 3);
    /* the radar drum: a bracket, a cone and a drum with a flat lid [D] */
    var zr = RB + 2.3, xm = mx(zr - 0.55), xr = xm + 0.75;
    box(B.metal, xm, xr, -0.06, 0.06, zr - 0.6, zr - 0.5);
    cylZ(B.metal, xr, 0, zr - 0.6, zr - 0.3, 0.14, 8);
    cyl(B.sup, [xr, 0, zr - 0.3], [xr, 0, zr], 0.16, 0.56, 16);
    cylZ(B.sup, xr, 0, zr, zr + 0.72, 0.56, 16);
    cylZ(B.dark, xr, 0, zr + 0.3, zr + 0.36, 0.57, 16);
    cylZ(B.sup, xr, 0, zr + 0.72, zr + 0.8, 0.62, 16);
    /* the DF loop on its post abaft the mast */
    var xl = X(27.3);
    cylZ(B.metal, xl, 0, RB, RB + 2.0, 0.05, 6);
    hoop(B.metal, [xl, 0, RB + 2.45], [1, 0, 0], [0, 0, 1], 0.42, 0.03, 14);
    /* masthead lantern and whip aerials on the after block */
    cylZ(B.glass, mx(16.15), 0, 16.0, 16.3, 0.09, 8);
    for (s = -1; s <= 1; s += 2) cyl(B.metal, [X(25.0), s * 1.45, RB], [X(25.2), s * 1.7, RB + 6.5], 0.025, 0.01, 4);
  }

  /* ------------------------------------------------------------ guns
     90-K on the forecastle at d 12: a short barbette, the closed faceted shield of [G], the gun trained
     forward, two sight hoods on the roof, a door each side [Z][D][G] */
  function k90(B, d) {
    var x = X(d), zd = zD(d), z0 = zd + 0.55, z1 = z0 + 0.22, z2 = z1 + 1.72, s;
    cylZ(B.sup, x, 0, zd - 0.05, z0, 1.28, 28);
    cylZ(B.dark, x, 0, z0 - 0.04, z0, 1.3, 28);
    cylZ(B.metal, x, 0, z0, z1, 1.08, 24);
    var Pl = [[1.25, 0.72], [0.95, 1.12], [-1.2, 1.12], [-1.45, 0.88], [-1.45, -0.88], [-1.2, -1.12], [0.95, -1.12], [1.25, -0.72]];
    var Pu = Pl.map(function (p) { return [p[0] - (p[0] > 0 ? 0.08 : 0), p[1] * 0.97]; });
    loft(B.sup, [Pl.map(function (p) { return [x + p[0], p[1], z1]; }), Pu.map(function (p) { return [x + p[0], p[1], z2]; })]);
    /* gun slot and mantlet in the front face */
    plate(B.dark, [[x + 1.252, 0.24, z1 + 0.45], [x + 1.252, -0.24, z1 + 0.45], [x + 1.18, -0.24, z2 - 0.2], [x + 1.18, 0.24, z2 - 0.2]], -0.01, 0.03);
    var zg = z1 + 0.9;
    cylX(B.metal, x + 1.0, x + 1.75, 0, zg, 0.15, 0.13, 14);
    cylX(B.metal, x + 1.75, x + 4.45, 0, zg, 0.075, 0.06, 12);
    cylX(B.metal, x + 4.45, x + 4.65, 0, zg, 0.08, 0.08, 12);
    /* roof: sight hoods at the front corners [G], a hatch, the rear overhang */
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.sup, x + 0.55, s * 0.72, z2 - 0.02, z2 + 0.2, 0.2, 12);
      cyl(B.glass, [x + 0.7, s * 0.72, z2 + 0.1], [x + 0.77, s * 0.72, z2 + 0.1], 0.1, 0.1, 10);
      box(B.dark, x - 0.9, x - 0.1, s * 1.12 - 0.03, s * 1.12 + 0.03, z1 + 0.2, z1 + 1.45);       /* side doors [G] */
      box(B.metal, x - 0.75, x - 0.25, s * 1.12 - 0.02, s * 1.12 + 0.06, z1 + 0.78, z1 + 0.84);
    }
    cylZ(B.team, x - 0.6, 0, z2 - 0.01, z2 + 0.04, 0.32, 14);
    box(B.sup, x - 1.4, x - 1.1, -0.6, 0.6, z2 - 0.04, z2 + 0.08);
  }
  /* single 37 mm 70-K: round platform, pedestal, the flat shield with angled cheeks, a single barrel
     elevated 20 deg, the clip guide on top, two seats; trained aft [K] */
  function k70(B, d) {
    var x = X(d), zd = zD(d), z0 = zd + 0.45, sgn = -1, s;
    cylZ(B.sup, x, 0, zd - 0.03, z0, 0.85, 20);
    cylZ(B.metal, x, 0, z0, z0 + 0.65, 0.28, 12);
    box(B.metal, x - 0.45, x + 0.45, -0.32, 0.32, z0 + 0.6, z0 + 0.95);
    /* shield: front plate 1.55 wide, 1.45 tall, cheeks turned back at 35 deg [K] */
    var xs = x + sgn * 0.45, zs0 = z0 + 0.45, zs1 = z0 + 1.9;
    wall(B.sup, [xs, 0.55], [xs, -0.55], zs0, zs1, 0.05);
    for (s = -1; s <= 1; s += 2) wall(B.sup, [xs, s * 0.55], [xs - sgn * 0.7, s * 0.85], zs0, zs1 - 0.15, 0.05);
    plate(B.dark, [[xs + sgn * 0.03, 0.12, z0 + 1.05], [xs + sgn * 0.03, -0.12, z0 + 1.05], [xs + sgn * 0.03, -0.12, z0 + 1.45], [xs + sgn * 0.03, 0.12, z0 + 1.45]], 0, 0.01);
    var el = 0.35, ce = Math.cos(el), se = Math.sin(el), zg = z0 + 1.2, xb = x + sgn * 0.1;
    cyl(B.metal, [xb - sgn * 0.6, 0, zg - 0.6 * se], [xb + sgn * 0.6 * ce, 0, zg + 0.6 * se], 0.11, 0.11, 10);
    cyl(B.metal, [xb + sgn * 0.6 * ce, 0, zg + 0.6 * se], [xb + sgn * 2.7 * ce, 0, zg + 2.7 * se], 0.045, 0.04, 8);
    cyl(B.dark, [xb + sgn * 2.55 * ce, 0, zg + 2.55 * se], [xb + sgn * 2.85 * ce, 0, zg + 2.85 * se], 0.06, 0.07, 8);
    box(B.metal, x - 0.18, x + 0.18, -0.07, 0.07, zg + 0.2, zg + 0.7);          /* clip guide */
    for (s = -1; s <= 1; s += 2) {
      box(B.metal, x - sgn * 0.35 - 0.15, x - sgn * 0.35 + 0.15, s * 0.5 - 0.15, s * 0.5 + 0.15, z0 + 0.75, z0 + 0.82);
      cylY(B.metal, x - sgn * 0.05, s * 0.36, s * 0.42, z0 + 1.0, 0.16, 10);    /* handwheels */
    }
  }
  /* the 12.7 mm twin mount (the "turret" group, origin on its pedestal foot, guns along +X) */
  function dshk(B) {
    var s;
    cylZ(B.sup, 0, 0, 0, 0.12, 0.38, 14);
    cylZ(B.metal, 0, 0, 0.12, 0.85, 0.09, 10);
    box(B.metal, -0.32, 0.32, -0.2, 0.2, 0.82, 1.02);
    for (s = -1; s <= 1; s += 2) {
      box(B.metal, -0.45, 0.25, s * 0.11 - 0.05, s * 0.11 + 0.05, 0.98, 1.1);    /* receivers */
      cylX(B.metal, 0.25, 1.62, s * 0.11, 1.04, 0.022, 0.022, 6);
      cylX(B.dark, 1.5, 1.68, s * 0.11, 1.04, 0.04, 0.04, 8);                    /* muzzle brakes */
      box(B.sup, -0.15, 0.2, s * 0.3 - 0.07, s * 0.3 + 0.07, 0.86, 1.08);         /* ammunition boxes */
      cyl(B.metal, [-0.45, s * 0.1, 1.04], [-0.75, s * 0.28, 0.98], 0.025, 0.025, 4); /* handles */
    }
    box(B.metal, -0.85, -0.7, -0.32, 0.32, 0.95, 1.12);                           /* shoulder rests */
    cylZ(B.metal, 0.05, 0, 1.1, 1.3, 0.02, 4);
    hoop(B.metal, [0.05, 0, 1.38], [0, 1, 0], [0, 0, 1], 0.08, 0.008, 8);         /* ring sight */
  }

  /* ------------------------------------------------------------ deck fittings */
  function deckGear(B) {
    var s, i, d;
    /* forecastle: jackstaff, windlass with its gypsies, bitts, hawse, the anchors high in the bow [D] */
    cyl(B.metal, [X(0.4), 0, zD(0.4)], [X(0.4), 0, zD(0.4) + 3.3], 0.045, 0.025, 6);
    var zw = zD(4.2);
    box(B.sup, X(4.7), X(3.7), -0.55, 0.55, zw - 0.02, zw + 0.45);
    cylY(B.metal, X(4.2), -0.95, 0.95, zw + 0.3, 0.18, 12);
    for (s = -1; s <= 1; s += 2) {
      cylY(B.dark, X(4.2), s * 0.6, s * 0.85, zw + 0.3, 0.28, 12);
      cyl(B.metal, [X(2.75), s * 0.75, zD(2.75) + 0.02], [X(4.0), s * 0.72, zw + 0.25], 0.035, 0.035, 4);  /* cables */
      cylZ(B.dark, X(2.75), s * 0.82, zD(2.75) - 0.02, zD(2.75) + 0.04, 0.16, 10);
      bitts(B, 1.9, s * 0.95); bitts(B, 7.0, s * 2.25); bitts(B, 33.0, s * 2.8); bitts(B, 47.5, s * 2.45);
      /* the anchor in its pocket under the bow rim, the hawse lip */
      var ya = hullY(2.6, zD(2.6) - 0.5) + 0.03, za = zD(2.6) - 0.5;
      box(B.dark, X(3.0), X(2.2), s * (ya - 0.04), s * (ya + 0.01), za - 0.42, za + 0.3);
      box(B.metal, X(2.75), X(2.45), s * (ya + 0.01), s * (ya + 0.09), za - 0.55, za + 0.25);
      box(B.metal, X(3.05), X(2.15), s * (ya + 0.01), s * (ya + 0.08), za - 0.62, za - 0.5);
    }
    /* hatches and mushroom vents */
    box(B.sup, X(9.6), X(8.4), -0.6, 0.6, zD(9) - 0.02, zD(9) + 0.32);
    box(B.dark, X(9.5), X(8.5), -0.5, 0.5, zD(9) + 0.32, zD(9) + 0.35);
    box(B.sup, X(41.6), X(40.4), -0.55, 0.55, zD(41) - 0.02, zD(41) + 0.3);
    for (s = -1; s <= 1; s += 2) { mushroom(B, 7.8, s * 1.4); mushroom(B, 32.4, s * 1.5); mushroom(B, 41.0, s * 2.2); mushroom(B, 14.2, s * 1.9); }
    /* ensign staff */
    cyl(B.metal, [X(L - 0.3), 0, zD(L - 0.3)], [X(L - 0.3), 0, zD(L - 0.3) + 3.4], 0.05, 0.03, 6);
    /* the boat on chocks, port, beside the forward 37 mm, and its davits [K]; the starboard davit posts [Z] */
    var bx0 = 34.3, bx1 = 39.6, by = 2.12, bz = zD(37) + 0.45, rings = [], k;
    for (i = 0; i <= 8; i++) {
      var t = i / 8, dd = lerp(bx0, bx1, t), w = 0.82 * Math.pow(Math.sin(Math.PI * (0.06 + 0.88 * t)), 0.55), hh = 0.62 * (0.75 + 0.25 * Math.sin(Math.PI * t));
      var rr = [];
      for (k = 0; k < 10; k++) {
        var a = k / 10 * TAU, ca = Math.cos(a), sa = Math.sin(a);
        rr.push([X(dd), by + w * ca, bz + (sa > 0 ? 0.12 * sa : hh * sa)]);
      }
      rings.push(rr);
    }
    loft(B.sup, rings);
    box(B.deck, X(39.0), X(34.9), by - 0.6, by + 0.6, bz + 0.1, bz + 0.13);
    for (i = 0; i < 2; i++) {
      box(B.metal, X(35.4 + i * 3.2) - 0.1, X(35.4 + i * 3.2) + 0.1, by - 0.55, by + 0.55, zD(37) - 0.02, bz - 0.35);
    }
    [[34.6, 1], [39.3, 1], [35.5, -1], [45.0, -1]].forEach(function (p) {
      var xd = X(p[0]), sy = p[1], yb = sy * (hD(p[0]) - 0.25), zb0 = zD(p[0]);
      cyl(B.metal, [xd, yb, zb0], [xd, yb, zb0 + 2.3], 0.07, 0.06, 5);
      cyl(B.metal, [xd, yb, zb0 + 2.3], [xd, yb - sy * 0.35, zb0 + 2.9], 0.06, 0.05, 5);
      cyl(B.metal, [xd, yb - sy * 0.35, zb0 + 2.9], [xd, yb - sy * 0.95, zb0 + 3.05], 0.05, 0.04, 5);
      cyl(B.metal, [xd, yb - sy * 0.95, zb0 + 3.05], [xd, yb - sy * 0.95, zb0 + 2.5], 0.008, 0.008, 3);
    });
    void d;
  }
  /* the stern: two depth-charge rails with their frame [Z], the charges on them, two BMB-1 throwers */
  function stern(B) {
    var s, i, x0 = X(45.6), x1 = X(L) - 0.15;
    for (s = -1; s <= 1; s += 2) {
      var y = s * 1.15;
      for (i = -1; i <= 1; i += 2) box(B.metal, x1, x0, y + i * 0.3 - 0.04, y + i * 0.3 + 0.04, zD(L) + 0.1, zD(L) + 0.2);
      for (i = 0; i < 5; i++) {
        var xx = lerp(x0, x1, i / 4);
        for (var j = -1; j <= 1; j += 2) box(B.metal, xx - 0.04, xx + 0.04, y + j * 0.3 - 0.04, y + j * 0.3 + 0.04, zD(L) - 0.02, zD(L) + 1.45);
        box(B.metal, xx - 0.04, xx + 0.04, y - 0.36, y + 0.36, zD(L) + 1.4, zD(L) + 1.48);
      }
      cyl(B.metal, [x0, y + 0.34, zD(L) + 1.43], [x1, y + 0.34, zD(L) + 1.43], 0.03, 0.03, 4);
      cyl(B.metal, [x0, y - 0.34, zD(L) + 1.43], [x1, y - 0.34, zD(L) + 1.43], 0.03, 0.03, 4);
      cyl(B.metal, [x0, y + 0.34, zD(L) + 0.75], [x1, y + 0.34, zD(L) + 0.75], 0.025, 0.025, 3);
      cyl(B.metal, [x0, y - 0.34, zD(L) + 0.75], [x1, y - 0.34, zD(L) + 0.75], 0.025, 0.025, 3);
      for (i = 0; i < 9; i++) {
        var xc = lerp(x0 - 0.35, x1 + 0.35, i / 8);
        cylY(B.dark, xc, y - 0.26, y + 0.26, zD(L) + 0.43, 0.22, 7);
        if (i > 0 && i < 8) cylY(B.dark, xc, y - 0.26, y + 0.26, zD(L) + 1.0, 0.2, 6);
      }
      /* BMB-1 thrower on the quarter, its barrel angled outboard */
      var xt = X(46.4), yt = s * (hD(46.4) - 0.55), zt = zD(46.4);
      box(B.sup, xt - 0.3, xt + 0.3, yt - 0.3, yt + 0.3, zt - 0.02, zt + 0.25);
      cyl(B.metal, [xt, yt - s * 0.05, zt + 0.25], [xt, yt + s * 0.45, zt + 0.85], 0.14, 0.14, 10);
      cyl(B.dark, [xt, yt + s * 0.45, zt + 0.85], [xt, yt + s * 0.5, zt + 0.92], 0.11, 0.11, 10);
      /* ready-use charges beside it */
      for (i = 0; i < 3; i++) cylZ(B.dark, xt + 0.9 + i * 0.5, yt - s * 0.2, zt, zt + 0.55, 0.2, 10);
    }
  }
  /* underwater: three shafts and screws (three diesels, three shafts), struts, one rudder, bilge keels */
  function underwater(B) {
    var s, k;
    [[-1.65, -1.3, 49.9], [0, -1.55, 49.2], [1.65, -1.3, 49.9]].forEach(function (p) {
      var ys = p[0], zs = p[1], dp = p[2];
      cyl(B.metal, [X(39.0), ys * 0.7, zs + 0.45], [X(dp), ys, zs], 0.08, 0.08, 8);
      cylX(B.metal, X(dp) + 0.05, X(dp) - 0.35, ys, zs, 0.16, 0.08, 10);
      for (k = 0; k < 3; k++) {
        var a = k / 3 * TAU + 0.5, py = Math.cos(a) * 0.55, pz = Math.sin(a) * 0.55;
        hexa(B.metal, [[X(dp) + 0.06, ys, zs], [X(dp) - 0.08, ys, zs], [X(dp) - 0.08, ys + py * 0.2, zs + pz * 0.2], [X(dp) + 0.06, ys + py * 0.2, zs + pz * 0.2],
                       [X(dp) + 0.1, ys + py, zs + pz - 0.06], [X(dp) - 0.04, ys + py, zs + pz - 0.06], [X(dp) - 0.04, ys + py + 0.05, zs + pz], [X(dp) + 0.1, ys + py + 0.05, zs + pz]]);
      }
      if (ys !== 0) {
        cyl(B.metal, [X(dp - 0.7), ys, zs], [X(dp - 0.7), ys * 0.55, hullZ(dp - 0.7, ys * 0.55)], 0.05, 0.05, 5);
        cyl(B.metal, [X(dp - 0.7), ys, zs], [X(dp - 0.7), ys * 0.95, hullZ(dp - 0.7, ys * 0.95)], 0.05, 0.05, 5);
      }
    });
    hexa(B.metal, [[X(51.25), -0.06, -1.55], [X(50.15), -0.06, -1.55], [X(50.15), 0.06, -1.55], [X(51.25), 0.06, -1.55],
                   [X(51.3), -0.06, hullZ(51.3, 0) - 0.02], [X(50.1), -0.06, hullZ(50.1, 0) - 0.02], [X(50.1), 0.06, hullZ(50.1, 0) - 0.02], [X(51.3), 0.06, hullZ(51.3, 0) - 0.02]]);
    for (s = -1; s <= 1; s += 2) {
      var pts = [];
      for (k = 0; k <= 6; k++) {
        var dd = lerp(19, 37, k / 6), zz = -1.45, yy = hullY(dd, zz);
        pts.push([X(dd), s * yy, zz]);
      }
      for (k = 0; k < 6; k++) {
        var a0 = pts[k], a1 = pts[k + 1];
        hexa(B.under, [[a0[0], a0[1] - 0.04, a0[2]], [a1[0], a1[1] - 0.04, a1[2]], [a1[0], a1[1] + 0.04, a1[2]], [a0[0], a0[1] + 0.04, a0[2]],
                       [a0[0], a0[1] - 0.04 + s * 0.45, a0[2] - 0.32], [a1[0], a1[1] - 0.04 + s * 0.45, a1[2] - 0.32], [a1[0], a1[1] + 0.04 + s * 0.45, a1[2] - 0.32], [a0[0], a0[1] + 0.04 + s * 0.45, a0[2] - 0.32]]);
      }
    }
  }
  /* the hull bottom height under a point (d, y): searched down the ring */
  function hullZ(d, y) {
    var zd = zD(d), zb = zBot(d), z, ay = Math.abs(y);
    for (z = zb; z < zd; z += 0.02) if (hullY(d, z) >= ay) return z;
    return zb;
  }

  function addShip(B) {
    var s;
    addHull(B);
    bulwark(B);
    /* the rubbing strake low along the side, rising a little aft [A][Z] */
    band(B.hull, 7.5, L - 0.08, function (dd) { return 0.55 + 0.3 * clamp01((dd - 40) / 12); },
         function (dd) { return 0.69 + 0.3 * clamp01((dd - 40) / 12); }, 0.08, 1.5);
    /* scuttles forward and aft [A] */
    for (s = -1; s <= 1; s += 2) [5.6, 7.4, 9.2, 11.0, 12.8, 33.5, 35.3, 40.8, 42.6].forEach(function (dp) {
      var z = zD(dp) - 0.62, y = hullY(dp, z);
      scuttle(B, X(dp), s * y, z, s, true);
    });
    rails(B, 15.0, L - 0.25, 0.9, 0.08, function (d) { return d > 46.3 && d < 46.7; });
    addHouses(B);
    funnel(B);
    mast(B);
    k90(B, 12.6);
    k70(B, 36.8);
    k70(B, 43.2);
    deckGear(B);
    stern(B);
    underwater(B);
    /* team colour, modest: a panel on the after block roof */
    box(B.team, X(27.4), X(26.5), -0.9, 0.9, RB + 0.015, RB + 0.035);
  }

  function bins(T, names) { var o = {}; names.forEach(function (n) { o[n] = new Bin(T[n]); }); return o; }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group();
    var HB = bins(T, ["hull", "sup", "under", "deck", "dark", "metal", "glass", "white", "team"]);
    addShip(HB);
    flush(THREE, g, HB);
    /* trained mount: the 12.7 mm twin mount on the platform before the wheelhouse, the mount of the row's
       first weapon ("hmg"; see the header) */
    var TB = { sup: new Bin(T.sup), metal: new Bin(T.metal), dark: new Bin(T.dark) };
    dshk(TB);
    var wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(X(16.15), 0, RL + 0.015);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build };
})();

/* Registration: len is the published overall length, 52.24 m (en.wikipedia). */
UNIT_MODELS["pact_e50_patrol"] = {
  len: 52.24,
  build: function (THREE, M, C) { return HeroKronshtadt.build(THREE, M, C); }
};
