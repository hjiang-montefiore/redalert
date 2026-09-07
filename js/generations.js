/* ============ generations.js — gun and armour by generation ============

   Two things in this game were welded together that are physically separate,
   and this file pulls them apart.

   1. PENETRATION was derived from damage.  penOf() falls back to
      dmg * PEN_PER_DMG when a weapon declares no `pen`, and until now not one
      of the 533 weapons declared one. So a gun's ability to defeat armour was
      locked to how hard it hit once through. Those are different properties:
      a long-rod penetrator gets through a great deal and does modest damage
      behind it; a 152 mm howitzer shell is the reverse.

   2. ARMOUR was derived from hit points, as 540 * sqrt(hp / 1500). Hit points
      cannot grow fourfold across the eras without making a modern tank
      unkillable, so armour could not either — it grew 1.39x while real frontal
      protection grew about fourfold. And because penetration scaled linearly
      with damage while armour scaled with a SQUARE ROOT, the ratio between
      them climbed monotonically across the eras as a pure artifact of the
      maths. Nobody chose it. It made the 1950s the most armour-favoured
      period in the game, which is the exact opposite of the truth.

   The real history is a see-saw, not a ramp:

     1950s   guns and armour matched. A 90 mm and a 100 mm could kill each
             other at combat range. Bloody.
     1960s   guns pull ahead. 105 mm APDS against 230 mm of steel. The
             bloodiest period, and the one that made people say the tank
             was dead.
     1980s   armour wins. Chobham and Kontakt-5 briefly beat every gun
             pointed at them, which is the whole reason the ATGM, the attack
             helicopter and AirLand Battle mattered.
     1990s+  guns claw back with depleted uranium and tandem charges, and
             the argument moves to the roof: top attack and active protection.

   Below, each army gets its OWN curve, because they did not modernise
   together. NATO climbs steadily. The PLA is nearly flat until 1990 and then
   climbs faster than anyone. The Soviet Union keeps pace to 1985 and then
   Russia flattens hard — serial production collapsed, and the round in the
   racks of most of the fleet is still a 1980s 3BM42. The KPA effectively
   stops in the 1980s: the Chonma-ho line is a T-62 derivative and there is no
   domestic supply of modern long rods. The ROC buys American, one step behind.

   All figures are mm RHA-equivalent: penetration for a kinetic round at about
   two kilometres, protection for the turret front against the same. Public
   numbers for composite and reactive armour are estimates — the real ones are
   classified — so treat them as shape rather than precision.            */
(function () {
  "use strict";
  if (typeof UNITS === "undefined" || typeof WEAPONS === "undefined") return;

  var ERAS_L = ["e50", "e60", "e80", "e90", "e00", "e20"];
  function eIdx(e) { var i = ERAS_L.indexOf(e); return i < 0 ? 5 : i; }

  /* ---------------------------------------------------------------- guns */
  /* what the main gun of that army's standard tank could defeat, by period */
  var GUN_PEN = {
    /*         1950  1960  1980  1990  2000  2020 */
    nato: [ 185,  275,  470,  570,  720,  780 ],
    pact: [ 185,  270,  430,  500,  580,  620 ],
    pla:  [ 115,  190,  300,  450,  600,  700 ],
    kpa:  [ 115,  185,  265,  300,  340,  365 ],
    roc:  [ 130,  190,  290,  350,  400,  440 ],
  };

  /* ------------------------------------------------------------- armour */
  /* Frontal protection against a kinetic round, as a COMPOSITE of what the
     tank actually presents head-on - turret face, hull glacis and lower front
     plate together - not the turret's best figure. The distinction matters:
     an M1A2's turret cheek is quoted at 800-960 mm but its hull front is
     nearer 600, and a round arrives at whichever it meets. Quoting the turret
     maximum against a fleet-average penetration figure compares an optimistic
     number with a pessimistic one, and the first pass of this table did
     exactly that - it left the 1980s unresolvable and made Russian armour
     unable to scratch an Abrams at any range. */
  var ARM_FRONT = {
    nato: [ 148,  205,  484,  558,  648,  689 ],
    pact: [ 164,  197,  459,  525,  590,  640 ],
    pla:  [  70,  156,  197,  369,  541,  640 ],
    kpa:  [  70,  156,  189,  230,  271,  291 ],
    roc:  [  70,  148,  172,  213,  238,  262 ],
  };

  /* A tank got steadily more lopsided. A T-54's side is 80 mm against 200 of
     glacis; an Abrams' is under a tenth of its frontal array. So the value of
     getting round the flank grows with the period, which is the opposite of
     what a single fixed ratio would say. */
  var SIDE_R = [0.42, 0.36, 0.22, 0.17, 0.14, 0.13];
  var REAR_R = [0.26, 0.22, 0.13, 0.10, 0.085, 0.08];
  /* the roof barely moved in seventy years, which is why top attack won */
  var TOP_MM = [ 20,   25,   38,   42,   48,   52 ];

  /* What a role does to the gun. Armour is deliberately NOT keyed off role:
     the role names in this game describe a job, not a hull. "lighttank" is
     the ROC's M60A3 - a 47-tonne machine with heavy-class armour - and
     "tankdestroyer" is a Stryker with an aluminium box. Scaling protection by
     role name gave the Stryker 289 mm of frontal armour and the M60A3 eighty-
     nine, which is upside down in both directions and is why eight ATGM
     carriers were beating eight T-90s six to nothing. Armour is keyed off the
     armour CLASS instead, below. */
  var ROLE_GUN = { mbt: 1.00, heavy: 1.06, lighttank: 0.80, tankdestroyer: 1.05 };
  var GUN_ROLE = { mbt: 1, heavy: 1, lighttank: 1, tankdestroyer: 1 };

  /* A handful of vehicles are not their army's standard and should not be
     read off the standard curve. The T-14 is the sharp case: its 2A82-1M is a
     genuinely better weapon than a T-90A's, and the tank is also a machine
     that never entered serial service — about twenty pre-production hulls,
     publicly conceded to be too expensive, briefly shown near Ukraine and
     withdrawn. It belongs in the game, but as an expensive rarity rather than
     the cheapest heavy tank on the board, which is what it was. */
  var SPECIAL = {
    hvy_p:  { pen: 900, front: 779, note: "T-14: excellent, and almost imaginary" },
    hvy_n:  { pen: 800, front: 787 },
    hvy_c:  { pen: 730, front: 738 },
    hvy_r:  { pen: 780, front: 738 },   /* M1A2T is an Abrams, not a CM-11 */
    hvy_k:  { pen: 380, front: 353 },
    mbt_c:  { pen: 700, front: 640 },
  };

  function U_clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function facOf(u) { return u.fac === "both" ? "nato" : u.fac; }

  /* A weapon may be shared by several tanks — five armies fire "gun_125" —
     so a shared entry is cloned before it is stamped. Otherwise the last
     army to be processed would set the penetration for everyone. */
  var cloned = {};
  function privateWeapon(unitId, wid) {
    var key = wid + "__" + unitId;
    if (!cloned[key]) {
      var src = WEAPONS[wid];
      if (!src) return null;
      var c = {};
      for (var k in src) c[k] = src[k];
      if (src.tgt) { c.tgt = {}; for (var t in src.tgt) c.tgt[t] = src.tgt[t]; }
      WEAPONS[key] = c;
      cloned[key] = true;
    }
    return key;
  }

  /* --------------------------------------------------------------- apply */
  var nArm = 0, nPen = 0;
  for (var uid in UNITS) {
    var u = UNITS[uid];
    if (!u || u.cat !== "vehicle") continue;
    var role = u.role;
    if (!GUN_ROLE[role]) continue;
    var f = facOf(u), i = eIdx(u.from);
    if (!GUN_PEN[f]) continue;

    var sp = SPECIAL[uid] || {};
    /* Only something built as a tank carries a tank's plate. A thin-skinned
       missile carrier keeps the light-class derivation it already had, which
       is the whole point of it: a tank's reach on a vehicle that cannot take
       a hit. */
    if (u.armor === "heavy") {
      /* within the class, a heavier machine of the same generation is a
         better protected one - this is what keeps a Songun-ho ahead of a
         Chonma-ho without needing a row of its own */
      var typical = 1500;
      var hpScale = Math.sqrt(U_clamp((u.hp || typical) / typical, 0.55, 1.9));
      var front = sp.front !== undefined ? sp.front
                : Math.round(ARM_FRONT[f][i] * hpScale);
      u.armorMM = {
        front: front,
        side:  Math.round(front * SIDE_R[i]),
        rear:  Math.round(front * REAR_R[i]),
        top:   Math.round(TOP_MM[i] * (role === "heavy" ? 1.25 : 1)),
      };
      nArm++;
    }

    /* the gun */
    var wid = (u.weapons || [])[0];
    if (!wid || !WEAPONS[wid]) continue;
    var w0 = WEAPONS[wid];
    if (w0.warhead !== "cannon") continue;
    var pen = sp.pen !== undefined ? sp.pen
            : Math.round(GUN_PEN[f][i] * ROLE_GUN[role]);
    var pid = privateWeapon(uid, wid);
    if (!pid) continue;
    WEAPONS[pid].pen = pen;
    u.weapons = u.weapons.slice();
    u.weapons[0] = pid;
    nPen++;
  }

  /* ======================================================================
     RANGES
     ======================================================================
     A tile is roughly 15 m, so a tank gun at 8 tiles stands in for 3,000 m
     and everything is compressed by a factor of twenty-five or more. Absolute
     realism is not available at this scale and never was. What matters, and
     what decides whether combined arms exists at all, is the RATIO between
     systems — and there every anti-armour weapon in the game had been packed
     into the same four to eight tiles, with the tank gun at the top of the
     band. Nothing could shoot a tank from outside the tank's own reach, so
     the tank was strictly the best answer to every ground question.

     Each range below is the real one expressed as a multiple of a modern tank
     gun's 3,000 m, raised to the power 0.45, times 8 tiles. The exponent is
     the only free parameter: it keeps the ordering exact while pulling a
     tenfold real spread down to a threefold game spread, so the longest land
     weapon sits at 23 tiles on a 144-tile map instead of off the edge of it.

     Note what this does NOT do. A Javelin is a 2,500 m weapon and is
     genuinely out-ranged by a tank gun; it stays short, and gets top attack
     instead, which is its actual advantage. A Kornet reaches 5,500 m and had
     been sharing the Javelin's single stat line. That is the error — not
     "missiles should out-range guns" as a blanket rule.                  */
  var TILE_AT_3KM = 8.0;
  function R(metres) {
    return Math.round(TILE_AT_3KM * Math.pow(metres / 3000, 0.45) * 10) / 10;
  }

  function setW(id, fields) {
    var w = WEAPONS[id];
    if (!w) return false;
    for (var k in fields) w[k] = fields[k];
    return true;
  }

  /* ---- the shared modern launchers, split per army ---- */
  /* Javelin: short, fire-and-forget, and it flies over the target and hits
     the roof. That is the whole weapon. */
  var JAV = { name: "FGM-148 Javelin", range: R(2500), dmg: 130, pen: 750,
              belly: true, reload: 6.4, acc: 0.92, minRange: 0.9 };
  /* Kornet: nearly twice the reach, rides a beam onto the front plate. */
  var KOR = { name: "9M133 Kornet", range: R(5500), dmg: 150, pen: 1000,
              belly: false, reload: 7.4, acc: 0.78, minRange: 1.4 };

  var AT_BY_FAC = {
    nato: JAV,
    roc:  JAV,
    pact: KOR,
    /* HJ-12 is China's Javelin: fire-and-forget, top attack, shorter */
    pla:  { name: "HJ-12 Red Arrow", range: R(4000), dmg: 128, pen: 720,
            belly: true, reload: 6.6, minRange: 1.0 },
    /* Bulsae-3 is a Kornet pattern built without Kornet's metallurgy */
    kpa:  { name: "Bulsae-3", range: R(5000), dmg: 132, pen: 700,
            belly: false, reload: 9.4, acc: 0.66, minRange: 1.4 },
  };

  /* vehicle launchers: TOW-2B also flies over and fires downward */
  var ATV_BY_FAC = {
    nato: { name: "TOW-2B Aero", range: R(4500), dmg: 150, pen: 900,
            belly: true, reload: 7.0 },
    roc:  { name: "TOW-2B", range: R(4500), dmg: 148, pen: 880,
            belly: true, reload: 7.2 },
    pact: { name: "9M123 Khrizantema", range: R(6000), dmg: 165, pen: 1000,
            belly: false, reload: 8.0, acc: 0.80 },
    pla:  { name: "AFT-10", range: R(8000), dmg: 158, pen: 1050,
            belly: false, reload: 8.0 },
    kpa:  { name: "Bulsae-4", range: R(5000), dmg: 140, pen: 720,
            belly: false, reload: 10.0, acc: 0.68 },
  };

  /* Clone the shared launcher for each army that carries it, the same way
     the tank guns were handled. */
  for (var uid2 in UNITS) {
    var u2 = UNITS[uid2];
    if (!u2 || !u2.weapons || !u2.weapons.length) continue;
    var base = u2.weapons[0];
    var tbl = base === "atgm_inf" ? AT_BY_FAC
            : base === "atgm_veh" ? ATV_BY_FAC : null;
    if (!tbl) continue;
    var spec = tbl[facOf(u2)];
    if (!spec) continue;
    var pid2 = privateWeapon(uid2, base);
    if (!pid2) continue;
    setW(pid2, spec);
    u2.weapons = u2.weapons.slice();
    u2.weapons[0] = pid2;
  }

  /* ---- everything else that had been crushed into the same band ---- */
  setW("hellfire", { range: R(8000), pen: 1000 });          /* 8 km, and it should feel like it */
  /* ---- FAULT 04: air defence against something that is not a helicopter ----
     Six A-10s destroyed four Stinger teams in 4.2 seconds without taking a
     point of damage. The missile was not the problem: an aircraft at 5.6
     tiles a second crosses a 9.7-tile envelope in under two seconds, which is
     less than one reload, so the crew got a single shot per pass at best and
     usually none. Against helicopters - which are slow - the identical model
     works well, and that is the tell.

     A MANPADS gunner tracking an inbound jet does not wait a full reload
     cycle between launches; the section has several tubes and several
     gunners. Shortening the cycle while leaving accuracy alone gives them
     three or four attempts during a pass instead of one, which is what makes
     ground-based air defence a threat rather than scenery. */
  setW("manpad",   { range: R(4800), reload: 2.3 });         /* Stinger */
  setW("spaag",    { range: R(5500) });                      /* gun + short missile blend */
  setW("mlrs",     { range: R(32000), minRange: 6.0 });
  setW("mortar",   { range: R(5700), minRange: 2.2 });
  setW("at_gun",   { range: R(2600) });                      /* a towed gun is not longer-ranged than a tank */

  /* Artillery that is named rather than era-coded fell through the pass
     below, which is how a 240 mm rocket launcher ended up shorter-legged
     than a 155 mm howitzer. These are the real figures, and one of them
     matters a great deal: massed long-range tube and rocket artillery is the
     single thing North Korea is genuinely world-class at, and the Koksan
     out-ranging everything NATO can field is the correct and interesting
     answer to an army that is behind in every other domain. */
  setW("howitzer", { range: R(24000), minRange: 5.0 });      /* M109, 24 km */
  setW("koksan",   { range: R(40000), minRange: 6.5 });      /* M-1978 170 mm */
  setW("mrl240",   { range: R(43000), minRange: 6.0 });      /* M1991 240 mm MRL */

  /* Era launchers: a Sagger is not a Kornet. Scale each period's missile by
     what that generation could actually reach, against the modern figure. */
  var AT_ERA_M = { e50: 1600, e60: 3000, e80: 4000, e90: 5000, e00: 5000, e20: 5500 };
  var SAM_ERA_M = { e50: 2500, e60: 3500, e80: 4200, e90: 4500, e00: 4800, e20: 4800 };
  var ART_ERA_M = { e50: 15000, e60: 18000, e80: 24000, e90: 28000, e00: 30000, e20: 32000 };
  for (var wid3 in WEAPONS) {
    var m = /^w_(e\d\d)_([a-z]+)_([a-z]+)$/.exec(wid3);
    if (!m) continue;
    var era = m[1], role3 = m[3], w3 = WEAPONS[wid3];
    if (role3 === "at" || role3 === "tankdestroyer" || role3 === "gunship") {
      var reach = AT_ERA_M[era] || 4000;
      /* a gunship's missile outreaches an infantry launcher of the same year */
      if (role3 === "gunship") reach *= 1.6;
      w3.range = R(reach);
    } else if (role3 === "aa" || role3 === "spaag") {
      w3.range = R(SAM_ERA_M[era] || 4000);
      if (role3 === "aa") w3.reload = Math.min(w3.reload || 4.6, 2.6);
    } else if (role3 === "mlrs" || role3 === "spg") {
      w3.range = R(ART_ERA_M[era] || 24000);
      w3.minRange = Math.max(w3.minRange || 0, 5.0);
    }
  }

  /* ======================================================================
     WHAT EACH ARMY IS ACTUALLY GOOD AT
     ======================================================================
     Flattening the Russian and Korean tank curves is only half the job. It
     would be just as wrong to hand those armies peer-grade optics, guided
     munitions and air-to-air missiles in 2020 simply because the calendar
     says 2020. They did not modernise uniformly, and - this is the part worth
     getting right - they did not modernise WORSE at everything either.

     Russia's ground-based air defence is genuinely first rate and arguably
     ahead of NATO's; its artillery is good; its tank fleet is a 1980s design
     with new optics on some of it; its precision munitions, thermal sights,
     datalinks and surface navy are well behind. North Korea has the largest
     tube and rocket artillery park on earth and almost nothing else that is
     current: no fleet-wide thermal sights, no datalink, an air force flying
     MiG-21s, and guided weapons it can build only in small numbers.

     So each army is scored per domain rather than given one global level.
     1.00 is the NATO standard of that decade. Above 1.00 means genuinely
     better, and two of these armies are, in exactly one domain each.

     These multipliers only bite from the 1990s onward - before that the
     Warsaw Pact really was a peer and the model should say so.            */
  var DOMAIN = {
    /*        optics  guided   a2a   airdef  arty   naval */
    nato: { optics:1.00, guided:1.00, a2a:1.00, airdef:0.88, arty:1.00, naval:1.00 },
    pact: { optics:0.72, guided:0.68, a2a:0.90, airdef:1.15, arty:1.05, naval:0.72 },
    pla:  { optics:0.92, guided:0.90, a2a:0.95, airdef:1.00, arty:1.05, naval:0.95 },
    kpa:  { optics:0.52, guided:0.46, a2a:0.50, airdef:0.66, arty:1.00, naval:0.48 },
    roc:  { optics:0.92, guided:0.88, a2a:0.88, airdef:0.82, arty:0.86, naval:0.72 },
  };
  /* how much of the gap is felt in each period: none in the 1950s, all of it
     now. The Warsaw Pact of 1975 was not behind; Russia of 2024 is. */
  var DOMAIN_BITE = { e50: 0.00, e60: 0.10, e80: 0.35, e90: 0.70, e00: 0.90, e20: 1.00 };

  function dmul(fac, era, key) {
    var D = DOMAIN[fac]; if (!D) return 1;
    var b = DOMAIN_BITE[era]; if (b === undefined) b = 1;
    return 1 + (D[key] - 1) * b;
  }

  var AIRDEF_ROLE = { aa: 1, spaag: 1, sead: 0 };
  var ARTY_ROLE   = { mlrs: 1, spg: 1, mortar: 1 };
  var nDom = 0;
  for (var uid5 in UNITS) {
    var u5 = UNITS[uid5];
    if (!u5 || !u5.weapons || !u5.weapons.length) continue;
    var f5 = facOf(u5), e5 = u5.from || "e20";
    if (!DOMAIN[f5]) continue;

    var opt = dmul(f5, e5, "optics");
    for (var q5 = 0; q5 < u5.weapons.length; q5++) {
      var wid5 = u5.weapons[q5], w5 = WEAPONS[wid5];
      if (!w5) continue;
      var acc = 1, rng = 1, mul = 1;
      /* guidance quality: a guided round you cannot build well is a round
         that misses */
      if (w5.proj === "missile" || w5.guided) { acc *= dmul(f5, e5, "guided"); mul = 1; }
      else acc *= (0.6 + 0.4 * opt);            /* unguided still needs a sight */
      if (AIRDEF_ROLE[u5.role]) { var ad = dmul(f5, e5, "airdef"); acc *= ad; rng *= (0.8 + 0.2 * ad); }
      if (ARTY_ROLE[u5.role])   { var ar = dmul(f5, e5, "arty");   rng *= (0.85 + 0.15 * ar); }
      if (u5.role === "fighter" || u5.role === "cfighter" || u5.role === "stealthfighter") {
        var aa5 = dmul(f5, e5, "a2a"); acc *= aa5; rng *= (0.7 + 0.3 * aa5);
      }
      if (u5.layer === "sea" || u5.layer === "sub") {
        var nv = dmul(f5, e5, "naval"); acc *= (0.7 + 0.3 * nv); rng *= (0.85 + 0.15 * nv);
      }
      if (acc === 1 && rng === 1) continue;
      var pw = privateWeapon(uid5, wid5);
      if (!pw) continue;
      if (WEAPONS[pw].acc !== undefined)
        WEAPONS[pw].acc = Math.max(0.28, Math.min(0.98, +(WEAPONS[pw].acc * acc).toFixed(3)));
      if (rng !== 1) WEAPONS[pw].range = Math.round(WEAPONS[pw].range * rng * 10) / 10;
      u5.weapons = u5.weapons.slice();
      u5.weapons[q5] = pw;
      nDom++;
    }
  }

  /* ---- eyes to match the reach ----
     acquire() searches within the unit's OWN sight, not what its side can
     see, so a weapon that out-ranges its carrier's optics simply never fires
     at full extension. Lengthening the missiles above without this would have
     been decorative: a Kornet team would still have opened at 7.8 tiles.

     Indirect fire is deliberately left alone. A howitzer is SUPPOSED to shoot
     further than it can see - that is what a spotter is for, and the game
     already models it that way with the bombard order. Only weapons that must
     find their own target get the eyes to do it. */
  var INDIRECT_ROLE = { mlrs: 1, spg: 1, mortar: 1 };
  var nSight = 0;
  for (var uid4 in UNITS) {
    var u4 = UNITS[uid4];
    if (!u4 || !u4.weapons || INDIRECT_ROLE[u4.role]) continue;
    var reach = 0;
    for (var q4 = 0; q4 < u4.weapons.length; q4++) {
      var w4 = WEAPONS[u4.weapons[q4]];
      if (!w4 || w4.proj === "arc") continue;      /* lobbed = indirect */
      if (w4.range > reach) reach = w4.range;
    }
    if (reach > (u4.sight || 0)) { u4.sight = Math.round((reach + 0.4) * 10) / 10; nSight++; }
  }

  /* Optics last, so it is applied to the finished figure rather than being
     overwritten by it. This is the single largest real difference between
     these armies and it is almost invisible on a stat card: a T-90A whose
     commander has no thermal picks its target out later than an Abrams whose
     gunner does, and a Chonma-ho crew is looking through 1980s optics.

     Note what falls out of this on purpose: a Kornet team's missile reaches
     10.5 tiles but a Pact crew now sees about 8, so it cannot use the last
     two tiles of its own weapon without someone else spotting for it. That is
     exactly the real trade - the missile is excellent, the sight on the end
     of it is not - and it is why Russian AT works best dug in on ground it
     has already ranged rather than manoeuvring. */
  for (var uid6 in UNITS) {
    var u6 = UNITS[uid6];
    if (!u6 || !u6.sight) continue;
    var f6 = facOf(u6);
    if (!DOMAIN[f6]) continue;
    var o6 = dmul(f6, u6.from || "e20", "optics");
    if (o6 === 1) continue;
    u6.sight = Math.round(u6.sight * (0.55 + 0.45 * o6) * 10) / 10;
  }

  /* ======================================================================
     FAULT 05 - three signature aircraft missing their signature weapon
     ======================================================================
     The A-10 exists to kill armour and had no weapon that could: two JDAMs at
     2.6 tiles and a 20-damage chain gun modelled as "bullet", which against
     heavy armour does nothing. Six of them worked on ten tanks for over three
     minutes and killed one. The Bradley destroyed more Iraqi armour in 1991
     than the Abrams did, using the TOW launcher it did not have here. And an
     Apache carried a single Hellfire. */
  WEAPONS.maverick = {
    name: "AGM-65 Maverick", dmg: 260, warhead: "heat", pen: 950,
    range: R(9000), reload: 3.2, burst: 1, acc: 0.90, ammo: 1,
    proj: "missile", speed: 420, aoe: 0.8, suppress: 20,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };
  WEAPONS.kh29 = {
    name: "Kh-29 ASM", dmg: 275, warhead: "heat", pen: 900,
    range: R(7000), reload: 3.6, burst: 1, acc: 0.78, ammo: 1,
    proj: "missile", speed: 400, aoe: 0.9, suppress: 20,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };
  WEAPONS.tow_bradley = {
    name: "TOW-2 launcher", dmg: 150, warhead: "heat", pen: 850,
    range: R(3750), reload: 8.5, burst: 1, acc: 0.86, minRange: 1.5,
    proj: "missile", speed: 330, aoe: 0.6, suppress: 12,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };
  /* the GAU-8 is a 30 mm depleted-uranium autocannon, not a machine gun */
  WEAPONS.gau8 = {
    name: "GAU-8 Avenger 30mm", dmg: 46, warhead: "cannon", pen: 90,
    range: R(1200), reload: 2.2, burst: 14, burstDelay: 0.045, acc: 0.72,
    ammo: 0.12, proj: "bullet", speed: 0, suppress: 26,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };

  function giveWeapon(unitId, wid, replace) {
    var u = UNITS[unitId];
    if (!u || !WEAPONS[wid]) return;
    u.weapons = (u.weapons || []).slice();
    if (replace) {
      var at = u.weapons.indexOf(replace);
      if (at >= 0) { u.weapons[at] = wid; return; }
    }
    if (u.weapons.indexOf(wid) < 0) u.weapons.unshift(wid);
  }
  /* every CAS airframe in every era, not just the modern pair */
  for (var uidA in UNITS) {
    var uA = UNITS[uidA];
    if (!uA || uA.role !== "cas") continue;
    var west = uA.fac === "nato" || uA.fac === "roc";
    giveWeapon(uidA, west ? "maverick" : "kh29");
    giveWeapon(uidA, "gau8", "chaingun");
  }
  for (var uidB in UNITS) {
    var uB = UNITS[uidB];
    if (!uB || uB.role !== "ifv") continue;
    /* a Western IFV carries a missile; a BMP carries one too, and did first */
    giveWeapon(uidB, "tow_bradley");
  }
  /* An Apache carries sixteen Hellfires. `ammo` on a WEAPON is the cost of
     one shot drawn from the aircraft's own pool, not the size of the
     magazine - setting it to 8 against a pool of 8 gave the Apache exactly
     one missile per sortie and made it markedly worse than before. The
     magazine lives on the UNIT. */
  if (WEAPONS.hellfire) WEAPONS.hellfire.ammo = 1;

  /* ======================================================================
     FAULT 08 - two infantry weapons that made no sense
     ======================================================================
     The machine gun did LESS damage per shot than a rifle at nearly twice the
     price, so twenty rifle squads beat eight MG teams nineteen to nothing. A
     GPMG is not a better rifle, it is a suppression weapon: it fires far more
     and pins what it does not kill. The sniper was the opposite problem -
     out-ranging a rifle squad by 4.5 tiles and hitting for 8.6 times as much
     at 94% accuracy, which is a line-breaking weapon rather than a specialist. */
  setW("lmg",    { dmg: 14, burst: 14, burstDelay: 0.045, reload: 2.4,
                   suppress: 30, range: 6.2 });
  setW("sniper", { reload: 7.4, suppress: 30 });

  /* Static AA and SAM sites should reach further than a man with a tube. */
  if (typeof BUILDINGS !== "undefined") {
    for (var bid in BUILDINGS) {
      var b = BUILDINGS[bid];
      if (!b || !b.weapons) continue;
      for (var q = 0; q < b.weapons.length; q++) {
        var bw = WEAPONS[b.weapons[q]];
        if (bw && bw.warhead === "flak") bw.range = Math.max(bw.range, R(9000));
      }
    }
  }

  /* ---- every navy was firing the same Italian gun ----
     navgun_76 is the OTO Melara 76 mm Super Rapid, and it was mounted on the
     NATO corvette, the Russian one, the Chinese one, the Taiwanese one and
     the North Korean one alike. For a game that is careful enough to give the
     KPA a T-62 derivative and a MiG-21 in 2020, having Nampo-class patrol
     craft carry an OTO Melara is a jarring miss. Same for the destroyers.
     The stats stay close - these are all roughly comparable mounts - except
     the Korean one, which is a genuinely lighter weapon. */
  var NAVGUN = {
    pact: { name: "AK-176 76mm",        dmg: 50, acc: 0.80 },
    pla:  { name: "H/PJ-26 76mm",       dmg: 51, acc: 0.83 },
    kpa:  { name: "57mm twin, manual",  dmg: 34, acc: 0.62, range: 6.4 },
    roc:  { name: "OTO 76mm Super Rapid", dmg: 52, acc: 0.85 },
  };
  for (var uidN in UNITS) {
    var uN = UNITS[uidN];
    if (!uN || !uN.weapons || (uN.layer !== "sea" && uN.layer !== "sub")) continue;
    var spec = NAVGUN[facOf(uN)];
    if (!spec) continue;
    for (var qN = 0; qN < uN.weapons.length; qN++) {
      var wN = WEAPONS[uN.weapons[qN]];
      if (!wN || !/OTO 76mm/.test(wN.name || "")) continue;
      var pn = privateWeapon(uidN, uN.weapons[qN]);
      if (!pn) continue;
      for (var kN in spec) WEAPONS[pn][kN] = spec[kN];
      uN.weapons = uN.weapons.slice();
      uN.weapons[qN] = pn;
    }
  }

  /* ---- ordnance load ----
     Run last so that the per-unit clones made above are corrected as well.
     A weapon's `ammo` is what one shot costs; the aircraft's `ammo` is how
     much it carries. Both have to agree or a strike aircraft flies home
     after a single pass. */
  var SHOT_COST = { "AGM-65 Maverick": 1, "Kh-29 ASM": 1, "AGM-114 Hellfire": 1,
                    "GAU-8 Avenger 30mm": 0.12 };
  for (var wz in WEAPONS) {
    var wname = WEAPONS[wz].name;
    if (SHOT_COST[wname] !== undefined) WEAPONS[wz].ammo = SHOT_COST[wname];
  }
  /* magazines, in sorties-worth of shots */
  var POOL = { cas: 8, gunship: 10, fighter: 5, sead: 4, cfighter: 5,
               stealthfighter: 4, heavybomber: 6, stealthbomber: 5 };
  for (var uz in UNITS) {
    var uu = UNITS[uz];
    if (!uu || uu.layer !== "air") continue;
    var want = POOL[uu.role];
    if (want && (uu.ammo || 0) < want) uu.ammo = want;
  }

  /* ---- who can take fuel from a tanker, re-derived after the rosters exist -
     rules.js stamps `refuelable` on `cat === "aircraft" && jet && !tanker &&
     !hover`, and it does so at the bottom of its own file - which is BEFORE
     this one has generated a single era airframe. The result, counted: 124
     jets in the roster and 38 of them flagged. Every hand-written fighter is
     refuelable and not one generated one is, so nato_e00_fighter - which is
     what a present-day commander actually builds - was invisible to
     G.nearestTanker(), which returns null immediately on !u.def.refuelable.
     The whole aerial-refuelling mechanism was dead for the aircraft that
     actually fly: the boom, the "tank" order, and reserveFuel()'s measurement
     to the tanker instead of the airfield.

     Re-derived here rather than moved, because the same rule has to hold for
     anything a later pass adds and because rules.js's copy is still correct
     for the aircraft that exist when it runs. */
  for (var _rfg in UNITS) {
    var _ug = UNITS[_rfg];
    if (_ug.cat === "aircraft" && _ug.jet && !_ug.tanker && !_ug.hover) _ug.refuelable = true;
  }

  if (typeof console !== "undefined" && console.log)
    console.log("[generations] armour on " + nArm + " vehicles, penetration on " +
                nPen + " guns, ranges rebuilt, sight raised on " + nSight +
                ", domain scaling on " + nDom + " weapons");
})();
