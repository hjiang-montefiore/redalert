/* ============ defences3d.js — hand-built defensive emplacements ============
   Loaded last, so these override the generated pack. Each structure is built
   whole: the emplacement AND its weapon, with the weapon in a group named
   "turret" so the engine still slews it onto targets.

   Scale: a building footprint is w x h tiles at 20 m per tile, so a 1x1 plot
   is 20 x 20 m. Weapons are drawn deliberately oversized — a real 100 mm AT
   gun is invisible at RTS zoom, and you must be able to see what is shooting. */
(function () {
  if (typeof BLD_MODELS === "undefined") { window.BLD_MODELS = {}; }

  /* tuned against ACES tone mapping under a bright sun: mid-greys that looked
   right as hex were blowing out to white on the pad */
  const C_CONC = 0x5f625c, C_CONC2 = 0x4c4f4a, C_SAND = 0x8a7d5c,
        C_STEEL = 0x767c82, C_GUN = 0x4e545b, C_DARK = 0x2c3035, C_OLIVE = 0x4f5844;

  function mk(THREE, color, rough, metal) {
    const m = new THREE.MeshStandardMaterial({
      color, roughness: rough === undefined ? 0.75 : rough,
      metalness: metal === undefined ? 0.15 : metal,
    });
    return m;
  }
  function box(THREE, g, mat, w, d, h, x, y, z, rz) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mat);
    m.position.set(x, y, z + h / 2);
    if (rz) m.rotation.z = rz;
    g.add(m);
    return m;
  }
  function cyl(THREE, g, mat, r1, r2, len, x, y, z, axis) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, 12), mat);
    if (axis === "x") m.rotation.z = Math.PI / 2;
    else if (axis === "y") m.rotation.x = Math.PI / 2;
    m.position.set(x, y, z);
    g.add(m);
    return m;
  }
  /* a ring of sandbags: overlapping rounded boxes in courses */
  function sandbagRing(THREE, g, mat, R, openFrom, openTo, courses) {
    for (let c = 0; c < (courses || 2); c++) {
      const rr = R - c * 0.5, zz = c * 0.62;
      const n = Math.max(10, Math.round(rr * 2.1));
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        if (openFrom !== undefined) {
          const da = Math.abs(Math.atan2(Math.sin(a - openFrom), Math.cos(a - openFrom)));
          if (da < openTo) continue;                    // leave a firing gap
        }
        const b = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.95, 0.6), mat);
        b.position.set(Math.cos(a) * rr, Math.sin(a) * rr, zz + 0.3);
        b.rotation.z = a + Math.PI / 2 + (i % 2 ? 0.12 : -0.12);
        g.add(b);
      }
    }
  }
  function clutter(THREE, g, R) {
    const crate = mk(THREE, 0x6a5c3e, 0.9, 0.05);
    const drum = mk(THREE, 0x5a6348, 0.8, 0.2);
    for (let i = 0; i < 3; i++) {
      const a = 2.1 + i * 1.5;
      box(THREE, g, crate, 1.3, 0.9, 0.8, Math.cos(a) * R, Math.sin(a) * R, 0, a);
    }
    cyl(THREE, g, drum, 0.4, 0.4, 1.1, -R * 0.8, R * 0.6, 0.55, "y");
    cyl(THREE, g, drum, 0.4, 0.4, 1.1, -R * 0.8 + 0.9, R * 0.6 + 0.3, 0.55, "y");
  }
  /* short floodlight — kept low so it never reads as a radio mast */
  function floodlight(THREE, g, x, y) {
    const steel = mk(THREE, C_STEEL, 0.5, 0.6);
    cyl(THREE, g, steel, 0.13, 0.16, 3.4, x, y, 1.7, "y");
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.5),
      mk(THREE, 0xd8d2b8, 0.4, 0.3));
    head.position.set(x, y, 3.5);
    g.add(head);
  }

  /* ---------------- 1x1: machine-gun nest ---------------- */
  BLD_MODELS["nest"] = { build(THREE, M, C) {
    const g = new THREE.Group();
    const sand = mk(THREE, C_SAND, 0.95, 0.02);
    const conc = mk(THREE, C_CONC2, 0.9, 0.05);
    const gun = mk(THREE, C_GUN, 0.55, 0.55);
    const team = mk(THREE, C.team ? parseInt(C.team.slice(1), 16) : 0x4b8fe0, 0.6, 0.1);
    /* dug-in floor and a sandbag horseshoe open toward +X */
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(6.2, 6.6, 0.5, 16), conc);
    pad.rotation.x = Math.PI / 2; pad.position.z = 0.25;
    g.add(pad);
    sandbagRing(THREE, g, sand, 5.6, 0, 0.55, 3);
    /* the weapon: pintle-mounted GPMG behind the gap */
    const t = new THREE.Group(); t.name = "turret";
    cyl(THREE, t, gun, 0.5, 0.6, 1.0, 0, 0, 0.5, "y");           // pintle
    box(THREE, t, gun, 1.6, 1.3, 0.5, 0, 0, 1.0);                // receiver
    cyl(THREE, t, gun, 0.16, 0.13, 4.4, 2.6, 0, 1.35, "x");      // barrel
    box(THREE, t, gun, 0.7, 0.12, 0.7, 4.2, 0, 1.1);             // flash hider block
    box(THREE, t, mk(THREE, C_OLIVE, 0.8, 0.1), 1.0, 0.7, 0.6, -1.0, 0.9, 0.9); // ammo can
    box(THREE, t, gun, 2.2, 0.15, 1.4, 0.4, 0, 1.5);             // shield plate
    t.position.set(0.6, 0, 1.55);
    g.add(t);
    box(THREE, g, team, 2.0, 0.3, 0.25, -4.6, 0, 1.9);           // identification stripe
    clutter(THREE, g, 4.6);
    return g;
  } };

  /* ---------------- 1x1: anti-tank gun ---------------- */
  BLD_MODELS["atpost"] = { build(THREE, M, C) {
    const g = new THREE.Group();
    const earth = mk(THREE, 0x6d6248, 0.95, 0.02);
    const conc = mk(THREE, C_CONC2, 0.9, 0.05);
    const gun = mk(THREE, C_GUN, 0.5, 0.6);
    const sand = mk(THREE, C_SAND, 0.95, 0.02);
    const pit = new THREE.Mesh(new THREE.CylinderGeometry(7.0, 7.6, 0.6, 18), conc);
    pit.rotation.x = Math.PI / 2; pit.position.z = 0.3;
    g.add(pit);
    const berm = new THREE.Mesh(new THREE.TorusGeometry(6.9, 0.95, 8, 20), earth);
    berm.position.z = 0.5;
    g.add(berm);
    sandbagRing(THREE, g, sand, 6.0, 0, 0.7, 2);
    /* 100 mm gun on a rotating carriage with a sloped shield */
    const t = new THREE.Group(); t.name = "turret";
    cyl(THREE, t, gun, 1.5, 1.7, 0.7, 0, 0, 0.35, "y");          // turntable
    box(THREE, t, gun, 2.6, 2.2, 1.0, 0, 0, 0.7);                // cradle
    const shield = box(THREE, t, gun, 0.35, 5.0, 2.6, 1.5, 0, 0.6);
    shield.rotation.y = -0.22;
    cyl(THREE, t, gun, 0.28, 0.24, 9.0, 5.6, 0, 1.9, "x");       // barrel
    cyl(THREE, t, gun, 0.42, 0.42, 1.2, 9.6, 0, 1.9, "x");       // muzzle brake
    box(THREE, t, gun, 2.4, 0.5, 0.5, -2.4, 1.1, 0.4, 0.25);     // trail legs
    box(THREE, t, gun, 2.4, 0.5, 0.5, -2.4, -1.1, 0.4, -0.25);
    t.position.set(0, 0, 0.6);
    g.add(t);
    /* shell stack */
    const brass = mk(THREE, 0x8a6f32, 0.5, 0.7);
    for (let i = 0; i < 5; i++)
      cyl(THREE, g, brass, 0.22, 0.22, 1.0, -5.0 + (i % 3) * 0.5, 4.4 + ((i / 3) | 0) * 0.5, 0.5, "y");
    floodlight(THREE, g, -5.6, -4.6);
    return g;
  } };

  /* ---------------- 1x1: concrete barrier ---------------- */
  BLD_MODELS["wall"] = { build(THREE, M, C) {
    const g = new THREE.Group();
    const conc = mk(THREE, C_CONC, 0.92, 0.03);
    const conc2 = mk(THREE, C_CONC2, 0.92, 0.03);
    /* three interlocking T-wall slabs across the plot */
    for (let i = -1; i <= 1; i++) {
      const x = i * 5.6;
      const slab = box(THREE, g, i % 2 ? conc2 : conc, 1.5, 5.2, 5.4, x, 0, 0);
      slab.scale.set(1, 1, 1);
      box(THREE, g, conc2, 3.0, 5.6, 0.7, x, 0, 0);              // wide foot
      box(THREE, g, conc, 2.0, 5.6, 0.5, x, 0, 5.4);             // cap
    }
    /* hazard stripe on the face */
    const hz = mk(THREE, 0xc9b23a, 0.7, 0.05);
    box(THREE, g, hz, 0.2, 5.0, 0.7, 0.85, 0, 3.6);
    return g;
  } };

  /* ---------------- 2x2: AA battery ---------------- */
  BLD_MODELS["flak"] = { build(THREE, M, C) {
    const g = new THREE.Group();
    const conc = mk(THREE, C_CONC, 0.9, 0.05);
    const conc2 = mk(THREE, C_CONC2, 0.9, 0.05);
    const gun = mk(THREE, C_GUN, 0.5, 0.6);
    const pad = box(THREE, g, conc, 26, 26, 0.7, 0, 0, 0);
    /* blast walls on three sides, open toward +X */
    box(THREE, g, conc2, 1.6, 26, 4.2, -12.5, 0, 0.7);
    box(THREE, g, conc2, 26, 1.6, 4.2, 0, 12.5, 0.7);
    box(THREE, g, conc2, 26, 1.6, 4.2, 0, -12.5, 0.7);
    /* central pedestal + twin 40 mm */
    cyl(THREE, g, conc2, 4.2, 4.6, 1.4, 0, 0, 1.4, "y");
    const t = new THREE.Group(); t.name = "turret";
    box(THREE, t, gun, 4.4, 4.0, 2.2, 0, 0, 0);                  // mount body
    for (const s of [-1, 1]) {
      cyl(THREE, t, gun, 0.30, 0.26, 11.0, 5.6, s * 1.1, 1.5, "x");
      cyl(THREE, t, gun, 0.45, 0.45, 1.0, 11.0, s * 1.1, 1.5, "x");   // flash hider
    }
    box(THREE, t, gun, 2.0, 3.4, 1.8, -2.6, 0, 0.6);             // gunner position
    box(THREE, t, mk(THREE, 0x9aa0a6, 0.4, 0.7), 0.4, 3.2, 3.2, -3.6, 0, 2.0); // tracking radar
    t.position.set(0, 0, 2.8);
    g.add(t);
    /* ready ammunition lockers */
    const olive = mk(THREE, C_OLIVE, 0.85, 0.1);
    for (let i = 0; i < 3; i++) box(THREE, g, olive, 2.4, 1.6, 1.4, -8.5, -8 + i * 3.2, 0.7);
    floodlight(THREE, g, 10.5, 10.5);
    floodlight(THREE, g, -10.5, 10.5);
    return g;
  } };

  /* ---------------- 2x2: SAM site ---------------- */
  BLD_MODELS["sam"] = { build(THREE, M, C) {
    const g = new THREE.Group();
    const conc = mk(THREE, C_CONC, 0.9, 0.05);
    const conc2 = mk(THREE, C_CONC2, 0.9, 0.05);
    const steel = mk(THREE, C_STEEL, 0.5, 0.6);
    const olive = mk(THREE, C_OLIVE, 0.8, 0.15);
    box(THREE, g, conc, 26, 26, 0.7, 0, 0, 0);
    box(THREE, g, conc2, 1.4, 20, 3.2, -12.8, 0, 0.7);
    /* launcher on a turntable: four fat canisters angled up */
    cyl(THREE, g, conc2, 4.4, 4.8, 1.2, 0, 0, 1.3, "y");
    const t = new THREE.Group(); t.name = "turret";
    const base = box(THREE, t, steel, 4.0, 5.0, 1.6, 0, 0, 0);
    const rack = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const cx = (i % 2) ? 1.5 : -1.5, cy = ((i / 2) | 0) ? 1.5 : -1.5;
      const can = new THREE.Mesh(new THREE.BoxGeometry(9.5, 2.6, 2.6), olive);
      can.position.set(0, cy * 1.05, cx * 1.05);
      rack.add(can);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.7, 2.7), mk(THREE, 0x2f3338, 0.8));
      cap.position.set(4.9, cy * 1.05, cx * 1.05);
      rack.add(cap);
    }
    rack.rotation.y = -0.62;                                     // elevated to ~35 degrees
    rack.position.set(0.4, 0, 3.0);
    t.add(rack);
    t.position.set(0, 0, 2.0);
    g.add(t);
    /* engagement radar cabin at a corner */
    const cab = new THREE.Group();
    box(THREE, cab, olive, 5.0, 3.6, 3.0, 0, 0, 0);
    cyl(THREE, cab, steel, 0.22, 0.22, 2.2, 0, 0, 4.1, "y");
    const dish = new THREE.Mesh(new THREE.SphereGeometry(2.0, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2),
      mk(THREE, 0xb9bec4, 0.45, 0.35));
    dish.rotation.x = -1.0; dish.position.set(0, 0, 5.3);
    cab.add(dish);
    cab.position.set(-8.5, -8.5, 0);
    g.add(cab);
    /* generator + cable trench */
    box(THREE, g, olive, 4.0, 2.4, 2.0, 8.5, -9.0, 0.7);
    box(THREE, g, conc2, 12, 0.8, 0.25, 0, -8.5, 0.7);
    floodlight(THREE, g, 10.5, 10.5);
    return g;
  } };

  /* ---------------- 2x2: coastal battery ---------------- */
  BLD_MODELS["coastal"] = { build(THREE, M, C) {
    const g = new THREE.Group();
    const conc = mk(THREE, C_CONC, 0.92, 0.04);
    const conc2 = mk(THREE, C_CONC2, 0.92, 0.04);
    const gun = mk(THREE, C_GUN, 0.5, 0.6);
    /* casemate: thick sloped bunker with a wide embrasure facing +X */
    box(THREE, g, conc, 22, 26, 6.5, -3, 0, 0);
    const roof = box(THREE, g, conc2, 26, 28, 1.6, -2, 0, 6.5);
    roof.rotation.y = 0.0;
    box(THREE, g, conc2, 3.0, 26, 3.0, 8.5, 0, 0);               // lower lip
    box(THREE, g, conc2, 3.0, 26, 2.0, 8.5, 0, 5.0);             // upper lip
    const dark = mk(THREE, 0x15181b, 0.95, 0);
    box(THREE, g, dark, 1.0, 16, 2.2, 9.4, 0, 3.0);              // embrasure shadow
    /* the gun in the embrasure */
    const t = new THREE.Group(); t.name = "turret";
    const mantlet = new THREE.Mesh(new THREE.SphereGeometry(3.0, 14, 10), gun);
    mantlet.scale.set(1.1, 1.3, 1.0);
    t.add(mantlet);
    cyl(THREE, t, gun, 0.55, 0.48, 15.0, 8.5, 0, 0, "x");
    cyl(THREE, t, gun, 0.8, 0.8, 1.6, 15.5, 0, 0, "x");
    t.position.set(7.0, 0, 4.0);
    g.add(t);
    /* observation cupola and earth berms */
    cyl(THREE, g, conc2, 1.8, 2.0, 1.6, -8, 0, 8.1, "y");
    const earth = mk(THREE, 0x6d6248, 0.95, 0.02);
    box(THREE, g, earth, 8, 5, 3.0, -4, 14, 0);
    box(THREE, g, earth, 8, 5, 3.0, -4, -14, 0);
    return g;
  } };

  /* ---------------- 2x2: coastal sonar array ---------------- */
  /* The shore terminal of a cabled seabed hydrophone array. The real thing —
     a SOSUS Naval Facility — was a cable landing station with a computer room
     in it, not a battery: the cable comes ashore in a buried duct, is jointed
     in a concrete beach vault, runs up a covered trench into a windowless
     blockhouse full of racks, and the tracks go out again by microwave and
     satellite. Nothing on it aims at anything.

     That has to be legible at a glance, because this building stands on the
     same shoreline as the coastal gun and the SAM site, and the three
     silhouettes were drawn against each other. The gun is a 6.5 m vertical
     block with a 15 m barrel through a hole in it; the SAM is a diagonal rack
     canted 35 degrees at the sky; this is horizontal — nothing above the 5.2 m
     hut but one thin mast — and its only strong line leaves the plot at ground
     level and goes DOWN into the earth toward the water. It is fenced with
     chain-link instead of revetted with blast walls and earth berms, which
     says the same thing a second way: this is expected to be trespassed on,
     not shelled. No sandbags, no berm, no ready-ammunition locker, no shell
     stack: every one of those is already a shooting cue elsewhere in this file.

     Two engine facts shaped the plan. (1) render3d.js never applies a heading
     to a building — rec.grp.rotation.y is only touched on the non-building
     branch — so nothing here may depend on being turned to face the sea. The
     cable run is the one directional feature and it is drawn to read as "a
     cable leaves this plot and goes underground" from any compass bearing.
     (2) icons3d.js frames the build-menu thumbnail by fitting the model's
     BOUNDING SPHERE, so every metre of mast shrinks the trench, the vault, the
     drum and the cable boards that actually carry the read. The mast is
     therefore capped just under 12 m and the identity lives in the ground
     plan, not in height. */
  BLD_MODELS["sonararray"] = { build(THREE, M, C) {
    const g = new THREE.Group();
    const conc  = mk(THREE, C_CONC, 0.92, 0.04);
    const conc2 = mk(THREE, C_CONC2, 0.92, 0.04);
    const steel = mk(THREE, C_STEEL, 0.5, 0.6);
    const olive = mk(THREE, C_OLIVE, 0.85, 0.1);
    const white = mk(THREE, 0xdfe4e6, 0.55, 0.05);
    const hz    = mk(THREE, 0xc9b23a, 0.7, 0.05);      // the T-wall hazard yellow, reused
    const dark  = mk(THREE, 0x1a1c1e, 0.9, 0.05);
    const link  = new THREE.MeshStandardMaterial({ color: 0x8b9298, roughness: 0.8,
      metalness: 0.4, transparent: true, opacity: 0.46, side: THREE.DoubleSide });
    const team  = mk(THREE, C.team ? parseInt(C.team.slice(1), 16) : 0x4b8fe0, 0.6, 0.1);

    const PZ = 0.7;      // top of the hardstanding — flak and sam both use 0.7, so the
                         // three sit level with one another along a defended shore
    const CY = -4.0;     // the cable centreline, offset so the gallery runs clear of the hut

    /* (1) hardstanding. 26 m square like every other 2x2 emplacement here,
       not the full 40 m of the plot: the plot is what the engine reserves, the
       pad is what the house style actually builds on it. */
    box(THREE, g, conc, 26, 26, PZ, 0, 0, 0);

    /* (2) terminal building. Windowless single storey holding the cable
       termination frames and the watch floor. One door, no embrasure, no
       cupola, no firing step. */
    box(THREE, g, conc2, 13.0, 9.0, 5.2, -3.5, 2.0, PZ);
    box(THREE, g, conc, 13.7, 9.7, 0.40, -3.5, 2.0, PZ + 5.2);        // roof, 0.35 overhang
    box(THREE, g, dark, 0.25, 1.1, 2.2, -10.05, 2.0, PZ);             // door in the -X gable

    /* (3) rooftop chillers. A rack room is air-conditioned, and three
       condensers on the roof are the cheapest possible proof that this is a
       computer building rather than a casemate. */
    for (let i = 0; i < 3; i++)
      box(THREE, g, steel, 1.8, 1.2, 1.1, -6.0, 2.0 + (i - 1) * 2.2, PZ + 5.6);

    /* (4) shore-end junction vault — the "beach manhole" where the armoured
       submarine cable is jointed to the shore cable, closed by a bolted steel
       hatch, with a vent riser because the chamber floods. */
    box(THREE, g, conc2, 4.4, 4.4, 1.10, 10.5, CY, PZ);
    box(THREE, g, steel, 1.6, 1.6, 0.12, 10.5, CY, PZ + 1.10);
    box(THREE, g, steel, 0.45, 0.45, 0.90, 8.9, CY + 1.6, PZ + 1.10);

    /* (5) cable gallery. A covered concrete trench with lift-off lid slabs,
       laid with open joints so the seams still read at zoom, and a short spur
       turning into the building. This is the armoured run: the whole point of
       the station is that the wet plant is hard-wired to it. */
    box(THREE, g, conc2, 12.0, 2.4, 0.70, 2.5, CY, PZ);
    for (let i = 0; i < 6; i++)
      box(THREE, g, conc, 1.9, 2.6, 0.16, -2.5 + i * 2.0, CY, PZ + 0.70);
    box(THREE, g, conc2, 2.4, 2.6, 0.70, -1.0, CY + 1.9, PZ);

    /* (6) seaward duct. The cable does not lie on the beach; it leaves the
       vault buried and drops below grade. This is the one line on the model
       that leaves the plot and goes downward, and it is the reason the whole
       thing reads as connected to the water instead of standing on it. */
    box(THREE, g, conc2, 2.2, 0.90, 0.55, 11.9, CY, PZ);
    box(THREE, g, conc2, 2.4, 0.90, 0.55, 14.2, CY, 0.0);
    box(THREE, g, conc2, 1.4, 0.90, 0.45, 16.0, CY, -0.40);

    /* (7) cable route marker boards. The real "SUBMARINE CABLE — DO NOT
       ANCHOR" boards that mark a landing on every coast in the world. Four
       posts and eight small plates, and per triangle they tell the story
       better than anything else on the plot. */
    for (const bx of [13.0, 15.6]) for (const s of [1, -1]) {
      box(THREE, g, steel, 0.12, 0.12, 1.60, bx, CY + s * 3.4, 0);
      box(THREE, g, hz,    0.06, 0.90, 0.70, bx, CY + s * 3.4, 1.05);
      box(THREE, g, dark,  0.07, 0.90, 0.16, bx, CY + s * 3.4, 1.32);
    }

    /* (8) cable drum with a spare length of armoured cable wound on it. Every
       cable landing station on earth keeps one against a break, and nothing
       else in this model set looks remotely like it — which is exactly why it
       is here rather than another crate. */
    for (const s of [1, -1])
      cyl(THREE, g, steel, 2.0, 2.0, 0.22, 2.5, -8.5 + s * 1.1, PZ + 2.0);
    cyl(THREE, g, dark, 1.78, 1.78, 1.90, 2.5, -8.5, PZ + 2.0);

    /* (9) power feed equipment. The shore station powers the wet plant down
       the cable — that, and the air conditioning, is what honestly earns the
       -30 in the power budget, since there is no gun here to feed. */
    box(THREE, g, olive, 5.0, 3.0, 3.0, -9.6, -7.5, PZ);
    box(THREE, g, hz, 5.1, 3.1, 0.18, -9.6, -7.5, PZ + 2.4);          // warning band
    /* the insulator stacks are drawn square rather than round: the helper
       cylinder is 12-sided and costs four times a box to say nothing at all
       about a 0.35 m object seen from 200 m up. */
    for (const s of [1, -1])
      box(THREE, g, white, 0.32, 0.32, 1.20, -9.6, -7.5 + s * 0.8, PZ + 3.0);

    /* (10) standby generator and day tank. An array whose shore terminal goes
       dark is deaf, so the set is on the pad rather than in the building. */
    box(THREE, g, olive, 4.2, 2.4, 2.4, 9.0, -9.5, PZ);
    cyl(THREE, g, dark, 0.15, 0.15, 3.6, 6.6, -9.5, PZ + 1.8, "y");   // exhaust up the -X end
    for (const s of [1, -1]) box(THREE, g, conc2, 0.60, 0.60, 1.00, 9.0, 9.0 + s * 1.8, PZ);
    cyl(THREE, g, white, 1.10, 1.10, 5.0, 9.0, 9.0, PZ + 2.10);       // saddled horizontal tank

    /* (11) datalink mast. A hydrophone array is worth nothing until the track
       reaches the fleet, so there is a microwave hop and a whip. Height is the
       binding constraint on this whole model (see the icons3d note above), so
       it stops at 11.5 m. The legs are drawn vertical rather than tapered: a
       2.4 m base closing to 1.0 m over 11.5 m is a lean of under five degrees,
       which no zoom in this game resolves, and slanting them would cost four
       hand-built meshes to say nothing. */
    const MX = -9.5, MY = 9.5, MH = 11.5;
    for (const a of [1, -1]) for (const b of [1, -1])
      box(THREE, g, steel, 0.12, 0.12, MH, MX + a * 0.85, MY + b * 0.85, PZ);
    for (let i = 1; i <= 4; i++) for (const b of [1, -1])
      box(THREE, g, steel, 1.82, 0.08, 0.10, MX, MY + b * 0.85, PZ + i * 2.3);
    cyl(THREE, g, white, 0.80, 0.80, 0.45, MX - 0.6, MY, PZ + 8.8, "x");
    cyl(THREE, g, white, 0.45, 0.45, 0.35, MX, MY + 0.6, PZ + 6.0);
    box(THREE, g, steel, 0.06, 0.06, 1.4, MX, MY, PZ + MH);           // whip
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 4),
      mk(THREE, 0xc4342a, 0.5, 0.1));
    lamp.position.set(MX, MY, PZ + MH);                               // obstruction light
    g.add(lamp);

    /* (12) satcom radome. A smooth white ball, deliberately: an exposed dish
       reads as a tracking radar and this station tracks nothing — it listens,
       and then it talks to a satellite. */
    box(THREE, g, conc2, 1.2, 1.2, 1.5, 2.0, 9.8, PZ);
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(1.7, 10, 5, 0, Math.PI * 2, 0, Math.PI / 2), white);
    dome.rotation.x = Math.PI / 2;                                    // hemisphere +Y -> +Z
    dome.position.set(2.0, 9.8, PZ + 1.5);
    g.add(dome);

    /* (13) perimeter. Chain-link and a vehicle gate on the -X side. The threat
       to a listening post is a man with wire cutters, not a shell, and the
       fence is the clearest single statement that this is not a gun position. */
    const F = 12.5, FH = 2.2;
    box(THREE, g, link, 0.08, 25.0, FH, F, 0, PZ);
    box(THREE, g, link, 25.0, 0.08, FH, 0, F, PZ);
    box(THREE, g, link, 25.0, 0.08, FH, 0, -F, PZ);
    for (const s of [1, -1]) box(THREE, g, link, 0.08, 10.5, FH, -F, s * 7.25, PZ);
    for (let i = 0; i <= 3; i++) {
      const t = -F + i * (2 * F / 3);       // four posts a side, straddling the gateway
      box(THREE, g, steel, 0.14, 0.14, 2.4, F, t, PZ);
      box(THREE, g, steel, 0.14, 0.14, 2.4, -F, t, PZ);
      box(THREE, g, steel, 0.14, 0.14, 2.4, t, F, PZ);
      box(THREE, g, steel, 0.14, 0.14, 2.4, t, -F, PZ);
    }
    for (const s of [1, -1]) box(THREE, g, steel, 0.16, 0.16, 2.6, -F, s * 2.0, PZ);

    /* (14) gate sign carrying the owner's colour. render3d.js does not restyle
       a defence to the faction's architecture, so the concrete, the white
       radome and the yellow cable boards are identical for all five nations —
       which is correct, because a cable landing station is civil engineering
       and not a national weapon. This board is the only faction mark on it. */
    for (const s of [1, -1]) box(THREE, g, steel, 0.10, 0.12, 2.10, -12.6, -4.5 + s * 0.9, PZ);
    box(THREE, g, white, 0.08, 2.0, 1.00, -12.7, -4.5, PZ + 1.10);
    box(THREE, g, team,  0.10, 2.0, 0.22, -12.75, -4.5, PZ + 1.86);

    /* (15) one floodlight, at the gate and aimed inward. An armed emplacement
       lights the ground in front of it; this one lights its own entrance. */
    floodlight(THREE, g, -11.5, 11.0);
    return g;
  } };

  /* ---------------- 2x2: howitzer emplacement ---------------- */
  BLD_MODELS["arty"] = { build(THREE, M, C) {
    const g = new THREE.Group();
    const conc = mk(THREE, C_CONC2, 0.9, 0.05);
    const earth = mk(THREE, 0x6d6248, 0.95, 0.02);
    const gun = mk(THREE, C_GUN, 0.5, 0.55);
    const pit = new THREE.Mesh(new THREE.CylinderGeometry(12.5, 13.5, 0.8, 22), conc);
    pit.rotation.x = Math.PI / 2; pit.position.z = 0.4;
    g.add(pit);
    const berm = new THREE.Mesh(new THREE.TorusGeometry(12.6, 1.8, 8, 24), earth);
    berm.position.z = 0.9;
    g.add(berm);
    /* timber revetting around the berm */
    const wood = mk(THREE, 0x5c4a30, 0.95, 0.02);
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      box(THREE, g, wood, 0.5, 1.4, 2.2, Math.cos(a) * 12.0, Math.sin(a) * 12.0, 0.6, a);
    }
    /* 155 mm howitzer on a firing platform */
    cyl(THREE, g, conc, 3.6, 4.0, 0.9, 0, 0, 1.2, "y");
    const t = new THREE.Group(); t.name = "turret";
    box(THREE, t, gun, 4.6, 3.6, 1.8, 0, 0, 0);                  // cradle
    cyl(THREE, t, gun, 0.55, 0.45, 17.0, 9.5, 0, 1.3, "x");      // long tube
    cyl(THREE, t, gun, 0.85, 0.85, 1.8, 18.0, 0, 1.3, "x");      // muzzle brake
    cyl(THREE, t, gun, 0.75, 0.75, 1.0, 16.2, 0, 1.3, "x");
    box(THREE, t, gun, 5.0, 0.8, 0.8, -4.5, 2.2, 0.5, 0.32);     // split trails
    box(THREE, t, gun, 5.0, 0.8, 0.8, -4.5, -2.2, 0.5, -0.32);
    cyl(THREE, t, mk(THREE, 0x1d1f22, 0.9, 0.05), 1.3, 1.3, 0.7, -1.0, 3.0, 0.7, "y"); // wheels
    cyl(THREE, t, mk(THREE, 0x1d1f22, 0.9, 0.05), 1.3, 1.3, 0.7, -1.0, -3.0, 0.7, "y");
    t.position.set(0, 0, 1.7);
    g.add(t);
    /* shell pyramid and propellant canisters */
    const brass = mk(THREE, 0x8a6f32, 0.5, 0.7);
    let n = 0;
    for (let row = 0; row < 3; row++)
      for (let i = 0; i < 3 - row; i++, n++)
        cyl(THREE, g, brass, 0.42, 0.42, 1.7, -8.5 + i * 1.0 + row * 0.5, 8.0 + row * 0.0, 0.85 + row * 0.9, "y");
    const olive = mk(THREE, C_OLIVE, 0.85, 0.1);
    for (let i = 0; i < 3; i++) box(THREE, g, olive, 2.2, 1.5, 1.3, 8.0, -7.0 + i * 2.0, 0.8);
    floodlight(THREE, g, -10.0, -9.0);
    return g;
  } };

  /* =========== 3x3: strategic early-warning radar (PAVE type) ===========

     WHAT THIS IS, AND WHAT IT IS NOT. Not the Radar Dome. The Radar Dome is
     an air-search set that draws the minimap; this is the other kind of
     radar entirely - a fixed national array that stares at one wedge of sky
     forever and never moves a millimetre. Four commanders get one, one does
     not, and the three silhouettes below were drawn against each other so a
     player who has learned one can name the others at a glance:

       lpar_n  NATO  AN/FPS-115 PAVE PAWS, Raytheon. First site Otis AFB,
                     Massachusetts, operational April 1980; Beale AFB,
                     California, later the same year. A truncated concrete
                     pyramid carrying TWO circular array faces, each 31 m
                     across inside an octagonal frame, raked back 20 degrees
                     and set 120 degrees apart in azimuth so the pair covers
                     240 degrees. UHF 420-450 MHz; 1,792 crossed-dipole
                     elements populated out of 5,354 element positions at
                     first fit, the empty holes left for growth.
       lpar_r  ROC   The same radar, not a lookalike. Taiwan bought an
                     AN/FPS-115 derivative, put it on Leshan in Hsinchu
                     County at about 2,600 m, contracted it in 2000 and
                     declared it operational in February 2013. It therefore
                     shares this builder and differs only in the ground it
                     stands on - a mountain-top cut with rock benches
                     stepping off the back of the pad and one hairpin road
                     up to the gate, which is what that site actually is.
       lpar_p  PACT  Daryal, 5N79, NATO reporting name "Pechora".
                     Olenegorsk 1984, Gabala 1985. NOT a pyramid and NOT
                     circular: two enormous SEPARATE slab buildings, a
                     transmitter and a receiver, both faces vertical.
       lpar_c  PLA   Type 7010 at Huangyangshan, Xuanhua, cut into a
                     hillside from 1972 and tracking by 1976 - it called the
                     Skylab re-entry in 1979 and Kosmos 1402 in 1983 - and
                     the LPAR network that followed it in the 2000s. ONE
                     large tilted rectangular face on a massive podium.
       KPA           nothing. There is no model here because there is no
                     such installation in that army, and building one to
                     fill the slot would be the single thing this project
                     does not do.

     ONE MODEL IN THREE PAINT JOBS, OR THREE MODELS? Three, and the argument
     is what survives the zoom. The camera looks down on a 40 m structure
     from a couple of hundred metres, so paint is nearly worthless and PLAN
     plus TOP LINE are nearly everything. These three read as: a compact
     wedge with two big dials that almost touch at the front; two flat
     vertical walls of unequal size standing apart; one wide plate leaning
     back off a heavy podium. Repainting one shape three times would throw
     away the only cue the player can actually use. Honesty is cheap here
     because the expensive parts - the element grid, the pad, the kerb, the
     fence, the gate, the power plant - are shared by all three; the
     builders differ only in the antenna, which is precisely how the real
     three differ.

     THE ELEMENT GRID IS A TEXTURE, DELIBERATELY. A PAVE PAWS face carries
     5,354 element positions. As geometry that one mesh would outweigh every
     model in this game put together, and at RTS zoom a 0.55 m radiator is a
     third of a pixel. The lattice is drawn once into a 128 px canvas and
     mapped onto a single flat panel: 24 triangles for the thing the player
     is actually looking at. It is drawn TRIANGULAR, alternate rows offset
     half a pitch, because that is how these arrays are really laid out and
     it is why a phased-array face reads as a honeycomb rather than as graph
     paper. This is not an asset - the canvas is generated in code, the same
     way units3d_salvage.js draws its concrete, its apron and its hazard
     boards - and one canvas is shared by every array face in the game.

     ICONS3D FRAMING. icons3d.js fits the model's BOUNDING SPHERE, so a
     model that is one big thin plate frames as mostly empty sky. Two
     defences. First, all three are built with their mass BEHIND the array -
     a 22 m equipment hall, a stepped receiver block, a 13 m podium - so the
     solid fills its own sphere about as well as the last building added
     here (measured: bounding-box-to-sphere volume ratio 0.32 for the PAVE
     PAWS and 0.33 for the Daryal, against 0.28 for sonararray). Second,
     NOTHING here carries a mast. There is not one lattice tower on any of
     the three, which is also correct: an over-the-horizon early-warning
     array does not report by line of sight, it reports down a buried
     cable, and every metre of mast would have shrunk the array in the
     thumbnail for nothing.

     SIZE AND THE PLOT. 3x3 is 60 m of plot, and render3d.js multiplies a
     building model by CFG.BLD_SCALE = 1.10, so a model may span 54 m before
     it hangs off its own foundations. The pad is 48 m (52.8 m as placed)
     and no part of any of the three exceeds 54 m in any axis - measured,
     the widest is the ROC set at 53.0. That is the same discipline the
     rest of this file uses at 2x2, where the pad is 26 m of a 40 m plot,
     and the opposite of units3d_salvage.js, which lays a 60 m slab on a
     60 m plot and then oversteps it by ten per cent.

     WHAT WAS COMPROMISED, said plainly, because these are real buildings:
       - The face is 26 m across, not 31 m, and the pyramid tops out at
         30.4 m rather than 32 m. Losing a sixth of the aperture is what
         keeps both faces, both plinths and the hall inside 40 m so the
         power plant has somewhere to stand.
       - Daryal's transmitter and receiver stand one to one and a half
         kilometres apart. That does not fit a 60 m pad and never will fit
         any pad in this game. The separation is compressed to about 28 m
         and both are brought inside one fence. What survives is the only
         part a player can use: TWO slabs, not one; unequal; both vertical;
         both looking the same way.
       - Type 7010 was built INTO a mountainside. There is no terrain
         deformation in this engine, so the hill is stated by the cut
         instead - stepped retaining benches behind the podium.

     ENGINE NOTES. (1) render3d.js never applies a heading to a building -
     rec.grp.rotation.y is touched only on the non-building branch - so all
     three face +X on every map and nothing here may depend on being turned.
     (2) These must be cat:"defense" in BUILDINGS. On the "building" branch
     render3d.js runs restyle() over the whole model and bolts archFixture()
     onto the roof at roofHeightOf() - a white radome and an antenna mast
     for NATO, a stack and a banner board for PACT. A radome on top of a
     PAVE PAWS is nonsense, and the mast would undo the framing argument
     above. cat:"defense" skips both, which is exactly why sonararray is
     cat:"defense". eraRestyle() still runs and still should: an e80 array
     under a 28 per cent olive tint is the right answer, and it survives the
     texture because it only lerps material.color. (3) No
     BLD_MODELS["def_lpar_*"] exists, so the engine bolts no gun on top; the
     ids are added to the delete list at the foot of this file anyway, the
     same belt and braces as def_sonararray. */

  /* A CENTRED box. The file's box() plants a mesh on z = 0 by adding h/2,
     which is right for anything standing on the pad and wrong for a panel
     inside a group that is about to be tilted: after a rotation there is no
     "down" left to stand on. Everything living on an array face goes
     through this instead. */
  function cbox(THREE, g, mat, sx, sy, sz, x, y, z) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(x, y, z);
    g.add(m);
    return m;
  }

  /* The element lattice, drawn once and shared by every array face in the
     game: cavity, then radiator, then the subarray seams - a real face is
     bolted up out of panels and at any distance the seams are the strongest
     thing on it. */
  let AR_CV = null;
  function arrayCanvas() {
    if (AR_CV) return AR_CV;
    const cv = document.createElement("canvas");
    cv.width = 128; cv.height = 128;
    const p = cv.getContext("2d");
    p.fillStyle = "#6b7072"; p.fillRect(0, 0, 128, 128);
    const N = 16, s = 128 / N;
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const off = (r % 2 ? s * 0.5 : 0), y = r * s;
        /* an offset row must be drawn twice - once in place and once shifted a
           full tile back - or the half-cell that falls off the right edge never
           reappears on the left and RepeatWrapping breaks the lattice at every
           seam */
        for (const x of (off ? [c * s + off, c * s + off - 128] : [c * s])) {
          p.fillStyle = "#23272a";
          p.fillRect(x + s * 0.20, y + s * 0.20, s * 0.42, s * 0.42);   // cavity
          p.fillStyle = "rgba(202,208,212,0.62)";
          p.fillRect(x + s * 0.31, y + s * 0.31, s * 0.20, s * 0.20);   // radiator
        }
      }
    }
    p.globalAlpha = 0.5; p.strokeStyle = "#3a3f42"; p.lineWidth = 2;
    /* from 0, not 1: the tile boundary carries a subarray seam like every
       other, or the seams come out unevenly spaced once the map repeats */
    for (let i = 0; i < 4; i++) {
      p.beginPath(); p.moveTo(i * 32, 0); p.lineTo(i * 32, 128); p.stroke();
      p.beginPath(); p.moveTo(0, i * 32); p.lineTo(128, i * 32); p.stroke();
    }
    p.globalAlpha = 1;
    AR_CV = cv;
    return cv;
  }
  /* rx and ry are tile repeats, picked per face so the drawn element pitch
     lands near the real half-wavelength spacing: the tile is 16 elements
     wide, so a 26 m face at a 0.55 m pitch wants 26 / (16 * 0.55) = 3.0
     tiles. Every face below is sized off that arithmetic, which is why a
     small transmit array is not simply a shrunk big one - the elements stay
     the same size on all of them, as they do in life. */
  function arrayMat(THREE, rx, ry) {
    const t = new THREE.CanvasTexture(arrayCanvas());
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(rx, ry);
    return new THREE.MeshStandardMaterial({ color: 0xffffff, map: t,
      roughness: 0.68, metalness: 0.22 });
  }

  /* One material set per model, built once and handed to every helper.
     Three separate helpers each calling mk() for its own concrete cost
     twenty-odd materials and twenty-odd draw calls per building to say
     exactly the same grey three times. */
  function ewMats(THREE, C) {
    return {
      conc:  mk(THREE, C_CONC, 0.92, 0.04),
      conc2: mk(THREE, C_CONC2, 0.92, 0.04),
      steel: mk(THREE, C_STEEL, 0.5, 0.6),
      olive: mk(THREE, C_OLIVE, 0.85, 0.1),
      white: mk(THREE, 0xdfe4e6, 0.55, 0.05),
      dark:  mk(THREE, 0x1a1c1e, 0.9, 0.05),
      hz:    mk(THREE, 0xc9b23a, 0.7, 0.05),
      rock:  mk(THREE, 0x6a655a, 0.98, 0.02),
      team:  mk(THREE, C.team ? parseInt(C.team.slice(1), 16) : 0x4b8fe0, 0.6, 0.1),
      link:  new THREE.MeshStandardMaterial({ color: 0x8b9298, roughness: 0.8,
        metalness: 0.4, transparent: true, opacity: 0.46, side: THREE.DoubleSide }),
    };
  }

  /* The ground all three stand on: slab, kerb, chain-link, a vehicle gate on
     -X, and the only faction-coloured object on the plot. A national radar
     site is FENCED, not revetted: the threats to it are a man with wire
     cutters and a cruise missile, and a sandbag stops neither. There is no
     berm, no blast wall, no firing step and no ready-ammunition locker
     anywhere in this family - every one of those is a shooting cue that
     belongs to the emplacements above. */
  function ewGround(THREE, g, P, PZ) {
    box(THREE, g, P.conc, 48, 48, PZ, 0, 0, 0);
    for (const s of [1, -1]) {
      box(THREE, g, P.conc2, 48, 0.8, 0.40, 0, s * 23.6, PZ);
      box(THREE, g, P.conc2, 0.8, 48, 0.40, s * 23.6, 0, PZ);
    }
    const F = 23.0, FH = 2.4;
    box(THREE, g, P.link, 0.08, 46.0, FH, F, 0, PZ);
    box(THREE, g, P.link, 46.0, 0.08, FH, 0, F, PZ);
    box(THREE, g, P.link, 46.0, 0.08, FH, 0, -F, PZ);
    for (const s of [1, -1]) box(THREE, g, P.link, 0.08, 19.0, FH, -F, s * 13.5, PZ);
    for (let i = 0; i <= 4; i++) {
      const t = -F + i * (F / 2);
      box(THREE, g, P.steel, 0.16, 0.16, 2.6, F, t, PZ);
      box(THREE, g, P.steel, 0.16, 0.16, 2.6, -F, t, PZ);
      box(THREE, g, P.steel, 0.16, 0.16, 2.6, t, F, PZ);
      box(THREE, g, P.steel, 0.16, 0.16, 2.6, t, -F, PZ);
    }
    for (const s of [1, -1]) box(THREE, g, P.steel, 0.18, 0.18, 2.8, -F, s * 4.0, PZ);
    /* Gate board. render3d.js does not restyle a defence into the faction's
       architecture, so the concrete is identical for all four - which is
       correct, since a Taiwanese PAVE PAWS and an American one came off the
       same production line. This board is the only national mark on it. */
    for (const s of [1, -1]) box(THREE, g, P.steel, 0.10, 0.12, 2.30, -24.4, s * 1.0, PZ);
    box(THREE, g, P.white, 0.08, 2.2, 1.10, -24.5, 0, PZ + 1.20);
    box(THREE, g, P.team,  0.10, 2.2, 0.24, -24.55, 0, PZ + 2.06);
    floodlight(THREE, g, -21.5, 20.0);
    floodlight(THREE, g, -21.5, -20.0);
  }

  /* The plant all three need, parked in the free band along +Y. An array of
     this class is a megawatt-scale load with a megawatt-scale heat
     rejection problem, and PAVE PAWS sites were built with their own power
     plant on site. That plant, not a gun, is the honest reason a structure
     that shoots at nothing takes a bite out of a base's grid. */
  function ewPlant(THREE, g, P, PZ, y) {
    box(THREE, g, P.conc2, 15.0, 7.0, 6.4, -9.0, y, PZ);              // generator hall
    for (const s of [1, -1])
      cyl(THREE, g, P.steel, 0.55, 0.48, 5.0, -14.0, y + s * 2.0, PZ + 8.9, "y");
    for (let i = 0; i < 4; i++)                                       // dry coolers
      box(THREE, g, P.steel, 2.4, 3.4, 1.3, -14.5 + i * 3.4, y, PZ + 6.4);
    for (const s of [1, -1])                                          // day tanks
      cyl(THREE, g, P.white, 2.2, 2.2, 6.2, s > 0 ? 1.0 : 7.2, y - 0.5, PZ + 3.1, "y");
    box(THREE, g, P.olive, 6.0, 4.0, 3.2, 14.0, y, PZ);               // switchgear house
    box(THREE, g, P.hz, 6.1, 4.1, 0.20, 14.0, y, PZ + 2.6);
    for (const s of [1, -1])
      box(THREE, g, P.white, 0.34, 0.34, 1.30, 14.0 + s * 1.6, y - 1.2, PZ + 3.2);
  }

  /* The buried run that carries the track away. Nothing in this family
     radiates its own answer: an early-warning site reports down armoured
     cable, which is also why not one of the three has a mast. */
  function ewCable(THREE, g, P, PZ, x, y) {
    box(THREE, g, P.conc2, 3.6, 3.6, 1.0, x, y, PZ);
    box(THREE, g, P.steel, 1.4, 1.4, 0.12, x, y, PZ + 1.0);
    box(THREE, g, P.conc2, 11.0, 2.0, 0.55, x - 7.3, y, PZ);
    for (let i = 0; i < 4; i++)
      box(THREE, g, P.conc, 2.2, 2.2, 0.14, x - 11.6 + i * 2.7, y, PZ + 0.55);
  }

  /* ---- the AN/FPS-115 itself, shared by NATO and the ROC ---- */
  function pavePaws(THREE, C, opt) {
    const g = new THREE.Group();
    const P = ewMats(THREE, C);
    const faceM = arrayMat(THREE, 2.1, 2.1);   // 18.6 m of aperture at a 0.55 m pitch

    const PZ = 0.8;
    const CX = 3.0;                          // where the two boresights cross
    const R = 13.0, TH = 2.8;                // face radius and structural depth
    const TILT = -20 * Math.PI / 180;        // rake back 20 degrees. Negative
                                             // about +Y lifts the normal - the
                                             // same sign the SAM rack uses.
    ewGround(THREE, g, P, PZ);

    /* Operations and transmitter hall. This is the mass that makes the
       thumbnail work, and in the real building it is most of the volume:
       the arrays are the two front walls of a building full of
       transmitters, not an antenna standing beside a shed. */
    box(THREE, g, P.conc2, 18, 30, 22, -10, 0, PZ);
    box(THREE, g, P.conc, 19, 31, 0.7, -10, 0, PZ + 22);
    for (let i = 0; i < 4; i++)
      box(THREE, g, P.steel, 2.6, 2.2, 1.6, -15.5 + i * 3.4, -11.0, PZ + 22.7);
    box(THREE, g, P.dark, 0.30, 2.4, 3.2, -19.15, 6.0, PZ);           // the one door
    box(THREE, g, P.conc, 4.0, 4.0, 0.35, -21.5, 6.0, PZ);            // its apron

    /* The two faces. Yaw and tilt are NESTED groups on purpose. three.js
       applies Euler XYZ as Rx * Ry * Rz, so the z term is the innermost
       rotation: setting rotation.z and rotation.y on one object would tilt
       the face and then swing the tilt sideways along with it. An outer
       group that only yaws about Z, holding an inner group that only tilts
       about Y, gives the order the real building has - and it keeps box()'s
       "footprint sits on z" contract valid inside the yaw group, which
       turns only about the vertical. */
    for (const s of [1, -1]) {
      const a = s * 60 * Math.PI / 180;
      const yg = new THREE.Group();
      yg.position.set(CX + Math.cos(a) * 9.0, Math.sin(a) * 9.0, 0);
      yg.rotation.z = a;
      g.add(yg);
      box(THREE, yg, P.conc, 13.0, 27.0, 4.4, 0, 0, PZ);              // battered plinth
      box(THREE, yg, P.conc2, 14.2, 28.2, 0.7, 0, 0, PZ + 4.4);
      box(THREE, yg, P.conc2, 3.2, 3.2, 13.0, -2.0, s * 14.6, PZ);    // outboard stair
      box(THREE, yg, P.steel, 3.4, 3.4, 0.4, -2.0, s * 14.6, PZ + 13.0);

      const tg = new THREE.Group();
      const TC = Math.cos(-TILT), TS = Math.sin(-TILT);
      /* the frame is an OCTAGON, so its half-height along the tilt-local
         vertical is the APOTHEM R*cos(PI/8) = 0.924R, not the circumradius.
         Using R sat the face 0.93 m clear of its own plinth. */
      tg.position.set(0, 0, PZ + 5.1 + R * Math.cos(Math.PI / 8) * TC + (TH / 2) * TS);
      tg.rotation.y = TILT;
      yg.add(tg);
      /* Octagonal frame. An eight-sided cylinder IS an octagonal prism, for
         32 triangles; thetaStart = PI/8 turns it half a facet so the
         octagon gets a flat top and a flat bottom, which is how the real
         frame is built and what makes it read as machined, not round. */
      const fr = new THREE.Mesh(
        new THREE.CylinderGeometry(R, R, TH, 8, 1, false, Math.PI / 8), P.conc);
      fr.rotation.z = Math.PI / 2;
      tg.add(fr);
      /* Active aperture: 18.6 m of live face inside a 26 m frame. The real
         ratio is 22.1 m of aperture in a 31 m face, which is 0.71; this is
         0.715. A CircleGeometry faces +Z, so rotation.y = PI/2 turns it to
         +X; the 90 degree spin that comes with it is invisible on a lattice
         that is symmetric under it. */
      const ap = new THREE.Mesh(new THREE.CircleGeometry(R * 0.715, 24), faceM);
      ap.rotation.y = Math.PI / 2;
      ap.position.x = TH / 2 + 0.06;
      tg.add(ap);
      cbox(THREE, tg, P.conc2, 0.7, R * 1.66, 1.1, TH / 2 + 0.25, 0, R * 0.80);
      cbox(THREE, tg, P.conc2, 0.7, R * 1.66, 1.1, TH / 2 + 0.25, 0, -R * 0.80);
      cbox(THREE, tg, P.steel, 1.8, R * 1.5, 0.16, TH / 2 + 0.9, 0, -R * 0.99);
    }

    ewPlant(THREE, g, P, PZ, 19.0);
    ewCable(THREE, g, P, PZ, -6.0, -19.0);

    /* The ROC set only. Leshan is a peak cut flat at about 2,600 m, and
       what you can see of it from the air is a terraced platform with
       rock-cut benches stepping off the downhill side and one hairpin road
       up to the gate. Nobody else gets this, because nobody else put theirs
       on a mountain. */
    if (opt && opt.terrace) {
      /* Cut into the slope BEHIND the pad, not stepping off the front of it.
         The first draft ran the benches down to z = -3.1, which in game is
         under the terrain mesh - invisible where it was meant to distinguish
         this set from the American one, and still counted in the bounding
         sphere that frames the build-menu thumbnail, so it shrank the array
         in the icon by about nine per cent for nothing. */
      for (let i = 0; i < 3; i++)
        box(THREE, g, P.rock, 44 - i * 8, 2.2, 1.5 + i * 1.1, 0, -22.6 - i * 1.8, PZ - 0.2);
      box(THREE, g, P.conc, 7.0, 24.0, 0.30, -24.0, -5.0, PZ - 0.30);  // hairpin approach
      box(THREE, g, P.conc, 9.0, 6.5, 0.30, -23.0, -17.0, PZ - 0.30);
    }
    return g;
  }

  BLD_MODELS["lpar_n"] = { build(THREE, M, C) { return pavePaws(THREE, C, null); } };
  BLD_MODELS["lpar_r"] = { build(THREE, M, C) { return pavePaws(THREE, C, { terrace: true }); } };

  /* ---- Daryal: two slabs, both vertical ---- */
  BLD_MODELS["lpar_p"] = { build(THREE, M, C) {
    const g = new THREE.Group();
    const P = ewMats(THREE, C);
    const rxM = arrayMat(THREE, 2.3, 2.3);      // 20 m square at a 0.55 m pitch
    const txM = arrayMat(THREE, 1.3, 1.3);      // 11 m square, same element size
    const PZ = 0.8;
    ewGround(THREE, g, P, PZ);

    /* RECEIVER. The big one. A real Daryal receiving aperture is of the
       order of a hundred metres square; this is 27 by 20 on a 9 m thick
       stepped hall, and the STEP is the point - a Daryal building is a
       ziggurat of poured concrete and it has never looked like anything
       else. The face is VERTICAL, and that single fact tells a PAVE PAWS
       from a Daryal across the map at any zoom this game supports. */
    box(THREE, g, P.conc2, 9.0, 24.0, 25.0, 11.0, 3.0, PZ);
    box(THREE, g, P.conc, 9.6, 24.6, 0.7, 11.0, 3.0, PZ + 25.0);
    box(THREE, g, P.conc2, 7.0, 18.0, 5.0, 9.5, 3.0, PZ + 25.7);      // set-back attic
    cbox(THREE, g, rxM, 0.35, 20.0, 20.0, 15.65, 3.0, PZ + 12.5);     // the aperture
    for (const s of [1, -1]) {                                        // aperture frame
      box(THREE, g, P.conc, 1.4, 22.5, 1.6, 15.8, 3.0, PZ + 2.0 + (s > 0 ? 21.0 : 0));
      box(THREE, g, P.conc, 1.4, 1.6, 21.0, 15.8, 3.0 + s * 10.7, PZ + 2.0);
    }
    for (const s of [1, -1])                                          // stair towers, at the
      box(THREE, g, P.conc2, 4.6, 4.6, 28.0, 4.4, 3.0 + s * 10.0, PZ);   // BACK of the hall
    box(THREE, g, P.dark, 0.30, 2.4, 3.2, 6.35, -6.0, PZ);

    /* TRANSMITTER. Smaller, offset across the baseline, looking the same
       way - and clear of the receiver's line of sight, which is why it sits
       down at -15 in y rather than directly behind. On the real
       installation it stands a kilometre off and is a separate compound
       with its own guard. Nothing in this game has a pad that can hold
       that, so it is compressed to about 26 m and brought inside one fence.
       Two unequal slabs looking the same way is the part of Daryal a player
       can use. */
    box(THREE, g, P.conc2, 7.0, 15.0, 17.0, -14.0, -15.0, PZ);
    box(THREE, g, P.conc, 7.6, 15.6, 0.7, -14.0, -15.0, PZ + 17.0);
    cbox(THREE, g, txM, 0.35, 11.0, 11.0, -10.35, -15.0, PZ + 8.5);
    for (const s of [1, -1]) {
      box(THREE, g, P.conc, 1.2, 13.0, 1.3, -10.2, -15.0, PZ + 2.4 + (s > 0 ? 11.8 : 0));
      box(THREE, g, P.conc, 1.2, 1.3, 11.8, -10.2, -15.0 + s * 6.0, PZ + 2.4);
    }
    box(THREE, g, P.conc2, 4.0, 4.0, 19.0, -19.5, -15.0, PZ);         // stair tower

    /* The gallery between them. On a real Daryal the transmit and receive
       sites are tied together by a buried run carrying the coherent
       reference; here it is the line that says these two slabs are one
       machine and not two buildings. */
    box(THREE, g, P.conc2, 17.0, 2.6, 0.75, -2.0, -7.0, PZ);
    for (let i = 0; i < 6; i++)
      box(THREE, g, P.conc, 2.2, 2.8, 0.16, -9.0 + i * 2.8, -7.0, PZ + 0.75);
    box(THREE, g, P.conc2, 2.6, 4.0, 0.75, 5.0, -8.0, PZ);

    ewPlant(THREE, g, P, PZ, 19.0);
    /* Soviet strategic radar sites are power stations with an antenna
       attached. Two more stacks over a boiler house, because a Daryal
       transmitter is a tens-of-megawatts load and Pechora had a plant built
       for it and a town built for the plant. */
    box(THREE, g, P.conc2, 9.0, 5.0, 8.0, 4.0, -18.0, PZ);
    for (const s of [1, -1])
      /* cyl() centres on z, so an 11 m tube seated on an 8.0 m roof wants
         PZ + 8.0 + 5.5 = PZ + 13.5. At 14.3 the stacks floated. */
      cyl(THREE, g, P.steel, 0.75, 0.62, 11.0, 4.0 + s * 2.6, -18.0, PZ + 13.5, "y");
    return g;
  } };

  /* ---- the Chinese LPAR: one tilted rectangle on a hillside podium ---- */
  BLD_MODELS["lpar_c"] = { build(THREE, M, C) {
    const g = new THREE.Group();
    const P = ewMats(THREE, C);
    const faceM = arrayMat(THREE, 3.3, 1.8);    // 28.6 m by 16 m, same element size
    const PZ = 0.8;
    const TILT = -20 * Math.PI / 180;
    ewGround(THREE, g, P, PZ);

    /* The podium. Type 7010's face was set into the flank of Huangyangshan
       with the equipment underneath and behind it, and that is the whole
       reason this silhouette is wide and low where the PAVE PAWS is tall:
       the mountain carried the structure, so the structure did not have to.
       It is also what saves the thumbnail - a lone leaning plate frames as
       empty sky, and this one has 13 m of building sitting behind it. */
    box(THREE, g, P.conc2, 20.0, 36.0, 13.0, -7.0, 0, PZ);
    box(THREE, g, P.conc, 21.0, 37.0, 0.8, -7.0, 0, PZ + 13.0);
    box(THREE, g, P.conc, 12.0, 34.0, 5.0, 6.0, 0, PZ);               // face plinth
    box(THREE, g, P.conc2, 13.0, 35.0, 0.7, 6.0, 0, PZ + 5.0);
    box(THREE, g, P.dark, 0.30, 2.4, 3.2, -17.15, 10.0, PZ);
    for (let i = 0; i < 5; i++)                                       // roof plant
      box(THREE, g, P.steel, 2.6, 2.4, 1.5, -14.0 + i * 3.4, -12.0, PZ + 13.8);

    /* The face: ONE rectangle, 32 by 19, raked back 20 degrees. Nested tilt
       group for the same reason as the PAVE PAWS - a tilted panel has no
       floor, so everything on it is centred rather than planted. */
    const tg = new THREE.Group();
    const FW = 32.0, FH = 19.0, FT = 2.2;
    const TC = Math.cos(-TILT), TS = Math.sin(-TILT);
    tg.position.set(6.0, 0, PZ + 5.7 + (FH / 2) * TC + (FT / 2) * TS);
    tg.rotation.y = TILT;
    g.add(tg);
    cbox(THREE, tg, P.conc, FT, FW, FH, 0, 0, 0);                     // backing structure
    cbox(THREE, tg, faceM, 0.30, FW - 3.4, FH - 3.0, FT / 2 + 0.2, 0, 0);
    for (const s of [1, -1]) {                                        // frame
      cbox(THREE, tg, P.conc2, 0.9, FW, 1.7, FT / 2 + 0.3, 0, s * (FH / 2 - 0.85));
      cbox(THREE, tg, P.conc2, 0.9, 1.7, FH, FT / 2 + 0.3, s * (FW / 2 - 0.85), 0);
    }
    cbox(THREE, tg, P.steel, 1.8, FW - 4.0, 0.16, FT / 2 + 1.0, 0, -FH / 2 + 0.4);

    /* Rock-cut benches behind. There is no terrain deformation in this
       engine, so the hill the set was buried in is stated by the cut
       instead: three retaining steps climbing away behind the podium. */
    /* Split either side of the gate corridor. Drawn as one continuous bench
       these buried the team board, the backing board and both gate posts of
       ewGround() outright, and walled off the vehicle gate in the -X fence -
       the site had no visible national marking and no visible way in. A cut
       hillside with a road climbing through it is what this is anyway. */
    for (let i = 0; i < 3; i++) {
      const hl = (40 - i * 7) / 2, seg = hl - 4.0;
      for (const sgn of [1, -1])
        box(THREE, g, P.rock, 3.0, seg, 3.0 + i * 1.6,
            -19.2 - i * 2.4, sgn * (4.0 + seg / 2), PZ - 0.2);
    }

    ewPlant(THREE, g, P, PZ, 19.0);
    ewCable(THREE, g, P, PZ, -2.0, -21.0);
    return g;
  } };

  /* ============ 2x2: fixed electronic-warfare / jamming site ============
     Six stations across five armies, all built from one core, because they ARE
     one thing: a hardened transmitter hall, a great deal of power and cooling
     going into it, a buried feeder run out of it, and an aerial field at the
     end of that run. What differs between nations is only the aerial field -
     which is also the only part a player can read at RTS zoom - so the core is
     written once and each nation supplies its own aerials.

     Why this silhouette and not another. The plot next door may hold a SAM
     site (a 35 degree diagonal rack), a coastal gun (a 6.5 m block with a 15 m
     barrel through it), or a sonar array (horizontal, and its one strong line
     goes DOWN into the earth). This one is vertical and thin: a low windowless
     hall and, standing well clear of it, an aerial that is mostly air. Nothing
     on it is a barrel and nothing on it is a launcher. The transformer yard and
     the standby set are drawn large on purpose - the honest reason this
     building costs the grid what it does is that a jamming transmitter is a
     furnace, and the yard is the visible half of that.

     Two engine facts shaped the plan, both learned on BLD_MODELS["sonararray"]
     and both still true. (1) render3d.js never applies a heading to a building
     - rec.grp.rotation.y is only touched on the non-building branch - so
     nothing here may depend on being turned to face anything. The aerials are
     drawn as a field to be walked around, not as a face aimed at the enemy.
     (2) icons3d.js frames the build-menu thumbnail from the model's BOUNDING
     SPHERE, so every metre of mast shrinks the hall, the yard and the feeder
     gallery in the icon. Real strategic masts are 30 m and more; every one here
     is capped at 18 m and the identity is carried by the ground plan.

     Mesh budget is matched to sonararray (92 meshes / 892 triangles): the core
     is 68 meshes and each aerial field is 18 to 34, so the family runs 86 to
     102. The NATO station is deliberately the sparsest model in the set. That
     is not a corner cut, it is the content. */

  /* ---- shared aerial parts ---- */

  /* a lattice mast: four legs and horizontal rungs. 4 + 2*rungs meshes. */
  function ewMast(THREE, g, M, x, y, base, h, half, rungs) {
    for (const a of [1, -1]) for (const b of [1, -1])
      box(THREE, g, M.steel, 0.12, 0.12, h, x + a * half, y + b * half, base);
    for (let i = 1; i <= rungs; i++) for (const b of [1, -1])
      box(THREE, g, M.steel, half * 2 + 0.12, 0.08, 0.10, x, y + b * half,
          base + i * (h / (rungs + 1)));
  }

  /* One log-periodic dipole array: a boom with dipole elements graded along
     it, longest at the back. It is the aerial that says "this transmits over a
     wide band" more clearly than any other shape in radio, and no other model
     in this game has one. Returned as its own Group so the caller can yaw it
     with a single rotation.z - the boom cylinder has already spent its own
     rotation.z getting onto the +X axis, and a second yaw stacked on that mesh
     would tilt it rather than turn it. 3 + n meshes. */
  function ewLpda(THREE, M, L, n) {
    const t = new THREE.Group();
    cyl(THREE, t, M.steel, 0.11, 0.11, L, L / 2, 0, 0, "x");            // boom
    cyl(THREE, t, M.steel, 0.09, 0.09, L * 0.55, L * 0.45, 0, -0.55, "x"); // truss
    box(THREE, t, M.steel, 0.10, 0.10, 0.60, L * 0.06, 0, -0.60);       // rear post
    for (let i = 0; i < n; i++) {
      const f = i / (n - 1);                        // 0 at the back, 1 at the tip
      box(THREE, t, M.steel, 0.09, L * (0.60 - 0.42 * f), 0.09,
          L * (0.04 + 0.92 * f), 0, -0.045);
    }
    return t;
  }

  /* a parabolic trough. CylinderGeometry's own axis is +Y, and its theta is
     measured from +Z, so an arc centred on theta = PI/2 opens toward +X and
     the trough lies across the plot the way a real one sits on its yoke. Open
     ended and double sided, because the back of a reflector is visible from
     half the compass and a single sided shell vanishes from those bearings. */
  function ewTrough(THREE, g, mat, R, len, x, y, z) {
    /* thetaStart carries a + PI, and it is load-bearing. CylinderGeometry lays
       its torso vertices at x = R*sin(theta), so an arc centred on theta = PI/2
       puts the SHELL on +X - and a reflector's aperture faces AWAY from its
       shell, so that trough opened toward -X with the feed boom and the three
       feed dipoles stranded behind the convex back of the dish. Shifted by PI
       the shell sits on -X and the bowl opens onto the feed, as it must. */
    const m = new THREE.Mesh(new THREE.CylinderGeometry(R, R, len, 16, 1, true,
      Math.PI + Math.PI / 2 - Math.PI / 3, (2 * Math.PI) / 3), mat);
    m.position.set(x, y, z);
    g.add(m);
    return m;
  }

  /* ---- the core station ---- */
  function ewStation(THREE, C, o) {
    const g = new THREE.Group();
    const M = {
      conc:  mk(THREE, C_CONC, 0.92, 0.04),
      conc2: mk(THREE, C_CONC2, 0.92, 0.04),
      steel: mk(THREE, C_STEEL, 0.5, 0.6),
      olive: mk(THREE, C_OLIVE, 0.85, 0.1),
      white: mk(THREE, 0xdfe4e6, 0.55, 0.05),
      hz:    mk(THREE, 0xc9b23a, 0.7, 0.05),
      dark:  mk(THREE, 0x1a1c1e, 0.9, 0.05),
      earth: mk(THREE, 0x6d6248, 0.95, 0.02),
      team:  mk(THREE, C.team ? parseInt(C.team.slice(1), 16) : 0x4b8fe0, 0.6, 0.1),
      shell: new THREE.MeshStandardMaterial({ color: 0xdfe4e6, roughness: 0.55,
               metalness: 0.05, side: THREE.DoubleSide }),
      link:  new THREE.MeshStandardMaterial({ color: 0x8b9298, roughness: 0.8,
               metalness: 0.4, transparent: true, opacity: 0.46, side: THREE.DoubleSide }),
      net:   new THREE.MeshStandardMaterial({ color: 0x5d6647, roughness: 0.95,
               metalness: 0.02, transparent: true, opacity: 0.55, side: THREE.DoubleSide }),
    };
    const PZ = 0.7;          // pad top: flak, sam and sonararray all use 0.7, so
                             // every emplacement in a base stands on one level

    /* (1) the pad. Concrete for the four armies that pour concrete for this;
       a graded earth apron with two wheel tracks for the KPA, whose jamming
       sets are trucks that drive into a revetment and stay there. */
    if (o.earthPad) {
      box(THREE, g, M.earth, 26, 26, PZ, 0, 0, 0);
      box(THREE, g, M.conc2, 22, 3.0, 0.10, 0, -6.0, PZ);
      box(THREE, g, M.conc2, 3.0, 14, 0.10, -7.0, 1.0, PZ);
    } else {
      box(THREE, g, M.conc, 26, 26, PZ, 0, 0, 0);
    }

    /* (2) transmitter hall. Windowless, single storey, one door: inside are the
       amplifier bays and the operators, and there is nothing to look out of a
       window at. Two blast pilasters on the long wall because the wall carries
       the feeder penetrations and is thickened where they go through. */
    box(THREE, g, M.conc2, 12.0, 8.5, 5.0, -4.5, 3.0, PZ);
    box(THREE, g, M.conc, 12.7, 9.2, 0.40, -4.5, 3.0, PZ + 5.0);
    box(THREE, g, M.dark, 0.25, 1.10, 2.20, -10.62, 3.0, PZ);
    for (const s of [1, -1])
      box(THREE, g, M.conc, 0.45, 1.20, 5.0, 0.65, 3.0 + s * 2.6, PZ);
    /* (3) rooftop chillers. An amplifier hall is a heat problem before it is
       anything else; three condensers are the cheapest possible statement that
       this building is full of electronics rather than shells. */
    for (let i = 0; i < 3; i++)
      box(THREE, g, M.steel, 1.9, 1.3, 1.15, -7.4, 3.0 + (i - 1) * 2.3, PZ + 5.4);

    /* (4) feeder gallery. The run from the hall to the aerial field, in a
       covered concrete trench with lift-off lid slabs laid with open joints so
       the seams still read at zoom. High power feeder is rigid line in a duct,
       not a cable on the ground, and this is the one element that ties the two
       halves of the plot into one machine. */
    box(THREE, g, M.conc2, 13.0, 2.2, 0.70, 2.5, -3.0, PZ);
    for (let i = 0; i < 6; i++)
      box(THREE, g, M.conc, 1.9, 2.4, 0.16, -2.6 + i * 2.1, -3.0, PZ + 0.70);
    box(THREE, g, M.conc2, 2.2, 3.4, 0.70, -2.6, -0.9, PZ);

    /* (5) transformer yard. The load: a jamming transmitter that can be heard
       at the far side of the map is a furnace, and this is what the -95 in the
       power budget actually looks like. Insulator stacks are drawn square
       rather than round - the cylinder helper is 12 sided and costs four times
       a box to say nothing at all about a 0.35 m object seen from 200 m up. */
    box(THREE, g, M.olive, 5.2, 3.4, 3.2, 8.8, 9.0, PZ);
    box(THREE, g, M.hz, 5.3, 3.5, 0.18, 8.8, 9.0, PZ + 2.5);
    for (const s of [1, -1]) for (const t of [0.9, -0.9])
      box(THREE, g, M.white, 0.34, 0.34, 1.30, 8.8 + s * 1.6, 9.0 + t, PZ + 3.2);
    for (const s of [1, -1])
      cyl(THREE, g, M.steel, 0.16, 0.16, 1.60, 8.8 + s * 1.6, 9.0, PZ + 4.3, "y");
    box(THREE, g, M.conc2, 1.6, 1.2, 2.2, 4.6, 9.0, PZ);              // switch cabinet

    /* (6) standby set and day tank. A jamming station that goes dark is a shed,
       so the diesel is on the pad and not in the building. */
    box(THREE, g, M.olive, 4.4, 2.5, 2.4, -9.2, -8.6, PZ);
    cyl(THREE, g, M.dark, 0.16, 0.16, 3.6, -11.6, -8.6, PZ + 1.8, "y");
    for (const s of [1, -1])
      box(THREE, g, M.conc2, 0.60, 0.60, 1.00, -4.4, -8.6 + s * 1.8, PZ);
    /* "y" stands the tank up - cyl() only rotates when told to, and without
       it a 4.6 m day tank lies flat across the pad; and cyl() centres on z,
       so an upright tank of length L wants PZ + L/2 to stand on the slab. */
    cyl(THREE, g, M.white, 1.10, 1.10, 4.6, -4.4, -8.6, PZ + 2.30, "y");

    /* (7) earth mat. Every high power transmitter site has one, and four
       inspection pits on the ground plan cost eight triangles apiece. */
    for (const s of [1, -1]) for (const t of [1, -1])
      box(THREE, g, M.steel, 0.7, 0.7, 0.08, s * 10.2, t * 3.0, PZ);

    /* (8) the aerial field: the only part that differs by nation. */
    o.aerials(THREE, g, M, PZ);

    /* (9) perimeter. Chain-link for the four armies that fence this and put a
       guard on the gate; for the KPA a plain wire fence around an earth berm,
       because a revetted truck park is not a fenced compound. The threat to a
       transmitter site on the ground is a man with wire cutters - the threat
       from the air is the entire point of the building and no fence answers
       it. */
    const F = 12.5, FH = 2.2;
    if (!o.earthPad) {
      box(THREE, g, M.link, 0.08, 25.0, FH, F, 0, PZ);
      box(THREE, g, M.link, 25.0, 0.08, FH, 0, F, PZ);
      box(THREE, g, M.link, 25.0, 0.08, FH, 0, -F, PZ);
      for (const s of [1, -1]) box(THREE, g, M.link, 0.08, 10.5, FH, -F, s * 7.25, PZ);
    }
    for (let i = 0; i <= 3; i++) {
      const t = -F + i * (2 * F / 3);
      box(THREE, g, M.steel, 0.14, 0.14, 2.4, F, t, PZ);
      box(THREE, g, M.steel, 0.14, 0.14, 2.4, -F, t, PZ);
      box(THREE, g, M.steel, 0.14, 0.14, 2.4, t, F, PZ);
      box(THREE, g, M.steel, 0.14, 0.14, 2.4, t, -F, PZ);
    }
    for (const s of [1, -1]) box(THREE, g, M.steel, 0.16, 0.16, 2.6, -F, s * 2.0, PZ);

    /* (10) radiation hazard boards on the aerial side. Real, and the one
       warning sign in this game that is not about explosives. */
    for (const s of [1, -1]) {
      box(THREE, g, M.steel, 0.12, 0.12, 1.60, 12.0, -8.0 + s * 3.0, 0);
      box(THREE, g, M.hz, 0.06, 0.95, 0.72, 12.0, -8.0 + s * 3.0, 1.05);
    }

    /* (11) gate sign carrying the owner's colour. These structures carry
       bare:true, so render3d.js runs neither restyle() nor archFixture() nor
       eraFixture() over them - the concrete and the olive are identical for
       all five nations, which is right, because a jamming station is signals
       engineering and not a national weapon. The aerials and this board are
       the whole difference. Without bare:true the e80 period fixture alone
       would drape a 33 m camouflage net across the antenna field at 4.6 m. */
    for (const s of [1, -1]) box(THREE, g, M.steel, 0.10, 0.12, 2.10, -12.6, -4.5 + s * 0.9, PZ);
    box(THREE, g, M.white, 0.08, 2.0, 1.00, -12.7, -4.5, PZ + 1.10);
    box(THREE, g, M.team, 0.10, 2.0, 0.22, -12.75, -4.5, PZ + 1.86);

    /* (12) one floodlight, at the gate and aimed inward, exactly as on the
       sonar array: an armed emplacement lights the ground in front of it, an
       unarmed one lights its own entrance. */
    floodlight(THREE, g, -11.5, 11.0);
    return g;
  }

  /* ---------------- aerial fields, one per nation ---------------- */

  /* PACT, 1980s: SPN-4. Soviet front-aviation support jammers - the SPN-2 and
     SPN-4 of the 1970s and the SPN-30 that followed them in the 1980s - were
     large trough reflectors on a common turntable, pointed at the airborne
     fire-control and side-looking radars coming over the forward edge. One big
     trough, one small one stacked above it for the upper band, a dipole feed
     line at the focus and a counterweight behind: 27 meshes and unmistakably
     Soviet. */
  function ewAerialsPactSpn(THREE, g, M, PZ) {
    cyl(THREE, g, M.conc2, 3.8, 4.2, 1.10, 6.5, -3.0, PZ + 0.55, "y");   // turntable
    box(THREE, g, M.steel, 3.2, 3.2, 2.4, 6.5, -3.0, PZ + 1.10);         // rotator house
    for (const s of [1, -1])
      box(THREE, g, M.steel, 0.55, 0.45, 4.6, 6.5, -3.0 + s * 3.6, PZ + 3.5);  // yoke arms
    ewTrough(THREE, g, M.shell, 3.5, 9.0, 6.5, -3.0, PZ + 8.0);          // main reflector
    /* on the rim, which is at x = centre - R/2 and z = centre +/- R*0.866 */
    for (const s of [1, -1])
      box(THREE, g, M.steel, 0.20, 9.2, 0.20, 6.5 - 1.75, -3.0, PZ + 8.0 + s * 3.03);
    cyl(THREE, g, M.steel, 0.12, 0.12, 3.2, 8.6, -3.0, PZ + 8.0, "x");   // feed boom
    for (let i = -1; i <= 1; i++)
      box(THREE, g, M.hz, 0.30, 1.30, 0.30, 9.8, -3.0 + i * 2.4, PZ + 7.9);    // feed dipoles
    box(THREE, g, M.steel, 1.6, 3.0, 1.4, 3.6, -3.0, PZ + 7.4);          // counterweight
    ewTrough(THREE, g, M.shell, 1.9, 5.0, 6.5, -3.0, PZ + 12.6);         // upper band trough
    for (const s of [1, -1])
      box(THREE, g, M.steel, 0.16, 5.2, 0.16, 6.5 - 0.95, -3.0, PZ + 12.6 + s * 1.65);
    cyl(THREE, g, M.steel, 0.10, 0.10, 1.8, 8.0, -3.0, PZ + 12.6, "x");
    box(THREE, g, M.hz, 0.26, 0.90, 0.26, 8.9, -3.0, PZ + 12.55);
    /* the waveguide bridge from the hall to the turntable, carried on two
       stanchions: high power feeder is rigid line and it does not bend round a
       corner on the ground */
    box(THREE, g, M.steel, 6.0, 0.55, 0.40, 2.6, -3.0, PZ + 3.2);
    for (const s of [1, -1])
      box(THREE, g, M.steel, 0.28, 0.28, 3.2, 2.6 + s * 2.4, -3.0, PZ);
    /* azimuth drive housings either side of the pedestal, and the crew cabin
       that goes with a manned mount */
    for (const s of [1, -1])
      box(THREE, g, M.steel, 1.1, 0.9, 1.0, 6.5 + s * 2.0, -3.0, PZ + 1.10);
    box(THREE, g, M.olive, 3.0, 2.2, 2.4, 2.0, -8.6, PZ);
    /* monitoring receiver: a small dish that watches what the transmitter is
       actually radiating. A jamming station that cannot hear itself is firing
       blind into its own band. */
    cyl(THREE, g, M.steel, 0.22, 0.22, 3.4, 10.0, 4.0, PZ + 1.7, "y");
    const md = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.white);
    md.rotation.x = -1.05; md.position.set(10.0, 4.0, PZ + 4.0);
    g.add(md);
  }

  /* PACT, present day: Murmansk-BN. A genuinely FIXED strategic HF jamming
     complex, in service 2014, deployed at Kaliningrad, in Crimea and on
     Kamchatka; its published form is seven telescopic masts of about 32 m
     carrying wire curtains across the 1.5-30 MHz band. The 5,000 km figure
     quoted for it is a Russian claim and should be read as one. Four masts
     rather than seven and 18 m rather than 32 - the icon frames on a bounding
     sphere and a 32 m mast would shrink everything else to nothing - with the
     curtain strung between them, which is the part that actually reads. */
  function ewAerialsPactMurmansk(THREE, g, M, PZ) {
    const P4 = [[9.5, 9.0], [9.5, -9.0], [-1.0, 9.0], [-1.0, -9.0]];
    for (const p of P4) {
      box(THREE, g, M.conc2, 2.2, 2.2, 0.80, p[0], p[1], PZ);            // mast base
      cyl(THREE, g, M.steel, 0.60, 0.60, 7.0, p[0], p[1], PZ + 3.5, "y");
      cyl(THREE, g, M.steel, 0.44, 0.44, 6.0, p[0], p[1], PZ + 9.5, "y");
      cyl(THREE, g, M.white, 0.30, 0.30, 6.0, p[0], p[1], PZ + 14.5, "y");
      box(THREE, g, M.steel, 1.1, 1.1, 0.16, p[0], p[1], PZ + 17.4);     // head plate
    }
    /* obstruction lamps: a mast this tall is an aviation hazard and is lit */
    for (const p of [P4[0], P4[3]]) {
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.24, 6, 4),
        mk(THREE, 0xc4342a, 0.5, 0.1));
      lamp.position.set(p[0], p[1], PZ + 17.7);
      g.add(lamp);
    }
    /* the curtain: two catenaries between the mast pairs and the droppers hung
       off them. This is the aerial. The masts only hold it up. */
    for (const s of [1, -1]) {
      box(THREE, g, M.steel, 11.0, 0.07, 0.07, 4.2, s * 9.0, PZ + 16.9);
      for (let i = 0; i < 4; i++)
        box(THREE, g, M.steel, 0.06, 0.06, 5.4, 0.4 + i * 2.9, s * 9.0, PZ + 11.4);
    }
    box(THREE, g, M.steel, 0.07, 18.0, 0.07, 9.5, 0, PZ + 16.9);
    /* the antenna tuning huts at the mast feet: an HF curtain needs a matching
       network within a few metres of the feed point */
    for (const s of [1, -1])
      box(THREE, g, M.olive, 2.2, 1.8, 1.9, 11.6, s * 9.0, PZ);
  }

  /* PLA: two rotatable log-periodic arrays. The PLA has run fixed electronic
     countermeasures units under its Fourth Department since the 1970s, and the
     modern proof is on the map - in April 2018 the US Department of Defense
     confirmed communications and radar jamming equipment installed on Mischief
     Reef and Fiery Cross Reef, which are fixed land based EW sites in the plain
     sense. Broadband log-periodics on rotators are what that job looks like:
     one aerial that covers a decade of spectrum and can be swung onto a
     bearing. Two of them, splayed, plus a monitoring dish. */
  function ewAerialsPla(THREE, g, M, PZ) {
    const SP = [[6.0, 6.5, 0.55], [6.0, -6.5, -0.55]];
    for (const s of SP) {
      cyl(THREE, g, M.conc2, 2.2, 2.5, 0.90, s[0], s[1], PZ + 0.45, "y");
      box(THREE, g, M.steel, 1.8, 1.8, 1.6, s[0], s[1], PZ + 0.90);        // rotator
      cyl(THREE, g, M.steel, 0.30, 0.30, 10.0, s[0], s[1], PZ + 5.5, "y"); // mast pipe
      const a = ewLpda(THREE, M, 7.6, 8);
      a.rotation.z = s[2];
      a.position.set(s[0], s[1], PZ + 10.6);
      g.add(a);
    }
    /* a monitoring receiver, and nothing else: the two arrays ARE the
       station, and a third aerial drawn small enough to be honest about the
       top of the band would not resolve at any zoom this game uses. */
    const md = new THREE.Mesh(
      new THREE.SphereGeometry(1.3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.white);
    md.rotation.x = -1.05; md.position.set(1.5, -9.6, PZ + 3.2);
    g.add(md);
    cyl(THREE, g, M.steel, 0.20, 0.20, 2.6, 1.5, -9.6, PZ + 1.3, "y");
  }

  /* NATO: an S-280 shelter, a stick and one array - and that is the whole
     station. This is the sparsest model in the file and it is the content, not
     a corner cut. American electronic attack lives in the air and always has:
     EB-66 in the 1960s, EA-6B Prowler from 1971, EF-111A Raven from 1981,
     EC-130H Compass Call from 1983, EA-18G Growler from 2009. The ground half
     was the AN/TLQ-17A Traffic Jam, a communications jammer fielded from the
     mid-1970s and used in Grenada in 1983 and in Desert Storm in 1991, and the
     US Army then disbanded most of its ground EW units in the 1990s and did
     not start rebuilding until the MFEW programme after 2015. A player who
     looks at this plot and thinks "I should have bought the Growler" has read
     it exactly right. */
  function ewAerialsNato(THREE, g, M, PZ) {
    /* the shelter itself: a standard transportable box on jacks, not a
       building - it can be picked up and flown out, which is the doctrine */
    box(THREE, g, M.olive, 4.2, 2.4, 2.2, 6.0, -8.5, PZ + 0.35);
    for (const s of [1, -1]) for (const t of [1, -1])
      box(THREE, g, M.steel, 0.16, 0.16, 0.35, 6.0 + s * 1.8, -8.5 + t * 0.9, PZ);
    box(THREE, g, M.dark, 0.10, 0.90, 1.60, 8.12, -8.5, PZ + 0.35);
    /* one light tripod mast, guyed, carrying one broadband array */
    for (let i = 0; i < 3; i++) {
      const a = i * (Math.PI * 2 / 3);
      const leg = box(THREE, g, M.steel, 0.14, 0.14, 4.6,
        7.5 + Math.cos(a) * 1.9, 2.0 + Math.sin(a) * 1.9, PZ);
      leg.rotation.y = -0.22 * Math.cos(a);
      leg.rotation.x = 0.22 * Math.sin(a);
    }
    cyl(THREE, g, M.steel, 0.22, 0.22, 8.0, 7.5, 2.0, PZ + 4.0, "y");
    const a1 = ewLpda(THREE, M, 5.4, 7);
    a1.rotation.z = 0.35;
    a1.position.set(7.5, 2.0, PZ + 8.4);
    g.add(a1);
    box(THREE, g, M.steel, 0.06, 0.06, 2.2, 7.5, 2.0, PZ + 8.0);         // whip above it
    /* a small radome on the hall roof: the receive side, which is the half the
       US Army actually kept */
    const dm = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), M.white);
    dm.rotation.x = Math.PI / 2;
    dm.position.set(-2.0, 3.0, PZ + 5.4);
    g.add(dm);
    box(THREE, g, M.conc2, 1.1, 1.1, 0.4, -2.0, 3.0, PZ + 5.0);
  }

  /* ROC: American equipment, revetted, on an island that has fortified
     everything for seventy years. Taiwan's electronic warfare units were pulled
     together under the Information, Communications and Electronic Force Command
     on 29 June 2017 - the fourth arm of service - and the visible ROC EW fleet
     before that was airborne and small, the C-130HE Tien Ken aircraft of the
     1990s. There is no Taiwanese strategic offensive jamming programme to draw:
     what there is, is a modest well-protected site. So: an earth revetment
     round the whole plot, one array, one radome, and blast blocks. */
  function ewAerialsRoc(THREE, g, M, PZ) {
    /* A 300-degree ring, turned so the 60-degree gap lands on the gate. Drawn
       closed it buried the team-coloured board, the white backing board and
       both gate posts - the plot had no visible national marking and no
       visible way in. A revetment with a gate through it is the real thing. */
    const bgR = new THREE.TorusGeometry(12.4, 1.7, 8, 22, Math.PI * 5 / 3);
    /* baked into the VERTICES, never set on the mesh: Box3.setFromObject
       expands a rotated geometry's own bounding box corner by corner, so a
       28-metre ring turned on the mesh measures 40 metres across - and
       icons3d.js frames the build-menu thumbnail off a bounding SPHERE, which
       would then have drawn this station at two thirds size in its own icon. */
    bgR.rotateZ(-2.277);
    const berm = new THREE.Mesh(bgR, M.earth);
    berm.position.z = PZ + 0.4;
    g.add(berm);
    for (const s of [1, -1])
      box(THREE, g, M.conc2, 3.2, 1.2, 3.0, 2.0, s * 9.6, PZ);           // blast blocks
    cyl(THREE, g, M.conc2, 2.0, 2.3, 3.6, 7.0, 1.0, PZ + 1.8, "y");      // aerial tower
    cyl(THREE, g, M.steel, 0.26, 0.26, 5.4, 7.0, 1.0, PZ + 6.3, "y");
    const a1 = ewLpda(THREE, M, 6.0, 7);
    a1.rotation.z = -0.4;
    a1.position.set(7.0, 1.0, PZ + 8.6);
    g.add(a1);
    /* the radome: a smooth ball, deliberately - the ROC's own contribution to
       this station is the receiver that tells it what to jam, and an exposed
       dish would read as a tracking radar */
    box(THREE, g, M.conc2, 2.0, 2.0, 2.6, 6.5, -8.0, PZ);
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(2.0, 12, 7, 0, Math.PI * 2, 0, Math.PI / 2), M.white);
    dome.rotation.x = Math.PI / 2;
    dome.position.set(6.5, -8.0, PZ + 2.6);
    g.add(dome);
    for (const s of [1, -1])
      box(THREE, g, M.steel, 0.07, 0.07, 5.0, 11.0, s * 4.0, PZ);        // two whips
    box(THREE, g, M.hz, 3.3, 1.3, 0.16, 2.0, 9.6, PZ + 3.0);
  }

  /* KPA: a dug-in truck under camouflage netting, and a small aerial. This is
     the honest picture of the one part of the electromagnetic spectrum North
     Korea is genuinely good at. Its GPS jamming against South Korea is
     documented and repeated: August 2010 during Ulchi Freedom Guardian, March
     2011, 28 April to 13 May 2012 (South Korea's transport ministry reported
     about 1,016 aircraft and 254 vessels affected) and 31 March to 5 April 2016
     (about 1,000 aircraft and 700 vessels). The sources were located near
     Kaesong, Haeju and Mount Kumgang, and the sets are believed to be
     Russian-derived vehicle-mounted jammers of 50 to 100 km reach. So: no
     concrete hall to draw, no transformer yard worth the name, no chain-link.
     An earth berm, a truck backed into it, netting over the top, and four
     little crossed dipoles on a stick - because an L-band jamming antenna
     really is that small, and that is the whole point of this building. */
  function ewAerialsKpa(THREE, g, M, PZ) {
    /* same 300-degree ring and the same reason: a closed revetment buried the
       gate board and both posts. The KPA plot has no chain-link at all, so the
       berm and its gap ARE the perimeter. */
    const bgK = new THREE.TorusGeometry(12.2, 2.0, 8, 20, Math.PI * 5 / 3);
    bgK.rotateZ(-2.277);              // baked, for the reason given on the ROC berm
    const berm = new THREE.Mesh(bgK, M.earth);
    berm.position.z = PZ + 0.5;
    g.add(berm);
    /* the truck: cab, canvas tilt over the shelter body, six wheels */
    box(THREE, g, M.olive, 2.6, 2.6, 2.5, 8.6, -4.0, PZ + 0.55);          // cab
    box(THREE, g, M.olive, 6.4, 2.7, 2.9, 3.4, -4.0, PZ + 0.60);          // body
    box(THREE, g, M.dark, 6.5, 2.8, 0.30, 3.4, -4.0, PZ + 3.50);          // tilt bows
    for (let i = 0; i < 3; i++) for (const s of [1, -1])
      cyl(THREE, g, M.dark, 0.62, 0.62, 0.42, 8.0 - i * 2.7, -4.0 + s * 1.45, PZ + 0.60);
    /* camouflage netting on four poles over the whole revetment. The KPA hides
       everything, all the time, and the net is the single most recognisable
       thing about a North Korean position. */
    for (const s of [1, -1]) for (const t of [1, -1])
      box(THREE, g, M.steel, 0.10, 0.10, 5.2, 6.0 + s * 6.0, -4.0 + t * 5.2, PZ);
    box(THREE, g, M.net, 12.4, 10.8, 0.10, 6.0, -4.0, PZ + 5.1);
    box(THREE, g, M.net, 0.10, 10.8, 2.2, 12.1, -4.0, PZ + 2.9);
    /* the aerial. Four crossed dipoles on a ground plane at the top of a short
       lattice mast, and nothing else: this station denies satellite navigation
       over the approaches and does very little to anybody's radar. */
    ewMast(THREE, g, M, 4.0, 7.0, PZ, 8.5, 0.70, 3);
    box(THREE, g, M.steel, 2.4, 2.4, 0.14, 4.0, 7.0, PZ + 8.5);           // ground plane
    for (const s of [1, -1]) for (const t of [1, -1]) {
      box(THREE, g, M.white, 0.09, 0.09, 1.15, 4.0 + s * 0.8, 7.0 + t * 0.8, PZ + 8.6);
      box(THREE, g, M.white, 0.80, 0.09, 0.09, 4.0 + s * 0.8, 7.0 + t * 0.8, PZ + 9.7);
    }
    /* two whips for the radio net, and a spoil heap from digging the revetment */
    for (const s of [1, -1])
      box(THREE, g, M.steel, 0.06, 0.06, 4.0, -8.0, 6.0 + s * 1.4, PZ);
    const spoil = new THREE.Mesh(new THREE.SphereGeometry(2.4, 8, 5), M.earth);
    spoil.scale.set(1.6, 1.0, 0.35);
    spoil.position.set(-6.0, -9.5, PZ);
    g.add(spoil);
  }

  BLD_MODELS["ewsite_n"]  = { build(THREE, M, C) { return ewStation(THREE, C, { aerials: ewAerialsNato }); } };
  BLD_MODELS["ewsite_p"]  = { build(THREE, M, C) { return ewStation(THREE, C, { aerials: ewAerialsPactSpn }); } };
  BLD_MODELS["ewsite_p2"] = { build(THREE, M, C) { return ewStation(THREE, C, { aerials: ewAerialsPactMurmansk }); } };
  BLD_MODELS["ewsite_c"]  = { build(THREE, M, C) { return ewStation(THREE, C, { aerials: ewAerialsPla }); } };
  BLD_MODELS["ewsite_r"]  = { build(THREE, M, C) { return ewStation(THREE, C, { aerials: ewAerialsRoc }); } };
  BLD_MODELS["ewsite_k"]  = { build(THREE, M, C) { return ewStation(THREE, C, { aerials: ewAerialsKpa, earthPad: true }); } };

  /* the engine adds a separate rotating mount only when it finds one; these
     models carry their own weapon, so remove any stale generated mounts */
  for (const k of ["def_nest", "def_atpost", "def_flak", "def_sam", "def_coastal", "def_arty",
                   "def_sonararray"])
    delete BLD_MODELS[k];
})();
