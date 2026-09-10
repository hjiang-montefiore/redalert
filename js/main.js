/* ============ main.js — bootstrap, menu, fixed-step loop ============ */
(function () {
  const menu = document.getElementById("menu");
  const gameEl = document.getElementById("game");

  /* inject theatre & faction pickers into the menu */
  const mapRow = document.getElementById("opt-map");
  mapRow.innerHTML = "";
  for (const id of THEATRE_LIST) {
    const o = document.createElement("option");
    o.value = id; o.textContent = THEATRES[id].name;
    mapRow.appendChild(o);
  }
  /* faction pickers are generated from the rules so new armies appear here
     automatically — order controls which one is preselected */
  /* Keep "nato" FIRST and keep "pact" in the list. _behtest.html drives this
     real menu and never sets opt-fac or opt-foe, so the suite inherits
     facOptions("nato") and facOptions("pact") below. Reordering silently
     changes which army the regression runs as. */
  const FAC_ORDER = ["nato", "gbr", "fra", "deu", "pact", "pla", "kpa", "roc"]
    .filter(k => FACTIONS[k]);
  const facOptions = (sel) => FAC_ORDER.map(k =>
    '<option value="' + k + '"' + (k === sel ? " selected" : "") + '>' +
    FACTIONS[k].name + "</option>").join("");

  /* The faction pickers belong at the head of the order of battle, beside the
     era and the tech ceiling, because picking a side is the same kind of
     decision and the screen now lays those out as you-against-enemy. The
     deployment screen provides the two slots; if it ever does not, fall back
     to inserting rows the old way so this cannot break the menu outright. */
  const slotMe = document.getElementById("fac-slot-me");
  const slotThem = document.getElementById("fac-slot-them");
  let blurb;
  if (slotMe && slotThem) {
    slotMe.innerHTML = '<select id="opt-fac">' + facOptions("nato") + "</select>";
    slotThem.innerHTML = '<select id="opt-foe">' + facOptions("pact") + "</select>";
    blurb = document.getElementById("fac-blurb");
  }
  if (!blurb) {
    const diffRow = document.querySelector("#opt-diff").parentElement;
    if (!slotMe) {
      const facRow = document.createElement("div");
      facRow.className = "row";
      facRow.innerHTML = '<label>Your faction</label><select id="opt-fac">' + facOptions("nato") + "</select>";
      diffRow.parentElement.insertBefore(facRow, diffRow);
      const foeRow = document.createElement("div");
      foeRow.className = "row";
      foeRow.innerHTML = '<label>Enemy faction</label><select id="opt-foe">' + facOptions("pact") + "</select>";
      diffRow.parentElement.insertBefore(foeRow, diffRow);
    }
    blurb = document.createElement("div");
    blurb.className = "hint";
    blurb.style.cssText = "margin-top:2px;border-top:none;padding-top:0;grid-column:1/-1";
    diffRow.parentElement.insertBefore(blurb, diffRow);
  }
  function syncBlurb() {
    const f = FACTIONS[document.getElementById("opt-fac").value];
    const th = THEATRES[document.getElementById("opt-map").value];
    blurb.innerHTML = "<b>" + f.short + ":</b> " + f.bonus + "<br><b>THEATRE:</b> " + th.brief;
  }
  /* the deployment sites a theatre offers, named after the real ground */
  function syncStarts() {
    const sel = document.getElementById("opt-startpos");
    if (!sel) return;
    const th = THEATRES[document.getElementById("opt-map").value];
    const keep = sel.value;
    sel.innerHTML = "";
    const rnd = document.createElement("option");
    rnd.value = "-1"; rnd.textContent = "Random";
    sel.appendChild(rnd);
    const names = th.startNames || [];
    for (let i = 0; i < names.length; i++) {
      const o = document.createElement("option");
      o.value = String(i); o.textContent = names[i];
      sel.appendChild(o);
    }
    sel.value = (keep && sel.querySelector('option[value="' + keep + '"]')) ? keep : "-1";
  }
  document.getElementById("opt-fac").addEventListener("change", syncBlurb);
  document.getElementById("opt-map").addEventListener("change", function () {
    syncBlurb(); syncStarts();
  });
  syncBlurb(); syncStarts();

  /* the six playable periods, newest last so the default is the present */
  {
    /* Both sides pick their own starting period. The two boxes are filled
       identically; the enemy box simply follows yours until you touch it, so
       the common case - both sides in the same decade - still takes one click,
       while an asymmetric fight is one more. */
    const es = document.getElementById("opt-era");
    const as = document.getElementById("opt-aera");
    for (const box of [es, as]) {
      if (!box) continue;
      box.innerHTML = "";
      for (const k of ERAS) {
        const o = document.createElement("option");
        o.value = k;
        o.textContent = ERA_INFO[k].name + " \u2014 " + ERA_INFO[k].full;
        if (k === "e20") o.selected = true;
        box.appendChild(o);
      }
    }
    let enemyEraTouched = false;
    if (as) as.addEventListener("change", () => { enemyEraTouched = true; syncBlurb(); });
    if (es) es.addEventListener("change", () => {
      if (as && !enemyEraTouched) as.value = es.value;
      syncBlurb();
    });
    /* How far each side may re-equip during the battle. These are separate so
       a player can, for instance, hold themselves to the 1980s while letting
       the enemy modernise freely — or the reverse. */
    for (const boxId of ["opt-peracap", "opt-aeracap"]) {
      const ec = document.getElementById(boxId);
      if (!ec) continue;
      ec.innerHTML = "";
      for (const k of ERAS) {
        const o = document.createElement("option");
        o.value = k;
        o.textContent = "up to " + ERA_INFO[k].name;
        if (k === "e20") o.selected = true;
        ec.appendChild(o);
      }
    }
  }
  document.getElementById("btn-start").addEventListener("click", start);
  /* show the camera preference that is actually in force */
  {
    const pv = document.getElementById("opt-pan");
    if (pv && UI.panMode) pv.value = UI.panMode();
  }

  let raf = 0, lastT = 0, acc = 0;

  function start() {
    const pv = document.getElementById("opt-pan");
    if (pv && UI.setPanMode) UI.setPanMode(pv.value);
    const seedStr = document.getElementById("opt-seed").value.trim();
    const seed = seedStr ? U.hashStr(seedStr) : (Math.random() * 0xffffffff) >>> 0;
    const fac = document.getElementById("opt-fac").value;
    let foe = document.getElementById("opt-foe").value;
    if (foe === fac) foe = fac === "nato" ? "pact" : "nato";

    const pick = (id, dflt) => {
      const el = document.getElementById(id);
      return el ? el.value : dflt;
    };
    const opts = {
      theatre: document.getElementById("opt-map").value,
      seed,
      cash: parseInt(document.getElementById("opt-cash").value, 10) || 10000,
      diff: document.getElementById("opt-diff").value,
      era: (document.getElementById("opt-era") || { value: "e20" }).value,
      eraAI: (document.getElementById("opt-aera") ||
              document.getElementById("opt-era") || { value: "e20" }).value,
      eraCapHuman: (document.getElementById("opt-peracap") || { value: "e20" }).value,
      eraCapAI: (document.getElementById("opt-aeracap") || { value: "e20" }).value,
      fog: document.getElementById("opt-fog").value === "1",
      startPos: parseInt((document.getElementById("opt-startpos") || { value: "-1" }).value, 10),
      weather: (document.getElementById("opt-weather") || { value: "clear" }).value,
      factionHuman: fac,
      factionAI: foe,
      /* pre-battle rules */
      techHuman: parseInt(pick("opt-ptech", "1"), 10),
      techAI: parseInt(pick("opt-atech", "1"), 10),
      capHuman: parseInt(pick("opt-pcap", "3"), 10),
      capAI: parseInt(pick("opt-acap", "3"), 10),
      armsHuman: pick("opt-parms", "all"),
      armsAI: pick("opt-aarms", "all"),
      superweapons: pick("opt-super", "1") === "1",
      resources: parseFloat(pick("opt-res", "1")),
      mapSize: parseInt(pick("opt-mapsize", String(CFG.MAP_W)), 10),
      aiHandicap: parseFloat(pick("opt-handi", "1")),
    };

    /* ---- build the commander roster ---- */
    const oppSel = pick("opt-opponents", "1");
    const allyMode = oppSel.endsWith("t");
    const nEnemies = parseInt(oppSel, 10) || 1;
    const persSel = pick("opt-pers", "mixed");
    const facPool = FAC_ORDER.filter(f => f !== fac);
    const rnd = U.mulberry32(seed ^ 0x9e3779b9);
    /* "mixed" gives every commander a DIFFERENT doctrine so a multi-way war
       actually feels like several different opponents */
    const persPool = AI.personalities.slice();
    for (let i = persPool.length - 1; i > 0; i--) {          // deterministic shuffle
      const j = Math.floor(rnd() * (i + 1));
      const t = persPool[i]; persPool[i] = persPool[j]; persPool[j] = t;
    }
    let persN = 0;
    const pickPers = () => (persSel !== "mixed" ? persSel
      : persPool[persN++ % persPool.length]);
    opts.roster = [{ faction: fac, ai: false, team: 1, label: "YOU" }];
    if (allyMode) {
      opts.roster.push({
        faction: facPool[Math.floor(rnd() * facPool.length)], ai: true, team: 1,
        diff: opts.diff, personality: pickPers(), handicap: opts.aiHandicap, label: "ALLY",
      });
    }
    for (let i = 0; i < nEnemies; i++) {
      opts.roster.push({
        faction: i === 0 ? foe : facPool[Math.floor(rnd() * facPool.length)],
        ai: true, team: allyMode ? 2 : (2 + i),
        diff: opts.diff, personality: pickPers(),
        handicap: opts.aiHandicap,
        label: "ENEMY " + (i + 1),
      });
    }

    menu.classList.add("hidden");
    gameEl.classList.remove("hidden");

    Game.init(opts);
    const want3d = (document.getElementById("opt-3d") || { value: "1" }).value === "1";
    let ok3d = false;
    if (want3d && window.THREE) {
      try { Render3D.init(document.getElementById("cv"), Game); Render = Render3D; ok3d = true; }
      catch (e) { console.error("3D init failed, falling back to 2D:", e); }
    }
    if (!ok3d) {
      Render = Render2D;
      const g3 = document.getElementById("cv3d");
      if (g3) g3.style.display = "none";
      Render.init(document.getElementById("cv"), Game);
    }
    UI.init(Game);
    Game.alert(Game.map.name + " — " + FACTIONS[fac].short + " DEPLOYMENT", "good");
    const foes = Game.players.filter(p => p.isAI && !Game.allied(Game.human, p));
    if (foes.length > 1)
      Game.alert(foes.length + " HOSTILE COMMANDERS: " +
        foes.map(p => FACTIONS[p.faction].short + " (" + AI.personalityName(p.personality) + ")").join(", "), "bad");
    Game.alert("BUILD POWER, THEN A REFINERY. HARVESTERS FUND THE WAR.");

    lastT = performance.now(); acc = 0;
    cancelAnimationFrame(raf);
    loop(lastT);
  }

  /* a loaded save replaces the live Game object: re-point the renderer and UI */
  window.Main = {
    rebind(G) {
      const want3d = (document.getElementById("opt-3d") || { value: "1" }).value === "1";
      let ok = false;
      if (want3d && window.THREE) {
        try { Render3D.init(document.getElementById("cv"), G); Render = Render3D; ok = true; }
        catch (e) { console.error("3D re-init failed:", e); }
      }
      if (!ok) { Render = Render2D; Render.init(document.getElementById("cv"), G); }
      UI.init(G);
    },
  };

  function loop(t) {
    raf = requestAnimationFrame(loop);
    let dt = (t - lastT) / 1000;
    lastT = t;
    if (dt > 0.25) dt = 0.25;                    // background tab hiccup guard

    try {
      /* fixed-step simulation at SIM_HZ * game speed */
      acc += dt * Game.speed;
      let steps = 0;
      while (acc >= CFG.DT && steps < 8) {
        Game.tick(CFG.DT);
        acc -= CFG.DT; steps++;
      }
      if (steps === 8) acc = 0;                  // dropped frames: stay real-time

      Render.draw(dt, UI.input);
      UI.frame(dt);
    } catch (e) {
      /* surface the failure on screen instead of dying to a black canvas */
      if (window.__errs) window.__errs.push(String(e.message || e));
      if (window.__errors) window.__errors.push(String(e.message || e));
      const box = document.getElementById("errbox");
      if (box) {
        box.textContent = "GAME ERROR — send this to the developer:\n" +
          (e.message || e) + "\n" + String(e.stack || "").split("\n").slice(0, 3).join("\n");
        box.style.display = "block";
        box.style.pointerEvents = "none";
      }
    }
  }
})();
