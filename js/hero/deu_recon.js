/* ========== deu_recon.js - HERO models: Spaehpanzer 2 Luchs, SPz 11-2 kurz (Hotchkiss), SPz 12-3 lang (HS.30) ==========
   One file, three modules:
     deu_e60_recon   HeroLuchs   Spaehpanzer 2 Luchs, 8x8 amphibious reconnaissance car, as fielded
                                 1975-85 (A0: the IR / white-light searchlight box on the turret).
     deu_e50_recon   HeroSpzKurz Schuetzenpanzer kurz 11-2, the Hotchkiss light tracked carrier with the
                                 20 mm HS 820 turret.
     deu_e50_ifv     HeroHs30    Schuetzenpanzer lang 12-3, the HS.30, with the 20 mm HS 820 turret.

   References (Wikimedia Commons, cached in scratchpad/q_deurecon_ref; published figures from
   en.wikipedia, cached in scratchpad/q_deurecon_wiki):
     L1  "Een Duits verkenningsvoertuig Luchs Spaehpanzer (2107 97101513) cropped.png" - Luchs from
         the LEFT, nose left, long lens (all four tyres the same size, 237 px): the four axles in two
         pairs with the long gap, the boat hull with the sharp chine, the upper sides leaning in, the
         long sloped rear deck to a point, the rear propeller and its nacelle under the stern
         overhang behind wheel 4, the rear tow jaw, the rear crewman's hatch over wheel 3, the
         gun forward.  The bow is hidden under netting; the stern is clear.
     L6  "SpaehPz 'Luchs' Brigade-Spaehzug PzBrig 36 Bad MGH, Kuelsheim 1978 (1).jpg" - Luchs from
         the LEFT, nose left, near square on, 1978, plain single colour (all four tyres 315-325 px):
         the bow with the trim vane folded on the glacis, the lower bow plate, the chine at
         1.28 D, the hull roof at 1.67 D, the turret over axle 2, its roof at 2.12 D and the
         searchlight box on the turret's left rear at 2.26 D (D = tyre diameter, all read at the
         axle-2 station), the tools and the stowage box on the left upper side.  The stern is
         cut off.
     L2  "SpPz2 Luchs.JPG", L5 "Luchs reconnaissance vehicle in Aalborg ... pic1.JPG" - front 3/4: the
         inverted-trapezoid lower bow plate, the trim vane lying on the glacis with its lip, the
         headlamps in their pipe guards at the top corners of the lower bow plate, the tow hooks,
         the turret's sloped faces and the gun mount on the turret front.
     L3  "Bundesarchiv B 145 Bild-F073468-0023, Manoever, Spaehpanzer Luchs.jpg" - head-on, period:
         driver's head at the front left beside the turret, the gun right of the turret's centre,
         the searchlight box high on the turret's left rear.
     L4  "SpaehPz 'Luchs' PzSpaehZug 360 Bad MGH, 1983 (1).jpg" - 1983, plain olive, front left 3/4:
         the four smoke dischargers on the turret side, the MG3 high on the commander's ring.
     L8  "Spaehpanzer Luchs 2.jpg" - rear right 3/4: the rear plate narrowing downward, the
         recesses under the stern overhang either side of it, the leaning upper sides.
     H1  "HS30-Spz-drawing.svg" - a four-view colour drawing of the HS.30 with dimension bars that
         are the published 5.56 x 2.54 x 1.85 m (175 px/m at 2000 px; length, width and height bars
         agree within 3 %): five road wheels in pairs on coil-spring arms, three return rollers,
         the FRONT drive sprocket and the rear idler both raised, the low hull with the full-width
         superstructure over the tracks, its sides leaning in, the long shallow glacis, the roof
         raised 0.09 m behind the turret, the engine deck sloping down at the back, the small
         round turret offset to the RIGHT with the gun cradle drum across its front, the two round
         hatches beside it on the left, the two big troop hatches, the engine grille, the
         dome-shaped ventilation cover on the right of the rear deck, two banks of four smoke
         dischargers and the headlamps on the glacis, the mirrors on posts.
     H2  "HS 30 back (24362220407).jpg" (en.wikipedia caption only: "double door on the left and the
         dome-shaped cover for the engine room ventilation on the right") - agrees with H1.
     K1  "SPz11-2-drawing.svg" - a four-view drawing of the SPz 11-2 by the same hand, dimension bars
         the published 4.51 x 2.28 x 1.97 m (174.3 px/m): five road wheels, three return rollers, the
         big spoked FRONT sprocket, the rear idler, the long glacis rising to a flat roof, the
         turret on the rear half offset to the LEFT with its sloped front and tall rear, the 20 mm
         gun, three smoke dischargers on each rear turret cheek, the driver's raised hatch front
         left, the engine grille front right, the two big stowage bins hinged on the rear plate,
         the headlamps in hoop guards at the front corners.
   Published: en.wikipedia "Spaehpanzer Luchs": 7.74 x 2.98 x 2.84 m, 19.5 t, 8x8, "all four axles
   can be steered", "a rear-facing driver with his own driving position", "propellers at the rear
   and the fold back trim vane at the front", Rh 202 20 mm, MG3, crew 4.  "Schuetzenpanzer SPz 11-2
   Kurz": 4.51 x 2.28 x 1.97 m, 8.2 t, HS 820 L/85, "2 x 3 smoke grenade launchers", crew 5.
   "Schuetzenpanzer Lang HS.30": 5.56 x 2.54 x 1.85 m, 14.6 t, "three bogie, five road wheels",
   HS 820, MG3, Rolls-Royce B81 engine.

   LUCHS SCALE - how the photographs were settled against the published figures.  No drawing of
   the Luchs was found.  Every ratio below is in tyre diameters D, read off one photograph at one
   station:  L6 at axle 2: turret roof 2.12 D, searchlight box top 2.26 D, chine 1.28 D, hull roof
   1.67 D; L1 at axle 4: chine 1.28 D (agrees), hull roof 1.73 D.  Along the hull: front overhang
   (bow tip to axle 1) 0.77 D from L6 (L1's bow is under netting); rear overhang 0.98 D from L1
   (L6's stern is cut off); axle pitches 1-2 / 2-3 / 3-4: L1 1.16 / 1.91 / 1.10 D, L6 1.03 / 1.79 /
   1.17 D - the two photographs disagree by up to 0.13 D, so their means are drawn, the outer pair
   equal: 1.12 / 1.85 / 1.12 D.  The hull is then 5.84 D long: at the published 7.74 m, D = 1.325 m;
   the published 2.84 m height taken to the turret roof (2.12 D) gives D = 1.34 m.  Two published
   figures agree at one scale, so D = 1.33 m (tyre 0.665 m radius) and every part is drawn from its
   ratio, none stretched.  The searchlight box then stands 3.0 m, the MG3 3.2 m.

   Recognition list (each drawn; source):
     Luchs  1. eight big tyres in two pairs with the long gap between axles 2 and 3 - L1, L6
            2. the boat hull: the sharp chine with the upper sides leaning in and the hull tucked
               in under it over the tyres - L1, L6, L2, L8
            3. the bow: the long glacis with the trim vane lying on it, the lower bow plate raking
               back under it with the headlamps in their guards - L2, L5, L6
            4. the long sloped rear deck to a point; the propellers in the recesses under it - L1, L8
            5. the low faceted turret over axle 2 with the long thin Rh 202 - L1, L3, L6
            6. the searchlight box on the turret's left rear, the MG3 on the commander's ring, the
               smoke dischargers - L3, L4, L6
            7. the front driver's hatch front left, the rear driver's hatch on the left over axle
               3 with periscopes looking aft - L1, L3, en.wiki
     Kurz   8. a short box on five small road wheels, the big spoked sprocket at the front - K1
            9. the long glacis, the flat roof, the bins on the rear plate - K1
            10. the turret on the rear half, offset left, sloped front, the smoke dischargers - K1
     HS.30  11. long and low, five road wheels in pairs, three return rollers, front sprocket - H1
            12. the full-width superstructure leaning in, the raised rear roof, the sloped engine
                deck with the round ventilation dome on the right - H1, H2
            13. the small round turret on the right front with the gun cradle drum - H1
   Paint: L3, L4, L6 (1970s-1983) show every Luchs in one plain colour (L1, L2, L5, L8 wear the
   post-1984 three-colour scheme: not this period, not drawn).  H1 and K1 are drawn plain olive.
   The Bundeswehr's single colour of 1956-84, RAL 6014 Gelboliv, is taken as deu_leopard1.js takes
   it (#4c4b36).  No crosses, numbers, plates or tactical signs (H1 and K1 carry them: not drawn).
   NOT CONFIRMED (proportion or judgement):
     Luchs: the axle pitches (two photographs, means drawn, see above); all WIDTHS - chine at the
     published 2.98 m, the tyres' outer faces just inside it (track 2.58 m), the roof edge 2.24 m, the
     lower hull 2.12 m, the belly 1.44 m: from the leaning sides in L2 / L8, no front-on drawing; the
     belly 0.46 m; the bow tip's half width 1.36 m; the stern recesses' size and the propellers'
     place across (y +-0.98, r 0.24; L1 gives X and height only), three blades; the turret's widths
     (1.52 m at the base from L3's ratio to the hull roof), its faceting, the gun's offset to the
     right (0.25 m, from L3 only); the smoke dischargers on the RIGHT side (L2 shows a cluster
     there on the later A2); the hatch sizes; the engine grille on the right of the rear deck (seen
     only from above at a distance); the rear lamps; the tyre tread.
     Kurz / HS.30: the drawings' views disagree on where the gun sits across the turret (front views
     put it 0.16 / 0.34 m further left than the plans): the plans are taken, nudged half way; the
     wheels drawn dual; the track links; the turret hatch and periscope sizes.  K1's turret top
     stands 0.10 m above its own 1.97 m bar (its front roof is at 1.97): drawn as K1 draws it.  H1's
     tracks stand 0.05 m outside its own 2.54 m bar: drawn 0.40 m wide (H1 0.43) so the hull and
     tracks keep to the published width.  K1's rear bins and lamp guards reach 0.07 m past its bar.
   Engine (js/damage3d.js, not edited): deu_e60_recon "rear" (listed; the Luchs's engine is aft -
   the grille on the rear deck) and deu_e50_ifv "rear" (listed; H1's grille and ventilation dome
   are aft) both match.  deu_e50_recon is not listed, so it takes the recon role default "front":
   K1's engine grille is front right beside the driver, which matches.
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours: tyres, rims, glass, lamps), team
   colour (C.team): strips on the rear deck and the turret roof.
   Nodes: "turret" (origin on the turret ring at the roof, gun along +X); "roadwheel": the Luchs one
   group per axle (both tyres; origin on the axle centre, axle along Y), the tracked two one group
   per road-wheel station (both sides).
   Drawn (dump.js): Luchs 7.91 x 3.01 m, hull 7.74 m, turret roof 2.82 m, searchlight 3.00 m (3.81 m
   to the whips), 12 draw calls; SPz 11-2 4.58 x 2.28 x 2.13 m (turret front roof 1.97 m), 15 draw
   calls; HS.30 5.98 m over the gun (hull 5.56 m) x 2.55 m, turret roof 1.85 m (sights 1.94 m), 15
   draw calls.
   Model space: +X nose, +Y left, +Z up, metres, ground at z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroDeuRecon = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#4c4b36", blots: ["#55543c", "#44432f"], seed: 1975 };
  var GLASS = [0.10, 0.12, 0.13], LAMP = [0.85, 0.82, 0.70], RED = [0.55, 0.10, 0.08];

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
      }
    }
  };
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  function cyl(bin, A, B, r0, r1, seg, nocap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    if (!nocap) {
      base = V.length; na = [-ax[0], -ax[1], -ax[2]];
      V.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, V, F, N);
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1, seg); }
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a convex prism: profile in the YZ plane, from x0 to x1 */
  function prismX(bin, pts, x0, x1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([x0, pts[i][0], pts[i][1]], [x1, pts[i][0], pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a closed solid lofted through convex rings of [x, y, z] points; ends capped */
  function loftN(bin, L) {
    var V = [], F = [], n = L[0].length, m = L.length, i, k;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) V.push(L[k][i]);
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + (i + 1) % n, d = (k + 1) * n + i;
        F.push([a, b, c], [a, c, d]);
      }
    for (i = 1; i + 1 < n; i++) { F.push([0, i + 1, i]); F.push([(m - 1) * n, (m - 1) * n + i, (m - 1) * n + i + 1]); }
    solid(bin, V, F);
  }

  /* ----------------------------------------------------------- materials */
  var _tex;
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE) {
    if (_tex !== undefined) return _tex;
    _tex = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(PAINT.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = PAINT.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < PAINT.blots.length; k++) {
        q.fillStyle = PAINT.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams and plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      _tex = new THREE.CanvasTexture(cv);
      _tex.wrapS = _tex.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) _tex.encoding = THREE.sRGBEncoding;
      _tex.anisotropy = 4;
    } catch (e) { _tex = null; }
    return _tex;
  }
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false), vc: new Bin(T.wheel, false, true) }; }
  function flush(THREE, group, B, f) {
    var k, b, geo, j, q;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      if (f) for (j = 0; j < b.P.length; j += 3) { q = f(b.P[j], b.P[j + 1], b.P[j + 2]); b.P[j] = q[0]; b.P[j + 1] = q[1]; b.P[j + 2] = q[2]; }
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }


  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }

  /* a slab lying on a plane sloping down toward +X at angle a (rad) from horizontal */
  function onSlope(bin, x, y, z, a, hu, hv, hw) {
    var ca = Math.cos(a), sa = Math.sin(a), n = [sa, 0, ca];
    slab(bin, [x + n[0] * hw, y, z + n[2] * hw], [ca, 0, -sa], [0, 1, 0], n, hu, hv, hw);
  }

  /* ------------------------------------------------- tracked running gear (shared) */
  /* G: XW road wheels, ZW, RW; RR return rollers at RRZ, RRR; SPR sprocket (toothed), IDL idler;
     TY track centre, TW track half width */
  function addTracks(B, G) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [], TO = 0.03;
    for (i = 0; i < G.XW.length; i++) C.push([G.XW[i], G.ZW, G.RW + TO]);
    for (i = 0; i < G.RR.length; i++) C.push([G.RR[i], G.RRZ, G.RRR + TO]);
    C.push([G.IDL.x, G.IDL.z, G.IDL.r + TO], [G.SPR.x, G.SPR.z, G.SPR.r + TO]);
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts);
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    cnt = Math.round(tot / 0.16); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * G.TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - G.TW, y + G.TW, 0.04);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the steel shoes with their grousers, the centre guide horns */
        belt(B.dark, px - dx * 0.045, pz - dz * 0.045, px + dx * 0.045, pz + dz * 0.045, y - G.TW - 0.005, y + G.TW + 0.005, 0.06);
        belt(B.dark, px - dx * 0.025 - dz * 0.05, pz - dz * 0.025 + dx * 0.05, px + dx * 0.025 - dz * 0.05, pz + dz * 0.025 + dx * 0.05, y - 0.025, y + 0.025, 0.04);
      }
      /* the toothed drive sprocket */
      cylY(B.dark, G.SPR.x, y - 0.10, y + 0.10, G.SPR.z, G.SPR.r - 0.04, 18);
      for (i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [G.SPR.x + ca * (G.SPR.r - 0.02), y, G.SPR.z + sa * (G.SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.09, 0.025);
      }
      cylY(B.paint, G.SPR.x, y + s * 0.10, y + s * G.TW * 0.9, G.SPR.z, G.SPR.r * 0.55, 14);
      cylY(B.dark, G.SPR.x, y + s * G.TW * 0.9, y + s * G.TW * 1.0, G.SPR.z, 0.06, 10);
      /* the idler */
      cylY(B.paint, G.IDL.x, y - G.TW * 0.85, y + G.TW * 0.85, G.IDL.z, G.IDL.r, 18);
      cylY(B.dark, G.IDL.x, y + s * G.TW * 0.85, y + s * (G.TW * 0.85 + 0.03), G.IDL.z, 0.07, 10);
      /* the return rollers */
      for (i = 0; i < G.RR.length; i++) {
        cylY(B.paint, G.RR[i], y - G.TW * 0.8, y + G.TW * 0.8, G.RRZ, G.RRR, 12);
        cylY(B.dark, G.RR[i], y + s * G.TW * 0.8, y + s * (G.TW * 0.8 + 0.03), G.RRZ, 0.04, 8);
      }
    }
  }
  /* road wheel: dual rubber-tyred discs either side of the guide horns, the dished face with the
     bolt circle and the hub; axle along Y, both sides */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.16, 0.17, 0.14];
  function baseCols() {
    var c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    return { body: [rr * 1.12, gg * 1.12, bb * 1.12], rib: [rr * 1.3, gg * 1.3, bb * 1.3] };
  }
  function addRoadWheel(W, G) {
    var s, y, i, a, dy, K = baseCols(), R = G.RW, w = G.TW * 0.42;
    for (s = -1; s <= 1; s += 2) {
      y = s * G.TY;
      for (dy = -1; dy <= 1; dy += 2) {
        var yc = y + dy * (0.035 + w / 2);
        W.col = TYRE; cylY(W, 0, yc - w / 2, yc + w / 2, 0, R, 18);
        W.col = K.body; cylY(W, 0, yc - w / 2 - 0.004, yc + w / 2 + 0.004, 0, R - 0.045, 18);
      }
      var yf = y + s * (0.035 + w + 0.004);
      W.col = K.body; cyl(W, [0, yf, 0], [0, yf + s * 0.02, 0], R - 0.045, R * 0.55, 18);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = i / 6 * TAU;
        box(W, Math.cos(a) * R * 0.5 - 0.013, Math.cos(a) * R * 0.5 + 0.013, Math.min(yf + s * 0.012, yf + s * 0.024), Math.max(yf + s * 0.012, yf + s * 0.024), Math.sin(a) * R * 0.5 - 0.013, Math.sin(a) * R * 0.5 + 0.013);
      }
      W.col = K.rib; cylY(W, 0, yf + s * 0.015, yf + s * 0.04, 0, R * 0.28, 10);
      W.col = HOLE; cylY(W, 0, yf + s * 0.04, yf + s * 0.052, 0, R * 0.12, 8);
    }
  }

  /* ================================================================ LUCHS */
  /* running gear (L1, L6; see LUCHS SCALE): D = 1.33 m, axles 1.49 / 2.46 / 1.49 m apart */
  var LX = [2.85, 1.36, -1.10, -2.59], LZW = 0.665, LRT = 0.665, LTY = 1.28, LTH = 0.18;
  var LROOF = 2.24, LTX = 1.0;
  function lGlacis(x) { return 1.74 + (3.88 - x) * 0.303; }                 /* bow tip to the roof's front edge at X 2.23 */
  function lDeck(x) { return LROOF - (-2.00 - x) * (0.30 / 1.87); }         /* the rear deck, X -2.00 to the stern point */
  function lTop(x) { return x > 2.23 ? lGlacis(x) : (x < -2.00 ? lDeck(x) : LROOF); }
  /* the upper hull: from the underside over the tyres (zlo) out to the chine, the sides leaning in
     to the roof edge */
  function lU(x, zlo, wlo, zch, wch, wtop) {
    var zt = lTop(x);
    return [[x, -wlo, zlo], [x, wlo, zlo], [x, wch, zch], [x, wtop, zt], [x, -wtop, zt], [x, -wch, zch]];
  }
  /* the lower hull between the tyres: belly, the sides, up under the chine */
  function lL(x, wb, zb, ws, zs, wt, zt) {
    return [[x, -wb, zb], [x, wb, zb], [x, ws, zs], [x, wt, zt], [x, -wt, zt], [x, -ws, zs]];
  }
  function addLuchsHull(B) {
    var P = B.paint, D = B.dark, s, i, x, y, z, a;
    loftN(P, [lU(3.88, 1.64, 1.20, 1.70, 1.36, 1.30), lU(3.71, 1.36, 1.06, 1.71, 1.45, 1.30), lU(3.20, 1.36, 1.06, 1.71, 1.49, 1.24),
              lU(2.23, 1.36, 1.06, 1.71, 1.49, 1.12), lU(-2.00, 1.36, 1.06, 1.71, 1.49, 1.12), lU(-2.95, 1.40, 1.06, 1.73, 1.49, 1.16),
              lU(-3.20, 1.68, 1.06, 1.77, 1.47, 1.18), lU(-3.87, 1.84, 1.10, 1.90, 1.34, 1.25)]);
    loftN(P, [lL(3.71, 0.95, 1.28, 1.02, 1.32, 1.06, 1.36), lL(3.45, 0.85, 0.90, 1.04, 1.00, 1.06, 1.36), lL(3.20, 0.72, 0.46, 1.04, 0.80, 1.06, 1.36),
              lL(-2.90, 0.72, 0.46, 1.04, 0.80, 1.06, 1.36), lL(-3.20, 0.72, 0.62, 0.92, 0.85, 0.98, 1.68),
              lL(-3.46, 0.70, 1.05, 0.80, 1.15, 0.90, 1.74), lL(-3.80, 0.80, 1.72, 0.92, 1.76, 1.00, 1.82)]);
    /* the chine's edge strip, a shade darker in every photograph (L1, L6) */
    for (s = -1; s <= 1; s += 2) box(D, -3.00, 3.60, s > 0 ? 1.49 : -1.505, s > 0 ? 1.505 : -1.49, 1.69, 1.73);
    /* the trim vane folded back on the glacis, its lip and hinge bar at the bow (L2, L5, L6) */
    a = Math.atan(0.303);
    onSlope(P, 3.50, 0, lGlacis(3.50), a, 0.36, 1.18, 0.022);
    box(D, 3.84, 3.92, -1.20, 1.20, 1.68, 1.77);
    for (s = -1; s <= 1; s += 2) onSlope(D, 3.40, s * 0.75, lGlacis(3.40) + 0.044, a, 0.30, 0.03, 0.015);
    /* the headlamps in their pipe guards at the top corners of the lower bow plate; the tow
       hooks below (L2, L5) */
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.88; z = 1.44; x = 3.88 - (1.64 - z) * 0.576;
      cylX(P, x - 0.06, x + 0.10, y, z, 0.085, 0.085, 12);
      B.vc.col = LAMP; cylX(B.vc, x + 0.10, x + 0.112, y, z, 0.07, 0.07, 12);
      cyl(D, [x - 0.02, y - s * 0.14, z - 0.12], [x + 0.18, y - s * 0.14, z - 0.02], 0.016, 0.016, 6);
      cyl(D, [x + 0.18, y - s * 0.14, z - 0.02], [x + 0.18, y + s * 0.12, z - 0.02], 0.016, 0.016, 6);
      cyl(D, [x + 0.18, y + s * 0.12, z - 0.02], [x - 0.02, y + s * 0.12, z - 0.12], 0.016, 0.016, 6);
      z = 1.16; x = 3.88 - (1.64 - z) * 0.576;
      box(D, x - 0.06, x + 0.10, s * 0.55 - 0.05, s * 0.55 + 0.05, z - 0.06, z + 0.06);
    }
    /* the front driver's hatch, front LEFT (L3, L1), its periscopes on the roof's front edge */
    cylZ(P, 1.92, 0.58, LROOF, LROOF + 0.05, 0.30, 16);
    box(D, 1.70, 1.76, 0.42, 0.74, LROOF + 0.05, LROOF + 0.09);
    for (i = -1; i <= 1; i++) box(D, 2.14, 2.22, 0.58 + i * 0.13 - 0.05, 0.58 + i * 0.13 + 0.05, LROOF, LROOF + 0.07);
    /* the rear driver / radio operator's hatch on the LEFT over axle 3 (L1); his three periscopes
       looking aft from the roof's rear edge (L8) */
    cylZ(P, -1.25, 0.58, LROOF, LROOF + 0.05, 0.28, 16);
    box(D, -1.03, -0.97, 0.44, 0.72, LROOF + 0.05, LROOF + 0.09);
    for (i = -1; i <= 1; i++) {
      box(P, -2.06, -1.94, 0.40 + i * 0.16 - 0.06, 0.40 + i * 0.16 + 0.06, LROOF - 0.01, LROOF + 0.08);
      B.vc.col = GLASS; box(B.vc, -2.07, -2.06, 0.40 + i * 0.16 - 0.05, 0.40 + i * 0.16 + 0.05, LROOF + 0.01, LROOF + 0.07);
    }
    /* the turret ring collar */
    cylZ(P, LTX, 0, LROOF, LROOF + 0.04, 0.80, 24);
    /* the engine grille on the right of the rear deck (seen from above); a hatch on its left */
    a = Math.atan(0.30 / 1.87);
    for (i = 0; i < 8; i++) {
      x = -2.25 - i * 0.13;
      onSlope(D, x, -0.62, lDeck(x), -a, 0.035, 0.36, 0.012);
    }
    onSlope(P, -2.70, 0.55, lDeck(-2.70), -a, 0.40, 0.32, 0.02);
    /* the antenna bases at the rear corners of the roof and their whips (L1) */
    for (s = -1; s <= 1; s += 2) {
      cylZ(D, -2.25, s * 0.88, lDeck(-2.25), lDeck(-2.25) + 0.16, 0.05, 8);
      cyl(D, [-2.25, s * 0.88, lDeck(-2.25) + 0.16], [-2.30, s * 0.88, lDeck(-2.25) + 1.60], 0.012, 0.006, 5);
    }
    /* the left upper side (L1, L6): the stowage box and the tools; the side face leans in at
       (-0.37, 0.53) from the chine to the roof edge */
    var fu = [0, -0.572, 0.820], fn = [0, 0.820, 0.572];
    function onSide(xc, t, hu, hv, hw, bin) {
      var yy = 1.49 - 0.37 * t, zz = 1.71 + 0.53 * t;
      slab(bin, [xc, yy + fn[1] * hw, zz + fn[2] * hw], [1, 0, 0], fu, fn, hu, hv, hw);
    }
    onSide(-1.15, 0.45, 0.30, 0.13, 0.05, P);
    onSide(-1.15, 0.45, 0.31, 0.02, 0.055, D);
    onSide(1.05, 0.55, 0.55, 0.018, 0.02, D);
    onSide(0.85, 0.35, 0.45, 0.018, 0.02, D);
    onSide(0.30, 0.45, 0.07, 0.07, 0.025, D);
    /* the stern: the propellers in the recesses either side of the narrow lower rear plate,
       behind wheel 4 (L1: X -3.30, 1.42 m up; L8), each on its nacelle hung from the overhang */
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.98;
      cylX(D, -3.36, -3.02, y, 1.42, 0.06, 0.08, 10);
      box(D, -3.20, -3.08, y - 0.04, y + 0.04, 1.42, 1.72);
      for (i = 0; i < 3; i++) {
        var pa = i / 3 * TAU + 0.4, ca = Math.cos(pa), sa = Math.sin(pa);
        var u = [0, ca, sa], v = [0.5, -sa * 0.866, ca * 0.866];
        slab(D, [-3.38, y + ca * 0.13, 1.42 + sa * 0.13], u, v, cross(u, v), 0.11, 0.06, 0.008);
      }
    }
    /* the rear tow jaw under the stern point (L1), the rear lamps */
    box(D, -3.95, -3.80, -0.08, 0.08, 1.56, 1.70);
    for (s = -1; s <= 1; s += 2) { B.vc.col = RED; box(B.vc, -3.62, -3.56, s * 1.22 - 0.05, s * 1.22 + 0.05, 1.98, 2.03); }
    /* team colour: a plate on the rear deck */
    onSlope(B.team, -2.85, -0.20, lDeck(-2.85) + 0.01, -a, 0.12, 0.30, 0.008);
  }
  /* one axle: two big low-pressure tyres with a chunky tread, the dished rim with its ring of
     nuts and the hub (L6, L1) */
  var LUG = [0.11, 0.115, 0.105], NUT = [0.20, 0.21, 0.18];
  function addLuchsAxle(W) {
    var s, y, i, a, ca, sa, K = baseCols();
    for (s = -1; s <= 1; s += 2) {
      y = s * LTY;
      W.col = TYRE;
      cylY(W, 0, y - LTH, y + LTH, 0, LRT - 0.02, 28);
      cyl(W, [0, y + s * LTH, 0], [0, y + s * (LTH + 0.03), 0], LRT - 0.05, LRT - 0.16, 28, true);
      cyl(W, [0, y - s * LTH, 0], [0, y - s * (LTH + 0.03), 0], LRT - 0.05, LRT - 0.16, 28, true);
      W.col = LUG;
      for (i = 0; i < 28; i++) {
        a = i / 28 * TAU; ca = Math.cos(a); sa = Math.sin(a);
        var off = (i % 2 ? 0.07 : -0.07);
        slab(W, [ca * (LRT - 0.01), y + off, sa * (LRT - 0.01)], [ca, 0, sa], [-sa, 0, ca], [0, 1, 0], 0.025, 0.05, 0.11);
      }
      /* the rim sits dished inside the sidewall (L6) */
      W.col = K.body;
      cyl(W, [0, y + s * (LTH - 0.03), 0], [0, y + s * (LTH + 0.005), 0], 0.35, 0.32, 22);
      W.col = K.rib;
      cyl(W, [0, y + s * LTH, 0], [0, y + s * (LTH + 0.025), 0], 0.17, 0.14, 14);
      W.col = NUT;
      for (i = 0; i < 16; i++) {
        a = i / 16 * TAU;
        cylY(W, Math.cos(a) * 0.27, y + s * LTH, y + s * (LTH + 0.012), Math.sin(a) * 0.27, 0.017, 6);
      }
      for (i = 0; i < 8; i++) {
        a = i / 8 * TAU;
        cylY(W, Math.cos(a) * 0.105, y + s * (LTH + 0.02), y + s * (LTH + 0.032), Math.sin(a) * 0.105, 0.015, 6);
      }
    }
  }
  /* the turret (L1, L3, L4, L6): origin on the ring at the roof; a low faceted body, its front
     raked back, the Rh 202 in its cradle on the front right of centre (L3), the searchlight box
     high on the left rear (L3, L6), four smoke dischargers on each rear cheek (L4), the
     commander's ring with the MG3 (L4, L6) */
  function oct(x0, x1, w, c, z) {
    return [[x1 - c, -w, z], [x1, -w + c, z], [x1, w - c, z], [x1 - c, w, z], [x0 + c, w, z], [x0, w - c, z], [x0, -w + c, z], [x0 + c, -w, z]];
  }
  var LGY = -0.25, LGZ = 0.35;
  function addLuchsTurret(B) {
    var P = B.paint, D = B.dark, s, i, x, y;
    loftN(P, [oct(-0.78, 0.68, 0.74, 0.22, 0.02), oct(-0.80, 0.72, 0.76, 0.24, 0.20), oct(-0.62, 0.30, 0.55, 0.16, 0.58)]);
    /* the gun cradle on the front face, the recoil sleeve, barrel and flash hider (muzzle 2.69 m
       ahead of the ring centre: L1) */
    prismY(P, [[0.40, 0.18], [0.80, 0.22], [0.86, 0.32], [0.80, 0.48], [0.40, 0.52]], LGY - 0.15, LGY + 0.15);
    cylX(D, 0.86, 1.30, LGY, LGZ, 0.065, 0.055, 12);
    cylX(D, 1.30, 2.55, LGY, LGZ, 0.026, 0.024, 10);
    cylX(D, 2.55, 2.69, LGY, LGZ, 0.036, 0.036, 10);
    /* the searchlight box on its bracket, left rear, top 3.0 m (L6) */
    box(D, -0.52, -0.38, 0.52, 0.62, 0.30, 0.44);
    box(P, -0.64, -0.26, 0.58, 0.94, 0.42, 0.76);
    B.vc.col = GLASS; box(B.vc, -0.26, -0.25, 0.62, 0.90, 0.46, 0.72);
    for (s = -1; s <= 1; s += 2) {
      /* four smoke dischargers on each rear cheek, raked forward and up (L4) */
      for (i = 0; i < 4; i++) {
        x = -0.12 - i * 0.13;
        y = s * 0.74;
        cyl(D, [x - 0.04, y, 0.24], [x + 0.06, y + s * 0.06, 0.36], 0.042, 0.042, 8);
      }
      box(D, -0.60, -0.05, s > 0 ? 0.70 : -0.78, s > 0 ? 0.78 : -0.70, 0.18, 0.23);
    }
    /* the commander's hatch on the right rear with the MG3 high on its pintle (L4, L6) */
    cylZ(P, -0.22, -0.22, 0.58, 0.64, 0.30, 16);
    cylZ(D, -0.22, -0.22, 0.64, 0.92, 0.03, 8);
    box(D, -0.42, 0.04, -0.25, -0.19, 0.92, 1.00);
    box(D, -0.60, -0.42, -0.24, -0.20, 0.90, 0.98);
    cylX(D, 0.04, 0.58, -0.22, 0.97, 0.024, 0.024, 8);
    box(D, -0.18, -0.02, -0.18, -0.08, 0.86, 0.94);
    /* the gunner's sight head and periscopes on the front of the roof */
    box(P, 0.02, 0.24, 0.10, 0.36, 0.58, 0.72);
    B.vc.col = GLASS; box(B.vc, 0.24, 0.25, 0.13, 0.33, 0.61, 0.69);
    /* team colour: strips on the roof */
    box(B.team, -0.56, -0.44, 0.05, 0.45, 0.58, 0.595);
  }

  /* ================================================================ HS.30 */
  /* H1 at 175 px/m: X = (1431.5 - px) / 175, z = (392 - py) / 175 */
  var HG = { XW: [1.609, 0.769, 0.009, -0.837, -1.603], ZW: 0.33, RW: 0.28, RR: [1.254, 0.397, -1.209], RRZ: 0.714, RRR: 0.10,
             SPR: { x: 2.466, z: 0.583, r: 0.27 }, IDL: { x: -2.209, z: 0.566, r: 0.27 }, TY: 1.07, TW: 0.20 };
  var HROOF = 1.423, HROOF2 = 1.514, HTX = 1.19, HTY = -0.25;
  function hTop(x) {
    if (x > 1.894) return HROOF + (x - 1.894) * (0.914 - HROOF) / (2.75 - 1.894);
    if (x > 0.52) return HROOF;
    if (x > 0.44) return HROOF + (0.52 - x) / 0.08 * (HROOF2 - HROOF);
    if (x > -1.592) return HROOF2;
    return HROOF2 - (-1.592 - x) * 0.528;
  }
  /* the superstructure: full width over the tracks at its foot (0.90 m), the sides leaning in
     (H1 front view: out to the published 2.54 m at 0.90 m, +-1.04 at the roof) */
  function hU(x) {
    var zt = Math.max(hTop(x), 0.93), wt = 1.27 - (zt - 0.90) * 0.43;
    return [[x, -1.27, 0.90], [x, 1.27, 0.90], [x, wt, zt], [x, -wt, zt]];
  }
  function addHs30Hull(B) {
    var P = B.paint, D = B.dark, s, i, x, y, z, a;
    /* the lower hull between the tracks: belly 0.47 m, the nose and tail plates (H1) */
    prismY(P, [[2.76, 0.93], [2.76, 0.86], [2.40, 0.47], [-2.45, 0.47], [-2.78, 0.84], [-2.78, 0.93]], -0.84, 0.84);
    loftN(P, [hU(2.76), hU(2.72), hU(1.894), hU(0.52), hU(0.44), hU(-1.592), hU(-2.68), hU(-2.78)]);
    /* the dark track-guard band along the foot of the superstructure (H1) */
    for (s = -1; s <= 1; s += 2) box(D, -2.78, 2.76, s > 0 ? 1.255 : -1.27, s > 0 ? 1.27 : -1.255, 0.86, 0.93);
    /* the glacis: two banks of four smoke dischargers at the top corners, the headlamps, the
       guard bar between them (H1 front and side views) */
    a = Math.atan((HROOF - 0.914) / (2.75 - 1.894));
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) {
        y = s * (0.62 + i * 0.10); x = 2.42; z = hTop(x);
        cyl(D, [x - 0.06, y, z], [x + 0.10, y, z + 0.14], 0.04, 0.04, 8);
      }
      box(D, 2.36, 2.48, s > 0 ? 0.56 : -0.96, s > 0 ? 0.96 : -0.56, hTop(2.42) - 0.02, hTop(2.42) + 0.04);
      y = s * 0.67; x = 2.60; z = hTop(x) + 0.08;
      cylX(P, x - 0.10, x + 0.06, y, z, 0.075, 0.075, 12);
      B.vc.col = LAMP; cylX(B.vc, x + 0.06, x + 0.07, y, z, 0.062, 0.062, 12);
      /* the mirrors on their posts (H1) */
      cyl(D, [2.32, s * 1.12, hTop(2.32)], [2.26, s * 1.12, 1.45], 0.012, 0.012, 5);
      cylX(D, 2.24, 2.27, s * 1.12, 1.48, 0.07, 0.07, 10);
    }
    onSlope(D, 2.55, 0, hTop(2.55), a, 0.02, 0.48, 0.03);
    /* the turret ring collar */
    cylZ(P, HTX, HTY, HROOF, HROOF + 0.03, 0.60, 22);
    /* the two round hatches on the left beside the turret (H1 plan) */
    [1.44, 0.86].forEach(function (hx) {
      cylZ(P, hx, 0.63, HROOF, HROOF + 0.05, 0.25, 16);
      box(D, hx - 0.03, hx + 0.03, 0.40, 0.86, HROOF + 0.05, HROOF + 0.07);
    });
    /* the step to the raised roof; the two troop hatches (H1 plan) */
    for (s = -1; s <= 1; s += 2) {
      box(P, -0.70, 0.40, s > 0 ? 0.06 : -0.85, s > 0 ? 0.85 : -0.06, HROOF2, HROOF2 + 0.03);
      box(D, 0.36, 0.40, s > 0 ? 0.10 : -0.81, s > 0 ? 0.81 : -0.10, HROOF2 + 0.03, HROOF2 + 0.06);
    }
    /* the engine grille on the left, the hatch on the right (H1 plan) */
    for (i = 0; i < 9; i++) {
      x = -0.82 - i * 0.085;
      box(D, x - 0.025, x + 0.025, 0.06, 0.80, HROOF2, HROOF2 + 0.02);
    }
    box(P, -1.22, -0.76, -0.89, -0.20, HROOF2, HROOF2 + 0.03);
    /* the rear deck: the dome-shaped ventilation cover on the right, the hatch on the left (H1,
       H2) */
    a = Math.atan(0.528);
    var n = [-Math.sin(a), 0, Math.cos(a)], c0 = [-2.31, -0.62, hTop(-2.31)];
    cyl(P, c0, [c0[0] + n[0] * 0.10, c0[1], c0[2] + n[2] * 0.10], 0.37, 0.30, 22);
    cyl(D, [c0[0] + n[0] * 0.10, c0[1], c0[2] + n[2] * 0.10], [c0[0] + n[0] * 0.13, c0[1], c0[2] + n[2] * 0.13], 0.12, 0.08, 10);
    onSlope(P, -2.17, 0.51, hTop(-2.17), -a, 0.36, 0.34, 0.02);
    /* rear plate: the tail lamps */
    for (s = -1; s <= 1; s += 2) { B.vc.col = RED; box(B.vc, -2.80, -2.77, s * 1.10 - 0.05, s * 1.10 + 0.05, 0.86, 0.92); }
    /* team colour: a strip on the raised roof */
    box(B.team, -1.50, -1.32, -0.85, -0.20, HROOF2, HROOF2 + 0.02);
  }
  /* the HS.30 turret (H1): low and round, the front rounded down to the gun cradle drum */
  var HGY = 0.11, HGZ = 0.16;
  function rr(x, w, h) {
    return [[x, -w, 0], [x, w, 0], [x, w, h * 0.6], [x, w * 0.8, h], [x, -w * 0.8, h], [x, -w, h * 0.6]];
  }
  function addHs30Turret(B) {
    var P = B.paint, D = B.dark;
    loftN(P, [rr(0.55, 0.40, 0.10), rr(0.46, 0.50, 0.27), rr(0.30, 0.54, 0.39), rr(0.10, 0.55, 0.43), rr(-0.45, 0.52, 0.43), rr(-0.60, 0.44, 0.06)]);
    /* the gun cradle drum across the front (H1 front view: 0.69 m wide) */
    cylY(P, 0.47, -0.21, 0.47, HGZ + 0.02, 0.09, 14);
    /* the HS 820: recoil sleeve, the long barrel, the muzzle brake (H1: muzzle 3.18 m) */
    cylX(D, 0.53, 0.82, HGY, HGZ, 0.07, 0.065, 12);
    cylX(D, 0.82, 1.92, HGY, HGZ, 0.025, 0.023, 10);
    cylX(D, 1.92, 1.99, HGY, HGZ, 0.04, 0.04, 10);
    /* the sight and periscope heads on the roof, the hatch */
    box(P, 0.05, 0.22, -0.30, -0.10, 0.42, 0.50);
    B.vc.col = GLASS; box(B.vc, 0.22, 0.23, -0.28, -0.12, 0.44, 0.49);
    box(D, 0.10, 0.20, 0.12, 0.26, 0.42, 0.47);
    cylZ(P, -0.18, 0.08, 0.43, 0.47, 0.24, 16);
    box(D, -0.44, -0.38, -0.06, 0.22, 0.47, 0.50);
    /* team colour */
    box(B.team, -0.42, -0.30, -0.40, -0.10, 0.43, 0.445);
  }

  /* ================================================================ SPz 11-2 kurz */
  /* K1 at 174.3 px/m: X = (1390 - px) / 174.3, z = (420 - py) / 174.3 */
  var KG = { XW: [1.165, 0.574, -0.011, -0.614, -1.205], ZW: 0.316, RW: 0.26, RR: [0.878, 0.184, -0.843], RRZ: 0.815, RRR: 0.085,
             SPR: { x: 1.78, z: 0.69, r: 0.32 }, IDL: { x: -1.78, z: 0.66, r: 0.26 }, TY: 0.97, TW: 0.158 };
  var KROOF = 1.56, KTX = -0.42, KTY = 0.18;
  function kTop(x) { return x > 1.00 ? 1.06 + (2.18 - x) * (KROOF - 1.06) / 1.18 : KROOF; }
  /* the upper hull (K1 front view): sponsons +-1.14 from 1.04 m, the chamfer in to +-0.99 at 1.26 m,
     vertical sides to the roof */
  function kU8(x) {
    var zt = kTop(x);
    return [[x, -1.14, 1.04], [x, 1.14, 1.04], [x, 1.14, 1.12], [x, 0.99, 1.26], [x, 0.99, zt], [x, -0.99, zt], [x, -0.99, 1.26], [x, -1.14, 1.12]];
  }
  function kU6(x) {
    var zt = kTop(x), w = 1.12 - Math.max(0, zt - 1.12) / 0.14 * 0.13;
    return [[x, -1.14, 1.04], [x, 1.14, 1.04], [x, 1.14, Math.min(1.12, zt - 0.01)], [x, w, zt], [x, -w, zt], [x, -1.14, Math.min(1.12, zt - 0.01)]];
  }
  function addKurzHull(B) {
    var P = B.paint, D = B.dark, s, i, x, y, z, a;
    prismY(P, [[2.22, 1.04], [2.22, 0.95], [2.08, 0.72], [1.62, 0.30], [-1.62, 0.30], [-1.87, 0.70], [-1.87, 1.04]], -0.78, 0.78);
    loftN(P, [kU6(2.18), kU6(1.71)]);
    loftN(P, [kU8(1.70), kU8(1.00), kU8(-1.87)]);
    for (s = -1; s <= 1; s += 2) box(D, -1.87, 2.18, s > 0 ? 1.13 : -1.142, s > 0 ? 1.142 : -1.13, 1.03, 1.07);
    /* the headlamps in their hoop guards at the front corners (K1 front view) */
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.93; z = 0.99;
      cylX(P, 2.06, 2.22, y, z, 0.09, 0.09, 12);
      B.vc.col = LAMP; cylX(B.vc, 2.22, 2.23, y, z, 0.075, 0.075, 12);
      cyl(D, [2.10, y - 0.13, z - 0.10], [2.27, y - 0.13, z + 0.06], 0.014, 0.014, 6);
      cyl(D, [2.27, y - 0.13, z + 0.06], [2.27, y + 0.13, z + 0.06], 0.014, 0.014, 6);
      cyl(D, [2.27, y + 0.13, z + 0.06], [2.10, y + 0.13, z - 0.10], 0.014, 0.014, 6);
      box(D, 2.04, 2.16, s * 0.70 - 0.04, s * 0.70 + 0.04, 0.68, 0.78);
    }
    /* the driver's raised hatch plate front LEFT, the hatch and the periscopes (K1) */
    a = Math.atan((KROOF - 1.06) / 1.18);
    box(P, 0.40, 1.00, 0.11, 0.82, KROOF, KROOF + 0.04);
    onSlope(P, 1.10, 0.465, kTop(1.10), a, 0.10, 0.355, 0.02);
    cylZ(P, 0.69, 0.48, KROOF + 0.04, KROOF + 0.09, 0.26, 16);
    box(D, 0.40, 0.46, 0.30, 0.66, KROOF + 0.09, KROOF + 0.12);
    for (i = -1; i <= 1; i++) { B.vc.col = GLASS; box(B.vc, 0.96, 1.02, 0.48 + i * 0.12 - 0.04, 0.48 + i * 0.12 + 0.04, KROOF + 0.04, KROOF + 0.09); }
    /* the engine grille front RIGHT, the louvre strip along the right edge (K1 plan) */
    for (i = 0; i < 4; i++) { x = 0.22 + i * 0.065; box(D, x - 0.02, x + 0.02, -0.90, 0.06, KROOF, KROOF + 0.02); }
    for (i = 0; i < 8; i++) {
      x = 0.42 + i * 0.11;
      box(D, x - 0.03, x + 0.03, -1.10, -0.93, kTop(x) - 0.005, kTop(x) + 0.02);
    }
    /* the turret ring collar */
    cylZ(P, KTX, KTY, KROOF, KROOF + 0.03, 0.60, 22);
    /* the two big stowage bins hinged on the rear plate, leaning out at the bottom (K1 side and
       plan: X -1.87 to -2.25) */
    var d = [-0.44, 0, -0.78], L = Math.sqrt(d[0] * d[0] + d[2] * d[2]); d = [d[0] / L, 0, d[2] / L];
    var nn = [d[2], 0, -d[0]];
    for (s = -1; s <= 1; s += 2) {
      var cy = s > 0 ? 0.39 : -0.41;
      slab(P, [-2.08 - nn[0] * 0.09, cy, 1.22 - nn[2] * 0.09], d, [0, 1, 0], nn, L / 2, 0.26, 0.09);
      slab(D, [-2.08 + nn[0] * 0.005, cy, 1.22 + nn[2] * 0.005], d, [0, 1, 0], nn, L / 2 - 0.08, 0.02, 0.006);
    }
    for (s = -1; s <= 1; s += 2) { B.vc.col = RED; box(B.vc, -1.90, -1.86, s * 0.98 - 0.04, s * 0.98 + 0.04, 1.38, 1.46); }
    /* team colour: a strip on the rear roof */
    box(B.team, -1.75, -1.62, -0.55, 0.55, KROOF, KROOF + 0.015);
  }
  /* the SPz 11-2 turret (K1): sloped front, the roof rising to a tall rear, the gun cradle drum,
     three smoke dischargers on each rear cheek */
  var KGY = 0.18, KGZ = 0.30;
  function addKurzTurret(B) {
    var P = B.paint, D = B.dark, s, i, x;
    loftN(P, [rr(0.60, 0.50, 0.04), rr(0.19, 0.60, 0.36), rr(-0.20, 0.60, 0.46), rr(-0.47, 0.58, 0.53), rr(-0.60, 0.55, 0.50)]);
    cylY(P, 0.27, -0.23, 0.57, KGZ + 0.02, 0.09, 14);
    /* the HS 820 L/85: sleeve, barrel, muzzle brake (K1: muzzle X 1.51, i.e. 1.93 ahead of the ring) */
    cylX(D, 0.33, 0.94, KGY, KGZ, 0.05, 0.045, 12);
    cylX(D, 0.94, 1.86, KGY, KGZ, 0.022, 0.021, 10);
    cylX(D, 1.86, 1.93, KGY, KGZ, 0.036, 0.036, 10);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) {
        x = -0.30 - i * 0.12;
        cyl(D, [x - 0.04, s * 0.58, 0.36], [x + 0.06, s * 0.66, 0.48], 0.04, 0.04, 8);
      }
      box(D, -0.62, -0.24, s > 0 ? 0.56 : -0.62, s > 0 ? 0.62 : -0.56, 0.30, 0.35);
    }
    /* the sight head on the front of the roof, the hatch on the rear */
    box(P, -0.02, 0.16, -0.10, 0.14, 0.40, 0.50);
    B.vc.col = GLASS; box(B.vc, 0.16, 0.17, -0.08, 0.12, 0.42, 0.48);
    cylZ(P, -0.32, -0.12, 0.48, 0.53, 0.26, 16);
    box(D, -0.56, -0.50, -0.30, 0.06, 0.52, 0.56);
    box(B.team, 0.00, 0.12, 0.20, 0.45, 0.39, 0.405);
  }

  /* --------------------------------------------------------------- build */
  function group(THREE, name, x, y, z) { var g = new THREE.Group(); g.name = name; g.position.set(x, y, z); return g; }
  function buildLuchs(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    addLuchsHull(HB);
    flush(THREE, g, HB);
    for (i = 0; i < LX.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addLuchsAxle(WB);
      wg = group(THREE, "roadwheel", LX[i], 0, LZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    addLuchsTurret(TB);
    tg = group(THREE, "turret", LTX, 0, LROOF);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }
  function buildTracked(THREE, C, G, hull, turret, tx, ty, tz) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), RB = bins(T), i, wg, WB, tg;
    hull(HB);
    flush(THREE, g, HB);
    addTracks(RB, G);
    flush(THREE, g, RB);
    for (i = 0; i < G.XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addRoadWheel(WB, G);
      wg = group(THREE, "roadwheel", G.XW[i], 0, G.ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    turret(TB);
    tg = group(THREE, "turret", tx, ty, tz);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }
  return {
    luchs: buildLuchs,
    hs30: function (THREE, M, C) { return buildTracked(THREE, C, HG, addHs30Hull, addHs30Turret, HTX, HTY, HROOF); },
    kurz: function (THREE, M, C) { return buildTracked(THREE, C, KG, addKurzHull, addKurzTurret, KTX, KTY, KROOF); }
  };
})();

/* len: the measured X extent of each build */
UNIT_MODELS["deu_e60_recon"] = { len: 7.91, build: HeroDeuRecon.luchs };
UNIT_MODELS["deu_e50_recon"] = { len: 4.58, build: HeroDeuRecon.kurz };
UNIT_MODELS["deu_e50_ifv"] = { len: 5.98, build: HeroDeuRecon.hs30 };
