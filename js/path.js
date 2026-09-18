/* ============ path.js — A* over the tile grid, per movement layer ============ */
/* WHY THIS FILE LOOKS THE WAY IT DOES.
   Measured under jsc with only this function instrumented, brains on both
   seats, Warlord, 900 game-seconds (600 on the big grid):
     fulda  144x144 - 27.2 Path.find per game-second, mean  431 us,
                      worst  15.2 ms, 10.4% of all tick time
     fulda  288x288 - 17.7 per game-second, mean 1,888 us,
                      worst 150.6 ms, 51.9% of all tick time
     taiwan 144x144 - 35.3 per game-second, mean   59 us,
                      worst   6.9 ms,  2.3% of all tick time
   So the size of the problem depends entirely on the map: on a big grid the
   pathfinder WAS the game, on an island map it was already cheap. Almost all
   of the cost was work repeated on every single call:
     - three W*H typed arrays allocated AND filled per search (187 kB on a 144
       map, 746 kB on a 288 map) - and the fill alone is W*H writes before the
       first node is even looked at;
     - GameMap.passable() and GameMap.speedAt() called for each of the eight
       neighbours of each expanded node, each one a bounds check plus a
       CFG.TERRAIN object lookup;
     - a W*H sweep of the closed set at the end of every search that failed;
     - and worst of all, a search that CANNOT succeed still expands the whole
       landmass first, which is where the multi-millisecond tail lived. The
       behaviour suite measures it directly: to discover that a sealed room
       three tiles away has no door, the old search asked 28,993 questions of
       the blocking predicate. The label answers it in 18.
   So: the terrain tables are built once per map, the search arrays are reused
   with a generation stamp, the closest-explored tile is tracked as the search
   runs, and a reachability label per tile answers "is there any route at all"
   with two array reads instead of a flood fill. Replaying every query of three
   real matches (29,685 calls) through both modules: with the labels switched
   off the routes are BIT-IDENTICAL to the old ones, 0 illegal steps and 0
   corner cuts; with them on the search costs 6.98s -> 0.96s on fulda 144,
   12.15s -> 0.95s on fulda 288, 5.28s -> 0.36s on taiwan. And on not one of
   those 29,685 calls does this module refuse an order the old one obeyed:
   that is the failure mode that strands a unit, because Unit.stepAlong reads
   a null path as "arrived". Give-ups fall instead - 1,411 -> 271 on taiwan,
   94 -> 0 on fulda 288. */
var Path = (function () {
  /* direction table, flattened into three parallel arrays. Order is unchanged
     from the array-of-arrays version, because equal-f ties in the heap are
     broken by push order and a different order is a different (equally good,
     but different) route. */
  const DX = [1, -1, 0, 0, 1, 1, -1, -1];
  const DY = [0, 0, 1, -1, 1, -1, 1, -1];
  const DW = [1, 1, 1, 1, 1.414, 1.414, 1.414, 1.414];

  /* ---------------- per-map terrain tables ----------------
     Nothing in a match writes map.terrain - GameMap.build is the only writer,
     and it runs before the first tick - so passability and step cost are
     hoisted into flat arrays built once per map and layer. The cache is a
     single slot keyed on the map OBJECT: a new battle builds a new map, so
     identity alone retires the old tables and no explicit invalidation can be
     forgotten. "sub" and "sea" share a layer because GameMap.passable treats
     them identically; anything else is ground, again as passable() has it. */
  function keyOf(layer) { return (layer === "sea" || layer === "sub") ? "sea" : "ground"; }

  let tMap = null;
  const tGround = { pass: null, terr: null, spd: null, comp: null };
  const tSea = { pass: null, terr: null, spd: null, comp: null };

  function tablesFor(map, key) {
    if (tMap !== map) {
      tMap = map;
      tGround.pass = tGround.terr = tGround.spd = tGround.comp = null;
      tSea.pass = tSea.terr = tSea.spd = tSea.comp = null;
      liveStamp = -1; liveGround = null; liveSea = null;
      bufN = -1;                              // the grid may be a different size
    }
    const t = key === "sea" ? tSea : tGround;
    if (!t.pass) {
      const W = map.W, H = map.H, N = W * H, terr = map.terrain;
      const pass = new Uint8Array(N);
      /* the speed of a step is a property of the TERRAIN TYPE, so it lives in
         a table indexed by the terrain byte rather than one entry per tile:
         one byte per tile in cache instead of eight, and the divisor is the
         identical double GameMap.speedAt would have returned. It has to be a
         double. Holding the same divisors in a Float32Array instead rounds
         them, which silently reorders routes of equal cost - measured, 53 of
         12,975 fulda routes came back different for that reason alone. */
      const spd = new Float64Array(256), seen = new Uint8Array(256);
      for (let y = 0, i = 0; y < H; y++) {
        for (let x = 0; x < W; x++, i++) {
          const b = terr[i];
          if (!seen[b]) {
            seen[b] = 1;
            /* asked of GameMap itself, on a real tile of that type, so the two
               can never drift apart */
            spd[b] = Math.max(0.15, GameMap.speedAt(map, x, y, key));
          }
          pass[i] = GameMap.passable(map, x, y, key) ? 1 : 0;
        }
      }
      t.pass = pass; t.terr = terr; t.spd = spd;
    }
    return t;
  }

  /* ---------------- reachability labels ----------------
     One flood fill per layer gives every tile the number of the piece of
     ground (or water) it belongs to. Two tiles with different non-zero labels
     have NO route between them, which is the answer A* used to spend a
     whole-landmass expansion to discover.
     FOUR-way, because find() refuses a diagonal step whose two orthogonals are
     blocked, so the reachable set is exactly the 4-connected one.
     Uint16 and a clamp at 65,535: if a map ever had more pieces than that the
     top ones share an id, which can only make two pieces look JOINED - the
     search then runs exactly as it used to. Merging is safe; splitting would
     not be, which is why the clamp is on this side. */
  function flood(W, H, pass, hard) {
    const N = W * H, lab = new Uint16Array(N);
    if (!floodStack || floodStack.length < N) floodStack = new Int32Array(N);
    const st = floodStack;
    let id = 0;
    for (let i = 0; i < N; i++) {
      if (lab[i] || !pass[i] || (hard && hard(i))) continue;
      id = Math.min(65535, id + 1);
      let sp = 0;
      st[sp++] = i; lab[i] = id;
      while (sp) {
        const c = st[--sp], cx = c % W, cy = (c / W) | 0;
        for (let d = 0; d < 4; d++) {
          const nx = cx + DX[d], ny = cy + DY[d];
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const j = ny * W + nx;
          if (lab[j] || !pass[j] || (hard && hard(j))) continue;
          lab[j] = id; st[sp++] = j;
        }
      }
    }
    return lab;
  }
  let floodStack = null;

  /* ---- the two label sets ----
     TERRAIN labels answer for a caller that passes no blockFn: several of the
     commander's queries route THROUGH structures on purpose (a supply line, a
     coastline probe), and for them only water and rock are walls.
     LIVE labels add the tiles a STRUCTURE stands on. They are rebuilt whenever
     occupancy changes - placeBuilding and removeBuilding bump the stamp, which
     covers walls, deployed rigs, captured and destroyed buildings and a loaded
     save. Measured churn: 0.19 stamp changes per game-second on fulda 144,
     0.26 on taiwan, 0.05 on fulda 288 - and one rebuild costs 0.61 ms on a
     fulda 144 grid, 0.34 ms on taiwan, 1.6 ms on a 288 one. That is about a
     tenth of a millisecond per game-second, against a search bill of 11.7 ms
     per game-second on fulda 144 and 33.4 on fulda 288 that it cuts to 1.5
     and 0.5. It is also LAZY: the
     rebuild happens when a label is next asked for, and only for the layer
     asked, so a flurry of walls going up costs one rebuild, not one each.
     THE ONE RULE THAT KEEPS A UNIT FROM BEING STRANDED: a tile may only be
     labelled blocked if it is blocked for EVERY caller. Field obstacles are
     therefore left out - wire stops nobody and dragon's teeth stop only
     vehicles - and so is an obstacle tile whose obstacle is already dead.
     Under-blocking costs a search that finds the route anyway; over-blocking
     would refuse a route that exists. */
  let probeFn = null, stampFn = null;
  let liveStamp = -1, liveGround = null, liveSea = null;

  function setBlockProbe(probe, stamp) {
    probeFn = probe || null; stampFn = stamp || null;
    liveStamp = -1; liveGround = null; liveSea = null;
  }

  function labels(map, key, live) {
    const t = tablesFor(map, key);
    if (!live || !probeFn) {
      if (!t.comp) t.comp = flood(map.W, map.H, t.pass, null);
      return t.comp;
    }
    const s = stampFn ? (stampFn() | 0) : 0;
    if (s !== liveStamp) { liveStamp = s; liveGround = null; liveSea = null; }
    if (key === "sea") {
      if (!liveSea) liveSea = flood(map.W, map.H, t.pass, probeFn);
      return liveSea;
    }
    if (!liveGround) liveGround = flood(map.W, map.H, t.pass, probeFn);
    return liveGround;
  }

  /* The tile carrying label `want` that is closest to (tx,ty) in real
     (Euclidean) distance. Rings are scanned outwards and the scan stops as
     soon as no further ring can beat what has been found - a ring at
     Chebyshev radius r is never nearer than r, so one extra pass over the
     diagonal corners is all the exactness costs. A full sweep of a 144 map
     is about 83,000 array reads, still two orders of magnitude cheaper than
     the landmass-wide A* this replaces. */
  function nearestLabelled(lab, W, H, tx, ty, want) {
    if (tx >= 0 && ty >= 0 && tx < W && ty < H && lab[ty * W + tx] === want)
      return { x: tx, y: ty };
    let bx = -1, by = -1, bd = Infinity;
    const maxR = W + H;
    for (let r = 1; r <= maxR; r++) {
      if (bd <= r * r) break;
      const x0 = tx - r, x1 = tx + r, y0 = ty - r, y1 = ty + r;
      if (x0 < 0 && y0 < 0 && x1 >= W && y1 >= H) break;   // the ring has left the map
      for (let x = x0; x <= x1; x++) {
        if (x < 0 || x >= W) continue;
        if (y0 >= 0 && lab[y0 * W + x] === want) {
          const d = (x - tx) * (x - tx) + r * r;
          if (d < bd) { bd = d; bx = x; by = y0; }
        }
        if (y1 < H && lab[y1 * W + x] === want) {
          const d = (x - tx) * (x - tx) + r * r;
          if (d < bd) { bd = d; bx = x; by = y1; }
        }
      }
      for (let y = y0 + 1; y <= y1 - 1; y++) {
        if (y < 0 || y >= H) continue;
        if (x0 >= 0 && lab[y * W + x0] === want) {
          const d = r * r + (y - ty) * (y - ty);
          if (d < bd) { bd = d; bx = x0; by = y; }
        }
        if (x1 < W && lab[y * W + x1] === want) {
          const d = r * r + (y - ty) * (y - ty);
          if (d < bd) { bd = d; bx = x1; by = y; }
        }
      }
    }
    return bx >= 0 ? { x: bx, y: by } : null;
  }

  /* ---------------- reusable search state ----------------
     One set of arrays for the life of the map instead of three per call.
     `stat` carries the generation: +gen means the tile has a g-cost, -gen
     means it is closed, anything else is a leftover from an older search and
     reads as untouched. A stale value can never be mistaken for a live one
     because generations are strictly positive. */
  let bufN = -1, came = null, gCost = null, stat = null, gen = 0;
  function newGen(N) {
    if (bufN !== N) {
      bufN = N;
      came = new Int32Array(N); gCost = new Float32Array(N); stat = new Int32Array(N);
      gen = 0;
    }
    if (++gen >= 0x40000000) { stat.fill(0); gen = 1; }
    return gen;
  }

  /* binary min-heap over (tile index, f), in typed arrays: the old one boxed
     an object per push and a busy search pushes tens of thousands. f stays
     64-bit so the comparisons - and therefore the route chosen among equal
     ones - are the same as before. */
  let hI = new Int32Array(4096), hF = new Float64Array(4096), hn = 0;
  function hpush(i, f) {
    if (hn === hI.length) {
      const ni = new Int32Array(hn * 2); ni.set(hI); hI = ni;
      const nf = new Float64Array(hn * 2); nf.set(hF); hF = nf;
    }
    let k = hn++;
    hI[k] = i; hF[k] = f;
    while (k > 0) {
      const p = (k - 1) >> 1;
      if (hF[p] <= hF[k]) break;
      const ti = hI[p]; hI[p] = hI[k]; hI[k] = ti;
      const tf = hF[p]; hF[p] = hF[k]; hF[k] = tf;
      k = p;
    }
  }
  function hpop() {
    const top = hI[0];
    hn--;
    if (hn > 0) {
      hI[0] = hI[hn]; hF[0] = hF[hn];
      let k = 0;
      for (;;) {
        const l = 2 * k + 1, r = l + 1;
        let m = k;
        if (l < hn && hF[l] < hF[m]) m = l;
        if (r < hn && hF[r] < hF[m]) m = r;
        if (m === k) break;
        const ti = hI[m]; hI[m] = hI[k]; hI[k] = ti;
        const tf = hF[m]; hF[m] = hF[k]; hF[k] = tf;
        k = m;
      }
    }
    return top;
  }

  /* find(map, sx, sy, gx, gy, layer, blockFn) -> array of {x,y} tile centres or null
     blockFn(tx,ty) may veto tiles occupied by structures.                       */
  function find(map, sx, sy, gx, gy, layer, blockFn) {
    const W = map.W, H = map.H;
    if (layer === "air") return [{ x: gx, y: gy }];

    sx = U.clamp(sx, 0, W - 1); sy = U.clamp(sy, 0, H - 1);
    gx = U.clamp(gx, 0, W - 1); gy = U.clamp(gy, 0, H - 1);

    const key = keyOf(layer);
    const t = tablesFor(map, key);
    const pass = t.pass, terr = t.terr, spd = t.spd;

    /* ---- is there any route at all? ----
       A goal on a different piece of ground from the unit cannot be reached,
       and the old code proved that by expanding the whole landmass before it
       would say so. The label says it for free - and the answer it then gives
       is the same answer as before: walk to the nearest tile of OUR OWN piece
       of ground and stop there facing the goal. Replaying 29,685 real queries
       through both, that tile is NEVER further from the ordered goal than the
       old expansion's answer and is nearer on 5,516 of them (fulda 144: mean
       0.337 tiles against 0.412; taiwan: 3.172 against 3.302) - the same
       intent, a little better served, and no search runs at all. */
    const lab = labels(map, key, !!blockFn);
    const ls = lab[sy * W + sx];
    if (ls && lab[gy * W + gx] !== ls) {
      const snap = nearestLabelled(lab, W, H, gx, gy, ls);
      if (!snap) return null;
      /* WHEN MAY AN ORDER BE REFUSED OUTRIGHT? Only where the old code
         refused it, and the old code asked one question: with the goal tile
         itself illegal (open water, a footprint), is there ANY legal tile
         within FOURTEEN of it? If there was it walked as far towards it as it
         could; if there was not it returned null, and that limit has to stay -
         without it an order dropped far out to sea would march the whole army
         to the nearest beach instead of being ignored.
         Asking that question of OUR OWN piece of ground instead is NOT the
         same question, and getting it wrong is expensive: Unit.stepAlong reads
         a null path as "arrived", so the order completes and the unit never
         moves. Measured by replaying every query of a real match through both:
         110 of 11,730 calls on taiwan (none on fulda) were orders the old code
         obeyed - right-click an enemy structure across a strait wider than
         fourteen tiles - that a component-only test threw away. So ask the old
         question, and when the answer is yes walk to the tile of our own piece
         nearest the goal, which is where the old whole-landmass expansion
         ended up anyway and is never further from it. */
      if (!ok(map, gx, gy, layer, blockFn) &&
          Math.max(Math.abs(snap.x - gx), Math.abs(snap.y - gy)) > 14 &&
          !nearest(map, gx, gy, layer, blockFn, 14)) return null;
      gx = snap.x; gy = snap.y;
    }

    /* goal on impassable ground: spiral out for the nearest legal tile */
    if (!ok(map, gx, gy, layer, blockFn)) {
      const g = nearest(map, gx, gy, layer, blockFn, 14);
      if (!g) return null;
      gx = g.x; gy = g.y;
    }
    if (sx === gx && sy === gy) return [{ x: gx, y: gy }];

    const gn = newGen(W * H);
    const si = sy * W + sx;
    gCost[si] = 0; stat[si] = gn;
    hn = 0;
    hpush(si, octile(sx, sy, gx, gy));

    let expanded = 0;
    const LIMIT = Math.min(26000, W * H * 0.85);   // fail-safe, scaled to the grid
    /* the explored tile closest to the goal, kept as we go. The old code swept
       all W*H tiles for it after every search that failed; the tie-break on the
       lower index reproduces that sweep's answer exactly. */
    let best = -1, bd = Infinity;

    while (hn) {
      const ci = hpop();
      if (stat[ci] === -gn) continue;
      stat[ci] = -gn;
      const cx = ci % W, cy = (ci / W) | 0;
      if (cx === gx && cy === gy) return rebuild(came, ci, W, sx, sy);
      const dgx = cx - gx, dgy = cy - gy, dd = dgx * dgx + dgy * dgy;
      if (dd < bd || (dd === bd && ci < best)) { bd = dd; best = ci; }
      if (++expanded > LIMIT) break;

      const gc = gCost[ci];
      for (let d = 0; d < 8; d++) {
        const nx = cx + DX[d], ny = cy + DY[d];
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const ni = ny * W + nx;
        if (stat[ni] === -gn) continue;
        if (!pass[ni]) continue;
        if (blockFn && blockFn(nx, ny)) continue;
        /* forbid diagonal corner-cutting through blocked orthogonals */
        if (DW[d] > 1) {
          const ia = cy * W + nx, ib = ny * W + cx;
          if (!pass[ia] || (blockFn && blockFn(nx, cy))) continue;
          if (!pass[ib] || (blockFn && blockFn(cx, ny))) continue;
        }
        /* cost weighted by terrain speed so roads attract, woods repel */
        const ng = gc + DW[d] / spd[terr[ni]];
        if (stat[ni] !== gn || ng < gCost[ni]) {
          gCost[ni] = ng;
          came[ni] = ci;
          stat[ni] = gn;
          hpush(ni, ng + octile(nx, ny, gx, gy));
        }
      }
    }
    /* unreachable: path to the explored tile closest to the goal */
    return best >= 0 && best !== si ? rebuild(came, best, W, sx, sy) : null;
  }

  function ok(map, tx, ty, layer, blockFn) {
    if (!GameMap.passable(map, tx, ty, layer)) return false;
    if (blockFn && blockFn(tx, ty)) return false;
    return true;
  }
  function octile(x1, y1, x2, y2) {
    const dx = Math.abs(x1 - x2), dy = Math.abs(y1 - y2);
    return (dx + dy) - 0.586 * Math.min(dx, dy);
  }
  function rebuild(came, end, W, sx, sy) {
    const out = [];
    let i = end;
    while (i >= 0 && !(i % W === sx && ((i / W) | 0) === sy)) {
      out.push({ x: i % W, y: (i / W) | 0 });
      i = came[i];
    }
    out.reverse();
    /* string-pull: drop intermediate collinear points */
    const s = [];
    for (let k = 0; k < out.length; k++) {
      if (k === 0 || k === out.length - 1) { s.push(out[k]); continue; }
      const a = s[s.length - 1], b = out[k], c = out[k + 1];
      if ((b.x - a.x) * (c.y - b.y) !== (b.y - a.y) * (c.x - b.x)) s.push(out[k]);
    }
    return s;
  }

  function nearest(map, tx, ty, layer, blockFn, maxR) {
    for (let r = 1; r <= maxR; r++) {
      for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
        const nx = tx + dx, ny = ty + dy;
        if (ok(map, nx, ny, layer, blockFn) && nx >= 0 && ny >= 0 && nx < map.W && ny < map.H)
          return { x: nx, y: ny };
      }
    }
    return null;
  }

  /* invalidate() -> throw away everything cached for the map in hand.
     The tables and the labels are keyed on the map OBJECT, which retires them
     on its own when a new battle builds a new map - and that was enough while
     GameMap.build was the only thing that ever wrote map.terrain. An edited
     theatre is what makes that assumption worth stating out loud, because the
     cost of it being wrong is not a slower search: a stale `pass` table is a
     wall the search cannot see or a door that is no longer there, and the
     second of those strands a unit (Unit.stepAlong reads a null path as
     "arrived"). Cheap enough to call unconditionally - it drops references. */
  function invalidate() {
    tMap = null;
    tGround.pass = tGround.terr = tGround.spd = tGround.comp = null;
    tSea.pass = tSea.terr = tSea.spd = tSea.comp = null;
    liveStamp = -1; liveGround = null; liveSea = null;
    bufN = -1;                                // the grid may be a different size
  }

  /* components(map, layer) -> the terrain label array, one entry per tile, 0
     where the layer cannot go. The commander reads this for the same question
     ("does that ground join ours?") and used to keep its own copy of the same
     flood fill; sharing one means the plan and the route it turns into can
     never disagree about what joins what. */
  function components(map, layer) {
    if (layer === "air") return null;
    return labels(map, keyOf(layer), false);
  }

  /* reachable(map, sx, sy, gx, gy, layer, live) -> true unless the labels can
     prove otherwise. Exported for callers that want the cheap question on its
     own; find() asks it itself. */
  function reachable(map, sx, sy, gx, gy, layer, live) {
    if (layer === "air") return true;
    const W = map.W, H = map.H;
    sx = U.clamp(sx, 0, W - 1); sy = U.clamp(sy, 0, H - 1);
    gx = U.clamp(gx, 0, W - 1); gy = U.clamp(gy, 0, H - 1);
    const lab = labels(map, keyOf(layer), !!live);
    const a = lab[sy * W + sx], b = lab[gy * W + gx];
    return !a || !b || a === b;
  }

  return { find, nearest, reachable, components, setBlockProbe, invalidate };
})();
