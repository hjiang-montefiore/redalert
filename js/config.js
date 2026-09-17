/* ============ config.js — tuning constants & the damage model ============ */
var CFG = {
  TILE: 32,
  MAP_W: 144, MAP_H: 144,     // bigger theatre: room for up to 6 commanders
  SIM_HZ: 30,               // fixed simulation tick
  DT: 1 / 30,

  MIN_ZOOM: 0.42, MAX_ZOOM: 1.7,
  EDGE_PAN: 10, PAN_SPEED: 900,

  BUILD_RADIUS: 11,          // tiles from any owned structure you may build within
  /* ---- how far a wellhead may sit from the base ----
     (owner) "they can build the oil derrick very far away from their building."
     A derrick used to be exempt from the build radius ENTIRELY - for the
     player as well - so a wellhead could go down on any surveyed node on the
     map with nothing of yours within sixty tiles. That is what the owner
     objected to and it was right to object.
     Holding it to the ordinary 11-tile radius turned out to be the other
     extreme: measured on fulda with brains on both seats, both economies fell
     away and the match was DECIDED at t=346 where it had run past t=588, which
     is a poorer game rather than a harder one. So a derrick gets its own
     figure - a pipeline can run further than a construction crane, and 22
     tiles is a real distance you can see on the map and defend, rather than
     the whole theatre. Beyond that you take a rig out and plant a forward
     base, which is what the MCV exists for. */
  OIL_RADIUS: 22,            // tiles from any owned structure a derrick may sit
  /* ---- the standing budget ----
     (owner) "i want the natural money (1s or 1 min for a cetain money for all
     players)."
     A trickle paid to every surviving commander at the same rate, every
     second, whoever they are and however they are doing. It is deliberately
     small beside a working ore economy - a refinery and two harvesters make
     several times this - so mining is still the thing worth fighting over.
     What it changes is the shape of a bad position: a commander who has lost
     every refinery used to be finished the moment the last harvester died,
     with nothing to do but watch. Now there is always a thin stream to rebuild
     from, and the same stream for the enemy, so it favours nobody.
     Paid through earn(), so the storage cap still bounds it. */
  BASE_INCOME: 5,            // credits per second, every player, always
  /* CALIBRATED, not guessed. At 10/s both commanders fielded faster, the one
     that got ahead stayed ahead, and a fulda match with brains on both seats
     was DECIDED at t=346 where it had run to t=465 with no stipend at all -
     a shorter, more lopsided game. At 5 it runs to t=623, LONGER than the
     baseline, because the trickle is what lets a beaten commander rebuild
     instead of being finished the moment its last refinery falls. That is the
     whole point of it, and the figure is the one that produces it. */
  /* ---- how long a rig on its own keeps a side in the war ----
     (owner) "the victory condition is eliminating all production building."
     A construction rig on the road is a yard in transit, so a commander whose
     base falls while one is out is not beaten yet - but only for this long.
     A rig makes about 0.95 tiles a second and unfolds on almost any clear 3x3
     of land, so two minutes is over a hundred tiles of driving to find ground:
     enough to get out from under an attack or off a landing craft, not enough
     to park in a corner and hold the match hostage. G.checkVictory reads it,
     and so do the in-game alerts; the pre-battle hint in index.html says "two
     minutes" in words, so change that line with this one. */
  RIG_GRACE: 120,            // seconds a side holding only rigs has to unfold one
  SHOW_RANGE_RINGS: true,    // weapon envelope under a selected unit (V toggles)
  POWER_BROWNOUT_FLOOR: 0.35,// worst-case production speed when the grid is starved
  REPAIR_RATE: 0.022,        // fraction of max HP per second at a Service Depot
  REPAIR_COST: 0.30,         // credits per HP repaired on structures
  SELL_REFUND: 0.5,

  HARVEST_LOAD: 700,         // credits carried per full load
  HARVEST_RATE: 175,         // credits of ore scooped per second
  ORE_REGROW: 2.4,          // ore value regenerated per second per active seed

  VET_XP: [0, 220, 700, 1700],           // XP needed for rookie/regular/veteran/elite
  VET_NAME: ["ROOKIE", "REGULAR", "VETERAN", "ELITE"],
  VET_DMG: [0.88, 1.0, 1.18, 1.38],
  VET_ACC: [0.86, 1.0, 1.10, 1.22],
  VET_HP: [1.0, 1.0, 1.15, 1.32],
  VET_ROF: [1.0, 1.0, 1.08, 1.18],

  SUPPRESS_DECAY: 14,        // suppression points shed per second
  SUPPRESS_MAX: 100,
  /* Suppression has three stages. Under fire troops shoot worse; PINNED they
     go prone (much slower, but a smaller target); BROKEN they stop obeying and
     run for the nearest friendly structure. Machine guns and artillery become
     manoeuvre tools rather than just damage. */
  SUPPRESS_PIN: 52,
  SUPPRESS_BREAK: 86,
  SUPPRESS_PRONE_DR: 0.42,   // damage reduction while prone
  ROUT_TIME: 6.0,            // seconds a broken squad runs before rallying
  VET_MORALE: [0, 8, 18, 30],// veterans hold on longer at each rank
  ELEV_ACC_BONUS: 0.12,      // accuracy gained per level of height advantage
  ELEV_RANGE_BONUS: 0.10,
  MOVING_ACC_PENALTY: 0.30,  // firing on the move
  COVER_LIGHT: 0.28, COVER_HEAVY: 0.45,  // damage reduction from terrain cover

  FOG_UPDATE: 0.25,          // seconds between vision recomputes
  CRUSH_MASS: 18,            // vehicle mass required to crush infantry

  /* --- visibility & weather ---
     The Gulf War lesson: whoever sees first shoots first. Coalition thermal
     sights worked through night, smoke and sandstorm while Soviet-pattern
     optics did not, and engagements opened at ranges the other side could not
     even observe. Weather is the lever that turns that into gameplay.       */
  WEATHER: {
    clear:     { name: "CLEAR",       vis: 1.00, thermalEdge: 0.00, air: 1.00 },
    overcast:  { name: "OVERCAST",    vis: 0.86, thermalEdge: 0.45, air: 0.92 },
    night:     { name: "NIGHT",       vis: 0.38, thermalEdge: 0.93, air: 0.80 },
    sandstorm: { name: "SANDSTORM",   vis: 0.26, thermalEdge: 0.92, air: 0.55 },
    rain:      { name: "RAIN SQUALL", vis: 0.58, thermalEdge: 0.72, air: 0.72 },
  },
  WEATHER_MIN: 150, WEATHER_MAX: 330,   // seconds a weather state lasts

  /* Seconds of loiter an airframe carries on top of the fuel needed to reach
     its combat radius and return. Aircraft cross the map in seconds at this
     scale, so a purely distance-derived fuel budget leaves a fighter about
     ten seconds airborne - reach was right, endurance was not. */
  AIR_LOITER: 55,

  /* Flying costs nothing from the fuel reserve - oil is spent building an
     aircraft, not launching it. What limits a sortie is the airframe's own
     endurance: a jet has a finite time on station and must come home. A
     helicopter is not on that clock at all. */
  CAP_RADIUS: 3.2,         // tiles an aircraft orbits its patrol point

  /* --- logistics ---
     Guns run out of shells. An artillery piece or a heavy launcher carries a
     limited number of rounds and has to be replenished from a depot, a supply
     truck or its own base. A unit that has been out of contact with supply
     for a while starts to degrade before it runs dry entirely. */
  SUPPLY_RANGE: 4.5,       // tiles a depot or truck reaches
  UNSUPPLIED_GRACE: 45,    // seconds out of contact before it starts to bite
  UNSUPPLIED_MAX: 180,     // seconds at which the penalty is fully applied
  RESUPPLY_RATE: 0.5,      // rounds per second restored while in supply

  /* --- readability scale ---
     RTS units are drawn deliberately oversized relative to the ground so the
     player can tell a tank from an APC at a glance. These are the knobs. */
  MODEL_SCALE: 1.40,        // ground vehicles, ships, aircraft
  MODEL_SCALE_INF: 1.25,    // infantry, already exaggerated
  BLD_SCALE: 1.10,          // structures; kept modest so they stay on plot

  /* Maximum flight time per projectile type, in seconds. Anything still alive
     past this detonates rather than loitering on the map for ever. */
  /* A torpedo really does run for a long time - a 50-knot fish crossing ten
     tiles is a minute of running - so it gets a generous window; the distance
     cap in Combat still stops it wandering. */
  PROJ_LIFE: { shell: 5, tracer: 2.5, missile: 14, torpedo: 70, bomb: 0, arc: 0, none: 0.1 },

  /* --- bought fuel ---
     Every barrel otherwise comes out of an oil derrick, so a commander whose
     half of the theatre holds no usable node has no fuel at all: no tech-3
     programme, no generational step, and in the end no vehicles - a dead end
     that has nothing to do with how the battle is going. Armies buy fuel as
     well as pump it, so a commander with no well of their own runs a standing
     purchase instead. Deliberately worse than owning a node - a third of one
     derrick, and it is paid for - so taking the oil is still the thing to do. */
  FUEL_BUY_RATE: 0.18,       // barrels per second when no derrick is pumping
  FUEL_BUY_PRICE: 9,         // credits per bought barrel

  /* --- fuel burn per second, by layer --- */
  FUEL_BURN_AIR: 2.6, FUEL_BURN_SEA: 1.1, FUEL_BURN_LAND: 1.5,

  /* --- sensors ---
     Shooting past your own eyesight is guesswork unless a friendly radar is
     watching the target.  This is what makes radar vehicles, Aegis ships and
     the Radar Dome worth their cost. */
  RADAR_FIRE_ACC: 0.95,      // accuracy multiplier when the target is on radar
  BLIND_FIRE_ACC: 0.52,      // ...and when nobody can see it at all
  STEALTH_ACQ: 0.55,         // fraction of acquisition range stealth strips away
};

/* --- armour classes ------------------------------------------------------
   infantry : soft targets, exposed personnel
   light    : trucks, APCs, towed guns, helicopters on the deck
   heavy    : composite/RHA main battle tanks
   structure: reinforced concrete
   wall     : sandbags and concrete barriers
   air      : airframes
   --- warhead types --------------------------------------------------------
   bullet : small-arms and autocannon ball ammunition
   cannon : kinetic-energy APFSDS penetrators
   he     : high explosive, blast-optimised
   frag   : artillery shrapnel, wide lethal radius against soft targets
   heat   : shaped-charge ATGM / rocket warheads
   flak   : proximity-fused AA shells and SAM warheads
*/
CFG.ARMOR = ["infantry", "light", "heavy", "structure", "wall", "air"];
CFG.DMG = {
  //          infantry light  heavy  struct  wall   air
  bullet: { infantry: 1.00, light: 0.32, heavy: 0.06, structure: 0.14, wall: 0.10, air: 0.30 },
  cannon: { infantry: 0.35, light: 1.00, heavy: 0.95, structure: 0.55, wall: 0.70, air: 0.00 },
  he: { infantry: 0.85, light: 0.80, heavy: 0.32, structure: 1.00, wall: 1.00, air: 0.00 },
  frag: { infantry: 1.15, light: 0.60, heavy: 0.20, structure: 0.75, wall: 0.55, air: 0.00 },
  heat: { infantry: 0.45, light: 1.05, heavy: 1.20, structure: 0.80, wall: 0.75, air: 0.55 },
  flak: { infantry: 0.30, light: 0.22, heavy: 0.04, structure: 0.08, wall: 0.08, air: 1.25 },
  /* nuclear: overpressure and thermal effects do not care what you are made of */
  nuclear: { infantry: 1.60, light: 1.35, heavy: 1.05, structure: 1.45, wall: 1.30, air: 0.00 },
};
CFG.dmgMult = function (warhead, armor) {
  const r = CFG.DMG[warhead];
  return r ? (r[armor] !== undefined ? r[armor] : 1) : 1;
};

/* ---------------------------------------------------------------------------
   Aspect armour and penetration
   ---------------------------------------------------------------------------
   A tank is not equally thick all the way round. An M1's frontal turret is
   more than half a metre of composite; its hull sides are a couple of inches
   of aluminium and steel. That asymmetry is the reason armoured warfare is
   about manoeuvre at all, so the model has to know which way the round came
   from.

   The numbers below are nominal RHA-equivalent millimetres for a MEDIAN unit
   of each armour class; an individual unit is scaled by how its hit points
   compare with the class reference, so a T-90 comes out thicker than a T-54
   without anyone hand-entering 667 armour tables.

   Penetration is derived from a weapon's damage unless the weapon declares
   its own `pen`, so every existing weapon gets a sensible value for free.

   The multipliers are deliberately anchored so that a FRONTAL, PENETRATING
   hit scores exactly what it scored before this system existed. Nothing about
   the existing balance moves for a head-on engagement; flanking is what the
   model adds.                                                              */
CFG.ARMOR_MM = {
  //          front  side  rear  top
  heavy:     { front: 540, side: 185, rear: 105, top: 55 },
  light:     { front: 62,  side: 34,  rear: 24,  top: 18 },
  infantry:  { front: 7,   side: 7,   rear: 7,   top: 7 },
  structure: { front: 320, side: 320, rear: 320, top: 210 },
  wall:      { front: 220, side: 220, rear: 220, top: 160 },
  air:       { front: 14,  side: 14,  rear: 14,  top: 14 },
};
/* the hit points of a typical member of each class, used to scale the plate */
CFG.ARMOR_HP_REF = { heavy: 1500, light: 420, infantry: 110,
                     structure: 2000, wall: 800, air: 300 };
/* millimetres of penetration per point of listed damage, by warhead */
CFG.PEN_PER_DMG = { cannon: 3.6, heat: 5.2, bullet: 0.55, he: 0.9,
                    frag: 0.4, flak: 0.3, nuclear: 40 };
CFG.PEN_FULL = 1.00;   // at or above this ratio the round gets clean through
CFG.PEN_NONE = 0.72;   // below this it does not get in at all
/* what a hit is worth once it is through, by the arc it came from. Front is
   1.0 by construction so existing balance is untouched head-on. */
CFG.ASPECT_MUL   = { front: 1.00, side: 1.55, rear: 2.10, top: 2.40 };
CFG.PEN_FAIL_MUL = 0.12;   // spalling and shock, but the crew lives
CFG.RICO_MUL     = 0.05;
CFG.RICO_ANGLE   = 66;     // degrees of obliquity past which a KE round can skip
/* How steeply each plate is laid back from the vertical. This is why a
   sloped glacis works: even a head-on round arrives well off perpendicular,
   and a shot taken from an angle adds to that until the round skips. */
CFG.PLATE_SLOPE  = { front: 52, side: 14, rear: 10 };
CFG.ARC_FRONT    = 60;     // half-angle of the frontal arc, degrees
CFG.ARC_REAR     = 60;     // half-angle of the rear arc, degrees
/* warheads that have to defeat armour rather than simply blast it */
CFG.PEN_WARHEADS = { cannon: 1, heat: 1, bullet: 1 };

/* ---------------------------------------------------------------------------
   Graphics quality
   ---------------------------------------------------------------------------
   The battlefield already runs on the GPU through WebGL, but until now it
   asked for very little: it never set a pixel ratio, so the scene was drawn
   at CSS resolution no matter what the display or the card could do. These
   tiers let a machine with a real graphics card be told to use it.

   render  : device-pixel multiplier. 1 is CSS resolution; 2 is native on a
             HiDPI panel; above 1 on a normal panel is supersampling, which
             is the cleanest antialiasing there is and costs fill rate.
   shadow  : shadow map edge, in texels.
   bloom   : whether bright pixels bleed light. Muzzle flashes, tracers and
             burning wrecks are what it is for.
   sparks  : impact particle budget per event.                              */
CFG.GFX = {
  low:    { render: 1.0, shadow: 1024, bloom: false, sparks: 0,  aniso: 4,  fogSteps: 1 },
  medium: { render: 1.0, shadow: 2048, bloom: false, sparks: 6,  aniso: 8,  fogSteps: 1 },
  high:   { render: 1.5, shadow: 3072, bloom: true,  sparks: 12, aniso: 16, fogSteps: 2 },
  ultra:  { render: 2.0, shadow: 4096, bloom: true,  sparks: 22, aniso: 16, fogSteps: 2 },
};
CFG.GFX_DEFAULT = "high";
CFG.gfx = function () { return CFG.GFX[CFG.GFX_LEVEL] || CFG.GFX[CFG.GFX_DEFAULT]; };
CFG.GFX_LEVEL = CFG.GFX_DEFAULT;

/* faction colours (player slot falls back by index if factions match) */
CFG.FACTION_COLORS = {
  nato: { main: "#4b8fe0", dark: "#22406b", light: "#9ecbff" },
  pact: { main: "#d6503f", dark: "#6b241c", light: "#ff9d8c" },
  pla:  { main: "#e0a33c", dark: "#6b4a1a", light: "#ffd98c" },
  kpa:  { main: "#b0413a", dark: "#4d1d18", light: "#e8968c" },
  roc:  { main: "#3fb08a", dark: "#175040", light: "#96e6c9" },
  /* Every `main` value must be UNIQUE across this table — render3d.js
     archOf() identifies a faction's architecture by matching it. The Western
     four are all blue-family and would be unreadable together, so: US blue,
     British dark red (the historical map colour), French light blue, German
     field grey. NOTE a pre-existing hazard this makes worse: CFG.shiftHue
     below rotates a duplicate commander's palette by 42 degrees per
     duplicate, and with eight entries packed into the wheel a second British
     commander's shifted `main` can land near another nation's and archOf will
     silently hand it that nation's architecture. Worth a follow-up. */
  gbr:  { main: "#8f3f5c", dark: "#421a2b", light: "#d692ac" },
  fra:  { main: "#5f7fd6", dark: "#293a6b", light: "#a8bcf5" },
  deu:  { main: "#7a8a72", dark: "#343d31", light: "#c2cfba" },
};
/* rotate a palette entry's hue so duplicate factions stay tellable apart */
CFG.shiftHue = function (col, deg) {
  const hex2 = (h) => {
    const n = parseInt(h.slice(1), 16);
    return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  };
  const rot = (hex) => {
    const [r, g, b] = hex2(hex);
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let h = 0;
    if (d) {
      if (mx === r) h = ((g - b) / d) % 6;
      else if (mx === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
    }
    h = (h * 60 + deg + 360) % 360;
    const l = (mx + mn) / 2, s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2;
    let rr = 0, gg = 0, bb = 0;
    if (h < 60) { rr = c; gg = x; } else if (h < 120) { rr = x; gg = c; }
    else if (h < 180) { gg = c; bb = x; } else if (h < 240) { gg = x; bb = c; }
    else if (h < 300) { rr = x; bb = c; } else { rr = c; bb = x; }
    const to = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
    return "#" + to(rr) + to(gg) + to(bb);
  };
  return { main: rot(col.main), dark: rot(col.dark), light: rot(col.light) };
};

CFG.TEAM = [
  { name: "PLAYER", main: "#4b8fe0", dark: "#22406b", light: "#9ecbff" },
  { name: "ENEMY", main: "#d6503f", dark: "#6b241c", light: "#ff9d8c" },
];

/* terrain ids */
var T = { WATER: 0, SAND: 1, GRASS: 2, DIRT: 3, ROCK: 4, TREE: 5, ROAD: 6, URBAN: 7, MARSH: 8 };
CFG.TERRAIN = {
  0: { name: "water", pass: false, speed: 0, cover: 0, color: "#1d3b52" },
  1: { name: "sand", pass: true, speed: 0.82, cover: 0, color: "#a3925f" },
  2: { name: "grass", pass: true, speed: 1.00, cover: 0, color: "#46603a" },
  3: { name: "dirt", pass: true, speed: 0.92, cover: 0, color: "#6a5940" },
  4: { name: "rock", pass: false, speed: 0, cover: 0, color: "#5d5f58" },
  5: { name: "woods", pass: true, speed: 0.55, cover: CFG.COVER_HEAVY, color: "#2c4526" },
  6: { name: "road", pass: true, speed: 1.45, cover: 0, color: "#4a4a46" },
  /* built-up ground: slow going for armour, excellent cover for anyone dug in */
  7: { name: "built-up", pass: true, speed: 0.48, cover: CFG.COVER_HEAVY * 1.25, color: "#6d6a63" },
  /* marsh and sabkha salt flat: soft going, no cover, and it bogs tracks down */
  8: { name: "marsh", pass: true, speed: 0.40, cover: CFG.COVER_LIGHT, color: "#5a6350" },
};
