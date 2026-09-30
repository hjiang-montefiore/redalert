/* ============ render.js — 2.5D isometric renderer ============
   World space is a flat top-down plane (x right, y down).  The camera applies
   an isometric squash: screen = rot45(world) scaled by (1, ISO).  Elevation
   lifts tiles by ELEV_H per level.  All art is procedural vector drawing.     */
var Render = (function () {
  const ISO = 0.58;                 // vertical squash
  const ELEV_H = 0;                 // relief is painted (hillshade), not extruded
  const SQ2 = Math.SQRT1_2;

  let cv, ctx, W, H;
  let cam = { x: 0, y: 0, z: 1 };   // world coords of screen centre, zoom
  let terrainCache = null;          // prerendered full-map terrain (iso)
  let terrainDirty = true;
  let fogCache = null;              // prerendered fog layer, same iso space
  let fogStamp = -1;
  let G = null;

  /* world -> iso (before camera) */
  function isoX(wx, wy) { return (wx - wy) * SQ2; }
  function isoY(wx, wy, e) { return (wx + wy) * SQ2 * ISO - (e || 0) * ELEV_H; }
  /* iso -> screen */
  function sx(wx, wy) { return (isoX(wx, wy) - cam.ix) * cam.z + W / 2; }
  function sy(wx, wy, e) { return (isoY(wx, wy, e) - cam.iy) * cam.z + H / 2; }
  /* screen -> world (assumes elevation 0) */
  function unproject(px, py) {
    const ix = (px - W / 2) / cam.z + cam.ix;
    const iy = (py - H / 2) / cam.z + cam.iy;
    const a = ix / SQ2, b = iy / (SQ2 * ISO);
    return { x: (a + b) / 2, y: (b - a) / 2 };
  }

  function init(canvas, game) {
    cv = canvas; ctx = cv.getContext("2d");
    G = game;
    resize();
    cam.x = game.human.homeX; cam.y = game.human.homeY; cam.z = 0.9;
    updateCamIso();
    terrainDirty = true;
  }
  function resize() {
    W = cv.width = window.innerWidth - 216;
    H = cv.height = window.innerHeight;
  }
  function updateCamIso() { cam.ix = isoX(cam.x, cam.y); cam.iy = isoY(cam.x, cam.y, 0); }
  function moveCam(dx, dy) {
    cam.x = U.clamp(cam.x + dx, 0, G.map.W * CFG.TILE);
    cam.y = U.clamp(cam.y + dy, 0, G.map.H * CFG.TILE);
    updateCamIso();
  }
  function setCam(x, y) { cam.x = x; cam.y = y; moveCam(0, 0); }
  function zoom(f, px, py) {
    const before = unproject(px, py);
    cam.z = U.clamp(cam.z * f, CFG.MIN_ZOOM, CFG.MAX_ZOOM);
    const after = unproject(px, py);
    moveCam(before.x - after.x, before.y - after.y);
  }

  /* ---------------- terrain prerender ----------------
     A top-down "satellite" texture is painted once per game from the fine
     polygon-sampled coastline field, then projected into iso space.  Ore
     lives on its own overlay so depletions never trigger a full repaint.  */
  let worldTex = null;        // top-down texture, PPT px per tile
  let oreTex = null;          // ore/dynamic overlay, same space
  /* pixels per tile in the world texture — scaled so a bigger theatre does not
     quadruple texture memory (144x144 would otherwise be a 2304px square). */
  /* Ground texture detail, in pixels per tile. Raised from a 2048-wide budget
     to 3072: the terrain is the thing the player looks at for the whole game,
     and it is painted once when the battle loads. */
  const PPT = Math.max(10, Math.min(22, Math.round(3072 / Math.max(CFG.MAP_W, CFG.MAP_H))));

  function noiseMk(seed) {
    /* deterministic 2D value noise with 2 octaves */
    const hash = (x, y) => {
      let h = (x * 374761393 + y * 668265263 + seed * 144665) | 0;
      h = (h ^ (h >> 13)) >>> 0; h = Math.imul(h, 1274126177) >>> 0;
      return ((h ^ (h >> 16)) >>> 0) / 4294967295;
    };
    const smooth = t => t * t * (3 - 2 * t);
    const vn = (x, y) => {
      const xi = Math.floor(x), yi = Math.floor(y);
      const fx = smooth(x - xi), fy = smooth(y - yi);
      const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
      return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
    };
    return (x, y) => vn(x, y) * 0.65 + vn(x * 2.7 + 13.7, y * 2.7 + 71.3) * 0.35;
  }

  function buildWorldTexture() {
    const map = G.map, W0 = map.W, H0 = map.H;
    const TW = W0 * PPT, TH = H0 * PPT;
    worldTex = document.createElement("canvas");
    worldTex.width = TW; worldTex.height = TH;
    const wc = worldTex.getContext("2d");
    const img = wc.createImageData(TW, TH);
    const px = img.data;

    const FS = map.FS, FW = map.FW, FH = map.FH;
    const shoreAt = (tx, ty) => {
      /* bilinear sample of the signed shore field, tile coords in, fine units out */
      let fx = tx * FS - 0.5, fy = ty * FS - 0.5;
      fx = Math.max(0, Math.min(FW - 1.001, fx)); fy = Math.max(0, Math.min(FH - 1.001, fy));
      const xi = fx | 0, yi = fy | 0, ax = fx - xi, ay = fy - yi;
      const i0 = yi * FW + xi;
      const a = map.shore[i0], b = map.shore[i0 + 1], c = map.shore[i0 + FW], d = map.shore[i0 + FW + 1];
      return a + (b - a) * ax + (c - a) * ay + (a - b - c + d) * ax * ay;
    };
    const elevAt2 = (tx, ty) => {
      let x = tx - 0.5, y = ty - 0.5;
      x = Math.max(0, Math.min(W0 - 1.001, x)); y = Math.max(0, Math.min(H0 - 1.001, y));
      const xi = x | 0, yi = y | 0, ax = x - xi, ay = y - yi;
      const i0 = yi * W0 + xi;
      const a = map.elevS[i0], b = map.elevS[i0 + 1] || a, c = map.elevS[i0 + W0] || a, d = map.elevS[i0 + W0 + 1] || a;
      return a + (b - a) * ax + (c - a) * ay + (a - b - c + d) * ax * ay;
    };
    const n1 = noiseMk(1), n2 = noiseMk(2), nm = noiseMk(3), nf = noiseMk(4);

    /* prefiltered terrain-type fields: 3x3 neighbourhood fractions per tile,
       bilinear-sampled below so biome edges blend organically             */
    const rockF = new Float32Array(W0 * H0), sandF = new Float32Array(W0 * H0);
    const dirtF = new Float32Array(W0 * H0), forF = new Float32Array(W0 * H0);
    const urbF = new Float32Array(W0 * H0), marF = new Float32Array(W0 * H0);
    const roadF = new Float32Array(W0 * H0);
    for (let y0 = 0; y0 < H0; y0++) for (let x0 = 0; x0 < W0; x0++) {
      let rk = 0, sd = 0, dr = 0, fo = 0, ub = 0, ma = 0, rd = 0, n = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const ax = x0 + dx, ay = y0 + dy;
        if (ax < 0 || ay < 0 || ax >= W0 || ay >= H0) continue;
        const t = map.terrain[ay * W0 + ax]; n++;
        if (t === 4) rk++; else if (t === 1) sd++;
        else if (t === 3) dr++; else if (t === 5) fo++;
        else if (t === 7) ub++; else if (t === 8) ma++;
        else if (t === 6) rd++;
      }
      const i2 = y0 * W0 + x0;
      rockF[i2] = rk / n; sandF[i2] = sd / n; dirtF[i2] = dr / n; forF[i2] = fo / n;
      urbF[i2] = ub / n; marF[i2] = ma / n; roadF[i2] = rd / n;
    }
    const fieldAt = (F, tx, ty) => {
      let x = tx - 0.5, y = ty - 0.5;
      x = Math.max(0, Math.min(W0 - 1.001, x)); y = Math.max(0, Math.min(H0 - 1.001, y));
      const xi = x | 0, yi = y | 0, ax = x - xi, ay = y - yi;
      const i0 = yi * W0 + xi;
      const a = F[i0], b = F[i0 + 1] || a, c = F[i0 + W0] || a, d2 = F[i0 + W0 + 1] || a;
      return a + (b - a) * ax + (c - a) * ay + (a - b - c + d2) * ax * ay;
    };
    const sm01 = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };

    /* biome base colours [r,g,b] */
    const ARID = !!(THEATRES[G.opts.theatre] && THEATRES[G.opts.theatre].arid);
    /* A desert is not one colour. Wind-blown dune sand is pale and warm; the
       interdune gravel plains (reg) are darker and greyer; deflated hamada is
       browner still. Banding these gives the eye something to read. */
    const GRASS1 = ARID ? [196, 176, 130] : [92, 112, 66];
    const GRASS2 = ARID ? [172, 152, 110] : [72, 96, 58];
    const SCRUB  = ARID ? [146, 130,  99] : [126, 128, 74];
    const SAND1  = ARID ? [205, 186, 141] : [187, 168, 122];
    const SANDWET = ARID ? [163, 145, 108] : [148, 129, 92];
    const DIRT1  = ARID ? [150, 128,  95] : [130, 108, 76];
    const REG    = [134, 121,  97];        // gravel plain
    const SABKHA = [198, 196, 182];        // salt flat, almost white
    const URBAN1 = [124, 120, 112], URBAN2 = [96, 93, 88];
    /* A road across open desert is a graded track the colour of compacted
       ground, not black asphalt. Only inside a town does it darken. */
    /* Desert supply routes read as pale scars from the air - compacted, dusty
       ground, lighter than the sand beside them. Only metalled roads in a
       temperate theatre are darker than their surroundings. */
    const TRACK = ARID ? [214, 199, 162] : [104, 100, 92];
    const TRACK_EDGE = ARID ? [201, 184, 145] : [118, 116, 104];
    const MARSH1 = [ 96, 106,  84], MARSH2 = [ 74,  84,  68];
    const ROCK1 = [128, 126, 118], ROCK2 = [96, 95, 92];
    const FLOOR = [56, 74, 44];
    const DEEP = [16, 34, 52], MID = [30, 56, 78], SHAL = [64, 100, 104], FOAM = [200, 210, 206];

    for (let y = 0; y < TH; y++) {
      const ty0 = (y + 0.5) / PPT;
      for (let x = 0; x < TW; x++) {
        const tx0 = (x + 0.5) / PPT;
        /* domain warp so nothing follows the tile lattice */
        const wxT = tx0 + (n1(tx0 * 1.6, ty0 * 1.6) - 0.5) * 0.7;
        const wyT = ty0 + (n2(tx0 * 1.6, ty0 * 1.6) - 0.5) * 0.7;
        const d = shoreAt(wxT, wyT);                 // + land, - water (fine cells; 4 per tile)
        const mott = nm(tx0 * 5.1, ty0 * 5.1) - 0.5;
        const fine = nf(tx0 * 14.7, ty0 * 14.7) - 0.5;

        let r, g, b;
        if (d < 0) {
          /* water: depth gradient + wave streaks + shore foam */
          const depth = Math.min(1, -d / 7);
          r = MID[0] + (DEEP[0] - MID[0]) * depth;
          g = MID[1] + (DEEP[1] - MID[1]) * depth;
          b = MID[2] + (DEEP[2] - MID[2]) * depth;
          if (d > -2.2) {                            // shallows go turquoise
            const t = 1 + d / 2.2;
            r += (SHAL[0] - r) * t; g += (SHAL[1] - g) * t; b += (SHAL[2] - b) * t;
          }
          /* long directional swell + fine chop */
          const swell = nf(tx0 * 1.1 + ty0 * 0.55, ty0 * 6.5) - 0.5;
          const chop = fine * 0.6;
          r += swell * 7 + chop * 6; g += swell * 9 + chop * 7; b += swell * 11 + chop * 8;
          if (d > -0.45 && fine > -0.15) {           // broken foam line
            const t = (1 + d / 0.45) * 0.8;
            r += (FOAM[0] - r) * t; g += (FOAM[1] - g) * t; b += (FOAM[2] - b) * t;
          }
        } else {
          if (d < 1.0) {                             // wet sand fringing every shore
            const k = d / 1.0;
            r = SANDWET[0] + (SAND1[0] - SANDWET[0]) * k;
            g = SANDWET[1] + (SAND1[1] - SANDWET[1]) * k;
            b = SANDWET[2] + (SAND1[2] - SANDWET[2]) * k;
          } else {
            /* blended biomes: start from mottled grass, layer the others in */
            const k = mott > 0.14 ? 1 : 0;
            r = GRASS1[0] + (GRASS2[0] - GRASS1[0]) * k;
            g = GRASS1[1] + (GRASS2[1] - GRASS1[1]) * k;
            b = GRASS1[2] + (GRASS2[2] - GRASS1[2]) * k;
            if (mott < -0.22) { r = SCRUB[0]; g = SCRUB[1]; b = SCRUB[2]; }
            const dr2 = sm01((fieldAt(dirtF, wxT, wyT) - 0.22 + fine * 0.18) / 0.42);
            if (dr2 > 0) { r += (DIRT1[0]-r)*dr2; g += (DIRT1[1]-g)*dr2; b += (DIRT1[2]-b)*dr2; }
            const sd2 = sm01((fieldAt(sandF, wxT, wyT) - 0.24 + mott * 0.2) / 0.42);
            if (sd2 > 0) { r += (SAND1[0]-r)*sd2; g += (SAND1[1]-g)*sd2; b += (SAND1[2]-b)*sd2; }
            const fo2 = sm01((fieldAt(forF, wxT, wyT) - 0.20 + fine * 0.15) / 0.45);
            if (fo2 > 0) { r += (FLOOR[0]-r)*fo2; g += (FLOOR[1]-g)*fo2; b += (FLOOR[2]-b)*fo2; }
            const rk2 = sm01((fieldAt(rockF, wxT, wyT) - 0.20 + fine * 0.24) / 0.40);
            if (rk2 > 0) {
              const rc = fine > 0.10 ? ROCK2 : ROCK1;
              r += (rc[0]-r)*rk2; g += (rc[1]-g)*rk2; b += (rc[2]-b)*rk2;
              if (rk2 > 0.5 && fine > 0.2) { r -= 22; g -= 22; b -= 20; }  // crag shadows
            }
            if (ARID) {
              /* dune fields: long crests running with the prevailing wind,
                 with darker gravel exposed in the troughs between them */
              const band = Math.sin((tx0 * 0.62 + ty0 * 0.31) +
                                    (nm(tx0 * 0.9, ty0 * 0.9) - 0.5) * 3.4);
              const crest = sm01(band * 0.5 + 0.5);
              r += (SAND1[0] - r) * crest * 0.34;
              g += (SAND1[1] - g) * crest * 0.34;
              b += (SAND1[2] - b) * crest * 0.34;
              const trough = sm01(-band * 0.5 + 0.5) * (0.5 + mott);
              r += (REG[0] - r) * trough * 0.30;
              g += (REG[1] - g) * trough * 0.30;
              b += (REG[2] - b) * trough * 0.30;
              /* wind ripples across the crests */
              const rip = Math.sin(tx0 * 7.3 - ty0 * 4.1 + fine * 6.0) * 0.5 + 0.5;
              const k2 = rip * crest * 7;
              r += k2; g += k2 * 0.92; b += k2 * 0.78;
            }
            /* marsh and sabkha: the salt flats read almost white in sunlight */
            const ma2 = sm01((fieldAt(marF, wxT, wyT) - 0.22 + fine * 0.16) / 0.42);
            if (ma2 > 0) {
              const mc = ARID ? SABKHA : (mott > 0 ? MARSH1 : MARSH2);
              r += (mc[0]-r)*ma2; g += (mc[1]-g)*ma2; b += (mc[2]-b)*ma2;
              if (ARID && fine > 0.16) { r += 12; g += 12; b += 11; }   // crusted polygons
            }
            /* roads: a narrow graded track with a lighter disturbed shoulder.
               The threshold is high and the falloff tight so a one-tile road
               stays a one-tile road instead of smearing into a highway. */
            const rdRaw = fieldAt(roadF, wxT, wyT);
            const rd3 = sm01((rdRaw - 0.42 + fine * 0.06) / 0.22);
            if (rd3 > 0) {
              const shoulder = sm01((rdRaw - 0.16) / 0.30) - rd3;
              if (shoulder > 0) {
                r += (TRACK_EDGE[0]-r)*shoulder*0.55;
                g += (TRACK_EDGE[1]-g)*shoulder*0.55;
                b += (TRACK_EDGE[2]-b)*shoulder*0.55;
              }
              r += (TRACK[0]-r)*rd3; g += (TRACK[1]-g)*rd3; b += (TRACK[2]-b)*rd3;
              /* wheel ruts, very slight */
              const rut = Math.sin((tx0 + ty0) * 19.0) * 0.5 + 0.5;
              const kr = rut * rd3 * (ARID ? 2.5 : 5);
              r -= kr; g -= kr; b -= kr * 0.8;
            }

            /* built-up ground: concrete and rooftops, blocky rather than organic */
            const ub2 = sm01((fieldAt(urbF, wxT, wyT) - 0.18 + fine * 0.10) / 0.40);
            if (ub2 > 0) {
              /* irregular blocks of differing roof tone rather than a grid */
              const bx = Math.floor(tx0 * 2.6 + nm(tx0 * 0.7, ty0 * 0.7) * 1.6);
              const by = Math.floor(ty0 * 2.6 + n1(tx0 * 0.7, ty0 * 0.7) * 1.6);
              const h = ((bx * 73856093) ^ (by * 19349663)) >>> 0;
              const shade = ((h % 100) / 100 - 0.5) * 26;
              const uc = (h % 7) < 3 ? URBAN2 : URBAN1;
              r += (uc[0]+shade-r)*ub2; g += (uc[1]+shade-g)*ub2; b += (uc[2]+shade-b)*ub2;
              /* narrow streets between the blocks */
              const sx = Math.abs((tx0 * 2.6) % 1 - 0.5), sy = Math.abs((ty0 * 2.6) % 1 - 0.5);
              if (ub2 > 0.35 && (sx > 0.44 || sy > 0.44)) {
                r -= 18 * ub2; g -= 17 * ub2; b -= 16 * ub2;
              }
            }
            if (d < 2.4) { const q = 1 - (d - 1) / 1.4; r += (SAND1[0]-r)*q*0.4; g += (SAND1[1]-g)*q*0.4; b += (SAND1[2]-b)*q*0.4; }
          }
          /* organic mottle + fine grain so surfaces read as ground, not paint */
          const grain = (nf(tx0 * 47 + 917, ty0 * 47) - 0.5) * 14;
          const mo = mott * 20 + fine * 12 + grain;
          const e0 = elevAt2(tx0, ty0);
          const gx = elevAt2(tx0 + 0.45, ty0) - elevAt2(tx0 - 0.45, ty0);
          const gy = elevAt2(tx0, ty0 + 0.45) - elevAt2(tx0, ty0 - 0.45);
          const shadeF = Math.max(0.55, Math.min(1.42, 1 - (gx + gy) * 1.25));
          r = (r + mo + e0 * 7) * shadeF; g = (g + mo + e0 * 7) * shadeF; b = (b + mo + e0 * 6) * shadeF;
        }
        const o = (y * TW + x) * 4;
        px[o] = r; px[o + 1] = g; px[o + 2] = b; px[o + 3] = 255;
      }
    }
    wc.putImageData(img, 0, 0);

    /* ---- roads: smooth asphalt strokes between adjacent road tiles ---- */
    wc.lineCap = "round";
    const road = (x1, y1, x2, y2, wd, col) => {
      wc.strokeStyle = col; wc.lineWidth = wd;
      wc.beginPath();
      wc.moveTo((x1 + 0.5) * PPT, (y1 + 0.5) * PPT);
      wc.lineTo((x2 + 0.5) * PPT, (y2 + 0.5) * PPT);
      wc.stroke();
    };
    /* A metalled road in a temperate theatre is dark asphalt. A desert supply
       route is nothing of the sort - it is graded, compacted ground, and from
       the air it reads as a PALE scar against the sand, not a black stripe. */
    for (let pass = 0; pass < 2; pass++) {
      const wd = pass === 0 ? PPT * (ARID ? 0.62 : 0.72) : PPT * (ARID ? 0.40 : 0.5);
      const col = ARID
        ? (pass === 0 ? "rgba(178,162,128,0.34)" : "rgba(203,188,151,0.42)")
        : (pass === 0 ? "rgba(46,46,42,0.9)" : "rgba(74,74,70,0.95)");
      for (let y2 = 0; y2 < H0; y2++) for (let x2 = 0; x2 < W0; x2++) {
        if (G.map.terrain[y2 * W0 + x2] !== 6) continue;
        for (const [dx, dy] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
          const nx3 = x2 + dx, ny3 = y2 + dy;
          if (nx3 < 0 || ny3 < 0 || nx3 >= W0 || ny3 >= H0) continue;
          if (G.map.terrain[ny3 * W0 + nx3] === 6) road(x2, y2, nx3, ny3, wd, col);
        }
      }
    }

    /* ---- forests: stippled canopy texture, irregular edges, NW-lit crowns ---- */
    const hsh = (a, b2) => { let h = (a * 73856093) ^ (b2 * 19349663); h = (h ^ (h >> 13)) >>> 0; return (h % 1000) / 1000; };
    for (let y3 = 0; y3 < H0; y3++) for (let x3 = 0; x3 < W0; x3++) {
      if (G.map.terrain[y3 * W0 + x3] !== 5) continue;
      /* one soft canopy shadow mass per tile, offset SE */
      wc.fillStyle = "rgba(14,20,11,0.5)";
      wc.beginPath();
      wc.ellipse((x3 + 0.62) * PPT, (y3 + 0.66) * PPT, PPT * 0.58, PPT * 0.5, 0, 0, 7);
      wc.fill();
      /* many small crowns: dark base dab + lit top dab, jittered */
      const n = 9 + (hsh(x3, y3) * 5 | 0);
      for (let k = 0; k < n; k++) {
        const jx = (x3 + 0.08 + hsh(x3 * 7 + k, y3 * 3) * 0.84) * PPT;
        const jy = (y3 + 0.08 + hsh(x3 * 3, y3 * 7 + k) * 0.84) * PPT;
        const rr = PPT * (0.10 + hsh(x3 + k, y3 - k) * 0.13);
        const tone = hsh(x3 * 11 + k, y3 * 13 + k);
        wc.fillStyle = tone < 0.4 ? "#2a4020" : tone < 0.75 ? "#33502a" : "#3e5c30";
        wc.beginPath(); wc.arc(jx, jy, rr, 0, 7); wc.fill();
        wc.fillStyle = "rgba(112,140,80,0.5)";
        wc.beginPath(); wc.arc(jx - rr * 0.35, jy - rr * 0.35, rr * 0.45, 0, 7); wc.fill();
      }
    }
    /* ---- oil survey markers: high-contrast, visible from RTS altitude ---- */
    for (const n of G.map.oilNodes) {
      const cx = (n.x + 0.5) * PPT, cy = (n.y + 0.5) * PPT;
      /* dark seep pool */
      wc.fillStyle = "rgba(10,8,5,0.85)";
      wc.beginPath(); wc.ellipse(cx, cy, PPT * 1.05, PPT * 0.8, 0.4, 0, 7); wc.fill();
      /* amber survey ring */
      wc.strokeStyle = "#e8b93c"; wc.lineWidth = PPT * 0.14;
      wc.beginPath(); wc.arc(cx, cy, PPT * 1.35, 0, 7); wc.stroke();
      wc.strokeStyle = "rgba(232,185,60,0.45)"; wc.lineWidth = PPT * 0.08;
      wc.beginPath(); wc.arc(cx, cy, PPT * 1.8, 0, 7); wc.stroke();
      /* barrel dots + label */
      wc.fillStyle = "#c9a03a";
      wc.beginPath(); wc.arc(cx - PPT * 0.5, cy - PPT * 0.45, PPT * 0.16, 0, 7); wc.fill();
      wc.beginPath(); wc.arc(cx - PPT * 0.2, cy - PPT * 0.55, PPT * 0.16, 0, 7); wc.fill();
      wc.font = "bold " + Math.round(PPT * 0.62) + "px sans-serif";
      wc.textAlign = "center";
      wc.fillStyle = "#f2d478";
      wc.fillText("OIL", cx, cy + PPT * 0.22);
    }
    G._worldTex = worldTex;
  }

  function buildOreTexture() {
    const map = G.map, W0 = map.W, H0 = map.H;
    if (!oreTex) {
      oreTex = document.createElement("canvas");
      oreTex.width = W0 * PPT; oreTex.height = H0 * PPT;
    }
    const oc = oreTex.getContext("2d");
    oc.clearRect(0, 0, oreTex.width, oreTex.height);
    const hsh = (a, b2) => { let h = (a * 2654435761) ^ (b2 * 40503); h = (h ^ (h >> 11)) >>> 0; return (h % 1000) / 1000; };
    for (let y = 0; y < H0; y++) for (let x = 0; x < W0; x++) {
      const v = map.ore[y * W0 + x];
      if (v < 15) continue;
      const f = Math.min(1, v / 500);
      /* exposed mineral seam: ochre ground stain + angular striations + sparse glints */
      oc.fillStyle = "rgba(122,96,48," + (0.25 + f * 0.3) + ")";
      oc.beginPath();
      oc.ellipse((x + 0.5) * PPT, (y + 0.5) * PPT, PPT * 0.62, PPT * 0.5,
                 hsh(x, y) * 3.14, 0, 7);
      oc.fill();
      const n = 3 + f * 5;
      for (let k = 0; k < n; k++) {
        const cx = (x + 0.12 + hsh(x * 7 + k, y) * 0.76) * PPT;
        const cy = (y + 0.12 + hsh(x, y * 9 + k) * 0.76) * PPT;
        const ln = PPT * (0.14 + hsh(x + k, y - k) * 0.2) * (0.5 + f * 0.7);
        const an = hsh(x * 3 + k, y * 5) * 3.14;
        oc.strokeStyle = k % 3 === 0 ? "rgba(196,158,84,0.85)" : "rgba(142,110,56,0.8)";
        oc.lineWidth = 1.6 + f;
        oc.beginPath();
        oc.moveTo(cx - Math.cos(an) * ln, cy - Math.sin(an) * ln);
        oc.lineTo(cx + Math.cos(an) * ln, cy + Math.sin(an) * ln);
        oc.stroke();
        if (k % 5 === 0 && f > 0.4) {
          oc.fillStyle = "rgba(238,214,150,0.9)";
          oc.fillRect(cx - 0.8, cy - 0.8, 1.6, 1.6);
        }
      }
    }
  }

  function renderTerrain() {
    const map = G.map, TL = CFG.TILE;
    const wpx = (map.W + map.H) * TL * SQ2;
    const hpx = (map.W + map.H) * TL * SQ2 * ISO + 60;
    if (!terrainCache) {
      terrainCache = document.createElement("canvas");
      terrainCache.width = Math.ceil(wpx); terrainCache.height = Math.ceil(hpx);
    }
    if (!worldTex) buildWorldTexture();
    buildOreTexture();

    const tc = terrainCache.getContext("2d");
    const ox = map.H * TL * SQ2;
    tc.setTransform(1, 0, 0, 1, 0, 0);
    tc.fillStyle = "#0a0f14";
    tc.fillRect(0, 0, terrainCache.width, terrainCache.height);
    /* project the top-down textures into iso space */
    tc.setTransform(SQ2, SQ2 * ISO, -SQ2, SQ2 * ISO, ox, 20);
    tc.imageSmoothingEnabled = true;
    tc.imageSmoothingQuality = "high";
    tc.drawImage(worldTex, 0, 0, worldTex.width, worldTex.height, 0, 0, map.W * TL, map.H * TL);
    tc.drawImage(oreTex, 0, 0, oreTex.width, oreTex.height, 0, 0, map.W * TL, map.H * TL);
    tc.setTransform(1, 0, 0, 1, 0, 0);

    /* oil node markers */
    for (const n of G.map.oilNodes) {
      const wx = (n.x + 0.5) * TL, wy = (n.y + 0.5) * TL;
      const cx = ox + isoX(wx, wy), cy = isoY(wx, wy, 0) + 20;
      tc.fillStyle = "rgba(12,10,6,0.75)";
      tc.beginPath(); tc.ellipse(cx, cy, 10, 5.5, 0, 0, 7); tc.fill();
      tc.strokeStyle = "#8a6f34"; tc.lineWidth = 1;
      tc.beginPath(); tc.ellipse(cx, cy, 10, 5.5, 0, 0, 7); tc.stroke();
      tc.fillStyle = "#c9a03a"; tc.font = "7px sans-serif"; tc.textAlign = "center";
      tc.fillText("OIL", cx, cy + 2);
    }
    terrainDirty = false; mmBaseDirty = true;
    G._terrainOx = ox;
  }
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
    return "rgb(" + U.clamp(r, 0, 255) + "," + U.clamp(g, 0, 255) + "," + U.clamp(b, 0, 255) + ")";
  }

  /* ---------------- main draw ---------------- */
  /* ---- THE THIRD ALERT RUNG ----
     threat.js grades an alert in three rungs that "differ in KIND and not
     merely in volume": the unit rung is a cue and nothing else, the base rung
     adds an amber edge flash and a banner naming the structure, and the loss
     rung is the red one with the shake. Only the first of the three survived
     in this renderer - Threat.flash, Threat.banner and Threat.shake were read
     by render3d.js and by nothing else - so a 2D commander heard two klaxons
     that differed only in pitch and never saw which had just happened. The
     same three fields are read below in this renderer's own idiom; nothing is
     imported from the 3D path.

     THE SHAKE OFFSETS THE PAINT, NOT THE CAMERA. cam.ix/cam.iy and unproject()
     are what ui.js turns a click into a tile with, and drawOverlay() calls
     unproject() to place a building ghost, so shaking those would move the
     ground out from under a structure the player is siting. The world layer is
     translated and the HUD layer is not, which is the same division the 3D
     path gets for free by shaking its camera under a screen-space overlay. */
  let oreRedrawT = 0;
  let shakeT = 0, shX = 0, shY = 0;
  function updateShake(dt) {
    shX = shY = 0;
    if (typeof Threat === "undefined") return;
    const k = Threat.shake;
    if (!(k > 0.001)) return;
    shakeT += dt * 34;
    const amp = k * k * 9;                       // pixels: about nine at full
    shX = Math.sin(shakeT * 1.7) * amp;
    shY = Math.cos(shakeT * 1.3) * amp * 0.6;
  }
  function draw(dt, input) {
    if (terrainDirty) renderTerrain();
    oreRedrawT += dt;
    if (oreRedrawT > 6) { oreRedrawT = 0; renderTerrain(); }   // ore visuals refresh

    ctx.fillStyle = "#07090c";
    ctx.fillRect(0, 0, W, H);

    updateShake(dt);
    ctx.save();
    if (shX || shY) ctx.translate(shX, shY);

    /* terrain blit */
    const ox = G._terrainOx;
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.scale(cam.z, cam.z);
    ctx.translate(-cam.ix - ox, -cam.iy - 20);
    ctx.drawImage(terrainCache, 0, 0);
    ctx.restore();

    /* collect drawables, painter's order by iso depth */
    const items = [];
    for (const e of G.entities) {
      if (e.dead || e.carried) continue;
      if (!visible(e)) continue;
      items.push(e);
    }
    for (const fx of Combat.effects) if (fx.t === "wreck") items.push({ wreck: fx, x: fx.x, y: fx.y, layer: "ground" });
    items.sort((a, b) => (a.x + a.y) - (b.x + b.y) + ((a.layer === "air") - (b.layer === "air")) * 1e6);

    for (const it of items) {
      if (it.wreck) drawWreck(it.wreck);
      else if (it.kind === "building") drawBuilding(it);
      else drawUnit(it);
    }

    drawProjectiles();
    drawEffects();
    drawFog();
    ctx.restore();                               // the shake stops at the HUD

    drawOverlay(input);
    drawThreat();
  }

  /* ---- edge flash and alert banner ---- */
  function threatRGBA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," +
           (n & 255) + "," + a.toFixed(3) + ")";
  }
  function drawThreat() {
    if (typeof Threat === "undefined") return;
    const f = Threat.flash;
    if (f > 0.01) {
      /* a vignette pulsing in from the edges rather than a wash over the map */
      const g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.30,
                                         W / 2, H / 2, Math.max(W, H) * 0.72);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, threatRGBA(Threat.flashColor, f * 0.55));
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      /* a hard rule top and bottom, like a warning panel lighting up */
      ctx.fillStyle = threatRGBA(Threat.flashColor, f * 0.9);
      ctx.fillRect(0, 0, W, 3); ctx.fillRect(0, H - 3, W, 3);
    }
    const b = Threat.banner;
    if (!b) return;
    const big = b.tier >= 3;
    const cx = W / 2, cy = big ? H * 0.20 : H * 0.16;
    ctx.save();
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = (big ? "700 30px " : "700 21px ") +
               "ui-monospace, SFMono-Regular, Menlo, monospace";
    const wTxt = ctx.measureText(b.text).width;
    const padX = 26, hBox = big ? 62 : 46;
    ctx.fillStyle = "rgba(8,10,12,0.82)";
    ctx.fillRect(cx - wTxt / 2 - padX, cy - hBox / 2, wTxt + padX * 2, hBox);
    ctx.strokeStyle = big ? "#ff4020" : "#ffa02c";
    ctx.lineWidth = big ? 2.5 : 1.5;
    ctx.strokeRect(cx - wTxt / 2 - padX, cy - hBox / 2, wTxt + padX * 2, hBox);
    /* hazard stripes down each side of a strategic warning */
    if (big) {
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = i % 2 ? "#ff4020" : "#1a1c1e";
        ctx.fillRect(cx - wTxt / 2 - padX + 4, cy - hBox / 2 + 5 + i * 9, 7, 8);
        ctx.fillRect(cx + wTxt / 2 + padX - 11, cy - hBox / 2 + 5 + i * 9, 7, 8);
      }
    }
    ctx.fillStyle = big ? "#ff6a4a" : "#ffbf62";
    ctx.fillText(b.text, cx, cy - (b.sub ? 9 : 0));
    if (b.sub) {
      ctx.font = "500 12px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = "#c9cdd2";
      ctx.fillText(b.sub, cx, cy + 14);
    }
    ctx.restore();
  }

  function visible(e) {
    if (!G.fogEnabled || e.owner === G.human) return true;
    /* Sonar contact alone DRAWS a submerged boat; the fog test is not applied
       to it. Detection and drawing used to disagree - the guns fired on a boat
       held by a sensor with no eyes on that water while the screen showed
       empty sea, which is already true today of the Coastal Sonar Array at
       sonar 11 and sight 5 - and an acoustic node has no sight radius at all,
       so every single barrier contact would have been invisible. Nodes are
       deliberately NOT given sight instead: recomputeFog reveals GROUND to
       whatever it is handed, which would give the player surface contacts and
       terrain that a hydrophone cannot possibly provide.
       A submarine's OWN sonar is the one set that does hand over a surface
       hull, because that is how a boat whose eyes are a periscope finds its
       targets - and even then only the hull: G.seaHolds (game.js) lights the
       one tile it sits on, never the water, the sky or the ground round it. */
    if (e.layer === "sub") return G.canSeeSub(G.human, e);
    const f = G.fog[e.ty * G.map.W + e.tx];
    if (e.kind === "building") return f >= 1;        // structures stay on map once seen
    return f === 2;
  }

  function elevOf(e) {
    return e.layer === "air" ? 0 : GameMap.elevAt(G.map, e.tx, e.ty);
  }

  /* ============ unit drawing ============ */
  function drawUnit(u) {
    const e = elevOf(u);
    const X = sx(u.x, u.y), Y = sy(u.x, u.y, e);
    const z = cam.z;
    const alt = u.layer === "air" ? 34 * z : 0;
    const col = u.owner.color;

    /* shadow */
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.ellipse(X, Y + 2 * z, u.r * 0.9 * z, u.r * 0.45 * z, 0, 0, 7);
    ctx.fill();

    ctx.save();
    ctx.translate(X, Y - alt);

    if (u.layer === "sub") ctx.globalAlpha = u.owner === G.human ? 0.55 : 0.8;

    const s = z;
    const spr = Sprites.get(u.def, col);
    if (spr) drawSprite(u, spr, s, col);
    else if (u.cat === "infantry") drawInfantry(u, s, col);
    else if (u.layer === "sea" || u.layer === "sub") drawShip(u, s, col);
    else if (u.layer === "air") drawAircraft(u, s, col);
    else drawVehicle(u, s, col);
    ctx.restore();

    /* a damaged vehicle, aircraft or ship smokes where it burns (js/damage3d.js) */
    if (typeof Damage3D !== "undefined") Damage3D.draw2D(ctx, u, X, Y - alt, z, G, sx, sy);
    drawUnitUI(u, X, Y - alt, z);
  }

  /* draw a rasterised sprite: iso-squash the ground plane, rotate by the
     world heading inside it, blit hull then rotating mount               */
  const SPR_SCALE = 1.22;             // visual-only upscale for readability
  function drawSprite(u, spr, s0, col) {
    const s = s0 * SPR_SCALE;
    /* infantry: billboarded upright, not ground-projected */
    if (u.cat === "infantry") {
      const bob = u.moving ? Math.sin(G.time * 14 + u.id) * 1.2 : 0;
      ctx.save();
      ctx.scale(s, s);
      ctx.drawImage(spr.hull.cv, -spr.hull.w / 2, -spr.hull.h / 2 - 4 + bob, spr.hull.w, spr.hull.h);
      ctx.restore();
      if (u.suppress > 50) {
        ctx.fillStyle = "#ffcf4d"; ctx.font = Math.round(8 * s) + "px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("!", 0, -16 * s);
      }
      return;
    }
    const wake = u.moving && u.layer === "sea";
    if (wake) {
      const a = isoAngle(u.ang);
      ctx.strokeStyle = "rgba(220,240,255,0.25)";
      ctx.lineWidth = 1.5 * s;
      ctx.beginPath();
      ctx.moveTo(-Math.cos(a) * spr.l * 0.45 * s, -Math.sin(a) * spr.l * 0.28 * s);
      ctx.lineTo(-Math.cos(a) * spr.l * 0.8 * s, -Math.sin(a) * spr.l * 0.5 * s);
      ctx.stroke();
    }
    ctx.save();
    ctx.scale(s, s * ISO);
    ctx.rotate(u.ang);
    const bob = u.cat === "infantry" && u.moving ? Math.sin(G.time * 14 + u.id) * 1.2 : 0;
    ctx.drawImage(spr.hull.cv, -spr.hull.w / 2, -spr.hull.h / 2 + bob, spr.hull.w, spr.hull.h);
    ctx.restore();
    if (spr.turret) {
      ctx.save();
      ctx.scale(s, s * ISO);
      const px = Math.cos(u.ang) * spr.tx, py = Math.sin(u.ang) * spr.tx;
      ctx.translate(px, py);
      ctx.rotate(u.tang);
      ctx.drawImage(spr.turret.cv, -spr.turret.ax, -spr.turret.ay, spr.turret.w, spr.turret.h);
      ctx.restore();
    }
    if (spr.rotor) {
      /* animated main rotor for helicopters */
      ctx.save();
      ctx.scale(s, s * ISO);
      ctx.rotate(u.ang);
      ctx.translate(spr.rotor.x, 0);
      ctx.fillStyle = "rgba(160,170,180,0.10)";
      ctx.beginPath(); ctx.arc(0, 0, spr.rotor.r, 0, 7); ctx.fill();
      ctx.rotate((G.time * 32 + u.id) % 6.283);
      ctx.strokeStyle = "rgba(200,208,215,0.65)";
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(-spr.rotor.r, 0); ctx.lineTo(spr.rotor.r, 0);
      ctx.moveTo(0, -spr.rotor.r); ctx.lineTo(0, spr.rotor.r);
      ctx.stroke();
      ctx.restore();
    }
    /* jet exhaust flicker */
    if (u.def.jet && u.moving) {
      ctx.save();
      ctx.scale(s, s * ISO);
      ctx.rotate(u.ang);
      ctx.fillStyle = "rgba(255,190,80," + (0.35 + 0.3 * Math.sin(G.time * 40)) + ")";
      ctx.fillRect(-spr.l / 2 - 4, -1.6, 5, 3.2);
      ctx.restore();
    }
    /* infantry suppression marker */
    if (u.cat === "infantry" && u.suppress > 50) {
      ctx.fillStyle = "#ffcf4d"; ctx.font = Math.round(8 * s) + "px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("!", 0, -16 * s);
    }
  }

  /* rotate a world-space heading into iso screen space */
  function isoAngle(a) {
    const dx = Math.cos(a), dy = Math.sin(a);
    return Math.atan2((dx + dy) * ISO, (dx - dy));
  }

  function drawInfantry(u, s, col) {
    const bob = u.moving ? Math.sin(G.time * 14 + u.id) * 1.2 : 0;
    ctx.save();
    ctx.scale(s, s);
    /* body */
    ctx.fillStyle = col.dark;
    ctx.fillRect(-2, -7 + bob, 4, 6);
    /* head */
    ctx.fillStyle = "#c9b18a";
    ctx.beginPath(); ctx.arc(0, -9 + bob, 2.1, 0, 7); ctx.fill();
    /* helmet */
    ctx.fillStyle = col.main;
    ctx.beginPath(); ctx.arc(0, -9.6 + bob, 2.1, Math.PI, 0); ctx.fill();
    /* weapon line */
    const a = isoAngle(u.ang);
    ctx.strokeStyle = "#222"; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(0, -5 + bob);
    ctx.lineTo(Math.cos(a) * 6, -5 + bob + Math.sin(a) * 3); ctx.stroke();
    /* suppression marker */
    if (u.suppress > 50) {
      ctx.fillStyle = "#ffcf4d"; ctx.font = "7px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("!", 0, -14);
    }
    ctx.restore();
  }

  function drawVehicle(u, s, col) {
    const a = isoAngle(u.ang);
    const L = u.r * 1.5, Wd = u.r * 0.95;
    ctx.save();
    ctx.scale(s, s * ISO);
    ctx.rotate(a);
    /* tracks/wheels */
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(-L / 2 - 1, -Wd / 2 - 2, L + 2, 3);
    ctx.fillRect(-L / 2 - 1, Wd / 2 - 1, L + 2, 3);
    /* hull */
    const g = ctx.createLinearGradient(0, -Wd / 2, 0, Wd / 2);
    g.addColorStop(0, shade2(col.main, 18)); g.addColorStop(1, shade2(col.main, -26));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(L / 2, 0); ctx.lineTo(L / 2 - 4, -Wd / 2); ctx.lineTo(-L / 2, -Wd / 2);
    ctx.lineTo(-L / 2, Wd / 2); ctx.lineTo(L / 2 - 4, Wd / 2);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.5)"; ctx.lineWidth = 0.8; ctx.stroke();
    ctx.restore();

    /* superstructure / turret drawn upright for readability */
    ctx.save();
    ctx.scale(s, s);
    if (u.def.harvester) {
      ctx.fillStyle = shade2(col.main, -10);
      ctx.fillRect(-5, -8, 10, 6);
      if (u.load > 50) { ctx.fillStyle = "#d8b44a"; ctx.fillRect(-4, -7, 8 * Math.min(1, u.load / CFG.HARVEST_LOAD), 2); }
    } else if (u.def.supply) {
      ctx.fillStyle = shade2(col.main, -14); ctx.fillRect(-6, -9, 12, 6);
      ctx.fillStyle = "#7a6f52"; ctx.fillRect(-5, -8, 4, 4); ctx.fillRect(0, -8, 4, 4);
    } else if (u.def.turret) {
      const ta = isoAngle(u.tang);
      ctx.rotate(0);
      /* turret base */
      ctx.fillStyle = shade2(col.main, 8);
      ctx.beginPath(); ctx.ellipse(0, -4, 5.5, 3.6, 0, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.4)"; ctx.stroke();
      /* barrel */
      ctx.strokeStyle = "#26292b"; ctx.lineWidth = u.def.role === "mbt" || u.def.role === "heavy" ? 2.2 : 1.5;
      const bl = u.r * 1.35;
      ctx.beginPath(); ctx.moveTo(0, -4);
      ctx.lineTo(Math.cos(ta) * bl, -4 + Math.sin(ta) * bl * 0.62); ctx.stroke();
      if (u.def.role === "mlrs" || u.def.role === "spg") {
        ctx.fillStyle = "#2e3133";
        ctx.save(); ctx.translate(0, -5); ctx.rotate(ta * 0.5); ctx.fillRect(-3, -3, 9, 6); ctx.restore();
      }
    } else if (u.def.deployTo) {
      ctx.fillStyle = shade2(col.main, -5); ctx.fillRect(-7, -10, 14, 8);
      ctx.fillStyle = col.light; ctx.fillRect(-2, -12, 4, 3);
    }
    ctx.restore();
  }

  function drawShip(u, s, col) {
    const a = isoAngle(u.ang);
    const L = u.r * 2.1, Wd = u.r * 0.75;
    /* wake */
    if (u.moving && u.layer === "sea") {
      ctx.strokeStyle = "rgba(220,240,255,0.25)"; ctx.lineWidth = 1.5 * s;
      ctx.beginPath();
      ctx.moveTo(-Math.cos(a) * L * 0.6 * s, -Math.sin(a) * L * 0.35 * s);
      ctx.lineTo(-Math.cos(a) * L * 1.3 * s, -Math.sin(a) * L * 0.75 * s);
      ctx.stroke();
    }
    ctx.save();
    ctx.scale(s, s * ISO);
    ctx.rotate(a);
    const g = ctx.createLinearGradient(0, -Wd, 0, Wd);
    g.addColorStop(0, "#8a8f94"); g.addColorStop(1, "#3f4449");
    ctx.fillStyle = u.layer === "sub" ? "#2f3b40" : g;
    ctx.beginPath();
    ctx.moveTo(L / 2 + 4, 0); ctx.lineTo(L / 4, -Wd / 2); ctx.lineTo(-L / 2, -Wd / 2 + 1);
    ctx.lineTo(-L / 2 - 2, 0); ctx.lineTo(-L / 2, Wd / 2 - 1); ctx.lineTo(L / 4, Wd / 2);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.5)"; ctx.lineWidth = 0.8; ctx.stroke();
    /* deck stripe in team colour */
    ctx.fillStyle = col.main;
    ctx.fillRect(-L / 2 + 2, -1.4, L * 0.8, 2.8);
    ctx.restore();

    ctx.save();
    ctx.scale(s, s);
    if (u.def.carrier) {
      /* flight deck */
      ctx.fillStyle = "#4c5157";
      ctx.save(); ctx.scale(1, ISO); ctx.rotate(a); ctx.fillRect(-L / 2, -Wd / 2 - 2, L, Wd + 4); ctx.restore();
      ctx.fillStyle = "#6d7681"; ctx.fillRect(2, -8, 6, 5);   // island
    } else if (u.layer !== "sub") {
      ctx.fillStyle = "#5b6167"; ctx.fillRect(-4, -8, 8, 6);
      if (u.def.turret) {
        const ta = isoAngle(u.tang);
        ctx.strokeStyle = "#23262a"; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo(0, -5);
        ctx.lineTo(Math.cos(ta) * u.r * 1.1, -5 + Math.sin(ta) * u.r * 0.7); ctx.stroke();
      }
    } else {
      /* sub sail */
      ctx.fillStyle = "#24303a"; ctx.fillRect(-2.5, -6, 5, 5);
    }
    ctx.restore();
  }

  function drawAircraft(u, s, col) {
    const a = isoAngle(u.ang);
    ctx.save();
    ctx.scale(s, s);
    ctx.rotate(a);
    if (u.def.jet) {
      ctx.fillStyle = shade2(col.main, -6);
      ctx.beginPath();
      ctx.moveTo(11, 0); ctx.lineTo(-2, -7); ctx.lineTo(-5, -2); ctx.lineTo(-8, -5);
      ctx.lineTo(-8, 5); ctx.lineTo(-5, 2); ctx.lineTo(-2, 7);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.5)"; ctx.lineWidth = 0.8; ctx.stroke();
      /* afterburner flicker */
      if (u.moving) { ctx.fillStyle = "rgba(255,190,80," + (0.4 + 0.3 * Math.sin(G.time * 40)) + ")"; ctx.fillRect(-10, -1.4, 3.5, 2.8); }
    } else {
      /* helicopter */
      ctx.fillStyle = shade2(col.main, -4);
      ctx.beginPath();
      ctx.ellipse(0, 0, 8, 3.2, 0, 0, 7); ctx.fill();
      ctx.fillRect(-11, -1, 8, 2);            // tail boom
      ctx.strokeStyle = "rgba(0,0,0,0.5)"; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.ellipse(0, 0, 8, 3.2, 0, 0, 7); ctx.stroke();
      /* rotor */
      ctx.save(); ctx.rotate(G.time * 30 % 6.28);
      ctx.strokeStyle = "rgba(190,200,210,0.55)"; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(-11, 0); ctx.lineTo(11, 0);
      ctx.moveTo(0, -11); ctx.lineTo(0, 11); ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }

  function drawWreck(fx) {
    /* A wreck is drawn once the player has seen it - at the kill, or coming
       upon it later - and then stays, like a remembered structure. The 3D
       view keeps a hulk only for a kill it drew; here a tank killed where
       nothing of the player's was looking lay on the map as a dark block
       through the translucent wash over explored ground. */
    if (!fx._seen2) { if (!seenNow(fx.x, fx.y)) return; fx._seen2 = true; }
    const X = sx(fx.x, fx.y), Y = sy(fx.x, fx.y, GameMap.elevAt(G.map, (fx.x / 32) | 0, (fx.y / 32) | 0));
    const s = cam.z, f = fx.life / fx.max;
    ctx.save();
    ctx.translate(X, Y); ctx.globalAlpha = Math.min(1, f * 2);
    ctx.scale(s, s * ISO); ctx.rotate(isoAngle(fx.ang));
    ctx.fillStyle = "#26221d";
    ctx.fillRect(-fx.r * 0.7, -fx.r * 0.45, fx.r * 1.4, fx.r * 0.9);
    ctx.restore();
    /* Burning, then smouldering - the stages the 3D hulk goes through
       (js/impact3d.js): flame and black smoke for 14 s, thin grey smoke to
       32 s. It used to smoke for the first 6 s only. A wreck where the
       player cannot see now keeps its hulk and loses its smoke, which would
       otherwise mark the spot through the translucent fog. */
    const age = fx.max - fx.life;
    if (age < 32 && seenNow(fx.x, fx.y)) {
      const burning = age < 14;
      for (let i = 0; i < 3; i++) {
        const ph = (G.time * 0.35 + i / 3 + fx.x * 0.013) % 1;
        ctx.fillStyle = burning ? "rgba(34,31,29," + (0.5 * (1 - ph)).toFixed(3) + ")"
                                : "rgba(118,112,104," + (0.28 * (1 - ph)).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(X + ph * 10 * s, Y - 8 * s - ph * 34 * s, (3 + ph * 7) * s, 0, 7); ctx.fill();
      }
      if (burning) {
        const fl = 0.75 + 0.25 * Math.sin(G.time * 23 + fx.x);
        ctx.fillStyle = "rgba(255,150,50," + (0.8 * fl).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(X, Y - 5 * s, 2.6 * fl * s, 0, 7); ctx.fill();
        ctx.fillStyle = "rgba(255,232,165," + (0.9 * fl).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(X, Y - 5.5 * s, 1.2 * fl * s, 0, 7); ctx.fill();
      }
    }
  }

  function shade2(col, amt) {
    if (col[0] === "#") return shade(col, amt);
    return col;
  }

  /* ============ buildings ============ */
  function drawBuilding(b) {
    const d = b.def;
    const e = GameMap.elevAt(G.map, b.tx, b.ty);
    const z = cam.z;
    const col = b.owner.color;
    /* footprint corners in world space */
    const x0 = b.tx * CFG.TILE, y0 = b.ty * CFG.TILE;
    const x1 = x0 + d.w * CFG.TILE, y1 = y0 + d.h * CFG.TILE;
    const cN = [sx(x0, y0), sy(x0, y0, e)];
    const cE = [sx(x1, y0), sy(x1, y0, e)];
    const cS = [sx(x1, y1), sy(x1, y1, e)];
    const cW = [sx(x0, y1), sy(x0, y1, e)];
    const hgt = (d.id === "conyard" ? 30 : d.id === "power" ? 26 : d.id === "factory" ? 26 :
                 d.id === "refinery" ? 24 : d.cat === "defense" ? 11 : 21) * z;
    const prog = b.buildProgress;
    const lift = (1 - prog) * 10 * z;

    ctx.save();
    ctx.globalAlpha = prog < 1 ? 0.45 + prog * 0.55 : 1;

    /* cast shadow on the ground, thrown SE by the NW sun */
    const shLen = hgt * 0.85;
    ctx.fillStyle = "rgba(8,11,9,0.34)";
    ctx.beginPath();
    ctx.moveTo(cW[0], cW[1]); ctx.lineTo(cS[0], cS[1]); ctx.lineTo(cE[0], cE[1]);
    ctx.lineTo(cE[0] + shLen * 0.55, cE[1] + shLen * 0.5);
    ctx.lineTo(cS[0] + shLen * 0.55, cS[1] + shLen * 0.62);
    ctx.lineTo(cW[0] + shLen * 0.2, cW[1] + shLen * 0.45);
    ctx.closePath(); ctx.fill();
    /* base slab */
    poly([cN, cE, cS, cW], "#2a2d28", "#15171a");
    /* walls: SE + SW faces - weathered concrete with panel seams */
    const top = p => [p[0], p[1] - hgt * prog + lift * 0];
    poly([cW, cS, top(cS), top(cW)], "#4a4f4b");
    poly([cS, cE, top(cE), top(cS)], "#33373a");
    /* vertical panel seams on both faces */
    ctx.strokeStyle = "rgba(0,0,0,0.22)"; ctx.lineWidth = 1;
    for (let f2 = 0; f2 < 2; f2++) {
      const A = f2 ? cS : cW, B2 = f2 ? cE : cS;
      const nSeg = 3 + b.def.w;
      for (let k2 = 1; k2 < nSeg; k2++) {
        const t2 = k2 / nSeg;
        const px2 = A[0] + (B2[0] - A[0]) * t2, py2 = A[1] + (B2[1] - A[1]) * t2;
        ctx.beginPath(); ctx.moveTo(px2, py2); ctx.lineTo(px2, py2 - hgt * prog + 1); ctx.stroke();
      }
    }
    /* grime along the wall base */
    ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 2 * z;
    ctx.beginPath(); ctx.moveTo(cW[0], cW[1] - 1); ctx.lineTo(cS[0], cS[1] - 1); ctx.lineTo(cE[0], cE[1] - 1); ctx.stroke();
    /* roof */
    poly([top(cN), top(cE), top(cS), top(cW)], "#565b54", "rgba(0,0,0,0.5)");
    /* muted faction band low on the SW wall */
    ctx.save(); ctx.globalAlpha = 0.75;
    ctx.strokeStyle = col.main; ctx.lineWidth = Math.max(1.2, 1.8 * z);
    ctx.beginPath();
    ctx.moveTo(cW[0], cW[1] - hgt * prog * 0.22);
    ctx.lineTo(cS[0], cS[1] - hgt * prog * 0.22);
    ctx.lineTo(cE[0], cE[1] - hgt * prog * 0.22);
    ctx.stroke(); ctx.restore();

    /* structure-specific detail on roof */
    const cx = (cN[0] + cS[0]) / 2, cyR = (cN[1] + cS[1]) / 2 - hgt * prog;
    detail(b, cx, cyR, z, col);

    ctx.restore();

    /* build scaffolding % */
    if (prog < 1) {
      ctx.fillStyle = "#cfe0c8"; ctx.font = Math.round(11 * z) + "px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(Math.round(prog * 100) + "%", cx, cyR - 6);
    }
    drawBuildingUI(b, cx, cyR, z);
  }
  function poly(pts, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
  }
  function detail(b, cx, cy, z, col) {
    const id = b.def.id;
    /* rich painter from the art pack, if present */
    if (BLD_DETAIL[id]) {
      const k = Math.max(1, Math.min(b.def.w, b.def.h) * CFG.TILE / 42);
      ctx.save(); ctx.translate(cx, cy); ctx.scale(z * k, z * k);
      try { BLD_DETAIL[id].draw(ctx, Sprites.pal(col), G.time); } catch (e) {}
      ctx.restore();
      /* rotating defence mount on top */
      const dm = Sprites.getDef("def_" + id, col);
      if (dm && dm.turret) {
        ctx.save(); ctx.translate(cx, cy - 3 * z);
        ctx.scale(z, z * ISO);
        ctx.rotate(b.tang);
        ctx.drawImage(dm.turret.cv, -dm.turret.ax, -dm.turret.ay, dm.turret.w, dm.turret.h);
        ctx.restore();
        if (id === "sam" && !b.powered) {
          ctx.fillStyle = "#ff6b52"; ctx.font = Math.round(8 * z) + "px sans-serif"; ctx.textAlign = "center";
          ctx.fillText("NO PWR", cx, cy - 16 * z);
        }
      }
      return;
    }
    ctx.save(); ctx.translate(cx, cy); ctx.scale(z, z);
    if (id === "power") {
      ctx.fillStyle = "#555c60"; ctx.fillRect(-8, -14, 5, 12); ctx.fillRect(3, -11, 5, 9);
      const p = b.owner.powerRatio();
      ctx.fillStyle = p >= 1 ? "rgba(160,220,255,0.5)" : "rgba(255,120,80,0.5)";
      ctx.beginPath(); ctx.arc(-5.5, -16 - Math.sin(G.time * 3) * 1.5, 2.5, 0, 7); ctx.fill();
    } else if (id === "refinery") {
      ctx.fillStyle = "#6b6f66"; ctx.beginPath(); ctx.arc(-6, -4, 6, 0, 7); ctx.fill();
      ctx.fillStyle = "#d8b44a"; ctx.fillRect(2, -8, 8, 7);
    } else if (id === "barracks") {
      ctx.fillStyle = col.main; ctx.fillRect(-8, -3, 16, 2);
    } else if (id === "factory") {
      ctx.fillStyle = "#4d5258"; ctx.fillRect(-10, -8, 20, 7);
      ctx.fillStyle = "#31363b"; ctx.fillRect(-9, -12, 4, 5); ctx.fillRect(-3, -12, 4, 5); ctx.fillRect(3, -12, 4, 5);
    } else if (id === "navalyard") {
      ctx.strokeStyle = "#7d8894"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(-10, -12); ctx.lineTo(6, -12); ctx.stroke();
    } else if (id === "airbase") {
      ctx.fillStyle = "#3a3f45"; ctx.fillRect(-13, -4, 26, 8);
      ctx.fillStyle = "#c9cf52";
      for (let i = -10; i < 12; i += 6) ctx.fillRect(i, -0.8, 3.5, 1.6);
    } else if (id === "radar") {
      ctx.fillStyle = "#586066"; ctx.fillRect(-2, -10, 4, 9);
      ctx.save(); ctx.translate(0, -11); ctx.rotate(Math.sin(G.time * 1.4) * 1.1);
      ctx.fillStyle = "#9fb0ba"; ctx.beginPath(); ctx.ellipse(0, 0, 7, 3, -0.5, 0, 7); ctx.fill(); ctx.restore();
    } else if (id === "lab") {
      ctx.fillStyle = "#7f5fae"; ctx.beginPath(); ctx.arc(0, -8, 5, 0, 7); ctx.fill();
      ctx.fillStyle = "rgba(200,160,255,0.35)"; ctx.beginPath(); ctx.arc(0, -8, 7 + Math.sin(G.time * 4) * 1.5, 0, 7); ctx.fill();
    } else if (id === "derrick") {
      ctx.strokeStyle = "#3d3a32"; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(0, -16); ctx.lineTo(6, 0); ctx.stroke();
      const pump = Math.sin(G.time * 2.5) * 4;
      ctx.strokeStyle = "#57544a";
      ctx.beginPath(); ctx.moveTo(0, -13); ctx.lineTo(8, -9 + pump); ctx.stroke();
    } else if (id === "silo") {
      ctx.fillStyle = "#7a7466"; ctx.beginPath(); ctx.arc(-4, -6, 5, 0, 7); ctx.arc(4, -6, 5, 0, 7); ctx.fill();
      ctx.fillStyle = "#d8b44a";
      const f = U.clamp(b.owner.cash / b.owner.storageCap(), 0, 1);
      ctx.fillRect(-8, -2, 16 * f, 2);
    } else if (id === "depot") {
      ctx.fillStyle = "#5c6146"; ctx.fillRect(-9, -6, 18, 6);
      ctx.fillStyle = "#c9cf52"; ctx.fillRect(-7, -4, 3, 3);
    } else if (b.def.cat === "defense" && b.def.weapons) {
      /* turreted defence: pedestal + gun */
      ctx.fillStyle = shade2(col.dark, 14);
      ctx.beginPath(); ctx.arc(0, -3, 6, 0, 7); ctx.fill();
      const ta = isoAngle(b.tang);
      ctx.strokeStyle = "#23262a"; ctx.lineWidth = id === "sam" ? 3.2 : 2;
      ctx.beginPath(); ctx.moveTo(0, -4);
      ctx.lineTo(Math.cos(ta) * 12, -4 + Math.sin(ta) * 7.5); ctx.stroke();
      if (id === "sam" && !b.powered) {
        ctx.fillStyle = "#ff6b52"; ctx.font = "8px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("NO PWR", 0, -14);
      }
    } else if (id === "wall") {
      ctx.fillStyle = "#6e6f68"; ctx.fillRect(-7, -5, 14, 5);
    } else if (id === "conyard") {
      ctx.fillStyle = "#5d6266"; ctx.fillRect(-11, -9, 22, 8);
      ctx.strokeStyle = "#c9cf52"; ctx.lineWidth = 1.4;
      ctx.strokeRect(-11, -9, 22, 8);
      const crane = Math.sin(G.time * 1.2) * 6;
      ctx.strokeStyle = "#8a9096";
      ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(crane, -17); ctx.stroke();
    }
    ctx.restore();
  }

  /* ============ health bars / selection ============ */
  function drawUnitUI(u, X, Y, z) {
    const sel = u.selected;
    if (sel) {
      /* green for ours, the ally's own colour for an ally, red for an enemy.
         The ally also gets a BROKEN ring: a commander on our letter may well
         have picked a red, and hue alone would then say the wrong thing. */
      const sd = G.side(u);
      ctx.strokeStyle = sd === "own" ? "rgba(120,255,120,0.9)"
        : sd === "ally" ? G.allyTint(u, "#7fc2ff") : "rgba(255,110,90,0.95)";
      ctx.lineWidth = 1.2;
      if (sd === "ally") ctx.setLineDash([4 * z, 3 * z]);
      ctx.beginPath();
      ctx.ellipse(X, Y + 2 * z, (u.r + 4) * z, (u.r + 4) * z * ISO, 0, 0, 7);
      ctx.stroke();
      if (sd === "ally") ctx.setLineDash([]);
    }
    if (sel || u.hp < u.maxHp || u.owner !== G.human) {
      if (u.hp < u.maxHp || sel) {
        const w = Math.max(18, u.r * 2) * z, f = u.hp / u.maxHp;
        const y = Y - (u.layer === "air" ? 12 : u.r + 12) * z - 34 * (u.layer === "air" ? z : 0);
        ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(X - w / 2, y, w, 3.5 * z);
        ctx.fillStyle = f > 0.55 ? "#57c94f" : f > 0.25 ? "#d8b44a" : "#d05a45";
        ctx.fillRect(X - w / 2, y, w * f, 3.5 * z);
      }
    }
    /* veterancy chevrons */
    if (u.vet > 0 && (sel || u.owner === G.human)) {
      ctx.fillStyle = "#ffd76a"; ctx.font = Math.round(8 * z) + "px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("^".repeat(u.vet), X, Y - (u.r + 15) * z);
    }
    /* low fuel/ammo pips for own units */
    if (u.owner === G.human && sel) {
      let msg = null;
      if (u.fuelMax && u.fuel < 25) msg = "FUEL";
      if (u.ordnanceDry && u.ordnanceDry()) msg = msg ? "FUEL+AMMO" : "AMMO";
      if (msg) {
        ctx.fillStyle = "#ff9a5c"; ctx.font = Math.round(8 * z) + "px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("LOW " + msg, X, Y + (u.r + 14) * z);
      }
    }
  }
  function drawBuildingUI(b, cx, cy, z) {
    if (b.selected) {
      /* a clicked structure is drawn in ITS side's colour, not always ours */
      const sb = G.side(b);
      ctx.strokeStyle = sb === "own" ? "rgba(120,255,120,0.8)"
        : sb === "ally" ? G.allyTint(b, "#7fc2ff") : "rgba(255,110,90,0.85)";
      ctx.lineWidth = 1.2;
      if (sb === "ally") ctx.setLineDash([4 * z, 3 * z]);
      const w = b.def.w * CFG.TILE * z;
      ctx.strokeRect(cx - w * 0.7, cy - 8 * z, w * 1.4, (b.def.h * CFG.TILE * ISO + 16) * z);
      if (sb === "ally") ctx.setLineDash([]);
    }
    if (b.hp < b.maxHp || b.selected) {
      const w = b.def.w * CFG.TILE * 1.1 * z, f = b.hp / b.maxHp;
      ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(cx - w / 2, cy - 16 * z, w, 4 * z);
      ctx.fillStyle = f > 0.55 ? "#57c94f" : f > 0.25 ? "#d8b44a" : "#d05a45";
      ctx.fillRect(cx - w / 2, cy - 16 * z, w * f, 4 * z);
    }
    if (b.repairing) {
      ctx.fillStyle = "#ffd76a"; ctx.font = Math.round(10 * z) + "px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("REPAIRING", cx, cy - 20 * z);
    }
    /* Damage, in the same three stages the 3D battlefield draws (js/damage3d.js):
       light smoke below 70%, dark smoke and sparks below 55% where the bar
       turns yellow, fire below 25% where it turns red, from more than one
       place on a big structure. The single puff that was
       here also rose off an enemy building the player only REMEMBERED under
       fog, which read its live health through the fog; this draws nothing
       unless the building is in sight now. */
    if (typeof Damage3D !== "undefined") Damage3D.drawBuilding2D(ctx, b, cx, cy, z, G);
  }

  /* ============ projectiles & effects ============ */
  function drawProjectiles() {
    const z = cam.z;
    for (const p of Combat.projectiles) {
      const X = sx(p.x, p.y), Y = sy(p.x, p.y, 0) - p.z * z * 0.8;
      if (p.type === "torpedo") {
        ctx.fillStyle = "rgba(180,220,255,0.7)";
        ctx.beginPath(); ctx.arc(X, sy(p.x, p.y, 0), 2 * z, 0, 7); ctx.fill();
      } else if (p.type === "missile") {
        ctx.save(); ctx.translate(X, Y);
        const a = Math.atan2(p.ty - p.y, p.tx - p.x);
        ctx.rotate(isoAngle(a));
        ctx.fillStyle = "#dde3e8"; ctx.fillRect(-4 * z, -1.2 * z, 8 * z, 2.4 * z);
        ctx.fillStyle = "rgba(255,180,60,0.9)";
        ctx.beginPath(); ctx.arc(-5 * z, 0, 2 * z, 0, 7); ctx.fill();
        ctx.restore();
      } else {
        ctx.fillStyle = p.type === "arc" ? "#31363a" : "#ffd280";
        ctx.beginPath(); ctx.arc(X, Y, (p.type === "arc" ? 2.4 : 1.8) * z, 0, 7); ctx.fill();
      }
    }
  }
  function drawEffects() {
    const z = cam.z;
    for (const fx of Combat.effects) {
      const f = fx.life / fx.max;
      if (fx.t === "tracer") {
        ctx.strokeStyle = "rgba(255,220,140," + f + ")";
        ctx.lineWidth = 1.3 * z;
        ctx.beginPath();
        ctx.moveTo(sx(fx.x1, fx.y1), sy(fx.x1, fx.y1, 0));
        ctx.lineTo(sx(fx.x2, fx.y2), sy(fx.x2, fx.y2, 0));
        ctx.stroke();
      } else if (fx.t === "flash") {
        const X = sx(fx.x, fx.y), Y = sy(fx.x, fx.y, 0);
        ctx.fillStyle = "rgba(255,230,150," + f + ")";
        ctx.beginPath(); ctx.arc(X, Y, (fx.big ? 8 : 4.5) * z * (2 - f), 0, 7); ctx.fill();
      } else if (fx.t === "boom") {
        /* Fog honesty, as in 3D: the fireball is drawn only where the player
           sees now. The wash drawn over it is translucent on explored ground,
           so a kill inside a remembered base showed through. A nuclear burst
           is drawn anywhere - its cloud is seen across the map, and the
           launch is called out to every commander. */
        if (!fx.nuke && !seenNow(fx.x, fx.y)) continue;
        const X = sx(fx.x, fx.y), Y = sy(fx.x, fx.y, 0);
        const r = fx.r * (1.4 - f * 0.4) * z;
        if (fx.water) {
          ctx.strokeStyle = "rgba(210,235,255," + f * 0.9 + ")";
          ctx.lineWidth = 2.5 * z;
          ctx.beginPath(); ctx.ellipse(X, Y, r, r * ISO, 0, 0, 7); ctx.stroke();
          ctx.fillStyle = "rgba(230,245,255," + f * 0.5 + ")";
          ctx.beginPath(); ctx.ellipse(X, Y - r * 0.5, r * 0.25, r * 0.7, 0, 0, 7); ctx.fill();
        } else {
          const g = ctx.createRadialGradient(X, Y, 0, X, Y, r);
          g.addColorStop(0, "rgba(255,240,190," + f + ")");
          g.addColorStop(0.4, "rgba(255,140,50," + f * 0.85 + ")");
          g.addColorStop(1, "rgba(60,40,30,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.ellipse(X, Y, r, r * ISO, 0, 0, 7); ctx.fill();
          /* rising smoke */
          ctx.fillStyle = "rgba(50,45,42," + (1 - f) * 0.5 + ")";
          ctx.beginPath(); ctx.arc(X, Y - (1 - f) * 26 * z, r * 0.5, 0, 7); ctx.fill();
        }
      } else if (fx.t === "hit") {
        drawHit2D(fx, f, z);
      } else if (fx.t === "death") {
        drawDeath2D(fx, z);
      } else if (fx.t === "trail") {
        const X = sx(fx.x, fx.y), Y = sy(fx.x, fx.y, 0);
        ctx.fillStyle = fx.sub ? "rgba(200,230,255," + f * 0.35 + ")" : "rgba(220,220,220," + f * 0.4 + ")";
        ctx.beginPath(); ctx.arc(X, Y, 2.2 * z * (2 - f), 0, 7); ctx.fill();
      } else if (fx.t === "text") {
        const X = sx(fx.x, fx.y), Y = sy(fx.x, fx.y, 0);
        ctx.fillStyle = fx.c || "#fff";
        ctx.globalAlpha = Math.min(1, f * 2);
        ctx.font = Math.round(10 * z) + "px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(fx.s, X, Y - (1 - f) * 18 * z);
        ctx.globalAlpha = 1;
      }
    }
  }

  /* ============ the moment of a hit, and what a kill leaves ============
     The iso twin of js/impact3d.js, for a machine without WebGL. Drawn from
     each event's own fields and age, so nothing is stored per effect; the
     scatter is a hash of the impact point, which also keeps a spark from
     jumping about between frames. Nothing is drawn where the player cannot
     see now: the fog wash painted over this is translucent on explored
     ground, so without the test a strike inside a remembered base would
     show through it. */
  function seenNow(x, y) {
    if (!G.fogEnabled || !G.fog) return true;
    const tx = (x / CFG.TILE) | 0, ty = (y / CFG.TILE) | 0;
    if (tx < 0 || ty < 0 || tx >= G.map.W || ty >= G.map.H) return false;
    return G.fog[ty * G.map.W + tx] === 2;
  }
  function h01(a, b) { const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453; return s - Math.floor(s); }
  function blot(X, Y, r) { ctx.beginPath(); ctx.arc(X, Y, Math.max(0.3, r), 0, 7); ctx.fill(); }
  function drawHit2D(fx, f, z) {
    if (!seenNow(fx.x, fx.y)) return;
    const a = 1 - f, m = fx.m, small = fx.w === "bullet", k = fx.k || 0.1;
    const ca = Math.cos(fx.ang || 0), sa = Math.sin(fx.ang || 0);
    /* on a target the strike is on the face toward the shooter */
    const off = (m === "ground" || m === "water" || m === "soft") ? 0 : m === "struct" ? 14 : 7;
    const wx = fx.x - ca * off, wy = fx.y - sa * off;
    const lift = m === "air" ? 34 * z : (m === "armour" || m === "hull" || m === "struct") ? 5 * z : 0;
    const X = sx(wx, wy), Y = sy(wx, wy, 0) - lift;
    const at = (d, up) => [sx(wx + ca * d, wy + sa * d), sy(wx + ca * d, wy + sa * d, 0) - lift - up];
    if (m === "armour" || m === "hull" || m === "air") {
      if (a < 0.35) {
        const got = fx.v === "pen" || fx.v === "part";
        ctx.fillStyle = (got ? "rgba(255,250,235," : "rgba(255,222,160,") + (1 - a / 0.35).toFixed(3) + ")";
        blot(X, Y, (small ? 1.4 : got ? 5 : 3.2) * z);
      }
      /* sparks fly back off the plate, toward where the round came from */
      ctx.strokeStyle = "rgba(255,205,120," + f.toFixed(3) + ")";
      ctx.lineWidth = Math.max(0.6, 0.9 * z);
      ctx.beginPath();
      const n = small ? 2 : 6;
      for (let i = 0; i < n; i++) {
        const b = fx.ang + Math.PI + (h01(fx.x + i, fx.y) - 0.5) * 2.4;
        const d0 = a * (small ? 7 : 16), d1 = d0 + 4;
        const up = a * (4 + 8 * h01(i, fx.x)) * z;
        ctx.moveTo(sx(wx + Math.cos(b) * d0, wy + Math.sin(b) * d0), sy(wx + Math.cos(b) * d0, wy + Math.sin(b) * d0, 0) - lift - up);
        ctx.lineTo(sx(wx + Math.cos(b) * d1, wy + Math.sin(b) * d1), sy(wx + Math.cos(b) * d1, wy + Math.sin(b) * d1, 0) - lift - up);
      }
      ctx.stroke();
      if (fx.v === "rico") {
        /* the round skips off the slope and carries on, climbing */
        const p0 = at(a * 90 - 14, a * 40 * z - 6 * z), p1 = at(a * 90, a * 40 * z);
        ctx.strokeStyle = "rgba(255,240,190," + f.toFixed(3) + ")";
        ctx.lineWidth = Math.max(0.8, 1.3 * z);
        ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke();
      }
    } else if (m === "struct") {
      ctx.fillStyle = "rgba(160,152,140," + (0.5 * f).toFixed(3) + ")";
      blot(X, Y - a * 6 * z, (small ? 2 : 4 + 6 * k) * (0.5 + a) * z);
      ctx.fillStyle = "rgba(58,54,50," + f.toFixed(3) + ")";
      for (let i = 0; i < 3; i++) {
        const p = at(-(4 + 10 * h01(i, fx.y)) * a, (9 * a - 12 * a * a) * z);
        blot(p[0] + (h01(fx.x, i) - 0.5) * 10 * z * a, p[1], 0.7 * z);
      }
    } else if (m === "soft") {
      /* a round finding a man: a small puff of dust off his kit, nothing more */
      ctx.fillStyle = "rgba(140,122,95," + (0.4 * f).toFixed(3) + ")";
      blot(X, Y - 3 * z - a * 3 * z, (1.5 + a * 3) * z);
    } else if (m === "ground") {
      ctx.fillStyle = "rgba(140,122,95," + (0.45 * f).toFixed(3) + ")";
      blot(X, Y - a * 4 * z, (small ? 1.5 : 3 + 7 * k) * (0.6 + a) * z);
      ctx.fillStyle = "rgba(90,72,52," + f.toFixed(3) + ")";
      const nd = small ? 2 : 5;
      for (let i = 0; i < nd; i++) {
        const dx = (h01(fx.x + i, fx.y) - 0.5) * (small ? 6 : 18) * a * z;
        const up = ((small ? 7 : 20 + 20 * k) * a - (small ? 9 : 26) * a * a) * z;
        blot(X + dx, Y - Math.max(0, up), (small ? 0.6 : 1) * z);
      }
    } else if (m === "water") {
      const big = fx.u ? 2.6 : small ? 0.4 : 0.8 + k;
      ctx.strokeStyle = "rgba(220,238,250," + (0.8 * f).toFixed(3) + ")";
      ctx.lineWidth = Math.max(0.6, 1.2 * z);
      ctx.beginPath(); ctx.ellipse(X, Y, (2 + a * 8) * big * z, (2 + a * 8) * big * z * ISO, 0, 0, 7); ctx.stroke();
      ctx.fillStyle = "rgba(235,246,252," + (0.6 * f).toFixed(3) + ")";
      ctx.beginPath(); ctx.ellipse(X, Y - (4 + 10 * a) * big * z * 0.5, 1.4 * big * z, (4 + 10 * a) * big * z * 0.5, 0, 0, 7); ctx.fill();
    }
  }
  function drawDeath2D(fx, z) {
    /* the player's own remains are drawn as the player's own units are:
       always; anyone else's only where the player sees now */
    if (fx.cat === "infantry" || !(fx.own || seenNow(fx.x, fx.y))) return;
    const age = fx.max - fx.life;
    const X = sx(fx.x, fx.y), Y = sy(fx.x, fx.y, 0);
    if (fx.kind === "building") {
      /* the structure slumps into its own dust; the wreck event draws the
         rubble and its smoke, the flames on it are drawn here */
      if (age < 5) {
        const k = age / 5;
        ctx.fillStyle = "rgba(150,140,126," + (0.55 * (1 - k)).toFixed(3) + ")";
        for (let i = 0; i < 5; i++)
          blot(X + (h01(fx.x, i) - 0.5) * fx.r * 1.6 * z * (0.6 + k), Y - k * 10 * z - h01(i, fx.y) * 8 * z,
               (fx.r * 0.35 + k * fx.r * 0.5) * z);
      }
      if (age < 26) {
        for (let i = 0; i < 3; i++) {
          const fl = 0.7 + 0.3 * Math.sin(G.time * 19 + i * 2.1 + fx.y);
          const ox = (h01(fx.y, i) - 0.5) * fx.r * z, oy = (h01(i, fx.x) - 0.5) * fx.r * z * ISO;
          ctx.fillStyle = "rgba(255,140,45," + (0.75 * fl).toFixed(3) + ")";
          blot(X + ox, Y + oy - 4 * z, 2.4 * fl * z);
        }
      }
      return;
    }
    if (fx.layer === "air") {
      /* it falls for 2.6 s along its heading, trailing fire and smoke, then
         burns where it hit */
      const T = 2.6, k = Math.min(1, age / T);
      const pos = (kk) => {
        const d = kk * 60, gx = fx.x + Math.cos(fx.ang) * d, gy = fx.y + Math.sin(fx.ang) * d;
        return [sx(gx, gy), sy(gx, gy, 0) - 34 * z * (1 - kk * kk), gx, gy];
      };
      const p = pos(k);
      if (!fx.own && !seenNow(p[2], p[3])) return;
      if (k < 1) {
        for (let i = 1; i <= 5; i++) {
          const kk = k - i * 0.07;
          if (kk < 0) break;
          const q = pos(kk);
          ctx.fillStyle = "rgba(40,37,35," + (0.45 - i * 0.07).toFixed(3) + ")";
          blot(q[0], q[1] - i * 2 * z, (2 + i * 1.2) * z);
        }
        ctx.fillStyle = "rgba(255,160,60,0.9)";
        blot(p[0], p[1], 2.4 * z);
        return;
      }
      if (age - T < 0.4) {
        ctx.fillStyle = "rgba(255,200,120," + (1 - (age - T) / 0.4).toFixed(3) + ")";
        blot(p[0], p[1], 10 * z);
      }
      ctx.fillStyle = "rgba(30,27,24," + Math.min(1, fx.life / 6).toFixed(3) + ")";
      ctx.beginPath(); ctx.ellipse(p[0], p[1], 8 * z, 8 * z * ISO, 0, 0, 7); ctx.fill();
      if (age < 32) {
        const burning = age < 14;
        for (let i = 0; i < 3; i++) {
          const ph = (G.time * 0.35 + i / 3 + fx.x * 0.013) % 1;
          ctx.fillStyle = burning ? "rgba(34,31,29," + (0.5 * (1 - ph)).toFixed(3) + ")"
                                  : "rgba(118,112,104," + (0.28 * (1 - ph)).toFixed(3) + ")";
          blot(p[0] + ph * 10 * z, p[1] - 8 * z - ph * 34 * z, (3 + ph * 7) * z);
        }
        if (burning) {
          ctx.fillStyle = "rgba(255,150,50," + (0.6 + 0.2 * Math.sin(G.time * 23 + fx.x)).toFixed(3) + ")";
          blot(p[0], p[1] - 4 * z, 2.6 * z);
        }
      }
      return;
    }
    if (fx.layer === "sea" || fx.layer === "sub") {
      /* the hull settles and goes; fuel oil spreads over where it was */
      const T = fx.layer === "sea" ? 14 : 3.5, k = Math.min(1, age / T);
      const rr = fx.r * (0.5 + 0.8 * Math.min(1, age / 12)) * z;
      ctx.fillStyle = "rgba(14,11,8," + (0.45 * Math.min(1, fx.life / 8) * Math.min(1, age / 2)).toFixed(3) + ")";
      ctx.beginPath(); ctx.ellipse(X, Y, rr * 1.4, rr * ISO, 0, 0, 7); ctx.fill();
      if (fx.layer === "sea" && k < 1) {
        ctx.save();
        ctx.translate(X, Y); ctx.scale(z, z * ISO); ctx.rotate(isoAngle(fx.ang));
        ctx.globalAlpha = 1 - k;
        ctx.fillStyle = "#2a2724";
        ctx.beginPath(); ctx.ellipse(0, 0, fx.r * 0.9 * (1 - 0.5 * k), fx.r * 0.25 * (1 - 0.5 * k), 0, 0, 7); ctx.fill();
        ctx.restore();
        for (let i = 0; i < 3; i++) {
          const ph = (G.time * 0.35 + i / 3 + fx.x * 0.013) % 1;
          ctx.fillStyle = "rgba(34,31,29," + (0.5 * (1 - ph) * (1 - k)).toFixed(3) + ")";
          blot(X + ph * 12 * z, Y - 10 * z - ph * 40 * z, (4 + ph * 9) * z);
        }
      }
      if (age < 10) {
        ctx.fillStyle = "rgba(235,246,252,0.7)";
        for (let i = 0; i < 4; i++) {
          const ph = (G.time * 1.3 + h01(fx.x, i)) % 1;
          if (ph > 1 - age / 10) continue;
          blot(X + (h01(i, fx.y) - 0.5) * fx.r * 1.4 * z, Y + (h01(fx.y, i) - 0.5) * fx.r * 0.6 * z, (1 + ph) * z);
        }
      }
    }
    /* A ground hull, or an airframe killed on its ramp: the wreck event
       draws the hulk and its fire (drawWreck). One killed on a ship's deck
       ("deck") went over the side in its fireball and leaves nothing. */
  }

  /* ============ fog ============
     Vision is painted per tile into a tiny mask, then upscaled with bilinear
     smoothing into iso space - soft cloud edges instead of hard diamonds.    */
  function renderFogCache() {
    const map = G.map;
    if (!fogCache) {
      fogCache = document.createElement("canvas");
      fogCache.width = map.W; fogCache.height = map.H;
    }
    const fc = fogCache.getContext("2d");
    const img = fc.createImageData(map.W, map.H);
    const px = img.data;
    for (let i = 0; i < map.W * map.H; i++) {
      const f = G.fog[i];
      const o = i * 4;
      px[o] = 5; px[o + 1] = 8; px[o + 2] = 10;
      px[o + 3] = f === 2 ? 0 : f === 1 ? 120 : 238;
    }
    fc.putImageData(img, 0, 0);
  }
  function drawFog() {
    if (!G.fogEnabled) return;
    if (fogCache === null || G.time - fogStamp > 0.24 || G.time < fogStamp) {
      renderFogCache(); fogStamp = G.time;
    }
    const ox = G._terrainOx, TL = CFG.TILE;
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.scale(cam.z, cam.z);
    ctx.translate(-cam.ix - ox, -cam.iy - 20);
    ctx.transform(SQ2, SQ2 * ISO, -SQ2, SQ2 * ISO, ox, 20);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(fogCache, 0, 0, fogCache.width, fogCache.height, 0, 0, G.map.W * TL, G.map.H * TL);
    ctx.restore();
  }

  /* ---- weapon envelopes ----
     The 2D twin of the 3D overlay's range rings: how far the thing you just
     clicked can actually shoot. weaponRange() folds in the faction range
     multiplier and the optics upgrade; minRange is never scaled by the
     simulation, so the inner dead-zone ring uses the raw tile figure. A world
     circle of radius R lands here as an axis-aligned ellipse of (R, R*ISO),
     because the rot45 and the SQ2 scale cancel exactly - the same maths the
     build-radius hint further down already relies on. */
  const RANGE_RING_CAP = 6;            // rings drawn before the picture turns to mush
  function weaponEnvelope(e) {
    const d = e.def || {};
    if (!d.weapons || !d.weapons.length || !e.weaponRange) return null;
    let best = null, tiles = 0;
    for (const k of d.weapons) {
      const w = WEAPONS[k];
      if (!w || !w.range) continue;               // late-merged rosters can miss one
      const t = e.weaponRange(w) / CFG.TILE;
      if (t > tiles) { tiles = t; best = w; }
    }
    if (!best) return null;
    return { tiles, min: best.minRange || 0, name: best.name || "WEAPON" };
  }
  function drawRangeRings() {
    if (CFG.SHOW_RANGE_RINGS === false) return;
    const sel = (typeof UI !== "undefined") && UI.selection;
    if (!sel || !sel.length) return;
    /* Own forces only: clicking a hostile for intel drops it into the selection
       like anything else. Cargo and garrison keep selected set while frozen off
       the map, and the entity pass above skips them, so they are skipped here. */
    let list = [];
    for (const e of sel) {
      if (e.dead || e.carried || e.owner !== G.human) continue;
      const env = weaponEnvelope(e);
      if (env) list.push({ e, env });
    }
    /* past the cap a box selection collapses to one ring per unit type, or
       forty overlapping ellipses would say nothing at all */
    if (list.length > RANGE_RING_CAP) {
      const seen = new Set(), one = [];
      for (const it of list) {
        const key = it.e.def.id || it.e.def.name;
        if (seen.has(key)) continue;
        seen.add(key); one.push(it);
        if (one.length >= RANGE_RING_CAP) break;
      }
      list = one;
    }
    const z = cam.z;
    ctx.save();
    ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textAlign = "center";
    for (const it of list) {
      const e = it.e;
      /* aircraft are drawn lifted off the ground by the same 34*z, so the ring
         lifts with them and stays under the machine rather than its shadow */
      const X = sx(e.x, e.y), Y = sy(e.x, e.y, 0) - (e.layer === "air" ? 34 * z : 0);
      const rx = it.env.tiles * CFG.TILE * z, ry = rx * ISO;
      if (X + rx < -40 || X - rx > W + 40 || Y + ry < -40 || Y - ry > H + 40) continue;
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = "rgba(255,176,64,0.9)"; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.ellipse(X, Y, rx, ry, 0, 0, 7); ctx.stroke();
      if (it.env.min) {
        const rn = it.env.min * CFG.TILE * z;
        ctx.setLineDash([2, 5]);
        ctx.strokeStyle = "rgba(255,96,72,0.75)"; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.ellipse(X, Y, rn, rn * ISO, 0, 0, 7); ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(255,176,64,0.9)";
      ctx.fillText("RNG " + it.env.tiles.toFixed(1) + "t · " + it.env.name.toUpperCase(),
                   X, Y + ry + 12);
    }
    ctx.restore();
  }

  /* ============ order lines ============
     (owner) "i take your suggestions and make it on 1,2,3 first" - and the
     first of the small ideas was StarCraft II's, C&C3's and Supreme
     Commander's: show on the map what a unit has been told to do.
     Measured at b4a9943 under jsc: a tank given a move and two Shift-queued
     waypoints holds all three, and the map showed three "·" marks that lived
     0.5 s each; a 2D frame drawn at the moment of the click stroked 292
     segments and not one of them ended on a waypoint, nor did any 0.6 s
     later while the tank still had all three orders. An attack-move
     left "ATTACK MOVE" for 0.8 s, a patrol "PATROL" for 1.0 s, a
     Ctrl+right-click fire mission nothing on the map at all, and a selected
     barracks drew its flag and no line back to itself.

     So: from each of the player's selected units - every unit of his while
     Shift is held, as StarCraft II does, Shift being the key that queues - a
     line runs to what it is doing now and on through what it will do after,
     one colour to a kind of order. A selected factory is linked to its rally
     flag; an airbase is not, because an airframe never goes to one (game.js:
     "An airframe has no rally point") - its flag is left as it always was. A
     fire mission shows where its rounds can come down, which the game DOES
     model and only as a circle: combat.js fire() puts a hit on the aim point
     and a miss 14 + rng * 30 px off it in any direction, whatever the gun and
     whatever the range, so the ring is 44 px (1.4 tiles) round the aim point
     - not an ellipse, and not a guess. Measured: 400 of an M109's 155 mm
     rounds at one map point on a fixed RNG put 13 on the aim point and none
     farther out than 43.9 px. A cargo round is ringed where its MINES can
     lie instead, which is wider (olSowR). A box of ground being mined or
     swept is outlined, with a line to the point the vehicle is working.

     A LINE GOES ONLY AS FAR AS THE UNIT WILL. The queue (u.orders) is taken
     up only by an order that finishes into nextOrder() (entities.js): a
     move, an attack-move, a fight, a clearance, a mine laid, a cargo round
     away. A patrol never finishes; a combat air patrol is flown until the
     tanks send it home and then taken up again; a fire mission runs to its
     clock and stands idle; a squad that boards is aboard; a recall parks; a
     mined or swept box ends idle - and an idle unit never takes up what is
     queued. Measured at b4a9943, each with a move queued behind it: a patrol
     still walking its beat after 30 s; a fire mission on a 3 s clock
     idle after 30 s; a squad aboard its IFV after 10 s; a combat air patrol
     home for fuel and back on station within 60 s; a recall parked after
     60 s - and the move still queued in every one. So the line stops at
     such an order, and nothing is drawn to a place the unit is never going.
     A strike's way home is drawn as what afterAttack()
     makes it, an ATTACK-MOVE back to the ramp that fights whatever it meets
     - the same kind before the target dies and after.

     FOG. Only the player's own units: an enemy clicked for intel, or an
     ally's, shows nothing. A leg that ends on a TARGET is drawn only while
     that target is on the player's own map by the rule both renderers draw
     it by - a unit in sight, a structure once seen, a boat held on sonar -
     so no line can point into the fog at what it hides.

     One list for both renderers, in world pixels, rebuilt each frame into
     typed arrays made once: render.js strokes it here, render3d.js copies it
     into a single LineSegments. The list allocates nothing per frame, nor do
     the strokes (the dash patterns are made once, below), and making the
     list for 40 tanks with 13 orders each - 520 legs - took 0.11 to 0.35 ms
     under jsc on a loaded machine. It holds OL_MAXS legs, and the selection
     is listed first, so if Shift over a very large army ever fills it, what
     goes unshown is the rest of the army and never the units in the
     player's hand (OL.cut counts what was left out). A harvester's round
     trip and a guard post are not orders anyone needs reminding of, and
     draw nothing. */
  const OL_KINDS = ["move", "amove", "attack", "patrol", "unload", "enter",
                    "strike", "rtb", "cap", "fire", "rally", "area"];
  const OL_COLS = ["#8fd05f", "#ff9a4a", "#ff4a3a", "#ffe066", "#5ac8ff", "#5ac8ff",
                   "#ff5a9c", "#a8b8ff", "#ffe066", "#e07cff", "#8fd05f", "#e2c478"];
  /* a beat walked both ways, a patrol flown over a point, a way home, a
     rally and a box of ground are standing arrangements rather than a single
     trip: dashed. The box is the colour of the one the player drags out. */
  const OL_DASH = [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1];
  const OL_DASH_ON = [6, 5], OL_DASH_OFF = [], OL_DASH_RING = [3, 4];
  const K_MOVE = 0, K_AMOVE = 1, K_ATTACK = 2, K_PATROL = 3, K_UNLOAD = 4, K_ENTER = 5,
        K_STRIKE = 6, K_RTB = 7, K_CAP = 8, K_FIRE = 9, K_RALLY = 10, K_AREA = 11;
  const OL_MAXS = 4096, OL_MAXM = 2048, OL_MAXR = 128;
  const OL_MISS = 44;                      // combat.js fire(): a miss lands 14 + rng*30 px off
  /* Where a cargo round's mines can lie. combat.js scatterMines() lays mine
     i of n at sqrt((i + 0.5) / n) * scatterR out, at i golden angles round,
     stretched 1.6:1 along the line of fire; jitters each up to 0.225 tile
     each way (0.32 tile at most); and does it round the point the round came
     down - anywhere inside OL_MISS. The stick's own farthest mine is worked
     out here the way scatterMines() places it, and the line of fire is not
     known until the launcher shoots, so the ring is that stick turned
     through every bearing. An M109's M741 RAAMS (5 mines, scatterR 1.2)
     comes to 112.0 px; 2,000 of its mines from 400 rounds on a fixed RNG
     reach 104.6 to 106.0 px at the farthest, by the ground they fell on
     (_behtest [83] fires them). */
  function olSowR(w) {
    const n = Math.max(1, w.scatter | 0), R = (w.scatterR || 1.8) * CFG.TILE;
    let far = 0;
    for (let i = 0; i < n; i++) {
      const rr = Math.sqrt((i + 0.5) / n) * R, th = i * 2.39996323;
      far = Math.max(far, Math.hypot(Math.cos(th) * rr * 1.6, Math.sin(th) * rr));
    }
    return OL_MISS + far + 0.32 * CFG.TILE;
  }
  const OL_HOME = { type: "rtb" };         // what a join on a tanker with no mission hands on to
  const OL = {
    kinds: OL_KINDS, colors: OL_COLS, dash: OL_DASH, miss: OL_MISS, sowR: olSowR,
    n: 0, seg: new Float32Array(OL_MAXS * 7),     // x0 y0 a0  x1 y1 a1  kind  (a: 1 = flying)
    nm: 0, mark: new Float32Array(OL_MAXM * 4),   // x y a kind: a waypoint
    nr: 0, ring: new Float32Array(OL_MAXR * 4),   // x y r kind: where a fire mission can land
    units: 0,                                     // units with at least one leg
    cut: 0,                                       // legs past OL_MAXS, not listed
    drawn: 0,                                     // segments the 2D view stroked last frame
  };
  let olX = 0, olY = 0, olA = 0;                  // the pen: where the next leg starts
  function olMark(x, y, a, k) {
    if (OL.nm >= OL_MAXM) return;
    const m = OL.mark, i = OL.nm++ * 4;
    m[i] = x; m[i + 1] = y; m[i + 2] = a; m[i + 3] = k;
  }
  function olLeg(k, x, y, a, mark) {
    if (typeof x !== "number" || typeof y !== "number" || x !== x || y !== y) return;   // no point, no leg
    if (OL.n < OL_MAXS) {
      const s = OL.seg, i = OL.n++ * 7;
      s[i] = olX; s[i + 1] = olY; s[i + 2] = olA; s[i + 3] = x; s[i + 4] = y; s[i + 5] = a; s[i + 6] = k;
    } else OL.cut++;
    if (mark) olMark(x, y, a, k);
    olX = x; olY = y; olA = a;
  }
  /* a battery given one aim point shares one ring */
  function olRing(x, y, r, k) {
    const R = OL.ring, fx = Math.fround(x), fy = Math.fround(y), fr = Math.fround(r);
    for (let i = 0; i < OL.nr; i++)
      if (R[i * 4] === fx && R[i * 4 + 1] === fy && R[i * 4 + 2] === fr && R[i * 4 + 3] === k) return;
    if (OL.nr >= OL_MAXR) return;
    const i = OL.nr++ * 4;
    R[i] = x; R[i + 1] = y; R[i + 2] = r; R[i + 3] = k;
  }
  /* on the player's map now: render.js visible(), for any game */
  function olShown(g, e) {
    if (e.owner === g.human || !g.fogEnabled || !g.fog) return true;
    if (e.layer === "sub") return !!(g.canSeeSub && g.canSeeSub(g.human, e));
    const f = g.fog[e.ty * g.map.W + e.tx];
    return e.kind === "building" ? f >= 1 : f === 2;
  }
  function olFlying(e) {
    return e.layer === "air" && !e.parked && !(e.order && e.order.type === "parked") ? 1 : 0;
  }
  function olNum(v) { return typeof v === "number" && v === v; }
  function olUnit(g, u) {
    const air = u.layer === "air" ? 1 : 0, q = u.orders, pad = u.padOn && !u.padOn.dead ? u.padOn : null;
    olX = u.x; olY = u.y; olA = olFlying(u);
    let o = u.order, qi = 0;
    const n0 = OL.n;
    /* the order now, what it hands on to itself (a fight's way back, a
       recall's mission), then the queue while each one finishes into it: at
       most 1 + 12 queued, and a guard of 32 */
    for (let step = 0; step < 32 && o; step++) {
      let next = null, pull = false;
      const t = o.target;
      switch (o.type) {
        case "move": olLeg(o.unloadAt ? K_UNLOAD : K_MOVE, o.x, o.y, air, true); pull = true; break;
        case "laymine": case "emplace": olLeg(K_MOVE, o.x, o.y, air, true); pull = true; break;
        case "attackmove": olLeg(K_AMOVE, o.x, o.y, air, true); pull = true; break;
        case "attack":
          if (t && !t.dead && olShown(g, t)) olLeg(air ? K_STRIKE : K_ATTACK, t.x, t.y, olFlying(t), false);
          if (o.resume) {
            if (o.resume.patrol) next = o.resume.patrol;
            /* back on station, flown until the tanks send it home */
            else if (air && o.cap) olLeg(K_CAP, o.resume.x, o.resume.y, 1, true);
            /* afterAttack(): back to the resume point - a strike's own ramp -
               as an attack-move, which fights what it meets on the way */
            else { olLeg(K_AMOVE, o.resume.x, o.resume.y, air, true); pull = true; }
          } else if (air && o.then) next = o.then;
          else pull = true;
          break;
        case "patrol": {
          /* the leg being walked now, then the whole beat; a beat not yet
             begun starts wherever the unit will be when it begins */
          const fresh = o.x0 === undefined;
          const ax = fresh ? olX : o.x0, ay = fresh ? olY : o.y0;
          olMark(ax, ay, air, K_PATROL);
          if (!fresh) {
            olLeg(K_PATROL, o.back ? ax : o.x, o.back ? ay : o.y, air, false);
            olX = ax; olY = ay; olA = air;
          }
          olLeg(K_PATROL, o.x, o.y, air, true);
          break;
        }
        case "bombard": {
          olLeg(K_FIRE, o.x, o.y, 0, true);
          /* the mount the order names (entities.js bombard): a cargo round is
             one round and then the next order; a gun fires until the clock */
          const w = o.wi !== undefined && u.def.weapons ? WEAPONS[u.def.weapons[o.wi]] : null;
          if (w && w.scatter) { olRing(o.x, o.y, olSowR(w), K_AREA); pull = true; }
          else olRing(o.x, o.y, OL_MISS, K_FIRE);
          break;
        }
        case "clearobstacle":
          if (t && !t.dead && olShown(g, t)) olLeg(K_ENTER, t.x, t.y, olFlying(t), false);
          pull = true;
          break;
        case "enter":
          if (t && !t.dead && olShown(g, t)) olLeg(K_ENTER, t.x, t.y, olFlying(t), false);
          break;
        case "rtb": case "land":
          olLeg(K_RTB, pad ? pad.x : u.owner.homeX, pad ? pad.y : u.owner.homeY, 0, true);
          next = o.then || null;
          break;
        case "tank":
          if (t && !t.dead) olLeg(K_RTB, t.x, t.y, 1, false);
          next = o.then || OL_HOME;
          break;
        case "cap": olLeg(K_CAP, o.x, o.y, 1, true); break;
        case "autolay": case "autosweep": {
          /* the lattice point being worked, then the box the player drew (a
             saved order comes back without its corners, and draws no box) */
          const box = olNum(o.x0) && olNum(o.y0) && olNum(o.x1) && olNum(o.y1);
          const p = o.pts && o.i < o.pts.length ? o.pts[o.i] : null;
          if (p) olLeg(K_AREA, p.x, p.y, air, false);
          else if (box) olLeg(K_AREA, (o.x0 + o.x1) / 2, (o.y0 + o.y1) / 2, air, false);
          if (box) {
            olX = o.x0; olY = o.y0; olA = air;
            olLeg(K_AREA, o.x1, o.y0, air, false); olLeg(K_AREA, o.x1, o.y1, air, false);
            olLeg(K_AREA, o.x0, o.y1, air, false); olLeg(K_AREA, o.x0, o.y0, air, false);
          }
          break;
        }
      }
      o = next || (pull && q && qi < q.length ? q[qi++] : null);
    }
    if (OL.n > n0) OL.units++;
  }
  /* skipSel: this pass follows one over the selection, which has been listed */
  function olUnits(g, me, list, skipSel) {
    if (list) for (let i = 0; i < list.length; i++) {
      const u = list[i];
      if (u.kind !== "unit" || u.owner !== me || u.dead || u.carried || !u.order) continue;
      if (skipSel && u.selected) continue;
      olUnit(g, u);
    }
  }
  function olRallies(me, list, skipSel) {
    if (list) for (let i = 0; i < list.length; i++) {
      const b = list[i];
      if (b.kind !== "building" || b.owner !== me || b.dead || !b.rally) continue;
      if (skipSel && b.selected) continue;
      if (!b.def.produces || b.def.produces === "aircraft") continue;
      olX = b.x; olY = b.y; olA = 0;
      /* a selected factory has its flag already; one shown by Shift gets a dot */
      olLeg(K_RALLY, b.rally.x, b.rally.y, 0, !b.selected);
    }
  }
  /* the list for one frame. sel is the player's selection; all = Shift held */
  function orderLines(g, sel, all) {
    OL.n = OL.nm = OL.nr = OL.units = OL.cut = 0;
    if (!g || !g.human) return OL;
    const me = g.human;
    olUnits(g, me, sel, false);
    if (all) olUnits(g, me, me.units, true);
    olRallies(me, sel, false);
    if (all) olRallies(me, me.buildings, true);
    return OL;
  }
  /* ---- the 2D view: one path per kind, over the map, under the cursor aids ---- */
  function drawOrderLines(input) {
    const sel = (typeof UI !== "undefined") ? UI.selection : null;
    const L = orderLines(G, sel, !!(input && input.shift));
    L.drawn = 0;
    if (!L.n && !L.nm && !L.nr) return;
    const z = cam.z, lift = 34 * z, s = L.seg;
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.lineWidth = 1.5;
    for (let k = 0; k < OL_KINDS.length; k++) {
      let any = false;
      ctx.beginPath();
      for (let i = 0; i < L.n; i++) {
        const j = i * 7;
        if (s[j + 6] !== k) continue;
        const X0 = sx(s[j], s[j + 1]), Y0 = sy(s[j], s[j + 1], 0) - s[j + 2] * lift;
        const X1 = sx(s[j + 3], s[j + 4]), Y1 = sy(s[j + 3], s[j + 4], 0) - s[j + 5] * lift;
        if ((X0 < 0 && X1 < 0) || (X0 > W && X1 > W) || (Y0 < 0 && Y1 < 0) || (Y0 > H && Y1 > H)) continue;
        ctx.moveTo(X0, Y0); ctx.lineTo(X1, Y1);
        any = true; L.drawn++;
      }
      if (!any) continue;
      ctx.strokeStyle = OL_COLS[k];
      ctx.setLineDash(OL_DASH[k] ? OL_DASH_ON : OL_DASH_OFF);
      ctx.stroke();
    }
    ctx.setLineDash(OL_DASH_OFF);
    const r = Math.max(2, 2.6 * z), m = L.mark;
    for (let i = 0; i < L.nm; i++) {
      const j = i * 4, X = sx(m[j], m[j + 1]), Y = sy(m[j], m[j + 1], 0) - m[j + 2] * lift;
      if (X < -8 || X > W + 8 || Y < -8 || Y > H + 8) continue;
      ctx.fillStyle = OL_COLS[m[j + 3]];
      ctx.beginPath();
      ctx.moveTo(X, Y - r); ctx.lineTo(X + r, Y); ctx.lineTo(X, Y + r); ctx.lineTo(X - r, Y);
      ctx.closePath(); ctx.fill();
    }
    const R = L.ring;
    ctx.setLineDash(OL_DASH_RING);
    for (let i = 0; i < L.nr; i++) {
      const j = i * 4, X = sx(R[j], R[j + 1]), Y = sy(R[j], R[j + 1], 0), rx = R[j + 2] * z;
      if (X + rx < 0 || X - rx > W || Y + rx < 0 || Y - rx > H) continue;
      ctx.strokeStyle = OL_COLS[R[j + 3]];
      ctx.beginPath(); ctx.ellipse(X, Y, rx, rx * ISO, 0, 0, 7); ctx.stroke();
    }
    ctx.restore();
  }

  /* ============ interaction overlays ============ */
  function drawOverlay(input) {
    drawRangeRings();
    drawOrderLines(input);
    /* selection box */
    if (input.dragging && input.dragDist > 6) {
      ctx.strokeStyle = "rgba(140,255,140,0.8)";
      ctx.fillStyle = "rgba(140,255,140,0.08)";
      ctx.lineWidth = 1;
      const x = Math.min(input.dragX0, input.mx), y = Math.min(input.dragY0, input.my);
      const w = Math.abs(input.mx - input.dragX0), h = Math.abs(input.my - input.dragY0);
      ctx.fillRect(x, y, w, h); ctx.strokeRect(x, y, w, h);
    }
    /* building placement ghost */
    if (input.placing) {
      const def = BUILDINGS[input.placing];
      const wp = unproject(input.mx, input.my);
      const tx = ((wp.x / CFG.TILE) | 0) - ((def.w / 2) | 0);
      const ty = ((wp.y / CFG.TILE) | 0) - ((def.h / 2) | 0);
      input.placeTx = tx; input.placeTy = ty;
      const ok = G.canPlace(G.human, input.placing, tx, ty);
      for (let y = ty; y < ty + def.h; y++) for (let x = tx; x < tx + def.w; x++) {
        const e = GameMap.elevAt(G.map, x, y);
        const wx = (x + 0.5) * CFG.TILE, wy = (y + 0.5) * CFG.TILE;
        const X = sx(wx, wy), Y = sy(wx, wy, e);
        const half = CFG.TILE * SQ2 * cam.z, hh = half * ISO;
        ctx.fillStyle = ok ? "rgba(110,255,110,0.35)" : "rgba(255,90,70,0.4)";
        ctx.beginPath();
        ctx.moveTo(X, Y - hh); ctx.lineTo(X + half, Y);
        ctx.lineTo(X, Y + hh); ctx.lineTo(X - half, Y);
        ctx.closePath(); ctx.fill();
      }
      /* build radius hint */
      ctx.strokeStyle = "rgba(140,220,140,0.25)";
      ctx.lineWidth = 1;
      for (const b of G.human.buildings) {
        if (b.dead) continue;
        const X = sx(b.x, b.y), Y = sy(b.x, b.y, 0);
        ctx.beginPath();
        ctx.ellipse(X, Y, CFG.BUILD_RADIUS * CFG.TILE * cam.z, CFG.BUILD_RADIUS * CFG.TILE * cam.z * ISO, 0, 0, 7);
        ctx.stroke();
      }
    }
    /* rally flags for selected production buildings */
    for (const b of G.human.buildings) {
      if (!b.selected || !b.def.produces || b.dead) continue;
      const X = sx(b.rally.x, b.rally.y), Y = sy(b.rally.x, b.rally.y, 0);
      ctx.strokeStyle = "#8fd05f"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X, Y - 14 * cam.z); ctx.stroke();
      ctx.fillStyle = "#8fd05f";
      ctx.beginPath(); ctx.moveTo(X, Y - 14 * cam.z);
      ctx.lineTo(X + 9 * cam.z, Y - 11 * cam.z); ctx.lineTo(X, Y - 8 * cam.z);
      ctx.closePath(); ctx.fill();
    }
    /* attack-move cursor hint */
    if (input.attackMove) {
      ctx.strokeStyle = "rgba(255,120,90,0.9)"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(input.mx, input.my, 11, 0, 7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(input.mx - 15, input.my); ctx.lineTo(input.mx + 15, input.my);
      ctx.moveTo(input.mx, input.my - 15); ctx.lineTo(input.mx, input.my + 15); ctx.stroke();
    }
  }

  /* ============ minimap ============ */
  /* ============ attack warnings on the minimap ============
     COLOUR AND CONTRAST. The minimap ground runs the whole palette: fogged
     water is #050705 and the sand on hormuz and kuwait is near-white, so any
     single flat colour reads on one end and vanishes on the other. Every
     stroke here is therefore drawn TWICE - an opaque near-black casing at
     lineWidth+1.6 first, then the colour on top. That is the trick a road
     symbol on aerial imagery uses, and with a twelve-marker cap it costs at
     most twenty-four extra strokes on a 196px canvas.

       kind   colour    life   what it is
       note   #5ac8ff   3.0s   a plot: own fire mission, counter-battery fix,
                               a strategic contact already in sight. Cyan is
                               the game's own "friendly information" colour
                               (Threat.flashColor uses it for own launches).
       unit   #ffc042   2.5s   one of your units is being shot at. Amber, the
                               same warning colour the HUD already uses for
                               weather and low power.
       base   #ff8a3c   4.0s   one of your STRUCTURES is being shot at.
       loss   #ff3324   6.0s   a structure of yours is destroyed or captured.

     It PULSES rather than blinks. A blink caught in its off phase is a
     warning that was not given; an expanding, fading ring is legible at
     every instant of its life, which matters because the player looks at the
     minimap at a moment of their choosing and not of ours.

     WHAT IT MUST NOT DO. Nothing here is fog-tested, because nothing here is
     fog-sensitive: the ping call sites hand this only the player's own
     losses and plots the player already holds. The gating lives at the call
     sites in game.js and threat.js, which is the only place that knows
     whose event it was. */
  const EV_STYLE = {
    note: { c: "#5ac8ff", life: 3.0, r0: 2.0, r1: 7.5, w: 1.8, rings: 1, mark: 0 },
    unit: { c: "#ffc042", life: 2.5, r0: 2.5, r1: 9.0, w: 1.4, rings: 1, mark: 1 },
    base: { c: "#ff8a3c", life: 4.0, r0: 3.0, r1: 13.0, w: 1.8, rings: 2, mark: 2 },
    loss: { c: "#ff3324", life: 6.0, r0: 3.5, r1: 17.0, w: 2.0, rings: 2, mark: 3 },
  };

  /* one path, stroked as casing then colour */
  function cased(mctx, path, col, w, a) {
    mctx.globalAlpha = a * 0.9;
    /* PROPORTIONAL, not w + 1.6. A fixed addition is right on a 2px cross and
       swamps a 1.2px ring: the informational marker measured 8 pixels of its
       own colour at its widest, most of the stroke being casing. */
    mctx.strokeStyle = "rgba(2,4,3,0.95)"; mctx.lineWidth = w * 1.9;
    path(); mctx.stroke();
    mctx.globalAlpha = a;
    mctx.strokeStyle = col; mctx.lineWidth = w;
    path(); mctx.stroke();
  }

  /* THE EDGE INDICATOR.
     The whole map is always on the minimap, so an arrow pinned to the
     minimap's own border would never once fire - there is no such thing as
     an event off the minimap. What the player actually misses is an attack
     outside the CAMERA, and the camera is already drawn here as the view
     quad. So the chevron sits on that quad's edge, where the line from the
     centre of the view out to the event leaves it, pointing the way the
     camera has to travel. One glance gives a heading, and one drag acts on
     it. Because the quad and the event are both in the rotated minimap
     space, the heading stays true at any camera yaw.

     The maths is a ray/segment clip against four edges with D = event minus
     view-centre left UNNORMALISED, so the crossing parameter t is in units
     of D: t >= 1 means the event is inside the view and needs no chevron at
     all. That is the inside test and the edge point in one pass, no
     point-in-polygon call. */
  function edgeChevron(mctx, q, px, py, col, a) {
    const cx = (q[0].x + q[1].x + q[2].x + q[3].x) * 0.25;
    const cy = (q[0].y + q[1].y + q[2].y + q[3].y) * 0.25;
    const dx = px - cx, dy = py - cy;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 0.001) return;
    let best = -1;
    for (let i = 0; i < 4; i++) {
      const A = q[i], B = q[(i + 1) & 3];
      const ex = B.x - A.x, ey = B.y - A.y;
      const den = dx * ey - dy * ex;
      if (den > -1e-6 && den < 1e-6) continue;      // parallel
      const t = ((A.x - cx) * ey - (A.y - cy) * ex) / den;
      const s = ((A.x - cx) * dy - (A.y - cy) * dx) / den;
      if (t > 0 && s >= 0 && s <= 1 && (best < 0 || t < best)) best = t;
    }
    if (best < 0 || best >= 1) return;              // event is inside the view
    const nx = dx / len, ny = dy / len;
    /* tip 2.2px outside the frame line, 5px of shaft behind it, 4px half
       span - a chevron small enough to sit on a 196px minimap without being
       mistaken for a unit and large enough to give an unambiguous heading */
    const tx = cx + dx * best + nx * 2.2, ty = cy + dy * best + ny * 2.2;
    const bx = tx - nx * 5.0, by = ty - ny * 5.0;
    const ox = -ny * 4.0, oy = nx * 4.0;
    cased(mctx, function () {
      mctx.beginPath();
      mctx.moveTo(bx + ox, by + oy); mctx.lineTo(tx, ty); mctx.lineTo(bx - ox, by - oy);
    }, col, 2.0, a);
  }

  /* ---- emitters our ears hear and our eyes do not ----
     G.esmHeard (game.js): a hollow violet diamond for each - the colour of
     the jamming ring, because it is the same war - on both minimaps. Hollow
     so it never reads as a unit dot, three pixels so a plot of a dozen does
     not paint over the ground. Nothing with the fog off, when nothing is
     unseen, and nothing that is seen: that is a red dot already. */
  function drawHeardEmitters(mctx, S) {
    if (!G.esmHeard || !G.human) return;
    const heard = G.esmHeard(G.human);
    if (!heard.length) return;
    mctx.strokeStyle = "rgba(200,140,255,0.95)"; mctx.lineWidth = 1;
    mctx.beginPath();
    for (let i = 0; i < heard.length; i++) {
      const px = (heard[i].x / CFG.TILE) * S, py = (heard[i].y / CFG.TILE) * S;
      mctx.moveTo(px, py - 3); mctx.lineTo(px + 3, py);
      mctx.lineTo(px, py + 3); mctx.lineTo(px - 3, py); mctx.closePath();
    }
    mctx.stroke();
  }

  /* Called from both minimap paths - the 2D one below and drawMinimapFrom,
     which is what render3d delegates to - so one implementation serves both
     renderers. Drawn inside the rotated transform, with the entity dots, so
     a marker sits on the ground it refers to. */
  function drawEventMarkers(mctx, S, quad) {
    if (!G.recentEvents) return;
    const ev = G.recentEvents();
    if (!ev.length) return;
    const now = G.time;
    mctx.save();
    mctx.lineCap = "round"; mctx.lineJoin = "round";
    for (let i = 0; i < ev.length; i++) {
      const e = ev[i], st = EV_STYLE[e.k] || EV_STYLE.note;
      const f = (now - e.t) / st.life;
      if (f < 0 || f > 1) continue;
      const px = (e.x / CFG.TILE) * S, py = (e.y / CFG.TILE) * S;
      /* Ease-out on the radius so the ring leaps off the point and then
         slows: the motion is spent in the first half second, which is exactly
         when it is recruiting the eye.
         The FADE is flat then linear, not squared. A squared fade was tried
         first and measured wrong on a screenshot - at 1.6s an amber "unit
         under fire" marker was down to alpha 0.13 and simply not there, so a
         2.5s marker was really a one-second one. It now holds full strength
         for 60% of its life and fades over the last 40%, which is what makes
         the stated durations in EV_STYLE mean what they say. */
      /* The 0.15 floor is what guarantees something is drawn on the opening
         frame. It used to start at exactly 0, so kf was 0, the only ring a
         `note` has was skipped and - having no static glyph - it drew nothing
         at all. G.time is frozen while the game is paused, so a fire mission
         plotted just before a pause left an empty minimap for as long as the
         player sat there reading it. */
      const g = 0.15 + 0.85 * (1 - (1 - f) * (1 - f)), a = f < 0.6 ? 1 : (1 - f) / 0.4;
      for (let k = 0; k < st.rings; k++) {
        const kf = g - k * 0.24;
        if (kf <= 0) continue;
        const r = st.r0 + (st.r1 - st.r0) * kf, ka = a * (k ? 0.5 : 1);
        if (ka < 0.04) continue;
        cased(mctx, function () { mctx.beginPath(); mctx.arc(px, py, r, 0, 6.2832); },
              st.c, st.w, ka);
      }
      /* A static glyph under the moving ring. Motion finds the marker, the
         glyph says what it is - and unlike the ring it is still there at the
         end of the marker's life. The worst case gets the loudest glyph. */
      if (st.mark === 3) {
        const d = 4.2;
        cased(mctx, function () {
          mctx.beginPath();
          mctx.moveTo(px - d, py - d); mctx.lineTo(px + d, py + d);
          mctx.moveTo(px + d, py - d); mctx.lineTo(px - d, py + d);
        }, st.c, 2.0, a);
      } else if (st.mark === 2) {
        cased(mctx, function () { mctx.beginPath(); mctx.arc(px, py, 1.9, 0, 6.2832); },
              st.c, 2.2, a);
      } else if (st.mark === 1) {
        cased(mctx, function () { mctx.beginPath(); mctx.arc(px, py, 1.2, 0, 6.2832); },
              st.c, 1.6, a);
      }
      /* Only the two STRUCTURE rungs earn a direction cue. A note is
         information the player asked for; and a unit ping is one of a dozen
         in a real engagement, so a chevron each would put twelve arrows on a
         196px canvas for something whose marker is already drawn, in full, at
         its true position. */
      if (st.mark >= 2 && quad && quad.length === 4) edgeChevron(mctx, quad, px, py, st.c, a);
    }
    mctx.restore();
  }

  function drawMinimap(mm) {
    const mctx = mm.getContext("2d");
    const map = G.map, S = mm.width / map.W;
    /* the dome's picture needs the dome ON THE AIR, not only built and
       powered: switched off (G.setEmcon) it paints nothing (G.domeLit) */
    const domeUp = G.human.hasBuilding("radar") && G.human.powerRatio() >= 1;
    const hasRadar = domeUp && (!G.domeLit || G.domeLit(G.human));
    mctx.fillStyle = "#050705"; mctx.fillRect(0, 0, mm.width, mm.height);
    if (G._worldTex) {
      mctx.imageSmoothingEnabled = true;
      mctx.drawImage(G._worldTex, 0, 0, mm.width, mm.height);
    }
    if (G.fogEnabled && fogCache) mctx.drawImage(fogCache, 0, 0, mm.width, mm.height);
    /* emitters heard and not seen, under the dots (G.esmHeard) */
    drawHeardEmitters(mctx, S);
    /* entities as dots (radar shows enemies in explored area) */
    for (const e of G.entities) {
      if (e.dead || e.carried) continue;
      const own = e.owner === G.human;
      if (!own) {
        /* a boat held on sonar is a contact whether or not there is a radar
           dome and whether or not that water is fogged */
        if (e.layer === "sub") { if (!G.canSeeSub(G.human, e)) continue; }
        else if (!hasRadar) { if (!visible(e)) continue; }
        else if (G.fogEnabled && G.fog[e.ty * map.W + e.tx] === 0) continue;
      }
      /* OURS GREEN, AN ALLY ITS OWN COLOUR, EVERYONE ELSE RED. The slot list
         lets commanders share a team, and a red dot on a friendly tank is
         the one thing a minimap must never say. An ally's colour is the one
         it was given before the battle, so the dot and the tank agree. */
      mctx.fillStyle = own ? "#6fd06f"
        : G.allied(e.owner, G.human) ? ((e.owner.color && e.owner.color.main) || "#6fd06f")
        : "#e05545";
      const px = (e.x / CFG.TILE) * S, py = (e.y / CFG.TILE) * S;
      const sz = e.kind === "building" ? 3 : 2;
      mctx.fillRect(px - sz / 2, py - sz / 2, sz, sz);
    }
    /* view frustum */
    mctx.strokeStyle = "rgba(255,255,255,0.7)"; mctx.lineWidth = 1;
    const c0 = unproject(0, 0), c1 = unproject(W, 0), c2 = unproject(W, H), c3 = unproject(0, H);
    mctx.beginPath();
    mctx.moveTo(c0.x / CFG.TILE * S, c0.y / CFG.TILE * S);
    mctx.lineTo(c1.x / CFG.TILE * S, c1.y / CFG.TILE * S);
    mctx.lineTo(c2.x / CFG.TILE * S, c2.y / CFG.TILE * S);
    mctx.lineTo(c3.x / CFG.TILE * S, c3.y / CFG.TILE * S);
    mctx.closePath(); mctx.stroke();
    if (!hasRadar) {
      mctx.fillStyle = "rgba(0,0,0,0.25)"; mctx.fillRect(0, 0, mm.width, mm.height);
      mctx.fillStyle = "#4d6047"; mctx.font = "9px sans-serif"; mctx.textAlign = "center";
      mctx.fillText(G.human.hasBuilding("radar")
        ? (domeUp ? "RADAR OFF (EMCON)" : "RADAR OFFLINE — LOW POWER") : "NO RADAR", mm.width / 2, 12);
    }
    /* last, and over the low-power wash, for the reason given in
       drawMinimapFrom. This minimap never rotates, so its own frustum corners
       are the quad the chevron clips against. */
    drawEventMarkers(mctx, S, [
      { x: c0.x / CFG.TILE * S, y: c0.y / CFG.TILE * S },
      { x: c1.x / CFG.TILE * S, y: c1.y / CFG.TILE * S },
      { x: c2.x / CFG.TILE * S, y: c2.y / CFG.TILE * S },
      { x: c3.x / CFG.TILE * S, y: c3.y / CFG.TILE * S }]);
  }

  /* ---- services for the 3D renderer ---- */
  function getWorldTex(game) {
    G = game;
    if (!worldTex) buildWorldTexture();
    if (!oreTex) buildOreTexture();
    return { world: worldTex, ore: oreTex };
  }
  function refreshOre(game) { G = game; buildOreTexture(); }
  let mmFog = null;
  /* cached minimap ground layer; rebuilt only when the terrain changes */
  let mmBase = null, mmBaseDirty = true;

  function drawMinimapFrom(mm, game, quad, viewYaw) {
    G = game;
    const mctx = mm.getContext("2d");
    const map = G.map, S = mm.width / map.W;
    /* a dome switched off paints nothing: see drawMinimap */
    const domeUp = G.human.hasBuilding("radar") && G.human.powerRatio() >= 1;
    const hasRadar = domeUp && (!G.domeLit || G.domeLit(G.human));
    mctx.setTransform(1, 0, 0, 1, 0, 0);
    mctx.fillStyle = "#050705"; mctx.fillRect(0, 0, mm.width, mm.height);

    /* ---- orient the minimap to the view ----
       The battlefield is drawn from a rotating camera while the minimap is
       stored north-up, so at the default yaw "up the screen" came out as
       "down and left on the minimap" - which reads as the minimap being
       reversed. Rotating the minimap by the camera's heading keeps the two
       agreeing: what is above your units on screen is above them here. */
    let rot = 0;
    if (viewYaw !== undefined && viewYaw !== null) {
      rot = Math.PI / 2 - viewYaw;
      mctx.save();
      mctx.translate(mm.width / 2, mm.height / 2);
      mctx.rotate(rot);
      mctx.translate(-mm.width / 2, -mm.height / 2);
    }
    /* The ground comes from a cached thumbnail, not from rescaling the full
       world texture every frame. That texture is three thousand pixels square,
       and downscaling it sixty times a second was costing about 190ms per
       frame - on its own the reason the game ran at five. */
    if (!mmBase || mmBase.width !== mm.width || mmBaseDirty) {
      if (!mmBase) mmBase = document.createElement("canvas");
      mmBase.width = mm.width; mmBase.height = mm.height;
      const bc = mmBase.getContext("2d");
      bc.imageSmoothingEnabled = true;
      bc.clearRect(0, 0, mm.width, mm.height);
      if (G._worldTex) bc.drawImage(G._worldTex, 0, 0, mm.width, mm.height);
      mmBaseDirty = false;
    }
    mctx.drawImage(mmBase, 0, 0);

    if (G.fogEnabled) {
      /* the fog thumbnail is also rebuilt in place rather than reallocated */
      if (!mmFog) { mmFog = document.createElement("canvas"); mmFog.width = map.W; mmFog.height = map.H; }
      const fc = mmFog.getContext("2d");
      const img = fc.createImageData(map.W, map.H);
      for (let i = 0; i < map.W * map.H; i++) {
        const f = G.fog[i], o = i * 4;
        img.data[o] = 5; img.data[o + 1] = 8; img.data[o + 2] = 10;
        img.data[o + 3] = f === 2 ? 0 : f === 1 ? 120 : 238;
      }
      fc.putImageData(img, 0, 0);
      mctx.drawImage(mmFog, 0, 0, mm.width, mm.height);
    }
    for (const e of G.entities) {
      if (e.dead || e.carried) continue;
      const own = e.owner === G.human;
      if (!own) {
        if (e.layer === "sub") { if (!G.canSeeSub(G.human, e)) continue; }
        else if (!hasRadar) {
          if (G.fogEnabled && G.fog[e.ty * map.W + e.tx] !== 2) continue;
        } else if (G.fogEnabled && G.fog[e.ty * map.W + e.tx] === 0) continue;
      }
      /* ours green, an ally its own colour, everyone else red - see the
         note in drawMinimap above */
      mctx.fillStyle = own ? "#6fd06f"
        : G.allied(e.owner, G.human) ? ((e.owner.color && e.owner.color.main) || "#6fd06f")
        : "#e05545";
      const px = (e.x / CFG.TILE) * S, py = (e.y / CFG.TILE) * S;
      const sz = e.kind === "building" ? 3 : 2;
      mctx.fillRect(px - sz / 2, py - sz / 2, sz, sz);
    }
    /* Barriers and their contacts. Mines have never appeared on the minimap
       and still do not; a barrier does, because it is a thing the player put
       somewhere on purpose and then has to remember about while looking at the
       other side of the map - which is the entire reason to own one. Only what
       forRender lets this player see, so an enemy barrier appears here exactly
       when it has been detected and not before. */
    if (typeof SonarNet !== "undefined" && G.sonarnet && G.sonarnet.length) {
      for (const n of SonarNet.forRender(G, G.human)) {
        mctx.fillStyle = n.owner === G.human ? "#6fd0b0" : "#e0a045";
        mctx.fillRect((n.x / CFG.TILE) * S - 1, (n.y / CFG.TILE) * S - 1, 2, 2);
      }
    }
    if (typeof SonarNet !== "undefined" && G.sonarDatums) {
      for (const dt2 of SonarNet.datums(G, G.human)) {
        mctx.strokeStyle = "rgba(255,196,90,0.9)"; mctx.lineWidth = 1;
        mctx.beginPath();
        mctx.arc((dt2.x / CFG.TILE) * S, (dt2.y / CFG.TILE) * S, 3, 0, 7);
        mctx.stroke();
      }
    }
    /* and the emitters our ears hear that our eyes do not (G.esmHeard) */
    drawHeardEmitters(mctx, S);
    if (quad) {
      mctx.strokeStyle = "rgba(255,255,255,0.7)"; mctx.lineWidth = 1;
      mctx.beginPath();
      quad.forEach((q, i) => {
        const px = U.clamp(q.x / CFG.TILE, 0, map.W) * S, py = U.clamp(q.y / CFG.TILE, 0, map.H) * S;
        i === 0 ? mctx.moveTo(px, py) : mctx.lineTo(px, py);
      });
      mctx.closePath(); mctx.stroke();
    }
    /* the overlay text must not rotate with the map */
    if (viewYaw !== undefined && viewYaw !== null) mctx.restore();

    if (!hasRadar) {
      mctx.fillStyle = "rgba(0,0,0,0.25)"; mctx.fillRect(0, 0, mm.width, mm.height);
      mctx.fillStyle = "#4d6047"; mctx.font = "9px sans-serif"; mctx.textAlign = "center";
      mctx.fillText(G.human.hasBuilding("radar")
        ? (domeUp ? "RADAR OFF (EMCON)" : "RADAR OFFLINE") : "NO RADAR", mm.width / 2, 12);
    }
    /* ---- attack markers sit on top of EVERYTHING, the blackout included ----
       The wash above is 25% black. Drawing the warning underneath it took the
       marker from #ff3324 to #bf2620 and cost it most of its punch at the one
       moment it matters most - because the grid going down is very often the
       grid going down BECAUSE something is shelling the power plant. So the
       rotation is re-applied for this pass alone and the markers go last:
       three extra canvas state calls for a cue that must never be missed.
       Position still comes from the rotated frame, so each marker lands on
       the ground it refers to and the chevron still points where the camera
       has to go. */
    if (viewYaw !== undefined && viewYaw !== null) {
      mctx.save();
      mctx.translate(mm.width / 2, mm.height / 2);
      mctx.rotate(rot);
      mctx.translate(-mm.width / 2, -mm.height / 2);
    }
    /* UNCLAMPED, unlike the frustum outline above and unlike drawMinimap's
       corners: clamping each corner to the map box independently shrinks a
       rotated view below the ground that is actually on screen, and the
       chevron would then fire for an attack the player is already looking at.
       The two minimap paths now hand this the same thing. */
    drawEventMarkers(mctx, S, quad ? quad.map(function (q) {
      return { x: (q.x / CFG.TILE) * S, y: (q.y / CFG.TILE) * S };
    }) : null);
    if (viewYaw !== undefined && viewYaw !== null) mctx.restore();
  }

  return {
    init, resize, draw, drawMinimap, unproject, moveCam, setCam, zoom,
    get cam() { return cam; }, sx, sy,
    markDirty() { terrainDirty = true; mmBaseDirty = true; },
    getWorldTex, refreshOre, drawMinimapFrom,
    orderLines,          // the order-line list render3d.js draws as well
  };
})();
var Render2D = Render;
