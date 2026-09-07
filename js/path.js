/* ============ path.js — A* over the tile grid, per movement layer ============ */
var Path = (function () {
  const DIRS = [
    [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
    [1, 1, 1.414], [1, -1, 1.414], [-1, 1, 1.414], [-1, -1, 1.414],
  ];
  const heap = new U.Heap();

  /* find(map, sx, sy, gx, gy, layer, blockFn) -> array of {x,y} tile centres or null
     blockFn(tx,ty) may veto tiles occupied by structures.                       */
  function find(map, sx, sy, gx, gy, layer, blockFn) {
    const W = map.W, H = map.H;
    if (layer === "air") return [{ x: gx, y: gy }];

    sx = U.clamp(sx, 0, W - 1); sy = U.clamp(sy, 0, H - 1);
    gx = U.clamp(gx, 0, W - 1); gy = U.clamp(gy, 0, H - 1);

    /* goal on impassable ground: spiral out for the nearest legal tile */
    if (!ok(map, gx, gy, layer, blockFn)) {
      const g = nearest(map, gx, gy, layer, blockFn, 14);
      if (!g) return null;
      gx = g.x; gy = g.y;
    }
    if (sx === gx && sy === gy) return [{ x: gx, y: gy }];

    const came = new Int32Array(W * H).fill(-1);
    const gCost = new Float32Array(W * H).fill(Infinity);
    const closed = new Uint8Array(W * H);
    heap.clear();

    const si = sy * W + sx;
    gCost[si] = 0;
    heap.push({ i: si, f: octile(sx, sy, gx, gy) });

    let expanded = 0;
    const LIMIT = Math.min(26000, W * H * 0.85);   // fail-safe, scaled to the grid

    while (heap.size) {
      const cur = heap.pop();
      const ci = cur.i;
      if (closed[ci]) continue;
      closed[ci] = 1;
      const cx = ci % W, cy = (ci / W) | 0;
      if (cx === gx && cy === gy) return rebuild(came, ci, W, sx, sy);
      if (++expanded > LIMIT) break;

      for (let d = 0; d < 8; d++) {
        const nx = cx + DIRS[d][0], ny = cy + DIRS[d][1];
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const ni = ny * W + nx;
        if (closed[ni]) continue;
        if (!ok(map, nx, ny, layer, blockFn)) continue;
        /* forbid diagonal corner-cutting through blocked orthogonals */
        if (DIRS[d][2] > 1) {
          if (!ok(map, cx + DIRS[d][0], cy, layer, blockFn)) continue;
          if (!ok(map, cx, cy + DIRS[d][1], layer, blockFn)) continue;
        }
        /* cost weighted by terrain speed so roads attract, woods repel */
        const sp = GameMap.speedAt(map, nx, ny, layer);
        const step = DIRS[d][2] / Math.max(0.15, sp);
        const ng = gCost[ci] + step;
        if (ng < gCost[ni]) {
          gCost[ni] = ng;
          came[ni] = ci;
          heap.push({ i: ni, f: ng + octile(nx, ny, gx, gy) });
        }
      }
    }
    /* unreachable: path to the explored tile closest to the goal */
    let best = -1, bd = Infinity;
    for (let i = 0; i < closed.length; i++) {
      if (!closed[i]) continue;
      const x = i % W, y = (i / W) | 0;
      const d = U.dist2(x, y, gx, gy);
      if (d < bd) { bd = d; best = i; }
    }
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

  return { find, nearest };
})();
