/* ============ subnuke.js - the Ohio's one nuclear Trident ============
   (owner, 2026-11-12) asked for an Ohio to carry ONE nuclear Trident II D5
   on top of its twenty conventional ones, fired on a target the way the
   Strategic Silo fires, and chose this balance rule for it (THE OWNER'S
   DECISION, not a tuning of ours):

     1. ONE NUCLEAR CHARGE PER ARMY. The silo and the Ohio draw on the same
        charge, so an Ohio is a hidden, mobile launch point and NOT an extra
        nuke. Firing from either resets it for both.
     2. An army with no silo: its Ohio holds the charge and runs it up
        itself, at the silo's own charge time (BUILDINGS.nukesilo, 420 s).
     3. The round leaves from the submarine where she is, submerged, as a
        cold launch (combat.js showRound / coldStep), and the opponent gets
        "NUCLEAR LAUNCH DETECTED" exactly as for a silo: the launch IS the
        silo's, game.js G.launchSuperweapon, with the silo's dmg, aoe,
        warhead, flight time, alert and nuke effect.
     4. The Ohio sunk: her charge goes with her - unless a silo holds it.

   Only the US Ohio (a row with `subNuke`, rules.js ssbn_n): not the Vanguard,
   whose Trident is the same missile under a British warhead, and not any
   other boomer. Its conventional magazine (generations.js, "the Ohio's real
   load": twenty Tridents, twenty seconds apart, refilled only at a yard) is
   not touched - the nuclear round is not a mount, it has no cooldown and no
   magazine count, and nothing here reads or writes u.mag or u.cooldowns.
   A side with strategic weapons switched off before the battle
   (p.banned.superweapon) has no nuclear Trident either.

   HOW THE ONE CHARGE IS KEPT. Each silo keeps its own swCharge as it always
   has (entities.js), so a side with silos and no Ohio plays exactly as
   before. p.subNuke is the army's charge as its Ohios see it, set every tick
   (update):
     - a finished nuclear silo standing: p.subNuke is the best silo's
       swCharge, and the Ohio charges nothing of her own. A launch from the
       Ohio spends THAT silo's charge (spend); a launch from the silo zeroes
       its swCharge, which p.subNuke follows the same tick (sync). Several
       silos keep the several charges they always had; the Ohio can fire
       whichever is ready, never one more.
     - no silo: the Ohios hold it - it charges at 1/charge a second, without
       a power grid (the boat carries its own reactor). A silo finished later
       takes it over where it stands (the best silo is raised to it), so the
       charge is never lost or doubled in the hand-over; a silo lost leaves
       it with the Ohios, where it goes on charging.
     - no Ohio and no silo left: it is gone (rule 4). With two Ohios it stays
       while either is afloat, because it is the army's, not one hull's.
   Every Ohio's u.swCharge mirrors p.subNuke, which is what the launch bar
   (ui.js syncSuperweapons), the click-to-launch and the AI read, as they read
   a silo's.

   What the opponent is told. The launch: everything a silo's launch says.
   Before it: nothing. A silo's clock is public (ui.js, "The clock is public;
   the silo is not") because the silo is a structure on the map; an Ohio's
   whole worth is that nobody knows where she is, so an enemy Ohio is never
   on the launch bar and her charge running out is not announced to the other
   side. Her own side is told, as for a silo.

   Load order: after game.js is not needed (everything is read at run time);
   placed after combat.js and before ui.js. ASCII only. */
var SubNuke = (function () {
  "use strict";
  let SW = null;
  /* the silo's own strategic weapon, relabelled for the boat: the same
     charge, dmg, aoe, warhead, flight, alert and nuke flag, by copy so a
     change to the silo's figures carries over */
  function sw() {
    if (SW) return SW;
    const base = (typeof BUILDINGS !== "undefined" && BUILDINGS.nukesilo && BUILDINGS.nukesilo.superweapon) || null;
    if (!base) return null;
    SW = Object.assign({}, base, { label: "NUCLEAR TRIDENT", sub: true });
    return SW;
  }
  /* an Ohio that can fire the army's charge: afloat, ours to command, and
     submerged - she always is (layer "sub"), but a hull aboard or in a well
     is not in the water */
  function holds(e) {
    return !!(e && e.kind === "unit" && !e.dead && e.def && e.def.subNuke &&
              e.layer === "sub" && !e.carried && !(e.owner && e.owner.banned && e.owner.banned.superweapon));
  }
  function silosOf(p) {
    const out = [];
    for (const b of p.buildings)
      if (!b.dead && b.buildProgress >= 1 && b.def.superweapon && b.def.superweapon.nuke) out.push(b);
    return out;
  }
  function subsOf(p) {
    const out = [];
    for (const u of p.units) if (holds(u)) out.push(u);
    return out;
  }
  function bestSilo(silos) {
    let best = null;
    for (const b of silos) if (!best || b.swCharge > best.swCharge) best = b;
    return best;
  }
  /* bring one army's charge up to date: the silo-held mirror, or the
     boat-held clock with dt > 0 */
  function tickArmy(G, p, dt) {
    const S = sw(), subs = subsOf(p);
    if (!S || !subs.length) {
      /* no Ohio: nothing of hers to keep (rule 4; a silo keeps its own) */
      p.subNuke = 0; p.subNukeBySub = false; p.subNukeWarned = false;
      return;
    }
    const silos = silosOf(p);
    if (silos.length) {
      const best = bestSilo(silos);
      /* a silo finished while the boats held the charge takes it over */
      if (p.subNukeBySub && (p.subNuke || 0) > best.swCharge) best.swCharge = Math.min(1, p.subNuke);
      p.subNukeBySub = false;
      p.subNuke = Math.max(0, best.swCharge);
      p.subNukeWarned = p.subNuke >= 1;        // the silo says READY for itself
    } else {
      p.subNukeBySub = true;
      const was = p.subNuke || 0;
      p.subNuke = Math.min(1, was + dt / S.charge);
      if (p.subNuke >= 1 && !p.subNukeWarned) {
        p.subNukeWarned = true;
        if (p === G.human) {
          G.alert(S.label + " READY", "good");
          if (typeof Sfx !== "undefined") { Sfx.play("ready"); Sfx.announce("nuke_ready", subs[0]); }
        }
        /* and nothing to the other side: see the header */
      }
    }
    for (const u of subs) u.swCharge = p.subNuke;
  }
  function update(G, dt) {
    for (const p of G.players) if (!p.defeated) tickArmy(G, p, dt);
  }
  /* the mirror re-read now, without charging: after a launch from a silo */
  function sync(G, p) { if (p) tickArmy(G, p, 0); }
  function ready(e) { return holds(e) && (e.owner.subNuke || 0) >= 1; }
  /* rule 1: the launch spends the army's one charge - the silo's, if a
     silo holds it */
  function spend(G, e) {
    const p = e.owner, silos = silosOf(p);
    if (silos.length) { const b = bestSilo(silos); if (b) b.swCharge = 0; }
    p.subNuke = 0; p.subNukeWarned = false;
    for (const u of subsOf(p)) u.swCharge = 0;
  }
  /* rule 3, the picture: the boat's own Trident, ejected where she lies,
     drawn as the D5 (her conventional round's mount is what names it in
     render3d's ordFor) and gone high over the battle before the warhead,
     which is the silo's deferred strike, comes down */
  function showLaunch(G, e, wx, wy) {
    if (typeof Combat === "undefined" || !Combat.showRound) return null;
    let w = null;
    for (const k of (e.def.weapons || [])) {
      const w2 = WEAPONS[k];
      if (w2 && w2.coldLaunch) { w = w2; break; }
    }
    if (!w) return null;
    /* the water thrown up over the tube as the gas charge fires */
    Combat.addEffect({ t: "boom", x: e.x, y: e.y, r: 6, life: 0.6, max: 0.6, water: true });
    return Combat.showRound(G, e, w, wx, wy, 5);
  }
  return { sw, holds, ready, spend, update, sync, showLaunch, silosOf, subsOf };
})();
