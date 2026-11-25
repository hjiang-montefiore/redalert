#!/usr/bin/env node
/* ============ tools/model3d/render.js - a TRUE render of one model ============
   shot.py draws a dump with PIL: a texture is its mean colour, there is no
   tone mapping, and paint work is invisible. This renders the same model in
   headless Chromium (Playwright, SwiftShader WebGL) with the real
   three.min.js, the real materials and the real canvas textures, lit and
   tone-mapped the way js/render3d.js does, and measures how much detail the
   picture actually carries.

   usage
     node tools/model3d/render.js KEY TEAM OUT.png [options]
   options
     --root DIR        build KEY from another tree instead of this repo
     --before DIR      compare mode: KEY from DIR | KEY from the working tree,
                       one row per view, same framing, labelled, with the
                       triangle and draw-call counts and the detail ratio
     --extra FILE.js   a model file not in index.html yet (repeatable); loaded
                       after the index model scripts of the working tree (and
                       of --root; never of --before)
     --views LIST      comma list of views, in order (default side,top,front,game).
                       Named: side top front game rear under quarter rquarter;
                       free: az:A/el:E (degrees, see "The views" below), e.g.
                       --views side,game,az:200/el:20
     --view A,E        one more free view, azimuth A elevation E (repeatable).
                       Without --views, only the --view views are drawn.
     --size WxH        one panel, default 900x520
     --gear up|down|asbuilt   hide / show nodes named "gear" (default asbuilt)
     --ground Z|none|per   ground plane height in model metres. Default: 0 for
                       a ship; else the lower of 0 and the model's lowest
                       point, and in compare mode "per": EACH side stands on
                       its own ground at its own lowest point (labelled), so
                       an old model built below z 0 does not make the new one
                       look as if it floats. Never drawn in a view from below.
     --focus x0,y0,z0,x1,y1,z1   frame every view on this box (model metres):
                       a zoom on one part, at any view; the game view's as-played
                       inset is still the whole model
     --pitch DEG       stand the model DEG nose up about its Y axis (as a reference's pitch_deg)
     --hide A,B        hide the nodes with these names (as a reference's "hide")
     --raw --scale S --centre H,V
                       no sheet: one bare panel per view, OUT_<view>.png, model
                       alone on a transparent background at S px/m with the view
                       point (H, V) - the view's own axes, metres - in the panel's
                       middle (what overlay.py lays over a photograph)
     --as KEY          the unit-table key for category and as-played size, for
                       a model registered under another key (a wrapper);
                       without it a key that CONTAINS a unit key finds it
     --keep-open MS    debugging: leave the page up
   output
     OUT.png   the sheet.   OUT.json   per-view numbers (see README / below)

   What is the same as the game (js/render3d.js): three r148, ACES filmic
   tone mapping at exposure 1, sRGB output, the sky environment map built the
   same way (PMREM of the same gradient canvas), a 2.1 directional sun of
   0xfff0d8 at 50.7 deg elevation with PCF soft shadows, the 0.5 hemisphere
   light, prepModel's sRGB -> linear conversion of material colours and
   emissives and sRGB decoding of maps, vertex colours left as authored
   (linear), the builder called with the faction's main colour.
   What is not: no bloom, no fog, no weather, no era repaint (that only
   applies to stand-in models), and the sun's AZIMUTH. In the game the sun is
   fixed in the world and the unit turns; here the GAME and TOP views keep
   the game's angle between camera and sun (107 deg round from the camera),
   and the SIDE and FRONT views bring the sun round to 45 deg off the
   viewer's left shoulder, or the face being inspected would be in shadow.

   The views (model space +X nose, +Y left, +Z up), all orthographic. A view
   is an azimuth A, measured from the bow round toward PORT (0 = dead ahead,
   90 = port beam, 180 = dead astern, 270 or -90 = starboard beam), and an
   elevation E above the horizon (90 = straight down, -90 = straight up).
     side     A -90, E 0     from starboard, nose to the right
     top      A -90, E 90    from above, nose to the right, port side up
     front    A 0,   E 0     from dead ahead
     rear     A 180, E 0     from dead astern (port on the left)
     under    A -90, E -90   from below, nose to the right, STARBOARD up
     quarter  A -45, E 12    starboard bow quarter from eye height
     rquarter A -135, E 15   starboard stern quarter
     game     A 35,  E 49.3  the RTS camera's pitch (0.86 rad) off the port
              bow. The game camera is a 40 deg perspective lens a few
              hundred metres away, which over one unit is orthographic to
              within a per cent.
     az:A/el:E   any other. Screen right is the horizontal direction 90 deg
              clockwise of the line of sight seen from above.
   Views from below the horizon (E < 0) leave the ground out, and from below
   -20 deg the sun is turned to shine from underneath (an inspection light:
   the game never lights a belly like that).
   The model's own root transform is kept: the stand-up turn is put on a
   group around it (the game's render3d getModel sets rotation.x on the root
   itself, so a root rotation is lost there; OUT.json says when there is one).
   The game panel carries an inset, "as played": the model at the pixel size
   it has on a 1080-line screen at the game's opening zoom (cam.dist 430),
   magnified x3 with no smoothing. Its numbers are the honest ones for "can
   the player see it".

   Numbers per view (OUT.json views.<name>):
     px_per_m      scale of the panel
     model_px      pixels the model covers
     sobel_mean    mean Sobel gradient magnitude of luminance (0..255 scale,
                   3x3 kernel, /4) over the model's INTERIOR pixels - the
                   outline against the ground is excluded, so this is
                   surface detail, not silhouette
     edge_share    share of interior pixels whose gradient is above 24
     regions       connected regions of near-uniform colour (neighbours join
                   when no channel differs by more than 10) of at least
                   region_min_px pixels: panels, bands, windows, parts
   and for the scene: triangles and draw calls as renderer.info counted them
   for the model alone (no ground, no shadow pass).
   ========================================================================== */
"use strict";
const fs = require("fs"), path = require("path"), http = require("http");

const STOP = /(^|\/)(bloom3d|fx3d|render3d|icons3d|ui|save|game|loading|main|gallery)\.js$/;
const SKIP = /(^|\/)(audio|mapedit)\.js$/;
const MIME = { ".js": "application/javascript", ".html": "text/html", ".png": "image/png", ".jpg": "image/jpeg",
               ".json": "application/json", ".css": "text/css", ".svg": "image/svg+xml" };

function parseArgs(argv) {
  const o = { extra: [], views: null, view: [], size: [900, 520], gear: "asbuilt", ground: null, pos: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--root") o.root = argv[++i];
    else if (a === "--before") o.before = argv[++i];
    else if (a === "--extra") o.extra.push(path.resolve(argv[++i]));
    else if (a === "--views") o.views = argv[++i].split(",").filter(Boolean);
    else if (a === "--view") o.view.push(argv[++i]);
    else if (a === "--as") o.as = argv[++i];
    else if (a === "--focus") o.focus = argv[++i].split(",").map(Number);
    else if (a === "--pitch") o.pitch = +argv[++i];
    else if (a === "--hide") o.hide = argv[++i].split(",").filter(Boolean);
    else if (a === "--raw") o.raw = true;
    else if (a === "--scale") o.scale = +argv[++i];
    else if (a === "--centre" || a === "--center") o.centre = argv[++i].split(",").map(Number);
    else if (a === "--size") o.size = argv[++i].split("x").map(Number);
    else if (a === "--gear") o.gear = argv[++i];
    else if (a === "--ground") o.ground = argv[++i];
    else if (a === "--keep-open") o.keepOpen = +argv[++i];
    else if (a === "-h" || a === "--help") o.help = true;
    else o.pos.push(a);
  }
  if (!o.views) o.views = o.view.length ? [] : ["side", "top", "front", "game"];
  o.view.forEach(v => { const m = String(v).split(","); o.views.push("az:" + m[0] + "/el:" + (m[1] == null ? 0 : m[1])); });
  return o;
}

/* a view token -> { n (name), label, az, el, r, u, t } (model-space screen right, up, toward the viewer) */
const NAMED = {
  side:     { az: -90,  el: 0,    label: "SIDE - from starboard, nose right",
              r: [1, 0, 0], u: [0, 0, 1], t: [0, -1, 0] },
  top:      { az: -90,  el: 90,   label: "TOP - nose right, port up",
              r: [1, 0, 0], u: [0, 1, 0], t: [0, 0, 1] },
  front:    { az: 0,    el: 0,    label: "FRONT - from dead ahead",
              r: [0, 1, 0], u: [0, 0, 1], t: [1, 0, 0] },
  rear:     { az: 180,  el: 0,    label: "REAR - from dead astern, port left",
              r: [0, -1, 0], u: [0, 0, 1], t: [-1, 0, 0] },
  under:    { az: -90,  el: -90,  label: "UNDER - from below, nose right, starboard up",
              r: [1, 0, 0], u: [0, -1, 0], t: [0, 0, -1] },
  quarter:  { az: -45,  el: 12,   label: "QUARTER - starboard bow, az -45 el 12" },
  rquarter: { az: -135, el: 15,   label: "REAR QUARTER - starboard stern, az -135 el 15" },
  game:     { az: 35,   el: 49.3, label: "GAME CAMERA (35 az, 49.3 el)" },
};
function viewSpec(tok) {
  let v;
  if (NAMED[tok]) v = Object.assign({ n: tok }, NAMED[tok]);
  else {
    const m = String(tok).match(/^az:?(-?[\d.]+)[\/,_]el:?(-?[\d.]+)$/i);
    if (!m) throw new Error("unknown view '" + tok + "' (named: " + Object.keys(NAMED).join(" ") + "; or az:A/el:E)");
    const az = +m[1], el = +m[2];
    v = { n: "az" + az + "_el" + el, az, el, label: "AZ " + az + " / EL " + el + " (az from the bow toward port)" };
  }
  if (!v.t) {
    const a = v.az * Math.PI / 180, e = v.el * Math.PI / 180;
    const t = [Math.cos(e) * Math.cos(a), Math.cos(e) * Math.sin(a), Math.sin(e)];
    const r = [-Math.sin(a), Math.cos(a), 0];
    const u = [t[1] * r[2] - t[2] * r[1], t[2] * r[0] - t[0] * r[2], t[0] * r[1] - t[1] * r[0]];
    const cl = (x) => Math.abs(x) < 1e-12 ? 0 : x;
    v.t = t.map(cl); v.r = r.map(cl); v.u = u.map(cl);
  }
  return v;
}
const USAGE = "usage: node tools/model3d/render.js KEY TEAM OUT.png [--root DIR] [--before DIR] [--extra FILE]... " +
              "[--views side,top,front,game,rear,under,quarter,rquarter,az:A/el:E] [--view A,E]... [--size 900x520] " +
              "[--gear up|down|asbuilt] [--ground Z|none|per] [--as UNITKEY]";

function scriptsOf(root) {
  let html;
  try { html = fs.readFileSync(path.join(root, "index.html"), "utf8"); }
  catch (e) { throw new Error("cannot read " + root + "/index.html - is it a repo checkout?"); }
  const re = /<script\b[^>]*\bsrc\s*=\s*["']([^"'?]+)(?:\?[^"']*)?["'][^>]*>/gi, list = [];
  let m;
  while ((m = re.exec(html))) {
    if (STOP.test(m[1])) break;
    if (SKIP.test(m[1])) continue;
    list.push(m[1]);
  }
  return list;
}

/* ------------------------------------------------------------- the page
   Everything between the markers runs in the browser. */
function pageMain() {
  /* global THREE, UNIT_MODELS, Models3D, CFG, UNITS, Unit */
  const P = window.__P, errs = window.__errs;
  const out = { errors: errs };
  function teamColor(team) {
    if (/^#?[0-9a-f]{6}$/i.test(team)) return team.charAt(0) === "#" ? team : "#" + team;
    if (typeof CFG !== "undefined" && CFG.FACTION_COLORS && CFG.FACTION_COLORS[team]) return CFG.FACTION_COLORS[team].main;
    throw new Error("unknown team '" + team + "'");
  }
  /* model (x, y, z-up) -> three (x, y-up, z), the turn render3d gives every unit */
  const M2T = (v) => new THREE.Vector3(v[0], v[2], -v[1]);
  let renderer, scene, sun, hemi, wrap, model, ground, cv, info = {};

  window.__build = function () {
    if (typeof THREE === "undefined") throw new Error("three.min.js did not load");
    const entry = (typeof UNIT_MODELS !== "undefined" ? UNIT_MODELS : {})[P.key];
    if (!entry || typeof entry.build !== "function") {
      const near = Object.keys(typeof UNIT_MODELS !== "undefined" ? UNIT_MODELS : {})
        .filter(k => k.indexOf(P.key) >= 0 || P.key.indexOf(k) >= 0).slice(0, 8);
      throw new Error("no UNIT_MODELS['" + P.key + "'] in " + P.label + (near.length ? " - near: " + near.join(", ") : ""));
    }
    const teamHex = teamColor(P.team);
    const t0 = performance.now();
    model = entry.build(THREE, typeof Models3D !== "undefined" ? Models3D : undefined, { team: teamHex });
    info.buildMs = Math.round(performance.now() - t0);
    if (!model || !model.isObject3D) throw new Error(P.key + ".build returned " + model + ", not an Object3D");
    {
      const r = model.rotation, p = model.position, s = model.scale;
      if (Math.abs(r.x) + Math.abs(r.y) + Math.abs(r.z) > 1e-6 || Math.abs(p.x) + Math.abs(p.y) + Math.abs(p.z) > 1e-6 ||
          Math.abs(s.x - 1) + Math.abs(s.y - 1) + Math.abs(s.z - 1) > 1e-6)
        info.rootTransform = { rotation: [r.x, r.y, r.z], position: [p.x, p.y, p.z], scale: [s.x, s.y, s.z],
          note: "kept here; the game's render3d getModel overwrites the root's rotation.x" };
    }
    info.teamHex = teamHex; info.len = entry.len || null;
    if (P.gear === "up" || P.gear === "down")
      model.traverse(o => { if (o.name === "gear") o.visible = P.gear === "down"; });
    if (P.hide && P.hide.length) model.traverse(o => { if (P.hide.indexOf(o.name) >= 0) o.visible = false; });
    if (P.pitch) {
      /* nose up by P.pitch degrees about the model's Y axis through the origin (model space z-up) */
      const g = new THREE.Group(); g.rotation.y = -P.pitch * Math.PI / 180; g.add(model); model = g;
    }
    /* render3d prepModel, verbatim */
    model.traverse(o => {
      if (!o.isMesh) return;
      o.castShadow = true; o.receiveShadow = true;
      const list = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of list) {
        if (!m || !m.userData || m.userData._srgbDone) continue;
        m.userData._srgbDone = true;
        if (m.color) m.color.convertSRGBToLinear();
        if (m.emissive) m.emissive.convertSRGBToLinear();
        if (m.map) m.map.encoding = THREE.sRGBEncoding;
      }
    });
    model.updateMatrixWorld(true);
    /* the visible box, by vertex, in model space */
    const box = new THREE.Box3(), v = new THREE.Vector3();
    let meshes = 0, mats = new Set(), texs = new Set();
    /* and its extent on each view's screen axes, so a panel is framed on
       what the view shows, not on the corners of the box */
    const VB = P.views.map(vs => ({ n: vs.n, B: vs, r: [Infinity, -Infinity], u: [Infinity, -Infinity] }));
    model.traverseVisible(o => {
      if (!o.isMesh || !o.geometry || !o.geometry.attributes.position) return;
      meshes++;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { if (m) { mats.add(m.uuid); if (m.map) texs.add(m.map.uuid); } });
      const pa = o.geometry.attributes.position;
      for (let i = 0; i < pa.count; i++) {
        box.expandByPoint(v.fromBufferAttribute(pa, i).applyMatrix4(o.matrixWorld));
        for (const e of VB) {
          const a = v.x * e.B.r[0] + v.y * e.B.r[1] + v.z * e.B.r[2], b = v.x * e.B.u[0] + v.y * e.B.u[1] + v.z * e.B.u[2];
          if (a < e.r[0]) e.r[0] = a; if (a > e.r[1]) e.r[1] = a; if (b < e.u[0]) e.u[0] = b; if (b > e.u[1]) e.u[1] = b;
        }
      }
    });
    info.ext = {}; VB.forEach(e => { info.ext[e.n] = { r: e.r, u: e.u }; });
    if (box.isEmpty()) throw new Error(P.key + " built no visible geometry");
    info.bbox = { min: box.min.toArray(), max: box.max.toArray() };
    info.meshes = meshes; info.materials = mats.size; info.textures = texs.size;
    /* the unit row: --as, the key itself, or the longest unit key the key contains (a wrapper) */
    let ukey = P.as || P.key, def = typeof UNITS !== "undefined" ? UNITS[ukey] : null;
    if (!def && typeof UNITS !== "undefined" && !P.as) {
      let best = null;
      for (const k in UNITS) if (k.length > 3 && P.key.indexOf(k) >= 0 && (!best || k.length > best.length)) best = k;
      if (best) { ukey = best; def = UNITS[best]; }
    }
    info.unitKey = def ? ukey : null;
    info.cat = def ? def.cat : null; info.layer = def ? def.layer : null;
    /* how long it is on screen in the game: render3d getModel's targetLen
       (world units) through a 40 deg lens at cam.dist, on 1080 lines */
    let play = null;
    try {
      if (def && typeof CFG !== "undefined") {
        const PXM = 0.625, S = CFG.MODEL_SCALE || 1.4;
        let tl;
        if (def.cat === "infantry") tl = 4.6 * (CFG.MODEL_SCALE_INF || 1);
        else if (def.cat === "naval") {
          tl = def.r * 2.1 * PXM * 1.9 * S;
          if (def.layer === "sub" && (entry.len || 0) > 20) tl = (entry.len / 110) * 17 * 2.1 * PXM * 1.9 * S;
          if (typeof Unit !== "undefined" && Unit.navalDraw) tl *= Unit.navalDraw(def);
        } else if (def.cat === "aircraft") tl = def.r * 2.1 * PXM * 1.22 * S;
        else tl = def.r * 2.1 * PXM * S;
        const pxPerWorld = 1080 / (2 * Math.tan(20 * Math.PI / 180));
        play = { world_len: +tl.toFixed(2), px_at_430: +(tl * pxPerWorld / 430).toFixed(1), px_at_130: +(tl * pxPerWorld / 130).toFixed(1) };
      }
    } catch (e) { errs.push("play size: " + e.message); }
    info.play = play;
    return info;
  };

  function setup(frame) {
    cv = document.createElement("canvas");
    renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, preserveDrawingBuffer: true, stencil: false, depth: true });
    renderer.setPixelRatio(1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    scene = new THREE.Scene();
    /* the sky environment, as render3d builds it */
    const envCv = document.createElement("canvas"); envCv.width = 512; envCv.height = 256;
    const eg = envCv.getContext("2d");
    const grad = eg.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#7fa3cc"); grad.addColorStop(0.42, "#a8bfd4");
    grad.addColorStop(0.52, "#cdd8de"); grad.addColorStop(0.56, "#8b9a90");
    grad.addColorStop(0.62, "#46523f"); grad.addColorStop(1, "#20261f");
    eg.fillStyle = grad; eg.fillRect(0, 0, 512, 256);
    for (let ci = 0; ci < 9; ci++) {
      const cx2 = (ci * 73 + 30) % 512, cy2 = 55 + (ci * 37) % 55, cr = 16 + (ci * 13) % 22;
      eg.fillStyle = "rgba(235,240,245," + (0.25 + (ci % 3) * 0.12) + ")";
      eg.beginPath(); eg.ellipse(cx2, cy2, cr * 1.9, cr * 0.55, 0, 0, 7); eg.fill();
    }
    const envTex = new THREE.CanvasTexture(envCv);
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    envTex.encoding = THREE.sRGBEncoding;
    scene.environment = new THREE.PMREMGenerator(renderer).fromEquirectangular(envTex).texture;
    sun = new THREE.DirectionalLight(0xfff0d8, 2.1);
    sun.color.set(0xfff0d8).convertSRGBToLinear();        /* render3d applyWeather "clear" */
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    scene.add(sun); scene.add(sun.target);
    hemi = new THREE.HemisphereLight(0x93a8c0, 0x2c332b, 0.5);
    scene.add(hemi);
    wrap = new THREE.Group();
    /* the stand-up turn goes on a group of its own: the model's root keeps its own transform */
    const turn = new THREE.Group();
    turn.rotation.x = -Math.PI / 2;
    turn.add(model); wrap.add(turn); scene.add(wrap);
    /* neutral ground: a slab whose top is the ground plane, so the level
       views show it as a band under the model */
    const R = frame.radius;
    if (frame.ground != null) {
      ground = new THREE.Mesh(new THREE.BoxGeometry(R * 8, R * 8, R * 8),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(0x8a8f8c).convertSRGBToLinear(), roughness: 0.95, metalness: 0, envMapIntensity: 0.25 }));
      ground.position.set(frame.c[0], frame.ground - R * 4, -frame.c[1]);
      ground.receiveShadow = true;
      scene.add(ground);
    }
    scene.updateMatrixWorld(true);
  }

  function measure(px, mask, W, H, minArea) {
    /* px: RGBA of the lit frame, mask: RGBA of the model-alone frame (alpha) */
    const n = W * H, inM = new Uint8Array(n), lum = new Float32Array(n);
    let cover = 0;
    for (let i = 0; i < n; i++) {
      if (mask[i * 4 + 3] > 8) { inM[i] = 1; cover++; }
      lum[i] = 0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2];
    }
    let sum = 0, cnt = 0, strong = 0;
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
      const i = y * W + x;
      if (!inM[i]) continue;
      if (!(inM[i - 1] && inM[i + 1] && inM[i - W] && inM[i + W] && inM[i - W - 1] && inM[i - W + 1] && inM[i + W - 1] && inM[i + W + 1])) continue;
      const gx = (lum[i - W + 1] + 2 * lum[i + 1] + lum[i + W + 1]) - (lum[i - W - 1] + 2 * lum[i - 1] + lum[i + W - 1]);
      const gy = (lum[i + W - 1] + 2 * lum[i + W] + lum[i + W + 1]) - (lum[i - W - 1] + 2 * lum[i - W] + lum[i - W + 1]);
      const g = Math.sqrt(gx * gx + gy * gy) / 4;
      sum += g; cnt++; if (g > 24) strong++;
    }
    /* regions: union-find over model pixels, joining like-coloured neighbours */
    const par = new Int32Array(n);
    for (let i = 0; i < n; i++) par[i] = i;
    const find = (a) => { while (par[a] !== a) { par[a] = par[par[a]]; a = par[a]; } return a; };
    const T = 10;
    const like = (a, b) => Math.abs(px[a * 4] - px[b * 4]) <= T && Math.abs(px[a * 4 + 1] - px[b * 4 + 1]) <= T && Math.abs(px[a * 4 + 2] - px[b * 4 + 2]) <= T;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (!inM[i]) continue;
      if (x + 1 < W && inM[i + 1] && like(i, i + 1)) { const a = find(i), b = find(i + 1); if (a !== b) par[a] = b; }
      if (y + 1 < H && inM[i + W] && like(i, i + W)) { const a = find(i), b = find(i + W); if (a !== b) par[a] = b; }
    }
    const size = new Map();
    for (let i = 0; i < n; i++) if (inM[i]) { const r = find(i); size.set(r, (size.get(r) || 0) + 1); }
    let regions = 0;
    size.forEach(s => { if (s >= minArea) regions++; });
    return { model_px: cover, interior_px: cnt, sobel_mean: cnt ? +(sum / cnt).toFixed(3) : 0,
             edge_share: cnt ? +(strong / cnt).toFixed(4) : 0, regions: regions, region_min_px: minArea };
  }

  function basis(view) {
    const v = P.views.filter(x => x.n === view)[0];
    if (!v) throw new Error("view " + view + " was not set up");
    return v;
  }
  /* the sun, in model space, for a view: elevation as the game's (asin 0.774);
     azimuth relative to the camera as documented at the top of render.js */
  function sunDir(view, B) {
    const el = Math.asin(0.774), ce = Math.cos(el);
    let camAz, rel;
    if (view === "game") { camAz = 35 * Math.PI / 180; rel = 107 * Math.PI / 180; }
    else if (view === "top") { camAz = -Math.PI / 4; rel = 107 * Math.PI / 180; }
    else if (Math.abs(B.t[2]) > 0.999) { camAz = B.az * Math.PI / 180; rel = 45 * Math.PI / 180; }
    else { camAz = Math.atan2(B.t[1], B.t[0]); rel = 45 * Math.PI / 180; }
    /* "rel round from the camera, to the viewer's left": for a viewer looking along -t, left is -r */
    const az = camAz - rel;
    /* from well below: an inspection light from underneath */
    const up = (B.el != null && B.el < -20) ? -1 : 1;
    return [ce * Math.cos(az), ce * Math.sin(az), up * Math.sin(el)];
  }
  function extentAlong(box, d) {
    let lo = Infinity, hi = -Infinity;
    for (let i = 0; i < 8; i++) {
      const p = [i & 1 ? box.max[0] : box.min[0], i & 2 ? box.max[1] : box.min[1], i & 4 ? box.max[2] : box.min[2]];
      const s = p[0] * d[0] + p[1] * d[1] + p[2] * d[2];
      if (s < lo) lo = s; if (s > hi) hi = s;
    }
    return [lo, hi];
  }

  function shoot(view, W, H, frame, pxPerM, wantImage, shiftPx) {
    const B = basis(view), R = frame.radius, c = frame.c;
    const halfW = W / 2 / pxPerM, halfH = H / 2 / pxPerM;
    const sh = (shiftPx || 0) / pxPerM;      /* slide the model right by shiftPx: room for the inset */
    const cam = new THREE.OrthographicCamera(-halfW - sh, halfW - sh, halfH, -halfH, 0.1, R * 12);
    /* centre the frame box in the panel */
    const er = frame.ext[view].r, eu = frame.ext[view].u;
    const fc = frame.centre && frame.centre[view];
    const cr = fc ? fc[0] : (er[0] + er[1]) / 2, cu = fc ? fc[1] : (eu[0] + eu[1]) / 2, ct = c[0] * B.t[0] + c[1] * B.t[1] + c[2] * B.t[2];
    const centre = [B.r[0] * cr + B.u[0] * cu + B.t[0] * ct, B.r[1] * cr + B.u[1] * cu + B.t[1] * ct, B.r[2] * cr + B.u[2] * cu + B.t[2] * ct];
    const eye = [centre[0] + B.t[0] * R * 5, centre[1] + B.t[1] * R * 5, centre[2] + B.t[2] * R * 5];
    cam.position.copy(M2T(eye)); cam.up.copy(M2T(B.u)); cam.lookAt(M2T(centre)); cam.updateMatrixWorld(true);
    const sd = sunDir(view, B);
    sun.position.copy(M2T([c[0] + sd[0] * R * 6, c[1] + sd[1] * R * 6, c[2] + sd[2] * R * 6]));
    sun.target.position.copy(M2T(c)); sun.target.updateMatrixWorld();
    const sc = sun.shadow.camera;
    sc.left = -R * 1.6; sc.right = R * 1.6; sc.top = R * 1.6; sc.bottom = -R * 1.6; sc.near = R; sc.far = R * 11;
    sc.updateProjectionMatrix();
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = R * 0.004;
    renderer.setSize(W, H, false);
    const gl = renderer.getContext();
    /* A: the picture - ground, shadows, a neutral backdrop */
    if (ground) ground.visible = !(B.el != null && B.el < 0);
    scene.background = new THREE.Color(0xb9c0c6);
    renderer.shadowMap.autoUpdate = true; renderer.shadowMap.needsUpdate = true;
    renderer.render(scene, cam);
    const a = new Uint8Array(W * H * 4);
    gl.readPixels(0, 0, W, H, gl.RGBA, gl.UNSIGNED_BYTE, a);
    let url = null;
    if (wantImage) {
      const c2 = document.createElement("canvas"); c2.width = W; c2.height = H;
      c2.getContext("2d").drawImage(cv, 0, 0);
      url = c2.toDataURL("image/png");
    }
    /* B: the model alone on clear, shadow map left as it is: its alpha is
       the mask, and renderer.info counts the model's own draw calls */
    if (ground) ground.visible = false;
    scene.background = null; renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.autoUpdate = false;
    renderer.render(scene, cam);
    const calls = renderer.info.render.calls, tris = renderer.info.render.triangles;
    const b = new Uint8Array(W * H * 4);
    gl.readPixels(0, 0, W, H, gl.RGBA, gl.UNSIGNED_BYTE, b);
    let urlB = null;
    if (frame.raw) {
      const c3 = document.createElement("canvas"); c3.width = W; c3.height = H;
      c3.getContext("2d").drawImage(cv, 0, 0);
      urlB = c3.toDataURL("image/png");
    }
    const m = measure(a, b, W, H, Math.max(4, Math.round(W * H * 0.00003)));
    m.px_per_m = +pxPerM.toFixed(3); m.draw_calls = calls; m.triangles = tris;
    return { url, urlB, m };
  }

  window.__render = function (opts) {
    /* opts: { views, W, H, box:{min,max} (framing, shared in compare mode), ground } */
    const box = opts.box, c = [(box.min[0] + box.max[0]) / 2, (box.min[1] + box.max[1]) / 2, (box.min[2] + box.max[2]) / 2];
    const radius = 0.5 * Math.hypot(box.max[0] - box.min[0], box.max[1] - box.min[1], box.max[2] - box.min[2]);
    const frame = { box, c, radius, ground: opts.ground, ext: opts.ext, raw: !!opts.raw, centre: opts.centre || null };
    ground = null;
    setup(frame);
    const res = { views: {}, images: {} };
    for (const view of opts.views) {
      const er = opts.ext[view].r, eu = opts.ext[view].u;
      if (opts.raw) {
        /* a bare panel at a given scale and centre, model alone on a clear background: for overlay.py */
        const s = shoot(view, opts.W, opts.H, frame, opts.scale, false);
        res.views[view] = s.m; res.images[view] = s.urlB;
        continue;
      }
      if (view !== "game") {
        const pxPerM = Math.min(opts.W * 0.90 / (er[1] - er[0]), opts.H * 0.84 / (eu[1] - eu[0]));
        const s = shoot(view, opts.W, opts.H, frame, pxPerM, true);
        res.views[view] = s.m; res.images[view] = s.url;
        continue;
      }
      /* as played: the model's length drawn at its in-game pixel size */
      const lenM = box.max[0] - box.min[0];
      const px = opts.playPx || 120, ppm = px / lenM;
      const w = Math.max(48, Math.ceil((er[1] - er[0]) * ppm * 1.12 / 4) * 4), h = Math.max(32, Math.ceil((eu[1] - eu[0]) * ppm * 1.15 / 4) * 4);
      const p = shoot("game", w, h, frame, ppm, true);
      p.m.len_px = +px.toFixed(1); p.m.w = w; p.m.h = h;
      let k = 3;
      while (k > 1 && (w * k > opts.W * 0.36 || h * k > opts.H * 0.62)) k--;
      p.m.inset_k = k;
      res.views.play = p.m; res.images.play = p.url;
      /* the panel proper, in the room the inset leaves */
      const reserve = Math.min(opts.W * 0.5, w * k + 24);
      const pxPerM = Math.min((opts.W - reserve) * 0.92 / (er[1] - er[0]), opts.H * 0.86 / (eu[1] - eu[0]));
      const s = shoot("game", opts.W, opts.H, frame, pxPerM, true, reserve / 2);
      res.views.game = s.m; res.images.game = s.url;
    }
    res.triangles = res.views[opts.views[0]].triangles;
    res.draw_calls = res.views[opts.views[0]].draw_calls;
    res.programs = renderer.info.programs ? renderer.info.programs.length : null;
    res.gl = (function () { const g = renderer.getContext(), e = g.getExtension("WEBGL_debug_renderer_info");
      return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : g.getParameter(g.RENDERER); })();
    return res;
  };

  /* the sheet: panels with labels, drawn on one 2D canvas */
  window.__compose = async function (S) {
    const load = (u) => new Promise((ok, bad) => { const im = new Image(); im.onload = () => ok(im); im.onerror = bad; im.src = u; });
    const cols = S.cols, rows = S.rows, W = S.W, H = S.H, HEAD = 34 + 20 * S.head.length, CAP = 40, PAD = 8;
    const c = document.createElement("canvas");
    c.width = cols * W + (cols + 1) * PAD; c.height = HEAD + rows * (H + CAP + PAD) + PAD;
    const g = c.getContext("2d");
    g.fillStyle = "#1b1f23"; g.fillRect(0, 0, c.width, c.height);
    g.textBaseline = "top";
    g.fillStyle = "#f2f4f5"; g.font = "bold 20px DejaVu Sans, Arial, sans-serif"; g.fillText(S.title, PAD, 8);
    g.font = "14px DejaVu Sans Mono, monospace"; g.fillStyle = "#c4ccd2";
    S.head.forEach((t, i) => g.fillText(t, PAD, 34 + i * 20));
    for (const cell of S.cells) {
      const x = PAD + cell.col * (W + PAD), y = HEAD + cell.row * (H + CAP + PAD);
      const im = await load(cell.url);
      g.drawImage(im, x, y, W, H);
      /* scale bar */
      if (cell.px_per_m) {
        let step = 1; const want = 110 / cell.px_per_m;
        for (const s of [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100]) { step = s; if (s >= want) break; }
        const bw = step * cell.px_per_m, bx = x + W - bw - 14, by = y + H - 18;
        g.fillStyle = "#101214"; g.fillRect(bx, by, bw, 4); g.fillRect(bx, by - 4, 2, 12); g.fillRect(bx + bw - 2, by - 4, 2, 12);
        g.font = "12px DejaVu Sans Mono, monospace"; g.textAlign = "right"; g.fillText(step + " m", bx + bw, by - 18); g.textAlign = "left";
      }
      if (cell.inset) {
        const pi = await load(cell.inset.url), k = cell.inset.k, iw = pi.width * k, ih = pi.height * k;
        const ix = x + 10, iy = y + H - ih - 10;
        g.imageSmoothingEnabled = false;
        g.font = "12px DejaVu Sans Mono, monospace";
        g.fillStyle = "#101214"; g.fillRect(ix - 2, iy - 20, Math.max(iw, g.measureText(cell.inset.label).width + 4) + 4, 20); g.fillRect(ix - 2, iy - 2, iw + 4, ih + 4);
        g.drawImage(pi, ix, iy, iw, ih);
        g.imageSmoothingEnabled = true;
        g.fillStyle = "#f2f4f5"; g.font = "12px DejaVu Sans Mono, monospace"; g.fillText(cell.inset.label, ix + 2, iy - 16);
      }
      g.fillStyle = "#f2f4f5"; g.font = "bold 14px DejaVu Sans, Arial, sans-serif"; g.fillText(cell.title, x + 2, y + H + 4);
      g.fillStyle = cell.warn ? "#ffb347" : "#aab4bb"; g.font = "13px DejaVu Sans Mono, monospace"; g.fillText(cell.caption, x + 2, y + H + 22);
    }
    return c.toDataURL("image/png");
  };
}

function pageHtml(P, scripts) {
  const tags = scripts.map(s => '<script src="' + s + '" onerror="__errs.push(\'failed to load ' + s.replace(/'/g, "") + '\')"></script>').join("\n");
  return "<!doctype html><html><head><meta charset=\"utf-8\"><title>model3d render</title></head><body>\n<script>\n" +
    "window.__errs=[];window.__P=" + JSON.stringify(P) + ";\n" +
    "window.addEventListener('error',function(e){__errs.push((e.message||'error')+' @ '+String(e.filename||'').split('/').slice(-2).join('/')+':'+e.lineno);});\n" +
    /* nothing ticks: no game loop, no timers that outlive the load */
    "window.requestAnimationFrame=function(){return 0;};window.cancelAnimationFrame=function(){};\n" +
    "window.setInterval=function(){return 0;};\n" +
    "</script>\n" + tags + "\n<script>(" + pageMain.toString() + ")();window.__ready=true;</script>\n</body></html>";
}

function serve(mounts, pages) {
  const srv = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    if (pages[url]) { res.writeHead(200, { "Content-Type": "text/html" }); res.end(pages[url]); return; }
    const m = url.match(/^\/([a-z0-9]+)\/(.*)$/);
    if (!m || !mounts[m[1]]) { res.writeHead(404); res.end("no"); return; }
    const mount = mounts[m[1]];
    let file;
    if (mount.files) file = mount.files[m[2]];
    else {
      file = path.normalize(path.join(mount.dir, m[2]));
      if (file.indexOf(path.resolve(mount.dir) + path.sep) !== 0) file = null;
    }
    if (!file) { res.writeHead(404); res.end("no"); return; }
    fs.readFile(file, (err, buf) => {
      if (err) { res.writeHead(404); res.end("not found"); return; }
      res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
      res.end(buf);
    });
  });
  return new Promise(ok => srv.listen(0, "127.0.0.1", () => ok(srv)));
}

async function main() {
  const o = parseArgs(process.argv.slice(2));
  if (o.help || o.pos.length < 3) { console.log(USAGE); process.exit(o.help ? 0 : 2); }
  const [key, team, outPng] = o.pos;
  if (!/\.png$/i.test(outPng)) throw new Error("OUT must end in .png (got " + outPng + ")");
  const VS = o.views.map(viewSpec);
  { const seen = {}; VS.forEach(v => { if (seen[v.n]) throw new Error("view " + v.n + " twice"); seen[v.n] = 1; }); }
  o.views = VS.map(v => v.n);
  const repo = path.resolve(__dirname, "..", "..");
  const T0 = Date.now();
  /* the sides: one (plain) or two (compare) */
  const sides = [];
  if (o.before) sides.push({ id: "b", label: "BEFORE", dir: path.resolve(o.before), extra: [] });
  sides.push({ id: "a", label: o.before ? "AFTER" : "", dir: path.resolve(o.root || repo), extra: o.extra });
  const mounts = { x: { files: {} } }, pages = {};
  o.extra.forEach((f, i) => { if (!fs.existsSync(f)) throw new Error("--extra " + f + " not found"); mounts.x.files[i + ".js"] = f; });
  for (const s of sides) {
    mounts[s.id] = { dir: s.dir };
    const scripts = scriptsOf(s.dir).map(p => "/" + s.id + "/" + p).concat(s.extra.map((f, i) => "/x/" + i + ".js"));
    pages["/page_" + s.id] = pageHtml({ key, team, label: s.dir, gear: o.gear, views: VS, as: o.as || null,
                                        pitch: o.pitch || 0, hide: o.hide || [] }, scripts);
  }
  pages["/blank"] = "<!doctype html><html><body><script>window.__errs=[];window.__P={};(" + pageMain.toString() + ")();</script></body></html>";
  const srv = await serve(mounts, pages);
  const base = "http://127.0.0.1:" + srv.address().port;
  const { chromium } = require("playwright");
  const browser = await chromium.launch({ args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"] });
  let code = 0;
  try {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
    for (const s of sides) {
      s.page = await ctx.newPage();
      s.console = [];
      s.page.on("console", m => { if (m.type() === "error") s.console.push(m.text()); });
      s.page.on("pageerror", e => s.console.push(String(e.message || e)));
      const t = Date.now();
      await s.page.goto(base + "/page_" + s.id, { waitUntil: "load", timeout: 120000 });
      await s.page.waitForFunction("window.__ready === true", null, { timeout: 60000 });
      s.info = await s.page.evaluate(() => window.__build());
      s.loadMs = Date.now() - t;
    }
    /* one framing for every side: the union of the boxes */
    const box = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
    for (const s of sides) for (let i = 0; i < 3; i++) {
      box.min[i] = Math.min(box.min[i], s.info.bbox.min[i]); box.max[i] = Math.max(box.max[i], s.info.bbox.max[i]);
    }
    const ext = {};
    for (const v of o.views) {
      ext[v] = { r: [Infinity, -Infinity], u: [Infinity, -Infinity] };
      for (const s of sides) for (const ax of ["r", "u"]) {
        ext[v][ax][0] = Math.min(ext[v][ax][0], s.info.ext[v][ax][0]); ext[v][ax][1] = Math.max(ext[v][ax][1], s.info.ext[v][ax][1]);
      }
    }
    if (o.focus) {
      /* frame every view on this box (model metres) instead of the whole model; camera and light keep the model's */
      const f = o.focus;
      if (f.length !== 6 || f.some(x => !isFinite(x))) throw new Error("--focus takes x0,y0,z0,x1,y1,z1");
      VS.forEach(v => {
        const e = { r: [Infinity, -Infinity], u: [Infinity, -Infinity] };
        for (let i = 0; i < 8; i++) {
          const p = [i & 1 ? f[3] : f[0], i & 2 ? f[4] : f[1], i & 4 ? f[5] : f[2]];
          const a = p[0] * v.r[0] + p[1] * v.r[1] + p[2] * v.r[2], b = p[0] * v.u[0] + p[1] * v.u[1] + p[2] * v.u[2];
          e.r[0] = Math.min(e.r[0], a); e.r[1] = Math.max(e.r[1], a); e.u[0] = Math.min(e.u[0], b); e.u[1] = Math.max(e.u[1], b);
        }
        ext[v.n] = e;
      });
    }
    const after = sides[sides.length - 1];
    let ground, perSide = false;
    const naval = after.info.cat === "naval";
    if (o.ground === "none") ground = null;
    else if (o.ground === "per" || (o.ground == null && sides.length === 2 && !naval)) {
      perSide = true;
      for (const s of sides) s.ground = s.info.bbox.min[2];
      ground = Math.min.apply(null, sides.map(s => s.ground));
    }
    else if (o.ground != null) { ground = +o.ground; if (!isFinite(ground)) throw new Error("--ground takes a number, none or per"); }
    else ground = naval ? 0 : Math.min(0, box.min[2]);
    if (!perSide) for (const s of sides) s.ground = ground;
    /* a ship's underwater hull is under the ground slab: frame the near-level views from just below the
       waterline (views from below the horizon draw no ground and keep the whole hull) */
    const gtop = perSide ? Math.max.apply(null, sides.map(s => s.ground)) : ground;
    if (gtop != null && !o.focus) VS.forEach(v => {
      if (v.el < 0 || v.el > 30 || v.n === "game") return;
      /* the lowest the ground line can stand on this view's screen-up axis, under the model's footprint */
      const e = ext[v.n], uz = v.u[2];
      if (uz < 0.5) return;
      let gu = Infinity;
      for (const x of [box.min[0], box.max[0]]) for (const y of [box.min[1], box.max[1]]) gu = Math.min(gu, gtop * uz + x * v.u[0] + y * v.u[1]);
      if (gu > e.u[0]) e.u[0] = gu - (e.u[1] - gu) * 0.10;
    });
    const playPx = after.info.play ? after.info.play.px_at_430 : null;
    const [W, H] = o.size;
    if (o.raw) {
      /* bare panels: OUT_<view>.png, transparent where there is no model, at --scale px/m with view
         point --centre h,v (the view's own axes, metres) in the panel's middle */
      if (!(o.scale > 0) || !o.centre || o.centre.length !== 2) throw new Error("--raw needs --scale PX_PER_M and --centre H,V");
      if (sides.length !== 1) throw new Error("--raw draws one model: no --before");
      const centre = {}; o.views.forEach(v => { centre[v] = o.centre; });
      const s = sides[0];
      s.res = await s.page.evaluate((a) => window.__render(a), { views: o.views, W, H, box, ext, ground: null, raw: true, scale: o.scale, centre });
      const files = {};
      for (const v of o.views) {
        const f = outPng.replace(/\.png$/i, "_" + v + ".png");
        fs.writeFileSync(f, Buffer.from(s.res.images[v].split(",")[1], "base64"));
        files[v] = path.resolve(f);
      }
      fs.writeFileSync(outPng.replace(/\.png$/i, ".json"), JSON.stringify({ key, team, raw: true, panel: [W, H], px_per_m: o.scale,
        centre_m: o.centre, pitch_deg: o.pitch || 0, hide: o.hide || [], gear: o.gear, files, bbox: s.info.bbox,
        root_transform: s.info.rootTransform || null, tool: "render.js" }, null, 1));
      console.log("[render] raw " + o.views.join(",") + " -> " + Object.values(files).join(" ") + " (" + (Date.now() - T0) + " ms)");
      return;
    }
    for (const s of sides) {
      const t = Date.now();
      s.res = await s.page.evaluate((a) => window.__render(a), { views: o.views, W, H, box, ext, ground: s.ground, playPx });
      s.renderMs = Date.now() - t;
    }
    /* compose */
    const VT = {}; VS.forEach(v => { VT[v.n] = v.label; });
    const cap = (m) => "detail: sobel " + m.sobel_mean.toFixed(2) + "  edges " + (m.edge_share * 100).toFixed(1) + "%  regions " + m.regions +
      "  (" + m.model_px + " px)";
    const cells = [], cmp = sides.length === 2;
    const ratios = {};
    o.views.forEach((v, r) => {
      sides.forEach((s, c) => {
        const m = s.res.views[v];
        let caption = cap(m), warn = false;
        if (perSide && r === 0) caption = "ground " + s.ground.toFixed(2) + " (own low pt) | " + caption.replace("detail: ", "");
        if (cmp && c === 1) {
          const b = sides[0].res.views[v], k = b.sobel_mean > 0 ? m.sobel_mean / b.sobel_mean : null;
          ratios[v] = { sobel: k == null ? null : +k.toFixed(3), regions: b.regions ? +(m.regions / b.regions).toFixed(3) : null };
          caption += "   x" + (k == null ? "n/a" : k.toFixed(2)) + " of before";
          warn = k != null && k < 1;
        }
        const cell = { col: cmp ? c : r % 2, row: cmp ? r : Math.floor(r / 2), url: s.res.images[v], px_per_m: m.px_per_m,
                       title: (s.label ? s.label + " - " : "") + VT[v], caption, warn };
        if (v === "game" && s.res.images.play) {
          const p = s.res.views.play;
          const k = p.inset_k || 1;
          cell.inset = { url: s.res.images.play, k, label: "as played x" + k + ": " + Math.round(p.len_px) + " px long, sobel " + p.sobel_mean.toFixed(1) + ", regions " + p.regions };
        }
        cells.push(cell);
      });
    });
    if (cmp) {
      const b = sides[0].res.views.play, a = sides[1].res.views.play;
      if (a && b) ratios.play = { sobel: b.sobel_mean > 0 ? +(a.sobel_mean / b.sobel_mean).toFixed(3) : null, regions: b.regions ? +(a.regions / b.regions).toFixed(3) : null };
    }
    const head = sides.map(s => (s.label ? (s.label + "       ").slice(0, 7) + " " : "") + s.dir + (s.extra.length ? " + " + s.extra.map(f => path.basename(f)).join(",") : "") +
      (s.ground != null ? "   ground z " + s.ground.toFixed(2) + (perSide ? " (own lowest point)" : "") : "") +
      (s.info.bbox.min[2] > 0.02 && !naval ? "   LOWEST POINT z +" + s.info.bbox.min[2].toFixed(2) + ": stands above z 0" : "") +
      (s.info.rootTransform ? "   ROOT TRANSFORM kept (the game overwrites rotation.x)" : "") +
      "   " + s.res.triangles + " tris, " + s.res.draw_calls + " draw calls, " + s.info.materials + " materials, " + s.info.textures + " textures, " +
      (s.info.bbox.max[0] - s.info.bbox.min[0]).toFixed(2) + " x " + (s.info.bbox.max[1] - s.info.bbox.min[1]).toFixed(2) + " x " +
      (s.info.bbox.max[2] - s.info.bbox.min[2]).toFixed(2) + " m");
    const compPage = await ctx.newPage();
    await compPage.goto(base + "/blank");
    const sheet = { title: key + " (" + team + " " + after.info.teamHex + ")" + (cmp ? "  -  before | after, true render" : "  -  true render"),
                    head, cells, W, H, cols: cmp ? 2 : Math.min(2, o.views.length), rows: cmp ? o.views.length : Math.ceil(o.views.length / 2) };
    const dataUrl = await compPage.evaluate((S) => window.__compose(S), sheet);
    fs.writeFileSync(outPng, Buffer.from(dataUrl.split(",")[1], "base64"));
    const strip = (s) => ({ root: s.dir, extra: s.extra, len: s.info.len, cat: s.info.cat, unit_key: s.info.unitKey, ground: s.ground,
      root_transform: s.info.rootTransform || null, bbox: s.info.bbox, team: s.info.teamHex,
      triangles: s.res.triangles, draw_calls: s.res.draw_calls, meshes: s.info.meshes, materials: s.info.materials, textures: s.info.textures,
      play: s.info.play, views: s.res.views, build_ms: s.info.buildMs, load_ms: s.loadMs, render_ms: s.renderMs, gl: s.res.gl,
      page_errors: s.info.errors || [], console_errors: s.console });
    const json = { key, team, png: path.resolve(outPng), panel: [W, H], views: o.views,
                   view_specs: VS.map(v => ({ n: v.n, az: v.az, el: v.el, r: v.r, u: v.u, t: v.t })),
                   ground, ground_per_side: perSide, tool: "render.js" };
    if (cmp) { json.before = strip(sides[0]); json.after = strip(sides[1]); json.ratio = ratios; }
    else Object.assign(json, strip(after));
    json.total_ms = Date.now() - T0;
    const outJson = outPng.replace(/\.png$/i, ".json");
    fs.writeFileSync(outJson, JSON.stringify(json, null, 1));
    for (const s of sides) {
      const g = s.res.views.game || s.res.views[o.views[0]];
      console.log("[render] " + (s.label || "model") + " " + key + " from " + s.dir + ": " + s.res.triangles + " tris, " + s.res.draw_calls +
        " draw calls; game view sobel " + g.sobel_mean + ", regions " + g.regions +
        (s.res.views.play ? "; as played (" + Math.round(s.res.views.play.len_px) + " px) sobel " + s.res.views.play.sobel_mean + ", regions " + s.res.views.play.regions : "") +
        "; load " + s.loadMs + " ms, render " + s.renderMs + " ms");
      const er = (s.info.errors || []).concat(s.console);
      if (er.length) console.log("[render]   " + er.length + " page error(s) while loading (first: " + er[0] + ")");
    }
    if (cmp && ratios.game) console.log("[render] game-view detail after/before: sobel x" + ratios.game.sobel + ", regions x" + ratios.game.regions +
      (ratios.play ? "; as played: sobel x" + ratios.play.sobel + ", regions x" + ratios.play.regions : ""));
    console.log("[render] -> " + outPng + " and " + outJson + " (" + (Date.now() - T0) + " ms)");
    if (o.keepOpen) await new Promise(r => setTimeout(r, o.keepOpen));
  } catch (e) {
    console.error("[render] FAILED: " + (e && e.message ? e.message.split("\n")[0] : e));
    for (const s of sides) if (s.console && s.console.length) console.error("[render]   " + s.label + " console: " + s.console.slice(0, 3).join(" | "));
    code = 1;
  } finally {
    await browser.close(); srv.close();
  }
  process.exit(code);
}
main().catch(e => { console.error("[render] " + (e && e.message || e)); process.exit(1); });
