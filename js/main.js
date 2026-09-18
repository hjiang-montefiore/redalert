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

  /* ================= THE SLOT LIST =================
     Borrowed from Red Alert's skirmish screen: the opposition is a LIST OF
     COMMANDERS, not a count. Each row carries a side, a team letter, a
     colour and - for a computer commander - a skill and a doctrine, and the
     TEAM LETTER is the only thing that decides who is allied with whom.
     ALL OF IT IS OPTIONAL. A page with no #slot-list - which is every
     headless harness, each carrying its own copy of this menu frozen at an
     older shape - falls through to the old "Opponents" count and must build
     exactly the roster it always did. That is what buildRoster() is for:
     one builder, two routes, so the two cannot drift apart. */
  const SLOT_MAX = 6;                   // you and five others: today's maximum
  const TEAM_LETTERS = ["A", "B", "C", "D", "E", "F"];
  /* The colours a commander may be painted in instead of its faction's.
     Red Alert offers a small fixed palette and gives each colour to one
     player only; this is ours, in this game's muted register rather than
     Red Alert's primaries.
     EVERY ENTRY IS AT LEAST 50 UNITS OF RGB DISTANCE FROM EVERY main IN
     CFG.FACTION_COLORS - measured, not eyeballed. Being a different hex is
     not enough: the first draft had Gold 17 units from the PLA's amber and
     Crimson 17 from the KPA's red, and at the size of a minimap dot 17 is
     the same colour. For scale, the closest pair the faction table itself
     ships is NATO and France at 27.5, so every one of these is nearly twice
     as far apart as a pair the game already asks you to tell apart. The
     worst here is Gold against the PLA at 51.2; the closest two entries in
     this table are Gold and Sand at 65.6. */
  const SLOT_COLORS = [
    { id: "gold",   name: "Gold",   main: "#d8cf55", dark: "#635e1c", light: "#f0edbe" },
    { id: "rose",   name: "Rose",   main: "#cc4f96", dark: "#591e3f", light: "#ecbcd7" },
    { id: "cyan",   name: "Cyan",   main: "#2cbcc0", dark: "#164c4e", light: "#aaeaec" },
    { id: "lime",   name: "Lime",   main: "#7fc23a", dark: "#354f1b", light: "#cee8b4" },
    { id: "violet", name: "Violet", main: "#8f56cc", dark: "#3c205a", light: "#d4bfec" },
    { id: "cobalt", name: "Cobalt", main: "#2f56b8", dark: "#17254a", light: "#abbce9" },
    { id: "slate",  name: "Slate",  main: "#99a9bb", dark: "#3b4754", light: "#d8dee5" },
    { id: "sand",   name: "Sand",   main: "#bf9463", dark: "#543e26", light: "#e7d6c4" },
  ];
  const paletteById = (id) =>
    (id ? SLOT_COLORS.filter(c => c.id === id)[0] || null : null);

  /* ---- the roster the battle is fought with ----
     Pure but for the seeded generator, and exported as Skirmish.roster, so
     the regression suite can build a roster with no menu on the page. */
  function buildRoster(cfg) {
    const fac = cfg.fac || "nato";
    const facPool = FAC_ORDER.filter(f => f !== fac);
    /* the same generator, consumed in the same order, as this menu has
       always used: a seed that dealt a given set of opponents still does */
    const rnd = U.mulberry32(((cfg.seed || 0) >>> 0) ^ 0x9e3779b9);
    const persSel = cfg.pers || "mixed";
    /* "mixed" gives every commander a DIFFERENT doctrine so a multi-way war
       actually feels like several different opponents */
    const persPool = AI.personalities.slice();
    for (let i = persPool.length - 1; i > 0; i--) {          // deterministic shuffle
      const j = Math.floor(rnd() * (i + 1));
      const t = persPool[i]; persPool[i] = persPool[j]; persPool[j] = t;
    }
    let persN = 0;
    /* a doctrine named on the row wins and does NOT draw from the pool, so
       pinning one commander does not change what the others are dealt */
    const pickPers = (want) => (want ? want
      : persSel !== "mixed" ? persSel : persPool[persN++ % persPool.length]);
    const anyFac = () => facPool[Math.floor(rnd() * facPool.length)];
    const out = [];

    if (cfg.slots && cfg.slots.length) {
      /* THE SLOT LIST DECIDES. Note what is NOT done here: the old path
         flips the enemy's army when it matches yours, because two identical
         colours on one map are unreadable. Chosen sides are honoured as
         they are - two commanders may field the same army, the way Red
         Alert allows - and the colour pass keeps them apart instead. */
      const taken = {};
      cfg.slots.slice(0, SLOT_MAX).forEach((s, i) => {
        const pick = (s.color && !taken[s.color]) ? paletteById(s.color) : null;
        if (pick) taken[s.color] = true;
        const e = {
          faction: (s.faction && s.faction !== "random") ? s.faction
                 : (i === 0 ? fac : anyFac()),
          ai: i > 0,
          team: s.team || (i + 1),
        };
        if (i > 0) {
          e.diff = s.diff || cfg.diff;
          e.personality = pickPers(s.personality);
          e.handicap = cfg.handicap;
        }
        if (pick) e.color = { main: pick.main, dark: pick.dark, light: pick.light };
        out.push(e);
      });
      /* A SKIRMISH NEEDS TWO SIDES. Put every commander on one letter and
         G.checkVictory finds a single live team on its very first pass and
         hands you the battle before a shot is fired - and the briefing deals
         an empty enemy column on the way in. It is one dropdown away now;
         the old "Opponents" count could never reach it. The menu holds
         DEPLOY shut before you get here (refreshSlots); this is the same
         rule where the roster is actually made, for the save file, for the
         suite, and for anyone calling Skirmish.roster directly. The LAST
         commander is the one moved, so the seats set up deliberately keep
         the letters they were given.
         The MENU does not get this repair (cfg.preview): while the player
         still has a cursor on the dropdowns the screen must show what they
         set - six rows all saying ALLY - with the warning and a shut DEPLOY
         explaining why, not one row silently relabelled ENEMY against what
         its own select says. */
      if (!cfg.preview && out.length > 1 &&
          out.every(r => r.team === out[0].team))
        out[out.length - 1].team = out[0].team === 1 ? 2 : 1;
    } else {
      /* THE OLD COUNT, unchanged: what every headless harness still asks for */
      const oppSel = String(cfg.opponents || "1");
      const allyMode = oppSel.endsWith("t");
      const nEnemies = parseInt(oppSel, 10) || 1;
      let foe = cfg.foe || "pact";
      if (foe === fac) foe = fac === "nato" ? "pact" : "nato";
      out.push({ faction: fac, ai: false, team: 1 });
      if (allyMode)
        out.push({ faction: anyFac(), ai: true, team: 1, diff: cfg.diff,
                   personality: pickPers(), handicap: cfg.handicap });
      for (let i = 0; i < nEnemies; i++)
        out.push({ faction: i === 0 ? foe : anyFac(), ai: true,
                   team: allyMode ? 2 : (2 + i), diff: cfg.diff,
                   personality: pickPers(), handicap: cfg.handicap });
    }
    labelRoster(out);
    return out;
  }

  /* YOU, then the allies, then the enemies - the labels the battle reports
     with. They fall out of the team letters, so putting a commander on your
     team really does make it your ally and really does say so. The old
     shapes are reproduced exactly: one ally is "ALLY", enemies count up. */
  function labelRoster(list) {
    const mine = list.length ? list[0].team : 1;
    const allies = list.filter((r, i) => i > 0 && r.team === mine).length;
    let a = 0, e = 0;
    list.forEach((r, i) => {
      if (i === 0) { r.label = "YOU"; return; }
      if (r.team === mine) { a++; r.label = allies > 1 ? "ALLY " + a : "ALLY"; }
      else { e++; r.label = "ENEMY " + e; }
    });
  }

  /* The skill and doctrine lists are the ones already on this screen: read
     them off the two defaults so a slot row can never offer something the
     rest of the menu does not. The explanatory half of each label is cut at
     the em dash, because a slot column is narrow. */
  function shortOpts(id, dfltLabel) {
    const out = [["", dfltLabel]];
    const src = document.getElementById(id);
    const opts = src && src.options;
    if (!opts) return out;
    for (let i = 0; i < opts.length; i++) {
      if (opts[i].value === "mixed") continue;        // "mixed" IS the default
      out.push([opts[i].value,
                String(opts[i].textContent).split("—")[0].trim()]);
    }
    return out;
  }

  const slotList = document.getElementById("slot-list");
  /* The two cells #opt-fac and #opt-foe are injected into. They are kept as
     references because this file BUILDS them: asking the document for an
     element we are holding buys nothing, and read once at load it cannot go
     stale. A page with no slot list leaves them null and the lookup below
     finds its own markup instead. */
  let facCellMe = null, facCellThem = null;

  /* A row is BUILT, not written out as markup, because it is also READ back
     through querySelector - and a row that only ever existed as a string of
     HTML is a row no test can read. */
  const mk = (tag, cls, parent) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (parent) parent.appendChild(el);
    return el;
  };
  const mkSel = (cls, parent, list, sel) => {
    const s = mk("select", cls, parent);
    for (const o of list) {
      const opt = document.createElement("option");
      opt.value = o[0];
      opt.textContent = o[1];
      if (o[0] === sel) opt.selected = true;
      s.appendChild(opt);
    }
    s.value = sel;
    return s;
  };

  /* One commander's row. `live` marks a row being built for the REAL menu;
     `team` is the letter it starts on. */
  function slotRow(i, live, team) {
    const row = mk("div", "srow");
    mk("span", "sname", row);                 // refreshSlots names it
    const side = mk("div", "scell", row);
    if (i < 2) {
      /* Rows one and two hold the two faction pickers the rest of the
         screen already speaks about - #opt-fac and #opt-foe - which are
         injected into these cells a few lines below. A side is still chosen
         in exactly one place; it is simply this place now.
         ONLY A LIVE ROW takes the id and the reference. Skirmish.row is
         public and the suite builds throwaway rows with it: without this
         guard those calls would point the menu's own faction cell at a
         detached element and, in a browser, put a second #fac-slot-me in
         the document. */
      if (live) {
        side.id = i === 0 ? "fac-slot-me" : "fac-slot-them";
        if (i === 0) facCellMe = side; else facCellThem = side;
      }
    } else {
      mkSel("slot-fac", side, [["random", "Random army"]].concat(
        FAC_ORDER.map(k => [k, FACTIONS[k].name])), "random");
    }
    mkSel("slot-team", row, TEAM_LETTERS.map((L, t) => [String(t + 1), L]),
          String(team || Math.min(i, TEAM_LETTERS.length - 1) + 1));
    const col = mk("div", "scol", row);
    mk("i", "schip", col);
    mkSel("slot-col", col, [["", "Faction colours"]].concat(
      SLOT_COLORS.map(c => [c.id, c.name])), "");
    if (i === 0) {
      /* you have no skill setting and no doctrine: you are the doctrine */
      mk("span", "sdash", row).textContent = "—";
      mk("span", "sdash", row).textContent = "—";
    } else {
      mkSel("slot-diff", row, shortOpts("opt-diff", "Default skill"), "");
      mkSel("slot-pers", row, shortOpts("opt-pers", "Default doctrine"), "");
    }
    /* the first opponent cannot be dismissed - a skirmish needs one */
    if (i >= 2) {
      const b = mk("button", "slot-del", row);
      b.type = "button";
      b.title = "Remove this commander";
      b.textContent = "×";
      /* on the button itself rather than delegated from the list: the row it
         dismisses is the one it was built in, and nothing has to go looking */
      b.addEventListener("click", () => {
        const par = row.parentElement;
        if (par && par.removeChild) par.removeChild(row);
        refreshSlots(par);
      });
    } else {
      mk("span", "", row);                    // hold the column open
    }
    return row;
  }

  /* The lowest letter no row is on. Taking the row COUNT instead skips a
     letter a dismissal has freed: rows on A, B, C and D, dismiss the C, and
     the next commander added lands on D beside the one already there - a
     1v1v2 the player did not ask for and the screen does not say. */
  function freeTeam(list) {
    const used = {};
    (readSlots(list) || []).forEach(s => { used[s.team] = true; });
    for (let t = 1; t <= TEAM_LETTERS.length; t++) if (!used[t]) return t;
    return TEAM_LETTERS.length;             // every letter is spoken for
  }

  /* what the rows currently say, in the shape buildRoster wants. `root` is
     for the suite, which builds a list of rows without a menu around it. */
  function readSlots(root) {
    const list = root || slotList;
    if (!list) return null;                 // an older page: the count decides
    const rows = list.querySelectorAll(".srow");
    if (!rows || !rows.length) return null;
    const v = (row, sel) => { const el = row.querySelector(sel); return el ? el.value : ""; };
    const out = [];
    for (let i = 0; i < rows.length; i++)
      out.push({
        faction: v(rows[i], ".slot-fac"),
        team: parseInt(v(rows[i], ".slot-team"), 10) || (i + 1),
        color: v(rows[i], ".slot-col"),
        diff: v(rows[i], ".slot-diff"),
        personality: v(rows[i], ".slot-pers"),
      });
    return out;
  }

  /* row labels, colour chips, the colours a row may no longer take, and
     whether this is a skirmish at all */
  function refreshSlots(list) {
    list = list || slotList;
    if (!list) return;
    const rows = list.querySelectorAll(".srow");
    const slots = readSlots(list) || [];
    /* the labels this roster will really be reported with, from the one
       function that decides them */
    const roster = buildRoster({ slots, preview: true,
                                 fac: (slots[0] || {}).faction || "nato",
                                 pers: "mixed", diff: "regular", handicap: 1, seed: 0 });
    /* THE CHIP SHOWS THE COLOUR THIS COMMANDER DEPLOYS IN, which is not
       always the one the row asks for: two commanders of one army are moved
       apart, and a colour someone else has taken is refused. Painting
       CFG.FACTION_COLORS straight onto the chip showed two French
       commanders as two identical blue squares and then deployed them in
       different blues. CFG.resolveColors decides it here and in Game.init
       alike, so the chip cannot disagree with the map. */
    const cols = CFG.resolveColors
      ? CFG.resolveColors(roster.map(r => ({ faction: r.faction, color: r.color })))
      : [];
    const claimed = {};
    for (const s of slots) if (s.color) claimed[s.color] = true;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i], e = roster[i] || {};
      const name = row.querySelector(".sname");
      if (name) name.textContent = e.label || "";
      row.className = "srow " + (i === 0 ? "you"
        : e.team === (roster[0] || {}).team ? "ally" : "foe");
      const chip = row.querySelector(".schip");
      if (chip) {
        /* a row that has named neither an army nor a colour has nothing to
           show yet: its army is dealt when DEPLOY is pressed */
        const s = slots[i] || {};
        const known = !!(s.color || (s.faction && s.faction !== "random"));
        chip.style.background = known && cols[i] ? cols[i].main : "#5c6657";
      }
      /* a colour belongs to one commander: what another row has taken is
         greyed out, which is how Red Alert says the same thing */
      const sel = row.querySelector(".slot-col");
      if (sel && sel.options) {
        const own = (slots[i] || {}).color;
        for (let o = 0; o < sel.options.length; o++) {
          const opt = sel.options[o];
          opt.disabled = !!opt.value && opt.value !== own && !!claimed[opt.value];
        }
      }
    }
    const add = list.__slotAdd;
    if (add) add.disabled = rows.length >= SLOT_MAX;
    /* A SKIRMISH NEEDS TWO SIDES - say so, and hold DEPLOY until one of
       them is moved off. See the same rule in buildRoster. */
    const sides = {};
    let nSides = 0;
    for (const s of slots) if (!sides[s.team]) { sides[s.team] = 1; nSides++; }
    const oneSide = rows.length > 1 && nSides < 2;
    const warn = document.getElementById("slot-warn");
    if (warn) warn.textContent = oneSide
      ? "Every commander is on team " +
        (TEAM_LETTERS[((slots[0] || {}).team || 1) - 1] || "A") +
        " — a skirmish needs two sides."
      : "";
    /* only the page's own list may touch the page's own DEPLOY button */
    const go = document.getElementById("btn-start");
    if (go && list === slotList) go.disabled = oneSide;
  }

  /* Put a slot list on a page: two commanders to begin with - you and one
     opponent, which is exactly today's skirmish - and everything that can
     change it wired up. A function rather than a block at load so the
     regression suite can mount one on a container of its own and work the
     real buttons; it passes live = false, and only a live list claims the
     menu's faction cells or its DEPLOY button. */
  function mountSlots(list, addBtn, live) {
    if (!list) return null;
    /* the button belongs to this list, so the list carries it: a delete
       handler inside a row has no other way to be told which it is */
    list.__slotAdd = addBtn || null;
    list.appendChild(slotRow(0, live));
    list.appendChild(slotRow(1, live));
    /* one listener for the whole list: every select in it changes the same
       things - the labels, the chips, the colours still on offer, whether
       another commander may be added and whether DEPLOY is allowed */
    list.addEventListener("change", () => refreshSlots(list));
    if (addBtn) addBtn.addEventListener("click", () => {
      const rows = list.querySelectorAll(".srow");
      if (rows.length >= SLOT_MAX) return;
      list.appendChild(slotRow(rows.length, live, freeTeam(list)));
      refreshSlots(list);
    });
    refreshSlots(list);
    return list;
  }

  if (slotList) mountSlots(slotList, document.getElementById("btn-slot-add"), true);

  /* the pre-battle screen, for the regression suite: it builds rows, lists
     and rosters with no menu on the page at all */
  window.Skirmish = { roster: buildRoster, read: readSlots, row: slotRow,
                      mount: mountSlots, refresh: refreshSlots, freeTeam,
                      COLORS: SLOT_COLORS, MAX: SLOT_MAX, TEAMS: TEAM_LETTERS };

  /* The faction pickers belong at the head of the order of battle, beside the
     era and the tech ceiling, because picking a side is the same kind of
     decision and the screen now lays those out as you-against-enemy. The
     deployment screen provides the two slots; if it ever does not, fall back
     to inserting rows the old way so this cannot break the menu outright. */
  /* the slot list's own cells if this page has one, else the two the page
     laid out itself - which is every headless harness */
  const slotMe = facCellMe || document.getElementById("fac-slot-me");
  const slotThem = facCellThem || document.getElementById("fac-slot-them");
  let blurb;
  if (slotMe && slotThem) {
    /* `slot-fac` so readSlots finds them: in the slot list these two ARE
       the first two rows' side pickers */
    slotMe.innerHTML = '<select id="opt-fac" class="slot-fac">' + facOptions("nato") + "</select>";
    slotThem.innerHTML = '<select id="opt-foe" class="slot-fac">' + facOptions("pact") + "</select>";
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
  /* now that the two faction pickers exist, the slot rows can be read */
  refreshSlots();

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
  /* a briefing is up and the battle behind it is still being raised */
  let briefing = false;

  /* ---- who sees the deployment briefing ----
     Only a person who pressed DEPLOY. Every harness page drives this same
     function with a scripted click() and some read Game on the very next
     line (_aicensus.html takes Game.players[0] at once), so for them the
     battle must exist by the time click() returns, exactly as before. A
     scripted click is an untrusted event and a real one never is, which is
     the one difference between the two that needs nothing from the page.
     A page can still ask for the briefing with #loadscreen (add #loadhold to
     keep it up for a screenshot) or refuse it with #noloadscreen, and a page
     without the briefing's script and markup - every harness page today -
     never gets it at all. */
  function wantBriefing(ev) {
    if (typeof LoadScreen === "undefined" || !LoadScreen.available()) return false;
    const h = location.hash || "";
    if (/[#&]noloadscreen\b/.test(h)) return false;
    if (/[#&]loadscreen\b/.test(h)) return true;
    return !!(ev && ev.isTrusted);
  }

  function start(ev) {
    if (briefing) return;
    const pv = document.getElementById("opt-pan");
    if (pv && UI.setPanMode) UI.setPanMode(pv.value);
    const seedStr = document.getElementById("opt-seed").value.trim();
    let seed = seedStr ? U.hashStr(seedStr) : (Math.random() * 0xffffffff) >>> 0;
    /* ---- a theatre the player drew ----
       The map editor arms one; until it does this is null and nothing below
       changes at all. An edited map carries its own theatre, seed, ore density
       and grid size - its overrides are indices into a grid of exactly that
       shape - so those four replace what the boxes say.
       THE EDITOR IS OPTIONAL MARKUP. Every harness page carries a frozen copy
       of this menu and no editor at all, so on those pages MapEdit does not
       exist, this is null, and DEPLOY behaves exactly as it always has. */
    const edit = (typeof MapEdit !== "undefined" && MapEdit.armed) ? MapEdit.armed() : null;
    if (edit) seed = edit.seed >>> 0;
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
    if (edit) {
      opts.edit = edit;
      opts.theatre = edit.th;
      opts.resources = edit.rich;
      opts.mapSize = edit.size;
    }

    /* ---- build the commander roster ----
       The slot list when this page has one; the "Opponents" count when it
       does not, which is every headless harness. Both go through the one
       builder above, so neither can quietly stop matching the other. */
    const persSel = pick("opt-pers", "mixed");
    opts.roster = buildRoster({
      slots: readSlots(), fac, foe,
      opponents: pick("opt-opponents", "1"),
      pers: persSel, diff: opts.diff, handicap: opts.aiHandicap, seed,
    });
    const nAI = opts.roster.filter(r => r.ai).length;
    /* The army of the first hostile commander, named off the roster that was
       ACTUALLY built. `foe` above is the count path's answer, complete with
       its "if the enemy picked your army, flip it" rule, and the slot list
       never sees it: set both of the first two rows to NATO and the battle
       is NATO against NATO (Red Alert allows it) while foe still said
       "pact" - an army nobody on the map fields. It is not a passing lie
       either: opts is copied into every save file, and Game.init and
       loading.js both fall back on opts.factionAI when a roster is absent. */
    const firstFoe = opts.roster.filter(r =>
      r.ai && r.team !== opts.roster[0].team)[0];
    opts.factionAI = firstFoe ? firstFoe.faction : foe;

    menu.classList.add("hidden");
    gameEl.classList.remove("hidden");

    /* ---- raising the battle ----
       This was one run inside the click, which is why nothing reached the
       screen between DEPLOY and a finished battlefield. The same work as
       steps, in the same order, can still run back to back - the harness
       path, identical in effect to what it replaced - or be spaced out by
       the briefing, which lets the browser paint between them. */
    const want3d = (document.getElementById("opt-3d") || { value: "1" }).value === "1";
    const raiseRenderer = () => {
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
    };
    const announce = () => {
      Game.alert(Game.map.name + " — " + FACTIONS[fac].short + " DEPLOYMENT", "good");
      const foes = Game.players.filter(p => p.isAI && !Game.allied(Game.human, p));
      if (foes.length > 1)
        Game.alert(foes.length + " HOSTILE COMMANDERS: " +
          foes.map(p => FACTIONS[p.faction].short + " (" + AI.personalityName(p.personality) + ")").join(", "), "bad");
      Game.alert("BUILD POWER, THEN A REFINERY. HARVESTERS FUND THE WAR.");
    };
    const begin = () => {
      lastT = performance.now(); acc = 0;
      cancelAnimationFrame(raf);
      loop(lastT);
    };
    const deployNow = () => {
      Game.init(opts);
      raiseRenderer();
      UI.init(Game);
      announce();
      begin();
    };

    if (!wantBriefing(ev)) { deployNow(); return; }

    /* The battle clock starts when the briefing goes, not when the world is
       ready: a commander that spent the briefing building would be ahead of
       a player who spent it reading. The alerts wait too, or they would
       fade out behind the screen. The world is drawn once while still
       covered, so the reveal does not open on a frame spent compiling. */
    briefing = true;
    try {
      LoadScreen.run({
        opts,
        /* the opening alerts name every doctrine in a multi-way war, and a
           doctrine the player picked is no secret; otherwise it stays hidden */
        doctrine: persSel !== "mixed" || nAI > 1,
        stages: [
          { label: "Surveying the theatre", weight: 40,
            run: () => { Game.init(opts); LoadScreen.adopt(Game.players); } },
          { label: want3d && window.THREE ? "Raising the 3D battlefield" : "Drawing the battlefield",
            weight: 32, run: raiseRenderer },
          { label: "Issuing equipment", weight: 16, run: () => UI.init(Game) },
          { label: "Final checks", weight: 12,
            run: () => { try { Render.draw(0, UI.input); } catch (e) { /* the loop reports it */ } } },
        ],
        onReveal: () => { briefing = false; announce(); begin(); },
        onAbort: () => { briefing = false; },
      });
    } catch (e) {
      /* the briefing could not even be put up: deploy the way it always did */
      console.error("loading screen failed, deploying without it:", e);
      briefing = false;
      deployNow();
    }
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
