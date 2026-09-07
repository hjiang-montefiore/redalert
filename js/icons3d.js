/* ============ icons3d.js — build-menu thumbnails rendered from the 3D models ============
   Spins up a small offscreen WebGL renderer, poses each model in a 3/4 view
   with studio lighting, and bakes it to an image the sidebar can blit.
   Falls back silently (returns null) when WebGL or the model is unavailable. */
var Icons3D = (function () {
  let R = null, scene = null, cam = null, key = null, holder = null;
  let cache = {};
  let failed = false;
  const W = 132, H = 88;

  function ensure() {
    if (R) return true;
    if (failed || !window.THREE) return false;
    try {
      const cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, preserveDrawingBuffer: true });
      R.setSize(W, H, false);
      R.outputEncoding = THREE.sRGBEncoding;
      R.toneMapping = THREE.ACESFilmicToneMapping;
      R.toneMappingExposure = 1.05;

      scene = new THREE.Scene();
      cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 900);

      /* studio rig: key light high-left, cool fill from the right, soft ambient */
      const kl = new THREE.DirectionalLight(0xfff2e0, 2.4);
      kl.position.set(-6, 9, 7); scene.add(kl);
      const fl = new THREE.DirectionalLight(0x9fc0e8, 0.9);
      fl.position.set(7, 3, -5); scene.add(fl);
      scene.add(new THREE.HemisphereLight(0x9db4cc, 0x2a3028, 0.75));

      /* tiny environment so metal reads as metal */
      const ec = document.createElement("canvas"); ec.width = 64; ec.height = 32;
      const g = ec.getContext("2d");
      const gr = g.createLinearGradient(0, 0, 0, 32);
      gr.addColorStop(0, "#cfdcea"); gr.addColorStop(0.55, "#8fa2b4"); gr.addColorStop(1, "#3a423a");
      g.fillStyle = gr; g.fillRect(0, 0, 64, 32);
      const et = new THREE.CanvasTexture(ec);
      et.mapping = THREE.EquirectangularReflectionMapping;
      et.encoding = THREE.sRGBEncoding;
      const pm = new THREE.PMREMGenerator(R);
      scene.environment = pm.fromEquirectangular(et).texture;

      holder = new THREE.Group();
      scene.add(holder);
      return true;
    } catch (e) { failed = true; R = null; return false; }
  }

  function prep(g) {
    g.traverse(o => {
      if (!o.isMesh) return;
      const list = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of list) {
        if (!m || !m.userData || m.userData._srgbDone) continue;
        m.userData._srgbDone = true;
        if (m.color) m.color.convertSRGBToLinear();
        if (m.emissive) m.emissive.convertSRGBToLinear();
        if (m.map) m.map.encoding = THREE.sRGBEncoding;
      }
    });
  }

  /* build the model for an item, whatever kind it is */
  function makeModel(id, kind, team) {
    const C = { team: team.main };
    if (kind === "building" || kind === "defense") {
      if (typeof BLD_MODELS !== "undefined" && BLD_MODELS[id]) return BLD_MODELS[id].build(THREE, Models3D, C);
      return null;
    }
    const def = UNITS[id];
    if (!def) return null;
    let mk = def.cat === "infantry" ? "inf_" + def.role : id;
    if (typeof UNIT_MODELS === "undefined" || !UNIT_MODELS[mk]) {
      /* same-role stand-in, matching category, so new factions still get art */
      const peers = (typeof ROLES !== "undefined" && ROLES[def.role]) || [];
      mk = null;
      for (const pid of peers) {
        const p = UNITS[pid];
        if (!p || p.cat !== def.cat) continue;
        const k = p.cat === "infantry" ? "inf_" + p.role : pid;
        if (typeof UNIT_MODELS !== "undefined" && UNIT_MODELS[k]) { mk = k; break; }
      }
    }
    if (mk && typeof UNIT_MODELS !== "undefined" && UNIT_MODELS[mk])
      return UNIT_MODELS[mk].build(THREE, Models3D, C);
    if (id === "fighter_n" && typeof Models3D !== "undefined" && Models3D.buildF16)
      return Models3D.buildF16(THREE, { teamColor: team.main, gear: false });
    return null;
  }

  /* returns an HTMLCanvasElement thumbnail, or null if it cannot be made */
  function get(id, kind, team) {
    const ck = id + "|" + kind + "|" + team.main;
    if (cache[ck] !== undefined) return cache[ck];
    if (!ensure()) { cache[ck] = null; return null; }

    let model = null;
    try { model = makeModel(id, kind, team); } catch (e) { model = null; }
    if (!model) { cache[ck] = null; return null; }

    prep(model);
    model.rotation.x = -Math.PI / 2;          // model +Z up -> three +Y up
    holder.add(model);

    /* frame it: fit the bounding sphere to the camera */
    const box = new THREE.Box3().setFromObject(model);
    const sph = box.getBoundingSphere(new THREE.Sphere());
    const c = sph.center, rad = Math.max(0.4, sph.radius);
    /* 3/4 view from front-left-above, matching the key light */
    const dir = new THREE.Vector3(0.95, 0.62, 0.78).normalize();
    const dist = rad / Math.sin((cam.fov * Math.PI / 180) / 2) * 0.82;
    cam.position.copy(dir).multiplyScalar(dist).add(c);
    cam.near = Math.max(0.05, dist - rad * 3);
    cam.far = dist + rad * 4;
    cam.updateProjectionMatrix();
    cam.lookAt(c);

    R.render(scene, cam);
    const out = document.createElement("canvas");
    out.width = W; out.height = H;
    out.getContext("2d").drawImage(R.domElement, 0, 0);

    holder.remove(model);
    cache[ck] = out;
    return out;
  }

  function clear() { cache = {}; }
  return { get, clear };
})();
