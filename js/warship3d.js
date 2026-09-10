/* ============ warship3d.js -- parametric surface warships ============
   Every surface ship in the game used to be a hand-carved one-off, so an
   era roster full of frigates and missile boats had nothing to draw itself
   with. This builder grows a hull and its fittings out of the numbers a
   ship recognition manual would actually print: length and beam, what the
   bow does, whether the superstructure is a stack of 1950s deckhouses or
   one continuous modern slab, how many guns and where, how many funnels
   and of what shape, whether the mast is an open lattice truss or a solid
   plated tower, how many VLS cells are sunk into the deck, and what is
   parked on the quarterdeck.

   Model space follows models3d.js: +X bow, +Y to port (left), +Z up, real
   metres, waterline at z = 0. render3d.js stands the model up with
   rotation.x = -PI/2 and renormalises it by measured length, so what
   survives to the screen is PROPORTION -- a 1950s gun destroyer's stepped
   bridge and raked pipe stacks against an Aegis destroyer's single sloped
   block and flat cell field.

   Submarines are NOT built here; units3d_subs.js owns those.
   The spec table lives in warship_specs.js and is keyed by unit id.       */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }
if (typeof WARSHIPS === "undefined") { var WARSHIPS = {}; }

var Warship3D = (function () {
  "use strict";

  var PI = Math.PI;

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* ---------------------------------------------------------------- paint
     Design-intent sRGB hexes, decoded to linear exactly once in mat().

     They are deliberately DEEP and deliberately far apart. The scene rig --
     ambient plus a warm key plus a cool fill, ACES tone mapped -- lands an
     ordinary mid grey well up the film shoulder, where the curve is almost
     flat and where it also desaturates: two schemes thirty per cent apart
     in source hex arrived at the frame buffer seven per cent apart, and the
     old bluegrey came out with less blue in it than red. Everything here
     sits low enough to stay on the straight part of the curve, and the
     tinted schemes carry enough chroma to survive the shoulder.

       haze      NATO and ROC    pale neutral haze grey -- the light navy
       darkgrey  Pact and KPA    storm grey -- it has to read as the dark one
       bluegrey  PLA, plus the Pact hulls that share the wash -- the blue one
       green     KPA coastal     olive; spec rows ask for it, so it exists  */
  var PAINT = {
    haze:     { hull: 0x737b83, sup: 0x808991, deck: 0x484e54 },
    darkgrey: { hull: 0x353c43, sup: 0x3e464d, deck: 0x252a2f },
    bluegrey: { hull: 0x3f5769, sup: 0x486277, deck: 0x2b3a47 },
    green:    { hull: 0x3f4b34, sup: 0x49563d, deck: 0x2a3123 },
    /* Royal Navy, BS 381C 507B home-fleet grey - darker and bluer than USN
       haze - and Marine Nationale grey, which is lighter and warmer than both.
       Germany honestly reuses `darkgrey`: Bundesmarine hulls really are close
       to the Eastern-bloc tone and inventing a scheme to keep the four Western
       navies symmetrical would be the opposite of the point.
       NOTE hullTex() below seeds the weathering RNG off the SCHEME NAME'S
       LENGTH (`rngOf(camo.length * 9173 + 41)`), so two schemes with the same
       number of characters give every hull in both navies an identical rust
       pattern. These two are 9 and 6 deliberately; the existing four are 4, 5,
       8 and 8.
       These are declared and currently INERT: warship_specs.js has no rows for
       the new hulls yet, so modelKeyFor borrows a peer and that peer's `camo`.
       The schemes go live with the Tier-2 spec rows, not before. */
    rnavygrey: { hull: 0x5d6a74, sup: 0x67757f, deck: 0x3d464d },
    frgrey:    { hull: 0x6e7e8b, sup: 0x7a8a97, deck: 0x47535c },
  };

  /* pull a neutral fitting part way toward the scheme, so a dark navy's
     masts, radars and deck clutter are dark too and the whole ship reads
     as one paint job instead of a grey kit dropped on a coloured hull */
  function mix(a, b, k) {
    var ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
    var br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
    return ((Math.round(ar + (br - ar) * k) << 16) |
            (Math.round(ag + (bg - ag) * k) << 8) |
            Math.round(ab + (bb - ab) * k)) >>> 0;
  }

  /* Every colour in this file is written as sRGB and decoded HERE, once,
     and the material is stamped _srgbDone so render3d.js prepModel() does
     not decode it a second time. That also makes cmp.html -- which does no
     decoding of its own -- show exactly the paint the game shows, which is
     the only reason a measurement taken off the comparison sheet means
     anything. C.team arrives as a CSS hex STRING, and Color.set eats that
     as happily as it eats a number, so team paint goes through here too. */
  function lin(THREE, c) {
    var col = new THREE.Color(c);
    if (col.convertSRGBToLinear) col.convertSRGBToLinear();
    return col;
  }
  function done(m) { m.userData._srgbDone = true; return m; }

  function mat(THREE, c, r, m, map) {
    var o = { color: lin(THREE, c), roughness: r === undefined ? 0.74 : r,
              metalness: m === undefined ? 0.18 : m };
    if (map) o.map = map;
    return done(new THREE.MeshStandardMaterial(o));
  }

  /* =============================================================== texture
     Four hull skins (one per scheme) plus a handful of neutral greyscale
     maps that every scheme tints through the material colour. That keeps
     the whole layer down to under a dozen textures no matter how many
     hulls the roster holds.                                              */
  var TEX = {};

  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }

  function hullTex(THREE, camo) {
    var key = "hull_" + camo;
    if (TEX[key]) return TEX[key];
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var P = PAINT[camo] || PAINT.haze;
    var R = rngOf(camo.length * 9173 + 41), i;

    /* Weathering has to be a FRACTION of the paint, not a fixed wash. On
       the old light greys a 15 per cent rust streak was a stain; laid at
       the same strength over the deep new darkgrey and bluegrey it was a
       brown highlight that lifted the hull and cancelled its blue. So the
       patchwork, the seams and the rust all scale with how dark and how
       tinted the scheme is, and the light patches lean toward the scheme
       rather than toward white.                                          */
    var lum = (((P.hull >> 16) & 255) * 0.2126 + ((P.hull >> 8) & 255) * 0.7152 +
               (P.hull & 255) * 0.0722) / 255;
    var wear = 0.42 + 0.58 * lum;                 /* dark paint weathers less */

    g.fillStyle = hx(P.hull); g.fillRect(0, 0, W, H);
    /* plate patchwork: adjacent strakes never weather to the same tone */
    var lite = hx(mix(P.hull, 0xffffff, 0.34));
    for (i = 0; i < 70; i++) {
      g.globalAlpha = (0.05 + R() * 0.06) * wear;
      g.fillStyle = R() < 0.5 ? lite : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 150, 10 + R() * 34);
    }
    g.globalAlpha = 1;
    /* frame and strake seams */
    g.strokeStyle = "rgba(0,0,0," + (0.30 * wear).toFixed(3) + ")"; g.lineWidth = 1.4;
    for (i = 1; i < 44; i++) {
      g.beginPath(); g.moveTo(i * W / 44, 0); g.lineTo(i * W / 44, H); g.stroke();
    }
    g.lineWidth = 1;
    for (i = 1; i < 14; i++) {
      g.beginPath(); g.moveTo(0, i * H / 14); g.lineTo(W, i * H / 14); g.stroke();
    }
    /* rust weeping from the freeing ports and scuppers */
    g.globalAlpha = 0.15 * wear; g.fillStyle = "#4a3324";
    for (i = 0; i < 90; i++) g.fillRect(R() * W, R() * H * 0.42, 2 + R() * 4, 8 + R() * 40);
    g.globalAlpha = 1;

    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX[key] = t; return t;
  }

  /* neutral, so the material colour supplies the scheme */
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rngOf(6151), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 40; i++) {
      g.globalAlpha = 0.06 + R() * 0.07;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 20 + R() * 80, 14 + R() * 60);
    }
    g.globalAlpha = 0.30; g.strokeStyle = "#000000"; g.lineWidth = 2;
    for (i = 1; i < 8; i++) {
      g.beginPath(); g.moveTo(0, i * H / 8); g.lineTo(W, i * H / 8); g.stroke();
      g.beginPath(); g.moveTo(i * W / 8, 0); g.lineTo(i * W / 8, H); g.stroke();
    }
    /* non-skid grit */
    g.globalAlpha = 0.28; g.fillStyle = "#000000";
    for (i = 0; i < 900; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX.deck = t; return t;
  }

  function plateTex(THREE) {
    if (TEX.plate) return TEX.plate;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rngOf(2287), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.22; g.strokeStyle = "#000000"; g.lineWidth = 1.6;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.10;
    for (i = 0; i < 26; i++) {
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 18 + R() * 60, 12 + R() * 40);
    }
    /* scuttles and watertight doors, small enough to read as texture */
    g.globalAlpha = 0.34; g.fillStyle = "#000000";
    for (i = 0; i < 22; i++) {
      var x = R() * W, y = R() * H;
      g.beginPath(); g.arc(x, y, 2.6 + R() * 2, 0, 6.29); g.fill();
    }
    g.globalAlpha = 1;
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX.plate = t; return t;
  }

  /* a vertical launcher reads as a lid grid sunk flush into the deck */
  function vlsTex(THREE, nx, ny) {
    var key = "vls_" + nx + "x" + ny;
    if (TEX[key]) return TEX[key];
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var cw = W / nx, ch = H / ny, i, j;
    g.fillStyle = "#454a4e"; g.fillRect(0, 0, W, H);
    for (i = 0; i < nx; i++) for (j = 0; j < ny; j++) {
      var px = i * cw, py = j * ch;
      g.fillStyle = "#15181a";
      g.fillRect(px + cw * 0.10, py + ch * 0.10, cw * 0.80, ch * 0.80);
      g.fillStyle = "#767d82";
      g.fillRect(px + cw * 0.10, py + ch * 0.10, cw * 0.80, ch * 0.13);
      g.fillStyle = "rgba(255,255,255,0.14)";
      g.fillRect(px + cw * 0.44, py + ch * 0.16, cw * 0.12, ch * 0.68);
    }
    var t = new THREE.CanvasTexture(cv);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX[key] = t; return t;
  }

  function padTex(THREE) {
    if (TEX.pad) return TEX.pad;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rngOf(4409), i;
    g.fillStyle = "#3d4247"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 26; i++) {
      g.globalAlpha = 0.07; g.fillStyle = i % 2 ? "#2f3337" : "#4c5157";
      g.fillRect(R() * W, R() * H, 30 + R() * 90, 20 + R() * 70);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "#d8dde1"; g.lineWidth = 9;
    g.beginPath(); g.arc(W / 2, H / 2, W * 0.29, 0, 6.29); g.stroke();
    g.save(); g.translate(W / 2, H / 2); g.rotate(PI / 2);
    g.fillStyle = "#d8dde1"; g.font = "bold 116px Arial"; g.textAlign = "center";
    g.fillText("H", 0, 41); g.restore();
    var t = new THREE.CanvasTexture(cv);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX.pad = t; return t;
  }

  /* ============================================================== helpers */
  /* A four-sided cylinder is a box whose top face can be scaled
     independently, which is how every deckhouse, funnel casing and gun
     house on the ship gets its inward-sloping sides for free. */
  function tboxGeo(THREE, lx, ly, lz, top) {
    var g = new THREE.CylinderGeometry(top === undefined ? 1 : top, 1, lz, 4, 1);
    g.rotateX(PI / 2); g.rotateZ(PI / 4);
    g.scale(lx * 0.70710678, ly * 0.70710678, 1);
    g = g.toNonIndexed(); g.computeVertexNormals();
    return g;
  }

  /* M.loft emits its triangles wound inward, so a lofted hull lit with a
     single-sided material shows you the inside of its far wall: flat, and
     unable to hide anything drawn inside it. air3d_era.js papers over this
     with DoubleSide. Flipping the winding and recomputing the normals costs
     nothing, halves the fill and gets the shading right. */
  function loftMesh(THREE, M, sections, segs, mtl) {
    var g = M.loft(THREE, sections, segs);
    var idx = g.getIndex();
    if (idx) {
      var a = idx.array;
      for (var i = 0; i < a.length; i += 3) { var t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      idx.needsUpdate = true;
    }
    g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* a cylinder stretched between two points: truss legs, braces, yards */
  function strut(THREE, mtl, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az;
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return new THREE.Object3D();
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1), mtl);
    m.position.set((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
                                    new THREE.Vector3(dx, dy, dz).normalize());
    return m;
  }

  /* ================================================================= hull
     Stations run stern (t = 0) to stem (t = 1). The sections are squared
     off hard -- sq well below 1 -- because a warship's topsides really are
     slab-sided and its deck really is flat; a rounded loft turns the whole
     ship into a submarine with boxes on top.                              */
  function hullW(t) {
    if (t <= 0) return 0.66;
    if (t < 0.12) return 0.66 + 0.28 * (t / 0.12);
    if (t < 0.30) return 0.94 + 0.06 * ((t - 0.12) / 0.18);
    if (t < 0.55) return 1.00;
    if (t < 0.72) return 1.00 - 0.06 * ((t - 0.55) / 0.17);
    if (t < 0.86) return 0.94 - 0.30 * ((t - 0.72) / 0.14);
    if (t < 0.95) return 0.64 - 0.44 * ((t - 0.86) / 0.09);
    return 0.20 - 0.16 * ((t - 0.95) / 0.05);
  }
  function hullSq(t) {
    if (t < 0.10) return 0.30;
    if (t < 0.72) return 0.20;
    if (t < 0.90) return 0.20 + 0.16 * ((t - 0.72) / 0.18);
    return 0.36 + 0.24 * ((t - 0.90) / 0.10);
  }

  function makeStations(P, S) {
    var bow = P.bow, ts = [0, 0.03, 0.08, 0.16, 0.28, 0.42, 0.56, 0.66, 0.74,
                           0.82, 0.88, 0.93, 0.965, 1.0];
    var tBreak = 0.635;
    if (bow === "raised") ts = ts.concat([tBreak - 0.008, tBreak + 0.008]);
    ts.sort(function (a, b) { return a - b; });

    var sheer = S.F * (bow === "clipper" ? 0.80 : bow === "raised" ? 0.42 :
                       bow === "carrier" ? 0.10 : 0.36);
    var fcRise = bow === "raised" ? S.F * 0.62 : 0;
    var out = [], i;
    for (i = 0; i < ts.length; i++) {
      var t = ts[i];
      var rise = sheer * Math.pow(clamp((t - 0.40) / 0.60, 0, 1), 1.85);
      var aft  = S.F * 0.10 * Math.pow(clamp((0.26 - t) / 0.26, 0, 1), 2);
      var dz = S.F + rise + aft + (t > tBreak ? fcRise : 0);
      var kz = -S.D;
      if (t < 0.10) kz = -S.D * (0.34 + 0.66 * (t / 0.10));
      if (t > 0.78) {
        var f = Math.pow((t - 0.78) / 0.22, 1.5);
        kz = -S.D * (1 - f * (bow === "clipper" ? 1.02 : 0.88));
      }
      var w = Math.max(S.Bh * hullW(t), S.Bh * 0.02);
      out.push({ x: -S.L * 0.5 + t * S.L, w: w, sq: hullSq(t), t: t, dz: dz, kz: kz });
    }
    return out;
  }

  /* Two lofts, not one. A painted waterline cannot survive the loft's
     cylindrical v, so the topsides and the underbody are separate closed
     hulls: the grey one runs from just under the waterline to the deck and
     is two per cent wider, the dark one runs keel to deck inside it. What
     shows is grey above and a dark boot topping and bottom below, with a
     crisp knuckle at the waterline and no z-fighting anywhere. */
  function hullLofts(ST, F, Bh) {
    var u = F * 0.02, e = Bh * 0.016, A = [], B = [], i;
    for (i = 0; i < ST.length; i++) {
      var s = ST[i];
      A.push({ x: s.x, w: s.w + e, h: (s.dz + u) * 0.5, zc: (s.dz - u) * 0.5,
               sq: s.sq, dz: s.dz });
      B.push({ x: s.x, w: s.w, h: (s.dz - s.kz) * 0.5, zc: (s.dz + s.kz) * 0.5, sq: s.sq });
    }
    return { top: A, low: B };
  }

  /* deck peak, hull half beam: interpolated off the station table */
  function pick(ST, x, key) {
    if (x <= ST[0].x) return ST[0][key];
    var n = ST.length;
    if (x >= ST[n - 1].x) return ST[n - 1][key];
    for (var i = 1; i < n; i++) {
      if (x <= ST[i].x) {
        var a = ST[i - 1], b = ST[i], u = (x - a.x) / Math.max(1e-6, b.x - a.x);
        return a[key] + (b[key] - a[key]) * u;
      }
    }
    return ST[n - 1][key];
  }

  /* where the lofted section's top surface actually is at a given fraction
     of its own half beam -- the deck plate has to lie on the hull, not
     hover above it or poke out through the side */
  function topZ(st, ky) {
    var c = Math.pow(clamp(ky, 0, 1), 1 / st.sq);
    var s = Math.sqrt(Math.max(0, 1 - c * c));
    return st.zc + st.h * Math.pow(s, st.sq);
  }

  /* main deck: a cambered ribbon lying on the hull top, sheer and all */
  function deckRibbon(THREE, ST, mtl, edge, repU, repV) {
    var kys = [-edge, -edge * 0.72, -edge * 0.38, 0, edge * 0.38, edge * 0.72, edge];
    var pos = [], uv = [], idx = [], i, j;
    var x0 = ST[0].x, x1 = ST[ST.length - 1].x;
    for (i = 0; i < ST.length; i++) {
      var st = ST[i];
      for (j = 0; j < kys.length; j++) {
        var ky = kys[j];
        pos.push(st.x, st.w * ky, topZ(st, Math.abs(ky)) + 0.04);
        uv.push((st.x - x0) / (x1 - x0) * repU, (ky + 1) * 0.5 * repV);
      }
    }
    var R = kys.length;
    for (i = 0; i < ST.length - 1; i++) for (j = 0; j < R - 1; j++) {
      var a = i * R + j, b = a + 1, c = a + R, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* =============================================================== guns
     A mount is sized from the row's own numbers and from nothing else.
     That matters more than it sounds. render3d.js renormalises every model
     by its measured length, so a turret whose size was pinned to hull
     length -- as the old clamps to S.L were -- came out the same size on
     screen for a 218 m heavy cruiser and a 127 m destroyer, and the two
     ships read as the same class. Calibre now drives the gun house, the
     barbette, the barrel length and the bore in real metres; the mount
     COUNT in the row picks the barrels per mount, because that is how
     these navies actually armed these ships -- 8-inch guns in triples,
     6-inch in triples once a cruiser carried three turrets or more, and
     the 100 to 130 mm destroyer mounts of this roster as singles.        */
  function barrelsFor(cal, guns) {
    if (cal >= 180) return 3;                        /* 8-inch cruiser triple */
    if (cal >= 140) return (guns | 0) >= 3 ? 3 : 2;  /* 6-inch triple or twin */
    if (cal >= 50) return 1;                         /* destroyer single */
    return 2;                                        /* light AA twin */
  }

  /* Real metres. A triple 8-inch turret is a ten-metre house on a
     seven-metre barbette throwing eleven-metre barrels; a 5-inch single is
     a four-metre house with one six-metre barrel. Only the beam gets a
     veto, and only so a mount cannot grow wider than the deck under it. */
  function mountDims(S, cal, nb) {
    var f = nb >= 3 ? 1.62 : nb === 2 ? 1.30 : 1.12;
    var cap = Math.max(1.4, Math.min(S.B * 0.66, S.L * 0.12));
    var tl = clamp(cal * 0.0305 * f, 1.4, cap);
    var tw = Math.min(tl * (nb >= 3 ? 0.74 : nb === 2 ? 0.78 : 0.82), S.B * 0.58);
    return {
      nb: nb, l: tl, w: tw, h: tl * (nb >= 3 ? 0.46 : 0.42),
      bl: Math.min(cal * 0.038 + cal * cal * 0.000072, S.L * 0.14),
      br: Math.max(0.055, cal * 0.0007 + cal * cal * 0.0000030),
    };
  }

  function addGun(K, x, zb, cal, aft, guns) {
    var T = K.T, S = K.S, m = K.m;
    var g = new T.Group();
    g.name = "gunmount";      /* handle for measuring, and not a name any
                                 render3d.js findPart() lookup claims */
    g.position.set(x, 0, zb);
    if (aft) g.rotation.z = PI;
    K.G.add(g);

    if (cal <= 45) {          /* open light mount: 40 mm and down, in a tub */
      var tr = clamp(cal * 0.036, 0.42, S.B * 0.22);
      var tub = new T.Mesh(new T.CylinderGeometry(tr, tr * 1.06, tr * 0.85, 10, 1, true)
                             .rotateX(PI / 2), m.sup);
      tub.position.z = tr * 0.42; g.add(tub);
      var ped = new T.Mesh(new T.CylinderGeometry(tr * 0.42, tr * 0.5, tr * 0.9, 8)
                             .rotateX(PI / 2), m.dark);
      ped.position.z = tr * 0.85; g.add(ped);
      var bl = clamp(cal * 0.062, 0.7, S.L * 0.07), br = Math.max(0.045, cal * 0.0016);
      for (var q = -1; q <= 1; q += 2) {
        var b = new T.Mesh(new T.CylinderGeometry(br, br * 1.2, bl, 6).rotateZ(-PI / 2), m.steel);
        b.position.set(bl * 0.42, q * tr * 0.20, tr * 1.20);
        b.rotation.y = -0.09; g.add(b);
      }
      return;
    }

    /* enclosed mount: gun house on a barbette drum. The drum is the tell --
       a triple 8-inch plants a seven-metre cylinder on the forecastle that
       a 5-inch single simply has not got.                                */
    var D = mountDims(S, cal, barrelsFor(cal, guns));
    var tl = D.l, tw = D.w, th = D.h, nb = D.nb;
    var bh = th * (nb >= 3 ? 0.62 : nb === 2 ? 0.50 : 0.40);
    var bar = new T.Mesh(new T.CylinderGeometry(tw * 0.52, tw * 0.58, bh, 14)
                           .rotateX(PI / 2), m.hull);
    bar.position.z = bh * 0.5; g.add(bar);
    var house = new T.Mesh(tboxGeo(T, tl, tw, th, nb >= 3 ? 0.74 : 0.62), m.sup);
    house.position.set(-tl * 0.06, 0, bh + th * 0.5); g.add(house);
    /* the sloped gun shield front, which is what says "naval mount" */
    var sh = new T.Mesh(new T.BoxGeometry(tl * 0.34, tw * 0.86, th * 0.16), m.sup);
    sh.position.set(tl * 0.34, 0, bh + th * 0.62);
    sh.rotation.y = 0.62; g.add(sh);
    if (nb >= 2) {                    /* rangefinder ears out of a big turret */
      for (var e = -1; e <= 1; e += 2) {
        var ear = new T.Mesh(new T.BoxGeometry(tl * 0.17, tw * 0.13, th * 0.26), m.sup);
        ear.position.set(-tl * 0.28, e * tw * 0.53, bh + th * 0.58); g.add(ear);
      }
    }

    var zb2 = bh + th * 0.52;
    var spread = tw * (nb >= 3 ? 0.29 : 0.20);
    for (var i = 0; i < nb; i++) {
      var y = nb === 1 ? 0 : (i - (nb - 1) * 0.5) * spread * (nb >= 3 ? 1 : 2);
      var bb = new T.Mesh(new T.CylinderGeometry(D.br, D.br * 1.18, D.bl, 8).rotateZ(-PI / 2), m.steel);
      bb.position.set(tl * 0.42 + D.bl * 0.44, y, zb2 + D.bl * 0.05);
      bb.rotation.y = -0.06; g.add(bb);
      var sl = new T.Mesh(new T.CylinderGeometry(D.br * 2.3, D.br * 2.5, D.bl * 0.22, 10)
                            .rotateZ(-PI / 2), m.dark);
      sl.position.set(tl * 0.40, y, zb2); g.add(sl);
    }
  }

  /* ============================================================ launchers */
  function addBoxLaunchers(K, x, zb, n) {
    var T = K.T, S = K.S, m = K.m;
    var cl = clamp(S.L * 0.13, 2.2, 7.0), cd = cl * 0.19;
    for (var s = -1; s <= 1; s += 2) {
      for (var p = 0; p < n; p++) {
        var gx = x - p * cl * 0.62;
        var grp = new T.Group();
        grp.position.set(gx, s * Math.min(S.Bh * 0.56, S.B * 0.34), zb + cd * 1.2);
        grp.rotation.z = s * 0.30;
        grp.rotation.y = -0.20;
        K.G.add(grp);
        for (var a = 0; a < 2; a++) {
          var c = new T.Mesh(new T.CylinderGeometry(cd * 0.62, cd * 0.62, cl, 8)
                               .rotateZ(-PI / 2), m.dark);
          c.position.set(0, 0, (a - 0.5) * cd * 1.35); grp.add(c);
          var cap = new T.Mesh(new T.CylinderGeometry(cd * 0.66, cd * 0.66, cl * 0.07, 8)
                                 .rotateZ(-PI / 2), m.sup);
          cap.position.set(cl * 0.5, 0, (a - 0.5) * cd * 1.35); grp.add(cap);
        }
      }
    }
  }

  function addRailLauncher(K, x, zb, aft) {
    var T = K.T, S = K.S, m = K.m;
    var r = clamp(S.B * 0.16, 0.55, 2.4);
    var g = new T.Group(); g.position.set(x, 0, zb); if (aft) g.rotation.z = PI;
    K.G.add(g);
    var mag = new T.Mesh(tboxGeo(T, r * 3.4, r * 3.2, r * 1.1, 0.86), m.sup);
    mag.position.z = r * 0.55; g.add(mag);
    var ped = new T.Mesh(new T.CylinderGeometry(r * 0.8, r * 0.95, r * 0.9, 10).rotateX(PI / 2), m.sup);
    ped.position.z = r * 1.55; g.add(ped);
    var arm = new T.Mesh(new T.BoxGeometry(r * 1.5, r * 2.0, r * 0.35), m.sup);
    arm.position.set(r * 0.15, 0, r * 2.1); arm.rotation.y = -0.30; g.add(arm);
    for (var s = -1; s <= 1; s += 2) {
      var ms = new T.Mesh(new T.CylinderGeometry(r * 0.20, r * 0.20, r * 3.2, 8).rotateZ(-PI / 2), m.trim);
      ms.position.set(r * 0.75, s * r * 0.62, r * 2.75); ms.rotation.y = -0.30; g.add(ms);
      var nose = new T.Mesh(new T.ConeGeometry(r * 0.20, r * 0.55, 8).rotateZ(-PI / 2), m.trim);
      nose.position.set(r * 2.45, s * r * 0.62, r * 3.24); nose.rotation.y = -0.30; g.add(nose);
    }
  }

  /* ============================================================= VLS field
     Flat, flush, and rectangular: at RTS zoom the cell grid sunk into the
     deck is the single clearest "this ship is modern" signal there is.   */
  function vlsGrid(n) {
    var ny = n >= 48 ? 8 : n >= 24 ? 6 : 4;
    return { nx: Math.max(2, Math.ceil(n / ny)), ny: ny };
  }
  function addVLS(K, x, zb, n, maxLen) {
    var T = K.T, S = K.S, m = K.m;
    var gr = vlsGrid(n);
    var pitch = clamp(S.B * 0.085, 0.42, 2.1);
    pitch = Math.min(pitch, S.B * 0.62 / gr.ny, maxLen / gr.nx);
    var fl = gr.nx * pitch, fw = gr.ny * pitch;
    var coam = new T.Mesh(new T.BoxGeometry(fl + pitch * 0.5, fw + pitch * 0.5, pitch * 0.55), m.dark);
    coam.position.set(x, 0, zb + pitch * 0.18); K.G.add(coam);
    var lid = new T.Mesh(new T.PlaneGeometry(fl, fw),
      done(new T.MeshStandardMaterial({ map: vlsTex(T, gr.nx, gr.ny),
                                        roughness: 0.86, metalness: 0.09 })));
    lid.position.set(x, 0, zb + pitch * 0.47); K.G.add(lid);
    return fl;
  }

  /* ============================================================== funnels */
  function addFunnel(K, x, zb, style, dh, isMack) {
    var T = K.T, S = K.S, m = K.m;
    var fw = clamp(S.B * 0.34, 0.7, S.B * 0.5), fl = clamp(S.L * 0.075, 1.2, fw * 2.2);
    var fh = dh * (style === "stack" ? 2.1 : 1.7);
    var top = { x: x, z: zb + fh };

    if (style === "stack") {
      /* raked pipe: 1950s, and the rake is most of what you see of it */
      var r = Math.min(fw, fl) * 0.48;
      var pipe = new T.Mesh(new T.CylinderGeometry(r * 0.84, r, fh, 12).rotateX(PI / 2), m.sup);
      pipe.position.set(x, 0, zb + fh * 0.5); pipe.rotation.y = -0.22; K.G.add(pipe);
      var cap = new T.Mesh(new T.CylinderGeometry(r * 0.94, r * 0.94, fh * 0.10, 12).rotateX(PI / 2), m.dark);
      var dx = Math.sin(-0.22) * fh * 0.5;
      cap.position.set(x + dx, 0, zb + fh); cap.rotation.y = -0.22; K.G.add(cap);
      var band = new T.Mesh(new T.CylinderGeometry(r * 0.98, r * 0.98, fh * 0.09, 12).rotateX(PI / 2), m.team);
      band.position.set(x + dx * 0.72, 0, zb + fh * 0.78); band.rotation.y = -0.22; K.G.add(band);
      top.x = x + dx;
    } else {
      /* capped box uptake, or a mack with the mast growing straight out */
      var casing = new T.Mesh(tboxGeo(T, fl, fw, fh, isMack ? 0.72 : 0.80), m.sup);
      casing.position.set(x, 0, zb + fh * 0.5); K.G.add(casing);
      var lid = new T.Mesh(new T.BoxGeometry(fl * 0.94, fw * 0.98, fh * 0.07), m.dark);
      lid.position.set(x, 0, zb + fh + fh * 0.03); K.G.add(lid);
      var pr = Math.min(fw, fl) * 0.13;
      for (var i = -1; i <= 1; i += 2) {
        var p = new T.Mesh(new T.CylinderGeometry(pr, pr, fh * 0.24, 8).rotateX(PI / 2), m.dark);
        p.position.set(x - fl * 0.14, i * fw * 0.22, zb + fh + fh * 0.14); K.G.add(p);
      }
      var tb = new T.Mesh(new T.BoxGeometry(fl * 0.16, fw * 1.01, fh * 0.13), m.team);
      tb.position.set(x + fl * 0.30, 0, zb + fh * 0.70); K.G.add(tb);
    }
    K.blocks.push({ x0: x - fl * 0.5, x1: x + fl * 0.5, z: zb + fh });
    return top;
  }

  /* ================================================================ masts
     The mast is the fastest era tell on the whole ship. A 1950s destroyer
     carries an open steel truss you can see daylight through; a modern one
     carries a plated tower, and the newest carry a closed prism with the
     arrays built into its faces. So the lattice is built as actual struts
     rather than a box pretending to be one.                              */
  function addMast(K, x, zb, style, dh, radar) {
    var T = K.T, S = K.S, m = K.m;
    var mh = dh * (style === "lattice" ? 2.9 : style === "pole" ? 2.4 : 2.5);
    var wb = clamp(S.B * 0.22, 0.55, 5.2), wt = wb * 0.34;
    var topz = zb + mh;

    if (style === "lattice") {
      var r = Math.max(0.045, wb * 0.055);
      var lv = 4, i, j, k;
      var ring = function (f) { return { w: (wb + (wt - wb) * f) * 0.5, z: zb + mh * f }; };
      for (i = 0; i < 4; i++) {
        var sx = (i < 2 ? 1 : -1), sy = (i % 2 ? 1 : -1);
        var a = ring(0), b = ring(1);
        K.G.add(strut(T, m.steel, x + sx * a.w, sy * a.w, a.z,
                                  x + sx * b.w, sy * b.w, b.z, r, 4));
      }
      for (k = 0; k <= lv; k++) {
        var f = k / lv, rg = ring(f);
        var c = [[x + rg.w, rg.w], [x + rg.w, -rg.w], [x - rg.w, -rg.w], [x - rg.w, rg.w]];
        for (j = 0; j < 4; j++) {
          var p = c[j], q = c[(j + 1) % 4];
          if (k < lv && k % 2 === 0) {
            var rg2 = ring((k + 1) / lv);
            var q2 = [q[0] + (x - q[0]) * (1 - (rg2.w / rg.w)), q[1] * (rg2.w / rg.w)];
            K.G.add(strut(T, m.steel, p[0], p[1], rg.z, q2[0], q2[1], rg2.z, r * 0.72, 4));
          }
          if (k % 2 === 0 || k === lv)
            K.G.add(strut(T, m.steel, p[0], p[1], rg.z, q[0], q[1], rg.z, r * 0.62, 4));
        }
      }
      /* signal yard across the truss */
      K.G.add(strut(T, m.steel, x, -wb * 1.5, zb + mh * 0.62, x, wb * 1.5, zb + mh * 0.62, r * 0.66, 4));
      var pole = new T.Mesh(new T.CylinderGeometry(r * 0.7, r * 1.1, mh * 0.28, 6).rotateX(PI / 2), m.steel);
      pole.position.set(x, 0, topz + mh * 0.13); K.G.add(pole);
      topz += mh * 0.26;
    } else if (style === "pole") {
      var pr = Math.max(0.055, wb * 0.10);
      var p1 = new T.Mesh(new T.CylinderGeometry(pr * 0.55, pr, mh, 7).rotateX(PI / 2), m.steel);
      p1.position.set(x, 0, zb + mh * 0.5); p1.rotation.y = -0.10; K.G.add(p1);
      K.G.add(strut(T, m.steel, x, -wb * 1.6, zb + mh * 0.66, x, wb * 1.6, zb + mh * 0.66, pr * 0.5, 4));
      for (var s2 = -1; s2 <= 1; s2 += 2)
        K.G.add(strut(T, m.steel, x, 0, zb + mh * 0.20, x - mh * 0.22, s2 * wb * 0.8, zb, pr * 0.45, 4));
    } else if (style === "enclosed") {
      var t1 = new T.Mesh(tboxGeo(T, wb * 1.5, wb * 1.25, mh * 0.62, 0.62), m.sup);
      t1.position.set(x, 0, zb + mh * 0.31); K.G.add(t1);
      var t2 = new T.Mesh(tboxGeo(T, wb * 0.95, wb * 0.80, mh * 0.30, 0.55), m.sup);
      t2.position.set(x, 0, zb + mh * 0.77); K.G.add(t2);
      var pr2 = Math.max(0.05, wb * 0.07);
      var p2 = new T.Mesh(new T.CylinderGeometry(pr2 * 0.6, pr2, mh * 0.30, 6).rotateX(PI / 2), m.steel);
      p2.position.set(x, 0, zb + mh * 1.05); K.G.add(p2);
      topz = zb + mh * 0.92;
    } else {                                             /* planar / prism */
      var pw = wb * 1.9, ph = mh * 0.80;
      var pr3 = new T.Mesh(new T.CylinderGeometry(pw * 0.34, pw * 0.5, ph, 8).rotateX(PI / 2).rotateZ(PI / 8), m.sup);
      pr3.position.set(x, 0, zb + ph * 0.5); K.G.add(pr3);
      for (var f2 = 0; f2 < 4; f2++) {
        var ang = PI * 0.25 + f2 * PI * 0.5;
        var pan = new T.Mesh(new T.BoxGeometry(pw * 0.10, pw * 0.52, ph * 0.40), m.array);
        pan.position.set(x + Math.cos(ang) * pw * 0.40, Math.sin(ang) * pw * 0.40, zb + ph * 0.60);
        pan.rotation.z = ang; K.G.add(pan);
      }
      var dome = new T.Mesh(new T.SphereGeometry(pw * 0.30, 10, 6), m.trim);
      dome.position.set(x, 0, zb + ph * 1.02); dome.scale.z = 0.62; K.G.add(dome);
      topz = zb + ph * 1.05;
    }
    return { x: x, z: topz, w: wt };
  }

  /* ================================================================ radar */
  function airSearch(K, x, z, w) {
    var T = K.T, m = K.m;
    /* the big flat mattress that spins on top of a warship's mast */
    var g = new T.Group(); g.position.set(x, 0, z); g.rotation.y = -0.20; K.G.add(g);
    var face = new T.Mesh(new T.BoxGeometry(w * 0.10, w, w * 0.44), m.array);
    g.add(face);
    var rib = new T.Mesh(new T.BoxGeometry(w * 0.06, w * 1.02, w * 0.06), m.steel);
    rib.position.z = w * 0.24; g.add(rib);
    var rib2 = rib.clone(); rib2.position.z = -w * 0.24; g.add(rib2);
    var hub = new T.Mesh(new T.CylinderGeometry(w * 0.09, w * 0.11, w * 0.20, 8).rotateX(PI / 2), m.sup);
    hub.position.set(x, 0, z - w * 0.28); K.G.add(hub);
  }
  function dishAt(K, x, y, z, r, yaw) {
    var T = K.T, m = K.m;
    var d = new T.Mesh(new T.SphereGeometry(r, 12, 6, 0, PI * 2, 0, PI * 0.44).rotateZ(PI / 2), m.trim);
    d.position.set(x, y, z); d.rotation.z = yaw || 0; K.G.add(d);
    var ped = new T.Mesh(new T.CylinderGeometry(r * 0.34, r * 0.42, r * 0.7, 8).rotateX(PI / 2), m.sup);
    ped.position.set(x, y, z - r * 0.5); K.G.add(ped);
  }
  function planarArrays(K, x, y0, z, r, dx, yw) {
    var T = K.T, m = K.m, i;
    /* four fixed faces: two looking forward over the bow, two aft */
    var set = [[x, y0 + yw, 0.70], [x, y0 - yw, -0.70],
               [x - dx, y0 + yw * 0.92, 2.44], [x - dx, y0 - yw * 0.92, -2.44]];
    for (i = 0; i < 4; i++) {
      var px = set[i][0], py = set[i][1], yaw = set[i][2];
      var frame = new T.Mesh(
        new T.CylinderGeometry(r * 1.18, r * 1.18, r * 0.34, 8).rotateZ(-PI / 2), m.dark);
      frame.position.set(px, py, z); frame.rotation.z = yaw; K.G.add(frame);
      var face = new T.Mesh(
        new T.CylinderGeometry(r, r, r * 0.24, 8).rotateZ(-PI / 2), m.array);
      face.position.set(px + Math.cos(yaw) * r * 0.24, py + Math.sin(yaw) * r * 0.24, z);
      face.rotation.z = yaw; K.G.add(face);
    }
  }

  /* ================================================================= CIWS */
  function addCIWS(K, x, y, z) {
    var T = K.T, S = K.S, m = K.m;
    var r = clamp(S.B * 0.055, 0.30, 1.25);
    var base = new T.Mesh(new T.CylinderGeometry(r, r * 1.15, r * 1.5, 10).rotateX(PI / 2), m.trim);
    base.position.set(x, y, z + r * 0.75); K.G.add(base);
    var dome = new T.Mesh(new T.SphereGeometry(r * 1.05, 10, 7), m.trim);
    dome.position.set(x, y, z + r * 2.0); K.G.add(dome);
    var gun = new T.Mesh(new T.CylinderGeometry(r * 0.30, r * 0.34, r * 2.4, 8).rotateZ(-PI / 2), m.dark);
    gun.position.set(x + r * 1.5, y, z + r * 1.55); gun.rotation.y = -0.24; K.G.add(gun);
  }

  /* ======================================================== helicopters */
  function addFlightDeck(K, x, zb, len, wid) {
    var T = K.T, m = K.m;
    var p = new T.Mesh(new T.PlaneGeometry(len, wid),
      done(new T.MeshStandardMaterial({ map: padTex(T), roughness: 0.92, metalness: 0.06 })));
    p.position.set(x, 0, zb + 0.10); K.G.add(p);
  }
  function addHangar(K, x, zb, len, wid, ht) {
    var T = K.T, m = K.m;
    var h = new T.Mesh(tboxGeo(T, len, wid, ht, 0.94), m.sup);
    h.position.set(x, 0, zb + ht * 0.5); K.G.add(h);
    var door = new T.Mesh(new T.BoxGeometry(len * 0.05, wid * 0.66, ht * 0.72), m.dark);
    door.position.set(x - len * 0.49, 0, zb + ht * 0.36); K.G.add(door);
    var roof = new T.Mesh(new T.BoxGeometry(len * 0.98, wid * 1.05, ht * 0.06), m.deck);
    roof.position.set(x, 0, zb + ht + ht * 0.03); K.G.add(roof);
    K.blocks.push({ x0: x - len * 0.5, x1: x + len * 0.5, z: zb + ht });
  }

  /* ========================================================= flight deck
     A carrier is read entirely from above: a rectangle far wider than its
     hull, cut away at the bow, bulged out over the port quarter, with the
     angled landing area striped across it and the island squeezed onto the
     starboard edge.                                                      */
  function carrierDeck(K, M, W, fdz, dh) {
    var T = K.T, S = K.S, m = K.m, L = S.L, i;
    var o = [[0.500, -0.05], [0.468, -0.44], [0.372, -0.74], [0.140, -0.93],
             [-0.250, -1.00], [-0.446, -1.00], [-0.500, -0.84], [-0.500, 0.10],
             [-0.470, 0.63], [-0.336, 1.00], [0.058, 1.00], [0.152, 0.85],
             [0.298, 0.60], [0.428, 0.26]];
    var pts = [];
    for (i = 0; i < o.length; i++) pts.push([o[i][0] * L, o[i][1] * W]);
    var th = dh * 0.55;
    var slab = new T.Mesh(M.slab(T, pts, th), m.fdeck);
    slab.geometry.computeBoundingBox();
    slab.position.z = fdz - slab.geometry.boundingBox.max.z; K.G.add(slab);

    /* gallery deck under the overhang, so the deck is not a floating plate */
    for (i = -1; i <= 1; i += 2) {
      var gal = new T.Mesh(new T.BoxGeometry(L * 0.72, W * 0.16, dh * 1.5), m.hull);
      gal.position.set(-L * 0.04, i * (W * 0.80), fdz - th - dh * 0.75); K.G.add(gal);
    }

    /* angled landing area */
    var rw = Math.min(L * 0.100, W * 0.58);
    var ang = new T.Group();
    ang.position.set(-L * 0.055, W * 0.20, fdz + 0.14);
    ang.rotation.z = -0.166; K.G.add(ang);
    var stripe = function (y, len, wd) {
      var p = new T.Mesh(new T.PlaneGeometry(len, wd), m.mark);
      p.position.set(0, y, 0); ang.add(p);
    };
    stripe(rw * 0.5, L * 0.62, L * 0.009);
    stripe(-rw * 0.5, L * 0.62, L * 0.009);
    for (i = 0; i < 9; i++) {
      var p2 = new T.Mesh(new T.PlaneGeometry(L * 0.035, L * 0.007), m.mark);
      p2.position.set(-L * 0.28 + i * L * 0.068, 0, 0); ang.add(p2);
    }
    /* bow catapult tracks */
    for (i = 0; i < 2; i++) {
      var cat = new T.Mesh(new T.PlaneGeometry(L * 0.36, L * 0.020), m.dark);
      cat.position.set(L * 0.245, (i ? 0.46 : -0.16) * W, fdz + 0.12);
      cat.rotation.z = i ? 0.045 : -0.02; K.G.add(cat);
    }
    /* deck-edge lifts */
    var lifts = [[0.205, -0.84], [-0.175, -0.84], [-0.320, 0.86]];
    for (i = 0; i < 3; i++) {
      var lf = new T.Mesh(new T.PlaneGeometry(L * 0.072, W * 0.28), m.lift);
      lf.position.set(lifts[i][0] * L, lifts[i][1] * W, fdz + 0.11); K.G.add(lf);
    }
  }

  /* ================================================================ build */
  function gunSplit(P) {
    var pos = String(P.gunPos || "none"), n = P.guns | 0;
    if (n <= 0 || pos.indexOf("none") === 0) return { f: 0, a: 0 };
    if (pos.indexOf("foreaft") === 0) { var f = Math.ceil(n / 2); return { f: f, a: n - f }; }
    if (pos.indexOf("aft") === 0) return { f: 0, a: n };
    return { f: n, a: 0 };
  }
  /* deck length one mount eats, so superfiring pairs and the launchers
     forward of them get spaced off the same numbers the mount is built to */
  function gunFoot(S, cal, guns) {
    if (cal <= 45) return clamp(cal * 0.078, 0.9, S.B * 0.46);
    return mountDims(S, cal, barrelsFor(cal, guns)).l;
  }

  var SUPSPEC = {
    layered: [[0.010, 0.280, 0.78, 1.20, 0.98], [0.055, 0.165, 0.58, 1.10, 0.97],
              [0.098, 0.098, 0.40, 1.05, 0.95], [0.114, 0.052, 0.26, 0.80, 0.92]],
    boxy:    [[0.040, 0.260, 0.84, 1.55, 1.00], [0.085, 0.130, 0.62, 1.20, 1.00]],
    faceted: [[0.030, 0.440, 0.88, 2.40, 0.76], [0.130, 0.150, 0.54, 1.05, 0.84]],
    island:  [[0.040, 0.260, 0.84, 1.55, 1.00]],
  };

  function build(THREE, M, C, P) {
    var T = THREE, G = new T.Group(), i;
    var L = P.len || 100;
    var carrier = P.bow === "carrier";
    var Bfull = P.beam || L * 0.11;
    var hullB = carrier ? Math.min(Bfull, L * 0.135) : Bfull;
    var F = carrier ? clamp(L * 0.052, 3.5, 20) : clamp(L * 0.036, 1.2, 11);
    var S = { L: L, B: hullB, Bh: hullB * 0.5, F: F, D: F * 0.42 };
    var dh = clamp(0.130 * hullB + 0.0070 * L, 2.0, 4.2);
    var pal = PAINT[P.camo] || PAINT.haze;

    /* Textured surfaces are SKIN (rough, barely metallic) -- the old
       0.74/0.20 hull put a specular sheen on every topside that pushed it
       further up the tone curve and bleached the scheme out of it. The
       untextured fittings are METAL. Nothing sits between the two tiers. */
    var m = {
      hull:  mat(T, 0xffffff, 0.86, 0.08, hullTex(T, PAINT[P.camo] ? P.camo : "haze")),
      sup:   mat(T, pal.sup, 0.84, 0.09, plateTex(T)),
      deck:  mat(T, pal.deck, 0.90, 0.07, deckTex(T)),
      fdeck: mat(T, mix(0x3d4247, pal.deck, 0.40), 0.94, 0.05),
      under: mat(T, 0x3a231f, 0.88, 0.06),
      lift:  mat(T, mix(0x51575c, pal.deck, 0.50), 0.90, 0.08),
      mark:  mat(T, 0xd7dce0, 0.80, 0.04),
      dark:  mat(T, mix(0x1e2226, pal.hull, 0.30), 0.62, 0.42),
      steel: mat(T, mix(0x8e959b, pal.sup, 0.45), 0.50, 0.60),
      trim:  mat(T, mix(0xb6bdc2, pal.sup, 0.42), 0.58, 0.40),
      array: mat(T, mix(0x4e565c, pal.hull, 0.38), 0.46, 0.55),
      team:  mat(T, (C && C.team) || 0x3f7fd0, 0.62, 0.22),
    };

    /* ---- hull ---- */
    var HL = hullLofts(makeStations(P, S), F, S.Bh), ST = HL.top;
    G.add(loftMesh(T, M, HL.low, 12, m.under));
    G.add(loftMesh(T, M, ST, 16, m.hull));
    G.add(deckRibbon(T, ST, m.deck, 0.93, L / 16, hullB / 9));
    var tr = new T.Mesh(new T.BoxGeometry(Math.max(0.25, L * 0.004),
                                          HL.low[0].w * 2.02, HL.low[0].h * 2.02), m.under);
    tr.position.set(HL.low[0].x - L * 0.002, 0, HL.low[0].zc); G.add(tr);

    var K = { T: T, G: G, S: S, m: m, blocks: [] };
    K.topAt = function (x) {
      var z = pick(ST, x, "dz");
      for (var q = 0; q < K.blocks.length; q++) {
        var b = K.blocks[q];
        if (x >= b.x0 && x <= b.x1 && b.z > z) z = b.z;
      }
      return z;
    };
    K.deckAt = function (x) { return pick(ST, x, "dz"); };

    /* =================================================== carrier variant */
    if (carrier) {
      var W = Math.max(Bfull, hullB * 1.85) * 0.5;
      var fdz = F + dh * 0.30;
      carrierDeck(K, M, W, fdz, dh);
      K.blocks.push({ x0: -L * 0.5, x1: L * 0.5, z: fdz });

      var isL = L * 0.125, isW = L * 0.030, isH = L * 0.055;
      var isY = -(W - isW * 0.62), isX = L * 0.055;
      var b1 = new T.Mesh(tboxGeo(T, isL, isW, isH * 0.60, 0.92), m.sup);
      b1.position.set(isX, isY, fdz + isH * 0.30); G.add(b1);
      var b2 = new T.Mesh(tboxGeo(T, isL * 0.54, isW * 0.86, isH * 0.30, 0.88), m.sup);
      b2.position.set(isX + isL * 0.16, isY, fdz + isH * 0.75); G.add(b2);
      var wing = new T.Mesh(new T.BoxGeometry(isL * 0.20, isW * 1.9, isH * 0.05), m.sup);
      wing.position.set(isX + isL * 0.18, isY, fdz + isH * 0.62); G.add(wing);
      if ((P.funnels | 0) > 0 && P.funnelStyle !== "none") {
        var upt = new T.Mesh(tboxGeo(T, isL * 0.30, isW * 0.90, isH * 0.42, 0.82), m.sup);
        upt.position.set(isX - isL * 0.30, isY, fdz + isH * 0.51); G.add(upt);
        var cp = new T.Mesh(new T.BoxGeometry(isL * 0.32, isW * 0.96, isH * 0.03), m.dark);
        cp.position.set(isX - isL * 0.30, isY, fdz + isH * 0.73); G.add(cp);
        var tbnd = new T.Mesh(new T.BoxGeometry(isL * 0.31, isW * 0.94, isH * 0.05), m.team);
        tbnd.position.set(isX - isL * 0.30, isY, fdz + isH * 0.64); G.add(tbnd);
      }
      var KI = { T: T, G: G, S: { L: L, B: isW * 1.4, Bh: isW * 0.7, F: F, D: S.D },
                 m: m, blocks: [], topAt: K.topAt };
      var mt = addMast(KI, isX - isL * 0.05, fdz + isH * 0.90, P.mast || "pole", isH * 0.15);
      if (P.radar === "dish" || P.radar === "both")
        airSearch(KI, mt.x, mt.z + isH * 0.06, clamp(isW * 0.95, 1.5, 11));
      if (P.radar === "planar" || P.radar === "both")
        planarArrays(KI, isX + isL * 0.20, isY, fdz + isH * 0.40,
                     isW * 0.30, isL * 0.34, isW * 0.42);
      if (P.radar === "both" || P.radar === "dish")
        dishAt(KI, isX + isL * 0.30, isY, fdz + isH * 0.72, isW * 0.20, 0);

      var sp = [[0.34, -1], [-0.34, -1], [0.20, 1], [-0.24, 1]];
      var nc = Math.min(4, P.ciws | 0);
      for (i = 0; i < nc; i++)
        addCIWS(K, sp[i][0] * L, sp[i][1] * W * 0.93, fdz - dh * 0.55);
      var gs = gunSplit(P), gn = gs.f + gs.a;
      for (i = 0; i < Math.min(4, gn); i++)
        addGun(K, sp[i][0] * L * 0.86, fdz - dh * 1.15, P.gunCal || 76,
               sp[i][0] < 0, P.guns);
      if ((P.vls | 0) > 0) addVLS(K, L * 0.40, fdz + 0.06, P.vls | 0, L * 0.07);
      return G;
    }

    /* ============================================== conventional variant */
    var style = SUPSPEC[P.super] ? P.super : "boxy";
    var spec = SUPSPEC[style], supX0 = 1e9, supX1 = -1e9, bridgeTop = 0;
    for (i = 0; i < spec.length; i++) {
      var sp2 = spec[i];
      var bx2 = L * sp2[0], bl2 = L * sp2[1], bw2 = hullB * sp2[2], bh2 = dh * sp2[3];
      bw2 = Math.min(bw2, pick(ST, bx2, "w") * 1.92);
      var zb2 = K.topAt(bx2);
      var blk = new T.Mesh(tboxGeo(T, bl2, bw2, bh2, sp2[4]), m.sup);
      blk.position.set(bx2, 0, zb2 + bh2 * 0.5); G.add(blk);
      K.blocks.push({ x0: bx2 - bl2 * 0.5, x1: bx2 + bl2 * 0.5, z: zb2 + bh2 });
      supX0 = Math.min(supX0, bx2 - bl2 * 0.5);
      supX1 = Math.max(supX1, bx2 + bl2 * 0.5);
      bridgeTop = zb2 + bh2;
      if (i === 0) {
        for (var s3 = -1; s3 <= 1; s3 += 2) {
          var tp = new T.Mesh(new T.BoxGeometry(bl2 * 0.10, bw2 * 0.06, bh2 * 0.15), m.team);
          tp.position.set(bx2 - bl2 * 0.26, s3 * bw2 * 0.50, zb2 + bh2 * 0.72); G.add(tp);
        }
      }
      if (style !== "faceted" && (i === spec.length - 2 || (spec.length === 2 && i === 0))) {
        /* open bridge wings: the widest thing above the main deck */
        var bw3 = new T.Mesh(new T.BoxGeometry(bl2 * 0.20, hullB * 0.98, bh2 * 0.07), m.deck);
        bw3.position.set(bx2 + bl2 * 0.30, 0, zb2 + bh2 + bh2 * 0.03); G.add(bw3);
      }
    }
    var vlsN = P.vls | 0;
    if (P.launchers === "vls" && vlsN === 0) vlsN = 16;
    if (L > 80 && vlsN === 0 && P.helo !== "hangar") {
      var ax = -L * 0.20, al = L * 0.14, aw = hullB * 0.64, ah = dh * 1.05;
      var azb = K.topAt(ax);
      var ab = new T.Mesh(tboxGeo(T, al, aw, ah, 0.95), m.sup);
      ab.position.set(ax, 0, azb + ah * 0.5); G.add(ab);
      K.blocks.push({ x0: ax - al * 0.5, x1: ax + al * 0.5, z: azb + ah });
      var ad = new T.Mesh(tboxGeo(T, al * 0.34, aw * 0.52, ah * 0.72, 0.86), m.sup);
      ad.position.set(ax + al * 0.10, 0, azb + ah + ah * 0.36); G.add(ad);
      K.blocks.push({ x0: ax - al * 0.10, x1: ax + al * 0.28, z: azb + ah * 1.72 });
    }

    /* ---- aft end: pad, hangar, then whatever fits forward of them ---- */
    var aftCur = -L * 0.46;
    if (P.helo && P.helo !== "none") {
      var padL = L * 0.135, padX = -L * 0.5 + padL * 0.56;
      var padW = Math.min(hullB * 0.88, padL * 1.05);
      addFlightDeck(K, padX, K.deckAt(padX), padL, padW);
      aftCur = padX + padL * 0.5;
      if (P.helo === "hangar") {
        var hgL = L * 0.115, hgX = aftCur + hgL * 0.5;
        addHangar(K, hgX, K.deckAt(hgX), hgL, hullB * 0.70, dh * 1.35);
        aftCur = hgX + hgL * 0.5;
      }
    }

    /* the superfiring deckhouse under the raised mount has to be as wide as
       the mount standing on it, or a triple 8-inch turret hangs off both
       sides of its own barbette */
    var gs2 = gunSplit(P), cal = P.gunCal || 76;
    var gfw = Math.max(hullB * 0.42, gunFoot(S, cal, P.guns) * 0.92);
    for (i = 0; i < gs2.a; i++) {
      var gf = gunFoot(S, cal, P.guns), gx = aftCur + gf * 0.58 + i * gf * 1.06;
      var gz = K.topAt(gx);
      if (i > 0) {
        var bb2 = new T.Mesh(tboxGeo(T, gf * 1.05, gfw, dh * 0.80, 0.92), m.sup);
        bb2.position.set(gx, 0, gz + dh * 0.40); G.add(bb2);
        gz += dh * 0.80;
      }
      addGun(K, gx, gz, cal, true, P.guns);
      aftCur = gx + gf * 0.55;
    }

    var foreCur = L * 0.44;
    for (i = 0; i < gs2.f; i++) {
      var gf2 = gunFoot(S, cal, P.guns), gx2 = foreCur - gf2 * 0.58 - i * gf2 * 1.06;
      var gz2 = K.topAt(gx2);
      if (i > 0) {
        var bb3 = new T.Mesh(tboxGeo(T, gf2 * 1.05, gfw, dh * 0.80, 0.92), m.sup);
        bb3.position.set(gx2, 0, gz2 + dh * 0.40); G.add(bb3);
        gz2 += dh * 0.80;
      }
      addGun(K, gx2, gz2, cal, false, P.guns);
      foreCur = gx2 - gf2 * 0.55;
    }

    if (P.launchers === "rails") {
      var rx = foreCur - L * 0.045;
      if (rx > supX1 + L * 0.02) { addRailLauncher(K, rx, K.topAt(rx), false); foreCur = rx - L * 0.045; }
      if (L > 110) {
        var rx2 = aftCur + L * 0.045;
        if (rx2 < supX0 - L * 0.02) { addRailLauncher(K, rx2, K.topAt(rx2), true); aftCur = rx2 + L * 0.045; }
      }
    }

    if (vlsN > 0) {
      var nFore = vlsN, nAft = 0;
      if (vlsN >= 40) { nFore = Math.round(vlsN * 0.42); nAft = vlsN - nFore; }
      var roomF = foreCur - (supX1 + L * 0.015);
      var roomA = (supX0 - L * 0.015) - aftCur;
      if (nAft === 0 && roomF < L * 0.045 && roomA > roomF) { nAft = nFore; nFore = 0; }
      if (nFore > 0 && roomF > L * 0.02)
        addVLS(K, (foreCur + supX1 + L * 0.015) * 0.5, K.deckAt(supX1), nFore, roomF);
      if (nAft > 0 && roomA > L * 0.02)
        addVLS(K, (aftCur + supX0 - L * 0.015) * 0.5, K.deckAt(supX0), nAft, roomA);
    }

    if (P.launchers === "box") {
      var lx = -L * 0.02;
      addBoxLaunchers(K, lx, K.deckAt(lx), L < 70 ? 2 : 1);
    }

    /* ---- funnels ---- */
    var nf = P.funnels | 0, fst = P.funnelStyle || "none";
    var mack = fst === "mack", mackTop = null;
    if (nf > 0 && fst !== "none") {
      var fxs = nf === 1 ? [-L * 0.03] : [L * 0.00, -L * 0.15];
      for (i = 0; i < fxs.length; i++) {
        var tpf = addFunnel(K, fxs[i], K.topAt(fxs[i]), fst, dh, mack);
        if (i === 0) mackTop = tpf;
      }
    }

    /* ---- mast and sensors ---- */
    var mastStyle = P.mast || "pole";
    var mx = mack && mackTop ? mackTop.x : supX1 - L * 0.045;
    var mz = mack && mackTop ? mackTop.z : K.topAt(mx);
    var mt2 = addMast(K, mx, mz, mastStyle, dh);
    var aw2 = clamp(hullB * 0.40, 1.0, 7.2);
    if (P.radar === "dish" || P.radar === "both") {
      airSearch(K, mt2.x, mt2.z + aw2 * 0.30, aw2);
      var fx2 = supX1 - L * 0.085;
      dishAt(K, fx2, 0, K.topAt(fx2) + dh * 0.45, clamp(hullB * 0.13, 0.35, 1.9), 0);
      if (L > 95) {
        var fx3 = supX0 - L * 0.03;
        dishAt(K, fx3, 0, K.topAt(fx3) + dh * 0.45, clamp(hullB * 0.11, 0.30, 1.6), PI);
      }
    }
    if (P.radar === "planar" || P.radar === "both")
      planarArrays(K, supX1 - L * 0.030, 0, bridgeTop - dh * 0.55,
                   clamp(hullB * 0.115, 0.5, 2.3), L * 0.085, hullB * 0.30);

    /* ---- close-in weapons ---- */
    var cw = Math.min(hullB * 0.40, S.Bh * 0.74);
    var cands = [[supX1 - L * 0.025, 0], [-L * 0.28, 0], [L * 0.09, cw], [-L * 0.06, -cw]];
    var nciws = Math.min(4, P.ciws | 0);
    for (i = 0; i < nciws; i++)
      addCIWS(K, cands[i][0], cands[i][1], K.topAt(cands[i][0]));

    /* ---- staffs fore and aft: cheap, and they give the eye a scale ---- */
    var jr = Math.max(0.05, hullB * 0.020);
    var js = new T.Mesh(new T.CylinderGeometry(jr * 0.6, jr, dh * 1.1, 5).rotateX(PI / 2), m.steel);
    js.position.set(L * 0.475, 0, K.deckAt(L * 0.475) + dh * 0.55); G.add(js);
    var es = new T.Mesh(new T.CylinderGeometry(jr * 0.6, jr, dh * 1.3, 5).rotateX(PI / 2), m.steel);
    es.position.set(-L * 0.485, 0, K.deckAt(-L * 0.485) + dh * 0.65); G.add(es);

    return G;
  }

  /* ============================================================ registry */
  function registerAll(override) {
    var made = 0, kept = 0;
    for (var id in WARSHIPS) {
      if (!Object.prototype.hasOwnProperty.call(WARSHIPS, id)) continue;
      if (WARSHIPS[id].kind === "sub") continue;        /* units3d_subs.js owns those */
      /* a hand-finished mesh wins; an early parametric stand-in does not */
      if (!override && UNIT_MODELS[id] && !UNIT_MODELS[id].crude) { kept++; continue; }
      (function (Q, key) {
        UNIT_MODELS[key] = {
          len: Q.len || 100,
          build: function (THREE, M, C) { return build(THREE, M, C, Q); },
        };
      })(WARSHIPS[id], id);
      made++;
    }
    return { made: made, kept: kept };
  }

  return { build: build, registerAll: registerAll, PAINT: PAINT };
})();
