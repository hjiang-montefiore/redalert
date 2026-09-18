/* ============ mapedit.js — the theatre editor ============
   Red Alert let you draw the ground you fought over, and the reason its editor
   worked is that it never pretended to be a second game: the same map format,
   the same start positions, the same everything, so a hand-drawn map played
   exactly like a shipped one. That is the idea borrowed here.

   WHAT AN EDITED MAP IS. Not a picture. A theatre id, a seed, an ore density
   and a grid size - the four things GameMap.build already takes - plus the
   tiles the player has since overruled, run-length encoded. So:
     - a map is small enough to paste into a message (a few kB, not 80),
     - the battle rebuilds it through GameMap.build like every other map, which
       is why the AI, the fog and the pathfinder behave identically on it,
     - and anything the generator DERIVES from the tiles (the fine coastline,
       the shore distance field, the smoothed elevation) is derived from the
       EDITED tiles, because the overrides are laid on inside build() before a
       single derived field is computed. Outside this file the same rule is
       enforced by game.js, which throws away Path's terrain tables and
       reachability labels the moment an edited map is in hand.

   THIS MODULE IS OPTIONAL MARKUP. index.html carries the editor's panel; every
   harness page carries a frozen copy of the menu and does not. On those pages
   nothing below the data layer runs: no listener is attached, nothing throws,
   and DEPLOY behaves exactly as it always has. main.js asks
   MapEdit.armed() and takes null for an answer.                              */
var MapEdit = (function () {
  const MAGIC = "IRONFRONT-MAP";
  /* one source of truth for the on-disk format: map.js implements it */
  const VERSION = (typeof GameMap !== "undefined" && GameMap.EDIT_V) || 1;
  const SLOTS = "ironfront.maps.v1";
  const SIZES = [96, 144, 192, 240, 288];
  const MAXUNDO = 16;
  const MAX_START = 8, MAX_OIL = 32, MAX_CIV = 400;

  /* ---------------- brushes ----------------
     The terrain brushes are GENERATED from CFG.TERRAIN, so a terrain type
     added to the game appears in the editor without anybody remembering to
     come back here - and it is painted in the colour the game itself uses. */
  const TOOLS = {}, TOOL_LIST = [];
  function addTool(key, label, kind, v, group, color) {
    TOOLS[key] = { key, label, kind, v, group, color };
    TOOL_LIST.push(TOOLS[key]);
  }
  for (const k of Object.keys(CFG.TERRAIN)) {
    const b = k | 0, td = CFG.TERRAIN[b];
    addTool("t" + b, td.name, "terrain", b, "Terrain", td.color);
  }
  /* 1200 and 450 are the two ends of what the generator actually lays down:
     a field peaks a little over a thousand at its heart and thins to a few
     hundred at the rim (map.js: (1-d/R) * 1250 * rich * richness). */
  addTool("orerich", "ore — rich seam", "ore", 1200, "Ore", "#c49e54");
  addTool("orethin", "ore — thin", "ore", 450, "Ore", "#8e6e38");
  addTool("oreoff", "scrape ore away", "ore", 0, "Ore", "#3a3a32");
  addTool("up", "raise ground", "elev", 1, "Relief", "#9aa892");
  addTool("down", "lower ground", "elev", -1, "Relief", "#55604f");
  addTool("start", "deployment site", "marker", "start", "Markers", "#b6d34a");
  addTool("oil", "oil survey node", "marker", "oil", "Markers", "#e8b93c");
  addTool("civ", "civilian block", "marker", "civ", "Markers", "#8b8f92");
  addTool("erase", "remove marker", "marker", "erase", "Markers", "#b0654c");

  /* ---------------- the document ---------------- */
  function create(o) {
    o = o || {};
    const th = THEATRES[o.th] ? o.th : THEATRE_LIST[0];
    const size = SIZES.indexOf(o.size | 0) >= 0 ? (o.size | 0) : 144;
    /* THE SEED BOX SHOWS A NUMBER, AND THAT NUMBER HAS TO WORK. adoptDoc
       writes the seed a map was grown from back into the box, so a string of
       digits arriving here is that same number coming home and is read as one.
       Hashing it instead - which is what the deployment screen does, because
       its box is never written back to - meant REGENERATE never reproduced the
       ground it was showing, and the seed in the status line was one nobody
       could type back in or send to anybody. Any other text (a word like
       "fulda-1") is still hashed. */
    const sTxt = String(o.seed).trim();
    const seed = (o.seed === undefined || o.seed === null || o.seed === "")
      ? ((Math.random() * 0xffffffff) >>> 0)
      : (typeof o.seed === "number" ? (o.seed >>> 0)
        : (/^[0-9]{1,10}$/.test(sTxt) ? (parseInt(sTxt, 10) >>> 0) : U.hashStr(String(o.seed))));
    const rich = (+o.rich > 0) ? +o.rich : 1;
    const ns = U.clamp((o.ns | 0) || 2, 2, MAX_START);
    /* the base the overrides sit on. It must be reproducible from these five
       numbers alone, which is why `ns` travels with the map: the generator
       clears a landing pad round every start it invents, so a base grown for
       four commanders is DIFFERENT GROUND from one grown for two. */
    const base = GameMap.build(th, seed, rich, { size: size, starts: ns });
    const N = size * size;
    return {
      name: String(o.name || base.name).slice(0, 40),
      th, seed, rich, size, ns,
      W: size, H: size, base,
      terrain: Uint8Array.from(base.terrain),
      elev: Uint8Array.from(base.elev),
      ore: Float32Array.from(base.ore),
      /* which tiles the player has had a hand in. A mask, not a diff against
         the base, so painting a tile back to the colour it already was is
         still recorded and the round trip through a blob is exact. */
      dirtyT: new Uint8Array(N), dirtyE: new Uint8Array(N), dirtyO: new Uint8Array(N),
      starts: base.starts.map(s => ({ x: s.x, y: s.y })),
      oil: base.oilNodes.map(n => ({ x: n.x, y: n.y })),
      civ: (base.civSites || []).map(c => ({ x: c.x, y: c.y })),
      undo: [], _stroke: null,
    };
  }

  /* ---------------- strokes and undo ----------------
     One drag is one undo step, and a step remembers only the tiles it touched
     and only their FORMER values. Snapshotting the whole grid instead would be
     415 kB a stroke on a 288 map; this is a few hundred bytes. */
  function begin(doc) { doc._stroke = { cells: new Map(), st: null, oil: null, civ: null }; }
  function touch(doc, i) {
    const s = doc._stroke;
    if (!s || s.cells.has(i)) return;
    s.cells.set(i, { t: doc.terrain[i], e: doc.elev[i], o: doc.ore[i],
                     mt: doc.dirtyT[i], me: doc.dirtyE[i], mo: doc.dirtyO[i] });
  }
  function commit(doc) {
    const s = doc._stroke;
    doc._stroke = null;
    if (!s || (!s.cells.size && !s.st && !s.oil && !s.civ)) return;
    doc.undo.push(s);
    while (doc.undo.length > MAXUNDO) doc.undo.shift();
  }
  function undo(doc) {
    if (!doc) return false;
    const s = doc.undo.pop();
    if (!s) return false;
    s.cells.forEach(function (v, i) {
      doc.terrain[i] = v.t; doc.elev[i] = v.e; doc.ore[i] = v.o;
      doc.dirtyT[i] = v.mt; doc.dirtyE[i] = v.me; doc.dirtyO[i] = v.mo;
    });
    if (s.st) doc.starts = s.st;
    if (s.oil) doc.oil = s.oil;
    if (s.civ) doc.civ = s.civ;
    return true;
  }

  function passAt(doc, x, y) {
    if (x < 0 || y < 0 || x >= doc.W || y >= doc.H) return false;
    const t = CFG.TERRAIN[doc.terrain[y * doc.W + x]];
    return !!(t && t.pass);
  }

  /* is every tile of a w*h block ground a base or a building could stand on? */
  function padOk(doc, tx, ty, w, h) {
    for (let y = ty; y < ty + h; y++) for (let x = tx; x < tx + w; x++) {
      if (x < 1 || y < 1 || x >= doc.W - 1 || y >= doc.H - 1) return false;
      const t = doc.terrain[y * doc.W + x];
      if (!CFG.TERRAIN[t] || !CFG.TERRAIN[t].pass || t === T.TREE) return false;
    }
    return true;
  }

  /* ---- a marker is checked when it is placed, and for as long as it stands ----
     padOk above runs at the moment a marker goes down. The ground can be taken
     out from under it afterwards, and until this existed that was accepted in
     silence: paint a lake over a deployment site, press USE THIS MAP, and
     Game.init dealt a construction yard into the sea on ground no unit could
     reach or leave. So the document is swept again before it is armed.

     WHAT IS *NOT* A FAULT, and this is the whole difficulty. The generator's
     own maps would fail any tidy rule: measured over every theatre at three
     sizes, 9 of 216 generated deployment sites have water inside the
     construction yard's 3x3 footprint, one theatre's authored deployment
     (Kuwait's second) stands on water outright, and 42 of 284 oil nodes have a
     wet corner - map.js clears a pad round each but deliberately leaves the
     water alone, "to keep the coastline honest". Refusing those would be the
     editor calling the shipped game broken.
     So a fault is what the PLAYER made: a marker standing on impassable
     ground that the player's own brush put there. An untouched map cannot
     have one, whatever the survey left behind - and a lake painted over a
     site is one immediately. The single exception is a yard with nowhere at
     all to stand: no generated site has fewer than one passable tile in its
     3x3, so all nine being solid is nobody's map but the player's. */
  function faults(doc) {
    const f = { start: [], oil: [], n: 0 };
    if (!doc) return f;
    const painted = (x, y) => {
      const i = y * doc.W + x;
      return i >= 0 && i < doc.dirtyT.length && !!doc.dirtyT[i];
    };
    doc.starts.forEach(function (s, i) {
      let room = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++)
        if (passAt(doc, s.x + dx, s.y + dy)) room++;
      if ((!passAt(doc, s.x, s.y) && painted(s.x, s.y)) || room === 0) f.start.push(i);
    });
    doc.oil.forEach(function (n, i) {
      if (!passAt(doc, n.x, n.y) && painted(n.x, n.y)) f.oil.push(i);
    });
    f.n = f.start.length + f.oil.length;
    return f;
  }
  function faultLine(f) {
    if (!f || !f.n) return "";
    if (f.start.length)
      return "Deployment site " + (f.start[0] + 1) + " is under ground you painted — " +
             "a construction yard cannot stand there.";
    return "Oil survey node " + (f.oil[0] + 1) + " is under ground you painted — " +
           "a derrick cannot stand there.";
  }

  function brush(doc, tx, ty, tl, r) {
    r = U.clamp(r | 0, 0, 12);
    let n = 0, drowned = false;
    for (let y = ty - r; y <= ty + r; y++) for (let x = tx - r; x <= tx + r; x++) {
      if (x < 0 || y < 0 || x >= doc.W || y >= doc.H) continue;
      if (U.dist(x, y, tx, ty) > r + 0.25) continue;         // a round brush
      const i = y * doc.W + x;
      if (tl.kind === "terrain") {
        touch(doc, i);
        doc.terrain[i] = tl.v; doc.dirtyT[i] = 1;
        /* Water is low ground, exactly as a river carved by the generator is.
           Every consequence is written out as its own override rather than
           re-derived when the map is loaded, so the file says everything it
           means and map.js never has to guess. */
        if (tl.v === T.WATER) { doc.elev[i] = 0; doc.dirtyE[i] = 1; }
        /* ...and the seam goes with it. Water, rock and built-up ground are
           the three the generator refuses to lay ore on, and the rule has to
           hold in BOTH directions: the ore index a hauler searches is built
           from the ore field alone and never asks what is on top of it, so a
           seam sealed under painted rock is a trip to nowhere. */
        if (tl.v === T.WATER || tl.v === T.ROCK || tl.v === T.URBAN) {
          doc.ore[i] = 0; doc.dirtyO[i] = 1;
        }
        if (!CFG.TERRAIN[tl.v].pass) drowned = true;
      } else if (tl.kind === "ore") {
        /* the generator refuses to lay ore on water, rock or a city block, and
           so does the brush - a seam no hauler can reach is not a seam */
        const t = doc.terrain[i];
        if (t === T.WATER || t === T.ROCK || t === T.URBAN) continue;
        touch(doc, i);
        doc.ore[i] = tl.v; doc.dirtyO[i] = 1;
      } else if (tl.kind === "elev") {
        if (doc.terrain[i] === T.WATER) continue;
        touch(doc, i);
        doc.elev[i] = U.clamp(doc.elev[i] + tl.v, 0, 3); doc.dirtyE[i] = 1;
      }
      n++;
    }
    /* A FLOODED TOWN LOSES ITS HOUSES. Civilian blocks are the numerous marker
       - a city can carry forty of them - and painting a lake over one is a
       thing a player does on purpose. Making them go with the ground is what
       anybody would expect; leaving forty buildings standing in the sea, or
       refusing the whole map at DEPLOY until each is removed by hand, is not.
       They travel in the stroke, so one undo brings the town back.
       The deployment sites and the oil nodes are NOT treated this way: there
       are a handful of them, each one placed deliberately, and quietly moving
       or deleting one is exactly the silence this is meant to end. They turn
       red instead, and the map will not arm - see faults(). */
    if (drowned && doc.civ.length) {
      const keep = doc.civ.filter(c => passAt(doc, c.x, c.y));
      if (keep.length !== doc.civ.length) {
        if (doc._stroke && !doc._stroke.civ) doc._stroke.civ = doc.civ.slice();
        doc.civ = keep;
      }
    }
    return { ok: n > 0, why: n ? "" : "nothing there to paint" };
  }

  function nearIn(list, tx, ty, d) {
    for (let i = 0; i < list.length; i++)
      if (Math.abs(list[i].x - tx) <= d && Math.abs(list[i].y - ty) <= d) return i;
    return -1;
  }

  function marker(doc, tx, ty, tl) {
    if (tx < 3 || ty < 3 || tx >= doc.W - 4 || ty >= doc.H - 4)
      return { ok: false, why: "too close to the edge of the theatre" };
    if (tl.v === "erase") {
      const order = [["civ", doc.civ], ["oil", doc.oil], ["st", doc.starts]];
      for (const [key, list] of order) {
        const j = nearIn(list, tx, ty, 2);
        if (j < 0) continue;
        if (key === "st" && doc.starts.length <= 2)
          return { ok: false, why: "a map has to keep two deployment sites" };
        doc._stroke[key] = list.slice();
        list.splice(j, 1);
        return { ok: true, why: "" };
      }
      return { ok: false, why: "nothing to remove there" };
    }
    if (tl.v === "start") {
      /* Game.init drops the construction yard at (x-1, y-1) and the opening
         squads three tiles either side, so a site needs a real clearing round
         it - the same 5x5 of passable ground the generator guarantees. */
      if (!padOk(doc, tx - 2, ty - 2, 5, 5))
        return { ok: false, why: "a deployment site needs clear, passable ground round it" };
      const j = nearIn(doc.starts, tx, ty, 3);
      if (j < 0 && doc.starts.length >= MAX_START)
        return { ok: false, why: MAX_START + " deployment sites is the limit" };
      doc._stroke.st = doc.starts.slice();
      if (j >= 0) doc.starts[j] = { x: tx, y: ty };      // move the one already there
      else doc.starts.push({ x: tx, y: ty });
      return { ok: true, why: "" };
    }
    if (tl.v === "oil") {
      /* map.js clears a 3x3 pad round every node it surveys, because a derrick
         is 2x2 and has to fit; ask the same of a hand-placed one. */
      if (!padOk(doc, tx - 1, ty - 1, 3, 3))
        return { ok: false, why: "a derrick needs a clear pad - this ground will not take one" };
      if (nearIn(doc.oil, tx, ty, 2) >= 0) return { ok: false, why: "there is a node here already" };
      if (doc.oil.length >= MAX_OIL) return { ok: false, why: MAX_OIL + " survey nodes is the limit" };
      doc._stroke.oil = doc.oil.slice();
      doc.oil.push({ x: tx, y: ty });
      return { ok: true, why: "" };
    }
    if (tl.v === "civ") {
      if (!padOk(doc, tx, ty, 2, 2))
        return { ok: false, why: "a civilian block is 2x2 and needs passable ground" };
      if (nearIn(doc.civ, tx, ty, 2) >= 0) return { ok: false, why: "there is a block here already" };
      if (doc.civ.length >= MAX_CIV) return { ok: false, why: MAX_CIV + " civilian blocks is the limit" };
      doc._stroke.civ = doc.civ.slice();
      doc.civ.push({ x: tx, y: ty });
      return { ok: true, why: "" };
    }
    return { ok: false, why: "no such marker" };
  }

  /* down/drag/up so that one drag of the mouse is one undo step; stroke() is
     the same thing for a single click, and what a test drives */
  function down(doc, tx, ty, key, r) {
    const tl = TOOLS[key];
    if (!doc || !tl) return { ok: false, why: "no such brush" };
    begin(doc);
    return tl.kind === "marker" ? marker(doc, tx, ty, tl) : brush(doc, tx, ty, tl, r);
  }
  function drag(doc, tx, ty, key, r) {
    const tl = TOOLS[key];
    if (!doc || !tl || !doc._stroke || tl.kind === "marker") return { ok: false, why: "" };
    return brush(doc, tx, ty, tl, r);
  }
  function up(doc) { if (doc) commit(doc); }
  function stroke(doc, tx, ty, key, r) {
    const res = down(doc, tx, ty, key, r);
    up(doc);
    return res;
  }

  /* ---------------- the file format ----------------
     Run-length encoded overrides: [firstTile, length, value] triples. A brush
     stroke IS a run of tiles, so runs are what a painted map actually looks
     like - a 9x9 brush dragged across a 144 map costs a few dozen numbers
     rather than a few thousand. */
  function runsOf(dirty, cur, bas, N) {
    const out = [];
    for (let i = 0; i < N; i++) {
      if (!dirty[i] || cur[i] === bas[i]) continue;
      const v = Math.round(cur[i]);
      let j = i + 1;
      while (j < N && dirty[j] && cur[j] !== bas[j] && Math.round(cur[j]) === v) j++;
      out.push(i, j - i, v);
      i = j - 1;
    }
    return out;
  }
  function eachRun(runs, N, fn) {
    if (!Array.isArray(runs)) return;
    for (let k = 0; k + 2 < runs.length; k += 3) {
      const at = runs[k] | 0, len = runs[k + 1] | 0, v = runs[k + 2];
      if (!(len > 0)) continue;
      for (let i = Math.max(0, at), e = Math.min(N, at + len); i < e; i++) fn(i, v);
    }
  }
  function flat(list) { const o = []; for (const p of list) o.push(p.x | 0, p.y | 0); return o; }
  function unflat(a) {
    const o = [];
    for (let i = 0; i + 1 < a.length; i += 2) o.push({ x: a[i] | 0, y: a[i + 1] | 0 });
    return o;
  }

  /* the object that rides in Game.opts. Plain JSON on purpose: save.js stores
     G.opts wholesale, so an edited map survives a save and a reload for free */
  function toEdit(doc) {
    const N = doc.W * doc.H, b = doc.base;
    return {
      v: VERSION, th: doc.th, seed: doc.seed >>> 0, rich: doc.rich,
      size: doc.size, ns: doc.ns, name: doc.name,
      t: runsOf(doc.dirtyT, doc.terrain, b.terrain, N),
      e: runsOf(doc.dirtyE, doc.elev, b.elev, N),
      o: runsOf(doc.dirtyO, doc.ore, b.ore, N),
      st: flat(doc.starts), oil: flat(doc.oil), civ: flat(doc.civ),
    };
  }
  function fromEdit(ed) {
    const doc = create({ th: ed.th, seed: ed.seed, rich: ed.rich,
                         size: ed.size, ns: ed.ns, name: ed.name });
    const N = doc.W * doc.H;
    eachRun(ed.t, N, function (i, v) {
      if (!CFG.TERRAIN[v | 0]) return;
      doc.terrain[i] = v | 0; doc.dirtyT[i] = 1;
    });
    eachRun(ed.e, N, function (i, v) { doc.elev[i] = U.clamp(v | 0, 0, 3); doc.dirtyE[i] = 1; });
    eachRun(ed.o, N, function (i, v) { doc.ore[i] = Math.max(0, +v || 0); doc.dirtyO[i] = 1; });
    doc.starts = unflat(ed.st || []);
    doc.oil = unflat(ed.oil || []);
    doc.civ = unflat(ed.civ || []);
    return doc;
  }

  /* A checksum over the payload in a FIXED order, so it does not depend on how
     any JSON implementation happens to order keys. It is not security - it is
     the difference between "this paste lost its last line" reported as a
     message and reported as a battle fought on the wrong ground. */
  function sumOf(o) {
    return U.hashStr(JSON.stringify([o.v, o.th, o.seed, o.rich, o.size, o.ns,
                                     o.name, o.t, o.e, o.o, o.st, o.oil, o.civ]));
  }
  function toBlob(doc) {
    const e = toEdit(doc);
    return JSON.stringify({
      if: MAGIC, v: e.v, th: e.th, seed: e.seed, rich: e.rich, size: e.size,
      ns: e.ns, name: e.name, t: e.t, e: e.e, o: e.o,
      st: e.st, oil: e.oil, civ: e.civ, sum: sumOf(e),
    });
  }
  function bad(msg) { return { ok: false, error: msg }; }
  /* NEVER THROWS. A blob is text from outside the game - a truncated paste, a
     file from a newer build, somebody's shopping list - and every one of those
     has to come back as a sentence the player can read. */
  function fromBlob(text) {
    try {
      let o = null;
      try { o = JSON.parse(String(text == null ? "" : text).trim()); }
      catch (e) { return bad("That is not a map — the text is not even valid data."); }
      if (!o || typeof o !== "object" || Array.isArray(o) || o.if !== MAGIC)
        return bad("That text is not an IRONFRONT map.");
      const v = o.v | 0;
      if (v < 1) return bad("That map does not say which format it is in.");
      if (v > VERSION)
        return bad("That map was made by a newer build (format " + v +
                   "; this one reads " + VERSION + ").");
      if (sumOf(o) !== (o.sum >>> 0))
        return bad("That map is corrupt — its checksum does not match its contents.");
      if (!THEATRES[o.th]) return bad("Unknown theatre “" + String(o.th).slice(0, 24) + "”.");
      const size = o.size | 0;
      if (SIZES.indexOf(size) < 0) return bad("Map size " + o.size + " is not one this build generates.");
      for (const k of ["t", "e", "o"])
        if (o[k] != null && (!Array.isArray(o[k]) || o[k].length % 3))
          return bad("That map's “" + k + "” overrides are malformed.");
      for (const k of ["st", "oil", "civ"])
        if (o[k] != null && (!Array.isArray(o[k]) || o[k].length % 2))
          return bad("That map's “" + k + "” list is malformed.");
      if (!Array.isArray(o.st) || o.st.length < 4)
        return bad("That map has fewer than two deployment sites.");
      /* Every coordinate is checked against the grid the map SAYS it is, so a
         blob that has been fiddled with is named as bad here rather than
         quietly moved somewhere legal by map.js - which would otherwise clamp
         a site at 0,0 and put the construction yard's corner at -1,-1. The
         editor's own rules are tighter (it keeps three tiles clear of every
         edge), so nothing it writes can fail this. */
      const inGrid = function (a, lo, hi) {
        for (let i = 0; i < a.length; i++) if (!(a[i] >= lo && a[i] <= hi)) return false;
        return true;
      };
      if (!inGrid(o.st, 2, size - 3) ||
          !inGrid(o.oil || [], 1, size - 3) || !inGrid(o.civ || [], 1, size - 3))
        return bad("That map puts a marker outside the ground it is drawn on.");
      return { ok: true, edit: {
        v: VERSION, th: o.th, seed: o.seed >>> 0,
        rich: (+o.rich > 0) ? +o.rich : 1, size: size,
        ns: U.clamp((o.ns | 0) || 2, 2, MAX_START),
        name: String(o.name || THEATRES[o.th].name).slice(0, 40),
        t: o.t || [], e: o.e || [], o: o.o || [],
        st: o.st, oil: o.oil || [], civ: o.civ || [],
      } };
    } catch (e) {
      /* the belt under the braces: whatever went wrong, it is a bad map */
      return bad("That map could not be read: " + (e && e.message ? e.message : String(e)));
    }
  }

  /* ---------------- named slots in the browser ---------------- */
  function slotStore() {
    try {
      const raw = localStorage.getItem(SLOTS);
      const o = raw ? JSON.parse(raw) : null;
      return (o && typeof o === "object" && !Array.isArray(o)) ? o : {};
    } catch (e) { return {}; }
  }
  function slots() { return Object.keys(slotStore()).sort(); }
  function saveSlot(doc, name) {
    name = String(name == null ? "" : name).trim().slice(0, 40);
    if (!name) return bad("Give the map a name before saving it.");
    try {
      const st = slotStore();
      st[name] = toBlob(doc);
      localStorage.setItem(SLOTS, JSON.stringify(st));
      return { ok: true, name: name };
    } catch (e) {
      return bad("The browser would not store it: " + (e && e.message ? e.message : String(e)));
    }
  }
  function loadSlot(name) {
    const st = slotStore();
    if (!Object.prototype.hasOwnProperty.call(st, String(name)))
      return bad("No map is saved under that name.");
    return fromBlob(st[String(name)]);
  }
  function deleteSlot(name) {
    try {
      const st = slotStore();
      delete st[String(name)];
      localStorage.setItem(SLOTS, JSON.stringify(st));
      return true;
    } catch (e) { return false; }
  }

  /* ---------------- what the battle is fought on ---------------- */
  let armedEdit = null;
  function armed() { return armedEdit; }
  function arm(edit) { armedEdit = edit || null; syncArm(); return armedEdit; }
  function disarm() { armedEdit = null; syncArm(); }
  /* arm(edit) is the plain setter the deployment screen reads through; this is
     the GATE, and it is the last thing between a drawn map and Game.init. It
     is a function rather than a line inside the button handler so that a test
     can walk through it on a page that carries no editor markup at all. */
  function armDoc(d) {
    if (!d) return bad("There is no map to use.");
    if (d.starts.length < 2) return bad("A map needs two deployment sites.");
    const f = faults(d);
    if (f.n) return bad(faultLine(f) + " Repair the ground, or move the marker.");
    arm(toEdit(d));
    return { ok: true, edit: armedEdit };
  }

  /* ================= the screen =================
     Everything below this line needs the markup in index.html. Without it
     available() is false and not one line of it runs. */
  function el(id) { return document.getElementById(id); }
  function available() { return !!el("mapedit"); }

  let doc = null, tool = "t2", radius = 2, painting = false, hover = null;
  /* what adoptDoc last wrote into the seed box. The box always shows the seed
     the ground on screen grew from, because that is the number a player has to
     be able to copy, keep or send on - which also means it is never empty, and
     REGENERATE would redraw the same map for ever. So an untouched box means
     "roll another" and a box the player has typed into means "grow this one". */
  let seedShown = "";

  /* ---- REGENERATE, LOAD and IMPORT throw the work away ----
     Undo stack and all, and REGENERATE sits directly under the palette where
     it is easy to hit on the way to a brush. So the first press asks and the
     second one does it; any other action in the panel answers "no". A
     confirm() would do the same job, but it stops the whole page dead and this
     game does not use one anywhere. */
  let pending = "";
  function guard(name) {
    const n = editedCount(doc);
    if (!doc || (!n && !doc.undo.length)) { pending = ""; return true; }
    if (pending === name) { pending = ""; return true; }
    pending = name;
    status(name + " again to discard " + n + " painted tile" + (n === 1 ? "" : "s") + ".");
    return false;
  }

  /* ---- the live view ----
     The minimap's own trick, for the same reason it uses it: one pixel per
     tile into an ImageData, then a single scaled drawImage of that. Rescaling
     the battle's 3,072px ground texture instead cost render.js 190 ms a frame
     before it cached a thumbnail, and this runs inside a mouse-move. The
     colours are CFG.TERRAIN[].color - the table the ground itself is painted
     from - so what is drawn here cannot drift from what the battle looks
     like. */
  let thumb = null, thumbCtx = null;
  function hex(c) {
    const n = parseInt(String(c).slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const TCOL = {};
  for (const k of Object.keys(CFG.TERRAIN)) TCOL[k | 0] = hex(CFG.TERRAIN[k | 0].color);

  function paintThumb() {
    const W = doc.W, H = doc.H;
    if (!thumb || thumb.width !== W) {
      thumb = document.createElement("canvas");
      thumb.width = W; thumb.height = H;
      thumbCtx = thumb.getContext("2d");
    }
    const img = thumbCtx.createImageData(W, H), d = img.data;
    for (let i = 0, n = W * H; i < n; i++) {
      const c = TCOL[doc.terrain[i]] || TCOL[2];
      /* relief, the cheap way the minimap reads it: higher ground is lighter */
      const lit = 0.82 + doc.elev[i] * 0.09;
      let r = c[0] * lit, g = c[1] * lit, b = c[2] * lit;
      const q = doc.ore[i];
      if (q > 15) {                                  // an exposed mineral seam
        const f = Math.min(1, q / 900) * 0.65;
        r += (196 - r) * f; g += (158 - g) * f; b += (84 - b) * f;
      }
      const o = i * 4;
      d[o] = r; d[o + 1] = g; d[o + 2] = b; d[o + 3] = 255;
    }
    thumbCtx.putImageData(img, 0, 0);
  }

  function draw() {
    if (!doc) return;
    const cv = el("me-view");
    if (!cv || !cv.getContext) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    paintThumb();
    const S = cv.width / doc.W;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#050705";
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.drawImage(thumb, 0, 0, cv.width, cv.height);

    /* markers, drawn as line work so they stay readable at any zoom. One that
       has lost the ground under it is drawn in warning red, so the damage a
       brush stroke did is visible while the player works rather than met as a
       refusal at USE THIS MAP. */
    const f = faults(doc);
    ctx.lineWidth = Math.max(1, S * 0.35);
    doc.oil.forEach(function (n, i) {
      ctx.strokeStyle = f.oil.indexOf(i) >= 0 ? "#d8552f" : "#e8b93c";
      ctx.beginPath(); ctx.arc((n.x + 1) * S, (n.y + 1) * S, S * 2.1, 0, 6.2832); ctx.stroke();
    });
    ctx.fillStyle = "#8b8f92";
    for (const c of doc.civ) ctx.fillRect(c.x * S, c.y * S, S * 2, S * 2);
    doc.starts.forEach(function (s, i) {
      const hurt = f.start.indexOf(i) >= 0;
      ctx.strokeStyle = hurt ? "#d8552f" : "#b6d34a";
      ctx.lineWidth = Math.max(1.2, S * 0.4);
      ctx.beginPath(); ctx.arc((s.x + 0.5) * S, (s.y + 0.5) * S, S * 3.2, 0, 6.2832); ctx.stroke();
      ctx.fillStyle = hurt ? "#d8552f" : "#b6d34a";
      ctx.font = "bold " + Math.max(9, Math.round(S * 4)) + "px sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(String(i + 1), (s.x + 0.5) * S, (s.y + 0.5) * S);
    });
    /* the brush, so the player can see how much ground a stroke will take */
    if (hover) {
      const tl = TOOLS[tool];
      ctx.strokeStyle = "rgba(230,245,220,0.85)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (tl && tl.kind === "marker")
        ctx.rect((hover.x - 1) * S, (hover.y - 1) * S, S * 3, S * 3);
      else
        ctx.arc((hover.x + 0.5) * S, (hover.y + 0.5) * S, (radius + 0.5) * S, 0, 6.2832);
      ctx.stroke();
    }
  }

  function editedCount(d) {
    let n = 0;
    if (!d) return 0;
    for (let i = 0; i < d.dirtyT.length; i++) if (d.dirtyT[i] || d.dirtyE[i] || d.dirtyO[i]) n++;
    return n;
  }

  function status(msg) {
    const st = el("me-status");
    if (st && doc) {
      /* `hover` belongs to whatever document was on screen when the pointer
         last moved, and REGENERATE can swap a 288 map for a 96 one under a
         pointer that never left the view (a button reached by keyboard fires
         no pointerleave). So the index is checked rather than assumed. */
      const hi = hover ? hover.y * doc.W + hover.x : -1;
      const ht = (hi >= 0 && hi < doc.terrain.length) ? CFG.TERRAIN[doc.terrain[hi]] : null;
      const f = faults(doc);
      st.textContent = doc.size + "×" + doc.size + " · " + THEATRES[doc.th].name +
        " · seed " + doc.seed + " · " + doc.starts.length + " sites · " +
        doc.oil.length + " oil · " + doc.civ.length + " blocks · " +
        editedCount(doc) + " tiles edited · " + doc.undo.length + " strokes to undo" +
        (f.n ? " · " + f.n + " marker" + (f.n === 1 ? "" : "s") + " on ground you painted over" : "") +
        (ht ? " · (" + hover.x + "," + hover.y + ") " + ht.name : "");
    }
    if (msg !== undefined) {
      const m = el("me-msg");
      if (m) m.textContent = msg;
    }
  }

  function syncArm() {
    const lab = el("me-armed");
    if (lab) {
      lab.textContent = armedEdit
        ? armedEdit.name + " — " + THEATRES[armedEdit.th].name + ", " +
          armedEdit.size + "×" + armedEdit.size
        : "none — the generator draws the ground";
      lab.className = armedEdit ? "me-on" : "me-none";
    }
    const off = el("btn-unarm");
    if (off) off.classList.toggle("hidden", !armedEdit);
  }

  function syncSlots() {
    const sel = el("me-slot");
    if (!sel) return;
    const keep = sel.value;
    sel.innerHTML = "";
    const names = slots();
    if (!names.length) {
      const o = document.createElement("option");
      o.value = ""; o.textContent = "(no maps saved yet)";
      sel.appendChild(o);
      return;
    }
    for (const n of names) {
      const o = document.createElement("option");
      o.value = n; o.textContent = n;
      sel.appendChild(o);
    }
    if (names.indexOf(keep) >= 0) sel.value = keep;
  }

  function setTool(key) {
    if (!TOOLS[key]) return;
    tool = key;
    const pal = el("me-palette");
    if (pal) for (const b of pal.children) b.classList.toggle("on", b.dataset.tool === key);
    draw();
  }

  function buildPalette() {
    const pal = el("me-palette");
    if (!pal) return;
    pal.innerHTML = "";
    let group = "";
    for (const tl of TOOL_LIST) {
      if (tl.group !== group) {
        group = tl.group;
        const h = document.createElement("div");
        h.className = "me-grp"; h.textContent = group;
        pal.appendChild(h);
      }
      const b = document.createElement("button");
      b.type = "button";
      b.className = "me-tool" + (tl.key === tool ? " on" : "");
      b.dataset.tool = tl.key;
      b.title = tl.label;
      const sw = document.createElement("i");
      sw.style.background = tl.color;
      b.appendChild(sw);
      const t = document.createElement("span");
      t.textContent = tl.label;
      b.appendChild(t);
      b.addEventListener("click", function () { setTool(tl.key); });
      pal.appendChild(b);
    }
  }

  function tileFrom(ev) {
    const cv = el("me-view");
    if (!cv || !doc) return null;
    const r = cv.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    const x = Math.floor((ev.clientX - r.left) / r.width * doc.W);
    const y = Math.floor((ev.clientY - r.top) / r.height * doc.H);
    if (x < 0 || y < 0 || x >= doc.W || y >= doc.H) return null;
    return { x, y };
  }

  function regen(o) {
    o = o || {};
    doc = create({
      th: (el("me-th") || {}).value || doc && doc.th,
      size: parseInt((el("me-size") || { value: "144" }).value, 10),
      rich: parseFloat((el("me-rich") || { value: "1" }).value),
      ns: parseInt((el("me-ns") || { value: "2" }).value, 10),
      /* "" means roll one - create() reads an empty seed as "surprise me" */
      seed: (o.seed !== undefined ? o.seed : (el("me-seed") || { value: "" }).value),
      name: o.name,
    });
    adoptDoc(doc);
    status("A fresh theatre. Paint it.");
  }

  /* put a document on screen and make every control agree with it */
  function adoptDoc(d) {
    doc = d;
    /* the pointer is over the OLD map's tile until it moves again, and the new
       grid may be smaller than that tile's index */
    hover = null;
    const put = function (id, v) { const e2 = el(id); if (e2) e2.value = v; };
    put("me-th", doc.th); put("me-size", String(doc.size));
    put("me-rich", String(doc.rich)); put("me-ns", String(doc.ns));
    put("me-seed", String(doc.seed)); put("me-name", doc.name);
    seedShown = String(doc.seed);
    draw(); status();
  }

  function open() {
    const box = el("mapedit");
    if (!box) return;
    if (!doc) {
      /* re-open on whatever is armed; otherwise take the theatre, size, ore
         density and seed the deployment screen is already set to */
      if (armedEdit) adoptDoc(fromEdit(armedEdit));
      else {
        const menuSeed = (el("opt-seed") || { value: "" }).value;
        doc = create({
          th: (el("opt-map") || { value: "" }).value,
          size: parseInt((el("opt-mapsize") || { value: "144" }).value, 10),
          rich: parseFloat((el("opt-res") || { value: "1" }).value),
          seed: menuSeed || undefined, ns: 2,
        });
        adoptDoc(doc);
      }
    }
    box.classList.remove("hidden");
    syncSlots(); draw(); status("");
  }
  function close() { const box = el("mapedit"); if (box) box.classList.add("hidden"); }

  function boot() {
    if (!available()) return;

    /* the theatre list, from the same table the deployment screen uses */
    const ths = el("me-th");
    if (ths) {
      ths.innerHTML = "";
      for (const id of THEATRE_LIST) {
        const o = document.createElement("option");
        o.value = id; o.textContent = THEATRES[id].name;
        ths.appendChild(o);
      }
    }
    const szs = el("me-size");
    if (szs) {
      szs.innerHTML = "";
      for (const s of SIZES) {
        const o = document.createElement("option");
        o.value = String(s); o.textContent = s + "×" + s;
        if (s === 144) o.selected = true;
        szs.appendChild(o);
      }
    }
    buildPalette();
    syncSlots(); syncArm();

    /* `asks` marks the three handlers that put the "press again" question up;
       every other control clears it, so an answer can never land on the wrong
       question. */
    const on = function (id, type, fn, asks) {
      const e2 = el(id);
      if (e2) e2.addEventListener(type, function (ev) { if (!asks) pending = ""; return fn(ev); });
    };
    on("btn-editor", "click", open);
    on("btn-unarm", "click", function () { disarm(); });
    on("me-close", "click", close);
    on("me-regen", "click", function () {
      if (!guard("REGENERATE")) return;
      /* A map the player named keeps its name; one still called after its own
         theatre takes the new theatre's name. regen() has always accepted a
         name - nothing ever passed one, so "MY BATTLEFIELD" came back as
         "TAIWAN STRAIT". */
      const nm = (el("me-name") || { value: "" }).value;
      const sd = ((el("me-seed") || { value: "" }).value || "").trim();
      regen({ name: (doc && nm && nm !== THEATRES[doc.th].name) ? nm : "",
              seed: (sd && sd !== seedShown) ? sd : "" });
    }, true);
    on("me-undo", "click", function () {
      status(undo(doc) ? "Undone." : "Nothing left to undo.");
      draw();
    });
    on("me-brush", "change", function (e2) { radius = parseInt(e2.target.value, 10) || 0; draw(); });
    on("me-name", "change", function (e2) { if (doc) doc.name = String(e2.target.value).slice(0, 40); status(); });

    const view = el("me-view");
    if (view) {
      const paint = function (ev, first) {
        const t = tileFrom(ev);
        if (!t) return;
        pending = "";                      // painting answers "no" to any question
        hover = t;
        const r = first ? down(doc, t.x, t.y, tool, radius) : drag(doc, t.x, t.y, tool, radius);
        if (r && !r.ok && r.why) status(r.why); else status();
        draw();
      };
      view.addEventListener("pointerdown", function (ev) {
        if (!doc) return;
        painting = true;
        if (view.setPointerCapture && ev.pointerId !== undefined) {
          try { view.setPointerCapture(ev.pointerId); } catch (e) {}
        }
        ev.preventDefault();
        paint(ev, true);
      });
      view.addEventListener("pointermove", function (ev) {
        if (!doc) return;
        if (painting) paint(ev, false);
        else { hover = tileFrom(ev); status(); draw(); }
      });
      const stop = function () { if (painting) { painting = false; up(doc); status(); } };
      view.addEventListener("pointerup", stop);
      view.addEventListener("pointercancel", stop);
      view.addEventListener("pointerleave", function () { stop(); hover = null; draw(); });
      view.addEventListener("contextmenu", function (ev) { ev.preventDefault(); });
    }

    on("me-save", "click", function () {
      if (!doc) return;
      const nm = (el("me-name") || { value: "" }).value || doc.name;
      const r = saveSlot(doc, nm);
      if (r.ok) { doc.name = r.name; syncSlots(); const s = el("me-slot"); if (s) s.value = r.name; }
      status(r.ok ? "Saved as “" + r.name + "”." : r.error);
    });
    on("me-load", "click", function () {
      const nm = (el("me-slot") || { value: "" }).value;
      if (!nm) { status("There is nothing saved to load."); return; }
      if (!guard("LOAD")) return;
      const r = loadSlot(nm);
      if (!r.ok) { status(r.error); return; }
      adoptDoc(fromEdit(r.edit));
      const f = faults(doc);
      status("Loaded “" + doc.name + "”." + (f.n ? " " + faultLine(f) : ""));
    }, true);
    on("me-del", "click", function () {
      const nm = (el("me-slot") || { value: "" }).value;
      if (!nm) return;
      deleteSlot(nm); syncSlots();
      status("Deleted “" + nm + "”.");
    });
    on("me-export", "click", function () {
      if (!doc) return;
      const box = el("me-blob");
      if (box) { box.value = toBlob(doc); if (box.select) box.select(); }
      status("The map is in the box — copy it and send it on.");
    });
    on("me-import", "click", function () {
      const box = el("me-blob");
      /* the paste is read BEFORE the question is asked: a blob that is not a
         map should say so rather than threaten the player's work first */
      const r = fromBlob(box ? box.value : "");
      if (!r.ok) { status(r.error); return; }
      if (!guard("IMPORT")) return;
      adoptDoc(fromEdit(r.edit));
      const f = faults(doc);
      status("Imported “" + doc.name + "”." + (f.n ? " " + faultLine(f) : ""));
    }, true);
    on("me-play", "click", function () {
      if (!doc) return;
      /* the whole map is swept here, not just the tile last clicked: a marker
         checked when it was placed can have had its ground painted away since */
      const r = armDoc(doc);
      if (!r.ok) { status(r.error); draw(); return; }
      /* the deployment screen decides the rest of the battle, exactly as it
         does for a generated theatre - this only chooses the ground */
      const mv = el("opt-map");
      if (mv) mv.value = doc.th;
      close();
      const btn = el("btn-start");
      if (btn && btn.scrollIntoView) btn.scrollIntoView();
    });
  }

  try { boot(); }
  catch (e) { if (typeof console !== "undefined") console.error("map editor did not start:", e); }

  return {
    VERSION, SIZES, TOOLS, TOOL_LIST,
    create, fromEdit, toEdit, toBlob, fromBlob,
    down, drag, up, stroke, undo, faults,
    slots, saveSlot, loadSlot, deleteSlot,
    armed, arm, armDoc, disarm, available, open, close,
  };
})();
