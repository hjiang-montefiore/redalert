/* ============ units3d_subs.js — submarines ============
   One parametric hull builder covering every boat in the game. What
   distinguishes them is what a submariner would actually notice: overall
   length, beam, the shape and rake of the sail, whether there is a missile
   deck behind it, whether the stern is a cruciform with a screw or a shrouded
   pump-jet, and whether a snorkel mast betrays a diesel.                    */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";


  /* ---------------------------------------------------------------- skin --
     A submarine photographs as anything but a plain grey tube. A modern boat
     is covered in rubber anechoic tiles laid in a visible rectangular grid,
     with patches missing where they have peeled off; an older boat shows weld
     seams and rows of free-flood holes along the casing.

     The hull is a lathe, so its U runs AROUND the girth and its V runs along
     the length. Anything painted here must therefore be uniform around U —
     a waterline stripe would need to know which way is up, and the lathe does
     not tell us. Markings that need an orientation go on the sail instead,
     which is a box with a known one.                                       */
  var subTexCache = {};

  function subSkin(THREE, P) {
    var key = (P.anechoic ? "tile" : "plate") + (P.diesel ? "_d" : "_n");
    if (subTexCache[key]) return subTexCache[key];
    var W = 512, H = 1024;                 /* X = girth, Y = bow..stern */
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var seed = key.length * 7717 + 31;
    function R() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }

    g.fillStyle = P.anechoic ? "#24272a" : "#2c2f33";
    g.fillRect(0, 0, W, H);

    if (P.anechoic) {
      /* rubber tiles: a visible grid, slightly uneven, some panels missing */
      var tw = 22, th = 26;
      for (var y = 0; y < H; y += th) {
        for (var x = 0; x < W; x += tw) {
          var off = ((y / th) | 0) % 2 ? tw * 0.5 : 0;
          g.fillStyle = "rgba(255,255,255," + (0.03 + R() * 0.05).toFixed(3) + ")";
          g.fillRect(x + off + 1, y + 1, tw - 2, th - 2);
          if (R() < 0.030) {                       /* a tile has come away */
            g.fillStyle = "rgba(126,116,100,0.42)";
            g.fillRect(x + off + 1, y + 1, tw - 2, th - 2);
          }
        }
      }
      g.strokeStyle = "rgba(0,0,0,0.40)"; g.lineWidth = 1;
      for (var gy = 0; gy <= H; gy += th) { g.beginPath(); g.moveTo(0, gy); g.lineTo(W, gy); g.stroke(); }
      for (var gx = 0; gx <= W; gx += tw) { g.beginPath(); g.moveTo(gx, 0); g.lineTo(gx, H); g.stroke(); }
    } else {
      /* older boats: welded plate seams and rows of free-flood holes, both of
         which run around the girth and along the casing */
      g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 1.5;
      for (var py = 0; py < H; py += 40 + ((R() * 26) | 0)) {
        g.beginPath(); g.moveTo(0, py); g.lineTo(W, py); g.stroke();
      }
      g.lineWidth = 1;
      for (var px = 0; px < W; px += 64) { g.beginPath(); g.moveTo(px, 0); g.lineTo(px, H); g.stroke(); }
      g.fillStyle = "rgba(0,0,0,0.60)";
      for (var hy = 60; hy < H - 60; hy += 26) {
        for (var hx = 6; hx < W; hx += 46) g.fillRect(hx, hy, 9, 5);
      }
    }

    /* streaking and grime, heavier toward the stern */
    var grime = g.createLinearGradient(0, 0, 0, H);
    grime.addColorStop(0, "rgba(16,18,17,0.00)");
    grime.addColorStop(1, "rgba(16,18,17,0.34)");
    g.fillStyle = grime; g.fillRect(0, 0, W, H);
    g.fillStyle = "rgba(10,12,11,0.16)";
    for (var st = 0; st < 60; st++) g.fillRect(R() * W, R() * H, 2 + R() * 4, 30 + R() * 110);

    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    subTexCache[key] = t;
    return t;
  }

  function subBuilder(P) {
    return function (THREE, M, C) {
      var G = new THREE.Group();
      var L = P.len, B = P.beam;

      var hullMat = new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: 0.95, metalness: 0.06,
        map: subSkin(THREE, P) });
      var deckMat = new THREE.MeshStandardMaterial({
        color: 0x1e2124, roughness: 0.98, metalness: 0.03 });
      var trimMat = new THREE.MeshStandardMaterial({
        color: 0x3a3f44, roughness: 0.8, metalness: 0.25 });
      var redMat = new THREE.MeshStandardMaterial({
        color: 0x5a1f18, roughness: 0.9, metalness: 0.05 });

      /* ---------- pressure hull ----------
         A modern boat is an Albacore teardrop: bluff round bow, parallel
         midbody, long fine taper aft. Built as a lathe so the section is
         genuinely circular rather than a stack of boxes. */
      var pts = [];
      var N = 34;
      for (var i = 0; i <= N; i++) {
        var t = i / N;                       // 0 bow .. 1 stern
        var r;
        if (t < P.bowFrac) {
          var u = t / P.bowFrac;             // bow: elliptical
          r = B * Math.sqrt(Math.max(0, 1 - (1 - u) * (1 - u)));
        } else if (t < P.sternFrac) {
          r = B;                             // parallel midbody
        } else {
          var v = (t - P.sternFrac) / (1 - P.sternFrac);
          r = B * (1 - v * v * 0.97);        // fine run aft
        }
        pts.push(new THREE.Vector2(Math.max(0.05, r), -L / 2 + t * L));
      }
      var hull = new THREE.Mesh(new THREE.LatheGeometry(pts, 20), hullMat);
      /* The lathe is built bow-first (t=0 is the bluff elliptical bow) and the
         game's convention is +X forward. With rotation.z = -PI/2 the pair of
         rotations resolves to Rx(90)*Rz(-90), which lands t=0 at x=-L/2 — so
         every boat carried its fine tapered run at the front under the torpedo
         shutters, and its fat bow at the back with the propeller and rudder
         bolted onto it. Reversing this rotation puts the bow where the fittings
         have always assumed it is. */
      hull.rotation.x = Math.PI / 2;         // lathe axis +Y -> along X
      hull.rotation.z = Math.PI / 2;         // ...and bow-forward, at +X
      hull.position.y = B * 0.92;
      G.add(hull);

      /* casing: the flat walking deck along the top of the hull */
      var deck = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.72, B * 0.10, B * 0.66), deckMat);
      deck.position.set(0, B * 1.80, 0);
      G.add(deck);

      /* ---------- sail / fin ----------
         Rake and chord vary a lot between navies: Soviet sails are tall and
         slab-sided, American ones lower and more faired. */
      var sailL = L * P.sailLen, sailH = B * P.sailHt, sailW = B * P.sailW;
      /* ---------- the sail is the class badge ----------
         Every boat used to get one prismatic box with half-round ends, which
         is most of why they all read alike. A photograph of a Kilo shows a fat
         rounded tower with a raked leading edge and a row of bridge windows;
         an Ohio's is low, short and strongly faired; a Soviet missile boat's
         is tall with flat cheeks and a step down aft. Built as a loft so rake
         and taper are free. */
      var style = P.sailProfile || "faired";
      var rake  = P.sailRake !== undefined ? P.sailRake
                : (style === "fat" ? 0.34 : style === "tower" ? 0.10 : 0.16);
      var topW  = style === "slab" ? 0.94 : style === "tower" ? 0.90
                : style === "fat" ? 0.78 : 0.62;
      var baseY = B * 1.75;
      var xF = L * P.sailAt + sailL / 2, xA = L * P.sailAt - sailL / 2;
      var shift = sailH * rake;              /* the top leans aft of the base */

      var secs = [];
      var NS = 5;
      for (var si = 0; si <= NS; si++) {
        var t = si / NS;
        var w = sailW * 0.5 * (1 + (topW - 1) * t * t);
        /* the fat Kilo tower keeps its girth almost to the top */
        var half = (sailL * 0.5) * (1 + ((style === "fat" ? 0.88 : topW) - 1) * t);
        secs.push({ y: baseY + sailH * t, cx: L * P.sailAt - shift * t, hx: half, hz: w });
      }
      function lerpBox(a, b) {
        var g2 = new THREE.Mesh(new THREE.BoxGeometry(
          (a.hx + b.hx), (b.y - a.y), (a.hz + b.hz)), hullMat);
        g2.position.set((a.cx + b.cx) * 0.5, (a.y + b.y) * 0.5, 0);
        return g2;
      }
      for (var si2 = 0; si2 < NS; si2++) G.add(lerpBox(secs[si2], secs[si2 + 1]));

      /* rounded leading and trailing edges, following the rake */
      for (var e2 = 0; e2 < 2; e2++) {
        for (var si3 = 0; si3 < NS; si3++) {
          var a2 = secs[si3], b2 = secs[si3 + 1];
          var r2 = (a2.hz + b2.hz) * 0.5;
          var cyl = new THREE.Mesh(new THREE.CylinderGeometry(r2, r2, b2.y - a2.y, 10,
            1, false, e2 ? -Math.PI / 2 : Math.PI / 2, Math.PI), hullMat);
          cyl.rotation.y = Math.PI / 2;
          cyl.position.set((a2.cx + b2.cx) * 0.5 + (e2 ? -1 : 1) * (a2.hx + b2.hx) * 0.5,
                           (a2.y + b2.y) * 0.5, 0);
          G.add(cyl);
        }
      }

      /* the fillet where the sail meets the casing: without it the tower looks
         planted on the hull rather than growing out of it */
      var fil = new THREE.Mesh(new THREE.BoxGeometry(sailL * 1.22, B * 0.14, sailW * 1.28),
                               hullMat);
      fil.position.set(L * P.sailAt, baseY + B * 0.05, 0);
      G.add(fil);

      /* bridge cockpit: a dark notch bitten out of the top of the leading edge,
         which is what you actually see of it from above */
      var cockpit = new THREE.Mesh(
        new THREE.BoxGeometry(sailL * 0.30, B * 0.22, sailW * 0.46), deckMat);
      cockpit.position.set(L * P.sailAt - shift * 0.86 + sailL * 0.20,
                           baseY + sailH * 0.94, 0);
      G.add(cockpit);

      /* a step down at the after end of a Soviet slab sail */
      if (style === "slab" || style === "tower") {
        var stp = new THREE.Mesh(
          new THREE.BoxGeometry(sailL * 0.34, sailH * 0.26, sailW * 0.86), hullMat);
        stp.position.set(L * P.sailAt - shift - sailL * 0.42, baseY + sailH * 0.62, 0);
        G.add(stp);
      }

      /* bridge windows, visible on the Kilo photograph as a band near the top */
      var winM = new THREE.MeshStandardMaterial({ color: 0x141a1e, roughness: 0.35,
                                                  metalness: 0.4 });
      for (var wq = 0; wq < 3; wq++) {
        var win = new THREE.Mesh(
          new THREE.BoxGeometry(sailL * 0.10, B * 0.10, sailW * 0.06), winM);
        win.position.set(L * P.sailAt - shift * 0.9 + (wq - 1) * sailL * 0.14,
                         baseY + sailH * 0.80, sailW * 0.5 * topW);
        G.add(win);
        var win2 = win.clone(); win2.position.z = -sailW * 0.5 * topW; G.add(win2);
      }

      /* sail planes: American boats carry them on the sail, Russian and most
         modern designs on the bow instead */
      if (P.sailPlanes) {
        var sp = new THREE.Mesh(new THREE.BoxGeometry(sailL * 0.55, B * 0.07, B * 2.5), trimMat);
        sp.position.set(L * P.sailAt, B * 1.75 + sailH * 0.55, 0);
        G.add(sp);
      } else {
        var bp = new THREE.Mesh(new THREE.BoxGeometry(L * 0.055, B * 0.07, B * 2.2), trimMat);
        bp.position.set(L * 0.30, B * 1.05, 0);
        G.add(bp);
      }

      /* masts: periscopes, ESM, and on a diesel the snorkel induction */
      var mastN = P.diesel ? 4 : 3;
      for (var m = 0; m < mastN; m++) {
        var h = sailH * (0.5 + m * 0.16);
        var mast = new THREE.Mesh(
          new THREE.CylinderGeometry(B * 0.035, B * 0.045, h, 6), trimMat);
        mast.position.set(L * P.sailAt - sailL * 0.18 + m * sailL * 0.14,
                          B * 1.75 + sailH + h / 2, 0);
        G.add(mast);
      }

      /* ---------- missile deck ----------
         An SSBN's launch tubes sit in a raised casing abaft the sail - the
         "turtleback" that makes a boomer instantly recognisable. */
      if (P.missileDeck) {
        var mdL = L * P.missileDeck;
        var md = new THREE.Mesh(new THREE.BoxGeometry(mdL, B * 0.34, B * 1.30), hullMat);
        md.position.set(L * (P.sailAt - 0.30), B * 1.92, 0);
        G.add(md);
        /* launch hatches in two rows */
        var rows = 2, per = Math.max(4, Math.round(mdL / (B * 0.62)));
        for (var rIdx = 0; rIdx < rows; rIdx++) {
          for (var q = 0; q < per; q++) {
            var hatch = new THREE.Mesh(
              new THREE.CylinderGeometry(B * 0.24, B * 0.24, B * 0.05, 12), trimMat);
            hatch.position.set(L * (P.sailAt - 0.30) - mdL / 2 + (q + 0.5) * (mdL / per),
                               B * 2.09, (rIdx ? 1 : -1) * B * 0.36);
            G.add(hatch);
          }
        }
      }
      /* Oscar-style SSGN: the missile tubes live between the hulls, giving the
         boat its enormous beam and the distinctive flat shoulders */
      if (P.ssgnShoulders) {
        for (var sSide = -1; sSide <= 1; sSide += 2) {
          var sh = new THREE.Mesh(new THREE.BoxGeometry(L * 0.42, B * 0.55, B * 0.42), hullMat);
          sh.position.set(L * 0.04, B * 1.45, sSide * B * 0.95);
          G.add(sh);
          for (var t2 = 0; t2 < 6; t2++) {
            var tube = new THREE.Mesh(
              new THREE.CylinderGeometry(B * 0.17, B * 0.17, B * 0.06, 10), trimMat);
            tube.position.set(L * 0.04 - L * 0.17 + t2 * (L * 0.42 / 6),
                              B * 1.73, sSide * B * 0.95);
            G.add(tube);
          }
        }
      }

      /* ---------- stern control surfaces ---------- */
      var sx = -L * 0.40;
      var vfin = new THREE.Mesh(new THREE.BoxGeometry(L * 0.11, B * 2.0, B * 0.10), hullMat);
      vfin.position.set(sx, B * 0.92, 0); G.add(vfin);
      var hfin = new THREE.Mesh(new THREE.BoxGeometry(L * 0.11, B * 0.10, B * 2.6), hullMat);
      hfin.position.set(sx, B * 0.92, 0); G.add(hfin);
      if (P.xstern) {                       /* X-plane stern, as on modern diesels */
        for (var xk = 0; xk < 2; xk++) {
          var xf = new THREE.Mesh(new THREE.BoxGeometry(L * 0.10, B * 0.09, B * 2.3), hullMat);
          xf.position.set(sx, B * 0.92, 0);
          xf.rotation.x = (xk ? -1 : 1) * Math.PI / 4;
          G.add(xf);
        }
      }

      /* propulsor: a shrouded pump-jet on the newest boats, a bare screw on
         the older ones */
      if (P.pumpjet) {
        var duct = new THREE.Mesh(
          new THREE.CylinderGeometry(B * 0.55, B * 0.48, L * 0.09, 14, 1, true), trimMat);
        duct.rotation.z = Math.PI / 2;
        duct.position.set(-L * 0.475, B * 0.92, 0);
        G.add(duct);
        var hubJ = new THREE.Mesh(
          new THREE.ConeGeometry(B * 0.22, L * 0.07, 10), redMat);
        hubJ.rotation.z = Math.PI / 2;
        hubJ.position.set(-L * 0.50, B * 0.92, 0);
        G.add(hubJ);
      } else {
        var hub = new THREE.Mesh(
          new THREE.ConeGeometry(B * 0.20, L * 0.07, 10), redMat);
        hub.rotation.z = -Math.PI / 2;
        hub.position.set(-L * 0.485, B * 0.92, 0);
        G.add(hub);
        var blades = P.blades || 7;
        for (var bl = 0; bl < blades; bl++) {
          var blade = new THREE.Mesh(
            new THREE.BoxGeometry(L * 0.012, B * 0.62, B * 0.16), redMat);
          blade.position.set(-L * 0.478, B * 0.92, 0);
          blade.rotation.x = bl * Math.PI * 2 / blades;
          blade.translateY(B * 0.34);
          blade.rotation.z = 0.5;
          G.add(blade);
        }
      }

      /* torpedo tube shutters at the bow */
      for (var tt = 0; tt < 4; tt++) {
        var sd = tt < 2 ? -1 : 1, lv = tt % 2;
        var shut = new THREE.Mesh(
          new THREE.CylinderGeometry(B * 0.14, B * 0.14, B * 0.05, 10), trimMat);
        shut.rotation.z = Math.PI / 2;
        shut.position.set(L * 0.335, B * (0.68 + lv * 0.34), sd * B * 0.52);
        G.add(shut);
      }

      /* anechoic tile seams, so the hull does not read as bare plastic */
      if (P.anechoic) {
        for (var sm = 0; sm < 7; sm++) {
          var seam = new THREE.Mesh(
            new THREE.TorusGeometry(B * 1.005, B * 0.012, 4, 16), deckMat);
          seam.rotation.y = Math.PI / 2;
          seam.position.set(-L * 0.28 + sm * L * 0.10, B * 0.92, 0);
          G.add(seam);
        }
      }
      /* This file is authored with +Y as up, while every other model in the
         game — and the convention render3d.js relies on — is +Z up. Left as
         it was, the renderer's stand-up rotation rolled every boat onto its
         side, so the sails pointed sideways instead of at the sky. Rotating
         the finished hull a quarter turn about its own long axis puts it back
         into the shared convention. */
      var W = new THREE.Group();
      G.rotation.x = Math.PI / 2;
      W.add(G);
      return W;
    };
  }

  /* ---- the boats ----
     len/beam are in model units; render3d normalises by measured bounding box,
     so what matters here is the proportion between them. A Kilo really is
     stubby next to an Ohio, and an Oscar really is that fat.               */
  var BOATS = {
    /* nuclear attack */
    sub_n:  { sailProfile:"faired", len:110, beam:5.6, bowFrac:0.16, sternFrac:0.62, sailAt:0.16, sailLen:0.135,
              sailHt:1.55, sailW:0.52, sailPlanes:true, anechoic:true, blades:7 },
    /* ballistic missile */
    ssbn_n: { sailProfile:"faired", len:170, beam:6.6, bowFrac:0.13, sternFrac:0.74, sailAt:0.26, sailLen:0.085,
              sailHt:1.35, sailW:0.50, sailPlanes:true, anechoic:true, pumpjet:false,
              missileDeck:0.46, blades:7 },
    ssgn_n: { sailProfile:"faired", len:170, beam:6.6, bowFrac:0.13, sternFrac:0.74, sailAt:0.26, sailLen:0.085,
              sailHt:1.35, sailW:0.50, sailPlanes:true, anechoic:true,
              missileDeck:0.46, blades:7 },
    ssbn_p: { sailProfile:"slab", len:160, beam:7.2, bowFrac:0.14, sternFrac:0.72, sailAt:0.22, sailLen:0.10,
              sailHt:1.70, sailW:0.60, anechoic:true, pumpjet:true, missileDeck:0.40 },
    ssbn_c: { sailProfile:"slab", len:135, beam:6.4, bowFrac:0.15, sternFrac:0.70, sailAt:0.20, sailLen:0.11,
              sailHt:1.85, sailW:0.58, anechoic:false, missileDeck:0.36, blades:7 },
    ssgn_p: { sailProfile:"slab", len:155, beam:9.4, bowFrac:0.15, sternFrac:0.68, sailAt:0.18, sailLen:0.11,
              sailHt:1.50, sailW:0.55, anechoic:true, ssgnShoulders:true, blades:7 },
    /* diesel-electric */
    sub_p:  { sailProfile:"fat", len:74,  beam:6.2, bowFrac:0.20, sternFrac:0.58, sailAt:0.13, sailLen:0.17,
              sailHt:1.55, sailW:0.62, diesel:true, anechoic:true, blades:6 },
    sub_c:  { sailProfile:"fat", len:78,  beam:6.0, bowFrac:0.19, sternFrac:0.60, sailAt:0.12, sailLen:0.15,
              sailHt:1.45, sailW:0.58, diesel:true, anechoic:true, xstern:true, blades:7 },
    sub_r:  { sailProfile:"faired", len:66,  beam:5.4, bowFrac:0.20, sternFrac:0.58, sailAt:0.14, sailLen:0.16,
              sailHt:1.60, sailW:0.55, diesel:true, xstern:true, blades:5 },
    /* 1950s: a fleet-boat shape, not a teardrop, and a very tall conning tower */
    sub_k:  { sailProfile:"tower", len:76,  beam:4.4, bowFrac:0.26, sternFrac:0.52, sailAt:0.10, sailLen:0.20,
              sailHt:2.10, sailW:0.70, diesel:true, blades:5 },
  };
  for (var k in BOATS) {
    UNIT_MODELS[k] = { len: BOATS[k].len, build: subBuilder(BOATS[k]) };
  }
})();
