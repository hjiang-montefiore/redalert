/* ============ render3d.js — the 3D battlefield ============
   Implements the same interface as the 2D Render module and replaces it
   when WebGL is available.  World: 1 game px = 0.625 m, 1 tile = 20 m.
   Terrain is a displaced heightfield draped with the generated satellite
   texture; water is a translucent plane over a depressed seabed.          */
var Render3D = (function () {
  const PXM = 0.625;                 // metres per game px
  const TILE_M = 20;
  const ELEV_M = 10;                 // metres per elevation level
  const AIR_ALT = 46;                // cruise altitude, metres

  let G = null, three = null;        // three = { renderer, scene, camera, ... }
  let cv2d = null, ctx2d = null;     // transparent overlay canvas (UI adornments)
  let W = 0, H = 0;
  let cam = { x: 0, y: 0, dist: 420, yaw: -Math.PI / 4, pitch: 0.86, z: 1 };
  let terrainMesh = null, fogMesh = null, waterMesh = null;
  let fogCanvas = null, fogTex = null, fogStamp = -1;
  let groundGeoData = null;          // for height sampling
  let ents = new Map();              // entity id -> {group, def, turret, rotor, ...}
  let pool = { tracers: [], booms: [], sprites: [] };
  let texTick = 0;
  let modelCache = {};               // defKey|team -> template group (cloned per entity)
  let raycaster = null;

  /* ---------------- helpers ---------------- */
  function gx2m(x) { return x * PXM; }               // game px -> metres
  function m2gx(m) { return m / PXM; }
  function heightAt(wx, wy) {                        // game px in, metres out
    const map = G.map;
    const tx = wx / CFG.TILE, ty = wy / CFG.TILE;
    /* shore-distance controlled beach ramp + elevation */
    const FS = map.FS;
    let fx = U.clamp(tx * FS - 0.5, 0, map.FW - 1.001), fy = U.clamp(ty * FS - 0.5, 0, map.FH - 1.001);
    let xi = fx | 0, yi = fy | 0, ax = fx - xi, ay = fy - yi;
    let i0 = yi * map.FW + xi;
    const sh = map.shore;
    const s = sh[i0] + (sh[i0 + 1] - sh[i0]) * ax + (sh[i0 + map.FW] - sh[i0]) * ay +
      (sh[i0] - sh[i0 + 1] - sh[i0 + map.FW] + sh[i0 + map.FW + 1]) * ax * ay;
    let ex = U.clamp(tx - 0.5, 0, map.W - 1.001), ey = U.clamp(ty - 0.5, 0, map.H - 1.001);
    const exi = ex | 0, eyi = ey | 0, eax = ex - exi, eay = ey - eyi;
    const e0 = eyi * map.W + exi;
    const el = map.elevS;
    const e = el[e0] + ((el[e0 + 1] || 0) - el[e0]) * eax + ((el[e0 + map.W] || 0) - el[e0]) * eay +
      (el[e0] - (el[e0 + 1] || 0) - (el[e0 + map.W] || 0) + (el[e0 + map.W + 1] || 0)) * eax * eay;
    if (s <= 0) return Math.max(-7, s * 1.6);        // seabed
    return Math.min(2.2, s * 1.1) + e * ELEV_M;      // beach ramp + hills
  }

  /* ---------------- init ---------------- */
  function init(canvas, game) {
    G = game;
    cv2d = canvas; ctx2d = cv2d.getContext("2d");
    let gl = document.getElementById("cv3d");
    if (!gl) {
      gl = document.createElement("canvas");
      gl.id = "cv3d";
      gl.style.cssText = "position:absolute;left:0;top:0;z-index:0";
      cv2d.parentElement.insertBefore(gl, cv2d);
      cv2d.style.position = "absolute";
      cv2d.style.zIndex = "1";
      cv2d.style.background = "transparent";
    }
    const Q = CFG.gfx();
    /* high-performance asks a hybrid-graphics machine for the discrete card
       rather than the integrated one, which is the difference between a
       2080 and an iGPU on the same laptop. */
    const renderer = new THREE.WebGLRenderer({
      canvas: gl, antialias: true, powerPreference: "high-performance",
      stencil: false, depth: true });
    /* Nothing set a pixel ratio before, so the whole scene was drawn at CSS
       resolution however capable the display and the card were. */
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25) * Q.render);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d1218).convertSRGBToLinear();

    const camera = new THREE.PerspectiveCamera(40, 1, 2, 6000);
    raycaster = new THREE.Raycaster();

    /* sky environment for speculars */
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
    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromEquirectangular(envTex).texture;
    scene.fog = new THREE.Fog(new THREE.Color(0x9aa8b5).convertSRGBToLinear(), 1500, 4200);

    const sun = new THREE.DirectionalLight(0xfff0d8, 2.1);
    sun.castShadow = true;
    sun.shadow.mapSize.set(Q.shadow, Q.shadow);
    sun.shadow.normalBias = 0.9;
    sun.shadow.camera.near = 500; sun.shadow.camera.far = 6000;
    sun.shadow.bias = -0.0004;
    scene.add(sun); scene.add(sun.target);
    const hemi = new THREE.HemisphereLight(0x93a8c0, 0x2c332b, 0.5);
    scene.add(hemi);

    three = { renderer, scene, camera, sun, hemi, gl };

    /* Bloom owns tone mapping and encoding when it is on, because it has to
       see the scene in linear HDR before anything compresses the highlights.
       If the device cannot give us a float target we quietly stay as we were. */
    bloom = null;
    if (Q.bloom && typeof Bloom3D !== "undefined") {
      const dpr = renderer.getPixelRatio();
      bloom = Bloom3D.create(THREE, renderer,
        Math.max(2, (window.innerWidth - 216) * dpr), Math.max(2, window.innerHeight * dpr),
        { threshold: 0.88, knee: 0.32, strength: 0.80, exposure: 1.0 });
      if (bloom) {
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.outputEncoding = THREE.LinearEncoding;
      }
    }
    buildTerrain();
    buildWater();
    buildFogLayer();
    /* hits and what kills leave - js/impact3d.js. Its particle clouds belong
       to this scene and this renderer, so they are made again with them. */
    if (typeof Impact3D !== "undefined")
      Impact3D.init(THREE, three, G, { heightAt, PXM, AIR_ALT, recOf: (id) => ents.get(id) });

    cam.x = G.human.homeX; cam.y = G.human.homeY; cam.dist = 430;
    resize();
    ents.clear(); modelCache = {};
    shoreFits.clear(); shorePoses.clear();       // a new battle is a new coast
  }

  function resize() {
    W = window.innerWidth - 216;
    H = window.innerHeight;
    cv2d.width = W; cv2d.height = H;
    if (three) {
      three.renderer.setSize(W, H, false);
      three.gl.style.width = W + "px"; three.gl.style.height = H + "px";
      three.camera.aspect = W / H;
      three.camera.updateProjectionMatrix();
      if (bloom) {
        const dpr = three.renderer.getPixelRatio();
        bloom.setSize(Math.max(2, W * dpr), Math.max(2, H * dpr));
      }
    }
  }

  /* anisotropic filtering, clamped to whatever the card actually supports */
  function Q_ANISO() { return CFG.gfx().aniso; }
  function maxAniso() {
    try { return three.renderer.capabilities.getMaxAnisotropy(); }
    catch (e) { return 8; }
  }

  /* ---------------- terrain / water / fog ---------------- */
  function terrainTexture() {
    const wt = Render2D.getWorldTex(G);       // {world, ore} canvases
    const cvT = document.createElement("canvas");
    cvT.width = wt.world.width; cvT.height = wt.world.height;
    const c = cvT.getContext("2d");
    c.drawImage(wt.world, 0, 0);
    c.drawImage(wt.ore, 0, 0);
    const t = new THREE.CanvasTexture(cvT);
    t.encoding = THREE.sRGBEncoding;
    t.anisotropy = Math.min(Q_ANISO(), maxAniso());
    return { tex: t, cv: cvT, wt };
  }
  let terraTex = null;
  let bloom = null;
  function buildTerrain() {
    const map = G.map;
    /* Terrain geometry resolution. At 192 over a 144-tile map this was 1.33
       segments per tile, so every slope was visibly faceted. The mesh is built
       once per battle, so paying for a finer grid here costs nothing per frame. */
    const SEG = 384;
    const sizeX = map.W * TILE_M, sizeY = map.H * TILE_M;
    const geo = new THREE.PlaneGeometry(sizeX, sizeY, SEG, SEG);
    geo.rotateX(-Math.PI / 2);                 // ground plane XZ, +Z = south (wy)
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const mx = pos.getX(i) + sizeX / 2;      // 0..sizeX metres
      const mz = pos.getZ(i) + sizeY / 2;
      pos.setY(i, heightAt(m2gx(mx), m2gx(mz)));
    }
    geo.computeVertexNormals();
    terraTex = terrainTexture();
    const mat = new THREE.MeshStandardMaterial({
      map: terraTex.tex, roughness: 0.94, metalness: 0.02, envMapIntensity: 0.25,
    });
    terrainMesh = new THREE.Mesh(geo, mat);
    terrainMesh.position.set(sizeX / 2, 0, sizeY / 2);
    terrainMesh.receiveShadow = true;
    three.scene.add(terrainMesh);
  }
  function refreshTerrainTex() {
    if (!terraTex) return;
    const c = terraTex.cv.getContext("2d");
    c.drawImage(terraTex.wt.world, 0, 0);
    Render2D.refreshOre(G);
    c.drawImage(terraTex.wt.ore, 0, 0);
    terraTex.tex.needsUpdate = true;
  }
  function buildWater() {
    const map = G.map;
    const geo = new THREE.PlaneGeometry(map.W * TILE_M * 1.4, map.H * TILE_M * 1.4, 1, 1);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x1e3f5c).convertSRGBToLinear(),
      transparent: true, opacity: 0.66,
      roughness: 0.12, metalness: 0.35, envMapIntensity: 0.9,
    });
    waterMesh = new THREE.Mesh(geo, mat);
    waterMesh.position.set(map.W * TILE_M / 2, 0.35, map.H * TILE_M / 2);
    waterMesh.receiveShadow = true;
    three.scene.add(waterMesh);
  }
  /* fog texture samples per map tile */
  const FOG_SS = 4;

  function buildFogLayer() {
    const map = G.map;
    /* Fog was stored at one texel per tile and stretched over the whole map,
       which is why its edge stepped in tile-sized blocks. Rendering it at
       several samples per tile, with the visibility smoothed between
       neighbours, gives a soft frontier instead of a staircase. */
    fogCanvas = document.createElement("canvas");
    fogCanvas.width = map.W * FOG_SS; fogCanvas.height = map.H * FOG_SS;
    fogTex = new THREE.CanvasTexture(fogCanvas);
    fogTex.magFilter = THREE.LinearFilter;
    fogTex.minFilter = THREE.LinearFilter;
    const geo = terrainMesh.geometry.clone();
    const mat = new THREE.MeshBasicMaterial({
      color: 0x04070a, transparent: true, alphaMap: fogTex,
      depthWrite: false,
    });
    fogMesh = new THREE.Mesh(geo, mat);
    fogMesh.position.copy(terrainMesh.position);
    fogMesh.position.y += 1.2;
    fogMesh.renderOrder = 40;
    three.scene.add(fogMesh);
  }
  function updateFog() {
    if (!G.fogEnabled) { fogMesh.visible = false; return; }
    if (G.time - fogStamp < 0.24 && G.time >= fogStamp) return;
    fogStamp = G.time;
    const c = fogCanvas.getContext("2d");
    const W0 = G.map.W, H0 = G.map.H, SS = FOG_SS;
    const img = c.createImageData(W0 * SS, H0 * SS);
    const lvl = (x, y) => {
      if (x < 0 || y < 0 || x >= W0 || y >= H0) return 236;
      const f = G.fog[y * W0 + x];
      return f === 2 ? 0 : f === 1 ? 118 : 236;
    };
    /* bilinear between tile centres, so the boundary is a gradient rather
       than a hard tile edge */
    for (let sy = 0; sy < H0 * SS; sy++) {
      const fy = (sy + 0.5) / SS - 0.5;
      const y0 = Math.floor(fy), ty = fy - y0;
      for (let sx = 0; sx < W0 * SS; sx++) {
        const fx = (sx + 0.5) / SS - 0.5;
        const x0 = Math.floor(fx), tx = fx - x0;
        const a00 = lvl(x0, y0), a10 = lvl(x0 + 1, y0);
        const a01 = lvl(x0, y0 + 1), a11 = lvl(x0 + 1, y0 + 1);
        const a = (a00 * (1 - tx) + a10 * tx) * (1 - ty) +
                  (a01 * (1 - tx) + a11 * tx) * ty;
        const o = (sy * W0 * SS + sx) * 4;
        img.data[o] = a; img.data[o + 1] = a; img.data[o + 2] = a; img.data[o + 3] = 255;
      }
    }
    c.putImageData(img, 0, 0);
    fogTex.needsUpdate = true;
  }

  /* ---------------- models ---------------- */
  function fallbackModel(def, team) {
    const g = new THREE.Group();
    const L = def.r * 2.0 * PXM * 2.2, Wd = L * 0.45, Hh = Math.max(2.5, L * 0.22);
    const body = new THREE.Mesh(new THREE.BoxGeometry(L, Hh, Wd),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(team.dark).convertSRGBToLinear(), roughness: 0.6, metalness: 0.3 }));
    body.position.y = Hh / 2;
    g.add(body);
    if (def.turret) {
      const t = new THREE.Group(); t.name = "turret";
      const tm = new THREE.Mesh(new THREE.BoxGeometry(L * 0.45, Hh * 0.6, Wd * 0.62),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(team.main).convertSRGBToLinear(), roughness: 0.55, metalness: 0.3 }));
      tm.position.y = Hh * 0.3;
      const gun = new THREE.Mesh(new THREE.CylinderGeometry(L * 0.02, L * 0.025, L * 0.6, 8),
        new THREE.MeshStandardMaterial({ color: 0x222528, roughness: 0.5 }));
      gun.rotation.z = Math.PI / 2; gun.position.set(L * 0.4, Hh * 0.35, 0);
      t.add(tm); t.add(gun);
      t.position.y = Hh;
      g.add(t);
    }
    g.userData.len = L;
    return g;
  }

  /* pick the best available model key: the unit's own, else any same-role
     platform that does have one (a KPA Chonma-ho borrows the T-90 hull,
     an ROC Brave Tiger borrows the Abrams — both are honest stand-ins).   */
  function modelKeyFor(def) {
    const own = def.cat === "infantry" ? "inf_" + def.role : def.id;
    if (typeof UNIT_MODELS !== "undefined" && UNIT_MODELS[own]) return own;
    const peers = (typeof ROLES !== "undefined" && ROLES[def.role]) || [];
    /* prefer a peer of the same category so a ship never stands in for a tank */
    for (const id of peers) {
      const p = UNITS[id];
      if (!p || p.cat !== def.cat) continue;
      const k = p.cat === "infantry" ? "inf_" + p.role : id;
      if (UNIT_MODELS[k]) return k;
    }
    return own;
  }


  /* ---------------- period finish for units ----------------
     A T-54 and a T-90 are the same silhouette at this zoom; what actually
     dates a vehicle on a battlefield photograph is its paint and the kit
     bolted to it. Early Cold War armour wore semi-gloss olive or Soviet
     green with a huge infrared searchlight beside the gun; by the eighties
     it was matte three-tone with stowage baskets; Gulf War armour was
     desert tan; today it is tan-grey under slat cages and sensor masts. */
  const ERA_KIT = {
    e50: { paint: 0x4f5a35, mix: 0.50, rough: 0.52, metal: 0.14, kit: "searchlight" },
    e60: { paint: 0x47523a, mix: 0.44, rough: 0.72, metal: 0.08, kit: "searchlight" },
    e80: { paint: 0x51553f, mix: 0.34, rough: 0.86, metal: 0.05, kit: "stowage" },
    e90: { paint: 0xa8946a, mix: 0.40, rough: 0.88, metal: 0.05, kit: "stowage" },
    e00: { paint: 0x9a9077, mix: 0.20, rough: 0.85, metal: 0.06, kit: "slat" },
    e20: { paint: 0x000000, mix: 0.00, rough: 0.00, metal: 0,    kit: "mast" },
  };

  /* repaint the airframe or hull without touching markings, glass or team flash */
  function eraPaint(model, K, teamCol) {
    if (!K || K.mix <= 0) return;
    const tint = new THREE.Color(K.paint);
    const team = new THREE.Color(teamCol);
    model.traverse(o => {
      if (!o.isMesh) return;
      const list = Array.isArray(o.material) ? o.material : [o.material];
      const out = [];
      for (const m of list) {
        if (!m || !m.color) { out.push(m); continue; }
        const hsl = { h: 0, s: 0, l: 0 };
        m.color.getHSL(hsl);
        /* team flash, canopy glass, running lights and bright metal stay put */
        const isTeam = Math.abs(m.color.r - team.r) + Math.abs(m.color.g - team.g)
                     + Math.abs(m.color.b - team.b) < 0.12;
        if (isTeam || (m.emissive && m.emissive.getHex() > 0x111111)
            || (m.metalness || 0) > 0.7 || hsl.l < 0.05) { out.push(m); continue; }
        const c = m.clone();
        const t = tint.clone();
        if (m.userData && m.userData._srgbDone) t.convertSRGBToLinear();
        c.color.lerp(t, K.mix);
        if (K.rough) c.roughness = K.rough;
        if (K.metal !== undefined) c.metalness = Math.min(c.metalness || 0, K.metal);
        c.userData = Object.assign({}, c.userData);
        out.push(c);
      }
      o.material = Array.isArray(o.material) ? out : out[0];
    });
  }

  /* the bolt-on kit that dates a ground vehicle at a glance.
     Built in model space: +X forward, +Y across, +Z up. */
  function eraKitFor(K, def, model) {
    if (!K || !K.kit || K.kit === "mast" || def.cat !== "vehicle") return null;
    const bb = new THREE.Box3().setFromObject(model), sz = new THREE.Vector3();
    bb.getSize(sz);
    const L = sz.x, W = sz.y, H = sz.z;
    if (L < 0.5 || H < 0.2) return null;
    const g = new THREE.Group();
    const dark = new THREE.MeshStandardMaterial({ color: 0x24272a, roughness: 0.85, metalness: 0.2 });
    const drab = new THREE.MeshStandardMaterial({ color: 0x3f4636, roughness: 0.92, metalness: 0.05 });
    const lens = new THREE.MeshStandardMaterial({ color: 0x7a5326, roughness: 0.25, metalness: 0.4,
                                                  emissive: 0x2a1a08, emissiveIntensity: 0.4 });
    const zTop = bb.max.z;
    if (K.kit === "searchlight") {
      /* the infrared/xenon searchlight beside the gun: unmistakably Cold War */
      const R = H * 0.16;
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(R, R, L * 0.09, 14), dark);
      drum.rotation.z = Math.PI / 2;
      drum.position.set(L * 0.06, W * 0.26, zTop - H * 0.10);
      g.add(drum);
      const face = new THREE.Mesh(new THREE.CircleGeometry(R * 0.92, 14), lens);
      face.rotation.y = Math.PI / 2;
      face.position.set(L * 0.11, W * 0.26, zTop - H * 0.10);
      g.add(face);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(L * 0.025, W * 0.05, H * 0.16), dark);
      arm.position.set(L * 0.06, W * 0.26, zTop - H * 0.22);
      g.add(arm);
      const whip = new THREE.Mesh(new THREE.CylinderGeometry(L * 0.004, L * 0.007, H * 0.85, 5), dark);
      whip.rotation.x = Math.PI / 2;
      whip.position.set(-L * 0.28, -W * 0.30, zTop + H * 0.40);
      g.add(whip);
    } else if (K.kit === "stowage") {
      /* turret bustle basket and jerry cans: the eighties look */
      const basket = new THREE.Mesh(new THREE.BoxGeometry(L * 0.18, W * 0.56, H * 0.13), drab);
      basket.position.set(-L * 0.26, 0, zTop - H * 0.05);
      g.add(basket);
      for (let i = -1; i <= 1; i++) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(L * 0.19, W * 0.02, H * 0.02), dark);
        bar.position.set(-L * 0.26, i * W * 0.18, zTop + H * 0.02);
        g.add(bar);
      }
      for (let i = 0; i < 2; i++) {
        const can = new THREE.Mesh(new THREE.BoxGeometry(L * 0.05, W * 0.09, H * 0.11), drab);
        can.position.set(-L * 0.12, (i ? 1 : -1) * W * 0.34, zTop - H * 0.07);
        g.add(can);
      }
    } else if (K.kit === "slat") {
      /* slat cages standing off the flanks: the counter-RPG era */
      for (let sgn = -1; sgn <= 1; sgn += 2) {
        for (let i = 0; i < 5; i++) {
          const bar = new THREE.Mesh(new THREE.BoxGeometry(L * 0.34, W * 0.02, H * 0.015), dark);
          bar.position.set(-L * 0.04, sgn * W * 0.56, bb.min.z + H * (0.28 + i * 0.10));
          g.add(bar);
        }
        for (let j = -1; j <= 1; j += 2) {
          const post = new THREE.Mesh(new THREE.BoxGeometry(L * 0.02, W * 0.02, H * 0.42), dark);
          post.position.set(-L * 0.04 + j * L * 0.16, sgn * W * 0.56, bb.min.z + H * 0.48);
          g.add(post);
        }
      }
    }
    return g.children.length ? g : null;
  }

  function getModel(def, team, era) {
    const key = modelKeyFor(def);
    /* the stand-in mesh is always the present-day one, so the period has to
       come from the finish and the kit; that makes it part of the cache key */
    const K = (ERA_KIT[era] && key !== def.id) ? ERA_KIT[era] : null;
    const ck = key + "|" + team.main + (K ? "|" + era : "");
    if (modelCache[ck]) return modelCache[ck];
    let tpl = null;
    try {
      if (typeof UNIT_MODELS !== "undefined" && UNIT_MODELS[key]) {
        tpl = UNIT_MODELS[key].build(THREE, Models3D, { team: team.main });
        tpl.userData.len = UNIT_MODELS[key].len || 10;
      } else if (key === "fighter_n" && typeof Models3D !== "undefined") {
        tpl = Models3D.buildF16(THREE, { teamColor: team.main, gear: false });
        tpl.userData.len = 15;
      }
    } catch (e) { tpl = null; }
    if (!tpl) tpl = fallbackModel(def, team);
    if (K) {
      eraPaint(tpl, K, team.main);
      const kit = eraKitFor(K, def, tpl);
      if (kit) tpl.add(kit);
    }
    prepModel(tpl);
    /* normalise scale by MEASURED extent - immune to bad len metadata */
    const bb = new THREE.Box3().setFromObject(tpl);
    const actual = Math.max(0.5, bb.max.x - bb.min.x);
    let targetLen;
    if (def.cat === "infantry") targetLen = 4.6 * CFG.MODEL_SCALE_INF;  // oversized soldier, RTS convention
    else if (def.cat === "naval") {
      targetLen = def.r * 2.1 * PXM * 1.9 * CFG.MODEL_SCALE;
      /* Every attack boat in the roster shares one collision radius, so a
         74-metre Kilo and a 110-metre Los Angeles were drawn exactly the same
         size — which is most of the reason the submarines all looked alike.
         Submarines are scaled by the model's real length instead, leaving the
         collision radius (and therefore the balance) untouched. */
      const realM = (typeof UNIT_MODELS !== "undefined" && UNIT_MODELS[key] &&
                     UNIT_MODELS[key].len) || 0;
      if (def.layer === "sub" && realM > 20)
        targetLen = (realM / 110) * 17 * 2.1 * PXM * 1.9 * CFG.MODEL_SCALE;
    }
    /* aircraft were already exaggerated before the global readability bump,
       so they take a smaller share of it or they dwarf the airbase */
    else if (def.cat === "aircraft") targetLen = def.r * 2.1 * PXM * 1.22 * CFG.MODEL_SCALE;
    else targetLen = def.r * 2.1 * PXM * CFG.MODEL_SCALE;               // ground: MBT ~ 1 tile
    const s = targetLen / actual;
    tpl.scale.set(s, s, s);
    /* ground vehicles & infantry: snap the model's belly to the ground plane */
    if (def.layer === "ground" && bb.min.z < -0.01) tpl.position.z = -bb.min.z * s;
    /* model space +Z up -> three +Y up */
    const wrap = new THREE.Group();
    tpl.rotation.x = -Math.PI / 2;
    wrap.add(tpl);
    wrap.userData.inner = tpl;
    modelCache[ck] = wrap;
    return wrap;
  }
  function prepModel(g) {
    g.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true; o.receiveShadow = true;
        const list = Array.isArray(o.material) ? o.material : [o.material];
        for (const m of list) {
          if (!m || !m.userData || m.userData._srgbDone) continue;
          m.userData._srgbDone = true;
          if (m.color) m.color.convertSRGBToLinear();
          if (m.emissive) m.emissive.convertSRGBToLinear();
          if (m.map) m.map.encoding = THREE.sRGBEncoding;
        }
      }
    });
  }
  /* A rotor turns about its OWN shaft, in its own frame.
     Each part used to be turned with rotateOnWorldAxis, which three.js
     documents as assuming no rotated parent: it premultiplies the part's
     rotation, so the axis handed in is read in the PARENT's frame - and every
     part here hangs under the model's -PI/2 turn, its scale and whatever
     mounts the modeller built. Measured through this renderer on all 64
     rotorcraft (tools/jsc/rotor_axes_check.js): 44 main rotors - every
     parametric machine and the older hand-built ones - windmilled about the
     lateral axis, 90 deg out at every heading, and their 41 tail rotors
     turned at right angles to their shafts; the 15 tail rotors hung in
     mounts were right only at 0 and 180 deg (30 deg out at 30, 45 at 45, 90
     at 90), and 18 deg out even at 0 once the machine banked 18; the
     Ka-50's upper head never turned, because only the first "rotor" was
     looked for. Only the 20 main rotors hung in mounts - the heroes' and
     asw_helo_fit.js's - were right: each mount happened to turn the
     parent's frame onto the mast.
     So the shaft is found once, when the instance is made: of the part's
     own three axes, as its rest rotation and every mount above it lay them
     in the machine, the one nearest the machine's up (a "rotor") or across
     it (a "tailrotor", a fenestron fan included). A turn about that local
     axis stays on the shaft whatever the parent does - rotated, stretched
     or mirrored - and keeps what the modeller built into the part: the
     Lynx's mast leans 4.0 deg forward and the Mi-28N's 4.5, the Black
     Hawk's and the Z-20's tail rotors are canted 19.5 and 17.2 deg, and
     turned about the machine's pure vertical or lateral those discs would
     wobble.
     The turn is positive about that axis as the model points it, so the
     model sets the sense: a Mil, a Sud or a Tiger head points it DOWN the
     mast and turns clockwise from above, an Apache, a Bo 105 or a Lynx
     head points it up and turns anti-clockwise. A machine's heads
     alternate - a second one, coaxial or tandem, turns opposite to the
     first however the two were pointed. */
  const RS_F = new THREE.Matrix4(), RS_M = new THREE.Matrix4(), RS_D = new THREE.Vector3();
  function rotorShafts(grp) {
    let out = null, heads = 0, first = 1;
    grp.traverse((o) => {
      const main = o.name === "rotor";
      if (!main && o.name !== "tailrotor") return;
      const F = RS_F.makeRotationFromQuaternion(o.quaternion), d = RS_D;
      for (let p = o.parent; p && p !== grp; p = p.parent)
        F.premultiply(p.matrixAutoUpdate ? RS_M.compose(p.position, p.quaternion, p.scale) : p.matrix);
      let best = -1, k = 1;
      for (let i = 0; i < 3; i++) {
        d.set(0, 0, 0).setComponent(i, 1).transformDirection(F);
        const along = Math.abs(main ? d.y : d.z);          // the group: +Y up, Z across
        if (along > best) { best = along; k = i; }
      }
      let sign = 1;
      if (main) {
        const up = d.set(0, 0, 0).setComponent(k, 1).transformDirection(F).y > 0 ? 1 : -1;
        if (heads === 0) first = up;
        else sign = (heads % 2 ? -first : first) * up;
        heads++;
      }
      (out || (out = [])).push({ part: o, axis: new THREE.Vector3().setComponent(k, sign), main });
    });
    return out;
  }

  function findParts(wrap, name) {
    const out = [];
    wrap.traverse((o) => { if (o.name === name) out.push(o); });
    return out;
  }
  function findPart(wrap, name) {
    let found = null;
    wrap.traverse(o => { if (!found && o.name === name) found = o; });
    return found;
  }

  /* ---------------- parked, on what it is parked on ----------------
     A parked aircraft was set at the ground under it plus 1.2 m whatever its
     landing gear, after the template had been scaled to the unit's length,
     so a model whose wheels sit below its origin had them in the ground.
     Measured at 91c2088 through this renderer, all 368 aircraft types on
     open ground: every one below it, the fixed-wing 0.21 m (Su-25) to
     9.70 m (Valiant B.1), the rotorcraft 1.20 to 5.30 m (Gazelle). An
     airbase's apron is 0.35 m proud of the ground and one of its four
     revetments is under a hangar roof. On a deck it was worse: heightAt() is
     the SEABED there, 7 m down, so a helicopter on a frigate or a jet on a
     carrier was drawn 9.3 to 10.1 m under the sea.
     Each template's lowest point is measured once, in the frame the model is
     placed in, and a parked machine is set down so that point rests on the
     surface under it: the ground; an airbase's pad (padTop); or a spot on a
     ship's own deck (deckLayout), riding with her (seatOnDeck). */
  const PARK = {
    CLEAR: 3,       // m: a pad is found under a ray from this high, below any roof
    BLEND: 30,      // m of height over which a deck machine blends between its spot and flight
    CELL: 1,        // m: the grid a deck and an airframe's plan are rastered on
    WHEEL: 0.35,    // m: what of an airframe is this close to its lowest point is what it stands on
    SHARE: 25,      // a second spot costing more than this is not laid out (see placeOn)
    JUMP: 60,       // m in one frame: the game set it down somewhere else, not flown (seatOnDeck)
  };
  const TAU = Math.PI * 2;
  const _pb = new THREE.Box3(), _pv = new THREE.Vector3(), _pp = new THREE.Vector3();
  const _pa = new THREE.Vector3(), _pc = new THREE.Vector3();
  const _po = new THREE.Vector3(), _pdn = new THREE.Vector3(0, -1, 0);
  let parkRay = null;
  /* a see-through blur - a propeller disc, the rotor disc - is not something
     an aircraft stands on: 13 types' lowest mesh was an unnamed prop disc at
     30% opacity, which held their gear up to 1.27 m off the ground. The same
     test js/impact3d.js charGroup() uses for "blur, not airframe". */
  function blurOf(o) {
    const m = Array.isArray(o.material) ? o.material[0] : o.material;
    return !m || m.visible === false || (m.transparent && m.opacity < 0.98);
  }
  /* The lowest point of a parked machine in its group's frame: every solid
     visible mesh, with the undercarriage down (render3d shows it near the
     ground) and the rotor blur faded out. A main rotor spins about the
     vertical and holds its height; a tail rotor stops wherever it stops, so
     its whole disc counts - none of the rotorcraft reaches below its skids
     or wheels with it, but a new model may. And where it is: every point
     within 2 cm of it, a metre apart - wheels level with each other, which a
     carrier's deck markings, 4 to 5 cm proud, can stand at two heights.
     Once per template. */
  function footOf(tpl) {
    if (tpl._foot !== undefined) return tpl._foot;
    tpl.updateMatrixWorld(true);
    const walk = (o, tail, px, py, fn) => {
      if (o.name === "rotordisc" || (!o.visible && o.name !== "gear")) return;
      if (o.name === "tailrotor") { o.getWorldPosition(_pp); tail = true; px = _pp.x; py = _pp.y; }
      const p = o.isMesh && !blurOf(o) && o.geometry && o.geometry.attributes.position;
      if (p) for (let i = 0; i < p.count; i++) {
        _pv.fromBufferAttribute(p, i).applyMatrix4(o.matrixWorld);
        if (tail) fn(py - Math.hypot(_pv.x - px, _pv.y - py), px, _pv.z);
        else fn(_pv.y, _pv.x, _pv.z);
      }
      for (let i = 0; i < o.children.length; i++) walk(o.children[i], tail, px, py, fn);
    };
    let lo = Infinity;
    const pts = [];
    walk(tpl, false, 0, 0, (y) => { if (y < lo) lo = y; });
    walk(tpl, false, 0, 0, (y, x, z) => {
      if (y > lo + 0.02 || pts.length >= 32) return;
      for (let i = 0; i < pts.length; i += 2) if (Math.abs(pts[i] - x) < 1 && Math.abs(pts[i + 1] - z) < 1) return;
      pts.push(x, z);
    });
    tpl._footPts = pts;
    return (tpl._foot = lo < Infinity ? lo : 0);
  }
  /* the first drawn surface of a template under (x, z), from height y0 down,
     in its own frame; -Infinity where there is none. Only ever on a cache miss. */
  function surfaceUnder(tpl, x, y0, z) {
    if (!parkRay) parkRay = new THREE.Raycaster();
    tpl.updateMatrixWorld(true);
    parkRay.set(_po.set(x, y0, z), _pdn);
    const hits = parkRay.intersectObject(tpl, true);
    for (let i = 0; i < hits.length; i++) {
      let o = hits[i].object, shown = o.isMesh && !blurOf(o);
      for (; shown && o && o !== tpl; o = o.parent) if (!o.visible) shown = false;
      if (shown) return hits[i].point.y;
    }
    return -Infinity;
  }
  /* An airbase's pad under a parked machine, in world metres. The first
     surface under a ray from 3 m up: the apron slab or the helipad, 0.35 m
     proud of the ground, and the hangar FLOOR at the revetment the hangar
     stands over. From above, that ray finds the hangar roof 6.19 m up, and
     the faction's and the period's rooftop kit - a radome, a stack, an eave,
     camouflage netting, 15 to 64 m up - hangs over one or more of the
     others. The revetments sit at fixed offsets, so this is kept per
     template and spot. */
  function padTop(host, e, ground) {
    const b = ents.get(host.id);
    if (!b || !b.tpl) return ground;
    const lx = gx2m(e.x) - b.grp.position.x, lz = gx2m(e.y) - b.grp.position.z;
    const key = Math.round(lx * 4) * 8192 + Math.round(lz * 4);
    const pads = b.tpl._pads || (b.tpl._pads = new Map());
    let y = pads.get(key);
    if (y === undefined) { y = surfaceUnder(b.tpl, lx, PARK.CLEAR, lz); pads.set(key, y); }
    return y > -Infinity ? b.grp.position.y + y * b.grp.scale.y : ground;
  }

  /* ---- where a ship's aircraft stand on her deck ----
     entities.js lays a deck out the way it lays out an airbase: a grid of
     revetments on the WORLD axes round the ship's middle. Right for an
     airbase, wrong for a hull. Measured at 91c2088 with every deck in the
     game and its complement, at headings of 0, 45 and 90 degrees, 215 of 279
     had no deck under them at all, an escort with one hangar kept its
     helicopter on her superstructure, and any turn swung them round her. So
     each is drawn on a spot of her own deck, in her own frame, found from
     her model and its own: both are rastered into plans once (planOf), and
     the airframe is tried over her deck at a few headings for the place
     where its wheels stand on her deck level and nothing of it goes into
     her island, hangar or superstructure, clear of the aircraft already
     placed (placeOn). The game's own position for the aircraft is not
     touched: this is where the model is drawn. Spots are in her group's
     frame: +x her bow, +z starboard. */
  /* The plan of a template on a CELL-metre grid, in its own frame: over each
     cell the lowest and the highest of what is drawn there, rastered from its
     triangles (a deck is one wide panel with vertices only at its corners).
     `skip` leaves out a node and everything under it. */
  function planOf(tpl, skip) {
    tpl.updateMatrixWorld(true);
    _pb.setFromObject(tpl);
    const s = PARK.CELL, x0 = _pb.min.x, z0 = _pb.min.z;
    const nx = Math.ceil((_pb.max.x - x0) / s) + 1, nz = Math.ceil((_pb.max.z - z0) / s) + 1;
    const lo = new Float32Array(nx * nz).fill(Infinity), hi = new Float32Array(nx * nz).fill(-Infinity);
    const put = (i, k, y) => {
      if (i < 0 || k < 0 || i >= nx || k >= nz) return;
      const j = i * nz + k;
      if (y < lo[j]) lo[j] = y;
      if (y > hi[j]) hi[j] = y;
    };
    const tri = (a, b, c) => {
      put(Math.floor((a.x - x0) / s), Math.floor((a.z - z0) / s), a.y);
      put(Math.floor((b.x - x0) / s), Math.floor((b.z - z0) / s), b.y);
      put(Math.floor((c.x - x0) / s), Math.floor((c.z - z0) / s), c.y);
      const d = (b.z - c.z) * (a.x - c.x) + (c.x - b.x) * (a.z - c.z);
      if (Math.abs(d) < 1e-9) return;                 // edge-on: its corners are in
      const i0 = Math.ceil((Math.min(a.x, b.x, c.x) - x0) / s - 0.5), i1 = Math.floor((Math.max(a.x, b.x, c.x) - x0) / s - 0.5);
      const k0 = Math.ceil((Math.min(a.z, b.z, c.z) - z0) / s - 0.5), k1 = Math.floor((Math.max(a.z, b.z, c.z) - z0) / s - 0.5);
      for (let i = i0; i <= i1; i++) for (let k = k0; k <= k1; k++) {
        const x = x0 + (i + 0.5) * s, z = z0 + (k + 0.5) * s;
        const l1 = ((b.z - c.z) * (x - c.x) + (c.x - b.x) * (z - c.z)) / d;
        const l2 = ((c.z - a.z) * (x - c.x) + (a.x - c.x) * (z - c.z)) / d;
        if (l1 < -1e-6 || l2 < -1e-6 || l1 + l2 > 1 + 1e-6) continue;
        put(i, k, l1 * a.y + l2 * b.y + (1 - l1 - l2) * c.y);
      }
    };
    const walk = (o) => {
      if (skip(o)) return;
      const geo = o.isMesh && !blurOf(o) && o.geometry, p = geo && geo.attributes.position;
      if (p) {
        const ix = geo.index, m = o.matrixWorld, n = ix ? ix.count : p.count;
        for (let t = 0; t + 2 < n; t += 3) {
          _pv.fromBufferAttribute(p, ix ? ix.getX(t) : t).applyMatrix4(m);
          _pa.fromBufferAttribute(p, ix ? ix.getX(t + 1) : t + 1).applyMatrix4(m);
          _pc.fromBufferAttribute(p, ix ? ix.getX(t + 2) : t + 2).applyMatrix4(m);
          tri(_pv, _pa, _pc);
        }
      }
      for (let i = 0; i < o.children.length; i++) walk(o.children[i]);
    };
    walk(tpl);
    return { x0, z0, nx, nz, lo, hi };
  }
  /* A ship's deck, once per model: the top of her plan; the same grown by a
     cell each way, which is what an airframe has to clear (a 1 m raster can
     put the side of an island half a metre from where it is drawn); and her
     deck's level at the stern, the aft eighth, where every flight deck in
     the game is - a carrier's full length, an escort's pad aft of her hangar. */
  function deckOf(stpl) {
    if (stpl._deckTop) return stpl._deckTop;
    const P = planOf(stpl, o => !o.visible), nx = P.nx, nz = P.nz, top = P.hi;
    const grown = new Float32Array(nx * nz);
    for (let i = 0; i < nx; i++) for (let k = 0; k < nz; k++) {
      let m = -Infinity;
      for (let a = Math.max(0, i - 1); a <= Math.min(nx - 1, i + 1); a++)
        for (let b = Math.max(0, k - 1); b <= Math.min(nz - 1, k + 1); b++)
          if (top[a * nz + b] > m) m = top[a * nz + b];
      grown[i * nz + k] = m;
    }
    const n = new Map(), sum = new Map();
    let best = 0, L0 = 0;
    for (let i = 0; i < Math.max(2, nx >> 3); i++) for (let k = 0; k < nz; k++) {
      const y = top[i * nz + k];
      if (!(y > 0)) continue;
      const q = Math.round(y * 4), c = (n.get(q) || 0) + 1;
      n.set(q, c); sum.set(q, (sum.get(q) || 0) + y);
      if (c > best) best = c;
    }
    for (const [q, c] of n) if (c === best) { L0 = sum.get(q) / c; break; }
    return (stpl._deckTop = { x0: P.x0, z0: P.z0, nx, nz, top, grown, L0 });
  }
  /* An airframe's plan relative to its lowest point: what it would hit on a
     deck. The gear counts whether or not it is down; the rotor blades do not
     - they stop wherever they stop, and they ride high. Cells within WHEEL of
     the lowest point are what it stands on. Once per template. */
  function airPlanOf(tpl) {
    if (tpl._airPlan) return tpl._airPlan;
    const foot = footOf(tpl);
    /* on a deck its wings are folded (seatOnDeck), so its plan is the folded
       one; the template is spread again whatever happens, as every instance
       and ghost is copied from it */
    const folds = findParts(tpl, "wingfold");
    let P;
    try {
      poseFold(folds, 1);
      P = planOf(tpl, o => o.name === "rotor" || o.name === "rotordisc" || (!o.visible && o.name !== "gear"));
    } finally {
      if (folds.length) { poseFold(folds, 0); tpl.updateMatrixWorld(true); }
    }
    const dx = [], dz = [], lo = [], hi = [], sup = [];
    for (let i = 0; i < P.nx; i++) for (let k = 0; k < P.nz; k++) {
      const j = i * P.nz + k;
      if (!(P.lo[j] < Infinity)) continue;
      if (P.lo[j] - foot < PARK.WHEEL) sup.push(dx.length);
      dx.push(P.x0 + (i + 0.5) * PARK.CELL); dz.push(P.z0 + (k + 0.5) * PARK.CELL);
      lo.push(Math.max(0, P.lo[j] - foot)); hi.push(P.hi[j] - foot);
    }
    if (!sup.length && dx.length) sup.push(0);
    return (tpl._airPlan = { n: dx.length, dx: new Float32Array(dx), dz: new Float32Array(dz),
                             lo: new Float32Array(lo), hi: new Float32Array(hi), sup: new Int32Array(sup) });
  }
  /* A carrier's spots: every cell of her deck, at each of a few headings,
     scored, and the lowest wins. It stands at her deck level; each cell of
     what it stands on (WHEEL) over the side or over a lower level costs 30;
     whatever of it goes into her - island, hangar, the aircraft her modellers
     parked on her deck - 100 a metre; 4 a cell where it would stand in an
     aircraft already placed; 0.1 a cell hanging over the water, where a tail
     or a wingtip may. A deck park angles aircraft or turns them aft, so
     those headings are tried; a helicopter carrier's machines face forward
     or aft on her flight deck, which is her after half, and are drawn to her
     stern (0.2 a metre). A candidate is dropped the moment it cannot win.
     13 to 70 ms a carrier, the first time one is drawn. */
  const YAW_WING = [0, Math.PI, 0.4, -0.4, Math.PI + 0.4, Math.PI - 0.4];
  const YAW_ROTOR = [0, Math.PI, 0.35, -0.35];
  let _sx = new Float32Array(64), _sz = new Float32Array(64);
  function placeOn(D, A, occ, rotor) {
    const s = PARK.CELL, n = A.n, ns = A.sup.length, nx = D.nx, nz = D.nz, L = D.L0;
    const yaws = rotor ? YAW_ROTOR : YAW_WING, aft = rotor ? 0.2 : 0, xn = rotor ? Math.ceil(nx * 0.5) : nx;
    if (_sx.length < n) { _sx = new Float32Array(n); _sz = new Float32Array(n); }
    let best = null, bc = Infinity;
    for (let yi = 0; yi < yaws.length; yi++) {
      const yaw = yaws[yi], c = Math.cos(yaw), sn = Math.sin(yaw);
      for (let j = 0; j < n; j++) {                 // its cells turned, in her cells
        _sx[j] = (A.dx[j] * c + A.dz[j] * sn) / s + 0.5;
        _sz[j] = (-A.dx[j] * sn + A.dz[j] * c) / s + 0.5;
      }
      for (let ci = 0; ci < xn; ci++) for (let ck = 0; ck < nz; ck++) {
        let cost = aft * ci * s;
        for (let q = 0; q < ns && cost < bc; q++) {
          const j = A.sup[q], i = Math.floor(ci + _sx[j]), k = Math.floor(ck + _sz[j]);
          if (i < 0 || k < 0 || i >= nx || k >= nz || !(D.top[i * nz + k] >= L - 0.3)) cost += 30;
        }
        for (let j = 0; j < n && cost < bc; j++) {
          const i = Math.floor(ci + _sx[j]), k = Math.floor(ck + _sz[j]);
          if (i < 0 || k < 0 || i >= nx || k >= nz) { cost += 0.1; continue; }
          const m = i * nz + k, t = D.grown[m], y0 = L + A.lo[j];
          if (t === -Infinity) cost += 0.1;
          else if (t > y0 + 0.15) cost += 100 * (t - y0 - 0.15);
          if (occ.lo[m] <= L + A.hi[j] && y0 <= occ.hi[m]) cost += 4;
        }
        if (cost < bc) { bc = cost; best = { x: D.x0 + (ci + 0.5) * s, z: D.z0 + (ck + 0.5) * s, yaw, L, y: L, cost }; }
      }
    }
    return best;
  }
  /* An escort's helicopter: set down on the middle of her pad, facing her
     bow, the way it lands - the middle of what it stands on over the middle
     of the level deck that runs forward from her stern. Drawn 23.6 to 29.1 m
     long, it is longer than the pad of every escort in the game (a Burke's
     is 8 m, before her hangar), so its nose meets her hangar or deckhouse
     or its tail hangs over her wake: placed by score instead, it went off
     her stern or onto her bow. Her second helicopter waits in the hangar -
     it is drawn on the same pad, where the two read as one - as a Burke's
     and a Ticonderoga's do: two abreast on a 9 m beam were one pile of
     rotors with a wheel over the side. */
  function padSpot(D, A) {
    /* her pad: the largest stretch of deck at her deck level that reaches
       into her after fifth, in her after half */
    const nx = D.nx, nz = D.nz, lim = Math.ceil(nx * 0.5), aft = Math.ceil(nx * 0.2);
    const on = (m) => Math.abs(D.top[m] - D.L0) <= 0.3, seen = new Uint8Array(nx * nz);
    let sx = 0, sz = 0, best = 0;
    for (let i0 = 0; i0 < aft; i0++) for (let k0 = 0; k0 < nz; k0++) {
      if (seen[i0 * nz + k0] || !on(i0 * nz + k0)) continue;
      const q = [i0 * nz + k0];
      seen[q[0]] = 1;
      let ax = 0, az = 0;
      for (let h = 0; h < q.length; h++) {
        const m = q[h], i = (m / nz) | 0, k = m % nz;
        ax += i; az += k;
        if (i > 0 && !seen[m - nz] && on(m - nz)) { seen[m - nz] = 1; q.push(m - nz); }
        if (i < lim - 1 && !seen[m + nz] && on(m + nz)) { seen[m + nz] = 1; q.push(m + nz); }
        if (k > 0 && !seen[m - 1] && on(m - 1)) { seen[m - 1] = 1; q.push(m - 1); }
        if (k < nz - 1 && !seen[m + 1] && on(m + 1)) { seen[m + 1] = 1; q.push(m + 1); }
      }
      if (q.length > best) { best = q.length; sx = ax / q.length; sz = az / q.length; }
    }
    /* its middle: along it, halfway between its wheels fore and aft; across
       it, the middle of its span (the lowest wheel alone is to one side) */
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (let j = 0; j < A.sup.length; j++) { x0 = Math.min(x0, A.dx[A.sup[j]]); x1 = Math.max(x1, A.dx[A.sup[j]]); }
    for (let j = 0; j < A.n; j++) { z0 = Math.min(z0, A.dz[j]); z1 = Math.max(z1, A.dz[j]); }
    const xc = D.x0 + (sx + 0.5) * PARK.CELL - (x0 + x1) / 2, z = D.z0 + (sz + 0.5) * PARK.CELL - (z0 + z1) / 2;
    /* then along her centreline, as far as its wheels stay on the pad, to
       where the least of it goes into her hangar */
    let bx = xc, bc = Infinity;
    for (let d = -15; d <= 15; d += 0.5) {
      const x = xc + d;
      let c = Math.abs(d) * 0.01;
      for (let j = 0; j < A.n && c < bc; j++) {
        const i = Math.floor((x + A.dx[j] - D.x0) / PARK.CELL), k = Math.floor((z + A.dz[j] - D.z0) / PARK.CELL);
        const m = i < 0 || k < 0 || i >= nx || k >= nz ? -1 : i * nz + k;
        if (A.lo[j] < PARK.WHEEL && !(m >= 0 && on(m))) c += 1000;
        if (m >= 0 && D.grown[m] > D.L0 + A.lo[j] + 0.15) c += D.grown[m] - D.L0 - A.lo[j] - 0.15;
      }
      if (c < bc) { bc = c; bx = x; }
    }
    return { x: bx, z, yaw: 0, L: D.L0, y: D.L0, cost: 0 };
  }
  /* what a placed airframe takes up, for the next one to keep clear of */
  function stamp(D, A, sp, occ) {
    const c = Math.cos(sp.yaw), sn = Math.sin(sp.yaw);
    for (let j = 0; j < A.n; j++) {
      const i = Math.floor((sp.x + A.dx[j] * c + A.dz[j] * sn - D.x0) / PARK.CELL);
      const k = Math.floor((sp.z - A.dx[j] * sn + A.dz[j] * c - D.z0) / PARK.CELL);
      if (i < 0 || k < 0 || i >= D.nx || k >= D.nz) continue;
      const m = i * D.nz + k;
      if (sp.L + A.lo[j] < occ.lo[m]) occ.lo[m] = sp.L + A.lo[j];
      if (sp.L + A.hi[j] > occ.hi[m]) occ.hi[m] = sp.L + A.hi[j];
    }
  }
  /* the deck under the spot's lowest points, from her own drawn mesh: a
     downward ray under each, once per model and spot; it stands on the
     highest of them */
  function settle(sp, tpl, stpl) {
    footOf(tpl);
    const c = Math.cos(sp.yaw), sn = Math.sin(sp.yaw), P = tpl._footPts;
    let y = -Infinity;
    for (let i = 0; i < P.length; i += 2) {
      const h = surfaceUnder(stpl, sp.x + P[i] * c + P[i + 1] * sn, sp.L + 1, sp.z - P[i] * sn + P[i + 1] * c);
      if (Math.abs(h - sp.L) < 1 && h > y) y = h;
    }
    sp.y = y > -Infinity ? y : sp.L;
    return sp;
  }
  function freshOcc(D) {
    return { lo: new Float32Array(D.nx * D.nz).fill(Infinity), hi: new Float32Array(D.nx * D.nz).fill(-Infinity) };
  }
  /* A ship's spots, once per model, deck size and complement, laid out for
     the complement the game embarks (G.deckAircraftFor), the largest first. On
     a carrier a machine that cannot be placed cleanly (SHARE) is drawn on the
     spot of one of its own kind, as on an escort: it is in the hangar.
     THE COMPLEMENT IS PART OF THE KEY, because a model is not a ship: a hull
     with no model of its own draws a same-role peer's (modelKeyFor), and
     thirteen carriers draw carrier_n's - every British and French one and the
     Soviet Kiev. Keyed on the model and the deck size alone, the first of those
     sharing a template to take an aircraft aboard laid the deck out for all of
     them, and the rest were fitted onto spots made for another navy's
     aeroplanes. Measured with tools/jsc/parked3d_check.js C once the French
     1980s deck became Crusader, Super Etendard and Lynx: the Kiev's Ka-27 and
     Yak-38 overlapped by 3.9 m2 on a layout made for Clemenceau. The plan is
     asked once per aircraft coming aboard, not per frame. */
  function deckLayout(S, stpl) {
    const n = Math.max(1, S.deckSlots ? S.deckSlots() : 1);
    let key = n + (S.def.carrier ? "c" : "e") + (S.def.heloCarrier ? "h" : "") + ":";
    for (let i = 0; i < n; i++) key += (G.deckAircraftFor ? G.deckAircraftFor(S, i) : "") + ",";
    const kept = stpl._deck || (stpl._deck = {});
    if (kept[key]) return kept[key];
    const D = deckOf(stpl), escort = !S.def.carrier, rotor = escort || !!S.def.heloCarrier;
    const era = S.owner.era || (G.era || "e20"), tpls = [], plans = [], hover = [];
    for (let i = 0; i < n; i++) {
      let id = G.deckAircraftFor ? G.deckAircraftFor(S, i) : null;
      if (!id || !UNITS[id]) id = (G.deckTypesFor ? G.deckTypesFor(S) : [])[0];
      const t = id && UNITS[id] ? getModel(UNITS[id], S.owner.color, era) : null;
      tpls.push(t); plans.push(t ? airPlanOf(t) : null); hover.push(!!(id && UNITS[id] && UNITS[id].hover));
    }
    const order = tpls.map((t, i) => i).sort((a, b) => (plans[b] ? plans[b].n : 0) - (plans[a] ? plans[a].n : 0) || a - b);
    const occ = freshOcc(D), spots = new Array(n);
    let first = null;
    for (const i of order) {
      if (!plans[i] || (escort && first)) continue;
      const sp = escort ? padSpot(D, plans[i]) : placeOn(D, plans[i], occ, rotor);
      if (sp && (!first || sp.cost < PARK.SHARE)) {
        spots[i] = settle(sp, tpls[i], stpl); stamp(D, plans[i], sp, occ);
        if (!first) first = sp;
      }
    }
    for (const i of order) if (!spots[i]) {
      for (const j of order) if (spots[j] && hover[j] === hover[i]) { spots[i] = spots[j]; break; }
      if (!spots[i]) spots[i] = first || { x: D.x0 + D.nx * PARK.CELL * 0.1, z: 0, yaw: 0, L: D.L0, y: D.L0, cost: Infinity };
    }
    return (kept[key] = { D, n, tpls, plans, hover, spots, escort, rotor, alt: new Array(n) });
  }
  /* a type the layout was not made for - the stealth fighter or the AEW
     aircraft bought onto a spare spot - gets its own place, clear of what
     the other spots were laid out for; once per model, spot and type */
  function spotFor(lay, k, tpl, stpl) {
    if (lay.tpls[k] === tpl) return lay.spots[k];
    const m = lay.alt[k] || (lay.alt[k] = new Map());
    let sp = m.get(tpl);
    if (!sp) {
      const A = airPlanOf(tpl), occ = freshOcc(lay.D);
      for (let i = 0; i < lay.n; i++) if (lay.spots[i] !== lay.spots[k] && lay.plans[i]) stamp(lay.D, lay.plans[i], lay.spots[i], occ);
      sp = settle((lay.escort ? padSpot(lay.D, A) : placeOn(lay.D, A, occ, lay.rotor)) || Object.assign({}, lay.spots[k]), tpl, stpl);
      m.set(tpl, sp);
    }
    return sp;
  }
  /* the spot for one more aircraft coming aboard: a free one laid out for
     its type, else for its kind (rotor or wing), else any free one; with more
     aboard than she has spots, the least used */
  function claimSpot(S, lay, rec, e) {
    const used = new Array(lay.n).fill(0);
    for (const r of ents.values())
      if (r !== rec && r.deckShip === S && r.deckK >= 0 && r.deckK < lay.n) used[r.deckK]++;
    let best = 0, bs = Infinity;
    for (let k = 0; k < lay.n; k++) {
      const sc = used[k] * 10 + (lay.tpls[k] === rec.tpl ? 0 : lay.hover[k] === !!e.def.hover ? 1 : 2);
      if (sc < bs) { bs = sc; best = k; }
    }
    return best;
  }
  /* where a machine on the ground or an airbase's pad rests: on the pad
     under it, or on the ground where that is higher - the apron is drawn
     flat at the base's middle, and on a hillside the slope can bury it */
  function landRest(e, rec, host, ground) {
    return (host ? Math.max(padTop(host, e, ground), ground) : ground) - rec.foot;
  }
  function easeAlt(rec, want, dt) {
    if (rec.alt === undefined) rec.alt = want;      // spawns at its real height
    const rate = (want > rec.alt ? 26 : 17) * dt;   // metres a second
    rec.alt += U.clamp(want - rec.alt, -rate, rate);
    return rec.alt;
  }
  /* Carrier aircraft stand on a deck with their wings folded. A hero may
     give its folding outer panels as groups named "wingfold": origin on the
     hinge line, unrotated at rest (spread, as it flies), and
     userData.fold = { axis: [x, y, z] (its own frame), angle (rad) }, the
     turn about the hinge that gives the real folded shape. Render only: the
     game's rules do not know a wing folds. They fold once the machine stands
     at rest on her deck (FOLD_S to fold; at once when it is set down there
     already, as a deck park is drawn the first time), and spread the moment
     it is anything else - coming down to her, lifting off, in flight, on an
     airbase or the ground - so a wing is never folded in the air. A fog
     ghost is a copy of the template, spread, except the ghost of a machine
     last seen standing on a deck, which keeps the fold it was seen with
     (notePoses), as it keeps the spot. The deck planner lays a deck out
     with the folded plan (airPlanOf). */
  const FOLD_S = 3;
  const _fax = new THREE.Vector3();
  function poseFold(parts, f) {
    for (let i = 0; i < parts.length; i++) {
      const d = parts[i].userData.fold;
      if (d) parts[i].quaternion.setFromAxisAngle(_fax.set(d.axis[0], d.axis[1], d.axis[2]), d.angle * f);
    }
  }
  function foldOnDeck(rec, rest, dt) {
    if (!rec.folds || !rec.folds.length) return;
    const f = !rest ? 0 : rec.fold === undefined ? 1 : Math.min(1, rec.fold + dt / FOLD_S);
    if (f !== rec.fold) { rec.fold = f; poseFold(rec.folds, f); }
  }
  /* An aircraft on a ship's deck, or coming down to it, or leaving it: set
     after every entity has been placed this frame, so the ship is where she
     will be drawn. The machine stays with the ship it is drawn on
     (rec.deckShip) until it is clear of her, whatever the game does with its
     home meanwhile.
     - On her deck, or coming down to it (its home, parked or landing): the
       spot is turned with her - her heading, her roll in the sea, and the
       list, trim and settling js/damage3d.js gave her last frame (it runs
       after this; a list moves 0.03 rad/s at most, so a frame late is under
       3 cm at 25 m from her middle). An enemy ship in fog whose machine is
       in sight is not drawn, so her pose is then where the game has her. It
       eases down from the height the game flies it at and blends from where
       the game has it onto the spot over the last 30 m, heading included.
       The heading is carried on from the frame before, not re-wrapped: re-
       wrapping it every frame flipped the blend the long way round whenever
       the gap between the two headings passed 180 degrees, up to 151 degrees
       in one frame on a destroyer's take-off.
     - Leaving her - a sortie, a new home, a ship sunk or gone: from where it
       is drawn at that moment, the offset from where the game has it (the
       spot, and her heading and tilt) is held and dies away as it climbs the
       30 m. The game already has an airframe at full speed from the first
       frame, so it goes with the game at once rather than lifting straight
       up and then racing to catch it (a jet fell 24.5 m behind); and a home
       moved to another ship, or a ship sunk under it, no longer snaps it to
       the new spot or the game's slot (338 m and 45 m in one frame).
     Nothing allocated: arithmetic on what is cached. */
  function seatOnDeck(e, rec, dt, seen) {
    const g = rec.grp, mx = gx2m(e.x), mz = gx2m(e.y);
    const onDeck = e.parked || (e.order && e.order.type === "parked");
    const landing = e.order && (e.order.type === "rtb" || e.order.type === "land") && !e.moving;
    const host = e.padOn && !e.padOn.dead && e.padOn.kind !== "building" ? e.padOn : null;
    let S = rec.deckShip;
    if (!S) {                                         // coming aboard: a spot on her deck
      S = rec.deckShip = host;
      rec.deckTpl = getModel(S.def, S.owner.color, S.owner.era || (G.era || "e20"));
      const lay = deckLayout(S, rec.deckTpl);
      rec.deckK = claimSpot(S, lay, rec, e);
      rec.deckSp = spotFor(lay, rec.deckK, rec.tpl, rec.deckTpl);
      rec.deckMode = 0; rec.deckW = 0; rec.lsX = rec.lsZ = rec.lsY = 0; rec.gameX = mx; rec.gameZ = mz;
    }
    let my, w, rest = false;
    if (S === host && (onDeck || landing)) {
      const sr = seen.has(S.id) ? ents.get(S.id) : null;
      let px, py, pz, rx, ry, rz;
      if (sr) {
        const sg = sr.grp;
        rec.lsX = sr.listX || 0; rec.lsZ = sr.listZ || 0; rec.lsY = sr.sinkY || 0;
        px = sg.position.x; py = sg.position.y; pz = sg.position.z;
        rx = sg.rotation.x; ry = sg.rotation.y; rz = sg.rotation.z;
      } else {                                        // as the entity sync would draw her
        px = gx2m(S.x); py = 0.35; pz = gx2m(S.y); ry = -S.ang;
        rz = Math.sin(G.time * 0.8 + S.id) * 0.012; rx = Math.sin(G.time * 0.6 + S.id * 2) * 0.008;
      }
      rx += rec.lsX; rz += rec.lsZ; py += rec.lsY;
      /* the spot, raised by the machine's own foot, turned as three.js turns
         her group (Euler YXZ: roll, then pitch, then heading) */
      const sp = rec.deckSp, lx = sp.x, ly = sp.y - rec.foot, lz = sp.z;
      const cz = Math.cos(rz), snz = Math.sin(rz), cx = Math.cos(rx), snx = Math.sin(rx);
      const cy = Math.cos(ry), sny = Math.sin(ry);
      const x1 = lx * cz - ly * snz, y1 = lx * snz + ly * cz;
      const y2 = y1 * cx - lz * snx, z2 = y1 * snx + lz * cx;
      const ax = px + x1 * cy + z2 * sny, ay = py + y2, az = pz - x1 * sny + z2 * cy;
      /* her tilt, in the frame of an airframe turned sp.yaw on her deck */
      const cw = Math.cos(sp.yaw), sw = Math.sin(sp.yaw), ayaw = ry + sp.yaw;
      const arx = rx * cw - rz * sw, arz = rx * sw + rz * cw;
      rec.deckRest = ay;
      my = easeAlt(rec, onDeck ? ay : ay + 2.8, dt);
      rest = onDeck && my <= ay + 0.05;
      const h = U.clamp((my - ay) / PARK.BLEND, 0, 1);
      w = 1 - h * h * (3 - 2 * h);
      let dh;
      if (rec.deckMode !== 1) {
        /* into the blend: from the heading it is drawn at now, so the switch
           itself moves nothing (the flight heading is held from here: the
           game turns a machine to -90 degrees the moment it is serviced) */
        const yp = g.rotation.y, a1 = ayaw + TAU * Math.round((yp - ayaw) / TAU);
        rec.parkYaw = w < 0.999 ? (yp - w * a1) / (1 - w) : yp;
        dh = a1 - rec.parkYaw;
        rec.deckMode = 1;
      } else {
        dh = ayaw - rec.parkYaw;
        dh += TAU * Math.round((rec.dh - dh) / TAU);    // carried on from the last frame
      }
      rec.dh = dh;
      g.position.set(mx + (ax - mx) * w, my, mz + (az - mz) * w);
      g.rotation.set(arx * w, rec.parkYaw + dh * w, arz * w);
    } else if (!(Math.hypot(mx - rec.gameX, mz - rec.gameZ) > PARK.JUMP)) {
      if (rec.deckMode !== 2) {
        rec.deckMode = 2;
        rec.dW0 = rec.deckW;
        rec.dX = rec.deckX - mx; rec.dZ = rec.deckZ - mz;    // the loop has moved the group to the game's place
        const d = g.rotation.y + e.ang;
        rec.dYaw = d - TAU * Math.round(d / TAU);
        rec.dRX = g.rotation.x; rec.dRZ = g.rotation.z;
      }
      my = easeAlt(rec, Math.max(heightAt(e.x, e.y) + 6, AIR_ALT), dt);
      const h = U.clamp((my - rec.deckRest) / PARK.BLEND, 0, 1);
      w = 1 - h * h * (3 - 2 * h);
      const f = rec.dW0 > 1e-3 ? Math.min(1, w / rec.dW0) : 0;
      g.position.set(mx + rec.dX * f, my, mz + rec.dZ * f);
      g.rotation.set(rec.dRX * f, -e.ang + rec.dYaw * f, rec.dRZ * f);
      if (f <= 0) { rec.deckShip = null; rec.deckK = -1; rec.deckMode = 0; w = 0; }
    } else {
      /* the game moved it further than a jet flies in a frame, onto a ramp
         far off - a carrier sunk under what was parked on her re-homes it to
         the nearest free ramp and sets it down there, 1.3 km away in one
         probe: that is drawn as the game has it, straight onto its spot or
         its pad there, not slid across the sea */
      rec.deckShip = null; rec.deckK = -1; rec.deckMode = 0; rec.deckW = 0; rec.alt = undefined;
      if (host && (onDeck || landing)) { seatOnDeck(e, rec, dt, seen); return; }
      const pad = e.padOn && !e.padOn.dead ? e.padOn : null, ground = heightAt(e.x, e.y);
      my = easeAlt(rec, onDeck ? landRest(e, rec, pad, ground) : Math.max(ground + 6, AIR_ALT), dt);
      g.position.set(mx, my, mz); g.rotation.set(0, -e.ang, 0);
      w = 0;
    }
    rec.deckW = w; rec.deckX = g.position.x; rec.deckZ = g.position.z; rec.gameX = mx; rec.gameZ = mz;
    if (rec.gear) rec.gear.visible = my < rec.deckRest + 18;
    foldOnDeck(rec, rest, dt);
  }

  /* ---------------- faction architecture ----------------
     One shared set of building models, restyled per faction so a base reads
     as NATO / Eastern / PLA at a glance: different concrete and roof palettes,
     different trim, and a distinctive rooftop fixture.                      */
  const ARCH = {
    nato: { wall: 0x9aa0a0, wall2: 0x7f8688, roof: 0x8e9698, trim: 0x4b8fe0,
            accent: 0xd8dde0, style: "nato" },
    pact: { wall: 0x6e7263, wall2: 0x585d52, roof: 0x5d6357, trim: 0xd6503f,
            accent: 0x8d5a4a, style: "pact" },
    pla:  { wall: 0x9b8f74, wall2: 0x7d735d, roof: 0x6f6a58, trim: 0xe0a33c,
            accent: 0xb8433a, style: "pla" },
  };
/* ==================================================================
   PERIOD ARCHITECTURE

   A field installation in 1955 does not look like one in 2025, and the
   difference is mostly in materials and in what is bolted to the roof.
   The 1950s built in brick and rendered masonry with pitched roofs and a
   chimney; the 1960s poured raw concrete and put a lattice mast on top;
   the 1980s draped everything in camouflage netting; from the 1990s the
   roofline fills with satellite dishes, and today with flat phased-array
   panels. This layer applies on top of the faction palette rather than
   replacing it, so a Chinese barracks still reads as Chinese - just as a
   Chinese barracks of its decade.
   ================================================================== */
  const ERA_ARCH = {
    e50: { tint: 0xa8785c, mix: 0.42, rough: 0.97, fixture: "chimney",
           name: "brick and rendered masonry" },
    e60: { tint: 0x8f8d84, mix: 0.34, rough: 0.95, fixture: "lattice",
           name: "poured concrete" },
    e80: { tint: 0x6f7358, mix: 0.28, rough: 0.93, fixture: "netting",
           name: "concrete under camouflage netting" },
    e90: { tint: 0x8a8b82, mix: 0.16, rough: 0.88, fixture: "dish",
           name: "prefabricated panel" },
    e00: { tint: 0x8e9490, mix: 0.08, rough: 0.82, fixture: "array",
           name: "modular shelters" },
    e20: { tint: 0x000000, mix: 0.00, rough: 0.00, fixture: "array",
           name: "present-day" },
  };

  /* shift a building's surfaces toward the materials of its period */
  function eraRestyle(model, E) {
    if (!E || E.mix <= 0) return;
    const tint = new THREE.Color(E.tint);
    model.traverse(o => {
      if (!o.isMesh) return;
      const list = Array.isArray(o.material) ? o.material : [o.material];
      const out = [];
      for (const m of list) {
        if (!m || !m.color) { out.push(m); continue; }
        const c = m.clone();
        const hsl = { h: 0, s: 0, l: 0 };
        c.color.getHSL(hsl);
        /* leave painted markings, glass and bright metal alone - and the
           owner's colour, whatever its shade (tagParts) */
        if (hsl.s < 0.45 && hsl.l > 0.08 && !(m.userData && m.userData.team)) {
          /* the surface may already have been converted; tint in its own space */
          const t = tint.clone();
          if (m.userData && m.userData._srgbDone) t.convertSRGBToLinear();
          c.color.lerp(t, E.mix);
          if (E.rough) c.roughness = Math.max(c.roughness || 0.6, E.rough);
          if (E.rough > 0.9) c.metalness = Math.min(c.metalness || 0, 0.05);
        }
        c.userData = Object.assign({}, c.userData);
        out.push(c);
      }
      o.material = Array.isArray(o.material) ? out : out[0];
    });
  }

  /* ---------------- standing the rooftop kit on the building ----------------
     The faction's kit and the period's were bolted on at fixed fractions of
     the plot: the faction's at the height of the template's bounding box,
     the period's at the top of its tallest broad part. Wherever the tallest
     thing on a plot was not under a spot, the kit hung in the air, and the
     plot-sized pieces - the PLA eave slabs, the 1980s net - roofed yards and
     tank farms. Measured by tools/jsc/fixtures3d_check.js over all 43
     structures, 8 armies and 6 periods, the worst drop from a piece's foot
     to the surface under it was 30.2 m on the construction yard, 27.7 m on
     the radar, 27.3 m on the lab, 27.0 m on the airbase, 23.0 m on the
     naval yard, 21.8 m on the power plant (its radome, over the tank
     farm), 20.9 m on the factory; pieces reached up to 8.9 m past the
     plots of the town blocks and the field works; and 113 of 139 roof
     fires lit on burning structures sat on floating kit or on the net, up
     to 13.3 m over the surface under them.
     So every piece now stands on the surface under it. When a template is
     built (once, never per frame) the model is looked at from above: its
     opaque meshes rasterised every half metre and binned for exact rays -
     not a gun mount, a turret or a rotor, which turn, and whose sweep is
     kept clear. A piece goes to the spot nearest its old one where its foot
     and a pad at least 3 m across are all roof - the building's own
     structure (tagParts), a storey up: never a yard, a pad or an apron, a
     hull on the slip or a crane's yellow steel - and near enough level, and
     stands at the lowest point under its foot: nothing shows air beneath
     it, and a pitch or a vent only takes the foot a little into the roof.
     Pieces are laid in turn and none overlaps another. Per piece:
       - masts, the whip, the lattice mast and the brick chimney stand on
         any such roof, let into a pitch as a chimney rises through one: the
         masts by up to a tenth of their height, the period's pieces by up
         to 1.4 m, a fifth to a quarter of theirs;
       - the radomes, the dish and the array face need a level roof; the
         radome, the Pact stack and the banner board (on its lower edge,
         turned along the roof where it runs that way) are tried smaller,
         down to 45%, and the dish, the face and the modern radome down to
         60%, where no roof takes them whole;
       - the PLA eaves are sized to the broadest roof level within 0.7 m
         (the 0.9 m slab swallows the vents) and the masts stand on the upper
         tier; the net to the broadest roof within 2 m, its poles reaching
         down to the roof at each corner;
       - a piece no roof can carry is left off. A well pad, a revetted
         hardstand or a sawtooth hall has no level patch for a radome: it
         gets none, rather than one perched on a ridge or over the gravel.
     It costs a template about 9 ms more to build under jsc (ten structures
     from cold: 117 -> 206 ms), and draws the same meshes or fewer. */
  const KIT_CS = 0.5;                 // the search raster, metres
  const KIT_ROOF = 3.0;               // a roof is a storey up; below it is yard, pad or apron
  const KIT_PAD = 1.5;                // and at least 3 m across under any piece
  const KIT_TURNS = { turret: 1, mountwrap: 1, rotor: 1, rotordisc: 1, tailrotor: 1 };
  let kitMemo = null;                 // the last model measured: { key, S }

  function kitOpaque(mat) {
    const list = Array.isArray(mat) ? mat : [mat];
    for (const m of list) if (m && m.visible !== false && !(m.transparent && m.opacity < 0.99)) return true;
    return false;
  }
  /* the model seen from above, in root's own frame: its triangles binned by
     the ground they cover, and the top a ray meets every 0.5 m */
  function kitSurface(root, key) {
    root.updateMatrixWorld(true);
    /* the same def is not always the same model (a civilian block varies
       its storeys build to build), so the model's own size is in the key */
    const bb = new THREE.Box3().setFromObject(root);
    let nm = 0;
    root.traverse((o) => { if (o.isMesh) nm++; });
    key += "|" + nm + "|" + [bb.min.x, bb.min.y, bb.min.z, bb.max.x, bb.max.y, bb.max.z].map((q) => q.toFixed(2)).join(",");
    if (kitMemo && kitMemo.key === key) return kitMemo.S;
    const inv = new THREE.Matrix4().copy(root.matrixWorld).invert(), M = new THREE.Matrix4();
    const v = new THREE.Vector3(), c = new THREE.Vector3();
    const list = [], keep = [];
    let n = 0, bx0 = Infinity, bx1 = -Infinity, bz0 = Infinity, bz1 = -Infinity;
    const walk = (o, turns) => {
      if (o.visible === false) return;
      if (!turns && KIT_TURNS[o.name]) {
        /* whatever turns sweeps a circle about its pivot: keep it clear */
        turns = true;
        c.setFromMatrixPosition(o.matrixWorld).applyMatrix4(inv);
        let r = 0;
        o.traverse((q) => {
          if (!q.isMesh || !q.geometry || !q.geometry.attributes.position) return;
          const p = q.geometry.attributes.position;
          M.multiplyMatrices(inv, q.matrixWorld);
          for (let i = 0; i < p.count; i++) {
            v.fromBufferAttribute(p, i).applyMatrix4(M);
            r = Math.max(r, Math.hypot(v.x - c.x, v.z - c.z));
          }
        });
        if (r > 0) keep.push({ x0: c.x - r, x1: c.x + r, z0: c.z - r, z1: c.z + r });
      }
      if (!turns && o.isMesh && o.geometry && o.geometry.attributes.position && kitOpaque(o.material)) {
        list.push(o);
        n += ((o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3) | 0;
      }
      for (let i = 0; i < o.children.length; i++) walk(o.children[i], turns);
    };
    walk(root, false);
    const V = new Float32Array(n * 9), F = new Uint8Array(n);
    let t = 0;
    for (const o of list) {
      const g = o.geometry, p = g.attributes.position, idx = g.index, cnt = idx ? idx.count : p.count;
      /* which of its triangles are the building's own structure (tagParts):
         per material group where a mesh carries several */
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      const built = (q) => {
        let mi = 0;
        if (mats.length > 1)
          for (const gr of g.groups) if (q >= gr.start && q < gr.start + gr.count) { mi = gr.materialIndex; break; }
        const m = mats[mi];
        return m && m.userData && m.userData.built ? 1 : 0;
      };
      const flat = mats.length > 1 ? -1 : built(0);
      const e = M.multiplyMatrices(inv, o.matrixWorld).elements;
      /* each vertex moved into root's frame once, then gathered by index */
      const P = new Float32Array(p.count * 3);
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
        const X = e[0] * x + e[4] * y + e[8] * z + e[12], Z = e[2] * x + e[6] * y + e[10] * z + e[14];
        P[i * 3] = X; P[i * 3 + 1] = e[1] * x + e[5] * y + e[9] * z + e[13]; P[i * 3 + 2] = Z;
        if (X < bx0) bx0 = X; if (X > bx1) bx1 = X;
        if (Z < bz0) bz0 = Z; if (Z > bz1) bz1 = Z;
      }
      const I = idx ? idx.array : null;
      for (let q = 0; q + 2 < cnt; q += 3, t++) {
        F[t] = flat >= 0 ? flat : built(q);
        for (let k = 0; k < 3; k++) {
          const vi = (I ? I[q + k] : q + k) * 3;
          V[t * 9 + k * 3] = P[vi]; V[t * 9 + k * 3 + 1] = P[vi + 1]; V[t * 9 + k * 3 + 2] = P[vi + 2];
        }
      }
    }
    if (!t) return null;
    const cb = Math.max(0.75, Math.max(bx1 - bx0, bz1 - bz0) / 64);
    const mx = Math.max(1, Math.ceil((bx1 - bx0) / cb)), mz = Math.max(1, Math.ceil((bz1 - bz0) / cb));
    const start = new Int32Array(mx * mz + 1);
    const cells = (o, f) => {
      const i0 = Math.max(0, Math.floor((Math.min(V[o], V[o + 3], V[o + 6]) - bx0) / cb));
      const i1 = Math.min(mx - 1, Math.floor((Math.max(V[o], V[o + 3], V[o + 6]) - bx0) / cb));
      const j0 = Math.max(0, Math.floor((Math.min(V[o + 2], V[o + 5], V[o + 8]) - bz0) / cb));
      const j1 = Math.min(mz - 1, Math.floor((Math.max(V[o + 2], V[o + 5], V[o + 8]) - bz0) / cb));
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) f(j * mx + i);
    };
    for (let q = 0; q < t; q++) cells(q * 9, (k) => { start[k + 1]++; });
    for (let k = 0; k < mx * mz; k++) start[k + 1] += start[k];
    const fill = start.slice(0, mx * mz), items = new Int32Array(start[mx * mz]);
    for (let q = 0; q < t; q++) cells(q * 9, (k) => { items[fill[k]++] = q; });
    const S = { V, F, cb, mx, mz, start, items, bx0, bz0, built: 0,
                box: { x0: bx0, x1: bx1, z0: bz0, z1: bz1 }, keep,
                x0: bx0, z0: bz0, nx: Math.max(1, Math.ceil((bx1 - bx0) / KIT_CS)),
                nz: Math.max(1, Math.ceil((bz1 - bz0) / KIT_CS)), T: null, win: {} };
    /* the raster: each triangle drawn onto the lattice under it, keeping
       the highest - what a ray dropped at every lattice point would meet */
    const W = S.nx + 1, T = S.T = new Float32Array(W * (S.nz + 1)).fill(-Infinity);
    const B = S.B = new Uint8Array(W * (S.nz + 1));
    for (let q = 0; q < t; q++) {
      const o = q * 9, ax = V[o], ay = V[o + 1], az = V[o + 2];
      const e1x = V[o + 3] - ax, e1z = V[o + 5] - az, e2x = V[o + 6] - ax, e2z = V[o + 8] - az;
      const det = e1x * e2z - e2x * e1z;
      if (det > -1e-9 && det < 1e-9) continue;          // a wall seen edge-on covers no ground
      const i0 = Math.max(0, Math.ceil((Math.min(ax, V[o + 3], V[o + 6]) - bx0) / KIT_CS - 1e-6));
      const i1 = Math.min(S.nx, Math.floor((Math.max(ax, V[o + 3], V[o + 6]) - bx0) / KIT_CS + 1e-6));
      const j0 = Math.max(0, Math.ceil((Math.min(az, V[o + 5], V[o + 8]) - bz0) / KIT_CS - 1e-6));
      const j1 = Math.min(S.nz, Math.floor((Math.max(az, V[o + 5], V[o + 8]) - bz0) / KIT_CS + 1e-6));
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
        const px = bx0 + i * KIT_CS - ax, pz = bz0 + j * KIT_CS - az;
        const u = (px * e2z - e2x * pz) / det, w = (e1x * pz - px * e1z) / det;
        if (u < -1e-6 || w < -1e-6 || u + w > 1 + 1e-6) continue;
        const y = ay + u * (V[o + 4] - ay) + w * (V[o + 7] - ay);
        if (y > T[j * W + i]) { T[j * W + i] = y; B[j * W + i] = F[q]; }
      }
    }
    kitMemo = { key, S };
    return S;
  }
  /* the highest surface of the model at (x, z), -Infinity over bare air;
     S.built says whether it is the building's own structure */
  function kitTop(S, x, z) {
    const i = Math.min(S.mx - 1, Math.floor((x - S.bx0) / S.cb)), j = Math.min(S.mz - 1, Math.floor((z - S.bz0) / S.cb));
    if (i < 0 || j < 0) return -Infinity;
    const V = S.V, c = j * S.mx + i;
    let best = -Infinity;
    for (let q = S.start[c]; q < S.start[c + 1]; q++) {
      const o = S.items[q] * 9, ax = V[o], ay = V[o + 1], az = V[o + 2];
      const e1x = V[o + 3] - ax, e1z = V[o + 5] - az, e2x = V[o + 6] - ax, e2z = V[o + 8] - az;
      const det = e1x * e2z - e2x * e1z;
      if (det > -1e-9 && det < 1e-9) continue;
      const px = x - ax, pz = z - az;
      const u = (px * e2z - e2x * pz) / det, w = (e1x * pz - px * e1z) / det;
      if (u < -1e-6 || w < -1e-6 || u + w > 1 + 1e-6) continue;
      const y = ay + u * (V[o + 4] - ay) + w * (V[o + 7] - ay);
      if (y > best) { best = y; S.built = S.F[S.items[q]]; }
    }
    return best;
  }
  /* one template's layout: the surface, plus what its own pieces add - a
     slab a later piece may stand on, a piece nothing else may overlap */
  function kitPlan(root, key) {
    const S = kitSurface(root, key);
    if (!S) return null;
    const K = { S, root, T: Float32Array.from(S.T), B: Uint8Array.from(S.B), keep: S.keep.slice(), decks: [], put: [],
                lo: new Float32Array(S.nx * S.nz), hi: new Float32Array(S.nx * S.nz), win: {} };
    kitCells(K);
    return K;
  }
  /* each raster cell: the lowest and the highest of its four corners (a
     cell is roof when even its lowest is, and all four are built) */
  function kitCells(K) {
    const S = K.S, nx = S.nx, nz = S.nz, T = K.T, Bt = K.B, W = nx + 1;
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
      const k = j * W + i, a = T[k], b = T[k + 1], c = T[k + W], d = T[k + W + 1];
      K.lo[j * nx + i] = Bt[k] && Bt[k + 1] && Bt[k + W] && Bt[k + W + 1] ? Math.min(a, b, c, d) : -Infinity;
      K.hi[j * nx + i] = Math.max(a, b, c, d);
    }
    K.win = K.decks.length ? {} : K.S.win;
  }
  /* the lowest lo and the highest hi of every a x b block of cells, by its
     first cell: van Herk's running minimum, a few comparisons a cell
     whatever the size of the block */
  function kitRun(src, dst, n, step, off, w, mn, g, h) {
    for (let i = 0; i < n; i++) {
      const v = src[off + i * step];
      g[i] = i % w ? (mn ? Math.min(g[i - 1], v) : Math.max(g[i - 1], v)) : v;
    }
    for (let i = n - 1; i >= 0; i--) {
      const v = src[off + i * step];
      h[i] = (i + 1) % w && i < n - 1 ? (mn ? Math.min(h[i + 1], v) : Math.max(h[i + 1], v)) : v;
    }
    for (let i = 0; i + w <= n; i++) dst[off + i * step] = mn ? Math.min(h[i], g[i + w - 1]) : Math.max(h[i], g[i + w - 1]);
  }
  function kitWin(K, a, b) {
    const key = a + "x" + b;
    if (K.win[key]) return K.win[key];
    const nx = K.S.nx, nz = K.S.nz, n = nx * nz, g = new Float32Array(Math.max(nx, nz)), h = new Float32Array(Math.max(nx, nz));
    const out = { lo: new Float32Array(n).fill(-Infinity), hi: new Float32Array(n).fill(Infinity) };
    for (const mn of [true, false]) {
      const src = mn ? K.lo : K.hi, dst = mn ? out.lo : out.hi, t = new Float32Array(n).fill(mn ? -Infinity : Infinity);
      if (a <= nx) for (let j = 0; j < nz; j++) kitRun(src, t, nx, 1, j * nx, a, mn, g, h);
      if (b <= nz) for (let i = 0; i < nx; i++) kitRun(t, dst, nz, nx, i, b, mn, g, h);
    }
    return (K.win[key] = out);
  }
  /* the surface at (x, z) with the slabs already laid */
  function kitAt(K, x, z) {
    let t = kitTop(K.S, x, z);
    if (t > -Infinity && !K.S.built) t = -Infinity;
    for (const s of K.decks) if (x >= s.x0 && x <= s.x1 && z >= s.z0 && z <= s.z1 && s.y > t) t = s.y;
    return t;
  }
  /* rays every 0.25 m over a foot (a disk, or a rectangle), its outline
     included: the lowest and the highest roof under it, or null where any
     ray falls off the roof (or the two are more than `sink` apart) */
  function kitFoot(K, x, z, hx, hz, disk, sink) {
    let lo = Infinity, hi = -Infinity;
    const lim = sink === undefined ? Infinity : sink;
    const one = (px, pz) => {
      const t = kitAt(K, px, pz);
      if (!(t >= KIT_ROOF)) return false;
      if (t < lo) lo = t;
      if (t > hi) hi = t;
      return hi - lo <= lim;
    };
    /* the outline first, 3 cm outside the foot so that a foot whose rim
       lies on a step meets the lower side too; where a foot does not fit,
       it is usually there */
    if (disk) {
      const r = hx + 0.03, nr = Math.max(1, Math.ceil(r / 0.25));
      for (let q = nr; q >= 1; q--) {
        const rr = r * q / nr, na = Math.max(12, Math.ceil(2 * Math.PI * rr / 0.25));
        for (let a = 0; a < na; a++)
          if (!one(x + rr * Math.cos(a * 2 * Math.PI / na), z + rr * Math.sin(a * 2 * Math.PI / na))) return null;
      }
      if (!one(x, z)) return null;
    } else {
      const ax = hx + 0.03, az = hz + 0.03;
      const ni = Math.max(1, Math.ceil(2 * ax / 0.25)), nj = Math.max(1, Math.ceil(2 * az / 0.25));
      for (const edge of [true, false])
        for (let j = 0; j <= nj; j++) for (let i = 0; i <= ni; i++)
          if ((i === 0 || j === 0 || i === ni || j === nj) === edge &&
              !one(x - ax + 2 * ax * i / ni, z - az + 2 * az * j / nj)) return null;
    }
    return { lo, hi };
  }
  function kitClear(K, x0, x1, z0, z1) {
    for (const r of K.keep) if (x0 < r.x1 && x1 > r.x0 && z0 < r.z1 && z1 > r.z0) return false;
    return true;
  }
  /* the spot nearest (px, pz) that carries a foot of half-size hx x hz (a
     disk of radius hx): the whole piece (its box e) inside the model's own
     plan and clear of everything placed, and under it a pad of roof at least
     3 m across - so a mast stands on a roof, never on a lamp, a rail or a
     crane's jib - with no more than `sink` between its lowest and highest
     point. Searched in rings out from the old spot on the raster (the square
     inside the pad, which any pad that carries it passes), then checked with
     rays; the piece stands at the lowest point under its own foot. */
  function kitFind(K, hx, hz, disk, e, px, pz, sink, kmin) {
    const S = K.S, cs = KIT_CS, nx = S.nx, nz = S.nz, B = S.box;
    const ry = disk ? hx : hz, ax = Math.max(hx, KIT_PAD), az = Math.max(ry, KIT_PAD);
    /* the prefilter is the square inside the pad of the smallest size the
       piece may take, so one raster pass serves every size it is tried at */
    const q = disk ? Math.SQRT1_2 : 1, s0 = kmin || 1;
    const ca = Math.max(1, Math.ceil(Math.max(hx * s0, KIT_PAD) * q / cs));
    const cb = Math.max(1, Math.ceil(Math.max(ry * s0, KIT_PAD) * q / cs));
    const Wn = kitWin(K, 2 * ca, 2 * cb);
    const st = Math.max(1, Math.round(Math.min(ax, az) / (3 * cs)));
    const ci = Math.round((px - S.x0) / cs), cj = Math.round((pz - S.z0) / cs);
    let best = null, bd = Infinity;
    const R = Math.ceil((Math.max(ci, nx - ci, cj, nz - cj) + 1) / st);
    const test = (i, j) => {
      const i0 = i - ca, j0 = j - cb;
      if (i0 < 0 || j0 < 0 || i0 + 2 * ca > nx || j0 + 2 * cb > nz) return;
      const x = S.x0 + i * cs, z = S.z0 + j * cs, dd = Math.hypot(x - px, z - pz);
      if (dd >= bd) return;
      const c = j0 * nx + i0;
      if (!(Wn.lo[c] >= KIT_ROOF) || Wn.hi[c] - Wn.lo[c] > sink) return;
      if (x + e.x0 < B.x0 - 1e-6 || x + e.x1 > B.x1 + 1e-6 || z + e.z0 < B.z0 - 1e-6 || z + e.z1 > B.z1 + 1e-6) return;
      if (!kitClear(K, x + e.x0, x + e.x1, z + e.z0, z + e.z1)) return;
      const f = kitFoot(K, x, z, ax, az, disk, sink);
      if (!f) return;
      const g = ax > hx || az > ry ? kitFoot(K, x, z, hx, hz, disk) : f;
      if (!g) return;
      best = { x, z, y: g.lo }; bd = dd;
    };
    for (let k = 0; k <= R && k * st * cs < bd; k++) {
      if (!k) { test(ci, cj); continue; }
      for (let d = -k; d <= k; d++) { test(ci + d * st, cj - k * st); test(ci + d * st, cj + k * st); }
      for (let d = -k + 1; d < k; d++) { test(ci - k * st, cj + d * st); test(ci + k * st, cj + d * st); }
    }
    return best;
  }
  /* sRGB authored colours to linear once, as prepModel does for the models */
  function kitLin(g, shadows) {
    g.traverse((o) => {
      if (!o.isMesh) return;
      if (shadows) { o.castShadow = true; o.receiveShadow = true; }
      if (o.material && o.material.color && !o.material.userData._srgbDone) {
        o.material.userData._srgbDone = true;
        o.material.color.convertSRGBToLinear();
      }
    });
  }
  function kitG(...o) { const g = new THREE.Group(); for (const q of o) g.add(q); return g; }
  function kitM(geo, mat, x, y, z) { const o = new THREE.Mesh(geo, mat); o.position.set(x, y, z); return o; }
  function kitDrop(g) { g.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); }
  /* stand one piece: p.mk(k) builds it at scale k with its foot at y = 0 on
     its own axis; tried at full size, then smaller down to p.kmin, turned a
     quarter where p.turn allows it. Left off if no roof carries it. */
  const KIT_K = [1, 0.8, 0.6, 0.45];
  function kitSpot(K, p) {
    const bx = new THREE.Box3();
    for (const k of KIT_K) {
      if (k < (p.kmin || 1) - 1e-6) break;
      const g = p.mk(k);
      bx.setFromObject(g);
      let hit = null, rot = 0;
      for (const turn of (p.turn ? [0, 1] : [0])) {
        const hx = (turn ? p.hz : p.hx) * k, hz = (turn ? p.hx : p.hz) * k;
        const e = turn ? { x0: bx.min.z, x1: bx.max.z, z0: -bx.max.x, z1: -bx.min.x }
                       : { x0: bx.min.x, x1: bx.max.x, z0: bx.min.z, z1: bx.max.z };
        const f = kitFind(K, hx, hz, !!p.disk, e, p.px, p.pz, p.sink * k, (p.kmin || 1) / k);
        if (f && (!hit || Math.hypot(f.x - p.px, f.z - p.pz) < Math.hypot(hit.x - p.px, hit.z - p.pz))) {
          hit = f; hit.e = e; rot = turn;
        }
      }
      if (hit) {
        g.position.set(hit.x, hit.y, hit.z);
        g.rotation.y = rot ? Math.PI / 2 : 0;
        g.name = "kit." + p.name;
        const e = hit.e, m = 0.3;
        K.keep.push({ x0: hit.x + e.x0 - m, x1: hit.x + e.x1 + m, z0: hit.z + e.z0 - m, z1: hit.z + e.z1 + m });
        K.put.push(g);
        return g;
      }
      kitDrop(g);
    }
    return null;
  }
  /* the broadest roof left: the largest rectangle of cells within `tol` of
     one level and clear of everything placed, up to W x D and at least
     w0 x d0, nearest (px, pz) where it has room to move. By the classic
     largest-rectangle-under-a-histogram sweep, once per level. */
  function kitRect(K, tol, W, D, w0, d0, px, pz) {
    const S = K.S, cs = KIT_CS, nx = S.nx, nz = S.nz;
    const free = new Uint8Array(nx * nz), lv = new Map(), bk = Math.max(0.1, tol / 5);
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
      const c = j * nx + i;
      if (!(K.lo[c] >= KIT_ROOF)) continue;
      const x0 = S.x0 + i * cs, z0 = S.z0 + j * cs;
      if (!kitClear(K, x0, x0 + cs, z0, z0 + cs)) continue;
      free[c] = 1;
      const b = Math.floor(K.lo[c] / bk);
      lv.set(b, (lv.get(b) || 0) + 1);
    }
    const need = Math.ceil(w0 / cs) * Math.ceil(d0 / cs), hgt = new Int32Array(nx);
    const cands = [], los = [];
    for (let c = 0; c < nx * nz; c++) if (free[c]) los.push(K.lo[c]);
    los.sort((a, b) => a - b);
    const below = (y) => {
      let a = 0, b = los.length;
      while (a < b) { const m = (a + b) >> 1; if (los[m] < y) a = m + 1; else b = m; }
      return a;
    };
    /* the levels with the most cells first; one with fewer cells than the
       broadest rectangle found holds nothing broader */
    const lvs = [];
    for (const [b] of lv) {
      const L = b * bk, ub = below(L + tol + 1e-6) - below(L - 1e-3);
      if (ub >= need) lvs.push({ L, ub });
    }
    lvs.sort((a, b) => b.ub - a.ub);
    /* the ten fullest levels are the roofs; a stack as two typed arrays */
    const si = new Int32Array(nx + 1), sh = new Int32Array(nx + 1);
    let top = 0;
    for (let v = 0; v < lvs.length && v < 10; v++) {
      const L = lvs[v].L;
      if (Math.min(lvs[v].ub * cs * cs, W * D) <= top) break;
      hgt.fill(0);
      for (let j = 0; j < nz; j++) {
        for (let i = 0; i < nx; i++) {
          const c = j * nx + i;
          hgt[i] = free[c] && K.lo[c] >= L - 1e-3 && K.hi[c] <= L + tol ? hgt[i] + 1 : 0;
        }
        let n = 0;
        for (let i = 0; i <= nx; i++) {
          const h = i < nx ? hgt[i] : 0;
          let s0 = i;
          while (n && sh[n - 1] >= h) {
            n--;
            const rw = (i - si[n]) * cs, rd = sh[n] * cs;
            if (rw >= w0 && rd >= d0) {
              /* the part of it within the design size, as near (px, pz) as it goes */
              const cw = Math.min(rw, W), cd = Math.min(rd, D);
              if (cw * cd >= top * 0.6) {
                const x0 = S.x0 + si[n] * cs, z0 = S.z0 + (j - sh[n] + 1) * cs;
                const cx = Math.min(Math.max(px, x0 + cw / 2), x0 + rw - cw / 2);
                const cz = Math.min(Math.max(pz, z0 + cd / 2), z0 + rd - cd / 2);
                cands.push({ s: cw * cd, cx, cz, w: cw, d: cd, dd: Math.hypot(cx - px, cz - pz) });
                if (cw * cd > top) top = cw * cd;
              }
            }
            s0 = si[n];
          }
          if (h > 0) { si[n] = s0; sh[n] = h; n++; }
        }
      }
    }
    cands.sort((a, b) => b.s - a.s || a.dd - b.dd);
    /* the broadest that the rays agree is level, inset a little from its edge */
    for (let n = 0; n < cands.length && n < 12; n++) {
      const r = cands[n], w = r.w - 0.5, d = r.d - 0.5;
      const f = kitFoot(K, r.cx, r.cz, w / 2, d / 2, false, tol);
      if (f) return { x: r.cx, z: r.cz, w, d, y: f.lo, top: f.hi };
    }
    return null;
  }
  /* a slab laid: its top is roof for what comes after it */
  function kitDeck(K, x, z, w, d, y) {
    const S = K.S, W = S.nx + 1, s = { x0: x - w / 2, x1: x + w / 2, z0: z - d / 2, z1: z + d / 2, y };
    K.decks.push(s);
    for (let j = 0; j <= S.nz; j++) for (let i = 0; i <= S.nx; i++) {
      const px = S.x0 + i * KIT_CS, pz = S.z0 + j * KIT_CS;
      if (px >= s.x0 && px <= s.x1 && pz >= s.z0 && pz <= s.z1 && K.T[j * W + i] < y) { K.T[j * W + i] = y; K.B[j * W + i] = 1; }
    }
    kitCells(K);
  }

  /* the rooftop kit that dates the building at a glance */
  function eraKit(E, def, K) {
    if (!E || !E.fixture) return;
    const w = def.w * TILE_M, d = def.h * TILE_M;
    /* rooftop kit is sized to a plausible real fixture, not to the footprint */
    const m = Math.min(w, d, 13);
    const brick = new THREE.MeshStandardMaterial({ color: 0x8d5a44, roughness: 0.98 });
    const steel = new THREE.MeshStandardMaterial({ color: 0x9aa0a4, roughness: 0.5, metalness: 0.7 });
    const drab  = new THREE.MeshStandardMaterial({ color: 0x5a6046, roughness: 0.95 });
    const pale  = new THREE.MeshStandardMaterial({ color: 0xdfe4e6, roughness: 0.6 });

    if (E.fixture === "chimney") {
      /* a brick stack and a single whip: nothing here is electronic yet */
      kitSpot(K, { name: "chimney", hx: m * 0.055, hz: m * 0.055, sink: m * 0.11, px: -w * 0.28, pz: d * 0.24,
        mk: () => kitG(kitM(new THREE.BoxGeometry(m * 0.11, m * 0.42, m * 0.11), brick, 0, m * 0.21, 0),
                      kitM(new THREE.BoxGeometry(m * 0.15, m * 0.04, m * 0.15), brick, 0, m * 0.44, 0)) });
      kitSpot(K, { name: "whip", disk: true, hx: m * 0.01, sink: m * 0.11, px: w * 0.30, pz: -d * 0.22,
        mk: () => kitG(kitM(new THREE.CylinderGeometry(m * 0.006, m * 0.01, m * 0.5, 5), steel, 0, m * 0.25, 0)) });
    } else if (E.fixture === "lattice") {
      /* a guyed lattice mast, the signature of a 1960s installation */
      kitSpot(K, { name: "lattice", disk: true, hx: m * 0.057, sink: m * 0.11, px: w * 0.24, pz: -d * 0.20,
        mk: () => {
          const g = new THREE.Group();
          for (let i = 0; i < 3; i++) {
            const a = i * Math.PI * 2 / 3;
            g.add(kitM(new THREE.CylinderGeometry(m * 0.012, m * 0.012, m * 0.62, 4), steel,
                     Math.cos(a) * m * 0.045, m * 0.31, Math.sin(a) * m * 0.045));
          }
          for (let r = 1; r <= 3; r++) {
            const ring = kitM(new THREE.TorusGeometry(m * 0.048, m * 0.006, 4, 9), steel, 0, m * 0.14 * r, 0);
            ring.rotation.x = Math.PI / 2;
            g.add(ring);
          }
          return g;
        } });
    } else if (E.fixture === "netting") {
      /* camouflage netting stretched over the roof on short poles, as broad
         as the broadest roof - a net may cross a pitch or a vent, and its
         poles reach down to the roof under each corner */
      const r = kitRect(K, 2.0, w * 0.82, d * 0.82, 6, 6, 0, 0);
      if (!r) return;
      const ny = Math.max(r.y + m * 0.30, r.top + m * 0.12);
      const g = new THREE.Group();
      g.add(kitM(new THREE.BoxGeometry(r.w, m * 0.02, r.d),
        new THREE.MeshStandardMaterial({ color: 0x5f6a44, roughness: 1, transparent: true, opacity: 0.62 }), 0, ny - r.y, 0));
      const foot = (x, z, rr) => { const f = kitFoot(K, r.x + x, r.z + z, rr, rr, true); return f ? f.lo : r.y; };
      for (let sx = -1; sx <= 1; sx += 2) for (let sz = -1; sz <= 1; sz += 2) {
        const x = sx * (r.w / 2 - 0.4), z = sz * (r.d / 2 - 0.4), fy = foot(x, z, m * 0.012) - r.y;
        g.add(kitM(new THREE.CylinderGeometry(m * 0.012, m * 0.012, ny - r.y - fy, 5), drab, x, (fy + ny - r.y) / 2, z));
      }
      const mx = r.w * 0.25, mz = -r.d * 0.25, my = foot(mx, mz, m * 0.016) - r.y, top = ny - r.y + m * 0.44;
      g.add(kitM(new THREE.CylinderGeometry(m * 0.01, m * 0.016, top - my, 6), steel, mx, (my + top) / 2, mz));
      g.position.set(r.x, r.y, r.z);
      g.name = "kit.net";
      K.keep.push({ x0: r.x - r.w / 2, x1: r.x + r.w / 2, z0: r.z - r.d / 2, z1: r.z + r.d / 2 });
      K.put.push(g);
    } else if (E.fixture === "dish") {
      /* a satellite dish on a pedestal: the 1990s roofline */
      kitSpot(K, { name: "dish", disk: true, hx: m * 0.07, sink: m * 0.04, kmin: 0.55, px: w * 0.24, pz: -d * 0.22,
        mk: (k) => {
          const mm = m * k;
          const prof = [];
          for (let q = 0; q <= 10; q++) {
            const rr = (q / 10) * mm * 0.17;
            prof.push(new THREE.Vector2(Math.max(0.001, rr), (rr * rr) / (mm * 0.42)));
          }
          const dm = new THREE.MeshStandardMaterial({ color: 0xe4e8ea, roughness: 0.6 });
          dm.side = THREE.DoubleSide;
          const dish = kitM(new THREE.LatheGeometry(prof, 16), dm, 0, mm * 0.24, 0);
          dish.rotation.z = -0.85;
          return kitG(kitM(new THREE.CylinderGeometry(mm * 0.05, mm * 0.07, mm * 0.16, 8), pale, 0, mm * 0.08, 0), dish);
        } });
    } else if (E.fixture === "array") {
      /* a flat phased-array face and a squat modern radome, both standing on
         the roof (the face's lower edge had hung 0.04 m of the fixture's
         size above it, the radome's rim 0.03) */
      kitSpot(K, { name: "array", hx: m * 0.041, hz: m * 0.15, sink: m * 0.02, kmin: 0.55, turn: true,
        px: w * 0.26, pz: -d * 0.20,
        mk: (k) => {
          const face = kitM(new THREE.BoxGeometry(m * k * 0.03, m * k * 0.24, m * k * 0.30), pale, 0, m * k * 0.1204, 0);
          face.rotation.z = 0.22;
          return kitG(face);
        } });
      kitSpot(K, { name: "radome", disk: true, hx: m * 0.09, sink: m * 0.009, kmin: 0.55, px: -w * 0.24, pz: d * 0.22,
        mk: (k) => kitG(kitM(new THREE.SphereGeometry(m * k * 0.09, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
          new THREE.MeshStandardMaterial({ color: 0xeef1f3, roughness: 0.55 }), 0, 0, 0)) });
    }
  }

  function archOf(team) {
    /* The palette says which army it belongs to since a colour became a
       pre-battle choice. Matching on `main` alone handed NATO's buildings
       to any commander who picked a colour of their own - and to any
       duplicate whose hue had been rotated, which is the hazard the note in
       CFG.FACTION_COLORS records. The match is kept as the fallback: a
       palette from somewhere else still resolves the way it always did. */
    if (team && team.fac && ARCH[team.fac]) return ARCH[team.fac];
    for (const k in CFG.FACTION_COLORS)
      if (CFG.FACTION_COLORS[k].main === team.main) return ARCH[k] || ARCH.nato;
    return ARCH.nato;
  }

  /* recolour a building's concrete/roof surfaces into the faction palette */
  function restyle(model, A) {
    const wall = new THREE.Color(A.wall), wall2 = new THREE.Color(A.wall2);
    const roof = new THREE.Color(A.roof);
    model.traverse(o => {
      if (!o.isMesh) return;
      const list = Array.isArray(o.material) ? o.material : [o.material];
      const cloned = [];
      for (const m of list) {
        if (!m || !m.color) { cloned.push(m); continue; }
        const c = m.clone();
        const hsl = { h: 0, s: 0, l: 0 };
        c.color.getHSL(hsl);
        /* only restyle desaturated structural surfaces; leave painted detail,
           hazard stripes, glass and metals alone, and the owner's colour
           whatever its shade (tagParts) */
        if (hsl.s < 0.22 && hsl.l > 0.12 && hsl.l < 0.82 && !(m.userData && m.userData.team)) {
          const target = hsl.l > 0.55 ? wall : (hsl.l > 0.33 ? wall2 : roof);
          c.color.copy(target).multiplyScalar(0.72 + hsl.l * 0.55);
        }
        c.userData = Object.assign({}, c.userData);
        cloned.push(c);
      }
      o.material = Array.isArray(o.material) ? cloned : cloned[0];
    });
  }

  /* a rooftop fixture that identifies the faction from the air */
  function archKit(A, def, K) {
    const trim = new THREE.MeshStandardMaterial({ color: A.trim, roughness: 0.5, metalness: 0.25 });
    const metal = new THREE.MeshStandardMaterial({ color: 0xb8bec4, roughness: 0.35, metalness: 0.8 });
    const acc = new THREE.MeshStandardMaterial({ color: A.accent, roughness: 0.6 });
    const w = def.w * TILE_M, d = def.h * TILE_M, mn = Math.min(w, d);
    if (A.style === "nato") {
      /* white radome + slim antenna mast: expeditionary, sensor-heavy */
      kitSpot(K, { name: "radome", disk: true, hx: mn * 0.13, sink: mn * 0.013, kmin: 0.45, px: w * 0.26, pz: -d * 0.26,
        mk: (k) => kitG(kitM(new THREE.SphereGeometry(mn * k * 0.13, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2),
          new THREE.MeshStandardMaterial({ color: 0xe8ecef, roughness: 0.55 }), 0, 0, 0)) });
      const mh = mn * 0.42;
      kitSpot(K, { name: "mast", disk: true, hx: 0.35, sink: mh * 0.1, px: -w * 0.28, pz: d * 0.22,
        mk: () => {
          const g = kitG(kitM(new THREE.CylinderGeometry(0.25, 0.35, mh, 6), metal, 0, mh / 2, 0));
          for (let i = 0; i < 3; i++) g.add(kitM(new THREE.BoxGeometry(mn * 0.11, 0.2, 0.2), metal, 0, mn * 0.2 + i * 1.6, 0));
          return g;
        } });
    } else if (A.style === "pact") {
      /* brutalist stack + banner board: heavy industry aesthetic. The board
         stands on its lower edge (it hung 0.04 of the plot's width over the
         fixture's base, 1.6 m on a 2x2) and may turn to lie along a roof. */
      kitSpot(K, { name: "stack", disk: true, hx: mn * 0.11, sink: mn * 0.035, kmin: 0.45, px: w * 0.28, pz: -d * 0.24,
        mk: (k) => kitG(
          kitM(new THREE.CylinderGeometry(mn * k * 0.09, mn * k * 0.11, mn * k * 0.55, 10), acc, 0, mn * k * 0.275, 0),
          kitM(new THREE.CylinderGeometry(mn * k * 0.095, mn * k * 0.095, 1.1, 10), trim, 0, mn * k * 0.46, 0)) });
      kitSpot(K, { name: "board", hx: w * 0.17, hz: 0.2, sink: mn * 0.012, kmin: 0.45, turn: true, px: -w * 0.2, pz: d * 0.3,
        mk: (k) => kitG(kitM(new THREE.BoxGeometry(w * k * 0.34, mn * k * 0.16, 0.4), trim, 0, mn * k * 0.08, 0)) });
    } else {
      /* PLA: tiered eave band + paired mast, tile-red accent. The eaves are
         laid on the broadest level roof and sized to it, not to the plot (they
         had roofed whole plots, 43 m square on a 3x3), the upper tier resting
         on the lower (it had hung 0.1 m over it); the masts stand on the upper
         tier, or on a roof of their own where there are no eaves. */
      const r = kitRect(K, 0.7, w * 0.72, d * 0.72, 7, 7, 0, 0), mh = mn * 0.34;
      if (r) {
        const g = kitG(kitM(new THREE.BoxGeometry(r.w, 0.9, r.d), acc, 0, 0.45, 0),
                       kitM(new THREE.BoxGeometry(r.w * 0.722, 0.8, r.d * 0.722), trim, 0, 1.3, 0));
        g.position.set(r.x, r.y, r.z);
        g.name = "kit.eaves";
        K.put.push(g);
        kitDeck(K, r.x, r.z, r.w, r.d, r.y + 0.9);
        kitDeck(K, r.x, r.z, r.w * 0.722, r.d * 0.722, r.y + 1.7);
      }
      for (const sgn of [-1, 1])
        kitSpot(K, { name: "mast", disk: true, hx: 0.3, sink: mh * 0.1,
          px: r ? r.x + sgn * (r.w * 0.361 - 0.6) : sgn * w * 0.26, pz: r ? r.z - (r.d * 0.361 - 0.6) : -d * 0.24,
          mk: () => kitG(kitM(new THREE.CylinderGeometry(0.22, 0.3, mh, 6), metal, 0, mh / 2, 0)) });
    }
  }

  /* Two kinds of surface are told apart once, on the model as it was
     authored, before either restyle runs:
     - the owner's colour, whatever its shade, which neither restyle then
       touches. Germany's field grey #7a8a72 is linear s 0.20, l 0.21 -
       inside restyle()'s concrete band and eraRestyle()'s - so its team
       markings came out in the army's concrete grey (#b5babb today,
       #b0a29c in the 1950s): 454 of the 3,882 team-coloured parts on the
       43 structures in six periods, every one of them Germany's
       (tools/jsc/fixtures3d_check.js).
     - the building's own structure: a grey of any shade or a white (HSL
       s < 0.22) - concrete, cladding, sheeting, a white under a painted map
       - and the owner's colour on it. Only that carries rooftop kit: on the
       naval yard the level tops a storey up include the primer-red hull on
       the slip, and a radome and a brick stack went on the ship. Primer,
       safety yellow, hazard paint and glass are no roof. */
  function tagParts(model, team) {
    const tc = new THREE.Color(team.main).convertSRGBToLinear(), hsl = { h: 0, s: 0, l: 0 };
    model.traverse((o) => {
      if (!o.isMesh) return;
      for (const m of (Array.isArray(o.material) ? o.material : [o.material])) {
        if (!m || !m.color) continue;
        if (Math.abs(m.color.r - tc.r) + Math.abs(m.color.g - tc.g) + Math.abs(m.color.b - tc.b) < 3e-3) m.userData.team = true;
        m.color.getHSL(hsl);
        if (hsl.s < 0.22 || m.userData.team) m.userData.built = true;
      }
    });
  }
  /* dress a structure: the army's kit first - the period tints it as it
     tints the building under it - then the period's */
  function dressKit(root, def, team, A, E) {
    const K = kitPlan(root, def.id);
    if (!K) return;
    if (A) {
      archKit(A, def, K);
      for (const g of K.put) { kitLin(g, true); eraRestyle(g, E); root.add(g); }
      K.put.length = 0;
    }
    eraKit(E, def, K);
    for (const g of K.put) { kitLin(g, false); root.add(g); }
  }

  /* buildings */
  function getBuildingModel(def, team, era) {
    /* the period is part of the identity, so it is part of the cache key */
    const E = (typeof ERA_ARCH !== "undefined" && ERA_ARCH[era]) ? ERA_ARCH[era] : null;
    const ck = "b_" + def.id + "|" + team.main + "|" + (era || "e20");
    if (modelCache[ck]) return modelCache[ck];
    let tpl = null;
    try {
      if (typeof BLD_MODELS !== "undefined" && BLD_MODELS[def.id]) {
        tpl = BLD_MODELS[def.id].build(THREE, Models3D, { team: team.main });
      }
    } catch (e) { tpl = null; }
    if (!tpl) {
      /* fallback: concrete box with the painted 2D roof art on top */
      tpl = new THREE.Group();
      const wM = def.w * TILE_M * 0.92, dM = def.h * TILE_M * 0.92;
      const hM = def.cat === "defense" ? 4 : def.id === "conyard" ? 16 : 11;
      const roofCv = document.createElement("canvas");
      roofCv.width = 128; roofCv.height = 128;
      const rc = roofCv.getContext("2d");
      rc.fillStyle = "#565b54"; rc.fillRect(0, 0, 128, 128);
      try {
        if (typeof BLD_DETAIL !== "undefined" && BLD_DETAIL[def.id]) {
          rc.save(); rc.translate(64, 64); rc.scale(3.2, 3.2);
          BLD_DETAIL[def.id].draw(rc, Sprites.pal(team), 1.0);
          rc.restore();
        }
      } catch (e2) {}
      const roofTex = new THREE.CanvasTexture(roofCv);
      roofTex.encoding = THREE.sRGBEncoding;
      const A0 = archOf(team);
      const mats = [
        new THREE.MeshStandardMaterial({ color: A0.wall, roughness: 0.8 }),
        new THREE.MeshStandardMaterial({ color: A0.wall2, roughness: 0.8 }),
        new THREE.MeshStandardMaterial({ map: roofTex, roughness: 0.85 }),
        new THREE.MeshStandardMaterial({ color: A0.roof, roughness: 0.8 }),
        new THREE.MeshStandardMaterial({ color: A0.wall, roughness: 0.8 }),
        new THREE.MeshStandardMaterial({ color: A0.wall2, roughness: 0.8 }),
      ];
      const box = new THREE.Mesh(new THREE.BoxGeometry(wM, hM, dM), mats);
      box.position.y = hM / 2;
      tpl.add(box);
      /* faction trim */
      const trim = new THREE.Mesh(new THREE.BoxGeometry(wM + 0.4, 0.7, dM + 0.4),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(team.main).convertSRGBToLinear(), roughness: 0.5 }));
      trim.position.y = hM - 0.6;
      tpl.add(trim);
      /* defence mount on top from 3D pack or nothing */
      if (def.cat === "defense" && typeof BLD_MODELS !== "undefined" && BLD_MODELS["def_" + def.id]) {
        try {
          const mnt = BLD_MODELS["def_" + def.id].build(THREE, Models3D, { team: team.main });
          mnt.rotation.x = 0;
          mnt.position.y = hM;
          mnt.name = "mountwrap";
          tpl.add(mnt);
        } catch (e3) {}
      }
      tagParts(tpl, team);
      eraRestyle(tpl, E);
      /* the faction's and the period's rooftop kit, stood on the roof */
      if (!def.bare && def.cat !== "civilian")
        dressKit(tpl, def, team, def.cat !== "defense" && def.id !== "wall" ? A0 : null, E);
      prepModel(tpl);
      tpl.scale.multiplyScalar(CFG.BLD_SCALE);
      modelCache[ck] = tpl;
      return tpl;
    }
    /* pack model: restyle to the faction's architecture, then z-up -> y-up.
       Defensive emplacements are field fortifications — sandbags, earth and
       gun metal read the same for everyone, so they keep their own palette. */
    prepModel(tpl);
    const A = archOf(team);
    /* `bare` is the opt-out, and the strategic radar arrays and the fixed
       jamming sites are the first structures to use it. They are drawn whole
       and to scale, and all three of the layers below are actively wrong on
       them: restyle() repaints a phased-array face into a national wall
       colour, the faction's kit bolts a white radome and a yagi mast onto a
       PAVE PAWS, and the period's at e80 drapes a camouflage net across the
       array faces (sized to the plot as it once was, 49 metres square on a
       3x3). A national early-warning array is the same Raytheon concrete for
       everybody who bought one. */
    tagParts(tpl, team);
    if (def.cat !== "defense" && !def.bare) restyle(tpl, A);
    const wrap = new THREE.Group();
    tpl.rotation.x = -Math.PI / 2;
    wrap.add(tpl);
    const bb = new THREE.Box3().setFromObject(wrap);
    if (def.cat === "defense" && typeof BLD_MODELS !== "undefined" &&
        BLD_MODELS["def_" + def.id]) {
      /* emplacements ship without their gun: the engine mounts the rotating
         weapon on top so it can slew toward targets */
      try {
        const mnt = BLD_MODELS["def_" + def.id].build(THREE, Models3D, { team: team.main });
        prepModel(mnt);
        tagParts(mnt, team);
        const mw = new THREE.Group();
        mnt.rotation.x = -Math.PI / 2;
        mw.add(mnt);
        mw.name = "mountwrap";
        mw.position.y = Math.max(0.5, bb.max.y);
        wrap.add(mw);
      } catch (e) {}
    }
    /* period materials, layered over the faction styling, then the rooftop
       kit - the army's and the period's - stood on the roof. Not on a town's
       blocks: civ3d.js draws them as nobody's base, "no domes, no antennas",
       and every one of them wore a NATO radome and mast. */
    eraRestyle(wrap, E);
    if (!def.bare && def.cat !== "civilian")
      dressKit(wrap, def, team, def.cat !== "defense" && def.id !== "wall" ? A : null, E);
    wrap.scale.multiplyScalar(CFG.BLD_SCALE);
    modelCache[ck] = wrap;
    return wrap;
  }

  /* ---------------- where we last saw it ----------------
     G.trackGhosts keeps the player's last sighting of every contact that has
     gone out of sight; this draws each one as its own model in flat grey at
     the spot and heading it was last seen at, fading out over its life - the
     same model the live unit wore (the cached template, so nothing new is
     built or uploaded), under the same fog wash a remembered structure sits
     under. Eight shared materials, one per step of the fade, so a ghost costs
     a clone and a material swap when it steps down, and nothing per frame. A
     ghost is scenery: never picked, never selected (entityScreen and the
     picking both work off game entities, and a ghost is not one). It is drawn
     only while the record says its ground is out of view (g.show). */
  const ghostRecs = new Map();       // ghost record -> { grp, inst, k }
  const ghostMats = [];
  function ghostMat(k) {
    if (!ghostMats[k]) {
      const m = new THREE.MeshLambertMaterial({ color: 0xaeb7c0, transparent: true,
        opacity: 0.12 + 0.43 * (k + 1) / 8, depthWrite: false });
      m.color.convertSRGBToLinear();
      ghostMats[k] = m;
    }
    return ghostMats[k];
  }
  function ghostPaint(inst, k) {
    inst.traverse((o) => {
      if (o.isMesh) {
        o.material = ghostMat(k);
        /* A ghost is not there, so it throws no shadow and takes none. The
           template's meshes all cast (prepModel), and r148's shadow pass
           ignores a material's transparency: a tank's ghost at 17-55%
           opacity threw the full, solid shadow of a tank (182 of 182 meshes;
           a destroyer's 266 of 266). */
        o.castShadow = false; o.receiveShadow = false;
        /* a rotor's blur disc is a turning rotor; a ghost's is not turning */
        if (o.name === "rotordisc") o.visible = false;
      } else if (o.isLine || o.isPoints || o.isSprite) o.visible = false;
    });
  }
  /* An aircraft on an airbase's pad or a ship's deck is drawn where landRest
     and seatOnDeck put it - on the pad, on her deck at its spot, rolled with
     her - and not at the ground under its game position, where the first cut
     put its ghost: inside the pad, or under the sea beside the ship. So where
     each enemy machine standing on something was drawn is noted every frame,
     once syncEntities has placed it, and a ghost written for it takes that
     pose. Only parked machines: everything else is drawn from the record. */
  const ghostPose = new Map();       // entity id -> its drawn pose, frame noted
  let ghostFrame = 0;
  function notePoses() {
    ghostFrame++;
    const H = G.human;
    for (const p of G.players) {
      if (p === H || G.allied(H, p)) continue;
      for (const e of p.units) {
        if (e.layer === "ground") {
          /* a towed launcher's pose as last drawn, for its ghost (syncGhosts) */
          const r = e.def.deploy ? ents.get(e.id) : null;
          if (r && r.pose) {
            let q = ghostPose.get(e.id);
            if (!q) ghostPose.set(e.id, q = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, f: 0, fold: 0 });
            q.dep = r.pose.visible; q.f = ghostFrame;
          }
          continue;
        }
        if (e.layer !== "air" || e.dead || !(e.parked || (e.order && e.order.type === "parked"))) continue;
        const rec = ents.get(e.id);
        if (!rec) continue;
        let q = ghostPose.get(e.id);
        if (!q) ghostPose.set(e.id, q = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, f: 0, fold: 0 });
        const gp = rec.grp.position, gr = rec.grp.rotation;
        q.x = gp.x; q.y = gp.y; q.z = gp.z; q.rx = gr.x; q.ry = gr.y; q.rz = gr.z; q.f = ghostFrame;
        q.fold = rec.fold || 0;                      // its wings as seen (foldOnDeck)
      }
    }
    for (const [id, q] of ghostPose) if (ghostFrame - q.f > 30) ghostPose.delete(id);
  }
  function syncGhosts() {
    const list = (G.fogEnabled && G.ghosts) || [];
    const live = new Set();
    for (const g of list) {
      const a = 1 - (G.time - g.t) / g.life;
      if (a <= 0 || !g.def || !g.owner || !g.show) continue;
      live.add(g);
      const k = Math.max(0, Math.min(7, Math.ceil(a * 8) - 1));
      let rec = ghostRecs.get(g);
      if (!rec) {
        /* a structure's ghost is its own model, seated and turned as the
           structure is (shorePose) - G.trackGhosts writes units only today */
        const bld = BUILDINGS[g.def.id] === g.def;
        const tpl = bld ? getBuildingModel(g.def, g.owner.color, g.owner.era || (G.era || "e20"))
                        : getModel(g.def, g.owner.color, g.owner.era || (G.era || "e20"));
        const inst = tpl.clone();
        ghostPaint(inst, k);
        const grp = new THREE.Group();
        grp.add(inst);
        grp.userData.ghost = g.id;                   // tools/jsc/ghost3d_check.js finds it by this
        grp.rotation.order = "YXZ";
        const q = g.parked ? ghostPose.get(g.id) : null;
        let gs = null;
        if (q) {
          grp.position.set(q.x, q.y, q.z);
          grp.rotation.set(q.rx, q.ry, q.rz);
          if (q.fold) poseFold(findParts(inst, "wingfold"), q.fold);
        } else {
          let my;
          if (g.layer === "air") {
            const ground = heightAt(g.x, g.y);
            my = g.parked ? ground - footOf(tpl) : Math.max(ground + 6, AIR_ALT);
          } else if (g.layer === "sea") my = 0.35;
          else if (g.layer === "sub") my = -0.6;     // a datum, just under the surface
          else if (bld && g.def.shore) {
            gs = shorePose(g.def, Math.round(g.x / CFG.TILE - g.def.w / 2), Math.round(g.y / CFG.TILE - g.def.h / 2), tpl);
            my = gs.y;
          }
          else my = heightAt(g.x, g.y);
          grp.position.set(gx2m(g.x), my, gx2m(g.y));
          grp.rotation.y = gs ? gs.yaw : -g.ang;
        }
        /* trained as it was last seen: trackGhosts stores tang for every
           contact (the hull's heading where it has none), so this is the
           live rule, -(tang - ang), with no fallback - an `||` here took a
           turret laid exactly along a grid row (tang 0) for the hull's.
           A turned shore building's mount is trained through its turn. */
        const tur = findPart(inst, "turret");
        if (tur) tur.rotation.z = gs ? -(g.tang - g.ang) - gs.yaw : -(g.tang - g.ang);
        /* a towed launcher's ghost in the pose it was last seen in (notePoses),
           packed up if none was noted */
        const dpl = g.def.deploy ? findPart(inst, "deploypose") : null;
        if (dpl) {
          const qd = ghostPose.get(g.id), up = !!(qd && qd.dep), trv = findPart(inst, "travelpose");
          dpl.visible = up;
          if (trv) trv.visible = !up;
        }
        three.scene.add(grp);
        rec = { grp, inst, k };
        ghostRecs.set(g, rec);
      } else if (rec.k !== k) { ghostPaint(rec.inst, k); rec.k = k; }
    }
    for (const [g, rec] of ghostRecs)
      if (!live.has(g)) { three.scene.remove(rec.grp); ghostRecs.delete(g); }
    if (G.fogEnabled) notePoses();
  }

  /* ---------------- a shore building: where it sits, which way it faces ----------------
     A naval yard or a coastal sonar array stands on a plot with water and
     land in it (G.canPlace), and it was set like any other structure: at the
     ground under the plot's middle, never turned. Over every legal plot within
     40 tiles of a home on the fourteen theatres, at three seeds, that middle
     runs from the -7 m seabed to 18 m up a bank and is at or under the 0.35 m
     water plane on about half of them; on taiwan both commanders' yards stood
     3 to 4 m under water. And a slip ran out wherever the model was drawn
     running out, whatever lay there.

     So a shore building is seated and turned here, ONCE per plot, and
     everything drawn at its foot asks here: its model (syncEntities, and so
     also where it is remembered under fog), a ghost of it (syncGhosts), its
     selection ring, health bar and repair label (drawOverlay), its sonar ring
     (drawSensorRings), its rally flag and where its rally line leaves it, the
     placement preview, and the point the mouse picks it by (entityScreen).
     What burns on it (damage3d.js) and what it leaves (impact3d.js) go with
     its group. No other structure comes here: theirs is untouched.

     THE SEAT is read off the model - userData.shore, in its own axes. The
     naval yard's quay walls, fenders and ladders are drawn for a water line
     1.9 m under its origin, 2.9 m under its apron; the sonar array's
     hardstanding is the lowest thing on it that has to stay dry. The seat
     puts that line on the water plane, and never lower than the ground under
     the plot's middle - the rule every structure keeps, so a yard up a bank
     stays on its bank. A shore model that declares nothing is set with its
     origin on the water at the least, and not turned. While it goes up it
     rises about that line (a), where the others rise out of the ground.
     Measured over that census (seed btest; the other two alike): a yard's
     apron was under water on 286 of 761 plots and is on none; ground stood
     through its apron or slip on 716 and does on 203 - the bank plots, set
     at the ground under their middles, and ones whose land climbs inland -
     and its quay walls stop short of the ground or the sea on 26 bank plots,
     as they did. A sonar array's pad was under water on 165 of 475 and is on
     none; ground stands through it on 385, as on 403 before: a pad 0.8 m
     thick on the water line, the beach climbing under its landward half.

     THE HEADING. The edge of the plot with the most water on it decides
     nothing on over half the plots - the water is on a corner, or on two
     sides - and on 13 to 17 of the AI's 18 picks at each seed. So: of the
     four quarter turns, the candidates are the ones that put the model's
     mouth on water (where its slip runs into the sea, where its cable lands:
     the plot tile there or the one past it); failing any, the ones with
     water on that face or just past it; failing those, all four. Of the
     candidates, the one that faces the water round the plot wins: the
     bearing of every water tile within RING tiles of the plot, from its
     middle, summed and laid on each candidate's facing. A tie goes to the
     face with more water on it, then to a ring two tiles wider, then to the
     way the model was drawn facing, then to the first of east, south, west,
     north - so with no water in sight it is not turned at all. A plot that
     is not square turns only end for end. Over the census every plot faces water; a yard's slip runs
     onto water on 744 of 761 - on the rest no quarter turn puts it there:
     the water meets the plot only mid-side, or runs through its middle row
     as a river - 749 were settled without a tiebreak and 4 by the order;
     on the AI's picks, 17 of 18 onto water; every sonar array's cable.
     Once per plot: 0.01 ms, and the first of a def builds its model to read
     what it declares. */
  const SHORE = {
    WATER: 0.35,    // m: the sea's surface (buildWater)
    RING: 4,        // tiles round the plot whose water it is turned to
  };
  const SIDES = [[1, 0], [0, 1], [-1, 0], [0, -1]];            // east, south, west, north (game x, y)
  const QUARTER = [0, Math.PI / 2, Math.PI, -Math.PI / 2];     // k quarter turns, as rotation.y
  const shoreFits = new Map();       // def id -> what its model says of the sea
  const shorePoses = new Map();      // def id -> Map(plot -> pose): this battle's coast
  const _sv = new THREE.Vector3();
  /* userData.shore on any node of the model, in that node's own axes:
     waterline - the height the sea was drawn to meet; seaward - the axis of
     the face that meets it; mouth - the point on that face where it runs
     into the water. Read through the template's own transforms, so the
     stand-up turn and BLD_SCALE on it are taken as whatever they are. Once
     per def: a team's colour or a period's kit does not move its quay. */
  function shoreFit(def, tpl) {
    let f = shoreFits.get(def.id);
    if (f) return f;
    if (!tpl) tpl = getBuildingModel(def, G.human.color, G.human.era || (G.era || "e20"));
    f = { wl: 0, q: -1, lat: 0, dep: 0 };
    let node = null;
    tpl.traverse((o) => { if (!node && o.userData.shore) node = o; });
    if (node) {
      tpl.updateMatrixWorld(true);
      const S = node.userData.shore, M = node.matrixWorld;
      f.wl = _sv.set(0, 0, S.waterline || 0).applyMatrix4(M).y;       // metres over the group's origin
      if (S.seaward) {
        _sv.set(S.seaward[0], S.seaward[1], 0).transformDirection(M);
        const sx = _sv.x, sz = _sv.z;
        f.q = (Math.round(Math.atan2(sz, sx) / (Math.PI / 2)) + 4) % 4;   // the side it faces unturned
        if (S.mouth) {
          _sv.set(S.mouth[0], S.mouth[1], 0).applyMatrix4(M);
          f.lat = _sv.x * sz - _sv.z * sx;                           // metres left of the face's middle
          f.dep = _sv.x * sx + _sv.z * sz;                           // metres out from the middle, along the face
        }
      }
    }
    shoreFits.set(def.id, f);
    return f;
  }
  /* the side of the plot (0 east, 1 south, 2 west, 3 north) its seaward
     face is turned to, and how that was settled */
  function shoreSide(def, tx, ty, f) {
    const map = G.map, MW = map.W, MH = map.H, ter = map.terrain;
    const w = def.w, h = def.h, cx = tx + w / 2, cy = ty + h / 2;
    const wet = (x, y) => x >= 0 && y >= 0 && x < MW && y < MH && ter[y * MW + x] === T.WATER;
    const pull = (R) => {
      let px = 0, py = 0;
      for (let y = ty - R; y < ty + h + R; y++) for (let x = tx - R; x < tx + w + R; x++) {
        if (!wet(x, y)) continue;
        const ox = x + 0.5 - cx, oy = y + 0.5 - cy, d = Math.hypot(ox, oy);
        if (d > 0) { px += ox / d; py += oy / d; }
      }
      return (k) => px * SIDES[k][0] + py * SIDES[k][1];
    };
    const mouth = (k) => {
      const d = SIDES[k], l = f.lat / TILE_M;                      // the mouth, tiles left looking out
      const mx = cx + d[0] * w / 2 + d[1] * l, my = cy + d[1] * h / 2 - d[0] * l;
      return wet(Math.floor(mx + d[0] * 0.5), Math.floor(my + d[1] * 0.5)) ||
             wet(Math.floor(mx - d[0] * 0.5), Math.floor(my - d[1] * 0.5));
    };
    const face = (k) => {
      const d = SIDES[k], n = d[0] ? h : w;
      let c = 0;
      for (let i = 0; i < n; i++) for (let o = 0; o < 2; o++) {
        const x = d[0] > 0 ? tx + w - 1 + o : d[0] < 0 ? tx - o : tx + i;
        const y = d[1] > 0 ? ty + h - 1 + o : d[1] < 0 ? ty - o : ty + i;
        if (wet(x, y)) c++;
      }
      return c;
    };
    const best = (ks, score) => {
      let m = -Infinity;
      for (const k of ks) m = Math.max(m, score(k));
      return ks.filter((k) => score(k) >= m - 1e-9);
    };
    const all = [0, 1, 2, 3].filter((k) => w === h || ((f.q - k) & 1) === 0);
    /* the tile the mouth itself lies in, or the next one out: a yard's slip
       ends 1.9 m past the plot, a sonar's cable lands inside its edge tile */
    const atMouth = (k) => {
      const d = SIDES[k], l = f.lat / TILE_M, dp = f.dep / TILE_M;
      const px = cx + d[0] * dp + d[1] * l, py = cy + d[1] * dp - d[0] * l;
      return wet(Math.floor(px), Math.floor(py)) || wet(Math.floor(px + d[0] * 0.5), Math.floor(py + d[1] * 0.5));
    };
    let ks = all.filter(atMouth), how = "mouth";
    if (!ks.length) ks = all.filter(mouth);
    if (!ks.length) { ks = all.filter((k) => face(k) > 0); how = "face"; }
    if (!ks.length) { ks = all; how = "any"; }
    ks = best(ks, pull(SHORE.RING));
    if (ks.length > 1) { ks = best(ks, face); how += ",face"; }
    if (ks.length > 1) { ks = best(ks, pull(SHORE.RING + 2)); how += ",ring"; }
    if (ks.length > 1) { if (ks.indexOf(f.q) >= 0) ks = [f.q]; how += ",order"; }
    return { k: ks[0], how };
  }
  /* where a shore building of this def stands on the plot at tx, ty: once
     per plot and battle. y is its seat (the model's origin, metres), yaw
     its turn (rotation.y), face the side it faces (-1: not turned), a the
     height in its own frame that stays put while it goes up. */
  function shorePose(def, tx, ty, tpl) {
    let m = shorePoses.get(def.id);
    if (!m) shorePoses.set(def.id, m = new Map());
    const key = ty * 65536 + tx;
    let P = m.get(key);
    if (P) return P;
    const f = shoreFit(def, tpl);
    const ground = heightAt((tx + def.w / 2) * CFG.TILE, (ty + def.h / 2) * CFG.TILE);
    const afloat = SHORE.WATER - f.wl;
    const S = f.q >= 0 ? shoreSide(def, tx, ty, f) : { k: -1, how: "none" };
    P = { y: Math.max(afloat, ground), yaw: S.k >= 0 ? QUARTER[(f.q - S.k + 4) % 4] : 0,
          face: S.k, how: S.how, a: afloat >= ground ? f.wl : 0, ground, afloat };
    m.set(key, P);
    return P;
  }
  /* the height a thing drawn at a shore building's foot stands at - its
     seat; undefined for anything else, which keeps to the ground */
  function shoreAlt(e) {
    return e.kind === "building" && e.def.shore ? shorePose(e.def, e.tx, e.ty).y : undefined;
  }

  /* ---------------- entity sync ---------------- */
  let lastEraKey = "";
  const riders = [];                 // aircraft on, onto or off a ship's deck this frame (seatOnDeck)
  let nRiders = 0;
  function syncEntities(dt) {
    /* when a commander re-equips, its structures are re-skinned to the period */
    const ek = G.players.map(p => p.era || "e20").join(",");
    if (ek !== lastEraKey) {
      lastEraKey = ek;
      for (const [id, rec] of ents) { three.scene.remove(rec.grp); ents.delete(id); }
    }
    const seen = new Set();
    for (const e of G.entities) {
      if (e.dead || e.carried) continue;
      /* visibility: enemies hidden by fog / submersion */
      let vis = true;
      if (e.owner !== G.human && G.fogEnabled) {
        /* Sonar contact alone draws a submerged boat - see the note in
           render.js visible(). ANDing the fog test here would make every
           contact from a sightless sensor an invisible one. */
        if (e.layer === "sub") vis = G.canSeeSub(G.human, e);
        else {
          const f = G.fog[e.ty * G.map.W + e.tx];
          vis = e.kind === "building" ? f >= 1 : f === 2;
        }
      }
      if (!vis) continue;
      seen.add(e.id);
      let rec = ents.get(e.id);
      if (!rec) {
        const grp = new THREE.Group();
        const tpl = e.kind === "building"
          ? getBuildingModel(e.def, e.owner.color, e.owner.era || (G.era || "e20"))
          : getModel(e.def, e.owner.color, e.owner.era || (G.era || "e20"));
        const inst = tpl.clone();
        grp.add(inst);
        rec = {
          grp, inst,
          turret: findPart(inst, "turret"),
          turretX: (findPart(inst, "turret") || { position: { x: 0 } }).position.x,
          wheels: findParts(inst, "roadwheel"),
          rotor: findPart(inst, "rotor"),
          discs: findParts(inst, "rotordisc"),
          tailrotor: findPart(inst, "tailrotor"),
          shafts: rotorShafts(grp),
          gear: findPart(inst, "gear"),
          folds: findParts(inst, "wingfold"),   // folding outer wing panels (foldOnDeck)
          elev: findPart(inst, "podelev"),   // a launcher's elevating pod (poseLauncher)
          pose: findPart(inst, "deploypose"),   // a towed launcher set up (e.deployed) ...
          march: findPart(inst, "travelpose"),  // ... and on the march behind its tractor
          kind: e.kind,
          tpl,                     // the cached template: what is measured once per model
        };
        three.scene.add(grp);
        ents.set(e.id, rec);
      }
      /* ownership changed since this instance was built: throw it away so it
         is remade in the new owner's colours on the next pass */
      if (e.reskin && rec) {
        three.scene.remove(rec.grp);
        rec.grp.traverse((o) => { if (o.geometry) { try { o.geometry.dispose(); } catch (err) {} } });
        ents.delete(e.id);
        e.reskin = false;
        continue;
      }
      const mx = gx2m(e.x), mz = gx2m(e.y);
      let my;
      if (e.kind === "building") {
        /* a shore building where shorePose seats and turns it, found once;
           every other structure on the ground under its middle, unturned */
        const sp = e.def.shore ? rec.shore || (rec.shore = shorePose(e.def, e.tx, e.ty, rec.tpl)) : null;
        my = sp ? sp.y : heightAt(e.x, e.y);
        rec.grp.position.set(gx2m((e.tx + e.def.w / 2) * CFG.TILE), my, gx2m((e.ty + e.def.h / 2) * CFG.TILE));
        const pr = e.buildProgress;
        rec.grp.scale.y = 0.15 + 0.85 * pr;
        /* turned to its water, and while it goes up it rises about its own
           water line (sp.a) as the others rise out of the ground; a mount is
           trained through the turn, so it still lays on its bearing */
        if (sp) { rec.grp.rotation.y = sp.yaw; rec.grp.position.y = my + sp.a * (1 - rec.grp.scale.y); }
        const aim = sp ? -(e.tang || 0) - sp.yaw : -(e.tang || 0);
        if (rec.turret) rec.turret.rotation.z = aim;
        const mw = findPart(rec.inst, "mountwrap");
        if (mw) mw.rotation.z = aim;
      } else {
        if (e.layer === "air") {
          /* Aircraft altitude used to be recomputed from scratch every frame,
             so the instant an order changed a machine TELEPORTED between the
             deck and cruise height. A helicopter launching off a destroyer
             simply appeared in the air. Ease toward the target instead, and
             climb faster than you descend, the way an aircraft does. */
          const onDeck = e.parked || (e.order && e.order.type === "parked");
          const landing = e.order && (e.order.type === "rtb" || e.order.type === "land") && !e.moving;
          if (rec.foot === undefined) rec.foot = footOf(rec.tpl);
          const host = e.padOn && !e.padOn.dead ? e.padOn : null;
          if (rec.deckShip || (host && host.kind !== "building" && (onDeck || landing))) {
            /* on a ship's deck, coming down to it or leaving it: seatOnDeck
               sets it after this loop, once she has been placed */
            riders[nRiders++] = e;
            my = rec.alt === undefined ? 0 : rec.alt;
          } else {
            /* resting on the ground or the airbase's pad under it (landRest);
               the approach and the cruise are measured from the ground, as before */
            const ground = heightAt(e.x, e.y);
            const rest = landRest(e, rec, onDeck ? host : null, ground);
            my = easeAlt(rec, onDeck ? rest : landing ? rest + 2.8 : Math.max(ground + 6, AIR_ALT), dt);
            if (rec.fold) foldOnDeck(rec, false, dt);   // wings spread off a deck
          }
        } else if (e.layer === "sea" || e.layer === "sub") {
          my = 0.35;
          if (e.layer === "sub") my = -1.2;
          /* what js/damage3d.js laid on her after the last frame - a holed
             ship's list, trim and settling - read back before it is replaced,
             for the aircraft on her deck (seatOnDeck) */
          if (rec.baseRX !== undefined) {
            rec.listX = rec.grp.rotation.x - rec.baseRX;
            rec.listZ = rec.grp.rotation.z - rec.baseRZ;
            rec.sinkY = rec.grp.position.y - my;
          }
        } else {
          my = heightAt(e.x, e.y);
        }
        rec.grp.position.set(mx, my, mz);
        /* YXZ so the three angles are intrinsic: heading first, then pitch
           about the vehicle's OWN lateral axis and roll about its own
           fore-and-aft axis. With the default XYZ order a pitched, turning
           tank tips about the world axes and looks like it is sliding on ice. */
        rec.grp.rotation.order = "YXZ";
        /* an aircraft riding a ship's deck is turned by seatOnDeck after this
           loop; it keeps the heading it was drawn at until then, so its tail
           rotor below spins about its own shaft, not the game's heading */
        if (!rec.deckShip) rec.grp.rotation.y = -e.ang;
        if (e.layer === "sea") {
          rec.grp.rotation.z = Math.sin(G.time * 0.8 + e.id) * 0.012;
          rec.grp.rotation.x = Math.sin(G.time * 0.6 + e.id * 2) * 0.008;
          rec.baseRX = rec.grp.rotation.x; rec.baseRZ = rec.grp.rotation.z;
        } else if (e.layer === "ground" && e.cat === "infantry") {
          /* ---- a walk cycle ----
             The soldier models are built posed mid-stride, which is right for
             a still frame and wrong for everything else: a squad crossing open
             ground was a row of statues sliding along on an invisible rail.
             Swing the legs about their own hip, counter-swing them against
             each other, and bob the whole figure a little on each footfall.
             The phase runs off distance covered rather than off the clock, so
             the feet keep pace with the ground instead of moonwalking. */
          const dx = e.x - (rec.px === undefined ? e.x : rec.px);
          const dy = e.y - (rec.py === undefined ? e.y : rec.py);
          const step = Math.hypot(dx, dy);
          rec.px = e.x; rec.py = e.y;
          const sp = step / Math.max(dt, 1e-4);
          rec.gait = (rec.gait || 0) + step * 0.085;
          /* ease the swing in and out so a halt settles rather than snapping */
          const want = U.clamp(sp / 34, 0, 1);
          rec.swing = (rec.swing === undefined) ? want
                    : rec.swing + U.clamp(want - rec.swing, -3.2 * dt, 3.2 * dt);
          if (rec.legs === undefined) {
            rec.legs = [rec.grp.getObjectByName("leg.L"),
                        rec.grp.getObjectByName("leg.R")];
          }
          const amp = 0.62 * rec.swing;
          for (let li = 0; li < 2; li++) {
            const lg = rec.legs[li];
            /* Never assume a model exposes the part we want. These figures
               come from several generations of builder and not all of them
               name a shin - one of them binds the field to a texture canvas,
               which crashed the whole render loop on the first frame. */
            if (!lg || !lg.rotation || lg.userData.stride === undefined) continue;
            const ph = rec.gait + (li ? Math.PI : 0);
            lg.rotation.y = lg.userData.stride + Math.sin(ph) * amp;
            const sh = lg.userData.shin;
            /* the trailing shin folds up; the leading one straightens */
            if (sh && sh.rotation) sh.rotation.y = (lg.userData.shinBase || 0) +
                    Math.max(0, -Math.sin(ph + 0.9)) * 0.75 * rec.swing;
          }
          /* two footfalls per stride, so the bob runs at double frequency.
             my is the vertical axis here - the group is placed as
             (mx, my, mz) with my carrying height. */
          rec.grp.position.y = my + Math.abs(Math.sin(rec.gait)) * 0.15 * rec.swing;
        } else if (e.layer === "ground" && e.cat !== "infantry") {
          /* Weight. A vehicle squats as it pulls away, noses down as it stops
             and leans out of a turn. Nothing in the game moved like it had
             mass before this - everything simply translated. */
          const sp = Math.hypot(e.x - (rec.px === undefined ? e.x : rec.px),
                                e.y - (rec.py === undefined ? e.y : rec.py)) / Math.max(dt, 1e-4);
          rec.px = e.x; rec.py = e.y;
          const accel = (sp - (rec.sp || 0)) / Math.max(dt, 1e-4);
          rec.sp = sp;
          let dAng = e.ang - (rec.pang === undefined ? e.ang : rec.pang);
          while (dAng > Math.PI) dAng -= Math.PI * 2;
          while (dAng < -Math.PI) dAng += Math.PI * 2;
          rec.pang = e.ang;
          const yaw = dAng / Math.max(dt, 1e-4);
          /* ease toward the target attitude so it settles rather than jitters */
          const wantPitch = U.clamp(-accel * 0.00016, -0.055, 0.055);
          const wantRoll  = U.clamp(yaw * sp * 0.00022, -0.05, 0.05);
          rec.pitch = (rec.pitch || 0) + (wantPitch - (rec.pitch || 0)) * Math.min(1, dt * 6);
          rec.roll  = (rec.roll  || 0) + (wantRoll  - (rec.roll  || 0)) * Math.min(1, dt * 5);
          rec.grp.rotation.x = rec.pitch + (rec.kick || 0);
          rec.grp.rotation.z = rec.roll;
        }
        /* Road wheels turn at the speed the vehicle is actually making. The
           wheels were static before, so every tank in the game slid across
           the ground like a chess piece. */
        if (rec.wheels && rec.wheels.length) {
          const v = rec.sp || 0;                       // pixels a second
          if (v > 0.5) {
            const spin = (v / CFG.TILE) * 1.55 * dt;   // radians, tuned by eye
            for (let wi = 0; wi < rec.wheels.length; wi++)
              rec.wheels[wi].rotation.y -= spin;
          }
        }
        /* Recoil. When a cooldown jumps, the weapon just fired: rock the hull
           back on its suspension and let it settle. A 125 mm gun going off
           with the vehicle completely inert was the flattest thing on screen. */
        /* PER MOUNT, and the heft of the mount that went off. This read "the
           largest cooldown rose" as "weapons[0] fired", which was true while a
           tank had one gun. Every tank now carries its coaxial machine gun
           (generations.js FAULT 05c), cycling every 1.9 s behind a 4.3 s main
           gun, and each burst would have rocked an Abrams as if the 120 mm
           had fired. Same formula, same 0.05 floor, right weapon. */
        if (e.cooldowns && e.cooldowns.length) {
          const last = rec.lastCds || (rec.lastCds = []);
          let fired = null;
          for (let ci = 0; ci < e.cooldowns.length; ci++) {
            const cd = e.cooldowns[ci];
            if (last[ci] !== undefined && cd > last[ci] + 0.05) {
              const wf = (e.def.weapons && WEAPONS[e.def.weapons[ci]]) || {};
              if (!fired || (wf.dmg || 60) > (fired.dmg || 60)) fired = wf;
            }
            last[ci] = cd;
          }
          if (fired) {
            /* a launcher's pod holds from the shot (poseLauncher): a TEL that
               has just put up its last round is dry from this frame on */
            if (rec.elev) rec.lastShot = G.time;
            const heft = U.clamp((fired.dmg || 60) / 900, 0.05, 1);
            rec.kick = 0.045 * heft;                    // radians of nose-up
            rec.recoil = 0.34 * heft;                   // metres the barrel goes back
          }
        }
        if (rec.kick) rec.kick += (0 - rec.kick) * Math.min(1, dt * 7);
        if (rec.recoil) {
          rec.recoil += (0 - rec.recoil) * Math.min(1, dt * 9);
          /* a rocket launcher's module has no barrel to run back */
          if (rec.turret && !rec.elev) rec.turret.position.x = (rec.turretX || 0) - rec.recoil;
        }
        /* Train the turret about the model's OWN vertical axis. Model space is
           +X nose, +Y left, +Z up, so a turret group's local Y is the LEFT-RIGHT
           axis and rotating about it pitches the gun down through the hull
           instead of traversing it. Measured on every turreted model in the
           pack: rotation.y moved an Abrams muzzle 6.1 m vertically and only
           5.0 m horizontally, while rotation.z holds height and radius to
           0.000 m right round the sweep. This was wrong for the parametric
           models too, not just the hand-built ones - it simply never showed
           while a tank was driving at what it was shooting at, because then
           tang and ang are equal and the error is zero. */
        if (rec.turret) rec.turret.rotation.z = -(e.tang - e.ang);
        if (rec.elev) poseLauncher(e, rec, dt);
        /* A launcher drawn in two poses (js/hero/ru_s75_s125.js) is set up
           while the unit is deployed and standing (entities.js: a SAM sets
           up after deploySec idle and loses it on the move), on the march
           otherwise. Not moving as well: a gun or ballistic launcher keeps
           e.deployed through a plain move order, and must not drive off
           erected. Visibility only; models without the groups untouched. */
        if (rec.pose) {
          const up = !!e.deployed && !e.moving;
          if (rec.pose.visible !== up) {
            rec.pose.visible = up;
            if (rec.march) rec.march.visible = !up;
          }
        }
        /* wheels come down only when the aircraft is actually near the
           ground: on the apron, or on an approach to land */
        if (rec.gear) {
          const low = my < heightAt(e.x, e.y) + 18;
          if (rec.gear.visible !== low) rec.gear.visible = low;
        }
        /* Rotors used to turn at full speed on a parked machine, so a deck of
           helicopters sat there with everything spinning. Spool up before a
           launch and wind down after shutdown; a rotor coming up to speed is
           most of what makes a launch read as a launch. */
        if (rec.rotor || rec.tailrotor) {
          const wantRpm = (e.parked || (e.order && e.order.type === "parked")) ? 0 : 1;
          if (rec.rpm === undefined) rec.rpm = wantRpm;
          const spool = (wantRpm > rec.rpm ? 0.55 : 0.32) * dt;   // up faster than down
          rec.rpm = U.clamp(rec.rpm + U.clamp(wantRpm - rec.rpm, -spool, spool), 0, 1);
        }
        /* The translucent blur disc is what a TURNING rotor reads as. It was
           drawn at full strength whatever the machine was doing, so a
           helicopter shut down on a deck sat inside a big grey ellipse that
           looked like a hole in the scene. Fade it with the rotor. */
        if (rec.discs && rec.discs.length) {
          const want = (rec.rpm === undefined ? 1 : rec.rpm);
          if (rec.discAt === undefined || Math.abs(rec.discAt - want) > 0.02) {
            rec.discAt = want;
            for (let di = 0; di < rec.discs.length; di++) {
              const d = rec.discs[di];
              const mtl = Array.isArray(d.material) ? d.material[0] : d.material;
              if (!mtl) continue;
              if (mtl.userData.baseOpacity === undefined)
                mtl.userData.baseOpacity = mtl.opacity;
              mtl.opacity = mtl.userData.baseOpacity * want;
              d.visible = want > 0.02;
            }
          }
        }
        /* every head about its own shaft (rotorShafts), at the speeds it
           always had: a main rotor stops dead below a thousandth of full
           speed, a tail rotor is simply scaled by it */
        if (rec.shafts) {
          for (let si = 0; si < rec.shafts.length; si++) {
            const s = rec.shafts[si];
            if (!s.main) s.part.rotateOnAxis(s.axis, dt * 40 * (rec.rpm === undefined ? 1 : rec.rpm));
            else if (rec.rpm > 0.001) s.part.rotateOnAxis(s.axis, dt * 28 * rec.rpm);
          }
        }
        /* ship wakes */
        if (e.layer === "sea" && e.moving && Math.random() < 0.3) {
          spawnWake(mx - Math.cos(e.ang) * gx2m(e.r), mz - Math.sin(e.ang) * gx2m(e.r));
        }
      }
    }
    for (let i = 0; i < nRiders; i++) { seatOnDeck(riders[i], ents.get(riders[i].id), dt, seen); riders[i] = null; }
    nRiders = 0;
    for (const [id, rec] of ents) {
      if (!seen.has(id)) {
        /* An entity that died this frame keeps its model: Impact3D claims it
           a moment later, when the death event is read, and turns it into
           what the kill leaves. Anything else that stopped being drawn -
           into fog, reskinned, carried - goes as before. */
        if (!(typeof Impact3D !== "undefined" && Impact3D.adopt(id, rec))) three.scene.remove(rec.grp);
        ents.delete(id);
      }
    }
  }

  /* ---------------- effects ---------------- */
  let fxMeshes = [];
  function fxMaterial(color, opacity) {
    return new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
  }
  /* A wake is foam spreading on water, so it needs a soft edge. A bare plane
     with a flat colour reads as a hard translucent square sliding over the
     sea - which is exactly what it looked like. One cached radial-gradient
     texture on a disc fixes it for every wake in the scene. */
  let _foamTex = null;
  function foamTexture() {
    if (_foamTex) return _foamTex;
    const cv = document.createElement("canvas");
    cv.width = cv.height = 64;
    const c = cv.getContext("2d");
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0.00, "rgba(255,255,255,0.95)");
    g.addColorStop(0.45, "rgba(232,244,250,0.45)");
    g.addColorStop(1.00, "rgba(232,244,250,0)");
    c.fillStyle = g; c.fillRect(0, 0, 64, 64);
    _foamTex = new THREE.CanvasTexture(cv);
    return _foamTex;
  }
  function spawnWake(mx, mz) {
    const mat = new THREE.MeshBasicMaterial({
      map: foamTexture(), transparent: true, opacity: 0.30,
      depthWrite: false, color: 0xdfeaf2 });
    const m = new THREE.Mesh(new THREE.CircleGeometry(3.2, 14), mat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(mx, 0.5, mz);
    m.userData = { life: 1.8, max: 1.8, grow: 3.2, kind: "wake" };
    three.scene.add(m); fxMeshes.push(m);
  }
  /* ---- minefields ----
     A mine is not an entity, so it is not in the entity sync. Keep a small
     pool of meshes keyed by mine id and reconcile it each frame against what
     this player is allowed to see.

     Scale is a deliberate exaggeration. A real anti-tank mine is 0.33 m
     across, which at battlefield zoom is well under a pixel; drawn at true
     size the player would never find a minefield they had laid themselves.
     They are drawn at roughly three times life size, which is the same
     compromise the unit models already make. */
  const mineMeshes = new Map();
  /* A tile is 20 metres of terrain. A 0.33 m mine drawn true to scale is a
     sixtieth of a tile and simply cannot be seen, so it is drawn at about a
     fifth of a tile - the same readability compromise the unit models make. */
  const MINE_SCALE = { land: 9.0, sea: 5.0 };
  function syncMines() {
    if (typeof Mines === "undefined" || !G.mines) return;
    const want = new Set();
    const list = Mines.forRender(G, G.human);
    for (const m of list) {
      want.add(m.id);
      let rec = mineMeshes.get(m.id);
      if (!rec) {
        const src = (typeof MINE_MODELS !== "undefined")
          ? MINE_MODELS[m.sea ? "sea" : "land"] : null;
        if (!src || !src.build) continue;
        let tpl;
        try { tpl = src.build(THREE, Models3D, { team: G.human.color.main }); }
        catch (e) { continue; }
        if (!tpl) continue;
        const grp = new THREE.Group();
        tpl.rotation.x = -Math.PI / 2;                 // same stand-up as a unit
        const k = MINE_SCALE[m.sea ? "sea" : "land"];
        tpl.scale.setScalar(k);
        grp.add(tpl);
        grp.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
        three.scene.add(grp);
        rec = { grp };
        mineMeshes.set(m.id, rec);
      }
      /* a sea mine floats with its horns awash; a land mine sits in the dirt */
      const y = m.sea ? 0.25 : heightAt(m.x, m.y);
      rec.grp.position.set(gx2m(m.x), y, gx2m(m.y));
      if (m.sea) rec.grp.rotation.y = Math.sin(G.time * 0.5 + m.id) * 0.10;
      /* an unarmed mine is still being placed: sink it and fade it up */
      const settling = !m.armed;
      rec.grp.visible = true;
      rec.grp.position.y = y - (settling ? 0.55 : 0);
    }
    for (const [id, rec] of mineMeshes) {
      if (want.has(id)) continue;
      three.scene.remove(rec.grp);
      rec.grp.traverse((o) => {
        if (o.geometry) { try { o.geometry.dispose(); } catch (e) {} }
      });
      mineMeshes.delete(id);
    }
  }

  /* Acoustic nodes, reconciled exactly as the mines are. The exaggeration is
     smaller than a mine's: the float is 0.90 m where a land mine is 0.33, so
     3.2x puts it at about a seventh of a tile - findable, without a barrier
     looking like a line of moored buoys the size of a house. */
  const nodeMeshes = new Map();
  const NODE_SCALE = 3.2;
  function syncNodes() {
    if (typeof SonarNet === "undefined" || !G.sonarnet) return;
    const want = new Set();
    const list = SonarNet.forRender(G, G.human);
    for (const n of list) {
      want.add(n.id);
      let rec = nodeMeshes.get(n.id);
      if (!rec) {
        const src = (typeof NET_MODELS !== "undefined") ? NET_MODELS.node : null;
        if (!src || !src.build) continue;
        let tpl;
        try { tpl = src.build(THREE, Models3D, { team: G.human.color.main }); }
        catch (err) { continue; }
        if (!tpl) continue;
        const grp = new THREE.Group();
        tpl.rotation.x = -Math.PI / 2;                 // same stand-up as a unit
        tpl.scale.setScalar(NODE_SCALE);
        grp.add(tpl);
        grp.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
        three.scene.add(grp);
        rec = { grp };
        nodeMeshes.set(n.id, rec);
      }
      /* the float rides the surface like the sea mine, out of phase with it */
      rec.grp.position.set(gx2m(n.x), 0.25, gx2m(n.y));
      rec.grp.rotation.y = Math.sin(G.time * 0.4 + n.id) * 0.12;
      rec.grp.visible = true;
    }
    for (const [id, rec] of nodeMeshes) {
      if (want.has(id)) continue;
      three.scene.remove(rec.grp);
      /* No geometry dispose here, unlike syncMines: sonarnet_objects.js caches
         its handful of primitives at module level and every node shares them,
         so disposing one node's mesh would blank the next one laid. */
      nodeMeshes.delete(id);
    }
  }

  /* the ground at x, y is in the player's sight now (G.fog 2), or fog is off */
  function seenNow3(x, y) {
    if (!G.fogEnabled || !G.fog) return true;
    const tx = (x / CFG.TILE) | 0, ty = (y / CFG.TILE) | 0;
    if (tx < 0 || ty < 0 || tx >= G.map.W || ty >= G.map.H) return false;
    return G.fog[ty * G.map.W + tx] === 2;
  }
  /* ---- a rocket launcher lays its pod ----
     A model with a group named "podelev" (js/hero/us_m270_himars.js: the
     launcher-loader module of the M270 and the HIMARS, hinged at its rear
     trunnion) has it turned about its own Y, the model's pitch axis. Level
     while the vehicle drives or has nothing to shoot; raised to the model's
     launch elevation (userData.el) while it holds a target, or a fire
     mission, inside its weapon's reach and has a round left; held through the
     salvo and HOLD_EL seconds past the last round; down at once when the
     vehicle moves off. The one exception is the last stretch of the drive to
     the firing point, the distance covered in the time the pod takes to
     come up: the game fires the tick the launcher arrives, and a ripple out
     of a pod still lying over the cab would be the worse picture. The rate
     is the row's own laying rate, the tturn its module traverses at: the
     M270A1 and HIMARS launcher drive lays azimuth and elevation together
     (GlobalSecurity, M270A1: stowed to the furthest aim point in 16 s), so
     here the two finish together too. Only the unit's own state is read;
     a ghost is a fresh copy of the template, so a contact in the fog shows
     its pod stowed. */
  const HOLD_EL = 3;
  function poseLauncher(e, rec, dt) {
    const el = rec.elev.userData.el || 0.61, rate = e.def.tturn || 0.8, o = e.order;
    let up = rec.lastShot !== undefined && G.time - rec.lastShot < HOLD_EL && !e.moving, tx, ty;
    if (o && o.type === "attack" && o.target && !o.target.dead) { tx = o.target.x; ty = o.target.y; }
    else if (o && o.type === "bombard") { tx = o.x; ty = o.y; }
    if (!up && tx !== undefined && !(e.roundsMax && e.rounds <= 0)) {
      const w = layMount(e, o);
      if (w) {
        const d = Math.hypot(tx - e.x, ty - e.y);
        const reach = e.weaponRange ? e.weaponRange(w) : w.range * CFG.TILE;
        const lead = e.moving ? (rec.sp || 0) * Math.max(0, el - (rec.elA || 0)) / rate : 0;
        up = d <= reach + lead && d >= (w.minRange || 0) * CFG.TILE;
      }
    }
    const a = rec.elA || 0, want = up ? el : 0;
    if (a === want) return;
    /* A launcher already on its bearing when it takes a target fires that
       same tick, before any pod could be up. While rounds are leaving a pod
       still coming up it catches up at three times its laying rate - a
       picture compromise, not a figure - so that one or two rounds of a
       ripple, not five, leave it low. */
    const step = rate * dt * (want > a && rec.lastShot !== undefined && G.time - rec.lastShot < 0.5 ? 3 : 1);
    rec.elA = Math.abs(want - a) <= step ? want : a + (want > a ? step : -step);
    rec.elev.rotation.y = -rec.elA;
  }

  /* The mount the order will fire, chosen as entities.js chooses it: a
     mission's named mount (bombard o.wi: the M270's AT2 mine rocket, whose
     reach is not its rockets'), else the first mount that is not a mine
     dispenser. None while every mount is held: a TEL's ballistic missile
     under an order that did not release it does not go, so its pod stays
     down. */
  function layMount(e, o) {
    const ws = e.def.weapons;
    if (o.type === "bombard" && o.wi !== undefined) {
      const w = WEAPONS[ws[o.wi]];
      if (w && !(e.holdsFire && e.holdsFire(w))) return w;
    }
    for (let i = 0; i < ws.length; i++) {
      const w = WEAPONS[ws[i]];
      if (w && !w.scatter && !(e.holdsFire && e.holdsFire(w))) return w;
    }
    return null;
  }

  /* ---- the round leaves the pod ----
     A round from a launcher drawn with a "podelev" group is first drawn at
     the mouth of the pod's next cell (userData.cells, in the group's frame:
     mouth x, y, z and the pod's rear x), wherever the pod is laid, and is
     pulled onto its simulated path over LAUNCH_JOIN seconds; the path itself
     is not touched. The motor's flash is drawn at the mouth, and the
     backblast - fire, then a dust cloud kicked off the ground, at most one a
     launcher every 0.25 s - out of the rear of the pod. ents holds only what
     the player can see this frame, so a launcher in the fog gets none of
     it and its rounds are drawn exactly as before. */
  const LAUNCH_JOIN = 0.3;
  let _lm = null, _lr = null, _ld = null, _lx = null;
  function launchOffset(p, x, y, z) {
    const s = p.shooter, rec = s && s.id !== undefined ? ents.get(s.id) : null;
    /* a round first drawn well after it left (the renderer was not running
       when it was fired) is not pulled back to the pod */
    if (!rec || !rec.elev || p.age > 0.5) return null;
    rec.lastShot = G.time;
    const cells = rec.elev.userData.cells;
    if (!cells || !cells.length) return null;
    if (!_lm) { _lm = new THREE.Vector3(); _lr = new THREE.Vector3(); _ld = new THREE.Vector3(); _lx = new THREE.Vector3(1, 0, 0); }
    rec.cellI = ((rec.cellI === undefined ? -1 : rec.cellI) + 1) % cells.length;
    const c = cells[rec.cellI];
    rec.elev.updateWorldMatrix(true, false);
    _lm.set(c[0], c[1], c[2]).applyMatrix4(rec.elev.matrixWorld);
    _lr.set(c[3], c[1], c[2]).applyMatrix4(rec.elev.matrixWorld);
    _ld.subVectors(_lm, _lr).normalize();
    /* the motor lighting in the mouth of the cell: the shape of FX3D.muzzle,
       on materials of its own, because the fade below writes opacity into
       whatever material it finds and FX3D's are shared with every round in
       flight */
    const mz = new THREE.Group(), cone = new THREE.Mesh(new THREE.ConeGeometry(0.75, 3.0, 7), fxMaterial(0xfff0c0, 0.9));
    cone.rotation.z = -Math.PI / 2; cone.position.x = 1.4;
    mz.add(cone, new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 6), fxMaterial(0xffb24a, 0.9)));
    mz.position.copy(_lm);
    mz.quaternion.setFromUnitVectors(_lx, _ld);
    mz.userData = { life: 0.12, max: 0.12, grow: 0.8, kind: "flash" };
    three.scene.add(mz); fxMeshes.push(mz);
    /* the jet out of the rear of the pod: fire, then dust off the ground */
    const fb = new THREE.Mesh(new THREE.SphereGeometry(1.0, 8, 6), fxMaterial(0xffa04a, 0.85));
    fb.position.copy(_lr).addScaledVector(_ld, -1.5);
    fb.userData = { life: 0.25, max: 0.25, grow: 2.6, kind: "spark" };
    three.scene.add(fb); fxMeshes.push(fb);
    if (!(rec.bbT > G.time)) {
      rec.bbT = G.time + 0.25;
      const du = new THREE.Mesh(new THREE.SphereGeometry(1.6, 8, 6), fxMaterial(0xb49c76, 0.55));
      du.position.copy(_lr).addScaledVector(_ld, -4);
      du.position.y = Math.max(heightAt(s.x, s.y) + 1.2, du.position.y - 2);
      du.userData = { life: 1.8, max: 1.8, grow: 5.5, rise: 1.1, kind: "smoke" };
      three.scene.add(du); fxMeshes.push(du);
    }
    return { x: _lm.x - x, y: _lm.y - y, z: _lm.z - z, t: 0,
             px: _lm.x, py: _lm.y, pz: _lm.z, ax: _ld.x, ay: _ld.y, az: _ld.z, first: true };
  }
  /* the named round a launcher row fires with this weapon (UNIT_MODELS[row].ord,
     by the row's own id: a peer drawn with the same model keeps its rounds).
     generations.js gives a row its own copy of a shared weapon as
     "<weapon>__<row>"; the name before the "__" is the one the row declares. */
  function ordFor(p) {
    const def = p.shooter && p.shooter.def;
    const mdl = def && typeof UNIT_MODELS !== "undefined" ? UNIT_MODELS[def.id] : null;
    if (!mdl || !mdl.ord || !def.weapons) return null;
    for (let i = 0; i < def.weapons.length; i++) {
      const k = def.weapons[i];
      if (WEAPONS[k] === p.w) return mdl.ord[k] || mdl.ord[k.split("__")[0]] || null;
    }
    return null;
  }

  function syncEffects(dt) {
    /* ---- projectiles: real ordnance, oriented along its flight path ---- */
    for (const p of Combat.projectiles) {
      if (!p._m3) {
        try { p._m3 = FX3D.create(THREE, p, ordFor(p)); } catch (e) { p._m3 = null; }
        if (!p._m3) {
          p._m3 = new THREE.Mesh(new THREE.SphereGeometry(0.9, 6, 6), fxMaterial(0xffd280, 1));
        }
        three.scene.add(p._m3);
        projMeshes.add(p._m3);
        p._px = p.x; p._py = p.y; p._pz = p.z;
        p._smokeT = 0;
      }
      const under = p.type === "torpedo" || p.type === "depth";
      const gy = heightAt(p.x, p.y);
      const y = under ? (p.type === "depth" ? Math.max(-6, -p.age * 5) : -0.9)
                      : gy + 2 + p.z * 0.5;
      /* velocity from the last frame drives orientation */
      const vx = gx2m(p.x - p._px), vz = gx2m(p.y - p._py);
      const vy = y - (p._lastY !== undefined ? p._lastY : y);
      p._px = p.x; p._py = p.y; p._lastY = y;
      p._m3.position.set(gx2m(p.x), y, gx2m(p.y));
      /* out of the pod mouth and onto the path (launchOffset); pointed the
         way it is drawn moving, along the pod on its first frame */
      let ox = vx, oy = vy, oz = vz;
      if (p._lo === undefined) p._lo = launchOffset(p, p._m3.position.x, y, p._m3.position.z);
      if (p._lo) {
        const L = p._lo, k = 1 - L.t / LAUNCH_JOIN;
        L.t += dt;
        if (k > 0) {
          const sm = k * k * (3 - 2 * k), q = p._m3.position;
          q.set(q.x + L.x * sm, q.y + L.y * sm, q.z + L.z * sm);
          if (L.first) { ox = L.ax; oy = L.ay; oz = L.az; L.first = false; }
          else { ox = q.x - L.px; oy = q.y - L.py; oz = q.z - L.pz; }
          L.px = q.x; L.py = q.y; L.pz = q.z;
        } else p._lo = null;
      }
      if (ox || oy || oz) FX3D.orient(p._m3, ox, oy, oz, dt, G.time);

      /* ---- a cold-launched round is UNLIT until it breaches ----
         combat.js gives the round p.subLaunch while it is climbing out of the
         tube and p.wet while it is still under water. The whole point of the
         sequence is that a gas generator throws the missile clear and the
         first stage does not light until it is in the air - so while it is wet
         it must show no flame and lay no smoke. Without this the flight model
         was right and the picture was wrong: a burning missile crawling up
         through the sea, which is the opposite of what a cold launch looks
         like. orient() only ever writes scale and opacity on these two meshes,
         never .visible, so toggling it here does not fight the animator. */
      if (p._m3 && p.subLaunch !== undefined) {
        const fl = p._m3.getObjectByName("flame"), co = p._m3.getObjectByName("core");
        if (fl) fl.visible = !p.wet;
        if (co) co.visible = !p.wet;
        if (p.wet) {
          /* the disturbance the missile drags up with it */
          if (!p._bubT || p._bubT <= 0) {
            p._bubT = 0.09;
            const b2 = new THREE.Mesh(new THREE.CircleGeometry(0.5, 10),
              fxMaterial(0xcfe6f2, 0.42));
            b2.rotation.x = -Math.PI / 2;
            b2.position.set(gx2m(p.x), 0.5, gx2m(p.y));
            b2.userData = { life: 0.9, max: 0.9, grow: 2.4, kind: "wake" };
            three.scene.add(b2); fxMeshes.push(b2);
          } else p._bubT -= dt;
        }
      } else if (p._m3 && p._coldDone !== 1 && p.zBoostT > 0) {
        /* handed back to normal flight: make sure the plume is on again */
        p._coldDone = 1;
        const fl2 = p._m3.getObjectByName("flame"), co2 = p._m3.getObjectByName("core");
        if (fl2) fl2.visible = true;
        if (co2) co2.visible = true;
      }

      /* trails: rocket smoke above water, bubble wake below it */
      p._smokeT -= dt;
      if (p._smokeT <= 0) {
        if (p.type === "missile" && !(p.subLaunch !== undefined && p.wet)) {
          p._smokeT = 0.035;
          const puff = new THREE.Mesh(new THREE.SphereGeometry(0.7, 6, 5),
            fxMaterial(0xb9bec4, 0.5));
          puff.position.copy(p._m3.position);
          puff.userData = { life: 1.5, max: 1.5, grow: 4.5, rise: 2.0, kind: "smoke" };
          three.scene.add(puff); fxMeshes.push(puff);
        } else if (p.type === "torpedo") {
          p._smokeT = 0.06;
          const b = new THREE.Mesh(new THREE.CircleGeometry(0.8, 12),
            new THREE.MeshBasicMaterial({ map: foamTexture(), transparent: true,
              opacity: 0.5, depthWrite: false, color: 0xdff0fa }));
          b.rotation.x = -Math.PI / 2;
          b.position.set(gx2m(p.x), 0.45, gx2m(p.y));
          b.userData = { life: 1.1, max: 1.1, grow: 2.0, kind: "wake" };
          three.scene.add(b); fxMeshes.push(b);
        } else if (p.type === "arc" && p.z > 12) {
          p._smokeT = 0.13;
          const puff = new THREE.Mesh(new THREE.SphereGeometry(0.4, 5, 4),
            fxMaterial(0x9aa0a6, 0.28));
          puff.position.copy(p._m3.position);
          puff.userData = { life: 0.9, max: 0.9, grow: 2.2, kind: "smoke" };
          three.scene.add(puff); fxMeshes.push(puff);
        }
      }
    }

    applyWeather(dt);
    applyShake(dt);

    /* one-shot effects from the sim */
    for (const fx of Combat.effects) {
      if (fx._seen3) continue;
      fx._seen3 = true;
      if (fx.t === "hit" || fx.t === "death") {
        if (typeof Impact3D !== "undefined") Impact3D.event(fx);
        continue;
      }
      /* Fog honesty for the fireball and the carousel's stand-in turret, on
         the rule Impact3D keeps for everything it draws: only where the
         player sees now. The fog wash lies on the ground (46% on explored
         tiles, 93% on unexplored), so a fireball showed through it, and the
         opaque box flew up in front of it - a tank dying where nothing of
         the player's could see it announced itself. A nuclear burst is still
         drawn anywhere: its cloud stands kilometres high over the map, and
         the launch is called out to every commander. */
      if (((fx.t === "boom" && !fx.nuke) || fx.t === "turrettoss") && !seenNow3(fx.x, fx.y)) continue;
      if (fx.t === "boom") {
        const r = fx.r * PXM * 1.6;
        const gy = heightAt(fx.x, fx.y);
        if (fx.nuke) {
          /* mushroom: fireball, rising stem, spreading cap, ground shockwave */
          const fire = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), fxMaterial(0xffd08a, 1));
          fire.position.set(gx2m(fx.x), gy + 6, gx2m(fx.y));
          fire.userData = { life: 2.6, max: 2.6, grow: r * 0.9, rise: 7, kind: "boom" };
          three.scene.add(fire); fxMeshes.push(fire);
          const stem = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.10, r * 0.16, r * 0.9, 12),
            fxMaterial(0x584a3c, 0.7));
          stem.position.set(gx2m(fx.x), gy + r * 0.45, gx2m(fx.y));
          stem.userData = { life: 5.5, max: 5.5, grow: 0.5, rise: 5, kind: "smoke" };
          three.scene.add(stem); fxMeshes.push(stem);
          const cap = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 10), fxMaterial(0x6b5a48, 0.75));
          cap.scale.set(1, 0.55, 1);
          cap.position.set(gx2m(fx.x), gy + r * 0.95, gx2m(fx.y));
          cap.userData = { life: 5.5, max: 5.5, grow: r * 0.55, rise: 6, kind: "smoke" };
          three.scene.add(cap); fxMeshes.push(cap);
          const ring = new THREE.Mesh(new THREE.RingGeometry(0.9, 1, 40),
            new THREE.MeshBasicMaterial({ color: 0xffe0a0, transparent: true, opacity: 0.85,
                                          side: THREE.DoubleSide, depthWrite: false }));
          ring.rotation.x = -Math.PI / 2;
          ring.position.set(gx2m(fx.x), gy + 1.5, gx2m(fx.y));
          ring.userData = { life: 1.6, max: 1.6, grow: r * 2.4, kind: "shock" };
          three.scene.add(ring); fxMeshes.push(ring);
        } else {
          const m = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8),
            fxMaterial(fx.water ? 0xcfe4f0 : 0xffb050, 0.85));
          m.position.set(gx2m(fx.x), gy + 2, gx2m(fx.y));
          m.userData = { life: 0.5, max: 0.5, grow: r * 2.2, kind: "boom" };
          three.scene.add(m); fxMeshes.push(m);
          const smoke = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 6), fxMaterial(0x2c2a28, 0.5));
          smoke.position.copy(m.position); smoke.position.y += 3;
          smoke.userData = { life: 1.4, max: 1.4, grow: r * 1.6, rise: 9, kind: "smoke" };
          three.scene.add(smoke); fxMeshes.push(smoke);
        }
      } else if (fx.t === "turrettoss") {
        /* the carousel goes up and the turret comes off — the signature
           catastrophic kill of a Soviet-pattern tank */
        const gy = heightAt(fx.x, fx.y);
        const jet = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 3.2, 16, 10),
          fxMaterial(0xffca6a, 0.9));
        jet.position.set(gx2m(fx.x), gy + 8, gx2m(fx.y));
        jet.userData = { life: 1.3, max: 1.3, grow: 3, rise: 12, kind: "boom" };
        three.scene.add(jet); fxMeshes.push(jet);
        const tur = new THREE.Mesh(new THREE.BoxGeometry(5.5, 2.4, 7),
          new THREE.MeshStandardMaterial({ color: 0x35392f, roughness: 0.9 }));
        tur.position.set(gx2m(fx.x), gy + 3, gx2m(fx.y));
        tur.userData = { life: 2.2, max: 2.2, kind: "tumble",
          vx: (Math.random() - 0.5) * 9, vz: (Math.random() - 0.5) * 9,
          vy: 26, spin: (Math.random() - 0.5) * 9 };
        /* the stand-in box only when Impact3D could not throw the real turret */
        if (!(typeof Impact3D !== "undefined" && Impact3D.threwTurret(fx.x, fx.y))) {
          three.scene.add(tur); fxMeshes.push(tur);
        }
        const smk = new THREE.Mesh(new THREE.SphereGeometry(1, 9, 7), fxMaterial(0x241f1c, 0.72));
        smk.position.set(gx2m(fx.x), gy + 5, gx2m(fx.y));
        smk.userData = { life: 4.5, max: 4.5, grow: 16, rise: 7, kind: "smoke" };
        three.scene.add(smk); fxMeshes.push(smk);
      } else if (fx.t === "tracer") {
        /* a burning streak along the shot line, not a hairline */
        const t3 = FX3D.tracer(THREE,
          gx2m(fx.x1), heightAt(fx.x1, fx.y1) + 3, gx2m(fx.y1),
          gx2m(fx.x2), heightAt(fx.x2, fx.y2) + 3, gx2m(fx.y2), !!fx.heavy);
        t3.userData = { life: 0.075, max: 0.075, kind: "tracer" };
        three.scene.add(t3); fxMeshes.push(t3);
        /* The strike is the "hit" event combat.js sends with every hitscan
           round: js/impact3d.js draws what the round met. The pale sphere
           that stood in for it here, on steel, earth and water alike, is
           kept only for a page that does not load impact3d.js (the dev pages
           _play, _replay, _fog and _loadshot), so they still see where a
           round struck. Its geometry is now disposed with it (below). */
        if (typeof Impact3D === "undefined") {
          const sp = new THREE.Mesh(new THREE.SphereGeometry(0.4, 6, 5), fxMaterial(0xffd9a0, 0.9));
          sp.position.set(gx2m(fx.x2), heightAt(fx.x2, fx.y2) + 1.6, gx2m(fx.y2));
          sp.userData = { life: 0.16, max: 0.16, grow: 2.2, kind: "spark" };
          three.scene.add(sp); fxMeshes.push(sp);
        }
      } else if (fx.t === "flash") {
        const mz = FX3D.muzzle(THREE, !!fx.big);
        mz.position.set(gx2m(fx.x), heightAt(fx.x, fx.y) + 3.2, gx2m(fx.y));
        if (fx.ang !== undefined) mz.rotation.y = -fx.ang;
        mz.userData = { life: 0.085, max: 0.085, grow: 0.6, kind: "flash" };
        three.scene.add(mz); fxMeshes.push(mz);
        /* smoke puff left hanging at the muzzle */
        const sm = new THREE.Mesh(new THREE.SphereGeometry(fx.big ? 1.1 : 0.6, 7, 5),
          fxMaterial(0x8f939a, 0.4));
        sm.position.set(gx2m(fx.x), heightAt(fx.x, fx.y) + 3.2, gx2m(fx.y));
        sm.userData = { life: 0.9, max: 0.9, grow: 3, rise: 3, kind: "smoke" };
        three.scene.add(sm); fxMeshes.push(sm);
      }
    }
    for (let i = fxMeshes.length - 1; i >= 0; i--) {
      const m = fxMeshes[i];
      m.userData.life -= dt;
      const f = m.userData.life / m.userData.max;
      if (m.userData.life <= 0) {
        three.scene.remove(m); fxMeshes.splice(i, 1);
        /* MEASURED: nothing was disposed here, and every effect mesh carries a
           geometry of its own - ten minutes of battle left the renderer holding
           +12,310 geometries it would never draw again. The geometry goes with
           the mesh. The materials stay: FX3D's are shared by every tracer and
           muzzle flash, and disposing a shared material makes the renderer
           drop its program and compile it again on the next shot. The ones
           fxMaterial makes per mesh own no GL object - their program is the
           one every basic material shares - so the collector takes them with
           the mesh (programs held: 20 after the harness, flat). */
        m.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
        continue;
      }
      if (m.userData.grow) {
        const s = 1 + (1 - f) * m.userData.grow;
        m.scale.set(s, s, s);
      }
      if (m.userData.rise) m.position.y += m.userData.rise * dt;
      /* a tumbling turret flies a real ballistic arc and does not fade */
      if (m.userData.kind === "tumble") {
        const u = m.userData;
        u.vy -= 42 * dt;
        m.position.x += u.vx * dt; m.position.z += u.vz * dt; m.position.y += u.vy * dt;
        m.rotation.x += u.spin * dt; m.rotation.z += u.spin * 0.6 * dt;
        const g = heightAt(m2gx(m.position.x), m2gx(m.position.z)) + 1.2;
        if (m.position.y < g) { m.position.y = g; u.vy = 0; u.vx *= 0.3; u.vz *= 0.3; u.spin *= 0.2; }
        continue;
      }
      const op = f * (m.userData.kind === "wake" ? 0.45 :
                      m.userData.kind === "smoke" ? 0.5 : 0.9);
      if (m.material && m.material.opacity !== undefined) m.material.opacity = op;
      else m.traverse(o => { if (o.material && o.material.opacity !== undefined) o.material.opacity = op; });
    }
  }
  /* ---- atmospherics: the sky is the readout for visibility ----
     Night drops the sun and cools everything; a sandstorm pulls the fog in
     close and turns the whole scene ochre, which is exactly what the gun
     camera footage from Desert Storm looks like.                          */
  const WX_LOOK = {
    clear:     { sky: 0x0d1218, fog: 0x9aa8b5, near: 1500, far: 4200, sun: 2.10, hemi: 0.50, sunC: 0xfff0d8 },
    overcast:  { sky: 0x141a20, fog: 0x8e97a0, near: 1200, far: 3400, sun: 1.25, hemi: 0.62, sunC: 0xe6e9ee },
    rain:      { sky: 0x0e1319, fog: 0x707c88, near:  900, far: 2600, sun: 0.95, hemi: 0.55, sunC: 0xd6dee8 },
    night:     { sky: 0x04070c, fog: 0x1d2735, near: 1000, far: 2800, sun: 0.34, hemi: 0.22, sunC: 0x9fb6d8 },
    sandstorm: { sky: 0x2a2015, fog: 0xa8865a, near:  420, far: 1500, sun: 0.80, hemi: 0.48, sunC: 0xd8a468 },
  };
  let wxCur = null, wxMix = 1;
  function applyWeather(dt) {
    if (!G.weather) return;
    const key = G.weatherKey || "clear";
    const want = WX_LOOK[key] || WX_LOOK.clear;
    if (!wxCur) { wxCur = Object.assign({}, want); wxMix = 1; }
    if (wxCur._key !== key) { wxCur._key = key; wxMix = 0; }
    /* ease into the new conditions over a few seconds rather than snapping */
    if (wxMix < 1) wxMix = Math.min(1, wxMix + dt * 0.35);
    const k = wxMix < 1 ? dt * 1.4 : 0;
    const lerp = (a, b) => a + (b - a) * Math.min(1, k || 1);

    wxCur.near = lerp(wxCur.near, want.near);
    wxCur.far  = lerp(wxCur.far,  want.far);
    wxCur.sun  = lerp(wxCur.sun,  want.sun);
    wxCur.hemi = lerp(wxCur.hemi, want.hemi);
    three.scene.fog.near = wxCur.near;
    three.scene.fog.far  = wxCur.far;
    three.scene.fog.color.set(want.fog).convertSRGBToLinear();
    three.scene.background.set(want.sky).convertSRGBToLinear();
    three.sun.intensity = wxCur.sun;
    three.sun.color.set(want.sunC).convertSRGBToLinear();
    if (three.hemi) three.hemi.intensity = wxCur.hemi;

    /* blowing dust: a drifting particle field, only while it is blowing */
    if (key === "sandstorm") spawnDust(dt); else killDust();
  }
  let dust = null;
  function spawnDust(dt) {
    if (!dust) {
      const N = 900, pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 3000;
        pos[i * 3 + 1] = Math.random() * 260;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 3000;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      dust = new THREE.Points(g, new THREE.PointsMaterial({
        color: new THREE.Color(0xc9a774).convertSRGBToLinear(), size: 7,
        transparent: true, opacity: 0.34, depthWrite: false, sizeAttenuation: true }));
      dust.frustumCulled = false;
      three.scene.add(dust);
    }
    /* keep the field centred on the camera and drive it downwind */
    const a = dust.geometry.attributes.position, arr = a.array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += 150 * dt; arr[i + 2] += 46 * dt;
      if (arr[i] > 1500) arr[i] -= 3000;
      if (arr[i + 2] > 1500) arr[i + 2] -= 3000;
    }
    a.needsUpdate = true;
    dust.position.set(three.camera.position.x, 0, three.camera.position.z);
  }
  function killDust() {
    if (!dust) return;
    three.scene.remove(dust); dust.geometry.dispose(); dust.material.dispose(); dust = null;
  }

  /* ---- concussion shake ----
     Offsets the camera target, not the world, so nothing in the sim moves and
     the effect decays on its own. */
  let shakeT = 0;
  function applyShake(dt) {
    if (typeof Threat === "undefined") return;
    const k = Threat.shake;
    if (k <= 0.001) return;
    shakeT += dt * 34;
    const amp = k * k * 26;
    three.camera.position.x += Math.sin(shakeT * 1.7) * amp;
    three.camera.position.y += Math.sin(shakeT * 2.3) * amp * 0.6;
    three.camera.position.z += Math.cos(shakeT * 1.3) * amp;
  }

  /* ---- projectile meshes ----
     These used to be found again by sniffing the scene for a Mesh with
     SphereGeometry. FX3D builds real ordnance as a GROUP of parts, so nothing
     it produced ever matched, and every missile, shell, bomb and torpedo mesh
     stayed in the scene for the rest of the battle. They are tracked
     explicitly now, and their geometry and materials are released. */
  const projMeshes = new Set();

  function disposeObj(o) {
    o.traverse(n => {
      if (n.geometry) n.geometry.dispose();
      const m = n.material;
      if (m) (Array.isArray(m) ? m : [m]).forEach(x => { if (x && x.dispose) x.dispose(); });
    });
  }

  function cleanProjectiles() {
    const live = new Set();
    for (const p of Combat.projectiles) if (p._m3) live.add(p._m3);
    for (const obj of projMeshes) {
      if (live.has(obj)) continue;
      three.scene.remove(obj);
      disposeObj(obj);
      projMeshes.delete(obj);
    }
  }

  /* ---------------- camera & projection ---------------- */
  function applyCamera() {
    const c = three.camera;
    const tx = gx2m(cam.x), tz = gx2m(cam.y);
    const ty = Math.max(0, heightAt(cam.x, cam.y));
    c.position.set(
      tx + Math.cos(cam.yaw) * Math.cos(cam.pitch) * cam.dist,
      ty + Math.sin(cam.pitch) * cam.dist,
      tz + Math.sin(cam.yaw) * Math.cos(cam.pitch) * cam.dist);
    c.lookAt(tx, ty, tz);
    cam.z = 760 / cam.dist;                    // UI scale shim for 2D overlay code
    /* ---- sun and shadow frustum ----
       The shadow box has to be pushed far enough back that nothing inside it
       clips the light's near plane; a caster that clips streaks its shadow
       right across the map. Distance is therefore derived from the box size
       rather than fixed. */
    const R = Math.min(1100, cam.dist * 1.5 + 220);
    const D = R * 2.4 + 700;                       // light distance along its axis
    const dir = { x: -0.553, y: 0.774, z: -0.295 };  // fixed late-morning sun
    three.sun.position.set(tx + dir.x * D, dir.y * D, tz + dir.z * D);
    three.sun.target.position.set(tx, 0, tz);
    three.sun.target.updateMatrixWorld();
    const sc = three.sun.shadow.camera;
    sc.left = -R; sc.right = R; sc.top = R; sc.bottom = -R;
    sc.near = Math.max(1, D - R * 1.6);
    sc.far = D + R * 1.6 + 400;
    sc.updateProjectionMatrix();
  }
  const _v = null;
  function project(wx, wy, alt) {
    const v = new THREE.Vector3(gx2m(wx), (alt !== undefined ? alt : heightAt(wx, wy)), gx2m(wy));
    v.project(three.camera);
    return { x: (v.x + 1) / 2 * W, y: (1 - v.y) / 2 * H, behind: v.z > 1 };
  }
  function sx(wx, wy) { return project(wx, wy).x; }
  function sy(wx, wy) { return project(wx, wy).y; }
  /* Ground point under a screen pixel, assuming flat ground. No raycast, so
     it is effectively free and safe to call every frame. */
  function unprojectFlat(px, py) {
    raycaster.setFromCamera({ x: px / W * 2 - 1, y: 1 - py / H * 2 }, three.camera);
    const o = raycaster.ray.origin, d = raycaster.ray.direction;
    const t = -o.y / (d.y || -0.0001);
    return { x: m2gx(o.x + d.x * t), y: m2gx(o.z + d.z * t) };
  }

  function unproject(px, py) {
    raycaster.setFromCamera({ x: px / W * 2 - 1, y: 1 - py / H * 2 }, three.camera);
    const hit = raycaster.intersectObject(terrainMesh, false)[0];
    if (hit) return { x: m2gx(hit.point.x), y: m2gx(hit.point.z) };
    /* fallback: sea-level plane */
    const o = raycaster.ray.origin, d = raycaster.ray.direction;
    const t = -o.y / (d.y || -0.0001);
    return { x: m2gx(o.x + d.x * t), y: m2gx(o.z + d.z * t) };
  }
  function moveCam(dx, dy) {
    cam.x = U.clamp(cam.x + dx, 0, G.map.W * CFG.TILE);
    cam.y = U.clamp(cam.y + dy, 0, G.map.H * CFG.TILE);
  }
  function setCam(x, y) { cam.x = x; cam.y = y; moveCam(0, 0); }
  function zoom(f) { cam.dist = U.clamp(cam.dist / f, 130, 1200); }

  /* ---------------- 2D overlay (UI adornments over the 3D view) ---------------- */
  function drawOverlay(input) {
    const c = ctx2d;
    c.clearRect(0, 0, W, H);

    /* the box being dragged out for an automatic mine-laying or sweeping job */
    if (typeof UI !== "undefined" && UI.areaRect) {
      const r = UI.areaRect();
      if (r) {
        const x = Math.min(r.x0, r.x1), y = Math.min(r.y0, r.y1);
        const w = Math.abs(r.x1 - r.x0), hh = Math.abs(r.y1 - r.y0);
        c.save();
        c.fillStyle = "rgba(200,176,106,0.10)";
        c.fillRect(x, y, w, hh);
        c.strokeStyle = "rgba(226,196,120,0.95)";
        c.lineWidth = 1.4;
        c.setLineDash([7, 5]);
        c.strokeRect(x + 0.5, y + 0.5, w, hh);
        c.setLineDash([]);
        c.restore();
      }
    }

    /* Mines are real geometry now (see syncMines). The overlay keeps only a
       faint ring on the ones this player laid, so you can find your own field
       without it turning into a wall of icons - an enemy mine you have
       detected shows as the mine itself and nothing more. */
    if (typeof Mines !== "undefined" && G.mines && G.mines.length) {
      const list = Mines.forRender(G, G.human);
      for (const m of list) {
        const p = project(m.x, m.y);
        if (p.behind || p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) continue;
        /* An ally's mine - on screen only while a clearer of ours is driven
           through its lane (mines.js, LINGER) - takes the ally's own colour
           and a broken rim, the way [60] rings an ally, never the hostile
           orange. */
        const sd = G.side(m), own = sd === "own", ally = sd === "ally";
        const tint = ally ? G.allyTint(m, "#7fc2ff") : null;
        const rr = Math.max(2.4, 3.2 * (760 / cam.dist));
        c.beginPath();
        c.arc(p.x, p.y, rr, 0, 7);
        c.fillStyle = own ? "rgba(150,200,120,0.55)" : ally ? tint : "rgba(226,120,80,0.75)";
        const ga = c.globalAlpha;
        if (ally) c.globalAlpha = ga * 0.6;
        c.fill();
        c.globalAlpha = ga;
        c.lineWidth = 1;
        c.strokeStyle = own ? "rgba(190,235,160,0.75)" : ally ? tint : "rgba(255,170,120,0.95)";
        if (ally) c.setLineDash([2, 2]);
        c.stroke();
        if (ally) c.setLineDash([]);
        /* three short prongs, so it reads as a mine and not as a waypoint dot */
        c.beginPath();
        for (let k = 0; k < 3; k++) {
          const a2 = -Math.PI / 2 + k * (Math.PI * 2 / 3);
          c.moveTo(p.x + Math.cos(a2) * rr, p.y + Math.sin(a2) * rr * 0.6);
          c.lineTo(p.x + Math.cos(a2) * rr * 1.9, p.y + Math.sin(a2) * rr * 1.15);
        }
        c.stroke();
        if (!m.armed) {                       /* still settling: hollow it out */
          c.beginPath(); c.arc(p.x, p.y, rr * 0.45, 0, 7);
          c.fillStyle = "rgba(12,16,12,0.85)"; c.fill();
        }
      }
    }

    /* Acoustic barriers. The ring is the node's BASE reach - what it gets
       against a boat making way - because the true reach is a function of the
       target and cannot be drawn before there is one. The last minute of
       battery shows as a dashed ring: a barrier that has quietly stopped
       working and has not been noticed is the failure this warns about. */
    if (typeof SonarNet !== "undefined" && G.sonarnet && G.sonarnet.length) {
      for (const n of SonarNet.forRender(G, G.human)) {
        const pn = project(n.x, n.y);
        if (pn.behind || pn.x < -20 || pn.x > W + 20 || pn.y < -20 || pn.y > H + 20) continue;
        const own = n.owner === G.human;
        const pe = project(n.x + n.r * CFG.TILE, n.y);
        const rr2 = Math.max(6, Math.abs(pe.x - pn.x));
        c.save();
        c.beginPath(); c.arc(pn.x, pn.y, rr2, 0, 7);
        c.lineWidth = 1;
        if (n.life < 60) c.setLineDash([5, 5]);
        c.strokeStyle = own ? "rgba(120,255,200,0.30)" : "rgba(255,150,110,0.35)";
        c.stroke();
        c.setLineDash([]);
        c.beginPath(); c.arc(pn.x, pn.y, 3, 0, 7);
        c.fillStyle = own ? "rgba(150,235,205,0.90)" : "rgba(255,170,120,0.95)";
        c.fill();
        c.restore();
      }
    }
    /* Datums. One node in contact, so all the player is told is that something
       is near THAT NODE - the marker is drawn at the node, because the node's
       own position is the only position a range-only hydrophone knows. It
       fades over its 25 seconds and grows as it does, which is what a datum
       does: the circle of where the boat might now be gets larger. There is
       nothing here to shoot at, only somewhere to send the helicopter. */
    if (typeof SonarNet !== "undefined" && G.sonarDatums) {
      for (const dm of SonarNet.datums(G, G.human)) {
        const age = (G.time - dm.t) / 25;
        if (age >= 1) continue;
        const pd = project(dm.x, dm.y);
        if (pd.behind) continue;
        const pe2 = project(dm.x + dm.r * CFG.TILE, dm.y);
        const rr3 = Math.max(8, Math.abs(pe2.x - pd.x)) * (0.35 + age * 0.65);
        const a2 = (0.85 * (1 - age)).toFixed(2);
        c.save();
        c.beginPath(); c.arc(pd.x, pd.y, rr3, 0, 7);
        c.strokeStyle = "rgba(255,196,90," + a2 + ")";
        c.lineWidth = 1.6;
        c.stroke();
        c.fillStyle = "rgba(255,196,90," + a2 + ")";
        c.font = "10px monospace";
        c.fillText("DATUM", pd.x + rr3 + 4, pd.y + 3);
        c.restore();
      }
    }
    /* selection & health */
    for (const e of G.entities) {
      if (e.dead || e.carried) continue;
      if (!ents.has(e.id)) continue;
      const alt = e.layer === "air" ? AIR_ALT + 4 : undefined;
      /* an aircraft's marker stands over its model, at the same height as
         ever: a deck machine is drawn on a spot of her own deck, up to 25 m
         from the game's grid slot, and its ring floated beside it */
      const ar = alt !== undefined ? ents.get(e.id) : null;
      const p = ar ? project(m2gx(ar.grp.position.x), m2gx(ar.grp.position.z), alt)
                   : project(e.x, e.y, alt !== undefined ? alt : shoreAlt(e));   // a shore building's at its seat
      if (p.behind || p.x < -80 || p.x > W + 80 || p.y < -80 || p.y > H + 80) continue;
      const scale = 760 / cam.dist;
      const r = Math.max(9, e.r * scale * 0.9);
      if (e.selected) {
        /* green for ours, the ally's own colour for an ally, red for an enemy;
           the ally's ring is broken, so the side reads even when the two
           commanders picked colours a hair apart */
        const sd3 = G.side(e);
        c.strokeStyle = sd3 === "own" ? "rgba(120,255,120,0.9)"
          : sd3 === "ally" ? G.allyTint(e, "#7fc2ff") : "rgba(255,110,90,0.95)";
        c.lineWidth = 1.4;
        if (sd3 === "ally") c.setLineDash([4, 3]);
        c.beginPath(); c.ellipse(p.x, p.y + r * 0.4, r * 1.15, r * 0.5, 0, 0, 7); c.stroke();
        if (sd3 === "ally") c.setLineDash([]);
      }
      if (e.selected || e.hp < e.maxHp) {
        const w = Math.max(20, r * 2), f = e.hp / e.maxHp;
        const y = p.y - r - 8;
        c.fillStyle = "rgba(0,0,0,0.6)"; c.fillRect(p.x - w / 2, y, w, 3.6);
        c.fillStyle = f > 0.55 ? "#57c94f" : f > 0.25 ? "#d8b44a" : "#d05a45";
        c.fillRect(p.x - w / 2, y, w * f, 3.6);
      }
      if (e.vet > 0 && e.owner === G.human) {
        c.fillStyle = "#ffd76a"; c.font = "9px sans-serif"; c.textAlign = "center";
        c.fillText("^".repeat(e.vet), p.x, p.y - r - 12);
      }
      /* logistics and morale state, readable at any zoom without selecting */
      if (e.kind === "unit" && e.owner === G.human) {
        const marks = [];
        if (e.ammoMax && e.ordnanceDry && e.ordnanceDry()) marks.push(["#ff6b52", "\u25b2"]);        // dry
        else if (e.fuelMax && e.fuel < 22) marks.push(["#e8a33c", "\u25b2"]);      // low fuel
        if (e.isBroken && e.isBroken()) marks.push(["#ff8a5c", "!!"]);
        else if (e.isPinned && e.isPinned()) marks.push(["#ffcf4d", "!"]);
        if (e.stance === "counterbattery") marks.push(["#5fb0e8", "\u25c9"]);
        if (marks.length) {
          c.font = "bold 11px sans-serif"; c.textAlign = "center";
          let ox = -(marks.length - 1) * 6;
          for (const [col, gl] of marks) {
            c.fillStyle = col;
            c.fillText(gl, p.x + ox, p.y - r - (e.vet > 0 ? 21 : 12));
            ox += 12;
          }
        }
      }
      if (e.kind === "building" && e.repairing) {
        c.fillStyle = "#ffd76a"; c.font = "10px sans-serif"; c.textAlign = "center";
        c.fillText("REPAIRING", p.x, p.y - r - 18);
      }
    }
    /* floating combat text: the verdict on each hit, rising off the target.
       Outlined, because it has to stay readable over sand, water and fire. */
    for (const fx of Combat.effects) {
      if (fx.t !== "text") continue;
      const f = fx.life / fx.max;
      const p = project(fx.x, fx.y);
      if (p.behind) continue;
      const big = fx.big || 0;
      c.globalAlpha = Math.min(1, f * 2.2);
      c.font = (big ? "bold " : "") + (10 + big * 2) + "px ui-monospace, monospace";
      c.textAlign = "center";
      c.lineJoin = "round";
      c.lineWidth = 3;
      c.strokeStyle = "rgba(0,0,0,0.85)";
      const ty = p.y - (1 - f) * 30 - 22;
      c.strokeText(fx.s, p.x, ty);
      c.fillStyle = fx.c || "#fff";
      c.fillText(fx.s, p.x, ty);
      c.globalAlpha = 1;
    }

    /* the combat feed: the last few verdicts, bottom left, so the player can
       read what happened after the moment has passed */
    const log = Combat.hitLog;
    if (log && log.length) {
      c.textAlign = "left";
      c.font = "10px ui-monospace, monospace";
      c.lineJoin = "round";
      let y = H - 14;
      for (let i = log.length - 1; i >= 0; i--) {
        const L = log[i];
        const age = G.time - L.t;
        if (age > 9) continue;
        c.globalAlpha = U.clamp(1 - (age - 6) / 3, 0, 1) * 0.92;
        const line = (L.mine ? "\u25b8 " : "\u25c2 ") + L.who + " \u2192 " + L.at + "  " + L.s;
        c.lineWidth = 3; c.strokeStyle = "rgba(0,0,0,0.8)";
        c.strokeText(line, 12, y);
        c.fillStyle = L.mine ? (L.c || "#fff") : "#d8a0a0";
        c.fillText(line, 12, y);
        y -= 13;
        c.globalAlpha = 1;
      }
      c.textAlign = "center";
    }
    /* drag selection box */
    if (input.dragging && input.dragDist > 6) {
      c.strokeStyle = "rgba(140,255,140,0.8)";
      c.fillStyle = "rgba(140,255,140,0.08)";
      const x = Math.min(input.dragX0, input.mx), y = Math.min(input.dragY0, input.my);
      const w = Math.abs(input.mx - input.dragX0), h = Math.abs(input.my - input.dragY0);
      c.fillRect(x, y, w, h); c.strokeRect(x, y, w, h);
    }
    /* placement ghost */
    if (input.placing) {
      const def = BUILDINGS[input.placing];
      const wp = unproject(input.mx, input.my);
      const tx = ((wp.x / CFG.TILE) | 0) - ((def.w / 2) | 0);
      const ty = ((wp.y / CFG.TILE) | 0) - ((def.h / 2) | 0);
      input.placeTx = tx; input.placeTy = ty;
      const ok = G.canPlace(G.human, input.placing, tx, ty);
      c.strokeStyle = ok ? "rgba(110,255,110,0.9)" : "rgba(255,90,70,0.9)";
      c.fillStyle = ok ? "rgba(110,255,110,0.18)" : "rgba(255,90,70,0.2)";
      c.lineWidth = 2;
      c.beginPath();
      const corners = [[tx, ty], [tx + def.w, ty], [tx + def.w, ty + def.h], [tx, ty + def.h]];
      /* a shore building's plot is drawn level at the seat it would take and,
         where it can go, the face it would turn to the water is ruled heavier
         (shorePose) */
      const sp = def.shore ? shorePose(def, tx, ty) : null;
      const cp = corners.map(([cx2, cy2]) => project(cx2 * CFG.TILE, cy2 * CFG.TILE, sp ? sp.y : undefined));
      cp.forEach((pp, i) => { i === 0 ? c.moveTo(pp.x, pp.y) : c.lineTo(pp.x, pp.y); });
      c.closePath(); c.fill(); c.stroke();
      if (ok && sp && sp.face >= 0) {
        const a = cp[(sp.face + 1) % 4], b = cp[(sp.face + 2) % 4];
        c.lineWidth = 5;
        c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
        c.lineWidth = 2;                 // the drag box after it sets no width of its own
      }
    }
    /* attack-move cursor */
    if (input.attackMove) {
      c.strokeStyle = "rgba(255,120,90,0.9)"; c.lineWidth = 1.5;
      c.beginPath(); c.arc(input.mx, input.my, 11, 0, 7); c.stroke();
    }
    /* strategic strike reticle: show the actual lethal radius on the ground */
    if (input.launching && !input.launching.dead) {
      const sw = input.launching.def.superweapon;
      const wp = unproject(input.mx, input.my);
      const nuke = !!sw.nuke;
      const col = nuke ? "255,90,60" : "255,190,70";
      const steps = 40, pts = [];
      for (let i = 0; i <= steps; i++) {
        const a = i / steps * Math.PI * 2;
        const p = project(wp.x + Math.cos(a) * sw.aoe * CFG.TILE,
                          wp.y + Math.sin(a) * sw.aoe * CFG.TILE);
        pts.push(p);
      }
      c.strokeStyle = "rgba(" + col + ",0.95)";
      c.fillStyle = "rgba(" + col + ",0.13)";
      c.lineWidth = 2;
      c.beginPath();
      pts.forEach((p, i) => i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y));
      c.closePath(); c.fill(); c.stroke();
      c.beginPath();
      c.moveTo(input.mx - 22, input.my); c.lineTo(input.mx + 22, input.my);
      c.moveTo(input.mx, input.my - 22); c.lineTo(input.mx, input.my + 22);
      c.stroke();
      c.fillStyle = "rgba(" + col + ",1)";
      c.font = "bold 11px sans-serif"; c.textAlign = "center";
      c.fillText(sw.label + " — CLICK TO LAUNCH", input.mx, input.my - 30);
    }
    /* rally flags */
    for (const b of G.human.buildings) {
      if (!b.selected || !b.def.produces || b.dead) continue;
      /* a shore building's flag stands on the sea's surface, where its rally
         line ends (olY), not on the seabed under it */
      const p = project(b.rally.x, b.rally.y, b.def.shore ? Math.max(heightAt(b.rally.x, b.rally.y), SHORE.WATER) : undefined);
      c.strokeStyle = "#8fd05f"; c.lineWidth = 1.5;
      c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x, p.y - 16); c.stroke();
      c.fillStyle = "#8fd05f";
      c.beginPath(); c.moveTo(p.x, p.y - 16); c.lineTo(p.x + 10, p.y - 13); c.lineTo(p.x, p.y - 10);
      c.closePath(); c.fill();
    }

    drawRangeRings(c);
    drawSensorRings(c);
    drawThreat(c);
  }

  /* ---- a ring laid flat under an entity ----
     Projects the centre and two points one radius out, so the ellipse follows
     the camera's perspective instead of being a flat circle on screen. o.alt
     pins the ring to a fixed height (aircraft), otherwise it takes the terrain. */
  function groundRing(c, e, tiles, o) {
    if (!tiles) return;
    const alt = o.alt;
    const p0 = project(e.x, e.y, alt);
    const p1 = project(e.x + tiles * CFG.TILE, e.y, alt);
    const p2 = project(e.x, e.y + tiles * CFG.TILE, alt);
    if (p0.behind) return;
    const rx = Math.max(2, Math.hypot(p1.x - p0.x, p1.y - p0.y));
    const ry = Math.max(2, Math.hypot(p2.x - p0.x, p2.y - p0.y));
    const rot = Math.atan2(p1.y - p0.y, p1.x - p0.x);
    c.save();
    c.beginPath();
    c.ellipse(p0.x, p0.y, rx, ry, rot, 0, Math.PI * 2);
    if (o.fill) { c.fillStyle = o.fill; c.fill(); }
    c.strokeStyle = o.stroke; c.lineWidth = o.width || 1.6;
    c.setLineDash(o.dash || [7, 6]);
    c.stroke();
    c.restore();
    if (o.label) {
      c.save();
      c.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      c.textAlign = "center";
      c.fillStyle = o.stroke;
      c.fillText(o.label, p0.x, o.below ? p0.y + ry + 12 : p0.y - ry - 5);
      c.restore();
    }
  }

  /* ---- weapon envelopes ----
     How far the thing you just clicked can actually shoot. weaponRange() folds
     in the faction range multiplier and the optics upgrade, so this is the reach
     the platform really has rather than the rules-table figure. A hull with
     several mounts reports its longest, and names it, so the player can see the
     ring belongs to the anti-ship missile and not to the close-in gun. */
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
    /* minRange is never scaled by weaponRange() anywhere in the simulation, so
       the dead-zone ring uses the raw tile figure or it would disagree with the
       code that actually refuses the shot. */
    return { tiles, min: best.minRange || 0, name: best.name || "WEAPON" };
  }
  function drawRangeRings(c) {
    if (CFG.SHOW_RANGE_RINGS === false) return;
    const sel = (typeof UI !== "undefined") && UI.selection;
    if (!sel || !sel.length) return;
    /* Own forces only: clicking a hostile for intel drops it into the selection
       like anything else, and the player is not owed the enemy's envelope.
       Cargo and garrison keep selected set while frozen off the map, so a ring
       for them would sit on empty ground where they boarded. */
    let list = [];
    for (const e of sel) {
      if (e.dead || e.carried || e.owner !== G.human) continue;
      const env = weaponEnvelope(e);
      if (env) list.push({ e, env });
    }
    /* A forty-tank box would draw forty overlapping ellipses and say nothing,
       so past the cap it collapses to one ring per unit type. */
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
    for (const it of list) {
      /* Aircraft take their ring at cruise height, matching the altitude the
         selection marker above already uses, so the two stay concentric. */
      const alt = it.e.layer === "air" ? AIR_ALT : undefined;
      groundRing(c, it.e, it.env.tiles, {
        alt, stroke: "rgba(255,176,64,0.9)", fill: "rgba(255,150,40,0.05)",
        dash: [3, 4], width: 1.4, below: true,
        label: "RNG " + it.env.tiles.toFixed(1) + "t · " + it.env.name.toUpperCase(),
      });
      /* the hole in the middle a mortar or an ATGM cannot shoot into */
      if (it.env.min)
        groundRing(c, it.e, it.env.min,
                   { alt, stroke: "rgba(255,96,72,0.75)", dash: [2, 5], width: 1.2 });
    }
  }

  /* ---- sensor footprints ----
     Selecting a radar, an early-warning aircraft or a jammer draws what it
     actually covers. Sensors are invisible by nature, so without this the
     player is asked to invest in something whose effect they cannot see. */
  function drawSensorRings(c) {
    const sel = UI.selection;
    if (!sel || !sel.length) return;
    const ring = (e, tiles, stroke, fill, label) =>
      groundRing(c, e, tiles, { stroke, fill, label, alt: shoreAlt(e) });   // a sonar array's round its seat
    for (const e of sel) {
      if (e.dead) continue;
      const d = e.def || {};
      /* a set switched off covers nothing (G.setEmcon): its reach in grey,
         and whether it is dark or on its way back. Ours or an ally's only: a
         single enemy can be selected too, and whether ITS set is on the air
         is for our ears to say (G.esmPlot), not for its ring - drawn as if
         lit, the ring says only what the recognition manual would. */
      const emc = (G.radarDark && e.emcon && (e.owner === G.human || G.allied(e.owner, G.human)) &&
                   G.radarDark(e)) ? G.emconState(e) : null;
      if (d.radar && emc) ring(e, d.radar, "rgba(150,160,170,0.55)", null,
                               emc === "dark" ? "RADAR OFF (EMCON)"
                                              : "RELIGHTING " + Math.ceil(e.relightAt - G.time) + "s");
      else if (d.radar) {
        /* a jammed radar really is smaller: show the reach the player has */
        let r = d.radar;
        const jam = G.jamAgainst ? G.jamAgainst(e.owner, e) : 0;
        if (jam > 0.55) r = 0;
        else if (jam > 0.15) r = r * Math.max(0.15, 1 - jam);
        if (r > 0) ring(e, r, "rgba(120,200,255,0.85)", "rgba(90,170,230,0.07)",
                        jam > 0.15 ? "RADAR " + r.toFixed(0) + "t (JAMMED)"
                                   : "RADAR " + r.toFixed(0) + "t");
        else ring(e, d.radar, "rgba(255,90,70,0.75)", null, "RADAR BLINDED");
      }
      /* A jamming bubble that is still scaffolding, or that has browned out,
         is not a bubble - G.jamming() says so and the ring must agree, or a
         half-built station advertises coverage it is not providing. */
      const live = !G.jamming || G.jamming(e);
      if (d.jam) ring(e, d.jam, live ? "rgba(200,120,255,0.9)" : "rgba(140,110,160,0.55)",
                      live ? "rgba(170,90,230,0.09)" : null,
                      live ? "JAMMING " + d.jam + "t" : "JAMMING OFFLINE");
      /* satellite denial is a separate bubble on a separate axis and it is
         usually the WIDER of the two. Without this ring the KPA station shows
         the player only the number it was deliberately given for being bad at
         radar. */
      if (d.gpsJam) ring(e, d.gpsJam, live ? "rgba(255,200,90,0.9)" : "rgba(170,150,90,0.5)",
                         live ? "rgba(230,180,70,0.09)" : null,
                         live ? "GPS DENIAL " + d.gpsJam + "t" : "GPS DENIAL OFFLINE");
      if (d.sonar) ring(e, d.sonar, "rgba(120,255,200,0.7)", null, "SONAR " + d.sonar + "t");
      /* the ballistic back-plot circle, drawn so a commander can see whether
         the ground a launcher is shooting from is inside it */
      if (d.ew) ring(e, d.ew, "rgba(255,140,120,0.8)", "rgba(230,110,90,0.05)",
                     "LAUNCH BACK-PLOT " + d.ew + "t");
    }
  }

  /* ---- threat overlay: edge flash and the alert banner ---- */
  function drawThreat(c) {
    if (typeof Threat === "undefined") return;
    const f = Threat.flash;
    if (f > 0.01) {
      /* a vignette that pulses in from the edges rather than washing the screen */
      const g = c.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.30,
                                       W / 2, H / 2, Math.max(W, H) * 0.72);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, hexA(Threat.flashColor, f * 0.55));
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      /* a hard rule top and bottom, like a warning panel lighting up */
      c.fillStyle = hexA(Threat.flashColor, f * 0.9);
      c.fillRect(0, 0, W, 3); c.fillRect(0, H - 3, W, 3);
    }
    const b = Threat.banner;
    if (b) {
      const big = b.tier >= 3;
      const cx = W / 2, cy = big ? H * 0.20 : H * 0.16;
      const label = b.text;
      c.save();
      c.textAlign = "center"; c.textBaseline = "middle";
      c.font = (big ? "700 30px " : "700 21px ") +
               "ui-monospace, SFMono-Regular, Menlo, monospace";
      const wTxt = c.measureText(label).width;
      const padX = 26, hBox = big ? 62 : 46;
      /* plate */
      c.fillStyle = "rgba(8,10,12,0.82)";
      c.fillRect(cx - wTxt / 2 - padX, cy - hBox / 2, wTxt + padX * 2, hBox);
      c.strokeStyle = big ? "#ff4020" : "#ffa02c";
      c.lineWidth = big ? 2.5 : 1.5;
      c.strokeRect(cx - wTxt / 2 - padX, cy - hBox / 2, wTxt + padX * 2, hBox);
      /* hazard stripes down each side of a strategic warning */
      if (big) {
        for (let i = 0; i < 6; i++) {
          c.fillStyle = i % 2 ? "#ff4020" : "#1a1c1e";
          c.fillRect(cx - wTxt / 2 - padX + 4, cy - hBox / 2 + 5 + i * 9, 7, 8);
          c.fillRect(cx + wTxt / 2 + padX - 11, cy - hBox / 2 + 5 + i * 9, 7, 8);
        }
      }
      c.fillStyle = big ? "#ff6a4a" : "#ffbf62";
      c.fillText(label, cx, cy - (b.sub ? 9 : 0));
      if (b.sub) {
        c.font = "500 12px ui-monospace, SFMono-Regular, Menlo, monospace";
        c.fillStyle = "#c9cdd2";
        c.fillText(b.sub, cx, cy + 14);
      }
      c.restore();
    }
  }
  function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a.toFixed(3) + ")";
  }

  /* ---------------- order lines ----------------
     What render.js orderLines() lists - the player's own units' orders as
     far as each will really carry them, the rally links, a fire mission's
     landing ring, a box being mined or swept; the fog rule and the colours
     are set there, once, for both views - laid on the ground as ONE
     LineSegments: one draw call however many units, from a buffer made once
     and refilled each frame, so nothing is allocated per frame. It is drawn
     over everything (no depth test), the way StarCraft II draws its
     waypoints, so a ridge or a hangar never hides where a unit is going; a
     ground leg is still bent over the relief every 1.5 tiles so that in
     perspective it lies on the map instead of cutting through a hill. A
     flying leg runs at the cruise height the aircraft are drawn at.
     Measured at b4a9943 under jsc (tools/jsc/orderlines3d_check.js times the
     list and this fill together, median of 60 frames): 40 tanks with 13
     orders each, 520 legs and 10,400 vertices, cost 1.2 to 1.5 ms a frame,
     1.3 to 1.6 ms with Shift showing every unit, and 0.010 to 0.011 ms with
     nothing to show, with the machine at load averages of 39 to 57. One draw
     call either way. The buffer holds OLV vertices; the list puts the
     selection first, so a buffer filled by Shift over a very large army
     leaves out the rest of the army first. */
  const OLV = 16384;                           // vertices: 8,192 pieces of line
  let olObj = null, olPos = null, olCol = null, olRGB = null, olV = 0;
  function olMake() {
    const geo = new THREE.BufferGeometry();
    olPos = new THREE.BufferAttribute(new Float32Array(OLV * 3), 3);
    olCol = new THREE.BufferAttribute(new Float32Array(OLV * 3), 3);
    olPos.setUsage(THREE.DynamicDrawUsage); olCol.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("position", olPos); geo.setAttribute("color", olCol);
    geo.setDrawRange(0, 0);
    olObj = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.85,
      depthTest: false, depthWrite: false, fog: false, toneMapped: false }));
    olObj.name = "orderLines";
    olObj.frustumCulled = false;               // the box would have to be refitted every frame
    olObj.renderOrder = 999;
    olObj.visible = false;
    olRGB = Render2D.orderLines(null).colors.map(h => new THREE.Color(h).convertSRGBToLinear());
  }
  /* metres above the datum for a point of a leg: flying, or on the ground or
     the sea a metre up */
  function olY(x, y, a) { return a ? AIR_ALT : Math.max(heightAt(x, y), 0.35) + 1.0; }
  /* a rally line leaves a shore building a metre over its seat (shorePose),
     as every other leg leaves the ground it starts from; render.js starts
     it at the building's middle */
  function olFrom(x, y) {
    const bs = G.human.buildings;
    for (let i = 0; i < bs.length; i++) {
      const b = bs[i];
      if (b.def.shore && !b.dead && Math.fround(b.x) === x && Math.fround(b.y) === y)
        return shorePose(b.def, b.tx, b.ty).y + 1.0;
    }
    return undefined;
  }
  function olPut(x, y, h, c) {
    const i = olV * 3, P = olPos.array, C = olCol.array;
    P[i] = gx2m(x); P[i + 1] = h; P[i + 2] = gx2m(y);
    C[i] = c.r; C[i + 1] = c.g; C[i + 2] = c.b;
    olV++;
  }
  /* one leg, in pieces: flat through the air, over the relief on the ground,
     and eased between the two where a leg comes down to a ramp */
  function olPiece(x0, y0, a0, x1, y1, a1, c, from) {
    const len = Math.hypot(x1 - x0, y1 - y0);
    const n = a0 && a1 ? 1 : Math.min(32, Math.max(1, Math.ceil(len / 48)));
    const h0 = from !== undefined ? from : olY(x0, y0, a0), h1 = olY(x1, y1, a1), mixed = a0 !== a1;
    let px = x0, py = y0, ph = h0;
    for (let p = 1; p <= n; p++) {
      if (olV + 2 > OLV) return;
      const t = p / n, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
      const h = p === n ? h1 : mixed ? h0 + (h1 - h0) * t : olY(x, y, a0);
      olPut(px, py, ph, c); olPut(x, y, h, c);
      px = x; py = y; ph = h;
    }
  }
  function syncOrderLines(input) {
    if (!olObj) olMake();
    if (olObj.parent !== three.scene) three.scene.add(olObj);
    const L = Render2D.orderLines(G, typeof UI !== "undefined" ? UI.selection : null,
                                  !!(input && input.shift));
    olV = 0;
    const s = L.seg, m = L.mark, R = L.ring;
    const kr = L.kinds.indexOf("rally");
    for (let i = 0; i < L.n; i++) {
      const j = i * 7;
      olPiece(s[j], s[j + 1], s[j + 2], s[j + 3], s[j + 4], s[j + 5], olRGB[s[j + 6]],
              s[j + 6] === kr ? olFrom(s[j], s[j + 1]) : undefined);
    }
    /* a waypoint: a small diamond, six metres across, on the ground or at height */
    for (let i = 0; i < L.nm; i++) {
      const j = i * 4, x = m[j], y = m[j + 1], a = m[j + 2], c = olRGB[m[j + 3]], d = 5;
      olPiece(x - d, y, a, x, y - d, a, c); olPiece(x, y - d, a, x + d, y, a, c);
      olPiece(x + d, y, a, x, y + d, a, c); olPiece(x, y + d, a, x - d, y, a, c);
    }
    /* where a fire mission's rounds, or a cargo round's mines, can come
       down: 32 chords over the ground */
    for (let i = 0; i < L.nr; i++) {
      const j = i * 4, x = R[j], y = R[j + 1], r = R[j + 2], c = olRGB[R[j + 3]];
      for (let k = 0; k < 32; k++) {
        const a0 = k / 32 * Math.PI * 2, a1 = (k + 1) / 32 * Math.PI * 2;
        olPiece(x + Math.cos(a0) * r, y + Math.sin(a0) * r, 0,
                x + Math.cos(a1) * r, y + Math.sin(a1) * r, 0, c);
      }
    }
    olObj.visible = olV > 0;
    olObj.geometry.setDrawRange(0, olV);
    if (olV) {
      /* upload only what was written this frame */
      olPos.updateRange.offset = 0; olPos.updateRange.count = olV * 3; olPos.needsUpdate = true;
      olCol.updateRange.offset = 0; olCol.updateRange.count = olV * 3; olCol.needsUpdate = true;
    }
  }

  /* ---------------- main draw ---------------- */
  function draw(dt, input) {
    if (!three) return;
    texTick += dt;
    if (texTick > 6) { texTick = 0; refreshTerrainTex(); }
    syncMines();
    syncNodes();
    updateFog();
    syncEntities(dt);
    syncGhosts();
    /* damage smoke, fire and sparks, and a holed ship's list (js/damage3d.js):
       after every mesh is placed for this frame, before anything is drawn */
    if (typeof Damage3D !== "undefined") Damage3D.frame(three, G, dt, ents);
    syncEffects(dt);
    if (typeof Impact3D !== "undefined") Impact3D.frame(dt);
    cleanProjectiles();
    syncOrderLines(input);
    applyCamera();
    /* gentle water shimmer */
    if (waterMesh) waterMesh.material.opacity = 0.64 + Math.sin(G.time * 0.7) * 0.03;
    if (bloom) bloom.render(three.scene, three.camera);
    else three.renderer.render(three.scene, three.camera);
    drawOverlay(input);
  }

  /* minimap: reuse the 2D implementation state-free */
  function drawMinimap(mm) { Render2D.drawMinimapFrom(mm, G, unprojectViewQuad(), cam.yaw); }
  function unprojectViewQuad() {
    /* The minimap frustum is an indicator, not a measurement, so it uses the
       cheap sea-level intersection. Raycasting the terrain mesh four times a
       frame cost ~190ms once the mesh was refined - the whole frame budget. */
    return [unprojectFlat(0, 0), unprojectFlat(W, 0),
            unprojectFlat(W, H), unprojectFlat(0, H)];
  }

  function markDirty() { texTick = 99; }

  function panAxes() {
    /* The camera sits at target + (cos yaw, _, sin yaw)*dist looking inward, so
       forward-along-ground f = (-cos yaw, -sin yaw) and screen-right =
       cross(f, up) = (-f.z, f.x) = (sin yaw, -cos yaw).  Panning down-screen
       is -f.  (Both axes were previously negated, inverting all panning.)     */
    const cy = Math.cos(cam.yaw), sy2 = Math.sin(cam.yaw);
    return { rx: sy2, ry: -cy, fx: cy, fy: sy2 };
  }
  function rotate(d) { cam.yaw += d; }
  function entityScreen(e) {
    let alt;
    /* A parked machine is drawn down on the deck, so the point the mouse and
       the selection box test against has to be down there too - otherwise the
       aeroplane you can see on the ramp cannot be clicked, and right-clicking
       it to order a strike misses by a whole cruise altitude. */
    if (e.layer === "air") {
      const parked = e.parked || (e.order && e.order.type === "parked");
      /* ...and where it is drawn: at its feet on the pad or the deck it
         stands on - on a ship a spot of her own deck, not the slot the game
         keeps for it (seatOnDeck) - and at the model while it lifts off a
         deck or comes down to one */
      const rec = ents.get(e.id);
      if (rec && rec.foot !== undefined && (parked || rec.deckShip)) {
        const p = rec.grp.position;
        return project(m2gx(p.x), m2gx(p.z), parked ? p.y + rec.foot : p.y);
      }
      alt = parked ? undefined : AIR_ALT;
    } else if (e.layer === "sea") alt = 2;
    else if (e.layer === "sub") alt = 0;
    else alt = shoreAlt(e);                  // a shore building at its seat; anything else on the ground
    return project(e.x, e.y, alt !== undefined ? alt : undefined);
  }
  return {
    init, resize, draw, drawMinimap, unproject, moveCam, setCam, zoom, sx, sy, markDirty,
    panAxes, rotate, entityScreen,
    /* where a shore building of this id would stand on this plot: seat,
       heading and how the heading was found (tools/jsc/shore3d_check.js) */
    shorePose(id, tx, ty) { return shorePose(BUILDINGS[id], tx, ty); },
    /* a drawn launcher's pod-laying rule and launch origin, called on its own
       record, so tools/jsc/launcher3d_check.js can time what they cost */
    launcherProbe(e) {
      const rec = ents.get(e.id);
      if (!rec || !rec.elev) return null;
      return { pose: (dt) => poseLauncher(e, rec, dt), launch: (p) => launchOffset(p, 0, 0, 0) };
    },
    get cam() { return cam; },
    get three() { return three; },
  };
})();
