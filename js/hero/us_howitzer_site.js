/* ===== us_howitzer_site.js - HERO model: the US dug-in 155 mm gun battery ======
   BUILDINGS id "arty" ("Fixed 155mm battery"), side "nato" (= the United
   States). It replaces the shared model (one barrel with a long brake on a
   concrete disc, three shells piled beside it) for every period in which the
   US Army / Marine Corps had a TOWED 155 mm howitzer to put in a gun pit:

       key               period       gun           why (sources below)
       arty_nato_e50     1950s        M114 (M1)     the US 155 mm of the Korean war: the "155 mm Howitzer M1",
                                                     produced 1941-53, re-designated M114 in 1962
       arty_nato_e60     1960s        M114 / M114A1 the Vietnam firebase gun (Marine M114 in a sandbagged
                                                     pit at Khe Sanh, 1968); the M1A1 carriage differs
                                                     in details a game-zoom view cannot show
       arty_nato_e80     1980s        M198          in service 1979 (Wikipedia: "1979-present"),
       arty_nato_e90     1990s        M198          replacing the M114; same gun in both periods
       arty_nato_e00     2005-2010    M777          fielded from May 2005 (3rd Bn 11th Marines first),
       arty_nato_e20     present      M777          581 to the Marines, 421 to the Army: the whole US fleet

   Not registered: nothing - every US period has a gun. (The 1950s battery is
   the same M114 as the 1960s one; the shared model is not the US's gun, so
   it is not left showing there.)

   References (Wikimedia Commons / Wikipedia, cached in the builder's
   ushow_ref folder):
     - "M114 155 mm howitzer (M1A2), Faxon Veterans Memorial Park" (DSC01800):
       olive drab, split box trails, one big single-tyre wheel each side, a
       plain tube with NO muzzle brake, recoil cylinders above the tube, a
       handwheel and sight on the left of the cradle, no gun shield.
     - "Marines of Battery W, 1st Bn 13th Marines load an M114 howitzer at
       Khe Sanh" (1968): the gun standing in a pit cut into the ground, a
       sandbag-faced parapet and a heap of earth behind it, a trail beam
       lying over the pit floor.
     - "M198 close-up" (Marines in Iraq, 2003) and "Firing an M198 155mm
       howitzer at FOB Boris, Paktika" (US Army, Afghanistan): the big
       cradle with the long double-baffle muzzle brake, two cylinders along
       the tube, the round wheel with the huge tyre, the trail box beams
       with their lunette end, and behind the gun a wall of HESCO bastion
       cells (tan fabric, wire mesh) - the Army's gun there is dark green.
     - "M777 Howitzer Test Firing" and "M777 howitzer rear": a low carriage
       with small wheels, a dark grey-green finish, long box trails ending in
       spades, the baseplate under the carriage, two recoil cylinders along
       the tube and the digital fire-control box at the left of the breech.
     - Wikipedia figures, M114: tube overall 3.79 m (L/24.5), travel length
       7.315 m, width 2.438 m, height 1.8 m, elevation -2/+63 deg; M198: 7,154
       kg, combat length 11 m (travel 12.3 m), tube 6.09 m (L/39), width 2.8
       m, height 2.9 m, elevation -5/+72 deg; M777: 4.2 t, combat length
       10.7 m (travel 9.5 m), elevation 0/+71.7 deg.

   Equipment is at true size (each gun's trails and tube are set so the
   combat length matches its published figure: M114 about 7.8 m, M198 11 m,
   M777 10.7 m; wheel track and tyre sizes follow the published widths).
     - Check-and-fix pass: "An M198 155 mm Howitzer protects a US Marine
       Corps encampment near Beirut" (DPLA / US Marine Corps, Lebanon,
       1982-84 deployment) and an M198 on a ribbon bridge in "Team Spirit
       '88" (DPLA): both show the 1980s gun in plain dark olive green with
       no camouflage pattern on the gun (the Beirut one has a sandbag wall
       behind it). The 1980s-90s M198 is therefore painted olive green.
       The M777 colour (a dusty mid green, no pattern) is from the Marine
       "M777 howitzer rear" photograph.
   What I could NOT confirm and so did not draw: a MERDC / NATO three-tone
   pattern on the M198 (no 1980s photograph found shows one on the gun; the
   1990s paint is taken as the same olive green) and any other pattern; wheel sizes of the M777 (taken from
   proportions in the photographs, not a figure); the exact trail spread.

   WHAT THE COMPRESSION LEAVES OUT. A real firing battery is six guns on a
   200 m front with its fire-direction centre, vehicles and a service
   battery. Here: three guns in an echelon (the middle one is the "turret",
   trained onto targets; the two flanking guns are baked and point +X, the
   direction the battery fires at rest), each in its own horseshoe pit open to
   the front, with an ammunition bay behind it (stacked crates, propellant
   canisters, a shell pile on pallets) - the layout photographs of firebases
   show. Each pit is a U-shaped parapet sized so the gun's split trails
   and spades lie INSIDE it (inner half-width = trail spread + 0.9 m, inner
   rear = spade end - 0.9 m, as photographs of emplaced guns show); the pits
   stand edge to edge, far closer than a real battery's guns (30-40 m apart), and no fire-direction centre, wire,
   trucks or crew are drawn.
   PERIOD STRUCTURE: earth parapet faced with sandbags for the 1950s-90s (the
   Khe Sanh photograph, 1968, is the only one I could fetch for it: the same
   build in 1950s and 1980s-90s is my extrapolation); HESCO bastion cells
   for the 2005 and later periods (FOB Boris photograph).

   Model space: Z up, metres, ground at z = 0, +X the way the guns point.
   One group named "turret" (the middle gun), everything else baked and
   merged per material: 7 materials, 9 meshes, about 4,900-5,200 triangles. Owner colour: only small flat
   panels 2 cm above the ammunition-bay crate lids. */
(function () {
  "use strict";
  if (typeof BLD_MODELS === "undefined") { window.BLD_MODELS = {}; }

  /* ---- merged geometry batches ---- */
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

  /* ---- placement helpers; F is the frame (gun origin) matrix ---- */
  function frame(T, x, y, rz) {
    return new T.Matrix4().makeTranslation(x, y, 0).multiply(new T.Matrix4().makeRotationZ(rz || 0));
  }
  function bx(T, A, F, cx, cy, cz, sx, sy, sz, rz) {
    const L = new T.Matrix4().makeTranslation(cx, cy, cz);
    if (rz) L.multiply(new T.Matrix4().makeRotationZ(rz));
    A.add(new T.BoxGeometry(sx, sy, sz), F.clone().multiply(L));
  }
  /* cylinder / cone between two local points */
  function cyl(T, A, F, a, b, r0, r1, seg) {
    const va = new T.Vector3(a[0], a[1], a[2]), vb = new T.Vector3(b[0], b[1], b[2]);
    const d = vb.clone().sub(va), len = d.length();
    const q = new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), d.clone().normalize());
    const L = new T.Matrix4().compose(va.clone().add(vb).multiplyScalar(0.5), q, new T.Vector3(1, 1, 1));
    A.add(new T.CylinderGeometry(r1, r0, len, seg || 10), F.clone().multiply(L));
  }
  /* oriented beam: width w across (horizontal), height h */
  function beam(T, A, F, a, b, w, h) {
    const va = new T.Vector3(a[0], a[1], a[2]), vb = new T.Vector3(b[0], b[1], b[2]);
    const d = vb.clone().sub(va), len = d.length(), X = d.clone().normalize();
    const Y = new T.Vector3(0, 0, 1).cross(X).normalize(), Z = X.clone().cross(Y);
    const L = new T.Matrix4().makeBasis(X, Y, Z).setPosition(va.clone().add(vb).multiplyScalar(0.5));
    A.add(new T.BoxGeometry(len, w, h), F.clone().multiply(L));
  }
  function wheel(T, A, Ad, F, x, y, z, r, w) {
    cyl(T, A, F, [x, y - w / 2, z], [x, y + w / 2, z], r, r, 28);          // tyre
    cyl(T, Ad, F, [x, y - w / 2 - 0.01, z], [x, y + w / 2 + 0.01, z], r * 0.52, r * 0.52, 20); // rim
  }

  /* ---- the three guns. All in the gun's own frame: axle at x = 0,
     tube along +X, trails to -X, ground z = 0. P = paint, K = dark/rubber ---- */
  const GUNS = {
    m114: {
      tyreR: 0.52, tyreW: 0.30, track: 1.14, trunX: 0.35, trunZ: 1.25, elev: 0.17,
      tube: [-0.75, 3.04], r0: 0.17, r1: 0.10, brake: 0,
      trailEnd: -4.45, trailY: 1.45, trailW: 0.22, trailH: 0.34, frontZ: 0.56,
      pitR: 4.3, bay: 0
    },
    m198: {
      tyreR: 0.59, tyreW: 0.38, track: 1.22, trunX: 0.55, trunZ: 1.60, elev: 0.21,
      tube: [-1.15, 5.15], r0: 0.22, r1: 0.11, brake: 0.55,
      trailEnd: -5.40, trailY: 1.90, trailW: 0.32, trailH: 0.42, frontZ: 0.78,
      pitR: 5.4, bay: 1
    },
    m777: {
      tyreR: 0.50, tyreW: 0.30, track: 1.25, trunX: 0.50, trunZ: 1.35, elev: 0.22,
      tube: [-0.90, 5.00], r0: 0.20, r1: 0.105, brake: 0.50,
      trailEnd: -5.30, trailY: 1.75, trailW: 0.30, trailH: 0.36, frontZ: 0.70,
      pitR: 5.4, bay: 2
    }
  };

  function buildGun(T, S, F, G) {
    const P = S.P, K = S.K, ca = Math.cos(G.elev), sa = Math.sin(G.elev);
    const tx = G.trunX, tz = G.trunZ;
    const at = function (s, up) { return [tx + s * ca - (up || 0) * sa, 0, tz + s * sa + (up || 0) * ca]; };
    /* wheels and axle */
    for (const s of [1, -1]) wheel(T, K, K, F, 0, s * G.track, G.tyreR, G.tyreR, G.tyreW);
    cyl(T, P, F, [0, -G.track, G.tyreR], [0, G.track, G.tyreR], 0.07, 0.07, 8);
    /* carriage body over the axle and the cradle trunnion housing */
    bx(T, P, F, tx - 0.1, 0, (G.tyreR + tz) / 2, 0.9, 1.1, tz - G.tyreR + 0.35);
    for (const s of [1, -1]) bx(T, P, F, tx, s * 0.55, tz - 0.12, 0.45, 0.14, 0.7);
    /* tube */
    cyl(T, P, F, at(G.tube[0]), at(G.tube[0] + 0.9), G.r0, G.r0, 20);        // breech ring
    cyl(T, P, F, at(G.tube[0] + 0.9), at(G.tube[1]), G.r0 * 0.9, G.r1, 20);
    if (G.brake > 0)
      cyl(T, K, F, at(G.tube[1]), at(G.tube[1] + G.brake), G.r1 * 1.75, G.r1 * 1.75, 20);
    /* cradle sleeve, recoil cylinders above, balance cylinders beside */
    cyl(T, P, F, at(0.1), at(1.9), G.r0 * 1.5, G.r0 * 1.5, 24);
    for (const s of [1, -1]) {
      cyl(T, P, F, at(0.0, 0.0 + 0), at(2.3), 0.055, 0.055, 10);
      const o = at(0.2, 0); o[1] = s * 0.30;
      const e = at(1.9, 0); e[1] = s * 0.30; e[2] += 0.1;
      cyl(T, P, F, o, e, 0.075, 0.075, 12);
    }
    for (const s of [1, -1]) {
      const a = at(0.2, G.r0 * 1.6), b = at(1.9, G.r0 * 1.6); a[1] = b[1] = s * 0.14;
      cyl(T, P, F, a, b, 0.06, 0.06, 10);
    }
    /* handwheel and sight on the left of the cradle */
    cyl(T, K, F, [tx, 0.62, tz - 0.1], [tx, 0.7, tz - 0.1], 0.2, 0.2, 10);
    bx(T, K, F, tx + 0.15, 0.45, tz + 0.25, 0.3, 0.2, 0.2);
    /* split trails: box beams from under the carriage to the spades */
    for (const s of [1, -1]) {
      const a = [-0.55, s * 0.28, G.frontZ], b = [G.trailEnd, s * G.trailY, 0.18];
      beam(T, P, F, a, b, G.trailW, G.trailH);
      bx(T, K, F, G.trailEnd - 0.05, s * G.trailY, 0.2, 0.18, 0.42, 0.5);   // spade plate
    }
    /* the M777's baseplate under the carriage and its fire-control box */
    if (G.bay === 2) {
      bx(T, K, F, 0.55, 0, 0.06, 1.3, 1.0, 0.12);
      bx(T, K, F, tx - 0.4, 0.55, tz + 0.45, 0.5, 0.35, 0.35);
    }
    /* the M198's firing pedestal */
    if (G.bay === 1) bx(T, K, F, 0.2, 0, 0.1, 0.9, 0.9, 0.2);
  }

  /* ---- the pit: a U-shaped parapet open to the front, sized so the split
     trails and spades lie INSIDE it (inner half-width = trail spread + 0.9 m,
     inner rear = spade end - 0.9 m), plus an ammunition bay behind ---- */
  function pitDims(G) { return { wp: G.trailY + 0.9, rear: G.trailEnd - 0.9, front: 1.6 }; }
  function wallSeg(T, A, F, x0, y0, x1, y1, th, hgt) {
    const dx = x1 - x0, dy = y1 - y0, len = Math.sqrt(dx * dx + dy * dy);
    bx(T, A, F, (x0 + x1) / 2, (y0 + y1) / 2, hgt / 2, len, th, hgt, Math.atan2(dy, dx));
  }
  function buildPit(T, S, F, G, hesco) {
    const D = pitDims(G), th = hesco ? 1.06 : 1.5;
    const wall = hesco ? S.H : S.E, hgt = hesco ? 1.35 : 1.05;
    const c = th / 2, ch = 1.2;                       // wall centre offset, corner chamfer
    const yw = D.wp + c, xr = D.rear - c;
    /* centre-line polygon: front-left, back-left corner, back-right corner, front-right */
    const pts = [[D.front, yw], [xr + ch, yw], [xr, yw - ch], [xr, -yw + ch], [xr + ch, -yw], [D.front, -yw]];
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i], q = pts[i + 1];
      wallSeg(T, wall, F, p[0], p[1], q[0], q[1], th, hgt);
      if (!hesco) {
        /* sandbag course along the inner face, and a bag course on the crest */
        const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.sqrt(dx * dx + dy * dy);
        const off = c - 0.2;
        let mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
        if (i === 0) my -= off; else if (i === 4) my += off; else if (i === 2) mx += off;
        else if (i === 1) { mx += off * 0.7; my -= off * 0.7; } else { mx += off * 0.7; my += off * 0.7; }
        const ang = Math.atan2(dy, dx);
        bx(T, S.B, F, mx, my, 0.55, L * 0.97, 0.5, 1.1, ang);
        bx(T, S.B, F, (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, hgt + 0.2, L * 0.9, 0.9, 0.4, ang);
      }
    }
    /* ammunition bay behind the pit: three sandbag or HESCO walls, open to the gun */
    const bxl = D.rear - th - 1.9;
    const bw = hesco ? S.H : S.B, bh = hesco ? 1.35 : 1.25;
    bx(T, bw, F, bxl - 1.4, 0, bh / 2, 0.9, 3.2, bh);
    for (const s of [1, -1]) bx(T, bw, F, bxl, s * 1.45, bh / 2, 2.8, 0.9, bh);
    /* crates, propellant canisters and the shell pile inside the bay */
    for (let i = 0; i < 3; i++) bx(T, S.W, F, bxl - 0.5, -0.9 + i * 0.9, 0.3, 1.2, 0.8, 0.6);
    bx(T, S.W, F, bxl + 0.5, -0.5, 0.3, 1.2, 0.8, 0.6);
    return bxl;
  }
  function shellPile(T, S, F, x, y) {
    let n = 0;
    for (let row = 0; row < 3; row++)
      for (let i = 0; i < 3 - row; i++, n++)
        cyl(T, S.R, F, [x + i * 0.34 + row * 0.17, y - 0.5, 0.18 + row * 0.3], [x + i * 0.34 + row * 0.17, y + 0.5, 0.18 + row * 0.3], 0.155, 0.155, 12);
  }

  function makeSite(kind, paint, hesco) {
    return { build(THREE, M, C) {
      const T = THREE, g = new T.Group();
      const G = GUNS[kind];
      const S = {
        P: new Acc(T, mat(T, paint, 0.6, 0.35)),
        K: new Acc(T, mat(T, 0x242622, 0.8, 0.2)),
        E: new Acc(T, mat(T, 0x6d6248, 0.95, 0.02)),
        B: new Acc(T, mat(T, 0x8a7d5c, 0.95, 0.02)),
        H: new Acc(T, mat(T, 0xa8977a, 0.95, 0.02)),
        W: new Acc(T, mat(T, 0x5a5a3c, 0.85, 0.1)),
        R: new Acc(T, mat(T, 0x8a6f32, 0.5, 0.6)),
        Q: new Acc(T, mat(T, C.team, 0.8, 0.05))
      };
      /* the middle gun (turret) has its own batches, sharing the materials */
      const TT = { P: new Acc(T, S.P.mat), K: new Acc(T, S.K.mat) };
      /* layout: the pits are placed edge to edge (0.5 m gap); the middle gun (the
         turret) leads, the flanking two stand 3.5 m behind it (echelon) */
      const Dm = pitDims(G), thk = hesco ? 1.06 : 1.5;
      const pitch = 2 * (Dm.wp + thk) + 0.5, ech = 3.5;
      const minx = Dm.rear - thk - 3.75, t0 = -(Dm.front + minx - ech) / 2, fx = t0 - ech;
      const spots = [[t0, 0, true], [fx, pitch, false], [fx, -pitch, false]];
      const xa = fx + minx - 0.6, xb = t0 + Dm.front + 1.2;
      const PLW = xb - xa, PLC = (xa + xb) / 2, PLY = 2 * pitch + 2 * (Dm.wp + thk) + 1.0;
      /* floor of the battery: dark trodden earth under the pits */
      for (const sp of spots) {
        const F = frame(T, sp[0], sp[1], 0);
        const bxl = buildPit(T, S, F, G, hesco);
        shellPile(T, S, F, bxl - 1.0, 0.0);
        /* team placard on the first crate lid, 2 cm up */
        bx(T, S.Q, F, bxl - 0.5, -0.9, 0.62, 0.7, 0.5, 0.02);
        if (sp[2]) {
          buildGun(T, { P: TT.P, K: TT.K }, new T.Matrix4(), G);
        } else buildGun(T, S, F, G);
      }
      /* plinth: one packed-earth apron under the whole battery */
      S.E.add(new T.BoxGeometry(PLW, PLY, 0.1), new T.Matrix4().makeTranslation(PLC, 0, 0.0));
      for (const k of ["E", "B", "H", "W", "R", "Q", "K", "P"]) if (S[k].p.length) g.add(S[k].mesh(k));
      const t = new T.Group(); t.name = "turret";
      t.add(TT.P.mesh("tP")); t.add(TT.K.mesh("tK"));
      t.position.set(spots[0][0], spots[0][1], 0);
      g.add(t);
      g.userData.whole = true;
      return g;
    } };
  }

  /* paint from the photographs: M114 olive drab; M198 olive green (Beirut 1983
     and Team Spirit '88 photographs), 1990s the same; M777 dusty mid green */
  const A = makeSite("m114", 0x4b4f34, false);
  BLD_MODELS["arty_nato_e50"] = A;
  BLD_MODELS["arty_nato_e60"] = A;
  const B = makeSite("m198", 0x464a30, false);
  BLD_MODELS["arty_nato_e80"] = B;
  BLD_MODELS["arty_nato_e90"] = B;
  const D = makeSite("m777", 0x58604a, true);
  BLD_MODELS["arty_nato_e00"] = D;
  BLD_MODELS["arty_nato_e20"] = D;
})();
