/* ============ civ3d.js — civilian structures ============
   Ordinary buildings standing in the towns. They must read as background
   architecture rather than as anybody's base: no faction colour, no domes,
   no antennas. Low-rise concrete and glass, slightly varied so a street does
   not look stamped out, and short enough that they never hide the fighting. */
if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

BLD_MODELS["civblock"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    /* deterministic per-instance variety without Math.random, which the sim
       forbids: the caller passes nothing, so vary on a cheap counter */
    BLD_MODELS["civblock"]._n = (BLD_MODELS["civblock"]._n || 0) + 1;
    var seed = BLD_MODELS["civblock"]._n * 2654435761 % 997;
    function r(i) { return ((seed * (i + 7) * 16807) % 1000) / 1000; }

    var TILE = 32 * 0.34;                 // metres per tile in model space
    var W = 2 * TILE * 0.86, D = 2 * TILE * 0.86;

    var tones = [0xb9b2a4, 0xa8a396, 0xc2bcae, 0xada695, 0xc6c0b2];
    var wall = new THREE.MeshStandardMaterial({
      color: tones[(seed % tones.length)], roughness: 0.92, metalness: 0.02 });
    var trim = new THREE.MeshStandardMaterial({ color: 0x8e887c, roughness: 0.9 });
    var glass = new THREE.MeshStandardMaterial({
      color: 0x2b3a44, roughness: 0.25, metalness: 0.6 });
    var roofM = new THREE.MeshStandardMaterial({ color: 0x6f6a60, roughness: 0.95 });

    /* two or three storeys, occasionally a taller stair core */
    var floors = 2 + Math.floor(r(1) * 2);
    var fh = 3.1;
    var H = floors * fh;

    var body = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), wall);
    body.position.y = H / 2;
    g.add(body);

    /* a flat roof slab with a low parapet */
    var roof = new THREE.Mesh(new THREE.BoxGeometry(W * 1.04, 0.45, D * 1.04), roofM);
    roof.position.y = H + 0.2;
    g.add(roof);
    for (var s = -1; s <= 1; s += 2) {
      var pa = new THREE.Mesh(new THREE.BoxGeometry(W * 1.04, 0.7, 0.25), trim);
      pa.position.set(0, H + 0.6, s * D * 0.52); g.add(pa);
      var pb = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.7, D * 1.04), trim);
      pb.position.set(s * W * 0.52, H + 0.6, 0); g.add(pb);
    }

    /* window bands per storey, so the scale reads as a building */
    for (var f = 0; f < floors; f++) {
      var y = fh * f + fh * 0.62;
      for (var side = 0; side < 4; side++) {
        var horiz = side < 2;
        var len = (horiz ? W : D) * 0.80;
        var band = new THREE.Mesh(
          new THREE.BoxGeometry(horiz ? len : 0.16, fh * 0.34, horiz ? 0.16 : len), glass);
        band.position.set(horiz ? 0 : (side === 2 ? -1 : 1) * W * 0.505,
                          y,
                          horiz ? (side === 0 ? -1 : 1) * D * 0.505 : 0);
        g.add(band);
      }
    }

    /* a stair core or water tank on the roof, on some of them */
    if (r(3) > 0.45) {
      var core = new THREE.Mesh(new THREE.BoxGeometry(W * 0.28, 2.4, D * 0.28), wall);
      core.position.set((r(4) - 0.5) * W * 0.4, H + 1.4, (r(5) - 0.5) * D * 0.4);
      g.add(core);
    }
    if (r(6) > 0.6) {
      var tank = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 1.6, 10), trim);
      tank.position.set((r(7) - 0.5) * W * 0.5, H + 1.2, (r(8) - 0.5) * D * 0.5);
      g.add(tank);
    }
    /* a doorway so the front is obvious */
    var door = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.2, 0.18), trim);
    door.position.set(0, 1.1, D * 0.51);
    g.add(door);
    /* This block is authored with +Y up, but render3d.js stands every building
       model up with tpl.rotation.x = -PI/2 on the assumption of +Z up. Left as
       it was, every civilian block in every town lay on its side. Rotating the
       finished group back by the same quarter turn puts it upright. */
    var W2 = new THREE.Group();
    g.rotation.x = Math.PI / 2;
    W2.add(g);
    return W2;
  },
};

/* ---------------------------------------------------------------------------
   The wreck. Collapsed floors, a couple of standing wall stubs and a heap of
   spill, all low enough that it reads as flattened at a glance rather than as
   a shorter building.                                                        */
BLD_MODELS["civrubble"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var W = 2 * 8 * 0.92, D = 2 * 8 * 0.92;
    var seed = 20250821;
    function r() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
    var conc = new THREE.MeshStandardMaterial({ color: 0x8b877c, roughness: 0.99, metalness: 0.02 });
    var dust = new THREE.MeshStandardMaterial({ color: 0x9a948a, roughness: 1.0, metalness: 0 });
    var burnt = new THREE.MeshStandardMaterial({ color: 0x3b3733, roughness: 0.98, metalness: 0.03 });

    /* the spill of broken floor slabs filling the footprint */
    for (var i = 0; i < 22; i++) {
      var w = W * (0.14 + r() * 0.26), d = D * (0.12 + r() * 0.24), h = 0.4 + r() * 1.1;
      var m2 = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), r() < 0.25 ? burnt : conc);
      m2.position.set((r() - 0.5) * W * 0.78, h * 0.5, (r() - 0.5) * D * 0.78);
      m2.rotation.set((r() - 0.5) * 0.5, r() * Math.PI, (r() - 0.5) * 0.5);
      g.add(m2);
    }
    /* two wall stubs still standing at the corners */
    for (var k = 0; k < 2; k++) {
      var sx = k ? -1 : 1;
      var wall = new THREE.Mesh(new THREE.BoxGeometry(W * 0.30, 2.6 + r() * 1.4, 0.5), conc);
      wall.position.set(sx * W * 0.30, 1.5, sx * D * 0.40);
      wall.rotation.y = (r() - 0.5) * 0.3;
      g.add(wall);
    }
    /* a dust apron so the wreck sits into the ground */
    var apron = new THREE.Mesh(new THREE.BoxGeometry(W * 1.02, 0.12, D * 1.02), dust);
    apron.position.y = 0.06;
    g.add(apron);

    /* authored +Y up like the block it replaces, so stand it up to match */
    var WR = new THREE.Group();
    g.rotation.x = Math.PI / 2;
    WR.add(g);
    return WR;
  },
};
