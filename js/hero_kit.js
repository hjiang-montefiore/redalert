/* ============================ js/hero_kit.js =============================
   HeroKit -- the ONE shared kit a hero model is assembled from (the BUILD
   stage of the hero pipeline: SPEC -> BUILD -> GATE -> RENDER -> REVIEW).

   Why: every js/hero file used to paste a private kit, so quality depended
   on which file was copied, draw calls drifted over 16 and zero-area
   triangles and markings were found by accident.  Here the proven parts of
   the best recent files are one API and the budget rules are enforced BY
   CONSTRUCTION:
     - geometry never becomes a mesh by hand: every triangle goes through a
       PEN into a per-material BIN of its frame, and K.finish() makes one
       mesh per material per frame, so detail costs triangles, not draw
       calls;
     - colour is a VERTEX colour on a handful of white materials (the
       Armour3D.tint rule): a new colour is free, a new material is not;
     - shapes come from MEASURED TABLES (stations, sections, planform rows):
       the table in a spec file goes straight into loftHull / loftBody /
       aerofoil / facetedHouse;
     - K.finish() THROWS on NaN, more than 16 draw calls or materials, and a
       missing contract node, and WARNS on zero-area triangles, geometry
       under z = 0, floating gear, a wrong length, too much team colour and
       names the engine does not know.

   MODEL SPACE (the house contract): +X nose/bow, +Y port, +Z up, METRES,
   ground or waterline at z = 0.  Angles in radians unless a name says deg.

   COLOUR SPACE.  Author every colour in sRGB (0xrrggbb or "#rrggbb").
   Material colours stay sRGB: render3d's prepModel converts them and tags
   the maps sRGB (nothing here sets userData._srgbDone).  Vertex colours are
   NOT converted by the engine, so the kit converts them to LINEAR when a
   pen is made (the Armour3D.tint rule).  Never push raw sRGB / 255 into a
   colour attribute.  The team colour is a material of its own whose colour
   is exactly C.team: that is how the engine recognises it (eraPaint,
   tagParts).  No text and no national markings: a paint canvas throws on
   fillText / strokeText.

   ENGINE CONTRACT (js/render3d.js), the names K.group() / K.node() make:
     turret      trained by the engine; origin on the ring, gun along +X
     roadwheel   each one spun about its own +Y axle; origin on the axle
     gear        an aircraft's undercarriage, hidden in flight
     rotor / tailrotor / rotordisc   turned about their own shaft
     helipad     an empty hidden node on the middle of a ship's pad
     podelev     a launcher's elevating pod; origin on the trunnion
     deploypose / travelpose   one of the two is shown (towed weapons)
     wingfold    origin on the hinge, userData.fold = { axis, angle }
     aar_*       tanker / receiver points (aar_boom, aar_pod_l, aar_recept ..)
   The engine scales a model by its MEASURED visible X extent, so a hidden
   node must carry no geometry that reaches past the silhouette.

   WHERE EACH TECHNIQUE CAME FROM (lifted, not invented):
     bins, pens, solid/hexa/cyl, lathe, lugged tyre, track belt round its
       wheels, sprocket, detail paint tile ... js/hero/redo_pla_roc_ground.js
     ear clipping, profile prisms, paint tile wrapping ... js/hero/us_m113.js
     fittings (rail, bollard, fairlead, hatch, vents, raft, ladder, anchor,
       whip, davit, RIB), weathering, faceted blocks with face panels and
       doors, the knuckled hull bands ......... js/hero/pla_destroyers_redo.js
     deck canvases with painted markings ....... js/hero/pla_carriers_redo.js
     lattice mast, dish, bar reflector, plating / deck / grille canvases
       ............................................... js/hero/ru_riga.js
     pressure hull with a knuckled casing, smooth grid skins
       ................................. js/hero/fr_navy_early.js HeroFrSubKit
     superellipse body rings, Catmull-Rom tables, smooth ring lofts, NACA
       aerofoil lofts, seam ribbons, blades, lamps, the projected four-band
       paint sheet ......... js/hero/us_ef111a.js, js/hero/nato_e80_fighter.js
     skirts with joints, hinge blocks and bolt rows, wheel nut rings
       .............................................. js/hero/nato_e90_mbt.js
     one mesh per material per frame, linear vertex colours
       ................................... js/armour3d.js (pack / tint / join)

   COMPACT REFERENCE
     K = HeroKit.begin(THREE, M, C, { category: "ship"|"sub"|"air"|"vehicle",
           paint: { name: 0xrrggbb }, len, maxDraw, strict, key })
     K.material(name, def)   K.pen(material, colour)   K.palette
     K.group(name, { at, visible, userData })   K.node(name, at)
     K.contract([names])   K.part(label)   K.finish() -> THREE.Group
     primitives (pen first): tri quad box obox boxZ hexa bar tube cylX cylY
       cylZ disc sphere prism loft gridSkin ribbon blade
     tables: K.loftHull K.loftSub K.loftBody K.aerofoil K.revolve
       K.extrudePoly K.facetedHouse
     paint: K.paintCanvas K.paintSheet K.teamStrip K.teamPatch
     K.ship.*  rail toeRail bollard cleat fairlead anchor hatch vent ladder
       boat davit raft scuttles whip latticeMast radar gunHouse door
     K.air.*   intake nozzle canopy gearLeg pylon seam hoop lamp pitot aerial
     K.veh.*   trackRun wheels skirt tool towCable lamp stowage hatch
       visionBlock smoke mudflap handle bolts
   Each function carries its own comment below.  ASCII only.  Needs only
   THREE; load it BEFORE the js/hero files.
========================================================================== */
var HeroKit = (function () {
  "use strict";
  var PI = Math.PI, TAU = PI * 2, D2R = PI / 180;
  var MAX_DRAW = 16;
  /* the names js/render3d.js looks up */
  var ENGINE_NAMES = { turret: 1, roadwheel: 1, gear: 1, rotor: 1, rotordisc: 1, tailrotor: 1, helipad: 1,
                       podelev: 1, deploypose: 1, travelpose: 1, wingfold: 1, mountwrap: 1 };

  /* ---------------------------------------------------------------- vectors */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function add(a, b, k) { k = k === undefined ? 1 : k; return [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function sgp(v, e) { return v < 0 ? -Math.pow(-v, e) : Math.pow(v, e); }
  /* two unit vectors square to the unit axis ax */
  function frame(ax) {
    var t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = unit(cross(ax, t));
    return [u, cross(ax, u)];
  }
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ----------------------------------------------------------------- tables
     A measured table is rows [x, a, b, ...] sorted on x.
     tab(rows, x)  Catmull-Rom through the rows  (fair lines: bodies, hulls)
     lin(rows, x)  piecewise linear              (straight-edged planforms)
     both return [a, b, ...] at x, clamped to the table's ends.            */
  function crom(p0, p1, p2, p3, t) {
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  function tab(rows, x) {
    var n = rows.length, i = 0, k, out = [];
    if (x <= rows[0][0]) return rows[0].slice(1);
    if (x >= rows[n - 1][0]) return rows[n - 1].slice(1);
    while (rows[i + 1][0] < x) i++;
    var a = rows[Math.max(i - 1, 0)], b = rows[i], c = rows[i + 1], d = rows[Math.min(i + 2, n - 1)];
    var t = (x - b[0]) / ((c[0] - b[0]) || 1);
    for (k = 1; k < b.length; k++) {
      var v = crom(a[k], b[k], c[k], d[k], t), lo = Math.min(b[k], c[k]), hi = Math.max(b[k], c[k]), sp = (hi - lo) * 0.15;
      out.push(clamp(v, lo - sp, hi + sp));           /* a fair line, but no wild overshoot */
    }
    return out;
  }
  function lin(rows, x) {
    var n = rows.length, i, k, out = [];
    if (x <= rows[0][0]) return rows[0].slice(1);
    if (x >= rows[n - 1][0]) return rows[n - 1].slice(1);
    for (i = 1; i < n; i++) if (x <= rows[i][0]) break;
    var a = rows[i - 1], b = rows[i], t = (x - a[0]) / ((b[0] - a[0]) || 1);
    for (k = 1; k < a.length; k++) out.push(a[k] + (b[k] - a[k]) * t);
    return out;
  }
  /* stations from x0 to x1 every `step`, plus the listed x (the table's own) */
  function stationsOf(x0, x1, step, extra, minGap) {
    var xs = [], x, n = Math.max(1, Math.round((x1 - x0) / step)), i;
    for (i = 0; i <= n; i++) xs.push(x0 + (x1 - x0) * i / n);
    (extra || []).forEach(function (e) { if (e > x0 && e < x1) xs.push(e); });
    xs.sort(function (a, b) { return a - b; });
    minGap = minGap === undefined ? step * 0.2 : minGap;
    var out = [xs[0]];
    for (i = 1; i < xs.length - 1; i++) if (xs[i] - out[out.length - 1] > minGap && x1 - xs[i] > minGap) out.push(xs[i]);
    out.push(x1);
    return out;
  }

  /* ----------------------------------------------------------------- colour */
  function hexOf(c) {
    if (typeof c === "number") return c;
    if (typeof c === "string" && c.charAt(0) === "#") {
      var h = c.slice(1);
      if (h.length === 3) h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2);
      return parseInt(h, 16);
    }
    if (c && c.isColor) return c.getHex();
    throw new Error("HeroKit: not a colour: " + c);
  }
  function s2l(u) { return u <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4); }
  /* sRGB hex -> LINEAR [r, g, b], the value a vertex colour must hold */
  function linearRGB(hex) {
    hex = hexOf(hex);
    return [s2l(((hex >> 16) & 255) / 255), s2l(((hex >> 8) & 255) / 255), s2l((hex & 255) / 255)];
  }
  function css(hex) { hex = hexOf(hex); return "#" + ("000000" + hex.toString(16)).slice(-6); }
  function rgba(hex, a) { hex = hexOf(hex); return "rgba(" + ((hex >> 16) & 255) + "," + ((hex >> 8) & 255) + "," + (hex & 255) + "," + a.toFixed(3) + ")"; }

  /* the default palette: fittings ask for these by name, a model's
     { paint: {...} } overrides or adds to them */
  var PALETTE = {
    common: { metal: 0x5f666c, steel: 0x6f757a, chrome: 0xb9bec2, dark: 0x25272a, ink: 0x121416, rubber: 0x17181a,
              white: 0xcfd2d0, wood: 0x6b5236, canvas: 0x5d5a45, burnt: 0x5d5751, glass: 0x16242b, seam: 0x4a5054,
              lampWhite: 0xfff2d0, lampRed: 0xc22a20, lampGreen: 0x1f9a4a, lampAmber: 0xd98a1e, rust: 0x5c341e, track: 0x2b2c2b },
    ship: { hull: 0x8f999f, under: 0x5a1e18, boot: 0x17191b, deck: 0x585f64, plate: 0x959fa5, raft: 0xd4d6d2, boat: 0x7d8589 },
    sub: { hull: 0x1c1f22, under: 0x1c1f22, boot: 0x17191b, deck: 0x202326, plate: 0x1f2225, raft: 0xd4d6d2, boat: 0x7d8589 },
    air: { skin: 0x7b858b, radome: 0x6a7378, under: 0x8a9499, frame: 0x565d62, strut: 0xc9ccca },
    vehicle: { paint: 0x4d5638, shade: 0x434c31, light: 0x58613f }
  };

  /* ------------------------------------------------------------- triangulate
     ear clipping of a simple polygon [[u, v], ...]; returns index triples,
     counter-clockwise (js/hero/us_m113.js)                                 */
  function area2(P) { var a = 0, i, n = P.length; for (i = 0; i < n; i++) { var p = P[i], q = P[(i + 1) % n]; a += p[0] * q[1] - q[0] * p[1]; } return a; }
  function earclip(P) {
    var n = P.length, idx = [], out = [], i, guard = 0;
    for (i = 0; i < n; i++) idx.push(i);
    if (area2(P) < 0) idx.reverse();
    function cr(a, b, c) { return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]); }
    function inside(p, a, b, c) { return cr(a, b, p) >= -1e-12 && cr(b, c, p) >= -1e-12 && cr(c, a, p) >= -1e-12; }
    while (idx.length > 3 && guard++ < 4000) {
      var cut = false;
      for (i = 0; i < idx.length; i++) {
        var ia = idx[(i + idx.length - 1) % idx.length], ib = idx[i], ic = idx[(i + 1) % idx.length], ok = true, k;
        if (cr(P[ia], P[ib], P[ic]) <= 1e-12) continue;
        for (k = 0; k < idx.length; k++) {
          var q = idx[k];
          if (q === ia || q === ib || q === ic) continue;
          if (inside(P[q], P[ia], P[ib], P[ic])) { ok = false; break; }
        }
        if (!ok) continue;
        out.push([ia, ib, ic]); idx.splice(i, 1); cut = true; break;
      }
      if (!cut) idx.splice(0, 1);                    /* a collinear run: drop a point and go on */
    }
    if (idx.length === 3) out.push([idx[0], idx[1], idx[2]]);
    return out;
  }

  /* =================================================================== BINS
     One Bin per material per frame.  A Pen is a bin plus a colour: the only
     way a triangle gets into a model.                                      */
  function Bin(def) { this.def = def; this.P = []; this.N = []; this.U = def.uv ? [] : null; this.C = def.vcol ? [] : null; this.n = 0; }
  function Pen(ctx, bin, col, mat) { this.ctx = ctx; this.bin = bin; this.col = col; this.mat = mat; }
  /* the same bin in another colour (sRGB hex or a palette name) */
  Pen.prototype.tint = function (col) { return new Pen(this.ctx, this.bin, this.ctx.colour(col), this.mat); };
  /* a triangle, wound counter-clockwise seen from outside; na/nb/nc are
     optional unit vertex normals (omitted: flat).  Returns false if the
     triangle was dropped as zero-area.  NaN throws.                        */
  Pen.prototype.tri = function (a, b, c, na, nb, nc) {
    var K = this.ctx, R = K.R, bin = this.bin, d = bin.def;
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var fx = uy * vz - uz * vy, fy = uz * vx - ux * vz, fz = ux * vy - uy * vx, l = Math.sqrt(fx * fx + fy * fy + fz * fz);
    if (!(l === l) || !isFinite(l)) throw new Error("HeroKit[" + R.key + "]: NaN vertex in part '" + R.label + "' (material " + this.mat + ")");
    if (l < 4e-6) {                                  /* under 2 mm2: draws nothing (dump.js counts these) */
      if (R.quiet > 0) R.stats.collapsed++;
      else { R.stats.degenerate++; R.stats.degAt[R.label] = (R.stats.degAt[R.label] || 0) + 1; }
      return false;
    }
    fx /= l; fy /= l; fz /= l;
    var V = [a, b, c], Nn = [na, nb, nc], i, q, n, o = K.off, g = K.org, P = bin.P, N = bin.N, U = bin.U, Cc = bin.C, uv = d.uv;
    for (i = 0; i < 3; i++) {
      q = V[i]; n = Nn[i];
      P.push(q[0] - o[0], q[1] - o[1], q[2] - o[2]);
      if (n) N.push(n[0], n[1], n[2]); else N.push(fx, fy, fz);
      if (Cc) Cc.push(this.col[0], this.col[1], this.col[2]);
      var mx = q[0] + g[0], my = q[1] + g[1], mz = q[2] + g[2];
      if (mz < K.zmin) K.zmin = mz;
      if (mz > K.zmax) K.zmax = mz;
      if (U) uvOf(U, uv, mx, my, mz, fx, fy, fz);
    }
    bin.n++;
    R.stats.area += l * 0.5;
    if (d.team) R.stats.teamArea += l * 0.5;
    return true;
  };
  /* texture coordinates, from MODEL coordinates and the face normal:
       tile   triplanar, scale [su, sv] per metre (a repeating paint tile)
       side   u = x / tileX, v from z0..z1 (a hull strake sheet, boot line)
       plan   u, v across the rectangle x0..x1, y0..y1 (a deck with markings;
              the canvas's top edge is +Y, port)
       sheet  the four-band projected paint sheet (above, port, starboard,
              below) of K.paintSheet                                        */
  function uvOf(U, uv, x, y, z, fx, fy, fz) {
    var ax = Math.abs(fx), ay = Math.abs(fy), az = Math.abs(fz);
    if (uv.mode === "tile") {
      if (az >= ax && az >= ay) U.push(x * uv.su, y * uv.sv);
      else if (ay >= ax) U.push(x * uv.su, z * uv.sv);
      else U.push(y * uv.su, z * uv.sv);
    } else if (uv.mode === "side") {
      U.push((ax > ay && ax > az ? y : x) / uv.tileX, (z - uv.z0) / (uv.z1 - uv.z0));
    } else if (uv.mode === "plan") {
      U.push((x - uv.x0) / (uv.x1 - uv.x0), (y - uv.y0) / (uv.y1 - uv.y0));
    } else {                                          /* sheet */
      var L = uv.L, endOn = ax > 0.85, band = endOn ? (fz < -0.3 ? 3 : 0) : (fz > 0.45 ? 0 : fz < -0.45 ? 3 : (fy >= 0 ? 1 : 2)), u, r;
      u = clamp((x - L.XMIN) * L.PX, 1, L.TW - 1);
      if (band === 0) r = clamp((L.YMAX - y) * L.PY, 1, L.TOPH - 1);
      else if (band === 3) r = L.B_BOT + clamp((L.YMAX - y) * L.PY, 1, L.TOPH - 1);
      else r = (band === 2 ? L.B_STBD : L.B_PORT) + clamp((L.ZMAX - z) * L.PZ, 1, L.SIDEH - 1);
      U.push(u / L.TW, 1 - r / L.TH);
    }
  }

  /* ============================================================= PRIMITIVES
     All take a pen first and emit outward-wound triangles.  `ref`, where
     given, is a point INSIDE the part: the face is turned away from it.   */
  function tri(p, a, b, c, ref) {
    if (ref) {
      var n = cross(sub(b, a), sub(c, a));
      var m = [(a[0] + b[0] + c[0]) / 3 - ref[0], (a[1] + b[1] + c[1]) / 3 - ref[1], (a[2] + b[2] + c[2]) / 3 - ref[2]];
      if (dot(n, m) < 0) return p.tri(a, c, b);
    }
    return p.tri(a, b, c);
  }
  function quad(p, a, b, c, d, ref) { tri(p, a, b, c, ref); tri(p, a, c, d, ref); }
  /* a closed solid from vertices V and faces F (index triples), turned
     outward by its signed volume; Nv optional vertex normals             */
  function solid(p, V, F, Nv) {
    var vol = 0, i, f, a, b, c, o = V[0];
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(sub(V[f[0]], o), cross(sub(V[f[1]], o), sub(V[f[2]], o))); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      p.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5], [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  /* eight corners: the bottom loop 0-3, the top loop 4-7 above it */
  function hexa(p, P) { solid(p, P, HEXF); }
  /* an axis-aligned box between two corners */
  function box(p, x0, x1, y0, y1, z0, z1) {
    hexa(p, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* an oriented box: centre c, unit axes ex ey ez, full sizes lx ly lz */
  function obox(p, c, ex, ey, ez, lx, ly, lz) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var a = s[i][0] * lx / 2, b = s[i][1] * ly / 2, e = s[i][2] * lz / 2;
      P.push([c[0] + ex[0] * a + ey[0] * b + ez[0] * e, c[1] + ex[1] * a + ey[1] * b + ez[1] * e, c[2] + ex[2] * a + ey[2] * b + ez[2] * e]);
    }
    hexa(p, P);
  }
  /* a box standing on z0 at (x, y), lx along its yaw, ly across */
  function boxZ(p, x, y, z0, lx, ly, lz, yaw) {
    var c = Math.cos(yaw || 0), s = Math.sin(yaw || 0);
    obox(p, [x, y, z0 + lz / 2], [c, s, 0], [-s, c, 0], [0, 0, 1], lx, ly, lz);
  }
  /* a rectangular bar from A to B, w across and h deep (h defaults to w) */
  function bar(p, A, B, w, h) {
    var d = sub(B, A), L = Math.sqrt(dot(d, d));
    if (L < 1e-6) return;
    var ax = unit(d), f = frame(ax);
    obox(p, mix(A, B, 0.5), ax, f[0], f[1], L, w, h === undefined ? w : h);
  }
  /* a tube from A to B: radius ra at A, rb at B, n sides; caps closes the
     ends; n >= 6 is smooth-shaded, fewer is faceted.  Thin 3-sided tubes
     (wires, rails) go to a double-sided material ("metal", "dull").       */
  function tube(p, A, B, ra, rb, n, caps) {
    var d = sub(B, A);
    if (dot(d, d) < 1e-10) return;
    rb = rb === undefined ? ra : rb; n = n || 8;
    var ax = unit(d), f = frame(ax), u = f[0], v = f[1], RA = [], RB = [], NR = [], i, j, sm = n >= 6;
    for (i = 0; i < n; i++) {
      var c = Math.cos(i / n * TAU + 0.5), s = Math.sin(i / n * TAU + 0.5);
      var r = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      RA.push(add(A, r, ra)); RB.push(add(B, r, rb)); NR.push(r);
    }
    var na = [-ax[0], -ax[1], -ax[2]];
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      if (ra > 0) p.tri(RA[i], RA[j], RB[j], sm && NR[i], sm && NR[j], sm && NR[j]);
      if (rb > 0) p.tri(RA[i], RB[j], RB[i], sm && NR[i], sm && NR[j], sm && NR[i]);
      if (caps) { if (rb > 0) p.tri(B, RB[i], RB[j], ax, ax, ax); if (ra > 0) p.tri(A, RA[j], RA[i], na, na, na); }
    }
  }
  function cylX(p, x0, x1, y, z, r, n, r1) { tube(p, [x0, y, z], [x1, y, z], r, r1 === undefined ? r : r1, n || 12, true); }
  function cylY(p, x, y0, y1, z, r, n, r1) { tube(p, [x, y0, z], [x, y1, z], r, r1 === undefined ? r : r1, n || 12, true); }
  function cylZ(p, x, y, z0, z1, r, n, r1) { tube(p, [x, y, z0], [x, y, z1], r, r1 === undefined ? r : r1, n || 12, true); }
  /* a flat disc at c facing nrm (a scuttle, a lens, a port) */
  function disc(p, c, nrm, r, n) {
    var a = unit(nrm), f = frame(a), P = [], i;
    n = n || 8;
    for (i = 0; i < n; i++) P.push(add(add(c, f[0], Math.cos(i / n * TAU) * r), f[1], Math.sin(i / n * TAU) * r));
    var back = add(c, a, -1);
    for (i = 1; i < n - 1; i++) tri(p, P[0], P[i], P[i + 1], back);
  }
  /* a sphere or a dome: centre c, radius r (or [rx, ry, rz]); la0..la1 the
     latitude range in radians (-PI/2 south pole .. PI/2 north pole)       */
  function sphere(p, c, r, ws, hs, la0, la1) {
    var rr = typeof r === "number" ? [r, r, r] : r, i, j, G = [], Nn = [];
    ws = ws || 12; hs = hs || 6; la0 = la0 === undefined ? -PI / 2 : la0; la1 = la1 === undefined ? PI / 2 : la1;
    for (i = 0; i <= hs; i++) {
      var la = la0 + (la1 - la0) * i / hs, row = [], nr = [];
      for (j = 0; j < ws; j++) {
        var lo = j / ws * TAU, d = [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)];
        row.push([c[0] + d[0] * rr[0], c[1] + d[1] * rr[1], c[2] + d[2] * rr[2]]);
        nr.push(unit([d[0] / rr[0], d[1] / rr[1], d[2] / rr[2]]));
      }
      G.push(row); Nn.push(nr);
    }
    p.ctx.R.quiet++;
    for (i = 0; i < hs; i++) for (j = 0; j < ws; j++) {
      var k = (j + 1) % ws;
      p.tri(G[i][j], G[i][k], G[i + 1][k], Nn[i][j], Nn[i][k], Nn[i + 1][k]);
      p.tri(G[i][j], G[i + 1][k], G[i + 1][j], Nn[i][j], Nn[i + 1][k], Nn[i + 1][j]);
    }
    p.ctx.R.quiet--;
  }
  /* a smooth skin through closed rings of [x, y, z] (all the same count).
     o: { capA, capB  close the first / last ring with a flat fan,
          flat        facet it (petals, plates) instead of smoothing,
          hard        smooth round each ring but crease between rings,
          inward      face the axis (the inside of a duct) }
     Rings may collapse to a point (a nose, a stem): the dead triangles are
     dropped without a warning.  (us_ef111a.js Shell.loft)                 */
  function loft(p, rings, o) {
    o = o || {};
    var R = rings.length, n = rings[0].length, r, i, j, cent = [], Nn = [], T = [], RR = p.ctx.R;
    for (r = 0; r < R; r++) {
      if (rings[r].length !== n) throw new Error("HeroKit: loft rings differ in point count (part '" + RR.label + "')");
      var cx = 0, cy = 0, cz = 0, row = [];
      for (i = 0; i < n; i++) { cx += rings[r][i][0]; cy += rings[r][i][1]; cz += rings[r][i][2]; row.push([0, 0, 0]); }
      cent.push([cx / n, cy / n, cz / n]); Nn.push(row);
    }
    function rad(q) { var s2 = 0, k; for (k = 0; k < n; k++) { var d = sub(rings[q][k], cent[q]); s2 += Math.sqrt(dot(d, d)); } return s2 / n; }
    function face(ra, ia, rb, ib, rc, ic, mc, od) {
      var a = rings[ra][ia], b = rings[rb][ib], c = rings[rc][ic], f = cross(sub(b, a), sub(c, a));
      if (dot(f, f) < 1.6e-11) { RR.stats.collapsed++; return; }
      var m = od || [(a[0] + b[0] + c[0]) / 3 - mc[0], (a[1] + b[1] + c[1]) / 3 - mc[1], (a[2] + b[2] + c[2]) / 3 - mc[2]];
      var flip = dot(f, m) < 0;
      if (o.inward) flip = !flip;
      if (flip) { f = [-f[0], -f[1], -f[2]]; T.push([ra, ia, rc, ic, rb, ib, r]); } else T.push([ra, ia, rb, ib, rc, ic, r]);
      [[ra, ia], [rb, ib], [rc, ic]].forEach(function (q) { var v = Nn[q[0]][q[1]]; v[0] += f[0]; v[1] += f[1]; v[2] += f[2]; });
    }
    function flush() {
      var k, t;
      for (k = 0; k < T.length; k++) {
        t = T[k];
        if (o.flat) p.tri(rings[t[0]][t[1]], rings[t[2]][t[3]], rings[t[4]][t[5]]);
        else p.tri(rings[t[0]][t[1]], rings[t[2]][t[3]], rings[t[4]][t[5]], unit(Nn[t[0]][t[1]]), unit(Nn[t[2]][t[3]]), unit(Nn[t[4]][t[5]]));
      }
      T = [];
    }
    RR.quiet++;
    for (r = 0; r + 1 < R; r++) {
      var mc = mix(cent[r], cent[r + 1], 0.5), od = null, dv = sub(cent[r + 1], cent[r]), qa = rad(r), qb = rad(r + 1);
      if (dot(dv, dv) < 1e-4 * Math.max(qa, qb) * Math.max(qa, qb)) {
        /* two rings in one plane (a wheel's side wall, a flange, a muzzle
           face): the face looks along the loft where the ring shrinks and
           back along it where the ring grows                               */
        var tv = r > 0 ? sub(cent[r], cent[r - 1]) : (r + 2 < R ? sub(cent[r + 2], cent[r + 1]) : null);
        if (tv && dot(tv, tv) > 1e-12) od = qb < qa ? tv : [-tv[0], -tv[1], -tv[2]];
      }
      for (i = 0; i < n; i++) { j = (i + 1) % n; face(r, i, r, j, r + 1, j, mc, od); face(r, i, r + 1, j, r + 1, i, mc, od); }
      if (o.hard) { flush(); for (i = 0; i < n; i++) { Nn[r][i] = [0, 0, 0]; Nn[r + 1][i] = [0, 0, 0]; } }
    }
    flush();
    function cap(ring, c, nb) {
      var od = sub(c, nb), k;
      if (o.inward) od = [-od[0], -od[1], -od[2]];
      for (k = 0; k < n; k++) {
        var a = ring[k], b = ring[(k + 1) % n], f = cross(sub(a, c), sub(b, c));
        if (dot(f, od) < 0) p.tri(c, b, a); else p.tri(c, a, b);
      }
    }
    if (o.capA) cap(rings[0], cent[0], cent[1]);
    if (o.capB) cap(rings[R - 1], cent[R - 1], cent[R - 2]);
    RR.quiet--;
  }
  /* a smooth OPEN skin over a grid G[i][j] of points (rows i, columns j),
     each face turned away from the axis point A[i] of its row (a hull band,
     a canopy, a casing).  o.flat facets it.  (fr_navy_early.js gridSkin)  */
  function gridSkin(p, G, A, o) {
    var m = G.length, n = G[0].length, i, j, N = [], T = [], RR = p.ctx.R;
    for (i = 0; i < m; i++) { N.push([]); for (j = 0; j < n; j++) N[i].push([0, 0, 0]); }
    function face(t, ax) {
      var a = G[t[0][0]][t[0][1]], b = G[t[1][0]][t[1][1]], c = G[t[2][0]][t[2][1]], f = cross(sub(b, a), sub(c, a));
      if (dot(f, f) < 1.6e-11) { RR.stats.collapsed++; return; }
      var mid = [(a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3, (a[2] + b[2] + c[2]) / 3];
      var flip = dot(f, sub(mid, ax)) < 0;
      if (o && o.inward) flip = !flip;
      if (flip) { t = [t[0], t[2], t[1]]; f = [-f[0], -f[1], -f[2]]; }
      t.forEach(function (q) { var v = N[q[0]][q[1]]; v[0] += f[0]; v[1] += f[1]; v[2] += f[2]; });
      T.push(t);
    }
    for (i = 0; i + 1 < m; i++) {
      var ax = mix(A[i], A[i + 1], 0.5);
      for (j = 0; j + 1 < n; j++) { face([[i, j], [i + 1, j], [i + 1, j + 1]], ax); face([[i, j], [i + 1, j + 1], [i, j + 1]], ax); }
    }
    RR.quiet++;
    T.forEach(function (t) {
      if (o && o.flat) p.tri(G[t[0][0]][t[0][1]], G[t[1][0]][t[1][1]], G[t[2][0]][t[2][1]]);
      else p.tri(G[t[0][0]][t[0][1]], G[t[1][0]][t[1][1]], G[t[2][0]][t[2][1]], unit(N[t[0][0]][t[0][1]]), unit(N[t[1][0]][t[1][1]]), unit(N[t[2][0]][t[2][1]]));
    });
    RR.quiet--;
  }
  /* a strip w wide along a polyline lying on a skin, lifted `lift` off it:
     panel seams, hinge lines, walkway edges, team bands.  nrm: one outward
     normal, one per point, or function (p) -> normal.  (nato_e80_fighter) */
  function ribbon(p, pts, nrm, w, lift) {
    var A = [], B = [], NN = [], i, n = pts.length;
    if (n < 2) return;
    lift = lift === undefined ? 0.012 : lift;
    for (i = 0; i < n; i++) {
      var q = pts[i], nn = unit(typeof nrm === "function" ? nrm(q, i) : (typeof nrm[0] === "number" ? nrm : nrm[i]));
      var t = sub(pts[Math.min(i + 1, n - 1)], pts[Math.max(i - 1, 0)]), s = unit(cross(t, nn)), c = add(q, nn, lift);
      A.push(add(c, s, w / 2)); B.push(add(c, s, -w / 2)); NN.push(nn);
    }
    for (i = 0; i + 1 < n; i++) {
      var f = cross(sub(B[i], A[i]), sub(B[i + 1], A[i]));
      if (dot(f, NN[i]) >= 0) { p.tri(A[i], B[i], B[i + 1], NN[i], NN[i], NN[i + 1]); p.tri(A[i], B[i + 1], A[i + 1], NN[i], NN[i + 1], NN[i + 1]); }
      else { p.tri(A[i], B[i + 1], B[i], NN[i], NN[i + 1], NN[i]); p.tri(A[i], A[i + 1], B[i + 1], NN[i], NN[i + 1], NN[i + 1]); }
    }
  }
  /* a tapered blade standing on base point b along `up`, chord along `fwd`:
     h tall, chord c0 at the root and c1 at the tip, th thick, the tip set
     back by rake (an aerial, a fence, a pylon, a fin)                     */
  function blade(p, b, up, fwd, h, c0, c1, th, rake) {
    up = unit(up); fwd = unit(fwd);
    var sd = unit(cross(up, fwd)), r = rake || 0, t = th / 2;
    function Q(f, u, s) { return [b[0] + fwd[0] * f + up[0] * u + sd[0] * s, b[1] + fwd[1] * f + up[1] * u + sd[1] * s, b[2] + fwd[2] * f + up[2] * u + sd[2] * s]; }
    hexa(p, [Q(-c0 / 2, 0, -t), Q(c0 / 2, 0, -t), Q(c0 / 2, 0, t), Q(-c0 / 2, 0, t),
             Q(-c1 / 2 - r, h, -t * 0.7), Q(c1 / 2 - r, h, -t * 0.7), Q(c1 / 2 - r, h, t * 0.7), Q(-c1 / 2 - r, h, t * 0.7)]);
  }
  /* a polygon [[u, v], ...] (any simple outline) extruded between a and b
     along the third axis.  plane: "xy" (u = x, v = y, extruded in z),
     "xz" (extruded in y: a side profile, a skirt plate), "yz" (in x).     */
  function prism(p, poly, plane, a, b) {
    var T = earclip(poly), n = poly.length, i, j;
    function P3(q, w) { return plane === "xz" ? [q[0], w, q[1]] : plane === "yz" ? [w, q[0], q[1]] : [q[0], q[1], w]; }
    var cu = 0, cv = 0;
    for (i = 0; i < n; i++) { cu += poly[i][0] / n; cv += poly[i][1] / n; }
    var ref = P3([cu, cv], (a + b) / 2);
    for (i = 0; i < T.length; i++) {
      tri(p, P3(poly[T[i][0]], a), P3(poly[T[i][1]], a), P3(poly[T[i][2]], a), P3(poly[T[i][0]], b));
      tri(p, P3(poly[T[i][0]], b), P3(poly[T[i][1]], b), P3(poly[T[i][2]], b), P3(poly[T[i][0]], a));
    }
    var ccw = area2(poly) > 0;
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      var A0 = P3(poly[i], a), B0 = P3(poly[j], a), B1 = P3(poly[j], b), A1 = P3(poly[i], b);
      /* the wall's outward side is fixed by the outline's winding, so a
         concave outline (a skirt with a cut-out) still faces out          */
      var e = [poly[j][0] - poly[i][0], poly[j][1] - poly[i][1]], o2 = ccw ? [e[1], -e[0]] : [-e[1], e[0]];
      var mid = [(poly[i][0] + poly[j][0]) / 2 - o2[0], (poly[i][1] + poly[j][1]) / 2 - o2[1]];
      quad(p, A0, B0, B1, A1, P3(mid, (a + b) / 2));
    }
    return ref;
  }

  /* ================================================================== PAINT
     Canvas textures are cached by key for the whole session (a model is
     rebuilt per team colour).  Every sheet is drawn near-WHITE: the paint
     colour comes from the vertex colours, the sheet only carries the seams,
     rivets, streaks and grime, so one sheet serves every colour.          */
  var TEX = {};
  function guardCtx(g) {
    g.fillText = g.strokeText = function () { throw new Error("HeroKit: no text, numbers or national markings on a paint canvas"); };
    return g;
  }
  function texOf(THREE, key, w, h, draw, clampEdge) {
    if (TEX[key] !== undefined) return TEX[key];
    var t = null;
    if (typeof document !== "undefined" && document.createElement) {
      var cv = document.createElement("canvas");
      cv.width = w; cv.height = h;
      draw(guardCtx(cv.getContext("2d")), w, h);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = clampEdge ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;       /* the canvas is sRGB */
      else if (THREE.SRGBColorSpace !== undefined) t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
    }
    TEX[key] = t;
    return t;
  }
  /* weathering over a painted canvas: rust runs, dark drips, salt bloom,
     grime patches (pla_destroyers_redo.js FK.weather)                     */
  function weather(g, w, h, seed, n, strength, rust) {
    var R = rng(seed), i, a = strength || 1;
    n = n || 30;
    for (i = 0; i < n * (rust === undefined ? 1 : rust); i++) {
      var x = R() * w, y = R() * h, l = h * (0.05 + R() * 0.22), gr = g.createLinearGradient(0, y, 0, y + l);
      gr.addColorStop(0, "rgba(92,52,30," + (0.30 * a).toFixed(3) + ")"); gr.addColorStop(1, "rgba(92,52,30,0)");
      g.fillStyle = gr; g.fillRect(x, y, 1 + R() * 2.2, l);
    }
    for (i = 0; i < n * 0.6; i++) {
      var x2 = R() * w, y2 = R() * h, l2 = h * (0.04 + R() * 0.14), g2 = g.createLinearGradient(0, y2, 0, y2 + l2);
      g2.addColorStop(0, "rgba(20,22,24," + (0.22 * a).toFixed(3) + ")"); g2.addColorStop(1, "rgba(20,22,24,0)");
      g.fillStyle = g2; g.fillRect(x2, y2, 1 + R() * 3, l2);
    }
    g.fillStyle = "#ffffff";
    for (i = 0; i < n * 0.4; i++) { g.globalAlpha = 0.04 * a + R() * 0.04 * a; g.fillRect(R() * w, R() * h, w * (0.03 + R() * 0.08), h * (0.02 + R() * 0.06)); }
    g.fillStyle = "#1a1c1e";
    for (i = 0; i < n * 0.4; i++) { g.globalAlpha = 0.04 * a + R() * 0.05 * a; g.fillRect(R() * w, R() * h, w * (0.04 + R() * 0.1), h * (0.01 + R() * 0.04)); }
    g.globalAlpha = 1;
  }
  /* paintCanvas(THREE, spec) -> a CanvasTexture (null without a document).
     spec, every part optional but key:
       key      cache key (give each distinct sheet its own)
       w, h     pixels (512 x 512)                clamp: true for a sheet
       base     "#f4f4f4"  the ground (near white: vertex colours tint it)
       blots    { n, size: [a, b] px, alpha, dark: share }  soft mottling
       panels   { cols, rows, stagger: px, alpha, lit: alpha, width }
                plate seams, a lit edge beside each
       rivets   { step: px, alpha }   bolt rows along every other seam
       hatches  { n }                 access panels with corner screws
       streaks  { n, len: [a, b] of h, alpha }      rain streaks
       rust     { n, strength }       rust runs, drips and salt (weather)
       grime    { n, alpha }          grime and dust patches
       chips    { n, alpha }          chipped paint, scratches
       oil      { n }                 oil and fuel spots
       bootTop  { v0, v1, color, alpha }  a scum band, rows v0..v1 of the
                height from the BOTTOM (with uv mode "side": the waterline)
       deckMarkings  function (g, w, h, m)  drawn last; m.x(metres) /
                m.y(metres) map deck metres to pixels when spec.plan =
                { x0, x1, y0, y1 } is given (uv mode "plan"); m.line,
                m.circle, m.rect take metres.  Lines and shapes only.     */
  function paintCanvas(THREE, spec) {
    var W = spec.w || 512, H = spec.h || 512;
    return texOf(THREE, "HK_" + spec.key, W, H, function (g, w, h) {
      var R = rng(spec.seed || 1), i, k, x, y, ox, oy;
      function wrapped(cx, cy, rad, fn) {
        for (ox = -w; ox <= w; ox += w) for (oy = -h; oy <= h; oy += h) {
          if (cx + ox < -rad || cx + ox > w + rad || cy + oy < -rad || cy + oy > h + rad) continue;
          fn(cx + ox, cy + oy);
        }
      }
      g.fillStyle = spec.base || "#f4f4f4"; g.fillRect(0, 0, w, h);
      var b = spec.blots;
      if (b) for (i = 0; i < (b.n || 40); i++) {
        var bw = (b.size ? b.size[0] : 26) + R() * ((b.size ? b.size[1] : 110) - (b.size ? b.size[0] : 26)), bh = bw * (0.4 + R() * 0.4), ba = R() * PI;
        g.fillStyle = R() < (b.dark === undefined ? 0.55 : b.dark) ? "#000000" : "#ffffff";
        g.globalAlpha = (b.alpha || 0.05) * (0.5 + R());
        wrapped(R() * w, R() * h, bw, function (px, py) { g.beginPath(); g.ellipse(px, py, bw, bh, ba, 0, TAU); g.fill(); });
      }
      g.globalAlpha = 1;
      var p = spec.panels, xs = [];
      if (p) {
        var cols = p.cols || 4, rows = p.rows || 2, la = p.alpha === undefined ? 0.40 : p.alpha, lit = p.lit === undefined ? 0.12 : p.lit, lw = p.width || 2;
        for (i = 0; i < cols; i++) xs.push(Math.floor(i * w / cols + (p.stagger === 0 ? 0 : 8 + R() * (p.stagger || w / cols * 0.5))) + 0.5);
        for (i = 0; i < cols; i++) {
          g.strokeStyle = "rgba(14,15,12," + la + ")"; g.lineWidth = lw;
          g.beginPath(); g.moveTo(xs[i], 0); g.lineTo(xs[i], h); g.stroke();
          g.strokeStyle = "rgba(255,252,235," + lit + ")"; g.lineWidth = 1;
          g.beginPath(); g.moveTo(xs[i] + lw, 0); g.lineTo(xs[i] + lw, h); g.stroke();
          y = Math.floor(h * 0.12 + R() * h * 0.25) + 0.5;
          for (k = 0; k < rows; k++) {
            var xa = xs[i], xb = i < cols - 1 ? xs[i + 1] : xs[0] + w;
            g.strokeStyle = "rgba(14,15,12," + (la * 0.9) + ")"; g.lineWidth = lw;
            g.beginPath(); g.moveTo(xa, y); g.lineTo(xb, y); g.stroke();
            g.beginPath(); g.moveTo(xa - w, y); g.lineTo(xb - w, y); g.stroke();
            g.strokeStyle = "rgba(255,252,235," + (lit * 0.85) + ")"; g.lineWidth = 1;
            g.beginPath(); g.moveTo(xa, y + lw); g.lineTo(xb, y + lw); g.stroke();
            if (spec.rivets && (i + k) % 2 === 0) for (x = xa + 8; x < xb - 4; x += (spec.rivets.step || 15)) {
              g.fillStyle = "rgba(12,12,8," + (spec.rivets.alpha || 0.45) + ")"; g.fillRect(x % w, y - 6, 3, 3);
              g.fillStyle = "rgba(255,250,225,0.18)"; g.fillRect(x % w, y - 7, 2, 1);
            }
            y = (y + h / rows + Math.floor(R() * h * 0.12)) % h;
          }
        }
      }
      if (spec.hatches) for (i = 0; i < (spec.hatches.n || 6); i++) {
        x = Math.floor(R() * (w - 90)) + 10.5; y = Math.floor(R() * (h - 70)) + 10.5;
        var pw = 26 + Math.floor(R() * 60), ph = 18 + Math.floor(R() * 44);
        g.strokeStyle = "rgba(14,15,10,0.36)"; g.lineWidth = 1.5; g.strokeRect(x, y, pw, ph);
        g.strokeStyle = "rgba(255,250,225,0.10)"; g.lineWidth = 1; g.strokeRect(x + 1.5, y + 1.5, pw, ph);
        g.fillStyle = "rgba(12,12,8,0.5)";
        g.fillRect(x + 3, y + 3, 2, 2); g.fillRect(x + pw - 5, y + 3, 2, 2); g.fillRect(x + 3, y + ph - 5, 2, 2); g.fillRect(x + pw - 5, y + ph - 5, 2, 2);
      }
      var s = spec.streaks;
      if (s) for (i = 0; i < (s.n || 200); i++) {
        g.fillStyle = (i % 4) ? "rgba(18,16,10," + (s.alpha || 0.08) + ")" : "rgba(235,230,205," + ((s.alpha || 0.08) * 0.75) + ")";
        g.fillRect(R() * w, R() * h, 1 + R() * 2, h * ((s.len ? s.len[0] : 0.02) + R() * ((s.len ? s.len[1] : 0.11) - (s.len ? s.len[0] : 0.02))));
      }
      if (spec.rust) weather(g, w, h, (spec.seed || 1) + 77, spec.rust.n || 24, spec.rust.strength || 0.6, spec.rust.runs);
      var gm = spec.grime;
      if (gm) for (i = 0; i < (gm.n || 70); i++) {
        g.fillStyle = (i % 3) ? "rgba(30,25,15," + (gm.alpha || 0.08) + ")" : "rgba(150,135,100," + (gm.alpha || 0.08) + ")";
        g.beginPath(); g.ellipse(R() * w, R() * h, 8 + R() * 46, 4 + R() * 22, R() * PI, 0, TAU); g.fill();
      }
      var c = spec.chips;
      if (c) {
        for (i = 0; i < (c.n || 180); i++) {
          g.fillStyle = (i % 2) ? "rgba(225,220,200," + (c.alpha || 0.22) + ")" : "rgba(10,10,8," + ((c.alpha || 0.22) * 1.3) + ")";
          k = 1 + Math.floor(R() * 3); g.fillRect(R() * w, R() * h, k, k);
        }
        g.strokeStyle = "rgba(225,220,200,0.14)"; g.lineWidth = 1;
        for (i = 0; i < (c.n || 180) / 12; i++) { x = R() * w; y = R() * h; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (R() - 0.5) * 40, y + (R() - 0.5) * 14); g.stroke(); }
      }
      if (spec.oil) for (i = 0; i < (spec.oil.n || 8); i++) {
        g.fillStyle = "rgba(12,10,6,0.16)";
        g.beginPath(); g.ellipse(R() * w, R() * h, 5 + R() * 12, 4 + R() * 9, 0, 0, TAU); g.fill();
      }
      var bt = spec.bootTop;
      if (bt) {
        var y1 = h * (1 - bt.v1), y0 = h * (1 - bt.v0), gr = g.createLinearGradient(0, y1 - (y0 - y1) * 0.8, 0, y0);
        gr.addColorStop(0, rgba(bt.color || 0x30342c, 0)); gr.addColorStop(0.45, rgba(bt.color || 0x30342c, bt.alpha || 0.45)); gr.addColorStop(1, rgba(bt.color || 0x30342c, (bt.alpha || 0.45) * 0.8));
        g.fillStyle = gr; g.fillRect(0, y1 - (y0 - y1) * 0.8, w, (y0 - y1) * 1.8);
        for (i = 0; i < 60; i++) { g.fillStyle = "rgba(210,215,205,0.10)"; g.fillRect(R() * w, y1 - (y0 - y1) * R(), 6 + R() * 30, 1 + R() * 2); }
      }
      if (spec.deckMarkings) {
        var pl = spec.plan || { x0: 0, x1: w, y0: 0, y1: h };
        var m = {
          x: function (mx) { return (mx - pl.x0) / (pl.x1 - pl.x0) * w; },
          y: function (my) { return (pl.y1 - my) / (pl.y1 - pl.y0) * h; },
          px: w / (pl.x1 - pl.x0),
          /* a painted line through deck points [[x, y], ...], wide metres */
          line: function (pts, wide, col, dash) {
            g.strokeStyle = col || "rgba(235,235,225,0.85)"; g.lineWidth = Math.max(1, (wide || 0.2) * m.px);
            if (g.setLineDash) g.setLineDash(dash ? [dash[0] * m.px, dash[1] * m.px] : []);
            g.beginPath();
            pts.forEach(function (q, n) { if (n) g.lineTo(m.x(q[0]), m.y(q[1])); else g.moveTo(m.x(q[0]), m.y(q[1])); });
            g.stroke();
            if (g.setLineDash) g.setLineDash([]);
          },
          circle: function (cx, cy, r, wide, col) {
            g.strokeStyle = col || "rgba(235,235,225,0.85)"; g.lineWidth = Math.max(1, (wide || 0.2) * m.px);
            g.beginPath(); g.ellipse(m.x(cx), m.y(cy), r * m.px, r * h / (pl.y1 - pl.y0), 0, 0, TAU); g.stroke();
          },
          rect: function (xa, ya, xb, yb, col) {
            g.fillStyle = col || "rgba(20,22,24,0.25)";
            g.fillRect(Math.min(m.x(xa), m.x(xb)), Math.min(m.y(ya), m.y(yb)), Math.abs(m.x(xb) - m.x(xa)), Math.abs(m.y(yb) - m.y(ya)));
          }
        };
        spec.deckMarkings(g, w, h, m);
        g.globalAlpha = 1;
      }
    }, !!spec.clamp);
  }
  /* the stock sheets (tints come from the vertex colours) */
  var STOCK = {
    /* ship's side plating: one tile is 24 m x 8 m (ru_riga / pla_destroyers hullTex) */
    hull: { key: "hull", w: 512, h: 256, seed: 9055, panels: { cols: 6, rows: 3, alpha: 0.16, lit: 0.06, width: 1.3, stagger: 18 },
            blots: { n: 44, size: [10, 60], alpha: 0.04 }, streaks: { n: 90, len: [0.06, 0.3], alpha: 0.05 }, rust: { n: 28, strength: 0.6 } },
    /* superstructure plate: 4 m tile */
    plate: { key: "plate", w: 256, h: 256, seed: 9057, panels: { cols: 4, rows: 3, alpha: 0.17, lit: 0.06, width: 1.4, stagger: 0 },
             blots: { n: 26, size: [12, 50], alpha: 0.04, dark: 0.5 }, rust: { n: 18, strength: 0.7 } },
    /* non-slip deck: 4 m tile */
    deck: { key: "deck", w: 256, h: 256, seed: 9059, panels: { cols: 3, rows: 5, alpha: 0.16, lit: 0.04, width: 1, stagger: 30 },
            blots: { n: 40, size: [20, 60], alpha: 0.07 }, grime: { n: 30, alpha: 0.06 }, rust: { n: 14, strength: 0.6, runs: 0.3 } },
    /* vehicle paint: 512 px over 2.94 m (0.34 a metre) (redo_pla_roc_ground detailTex) */
    detail: { key: "detail", w: 512, h: 512, seed: 1996, blots: { n: 40, size: [26, 116], alpha: 0.07 },
              panels: { cols: 4, rows: 2, alpha: 0.42, lit: 0.12, width: 2 }, rivets: { step: 15, alpha: 0.45 }, hatches: { n: 6 },
              streaks: { n: 260, len: [0.016, 0.12], alpha: 0.08 }, grime: { n: 70, alpha: 0.08 }, chips: { n: 180, alpha: 0.22 }, oil: { n: 8 } }
  };
  /* the aircraft paint SHEET: four bands on 1024 x 2048 - from above (x, y),
     the port side (x, z), the starboard side (x, z), from below (x, y) -
     laid over the skin by projected UVs (uv mode "sheet").
     layout: bounds { x0, x1, ymax, z0, z1 } in metres, a little outside the
     airframe.  (us_ef111a.js / nato_e80_fighter.js DK.layout, DK.sheet)   */
  function sheetLayout(b) {
    var TW = 1024, TH = 2048, PX = (TW - 4) / (b.x1 - b.x0);
    var PY = Math.min(PX * 1.6, 620 / (2 * b.ymax)), PZ = Math.min(PX * 1.6, 300 / (b.z1 - b.z0));
    var TOPH = Math.ceil(2 * b.ymax * PY) + 2, SIDEH = Math.ceil((b.z1 - b.z0) * PZ) + 2;
    var B_PORT = TOPH + 4, B_STBD = B_PORT + SIDEH + 4, B_BOT = B_STBD + SIDEH + 4;
    return { TW: TW, TH: TH, PX: PX, PY: PY, PZ: PZ, XMIN: b.x0, YMAX: b.ymax, ZMAX: b.z1,
             TOPH: TOPH, SIDEH: SIDEH, B_PORT: B_PORT, B_STBD: B_STBD, B_BOT: B_BOT };
  }
  function sheetTex(THREE, L, spec) {
    return texOf(THREE, "HK_sheet_" + spec.key, L.TW, L.TH, function (g) {
      var R = rng(spec.seed || 7), i, j, sd;
      function U(x) { return (x - L.XMIN) * L.PX; }
      function RT(y) { return (L.YMAX - y) * L.PY; }
      function RB(y) { return L.B_BOT + (L.YMAX - y) * L.PY; }
      function RS(z, s) { return (s ? L.B_STBD : L.B_PORT) + (L.ZMAX - z) * L.PZ; }
      g.fillStyle = "#f2f2f2"; g.fillRect(0, 0, L.TW, L.TH);
      for (i = 0; i < (spec.grime === undefined ? 160 : spec.grime); i++) {
        g.fillStyle = R() < 0.6 ? "rgba(40,40,40," + (0.03 + R() * 0.04) + ")" : "rgba(255,255,255,0.05)";
        g.beginPath(); g.ellipse(R() * L.TW, R() * L.TH, 4 + R() * 26, 2 + R() * 9, 0, 0, TAU); g.fill();
      }
      var sa = spec.seam === undefined ? 0.55 : spec.seam, LINE = "rgba(30,32,34," + sa + ")", FAINT = "rgba(30,32,34," + (sa * 0.45) + ")";
      function path(pts, map, col, lw, dash) {
        g.strokeStyle = col || LINE; g.lineWidth = lw || 1.2;
        if (g.setLineDash) g.setLineDash(dash || []);
        g.beginPath();
        for (var k = 0; k < pts.length; k++) { var q = map(pts[k]); if (k) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]); }
        g.stroke();
        if (g.setLineDash) g.setLineDash([]);
      }
      var mirror = spec.mirror !== false;
      function both(list, fT, col, lw, dash) {
        for (j = 0; j < (list || []).length; j++) { path(list[j], fT(1), col, lw, dash); if (mirror) path(list[j], fT(-1), col, lw, dash); }
      }
      both(spec.top, function (m) { return function (q) { return [U(q[0]), RT(m * q[1])]; }; });
      both(spec.bot, function (m) { return function (q) { return [U(q[0]), RB(m * q[1])]; }; });
      both(spec.rivets, function (m) { return function (q) { return [U(q[0]), RT(m * q[1])]; }; }, FAINT, 1, [1, 3]);
      both(spec.rivetsBot, function (m) { return function (q) { return [U(q[0]), RB(m * q[1])]; }; }, FAINT, 1, [1, 3]);
      for (j = 0; j < (spec.side || []).length; j++) for (sd = 0; sd < 2; sd++)
        path(spec.side[j], (function (s) { return function (q) { return [U(q[0]), RS(q[1], s)]; }; })(sd));
      for (j = 0; j < (spec.frames || []).length; j++) {
        var f = spec.frames[j], x = U(f[0]);
        g.strokeStyle = LINE; g.lineWidth = 1.2;
        g.beginPath(); g.moveTo(x, RT(f[1])); g.lineTo(x, RT(-f[1])); g.stroke();
        g.beginPath(); g.moveTo(x, RB(f[1])); g.lineTo(x, RB(-f[1])); g.stroke();
        for (sd = 0; sd < 2; sd++) { g.beginPath(); g.moveTo(x, RS(L.ZMAX, sd)); g.lineTo(x, RS(L.ZMAX - L.SIDEH / L.PZ, sd)); g.stroke(); }
      }
      for (j = 0; j < (spec.walk || []).length; j++) for (sd = 1; sd >= (mirror ? -1 : 1); sd -= 2) {
        var wk = spec.walk[j];
        g.fillStyle = "rgba(20,22,24,0.16)"; g.beginPath();
        for (i = 0; i < wk.length; i++) { if (i) g.lineTo(U(wk[i][0]), RT(sd * wk[i][1])); else g.moveTo(U(wk[i][0]), RT(sd * wk[i][1])); }
        g.closePath(); g.fill();
      }
      for (j = 0; j < (spec.soot || []).length; j++) {            /* [x, y, z, length aft, half width] */
        var s = spec.soot[j], xa = U(s[0]), xb = U(s[0] - s[3]), hw = s[4] * L.PY, grd = g.createLinearGradient(xa, 0, xb, 0);
        grd.addColorStop(0, "rgba(25,22,20,0.55)"); grd.addColorStop(1, "rgba(25,22,20,0)");
        g.fillStyle = grd;
        [1, mirror ? -1 : 1].forEach(function (m, n) {
          if (n && !mirror) return;
          g.fillRect(xb, RT(m * s[1]) - hw, xa - xb, 2 * hw); g.fillRect(xb, RB(m * s[1]) - hw, xa - xb, 2 * hw);
        });
        for (sd = 0; sd < 2; sd++) g.fillRect(xb, RS(s[2], sd) - s[4] * L.PZ, xa - xb, 2 * s[4] * L.PZ);
      }
    }, true);
  }

  /* ================================================================ CONTEXT */
  function Root(THREE, M, C, o) {
    this.THREE = THREE; this.M = M; this.C = C || {}; this.o = o || {};
    this.cat = this.o.category || "vehicle"; this.key = this.o.key || "?";
    this.P = {}; this.mats = {}; this.order = [];
    this.stats = { degenerate: 0, degAt: {}, collapsed: 0, area: 0, teamArea: 0 };
    this.names = {}; this.need = []; this.label = "model"; this.quiet = 0; this.warnings = []; this.done = false;
  }
  function Ctx(R, parent, node, off, org, name, visible) {
    this.R = R; this.parent = parent; this.grp = node; this.off = off; this.org = org; this.name = name || "";
    this.visible = visible !== false; this.bins = {}; this.kids = []; this.zmin = Infinity; this.zmax = -Infinity;
    this.palette = R.P;
    this.ship = bind(this, SHIP); this.air = bind(this, AIR); this.veh = bind(this, VEH);
  }
  function bind(K, kit) {
    var o = {}, k;
    for (k in kit) if (kit.hasOwnProperty(k)) o[k] = (function (f) {
      return function () { var a = [K], i; for (i = 0; i < arguments.length; i++) a.push(arguments[i]); return f.apply(null, a); };
    })(kit[k]);
    return o;
  }
  /* begin(THREE, M, C, o) -> the root context K.
     o.category  "ship" | "sub" | "air" | "vehicle": the stock materials,
                 the palette and which ground checks finish() runs
     o.paint     { name: sRGB hex } palette entries (hull, deck, skin,
                 paint, ...) the pens and fittings ask for by name
     o.key       the UNIT_MODELS key, for messages
     o.len       the published length: finish() warns if the model's X
                 extent is more than 2 % off
     o.maxDraw   draw-call budget (16)      o.strict  warnings throw too
     Stock materials (made only if used): every category has
       dull   vertex-coloured matt paint, double-sided (rubber, ink, seams)
       metal  vertex-coloured bare metal, double-sided (rails, wires, tools)
       glass  dark glazing          lamp   emissive, vertex-coloured
       team   the team colour (C.team), double-sided
     and ship/sub: hull (plating sheet) plate (superstructure) deck;
     air: skin (give it a sheet with K.paintSheet); vehicle: paint.        */
  function begin(THREE, M, C, o) {
    var R = new Root(THREE, M, C, o), k, cat = R.cat;
    if (!PALETTE[cat]) throw new Error("HeroKit.begin: category must be ship, sub, air or vehicle, not " + cat);
    [PALETTE.common, PALETTE[cat], R.o.paint || {}].forEach(function (src) { for (k in src) if (src.hasOwnProperty(k)) R.P[k] = hexOf(src[k]); });
    var node = new THREE.Group(), K = new Ctx(R, null, node, [0, 0, 0], [0, 0, 0], "", true);
    R.root = K;
    K.material("dull", { vcol: true, rough: 0.9, metal: 0.05, side: "double" });
    K.material("metal", { vcol: true, rough: 0.5, metal: 0.5, side: "double" });
    K.material("glass", { color: R.P.glass, rough: 0.12, metal: 0.35, side: "double" });
    K.material("lamp", { vcol: true, rough: 0.3, metal: 0, emissive: 0x333333, emissiveIntensity: 0.6 });
    K.material("team", { color: R.C.team !== undefined ? R.C.team : 0x3f7fd0, rough: 0.7, metal: 0.1, side: "double", team: true });
    if (cat === "ship" || cat === "sub") {
      K.material("hull", { vcol: true, rough: 0.86, metal: 0.06, map: STOCK.hull, uv: { mode: "tile", su: 1 / 24, sv: 1 / 8 } });
      K.material("plate", { vcol: true, rough: 0.86, metal: 0.06, map: STOCK.plate, uv: { mode: "tile", su: 0.25, sv: 0.25 } });
      K.material("deck", { vcol: true, rough: 0.95, metal: 0.04, map: STOCK.deck, uv: { mode: "tile", su: 0.25, sv: 0.25 } });
    } else if (cat === "air") {
      K.material("skin", { vcol: true, rough: 0.82, metal: 0.08, side: "double" });
    } else {
      K.material("paint", { vcol: true, rough: 0.9, metal: 0.05, map: STOCK.detail, uv: { mode: "tile", su: 0.34, sv: 0.34 } });
    }
    return K;
  }
  var CP = Ctx.prototype;
  /* material(name, def): define or replace a material (before its first
     pen).  def: { vcol: true (white, tinted per pen) | color: sRGB hex,
       rough, metal, side: "double", emissive, emissiveIntensity,
       map: a texture, or a paintCanvas spec,
       uv: { mode: "tile", su, sv } | { mode: "side", tileX, z0, z1 } |
           { mode: "plan", x0, x1, y0, y1 } }
     Every material used costs one draw call per frame it is used in.      */
  CP.material = function (name, def) {
    var R = this.R;
    if (R.mats[name] && R.mats[name].used) throw new Error("HeroKit: material '" + name + "' is already in use; define it before its first pen");
    if (!R.mats[name]) R.order.push(name);
    var d = { name: name, def: def, vcol: !!def.vcol, team: !!def.team, uv: def.map ? (def.uv || { mode: "tile", su: 0.25, sv: 0.25 }) : null, mat: null, used: false };
    R.mats[name] = d;
    return this;
  };
  function realise(R, d) {
    var T = R.THREE, f = d.def, o = { roughness: f.rough === undefined ? 0.85 : f.rough, metalness: f.metal === undefined ? 0.06 : f.metal }, map = f.map;
    o.color = d.vcol ? 0xffffff : new T.Color(f.color === undefined ? 0xffffff : f.color);
    if (d.vcol) o.vertexColors = true;
    if (f.side === "double") o.side = T.DoubleSide;
    if (f.emissive !== undefined) { o.emissive = f.emissive; o.emissiveIntensity = f.emissiveIntensity === undefined ? 1 : f.emissiveIntensity; }
    var m = new T.MeshStandardMaterial(o);
    if (map && !map.isTexture) map = paintCanvas(T, map);
    if (map) m.map = map; else d.uv = null;           /* no document: plain paint, no UVs */
    m.name = "hk_" + d.name;
    if (d.team) m.userData.team = true;
    d.mat = m; d.used = true;
  }
  /* colour(c): a palette name or an sRGB hex -> the LINEAR vertex colour */
  CP.colour = function (c) {
    if (typeof c === "string" && c.charAt(0) !== "#") {
      if (this.R.P[c] === undefined) throw new Error("HeroKit: no palette colour '" + c + "' (give it in begin's paint)");
      c = this.R.P[c];
    }
    return linearRGB(c);
  };
  /* pen(material, colour): the sink every primitive and fitting draws
     with.  colour: sRGB hex, "#rrggbb" or a palette name; default the
     palette entry named like the material, else white.  On a material that
     is not vertex-coloured (glass, team) the colour is ignored.           */
  CP.pen = function (mat, col) {
    var R = this.R, d = R.mats[mat];
    if (R.done) throw new Error("HeroKit: pen() after finish()");
    if (!d) throw new Error("HeroKit: no material '" + mat + "' (K.material defines one)");
    if (!d.used) realise(R, d);
    var b = this.bins[mat] || (this.bins[mat] = new Bin(d));
    return new Pen(this, b, this.colour(col !== undefined ? col : (R.P[mat] !== undefined ? R.P[mat] : 0xffffff)), mat);
  };
  /* part(label): names what is being built, for error messages */
  CP.part = function (label) { this.R.label = label; return this; };
  /* group(name, o): a named frame the engine animates, with bins of its
     own (so it costs one draw call per material used in it).  o.at is the
     frame's origin in MODEL coordinates (a turret's ring centre, an axle,
     a hinge); everything drawn through the returned context is still given
     in model coordinates - the kit moves it into the frame.  o.visible:
     false for the pose that starts hidden; o.userData is copied on.       */
  CP.group = function (name, o) {
    o = o || {};
    var R = this.R, T = R.THREE, at = o.at || [this.off[0], this.off[1], this.off[2]], g = new T.Group();
    if (name) {
      g.name = name; R.names[name] = (R.names[name] || 0) + 1;
      if (!ENGINE_NAMES[name] && name.indexOf("aar_") !== 0) this.warn("group '" + name + "' is not a name the engine animates: it only costs draw calls");
    }
    g.position.set(at[0] - this.off[0], at[1] - this.off[1], at[2] - this.off[2]);
    if (o.visible === false) g.visible = false;
    if (o.userData) for (var k in o.userData) if (o.userData.hasOwnProperty(k)) g.userData[k] = o.userData[k];
    this.grp.add(g);
    var c = new Ctx(R, this, g, [at[0], at[1], at[2]], [0, 0, 0], name, o.visible !== false && this.visible);
    this.kids.push(c);
    return c;
  };
  /* node(name, at): an empty hidden marker (helipad, aar_recept, ...) */
  CP.node = function (name, at) {
    var R = this.R, n = new R.THREE.Object3D();
    n.name = name; n.visible = false;
    n.position.set(at[0] - this.off[0], at[1] - this.off[1], at[2] - this.off[2]);
    this.grp.add(n); R.names[name] = (R.names[name] || 0) + 1;
    return n;
  };
  /* contract(names): the named nodes this unit's row needs (a turret:true
     row needs "turret", an aircraft "gear" ...).  finish() throws if one
     is missing, so a model cannot silently lose its animation.            */
  CP.contract = function (names) { var R = this.R; [].concat(names).forEach(function (n) { R.need.push(n); }); return this; };
  CP.warn = function (msg) {
    var R = this.R;
    if (R.o.strict) throw new Error("HeroKit[" + R.key + "]: " + msg);
    R.warnings.push(msg);
  };
  /* finish(): one mesh per material per frame, then the guards.  Returns
     the root THREE.Group; root.userData.heroKit is the report { key, tris,
     drawCalls, meshes, materials, hiddenMeshes, bbox, perMaterial, groups,
     collapsed, degenerate, teamShare, warnings }.  HeroKit.onReport(report)
     is called if set (the gate hooks it).                                 */
  CP.finish = function () {
    var R = this.R, T = R.THREE, K = this;
    if (this.parent) throw new Error("HeroKit: finish() belongs to the root context");
    if (R.done) throw new Error("HeroKit: finish() called twice");
    R.done = true;
    var rep = { key: R.key, category: R.cat, tris: 0, meshes: 0, drawCalls: 0, hiddenMeshes: 0, materials: 0, perMaterial: {}, groups: R.names,
                collapsed: R.stats.collapsed, degenerate: R.stats.degenerate, warnings: R.warnings };
    var used = {}, bb = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] }, gearZ = Infinity, wheelZ = Infinity;
    (function emit(c) {
      R.order.forEach(function (name) {
        var b = c.bins[name];
        if (!b || !b.n) return;
        var g = new T.BufferGeometry();
        g.setAttribute("position", new T.BufferAttribute(new Float32Array(b.P), 3));
        g.setAttribute("normal", new T.BufferAttribute(new Float32Array(b.N), 3));
        if (b.U) g.setAttribute("uv", new T.BufferAttribute(new Float32Array(b.U), 2));
        if (b.C) g.setAttribute("color", new T.BufferAttribute(new Float32Array(b.C), 3));
        var m = new T.Mesh(g, b.def.mat);
        m.castShadow = true; m.receiveShadow = true;
        c.grp.add(m);
        used[name] = 1; rep.meshes++; rep.tris += b.n;
        rep.perMaterial[name] = (rep.perMaterial[name] || 0) + b.n;
        if (c.visible) {
          rep.drawCalls++;
          for (var i = 0; i < b.P.length; i += 3) for (var k = 0; k < 3; k++) {
            var v = b.P[i + k] + c.off[k];
            if (v < bb.min[k]) bb.min[k] = v;
            if (v > bb.max[k]) bb.max[k] = v;
          }
        } else rep.hiddenMeshes++;
      });
      if (c.visible && c.name === "gear" && c.zmin < gearZ) gearZ = c.zmin;
      if (c.visible && c.name === "roadwheel" && c.zmin < wheelZ) wheelZ = c.zmin;
      c.kids.forEach(emit);
    })(this);
    rep.materials = Object.keys(used).length;
    rep.bbox = bb; rep.length = bb.max[0] - bb.min[0];
    rep.teamShare = R.stats.area > 0 ? R.stats.teamArea / R.stats.area : 0;
    /* ---- the guards ---- */
    var maxDraw = R.o.maxDraw || MAX_DRAW, tag = "HeroKit[" + R.key + "]: ";
    if (!rep.tris) throw new Error(tag + "the model is empty");
    if (rep.drawCalls > maxDraw) throw new Error(tag + rep.drawCalls + " draw calls, the budget is " + maxDraw + " (materials x frames: fewer named groups, or fewer materials inside them)");
    if (rep.materials > maxDraw) throw new Error(tag + rep.materials + " materials, the budget is " + maxDraw);
    R.need.forEach(function (n) { if (!R.names[n]) throw new Error(tag + "contract: no node named '" + n + "'"); });
    if (R.stats.degenerate) K.warn(R.stats.degenerate + " zero-area triangle(s) dropped: " + Object.keys(R.stats.degAt).map(function (k) { return k + " x" + R.stats.degAt[k]; }).join(", "));
    if (R.cat === "vehicle") {
      if (bb.min[2] < -0.02) K.warn("geometry " + (-bb.min[2]).toFixed(3) + " m below the ground (z = 0)");
      if (bb.min[2] > 0.05) K.warn("the vehicle floats " + bb.min[2].toFixed(3) + " m above the ground");
      if (wheelZ !== Infinity && Math.abs(wheelZ) > 0.05 && Math.abs(bb.min[2]) <= 0.05 && wheelZ > 0.25) K.warn("the road wheels' lowest point is " + wheelZ.toFixed(3) + " m up: no track or tyre under them?");
    } else if (R.cat === "air") {
      if (gearZ !== Infinity) {
        if (gearZ < -0.02) K.warn("the gear reaches " + (-gearZ).toFixed(3) + " m below the ground (z = 0)");
        if (gearZ > 0.05) K.warn("the gear ends " + gearZ.toFixed(3) + " m above the ground: the wheels must stand on z = 0");
        if (bb.min[2] < gearZ - 0.02) K.warn("part of the airframe is below the wheels");
      }
    } else if (R.cat === "ship" && bb.min[2] > -0.2) K.warn("a ship with nothing below the waterline (z = 0 is the waterline, not the keel)");
    if (R.o.len && Math.abs(rep.length - R.o.len) > 0.02 * R.o.len) K.warn("the model is " + rep.length.toFixed(2) + " m long, the spec says " + R.o.len + " m");
    if (rep.teamShare > 0.06) K.warn("team colour covers " + (rep.teamShare * 100).toFixed(1) + " % of the surface: it goes in small strips");
    this.grp.userData.heroKit = rep;
    api.lastReport = rep;
    if (R.warnings.length && typeof console !== "undefined" && console.warn) R.warnings.forEach(function (w) { console.warn(tag + w); });
    if (typeof api.onReport === "function") api.onReport(rep);
    return this.grp;
  };
  /* the primitives as methods: K.box(pen, ...) */
  var PRIM = { tri: tri, quad: quad, solid: solid, hexa: hexa, box: box, obox: obox, boxZ: boxZ, bar: bar, tube: tube, cylX: cylX, cylY: cylY,
               cylZ: cylZ, disc: disc, sphere: sphere, loft: loft, gridSkin: gridSkin, ribbon: ribbon, blade: blade, prism: prism };
  Object.keys(PRIM).forEach(function (k) { CP[k] = PRIM[k]; });
  /* paintCanvas(spec): see above.  paintSheet(spec): the aircraft sheet -
     spec.bounds { x0, x1, ymax, z0, z1 } plus the line lists of sheetTex
     ({ frames: [[x, halfWidth]], top / bot: polylines [[x, y]] seen from
     above / below (mirrored), side: [[x, z]], rivets, walk, soot: [[x, y,
     z, length, halfWidth]], seam: darkness, grime: blots, key, seed }) -
     and makes it the map of material `mat` ("skin").  Call before the
     first skin pen.                                                       */
  CP.paintCanvas = function (spec) { return paintCanvas(this.R.THREE, spec); };
  CP.paintSheet = function (spec, mat) {
    var R = this.R, L = sheetLayout(spec.bounds), old = R.mats[mat || "skin"];
    if (!old) throw new Error("HeroKit.paintSheet: no material '" + (mat || "skin") + "'");
    var def = {}, k;
    for (k in old.def) if (old.def.hasOwnProperty(k)) def[k] = old.def[k];
    def.map = sheetTex(R.THREE, L, spec); def.uv = { mode: "sheet", L: L };
    return this.material(mat || "skin", def);
  };
  /* teamStrip(pts, nrm, w, lift): a band of the team colour along a
     polyline on a skin (a fin band, a spine strip, a turret stripe).
     teamPatch(c, ex, ey, lx, ly): a flat patch, centre c, in the plane of
     the unit vectors ex / ey, 15 mm proud.  Keep them SMALL: finish()
     warns over 6 % of the surface.                                        */
  CP.teamStrip = function (pts, nrm, w, lift) { ribbon(this.pen("team"), pts, nrm, w || 0.3, lift === undefined ? 0.015 : lift); };
  CP.teamPatch = function (c, ex, ey, lx, ly) {
    var n = unit(cross(ex, ey));
    obox(this.pen("team"), add(c, n, 0.0075), unit(ex), unit(ey), n, lx, ly, 0.015);
  };

  /* ====================================================== LOFTS FROM TABLES */
  /* loftHull(spec) -> H: a ship's hull from a table of MEASURED stations.
     spec.stations: [{ x, keel, sheer, bDk, bWl, bKn, knuckle, bilge,
                       chine, bCh, bulwark }], any order, at least two:
       x        station (m; +X bow)
       keel     z of the keel on the centre line (negative; it may rise
                above 0 at a raked stem or a cut-up stern)
       sheer    z of the deck edge
       bDk      half beam at the deck edge
       bWl      half beam at the waterline          (default 0.92 bKn)
       knuckle  z of the knuckle, bKn the half beam there (default: none,
                the side flares straight to the deck edge)
       bilge    superellipse exponent of the underwater section: 2 round,
                4 full, 1.2 a deep V                (default 2.4)
       chine    z of a hard chine, bCh its half beam (planing hulls): the
                bottom is then two straight panels instead of a bilge
       bulwark  height of a bulwark above the deck edge
     spec.boot   height of the boot-topping band above z = 0 (0.35)
     spec.flare  exponent of the flare between waterline and knuckle (1)
     spec.stem   exponent of the stem's section where the keel is above
                 the water (0.62: a fine hollow entrance)
     spec.step   station spacing (length / 60); spec.interp "linear" to
                 join the stations with straight lines instead of fair ones
     spec.camber deck camber as a share of the half beam (0)
     spec.deck   false to leave the deck off
     spec.pens   { under, boot, side, deck } (default: the hull material in
                 the palette's under / boot / hull, the deck in "deck")
     A beam of 0 at the last station closes the stem; a stern with beam is
     closed by a transom.  Bands (bottom, boot, side, upper strake, bulwark)
     are separate skins, so the waterline, knuckle and deck edge are crisp
     (pla_destroyers_redo.js makeHull, ru_riga.js).
     H: { x0, x1, xs, sec(x), deckZ(x), halfDeck(x), W(x, z),
          pt(x, z, side, off), normal(x, z, side),
          edge(xa, xb, { side, inset, step, dz }) -> deck-edge polyline for
          rails, line(xa, xb, z, { side, off, step }) -> points on the shell
          with normals (scuttle rows, rubbing strakes) }                    */
  CP.loftHull = function (spec) {
    var K = this, st = spec.stations.slice().sort(function (a, b) { return a.x - b.x; }), i, j;
    if (st.length < 2) throw new Error("HeroKit.loftHull: at least two stations");
    var hasCh = st.some(function (s) { return s.chine !== undefined; });
    var rows = st.map(function (s) {
      ["x", "keel", "sheer", "bDk"].forEach(function (k) { if (typeof s[k] !== "number") throw new Error("HeroKit.loftHull: a station lacks '" + k + "'"); });
      var bKn = s.bKn === undefined ? s.bDk : s.bKn, bWl = s.bWl === undefined ? bKn * 0.92 : s.bWl;
      return [s.x, s.keel, s.sheer, bWl, bKn, s.bDk, s.knuckle === undefined ? s.sheer : s.knuckle, s.bilge || 2.4,
              s.chine === undefined ? Math.min(0, s.keel) * 0.45 : s.chine, s.bCh === undefined ? bWl * 0.85 : s.bCh, s.bulwark || 0];
    });
    var pick = spec.interp === "linear" ? lin : tab, x0 = rows[0][0], x1 = rows[rows.length - 1][0];
    var BOOT = spec.boot === undefined ? 0.35 : spec.boot, FL = spec.flare || 1, SP = spec.stem || 0.62;
    function sec(x) {
      var v = pick(rows, x), zb = v[0], zd = Math.max(v[1], zb + 0.05), lo = Math.max(zb, 0);
      var zk = Math.min(v[5], zd);
      zk = Math.max(zk, lo + 0.25 * (zd - lo));
      return { x: x, zb: zb, zd: zd, zk: zk, bWl: Math.max(0, v[2]), bKn: Math.max(0, v[3]), bDk: Math.max(0, v[4]), n: Math.max(1, v[6]),
               zc: clamp(v[7], zb, 0), bCh: Math.max(0, v[8]), bul: Math.max(0, v[9]) };
    }
    function Wq(q, z) {
      if (z <= q.zb) return 0;
      if (z >= q.zd) return q.bDk;
      if (z >= q.zk) return q.zd - q.zk < 1e-4 ? q.bDk : q.bKn + (q.bDk - q.bKn) * (z - q.zk) / (q.zd - q.zk);
      if (q.zb >= 0) return q.zk - q.zb < 1e-4 ? q.bKn : q.bKn * Math.pow((z - q.zb) / (q.zk - q.zb), SP);
      if (z >= 0) return q.bWl + (q.bKn - q.bWl) * Math.pow(z / q.zk, FL);
      if (hasCh) {
        if (z <= q.zc) return q.zc - q.zb < 1e-4 ? q.bCh : q.bCh * (z - q.zb) / (q.zc - q.zb);
        return q.bCh + (q.bWl - q.bCh) * (z - q.zc) / (0 - q.zc || 1);
      }
      return q.bWl * Math.pow(Math.max(0, 1 - Math.pow(z / q.zb, q.n)), 1 / q.n);
    }
    var step = spec.step || (x1 - x0) / 60;
    var xs = stationsOf(x0, x1, step, st.map(function (s) { return s.x; }).concat(stationsOf(x1 - (x1 - x0) * 0.08, x1, step / 3)), step * 0.15);
    var Q = xs.map(sec), P = spec.pens || {};
    var pUnder = P.under || K.pen("hull", "under"), pBoot = P.boot || K.pen("hull", "boot"), pSide = P.side || K.pen("hull", "hull");
    function cl(q, z) { return clamp(z, q.zb, q.zd); }
    /* each band: pen, rows, z(q, f) for f = 0..1 */
    var bands = [];
    if (hasCh) {
      bands.push([pUnder, 2, function (q, f) { return lerp(q.zb, cl(q, q.zc), f); }]);
      bands.push([pUnder, 2, function (q, f) { return lerp(cl(q, q.zc), cl(q, 0), f); }]);
    } else {
      bands.push([pUnder, 6, function (q, f) {
        if (q.zb >= 0) return q.zb;
        return q.zb * Math.pow(Math.sin((1 - f) * PI / 2), 2 / q.n);          /* even steps round the bilge */
      }]);
    }
    bands.push([pBoot, 1, function (q, f) { return lerp(cl(q, 0), Math.min(cl(q, BOOT), Math.max(q.zk, q.zb)), f); }]);
    bands.push([pSide, 3, function (q, f) { return lerp(Math.min(cl(q, BOOT), Math.max(q.zk, q.zb)), Math.max(q.zk, q.zb), f); }]);
    bands.push([pSide, 1, function (q, f) { return lerp(Math.max(q.zk, q.zb), q.zd, f); }]);
    K.R.quiet++;
    bands.forEach(function (b) {
      var s, e;
      for (s = -1; s <= 1; s += 2) {
        var G = [], A = [];
        for (i = 0; i < Q.length; i++) {
          var q = Q[i], row = [];
          for (j = 0; j <= b[1]; j++) { var z = b[2](q, j / b[1]); row.push([q.x, s * Wq(q, z), z]); }
          G.push(row); A.push([q.x, 0, (b[2](q, 0) + b[2](q, 1)) / 2 + 0.3]);
        }
        gridSkin(b[0], G, A);
      }
      /* the ends: a transom (or a blunt stem) in the band's own colour */
      for (e = 0; e < 2; e++) {
        var qe = Q[e ? Q.length - 1 : 0], ref = [qe.x + (e ? -1 : 1), 0, (qe.zb + qe.zd) / 2];
        for (j = 0; j < b[1]; j++) {
          var za = b[2](qe, j / b[1]), zb2 = b[2](qe, (j + 1) / b[1]), wa = Wq(qe, za), wb = Wq(qe, zb2);
          quad(b[0], [qe.x, -wa, za], [qe.x, wa, za], [qe.x, wb, zb2], [qe.x, -wb, zb2], ref);
        }
      }
    });
    function hd(q) { return Math.max(0, q.bDk - (q.bul > 0.02 ? Math.min(0.12, q.bDk * 0.4) : 0)); }
    if (spec.deck !== false) {
      var pDeck = P.deck || K.pen("deck"), cam = spec.camber || 0;
      for (i = 0; i + 1 < Q.length; i++) {
        var a = Q[i], b2 = Q[i + 1], ha = hd(a), hb = hd(b2), up = [0, 0, 1];
        var a0 = [a.x, -ha, a.zd], a1 = [a.x, 0, a.zd + cam * ha], a2 = [a.x, ha, a.zd];
        var c0 = [b2.x, -hb, b2.zd], c1 = [b2.x, 0, b2.zd + cam * hb], c2 = [b2.x, hb, b2.zd];
        [[a0, c0, c1], [a0, c1, a1], [a1, c1, c2], [a1, c2, a2]].forEach(function (t) {
          var f = cross(sub(t[1], t[0]), sub(t[2], t[0]));
          if (dot(f, up) < 0) pDeck.tri(t[0], t[2], t[1]); else pDeck.tri(t[0], t[1], t[2]);
        });
      }
    }
    /* the bulwark: outer face, inner face and cap */
    for (i = 0; i + 1 < Q.length; i++) {
      var qa = Q[i], qb = Q[i + 1];
      if (qa.bul < 0.02 && qb.bul < 0.02) continue;
      for (j = -1; j <= 1; j += 2) {
        var oa = [qa.x, j * qa.bDk, qa.zd], ob = [qb.x, j * qb.bDk, qb.zd], ta = [qa.x, j * qa.bDk, qa.zd + qa.bul], tb = [qb.x, j * qb.bDk, qb.zd + qb.bul];
        var ia = [qa.x, j * hd(qa), qa.zd], ib = [qb.x, j * hd(qb), qb.zd], ua = [qa.x, j * hd(qa), qa.zd + qa.bul], ub = [qb.x, j * hd(qb), qb.zd + qb.bul];
        var inn = [(qa.x + qb.x) / 2, j * (qa.bDk + qb.bDk + hd(qa) + hd(qb)) / 4, (qa.zd + qb.zd) / 2 + 0.2];
        quad(pSide, oa, ob, tb, ta, inn); quad(pSide, ia, ib, ub, ua, inn); quad(pSide, ta, tb, ub, ua, inn);
      }
    }
    K.R.quiet--;
    var H = {
      x0: x0, x1: x1, xs: xs, sec: sec,
      deckZ: function (x) { return sec(x).zd; },
      halfDeck: function (x) { return hd(sec(x)); },
      W: function (x, z) { return Wq(sec(x), z); },
      /* a point on the shell at (x, z), side +1 port / -1 starboard, pushed
         `off` out along the shell's normal                                */
      pt: function (x, z, side, off) {
        var p = [x, side * Wq(sec(x), z), z];
        return off ? add(p, H.normal(x, z, side), off) : p;
      },
      normal: function (x, z, side) {
        var d = 0.25, a = [x - d, side * Wq(sec(x - d), z), z], b = [x + d, side * Wq(sec(x + d), z), z];
        var q = sec(x), c = [x, side * Wq(q, z - d), z - d], e = [x, side * Wq(q, z + d), z + d];
        var n = unit(cross(sub(b, a), sub(e, c)));
        return n[1] * side < 0 ? [-n[0], -n[1], -n[2]] : n;
      },
      edge: function (xa, xb, o) {
        o = o || {};
        var s = o.side || 1, n = Math.max(1, Math.ceil(Math.abs(xb - xa) / (o.step || 2))), out = [], k;
        for (k = 0; k <= n; k++) { var x = xa + (xb - xa) * k / n, q = sec(x); out.push([x, s * Math.max(0, hd(q) - (o.inset === undefined ? 0.15 : o.inset)), q.zd + (o.dz || 0)]); }
        return out;
      },
      line: function (xa, xb, z, o) {
        o = o || {};
        var s = o.side || 1, n = Math.max(1, Math.ceil(Math.abs(xb - xa) / (o.step || 1.5))), pts = [], nr = [], k;
        for (k = 0; k <= n; k++) { var x = xa + (xb - xa) * k / n, zz = typeof z === "function" ? z(x) : z; nr.push(H.normal(x, zz, s)); pts.push(H.pt(x, zz, s, o.off || 0)); }
        return { pts: pts, nrm: nr };
      }
    };
    return H;
  };

  /* loftSub(spec) -> S: a submarine - a round pressure hull with the casing
     on its back, a crisp knuckle (the "foot" line) between them.
     spec.P     [[x, top, keel, halfWidth], ...] the profile's three lines
     spec.foot  [[x, z], ...] the knuckle line where the casing's flat side
                meets the round hull (x ascending); outside it the casing is
                a low walking ridge spec.cmin high (0.25)
     spec.c0, spec.c1  the casing's ends (it fades out over 2.5 m)
     spec.WT    the casing top's largest half width; spec.wk its half width
                as a share of the foot's (0.75)
     spec.step  station spacing (length / 70)
     spec.pens  { hull, casing }
     S: { sec(x) -> { zc, hh, w, zt, zf }, top(x), xs }
     (fr_navy_early.js HeroFrSubKit subSpec / secPts / subHull2)           */
  CP.loftSub = function (spec) {
    var K = this, Pr = spec.P, x0 = Pr[0][0], x1 = Pr[Pr.length - 1][0], KNA = 16, KNS = 3, KNR = 3, KNT = 3;
    var foot = spec.foot || [[x0, 1e9], [x1, 1e9]], f0 = foot[0][0], f1 = foot[foot.length - 1][0];
    var c0 = spec.c0 === undefined ? x0 : spec.c0, c1 = spec.c1 === undefined ? x1 : spec.c1, cmin = spec.cmin === undefined ? 0.25 : spec.cmin;
    function sec(x) {
      var r = lin(Pr, x), top = r[0], kz = r[1], w = Math.max(0.04, r[2]);
      var fade = clamp(Math.min(x - c0, c1 - x) / 2.5, 0, 1), inZ = x >= f0 && x <= f1, hullTop = top - cmin * fade;
      if (inZ && kz + 2 * w < hullTop) hullTop = kz + 2 * w;
      var hh = Math.max(0.04, (hullTop - kz) / 2), zf = hullTop - 0.08 * fade;
      if (inZ) zf = Math.min(lin(foot, x)[0], zf);
      return { x: x, zc: kz + hh, hh: hh, w: w, zt: top, zf: zf };
    }
    function pts(q) {
      var arc = [], cas = [], i, aF = Math.asin(clamp((q.zf - q.zc) / q.hh, -1, 1));
      for (i = 0; i <= KNA; i++) { var a = -PI / 2 + (aF + PI / 2) * i / KNA; arc.push([q.w * Math.cos(a), q.zc + q.hh * Math.sin(a)]); }
      var F = arc[KNA], wt = Math.min(spec.WT || 1.2, (spec.wk || 0.75) * F[0]), rs = Math.max(0, Math.min(0.45, (q.zt - q.zf) * 0.35, wt * 0.4));
      var S1 = [wt, q.zt - rs], cx = wt - rs, cz = q.zt - rs;
      cas.push(F);
      for (i = 1; i <= KNS; i++) cas.push([lerp(F[0], S1[0], i / KNS), lerp(F[1], S1[1], i / KNS)]);
      for (i = 1; i <= KNR; i++) { var b = PI / 2 * i / KNR; cas.push([cx + rs * Math.cos(b), cz + rs * Math.sin(b)]); }
      for (i = 1; i <= KNT; i++) cas.push([lerp(cx, 0, i / KNT), q.zt]);
      return { arc: arc, cas: cas };
    }
    var xs = stationsOf(x0, x1, spec.step || (x1 - x0) / 70, Pr.map(function (r) { return r[0]; }));
    var AR = [], CA = [], AX = [], i, P = spec.pens || {};
    xs.forEach(function (x) {
      var q = sec(x), s = pts(q), a = [], c = [];
      for (i = KNA; i > 0; i--) a.push([x, -s.arc[i][0], s.arc[i][1]]);
      for (i = 0; i <= KNA; i++) a.push([x, s.arc[i][0], s.arc[i][1]]);
      for (i = 0; i < s.cas.length; i++) c.push([x, s.cas[i][0], s.cas[i][1]]);
      for (i = s.cas.length - 2; i >= 0; i--) c.push([x, -s.cas[i][0], s.cas[i][1]]);
      AR.push(a); CA.push(c); AX.push([x, 0, q.zc]);
    });
    var pH = P.hull || K.pen("hull", "hull"), pC = P.casing || K.pen("hull", "deck");
    gridSkin(pH, AR, AX); gridSkin(pC, CA, AX);
    K.R.quiet++;
    [0, xs.length - 1].forEach(function (e) {
      var ring = AR[e].concat(CA[e].slice(1, CA[e].length - 1)), c = [0, 0, 0], n = ring.length, k;
      ring.forEach(function (p) { c[0] += p[0] / n; c[1] += p[1] / n; c[2] += p[2] / n; });
      for (k = 0; k < n; k++) tri(pH, c, ring[k], ring[(k + 1) % n], [c[0] + (e ? -1 : 1), c[1], c[2]]);
    });
    K.R.quiet--;
    return { sec: sec, top: function (x) { return sec(x).zt; }, xs: xs, x0: x0, x1: x1 };
  };

  /* a superellipse ring at x about (yc, zw): half width w, top zt, bottom
     zb, exponents eU above / eL below the widest line (2 an ellipse, 3-5 a
     rounded box).  Point k of n is at angle k / n round from +Y (port)
     through the top.  (us_ef111a.js ringSE)                               */
  function ringSE(x, yc, w, zt, zb, zw, eU, eL, n) {
    var out = [], j;
    for (j = 0; j < n; j++) out.push(sePt(x, yc, w, zt, zb, zw, eU, eL, j / n * TAU));
    return out;
  }
  function sePt(x, yc, w, zt, zb, zw, eU, eL, t) {
    var c = Math.cos(t), s = Math.sin(t), e = s >= 0 ? 2 / eU : 2 / eL;
    return [x, yc + w * sgp(c, e), s >= 0 ? zw + (zt - zw) * sgp(s, e) : zw + (zw - zb) * sgp(s, e)];
  }
  /* loftBody(pen, sections, o) -> B: a fuselage, nacelle, pod or tank from
     a table of MEASURED cross-sections.
     sections: [{ x, w, top, bot, zw, y, eU, eL }]: half width, the z of the
       top and bottom lines, zw the z of the widest line (default half way),
       y the centre's offset (0), eU / eL the superellipse exponents of the
       upper / lower half (2).  A section with w = 0 closes to a point.
     o: { n: points round (20), step: resampling spacing (length / 40),
          interp: "linear", capA / capB: close the aft / forward end,
          inward, flat }
     B: { sec(x), pt(x, a, push) the skin point at angle a (radians from +Y
          through the top) pushed out by push, nrm(x, a), hoop(x, a0, a1, n)
          and line(a, xa, xb, n) -> { pts, nrm } for seams and strips }
     (us_ef111a.js / nato_e80_fighter.js addBody)                          */
  CP.loftBody = function (pen, sections, o) {
    o = o || {};
    var st = sections.slice().sort(function (a, b) { return a.x - b.x; });
    var rows = st.map(function (s) {
      return [s.x, s.w, s.top, s.bot, s.zw === undefined ? (s.top + s.bot) / 2 : s.zw, s.y || 0, s.eU || 2, s.eL || 2];
    });
    var pick = o.interp === "linear" ? lin : tab, x0 = rows[0][0], x1 = rows[rows.length - 1][0], n = o.n || 20;
    function sec(x) {
      var v = pick(rows, x);
      return { x: x, w: Math.max(0, v[0]), top: v[1], bot: Math.min(v[2], v[1]), zw: clamp(v[3], Math.min(v[2], v[1]), v[1]), y: v[4], eU: Math.max(1, v[5]), eL: Math.max(1, v[6]) };
    }
    var xs = stationsOf(x0, x1, o.step || (x1 - x0) / 40, st.map(function (s) { return s.x; }));
    var rings = xs.map(function (x) { var q = sec(x); return ringSE(x, q.y, q.w, q.top, q.bot, q.zw, q.eU, q.eL, n); });
    loft(pen, rings, { capA: o.capA, capB: o.capB, inward: o.inward, flat: o.flat });
    var B = {
      x0: x0, x1: x1, xs: xs, sec: sec,
      pt: function (x, a, push) {
        var q = sec(x), p = sePt(x, q.y, q.w, q.top, q.bot, q.zw, q.eU, q.eL, a);
        return push ? add(p, B.nrm(x, a), push) : p;
      },
      nrm: function (x, a) {
        var q = sec(x), d = 0.02, p0 = sePt(x, q.y, q.w, q.top, q.bot, q.zw, q.eU, q.eL, a - d), p1 = sePt(x, q.y, q.w, q.top, q.bot, q.zw, q.eU, q.eL, a + d);
        var t = sub(p1, p0), nn = [0, t[2], -t[1]];
        if (dot(nn, nn) < 1e-12) nn = [0, Math.cos(a), Math.sin(a)];
        return unit(nn);
      },
      hoop: function (x, a0, a1, m) {
        var pts = [], nr = [], k;
        m = m || 12;
        for (k = 0; k <= m; k++) { var a = a0 + (a1 - a0) * k / m; pts.push(B.pt(x, a)); nr.push(B.nrm(x, a)); }
        return { pts: pts, nrm: nr };
      },
      line: function (a, xa, xb, m) {
        var pts = [], nr = [], k;
        m = m || 8;
        for (k = 0; k <= m; k++) { var x = xa + (xb - xa) * k / m; pts.push(B.pt(x, a)); nr.push(B.nrm(x, a)); }
        return { pts: pts, nrm: nr };
      }
    };
    return B;
  };

  /* section thickness (half, as a share of the chord) at chord share u */
  function foilT(kind, t, u) {
    if (kind === "biconvex") return t * 2 * u * (1 - u);                      /* sharp both ends: supersonic */
    if (kind === "slab") return t * 0.5 * Math.min(1, u / 0.12, (1 - u) / 0.25); /* a plate, bevelled edges */
    return t * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u);  /* NACA 00xx, closed */
  }
  /* aerofoil(pen, rows, o) -> F: a wing, tailplane, fin, canard or blade
     from its MEASURED planform.
     rows: [{ s, le, c, t, z }] from root to tip, joined by straight lines:
       s   span station: metres out from the centre line (a wing) or up
           (a fin)
       le  x of the leading edge there;  c  the chord
       t   thickness / chord (0.04 - 0.12)
       z   height of the chord plane (a wing: dihedral goes here)
     o: { frame: "wing" (span along Y) | "fin" (span along Z),
          side: +1 port, -1 starboard (default: a wing both, a fin +1;
          both: true for twin fins)
          y: a fin's distance off the centre line; cantDeg: outward lean
          section: "naca" | "biconvex" | "slab";  k: points per surface (9)
          sub: extra stations between rows (2);  capRoot: false }
     F: { sec(s), at(s, u, surf, side) the surface point at chord share u
          (surf +1 upper / outboard face, -1 the other), nrm(surf, side),
          line(u, sa, sb, n, surf, side) -> { pts, nrm } for hinge lines,
          seams and team bands }
     (us_ef111a.js foilRing / foilLoft)                                    */
  CP.aerofoil = function (pen, rows, o) {
    o = o || {};
    var fin = o.frame === "fin", kind = o.section || "naca", k = o.k || 9, subN = o.sub === undefined ? 2 : o.sub;
    var tb = rows.map(function (r) { return [r.s, r.le, r.c, r.t, r.z || 0]; }).sort(function (a, b) { return a[0] - b[0]; });
    var s0 = tb[0][0], s1 = tb[tb.length - 1][0], cant = Math.tan((o.cantDeg || 0) * D2R), y0 = o.y || 0;
    var sides = o.side ? [o.side] : (fin && !o.both ? [1] : [1, -1]);
    function sec(s) { var v = lin(tb, clamp(s, s0, s1)); return { s: s, le: v[0], c: v[1], t: v[2], z: v[3] }; }
    function at(s, u, surf, side) {
      var q = sec(s), th = foilT(kind, q.t, clamp(u, 0, 1)) * q.c * (surf < 0 ? -1 : 1), x = q.le - u * q.c;
      side = side || sides[0];
      if (fin) return [x, side * (y0 + cant * (s - s0)) + th, s];
      return [x, side * s, q.z + th];
    }
    var ss = [], i, j;
    for (i = 0; i + 1 < tb.length; i++) for (j = 0; j <= subN; j++) ss.push(lerp(tb[i][0], tb[i + 1][0], j / (subN + 1)));
    ss.push(s1);
    sides.forEach(function (side) {
      var rings = ss.map(function (s) {
        var ring = [], m;
        for (m = 0; m <= k; m++) ring.push(at(s, (1 - Math.cos(PI * m / k)) / 2, 1, side));
        for (m = k - 1; m >= 1; m--) ring.push(at(s, (1 - Math.cos(PI * m / k)) / 2, -1, side));
        return ring;
      });
      loft(pen, rings, { capA: o.capRoot !== false, capB: true });
    });
    var F = {
      s0: s0, s1: s1, sec: sec, at: at,
      nrm: function (surf, side) { side = side || sides[0]; return fin ? [0, surf < 0 ? -1 : 1, 0] : [0, 0, surf < 0 ? -1 : 1]; },
      line: function (u, sa, sb, n, surf, side) {
        var pts = [], m;
        n = n || 6;
        for (m = 0; m <= n; m++) pts.push(at(lerp(sa, sb, m / n), u, surf || 1, side));
        return { pts: pts, nrm: F.nrm(surf || 1, side) };
      }
    };
    return F;
  };

  /* revolve(pen, profile, o): a body of revolution from a MEASURED profile
     [[s, r], ...] (s along the axis, r the radius there): barrels, wheels,
     radomes, shells, drums, pods.
     o: { at: [x, y, z] the point s = 0, axis: "x" | "y" | "z" or a vector,
          seg: sides (12), capA / capB (default true where r > 0),
          smooth: true to smooth along the profile too (a radome); the
          default creases at every profile point (a barrel's steps)        */
  CP.revolve = function (pen, prof, o) {
    o = o || {};
    var at = o.at || [0, 0, 0], ax = o.axis || "x", seg = o.seg || 12, i, j;
    ax = ax === "x" ? [1, 0, 0] : ax === "y" ? [0, 1, 0] : ax === "z" ? [0, 0, 1] : unit(ax);
    var f = frame(ax), rings = prof.map(function (q) {
      var ring = [], c = add(at, ax, q[0]), r = Math.max(q[1], 0);
      for (j = 0; j < seg; j++) { var a = j / seg * TAU; ring.push(add(add(c, f[0], Math.cos(a) * r), f[1], Math.sin(a) * r)); }
      return ring;
    });
    i = prof.length - 1;
    loft(pen, rings, { hard: !o.smooth, inward: o.inward, capA: o.capA === undefined ? prof[0][1] > 1e-4 : o.capA, capB: o.capB === undefined ? prof[i][1] > 1e-4 : o.capB });
  };

  /* extrudePoly(pen, poly, o): a plate or block cut to an outline (concave
     outlines are fine).  o.plane "xy" (the outline is a plan, extruded from
     z = o.a to o.b), "xz" (a side profile, from y = o.a to o.b), "yz"
     (a frame, from x = o.a to o.b).                                       */
  CP.extrudePoly = function (pen, poly, o) { return prism(pen, poly, o.plane || "xy", o.a, o.b); };

  /* footprint(x0, x1, hwA, hwF, ca, cf): a plan rectangle from x0 (aft) to
     x1 with half widths hwA aft / hwF forward and chamfered corners (ca
     aft, cf forward), counter-clockwise from above.  Faces: 0 starboard
     side, 1 starboard-forward corner, 2 front, 3 port-forward corner,
     4 port side, 5 port-aft corner, 6 after face, 7 starboard-aft corner
     (pla_destroyers_redo.js chamf2)                                       */
  function footprint(x0, x1, hwA, hwF, ca, cf) {
    hwF = hwF === undefined ? hwA : hwF; ca = Math.max(ca || 0, 0.04); cf = Math.max(cf || 0, 0.04);
    return [[x0 + ca, -hwA], [x1 - cf, -hwF], [x1, -hwF + cf], [x1, hwF - cf], [x1 - cf, hwF], [x0 + ca, hwA], [x0, hwA - ca], [x0, -hwA + ca]];
  }
  /* facetedHouse(pen, rows, o) -> B: a flat-faced block from footprint rows
     - a deckhouse, bridge, funnel casing, hangar, gun house, a tank's
     welded turret or hull.
     rows (bottom to top), each one of:
       { z, poly: [[x, y], ...] }          a measured outline at that level
       { z, x0, x1, hw, hwF, ca, cf }      a footprint() rectangle
       { z, lean: { side, front, aft } }   the row below, its sides drawn
                                           in by `side`, the front set back
                                           `front`, the after face `aft`
     Every row needs the same number of corners.
     o: { bottom: true to close the underside, y: lateral offset }
     B: { rows, z0, z1, faceAt(k, s, z, off) the point on face k at share s
          along it and height z, stood off by off; faceLen(k); normal(k);
          panel(pen, k, s0, s1, za, zb, off) a raised panel on a face
          (windows, array faces, louvres, doors); door(k, s, z0, w, h);
          roofEdge(inset, faces) -> polylines for K.ship.rail }
     (pla_destroyers_redo.js frustum / blk / faceAt / panel / door)        */
  CP.facetedHouse = function (pen, rows, o) {
    o = o || {};
    var K = this, L = [], i, k, yo = o.y || 0;
    rows.forEach(function (r) {
      var poly;
      if (r.poly) poly = r.poly.map(function (q) { return [q[0], q[1]]; });
      else if (r.lean) {
        var prev = L[L.length - 1].poly, xa = Infinity, xb = -Infinity, hw = 0;
        prev.forEach(function (q) { xa = Math.min(xa, q[0]); xb = Math.max(xb, q[0]); hw = Math.max(hw, Math.abs(q[1])); });
        var na = xa + (r.lean.aft || 0), nb = xb - (r.lean.front || 0), ky = hw > 1e-6 ? Math.max(0.02, hw - (r.lean.side || 0)) / hw : 1;
        poly = prev.map(function (q) { return [na + (q[0] - xa) * (nb - na) / ((xb - xa) || 1), q[1] * ky]; });
      } else poly = footprint(r.x0, r.x1, r.hw, r.hwF, r.ca, r.cf);
      if (area2(poly) < 0) poly.reverse();
      L.push({ z: r.z, poly: poly });
    });
    var n = L[0].poly.length;
    L.forEach(function (l) { if (l.poly.length !== n) throw new Error("HeroKit.facetedHouse: every row needs the same number of corners"); });
    function P3(l, q) { return [q[0], q[1] + yo, l.z]; }
    var cen = [0, yo, (L[0].z + L[L.length - 1].z) / 2];
    L[0].poly.forEach(function (q) { cen[0] += q[0] / n; cen[1] += q[1] / n; });
    for (i = 0; i + 1 < L.length; i++) for (k = 0; k < n; k++) {
      var k1 = (k + 1) % n, ref = [cen[0], cen[1], (L[i].z + L[i + 1].z) / 2];
      quad(pen, P3(L[i], L[i].poly[k]), P3(L[i], L[i].poly[k1]), P3(L[i + 1], L[i + 1].poly[k1]), P3(L[i + 1], L[i + 1].poly[k]), ref);
    }
    var top = L[L.length - 1], bot = L[0];
    earclip(top.poly).forEach(function (t) { tri(pen, P3(top, top.poly[t[0]]), P3(top, top.poly[t[1]]), P3(top, top.poly[t[2]]), cen); });
    if (o.bottom) earclip(bot.poly).forEach(function (t) { tri(pen, P3(bot, bot.poly[t[0]]), P3(bot, bot.poly[t[1]]), P3(bot, bot.poly[t[2]]), cen); });
    function lev(z) { var q = 0; while (q + 2 < L.length && z > L[q + 1].z) q++; return q; }
    var B = {
      rows: L, z0: bot.z, z1: top.z, centre: cen,
      faceLen: function (kf, z) { var l = L[lev(z === undefined ? bot.z : z)].poly, k2 = (kf + 1) % n; return Math.hypot(l[k2][0] - l[kf][0], l[k2][1] - l[kf][1]); },
      normal: function (kf, z) {
        var q = lev(z === undefined ? bot.z : z), a = B.faceAt(kf, 0, L[q].z), b = B.faceAt(kf, 1, L[q].z), c = B.faceAt(kf, 0.5, L[q + 1].z);
        var nn = unit(cross(sub(b, a), sub(c, a)));
        return dot(nn, sub(a, cen)) < 0 ? [-nn[0], -nn[1], -nn[2]] : nn;
      },
      faceAt: function (kf, s, z, off) {
        var q = lev(z), lo = L[q], hi = L[q + 1], k2 = (kf + 1) % n, f = (z - lo.z) / ((hi.z - lo.z) || 1);
        var ax = lerp(lo.poly[kf][0], hi.poly[kf][0], f), ay = lerp(lo.poly[kf][1], hi.poly[kf][1], f);
        var bx = lerp(lo.poly[k2][0], hi.poly[k2][0], f), by = lerp(lo.poly[k2][1], hi.poly[k2][1], f), p = [ax + (bx - ax) * s, ay + (by - ay) * s + yo, z];
        return off ? add(p, B.normal(kf, z), off) : p;
      },
      panel: function (pn, kf, sa, sb, za, zb, off) {
        off = off === undefined ? 0.04 : off;
        var a = B.faceAt(kf, sa, za, off), b = B.faceAt(kf, sb, za, off), c = B.faceAt(kf, sb, zb, off), d = B.faceAt(kf, sa, zb, off);
        var a0 = B.faceAt(kf, sa, za), b0 = B.faceAt(kf, sb, za), c0 = B.faceAt(kf, sb, zb), d0 = B.faceAt(kf, sa, zb), ref = mix(a0, c0, 0.5);
        quad(pn, a, b, c, d, ref);
        if (off > 0.02) { quad(pn, a0, b0, b, a, ref); quad(pn, b0, c0, c, b, ref); quad(pn, c0, d0, d, c, ref); quad(pn, d0, a0, a, d, ref); }
      },
      /* a watertight door at share s of face kf, its sill at z0: the dark
         frame, the leaf proud of it, a grab bar                            */
      door: function (kf, s, z0, w, h) {
        var Lf = B.faceLen(kf, z0) || 1, dw = (w || 0.75) / Lf, fr = 0.06 / Lf;
        h = h || 1.8;
        B.panel(K.pen("dull", "dark"), kf, s - fr, s + dw + fr, z0, z0 + h + 0.06, 0.02);
        B.panel(pen, kf, s, s + dw, z0 + 0.03, z0 + h, 0.06);
        tube(K.pen("metal", "metal"), B.faceAt(kf, s + dw + 2.5 * fr, z0 + 0.9, 0.08), B.faceAt(kf, s + dw + 2.5 * fr, z0 + 1.5, 0.08), 0.02, 0.02, 3, false);
      },
      roofEdge: function (inset, faces) {
        var out = [], kf;
        inset = inset === undefined ? 0.15 : inset;
        function pin(q) { var dx = cen[0] - q[0], dy = cen[1] - yo - q[1], l = Math.hypot(dx, dy) || 1; return [q[0] + dx / l * inset, q[1] + dy / l * inset + yo, top.z]; }
        for (kf = 0; kf < n; kf++) if (!faces || faces.indexOf(kf) >= 0) out.push([pin(top.poly[kf]), pin(top.poly[(kf + 1) % n])]);
        return out;
      }
    };
    return B;
  };

  /* ================================================================== SHIPS
     Deck fittings at real sizes (metres).  Every one draws into the stock
     materials (metal, dull, plate, deck) of the context it is called on, so
     none costs a draw call.  Angles `yaw` are about +Z from +X.
     (pla_destroyers_redo.js FK, ru_riga.js)                               */
  var SHIP = {
    /* guard rail along deck points [[x, y, z], ...]: stanchions every
       o.step (1.5), a top rail at o.h (1.0) and o.wires (2) lifelines     */
    rail: function (K, pts, o) {
      o = o || {};
      var p = o.pen || K.pen("metal", "metal"), h = o.h || 1.0, step = o.step || 1.5, r = o.r || 0.024, nw = o.wires === undefined ? 2 : o.wires, i, k, w, carry = 0;
      function post(q) { tube(p, q, [q[0], q[1], q[2] + h], r, r, 3, false); }
      for (i = 0; i < pts.length - 1; i++) {
        var a = pts[i], b = pts[i + 1], d = sub(b, a), L = Math.sqrt(dot(d, d));
        if (L < 1e-3) continue;
        tube(p, [a[0], a[1], a[2] + h], [b[0], b[1], b[2] + h], r * 0.8, r * 0.8, 3, false);
        for (w = 1; w < nw; w++) tube(p, [a[0], a[1], a[2] + h * w / nw], [b[0], b[1], b[2] + h * w / nw], r * 0.55, r * 0.55, 3, false);
        for (k = carry; k < L; k += step) post(add(a, d, k / L));
        carry = k - L;
      }
      post(pts[pts.length - 1]);
    },
    /* a toe rail / waterway bar along the deck edge */
    toeRail: function (K, pts, r) {
      var p = K.pen("metal", "metal");
      for (var i = 0; i < pts.length - 1; i++) tube(p, pts[i], pts[i + 1], r || 0.04, r || 0.04, 3, false);
    },
    /* a double bollard on its base plate; k = 1 is a 0.9 m frigate pair */
    bollard: function (K, x, y, z, yaw, k) {
      var p = K.pen("metal", "dark"), c = Math.cos(yaw || 0), s = Math.sin(yaw || 0);
      k = k || 1;
      boxZ(p, x, y, z, 0.9 * k, 0.36 * k, 0.05 * k, yaw);
      [-1, 1].forEach(function (e) {
        var px = x + c * e * 0.26 * k, py = y + s * e * 0.26 * k;
        cylZ(p, px, py, z + 0.05 * k, z + 0.41 * k, 0.12 * k, 6);
        cylZ(p, px, py, z + 0.41 * k, z + 0.46 * k, 0.15 * k, 6);
      });
    },
    cleat: function (K, x, y, z, yaw, k) {
      var p = K.pen("metal", "dark"), c = Math.cos(yaw || 0), s = Math.sin(yaw || 0);
      k = k || 1;
      [-1, 1].forEach(function (e) { cylZ(p, x + c * e * 0.09 * k, y + s * e * 0.09 * k, z, z + 0.1 * k, 0.035 * k, 4); });
      boxZ(p, x, y, z + 0.1 * k, 0.42 * k, 0.07 * k, 0.05 * k, yaw);
    },
    /* a roller fairlead at the deck edge; yaw = the line of the edge */
    fairlead: function (K, x, y, z, yaw, k) {
      var p = K.pen("metal", "dark"), c = Math.cos(yaw || 0), s = Math.sin(yaw || 0);
      k = k || 1;
      boxZ(p, x, y, z, 0.8 * k, 0.32 * k, 0.07 * k, yaw);
      [-1, 1].forEach(function (e) { cylZ(p, x + c * e * 0.22 * k, y + s * e * 0.22 * k, z + 0.07 * k, z + 0.33 * k, 0.09 * k, 6); });
    },
    /* a stockless anchor stowed in its hawse on the hull's side: (x, y, z)
       the hawse mouth on the plating, out = the outward normal there
       (H.normal), k = 1 a 1.1 m anchor                                    */
    anchor: function (K, x, y, z, out, k) {
      var p = K.pen("metal", "dark"), pd = K.pen("dull", "ink");
      k = k || 1;
      var o = unit(out), ez = [0, 0, 1], ex = unit(cross(ez, o)), q = add([x, y, z], o, 0.10 * k);
      tube(p, [x, y, z], add([x, y, z], o, 0.14 * k), 0.30 * k, 0.34 * k, 10, false);
      disc(pd, add([x, y, z], o, 0.03 * k), o, 0.27 * k, 10);
      obox(p, add(q, ez, -0.62 * k), ex, o, ez, 0.17 * k, 0.12 * k, 1.0 * k);
      obox(p, add(q, ez, -1.12 * k), ex, o, ez, 0.75 * k, 0.16 * k, 0.16 * k);
      [-1, 1].forEach(function (e) { tube(p, add(add(q, ez, -1.12 * k), ex, e * 0.36 * k), add(add(q, ez, -0.72 * k), ex, e * 0.24 * k), 0.09 * k, 0.04 * k, 4, true); });
    },
    /* a deck hatch: coaming, lid, hinge bar and dogs (lx along yaw) */
    hatch: function (K, x, y, z, lx, ly, yaw, o) {
      var p = (o && o.pen) || K.pen("plate"), pm = K.pen("metal", "dark"), c = Math.cos(yaw || 0), s = Math.sin(yaw || 0);
      lx = lx || 0.9; ly = ly || 0.9;
      boxZ(p, x, y, z, lx, ly, 0.10, yaw);
      boxZ(p, x, y, z + 0.09, lx - 0.08, ly - 0.08, 0.05, yaw);
      var hx = x - c * lx * 0.5, hy = y - s * lx * 0.5;
      tube(pm, [hx + s * ly * 0.4, hy - c * ly * 0.4, z + 0.12], [hx - s * ly * 0.4, hy + c * ly * 0.4, z + 0.12], 0.035, 0.035, 4, true);
      [-1, 1].forEach(function (e) { boxZ(pm, x + c * lx * 0.5 - s * e * ly * 0.3, y + s * lx * 0.5 + c * e * ly * 0.3, z + 0.03, 0.08, 0.06, 0.1, yaw); });
      boxZ(pm, x, y, z + 0.14, 0.22, 0.22, 0.03, yaw);                       /* the hand wheel */
    },
    /* a ventilator: o.type "mushroom" (r 0.2, h 0.5) or "goose" (a
       gooseneck, its mouth turned to o.yaw)                                */
    vent: function (K, x, y, z, o) {
      o = o || {};
      var p = o.pen || K.pen("plate"), r = o.r || 0.2, h = o.h || 0.5;
      if (o.type === "goose") {
        var c = Math.cos(o.yaw || 0), s = Math.sin(o.yaw || 0);
        tube(p, [x, y, z], [x, y, z + h], r, r, 6, false);
        tube(p, [x, y, z + h - r], [x + c * r * 2.4, y + s * r * 2.4, z + h - r * 2.2], r * 1.05, r * 1.15, 6, true);
        disc(K.pen("dull", "ink"), [x + c * r * 2.42, y + s * r * 2.42, z + h - r * 2.22], [c * 2.4, s * 2.4, -1.2], r * 0.9, 6);
      } else {
        cylZ(p, x, y, z, z + h, r, 8);
        cylZ(p, x, y, z + h, z + h + r * 0.5, r * 1.7, 8, r * 0.6);
      }
    },
    /* an inclined or vertical ladder from foot A to head B; side = the
       horizontal unit vector across it; w its width (0.5), rungs 0.3 apart */
    ladder: function (K, A, B, side, w, step) {
      var p = K.pen("metal", "metal");
      w = (w || 0.5) / 2; step = step || 0.3;
      var e = [side[0] * w, side[1] * w, 0], d = sub(B, A), L = Math.sqrt(dot(d, d)), n = Math.max(1, Math.floor(L / step)), i;
      tube(p, add(A, e, 1), add(B, e, 1), 0.025, 0.025, 4, false);
      tube(p, add(A, e, -1), add(B, e, -1), 0.025, 0.025, 4, false);
      for (i = 1; i <= n; i++) { var q = add(A, d, i / (n + 0.5)); tube(p, add(q, e, 1), add(q, e, -1), 0.016, 0.016, 3, false); }
    },
    /* a boat on its chocks, bow along yaw: o.type "rib" (sponson tubes, a
       console; L 6, B 2.2) or "whaler" (a rigid pulling boat with thwarts) */
    boat: function (K, x, y, z, yaw, L, B, o) {
      o = o || {};
      var c = Math.cos(yaw || 0), s = Math.sin(yaw || 0), r = B * 0.2, pd = K.pen("dull", "dark"), pb = K.pen("plate", "boat"), pm = K.pen("metal", "metal"), i;
      function Q(a, b, h) { return [x + c * a - s * b, y + s * a + c * b, z + h]; }
      if (o.type === "whaler") {
        var rings = [], T = [[-0.5, 0.55, 0.9], [-0.3, 0.95, 1], [0.1, 1, 1], [0.35, 0.7, 1.02], [0.5, 0.02, 1.15]];
        T.forEach(function (t) {
          var ring = [], k;
          for (k = 0; k <= 6; k++) { var a = -PI + PI * k / 6; ring.push(Q(t[0] * L, Math.cos(a) * B / 2 * t[1], B * 0.42 * t[2] + Math.sin(a) * B * 0.42 * (0.6 + 0.4 * Math.abs(Math.cos(a))))); }
          rings.push(ring);
        });
        gridSkin(pb, rings, T.map(function (t) { return Q(t[0] * L, 0, B * 0.42); }));
        gridSkin(pd, rings.map(function (g2) { return g2.map(function (q) { return mix(q, Q(0, 0, B * 0.42), 0.04); }); }), T.map(function (t) { return Q(t[0] * L, 0, B * 0.42); }), { inward: true });
        for (i = -1; i <= 1; i++) obox(K.pen("dull", "wood"), Q(i * L * 0.22, 0, B * 0.36), [c, s, 0], [-s, c, 0], [0, 0, 1], 0.22, B * 0.86 * (1 - Math.abs(i) * 0.12), 0.04);
      } else {
        [-1, 1].forEach(function (e) {
          tube(pd, Q(-L / 2, e * (B / 2 - r), r), Q(L * 0.22, e * (B / 2 - r), r), r, r, 7, true);
          tube(pd, Q(L * 0.22, e * (B / 2 - r), r), Q(L / 2, e * r * 0.3, r * 1.4), r, r * 0.6, 7, true);
        });
        obox(pb, Q(-L * 0.04, 0, r * 0.5), [c, s, 0], [-s, c, 0], [0, 0, 1], L * 0.86, B - 2 * r, r * 0.9);
        boxZ(pb, x - c * L * 0.08, y - s * L * 0.08, z + r, L * 0.16, B * 0.35, r * 2.2, yaw);
        obox(pd, Q(-L * 0.47, 0, r * 1.2), [c, s, 0], [-s, c, 0], [0, 0, 1], L * 0.07, B * 0.3, r * 1.6);       /* the outboard motor */
      }
      [-0.28, 0.25].forEach(function (f) { obox(pm, Q(f * L, 0, -0.06), [c, s, 0], [-s, c, 0], [0, 0, 1], 0.12, B * 0.8, 0.12); });  /* chocks */
    },
    /* a boat davit: post, curved arm reaching `reach` along yaw, the fall */
    davit: function (K, x, y, z, yaw, h, reach) {
      var p = K.pen("metal", "metal"), c = Math.cos(yaw || 0), s = Math.sin(yaw || 0);
      h = h || 2.6; reach = reach || 1.6;
      var t = [x, y, z + h], m = [x + c * reach * 0.55, y + s * reach * 0.55, z + h + 0.2], e = [x + c * reach, y + s * reach, z + h - 0.2];
      tube(p, [x, y, z], t, 0.07, 0.06, 6, false); tube(p, t, m, 0.06, 0.05, 6, false); tube(p, m, e, 0.05, 0.045, 6, true);
      tube(p, e, [e[0], e[1], e[2] - 0.9], 0.012, 0.012, 3, false);
    },
    /* a life-raft canister on its cradle, axis along yaw (L 1.25, r 0.32) */
    raft: function (K, x, y, z, yaw, L, r) {
      var pw = K.pen("plate", "raft"), pm = K.pen("metal", "metal"), c = Math.cos(yaw || 0), s = Math.sin(yaw || 0);
      L = L || 1.25; r = r || 0.32;
      var zc = z + r + 0.08;
      tube(pw, [x - c * L / 2, y - s * L / 2, zc], [x + c * L / 2, y + s * L / 2, zc], r, r, 8, true);
      [-0.3, 0.3].forEach(function (f) {
        var px = x + c * L * f, py = y + s * L * f;
        tube(pm, [px - c * 0.04, py - s * 0.04, zc], [px + c * 0.04, py + s * 0.04, zc], r * 1.06, r * 1.06, 8, false);
        boxZ(pm, px, py, z, 0.1, r * 1.8, 0.22, yaw);
      });
    },
    /* a row of scuttles (portholes) at points pts with outward normals nrm
       (H.line gives both): a dark glass and a rim, r 0.16                  */
    scuttles: function (K, pts, nrm, r) {
      var pg = K.pen("dull", "ink"), pr = K.pen("metal", "metal");
      r = r || 0.16;
      pts.forEach(function (q, i) {
        var n = typeof nrm[0] === "number" ? nrm : nrm[i];
        disc(pg, add(q, n, 0.02), n, r, 8);
        tube(pr, add(q, n, 0.0), add(q, n, 0.035), r * 1.25, r * 1.05, 8, false);
      });
    },
    /* a whip aerial h tall with its base insulator */
    whip: function (K, x, y, z, h, r) {
      var p = K.pen("metal", "metal");
      r = r || 0.03;
      cylZ(K.pen("dull", "white"), x, y, z, z + 0.3, r * 2.5, 6);
      tube(p, [x, y, z + 0.3], [x, y, z + (h || 6)], r, r * 0.3, 4, false);
    },
    /* a four-legged lattice mast: o.base [xAft, xFwd, halfWidth] at o.z0,
       o.top the same at o.z1; o.bays tiers of X bracing (5); a platform at
       the top.  Returns the platform's centre.  (ru_riga.js latticeMast)  */
    latticeMast: function (K, o) {
      var p = K.pen("metal", "metal"), b = o.base, t = o.top, n = o.bays || 5, i, k;
      var legs = [[b[0], -b[2], t[0], -t[2]], [b[1], -b[2], t[1], -t[2]], [b[1], b[2], t[1], t[2]], [b[0], b[2], t[0], t[2]]];
      function at(L, f) { return [L[0] + (L[2] - L[0]) * f, L[1] + (L[3] - L[1]) * f, o.z0 + (o.z1 - o.z0) * f]; }
      for (i = 0; i < 4; i++) tube(p, at(legs[i], 0), at(legs[i], 1), o.leg || 0.09, (o.leg || 0.09) * 0.8, 5, false);
      for (k = 0; k <= n; k++) for (i = 0; i < 4; i++) {
        var a = at(legs[i], k / n), q = at(legs[(i + 1) % 4], k / n);
        tube(p, a, q, 0.045, 0.045, 3, false);
        if (k < n) { tube(p, a, at(legs[(i + 1) % 4], (k + 1) / n), 0.03, 0.03, 3, false); tube(p, q, at(legs[i], (k + 1) / n), 0.03, 0.03, 3, false); }
      }
      var cx = (t[0] + t[1]) / 2;
      box(K.pen("plate"), t[0] - 0.25, t[1] + 0.25, -t[2] - 0.25, t[2] + 0.25, o.z1, o.z1 + 0.08);
      return [cx, 0, o.z1 + 0.08];
    },
    /* a radar or director on its pedestal at (x, y, z), facing o.yaw:
       o.type "dish"  a parabolic dish, rim radius o.r, with its feed
              "bar"   a slotted-waveguide / cheese bar o.w wide, o.h tall
              "dome"  a radome of radius o.r
              "panel" a flat array face o.w x o.h, leaning back o.tilt      */
    radar: function (K, x, y, z, o) {
      o = o || {};
      var pm = K.pen("metal", "metal"), pw = K.pen("plate", o.col || "plate"), yaw = o.yaw || 0, c = Math.cos(yaw), s = Math.sin(yaw), ped = o.ped === undefined ? 0.6 : o.ped, r = o.r || 0.8, i, j;
      if (ped > 0) cylZ(pm, x, y, z, z + ped, Math.max(0.08, r * 0.14), 8, Math.max(0.06, r * 0.1));
      var zc = z + ped, fw = [c, s, 0], sd = [-s, c, 0], up = [0, 0, 1];
      function Q(f, a, u) { return [x + fw[0] * f + sd[0] * a, y + fw[1] * f + sd[1] * a, zc + u]; }
      if (o.type === "dome") { sphere(K.pen("plate", o.col || "white"), [x, y, zc + r * 0.8], r, 12, 6, -0.9, PI / 2); cylZ(pm, x, y, zc, zc + r * 0.15, r * 0.7, 10); }
      else if (o.type === "bar") {
        var w = o.w || 2.4, h = o.h || 0.5;
        obox(pm, Q(0, 0, 0.12), fw, sd, up, 0.3, 0.3, 0.24);
        obox(pw, Q(0, 0, 0.24 + h / 2), fw, sd, up, 0.14, w, h);
        obox(K.pen("dull", "dark"), Q(0.075, 0, 0.24 + h / 2), fw, sd, up, 0.012, w * 0.94, h * 0.5);
      } else if (o.type === "panel") {
        var pw2 = o.w || 2, ph = o.h || 2, tl = o.tilt || 0.2, n = [Math.cos(tl) * c, Math.cos(tl) * s, Math.sin(tl)], u2 = unit(cross(n, sd));
        if (u2[2] < 0) u2 = [-u2[0], -u2[1], -u2[2]];
        obox(pw, add([x, y, zc], u2, ph / 2), n, sd, u2, 0.25, pw2, ph);
        obox(K.pen("dull", "dark"), add(add([x, y, zc], u2, ph / 2), n, 0.13), n, sd, u2, 0.012, pw2 * 0.86, ph * 0.86);
      } else {
        var G = [], A = [], nr = 4, ns = 12, tl2 = o.tilt || 0, ct = Math.cos(tl2), st2 = Math.sin(tl2);
        for (i = 0; i <= nr; i++) {
          var row = [], rr = r * i / nr, dp = r * 0.28 * (i / nr) * (i / nr);
          for (j = 0; j <= ns; j++) { var a = j / ns * TAU, la = Math.cos(a) * rr, ua = Math.sin(a) * rr; row.push(Q(dp * ct - ua * st2 + 0.15, la, r + ua * ct + dp * st2)); }
          G.push(row); A.push(Q(2, 0, r));
        }
        gridSkin(pw, G, A, { inward: true });                                /* the reflecting face looks forward */
        gridSkin(pm, G.map(function (g2) { return g2.map(function (q) { return add(q, fw, -0.02); }); }), A);
        tube(pm, Q(0.15, 0, r), Q(0.15 + r * 0.55 * ct, 0, r + r * 0.55 * st2), 0.03, 0.03, 4, false);
        obox(pm, Q(0.15 + r * 0.55 * ct, 0, r + r * 0.55 * st2), fw, sd, up, 0.1, 0.1, 0.1);
        obox(pm, Q(-0.05, 0, r * 0.9), fw, sd, up, 0.3, 0.3, r * 0.5);
      }
    },
    /* a gun house with its barrel(s) along +X at rest, standing on a ring
       at (x, y, z).  Call it on K.group("turret", { at: [x, y, z] }) for
       the main gun.  o: { len, w, h house size; front: slope set-back;
       barrels: count; cal: bore radius; blen: barrel length; ring: radius;
       elev: radians }.  Returns the faceted house (panel / door / roofEdge)*/
    gunHouse: function (K, x, y, z, o) {
      o = o || {};
      var L = o.len || 3.2, w = o.w || 2.4, h = o.h || 2.0, pp = o.pen || K.pen("plate"), pm = K.pen("metal", "dark"), n = o.barrels || 1, cal = o.cal || 0.07, bl = o.blen || 4.2, i;
      var ring = o.ring || Math.min(L, w) * 0.46;
      cylZ(pm, x, y, z, z + 0.14, ring, 16);
      var B = K.facetedHouse(pp, [
        { z: z + 0.14, x0: x - L * 0.5, x1: x + L * 0.42, hw: w / 2, ca: w * 0.12, cf: w * 0.2 },
        { z: z + 0.14 + h * 0.55, lean: { side: w * 0.02, front: 0, aft: 0 } },
        { z: z + 0.14 + h, lean: { side: w * 0.10, front: o.front === undefined ? L * 0.22 : o.front, aft: L * 0.05 } }], { y: y });
      var gz = z + 0.14 + h * 0.5, el = o.elev || 0, ce = Math.cos(el), se = Math.sin(el);
      for (i = 0; i < n; i++) {
        var gy = y + (i - (n - 1) / 2) * cal * 6, x0 = x + L * 0.36;
        K.revolve(pm, [[0, cal * 2.6], [bl * 0.16, cal * 2.2], [bl * 0.18, cal * 1.5], [bl * 0.92, cal * 1.25], [bl * 0.93, cal * 1.6], [bl, cal * 1.6]],
                  { at: [x0, gy, gz], axis: [ce, 0, se], seg: 10 });
        disc(K.pen("dull", "ink"), [x0 + ce * (bl + 0.004), gy, gz + se * (bl + 0.004)], [ce, 0, se], cal, 8);
        sphere(K.pen("dull", "canvas"), [x0 + 0.05, gy, gz], [cal * 5, cal * 4, cal * 4.5], 8, 5);             /* the blast bag */
      }
      return B;
    }
  };

  /* =============================================================== AIRCRAFT
     (us_ef111a.js, nato_e80_fighter.js)                                   */
  var AIR = {
    /* an air intake.  o: { x: the lip's station, y, z: its centre,
       w, h: half sizes of the mouth, e: superellipse exponent (3 = a
       rounded box, 2 = round), len: length of the cowl back to where it
       meets the body, w1, h1, y1, z1: the cowl's section there (default the
       mouth's), rake: how far the lower lip sits aft of the upper,
       depth: the dark duct's depth (1.2), lip: lip thickness (0.035),
       splitter: { gap, fwd, len } a plate on the inboard side (side = sign
       of y), n: points round (16) }.  Draws the cowl in the skin pen, the
       lip ring in metal, the duct and the compressor face in ink.         */
    intake: function (K, o) {
      var ps = o.pen || K.pen("skin"), pl = K.pen("metal", "steel"), pi = K.pen("dull", "ink"), n = o.n || 16, e = o.e || 3, lip = o.lip || 0.035;
      var x = o.x, y = o.y || 0, z = o.z, w = o.w, h = o.h, rake = o.rake || 0, len = o.len || 2, d = o.depth || 1.2;
      function ring(xx, yy, zz, ww, hh, rk) {
        return ringSE(xx, yy, ww, zz + hh, zz - hh, zz, e, e, n).map(function (q) { return [q[0] - rk * (zz + hh - q[2]) / (2 * hh), q[1], q[2]]; });
      }
      var R0 = ring(x, y, z, w, h, rake), R0i = ring(x - 0.01, y, z, w - lip, h - lip, rake);
      var R1 = ring(x - len, o.y1 === undefined ? y : o.y1, o.z1 === undefined ? z : o.z1, o.w1 || w, o.h1 || h, 0);
      loft(ps, [R1, ring(x - len * 0.5, lerp(y, o.y1 === undefined ? y : o.y1, 0.5), lerp(z, o.z1 === undefined ? z : o.z1, 0.5), lerp(w, o.w1 || w, 0.5), lerp(h, o.h1 || h, 0.5), rake * 0.3), R0], {});
      loft(pl, [R0, R0i], { flat: true });
      var R2 = ring(x - d, y, z, (w - lip) * 0.82, (h - lip) * 0.82, 0);
      loft(pi, [R0i, R2], { inward: true, capB: true });
      if (o.splitter) {
        var sp = o.splitter, sg = y >= 0 ? 1 : -1, yi = y - sg * (w + (sp.gap || 0.08));
        prism(K.pen("skin"), [[x + (sp.fwd || 0.35), z], [x - rake * 0.5, z + h * 0.95], [x - (sp.len || 1.2), z + h * 0.95], [x - (sp.len || 1.2), z - h * 0.95], [x - rake, z - h * 0.95]], "xz", yi - 0.012, yi + 0.012);
      }
    },
    /* a jet nozzle of o.petals (16) flat petals from the shroud (radius
       o.r0 at station o.x) back to the exit (o.r1, o.len aft); the petals
       alternate two burnt-metal shades, the inside is dark with a turbine
       face o.depth forward of the exit.  o.y, o.z its axis.               */
    nozzle: function (K, o) {
      var n = o.petals || 16, x = o.x, y = o.y || 0, z = o.z || 0, r0 = o.r0, r1 = o.r1 === undefined ? r0 * 0.8 : o.r1, L = o.len || 1.0, i;
      var pa = K.pen("metal", o.col || "burnt"), pb = pa.tint(o.col2 || 0x4a4541), pi = K.pen("dull", "ink"), pr = K.pen("metal", "steel");
      function P(xx, r, k) { var a = k / n * TAU; return [xx, y + Math.cos(a) * r, z + Math.sin(a) * r]; }
      var c0 = [x - L / 2, y, z];
      for (i = 0; i < n; i++) {
        var p = i % 2 ? pb : pa;
        quad(p, P(x, r0, i), P(x, r0, i + 1), P(x - L * 0.45, lerp(r0, r1, 0.35), i + 1), P(x - L * 0.45, lerp(r0, r1, 0.35), i), c0);
        quad(p, P(x - L * 0.45, lerp(r0, r1, 0.35), i), P(x - L * 0.45, lerp(r0, r1, 0.35), i + 1), P(x - L, r1, i + 1), P(x - L, r1, i), c0);
        quad(pi, P(x - L, r1 - 0.012, i + 1), P(x - L, r1 - 0.012, i), P(x - L + (o.depth || L * 0.9), r0 * 0.78, i), P(x - L + (o.depth || L * 0.9), r0 * 0.78, i + 1), [x - L / 2, y, z + r0 * 3]);
        quad(pr, P(x - L, r1, i), P(x - L, r1, i + 1), P(x - L, r1 - 0.012, i + 1), P(x - L, r1 - 0.012, i), [x, y, z]);
      }
      var xt = x - L + (o.depth || L * 0.9);
      disc(pi.tint(0x1c1a18), [xt, y, z], [-1, 0, 0], r0 * 0.78, n);
      tube(pr, [xt - 0.02, y, z], [xt - 0.16, y, z], r0 * 0.30, r0 * 0.05, 8, true);            /* the tail cone */
      tube(pr, [xt - 0.03, y, z], [xt - 0.05, y, z], r0 * 0.56, r0 * 0.56, n, false);           /* the flame holder */
    },
    /* a canopy from MEASURED rows [{ x, w, sill, top }] (half width at the
       sill, the sill's z, the top's z; w = 0 closes an end): the glazing in
       glass, a frame hoop at each x of o.frames, the sill rails and, with
       o.spine, a centre-line frame.  o.e the section's exponent (2.2).    */
    canopy: function (K, rows, o) {
      o = o || {};
      var pg = K.pen("glass"), pf = K.pen("dull", o.col || "frame"), e = o.e || 2.2, m = o.n || 10, fw = o.frameW || 0.06;
      var tb = rows.map(function (r) { return [r.x, r.w, r.sill, r.top]; }).sort(function (a, b) { return a[0] - b[0]; });
      var x0 = tb[0][0], x1 = tb[tb.length - 1][0];
      function half(x, push) {
        var v = tab(tb, x), out = [], k;
        for (k = 0; k <= m; k++) {
          var a = k / m * PI, c = Math.cos(a), s = Math.sin(a), q = [x, Math.max(0, v[0]) * sgp(c, 2 / e), v[1] + (v[2] - v[1]) * sgp(s, 2 / e)];
          out.push(push ? add(q, unit([0, c * (v[2] - v[1]), s * Math.max(v[0], 0.01)]), push) : q);
        }
        return out;
      }
      var xs = stationsOf(x0, x1, o.step || (x1 - x0) / 14, tb.map(function (r) { return r[0]; }).concat(o.frames || []));
      gridSkin(pg, xs.map(function (x) { return half(x); }), xs.map(function (x) { return [x, 0, tab(tb, x)[1] - 0.2]; }));
      (o.frames || []).forEach(function (x) {
        var H = half(x), v = tab(tb, x);
        ribbon(pf, H, function (q, i) { var a = i / m * PI; return [0, Math.cos(a) * (v[2] - v[1]), Math.sin(a) * Math.max(v[0], 0.01)]; }, fw, 0.01);
      });
      [0, m].forEach(function (k) {
        ribbon(pf, xs.map(function (x) { return half(x)[k]; }), [0, k ? -1 : 1, 0.25], fw, 0.01);
      });
      if (o.spine) ribbon(pf, xs.map(function (x) { return half(x)[m / 2 | 0]; }), [0, 0, 1], fw, 0.01);
    },
    /* an undercarriage leg standing on z = 0.  Call it on the "gear" group.
       o: { x, y: the leg; top: z of its pivot in the airframe; r: wheel
       radius; w: wheel width; twin: two wheels; side: which side of the leg
       a single wheel sits (+1 / -1 / 0 = on the axis, in a fork);
       rake: the axle's x offset from the pivot; strut: leg radius (0.05);
       door: { len, h, side } a door plate hanging beside the leg;
       brace: [x, y, z] the airframe end of a drag brace }.
       Draws the leg, the chromed oleo, torque links, the axle, the wheel(s)
       with hubs, the brace and the door.                                  */
    gearLeg: function (K, o) {
      var ps = K.pen("metal", o.col || "strut"), pc = K.pen("metal", "chrome"), pr = K.pen("dull", "rubber"), ph = K.pen("metal", "white");
      var x = o.x, y = o.y || 0, r = o.r, w = o.w || r * 0.6, sr = o.strut || 0.05, ax = [x + (o.rake || 0), y, r], top = [x, y, o.top];
      var mid = mix(top, ax, 0.55), sd = o.twin ? 0 : (o.side === undefined ? 1 : o.side), i;
      tube(ps, top, mid, sr, sr, 8, true);
      tube(pc, mid, add(ax, [0, 0, 1], sr * 0.5), sr * 0.62, sr * 0.62, 8, false);
      var kn = add(mix(mid, ax, 0.5), [1, 0, 0], -sr * 3.4);                                        /* torque links */
      bar(ps, add(mid, [0, 0, 1], -sr), kn, sr * 0.5, sr * 0.9); bar(ps, kn, add(ax, [0, 0, 1], sr * 1.2), sr * 0.5, sr * 0.9);
      function wheel(yc) {
        K.revolve(pr, [[-w / 2, r * 0.62], [-w / 2, r * 0.88], [-w * 0.3, r], [w * 0.3, r], [w / 2, r * 0.88], [w / 2, r * 0.62]], { at: [ax[0], yc, r], axis: "y", seg: 16 });
        K.revolve(ph, [[-w / 2 - 0.006, r * 0.2], [-w / 2 - 0.006, r * 0.6], [-w * 0.3, r * 0.63], [w * 0.3, r * 0.63], [w / 2 + 0.006, r * 0.6], [w / 2 + 0.006, r * 0.2]], { at: [ax[0], yc, r], axis: "y", seg: 12 });
      }
      if (o.twin) { wheel(y - w * 0.75); wheel(y + w * 0.75); tube(ps, [ax[0], y - w * 1.2, r], [ax[0], y + w * 1.2, r], sr * 0.7, sr * 0.7, 8, true); }
      else if (sd) { wheel(y + sd * (w * 0.5 + sr * 0.9)); tube(ps, [ax[0], y, r], [ax[0], y + sd * (w + sr), r], sr * 0.7, sr * 0.7, 8, true); }
      else {
        wheel(y);
        for (i = -1; i <= 1; i += 2) { bar(ps, [ax[0], y + i * (w / 2 + 0.03), r], [ax[0], y + i * (w / 2 + 0.03), r * 1.9], 0.035, 0.05); }
        bar(ps, [ax[0], y - w / 2 - 0.03, r * 1.9], [ax[0], y + w / 2 + 0.03, r * 1.9], 0.05, 0.05);
        tube(pc, [ax[0], y - w / 2 - 0.05, r], [ax[0], y + w / 2 + 0.05, r], 0.02, 0.02, 6, true);
      }
      if (o.brace) tube(ps, o.brace, mix(top, mid, 0.7), sr * 0.5, sr * 0.5, 6, true);
      if (o.door) {
        var dl = o.door.len || 0.9, dh = o.door.h || (o.top - r) * 0.7, dy = y + (o.door.side || -1) * (sr + 0.09);
        box(K.pen(K.R.mats.skin ? "skin" : "dull", K.R.mats.skin ? undefined : "white"), x - dl / 2, x + dl / 2, dy - 0.012, dy + 0.012, o.top - dh, o.top);
      }
    },
    /* a stores pylon under a wing: o.x the leading edge at the wing, o.y,
       o.z the wing's underside there; len (1.6), h (0.3), t (0.08)        */
    pylon: function (K, o) {
      var len = o.len || 1.6, h = o.h || 0.3;
      blade(o.pen || K.pen("skin"), [o.x - len / 2, o.y, o.z + 0.02], [0, 0, -1], [1, 0, 0], h + 0.02, len, len * 0.8, o.t || 0.08, len * 0.08);
    },
    /* a panel seam / hinge line: a dark strip w wide along a polyline on
       the skin (B.hoop, B.line, F.line give { pts, nrm })                 */
    seam: function (K, line, w, col) { ribbon(K.pen("dull", col || "seam"), line.pts, line.nrm, w || 0.025, 0.006); },
    /* a seam hoop round a body B at station x, from angle a0 to a1 */
    hoop: function (K, B, x, a0, a1, w, col) { AIR.seam(K, B.hoop(x, a0 === undefined ? 0 : a0, a1 === undefined ? TAU : a1, 20), w, col); },
    /* a navigation / formation lamp at q: an eight-faced bead of radius r
       in a palette colour (lampRed port, lampGreen starboard, lampWhite)  */
    lamp: function (K, q, r, col) { sphere(K.pen("lamp", col || "lampWhite"), q, r || 0.05, 4, 2); },
    /* a pitot / probe from base q along dir, len long */
    pitot: function (K, q, dir, len) {
      var d = unit(dir), p = K.pen("metal", "steel");
      len = len || 0.5;
      tube(p, q, add(q, d, len * 0.4), 0.018, 0.014, 5, false);
      tube(p, add(q, d, len * 0.4), add(q, d, len), 0.009, 0.006, 4, true);
    },
    /* a blade aerial standing on q along up: h tall, chord c */
    aerial: function (K, q, up, h, c, col) { blade(K.pen("dull", col || "dark"), q, up, [1, 0, 0], h || 0.25, c || 0.22, (c || 0.22) * 0.45, 0.02, (c || 0.22) * 0.3); }
  };

  /* =============================================================== VEHICLES
     (redo_pla_roc_ground.js, nato_e90_mbt.js, us_m113.js).  Wheels always
     turn about +Y: there is no way to lay one flat.                       */
  /* a lugged road tyre on its rim, hub and wheel nuts: centre c, radius R,
     half width H, s = +1 port / -1 starboard (the hub faces outward)      */
  function tyre(K, c, s, R, H, col, nseg) {
    var N = nseg || 16, kr = R / 0.75, kh = H / 0.30, pt = K.pen("dull", "rubber"), pr = K.pen("dull", col || "paint"), pm = K.pen("dull", "dark");
    var P = [[-0.30, 0.47, 0, 0], [-0.30, 0.64, 0, 0], [-0.25, 0.73, 1, 0], [-0.10, 0.75, 1, 0], [-0.02, 0.75, 1, 1],
             [0.02, 0.75, 1, 0], [0.10, 0.75, 1, 1], [0.25, 0.73, 1, 1], [0.30, 0.64, 0, 0], [0.30, 0.47, 0, 0]];
    var rings = P.map(function (q) {
      var ring = [], j;
      for (j = 0; j < N; j++) {
        var r = q[1] * kr, a = j / N * TAU;
        if (q[2] && ((j + q[3]) % 2)) r -= 0.04 * kr;                       /* the tread lugs */
        ring.push([c[0] + r * Math.cos(a), c[1] + q[0] * kh, c[2] + r * Math.sin(a)]);
      }
      return ring;
    });
    loft(pt, rings, { hard: true, capA: true, capB: true });
    tube(pr, [c[0], c[1] + s * 0.29 * kh, c[2]], [c[0], c[1] + s * 0.33 * kh, c[2]], 0.46 * kr, 0.40 * kr, N, true);
    tube(pr, [c[0], c[1] + s * 0.33 * kh, c[2]], [c[0], c[1] + s * 0.40 * kh, c[2]], 0.17 * kr, 0.17 * kr, 10, true);
    var nn = N < 16 ? 5 : 8, j;
    for (j = 0; j < nn; j++) {
      var a = (j + 0.5) / nn * TAU;
      tube(pm, [c[0] + Math.cos(a) * 0.26 * kr, c[1] + s * 0.32 * kh, c[2] + Math.sin(a) * 0.26 * kr], [c[0] + Math.cos(a) * 0.26 * kr, c[1] + s * 0.355 * kh, c[2] + Math.sin(a) * 0.26 * kr], 0.022 * kr, 0.022 * kr, 5, true);
    }
  }
  /* a tracked vehicle's road wheel pair: rubber tyre, dished disc, hub and
     nut ring; centre c, radius r, the pair w wide over both discs         */
  function roadWheel(K, c, s, r, w, col) {
    var pt = K.pen("dull", "rubber"), pd = K.pen("dull", col || "paint"), pm = K.pen("dull", "dark"), e, j;
    for (e = -1; e <= 1; e += 2) {
      var yc = c[1] + e * w * 0.28;
      tube(pt, [c[0], yc - w * 0.2, c[2]], [c[0], yc + w * 0.2, c[2]], r, r, 16, true);
    }
    var yo = c[1] + s * w * 0.48;
    tube(pd, [c[0], yo, c[2]], [c[0], yo + s * 0.025, c[2]], r * 0.80, r * 0.66, 14, true);
    tube(pd, [c[0], yo + s * 0.025, c[2]], [c[0], yo + s * 0.07, c[2]], r * 0.26, r * 0.22, 10, true);
    for (j = 0; j < 8; j++) {
      var a = j / 8 * TAU + 0.2;
      tube(pm, [c[0] + Math.cos(a) * r * 0.42, yo + s * 0.02, c[2] + Math.sin(a) * r * 0.42], [c[0] + Math.cos(a) * r * 0.42, yo + s * 0.045, c[2] + Math.sin(a) * r * 0.42], 0.018, 0.018, 5, true);
    }
  }
  /* the convex outline of circles [[x, z, r], ...] (a track round its wheels) */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  var VEH = {
    /* both track runs with their running gear, standing on z = 0.
       o: { wheels: [x, ...] road wheel stations; r: road wheel radius;
            y: the track's centre line (half the track gauge); w: track
            width; sprocket: { x, z, r, teeth }; idler: { x, z, r };
            rollers: [[x, z, r], ...] return rollers; pitch: shoe pitch
            (0.15); shoe: shoe thickness (0.06); col: wheel paint }
       The belt is wound round the wheels (so it climbs over a raised
       sprocket), shoes at every pitch, a guide horn on every other one.
       Each road wheel station is a "roadwheel" group (both sides), origin
       on its axle, which the engine spins; sprocket, idler and rollers are
       static.  Returns { z: the axle height, top: the belt's top z }.     */
    trackRun: function (K, o) {
      var r = o.r, sh = o.shoe || 0.06, zw = r + sh, ty = o.y, tw = (o.w || 0.4) / 2, pitch = o.pitch || 0.15, pb = K.pen("dull", "track"), pm = K.pen("dull", "dark"), pp = K.pen("dull", o.col || "paint");
      var C = o.wheels.map(function (x) { return [x, zw, r]; }), i, k, s;
      if (o.sprocket) C.push([o.sprocket.x, o.sprocket.z, o.sprocket.r]);
      if (o.idler) C.push([o.idler.x, o.idler.z, o.idler.r]);
      (o.rollers || []).forEach(function (q) { C.push(q); });
      var pts = [];
      for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * (C[i][2] + sh * 0.3), C[i][1] + Math.sin(k / 24 * TAU) * (C[i][2] + sh * 0.3)]);
      pts = hull2(pts);
      var segs = [], tot = 0, n = pts.length, top = -Infinity;
      for (i = 0; i < n; i++) {
        var a = pts[i], b = pts[(i + 1) % n], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
        top = Math.max(top, a[1]);
        if (l > 1e-4) { segs.push([a, b, l]); tot += l; }
      }
      var cnt = Math.round(tot / pitch), step = tot / cnt;
      function belt(p, x0, z0, x1, z1, y0, y1, th) {
        var dx = x1 - x0, dz = z1 - z0, l = Math.hypot(dx, dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
        hexa(p, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
                 [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
      }
      for (s = -1; s <= 1; s += 2) {
        var y = s * ty, q = 0, rem = 0;
        for (i = 0; i < segs.length; i++) if (segs[i][2] > 0.02) belt(pb, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - tw + 0.02, y + tw - 0.02, sh * 0.5);
        for (k = 0; k < cnt; k++) {
          var d = (k + 0.5) * step;
          while (q < segs.length - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
          var t = (d - rem) / segs[q][2], a2 = segs[q][0], b2 = segs[q][1], dx = (b2[0] - a2[0]) / segs[q][2], dz = (b2[1] - a2[1]) / segs[q][2];
          var px = a2[0] + (b2[0] - a2[0]) * t, pz = a2[1] + (b2[1] - a2[1]) * t;
          /* the shoe stands outside the belt line (the loop runs counter-clockwise in XZ) */
          belt(pb, px - dx * pitch * 0.38 + dz * sh * 0.2, pz - dz * pitch * 0.38 - dx * sh * 0.2, px + dx * pitch * 0.38 + dz * sh * 0.2, pz + dz * pitch * 0.38 - dx * sh * 0.2, y - tw, y + tw, sh * 0.7);
          if (k % 2 === 0) belt(pm, px - dx * 0.025 - dz * 0.05, pz - dz * 0.025 + dx * 0.05, px + dx * 0.025 - dz * 0.05, pz + dz * 0.025 + dx * 0.05, y - 0.025, y + 0.025, 0.07);
        }
        if (o.sprocket) {
          var sp = o.sprocket, nt = sp.teeth || 12, h;
          for (h = -1; h <= 1; h += 2) {
            cylY(pm, sp.x, y + h * tw * 0.5 - 0.03, y + h * tw * 0.5 + 0.03, sp.z, sp.r - 0.03, 20);
            for (k = 0; k < nt; k++) {
              var an = k / nt * TAU;
              obox(pm, [sp.x + Math.cos(an) * (sp.r - 0.01), y + h * tw * 0.5, sp.z + Math.sin(an) * (sp.r - 0.01)], [Math.cos(an), 0, Math.sin(an)], [0, 1, 0], [-Math.sin(an), 0, Math.cos(an)], 0.08, 0.06, 0.06);
            }
          }
          tube(pp, [sp.x, y + s * tw * 0.7, sp.z], [sp.x, y + s * (tw * 0.7 + 0.06), sp.z], sp.r - 0.06, sp.r - 0.14, 16, true);
          tube(pm, [sp.x, y + s * (tw * 0.7 + 0.06), sp.z], [sp.x, y + s * (tw * 0.7 + 0.10), sp.z], 0.09, 0.09, 10, true);
          tube(pp, [sp.x, y - s * tw * 0.7, sp.z], [sp.x, y - s * (tw + 0.25), sp.z], 0.20, 0.24, 12, true);          /* the final drive */
        }
        if (o.idler) roadWheel(K, [o.idler.x, y, o.idler.z], s, o.idler.r, tw * 1.7, o.col);
        (o.rollers || []).forEach(function (q2) { cylY(pm, q2[0], y - tw * 0.6, y + tw * 0.6, q2[1], q2[2], 10); });
      }
      o.wheels.forEach(function (x) {
        var G = K.group("roadwheel", { at: [x, 0, zw] });
        for (var e = -1; e <= 1; e += 2) {
          roadWheel(G, [x, e * ty, zw], e, r, tw * 1.7, o.col);
          bar(pm, [x + 0.04, e * (ty - tw - 0.02), zw], [x + r * 1.5, e * (ty - tw - 0.02), zw + r * 0.5], 0.09, 0.14);        /* the swing arm (static) */
        }
        tube(G.pen("dull", "dark"), [x, -ty + tw, zw], [x, ty - tw, zw], 0.05, 0.05, 6, false);
      });
      return { z: zw, top: top + sh * 0.5 };
    },
    /* wheeled running gear standing on z = 0: one "roadwheel" group per
       axle (both sides: tyres, rims, hubs, nuts, the axle), origin on the
       axle.  o: { axles: [x, ...], r: tyre radius, hw: tyre half width
       (0.3 r), y: wheel centre line (half the track), dual: [bool per axle]
       twin tyres, col: rim paint, seg: 16 }.  Returns { z: axle height }. */
    wheels: function (K, o) {
      var r = o.r, hw = o.hw || r * 0.3;
      o.axles.forEach(function (x, i) {
        var G = K.group("roadwheel", { at: [x, 0, r] }), s;
        for (s = -1; s <= 1; s += 2) {
          tyre(G, [x, s * o.y, r], s, r, hw, o.col, o.seg);
          if (o.dual && o.dual[i]) tyre(G, [x, s * (o.y - 2.1 * hw), r], s, r, hw, o.col, o.seg);
        }
        var pd = G.pen("dull", "dark");
        tube(pd, [x, -(o.y - hw), r], [x, o.y - hw, r], 0.07, 0.07, 8, false);
        if (o.diff !== false) sphere(pd, [x, 0, r], [0.2, 0.26, 0.2], 8, 4);
      });
      return { z: r };
    },
    /* a side skirt of plates.  o: { y: its inner face (side +1 / -1 or both
       when o.side is omitted), t: thickness (0.03), top: z of its top edge,
       joints: [x, ...] plate boundaries from rear to front, bot: z of the
       lower edge, or [z per plate]; lip: the folded top lip; rubber: a
       rubber strip under the plates; col }.  Every joint gets a dark gap,
       a hinge block and a catch; every plate a stiffening flange and a row
       of bolt heads.  (nato_e90_mbt.js buildSkirts)                       */
    skirt: function (K, o) {
      var J = o.joints, t = o.t || 0.03, top = o.top, pp = K.pen("paint", o.col), pd = K.pen("dull", "dark"), pm = K.pen("metal", "steel"), pr = K.pen("dull", "rubber");
      (o.side ? [o.side] : [-1, 1]).forEach(function (s) {
        var ya = s * o.y, yb = s * (o.y + t), y0 = Math.min(ya, yb), y1 = Math.max(ya, yb), yo = s * (o.y + t + 0.012), i, k;
        if (o.lip !== false) box(pp, J[0] - 0.05, J[J.length - 1] + 0.05, y0 - 0.02, y1 + 0.02, top - 0.03, top + 0.03);
        for (i = 0; i < J.length - 1; i++) {
          var xa = J[i] + 0.009, xb = J[i + 1] - 0.009, bot = typeof o.bot === "number" ? o.bot : o.bot[i];
          box(pp, xa, xb, y0, y1, bot, top - 0.03);
          box(pp, xa, xb, y0 - 0.005, y1 + 0.012, bot, bot + 0.05);
          if (o.rubber) box(pr, xa, xb, s > 0 ? y0 : y1 - 0.02, s > 0 ? y0 + 0.02 : y1, bot - 0.07, bot);
          for (k = 0; k < Math.max(2, Math.round((xb - xa) / 0.22)); k++) box(pm, xa + 0.07 + k * 0.22 - 0.016, xa + 0.07 + k * 0.22 + 0.016, Math.min(yo, yb), Math.max(yo, yb), top - 0.09, top - 0.06);
        }
        for (i = 1; i < J.length - 1; i++) {
          var bj = typeof o.bot === "number" ? o.bot : Math.max(o.bot[i - 1], o.bot[i]);
          box(pd, J[i] - 0.011, J[i] + 0.011, y0 - 0.004, y1 + 0.006, bj, top - 0.03);
          box(pm, J[i] - 0.05, J[i] + 0.05, Math.min(yb, yb + s * 0.03), Math.max(yb, yb + s * 0.03), top - 0.14, top - 0.05);
          box(pm, J[i] - 0.03, J[i] + 0.03, Math.min(yb, yb + s * 0.02), Math.max(yb, yb + s * 0.02), (top + bj) / 2 - 0.11, (top + bj) / 2 + 0.01);
        }
      });
    },
    /* a pioneer tool lying on a surface at height z, its handle along yaw:
       type "shovel" | "pick" | "axe" | "bar" | "sledge"; two clamps       */
    tool: function (K, type, x, y, z, yaw, len) {
      var c = Math.cos(yaw || 0), s = Math.sin(yaw || 0), pw = K.pen("dull", "wood"), pm = K.pen("metal", "steel"), L = len || (type === "bar" ? 1.4 : 1.0);
      function Q(a, b, h) { return [x + c * a - s * b, y + s * a + c * b, z + h]; }
      var fw = [c, s, 0], sd = [-s, c, 0], up = [0, 0, 1];
      tube(type === "bar" ? pm : pw, Q(-L / 2, 0, 0.035), Q(L / 2, 0, 0.035), 0.02, 0.018, 6, true);
      if (type === "shovel") { obox(pm, Q(L / 2 + 0.13, 0, 0.03), fw, sd, up, 0.28, 0.2, 0.02); }
      else if (type === "pick") { obox(pm, Q(L / 2, 0, 0.035), fw, sd, up, 0.05, 0.6, 0.04); }
      else if (type === "axe") { obox(pm, Q(L / 2 - 0.03, 0.06, 0.035), fw, sd, up, 0.14, 0.2, 0.03); }
      else if (type === "sledge") { obox(pm, Q(L / 2, 0, 0.04), fw, sd, up, 0.09, 0.22, 0.08); }
      [-0.25, 0.25].forEach(function (f) { obox(pm, Q(L * f, 0, 0.03), fw, sd, up, 0.03, 0.07, 0.06); });
    },
    /* a tow cable: a steel rope r thick through pts with an eye at each end */
    towCable: function (K, pts, r) {
      var p = K.pen("metal", "steel"), i;
      r = r || 0.016;
      for (i = 0; i + 1 < pts.length; i++) tube(p, pts[i], pts[i + 1], r, r, 5, false);
      [pts[0], pts[pts.length - 1]].forEach(function (q, e) {
        var nb = e ? pts[pts.length - 2] : pts[1], d = unit(sub(q, nb));
        tube(p, q, add(q, d, 0.12), r * 2.2, r * 2.2, 6, true);
        tube(p, add(q, d, 0.12), add(q, d, 0.2), r * 4, r * 4, 6, false);
      });
    },
    /* a lamp at q facing dir: housing, lens, and with o.guard a bar guard.
       o: { r: 0.08, col: "lampWhite" | "lampRed" | "lampAmber", guard }   */
    lamp: function (K, q, dir, o) {
      o = o || {};
      var d = unit(dir), r = o.r || 0.08, pp = K.pen("paint", o.paint), f = frame(d), i;
      tube(pp, add(q, d, -r * 1.2), q, r * 0.85, r, 10, true);
      disc(K.pen("lamp", o.col || "lampWhite"), add(q, d, 0.004), d, r * 0.86, 10);
      if (o.guard) {
        var pm = K.pen("metal", "dark"), up = Math.abs(f[1][2]) > Math.abs(f[0][2]) ? f[1] : f[0], sd = cross(d, up);
        for (i = -1; i <= 1; i++) {
          var a = add(add(q, sd, i * r * 0.8), up, -r * 1.25), b = add(add(q, sd, i * r * 0.8), up, r * 1.25);
          tube(pm, add(a, d, -r), add(a, d, r * 0.5), 0.01, 0.01, 3, false); tube(pm, add(a, d, r * 0.5), add(b, d, r * 0.5), 0.01, 0.01, 3, false); tube(pm, add(b, d, r * 0.5), add(b, d, -r), 0.01, 0.01, 3, false);
        }
        tube(pm, add(add(add(q, sd, -r * 0.8), up, 0), d, r * 0.5), add(add(q, sd, r * 0.8), d, r * 0.5), 0.01, 0.01, 3, false);
      }
    },
    /* a stowage box between two corners with a lid, hinges, hasps and (with
       o.straps) canvas straps; or with o.basket a tube-framed rack         */
    stowage: function (K, x0, x1, y0, y1, z0, z1, o) {
      o = o || {};
      var pp = K.pen("paint", o.col), pm = K.pen("metal", "steel"), i;
      if (o.basket) {
        var c = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], pt = K.pen("metal", "dark");
        for (i = 0; i < 4; i++) {
          var a = c[i], b = c[(i + 1) % 4];
          tube(pt, [a[0], a[1], z0], [a[0], a[1], z1], 0.015, 0.015, 4, false);
          [0, 0.5, 1].forEach(function (f) { tube(pt, [a[0], a[1], lerp(z0, z1, f)], [b[0], b[1], lerp(z0, z1, f)], 0.012, 0.012, 3, false); });
        }
        box(K.pen("dull", "canvas"), x0 + 0.04, x1 - 0.04, y0 + 0.04, y1 - 0.04, z0 + 0.02, lerp(z0, z1, 0.8));
        return;
      }
      box(pp, x0, x1, y0, y1, z0, z1 - 0.03);
      box(pp, x0 - 0.012, x1 + 0.012, y0 - 0.012, y1 + 0.012, z1 - 0.036, z1);
      var out = Math.abs(y1) > Math.abs(y0) ? y1 : y0, sg = out === y1 ? 1 : -1, n = Math.max(2, Math.round((x1 - x0) / 0.5));
      for (i = 0; i < n; i++) {
        var hx = x0 + (x1 - x0) * (i + 0.5) / n;
        box(pm, hx - 0.03, hx + 0.03, Math.min(out, out + sg * 0.014), Math.max(out, out + sg * 0.014), z1 - 0.10, z1 - 0.02);
        if (o.straps) box(K.pen("dull", "canvas"), hx - 0.2 - 0.02, hx - 0.2 + 0.02, y0 - 0.016, y1 + 0.016, z0, z1 + 0.004);
      }
    },
    /* a crew hatch on a roof at height z: o.r for a round one or o.lx, o.ly
       (yawed o.yaw); the ring, the lid, a hinge, a handle and o.scopes
       periscope blocks round it                                            */
    hatch: function (K, x, y, z, o) {
      o = o || {};
      var pp = K.pen("paint", o.col), pm = K.pen("metal", "steel"), yaw = o.yaw || 0, c = Math.cos(yaw), s = Math.sin(yaw), i, r = o.r || 0.3;
      if (o.lx) {
        boxZ(pp, x, y, z, o.lx + 0.06, o.ly + 0.06, 0.03, yaw); boxZ(pp, x, y, z + 0.022, o.lx, o.ly, 0.043, yaw);
        r = Math.max(o.lx, o.ly) / 2;
      } else { cylZ(pp, x, y, z, z + 0.04, r + 0.04, 16); cylZ(pp, x, y, z + 0.032, z + 0.075, r, 16, r * 0.92); }
      boxZ(pm, x - c * (o.lx ? o.lx / 2 : r), y - s * (o.lx ? o.lx / 2 : r), z + 0.02, 0.07, 0.22, 0.07, yaw);
      tube(pm, [x + c * r * 0.4 - s * 0.07, y + s * r * 0.4 + c * 0.07, z + 0.11], [x + c * r * 0.4 + s * 0.07, y + s * r * 0.4 - c * 0.07, z + 0.11], 0.012, 0.012, 4, false);
      for (i = 0; i < (o.scopes || 0); i++) {
        var a = yaw + (i - (o.scopes - 1) / 2) * 0.62;
        VEH.visionBlock(K, x + Math.cos(a) * (r + 0.13), y + Math.sin(a) * (r + 0.13), z, a, { w: 0.2, h: 0.09 });
      }
    },
    /* a vision block / periscope head at (x, y, z) looking along yaw */
    visionBlock: function (K, x, y, z, yaw, o) {
      o = o || {};
      var w = o.w || 0.24, h = o.h || 0.1, c = Math.cos(yaw || 0), s = Math.sin(yaw || 0);
      boxZ(K.pen("paint", o.col), x, y, z, 0.12, w, h, yaw);
      obox(K.pen("glass"), [x + c * 0.062, y + s * 0.062, z + h * 0.55], [c, s, 0], [-s, c, 0], [0, 0, 1], 0.008, w * 0.82, h * 0.5);
    },
    /* a bank of o.n smoke dischargers at (x, y, z), fanned about yaw by
       o.spread and raised o.elev (0.5): tubes on a bracket                 */
    smoke: function (K, x, y, z, yaw, o) {
      o = o || {};
      var n = o.n || 4, pd = K.pen("dull", "dark"), pm = K.pen("metal", "steel"), i, el = o.elev === undefined ? 0.5 : o.elev, c0 = Math.cos(yaw || 0), s0 = Math.sin(yaw || 0);
      boxZ(pm, x, y, z, 0.1, 0.11 * n, 0.04, yaw);
      for (i = 0; i < n; i++) {
        var f = i - (n - 1) / 2, a = (yaw || 0) + f * (o.spread === undefined ? 0.16 : o.spread), d = [Math.cos(a) * Math.cos(el), Math.sin(a) * Math.cos(el), Math.sin(el)];
        var b = [x - s0 * f * 0.1, y + c0 * f * 0.1, z + 0.05];
        tube(pd, b, add(b, d, 0.26), 0.04, 0.04, 8, true);
        disc(K.pen("dull", "ink"), add(b, d, 0.262), d, 0.032, 8);
      }
    },
    /* a rubber mud flap hanging at station x: y0..y1 across, z0..z1 */
    mudflap: function (K, x, y0, y1, z0, z1) {
      box(K.pen("dull", "rubber"), x - 0.012, x + 0.012, y0, y1, z0, z1);
      box(K.pen("metal", "steel"), x - 0.016, x + 0.016, y0, y1, z1 - 0.04, z1);
    },
    /* a grab handle / lifting eye from A to B standing h off along up */
    handle: function (K, A, B, h, up) {
      var p = K.pen("metal", "steel"), u = unit(up || [0, 0, 1]);
      h = h || 0.06;
      tube(p, A, add(A, u, h), 0.01, 0.01, 4, false); tube(p, add(A, u, h), add(B, u, h), 0.01, 0.01, 4, false); tube(p, add(B, u, h), B, 0.01, 0.01, 4, false);
    },
    /* a row of n bolt heads from A to B on a face whose normal is nrm */
    bolts: function (K, A, B, n, nrm, r) {
      var p = K.pen("metal", "steel"), u = unit(nrm), i;
      for (i = 0; i < n; i++) { var q = mix(A, B, n > 1 ? i / (n - 1) : 0.5); tube(p, q, add(q, u, 0.012), r || 0.014, r || 0.014, 5, true); }
    },
    tyre: tyre, roadWheel: roadWheel
  };

  var api = {
    VERSION: 1, MAX_DRAW: MAX_DRAW, begin: begin, onReport: null, lastReport: null,
    tab: tab, lin: lin, stations: stationsOf, footprint: footprint, ringSE: ringSE, linearRGB: linearRGB, css: css,
    earclip: earclip, rng: rng, PALETTE: PALETTE, STOCK: STOCK, ENGINE_NAMES: ENGINE_NAMES,
    vec: { sub: sub, add: add, cross: cross, dot: dot, unit: unit, mix: mix, lerp: lerp, clamp: clamp },
    /* a one-line summary of a finish() report */
    summary: function (r) {
      return r.key + ": " + r.tris + " tris, " + r.drawCalls + " draw calls, " + r.materials + " materials, " +
             r.length.toFixed(2) + " m long, z " + r.bbox.min[2].toFixed(2) + ".." + r.bbox.max[2].toFixed(2) +
             ", team " + (r.teamShare * 100).toFixed(1) + " %, " + r.warnings.length + " warning(s)" +
             (r.warnings.length ? ": " + r.warnings.join(" | ") : "");
    }
  };
  return api;
})();
