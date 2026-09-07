/* ============ units3d_ew.js -- ground electronic-warfare vehicles ============
   Three jammers on three very different chassis. What identifies each is its
   antenna: the Prophet's mast-mounted DF array, the CHL-906's flat panel, and
   Krasukha's pair of enormous parabolic dishes on a heavy truck.            */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  /* This file is authored with +Y as up, while the rest of the game -- and the
     stand-up rotation render3d.js applies -- uses +Z up. Without this the
     jammers were drawn lying on their sides, wheels in the air and masts
     pointing sideways. A quarter turn about the long axis puts each vehicle
     back into the shared convention. */
  function upright(THREE, G) {
    var W = new THREE.Group();
    G.rotation.x = Math.PI / 2;
    W.add(G);
    return W;
  }
  function mat(THREE, c, r, m) {
    return new THREE.MeshStandardMaterial({ color: c, roughness: r === undefined ? 0.78 : r,
                                            metalness: m === undefined ? 0.16 : m });
  }
  /* ------------------------------------------------------------- skin
     armour3d.js dresses every parametric vehicle in a disruptive camo
     with weld seams, bolt rows and a dust wash low down. These three
     jammers were the last ground vehicles carrying no map at all, so
     they read as flat plastic in the same line-up. Same language,
     generated here so the file stays self-contained.                 */
  var PAINT = {
    olive:   { c: 0x4a5236, r: 0.90, m: 0.05, sec: ["#39412c", "#5d6742"] },
    green:   { c: 0x3d4a30, r: 0.90, m: 0.05, sec: ["#2c3826", "#6b5f38"] },
    twotone: { c: 0x6b6f63, r: 0.88, m: 0.06, sec: ["#4d5148", "#7d8377"] }
  };
  var TEX = {};

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }

  function skinTex(THREE, camo) {
    if (TEX[camo] !== undefined) return TEX[camo];
    try {
      var W = 512, H = 512, i, q;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d");
      var p = PAINT[camo] || PAINT.olive;
      var R = rngFor(camo.length * 7717 + 91);
      g.fillStyle = hex(p.c); g.fillRect(0, 0, W, H);
      /* disruptive blotches */
      for (i = 0; i < 20; i++) {
        g.globalAlpha = 0.45; g.fillStyle = p.sec[i % p.sec.length];
        g.beginPath();
        g.ellipse(R() * W, R() * H, 40 + R() * 90, 24 + R() * 55, R() * 3.14, 0, 6.29);
        g.fill();
      }
      g.globalAlpha = 1;
      /* weld seams and plate joins */
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.5;
      for (i = 0; i < 18; i++) {
        var x = R() * W, y = R() * H, l = 60 + R() * 190;
        g.beginPath();
        if (R() < 0.5) { g.moveTo(x, y); g.lineTo(x + l, y + (R() - 0.5) * 14); }
        else { g.moveTo(x, y); g.lineTo(x + (R() - 0.5) * 14, y + l); }
        g.stroke();
      }
      /* bolt heads and grab handles */
      g.fillStyle = "rgba(0,0,0,0.26)";
      for (i = 0; i < 26; i++) {
        var bx = R() * W, by = R() * H, n = 4 + ((R() * 10) | 0);
        for (q = 0; q < n; q++) g.fillRect(bx + q * 6, by, 2, 2);
      }
      /* dust thrown up the lower panels, and exhaust staining */
      var dust = g.createLinearGradient(0, H * 0.55, 0, H);
      dust.addColorStop(0, "rgba(150,138,110,0)");
      dust.addColorStop(1, "rgba(150,138,110,0.35)");
      g.fillStyle = dust; g.fillRect(0, H * 0.55, W, H * 0.45);
      g.fillStyle = "rgba(24,22,20,0.16)";
      for (i = 0; i < 30; i++) g.fillRect(R() * W, R() * H, 2 + R() * 4, 18 + R() * 60);

      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      /* r148 has SRGBColorSpace but Texture.colorSpace is inert until r152 */
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      TEX[camo] = t;
    } catch (e) { TEX[camo] = null; }
    return TEX[camo];
  }

  /* cross-lug tread: u wraps the tyre, so a lug is a bar of constant u */
  function treadTex(THREE) {
    if (TEX._tread !== undefined) return TEX._tread;
    try {
      var W = 64, H = 64, i;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d");
      g.fillStyle = "#1b1e22"; g.fillRect(0, 0, W, H);
      g.fillStyle = "#2f343a";
      for (i = 0; i < 8; i++) g.fillRect(i * W / 8 + 1, 0, W / 16, H);
      g.fillStyle = "rgba(0,0,0,0.40)";
      for (i = 0; i < 8; i++) g.fillRect(i * W / 8 + W / 8 - 2, 0, 2, H);
      /* sidewall bands top and bottom of the strip */
      g.fillStyle = "rgba(255,255,255,0.06)";
      g.fillRect(0, 0, W, 3); g.fillRect(0, H - 3, W, 3);
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(4, 1);
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      TEX._tread = t;
    } catch (e) { TEX._tread = null; }
    return TEX._tread;
  }

  /* textured skin tier: roughness 0.82-0.94, metalness at or under 0.10 */
  function skin(THREE, camo) {
    var p = PAINT[camo] || PAINT.olive;
    var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: p.r, metalness: p.m });
    var t = skinTex(THREE, camo);
    if (t) m.map = t; else m.color.setHex(p.c);
    return m;
  }

  /* The two big antennas were the only surfaces left bare, and bare is
     exactly where they hurt: a smooth two-metre reflector aimed at the
     key light runs straight up the ACES shoulder and lands as a white
     balloon parked on a camouflaged truck. Gores on the dish and a
     radiator grid on the array break the highlight up and say what the
     part is at the same time. */
  function dishTex(THREE) {
    if (TEX._dish !== undefined) return TEX._dish;
    try {
      var W = 256, H = 256, cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d"), R = rngFor(3313), i;
      g.fillStyle = "#8b9184"; g.fillRect(0, 0, W, H);
      /* petal gores: u runs around the lathe, so a seam is a bar in u */
      g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 2;
      for (i = 0; i < 16; i++) {
        g.beginPath(); g.moveTo(i * W / 16, 0); g.lineTo(i * W / 16, H); g.stroke();
      }
      /* every other gore a shade off, so the dish is not one flat tone */
      g.globalAlpha = 0.10;
      for (i = 0; i < 16; i += 2) {
        g.fillStyle = i % 4 ? "#ffffff" : "#000000";
        g.fillRect(i * W / 16, 0, W / 16, H);
      }
      g.globalAlpha = 1;
      /* stiffening rings across the profile, with their rivet lines */
      g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.4;
      for (i = 1; i < 5; i++) {
        g.beginPath(); g.moveTo(0, i * H / 5); g.lineTo(W, i * H / 5); g.stroke();
      }
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (i = 0; i < 200; i++) g.fillRect((R() * 16 | 0) * W / 16 + 2, R() * H, 2, 2);
      /* weather: the rim collects grime, the centre stays cleaner */
      g.globalAlpha = 0.16; g.fillStyle = "#4d4a3e";
      for (i = 0; i < 40; i++) g.fillRect(R() * W, R() * H, 3 + R() * 10, 6 + R() * 26);
      g.globalAlpha = 1;
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      TEX._dish = t;
    } catch (e) { TEX._dish = null; }
    return TEX._dish;
  }

  function panelTex(THREE) {
    if (TEX._panel !== undefined) return TEX._panel;
    try {
      var W = 256, H = 256, cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d"), R = rngFor(5051), i, j;
      g.fillStyle = "#7f857a"; g.fillRect(0, 0, W, H);
      /* radiating elements in a close grid, each with a lit top lip */
      var n = 14, s = W / n;
      for (i = 0; i < n; i++) for (j = 0; j < n; j++) {
        g.fillStyle = "rgba(0,0,0,0.30)";
        g.fillRect(i * s + s * 0.16, j * s + s * 0.16, s * 0.68, s * 0.68);
        g.fillStyle = "rgba(255,255,255,0.13)";
        g.fillRect(i * s + s * 0.16, j * s + s * 0.16, s * 0.68, s * 0.14);
      }
      /* the frame around the aperture */
      g.strokeStyle = "rgba(0,0,0,0.40)"; g.lineWidth = 7;
      g.strokeRect(3, 3, W - 6, H - 6);
      g.globalAlpha = 0.14; g.fillStyle = "#4d4a3e";
      for (i = 0; i < 30; i++) g.fillRect(R() * W, R() * H, 4 + R() * 12, 6 + R() * 22);
      g.globalAlpha = 1;
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      TEX._panel = t;
    } catch (e) { TEX._panel = null; }
    return TEX._panel;
  }

  /* an antenna surface: textured skin tier, so it stays matte */
  function antenna(THREE, tex, fallback) {
    var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    var t = tex(THREE);
    if (t) m.map = t; else m.color.setHex(fallback);
    return m;
  }

  function wheels(THREE, G, L, W, n, r, y) {
    var rub = new THREE.MeshStandardMaterial({ color: 0x8f9298, roughness: 0.92,
                                               metalness: 0.05, map: treadTex(THREE) });
    if (!rub.map) rub.color.setHex(0x17191b);
    var hubM = mat(THREE, 0x35393d, 0.6, 0.45);
    for (var i = 0; i < n; i++) {
      for (var s = -1; s <= 1; s += 2) {
        var gap = L * 0.62 / (n - 1);
        var x = -L * 0.31 + i * gap;
        var w = new THREE.Mesh(new THREE.CylinderGeometry(r, r, W * 0.16, 14), rub);
        w.rotation.x = Math.PI / 2;
        w.position.set(x, y, s * W * 0.44);
        G.add(w);
        var h = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.45, r * 0.45, W * 0.18, 10), hubM);
        h.rotation.x = Math.PI / 2;
        h.position.set(x, y, s * W * 0.44);
        G.add(h);
      }
    }
  }

  /* ---- Prophet: a Stryker hull with a telescoping DF mast ---- */
  UNIT_MODELS["ewv_n"] = {
    len: 7.0,
    build: function (THREE, M, C) {
      var G = new THREE.Group(), L = 7.0, W = 2.7;
      var body = skin(THREE, "olive"), dark = mat(THREE, 0x2a2d29, 0.58, 0.45);
      var hull = new THREE.Mesh(new THREE.BoxGeometry(L * 0.86, W * 0.52, W * 0.86), body);
      hull.position.y = W * 0.60; G.add(hull);
      var glacis = new THREE.Mesh(new THREE.BoxGeometry(L * 0.16, W * 0.40, W * 0.84), body);
      glacis.position.set(L * 0.44, W * 0.62, 0); glacis.rotation.z = -0.45; G.add(glacis);
      var roof = new THREE.Mesh(new THREE.BoxGeometry(L * 0.44, W * 0.16, W * 0.72), body);
      roof.position.set(-L * 0.06, W * 0.92, 0); G.add(roof);
      wheels(THREE, G, L, W, 4, W * 0.30, W * 0.30);
      /* the mast: extended, because a stowed one is invisible on the map */
      var mast = new THREE.Mesh(new THREE.CylinderGeometry(W * 0.05, W * 0.08, W * 2.1, 8),
                                mat(THREE, 0x4d5249, 0.60, 0.42));
      mast.position.set(-L * 0.22, W * 2.0, 0); G.add(mast);
      for (var i = 0; i < 4; i++) {
        var arm = new THREE.Mesh(new THREE.BoxGeometry(W * 0.90, W * 0.035, W * 0.05), dark);
        arm.position.set(-L * 0.22, W * 2.75 + i * W * 0.16, 0);
        arm.rotation.y = i * Math.PI / 4;
        G.add(arm);
      }
      var cap = new THREE.Mesh(new THREE.CylinderGeometry(W * 0.13, W * 0.13, W * 0.20, 10), dark);
      cap.position.set(-L * 0.22, W * 3.12, 0); G.add(cap);
      return upright(THREE, G);
    },
  };

  /* ---- CHL-906: a flat AESA jamming panel on a 6x6 truck ---- */
  UNIT_MODELS["ewv_c"] = {
    len: 8.4,
    build: function (THREE, M, C) {
      var G = new THREE.Group(), L = 8.4, W = 2.8;
      var body = skin(THREE, "twotone"), dark = mat(THREE, 0x24282a, 0.58, 0.45);
      var cabin = new THREE.Mesh(new THREE.BoxGeometry(L * 0.22, W * 0.62, W * 0.86), body);
      cabin.position.set(L * 0.34, W * 0.78, 0); G.add(cabin);
      var glass = new THREE.Mesh(new THREE.BoxGeometry(L * 0.03, W * 0.28, W * 0.78),
                    new THREE.MeshPhysicalMaterial({ color: 0x1d2a33, roughness: 0.12,
                      metalness: 0.0, transparent: true, opacity: 0.84,
                      clearcoat: 0.85, clearcoatRoughness: 0.08 }));
      glass.position.set(L * 0.45, W * 0.94, 0); G.add(glass);
      var shelter = new THREE.Mesh(new THREE.BoxGeometry(L * 0.56, W * 0.72, W * 0.90), body);
      shelter.position.set(-L * 0.13, W * 0.82, 0); G.add(shelter);
      wheels(THREE, G, L, W, 3, W * 0.28, W * 0.28);
      /* the array, tilted up and to one side as if radiating */
      var frame = new THREE.Mesh(new THREE.BoxGeometry(W * 0.10, W * 1.5, W * 1.9), dark);
      frame.position.set(-L * 0.16, W * 1.85, 0); frame.rotation.z = 0.42; G.add(frame);
      var face = new THREE.Mesh(new THREE.BoxGeometry(W * 0.035, W * 1.38, W * 1.78),
                                antenna(THREE, panelTex, 0x666c62));
      face.position.set(-L * 0.09, W * 1.90, 0); face.rotation.z = 0.42; G.add(face);
      var mount = new THREE.Mesh(new THREE.CylinderGeometry(W * 0.16, W * 0.20, W * 0.7, 10), dark);
      mount.position.set(-L * 0.16, W * 1.35, 0); G.add(mount);
      return upright(THREE, G);
    },
  };

  /* ---- Krasukha-4: twin parabolic dishes on a heavy 8x8 ---- */
  UNIT_MODELS["ewv_p"] = {
    len: 10.2,
    build: function (THREE, M, C) {
      var G = new THREE.Group(), L = 10.2, W = 3.0;
      var body = skin(THREE, "green"), dark = mat(THREE, 0x23262a, 0.58, 0.45);
      var cabin = new THREE.Mesh(new THREE.BoxGeometry(L * 0.20, W * 0.66, W * 0.88), body);
      cabin.position.set(L * 0.36, W * 0.80, 0); G.add(cabin);
      var shelter = new THREE.Mesh(new THREE.BoxGeometry(L * 0.58, W * 0.78, W * 0.92), body);
      shelter.position.set(-L * 0.10, W * 0.86, 0); G.add(shelter);
      wheels(THREE, G, L, W, 4, W * 0.30, W * 0.30);
      /* two dishes side by side, the shape everyone recognises */
      /* Two parabolic reflectors side by side, each built in its own local
         frame so the rim and the feed horn stay where they belong when the
         whole assembly is elevated. */
      for (var s = -1; s <= 1; s += 2) {
        var pivot = new THREE.Mesh(new THREE.CylinderGeometry(W * 0.14, W * 0.18, W * 0.60, 10), dark);
        pivot.position.set(-L * 0.12, W * 1.40, s * W * 0.42);
        G.add(pivot);

        var rig = new THREE.Group();
        rig.position.set(-L * 0.12, W * 1.78, s * W * 0.42);
        rig.rotation.z = -1.00;                 // elevated toward the sky
        G.add(rig);

        var DR = W * 0.78;
        var prof = [];
        for (var q = 0; q <= 14; q++) {
          var rr = (q / 14) * DR;
          prof.push(new THREE.Vector2(Math.max(0.001, rr), (rr * rr) / (DR * 2.35)));
        }
        var dishMat = antenna(THREE, dishTex, 0x737a6c);
        dishMat.side = THREE.DoubleSide;
        var dish = new THREE.Mesh(new THREE.LatheGeometry(prof, 22), dishMat);
        rig.add(dish);

        /* rim: sits exactly on the open lip of the reflector */
        var rim = new THREE.Mesh(new THREE.TorusGeometry(DR, W * 0.030, 6, 24),
                                 mat(THREE, 0x565b52, 0.60, 0.42));
        rim.rotation.x = Math.PI / 2;
        rim.position.y = (DR * DR) / (DR * 2.35);
        rig.add(rim);

        /* feed boom and horn at the focus */
        var foc = (DR * 2.35) / 4;
        var boom = new THREE.Mesh(new THREE.CylinderGeometry(W * 0.035, W * 0.035, foc, 8), dark);
        boom.position.y = foc / 2;
        rig.add(boom);
        var horn = new THREE.Mesh(new THREE.ConeGeometry(W * 0.10, W * 0.20, 10), dark);
        horn.rotation.x = Math.PI;
        horn.position.y = foc;
        rig.add(horn);

        /* back-of-dish ribbing, so it does not read as a smooth ball */
        for (var rb = 0; rb < 6; rb++) {
          var rib = new THREE.Mesh(new THREE.BoxGeometry(DR * 1.7, W * 0.025, W * 0.045),
                                   mat(THREE, 0x5d6257, 0.60, 0.42));
          rib.position.y = -W * 0.03;
          rib.rotation.y = rb * Math.PI / 6;
          rig.add(rib);
        }
      }

      /* generator set at the back */
      var gen = new THREE.Mesh(new THREE.BoxGeometry(L * 0.14, W * 0.42, W * 0.70), dark);
      gen.position.set(-L * 0.40, W * 0.72, 0); G.add(gen);
      return upright(THREE, G);
    },
  };
})();
