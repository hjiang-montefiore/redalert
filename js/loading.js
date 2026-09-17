/* ============ loading.js — the deployment briefing between menu and battle ============
   Pressing DEPLOY used to freeze the menu on screen until the battlefield was
   finished, because the whole of the setup ran inside the click. This module
   puts a briefing up FIRST, lets the browser paint it, and only then runs the
   setup in steps that main.js hands it, with a real bar between them.

   While it waits it shows the two sides' kit: a random piece of equipment
   each side can actually field in this battle - its faction, its starting
   era, its services setting and its tech ceiling all apply - with the real
   designation, the role, one line of fact and the game's own model of it
   turning on a stand. The model comes from the same builder the build-menu
   thumbnails use (Icons3D), so the picture is the machine the player will
   meet, not a new drawing of it.

   Everything random here is Math.random. The showcase is cosmetic and must
   never draw from the battle's seeded generator, or a map seed would stop
   producing the same battle.

   Nothing here is used by the harness pages: they do not load this file, and
   main.js only asks for the briefing when a person pressed the button.    */
var LoadScreen = (function () {
  /* The flip and the minimum are set together. A fast machine is ready
     well inside the minimum, and the second pair must still fit in it with
     time to be read, or a fast load shows one machine a side and nothing
     ever turns over: 1.4 s + lag + reading time lands inside 2.8 s. */
  const MIN_MS = 2800;         // on screen at least this long
  const FLIP_MS = 1400;        // a new pair of cards this often
  const PAIR_LAG = 250;        // the enemy card turns over this long after ours
  const READ_MS = 800;         // the later card of a pair stays up at least this long
  const SETTLE_MS = 350;       // the finished bar is seen before the screen goes
  const FADE_MS = 450;         // matches the #loadscreen transition
  const SPIN = 0.5;            // turntable, radians a second
  const STILL_ANGLE = -0.62;   // three-quarter front, for reduced motion

  /* what the pre-battle Services setting takes away - game.js armsBan() */
  function armsBan(mode) {
    const b = {};
    if (mode === "noair" || mode === "ground") b.aircraft = true;
    if (mode === "nonavy" || mode === "ground") b.naval = true;
    return b;
  }

  /* Plain words for the role ids. A role id is a slot in an army's
     roster, not a class of machine: each slot holds whatever that army
     really fielded in it, so the ROC's light-armour slot is an M60A3, the
     PLA's 1950s tank slot is a T-34-85 and the Soviet carrier slot starts
     with a helicopter cruiser. A class name ("Light tank", "Main battle
     tank", "Aircraft carrier") would be false for some of them. Each phrase
     is therefore either the job the slot does or a class that every unit
     dealt under it belongs to; the unit's own name still says what it is.
     An unlisted role falls back to its id rather than a guess. */
  const ROLE_TITLE = {
    rifle: "Rifle infantry", mg: "Machine-gun team", at: "Anti-armour",
    aa: "Air defence", mortar: "Mortar section", sniper: "Sniper team",
    recon: "Reconnaissance", ifv: "Armoured infantry carrier",
    lighttank: "Armoured fighting vehicle", mbt: "Tank", heavy: "Heavy armour",
    tankdestroyer: "Anti-tank vehicle", spaag: "Mobile air defence",
    spg: "Self-propelled gun", mlrs: "Rocket artillery",
    sam: "Surface-to-air missile system", tel: "Ballistic missile launcher",
    ewveh: "Electronic warfare", minelayer: "Minelaying",
    gunship: "Armed helicopter", transport: "Transport",
    aswhelo: "Naval helicopter", fighter: "Fighter",
    cfighter: "Carrier-borne combat aircraft", cstrike: "Carrier strike aircraft",
    cstealth: "Carrier stealth fighter", cas: "Ground attack",
    stealthfighter: "Stealth aircraft", stealthbomber: "Stealth bomber",
    heavybomber: "Bomber", sead: "Air-defence suppression",
    ewair: "Electronic warfare", gunshipair: "Fixed-wing gunship",
    patrol: "Patrol vessel or fast attack craft", corvette: "Escort or light warship",
    missileboat: "Missile boat or corvette", destroyer: "Destroyer or frigate",
    cruiser: "Cruiser", carrier: "Aircraft-carrying warship", sub: "Submarine",
    ssn: "Nuclear submarine", ssbn: "Ballistic missile submarine",
    ssgn: "Cruise missile submarine", navminelayer: "Minelaying",
    minesweeper: "Mine countermeasures", mineclear: "Mine clearing",
  };
  /* Infantry is the least telling thing on a turntable and the most common
     entry in any roster, so it is dealt less often. */
  const CAT_WEIGHT = { vehicle: 3, aircraft: 3, naval: 2.5, infantry: 1 };

  /* Tips repeat what the game already says in its own hints and alerts. */
  const TIPS = [
    "<b>Space</b> jumps to the next thing that needs you.",
    "<b>A</b>+click attack-moves; <b>Shift+RMB</b> queues waypoints.",
    "<b>Ctrl+0-9</b> sets a group and <b>0-9</b> recalls it.",
    "<b>C</b> puts guns on counter-battery: they answer plotted enemy artillery themselves.",
    "Build power, then a refinery. Harvesters fund the war.",
    "<b>Esc</b> opens the menu, and the battle is frozen while it is open.",
    "<b>Q/E</b> rotate the camera; <b>Shift+0-9</b> stores a camera bookmark.",
    "<b>G</b> guards, <b>F</b> holds fire, <b>S</b> stops.",
    "<b>M</b> repairs a structure and <b>Del</b> sells one.",
    "A dimmed price means you cannot afford it yet; a dimmed card means you cannot build it at all.",
  ];

  const $ = (id) => document.getElementById(id);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  function weighted(arr, wf) {
    let tot = 0;
    for (const a of arr) tot += wf(a);
    let r = Math.random() * tot;
    for (const a of arr) { r -= wf(a); if (r <= 0) return a; }
    return arr[arr.length - 1];
  }
  function rgba(hex, a) {
    const n = parseInt(String(hex || "#6f9c46").slice(1), 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }
  /* the part of a menu option's label before its explanation */
  function optLabel(selId, value) {
    const sel = $(selId);
    if (!sel) return "";
    for (const o of sel.options)
      if (o.value === String(value)) return o.textContent.split(" — ")[0].trim();
    return "";
  }
  /* the same trim the selection panel applies to a description */
  function firstSentence(txt, max) {
    if (!txt) return "";
    const t = String(txt).trim();
    if (t.length <= max) return t;
    let cut = -1;
    for (let i = 0; i < t.length && i <= max; i++)
      if (t[i] === "." && (i + 1 >= t.length || t[i + 1] === " ")) cut = i + 1;
    return cut > 40 ? t.slice(0, cut).trim()
                    : t.slice(0, max).replace(/\s+\S*$/, "").trim() + "…";
  }
  /* The unit records were written for the people building the rosters as
     much as for the player. Some sentences are about the game rather than
     the machine ("the game's `recon_p`", "this band was empty") and some
     only make sense beside the previous decade's record ("Unchanged.").
     The selection panel sits next to the unit and gets away with that; a
     card read on its own does not. Only sentences about the machine are
     kept, and poolFor() leaves out a unit with none. */
  const META = /`|\bunitFor\b|\bG\.\w|\bgames?\b|\bslots?\b|\b(this|the|honest) entry\b|\bband (was|is)\b|\bplaceholder\b|\bcandid note\b|^(unchanged|same|be honest|be candid|include with caution)\b/i;
  /* A sentence that only turns to the game in a closing aside ("... and
     excellent sensors - the best scout car in the game") keeps the part
     before the aside. */
  function aboutMachine(s) {
    const m = META.exec(s);
    if (!m) return s;
    const head = s.slice(0, m.index);
    const cut = Math.max(head.lastIndexOf(" — "), head.lastIndexOf(" -- "),
                         head.lastIndexOf(" - "), head.lastIndexOf(", which "));
    if (cut < 25) return "";
    const h = head.slice(0, cut).replace(/[\s,;:]+$/, "");
    return META.test(h) ? "" : h + ".";
  }
  function factText(txt) {
    const t = String(txt || "").trim(), kept = [];
    let from = 0;
    for (let i = 0; i < t.length; i++) {
      const end = i === t.length - 1 ||
        ((t[i] === "." || t[i] === "!" || t[i] === "?") && t[i + 1] === " ");
      if (!end) continue;
      const s = aboutMachine(t.slice(from, i + 1).trim());
      if (s) kept.push(s);
      from = i + 1;
    }
    return firstSentence(kept.join(" "), 170);
  }
  const eraOK = (e) => (typeof ERAS !== "undefined" && ERAS.indexOf(e) >= 0);

  /* ---------------- who is fighting, and with what ---------------- */
  /* Mirrors Game.init: the human takes the player-side settings and every AI
     seat, an ally included, takes the enemy-side ones. */
  function commanders(opts) {
    const roster = opts.roster && opts.roster.length ? opts.roster : [
      { faction: opts.factionHuman, ai: false, team: 1, label: "YOU" },
      { faction: opts.factionAI, ai: true, team: 2, diff: opts.diff, label: "ENEMY 1" },
    ];
    const pEra = eraOK(opts.era) ? opts.era : "e20";
    const aEra = eraOK(opts.eraAI) ? opts.eraAI : pEra;
    return roster.map((r, i) => {
      const human = !r.ai;
      const tech = (human ? opts.techHuman : opts.techAI) || 1;
      const c = {
        idx: i, human, faction: r.faction, team: r.team || (i + 1),
        label: r.label || (human ? "YOU" : "AI " + i),
        era: human ? pEra : aEra,
        arms: (human ? opts.armsHuman : opts.armsAI) || "all",
        techCap: Math.max(tech, (human ? opts.capHuman : opts.capAI) || 3),
        diff: r.diff || opts.diff, personality: r.personality,
        /* Player's constructor colour. Its duplicate-faction shift is not
           copied: adopt() replaces this with the real colour once the
           players exist, so the briefing cannot disagree with the map. */
        color: (CFG.FACTION_COLORS && CFG.FACTION_COLORS[r.faction]) ||
               CFG.TEAM[i % CFG.TEAM.length],
      };
      c.pool = poolFor(c, opts.superweapons === false);
      return c;
    });
  }

  /* Can this commander ever put up a structure? The tests Player.lockReason
     puts to a structure - the Services ban on the airbase and the naval
     yard, strategic weapons, the army that operated it, a dated structure's
     service window, the tech ceiling - followed down the prerequisite chain.
     Without it "No air force" still dealt carriers, whose airbase
     prerequisite that setting forbids for the whole battle. `memo` is per
     commander; a structure being checked counts as possible, so a loop in
     the table could only ever let a unit through, never hide one. */
  function canRaise(id, c, ban, noSuper, memo) {
    if (memo[id] !== undefined) return memo[id];
    if (typeof BUILDINGS === "undefined") return true;
    const b = BUILDINGS[id];
    if (!b) return (memo[id] = false);
    memo[id] = true;
    let ok = !((b.cat && ban[b.cat]) ||
               (id === "airbase" && ban.aircraft) || (id === "navalyard" && ban.naval) ||
               (b.superweapon && noSuper) ||
               (b.fac !== undefined && b.fac !== "both" && b.fac !== c.faction) ||
               (b.srole !== undefined && typeof inEra === "function" && !inEra(b, c.era)) ||
               (b.tech && b.tech > c.techCap));
    if (ok)
      for (const rq of b.prereq || [])
        if (!canRaise(rq, c, ban, noSuper, memo)) { ok = false; break; }
    return (memo[id] = ok);
  }

  /* Everything this commander's factories could turn out in this battle
     that carries a weapon. Kit marked eraStamped is left out: those are the
     timeless support roles, dated to 1950 by rules.js but described by their
     present-day designation, and an M240B has no place on a 1950s card. */
  function poolFor(c, noSuper) {
    const ban = armsBan(c.arms), out = [], memo = {};
    for (const id in UNITS) {
      const d = UNITS[id];
      if (!d || d.fac !== c.faction || d.eraStamped) continue;
      if (typeof inEra === "function" && !inEra(d, c.era)) continue;
      if (ban[d.cat]) continue;
      if (d.superweapon && noSuper) continue;
      if (d.tech && d.tech > c.techCap) continue;
      if (!d.weapons || !d.weapons.length) continue;
      if (!(d.prereq || []).every(rq => canRaise(rq, c, ban, noSuper, memo))) continue;
      if (!describe(id).fact) continue;
      out.push(id);
    }
    return out;
  }

  /* One card's worth of facts, all read from the game's own tables. The
     text never depends on who fields the unit, so each is built once. */
  const described = {};
  function describe(id) {
    if (described[id]) return described[id];
    const d = UNITS[id];
    const f = (typeof FACTS !== "undefined" && FACTS[id]) || null;
    const bits = [ROLE_TITLE[d.role] || String(d.role || d.cat).replace(/_/g, " ")];
    const svc = (f && f.service) || d.service;
    if (svc) bits.push("in service " + svc);
    let arm = f && f.armament ? firstSentence(f.armament, 120) : "";
    if (!arm && typeof WEAPONS !== "undefined") {
      const names = [];
      for (const w of d.weapons || []) {
        const W = WEAPONS[w];
        if (W && W.name && names.indexOf(W.name) < 0) names.push(W.name);
      }
      arm = names.slice(0, 3).join(" · ");
    }
    /* The confidence note speaks for FACTS' published figures only, as the
       selection panel's does; a record's own `confidence` grades how sure
       the roster is of the attribution, which is a different claim. */
    const conf = f && f.confidence;
    return (described[id] = {
      role: bits.join(" · "),
      origin: (f && f.origin) || "",
      name: (f && f.name) || d.full || d.name,
      fact: factText(f && f.note) || factText(d.desc),
      arm,
      conf: conf && conf !== "high" ? "published figures: ~" + conf + " confidence" : "",
    });
  }

  /* ---------------- the turntable ----------------
     One small offscreen WebGL renderer lit like the build-menu thumbnails.
     Each card has a plain 2D canvas and the render is copied into it, so two
     cards cost one context, and that context is released when the briefing
     goes - the battle needs its own. */
  let gl = null, glFailed = false;
  function ensureGL() {
    if (gl) return gl;
    if (glFailed || !window.THREE || typeof Icons3D === "undefined" || !Icons3D.model) return null;
    let R = null;
    try {
      const cv = document.createElement("canvas");
      cv.width = 4; cv.height = 4;
      R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true,
                                    preserveDrawingBuffer: true });
      R.setPixelRatio(1);
      R.outputEncoding = THREE.sRGBEncoding;
      R.toneMapping = THREE.ACESFilmicToneMapping;
      R.toneMappingExposure = 1.05;
      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(30, 1.6, 0.1, 900);
      const kl = new THREE.DirectionalLight(0xfff2e0, 2.4);
      kl.position.set(-6, 9, 7); scene.add(kl);
      const fl = new THREE.DirectionalLight(0x9fc0e8, 0.9);
      fl.position.set(7, 3, -5); scene.add(fl);
      scene.add(new THREE.HemisphereLight(0x9db4cc, 0x2a3028, 0.75));
      const ec = document.createElement("canvas"); ec.width = 64; ec.height = 32;
      const g = ec.getContext("2d");
      const gr = g.createLinearGradient(0, 0, 0, 32);
      gr.addColorStop(0, "#cfdcea"); gr.addColorStop(0.55, "#8fa2b4"); gr.addColorStop(1, "#3a423a");
      g.fillStyle = gr; g.fillRect(0, 0, 64, 32);
      const et = new THREE.CanvasTexture(ec);
      et.mapping = THREE.EquirectangularReflectionMapping;
      et.encoding = THREE.sRGBEncoding;
      const pm = new THREE.PMREMGenerator(R);
      scene.environment = pm.fromEquirectangular(et).texture;
      pm.dispose();
      gl = { R, scene, cam, w: 0, h: 0 };
      return gl;
    } catch (e) {
      /* a context that was created but could not be set up is released
         here, since releaseGL() only knows about a finished one */
      if (R) { try { R.dispose(); R.forceContextLoss(); } catch (e2) {} }
      glFailed = true; gl = null;
      return null;
    }
  }
  function releaseGL() {
    if (!gl) return;
    try { gl.R.dispose(); gl.R.forceContextLoss(); } catch (e) {}
    gl = null;
  }
  /* Geometry is built fresh for every model and can go at once. Materials
     and textures are NOT disposed here: the builders cache skins and share
     them with the battlefield renderer, and the context loss above frees
     this renderer's copies anyway. */
  function dropModel(slot) {
    if (!slot.group) return;
    if (gl) gl.scene.remove(slot.group);
    slot.group.traverse(o => { if (o.geometry) try { o.geometry.dispose(); } catch (e) {} });
    slot.group = null;
  }

  /* Infantry has period kit registered per unit by infantry3d.js; the
     thumbnail builder always takes the generic figure for the role, so the
     unit's own figure is asked for first. */
  function buildModel(id, color) {
    const d = UNITS[id];
    let m = null;
    if (d.cat === "infantry" && typeof UNIT_MODELS !== "undefined" &&
        UNIT_MODELS[id] && !UNIT_MODELS[id].crude)
      m = UNIT_MODELS[id].build(THREE, Models3D, { team: color.main });
    if (!m) m = Icons3D.model(id, "unit", color);
    /* the thumbnails' one-time colour-space fix, or every card is washed out */
    if (m && Icons3D.prep) Icons3D.prep(m);
    return m;
  }

  function mountModel(slot, id, color) {
    const G3 = ensureGL();
    if (!G3) return false;
    let model = null;
    try { model = buildModel(id, color); } catch (e) { model = null; }
    if (!model) return false;
    const group = new THREE.Group();
    model.rotation.x = -Math.PI / 2;            // model +Z up -> three +Y up
    group.add(model);
    const box = new THREE.Box3().setFromObject(group);
    const sph = box.getBoundingSphere(new THREE.Sphere());
    /* stand the model on its own centre, so it turns in place */
    model.position.sub(sph.center);
    slot.rad = Math.max(0.4, sph.radius);
    slot.group = group;
    G3.scene.add(group);
    return true;
  }

  function sizeSlot(slot) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(64, Math.round(slot.pic.clientWidth * dpr));
    const h = Math.max(48, Math.round(slot.pic.clientHeight * dpr));
    if (slot.cv.width !== w || slot.cv.height !== h) { slot.cv.width = w; slot.cv.height = h; }
  }

  function paintGL(slot, slots) {
    const G3 = gl, w = slot.cv.width, h = slot.cv.height;
    if (G3.w !== w || G3.h !== h) { G3.R.setSize(w, h, false); G3.w = w; G3.h = h; }
    for (const s of slots) if (s.group) s.group.visible = (s === slot);
    slot.group.rotation.y = slot.ang;
    const cam = G3.cam;
    cam.aspect = w / h;
    /* fit the bounding sphere to whichever field of view is tighter */
    const vHalf = cam.fov * Math.PI / 360;
    const fit = Math.min(vHalf, Math.atan(Math.tan(vHalf) * cam.aspect));
    const dist = slot.rad / Math.sin(fit) * 0.86;
    cam.position.set(0, Math.sin(0.38) * dist, Math.cos(0.38) * dist);
    cam.near = Math.max(0.05, dist - slot.rad * 3);
    cam.far = dist + slot.rad * 4;
    cam.updateProjectionMatrix();
    cam.lookAt(0, 0, 0);
    G3.R.render(G3.scene, cam);
    slot.ctx.clearRect(0, 0, w, h);
    slot.ctx.drawImage(G3.R.domElement, 0, 0, w, h);
  }

  /* The 2D battlefield's own top-down art, turned on the spot. This is what
     a machine without WebGL gets, drawn the way render.js draws a unit. */
  function paintSprite(slot) {
    const c = slot.ctx, w = slot.cv.width, h = slot.cv.height, spr = slot.sprite;
    c.clearRect(0, 0, w, h);
    c.imageSmoothingQuality = "high";
    const d = UNITS[slot.id];
    c.save();
    c.translate(w / 2, h / 2);
    if (d.cat === "infantry") {
      const s = Math.min(w * 0.5 / spr.hull.w, h * 0.7 / spr.hull.h);
      c.scale(s, s);
      c.drawImage(spr.hull.cv, -spr.hull.w / 2, -spr.hull.h / 2, spr.hull.w, spr.hull.h);
    } else {
      const s = Math.min(w * 0.7, h * 1.2) / Math.max(spr.hull.w, spr.hull.h);
      c.scale(s, s * 0.58);
      c.save();
      c.rotate(slot.ang);
      c.drawImage(spr.hull.cv, -spr.hull.w / 2, -spr.hull.h / 2, spr.hull.w, spr.hull.h);
      c.restore();
      if (spr.turret) {
        c.translate(Math.cos(slot.ang) * spr.tx, Math.sin(slot.ang) * spr.tx);
        c.rotate(slot.ang);
        c.drawImage(spr.turret.cv, -spr.turret.ax, -spr.turret.ay, spr.turret.w, spr.turret.h);
      }
    }
    c.restore();
  }

  /* the build menu's baked thumbnail, centred, when nothing can turn */
  function paintStill(slot) {
    const c = slot.ctx, w = slot.cv.width, h = slot.cv.height, im = slot.still;
    c.clearRect(0, 0, w, h);
    const s = Math.min(w / im.width, h / im.height);
    c.drawImage(im, (w - im.width * s) / 2, (h - im.height * s) / 2, im.width * s, im.height * s);
  }

  function paintSlot(slot, slots) {
    try {
      if (slot.mode === "gl") paintGL(slot, slots);
      else if (slot.mode === "sprite") paintSprite(slot);
      else if (slot.mode === "still") paintStill(slot);
      else slot.ctx.clearRect(0, 0, slot.cv.width, slot.cv.height);
    } catch (e) { slot.mode = "none"; }
  }

  /* ---------------- the briefing itself ---------------- */
  let S = null;                 // the running briefing, or null

  function available() { return !!$("loadscreen"); }

  function rosterRow(c, doctrine) {
    const li = document.createElement("li");
    const chip = document.createElement("span");
    chip.className = "ls-chip";
    chip.style.setProperty("--c", c.color.main);
    chip.style.setProperty("--d", c.color.dark || c.color.main);
    const who = document.createElement("div");
    who.className = "ls-who";
    const lbl = document.createElement("span");
    lbl.className = "lbl"; lbl.textContent = c.label;
    const nm = document.createElement("b");
    nm.textContent = (FACTIONS[c.faction] && FACTIONS[c.faction].name) || c.faction;
    const sub = document.createElement("i");
    const bits = [];
    if (typeof ERA_INFO !== "undefined" && ERA_INFO[c.era])
      bits.push(ERA_INFO[c.era].name + " " + ERA_INFO[c.era].full);
    if (c.arms !== "all") bits.push(optLabel(c.human ? "opt-parms" : "opt-aarms", c.arms));
    if (!c.human) {
      const r = optLabel("opt-diff", c.diff);
      if (r) bits.push(r + " commander");
      if (doctrine && c.personality && typeof AI !== "undefined" && AI.personalityName)
        bits.push(AI.personalityName(c.personality) + " doctrine");
    }
    sub.textContent = bits.filter(Boolean).join(" · ");
    who.append(lbl, nm, sub);
    li.append(chip, who);
    c.chip = chip;
    return li;
  }

  function cardShell(card, side) {
    card.innerHTML =
      '<div class="ls-pic"><canvas></canvas><span class="ls-tag"><i></i><em></em></span></div>' +
      '<div class="ls-body"><div class="ls-role"></div><div class="ls-origin"></div><div class="ls-name"></div>' +
      '<div class="ls-fact"></div><div class="ls-arm"></div><div class="ls-cf"></div></div>';
    const q = (s) => card.querySelector(s);
    const cv = q("canvas");
    return {
      side, card, pic: q(".ls-pic"), cv, ctx: cv.getContext("2d"),
      tagChip: q(".ls-tag i"), tag: q(".ls-tag em"),
      role: q(".ls-role"), origin: q(".ls-origin"), name: q(".ls-name"), fact: q(".ls-fact"),
      arm: q(".ls-arm"), cf: q(".ls-cf"),
      id: null, mode: "none", group: null, sprite: null, still: null, ang: 0, rad: 1,
    };
  }

  /* One card from one side. `want` is the other side's card: the same role
     is dealt if this side fields it at all (a face-off), else the same kind
     of platform, else anything. A face-off matters more than novelty, so an
     already-shown machine of the right role beats a fresh one of the wrong
     role - but never the card this side showed last. */
  function deal(side, want) {
    let members = side.members.filter(m => m.pool.length);
    if (!members.length) return null;
    const fields = (m) => m.pool.some(id => UNITS[id].role === want.role);
    if (want && members.some(fields)) members = members.filter(fields);
    const who = weighted(members, m => (m.human ? 3 : 1));
    let fresh = who.pool.filter(id => !side.seen.has(id));
    if (!fresh.length) { for (const id of who.pool) side.seen.delete(id); fresh = who.pool.slice(); }
    if (fresh.length > 1) fresh = fresh.filter(id => id !== side.lastId);
    let ids = fresh;
    if (want) {
      const role = (list) => list.filter(id => UNITS[id].role === want.role && id !== side.lastId);
      const kind = (list) => list.filter(id => UNITS[id].cat === want.cat);
      for (const c of [role(fresh), role(who.pool), kind(fresh)])
        if (c.length) { ids = c; break; }
    } else if (side.lastCat) {
      const other = fresh.filter(id => UNITS[id].cat !== side.lastCat);
      if (other.length) ids = other;
    }
    const id = weighted(ids, i => CAT_WEIGHT[UNITS[i].cat] || 1);
    side.seen.add(id);
    side.lastCat = UNITS[id].cat;
    side.lastId = id;
    return { id, who };
  }

  function show(slot, hand) {
    if (!S || S.gone) return;
    if (!hand) {
      /* possible only with every service struck off a thin early roster */
      if (slot.id !== null || !slot.name.textContent) {
        slot.tag.textContent = slot.side === "me" ? "OURS" : "THEIRS";
        slot.role.textContent = slot.origin.textContent = "";
        slot.name.textContent = "No combat equipment on this roster";
        slot.fact.textContent = slot.arm.textContent = slot.cf.textContent = "";
        dropModel(slot);
        slot.id = null; slot.mode = "none";
        paintSlot(slot, S.slots);
      }
      return;
    }
    const { id, who } = hand;
    const info = describe(id);
    const f = FACTIONS[who.faction] || { short: who.faction };
    slot.tag.textContent = (slot.side === "me" ? "OURS" : "THEIRS") + " — " +
      who.label + " · " + f.short;
    slot.tagChip.style.background = who.color.main;
    slot.pic.style.setProperty("--glow", rgba(who.color.main, 0.24));
    slot.role.textContent = info.role;
    /* origin has a line of its own: at the end of the role line it was the
       part an ellipsis cut off, and the long ones are the telling ones */
    slot.origin.textContent = info.origin;
    slot.origin.title = info.origin;
    slot.name.textContent = info.name;
    slot.fact.textContent = info.fact;
    slot.arm.textContent = info.arm;
    slot.cf.textContent = info.conf;
    slot.card.dataset.unit = id;

    dropModel(slot);
    slot.id = id; slot.sprite = null; slot.still = null;
    slot.ang = S.still ? STILL_ANGLE : STILL_ANGLE + (Math.random() - 0.5) * 1.2;
    sizeSlot(slot);
    if (mountModel(slot, id, who.color)) slot.mode = "gl";
    else {
      let spr = null;
      try { spr = typeof Sprites !== "undefined" ? Sprites.get(UNITS[id], who.color) : null; }
      catch (e) { spr = null; }
      if (spr && spr.hull) { slot.sprite = spr; slot.mode = "sprite"; }
      else {
        let still = null;
        try { still = typeof Icons3D !== "undefined" ? Icons3D.get(id, "unit", who.color) : null; }
        catch (e) { still = null; }
        slot.still = still;
        slot.mode = still ? "still" : "none";
      }
    }
    paintSlot(slot, S.slots);
    /* restart the entrance animation */
    slot.card.classList.remove("flip");
    void slot.card.offsetWidth;
    slot.card.classList.add("flip");
  }

  function dealPair(first) {
    if (!S || S.gone) return;
    /* nothing new once the later card of the pair could not be read
       before the screen goes */
    const now = performance.now();
    if (S.dueAt && now + PAIR_LAG + READ_MS > S.dueAt) return;
    S.lastDeal = now;
    /* the next pair is booked first, so one bad record cannot stop the
       rotation - and nothing here may throw out of a timer, where the page's
       error box would report a cosmetic fault as a game error */
    S.timers.push(setTimeout(() => dealPair(false), FLIP_MS));
    S.pairs++;
    /* take turns choosing, so the enemy's roster sets the face-off as often
       as ours does */
    const meLeads = S.pairs % 2 === 1;
    const lead = meLeads ? S.me : S.them, follow = meLeads ? S.them : S.me;
    let a = null, b = null;
    try { a = deal(lead, null); b = deal(follow, a ? UNITS[a.id] : null); }
    catch (e) { return; }
    const mine = meLeads ? a : b, theirs = meLeads ? b : a;
    try { show(S.slots[0], mine); } catch (e) {}
    if (first) { try { show(S.slots[1], theirs); } catch (e) {} }
    else S.timers.push(setTimeout(() => { try { show(S.slots[1], theirs); } catch (e) {} }, PAIR_LAG));
  }

  function spin(t) {
    if (!S || S.gone) return;
    S.anim = requestAnimationFrame(spin);
    const dt = Math.min(0.1, Math.max(0, (t - S.lastFrame) / 1000));
    S.lastFrame = t;
    for (const slot of S.slots) {
      if (slot.mode !== "gl" && slot.mode !== "sprite") continue;
      slot.ang += dt * SPIN;
      paintSlot(slot, S.slots);
    }
  }

  function onResize() {
    if (!S) return;
    for (const slot of S.slots) { sizeSlot(slot); paintSlot(slot, S.slots); }
  }

  /* Nothing behind the briefing hears a key while it is up. Once the
     battle is ready any key but a lone modifier sends it away; browser
     shortcuts keep working. */
  function onKey(e) {
    if (!S || S.gone) return;
    e.stopImmediatePropagation();
    if (e.ctrlKey || e.metaKey || e.altKey || /^F\d+$/.test(e.key)) return;
    if (/^(Shift|Control|Alt|Meta|CapsLock)$/.test(e.key)) return;
    e.preventDefault();
    if (S.readyAt) dismiss();
  }
  function onClick(e) {
    if (!S || S.gone) return;
    e.preventDefault();
    if (S.readyAt) dismiss();
  }
  function onMenu(e) { e.preventDefault(); }

  function setBar(frac) {
    const fill = $("ls-fill");
    if (fill) fill.style.width = Math.round(Math.max(0, Math.min(1, frac)) * 100) + "%";
    const bar = $("ls-bar");
    if (bar) bar.setAttribute("aria-valuenow", String(Math.round(frac * 100)));
  }

  function setStep(i) {
    const st = S.stages;
    S.steps.forEach((li, k) => {
      li.classList.toggle("done", k < i);
      li.classList.toggle("on", k === i);
    });
    if (i < st.length) {
      $("ls-stage").textContent = st[i].label;
      $("ls-count").textContent = "Step " + (i + 1) + " of " + st.length;
      /* a little of the step shows as started, since the thread is about
         to be busy and the bar cannot move again until it is done */
      setBar((S.doneW + st[i].weight * 0.15) / S.totalW);
    }
  }

  /* one paint between each step, or the bar never visibly moves; the timer
     is there because a background tab runs no animation frames at all */
  function afterPaint(fn) {
    let fired = false;
    const go = () => { if (fired) return; fired = true; fn(); };
    requestAnimationFrame(() => setTimeout(go, 0));
    setTimeout(go, 120);
  }

  function runStep(i) {
    if (!S || S.gone) return;
    if (i >= S.stages.length) return ready();
    setStep(i);
    afterPaint(() => {
      if (!S || S.gone) return;
      try { S.stages[i].run(); }
      catch (e) { abort(e); throw e; }
      S.doneW += S.stages[i].weight;
      setBar(S.doneW / S.totalW);
      runStep(i + 1);
    });
  }

  function ready() {
    const now = performance.now();
    S.readyAt = now;
    setStep(S.stages.length);
    setBar(1);
    $("ls-stage").textContent = "Forces deployed";
    $("ls-count").textContent = "Ready";
    S.root.classList.add("ready");
    S.root.dataset.state = "ready";
    S.root.setAttribute("aria-busy", "false");
    if (S.hold) return;
    /* a pair dealt while the last step ran is still given its reading
       time, rather than flashing up just as the screen fades */
    S.dueAt = Math.max(S.t0 + MIN_MS, now + SETTLE_MS,
                       S.lastDeal ? S.lastDeal + PAIR_LAG + READ_MS : 0);
    S.timers.push(setTimeout(dismiss, Math.max(0, S.dueAt - now)));
  }

  function teardown() {
    if (!S) return;
    S.gone = true;
    for (const t of S.timers) clearTimeout(t);
    S.timers.length = 0;
    cancelAnimationFrame(S.anim);
    window.removeEventListener("keydown", onKey, true);
    window.removeEventListener("resize", onResize);
    S.root.removeEventListener("click", onClick);
    S.root.removeEventListener("contextmenu", onMenu);
    /* The cards keep their last frame: it is a plain 2D copy, so the fade
       still shows the machines after the renderer behind them is gone. */
    for (const slot of S.slots) {
      dropModel(slot);
      slot.sprite = null; slot.still = null; slot.mode = "none";
    }
    releaseGL();
  }
  function freePixels(slots) {
    for (const slot of slots) { slot.cv.width = 0; slot.cv.height = 0; }
  }

  function dismiss() {
    if (!S || S.gone) return;
    const was = S, root = S.root, done = S.onReveal, still = S.still;
    teardown();
    root.dataset.state = "gone";
    root.classList.add("ls-out");
    const end = () => {
      freePixels(was.slots);
      if (S !== was) return;          // a newer briefing owns the element now
      root.classList.add("hidden");
      root.classList.remove("ls-out", "ready");
      S = null;
    };
    if (still) end(); else setTimeout(end, FADE_MS + 30);
    /* the battle starts as the screen starts to fade, so the first thing
       seen through it is already live */
    if (done) done();
  }

  /* A step failed: take the briefing down at once, so the error report and
     whatever was built are not hidden behind it. */
  function abort(err) {
    if (!S) return;
    const root = S.root, cb = S.onAbort;
    teardown();
    freePixels(S.slots);
    root.dataset.state = "failed";
    root.classList.add("hidden");
    root.classList.remove("ls-out", "ready");
    S = null;
    if (cb) try { cb(err); } catch (e) {}
  }

  /* ---- public ----
     run({ opts, doctrine, stages: [{label, weight, run}], onReveal, onAbort })
     Throws only if the briefing could not be put up at all, before any step
     has run; main.js then deploys without it. */
  function run(cfg) {
    if (S) abort(null);
    const root = $("loadscreen");
    if (!root) throw new Error("no #loadscreen in this page");
    const opts = cfg.opts;
    const cmds = commanders(opts);
    const home = cmds[0];
    const friends = cmds.filter(c => c.team === home.team);
    const foes = cmds.filter(c => c.team !== home.team);
    const still = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const hash = location.hash || "";

    S = {
      root, opts, still, hold: /[#&]loadhold\b/.test(hash),
      t0: performance.now(), readyAt: 0, dueAt: 0, lastDeal: 0, gone: false,
      stages: cfg.stages || [], doneW: 0, totalW: 0,
      onReveal: cfg.onReveal, onAbort: cfg.onAbort,
      timers: [], anim: 0, lastFrame: performance.now(), pairs: 0, steps: [],
      me: { members: friends, seen: new Set(), lastCat: null, lastId: null },
      them: { members: foes, seen: new Set(), lastCat: null, lastId: null },
      slots: [],
    };
    try {
      for (const s of S.stages) S.totalW += s.weight || 1;

      const th = (typeof THEATRES !== "undefined" && THEATRES[opts.theatre]) || null;
      const wx = optLabel("opt-weather", opts.weather);
      const where = [th ? th.name : "", wx ? "Weather " + wx : "",
                     opts.mapSize ? opts.mapSize + "×" + opts.mapSize : ""].filter(Boolean);
      $("ls-theatre").textContent = where.join(" · ");

      const rm = $("ls-roster-me"), rt = $("ls-roster-them");
      rm.textContent = ""; rt.textContent = "";
      for (const c of friends) rm.appendChild(rosterRow(c, cfg.doctrine));
      for (const c of foes) rt.appendChild(rosterRow(c, cfg.doctrine));

      S.slots = [cardShell($("ls-card-me"), "me"), cardShell($("ls-card-them"), "them")];

      const ol = $("ls-steps");
      ol.textContent = "";
      for (const s of S.stages) {
        const li = document.createElement("li");
        li.textContent = s.label;
        ol.appendChild(li);
        S.steps.push(li);
      }
      $("ls-tip").innerHTML = "<b>Tip</b> — " + pick(TIPS);
      $("ls-stage").textContent = "Preparing orders";
      $("ls-count").textContent = "";
      setBar(0);

      root.classList.remove("hidden", "ls-out", "ready");
      root.dataset.state = "loading";
      root.setAttribute("aria-busy", "true");
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      try { root.focus({ preventScroll: true }); } catch (e) {}
      window.addEventListener("keydown", onKey, true);
      window.addEventListener("resize", onResize);
      root.addEventListener("click", onClick);
      root.addEventListener("contextmenu", onMenu);
    } catch (e) {
      teardown();
      root.classList.add("hidden");
      S = null;
      throw e;
    }

    /* The screen is up; the browser paints it when this click returns. The
       cards are dealt on the next frame and the steps run after that. */
    afterPaint(() => {
      if (!S || S.gone) return;
      try {
        dealPair(true);
        if (!S.still) { S.lastFrame = performance.now(); S.anim = requestAnimationFrame(spin); }
      } catch (e) { /* the showcase is decoration: the battle still loads */ }
      runStep(0);
    });
  }

  /* The players exist now: take their real colours, so the briefing and the
     battlefield can never disagree about who is which colour. */
  function adopt(players) {
    if (!S || !players) return;
    const all = S.me.members.concat(S.them.members);
    for (const c of all) {
      const p = players[c.idx];
      if (!p || !p.color) continue;
      c.color = p.color;
      if (c.chip) {
        c.chip.style.setProperty("--c", p.color.main);
        c.chip.style.setProperty("--d", p.color.dark || p.color.main);
      }
    }
  }

  return { run, adopt, available, dismiss, MIN_MS,
           get active() { return !!S && !S.gone; } };
})();
