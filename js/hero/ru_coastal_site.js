/* ===== ru_coastal_site.js - HERO model: the Soviet coastal 130 mm gun battery ====
   BUILDINGS id "coastal" ("Casemated 152mm guns that outrange most warships"),
   side "pact" (= USSR / Russia). It replaces the shared casemate (one 15 m gun in
   an embrasure of a concrete block) for the periods in which the Soviet Navy's
   coastal troops really kept FIXED 130 mm gun batteries:

       key                  period   gun
       coastal_pact_e50     1950s    130 mm B-13 coast-defence gun on a fixed pedestal
       coastal_pact_e60     1960s    same
       coastal_pact_e80     1980s    same

   NOT registered: e00 and e20 (the shared casemate shows). I found no
   reference to a FIXED Russian coastal gun battery in the 2000s-2020s: the
   130 mm "Bereg" (A-222) is a wheeled vehicle, Bal / Bastion / Rubezh are
   vehicles, and the Utes underground missile site (Cape Aya near Balaklava:
   first battalion 1957 with the S-2 missile, P-35B from 1972; Kildin 1976)
   is a tunnel complex, not drawn here - the source says only that its re-arming
   was planned for 2020, nothing about its present state. Also not drawn: the
   180 mm and 305 mm turret batteries (Battery No. 30 of Sevastopol, Maxim Gorky I,
   with 305 mm turrets from the battleship Frunze, stayed in service to 1997
   per Wikipedia) - one site, one system; they are fort turrets, not plot-size.

   WHAT EACH ELEMENT RESTS ON (references cached in the builder's rucoast_ref):
     - ru.wikipedia, "130-mm korabelnaya pushka obraza 1935 goda (B-13)":
       "most coastal batteries" of 1941 had B-13; 378 B-13 on ships and coastal
       batteries at the start of 1941; third series B-13-IIIs from 1948; in the
       mid-1980s over 600 B-13 still in Navy service and stores; in 1970, after
       the Damansky clashes, 90 B-13 in 20 batteries were set up on the
       Muravyov-Amursky peninsula (Vladivostok); "the gun stayed in coastal-
       battery service until the break-up of the USSR".
     - Commons "199th coastal artillery battery, Teriberka, 2023" (-02 and the
       "near Teriberka" view): a B-13 on a fixed pedestal with a flat box
       shield (front plate, two side plates, flat roof, open back), standing on
       a round concrete pad with its rail ring, inside a low concrete U parapet
       open to the sea, a flat-roofed concrete ammunition shelter beside it
       and further guns of the same battery in line.
     - Commons "130-mm gun SM-4-1" (Togliatti museum, Roslyakovo memorial):
       the barrel shape (long plain tube, thick muzzle collar) - the
       tube of the same 130 mm/50 gun. The SM-4-1 itself, a wheeled
       cruciform mount, is NOT drawn: I found no photograph of it in a battery
       position and could not confirm the brief's "from 1954" date (the Russian
       Wikipedia names SM-4-1 transportable mounts already in the 1930s).
     - Sizes: bore 130 mm, tube length 50 calibres = 6.5 m (rounded); shield
       and platform sizes are taken from the proportions of the Teriberka
       photographs (platform about 0.8 m over the pad, shield about 2.1 m
       tall, 3.1 m wide, 1.6 m deep) - measured by eye, NOT a published figure,
       so the shield is good to perhaps 10%.
   Not confirmed and so not drawn: any fire-control post or rangefinder (no
   photograph of that battery's one), unit markings, camouflage patterns
   (paint is a plain grey-green), an era difference between the 1950s and
   1980s batteries (the gun and its pads were the same).
   e90 NOT registered (check-and-fix): the B-13 is documented in fixed coastal
   service only "until the break-up of the USSR"; a search of ru.wikipedia (coastal
   troops, coastal artillery, B-13) found no source for manned fixed 130 mm batteries
   in the Russian Navy of the 1990s, so the 1990s show the shared casemate.
   Fire-control posts / rangefinders: no photograph at hand, so none drawn. The pad is
   drawn as photographed (Teriberka): a flat concrete slab with the gun's rail ring
   and straight low parapet walls open to the sea, not a round pad.

   WHAT THE COMPRESSION LEAVES OUT. A real battery has four guns 50-100 m apart
   with a command-and-rangefinder post, magazines, barracks and roads. Here:
   three guns on adjacent square pads about 8.4 m apart (the middle one is the
   "turret", trained onto targets; the other two are baked, pointing +X, the
   direction of the sea), each in its U parapet, with its flat-roofed ammunition
   shelter behind it and a stack of shells at the pad corner. The gun, shield and
   pad are at their true size; only the spacing is compressed.
   Model space: Z up, metres, ground z = 0, +X the way the guns point. One group
   named "turret". Owner colour: a small flat panel 2 cm above each shelter roof. */
(function () {
  "use strict";
  if (typeof BLD_MODELS === "undefined") { window.BLD_MODELS = {}; }

  function Acc(THREE, mat) { this.T = THREE; this.mat = mat; this.p = []; this.n = []; }
  Acc.prototype.add = function (geom, M) {
    const T = this.T;
    const g = geom.index ? geom.toNonIndexed() : geom;
    const pa = g.attributes.position, na = g.attributes.normal;
    const NM = new T.Matrix3().getNormalMatrix(M);
    const v = new T.Vector3();
    for (let i = 0; i < pa.count; i++) {
      v.fromBufferAttribute(pa, i).applyMatrix4(M);
      this.p.push(v.x, v.y, v.z);
      v.fromBufferAttribute(na, i).applyMatrix3(NM).normalize();
      this.n.push(v.x, v.y, v.z);
    }
    geom.dispose(); if (g !== geom) g.dispose();
  };
  Acc.prototype.mesh = function (name) {
    const T = this.T, g = new T.BufferGeometry();
    g.setAttribute("position", new T.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new T.Float32BufferAttribute(this.n, 3));
    const m = new T.Mesh(g, this.mat); m.name = name || ""; return m;
  };
  function mat(T, color, rough, metal) {
    return new T.MeshStandardMaterial({ color: color, roughness: rough, metalness: metal });
  }
  function frame(T, x, y) { return new T.Matrix4().makeTranslation(x, y, 0); }
  function bx(T, A, F, cx, cy, cz, sx, sy, sz, rz) {
    const L = new T.Matrix4().makeTranslation(cx, cy, cz);
    if (rz) L.multiply(new T.Matrix4().makeRotationZ(rz));
    A.add(new T.BoxGeometry(sx, sy, sz), F.clone().multiply(L));
  }
  function cyl(T, A, F, a, b, r0, r1, seg) {
    const va = new T.Vector3(a[0], a[1], a[2]), vb = new T.Vector3(b[0], b[1], b[2]);
    const d = vb.clone().sub(va), len = d.length();
    const q = new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), d.clone().normalize());
    const L = new T.Matrix4().compose(va.clone().add(vb).multiplyScalar(0.5), q, new T.Vector3(1, 1, 1));
    A.add(new T.CylinderGeometry(r1, r0, len, seg || 10), F.clone().multiply(L));
  }

  /* ---- the gun, in its own frame: pedestal axis at x = y = 0, pad top at z = 0 ---- */
  const PL = 0.8;                         // rotating platform height over the pad
  const ZT = PL + 0.95, ELEV = 0.12;      // trunnion height; rest elevation (rad)
  function buildPedestal(T, S, F) {
    cyl(T, S.K, F, [0, 0, 0], [0, 0, 0.12], 1.35, 1.35, 40);          // rail ring on the pad
    cyl(T, S.C, F, [0, 0, 0.12], [0, 0, PL - 0.1], 0.62, 0.5, 32);    // pedestal column
  }
  function buildGun(T, S, F) {
    const P = S.G, K = S.K;
    const ca = Math.cos(ELEV), sa = Math.sin(ELEV);
    const at = function (s, up) { return [0.1 + s * ca - (up || 0) * sa, 0, ZT + s * sa + (up || 0) * ca]; };
    /* turntable and the box shield: front plate, two side plates, flat roof, open back */
    cyl(T, P, F, [0, 0, PL - 0.1], [0, 0, PL], 1.35, 1.35, 40);
    const hw = 1.55, th = 0.06, top = PL + 2.1;
    bx(T, P, F, 0.6, 0, (PL + 0.2 + top) / 2, th, 2 * hw, top - PL - 0.2);           // front plate
    for (const s of [1, -1]) bx(T, P, F, -0.2, s * hw, (PL + 0.1 + top) / 2, 1.6, th, top - PL - 0.1);
    bx(T, P, F, -0.2, 0, top, 1.6, 2 * hw + th, th);                                 // roof
    /* cradle, recoil cylinders, breech and layers' hardware inside the shield */
    cyl(T, P, F, at(0.0), at(1.5), 0.30, 0.30, 20);
    cyl(T, P, F, at(-0.9), at(0.0), 0.22, 0.30, 16);                                  // breech ring
    bx(T, K, F, 0.1 - 0.7, 0, ZT + 0.05, 0.7, 0.5, 0.55);                              // breech block
    for (const s of [1, -1]) {
      const a = at(0.1, 0.0), b = at(1.6, 0.0); a[1] = b[1] = s * 0.26; a[2] += 0.16; b[2] += 0.16;
      cyl(T, P, F, a, b, 0.055, 0.055, 10);
      bx(T, K, F, -0.35, s * 0.85, PL + 0.28, 0.45, 0.4, 0.04);                       // layers' seats
      bx(T, K, F, -0.35, s * 0.85, PL + 0.14, 0.06, 0.06, 0.28);
    }
    cyl(T, K, F, [0.1, -0.55, ZT - 0.2], [0.1, -0.7, ZT - 0.2], 0.22, 0.22, 12);       // elevating handwheel
    /* tube: plain, tapering, thick muzzle collar (the SM-4-1 / B-13 tube) */
    cyl(T, P, F, at(0.0), at(2.0), 0.19, 0.16, 32);
    cyl(T, P, F, at(2.0), at(5.45), 0.16, 0.10, 32);
    cyl(T, P, F, at(5.45), at(5.75), 0.14, 0.14, 32);
  }

  /* ---- the pad: square slab, U parapet open to the sea, flat-roofed ammunition shelter ---- */
  const HP = 3.7, WT = 0.5, WH = 1.0;
  function buildPad(T, S, F) {
    bx(T, S.C, F, 0, 0, -0.03, 2 * HP, 2 * HP, 0.1);                     // slab surface (slightly above apron)
    bx(T, S.C, F, -HP + WT / 2 - 0.0, 0, WH / 2, WT, 2 * HP + 2 * WT, WH);        // rear wall
    for (const s of [1, -1]) bx(T, S.C, F, 0, s * (HP + WT / 2), WH / 2, 2 * HP, WT, WH);  // side walls
    /* ammunition shelter behind the rear wall: concrete box, flat roof, dark doorway on its sea side wall */
    const sx = -HP - WT - 1.35;
    bx(T, S.C, F, sx, 0, 0.9, 2.7, 3.2, 1.8);
    bx(T, S.R, F, sx, 0, 1.85, 3.0, 3.5, 0.1);                           // roof slab
    bx(T, S.D, F, sx + 1.36, 0, 0.8, 0.04, 1.2, 1.5);                    // door
    bx(T, S.Q, F, sx, 0.8, 1.92, 1.0, 0.7, 0.02);                        // team placard, 2 cm up
    /* a stack of 130 mm rounds at the pad's rear corner */
    for (let row = 0; row < 3; row++)
      for (let i = 0; i < 4 - row; i++)
        cyl(T, S.B, F, [-HP + 1.0 + row * 0.1, -2.6 + i * 0.21 + row * 0.105, 0.2 + row * 0.18], [-HP + 1.55 + row * 0.1, -2.6 + i * 0.21 + row * 0.105, 0.2 + row * 0.18], 0.065, 0.065, 8);
  }

  function makeSite() {
    return { build(THREE, M, C) {
      const T = THREE, g = new T.Group();
      const S = {
        C: new Acc(T, mat(T, 0x6b6e68, 0.93, 0.03)),
        R: new Acc(T, mat(T, 0x55584f, 0.93, 0.03)),
        G: new Acc(T, mat(T, 0x4f5844, 0.6, 0.35)),
        K: new Acc(T, mat(T, 0x25272a, 0.8, 0.2)),
        D: new Acc(T, mat(T, 0x14161a, 0.95, 0)),
        E: new Acc(T, mat(T, 0x6d6248, 0.95, 0.02)),
        B: new Acc(T, mat(T, 0x8a6f32, 0.5, 0.6)),
        Q: new Acc(T, mat(T, C.team, 0.8, 0.05))
      };
      const TT = { G: new Acc(T, S.G.mat), K: new Acc(T, S.K.mat) };
      const x0 = 1.05, pitch = 9.0;
      const spots = [[x0, 0, true], [x0 - 1.5, pitch, false], [x0 - 1.5, -pitch, false]];
      /* apron of packed rock and earth under the whole battery */
      S.E.add(new T.BoxGeometry(14.0, 27.0, 0.2), new T.Matrix4().makeTranslation(x0 - 3.2, 0, -0.11));
      for (const sp of spots) {
        const F = frame(T, sp[0], sp[1]);
        buildPad(T, S, F);
        buildPedestal(T, S, F);
        if (sp[2]) buildGun(T, { G: TT.G, K: TT.K }, new T.Matrix4());
        else buildGun(T, S, F);
      }
      for (const k of ["E", "C", "R", "G", "K", "D", "B", "Q"]) if (S[k].p.length) g.add(S[k].mesh(k));
      const t = new T.Group(); t.name = "turret";
      t.add(TT.G.mesh("tG")); t.add(TT.K.mesh("tK"));
      t.position.set(spots[0][0], spots[0][1], 0);
      g.add(t);
      g.userData.whole = true;
      return g;
    } };
  }
  const SITE = makeSite();
  for (const e of ["e50", "e60", "e80"]) BLD_MODELS["coastal_pact_" + e] = SITE;
})();
