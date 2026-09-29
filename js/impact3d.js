/* ============ impact3d.js - the moment of a hit, and what a kill leaves ============
   (owner) "i don't see damaged effect so far."

   MEASURED at d9701f9, before this file, with tools/jsc/scene3d.py (the real
   WebGLRenderer over a context that draws nothing; fog off; camera on each
   fight):
   - every impact drew the same orange ball whatever it struck, and a hitscan
     round added a pale sphere at the end of its tracer. Nothing told steel
     from concrete from earth from water, or a round that bounced from one
     that went in.
   - a destroyed tank left NOTHING in 3D. Top-level scene objects within 8 m
     of four kills: 5-11 at +0.05 s, 0-2 at +2 s, 0 at +5 s - although
     combat.js keeps a 45 s "wreck" event that only the 2D view ever drew.
     Two corvettes, two helicopters and a power plant the same: 0 by +2..5 s.
   - every effect mesh allocated its own geometry and none was disposed. Ten
     minutes of battle in front of the camera left the renderer holding
     +12,310 geometries (1,117 -> 13,427), climbing ~1,200 a minute.

   What happens now.
   HITS. combat.js names the surface a round struck and, when resolveArmor
   judged it, the verdict (a "hit" event). This draws what that surface does
   when a round arrives: steel throws sparks and a flash - a white-hot one
   when the penetrator goes in, a tracer-bright streak skipping off when it
   bounces; concrete dusts and chips; earth kicks up; water spouts; a rifle
   round on a man is a small puff of dust and nothing more.
   KILLS. The model the player was looking at is kept: render3d's entity sync
   hands the dying entity's group over instead of dropping it, and it becomes
   what is left - a charred hulk that burns, smoulders and is gone on the
   45 s the 2D wreck lives; an airframe that falls trailing fire and smoke
   and burns where it hits; a ship that lists, goes down by the head or the
   stern and leaves burning oil; a submarine's bubbles and slick; a structure
   that slumps into its own dust and burns as rubble. A Soviet-pattern tank
   that loses its carousel throws its OWN turret.

   FOG. Nothing here is drawn for a spot the player cannot see now (G.fog 2).
   A kill leaves a wreck only if its model was on screen when it died - the
   hand-over is the proof - and a structure only if its tile is in sight, not
   merely remembered. A hulk the player saw stays drawn like a remembered
   building; its fire and smoke are emitted only while the spot is in view.
   render3d holds its own fireball and the carousel's stand-in turret to the
   same rule: before, a catastrophic kill in fog still threw an opaque box
   that stood out even over unexplored ground (measured: 1 stand-in turret
   and 6 fireball, jet and smoke meshes within 30 m of the kill, on explored
   and on unexplored fog alike).

   PERFORMANCE. Every particle and spark lives in two Points clouds and one
   LineSegments with fixed typed arrays: three draw calls whatever is burning,
   nothing allocated per frame, a full cloud drops new particles rather than
   growing. Wrecks reuse the dying model's own geometry; the charred look is
   one cached material per source material, shared by every wreck of that
   model. Caps on every kind of remains; the oldest goes first.        */
var Impact3D = (function () {
  "use strict";
  let THREE = null, three = null, G = null, H = null, ready = false;

  /* ---- budgets ---- */
  const CAP_GLOW = 1536, CAP_SMOKE = 3072, CAP_LINE = 384;
  const CAP = { hulk: 20, crash: 6, ditch: 6, ship: 6, sub: 4, rubble: 12, body: 24 };
  /* a vehicle hulk, seconds from the kill; its life is the 45 s of the 2D wreck */
  const V_BURN = 14, V_SMOULDER = 32, SINK = 6;
  /* rubble lives 60 s: a structure's contents burn longer than a hull's */
  const B_BURN = 26, B_SMOULDER = 48;
  const GRAV = 9.8;
  const SLICKS = 8;

  let glow = null, smoke = null, lines = null;
  let P = null, L = null, softTex = null, slickGeo = null;
  const slick = [];
  const recs = [];
  const orphans = new Map();
  /* models claimed this frame: the killing round's own hit event is read
     after the death it caused (kill() pushes first), and still needs to
     find the hull it struck */
  const claimed = new Map();
  const charCache = new Map();
  let charFallback = null, SOOT = null;
  let effArr = null, lastT = -1, tossAt = null, curFloor = -1e9;
  const wind = { x: 1.3, z: 0.45 };
  const stat = { hits: 0, hitsShown: 0, deaths: 0, deathsShown: 0, dropped: 0, released: 0, capped: 0 };
  let _frustum = null, _m4 = null, _sphere = null, _box = null, _q = null, _v = null;

  function R(a, b) { return a + Math.random() * (b - a); }
  function budget() { const g = CFG.gfx(); return g && g.sparks !== undefined ? g.sparks : 12; }
  /* CFG.GFX "sparks" is "impact particle budget per event": 0, 6, 12, 22 */
  function quality() { return U.clamp(budget() / 12, 0.35, 1.6); }

  /* ---------------------------------------------------------------- setup */
  function lin(hex, k) {
    const c = new THREE.Color(hex).convertSRGBToLinear();
    return [c.r * k, c.g * k, c.b * k];
  }
  /* A preset is a particle's whole life: [min, max] ranges are drawn once at
     birth. grav > 0 falls, grav < 0 is buoyant (hot gas); wind is how much
     of the breeze it rides. Colours are linear, and an additive colour above
     1 is meant to bloom. */
  function buildPresets() {
    /* a fuel and ammunition fire burns orange, not white: the white is kept
       for the penetration flash, which is the hottest thing on the field */
    const FIRE0 = lin(0xffb04c, 1.7), FIRE1 = lin(0xff4a10, 0.9);
    P = {
      flash:   { life: [0.07, 0.11], s0: [1, 1], s1: [1.5, 1.5], a: 1, fin: 0, c0: lin(0xfff4d8, 3.2), c1: lin(0xffa040, 1.2), grav: 0, drag: 0, wind: 0, bounce: 0 },
      core:    { life: [0.05, 0.08], s0: [0.6, 0.6], s1: [0.8, 0.8], a: 1, fin: 0, c0: lin(0xffffff, 6.0), c1: lin(0xfff0d0, 3), grav: 0, drag: 0, wind: 0, bounce: 0 },
      fire:    { life: [0.5, 0.9], s0: [1.0, 1.7], s1: [0.3, 0.6], a: 0.85, fin: 0.15, c0: FIRE0, c1: FIRE1, grav: -5, drag: 1.6, wind: 0.5, bounce: 0 },
      fireball:{ life: [0.45, 0.8], s0: [3, 5], s1: [7, 11], a: 0.9, fin: 0.04, c0: lin(0xffe8b0, 2.4), c1: FIRE1, grav: -6, drag: 1.4, wind: 0.3, bounce: 0 },
      ember:   { life: [0.8, 1.6], s0: [0.25, 0.4], s1: [0.1, 0.15], a: 1, fin: 0, c0: lin(0xffa040, 2.2), c1: lin(0xff5010, 1), grav: -1.2, drag: 0.8, wind: 1, bounce: 0 },
      smokeB:  { life: [3.5, 5.5], s0: [1.6, 2.6], s1: [7, 11], a: 0.55, fin: 0.08, c0: lin(0x1c1a18, 1), c1: lin(0x3a3633, 1), grav: -2.6, drag: 0.6, wind: 1, bounce: 0 },
      smokeG:  { life: [3, 5], s0: [1, 1.6], s1: [4.5, 7], a: 0.32, fin: 0.12, c0: lin(0x5d5852, 1), c1: lin(0x8c8781, 1), grav: -1.8, drag: 0.6, wind: 1, bounce: 0 },
      flak:    { life: [1.4, 2.2], s0: [1.2, 1.8], s1: [3.5, 5], a: 0.6, fin: 0.03, c0: lin(0x161412, 1), c1: lin(0x3a3633, 1), grav: -0.3, drag: 1.5, wind: 1, bounce: 0 },
      puff:    { life: [0.6, 1.0], s0: [0.4, 0.7], s1: [1.4, 2.4], a: 0.5, fin: 0.05, c0: lin(0x8a785e, 1), c1: lin(0xa29278, 1), grav: -0.3, drag: 2.2, wind: 0.4, bounce: 0 },
      dustS:   { life: [1.0, 1.6], s0: [1, 1.6], s1: [3.5, 5.5], a: 0.5, fin: 0.05, c0: lin(0x9d968b, 1), c1: lin(0xb9b2a6, 1), grav: -0.4, drag: 1.8, wind: 0.5, bounce: 0 },
      dustB:   { life: [5, 8], s0: [5, 8], s1: [14, 22], a: 0.55, fin: 0.05, c0: lin(0x8f877b, 1), c1: lin(0xa89f92, 1), grav: -0.6, drag: 0.9, wind: 0.8, bounce: 0 },
      chips:   { life: [0.6, 1.0], s0: [0.25, 0.4], s1: [0.2, 0.3], a: 0.95, fin: 0, c0: lin(0x3a3632, 1), c1: lin(0x3a3632, 1), grav: 14, drag: 0.3, wind: 0, bounce: 1 },
      debris:  { life: [1.0, 1.8], s0: [0.4, 0.8], s1: [0.3, 0.6], a: 1, fin: 0, c0: lin(0x24211e, 1), c1: lin(0x24211e, 1), grav: 13.7, drag: 0.2, wind: 0, bounce: 1 },
      dirt:    { life: [0.7, 1.1], s0: [0.35, 0.7], s1: [0.25, 0.5], a: 0.9, fin: 0, c0: lin(0x5a4834, 1), c1: lin(0x6e5a44, 1), grav: 14, drag: 0.4, wind: 0, bounce: 1 },
      spray:   { life: [0.6, 1.0], s0: [0.4, 0.8], s1: [0.9, 1.4], a: 0.8, fin: 0, c0: lin(0xeef6fa, 1), c1: lin(0xcfe2ec, 1), grav: 12, drag: 0.5, wind: 0.2, bounce: 0 },
      foam:    { life: [1.2, 2.2], s0: [1, 2], s1: [4, 6], a: 0.45, fin: 0.05, c0: lin(0xeef6fa, 1), c1: lin(0xd4e4ec, 1), grav: 0, drag: 2.5, wind: 0.1, bounce: 0 },
      bubble:  { life: [0.6, 1.2], s0: [0.3, 0.6], s1: [0.8, 1.3], a: 0.7, fin: 0.1, c0: lin(0xf2f8fb, 1), c1: lin(0xdbe8ef, 1), grav: 0, drag: 3, wind: 0, bounce: 0 },
    };
    L = {
      spark: { life: [0.18, 0.35], tail: 0.035, c: lin(0xffd27a, 2.4), grav: GRAV, bounce: 1 },
      rico:  { life: [0.35, 0.5], tail: 0.05, c: lin(0xfff0c0, 3.4), grav: 4, bounce: 0 },
    };
  }

  function softTexture() {
    if (softTex) return softTex;
    const cv = document.createElement("canvas");
    cv.width = cv.height = 64;
    const c = cv.getContext("2d");
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0.00, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.75)");
    g.addColorStop(0.70, "rgba(255,255,255,0.22)");
    g.addColorStop(1.00, "rgba(255,255,255,0)");
    c.fillStyle = g; c.fillRect(0, 0, 64, 64);
    softTex = new THREE.CanvasTexture(cv);
    return softTex;
  }

  /* PointsMaterial draws every point the same size. One attribute more, and
     the two lines of its shader that read `size`, make each point its own:
     three.js's own colour, fog, tone mapping and encoding stay untouched. The
     material's size is 1/tan(fov/2), so aSize is the particle's true width in
     metres at any distance. */
  function sizeAttr(sh) {
    sh.vertexShader = sh.vertexShader
      .replace("uniform float size;", "uniform float size;\nattribute float aSize;")
      .replace("gl_PointSize = size;", "gl_PointSize = size * aSize;");
  }

  function makePoints(cap, additive, order) {
    const s = {
      cap, n: 0, hi: 0,
      pos: new Float32Array(cap * 3), col: new Float32Array(cap * 4), siz: new Float32Array(cap),
      vel: new Float32Array(cap * 3), age: new Float32Array(cap), life: new Float32Array(cap),
      s0: new Float32Array(cap), s1: new Float32Array(cap), a0: new Float32Array(cap),
      fin: new Float32Array(cap), c0: new Float32Array(cap * 3), c1: new Float32Array(cap * 3),
      grav: new Float32Array(cap), drag: new Float32Array(cap), wnd: new Float32Array(cap),
      floor: new Float32Array(cap), bnc: new Uint8Array(cap),
      free: new Int32Array(cap), nFree: cap, obj: null, aPos: null, aCol: null, aSiz: null,
    };
    for (let i = 0; i < cap; i++) s.free[i] = cap - 1 - i;
    const geo = new THREE.BufferGeometry();
    s.aPos = new THREE.BufferAttribute(s.pos, 3).setUsage(THREE.DynamicDrawUsage);
    s.aCol = new THREE.BufferAttribute(s.col, 4).setUsage(THREE.DynamicDrawUsage);
    s.aSiz = new THREE.BufferAttribute(s.siz, 1).setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("position", s.aPos);
    geo.setAttribute("color", s.aCol);
    geo.setAttribute("aSize", s.aSiz);
    geo.setDrawRange(0, 0);
    const mat = new THREE.PointsMaterial({
      size: 1 / Math.tan((three.camera.fov || 40) * Math.PI / 360), sizeAttenuation: true,
      map: softTexture(), vertexColors: true, transparent: true, depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending });
    mat.onBeforeCompile = sizeAttr;
    s.obj = new THREE.Points(geo, mat);
    s.obj.frustumCulled = false;                 // the cloud spans the map; the GPU clips points
    s.obj.renderOrder = order;                   // after the fog layer (40)
    s.obj.name = additive ? "impact3d-glow" : "impact3d-smoke";
    return s;
  }

  function makeLines(cap) {
    const s = {
      cap, n: 0, hi: 0,
      pos: new Float32Array(cap * 6), col: new Float32Array(cap * 8),
      head: new Float32Array(cap * 3), vel: new Float32Array(cap * 3),
      age: new Float32Array(cap), life: new Float32Array(cap), tail: new Float32Array(cap),
      rgb: new Float32Array(cap * 3), grav: new Float32Array(cap), floor: new Float32Array(cap),
      bnc: new Uint8Array(cap), free: new Int32Array(cap), nFree: cap, obj: null, aPos: null, aCol: null,
    };
    for (let i = 0; i < cap; i++) s.free[i] = cap - 1 - i;
    const geo = new THREE.BufferGeometry();
    s.aPos = new THREE.BufferAttribute(s.pos, 3).setUsage(THREE.DynamicDrawUsage);
    s.aCol = new THREE.BufferAttribute(s.col, 4).setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("position", s.aPos);
    geo.setAttribute("color", s.aCol);
    geo.setDrawRange(0, 0);
    const mat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending });
    s.obj = new THREE.LineSegments(geo, mat);
    s.obj.frustumCulled = false;
    s.obj.renderOrder = 53;
    s.obj.name = "impact3d-sparks";
    return s;
  }

  function makeSlicks() {
    slickGeo = new THREE.CircleGeometry(1, 28);
    for (let i = 0; i < SLICKS; i++) {
      /* each slick owns its material, made once here: it has its own opacity */
      const m = new THREE.Mesh(slickGeo, new THREE.MeshBasicMaterial({
        map: softTexture(), color: new THREE.Color(0x100d0a).convertSRGBToLinear(),
        transparent: true, opacity: 0, depthWrite: false }));
      m.rotation.x = -Math.PI / 2;
      m.renderOrder = 41;
      m.visible = false;
      m.name = "impact3d-slick";
      m.userData.busy = false;
      three.scene.add(m);
      slick.push(m);
    }
  }

  function dispose() {
    for (const s of [glow, smoke, lines]) {
      if (!s) continue;
      if (s.obj.parent) s.obj.parent.remove(s.obj);
      s.obj.geometry.dispose(); s.obj.material.dispose();
    }
    glow = smoke = lines = null;
    for (const m of slick) { if (m.parent) m.parent.remove(m); m.material.dispose(); }
    slick.length = 0;
    if (slickGeo) { slickGeo.dispose(); slickGeo = null; }
    for (const m of charCache.values()) m.dispose();
    charCache.clear();
    if (charFallback) { charFallback.dispose(); charFallback = null; }
  }

  /* Called from Render3D.init: a new battle or a loaded save brings a new
     scene and a new renderer, so everything GPU-side is made again. */
  function init(THREE_, three_, game, helpers) {
    releaseAll();
    orphans.clear();
    dispose();
    THREE = THREE_; three = three_; G = game; H = helpers || {};
    if (!P) buildPresets();
    _frustum = new THREE.Frustum(); _m4 = new THREE.Matrix4(); _sphere = new THREE.Sphere();
    _box = new THREE.Box3(); _q = new THREE.Quaternion(); _v = new THREE.Vector3();
    SOOT = new THREE.Color(0x1a1714).convertSRGBToLinear();
    charFallback = new THREE.MeshStandardMaterial({ color: SOOT.clone(), roughness: 1, metalness: 0.1 });
    smoke = makePoints(CAP_SMOKE, false, 51);
    glow = makePoints(CAP_GLOW, true, 52);
    lines = makeLines(CAP_LINE);
    three.scene.add(smoke.obj); three.scene.add(glow.obj); three.scene.add(lines.obj);
    makeSlicks();
    effArr = Combat.effects; lastT = -1; tossAt = null;
    for (const k in stat) stat[k] = 0;
    ready = true;
  }

  /* ------------------------------------------------------------ particles */
  function pt(s, p, x, y, z, vx, vy, vz, k) {
    if (s.nFree === 0) { stat.dropped++; return; }
    const i = s.free[--s.nFree], i3 = i * 3, i4 = i * 4;
    s.pos[i3] = x; s.pos[i3 + 1] = y; s.pos[i3 + 2] = z;
    s.vel[i3] = vx; s.vel[i3 + 1] = vy; s.vel[i3 + 2] = vz;
    s.age[i] = 0; s.life[i] = R(p.life[0], p.life[1]);
    s.s0[i] = R(p.s0[0], p.s0[1]) * k; s.s1[i] = R(p.s1[0], p.s1[1]) * k;
    s.a0[i] = p.a; s.fin[i] = p.fin;
    s.c0[i3] = p.c0[0]; s.c0[i3 + 1] = p.c0[1]; s.c0[i3 + 2] = p.c0[2];
    s.c1[i3] = p.c1[0]; s.c1[i3 + 1] = p.c1[1]; s.c1[i3 + 2] = p.c1[2];
    s.grav[i] = p.grav; s.drag[i] = p.drag; s.wnd[i] = p.wind; s.bnc[i] = p.bounce;
    s.floor[i] = curFloor;
    s.siz[i] = s.s0[i];
    s.col[i4] = p.c0[0]; s.col[i4 + 1] = p.c0[1]; s.col[i4 + 2] = p.c0[2];
    s.col[i4 + 3] = p.fin > 0 ? 0 : p.a;
    if (i >= s.hi) s.hi = i + 1;
    s.n++; s.touched = true;
  }
  function stepPoints(s, dt) {
    if ((s.n === 0 && s.hi === 0) || (dt <= 0 && !s.touched)) return;
    s.touched = false;
    const wx = wind.x * dt, wz = wind.z * dt;
    let hi = 0;
    for (let i = 0; i < s.hi; i++) {
      if (s.life[i] <= 0) continue;
      const i3 = i * 3, i4 = i * 4, a = s.age[i] + dt, L0 = s.life[i];
      if (a >= L0) {
        s.life[i] = 0; s.siz[i] = 0; s.col[i4 + 3] = 0;
        s.free[s.nFree++] = i; s.n--;
        continue;
      }
      s.age[i] = a;
      const t = a / L0, dr = Math.max(0, 1 - s.drag[i] * dt);
      let vx = s.vel[i3] * dr, vy = s.vel[i3 + 1] * dr - s.grav[i] * dt, vz = s.vel[i3 + 2] * dr;
      let px = s.pos[i3] + vx * dt + wx * s.wnd[i];
      let py = s.pos[i3 + 1] + vy * dt;
      let pz = s.pos[i3 + 2] + vz * dt + wz * s.wnd[i];
      if (py < s.floor[i]) {
        py = s.floor[i];
        if (s.bnc[i]) { vy = -vy * 0.3; vx *= 0.55; vz *= 0.55; } else vy = 0;
      }
      s.vel[i3] = vx; s.vel[i3 + 1] = vy; s.vel[i3 + 2] = vz;
      s.pos[i3] = px; s.pos[i3 + 1] = py; s.pos[i3 + 2] = pz;
      const ge = 1 - (1 - t) * (1 - t);
      s.siz[i] = s.s0[i] + (s.s1[i] - s.s0[i]) * ge;
      const fi = s.fin[i];
      s.col[i4] = s.c0[i3] + (s.c1[i3] - s.c0[i3]) * t;
      s.col[i4 + 1] = s.c0[i3 + 1] + (s.c1[i3 + 1] - s.c0[i3 + 1]) * t;
      s.col[i4 + 2] = s.c0[i3 + 2] + (s.c1[i3 + 2] - s.c0[i3 + 2]) * t;
      s.col[i4 + 3] = s.a0[i] * (fi > 0 && t < fi ? t / fi : 1) * (1 - t);
      hi = i + 1;
    }
    s.hi = hi;
    s.obj.geometry.setDrawRange(0, hi);
    s.aPos.updateRange.count = hi * 3; s.aPos.needsUpdate = true;
    s.aCol.updateRange.count = hi * 4; s.aCol.needsUpdate = true;
    s.aSiz.updateRange.count = hi;     s.aSiz.needsUpdate = true;
  }

  function spark(p, x, y, z, vx, vy, vz) {
    const s = lines;
    if (s.nFree === 0) { stat.dropped++; return; }
    const i = s.free[--s.nFree], i3 = i * 3;
    s.head[i3] = x; s.head[i3 + 1] = y; s.head[i3 + 2] = z;
    s.vel[i3] = vx; s.vel[i3 + 1] = vy; s.vel[i3 + 2] = vz;
    s.age[i] = 0; s.life[i] = R(p.life[0], p.life[1]); s.tail[i] = p.tail;
    s.rgb[i3] = p.c[0]; s.rgb[i3 + 1] = p.c[1]; s.rgb[i3 + 2] = p.c[2];
    s.grav[i] = p.grav; s.bnc[i] = p.bounce; s.floor[i] = curFloor;
    if (i >= s.hi) s.hi = i + 1;
    s.n++; s.touched = true;
  }
  function stepLines(s, dt) {
    if ((s.n === 0 && s.hi === 0) || (dt <= 0 && !s.touched)) return;
    s.touched = false;
    let hi = 0;
    for (let i = 0; i < s.hi; i++) {
      const o6 = i * 6, o8 = i * 8;
      if (s.life[i] <= 0) continue;
      const a = s.age[i] + dt;
      if (a >= s.life[i]) {
        s.life[i] = 0; s.col[o8 + 3] = 0; s.col[o8 + 7] = 0;
        s.free[s.nFree++] = i; s.n--;
        continue;
      }
      s.age[i] = a;
      const i3 = i * 3, t = a / s.life[i];
      let vx = s.vel[i3], vy = s.vel[i3 + 1] - s.grav[i] * dt, vz = s.vel[i3 + 2];
      let hx = s.head[i3] + vx * dt, hy = s.head[i3 + 1] + vy * dt, hz = s.head[i3 + 2] + vz * dt;
      if (hy < s.floor[i]) {
        hy = s.floor[i];
        if (s.bnc[i]) { vy = -vy * 0.35; vx *= 0.6; vz *= 0.6; } else vy = 0;
      }
      s.vel[i3] = vx; s.vel[i3 + 1] = vy; s.vel[i3 + 2] = vz;
      s.head[i3] = hx; s.head[i3 + 1] = hy; s.head[i3 + 2] = hz;
      /* a spark is seen as the streak its motion paints during one exposure */
      const tl = s.tail[i];
      s.pos[o6] = hx - vx * tl; s.pos[o6 + 1] = hy - vy * tl; s.pos[o6 + 2] = hz - vz * tl;
      s.pos[o6 + 3] = hx; s.pos[o6 + 4] = hy; s.pos[o6 + 5] = hz;
      const al = 1 - t;
      s.col[o8] = s.rgb[i3]; s.col[o8 + 1] = s.rgb[i3 + 1] * 0.7; s.col[o8 + 2] = s.rgb[i3 + 2] * 0.5; s.col[o8 + 3] = al * 0.08;
      s.col[o8 + 4] = s.rgb[i3]; s.col[o8 + 5] = s.rgb[i3 + 1]; s.col[o8 + 6] = s.rgb[i3 + 2]; s.col[o8 + 7] = al;
      hi = i + 1;
    }
    s.hi = hi;
    s.obj.geometry.setDrawRange(0, hi * 2);
    s.aPos.updateRange.count = hi * 6; s.aPos.needsUpdate = true;
    s.aCol.updateRange.count = hi * 8; s.aCol.needsUpdate = true;
  }

  /* sparks thrown off a plate: back toward where the round came from, across
     the face and up - never on into the armour */
  function sparksOff(n, x, y, z, dx, dz, spd) {
    for (let i = 0; i < n; i++) {
      const a = R(0.15, 1), b = R(-1, 1), u = R(0.1, 1);
      const vx = -dx * a - dz * b, vz = -dz * a + dx * b, vy = u;
      const k = spd * R(0.5, 1) / (Math.sqrt(vx * vx + vy * vy + vz * vz) || 1);
      spark(L.spark, x, y, z, vx * k, vy * k, vz * k);
    }
  }

  /* ------------------------------------------------------------ visibility */
  function fogVisible(gx, gy) {
    if (!G.fogEnabled || !G.fog) return true;
    const tx = (gx / CFG.TILE) | 0, ty = (gy / CFG.TILE) | 0;
    if (tx < 0 || ty < 0 || tx >= G.map.W || ty >= G.map.H) return false;
    return G.fog[ty * G.map.W + tx] === 2;
  }
  function updateFrustum() {
    const c = three.camera;
    _m4.multiplyMatrices(c.projectionMatrix, c.matrixWorldInverse);
    _frustum.setFromProjectionMatrix(_m4);
  }
  function onScreen(x, y, z, r) {
    _sphere.center.set(x, y, z); _sphere.radius = r;
    return _frustum.intersectsSphere(_sphere);
  }
  /* Remains follow the rules the living were drawn by (render3d syncEntities):
     the player's own are always drawn, anyone else's only where the player
     sees now. What a wreck does after the kill - falling, sinking, burning on
     its fixed timeline - depends on nothing hidden, but a fire lit where the
     player cannot look would still mark the spot, and a falling airframe
     that lands in fog was not seen to land. */
  function seeRec(r) { return r.own || fogVisible(r.x, r.y); }
  function isWaterAt(gx, gy) {
    const m = G.map, tx = U.clamp((gx / CFG.TILE) | 0, 0, m.W - 1), ty = U.clamp((gy / CFG.TILE) | 0, 0, m.H - 1);
    return m.terrain[ty * m.W + tx] === T.WATER;
  }

  /* the drawn size of an entity's model, measured once and kept on its record */
  function extentOf(rec) {
    if (rec._ib) return rec._ib;
    _box.setFromObject(rec.grp);
    const y0 = rec.grp.position.y;
    const ib = { h: Math.max(0.5, _box.max.y - y0),
                 half: Math.max(0.5, 0.5 * Math.max(_box.max.x - _box.min.x, _box.max.z - _box.min.z)) };
    rec._ib = ib;
    return ib;
  }

  /* --------------------------------------------------------------- hits */
  function hit(fx) {
    stat.hits++;
    const B = budget();
    if (!fogVisible(fx.x, fx.y)) return;
    const PXM = H.PXM;
    const m = fx.m, k = fx.k || 0.1, small = fx.w === "bullet";
    const dx = Math.cos(fx.ang || 0), dz = Math.sin(fx.ang || 0);   // the round's travel, world x/z
    const rec = fx.id ? (H.recOf(fx.id) || orphans.get(fx.id) || claimed.get(fx.id) || null) : null;
    const gy = H.heightAt(fx.x, fx.y);
    let x = fx.x * PXM, z = fx.y * PXM, y;
    if (rec && m !== "ground" && m !== "water") {
      /* the face the round arrived at, at the height it would strike */
      const ib = extentOf(rec);
      const face = m === "air" ? ib.half * 0.3 : m === "soft" ? 0 : ib.half * 0.7;
      x = rec.grp.position.x - dx * face; z = rec.grp.position.z - dz * face;
      y = rec.grp.position.y + ib.h * (m === "struct" ? R(0.2, 0.6) : m === "soft" ? 0.45 : 0.4);
    } else if (m === "water") y = 0.4;   // the sea surface is at 0.35 m
    else if (m === "air") y = H.AIR_ALT;
    else y = gy + 0.15;
    if (!onScreen(x, y, z, 6)) return;
    stat.hitsShown++;
    curFloor = (m === "water" || m === "hull") ? 0.35 : m === "air" ? -1e9 : gy;
    if (B <= 0) {
      /* "low" budgets no impact particles, but a strike still has to show
         where it landed - the sphere this replaces did, on every tier. One
         point, the surface's own: a flash on metal, dust or a spout
         elsewhere. No sparks, no debris. */
      if (m === "armour" || m === "hull" || m === "air") pt(glow, P.flash, x, y, z, 0, 0, 0, small ? 1 : 2.4);
      else if (m === "water") pt(smoke, P.spray, x, 0.4, z, 0, small ? 4 : 9, 0, small ? 0.8 : 1.4);
      else pt(smoke, m === "struct" ? P.dustS : P.puff, x, y, z, 0, 0.8, 0, small ? 0.9 : 1.6);
      return;
    }
    const n = Math.max(1, Math.round(B * (small ? 0.2 : 0.35 + 0.65 * k)));
    switch (m) {
      case "armour": case "hull": case "air": {
        const v = fx.v;
        if (small) {
          /* a bullet on steel: a spit of sparks and nothing else (drawn, like
             the models, at about twice life size, or it is under a pixel) */
          pt(glow, P.flash, x, y, z, 0, 0, 0, 1.0);
          sparksOff(n, x, y, z, dx, dz, 9);
          break;
        }
        const fl = v === "pen" ? 4.4 : v === "part" ? 3.4 : v === "rico" ? 1.8 : v === "stop" ? 2.4 : 2.8;
        pt(glow, P.flash, x, y, z, 0, 0, 0, fl * (0.7 + 0.6 * k));
        /* a penetrator going in turns its own tip and the plate to white-hot
           spall: the one flash on the field brighter than a muzzle */
        if (v === "pen" || v === "part") pt(glow, P.core, x, y, z, 0, 0, 0, fl * 0.55);
        sparksOff(v === "rico" ? Math.ceil(n * 0.5) : n, x, y, z, dx, dz, v === "stop" ? 22 : 16);
        if (v === "rico") {
          /* the long rod skips off the slope and carries on, climbing: the
             streak is the round itself, still at most of its speed */
          const side = R(-0.25, 0.25), up = R(0.28, 0.55);
          const vx = dx * 0.9 - dz * side, vz = dz * 0.9 + dx * side;
          const sp = R(70, 95) / Math.sqrt(vx * vx + up * up + vz * vz);
          spark(L.rico, x, y, z, vx * sp, up * sp, vz * sp);
        }
        if (v === "pen" || v === "part" || m === "hull")
          pt(smoke, P.smokeB, x, y, z, -dx * 1.5, 1.2, -dz * 1.5, 0.35 + 0.3 * k);
        if (m === "air" && fx.w === "flak") pt(smoke, P.flak, x, y, z, 0, 0.4, 0, 0.8 + k);
        break;
      }
      case "struct": {
        const nd = small ? 1 : 2 + Math.round(3 * k);
        for (let i = 0; i < nd; i++)
          pt(smoke, P.dustS, x + R(-0.5, 0.5), y, z + R(-0.5, 0.5),
             -dx * R(1, 3) + R(-1, 1), R(0.5, 2), -dz * R(1, 3) + R(-1, 1), small ? 0.45 : 0.7 + 0.9 * k);
        for (let i = 0; i < n; i++)
          pt(smoke, P.chips, x, y, z, -dx * R(2, 6) + R(-3, 3), R(2, 7), -dz * R(2, 6) + R(-3, 3), small ? 0.6 : 1);
        if (!small) pt(glow, P.flash, x, y, z, 0, 0, 0, 1.5 + 2 * k);
        break;
      }
      case "soft": {
        /* a round finding a man: a small puff of dust off his kit. Nothing more. */
        pt(smoke, P.puff, x, y, z, R(-0.5, 0.5), R(0.3, 1), R(-0.5, 0.5), 0.9);
        if (!small) pt(smoke, P.puff, x, y, z, R(-0.8, 0.8), R(0.3, 1.2), R(-0.8, 0.8), 0.9);
        break;
      }
      case "ground": {
        if (small) {
          pt(smoke, P.puff, x, y, z, 0, R(0.8, 1.6), 0, 0.9);
          for (let i = 0; i < 2; i++) pt(smoke, P.dirt, x, y, z, R(-1.5, 1.5), R(2, 4), R(-1.5, 1.5), 0.8);
          break;
        }
        /* earth thrown up in a cone from the crater, then the dust hanging */
        const nd = Math.max(2, Math.round(n * (0.8 + k)));
        for (let i = 0; i < nd; i++) {
          const a = R(0, 6.283), h = R(0.2, 1) * (2 + 5 * k);
          pt(smoke, P.dirt, x, y, z, Math.cos(a) * h, R(6, 13) * (0.6 + k), Math.sin(a) * h, 0.8 + k);
        }
        const np = 2 + Math.round(2 * k);
        for (let i = 0; i < np; i++)
          pt(smoke, P.puff, x + R(-1, 1), y, z + R(-1, 1), R(-1, 1), R(0.5, 2), R(-1, 1), 1.2 + 2.2 * k);
        break;
      }
      case "water": {
        if (fx.u) {
          /* a torpedo under a keel: a column of sea thrown higher than the mast */
          for (let i = 0; i < 26; i++) pt(smoke, P.spray, x + R(-2, 2), 0.4, z + R(-2, 2), R(-2, 2), R(14, 30), R(-2, 2), 2.2);
          for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283; pt(smoke, P.foam, x, 0.5, z, Math.cos(a) * 7, 0, Math.sin(a) * 7, 1.6); }
        } else if (small) {
          pt(smoke, P.spray, x, 0.4, z, R(-0.3, 0.3), R(3, 6), R(-0.3, 0.3), 0.8);
        } else {
          const ns = Math.round(n * 1.5);
          for (let i = 0; i < ns; i++) pt(smoke, P.spray, x + R(-0.6, 0.6), 0.4, z + R(-0.6, 0.6),
                                            R(-1.2, 1.2), R(6, 15) * (0.6 + k), R(-1.2, 1.2), 0.8 + k);
          pt(smoke, P.foam, x, 0.5, z, 0, 0, 0, 0.8 + k);
        }
        break;
      }
    }
  }

  /* -------------------------------------------------------------- deaths */
  /* render3d's entity sync calls this for every model whose entity it did not
     draw this frame. A model whose entity has an unread death event is kept
     for death() to claim a moment later in the same frame; anything else -
     gone into fog, reskinned, carried - is the caller's to drop. */
  function adopt(id, rec) {
    if (!ready || !rec || !rec.grp) return false;
    const eff = Combat.effects;
    for (let i = eff.length - 1; i >= 0; i--) {
      const f = eff[i];
      if (f.t === "death" && f.id === id && !f._seen3) { orphans.set(id, rec); return true; }
    }
    return false;
  }

  /* soot: paint burned off, steel blackened. One material per source material,
     shared by every wreck of that model, so a hundred dead tanks add nothing. */
  function charMat(m) {
    if (!m) return m;
    let c = charCache.get(m);
    if (c) return c;
    if (charCache.size >= 900) return charFallback;
    c = new THREE.MeshStandardMaterial({
      color: 0xffffff, map: m.map || null, normalMap: m.normalMap || null,
      vertexColors: !!m.vertexColors, side: m.side, flatShading: !!m.flatShading,
      alphaTest: m.alphaTest || 0, roughness: 1, metalness: 0.1, envMapIntensity: 0.25 });
    if (m.map || m.vertexColors) c.color.setRGB(0.085, 0.078, 0.07);
    else if (m.color) c.color.copy(m.color).multiplyScalar(0.12).lerp(SOOT, 0.7);
    else c.color.copy(SOOT);
    c.userData._srgbDone = true;
    charCache.set(m, c);
    return c;
  }
  /* A fire takes the small things off a hull - aerials, sights, stowage,
     lamps - and glass and rotor blur are simply gone. Hiding them is also
     what keeps a field of wrecks from costing more draw calls than the live
     vehicles did. MEASURED on the e20 models, meshes alive -> visible 5 s
     after the kill (parts under 4.5% of the drawn length hidden): mbt_p
     182 -> 35, hvy_p 181 -> 34, mbt_n 181 -> 32, ifv_n 174 -> 45, and for
     gunships after the crash helo_n 92 -> 40, helo_p 15 -> 11.
     Only the big parts (8%: hull, turret, tracks) still cast a shadow.
     Hulks, crashed airframes and rubble come through here. A sinking ship
     does not: at 4.5% of a destroyer's length her guns and launchers would
     vanish with the aerials, so she goes down whole and keeps the draw calls
     she had alive (destroyer_n 524) for the 10-18 s she takes to go under. */
  function charGroup(grp, len) {
    const minR = len * 0.045, shadowR = len * 0.08;
    grp.traverse(function (o) {
      if (o.isMesh) {
        const ms = Array.isArray(o.material) ? o.material : [o.material];
        for (let i = 0; i < ms.length; i++) {
          const m = ms[i];
          if (!m || (m.transparent && m.opacity < 0.98) || m.blending === THREE.AdditiveBlending) { o.visible = false; return; }
        }
        if (o.geometry) {
          if (!o.geometry.boundingSphere) o.geometry.computeBoundingSphere();
          const rr = o.geometry.boundingSphere.radius * o.matrixWorld.getMaxScaleOnAxis();
          if (rr < minR) { o.visible = false; return; }
          o.castShadow = rr >= shadowR;
        }
        o.material = Array.isArray(o.material) ? o.material.map(charMat) : charMat(o.material);
      } else if (o.isPoints || o.isLine || o.isSprite) o.visible = false;
    });
  }

  function addRec(r) {
    recs.push(r);
    let n = 0, oldest = null;
    for (let i = 0; i < recs.length; i++) {
      const q = recs[i];
      if (q.dead || q.type !== r.type) continue;
      n++;
      if (!oldest) oldest = q;
    }
    if (n > CAP[r.type] && oldest && oldest !== r) { release(oldest); stat.capped++; }
  }
  function release(r) {
    if (r.dead) return;
    r.dead = true;
    if (r.grp && r.grp.parent) r.grp.parent.remove(r.grp);
    if (r.tur && r.tur.parent) r.tur.parent.remove(r.tur);
    if (r.slick) { r.slick.visible = false; r.slick.material.opacity = 0; r.slick.userData.busy = false; r.slick = null; }
    stat.released++;
  }
  function releaseAll() {
    for (let i = 0; i < recs.length; i++) release(recs[i]);
    recs.length = 0;
    claimed.clear();
    if (three && orphans.size) orphans.forEach(dropOrphan);
    orphans.clear();
  }
  /* a function made once: Map.forEach with it allocates nothing, where a
     for..of over orphans.values() makes an iterator every frame it runs */
  function dropOrphan(rec) { if (rec.grp.parent) rec.grp.parent.remove(rec.grp); }
  function takeSlick() {
    for (let i = 0; i < slick.length; i++) if (!slick[i].userData.busy) { slick[i].userData.busy = true; return slick[i]; }
    return null;
  }

  function death(fx) {
    stat.deaths++;
    const rec = orphans.get(fx.id);
    if (!rec) return;                  // it was not on the player's screen when it died
    orphans.delete(fx.id);
    claimed.set(fx.id, rec);
    /* a structure is drawn while merely remembered; its fall is only seen in sight */
    if (fx.kind === "building" && !fogVisible(fx.x, fx.y)) { three.scene.remove(rec.grp); return; }
    stat.deathsShown++;
    const ib = extentOf(rec);
    const r = { type: "", fx, grp: rec.grp, x: fx.x, y: fx.y, y0: rec.grp.position.y, own: !!fx.own,
                h: ib.h, len: ib.half * 2, accF: 0, accS: 0, accB: 0, cook: R(0.8, 2.5),
                charred: false, dead: false, tur: null, slick: null };
    if (fx.kind === "building") startRubble(r, rec);
    else if (fx.cat === "infantry") startBody(r);
    else if (fx.layer === "air") startCrash(r);
    else if (fx.layer === "deck") startDeck(r);
    else if (fx.layer === "sub") startSub(r);
    else if (fx.layer === "sea") startShip(r);
    else startHulk(r, rec);
    addRec(r);
  }

  function burst(r, x, y, z, k) {
    const q = quality();
    curFloor = H.heightAt(r.x, r.y);
    if (!seeRec(r) || !onScreen(x, y, z, 20)) return;
    pt(glow, P.fireball, x, y + 1, z, 0, 2, 0, k);
    const nd = Math.round(10 * q * k);
    for (let i = 0; i < nd; i++) {
      const a = R(0, 6.283), h = R(3, 11);
      pt(smoke, P.debris, x, y + 1, z, Math.cos(a) * h, R(6, 16), Math.sin(a) * h, 0.8 + 0.4 * k);
    }
    const ns = Math.round(8 * q);
    for (let i = 0; i < ns; i++) {
      const a = R(0, 6.283), h = R(5, 18);
      spark(L.spark, x, y + 1, z, Math.cos(a) * h, R(6, 20), Math.sin(a) * h);
    }
    for (let i = 0; i < 3; i++) pt(smoke, P.smokeB, x + R(-1, 1), y + 2, z + R(-1, 1), R(-1, 1), R(2, 4), R(-1, 1), 0.8 * k);
  }

  function startHulk(r, rec) {
    r.type = "hulk";
    charGroup(r.grp, r.len); r.charred = true;
    /* an armoured vehicle carries its own ammunition into the fire */
    const d = UNITS[r.fx.def];
    r.ammo = !!(d && d.weapons && d.weapons.length && (d.armor === "heavy" || d.armor === "light"));
    r.pop = 0;
    if (r.fx.cata) {
      /* the carousel goes: the hull jumps on its suspension and the turret -
         the real one, gun and all - goes up on the gas */
      r.pop = 0.7;
      const tur = rec.turret;
      if (tur && tur.parent) {
        three.scene.attach(tur);
        r.tur = tur;
        r.tq0 = tur.quaternion.clone();
        r.tax = new THREE.Vector3(R(-1, 1), 0, R(-1, 1)).normalize();
        const ta = R(0, 6.283), ts = R(4, 7);
        r.tv = [Math.cos(ta) * ts, R(14, 20), Math.sin(ta) * ts];
        r.tspin = R(4, 9) * (Math.random() < 0.5 ? -1 : 1);
        r.tang = 0; r.tland = false;
        tossAt = r.fx;
      }
    }
    burst(r, r.grp.position.x, r.y0 + r.h * 0.5, r.grp.position.z, r.fx.cata ? 1.4 : 0.9);
  }

  function startCrash(r) {
    r.type = "crash";
    const d = UNITS[r.fx.def] || {};
    r.heli = !!d.hover;
    const spd = r.heli ? 9 : 42;                  // metres a second: a hover machine was barely moving
    r.vx = Math.cos(r.fx.ang) * spd; r.vz = Math.sin(r.fx.ang) * spd; r.vy = r.heli ? 0 : -3;
    r.yawRate = 0; r.rollRate = R(-1.5, 1.5);
    const g = r.grp;
    burst(r, g.position.x, g.position.y, g.position.z, 0.7);
  }
  function crashLand(r, gx, gy) {
    const g = r.grp, w = isWaterAt(gx, gy);
    const x = g.position.x, z = g.position.z;
    curFloor = w ? 0.35 : H.heightAt(gx, gy);
    r.x = gx; r.y = gy;
    /* it came down where the player cannot see: nothing is left to show */
    if (!seeRec(r)) { release(r); return; }
    const seen = onScreen(x, curFloor, z, 25);
    if (w) {
      if (seen) {
        for (let i = 0; i < 22; i++) pt(smoke, P.spray, x + R(-2, 2), 0.4, z + R(-2, 2), R(-3, 3), R(8, 20), R(-3, 3), 1.6);
        for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; pt(smoke, P.foam, x, 0.5, z, Math.cos(a) * 5, 0, Math.sin(a) * 5, 1.3); }
      }
      r.type = "ditch"; r.t0 = r.fx.max - r.fx.life;
      return;
    }
    /* fuel and what is left of the load going up together */
    if (seen) {
      for (let i = 0; i < 3; i++) pt(glow, P.fireball, x + R(-2, 2), curFloor + 2, z + R(-2, 2), R(-2, 2), R(2, 5), R(-2, 2), 1.4);
      for (let i = 0; i < 12; i++) { const a = R(0, 6.283), h = R(3, 12);
        pt(smoke, P.dirt, x, curFloor + 0.5, z, Math.cos(a) * h, R(5, 12), Math.sin(a) * h, 1.2); }
      for (let i = 0; i < 4; i++) pt(smoke, P.smokeB, x + R(-2, 2), curFloor + 3, z + R(-2, 2), R(-1, 1), R(3, 5), R(-1, 1), 1.1);
    }
    g.position.y = curFloor;
    g.rotation.x = R(-0.25, 0.25); g.rotation.z = R(-0.12, 0.04);
    g.scale.y *= 0.6;                              // what an airframe looks like after meeting the ground
    charGroup(g, r.len); r.charred = true;
    r.type = "hulk"; r.y0 = curFloor; r.h *= 0.6; r.fuel = true; r.ammo = false; r.pop = 0;
  }

  /* An airframe caught on a ship's deck (combat.js names the layer "deck").
     A hulk left where it died would hang over the sea once the ship steamed
     on. It goes over the side instead - what deck crews do with a burning
     wreck, as Forrestal's did in 1967 - dropping out of sight inside its own
     fireball. */
  function startDeck(r) {
    r.type = "ditch"; r.t0 = 0;
    /* render3d eases a parked machine to the ground under it plus 1.2 m, and
       at sea that ground is the seabed: the fire is put on the surface, 2 m
       up, where the deck is, not under the water */
    burst(r, r.grp.position.x, Math.max(2, r.y0 + r.h * 0.5), r.grp.position.z, 0.6);
  }

  function startShip(r) {
    r.type = "ship";
    r.T = U.clamp(9 + r.len * 0.08, 10, 18);        // a big hull takes longer to flood
    r.list = Math.random() < 0.5 ? -1 : 1;          // it rolls to whichever side the water came in
    r.trim = Math.random() < 0.5 ? -1 : 1;          // and goes down by the head or by the stern
    r.rx = r.grp.rotation.x; r.rz = r.grp.rotation.z;
    r.under = false;
  }
  function startSub(r) {
    r.type = "sub";
    r.T = 3.5;
    const g = r.grp;
    curFloor = 0.35;
    if (seeRec(r) && onScreen(g.position.x, 0.3, g.position.z, 15)) {
      /* the hull breaking up lets go of all its air at once */
      for (let i = 0; i < 18; i++) pt(smoke, P.foam, g.position.x + R(-r.len * 0.3, r.len * 0.3), 0.5,
                                       g.position.z + R(-3, 3), R(-1, 1), 0, R(-1, 1), R(0.7, 1.3));
    }
  }
  function startRubble(r, rec) {
    r.type = "rubble";
    const d = BUILDINGS[r.fx.def] || { w: 1, h: 1, cat: "" };
    r.bw = d.w || 1; r.bh = d.h || 1;
    r.tx = Math.round(r.x / CFG.TILE - r.bw / 2); r.ty = Math.round(r.y / CFG.TILE - r.bh / 2);
    /* a civilian block becomes the game's own rubble structure the same moment
       (G.onDeath), and a wall section is too small to burn: both just fall */
    r.brief = d.cat === "civilian" || !!d.neutral || r.bw * r.bh <= 1;
    r.T = r.brief ? 0.9 : 2.4;
    r.sy0 = r.grp.scale.y;
    r.tilt = [R(-0.05, 0.05), R(-0.05, 0.05)];
    const nSpot = U.clamp(r.bw * r.bh, 2, 6), hx = r.bw * 20 * 0.35, hz = r.bh * 20 * 0.35;
    r.spots = [];
    for (let i = 0; i < nSpot; i++) r.spots.push(R(-hx, hx), R(-hz, hz));
    r.occT = 0.5;
    /* the dust a falling structure pushes out of itself, low and wide */
    const g = r.grp, q = quality();
    curFloor = r.y0;
    if (onScreen(g.position.x, r.y0, g.position.z, 40)) {
      const n = Math.round(Math.min(60, (8 + 6 * r.bw * r.bh) * q) * (r.brief ? 0.4 : 1));
      const sc = U.clamp(Math.sqrt(r.bw * r.bh) / 2, 0.4, 1.5);
      for (let i = 0; i < n; i++) {
        const a = R(0, 6.283), rr = R(0.2, 1) * hx;
        pt(smoke, P.dustB, g.position.x + Math.cos(a) * rr, r.y0 + R(0.5, 4), g.position.z + Math.sin(a) * rr,
           Math.cos(a) * R(2, 6), R(0.2, 1.5), Math.sin(a) * R(2, 6), sc);
      }
      for (let i = 0; i < Math.round(12 * q); i++) {
        const a = R(0, 6.283), h = R(2, 9);
        pt(smoke, P.debris, g.position.x, r.y0 + r.h * 0.6, g.position.z, Math.cos(a) * h, R(3, 10), Math.sin(a) * h, 1.2);
      }
    }
  }
  function startBody(r) {
    r.type = "body";
    r.dir = Math.random() < 0.5 ? -1 : 1;
    r.rz = r.grp.rotation.z;
    r.landed = false;
  }

  /* ------------------------------------------------------------ records */
  function emitOK(r, x, y, z, rad) { return seeRec(r) && onScreen(x, y, z, rad); }

  function burnEmit(r, dt, burnT, smoulderT, age, spots) {
    const g = r.grp, q = quality();
    const x = g.position.x, z = g.position.z, top = r.y0 + r.h * 0.75;
    if (!emitOK(r, x, top, z, r.len + 12)) { r.accF = r.accS = 0; return; }
    curFloor = r.y0;
    const nsp = spots ? spots.length / 2 : 1;
    const spread = spots ? 0 : r.len * 0.22;
    /* flames and smoke in proportion to what is burning: the models are drawn
       about 2.4 times life size, so a fire sized for a real hull would be a
       candle on the one on screen */
    const fk = spots ? U.clamp(r.len / 22, 1.4, 3.2) : U.clamp(r.len / 9, 0.8, 3);
    const sk = spots ? U.clamp(r.len / 26, 1.3, 2.6) : U.clamp(r.len / 11, 0.8, 2.4);
    if (age < burnT) {
      const heat = (1 - 0.6 * age / burnT) * (r.fuel ? 1.5 : 1);
      r.accF += dt * 24 * q * heat * (spots ? 0.6 * nsp : 1);
      r.accS += dt * 7 * q * (spots ? 0.5 * nsp : 1);
      while (r.accF >= 1) {
        r.accF -= 1;
        const j = spots ? (Math.random() * nsp | 0) * 2 : 0;
        const ox = spots ? spots[j] : R(-spread, spread), oz = spots ? spots[j + 1] : R(-spread, spread);
        pt(glow, P.fire, x + ox + R(-0.6, 0.6), top, z + oz + R(-0.6, 0.6), R(-0.4, 0.4), R(1, 3), R(-0.4, 0.4), fk);
      }
      while (r.accS >= 1) {
        r.accS -= 1;
        const j = spots ? (Math.random() * nsp | 0) * 2 : 0;
        const ox = spots ? spots[j] : R(-spread, spread) * 0.5, oz = spots ? spots[j + 1] : R(-spread, spread) * 0.5;
        pt(smoke, P.smokeB, x + ox, top + 1.5, z + oz, R(-0.5, 0.5), R(2, 4), R(-0.5, 0.5), sk);
      }
      /* ammunition cooking off in the fire: a crack and a spit of sparks,
         at no regular interval */
      if (r.ammo) {
        r.cook -= dt;
        if (r.cook <= 0) {
          r.cook = R(1.2, 3.8);
          pt(glow, P.flash, x + R(-1, 1), top, z + R(-1, 1), 0, 0, 0, 1.6);
          for (let i = 0; i < 5; i++) spark(L.spark, x, top, z, R(-6, 6), R(8, 18), R(-6, 6));
        }
      }
    } else if (age < smoulderT) {
      r.accS += dt * 1.6 * q * (spots ? 0.6 * nsp : 1);
      while (r.accS >= 1) {
        r.accS -= 1;
        const j = spots ? (Math.random() * nsp | 0) * 2 : 0;
        const ox = spots ? spots[j] : R(-spread, spread) * 0.5, oz = spots ? spots[j + 1] : R(-spread, spread) * 0.5;
        pt(smoke, P.smokeG, x + ox, top, z + oz, R(-0.3, 0.3), R(1, 2), R(-0.3, 0.3), sk);
        if (Math.random() < 0.25) pt(glow, P.ember, x + ox, top, z + oz, R(-0.5, 0.5), R(1, 2.5), R(-0.5, 0.5), 1);
      }
    }
  }

  function updHulk(r, dt, age) {
    const g = r.grp, left = r.fx.life;
    let y = r.y0;
    if (r.pop && age < 0.7) y += Math.sin(age / 0.7 * Math.PI) * r.pop;
    if (left < SINK) y -= r.h * 1.05 * (1 - left / SINK);   // the recovery crews have been
    g.position.y = y;
    if (r.tur) updTurret(r, dt);
    burnEmit(r, dt, V_BURN, V_SMOULDER, age, null);
  }
  function updTurret(r, dt) {
    const t = r.tur;
    if (!r.tland) {
      r.tv[1] -= GRAV * dt;
      t.position.x += r.tv[0] * dt; t.position.y += r.tv[1] * dt; t.position.z += r.tv[2] * dt;
      r.tang += r.tspin * dt;
      _q.setFromAxisAngle(r.tax, r.tang);
      t.quaternion.multiplyQuaternions(_q, r.tq0);
      /* it comes down on the ground, or on the hull it came off */
      const hx = t.position.x - r.grp.position.x, hz = t.position.z - r.grp.position.z;
      const onHull = hx * hx + hz * hz < r.len * r.len * 0.12;
      const gy = onHull ? r.y0 + r.h * 0.55 : H.heightAt(t.position.x / H.PXM, t.position.z / H.PXM);
      if (r.tv[1] < 0 && t.position.y <= gy) {
        t.position.y = gy;
        r.tland = true;
        /* it comes to rest on the ring, tipped, not balanced on an edge */
        _q.setFromAxisAngle(r.tax, R(0.12, 0.3) * (r.tspin > 0 ? 1 : -1));
        t.quaternion.multiplyQuaternions(_q, r.tq0);
        curFloor = gy;
        if (r.own || fogVisible(t.position.x / H.PXM, t.position.z / H.PXM))
          for (let i = 0; i < 4; i++) pt(smoke, P.puff, t.position.x, gy + 0.3, t.position.z, R(-2, 2), R(0.5, 1.5), R(-2, 2), 2.2);
      }
    } else if (r.fx.life < SINK) {
      t.position.y -= dt * 0.9;
    }
  }

  function updCrash(r, dt) {
    const g = r.grp;
    r.vy -= GRAV * dt;
    const drag = Math.max(0, 1 - 0.25 * dt);
    r.vx *= drag; r.vz *= drag;
    g.position.x += r.vx * dt; g.position.y += r.vy * dt; g.position.z += r.vz * dt;
    if (r.heli) {
      /* no tail rotor, no torque reaction: the airframe spins the other way */
      r.yawRate = Math.min(5, r.yawRate + 3.2 * dt);
      g.rotation.y += r.yawRate * dt;
    } else {
      g.rotation.z += (-0.55 - g.rotation.z) * Math.min(1, dt * 1.4);   // the nose drops
    }
    g.rotation.x += r.rollRate * dt;
    const gx = g.position.x / H.PXM, gy = g.position.z / H.PXM;
    r.x = gx; r.y = gy;
    g.visible = seeRec(r);
    /* burning fuel streaming from it, and the smoke it leaves hanging */
    if (g.visible && onScreen(g.position.x, g.position.y, g.position.z, 20)) {
      const q = quality();
      r.accF += dt * 22 * q; r.accS += dt * 14 * q;
      curFloor = -1e9;
      while (r.accF >= 1) { r.accF -= 1; pt(glow, P.fire, g.position.x + R(-0.8, 0.8), g.position.y, g.position.z + R(-0.8, 0.8), r.vx * 0.2, 0.5, r.vz * 0.2, 1.3); }
      while (r.accS >= 1) { r.accS -= 1; pt(smoke, P.smokeB, g.position.x, g.position.y + 0.5, g.position.z, r.vx * 0.1, 1, r.vz * 0.1, 0.9); }
    }
    const ground = isWaterAt(gx, gy) ? 0.35 : H.heightAt(gx, gy);
    if (g.position.y <= ground + 0.4 || !(gx >= 0 && gy >= 0 && gx < G.map.W * CFG.TILE && gy < G.map.H * CFG.TILE))
      crashLand(r, U.clamp(gx, 0, G.map.W * CFG.TILE - 1), U.clamp(gy, 0, G.map.H * CFG.TILE - 1));
  }
  function updDitch(r, dt, age) {
    const g = r.grp;
    g.position.y -= dt * 2.5;
    g.rotation.x += dt * 0.3;
    if (age - r.t0 > 1.4) release(r);
  }

  function updShip(r, dt, age) {
    const g = r.grp, k = Math.min(1, age / r.T);
    if (!r.under) {
      g.rotation.x = r.rx + r.list * (0.04 + 0.30 * Math.pow(k, 1.6));
      g.rotation.z = r.rz + r.trim * 0.12 * k * k;
      g.position.y = r.y0 - (r.h + 3) * Math.pow(k, 2.2);
      g.visible = seeRec(r);
      if (k < 0.95 && emitOK(r, g.position.x, r.y0 + r.h * 0.5, g.position.z, r.len + 15)) {
        const q = quality();
        curFloor = 0.35;
        r.accF += dt * 16 * q * (1 - k); r.accS += dt * 7 * q; r.accB += dt * 6 * q;
        const ca = Math.cos(r.fx.ang), sa = Math.sin(r.fx.ang);
        while (r.accF >= 1) { r.accF -= 1; const o = R(-0.35, 0.35) * r.len;
          pt(glow, P.fire, g.position.x + ca * o, g.position.y + r.h * 0.6, g.position.z + sa * o, 0, R(1, 3), 0, 1.5); }
        while (r.accS >= 1) { r.accS -= 1; const o = R(-0.3, 0.3) * r.len;
          pt(smoke, P.smokeB, g.position.x + ca * o, g.position.y + r.h * 0.8, g.position.z + sa * o, R(-0.5, 0.5), R(2.5, 4), R(-0.5, 0.5), 1.5); }
        /* water boiling out of her as the compartments go */
        while (r.accB >= 1) { r.accB -= 1; const o = R(-0.5, 0.5) * r.len;
          pt(smoke, P.foam, g.position.x + ca * o + R(-3, 3), 0.5, g.position.z + sa * o + R(-3, 3), R(-1, 1), 0, R(-1, 1), 0.8); }
      }
      if (k >= 1) {
        r.under = true; g.visible = false;
        if (emitOK(r, g.position.x, 0.3, g.position.z, r.len)) {
          curFloor = 0.35;
          for (let i = 0; i < 20; i++) { const a = R(0, 6.283), rr = R(0, 0.4) * r.len;
            pt(smoke, P.foam, g.position.x + Math.cos(a) * rr, 0.5, g.position.z + Math.sin(a) * rr, Math.cos(a) * 3, 0, Math.sin(a) * 3, 1.4); }
        }
        r.slick = takeSlick();
        if (r.slick) { r.slick.position.set(g.position.x, 0.48, g.position.z); r.slick.visible = true; }
        r.tUnder = age;
      }
      return;
    }
    slickAndBubbles(r, dt, age - r.tUnder, 0.45, 1.1, true);
  }
  function updSub(r, dt, age) {
    const g = r.grp;
    if (age < r.T) {
      g.position.y = r.y0 - 9 * Math.pow(age / r.T, 1.5);
      g.visible = age < r.T * 0.85 && seeRec(r);
      if (!r.slick && age > 1.2) {
        r.slick = takeSlick();
        if (r.slick) { r.slick.position.set(g.position.x, 0.48, g.position.z); r.slick.visible = true; }
      }
    } else if (g.visible) g.visible = false;
    slickAndBubbles(r, dt, age, 0.3, 0.9, false);
  }
  /* what stays on the surface over a sunk hull: fuel oil spreading and air
     still coming up. Burning oil for the first seconds after a surface ship. */
  function slickAndBubbles(r, dt, t, r0, r1, burning) {
    const s = r.slick, f = r.fx, g = r.grp;
    if (s) {
      const u = U.clamp(t / 12, 0, 1);            // fuel oil spreads for about twelve seconds
      const rad = r.len * (r0 + (r1 - r0) * (1 - (1 - u) * (1 - u)));
      s.scale.set(rad, rad, rad);
      s.material.opacity = 0.55 * U.clamp(f.life / 8, 0, 1) * (seeRec(r) ? 1 : 0);
    }
    if (!emitOK(r, g.position.x, 0.3, g.position.z, r.len)) return;
    curFloor = 0.35;
    const q = quality();
    r.accB += dt * 7 * q * Math.exp(-t / 4);
    while (r.accB >= 1) { r.accB -= 1;
      pt(smoke, P.bubble, g.position.x + R(-0.3, 0.3) * r.len, 0.5, g.position.z + R(-0.3, 0.3) * r.len, 0, 0.2, 0, 1); }
    if (burning && t < 8) {
      r.accF += dt * 6 * q;
      while (r.accF >= 1) { r.accF -= 1;
        const x = g.position.x + R(-0.4, 0.4) * r.len, z = g.position.z + R(-0.4, 0.4) * r.len;
        pt(glow, P.fire, x, 0.7, z, 0, R(0.5, 1.5), 0, 1.2);
        if (Math.random() < 0.5) pt(smoke, P.smokeB, x, 1.5, z, 0, R(1.5, 3), 0, 1.1); }
    }
  }

  function updRubble(r, dt, age) {
    const g = r.grp, k = Math.min(1, age / r.T);
    /* it comes down under its own weight: slow, then all at once */
    g.scale.y = r.sy0 * (1 - 0.74 * k * k);
    g.position.y = r.y0 - 0.5 * k;
    g.rotation.x = r.tilt[0] * k; g.rotation.z = r.tilt[1] * k;
    if (!r.charred && age >= 0.35) { charGroup(g, r.len); r.charred = true; }
    if (k < 1 && emitOK(r, g.position.x, r.y0, g.position.z, r.len + 20)) {
      curFloor = r.y0;
      r.accB += dt * 12 * quality();
      while (r.accB >= 1) { r.accB -= 1; const a = R(0, 6.283), rr = R(0.6, 1) * r.bw * 7;
        pt(smoke, P.dustB, g.position.x + Math.cos(a) * rr, r.y0 + 0.5, g.position.z + Math.sin(a) * rr,
           Math.cos(a) * R(2, 5), R(0.2, 1), Math.sin(a) * R(2, 5), 0.8); }
    }
    if (r.brief) { if (age > r.T + 0.3) release(r); return; }
    const left = r.fx.life;
    if (left < SINK) g.position.y = r.y0 - 0.5 - 3 * (1 - left / SINK);
    burnEmit(r, dt, B_BURN, B_SMOULDER, age, r.spots);
    /* Something new is standing on the ground it covered: the rubble has been
       cleared. The test is whether the new structure's own model is drawn
       this frame (render3d's entity list): then clearing the rubble tells the
       player nothing the building itself does not. That covers the player's
       own, and an enemy's on a remembered tile - syncEntities draws an enemy
       building wherever the tile has been explored (fog >= 1). The first cut
       asked "is the tile in sight now" instead, and an enemy rebuilding in
       explored fog got both drawn, the new block standing in black rubble
       for up to a minute (measured: 2 models at the spot). */
    r.occT -= dt;
    if (r.occT <= 0) {
      r.occT = 0.5;
      const W0 = G.map.W;
      for (let yy = r.ty; yy < r.ty + r.bh; yy++) for (let xx = r.tx; xx < r.tx + r.bw; xx++) {
        const id = (xx >= 0 && yy >= 0 && xx < W0 && yy < G.map.H && G.occ) ? G.occ[yy * W0 + xx] : 0;
        if (id && H.recOf(id)) { release(r); return; }
      }
    }
  }
  function updBody(r, dt, age) {
    const g = r.grp;
    const k = Math.min(1, age / 0.45);
    g.rotation.z = r.rz + r.dir * 1.45 * k * k;
    g.visible = seeRec(r);
    if (!r.landed && k >= 1) {
      r.landed = true;
      curFloor = r.y0;
      if (g.visible && onScreen(g.position.x, r.y0, g.position.z, 5))
        pt(smoke, P.puff, g.position.x, r.y0 + 0.2, g.position.z, 0, 0.4, 0, 0.9);
    }
    if (age > 3.2) g.position.y = r.y0 - 1.6 * Math.min(1, (age - 3.2) / 1.8);
  }

  /* ---------------------------------------------------------------- frame */
  function event(fx) {
    if (!ready) return;
    if (fx.t === "hit") hit(fx);
    else if (fx.t === "death") death(fx);
  }

  function frame() {
    if (!ready) return;
    /* a new battle replaced the effects list: nothing here belongs to it */
    if (Combat.effects !== effArr) { effArr = Combat.effects; releaseAll(); }
    if (orphans.size) { orphans.forEach(dropOrphan); orphans.clear(); }
    const now = G.time;
    let dt = lastT < 0 ? 0 : now - lastT;
    if (!(dt >= 0) || dt > 0.25) dt = dt > 0.25 ? 0.25 : 0;   // game time: a paused battle holds still
    lastT = now;
    const storm = G.weatherKey === "sandstorm";
    wind.x = storm ? 5.5 : 1.3; wind.z = storm ? 1.9 : 0.45;
    updateFrustum();
    let w = 0;
    for (let i = 0; i < recs.length; i++) {
      const r = recs[i];
      if (!r.dead) {
        if (r.fx.life <= 0) release(r);
        else if (dt > 0) {
          const age = r.fx.max - r.fx.life;
          switch (r.type) {
            case "hulk": updHulk(r, dt, age); break;
            case "crash": updCrash(r, dt); break;
            case "ditch": updDitch(r, dt, age); break;
            case "ship": updShip(r, dt, age); break;
            case "sub": updSub(r, dt, age); break;
            case "rubble": updRubble(r, dt, age); break;
            case "body": updBody(r, dt, age); break;
          }
        }
      }
      if (!r.dead) recs[w++] = r;
    }
    recs.length = w;
    stepPoints(smoke, dt); stepPoints(glow, dt); stepLines(lines, dt);
    tossAt = null;
    if (claimed.size) claimed.clear();
  }

  /* render3d's turret-toss handler asks this before throwing its stand-in box */
  function threwTurret(x, y) { return !!tossAt && tossAt.x === x && tossAt.y === y; }

  function stats() {
    const by = { hulk: 0, crash: 0, ditch: 0, ship: 0, sub: 0, rubble: 0, body: 0 };
    for (let i = 0; i < recs.length; i++) if (!recs[i].dead) by[recs[i].type]++;
    let sl = 0; for (let i = 0; i < slick.length; i++) if (slick[i].userData.busy) sl++;
    return {
      glow: glow ? glow.n : 0, smoke: smoke ? smoke.n : 0, sparks: lines ? lines.n : 0,
      caps: { glow: CAP_GLOW, smoke: CAP_SMOKE, sparks: CAP_LINE, slicks: SLICKS, recs: CAP },
      recs: by, slicks: sl, orphans: orphans.size, charMaterials: charCache.size,
      hits: stat.hits, hitsShown: stat.hitsShown, deaths: stat.deaths, deathsShown: stat.deathsShown,
      dropped: stat.dropped, released: stat.released, capped: stat.capped,
    };
  }

  return { init, adopt, event, frame, threwTurret, stats,
           get ready() { return ready; } };
})();
