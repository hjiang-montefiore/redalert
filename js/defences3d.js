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

  /* the engine adds a separate rotating mount only when it finds one; these
     models carry their own weapon, so remove any stale generated mounts */
  for (const k of ["def_nest", "def_atpost", "def_flak", "def_sam", "def_coastal", "def_arty",
                   "def_sonararray"])
    delete BLD_MODELS[k];
})();
