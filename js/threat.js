/* ============ threat.js — threat assessment drives the drama ============
   Routine skirmishing should feel routine. A B-2 crossing the line, a Type 055
   arriving off your coast, or a ballistic launch should not. This module
   watches the battle, assigns a threat tier to what it sees, and drives the
   audio bed, the alert cues and the screen effects accordingly.

     tier 0  routine   small arms, scouts, light vehicles      no cue
     tier 1  notable   armour, artillery, strike aircraft      light cue
     tier 2  serious   stealth aircraft, cruisers, heavy raids klaxon + edge flash
     tier 3  strategic B-2, F-22, Type 055, ballistic, nuclear full alert
   ======================================================================= */
var Threat = (function () {

  /* Units whose arrival genuinely changes the battle. Everything else is
     graded from its own statistics rather than hand-listed. */
  const NAMED = {
    sbomber_n: 3, sbomber_p: 3, sbomber_c: 3,       // strategic bombers
    stealth_n: 3, stealth_c: 3, stealth_p: 2,       // F-22 / J-20 / Su-57
    cstealth_n: 3, cstealth_c: 3,                   // F-35C / J-35
    cruiser_c: 3, cruiser_n: 3, cruiser_p: 2,       // Type 055 / Ticonderoga / Slava
    carrier_n: 3, carrier_c: 3, carrier_p: 3,
    awacs_n: 2, awacs_c: 2, awacs_p: 2, awacs_r: 2,
    ew_n: 2, ew_c: 2,
    sub_n: 2, sub_c: 2, sub_p: 2,
  };

  function tierOf(def, id) {
    if (!def) return 0;
    if (NAMED[id] !== undefined) return NAMED[id];
    if (def.superweapon) return 3;
    const cost = def.cost || 0;
    if (def.cat === "naval" && cost >= 2600) return 2;
    if (def.stealth) return 2;
    if (cost >= 2400) return 2;
    if (cost >= 1100) return 1;
    return 0;
  }

  /* ---- runtime state ---- */
  let G = null;
  let seen = {};              // unit id -> time first announced
  let dmgWindow = [];         // recent damage taken, for raid intensity
  let intensity = 0;          // 0..1, drives the audio bed
  let shake = 0, flash = 0, flashColor = "#ff5a3c", banner = null, bannerT = 0;

  function init(game) {
    G = game; seen = {}; dmgWindow = []; intensity = 0;
    awT = { unit: -99, base: -99, loss: -99 };
    awP = { unit: null, base: null, loss: null };
    shake = 0; flash = 0; banner = null; bannerT = 0;
  }

  /* ================= ATTACK WARNING =================
     Rate limits in seconds, and they are the whole design. A base under
     sustained fire is exactly the case that must not machine-gun the alert:
     a tank platoon puts a round into a structure about every 2.5s, so
     anything under ten seconds is a stuttering klaxon rather than a warning.
     These sit ON TOP of the per-cue gaps play() already enforces (6s on
     threat_high, 2.5s on threat_med), and are stricter than both. */
  const AW = { unit: 22, base: 12, loss: 8 };
  let awT = { unit: -99, base: -99, loss: -99 };
  let awP = { unit: null, base: null, loss: null };

  /* WHEN, AND ALSO WHERE. A purely global gate meant that once one unit
     somewhere had taken fire, an attack opening on the far side of the map
     was silent for the next twenty-two seconds - and a second front is
     precisely the thing a warning system exists to announce. A hit more than
     thirty tiles from the last one of its kind is a different battle and
     re-arms the cue at a third of the interval; anything closer is the same
     engagement grinding on, and stays quiet. */
  function gate(kind, x, y, now) {
    const wait = now - awT[kind], p = awP[kind];
    if (wait < AW[kind]) {
      const D = (typeof CFG !== "undefined" ? CFG.TILE : 32) * 30;
      const far = !p || Math.hypot(x - p.x, y - p.y) > D;
      if (!far || wait < AW[kind] / 3) return false;
    }
    awT[kind] = now; awP[kind] = { x: x, y: y };
    return true;
  }

  /* ESCALATION. Three rungs that differ in KIND and not merely in volume, so
     the player can tell them apart with the game window behind another one:

       unit  a cue and nothing else. Being shot at is the job. No banner, no
             edge flash, no shake - a firefight must not stop the player
             reading their own build queue.
       base  fire(2): amber klaxon, edge flash and a banner naming the
             structure. Buildings cannot withdraw, so this rung means "go
             and look now".
       loss  fire(3): the strategic cue, full red flash and screen shake -
             the same treatment a B-2 crossing the line gets. Losing a
             refinery IS a strategic event for a player's economy.

     Everything routes through fire() rather than calling Sfx directly, so
     the banner, the flash, the shake and the mix duck stay in the one place
     that already owns them. */
  /* A barrier is not a base. wall, sandbag, dragonteeth, razorwire and
     tankditch are all cat:"defense" BUILDINGS the player lays by the dozen,
     they are the most-shot structures in the game, and they are expendable by
     design - razor wire dies to one burst and then the next segment takes
     fire. Routed to the `base` rung, a wall line being chewed through fired
     an amber klaxon, an edge flash and a camera shake every twelve seconds
     for as long as the chewing lasted; on the loss rung one dead sandbag got
     the full red flash and maximum shake, which is what a nuclear launch
     gets. threat.js's own first line is "routine skirmishing should feel
     routine".

     armor === "wall" is the discriminator rather than a list of ids, so a
     barrier added later is covered without touching this. A barrier still
     gets its minimap marker - the player should see where the line is being
     cut - it just does not get the klaxon. */
  function isBarrier(e) {
    return !!(e && e.kind === "building" && e.def && e.def.armor === "wall");
  }

  function alertFor(kind, e, now) {
    if (kind === "base" && isBarrier(e)) return;       // marker only
    if (!gate(kind, e.x, e.y, now)) return;
    const nm = (e && e.def && e.def.name ? e.def.name : "UNIT").toUpperCase();
    if (kind === "unit") Sfx.play("under_fire");        // cue only, no drama
    else fire(2, "BASE UNDER ATTACK", nm + " TAKING FIRE");
  }

  /* called from combat whenever the human player loses hit points.
     Several hundred calls a second in a real engagement, so past the window
     push everything here is a compare and one field write. The per-object
     gate lives ON the object - no map, no scan: a squad under machine-gun
     fire is ONE marker on the minimap, not forty. */
  function reportDamage(amount, e, shooter) {
    const now = G ? G.time : 0;
    dmgWindow.push({ t: now, a: amount });
    if (!e || !G) return;
    /* The player's own MLRS landing short, or a nuke of theirs - every
       superweapon sets friendlyFire - is not an attack on them. applyDamage
       knows who fired and nothing else does, which is why the shooter is
       passed in. Without this a fire mission of your own puts amber markers
       and an under_fire cue across your own base. */
    if (shooter && shooter.owner &&
        (shooter.owner === G.human || G.allied(G.human, shooter.owner))) return;
    /* _pingT === undefined, not (e._pingT || -99): at G.time 0 - the first
       tick of a match, and every load of a fresh save - a stored 0 is falsy,
       the fallback fires, and the gate lets every single round through. */
    if (e._pingT !== undefined && now - e._pingT < 3) return;
    e._pingT = now;
    const kind = e.kind === "building" ? "base" : "unit";
    if (G.pingEvent) G.pingEvent(e.x, e.y, kind);
    alertFor(kind, e, now);
  }

  /* a structure of the human player's is gone. game.js is the only caller,
     because it is the only place that knows whether it was destroyed or
     taken. The marker is ALWAYS placed - losing four buildings in a rush
     must leave four crosses on the minimap - and only the audio and the
     banner are rate limited. */
  /* Returns TRUE only when it actually announced the loss with a banner and
     a cue. The caller needs that: with the toast removed from the Threat path
     there is nothing else keeping the log, so a second structure lost inside
     the eight-second gate would go by with no banner AND no line in the alert
     rail. game.js prints a quiet toast - the rail entry without the klaxon -
     whenever this comes back false. */
  function reportLoss(e, taken) {
    if (!G) return false;
    const now = G.time;
    /* A dead barrier is a marker and nothing else, and an ORANGE one: losing
       a segment of razor wire must not paint the red cross that means the
       refinery has gone. */
    if (G.pingEvent) G.pingEvent(e.x, e.y, isBarrier(e) ? "base" : "loss");
    if (isBarrier(e)) return false;
    if (!gate("loss", e.x, e.y, now)) return false;
    const nm = (e && e.def && e.def.name ? e.def.name : "STRUCTURE").toUpperCase();
    /* A machine-gun nest is a serious loss, not a strategic one. The rung is
       graded off what the thing cost to put there. */
    const d = e.def || {};
    const tier = (d.cat === "defense" && (d.cost || 0) < 900) ? 2 : 3;
    fire(tier, nm + (taken ? " CAPTURED" : " LOST"),
         taken ? "ENEMY ENGINEERS INSIDE THE WIRE" : "POSITION MARKED ON MINIMAP");
    return true;
  }

  function fire(tier, text, sub) {
    if (tier >= 3) {
      Sfx.play("threat_high");
      shake = Math.max(shake, 1.0); flash = 1.0; flashColor = "#ff4020";
    } else if (tier === 2) {
      Sfx.play("threat_med");
      shake = Math.max(shake, 0.45); flash = Math.max(flash, 0.6); flashColor = "#ffa02c";
    } else {
      Sfx.play("alarm");
    }
    if (text) { banner = { text, sub: sub || "", tier }; bannerT = tier >= 3 ? 4.2 : 2.8; }
  }

  /* a superweapon or ballistic launch, wherever it came from */
  function reportLaunch(name, mine) {
    Sfx.play("launch_ballistic");
    shake = Math.max(shake, mine ? 0.6 : 1.0);
    flash = 1.0; flashColor = mine ? "#5ac8ff" : "#ff2a18";
    banner = { text: mine ? "LAUNCH — " + name.toUpperCase()
                          : "BALLISTIC LAUNCH DETECTED",
               sub: mine ? "Time of flight running" : name.toUpperCase() + " INBOUND",
               tier: 3 };
    bannerT = 4.6;
  }

  function update(dt) {
    if (!G || !G.human) return;

    /* ---- raid intensity: how hard is the player actually being hit ---- */
    const now = G.time, WIN = 6;
    while (dmgWindow.length && now - dmgWindow[0].t > WIN) dmgWindow.shift();
    let tot = 0;
    for (const d of dmgWindow) tot += d.a;
    /* a couple of rifle sections trading fire is nothing; a battalion attack is not */
    const target = Math.min(1, tot / 2600);
    intensity += (target - intensity) * Math.min(1, dt * 1.5);
    Sfx.setIntensity(intensity);

    /* ---- first sighting of a significant hostile ---- */
    for (const p of G.players) {
      if (p === G.human || G.allied(G.human, p)) continue;
      for (const u of p.units) {
        if (u.dead || u.carried) continue;
        const tier = tierOf(u.def, u.key);
        if (tier < 2) continue;
        if (seen[u.id]) continue;
        if (!G.visibleTo(G.human, u)) continue;
        seen[u.id] = now;
        if (tier >= 3) {
          fire(3, u.def.name.toUpperCase() + " DETECTED",
               (u.def.full || u.def.name) + " — strategic asset in theatre");
          if (u.def.stealth) Sfx.play("stealth_pass");
        } else {
          fire(2, u.def.name.toUpperCase() + " CONTACT", u.def.full || "");
        }
        if (G.pingEvent) G.pingEvent(u.x, u.y, "note");   // already gated on visibleTo
      }
    }

    /* ---- decay screen effects ---- */
    if (shake > 0) shake = Math.max(0, shake - dt * 1.6);
    if (flash > 0) flash = Math.max(0, flash - dt * 1.1);
    if (bannerT > 0) { bannerT -= dt; if (bannerT <= 0) banner = null; }
  }

  return {
    init, update, tierOf, reportDamage, reportLoss, reportLaunch, fire,
    get intensity() { return intensity; },
    get shake() { return shake; },
    get flash() { return flash; },
    get flashColor() { return flashColor; },
    get banner() { return bannerT > 0 ? banner : null; },
  };
})();
