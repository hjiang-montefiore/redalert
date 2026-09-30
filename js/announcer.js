/* ============ announcer.js - the base's voice ============

   (owner) "we want more audio effect like if we cannot deploy or buid or have
   low power then we should have a clear female voice. you can use red alert 2
   as the example"

   Red Alert 2's EVA is the model: one calm, clipped female voice that says
   what the BASE is doing - construction complete, unit ready, low power,
   insufficient funds, cannot deploy here, our base is under attack - so a
   commander can keep their eyes on the fight and still know the queue, the
   grid and the perimeter. This game said all of that in text on the alert
   rail, under one alarm klaxon that sounds the same for every refusal there
   is, and some of it it said nowhere at all: measured at HEAD, the grid
   dropping below demand, the grid coming back, a build cancelled, a queue
   stopped because its factory went, a dome's radar picture going dark and
   coming back, a repair started and the end of the battle made no sound and
   put no line on the rail (the minimap's "LOW POWER" label was the only
   sign the grid had failed).

   HOW IT SPEAKS. ZERO ASSET FILES is a hard rule, so there is no recorded
   voice to play. window.speechSynthesis is the only way to get real words
   into this project - js/audio.js already uses it for the crews' answers -
   and it sits outside the Web Audio graph, so it is volume-matched by hand
   against the player's volume (Sfx.voiceLevel) and falls silent with
   everything else on mute. Speech cannot be filtered either, so EVA's radio
   character comes from a short synthesised key-up chirp IN the graph
   (Sfx.chirp, the `eva` cue) laid in front of every line.

   A CLEAR FEMALE VOICE. The API has no gender field. It does give every
   voice a NAME, and the English voices each platform ships are few and well
   known, so the announcer walks a list of known female voices - macOS
   Samantha, Ava, Allison, Susan, Victoria, Karen, Moira, Tessa, Fiona,
   Serena; Windows Zira, Aria, Jenny, Hazel, Susan; Chrome's Google US English
   and Google UK English Female - and prefers a Premium, Enhanced or Natural
   build of the one it finds. A machine with none of them gets its best
   English voice that is not a known male one, at a slightly raised pitch.
   The crews keep a voice of their own: a known male voice where there is
   one, and never the announcer's while there is any other, so a click on a
   tank never sounds like the base talking.

   ONE CHANNEL, TWO SPEAKERS. speechSynthesis is one queue per page, and the
   crews' voice used to cancel() it before every line - so anything the base
   said would have been cut off by a unit answering a click. Everything that
   speaks now goes through the arbiter below:
     - four tiers: critical (a launch detected, the base under attack, low
       power, the rig clock, the end of the battle), normal (construction
       complete, unit ready, insufficient funds, cannot deploy...), low
       (building, training, on hold, cancelled, sold, repairing) and, lowest,
       the crews' acknowledgements;
     - a cooldown per line, so nothing nags: the base under attack at most
       every 20 s, insufficient funds every 6 s, a unit lost every 8 s - held
       only by a line that was actually said: one dropped from the queue
       unsaid gives its cooldown back;
     - a short queue, highest tier first, that drops a line once it is too
       old to be news ("insufficient funds" three seconds late is noise);
     - a crew's answer never cuts off the base. It waits for her to finish -
       a second at most, then it is stale and dropped - and a newer answer
       still replaces an older one, as before;
     - a critical line interrupts anything below it. A refusal - the answer
       to something the player just tried: cannot deploy, cannot build,
       insufficient funds - cuts in over the low echoes and a crew's answer,
       never over news of the same weight or more.
   The alert rail's klaxon asks justSaid() before it sounds: when the line
   for the same event went out at once, the words are the announcement; when
   it had to wait, or was not said at all, the klaxon sounds as it always
   did, so a refusal is never left with neither.

   WHO IT SPEAKS TO. The player, and only about what the player's side could
   know. Every event site passes the side the news belongs to, and a line for
   any other side is dropped here - a commander's production, losses and
   silos are never read out - and a match with no human seat (two commanders
   fighting it out) is silent. The one enemy event it reports on its own is a
   strategic launch, and game.js only asks for that where the player's own
   early-warning array, radar or eyes would have seen it (G.launchSeen).

   EVERY HOOK IS AN EXPLICIT CALL at the event, not a reading of alert text,
   so rewording a message on the rail can never silence the voice:
     player.js    enqueue: building / training / researching; cancel:
                  cancelled; onProduced: construction complete, upgrade
                  complete, new construction options, unit ready, unit
                  trained, aircraft ready, vessel launched; updateQueues:
                  production on hold (its factory gone), insufficient funds
                  (production stalled for money); era step: re-equipment
                  complete; fuel convoy arrived
     game.js      pack-up refused / packing / packed; structure captured
                  (either way); structure sold; structure lost; unit and ore
                  hauler lost; deck aircraft craned aboard / flying out;
                  strategic launch (ours, and theirs where seen); the last
                  production facility, the rig clock and its 30 s warning;
                  victory and defeat; the watcher below, once a tick; and
                  G.init, which starts her fresh for a new battle or a save
                  loaded over this one
     threat.js    our base under attack, ore hauler under attack
     entities.js  our silo ready, an enemy silo armed, silos needed; a field
                  engineer's emplacement refused (funds, or the ground)
     ui.js        a refused card, era step, fire-support card, fuel lot or
                  deck airframe ("refused": the rule's own reason decides
                  between insufficient funds, insufficient fuel and unable to
                  comply); cannot build there (placement), cannot deploy here
                  (a rig), silo not ready, repairing, an enemy silo thirty
                  seconds out
     here         low power / power restored, radar online / offline - the
                  grid and the dome change state from a dozen places (a
                  plant finished, sold, captured, destroyed; a load
                  completed; a dome switched off), so watch() reads the state
                  the minimap already draws, and speaks when it changes.
   ========================================================================= */

var Announcer = (function () {
  "use strict";

  var CRIT = 3, NORM = 2, LOW = 1, CREW = 0;

  /* ------------------------------------------------------------ the lines
     t      what she says. Short and generic where Red Alert 2 set the
            phrase everyone knows (Construction complete, Unit ready, Low
            power, Insufficient funds, Cannot deploy here, Our base is under
            attack, Building, Training, On hold, Cancelled...); the game's
            own words everywhere else, matched to what the alert rail says.
            {n} is a number the event site passes.
     p      tier
     cd     seconds before the same line (or its group g) may be said again
     stale  seconds a queued line stays news; older, it is dropped unsaid
     over   the highest tier this line may cut in over: every critical line
            over NORM; a refusal (R) over LOW - it answers what the player
            just did, and the echo of their last click or a crew's answer
            is worth less than hearing why this one failed */
  var R = LOW;
  var LINES = {
    /* critical */
    nuke_detected:      { t: "Warning. Nuclear launch detected.",              p: CRIT, cd: 8,  stale: 10 },
    missile_detected:   { t: "Warning. Missile launch detected.",              p: CRIT, cd: 8,  stale: 8 },
    base_attack:        { t: "Our base is under attack.",                      p: CRIT, cd: 20, stale: 6 },
    low_power:          { t: "Low power.",                                     p: CRIT, cd: 10, stale: 8 },
    rig_clock:          { t: "All production lost. Unfold a construction rig within {n} seconds.", p: CRIT, cd: 5, stale: 10 },
    rig_30:             { t: "{n} seconds to unfold a construction rig.",      p: CRIT, cd: 5,  stale: 6 },
    victory:            { t: "Victory. The field is ours.",                    p: CRIT, cd: 0,  stale: 20, g: "end" },
    defeat:             { t: "The battle is lost.",                            p: CRIT, cd: 0,  stale: 20, g: "end" },
    /* normal */
    construction_complete: { t: "Construction complete.",                      p: NORM, cd: 1.5, stale: 8 },
    upgrade_complete:   { t: "Upgrade complete.",                              p: NORM, cd: 1.5, stale: 8 },
    tech_up:            { t: "New construction options.",                      p: NORM, cd: 2,  stale: 8 },
    reequipped:         { t: "Re-equipment complete.",                         p: NORM, cd: 2,  stale: 8 },
    unit_ready:         { t: "Unit ready.",                                    p: NORM, cd: 2.5, stale: 5 },
    unit_trained:       { t: "Unit trained.",                                  p: NORM, cd: 2.5, stale: 5 },
    aircraft_ready:     { t: "Aircraft ready.",                                p: NORM, cd: 2.5, stale: 5 },
    vessel_ready:       { t: "Vessel launched.",                               p: NORM, cd: 2.5, stale: 5 },
    insufficient_funds: { t: "Insufficient funds.",                            p: NORM, cd: 6,  stale: 3,   over: R },
    insufficient_fuel:  { t: "Insufficient fuel.",                             p: NORM, cd: 6,  stale: 3,   over: R },
    unable:             { t: "Unable to comply.",                              p: NORM, cd: 3,  stale: 2,   over: R },
    cannot_deploy:      { t: "Cannot deploy here.",                            p: NORM, cd: 3,  stale: 2.5, over: R },
    cannot_build:       { t: "Cannot build there.",                            p: NORM, cd: 2,  stale: 2,   over: R },
    cannot_pack:        { t: "Cannot pack up.",                                p: NORM, cd: 3,  stale: 2.5, over: R },
    silo_not_ready:     { t: "Silo not ready.",                                p: NORM, cd: 3,  stale: 2,   over: R },
    power_restored:     { t: "Power restored.",                                p: NORM, cd: 4,  stale: 5 },
    radar_online:       { t: "Radar online.",                                  p: NORM, cd: 3,  stale: 6 },
    radar_offline:      { t: "Radar offline.",                                 p: NORM, cd: 3,  stale: 6 },
    hauler_attack:      { t: "Ore hauler under attack.",                       p: NORM, cd: 20, stale: 5 },
    unit_lost:          { t: "Unit lost.",                                     p: NORM, cd: 8,  stale: 4 },
    hauler_lost:        { t: "Ore hauler lost.",                               p: NORM, cd: 8,  stale: 5 },
    structure_lost:     { t: "Structure lost.",                                p: NORM, cd: 6,  stale: 5 },
    structure_captured: { t: "Structure captured by the enemy.",               p: NORM, cd: 6,  stale: 6 },
    enemy_captured:     { t: "Enemy structure captured.",                      p: NORM, cd: 3,  stale: 5 },
    yard_packing:       { t: "Construction yard packing up.",                  p: NORM, cd: 3,  stale: 5 },
    yard_packed:        { t: "Construction rig ready to move.",                p: NORM, cd: 3,  stale: 5 },
    rig_clock_packed:   { t: "Rig clock running. {n} seconds to unfold.",      p: NORM, cd: 5,  stale: 8 },
    last_facility:      { t: "Warning. Last production facility.",             p: NORM, cd: 10, stale: 8 },
    nuke_ready:         { t: "Nuclear missile ready.",                         p: NORM, cd: 5,  stale: 10 },
    missile_ready:      { t: "Ballistic missile ready.",                       p: NORM, cd: 5,  stale: 10 },
    nuke_launched:      { t: "Nuclear missile launched.",                      p: NORM, cd: 5,  stale: 8 },
    missile_launched:   { t: "Missile launched.",                              p: NORM, cd: 5,  stale: 8 },
    enemy_nuke_armed:   { t: "Warning. Enemy nuclear missile armed.",          p: NORM, cd: 10, stale: 10 },
    enemy_missile_armed:{ t: "Warning. Enemy ballistic missile armed.",        p: NORM, cd: 10, stale: 10 },
    enemy_nuke_30:      { t: "Enemy nuclear missile ready in {n} seconds.",    p: NORM, cd: 10, stale: 6 },
    enemy_missile_30:   { t: "Enemy ballistic missile ready in {n} seconds.",  p: NORM, cd: 10, stale: 6 },
    silos_needed:       { t: "Silos needed.",                                  p: NORM, cd: 12, stale: 5 },
    deck_craned:        { t: "Aircraft craned aboard.",                        p: NORM, cd: 3,  stale: 6 },
    deck_flyout:        { t: "Aircraft flying out to the deck.",               p: NORM, cd: 3,  stale: 6 },
    /* up to four lots can be on the road at once and they land seconds
       apart; one line covers the lot of them */
    fuel_arrived:       { t: "Fuel convoy arrived.",                           p: NORM, cd: 20, stale: 6 },
    /* low: the echo of the player's own click, and a queue left waiting */
    on_hold:            { t: "Production on hold.",                            p: LOW, cd: 4,  stale: 4 },
    building:           { t: "Building.",                                      p: LOW, cd: 1.2, stale: 2, g: "start" },
    training:           { t: "Training.",                                      p: LOW, cd: 1.2, stale: 2, g: "start" },
    researching:        { t: "Researching.",                                   p: LOW, cd: 1.2, stale: 2, g: "start" },
    cancelled:          { t: "Cancelled.",                                     p: LOW, cd: 1,  stale: 2 },
    structure_sold:     { t: "Structure sold.",                                p: LOW, cd: 1.5, stale: 3 },
    repairing:          { t: "Repairing.",                                     p: LOW, cd: 1.5, stale: 3 },
    announcer_on:       { t: "Announcer online.",                              p: LOW, cd: 1,  stale: 2 },
  };

  /* A refused order, in the words of the rule that refused it. The sites
     that call this hold the rule's own verdict - Player.lockReason,
     eraLockReason, fuelQuote, G.supportReady, G.orderDeckAircraft - and a
     verdict is one of a few dozen reasons, all but two of which mean "not
     now, not like that". Those two - money and fuel - are the ones the
     player can do something about at once, so they get their own words;
     everything else is "Unable to comply". A reason reworded tomorrow can
     only fall back to that line, never to silence. */
  function refusal(why) {
    var s = String(why || "");
    if (/\bFUNDS\b/i.test(s)) return "insufficient_funds";
    if (/\bFUEL\b/i.test(s)) return "insufficient_fuel";
    return "unable";
  }

  /* ------------------------------------------------------------- delivery
     EVA is calm and clipped: a real female voice at its own pitch (pushing a
     natural voice's pitch around is what makes synthesis sound synthetic),
     a touch quicker than conversational so a line is over before the next
     event, at full volume against the player's setting - the words have to
     carry over a battle the Web Audio graph is not ducking for them. Only a
     voice picked as a fallback, whose gender is unknown, is lifted. */
  var EVA_RATE = 1.06, EVA_PITCH = 1.0, EVA_PITCH_FALLBACK = 1.12, EVA_GAIN = 1.0;
  var MAXQ = 4;               // lines waiting; a fifth pushes out the least urgent
  /* How long a crew's answer waits for her to finish. Her lines run a
     second or two, so a click in the second half of one is still answered;
     an answer later than this no longer reads as the answer to that click. */
  var CREW_WAIT = 1.0;

  /* known female English voices, in order of preference */
  var EVA_NAMES = [
    /^samantha\b/i, /^ava\b/i, /^allison\b/i, /^susan\b/i,
    /\bzira\b/i, /\baria\b/i, /\bjenny\b/i, /^google us english$/i,
    /^serena\b/i, /^google uk english female$/i, /\bhazel\b/i, /\bsusan\b/i,
    /\bsonia\b/i, /\blibby\b/i,
    /^victoria\b/i, /^karen\b/i, /^moira\b/i, /^tessa\b/i, /^fiona\b/i,
  ];
  /* known male English voices: the crews' first choice, and never EVA's */
  var CREW_NAMES = [
    /^daniel\b/i, /^alex$/i, /^tom\b/i, /^aaron\b/i, /^arthur\b/i, /^oliver\b/i,
    /^gordon\b/i, /^evan\b/i, /^nathan\b/i, /^rishi\b/i, /^fred$/i, /^lee\b/i,
    /\bdavid\b/i, /\bmark\b/i, /\bgeorge\b/i, /\bguy\b/i, /\bryan\b/i,
    /\bchristopher\b/i, /\beric\b/i, /\bbrian\b/i, /\bthomas\b/i, /\bjames\b/i,
    /^google uk english male$/i,
  ];
  /* macOS ships a row of joke and Eloquence voices; none of them is a voice
     to run a base with */
  var NOVELTY = /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|kathy|princess|eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley)\b/i;
  var QUALITY = /premium|enhanced|natural|neural/i;

  function named(v, list) {
    var nm = (v && v.name) || "";
    for (var k = 0; k < list.length; k++) if (list[k].test(nm)) return k;
    return -1;
  }
  function english(v) { return !!v && /^en([-_]|$)/i.test(v.lang || ""); }

  /* Pure: which voice of `vs` speaks for `role` ("eva" or "crew"), never
     `avoid`. Returns { voice, named } - named false means a fallback whose
     gender nobody knows. */
  function chooseVoice(vs, role, avoid) {
    vs = vs || [];
    var mine = role === "eva" ? EVA_NAMES : CREW_NAMES;
    var theirs = role === "eva" ? CREW_NAMES : EVA_NAMES;
    var best = null, bs = Infinity, i, v, k, s;
    for (i = 0; i < vs.length; i++) {
      v = vs[i];
      if (!english(v) || v === avoid || NOVELTY.test(v.name || "")) continue;
      k = named(v, mine);
      if (k < 0) continue;
      /* a Premium, Enhanced or Natural build is worth a place and a half on
         the list: Edge's Aria (Natural) over the older Zira, macOS's Ava
         (Premium) over a plain Samantha - and the plain voice of the same
         name always loses to its better build */
      s = k * 2 - (QUALITY.test(v.name || "") ? 3 : 0);
      if (s < bs) { bs = s; best = v; }
    }
    if (best) return { voice: best, named: true };
    /* no known voice: the best English one that is not known to be the
       other kind - a better build first, then US or British English, then
       the engine's own default */
    for (i = 0; i < vs.length; i++) {
      v = vs[i];
      if (!english(v) || v === avoid || NOVELTY.test(v.name || "") || named(v, theirs) >= 0) continue;
      s = (QUALITY.test(v.name || "") ? 0 : 4) + (/^en[-_](us|gb)/i.test(v.lang || "") ? 0 : 2) + (v["default"] ? 0 : 1);
      if (s < bs) { bs = s; best = v; }
    }
    if (best) return { voice: best, named: false };
    /* a crew that finds nothing else shares her voice, and is told apart by
       pitch and rate (unit()); EVA with no English voice at all takes the
       engine's first */
    if (role === "crew") return { voice: avoid || null, named: false };
    for (i = 0; i < vs.length; i++) if (vs[i] && !NOVELTY.test(vs[i].name || "")) return { voice: vs[i], named: false };
    return { voice: vs[0] || null, named: false };
  }

  /* getVoices() is empty until the engine has loaded its list, which is
     asynchronous in every browser - and Chrome adds its network voices
     later still - so the choice is made again whenever the list changes. */
  var vc = { n: -1, eva: null, evaNamed: false, crew: null };
  function voices(syn) {
    var vs = [];
    try { vs = syn.getVoices() || []; } catch (e) { vs = []; }
    if (vs.length !== vc.n) {
      vc.n = vs.length;
      var e = chooseVoice(vs, "eva", null);
      vc.eva = e.voice; vc.evaNamed = e.named;
      vc.crew = chooseVoice(vs, "crew", vc.eva).voice;
    }
    return vc;
  }

  /* ------------------------------------------------------------ plumbing */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  var clock = null;
  function now() {
    if (clock) return clock();
    return (typeof performance !== "undefined" && performance.now)
      ? performance.now() / 1000 : Date.now() / 1000;
  }
  function synth() {
    if (typeof window === "undefined") return null;
    var s = window.speechSynthesis;
    return (s && typeof s.speak === "function" && window.SpeechSynthesisUtterance) ? s : null;
  }
  /* the player's volume, and 0 on mute. Sfx is absent on a page without
     js/audio.js, and a no-op stand-in under the jsc runner; either way the
     words go out at full level rather than not at all. */
  function level() {
    try {
      if (typeof Sfx !== "undefined" && Sfx && typeof Sfx.voiceLevel === "function") {
        var v = Sfx.voiceLevel();
        if (typeof v === "number" && isFinite(v)) return clamp(v, 0, 1);
      }
    } catch (e) {}
    return 1;
  }
  /* the key-up chirp; the seconds to hold the words for it, 0 when it did
     not sound (no live audio context, or a page without js/audio.js) */
  function chirp() {
    try {
      if (typeof Sfx !== "undefined" && Sfx && typeof Sfx.chirp === "function") {
        var d = Sfx.chirp();
        if (typeof d === "number" && d > 0) return Math.min(d, 0.3);
      }
    } catch (e) {}
    return 0;
  }
  /* A line for the side `who` stands for - a Player, or a unit or structure
     whose owner it is. Nothing passed means a click of the player's own. */
  function forPlayer(who) {
    var G = (typeof Game !== "undefined") ? Game : null, me = G && G.human;
    if (me && me.isAI) return false;              // a match with nobody at the keyboard
    if (!who) return true;
    var p = (who.kind === "unit" || who.kind === "building") ? who.owner : who;
    if (!p) return false;
    if (p.isAI === true) return false;            // a commander's news is not ours
    if (me && p !== me) return false;
    return true;
  }
  function fill(t, arg) {
    return t.indexOf("{n}") < 0 ? t : t.replace("{n}", String(arg === undefined || arg === null ? "" : arg));
  }
  /* words a second, roughly, at rate 1 - how long a line may hold the
     channel if the engine never reports its end */
  function estimate(text, rate) {
    var w = String(text).split(/\s+/).length;
    return 0.45 + w * 0.36 / (rate || 1);
  }

  /* ------------------------------------------------------------ the arbiter */
  var on = true;
  var cur = null;             // { item, t0, est, done, u, timer }
  var queue = [];             // lines waiting, highest tier first
  var last = {};              // cooldown group -> when last accepted
  /* the most recent say(): when, and whether its words went out at once -
     what the alert rail's klaxon asks about (justSaid) */
  var took = { t: -Infinity, now: false };
  var journal = [];           // the last few decisions, for the suites and a curious developer
  function note(key, text, how) {
    journal.push({ key: key, text: text, how: how, t: now() });
    if (journal.length > 40) journal.shift();
  }
  /* A line leaves the queue unsaid: stale, pushed out, hushed. Its cooldown
     was taken when it was accepted, to stop a flood of the same news piling
     up behind it; nobody heard it, so the next one may be said. */
  function drop(item, how) {
    note(item.key, item.text, how);
    if (item.g && last[item.g] === item.at) {
      if (item.prev === undefined) delete last[item.g]; else last[item.g] = item.prev;
    }
  }

  function busy(syn, t) {
    if (!cur || cur.done) return false;
    /* An engine that never reports the end of a line must not hold the
       channel for ever: Chrome drops onend for an utterance it has garbage-
       collected (which is why cur keeps the utterance), and some engines
       drop it after cancel(). A line is over when its time is up, or when
       the engine says it is idle once the line has had time to begin. */
    var el = t - cur.t0;
    if (el > cur.est + 1.5) { cur.done = true; return false; }
    if (syn && cur.u && typeof syn.speaking === "boolean" && !syn.speaking && !syn.pending &&
        el > cur.lead + 0.6) { cur.done = true; return false; }
    return true;
  }

  function utter(text, voice, pitch, rate, vol) {
    var u = new window.SpeechSynthesisUtterance(text);
    if (voice) { u.voice = voice; if (voice.lang) u.lang = voice.lang; }
    u.pitch = pitch; u.rate = rate; u.volume = clamp(vol, 0, 1);
    return u;
  }

  function start(item, syn) {
    var lead = item.p > CREW ? chirp() : 0;
    var c = cur = { item: item, t0: now(), est: estimate(item.text, item.rate) + lead, lead: lead,
                    done: false, u: null, timer: 0 };
    var go = function () {
      c.timer = 0;
      if (cur !== c || c.done) return;            // interrupted during the chirp
      var u;
      try { u = utter(item.text, item.voice, item.pitch, item.rate, item.vol); }
      catch (e) { c.done = true; return; }
      c.u = u;
      u.onend = u.onerror = function () { if (cur === c && !c.done) { c.done = true; pump(); } };
      try { syn.speak(u); } catch (e) { c.done = true; }
    };
    if (lead > 0 && typeof setTimeout === "function") c.timer = setTimeout(go, lead * 1000);
    else go();
    note(item.key, item.text, "spoke");
  }
  /* the base's own lines take her voice at the moment they are spoken, so a
     voice list that arrives late is used as soon as it does */
  function dress(item, syn, lvl) {
    var v = voices(syn);
    item.voice = v.eva; item.rate = EVA_RATE;
    item.pitch = v.evaNamed ? EVA_PITCH : EVA_PITCH_FALLBACK;
    item.vol = lvl * EVA_GAIN;
    return item;
  }
  function interrupt(syn) {
    var c = cur;
    cur = null;                                   // first, so the cancelled line's onend is ignored
    if (c) { c.done = true; if (c.timer && typeof clearTimeout === "function") clearTimeout(c.timer); }
    try { syn.cancel(); } catch (e) {}
  }
  function enqueue(item) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].key !== item.key) continue;
      /* the same news twice is one line; a crew's newer answer replaces the older */
      if (item.p > CREW) return false;
      drop(queue[i], "dropped:replaced"); queue.splice(i, 1); break;
    }
    queue.push(item);
    queue.sort(function (a, b) { return b.p - a.p || a.at - b.at; });
    while (queue.length > MAXQ) { var d = queue.pop(); drop(d, "dropped:full"); if (d === item) return false; }
    return true;
  }
  function pump() {
    var syn = synth();
    if (!syn) { while (queue.length) drop(queue.shift(), "dropped:no engine"); return; }
    var t = now();
    if (busy(syn, t)) return;
    while (queue.length) {
      var it = queue.shift();
      if (t - it.at > it.stale) { drop(it, "dropped:stale"); continue; }
      var lvl = level();
      if (lvl <= 0) { drop(it, "dropped:muted"); continue; }
      /* the switch is the announcer's; a crew's answer waiting behind her
         line is not hers to silence */
      if (it.p > CREW) { if (!on) { drop(it, "dropped:off"); continue; } dress(it, syn, lvl); }
      start(it, syn);
      return;
    }
  }

  /* The base speaks. Returns the words if they were said or queued, null if
     the line was dropped (off, muted, on cooldown, not the player's news, or
     no speech engine). `key` "refused" is a refused order: `arg` is the
     rule's reason, and refusal() picks the line. */
  function say(key, who, arg) {
    if (key === "refused") { key = refusal(arg); arg = undefined; }
    var L = LINES[key];
    if (!L) return null;
    var t = now();
    took = { t: t, now: false };
    if (!on) return null;
    if (!forPlayer(who)) return null;
    var syn = synth();
    if (!syn) return null;
    var lvl = level();
    if (lvl <= 0) return null;
    var g = L.g || key, text = fill(L.t, arg);
    if (last[g] !== undefined && t - last[g] < L.cd && t >= last[g]) { note(key, text, "dropped:cooldown"); return null; }
    var over = L.over !== undefined ? L.over : L.p === CRIT ? NORM : -1;
    var item = { key: key, text: text, p: L.p, at: t, stale: L.stale, g: g, prev: last[g] };
    pump();
    if (!busy(syn, t)) { start(dress(item, syn, lvl), syn); took.now = true; }
    /* a critical line cuts in over anything less urgent, a refusal over an
       echo or a crew's answer; nothing cuts in over its own weight */
    else if (cur.item.p <= over && cur.item.p < item.p) {
      interrupt(syn); start(dress(item, syn, lvl), syn); took.now = true;
    }
    else if (enqueue(item)) note(key, text, "queued");
    else return null;
    last[g] = t;
    return text;
  }

  /* A crew's answer (js/audio.js vox()). It never talks over the base: while
     she is speaking, or has a line waiting, the answer waits its turn behind
     hers and is dropped unsaid once it is CREW_WAIT old. With the channel
     holding only another crew's answer, the newer one replaces it at once. */
  function unit(line, pitch, rate, vol) {
    var syn = synth();
    if (!syn || !line) return false;
    var t = now();
    pump();
    var v = voices(syn);
    var p = typeof pitch === "number" ? pitch : 1, r = typeof rate === "number" ? rate : 1;
    /* one voice on the machine for both: the crews go lower and quicker */
    if (v.crew && v.crew === v.eva) { p = Math.min(p, 0.95) * 0.86; r *= 1.06; }
    var item = { key: "crew", text: line, p: CREW, at: t, stale: CREW_WAIT,
                 voice: v.crew, pitch: p, rate: r, vol: typeof vol === "number" ? vol : level() * 0.85 };
    if ((busy(syn, t) && cur.item.p > CREW) || queue.length) {
      if (!enqueue(item)) return false;           // her queue is full: the answer is the first to go
      note("crew", line, "waiting");
      return true;
    }
    if (cur && !cur.done) interrupt(syn);
    start(item, syn);
    return true;
  }

  function hush() {
    while (queue.length) drop(queue.shift(), "dropped:hushed");
    var syn = synth();
    if (syn && cur && !cur.done) interrupt(syn);
    else cur = null;
  }
  /* the announcer switched off: her line in progress and her lines waiting,
     and nothing of the crews' - that switch is hers */
  function hushBase() {
    for (var i = queue.length - 1; i >= 0; i--) if (queue[i].p > CREW) drop(queue.splice(i, 1)[0], "dropped:off");
    var syn = synth();
    if (syn && cur && !cur.done && cur.item.p > CREW) interrupt(syn);
  }
  /* the crews switched off: their line in progress, and any answer waiting */
  function hushUnits() {
    for (var i = queue.length - 1; i >= 0; i--) if (queue[i].p === CREW) drop(queue.splice(i, 1)[0], "dropped:hushed");
    var syn = synth();
    if (syn && cur && !cur.done && cur.item.p === CREW) interrupt(syn);
  }
  /* Did the most recent line the base was asked for go out at once, within
     `win` seconds? Every event site asks her BEFORE it puts its "bad" line on
     the rail, so this is that same event: its words are being said, and a
     klaxon under them would only bury them. A line that had to queue - it
     may yet go stale - or one she did not take at all (off, muted, on
     cooldown) answers false, and the klaxon sounds as it always did. */
  function justSaid(win) { return took.now && now() - took.t < (win || 0.05); }

  /* ------------------------------------------------------------ the watcher
     The grid and the dome, read the way the minimap reads them (render.js
     drawMinimap: a dome built, a full grid, and on the air) and announced
     when they change. The first look at a match only records. */
  var wT = -Infinity, wPow = null, wRad = null;
  function watch(G, force) {
    if (!G || !G.human) return;
    if (queue.length) pump();
    var t = G.time;
    if (t < wT) { wPow = null; wRad = null; }   // a new match, or a save loaded over this one
    if (!force && t >= wT && t - wT < 0.25) return;
    wT = t;
    var P = G.human;
    if (P.isAI || P.defeated) return;
    var low = P.powerRatio() < 1;
    if (wPow !== null && low !== wPow) say(low ? "low_power" : "power_restored", P);
    wPow = low;
    var up = P.hasBuilding("radar") && !low && (!G.domeLit || G.domeLit(P));
    if (wRad !== null && up !== wRad) say(up ? "radar_online" : "radar_offline", P);
    wRad = up;
  }

  /* ------------------------------------------------------------ settings
     Sound, the crews' voices and the announcer, each on its own switch,
     kept in this browser: the menu's Sound block sets them before a battle
     (main.js) and the pause menu flips them in one. */
  var PREF_KEY = "ironfront.sound";
  var prefs = { sfx: true, vol: 1, vox: true, eva: true };
  function loadPrefs() {
    try {
      var s = (typeof localStorage !== "undefined") ? localStorage.getItem(PREF_KEY) : null;
      if (!s) return;
      var o = JSON.parse(s);
      if (typeof o.sfx === "boolean") prefs.sfx = o.sfx;
      if (typeof o.vol === "number" && o.vol > 0 && o.vol <= 1) prefs.vol = o.vol;
      if (typeof o.vox === "boolean") prefs.vox = o.vox;
      if (typeof o.eva === "boolean") prefs.eva = o.eva;
    } catch (e) {}
  }
  function savePrefs() {
    try { if (typeof localStorage !== "undefined") localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch (e) {}
  }
  function applyPrefs() {
    on = !!prefs.eva;
    if (!on) hushBase();
    try {
      if (typeof Sfx !== "undefined" && Sfx && typeof Sfx.setEnabled === "function") {
        Sfx.volume(prefs.vol);
        Sfx.setEnabled(prefs.sfx);
        Sfx.voxEnabled(prefs.vox);
      }
    } catch (e) {}
    syncButtons();
  }
  function setPrefs(p, keep) {
    p = p || {};
    if (typeof p.sfx === "boolean") prefs.sfx = p.sfx;
    if (typeof p.vol === "number" && p.vol > 0 && p.vol <= 1) prefs.vol = p.vol;
    if (typeof p.vox === "boolean") prefs.vox = p.vox;
    if (typeof p.eva === "boolean") prefs.eva = p.eva;
    applyPrefs();
    if (keep !== false) savePrefs();
    return getPrefs();
  }
  function getPrefs() { return { sfx: prefs.sfx, vol: prefs.vol, vox: prefs.vox, eva: prefs.eva }; }
  /* the pause menu's three switches, where the page has them */
  var BTN = [["pm-snd", "sfx", "SOUND"], ["pm-vox", "vox", "VOICES"], ["pm-eva", "eva", "ANNOUNCER"]];
  function syncButtons() {
    if (typeof document === "undefined" || !document.getElementById) return;
    for (var i = 0; i < BTN.length; i++) {
      var el = document.getElementById(BTN[i][0]);
      if (!el) continue;
      var v = !!prefs[BTN[i][1]];
      el.textContent = BTN[i][2] + (v ? " ON" : " OFF");
      if (el.classList) el.classList.toggle("off", !v);
    }
  }
  function bindButtons() {
    if (typeof document === "undefined" || !document.getElementById) return;
    BTN.forEach(function (b) {
      var el = document.getElementById(b[0]);
      if (!el) return;
      el.onclick = function () {
        var p = {}; p[b[1]] = !prefs[b[1]];
        setPrefs(p);
        /* switched back on: she says so, so the player hears it working */
        if (b[1] === "eva" && prefs.eva) say("announcer_on");
      };
    });
    syncButtons();
  }

  function reset() {
    var syn = synth();
    if (syn && cur && !cur.done) interrupt(syn);
    cur = null; queue.length = 0; last = {}; took = { t: -Infinity, now: false }; journal.length = 0;
    wT = -Infinity; wPow = null; wRad = null;
    vc = { n: -1, eva: null, evaNamed: false, crew: null };
  }

  /* the switches as the player last left them, applied as the page loads.
     Under the jsc runner Sfx does not exist yet at this point (the runner
     stands its no-op in after every script), and applyPrefs skips it. */
  loadPrefs();
  applyPrefs();
  try {
    if (typeof document !== "undefined" && document.readyState === "loading" && document.addEventListener)
      document.addEventListener("DOMContentLoaded", bindButtons);
    else bindButtons();
  } catch (e) {}
  /* A list that loads late re-chooses both voices at once. And ask for it
     now: Chrome only starts loading its voices on the first getVoices(), so
     a list first asked for by the first line of the battle is still empty
     when that line goes out, in the engine's default voice - which on
     Windows is David. Asked here, it has the whole menu to arrive in. */
  try {
    var s0 = synth();
    if (s0 && s0.addEventListener) s0.addEventListener("voiceschanged", function () { vc.n = -1; });
    if (s0) voices(s0);
  } catch (e) {}

  return {
    say: say, unit: unit, watch: watch, hush: hush, hushUnits: hushUnits, justSaid: justSaid,
    setEnabled: function (v) { setPrefs({ eva: !!v }); }, get enabled() { return on; },
    prefs: getPrefs, setPrefs: setPrefs,
    /* for the suites */
    chooseVoice: chooseVoice, line: function (k) { return LINES[k] || null; }, refusal: refusal,
    crewWait: CREW_WAIT,
    keys: function () { return Object.keys(LINES); },
    tiers: { CRIT: CRIT, NORM: NORM, LOW: LOW, CREW: CREW },
    delivery: { rate: EVA_RATE, pitch: EVA_PITCH, fallbackPitch: EVA_PITCH_FALLBACK },
    reset: reset, setClock: function (f) { clock = typeof f === "function" ? f : null; },
    journal: function () { return journal.slice(); },
    state: function () {
      var syn = synth();
      return { speaking: !!(cur && busy(syn, now())), current: cur && !cur.done ? cur.item.key : null,
               queue: queue.map(function (q) { return q.key; }) };
    },
  };
})();
