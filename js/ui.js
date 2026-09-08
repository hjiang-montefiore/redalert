/* ============ ui.js — sidebar, input, selection & orders ============ */
var UI = (function () {
  let G = null;
  let cv, mm;
  const input = {
    mx: 0, my: 0, dragging: false, dragX0: 0, dragY0: 0, dragDist: 0,
    placing: null, placeKind: null, placeTx: 0, placeTy: 0,
    attackMove: false, sellMode: false, repairMode: false,
    panMMB: false, lastMx: 0, lastMy: 0,
  };
  let selection = [];
  /* Pan convention. "follow" = the map moves with your mouse (drag-the-map,
     what most people expect on a big map); "push" = classic RTS edge scroll
     where pushing at an edge moves the camera that way. Persisted. */
  let panMode = "follow";
  /* v2 key: an earlier build could persist a "push" value that left the camera
     feeling inverted, so the old key is deliberately not read any more. */
  try {
    panMode = localStorage.getItem("ironfront.pan2") || "follow";
    localStorage.removeItem("ironfront.pan");
  } catch (e) {}
  function panSign() { return panMode === "follow" ? -1 : 1; }
  function setPanMode(m) {
    panMode = m;
    try { localStorage.setItem("ironfront.pan2", m); } catch (e) {}
    /* may be set from the deploy screen, before a battle exists */
    if (G && G.alert) G.alert("CAMERA: " + (m === "follow" ? "MAP FOLLOWS MOUSE" : "CLASSIC EDGE SCROLL"), "good");
  }
  let curTab = "building";
  let groups = {};
  const bookmarks = {};
  let lastGroupKey = null, lastGroupT = 0;
  const keys = {};

  function init(game) {
    G = game;
    cv = document.getElementById("cv");
    mm = document.getElementById("mm");
    selection = [];
    bind();
    refreshCards();
  }

  /* ================= sidebar cards ================= */
  const TAB_KINDS = { building: "building", defense: "defense", infantry: "infantry", vehicle: "vehicle", aircraft: "aircraft" };

  function itemsForTab(tab) {
    const p = G.human;
    const out = [];
    if (tab === "support") {
      /* off-map missions this faction can call in this era */
      for (const id in SUPPORT) {
        const m = SUPPORT[id];
        if (m.fac !== "both" && m.fac !== p.faction) continue;
        if (typeof inEra === "function" &&
            !inEra(m, (G.human && G.human.era) || CUR_ERA)) continue;
        out.push({ id, def: m, kind: "support" });
      }
      return out;
    }
    if (tab === "building" || tab === "defense") {
      for (const id in BUILDINGS) {
        const d = BUILDINGS[id];
        if (d.cat !== tab || d.undeployable) continue;
        /* The first faction-gated and era-gated STRUCTURES in the game. A KPA
           commander has no strategic early-warning array of any kind and is
           not shown a card for one; a 1950s sidebar does not carry a 1980
           array. Both filters are applied HERE rather than in the era filter
           further down, because that one passes every building through
           unconditionally - and it has to, since rules.js stamps from:"e50" on
           all the rest and testing it there would empty the menu. Structures
           without an `srole` are untouched and behave exactly as before. */
        if (d.fac !== undefined && d.fac !== "both" && d.fac !== p.faction) continue;
        if (d.srole !== undefined && typeof inEra === "function" &&
            !inEra(d, p.era || CUR_ERA)) continue;
        out.push({ id, def: d, kind: tab });
      }
      if (tab === "building") {
        for (const id in UPGRADES) out.push({ id, def: UPGRADES[id], kind: "upgrade" });
        /* Re-equipping the force one generation forward. Shown whenever there is a later generation at all, even when it is
           currently out of reach. A hidden button teaches the player nothing;
           a greyed one carrying the reason tells them they need a research lab,
           or more fuel, or that their ceiling stops here. */
        const st = p.eraStepInfo && p.eraStepInfo();
        if (st) out.push({ id: "era_advance", kind: "era",
          def: { name: st.name, cost: st.cost, oil: st.oil, time: st.time, cat: "upgrade",
                 desc: "Re-equip the force with " + ERA_INFO[st.to].name + " equipment. " +
                       "Units already built keep what they have; everything produced from " +
                       "now on is the newer generation. " + ERA_INFO[st.to].tag + "." } });
      }
    } else {
      for (const id in UNITS) {
        const d = UNITS[id];
        if (d.cat !== tab) continue;
        if (d.fac !== "both" && d.fac !== p.faction) continue;
        out.push({ id, def: d, kind: tab });
      }
      if (tab === "vehicle") {
        /* naval tab folded into vehicle? no — naval gets its own dynamic tab below */
      }
    }
    return out;
  }

  /* naval shares the AIR tab slot when player has a yard? Better: swap tabs bar to 6 */
  function ensureNavalTab() {
    const tabs = document.getElementById("tabs");
    if (!document.querySelector('[data-q="naval"]')) {
      const d = document.createElement("div");
      d.className = "tab"; d.dataset.q = "naval";
      d.title = "Warships and submarines";
      /* built the same way as the static tabs so it does not sit in the row
         as a bare word among icons */
      d.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M3 17h18l-2 4H5zM5 17V9h11l4 4M9 9V5h4v4M12 5V3"/></svg>' +
        "<b>Navy</b><i class=\"qb\"></i>";
      tabs.appendChild(d);
      d.addEventListener("click", () => selectTab("naval"));
    }
  }

  function selectTab(tab) {
    curTab = tab;
    document.querySelectorAll("#tabs .tab").forEach(t => t.classList.toggle("sel", t.dataset.q === tab));
    refreshCards();
  }

  /* Each tab shows what is queued behind it, so a player watching the
     battlefield knows their factory is working without switching tabs to
     find out. Structures waiting to be placed count too - those are the
     ones most easily forgotten. */
  function refreshTabBadges() {
    if (!G || !G.human || !G.human.queues) return;
    document.querySelectorAll("#tabs .tab").forEach(t => {
      const q = G.human.queues[t.dataset.q];
      const badge = t.querySelector(".qb");
      if (!badge) return;
      const n = q ? (q.items.length + ((q.ready && q.ready.length) || 0)) : 0;
      badge.textContent = n > 9 ? "9+" : String(n);
      badge.classList.toggle("on", n > 0);
    });
  }

  function refreshCards() {
    /* the sidebar may not exist yet (or at all, in a headless harness); a
       redraw request before then should do nothing rather than throw */
    if (!G || !G.human) return;
    refreshTabBadges();
    ensureNavalTab();
    const cards = document.getElementById("cards");
    if (!cards) return;
    cards.innerHTML = "";
    const p = G.human;
    let items = curTab === "naval"
      ? Object.keys(UNITS).filter(id => UNITS[id].cat === "naval" && (UNITS[id].fac === "both" || UNITS[id].fac === p.faction))
          .map(id => ({ id, def: UNITS[id], kind: "naval" }))
      : itemsForTab(curTab);
    /* equipment from another century does not appear at all, rather than
       appearing greyed out - a 1950s sidebar should look like 1950 */
    if (typeof inEra === "function")
      /* The era card is synthetic: its def has no service window, so inEra()
         would read it as present-day-only and drop it from every earlier
         period — which is precisely when the player needs it. */
      items = items.filter(it => it.kind === "upgrade" || it.kind === "building" ||
                                 it.kind === "defense" || it.kind === "era" ||
                                 inEra(it.def, (G.human && G.human.era) || CUR_ERA));

    for (const it of items) {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.id = it.id; card.dataset.kind = it.kind;
      const lock = p.lockReason(it.def, it.kind === "upgrade");
      if (lock) card.classList.add("lock");

      const cost = it.kind === "support" ? it.def.oil
        : it.kind === "upgrade" ? it.def.cost : p.factionCost(it.def);
      card.innerHTML = '<span class="cst' + (it.kind === "support" ? " oil" : "") + '">' +
        (it.kind === "support" ? cost + " bbl" : "$" + U.fmt(cost)) + '</span>' +
        '<div class="nm">' + it.def.name.toUpperCase() + '</div>';
      const icon = document.createElement("canvas");
      icon.width = 60; icon.height = 40;
      drawIcon(icon, it);
      card.insertBefore(icon, card.firstChild);

      card.addEventListener("click", () => onCardClick(it));
      card.addEventListener("contextmenu", (ev) => { ev.preventDefault(); onCardCancel(it); });
      card.addEventListener("mouseenter", (ev) => showTip(it, card));
      card.addEventListener("mouseleave", hideTip);
      cards.appendChild(card);
    }
    updateCards();
  }

  function drawIcon(icon, it) {
    const c = icon.getContext("2d");
    const d = it.def;
    const col = G.human.color;

    /* prefer a real 3D render of the actual model */
    if (it.kind !== "upgrade" && typeof Icons3D !== "undefined") {
      let thumb = null;
      try { thumb = Icons3D.get(it.id, it.kind, col); } catch (e) { thumb = null; }
      if (thumb) {
        c.clearRect(0, 0, icon.width, icon.height);
        c.drawImage(thumb, 0, 0, thumb.width, thumb.height, 0, 0, icon.width, icon.height);
        return;
      }
    }

    c.save(); c.translate(30, 22);
    if (it.kind === "upgrade") {
      c.strokeStyle = "#b06ae0"; c.lineWidth = 2;
      c.beginPath(); c.arc(0, -2, 9, 0, 7); c.stroke();
      c.fillStyle = "#b06ae0"; c.font = "bold 11px sans-serif"; c.textAlign = "center";
      c.fillText(it.id.startsWith("tech") ? it.id.slice(4) : "+", 0, 2);
    } else if (it.kind === "building" || it.kind === "defense") {
      c.fillStyle = "#3a4438";
      c.fillRect(-14, -4, 28, 12);
      c.fillStyle = col.dark;
      c.fillRect(-11, -12, 22, 9);
      if (d.weapons) { c.strokeStyle = "#222"; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -8); c.lineTo(12, -12); c.stroke(); }
      if (d.power > 0) { c.fillStyle = "#5fb0e8"; c.fillRect(-3, -18, 6, 7); }
      if (d.oilNode) { c.strokeStyle = "#3d3a32"; c.beginPath(); c.moveTo(-6, 6); c.lineTo(0, -14); c.lineTo(6, 6); c.stroke(); }
      if (d.radar) { c.fillStyle = "#9fb0ba"; c.beginPath(); c.ellipse(0, -14, 7, 3, -0.4, 0, 7); c.fill(); }
    } else {
      const cat = d.cat;
      if (cat === "infantry") {
        c.fillStyle = col.dark; c.fillRect(-2.5, -8, 5, 9);
        c.fillStyle = "#c9b18a"; c.beginPath(); c.arc(0, -11, 3, 0, 7); c.fill();
        c.fillStyle = col.main; c.beginPath(); c.arc(0, -12, 3, Math.PI, 0); c.fill();
        c.strokeStyle = "#222"; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-1, -5); c.lineTo(9, -7); c.stroke();
      } else if (cat === "vehicle") {
        c.fillStyle = "#1c1c1c"; c.fillRect(-13, 2, 26, 4);
        c.fillStyle = col.main; c.fillRect(-12, -5, 24, 8);
        if (d.turret) { c.fillStyle = col.light; c.beginPath(); c.arc(-1, -6, 5, 0, 7); c.fill();
          c.strokeStyle = "#222"; c.lineWidth = 2; c.beginPath(); c.moveTo(-1, -6); c.lineTo(14, -8); c.stroke(); }
      } else if (cat === "aircraft") {
        if (d.jet) { c.fillStyle = col.main;
          c.beginPath(); c.moveTo(14, 0); c.lineTo(-4, -9); c.lineTo(-8, -2); c.lineTo(-12, -6);
          c.lineTo(-12, 6); c.lineTo(-8, 2); c.lineTo(-4, 9); c.closePath(); c.fill(); }
        else { c.fillStyle = col.main; c.beginPath(); c.ellipse(0, 0, 10, 4.5, 0, 0, 7); c.fill();
          c.fillRect(-15, -1, 8, 2);
          c.strokeStyle = "#9aa"; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-13, -4); c.lineTo(13, -4); c.stroke(); }
      } else { /* naval */
        c.fillStyle = "#697077";
        c.beginPath(); c.moveTo(16, 2); c.lineTo(10, -4); c.lineTo(-13, -4); c.lineTo(-16, 2); c.closePath(); c.fill();
        c.fillStyle = col.main; c.fillRect(-10, -2, 18, 3);
        if (d.carrier) { c.fillStyle = "#4c5157"; c.fillRect(-15, -7, 30, 4); }
        else if (d.submerged) { c.fillStyle = "#2f3b40"; c.fillRect(-12, -3, 24, 5); c.fillRect(-2, -7, 5, 4); }
        else { c.fillStyle = "#5b6167"; c.fillRect(-4, -9, 8, 6); }
      }
    }
    c.restore();
  }

  function onCardClick(it) {
    const p = G.human;
    Sfx.ensure();
    const kind = it.kind;
    if (kind === "era") {
      const why = p.eraLockReason();
      if (why) { alert(why, "bad"); Sfx.play("sell"); return; }
      if (p.startEraAdvance()) { Sfx.play("click"); refreshCards(); }
      return;
    }
    if (kind === "support") {
      /* arm the targeting reticle: the next map click calls the mission in */
      const why = G.supportReady(p, it.id);
      if (why) { alert(why, "bad"); Sfx.play("sell"); return; }
      pendingSupport = (pendingSupport === it.id) ? null : it.id;
      Sfx.play("click");
      refreshCards();
      return;
    }
    if (kind === "building" || kind === "defense") {
      /* a finished structure of this type is waiting: go straight to placing it */
      if (p.readyItem(kind, it.id)) {
        input.placing = it.id; input.placeKind = kind;
        Sfx.play("click");
        return;
      }
      if (p.enqueue(kind, it.id)) Sfx.play("click"); else failBeep(it, kind);
    } else if (kind === "upgrade") {
      if (p.enqueue("upgrade", it.id)) Sfx.play("click"); else failBeep(it, kind);
    } else {
      if (p.enqueue(kind, it.id)) Sfx.play("click"); else failBeep(it, kind);
    }
    updateCards();
  }
  function failBeep(it, kind) {
    const p = G.human;
    const r = p.lockReason(it.def, kind === "upgrade");
    if (r) G.alert(r, "bad");
    else if (p.cash < 50) G.alert("INSUFFICIENT FUNDS", "bad");
  }
  function onCardCancel(it) {
    G.human.cancel(it.kind === "upgrade" ? "upgrade" : it.kind, it.id);
    if (input.placing === it.id) input.placing = null;
    updateCards();
  }

  /* refresh progress bars & lock state — called every frame (cheap) */
  function updateCards() {
    const p = G.human;
    document.querySelectorAll(".card").forEach(card => {
      const id = card.dataset.id, kind = card.dataset.kind;
      /* the era card is synthetic - it has no entry in any definition table */
      if (kind === "era") {
        const why = p.eraLockReason();
        card.classList.toggle("lock", !!why && p.eraProgress <= 0);
        card.classList.toggle("armed", p.eraProgress > 0);
        const st = p.eraStepInfo();
        let bar = card.querySelector(".cdbar");
        if (!bar) { bar = document.createElement("div"); bar.className = "cdbar"; card.appendChild(bar); }
        const pr = (p.eraProgress > 0 && st) ? 1 - p.eraProgress / st.time : 0;
        bar.style.width = Math.round(pr * 100) + "%";
        bar.style.display = p.eraProgress > 0 ? "block" : "none";
        return;
      }
      const def = kind === "upgrade" ? UPGRADES[id] : (kind === "building" || kind === "defense") ? BUILDINGS[id] : UNITS[id];
      if (!def) return;
      const lock = p.lockReason(def, kind === "upgrade");
      /* A finished upgrade is not "available but blocked", it is done - it gets
         its own spent-looking style rather than sitting there looking buyable. */
      const done = kind === "upgrade" && lock === "COMPLETE";
      card.classList.toggle("done", done);
      card.classList.toggle("lock", !!lock && !done);
      if (kind === "support") {
        const why = G.supportReady(G.human, id);
        card.classList.toggle("lock", !!why);
        card.classList.toggle("armed", pendingSupport === id);
        const until = (G.human.support && G.human.support[id]) || 0;
        const m = SUPPORT[id];
        const cd = until > G.time ? (until - G.time) / m.cooldown : 0;
        let bar = card.querySelector(".cdbar");
        if (!bar) { bar = document.createElement("div"); bar.className = "cdbar"; card.appendChild(bar); }
        bar.style.width = Math.round(cd * 100) + "%";
        bar.style.display = cd > 0 ? "block" : "none";
      }

      const q = p.queues[kind === "upgrade" ? "upgrade" : kind];
      let prog = null, ready = false, qn = 0;
      if (q) {
        for (const item of q.items) if (item.id === id) qn++;
        if (q.items.length && q.items[0].id === id) prog = q.prog;
        if (Array.isArray(q.ready)) {
          const rc = q.ready.filter(r => r.id === id).length;
          if (rc) { ready = true; qn += rc; }
        }
      }
      let pr = card.querySelector(".prog"), pc = card.querySelector(".pct"), qn2 = card.querySelector(".qn");
      if (prog !== null && !ready) {
        card.classList.add("build");
        if (!pr) { pr = document.createElement("div"); pr.className = "prog"; card.appendChild(pr); }
        if (!pc) { pc = document.createElement("div"); pc.className = "pct"; card.appendChild(pc); }
        pr.style.height = (prog * 100) + "%";
        pc.textContent = Math.round(prog * 100) + "%";
      } else {
        card.classList.remove("build");
        if (pr) pr.remove(); if (pc) pc.remove();
      }
      card.classList.toggle("ready", ready);
      if (ready) {
        if (!pc) { pc = document.createElement("div"); pc.className = "pct"; card.appendChild(pc); }
        pc.textContent = "READY";
      }
      if (qn > 1) {
        if (!qn2) { qn2 = document.createElement("div"); qn2.className = "qn"; card.appendChild(qn2); }
        qn2.textContent = "x" + qn;
      } else if (qn2) qn2.remove();
    });
  }

  /* ================= tooltip ================= */
  function showTip(it, card) {
    const tip = document.getElementById("tooltip");
    const d = it.def;
    const p = G.human;
    let html = "<h4>" + (d.full || d.name).toUpperCase() + "</h4>";
    if (d.desc) html += '<div class="d">' + d.desc + "</div>";
    const rows = [];
    const cost = it.kind === "upgrade" ? d.cost : p.factionCost(d);
    rows.push('COST <span class="k">$' + U.fmt(cost) + "</span>");
    if (d.oil) rows.push('FUEL <span class="k">' + d.oil + " bbl</span>");
    if (d.hp) rows.push("HP " + d.hp + " · " + (d.armor || "").toUpperCase());
    if (d.power) rows.push("POWER " + (d.power > 0 ? "+" : "") + d.power + " MW");
    if (d.weapons && d.weapons.length) {
      const w = WEAPONS[d.weapons[0]];
      rows.push("WPN " + w.name.toUpperCase());
      rows.push("RNG " + w.range + " · DMG " + w.dmg + (w.burst > 1 ? "x" + w.burst : ""));
      if (w.minRange) rows.push('<span class="warn">MIN RANGE ' + w.minRange + "</span>");
    }
    /* every other weapon this platform carries - a warship is a layered
       system and the build card should say so */
    if (d.weapons && d.weapons.length > 1) {
      const rest = d.weapons.slice(1).map(k => WEAPONS[k] && WEAPONS[k].name).filter(Boolean);
      if (rest.length) rows.push('<span class="alt">ALSO ' + rest.join(" · ").toUpperCase() + "</span>");
    }
    if (d.speed) rows.push("SPD " + d.speed);
    if (d.cargo) rows.push("CARRIES " + d.cargo);
    if (d.carrier) rows.push("DECK " + d.carrier + " AIRCRAFT");
    if (d.ammo) rows.push("ORDNANCE " + d.ammo);

    /* ---- sensors and signature ---- */
    if (d.gen) rows.push("GENERATION " + d.gen.toFixed(1).replace(/\.0$/, ""));
    if (d.radius) rows.push("COMBAT RADIUS " + d.radius + " tiles");
    if (d.radarQ) rows.push("RADAR " + d.radarQ + " (vs rcs 1.0)");
    if (d.rcs !== undefined) {
      const lo = d.rcs < 0.05 ? " — VERY LOW OBSERVABLE"
               : d.rcs < 0.25 ? " — low observable" : "";
      rows.push("SIGNATURE " + d.rcs + lo);
    }
    if (d.jam) rows.push("JAMMING " + d.jam + " tiles");
    /* def.radar is a coverage RADIUS in tiles and no card ever said so, which
       was survivable while the radar dome was the only structure carrying one
       and is not now that five more do. Named apart from the radarQ row above
       it, which is a detection quality against rcs 1.0 and a different scale
       entirely. */
    if (d.radar && d.radar !== true) rows.push("RADAR COVER " + d.radar + " tiles");
    /* the headline of the array family, named for what it does rather than for
       the field: "EW 30" tells a player nothing. */
    if (d.ew) rows.push("LAUNCH BACK-PLOT " + d.ew + " tiles");
    /* and the KPA's whole reason to exist. Without this row the GPS station
       advertises its deliberately near-worthless 6-tile radar number and hides
       its 16-tile one. */
    if (d.gpsJam) rows.push("GPS DENIAL " + d.gpsJam + " tiles");
    if (d.sonar) rows.push("SONAR " + d.sonar + " tiles");
    if (d.quiet !== undefined) {
      const lbl = d.quiet <= 0.28 ? "very quiet" : d.quiet <= 0.5 ? "quiet"
                : d.quiet <= 0.8 ? "noisy" : "extremely noisy";
      rows.push("ACOUSTIC " + d.quiet + " — " + lbl);
      rows.push(d.nuclear ? "NUCLEAR — unlimited endurance"
              : d.aip ? "AIP DIESEL — weeks submerged" : "DIESEL-ELECTRIC");
    }
    if (d.vls) rows.push("VLS " + d.vls + " CELLS");
    else if (d.cat === "naval" && d.weapons && d.weapons.length > 2)
      rows.push('<span class="warn">NO VERTICAL LAUNCH — fixed launchers</span>');
    if (d.softkill) rows.push("DECOYS " + Math.round(d.softkill * 100) + "%");
    if (d.ciws) rows.push("CIWS " + Math.round(d.ciws * 100) + "% intercept");
    /* a carrier is described by its wing, not by the two helicopters in the
       refit table - "EMBARKS 2 HELICOPTERS" on a Nimitz was the same mistake
       the deck code was making */
    if (d.carrier) rows.push("AIR WING " + d.carrier + " AIRCRAFT");
    else if (d.helo) rows.push("EMBARKS " + d.helo + " HELICOPTER" + (d.helo > 1 ? "S" : ""));
    if (d.awacs || d.role === "awacs" || d.role === "cawacs")
      rows.push('<span class="alt">AIRBORNE EARLY WARNING</span>');
    /* Say what a tanker does AND what it does not do, where the player is
       deciding whether to spend three thousand credits on one. It buys time on
       station and sortie rate, not radius: the break-off point is
       Math.max(reserveFuel(), fuelMax * 0.40) and the flat 40% floor is
       unconditionally the larger of the two. Measured on the largest map in the
       game, an A-10 at 77 tiles out - further than one ever normally gets - the
       distance reserve is 35.0 with a tanker 9 tiles away and 11.1 without one,
       and the aircraft turns for home at 40 either way. */
    if (d.tanker) {
      rows.push('<span class="alt">AERIAL TANKER \u2014 ' + d.tanker +
                " units of offload</span>");
      rows.push('<span class="warn">EXTENDS TIME ON STATION, NOT COMBAT RADIUS</span>');
    }
    if (d.carrierCapable) rows.push("CARRIER CAPABLE");
    if (d.thermal !== undefined) rows.push("THERMAL FIT " + Math.round(d.thermal * 100) + "%");
    /* hangar state, so "why can I not build this" is always visible */
    if (d.cat === "aircraft") {
      const cap = p.airCapacity(d), have = p.airOwned(d);
      rows.push("RAMP " + have + "/" + cap + " OCCUPIED");
    }
    if (d.supply) rows.push("SUPPLY POOL " + d.supply);
    const lock = p.lockReason(d, it.kind === "upgrade");
    if (lock) rows.push('<span class="warn">' + lock + "</span>");
    html += rows.join("<br>");

    /* real-world reference panel: what the actual machine does */
    if (typeof FACTS !== "undefined" && FACTS[it.id]) {
      const f = FACTS[it.id];
      const line = factLine(it.id);
      html += '<div class="fact"><h5>THE REAL THING' +
        (f.confidence && f.confidence !== "high"
          ? ' <span class="cf">~' + f.confidence + '</span>' : "") + "</h5>";
      if (f.name) html += "<b>" + f.name + "</b><br>";
      if (line) html += '<span class="spec">' + line + "</span><br>";
      if (f.armament) html += '<span class="arm">' + f.armament + "</span><br>";
      if (f.note) html += '<span class="nt">' + f.note + "</span>";
      html += "</div>";
    }
    tip.innerHTML = html;
    tip.style.display = "block";
    const r = card.getBoundingClientRect();
    tip.style.right = "222px";
    tip.style.top = Math.min(window.innerHeight - tip.offsetHeight - 10, r.top) + "px";
    tip.style.left = "auto";
  }
  function hideTip() { document.getElementById("tooltip").style.display = "none"; }

  /* ================= the airbase =================
     Fixed-wing aircraft live on the ramp between sorties. Selecting the
     airbase (or a carrier) shows the wing: what is parked, what is airborne,
     what is refuelling, and lets the player send a flight on a strike or a
     patrol. A jet's sortie costs aviation fuel and its endurance is finite;
     a helicopter flies on its own tanks and is charged nothing. */
  let sortiePick = {};      // building id -> Set of selected aircraft ids
  let sortieMode = null;    // null | "strike" | "cap"
  /* The same three orders, but for aircraft the player has selected on the map
     rather than ones sitting on a ramp. Until now the only way to send a
     machine home, put it on patrol or aim a strike was through the airbase
     hangar panel, which only lists PARKED aircraft - so anything already
     airborne could not be given any of them. */
  let airCmdMode = null;    // null | "cap" | "strike"
  let mineMode = false;     // armed: the next map click lays a mine
  let scatMode = false;     // armed: the next map click sows a minefield by rocket
  let obsMode = null;       // armed: the next map click emplaces this obstacle
  /* armed: the next DRAG on the map marks out an area to work automatically */
  let areaMode = null;      // null | "lay" | "sweep"
  let areaDrag = null;      // {x0,y0,x1,y1} in screen pixels, while dragging

  function pickSet(b) {
    if (!sortiePick[b.id]) sortiePick[b.id] = new Set();
    return sortiePick[b.id];
  }

  function hangarPanel(b) {
    const wing = b.wing(), ramp = b.ramp();
    const parked = wing.filter(u => u.parked);
    const sel = pickSet(b);
    /* drop stale ids so the count never lies */
    for (const id of Array.from(sel)) if (!wing.some(u => u.id === id && u.parked)) sel.delete(id);

    let h = '<div class="hangar"><div class="hh">' +
      (b.kind === "unit" ? "FLIGHT DECK" : "HANGAR") + ' <i>' + wing.length + "/" + ramp + "</i></div>" +
      '<div class="hcols"><span></span><span>AIRCRAFT</span><span>STATE</span>' +
      "<span>FUEL</span><span></span></div>";
    if (!wing.length) {
      h += '<div class="hempty">' + (b.kind === "unit"
        ? (b.def.carrier
            ? "Deck empty. Build carrier-capable aircraft from the AIR tab and they will come aboard."
            : "Deck empty. Build a helicopter from the AIR tab and it will come aboard.")
        : "No aircraft based here.<br>Build them from the AIR tab.") + "</div></div>";
      return h;
    }
    for (const u of wing) {
      /* A tanker is not ready until the thing it exists to give away is back
         aboard. The engine holds it on the ramp for the 16.2s the boom takes to
         refill, but this panel counted only fuel and ordnance - so it said
         READY, counted the aircraft in SELECT READY and launched it with 16 of
         420 units of offload, and the player watched a "ready" tanker refuel
         nobody. The panel now says what the engine is actually doing. */
      const boomLow = !!(u.offloadMax && u.offload < u.offloadMax - 1);
      const ready = u.parked && u.fuel >= u.reserveFuel() &&
                    (!u.ammoMax || u.ammo > 0.05) && !boomLow;
      const state = !u.parked ? "AIRBORNE"
        : (u.ammoMax && u.ammo <= 0.05) ? "REARMING"
        : (u.fuel < u.reserveFuel()) ? "REFUELLING"
        : boomLow ? "REPLENISHING" : "READY";
      /* time on station, which is what actually limits a mission */
      const end = G.enduranceOf(u);
      const endTxt = end === Infinity ? "\u221e" : Math.round(end) + "s";
      h += '<div class="hrow' + (sel.has(u.id) ? " on" : "") + (ready ? "" : " off") +
           '" data-air="' + u.id + '" title="' + (u.def.full || u.def.name) +
           " \u00b7 combat radius " + (u.def.radius || "-") + " tiles" +
           " \u00b7 endurance " + endTxt +
           (u.ammoMax ? " \u00b7 ordnance " + u.ammo.toFixed(0) + "/" + u.ammoMax : "") +
           (u.offloadMax ? " \u00b7 boom " + Math.round(u.offload) + "/" + u.offloadMax +
                           " units of fuel to give away" : "") + '">' +
           '<canvas class="hi" width="34" height="21" data-thumb="' + u.def.id + '"></canvas>' +
           '<span class="hn">' + u.def.name + "</span>" +
           '<span class="hs ' + state.toLowerCase() + '">' + state + "</span>" +
           '<span class="hf">' + Math.round(u.fuel) + "%</span>" +

           (u.parked ? '<span class="hx"></span>'
                     : '<span class="hx go" data-recall="' + u.id + '" ' +
                       'title="Recall this aircraft to this base">\u21a9</span>') +
           "</div>";
    }
    const n = sel.size;
    const up = wing.filter(u => !u.parked).length;
    const ship = b.kind === "unit";
    h += '<div class="hbtns">' +
      '<div class="hb" data-hact="all">SELECT READY (' + parked.filter(u =>
        u.fuel >= u.reserveFuel() && (!u.ammoMax || u.ammo > 0.05) &&
        !(u.offloadMax && u.offload < u.offloadMax - 1)).length + ")</div>" +
      '<div class="hb' + (n ? "" : " off") + (sortieMode === "strike" ? " arm" : "") +
        '" data-hact="strike">STRIKE' + (n ? " (" + n + ")" : "") + "</div>" +
      '<div class="hb' + (n ? "" : " off") + (sortieMode === "cap" ? " arm" : "") +
        '" data-hact="cap">PATROL' + (n ? " (" + n + ")" : "") + "</div>" +
      '<div class="hb' + (up ? "" : " off") + '" data-hact="recall">' +
        (ship ? "RECALL" : "RECALL") + (up ? " (" + up + ")" : "") + "</div>" +
      "</div>";
    /* Anything of yours living on another ramp - or on none, because the base
       that built it has since been destroyed - can be adopted here while
       there is room. An aircraft with nowhere to go home to is otherwise lost
       the moment its tanks run dry. */
    const free = ramp - wing.length;
    if (free > 0) {
      /* Only offer machines this ramp could actually recover: a carrier deck
         takes anything carrier-capable, an escort's hangar takes rotorcraft
         only, an airbase takes everything - the same three cases G.findPad
         applies when the aircraft tries to come home. Unfiltered, the list was
         happy to base an F-22 on a destroyer, and it never got back. */
      const deckHost = b.kind === "unit";
      const elsewhere = G.human.units.filter(u =>
        !u.dead && u.layer === "air" && u.padOn !== b &&
        (!deckHost || (u.def.carrierCapable && (b.def.carrier || u.def.hover))));
      if (elsewhere.length) {
        h += '<div class="hh sub">ELSEWHERE <i>' + free + " free</i></div>";
        for (const u of elsewhere.slice(0, 6)) {
          const homeName = (u.padOn && !u.padOn.dead)
            ? (u.padOn.def.name) : "NO BASE";
          h += '<div class="hrow xfer" title="Transfer to this base">' +
               '<canvas class="hi" width="34" height="21" data-thumb="' + u.def.id + '"></canvas>' +
               '<span class="hn">' + u.def.name + "</span>" +
               '<span class="hs ' + (u.padOn && !u.padOn.dead ? "airborne" : "rearming") +
               '">' + homeName.toUpperCase().slice(0, 11) + "</span>" +
               '<span class="hx go" data-xfer="' + u.id + '" ' +
               'title="Base this aircraft here">\u2b0e</span></div>';
        }
        if (elsewhere.length > 6)
          h += '<div class="hempty">and ' + (elsewhere.length - 6) + " more</div>";
      }
    }
    if (sortieMode)
      h += '<div class="hhint">' + (sortieMode === "strike"
        ? "Click a target to strike it."
        : "Click a point to patrol over it.") + " RMB or Esc cancels.</div>";
    else
      h += '<div class="hhint">' + (b.kind === "unit"
        ? "STRIKE sends the flight after a contact with its torpedo. PATROL holds " +
          "a point and sweeps it with the dipping sonar, which is the best " +
          "submarine sensor there is. RECALL brings them back to this deck. " +
          "Shift-click one to fly it yourself."
        : "Shift-click an aircraft to select it and command " +
          "it directly. Launching is free. A jet has a finite time on " +
          "station and returns here for fuel and ordnance \u2014 or, if a tanker " +
          "is on station closer than this ramp, goes to the boom instead and " +
          "then back to what it was doing. A helicopter is not on that clock, " +
          "cannot use a boom, and only comes back when the ordnance is gone.") + "</div>";
    h += "</div>";
    return h;
  }

  /* A short introduction to whatever has just been clicked.

     The panel used to tell you the hit points of your own units and nothing
     whatever about what they were, while ENEMY units got a line of prose -
     exactly backwards from what a player wants when they click on something.
     FACTS carries real published data for 106 of the platforms; era units
     mostly do not appear there, so those fall back to their own description,
     which is usually the more interesting text anyway. */
  function firstSentences(txt, max) {
    if (!txt) return "";
    const t = txt.trim();
    if (t.length <= max) return t;
    let cut = -1;
    for (let i = 0; i < t.length && i <= max; i++)
      if (t[i] === "." && (i + 1 >= t.length || t[i + 1] === " ")) cut = i + 1;
    return (cut > 40 ? t.slice(0, cut) : t.slice(0, max).replace(/\s+\S*$/, "")) .trim() +
           (cut > 40 ? "" : "\u2026");
  }

  function introBlock(e) {
    const d = e.def;
    const f = (typeof FACTS !== "undefined" && d.id) ? FACTS[d.id] : null;
    let h = '<div class="intro">';
    if (f && f.name) h += "<b>" + f.name + "</b>";
    else if (d.full && d.full !== d.name) h += "<b>" + d.full + "</b>";
    const line = (f && typeof factLine === "function") ? factLine(d.id) : null;
    if (line) h += '<span class="spec">' + line + "</span>";
    else if (d.service) h += '<span class="spec">in service ' + d.service + "</span>";
    let note = (f && f.note) || "";
    if (!note) note = firstSentences(d.desc, 190);
    if (note) h += '<span class="nt">' + note + "</span>";
    if (f && f.armament) h += '<span class="arm2">' + firstSentences(f.armament, 110) + "</span>";
    if (f && f.confidence && f.confidence !== "high")
      h += '<span class="cf2">published figures: ~' + f.confidence + " confidence</span>";
    h += "</div>";
    return h;
  }

  /* ---- field engineering ---- */
  const OBSTACLES = ["sandbag", "razorwire", "tankditch", "dragonteeth"];
  function selectedEngineers() {
    return selection.filter(u => u.kind === "unit" && u.owner === G.human && u.def.engineer);
  }
  function obstaclePanel() {
    let h = '<div class="obs">';
    for (const id of OBSTACLES) {
      const d = BUILDINGS[id];
      if (!d) continue;
      const poor = G.human.cash < d.cost;
      h += '<div class="ob' + (obsMode === id ? " arm" : "") + (poor ? " poor" : "") +
           '" data-ob="' + id + '" title="' + d.desc.replace(/"/g, "&quot;") + '">' +
           '<b>' + d.name + "</b><i>$" + d.cost + "</i></div>";
    }
    h += "</div>";
    h += '<div class="hbtns"><div class="hb' + (obsMode === "clear" ? " arm" : "") +
         '" data-ob="clear">CLEAR OBSTACLE</div></div>';
    h += '<div class="hhint">' + (obsMode
      ? (obsMode === "clear" ? "Click an obstacle to pull it out. RMB or Esc cancels."
         : "Click where to emplace. Shift-click to lay a line. RMB or Esc cancels.")
      : "Sandbags stop vehicles and shelter your own infantry. Teeth stop vehicles " +
        "outright but give no cover. Wire barely slows a tank and nearly stops a squad. " +
        "A ditch does a little of both.") + "</div>";
    return h;
  }
  function bindObstacles(root) {
    root.querySelectorAll("[data-ob]").forEach(btn => {
      btn.addEventListener("mousedown", (ev) => {
        ev.stopPropagation();
        const id = btn.dataset.ob;
        obsMode = (obsMode === id) ? null : id;
        mineMode = false; airCmdMode = null;
        Sfx.play("click");
        refreshSelInfo();
      });
    });
  }
  function obsClick(mx, my, shift) {
    if (!obsMode) return false;
    const eng = selectedEngineers();
    if (!eng.length) { obsMode = null; refreshSelInfo(); return true; }
    if (obsMode === "clear") {
      const t = pickAt(mx, my, true);
      if (t && t.kind === "building" && t.def.obstacle) {
        for (const u of eng) u.give({ type: "clearobstacle", target: t }, shift);
        Sfx.play("order");
      } else alert("THAT IS NOT AN OBSTACLE", "bad");
    } else {
      const wp = Render.unproject(mx, my);
      const d = BUILDINGS[obsMode];
      eng.forEach((u, i) => {
        const off = i === 0 ? 0 : i * CFG.TILE;
        u.give({ type: "emplace", what: obsMode, x: wp.x + off, y: wp.y }, shift || i > 0);
      });
      Combat.addEffect({ t: "text", x: wp.x, y: wp.y, s: d.name.toUpperCase(),
                         life: 0.8, max: 0.8, c: "#c8b06a" });
      Sfx.play("order");
    }
    if (!shift) { obsMode = null; refreshSelInfo(); }
    return true;
  }

  /* Anything selected that carries something it puts in the ground or the
     water: a minelayer, or a submarine with a barrier fit. One list, because
     they take the same two orders and no hull carries both loads. */
  function selectedLayers() {
    return selection.filter(u => u.kind === "unit" && u.owner === G.human &&
                                 (u.minesMax > 0 || u.netMax > 0));
  }
  /* ---- what a held round needs from the player ----
     Two gestures, and naming the wrong one is worse than naming none. */
  function releasePanel(list) {
    const e = list[0];
    if (!e || e.kind !== "unit" || !e.manualWeapon) return "";
    const held = (e.def.weapons || []).filter(k => WEAPONS[k] && e.manualWeapon(WEAPONS[k]));
    if (!held.length) return "";
    const w0 = WEAPONS[held[0]];
    const how = w0.nuke
      ? "CTRL + RIGHT-CLICK THE AIMPOINT TWICE TO RELEASE"
      : e.isIndirect()
      ? "CTRL + RIGHT-CLICK A MAP POINT<br>OR RIGHT-CLICK A TARGET YOU CAN SEE"
      : "RIGHT-CLICK THE EMITTER<br>CTRL + RIGHT-CLICK WILL BE REFUSED";
    let h = '<div class="stat warn">RELEASE <i>' +
            (held.length === e.def.weapons.length
              ? "HELD" : "HELD " + held.length + "/" + e.def.weapons.length) +
            "</i></div>";
    h += '<span style="font-size:9.5px">' + (w0.name || "").toUpperCase() +
         " DOES NOT FIRE UNLESS ORDERED<br>" + how +
         (list.length > 1 ? "<br>" + list.length + " SELECTED" : "") + "</span>";
    return h;
  }
  function selectedHeld() {
    return selection.filter(u => u.kind === "unit" && u.owner === G.human && !u.dead &&
                                 u.allWeaponsHeld && u.allWeaponsHeld());
  }

  /* A launcher with a mine pod, or a howitzer with RAAMS in the ready rack.
     Deliberately NOT folded into selectedLayers(), which selects on minesMax
     and drives the autolay box order - an M270 does not crawl along a belt
     rolling mines off the tailgate. */
  function selectedDispensers() {
    return selection.filter(u => u.kind === "unit" && u.owner === G.human &&
                                 !u.dead && u.dispMax > 0 &&
                                 u.scatterIndex && u.scatterIndex() >= 0);
  }

  function scatterPanel(list) {
    const left = list.reduce((n, u) => n + u.disp, 0);
    const cap  = list.reduce((n, u) => n + u.dispMax, 0);
    const u0 = list[0], w = WEAPONS[u0.def.weapons[u0.scatterIndex()]];
    const per = (w && w.scatter) || 0;
    const rng = w ? (u0.weaponRange(w) / CFG.TILE).toFixed(1) : "?";
    const held = (typeof Mines !== "undefined") ? Mines.countOwned(G, G.human) : 0;
    const room = (typeof Mines !== "undefined") ? Mines.CAP : 0;
    let h = '<div class="hbtns"><div class="hb' +
            (left ? (scatMode ? " arm" : "") : " off") +
            '" data-mact="scatter">SCATTER MINES (' + left + "/" + cap + ")</div></div>";
    h += '<div class="hhint">' + (scatMode
      ? "Click the ground to sow it. One round puts about " + per +
        " anti-tank mines down where it lands, out to " + rng +
        " tiles. Shift-click to queue a belt. RMB or Esc cancels."
      : "L sows a minefield \u2014 " + per + " mines a round, " + left +
        " aboard. The mines do not expire, they are invisible until the enemy " +
        "fields a detector, and they never trigger on your own vehicles. Reach is " +
        rng + " tiles, SHORTER than the range ring, which shows the high-explosive " +
        "round. " + (w && w.rocket
          ? "This is a rocket and can be intercepted \u2014 but only if the enemy has " +
            "air defence standing on the ground you aim at, which a minefield usually " +
            "is not. "
          : "This is a gun round: nothing in the game can intercept it. ") +
        "CTRL+RIGHT-CLICK still fires the high-explosive mission. " +
        "FIELD " + held + "/" + room + " MINES IN THE GROUND.") + "</div>";
    return h;
  }

  function scatterClick(mx, my, shift) {
    if (!scatMode) return false;
    const L = selectedDispensers().filter(u => u.disp > 0);
    if (!L.length) { scatMode = false; refreshSelInfo(); return true; }
    if (typeof Mines !== "undefined" && !Mines.roomFor(G, G.human)) {
      G.alert("MINEFIELD CEILING \u2014 " + Mines.CAP + " MINES ALREADY IN THE GROUND", "bad");
      scatMode = false; refreshSelInfo(); return true;
    }
    const wp = Render.unproject(mx, my);
    /* Refuse a point the cargo round cannot reach. Without this bombard()
       closes to 85% of weapon range on its own initiative, and the player's
       launcher drives onto the approach he was trying to fence - and the range
       ring shows the HE round, so he has no way to know. */
    const inR = L.filter(u => {
      const w2 = WEAPONS[u.def.weapons[u.scatterIndex()]];
      const d = U.dist(u.x, u.y, wp.x, wp.y);
      return d <= u.weaponRange(w2) && d >= (w2.minRange || 0) * CFG.TILE;
    });
    if (!inR.length) {
      G.alert("OUT OF REACH FOR A CARGO ROUND \u2014 MOVE UP FIRST", "bad");
      return true;
    }
    /* Two launchers on one aim point is one field's worth of ground and two
       racks spent, because tileMined refuses the second stick. Fan them. */
    inR.forEach((u, i) => {
      const a2 = (i / inR.length) * Math.PI * 2;
      const off = i === 0 ? 0 : CFG.TILE * 3.0;
      u.give({ type: "bombard", wi: u.scatterIndex(),
               x: wp.x + Math.cos(a2) * off, y: wp.y + Math.sin(a2) * off,
               until: G.time + 25 }, shift);
    });
    Combat.addEffect({ t: "text", x: wp.x, y: wp.y, s: "MINEFIELD",
                       life: 0.9, max: 0.9, c: "#c8b06a" });
    if (G.pingEvent) G.pingEvent(wp.x, wp.y);
    G.alert(inR.length + (inR.length === 1 ? " LAUNCHER SOWING" : " LAUNCHERS SOWING") +
          (inR.length < L.length ? " \u00b7 " + (L.length - inR.length) + " OUT OF REACH" : ""),
          "good");
    Sfx.play("order");
    if (!shift) { scatMode = false; refreshSelInfo(); }
    return true;
  }

  function scatterOrder() {
    const L = selectedDispensers();
    if (!L.length) return;
    if (!L.some(u => u.disp > 0)) {
      G.alert("NO MINE ROUNDS ABOARD \u2014 RETURN TO BASE", "bad"); return;
    }
    scatMode = !scatMode;
    mineMode = false;
    Sfx.play("click");
    refreshSelInfo();
  }

  function selectedSweepers() {
    return selection.filter(u => u.kind === "unit" && u.owner === G.human &&
                                 (u.def.mineClear || u.def.mineDetect));
  }

  function selectedSweepUnits() {
    return selection.filter(u => u.kind === "unit" && u.owner === G.human && u.def.mineClear);
  }

  function minePanel(layers) {
    /* The same panel for both payloads, relabelled from the selection. The
       hint has to carry the one rule a player cannot deduce from the map: a
       single node is a bearing, two are a target. */
    const net = layers.some(u => u.netMax > 0);
    const carried = layers.reduce((n, u) => n + u.payloadLeft(), 0);
    const cap = layers.reduce((n, u) => n + u.payloadMax(), 0);
    const oil = (typeof SonarNet !== "undefined") ? SonarNet.oilCost() : 8;
    const life = (typeof SonarNet !== "undefined") ? SonarNet.lifetime() : 240;
    let h = '<div class="hbtns">' +
      '<div class="hb' + (carried ? (mineMode ? " arm" : "") : " off") +
        '" data-mact="lay">' + (net ? "LAY NODE (" : "LAY MINE (") +
        carried + "/" + cap + ")</div>" +
      '<div class="hb' + (areaMode === "lay" ? " arm" : "") +
        '" data-mact="area">' + (net ? "LAY A BARRIER" : "MINE AN AREA") + "</div></div>";
    h += '<div class="hhint">' + (areaMode === "lay"
      ? (net
        ? "Drag the line of the barrier. The boat lays a node every 2.4 tiles along it " +
          "and goes back to a naval yard when the rack is empty."
        : "Drag a box on the map. The layer will fill it on its own, going home for " +
          "more mines when it runs out and picking up where it stopped.")
      : mineMode
      ? (net
        ? "Click where to drop a node. Shift-click a line of points to lay a barrier by hand."
        : "Click where to lay. Shift-click a line of points to lay a belt. RMB or Esc cancels.")
      : net
      ? "M drops an acoustic node — " + oil + " bbl each, " + life + "s of battery. " +
        "ONE node in contact gives a bearing only; TWO holding the same boat at once make " +
        "it targetable. A boat lying still is very nearly silent, so a barrier catches " +
        "the ones in a hurry. N runs your own boats silent."
      : "M arms mine laying. A mine arms a few seconds after it is dropped, " +
        "is invisible to the enemy until something detects it, and fires once.") + "</div>";
    return h;
  }

  function sweepPanel() {
    let h = '<div class="hbtns"><div class="hb' + (areaMode === "sweep" ? " arm" : "") +
            '" data-mact="sweep">SWEEP AN AREA</div></div>';
    h += '<div class="hhint">' + (areaMode === "sweep"
      ? "Drag a box on the map. The vehicle will drive every lane of it and destroy " +
        "any hostile mine it passes."
      : "Clearing happens automatically wherever this vehicle goes. SWEEP AN AREA " +
        "makes it cover a whole box methodically instead of you driving it.") + "</div>";
    return h;
  }

  function bindMineOrders(root) {
    root.querySelectorAll("[data-mact]").forEach(btn => {
      btn.addEventListener("mousedown", (ev) => {
        ev.stopPropagation();
        const act = btn.dataset.mact;
        if (act === "area") areaOrder("lay");
        else if (act === "sweep") areaOrder("sweep");
        else if (act === "scatter") scatterOrder();
        else mineOrder();
      });
    });
  }

  function areaOrder(kind) {
    areaMode = (areaMode === kind) ? null : kind;
    mineMode = false; obsMode = null; airCmdMode = null;
    Sfx.play("click");
    refreshSelInfo();
  }

  /* the drag has finished: hand the rectangle to whoever was selected */
  function areaCommit(x0, y0, x1, y1) {
    const w0 = Render.unproject(x0, y0), w1 = Render.unproject(x1, y1);
    const kind = areaMode;
    const list = kind === "lay" ? selectedLayers() : selectedSweepUnits();
    areaMode = null; areaDrag = null;
    if (!list.length) { refreshSelInfo(); return; }
    /* Split the work between the vehicles so two of them do not cover the same
       ground - along the box's LONG axis, not always horizontally. A barrier
       drawn across a channel is a long thin box, and banding that horizontally
       gave two boats two parallel lines a few metres apart instead of one line
       laid end to end. Cutting the long axis is also the shorter drive for a
       minelayer, so nothing about a belt gets worse. */
    const n = list.length;
    const xa = Math.min(w0.x, w1.x), xb = Math.max(w0.x, w1.x);
    const ya = Math.min(w0.y, w1.y), yb = Math.max(w0.y, w1.y);
    const vert = (yb - ya) >= (xb - xa);
    list.forEach((u, i) => {
      const f0 = i / n, f1 = (i + 1) / n;
      u.give({ type: kind === "lay" ? "autolay" : "autosweep",
               x0: vert ? xa : xa + (xb - xa) * f0,
               y0: vert ? ya + (yb - ya) * f0 : ya,
               x1: vert ? xb : xa + (xb - xa) * f1,
               y1: vert ? ya + (yb - ya) * f1 : yb });
    });
    alert(n + (kind === "lay" ? " LAYING THE AREA" : " SWEEPING THE AREA"), "good");
    Sfx.play("order");
    refreshSelInfo();
  }

  function mineOrder() {
    const L = selectedLayers();
    if (!L.length) return;
    if (!L.some(u => u.payloadLeft() > 0)) {
      alert("NO " + L[0].payloadWord() + " CARRIED \u2014 RETURN TO BASE", "bad"); return;
    }
    mineMode = !mineMode;
    airCmdMode = null;
    Sfx.play("click");
    refreshSelInfo();
  }

  function mineClick(mx, my, shift) {
    if (!mineMode) return false;
    const L = selectedLayers().filter(u => u.payloadLeft() > 0);
    if (!L.length) { mineMode = false; refreshSelInfo(); return true; }
    const wp = Render.unproject(mx, my);
    /* spread a multi-vehicle order so they do not all stack one mine */
    L.forEach((u, i) => {
      const a2 = (i / L.length) * Math.PI * 2;
      const off = i === 0 ? 0 : u.r * 1.9;
      u.give({ type: "laymine", x: wp.x + Math.cos(a2) * off, y: wp.y + Math.sin(a2) * off }, shift);
    });
    Combat.addEffect({ t: "text", x: wp.x, y: wp.y, s: L[0].netMax ? "NODE" : "MINE",
                       life: 0.9, max: 0.9, c: "#ffb45c" });
    Sfx.play("order");
    if (!shift) { mineMode = false; refreshSelInfo(); }
    return true;
  }

  /* Aircraft in the selection that the player owns and can order about. */
  function selectedAircraft() {
    return selection.filter(u => u.kind === "unit" && u.owner === G.human && u.layer === "air");
  }

  function airOrderPanel(air) {
    const home = air.filter(u => u.order && (u.order.type === "rtb" || u.order.type === "parked")).length;
    let h = '<div class="hbtns">' +
      '<div class="hb" data-aact="rtb">BASE' + (home ? " \u2713" : "") + "</div>" +
      '<div class="hb' + (airCmdMode === "cap" ? " arm" : "") + '" data-aact="cap">PATROL</div>' +
      '<div class="hb' + (airCmdMode === "strike" ? " arm" : "") + '" data-aact="strike">STRIKE</div>' +
      "</div>";
    h += '<div class="hhint">' + (
      airCmdMode === "cap"    ? "Click a point to patrol over it. RMB or Esc cancels."
    : airCmdMode === "strike" ? "Click a target to strike it. RMB or Esc cancels."
    : "BASE (R) sends them home to refuel and rearm, and right-clicking a base " +
      "or a deck sends them to THAT one. PATROL (Y) holds a point " +
      "and engages what comes. STRIKE (T) aims a run.") + "</div>";
    return h;
  }

  function bindAirOrders(root) {
    root.querySelectorAll("[data-aact]").forEach(btn => {
      btn.addEventListener("mousedown", (ev) => {
        ev.stopPropagation();
        airOrder(btn.dataset.aact);
      });
    });
  }

  /* One entry point for the buttons and the keys, so they cannot drift apart. */
  function airOrder(act) {
    const air = selectedAircraft();
    if (!air.length) return;
    if (act === "rtb") {
      for (const u of air) { u.parked = false; u.give({ type: "rtb" }); }
      alert(air.length === 1 ? "RETURNING TO BASE" : air.length + " AIRCRAFT RETURNING TO BASE", "good");
      Sfx.play("order");
      airCmdMode = null;
    } else {
      airCmdMode = (airCmdMode === act) ? null : act;
      sortieMode = null;
      Sfx.play("click");
    }
    refreshSelInfo();
  }

  /* The armed click. Returns true when it consumed the click. */
  function airCmdClick(mx, my) {
    if (!airCmdMode) return false;
    const air = selectedAircraft();
    const wp = Render.unproject(mx, my);
    if (!air.length) { airCmdMode = null; refreshSelInfo(); return true; }
    if (airCmdMode === "cap") {
      for (const u of air) { u.parked = false; u.give({ type: "cap", x: wp.x, y: wp.y }); }
      alert(air.length + (air.length === 1 ? " AIRCRAFT ON PATROL" : " AIRCRAFT ON PATROL"), "good");
      Combat.addEffect({ t: "text", x: wp.x, y: wp.y, s: "PATROL", life: 1.0, max: 1.0, c: "#8fd05f" });
    } else {
      const tgt = pickAt(mx, my, true);
      const foe = tgt && tgt.owner !== G.human && !G.allied(G.human, tgt.owner);
      /* With nothing hostile under the cursor this order becomes an attackmove,
         and an attackmove fires only through acquire() - which is the authority
         a held round does not have. Partitioned per aircraft rather than tested
         with every(), so a mixed flight commits the airframes that can shoot
         and holds the ones that cannot, and reports both. A jammer is the one
         exception worth flying anyway: its bubble is positional, so it goes on
         patrol instead of being refused. */
      let hd = 0, jm = 0;
      const fly = [];
      for (const u of air) {
        if (!foe && u.allWeaponsHeld && u.allWeaponsHeld()) {
          if (u.def.jam) { u.parked = false; u.give({ type: "cap", x: wp.x, y: wp.y }); jm++; }
          else hd++;
          continue;
        }
        fly.push(u);
      }
      if (!fly.length) {
        alert((hd ? hd + " HELD \u2014 RIGHT-CLICK THE EMITTER, NOT THE GROUND" : "") +
              (hd && jm ? " \u00b7 " : "") +
              (jm ? jm + " JAMMER" + (jm === 1 ? "" : "S") + " ON PATROL" : ""),
              hd ? "bad" : "good");
        airCmdMode = null; refreshSelInfo(); return true;
      }
      let n = 0;
      for (const u of fly) {
        u.parked = false;
        if (tgt && tgt.owner !== G.human && !G.allied(G.human, tgt.owner) && u.canTarget(tgt)) {
          u.give({ type: "attack", target: tgt }); n++;
        } else {
          u.give({ type: "attackmove", x: wp.x, y: wp.y }); n++;
        }
      }
      alert(n + " AIRCRAFT COMMITTED" +
            (hd ? " \u00b7 " + hd + " HELD, NAME THE EMITTER" : "") +
            (jm ? " \u00b7 " + jm + " JAMMING" : ""), "good");
      Combat.addEffect({ t: "text", x: wp.x, y: wp.y, s: "STRIKE", life: 1.0, max: 1.0, c: "#ff8a6b" });
    }
    Sfx.play("order");
    airCmdMode = null;
    refreshSelInfo();
    return true;
  }

  function bindHangar(b, root) {
    const sel = pickSet(b);

    /* paint each row's thumbnail from the same 3D icon the build cards use,
       so what is on the ramp is recognisable at a glance rather than a list
       of names */
    root.querySelectorAll("canvas[data-thumb]").forEach(cv2 => {
      try { drawIcon(cv2, { id: cv2.dataset.thumb, kind: "unit",
                            def: UNITS[cv2.dataset.thumb] || {} }); } catch (e) {}
    });

    /* per-aircraft recall: bring this one home to THIS base */
    root.querySelectorAll("[data-recall]").forEach(btn => {
      btn.addEventListener("mousedown", (ev) => {
        ev.stopPropagation();
        const u = b.wing().find(x => x.id === +btn.dataset.recall);
        if (!u) return;
        u.padOn = b;
        u.parked = false;
        u.give({ type: "rtb" });
        alert(u.def.name.toUpperCase() + " RECALLED", "good");
        Sfx.play("order");
        refreshSelInfo();
      });
    });

    /* transfer: adopt an aircraft that lives on another ramp, or on none */
    root.querySelectorAll("[data-xfer]").forEach(btn => {
      btn.addEventListener("mousedown", (ev) => {
        ev.stopPropagation();
        const id = +btn.dataset.xfer;
        const u = G.human.units.find(x => !x.dead && x.id === id);
        if (!u) return;
        if (b.wing().length >= b.ramp()) { alert("NO ROOM ON THIS RAMP", "bad"); return; }
        u.padOn = b;
        if (u.parked) { u.parked = false; u.order = { type: "rtb" }; }
        else u.give({ type: "rtb" });
        alert(u.def.name.toUpperCase() + " NOW BASED HERE", "good");
        Sfx.play("order");
        refreshSelInfo();
      });
    });

    root.querySelectorAll(".hrow").forEach(row => {
      row.addEventListener("mousedown", (ev) => {
        ev.stopPropagation();
        const id = +row.dataset.air;
        const u = b.wing().find(x => x.id === id);
        if (!u) return;
        /* Shift-click selects the aircraft itself, so it can be given ordinary
           orders on the map - move, attack, guard - exactly like any other
           unit. A plain click just adds it to the flight being assembled. */
        if (ev.shiftKey || ev.button === 2) {
          clearSel();
          selection.push(u); u.selected = true;
          Render.setCam(u.x, u.y);
          refreshSelInfo();
          Sfx.play("click");
          return;
        }
        if (!u.parked) return;
        if (sel.has(id)) sel.delete(id); else sel.add(id);
        refreshSelInfo();
      });
    });
    root.querySelectorAll(".hb").forEach(btn => {
      btn.addEventListener("mousedown", (ev) => {
        ev.stopPropagation();
        const act = btn.dataset.hact;
        if (act === "recall") {
          /* everything of this host's that is airborne comes home to it */
          let n2 = 0;
          for (const u of b.wing()) {
            if (u.parked) continue;
            u.padOn = b;                       // home is THIS deck, not the nearest
            u.give({ type: "rtb" });
            n2++;
          }
          sortieMode = null; sortieHost = null;
          if (n2) {
            alert(n2 + (b.kind === "unit"
              ? (n2 === 1 ? " AIRCRAFT RETURNING TO THE SHIP" : " AIRCRAFT RETURNING TO THE SHIP")
              : " AIRCRAFT RETURNING TO BASE"), "good");
            Sfx.play("order");
          }
          refreshSelInfo();
          return;
        }
        if (act === "all") {
          sel.clear();
          for (const u of b.onRamp())
            if (u.fuel >= u.reserveFuel() && (!u.ammoMax || u.ammo > 0.05)) sel.add(u.id);
          sortieMode = null;
        } else {
          if (!sel.size) return;
          sortieMode = (sortieMode === act) ? null : act;
          sortieHost = sortieMode ? b : null;
        }
        refreshSelInfo();
      });
    });
  }

  let sortieHost = null;
  /* an off-map mission waiting for the player to nominate an aimpoint */
  let pendingSupport = null;

  /* Issue the pending sortie at a world point (or at whatever is under it). */
  function releaseSortie(wx, wy, target) {
    const b = sortieHost;
    if (!b || b.dead || !sortieMode) return false;
    const sel = pickSet(b);
    let sent = 0, fail = null, unable = 0, held = 0;
    for (const id of Array.from(sel)) {
      const u = b.wing().find(x => x.id === id);
      if (!u || !u.parked) { sel.delete(id); continue; }
      /* an aircraft that cannot touch this target stays on the ramp and keeps
         its place in the flight, rather than burning fuel to find out */
      if (sortieMode === "strike" && target && !target.dead &&
          target.owner !== G.human && !u.canTarget(target)) { unable++; continue; }
      /* An armed sweep with no named target is an order to acquire on the way,
         and a held round may not acquire. The aircraft keeps its place in the
         flight rather than burning the fuel to find that out - the same
         courtesy the canTarget test two lines above already extends. */
      const named = target && !target.dead && target.owner !== G.human;
      if (sortieMode === "strike" && !named &&
          u.allWeaponsHeld && u.allWeaponsHeld()) { held++; continue; }
      const order = sortieMode === "strike"
        ? (target && !target.dead && target.owner !== G.human
            ? { type: "attack", target, resume: { x: b.x, y: b.y } }
            : { type: "attackmove", x: wx, y: wy })
        : { type: "cap", x: wx, y: wy };
      const why = G.launchSortie(u, order);
      if (why) { fail = why; continue; }
      sel.delete(id);
      sent++;
    }
    if (sent) {
      alert(sent + (sortieMode === "strike" ? " AIRCRAFT ON STRIKE" : " AIRCRAFT ON PATROL") +
            (unable ? " \u00b7 " + unable + " CANNOT ENGAGE" : ""), "good");
      Sfx.play("order");
    } else if (unable) {
      alert(unable + " AIRCRAFT CANNOT ENGAGE THAT TARGET", "bad");
    }
    else if (held) alert(held + " AIRCRAFT HELD \u2014 NAME THE EMITTER", "bad");
    else if (fail) alert(fail, "bad");
    sortieMode = null; sortieHost = null;
    refreshSelInfo();
    return sent > 0;
  }
  function cancelSortie() {
    if (!sortieMode) return false;
    sortieMode = null; sortieHost = null; refreshSelInfo(); return true;
  }

  /* ================= selection info panel ================= */

  /* ---- the re-equip bar ----
     Advancing a generation used to be a card at the end of a long scrolling
     list, where players never found it. It has its own bar now, which always
     states either the price, the reason it is blocked, or how long is left. */
  function refreshEraBar() {
    const el = document.getElementById("erabar");
    if (!el || !G.human) return;
    const p = G.human;
    const st = p.eraStepInfo && p.eraStepInfo();
    if (!st) {                                   /* nothing later exists */
      el.className = "hide";
      el.innerHTML = "";
      return;
    }
    const why = p.eraLockReason();
    let cls, title, sub, frac = 0;
    if (p.eraProgress > 0 && p.eraTarget) {
      cls = "busy";
      title = "RE-EQUIPPING \u2192 " + ERA_INFO[p.eraTarget].name.toUpperCase();
      sub = Math.ceil(p.eraProgress) + "s remaining";
      const total = st.time || 1;
      frac = Math.max(0, Math.min(1, 1 - p.eraProgress / total));
    } else if (why) {
      cls = "locked";
      title = st.name.toUpperCase();
      sub = why;
    } else {
      cls = "ready";
      title = st.name.toUpperCase();
      sub = "$" + U.fmt(p.factionCost ? p.factionCost(st) : st.cost) +
            " \u00b7 " + st.oil + " bbl \u00b7 " + st.time + "s";
    }
    el.className = cls;
    el.innerHTML = '<div class="et"></div><div class="es"></div><div class="bar"></div>';
    el.querySelector(".et").textContent = title;
    el.querySelector(".es").textContent = sub;
    el.querySelector(".bar").style.width = (frac * 100).toFixed(1) + "%";
  }

  function refreshSelInfo() {
    const el = document.getElementById("selinfo");
    selection = selection.filter(e => !e.dead);
    if (!selection.length) {
      el.innerHTML = '<b>' + G.map.name + '</b><br><span style="font-size:10px">' +
        FACTIONS[G.human.faction].name + "</span><br>" +
        "UNITS " + G.human.units.length + " · BLD " + G.human.buildings.length +
        "<br>K/L " + G.human.stats.kills + "/" + G.human.stats.losses;
      return;
    }
    if (selection.length === 1 && selection[0].owner !== G.human) {
      const e = selection[0];
      const fac = FACTIONS[e.owner.faction];
      let h = '<b style="color:#ff8a6b">' + (e.def.full || e.def.name).toUpperCase() + "</b><br>";
      h += '<span style="font-size:9.5px;color:#d05a45;letter-spacing:1px">HOSTILE &middot; ' +
        (fac ? fac.short : "ENEMY") + "</span><br>";
      h += '<div class="stat">HP <i>' + Math.ceil(e.hp) + "/" + Math.ceil(e.maxHp) + "</i></div>";
      h += '<div class="stat">ARMOUR <i>' + (e.armor || "").toUpperCase() + "</i></div>";
      if (e.vet !== undefined && e.kind === "unit")
        h += '<div class="stat">RANK <i class="vet">' + CFG.VET_NAME[e.vet] + "</i></div>";
      if (e.def.weapons && e.def.weapons.length) {
        const w = WEAPONS[e.def.weapons[0]];
        h += '<div class="stat">WEAPON <i>' + w.name.toUpperCase() + "</i></div>";
        h += '<div class="stat">RANGE <i>' + w.range + "</i></div>";
      }
      h += introBlock(e);
      el.innerHTML = h;
      return;
    }
    if (selection.length === 1) {
      const e = selection[0];
      let h = "<b>" + (e.def.full || e.def.name).toUpperCase() + "</b><br>";
      h += '<div class="stat">HP <i>' + Math.ceil(e.hp) + "/" + Math.ceil(e.maxHp) + "</i></div>";
      if (e.vet !== undefined && e.kind === "unit")
        h += '<div class="stat">RANK <i class="vet">' + CFG.VET_NAME[e.vet] + "</i></div>";
      if (e.fuelMax) h += '<div class="stat">FUEL <i>' + Math.round(e.fuel) + "%</i></div>";
      /* A tanker's own tanks are not the interesting number. Selecting one used
         to show FUEL 100% with an empty boom - true about the wrong tank, and
         the reason a working tanker and a useless one looked identical. */
      if (e.offloadMax) {
        const pct = e.offload / e.offloadMax;
        h += '<div class="stat' + (pct < 0.15 ? " warn" : "") + '">BOOM <i>' +
             Math.round(e.offload) + "/" + e.offloadMax + "</i></div>";
        const joined = e.owner.units.filter(u2 => !u2.dead && u2.order &&
          u2.order.type === "tank" && u2.order.target === e).length;
        h += '<div class="stat">RECEIVERS <i>' + joined + " joined</i></div>";
      }
      if (e.ammoMax) h += '<div class="stat">ORDNANCE <i>' + (e.ammo).toFixed(1) + "/" + e.ammoMax + "</i></div>";
      if (e.roundsMax) h += '<div class="stat' + (e.rounds === 0 ? " warn" : "") +
        '">ROUNDS <i>' + e.rounds + "/" + e.roundsMax + "</i></div>";
      if (e.isOutOfSupply && e.isOutOfSupply()) {
        const pct = Math.round(e.supplyStrain() * 100);
        h += '<div class="stat warn">SUPPLY <i>OUT OF CONTACT ' + pct + "%</i></div>";
      }
      if (e.def.supply) h += '<div class="stat">SUPPLY <i>' + Math.round(e.supplyLeft) + "</i></div>";
      if (e.def.harvester) h += '<div class="stat">ORE <i>$' + Math.round(e.load) + "</i></div>";
      if (e.cargo && e.def.cargo) h += '<div class="stat">CARGO <i>' + e.cargo.length + "/" + e.def.cargo + "</i></div>";
      if (e.kind === "building" && e.def.produces) {
        const isPri = G.human.primary && G.human.primary[e.def.id] === e;
        const many = G.human.buildings.filter(b => !b.dead && b.def.id === e.def.id).length > 1;
        h += '<span style="font-size:9.5px">RMB ON MAP SETS RALLY</span>';
        if (many || isPri)
          h += '<div class="pribtn' + (isPri ? " on" : "") + '" data-pri="' + e.def.id + '">' +
               (isPri ? "\u2605 PRIMARY BUILDING" : "SET AS PRIMARY") + "</div>";
      }
      if (e.kind === "building" && e.def.garrison) {
        const n = (e.garrison || []).length;
        h += '<div class="stat' + (n ? " warn" : "") + '">GARRISON <i>' + n + "/" + e.def.garrison + "</i></div>";
        if (n) h += '<span style="font-size:9.5px">U TURNS THEM OUT</span>';
        else h += '<span style="font-size:9.5px">RIGHT-CLICK WITH INFANTRY TO OCCUPY</span>';
      }
      if (e.ramp && e.ramp()) h += hangarPanel(e);
      const eng1 = selectedEngineers();
      if (eng1.length) h += obstaclePanel();
      const lay1 = selectedLayers();
      if (lay1.length) h += minePanel(lay1);
      const swp1 = selectedSweepUnits();
      if (swp1.length && !lay1.length) h += sweepPanel();
      if (e.kind === "unit" && e.owner === G.human) h += releasePanel([e]);
      const dsp1 = selectedDispensers();
      if (dsp1.length) h += scatterPanel(dsp1);
      h += introBlock(e);
      const air1 = selectedAircraft();
      if (air1.length) h += airOrderPanel(air1);
      el.innerHTML = h;
      if (e.ramp && e.ramp()) bindHangar(e, el);
      if (air1.length) bindAirOrders(el);
      if (lay1.length || swp1.length || selectedDispensers().length) bindMineOrders(el);
      if (eng1.length) bindObstacles(el);
      const pb = el.querySelector(".pribtn");
      if (pb) pb.addEventListener("mousedown", (ev) => {
        ev.stopPropagation();
        if (!G.human.primary) G.human.primary = {};
        const id = pb.dataset.pri;
        G.human.primary[id] = (G.human.primary[id] === e) ? null : e;
        alert(G.human.primary[id] ? (e.def.name.toUpperCase() + " IS NOW PRIMARY")
                                  : "PRIMARY CLEARED", "good");
        Sfx.play("click");
        refreshSelInfo();
      });
    } else {
      /* grouped cards: each type shows count, worst HP in the group, veterancy
         and a fuel/ammo pip, so a nine-unit selection says more than one did */
      const groups = {};
      for (const e of selection) {
        const k = e.def.id;
        const g2 = groups[k] || (groups[k] = {
          def: e.def, n: 0, hp: 1, vet: 0, dry: 0, lowFuel: 0, pinned: 0,
        });
        g2.n++;
        g2.hp = Math.min(g2.hp, e.hp / e.maxHp);
        g2.vet = Math.max(g2.vet, e.vet || 0);
        if (e.ammoMax && e.ammo <= 0.05) g2.dry++;
        if (e.roundsMax && e.rounds === 0) g2.dry++;
        if (e.isOutOfSupply && e.isOutOfSupply()) g2.unsup = (g2.unsup || 0) + 1;
        if (e.fuelMax && e.fuel < 22) g2.lowFuel++;
        if (e.isPinned && e.isPinned()) g2.pinned++;
      }
      const keys = Object.keys(groups);
      let h = '<div class="selhead"><b>' + selection.length + " SELECTED</b>" +
              (keys.length > 1 ? '<span class="sub">TAB cycles type</span>' : "") + "</div>";
      h += '<div class="ucards">';
      for (const k of keys.slice(0, 8)) {
        const g2 = groups[k];
        const pct = Math.round(g2.hp * 100);
        const cls = g2.hp > 0.55 ? "ok" : g2.hp > 0.25 ? "hurt" : "crit";
        h += '<div class="uc" data-uid="' + k + '">' +
             '<span class="n">' + g2.n + "</span>" +
             '<span class="nm2">' + g2.def.name.toUpperCase().slice(0, 13) + "</span>" +
             '<span class="hpbar"><i class="' + cls + '" style="width:' + pct + '%"></i></span>' +
             (g2.vet ? '<span class="v">' + "^".repeat(g2.vet) + "</span>" : "") +
             (g2.dry ? '<span class="warn2">AMMO</span>' :
              g2.lowFuel ? '<span class="warn3">FUEL</span>' : "") +
             (g2.pinned ? '<span class="warn3">PIN</span>' : "") +
             "</div>";
      }
      h += "</div>";
      const engN = selectedEngineers();
      if (engN.length) h += obstaclePanel();
      const layN = selectedLayers();
      if (layN.length) h += minePanel(layN);
      const swpN = selectedSweepUnits();
      if (swpN.length && !layN.length) h += sweepPanel();
      const heldN = selectedHeld();
      if (heldN.length) h += releasePanel(heldN);
      const dspN = selectedDispensers();
      if (dspN.length) h += scatterPanel(dspN);
      const airN = selectedAircraft();
      if (airN.length) h += airOrderPanel(airN);
      el.innerHTML = h;
      el.querySelectorAll(".uc").forEach(c => c.addEventListener("click", () => {
        selectSubgroup(c.dataset.uid);
      }));
      if (airN.length) bindAirOrders(el);
      if (layN.length || swpN.length || selectedDispensers().length) bindMineOrders(el);
      if (engN.length) bindObstacles(el);
    }
  }

  /* ================= input ================= */
  function bind() {
    window.addEventListener("resize", () => Render.resize());
    cv.addEventListener("contextmenu", e => e.preventDefault());

    /* Double-clicking a loaded transport unloads it. This is the first thing
       most players try, and it works whether or not the craft is selected. */
    /* ---- double-click: every unit of this kind that is on screen ----
       The convention in every RTS since the first one, and the fastest way to
       gather a dispersed force of one type - all the harvesters, all the
       fighters - without dragging a box across the whole base. Shift adds to
       the selection instead of replacing it, matching box-select. */
    cv.addEventListener("dblclick", (e) => {
      const rect = cv.getBoundingClientRect();
      const t = pickAt(e.clientX - rect.left, e.clientY - rect.top, true);
      if (!t || t.owner !== G.human || t.kind !== "unit") return;
      if (!e.shiftKey) clearSel();
      let n = 0;
      for (const u of G.human.units) {
        if (u.dead || u.carried || u.selected) continue;
        if (u.def.id !== t.def.id) continue;
        if (!onScreen(u)) continue;
        u.selected = true; selection.push(u); n++;
      }
      if (n) {
        Sfx.play("click");
        alert(n + " \u00d7 " + t.def.name.toUpperCase() + " SELECTED", "good");
      }
      refreshSelInfo();
    });

    cv.addEventListener("mousedown", (e) => {
      Sfx.ensure();
      const rect = cv.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      input.mx = mx; input.my = my;              // clicks are valid without prior mouse movement
      if (e.button === 0) {
        if (input.launching) {
          const b = input.launching;
          const wp = Render.unproject(mx, my);
          input.launching = null;
          if (!b.dead && b.swCharge >= 1) G.launchSuperweapon(b, wp.x, wp.y);
          return;
        }
        /* a fire mission waiting for an aimpoint takes the next click */
        if (pendingSupport) {
          const wp = Render.unproject(mx, my);
          const why = G.callFireSupport(G.human, pendingSupport, wp.x, wp.y);
          if (why) alert(why, "bad"); else Sfx.play("order");
          pendingSupport = null;
          refreshCards();
          return;
        }
        /* an armed mine or aircraft order takes the next click */
        if (obsMode && obsClick(mx, my, e.shiftKey)) return;
        if (mineMode && mineClick(mx, my, e.shiftKey)) return;
        if (scatMode && scatterClick(mx, my, e.shiftKey)) return;
        /* an armed aircraft order takes the next click */
        if (airCmdMode && airCmdClick(mx, my)) return;
        /* a pending sortie takes the next click as its target */
        if (sortieMode) {
          const wp = Render.unproject(mx, my);
          releaseSortie(wp.x, wp.y, pickAt(mx, my, true));
          return;
        }
        if (input.placing) { tryPlace(); return; }
        if (input.sellMode) { const b = pickAt(mx, my, true); if (b && b.kind === "building" && b.owner === G.human) G.sellBuilding(b); return; }
        if (input.repairMode) { const b = pickAt(mx, my, true); if (b && b.kind === "building" && b.owner === G.human) { b.repairing = !b.repairing; } return; }
        if (input.attackMove || keys.a) { issueAttackMove(mx, my, e.shiftKey); input.attackMove = false; return; }
        /* an armed area order takes the whole drag, not just the click */
        if (areaMode) { areaDrag = { x0: mx, y0: my, x1: mx, y1: my }; return; }
        input.dragging = true; input.dragX0 = mx; input.dragY0 = my; input.dragDist = 0;
      } else if (e.button === 1) {
        input.panMMB = true; input.lastMx = mx; input.lastMy = my;
        e.preventDefault();
      } else if (e.button === 2) {
        if (areaMode) { areaMode = null; areaDrag = null; refreshSelInfo(); G.alert("CANCELLED"); return; }
        if (obsMode) { obsMode = null; refreshSelInfo(); G.alert("CANCELLED"); return; }
        if (mineMode) { mineMode = false; refreshSelInfo(); G.alert("MINE LAYING CANCELLED"); return; }
        if (scatMode) { scatMode = false; refreshSelInfo(); G.alert("FIRE MISSION CANCELLED"); return; }
        if (airCmdMode) { airCmdMode = null; refreshSelInfo(); G.alert("ORDER CANCELLED"); return; }
        if (pendingSupport) { pendingSupport = null; refreshCards(); G.alert("FIRE MISSION CANCELLED"); return; }
        if (sortieMode) { cancelSortie(); G.alert("SORTIE CANCELLED"); return; }
        if (input.launching) { input.launching = null; G.alert("LAUNCH ABORTED"); return; }
        if (input.placing) { input.placing = null; return; }
        if (input.sellMode || input.repairMode) { setSell(false); setRepair(false); return; }
        /* Ctrl+right-click is a fire mission at a map point. The bombard order
           has existed since the counter-battery stance was written - it has its
           own aiming, reload and ready-round accounting, and the AI has been
           using it - but no key ever reached it, so a thirty-tile launcher with
           five tiles of eyesight could only be told to shoot things already in
           view. This is the other half of every long-range weapon in the game. */
        if (e.ctrlKey || e.metaKey) { forceFire(mx, my, e.shiftKey); return; }
        issueOrder(mx, my, e.shiftKey);
      }
    });
    /* The pointer leaving the map has to switch edge panning off. It was set
       true on the first mouse move and never cleared, and the canvas gets no
       mousemove once the pointer is over the sidebar - so input.mx stayed
       frozen wherever it last was. Sweep right to reach the build column and
       it froze INSIDE the right-hand pan strip, which meant the map scrolled
       continuously the whole time you were trying to click a card. */
    cv.addEventListener("mouseleave", () => { input.hasMouse = false; edgeDwell = 0; });
    cv.addEventListener("mouseenter", () => { edgeDwell = 0; });

    cv.addEventListener("mousemove", (e) => {
      const rect = cv.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      input.hasMouse = true;
      if (areaDrag) { areaDrag.x1 = mx; areaDrag.y1 = my; }
      if (input.dragging) input.dragDist += Math.abs(mx - input.mx) + Math.abs(my - input.my);
      if (input.panMMB) {
        const wp0 = Render.unproject(input.lastMx, input.lastMy);
        const wp1 = Render.unproject(mx, my);
        /* "follow" drags the map under the cursor; "push" moves the camera */
        const k = panMode === "follow" ? 1 : -1;
        Render.moveCam((wp0.x - wp1.x) * k, (wp0.y - wp1.y) * k);
        input.lastMx = mx; input.lastMy = my;
      }
      input.mx = mx; input.my = my;
    });
    window.addEventListener("mouseup", (e) => {
      if (e.button === 0 && areaDrag) {
        const d = areaDrag;
        /* A drag counts if it is LONG, not if it is wide in both axes. The AND
           rejected a nearly straight drag outright - which is exactly what
           drawing a barrier across a channel looks like - and then told the
           player to drag a box when they had drawn precisely the shape they
           meant. */
        const ddx = Math.abs(d.x1 - d.x0), ddy = Math.abs(d.y1 - d.y0);
        const big = ddx > 12 || ddy > 12;
        if (big) areaCommit(d.x0, d.y0, d.x1, d.y1);
        else { areaDrag = null; alert("DRAG A LINE OR A BOX TO MARK THE AREA", "bad"); refreshSelInfo(); }
        return;
      }
      if (e.button === 0 && input.dragging) {
        if (input.dragDist > 6) boxSelect(e.shiftKey);
        else clickSelect(e.shiftKey);
        input.dragging = false;
      }
      if (e.button === 1) input.panMMB = false;
    });
    cv.addEventListener("wheel", (e) => {
      e.preventDefault();
      Render.zoom(e.deltaY < 0 ? 1.12 : 0.89, input.mx, input.my);
    }, { passive: false });

    /* minimap.
       The minimap is drawn rotated to match the camera, so a click has to be
       rotated back before it means anything in world coordinates. */
    const mmToWorld = (e) => {
      const r = mm.getBoundingClientRect();
      let fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
      const yaw = (Render.cam && Render.three) ? Render.cam.yaw : null;
      if (yaw !== null && yaw !== undefined) {
        const rot = Math.PI / 2 - yaw;
        const dx = fx - 0.5, dy = fy - 0.5;
        const c = Math.cos(-rot), sn = Math.sin(-rot);
        fx = 0.5 + dx * c - dy * sn;
        fy = 0.5 + dx * sn + dy * c;
      }
      return { x: U.clamp(fx, 0, 1) * G.map.W * CFG.TILE,
               y: U.clamp(fy, 0, 1) * G.map.H * CFG.TILE };
    };
    const mmJump = (e) => { const w = mmToWorld(e); Render.setCam(w.x, w.y); };
    mm.addEventListener("mousedown", (e) => {
      if (e.button === 2) {
        const w = mmToWorld(e);
        issueOrderWorld(w.x, w.y, false);
      } else { mmJump(e); mm.onmousemove = mmJump; }
    });
    window.addEventListener("mouseup", () => { mm.onmousemove = null; });
    mm.addEventListener("contextmenu", e => e.preventDefault());

    /* keyboard */
    window.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      keys[k] = true;
      if (k === "a" && !e.ctrlKey) { input.attackMove = true; }
      if (k === "s") { for (const u of selection) if (u.kind === "unit" && u.owner === G.human) u.give({ type: "idle" }); Sfx.play("order"); }
      if (k === "g") { for (const u of selection) if (u.kind === "unit" && u.owner === G.human) { u.stance = "guard"; u.give({ type: "guard" }); } }
      if (k === "f") { for (const u of selection) if (u.kind === "unit" && u.owner === G.human) u.stance = u.stance === "hold" ? "guard" : "hold"; }
      if (k === "c") {
        /* counter-battery stance: guns answer plotted enemy artillery themselves */
        let n = 0, hc = 0;
        for (const u of selection) {
          if (u.kind !== "unit" || u.owner !== G.human || !u.isIndirect || !u.isIndirect()) continue;
          /* A launcher whose only indirect round is held is not a counter-
             battery gun: entities.js asks isIndirect(true) in that branch and
             would find nothing to shoot with, so setting the stance would be a
             button that lies about what it did. Toggling OFF is still allowed,
             so a stance set before this change can be cleared. */
          if (!u.isIndirect(true)) {
            if (u.stance === "counterbattery") { u.stance = "guard"; n++; }
            else hc++;
            continue;
          }
          u.stance = u.stance === "counterbattery" ? "guard" : "counterbattery";
          n++;
        }
        if (hc) G.alert(hc + " LAUNCHER" + (hc === 1 ? "" : "S") +
          " HELD \u2014 A BALLISTIC ROUND NEEDS A FIRE MISSION", "bad");
        if (n) G.alert(selection.find(u => u.stance === "counterbattery")
          ? "COUNTER-BATTERY STANCE — " + n + " GUN" + (n === 1 ? "" : "S")
          : "COUNTER-BATTERY OFF", "good");
      }
      /* N runs a submarine silent: a third of the speed for seven tenths of
         the radiated noise. It is the answer to an acoustic barrier and to a
         hunting escort both, and without it a barrier has a counter the player
         cannot find. Keyed like the counter-battery stance and, like it, with
         no button: it applies to one class of hull only. */
      if (k === "n") {
        let nq = 0;
        for (const u of selection) {
          if (u.kind !== "unit" || u.owner !== G.human || u.layer !== "sub") continue;
          u.stance = u.stance === "quiet" ? "guard" : "quiet";
          nq++;
        }
        if (nq) G.alert(selection.find(u => u.stance === "quiet")
          ? "SILENT RUNNING — " + nq + " BOAT" + (nq === 1 ? "" : "S")
          : "SILENT RUNNING OFF", "good");
      }
      /* M lays mines when a layer is selected, and toggles repair otherwise.
         The two never apply to the same selection. */
      if (k === "m" && !selectedLayers().length) setRepair(!input.repairMode);
      if (k === "delete") {
        if (selection.length && selection[0].kind === "building" && selection[0].owner === G.human)
          G.sellBuilding(selection[0]);
        else setSell(!input.sellMode);
      }
      if (k === "escape" && pendingSupport) { pendingSupport = null; refreshCards(); G.alert("FIRE MISSION CANCELLED"); return; }
      if (k === "escape" && areaMode) { areaMode = null; areaDrag = null; refreshSelInfo(); G.alert("CANCELLED"); return; }
      if (k === "escape" && obsMode) { obsMode = null; refreshSelInfo(); G.alert("CANCELLED"); return; }
      if (k === "escape" && mineMode) { mineMode = false; refreshSelInfo(); G.alert("MINE LAYING CANCELLED"); return; }
      if (k === "escape" && scatMode) { scatMode = false; refreshSelInfo(); G.alert("FIRE MISSION CANCELLED"); return; }
      if (k === "escape" && airCmdMode) { airCmdMode = null; refreshSelInfo(); G.alert("ORDER CANCELLED"); return; }
      if (k === "escape" && sortieMode) { cancelSortie(); G.alert("SORTIE CANCELLED"); return; }
      if (k === "escape") {
        if (menuOpen) { closeMenu(true); }
        else if (input.placing || input.launching || input.sellMode || input.repairMode || selection.length) {
          input.placing = null; input.launching = null;
          setSell(false); setRepair(false); clearSel();
        } else openMenu();
      }
      if (k === "tab") {
        e.preventDefault();
        if (selection.length > 1 && cycleSubgroup()) return;
        const order = ["building", "defense", "infantry", "vehicle", "aircraft", "naval"];
        selectTab(order[(order.indexOf(curTab) + 1) % order.length]);
      }
      if (k === " ") {
        e.preventDefault();
        if (e.shiftKey && G.eventX) Render.setCam(G.eventX, G.eventY);   // last event
        else jumpToAttention();                                          // what needs me
      }
      if (k === "u") unloadSelection();
      /* aircraft orders from the keyboard as well as the panel */
      if (k === "m" && selectedLayers().length) { mineOrder(); return; }
      if (k === "l" && selectedDispensers().length) { scatterOrder(); return; }
      if (k === "r" && selectedAircraft().length) { airOrder("rtb"); return; }
      if (k === "y" && selectedAircraft().length) { airOrder("cap"); return; }
      if (k === "t" && selectedAircraft().length) { airOrder("strike"); return; }
      if (k === "h") Render.setCam(G.human.homeX, G.human.homeY);
      /* V hides the weapon envelopes: useful once a player knows their ranges
         and wants the ground back. Both renderers read the same flag. */
      if (k === "v" && !e.ctrlKey && !e.metaKey) {
        CFG.SHOW_RANGE_RINGS = CFG.SHOW_RANGE_RINGS === false;
        G.alert(CFG.SHOW_RANGE_RINGS ? "RANGE RINGS ON" : "RANGE RINGS OFF");
      }
      if (k === "p" && e.shiftKey) setPanMode(panMode === "follow" ? "push" : "follow");
      if (k === "q" && Render.rotate) Render.rotate(0.22);
      if (k === "e" && Render.rotate) Render.rotate(-0.22);
      if (k === "d") {
        /* D is the key players reach for first, so it unloads a loaded
           transport as well as deploying a rig. The two never apply to the
           same unit, so both can run. */
        unloadSelection();
        for (const u of selection) {
          if (u.kind !== "unit" || !u.def.deployTo) continue;
          const bid = u.def.deployTo, bd = BUILDINGS[bid];
          const tx = u.tx - ((bd.w / 2) | 0), ty = u.ty - ((bd.h / 2) | 0);
          /* clear own footprint by momentarily ignoring the unit */
          u.carried = true;
          const ok = G.canPlace(G.human, bid, tx, ty);
          u.carried = false;
          if (ok) {
            u.dead = true;
            const b = G.placeBuilding(G.human, bid, tx, ty, true);
            b.hp = b.maxHp * (u.hp / u.maxHp);
            G.alert("CONSTRUCTION YARD DEPLOYED", "good");
            Sfx.play("ready");
          } else G.alert("CANNOT DEPLOY HERE — NEED CLEAR FLAT GROUND", "bad");
        }
      }
      if (/^[0-9]$/.test(k)) {
        if (e.ctrlKey) {
          groups[k] = selection.filter(u => u.owner === G.human);
          G.alert("GROUP " + k + ": " + groups[k].length + " UNITS");
          e.preventDefault();
        } else if (e.shiftKey) {
          /* Shift+digit = camera bookmark: set on first use, jump after */
          if (!bookmarks[k]) {
            bookmarks[k] = { x: Render.cam.x, y: Render.cam.y };
            G.alert("CAMERA BOOKMARK " + k + " SET");
          } else Render.setCam(bookmarks[k].x, bookmarks[k].y);
        } else if (groups[k] && groups[k].length) {
          const live = groups[k].filter(x => !x.dead);
          const now = performance.now();
          const dbl = lastGroupKey === k && now - lastGroupT < 400;
          lastGroupKey = k; lastGroupT = now;
          clearSel();
          selection = live;
          for (const s2 of selection) s2.selected = true;
          subIdx = -1;
          if (dbl && live.length) Render.setCam(live[0].x, live[0].y);   // double-tap centres
          refreshSelInfo();
        }
      }
    });
    window.addEventListener("keyup", (e) => {
      const k = e.key.toLowerCase();
      keys[k] = false;
      if (k === "a") input.attackMove = false;
    });

    /* command buttons */
    document.getElementById("c-sell").addEventListener("click", () => setSell(!input.sellMode));
    /* clicking the bar starts the re-equipment when it is actually available */
    const eraEl = document.getElementById("erabar");
    if (eraEl) eraEl.addEventListener("click", () => {
      if (!G.human || !G.human.eraStepInfo || !G.human.eraStepInfo()) return;
      if (G.human.eraLockReason()) {
        G.alert(G.human.eraLockReason(), "warn");
        return;
      }
      if (G.human.startEraAdvance()) {
        const t = G.human.eraTarget;
        G.alert("RE-EQUIPPING TO " + ERA_INFO[t].name.toUpperCase(), "good");
        Sfx.play("build");
        refreshEraBar();
        refreshCards();
      }
    });

    document.getElementById("c-repair").addEventListener("click", () => setRepair(!input.repairMode));
    document.getElementById("r-pause").addEventListener("click", togglePause);
    bindMenu();
    document.getElementById("r-speed").addEventListener("click", cycleSpeed);
    document.querySelectorAll("#tabs .tab").forEach(t =>
      t.addEventListener("click", () => selectTab(t.dataset.q)));
  }

  function setSell(v) { input.sellMode = v; if (v) input.repairMode = false; syncCmd(); }
  function setRepair(v) { input.repairMode = v; if (v) input.sellMode = false; syncCmd(); }
  function syncCmd() {
    document.getElementById("c-sell").classList.toggle("on", input.sellMode);
    document.getElementById("c-repair").classList.toggle("on", input.repairMode);
  }
  function togglePause() {
    G.paused = !G.paused;
    document.getElementById("r-pause").textContent = G.paused ? ">" : "II";
  }

  /* ---------- pause / save / quit ---------- */
  let menuOpen = false;
  function openMenu() {
    menuOpen = true;
    G.paused = true;
    document.getElementById("r-pause").textContent = ">";
    const info = document.getElementById("pm-info");
    const slot = SaveGame.peek(SaveGame.KEY);
    const enemies = G.players.filter(p => p.isAI && !p.defeated).length;
    info.innerHTML =
      "<b>" + G.map.name + "</b><br>" +
      "elapsed " + U.mmss(G.time) + " &middot; " + enemies + " enemy commander" + (enemies === 1 ? "" : "s") + " left<br>" +
      (slot ? "saved game: " + new Date(slot.savedAt).toLocaleString() : "no saved game");
    document.getElementById("pm-load").disabled = !slot;
    document.getElementById("pausemenu").classList.remove("hidden");
  }
  function closeMenu(resume) {
    menuOpen = false;
    document.getElementById("pausemenu").classList.add("hidden");
    if (resume) { G.paused = false; document.getElementById("r-pause").textContent = "II"; }
  }
  function bindMenu() {
    const on = (id, fn) => { const el = document.getElementById(id); if (el) el.onclick = fn; };
    on("pm-resume", () => closeMenu(true));
    on("pm-save", () => {
      const r = SaveGame.save(G);
      G.alert(r.ok ? "GAME SAVED (" + Math.round(r.bytes / 1024) + " KB)" : "SAVE FAILED: " + r.error,
              r.ok ? "good" : "bad");
      if (r.ok) closeMenu(true);
    });
    on("pm-load", () => {
      const r = SaveGame.load();
      if (!r.ok) { G.alert("LOAD FAILED: " + r.error, "bad"); return; }
      closeMenu(true);
      Main.rebind(r.game);
      r.game.alert("GAME RESTORED — " + U.mmss(r.game.time) + " ELAPSED", "good");
    });
    on("pm-quit", () => { closeMenu(false); location.reload(); });
  }
  function cycleSpeed() {
    G.speed = G.speed >= 3 ? 1 : G.speed + 1;
    document.getElementById("r-speed").textContent = G.speed + "x";
  }

  /* ---------- picking ---------- */
  function pickAt(mx, my, includeBuildings) {
    let best = null, bd = Infinity;
    for (const e of G.entities) {
      if (e.dead || e.carried) continue;
      if (!includeBuildings && e.kind === "building") continue;
      let ex, ey;
      if (Render.entityScreen) {
        const p = Render.entityScreen(e);
        if (p.behind) continue;
        ex = p.x; ey = p.y;
      } else {
        ex = Render.sx(e.x, e.y);
        ey = Render.sy(e.x, e.y, e.layer === "air" ? 0 : GameMap.elevAt(G.map, e.tx, e.ty)) -
          (e.layer === "air" ? 34 * Render.cam.z : 0);
      }
      const rr = Math.max(12, (e.r + 6) * Render.cam.z);
      let d = U.dist(mx, my, ex, ey - (e.kind === "building" ? 8 : 0));
      /* A unit standing on a structure must win the click, or aircraft parked
         on their own airbase can never be selected at all - the building is
         always underneath them and always wins on distance. */
      if (e.kind === "unit") d -= 14;
      if (d < rr && d < bd) {
        /* fog check for enemies */
        /* A submerged boat is decided by SONAR ALONE and the fog test is not
           applied to it. The two used to be ANDed, so a boat held by a sensor
           with no eyes on that water - the Coastal Sonar Array hears at eleven
           tiles and sees at five, and an acoustic node does not see at all -
           was tracked, targetable and shot at by the guns while staying
           unclickable. Every barrier contact would have been one of those. */
        if (e.layer === "sub" && e.owner !== G.human) {
          if (!G.canSeeSub(G.human, e)) continue;
        } else if (e.owner !== G.human && G.fogEnabled) {
          /* Fog has three states: 0 never seen, 1 explored, 2 in sight now.
             A UNIT may only be picked while it is actually in sight - it moves,
             and a remembered position is worthless a few seconds later.

             A STRUCTURE may be picked once the ground has been EXPLORED, because
             concrete does not move and remembering where a refinery stands is
             the whole point of scouting. What it may not be is picked on ground
             nobody has ever visited: this test used to exempt buildings from the
             fog check altogether, so every enemy structure on the map was
             clickable from the first second - and with a thirty-tile launcher
             that meant shelling a base you had never found, through fog, on turn
             one. The exemption was presumably meant to express "you remember
             what you have seen"; it actually expressed "you know everything". */
          const fg = G.fog[e.ty * G.map.W + e.tx];
          if (e.kind === "building" ? fg === 0 : fg !== 2) continue;
        }
        bd = d; best = e;
      }
    }
    return best;
  }
  function clearSel() { for (const s of selection) s.selected = false; selection = []; refreshSelInfo(); }

  function clickSelect(shift) {
    const e = pickAt(input.mx, input.my, true);
    if (!shift) clearSel();
    if (e && e.owner === G.human) {
      if (shift && e.selected) { e.selected = false; selection.splice(selection.indexOf(e), 1); }
      else if (!e.selected) { e.selected = true; selection.push(e); Sfx.play("click"); }
    } else if (e && !shift) {
      /* hostile or neutral: single view-only selection for intel */
      e.selected = true; selection = [e];
      Sfx.play("click");
    }
    refreshSelInfo();
  }
  /* Where an entity sits on screen, and whether that is inside the viewport.
     Factored out of boxSelect so the double-click selector applies exactly the
     same rule: what you can see is what you get. */
  function entityScreenPos(u) {
    if (Render.entityScreen) {
      const p = Render.entityScreen(u);
      return p.behind ? null : p;
    }
    return {
      x: Render.sx(u.x, u.y),
      y: Render.sy(u.x, u.y, u.layer === "air" ? 0 : GameMap.elevAt(G.map, u.tx, u.ty)) -
         (u.layer === "air" ? 34 * Render.cam.z : 0),
    };
  }
  function onScreen(u) {
    const p = entityScreenPos(u);
    if (!p) return false;
    return p.x >= 0 && p.y >= 0 && p.x <= cv.width && p.y <= cv.height;
  }

  function boxSelect(shift) {
    if (!shift) clearSel();
    const x0 = Math.min(input.dragX0, input.mx), x1 = Math.max(input.dragX0, input.mx);
    const y0 = Math.min(input.dragY0, input.my), y1 = Math.max(input.dragY0, input.my);
    for (const u of G.human.units) {
      if (u.dead || u.carried) continue;
      const p = entityScreenPos(u);
      if (!p) continue;
      const ex = p.x, ey = p.y;
      if (ex >= x0 && ex <= x1 && ey >= y0 && ey <= y1 && !u.selected) {
        u.selected = true; selection.push(u);
      }
    }
    /* prefer combat units: drop buildings from mixed box selections automatically */
    if (selection.length) Sfx.play("click");
    refreshSelInfo();
  }

  /* ---------- orders ---------- */
  /* Put every loaded transport in the selection ashore, and turn out any
     garrison, then say what happened. The old handler did the work silently,
     so when unload() failed - which it did any time the craft was more than
     six tiles from dry land - the player got no message, no sound and no
     reason, and concluded the control was broken. */
  function areaRect() { return areaMode && areaDrag ? areaDrag : null; }

  function unloadSelection() {
    let moved = 0, stuck = 0, touched = 0;
    for (const u of selection) {
      if (u.owner !== G.human) continue;
      if (u.kind === "unit" && u.cargo && u.cargo.length) {
        touched++;
        const n = u.unload();
        moved += n;
        if (!n) stuck++;
      }
      if (u.kind === "building" && u.garrison && u.garrison.length) {
        touched++;
        for (const g2 of u.garrison.slice()) { g2.leaveGarrison(); moved++; }
      }
    }
    if (moved) {
      alert(moved + (moved === 1 ? " UNIT DISEMBARKED" : " UNITS DISEMBARKED"), "good");
      Sfx.play("order");
    } else if (stuck) {
      alert("NO CLEAR GROUND TO UNLOAD ONTO \u2014 MOVE CLOSER TO SHORE", "bad");
    }
    return touched;
  }

  function issueOrder(mx, my, shift) {
    const target = pickAt(mx, my, true);
    const wp = Render.unproject(mx, my);
    issueOrderCore(target, wp.x, wp.y, shift);
  }
  function issueOrderWorld(wx, wy, shift) { issueOrderCore(null, wx, wy, shift); }

  /* ---- force fire ----
     Shell a point on the map rather than a thing you can see. Only indirect
     shooters can accept it: a tank has no way to lob a round over a hill, and
     letting it try would just walk it into the open. The window is generous
     because a launcher may have to drive a long way into range first, and
     because the reload on the heavy rounds runs to a minute and a half. */
  function forceFire(mx, my, shift) {
    const wp = Render.unproject(mx, my);
    const guns = selection.filter(u =>
      u.owner === G.human && u.kind === "unit" && !u.dead &&
      u.isIndirect && u.isIndirect());
    if (!guns.length) {
      alert("NOTHING SELECTED THAT CAN SHELL A MAP POINT", "bad");
      return;
    }
    let dry = 0;
    for (const u of guns) {
      if (u.roundsMax && u.rounds <= 0) { dry++; continue; }
      u.give({ type: "bombard", x: wp.x, y: wp.y, until: G.time + 90 }, shift);
    }
    const firing = guns.length - dry;
    if (firing) {
      Sfx.play("order");
      G.pingEvent(wp.x, wp.y);
      alert(firing + (firing === 1 ? " GUN" : " GUNS") + " ON FIRE MISSION" +
            (dry ? "  (" + dry + " OUT OF ROUNDS)" : ""), "good");
    } else {
      alert("OUT OF ROUNDS \u2014 WAITING ON SUPPLY", "bad");
    }
    refreshSelInfo();
  }

  function issueOrderCore(target, wx, wy, shift) {
    const mine = selection.filter(s => s.owner === G.human);
    if (!mine.length) return;                       // enemy intel selection takes no orders
    /* rally point if a production building is selected */
    if (mine.every(s => s.kind === "building")) {
      for (const b of mine) if (b.def.produces) b.rally = { x: wx, y: wy };
      Sfx.play("order");
      return;
    }
    const units = mine.filter(s => s.kind === "unit");
    if (!units.length) return;

    /* A vacant civilian block is not the enemy. Deal with it before the
       hostile branch, or right-clicking one with a rifle squad opens fire on
       the building the squad was being sent to occupy. */
    if (target && target.kind === "building" && target.neutral && target.def.garrison) {
      let occupied = 0;
      for (const u of units) if (u.canGarrison && u.canGarrison(target)) {
        u.give({ type: "enter", target }, shift); occupied++;
      }
      if (occupied) {
        Combat.addEffect({ t: "text", x: target.x, y: target.y - 20, s: "OCCUPY",
                           life: 1.0, max: 1.0, c: "#8fd05f" });
        Sfx.play("order");
        return;
      }
      /* nothing in the selection can occupy it - engineers and vehicles fall
         through to a plain move rather than shelling somebody's housing */
      const n2 = units.length, cols2 = Math.ceil(Math.sqrt(n2));
      units.forEach((u, i) => {
        const ox = (i % cols2 - (cols2 - 1) / 2) * (u.r * 2.6);
        const oy = (Math.floor(i / cols2) - (Math.ceil(n2 / cols2) - 1) / 2) * (u.r * 2.6);
        u.give({ type: "move", x: wx + ox, y: wy + oy }, shift);
      });
      Sfx.play("order");
      return;
    }
    if (target && target.owner !== G.human && !G.allied(G.human, target.owner)) {
      /* engineers storm the structure instead of shooting at it */
      const eng = target.kind === "building" ? units.filter(u => u.def.engineer) : [];
      for (const u of eng) u.give({ type: "enter", target }, shift);
      let shooters = 0;
      for (const u of units) {
        if (u.def.engineer && target.kind === "building") continue;
        if (u.canTarget(target)) { u.give({ type: "attack", target }, shift); shooters++; }
      }
      if (eng.length) {
        Combat.addEffect({ t: "text", x: target.x, y: target.y - 20, s: "CAPTURE",
                           life: 1.0, max: 1.0, c: "#8fd05f" });
      }
      if (shooters) {
        Combat.addEffect({ t: "text", x: target.x, y: target.y - 20, s: "ENGAGE",
                           life: 0.7, max: 0.7, c: "#ff8a6b" });
      }
      if (eng.length || shooters) { Sfx.play("order"); return; }
      /* Nothing in the selection could storm it and nothing could shoot it -
         a column of tanks right-clicked onto a neutral civilian block, say.
         This used to return anyway, so the click was swallowed whole: no
         movement, no sound, no message. Fall through and treat it as an order
         to go there, which is what the player plainly meant. */
    }
    /* a garrisonable structure - civilian or your own - takes infantry inside */
    if (target && target.kind === "building" && target.def.garrison) {
      let n = 0;
      for (const u of units) {
        if (u.canGarrison && u.canGarrison(target)) { u.give({ type: "enter", target }); n++; }
      }
      if (n) { Sfx.play("order"); return; }
    }
    if (target && target.owner === G.human) {
      /* friendly interactions: enter transport / capture / repair pad */
      /* ---- what a right-click near your own airfield is actually aimed at ----
         Right-clicking your own airbase, or a deck the aircraft can operate
         from, is an order to land on THAT one. It used to fall through to a
         plain move, so the aircraft flew to the coordinates under its own
         strip and hovered over it instead of shutting down on it.

         That test used to read the entity pickAt() returned, and pickAt gives
         every UNIT a deliberate 14-pixel bonus over whatever it is standing on
         ("a unit standing on a structure must win the click", above) and draws
         an airborne machine 34*z pixels above its ground point. So the click
         resolved to the Falcon parked on the ramp, or to the rifle squad dug in
         beside the strip - a unit with no `pads` and no deck - and the recall
         dropped out of the chain as a plain move to the coordinates under the
         runway. Measured on a 9x11 sweep of right-clicks around a friendly
         airbase with an E-3 selected: 60 of 99 clicks lost with three aircraft
         on the ramp, 75 of 99 with four rifle squads beside it, 55 of 99 with
         an EMPTY ramp and four tanks parked nearby, and on a carrier deck only
         the single pixel at the centre of the hull answered at all.

         So resolve the landing host from the WORLD POINT, not from whichever
         entity won the pick: if the click landed on a friendly ramp, or on a
         deck this airframe can use, that is the host whoever happens to be
         standing on it. Per unit rather than on `target` itself, because an
         engineer right-clicking the same pixel is asking to enter the building
         and a ground unit must still get its plain move. */
      const landingHost = (u) => {
        if (u.layer !== "air") return null;
        const fits = (h) => !h || h.dead || h.owner !== G.human ? false
          : h.kind === "building"
            ? !!(h.def.pads && h.buildProgress >= 1)
            : !!(u.def.carrierCapable && (h.def.carrier || (u.def.hover && h.def.helo)));
        if (fits(target)) return target;
        /* an airframe shut down on a ramp IS that ramp, as far as another
           aircraft is concerned - this is the carrier case, where the deck is
           a moving hull and the parked sprite is all there is to click */
        if (target.kind === "unit" && target.layer === "air" && target.padOn &&
            (target.parked || (target.order && target.order.type === "parked")) &&
            fits(target.padOn)) return target.padOn;
        /* nobody useful was picked: ask what is under the point on the ground */
        const tx = Math.floor(wx / CFG.TILE), ty = Math.floor(wy / CFG.TILE);
        for (const b of G.human.buildings)
          if (fits(b) && tx >= b.tx && ty >= b.ty &&
              tx < b.tx + b.def.w && ty < b.ty + b.def.h) return b;
        for (const s2 of G.human.units)
          if (fits(s2) && U.dist(wx, wy, s2.x, s2.y) <= Math.max(s2.r, CFG.TILE)) return s2;
        return null;
      };
      /* A recall used to be the one order in the game that said nothing at all:
         every other route home raises a toast (BASE, the hangar arrow, the
         hangar RECALL), while this one played the same click a move plays. A
         taken recall and a lost recall were indistinguishable at the moment of
         the click, which is exactly why this shipped as a bug report. */
      let sentHome = 0, airMoved = 0;
      for (const u of units) {
        const host = landingHost(u);
        if (host) {
          u.padOn = host; u.parked = false;
          u.give({ type: "rtb" }, shift);
          sentHome++;
        }
        else if (target.kind === "unit" && target.def.cargo && !target.def.carrier && u.cat === "infantry")
          u.give({ type: "enter", target });
        else if (target.kind === "unit" && target.def.cargo && target.def.amphib && (u.cat === "vehicle" || u.cat === "infantry"))
          u.give({ type: "enter", target });
        else if (target.kind === "building" && u.def.engineer)
          u.give({ type: "enter", target });
        else { u.give({ type: "move", x: wx, y: wy }, shift); if (u.layer === "air") airMoved++; }
      }
      if (sentHome)
        alert(sentHome === 1 ? "RETURNING TO BASE"
                             : sentHome + " AIRCRAFT RETURNING TO BASE", "good");
      /* and say why, when the answer is no. An aircraft right-clicked onto a
         friendly structure that is not a ramp gets a move, which is a
         defensible order and an invisible one. */
      else if (airMoved && target.kind === "building")
        alert("NOT A LANDING SURFACE \u2014 MOVING THERE", "bad");
      Sfx.play("order");
      return;
    }
    /* ---- plain move, as a formation ----

       The old version laid an axis-aligned grid over the destination and gave
       slot i to unit i. Two things were wrong. The grid never turned to face
       where the group was going, so a column ordered east arrived side-on. And
       because slots went out in list order, units routinely crossed the whole
       formation to reach a slot on the far side, which is what made a large
       selection churn every time it was ordered anywhere.

       Now the grid is rotated to the direction of travel - ranks across the
       axis of advance, files along it - and each slot goes to whichever
       unassigned unit is already nearest it, so nobody crosses anybody. */
    const n = units.length;
    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);
    let cx0 = 0, cy0 = 0;
    for (const u of units) { cx0 += u.x; cy0 += u.y; }
    cx0 /= n; cy0 /= n;
    const head = Math.atan2(wy - cy0, wx - cx0);
    const ch = Math.cos(head), sh = Math.sin(head);
    /* one spacing for the whole group, set by its widest member, and one pace,
       set by its slowest, so a mixed formation neither overlaps nor strings out */
    let gap = 0, slowest = Infinity;
    for (const u of units) {
      gap = Math.max(gap, u.r * 2.6);
      const sp = (u.def.speed || 1) * (u.speedMul ? u.speedMul() : 1);
      if (sp < slowest) slowest = sp;
    }
    const slots = [];
    for (let i = 0; i < n; i++) {
      const across = (i % cols - (cols - 1) / 2) * gap;          // rank
      const along  = (Math.floor(i / cols) - (rows - 1) / 2) * gap;  // file
      slots.push({ x: wx + ch * along - sh * across,
                   y: wy + sh * along + ch * across });
    }
    const pool = units.slice();
    for (const sl of slots) {
      let bi = 0, bd = Infinity;
      for (let i = 0; i < pool.length; i++) {
        const d = U.dist2(pool[i].x, pool[i].y, sl.x, sl.y);
        if (d < bd) { bd = d; bi = i; }
      }
      const u = pool[bi];
      pool.splice(bi, 1);
      /* A loaded landing craft sent to a beach it cannot itself drive onto is
         asking to put its cargo there. It goes to the aim point itself, with
         no formation offset, and unloads when it gets close. */
      if (u.cargo && u.cargo.length && u.layer !== "air") {
        const gx = (wx / CFG.TILE) | 0, gy = (wy / CFG.TILE) | 0;
        if (!GameMap.passable(G.map, gx, gy, u.layer)) {
          u.groupSpeed = 0;
          u.give({ type: "move", x: wx, y: wy, unloadAt: true }, shift);
          continue;
        }
      }
      /* Hold the group together on the road: everyone moves at the pace of the
         slowest member, so a formation arrives as a formation instead of strung
         out with the fast units alone at the front. A lone unit is never
         throttled. */
      u.groupSpeed = (n > 1) ? slowest : 0;
      u.give({ type: "move", x: sl.x, y: sl.y }, shift);
    }
    Combat.addEffect({ t: "text", x: wx, y: wy, s: "·", life: 0.5, max: 0.5, c: "#8fd05f" });
    Sfx.play("order");
  }

  function issueAttackMove(mx, my, shift) {
    /* An attack-move is a standing authority to engage what you meet, which is
       precisely what a held round does not have. The order is still given -
       the vehicle should still advance - but the player is told once why it
       will arrive with full pylons, rather than concluding the weapon is
       broken. Throttled so a column of six says it once. */
    const heldAM = selection.filter(u => u.kind === "unit" && u.owner === G.human &&
                                         !u.dead && u.allWeaponsHeld && u.allWeaponsHeld());
    if (heldAM.length && G.time - (issueAttackMove._warn || -99) > 20) {
      issueAttackMove._warn = G.time;
      alert(heldAM.length + (heldAM.length === 1 ? " UNIT" : " UNITS") +
            " WILL NOT FIRE ON AN ATTACK-MOVE \u2014 NAME THE TARGET", "bad");
    }
    const wp = Render.unproject(mx, my);
    for (const u of selection) if (u.kind === "unit" && u.owner === G.human)
      u.give({ type: "attackmove", x: wp.x, y: wp.y }, shift);
    Combat.addEffect({ t: "text", x: wp.x, y: wp.y, s: "ATTACK MOVE", life: 0.8, max: 0.8, c: "#ff8a6b" });
    Sfx.play("order");
  }

  function tryPlace() {
    const id = input.placing;
    if (!id) return;
    if (G.canPlace(G.human, id, input.placeTx, input.placeTy)) {
      const kind = input.placeKind;
      G.placeBuilding(G.human, id, input.placeTx, input.placeTy, false);
      /* construction over time */
      const b = G.human.buildings[G.human.buildings.length - 1];
      b.buildProgress = 0;
      const T = Math.max(0.5, G.human.factionTime(BUILDINGS[id]));
      const step = () => {
        if (b.dead) return;
        b.buildProgress = Math.min(1, b.buildProgress + 0.1 / T * 1.5);
        if (b.buildProgress < 1) G.defer(0.1, step); else Render.markDirty();
      };
      G.defer(0.1, step);
      G.human.consumeReady(kind, id);
      input.placing = G.human.readyItem(kind, id) ? id : null;   // keep placing duplicates
      if (input.placing) input.placeKind = kind;
      /* walls chain: pay for the next segment on the spot and stay in placement mode */
      if (BUILDINGS[id].line && !input.placing) {
        const cost = G.human.factionCost(BUILDINGS[id]);
        if (G.human.cash >= cost) {
          G.human.cash -= cost;
          G.human.queues[kind].ready.push({ id, def: BUILDINGS[id], paid: cost });
          input.placing = id; input.placeKind = kind;
        }
      }
      Sfx.play("click");
      updateCards();
    } else G.alert("CANNOT DEPLOY THERE", "bad");
  }

  /* narrow the selection to one unit type — the Tab sub-group idiom */
  function selectSubgroup(defId) {
    const keep = selection.filter(e => e.def.id === defId);
    if (!keep.length) return;
    for (const e of selection) if (keep.indexOf(e) < 0) e.selected = false;
    selection = keep;
    refreshSelInfo();
    Sfx.play("click");
  }
  function cycleSubgroup() {
    const ids = [];
    for (const e of selection) if (ids.indexOf(e.def.id) < 0) ids.push(e.def.id);
    if (ids.length < 2) return false;
    subIdx = (subIdx + 1) % ids.length;
    selectSubgroup(ids[subIdx]);
    return true;
  }
  let subIdx = -1;

  /* ================= attention layer =================
     Fuel, ammo, suppression and idle production are all simulated but were
     invisible unless you hand-picked a unit. This scores everything that wants
     you and puts the top items one key away.                               */
  let attn = [], attnT = 0, attnIdx = 0;
  function scoreAttention() {
    const p = G.human, out = [];
    const add = (pri, kind, text, x, y, ref) => out.push({ pri, kind, text, x, y, ref });

    /* production waiting on you */
    for (const kind of ["building", "defense"]) {
      const n = p.readyCount(kind);
      if (n) add(95, "ready", n + " STRUCTURE" + (n > 1 ? "S" : "") + " READY TO PLACE",
                 p.homeX, p.homeY, null);
    }
    for (const k of ["infantry", "vehicle", "aircraft", "naval"]) {
      const q = p.queues[k];
      if (!q.items.length && p.prodSpeed(k) > 0) {
        add(38, "idleq", k.toUpperCase() + " QUEUE EMPTY", p.homeX, p.homeY, null);
      }
    }
    /* silos charged */
    for (const b of p.buildings)
      if (!b.dead && b.def.superweapon && b.swCharge >= 1)
        add(90, "silo", b.def.superweapon.label + " READY", b.x, b.y, b);

    /* base under attack */
    for (const b of p.buildings) {
      if (b.dead || !b.lastHitAt) continue;
      if (G.time - b.lastHitAt < 5) { add(100, "attack", "BASE UNDER ATTACK", b.x, b.y, b); break; }
    }
    /* units in trouble */
    let dry = 0, lowFuel = 0, broken = 0, idleHarv = 0, idleUnits = 0;
    let dryRef = null, fuelRef = null, brokenRef = null, harvRef = null, idleRef = null;
    for (const u of p.units) {
      if (u.dead || u.carried) continue;
      if (u.ammoMax && u.ammo <= 0.05) { dry++; dryRef = dryRef || u; }
      else if (u.fuelMax && u.fuel < 22) { lowFuel++; fuelRef = fuelRef || u; }
      if (u.isBroken && u.isBroken()) { broken++; brokenRef = brokenRef || u; }
      if (u.def.harvester && u.order.type === "idle") { idleHarv++; harvRef = harvRef || u; }
      /* A launcher waiting for a fire mission is not an idle unit, it is a
         unit doing exactly what it is for. Tested on the loadout rather than
         on the stance, because save.js restores a saved stance over the
         constructor's default and F can change it either way. */
      else if (!u.def.harvester && u.def.weapons.length && u.order.type === "idle" &&
               u.stance !== "hold" &&
               !(u.allWeaponsHeld && u.allWeaponsHeld())) { idleUnits++; idleRef = idleRef || u; }
    }
    if (dry) add(78, "ammo", dry + " UNIT" + (dry > 1 ? "S" : "") + " OUT OF ORDNANCE",
                 dryRef.x, dryRef.y, dryRef);
    if (lowFuel) add(70, "fuel", lowFuel + " UNIT" + (lowFuel > 1 ? "S" : "") + " LOW ON FUEL",
                     fuelRef.x, fuelRef.y, fuelRef);
    if (broken) add(84, "broken", broken + " SQUAD" + (broken > 1 ? "S" : "") + " BROKEN",
                    brokenRef.x, brokenRef.y, brokenRef);
    if (idleHarv) add(66, "harv", idleHarv + " IDLE ORE HAULER" + (idleHarv > 1 ? "S" : ""),
                      harvRef.x, harvRef.y, harvRef);
    /* logistics: guns with nothing to fire, and units cut off from supply */
    let dryGuns = 0, gunRef = null, cutOff = 0, cutRef = null;
    for (const u of p.units) {
      if (u.dead) continue;
      if (u.roundsMax && u.rounds === 0) { dryGuns++; gunRef = gunRef || u; }
      if (u.isOutOfSupply && u.supplyStrain() > 0.4) { cutOff++; cutRef = cutRef || u; }
    }
    if (dryGuns) add(78, "dry", dryGuns + " GUN" + (dryGuns > 1 ? "S" : "") + " OUT OF ROUNDS",
                     gunRef.x, gunRef.y, gunRef);
    if (cutOff > 1) add(58, "supply", cutOff + " UNITS OUT OF SUPPLY",
                        cutRef.x, cutRef.y, cutRef);
    if (idleUnits > 3) add(30, "idle", idleUnits + " IDLE UNITS", idleRef.x, idleRef.y, idleRef);
    /* counter-battery plots waiting to be shot at */
    const cb = G.cbTargets ? G.cbTargets(p) : [];
    if (cb.length) add(74, "cb", "ENEMY GUNS PLOTTED", cb[0].px, cb[0].py, null);

    out.sort((a, b) => b.pri - a.pri);
    return out.slice(0, 3);
  }
  function jumpToAttention(i) {
    if (!attn.length) { G.alert("NOTHING NEEDS ATTENTION"); return; }
    const a = attn[i === undefined ? (attnIdx++ % attn.length) : i];
    if (!a) return;
    if (a.kind === "ready") { selectTab(a.text.indexOf("STRUCT") >= 0 ? "building" : curTab); }
    Render.setCam(a.x, a.y);
    if (a.ref && a.ref.owner === G.human) {
      clearSel(); a.ref.selected = true; selection.push(a.ref); refreshSelInfo();
    }
    Sfx.play("click");
  }
  function renderAttention() {
    const box = document.getElementById("attn");
    if (!box) return;
    if (!attn.length) { box.style.display = "none"; box.dataset.sig = ""; return; }
    const sig = attn.map(a => a.kind + a.text).join("|");
    box.style.display = "flex";
    if (box.dataset.sig === sig) return;
    box.dataset.sig = sig;
    box.innerHTML = "";
    attn.forEach((a, i) => {
      const el = document.createElement("div");
      el.className = "at at-" + a.kind + (a.pri >= 84 ? " urgent" : "");
      el.textContent = a.text;
      el.addEventListener("click", () => jumpToAttention(i));
      box.appendChild(el);
    });
  }

  /* ---------- strategic weapons ---------- */
  function syncSuperweapons() {
    const box = document.getElementById("swbar");
    if (!box) return;
    const silos = G.human.buildings.filter(b => !b.dead && b.def.superweapon && b.buildProgress >= 1);
    if (!silos.length) { box.innerHTML = ""; box.style.display = "none"; return; }
    box.style.display = "flex";
    const want = silos.map(b => b.id).join(",");
    if (box.dataset.sig !== want) {
      box.dataset.sig = want;
      box.innerHTML = "";
      for (const b of silos) {
        const el = document.createElement("div");
        el.className = "sw" + (b.def.superweapon.nuke ? " nuke" : "");
        el.innerHTML = '<div class="swfill"></div><div class="swtx"></div>';
        el.addEventListener("click", () => {
          if (b.dead || b.swCharge < 1) { G.alert("SILO NOT READY", "bad"); return; }
          input.launching = b;
          input.placing = null;
          setSell(false); setRepair(false);
          G.alert("SELECT TARGET — RMB CANCELS", "good");
          Sfx.play("click");
        });
        el._b = b;
        box.appendChild(el);
      }
    }
    for (const el of box.children) {
      const b = el._b;
      if (!b || b.dead) continue;
      const pct = Math.max(0, Math.min(1, b.swCharge));
      el.querySelector(".swfill").style.width = (pct * 100) + "%";
      const ready = pct >= 1;
      el.classList.toggle("ready", ready);
      el.classList.toggle("armed", input.launching === b);
      const secs = Math.ceil((1 - pct) * b.def.superweapon.charge);
      el.querySelector(".swtx").textContent =
        (b.def.superweapon.nuke ? "NUCLEAR" : "BALLISTIC") + " · " + (ready ? "READY" : U.mmss(secs));
    }
  }

  /* ---------- edge pan & per-frame ---------- */
  /* How long the pointer has rested against an edge that has UI behind it.
     Crossing the strip on the way to the build column or the top bar should
     not move the map; deliberately parking there still should. */
  let edgeDwell = 0;
  const EDGE_DWELL = 0.18;                       // seconds

  function frame(dt) {
    /* edge panning (only once the mouse has actually entered the window) */
    const m = CFG.EDGE_PAN, sp = CFG.PAN_SPEED * dt / Render.cam.z;
    let dx = 0, dy = 0;
    if (input.hasMouse) {
      const atUI = input.mx > cv.width - m || input.my < m;   // sidebar or top bar
      edgeDwell = atUI ? edgeDwell + dt : 0;
      const uiEdgeOK = edgeDwell >= EDGE_DWELL;
      if (input.mx < m) dx -= 1;
      if (input.mx > cv.width - m && uiEdgeOK) dx += 1;
      if (input.my < m && uiEdgeOK) dy -= 1;
      if (input.my > cv.height - m) dy += 1;
    } else {
      edgeDwell = 0;
    }
    if (keys.arrowleft) dx -= 1; if (keys.arrowright) dx += 1;
    if (keys.arrowup) dy -= 1; if (keys.arrowdown) dy += 1;
    if (dx || dy) {
      if (Render.panAxes) {
        const ax = Render.panAxes(), k = sp * panSign();
        Render.moveCam((ax.rx * dx + ax.fx * dy) * k, (ax.ry * dx + ax.fy * dy) * k);
      } else {
        /* pan in iso screen axes for intuitive feel */
        const k2 = sp * panSign();
        const wx = (dx + dy * 1.72) * 0.5 * k2, wy = (dy * 1.72 - dx) * 0.5 * k2;
        Render.moveCam(wx, wy);
      }
    }

    /* topbar */
    document.querySelector("#r-cash span").textContent = "$" + U.fmt(G.human.cash);
    document.querySelector("#r-oil span").textContent = Math.floor(G.human.oil) + " bbl";
    const pu = G.human.powerUse(), po = G.human.powerOut();
    const rp = document.getElementById("r-power");
    rp.querySelector("span").textContent = po + "/" + pu + " MW";
    rp.classList.toggle("low", po < pu);
    /* Tier, our generation, how far we may still go, and what the enemy is
       fielding — the era system is only interesting if the player can see the
       gap they are fighting across. */
    let techTxt = "TECH " + ["", "I", "II", "III"][G.human.tech];
    if (typeof ERA_INFO !== "undefined" && G.human.era) {
      techTxt += " \u00b7 " + ERA_INFO[G.human.era].name;
      if (G.human.eraProgress > 0 && G.human.eraTarget) {
        techTxt += " \u2192 " + ERA_INFO[G.human.eraTarget].name +
                   " " + Math.ceil(G.human.eraProgress) + "s";
      } else if (G.human.eraCap && G.human.eraCap !== G.human.era) {
        techTxt += " (cap " + ERA_INFO[G.human.eraCap].name + ")";
      }
      /* the most advanced generation any hostile commander has re-equipped to */
      let foe = null;
      for (const q of G.players) {
        if (!q || q === G.human || q === G.neutral || q.defeated) continue;
        if (!q.era) continue;
        if (!foe || eraIndex(q.era) > eraIndex(foe)) foe = q.era;
      }
      if (foe) techTxt += "  \u2694 ENEMY " + ERA_INFO[foe].name;
    }
    document.querySelector("#r-tech span").textContent = techTxt;
    refreshEraBar();
    document.querySelector("#r-clock span").textContent = U.mmss(G.time);
    /* ---- electronic warfare readout ----
       Jamming is invisible by nature: without a readout the player only sees
       their picture quietly getting worse. This says so plainly, and says how
       badly, so the counter - ECCM, or killing the jammer - is an obvious move. */
    {
      const el2 = document.getElementById("r-ew");
      if (el2) {
        let worst = 0, where = null;
        for (const b of G.human.buildings) {
          if (b.dead || !b.def.radar) continue;
          const j = G.jamAgainst(G.human, b);
          if (j > worst) { worst = j; where = b; }
        }
        for (const u of G.human.units) {
          if (u.dead || !u.def.radar) continue;
          const j = G.jamAgainst(G.human, u);
          if (j > worst) { worst = j; where = u; }
        }
        /* Satellite denial is invisible to the loop above, which asks each of
           our own RADARS how badly it is being jammed. A GPS jammer does not
           touch a radar; it denies the ground our base stands on. Probed at
           the conyard, which is where the base is. */
        let gps = 0;
        if (G.gpsJamAt) {
          const hq = G.human.buildings.find(b => !b.dead && b.def.id === "conyard")
                  || G.human.buildings.find(b => !b.dead);
          if (hq) gps = G.gpsJamAt(G.human, hq.x, hq.y);
        }
        const sp = el2.querySelector("span");
        if (gps > 0.15 && gps >= worst) {
          el2.style.display = ""; el2.style.color = "#ffd24a";
          sp.textContent = "GPS DENIED " + Math.round(gps * 100) + "%";
          el2.title = "A hostile jammer is denying satellite navigation over your base. " +
                      "Precision missions called onto this ground will scatter. " +
                      "Destroy the jammer.";
        } else if (worst > 0.55) {
          el2.style.display = ""; el2.style.color = "#ff6a5a";
          sp.textContent = "RADAR JAMMED";
          el2.title = "A hostile jammer has switched your radar picture off here. " +
                      "Research Frequency Agility, or destroy the jammer.";
        } else if (worst > 0.15) {
          el2.style.display = ""; el2.style.color = "#ffb454";
          sp.textContent = "ECM " + Math.round(worst * 100) + "%";
          el2.title = "Your radar picture is being degraded by hostile jamming.";
        } else {
          el2.style.display = "none";
        }
        el2._where = where;
      }
    }
    const wx = G.weather ? G.weather() : null;
    if (wx) {
      const we = document.querySelector("#r-weather span");
      we.textContent = wx.name;
      /* amber when the weather is hurting whoever lacks thermal sights */
      we.parentElement.style.color = wx.vis < 0.5 ? "#ffb454" : wx.vis < 0.9 ? "#d8cfa8" : "";
      we.parentElement.title = wx.vis >= 1 ? "Clear conditions"
        : "Visibility " + Math.round(wx.vis * 100) + "% \u2014 thermal sights recover most of it";
    }
    document.getElementById("mm-power").textContent =
      po < pu ? "LOW POWER — PRODUCTION SLOWED" : "GRID NOMINAL";
    document.getElementById("mm-power").style.color = po < pu ? "#ff6b52" : "#6f8a68";

    attnT -= dt;
    if (attnT <= 0) { attnT = 1.0; attn = scoreAttention(); }
    renderAttention();
    updateCards();
    refreshSelInfo();
    syncSuperweapons();
    Render.drawMinimap(mm);
  }

  /* ---------- alerts & endgame ---------- */
  let lastAlert = { msg: "", t: 0 };
  function alert(msg, cls) {
    const now = performance.now();
    if (msg === lastAlert.msg && now - lastAlert.t < 4000) return;
    lastAlert = { msg, t: now };
    const el = document.createElement("div");
    el.className = "alert" + (cls ? " " + cls : "");
    el.textContent = msg;
    const box = document.getElementById("alerts");
    if (!box) return;                       // no alert rail: say nothing, break nothing
    box.appendChild(el);
    if (cls === "bad") Sfx.play("alarm");
    setTimeout(() => el.remove(), 7000);
    while (box.children && box.children.length > 6 && box.firstChild) box.firstChild.remove();
  }
  function endGame(won) {
    if (!G) return;
    const es = document.getElementById("endscreen");
    es.classList.remove("hidden");
    document.getElementById("end-title").textContent = won ? "VICTORY" : "DEFEAT";
    document.getElementById("end-title").style.color = won ? "#8fd05f" : "#d05a45";
    const s = G.human.stats;
    document.getElementById("end-sub").textContent =
      "TIME " + U.mmss(G.time) + " · KILLS " + s.kills + " · LOSSES " + s.losses +
      " · ORE MINED $" + U.fmt(s.mined) + " · UNITS BUILT " + s.built;
  }

  return {
    areaRect, init, frame, alert, endGame, refreshCards, setPanMode,
           panMode: () => panMode,
           get input() { return input; }, get selection() { return selection; } };
})();
