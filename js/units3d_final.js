/* ============ units3d_final.js -- missile boats & defence emplacements ============
   Defence structures deliberately ship WITHOUT their gun: the engine mounts the
   rotating def_* weapon on top so it can slew toward targets.                 */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }
if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

BLD_MODELS["wall"] = { build: function (THREE, M, C) {
  var g = new THREE.Group();
  var conc = new THREE.MeshStandardMaterial({ color: 0x8a8d86, metalness: 0.2, roughness: 0.7 });
  var concD = new THREE.MeshStandardMaterial({ color: 0x76796f, metalness: 0.2, roughness: 0.7 });
  var dark = new THREE.MeshStandardMaterial({ color: 0x3b3c38, metalness: 0.25, roughness: 0.6 });
  var team = new THREE.MeshStandardMaterial({ color: C.team, metalness: 0.25, roughness: 0.55 });

  function box(w, d, h, mat, x, y, z, rz) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mat);
    m.position.set(x, y, z);
    if (rz) m.rotation.z = rz;
    return m;
  }

  // one T-wall slab: wide foot, tapered body, capping rail. thickness along X, width along Y.
  function tWall(x, y, rz, stripe) {
    var p = new THREE.Group();
    p.add(box(1.55, 1.65, 0.24, concD, 0, 0, 0.12));          // splayed foot
    p.add(box(0.46, 1.40, 1.45, conc, 0, 0, 0.24 + 0.72));    // lower body
    p.add(box(0.32, 1.28, 1.25, conc, 0, 0, 1.69 + 0.62));    // upper body (thinner - taper)
    p.add(box(0.52, 1.46, 0.18, concD, 0, 0, 2.94 + 0.09));   // capping rail
    if (stripe) {
      p.add(box(0.36, 0.30, 0.34, team, 0.06, -0.32, 0.62));
      p.add(box(0.36, 0.30, 0.34, dark, 0.06, 0.32, 0.62));
    }
    p.position.set(x, y, 0);
    p.rotation.z = rz || 0;
    g.add(p);
    return p;
  }

  var i;
  // main line across the plot, along Y, small gaps between slabs
  for (i = 0; i < 11; i++) tWall(2.2, -8.75 + i * 1.75, 0, i === 2 || i === 7);
  // staggered second line behind it
  for (i = 0; i < 7; i++) tWall(-3.4, -5.25 + i * 1.75, 0, i === 4);
  // short returns along X at the plot edges
  for (i = 0; i < 3; i++) {
    tWall(-8.6 + i * 1.75, 8.9, Math.PI / 2, i === 1);
    tWall(-8.6 + i * 1.75, -8.9, Math.PI / 2, 0);
  }

  // rubble / dirt drift at the slab feet
  var s = 7717;
  function rnd() { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }
  for (i = 0; i < 16; i++) {
    var r = 0.18 + rnd() * 0.22;
    var m = new THREE.Mesh(new THREE.SphereGeometry(r, 5, 3), concD);
    m.position.set(-9 + rnd() * 18, -9 + rnd() * 18, r * 0.35);
    m.scale.set(1, 1, 0.4);
    g.add(m);
  }
  return g;
} };

BLD_MODELS["nest"] = { build: function (THREE, M, C) {
  var g = new THREE.Group();
  var bagM = new THREE.MeshStandardMaterial({ color: 0x9a8f6d, metalness: 0.2, roughness: 0.7 });
  var bagM2 = new THREE.MeshStandardMaterial({ color: 0x8a8060, metalness: 0.2, roughness: 0.7 });
  var dark = new THREE.MeshStandardMaterial({ color: 0x24241f, metalness: 0.2, roughness: 0.7 });
  var olive = new THREE.MeshStandardMaterial({ color: 0x4a5240, metalness: 0.25, roughness: 0.6 });
  var team = new THREE.MeshStandardMaterial({ color: C.team, metalness: 0.25, roughness: 0.55 });

  var s = 4211;
  function rnd() { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }

  var bagGeo = new THREE.SphereGeometry(0.5, 6, 3);   // pillowy sandbag master
  function bag(x, y, z, rot, mat) {
    var m = new THREE.Mesh(bagGeo, mat || (rnd() > 0.5 ? bagM : bagM2));
    m.position.set(x, y, z);
    m.rotation.z = rot + (rnd() - 0.5) * 0.18;
    m.scale.set(0.66, 1.0, 0.30);   // 0.66 x 1.0 x 0.30 m bag
    g.add(m);
    return m;
  }

  // sunken floor pad
  var floor = new THREE.Mesh(new THREE.CylinderGeometry(3.3, 3.3, 0.1, 16), dark);
  floor.rotation.x = Math.PI / 2;
  floor.position.set(0, 0, 0.05);
  g.add(floor);

  // horseshoe of stacked bags, open toward +X
  var course, k, a, r, z;
  for (course = 0; course < 4; course++) {
    z = 0.16 + course * 0.29;
    r = 3.5 - course * 0.12;
    var n = 22;
    var off = (course % 2) * (Math.PI / n);   // running bond between courses
    for (k = 0; k < n; k++) {
      a = -Math.PI * 0.72 + (k / (n - 1)) * Math.PI * 1.44 + off;
      // front (toward +X) courses are kept low so the position stays open
      if (Math.abs(a) < 0.42 && course > 1) continue;
      bag(Math.cos(a) * r, Math.sin(a) * r, z, a + Math.PI / 2);
    }
  }
  // front parapet with a dark firing slot behind it
  for (k = 0; k < 5; k++) {
    bag(3.35, -1.4 + k * 0.7, 0.16, Math.PI / 2);
    if (k !== 2) bag(3.30, -1.4 + k * 0.7, 0.45, Math.PI / 2);
  }
  var slot = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.5, 0.4), dark);
  slot.position.set(3.05, 0, 0.52);
  g.add(slot);

  // ammo crates, rear-right of the pit
  function crate(x, y, z, rz) {
    var c = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.36), olive);
    c.position.set(x, y, z); c.rotation.z = rz; g.add(c);
    var b = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.1, 0.08), dark);
    b.position.set(x, y, z + 0.2); b.rotation.z = rz; g.add(b);
  }
  crate(-1.9, -2.3, 0.28, 0.2);
  crate(-1.9, -1.7, 0.28, 0.1);
  crate(-1.85, -2.0, 0.66, -0.15);
  crate(-2.6, 2.1, 0.28, 1.3);

  // camouflage net over the rear-left corner, on four poles
  var net = new THREE.Mesh(M.slab(THREE, [[-1.2, -1.6], [3.0, -2.4], [3.4, 1.9], [-1.5, 1.5]], 0.06), olive);
  net.position.set(-5.6, 4.6, 2.15);
  net.rotation.y = 0.10;
  net.rotation.x = -0.07;
  g.add(net);
  var poleG = new THREE.CylinderGeometry(0.06, 0.06, 2.15, 6);
  var pp = [[-6.7, 3.1], [-2.6, 2.4], [-2.3, 6.5], [-7.0, 6.2]];
  for (k = 0; k < 4; k++) {
    var pole = new THREE.Mesh(poleG, olive);
    pole.rotation.x = Math.PI / 2;
    pole.position.set(pp[k][0], pp[k][1], 1.07);
    g.add(pole);
  }
  // scrim strips hanging off the net edge
  for (k = 0; k < 6; k++) {
    var st = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, 0.5), k === 3 ? team : olive);
    st.position.set(-7.0 + k * 0.9, 2.5 + rnd() * 0.3, 1.85);
    g.add(st);
  }

  // spoil ridge dug out of the position
  for (k = 0; k < 12; k++) {
    a = rnd() * Math.PI * 2;
    r = 4.3 + rnd() * 1.6;
    var d = new THREE.Mesh(new THREE.SphereGeometry(0.35 + rnd() * 0.3, 5, 3), bagM2);
    d.position.set(Math.cos(a) * r, Math.sin(a) * r, 0.08);
    d.scale.set(1.2, 1.2, 0.35);
    g.add(d);
  }
  return g;
} };

BLD_MODELS["atpost"] = { build: function (THREE, M, C) {
  var g = new THREE.Group();
  var earth = new THREE.MeshStandardMaterial({ color: 0x6f6a55, metalness: 0.2, roughness: 0.7 });
  var bagM = new THREE.MeshStandardMaterial({ color: 0x9a8f6d, metalness: 0.2, roughness: 0.7 });
  var gravel = new THREE.MeshStandardMaterial({ color: 0x6b675e, metalness: 0.2, roughness: 0.7 });
  var dark = new THREE.MeshStandardMaterial({ color: 0x26261f, metalness: 0.25, roughness: 0.6 });
  var olive = new THREE.MeshStandardMaterial({ color: 0x4a5240, metalness: 0.25, roughness: 0.6 });
  var brass = new THREE.MeshStandardMaterial({ color: 0x8a7434, metalness: 0.35, roughness: 0.5 });

  var s = 9091;
  function rnd() { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }
  var k, a, r;

  // gravel floor of the pit
  var floor = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 4.4, 0.12, 20), gravel);
  floor.rotation.x = Math.PI / 2;
  floor.position.set(0, 0, 0.06);
  g.add(floor);

  // circular earth revetment (flattened torus), broken at the +X firing arc
  var berm = new THREE.Mesh(new THREE.TorusGeometry(4.9, 0.95, 6, 26, Math.PI * 1.55), earth);
  berm.rotation.z = Math.PI * 0.225;
  berm.position.set(0, 0, 0.30);
  berm.scale.set(1, 1, 0.72);
  g.add(berm);
  // low lip closing the front, gunner still fires over it
  var lip = new THREE.Mesh(new THREE.TorusGeometry(4.9, 0.55, 5, 10, Math.PI * 0.5), earth);
  lip.rotation.z = -Math.PI * 0.25;
  lip.position.set(0, 0, 0.16);
  lip.scale.set(1, 1, 0.7);
  g.add(lip);

  // sandbag capping course on the berm
  var bagGeo = new THREE.SphereGeometry(0.5, 6, 3);
  for (k = 0; k < 30; k++) {
    a = -Math.PI * 0.72 + (k / 29) * Math.PI * 1.44;
    var b = new THREE.Mesh(bagGeo, bagM);
    b.position.set(Math.cos(a) * 4.85, Math.sin(a) * 4.85, 1.02);
    b.rotation.z = a + Math.PI / 2 + (rnd() - 0.5) * 0.15;
    b.scale.set(0.62, 0.95, 0.28);
    g.add(b);
  }

  // trail-spade recesses cut into the rear floor
  for (k = 0; k < 2; k++) {
    a = Math.PI * (k ? 0.80 : -0.80);
    var tr = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.7, 0.26), dark);
    tr.position.set(Math.cos(a) * 3.0, Math.sin(a) * 3.0, 0.10);
    tr.rotation.z = a;
    g.add(tr);
    var sp = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, 0.34), earth);
    sp.position.set(Math.cos(a) * 4.2, Math.sin(a) * 4.2, 0.17);
    sp.rotation.z = a;
    g.add(sp);
  }

  // shell-crate stack against the left of the pit
  function crate(x, y, z, rz) {
    var c = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.42, 0.34), olive);
    c.position.set(x, y, z); c.rotation.z = rz; g.add(c);
    var l = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.44, 0.06), dark);
    l.position.set(x, y, z + 0.19); l.rotation.z = rz; g.add(l);
  }
  for (k = 0; k < 3; k++) crate(-1.0, 3.3, 0.29 + k * 0.36, 0.05 * k);
  for (k = 0; k < 2; k++) crate(-1.0, 3.8, 0.29 + k * 0.36, -0.06);
  crate(0.6, 3.6, 0.29, 1.55);

  // spent-case scatter on the gravel
  var caseG = new THREE.CylinderGeometry(0.055, 0.05, 0.34, 6);
  for (k = 0; k < 22; k++) {
    a = rnd() * Math.PI * 2;
    r = 1.7 + rnd() * 2.3;
    var cs = new THREE.Mesh(caseG, brass);
    cs.rotation.set(Math.PI / 2, 0, rnd() * Math.PI);
    cs.position.set(Math.cos(a) * r, Math.sin(a) * r, 0.17);
    g.add(cs);
  }
  // spoil thrown outside the revetment
  for (k = 0; k < 10; k++) {
    a = rnd() * Math.PI * 2;
    r = 6.2 + rnd() * 2.4;
    var d = new THREE.Mesh(new THREE.SphereGeometry(0.5 + rnd() * 0.4, 5, 3), earth);
    d.position.set(Math.cos(a) * r, Math.sin(a) * r, 0.06);
    d.scale.set(1.3, 1.3, 0.3);
    g.add(d);
  }
  return g;
} };

BLD_MODELS["flak"] = { build: function (THREE, M, C) {
  var g = new THREE.Group();
  var conc = new THREE.MeshStandardMaterial({ color: 0x8a8d86, metalness: 0.2, roughness: 0.7 });
  var concD = new THREE.MeshStandardMaterial({ color: 0x74776f, metalness: 0.2, roughness: 0.7 });
  var dark = new THREE.MeshStandardMaterial({ color: 0x2a2b27, metalness: 0.3, roughness: 0.55 });
  var olive = new THREE.MeshStandardMaterial({ color: 0x4a5240, metalness: 0.3, roughness: 0.55 });
  var team = new THREE.MeshStandardMaterial({ color: C.team, metalness: 0.25, roughness: 0.55 });

  function box(w, d, h, mat, x, y, z, rz) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mat);
    m.position.set(x, y, z);
    if (rz) m.rotation.z = rz;
    g.add(m);
    return m;
  }

  var k;
  // concrete apron
  var pad = new THREE.Mesh(M.slab(THREE, [[-18, -18], [18, -18], [18, 18], [-18, 18]], 0.16), concD);
  pad.position.set(0, 0, 0.08);
  g.add(pad);
  // inner working floor, slightly lighter
  var inner = new THREE.Mesh(M.slab(THREE, [[-11, -11], [11, -11], [11, 11], [-11, 11]], 0.10), conc);
  inner.position.set(0, 0, 0.20);
  g.add(inner);

  // square revetment walls (1.3 m) with a gap at the +X vehicle entrance
  var W = 15.5, TH = 0.9, H = 1.3;
  box(TH, 31, H, conc, -W, 0, H / 2 + 0.16);            // rear wall
  box(31, TH, H, conc, 0, -W, H / 2 + 0.16);            // right wall
  box(31, TH, H, conc, 0, W, H / 2 + 0.16);             // left wall
  box(TH, 10.5, H, conc, W, 10.2, H / 2 + 0.16);        // front wall, entrance gap
  box(TH, 10.5, H, conc, W, -10.2, H / 2 + 0.16);

  // raised corner blast walls
  var cs = [[-1, -1], [-1, 1], [1, 1], [1, -1]];
  for (k = 0; k < 4; k++) {
    var cx = cs[k][0] * W, cy = cs[k][1] * W;
    box(6.0, 1.35, 2.6, concD, cx - cs[k][0] * 2.6, cy, 1.46);
    box(1.35, 6.0, 2.6, concD, cx, cy - cs[k][1] * 2.6, 1.46);
    box(2.2, 2.2, 2.85, conc, cx, cy, 1.58);
  }
  // hazard panels on the entrance ends
  box(1.0, 0.35, 0.7, team, W, 5.2, 1.0);
  box(1.0, 0.35, 0.7, team, W, -5.2, 1.0);

  // central mounting pedestal for the gun
  var ped = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 2.15, 0.62, 20), conc);
  ped.rotation.x = Math.PI / 2;
  ped.position.set(0, 0, 0.31 + 0.2);
  g.add(ped);
  var ring = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.11, 6, 20), dark);
  ring.position.set(0, 0, 0.84);
  g.add(ring);
  for (k = 0; k < 6; k++) {
    var a = k / 6 * Math.PI * 2;
    var bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.16, 5), dark);
    bolt.rotation.x = Math.PI / 2;
    bolt.position.set(Math.cos(a) * 1.62, Math.sin(a) * 1.62, 0.92);
    g.add(bolt);
  }

  // ready-ammo lockers along the right-hand wall
  for (k = 0; k < 5; k++) {
    var y = -8.4 + k * 4.2;
    box(1.5, 3.0, 1.1, olive, -13.4, y, 0.71);
    box(0.16, 3.0, 0.14, dark, -12.62, y, 1.18);   // lid lip
    box(0.10, 0.6, 0.5, dark, -12.68, y, 0.66);    // latch panel
  }

  // generator set in the rear-left corner, with exhaust and cable trench
  box(3.4, 2.2, 1.5, olive, -10.5, 11.5, 0.91);
  box(1.1, 0.9, 0.35, dark, -10.5, 11.5, 1.83);
  var stack = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 1.1, 8), dark);
  stack.rotation.x = Math.PI / 2;
  stack.position.set(-11.7, 12.3, 2.2);
  g.add(stack);
  // cable trench running from the generator to the pedestal
  box(8.6, 0.55, 0.14, dark, -6.4, 11.5, 0.24);
  box(0.55, 9.4, 0.14, dark, -2.4, 6.9, 0.24);
  box(2.6, 0.55, 0.14, dark, -1.3, 2.4, 0.24);
  for (k = 0; k < 5; k++) box(0.75, 0.7, 0.2, concD, -8.6 + k * 1.7, 11.5, 0.28);  // trench covers

  // sundry clutter: shell pallets and empty crates by the lockers
  for (k = 0; k < 4; k++) box(1.2, 1.2, 0.45, olive, -8.6, -9.5 + k * 1.5, 0.43);
  box(1.2, 1.2, 0.45, olive, -8.6, -9.5, 0.88);
  return g;
} };

BLD_MODELS["sam"] = { build: function (THREE, M, C) {
  var g = new THREE.Group();
  var conc = new THREE.MeshStandardMaterial({ color: 0x8a8d86, metalness: 0.2, roughness: 0.7 });
  var deck = new THREE.MeshStandardMaterial({ color: 0x4b5054, metalness: 0.35, roughness: 0.55 });
  var olive = new THREE.MeshStandardMaterial({ color: 0x4a5240, metalness: 0.25, roughness: 0.65 });
  var team = new THREE.MeshStandardMaterial({ color: C.team, metalness: 0.3, roughness: 0.6 });

  function box(sx, sy, sz, x, y, z, mat, rz) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(x, y, z + sz / 2);
    if (rz) { m.rotation.z = rz; }
    g.add(m);
    return m;
  }
  function cyl(rt, rb, h, seg, x, y, z, mat) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
    m.rotation.x = Math.PI / 2;
    m.position.set(x, y, z + h / 2);
    g.add(m);
    return m;
  }

  /* hardened concrete pad, slightly stepped edge */
  box(38, 38, 0.35, 0, 0, 0, conc);
  box(34, 34, 0.25, 0, 0, 0.35, conc);
  var padTop = 0.6;

  /* central turntable ring for the launcher - kept very low, centre clear */
  cyl(4.6, 4.9, 0.30, 32, 0, 0, padTop, deck);
  var ring = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.22, 8, 36), deck);
  ring.position.set(0, 0, padTop + 0.30);
  g.add(ring);
  var inner = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.14, 6, 24), deck);
  inner.position.set(0, 0, padTop + 0.32);
  g.add(inner);
  /* hold-down bolt blocks around the ring */
  for (var i = 0; i < 8; i++) {
    var a = i * Math.PI / 4;
    var b = box(0.7, 0.7, 0.35, Math.cos(a) * 4.4, Math.sin(a) * 4.4, padTop, deck);
    b.rotation.z = a;
  }

  /* cable trenches: covered ducts running out from the pad centre */
  var t1 = box(13.0, 1.1, 0.22, -7.5, -7.5, padTop - 0.04, deck);
  t1.rotation.z = Math.PI / 4;
  var t2 = box(13.0, 1.1, 0.22, -7.5, 7.5, padTop - 0.04, deck);
  t2.rotation.z = -Math.PI / 4;
  box(9.0, 0.9, 0.20, 10.5, 0, padTop - 0.04, deck);

  /* engagement radar cabin at the -X/-Y corner */
  var cx = -13.5, cy = -13.5;
  box(7.0, 4.6, 2.9, cx, cy, padTop, olive);
  box(7.4, 5.0, 0.25, cx, cy, padTop + 2.9, deck);
  box(2.2, 0.35, 0.9, cx + 2.4, cy - 2.4, padTop + 0.9, team);   /* painted panel */
  box(1.0, 1.6, 0.9, cx - 3.9, cy, padTop, deck);                 /* entry step block */
  /* dish pedestal + small parabolic dish */
  cyl(0.45, 0.55, 1.0, 12, cx, cy, padTop + 3.15, deck);
  var dish = new THREE.Mesh(new THREE.SphereGeometry(1.6, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), deck);
  dish.scale.set(1, 1, 0.42);
  dish.rotation.y = Math.PI / 2 + 0.35;
  dish.rotation.z = Math.PI / 4;
  dish.position.set(cx, cy, padTop + 4.15);
  g.add(dish);
  var feed = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.2, 6), deck);
  feed.rotation.z = Math.PI / 2;
  feed.rotation.y = -Math.PI / 4;
  feed.position.set(cx + 0.45, cy - 0.45, padTop + 4.3);
  g.add(feed);

  /* power generator trailer at the -X/+Y corner */
  var gx = -13.5, gy = 13.0;
  box(6.4, 2.6, 0.45, gx, gy, padTop + 0.55, deck);      /* chassis */
  box(5.4, 2.4, 1.7, gx - 0.3, gy, padTop + 1.0, olive); /* genset housing */
  box(1.4, 1.6, 1.1, gx + 2.6, gy, padTop + 1.0, deck);  /* radiator end */
  cyl(0.18, 0.18, 1.1, 8, gx - 2.3, gy + 0.9, padTop + 2.7, deck); /* exhaust */
  for (var w = 0; w < 2; w++) {
    var wy = gy - 1.35 + 2.7 * w;
    var wh = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.35, 12), deck);
    wh.position.set(gx - 1.0, wy, padTop + 0.55);
    g.add(wh);
  }
  cyl(0.12, 0.12, 3.2, 6, gx + 4.0, gy, padTop + 0.5, deck); /* drawbar-ish post */

  /* blast walls on two sides (-X and -Y), tapered by stacked courses */
  function blastWall(len, thick, x, y, rot) {
    var w1 = box(len, thick, 1.3, x, y, padTop, conc); w1.rotation.z = rot;
    var w2 = box(len - 1.2, thick * 0.72, 1.2, x, y, padTop + 1.3, conc); w2.rotation.z = rot;
    var w3 = box(len - 2.4, thick * 0.5, 0.9, x, y, padTop + 2.5, conc); w3.rotation.z = rot;
    for (var k = -1; k <= 1; k++) {
      var bx = x + Math.cos(rot) * k * (len / 3.2) + Math.sin(rot) * (thick * 0.9);
      var by = y + Math.sin(rot) * k * (len / 3.2) - Math.cos(rot) * (thick * 0.9);
      var bt = box(1.4, thick * 1.2, 1.8, bx, by, padTop, conc);
      bt.rotation.z = rot;
    }
  }
  blastWall(30, 1.5, -16.5, 2.0, Math.PI / 2);
  blastWall(30, 1.5, 2.0, -16.5, 0);
  /* team stripe on the long wall */
  box(8.0, 0.25, 0.5, 2.0, -15.6, padTop + 2.2, team);

  return g;
} };

BLD_MODELS["coastal"] = { build: function (THREE, M, C) {
  var g = new THREE.Group();
  var conc = new THREE.MeshStandardMaterial({ color: 0x8a8d86, metalness: 0.2, roughness: 0.7 });
  var deck = new THREE.MeshStandardMaterial({ color: 0x4b5054, metalness: 0.35, roughness: 0.55 });
  var earth = new THREE.MeshStandardMaterial({ color: 0x4a5240, metalness: 0.2, roughness: 0.7 });
  var team = new THREE.MeshStandardMaterial({ color: C.team, metalness: 0.3, roughness: 0.6 });

  function box(sx, sy, sz, x, y, z, mat) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(x, y, z + sz / 2);
    g.add(m);
    return m;
  }

  /* apron / foundation */
  box(38, 34, 0.35, -1, 0, 0, conc);
  var f = 0.35;

  var WALL = 3.4;          /* wall height above apron */
  var ROOF = 0.75;         /* roof slab thickness */

  /* rear wall of the casemate */
  box(3.6, 22, WALL, -13.5, 0, f, conc);
  /* side walls */
  box(28, 3.6, WALL, -1.5, 9.2, f, conc);
  box(28, 3.6, WALL, -1.5, -9.2, f, conc);
  /* front cheeks flanking the embrasure - thick, and sloped on the outside */
  box(4.0, 7.0, WALL, 10.5, 7.0, f, conc);
  box(4.0, 7.0, WALL, 10.5, -7.0, f, conc);
  var gl1 = new THREE.Mesh(new THREE.BoxGeometry(5.4, 7.0, 0.9), conc);
  gl1.position.set(12.6, 7.0, f + WALL / 2);
  gl1.rotation.y = -0.62;
  g.add(gl1);
  var gl2 = gl1.clone();
  gl2.position.set(12.6, -7.0, f + WALL / 2);
  g.add(gl2);

  /* embrasure sill across the front, low so the gun clears it */
  box(3.6, 8.0, 1.1, 10.5, 0, f, conc);

  /* roof: rear slab, two side strips and an overhanging front lintel,
     leaving an open well over the centre for the mounted gun */
  box(17, 22, ROOF, -7.5, 0, f + WALL, conc);          /* rear roof */
  box(13, 6.0, ROOF, 5.5, 8.0, f + WALL, conc);        /* side strip +Y */
  box(13, 6.0, ROOF, 5.5, -8.0, f + WALL, conc);       /* side strip -Y */
  var lint = box(6.5, 22, ROOF + 0.25, 13.2, 0, f + WALL, conc); /* overhanging front lintel */
  lint.position.z = f + WALL + (ROOF + 0.25) / 2;
  /* drip lip under the overhang */
  box(1.2, 22, 0.5, 15.6, 0, f + WALL - 0.5, conc);
  /* team stripe on the front face */
  box(0.3, 5.0, 0.45, 16.3, 0, f + WALL - 1.4, team);

  /* observation cupola on the rear roof */
  var cz = f + WALL + ROOF;
  var cup = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.55, 0.7, 16), conc);
  cup.rotation.x = Math.PI / 2;
  cup.position.set(-8.5, 7.0, cz + 0.35);
  g.add(cup);
  var dome = new THREE.Mesh(new THREE.SphereGeometry(1.35, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), deck);
  dome.scale.set(1, 1, 0.5);
  dome.position.set(-8.5, 7.0, cz + 0.7);
  g.add(dome);
  var slit = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.1, 6, 20), deck);
  slit.position.set(-8.5, 7.0, cz + 0.58);
  g.add(slit);

  /* ammunition hoist housing at the rear */
  box(6.0, 7.5, 3.1, -17.0, -3.0, f, conc);
  box(6.6, 8.1, 0.4, -17.0, -3.0, f + 3.1, conc);
  var hst = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 1.0, 12), deck);
  hst.rotation.x = Math.PI / 2;
  hst.position.set(-17.0, -3.0, f + 4.0);
  g.add(hst);
  box(1.2, 2.0, 2.2, -13.8, -3.0, f, deck);   /* hoist door into the casemate */
  /* ready ammunition boxes by the hoist */
  box(1.6, 1.0, 0.8, -17.5, 2.2, f, deck);
  box(1.6, 1.0, 0.8, -17.5, 3.5, f, deck);
  box(1.6, 1.0, 0.8, -17.5, 2.8, f + 0.8, deck);

  /* earth berms on the flanks, stepped courses */
  function berm(y) {
    var s = y > 0 ? 1 : -1;
    box(34, 7.0, 1.0, -2, y, 0, earth);
    box(31, 5.2, 0.9, -2, y - s * 0.5, 1.0, earth);
    box(27, 3.4, 0.8, -2, y - s * 1.0, 1.9, earth);
    box(22, 1.8, 0.6, -2, y - s * 1.4, 2.7, earth);
  }
  berm(14.5);
  berm(-14.5);

  return g;
} };

BLD_MODELS["arty"] = { build: function (THREE, M, C) {
  var g = new THREE.Group();
  var conc = new THREE.MeshStandardMaterial({ color: 0x8a8d86, metalness: 0.2, roughness: 0.7 });
  var deck = new THREE.MeshStandardMaterial({ color: 0x4b5054, metalness: 0.35, roughness: 0.55 });
  var earth = new THREE.MeshStandardMaterial({ color: 0x4a5240, metalness: 0.2, roughness: 0.7, side: THREE.DoubleSide });
  var timber = new THREE.MeshStandardMaterial({ color: 0x9a8f6d, metalness: 0.2, roughness: 0.7, side: THREE.DoubleSide });
  var team = new THREE.MeshStandardMaterial({ color: C.team, metalness: 0.3, roughness: 0.6 });

  function box(sx, sy, sz, x, y, z, mat, rz) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(x, y, z + sz / 2);
    if (rz) { m.rotation.z = rz; }
    g.add(m);
    return m;
  }
  function tube(rt, rb, h, seg, x, y, z, mat, open) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open), mat);
    m.rotation.x = Math.PI / 2;
    m.position.set(x, y, z + h / 2);
    g.add(m);
    return m;
  }

  var BH = 2.2;   /* berm height */

  /* pit floor - gravel */
  tube(9.6, 9.6, 0.18, 40, 0, 0, 0, deck);

  /* earth berm ring: outer slope, inner slope, flat crown */
  tube(12.8, 16.4, BH, 40, 0, 0, 0, earth, true);
  tube(11.2, 9.4, BH, 40, 0, 0, 0, earth, true);
  var crown = new THREE.Mesh(new THREE.RingGeometry(11.2, 12.8, 40, 1), earth);
  crown.position.z = BH;
  g.add(crown);
  /* spoil piles on the outer slope */
  for (var s = 0; s < 6; s++) {
    var sa = s * Math.PI / 3 + 0.3;
    var pile = new THREE.Mesh(new THREE.ConeGeometry(2.2, 1.5, 8), earth);
    pile.rotation.x = Math.PI / 2;
    pile.position.set(Math.cos(sa) * 15.2, Math.sin(sa) * 15.2, 0.75);
    g.add(pile);
  }

  /* timber revetting on the inner face of the berm */
  tube(9.35, 9.5, BH * 0.95, 40, 0, 0, 0.05, timber, true);
  for (var p = 0; p < 16; p++) {
    var pa = p * Math.PI / 8;
    var post = box(0.28, 0.28, BH + 0.25, Math.cos(pa) * 9.2, Math.sin(pa) * 9.2, 0, timber, pa);
    post.rotation.z = pa;
  }
  /* top waling beams, laid as a rough polygon */
  for (var q = 0; q < 16; q++) {
    var qa = q * Math.PI / 8 + Math.PI / 16;
    var beam = box(0.22, 3.7, 0.3, Math.cos(qa) * 9.3, Math.sin(qa) * 9.3, BH + 0.2, timber);
    beam.rotation.z = qa;
  }

  /* central concrete firing platform - centre kept clear and low */
  tube(4.3, 4.6, 0.42, 32, 0, 0, 0.1, conc);
  var pin = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.13, 6, 24), deck);
  pin.position.set(0, 0, 0.55);
  g.add(pin);
  for (var h = 0; h < 6; h++) {
    var ha = h * Math.PI / 3;
    box(0.55, 0.55, 0.28, Math.cos(ha) * 3.5, Math.sin(ha) * 3.5, 0.52, deck, ha);
  }
  box(3.0, 0.3, 0.06, 0, -3.9, 0.52, team);   /* painted azimuth stripe */

  /* recoil spade recesses at the rear of the pit */
  box(4.4, 2.0, 0.32, -6.6, 2.6, 0.0, deck, 0.35);
  box(4.4, 2.0, 0.32, -6.6, -2.6, 0.0, deck, -0.35);
  box(1.6, 1.2, 0.5, -8.6, 2.9, 0.0, timber, 0.35);
  box(1.6, 1.2, 0.5, -8.6, -2.9, 0.0, timber, -0.35);

  /* pyramid stack of shells */
  var sx0 = 5.6, sy0 = -5.6, sp = 0.46;
  var tiers = [3, 2, 1];
  for (var t = 0; t < tiers.length; t++) {
    var n = tiers[t];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        var ox = (i - (n - 1) / 2) * sp;
        var oy = (j - (n - 1) / 2) * sp;
        var zb = 0.18 + t * 0.92;
        var body = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.72, 8), deck);
        body.rotation.x = Math.PI / 2;
        body.position.set(sx0 + ox, sy0 + oy, zb + 0.36);
        g.add(body);
        var nose = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.2, 8), team);
        nose.rotation.x = Math.PI / 2;
        nose.position.set(sx0 + ox, sy0 + oy, zb + 0.82);
        g.add(nose);
      }
    }
  }

  /* propellant canisters in a rack */
  box(3.4, 1.8, 0.25, 5.8, -0.6, 0, timber);
  for (var c2 = 0; c2 < 8; c2++) {
    var cr = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 1.5, 10), earth);
    cr.rotation.z = Math.PI / 2;
    cr.position.set(5.0 + (c2 % 4) * 0.52, -0.6 + (c2 < 4 ? 0 : 0.5), 0.25 + (c2 < 4 ? 0.24 : 0.7));
    g.add(cr);
  }

  /* camouflage net on poles over one side of the pit */
  var poles = [[-2.5, 8.4], [-8.0, 4.2], [-2.0, 3.0], [-6.5, 0.5]];
  var pz = [2.7, 2.7, 2.2, 2.2];
  for (var k = 0; k < poles.length; k++) {
    var pl = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, pz[k], 6), timber);
    pl.rotation.x = Math.PI / 2;
    pl.position.set(poles[k][0], poles[k][1], pz[k] / 2);
    g.add(pl);
  }
  var netG = new THREE.BufferGeometry();
  var vp = new Float32Array([
    -2.5, 8.4, 2.7, -8.0, 4.2, 2.7, -2.0, 3.0, 2.2,
    -8.0, 4.2, 2.7, -6.5, 0.5, 2.2, -2.0, 3.0, 2.2,
    -2.5, 8.4, 2.7, -2.0, 3.0, 2.2, 1.0, 5.6, 1.9,
    -8.0, 4.2, 2.7, -2.5, 8.4, 2.7, -7.4, 8.6, 1.8
  ]);
  netG.setAttribute("position", new THREE.BufferAttribute(vp, 3));
  netG.computeVertexNormals();
  var net = new THREE.Mesh(netG, new THREE.MeshStandardMaterial({
    color: 0x4a5240, metalness: 0.2, roughness: 0.75, side: THREE.DoubleSide
  }));
  g.add(net);

  return g;
} };

/* ======================= missile-boat skins =======================
   warship3d.js paints every parametric hull with a plate patchwork,
   frame and strake seams, rust weeping from the freeing ports, a boot
   topping on the waterline and soot down the funnel. These five
   hand-built boats carried no maps at all, so they sat in the same
   line-up looking like flat plastic.

   Everything here is lifted straight from that layer so the two sit
   together: the same four tins, the same weathering that scales with
   how dark the scheme is, the same three material tiers, and the same
   decode discipline -- colours are written as design-intent sRGB and
   turned to linear exactly ONCE in mat(), which stamps _srgbDone so
   render3d.js prepModel() does not do it again. cmp.html decodes
   nothing of its own, so what the comparison sheet shows is what the
   game shows.

   The one thing warship3d.js does with geometry and this file cannot:
   its waterline is a second loft. Here the hull is a single closed
   tube whose v runs around the section -- 0.25 is the deck edge, 0.75
   the keel, and the waterline crosses at about v = 0.02 and 0.48 for
   every one of these five. Painting the boot topping and the
   anti-fouling into those bands buys the same crisp waterline without
   touching a vertex.                                                 */
var MBSkin = (function () {
  "use strict";

  /* the same tins warship3d.js opens, deep enough to stay off the flat
     top of the ACES shoulder */
  var PAINT = {
    haze:     { hull: 0x7e868d, sup: 0x8b9299, deck: 0x50565c },
    darkgrey: { hull: 0x2d3339, sup: 0x353c42, deck: 0x1f2428 },
    bluegrey: { hull: 0x37536a, sup: 0x405e77, deck: 0x27384a },
    green:    { hull: 0x3a4732, sup: 0x43513b, deck: 0x272e21 }
  };

  var TEX = {};

  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  /* pull a neutral fitting part way toward the scheme, so the masts,
     canisters and gun houses read as one paint job with the hull */
  function mix(a, b, k) {
    var ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
    var br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
    return ((Math.round(ar + (br - ar) * k) << 16) |
            (Math.round(ag + (bg - ag) * k) << 8) |
             Math.round(ab + (bb - ab) * k)) >>> 0;
  }
  function lin(THREE, c) {
    var col = new THREE.Color(c);
    if (col.convertSRGBToLinear) col.convertSRGBToLinear();
    return col;
  }
  /* r148 ships SRGBColorSpace but Texture.colorSpace is inert until r152 */
  function srgb(THREE, t) {
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }
  function mat(THREE, c, r, m, map) {
    var o = { color: lin(THREE, c), roughness: r, metalness: m };
    if (map) o.map = map;
    var mt = new THREE.MeshStandardMaterial(o);
    mt.userData._srgbDone = true;
    return mt;
  }

  function hullTex(THREE, camo) {
    var key = "hull_" + camo;
    if (TEX[key] !== undefined) return TEX[key];
    try {
      var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), i;
      var P = PAINT[camo] || PAINT.haze;
      var R = rngOf(camo.length * 9173 + 41);
      var boot = Math.round(H * 0.045);
      var wl0 = Math.round(H * 0.520), wl1 = Math.round(H * 0.980);

      /* weathering is a FRACTION of the paint: a rust streak strong
         enough to read on haze grey is a brown highlight on darkgrey */
      var lum = (((P.hull >> 16) & 255) * 0.2126 + ((P.hull >> 8) & 255) * 0.7152 +
                 (P.hull & 255) * 0.0722) / 255;
      var wear = 0.42 + 0.58 * lum;

      g.fillStyle = hx(P.hull); g.fillRect(0, 0, W, H);
      /* plate patchwork: adjacent strakes never weather to the same tone */
      var lite = hx(mix(P.hull, 0xffffff, 0.34));
      for (i = 0; i < 74; i++) {
        g.globalAlpha = (0.05 + R() * 0.06) * wear;
        g.fillStyle = R() < 0.5 ? lite : "#000000";
        g.fillRect(R() * W, R() * H, 40 + R() * 150, 10 + R() * 34);
      }
      g.globalAlpha = 1;
      /* frame and strake seams */
      g.strokeStyle = "rgba(0,0,0," + (0.30 * wear).toFixed(3) + ")"; g.lineWidth = 1.4;
      for (i = 1; i < 40; i++) {
        g.beginPath(); g.moveTo(i * W / 40, 0); g.lineTo(i * W / 40, H); g.stroke();
      }
      g.lineWidth = 1;
      for (i = 1; i < 16; i++) {
        g.beginPath(); g.moveTo(0, i * H / 16); g.lineTo(W, i * H / 16); g.stroke();
      }
      /* anti-fouling below the waterline, the plating still showing */
      g.globalAlpha = 0.90; g.fillStyle = "#3a231f";
      g.fillRect(0, 0, W, wl0);
      g.fillRect(0, wl1, W, H - wl1);
      /* boot topping: a hard stripe sitting on the waterline itself */
      g.globalAlpha = 0.94; g.fillStyle = "#15181b";
      g.fillRect(0, wl0, W, boot);
      g.fillRect(0, wl1 - boot, W, boot);
      g.globalAlpha = 1;
      /* rust weeping out of the freeing ports, running to the waterline */
      g.globalAlpha = 0.15 * wear; g.fillStyle = "#4a3324";
      for (i = 0; i < 70; i++) {
        var y = H * 0.600 + R() * H * 0.300, ln = 8 + R() * 34;
        g.fillRect(R() * W, R() < 0.5 ? y : y - ln, 2 + R() * 4, ln);
      }
      g.globalAlpha = 1;

      var t = srgb(THREE, new THREE.CanvasTexture(cv));
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;   /* v carries the waterline */
      t.repeat.set(2, 1);
      t.anisotropy = 8;
      TEX[key] = t;
    } catch (e) { TEX[key] = null; }
    return TEX[key];
  }

  /* neutral, so the material colour supplies the scheme */
  function plateTex(THREE) {
    if (TEX.plate !== undefined) return TEX.plate;
    try {
      var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
      var R = rngOf(2287), i, x, y;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
      g.globalAlpha = 0.22; g.strokeStyle = "#000000"; g.lineWidth = 1.6;
      for (i = 1; i < 6; i++) {
        g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
        g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
      }
      g.globalAlpha = 0.10;
      for (i = 0; i < 26; i++) {
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * W, R() * H, 18 + R() * 60, 12 + R() * 40);
      }
      /* scuttles and watertight doors, small enough to read as texture */
      g.globalAlpha = 0.34; g.fillStyle = "#000000";
      for (i = 0; i < 22; i++) {
        x = R() * W; y = R() * H;
        g.beginPath(); g.arc(x, y, 2.6 + R() * 2, 0, 6.29); g.fill();
      }
      /* exhaust smut, drawn down from the top edge of the face */
      g.globalAlpha = 0.10; g.fillStyle = "#000000";
      for (i = 0; i < 20; i++) g.fillRect(R() * W, 0, 3 + R() * 9, H * (0.10 + R() * 0.22));
      g.globalAlpha = 1;

      var t = srgb(THREE, new THREE.CanvasTexture(cv));
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = 8;
      TEX.plate = t;
    } catch (e) { TEX.plate = null; }
    return TEX.plate;
  }

  /* the deck slab is an extrusion, so its cap UVs are raw metres: a
     small repeat is what turns them into non-skid panels of a sane size */
  function deckTex(THREE) {
    if (TEX.deck !== undefined) return TEX.deck;
    try {
      var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
      var R = rngOf(6151), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
      for (i = 0; i < 40; i++) {
        g.globalAlpha = 0.06 + R() * 0.07;
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * W, R() * H, 20 + R() * 80, 14 + R() * 60);
      }
      g.globalAlpha = 0.30; g.strokeStyle = "#000000"; g.lineWidth = 2;
      for (i = 1; i < 8; i++) {
        g.beginPath(); g.moveTo(0, i * H / 8); g.lineTo(W, i * H / 8); g.stroke();
        g.beginPath(); g.moveTo(i * W / 8, 0); g.lineTo(i * W / 8, H); g.stroke();
      }
      /* non-skid grit */
      g.globalAlpha = 0.28; g.fillStyle = "#000000";
      for (i = 0; i < 900; i++) g.fillRect(R() * W, R() * H, 2, 2);
      g.globalAlpha = 1;

      var t = srgb(THREE, new THREE.CanvasTexture(cv));
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(0.12, 0.12);
      t.anisotropy = 8;
      TEX.deck = t;
    } catch (e) { TEX.deck = null; }
    return TEX.deck;
  }

  /* the team flash is fresh paint over the same plating: seams and a
     little mottling, none of the rust and none of the scuttles */
  function paintTex(THREE) {
    if (TEX.paint !== undefined) return TEX.paint;
    try {
      var W = 128, H = 128, cv = cvs(W, H), g = cv.getContext("2d");
      var R = rngOf(881), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
      for (i = 0; i < 22; i++) {
        g.globalAlpha = 0.05 + R() * 0.05;
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * W, R() * H, 12 + R() * 40, 8 + R() * 26);
      }
      g.globalAlpha = 0.18; g.strokeStyle = "#000000"; g.lineWidth = 1.4;
      for (i = 1; i < 3; i++) {
        g.beginPath(); g.moveTo(0, i * H / 3); g.lineTo(W, i * H / 3); g.stroke();
      }
      g.globalAlpha = 1;
      var t = srgb(THREE, new THREE.CanvasTexture(cv));
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = 4;
      TEX.paint = t;
    } catch (e) { TEX.paint = null; }
    return TEX.paint;
  }

  /* Three tiers, the same three warship3d.js uses: textured SKIN at
     roughness 0.84-0.93 and metalness at or under 0.10, and untextured
     METAL for the masts, barrels and launcher ironwork.               */
  function set(THREE, camo, C) {
    var P = PAINT[camo] || PAINT.haze;
    var hull = hullTex(THREE, camo), plate = plateTex(THREE);
    return {
      hull: mat(THREE, hull ? 0xffffff : P.hull, 0.86, 0.08, hull),
      sup:  mat(THREE, P.sup, 0.84, 0.09, plate),
      deck: mat(THREE, P.deck, 0.90, 0.07, deckTex(THREE)),
      eqp:  mat(THREE, mix(0x51575c, P.deck, 0.50), 0.85, 0.09, plate),
      dark: mat(THREE, mix(0x1e2226, P.hull, 0.30), 0.62, 0.42),
      team: mat(THREE, (C && C.team) || 0x3f7fd0, 0.84, 0.06, paintTex(THREE))
    };
  }

  return { set: set, PAINT: PAINT };
})();

UNIT_MODELS["missileboat_n"] = { len: 58, build: function (THREE, M, C) {
  var g = new THREE.Group();
  /* skin, plating, deck and equipment out of the shared boat paint
     locker so this hull matches the parametric ships beside it */
  var MB = MBSkin.set(THREE, "haze", C);
  var mHull = MB.hull, mSup = MB.sup, mDeck = MB.deck;
  var mEqp = MB.eqp, mTeam = MB.team;
  var mDark = MB.dark;
  function taperGeo(l, w, h, taper) {
    var geo = new THREE.CylinderGeometry(0.707 * taper, 0.707, 1, 4);
    geo.rotateY(Math.PI / 4); geo.rotateX(Math.PI / 2); geo.scale(l, w, h);
    return geo;
  }
  var hull = new THREE.Mesh(M.loft(THREE, [
    { x: -29, w: 3.5, h: 2.4, zc: -0.5, sq: 0.85 },
    { x: -22, w: 3.9, h: 2.4, zc: -0.45, sq: 0.85 },
    { x: -10, w: 4.0, h: 2.5, zc: -0.35, sq: 0.82 },
    { x: 2, w: 3.9, h: 2.6, zc: -0.25, sq: 0.8 },
    { x: 13, w: 3.4, h: 2.7, zc: -0.05, sq: 0.78 },
    { x: 22, w: 2.2, h: 2.9, zc: 0.15, sq: 0.76 },
    { x: 27, w: 1.0, h: 3.0, zc: 0.3, sq: 0.75 },
    { x: 29, w: 0.25, h: 3.0, zc: 0.4, sq: 0.75 }
  ], 3), mHull);
  g.add(hull);
  var deck = new THREE.Mesh(M.slab(THREE, [
    [29, 0.2], [22, 2.2], [13, 3.4], [2, 3.9], [-10, 4.0], [-22, 3.9], [-29, 3.5],
    [-29, -3.5], [-22, -3.9], [-10, -4.0], [2, -3.9], [13, -3.4], [22, -2.2], [29, -0.2]
  ], 0.22), mDeck);
  deck.position.z = 2.25; g.add(deck);

  var sh = new THREE.Mesh(taperGeo(13.0, 6.0, 2.6, 0.72), mSup);
  sh.position.set(7.5, 0, 3.6); g.add(sh);
  var br = new THREE.Mesh(taperGeo(4.6, 4.2, 1.7, 0.78), mSup);
  br.position.set(9.0, 0, 5.7); g.add(br);
  var wind = new THREE.Mesh(taperGeo(4.7, 4.3, 0.85, 0.8), mDark);
  wind.position.set(9.1, 0, 6.05); g.add(wind);
  var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.26, 6.0, 8), mDark);
  mast.rotation.x = Math.PI / 2; mast.position.set(4.5, 0, 9.4); g.add(mast);
  var yard = new THREE.Mesh(new THREE.BoxGeometry(0.5, 4.2, 0.18), mDark);
  yard.position.set(4.5, 0, 10.5); g.add(yard);
  var rdm = new THREE.Mesh(new THREE.SphereGeometry(1.0, 12, 8), mEqp);
  rdm.scale.set(1.0, 1.0, 0.75); rdm.position.set(4.5, 0, 12.6); g.add(rdm);

  function quadRack(side) {
    var r = new THREE.Group();
    var can = new THREE.BoxGeometry(4.9, 0.62, 0.62);
    var off = [[-0.34, -0.34], [0.34, -0.34], [-0.34, 0.34], [0.34, 0.34]];
    for (var i = 0; i < 4; i++) {
      var c = new THREE.Mesh(can, mEqp);
      c.position.set(0, off[i][0], off[i][1] + 0.55);
      r.add(c);
      var cap = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.66, 0.66), mDark);
      cap.position.set(2.5, off[i][0], off[i][1] + 0.55);
      r.add(cap);
    }
    var frame = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.6, 0.5), mDark);
    frame.position.set(-1.2, 0, 0.0); r.add(frame);
    var stripe = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.5, 0.12), mTeam);
    stripe.position.set(-1.2, 0, 0.28); r.add(stripe);
    r.rotation.set(0, -0.262, side * 0.38);
    return r;
  }
  var pr = quadRack(1); pr.position.set(-5.0, 1.9, 2.5); g.add(pr);
  var sr = quadRack(-1); sr.position.set(-5.0, -1.9, 2.5); g.add(sr);

  var bit = new THREE.Mesh(new THREE.BoxGeometry(3.0, 3.0, 0.9), mEqp);
  bit.position.set(-21.5, 0, 2.75); g.add(bit);
  return g;
} };

UNIT_MODELS["missileboat_p"] = { len: 56, build: function (THREE, M, C) {
  var g = new THREE.Group();
  /* skin, plating, deck and equipment out of the shared boat paint
     locker so this hull matches the parametric ships beside it */
  var MB = MBSkin.set(THREE, "darkgrey", C);
  var mHull = MB.hull, mSup = MB.sup, mDeck = MB.deck;
  var mEqp = MB.eqp, mTeam = MB.team;
  var mDark = MB.dark;
  var hull = new THREE.Mesh(M.loft(THREE, [
    { x: -28, w: 4.4, h: 2.6, zc: -0.6, sq: 0.86 },
    { x: -20, w: 5.0, h: 2.7, zc: -0.55, sq: 0.85 },
    { x: -8, w: 5.1, h: 2.8, zc: -0.4, sq: 0.83 },
    { x: 4, w: 4.9, h: 2.9, zc: -0.25, sq: 0.8 },
    { x: 15, w: 4.0, h: 3.1, zc: 0.0, sq: 0.78 },
    { x: 23, w: 2.4, h: 3.3, zc: 0.25, sq: 0.76 },
    { x: 28, w: 0.3, h: 3.4, zc: 0.5, sq: 0.75 }
  ], 3), mHull);
  g.add(hull);
  var deck = new THREE.Mesh(M.slab(THREE, [
    [28, 0.25], [23, 2.4], [15, 4.0], [4, 4.9], [-8, 5.1], [-20, 5.0], [-28, 4.4],
    [-28, -4.4], [-20, -5.0], [-8, -5.1], [4, -4.9], [15, -4.0], [23, -2.4], [28, -0.25]
  ], 0.24), mDeck);
  deck.position.z = 2.5; g.add(deck);

  var dh = new THREE.Mesh(new THREE.BoxGeometry(17.0, 7.2, 2.9), mSup);
  dh.position.set(3.0, 0, 4.05); g.add(dh);
  var dh2 = new THREE.Mesh(new THREE.BoxGeometry(9.0, 6.0, 2.2), mSup);
  dh2.position.set(6.0, 0, 6.6); g.add(dh2);
  var bw = new THREE.Mesh(new THREE.BoxGeometry(6.4, 6.1, 1.0), mDark);
  bw.position.set(7.6, 0, 7.2); g.add(bw);
  var stripe = new THREE.Mesh(new THREE.BoxGeometry(2.2, 7.3, 0.5), mTeam);
  stripe.position.set(-4.0, 0, 4.6); g.add(stripe);
  var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.34, 7.5, 8), mDark);
  mast.rotation.x = Math.PI / 2; mast.position.set(0.5, 0, 11.4); g.add(mast);
  var yard = new THREE.Mesh(new THREE.BoxGeometry(0.55, 5.0, 0.2), mDark);
  yard.position.set(0.5, 0, 12.6); g.add(yard);
  var rad = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.6, 1.5), mEqp);
  rad.position.set(0.5, 0, 14.6); g.add(rad);
  var dome = new THREE.Mesh(new THREE.SphereGeometry(1.3, 12, 8), mEqp);
  dome.scale.set(1.0, 1.0, 0.8); dome.position.set(-6.5, 0, 6.0); g.add(dome);

  function bigTube(side, x) {
    var t = new THREE.Group();
    var body = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 9.0, 14), mEqp);
    body.rotation.z = -Math.PI / 2; t.add(body);
    var muzzle = new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.02, 0.5, 14), mDark);
    muzzle.rotation.z = -Math.PI / 2; muzzle.position.x = 4.5; t.add(muzzle);
    var back = new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.02, 0.5, 14), mDark);
    back.rotation.z = -Math.PI / 2; back.position.x = -4.5; t.add(back);
    var cr1 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.4, 1.6), mDark);
    cr1.position.set(3.0, 0, -1.1); t.add(cr1);
    var cr2 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.4, 1.6), mDark);
    cr2.position.set(-3.0, 0, -1.1); t.add(cr2);
    t.rotation.set(0, -0.14, side * 0.20);
    t.position.set(x, side * 3.5, 3.9);
    return t;
  }
  g.add(bigTube(1, -8.5)); g.add(bigTube(1, 2.5));
  g.add(bigTube(-1, -8.5)); g.add(bigTube(-1, 2.5));

  var gb = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.45, 1.0, 12), mEqp);
  gb.rotation.x = Math.PI / 2; gb.position.set(19.5, 0, 3.2); g.add(gb);
  var gs = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.1, 1.3, 10), mSup);
  gs.rotation.x = Math.PI / 2; gs.position.set(19.5, 0, 4.2); g.add(gs);
  var gbar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 3.4, 8), mDark);
  gbar.rotation.z = -Math.PI / 2; gbar.position.set(21.6, 0, 4.5); g.add(gbar);
  return g;
} };

UNIT_MODELS["missileboat_c"] = { len: 42.6, build: function (THREE, M, C) {
  var g = new THREE.Group();
  /* skin, plating, deck and equipment out of the shared boat paint
     locker so this hull matches the parametric ships beside it */
  var MB = MBSkin.set(THREE, "bluegrey", C);
  var mHull = MB.hull, mSup = MB.sup, mDeck = MB.deck;
  var mEqp = MB.eqp, mTeam = MB.team;
  var mDark = MB.dark;
  function taperGeo(l, w, h, taper) {
    var geo = new THREE.CylinderGeometry(0.707 * taper, 0.707, 1, 4);
    geo.rotateY(Math.PI / 4); geo.rotateX(Math.PI / 2); geo.scale(l, w, h);
    return geo;
  }
  var hullSec = [
    { x: -21.3, w: 1.55, h: 2.0, zc: -0.5, sq: 0.85 },
    { x: -14, w: 1.75, h: 2.0, zc: -0.5, sq: 0.85 },
    { x: -2, w: 1.75, h: 2.1, zc: -0.45, sq: 0.83 },
    { x: 8, w: 1.6, h: 2.1, zc: -0.4, sq: 0.8 },
    { x: 16, w: 1.15, h: 2.0, zc: -0.45, sq: 0.78 },
    { x: 20, w: 0.5, h: 1.85, zc: -0.55, sq: 0.76 },
    { x: 21.3, w: 0.12, h: 1.7, zc: -0.6, sq: 0.75 }
  ];
  for (var s = -1; s <= 1; s += 2) {
    var h = new THREE.Mesh(M.loft(THREE, hullSec, 3), mHull);
    h.position.y = s * 4.4; g.add(h);
  }
  var deck = new THREE.Mesh(M.slab(THREE, [
    [20, 0.6], [16, 2.6], [8, 5.2], [-2, 6.1], [-21.3, 6.1],
    [-21.3, -6.1], [-2, -6.1], [8, -5.2], [16, -2.6], [20, -0.6]
  ], 0.3), mDeck);
  deck.position.z = 1.55; g.add(deck);
  var bridgeDeck = new THREE.Mesh(new THREE.BoxGeometry(24.0, 11.4, 1.1), mSup);
  bridgeDeck.position.set(-6.5, 0, 2.3); g.add(bridgeDeck);

  var sh = new THREE.Mesh(taperGeo(14.0, 9.6, 3.2, 0.6), mSup);
  sh.position.set(2.0, 0, 4.4); g.add(sh);
  var sh2 = new THREE.Mesh(taperGeo(6.6, 5.4, 2.0, 0.62), mSup);
  sh2.position.set(3.2, 0, 6.9); g.add(sh2);
  var wind = new THREE.Mesh(taperGeo(6.7, 5.5, 0.9, 0.68), mDark);
  wind.position.set(3.3, 0, 7.3); g.add(wind);
  var mast = new THREE.Mesh(taperGeo(2.6, 2.6, 5.2, 0.35), mSup);
  mast.position.set(1.0, 0, 10.4); g.add(mast);
  var stripe = new THREE.Mesh(new THREE.BoxGeometry(1.6, 9.7, 0.6), mTeam);
  stripe.position.set(-3.6, 0, 4.0); g.add(stripe);

  var lb = new THREE.Group();
  var body = new THREE.Mesh(new THREE.BoxGeometry(7.2, 5.6, 2.6), mEqp);
  lb.add(body);
  var cell = new THREE.BoxGeometry(1.5, 1.5, 0.24);
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 2; j++) {
      var c = new THREE.Mesh(cell, mDark);
      c.position.set(-2.55 + i * 1.7, (j === 0 ? -1.35 : 1.35), 1.4);
      lb.add(c);
    }
  }
  var rim = new THREE.Mesh(new THREE.BoxGeometry(7.4, 5.8, 0.3), mEqp);
  rim.position.z = 1.15; lb.add(rim);
  lb.position.set(-11.5, 0, 4.15);
  lb.rotation.y = -0.09;
  g.add(lb);

  var gun = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.0, 1.0, 10), mEqp);
  gun.rotation.x = Math.PI / 2; gun.position.set(12.5, 0, 2.35); g.add(gun);
  var gbar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 2.4, 8), mDark);
  gbar.rotation.z = -Math.PI / 2; gbar.position.set(14.2, 0, 2.6); g.add(gbar);
  return g;
} };

UNIT_MODELS["missileboat_k"] = { len: 40, build: function (THREE, M, C) {
  var g = new THREE.Group();
  /* skin, plating, deck and equipment out of the shared boat paint
     locker so this hull matches the parametric ships beside it */
  var MB = MBSkin.set(THREE, "green", C);
  var mHull = MB.hull, mSup = MB.sup, mDeck = MB.deck;
  var mEqp = MB.eqp, mTeam = MB.team;
  var mDark = MB.dark;
  var hull = new THREE.Mesh(M.loft(THREE, [
    { x: -20, w: 3.2, h: 2.2, zc: -0.5, sq: 0.88 },
    { x: -13, w: 3.6, h: 2.3, zc: -0.45, sq: 0.87 },
    { x: -4, w: 3.75, h: 2.4, zc: -0.35, sq: 0.85 },
    { x: 5, w: 3.5, h: 2.5, zc: -0.2, sq: 0.82 },
    { x: 13, w: 2.7, h: 2.7, zc: 0.05, sq: 0.8 },
    { x: 18, w: 1.4, h: 2.9, zc: 0.3, sq: 0.78 },
    { x: 20, w: 0.25, h: 3.0, zc: 0.45, sq: 0.78 }
  ], 3), mHull);
  g.add(hull);
  var deck = new THREE.Mesh(M.slab(THREE, [
    [20, 0.2], [18, 1.4], [13, 2.7], [5, 3.5], [-4, 3.75], [-13, 3.6], [-20, 3.2],
    [-20, -3.2], [-13, -3.6], [-4, -3.75], [5, -3.5], [13, -2.7], [18, -1.4], [20, -0.2]
  ], 0.22), mDeck);
  deck.position.z = 2.2; g.add(deck);

  var dh = new THREE.Mesh(new THREE.BoxGeometry(9.5, 5.4, 2.2), mSup);
  dh.position.set(2.0, 0, 3.4); g.add(dh);
  var wh = new THREE.Mesh(new THREE.BoxGeometry(4.4, 4.4, 2.0), mSup);
  wh.position.set(4.2, 0, 5.5); g.add(wh);
  var wind = new THREE.Mesh(new THREE.BoxGeometry(4.5, 4.5, 0.8), mDark);
  wind.position.set(4.25, 0, 5.9); g.add(wind);
  var stripe = new THREE.Mesh(new THREE.BoxGeometry(1.3, 5.5, 0.5), mTeam);
  stripe.position.set(-1.6, 0, 3.9); g.add(stripe);
  var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 5.4, 8), mDark);
  mast.rotation.x = Math.PI / 2; mast.position.set(1.5, 0, 7.2); g.add(mast);
  var yard = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.4, 0.16), mDark);
  yard.position.set(1.5, 0, 8.6); g.add(yard);
  var rdm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.4, 1.0), mEqp);
  rdm.position.set(1.5, 0, 10.0); g.add(rdm);

  function boxLauncher(side) {
    var b = new THREE.Group();
    var body = new THREE.Mesh(new THREE.BoxGeometry(9.0, 2.9, 2.9), mEqp);
    b.add(body);
    var lid = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.5, 0.9), mEqp);
    lid.position.set(-1.0, 0, 1.7); b.add(lid);
    var mouth = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.5, 2.5), mDark);
    mouth.position.set(4.5, 0, 0); b.add(mouth);
    var rail = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.3, 0.3), mDark);
    rail.position.set(0, 0, -1.5); b.add(rail);
    var ped = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.6, 1.2), mDark);
    ped.position.set(-1.0, 0, -2.0); b.add(ped);
    b.rotation.set(0, -0.14, side * 0.30);
    b.position.set(-9.0, side * 1.7, 4.1);
    return b;
  }
  g.add(boxLauncher(1)); g.add(boxLauncher(-1));

  var gb = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.1, 0.8, 10), mEqp);
  gb.rotation.x = Math.PI / 2; gb.position.set(13.5, 0, 2.7); g.add(gb);
  var gs = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.0, 1.1), mSup);
  gs.position.set(13.5, 0, 3.6); g.add(gs);
  for (var k = -1; k <= 1; k += 2) {
    var bar = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 2.8, 8), mDark);
    bar.rotation.z = -Math.PI / 2; bar.position.set(15.4, k * 0.42, 3.9); g.add(bar);
  }
  return g;
} };

UNIT_MODELS["missileboat_r"] = { len: 60, build: function (THREE, M, C) {
  var g = new THREE.Group();
  /* skin, plating, deck and equipment out of the shared boat paint
     locker so this hull matches the parametric ships beside it */
  var MB = MBSkin.set(THREE, "haze", C);
  var mHull = MB.hull, mSup = MB.sup, mDeck = MB.deck;
  var mEqp = MB.eqp, mTeam = MB.team;
  var mDark = MB.dark;
  function taperGeo(l, w, h, taper) {
    var geo = new THREE.CylinderGeometry(0.707 * taper, 0.707, 1, 4);
    geo.rotateY(Math.PI / 4); geo.rotateX(Math.PI / 2); geo.scale(l, w, h);
    return geo;
  }
  var hullSec = [
    { x: -30, w: 1.9, h: 2.4, zc: -0.6, sq: 0.86 },
    { x: -20, w: 2.05, h: 2.4, zc: -0.6, sq: 0.85 },
    { x: -6, w: 2.05, h: 2.5, zc: -0.55, sq: 0.83 },
    { x: 6, w: 1.9, h: 2.5, zc: -0.5, sq: 0.8 },
    { x: 18, w: 1.5, h: 2.5, zc: -0.5, sq: 0.78 },
    { x: 26, w: 0.7, h: 2.3, zc: -0.6, sq: 0.76 },
    { x: 30, w: 0.14, h: 2.1, zc: -0.7, sq: 0.75 }
  ];
  for (var s = -1; s <= 1; s += 2) {
    var h = new THREE.Mesh(M.loft(THREE, hullSec, 3), mHull);
    h.position.y = s * 5.0; g.add(h);
  }
  var deck = new THREE.Mesh(M.slab(THREE, [
    [27, 0.8], [18, 3.4], [6, 6.2], [-6, 7.0], [-30, 7.0],
    [-30, -7.0], [-6, -7.0], [6, -6.2], [18, -3.4], [27, -0.8]
  ], 0.32), mDeck);
  deck.position.z = 1.85; g.add(deck);
  var box = new THREE.Mesh(taperGeo(48.0, 13.4, 2.4, 0.86), mSup);
  box.position.set(-5.0, 0, 3.1); g.add(box);

  var sh = new THREE.Mesh(taperGeo(22.0, 11.0, 4.4, 0.58), mSup);
  sh.position.set(2.0, 0, 6.4); g.add(sh);
  var sh2 = new THREE.Mesh(taperGeo(8.6, 5.6, 2.4, 0.6), mSup);
  sh2.position.set(4.0, 0, 9.6); g.add(sh2);
  var wind = new THREE.Mesh(taperGeo(8.7, 5.7, 1.1, 0.66), mDark);
  wind.position.set(4.1, 0, 10.0); g.add(wind);
  var mast = new THREE.Mesh(taperGeo(3.4, 3.4, 6.4, 0.3), mSup);
  mast.position.set(0.5, 0, 14.0); g.add(mast);
  var funnel = new THREE.Mesh(taperGeo(4.0, 6.0, 2.4, 0.7), mSup);
  funnel.position.set(-8.5, 0, 9.8); g.add(funnel);
  var stripe = new THREE.Mesh(new THREE.BoxGeometry(1.8, 11.1, 0.7), mTeam);
  stripe.position.set(-6.5, 0, 5.6); g.add(stripe);

  function quadRack(side) {
    var r = new THREE.Group();
    var can = new THREE.BoxGeometry(7.4, 1.05, 1.05);
    var off = [[-0.56, -0.56], [0.56, -0.56], [-0.56, 0.56], [0.56, 0.56]];
    for (var i = 0; i < 4; i++) {
      var c = new THREE.Mesh(can, mEqp);
      c.position.set(0, off[i][0], off[i][1] + 0.9);
      r.add(c);
      var cap = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.1, 1.1), mDark);
      cap.position.set(3.8, off[i][0], off[i][1] + 0.9);
      r.add(cap);
    }
    var cradle = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.6, 0.9), mDark);
    cradle.position.set(-2.0, 0, 0.1); r.add(cradle);
    r.rotation.set(0, -0.27, side * 0.30);
    return r;
  }
  var pr = quadRack(1); pr.position.set(-14.0, 3.0, 4.3); g.add(pr);
  var sr = quadRack(-1); sr.position.set(-14.0, -3.0, 4.3); g.add(sr);

  var gb = new THREE.Mesh(taperGeo(3.6, 3.0, 1.0, 0.75), mEqp);
  gb.position.set(15.0, 0, 3.9); g.add(gb);
  var gs = new THREE.Mesh(taperGeo(3.0, 2.4, 1.6, 0.55), mSup);
  gs.position.set(15.0, 0, 5.2); g.add(gs);
  var gbar = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 3.6, 8), mDark);
  gbar.rotation.z = -Math.PI / 2; gbar.position.set(17.6, 0, 5.5); g.add(gbar);
  return g;
} };
