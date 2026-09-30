/* ============ damage3d.js - what a damaged machine looks like ============
   (owner) "i don't see damaged effect so far."

   MEASURED BEFORE THIS FILE: in 3D a tank on a fifth of its hit points added
   exactly zero objects to the scene - it was drawn from the same template as
   a new one, and smoke existed only for projectiles, explosions and muzzles.
   In 2D one grey puff rose off a building below 45% - and off a REMEMBERED
   enemy building under fog too, which told the player its live health - and
   nothing at all marked a damaged unit (tools/jsc/damage3d_check.py and
   _behtest.html [70] hold the numbers).

   Three stages, read off the health fraction on the same breaks as the
   health bar's colours (render.js and render3d.js: green above 55%, yellow
   above 25%, red below):
     below 70%  thin grey smoke - a hit got inside and something is
                smouldering, while the bar is still green
     below 55%  thick dark smoke and sparks - fuel, oil and wiring are
                burning: the bar has gone yellow
     below 25%  open fire under black smoke - the bar is red
   and nothing at all once repairs bring it back above 70%.

   WHERE it comes out is where the real thing burns, and ON the model: every
   source is put on the mesh's own surface by a ray cast straight down onto
   its triangles, once per model.
   - a tank's fuel and oil live in the engine compartment at the REAR of the
     hull, so it smokes off the engine deck behind the turret, not off the
     turret roof. Trucks and most wheeled and tracked carriers put the power
     pack forward, beside or under the cab, so theirs comes out at the front;
     the vehicles that break that rule are listed by name (ENGINE_AT).
   - a jet's fire is in the engine bay at the tail; a wing-engined aircraft
     burns in one nacelle. The smoke is left in the air where it was made, so
     a damaged aircraft TRAILS it - nothing extra has to be drawn for that.
   - a helicopter burns in the engines on the cabin roof just aft of the mast
     and, worse hit, in the main gearbox under it; its rotor wash drives the
     smoke DOWN and out.
   - a ship burns where it was holed and in the superstructure where the fuel
     and cabling are; a badly holed ship floods on that side, so it LISTS
     toward it and settles lower in the water.
   - a building burns through the roofs of its halls, several fires on a big
     one, and at the foot of a wall; a power plant's transformer yard arcs
     and throws sparks.
   - infantry do not smoke: a wounded rifle squad is people, not a fuel tank.
     A submerged boat cannot make smoke at all.

   PERFORMANCE is the constraint. Two THREE.Points layers made once for the
   whole session (smoke, blended normally; fire and sparks, added), fed from
   fixed-size typed-array pools with a hard cap and a soft shed before it -
   no geometry, material or object is created per puff, per emitter or per
   frame. Only an entity the player can see RIGHT NOW, inside the camera's
   view, gets an emitter; the loop over the world allocates nothing in steady
   state (tools/jsc/damage3d_check.py measures it with the collector off).

   FOG: an enemy that is only remembered - a building under explored fog, a
   boat held by sonar alone - gets no emitter, and when something the player
   was watching goes back under fog its smoke is removed with it, rather than
   left standing over the place it was: at once, while it still has an
   emitter, and also when its emitter had already gone (the view moved away,
   it died) and some of its smoke is still in the air. The AI never reads
   any of this.                                                            */
var Damage3D = (function () {
  const PXM = 0.625;                       // metres per game px (render3d.js)
  const LIGHT = 0.70, HEAVY = 0.55, FIRE = 0.25;
  const SMOKE_CAP = 1800, GLOW_CAP = 700;  // particles, the whole battlefield
  const MAX_SRC = 6;
  /* a point sprite is depth-tested at its centre, so one whose centre is
     inside a mesh is hidden whole behind that mesh's surface: every source
     sits this far clear of the surface it comes out of */
  const LIFT = 0.3;

  /* ---------------- stage, eligibility, sight ---------------- */
  function stageOf(e) {
    if (!e || !(e.maxHp > 0) || !(e.hp < e.maxHp * LIGHT)) return 0;
    const f = e.hp / e.maxHp;
    return f < FIRE ? 3 : f < HEAVY ? 2 : 1;
  }
  function eligible(e) {
    if (!e || e.dead || e.carried || !e.def) return false;
    if (e.kind === "building") {
      if (e.buildProgress < 1) return false;           // scaffolding
      const d = e.def;
      /* concrete, sandbags, steel teeth and a ditch have nothing to burn */
      if (d.obstacle || d.id === "wall" || d.id === "tankditch") return false;
      return true;
    }
    if (e.cat === "infantry") return false;
    if (e.layer === "sub") return false;
    return true;
  }
  /* Seen NOW, not remembered: an enemy structure stays drawn on explored
     ground (fog 1), but what it looks like there is what it looked like when
     it was last seen, so it gets no live smoke. Any tile of the footprint in
     sight is enough - the player can see part of the building. For a unit
     this is exactly render3d's own rule (fog 2 on its tile). */
  function seen(e, G) {
    if (!G.fogEnabled || e.owner === G.human) return true;
    if (e.layer === "sub") return false;
    const fog = G.fog, W = G.map.W;
    if (!fog) return false;
    if (e.kind === "building") {
      const w = e.def.w || 1, h = e.def.h || 1;
      for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++)
          if (fog[(e.ty + y) * W + e.tx + x] === 2) return true;
      return false;
    }
    return fog[e.ty * W + e.tx] === 2;
  }

  /* ---------------- where each class burns ----------------
     A profile is made once per model and holds the sources in the model's
     own frame: +X nose, +Y up, +Z across, metres. */
  /* by role, the level the roster is written at: tanks and the gun and
     flak vehicles built on tank hulls carry the power pack at the back;
     trucks and most carriers, wheeled and tracked, put it forward.
     Multi-engine aircraft carry their engines on the wings; fighters in
     the tail. */
  const REAR_ENGINE = { mbt: 1, lighttank: 1, heavy: 1, spaag: 1, tankdestroyer: 1 };
  /* The vehicles that break their role's rule, by unit id (the era rosters
     are ids of their own). Only layouts that are certain are listed; the
     rest keep the role's. spaag_n is NOT here: rules.js names it a Stryker,
     but the model drawn for it is a Gepard on the Leopard 1 hull with its
     engine deck grilles at the back (units3d.js "Engine deck grilles"), and
     the smoke has to come off the vehicle the player is looking at. */
  const ENGINE_AT = {
    /* engine at the back, in a role that usually carries it forward */
    ifv_p: "rear", pact_e90_ifv: "rear", pact_e00_ifv: "rear",        // BMP-3: UTD-29 under the rear floor
    recon_p: "rear", pact_e50_recon: "rear", pact_e60_recon: "rear",   // BRDM-1/-2: the GAZ V8 at the back
    pact_e80_recon: "rear", pact_e90_recon: "rear", pact_e00_recon: "rear",
    kpa_e60_recon: "rear", kpa_e80_recon: "rear",
    spg_p: "rear", pact_e80_spg: "rear", pact_e90_spg: "rear",         // 2S19 Msta-S: T-72 engine, T-80 hull
    pact_e00_spg: "rear",
    pact_e50_spg: "rear",                                              // SU-100 on the T-34 hull
    spg_k: "rear", kpa_e80_spg: "rear",                                // M-1978 Koksan on a Type 59 tank chassis
    fra_e80_spg: "rear", fra_e90_spg: "rear",                          // GCT AuF1, AMX-30 chassis
    fra_e80_sam: "rear",                                               // Roland 2, AMX-30R chassis
    fra_e60_tel: "rear", fra_e80_tel: "rear",                          // Pluton, AMX-30 chassis
    roc_e50_spg: "rear",                                               // M7 Priest: the Sherman's radial at the back
    gbr_e50_spg: "rear",                                               // Sexton on the Ram
    kpa_e60_ifv: "rear",                                               // BTR-60PB: two GAZ-49B at the back
    pact_e60_btr60: "rear", pact_e80_btr70: "rear",                    // BTR-60PB, BTR-70: twin petrol engines aft
    pact_e90_btr80: "rear", pact_e00_btr82a: "rear",                   // BTR-80, BTR-82A: the KamAZ diesel aft
    deu_e50_ifv: "rear",                                               // HS.30: the Rolls-Royce B81 at the back
    nato_e50_recon: "rear", roc_e50_recon: "rear",                     // M8 Greyhound
    roc_e80_recon: "rear", roc_e90_recon: "rear",                      // V-150 Commando
    gbr_e50_recon: "rear", gbr_e60_recon: "rear",                      // Ferret, Fox
    fra_e60_recon: "rear", fra_e80_recon: "rear",                      // AML-90, ERC-90 Sagaie
    deu_e60_recon: "rear", recon_g: "rear",                            // Luchs, Fennek
    /* engine forward, in a role that usually carries it at the back */
    lt_n: "front", nato_e00_lighttank: "front", atgmv_n: "front",      // Stryker: the C7 front right, by the driver
    lt_b: "front",                                                     // Ajax (ASCOD): power pack front right
    gbr_e60_lighttank: "front", gbr_e80_lighttank: "front",            // CVR(T) Scorpion, Scimitar, Striker:
    gbr_e90_lighttank: "front", gbr_e00_lighttank: "front",            //   the engine front right
    gbr_e80_tankdestroyer: "front", gbr_e90_tankdestroyer: "front",
    gbr_e90_spaag: "front", gbr_e00_spaag: "front", spaag_b: "front",  // Stormer, a stretched CVR(T)
    gbr_e60_tankdestroyer: "front",                                    // FV438 on the FV432
    gbr_e50_tankdestroyer: "front",                                    // Hornet on the Humber 1-ton truck
    fra_e50_lighttank: "front", fra_e60_lighttank: "front",            // AMX-13: engine front right
    fra_e60_spaag: "front", fra_e80_spaag: "front",                    // AMX-13 DCA
    fra_e80_tankdestroyer: "front",                                    // VAB: engine behind the driver
    nato_e60_spaag: "front", nato_e80_spaag: "front",                  // M163 Vulcan on the M113
    nato_e90_spaag: "front", roc_e90_spaag: "front",                   // Avenger on the HMMWV
    roc_e00_spaag: "front", spaag_r: "front", atgmv_r: "front",        // Antelope and TOW on the HMMWV
    roc_e80_spaag: "front",                                            // Chaparral on the M730 (M548 family)
    roc_e50_spaag: "front",                                            // M16 half-track
    spaag_g: "front", atgmv_g: "front",                                // Wiesel 1 and 2: engine front right
    pact_e00_spaag: "front",                                           // Pantsir-S1 on the KAMAZ-6560 truck
    pact_e60_strela10: "front",                                        // Strela-10: the MT-LB engine sits behind the cab
  };
  const WING_ENGINES = { heavybomber: 1, awacs: 1, cawacs: 1, airlift: 1, tanker: 1, ewair: 1, patrol: 1 };
  const OIL = { refinery: 1, derrick: 1, silo: 1, depot: 1 };
  function src(x, y, z, min, o) {
    return { x: x, y: y, z: z, min: min,
             burns: !(o && o.burns === false), sparks: !(o && o.sparks === false),
             sparkOnly: !!(o && o.sparkOnly), sparkFrom: (o && o.sparkFrom) || 2,
             rate: (o && o.rate) || 1, what: (o && o.what) || "", ys: null, ox: 0, oz: 0 };
  }
  function classify(e) {
    if (e.kind === "building") return "bld";
    if (e.layer === "sea") return "ship";
    if (e.layer === "air") return e.def.hover ? "helo" : (WING_ENGINES[e.def.role] ? "wing" : "jet");
    return ENGINE_AT[e.def.id] || (REAR_ENGINE[e.def.role] ? "rear" : "front");
  }
  /* size from the rules when there is no mesh to measure (2D, headless) */
  function estimate(e) {
    const d = e.def, MS = (typeof CFG !== "undefined" && CFG.MODEL_SCALE) || 1.4;
    if (e.kind === "building") {
      const BS = (typeof CFG !== "undefined" && CFG.BLD_SCALE) || 1.1;
      const hM = (d.cat === "defense" ? 4 : d.id === "conyard" ? 16 : 11) * BS;
      const L = (d.w || 1) * 20 * BS * 0.92, W = (d.h || 1) * 20 * BS * 0.92;
      return { minX: -L / 2, maxX: L / 2, minY: 0, maxY: hM, minZ: -W / 2, maxZ: W / 2,
               hMinX: -L / 2, hMaxX: L / 2, deckY: hM, hubX: 0, hubY: hM };
    }
    let L = (e.r || 10) * 2.1 * PXM * MS;
    if (e.layer === "sea") L *= 1.9; else if (e.layer === "air") L *= 1.22;
    /* proportions measured on the models: an Abrams 29.4 x 11.4 x 10.2 m,
       a Burke 69.8 x 9.2 x 24.0 m (mast included), an F-16 33.6 x 19.8 m */
    const W = L * (e.layer === "air" ? 0.6 : e.layer === "sea" ? 0.14 : 0.4);
    const H = L * (e.layer === "air" ? 0.28 : e.layer === "sea" ? 0.34 : 0.35);
    return { minX: -L / 2, maxX: L / 2, minY: 0, maxY: H, minZ: -W / 2, maxZ: W / 2,
             hMinX: -L / 2, hMaxX: L / 2, deckY: H * 0.45, hubX: 0, hubY: H };
  }

  /* ---------------- measuring the model, once per model ----------------
     The instance is measured in its OWN frame, lifted off its group for the
     moment (the renderer recomputes every world matrix before it draws, so
     nothing is left displaced), with the gun laid forward - a tank met with
     its turret traversed measures 19 m wide instead of 11 (measured).
     Every source is then put ON the mesh: a ray straight down at the chosen
     point, against the real triangles, finds the surface the fire has to
     come out of. The first version placed sources on the bounding box, and
     measured in render3d's own groups a power plant's roof fire hung at
     28.6 m over a 12.3 m roof, a refinery's had 31 m of open air under it,
     a factory's "wall-foot" fire sat 6.5 m up INSIDE a 15.9 m hall - where
     the sprite is hidden by the wall and a 0.3-0.55 s flame never climbs
     out - and a Msta's engine smoke came off the muzzle, 4-5 m ahead of the
     hull, because the box ran to the end of the laid gun.
     Rotors are left out: they turn, so a helicopter measured with its blades
     changes with the blade angle (by 30 m on the Apache, measured), and
     nothing burns on a blade tip. The turret is left out of the HULL box
     that places an engine, for the same reason as the gun, and out of the
     surface every source is set on: it turns. */
  let _va = null, _v = null, _pt = { x: 0, z: 0, set: function (x, y, z) { this.x = x; this.z = z; return this; } };
  const SPINS = { rotor: 1, tailrotor: 1, rotordisc: 1 };
  function tools() {
    if (_va) return;
    _va = new THREE.Vector3(); _v = new THREE.Vector3();
  }
  /* Every question asked of the mesh here is "how high is its surface at
     (x, z)?" - a ray straight down. So the model's triangles are put in its
     own frame once, binned by the ground each one covers, and a ray only
     looks at the few in its cell: is the point inside the triangle's
     footprint, and how high is the triangle there. Both faces count (a
     mirrored part's top face points down); a wall seen edge-on covers no
     ground and is never a top. (A true ray tested against every triangle of
     a Burke's 10,816 took 60-156 ms for one profile under jsc, measured;
     binned, a whole profile is a one-off 2-10 ms per model the first time a
     damaged one comes into view: median of 5 under jsc, a tank 1.9 ms, a
     gunship 2.1, a Burke 9.4, a factory 6.3, the power plant 9.8.) */
  function triGrid(list, B, turning) {
    let n = 0;
    for (let k = 0; k < list.length; k++) {
      if (!list[k].t !== !turning) continue;
      const g = list[k].m.geometry;
      n += ((g.index ? g.index.count : g.attributes.position.count) / 3) | 0;
    }
    const V = new Float32Array(n * 9);
    let t = 0;
    for (let k = 0; k < list.length; k++) {
      if (!list[k].t !== !turning) continue;
      const m = list[k].m, g = m.geometry, pos = g.attributes.position, idx = g.index;
      const cnt = idx ? idx.count : pos.count, e = m.matrixWorld.elements;
      /* the plain float array when there is one: an affine transform read
         straight off it is several times quicker than a vector per vertex */
      const A = !pos.isInterleavedBufferAttribute && !pos.normalized && pos.itemSize === 3 ? pos.array : null;
      const I = idx ? idx.array : null;
      for (let q = 0; q + 2 < cnt; q += 3, t++)
        for (let v = 0; v < 3; v++) {
          const vi = I ? I[q + v] : q + v;
          let x, y, z;
          if (A) { x = A[vi * 3]; y = A[vi * 3 + 1]; z = A[vi * 3 + 2]; }
          else { x = pos.getX(vi); y = pos.getY(vi); z = pos.getZ(vi); }
          const o = t * 9 + v * 3;
          V[o] = e[0] * x + e[4] * y + e[8] * z + e[12];
          V[o + 1] = e[1] * x + e[5] * y + e[9] * z + e[13];
          V[o + 2] = e[2] * x + e[6] * y + e[10] * z + e[14];
        }
    }
    const x0 = B.min.x, z0 = B.min.z, L = B.max.x - x0, W = B.max.z - z0;
    const cs = Math.max(0.75, Math.max(L, W) / 64);
    const nx = Math.max(1, Math.ceil(L / cs)), nz = Math.max(1, Math.ceil(W / cs));
    const start = new Int32Array(nx * nz + 1);
    const cellsOf = (o, f) => {
      const i0 = Math.max(0, Math.floor((Math.min(V[o], V[o + 3], V[o + 6]) - x0) / cs));
      const i1 = Math.min(nx - 1, Math.floor((Math.max(V[o], V[o + 3], V[o + 6]) - x0) / cs));
      const j0 = Math.max(0, Math.floor((Math.min(V[o + 2], V[o + 5], V[o + 8]) - z0) / cs));
      const j1 = Math.min(nz - 1, Math.floor((Math.max(V[o + 2], V[o + 5], V[o + 8]) - z0) / cs));
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) f(j * nx + i);
    };
    for (let q = 0; q < t; q++) cellsOf(q * 9, (c) => { start[c + 1]++; });
    for (let c = 0; c < nx * nz; c++) start[c + 1] += start[c];
    const fill = start.slice(0, nx * nz), items = new Int32Array(start[nx * nz]);
    for (let q = 0; q < t; q++) cellsOf(q * 9, (c) => { items[fill[c]++] = q; });
    return { V: V, x0: x0, z0: z0, cs: cs, nx: nx, nz: nz, start: start, items: items };
  }
  /* the top of the mesh at (x, z); -Infinity is bare air */
  function topAt(T, x, z) {
    const i = Math.floor((x - T.x0) / T.cs), j = Math.floor((z - T.z0) / T.cs);
    if (i < 0 || j < 0 || i >= T.nx || j >= T.nz) return -Infinity;
    const c = j * T.nx + i, V = T.V;
    let best = -Infinity;
    for (let q = T.start[c]; q < T.start[c + 1]; q++) {
      const o = T.items[q] * 9, ax = V[o], ay = V[o + 1], az = V[o + 2];
      const e1x = V[o + 3] - ax, e1z = V[o + 5] - az, e2x = V[o + 6] - ax, e2z = V[o + 8] - az;
      const det = e1x * e2z - e2x * e1z;
      if (det > -1e-9 && det < 1e-9) continue;
      const px = x - ax, pz = z - az;
      const u = (px * e2z - e2x * pz) / det, v = (e1x * pz - px * e1z) / det;
      if (u < -1e-6 || v < -1e-6 || u + v > 1 + 1e-6) continue;
      const y = ay + u * (V[o + 4] - ay) + v * (V[o + 7] - ay);
      if (y > best) best = y;
    }
    return best;
  }
  /* the median of five rays a little apart: a lone mast, aerial or rail
     does not decide where the surface is, and neither does a small gap */
  const _h5 = [0, 0, 0, 0, 0];
  function surfAt(T, x, z, r) {
    _h5[0] = topAt(T, x, z); _h5[1] = topAt(T, x + r, z); _h5[2] = topAt(T, x - r, z);
    _h5[3] = topAt(T, x, z + r); _h5[4] = topAt(T, x, z - r);
    _h5.sort((a, b) => a - b);
    return _h5[2];
  }
  function measure(e, rec) {
    const inst = rec && rec.inst;
    if (!inst || typeof THREE === "undefined") return null;
    tools();
    const par = inst.parent;
    inst.parent = null;
    let tur0 = null, tz = 0, P = null;
    inst.traverse((o) => { if (!tur0 && (o.name === "turret" || o.name === "mountwrap")) tur0 = o; });
    if (tur0) { tz = tur0.rotation.z; tur0.rotation.z = 0; }
    try {
      inst.updateMatrixWorld(true);
      const M = { list: [], box: new THREE.Box3(), hull: new THREE.Box3(), tbox: new THREE.Box3(), tur: null, rot: null, inst: inst, T: null, sweep: null };
      const bx = new THREE.Box3();
      const walk = (o, inTur) => {
        if (SPINS[o.name]) { if (!M.rot && o.name === "rotor") M.rot = o; return; }
        if (!M.tur && o.name === "turret") M.tur = o;
        const t = inTur || o.name === "turret" || o.name === "mountwrap";
        const geo = o.isMesh && o.geometry;
        /* a structure burns through its roofs, not through a camouflage net
           spread over one (render3d's 1980s kit is 62% opaque): on a burning
           building a see-through mesh is no surface. With the net stood on
           the roof, 23 of 133 roof fires lit on twelve burning structures -
           every one of them under a net - burned on the net itself, 2.7 to
           4.7 m over the roof (tools/jsc/fixtures3d_check.js). */
        const sheer = e.kind === "building" && o.isMesh &&
          [].concat(o.material).every((m) => m && m.transparent && m.opacity < 0.9);
        if (geo && geo.attributes && geo.attributes.position && !sheer) {
          if (!geo.boundingBox) geo.computeBoundingBox();
          bx.copy(geo.boundingBox).applyMatrix4(o.matrixWorld);
          M.box.union(bx);
          if (!t) M.hull.union(bx); else M.tbox.union(bx);
          M.list.push({ m: o, t: t });
        }
        for (let i = 0; i < o.children.length; i++) walk(o.children[i], t);
      };
      walk(inst, false);
      if (!M.box.isEmpty()) {
        /* a turret or gun mount turns to its target, so nothing is placed on
           it: an M109's engine smoke sat on its laid barrel, 1.7 m above the
           front deck it would float over as soon as the gun traversed. The
           turret gets a grid of its own, to keep sources out from under it. */
        M.T = triGrid(M.list, M.box, false);
        M.Tt = M.tbox.isEmpty() ? null : triGrid(M.list, M.box, true);
        const B = M.box, Hb = M.hull.isEmpty() ? B : M.hull;
        const b = { minX: B.min.x, maxX: B.max.x, minY: B.min.y, maxY: B.max.y, minZ: B.min.z, maxZ: B.max.z,
                    hMinX: Hb.min.x, hMaxX: Hb.max.x, deckY: B.min.y + (B.max.y - B.min.y) * 0.55,
                    hubX: (B.min.x + B.max.x) / 2, hubY: B.max.y };
        /* a turret group sits on its ring, which is the level of the deck */
        if (M.tur) { M.tur.getWorldPosition(_v); if (_v.y > b.minY && _v.y < b.maxY) b.deckY = _v.y; }
        /* the mast is where the rotor group is fixed */
        if (M.rot) { M.rot.getWorldPosition(_v); b.hubX = _v.x; }
        /* the circle a building's gun mount sweeps as it traverses: a fire
           under it would be hidden by the mount at every bearing it takes */
        if (tur0 && !M.tbox.isEmpty()) {
          tur0.getWorldPosition(_v);
          const T0 = M.tbox, dx = Math.max(Math.abs(T0.min.x - _v.x), Math.abs(T0.max.x - _v.x)),
                dz = Math.max(Math.abs(T0.min.z - _v.z), Math.abs(T0.max.z - _v.z));
          M.sweep = { x: _v.x, z: _v.z, r: Math.sqrt(dx * dx + dz * dz), y: T0.min.y };
        }
        P = buildProfile(e, b, M);
      }
    } catch (err) { P = null; }
    if (tur0) tur0.rotation.z = tz;
    inst.parent = par;
    return P;
  }
  function hash(n) {                         /* a fixed scatter per entity */
    n = (n ^ 61) ^ (n >>> 16); n = n + (n << 3); n = n ^ (n >>> 4);
    n = Math.imul(n, 0x27d4eb2d); n = n ^ (n >>> 15);
    return (n >>> 0) / 4294967296;
  }
  /* a source's height: on the surface when there is a mesh to measure, else
     the proportion of the box the estimate gives. The surface straight under
     the point wins - lower than its neighbours (the spine between two engine
     nacelles) or a little proud of them (a gearbox fairing, a hatch) - but
     not when it stands a metre and more above them: that is a mast, and the
     median of the five says where the roof is. */
  function onMesh(M, x, z, r, fallback) {
    if (!M) return fallback;
    const s = surfAt(M.T, x, z, r), c = topAt(M.T, x, z);
    const y = c > -Infinity && (c < s || c - s < 1.0) ? c : s;
    return y > -Infinity ? y + LIFT : fallback;
  }
  /* is the hull at (x, z) under the turret or its laid gun? */
  function covered(M, x, z) {
    return !!(M && M.Tt) && topAt(M.Tt, x, z) > topAt(M.T, x, z);
  }
  /* the first point from (x, z) along (dx, dz), half a metre at a time, with
     the model under it: a truck's engine bay picked in the gap between cab
     and body moves onto the cab, not into the air over the gap */
  function onto(M, x, z, dx, dz, maxM) {
    if (!M) return _pt.set(x, 0, z);
    for (let d = 0; d <= maxM; d += 0.5)
      if (topAt(M.T, x + dx * d, z + dz * d) > -Infinity) return _pt.set(x + dx * d, 0, z + dz * d);
    return _pt.set(x, 0, z);
  }
  function buildProfile(e, b, M) {
    const L = b.maxX - b.minX, W = b.maxZ - b.minZ, H = b.maxY - b.minY;
    const cx = (b.minX + b.maxX) / 2, cz = (b.minZ + b.maxZ) / 2;
    const hL = b.hMaxX - b.hMinX;           // the hull without its turret and gun
    const cls = classify(e);
    const P = { cls: cls, L: L, W: W, H: H, minY: b.minY, k: 1, radius: 0, srcs: [],
                trail: false, ship: cls === "ship", heli: cls === "helo", bld: cls === "bld", onMesh: !!M };
    const S = P.srcs;
    if (cls === "rear") {
      /* the engine deck: between the turret bustle and the rear plate, and
         aft of the bustle where the bustle overhangs it (a Leopard 2's, a
         Challenger's) - the grilles are the part of the deck left open */
      let p = onto(M, b.hMinX + hL * 0.17, cz, 1, 0, hL * 0.3), x = p.x, z = p.z;
      for (let d = 0.5; d <= hL * 0.12 && covered(M, x, z); d += 0.5)
        if (!covered(M, p.x - d, z) && topAt(M.T, p.x - d, z) > -Infinity) { x = p.x - d; break; }
      S.push(src(x, onMesh(M, x, z, 0.5, b.deckY + H * 0.04), z, 1, { what: "engine deck" }));
      P.k = U_clamp(L / 22, 0.6, 2.2);
    } else if (cls === "front") {
      /* the engine bay: under the cab of a truck, and on a tracked or
         wheeled carrier beside the driver - front RIGHT on the M113, the
         Bradley, the M109, the Stryker, the BMP-1 and -2 and CVR(T) - which
         is where it goes when the gun, laid forward, lies over the middle of
         the front deck (+Z is the vehicle's right) */
      let p = onto(M, b.hMaxX - hL * 0.22, cz, 1, 0, hL * 0.2), x = p.x, z = p.z;
      if (covered(M, x, z)) {
        const zs = [cz + W * 0.22, cz - W * 0.22];
        for (let k = 0; k < 2; k++)
          if (!covered(M, x, zs[k]) && topAt(M.T, x, zs[k]) > -Infinity) { z = zs[k]; break; }
      }
      S.push(src(x, onMesh(M, x, z, 0.5, b.minY + H * 0.62), z, 1, { what: "engine bay" }));
      P.k = U_clamp(L / 22, 0.55, 2.0);
    } else if (cls === "jet") {
      /* the nozzle is the open end of the fuselage, not a surface under a
         ray: the box places it */
      S.push(src(b.minX + L * 0.03, b.minY + H * 0.42, cz, 1, { sparks: false, what: "tail nozzle" }));
      P.k = U_clamp(L / 20, 0.7, 2.0); P.trail = true;
    } else if (cls === "wing") {
      /* one nacelle on fire, the same one for the life of the aircraft */
      const side = hash(e.id) < 0.5 ? -1 : 1;
      S.push(src(cx + L * 0.06, b.minY + H * 0.34, cz + side * W * 0.24, 1,
                 { sparks: false, what: "engine nacelle" }));
      P.k = U_clamp(L / 26, 0.8, 2.4); P.trail = true;
    } else if (cls === "helo") {
      /* the engines sit either side of the spine just aft of the mast, the
         gearbox on the cabin roof under it: both on the surface there */
      const xe = b.hubX - L * 0.10;
      S.push(src(xe, onMesh(M, xe, cz, 0.4, b.hubY - H * 0.18), cz, 1, { sparks: false, what: "engine" }));
      S.push(src(b.hubX, onMesh(M, b.hubX, cz, 0.6, b.hubY - H * 0.06), cz, 2,
                 { sparks: false, burns: false, what: "main gearbox" }));
      P.k = U_clamp(L / 20, 0.7, 1.8); P.trail = true;
    } else if (cls === "ship") {
      /* the hole is at the deck edge on the side and end the damage came
         from, chosen per ship when it is hit (attachEm); the deck is not level
         end to end - a fo'c'sle stands above a flight deck - so each of the
         four places has its own height */
      const hx = L * 0.26, fb = b.minY + H * 0.36;
      /* the deck edge: in from the widest point of the box (a flight deck's
         overhang, a missile boat's sponsons) to the first deck under it */
      let hz = W * 0.40;
      if (M) {
        const zs = [];
        for (let v = 0; v < 4; v++) {
          const fx = v < 2 ? 1 : -1, fz = v % 2 ? -1 : 1;
          let z = W * 0.42;
          for (; z > W * 0.1; z -= 0.5) {
            surfAt(M.T, cx + fx * hx, cz + fz * z, 0.6);
            if (topAt(M.T, cx + fx * hx, cz + fz * z) > -Infinity && _h5[4] - _h5[0] < 0.8) break;
          }
          zs.push(z);
        }
        hz = Math.min.apply(null, zs);
      }
      const hit = src(hx, fb, hz, 1, { what: "hit area" });
      hit.ys = [onMesh(M, cx + hx, cz + hz, 0.6, fb), onMesh(M, cx + hx, cz - hz, 0.6, fb),
                onMesh(M, cx - hx, cz + hz, 0.6, fb), onMesh(M, cx - hx, cz - hz, 0.6, fb)];
      hit.ox = cx; hit.oz = cz;           // mirrored about the hull's own middle
      S.push(hit);
      /* the superstructure: the highest ROOF along the middle of the ship -
         a patch where five rays a metre apart all land within half a metre
         of each other, so the top of a mast, a radar or a funnel rim does
         not count as a deckhouse, and the fire does not start at the foot of
         a mast's wall, where the ship's roll alone would bury it */
      let sx = cx + L * 0.04, sy = b.minY + H * 0.58, sz = cz;
      if (M) {
        let best = -Infinity;
        const r = Math.max(1.0, W * 0.1);
        for (let i = 0; i <= 32; i++) for (let k = -1; k <= 1; k++) {
          const x = b.minX + L * (0.1 + 0.8 * i / 32), z = cz + k * W * 0.2;
          const m = surfAt(M.T, x, z, r);
          if (m > best && _h5[4] - _h5[0] < 0.5) { best = m; sx = x; sz = z; }
        }
        if (best > -Infinity) sy = Math.max(best, topAt(M.T, sx, sz)) + LIFT;
      }
      S.push(src(sx, sy, sz, 2, { rate: 1.3, what: "superstructure" }));
      P.k = U_clamp(L / 30, 1.2, 3.4);
    } else {
      bldSources(e, b, M, P);
      P.k = U_clamp(Math.sqrt(L * W) / 28, 0.8, 2.4);
      P.oil = !!OIL[e.def.id];
    }
    P.radius = Math.max(L, W) * 0.6 + 14 + 18 * P.k;       // the column, not just the hull
    return P;
  }
  function U_clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* ---------------- a building: roofs, the foot of a wall ----------------
     A fire in a building burns in the halls and vents through their ROOFS,
     so the roof sources go on the broad, level tops of the enclosed volumes -
     a hall, a tank, an annex - found on a height map of the real mesh cast
     at 3 m spacing. A mast, a lamp, a chimney or a rim is one cell wide and
     never counts; the biggest roof takes more than one fire. One fire more
     burns on the ground at the foot of the main hall's wall, on the side the
     default camera looks at (render3d's yaw of -45 degrees puts it at +X,
     -Z), where stores and spilled fuel burn out through the doors. */
  /* heights are from the ground the building stands on, which is y = 0 in
     its own frame: render3d sets the group on the terrain. A silo or a pier
     reaches below it, so the bottom of the box is not the ground. */
  const ROOF_MIN = 3.0, STEP = 1.2, GROUND = 1.2;
  function heightMap(T, b) {
    const L = b.maxX - b.minX, W = b.maxZ - b.minZ;
    const nx = U_clamp(Math.round(L / 3), 6, 24), nz = U_clamp(Math.round(W / 3), 6, 24);
    const hm = { nx: nx, nz: nz, dx: L / nx, dz: W / nz, x0: b.minX, z0: b.minZ, y0: 0,
                 h: new Float32Array(nx * nz), hit: new Uint8Array(nx * nz) };
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
      const t = topAt(T, b.minX + (i + 0.5) * hm.dx, b.minZ + (j + 0.5) * hm.dz);
      hm.h[j * nx + i] = t > -Infinity ? t : 0;
      hm.hit[j * nx + i] = t > -Infinity ? 1 : 0;
    }
    return hm;
  }
  function roofs(hm) {
    const nx = hm.nx, nz = hm.nz, h = hm.h, top = hm.y0 + ROOF_MIN;
    const lab = new Int16Array(nx * nz).fill(-1), out = [];
    const nb = (c, f) => {
      const i = c % nx, j = (c / nx) | 0;
      if (i > 0) f(c - 1); if (i < nx - 1) f(c + 1); if (j > 0) f(c - nx); if (j < nz - 1) f(c + nx);
    };
    for (let s = 0; s < nx * nz; s++) {
      if (lab[s] >= 0 || h[s] < top) continue;
      const id = out.length, cells = [s];
      lab[s] = id;
      for (let k = 0; k < cells.length; k++) {
        const c = cells[k];
        nb(c, (d) => { if (lab[d] < 0 && h[d] >= top && Math.abs(h[d] - h[c]) <= STEP) { lab[d] = id; cells.push(d); } });
      }
      let si = 0, sj = 0;
      for (let k = 0; k < cells.length; k++) { si += cells[k] % nx; sj += (cells[k] / nx) | 0; }
      const inner = cells.filter((c) => { let all = true; nb(c, (d) => { if (lab[d] !== id) all = false; }); return all; });
      out.push({ id: id, cells: cells, inner: inner, n: cells.length, ci: si / cells.length, cj: sj / cells.length, used: 0 });
    }
    return { list: out, lab: lab, nb: nb };
  }
  function bldSources(e, b, M, P) {
    const d = e.def, area = (d.w || 1) * (d.h || 1), S = P.srcs;
    const n = area >= 9 ? 4 : area >= 6 ? 3 : area >= 4 ? 2 : 1;
    const L = b.maxX - b.minX, W = b.maxZ - b.minZ, H = b.maxY - b.minY;
    const cx = (b.minX + b.maxX) / 2, cz = (b.minZ + b.maxZ) / 2;
    const minFor = (k) => k === 0 ? 1 : k >= 3 ? 3 : 2;
    let placed = false;
    if (M) {
      const hm = heightMap(M.T, b), nx = hm.nx;
      /* cells under a gun mount's sweep are not roofs a fire can be seen on
         - unless that is all there is */
      if (M.sweep) {
        const w = M.sweep, keep = new Uint8Array(hm.hit), h0 = Float32Array.from(hm.h);
        let left = 0;
        for (let c = 0; c < hm.h.length; c++) {
          const x = hm.x0 + ((c % nx) + 0.5) * hm.dx, z = hm.z0 + (((c / nx) | 0) + 0.5) * hm.dz;
          if ((x - w.x) * (x - w.x) + (z - w.z) * (z - w.z) < w.r * w.r && hm.h[c] < w.y + 0.5) { hm.hit[c] = 0; hm.h[c] = 0; }
          else if (hm.hit[c]) left++;
        }
        if (!left) { hm.hit.set(keep); hm.h.set(h0); }
      }
      const R = roofs(hm);
      const cand = R.list.filter((p) => p.n >= 2);
      if (!cand.length) cand.push.apply(cand, R.list);
      if (!cand.length) {
        /* nothing a storey high: a sandbagged nest, a gun pit. What burns is
           inside it - ammunition, the crew's kit - so the fire is on its
           floor, the middle first */
        const cells = [];
        for (let c = 0; c < hm.h.length; c++) if (hm.hit[c]) cells.push(c);
        if (cells.length) {
          let si = 0, sj = 0;
          for (let k = 0; k < cells.length; k++) { si += cells[k] % nx; sj += (cells[k] / nx) | 0; }
          cand.push({ cells: cells, inner: [], n: cells.length, ci: si / cells.length, cj: sj / cells.length, used: 0, low: true });
        }
      }
      cand.sort((p, q) => q.n - p.n);
      if (cand.length) {
        const X = (c) => hm.x0 + ((c % nx) + 0.5) * hm.dx, Z = (c) => hm.z0 + (((c / nx) | 0) + 0.5) * hm.dz;
        /* the foot of the main hall's wall: a cell of the model's own ground
           (an apron, a pier - never bare air, which may be water) beside it,
           on the camera's side and with nothing tall between it and the
           camera (a cooling tower in front of it would hide the fire from
           every default view), pulled in toward the wall while the ground
           stays bare */
        let foot = null;
        if (n >= 2 && !cand[0].low) {
          const main = cand[0];
          const open = (g) => {
            let i = g % nx, j = (g / nx) | 0;
            for (let st = 0; st < 3; st++) {
              i++; j--;
              if (i >= nx || j < 0) return true;
              if (hm.h[j * nx + i] > 6) return false;
            }
            return true;
          };
          const bare = (t) => t > -0.5 && t < GROUND;
          let gc = -1, wc = -1, gs = -Infinity;
          for (let q = 0; q < main.cells.length; q++) {
            const c = main.cells[q];
            R.nb(c, (g) => {
              if (!hm.hit[g] || !bare(hm.h[g]) || hm.h[c] - hm.h[g] < ROOF_MIN) return;
              const s = (X(g) - cx) - (Z(g) - cz) + (open(g) ? 1e4 : 0);
              if (s > gs) { gs = s; gc = g; wc = c; }
            });
          }
          if (gc >= 0) {
            const ux = Math.sign(X(wc) - X(gc)), uz = Math.sign(Z(wc) - Z(gc));
            let fx = X(gc), fz = Z(gc), fy = hm.h[gc] + 0.4;
            for (let st = 1; st <= 3; st++) {
              const tx = X(gc) + ux * 0.4 * st, tz = Z(gc) + uz * 0.4 * st, t = topAt(M.T, tx, tz);
              if (!bare(t)) break;
              fx = tx; fz = tz; fy = t + 0.4;
            }
            foot = src(fx, fy, fz, 2, { what: "footprint" });
          }
        }
        /* with no ground of its own beside a wall (a silo, a pier over the
           water) the fire that would have burned there burns on a roof */
        const nRoof = foot ? n - 1 : n, chosen = [];
        for (let k = 0; k < nRoof; k++) {
          /* the roof with the most area per fire already on it ... */
          let p = cand[0], ps = -1;
          for (let q = 0; q < cand.length; q++) {
            /* (a roof with no fire yet wins a tie) */
            const s = cand[q].n / (1 + cand[q].used) + (cand[q].used ? 0 : 0.01);
            if (s > ps) { ps = s; p = cand[q]; }
          }
          /* ... and on it the middle first, then the cell farthest from the
             fires already burning, an inner cell rather than an edge */
          const pool = p.inner.length ? p.inner : p.cells;
          let best = pool[0], bs = -Infinity;
          for (let q = 0; q < pool.length; q++) {
            const c = pool[q], ci = c % nx, cj = (c / nx) | 0;
            let s;
            if (!chosen.length) s = -((ci - p.ci) * (ci - p.ci) + (cj - p.cj) * (cj - p.cj));
            else { s = Infinity; for (let m = 0; m < chosen.length; m++) { const o = chosen[m], di = ci - o % nx, dj = cj - ((o / nx) | 0); s = Math.min(s, di * di + dj * dj); } }
            if (s > bs) { bs = s; best = c; }
          }
          if (chosen.indexOf(best) >= 0) break;          // nowhere new left to burn
          chosen.push(best); p.used++;
          S.push(src(X(best), hm.h[best] + LIFT, Z(best), minFor(S.length), { what: "roof" }));
        }
        if (foot) S.splice(1, 0, foot);
        for (let k = 0; k < S.length; k++) S[k].min = minFor(k);
        placed = true;
      }
      if (d.id === "power") {
        /* The transformer yard and the switch house arc as soon as the plant
           is hit hard enough to smoke at all. BLD_MODELS.power
           (js/hero/power_diesel_station.js) stands its two step-up
           transformers in firewalled bays south of the engine hall, the HV
           bushings of each in a row along its south edge at model y -15.0;
           the model's own frame is found from its node, and the ray puts the
           sparks on the middle bushing of the east transformer, at model
           (-6.5, -15.0), where the jumper from the gantry lands on it. */
        const node = M.inst.children[0];
        let sx = cx + L * 0.34, sz = cz - W * 0.34, sy = onMesh(M, sx, sz, 0.6, H * 0.2);
        if (node && !node.isMesh && Math.abs(node.rotation.x + Math.PI / 2) < 1e-3) {
          _v.set(-6.5, -15.0, 0).applyMatrix4(node.matrixWorld);
          /* the bushing's own top, unless the ray met the wire above it */
          const m5 = surfAt(M.T, _v.x, _v.z, 0.6), c = topAt(M.T, _v.x, _v.z);
          const t = c > m5 && c - m5 < 3 ? c : m5;
          if (t > 1.5) { sx = _v.x; sz = _v.z; sy = t + LIFT; }
        }
        S.push(src(sx, sy, sz, 1, { sparkOnly: true, sparkFrom: 1, rate: 2.2, what: "switchgear" }));
      }
    }
    if (!placed) {
      /* no mesh (2D, headless): the proportions of the plot */
      S.length = 0;
      for (let i = 0; i < n; i++) {
        const u = hash(e.id * 7 + i * 131 + 3), v = hash(e.id * 13 + i * 71 + 9);
        if (i === 1) S.push(src(cx + (u < 0.5 ? -1 : 1) * (L * 0.5 + 1.0), 0.4, cz + (v - 0.5) * W * 0.6, 2, { what: "footprint" }));
        else S.push(src(cx + (u - 0.5) * L * 0.6, b.maxY + LIFT, cz + (v - 0.5) * W * 0.6, minFor(i), { what: "roof" }));
      }
      if (d.id === "power")
        S.push(src(cx + L * 0.34, b.minY + H * 0.32, cz - W * 0.34, 1, { sparkOnly: true, sparkFrom: 1, rate: 2.2, what: "switchgear" }));
    }
  }

  /* profiles, keyed without building a string (this runs every frame for
     a damaged entity just off screen): kind -> def id -> era, and for a
     building the army too - render3d restyles a structure and tops it with
     a different rooftop fixture for each */
  const cacheM = { u: {}, b: {} }, cacheE = { u: {}, b: {} };
  function profileFor(e, rec) {
    const C = (rec && rec.inst ? cacheM : cacheE)[e.kind === "building" ? "b" : "u"];
    let per = C[e.def.id];
    if (!per) per = C[e.def.id] = {};
    const era = (e.owner && e.owner.era) || "e20";
    let P = per[era];
    if (e.kind === "building") {
      if (!P) P = per[era] = new Map();
      const col = e.owner && e.owner.color, style = col ? (col.fac || col.main) : "";
      let Q = P.get(style);
      if (!Q) { Q = (rec && rec.inst && measure(e, rec)) || buildProfile(e, estimate(e), null); P.set(style, Q); }
      return Q;
    }
    if (!P) P = per[era] = (rec && rec.inst && measure(e, rec)) || buildProfile(e, estimate(e), null);
    return P;
  }

  /* ---------------- particles ---------------- */
  function lin(c) { return Math.pow(c, 2.2); }
  /* kind: pool, rgb (linear), alpha, size start/end (x k), life, rise, spread,
     vertical drag, wind coupling, gravity */
  const KIND = [
    /* light smoke is a mid grey, not white: over desert sand (the Hormuz
       ground is ~0.7) a pale plume simply vanishes from above */
    { glow: 0, r: lin(0.50), g: lin(0.50), b: lin(0.49), a: 0.46, s0: 1.2, s1: 6.5, l0: 2.6, l1: 3.4, v0: 3.5, v1: 5.0, sp: 0.6, drag: 0.18, wind: 0.55, grav: 0 },
    /* a fire's plume is buoyant: it climbs several model heights before it
       spreads, narrow at the source and widening as it goes */
    { glow: 0, r: lin(0.20), g: lin(0.19), b: lin(0.18), a: 0.50, s0: 1.6, s1: 9.0, l0: 3.0, l1: 4.0, v0: 5.0, v1: 7.0, sp: 0.7, drag: 0.16, wind: 0.5, grav: 0 },
    { glow: 0, r: lin(0.09), g: lin(0.085), b: lin(0.08), a: 0.60, s0: 2.0, s1: 12.0, l0: 3.4, l1: 4.6, v0: 7.0, v1: 10.0, sp: 0.8, drag: 0.15, wind: 0.45, grav: 0 },
    /* fire: HDR orange so bloom picks it up; it cools and shrinks as it rises */
    { glow: 1, r: 2.6, g: 1.05, b: 0.26, a: 0.92, s0: 2.8, s1: 0.9, l0: 0.30, l1: 0.55, v0: 2.5, v1: 4.5, sp: 0.55, drag: 0.8, wind: 0.2, grav: 0 },
    /* sparks: white-hot fragments on a ballistic arc - drawn about a metre
       across, several times life size, or at RTS zoom they are one pixel */
    { glow: 1, r: 3.2, g: 2.3, b: 1.0, a: 1.0, s0: 1.3, s1: 0.8, l0: 0.35, l1: 0.8, v0: 5.0, v1: 10.0, sp: 5.0, drag: 0.05, wind: 0, grav: 9.8 },
  ];
  const K_LIGHT = 0, K_HEAVY = 1, K_BLACK = 2, K_FIRE = 3, K_SPARK = 4;
  const SMOKE_RATE = [0, 7, 10, 12];                // puffs a second per source
  const FIRE_RATE = 20, SPARK_RATE = 4.5;
  /* nothing lives longer than this: after it, an entity has no smoke left */
  const MAX_LIFE = Math.max.apply(null, KIND.map((K) => K.l1)) + 0.2;

  function Pool(cap) {
    this.cap = cap; this.n = 0;
    this.pos = new Float32Array(cap * 3);   // these three ARE the GPU attributes
    this.col = new Float32Array(cap * 4);
    this.size = new Float32Array(cap);
    this.vel = new Float32Array(cap * 3);
    this.age = new Float32Array(cap); this.life = new Float32Array(cap);
    this.s0 = new Float32Array(cap); this.s1 = new Float32Array(cap);
    this.a0 = new Float32Array(cap); this.kind = new Uint8Array(cap);
    this.owner = new Int32Array(cap);
    this.pts = null; this.shown = false;
    this.born = 0;                         // lifetime count, for the tests
  }
  const smoke = new Pool(SMOKE_CAP), glow = new Pool(GLOW_CAP);

  let seed = 0x2545f491;
  function rnd() { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return (seed >>> 0) / 4294967296; }

  /* Past three quarters full the pool is fed at a falling rate, so a big
     fight thins every column a little instead of starving the newest one. */
  function shed(p) { const f = p.n / p.cap; return f < 0.75 ? 1 : f >= 1 ? 0 : (1 - f) * 4; }

  function spawn(kind, x, y, z, k, owner, down) {
    const K = KIND[kind], p = K.glow ? glow : smoke;
    if (p.n >= p.cap) return;
    const i = p.n++, i3 = i * 3, i4 = i * 4;
    const sk = Math.sqrt(k);
    p.pos[i3] = x + (rnd() - 0.5) * K.sp * sk;
    p.pos[i3 + 1] = y + (rnd() - 0.5) * 0.4 * sk;
    p.pos[i3 + 2] = z + (rnd() - 0.5) * K.sp * sk;
    if (kind === K_SPARK) {
      const a = rnd() * 6.2832, h = 1.5 + rnd() * 3.5;
      p.vel[i3] = Math.cos(a) * h; p.vel[i3 + 2] = Math.sin(a) * h;
      p.vel[i3 + 1] = K.v0 + rnd() * (K.v1 - K.v0);
    } else {
      p.vel[i3] = (rnd() - 0.5) * 0.9; p.vel[i3 + 2] = (rnd() - 0.5) * 0.9;
      p.vel[i3 + 1] = (K.v0 + rnd() * (K.v1 - K.v0)) * (0.7 + 0.3 * sk);
      if (down) {
        /* rotor downwash: 10-20 m/s straight down under a hovering machine,
           so the smoke is pushed under the disc and spread out sideways */
        const a = rnd() * 6.2832;
        p.vel[i3 + 1] = -3 - rnd() * 3;
        p.vel[i3] = Math.cos(a) * 3.5; p.vel[i3 + 2] = Math.sin(a) * 3.5;
      }
    }
    p.age[i] = 0;
    p.life[i] = K.l0 + rnd() * (K.l1 - K.l0);
    const ks = kind === K_SPARK ? Math.min(1.6, sk) : k;
    p.s0[i] = K.s0 * ks * (0.8 + rnd() * 0.4);
    p.s1[i] = K.s1 * ks * (0.8 + rnd() * 0.4);
    p.a0[i] = K.a;
    p.kind[i] = kind;
    p.owner[i] = owner;
    p.col[i4] = K.r; p.col[i4 + 1] = K.g; p.col[i4 + 2] = K.b; p.col[i4 + 3] = 0;
    p.size[i] = p.s0[i];
    p.born++;
  }
  function kill(p, i) {
    const j = --p.n;
    if (i === j) return;
    const i3 = i * 3, j3 = j * 3, i4 = i * 4, j4 = j * 4;
    p.pos[i3] = p.pos[j3]; p.pos[i3 + 1] = p.pos[j3 + 1]; p.pos[i3 + 2] = p.pos[j3 + 2];
    p.vel[i3] = p.vel[j3]; p.vel[i3 + 1] = p.vel[j3 + 1]; p.vel[i3 + 2] = p.vel[j3 + 2];
    p.col[i4] = p.col[j4]; p.col[i4 + 1] = p.col[j4 + 1]; p.col[i4 + 2] = p.col[j4 + 2]; p.col[i4 + 3] = p.col[j4 + 3];
    p.size[i] = p.size[j]; p.age[i] = p.age[j]; p.life[i] = p.life[j];
    p.s0[i] = p.s0[j]; p.s1[i] = p.s1[j]; p.a0[i] = p.a0[j];
    p.kind[i] = p.kind[j]; p.owner[i] = p.owner[j];
  }
  function killOwned(p, id) {
    for (let i = p.n - 1; i >= 0; i--) if (p.owner[i] === id) kill(p, i);
  }
  let windX = 2.1, windZ = 0.64;
  function step(p, dt) {
    let i = 0;
    while (i < p.n) {
      const age = p.age[i] + dt, life = p.life[i];
      if (age >= life) { kill(p, i); continue; }
      p.age[i] = age;
      const kd = p.kind[i], K = KIND[kd], i3 = i * 3;
      let vx = p.vel[i3], vy = p.vel[i3 + 1], vz = p.vel[i3 + 2];
      /* a plume is carried off downwind and its buoyant rise slows as it
         mixes with the air around it */
      const c = Math.min(1, K.wind * dt);
      vx += (windX - vx) * c; vz += (windZ - vz) * c;
      vy = vy * (1 - Math.min(1, K.drag * dt)) - K.grav * dt;
      if (kd !== K_SPARK && vy < 0) vy += Math.min(-vy, 6 * dt);   // downwash spends itself
      p.vel[i3] = vx; p.vel[i3 + 1] = vy; p.vel[i3 + 2] = vz;
      p.pos[i3] += vx * dt; p.pos[i3 + 1] += vy * dt; p.pos[i3 + 2] += vz * dt;
      const t = age / life;
      /* the plume widens quickly and then slows: square root of age */
      p.size[i] = p.s0[i] + (p.s1[i] - p.s0[i]) * (kd >= K_FIRE ? t : Math.sqrt(t));
      const fadeIn = kd >= K_FIRE ? 1 : Math.min(1, t * 8);
      p.col[i * 4 + 3] = p.a0[i] * fadeIn * (1 - t);
      if (kd === K_FIRE) {             /* cools from yellow-white to deep orange */
        p.col[i * 4 + 1] = K.g * (1 - 0.55 * t);
        p.col[i * 4 + 2] = K.b * (1 - 0.8 * t);
      }
      i++;
    }
  }

  /* ---------------- emitters ---------------- */
  function Emitter() {
    this.e = null; this.id = 0; this.prof = null; this.rec = null; this.stage = 0;
    this.frame = 0; this.acc = new Float32Array(MAX_SRC * 3);
    this.side = 1; this.fore = 1; this.list = 0; this.sink = 0; this.trim = 0;
    this.fresh = true; this.lx = 0; this.lz = 0; this.speed = 0; this.born = 0;
  }
  const live = [], spare = [], byId = new Map();
  let frameNo = 0, game = null, sceneRef = null, clock = 0;

  function attachEm(e, prof) {
    const em = spare.length ? spare.pop() : new Emitter();
    em.e = e; em.id = e.id; em.prof = prof; em.rec = null; em.stage = 0;
    em.acc.fill(0);
    em.list = 0; em.sink = 0; em.trim = 0; em.fresh = true;
    em.lx = e.x; em.lz = e.y; em.speed = 0; em.born = 0;
    em.side = 1; em.fore = 1;
    if (prof.ship) {
      /* the side and end the damage came from: the side facing whoever hit
         it last, else a fixed one per hull */
      const s = e.lastHitBy;
      if (s && s.x !== undefined) {
        const dx = s.x - e.x, dy = s.y - e.y, ca = Math.cos(e.ang || 0), sa = Math.sin(e.ang || 0);
        em.fore = dx * ca + dy * sa >= 0 ? 1 : -1;
        em.side = -dx * sa + dy * ca >= 0 ? 1 : -1;
      } else {
        em.side = hash(e.id) < 0.5 ? -1 : 1;
        em.fore = hash(e.id + 17) < 0.5 ? -1 : 1;
      }
    }
    live.push(em); byId.set(e.id, em);
    return em;
  }
  /* An emitter that goes for any reason but fog - its owner died or was
     repaired, or the view moved off it - leaves its smoke to thin out by
     itself. Its owner is remembered until the last of that smoke is gone,
     so that if it goes under fog in the meantime the smoke goes too: a
     burning enemy jet that flew out of the view and then into the fog must
     not leave its trail standing where the player happens to look next. */
  const orphans = [], orphanSpare = [];
  function orphan(em) {
    if (!em.born || !em.e) return;
    const o = orphanSpare.length ? orphanSpare.pop() : { e: null, id: 0, until: 0 };
    o.e = em.e; o.id = em.id; o.until = clock + MAX_LIFE;
    orphans.push(o);
  }
  function sweepOrphans(G) {
    for (let i = orphans.length - 1; i >= 0; i--) {
      const o = orphans[i];
      let done = clock > o.until;
      if (!done && !seen(o.e, G)) { killOwned(smoke, o.id); killOwned(glow, o.id); done = true; }
      if (done) {
        o.e = null; orphanSpare.push(o);
        const last = orphans.pop();
        if (last !== o) orphans[i] = last;
      }
    }
  }
  function dropEm(em, killParticles) {
    const i = live.indexOf(em);
    if (i >= 0) { const last = live.pop(); if (last !== em) live[i] = last; }
    byId.delete(em.id);
    if (killParticles) { killOwned(smoke, em.id); killOwned(glow, em.id); }
    else orphan(em);
    em.e = null; em.rec = null; em.prof = null;
    spare.push(em);
  }

  /* ---- the listing ship ---- */
  function pose(em, rec, stg, dt) {
    const H = em.prof.H;
    const wantList = stg >= 3 ? 0.105 : stg === 2 ? 0.035 : 0;     // 6 and 2 degrees
    const wantSink = (stg >= 3 ? 0.05 : stg === 2 ? 0.02 : 0) * H;
    const wantTrim = stg >= 3 ? 0.02 : 0;                          // down by the holed end
    if (em.fresh) { em.list = wantList; em.sink = wantSink; em.trim = wantTrim; em.fresh = false; }
    else {
      /* flooding is slow: a few degrees over several seconds, not a snap */
      em.list += U_clamp(wantList - em.list, -0.03 * dt, 0.03 * dt);
      em.trim += U_clamp(wantTrim - em.trim, -0.01 * dt, 0.01 * dt);
      em.sink += U_clamp(wantSink - em.sink, -0.25 * dt, 0.25 * dt);
    }
    const g = rec.grp;
    /* the model's nose is +X, so a roll about X is a list; a positive roll
       puts the +Z side down */
    g.rotation.x += em.side * em.list;
    g.rotation.z -= em.fore * em.trim;
    g.position.y -= em.sink;
  }

  /* ---- view test ---- */
  let frustum = null, projM = null, sphere = null, useFrustum = false;
  function onScreen(e, rec, P, view) {
    if (view) {
      const m = P.radius / PXM;
      return e.x > view.x0 - m && e.x < view.x1 + m && e.y > view.y0 - m && e.y < view.y1 + m;
    }
    if (!useFrustum) return true;
    if (rec && rec.grp) sphere.center.copy(rec.grp.position);
    else sphere.center.set(e.x * PXM, 0, e.y * PXM);
    sphere.center.y += P.H * 0.5 + 8;
    sphere.radius = P.radius;
    return frustum.intersectsSphere(sphere);
  }

  function visit(e, G, ents, view, dt) {
    if (e.dead || e.carried) return;
    const stg = stageOf(e);
    if (stg === 0 || !eligible(e)) return;
    /* Sight FIRST. render3d has already taken a fogged enemy unit's mesh out
       of the scene by the time this runs, so testing "is it drawn" first
       would let its emitter lapse at the end of the frame like any other,
       and the smoke it had made would stand over the fog for up to 4.6 s
       (REVIEW, measured on the first version: 38 particles for 124 frames). */
    if (!seen(e, G)) {
      const was = byId.get(e.id);
      if (was) dropEm(was, true);                     // back under fog: take its smoke too
      return;
    }
    const rec = ents ? ents.get(e.id) : null;
    if (ents && !rec) return;                         // not drawn this frame
    let em = byId.get(e.id);
    const P = em ? em.prof : profileFor(e, rec);
    if (!onScreen(e, rec, P, view)) return;
    if (!em) em = attachEm(e, P);
    em.frame = frameNo; em.stage = stg; em.rec = rec;
    if (P.ship && rec && rec.grp) pose(em, rec, stg, dt);
  }

  /* A source in the world, this frame. Buildings are drawn unrotated;
     everything else faces e.ang. A ship also rolls and pitches - the sea,
     and its own list and trim once it floods - and a fire on its deck goes
     with the deck: it is turned by the group's roll and pitch exactly as
     render3d turns the model (Euler order YXZ: pitch, then roll, then
     heading). One reusable point, nothing allocated. */
  const _w = { x: 0, y: 0, z: 0, lx: 0, ly: 0, lz: 0 };
  function where(em, q) {
    const e = em.e, P = em.prof, rec = em.rec, g = rec && rec.grp;
    const vi = (em.fore < 0 ? 2 : 0) + (em.side < 0 ? 1 : 0);
    let lx = q.x, ly = q.ys ? q.ys[vi] : q.y, lz = q.z;
    if (q.ys) { lx = q.ox + lx * em.fore; lz = q.oz + lz * em.side; }   // the holed side and end
    _w.lx = lx; _w.ly = ly; _w.lz = lz;
    if (P.ship && g) {
      const cr = Math.cos(g.rotation.z), sr = Math.sin(g.rotation.z);
      const cl = Math.cos(g.rotation.x), sl = Math.sin(g.rotation.x);
      const x1 = lx * cr - ly * sr, y1 = lx * sr + ly * cr;
      ly = y1 * cl - lz * sl; lz = y1 * sl + lz * cl; lx = x1;
    }
    /* the heading it is DRAWN at: render3d sets every unit's group to -e.ang,
       except an aircraft on, onto or off a ship's deck, which it turns with
       her (seatOnDeck) */
    const ang = e.kind === "building" ? 0 : g ? -g.rotation.y : (e.ang || 0), ca = Math.cos(ang), sa = Math.sin(ang);
    _w.x = (g ? g.position.x : e.x * PXM) + lx * ca - lz * sa;
    _w.y = (g ? g.position.y : 0) + ly;
    _w.z = (g ? g.position.z : e.y * PXM) + lx * sa + lz * ca;
    return _w;
  }
  function emit(em, dt) {
    const e = em.e, P = em.prof, stg = em.stage;
    const mv = Math.hypot(e.x - em.lx, e.y - em.lz) * PXM;
    em.lx = e.x; em.lz = e.y;
    if (dt > 0) em.speed = em.speed * 0.8 + (mv / dt) * 0.2;
    const k = P.k, sk = Math.sqrt(k);
    const shS = shed(smoke), shG = shed(glow);
    const smokeKind = stg >= 3 ? K_BLACK : stg === 2 ? K_HEAVY : K_LIGHT;
    const down = P.heli && !e.parked && !(e.order && e.order.type === "parked");
    const S = P.srcs;
    for (let s = 0; s < S.length && s < MAX_SRC; s++) {
      const q = S[s];
      if (stg < q.min) continue;
      const w = where(em, q), wx = w.x, wy = w.y, wz = w.z;
      const a = s * 3;
      if (!q.sparkOnly) {
        let rate = SMOKE_RATE[stg] * q.rate * sk * (P.oil && stg >= 2 ? 1.4 : 1);
        /* a moving aircraft leaves its smoke behind: keep the puffs close
           enough together that the trail reads as one line */
        if (P.trail && em.speed > 1) rate = Math.min(60, Math.max(rate, em.speed / (KIND[smokeKind].s0 * k * 1.2)));
        em.acc[a] += rate * dt * shS;
        while (em.acc[a] >= 1) { em.acc[a] -= 1; spawn(smokeKind, wx, wy, wz, k, em.id, down); em.born++; }
      }
      if (stg >= 3 && q.burns && !q.sparkOnly) {
        em.acc[a + 1] += FIRE_RATE * sk * (P.oil ? 1.5 : 1) * dt * shG;
        while (em.acc[a + 1] >= 1) { em.acc[a + 1] -= 1; spawn(K_FIRE, wx, wy, wz, k * (P.oil ? 1.4 : 1), em.id, false); em.born++; }
      }
      if (q.sparks && stg >= q.sparkFrom && !(e.layer === "air" && !e.parked)) {
        em.acc[a + 2] += SPARK_RATE * q.rate * dt * shG;
        while (em.acc[a + 2] >= 1) { em.acc[a + 2] -= 1; spawn(K_SPARK, wx, wy, wz, k, em.id, false); em.born++; }
      }
    }
  }

  /* ---------------- the scene side ---------------- */
  function softTexture(lumpy) {
    const N = 64, d = new Uint8Array(N * N * 4);
    const blobs = [];
    if (lumpy) for (let b = 0; b < 6; b++) {
      const a = b * 1.047 + 0.4, r = 0.28 + (b % 3) * 0.06;
      blobs.push(Math.cos(a) * r, Math.sin(a) * r, 0.30 + (b % 2) * 0.08);
    }
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const u = (x + 0.5) / N * 2 - 1, v = (y + 0.5) / N * 2 - 1;
      const r = Math.sqrt(u * u + v * v);
      let a;
      if (lumpy) {
        /* a cauliflower edge rather than a perfect ball: a soft core plus
           a ring of lobes, all faded out before the sprite's square edge */
        a = Math.max(0, 1 - r * 1.25);
        for (let b = 0; b < blobs.length; b += 3) {
          const du = u - blobs[b], dv = v - blobs[b + 1], rr = blobs[b + 2];
          a += 0.55 * Math.max(0, 1 - (du * du + dv * dv) / (rr * rr));
        }
        a = Math.min(1, a) * Math.max(0, Math.min(1, (1 - r) * 3));
      } else {
        const t = Math.max(0, 1 - r);
        a = t * t * (3 - 2 * t);
      }
      const o = (y * N + x) * 4;
      d[o] = d[o + 1] = d[o + 2] = 255; d[o + 3] = Math.round(a * 255);
    }
    const t = new THREE.DataTexture(d, N, N, THREE.RGBAFormat);
    t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearFilter;
    t.needsUpdate = true;
    return t;
  }
  /* PointsMaterial draws every point one size. Two string edits give it a
     per-point size in metres and leave everything else - fog, tone mapping,
     the colour-with-alpha attribute - to three.js's own shader. */
  const PS_A = "uniform float size;", PS_B = "gl_PointSize = size;";
  function patchPoints(shader) {
    shader.vertexShader = shader.vertexShader
      .replace(PS_A, PS_A + "\nattribute float psize;")
      .replace(PS_B, "gl_PointSize = size * psize;");
  }
  function makeLayer(p, additive) {
    const g = new THREE.BufferGeometry();
    const pa = new THREE.BufferAttribute(p.pos, 3), ca = new THREE.BufferAttribute(p.col, 4),
          sa = new THREE.BufferAttribute(p.size, 1);
    pa.setUsage(THREE.DynamicDrawUsage); ca.setUsage(THREE.DynamicDrawUsage); sa.setUsage(THREE.DynamicDrawUsage);
    g.setAttribute("position", pa); g.setAttribute("color", ca); g.setAttribute("psize", sa);
    g.setDrawRange(0, 0);
    const m = new THREE.PointsMaterial({
      size: 2.75, sizeAttenuation: true, map: softTexture(!additive), vertexColors: true,
      transparent: true, depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending });
    m.onBeforeCompile = patchPoints;
    m.customProgramCacheKey = function () { return "damage3d-psize"; };
    const pts = new THREE.Points(g, m);
    pts.frustumCulled = false;              // the pool moves every frame
    pts.renderOrder = additive ? 12 : 11;   // fire over its own smoke
    pts.name = additive ? "damage3d.glow" : "damage3d.smoke";
    pts.visible = false;
    p.pts = pts;
  }
  function attach(three) {
    if (!smoke.pts) { makeLayer(smoke, false); makeLayer(glow, true); }
    if (three.scene !== sceneRef) {
      /* a new battle or a loaded save: nothing of the old one carries over */
      clearAll();
      sceneRef = three.scene;
      three.scene.add(smoke.pts); three.scene.add(glow.pts);
      frustum = new THREE.Frustum(); projM = new THREE.Matrix4(); sphere = new THREE.Sphere();
    }
    /* three.js scales a point by scale/-z with no tan(fov/2), so give it that
       factor once and the size attribute is simply a diameter in metres */
    const cam = three.camera;
    if (cam && cam.fov) smoke.pts.material.size = glow.pts.material.size = 1 / Math.tan(cam.fov * Math.PI / 360);
  }
  function upload(p) {
    const pts = p.pts;
    if (!pts) return;
    const n = p.n;
    pts.geometry.setDrawRange(0, n);
    if (n === 0) { if (p.shown) { pts.visible = false; p.shown = false; } return; }
    if (!p.shown) { pts.visible = true; p.shown = true; }
    const at = pts.geometry.attributes;
    at.position.updateRange.offset = 0; at.position.updateRange.count = n * 3; at.position.needsUpdate = true;
    at.color.updateRange.offset = 0; at.color.updateRange.count = n * 4; at.color.needsUpdate = true;
    at.psize.updateRange.offset = 0; at.psize.updateRange.count = n; at.psize.needsUpdate = true;
  }
  const WIND = { clear: 2.2, overcast: 3.0, rain: 4.0, night: 1.6, sandstorm: 9.0 };
  function clearAll() {
    while (live.length) dropEm(live[live.length - 1], true);
    while (orphans.length) { const o = orphans.pop(); o.e = null; orphanSpare.push(o); }
    smoke.n = 0; glow.n = 0;
  }

  /* ---------------- the per-frame entry point ----------------
     Called by render3d.js right after syncEntities has placed every mesh for
     this frame (so a ship's list is laid on top of its sea motion), and
     headless with three = null by the tests, which may pass a view rectangle
     in game px to stand in for the camera. */
  function frame(three, G, dt, ents, view) {
    if (!G || !G.entities) return;
    if (G !== game) { clearAll(); game = G; }
    if (three && typeof THREE !== "undefined") attach(three);
    if (!(dt > 0)) dt = 0;
    if (dt > 0.1) dt = 0.1;                     // a hitch, not a ten-second puff
    frameNo++;
    clock += dt;
    useFrustum = !!(three && three.camera && !view && frustum);
    if (useFrustum) {
      const cam = three.camera;
      cam.updateMatrixWorld();
      projM.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
      frustum.setFromProjectionMatrix(projM);
    }
    /* the smoke leans the way the sandstorm dust blows in render3d */
    const ws = WIND[G.weatherKey] || 2.2;
    windX = ws * 0.956; windZ = ws * 0.293;
    const list = G.entities;
    for (let i = 0; i < list.length; i++) visit(list[i], G, ents, view, dt);
    for (let j = live.length - 1; j >= 0; j--) {
      const em = live[j];
      if (em.frame !== frameNo) dropEm(em, false);   // dead, repaired, off screen, not drawn
    }
    if (orphans.length) sweepOrphans(G);
    for (let j = 0; j < live.length; j++) emit(live[j], dt);
    step(smoke, dt); step(glow, dt);
    if (three) { upload(smoke); upload(glow); }
  }

  /* ---------------- 2D (render.js) ----------------
     The same stages and the same places, drawn as puffs whose phase runs off
     the clock, so nothing is kept per unit and nothing is allocated. */
  function rgbaTable(r, g, b) {
    const t = [];
    for (let i = 0; i <= 20; i++) t.push("rgba(" + r + "," + g + "," + b + "," + (i / 20).toFixed(2) + ")");
    return t;
  }
  const C2_LIGHT = rgbaTable(142, 142, 137), C2_HEAVY = rgbaTable(46, 43, 40),
        C2_BLACK = rgbaTable(22, 20, 19), C2_FIRE = rgbaTable(255, 140, 38),
        C2_CORE = rgbaTable(255, 222, 130), C2_SPARK = rgbaTable(255, 236, 170);
  function a2(t, a) { return t[Math.max(0, Math.min(20, Math.round(a * 20)))]; }
  function puffs2D(ctx, x, y, z, k, stg, phase0, rise, trailX, trailY, oil) {
    const tab = stg >= 3 ? C2_BLACK : stg === 2 ? C2_HEAVY : C2_LIGHT;
    const n = stg + 2, aMax = stg >= 3 ? 0.62 : stg === 2 ? 0.5 : 0.34;
    for (let i = 0; i < n; i++) {
      let t = phase0 + i / n; t -= Math.floor(t);
      const px = x + (trailX ? trailX * t : t * 9 * z * k) , py = y + (trailY ? trailY * t : -t * rise * z * k);
      const r = (2 + t * (stg >= 2 ? 6 : 4.5)) * z * k * (oil ? 1.2 : 1);
      ctx.fillStyle = a2(tab, aMax * Math.min(1, t * 6) * (1 - t));
      ctx.beginPath(); ctx.arc(px, py, r, 0, 6.2832); ctx.fill();
    }
  }
  function fire2D(ctx, x, y, z, k, time, id) {
    const f = 0.75 + 0.25 * Math.sin(time * 23 + id * 1.7);
    ctx.fillStyle = a2(C2_FIRE, 0.75 * f);
    ctx.beginPath(); ctx.arc(x, y - 2 * z * k, 3.4 * z * k * f, 0, 6.2832); ctx.fill();
    ctx.fillStyle = a2(C2_CORE, 0.85);
    ctx.beginPath(); ctx.arc(x, y - 1.2 * z * k, 1.6 * z * k * f, 0, 6.2832); ctx.fill();
  }
  function sparks2D(ctx, x, y, z, time, id) {
    for (let i = 0; i < 3; i++) {
      let t = time * 1.9 + i / 3 + id * 0.37; t -= Math.floor(t);
      const h = hash(id * 31 + i * 7 + Math.floor(time * 1.9 + i / 3 + id * 0.37));
      const dx = (h - 0.5) * 22 * z * t, dy = (-14 * t + 18 * t * t) * z;
      ctx.fillStyle = a2(C2_SPARK, 1 - t);
      ctx.fillRect(x + dx - z * 0.8, y + dy - z * 0.8, 1.6 * z, 1.6 * z);
    }
  }
  /* a unit: X, Y is its drawn centre; sx, sy are render.js's projections */
  function draw2D(ctx, u, X, Y, z, G, sx, sy) {
    const stg = stageOf(u);
    if (!stg || !eligible(u) || !seen(u, G)) return 0;
    const cls = classify(u);
    const r = u.r || 10, ang = u.ang || 0;
    /* the same source as 3D, in world px off the unit's centre */
    const f = cls === "rear" ? -0.55 : cls === "front" ? 0.5 : cls === "jet" || cls === "wing" ? -0.8 : cls === "helo" ? -0.2 : 0.25;
    const wx = u.x + Math.cos(ang) * r * f, wy = u.y + Math.sin(ang) * r * f;
    const ax = X + (sx(wx, wy) - sx(u.x, u.y)), ay = Y + (sy(wx, wy) - sy(u.x, u.y));
    const k = (cls === "ship" ? 1.8 : cls === "wing" ? 1.3 : 1) * Math.max(0.8, Math.min(1.4, r / 14));
    const time = G.time || 0, ph = time * 0.7 + hash(u.id);
    let tx = 0, ty = 0;
    if (cls === "jet" || cls === "wing" || (cls === "helo" && u.moving)) {
      /* the trail lies back along the flight path */
      const bx = u.x - Math.cos(ang) * r * 5, by = u.y - Math.sin(ang) * r * 5;
      tx = sx(bx, by) - sx(u.x, u.y); ty = sy(bx, by) - sy(u.x, u.y);
    }
    puffs2D(ctx, ax, ay, z, k, stg, ph, 26, tx, ty, false);
    if (cls === "ship" && stg >= 2) puffs2D(ctx, X, Y - 4 * z, z, k, stg, ph + 0.5, 24, 0, 0, false);
    if (stg >= 3) fire2D(ctx, ax, ay, z, k, time, u.id);
    if (stg >= 2 && u.layer !== "air") sparks2D(ctx, ax, ay, z, time, u.id);
    return 1;
  }
  /* a building: cx, cy is the roof centre render.js already computed */
  function drawBuilding2D(ctx, b, cx, cy, z, G) {
    const stg = stageOf(b);
    if (!stg || !eligible(b) || !seen(b, G)) return 0;
    const d = b.def, area = (d.w || 1) * (d.h || 1);
    const n = area >= 9 ? 4 : area >= 6 ? 3 : area >= 4 ? 2 : 1;
    const time = G.time || 0, span = (d.w || 1) * 32 * z;
    const oil = !!OIL[d.id], k = 1 + Math.min(1, area / 9) * 0.6;
    for (let i = 0; i < n; i++) {
      const min = i === 0 ? 1 : i >= 3 ? 3 : 2;
      if (stg < min) continue;
      const u = hash(b.id * 7 + i * 131 + 3), v = hash(b.id * 13 + i * 71 + 9);
      const x = cx + (u - 0.5) * span * 0.6, y = cy + (v - 0.5) * span * 0.25 + (i === 1 ? 10 * z : 0);
      puffs2D(ctx, x, y, z, k, stg, time * 0.6 + u, 24, 0, 0, oil);
      if (stg >= 3) fire2D(ctx, x, y, z, k * (oil ? 1.3 : 1), time, b.id + i);
      if (stg >= 2) sparks2D(ctx, x, y, z, time, b.id + i);
    }
    if (d.id === "power") sparks2D(ctx, cx + span * 0.3, cy + 6 * z, z, time * 1.3, b.id + 99);
    return 1;
  }

  /* ---------------- tests ---------------- */
  function stats() {
    const ids = [];
    for (let j = 0; j < live.length; j++) ids.push(live[j].id);
    return { emitters: live.length, ids: ids, smoke: smoke.n, glow: glow.n,
             smokeCap: SMOKE_CAP, glowCap: GLOW_CAP, born: smoke.born + glow.born,
             frame: frameNo, orphans: orphans.length };
  }
  function owned(id) {
    let n = 0;
    for (let i = 0; i < smoke.n; i++) if (smoke.owner[i] === id) n++;
    for (let i = 0; i < glow.n; i++) if (glow.owner[i] === id) n++;
    return n;
  }
  /* the farthest of one entity's particles from a ground point, in metres */
  function reach(id, x, z) {
    let m = 0;
    for (let i = 0; i < smoke.n; i++) if (smoke.owner[i] === id) {
      const dx = smoke.pos[i * 3] - x, dz = smoke.pos[i * 3 + 2] - z, d = Math.sqrt(dx * dx + dz * dz);
      if (d > m) m = d;
    }
    return m;
  }
  /* one entity's particles as [x, y, z, size, r, g, b, a, glow] rows (tests, stills) */
  function particles(id) {
    const out = [];
    const put = (p, g) => {
      for (let i = 0; i < p.n; i++) if (p.owner[i] === id)
        out.push([p.pos[i * 3], p.pos[i * 3 + 1], p.pos[i * 3 + 2], p.size[i],
                  p.col[i * 4], p.col[i * 4 + 1], p.col[i * 4 + 2], p.col[i * 4 + 3], g]);
    };
    put(smoke, 0); put(glow, 1);
    return out;
  }
  /* the world position of each active source of one emitter, for the tests */
  function anchors(id) {
    const em = byId.get(id);
    if (!em) return null;
    const P = em.prof, out = [];
    for (let s = 0; s < P.srcs.length; s++) {
      const q = P.srcs[s], w = where(em, q);
      out.push({ what: q.what, min: q.min, local: { x: w.lx, y: w.ly, z: w.lz },
                 x: w.x, y: w.y, z: w.z, active: em.stage >= q.min, sparkOnly: q.sparkOnly });
    }
    return { cls: P.cls, L: P.L, W: P.W, H: P.H, k: P.k, side: em.side, fore: em.fore, onMesh: P.onMesh,
             list: em.list, sink: em.sink, srcs: out };
  }
  function profile(e) { return profileFor(e, null); }
  function layers() { return { smoke: smoke.pts, glow: glow.pts }; }

  return {
    LIGHT: LIGHT, HEAVY: HEAVY, FIRE: FIRE, SMOKE_CAP: SMOKE_CAP, GLOW_CAP: GLOW_CAP,
    stageOf: stageOf, eligible: eligible, seen: seen, profile: profile, classify: classify,
    frame: frame, draw2D: draw2D, drawBuilding2D: drawBuilding2D,
    stats: stats, owned: owned, reach: reach, particles: particles, anchors: anchors, layers: layers, reset: clearAll,
    patchPoints: patchPoints,
  };
})();
