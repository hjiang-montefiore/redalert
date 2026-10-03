/* ===== us_aa_site.js - HERO model: the United States' AA gun battery position =====
   BUILDINGS id "flak" (shared model: a radar-directed twin 40 mm behind blast
   walls, which the US never emplaced), side "nato" = the United States. One
   build per system; build(THREE, M, C) is the game's entry and
   HeroUsAaSite.build(THREE, C, system, era) takes the system by name.

   KEYS REGISTERED (every US period has a gun battery position of its own)
     flak_nato_e50  "m1a1_90"  90 mm gun M1A1/M2, four guns and an SCR-584 type
                    radar van. The Army's Anti-Aircraft Command ringed US
                    cities with them in the early 1950s; "normally operated in
                    groups of four, controlled by the M7 or M9 gun director ...
                    SCR-584 microwave radar"; "phased out in the middle 1950s"
                    by Nike (Wikipedia "90 mm gun M1/M2/M3").
     flak_nato_e60  "vads"     M167 Vulcan Air Defense System, towed 20 mm
     flak_nato_e80             six-barrel M168 on the M42A1 carriage. Service
     flak_nato_e90             "1965-1994 (United States)", first production
                    guns delivered 1967, replaced from 1994 by Avenger
                    (Wikipedia "M167 VADS"); "used to protect U.S. Air Force
                    warplane airfields and U.S. Army helicopter airfields".
                    The 82nd Airborne Division Museum placard (Fort Bragg,
                    Commons "M-167 Vulcan Cannon (10469897634)"): "saw service
                    with the 82nd Airborne Division from 1970 to 1994 ... fired
                    on enemy aircraft in Iraq during the Persian Gulf War".
     flak_nato_e00  "lpws"     Land-based Phalanx Weapon System, the gun of
     flak_nato_e20             the Army's C-RAM: "a modified Phalanx 1B CIWS,
                    powered by an attached generator and mounted on a trailer";
                    deployment to Iraq from 2005, more than 20 systems at
                    CENTCOM bases in 2008, 23 more ordered that year
                    (Wikipedia "Phalanx CIWS", section Centurion C-RAM); firing
                    at Kabul airport in August 2021 and photographed in 2025
                    (Commons photographs below). Same equipment both
                    periods: nothing visible in the photographs differs.

   ---------------------------------------------------------------- C-RAM (e00, e20)
   ONE mount: every photograph of an emplaced Land Phalanx shows one mount
   per position (no photograph found shows two together). What each element
   rests on (US Army / DoD photographs on Wikimedia Commons, Wikipedia):
     [A] "161013-A-UE529-001 - C-RAM Fire" (2016): the tan mount close up -
         the two tapered tan cheeks of the barbette with bolted hatches and
         U-shaped grab rungs up their front faces, the broad round train base,
         the grey truss cradle with the black M61A1 barrel cluster (a thick
         ribbed muzzle clamp), the grey ammunition drum under the gun with a
         loop of linked rounds at its front, the white radome cylinder with
         stiffening ribs on its lower part, a seam band and a handrail across
         its front, the flattened dome; on the radome's left side a bracket
         carrying the FLIR (a box with a round lens, facing the gun's way)
         above a larger box angled forward and down.
     [B] "Land Phalanx Weapon System Crew Optimizes Defense Capabilities"
         (9229733, 9229738; US Army, 8 July 2025): the same tan mount on its
         tan trailer; seen from behind, the drum's round end low between the
         cheeks, the cradle box over it and the radome on the cheek tops;
         two generator sets in green / brown / black camouflage beside it, a
         canvas-covered crate, tan concrete T-walls behind, a sandbag wall.
     [C] "C-RAM side image" (a Commons user's schematic of the LPWS - used
         for the trailer layout only) and "C-RAM 3" (US Government photograph,
         Air Defense Artillery magazine, June 2005: an early grey system on
         its trailer), which agree: a drop-deck
         semitrailer - gooseneck with two boxes on it and its landing legs
         lowered to the ground, the low deck carrying a tall equipment
         cabinet, a small box, then the mount on its own panelled base box,
         the rear deck over two axles carrying a generator (grille on its
         side) and a low cabinet at the tail; stake pockets along the side.
     [D] "C-RAM at Kabul Airport August 2021" and "Fortifying Defenses ... at
         Al-Tanf Garrison" (8976679, 28 March 2025): the tan mount on its trailer beside a
         power box, a row of concrete barriers / T-walls next to it.
     [E] Figures: Phalanx height 15.5 ft (4.7 m), elevation -25 to +85 deg,
         1,550-round drum, Ku-band search and track radars in the radome
         (search antenna at the top, track antenna below) (Wikipedia "Phalanx
         CIWS"); T-wall "twelve-foot-tall (3.66 m)" with a "rectangular ledge
         base ... approximately knee-high" (Wikipedia "Bremer wall").
   Sizes: mount 4.7 m from the base flange to the dome top [E]; the parts in
   the proportions measured on [B] 9229733 (radome 1.32 m across = 1/3.55 of
   the mount height; cheeks 1.9 m; train base 2.6 m across; drum 0.84 m) and
   [A]. Trailer (about 14.2 m, 2.6 m wide) and its boxes measured on drawing
   [C] scaled by its tyres (taken as 1.0 m - an estimate, not a figure) and
   checked against the mount; deck heights between [C] and "C-RAM 3".
   NOT DRAWN (no photograph found): ammunition containers (the canvas-covered
   crate of [B] is drawn covered, contents unknown), the FAAD C2 / fire-
   control shelter, any counter-battery or sense radar (no photograph shows
   one with a mount), HESCO (the photographs show T-walls), side outrigger
   jacks (only the gooseneck landing legs are photographed lowered), the
   Al-Tanf sun canopy (one site only).
   Layout (compressed): the trailer along the plot, gun trained +X; the
   generators, crate and sandbag wall between it and a T-wall run behind it
   that returns at both ends (the run is from the photographs, the U plan is
   the layout's). Gun elevated 12 deg; the mount trains as "turret".

   --------------------------------------------------------------- M167 (e60-e90)
   Rests on "M167 Vulcan Air Defense System (VADS)", "M-167 Vulcan Cannon
   (10469897634)" (82nd Airborne museum, three-colour paint) and "20mmVADS 2"
   (JASDF): two-wheeled carriage with a drawbar leg forward and a trail leg
   aft, each on a jack foot; the turret on a ring pedestal: the long ribbed
   ammunition box (500 linked rounds, Wikipedia) on the right, the M168
   with its six barrels on the left, the operator's seat and sight between,
   and the range-only radar (a drum on a short post at the right rear).
   Sizes: emplaced length 386.1 cm, travel 472.4 cm, 1,583 kg (Wikipedia);
   wheel, box and height from "20mmVADS 2" (top of the radar about 2.0 m).
   No photograph of a US M167 in a dug-in or sandbagged position was found,
   so the guns stand on plain gravel hardstandings (minimal), three guns
   10-17 m apart (a real section is spread over an airfield). 1960s-70s
   olive drab; 1980s-90s olive with brown / black patches on the ammunition
   box as on the 82nd Airborne museum gun.

   ------------------------------------------------------------- 90 mm (e50)
   Rests on "M1A1 90mm Anti-Aircraft Gun" (Commons): twelve-sided perforated
   platform about three times the turntable's width, four box-beam outriggers
   reaching beyond it, turntable, carriage, the 4.6 m tube (Wikipedia: 50
   calibres, 15 ft) with the recoil cylinder under it, the fuze-setter box on
   the carriage side; and "SCR-584 radar, main system" (National Electronics
   Museum): a closed van with a roof-mounted perforated pale dish about 6 ft
   (1.83 m) across. Four guns around the van; the fixed concrete mounts of
   permanent sites are not drawn (no photograph found); the M33 successor of
   the SCR-584 was not found photographed, the SCR-584 type is drawn.

   Team colour (C.team): two small placards lifted 2 cm (a cabinet door and
   the mount base box; one on each gun-site radar van / ammunition box). No
   insignia, numbers or markings. root.userData.whole = true. */
if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroUsAaSite = (function () {
  "use strict";
  var DEG = Math.PI / 180;

  function build(THREE, C, system, era) {
    var teamCol = (C && C.team !== undefined) ? C.team : 0x4b8fe0;
    var cram = system === "lpws";
    var P = cram ? {
      conc:  [0x8b836d, 0.95, 0.02],   // dusty gravel apron
      body:  [0xb19d76, 0.80, 0.10],   // desert tan (mount, trailer)
      steel: [0x8d9297, 0.55, 0.45],   // grey cradle, drum, FLIR bracket
      dark:  [0x2a2d30, 0.70, 0.35],   // gun, tyres, grilles
      white: [0xd9dbd7, 0.50, 0.15],   // radome
      gen:   [0x56603f, 0.85, 0.10],   // generator camouflage green
      genb:  [0x5c4a34, 0.85, 0.10],   // camouflage brown, linked rounds
      twall: [0xbcae8e, 0.95, 0.02],   // T-wall concrete
      bag:   [0x9c8964, 0.95, 0.02],   // sandbags, canvas
      team:  [teamCol, 0.60, 0.10]
    } : {
      conc:  [0x5f625c, 0.92, 0.04],
      conc2: [0x4c4f4a, 0.92, 0.04],
      body:  [system === "vads" ? 0x4a5038 : 0x4f5844, 0.80, 0.12],
      steel: [0x6f757a, 0.50, 0.55],
      dark:  [0x2c3035, 0.70, 0.40],
      white: [0xcfc8a8, 0.50, 0.20],   // SCR-584 dish
      genb:  [0x5c4a34, 0.85, 0.10],   // M167 1980s-90s brown patches
      team:  [teamCol, 0.60, 0.10]
    };
    var mats = {};
    function mat(k) {
      if (!mats[k]) {
        mats[k] = new THREE.MeshStandardMaterial({ color: P[k][0], roughness: P[k][1], metalness: P[k][2] });
        if (k === "white" && !cram) mats[k].side = THREE.DoubleSide;   // the open SCR-584 dish
      }
      return mats[k];
    }

    /* ---- accumulator: transformed non-indexed triangles (with normals) per material ---- */
    function Acc() { this.p = {}; this.n = {}; }
    Acc.prototype.add = function (mk, geom, m) {
      var g = geom.index ? geom.toNonIndexed() : geom;
      if (g !== geom) geom.dispose();
      if (!g.attributes.normal) g.computeVertexNormals();
      g.applyMatrix4(m);
      (this.p[mk] = this.p[mk] || []).push(g.attributes.position.array);
      (this.n[mk] = this.n[mk] || []).push(g.attributes.normal.array);
      g.dispose();
    };
    Acc.prototype.into = function (grp) {
      var self = this;
      Object.keys(this.p).forEach(function (mk) {
        function cat(list) {
          var n = 0; list.forEach(function (a) { n += a.length; });
          var all = new Float32Array(n), o = 0;
          list.forEach(function (a) { all.set(a, o); o += a.length; });
          return all;
        }
        var bg = new THREE.BufferGeometry();
        bg.setAttribute("position", new THREE.BufferAttribute(cat(self.p[mk]), 3));
        bg.setAttribute("normal", new THREE.BufferAttribute(cat(self.n[mk]), 3));
        bg.computeBoundingSphere();
        grp.add(new THREE.Mesh(bg, mat(mk)));
      });
    };
    function T(x, y, z) { return new THREE.Matrix4().makeTranslation(x, y, z); }
    function Rx(a) { return new THREE.Matrix4().makeRotationX(a); }
    function Ry(a) { return new THREE.Matrix4().makeRotationY(a); }
    function Rz(a) { return new THREE.Matrix4().makeRotationZ(a); }
    function mul() {
      var m = new THREE.Matrix4();
      for (var i = 0; i < arguments.length; i++) m.multiply(arguments[i]);
      return m;
    }
    var I = new THREE.Matrix4();
    /* box w(x) d(y) h(z), bottom face at z, centred on x,y, in frame F */
    function box(A, mk, F, w, d, h, x, y, z) {
      A.add(mk, new THREE.BoxGeometry(w, d, h), mul(F, T(x, y, z + h / 2)));
    }
    /* box centred on x,y,z */
    function boxc(A, mk, F, w, d, h, x, y, z) {
      A.add(mk, new THREE.BoxGeometry(w, d, h), mul(F, T(x, y, z)));
    }
    /* vertical cylinder, bottom at z, radius r1 at the bottom and r2 at the top */
    function cylZ(A, mk, F, r1, r2, h, x, y, z, seg, open) {
      var g = new THREE.CylinderGeometry(r2, r1, h, seg || 14, 1, !!open);
      g.rotateX(Math.PI / 2);
      A.add(mk, g, mul(F, T(x, y, z + h / 2)));
    }
    /* cylinder along local X from x0 to x1 (x0 < x1; r0 at x0, r1 at x1) */
    function cylX(A, mk, F, r0, r1, x0, x1, y, z, seg) {
      var g = new THREE.CylinderGeometry(r1, r0, x1 - x0, seg || 10);
      g.rotateZ(-Math.PI / 2);
      A.add(mk, g, mul(F, T((x0 + x1) / 2, y, z)));
    }
    /* cylinder along local Y, centred */
    function cylY(A, mk, F, r, len, x, y, z, seg) {
      A.add(mk, new THREE.CylinderGeometry(r, r, len, seg || 12), mul(F, T(x, y, z)));
    }
    /* straight member from a to b: square section of side 2r, or round (seg) */
    function strut(A, mk, F, a, b, r, seg) {
      var va = new THREE.Vector3(a[0], a[1], a[2]), vb = new THREE.Vector3(b[0], b[1], b[2]);
      var d = vb.clone().sub(va), L = d.length();
      var g = seg ? new THREE.CylinderGeometry(r, r, L, seg) : new THREE.BoxGeometry(2 * r, L, 2 * r);
      var q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
      var m = new THREE.Matrix4().compose(va.clone().add(vb).multiplyScalar(0.5), q, new THREE.Vector3(1, 1, 1));
      A.add(mk, g, mul(F, m));
    }
    /* hexahedron from 8 corners: b0 (x0,y0) b1 (x1,y0) b2 (x1,y1) b3 (x0,y1) at the
       bottom, t0..t3 above them - faces wound outward */
    function hexa(A, mk, F, c) {
      var b0 = c[0], b1 = c[1], b2 = c[2], b3 = c[3], t0 = c[4], t1 = c[5], t2 = c[6], t3 = c[7];
      var tri = [b0, b2, b1, b0, b3, b2, t0, t1, t2, t0, t2, t3, b0, b1, t1, b0, t1, t0,
                 b1, b2, t2, b1, t2, t1, b2, b3, t3, b2, t3, t2, b3, b0, t0, b3, t0, t3];
      var arr = new Float32Array(tri.length * 3);
      tri.forEach(function (p, i) { arr[i * 3] = p[0]; arr[i * 3 + 1] = p[1]; arr[i * 3 + 2] = p[2]; });
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      g.computeVertexNormals();
      A.add(mk, g, F);
    }
    /* tapered block: bottom rectangle B = [x0,x1,y0,y1] at z0, top rectangle Tp at z1 */
    function frustum(A, mk, F, B, Tp, z0, z1) {
      hexa(A, mk, F, [[B[0], B[2], z0], [B[1], B[2], z0], [B[1], B[3], z0], [B[0], B[3], z0],
                      [Tp[0], Tp[2], z1], [Tp[1], Tp[2], z1], [Tp[1], Tp[3], z1], [Tp[0], Tp[3], z1]]);
    }
    /* flat paint patch (single-sided) centred at x,y,z facing axis "x+", "x-",
       "y-" or "z+", spun in its plane by spin */
    function decal(A, mk, F, w, h, x, y, z, axis, spin) {
      var g = new THREE.PlaneGeometry(w, h);
      g.rotateZ(spin || 0);
      if (axis === "x+") g.rotateY(Math.PI / 2);
      else if (axis === "x-") g.rotateY(-Math.PI / 2);
      else if (axis === "y-") g.rotateX(Math.PI / 2);
      A.add(mk, g, mul(F, T(x, y, z)));
    }
    /* dish opening toward +X, rim centre (x,y,z), tilted up by tilt */
    function dish(A, mk, F, dia, dep, x, y, z, tilt) {
      var R = ((dia / 2) * (dia / 2) + dep * dep) / (2 * dep);
      var th = Math.asin((dia / 2) / R);
      var g = new THREE.SphereGeometry(R, 22, 6, 0, Math.PI * 2, 0, th);
      g.rotateZ(Math.PI / 2);
      A.add(mk, g, mul(F, T(x, y, z), Ry(-tilt), T(R - dep, 0, 0)));
    }

    /* ======================= 90 mm M1A1 on its platform ======================= */
    function gun90(S, Tu, F, e) {
      var arm = 3.1;                                                   // outriggers reach past the platform
      [0, Math.PI / 2].forEach(function (a) {
        box(S, "body", mul(F, Rz(a)), 2 * arm, 0.42, 0.38, 0, 0, 0.0);
      });
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {      // jack feet
        box(S, "steel", F, 0.5, 0.5, 0.12, d[0] * (arm - 0.1), d[1] * (arm - 0.1), 0);
      });
      cylZ(S, "body", F, 2.1, 2.1, 0.1, 0, 0, 0.38, 12);               // twelve-sided perforated platform
      cylZ(S, "dark", F, 1.5, 1.5, 0.012, 0, 0, 0.48, 12);             // perforated field (darker)
      cylZ(S, "steel", F, 0.7, 0.7, 0.3, 0, 0, 0.48, 16);              // turntable, 1/3 of the platform
      box(Tu, "body", I, 1.4, 1.2, 0.95, 0, 0, 0.78);                  // carriage body
      box(Tu, "body", I, 1.0, 0.22, 1.05, 0.1, 0.72, 0.78);            // cheeks
      box(Tu, "body", I, 1.0, 0.22, 1.05, 0.1, -0.72, 0.78);
      box(Tu, "steel", I, 0.85, 0.5, 0.6, -0.85, 0.85, 1.0);           // fuze setter-rammer box
      var Fe = mul(T(0.1, 0, 1.75), Ry(-e));
      cylX(Tu, "steel", Fe, 0.125, 0.085, -0.6, 4.0, 0, 0, 14);        // tube 4.6 m
      box(Tu, "steel", Fe, 0.9, 0.5, 0.55, -0.85, 0, -0.27);           // breech ring and block
      box(Tu, "body", Fe, 2.0, 0.5, 0.28, 0.3, 0, -0.55);              // cradle
      cylX(Tu, "steel", Fe, 0.1, 0.1, -0.2, 1.9, 0, -0.27, 10);        // recoil cylinder under the tube
    }
    function gun90Baked(S, F, e) {                                      // a flanking gun: everything static
      var A = new Acc();
      gun90(S, A, F, e);
      Object.keys(A.p).forEach(function (mk) {
        A.p[mk].forEach(function (pos, i) {
          var g = new THREE.BufferGeometry();
          g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
          g.setAttribute("normal", new THREE.BufferAttribute(A.n[mk][i], 3));
          S.add(mk, g, F);
        });
      });
    }

    /* ======================= SCR-584 type radar van ======================= */
    function radarVan(S, F) {
      box(S, "body", F, 5.5, 2.4, 0.3, 0, 0, 0.85);                    // trailer bed
      box(S, "body", F, 5.4, 2.4, 2.3, 0, 0, 1.15);                    // van
      box(S, "steel", F, 2.4, 0.25, 0.2, 3.9, 0, 0.9);                 // tow bar
      [-1, 1].forEach(function (s) { cylY(S, "dark", F, 0.55, 0.35, -1.0, s * 1.3, 0.55, 14); });
      cylZ(S, "steel", F, 0.25, 0.25, 0.5, 0, 0, 3.45, 10);           // dish pedestal
      dish(S, "white", F, 1.83, 0.3, 0.3, 0, 4.4, 0.2);               // 6 ft dish
      cylX(S, "steel", F, 0.05, 0.05, 0.3, 0.95, 0, 4.5, 6);           // feed arm
      box(S, "team", F, 1.2, 0.02, 1.7, 0.0, -1.21, 1.5);              // door panel
    }

    /* ======================= M167 VADS, emplaced ======================= */
    /* local frame: gun trained +X, ground z = 0; static carriage into S,
       the turret into Tu (frame Ft = the ring top) */
    function vads(S, Tu, F, Ft, e, patt) {
      // carriage: wheels 0.65 m on a 1.44 m track, axle a little aft of the ring
      [-1, 1].forEach(function (s) {
        cylY(S, "dark", F, 0.325, 0.22, -0.2, s * 0.72, 0.325, 16);
        cylY(S, "steel", F, 0.16, 0.23, -0.2, s * 0.72, 0.325, 10);   // hub
      });
      box(S, "steel", F, 0.14, 1.3, 0.12, -0.2, 0, 0.27);              // axle beam
      box(S, "body", F, 1.25, 0.7, 0.26, -0.1, 0, 0.34);               // carriage frame
      strut(S, "body", F, [0.5, 0, 0.45], [1.85, 0, 0.32], 0.055, 8);  // drawbar leg, forward
      strut(S, "body", F, [-0.7, 0, 0.45], [-1.8, 0, 0.32], 0.05, 8);  // trail leg, aft
      [[1.85, 0.05], [-1.8, 0.05]].forEach(function (p) {             // jacks down on their feet: 3.86 m emplaced
        cylZ(S, "steel", F, 0.045, 0.045, 0.38, p[0], 0, 0.05, 8);
        cylZ(S, "dark", F, 0.15, 0.15, 0.05, p[0], 0, 0, 12);
      });
      cylZ(S, "steel", F, 0.42, 0.4, 0.25, 0, 0, 0.6, 16);             // ring pedestal (top at 0.85)
      // turret
      box(Tu, "body", Ft, 1.5, 1.25, 0.1, 0, -0.03, 0);                // turret deck
      box(Tu, "body", Ft, 1.55, 0.5, 0.55, 0.0, -0.4, 0.1);            // ammunition box, right side (top 1.5 m)
      for (var k = 0; k < 7; k++) {                                     // its stiffening ribs
        box(Tu, "body", Ft, 0.04, 0.53, 0.04, -0.66 + k * 0.22, -0.4, 0.62);
        box(Tu, "body", Ft, 0.04, 0.03, 0.5, -0.66 + k * 0.22, -0.665, 0.12);
      }
      if (patt) {                                                       // 1980s-90s: brown and black patches
        [[-0.45, 0.33, 0.35, 0.18, 20], [0.25, 0.4, 0.42, 0.2, -15], [0.55, 0.2, 0.3, 0.16, 35]].forEach(function (q, i) {
          decal(Tu, i === 1 ? "dark" : "genb", Ft, q[2], q[3], q[0], -0.656, q[1], "y-", q[4] * DEG);
        });
        decal(Tu, "genb", Ft, 0.5, 0.2, -0.1, -0.4, 0.656, "z+", 25 * DEG);
      }
      box(Tu, "team", Ft, 0.02, 0.28, 0.18, -0.785, -0.4, 0.3);        // placard on its rear face
      box(Tu, "body", Ft, 0.8, 0.42, 0.28, -0.1, 0.25, 0.1);           // gun cradle base, left side
      box(Tu, "body", Ft, 0.42, 0.4, 0.45, -0.55, 0.15, 0.1);          // operator's seat
      box(Tu, "steel", Ft, 0.22, 0.2, 0.22, -0.3, 0.1, 0.55);          // sight
      cylZ(Tu, "steel", Ft, 0.035, 0.035, 0.3, -0.62, -0.42, 0.65, 6); // radar post at the right rear
      cylX(Tu, "dark", Ft, 0.17, 0.17, -0.74, -0.5, -0.42, 1.0, 14);  // range-only radar drum (top ~2.0 m)
      var Fe = mul(Ft, T(0.05, 0.27, 0.48), Ry(-e));
      cylX(Tu, "dark", Fe, 0.13, 0.13, -0.3, 0.2, 0, 0, 12);           // M168 housing
      for (var i = 0; i < 6; i++) {                                     // six barrels
        var a = i * Math.PI / 3;
        cylX(Tu, "dark", Fe, 0.022, 0.022, 0.2, 1.55, Math.cos(a) * 0.075, Math.sin(a) * 0.075, 6);
      }
      cylX(Tu, "steel", Fe, 0.11, 0.11, 0.62, 0.68, 0, 0, 12);         // mid clamp
      cylX(Tu, "steel", Fe, 0.11, 0.11, 1.2, 1.26, 0, 0, 12);          // muzzle clamp
      strut(Tu, "steel", Ft, [-0.2, -0.15, 0.55], [-0.2, 0.15, 0.45], 0.05);   // feed chute box to the gun
    }

    /* ======================= Land Phalanx (C-RAM) mount ======================= */
    /* frame: origin on the top of the mount base box at the train axis; the
       stationary flange goes to S (frame Fs), everything that trains to Tu */
    function lpwsMount(S, Fs, Tu, e) {
      var F = I;
      cylZ(S, "body", Fs, 1.3, 1.3, 0.1, 0, 0, 0, 28);                 // stationary base flange
      cylZ(Tu, "body", F, 1.22, 1.18, 0.2, 0, 0, 0.1, 28);             // train base (2.4-2.6 m across)
      // ---- the two tan cheeks of the barbette [A][B] ----
      var phi = Math.atan2(0.25, 1.9), psi = Math.atan2(0.5, 1.9);
      [-1, 1].forEach(function (s) {
        var B = s > 0 ? [-0.95, 0.95, 0.55, 1.25] : [-0.95, 0.95, -1.25, -0.55];
        var Tp = s > 0 ? [-0.92, 0.45, 0.55, 1.0] : [-0.92, 0.45, -1.0, -0.55];
        frustum(Tu, "body", F, B, Tp, 0.3, 2.2);
        function yo(z) { return 1.25 - 0.25 * (z - 0.3) / 1.9; }      // outer face
        function xf(z) { return 0.95 - 0.5 * (z - 0.3) / 1.9; }       // front face
        // bolted hatches on the outer face, each with a handle
        [[-0.2, 1.78, 0.8, 0.52], [-0.15, 1.2, 0.9, 0.5], [-0.05, 0.63, 0.85, 0.42]].forEach(function (h) {
          var Fh = mul(T(h[0], s * (yo(h[1]) + 0.012), h[1]), Rx(s * phi));
          boxc(Tu, "body", Fh, h[2], 0.035, h[3], 0, 0, 0);
          boxc(Tu, "body", Fh, 0.2, 0.09, 0.045, h[0] > -0.1 ? 0.25 : 0.22, 0, -h[3] * 0.28);
        });
        // U-shaped grab rungs up the front face, near the outer edge
        for (var k = 0; k < 6; k++) {
          var z = 0.55 + k * 0.3, xc = xf(z), yc = s * (yo(z) - 0.2);
          var Fr = mul(T(xc, yc, z), Ry(-psi));
          boxc(Tu, "body", Fr, 0.035, 0.26, 0.035, 0.085, 0, 0);
          boxc(Tu, "body", Fr, 0.085, 0.03, 0.03, 0.04, 0.115, 0);
          boxc(Tu, "body", Fr, 0.085, 0.03, 0.03, 0.04, -0.115, 0);
        }
      });
      // ---- radome on the cheek tops: track antenna in the ribbed lower part,
      //      search antenna in the upper part and dome [A][E] ----
      var rx = -0.35, R = 0.66;
      cylZ(Tu, "steel", F, 0.71, 0.71, 0.12, rx, 0, 2.1, 28);          // radome base ring
      cylZ(Tu, "white", F, R, R, 1.58, rx, 0, 2.22, 28, true);          // lower radome (track antenna)
      for (var r = 0; r < 10; r++) {                                    // its stiffening ribs
        var ra = (r + 0.5) * 36 * DEG;
        if (Math.abs(ra - Math.PI / 2) < 0.4) continue;                 // FLIR bracket side
        boxc(Tu, "white", mul(T(rx, 0, 0), Rz(ra)), 0.045, 0.04, 1.5, R + 0.018, 0, 3.0);
      }
      cylZ(Tu, "steel", F, R + 0.016, R + 0.016, 0.06, rx, 0, 3.8, 28);  // seam band
      cylZ(Tu, "white", F, R, R, 0.34, rx, 0, 3.86, 28, true);          // upper radome (search antenna)
      var dome = new THREE.SphereGeometry(R, 28, 7, 0, Math.PI * 2, 0, Math.PI / 2);
      dome.rotateX(Math.PI / 2); dome.scale(1, 1, 0.5 / R);
      Tu.add("white", dome, T(rx, 0, 4.2));                              // flattened dome: top at 4.7 m
      var rail = new THREE.TorusGeometry(R + 0.07, 0.016, 4, 16, 150 * DEG);  // handrail across the front
      rail.rotateZ(-Math.PI / 2);
      Tu.add("steel", rail, T(rx, 0, 3.72));
      [-80, -40, 0, 40].forEach(function (d) {
        var a = d * DEG;
        strut(Tu, "steel", F, [rx + R * Math.cos(a), R * Math.sin(a), 3.72],
                               [rx + (R + 0.07) * Math.cos(a), (R + 0.07) * Math.sin(a), 3.72], 0.012);
      });
      // ---- FLIR and the angled sensor box on the radome's left side [A][B] ----
      box(Tu, "steel", F, 0.42, 0.16, 1.05, rx + 0.08, R + 0.05, 2.72);    // bracket plate
      box(Tu, "white", F, 0.62, 0.3, 0.33, rx + 0.12, R + 0.27, 3.45);     // FLIR housing
      cylX(Tu, "dark", F, 0.075, 0.075, rx + 0.43, rx + 0.49, R + 0.27, 3.615, 14);   // its lens, facing the gun's way
      var Fl = mul(T(rx + 0.2, R + 0.25, 3.12), Ry(14 * DEG));          // the larger box, nose down
      boxc(Tu, "white", Fl, 0.86, 0.28, 0.26, 0, 0, 0);
      boxc(Tu, "dark", Fl, 0.02, 0.2, 0.15, 0.435, 0, 0);
      strut(Tu, "steel", F, [rx + 0.1, R + 0.1, 3.0], [rx + 0.1, R + 0.15, 3.3], 0.025);
      // ---- elevating group between the cheeks: cradle, M61A1, drum [A][B] ----
      var Fe = mul(T(0.15, 0, 1.8), Ry(-e));
      cylY(Tu, "steel", Fe, 0.13, 1.1, 0, 0, 0, 16);                    // trunnion shaft cheek to cheek
      [-1, 1].forEach(function (s) {
        box(Tu, "steel", Fe, 0.6, 0.05, 0.9, -0.05, s * 0.5, -0.82);     // side plates down to the drum
      });
      // ammunition drum: 0.84 m, axis along the gun, its front level with the cheeks
      cylX(Tu, "steel", Fe, 0.42, 0.42, -0.85, 0.55, 0, -0.68, 24);
      cylX(Tu, "steel", Fe, 0.3, 0.3, 0.55, 0.64, 0, -0.68, 18);       // front end unit
      cylX(Tu, "dark", Fe, 0.24, 0.24, -0.865, -0.85, 0, -0.68, 16);   // rear cover
      boxc(Tu, "steel", Fe, 0.32, 0.2, 0.4, 0.5, 0.36, -0.45);         // loader / entrance unit, left front
      // the loop of linked rounds hanging at the drum front [A][B]
      var belt = [[0.62, 0.36, -0.3], [0.7, 0.4, -0.62], [0.72, 0.36, -0.95], [0.66, 0.22, -1.12], [0.62, 0.05, -1.08]];
      for (var b = 0; b < belt.length - 1; b++) strut(Tu, "genb", Fe, belt[b], belt[b + 1], 0.045);
      strut(Tu, "steel", Fe, [0.1, 0.12, -0.3], [-0.15, 0.08, 0.0], 0.09);   // feed chute, drum to gun
      // M61A1: rotor housing, barrel shroud, mid clamp, ribbed muzzle clamp, six muzzles
      cylX(Tu, "dark", Fe, 0.17, 0.17, -0.85, 0.28, 0, 0.12, 16);
      cylX(Tu, "dark", Fe, 0.105, 0.105, 0.28, 1.52, 0, 0.12, 14);
      cylX(Tu, "dark", Fe, 0.125, 0.125, 0.86, 0.92, 0, 0.12, 14);
      cylX(Tu, "dark", Fe, 0.125, 0.125, 1.52, 1.97, 0, 0.12, 14);
      [1.56, 1.72, 1.88].forEach(function (x) { cylX(Tu, "dark", Fe, 0.14, 0.14, x, x + 0.04, 0, 0.12, 14); });
      for (var i = 0; i < 6; i++) {
        var a = i * Math.PI / 3 + Math.PI / 6;
        cylX(Tu, "dark", Fe, 0.022, 0.022, 1.97, 2.02, Math.cos(a) * 0.07, 0.12 + Math.sin(a) * 0.07, 6);
      }
      // grey truss cradle: a braced box frame round the gun, the gun along its top
      var x0 = -0.25, x1 = 0.85, w = 0.4, zl = -0.45, zh = 0.3;
      [[x0, -w, zl], [x0, w, zl], [x0, -w, zh], [x0, w, zh]].forEach(function (p) {
        strut(Tu, "steel", Fe, p, [x1, p[1], p[2]], 0.03);               // four longerons
      });
      [x0, x1].forEach(function (x) {                                   // end frames
        strut(Tu, "steel", Fe, [x, -w, zl], [x, w, zl], 0.03);
        strut(Tu, "steel", Fe, [x, -w, zh], [x, w, zh], 0.03);
        strut(Tu, "steel", Fe, [x, -w, zl], [x, -w, zh], 0.03);
        strut(Tu, "steel", Fe, [x, w, zl], [x, w, zh], 0.03);
      });
      [-w, w].forEach(function (y) {                                    // side X-bracing
        strut(Tu, "steel", Fe, [x0, y, zl], [x1, y, zh], 0.026);
        strut(Tu, "steel", Fe, [x0, y, zh], [x1, y, zl], 0.026);
      });
      strut(Tu, "steel", Fe, [x0, -w, zh], [x1, w, zh], 0.026);           // top diagonal
      cylX(Tu, "steel", Fe, 0.17, 0.17, x1 - 0.03, x1 + 0.03, 0, 0.12, 14);   // front bearing ring
      [[-w, zl], [w, zl], [-w, zh], [w, zh]].forEach(function (c) {     // ring to the frame corners
        strut(Tu, "steel", Fe, [x1, c[0], c[1]], [x1, c[0] > 0 ? 0.12 : -0.12, c[1] > 0 ? 0.24 : 0.0], 0.022);
      });
    }

    /* ======================= the C-RAM trailer [C] ======================= */
    /* frame: x across (+-1.3), y = distance from the gooseneck front (0..14.2) */
    function lpwsTrailer(S, F) {
      box(S, "body", F, 2.6, 3.1, 0.3, 0, 1.55, 1.3);                  // gooseneck deck, top 1.6 m
      hexa(S, "body", F, [[-1.3, 3.1, 1.3], [1.3, 3.1, 1.3], [1.3, 4.3, 0.45], [-1.3, 4.3, 0.45],
                          [-1.3, 3.1, 1.6], [1.3, 3.1, 1.6], [1.3, 4.3, 0.75], [-1.3, 4.3, 0.75]]);  // the drop
      box(S, "body", F, 2.6, 7.0, 0.15, 0, 7.8, 0.6);                  // low deck, top 0.75 m
      [-1, 1].forEach(function (s) {
        box(S, "body", F, 0.14, 7.0, 0.32, s * 1.2, 7.8, 0.28);         // deep side beams
        for (var k = 0; k < 11; k++) box(S, "steel", F, 0.07, 0.14, 0.2, s * 1.33, 4.65 + k * 0.62, 0.48);  // stake pockets
        box(S, "steel", F, 0.07, 3.0, 0.08, s * 1.33, 1.55, 1.38);     // rub rail on the gooseneck
      });
      box(S, "body", F, 2.6, 0.2, 0.7, 0, 11.3, 0.6);                  // step up to the rear deck
      box(S, "body", F, 2.6, 2.9, 0.28, 0, 12.75, 1.02);               // rear deck over the axles, top 1.3 m
      [-0.5, 0.5].forEach(function (x) { box(S, "dark", F, 0.18, 2.9, 0.25, x, 12.75, 0.77); });   // frame rails
      [12.15, 13.3].forEach(function (sy) {                            // two axles
        cylX(S, "dark", F, 0.07, 0.07, -0.86, 0.86, sy, 0.5, 8);
        [-1, 1].forEach(function (s) {
          var xa = s > 0 ? 0.86 : -1.24;
          cylX(S, "dark", F, 0.5, 0.5, xa, xa + 0.38, sy, 0.5, 20);     // tyres (the dual pair as one)
          var xr = s > 0 ? 1.24 : -1.255;
          cylX(S, "steel", F, 0.28, 0.28, xr, xr + 0.015, sy, 0.5, 14);  // wheel face
        });
      });
      box(S, "dark", F, 2.4, 0.12, 0.16, 0, 14.15, 0.86);              // rear bumper
      // landing legs, lowered to the ground [C]
      [-1, 1].forEach(function (s) {
        box(S, "steel", F, 0.17, 0.17, 1.24, s * 0.95, 2.4, 0.06);
        box(S, "steel", F, 0.42, 0.42, 0.06, s * 0.95, 2.4, 0.0);      // sand shoes
        box(S, "steel", F, 0.12, 0.25, 0.22, s * 0.95, 2.15, 1.0);     // gearbox
      });
      strut(S, "steel", F, [-0.9, 2.4, 0.5], [0.9, 2.4, 0.5], 0.04);   // cross shaft
      strut(S, "steel", F, [-0.9, 2.4, 0.3], [0.9, 2.4, 0.9], 0.03);   // brace
      // boxes on the gooseneck
      box(S, "body", F, 2.0, 1.4, 0.95, 0, 1.2, 1.6);
      box(S, "body", F, 1.2, 0.7, 0.45, 0, 2.65, 1.6);
      // tall equipment cabinet on the low deck, with doors, a louvre and a placard
      box(S, "body", F, 2.3, 2.6, 2.6, 0, 5.7, 0.75);
      box(S, "body", F, 2.4, 2.7, 0.06, 0, 5.7, 3.35);
      [-1, 1].forEach(function (s) {
        box(S, "body", F, 0.03, 0.95, 1.9, s * 1.165, 5.15, 0.95);     // door
        box(S, "steel", F, 0.04, 0.05, 0.25, s * 1.18, 5.55, 1.85);    // its handle
        box(S, "dark", F, 0.02, 0.55, 0.5, s * 1.16, 6.5, 2.45);       // louvre
        box(S, "body", F, 0.03, 0.55, 0.6, s * 1.165, 6.5, 1.1);       // access panel
      });
      box(S, "team", F, 0.02, 0.42, 0.3, 1.19, 5.15, 2.35);            // placard above the right door
      box(S, "body", F, 1.4, 0.6, 1.35, 0, 7.35, 0.75);                // small box
      // the mount's own panelled base box, top 2.05 m [C]
      box(S, "body", F, 2.4, 2.8, 1.3, 0, 9.7, 0.75);
      [-1, 1].forEach(function (s) {
        [8.95, 10.45].forEach(function (yy) {
          box(S, "body", F, 0.03, 1.2, 0.95, s * 1.215, yy, 0.92);     // bolted access panels
          box(S, "steel", F, 0.04, 0.05, 0.2, s * 1.235, yy + 0.45, 1.3);
        });
      });
      box(S, "team", F, 0.02, 0.32, 0.2, 1.22, 9.7, 1.75);             // placard between the panels
      // generator on the rear deck, grille on each side, exhaust
      box(S, "body", F, 2.2, 1.25, 1.7, 0, 12.22, 1.3);
      [-1, 1].forEach(function (s) { box(S, "dark", F, 0.02, 0.8, 0.9, s * 1.11, 12.22, 1.75); });
      cylZ(S, "dark", F, 0.05, 0.05, 0.3, 0.6, 12.5, 3.0, 8);
      // low cabinet at the tail
      box(S, "body", F, 2.3, 1.15, 0.9, 0, 13.52, 1.3);
      [-1, 1].forEach(function (s) { box(S, "body", F, 0.03, 0.45, 0.7, s * 1.16, 13.3, 1.4); box(S, "body", F, 0.03, 0.45, 0.7, s * 1.16, 13.8, 1.4); });
    }

    /* ======================= C-RAM site elements [B][D][E] ======================= */
    /* generator set on skids, green with brown and black camouflage, long side
       along local Y */
    function genSet(S, F) {
      box(S, "dark", F, 1.0, 2.2, 0.12, 0, 0, 0);                       // skid base
      box(S, "gen", F, 0.95, 2.1, 1.45, 0, 0, 0.12);                    // housing
      box(S, "gen", F, 0.9, 2.05, 0.05, 0, 0, 1.57);                    // roof
      cylZ(S, "dark", F, 0.05, 0.05, 0.35, 0.2, 0.75, 1.62, 8);         // exhaust stack
      [-1, 1].forEach(function (s) {
        box(S, "dark", F, 0.02, 0.45, 0.32, s * 0.48, -0.6, 0.85);      // louvres
        box(S, "dark", F, 0.02, 0.45, 0.32, s * 0.48, 0.55, 0.85);
        box(S, "dark", F, 0.02, 0.3, 0.2, s * 0.48, 0.0, 1.2);          // control panel door
        [[-0.75, 0.45, 0.5, 0.3, 25], [-0.05, 0.75, 0.6, 0.35, -20], [0.7, 0.4, 0.45, 0.32, 40],
         [0.3, 1.25, 0.5, 0.25, 10], [-0.65, 1.2, 0.4, 0.22, -35]].forEach(function (q, i) {
          decal(S, i % 2 ? "dark" : "genb", F, q[3], q[2], s * 0.479, q[0], q[1], s > 0 ? "x+" : "x-", q[4] * DEG);
        });
      });
      [[-0.5, 0.45, 0.3, 30], [0.4, 0.5, 0.25, -25], [0.0, 0.35, 0.22, 60]].forEach(function (q, i) {
        decal(S, i === 1 ? "dark" : "genb", F, q[2], q[1], 0.05 * (i - 1), q[0], 1.624, "z+", q[3] * DEG);
      });
    }
    /* T-wall segment: 3.66 m stem on a knee-high ledge base, 1.5 m long, lying along
       local Y from y to y + 1.5; two lifting holes near the top */
    var twShape = new THREE.Shape();
    twShape.moveTo(-0.6, 0); twShape.lineTo(0.6, 0); twShape.lineTo(0.6, 0.5); twShape.lineTo(0.19, 0.5);
    twShape.lineTo(0.15, 3.5); twShape.lineTo(0.09, 3.66); twShape.lineTo(-0.09, 3.66);
    twShape.lineTo(-0.15, 3.5); twShape.lineTo(-0.19, 0.5); twShape.lineTo(-0.6, 0.5);
    function tWall(S, F, y) {
      var g = new THREE.ExtrudeGeometry(twShape, { depth: 1.47, bevelEnabled: false });
      g.rotateX(Math.PI / 2);                                           // profile up, extruded along -Y
      S.add("twall", g, mul(F, T(0, y + 1.47, 0)));
      boxc(S, "dark", F, 0.33, 0.12, 0.12, 0, y + 0.4, 3.3);
      boxc(S, "dark", F, 0.33, 0.12, 0.12, 0, y + 1.07, 3.3);
    }
    /* sandbag wall along local Y, nrow rows, from y0 to y1 */
    function sandbags(S, F, y0, y1, nrow) {
      var L = 0.56, H = 0.15;
      for (var r = 0; r < nrow; r++) {
        var off = (r % 2) * L / 2, k = 0;
        for (var y = y0 + off; y + L <= y1 + 0.01; y += L, k++) {
          var jit = ((r * 7 + k * 3) % 5 - 2) * 0.02;
          boxc(S, "bag", mul(F, T(jit, y + L / 2, r * H + H / 2), Rz(jit * 2)), 0.36, L - 0.03, H - 0.01, 0, 0, 0);
        }
      }
    }

    /* ======================= site layouts ======================= */
    var root = new THREE.Group();
    var S = new Acc(), Tu = new Acc();
    var tpos = [0, 0, 0];
    function padRound(x, y, r) { cylZ(S, "conc2", I, r, r, 0.15, x, y, 0.2, 20); }

    if (system === "m1a1_90") {
      box(S, "conc", I, 28, 28, 0.2, 0, 0, 0);                         // apron
      [[0, 0, true], [-9, 10], [-9, -10], [9, -10]].forEach(function (gp) {
        padRound(gp[0], gp[1], 3.6);
        var F = T(gp[0], gp[1], 0.35);
        if (gp[2]) { gun90(S, Tu, F, 30 * DEG); tpos = [gp[0], gp[1], 0.35]; }
        else gun90Baked(S, F, 30 * DEG);
      });
      radarVan(S, T(8.5, 8.5, 0.2));
    } else if (system === "vads") {
      box(S, "conc", I, 28, 28, 0.2, 0, 0, 0);
      var patt = era === "e80" || era === "e90";
      [[1.0, 0, true], [-6.5, 8.5], [-6.5, -8.5]].forEach(function (gp) {
        box(S, "conc2", T(gp[0], gp[1], 0), 5.2, 3.6, 0.12, 0, 0, 0.2);   // gravel hardstanding
        var F = T(gp[0], gp[1], 0.32);
        if (gp[2]) { vads(S, Tu, F, I, 15 * DEG, patt); tpos = [gp[0], gp[1], 0.32 + 0.85]; }
        else vads(S, S, F, mul(F, T(0, 0, 0.85)), 15 * DEG, patt);
      });
    } else {
      /* C-RAM: one mount on its trailer, gun trained +X */
      box(S, "conc", I, 28, 28, 0.05, 0, 0, 0);                        // dusty gravel apron
      var xt = 4.5, y0 = -7.6;                                          // trailer centre line, gooseneck front
      var Ftr = T(xt, y0, 0.05);
      lpwsTrailer(S, Ftr);
      var mz = 0.05 + 2.05, my = y0 + 9.7;
      tpos = [xt, my, mz];
      lpwsMount(S, T(xt, my, mz), Tu, 12 * DEG);
      // two camouflaged generator sets and a canvas-covered crate beside the trailer [B]
      genSet(S, T(1.2, -5.6, 0.05));
      genSet(S, T(1.2, -3.0, 0.05));
      box(S, "bag", I, 1.0, 1.5, 0.8, 1.25, -0.7, 0.05);
      box(S, "bag", I, 0.92, 1.42, 0.12, 1.25, -0.7, 0.85);
      // power cables on the ground to the trailer
      strut(S, "dark", I, [1.7, -5.0, 0.08], [3.2, -4.4, 0.08], 0.03);
      strut(S, "dark", I, [1.7, -2.4, 0.08], [3.2, -2.2, 0.08], 0.03);
      // sandbag wall [B]
      sandbags(S, T(1.1, 0, 0.05), 3.6, 7.6, 7);
      // T-wall run behind the position, returning at both ends [B][D]
      for (var yy = -12.9; yy < 12.8; yy += 1.52) tWall(S, T(-2.7, 0, 0.05), yy);
      for (var xx = -1.9; xx < 3.0; xx += 1.52) {
        tWall(S, mul(T(0, 12.4, 0.05), Rz(-Math.PI / 2)), xx);
        tWall(S, mul(T(0, -12.4, 0.05), Rz(-Math.PI / 2)), xx);
      }
    }
    S.into(root);
    var turret = new THREE.Group(); turret.name = "turret";
    Tu.into(turret);
    turret.position.set(tpos[0], tpos[1], tpos[2]);
    root.add(turret);
    root.userData.whole = true;
    return root;
  }

  return { build: build };
})();

BLD_MODELS["flak_nato_e50"] = { build: function (THREE, M, C) { return HeroUsAaSite.build(THREE, C, "m1a1_90", "e50"); } };
BLD_MODELS["flak_nato_e60"] = { build: function (THREE, M, C) { return HeroUsAaSite.build(THREE, C, "vads", "e60"); } };
BLD_MODELS["flak_nato_e80"] = { build: function (THREE, M, C) { return HeroUsAaSite.build(THREE, C, "vads", "e80"); } };
BLD_MODELS["flak_nato_e90"] = { build: function (THREE, M, C) { return HeroUsAaSite.build(THREE, C, "vads", "e90"); } };
BLD_MODELS["flak_nato_e00"] = { build: function (THREE, M, C) { return HeroUsAaSite.build(THREE, C, "lpws", "e00"); } };
BLD_MODELS["flak_nato_e20"] = { build: function (THREE, M, C) { return HeroUsAaSite.build(THREE, C, "lpws", "e20"); } };
