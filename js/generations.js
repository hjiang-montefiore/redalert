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
    /*         1950  1960  1980  1990  2000  2020 */
    /* Britain: 20-pdr, then the L7 105 — a BRITISH gun, designed at ROF
       Nottingham after the T-54 in the Budapest embassy compound in 1956, that
       West Germany and the US both licence-built. Then the rifled L11 and L30.
       A two-piece-charge rifled gun is a step behind a smoothbore for pure
       penetration, which is why Challenger 3 is being given one. */
    gbr:  [ 190,  280,  440,  530,  660,  700 ],
    /* Germany: licence-built the British L7, then sent the Rh-120 L/44 the
       other way and it became the American M256 in 1985. From the 1990s it is
       the SAME GUN as the Abrams fires, so e90 matches nato exactly; the +10 at
       e00/e20 is the L/55 on the Leopard 2A6 in 2001. */
    deu:  [ 185,  275,  470,  570,  730,  790 ],
    /* France: the CN-105-F1 was competitive in 1966; the smoothbore CN120-26 on
       the Leclerc is good but never got a depleted-uranium round. */
    fra:  [ 180,  270,  400,  480,  620,  680 ],
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
    /* Britain built the thickest steel in the world (Centurion, then Chieftain
       at 55 t) and then invented the composite that replaced it. The 1980s jump
       is Chobham arriving on Challenger 1 in 1983, not gradual improvement. */
    gbr:  [ 165,  225,  500,  585,  675,  715 ],
    /* Germany: Leopard 1 was deliberately thin (1965, 40 t — the same bet France
       made). Leopard 2 in 1979 reverses it, and the A5 wedge in 1995 fixes the
       early turret face. */
    deu:  [ 150,  175,  475,  560,  655,  700 ],
    /* France never reversed the bet, and the 1980s column is the sharpest number
       in this whole feature: France's 1980s tank is the AMX-30B2, a 1966 design
       with a cast turret front around 80 mm and NO composite element at any
       point in its life. It skipped the first composite generation entirely and
       waited for the Leclerc in 1992. */
    fra:  [ 110,  140,  200,  430,  545,  600 ],
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
    /* Three Soviet tanks that are not their decade's standard, so their plate
       is read off this table rather than the curve. On the curve's own scale
       the T-62 sits at 174 against about 220 mm real and the M60A1 at 177
       against about 250 - a factor of about 0.75-0.8.
       T-64A, 1968: steel, glass-textolite and steel on the glacis, aluminium
       inserts in the cast turret, about 370 real - 285 here. The e60 curve
       would give it the T-62's 175.
       T-72 Ural, 1973: the T-64's glacis under a solid cast turret - 275, so
       the M60A1's 105 mm (275) just gets through it and only partly
       through the T-64A. */
    pact_e60_t64a: { front: 285, note: "T-64A: composite armour a decade early" },
    pact_e60_t72:  { front: 275 },
    /* T-72A, 1979: a 1970s array fighting in the 1980s. The e80 curve (459)
       is the reactive-armour generation's - the T-80U and T-72B; the T-72A had
       none and a filled cast turret, about 400-420 real on the
       turret and less on the hull - 330 here. Every 1980s NATO gun in the
       game (400-470) goes through it; the T-72B beside it (427) lets the
       French 400 only partly through. */
    pact_e80_t72a: { front: 330 },
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
    /* Britain genuinely bought the American weapon — this is a purchase, not an
       indigenous system, and the card should say so. */
    gbr:  JAV,
    /* MILAN was Euromissile, Aérospatiale and MBB: the one place a shared row
       between France and Germany is correct rather than lazy. */
    fra:  { name: "Akeron MP (MMP)", range: R(4000), dmg: 140, pen: 900,
            belly: true, reload: 7.0, minRange: 1.0 },
    deu:  { name: "MELLS (Spike LR2)", range: R(5500), dmg: 145, pen: 950,
            belly: true, reload: 7.2, minRange: 1.2 },
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
    gbr:  { name: "Javelin, Overwatch mount", range: R(4500), dmg: 148, pen: 900,
            belly: true, reload: 7.2 },
    fra:  { name: "HOT-3 / Akeron MP", range: R(4300), dmg: 148, pen: 900,
            belly: false, reload: 7.4 },
    deu:  { name: "PARS 3 LR (Trigat-LR)", range: R(7000), dmg: 155, pen: 950,
            belly: true, reload: 7.6 },
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
     better, and five of these armies are — the Pact and Germany in two
     domains each, Britain, France and the PLA in one apiece.

     These multipliers only bite from the 1990s onward - before that the
     Warsaw Pact really was a peer and the model should say so.            */
  var DOMAIN = {
    /*        optics  guided   a2a   airdef  arty   naval */
    nato: { optics:1.00, guided:1.00, a2a:1.00, airdef:0.88, arty:1.00, naval:1.00 },
    pact: { optics:0.72, guided:0.68, a2a:0.90, airdef:1.15, arty:1.05, naval:0.72 },
    pla:  { optics:0.92, guided:0.90, a2a:0.95, airdef:1.00, arty:1.05, naval:0.95 },
    kpa:  { optics:0.52, guided:0.46, a2a:0.50, airdef:0.66, arty:1.00, naval:0.48 },
    /* Britain: world-class ASW (Type 23 with Sonar 2087, and the Astute) and
       first-rate optics, but a small artillery park and too few escorts for two
       carriers. */
    gbr:  { optics:1.02, guided:0.98, a2a:1.00, airdef:0.85, arty:0.90, naval:1.00 },
    /* France: the missile industry is where it leads rather than merely keeps
       up — Exocet, Crotale, Aster, SCALP, MdCN. Land-based air defence likewise. */
    fra:  { optics:0.94, guided:1.06, a2a:0.96, airdef:1.00, arty:0.92, naval:0.90 },
    /* Germany: the best optics in the game, and the best gun-based air defence
       ever fielded — twin 35 mm Oerlikon KDA with SEPARATE search and tracking
       radars, engaging on the move, in service 1976. The navy is a Baltic navy:
       superb AIP submarines and mine warfare, no carrier, no cruiser, no
       long-range naval strike. */
    deu:  { optics:1.06, guided:0.96, a2a:0.94, airdef:1.05, arty:0.94, naval:0.72 },
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
     find their own target get the eyes to do it.

     ...and only a weapon its crew aims through its OWN sight. Measured on
     b62fbf6 and again on b4a9943, this loop raised 535 sights to the longest
     weapon aboard, and for 186 of them that weapon is not aimed by anybody's
     eye at all: a Pershing II saw 31.4 tiles and a HIMARS 30.4, an Ohio 22.4
     and a Virginia 19.4 from under the water, a Harpoon boat 14.4, an F-16CJ
     and a B-52H 16.4 - against 8 for an Abrams and 9.5 for a Humvee - and
     G.recomputeFog lifted the fog over every tile of it (1,045 tiles for one
     HIMARS, 164 for an Abrams). A round fired on a cue - firesOnCue() in
     rules.js - now leaves its launcher's eyes where its optics put them and
     reaches past them on what the SIDE holds instead: Unit.acqGate and
     G.sideSees. Those 186 come down - 170 to their card, the five era rows
     below among them, and 16 warships only as far as the gun or point-defence
     missile they also carry - and none goes up; the other 349, for guns and
     crew-aimed missiles, are raised exactly as before.
     A HIMARS now lifts 80 fog tiles.
     Five era launchers had the raised figure copied into their own rows in
     eras.js - Sergeant 27.4, Lance 29.0 and 22, Corporal 24.4, Hades 26 - so
     this loop could never bring them down; they carry the 5.0 every other
     launcher card in the game does. */
  var INDIRECT_ROLE = { mlrs: 1, spg: 1, mortar: 1 };
  var nSight = 0;
  for (var uid4 in UNITS) {
    var u4 = UNITS[uid4];
    if (!u4 || !u4.weapons || INDIRECT_ROLE[u4.role]) continue;
    var reach = 0;
    for (var q4 = 0; q4 < u4.weapons.length; q4++) {
      var w4 = WEAPONS[u4.weapons[q4]];
      if (!w4 || w4.proj === "arc") continue;      /* lobbed = indirect */
      if (typeof firesOnCue === "function" && firesOnCue(u4, w4)) continue;   /* the side aims it */
      if (w4.range > reach) reach = w4.range;
    }
    if (reach > (u4.sight || 0)) { u4.sight = Math.round((reach + 0.4) * 10) / 10; nSight++; }
  }

  /* ---- low observability, read off the signature ----
     Here rather than in rules.js because eras.js and heavyair.js have to have
     built their airframes first. rules.js (stealthFromRcs) says why and how
     much: an airframe that states its own figure keeps it; one with the very
     signature of such an airframe takes that figure, so the same signature
     earns the same stealth in every era; anything else is on the curve.
     Measured: the F-117A (e80, e90) and the e00 F-22A 0.65, the e90 B-2A 0.75,
     the e00 F-35A 0.62 (the F-35C's 0.009), the e00 J-20 0.58 - all 0 before. */
  var HAND_LO = {};
  for (var uidH in UNITS) {
    var uH = UNITS[uidH];
    if (!uH || uH.layer !== "air" || uH.stealth === undefined || uH.rcs === undefined) continue;
    var hH = HAND_LO[uH.rcs] || (HAND_LO[uH.rcs] = { sum: 0, n: 0 });
    hH.sum += uH.stealth; hH.n++;
  }
  for (var uidL in UNITS) {
    var uL = UNITS[uidL];
    if (!uL || uL.layer !== "air" || uL.stealth !== undefined) continue;
    if (typeof stealthFromRcs !== "function" || !(stealthFromRcs(uL.rcs) > 0)) continue;
    var hL = HAND_LO[uL.rcs];
    uL.stealth = hL ? Math.round(hL.sum / hL.n * 100) / 100 : stealthFromRcs(uL.rcs);
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
  var WEST_CAS = { nato:1, roc:1, gbr:1, fra:1, deu:1 };
  /* ---- the guided missile each CAS airframe REALLY carried ----
     (owner) "It is fine that some countries does not have them at all or
     highly being behind." This loop used to hand EVERY cas airframe in every
     decade a Maverick (West) or a Kh-29 (East). MEASURED at b62fbf6: all 47
     got one, and 29 of them never carried any guided air-to-surface missile
     in the decade they serve - an A-1 Skyraider, an Il-10, a Venom and an
     Ouragan firing 1970s TV-guided rounds, a Q-5 whose own description says
     "no guided weapons", the KPA's Su-25Ks although their description says
     unguided ordnance only, and Luftwaffe and French jets carrying an
     American missile they never hung on those airframes. Seven more had the
     right idea under the wrong name. The Maverick entered service in 1972
     and the Kh-29 in 1980.

     Keyed by airframe. null = no guided air-to-surface missile on that
     aircraft in that decade: it keeps the bombs, rockets and gun it went to
     war with. [template, name] gives the missile, renamed on that airframe
     alone when the shared template's name is not what it carried. A cas
     airframe added later and not listed falls back to the old rule from the
     1980s on, and gets nothing before - an invention is worse than a gap.
     These templates are handed out after DOMAIN, unscaled, exactly as the
     Maverick and the Kh-29 always were. */
  WEAPONS.kh23 = {
    /* Kh-23 Grom (AS-7 Kerry), 1973: radio command - the pilot flew it onto
       the target with a thumb controller, watching a flare in its tail -
       with a 111 kg warhead and about 10 km. A generation before the Kh-29
       and it shows: shorter, smaller and a round the pilot usually missed
       with, so the figures are its own rather than the Kh-29's. */
    name: "Kh-23 Grom (AS-7 Kerry)", dmg: 200, warhead: "heat", pen: 450,
    range: R(5000), reload: 4.0, burst: 1, acc: 0.55, ammo: 1,
    proj: "missile", speed: 380, aoe: 0.9, suppress: 20,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };
  WEAPONS.yj8k = {
    /* YJ-8K / C-801K, the JH-7's reason to exist: the PLA Navy's air arm took
       the Flying Leopard from about 1994 to hit ships, and this was the round
       - a French-pattern sea-skimmer of about 50 km, Mach 0.9, a 165 kg
       warhead, two or four under the wings. It had been generated as a BOMB
       named "YJ-8K anti-ship missiles" (range 2.5, so the aircraft overflew
       the ship it was sent at), beside a Soviet Kh-29 the JH-7 never carried.
       The damage is the Houjian's own YJ-8 row (pla_e90_missileboat, 228);
       the speed, profile and intercept are the Exocet's, the missile it was
       modelled on; the reach is the air-to-surface band (Kh-29 11.7,
       Maverick 13.1). Two pool points a round, so a full load is the four it
       could carry. Ships only: it has no land-attack mode. */
    name: "YJ-8K (C-801K) anti-ship missile", dmg: 230, warhead: "he",
    range: 11.5, minRange: 1.5, reload: 4.0, burst: 1, acc: 0.78, ammo: 2,
    proj: "missile", speed: 122, aoe: 1.4, suppress: 20,
    profile: "skim", intercept: 1.0, sfx: "missile",
    tgt: { ground: 0, air: 0, sea: 1, sub: 0 },
  };
  var CAS_ASM = {
    nato_e50_cas: null,                                   /* A-1 Skyraider */
    nato_e60_cas: ["maverick", "AGM-65A Maverick"],       /* A-7D, cleared for it from 1972 */
    pact_e50_cas: null,                                   /* Il-10M */
    pact_e60_cas: ["kh23", null],                         /* Su-17M */
    pla_e50_cas: null, pla_e60_cas: null, pla_e80_cas: null,   /* Il-10, Q-5, Q-5C */
    /* JH-7: the YJ-8K above. Its generated bomb row, which carried the
       missile's name, is renamed for the bombs it really was (REAL_FIT). */
    pla_e90_cas: ["yj8k", null],
    pla_e00_cas: ["kh29", "KD-88 air-to-surface missile"],  /* JH-7A */
    bomber_c:    ["kh29", "KD-88 air-to-surface missile"],
    kpa_e50_cas: null, kpa_e60_cas: null, kpa_e80_cas: null,
    kpa_e90_cas: null, kpa_e00_cas: null, bomber_k: null,
    roc_e50_cas: null, roc_e60_cas: null, roc_e80_cas: null,   /* F-84G, F-100A, AT-3 */
    gbr_e50_cas: null, gbr_e60_cas: null,                 /* Venom, Harrier GR.1 */
    gbr_e80_cas: null, gbr_e90_cas: null,                 /* GR.5, GR7: Maverick came with the GR7 in 2001 */
    gbr_e00_cas: ["maverick", "Brimstone"],               /* Tornado GR4, 2005 */
    bomber_b:    ["maverick", "Brimstone"],               /* Typhoon FGR4 */
    fra_e50_cas: null, fra_e60_cas: null,                 /* Ouragan, Jaguar A */
    fra_e80_cas: null,                                    /* its own AS.30L mount is the missile */
    /* Mirage 2000D. The Jaguar's AS.30L row beside it reads 168 / 7.6: that
       is the generator's own 1980s figure, where this is the present-day
       template every CAS missile here is handed unscaled (the A-7D's 1972
       Maverick too). By R() the AS.30L's 10 km is no shorter than the 9 km
       the Maverick template is built on, so the figures stay. */
    fra_e90_cas: ["maverick", "AS.30L laser-guided missile"],
    fra_e00_cas: null, bomber_f: null,                    /* Rafale and 2000D RMV: AASM and GBU-12 */
    /* Alpha Jet and G.91: BL755, rockets and guns; Tornado IDS: MW-1,
       Kormoran at sea and, from 2005, Taurus. Whatever Mavericks the
       Luftwaffe had went on its F-4F Phantoms (filed here as fighters,
       deu_e80_fighter), not on these. */
    deu_e50_cas: null, deu_e60_cas: null, deu_e80_cas: null,
    deu_e90_cas: null, bomber_g: null,
  };
  for (var uidA in UNITS) {
    var uA = UNITS[uidA];
    if (!uA || uA.role !== "cas") continue;
    /* Set membership, not a literal pair — a British, French or German Tornado
       or Rafale was being handed a Soviet Kh-29 by falling off the end of this
       test. Add any new Western army here. */
    var west = !!WEST_CAS[uA.fac];
    var fitA = CAS_ASM.hasOwnProperty(uidA) ? CAS_ASM[uidA]
             : (ERAS.indexOf(uA.from || "e20") >= 2 ? [west ? "maverick" : "kh29", null] : null);
    if (fitA) {
      giveWeapon(uidA, fitA[0]);
      if (fitA[1]) relabel(uidA, UNITS[uidA].weapons.indexOf(fitA[0]), fitA[1]);
    }
    giveWeapon(uidA, "gau8", "chaingun");
  }
  /* ======================================================================
     FAULT 05b - one missile, every IFV, every army, every decade
     ======================================================================
     The loop that used to stand here read `if (role === "ifv")` and handed
     out a TOW-2. There is no era test and no national test in that line, so
     all 47 IFVs in the game carried the same 1983 American launcher: an M3
     Half-track and a BTR-152 rolled onto a 1950s map with a weapon at 850 mm
     of penetration and 8.8 tiles of reach, against a T-34/85 whose gun
     derives 248 mm at 6.1. The battle taxi out-ranged the tank by two and a
     half tiles and hit it three times as hard, which is why armour felt
     pointless in the early eras.

     It was also invisible to the quality pass. The DOMAIN loop above runs
     around line 431 and this assignment ran at 570, so every weapon handed
     out down here skipped faction scaling entirely - a North Korean VTT-323
     fired its TOW at the same 0.86 as an American Bradley, despite
     kpa.guided being 0.46. The assignment below applies that multiplier
     itself rather than relying on a pass that has already gone by.

     The table is deliberately full of holes. A Warrior carried a 30 mm
     RARDEN and no anti-tank missile for its entire service life, the WCSP
     upgrade that would have changed it was cancelled in 2021, and a VBCI
     carries a 25 mm and nothing else. Those armies do not get a missile
     here, because they did not have one. */
  WEAPONS.atgm_sagger = {
    /* 9M14 Malyutka / AT-3. MCLOS: the operator flies the missile down a
       wire on a thumbstick for the whole 26-second flight, while being shot
       at. That is the weapon - a big warhead the crew usually misses with,
       and useless inside the 500 m it takes to gather the round. */
    name: "9M14 Malyutka (AT-3)", dmg: 120, warhead: "heat", pen: 400,
    range: R(3000), reload: 16.0, burst: 1, acc: 0.40, minRange: 2.0,
    proj: "missile", speed: 115, aoe: 0.5, suppress: 10,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };
  WEAPONS.atgm_konkurs = {
    /* 9M113 Konkurs / AT-5, 1974. SACLOS - the gunner holds the crosshair
       and the launcher flies it. The generational jump is accuracy, not
       warhead. */
    name: "9M113 Konkurs (AT-5)", dmg: 145, warhead: "heat", pen: 600,
    range: R(4000), reload: 9.5, burst: 1, acc: 0.78, minRange: 1.6,
    proj: "missile", speed: 200, aoe: 0.55, suppress: 12,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };
  WEAPONS.atgm_milan = {
    /* MILAN 2, 1984. An excellent warhead on a short wire: 2000 m, half a
       TOW's reach. German and French AT is potent but has to come close. */
    name: "MILAN 2", dmg: 140, warhead: "heat", pen: 800,
    range: R(2000), reload: 8.0, burst: 1, acc: 0.84, minRange: 0.9,
    proj: "missile", speed: 200, aoe: 0.5, suppress: 11,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };
  WEAPONS.atgm_bastion = {
    /* 9M117 Bastion, fired through the BMP-3's own 100 mm tube and guided by
       riding a laser beam rather than trailing a wire - no wire to break and
       no reel to limit it, but the launcher must keep the beam on target. */
    name: "9M117 Bastion (gun-launched)", dmg: 150, warhead: "heat", pen: 600,
    range: R(4000), reload: 11.0, burst: 1, acc: 0.80, minRange: 1.2,
    proj: "missile", speed: 300, aoe: 0.55, suppress: 12,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };
  WEAPONS.atgm_hj73 = {
    /* HJ-73 is a reverse-engineered Sagger and inherits its vice. */
    name: "HJ-73 (Red Arrow 73)", dmg: 118, warhead: "heat", pen: 420,
    range: R(3000), reload: 16.0, burst: 1, acc: 0.42, minRange: 2.0,
    proj: "missile", speed: 120, aoe: 0.5, suppress: 10,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };
  WEAPONS.atgm_hj8 = {
    /* HJ-8, 1984 - the first Chinese ATGM in the TOW class rather than a
       copy of something older. */
    name: "HJ-8 (Red Arrow 8)", dmg: 150, warhead: "heat", pen: 800,
    range: R(4000), reload: 9.0, burst: 1, acc: 0.80, minRange: 1.2,
    proj: "missile", speed: 220, aoe: 0.55, suppress: 12,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };
  WEAPONS.atgm_spike = {
    /* Spike LR, fielded on the Puma as MELLS from 2019. Imaging infrared and
       fire-and-forget: the gunner does not have to sit still watching the
       missile fly, which is the real change and the reason it reloads fast
       here rather than the warhead being much better. */
    name: "Spike LR (MELLS)", dmg: 160, warhead: "heat", pen: 900,
    range: R(4000), reload: 7.5, burst: 1, acc: 0.90, minRange: 0.9,
    proj: "missile", speed: 180, aoe: 0.6, suppress: 13,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };
  WEAPONS.atgm_bulsae3 = {
    /* Bulsae-3 is a Kornet worked out from the outside. The launcher is
       credible; kpa.guided at 0.46 is what decides whether it hits. */
    name: "Bulsae-3", dmg: 150, warhead: "heat", pen: 850,
    range: R(4500), reload: 10.0, burst: 1, acc: 0.72, minRange: 1.2,
    proj: "missile", speed: 250, aoe: 0.55, suppress: 12,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };
  WEAPONS.tow2b = {
    /* TOW-2B Aero, 1992. Flies over the target and fires down through the
       roof. The engine has no top-attack aspect for a direct-fire weapon, so
       that shows up here as penetration rather than as an aspect pick. */
    name: "TOW-2B Aero", dmg: 165, warhead: "heat", pen: 900,
    range: R(4500), reload: 8.0, burst: 1, acc: 0.88, minRange: 1.6,
    proj: "missile", speed: 330, aoe: 0.6, suppress: 13,
    tgt: { ground: 1, air: 0, sea: 1, sub: 0 },
  };

  var IFV_ATGM = {
    /* e50 - nobody at all. The missile-armed IFV had not been invented; a
       Saracen, an M59 and a BTR-152 are boxes with a machine gun. */

    /* e60 - the Soviets, alone. This is the entire point of the BMP-1 and
       the reason it frightened NATO in 1973: nobody else had one. */
    pact_e60_ifv: "atgm_sagger",

    /* e80 - the West catches up, unevenly. */
    nato_e80_ifv: "tow_bradley",     /* M2 Bradley, TOW-2, 1983 */
    pact_e80_ifv: "atgm_konkurs",    /* BMP-2 */
    deu_e80_ifv:  "atgm_milan",      /* Marder 1A2, MILAN on the roof */
    pla_e80_ifv:  "atgm_hj73",       /* Type 86 is a BMP-1 */
    kpa_e80_ifv:  "atgm_sagger",     /* VTT-323, a generation behind */
    /* gbr Warrior, fra AMX-10P and roc CM-21 carry no missile. */

    /* e90 */
    nato_e90_ifv: "tow_bradley",
    pact_e90_ifv: "atgm_bastion",    /* BMP-3 fires it through the 100mm */
    deu_e90_ifv:  "atgm_milan",
    pla_e90_ifv:  "atgm_hj8",        /* WZ-551 - the real jump */
    kpa_e90_ifv:  "atgm_sagger",
    roc_e90_ifv:  "tow_bradley",     /* American supply */

    /* e00 */
    nato_e00_ifv: "tow2b",
    pact_e00_ifv: "atgm_bastion",
    pla_e00_ifv:  "atgm_hj8",
    kpa_e00_ifv:  "atgm_konkurs",
    roc_e00_ifv:  "tow_bradley",
    /* deu Puma is built for MELLS but did not carry it until 2019, and the
       VBCI and Warrior have nothing to give. */

    /* e20 */
    ifv_n: "tow2b",
    ifv_p: "atgm_bastion",
    ifv_g: "atgm_spike",             /* Puma, MELLS at last */
    ifv_c: "atgm_hj8",
    ifv_k: "atgm_bulsae3",
    ifv_r: "tow2b",
    /* ifv_b Warrior and ifv_f VBCI still carry no anti-tank missile. */
  };

  var nATGM = 0;
  for (var uidB in UNITS) {
    var uB = UNITS[uidB];
    if (!uB || uB.role !== "ifv") continue;
    var wantB = IFV_ATGM[uidB];
    if (!wantB || !WEAPONS[wantB]) continue;
    /* Scale it here. The DOMAIN pass has already run, so a weapon attached
       at this point would otherwise never see its army's guided multiplier. */
    var facB = facOf(uB), eraB = uB.from || "e20";
    var gB = dmul(facB, eraB, "guided");
    var widB = wantB;
    if (gB !== 1) {
      var pwB = privateWeapon(uidB, wantB);
      if (pwB) {
        widB = pwB;
        WEAPONS[pwB].acc = Math.max(0.20, Math.min(0.98,
          +(WEAPONS[wantB].acc * gB).toFixed(3)));
      }
    }
    giveWeapon(uidB, widB);
    nATGM++;
  }
  /* An Apache carries sixteen Hellfires. `ammo` on a WEAPON is the cost of
     one shot drawn from the aircraft's own pool, not the size of the
     magazine - setting it to 8 against a pool of 8 gave the Apache exactly
     one missile per sortie and made it markedly worse than before. The
     magazine lives on the UNIT. */
  if (WEAPONS.hellfire) WEAPONS.hellfire.ammo = 1;

  /* ======================================================================
     FAULT 05c - the gun the real machine carried, and the one it did not
     ======================================================================
     (owner) "navy, helicopter, tank, a10 should have gun shot if the enemy is
     infantry only." entities.js gunFirst() now keeps missiles and bombs off
     men in the open whenever a gun can do the job - which only helps a hull
     that HAS a gun. Audited over every attack helicopter, CAS airframe,
     tank and surface ship in every era (the table is in the change notes):
       - 16 era attack helicopters were one mount, a missile, although the
         machine had a chin or nose gun - and 15 of those missiles carried
         the GUN'S name ("30mm M230" on the AH-64A's only mount,
         proj:"missile"). Each gets its real gun, and its missile its real
         name. Gazelle HOT, PAH-1, Lynx TOW, 500MD TOW, Scout, Alouette,
         Z-9W and the Tiger UHT had no fixed gun and get none. The AH-1G's
         mount was a guided anti-tank round named after its minigun turret;
         an AH-1G carried no guided missile (TOW came with the AH-1Q in
         1973), so it becomes the 2.75 in rocket pods it did carry.
       - 21 missile boats, two Soviet aviation cruisers and four early fleet
         carriers carried a deck gun the roster left off. A missile boat whose
         tubes are empty (fixed magazines, entities.js reloadAtYard) is then
         what it really was: a gun boat. The generic "Harpoon Missile Boat",
         the HF-III craft and the Nongo, whose gun fit is not published, are
         left as they were.
       - every tank, heavy tank and light tank carried a coaxial machine gun
         and not one had it. Appended, so weapons[0] - the mount every pass
         in this file rewrites - is still the main gun. It is marked
         softOnly and entities.js pickWeapon() never offers it against
         anything but men in the open: scored like any mount, the in-reach
         coax beat an out-of-reach main gun, and (review) fourteen early
         light tanks stopped at the coax's reach and machine-gunned armour
         for no damage at all.
       - CAS: FAULT 05 above gave every CAS airframe in every era the A-10's
         GAU-8 - its name AND its 30 mm depleted-uranium figures, so an
         F-84F's six .50s hit like an Avenger. The GAU-8 stays on the A-10.
         Everyone else gets the gun it had, by name and by weight (CAS_CAL
         below), and a Harrier GR5/GR7 and a Mirage 2000D, which had no
         internal gun at all (the ADEN 25 never entered RAF service; the
         2000D/N were built without the DEFA pair), lose it. The 30 mm
         helicopter chain gun on six jets, which FAULT 05 meant to REPLACE and
         could not find under its private name, is removed.
     New figures are templated on the roster's own present-day mounts, then
     scaled by the period factor the generator used for that very hull (its
     own main mount against the same army's e20 mount), by the era's reach
     (REACH below) and by the army's optics and naval terms from DOMAIN - the
     pass above ran before these mounts existed, so it is applied here, the
     way FAULT 05b does. */
  function gunT(fields) {
    var w = { warhead: "bullet", proj: "shell", speed: 640, suppress: 14,
              tgt: { ground: 1, air: 0, sea: 1, sub: 0 } };
    for (var k in fields) w[k] = fields[k];
    return w;
  }
  /* helicopter guns: the present-day chain gun (20 x 6, 4.6 tiles, 0.34 of
     the magazine a burst) and its lighter cousins, near-equal a second */
  WEAPONS.gun_h30  = gunT({ name: "30mm chin gun", dmg: 20, range: 4.6, reload: 1.4, burst: 6,
                            burstDelay: 0.06, acc: 0.68, suppress: 16, ammo: 0.34 });
  WEAPONS.gun_h23  = gunT({ name: "23mm chin gun", dmg: 16, range: 4.6, reload: 1.4, burst: 7,
                            burstDelay: 0.055, acc: 0.68, suppress: 15, ammo: 0.34 });
  WEAPONS.gun_h20  = gunT({ name: "20mm turret gun", dmg: 14, range: 4.6, reload: 1.4, burst: 8,
                            burstDelay: 0.05, acc: 0.68, suppress: 15, ammo: 0.34 });
  WEAPONS.gun_h127 = gunT({ name: "12.7mm nose gun", dmg: 10, range: 4.4, reload: 1.4, burst: 12,
                            burstDelay: 0.04, acc: 0.66, proj: "bullet", speed: 0, suppress: 14, ammo: 0.34 });
  WEAPONS.gun_h762 = gunT({ name: "7.62mm minigun", dmg: 8, range: 4.4, reload: 1.4, burst: 16,
                            burstDelay: 0.03, acc: 0.66, proj: "bullet", speed: 0, suppress: 16, ammo: 0.34 });
  /* deck guns, templated on navgun_127 / navgun_76 / navgun_57 */
  WEAPONS.gun_n127 = gunT({ name: "127mm deck gun", dmg: 120, warhead: "he", range: 11.0, reload: 4.2,
                            burst: 2, burstDelay: 0.5, acc: 0.66, speed: 720, aoe: 1.5, suppress: 30, sfx: "cannon" });
  WEAPONS.gun_n100 = gunT({ name: "100mm deck gun", dmg: 70, warhead: "he", range: 9.0, reload: 2.0,
                            burst: 3, burstDelay: 0.3, acc: 0.76, speed: 700, aoe: 0.7, suppress: 22, sfx: "cannon" });
  WEAPONS.gun_n76  = gunT({ name: "76mm deck gun", dmg: 50, warhead: "he", range: 7.8, reload: 1.3,
                            burst: 4, burstDelay: 0.16, acc: 0.76, speed: 700, aoe: 0.5, suppress: 18, sfx: "shot" });
  WEAPONS.gun_n76t = gunT({ name: "twin 76mm deck gun", dmg: 48, warhead: "he", range: 7.6, reload: 1.6,
                            burst: 4, burstDelay: 0.2, acc: 0.66, speed: 700, aoe: 0.5, suppress: 18, sfx: "shot" });
  WEAPONS.gun_n57t = gunT({ name: "twin 57mm deck gun", dmg: 38, warhead: "he", range: 7.0, reload: 1.6,
                            burst: 4, burstDelay: 0.2, acc: 0.70, speed: 700, aoe: 0.4, suppress: 16, sfx: "shot" });
  WEAPONS.gun_n37  = gunT({ name: "twin 37mm", dmg: 24, warhead: "he", range: 6.2, reload: 1.6,
                            burst: 6, burstDelay: 0.1, acc: 0.66, aoe: 0.3, suppress: 14 });
  WEAPONS.gun_n30  = gunT({ name: "twin 30mm", dmg: 18, warhead: "he", range: 5.8, reload: 1.6,
                            burst: 8, burstDelay: 0.07, acc: 0.64, aoe: 0.2, suppress: 14 });
  WEAPONS.gun_n30g = gunT({ name: "30mm six-barrel", dmg: 16, warhead: "he", range: 5.4, reload: 1.8,
                            burst: 12, burstDelay: 0.04, acc: 0.62, aoe: 0.2, suppress: 14 });
  WEAPONS.gun_n20  = gunT({ name: "20mm cannon", dmg: 14, range: 5.0, reload: 1.5,
                            burst: 6, burstDelay: 0.08, acc: 0.64, suppress: 12 });
  /* the coaxial machine gun: rules.js's own GPMG as it stood before FAULT 08
     turned the infantry team's into a suppression weapon. softOnly: see
     entities.js pickWeapon() - it is never offered against armour, a ship
     or a structure, which is how a crew uses it. */
  WEAPONS.gun_coax = gunT({ name: "coaxial machine gun", dmg: 9, range: 5.6, reload: 1.9, burst: 8,
                            burstDelay: 0.055, acc: 0.60, proj: "bullet", speed: 0, suppress: 11,
                            softOnly: true });
  WEAPONS.gun_coax_hv = gunT({ name: "heavy coaxial gun", dmg: 14, range: 6.0, reload: 1.7, burst: 5,
                            burstDelay: 0.08, acc: 0.62, proj: "bullet", speed: 0, suppress: 12,
                            softOnly: true });

  /* what the generator scaled THIS hull by: its own main mount against the
     same army's present-day mount for the same role. Where the two are not
     the same kind of round - a 1960s carrier's gun block against a modern
     carrier's Aster launcher - the ratio means nothing, and the generator's
     own period ladder is used instead: read off the rosters above, the
     tank guns, gunship missiles and missile-boat rounds of every army step
     0.42 / 0.56 / 0.74 / 0.86 / 0.95 / 1 from e50 to e20. */
  var PERIOD = { e50: 0.42, e60: 0.56, e80: 0.74, e90: 0.86, e00: 0.95, e20: 1 };
  /* ...and the era's REACH, which the first version of this pass left out:
     every new mount had its present-day range in every decade, so (review) a
     1955 Forrestal's 5-inch reached 11.0 tiles where the same 127 mm Mk 42
     on every e50 destroyer reaches 8.5, and a 1950s coax reached 5.6 tiles
     past a light tank's own 4.9 tile gun. Read off the same rosters: the
     rifle squads (3.7 / 4.1 / 4.6 / 4.8 / 5.0 / 5.0 tiles), the 127 mm
     destroyer guns (8.5 / 9.4 / 10.5 / 11.0-11.5 / 11.4 / 11.5) and the
     76 mm corvette guns (5.9 / 6.6 / 7.3 / 7.6 / 7.8 / 7.9) all step the
     same way. */
  var REACH = { e50: 0.74, e60: 0.82, e80: 0.92, e90: 0.96, e00: 0.99, e20: 1 };
  function periodOf(uid) {
    var u = UNITS[uid];
    if (!u) return 1;
    var flat = PERIOD[u.from || "e20"] || 1;
    var twin = typeof unitFor === "function" ? unitFor(u.fac, u.role, "e20") : null;
    if (!twin || twin === uid || !UNITS[twin]) return flat;
    var a = WEAPONS[(u.weapons || [])[0]], b = WEAPONS[(UNITS[twin].weapons || [])[0]];
    if (!a || !b || !(a.dmg > 0) || !(b.dmg > 0) || a.proj !== b.proj || a.warhead !== b.warhead) return flat;
    return Math.max(0.35, Math.min(1, a.dmg / b.dmg));
  }
  var nGun = 0;
  function mountGun(uid, tpl, name) {
    var u = UNITS[uid];
    if (!u || !u.weapons || !WEAPONS[tpl]) return null;
    var k = periodOf(uid);
    var key = privateWeapon(uid, tpl);
    if (!key) return null;
    var w = WEAPONS[key], f = facOf(u), e = u.from || "e20";
    w.name = name;
    w.dmg = Math.round(w.dmg * k * 10) / 10;
    var acc = 0.6 + 0.4 * dmul(f, e, "optics"), rng = REACH[e] || 1;
    if (u.layer === "sea") {
      var nv = dmul(f, e, "naval");
      acc *= 0.7 + 0.3 * nv; rng *= 0.85 + 0.15 * nv;
    }
    w.acc = Math.max(0.28, Math.min(0.98, +(w.acc * acc).toFixed(3)));
    if (rng !== 1) w.range = Math.round(w.range * rng * 10) / 10;
    u.weapons = u.weapons.concat([key]);      // APPENDED: weapons[0] stays the main mount
    nGun++;
    return key;
  }
  /* rename a mount on ONE hull; a shared entry is cloned first */
  function relabel(uid, idx, name) {
    var u = UNITS[uid];
    if (!u || !u.weapons || !WEAPONS[u.weapons[idx]]) return null;
    var wid = u.weapons[idx];
    if (wid.indexOf("__" + uid) < 0) {
      var pw = privateWeapon(uid, wid);
      if (!pw) return null;
      u.weapons = u.weapons.slice(); u.weapons[idx] = pw; wid = pw;
    }
    WEAPONS[wid].name = name;
    return WEAPONS[wid];
  }
  function mountIndex(uid, re) {
    var ws = (UNITS[uid] && UNITS[uid].weapons) || [];
    for (var i = 0; i < ws.length; i++) if (re.test(ws[i])) return i;
    return -1;
  }

  /* ---- attack helicopters: [gun template, gun, what the missile really is] */
  var HELO_GUN = {
    nato_e60_gunship: ["gun_h762", "M28 turret: 7.62mm M134 minigun", "2.75in FFAR rocket pods (M158/M200)"],
    nato_e80_gunship: ["gun_h30",  "30mm M230 chain gun", "AGM-114A Hellfire"],
    nato_e90_gunship: ["gun_h30",  "30mm M230 chain gun", "AGM-114L Longbow Hellfire"],
    nato_e00_gunship: ["gun_h30",  "30mm M230 chain gun", "AGM-114 Hellfire II"],
    roc_e00_gunship:  ["gun_h30",  "30mm M230 chain gun", "AGM-114 Hellfire II"],
    gbr_e00_gunship:  ["gun_h30",  "30mm M230 chain gun", "AGM-114 Hellfire II"],
    roc_e90_gunship:  ["gun_h20",  "20mm M197 three-barrel cannon", "BGM-71 TOW and AGM-114 Hellfire"],
    fra_e00_gunship:  ["gun_h30",  "30mm GIAT 30M781 chin gun", null],
    pla_e00_gunship:  ["gun_h23",  "23mm chin cannon", "AKD-10 anti-tank missile"],
    pact_e60_gunship: ["gun_h127", "12.7mm YakB-12.7 gatling", "9M17 Falanga (AT-2 Swatter)"],
    pact_e80_gunship: ["gun_h127", "12.7mm YakB-12.7 gatling", "9M114 Shturm (AT-6 Spiral)"],
    pact_e90_gunship: ["gun_h30",  "30mm 2A42 cannon", "9K121 Vikhr (AT-16)"],
    pact_e00_gunship: ["gun_h30",  "30mm 2A42 cannon (NPPU-28)", "9M120 Ataka (AT-9)"],
    kpa_e80_gunship:  ["gun_h127", "12.7mm YakB-12.7 gatling", "9M17 Falanga (AT-2 Swatter)"],
    kpa_e90_gunship:  ["gun_h127", "12.7mm YakB-12.7 gatling", "9M17 Falanga (AT-2 Swatter)"],
    kpa_e00_gunship:  ["gun_h127", "12.7mm YakB-12.7 gatling", "9M17 Falanga (AT-2 Swatter)"],
  };
  for (var hg in HELO_GUN) {
    var hs = HELO_GUN[hg];
    if (!UNITS[hg] || !UNITS[hg].weapons || UNITS[hg].weapons.length !== 1) continue;
    if (hs[2]) relabel(hg, 0, hs[2]);
    mountGun(hg, hs[0], hs[1]);
  }
  /* The AH-1G's pods are unguided rockets, and a rocket that is renamed but
     still flies like an 81-point shaped-charge missile to 9.9 tiles at 0.72
     is the same invention under a truer label. It takes the figures the
     roster already gives the same period's 68 mm pods (the Jaguar A's SNEB:
     2 x 76 HE, 5.4 tiles, 0.62) - an area weapon against men and soft
     vehicles, not a tank killer, which is what the Cobra was until TOW. */
  (function () {
    var i = mountIndex("nato_e60_gunship", /^w_e60_nato_gunship__/);
    if (i < 0) return;
    var w = WEAPONS[UNITS.nato_e60_gunship.weapons[i]];
    w.warhead = "he"; w.dmg = 76; w.burst = 2; w.burstDelay = 0.28; w.range = 5.4;
    w.acc = 0.62; w.aoe = 1.6; w.suppress = 32; delete w.pen;
  })();
  /* the present-day ones already carry a gun: give it, and the missile beside
     it, the real names. A Mi-28 does not fire Hellfires. */
  var HELO_NAME = {
    helo_n: ["30mm M230 chain gun", null],
    helo_r: ["30mm M230 chain gun", null],
    helo_b: ["30mm M230 chain gun", null],
    helo_f: ["30mm GIAT 30M781 chin gun", "AGM-114 Hellfire II"],
    helo_p: ["30mm 2A42 cannon (NPPU-28)", "9M120 Ataka (AT-9)"],
    helo_c: ["23mm chin cannon", "AKD-10 anti-tank missile"],
    helo_k: ["12.7mm YakB-12.7 gatling", "9M17 Falanga (AT-2 Swatter)"],
  };
  for (var hn in HELO_NAME) {
    var gi = mountIndex(hn, /^chaingun/), mi = mountIndex(hn, /^hellfire/);
    if (gi >= 0) relabel(hn, gi, HELO_NAME[hn][0]);
    if (mi >= 0 && HELO_NAME[hn][1]) relabel(hn, mi, HELO_NAME[hn][1]);
  }
  /* the Mi-24's gun is a 12.7 mm gatling, not a 30 mm chain gun */
  (function () {
    var i = mountIndex("helo_k", /^chaingun/);
    if (i < 0) return;
    var w = WEAPONS[UNITS.helo_k.weapons[i]], t = WEAPONS.gun_h127;
    w.dmg = t.dmg; w.burst = t.burst; w.burstDelay = t.burstDelay; w.range = t.range;
    w.proj = t.proj; w.speed = t.speed;
  })();

  /* ---- deck guns ---- */
  var DECK_GUN = {
    missileboat_p:        ["gun_n76",  "AK-176 76mm"],
    missileboat_k:        ["gun_n30",  "2 x twin 30mm AK-230"],
    missileboat_c:        ["gun_n30g", "30mm H/PJ-13 six-barrel"],
    pact_e60_missileboat: ["gun_n30",  "2 x twin 30mm AK-230"],
    pact_e80_missileboat: ["gun_n76",  "AK-176 76mm"],
    pact_e00_missileboat: ["gun_n100", "A-190 100mm"],
    kpa_e60_missileboat:  ["gun_n30",  "2 x twin 30mm AK-230"],
    kpa_e80_missileboat:  ["gun_n30",  "2 x twin 30mm AK-230"],
    kpa_e90_missileboat:  ["gun_n30",  "2 x twin 30mm AK-230"],
    pla_e60_missileboat:  ["gun_n30",  "2 x twin 30mm Type 69"],
    pla_e90_missileboat:  ["gun_n37",  "twin 37mm Type 76A and twin 30mm"],
    pla_e00_missileboat:  ["gun_n30g", "30mm H/PJ-13 six-barrel"],
    deu_e60_missileboat:  ["gun_n76",  "76mm OTO Melara Compact"],
    deu_e80_missileboat:  ["gun_n76",  "2 x 76mm OTO Melara Compact"],
    deu_e90_missileboat:  ["gun_n76",  "76mm OTO Melara Compact"],
    deu_e00_missileboat:  ["gun_n76",  "76mm OTO Melara Compact"],
    nato_e80_missileboat: ["gun_n76",  "Mk 75 76mm"],
    roc_e60_missileboat:  ["gun_n20",  "20mm Oerlikon"],
    roc_e80_missileboat:  ["gun_n20",  "20mm Oerlikon"],
    roc_e90_missileboat:  ["gun_n20",  "20mm Oerlikon"],
    roc_e00_missileboat:  ["gun_n20",  "20mm T75 cannon"],
    pact_e60_carrier:     ["gun_n57t", "2 x twin 57mm AK-725"],
    pact_e80_carrier:     ["gun_n76t", "2 x twin 76mm AK-726"],
    /* The gun that had been hiding inside the "missile". Until the nine
       anti-ship rows in eras.js became missiles they were proj "shell", so
       hasGun above counted each as its own deck gun and none of these hulls
       was ever given one: a Sovremenny had no AK-130 and a Kynda no 76 mm. */
    pact_e60_cruiser:     ["gun_n76t", "2 x twin 76mm AK-726"],
    pact_e80_corvette:    ["gun_n57t", "twin 57mm AK-725"],
    pact_e80_destroyer:   ["navgun_ak130", "2 x AK-130 twin 130mm"],
    pact_e90_destroyer:   ["navgun_ak130", "2 x AK-130 twin 130mm"],
    pact_e80_cruiser:     ["navgun_ak130", "AK-130 twin 130mm"],
    pact_e90_cruiser:     ["navgun_ak130", "AK-130 twin 130mm"],
    pact_e00_cruiser:     ["navgun_ak130", "AK-130 twin 130mm"],
    pact_e00_corvette:    ["gun_n100", "A-190 100mm"],
    roc_e00_corvette:     ["gun_n76",  "OTO 76mm Super Rapid"],
    /* the fleet carriers that were still built with a gun battery. Enterprise,
       the Nimitzes, Kuznetsov, Liaoning, Invincible, de Gaulle and the Queen
       Elizabeths never had one; Ark Royal (R09) and Foch lost theirs during the
       decade the roster puts them in, and Arromanches carried only 40 mm AA,
       so those are left as they are. */
    nato_e50_carrier:     ["gun_n127", "8 x 5in/54 Mk 42"],
    gbr_e50_carrier:      ["gun_n127", "8 x twin 4.5in dual-purpose"],
    fra_e60_carrier:      ["gun_n100", "8 x 100mm Mle 1953"],
    fra_e80_carrier:      ["gun_n100", "4 x 100mm Mle 1953"],
  };
  for (var dg in DECK_GUN) {
    var du = UNITS[dg];
    if (!du || !du.weapons) continue;
    var hasGun = false;
    for (var dq = 0; dq < du.weapons.length; dq++) {
      var dw = WEAPONS[du.weapons[dq]];
      if (dw && dw.proj === "shell" && dw.tgt && dw.tgt.ground) hasGun = true;
    }
    if (!hasGun) mountGun(dg, DECK_GUN[dg][0], DECK_GUN[dg][1]);
  }

  /* ---- the coaxial machine gun ---- */
  var COAX_SPECIAL = {
    mbt_f: ["gun_coax_hv", "12.7mm coaxial M2HB"],
    fra_e90_mbt: ["gun_coax_hv", "12.7mm coaxial M2HB"],
    fra_e00_mbt: ["gun_coax_hv", "12.7mm coaxial M2HB"],
    fra_e60_mbt: ["gun_coax_hv", "20mm M693 coaxial cannon"],
    fra_e80_mbt: ["gun_coax_hv", "20mm M693 coaxial cannon"],
    pact_e50_heavy: ["gun_coax_hv", "12.7mm DShKM coaxial"],
    pact_e60_heavy: ["gun_coax_hv", "14.5mm KPVT coaxial"],
    /* the T-14's machine gun is on the roof, in the remote station */
    hvy_p: ["gun_coax", "7.62mm PKTM, remote weapon station"],
  };
  var TANK_ROLE = { mbt: 1, heavy: 1, lighttank: 1 };
  for (var tq in UNITS) {
    var tu = UNITS[tq];
    if (!tu || tu.cat !== "vehicle" || !TANK_ROLE[tu.role] || !tu.weapons || !tu.weapons.length) continue;
    if (mountIndex(tq, /^gun_coax/) >= 0) continue;
    var cs = COAX_SPECIAL[tq] || ["gun_coax", "coaxial machine gun"];
    var ck = mountGun(tq, cs[0], cs[1]);
    /* and never past the main gun: a machine gun that out-reached the tank's
       own cannon would be the first thing to fire. REACH already keeps every
       roster tank inside this; it is the guard for the next one added. */
    var mg0 = WEAPONS[tu.weapons[0]];
    if (ck && mg0 && mg0.range > 0 && WEAPONS[ck].range > mg0.range * 0.9)
      WEAPONS[ck].range = Math.round(mg0.range * 9) / 10;
  }

  /* ---- CAS: the gun each airframe really had ----
     [name, calibre class]. CAS_CAL is what each class delivers against the
     GAU-8's own figures (46 a round, 14 a burst, pen 90): the share of that
     damage and its penetration. Read from the guns themselves - muzzle
     energy times rate of fire, then the shell: the 30x173 Avenger at 3,900
     rounds a minute is in a class of its own, a GSh-30-2 (30x165, 3,000) is
     the next thing to it, the 30 mm revolvers (DEFA, ADEN, NR-30, 30M791)
     and the Mauser 27 mm fire lighter rounds or fewer of them, the 20 and
     23 mm guns lighter again, and six .50s are a machine-gun battery - ball
     ammunition, so "bullet" rather than "cannon". Burst, reload, accuracy,
     reach and the 0.12 a pass all stay the GAU-8's: those describe the pass,
     not the gun. Not scaled by period, like FAULT 05's own CAS weapons. */
  var CAS_CAL = {
    gsh30: [0.60, 60], r30: [0.45, 45], bk27x2: [0.50, 50], bk27: [0.35, 50],
    c20: [0.35, 32], c23t: [0.35, 35], c23x4: [0.35, 35], c23x2: [0.22, 35],
    c20x4: [0.28, 30], pod20: [0.15, 30], hmg: [0.10, 18],
  };
  var CAS_GUN = {
    nato_e50_cas: ["4 x 20mm M3 cannon", "c20x4"],        nato_e60_cas: ["20mm M61A1 Vulcan", "c20"],
    nato_e90_cas: ["20mm M61A1 Vulcan", "c20"],
    deu_e50_cas: ["6 x 12.7mm M3", "hmg"],                roc_e50_cas: ["6 x 12.7mm M3", "hmg"],
    deu_e60_cas: ["2 x 30mm DEFA 552", "r30"],            deu_e80_cas: ["27mm Mauser BK-27 (centreline pod)", "bk27"],
    deu_e90_cas: ["2 x 27mm Mauser BK-27", "bk27x2"],     bomber_g: ["2 x 27mm Mauser BK-27", "bk27x2"],
    gbr_e00_cas: ["27mm Mauser BK-27", "bk27"],           bomber_b: ["27mm Mauser BK-27", "bk27"],
    fra_e50_cas: ["4 x 20mm Hispano 404", "c20x4"],       gbr_e50_cas: ["4 x 20mm Hispano Mk V", "c20x4"],
    fra_e60_cas: ["2 x 30mm DEFA 553", "r30"],            fra_e80_cas: ["2 x 30mm DEFA 553", "r30"],
    fra_e00_cas: ["30mm GIAT 30M791", "r30"],             gbr_e60_cas: ["2 x 30mm ADEN gun pods", "r30"],
    pact_e50_cas: ["4 x 23mm NR-23", "c23x4"],            pact_e60_cas: ["2 x 30mm NR-30", "r30"],
    kpa_e60_cas: ["2 x 30mm NR-30", "r30"],
    pact_e80_cas: ["30mm GSh-30-2", "gsh30"],             pact_e90_cas: ["30mm GSh-30-2", "gsh30"],
    pact_e00_cas: ["30mm GSh-30-2", "gsh30"],             bomber_p: ["30mm GSh-30-2", "gsh30"],
    kpa_e80_cas: ["30mm GSh-30-2", "gsh30"],              kpa_e90_cas: ["30mm GSh-30-2", "gsh30"],
    kpa_e00_cas: ["30mm GSh-30-2", "gsh30"],              bomber_k: ["30mm GSh-30-2", "gsh30"],
    kpa_e50_cas: ["2 x 23mm NS-23", "c23x2"],             pla_e50_cas: ["2 x 23mm NS-23", "c23x2"],
    pla_e60_cas: ["2 x 23mm Type 23-2", "c23x2"],         pla_e80_cas: ["2 x 23mm Type 23-2", "c23x2"],
    pla_e90_cas: ["23mm Type 23-3 twin-barrel", "c23t"],  pla_e00_cas: ["23mm Type 23-3 twin-barrel", "c23t"],
    bomber_c: ["23mm Type 23-3 twin-barrel", "c23t"],
    roc_e60_cas: ["4 x 20mm M39", "c20"],                 roc_e80_cas: ["20mm gun pod", "pod20"],
    roc_e90_cas: ["20mm M61A1 Vulcan", "c20"],            roc_e00_cas: ["20mm M61A1 Vulcan", "c20"],
    bomber_r: ["20mm M61A1 Vulcan", "c20"],
  };
  /* no internal gun in service: Harrier GR5 and GR7, Mirage 2000D */
  var CAS_NO_GUN = { gbr_e80_cas: 1, gbr_e90_cas: 1, fra_e90_cas: 1, bomber_f: 1 };
  for (var cq in UNITS) {
    var cu = UNITS[cq];
    if (!cu || cu.role !== "cas" || !cu.weapons) continue;
    /* the helicopter chain gun FAULT 05 meant to replace */
    var ch = mountIndex(cq, /^chaingun/);
    if (ch >= 0 && mountIndex(cq, /^gau8/) >= 0)
      cu.weapons = cu.weapons.slice(0, ch).concat(cu.weapons.slice(ch + 1));
    var gq = mountIndex(cq, /^gau8/);
    if (gq < 0) continue;
    if (CAS_NO_GUN[cq]) { cu.weapons = cu.weapons.slice(0, gq).concat(cu.weapons.slice(gq + 1)); continue; }
    var cg = CAS_GUN[cq], cc = cg && CAS_CAL[cg[1]];
    if (!cc) continue;
    var cw = relabel(cq, gq, cg[0]);
    if (!cw) continue;
    cw.dmg = Math.round(WEAPONS.gau8.dmg * cc[0] * 10) / 10;
    cw.pen = cc[1];
    if (cg[1] === "hmg") cw.warhead = "bullet";
  }
  /* ...and the era airframe's own mount, which the generator named after the
     airframe's GUN although it is a bomb pass (proj:"bomb", 2.4 tiles, two
     points of magazine). With the real gun now beside it, a Su-25 would list
     "30mm GSh-30-2" twice and drop bombs with one of them. It is renamed to
     what it delivers - generically where the load varied, never a guess at a
     designation. Mounts already named for their stores are left alone. */
  var CAS_STORES = {
    deu_e50_cas: "HVAR rockets (F-84F)",       deu_e60_cas: "rocket pods (G.91R/3)",
    deu_e80_cas: "BL755 cluster bombs (Alpha Jet A)",
    fra_e50_cas: "T-10 rocket pods",           fra_e60_cas: "68mm SNEB rocket pods",
    gbr_e50_cas: "RP-3 rockets",               gbr_e60_cas: "68mm SNEB rockets",
    nato_e50_cas: "bombs and rockets",         nato_e60_cas: "bombs",
    nato_e00_cas: "guided bombs",
    pact_e50_cas: "bombs and rockets",         pact_e60_cas: "bombs and rocket pods",
    pact_e80_cas: "bombs and rocket pods",     pact_e90_cas: "bombs and rocket pods",
    pact_e00_cas: "bombs and rocket pods",
    kpa_e50_cas: "bombs and rockets",          kpa_e60_cas: "bombs and rocket pods",
    kpa_e80_cas: "bombs and rocket pods",      kpa_e90_cas: "bombs and rocket pods",
    kpa_e00_cas: "bombs and rocket pods",
    pla_e50_cas: "bombs and rockets",          pla_e60_cas: "bombs and rocket pods",
    roc_e50_cas: "bombs and rockets",          roc_e60_cas: "bombs and rockets",
    roc_e80_cas: "bombs",                      roc_e90_cas: "bombs",
  };
  for (var sq in CAS_STORES) {
    var si = mountIndex(sq, /^w_e\d\d_[a-z]+_cas/);
    if (si >= 0) relabel(sq, si, CAS_STORES[sq]);
  }

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
    /* Britain never bought the Italian gun for its escorts: the 4.5 inch Mk 8
       is heavier and slower-firing, built for naval gunfire support. */
    gbr:  { name: "4.5in Mk 8 (114mm)", dmg: 62, acc: 0.82, range: 9.2 },
    /* NO fra AND NO deu ENTRY, deliberately, and this is a correction to two
       design packages. The K130 corvette and the F124 Sachsen really do mount
       the OTO Melara 76 mm (the F125 is the outlier, with a 127 mm), and modern
       French escorts — Horizon, FREMM, FDI — mount the 76 mm Super Rapid too.
       The 100 mm Mod 68 CADAM was correct for 1968 to the 1990s only, and
       NAVGUN has no era dimension, so a flat French override would put a 1970s
       gun on every modern French hull. Fall-through is the right answer for
       both nations; put the CADAM on the era units' own weapons if it is
       wanted. PRECONDITION for the British row: this loop only substitutes into
       weapons whose name matches /OTO 76mm/, so a new British escort must be
       authored carrying navgun_76 or this row is dead code. */
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
  /* ======================================================================
     FAULT 14 - the strike fighter with nothing to strike with
     ======================================================================
     Resolved loadouts, not source lines: every F-35 row in the game carried
     ONE air-to-air missile and no ground-capable mount at all.

       cstealth_n  F-35C Lightning II   aam_lo                 g=0
       cstealth_b  F-35B Lightning      aam_lo__cstealth_b     g=0
       cstealth_c  J-35 (carrier)       aam_lo__cstealth_c     g=0
       nato_e00_stealthfighter  F-35    w_e00_..._stealthfighter (AIM-120) g=0

     The F-22 beside them already carries aam_lo + sdb, and the comment on sdb
     says why: "giving it nothing at all against the ground made the most
     expensive fighter in the game useless the moment the sky was clear." The
     F-35 had the same hole and a worse case for it - Lockheed Martin and the
     USAF F-35A fact sheet both describe a multirole STRIKE fighter, the type
     that replaced the Harrier in the RAF and the USMC and is replacing the
     F-16 and the A-10's share of the tasking. This is the third time the same
     defect has been found here (the IFVs, then the American attack boats): the
     description promised a capability the weapon list did not deliver.

     What goes in the bay is published. The internal stations of the F-35A and
     F-35C take two AIM-120 and two 2,000 lb GBU-31 JDAM; the B's bay is
     shorter because the lift fan takes the volume, so it takes two 1,000 lb
     GBU-32 instead. That is the whole clean-configuration load, and it maps
     onto this engine exactly: a pool of 4, an AMRAAM costing 1 and a bomb pair
     costing 2 as a burst of two, gives two missiles and one two-bomb pass.
     jdam_hvy on the B-2 is already read this way - pool 8, cost 2, burst 2 =
     the sixteen JDAM of two rotary launchers - so this follows the file.

     J-35: China publishes no internal-bay weapons list, so the aircraft gets
     the light glide bomb the roster already has rather than an invented store,
     and its row already says out loud that its figures are estimates.

     F-117: a separate and starker case. Its generated weapon is NAMED "Two
     900 kg laser-guided bombs (GBU-10/GBU-" and masked tgt{ground:0,air:1} -
     an air-to-air laser-guided bomb on an aeroplane the USAF fact sheet gives
     no air-to-air weapon and no gun at all. The e90 row is worse: the same
     airframe, renamed "AIM-260 (LO)". Both are re-masked to the ground and
     sea they were built for; nothing else about them changes. */
  WEAPONS.jdam_int = { name: "2x GBU-31 JDAM (internal bay)", dmg: 400, warhead: "he",
    range: 3.0, reload: 2.4, burst: 2, burstDelay: 0.45, acc: 0.93, proj: "bomb",
    speed: 0, aoe: 3.0, suppress: 95, ammo: 2, tgt: { ground: 1, air: 0, sea: 1, sub: 0 } };
  WEAPONS.jdam_int_b = { name: "2x GBU-32 JDAM (short bay)", dmg: 300, warhead: "he",
    range: 3.0, reload: 2.4, burst: 2, burstDelay: 0.45, acc: 0.93, proj: "bomb",
    speed: 0, aoe: 2.4, suppress: 78, ammo: 2, tgt: { ground: 1, air: 0, sea: 1, sub: 0 } };

  /* keyed by unit id, because the three variants do not carry the same bomb */
  var BAY = { cstealth_n: "jdam_int", nato_e00_stealthfighter: "jdam_int",
              cstealth_b: "jdam_int_b", cstealth_c: "sdb" };
  var nBay = 0;
  for (var bu in BAY) {
    var bd = UNITS[bu];
    if (!bd || !bd.weapons) continue;
    var has = false;
    for (var bq = 0; bq < bd.weapons.length; bq++) {
      var bw = WEAPONS[bd.weapons[bq]];
      if (bw && bw.tgt && bw.tgt.ground) { has = true; break; }
    }
    if (has) continue;                       // already armed for the ground
    bd.weapons = bd.weapons.concat([BAY[bu]]);
    nBay++;
  }

  /* the Nighthawk's bombs, re-masked onto the ground they were built for */
  var F117 = ["w_e80_nato_stealthfighter", "w_e90_nato_stealthfighter"];
  for (var fq = 0; fq < F117.length; fq++) {
    var fw = WEAPONS[F117[fq]];
    if (!fw) continue;
    fw.name = "GBU-10/GBU-27 laser-guided bomb";
    fw.warhead = "he"; fw.proj = "bomb"; fw.speed = 0; fw.range = 2.8;
    fw.burst = 2; fw.burstDelay = 0.5; fw.aoe = 3.0; fw.suppress = 95;
    fw.tgt = { ground: 1, air: 0, sea: 1, sub: 0 };
  }

  var POOL = { cas: 8, gunship: 10, fighter: 5, sead: 4, cfighter: 5,
               stealthfighter: 4, heavybomber: 6, stealthbomber: 5 };
  for (var uz in UNITS) {
    var uu = UNITS[uz];
    if (!uu || uu.layer !== "air") continue;
    var want = POOL[uu.role];
    if (want && (uu.ammo || 0) < want) uu.ammo = want;
  }

  /* ======================================================================
     WHAT EACH AIRFRAME, HELICOPTER AND HULL REALLY CARRIED
     ======================================================================
     (owner) "It is fine that not all four party can have the similar
     weapon. We should respect the reality." The present-day rosters in
     rules.js are built on a few shared templates named for American rounds -
     aam "AIM-120 AMRAAM", aam_lo "AIM-260 (LO)", sdb "small-diameter bomb",
     manpad "Stinger MANPADS", asw_mk54 "Mk 54" - and the era generator
     reused NATO rows on European hulls. MEASURED at b62fbf6 over every
     fielded def: a MiG-29, J-10C, MiG-21bis, Su-33 and J-15 fired AMRAAMs; a
     Su-57, J-20 and J-35 the AIM-260, which no air force has yet declared
     operational, and an American glide bomb; Igla, FN-6, HT-16 and Mistral
     teams fired Stingers; British, French and German helicopters from 1955
     to 1999 dropped a torpedo of 2004; four helicopters dropped their
     dipping sonar as a torpedo, two Soviet ones fired a mortar pattern
     under a sonar's name and a Ka-27 fired a ship's RBU-6000; the Moskva
     fired its own helicopter group at ships as a missile; a Taiwanese F-16
     fired its radar; French deck fighters fired Sparrows and AMRAAMs.

     IDENTITY, NOT BALANCE - unless the real weapon is a different class of
     thing, and then the row says what changed and why. Runs after DOMAIN,
     the CAS, helicopter and deck-gun passes and FAULT 14's bay stores, so a
     mount here is already the clone those passes made for this hull
     (relabel() clones one that is not). A mount that is not found - another
     pass already changed it - is left alone, and _behtest [74] fails on
     whatever is still wrong.

     The torpedoes keep their figures. An older round is plainly a lesser
     one, but nearly every ASW helicopter in the game carries a present-day
     lightweight torpedo at 200 to 215 whatever its decade - the MH-60R
     serves from e60 at the Mk 54's 215, the PLA's Z-8 in e90 at the Yu-7's
     205; only the ROC's e80 Defender row (168) and the PLA's e80 depth
     charges were generated lower - so scaling Europe's alone down the
     period ladder (the first cut of this pass did) made a Sea King weaker
     than the American beside it for no historical reason. The names are
     what they carried; a decade curve for every navy's torpedoes is its own
     change, and needs the MH-60R's span fixed first.

     [unit, current name or id pattern, real name, options]
       tpl       swap to this template first, keeping the faction and period
                 scaling the old mount had been given (as a ratio of its own
                 template), then rename
       drop      the airframe never carried it: remove the mount
       dmg, rangeMul  the class figure, said in the comment */
  function fitIndex(uid, test) {
    var ws = (UNITS[uid] && UNITS[uid].weapons) || [];
    for (var i = 0; i < ws.length; i++) {
      var w = WEAPONS[ws[i]];
      if (w && (typeof test === "string" ? w.name === test : test.test(ws[i]))) return i;
    }
    return -1;
  }
  function swapMount(uid, idx, tpl) {
    var u = UNITS[uid], was = u.weapons[idx], old = WEAPONS[was];
    var base = WEAPONS[String(was).split("__")[0]];
    var key = privateWeapon(uid, tpl);
    if (!key || !old) return;
    var nw = WEAPONS[key];
    if (base && base !== old) {
      if (base.acc && old.acc !== undefined && nw.acc !== undefined)
        nw.acc = Math.max(0.28, Math.min(0.98, +(nw.acc * old.acc / base.acc).toFixed(3)));
      if (base.range && old.range && nw.range)
        nw.range = Math.round(nw.range * old.range / base.range * 10) / 10;
    }
    u.weapons = u.weapons.slice(); u.weapons[idx] = key;
  }
  var REAL_FIT = [
    /* ---- air to air: the missile each air force bought ---- */
    ["fighter_p",   "AIM-120 AMRAAM", "R-27R and R-73"],                /* MiG-29S */
    ["cfighter_p",  "AIM-120 AMRAAM", "R-27ER and R-73"],               /* Su-33 */
    ["fighter_c",   "AIM-120 AMRAAM", "PL-15 and PL-10"],               /* J-10C */
    ["cfighter_c",  "AIM-120 AMRAAM", "PL-12 and PL-8"],                /* J-15, 2013 */
    /* MiG-21bis: an R-60 and an R-13 are short-range infrared rounds, not an
       active-radar BVR missile. Its range here was already the KPA-scaled
       8.1; the damage is the 172 the same airframe's R-60/R-13 row does in
       e90 (kpa_e90_fighter), against the AMRAAM's 200. */
    ["fighter_k",   "AIM-120 AMRAAM", "R-60M and R-13M IR missiles", { dmg: 172 }],
    ["fighter_b",   "AIM-120 AMRAAM", "Meteor and ASRAAM"],             /* Typhoon FGR4, Meteor 2018 */
    ["fighter_f",   "AIM-120 AMRAAM", "MICA and Meteor"],               /* Rafale F4 */
    ["cfighter_f",  "AIM-120 AMRAAM", "MICA and Meteor"],
    /* F-16V: an AIM-260 on an export fourth-generation jet is the wrong round
       and the wrong class. It flies the same AMRAAM as the American F-16C
       beside it, at Taiwan's own scaling: 230 / 10.6 becomes 200 / 9.2. */
    ["fighter_r",   "AIM-260 (LO)", "AIM-120C-7 AMRAAM and AIM-9X", { tpl: "aam" }],
    ["stealth_p",   "AIM-260 (LO)", "R-77M and R-74M2 (internal bays)"],   /* Su-57, as FACTS */
    ["stealth_c",   "AIM-260 (LO)", "PL-15 and PL-10 (internal bays)"],    /* J-20 */
    ["cstealth_c",  "AIM-260 (LO)", "PL-15 and PL-10 (internal bays)"],    /* J-35 */
    ["stealth_b",   "AIM-260 (LO)", "AIM-120C-7 AMRAAM and ASRAAM (internal)"],   /* UK F-35B */
    ["cstealth_b",  "AIM-260 (LO)", "AIM-120C-7 AMRAAM and ASRAAM (internal)"],
    ["roc_e00_fighter", "AN/APG-83 SABR AESA", "AIM-120C-5 AMRAAM and AIM-9M"],   /* the radar is not a missile */
    ["fra_e00_cfighter", "AIM-120 AMRAAM and AIM-9 internally", "MICA EM / MICA IR"],   /* Rafale M */
    /* The Super Etendard carried Magic for self-defence and nothing longer:
       a short-range infrared round in place of a Sparrow or an AMRAAM, so
       its reach comes down to what a short-range round has here - the
       e80 Sea Harrier's AIM-9L flies 7.6 tiles against this row's 8.6. */
    ["fra_e80_cfighter", "AIM-7 Sparrow", "R.550 Magic", { rangeMul: 0.85 }],
    ["fra_e90_cfighter", "AIM-120 AMRAAM", "R.550 Magic II", { rangeMul: 0.85 }],
    ["fra_e60_cfighter", /^w_e60_nato_fighter/, "Matra R.530 and R.550 Magic"],   /* F-8E(FN) */
    /* A Sea Hawk and an Aquilon carried four 20 mm Hispanos and no missile,
       not an American F-86's six .50s. The NAME is all that changes: the
       mount is still proj "missile", as every 1950s fighter gun in the
       roster is (the F-86's .50s and the MiG-17's N-37 alike) - a known
       open fault, guns modelled as homing rounds, left for its own change
       because fixing two airframes would leave them the only real guns in
       their decade. */
    ["fra_e50_cfighter", /^w_e50_nato_fighter/, "Four 20mm Hispano 404 cannon"],  /* Aquilon */
    ["gbr_e50_cfighter", /^w_e50_nato_fighter/, "Four 20mm Hispano Mk V cannon"], /* Sea Hawk */
    /* the generator named these after the GUN, but the mount is the homing
       missile the aircraft fought with; the gun is not modelled on them */
    ["pact_e80_fighter", "30mm GSh-30-1", "R-27R and R-73"],            /* MiG-29 */
    ["pact_e90_fighter", "30mm GSh-30-1", "R-27R and R-73"],            /* MiG-29S */
    ["pact_e00_fighter", "30mm GSh-30-1", "R-77-1 and R-73"],           /* Su-35S */
    ["pla_e80_fighter",  "23mm cannon",   "PL-2B and PL-5B IR missiles"],   /* J-8II */
    ["pla_e90_fighter",  "30mm GSh-30-1", "R-27R and R-73"],            /* Su-27SK */
    ["pla_e00_fighter",  "23mm cannon",   "PL-12 and PL-8"],            /* J-10 / J-10B */
    ["roc_e60_fighter",  "20mm M61A1 Vulcan", "AIM-9 Sidewinder and 20mm M61A1"],   /* F-104G */
    ["roc_e80_fighter",  "2x 20mm M39",       "AIM-9 Sidewinder and 2x 20mm M39"],  /* F-5E */
    ["roc_e90_fighter",  "20mm M61A1",        "AIM-7M Sparrow and AIM-9M Sidewinder"],  /* F-16A/B Block 20 */

    /* ---- air to ground ---- */
    ["stealth_p",   "small-diameter bomb", "KAB-250 guided bomb (internal)"],
    /* The J-20 is an air-superiority fighter; no ground-attack store has been
       shown in service, and the e00 J-20 row already carries missiles alone.
       Dropped, not renamed into an invention. */
    ["stealth_c",   "small-diameter bomb", "", { drop: true }],
    /* the J-35's bay store stays a light glide bomb, as FAULT 14 decided -
       just not an American product name */
    ["cstealth_c",  "small-diameter bomb", "light guided glide bomb (internal bay)"],
    ["stealth_b",   "small-diameter bomb", "Paveway IV (internal bay)"],
    ["cstealth_b",  "2x GBU-32 JDAM (short bay)", "2x Paveway IV (internal bay)"],
    ["bomber_p",    "500lb guided bomb", "KAB-500 guided bomb"],
    ["bomber_b",    "500lb guided bomb", "Paveway IV"],
    ["bomber_f",    "500lb guided bomb", "GBU-12 Paveway II and AASM"],
    ["bomber_c",    "500lb guided bomb", "LT-2 laser-guided bomb"],       /* JH-7A */
    /* The KPA has no guided bomb: the note on its e80 Su-25K says unguided
       ordnance only. The KPA's own guided-weapon scaling had already brought
       this mount to the accuracy of the e00 Su-25K's iron bombs (0.743
       against 0.744), so only the name was wrong. The Q-5C's own
       description says "still unguided iron bombs and rockets". */
    ["bomber_k",    "500lb guided bomb", "FAB-250 and FAB-500 bombs"],
    ["pla_e80_cas", "500lb guided bomb", "bombs and rocket pods"],
    /* the JH-7's missile is now the YJ-8K the CAS pass gives it; this row,
       a bomb that carried the missile's name, is the bombs it also dropped */
    ["pla_e90_cas", "YJ-8K anti-ship missiles", "250 kg and 500 kg bombs"],
    /* A pod and a weapons programme are not bombs. The F-15E's LANTIRN pods
       found the target for the GBU-12s it dropped; SWIP gave the A-6E
       Harpoon and SLAM, but this row is a range-2.7 bomb, so it is named
       for the bombs it models - the stand-off rounds are not in it. */
    ["nato_e90_cas",     "LANTIRN navigation and targeting pods", "GBU-12 Paveway II and Mk 82 bombs"],
    ["nato_e90_cstrike", "SWIP: Paveway, Harpoon and SLAM", "Mk 83 and Paveway II bombs"],
    /* "Brimstone and Paveway IV" was a bomb mount, and the GR9 beside the
       GR4 never carried Brimstone; Brimstone is now the GR4's missile */
    ["gbr_e00_cas",      "Brimstone and Paveway IV", "Paveway II and Paveway IV"],
    ["gbr_e00_cfighter", "Brimstone and Paveway IV", "Paveway II and Paveway IV"],
    /* Tien Chien II is an air-to-air missile, filed here as a bomb */
    ["roc_e00_cas",      "Tien Chien II", "Mk 82 bombs"],

    /* ---- the right MANPADS on each shoulder ---- */
    ["aa_p", "Stinger MANPADS", "9K338 Igla-S MANPADS"],
    ["aa_c", "Stinger MANPADS", "FN-6 MANPADS"],
    ["aa_k", "Stinger MANPADS", "HT-16PGJ MANPADS"],
    ["aa_f", "Stinger MANPADS", "Mistral 3 MANPADS"],

    /* ---- anti-submarine helicopters: the torpedo of their own decade ----
       Mk 44 1957, Mk 46 1965, Sting Ray 1983, Mk 54 2004, MU90 about 2002.
       Names only; see the header for why the figures stay. */
    ["gbr_e50_aswhelo", "Mk 54 lightweight torpedo", "Mk 30 homing torpedo"],            /* Whirlwind HAS.7 */
    ["gbr_e60_aswhelo", "Mk 54 lightweight torpedo", "Mk 44 homing torpedo"],            /* Wessex HAS.1 */
    ["gbr_e80_aswhelo", "Mk 54 lightweight torpedo", "Sting Ray and Mk 46 torpedoes"],   /* Sea King HAS.5 */
    ["gbr_e90_aswhelo", "Sting Ray Mod 1", "Sting Ray Mod 0"],                           /* Mod 1 is 2006 */
    ["fra_e80_aswhelo", "Mk 54 lightweight torpedo", "Mk 46 torpedo"],                   /* Lynx HAS.2(FN) */
    ["fra_e90_aswhelo", "Mk 54 lightweight torpedo", "Mk 46 torpedo"],
    ["deu_e80_aswhelo", "Mk 54 lightweight torpedo", "Mk 46 torpedo"],                   /* Sea Lynx Mk88 */
    ["deu_e90_aswhelo", "Mk 54 lightweight torpedo", "Mk 46 torpedo"],
    /* the sonar dips; the torpedo is what goes in the water */
    ["nato_e00_aswhelo", "AN/AQS-22 ALFS dipping sonar", "Mk 54 lightweight torpedo"],   /* MH-60R */
    ["gbr_e00_aswhelo",  "AN/AQS-22 ALFS dipping sonar", "Sting Ray torpedo"],           /* Merlin HM1 */
    ["fra_e00_aswhelo",  "AN/AQS-22 ALFS dipping sonar", "MU90 Impact"],                 /* NH90 Caiman */
    ["deu_e00_aswhelo",  "AN/AQS-22 ALFS dipping sonar", "Mk 46 torpedo"],               /* Sea Lynx Mk88A */
    /* A Ka-25PL and a Ka-27PL drop a homing torpedo (AT-1 from 1962; AT-1M
       and APR-2 later) or depth bombs. Their generated rows were a sonar's
       name on a ship's mortar pattern - proj "arc", five or six rounds to
       2.6-3.3 tiles - so a new name alone would be the same invention under
       a truer label. Each becomes a torpedo mount at the Pact's own scaling
       of the row it replaces, as the present-day Ka-27 below does: 215 at
       6.5 tiles, the figure every other ASW helicopter of their decade has. */
    ["pact_e60_aswhelo", "Dipping sonar and one AT-1 torpedo", "AT-1 homing torpedo", { tpl: "asw_mk54" }],   /* Ka-25PL */
    ["pact_e80_aswhelo", "Dipping sonar", "AT-1M torpedo and depth bombs", { tpl: "asw_mk54" }],             /* Ka-27PL */
    /* A Ka-27 does not carry a twelve-barrel ship's rocket mortar. It drops
       an APR-2 or AT-1M homing torpedo: a torpedo mount, at the Pact's own
       scaling of the one it replaces. */
    ["asw_helo_p", "RBU-6000 rocket mortar", "APR-2 / AT-1M ASW torpedo", { tpl: "asw_mk54" }],

    /* ---- ships ----
       The Moskva's "weapon" was its own air group - fourteen Ka-25s modelled
       as a 9-tile missile against ships and submarines - although the deck
       already carries them as aircraft (carrier: 3). What the hull itself
       fired at a submarine was two RBU-6000 (and the RPK-1 Vikhr nuclear ASW
       rocket, which is not modelled); against a ship it had only its guns.
       The RBU is the same unscaled template the 1960s Petya already fires. */
    ["pact_e60_carrier", "14 x Ka-25 ASW helicopters", "2 x RBU-6000 rocket mortar", { tpl: "asw_rbu" }],
  ];
  var nFit = 0;
  for (var rf = 0; rf < REAL_FIT.length; rf++) {
    var RF = REAL_FIT[rf], ru = UNITS[RF[0]];
    if (!ru || !ru.weapons) continue;
    var ri = fitIndex(RF[0], RF[1]);
    if (ri < 0) continue;
    var ro = RF[3] || {};
    if (ro.drop) { ru.weapons = ru.weapons.slice(0, ri).concat(ru.weapons.slice(ri + 1)); nFit++; continue; }
    if (ro.tpl) swapMount(RF[0], ri, ro.tpl);
    var rw = relabel(RF[0], ri, RF[2]);
    if (!rw) continue;
    if (ro.dmg) rw.dmg = ro.dmg;
    if (ro.rangeMul) rw.range = Math.round(rw.range * ro.rangeMul * 10) / 10;
    nFit++;
  }

  /* ---- names the generator cut off at 42 characters ----
     "Up to 18" on the B-2A (eras.js) was the worst of it; these are the
     rest that stop mid-word. Keyed on the exact cut-off text, so a row
     another change has already renamed is left alone. Every clone of the
     row is renamed, so no hull keeps the stub. */
  var TRUNC = {
    w_e00_kpa_missileboat: ["Kumsong-3 (Kh-35 derivative) anti-ship mis", "Kumsong-3 (Kh-35 derivative) anti-ship missile"],
    w_e00_nato_lighttank:  ["105mm M68A2 in a low-profile autoloading t", "105mm M68A2 in a low-profile autoloading turret"],
    w_e00_pact_lighttank:  ["125mm 2A75 with autoloader and Refleks ATG", "125mm 2A75 with autoloader and Refleks ATGM"],
    w_e00_pact_spg:        ["152mm 2A64 with automated laying and fire ", "152mm 2A64 with automated laying and fire control"],
    w_e00_pla_at:          ["HJ-12 imaging-infrared fire-and-forget ATG", "HJ-12 imaging-infrared fire-and-forget ATGM"],
    w_e00_roc_spaag:       ["4x TC-1L (ground-launched Sky Sword I) IR ", "4x TC-1L (ground-launched Sky Sword I) IR missiles"],
    w_e50_kpa_spg:         ["76.2mm ZiS-3 in an open-topped fighting co", "76.2mm ZiS-3 in an open-topped fighting compartment"],
    w_e50_nato_cruiser:    ["Nine 203mm/55 Mk 16 rapid-fire guns in thr", "Nine 203mm/55 Mk 16 rapid-fire guns in three turrets"],
    w_e50_nato_ifv:        [".50 cal M2HB on an open pintle mount - not", ".50 cal M2HB on an open pintle mount"],
    w_e50_pla_rifle:       ["Type 56 7.62x39mm assault rifle (licence A", "Type 56 7.62x39mm assault rifle (licence AK-47)"],
    w_e60_kpa_missileboat: ["P-15 Termit (SS-N-2 Styx) anti-ship missil", "P-15 Termit (SS-N-2 Styx) anti-ship missiles"],
    w_e60_kpa_spg:         ["122mm D-74 or M-1931/37 gun on a locally b", "122mm D-74 or M-1931/37 gun on a locally built chassis"],
    w_e60_nato_aa:         ["70mm uncooled lead-sulphide IR homing miss", "70mm uncooled lead-sulphide IR homing missile"],
    w_e60_nato_fighter:    ["AIM-7 Sparrow radar-guided and AIM-9 Sidew", "AIM-7 Sparrow and AIM-9 Sidewinder"],
    w_e60_nato_lighttank:  ["152mm M81 gun/launcher firing conventional", "152mm M81 gun/launcher: shells and MGM-51 Shillelagh"],
    w_e60_nato_sead:       ["AGM-45 Shrike and AGM-78 Standard ARM anti", "AGM-45 Shrike and AGM-78 Standard ARM"],
    w_e60_nato_spaag:      ["20mm M168 rotary cannon (M61 Vulcan deriva", "20mm M168 rotary cannon (M61 Vulcan derivative)"],
    w_e60_nato_spg:        ["155mm M126 howitzer in a fully rotating en", "155mm M126 howitzer in a fully rotating turret"],
    w_e60_pact_fighter:    ["23mm GSh-23 and 2-4 x R-3S/R-60 IR missile", "23mm GSh-23 and 2-4 x R-3S/R-60 IR missiles"],
    w_e60_pact_recon:      ["14.5mm KPVT and 7.62mm PKT in a small turr", "14.5mm KPVT and 7.62mm PKT in a small turret"],
    w_e60_pact_spaag:      ["Quad 23mm AZP-23 with RPK-2 Tobol gun-layi", "Quad 23mm AZP-23 with RPK-2 Tobol gun-laying radar"],
    w_e60_roc_spg:         ["M110: 203mm M2A2 howitzer. M108: 105mm M10", "203mm M2A2 (M110) and 105mm M103 (M108) howitzers"],
    w_e80_kpa_missileboat: ["4x P-15 Termit (SS-N-2 Styx) anti-ship mis", "4x P-15 Termit (SS-N-2 Styx) anti-ship missiles"],
    w_e80_nato_mbt:        ["120mm M256 smoothbore (licensed Rheinmetal", "120mm M256 smoothbore (licensed Rheinmetall L/44)"],
    w_e80_pact_mbt:        ["125mm 2A46M-1 with 9K119 Refleks gun-launc", "125mm 2A46M-1 with 9K119 Refleks gun-launched ATGM"],
    w_e80_roc_mlrs:        ["45x 117mm Mk15 rockets (steel-ball fragmen", "45x 117mm Mk15 rockets (steel-ball fragmentation)"],
    w_e90_kpa_spg:         ["170mm gun on a redesigned chassis with onb", "170mm gun on a redesigned chassis with onboard ammunition"],
    w_e90_nato_at:         ["127mm imaging-infrared fire-and-forget mis", "127mm imaging-infrared fire-and-forget missile"],
  };
  for (var tk in WEAPONS) {
    var tb = TRUNC[tk.split("__")[0]];
    if (tb && WEAPONS[tk].name === tb[0]) { WEAPONS[tk].name = tb[1]; nFit++; }
  }

  /* twelve Kh-55SM on two rotary launchers, one round each (eras.js) */
  if (UNITS.pact_e80_stealthbomber && (UNITS.pact_e80_stealthbomber.ammo || 0) < 12)
    UNITS.pact_e80_stealthbomber.ammo = 12;

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
  /* ---- a cargo round flies as far as the round it shares a pod with ----
     Derived LAST, from the finished figure, for the same reason optics are.
     Hand-writing a range would have produced a third set of artillery figures
     quietly diverging from the two that already exist.

     rangeMul is on the WEAPON, not a constant here: a 155mm cargo shell gives
     up more to base-bleed HE than a cargo rocket gives up to a unitary one, and
     the e80-e00 M109 and M270 share the SAME era range figure (ART_ERA_M keys
     mlrs and spg identically), so without a per-round multiplier the card's
     claim that the gun round reaches less far would have been false in every
     era but e20. minRange is inherited unchanged: what stops a launcher
     shooting into its own lap is the launcher, not the payload.

     A cargo round must always be APPENDED to a unit's weapons array, never
     prepended: generations.js writes u.weapons[0] when it substitutes a private
     weapon, and bombard()'s fallback scan walks forward looking for the first
     round it is allowed to fire. */
  for (var _sd in UNITS) {
    var _su = UNITS[_sd];
    if (!_su || !_su.weapons || _su.weapons.length < 2) continue;
    var _host = WEAPONS[_su.weapons[0]];
    if (!_host) continue;
    for (var _sq = 1; _sq < _su.weapons.length; _sq++) {
      var _sk = _su.weapons[_sq], _sw = WEAPONS[_sk];
      if (!_sw || !_sw.scatter) continue;
      /* Clone once. The domain pass above may already have given this unit its
         own copy, in which case the key already carries the unit's name. */
      if (_sk.indexOf("__" + _sd) < 0) {
        var _pk = privateWeapon(_sd, _sk);
        if (!_pk) continue;
        _su.weapons = _su.weapons.slice();
        _su.weapons[_sq] = _pk;
        _sk = _pk;
      }
      WEAPONS[_sk].range = Math.round(_host.range * (WEAPONS[_sk].rangeMul || 0.92) * 10) / 10;
      WEAPONS[_sk].minRange = _host.minRange || 3.0;
    }
  }

  for (var _rfg in UNITS) {
    var _ug = UNITS[_rfg];
    if (_ug.cat === "aircraft" && _ug.jet && !_ug.tanker && !_ug.hover) _ug.refuelable = true;
  }

  /* ---- weapon release across the whole roster ----
     Derived rather than written into generated JSON, the same way w.rocket is
     derived in eras.js, and placed at the tail of the LAST data file so it sees
     everything rules.js, eras.js and heavyair.js between them created.

     Measured, not assumed: 19 tel (every one hand-written in rules.js), 12
     sead and 8 ewair - 39 hulls, and every single one carries exactly one
     weapon. So a per-weapon flag would be sufficient today; `noAuto` on the
     unit is what stays correct the day somebody hangs a shared round on an
     ordinary fighter. If a Wild Weasel is ever given a Sidewinder as well, drop
     noAuto from that def and rely on the per-weapon `manual` flag - which is
     exactly why both levels exist.

     telnuc is listed here so that Phase 4's launchers inherit the same rule
     from the same line rather than from a second mechanism.

     sead  - fired at an emitter a commander chose, never at what a patrol
             drove past.
     ewair - the real weapon is the jamming bubble, which asks only that the
             aircraft be airborne and not parked (game.js: G.emitting reads
             u.parked and the order type, and nothing about stance), so holding
             the missile costs these airframes nothing they were bought for.
     tel / telnuc - one or two rounds and a 55-to-95 second reload. */
  /* ---- what an early-warning aircraft IS ----
     `awacs: true` was hand-written on five defs in rules.js and on none of the
     twelve generated by eras.js, although every one of them carries
     role:"awacs". Three readers key off the flag and all three were wrong for
     five of the six eras: ai.js's sortie loop skips a weaponless aircraft
     unless it is flagged, so the AI bought its AEW and left it shut down on the
     apron for the whole battle - the exact bug the comment above that line says
     was fixed; ai.js's purchase gate counts `fielded(d => d.awacs)`, saw zero
     however many it owned, and kept buying more; and the build card never said
     AIRBORNE EARLY WARNING on an airframe costing up to 3,230 credits.
     Derive it from the role, at the tail of the last data file so it sees
     everything rules.js, eras.js and heavyair.js created - and after the
     phantom purge, so the three PLA "NONE" placeholders (China had no
     operational AEW aircraft before 2007) are already gone and nothing unreal
     is resurrected. */
  var nAew = 0;
  for (var _ak in UNITS) {
    var _ad = UNITS[_ak];
    if (_ad && (_ad.role === "awacs" || _ad.role === "cawacs") && !_ad.awacs) {
      _ad.awacs = true; nAew++;
    }
  }

  /* ---- a European submarine never fired an American torpedo ----
     The era rows for four navies share ONE w_eNN_nato_sub weapon each, and
     three of the five are United States hardware worn by British, French and
     German hulls: "Mk 48 ADCAP" in e80 - a torpedo none of the three ever
     bought - "Eight 660mm torpedo tubes" in e90, which is a Seawolf and a
     calibre unique to that class, and "Four 533mm tubes" in e00, which is a
     Virginia. A 450-tonne Type 206 firing a Mk 48, and a 500-tonne Type 206A
     with Seawolf tubes, are the worst of it.

     The Royal Navy carried the Mk 8** straight-runner into the 1980s - HMS
     Conqueror sank the General Belgrano on 2 May 1982 with two hits from a
     salvo of three, the homing Tigerfish having been judged unreliable - then
     Tigerfish, then Spearfish from 1992. France ran the L5 and the wire-guided
     F17 Mod 2 and now the F21 Artemis. Germany has never bought a submarine
     torpedo from anybody: G7e, then the DM2 line, then the DM2A4 Seehecht
     that rules.js already gives sub_g.

     IDENTITY ONLY. Nothing here touches damage, range, accuracy or reload -
     the shared era curve is left exactly where it was authored, and the
     numbers are measured identical before and after. Runs at the tail so the
     domain pass has already cloned; where it has, the clone is renamed in
     place rather than cloned a second time, so no id gains a doubled suffix.
     e50 is the exception that needs privateWeapon(): DOMAIN_BITE is 0.00 in
     the 1950s, so w_e50_nato_sub is never cloned and all four navies are
     still sharing one live object. */
  var EURO_TORP = {
    gbr_e50_sub: "Six bow and two stern 21in tubes, Mk 8**",
    gbr_e60_sub: "Six bow 21in tubes, Mk 8** and Mk 23",
    gbr_e80_sub: "Five 21in tubes, Mk 24 Tigerfish",
    gbr_e90_sub: "Five 21in tubes, Tigerfish then Spearfish",
    gbr_e00_sub: "Six 21in tubes, Spearfish Mod 1",
    fra_e50_sub: "Six bow and two stern 550mm tubes",
    fra_e60_sub: "Twelve 550mm tubes, no reloads",
    fra_e80_sub: "Four 550mm bow tubes, L5 Mod 3",
    fra_e90_sub: "Four 533mm tubes, F17 Mod 2",
    fra_e00_sub: "Four 533mm tubes, F17 Mod 2",
    deu_e50_sub: "Two 533mm bow tubes, G7e, no reload",
    deu_e60_sub: "Eight 533mm bow tubes, no reloads",
    deu_e80_sub: "Eight 533mm bow tubes, DM2 Seeaal",
    deu_e90_sub: "Eight 533mm bow tubes, DM2A3",
    deu_e00_sub: "Six 533mm tubes, DM2A4 Seehecht",
  };
  var nTorp = 0;
  for (var uidT in EURO_TORP) {
    var uT = UNITS[uidT];
    if (!uT || !uT.weapons) continue;
    for (var qT = 0; qT < uT.weapons.length; qT++) {
      var widT = uT.weapons[qT];
      if (widT.indexOf("_nato_sub") < 0) continue;
      var pT = widT;
      if (widT.indexOf("__" + uidT) !== widT.length - uidT.length - 2) {
        pT = privateWeapon(uidT, widT);
        if (!pT) continue;
        uT.weapons = uT.weapons.slice();
        uT.weapons[qT] = pT;
      }
      WEAPONS[pT].name = EURO_TORP[uidT];
      nTorp++;
    }
  }

  /* ---- fixed magazines have to survive the private-weapon rename ----
     rules.js keys FIXED_MAGAZINE by the SHARED weapon id - ssm_oniks,
     ssm_granit, ssm_kn01, ssm_hf3, ssm_yj18 - because at the moment it runs
     that is the id in the unit's array. The domain pass above then hands
     every naval hull its own clone, so a Slava's array reads
     ssm_oniks__cruiser_p and an Oscar's ssm_granit__ssgn_p while the magazine
     is still filed under the bare name. entities.js reads
     this.def.magazine[this.def.weapons[wi]], gets undefined, and skips the
     decrement entirely.

     Measured before this loop existed: TEN of the eleven declared magazines
     were dead. Only missileboat_n still ran dry, because its Harpoon happened
     never to be cloned. The Oscar's twenty-four Granit, the Slava's sixteen
     P-1000 and every Osa's four Styx were infinite, the MISSILE TUBES EMPTY
     alert could not fire for any of them, and reloadAtYard() - the whole
     "steam home and rearm alongside" loop - reads the same key and had never
     run either. The comment in rules.js says a Slava's second salvo does not
     exist. It did.

     The "__" in the prefix test matters: it stops a short key matching a
     longer unrelated one. */
  var nMag = 0;
  for (var _mu in UNITS) {
    var _md = UNITS[_mu];
    if (!_md || !_md.magazine || !_md.weapons) continue;
    var _nm = {}, _mfix = false;
    for (var _mk in _md.magazine) {
      var _hit = _mk;
      if (_md.weapons.indexOf(_mk) < 0) {
        for (var _mw = 0; _mw < _md.weapons.length; _mw++) {
          if (_md.weapons[_mw].indexOf(_mk + "__") === 0) { _hit = _md.weapons[_mw]; _mfix = true; break; }
        }
      }
      _nm[_hit] = _md.magazine[_mk];
    }
    if (_mfix) { _md.magazine = _nm; nMag++; }
  }

  var HELD_ROLES = { sead: 1, ewair: 1, tel: 1, telnuc: 1 };
  var nHeld = 0;
  for (var _hu in UNITS) {
    var _hd = UNITS[_hu];
    if (_hd && HELD_ROLES[_hd.role]) { _hd.noAuto = true; nHeld++; }
  }

  /* ---- Tomahawk goes to sea in the surface fleet ----
     W11 of the gap report: 288 Tomahawks were launched in Desert Storm,
     most of them from cruisers, destroyers and the battleships Missouri and
     Wisconsin, and in this game only a US submarine carried one.

     FITTED HERE, after "eyes to match the reach" further up this file, and
     not on the rows in eras.js. That pass raises every hull's sight to its
     longest non-lobbed weapon plus 0.4 tiles, which is how every Tomahawk
     boat in the game came to see 19.4. A round that flies to coordinates is
     no reason for the ship to see further: measured, a Burke fitted in
     eras.js went from 14.9 tiles of sight to 19.4 and a Spruance from 10.9.
     (A pass that skips rounds fired on a cue would skip this one too; fitted
     here, the answer does not depend on it.)

     WHO:
       Spruance (e80)          Mk 143 armored boxes from 1983, then Mk 41 on
                               24 hulls from 1986. Eight rounds, because the
                               row's 3D fit draws the boxes.
       Burke (e90, e00, e20)   Mk 41 from DDG-51's commissioning in 1991.
       Ticonderoga (e90, e20)  CG-52 Bunker Hill onward, from 1986.
       Iowa (e80, e90)         eight boxes, thirty-two rounds.
     NOT the e80 Ticonderoga. That row is USS Ticonderoga (CG-47) by name and
     by its 3D row (Mk 26 rails, no cells), and CG-47 to CG-51 never carried
     the missile; the VLS ships of 1986-89 are the e90 row. A US cruiser of the
     2000s, if a later pass adds one, is a VLS ship - the five Mk 26 hulls
     were gone by 2005 - and is fitted by the id it would carry.

     THE MAGAZINE is the load, not the cell count: a Burke's 90-96 cells also
     hold the area SAMs and ASROC, and eight to sixteen Tomahawks was an
     ordinary deployment. Mk 41 cannot be reloaded at sea, so an empty ship
     goes home to a naval yard (entities.js reloadAtYard) - the rule the
     Slava's deck tubes already live by. Merged into any magazine the hull
     already declares. */
  var TLAM_FIT = {
    nato_e80_destroyer:  ["tlam_n_abl", 8],
    nato_e90_destroyer:  ["tlam_n_ship", 12],
    nato_e00_destroyer:  ["tlam_n_ship", 12],
    destroyer_n:         ["tlam_n_ship", 12],
    nato_e90_cruiser:    ["tlam_n_ship", 16],
    nato_e00_cruiser:    ["tlam_n_ship", 16],
    cruiser_n:           ["tlam_n_ship", 16],
    nato_e80_battleship: ["tlam_n_abl", 32],
    nato_e90_battleship: ["tlam_n_abl", 32],
  };
  for (var _tfk in TLAM_FIT) {
    var _tfu = UNITS[_tfk], _tff = TLAM_FIT[_tfk];
    if (!_tfu || !_tfu.weapons || !WEAPONS[_tff[0]]) continue;
    if (_tfu.weapons.indexOf(_tff[0]) < 0) _tfu.weapons = _tfu.weapons.concat([_tff[0]]);
    var _tfm = {};
    for (var _tfq in (_tfu.magazine || {})) _tfm[_tfq] = _tfu.magazine[_tfq];
    _tfm[_tff[0]] = _tff[1];
    _tfu.magazine = _tfm;
  }

  /* ---- a warship's decoys, re-derived now that the era rosters exist ----
     Exactly the case the `refuelable` sweep above documents, and found the
     same way. rules.js applies SOFTKILL from a table keyed by unit id at the
     bottom of its own file, which is BEFORE eras.js has generated a single
     historical hull: 29 ids applied, 421 era hulls left with nothing, and
     combat.js's soft-kill layer dead in five of the game's six settings.

     Run from here rather than moved, because this is the last data file and
     therefore the first moment at which every roster - rules.js, eras.js,
     heavyair.js and this one - actually exists. The sweep is keyed on
     (faction, era, role) and not on ids, so anything a later pass adds is
     covered; anything it cannot answer from e80 onward lands in
     SOFTKILL_ERA_GAPS, and _behtest [49] fails if that list is not empty. */
  var nDecoy = 0, nDecoyGap = 0;
  if (typeof applyEraSoftkill === "function") {
    nDecoyGap = applyEraSoftkill();
    for (var _dk in UNITS)
      if (UNITS[_dk] && UNITS[_dk].softkill !== undefined) nDecoy++;
  }
  /* A gap means a roster shipped with no decoy research behind it. [49] fails
     on it, but the behaviour suite is not what most people run - so say it on
     the console of every page as well, or a dropped table stays silent until
     somebody happens to run the tests. */
  if (nDecoyGap && typeof console !== "undefined" && console.warn)
    console.warn("[generations] " + nDecoyGap + " surface hulls from e80 on " +
                 "have no decoy rating: " + SOFTKILL_ERA_GAPS.join(", "));

  /* ---- the ready magazine, and the jammer in the rotodome ----
     The same fault as the decoys directly above, found the same way, in two
     more places. Both of these sweeps live in rules.js, both are keyed on the
     unit's ROLE rather than on its id - so both were written to cover the
     whole game - and both were spelled as a bare loop in the body of rules.js,
     which runs before eras.js has generated a single historical row.

     rounds: 70 era gun and rocket batteries - 38 self-propelled guns and 32
       multiple launchers, over eight factions and five eras - reached the
       field with no magazine. entities.js treats a missing `rounds` as no
       limit rather than as zero, so every historical howitzer and every
       historical MLRS fired for the whole battle without resupply.
     jam:    28 era AEW aircraft carried a radar and no jamming suite, in a
       game where rules.js says in as many words that the suite is half of
       what the airframe is for.

     Run from here for the reason applyEraSoftkill() is run from here: this is
     the last data file and therefore the first moment at which rules.js,
     eras.js, heavyair.js and this file have all had their say. Both functions
     refuse to overwrite a value that already exists, so calling them a second
     time cannot disturb anything rules.js settled. */
  var nRounds = 0, nRoundsGap = 0, nJam = 0;
  if (typeof applyRoleRounds === "function") {
    nRounds = applyRoleRounds();
    nRoundsGap = ROUNDS_ERA_GAPS.length;
  }
  if (typeof applyAewJam === "function") nJam = applyAewJam();
  if (nRoundsGap && typeof console !== "undefined" && console.warn)
    console.warn("[generations] " + nRoundsGap + " gun, launcher or battery rows " +
                 "have no ready magazine: " + ROUNDS_ERA_GAPS.join(", "));

  if (typeof console !== "undefined" && console.log)
    console.log("[generations] early warning derived on " + nAew + " airframes, " +
                "armour on " + nArm + " vehicles, penetration on " +
                nPen + " guns, ranges rebuilt, sight raised on " + nSight +
                ", domain scaling on " + nDom + " weapons, decoy ratings on " +
                nDecoy + " hulls, ready rounds on " + nRounds + " batteries, " +
                "jamming on " + nJam + " AEW aircraft");
})();
