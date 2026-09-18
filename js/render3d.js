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

    cam.x = G.human.homeX; cam.y = G.human.homeY; cam.dist = 430;
    resize();
    ents.clear(); modelCache = {};
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
  const SPIN_UP = new THREE.Vector3(0, 1, 0);
  const SPIN_ACROSS = new THREE.Vector3();
  const SPIN_Q = new THREE.Quaternion();

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
        /* leave painted markings, glass and bright metal alone */
        if (hsl.s < 0.45 && hsl.l > 0.08) {
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

  /* the roof slab, not the tip of whatever mast the building already carries:
     take the tallest part that is actually broad enough to stand on */
  function roofHeightOf(model, w, d) {
    const minSpan = Math.min(w, d) * 0.25;
    const bb = new THREE.Box3(), sz = new THREE.Vector3();
    let roof = 0, any = false;
    model.traverse(o => {
      if (!o.isMesh || !o.geometry) return;
      bb.setFromObject(o); bb.getSize(sz);
      if (sz.x < minSpan || sz.z < minSpan) return;   /* a mast or a railing */
      if (bb.max.y > roof) { roof = bb.max.y; any = true; }
    });
    if (!any) { bb.setFromObject(model); roof = bb.max.y * 0.6; }
    return roof;
  }

  /* the rooftop kit that dates the building at a glance */
  function eraFixture(E, def) {
    if (!E || !E.fixture) return null;
    const g = new THREE.Group();
    const w = def.w * TILE_M, d = def.h * TILE_M;
    /* rooftop kit is sized to a plausible real fixture, not to the footprint */
    const m = Math.min(w, d, 13);
    const brick = new THREE.MeshStandardMaterial({ color: 0x8d5a44, roughness: 0.98 });
    const steel = new THREE.MeshStandardMaterial({ color: 0x9aa0a4, roughness: 0.5, metalness: 0.7 });
    const drab  = new THREE.MeshStandardMaterial({ color: 0x5a6046, roughness: 0.95 });
    const pale  = new THREE.MeshStandardMaterial({ color: 0xdfe4e6, roughness: 0.6 });

    if (E.fixture === "chimney") {
      /* a brick stack and a single whip: nothing here is electronic yet */
      const st = new THREE.Mesh(new THREE.BoxGeometry(m * 0.11, m * 0.42, m * 0.11), brick);
      st.position.set(-w * 0.28, m * 0.21, d * 0.24);
      g.add(st);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(m * 0.15, m * 0.04, m * 0.15), brick);
      cap.position.set(-w * 0.28, m * 0.44, d * 0.24);
      g.add(cap);
      const whip = new THREE.Mesh(new THREE.CylinderGeometry(m * 0.006, m * 0.01, m * 0.5, 5), steel);
      whip.position.set(w * 0.30, m * 0.25, -d * 0.22);
      g.add(whip);
    } else if (E.fixture === "lattice") {
      /* a guyed lattice mast, the signature of a 1960s installation */
      for (let i = 0; i < 3; i++) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(m * 0.012, m * 0.012, m * 0.62, 4), steel);
        const a = i * Math.PI * 2 / 3;
        leg.position.set(w * 0.24 + Math.cos(a) * m * 0.045, m * 0.31,
                         -d * 0.20 + Math.sin(a) * m * 0.045);
        g.add(leg);
      }
      for (let r = 1; r <= 3; r++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(m * 0.048, m * 0.006, 4, 9), steel);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(w * 0.24, m * 0.14 * r, -d * 0.20);
        g.add(ring);
      }
    } else if (E.fixture === "netting") {
      /* camouflage netting stretched over the roof on short poles */
      const net = new THREE.Mesh(new THREE.BoxGeometry(w * 0.82, m * 0.02, d * 0.82),
        new THREE.MeshStandardMaterial({ color: 0x5f6a44, roughness: 1, transparent: true, opacity: 0.62 }));
      net.position.y = m * 0.30;
      g.add(net);
      for (let sx = -1; sx <= 1; sx += 2) for (let sz = -1; sz <= 1; sz += 2) {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(m * 0.012, m * 0.012, m * 0.30, 5), drab);
        pole.position.set(sx * w * 0.36, m * 0.15, sz * d * 0.36);
        g.add(pole);
      }
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(m * 0.01, m * 0.016, m * 0.44, 6), steel);
      mast.position.set(w * 0.22, m * 0.52, -d * 0.20);
      g.add(mast);
    } else if (E.fixture === "dish") {
      /* a satellite dish on a pedestal: the 1990s roofline */
      const ped = new THREE.Mesh(new THREE.CylinderGeometry(m * 0.05, m * 0.07, m * 0.16, 8), pale);
      ped.position.set(w * 0.24, m * 0.08, -d * 0.22);
      g.add(ped);
      const prof = [];
      for (let q = 0; q <= 10; q++) {
        const rr = (q / 10) * m * 0.17;
        prof.push(new THREE.Vector2(Math.max(0.001, rr), (rr * rr) / (m * 0.42)));
      }
      const dm = new THREE.MeshStandardMaterial({ color: 0xe4e8ea, roughness: 0.6 });
      dm.side = THREE.DoubleSide;
      const dish = new THREE.Mesh(new THREE.LatheGeometry(prof, 16), dm);
      dish.rotation.z = -0.85;
      dish.position.set(w * 0.24, m * 0.24, -d * 0.22);
      g.add(dish);
    } else if (E.fixture === "array") {
      /* a flat phased-array face and a squat modern radome */
      const face = new THREE.Mesh(new THREE.BoxGeometry(m * 0.03, m * 0.24, m * 0.30), pale);
      face.position.set(w * 0.26, m * 0.16, -d * 0.20);
      face.rotation.z = 0.22;
      g.add(face);
      const rad = new THREE.Mesh(new THREE.SphereGeometry(m * 0.09, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({ color: 0xeef1f3, roughness: 0.55 }));
      rad.position.set(-w * 0.24, m * 0.03, d * 0.22);
      g.add(rad);
    }
    return g.children.length ? g : null;
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
           hazard stripes, glass and metals alone */
        if (hsl.s < 0.22 && hsl.l > 0.12 && hsl.l < 0.82) {
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
  function archFixture(A, def, team) {
    const g = new THREE.Group();
    const trim = new THREE.MeshStandardMaterial({ color: A.trim, roughness: 0.5, metalness: 0.25 });
    const metal = new THREE.MeshStandardMaterial({ color: 0xb8bec4, roughness: 0.35, metalness: 0.8 });
    const acc = new THREE.MeshStandardMaterial({ color: A.accent, roughness: 0.6 });
    const w = def.w * TILE_M, d = def.h * TILE_M;
    if (A.style === "nato") {
      /* white radome + slim antenna mast: expeditionary, sensor-heavy */
      const dome = new THREE.Mesh(new THREE.SphereGeometry(Math.min(w, d) * 0.13, 14, 10,
        0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xe8ecef, roughness: 0.55 }));
      dome.position.set(w * 0.26, 0, -d * 0.26);
      g.add(dome);
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, Math.min(w, d) * 0.42, 6), metal);
      mast.position.set(-w * 0.28, mast.geometry.parameters.height / 2, d * 0.22);
      g.add(mast);
      for (let i = 0; i < 3; i++) {
        const yagi = new THREE.Mesh(new THREE.BoxGeometry(Math.min(w, d) * 0.11, 0.2, 0.2), metal);
        yagi.position.set(-w * 0.28, Math.min(w, d) * 0.2 + i * 1.6, d * 0.22);
        g.add(yagi);
      }
    } else if (A.style === "pact") {
      /* brutalist stack + banner board: heavy industry aesthetic */
      const stack = new THREE.Mesh(new THREE.CylinderGeometry(Math.min(w, d) * 0.09,
        Math.min(w, d) * 0.11, Math.min(w, d) * 0.55, 10), acc);
      stack.position.set(w * 0.28, stack.geometry.parameters.height / 2, -d * 0.24);
      g.add(stack);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(Math.min(w, d) * 0.095,
        Math.min(w, d) * 0.095, 1.1, 10), trim);
      band.position.set(w * 0.28, Math.min(w, d) * 0.46, -d * 0.24);
      g.add(band);
      const board = new THREE.Mesh(new THREE.BoxGeometry(w * 0.34, Math.min(w, d) * 0.16, 0.4), trim);
      board.position.set(-w * 0.2, Math.min(w, d) * 0.12, d * 0.3);
      g.add(board);
    } else {
      /* PLA: tiered eave band + paired mast, tile-red accent */
      const eave = new THREE.Mesh(new THREE.BoxGeometry(w * 0.72, 0.9, d * 0.72), acc);
      eave.position.y = 0.45;
      g.add(eave);
      const eave2 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.52, 0.8, d * 0.52), trim);
      eave2.position.y = 1.4;
      g.add(eave2);
      for (const sgn of [-1, 1]) {
        const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, Math.min(w, d) * 0.34, 6), metal);
        mast.position.set(sgn * w * 0.26, mast.geometry.parameters.height / 2 + 1.4, -d * 0.24);
        g.add(mast);
      }
    }
    g.traverse(o => {
      if (!o.isMesh) return;
      o.castShadow = true; o.receiveShadow = true;
      if (o.material && o.material.color && !o.material.userData._srgbDone) {
        o.material.userData._srgbDone = true;
        o.material.color.convertSRGBToLinear();
      }
    });
    return g;
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
      /* faction rooftop fixture */
      if (def.cat !== "defense" && def.id !== "wall" && !def.bare) {
        const fx = archFixture(A0, def, team);
        fx.position.y = hM;
        tpl.add(fx);
      }
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
      eraRestyle(tpl, E);
      const ef0 = def.bare ? null : eraFixture(E, def);
      if (ef0) { ef0.position.y = roofHeightOf(tpl, def.w * TILE_M, def.h * TILE_M); tpl.add(ef0); }
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
       colour, archFixture() bolts a white radome and a yagi mast onto the top
       of a PAVE PAWS, and eraFixture() at e80 drapes a camouflage net sized to
       the plot - 49 metres square on a 3x3 - straight across the array faces.
       A national early-warning array is the same Raytheon concrete for
       everybody who bought one. */
    if (def.cat !== "defense" && !def.bare) restyle(tpl, A);
    const wrap = new THREE.Group();
    tpl.rotation.x = -Math.PI / 2;
    wrap.add(tpl);
    const bb = new THREE.Box3().setFromObject(wrap);
    if (def.cat !== "defense" && def.id !== "wall" && !def.bare) {
      const fx = archFixture(A, def, team);
      fx.position.y = Math.max(1, bb.max.y);
      wrap.add(fx);
    } else if (def.cat === "defense" && typeof BLD_MODELS !== "undefined" &&
               BLD_MODELS["def_" + def.id]) {
      /* emplacements ship without their gun: the engine mounts the rotating
         weapon on top so it can slew toward targets */
      try {
        const mnt = BLD_MODELS["def_" + def.id].build(THREE, Models3D, { team: team.main });
        prepModel(mnt);
        const mw = new THREE.Group();
        mnt.rotation.x = -Math.PI / 2;
        mw.add(mnt);
        mw.name = "mountwrap";
        mw.position.y = Math.max(0.5, bb.max.y);
        wrap.add(mw);
      } catch (e) {}
    }
    /* period materials and rooftop kit, layered over the faction styling */
    eraRestyle(wrap, E);
    const ef = def.bare ? null : eraFixture(E, def);
    if (ef) {
      ef.position.y = Math.max(0.5, roofHeightOf(wrap, def.w * TILE_M, def.h * TILE_M));
      ef.traverse(o => {
        if (o.material && o.material.color && !o.material.userData._srgbDone) {
          o.material.userData._srgbDone = true;
          o.material.color.convertSRGBToLinear();
        }
      });
      wrap.add(ef);
    }
    wrap.scale.multiplyScalar(CFG.BLD_SCALE);
    modelCache[ck] = wrap;
    return wrap;
  }

  /* ---------------- entity sync ---------------- */
  let lastEraKey = "";
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
          gear: findPart(inst, "gear"),
          kind: e.kind,
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
        my = heightAt(e.x, e.y);
        rec.grp.position.set(gx2m((e.tx + e.def.w / 2) * CFG.TILE), my, gx2m((e.ty + e.def.h / 2) * CFG.TILE));
        const pr = e.buildProgress;
        rec.grp.scale.y = 0.15 + 0.85 * pr;
        if (rec.turret) rec.turret.rotation.z = -(e.tang || 0);
        const mw = findPart(rec.inst, "mountwrap");
        if (mw) mw.rotation.z = -(e.tang || 0);
      } else {
        if (e.layer === "air") {
          /* Aircraft altitude used to be recomputed from scratch every frame,
             so the instant an order changed a machine TELEPORTED between the
             deck and cruise height. A helicopter launching off a destroyer
             simply appeared in the air. Ease toward the target instead, and
             climb faster than you descend, the way an aircraft does. */
          const ground = heightAt(e.x, e.y);
          const onDeck = e.parked || (e.order && e.order.type === "parked");
          const landing = e.order && (e.order.type === "rtb" || e.order.type === "land") && !e.moving;
          const want = onDeck ? ground + 1.2
                     : landing ? ground + 4
                     : Math.max(ground + 6, AIR_ALT);
          if (rec.alt === undefined) rec.alt = want;      // spawns at its real height
          const rate = (want > rec.alt ? 26 : 17) * dt;   // metres a second
          rec.alt += U.clamp(want - rec.alt, -rate, rate);
          my = rec.alt;
        } else if (e.layer === "sea" || e.layer === "sub") {
          my = 0.35;
          if (e.layer === "sub") my = -1.2;
        } else {
          my = heightAt(e.x, e.y);
        }
        rec.grp.position.set(mx, my, mz);
        /* YXZ so the three angles are intrinsic: heading first, then pitch
           about the vehicle's OWN lateral axis and roll about its own
           fore-and-aft axis. With the default XYZ order a pitched, turning
           tank tips about the world axes and looks like it is sliding on ice. */
        rec.grp.rotation.order = "YXZ";
        rec.grp.rotation.y = -e.ang;
        if (e.layer === "sea") {
          rec.grp.rotation.z = Math.sin(G.time * 0.8 + e.id) * 0.012;
          rec.grp.rotation.x = Math.sin(G.time * 0.6 + e.id * 2) * 0.008;
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
        if (e.cooldowns && e.cooldowns.length) {
          let mx2 = 0;
          for (let ci = 0; ci < e.cooldowns.length; ci++)
            if (e.cooldowns[ci] > mx2) mx2 = e.cooldowns[ci];
          if (rec.lastCd !== undefined && mx2 > rec.lastCd + 0.05) {
            const w0 = (e.def.weapons && WEAPONS[e.def.weapons[0]]) || null;
            const heft = w0 ? U.clamp((w0.dmg || 60) / 900, 0.05, 1) : 0.2;
            rec.kick = 0.045 * heft;                    // radians of nose-up
            rec.recoil = 0.34 * heft;                   // metres the barrel goes back
          }
          rec.lastCd = mx2;
        }
        if (rec.kick) rec.kick += (0 - rec.kick) * Math.min(1, dt * 7);
        if (rec.recoil) {
          rec.recoil += (0 - rec.recoil) * Math.min(1, dt * 9);
          if (rec.turret) rec.turret.position.x = (rec.turretX || 0) - rec.recoil;
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
        /* Spin the discs about WORLD axes rather than the part's local ones.
           The models in the pack were authored to two different conventions,
           so a fixed local axis span the hand-built Apache's main rotor about
           a horizontal line — it windmilled on its side — while the
           parametric machines span correctly. Deriving the axis from the
           aircraft itself is right for both, whatever frame it was drawn in. */
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
        if (rec.rotor && rec.rpm > 0.001) rec.rotor.rotateOnWorldAxis(SPIN_UP, dt * 28 * rec.rpm);
        if (rec.tailrotor) {
          /* a tail rotor turns about the shaft that runs across the machine */
  SPIN_ACROSS.set(0, 0, 1).applyQuaternion(rec.grp.getWorldQuaternion(SPIN_Q));
          rec.tailrotor.rotateOnWorldAxis(SPIN_ACROSS, dt * 40 * (rec.rpm === undefined ? 1 : rec.rpm));
        }
        /* ship wakes */
        if (e.layer === "sea" && e.moving && Math.random() < 0.3) {
          spawnWake(mx - Math.cos(e.ang) * gx2m(e.r), mz - Math.sin(e.ang) * gx2m(e.r));
        }
      }
    }
    for (const [id, rec] of ents) {
      if (!seen.has(id)) { three.scene.remove(rec.grp); ents.delete(id); }
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

  function syncEffects(dt) {
    /* ---- projectiles: real ordnance, oriented along its flight path ---- */
    for (const p of Combat.projectiles) {
      if (!p._m3) {
        try { p._m3 = FX3D.create(THREE, p); } catch (e) { p._m3 = null; }
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
      if (vx || vy || vz) FX3D.orient(p._m3, vx, vy, vz, dt, G.time);

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
        three.scene.add(tur); fxMeshes.push(tur);
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
        /* strike sparks where it lands */
        const sp = new THREE.Mesh(new THREE.SphereGeometry(0.4, 6, 5), fxMaterial(0xffd9a0, 0.9));
        sp.position.set(gx2m(fx.x2), heightAt(fx.x2, fx.y2) + 1.6, gx2m(fx.y2));
        sp.userData = { life: 0.16, max: 0.16, grow: 2.2, kind: "spark" };
        three.scene.add(sp); fxMeshes.push(sp);
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
      if (m.userData.life <= 0) { three.scene.remove(m); fxMeshes.splice(i, 1); continue; }
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
        const own = m.owner === G.human;
        const rr = Math.max(2.4, 3.2 * (760 / cam.dist));
        c.beginPath();
        c.arc(p.x, p.y, rr, 0, 7);
        c.fillStyle = own ? "rgba(150,200,120,0.55)" : "rgba(226,120,80,0.75)";
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = own ? "rgba(190,235,160,0.75)" : "rgba(255,170,120,0.95)";
        c.stroke();
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
      const p = project(e.x, e.y, alt !== undefined ? alt : undefined);
      if (p.behind || p.x < -80 || p.x > W + 80 || p.y < -80 || p.y > H + 80) continue;
      const scale = 760 / cam.dist;
      const r = Math.max(9, e.r * scale * 0.9);
      if (e.selected) {
        c.strokeStyle = e.owner === G.human ? "rgba(120,255,120,0.9)" : "rgba(255,110,90,0.95)";
        c.lineWidth = 1.4;
        c.beginPath(); c.ellipse(p.x, p.y + r * 0.4, r * 1.15, r * 0.5, 0, 0, 7); c.stroke();
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
      corners.forEach(([cx2, cy2], i) => {
        const pp = project(cx2 * CFG.TILE, cy2 * CFG.TILE);
        i === 0 ? c.moveTo(pp.x, pp.y) : c.lineTo(pp.x, pp.y);
      });
      c.closePath(); c.fill(); c.stroke();
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
      const p = project(b.rally.x, b.rally.y);
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
      groundRing(c, e, tiles, { stroke, fill, label });
    for (const e of sel) {
      if (e.dead) continue;
      const d = e.def || {};
      if (d.radar) {
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

  /* ---------------- main draw ---------------- */
  function draw(dt, input) {
    if (!three) return;
    texTick += dt;
    if (texTick > 6) { texTick = 0; refreshTerrainTex(); }
    syncMines();
    syncNodes();
    updateFog();
    syncEntities(dt);
    syncEffects(dt);
    cleanProjectiles();
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
    if (e.layer === "air")
      alt = (e.parked || (e.order && e.order.type === "parked")) ? undefined : AIR_ALT;
    else if (e.layer === "sea") alt = 2;
    else if (e.layer === "sub") alt = 0;
    else alt = undefined;
    return project(e.x, e.y, alt !== undefined ? alt : undefined);
  }
  return {
    init, resize, draw, drawMinimap, unproject, moveCam, setCam, zoom, sx, sy, markDirty,
    panAxes, rotate, entityScreen,
    get cam() { return cam; },
    get three() { return three; },
  };
})();
