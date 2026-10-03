/* ===== ru_aa_site.js - HERO model: the Soviet / Russian fixed AA gun battery ==
   BUILDINGS.flak, side "pact" (USSR / Russia).  The shared "flak" model is a
   radar-directed twin 40 mm; that is not a Soviet gun.  This file registers
   one build under BLD_MODELS["flak_pact_<era>"] with an option per system:

     e50  KS-19 100 mm heavy AA gun battery + SON-9 gun-laying radar
     e60  S-60 57 mm AA gun battery + SON-9 gun-laying radar
     e80  ZU-23-2 23 mm twin AA guns
     e90  ZU-23-2
     e00  ZU-23-2
     e20  ZU-23-2

   WHAT EACH ELEMENT RESTS ON (Wikimedia Commons photographs fetched for this
   model, folder scratchpad/ru_aa_site_ref):
     S-60:   "Skarzysko 57 mm S-60 01.jpg" (Polish museum gun, left side view):
             two-axle four-wheel carriage on its jack base, a cruciform
             footing, two upright side shield plates round the breech, one long
             slender barrel with a slotted muzzle brake raised about 40 degrees.
     KS-19:  "Skarzysko 100 mm KS-19 01.jpg": long four-wheel carriage, the
             base jack under the middle, a box-shaped saddle with gear and
             sight housings, the long 100 mm barrel with its recoil sleeve
             and a muzzle brake, raised about 45-50 degrees.
     SON-9:  "SON-9 in Technical museum Togliatti.jpg": a rectangular green
             box van on a wheeled truck chassis with the small round dish
             (about 2 m) on the roof, in front of the cab.
     ZU-23-2: "ZU 23 2 Sofia.jpg" and "ZU-23 anti-aircraft gun ready for
             fire.jpg": two parallel 23 mm barrels with flash hiders on a
             cradle, a pedestal carriage on a cross base with its two wheels,
             a small shield and the ammunition boxes either side of the gun.
   Sizes: published figures (S-60 57 mm L/76 barrel about 4.3 m, track 2.05 m;
   KS-19 barrel about 6 m, 9.5 t; ZU-23-2 barrels 2.0 m, 0.95 t, transport
   length 4.6 m); every gun is drawn at its true size, not enlarged.

   PERIODS (dates from the English Wikipedia articles "KS-19", "AZP S-60" and
   "ZU-23-2", fetched 2026-10-03; one system is drawn per period):
     e50  KS-19: introduced 1948 (KS-19M 1951, KS-19M2 1955; the heavy AA gun
          of the Warsaw Pact armies).  The S-60 was accepted in 1950, so the
          57 mm is also a 1950s gun; the 100 mm is drawn because it is the
          fixed heavy battery of the decade.
     e60  S-60 + SON-9: the article ties the SON-9 gun-laying system (Grom-2
          radar, PUAZO-5A director, later RPK-1 Vaza) to the S-60 batteries;
          in the mid-1960s divisional units began replacing guns with
          missiles, but the PVO AA regiments kept four 57 mm batteries, and
          the guns were brought back from storage for the Vietnam war.
     e80, e90, e00, e20  ZU-23-2: in service 1960 and "still used by the
          Russian Army"; the article says Soviet forces placed ZU-23-2 sets
          round occupied positions in Afghanistan for static defence.  The
          S-60 "had almost disappeared" from Soviet units by the end of the
          1970s (same article), so no S-60 key is registered for e80.
   Not confirmed and so not drawn / stated: no photograph of an emplaced
   Soviet gun battery was found (Commons searches for Vietnam, Egypt and
   Afghanistan positions returned only museum guns and vehicle mounts), so the
   pits (earth rings 0.8-1.0 m high, open behind), the ammunition boxes
   stacked behind them (box shape from the ZU-23 photographs), the shallow
   crew trench and the packed-earth ground are GENERIC and kept minimal; no
   sandbags, tarpaulin covers, camouflage nets, markings or numerals, and
   the colour is all green.  The exact period for each key above comes from
   the guns' own service dates, not from a source on fixed batteries.

   COMPRESSION: a real KS-19 / S-60 battery has four to six guns on a ring
   some 60-100 m across with the SON-9 in the middle and the plotting
   position and power set apart; the plot shows two to four guns (three KS-19,
   four S-60, four ZU-23-2) and the SON-9, 17-18 m apart, no cables, no
   plotting van, no power set, no ammunition store (only a few spare boxes).  The gun and the SON-9 are
   at true size.  Footprint about 26 m square.

   The gun nearest the centre is the group "turret" (the whole piece turns,
   barrels at 45 degrees); every other gun and the radar van are baked.
   Team colour (exactly C.team): one small flat panel 2 cm proud of the turret
   gun's shield plate (or its ammunition box on the ZU-23-2) and one on the
   SON-9 van door.

   Model space: Z up, metres, ground z = 0, +X is the direction the trained
   gun points at rest.  ASCII only.  */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroRuAaSite = (function () {
  "use strict";

  var COL = { paint: 0x4e5a3a, dark: 0x25282a, steel: 0x3c4538, earth: 0x6b5f45,
              dish: 0x8f9a8c, gravel: 0x58533f };

  /* ------------------------------------------------------------- the kit */
  function Kit(THREE) { this.T = THREE; this.bins = {}; }
  Kit.prototype.put = function (key, geo, m4) {
    geo.applyMatrix4(m4);
    var g = geo.index ? geo.toNonIndexed() : geo;
    var b = this.bins[key] || (this.bins[key] = { P: [], N: [] });
    var p = g.attributes.position.array, n = g.attributes.normal.array, i;
    for (i = 0; i < p.length; i++) { b.P.push(p[i]); b.N.push(n[i]); }
  };
  Kit.prototype.box = function (key, F, cx, cy, z0, sx, sy, sz, pre) {
    var T = this.T, m = F.clone();
    if (pre) m.multiply(pre);
    m.multiply(new T.Matrix4().makeTranslation(cx, cy, z0 + sz / 2));
    this.put(key, new T.BoxGeometry(sx, sy, sz), m);
  };
  /* a cylinder or cone between two points of the frame (+ pre) */
  Kit.prototype.cyl = function (key, F, a, b, r0, r1, seg, pre) {
    var T = this.T, A = new T.Vector3(a[0], a[1], a[2]), B = new T.Vector3(b[0], b[1], b[2]);
    var M = F.clone(); if (pre) M.multiply(pre);
    A.applyMatrix4(M); B.applyMatrix4(M);
    var d = B.clone().sub(A), len = d.length(), mid = A.clone().add(B).multiplyScalar(0.5);
    var q = new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), d.clone().normalize());
    var geo = new T.CylinderGeometry(r1, r0, len, seg || 10, 1, false);
    this.put(key, geo, new T.Matrix4().compose(mid, q, new T.Vector3(1, 1, 1)));
  };
  Kit.prototype.meshes = function (THREE, mats, group, prefix) {
    var k, g, m;
    for (k in this.bins) {
      g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(this.bins[k].P), 3));
      g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(this.bins[k].N), 3));
      m = new THREE.Mesh(g, mats[k]); m.name = prefix + k; group.add(m);
    }
  };

  /* wheel (axis along Y) */
  function wheel(K, F, x, y, r, w) {
    K.cyl("dark", F, [x, y - w / 2, r], [x, y + w / 2, r], r, r, 12);
  }
  /* rotation about the Y axis about a pivot, lifting +X by el radians */
  function elev(T, px, pz, el) {
    return new T.Matrix4().makeTranslation(px, 0, pz)
      .multiply(new T.Matrix4().makeRotationY(-el))
      .multiply(new T.Matrix4().makeTranslation(-px, 0, -pz));
  }

  /* ------------------------------------------------------------- S-60 */
  function s60(K, F, panel) {
    var T = K.T, e = elev(T, 0.1, 2.0, 0.70), s;
    wheel(K, F, 1.75, 1.05, 0.42, 0.22); wheel(K, F, 1.75, -1.05, 0.42, 0.22);
    wheel(K, F, -1.75, 1.05, 0.42, 0.22); wheel(K, F, -1.75, -1.05, 0.42, 0.22);
    K.cyl("steel", F, [1.75, -1.05, 0.42], [1.75, 1.05, 0.42], 0.07, 0.07, 8);
    K.cyl("steel", F, [-1.75, -1.05, 0.42], [-1.75, 1.05, 0.42], 0.07, 0.07, 8);
    K.box("paint", F, 0, 0, 0.52, 4.0, 0.28, 0.22);              // carriage beam
    K.box("paint", F, 0, 0, 0.30, 0.26, 3.2, 0.2);               // cross footing
    for (s = -1; s <= 1; s += 2) {
      K.cyl("dark", F, [s * 1.6, 0, 0.0], [s * 1.6, 0, 0.30], 0.13, 0.09, 8);
      K.cyl("dark", F, [0, s * 1.6, 0.0], [0, s * 1.6, 0.30], 0.13, 0.09, 8);
    }
    K.cyl("steel", F, [0, 0, 0.55], [0, 0, 1.55], 0.42, 0.36, 12);  // pedestal
    K.box("paint", F, 0, 0, 1.55, 1.5, 1.3, 0.2);                // platform
    for (s = -1; s <= 1; s += 2) K.box("paint", F, 0.15, s * 0.72, 1.75, 1.2, 0.07, 1.25);  // side shields
    K.box("paint", F, 0.78, 0, 1.75, 0.07, 1.4, 0.8);            // front shield
    K.box("steel", F, -0.3, 0, 1.75, 0.8, 0.9, 0.45);            // breech housing
    K.cyl("steel", F, [-0.35, 0, 2.0], [1.3, 0, 2.0], 0.1, 0.085, 10, e);  // recoil sleeve
    K.cyl("steel", F, [1.3, 0, 2.0], [3.95, 0, 2.0], 0.05, 0.045, 8, e);   // barrel
    K.cyl("steel", F, [3.95, 0, 2.0], [4.4, 0, 2.0], 0.075, 0.075, 8, e);  // muzzle brake
    K.box("steel", F, -0.7, 0.5, 2.05, 0.4, 0.25, 0.45, e);      // ammunition clip feed
    if (panel) K.box("team", F, 0.15, 0.72 + 0.035 + 0.01, 2.15, 0.6, 0.02, 0.35);
  }

  /* ------------------------------------------------------------- KS-19 */
  function ks19(K, F, panel) {
    var T = K.T, e = elev(T, 0.2, 2.6, 0.85), s;
    for (s = -1; s <= 1; s += 2) {
      wheel(K, F, 2.3, s * 1.12, 0.5, 0.3); wheel(K, F, -2.3, s * 1.12, 0.5, 0.3);
    }
    K.cyl("steel", F, [2.3, -1.12, 0.5], [2.3, 1.12, 0.5], 0.09, 0.09, 8);
    K.cyl("steel", F, [-2.3, -1.12, 0.5], [-2.3, 1.12, 0.5], 0.09, 0.09, 8);
    K.box("paint", F, 0, 0, 0.62, 7.0, 0.42, 0.3);               // long carriage frame
    K.box("paint", F, 0, 0, 0.36, 0.34, 4.4, 0.26);              // cross footing
    for (s = -1; s <= 1; s += 2) {
      K.cyl("dark", F, [0, s * 2.1, 0.0], [0, s * 2.1, 0.36], 0.16, 0.11, 8);
      K.cyl("dark", F, [s * 3.35, 0, 0.0], [s * 3.35, 0, 0.62], 0.15, 0.11, 8);
    }
    K.cyl("steel", F, [0, 0, 0.6], [0, 0, 1.1], 0.7, 0.62, 12);  // base ring
    K.box("paint", F, -0.2, 0, 1.1, 2.2, 1.7, 1.1);              // saddle
    K.box("paint", F, -1.15, 0, 1.2, 0.95, 1.3, 1.2);            // machinery / loading housing
    for (s = -1; s <= 1; s += 2) K.box("paint", F, 0.1, s * 0.95, 2.2, 1.7, 0.1, 1.2);  // cheek plates
    K.box("paint", F, 0.95, 0, 2.2, 0.1, 1.9, 0.9);              // shield
    K.cyl("steel", F, [-0.9, 0, 2.6], [1.7, 0, 2.6], 0.19, 0.16, 12, e);   // recoil sleeve
    K.cyl("steel", F, [1.7, 0, 2.6], [5.0, 0, 2.6], 0.12, 0.085, 10, e);   // barrel
    K.cyl("steel", F, [5.0, 0, 2.6], [5.35, 0, 2.6], 0.14, 0.14, 10, e);   // muzzle brake
    for (s = -1; s <= 1; s += 2) K.cyl("steel", F, [-0.2, s * 0.34, 2.95], [1.5, s * 0.34, 2.95], 0.08, 0.08, 8, e);
    K.box("steel", F, -1.1, 0, 2.4, 1.0, 0.5, 0.35, e);          // breech
    if (panel) K.box("team", F, 0.1, 0.95 + 0.05 + 0.01, 2.55, 0.8, 0.02, 0.4);
  }

  /* ------------------------------------------------------------- ZU-23-2 */
  function zu23(K, F, panel) {
    var T = K.T, e = elev(T, 0.4, 1.4, 1.10), s;
    wheel(K, F, 0.0, 0.78, 0.30, 0.16); wheel(K, F, 0.0, -0.78, 0.30, 0.16);
    K.cyl("steel", F, [0, -0.78, 0.30], [0, 0.78, 0.30], 0.05, 0.05, 8);
    K.box("paint", F, 0, 0, 0.33, 2.7, 0.14, 0.12);              // cross base, fore-and-aft arm
    K.box("paint", F, 0, 0, 0.33, 0.14, 2.3, 0.12);              // cross base, lateral arm
    for (s = -1; s <= 1; s += 2) {
      K.cyl("dark", F, [s * 1.3, 0, 0.0], [s * 1.3, 0, 0.35], 0.09, 0.06, 8);
      K.cyl("dark", F, [0, s * 1.15, 0.0], [0, s * 1.15, 0.35], 0.09, 0.06, 8);
    }
    K.cyl("steel", F, [0, 0, 0.4], [0, 0, 0.95], 0.28, 0.24, 10);  // pedestal
    K.box("paint", F, 0, 0, 0.95, 0.9, 0.9, 0.35);               // mount body
    K.box("paint", F, 0.6, 0, 1.0, 0.05, 1.3, 0.8);              // shield
    for (s = -1; s <= 1; s += 2) {
      K.box("paint", F, 0.15, s * 0.5, 1.3, 0.5, 0.3, 0.3);      // ammunition box
      K.box("steel", F, -0.55, s * 0.4, 1.0, 0.35, 0.3, 0.05);   // seat
      K.cyl("steel", F, [0.4, s * 0.19, 1.4], [1.9, s * 0.19, 1.4], 0.04, 0.032, 8, e);   // barrel
      K.cyl("steel", F, [1.9, s * 0.19, 1.4], [2.15, s * 0.19, 1.4], 0.05, 0.05, 8, e);   // flash hider
    }
    K.box("steel", F, 0.1, 0, 1.25, 0.9, 0.5, 0.35, e);          // cradle and breeches
    if (panel) K.box("team", F, 0.15, 0.5, 1.6 + 0.02, 0.4, 0.2, 0.02);
  }

  /* ------------------------------------------------------------- SON-9 */
  function son9(K, F) {
    var s, i, tilt = 0.52;
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2) wheel(K, F, 1.6 - i * 1.25, s * 1.0, 0.5, 0.3);
    K.box("dark", F, -0.3, 0, 0.5, 5.6, 1.3, 0.3);               // chassis
    K.box("paint", F, 2.55, 0, 0.8, 1.7, 2.2, 1.7);              // cab
    K.box("dark", F, 3.43, 0, 0.9, 0.06, 1.8, 0.4);              // front grille
    K.box("paint", F, -0.9, 0, 0.8, 4.4, 2.3, 2.15);             // box van
    K.box("dark", F, -0.9, 0, 2.95, 4.2, 2.1, 0.06);             // roof plate
    K.box("team", F, 0.9, 1.15 + 0.01, 1.2, 0.7, 0.02, 1.4);     // door panel
    K.cyl("steel", F, [-0.2, 0, 3.0], [-0.2, 0, 3.55], 0.16, 0.14, 8);
    K.cyl("dish", F, [-0.2, 0, 3.55], [-0.2 + Math.sin(tilt) * 0.3, 0, 3.55 + Math.cos(tilt) * 0.3], 0.12, 0.95, 16);
    K.cyl("steel", F, [-0.2, 0, 3.55], [-0.2 + Math.sin(tilt) * 0.9, 0, 3.55 + Math.cos(tilt) * 0.9], 0.02, 0.02, 6);
  }

  /* an earth parapet ring round a gun pit, open behind (to -X of the heading) */
  function parapet(K, F, R, h) {
    var T = K.T, n = Math.max(12, Math.round(R * 4)), i, a, w = 2 * Math.PI * R / n * 1.15;
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2;
      if (Math.abs(Math.atan2(Math.sin(a - Math.PI), Math.cos(a - Math.PI))) < 0.3) continue;   // access gap
      K.box("earth", F, 0, 0, 0, w, 1.3, h, new T.Matrix4().makeTranslation(Math.cos(a) * R, Math.sin(a) * R, 0).multiply(new T.Matrix4().makeRotationZ(a + Math.PI / 2)));
    }
  }

  /* spare ammunition boxes stacked beside a pit, behind the gun (the gun
     photographs show the box shape; the stacking position is generic) */
  function ammo(K, F, R) {
    var s, j;
    for (s = -1; s <= 1; s += 2) for (j = 0; j < 2; j++) {
      K.box("paint", F, -R - 0.9 - j * 0.0, s * 1.5, 0.0, 0.55, 0.3, 0.3);
      K.box("paint", F, -R - 0.9, s * 1.5 + (j ? 0.34 : -0.34), 0.3, 0.55, 0.3, 0.3);
    }
  }
  /* a shallow crew trench between the pits: dark floor strip, a low earth
     berm either side (generic - no photograph of one was found) */
  function trench(K, x, hl) {
    var T = K.T, I = new T.Matrix4();
    K.box("dark", I, x, 0, 0.085, 1.0, 2 * hl, 0.02);
    K.box("earth", I, x - 0.9, 0, 0, 0.8, 2 * hl + 0.8, 0.45);
    K.box("earth", I, x + 0.9, 0, 0, 0.8, 2 * hl + 0.8, 0.45);
    K.box("earth", I, x, -hl - 0.4, 0, 1.0, 0.8, 0.45);
  }

  /* --------------------------------------------------------- the layouts */
  var SITES = {
    ks19: { gun: ks19, R: 5.4, h: 1.0,
            guns: [[3, 0, 0], [-6, -8.5, 0.5], [-6, 8.5, -0.5]], radar: [10.5, 8.5, 3.14159] },
    s60:  { gun: s60, R: 3.8, h: 0.9,
            guns: [[0, 0, 0], [-8.5, -8.5, 0.4], [-8.5, 8.5, -0.4], [8.5, 8.5, 0.9]], radar: [8.5, -8.5, 0] },
    zu23: { gun: zu23, R: 2.2, h: 0.8,
            guns: [[0, 0, 0], [-8.5, -8.5, 0.5], [-8.5, 8.5, -0.5], [8.5, 8.5, 0.4]], radar: null }
  };

  function build(sysKey) {
    return function (THREE, M, C) {
      var S = SITES[sysKey], root = new THREE.Group(), T = THREE, Kb = new Kit(T), Kt = new Kit(T), mats = {}, k, i, g, F, m;
      function mat(c, r, mt) { return new T.MeshStandardMaterial({ color: c, roughness: r, metalness: mt }); }
      mats.paint = mat(COL.paint, 0.82, 0.12); mats.dark = mat(COL.dark, 0.85, 0.1);
      mats.steel = mat(COL.steel, 0.55, 0.45); mats.earth = mat(COL.earth, 0.98, 0.0);
      mats.dish = mat(COL.dish, 0.6, 0.3);
      mats.team = mat((C && C.team !== undefined) ? C.team : 0x4b8fe0, 0.7, 0.1);
      mats.gravel = mat(COL.gravel, 0.98, 0.0);
      Kb.box("gravel", new T.Matrix4(), 0, 0, 0, 27, 27, 0.08);       // packed earth
      for (i = 0; i < S.guns.length; i++) {
        g = S.guns[i];
        F = new T.Matrix4().makeTranslation(g[0], g[1], 0).multiply(new T.Matrix4().makeRotationZ(g[2]));
        parapet(Kb, F, S.R, S.h); ammo(Kb, F, S.R);
        if (i === 0) S.gun(Kt, new T.Matrix4(), true); else S.gun(Kb, F, false);
      }
      trench(Kb, -5.5, 2.5);
      if (S.radar) {
        F = new T.Matrix4().makeTranslation(S.radar[0], S.radar[1], 0).multiply(new T.Matrix4().makeRotationZ(S.radar[2]));
        son9(Kb, F);
      }
      Kb.meshes(T, mats, root, "aa_");
      var turret = new T.Group(); turret.name = "turret";
      Kt.meshes(T, mats, turret, "aat_");
      turret.position.set(S.guns[0][0], S.guns[0][1], 0.0);
      turret.rotation.z = S.guns[0][2];
      root.add(turret);
      root.userData.whole = true;
      return root;
    };
  }
  return { build: build };
})();

BLD_MODELS["flak_pact_e50"] = { build: HeroRuAaSite.build("ks19") };
BLD_MODELS["flak_pact_e60"] = { build: HeroRuAaSite.build("s60") };
BLD_MODELS["flak_pact_e80"] = { build: HeroRuAaSite.build("zu23") };
BLD_MODELS["flak_pact_e90"] = { build: HeroRuAaSite.build("zu23") };
BLD_MODELS["flak_pact_e00"] = { build: HeroRuAaSite.build("zu23") };
BLD_MODELS["flak_pact_e20"] = { build: HeroRuAaSite.build("zu23") };
