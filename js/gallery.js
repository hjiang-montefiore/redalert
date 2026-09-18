/* ============ gallery.js — the field manual ============
   A browsable record of everything the game can put on a battlefield: every
   unit of every army in every period, and every structure, shown with the
   model the battlefield itself will draw, the real designation and date,
   what it costs and what it needs, what it shoots - and, read off the same
   tables the guns read, what its rounds do to each class of armour and what
   class of round undoes it.

   Red Alert's database was a picture and a paragraph. This one can do more
   because almost nothing here is prose: CFG.DMG, the weapons' own `tgt`
   blocks and the UNITS/BUILDINGS rows ARE what combat.js reads, so a page
   that disagreed with the battlefield would be a bug rather than a typo. The
   one piece of prose - the record and the fact line - is the deployment
   briefing's, asked of LoadScreen rather than written a second time here.

   It is a READER, and that is a hard rule. It never ticks the game, never
   touches Game.paused and never changes a menu setting, so opening it from
   the pause menu and closing it again leaves the screen underneath exactly
   as it was.

   Every element it binds to is OPTIONAL. The panel builds itself into
   #gallery, or makes that element if the page has none, and the two ways in
   (#btn-gallery, #pm-gallery) are bound only where they exist - so a page
   carrying an older copy of the menu markup, which every harness page does,
   still starts a match and simply has no manual.                          */
var Gallery = (function () {
  /* The army order the deployment menu uses. Deliberately the same: a player
     who picked an army third in one list should find it third in the other.
     An army not named here is appended, so a new faction appears with no
     edit to this file. */
  const FAC_ORDER = ["nato", "gbr", "fra", "deu", "pact", "pla", "kpa", "roc"];

  /* The deployment briefing names most roles in plain words already, and
     asking it keeps one list rather than two that drift. It does NOT name
     the support roles, because a briefing card never deals one - these are
     the 110 machines (tankers, AEW, airlift, radar vehicles, supply, the
     rigs) that would otherwise show their raw table id in the list rail.
     Consulted only after LoadScreen has been asked. */
  const ROLE_WORD = {
    awacs: "Airborne early warning", cawacs: "Carrier-borne early warning",
    airlift: "Transport aircraft", tanker: "Aerial tanker",
    radarv: "Radar vehicle", supply: "Supply truck",
    transport_sea: "Landing ship", oiler: "Replenishment oiler",
    mcv: "Construction vehicle", harvester: "Ore hauler",
    repair: "Repair vehicle", repair_sea: "Repair ship",
    engineer: "Engineer", medic: "Medic",
  };
  /* ...and for a structure, which has no role at all: the class it is in,
     spelled as a word rather than as the table's own lowercase key. */
  const CAT_WORD = {
    building: "Structure", defense: "Defence", civilian: "Civilian structure",
    infantry: "Infantry", vehicle: "Vehicle", aircraft: "Aircraft", naval: "Vessel",
  };

  /* Plain words for CFG.ARMOR's six classes. The table's ids are shorthand
     for the people balancing it; "wall" on a record page reads as a typo. */
  const ARMOUR_WORD = {
    infantry: "Infantry", light: "Light armour", heavy: "Heavy armour",
    structure: "Structures", wall: "Barriers", air: "Aircraft",
  };
  /* ...and for CFG.DMG's warhead rows: what the round IS. */
  const WARHEAD_WORD = {
    bullet: "Ball and autocannon", cannon: "Kinetic penetrator", he: "High explosive",
    frag: "Artillery fragmentation", heat: "Shaped charge", flak: "Proximity-fused AA",
    nuclear: "Nuclear",
  };
  /* the four sets a weapon's `tgt` block can name */
  const TGT_WORD = { ground: "ground", air: "aircraft", sea: "surface ships", sub: "submerged" };
  const TGT_KEYS = ["ground", "air", "sea", "sub"];
  const TECH_NUM = ["", "I", "II", "III"];
  /* Every class the tables use, INCLUDING civilian - the map's blocks and
     rubble are things a player can shoot, and if they are in the manual at
     all they must be reachable by a filter, or the class counts do not add
     up to the "every class" count and two entries look mislaid. */
  const CATS = [
    ["", "Every class"],
    ["infantry", "Infantry"], ["vehicle", "Vehicles"], ["aircraft", "Aircraft"],
    ["naval", "Ships and submarines"], ["building", "Structures"], ["defense", "Defences"],
    ["civilian", "Civilian and scenery"],
  ];
  /* Every comparison bar in the manual is on ONE scale rather than
     normalised per record - otherwise a rifle's best row would look like a
     tank gun's. The scale is the largest figure in CFG.DMG, READ OFF the
     table rather than typed here, so a new warhead with a bigger number
     cannot quietly push four rows off the end of the bar. Worked out on
     first use: a page may load this file before config.js. */
  let barMax = 0;
  function barScale() {
    if (barMax) return barMax;
    barMax = 1;
    const T = (typeof CFG !== "undefined" && CFG.DMG) || {};
    for (const wh in T) for (const a in T[wh]) if (T[wh][a] > barMax) barMax = T[wh][a];
    return barMax;
  }

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s === undefined || s === null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const money = (n) => "$" + (typeof U !== "undefined" && U.fmt ? U.fmt(n) : String(n));
  const num = (n, d) => Number(n || 0).toFixed(d);
  function rgba(hex, a) {
    const n = parseInt(String(hex || "#6f9c46").slice(1), 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }

  let root = null, built = false, shown = false;
  let restore = null;              // the screen to put back when we close
  let refocus = null;              // the element that had focus before we opened
  let ids = [], rowEls = [], sel = null;  // the filtered list, its rows, the entry on show
  let marked = -1;                 // which row currently wears the lime bar
  let rec = null;                  // the record object the panel last printed
  let anim = 0, lastT = 0, qTimer = 0;
  /* The turntable is made ONCE and kept: see paintPicture. standId/standCol
     are what it is currently showing, so walking the list with the arrow keys
     swaps a model instead of rebuilding a renderer. standDead latches when
     the borrowed turntable has thrown, the way loading.js's own glFailed
     does - one failure, not one per keypress. */
  let stand = null, standCv = null, standId = null, standCol = null, standDead = false;

  /* ---------------- reading the tables ---------------- */
  /* An entry is a unit id or a structure id; `kind` says which table to
     read. Structures are in because "everything in the game" has to include
     the SAM site that shoots the aircraft on the previous page. */
  function defOf(id, kind) {
    return kind === "unit" ? (typeof UNITS !== "undefined" && UNITS[id])
                           : (typeof BUILDINGS !== "undefined" && BUILDINGS[id]);
  }
  function factionName(f) {
    if (f === undefined || f === "both") return "Every army";
    return (typeof FACTIONS !== "undefined" && FACTIONS[f] && FACTIONS[f].short) || f;
  }
  /* The periods a row is actually fielded in, spelled with the SAME two
     defaults inEra() applies - an entry with no from/to is present-day only,
     which is not what "untagged" looks like from the outside. */
  function eraSpan(def) {
    if (typeof ERAS === "undefined") return "";
    const last = ERAS.length - 1;
    const fi = def.from !== undefined ? eraIndex(def.from) : last;
    const ti = def.to !== undefined ? eraIndex(def.to) : last;
    const nm = (i) => (ERA_INFO[ERAS[i]] && ERA_INFO[ERAS[i]].name) || ERAS[i];
    if (fi <= 0 && ti >= last) return "every period";
    return fi === ti ? nm(fi) : nm(fi) + " to " + nm(ti);
  }
  /* The briefing first, because its list is the one the deployment screen
     already shows the player; ROLE_WORD for the support roles it has no
     card for; then the class as a word. A raw table id is the last resort
     and should never be reached by anything in today's roster. */
  function roleWord(def) {
    if (typeof LoadScreen !== "undefined" && LoadScreen.roleTitle) {
      const t = LoadScreen.roleTitle(def.role);
      if (t) return t;
    }
    if (def.role && ROLE_WORD[def.role]) return ROLE_WORD[def.role];
    if (!def.role && CAT_WORD[def.cat]) return CAT_WORD[def.cat];
    return String(def.role || def.cat || "").replace(/_/g, " ");
  }
  function weaponsOf(def) {
    const out = [];
    for (const wid of def.weapons || []) {
      const W = typeof WEAPONS !== "undefined" ? WEAPONS[wid] : null;
      if (W) out.push(W);
    }
    return out;
  }

  /* ---------------- the filter ---------------- */
  function filter() {
    return {
      fac: ($("gal-fac") || {}).value || "",
      era: ($("gal-era") || {}).value || "",
      cat: ($("gal-cat") || {}).value || "",
      q: String(($("gal-q") || {}).value || "").trim().toLowerCase(),
    };
  }
  function matches(id, def, f) {
    if (f.cat && def.cat !== f.cat) return false;
    /* A structure with no `fac` belongs to every army, which is how
       Player.lockReason reads it; a unit's "both" says the same thing. */
    if (f.fac && def.fac !== undefined && def.fac !== "both" && def.fac !== f.fac) return false;
    if (f.era && typeof inEra === "function" && !inEra(def, f.era)) return false;
    if (f.q) {
      const F = (typeof FACTS !== "undefined" && FACTS[id]) || null;
      const hay = (id + " " + (def.name || "") + " " + (def.full || "") + " " +
                   ((F && F.name) || "") + " " + ((F && F.origin) || "") + " " +
                   roleWord(def)).toLowerCase();
      if (hay.indexOf(f.q) < 0) return false;
    }
    return true;
  }
  /* Everything the filter admits, ordered class then name, so the list reads
     like an inventory rather than like a hash table. */
  const CAT_ORDER = { infantry: 0, vehicle: 1, aircraft: 2, naval: 3, building: 4,
                      defense: 5, civilian: 6 };
  function collect(f) {
    const out = [];
    if (typeof UNITS !== "undefined")
      for (const id in UNITS) {
        const d = UNITS[id];
        if (d && matches(id, d, f)) out.push({ id: id, kind: "unit", def: d });
      }
    if (typeof BUILDINGS !== "undefined")
      for (const id in BUILDINGS) {
        const d = BUILDINGS[id];
        if (d && matches(id, d, f)) out.push({ id: id, kind: "building", def: d });
      }
    out.sort((a, b) => {
      const ca = CAT_ORDER[a.def.cat] === undefined ? 9 : CAT_ORDER[a.def.cat];
      const cb = CAT_ORDER[b.def.cat] === undefined ? 9 : CAT_ORDER[b.def.cat];
      if (ca !== cb) return ca - cb;
      const na = String(a.def.name || a.id), nb = String(b.def.name || b.id);
      if (na !== nb) return na < nb ? -1 : 1;
      return a.id < b.id ? -1 : 1;
    });
    return out;
  }

  /* ---------------- what it kills, and what kills it ----------------
     Both blocks are arithmetic over CFG.DMG and the weapons' own `tgt`
     blocks. Nothing here is an opinion about the machine: the opinion is
     already in the balance table, and this only reads it back out. */

  /* A weapon can put its warhead onto a class of armour only if its `tgt`
     block lets it engage something wearing that class. Aircraft wear `air`;
     everything else is reached by a weapon that can shoot at the ground or
     at surface ships, because a warship's plate is `heavy` or `light` too. */
  function reaches(W, armour) {
    if (!W || !W.tgt) return false;
    if (armour === "air") return !!W.tgt.air;
    return !!(W.tgt.ground || W.tgt.sea);
  }
  /* the best multiplier this armament can bring to each class of armour */
  function effect(def) {
    const ws = weaponsOf(def), out = [];
    for (const a of (CFG.ARMOR || [])) {
      let best = 0, by = null;
      for (const W of ws) {
        if (!reaches(W, a)) continue;
        const m = CFG.dmgMult(W.warhead, a);
        if (m > best) { best = m; by = W.warhead; }
      }
      out.push({ armour: a, word: ARMOUR_WORD[a] || a, mult: best, by: by });
    }
    return out;
  }
  /* ...and what every class of warhead does to ITS armour */
  function threat(def) {
    const a = def.armor || "structure", out = [];
    for (const wh in (CFG.DMG || {}))
      out.push({ warhead: wh, word: WARHEAD_WORD[wh] || wh, mult: CFG.dmgMult(wh, a) });
    out.sort((x, y) => y.mult - x.mult);
    return out;
  }
  /* What one weapon cycle of `W` is worth against armour class `armour`:
     listed damage times the burst times the hit chance times the warhead's
     multiplier, over the time the cycle takes. The same four numbers
     combat.js multiplies, arranged as a rate. */
  function cycleWorth(W, armour) {
    const cyc = Math.max(0.4, (W.reload || 1) + ((W.burst || 1) - 1) * (W.burstDelay || 0));
    return (W.dmg || 0) * (W.burst || 1) * (W.acc === undefined ? 1 : W.acc) *
           CFG.dmgMult(W.warhead, armour) / cyc;
  }
  /* The machines that actually carry the rounds that get through. Thinned to
     one entry per role, so the answer is five different ideas rather than
     four marks of the same tank, and to OTHER armies: "what kills it" is a
     question about the opposition. */
  function counters(id, kind, def, era) {
    if (typeof UNITS === "undefined" || typeof CFG === "undefined") return [];
    const armour = def.armor || "structure";
    const layer = kind === "unit" ? (def.layer || "ground") : "ground";
    const key = TGT_KEYS.indexOf(layer) >= 0 ? layer : "ground";
    /* With no period chosen, judge the entry in the last period it serves: a
       2020s interceptor is not an answer to a 1950s bomber. */
    const when = era || (typeof ERAS !== "undefined"
      ? ERAS[def.to !== undefined ? eraIndex(def.to) : ERAS.length - 1] : null);
    const best = {};
    for (const oid in UNITS) {
      const o = UNITS[oid];
      if (!o || oid === id || !o.weapons || !o.weapons.length) continue;
      if (def.fac && def.fac !== "both" && o.fac === def.fac) continue;
      if (when && typeof inEra === "function" && !inEra(o, when)) continue;
      let score = 0, bw = null;
      for (const W of weaponsOf(o)) {
        if (!W.tgt || !W.tgt[key] || !(W.dmg > 0)) continue;
        const s = cycleWorth(W, armour);
        if (s > score) { score = s; bw = W; }
      }
      if (score <= 0) continue;
      const slot = o.role || o.cat || oid;
      if (!best[slot] || best[slot].score < score)
        best[slot] = { id: oid, def: o, w: bw, score: score };
    }
    return Object.keys(best).map(k => best[k])
      .sort((a, b) => b.score - a.score).slice(0, 5);
  }

  /* ---------------- the record ----------------
     One object, built from the tables, which the panel prints and the
     regression suite reads. There is no second path: what a test asserts
     about is literally what the page shows. */
  function recordFor(id, kind) {
    const def = defOf(id, kind);
    if (!def) return null;
    const F = (typeof FACTS !== "undefined" && FACTS[id]) || null;
    const said = (kind === "unit" && typeof LoadScreen !== "undefined" && LoadScreen.describe)
      ? LoadScreen.describe(id) : null;
    const arms = weaponsOf(def).map(W => {
      const cyc = Math.max(0.01, (W.reload || 1) + ((W.burst || 1) - 1) * (W.burstDelay || 0));
      const can = [], cannot = [];
      for (const k of TGT_KEYS) ((W.tgt && W.tgt[k]) ? can : cannot).push(TGT_WORD[k]);
      return {
        id: W.id || "", name: W.name || W.id || "weapon",
        dmg: W.dmg || 0, warhead: W.warhead || "", range: W.range || 0,
        minRange: W.minRange || 0, reload: W.reload || 0, burst: W.burst || 1,
        acc: W.acc === undefined ? 1 : W.acc, aoe: W.aoe || 0,
        intercept: !!W.intercept, can: can, cannot: cannot,
        rate: (W.dmg || 0) * (W.burst || 1) * (W.acc === undefined ? 1 : W.acc) / cyc,
      };
    });
    const seen = {}, blind = [];
    for (const a of arms) for (const w of a.can) seen[w] = 1;
    for (const k of TGT_KEYS) if (!seen[TGT_WORD[k]]) blind.push(TGT_WORD[k]);
    return {
      id: id, kind: kind, def: def,
      /* the designation FACTS carries, else the roster's own long name */
      name: (F && F.name) || (said && said.name) || def.full || def.name || id,
      shortName: def.name || id,
      origin: (F && F.origin) || def.origin || "",
      service: (F && F.service) || def.service || "",
      role: roleWord(def), cat: def.cat || "", fac: def.fac || "both",
      facName: factionName(def.fac), era: eraSpan(def),
      cost: def.cost || 0, oil: def.oil || 0, time: def.time || 0,
      hp: def.hp || 0, armour: def.armor || "", speed: def.speed || 0,
      sight: def.sight || 0, tech: def.tech || 1, power: def.power || 0,
      prereq: (def.prereq || []).map(p =>
        (typeof BUILDINGS !== "undefined" && BUILDINGS[p] && BUILDINGS[p].name) || p),
      weapons: arms, engages: Object.keys(seen), blind: blind,
      effect: effect(def), threat: threat(def),
      counters: counters(id, kind, def, filter().era),
      fact: (said && said.fact) || (F && F.note) || def.desc || "",
      /* Two different claims, and they are not interchangeable. FACTS'
         `confidence` grades the PUBLISHED FIGURES; a roster row's own grades
         how sure the roster is that this machine belongs in this slot. */
      conf: (F && F.confidence) || "",
      attrib: (!F && def.confidence) || "",
    };
  }

  /* ---------------- painting the record ---------------- */
  function bar(mult) {
    const w = Math.max(0, Math.min(100, (mult / barScale()) * 100));
    const cls = mult >= 0.85 ? "hi" : mult >= 0.4 ? "md" : "lo";
    return '<i class="gal-bar ' + cls + '"><b style="width:' + num(w, 1) + '%"></b></i>';
  }
  function statRow(k, v) {
    return '<div class="gal-stat"><span>' + esc(k) + "</span><b>" + esc(v) + "</b></div>";
  }
  function paintRecord(r) {
    const box = $("gal-rec");
    if (!box) return;
    if (!r) { box.innerHTML = '<div class="gal-empty">Nothing on this filter.</div>'; return; }
    const h = [];
    h.push('<div class="gal-head"><div class="gal-kicker">' +
      esc([r.facName, r.role, r.era].filter(Boolean).join(" · ")) +
      "</div><h3>" + esc(r.name) + "</h3>");
    const sub = [r.origin, r.service ? "in service " + r.service : ""].filter(Boolean);
    if (sub.length) h.push('<div class="gal-sub">' + esc(sub.join(" · ")) + "</div>");
    h.push("</div>");

    h.push('<div class="gal-stats">');
    h.push(statRow("Cost", r.cost ? money(r.cost) : "—"));
    if (r.oil) h.push(statRow("Fuel", r.oil + " bbl"));
    if (r.time) h.push(statRow("Build", num(r.time, 0) + " s"));
    if (r.power) h.push(statRow("Power", (r.power > 0 ? "+" : "") + r.power + " MW"));
    h.push(statRow("Hit points", r.hp || "—"));
    h.push(statRow("Armour", ARMOUR_WORD[r.armour] || r.armour || "—"));
    if (r.speed) h.push(statRow("Speed", num(r.speed, 2)));
    if (r.sight) h.push(statRow("Sight", num(r.sight, 1) + " tiles"));
    h.push(statRow("Tech", "Tech " + (TECH_NUM[r.tech] || r.tech)));
    h.push("</div>");
    if (r.prereq.length)
      h.push('<div class="gal-need"><span>Needs</span> ' + esc(r.prereq.join(" · ")) + "</div>");

    h.push("<h4>Armament</h4>");
    if (!r.weapons.length) h.push('<div class="gal-empty">Unarmed.</div>');
    for (const w of r.weapons) {
      const bits = ["range " + num(w.range, 1) + " tiles"];
      if (w.minRange) bits.push("blind inside " + num(w.minRange, 1));
      if (w.intercept) bits.push("interceptor — does no damage");
      else {
        bits.push(w.dmg + (w.burst > 1 ? " × " + w.burst : "") + " every " + num(w.reload, 1) + " s");
        bits.push(Math.round(w.acc * 100) + "% accurate");
      }
      if (w.aoe) bits.push("blast " + num(w.aoe, 1) + " tiles");
      h.push('<div class="gal-w"><div class="gal-wn">' + esc(w.name) +
        "<em>" + esc(w.warhead) + "</em></div>" +
        '<div class="gal-wd">' + esc(bits.join(" · ")) + "</div>" +
        '<div class="gal-wt">Engages ' + esc(w.can.join(", ") || "nothing") +
        (w.cannot.length ? " <s>" + esc(w.cannot.join(", ")) + "</s>" : "") + "</div></div>");
    }
    if (r.blind.length && r.weapons.length)
      h.push('<div class="gal-need"><span>Cannot touch</span> ' + esc(r.blind.join(" · ")) + "</div>");

    /* an unarmed machine has no rounds, and six empty rows saying so is
       noise; what kills it is still worth knowing, so that block stays */
    if (r.weapons.length) {
      h.push("<h4>What its rounds do</h4><div class=\"gal-cmp\">");
      for (const e of r.effect)
        h.push('<div class="gal-row"><span>' + esc(e.word) + "</span>" + bar(e.mult) +
          "<b>" + (e.mult ? "×" + num(e.mult, 2) : "—") + "</b></div>");
      h.push("</div>");
    }

    h.push("<h4>What gets through it</h4><div class=\"gal-cmp\">");
    for (const t of r.threat)
      h.push('<div class="gal-row"><span>' + esc(t.word) + "</span>" + bar(t.mult) +
        "<b>×" + num(t.mult, 2) + "</b></div>");
    h.push("</div>");

    if (r.counters.length) {
      h.push("<h4>Fielded against it</h4><ul class=\"gal-ct\">");
      for (const c of r.counters)
        h.push("<li><b>" + esc(c.def.name || c.id) + "</b><i>" + esc(factionName(c.def.fac)) +
          "</i><span>" + esc(c.w ? c.w.name : "") + "</span></li>");
      h.push("</ul>");
    }
    if (r.fact) h.push('<p class="gal-fact">' + esc(r.fact) + "</p>");
    const notes = [];
    if (r.conf && r.conf !== "high") notes.push("published figures: ~" + r.conf + " confidence");
    if (r.attrib && r.attrib !== "high") notes.push("roster attribution: " + r.attrib + " confidence");
    if (notes.length) h.push('<div class="gal-cf">' + esc(notes.join(" · ")) + "</div>");
    box.innerHTML = h.join("");
  }

  /* ---------------- the picture ----------------
     The deployment briefing's turntable, borrowed whole - same renderer,
     same colour fix, same fallback ladder. Where that module is not on the
     page the build menu's baked thumbnail is blitted instead, and where
     neither can be had the frame stays empty: a record without a picture is
     still a record. */
  function colourFor(fac) {
    if (typeof CFG === "undefined") return { main: "#6f9c46", dark: "#2b3d27" };
    return (CFG.FACTION_COLORS && CFG.FACTION_COLORS[fac]) ||
           (CFG.TEAM && CFG.TEAM[0]) || { main: "#6f9c46", dark: "#2b3d27" };
  }
  function dropStand() {
    if (stand) { try { stand.free(); } catch (e) {} }
    stand = null; standCv = null; standId = null; standCol = null;
  }
  /* The turntable is a WebGL context and a shader cache, so it is made ONCE
     and asked to swap models: show() already drops the old geometry and
     resets the slot. Freeing it per selection - which is what walking the
     list with an arrow key is - would dispose and re-create the renderer on
     every keypress, and repeated context loss is exactly how loading.js
     latches glFailed and loses the deployment briefing its models for the
     rest of the session. */
  function paintPicture(r) {
    const cv = $("gal-cv");
    if (!cv || !r) return;
    const col = colourFor(r.fac === "both" ? FAC_ORDER[0] : r.fac);
    const tag = $("gal-tag");
    if (tag) tag.textContent = r.facName + " · " + r.shortName;
    const pic = $("gal-pic");
    /* the plotting grid glows in the army's own map colour, as the briefing
       card's does */
    if (pic && pic.style && pic.style.setProperty)
      pic.style.setProperty("--glow", rgba(col.main, 0.22));
    if (stand && standCv !== cv) dropStand();   // the panel was rebuilt under us
    if (!standDead && !stand && typeof LoadScreen !== "undefined" && LoadScreen.stand) {
      try { stand = LoadScreen.stand(cv); standCv = cv; }
      catch (e) { stand = null; standCv = null; standDead = true; }
    }
    if (stand) {
      try {
        /* nothing to swap when the list re-paints on the same entry, which
           is what every keystroke in the search box does */
        if (r.id !== standId || col.main !== standCol) {
          stand.show(r.id, r.kind, col);
          standId = r.id; standCol = col.main;
        }
        stand.paint();
        return;
      } catch (e) { dropStand(); standDead = true; }
    }
    try {
      const im = (typeof Icons3D !== "undefined" && Icons3D.get)
        ? Icons3D.get(r.id, r.kind === "unit" ? "unit" : "building", col) : null;
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      if (!im || !im.width) return;
      const s = Math.min(cv.width / im.width, cv.height / im.height);
      ctx.drawImage(im, (cv.width - im.width * s) / 2, (cv.height - im.height * s) / 2,
                    im.width * s, im.height * s);
    } catch (e) { /* the picture is decoration; the record stands without it */ }
  }
  function frame(t) {
    if (!shown) return;
    anim = requestAnimationFrame(frame);
    if (!stand) return;
    const dt = Math.min(0.1, Math.max(0, (t - lastT) / 1000));
    lastT = t;
    try { stand.turn(dt); stand.paint(); } catch (e) { dropStand(); standDead = true; }
  }

  /* ---------------- the list ---------------- */
  function paintList() {
    const box = $("gal-list");
    if (!box) return;
    const rows = collect(filter());
    ids = rows.map(r => r.id);
    rowEls = [];
    box.innerHTML = "";
    for (const r of rows) {
      const li = document.createElement("div");
      li.className = "gal-item";
      li.dataset.id = r.id;
      const nm = document.createElement("b");
      nm.textContent = r.def.name || r.id;
      const sub = document.createElement("i");
      sub.textContent = factionName(r.def.fac) + " · " + roleWord(r.def);
      const pr = document.createElement("span");
      pr.textContent = r.def.cost ? money(r.def.cost) : "";
      li.appendChild(nm); li.appendChild(sub); li.appendChild(pr);
      box.appendChild(li);
      rowEls.push(li);            // kept so marking the selection is one row, not all of them
    }
    const c = $("gal-count");
    if (c) c.textContent = rows.length + (rows.length === 1 ? " entry" : " entries");
    if (!rows.length) { sel = null; rec = null; marked = -1; paintRecord(null); dropStand(); return; }
    /* keep the entry on show if the new filter still admits it */
    marked = -1;
    select(ids.indexOf(sel) >= 0 ? sel : ids[0]);
  }
  /* Touching only the row that loses the lime bar and the row that gains it
     matters: on "every army / every period" the list is over a thousand rows
     and this runs on every arrow keypress. */
  function markSelected() {
    const i = ids.indexOf(sel);
    if (marked === i) return;
    const off = rowEls[marked];
    if (off && off.classList) off.classList.remove("on");
    marked = i;
    const on = rowEls[i];
    if (!on || !on.classList) return;
    on.classList.add("on");
    if (on.scrollIntoView) try { on.scrollIntoView({ block: "nearest" }); } catch (e) {}
  }
  function select(id) {
    if (!id) return false;
    const kind = (typeof UNITS !== "undefined" && UNITS[id]) ? "unit" : "building";
    const r = recordFor(id, kind);
    if (!r) return false;
    sel = id; rec = r;
    paintRecord(r);
    paintPicture(r);
    markSelected();
    return true;
  }
  function step(n) {
    if (!ids.length) return;
    const i = ids.indexOf(sel);
    select(ids[Math.max(0, Math.min(ids.length - 1, (i < 0 ? 0 : i) + n))]);
  }

  /* ---------------- the frame ---------------- */
  const MARKUP =
    '<div class="gal-box">' +
      '<header class="gal-top">' +
        '<div><div class="gal-kicker">Field manual</div>' +
        "<h2>EQUIPMENT <span>RECORD</span></h2></div>" +
        '<button id="gal-close" type="button">CLOSE</button>' +
      "</header>" +
      '<div class="gal-body">' +
        '<div class="gal-side">' +
          '<div class="row"><label>Army</label><select id="gal-fac"></select></div>' +
          '<div class="row"><label>Period</label><select id="gal-era"></select></div>' +
          '<div class="row"><label>Class</label><select id="gal-cat"></select></div>' +
          '<div class="row"><label>Search</label><input id="gal-q" type="text" placeholder="name or designation"></div>' +
          '<div class="gal-count" id="gal-count"></div>' +
          '<div class="gal-keys">↑↓ move through the list · Esc closes</div>' +
        "</div>" +
        '<div class="gal-list" id="gal-list"></div>' +
        '<div class="gal-pane">' +
          '<div class="gal-pic" id="gal-pic"><canvas id="gal-cv"></canvas>' +
            '<span class="gal-tag" id="gal-tag"></span></div>' +
          '<div class="gal-rec" id="gal-rec"></div>' +
        "</div>" +
      "</div>" +
    "</div>";

  function fillSelect(id, pairs) {
    const s = $(id);
    if (!s) return;
    s.innerHTML = pairs.map(p =>
      '<option value="' + esc(p[0]) + '">' + esc(p[1]) + "</option>").join("");
  }
  function raise() {
    if (built) return !!root;
    /* The latch goes AFTER the guard, not before it: a raise() that could
       not build because the body is not there yet must be retried on the
       next open(), not remembered as a permanent failure. */
    if (typeof document === "undefined" || !document.body) return false;
    built = true;
    root = $("gallery");
    if (!root) {
      /* a page that carries no #gallery still gets one, so the manual is
         never a reason for a page to be edited - and it is the same modal
         the page in index.html declares, down to the aria */
      root = document.createElement("div");
      root.id = "gallery";
      root.setAttribute("role", "dialog");
      root.setAttribute("aria-modal", "true");
      root.setAttribute("aria-label", "Field manual");
      root.setAttribute("tabindex", "-1");
      document.body.appendChild(root);
    }
    root.classList.add("hidden");
    root.innerHTML = MARKUP;

    const facs = [["", "Every army"]];
    if (typeof FACTIONS !== "undefined") {
      const keys = FAC_ORDER.filter(k => FACTIONS[k])
        .concat(Object.keys(FACTIONS).filter(k => FAC_ORDER.indexOf(k) < 0));
      for (const k of keys) facs.push([k, FACTIONS[k].name]);
    }
    fillSelect("gal-fac", facs);
    const eras = [["", "Every period"]];
    if (typeof ERAS !== "undefined")
      for (const k of ERAS) eras.push([k, ERA_INFO[k].name + " — " + ERA_INFO[k].full]);
    fillSelect("gal-era", eras);
    fillSelect("gal-cat", CATS);

    const on = (id, type, fn) => { const el = $(id); if (el) el.addEventListener(type, fn); };
    on("gal-fac", "change", paintList);
    on("gal-era", "change", paintList);
    on("gal-cat", "change", paintList);
    /* The search box rebuilds the whole list, and on "every army / every
       period" that is over a thousand rows. A keystroke should not pay for
       the list the PREVIOUS keystroke would have shown, so the rebuild
       waits for a gap in the typing. A dropdown is one event and stays
       immediate. */
    on("gal-q", "input", () => {
      clearTimeout(qTimer);
      qTimer = setTimeout(() => { qTimer = 0; if (shown) paintList(); }, 120);
    });
    on("gal-close", "click", close);
    on("gal-list", "click", (e) => {
      let n = e.target;
      for (let i = 0; n && i < 4; i++) {
        if (n.dataset && n.dataset.id) { select(n.dataset.id); return; }
        n = n.parentNode;
      }
    });
    /* the backdrop closes; the panel does not */
    root.addEventListener("click", (e) => { if (e.target === root) close(); });
    return true;
  }

  /* Nothing behind the manual hears a key while it is up - exactly as the
     deployment briefing does it (see onKey in loading.js), and for the same
     reason: otherwise Esc would close this AND open the pause menu behind
     it, typing "s" into the search box would stop every unit the player had
     selected, and Ctrl+4 would quietly rewrite control group 4 under a modal
     the player is reading. So propagation is stopped FIRST, for every key;
     only then are the browser's own chords (Ctrl/Cmd/Alt, the function keys)
     handed back by leaving their default action alone. Stopping propagation
     is not preventDefault, so the search box still types; only a key the
     manual itself acted on is preventDefault'ed. */
  function onKey(e) {
    if (!shown) return;
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    if (e.ctrlKey || e.metaKey || e.altKey || /^F\d+$/.test(e.key || "")) return;
    if (key(e) && e.preventDefault) e.preventDefault();
  }
  /* Tab must stay inside a modal, and querying the panel for what is
     focusable does not work on a page whose DOM stand-in never parsed the
     markup - so the ring is the panel's own controls, named. */
  const FOCUS_RING = ["gal-fac", "gal-era", "gal-cat", "gal-q", "gal-close"];
  let focusAt = -1;                // -1 = the panel itself, as it is on opening
  function focusTo(i) {
    const r = FOCUS_RING.filter(id => $(id));
    if (!r.length) return "";
    focusAt = ((i % r.length) + r.length) % r.length;
    const el = $(r[focusAt]);
    if (el && el.focus) try { el.focus({ preventScroll: true }); } catch (e) {}
    return r[focusAt];
  }
  /* The handler itself, public so the regression suite can press a key
     without a window to dispatch it into. True when it acted. */
  function key(e) {
    if (!shown || !e) return false;
    const k = e.key, typing = !!(e.target && e.target.id === "gal-q");
    if (k === "Escape") { close(); return true; }
    if (k === "Tab") { focusTo(focusAt + (e.shiftKey ? -1 : 1)); return true; }
    if (typing && k !== "ArrowDown" && k !== "ArrowUp") return false;
    if (k === "ArrowDown") { step(1); return true; }
    if (k === "ArrowUp") { step(-1); return true; }
    if (k === "PageDown") { step(10); return true; }
    if (k === "PageUp") { step(-10); return true; }
    if (k === "Home") { if (ids.length) select(ids[0]); return true; }
    if (k === "End") { if (ids.length) select(ids[ids.length - 1]); return true; }
    return false;
  }

  /* ---- open and close ----
     `from` names the screen to put back. The game is not touched: no tick,
     no pause, no unpause. A match frozen behind this stays frozen, and the
     manual is not the thing that decided either way. */
  function open(from) {
    if (shown) return true;
    if (!raise() || !root) return false;
    restore = null;
    if (from === "pause") {
      const pm = $("pausemenu");
      if (pm && pm.classList && !pm.classList.contains("hidden")) {
        pm.classList.add("hidden");
        restore = pm;
      }
    }
    shown = true;
    root.classList.remove("hidden");
    /* A modal takes the focus, or Space re-fires the button underneath it
       and Tab walks the menu behind. Where it was is remembered and given
       back on close, so the player's place on the screen survives a lookup.
       Same two lines the deployment briefing uses. */
    refocus = (typeof document !== "undefined" && document.activeElement) || null;
    if (refocus && refocus.blur) try { refocus.blur(); } catch (e) {}
    focusAt = -1;
    if (root.focus) try { root.focus({ preventScroll: true }); } catch (e) {}
    /* Open on the army and the decade the player is already thinking about -
       but only the first time, or a filter they set here would be undone
       every time they looked something up. */
    if (!sel) {
      const fs = $("gal-fac"), mf = $("opt-fac");
      const es = $("gal-era"), me = $("opt-era");
      if (fs && mf && mf.value) fs.value = mf.value;
      if (es && me && me.value) es.value = me.value;
    }
    paintList();
    if (typeof window !== "undefined" && window.addEventListener)
      window.addEventListener("keydown", onKey, true);
    lastT = typeof performance !== "undefined" ? performance.now() : 0;
    anim = requestAnimationFrame(frame);
    return true;
  }
  function close() {
    if (!shown) return;
    shown = false;
    cancelAnimationFrame(anim);
    anim = 0;
    clearTimeout(qTimer); qTimer = 0;
    /* The context goes back when the manual does - the battle behind it
       wants it. standDead is cleared with it: whatever went wrong belonged
       to that renderer, and the next opening deserves its own try. */
    dropStand();
    standDead = false;
    if (typeof window !== "undefined" && window.removeEventListener)
      window.removeEventListener("keydown", onKey, true);
    if (root) root.classList.add("hidden");
    if (restore && restore.classList) restore.classList.remove("hidden");
    restore = null;
    if (refocus && refocus.focus) try { refocus.focus({ preventScroll: true }); } catch (e) {}
    refocus = null;
  }

  /* The two ways in, both optional: a page with neither button simply has no
     manual, which is what every harness page gets. */
  function boot() {
    raise();
    const m = $("btn-gallery");
    if (m) m.addEventListener("click", (e) => { if (e.preventDefault) e.preventDefault(); open("menu"); });
    const p = $("pm-gallery");
    if (p) p.addEventListener("click", (e) => { if (e.preventDefault) e.preventDefault(); open("pause"); });
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
  }

  return {
    open: open, close: close, key: key, select: select, recordFor: recordFor,
    isOpen: () => shown,
    /* what the list is showing, and the record the panel printed - the same
       objects the page is built from, not a second calculation, so a test
       that reads them is reading the page */
    entries: () => ids.slice(),
    record: () => rec,
    /* where Tab has left the focus, so a test can prove the ring stays
       inside the panel rather than walking the menu behind it */
    focusId: () => (focusAt < 0 ? "" : (FOCUS_RING.filter(id => $(id))[focusAt] || "")),
  };
})();
