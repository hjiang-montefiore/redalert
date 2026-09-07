/* ============ sonarnet_objects.js - the acoustic node itself ============

   One small static object drawn in modest numbers: a submarine-laid passive
   hydrophone node, moored to the bottom with a surface float carrying its
   radio downlink. Authored at real scale in the shared model space
   (+X front, +Y left, +Z up, metres) and left for the renderer to size - do
   not pre-inflate it here.

   GROUND CONVENTION, and it is the same one the sea mine uses: z = 0 is the
   WATERLINE, not the seabed. The node proper is a bottom object - a Mk 60
   CAPTOR capsule is 3.35 m long by 0.53 m diameter and stands anchored on the
   seafloor, and an ADS/TRAPS-class passive node is a squat ballasted body
   with a short hydrophone line above it - so everything except the float and
   its whip is authored BELOW the origin, where the water plane hides it
   exactly as it hides the sea mine's mooring cable. What the player actually
   sees is what an observer at sea would see: a small yellow float and a whip.
   Drawing the canister above water instead would be a picture of a thing that
   does not exist.

   Registered into NET_MODELS as .node and mirrored into UNIT_MODELS as
   "sonar_node" so the comparison harness can render it.

   Overall extents: 0.90 x 0.90 x 9.85 m, of which 1.45 m is above the
   waterline (float 0.55, whip 0.90) and the remaining 8.40 m is tether,
   canister and anchor pallet underwater. Materials are flat colours rather
   than canvases: at a fifth of a tile on screen a painted texture is a
   texture upload nobody can see.                                          */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }
if (typeof NET_MODELS === "undefined") { var NET_MODELS = {}; }

(function () {
  "use strict";

  var matCache = null;
  function mats(THREE) {
    if (matCache) return matCache;
    matCache = {
      /* Buoy yellow, pre-darkened for linear light the way mine_objects.js
         explains: a paint-chart hex fed to the shader unmapped arrives about
         four times too bright and burns out to white. */
      float: new THREE.MeshStandardMaterial({ color: 0x9a7414, roughness: 0.72, metalness: 0.05 }),
      band:  new THREE.MeshStandardMaterial({ color: 0x1a1a1c, roughness: 0.85, metalness: 0.05 }),
      whip:  new THREE.MeshStandardMaterial({ color: 0x2a2c2e, roughness: 0.6,  metalness: 0.2 }),
      cable: new THREE.MeshStandardMaterial({ color: 0x1d2124, roughness: 0.9,  metalness: 0.1 }),
      body:  new THREE.MeshStandardMaterial({ color: 0x3a4045, roughness: 0.55, metalness: 0.45 }),
      anchor:new THREE.MeshStandardMaterial({ color: 0x24282b, roughness: 0.95, metalness: 0.1 }),
    };
    return matCache;
  }

  var geoCache = null;
  function geos(THREE) {
    if (geoCache) return geoCache;
    geoCache = {
      /* float: a 0.90 m sphere flattened to sit low in the water, which is
         what a spar-topped surface unit does - a full sphere reads as a
         contact mine, and that is the one thing this must not be mistaken for */
      float: new THREE.SphereGeometry(0.45, 12, 8),
      band:  new THREE.CylinderGeometry(0.455, 0.455, 0.10, 12),
      whip:  new THREE.CylinderGeometry(0.02, 0.012, 0.90, 5),
      cable: new THREE.CylinderGeometry(0.035, 0.035, 4.60, 5),
      body:  new THREE.CylinderGeometry(0.265, 0.265, 3.30, 10),
      cap:   new THREE.SphereGeometry(0.265, 10, 6),
      anchor:new THREE.CylinderGeometry(0.80, 0.80, 0.35, 12),
    };
    return geoCache;
  }

  /* THREE's cylinders and spheres are built around +Y; this model space is
     +Z up, so anything with an axis is laid over once here rather than at
     every call site. */
  function upright(m) { m.rotation.x = Math.PI / 2; return m; }

  function buildNode(THREE, M, C) {
    var g = new THREE.Group(), gg = geos(THREE), mm = mats(THREE), m;

    /* ---- above the waterline: all the player ever sees ---- */
    m = new THREE.Mesh(gg.float, mm.float);
    m.position.set(0, 0, 0.18);
    m.scale.set(1, 1, 0.72);                       // 0.90 across, 0.65 tall
    g.add(m);
    /* one black band round the waterline, so the float reads as a marked
       object rather than a blob of colour at distance */
    m = upright(new THREE.Mesh(gg.band, mm.band));
    m.position.set(0, 0, 0.05);
    g.add(m);
    /* the downlink whip. This aerial is the whole reason an enemy ESM set
       finds a node at all, so it is worth the five triangles it costs. */
    m = upright(new THREE.Mesh(gg.whip, mm.whip));
    m.position.set(0, 0, 0.95);
    g.add(m);

    /* ---- below the waterline: hidden by the water plane in play, present
       so the object is honest in the model harness and in any cutaway ---- */
    m = upright(new THREE.Mesh(gg.cable, mm.cable));
    m.position.set(0, 0, -2.40);
    g.add(m);
    m = upright(new THREE.Mesh(gg.body, mm.body));
    m.position.set(0, 0, -6.35);                   // 3.30 long, CAPTOR-sized
    g.add(m);
    m = new THREE.Mesh(gg.cap, mm.body);
    m.position.set(0, 0, -4.70);
    m.scale.set(1, 1, 0.8);
    g.add(m);
    m = upright(new THREE.Mesh(gg.anchor, mm.anchor));
    m.position.set(0, 0, -8.20);
    g.add(m);

    return g;
  }

  /* ------------------------------------------------------------- register */
  var NODE = { len: 0.90, build: buildNode };      // float diameter

  NET_MODELS.node = NODE;
  UNIT_MODELS["sonar_node"] = NODE;
  if (typeof window !== "undefined") {
    window.NET_MODELS = NET_MODELS;
    window.UNIT_MODELS = UNIT_MODELS;
  }
})();
