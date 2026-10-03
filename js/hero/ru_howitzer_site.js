/* ===== ru_howitzer_site.js - HERO model: Soviet / Russian towed-howitzer battery
   BUILDINGS id "arty" ("Fixed 155mm battery" in the shared text), side "pact".
   The shared model is a single 155 mm tube with a US-style split trail and
   a round pit. For the Soviet / Russian army the same site is a battery of
   towed 152 mm guns, so this file registers BLD_MODELS["arty_pact_<era>"]:

     e50  ML-20 (M1937) 152 mm gun-howitzer. Built 1937-1946; "eventually
          replaced by the D-20, which entered production in 1956" (Wikipedia,
          "ML-20"); in Soviet service "for a long time after the war".
     e60  D-20 (M1955) 152 mm gun-howitzer, army-level gun of the 1960s
          (Wikipedia "D-20 howitzer": production from 1956).
     e80  D-20 again: the 2A65 Msta-B has been fielded "since at least 1987"
          (Wikipedia "2A65 Msta-B"), the last year of the decade.
     e90, e00, e20  2A65 Msta-B (M1987) 152.4 mm, "in service with Russian front
          and army level artillery units as of 2022" (same page).
     D-30 122 mm is NOT drawn: it is a three-trail divisional howitzer.

   TUBES, published figures (Wikipedia infoboxes): D-20 5.195 m with brake,
   L/34 (the 26-calibre, 3.962 m figure is the bore); ML-20 4.412 m without
   brake (L/29), plus the slotted brake; 2A65 8.13 m with brake, L/53.3
   (7.2 m, L/47 without). Overall width 2.35 m (D-20 and ML-20), height
   1.93 m D-20 / 2.27 m ML-20 travelling. All three guns are drawn to those.

   WHAT EACH ELEMENT RESTS ON (Wikimedia Commons photographs fetched and read):
     - D-20: "152 mm howitzer D-20-4597.JPG" (shield with side flaps, boxy
       double-baffle brake, big truck tyres, box-section trails, cradle with the
       recoil cylinders on top), "Howitzer D-20.jpg" (side view) and
       "Moldovan artillery gun during exercise Fire Shield 2019.jpg" and
       "Moldovan soldiers execute battery live fire.jpg" (Soviet-pattern D-20
       batteries firing on OPEN, UNDUG ground, guns side by side, wheels on the
       grass, trails spread, the small wheel carried on top of each trail).
     - ML-20: "152 mm howitzer-gun M1937 (ML-20) 1.jpg" and the wartime
       photograph "Batareya orudiy kapitana V.A.Gontarchuka na ognevoy
       pozitsii. Deystvuyushchaya armiya (Zapadnyy front).jpg": ML-20 pieces
       with SPOKED wheels and narrow tyres, the nearer one standing in a
       shallow gun pit with the spoil heaped as a low bank in front and at the
       sides and the trails lying in the open rear, a second gun in the same
       state farther off; no concrete, no timber, no niches visible.
       Wheels: both photographed pieces have spokes, so SPOKED wheels are drawn
       for e50. Wikipedia says the usual piece had steel wheels with rubber
       tyres and only "some early production pieces" spokes; which pattern the
       1950s service pieces had is NOT confirmed - flagged as a risk.
     - 2A65 Msta-B: "2A65 152 mm howitzer-4583.JPG" (muzzle) and "2A65 Msta-B
       howitzer (14-11-2019) 02.jpg" (breech end: large sloping shield, firing
       jack, recoil cylinders, single large tyres); Wikipedia: split trail with
       a caster wheel on each trail swung through 180 degrees to rest on top of
       the trail, the hydraulic circular firing jack under the forward carriage.
   Other measures (track, tyre diameter, bore height, trail spread) are read off
   the photographs, good to about 5-8 per cent.

   THE POSITION. The only emplacement photograph found is the wartime ML-20 pit
   (form used only; no wartime marking drawn), so ONLY e50 gets earth: a
   horseshoe bank of spoil (front and both sides, open at the rear for the
   trails) round each ML-20. The e60-e20 guns stand on the open ground as the
   2019 photographs of Soviet-pattern batteries show them: NO pit, bank,
   concrete, ammunition niche or dugout is drawn, as no photograph or drawing of
   any was found (searches for Soviet field-fortification gun-pit diagrams on
   Commons returned nothing usable). Ammunition stacks, nets and tractors are
   likewise not drawn.

   GROUND APRON (all six keys). A plain flat apron of beaten earth, 26 x 26 m,
   3 cm thick with a stepped bevelled edge, in the dry soil-and-stubble colour
   of the ground in the 2019 Fire Shield photographs. It is only the plot's
   footprint so the site does not read as empty: NOT a fortification (no pit,
   wall, crate or niche); nothing else is raised, the tyres sink 3 cm into it.

   LAYOUT AND COMPRESSION. A real battery is six guns at 30-40 m intervals; here
   three, 9.5 m apart, abreast, all at TRUE size, the central one the "turret"
   (the whole gun turns on its axle), the two flank guns baked, level, pointing
   +X. All inside 30 x 30 m; ground z = 0. Model space: Z up, metres, +X the
   direction the tube points at rest. One "turret" group. Materials: APRON (all keys), EARTH (e50
   banks only), GREEN (carriage and tube paint, period tinted), DARK (tyres, brake
   slots), TEAM (exactly C.team: three small flat panels lifted 2 cm on the
   carriage tops). ASCII only. */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroHowitzerSite = (function () {
  "use strict";

  /* ---------------------------------------------------------- merge sinks */
  function Sink(THREE, mat, base) {
    this.THREE = THREE; this.mat = mat; this.base = base || null;
    this.p = []; this.n = []; this.i = [];
  }
  Sink.prototype.add = function (geo, local) {
    var T = this.THREE, g = geo.clone();
    g.applyMatrix4(local);
    if (this.base) g.applyMatrix4(this.base);
    var pa = g.attributes.position.array, na = g.attributes.normal.array;
    var off = this.p.length / 3, ix = g.index.array, k;
    for (k = 0; k < pa.length; k++) { this.p.push(pa[k]); this.n.push(na[k]); }
    for (k = 0; k < ix.length; k++) this.i.push(ix[k] + off);
    g.dispose(); geo.dispose();
  };
  Sink.prototype.mesh = function () {
    if (!this.p.length) return null;
    var T = this.THREE, g = new T.BufferGeometry();
    g.setAttribute("position", new T.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new T.Float32BufferAttribute(this.n, 3));
    g.setIndex(this.i);
    return new T.Mesh(g, this.mat);
  };
  function mat4(THREE, x, y, z, rz) {
    var m = new THREE.Matrix4();
    if (rz) m.makeRotationZ(rz);
    m.setPosition(x, y, z);
    return m;
  }
  /* centre-placed box, length sx along local x, rotated rz about z */
  function box(THREE, s, sx, sy, sz, x, y, z, rz) {
    s.add(new THREE.BoxGeometry(sx, sy, sz), mat4(THREE, x, y, z, rz));
  }
  /* cylinder along axis "x" (rBack at -x, rFront at +x), "y" or "z" */
  function cyl(THREE, s, axis, rBack, rFront, len, seg, x, y, z) {
    var g = new THREE.CylinderGeometry(rFront, rBack, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-Math.PI / 2);
    else if (axis === "z") g.rotateX(Math.PI / 2);
    s.add(g, mat4(THREE, x, y, z, 0));
  }
  /* beam from (x0,y0) to (x1,y1) at z, w wide, h tall */
  function beam(THREE, s, x0, y0, x1, y1, w, h, z) {
    var L = Math.hypot(x1 - x0, y1 - y0), a = Math.atan2(y1 - y0, x1 - x0);
    box(THREE, s, L, w, h, (x0 + x1) / 2, (y0 + y1) / 2, z, a);
  }

  /* ------------------------------------------------------------------ guns
     Local frame: axle on x = 0, y = 0, feet on z = 0, tube toward +x.
     S = { G: green sink, D: dark sink }. */
  function wheels(THREE, S, R, wy, wid, hubR) {
    [1, -1].forEach(function (s) {
      cyl(THREE, S.D, "y", R, R, wid, 18, 0, s * wy, R);
      cyl(THREE, S.G, "y", hubR, hubR, wid + 0.04, 14, 0, s * wy, R);
    });
  }
  function shieldWings(THREE, S, x, y, z, w, h, sweep) {
    [1, -1].forEach(function (s) {
      box(THREE, S.G, 0.05, w, h, x, s * y, z, s * sweep);
    });
  }
  function trails(THREE, S, x0, y0, x1, y1, w, h, z, caster) {
    [1, -1].forEach(function (s) {
      beam(THREE, S.G, x0, s * y0, x1, s * y1, w, h, z);
      box(THREE, S.G, 0.12, w + 0.28, h + 0.30, x1 - 0.05, s * y1, z - 0.10, Math.atan2(s * (y1 - y0), x1 - x0));
      if (caster) {                                                 /* swung up and resting on top of the trail */
        var f = 0.78, cx = x0 + (x1 - x0) * f, cy = s * (y0 + (y1 - y0) * f);
        cyl(THREE, S.D, "y", caster, caster, 0.12, 10, cx, cy, z + h / 2 + caster);
      }
    });
  }

  function gunD20(THREE, S) {
    var R = 0.58, zb = 1.45;
    wheels(THREE, S, R, 1.0, 0.32, 0.27);
    box(THREE, S.G, 0.90, 1.30, 0.55, 0.00, 0, 0.82);              /* carriage body over the axle */
    box(THREE, S.G, 1.00, 0.60, 0.70, 0.10, 0, 1.25);              /* cradle support */
    box(THREE, S.G, 0.55, 0.42, 0.42, -0.45, 0, zb);               /* breech */
    cyl(THREE, S.G, "x", 0.20, 0.20, 1.70, 28, 0.55, 0, zb);       /* cradle sleeve */
    cyl(THREE, S.G, "x", 0.17, 0.115, 3.90, 28, 1.95, 0, zb);      /* tapering tube */
    box(THREE, S.G, 0.70, 0.30, 0.30, 4.12, 0, zb);                /* double-baffle brake, 5.195 m overall */
    box(THREE, S.D, 0.10, 0.32, 0.18, 3.97, 0, zb);                /* its two side slots */
    box(THREE, S.D, 0.10, 0.32, 0.18, 4.27, 0, zb);
    cyl(THREE, S.G, "x", 0.08, 0.08, 1.50, 16, 0.75, 0, zb + 0.28); /* buffer and recuperator on the cradle */
    cyl(THREE, S.G, "x", 0.06, 0.06, 1.30, 16, 0.70, 0.16, zb + 0.22);
    box(THREE, S.G, 0.05, 1.50, 0.75, 0.62, 0, 1.55);              /* upper shield centre */
    shieldWings(THREE, S, 0.52, 1.05, 1.20, 0.90, 0.95, 0.35);
    cyl(THREE, S.G, "z", 0.50, 0.50, 0.06, 28, 0.90, 0, 0.03);     /* firing jack plate */
    cyl(THREE, S.G, "z", 0.07, 0.07, 0.55, 14, 0.90, 0, 0.50);
    trails(THREE, S, -0.30, 0.20, -3.90, 1.60, 0.26, 0.32, 0.46, 0.18);
  }

  function gunML20(THREE, S) {
    var R = 0.60, zb = 1.60;
    [1, -1].forEach(function (s) {                                  /* SPOKED wheel, narrow tyre (as photographed) */
      var tg = new THREE.TorusGeometry(R - 0.05, 0.05, 6, 28); tg.rotateX(Math.PI / 2);
      S.D.add(tg, mat4(THREE, 0, s * 1.05, R, 0));
      var rg = new THREE.TorusGeometry(R - 0.12, 0.035, 6, 28); rg.rotateX(Math.PI / 2);
      S.G.add(rg, mat4(THREE, 0, s * 1.05, R, 0));
      for (var q = 0; q < 12; q++) {
        var m = new THREE.Matrix4(); m.makeRotationY(q * Math.PI / 12); m.setPosition(0, s * 1.05, R);
        S.G.add(new THREE.BoxGeometry(2 * (R - 0.12), 0.05, 0.05), m);
      }
      cyl(THREE, S.G, "y", 0.14, 0.14, 0.26, 16, 0, s * 1.05, R);
    });
    box(THREE, S.G, 0.80, 1.40, 0.50, 0.00, 0, 0.85);
    box(THREE, S.G, 0.90, 0.70, 0.70, 0.10, 0, 1.30);
    box(THREE, S.G, 0.60, 0.46, 0.46, -0.50, 0, zb);               /* breech */
    cyl(THREE, S.G, "x", 0.26, 0.26, 2.20, 28, 0.85, 0, zb);       /* thick recoil sleeve */
    cyl(THREE, S.G, "x", 0.20, 0.145, 2.10, 28, 2.55, 0, zb);      /* tube, 4.412 m overall from the breech rear */
    cyl(THREE, S.G, "x", 0.21, 0.21, 0.75, 28, 3.90, 0, zb);       /* cylindrical slotted brake */
    for (var k = 0; k < 5; k++) cyl(THREE, S.D, "x", 0.215, 0.215, 0.05, 28, 3.60 + k * 0.15, 0, zb);
    cyl(THREE, S.G, "x", 0.15, 0.15, 1.90, 20, 0.55, 0, zb + 0.34); /* recuperator on top */
    cyl(THREE, S.G, "x", 0.10, 0.10, 1.50, 16, 0.40, 0.30, zb + 0.28);
    [1, -1].forEach(function (s) {                                  /* equilibrator tubes */
      cyl(THREE, S.G, "z", 0.06, 0.06, 1.15, 14, 0.50, s * 0.42, 0.95);
    });
    box(THREE, S.G, 0.05, 1.40, 0.80, 0.95, 0, 1.55);              /* shield */
    shieldWings(THREE, S, 0.85, 0.85, 1.20, 0.60, 0.80, 0.30);
    trails(THREE, S, -0.30, 0.20, -4.00, 1.70, 0.26, 0.34, 0.46, 0);
  }

  function gunMsta(THREE, S) {
    var R = 0.65, zb = 1.65;
    wheels(THREE, S, R, 1.20, 0.34, 0.30);
    box(THREE, S.G, 1.00, 1.50, 0.60, 0.00, 0, 0.90);
    box(THREE, S.G, 1.10, 0.70, 0.80, 0.15, 0, 1.35);
    box(THREE, S.G, 0.65, 0.46, 0.46, -0.55, 0, zb);               /* breech */
    cyl(THREE, S.G, "x", 0.27, 0.27, 2.40, 28, 0.65, 0, zb);       /* cradle sleeve */
    cyl(THREE, S.G, "x", 0.22, 0.15, 6.50, 28, 3.50, 0, zb);       /* long tube */
    cyl(THREE, S.G, "x", 0.20, 0.20, 1.00, 28, 4.40, 0, zb);       /* bore evacuator */
    box(THREE, S.G, 0.62, 0.40, 0.38, 6.95, 0, zb);                /* three-slot brake */
    for (var k = 0; k < 3; k++) box(THREE, S.D, 0.08, 0.42, 0.26, 6.78 + k * 0.17, 0, zb);
    cyl(THREE, S.G, "x", 0.10, 0.10, 1.60, 16, 0.75, 0, zb + 0.34); /* recoil cylinders */
    cyl(THREE, S.G, "x", 0.07, 0.07, 1.40, 16, 0.70, 0.22, zb + 0.26);
    cyl(THREE, S.G, "x", 0.07, 0.07, 1.40, 16, 0.70, -0.22, zb + 0.26);
    box(THREE, S.G, 0.05, 2.00, 1.20, 0.95, 0, 1.30);              /* large flat shield */
    shieldWings(THREE, S, 0.75, 1.50, 1.25, 1.05, 1.10, 0.50);     /* slopes back over the wheels */
    cyl(THREE, S.G, "z", 0.60, 0.60, 0.06, 28, 1.20, 0, 0.03);     /* circular firing jack */
    cyl(THREE, S.G, "z", 0.08, 0.08, 0.60, 14, 1.20, 0, 0.55);
    trails(THREE, S, -0.30, 0.25, -4.30, 1.90, 0.28, 0.34, 0.48, 0.20);
  }

  var GUNS = {
    ml20: { f: gunML20, tint: 0x4b5338, topz: 1.10, earth: true },
    d20:  { f: gunD20,  tint: 0x4d5a3d, topz: 1.095 },
    msta: { f: gunMsta, tint: 0x4a5a3e, topz: 1.20 }
  };
  var KEYS = {
    e50: "ml20", e60: "d20", e80: "d20", e90: "msta", e00: "msta", e20: "msta"
  };

  /* ---------------------------------------------------------------- site */
  function sbox(THREE, s, sx, sy, sz, x, y, z, rz) { box(THREE, s, sx, sy, sz, x, y, z + sz / 2, rz); }
  /* spoil bank round one ML-20 (local frame, axle at 0): front and both sides,
     open at the rear where the trails lie (wartime photograph, form only) */
  function bank(THREE, earth, ox, oy) {
    sbox(THREE, earth, 2.2, 7.2, 0.45, ox + 2.9, oy, 0, 0);          /* front: foot and crest */
    sbox(THREE, earth, 1.2, 6.2, 0.40, ox + 2.9, oy, 0.45, 0);
    [1, -1].forEach(function (s) {
      sbox(THREE, earth, 5.2, 1.6, 0.45, ox + 0.2, oy + s * 2.85, 0, 0);
      sbox(THREE, earth, 4.6, 0.9, 0.35, ox + 0.2, oy + s * 2.85, 0.45, 0);
    });
  }
  function build(THREE, M, C, kind) {
    var spec = GUNS[kind];
    function mk(color, r, m) {
      return new THREE.MeshStandardMaterial({ color: color, roughness: r, metalness: m });
    }
    var teamMat = new THREE.MeshStandardMaterial({
      color: (C && C.team !== undefined) ? C.team : 0x4b8fe0, roughness: 0.6, metalness: 0.1 });
    var root = new THREE.Group();
    var GAP = 9.5, SHIFT = -1.4;                                     /* guns abreast, centred on the plot */
    var earth = new Sink(THREE, mk(0x6d6248, 0.95, 0.02));
    var team  = new Sink(THREE, teamMat);
    var apron = new Sink(THREE, mk(0x7a6f4d, 0.97, 0.01));
    box(THREE, apron, 26.0, 26.0, 0.02, 0, 0, 0.01, 0);             /* beaten-earth footprint, bevelled in two steps */
    box(THREE, apron, 25.2, 25.2, 0.01, 0, 0, 0.025, 0);

    /* the turret: central gun */
    var tG = new Sink(THREE, mk(spec.tint, 0.55, 0.45));
    var tD = new Sink(THREE, mk(0x1d1f22, 0.9, 0.05));
    spec.f(THREE, { G: tG, D: tD });
    var t = new THREE.Group(); t.name = "turret";
    var mg = tG.mesh(), md = tD.mesh();
    if (mg) t.add(mg); if (md) t.add(md);
    t.position.set(SHIFT, 0, 0);
    root.add(t);
    sbox(THREE, team, 0.30, 0.20, 0.02, SHIFT, 0.52, spec.topz, 0);
    if (spec.earth) bank(THREE, earth, SHIFT, 0);

    /* baked flank guns, level, pointing +X */
    var bG = [], bD = [];
    [1, -1].forEach(function (s) {
      var base = mat4(THREE, SHIFT, s * GAP, 0, 0);
      var sg = new Sink(THREE, tG.mat, base), sd = new Sink(THREE, tD.mat, base);
      spec.f(THREE, { G: sg, D: sd });
      bG.push(sg); bD.push(sd);
      sbox(THREE, team, 0.30, 0.20, 0.02, SHIFT, s * GAP + 0.52, spec.topz, 0);
      if (spec.earth) bank(THREE, earth, SHIFT, s * GAP);
    });

    [apron, earth, team].concat(bG, bD).forEach(function (sk) {
      var m = sk.mesh(); if (m) root.add(m);
    });
    root.userData.whole = true;
    return root;
  }

  return { build: build, KEYS: KEYS };
})();

Object.keys(HeroHowitzerSite.KEYS).forEach(function (era) {
  var kind = HeroHowitzerSite.KEYS[era];
  BLD_MODELS["arty_pact_" + era] = { build: function (THREE, M, C) {
    return HeroHowitzerSite.build(THREE, M, C, kind);
  } };
});
