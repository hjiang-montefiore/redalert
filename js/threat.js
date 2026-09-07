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
    shake = 0; flash = 0; banner = null; bannerT = 0;
  }

  /* called from combat whenever the human player loses hit points */
  function reportDamage(amount) { dmgWindow.push({ t: G ? G.time : 0, a: amount }); }

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
        if (G.pingEvent) G.pingEvent(u.x, u.y);
      }
    }

    /* ---- decay screen effects ---- */
    if (shake > 0) shake = Math.max(0, shake - dt * 1.6);
    if (flash > 0) flash = Math.max(0, flash - dt * 1.1);
    if (bannerT > 0) { bannerT -= dt; if (bannerT <= 0) banner = null; }
  }

  return {
    init, update, tierOf, reportDamage, reportLaunch, fire,
    get intensity() { return intensity; },
    get shake() { return shake; },
    get flash() { return flash; },
    get flashColor() { return flashColor; },
    get banner() { return bannerT > 0 ? banner : null; },
  };
})();
