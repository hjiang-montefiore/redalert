/* ============ heavyair.js — the heavy fixed-wing fleet ============
   Three families the roster was missing, each with a real generational arc:

   B-52 STRATOFORTRESS. The point of the Buff is that it changed job without
   changing airframe. In 1955 it was a nuclear bomber that had to fly over the
   target; over Vietnam it carried a hundred and eight iron bombs and still had
   to fly over the target, and SA-2s killed it for doing so; from 1982 it
   carried cruise missiles and never had to go near one again. That progression
   is modelled as weapon RANGE: the early marks must penetrate the air defences
   to drop, the late ones shoot from beyond them.

   AC-130. A cargo aeroplane with artillery pointing out of its left side. It
   orbits and dismantles anything on the ground that cannot shoot back; against
   a fighter or a modern SAM it is simply a large slow target.

   C-130 HERCULES. The airlifter. It does not fight; it delivers.

   XIAN H-6. The same story as the Buff, told by the other side, and the
   reason it belongs in this file rather than in eras.js with the rest of the
   Chinese roster: one airframe, a Tu-16 first flown in China on 27 September
   1959, still the PLAAF's strategic aircraft sixty-five years later, and what
   changed across those decades is not how hard it hits but from how far away.
   1969 is free-fall bombs over the target; 1986 is two enormous liquid-fuelled
   anti-ship missiles launched from outside a task group's guns; 2009 is a
   cruise-missile rail that never approaches anything. Before this the game had
   exactly one H-6, the H-6N of 2019, and the whole sixty-year arc was invisible.
   e50 is EMPTY on purpose: two Soviet Tu-16s arrived in 1958 and the first
   Chinese-assembled aircraft flew in 1959, but the type did not enter PLAAF
   service until 1969 and there was no bomber force before that.


   XIAN H-6. The same story as the Buff, told by the other side, and the
   reason it belongs in this file rather than in eras.js with the rest of the
   Chinese roster: one airframe, a Tu-16 first flown in China on 27 September
   1959, still the PLAAF's strategic aircraft sixty-five years later, and what
   changed across those decades is not how hard it hits but from how far away.
   1969 is free-fall bombs over the target; 1986 is two enormous liquid-fuelled
   anti-ship missiles launched from outside a task group's guns; 2009 is a
   cruise-missile rail that never approaches anything. Before this the game had
   exactly one H-6, the H-6N of 2019, and the whole sixty-year arc was invisible.
   e50 is EMPTY on purpose: two Soviet Tu-16s arrived in 1958 and the first
   Chinese-assembled aircraft flew in 1959, but the type did not enter PLAAF
   service until 1969 and there was no bomber force before that.


   Loaded after eras.js so it can add to the roster and reindex.            */

(function () {
  "use strict";
  if (typeof UNITS === "undefined" || typeof WEAPONS === "undefined") return;

  /* ---------------------------------------------------------- armament --
     What separates a 1950s bomber from a modern one is not how hard it hits
     but from how far away. Range is in tiles; the heaviest surface-to-air
     systems in the game reach roughly 9-11 tiles. */
  var W = {
    /* free-fall iron bombs: enormous load, but the aeroplane has to be
       overhead, inside everything the enemy owns.

       `ammo` here is the cost of ONE TRIGGER PULL drawn from the aeroplane's
       own pool, not the size of the magazine - the same trap generations.js
       records against the Apache, where ammo 8 against a pool of 8 gave it one
       Hellfire a sortie. Both of these were set equal to the B-52's pool, so
       each B-52D flew out, dropped one stick, and turned for home: measured,
       six bombs from the e50 D and nine from the Big Belly, against published
       loads of fifty-one and a hundred and eight. One pull now costs one unit
       and the stick length is the burst; the number of sticks is the pool, set
       on each airframe below. */
    ironbombs:  { name: "Conventional bomb load", dmg: 135, warhead: "he", range: 2.2,
                  reload: 1.0, burst: 6, burstDelay: 0.22, acc: 0.62, proj: "bomb",
                  speed: 0, aoe: 3.4, suppress: 150, ammo: 1,
                  tgt: { ground: 1, air: 0, sea: 1, sub: 0 } },
    bigbelly:   { name: "Arc Light bomb load", dmg: 150, warhead: "he", range: 2.4,
                  reload: 0.9, burst: 9, burstDelay: 0.18, acc: 0.60, proj: "bomb",
                  speed: 0, aoe: 3.8, suppress: 190, ammo: 1,
                  tgt: { ground: 1, air: 0, sea: 1, sub: 0 } },
    /* the moment the Buff stopped having to overfly anything */
    alcm_b:     { name: "AGM-86B ALCM", dmg: 430, warhead: "he", range: 11.5, minRange: 3.0,
                  reload: 7.5, burst: 1, acc: 0.90, proj: "missile", speed: 300,
                  aoe: 2.6, suppress: 80, ammo: 1,
                  tgt: { ground: 1, air: 0, sea: 0, sub: 0 } },
    calcm:      { name: "AGM-86C CALCM", dmg: 460, warhead: "he", range: 13.0, minRange: 3.0,
                  reload: 7.0, burst: 1, acc: 0.93, proj: "missile", speed: 320,
                  aoe: 2.6, suppress: 85, ammo: 1,
                  tgt: { ground: 1, air: 0, sea: 0, sub: 0 } },
    jassm:      { name: "AGM-158 JASSM", dmg: 480, warhead: "he", range: 15.0, minRange: 3.0,
                  reload: 6.4, burst: 1, acc: 0.95, proj: "missile", speed: 340,
                  aoe: 2.6, suppress: 90, ammo: 1, stealthy: 0.55,
                  tgt: { ground: 1, air: 0, sea: 1, sub: 0 } },
    lrasm:      { name: "AGM-158C LRASM", dmg: 560, warhead: "he", range: 16.0, minRange: 3.5,
                  reload: 7.2, burst: 1, acc: 0.94, proj: "missile", speed: 330,
                  aoe: 2.2, suppress: 70, ammo: 1, stealthy: 0.60,
                  tgt: { ground: 0, air: 0, sea: 1, sub: 0 } },

    /* the gunship battery: everything fires out of the left side.

       THE POOL IS THE SORTIE - ten units on every gunship below - and a
       weapon's `ammo` is one pull's share of it, taken as 10 / (published
       rounds / burst). AFSOC publishes the magazines: the AC-130H and U carry
       100 rounds of 105 mm, 256 of 40 mm and 3,000 of 20/25 mm, and the
       AC-130J's Precision Strike Package holds ten Griffin in the Common
       Launch Tubes. So 105 mm = 10/100 = 0.10 a round; Bofors = 10/(256/3) =
       0.12 a three-round pull; Vulcan = 10/(3000/8) = 0.027 a burst; Griffin =
       10/10 = 1.

       The 30 mm is the one figure AFSOC does NOT publish for the J - the
       commonly quoted 600-round load is not an official number - so 0.08
       (10/(600/5)) is an estimate and is marked as one rather than dressed up.

       Griffin at 4 against a pool of 4 was the Apache trap all over again, and
       worse than the Apache's: entities.js:1409 gates on
       `this.ammo < (w.ammo || 1)`, so once the single missile emptied the pool
       the two GUNS - costing 0, therefore tested against 1 - were locked out
       too, and needRTB sent the aeroplane home. Measured before this change:
       an AC-130J ordered onto four T-90As fired one Griffin, turned for home
       at t=1.4s and killed none of them. */
    spectre20:  { name: "20mm Vulcan battery", dmg: 26, warhead: "bullet", range: 5.2,
                  reload: 0.13, burst: 8, burstDelay: 0.05, acc: 0.72, proj: "tracer",
                  speed: 840, aoe: 0.5, suppress: 30, ammo: 0.027,
                  tgt: { ground: 1, air: 0, sea: 1, sub: 0 } },
    bofors40:   { name: "40mm Bofors", dmg: 88, warhead: "he", range: 6.2,
                  reload: 0.55, burst: 3, burstDelay: 0.22, acc: 0.78, proj: "tracer",
                  speed: 780, aoe: 1.3, suppress: 55, ammo: 0.12,
                  tgt: { ground: 1, air: 0, sea: 1, sub: 0 } },
    howitzer105:{ name: "105mm M102 howitzer", dmg: 300, warhead: "he", range: 7.0,
                  reload: 3.4, burst: 1, acc: 0.80, proj: "arc", speed: 250,
                  aoe: 3.2, suppress: 130, ammo: 0.10,
                  tgt: { ground: 1, air: 0, sea: 1, sub: 0 } },
    gau23:      { name: "30mm GAU-23 chain gun", dmg: 64, warhead: "cannon", range: 6.0,
                  reload: 0.30, burst: 5, burstDelay: 0.10, acc: 0.84, proj: "tracer",
                  speed: 880, aoe: 0.8, suppress: 45, ammo: 0.08,
                  tgt: { ground: 1, air: 0, sea: 1, sub: 0 } },
    griffin:    { name: "AGM-176 Griffin", dmg: 210, warhead: "heat", range: 8.0,
                  reload: 3.0, burst: 1, acc: 0.95, proj: "missile", speed: 300,
                  aoe: 1.2, suppress: 40, ammo: 1,
                  tgt: { ground: 1, air: 0, sea: 1, sub: 0 } },

    /* ---- what the H-6 carried, decade by decade ----
       The first two are the same weapon class as the B-52's first two and are
       deliberately given the same short reach: to use either, the aeroplane
       has to be over or nearly over the thing it is attacking. */
    h6_bombs:   { name: "Free-fall bomb load", dmg: 130, warhead: "he", range: 2.2,
                  reload: 1.1, burst: 5, burstDelay: 0.24, acc: 0.58, proj: "bomb",
                  speed: 0, aoe: 3.2, suppress: 140, ammo: 5,
                  tgt: { ground: 1, air: 0, sea: 1, sub: 0 } },
    /* YJ-6 / C-601: a Silkworm scaled up and hung under a wing. Two rounds,
       each with a half-tonne warhead, launched from about 100 km - which in
       1986 was genuinely outside a task group's reach. It is also liquid
       fuelled, subsonic and flies high before it dives, so a ship that sees
       it coming has a real chance: the low intercept figure is the weapon's
       own weakness, not a balance adjustment. */
    yj6_c601:   { name: "YJ-6 (C-601) anti-ship missile", dmg: 340, warhead: "he",
                  range: 8.6, minRange: 2.0, reload: 9.0, burst: 1, acc: 0.70,
                  proj: "missile", speed: 280, aoe: 2.2, suppress: 60, ammo: 1,
                  tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
                  sfx: "missile", profile: "loft", intercept: 0.40 },
  };
  for (var wk in W) if (!WEAPONS[wk]) WEAPONS[wk] = W[wk];

  /* ------------------------------------------------------------- units --
     Shared shapes, so each entry below only states what actually differs. */
  function buff(o) {
    return Object.assign({
      fac: "nato", role: "heavybomber", cat: "aircraft", armor: "air", layer: "air",
      mass: 0, jet: true, turn: 0.55, sight: 9, r: 30,
      prereq: ["airbase", "lab"], tech: 3, rcs: 6.5, radarQ: 2, gen: 3,
    }, o);
  }
  function spectre(o) {
    return Object.assign({
      fac: "nato", role: "gunshipair", cat: "aircraft", armor: "air", layer: "air",
      mass: 0, jet: false, turn: 1.5, sight: 10, r: 20,
      prereq: ["airbase", "radar"], tech: 2, rcs: 3.4, radarQ: 2, gen: 3,
    }, o);
  }
  /* The H-6 shares the B-52's shape of problem and none of its size: half the
     span, two engines buried in the wing roots, and a glazed navigator's nose
     until the H-6K replaced it with a radome. Higher radar cross-section than
     a Buff relative to its size and a far worse self-defence fit, so it lives
     or dies on the reach of what it carries. */
  function badger(o) {
    return Object.assign({
      fac: "pla", role: "heavybomber", cat: "aircraft", armor: "air", layer: "air",
      mass: 0, jet: true, turn: 0.9, sight: 9, r: 24,
      prereq: ["airbase", "lab"], tech: 3, rcs: 5.2, radarQ: 2, gen: 2.5,
    }, o);
  }
  /* The H-6 shares the B-52's shape of problem and none of its size: half the
     span, two engines buried in the wing roots, and a glazed navigator's nose
     until the H-6K replaced it with a radome. Higher radar cross-section than
     a Buff relative to its size and a far worse self-defence fit, so it lives
     or dies on the reach of what it carries. */
  function badger(o) {
    return Object.assign({
      fac: "pla", role: "heavybomber", cat: "aircraft", armor: "air", layer: "air",
      mass: 0, jet: true, turn: 0.9, sight: 9, r: 24,
      prereq: ["airbase", "lab"], tech: 3, rcs: 5.2, radarQ: 2, gen: 2.5,
    }, o);
  }
  function herc(o) {
    return Object.assign({
      fac: "nato", role: "airlift", cat: "aircraft", armor: "air", layer: "air",
      mass: 0, jet: false, turn: 1.4, sight: 8, r: 20, weapons: [],
      prereq: ["airbase"], tech: 1, rcs: 3.6, radarQ: 0, gen: 2,
    }, o);
  }

  var NEW = {
    /* ---- B-52: the same aeroplane, four different jobs ---- */
    nato_e50_heavybomber: buff({
      name: "B-52D Stratofortress", full: "Boeing B-52D Stratofortress",
      /* 51 bombs: 27 x 500lb internal + 24 x 750lb on the wings. Eight sticks of six. */
      cost: 3800, oil: 105, time: 48, hp: 820, speed: 4.6, ammo: 8, radius: 96,
      weapons: ["ironbombs"], from: "e50", to: "e50",
      desc: "Eight engines and a bomb bay, and no way to use either without flying " +
            "directly over the target. Devastating on anything it reaches; every " +
            "surface-to-air missile between here and there gets a shot at it first." }),
    nato_e60_heavybomber: buff({
      name: "B-52D Big Belly", full: "B-52D (Big Belly) Arc Light",
      /* the Big Belly mod, 1965-67: 84 x 500lb internal + 24 x 750lb on the
         wings = the 108 the description already promises. Twelve sticks of nine. */
      cost: 4000, oil: 110, time: 50, hp: 860, speed: 4.6, ammo: 12, radius: 100,
      weapons: ["bigbelly"], from: "e60", to: "e60",
      desc: "The Arc Light fit: a hundred and eight bombs in one aeroplane, laid " +
            "down in a box a kilometre long. Still has to overfly the target, and " +
            "over Hanoi that is exactly how they were lost." }),
    nato_e80_heavybomber: buff({
      name: "B-52G Stratofortress", full: "B-52G with AGM-86B ALCM",
      /* twelve AGM-86B on the two external pylons. The G never received the
         Common Strategic Rotary Launcher, so twelve is the whole load - this is
         the one Buff that should NOT get twenty, and the difference is real. */
      cost: 4300, oil: 108, time: 52, hp: 880, speed: 4.7, ammo: 12, radius: 106,
      weapons: ["alcm_b"], from: "e80", to: "e80",
      desc: "The change that saved the aeroplane. It now launches cruise missiles " +
            "from outside the missile belt and turns for home without ever " +
            "entering it. The airframe is thirty years old; the tactic is new." }),
    nato_e90_heavybomber: buff({
      name: "B-52H (CALCM)", full: "B-52H with AGM-86C CALCM",
      /* 20 AGM-86C: twelve external, eight on the internal rotary launcher. */
      cost: 4400, oil: 106, time: 52, hp: 900, speed: 4.7, ammo: 20, radius: 110,
      weapons: ["calcm"], from: "e90", to: "e90",
      desc: "Conventional cruise missiles fired from further out than anything on " +
            "the ground can answer. The Buff has become a launch rail that happens " +
            "to have wings." }),
    nato_e00_heavybomber: buff({
      name: "B-52H (JASSM)", full: "B-52H with AGM-158 JASSM",
      /* 20 JASSM after the 1760 Internal Weapons Bay Upgrade (IOC 2017) put
         eight on a Conventional Rotary Launcher beside the twelve on the wings -
         the 66 per cent smart-weapon increase the programme was sold on. The
         description below already says twenty; the aeroplane carried six. */
      cost: 4600, oil: 104, time: 53, hp: 920, speed: 4.7, ammo: 20, radius: 112,
      weapons: ["jassm"], from: "e00", to: "e00",
      desc: "Low-observable standoff missiles, twenty of them, released far beyond " +
            "the reach of any area defence. Slow, huge, and almost never in danger." }),
    hbomber_n: buff({
      name: "B-52H Stratofortress", full: "B-52H with JASSM-ER and LRASM",
      /* the same twenty stations, shared between the land and the anti-ship
         round. LRASM's per-aircraft figure is not published as firmly as
         JASSM's, so it draws on the JASSM magazine rather than getting an
         invented one of its own. */
      cost: 4800, oil: 104, time: 54, hp: 940, speed: 4.7, ammo: 20, radius: 115,
      weapons: ["jassm", "lrasm"], from: "e20",
      desc: "Seventy years old and still the longest reach in the inventory. " +
            "Stealthy standoff missiles against land targets and anti-ship missiles " +
            "against a fleet, all launched from a stand-off it will never leave." }),

    /* ---- AC-130: artillery in an orbit ---- */
    nato_e60_gunshipair: spectre({
      name: "AC-130A Spectre", full: "Lockheed AC-130A Spectre",
      /* one sortie = ten units; see the battery above. */
      cost: 2400, oil: 62, time: 30, hp: 620, speed: 3.0, ammo: 10, radius: 46,
      weapons: ["spectre20"], from: "e60", to: "e60",
      desc: "A Hercules with four Vulcans pointing out of the left side. It banks " +
            "into a pylon turn and holds the guns on one spot until nothing is " +
            "moving. Anything that shoots back at altitude ends the show." }),
    nato_e80_gunshipair: spectre({
      name: "AC-130H Spectre", full: "AC-130H Spectre (105mm)",
      /* one sortie = ten units; see the battery above. */
      cost: 2900, oil: 68, time: 34, hp: 680, speed: 3.0, ammo: 10, radius: 46,
      weapons: ["howitzer105", "bofors40", "spectre20"], from: "e80", to: "e90",
      desc: "Now with a 105mm howitzer firing out of the side of an aeroplane. " +
            "Between the howitzer, the Bofors and the Vulcans it can take apart a " +
            "position in a single orbit." }),
    nato_e00_gunshipair: spectre({
      name: "AC-130U Spooky II", full: "AC-130U Spooky II",
      /* one sortie = ten units; see the battery above. */
      cost: 3200, oil: 70, time: 36, hp: 720, speed: 3.1, ammo: 10, radius: 46,
      weapons: ["howitzer105", "gau23"], from: "e00", to: "e00",
      desc: "Fire control finally caught up with the guns: one crew, all three " +
            "weapons, three separate targets at once." }),
    gunshipair_n: spectre({
      name: "AC-130J Ghostrider", full: "AC-130J Ghostrider",
      /* one sortie = ten units; see the battery above. */
      cost: 3400, oil: 72, time: 38, hp: 760, speed: 3.2, ammo: 10, radius: 46,
      weapons: ["howitzer105", "gau23", "griffin"], from: "e20",
      desc: "The gunship with a missile rail. Precision munitions off the wing and " +
            "a howitzer out of the side door — but it still has to loiter in the " +
            "open to use either." }),

    /* ---- H-6: sixty-five years of the same aeroplane ----
       e50 is empty. The H-6 did not enter PLAAF service until 1969, and the
       KD-20 of the last two rows is the SAME missile on both, because it is:
       what the H-6N adds over the H-6K is a refuelling probe and a recess for
       an air-launched ballistic missile, not a better cruise missile. */
    pla_e60_heavybomber: badger({
      name: "H-6A", full: "Xian H-6A, free-fall nuclear bomber",
      cost: 2900, oil: 78, time: 40, hp: 760, speed: 4.3, ammo: 5, radius: 62,
      weapons: ["h6_bombs"], from: "e60", to: "e60",
      service: "1969", confidence: "high",
      desc: "China's strategic bomber force in one aircraft type. Nine tonnes of " +
            "bombs in the bay and no way to deliver any of it without flying over " +
            "the target, which against the air defences of its own decade is a " +
            "one-way proposition. Its whole claim is that it carried the country's " +
            "first air-dropped nuclear weapon." }),
    pla_e80_heavybomber: badger({
      name: "H-6D", full: "Xian H-6D with two YJ-6 (C-601)",
      cost: 3200, oil: 82, time: 43, hp: 800, speed: 4.3, ammo: 2, radius: 66,
      weapons: ["yj6_c601"], from: "e80", to: "e90",
      service: "1986", confidence: "high",
      desc: "The moment the aeroplane stopped having to overfly anything. A " +
            "sea-search radar under the nose and one enormous anti-ship missile " +
            "under each wing: first flight 29 August 1981, live firing at the end " +
            "of 1983, in PLA Naval Air Force service from 1986. It is the whole of " +
            "Chinese maritime strike for the next fifteen years, which is why the " +
            "row runs to e90 - nothing replaced it until the cruise-missile fits." }),
    pla_e00_heavybomber: badger({
      name: "H-6K", full: "Xian H-6K with KD-20 cruise missiles",
      cost: 3400, oil: 78, time: 45, hp: 850, speed: 4.4, ammo: 4, radius: 78,
      weapons: ["alcm"], from: "e00", to: "e00",
      service: "2009", confidence: "high", rcs: 3.4, radarQ: 4, gen: 3.5,
      desc: "The rebuild that bought the airframe another forty years: the glazed " +
            "nose replaced by a radome, Russian D-30 turbofans for range, a glass " +
            "cockpit, and six pylons for cruise missiles. First flight 5 January " +
            "2007, in service October 2009. It launches from outside every " +
            "surface-to-air system on the map and turns for home." }),

    /* ---- H-6: sixty-five years of the same aeroplane ----
       e50 is empty. The H-6 did not enter PLAAF service until 1969, and the
       KD-20 of the last two rows is the SAME missile on both, because it is:
       what the H-6N adds over the H-6K is a refuelling probe and a recess for
       an air-launched ballistic missile, not a better cruise missile. */
    pla_e60_heavybomber: badger({
      name: "H-6A", full: "Xian H-6A, free-fall nuclear bomber",
      cost: 2900, oil: 78, time: 40, hp: 760, speed: 4.3, ammo: 5, radius: 62,
      weapons: ["h6_bombs"], from: "e60", to: "e60",
      service: "1969", confidence: "high",
      desc: "China's strategic bomber force in one aircraft type. Nine tonnes of " +
            "bombs in the bay and no way to deliver any of it without flying over " +
            "the target, which against the air defences of its own decade is a " +
            "one-way proposition. Its whole claim is that it carried the country's " +
            "first air-dropped nuclear weapon." }),
    pla_e80_heavybomber: badger({
      name: "H-6D", full: "Xian H-6D with two YJ-6 (C-601)",
      cost: 3200, oil: 82, time: 43, hp: 800, speed: 4.3, ammo: 2, radius: 66,
      weapons: ["yj6_c601"], from: "e80", to: "e90",
      service: "1986", confidence: "high",
      desc: "The moment the aeroplane stopped having to overfly anything. A " +
            "sea-search radar under the nose and one enormous anti-ship missile " +
            "under each wing: first flight 29 August 1981, live firing at the end " +
            "of 1983, in PLA Naval Air Force service from 1986. It is the whole of " +
            "Chinese maritime strike for the next fifteen years, which is why the " +
            "row runs to e90 - nothing replaced it until the cruise-missile fits." }),
    pla_e00_heavybomber: badger({
      name: "H-6K", full: "Xian H-6K with KD-20 cruise missiles",
      cost: 3400, oil: 78, time: 45, hp: 850, speed: 4.4, ammo: 4, radius: 78,
      weapons: ["alcm"], from: "e00", to: "e00",
      service: "2009", confidence: "high", rcs: 3.4, radarQ: 4, gen: 3.5,
      desc: "The rebuild that bought the airframe another forty years: the glazed " +
            "nose replaced by a radome, Russian D-30 turbofans for range, a glass " +
            "cockpit, and six pylons for cruise missiles. First flight 5 January " +
            "2007, in service October 2009. It launches from outside every " +
            "surface-to-air system on the map and turns for home." }),

    /* ---- C-130: the airlifter ---- */
    nato_e50_airlift: herc({
      name: "C-130A Hercules", full: "Lockheed C-130A Hercules",
      cost: 1200, oil: 40, time: 20, hp: 560, speed: 3.0, ammo: 0, radius: 62,
      cargo: 5, from: "e50", to: "e60",
      desc: "Four turboprops, a high wing and a ramp at the back. It does not " +
            "fight; it puts a company somewhere the roads do not go." }),
    nato_e80_airlift: herc({
      name: "C-130H Hercules", full: "Lockheed C-130H Hercules",
      cost: 1400, oil: 42, time: 22, hp: 620, speed: 3.1, ammo: 0, radius: 62,
      cargo: 6, from: "e80", to: "e00",
      desc: "The definitive Hercules. Still four turboprops and a ramp, still the " +
            "aeroplane everybody actually uses." }),
    airlift_n: herc({
      name: "C-130J Super Hercules", full: "Lockheed Martin C-130J-30",
      cost: 1600, oil: 40, time: 23, hp: 680, speed: 3.4, ammo: 0, radius: 62,
      cargo: 8, from: "e20",
      desc: "Six-bladed scimitar propellers and a stretched hold. Faster and " +
            "further than the H, and it lands on the same dirt strip." }),
  };

  for (var id in NEW) {
    if (UNITS[id]) continue;
    NEW[id].id = id;
    UNITS[id] = NEW[id];
  }

  /* the roles are new, so the index has to be rebuilt for unitFor() to see them */

  /* rules.js flags every jet as able to take fuel from a tanker, but it runs
     before this file exists, so the aircraft defined here were never covered
     and a B-52 could not use a tanker. Repeat the rule for our own units. */
  for (var _rf in NEW) {
    var _u = UNITS[_rf];
    if (_u && _u.cat === "aircraft" && _u.jet && !_u.tanker && !_u.hover) _u.refuelable = true;
  }

  if (typeof reindexRoles === "function") reindexRoles();

  /* the airbase holds a fixed number of sorties per airframe; a heavy takes
     more room on the ramp than a fighter */
  if (typeof FIXED_MAGAZINE !== "undefined") {
    var MAG = { hbomber_n: 1, gunshipair_n: 2, airlift_n: 2 };
    for (var mk in MAG) if (UNITS[mk]) UNITS[mk].magazine = MAG[mk];
  }
})();
