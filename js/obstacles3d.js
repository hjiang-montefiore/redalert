/* ============ obstacles3d.js - field obstacles ============

   The four things a Combat Engineer emplaces. They matter more than most
   models their size, because each one does something mechanically different
   and the player has to tell them apart AT A GLANCE to read a defensive
   line: wire is nearly free and stops infantry, teeth stop vehicles dead,
   sandbags do both and shelter your own riflemen, a ditch splits the
   difference. If they all look like a grey slab the tactics are invisible.

   So each is built around one unmistakable silhouette:

     sandbag      a stack of bags, bulging and irregular, low
     dragonteeth  a field of concrete pyramids, hard-edged, taller
     razorwire    thin pickets with a coil strung between them, almost no mass
     tankditch    a cut in the ground with the spoil heaped on the near lip

   A 1x1 building plot is about 20 m across, so these are built to fill it.
   Model space is +X right, +Y forward, +Z up, real metres.               */
(function () {
  "use strict";
  if (typeof BLD_MODELS === "undefined") { window.BLD_MODELS = {}; }

  /* three.js r148 ships with ColorManagement DISABLED, so a hex written on a
     material reaches the shader as a LINEAR value and renders far brighter
     than the colour you picked - which is why the first pass of these came
     out as four white shapes. Convert on the way in and the colours below can
     be written as the sRGB values they are meant to be. */
  function lin(hex) {
    var f = function (c) {
      c /= 255;
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    var r = f((hex >> 16) & 255), g = f((hex >> 8) & 255), b = f(hex & 255);
    return (Math.round(r * 255) << 16) | (Math.round(g * 255) << 8) | Math.round(b * 255);
  }
  function mat(THREE, col, rough, metal) {
    var m = new THREE.MeshStandardMaterial({
      color: lin(col), roughness: rough === undefined ? 0.9 : rough,
      metalness: metal === undefined ? 0.05 : metal,
    });
    /* already linear: render3d.js prepModel() must not convert it a second time */
    m.userData = { _srgbDone: true };
    return m;
  }
  function box(THREE, g, m, w, d, h, x, y, z, rz) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), m);
    b.position.set(x, y, z + h / 2);
    if (rz) b.rotation.z = rz;
    g.add(b);
    return b;
  }
  /* a deterministic wobble, so two sandbag walls are not identical but the
     same wall is the same every time it is drawn */
  function rng(seed) {
    var s = seed >>> 0;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  var PLOT = 19.0;                       /* a 1x1 plot, in metres */

  /* ---------------------------------------------------------- sandbags */
  BLD_MODELS["sandbag"] = { build: function (THREE, M, C) {
    var g = new THREE.Group();
    var R = rng(11);
    var tan  = mat(THREE, 0x6d6244, 0.95, 0.02);
    var tan2 = mat(THREE, 0x7b6f4d, 0.95, 0.02);
    var tan3 = mat(THREE, 0x5d5439, 0.95, 0.02);
    var tones = [tan, tan2, tan3];
    /* four courses, each bag a squashed sphere so the wall reads as filled
       cloth rather than masonry, every course offset like real bond */
    var courses = 4, bagW = 1.55, hStep = 0.62;
    for (var c = 0; c < courses; c++) {
      var z = c * hStep;
      var inset = c * 0.28;
      var n = Math.floor((PLOT - inset * 2) / bagW);
      var x0 = -(n - 1) * bagW * 0.5;
      for (var i = 0; i < n; i++) {
        var bag = new THREE.Mesh(
          new THREE.SphereGeometry(0.82, 7, 5), tones[(i + c) % 3]);
        bag.scale.set(1.0, 0.66, 0.44);
        bag.position.set(x0 + i * bagW + (c % 2 ? bagW * 0.5 : 0),
                         (R() - 0.5) * 0.22, z + 0.30);
        bag.rotation.z = (R() - 0.5) * 0.35;
        g.add(bag);
        /* a second row of bags gives the wall real thickness */
        var bag2 = bag.clone();
        bag2.position.y += 1.05;
        bag2.rotation.z = (R() - 0.5) * 0.35;
        g.add(bag2);
      }
    }
    /* a couple of pickets and a plank revetment holding the face */
    var wood = mat(THREE, 0x4a3d2a, 0.94, 0.03);
    for (var p = -1; p <= 1; p++) box(THREE, g, wood, 0.22, 0.22, 2.9, p * 6.4, -0.95, 0);
    box(THREE, g, wood, PLOT * 0.92, 0.16, 0.24, 0, -0.95, 2.35);
    return g;
  } };

  /* ----------------------------------------------------- dragon's teeth */
  BLD_MODELS["dragonteeth"] = { build: function (THREE, M, C) {
    var g = new THREE.Group();
    var R = rng(29);
    var conc  = mat(THREE, 0x8a8d86, 0.88, 0.04);
    var conc2 = mat(THREE, 0x767970, 0.88, 0.04);
    /* three staggered rows of pyramids - the stagger is the whole point,
       it is what makes a lane impossible to drive straight through */
    var rows = 3, per = 5;
    for (var r = 0; r < rows; r++) {
      var y = (r - 1) * 4.6;
      var off = (r % 2) ? PLOT / per * 0.5 : 0;
      for (var i = 0; i < per; i++) {
        var x = -PLOT * 0.5 + (i + 0.5) * (PLOT / per) + off;
        if (x > PLOT * 0.5) continue;
        var h = 2.4 + R() * 0.5;
        var t = new THREE.Mesh(new THREE.ConeGeometry(1.5, h, 4), r === 1 ? conc2 : conc);
        t.rotation.x = Math.PI / 2;          /* cone axis +Y -> +Z */
        t.position.set(x, y + (R() - 0.5) * 0.5, h / 2);
        t.rotation.y = R() * 0.5;
        g.add(t);
        /* each sits on a poured footing */
        box(THREE, g, conc2, 2.5, 2.5, 0.28, t.position.x, t.position.y, 0);
      }
    }
    return g;
  } };

  /* --------------------------------------------------------- razor wire */
  BLD_MODELS["razorwire"] = { build: function (THREE, M, C) {
    var g = new THREE.Group();
    var R = rng(53);
    var steel = mat(THREE, 0x9aa0a4, 0.5, 0.55);
    var picket = mat(THREE, 0x5c6058, 0.7, 0.35);
    /* Almost no mass - that is the read. Angle-iron pickets with a
       concertina coil slung along them, and nothing else. */
    var n = 6, span = PLOT * 0.94;
    for (var i = 0; i < n; i++) {
      var x = -span * 0.5 + i * (span / (n - 1));
      var p = box(THREE, g, picket, 0.16, 0.16, 2.5, x, 0, 0);
      p.rotation.x = (R() - 0.5) * 0.10;
      /* the little hooks up a screw picket */
      for (var k = 0; k < 3; k++) {
        var ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.20, 0.045, 4, 8), steel);
        ring.position.set(x, 0, 0.9 + k * 0.62);
        ring.rotation.y = Math.PI / 2;
        g.add(ring);
      }
    }
    /* the concertina itself: a run of loops between the pickets */
    var loops = 22;
    for (var L = 0; L < loops; L++) {
      var t = L / (loops - 1);
      var lx = -span * 0.5 + t * span;
      var coil = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.055, 4, 11), steel);
      coil.position.set(lx, (R() - 0.5) * 0.35, 1.25);
      coil.rotation.y = Math.PI / 2;
      coil.rotation.x = (R() - 0.5) * 0.5;
      g.add(coil);
      /* the barbs, which is what the eye actually picks up */
      if (L % 2 === 0) {
        var barb = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.30), steel);
        barb.position.set(lx, 0, 2.15);
        barb.rotation.y = R() * 3;
        g.add(barb);
      }
    }
    return g;
  } };

  /* -------------------------------------------------------- tank ditch */
  BLD_MODELS["tankditch"] = { build: function (THREE, M, C) {
    var g = new THREE.Group();
    var R = rng(97);
    var soil  = mat(THREE, 0x5a4a33, 0.97, 0.02);
    var soil2 = mat(THREE, 0x4a3d2a, 0.97, 0.02);
    var shade = mat(THREE, 0x241d14, 0.99, 0.01);
    /* The cut. A trapezoid trough sunk below grade, with a near wall that
       leans back and a far wall cut vertical - which is the shape that
       stops a tank: it can get in and cannot climb out. */
    var wide = PLOT * 0.96, depth = 2.4;
    var floor = box(THREE, g, shade, wide, 3.2, 0.3, 0, 0, -depth);
    var far = box(THREE, g, soil2, wide, 0.7, depth + 0.3, 0, 2.0, -depth);
    far.rotation.x = 0.06;
    var near = box(THREE, g, soil2, wide, 1.9, depth + 0.3, 0, -2.4, -depth);
    near.rotation.x = -0.34;                 /* the ramp side */
    /* spoil heaped on the near lip - a real ditch always has its own dirt
       beside it, and the heap is what makes the obstacle read from above */
    for (var i = 0; i < 13; i++) {
      var h = 0.7 + R() * 0.8;
      var m = new THREE.Mesh(new THREE.SphereGeometry(1.25, 6, 4), i % 2 ? soil : soil2);
      m.scale.set(1.0, 0.7, 0.45 + R() * 0.3);
      m.position.set(-wide * 0.5 + (i + 0.5) * (wide / 13), -4.1 + (R() - 0.5) * 0.7, h * 0.3);
      g.add(m);
    }
    /* marker pickets so your own side can see where the cut runs */
    var wood = mat(THREE, 0x6a5a3c, 0.95, 0.02);
    for (var p = -1; p <= 1; p += 2) {
      box(THREE, g, wood, 0.16, 0.16, 1.5, p * wide * 0.42, -3.4, 0);
      var flag = box(THREE, g, mat(THREE, 0xb03a2a, 0.9, 0.02),
                     0.5, 0.05, 0.34, p * wide * 0.42 + 0.3, -3.4, 1.15);
    }
    return g;
  } };
})();
