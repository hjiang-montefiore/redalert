/* ============ map.js — rasterise a real-world theatre into the grid ============
   Produces: terrain[], elev[], ore[], oreMax[], oilNodes[], starts[],
   plus passability helpers shared by pathfinding and construction.            */
var GameMap = (function () {

  function pointInPoly(px, py, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
      if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  }
  function segDist(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1, dy = y2 - y1;
    const L2 = dx * dx + dy * dy;
    let t = L2 ? ((px - x1) * dx + (py - y1) * dy) / L2 : 0;
    t = U.clamp(t, 0, 1);
    return U.dist(px, py, x1 + dx * t, y1 + dy * t);
  }
  function polyDist(px, py, pts) {
    let d = Infinity;
    for (let i = 0; i < pts.length - 1; i++)
      d = Math.min(d, segDist(px, py, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]));
    return d;
  }

  function build(theatreId, seed, richness, opts) {
    richness = richness || 1;              // 0.6 sparse .. 1.6 abundant
    const th = THEATRES[theatreId] || THEATRES[THEATRE_LIST[0]];
    const W = CFG.MAP_W, H = CFG.MAP_H;
    const rng = U.mulberry32(seed);
    const [lo0, la0, lo1, la1] = th.bbox;
    const dLon = lo1 - lo0, dLat = la1 - la0;

    /* tile centre -> lon/lat (y axis flips: north at top) */
    const toLon = tx => lo0 + (tx + 0.5) / W * dLon;
    const toLat = ty => la1 - (ty + 0.5) / H * dLat;
    /* lon/lat -> tile */
    const toTx = lon => U.clamp(Math.round((lon - lo0) / dLon * W - 0.5), 0, W - 1);
    const toTy = lat => U.clamp(Math.round((la1 - lat) / dLat * H - 0.5), 0, H - 1);

    const terrain = new Uint8Array(W * H);
    const elev = new Uint8Array(W * H);
    const ore = new Float32Array(W * H);
    const oreMax = new Float32Array(W * H);
    const oreSeed = new Uint8Array(W * H);

    /* ---- land / sea from real coast polygons ---- */
    /* an arid theatre is desert to the horizon: sand, not pasture, and no woods */
    const BASE = th.arid ? T.SAND : T.GRASS;
    for (let y = 0; y < H; y++) {
      const lat = toLat(y);
      for (let x = 0; x < W; x++) {
        const lon = toLon(x);
        let land = false;
        for (let i = 0; i < th.land.length && !land; i++)
          if (pointInPoly(lon, lat, th.land[i])) land = true;
        terrain[y * W + x] = land ? BASE : T.WATER;
      }
    }

    /* ---- ridges raise elevation; peaks become rock ---- */
    for (const rd of th.ridges) {
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const i = y * W + x;
        if (terrain[i] === T.WATER) continue;
        const d = polyDist(toLon(x), toLat(y), rd.pts);
        if (d < rd.w) {
          const f = 1 - d / rd.w;
          const lvl = Math.min(3, Math.max(elev[i], Math.round(f * rd.h + rng() * 0.35)));
          elev[i] = lvl;
          if (lvl >= 3 && rng() < 0.55) terrain[i] = T.ROCK;
          else if (lvl >= 2 && rng() < 0.30) terrain[i] = T.DIRT;
        }
      }
    }

    /* ---- rivers carve water ---- */
    for (const rv of (th.rivers || [])) {
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        if (polyDist(toLon(x), toLat(y), rv.pts) < rv.w) {
          terrain[y * W + x] = T.WATER; elev[y * W + x] = 0;
        }
      }
    }

    /* ---- wadis: dry riverbeds ----
       A wadi is a watercourse that is empty except after rain. It is a
       depression you can drive through, not an obstacle - and in 1991 the
       Wadi al-Batin was the axis the coalition's left hook used. */
    for (const wd of (th.wadis || [])) {
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const i = y * W + x;
        if (terrain[i] === T.WATER) continue;
        const d = polyDist(toLon(x), toLat(y), wd.pts);
        if (d < wd.w) {
          terrain[i] = d < wd.w * 0.55 ? T.SAND : T.DIRT;
          elev[i] = 0;                       // the bed is the low ground
        }
      }
    }

    /* ---- beaches: land adjacent to sea becomes sand ---- */
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (terrain[i] === T.WATER || elev[i] > 0) continue;
      let sea = false;
      for (let dy = -1; dy <= 1 && !sea; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < W && ny < H && terrain[ny * W + nx] === T.WATER) { sea = true; break; }
      }
      if (sea) terrain[i] = T.SAND;
    }

    /* ---- woods: seeded clumps on low ground ----
       In an arid theatre the only greenery is date-palm groves hugging the
       waterways, so the clumps are few and must sit next to water.        */
    const clumps = th.arid ? 7 : 26;
    for (let c = 0; c < clumps; c++) {
      const cx = (rng() * W) | 0, cy = (rng() * H) | 0, r = (th.arid ? 1.5 : 2) + rng() * (th.arid ? 2 : 4);
      if (th.arid) {
        /* reject any clump centre that is not within a few tiles of water */
        let nearWater = false;
        for (let dy = -4; dy <= 4 && !nearWater; dy++) for (let dx = -4; dx <= 4; dx++) {
          const nx = cx + dx, ny = cy + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          if (terrain[ny * W + nx] === T.WATER) { nearWater = true; break; }
        }
        if (!nearWater) continue;
      }
      for (let y = Math.max(0, cy - 6); y < Math.min(H, cy + 6); y++)
        for (let x = Math.max(0, cx - 6); x < Math.min(W, cx + 6); x++) {
          const i = y * W + x;
          if (terrain[i] === BASE && elev[i] <= 1 && U.dist(x, y, cx, cy) < r && rng() < 0.75)
            terrain[i] = T.TREE;
        }
    }

    /* ---- built-up areas: real cities, blocked out street by street ----
       Urban ground is slow and gives heavy cover, so a city is a genuine
       obstacle an attacker must reduce rather than drive around freely.   */
    if (th.cities) for (const c of th.cities) {
      let cx = toTx(c[0]), cy = toTy(c[1]);
      const R = c[2] || 4;
      /* a real port city sits ON the coast, so a survey point a tile or two
         off the traced shoreline lands in the water. Nudge it back onto land
         rather than silently dropping the city. */
      if (terrain[cy * W + cx] === T.WATER) {
        let best = null, bd = 1e9;
        for (let dy = -8; dy <= 8; dy++) for (let dx = -8; dx <= 8; dx++) {
          const nx = cx + dx, ny = cy + dy;
          if (nx < 2 || ny < 2 || nx >= W - 2 || ny >= H - 2) continue;
          if (terrain[ny * W + nx] === T.WATER) continue;
          const d = dx * dx + dy * dy;
          if (d < bd) { bd = d; best = [nx, ny]; }
        }
        if (!best) continue;
        cx = best[0]; cy = best[1];
      }
      const RI = Math.ceil(R) + 2;
      for (let y = Math.max(1, cy - RI); y < Math.min(H - 1, cy + RI); y++)
        for (let x = Math.max(1, cx - RI); x < Math.min(W - 1, cx + RI); x++) {
          const i = y * W + x;
          if (terrain[i] === T.WATER || terrain[i] === T.ROCK) continue;
          const d = U.dist(x, y, cx, cy);
          if (d > R) continue;
          /* denser core, ragged outskirts */
          if (d < R * 0.68 || rng() < 1 - (d / R - 0.68) / 0.32) terrain[i] = T.URBAN;
        }
      /* two thin through-routes, offset from the centre so the town does not
         read as a cross from above but armour still has an axis of advance */
      const oy = cy + (((rng() * 5) | 0) - 2), ox = cx + (((rng() * 5) | 0) - 2);
      for (let x = Math.max(1, cx - RI); x < Math.min(W - 1, cx + RI); x++) {
        const i = oy * W + x;
        if (i >= 0 && i < terrain.length && terrain[i] === T.URBAN) terrain[i] = T.ROAD;
      }
      for (let y = Math.max(1, cy - RI); y < Math.min(H - 1, cy + RI); y++) {
        const i = y * W + ox;
        if (terrain[i] === T.URBAN) terrain[i] = T.ROAD;
      }
    }

    /* ---- civilian structures ----
       A handful of occupiable buildings scattered through each town. Their
       positions are recorded here and the game places them once the entity
       system exists. */
    const civSites = [];
    if (th.cities) for (const c of th.cities) {
      const cx = toTx(c[0]), cy = toTy(c[1]), R = c[2] || 4;
      const want = Math.max(2, Math.round(R * 0.8));
      let tries = 0;
      while (civSites.length < 400 && tries < want * 30) {
        tries++;
        const a = rng() * Math.PI * 2, rr = Math.sqrt(rng()) * R * 0.85;
        const x = Math.round(cx + Math.cos(a) * rr), y = Math.round(cy + Math.sin(a) * rr);
        if (x < 2 || y < 2 || x >= W - 3 || y >= H - 3) continue;
        let ok = true;
        for (let dy = 0; dy < 2 && ok; dy++) for (let dx = 0; dx < 2; dx++) {
          const t = terrain[(y + dy) * W + (x + dx)];
          if (t !== T.URBAN && t !== T.ROAD) { ok = false; break; }
        }
        if (!ok) continue;
        if (civSites.some(s2 => Math.abs(s2.x - x) < 3 && Math.abs(s2.y - y) < 3)) continue;
        civSites.push({ x, y });
        if (civSites.filter(s2 => Math.abs(s2.x - cx) < R && Math.abs(s2.y - cy) < R).length >= want) break;
      }
    }

    /* ---- marsh and sabkha: soft ground that bogs vehicles down ---- */
    if (th.marsh) for (const m of th.marsh) {
      const cx = toTx(m[0]), cy = toTy(m[1]), R = m[2] || 5;
      const RI = Math.ceil(R) + 2;
      for (let y = Math.max(1, cy - RI); y < Math.min(H - 1, cy + RI); y++)
        for (let x = Math.max(1, cx - RI); x < Math.min(W - 1, cx + RI); x++) {
          const i = y * W + x;
          if (terrain[i] === T.WATER || terrain[i] === T.ROCK ||
              terrain[i] === T.URBAN || terrain[i] === T.ROAD) continue;
          if (U.dist(x, y, cx, cy) < R * (0.7 + rng() * 0.45)) terrain[i] = T.MARSH;
        }
    }

    /* ---- ore fields around the surveyed sites ---- */
    for (const [lon, lat, rich] of th.ore) {
      const cx = toTx(lon), cy = toTy(lat);
      const R = 3 + rich * 1.6;
      for (let y = Math.max(0, cy - 6); y < Math.min(H, cy + 6); y++)
        for (let x = Math.max(0, cx - 6); x < Math.min(W, cx + 6); x++) {
          const i = y * W + x;
          if (terrain[i] === T.WATER || terrain[i] === T.ROCK ||
              terrain[i] === T.URBAN) continue;
          const d = U.dist(x, y, cx, cy);
          if (d < R) {
            const v = (1 - d / R) * 1250 * rich * richness * (0.7 + rng() * 0.6);
            if (v > ore[i]) { ore[i] = v; oreMax[i] = v * 1.35; oreSeed[i] = d < 2.6 ? 1 : 0; }
          }
        }
    }

    /* ---- oil nodes: derricks may only be built here ---- */
    const oilNodes = th.oil.map(([lon, lat]) => {
      let tx = toTx(lon), ty = toTy(lat);
      /* nudge onto passable land if the survey point fell on water/rock */
      let best = null, bd = 1e9;
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const nx = tx + dx, ny = ty + dy;
        if (nx < 1 || ny < 1 || nx >= W - 2 || ny >= H - 2) continue;
        const t = terrain[ny * W + nx];
        if (t !== T.WATER && t !== T.ROCK) {
          const d = dx * dx + dy * dy;
          if (d < bd) { bd = d; best = [nx, ny]; }
        }
      }
      return best ? { x: best[0], y: best[1], taken: false } : null;
    }).filter(Boolean);

    /* Clear a buildable pad around every node. Without this a node that landed
       in woods, on rock, or inside an ore field could never take a derrick. */
    for (const n of oilNodes) {
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const x = n.x + dx, y = n.y + dy;
        if (x < 1 || y < 1 || x >= W - 1 || y >= H - 1) continue;
        const i = y * W + x;
        if (terrain[i] === T.WATER) continue;            // keep the coastline honest
        if (terrain[i] === T.ROCK || terrain[i] === T.TREE ||
            terrain[i] === T.URBAN || terrain[i] === T.MARSH) terrain[i] = T.DIRT;
        if (elev[i] > 1) elev[i] = 1;
        ore[i] = 0; oreMax[i] = 0; oreSeed[i] = 0;       // no ore under the pad
      }
    }

    /* ---- start zones ----
       Theatres author two historical deployments. For a bigger battle we add
       further starts by picking the buildable spots that are furthest from all
       existing ones, so nobody gets boxed in behind someone else.          */
    const starts = th.starts.map(([lon, lat]) => ({ x: toTx(lon), y: toTy(lat) }));
    const wantStarts = Math.max(2, Math.min(8, (opts && opts.starts) || 2));

    function landRoom(cx, cy, r) {
      /* fraction of a disc that is buildable land — a start needs real space */
      let good = 0, total = 0;
      for (let y = cy - r; y <= cy + r; y += 2) for (let x = cx - r; x <= cx + r; x += 2) {
        if (U.dist(x, y, cx, cy) > r) continue;
        total++;
        if (x < 2 || y < 2 || x >= W - 2 || y >= H - 2) continue;
        const t = terrain[y * W + x];
        if (t !== T.WATER && t !== T.ROCK) good++;
      }
      return total ? good / total : 0;
    }
    while (starts.length < wantStarts) {
      let best = null, bestScore = -1;
      for (let y = 10; y < H - 10; y += 3) for (let x = 10; x < W - 10; x += 3) {
        const room = landRoom(x, y, 7);
        if (room < 0.86) continue;                    // needs a solid base footprint
        let nearest = 1e9;
        for (const s of starts) nearest = Math.min(nearest, U.dist(x, y, s.x, s.y));
        if (nearest < 22) continue;                   // never crowd another commander
        const score = nearest + room * 10;
        if (score > bestScore) { bestScore = score; best = { x, y }; }
      }
      if (!best) break;                                // map simply has no more room
      starts.push(best);
    }
    for (const s of starts) {
      for (let y = Math.max(0, s.y - 7); y < Math.min(H, s.y + 8); y++)
        for (let x = Math.max(0, s.x - 7); x < Math.min(W, s.x + 8); x++) {
          const i = y * W + x;
          if (terrain[i] === T.WATER) continue;
          if (U.dist(x, y, s.x, s.y) < 7) {
            if (terrain[i] === T.ROCK || terrain[i] === T.TREE ||
                terrain[i] === T.URBAN || terrain[i] === T.MARSH) terrain[i] = BASE;
            if (elev[i] > 1) elev[i] = 1;
            ore[i] = 0;
          }
        }
    }

    /* ---- roads: link the two start zones with a crude path along low ground ---- */
    carveRoad(terrain, elev, W, H, starts[0], starts[1]);

    /* ---- fine-grained coastline field for realistic rendering ----
       FS samples per tile side, straight from the source polygons, so the
       rendered coast is as smooth as the digitised geography.            */
    const FS = 4, FW = W * FS, FH = H * FS;
    const waterFine = new Uint8Array(FW * FH);
    for (let fy = 0; fy < FH; fy++) {
      const lat = la1 - (fy + 0.5) / FH * dLat;
      for (let fx = 0; fx < FW; fx++) {
        const lon = lo0 + (fx + 0.5) / FW * dLon;
        let land = false;
        for (let i = 0; i < th.land.length && !land; i++)
          if (pointInPoly(lon, lat, th.land[i])) land = true;
        if (land) {
          for (const rv of (th.rivers || []))
            if (polyDist(lon, lat, rv.pts) < rv.w) { land = false; break; }
        }
        waterFine[fy * FW + fx] = land ? 0 : 1;
      }
    }
    /* signed distance to the shoreline in fine cells: >0 on land, <0 in water */
    const shore = new Float32Array(FW * FH).fill(1e9);
    const qx = new Int32Array(FW * FH), qy = new Int32Array(FW * FH);
    let qn = 0;
    for (let fy = 0; fy < FH; fy++) for (let fx = 0; fx < FW; fx++) {
      const w0 = waterFine[fy * FW + fx];
      const nb = (fx > 0 && waterFine[fy * FW + fx - 1] !== w0) ||
                 (fx < FW - 1 && waterFine[fy * FW + fx + 1] !== w0) ||
                 (fy > 0 && waterFine[(fy - 1) * FW + fx] !== w0) ||
                 (fy < FH - 1 && waterFine[(fy + 1) * FW + fx] !== w0);
      if (nb) { shore[fy * FW + fx] = 0; qx[qn] = fx; qy[qn] = fy; qn++; }
    }
    for (let qi = 0; qi < qn; qi++) {
      const fx = qx[qi], fy = qy[qi], d = shore[fy * FW + fx];
      if (d > 15) continue;
      const nd = d + 1;
      const tryN = (nx, ny) => {
        if (nx < 0 || ny < 0 || nx >= FW || ny >= FH) return;
        if (shore[ny * FW + nx] > nd) { shore[ny * FW + nx] = nd; qx[qn] = nx; qy[qn] = ny; qn++; }
      };
      tryN(fx + 1, fy); tryN(fx - 1, fy); tryN(fx, fy + 1); tryN(fx, fy - 1);
    }
    for (let i = 0; i < shore.length; i++) {
      if (shore[i] > 1e8) shore[i] = 16;
      if (waterFine[i]) shore[i] = -shore[i];
    }
    /* smoothed elevation for hillshading (water pinned to 0) */
    let elevS = new Float32Array(W * H);
    for (let i = 0; i < W * H; i++) elevS[i] = terrain[i] === T.WATER ? 0 : elev[i];
    for (let pass = 0; pass < 2; pass++) {
      const nx2 = new Float32Array(W * H);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        let sum = 0, n = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const ax = x + dx, ay = y + dy;
          if (ax < 0 || ay < 0 || ax >= W || ay >= H) continue;
          sum += elevS[ay * W + ax]; n++;
        }
        nx2[y * W + x] = sum / n;
      }
      elevS = nx2;
    }

    return {
      civSites,
      id: theatreId, name: th.name, brief: th.brief, startNames: th.startNames,
      W, H, terrain, elev, ore, oreMax, oreSeed, oilNodes, starts,
      toLon, toLat,
      FS, FW, FH, waterFine, shore, elevS,
    };
  }

  /* cheap greedy road: walks toward the target preferring low flat land */
  function carveRoad(terrain, elev, W, H, a, b) {
    let x = a.x, y = a.y, guard = W * H;
    while ((x !== b.x || y !== b.y) && guard-- > 0) {
      const dx = Math.sign(b.x - x), dy = Math.sign(b.y - y);
      /* candidate steps, prefer the diagonal-ish direct one */
      const cands = [[dx, dy], [dx, 0], [0, dy], [dx, -dy], [-dx, dy]];
      let done = false;
      for (const [sx, sy] of cands) {
        const nx = x + sx, ny = y + sy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const t = terrain[ny * W + nx];
        if (t === T.WATER || t === T.ROCK) continue;
        x = nx; y = ny; done = true; break;
      }
      if (!done) break;                       // walled in — leave the road unfinished
      const i = y * W + x;
      if (terrain[i] !== T.WATER) terrain[i] = T.ROAD;
    }
  }

  /* --- passability helpers --------------------------------------- */
  function passable(map, tx, ty, layer) {
    if (tx < 0 || ty < 0 || tx >= map.W || ty >= map.H) return false;
    const t = map.terrain[ty * map.W + tx];
    if (layer === "air") return true;
    if (layer === "sea" || layer === "sub") return t === T.WATER;
    return CFG.TERRAIN[t].pass;
  }
  function speedAt(map, tx, ty, layer) {
    if (layer === "air") return 1;
    if (tx < 0 || ty < 0 || tx >= map.W || ty >= map.H) return 0.001;
    const t = map.terrain[ty * map.W + tx];
    if (layer === "sea" || layer === "sub") return t === T.WATER ? 1 : 0.001;
    return CFG.TERRAIN[t].speed || 0.001;
  }
  function coverAt(map, tx, ty) {
    if (tx < 0 || ty < 0 || tx >= map.W || ty >= map.H) return 0;
    return CFG.TERRAIN[map.terrain[ty * map.W + tx]].cover || 0;
  }
  function elevAt(map, tx, ty) {
    if (tx < 0 || ty < 0 || tx >= map.W || ty >= map.H) return 0;
    return map.elev[ty * map.W + tx];
  }

  return { build, passable, speedAt, coverAt, elevAt };
})();
