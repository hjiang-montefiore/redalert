/* ============ units3d_salvage.js — recovered from the stopped model workflow ============
   Definitions the agents completed but never returned; scrubbed, brace-validated
   and build-tested in a real browser before merging.                          */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }
if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

BLD_MODELS["airbase"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var i, k, s, a;

    /* ---------- painted textures ---------- */
    function rng(seed) { var v = seed || 7; return function () { v = (v * 16807) % 2147483647; return (v % 10000) / 10000; }; }
    function mkTex(w, h, draw, rx, ry) {
      var cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      draw(cv.getContext("2d"), w, h);
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping;
      if (rx) t.repeat.set(rx, ry || rx);
      return t;
    }
    function grime(x, w, h, r, n, dark) {
      x.globalAlpha = 0.1; x.fillStyle = dark || "#0b0d0b";
      for (var q = 0; q < n; q++) x.fillRect(r() * w, r() * h * 0.6, 2 + r() * 4, 20 + r() * h * 0.3);
      x.globalAlpha = 1;
    }
    /* concrete apron: slab joints, tonal patches, tyre scuff */
    var concTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(31);
      x.fillStyle = "#5c6058"; x.fillRect(0, 0, w, h);
      for (var q = 0; q < 26; q++) {
        x.globalAlpha = 0.04 + r() * 0.045;
        x.fillStyle = (q % 3) ? "#000000" : "#9aa093";
        x.fillRect(r() * w, r() * h, 22 + r() * 80, 18 + r() * 60);
      }
      x.globalAlpha = 0.55; x.strokeStyle = "#3a3d38"; x.lineWidth = 2;
      x.beginPath();
      for (q = 1; q < 4; q++) { x.moveTo(q * 64, 0); x.lineTo(q * 64, h); x.moveTo(0, q * 64); x.lineTo(w, q * 64); }
      x.stroke();
      grime(x, w, h, r, 10);
    }, 7, 7);
    /* runway: asphalt, centreline dashes, threshold bars, designator */
    var rwyTex = mkTex(1024, 256, function (x, w, h) {
      var r = rng(97), q;
      x.fillStyle = "#3a3d3d"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 34; q++) {
        x.globalAlpha = 0.05 + r() * 0.05;
        x.fillStyle = (q % 3) ? "#000000" : "#7e837c";
        x.fillRect(r() * w, r() * h, 40 + r() * 150, 20 + r() * 70);
      }
      x.globalAlpha = 0.4; x.strokeStyle = "#2b2e2e"; x.lineWidth = 2;
      x.beginPath();
      for (q = 1; q < 5; q++) { x.moveTo(0, q * h / 5); x.lineTo(w, q * h / 5); }
      for (q = 1; q < 16; q++) { x.moveTo(q * w / 16, 0); x.lineTo(q * w / 16, h); }
      x.stroke();
      x.globalAlpha = 1;
      /* rubber deposit at both touchdown zones */
      x.globalAlpha = 0.3; x.fillStyle = "#14161a";
      x.fillRect(120, 40, 90, h - 80); x.fillRect(w - 210, 40, 90, h - 80);
      x.globalAlpha = 1;
      x.fillStyle = "#d9d9cd";
      x.fillRect(0, 10, w, 6); x.fillRect(0, h - 16, w, 6);           /* edge lines */
      for (q = 0; q < 17; q++) x.fillRect(120 + q * 46, h / 2 - 4, 26, 8); /* centreline */
      for (q = 0; q < 6; q++) {                                        /* threshold piano keys */
        x.fillRect(26, 34 + q * 33, 62, 20);
        x.fillRect(w - 88, 34 + q * 33, 62, 20);
      }
      x.save(); x.translate(150, h / 2); x.rotate(-Math.PI / 2);
      x.font = "bold 62px monospace"; x.textAlign = "center"; x.fillText("09", 0, 22); x.restore();
      x.save(); x.translate(w - 150, h / 2); x.rotate(Math.PI / 2);
      x.font = "bold 62px monospace"; x.textAlign = "center"; x.fillText("27", 0, 22); x.restore();
    });
    /* helipad: circle + H */
    var padTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(53);
      x.fillStyle = "#4a4d47"; x.fillRect(0, 0, w, h);
      for (var q = 0; q < 16; q++) {
        x.globalAlpha = 0.05 + r() * 0.04; x.fillStyle = (q % 2) ? "#000000" : "#8b9086";
        x.fillRect(r() * w, r() * h, 20 + r() * 60, 16 + r() * 40);
      }
      x.globalAlpha = 1;
      x.strokeStyle = "#e2e2d4"; x.lineWidth = 9;
      x.beginPath(); x.arc(w / 2, h / 2, 88, 0, Math.PI * 2); x.stroke();
      x.fillStyle = "#e2e2d4";
      x.fillRect(88, 66, 20, 124); x.fillRect(148, 66, 20, 124); x.fillRect(108, 116, 40, 24);
    });
    /* corrugated hangar shell */
    var ribTex = mkTex(256, 64, function (x, w, h) {
      var r = rng(19);
      x.fillStyle = "#787e7a"; x.fillRect(0, 0, w, h);
      for (var q = 0; q < w; q += 8) {
        x.fillStyle = "rgba(0,0,0,0.20)"; x.fillRect(q, 0, 3, h);
        x.fillStyle = "rgba(255,255,255,0.10)"; x.fillRect(q + 4, 0, 2, h);
      }
      for (q = 0; q < 12; q++) {
        x.globalAlpha = 0.06 + r() * 0.05; x.fillStyle = (q % 2) ? "#2b2f2b" : "#b9c0b6";
        x.fillRect(r() * w, r() * h, 18 + r() * 50, 6 + r() * 22);
      }
      x.globalAlpha = 1;
    }, 6, 2);
    function panelTex(base, tint, seed, cells) {
      return mkTex(256, 256, function (x, w, h) {
        var r = rng(seed), q;
        x.fillStyle = base; x.fillRect(0, 0, w, h);
        for (q = 0; q < 20; q++) {
          x.globalAlpha = 0.04 + r() * 0.04; x.fillStyle = (q % 3) ? "#000000" : tint;
          x.fillRect(r() * w, r() * h, 18 + r() * 70, 14 + r() * 50);
        }
        x.globalAlpha = 0.45; x.strokeStyle = "#242723"; x.lineWidth = 1.6;
        x.beginPath();
        for (q = 1; q < cells; q++) { x.moveTo(q * w / cells, 0); x.lineTo(q * w / cells, h); x.moveTo(0, q * h / cells); x.lineTo(w, q * h / cells); }
        x.stroke();
        grime(x, w, h, r, 9);
      });
    }

    var conc = new THREE.MeshStandardMaterial({ map: concTex, roughness: 0.92, metalness: 0.02 });
    var rwy = new THREE.MeshStandardMaterial({ map: rwyTex, roughness: 0.95, metalness: 0.0 });
    var pad = new THREE.MeshStandardMaterial({ map: padTex, roughness: 0.93, metalness: 0.0 });
    var shell = new THREE.MeshStandardMaterial({ map: ribTex, color: 0xdfe2dc, roughness: 0.62, metalness: 0.32, side: THREE.DoubleSide });
    var wall = new THREE.MeshStandardMaterial({ map: panelTex("#6a6f66", "#a7ada1", 71, 4), roughness: 0.86, metalness: 0.05 });
    var metal = new THREE.MeshStandardMaterial({ color: 0x767c7e, roughness: 0.55, metalness: 0.38 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x2a2d2c, roughness: 0.6, metalness: 0.3 });
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x1b2b33, roughness: 0.14, metalness: 0.3, emissive: 0x0d1b22, emissiveIntensity: 0.6 });
    var team = new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.62, metalness: 0.12 });
    var lampW = new THREE.MeshStandardMaterial({ color: 0xf2efdc, emissive: 0xf2efdc, emissiveIntensity: 0.9, roughness: 0.4, metalness: 0.1 });
    var lampR = new THREE.MeshStandardMaterial({ color: 0xd0322a, emissive: 0xd0322a, emissiveIntensity: 0.9, roughness: 0.4, metalness: 0.1 });
    var orange = new THREE.MeshStandardMaterial({ color: 0xd4691f, roughness: 0.7, metalness: 0.05 });
    var white = new THREE.MeshStandardMaterial({ color: 0xd9d9cd, roughness: 0.7, metalness: 0.05 });

    function box(w, d, h, mat) { return new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mat); }
    function cylZ(r1, r2, h, mat, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, h, seg || 10, 1, !!open); geo.rotateX(Math.PI / 2);
      return new THREE.Mesh(geo, mat);
    }
    function cylX(r1, r2, l, mat, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, l, seg || 8, 1, !!open); geo.rotateZ(-Math.PI / 2);
      return new THREE.Mesh(geo, mat);
    }
    function put(m, x, y, z) { m.position.set(x, y, z); g.add(m); return m; }
    /* railing along a polyline of [x,y] points at height z */
    function railing(pts, z, h, mat) {
      var grp = new THREE.Group(); grp.position.set(0, 0, z);
      for (var p = 0; p < pts.length - 1; p++) {
        var dx = pts[p + 1][0] - pts[p][0], dy = pts[p + 1][1] - pts[p][1];
        var L = Math.sqrt(dx * dx + dy * dy), ang = Math.atan2(dy, dx);
        for (var lvl = 0; lvl < 2; lvl++) {
          var bar = cylX(0.035, 0.035, L, mat, 5, true);
          bar.rotation.z = ang;
          bar.position.set(pts[p][0] + dx / 2, pts[p][1] + dy / 2, h * (lvl ? 1 : 0.55));
          grp.add(bar);
        }
        var n = Math.max(1, Math.round(L / 2.0));
        for (var q = 0; q <= n; q++) {
          var st = cylZ(0.045, 0.045, h, mat, 5, true);
          st.position.set(pts[p][0] + dx * q / n, pts[p][1] + dy * q / n, h / 2);
          grp.add(st);
        }
      }
      g.add(grp); return grp;
    }

    /* ---------------- ground: apron slab, runway, taxiway, helipad ---------------- */
    put(box(60, 60, 0.3, conc), 0, 0, 0.15);
    var strip = new THREE.Mesh(new THREE.PlaneGeometry(56, 15), rwy);
    put(strip, 0, 13, 0.32);
    var taxi = new THREE.Mesh(new THREE.PlaneGeometry(11, 12), pad);
    put(taxi, -3, 0.5, 0.31);
    var helo = new THREE.Mesh(new THREE.CircleGeometry(6, 26), pad);
    put(helo, 19, -19, 0.32);
    /* helipad perimeter lights */
    for (i = 0; i < 8; i++) {
      a = i / 8 * Math.PI * 2;
      put(cylZ(0.13, 0.13, 0.3, lampW, 6), 19 + Math.cos(a) * 6.6, -19 + Math.sin(a) * 6.6, 0.45);
    }
    /* runway edge lights */
    for (i = 0; i < 9; i++) {
      var lx = -26 + i * 6.5;
      put(cylZ(0.12, 0.12, 0.35, lampW, 6), lx, 5.9, 0.45);
      put(cylZ(0.12, 0.12, 0.35, lampW, 6), lx, 20.1, 0.45);
    }

    /* ---------------- arched hangar (opens toward +X) ---------------- */
    var HX = -13, HY = -13, HR = 8.4, HL = 26, SPR = 1.5;
    var arch = new THREE.Mesh(new THREE.CylinderGeometry(HR, HR, HL, 22, 1, true, -Math.PI / 2, Math.PI), shell);
    arch.geometry.rotateZ(-Math.PI / 2);
    put(arch, HX, HY, SPR);
    for (i = 0; i <= 4; i++) {                                        /* external arch ribs */
      var rgeo = new THREE.TorusGeometry(HR + 0.14, 0.16, 5, 12, Math.PI);
      rgeo.rotateX(Math.PI / 2); rgeo.rotateZ(Math.PI / 2);
      put(new THREE.Mesh(rgeo, metal), HX - 12 + i * 6, HY, SPR);
    }
    for (s = -1; s <= 1; s += 2) put(box(HL, 0.55, SPR + 0.1, wall), HX, HY + s * HR, (SPR + 0.1) / 2);
    /* back wall (half disc) + interior floor */
    var backGeo = new THREE.CircleGeometry(HR, 20, Math.PI / 2, Math.PI);
    backGeo.rotateY(Math.PI / 2);
    put(new THREE.Mesh(backGeo, wall), HX - HL / 2, HY, SPR);
    put(box(0.4, HR * 2, SPR, wall), HX - HL / 2, HY, SPR / 2);
    var floor = new THREE.Mesh(new THREE.PlaneGeometry(HL - 0.6, HR * 2 - 0.8), dark);
    put(floor, HX, HY, 0.33);
    /* door header beam, folded-back door leaves, interior strip lights */
    put(box(0.6, HR * 2 + 1.2, 0.7, metal), HX + HL / 2 - 0.1, HY, SPR + HR * 0.02 + 0.35);
    for (s = -1; s <= 1; s += 2) {
      var leaf = box(5.6, 0.35, 7.2, shell);
      leaf.position.set(HX + HL / 2 + 2.6, HY + s * (HR - 0.45), 3.7);
      leaf.rotation.z = s * 0.09; g.add(leaf);
      var band = box(5.4, 0.12, 0.7, team);
      band.position.set(HX + HL / 2 + 2.6, HY + s * (HR - 0.62), 6.1);
      band.rotation.z = s * 0.09; g.add(band);
    }
    for (i = 0; i < 3; i++) put(box(4.5, 0.4, 0.18, lampW), HX - 8 + i * 8, HY, SPR + HR - 1.4);
    /* interior clutter: workbench, drums, tug */
    put(box(4.0, 1.0, 0.9, metal), HX - 9, HY + 6.0, 0.78);
    for (i = 0; i < 3; i++) put(cylZ(0.42, 0.42, 0.95, i === 1 ? team : dark, 10), HX - 3 + i * 1.1, HY + 6.6, 0.8);
    put(box(2.6, 1.5, 0.9, dark), HX + 4, HY - 5.4, 0.78);

    /* ---------------- control tower ---------------- */
    var TX = 16, TY = -3;
    put(box(9, 9, 1.0, conc), TX, TY, 0.5);
    put(box(5.6, 5.6, 13.0, wall), TX, TY, 6.5 + 0.5);
    /* stair cage on the back face */
    for (i = 0; i < 7; i++) put(box(1.4, 0.14, 0.1, metal), TX - 3.0, TY - 2.8 + 0.02, 2.0 + i * 1.6);
    put(box(0.12, 1.5, 12.0, metal), TX - 3.05, TY - 2.8, 7.0);
    put(box(1.2, 0.16, 2.4, dark), TX + 2.85, TY, 1.7);              /* door */
    put(box(0.2, 3.0, 0.9, team), TX + 2.85, TY, 3.6);               /* team panel */
    /* cab: overhanging floor, canted glass, roof */
    put(box(9.4, 9.4, 0.45, conc), TX, TY, 13.7);
    var cab = box(8.0, 8.0, 3.1, glass); cab.position.set(TX, TY, 15.5); g.add(cab);
    for (s = -1; s <= 1; s += 2) {
      put(box(8.6, 0.22, 0.22, metal), TX, TY + s * 4.05, 14.05);
      put(box(8.6, 0.22, 0.22, metal), TX, TY + s * 4.05, 17.0);
      put(box(0.22, 8.6, 0.22, metal), TX + s * 4.05, TY, 14.05);
      put(box(0.22, 8.6, 0.22, metal), TX + s * 4.05, TY, 17.0);
      for (i = -1; i <= 1; i += 2) {
        put(box(0.22, 0.22, 3.2, metal), TX + s * 4.0, TY + i * 4.0, 15.5);
        put(box(0.18, 0.18, 3.2, metal), TX + s * 1.4, TY + i * 4.05, 15.5);
        put(box(0.18, 0.18, 3.2, metal), TX + s * 4.05, TY + i * 1.4, 15.5);
      }
    }
    var roof = new THREE.Mesh(M.slab(THREE, [[-5.1, -5.1], [5.1, -5.1], [5.1, 5.1], [-5.1, 5.1]], 0.35), conc);
    put(roof, TX, TY, 17.15);
    put(box(10.6, 0.5, 0.28, team), TX, TY + 5.0, 17.2);
    railing([[TX - 4.7, TY - 4.7], [TX + 4.7, TY - 4.7], [TX + 4.7, TY + 4.7], [TX - 4.7, TY + 4.7], [TX - 4.7, TY - 4.7]], 17.5, 1.1, metal);
    /* roof kit: mast, beacon, air-con, small dish */
    put(cylZ(0.14, 0.09, 7.0, metal, 6), TX - 1.6, TY - 1.6, 21.0);
    put(cylZ(0.22, 0.22, 0.4, lampR, 8), TX - 1.6, TY - 1.6, 24.6);
    for (i = 0; i < 3; i++) put(box(0.5, 0.5, 0.1, lampR), TX - 1.6, TY - 1.6, 19.4 + i * 1.7);
    put(box(1.8, 1.4, 0.8, metal), TX + 2.6, TY + 2.2, 17.85);
    put(cylZ(0.5, 0.5, 0.18, dark, 10), TX + 2.6, TY - 2.4, 18.3);
    var dish = new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), white);
    dish.rotation.y = 1.2; dish.rotation.x = -0.5;
    put(dish, TX + 2.6, TY - 2.4, 18.9);
    /* flag pole + team flag beside the tower */
    put(cylZ(0.09, 0.07, 8.0, white, 6), TX + 5.2, TY + 5.2, 4.0);
    put(box(0.06, 2.0, 1.3, team), TX + 5.2, TY + 6.2, 7.3);

    /* ---------------- windsock ---------------- */
    var WX = 26, WY = 4;
    put(cylZ(0.13, 0.10, 7.0, white, 6), WX, WY, 3.5);
    for (i = 0; i < 3; i++) put(cylZ(0.14, 0.14, 0.8, orange, 6), WX, WY, 1.0 + i * 2.2);
    var ringGeo = new THREE.TorusGeometry(0.55, 0.05, 5, 10);
    ringGeo.rotateY(Math.PI / 2);
    put(new THREE.Mesh(ringGeo, metal), WX - 0.1, WY, 6.9);
    var sock = new THREE.Group(); sock.position.set(WX - 0.1, WY, 6.9);
    sock.rotation.z = 2.5; sock.rotation.y = 0.35; g.add(sock);
    var radii = [0.55, 0.47, 0.39, 0.31, 0.24];
    for (i = 0; i < 4; i++) {
      var seg = cylX(radii[i + 1], radii[i], 0.62, (i % 2) ? white : orange, 8, true);
      seg.position.set(0.32 + i * 0.62, 0, 0); sock.add(seg);
    }

    /* ---------------- revetment walls ---------------- */
    function revet(rx, ry) {
      var r = new THREE.Group(); r.position.set(rx, ry, 0);
      var back = box(10.0, 1.4, 3.4, wall); back.position.set(0, -3.4, 1.7); r.add(back);
      var cap = box(10.4, 1.0, 0.35, conc); cap.position.set(0, -3.4, 3.55); r.add(cap);
      for (var q = -1; q <= 1; q += 2) {
        var sw = box(1.4, 7.0, 3.0, wall); sw.position.set(q * 4.3, 0.1, 1.5); r.add(sw);
        var sc = box(1.0, 7.2, 0.32, conc); sc.position.set(q * 4.3, 0.1, 3.16); r.add(sc);
      }
      var num = box(1.5, 0.1, 1.0, team); num.position.set(-3.0, -2.68, 2.2); r.add(num);
      g.add(r);
    }
    revet(-7, -25.5); revet(7, -25.5);

    /* ---------------- fuel farm + apron clutter ---------------- */
    for (i = 0; i < 2; i++) {
      var tank = cylX(1.7, 1.7, 7.0, white, 12);
      put(tank, 25, -21 + i * 4.6, 2.2);
      put(box(0.35, 0.9, 1.2, conc), 22.5, -21 + i * 4.6, 0.6);
      put(box(0.35, 0.9, 1.2, conc), 27.5, -21 + i * 4.6, 0.6);
      put(box(1.2, 0.35, 0.35, team), 25, -21 + i * 4.6, 3.85);
      put(cylZ(0.1, 0.1, 1.6, metal, 6), 21.6, -21 + i * 4.6, 1.2);
    }
    put(box(12.0, 0.5, 0.7, conc), 25, -25.6, 0.55);
    /* floodlight masts */
    function flood(fx, fy, rot) {
      put(cylZ(0.2, 0.15, 9.0, metal, 8), fx, fy, 4.5);
      var head = new THREE.Group(); head.position.set(fx, fy, 9.2); head.rotation.z = rot; g.add(head);
      var bar = cylX(0.1, 0.1, 2.4, metal, 6); head.add(bar);
      for (var q = -1; q <= 1; q++) {
        var lm = box(0.5, 0.7, 0.45, dark); lm.position.set(q * 0.9, 0.18, -0.28); head.add(lm);
        var lens = box(0.1, 0.62, 0.38, lampW); lens.position.set(q * 0.9, 0.52, -0.3); head.add(lens);
      }
    }
    flood(-28, -28, 0.8); flood(28, -28, 2.4); flood(-28, 3.5, -0.8); flood(28, 6.0, 3.6);
    /* crates, drums, pallet stacks along the apron edge */
    var rr = rng(11);
    for (i = 0; i < 7; i++) {
      var cx = -27 + i * 2.4, cy = -6.5 - rr() * 1.5;
      var cr = box(1.5 + rr() * 0.5, 1.2, 1.0 + rr() * 0.5, i % 3 ? dark : metal);
      cr.position.set(cx, cy, 0.6); cr.rotation.z = (rr() - 0.5) * 0.5; g.add(cr);
    }
    for (i = 0; i < 5; i++) put(cylZ(0.4, 0.4, 0.9, i % 2 ? dark : team, 10), 2 + (i % 3) * 1.0, -8.5 - Math.floor(i / 3) * 1.0, 0.75);
    /* jet blast deflector beside the taxiway */
    for (i = 0; i < 3; i++) {
      var jb = box(0.3, 3.4, 3.0, metal);
      jb.position.set(5.5, -3.5 + i * 3.5, 1.8); jb.rotation.y = -0.35; g.add(jb);
      var jbl = box(0.34, 3.4, 0.3, team);
      jbl.position.set(5.5, -3.5 + i * 3.5, 3.25); jbl.rotation.y = -0.35; g.add(jbl);
    }
    return g;
  }
};

BLD_MODELS["barracks"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var SD = 33191, i, j, s, a;
    function rn() { SD = (SD * 16807) % 2147483647; return (SD % 10000) / 10000; }
    function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
    function tex(c, rx, ry) {
      var t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (rx) t.repeat.set(rx, ry);
      return t;
    }
    function patches(x, w, h, n, lt, dk) {
      for (var q = 0; q < n; q++) {
        x.globalAlpha = 0.04 + rn() * 0.04;
        x.fillStyle = (q % 3 === 0) ? lt : dk;
        x.fillRect(rn() * w, rn() * h, w * 0.05 + rn() * w * 0.24, h * 0.04 + rn() * h * 0.2);
      }
      x.globalAlpha = 1;
    }
    function seams(x, w, h, cols, rows, col) {
      x.globalAlpha = 0.5; x.strokeStyle = col || "#20241e"; x.lineWidth = 2; x.beginPath();
      for (var q = 1; q < cols; q++) { x.moveTo(q * w / cols, 0); x.lineTo(q * w / cols, h); }
      for (q = 1; q < rows; q++) { x.moveTo(0, q * h / rows); x.lineTo(w, q * h / rows); }
      x.stroke(); x.globalAlpha = 1;
    }
    function drips(x, w, h, n, col) {
      x.fillStyle = col || "#15180f";
      for (var q = 0; q < n; q++) {
        x.globalAlpha = 0.05 + rn() * 0.09;
        x.fillRect(rn() * w, rn() * h * 0.5, 1 + rn() * 4, h * 0.08 + rn() * h * 0.3);
      }
      x.globalAlpha = 1;
    }
    function hazard(x, px, py, pw, ph, step) {
      x.save(); x.beginPath(); x.rect(px, py, pw, ph); x.clip();
      x.globalAlpha = 0.94; x.fillStyle = "#c9a825"; x.fillRect(px, py, pw, ph);
      x.fillStyle = "#191a16";
      for (var q = -2; q < (pw + ph) / step + 2; q++) {
        var bx = px + q * step;
        x.beginPath();
        x.moveTo(bx, py); x.lineTo(bx + step * 0.5, py);
        x.lineTo(bx + step * 0.5 + ph, py + ph); x.lineTo(bx + ph, py + ph);
        x.closePath(); x.fill();
      }
      x.globalAlpha = 1; x.restore();
    }

    /* ---------------- textures ---------------- */
    /* parade square: concrete with painted drill lines */
    var ac = cvs(512, 512), ax = ac.getContext("2d");
    ax.fillStyle = "#5a5f57"; ax.fillRect(0, 0, 512, 512);
    patches(ax, 512, 512, 40, "#82877c", "#33372f");
    ax.globalAlpha = 0.36; ax.strokeStyle = "#2c2f29"; ax.lineWidth = 3; ax.beginPath();
    for (i = 1; i < 8; i++) { ax.moveTo(i * 64, 0); ax.lineTo(i * 64, 512); ax.moveTo(0, i * 64); ax.lineTo(512, i * 64); }
    ax.stroke(); ax.globalAlpha = 1;
    /* painted parade markings */
    ax.globalAlpha = 0.8; ax.strokeStyle = "#d5d2bd"; ax.lineWidth = 5;
    ax.strokeRect(96, 150, 320, 212);
    ax.lineWidth = 3;
    for (i = 1; i < 4; i++) { ax.beginPath(); ax.moveTo(96, 150 + i * 53); ax.lineTo(416, 150 + i * 53); ax.stroke(); }
    for (i = 0; i < 9; i++) { ax.beginPath(); ax.moveTo(120 + i * 34, 356); ax.lineTo(120 + i * 34, 340); ax.stroke(); }
    ax.fillStyle = "#d5d2bd";
    ax.font = "bold 40px sans-serif"; ax.textAlign = "center";
    ax.fillText("A COY", 256, 420);
    ax.globalAlpha = 1;
    hazard(ax, 420, 40, 74, 20, 22);
    ax.globalAlpha = 0.14; ax.fillStyle = "#0b0d09";
    for (i = 0; i < 24; i++) ax.fillRect(rn() * 512, rn() * 512, 26 + rn() * 90, 4 + rn() * 8);
    ax.globalAlpha = 1;
    var apronTex = tex(ac);

    /* hut wall: painted board siding with windows */
    var wc = cvs(256, 128), wx = wc.getContext("2d");
    wx.fillStyle = "#5c6349"; wx.fillRect(0, 0, 256, 128);
    patches(wx, 256, 128, 22, "#8b9270", "#242a1c");
    wx.globalAlpha = 0.4; wx.strokeStyle = "#2a3020"; wx.lineWidth = 2; wx.beginPath();
    for (i = 1; i < 16; i++) { wx.moveTo(0, i * 8); wx.lineTo(256, i * 8); }
    wx.stroke(); wx.globalAlpha = 1;
    for (i = 0; i < 4; i++) {
      var wxx = 22 + i * 60, wyy = 36;
      wx.fillStyle = "#1b2226"; wx.fillRect(wxx, wyy, 34, 30);
      wx.globalAlpha = 0.22; wx.fillStyle = "#9fb3bd"; wx.fillRect(wxx + 2, wyy + 2, 15, 13); wx.globalAlpha = 1;
      wx.strokeStyle = "#8e9078"; wx.lineWidth = 3; wx.strokeRect(wxx, wyy, 34, 30);
      wx.beginPath(); wx.moveTo(wxx + 17, wyy); wx.lineTo(wxx + 17, wyy + 30); wx.stroke();
      wx.fillStyle = "#8e9078"; wx.fillRect(wxx - 3, wyy + 30, 40, 4);
    }
    wx.globalAlpha = 0.3; wx.fillStyle = "#2a2e22"; wx.fillRect(0, 116, 256, 12); wx.globalAlpha = 1;
    drips(wx, 256, 128, 18);
    var wallTex = tex(wc, 2, 1);

    /* corrugated roof sheeting */
    var rc = cvs(128, 128), rx = rc.getContext("2d");
    rx.fillStyle = "#464b3f"; rx.fillRect(0, 0, 128, 128);
    rx.globalAlpha = 0.35; rx.strokeStyle = "#282c22"; rx.lineWidth = 2;
    for (i = 0; i < 32; i++) { rx.beginPath(); rx.moveTo(i * 4, 0); rx.lineTo(i * 4, 128); rx.stroke(); }
    rx.globalAlpha = 1;
    patches(rx, 128, 128, 18, "#6d7362", "#6a4a2a");
    rx.globalAlpha = 0.45; rx.strokeStyle = "#20241c"; rx.lineWidth = 3;
    for (i = 1; i < 3; i++) { rx.beginPath(); rx.moveTo(0, i * 42); rx.lineTo(128, i * 42); rx.stroke(); }
    rx.globalAlpha = 1;
    var roofTex = tex(rc, 0.55, 0.55);

    var lc = cvs(64, 64), lx = lc.getContext("2d");
    lx.clearRect(0, 0, 64, 64);
    lx.strokeStyle = "rgba(198,204,206,0.98)"; lx.lineWidth = 3;
    for (i = -64; i < 128; i += 16) {
      lx.beginPath(); lx.moveTo(i, 0); lx.lineTo(i + 64, 64); lx.stroke();
      lx.beginPath(); lx.moveTo(i, 64); lx.lineTo(i + 64, 0); lx.stroke();
    }

    /* ---------------- materials ---------------- */
    var wallM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: wallTex, roughness: 0.82, metalness: 0.04 });
    var roofM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: roofTex, roughness: 0.65, metalness: 0.25 });
    var apronM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: apronTex, roughness: 0.9, metalness: 0.02 });
    var plainM = new THREE.MeshStandardMaterial({ color: 0x565b54, roughness: 0.88, metalness: 0.02 });
    var oliveM = new THREE.MeshStandardMaterial({ color: 0x4a5240, roughness: 0.8, metalness: 0.06 });
    var steel = new THREE.MeshStandardMaterial({ color: 0x8b908b, roughness: 0.3, metalness: 0.85 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x2a2d2a, roughness: 0.6, metalness: 0.4 });
    var wood = new THREE.MeshStandardMaterial({ color: 0x6d5c3f, roughness: 0.85, metalness: 0.02 });
    var bagM = new THREE.MeshStandardMaterial({ color: 0x7b7355, roughness: 0.95, metalness: 0.0 });
    var teamM = new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.55, metalness: 0.12, side: THREE.DoubleSide });
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x1b262c, roughness: 0.18, metalness: 0.2 });
    var lampM = new THREE.MeshStandardMaterial({ color: 0xf4eecb, emissive: 0x6a6440, roughness: 0.4, metalness: 0.2 });
    var drumCache = {};

    function box(w, d, h, m) { return new THREE.Mesh(new THREE.BoxGeometry(w, d, h), m); }
    function at(mesh, x, y, z, p) { mesh.position.set(x, y, z); (p || g).add(mesh); return mesh; }
    function cylZ(r1, r2, h, m, sg) { var ge = new THREE.CylinderGeometry(r1, r2, h, sg || 10); ge.rotateX(Math.PI / 2); return new THREE.Mesh(ge, m); }
    function cylX(r1, r2, l, m, sg) { var ge = new THREE.CylinderGeometry(r1, r2, l, sg || 8); ge.rotateZ(-Math.PI / 2); return new THREE.Mesh(ge, m); }
    function cylY(r1, r2, l, m, sg) { return new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, l, sg || 8), m); }
    function prism(ptsYZ, lenX, mat) {
      var sh = new THREE.Shape();
      sh.moveTo(ptsYZ[0][0], ptsYZ[0][1]);
      for (var q = 1; q < ptsYZ.length; q++) sh.lineTo(ptsYZ[q][0], ptsYZ[q][1]);
      sh.closePath();
      var ge = new THREE.ExtrudeGeometry(sh, { depth: lenX, bevelEnabled: false });
      ge.rotateX(Math.PI / 2); ge.rotateZ(Math.PI / 2);
      ge.translate(-lenX / 2, 0, 0);
      ge.computeVertexNormals();
      return new THREE.Mesh(ge, mat);
    }
    function sandbagWall(px, py, ang, len, rows, parent) {
      var grp = new THREE.Group(); grp.position.set(px, py, 0); grp.rotation.z = ang; (parent || g).add(grp);
      var per = Math.max(2, Math.round(len / 0.66));
      for (var r = 0; r < rows; r++) for (var q = 0; q < per - (r % 2 ? 1 : 0); q++) {
        var b = box(0.62, 0.4, 0.26, bagM);
        b.position.set((q - (per - 1) / 2) * 0.66 + (r % 2) * 0.33, 0, 0.14 + r * 0.25);
        b.rotation.z = (rn() - 0.5) * 0.14; grp.add(b);
      }
      return grp;
    }
    function drum(px, py, pz, col) {
      var m = drumCache[col] || (drumCache[col] = new THREE.MeshStandardMaterial({ color: col, roughness: 0.6, metalness: 0.35 }));
      at(cylZ(0.3, 0.3, 0.92, m, 10), px, py, pz + 0.46);
      at(cylZ(0.32, 0.32, 0.07, dark, 10), px, py, pz + 0.62);
    }
    function crate(px, py, pz, sx, sy, sz, rot) {
      var c = box(sx, sy, sz, wood); c.position.set(px, py, pz + sz / 2); c.rotation.z = rot || 0; g.add(c);
      var b1 = box(sx + 0.05, 0.07, 0.09, dark); b1.position.set(px, py, pz + sz * 0.72); b1.rotation.z = rot || 0; g.add(b1);
    }
    function fenceRun(x0, y0, x1, y1, h) {
      var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), an = Math.atan2(dy, dx);
      var t = tex(lc, L / 2.2, h / 2.2);
      var m = new THREE.MeshStandardMaterial({ color: 0x9aa0a2, map: t, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 0.5, metalness: 0.6 });
      var ge = new THREE.PlaneGeometry(L, h); ge.rotateX(Math.PI / 2);
      var mesh = new THREE.Mesh(ge, m);
      mesh.position.set((x0 + x1) / 2, (y0 + y1) / 2, h / 2 + 0.1); mesh.rotation.z = an; g.add(mesh);
      var rail = cylX(0.05, 0.05, L, steel, 5);
      rail.position.set((x0 + x1) / 2, (y0 + y1) / 2, h + 0.1); rail.rotation.z = an; g.add(rail);
      var n = Math.max(2, Math.round(L / 5));
      for (var q = 0; q <= n; q++) at(cylZ(0.07, 0.07, h + 0.3, steel, 5), x0 + dx * q / n, y0 + dy * q / n, (h + 0.3) / 2);
    }
    function floodlight(px, py, hgt, ang) {
      var p = new THREE.Group(); p.position.set(px, py, 0); p.rotation.z = ang; g.add(p);
      at(cylZ(0.5, 0.6, 0.5, plainM, 8), 0, 0, 0.25, p);
      at(cylZ(0.13, 0.18, hgt, steel, 6), 0, 0, hgt / 2, p);
      at(box(0.24, 1.6, 0.2, steel), 0, 0, hgt + 0.1, p);
      for (var q = -1; q <= 1; q += 2) {
        at(box(0.4, 0.6, 0.46, dark), -0.1, q * 0.5, hgt + 0.4, p);
        at(box(0.06, 0.5, 0.36, lampM), 0.13, q * 0.5, hgt + 0.4, p);
      }
    }

    /* ---------------- ground ---------------- */
    at(new THREE.Mesh(new THREE.BoxGeometry(38, 38, 0.3), [plainM, plainM, plainM, plainM, apronM, plainM]), 0, 0, 0.15);

    /* ---------------- two pitched-roof huts ---------------- */
    function hut(hy, flip) {
      var HL = 24, HW = 9, WH = 3.4;
      at(new THREE.Mesh(new THREE.BoxGeometry(HL, HW, WH), [wallM, wallM, wallM, wallM, dark, plainM]), 0, hy, WH / 2 + 0.4);
      /* plinth */
      at(box(HL + 0.6, HW + 0.6, 0.45, plainM), 0, hy, 0.32);
      /* roof prism (gable ends included) */
      var rf = prism([[-5.1, 0], [5.1, 0], [0, 2.3]], HL + 0.8, roofM);
      at(rf, 0, hy, WH + 0.4);
      /* ridge cap + vents */
      at(box(HL + 0.9, 0.4, 0.18, dark), 0, hy, WH + 2.75);
      for (i = -1; i <= 1; i++) at(box(1.0, 0.8, 0.5, dark), i * 7.0, hy, WH + 2.95);
      /* gutters */
      for (s = -1; s <= 1; s += 2) at(cylX(0.11, 0.11, HL + 0.8, dark, 6), 0, hy + s * 5.0, WH + 0.34);
      /* stove pipes */
      for (i = -1; i <= 1; i += 2) {
        at(cylZ(0.19, 0.19, 3.4, dark, 8), i * 8.5, hy + 1.8, WH + 2.0);
        at(cylZ(0.28, 0.28, 0.22, dark, 8), i * 8.5, hy + 1.8, WH + 3.75);
      }
      /* doors at both ends with canopies and steps */
      for (i = -1; i <= 1; i += 2) {
        at(box(0.16, 1.5, 2.3, dark), i * (HL / 2 + 0.06), hy - 1.6, 1.55);
        at(box(1.5, 2.4, 0.14, roofM), i * (HL / 2 + 0.7), hy - 1.6, 2.95);
        at(box(1.4, 2.0, 0.4, plainM), i * (HL / 2 + 0.8), hy - 1.6, 0.55);
        at(cylZ(0.07, 0.07, 1.2, steel, 5), i * (HL / 2 + 1.4), hy - 2.5, 1.05);
        at(cylZ(0.07, 0.07, 1.2, steel, 5), i * (HL / 2 + 1.4), hy - 0.7, 1.05);
      }
      /* long side door + noticeboard */
      at(box(1.4, 0.16, 2.3, dark), -4.0, hy + (flip ? 4.58 : -4.58), 1.55);
      at(box(2.2, 0.12, 1.2, wood), 4.5, hy + (flip ? 4.58 : -4.58), 2.1);
      /* window sills / shutters */
      for (i = -4; i <= 4; i++) {
        if (i === 0) continue;
        at(box(1.3, 0.1, 0.1, dark), i * 2.4, hy + 4.55, 2.9);
        at(box(1.3, 0.1, 0.1, dark), i * 2.4, hy - 4.55, 2.9);
      }
      /* air-con boxes and a fire point */
      at(box(1.0, 0.7, 0.8, steel), 8.0, hy + (flip ? 4.9 : -4.9), 2.6);
      at(cylZ(0.25, 0.25, 0.7, dark, 8), -9.6, hy + (flip ? 5.2 : -5.2), 0.75);
    }
    hut(12.0, true);
    hut(-12.0, false);
    /* unit sign with the team stripe over the north hut door */
    at(box(4.6, 0.18, 1.2, plainM), 0, 6.9, 3.4);
    at(box(4.7, 0.22, 0.34, teamM), 0, 6.88, 2.95);
    for (s = -1; s <= 1; s += 2) at(cylZ(0.09, 0.09, 3.0, steel, 6), s * 2.1, 6.9, 1.7);

    /* ---------------- flagpole with team flag ---------------- */
    var FX = -12.5, FY = 0;
    at(cylZ(1.5, 1.7, 0.5, plainM, 12), FX, FY, 0.45);
    at(cylZ(1.1, 1.1, 0.35, plainM, 12), FX, FY, 0.85);
    at(cylZ(0.13, 0.09, 10.5, steel, 8), FX, FY, 5.6);
    at(new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 5), steel), FX, FY, 10.95);
    at(cylZ(0.05, 0.05, 0.4, dark, 5), FX + 0.16, FY, 1.7);
    var flag = new THREE.Group(); flag.position.set(FX + 0.09, FY, 9.15); g.add(flag);
    for (i = 0; i < 3; i++) {
      var seg = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 1.5), teamM);
      seg.geometry.rotateX(Math.PI / 2);
      seg.position.set(0.52 + i * 1.02, Math.sin(i * 1.5) * 0.16, 0);
      seg.rotation.z = Math.sin(i * 1.6) * 0.22;
      flag.add(seg);
    }
    at(box(0.9, 0.06, 0.42, new THREE.MeshStandardMaterial({ color: 0xe8e4d2, roughness: 0.8, side: THREE.DoubleSide })), 0.55, 0.02, 0.5, flag);
    /* saluting dais */
    at(box(3.0, 2.2, 0.45, plainM), FX + 3.4, FY, 0.52);
    at(box(2.6, 1.8, 0.25, wood), FX + 3.4, FY, 0.85);

    /* ---------------- sandbag entrance + guard post ---------------- */
    sandbagWall(16.5, 3.2, Math.PI / 2, 5.0, 5);
    sandbagWall(16.5, -3.2, Math.PI / 2, 5.0, 5);
    sandbagWall(13.4, 5.4, 0, 3.4, 4);
    sandbagWall(13.4, -5.4, 0, 3.4, 4);
    at(box(2.4, 2.4, 2.6, plainM), 13.0, 7.6, 1.6);
    at(box(2.8, 2.8, 0.25, roofM), 13.0, 7.6, 3.0);
    at(box(0.14, 1.1, 1.0, glass), 11.75, 7.6, 2.1);
    at(box(1.1, 0.14, 1.0, glass), 13.0, 6.35, 2.1);
    /* barrier pole */
    at(cylZ(0.16, 0.16, 1.2, dark, 8), 16.4, 6.4, 0.9);
    var barrier = box(6.4, 0.18, 0.18, new THREE.MeshStandardMaterial({ color: 0xd8d5c4, roughness: 0.7 }));
    barrier.position.set(16.4, 3.3, 1.5); barrier.rotation.z = Math.PI / 2; g.add(barrier);
    for (i = 0; i < 3; i++) at(box(0.5, 0.22, 0.22, dark), 16.4, 5.4 - i * 1.6, 1.5);
    /* concrete blocks / chicane */
    for (i = 0; i < 3; i++) {
      at(box(1.6, 0.8, 1.0, plainM), 18.2, -8.0 + i * 2.2, 0.85).rotation.z = 0.1 * i;
    }

    /* ---------------- obstacle course ---------------- */
    /* A-frame climb */
    var af = new THREE.Group(); af.position.set(2.5, 3.4, 0); g.add(af);
    for (s = -1; s <= 1; s += 2) {
      var pl = box(4.6, 3.0, 0.18, wood);
      pl.position.set(s * 1.5, 0, 1.7); pl.rotation.y = s * 0.72; af.add(pl);
      for (i = 0; i < 5; i++) at(box(0.14, 3.0, 0.1, dark), s * (0.55 + i * 0.62), 0, 0.5 + i * 0.68, af);
    }
    at(box(0.3, 3.2, 0.3, wood), 0, 0, 3.35, af);
    /* balance beams */
    for (i = 0; i < 2; i++) {
      at(box(7.0, 0.34, 0.34, wood), 8.0, 3.0 - i * 2.4, 1.0 + i * 0.35);
      for (s = -1; s <= 1; s += 2) at(box(0.34, 0.34, 1.0 + i * 0.35, wood), 8.0 + s * 3.2, 3.0 - i * 2.4, (1.0 + i * 0.35) / 2 + 0.3);
    }
    /* monkey bars */
    var mb = new THREE.Group(); mb.position.set(2.0, -3.6, 0); g.add(mb);
    for (s = -1; s <= 1; s += 2) {
      at(cylZ(0.11, 0.11, 2.6, steel, 6), s * 2.6, -0.9, 1.6, mb);
      at(cylZ(0.11, 0.11, 2.6, steel, 6), s * 2.6, 0.9, 1.6, mb);
      at(box(0.14, 2.0, 0.14, steel), s * 2.6, 0, 2.85, mb);
    }
    for (s = -1; s <= 1; s += 2) at(box(5.4, 0.12, 0.12, steel), 0, s * 0.9, 2.85, mb);
    for (i = 0; i < 7; i++) at(cylX(0.06, 0.06, 1.9, steel, 5), -2.4 + i * 0.8, 0, 2.85, mb).rotation.z = Math.PI / 2;
    /* tyre run */
    var tyreM = new THREE.MeshStandardMaterial({ color: 0x22201e, roughness: 0.92, metalness: 0.02 });
    for (i = 0; i < 8; i++) {
      var ty = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.19, 5, 10), tyreM);
      ty.position.set(-2.0 + (i % 4) * 1.15, -6.6 + Math.floor(i / 4) * 1.15, 0.5);
      g.add(ty);
    }
    for (i = 0; i < 3; i++) {
      var ts = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.2, 5, 10), tyreM);
      ts.position.set(6.4, -6.2, 0.55 + i * 0.36); ts.rotation.x = Math.PI / 2; g.add(ts);
    }
    /* vault wall + low crawl wires */
    at(box(0.5, 4.4, 2.0, wood), 12.0, -3.0, 1.3);
    at(box(0.7, 4.6, 0.22, dark), 12.0, -3.0, 2.4);
    for (i = 0; i < 5; i++) {
      at(cylZ(0.06, 0.06, 0.7, steel, 5), -6.0 + i * 1.6, -4.5, 0.55);
      at(cylZ(0.06, 0.06, 0.7, steel, 5), -6.0 + i * 1.6, -1.5, 0.55);
    }
    for (i = 0; i < 3; i++) at(box(7.0, 0.05, 0.05, dark), -3.8, -4.5 + i * 1.5, 0.85);
    /* rope climb frame */
    at(cylZ(0.16, 0.16, 4.2, wood, 6), -6.0, 4.6, 2.2);
    at(cylZ(0.16, 0.16, 4.2, wood, 6), -1.4, 4.6, 2.2);
    at(box(5.0, 0.24, 0.24, wood), -3.7, 4.6, 4.2);
    for (i = 0; i < 3; i++) at(cylZ(0.05, 0.05, 3.4, new THREE.MeshStandardMaterial({ color: 0x8a7a55, roughness: 0.95 }), 5), -5.2 + i * 1.5, 4.6, 2.4);

    /* ---------------- clutter, fence, lights ---------------- */
    crate(-17.0, 8.0, 0.3, 2.2, 1.8, 1.5, 0.2);
    crate(-15.2, 6.6, 0.3, 1.7, 1.5, 1.1, -0.35);
    crate(-17.2, 5.2, 0.3, 2.0, 1.7, 1.3, 0.45);
    crate(17.4, 12.0, 0.3, 2.4, 2.0, 1.6, -0.2);
    drum(-17.5, -6.0, 0.3, 0x4b5240); drum(-16.6, -5.6, 0.3, 0x4b5240);
    drum(-17.1, -6.9, 0.3, 0x7a4030); drum(-16.2, -7.2, 0.3, 0x39566b);
    drum(15.0, -13.0, 0.3, 0x4b5240); drum(15.9, -12.6, 0.3, 0x4b5240);
    /* water bowser trailer */
    at(cylX(0.85, 0.85, 3.4, oliveM, 12), -17.0, -13.0, 1.5);
    at(cylZ(0.15, 0.15, 0.5, dark, 6), -17.0, -13.0, 2.4);
    at(box(3.8, 1.9, 0.25, dark), -17.0, -13.0, 0.65);
    for (s = -1; s <= 1; s += 2) at(cylX(0.42, 0.42, 0.24, dark, 10), -17.6, -13.0 + s * 1.0, 0.45).rotation.z = Math.PI / 2;
    at(box(1.6, 0.16, 0.16, dark), -15.0, -13.0, 0.6);
    /* stacked ammo boxes on a pallet */
    at(box(2.4, 1.8, 0.14, wood), 8.4, 15.2, 0.4);
    for (i = 0; i < 4; i++) at(box(0.9, 0.55, 0.32, oliveM), 8.4 - 0.55 + (i % 2) * 1.1, 15.2 - 0.4 + Math.floor(i / 2) * 0.8, 0.63);
    for (i = 0; i < 2; i++) at(box(0.9, 0.55, 0.32, oliveM), 8.4 - 0.5 + i * 1.0, 15.2, 0.95);
    /* jerry cans */
    for (i = 0; i < 4; i++) at(box(0.42, 0.22, 0.5, oliveM), -9.0 + i * 0.5, -16.4, 0.55);
    fenceRun(-18.8, 18.8, 18.8, 18.8, 2.4);
    fenceRun(-18.8, -18.8, -18.8, 18.8, 2.4);
    fenceRun(-18.8, -18.8, 18.8, -18.8, 2.4);
    floodlight(-18.0, 17.6, 10, 5.5);
    floodlight(18.0, 17.6, 10, 3.9);
    floodlight(18.0, -17.6, 10, 2.4);
    floodlight(-18.0, -17.6, 10, 0.8);
    return g;
  }
};

UNIT_MODELS["boat_c"] = {
  len: 42.6,
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var i, sd = 8831;
    function rnd() { sd = (sd * 9301 + 49297) % 233280; return sd / 233280; }
    function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
    /* hull skin: u = stern -> bow, v = around (0 port, .25 top, .5 stbd, .75 keel) */
    function hullTex(base, dk, wl, num, nsz, nsx) {
      var W = 1024, H = 512, cv = cvs(W, H), c = cv.getContext("2d"), j, p, L;
      c.fillStyle = base; c.fillRect(0, 0, W, H);
      for (j = 0; j < 64; j++) { c.fillStyle = rnd() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"; c.fillRect(rnd() * W, rnd() * H, 40 + rnd() * 160, 10 + rnd() * 46); }
      c.fillStyle = dk; c.fillRect(0, 0.19 * H, W, 0.125 * H);
      c.fillStyle = "rgba(0,0,0,0.12)"; for (j = 0; j < 1500; j++) c.fillRect(rnd() * W, (0.192 + rnd() * 0.12) * H, 2, 2);
      c.fillStyle = "#181c1f"; c.fillRect(0, (0.5 + wl) * H, W, (0.5 - 2 * wl) * H);
      c.fillStyle = "#0b0d0f"; c.fillRect(0, (0.5 + wl - 0.02) * H, W, 0.02 * H); c.fillRect(0, (1 - wl) * H, W, 0.02 * H);
      c.strokeStyle = "rgba(0,0,0,0.30)"; c.lineWidth = 1.4;
      for (j = 1; j < 28; j++) { p = j / 28 * W; c.beginPath(); c.moveTo(p, 0); c.lineTo(p, H); c.stroke(); }
      var sk = [0.055, 0.13, 0.37, 0.445];
      for (j = 0; j < 4; j++) { c.beginPath(); c.moveTo(0, sk[j] * H); c.lineTo(W, sk[j] * H); c.stroke(); }
      c.fillStyle = "rgba(26,18,12,0.30)";                                  /* rust weeping from the deck edge */
      for (j = 0; j < 42; j++) {
        p = rnd() * W; L = 10 + rnd() * 44; c.fillRect(p, 0.19 * H - L, 2.5, L);
        p = rnd() * W; L = 10 + rnd() * 44; c.fillRect(p, 0.315 * H, 2.5, L);
      }
      c.fillStyle = "rgba(0,0,0,0.34)";                                     /* freeing ports / scuttles */
      for (j = 0; j < 9; j++) { p = (0.1 + j * 0.085) * W; c.fillRect(p, 0.135 * H, 16, 7); c.fillRect(p, 0.358 * H, 16, 7); }
      if (num) {
        c.fillStyle = "#c9ced2"; c.font = "bold " + nsz + "px sans-serif"; c.textAlign = "center";
        c.save(); c.translate(0.885 * W, 0.45 * H); c.scale(nsx, 1); c.fillText(num, 0, 0); c.restore();
        c.save(); c.translate(0.885 * W, 0.055 * H); c.scale(-nsx, 1); c.fillText(num, 0, 0); c.restore();
      }
      var t = new THREE.CanvasTexture(cv); t.anisotropy = 4; return t;
    }
    function deckTex(x0, x1, y0, y1, base, paint) {
      var W = 1024, H = 384, cv = cvs(W, H), c = cv.getContext("2d"), j;
      function PX(x) { return (x - x0) / (x1 - x0) * W; }
      function PY(y) { return (y1 - y) / (y1 - y0) * H; }
      c.fillStyle = base; c.fillRect(0, 0, W, H);
      for (j = 0; j < 55; j++) { c.fillStyle = rnd() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)"; c.fillRect(rnd() * W, rnd() * H, 30 + rnd() * 130, 12 + rnd() * 60); }
      c.fillStyle = "rgba(0,0,0,0.12)"; for (j = 0; j < 2200; j++) c.fillRect(rnd() * W, rnd() * H, 2, 2);
      c.strokeStyle = "rgba(0,0,0,0.25)"; c.lineWidth = 1.2;
      for (j = 1; j < 24; j++) { c.beginPath(); c.moveTo(j / 24 * W, 0); c.lineTo(j / 24 * W, H); c.stroke(); }
      for (j = 1; j < 8; j++) { c.beginPath(); c.moveTo(0, j / 8 * H); c.lineTo(W, j / 8 * H); c.stroke(); }
      paint(c, PX, PY, W, H);
      var t = new THREE.CanvasTexture(cv); t.anisotropy = 4; return t;
    }
    function bx(sx, sy, sz, x, y, z, mt, par) { var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mt); m.position.set(x, y, z); (par || g).add(m); return m; }
    function tp(sx, sy, sz, kx, ky, x, y, z, mt, par) {
      var gm = new THREE.BoxGeometry(sx, sy, sz), a = gm.attributes.position, q;
      for (q = 0; q < a.count; q++) if (a.getZ(q) > 0) { a.setX(q, a.getX(q) * kx); a.setY(q, a.getY(q) * ky); }
      a.needsUpdate = true; gm.computeVertexNormals();
      var m = new THREE.Mesh(gm, mt); m.position.set(x, y, z); (par || g).add(m); return m;
    }
    function cx(r1, r2, len, seg, x, y, z, mt, par) { var cg = new THREE.CylinderGeometry(r1, r2, len, seg); cg.rotateZ(Math.PI / 2); var m = new THREE.Mesh(cg, mt); m.position.set(x, y, z); (par || g).add(m); return m; }
    function cz(r1, r2, len, seg, x, y, z, mt, par) { var cg = new THREE.CylinderGeometry(r1, r2, len, seg); cg.rotateX(Math.PI / 2); var m = new THREE.Mesh(cg, mt); m.position.set(x, y, z); (par || g).add(m); return m; }
    function plate(pts, thick, ztop, topMat, sideMat, u0, u1, v0, v1, par) {
      var sh = new THREE.Shape(), j; sh.moveTo(pts[0][0], pts[0][1]);
      for (j = 1; j < pts.length; j++) sh.lineTo(pts[j][0], pts[j][1]);
      sh.closePath();
      var dg = new THREE.ExtrudeGeometry(sh, { depth: thick, bevelEnabled: false });
      var dp = dg.attributes.position, du = dg.attributes.uv;
      for (j = 0; j < dp.count; j++) du.setXY(j, (dp.getX(j) - u0) / (u1 - u0), (dp.getY(j) - v0) / (v1 - v0));
      var m = new THREE.Mesh(dg, [topMat, sideMat]); m.position.z = ztop - thick; (par || g).add(m); return m;
    }
    function rail(path, z0, h, mt, par) {
      var p = par || g, a, b, dx, dy, L, an, m, q, n, w2, sg = new THREE.CylinderGeometry(0.035, 0.035, h, 4); sg.rotateX(Math.PI / 2);
      for (q = 0; q < path.length - 1; q++) {
        a = path[q]; b = path[q + 1]; dx = b[0] - a[0]; dy = b[1] - a[1]; L = Math.sqrt(dx * dx + dy * dy);
        if (L < 0.3) continue;
        an = Math.atan2(dy, dx);
        for (n = 0; n < 2; n++) {
          m = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, L, 4), mt);
          m.rotation.z = an - Math.PI / 2; m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, z0 + (n ? h : h * 0.55)); p.add(m);
        }
        n = Math.max(1, Math.round(L / 2.2));
        for (w2 = 0; w2 <= n; w2++) { if (q > 0 && w2 === 0) continue; m = new THREE.Mesh(sg, mt); m.position.set(a[0] + dx * w2 / n, a[1] + dy * w2 / n, z0 + h / 2); p.add(m); }
      }
    }

    var DKZ = 3.65, DX0 = -21.3, DX1 = 21.3, DY0 = -6.1, DY1 = 6.1;
    var hullMat = new THREE.MeshStandardMaterial({ map: hullTex("#696f74", "#4b5054", 0.039, "2208", 38, 0.50), metalness: 0.3, roughness: 0.6 });
    var deckMat = new THREE.MeshStandardMaterial({
      map: deckTex(DX0, DX1, DY0, DY1, "#4b5054", function (c, PX, PY) {
        var j, u = PX(1) - PX(0), v = PY(0) - PY(1);
        c.strokeStyle = "#c6cbce"; c.lineWidth = 3;
        c.beginPath(); c.moveTo(PX(-20.4), PY(-5.5)); c.lineTo(PX(13), PY(-5.3)); c.lineTo(PX(19.6), PY(-1.6)); c.stroke();
        c.beginPath(); c.moveTo(PX(-20.4), PY(5.5)); c.lineTo(PX(13), PY(5.3)); c.lineTo(PX(19.6), PY(1.6)); c.stroke();
        c.strokeStyle = "#b4babd"; c.lineWidth = 2;
        c.beginPath(); c.moveTo(PX(-20), PY(-3.4)); c.lineTo(PX(15), PY(-3.4)); c.stroke();
        c.beginPath(); c.moveTo(PX(-20), PY(3.4)); c.lineTo(PX(15), PY(3.4)); c.stroke();
        c.fillStyle = "rgba(10,12,14,0.5)";
        c.fillRect(PX(-18), PY(1.4), 3.0 * u, 2.8 * v);                  /* deck hatches */
        c.fillRect(PX(8.5), PY(1.3), 2.4 * u, 2.6 * v);
        c.strokeStyle = "rgba(0,0,0,0.45)"; c.lineWidth = 2;
        c.strokeRect(PX(-18), PY(1.4), 3.0 * u, 2.8 * v);
        c.strokeRect(PX(8.5), PY(1.3), 2.4 * u, 2.6 * v);
        c.fillStyle = "rgba(0,0,0,0.28)";
        for (j = -20; j < 18; j += 2) { c.fillRect(PX(j) - 2, PY(4.6) - 2, 5, 5); c.fillRect(PX(j) - 2, PY(-4.6) - 2, 5, 5); }
        c.fillStyle = "#aeb4b7"; c.font = "bold 18px sans-serif"; c.textAlign = "center";
        c.fillText("NO STEP", PX(-13), PY(-4.9));
      }), metalness: 0.2, roughness: 0.72
    });
    var greyMat = new THREE.MeshStandardMaterial({ color: 0x7c8287, metalness: 0.32, roughness: 0.58 });
    var darkMat = new THREE.MeshStandardMaterial({ color: 0x272b2f, metalness: 0.3, roughness: 0.62 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x3d4246, metalness: 0.85, roughness: 0.3 });
    var glassMat = new THREE.MeshPhysicalMaterial({ color: 0x121c24, metalness: 0.4, roughness: 0.16 });
    var teamMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.team), metalness: 0.25, roughness: 0.55 });

    /* ---------- two slim wave-piercing demihulls ---------- */
    var demi = M.loft(THREE, [
      { x: -21.3, w: 1.50, h: 1.30, zc: 0.30, sq: 0.60 },
      { x: -16.0, w: 1.60, h: 1.35, zc: 0.28, sq: 0.58 },
      { x: -6.0, w: 1.62, h: 1.40, zc: 0.26, sq: 0.56 },
      { x: 4.0, w: 1.55, h: 1.45, zc: 0.28, sq: 0.55 },
      { x: 12.0, w: 1.30, h: 1.52, zc: 0.34, sq: 0.55 },
      { x: 17.5, w: 0.85, h: 1.60, zc: 0.42, sq: 0.55 },
      { x: 20.5, w: 0.35, h: 1.65, zc: 0.50, sq: 0.55 },
      { x: 21.3, w: 0.08, h: 1.65, zc: 0.55, sq: 0.55 }
    ], 18);
    for (i = -1; i <= 1; i += 2) {
      var dh = new THREE.Mesh(demi, hullMat); dh.position.y = i * 4.5; g.add(dh);
      bx(0.25, 3.0, 2.6, -21.3, i * 4.5, 0.3, hullMat);                  /* demihull transoms */
      bx(3.4, 1.1, 0.9, -20.6, i * 4.5, -0.45, darkMat);                 /* waterjet housings */
      cx(0.42, 0.42, 0.6, 10, -21.7, i * 4.5, -0.3, steelMat);
      var spr = bx(22, 0.3, 0.14, -7, i * 6.06, 0.55, hullMat);          /* outboard spray strake */
      spr.rotation.x = i * 0.55;
    }
    /* ---------- cross deck structure bridging the hulls ---------- */
    tp(39.0, 12.2, 1.40, 0.98, 0.94, -1.0, 0, 2.60, hullMat);
    plate([[18.4, -5.35], [20.6, -1.6], [21.2, 0], [20.6, 1.6], [18.4, 5.35]], 1.40, DKZ - 0.38, hullMat, hullMat, DX0, DX1, DY0, DY1);
    plate([[-20.9, -6.0], [-6, -6.08], [6, -5.9], [13, -5.35], [18.4, -3.5], [20.9, -0.85],
      [20.9, 0.85], [18.4, 3.5], [13, 5.35], [6, 5.9], [-6, 6.08], [-20.9, 6.0]],
      0.38, DKZ, deckMat, hullMat, DX0, DX1, DY0, DY1);

    /* ---------- sharply faceted stealth deckhouse ---------- */
    tp(17.0, 9.0, 2.7, 0.82, 0.60, -1.5, 0, 4.93, greyMat);
    tp(9.5, 5.2, 2.3, 0.84, 0.70, 1.0, 0, 7.5, greyMat);
    bx(9.0, 4.4, 0.16, 1.0, 0, 8.7, darkMat);
    var wsc = bx(0.3, 3.6, 1.15, 5.0, 0, 7.9, glassMat); wsc.rotation.y = -0.34;
    for (i = -1; i <= 1; i += 2) {
      var sg2 = bx(4.6, 0.2, 0.85, 2.2, i * 2.28, 7.9, glassMat); sg2.rotation.x = i * 0.3;
      var sd2 = bx(15.0, 0.25, 2.4, -1.5, i * 3.7, 5.05, greyMat); sd2.rotation.x = i * 0.42;   /* sloped flank facets */
      bx(0.9, 0.14, 1.7, -8.0, i * 3.55, 4.65, darkMat);                 /* access doors */
      bx(2.8, 0.4, 0.5, -6.0, i * 4.1, 4.25, teamMat);                   /* team identification stripe */
      cz(0.75, 0.75, 0.85, 10, -4.5, i * 4.6, 4.15, greyMat);            /* liferaft canisters */
      cz(0.6, 0.6, 0.85, 10, -7.5, i * 4.6, 4.15, greyMat);
      bx(1.6, 1.2, 1.0, -12.5, i * 3.6, 4.2, darkMat);                   /* exhaust plenums */
      cz(0.05, 0.05, 3.0, 5, -10.0, i * 4.5, 5.8, steelMat);             /* whip antennas */
      bx(1.2, 1.0, 1.2, -17.5, i * 3.2, 4.45, greyMat);                  /* aft deck lockers */
    }
    /* faceted mast */
    tp(3.2, 3.4, 4.0, 0.5, 0.45, -0.5, 0, 10.65, greyMat);
    cz(0.16, 0.12, 3.2, 6, -0.5, 0, 14.2, steelMat);
    bx(1.3, 0.7, 0.7, 1.4, 0, 11.9, darkMat);                            /* surface search radar */
    cz(0.5, 0.5, 0.22, 12, 1.4, 0, 12.4, darkMat);
    bx(0.16, 3.6, 0.09, -1.6, 0, 12.6, darkMat);                         /* yard */
    for (i = -1; i <= 1; i += 2) {
      cz(0.34, 0.34, 0.4, 10, -1.2, i * 1.1, 12.9, darkMat);             /* ESM domes */
      cz(0.05, 0.04, 2.2, 5, -1.6, i * 1.7, 13.4, steelMat);
    }

    /* ---------- 30 mm gatling mount forward ---------- */
    cz(1.05, 1.15, 0.4, 14, 13.6, 0, DKZ + 0.2, greyMat);
    var tur = new THREE.Group(); tur.name = "turret"; tur.position.set(13.6, 0, DKZ + 0.4); g.add(tur);
    cz(0.95, 0.95, 0.9, 14, 0, 0, 0.45, greyMat, tur);
    cz(0.8, 0.55, 0.55, 14, 0, 0, 1.15, greyMat, tur);
    var cra = cx(0.34, 0.34, 1.5, 12, 0.85, 0, 1.2, steelMat, tur); cra.rotation.y = -0.12;
    cx(0.13, 0.13, 0.9, 8, 1.95, 0, 1.33, steelMat, tur);
    for (i = 0; i < 6; i++) {
      var ang = i / 6 * Math.PI * 2;
      cx(0.055, 0.055, 1.5, 5, 1.75, Math.cos(ang) * 0.14, 1.28 + Math.sin(ang) * 0.14, steelMat, tur);
    }
    cz(0.42, 0.42, 0.5, 10, -0.75, 0, 1.5, darkMat, tur);                /* gun radar */
    bx(0.5, 0.9, 0.35, -0.75, 0, 1.9, darkMat, tur);

    /* ---------- deck fittings ---------- */
    for (i = -1; i <= 1; i += 2) {
      cz(0.11, 0.11, 0.5, 6, 16.5, i * 2.2, DKZ + 0.25, steelMat);       /* bitts */
      cz(0.11, 0.11, 0.5, 6, -19.5, i * 3.4, DKZ + 0.25, steelMat);
      bx(0.55, 0.11, 0.11, 16.5, i * 2.2, DKZ + 0.5, steelMat);
      bx(0.55, 0.11, 0.11, -19.5, i * 3.4, DKZ + 0.5, steelMat);
      bx(1.1, 0.9, 0.7, -19.0, i * 1.7, DKZ + 0.35, darkMat);            /* stowed crates */
      cz(0.1, 0.1, 1.2, 6, -20.4, i * 4.9, DKZ + 0.6, steelMat);         /* ensign staffs */
      bx(1.5, 1.5, 0.9, 9.0, i * 4.0, DKZ + 0.45, greyMat);              /* MANPADS ready lockers */
    }
    cz(0.55, 0.55, 0.45, 12, 17.6, 0, DKZ + 0.22, greyMat);              /* windlass */
    cx(0.45, 0.45, 0.9, 10, 17.6, 0, DKZ + 0.5, darkMat);
    bx(1.8, 2.2, 0.9, -16.0, 0, DKZ + 0.45, darkMat);                    /* inflatable boat stowage */
    rail([[19.6, -1.9], [17.8, -3.7], [13, -4.9], [6, -5.45], [-6, -5.6], [-20.4, -5.55]], DKZ, 1.05, steelMat);
    rail([[19.6, 1.9], [17.8, 3.7], [13, 4.9], [6, 5.45], [-6, 5.6], [-20.4, 5.55]], DKZ, 1.05, steelMat);
    rail([[-20.4, -5.55], [-20.4, 5.55]], DKZ, 1.05, steelMat);
    return g;
  }
};

UNIT_MODELS["boat_p"] = {
  len: 62,
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var i, sd = 5209;
    function rnd() { sd = (sd * 9301 + 49297) % 233280; return sd / 233280; }
    function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
    /* hull skin: u = stern -> bow, v = around (0 port, .25 top, .5 stbd, .75 keel) */
    function hullTex(base, dk, wl, num, nsz, nsx) {
      var W = 1024, H = 512, cv = cvs(W, H), c = cv.getContext("2d"), j, p, L;
      c.fillStyle = base; c.fillRect(0, 0, W, H);
      for (j = 0; j < 64; j++) { c.fillStyle = rnd() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"; c.fillRect(rnd() * W, rnd() * H, 40 + rnd() * 160, 10 + rnd() * 46); }
      c.fillStyle = dk; c.fillRect(0, 0.19 * H, W, 0.125 * H);
      c.fillStyle = "rgba(0,0,0,0.12)"; for (j = 0; j < 1500; j++) c.fillRect(rnd() * W, (0.192 + rnd() * 0.12) * H, 2, 2);
      c.fillStyle = "#181c1f"; c.fillRect(0, (0.5 + wl) * H, W, (0.5 - 2 * wl) * H);
      c.fillStyle = "#0b0d0f"; c.fillRect(0, (0.5 + wl - 0.02) * H, W, 0.02 * H); c.fillRect(0, (1 - wl) * H, W, 0.02 * H);
      c.strokeStyle = "rgba(0,0,0,0.30)"; c.lineWidth = 1.4;
      for (j = 1; j < 28; j++) { p = j / 28 * W; c.beginPath(); c.moveTo(p, 0); c.lineTo(p, H); c.stroke(); }
      var sk = [0.055, 0.13, 0.37, 0.445];
      for (j = 0; j < 4; j++) { c.beginPath(); c.moveTo(0, sk[j] * H); c.lineTo(W, sk[j] * H); c.stroke(); }
      c.fillStyle = "rgba(26,18,12,0.30)";                                  /* rust weeping from the deck edge */
      for (j = 0; j < 42; j++) {
        p = rnd() * W; L = 10 + rnd() * 44; c.fillRect(p, 0.19 * H - L, 2.5, L);
        p = rnd() * W; L = 10 + rnd() * 44; c.fillRect(p, 0.315 * H, 2.5, L);
      }
      c.fillStyle = "rgba(0,0,0,0.34)";                                     /* freeing ports / scuttles */
      for (j = 0; j < 9; j++) { p = (0.1 + j * 0.085) * W; c.fillRect(p, 0.135 * H, 16, 7); c.fillRect(p, 0.358 * H, 16, 7); }
      if (num) {
        c.fillStyle = "#c9ced2"; c.font = "bold " + nsz + "px sans-serif"; c.textAlign = "center";
        c.save(); c.translate(0.885 * W, 0.45 * H); c.scale(nsx, 1); c.fillText(num, 0, 0); c.restore();
        c.save(); c.translate(0.885 * W, 0.055 * H); c.scale(-nsx, 1); c.fillText(num, 0, 0); c.restore();
      }
      var t = new THREE.CanvasTexture(cv); t.anisotropy = 4; return t;
    }
    function deckTex(x0, x1, y0, y1, base, paint) {
      var W = 1024, H = 384, cv = cvs(W, H), c = cv.getContext("2d"), j;
      function PX(x) { return (x - x0) / (x1 - x0) * W; }
      function PY(y) { return (y1 - y) / (y1 - y0) * H; }
      c.fillStyle = base; c.fillRect(0, 0, W, H);
      for (j = 0; j < 55; j++) { c.fillStyle = rnd() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)"; c.fillRect(rnd() * W, rnd() * H, 30 + rnd() * 130, 12 + rnd() * 60); }
      c.fillStyle = "rgba(0,0,0,0.12)"; for (j = 0; j < 2200; j++) c.fillRect(rnd() * W, rnd() * H, 2, 2);
      c.strokeStyle = "rgba(0,0,0,0.25)"; c.lineWidth = 1.2;
      for (j = 1; j < 24; j++) { c.beginPath(); c.moveTo(j / 24 * W, 0); c.lineTo(j / 24 * W, H); c.stroke(); }
      for (j = 1; j < 8; j++) { c.beginPath(); c.moveTo(0, j / 8 * H); c.lineTo(W, j / 8 * H); c.stroke(); }
      paint(c, PX, PY, W, H);
      var t = new THREE.CanvasTexture(cv); t.anisotropy = 4; return t;
    }
    function bx(sx, sy, sz, x, y, z, mt, par) { var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mt); m.position.set(x, y, z); (par || g).add(m); return m; }
    function tp(sx, sy, sz, kx, ky, x, y, z, mt, par) {
      var gm = new THREE.BoxGeometry(sx, sy, sz), a = gm.attributes.position, q;
      for (q = 0; q < a.count; q++) if (a.getZ(q) > 0) { a.setX(q, a.getX(q) * kx); a.setY(q, a.getY(q) * ky); }
      a.needsUpdate = true; gm.computeVertexNormals();
      var m = new THREE.Mesh(gm, mt); m.position.set(x, y, z); (par || g).add(m); return m;
    }
    function cx(r1, r2, len, seg, x, y, z, mt, par) { var cg = new THREE.CylinderGeometry(r1, r2, len, seg); cg.rotateZ(Math.PI / 2); var m = new THREE.Mesh(cg, mt); m.position.set(x, y, z); (par || g).add(m); return m; }
    function cz(r1, r2, len, seg, x, y, z, mt, par) { var cg = new THREE.CylinderGeometry(r1, r2, len, seg); cg.rotateX(Math.PI / 2); var m = new THREE.Mesh(cg, mt); m.position.set(x, y, z); (par || g).add(m); return m; }
    function plate(pts, thick, ztop, topMat, sideMat, u0, u1, v0, v1, par) {
      var sh = new THREE.Shape(), j; sh.moveTo(pts[0][0], pts[0][1]);
      for (j = 1; j < pts.length; j++) sh.lineTo(pts[j][0], pts[j][1]);
      sh.closePath();
      var dg = new THREE.ExtrudeGeometry(sh, { depth: thick, bevelEnabled: false });
      var dp = dg.attributes.position, du = dg.attributes.uv;
      for (j = 0; j < dp.count; j++) du.setXY(j, (dp.getX(j) - u0) / (u1 - u0), (dp.getY(j) - v0) / (v1 - v0));
      var m = new THREE.Mesh(dg, [topMat, sideMat]); m.position.z = ztop - thick; (par || g).add(m); return m;
    }
    function rail(path, z0, h, mt, par) {
      var p = par || g, a, b, dx, dy, L, an, m, q, n, w2, sg = new THREE.CylinderGeometry(0.035, 0.035, h, 4); sg.rotateX(Math.PI / 2);
      for (q = 0; q < path.length - 1; q++) {
        a = path[q]; b = path[q + 1]; dx = b[0] - a[0]; dy = b[1] - a[1]; L = Math.sqrt(dx * dx + dy * dy);
        if (L < 0.3) continue;
        an = Math.atan2(dy, dx);
        for (n = 0; n < 2; n++) {
          m = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, L, 4), mt);
          m.rotation.z = an - Math.PI / 2; m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, z0 + (n ? h : h * 0.55)); p.add(m);
        }
        n = Math.max(1, Math.round(L / 2.2));
        for (w2 = 0; w2 <= n; w2++) { if (q > 0 && w2 === 0) continue; m = new THREE.Mesh(sg, mt); m.position.set(a[0] + dx * w2 / n, a[1] + dy * w2 / n, z0 + h / 2); p.add(m); }
      }
    }

    var DKZ = 3.35, DX0 = -31, DX1 = 18, DY0 = -4.3, DY1 = 4.3;
    var hullMat = new THREE.MeshStandardMaterial({ map: hullTex("#666b6a", "#4e5450", 0.058, "056", 26, 0.82), metalness: 0.3, roughness: 0.62 });
    var deckMat = new THREE.MeshStandardMaterial({
      map: deckTex(DX0, DX1, DY0, DY1, "#4e5450", function (c, PX, PY) {
        var j, u = PX(1) - PX(0), v = PY(0) - PY(1);
        c.strokeStyle = "#c8cdcf"; c.lineWidth = 3;
        c.beginPath(); c.moveTo(PX(-30), PY(-3.1)); c.lineTo(PX(12), PY(-3.4)); c.lineTo(PX(17), PY(-2.4)); c.stroke();
        c.beginPath(); c.moveTo(PX(-30), PY(3.1)); c.lineTo(PX(12), PY(3.4)); c.lineTo(PX(17), PY(2.4)); c.stroke();
        c.fillStyle = "rgba(10,12,14,0.5)";
        c.fillRect(PX(-28), PY(1.2), 2.4 * u, 2.4 * v);                 /* mooring / hatch panels */
        c.fillRect(PX(15), PY(1.0), 2.0 * u, 2.0 * v);
        c.fillRect(PX(-24), PY(-1.0), 1.6 * u, 2.0 * v);
        c.strokeStyle = "rgba(0,0,0,0.45)"; c.lineWidth = 2;
        c.strokeRect(PX(-28), PY(1.2), 2.4 * u, 2.4 * v);
        c.strokeRect(PX(15), PY(1.0), 2.0 * u, 2.0 * v);
        c.strokeStyle = "#b9bfc0"; c.lineWidth = 2;                     /* fore-and-aft walkway */
        c.beginPath(); c.moveTo(PX(-30), PY(-2.1)); c.lineTo(PX(16), PY(-2.1)); c.stroke();
        c.beginPath(); c.moveTo(PX(-30), PY(2.1)); c.lineTo(PX(16), PY(2.1)); c.stroke();
        c.fillStyle = "rgba(0,0,0,0.3)";
        for (j = -29; j < 17; j += 2) { c.fillRect(PX(j) - 2, PY(2.8) - 2, 5, 5); c.fillRect(PX(j) - 2, PY(-2.8) - 2, 5, 5); }
      }), metalness: 0.2, roughness: 0.72
    });
    var greyMat = new THREE.MeshStandardMaterial({ color: 0x7b807e, metalness: 0.3, roughness: 0.6 });
    var darkMat = new THREE.MeshStandardMaterial({ color: 0x2a2e30, metalness: 0.3, roughness: 0.62 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x3d4246, metalness: 0.85, roughness: 0.3 });
    var glassMat = new THREE.MeshPhysicalMaterial({ color: 0x131e26, metalness: 0.4, roughness: 0.16 });
    var teamMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.team), metalness: 0.25, roughness: 0.55 });

    /* ---------- low-freeboard river hull ---------- */
    g.add(new THREE.Mesh(M.loft(THREE, [
      { x: -31.0, w: 4.10, h: 2.35, zc: 0.92, sq: 0.60 },
      { x: -26.0, w: 4.60, h: 2.38, zc: 0.90, sq: 0.58 },
      { x: -14.0, w: 4.80, h: 2.42, zc: 0.88, sq: 0.56 },
      { x: 0.0, w: 4.80, h: 2.45, zc: 0.88, sq: 0.55 },
      { x: 12.0, w: 4.55, h: 2.52, zc: 0.92, sq: 0.55 },
      { x: 21.0, w: 3.70, h: 2.62, zc: 1.05, sq: 0.55 },
      { x: 27.0, w: 2.30, h: 2.75, zc: 1.30, sq: 0.55 },
      { x: 30.2, w: 0.85, h: 2.85, zc: 1.60, sq: 0.55 },
      { x: 31.0, w: 0.12, h: 2.85, zc: 1.75, sq: 0.55 }
    ], 22), hullMat));
    bx(0.3, 7.6, 4.4, -31.0, 0, 0.95, hullMat);                          /* transom */
    plate([[-30.8, -3.45], [-26, -3.86], [-14, -4.03], [0, -4.03], [12, -3.82], [17.5, -3.3],
      [17.5, 3.3], [12, 3.82], [0, 4.03], [-14, 4.03], [-26, 3.86], [-30.8, 3.45]],
      0.5, DKZ, deckMat, hullMat, DX0, DX1, DY0, DY1);
    for (i = -1; i <= 1; i += 2) {
      bx(30, 0.4, 0.22, -7, i * 4.78, 1.5, hullMat);                     /* knuckle strake */
      bx(3.2, 1.3, 1.0, -29.6, i * 2.2, -0.55, darkMat);                 /* waterjet housings */
      cx(0.5, 0.5, 0.7, 10, -31.4, i * 2.2, -0.3, steelMat);
      bx(3.0, 0.3, 1.5, 24.5, i * 2.0, 2.6, hullMat);                    /* bow bulwark plating */
    }

    /* ---------- blocky faceted superstructure ---------- */
    tp(21.0, 7.9, 2.7, 0.95, 0.86, 2.0, 0, 4.62, greyMat);
    tp(13.0, 6.4, 2.4, 0.94, 0.86, 4.5, 0, 7.25, greyMat);
    tp(6.6, 5.4, 2.3, 0.9, 0.88, 8.2, 0, 9.6, greyMat);                  /* bridge */
    bx(7.0, 5.8, 0.16, 8.2, 0, 10.83, darkMat);
    var wsf = bx(0.2, 4.3, 1.05, 11.0, 0, 9.9, glassMat); wsf.rotation.y = -0.2;
    for (i = -1; i <= 1; i += 2) {
      bx(5.4, 0.12, 0.8, 8.0, i * 2.5, 9.9, glassMat);                   /* bridge wing glass */
      bx(9.0, 0.1, 0.7, 4.0, i * 3.0, 7.6, glassMat);
      bx(0.9, 0.12, 1.6, -6.5, i * 3.55, 4.5, darkMat);                  /* watertight doors */
      bx(3.4, 0.5, 0.6, 0.0, i * 3.7, 3.9, teamMat);                     /* team identification stripe */
      bx(2.6, 1.5, 1.4, -3.0, i * 3.1, 6.9, darkMat);                    /* uptake casings */
      cz(0.55, 0.5, 1.4, 8, -3.0, i * 3.1, 8.2, darkMat);                /* funnel pipes */
      cz(0.9, 0.9, 0.9, 10, 6.0, i * 3.4, 6.35, greyMat);                /* liferaft canisters */
      cz(0.35, 0.35, 0.5, 8, 12.2, i * 1.9, 8.95, greyMat);              /* signal lamps */
      bx(1.4, 1.4, 0.5, 12.4, i * 2.4, 8.6, greyMat);                    /* bridge wing platforms */
    }

    /* ---------- enclosed pyramid mast + radars ---------- */
    tp(4.4, 4.6, 5.2, 0.55, 0.5, 1.0, 0, 11.05, greyMat);
    tp(2.0, 2.2, 2.2, 0.7, 0.7, 1.0, 0, 14.7, greyMat);
    cz(1.35, 1.35, 1.9, 12, 1.0, 0, 16.8, greyMat);                      /* Pozitiv radome */
    cz(1.4, 0.2, 0.8, 12, 1.0, 0, 18.1, greyMat);
    cz(0.14, 0.1, 3.0, 6, 1.0, 0, 20.0, steelMat);
    bx(0.2, 4.6, 0.1, 3.2, 0, 13.6, darkMat);                            /* yard arm */
    bx(1.4, 0.9, 0.9, 3.6, 0, 12.6, darkMat);                            /* fire-control radar */
    cz(0.55, 0.55, 0.24, 12, 3.6, 0, 13.2, darkMat);
    for (i = -1; i <= 1; i += 2) {
      cz(0.06, 0.05, 3.4, 5, 3.2, i * 2.2, 15.0, steelMat);              /* whip antennas */
      cz(0.4, 0.4, 0.45, 10, -1.0, i * 1.3, 13.9, darkMat);              /* ECM domes */
      bx(0.7, 0.5, 1.1, -2.4, i * 1.7, 12.6, darkMat);                   /* ESM panels */
    }

    /* ---------- 100 mm A-190 bow gun ---------- */
    plate([[17.4, -3.3], [22.5, -3.0], [25.0, -2.4], [25.0, 2.4], [22.5, 3.0], [17.4, 3.3]], 0.35, 4.0, greyMat, greyMat, 0, 1, 0, 1);
    var tur = new THREE.Group(); tur.name = "turret"; tur.position.set(20.6, 0, 4.0); g.add(tur);
    cz(1.45, 1.55, 0.35, 14, 0, 0, 0.17, greyMat, tur);
    tp(4.0, 3.0, 1.5, 0.62, 0.62, -0.15, 0, 1.1, greyMat, tur);
    var fp = bx(0.5, 2.3, 1.35, 1.75, 0, 1.15, greyMat, tur); fp.rotation.y = 0.42;   /* sloped front plate */
    bx(1.0, 1.1, 0.7, 1.9, 0, 1.15, greyMat, tur);                       /* mantlet */
    cx(0.135, 0.115, 5.4, 10, 4.7, 0, 1.2, steelMat, tur);               /* 100 mm barrel */
    cx(0.2, 0.2, 1.0, 10, 3.3, 0, 1.2, steelMat, tur);                   /* fume extractor */
    cx(0.155, 0.155, 0.45, 10, 7.5, 0, 1.2, darkMat, tur);               /* muzzle */
    bx(0.5, 0.4, 0.3, -1.0, 0, 2.0, darkMat, tur);                       /* rear sight box */

    /* ---------- aft armament: MLRS block, 30 mm gatlings ---------- */
    bx(3.6, 3.2, 2.0, -13.5, 0, 4.35, greyMat);                          /* Grad-M launcher block */
    var mrls = new THREE.CylinderGeometry(0.16, 0.16, 3.4, 6); mrls.rotateZ(Math.PI / 2);
    for (i = 0; i < 5; i++) for (var q = 0; q < 4; q++) {
      var tb = new THREE.Mesh(mrls, darkMat);
      tb.position.set(-13.4, (i - 2) * 0.62, 3.75 + q * 0.44); g.add(tb);
    }
    for (i = -1; i <= 1; i += 2) {
      bx(3.0, 1.6, 0.8, -20.5, i * 3.4, 3.75, greyMat);                  /* gun sponsons */
      cz(0.75, 0.85, 0.7, 12, -20.5, i * 3.5, 4.5, greyMat);
      cz(0.6, 0.6, 0.8, 12, -20.5, i * 3.5, 5.2, darkMat);
      var gt = cx(0.2, 0.2, 1.7, 10, -19.4, i * 3.5, 5.35, steelMat); gt.rotation.y = -0.25;
      cz(0.2, 0.2, 0.5, 8, -18.5, i * 3.5, 5.6, darkMat);                /* gatling radar */
      bx(1.9, 1.0, 0.9, -25.0, i * 2.8, 3.8, darkMat);                   /* stowed crates */
      bx(0.5, 0.5, 1.2, -8.0, i * 3.9, 3.95, greyMat);                   /* deck lockers */
    }
    bx(2.6, 4.6, 1.2, -27.5, 0, 3.95, greyMat);                          /* aft deckhouse */
    bx(1.0, 1.0, 0.6, -17.0, 0, 3.95, darkMat);
    cz(0.18, 0.18, 2.4, 6, -17.0, 0, 5.4, steelMat);                     /* aft mast */
    bx(0.9, 0.9, 0.3, -17.0, 0, 6.7, darkMat);
    for (i = -1; i <= 1; i += 2) {
      cz(0.12, 0.12, 0.55, 6, -29.5, i * 2.4, 3.75, steelMat);           /* bitts */
      cz(0.12, 0.12, 0.55, 6, 15.5, i * 2.6, 3.75, steelMat);
      bx(0.6, 0.12, 0.12, -29.5, i * 2.4, 4.06, steelMat);
      bx(0.6, 0.12, 0.12, 15.5, i * 2.6, 4.06, steelMat);
      cz(0.09, 0.09, 1.3, 6, -30.4, i * 2.9, 4.1, steelMat);             /* ensign staffs */
    }
    cz(0.6, 0.6, 0.5, 12, 14.0, 0, 3.85, greyMat);                       /* anchor windlass */
    cx(0.5, 0.5, 1.0, 10, 14.0, 0, 4.2, darkMat);
    rail([[17.2, -3.0], [12, -3.6], [0, -3.8], [-14, -3.8], [-26, -3.62], [-30.6, -3.25]], DKZ, 1.05, steelMat);
    rail([[17.2, 3.0], [12, 3.6], [0, 3.8], [-14, 3.8], [-26, 3.62], [-30.6, 3.25]], DKZ, 1.05, steelMat);
    rail([[-30.6, -3.25], [-30.6, 3.25]], DKZ, 1.05, steelMat);
    rail([[12.6, -2.9], [12.6, 2.9]], 8.85, 1.0, steelMat);
    return g;
  }
};

BLD_MODELS["conyard"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var SD = 91217, i, j, s;
    function rn() { SD = (SD * 16807) % 2147483647; return (SD % 10000) / 10000; }
    function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
    function tex(c, rx, ry) {
      var t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (rx) t.repeat.set(rx, ry);
      return t;
    }
    function patches(x, w, h, n, lt, dk) {
      for (var q = 0; q < n; q++) {
        x.globalAlpha = 0.04 + rn() * 0.04;
        x.fillStyle = (q % 3 === 0) ? lt : dk;
        x.fillRect(rn() * w, rn() * h, w * 0.05 + rn() * w * 0.24, h * 0.04 + rn() * h * 0.2);
      }
      x.globalAlpha = 1;
    }
    function seams(x, w, h, cols, rows, col) {
      x.globalAlpha = 0.5; x.strokeStyle = col || "#20241e"; x.lineWidth = 2; x.beginPath();
      for (var q = 1; q < cols; q++) { x.moveTo(q * w / cols, 0); x.lineTo(q * w / cols, h); }
      for (q = 1; q < rows; q++) { x.moveTo(0, q * h / rows); x.lineTo(w, q * h / rows); }
      x.stroke(); x.globalAlpha = 1;
    }
    function drips(x, w, h, n, col) {
      x.fillStyle = col || "#15180f";
      for (var q = 0; q < n; q++) {
        x.globalAlpha = 0.05 + rn() * 0.09;
        x.fillRect(rn() * w, rn() * h * 0.5, 1 + rn() * 4, h * 0.08 + rn() * h * 0.3);
      }
      x.globalAlpha = 1;
    }
    function hazard(x, px, py, pw, ph, step) {
      x.save(); x.beginPath(); x.rect(px, py, pw, ph); x.clip();
      x.globalAlpha = 0.94; x.fillStyle = "#c9a825"; x.fillRect(px, py, pw, ph);
      x.fillStyle = "#191a16";
      for (var q = -2; q < (pw + ph) / step + 2; q++) {
        var bx = px + q * step;
        x.beginPath();
        x.moveTo(bx, py); x.lineTo(bx + step * 0.5, py);
        x.lineTo(bx + step * 0.5 + ph, py + ph); x.lineTo(bx + ph, py + ph);
        x.closePath(); x.fill();
      }
      x.globalAlpha = 1; x.restore();
    }

    /* ---------------- textures ---------------- */
    var ac = cvs(512, 512), ax = ac.getContext("2d");
    ax.fillStyle = "#565b54"; ax.fillRect(0, 0, 512, 512);
    patches(ax, 512, 512, 44, "#7f8479", "#31352e");
    ax.globalAlpha = 0.4; ax.strokeStyle = "#2b2e28"; ax.lineWidth = 3; ax.beginPath();
    for (i = 1; i < 8; i++) { ax.moveTo(i * 64, 0); ax.lineTo(i * 64, 512); ax.moveTo(0, i * 64); ax.lineTo(512, i * 64); }
    ax.stroke(); ax.globalAlpha = 1;
    hazard(ax, 0, 452, 512, 26, 26);
    hazard(ax, 120, 178, 268, 18, 24);
    ax.globalAlpha = 0.7; ax.fillStyle = "#cbc7b2";
    for (i = 0; i < 10; i++) ax.fillRect(28 + i * 48, 300, 26, 5);
    ax.fillRect(24, 60, 5, 240); ax.fillRect(482, 60, 5, 240);
    ax.globalAlpha = 0.16; ax.fillStyle = "#0b0d09";
    for (i = 0; i < 22; i++) ax.fillRect(rn() * 512, rn() * 512, 30 + rn() * 120, 4 + rn() * 7);
    for (i = 0; i < 12; i++) {
      ax.globalAlpha = 0.1 + rn() * 0.12;
      ax.beginPath(); ax.ellipse(rn() * 512, rn() * 512, 8 + rn() * 22, 6 + rn() * 14, rn() * 3, 0, 6.283); ax.fill();
    }
    ax.globalAlpha = 1;
    var apronTex = tex(ac);

    function wallCanvas(base, winRows, winCols) {
      var c = cvs(256, 256), x = c.getContext("2d");
      x.fillStyle = base; x.fillRect(0, 0, 256, 256);
      patches(x, 256, 256, 26, "#b6b9ab", "#22261e");
      seams(x, 256, 256, 8, 5);
      x.globalAlpha = 0.35; x.fillStyle = "#2a2e26"; x.fillRect(0, 236, 256, 20); x.globalAlpha = 1;
      var r, q, wx, wy, ww = Math.floor(210 / winCols), wh = 30;
      for (r = 0; r < winRows; r++) for (q = 0; q < winCols; q++) {
        wx = 22 + q * (ww + 6); wy = 44 + r * 74;
        x.fillStyle = "#1d262a"; x.fillRect(wx, wy, ww - 8, wh);
        x.globalAlpha = 0.22; x.fillStyle = "#9fb3bd"; x.fillRect(wx + 2, wy + 2, (ww - 8) * 0.45, wh * 0.45); x.globalAlpha = 1;
        x.strokeStyle = "#787c72"; x.lineWidth = 2; x.strokeRect(wx, wy, ww - 8, wh);
        x.beginPath(); x.moveTo(wx + (ww - 8) / 2, wy); x.lineTo(wx + (ww - 8) / 2, wy + wh); x.stroke();
      }
      drips(x, 256, 256, 26);
      return c;
    }
    var wallTex = tex(wallCanvas("#6f7468", 2, 6));
    var endTex = tex(wallCanvas("#6f7468", 2, 4));

    var rc = cvs(256, 256), rx = rc.getContext("2d");
    rx.fillStyle = "#4b5054"; rx.fillRect(0, 0, 256, 256);
    rx.globalAlpha = 0.32; rx.strokeStyle = "#2b2f31"; rx.lineWidth = 2;
    for (i = 0; i < 64; i++) { rx.beginPath(); rx.moveTo(i * 4, 0); rx.lineTo(i * 4, 256); rx.stroke(); }
    rx.globalAlpha = 1;
    patches(rx, 256, 256, 22, "#787d7f", "#6a4a2a");
    rx.globalAlpha = 0.5; rx.strokeStyle = "#24282a"; rx.lineWidth = 3;
    for (i = 1; i < 5; i++) { rx.beginPath(); rx.moveTo(0, i * 51); rx.lineTo(256, i * 51); rx.stroke(); }
    rx.globalAlpha = 1;
    var roofTex = tex(rc, 3, 3);

    var dc = cvs(256, 256), dx = dc.getContext("2d");
    dx.fillStyle = "#5a5f58"; dx.fillRect(0, 0, 256, 256);
    dx.globalAlpha = 0.4; dx.strokeStyle = "#26291f"; dx.lineWidth = 4;
    for (i = 1; i < 12; i++) { dx.beginPath(); dx.moveTo(0, i * 21); dx.lineTo(256, i * 21); dx.stroke(); }
    dx.globalAlpha = 1;
    hazard(dx, 0, 0, 256, 30, 30);
    hazard(dx, 0, 226, 256, 30, 30);
    patches(dx, 256, 256, 12, "#8f948a", "#25281f");
    drips(dx, 256, 256, 16);
    var doorTex = tex(dc);

    var lc = cvs(64, 64), lx = lc.getContext("2d");
    lx.clearRect(0, 0, 64, 64);
    lx.strokeStyle = "rgba(198,204,206,0.98)"; lx.lineWidth = 3;
    for (i = -64; i < 128; i += 16) {
      lx.beginPath(); lx.moveTo(i, 0); lx.lineTo(i + 64, 64); lx.stroke();
      lx.beginPath(); lx.moveTo(i, 64); lx.lineTo(i + 64, 0); lx.stroke();
    }
    var linkCv = lc;

    /* ---------------- materials ---------------- */
    var conc = new THREE.MeshStandardMaterial({ color: 0xffffff, map: wallTex, roughness: 0.78, metalness: 0.05 });
    var concEnd = new THREE.MeshStandardMaterial({ color: 0xffffff, map: endTex, roughness: 0.78, metalness: 0.05 });
    var roofM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: roofTex, roughness: 0.62, metalness: 0.3 });
    var apronM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: apronTex, roughness: 0.9, metalness: 0.02 });
    var plainM = new THREE.MeshStandardMaterial({ color: 0x565b54, roughness: 0.88, metalness: 0.02 });
    var steel = new THREE.MeshStandardMaterial({ color: 0x8b908b, roughness: 0.3, metalness: 0.85 });
    var paint = new THREE.MeshStandardMaterial({ color: 0xbb8a20, roughness: 0.55, metalness: 0.3 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x2a2d2a, roughness: 0.6, metalness: 0.4 });
    var wood = new THREE.MeshStandardMaterial({ color: 0x6d5c3f, roughness: 0.85, metalness: 0.02 });
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x1b262c, roughness: 0.18, metalness: 0.2 });
    var doorM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: doorTex, roughness: 0.6, metalness: 0.25 });
    var teamM = new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.55, metalness: 0.15 });
    var lampM = new THREE.MeshStandardMaterial({ color: 0xf4eecb, emissive: 0x6a6440, roughness: 0.4, metalness: 0.2 });

    /* ---------------- primitives ---------------- */
    function box(a, b, c, m) { return new THREE.Mesh(new THREE.BoxGeometry(a, b, c), m); }
    function at(mesh, x, y, z, p) { mesh.position.set(x, y, z); (p || g).add(mesh); return mesh; }
    function cylZ(r1, r2, h, m, sg) { var ge = new THREE.CylinderGeometry(r1, r2, h, sg || 10); ge.rotateX(Math.PI / 2); return new THREE.Mesh(ge, m); }
    function cylX(r1, r2, l, m, sg) { var ge = new THREE.CylinderGeometry(r1, r2, l, sg || 8); ge.rotateZ(-Math.PI / 2); return new THREE.Mesh(ge, m); }

    function fenceRun(x0, y0, x1, y1, h) {
      var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), a = Math.atan2(dy, dx);
      var t = tex(linkCv, L / 2.2, h / 2.2);
      var m = new THREE.MeshStandardMaterial({ color: 0x9aa0a2, map: t, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 0.5, metalness: 0.6 });
      var ge = new THREE.PlaneGeometry(L, h); ge.rotateX(Math.PI / 2);
      var mesh = new THREE.Mesh(ge, m);
      mesh.position.set((x0 + x1) / 2, (y0 + y1) / 2, h / 2 + 0.1);
      mesh.rotation.z = a; g.add(mesh);
      var rail = cylX(0.05, 0.05, L, steel, 6);
      rail.position.set((x0 + x1) / 2, (y0 + y1) / 2, h + 0.1); rail.rotation.z = a; g.add(rail);
      var n = Math.max(2, Math.round(L / 4.5));
      for (var q = 0; q <= n; q++) {
        at(cylZ(0.075, 0.075, h + 0.3, steel, 6), x0 + dx * q / n, y0 + dy * q / n, (h + 0.3) / 2);
      }
    }

    function floodlight(px, py, hgt, ang) {
      var p = new THREE.Group(); p.position.set(px, py, 0); p.rotation.z = ang; g.add(p);
      at(cylZ(0.55, 0.65, 0.5, plainM, 8), 0, 0, 0.25, p);
      at(cylZ(0.14, 0.19, hgt, steel, 8), 0, 0, hgt / 2, p);
      at(box(0.25, 2.2, 0.22, steel), 0, 0, hgt + 0.1, p);
      for (var q = -1; q <= 1; q++) {
        at(box(0.42, 0.6, 0.5, dark), -0.1, q * 0.75, hgt + 0.42, p);
        at(box(0.06, 0.5, 0.4, lampM), 0.14, q * 0.75, hgt + 0.42, p);
      }
      at(box(0.3, 0.5, 0.7, dark), 0, 0, 1.3, p);
    }

    function crate(px, py, pz, sx, sy, sz, rot, mat) {
      var c = box(sx, sy, sz, mat || wood);
      c.position.set(px, py, pz + sz / 2); c.rotation.z = rot || 0; g.add(c);
      var b1 = box(sx + 0.05, 0.07, 0.09, dark); b1.position.set(px, py, pz + sz * 0.75); b1.rotation.z = rot || 0; g.add(b1);
      var b2 = box(sx + 0.05, 0.07, 0.09, dark); b2.position.set(px, py, pz + sz * 0.25); b2.rotation.z = rot || 0; g.add(b2);
    }
    function drum(px, py, pz, col) {
      var m = new THREE.MeshStandardMaterial({ color: col, roughness: 0.6, metalness: 0.35 });
      at(cylZ(0.3, 0.3, 0.92, m, 12), px, py, pz + 0.46);
      at(cylZ(0.32, 0.32, 0.07, dark, 12), px, py, pz + 0.62);
      at(cylZ(0.32, 0.32, 0.07, dark, 12), px, py, pz + 0.3);
    }
    function sandbags(px, py, ang, rows, per) {
      var grp = new THREE.Group(); grp.position.set(px, py, 0); grp.rotation.z = ang; g.add(grp);
      var bagM = new THREE.MeshStandardMaterial({ color: 0x7b7355, roughness: 0.95, metalness: 0.0 });
      for (var r = 0; r < rows; r++) for (var q = 0; q < per - r; q++) {
        var b = box(0.62, 0.4, 0.26, bagM);
        b.position.set((q - (per - r - 1) / 2) * 0.66 + (r % 2) * 0.16, 0, 0.14 + r * 0.25);
        b.rotation.z = (rn() - 0.5) * 0.16; grp.add(b);
      }
    }

    /* lattice mast: square section, 4 tube legs + horizontals + diagonals */
    function mast(px, py, z0, z1, half, tube, mat, parent) {
      var grp = new THREE.Group(); grp.position.set(px, py, 0); (parent || g).add(grp);
      var h = z1 - z0, q, c;
      var legG = new THREE.CylinderGeometry(tube, tube, h, 6); legG.rotateX(Math.PI / 2);
      for (q = 0; q < 4; q++) {
        var lx = (q < 2 ? 1 : -1) * half, ly = (q % 2 ? 1 : -1) * half;
        at(new THREE.Mesh(legG, mat), lx, ly, z0 + h / 2, grp);
      }
      var lv = Math.max(2, Math.round(h / (half * 2.1))), d = h / lv;
      var hbX = new THREE.BoxGeometry(half * 2, 0.11, 0.11);
      var hbY = new THREE.BoxGeometry(0.11, half * 2, 0.11);
      var dl = Math.sqrt(half * half * 4 + d * d);
      var dgX = new THREE.BoxGeometry(dl, 0.09, 0.09);
      var dgY = new THREE.BoxGeometry(dl, 0.09, 0.09); dgY.rotateZ(Math.PI / 2);
      for (q = 0; q <= lv; q++) {
        var z = z0 + q * d;
        at(new THREE.Mesh(hbX, mat), 0, half, z, grp);
        at(new THREE.Mesh(hbX, mat), 0, -half, z, grp);
        at(new THREE.Mesh(hbY, mat), half, 0, z, grp);
        at(new THREE.Mesh(hbY, mat), -half, 0, z, grp);
        if (q < lv) {
          for (c = -1; c <= 1; c += 2) {
            var m1 = at(new THREE.Mesh(dgX, mat), 0, c * half, z + d / 2, grp);
            m1.rotation.y = -Math.atan2(d, half * 2) * c;
            var m2 = at(new THREE.Mesh(dgY, mat), c * half, 0, z + d / 2, grp);
            m2.rotation.x = Math.atan2(d, half * 2) * c;
          }
        }
      }
      return grp;
    }

    /* ---------------- apron + kerbs ---------------- */
    var apron = new THREE.Mesh(new THREE.BoxGeometry(58, 58, 0.3),
      [plainM, plainM, plainM, plainM, apronM, plainM]);
    at(apron, 0, 0, 0.15);
    at(box(58, 0.7, 0.45, paint), 0, 28.6, 0.42);
    at(box(0.7, 58, 0.45, paint), -28.6, 0, 0.42);

    /* ---------------- industrial hall ---------------- */
    var hallX = -15, hallW = 26, hallD = 30, hallH = 11;
    var hall = new THREE.Mesh(new THREE.BoxGeometry(hallW, hallD, hallH),
      [concEnd, concEnd, conc, conc, roofM, plainM]);
    at(hall, hallX, 0, hallH / 2 + 0.3);
    /* pitched roof plates */
    var pitch = 0.14;
    for (s = -1; s <= 1; s += 2) {
      var rp = box(hallW + 1.2, hallD / 2 + 0.9, 0.35, roofM);
      rp.position.set(hallX, s * (hallD / 4 + 0.1), hallH + 0.3 + Math.tan(pitch) * hallD / 4 * 0.5 + 0.1);
      rp.rotation.x = -s * pitch;
      g.add(rp);
    }
    at(box(hallW + 1.4, 0.8, 0.5, roofM), hallX, 0, hallH + 0.3 + Math.tan(pitch) * hallD / 4 + 0.25);
    /* roof ribs + vents + skylights */
    for (i = -5; i <= 5; i++) {
      at(box(0.28, hallD * 0.98, 0.16, dark), hallX + i * 2.3, 0, hallH + 0.45 + Math.tan(pitch) * hallD / 4 * 0.5);
    }
    for (i = -1; i <= 1; i++) {
      at(box(2.6, 2.6, 1.1, roofM), hallX + i * 7, 5.5, hallH + 1.5);
      at(cylZ(1.0, 1.0, 0.5, dark, 12), hallX + i * 7, 5.5, hallH + 2.2);
      at(box(4.5, 3.2, 0.25, glass), hallX + i * 7, -6.5, hallH + 1.35);
    }
    /* gutters and downpipes */
    for (s = -1; s <= 1; s += 2) {
      at(cylX(0.16, 0.16, hallW + 1.0, dark, 6), hallX, s * (hallD / 2 + 0.45), hallH + 0.25);
      at(cylZ(0.14, 0.14, hallH, dark, 6), hallX - hallW / 2 + 0.4, s * (hallD / 2 + 0.3), hallH / 2 + 0.3);
      at(cylZ(0.14, 0.14, hallH, dark, 6), hallX + hallW / 2 - 0.4, s * (hallD / 2 + 0.3), hallH / 2 + 0.3);
    }
    /* team identification band */
    at(box(hallW + 0.35, hallD + 0.35, 0.75, teamM), hallX, 0, 9.3);
    /* big roller door on +X face */
    at(box(0.35, 13, 9.2, doorM), hallX + hallW / 2 + 0.05, 0, 4.9);
    at(box(0.55, 14.4, 0.7, steel), hallX + hallW / 2 + 0.1, 0, 9.75);
    for (s = -1; s <= 1; s += 2) at(box(0.55, 0.7, 9.6, steel), hallX + hallW / 2 + 0.1, s * 7.0, 5.1);
    /* personnel door + steps */
    at(box(0.3, 1.5, 2.5, dark), hallX + hallW / 2 + 0.05, -10.5, 1.55);
    at(box(1.4, 2.2, 0.35, plainM), hallX + hallW / 2 + 0.75, -10.5, 0.45);
    /* wall buttresses */
    for (i = -3; i <= 3; i++) {
      at(box(0.5, 0.9, hallH - 1.2, plainM), hallX - hallW / 2 - 0.2, i * 4.2, (hallH - 1.2) / 2 + 0.3);
    }
    /* ladder to roof */
    var lad = new THREE.Group(); lad.position.set(hallX - hallW / 2 - 0.55, 8, 0); g.add(lad);
    for (s = -1; s <= 1; s += 2) at(cylZ(0.06, 0.06, hallH, steel, 6), 0, s * 0.28, hallH / 2 + 0.3, lad);
    for (i = 0; i < 14; i++) at(cylX(0.04, 0.04, 0.56, steel, 5), 0, 0, 1.0 + i * 0.75, lad).rotation.z = Math.PI / 2;

    /* ---------------- lattice crane tower + slewing jib ---------------- */
    var cx = 4, cy = 12, towerTop = 31;
    at(box(7, 7, 1.1, plainM), cx, cy, 0.75);
    at(box(8.4, 8.4, 0.3, paint), cx, cy, 0.32);
    mast(cx, cy, 1.2, towerTop, 1.7, 0.24, steel);
    /* tie-in braces to the ground */
    for (s = -1; s <= 1; s += 2) {
      var tie = box(9.4, 0.22, 0.22, steel);
      tie.position.set(cx + s * 3.4, cy - 3.4, 5.2); tie.rotation.y = s * 0.62; g.add(tie);
    }
    /* climbing ladder inside the mast */
    for (i = 0; i < 20; i++) at(cylX(0.035, 0.035, 0.7, steel, 5), cx + 1.5, cy, 2.0 + i * 1.45);

    var turret = new THREE.Group(); turret.name = "turret";
    turret.position.set(cx, cy, towerTop); g.add(turret);
    at(cylZ(2.1, 2.1, 0.55, dark, 16), 0, 0, 0.28, turret);
    at(cylZ(1.75, 1.75, 0.35, steel, 16), 0, 0, 0.72, turret);
    /* slew deck */
    var deck = new THREE.Mesh(M.slab(THREE, [[-4.2, -1.9], [3.4, -1.9], [3.4, 1.9], [-4.2, 1.9]], 0.22), steel);
    at(deck, 0, 0, 0.9, turret);
    /* machinery house + winch drum */
    at(box(4.2, 3.0, 1.9, paint), -2.4, 0, 2.05, turret);
    at(box(1.2, 2.4, 0.9, dark), 0.4, 0, 1.6, turret);
    at(cylX(0.55, 0.55, 2.0, dark, 10), 0.4, 0, 1.6, turret);
    /* operator cab */
    var cab = new THREE.Group(); cab.position.set(2.6, 1.9, 1.1); turret.add(cab);
    at(box(2.4, 2.0, 2.4, paint), 0, 0, 1.2, cab);
    at(box(0.12, 1.7, 1.7, glass), 1.22, 0, 1.4, cab);
    at(box(2.0, 0.12, 1.5, glass), 0, -1.0, 1.45, cab);
    at(box(2.6, 2.2, 0.16, dark), 0, 0, 2.5, cab);
    /* jib: 3 chords + lattice, 22 m */
    var jibL = 22, chordG = new THREE.CylinderGeometry(0.13, 0.13, jibL, 6); chordG.rotateZ(-Math.PI / 2);
    for (s = -1; s <= 1; s += 2) at(new THREE.Mesh(chordG, steel), jibL / 2 + 1.6, s * 0.85, 1.15, turret);
    var top = new THREE.Mesh(chordG, steel); at(top, jibL / 2 + 1.6, 0, 2.55, turret); top.rotation.z = -0.028;
    for (i = 0; i <= 11; i++) {
      var jx = 1.8 + i * 2.0;
      at(box(0.09, 1.7, 0.09, steel), jx, 0, 1.15, turret);
      var vb = box(1.55, 0.09, 0.09, steel); vb.position.set(jx, 0.85, 1.85); vb.rotation.y = Math.PI / 2 - 0.42; turret.add(vb);
      var vb2 = box(1.55, 0.09, 0.09, steel); vb2.position.set(jx, -0.85, 1.85); vb2.rotation.y = Math.PI / 2 + 0.42; turret.add(vb2);
      if (i < 11) {
        var dg = box(2.28, 0.08, 0.08, steel);
        dg.position.set(jx + 1.0, (i % 2 ? 1 : -1) * 0.0, 1.15);
        dg.rotation.z = (i % 2 ? 1 : -1) * 0.72; turret.add(dg);
      }
    }
    at(box(1.1, 1.9, 0.5, dark), 23.2, 0, 1.6, turret);
    /* counter jib + counterweights */
    for (s = -1; s <= 1; s += 2) at(cylX(0.12, 0.12, 9.5, steel, 6), -6.4, s * 0.8, 1.15, turret);
    for (i = 0; i < 4; i++) at(box(0.09, 1.6, 0.09, steel), -2.4 - i * 2.2, 0, 1.15, turret);
    at(box(2.4, 3.4, 2.6, plainM), -10.0, 0, 2.35, turret);
    at(box(0.5, 3.0, 1.0, teamM), -11.3, 0, 2.35, turret);
    /* apex A-frame + tie bars */
    at(box(0.24, 0.24, 6.2, steel), 0.2, 0.9, 4.1, turret).rotation.x = 0.14;
    at(box(0.24, 0.24, 6.2, steel), 0.2, -0.9, 4.1, turret).rotation.x = -0.14;
    at(box(1.0, 2.2, 0.3, steel), 0.2, 0, 7.2, turret);
    var tie1 = box(20.2, 0.1, 0.1, steel); tie1.position.set(11.4, 0, 4.9); tie1.rotation.y = 0.24; turret.add(tie1);
    var tie2 = box(10.6, 0.1, 0.1, steel); tie2.position.set(-5.0, 0, 4.9); tie2.rotation.y = -0.44; turret.add(tie2);
    at(new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0xd8402c, emissive: 0x571209, roughness: 0.5, metalness: 0.2 })), 0.2, 0, 7.6, turret);
    /* trolley, hoist ropes, hook block */
    var trol = box(1.6, 2.0, 0.6, dark); at(trol, 15.5, 0, 0.72, turret);
    for (s = -1; s <= 1; s += 2) at(cylZ(0.035, 0.035, 13.5, dark, 4), 15.5, s * 0.42, -6.4, turret);
    at(box(1.0, 0.9, 0.8, paint), 15.5, 0, -13.6, turret);
    at(new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.09, 6, 12), steel), 15.5, 0, -14.4, turret).rotation.x = Math.PI / 2;

    /* ---------------- half-built steel frame ---------------- */
    var fx = 19, fy = -5;
    at(box(15, 15, 0.35, plainM), fx, fy, 0.35);
    for (i = -1; i <= 1; i++) for (j = -1; j <= 1; j++) {
      var ch = (i === 1 && j === 1) ? 4.6 : 9.4;
      at(box(0.42, 0.42, ch, steel), fx + i * 6, fy + j * 6, ch / 2 + 0.5);
      at(box(0.9, 0.9, 0.25, dark), fx + i * 6, fy + j * 6, 0.6);
    }
    for (i = -1; i <= 1; i++) {
      at(box(12.4, 0.3, 0.62, steel), fx, fy + i * 6, 4.8);
      at(box(0.3, 12.4, 0.62, steel), fx + i * 6, fy, 4.8);
      if (i < 1) at(box(12.4, 0.3, 0.62, steel), fx, fy + i * 6, 9.6);
    }
    at(box(12.4, 0.3, 0.62, steel), fx, fy - 6, 9.6);
    at(box(0.3, 12.4, 0.62, steel), fx - 6, fy, 9.6);
    /* part-laid decking */
    var deck2 = new THREE.Mesh(M.slab(THREE, [[-6, -6], [2, -6], [2, 6], [-6, 6]], 0.18), dark);
    at(deck2, fx, fy, 5.2);
    for (i = 0; i < 5; i++) at(box(12.2, 0.2, 0.3, steel), fx, fy - 6 + i * 3, 5.0);
    /* diagonal wind bracing */
    for (s = -1; s <= 1; s += 2) {
      var wb = box(8.6, 0.18, 0.18, steel); wb.position.set(fx + s * 3, fy - 6, 2.65); wb.rotation.y = s * 0.62; g.add(wb);
    }
    /* rebar cage + scaffold plank */
    at(box(3.4, 2.2, 0.1, steel), fx + 6.6, fy + 6.4, 5.3);
    for (i = 0; i < 6; i++) at(cylX(0.05, 0.05, 8, steel, 5), fx - 1, fy + 8.6 + i * 0.16, 0.6 + i * 0.11);

    /* ---------------- material stacks ---------------- */
    var mx = 6, my = -19;
    for (i = 0; i < 3; i++) at(box(9, 3.2, 0.55, steel), mx + (i - 1) * 0.25, my, 0.6 + i * 0.58);
    for (i = 0; i < 3; i++) for (j = 0; j <= i; j++) {
      at(cylX(0.42, 0.42, 8.6, dark, 8), mx + 9.6, my - 1.4 + (2 - i) * 0.45 + j * 0.9, 0.75 + (2 - i) * 0.78);
    }
    for (i = 0; i < 4; i++) at(box(8.2, 0.34, 0.34, paint), mx - 6.6, my - 1.2 + i * 0.42, 0.62 + (i % 2) * 0.38);
    for (i = 0; i < 5; i++) at(box(0.28, 0.28, 5.4, steel), mx - 6.0 + i * 0.5, my + 3.4, 3.0).rotation.y = 0.06 * (i - 2);
    crate(-2, -22, 0.3, 2.6, 2.0, 1.9, 0.2);
    crate(0.6, -21.4, 0.3, 2.0, 1.8, 1.4, -0.35);
    crate(-1.6, -22.1, 2.2, 2.2, 1.7, 1.2, 0.1);
    crate(20, 14, 0.3, 3.2, 2.4, 2.0, -0.15);
    crate(23.4, 13.2, 0.3, 2.4, 2.2, 1.6, 0.4);
    crate(20.4, 17.6, 0.3, 2.0, 2.0, 1.5, 0.1);
    drum(-6.5, -25.5, 0.3, 0x39566b); drum(-5.6, -25.9, 0.3, 0x7a4030);
    drum(-6.1, -24.6, 0.3, 0x4b5240); drum(-5.2, -24.9, 0.3, 0x39566b);
    drum(25.5, 8.6, 0.3, 0x7a4030); drum(26.2, 9.3, 0.3, 0x4b5240);
    sandbags(-1, 15.5, 0, 3, 6);
    sandbags(3.4, 20.5, 1.2, 2, 5);
    /* cement silo bags on pallet */
    at(box(2.6, 2.0, 0.16, wood), 12, -22, 0.4);
    for (i = 0; i < 6; i++) at(box(0.9, 0.62, 0.22, new THREE.MeshStandardMaterial({ color: 0x9d9a8b, roughness: 0.95 })),
      12 - 0.6 + (i % 2) * 1.2, -22 - 0.35 + Math.floor(i / 2) * 0.36, 0.6 + Math.floor(i / 2) * 0.02);

    /* ---------------- perimeter fence, gate, lights ---------------- */
    fenceRun(28.4, -28.4, 28.4, -6, 2.6);
    fenceRun(28.4, 6, 28.4, 28.4, 2.6);
    fenceRun(-28.4, -28.4, 28.4, -28.4, 2.6);
    at(box(0.6, 0.6, 4.2, plainM), 28.4, -6, 2.1);
    at(box(0.6, 0.6, 4.2, plainM), 28.4, 6, 2.1);
    at(box(0.5, 12.4, 0.5, paint), 28.4, 0, 4.3);
    at(box(0.4, 2.4, 1.0, teamM), 28.7, 0, 4.3);
    floodlight(-27, -27, 12, 0.8);
    floodlight(27, 27, 12, 3.9);
    floodlight(27, -27, 12, 2.3);
    floodlight(-27, 27, 12, 5.5);
    /* site office cabin */
    at(box(6.4, 3.2, 2.9, paint), 24, -20, 1.9);
    at(box(6.8, 3.6, 0.3, dark), 24, -20, 3.5);
    at(box(0.12, 1.2, 1.0, glass), 20.75, -20.8, 2.3);
    at(box(0.12, 1.2, 1.0, glass), 20.75, -19.2, 2.3);
    for (s = -1; s <= 1; s += 2) at(box(0.5, 0.5, 0.45, plainM), 24 + s * 2.8, -20, 0.25);
    return g;
  }
};

UNIT_MODELS["corvette_n"] = {
  len: 115,
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var i, sd = 3307;
    function rnd() { sd = (sd * 9301 + 49297) % 233280; return sd / 233280; }
    function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
    /* hull skin: u = stern -> bow, v = around (0 port, .25 top, .5 stbd, .75 keel) */
    function hullTex(base, dk, wl, num, nsz, nsx) {
      var W = 1024, H = 512, cv = cvs(W, H), c = cv.getContext("2d"), j, p, L;
      c.fillStyle = base; c.fillRect(0, 0, W, H);
      for (j = 0; j < 64; j++) { c.fillStyle = rnd() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"; c.fillRect(rnd() * W, rnd() * H, 40 + rnd() * 160, 10 + rnd() * 46); }
      c.fillStyle = dk; c.fillRect(0, 0.19 * H, W, 0.125 * H);
      c.fillStyle = "rgba(0,0,0,0.12)"; for (j = 0; j < 1500; j++) c.fillRect(rnd() * W, (0.192 + rnd() * 0.12) * H, 2, 2);
      c.fillStyle = "#181c1f"; c.fillRect(0, (0.5 + wl) * H, W, (0.5 - 2 * wl) * H);
      c.fillStyle = "#0b0d0f"; c.fillRect(0, (0.5 + wl - 0.02) * H, W, 0.02 * H); c.fillRect(0, (1 - wl) * H, W, 0.02 * H);
      c.strokeStyle = "rgba(0,0,0,0.30)"; c.lineWidth = 1.4;
      for (j = 1; j < 28; j++) { p = j / 28 * W; c.beginPath(); c.moveTo(p, 0); c.lineTo(p, H); c.stroke(); }
      var sk = [0.055, 0.13, 0.37, 0.445];
      for (j = 0; j < 4; j++) { c.beginPath(); c.moveTo(0, sk[j] * H); c.lineTo(W, sk[j] * H); c.stroke(); }
      c.fillStyle = "rgba(26,18,12,0.30)";                                  /* rust weeping from the deck edge */
      for (j = 0; j < 42; j++) {
        p = rnd() * W; L = 10 + rnd() * 44; c.fillRect(p, 0.19 * H - L, 2.5, L);
        p = rnd() * W; L = 10 + rnd() * 44; c.fillRect(p, 0.315 * H, 2.5, L);
      }
      c.fillStyle = "rgba(0,0,0,0.34)";                                     /* freeing ports / scuttles */
      for (j = 0; j < 9; j++) { p = (0.1 + j * 0.085) * W; c.fillRect(p, 0.135 * H, 16, 7); c.fillRect(p, 0.358 * H, 16, 7); }
      if (num) {
        c.fillStyle = "#c9ced2"; c.font = "bold " + nsz + "px sans-serif"; c.textAlign = "center";
        c.save(); c.translate(0.885 * W, 0.45 * H); c.scale(nsx, 1); c.fillText(num, 0, 0); c.restore();
        c.save(); c.translate(0.885 * W, 0.055 * H); c.scale(-nsx, 1); c.fillText(num, 0, 0); c.restore();
      }
      var t = new THREE.CanvasTexture(cv); t.anisotropy = 4; return t;
    }
    function deckTex(x0, x1, y0, y1, base, paint) {
      var W = 1024, H = 384, cv = cvs(W, H), c = cv.getContext("2d"), j;
      function PX(x) { return (x - x0) / (x1 - x0) * W; }
      function PY(y) { return (y1 - y) / (y1 - y0) * H; }
      c.fillStyle = base; c.fillRect(0, 0, W, H);
      for (j = 0; j < 55; j++) { c.fillStyle = rnd() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)"; c.fillRect(rnd() * W, rnd() * H, 30 + rnd() * 130, 12 + rnd() * 60); }
      c.fillStyle = "rgba(0,0,0,0.12)"; for (j = 0; j < 2200; j++) c.fillRect(rnd() * W, rnd() * H, 2, 2);
      c.strokeStyle = "rgba(0,0,0,0.25)"; c.lineWidth = 1.2;
      for (j = 1; j < 24; j++) { c.beginPath(); c.moveTo(j / 24 * W, 0); c.lineTo(j / 24 * W, H); c.stroke(); }
      for (j = 1; j < 8; j++) { c.beginPath(); c.moveTo(0, j / 8 * H); c.lineTo(W, j / 8 * H); c.stroke(); }
      paint(c, PX, PY, W, H);
      var t = new THREE.CanvasTexture(cv); t.anisotropy = 4; return t;
    }
    function bx(sx, sy, sz, x, y, z, mt, par) { var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mt); m.position.set(x, y, z); (par || g).add(m); return m; }
    function tp(sx, sy, sz, kx, ky, x, y, z, mt, par) {
      var gm = new THREE.BoxGeometry(sx, sy, sz), a = gm.attributes.position, q;
      for (q = 0; q < a.count; q++) if (a.getZ(q) > 0) { a.setX(q, a.getX(q) * kx); a.setY(q, a.getY(q) * ky); }
      a.needsUpdate = true; gm.computeVertexNormals();
      var m = new THREE.Mesh(gm, mt); m.position.set(x, y, z); (par || g).add(m); return m;
    }
    function cx(r1, r2, len, seg, x, y, z, mt, par) { var cg = new THREE.CylinderGeometry(r1, r2, len, seg); cg.rotateZ(Math.PI / 2); var m = new THREE.Mesh(cg, mt); m.position.set(x, y, z); (par || g).add(m); return m; }
    function cz(r1, r2, len, seg, x, y, z, mt, par) { var cg = new THREE.CylinderGeometry(r1, r2, len, seg); cg.rotateX(Math.PI / 2); var m = new THREE.Mesh(cg, mt); m.position.set(x, y, z); (par || g).add(m); return m; }
    function plate(pts, thick, ztop, topMat, sideMat, u0, u1, v0, v1, par) {
      var sh = new THREE.Shape(), j; sh.moveTo(pts[0][0], pts[0][1]);
      for (j = 1; j < pts.length; j++) sh.lineTo(pts[j][0], pts[j][1]);
      sh.closePath();
      var dg = new THREE.ExtrudeGeometry(sh, { depth: thick, bevelEnabled: false });
      var dp = dg.attributes.position, du = dg.attributes.uv;
      for (j = 0; j < dp.count; j++) du.setXY(j, (dp.getX(j) - u0) / (u1 - u0), (dp.getY(j) - v0) / (v1 - v0));
      var m = new THREE.Mesh(dg, [topMat, sideMat]); m.position.z = ztop - thick; (par || g).add(m); return m;
    }
    function rail(path, z0, h, mt, par) {
      var p = par || g, a, b, dx, dy, L, an, m, q, n, w2, sg = new THREE.CylinderGeometry(0.035, 0.035, h, 4); sg.rotateX(Math.PI / 2);
      for (q = 0; q < path.length - 1; q++) {
        a = path[q]; b = path[q + 1]; dx = b[0] - a[0]; dy = b[1] - a[1]; L = Math.sqrt(dx * dx + dy * dy);
        if (L < 0.3) continue;
        an = Math.atan2(dy, dx);
        for (n = 0; n < 2; n++) {
          m = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, L, 4), mt);
          m.rotation.z = an - Math.PI / 2; m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, z0 + (n ? h : h * 0.55)); p.add(m);
        }
        n = Math.max(1, Math.round(L / 2.2));
        for (w2 = 0; w2 <= n; w2++) { if (q > 0 && w2 === 0) continue; m = new THREE.Mesh(sg, mt); m.position.set(a[0] + dx * w2 / n, a[1] + dy * w2 / n, z0 + h / 2); p.add(m); }
      }
    }

    var DKZ = 7.15, DX0 = -57.5, DX1 = 41, DY0 = -8.2, DY1 = 8.2;
    var hullMat = new THREE.MeshStandardMaterial({ map: hullTex("#6d7378", "#4b5054", 0.125, "13", 20, 0.79), metalness: 0.3, roughness: 0.6 });
    var deckMat = new THREE.MeshStandardMaterial({
      map: deckTex(DX0, DX1, DY0, DY1, "#4b5054", function (c, PX, PY) {
        var j, u = PX(1) - PX(0), v = PY(0) - PY(1);
        function ring(cx0, cy0, r, lw, col) {
          c.strokeStyle = col; c.lineWidth = lw; c.beginPath();
          for (var q = 0; q <= 48; q++) {
            var a2 = q / 48 * Math.PI * 2, xx = PX(cx0 + Math.cos(a2) * r), yy = PY(cy0 + Math.sin(a2) * r);
            if (q === 0) c.moveTo(xx, yy); else c.lineTo(xx, yy);
          }
          c.stroke();
        }
        c.fillStyle = "rgba(0,0,0,0.10)";                                /* worn landing spot */
        c.fillRect(PX(-52), PY(6.5), 20 * u, 13 * v);
        ring(-43, 0, 6.1, 6, "#ccd1d4");                                 /* flight deck circle */
        ring(-43, 0, 3.0, 3, "#ccd1d4");
        c.strokeStyle = "#ccd1d4"; c.lineWidth = 5;                      /* landing line */
        c.beginPath(); c.moveTo(PX(-55), PY(0)); c.lineTo(PX(-33), PY(0)); c.stroke();
        c.beginPath(); c.moveTo(PX(-43), PY(-7)); c.lineTo(PX(-43), PY(7)); c.stroke();
        c.fillStyle = "#ccd1d4"; c.font = "bold 46px sans-serif"; c.textAlign = "center";
        c.save(); c.translate(PX(-38), PY(0)); c.rotate(Math.PI / 2); c.fillText("H", 0, 16); c.restore();
        c.strokeStyle = "#c2c8cb"; c.lineWidth = 3;                      /* deck edge safety lines */
        c.beginPath(); c.moveTo(PX(-56), PY(-6.6)); c.lineTo(PX(20), PY(-6.6)); c.lineTo(PX(34), PY(-5.2)); c.lineTo(PX(39), PY(-3.4)); c.stroke();
        c.beginPath(); c.moveTo(PX(-56), PY(6.6)); c.lineTo(PX(20), PY(6.6)); c.lineTo(PX(34), PY(5.2)); c.lineTo(PX(39), PY(3.4)); c.stroke();
        c.fillStyle = "rgba(10,12,14,0.5)";                              /* replenishment / hatch panels */
        c.fillRect(PX(24), PY(2.2), 5 * u, 4.4 * v);
        c.fillRect(PX(-33), PY(3.0), 3 * u, 6 * v);
        c.strokeStyle = "rgba(0,0,0,0.45)"; c.lineWidth = 2;
        c.strokeRect(PX(24), PY(2.2), 5 * u, 4.4 * v);
        c.fillStyle = "#b6bcbf"; c.font = "bold 22px sans-serif";
        c.fillText("VERTREP", PX(26.5), PY(-3.4));
        c.fillStyle = "rgba(0,0,0,0.3)";
        for (j = -56; j < 38; j += 2.5) { c.fillRect(PX(j) - 2, PY(5.4) - 2, 5, 5); c.fillRect(PX(j) - 2, PY(-5.4) - 2, 5, 5); }
        for (j = -54; j < -32; j += 3) for (var q2 = -6; q2 <= 6; q2 += 3) { c.fillRect(PX(j) - 3, PY(q2) - 3, 7, 7); }
      }), metalness: 0.2, roughness: 0.74
    });
    var greyMat = new THREE.MeshStandardMaterial({ color: 0x787e83, metalness: 0.3, roughness: 0.58 });
    var darkMat = new THREE.MeshStandardMaterial({ color: 0x2b2f33, metalness: 0.3, roughness: 0.62 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x3d4246, metalness: 0.85, roughness: 0.3 });
    var glassMat = new THREE.MeshPhysicalMaterial({ color: 0x131d26, metalness: 0.4, roughness: 0.15 });
    var teamMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.team), metalness: 0.25, roughness: 0.55 });

    /* ---------- semi-planing steel monohull, sharply raked stem ---------- */
    g.add(new THREE.Mesh(M.loft(THREE, [
      { x: -57.5, w: 7.60, h: 4.05, zc: 2.90, sq: 0.62 },
      { x: -48.0, w: 8.35, h: 4.10, zc: 2.90, sq: 0.60 },
      { x: -25.0, w: 8.75, h: 4.14, zc: 2.92, sq: 0.58 },
      { x: 0.0, w: 8.75, h: 4.15, zc: 2.93, sq: 0.56 },
      { x: 20.0, w: 8.35, h: 4.16, zc: 2.96, sq: 0.55 },
      { x: 34.0, w: 7.10, h: 4.20, zc: 3.05, sq: 0.55 },
      { x: 44.0, w: 5.00, h: 4.45, zc: 3.40, sq: 0.55 },
      { x: 52.0, w: 2.60, h: 4.85, zc: 4.00, sq: 0.55 },
      { x: 56.5, w: 0.80, h: 5.20, zc: 4.70, sq: 0.55 },
      { x: 57.5, w: 0.12, h: 5.28, zc: 4.98, sq: 0.55 }
    ], 22), hullMat));
    bx(0.5, 14.0, 8.4, -57.6, 0, 2.9, hullMat);                          /* transom */
    bx(3.2, 9.0, 4.6, -56.0, 0, 3.6, darkMat);                           /* stern boat / mission bay door */
    bx(0.4, 8.0, 3.4, -57.9, 0, 3.9, greyMat);
    plate([[-57.2, -6.9], [-48, -7.4], [-25, -7.65], [0, -7.65], [20, -7.3], [34, -6.1], [40, -4.6],
      [40, 4.6], [34, 6.1], [20, 7.3], [0, 7.65], [-25, 7.65], [-48, 7.4], [-57.2, 6.9]],
      1.05, DKZ, deckMat, hullMat, DX0, DX1, DY0, DY1);
    for (i = -1; i <= 1; i += 2) {
      bx(42, 0.6, 0.3, -10, i * 8.7, 4.6, hullMat);                      /* knuckle strake */
      bx(9.0, 0.5, 2.6, -14, i * 8.2, 4.8, darkMat);                     /* RHIB recess */
      bx(7.0, 2.2, 1.6, -14, i * 7.3, 5.4, greyMat);
      bx(4.0, 3.0, 2.6, -50, i * 5.0, 1.4, darkMat);                     /* waterjet housings */
      cx(1.0, 1.0, 1.0, 12, -58.0, i * 5.0, 1.6, steelMat);
      cx(1.0, 1.0, 1.0, 12, -58.0, i * 1.8, 1.6, steelMat);
    }

    /* ---------- long angular superstructure ---------- */
    tp(38.0, 14.6, 4.4, 0.97, 0.80, 11.0, 0, 9.28, greyMat);             /* deckhouse level 1 */
    tp(30.0, 11.4, 3.3, 0.96, 0.84, 13.0, 0, 13.2, greyMat);             /* level 2 */
    tp(11.5, 9.0, 3.4, 0.92, 0.80, 24.0, 0, 16.55, greyMat);             /* bridge */
    bx(12.0, 8.0, 0.25, 24.0, 0, 18.35, darkMat);
    var wsn = bx(0.4, 6.6, 1.6, 29.2, 0, 17.6, glassMat); wsn.rotation.y = -0.3;
    for (i = -1; i <= 1; i += 2) {
      var bwn = bx(8.0, 0.3, 1.3, 23.0, i * 3.9, 17.7, glassMat); bwn.rotation.x = i * 0.35;
      bx(2.6, 2.2, 0.5, 27.5, i * 4.6, 16.1, greyMat);                   /* bridge wings */
      rail([[26.2, i * 3.4], [26.2, i * 5.6], [28.8, i * 5.6]], 16.35, 1.05, steelMat);
      var fl1 = bx(28.0, 0.35, 3.6, 12.0, i * 6.4, 12.9, greyMat); fl1.rotation.x = i * 0.30;  /* sloped flanks */
      var fl2 = bx(36.0, 0.4, 4.0, 11.0, i * 7.9, 9.3, greyMat); fl2.rotation.x = i * 0.22;
      bx(1.2, 0.2, 2.1, -6.0, i * 6.9, 8.3, darkMat);                    /* doors */
      bx(6.0, 0.6, 0.8, 2.0, i * 7.3, 8.0, teamMat);                     /* team identification stripe */
      bx(3.4, 2.8, 3.4, -3.0, i * 4.2, 16.4, darkMat);                   /* exhaust uptakes */
      bx(3.4, 2.8, 3.0, -9.5, i * 4.2, 16.2, darkMat);
      cz(1.1, 1.0, 1.2, 10, -3.0, i * 4.2, 18.6, darkMat);
      cz(1.1, 1.0, 1.2, 10, -9.5, i * 4.2, 18.4, darkMat);
      cz(1.35, 1.35, 1.6, 12, 6.0, i * 5.4, 15.6, greyMat);              /* liferaft canisters */
      cz(1.35, 1.35, 1.6, 12, 2.5, i * 5.4, 15.6, greyMat);
      cz(0.07, 0.06, 5.0, 5, -12.0, i * 6.2, 17.5, steelMat);            /* whip antennas */
      bx(1.1, 0.9, 1.1, 30.5, i * 3.0, 15.4, darkMat);                   /* EO directors */
    }

    /* ---------- hangar + flight deck ---------- */
    tp(20.0, 13.0, 5.4, 0.96, 0.9, -22.0, 0, 9.78, greyMat);
    bx(21.0, 12.0, 0.3, -22.0, 0, 12.7, darkMat);                        /* hangar roof */
    bx(0.5, 8.6, 4.4, -32.0, 0, 9.35, darkMat);                          /* hangar door */
    bx(0.7, 9.2, 0.5, -32.1, 0, 11.7, greyMat);
    bx(4.4, 4.0, 2.0, -16.0, 0, 13.9, greyMat);                          /* SeaRAM deck house */
    var ram = new THREE.Group(); ram.position.set(-16.0, 0, 14.9); g.add(ram);
    cz(1.0, 1.1, 0.6, 12, 0, 0, 0.3, greyMat, ram);
    var rmb = bx(1.9, 2.3, 1.5, 0.1, 0, 1.25, greyMat, ram); rmb.rotation.y = -0.2;
    cz(0.62, 0.62, 0.5, 12, -0.55, 0, 2.2, darkMat, ram);
    for (i = 0; i < 4; i++) bx(0.16, 1.9, 0.08, 0.35, 0, 0.65 + i * 0.4, darkMat, ram);
    bx(2.2, 2.0, 1.6, -12.0, 0, 13.9, darkMat);                          /* aft mast / antennas */
    cz(0.12, 0.1, 4.0, 6, -12.0, 0, 16.6, steelMat);
    /* enclosed mast with planar arrays */
    tp(6.0, 7.0, 6.2, 0.62, 0.55, 15.5, 0, 21.4, greyMat);
    for (i = -1; i <= 1; i += 2) {
      var arr = bx(0.35, 3.2, 2.6, 17.6, i * 2.0, 20.6, darkMat); arr.rotation.x = i * 0.18; arr.rotation.z = i * 0.35;
      var ar2 = bx(0.35, 3.0, 2.4, 13.2, i * 2.0, 20.6, darkMat); ar2.rotation.z = i * (Math.PI - 0.35);
      cz(0.9, 0.9, 1.0, 12, 15.5, i * 2.4, 25.2, greyMat);
    }
    tp(3.0, 3.4, 3.0, 0.6, 0.6, 15.5, 0, 26.0, greyMat);
    cz(0.9, 0.9, 1.4, 12, 15.5, 0, 28.2, darkMat);                       /* SATCOM radome */
    cz(0.16, 0.1, 6.0, 6, 15.5, 0, 31.6, steelMat);
    bx(0.25, 6.0, 0.12, 12.5, 0, 24.6, darkMat);                         /* yard arm */
    bx(1.8, 1.0, 0.9, 19.0, 0, 24.4, darkMat);                           /* surface search radar */
    cz(0.7, 0.7, 0.3, 12, 19.0, 0, 25.1, darkMat);

    /* ---------- Mk110 57 mm bow gun ---------- */
    plate([[35.5, -5.8], [44, -4.4], [48, -3.0], [48, 3.0], [44, 4.4], [35.5, 5.8]], 0.5, 8.6, greyMat, greyMat, 0, 1, 0, 1);
    var tur = new THREE.Group(); tur.name = "turret"; tur.position.set(41.5, 0, 8.6); g.add(tur);
    cz(1.5, 1.6, 0.4, 14, 0, 0, 0.2, greyMat, tur);
    tp(4.6, 3.2, 1.9, 0.5, 0.45, -0.3, 0, 1.35, greyMat, tur);
    var gfp = bx(0.7, 1.9, 1.5, 1.75, 0, 1.25, greyMat, tur); gfp.rotation.y = 0.5;
    cx(0.11, 0.095, 3.4, 10, 3.4, 0, 1.55, steelMat, tur);
    cx(0.16, 0.16, 0.55, 10, 5.1, 0, 1.55, darkMat, tur);
    bx(0.7, 0.5, 0.4, -1.9, 0, 2.1, darkMat, tur);

    /* ---------- deck fittings, railings ---------- */
    for (i = -1; i <= 1; i += 2) {
      cz(0.14, 0.14, 0.7, 6, 33.0, i * 4.6, DKZ + 0.35, steelMat);       /* bitts */
      cz(0.14, 0.14, 0.7, 6, -52.0, i * 5.4, DKZ + 0.35, steelMat);
      bx(0.7, 0.14, 0.14, 33.0, i * 4.6, DKZ + 0.7, steelMat);
      bx(0.7, 0.14, 0.14, -52.0, i * 5.4, DKZ + 0.7, steelMat);
      bx(1.6, 1.4, 1.1, 36.0, i * 3.0, DKZ + 0.55, darkMat);             /* anchor gear */
      cz(0.12, 0.12, 1.8, 6, -56.5, i * 6.0, DKZ + 0.9, steelMat);       /* ensign staffs */
      bx(1.2, 1.0, 1.0, -36.0, i * 5.6, DKZ + 0.5, darkMat);             /* flight deck lockers */
      cz(0.35, 0.35, 0.6, 8, -46.0, i * 6.6, DKZ + 0.3, darkMat);        /* deck floodlights */
      cz(0.35, 0.35, 0.6, 8, -38.0, i * 6.6, DKZ + 0.3, darkMat);
    }
    cz(0.8, 0.8, 0.6, 12, 38.0, 0, DKZ + 0.3, greyMat);                  /* windlass */
    cx(0.65, 0.65, 1.3, 10, 38.0, 0, DKZ + 0.7, darkMat);
    rail([[39.5, -4.2], [34, -5.7], [20, -6.9], [0, -7.25], [-25, -7.25], [-48, -7.0], [-57, -6.5]], DKZ, 1.1, steelMat);
    rail([[39.5, 4.2], [34, 5.7], [20, 6.9], [0, 7.25], [-25, 7.25], [-48, 7.0], [-57, 6.5]], DKZ, 1.1, steelMat);
    rail([[-57, -6.5], [-57, 6.5]], DKZ, 1.1, steelMat);
    rail([[-12.5, -6.2], [-12.5, 6.2]], 12.85, 1.0, steelMat);
    return g;
  }
};

UNIT_MODELS["cruiser_c"] = {
  len: 180,
  build: function (THREE, M, C) {
var G=new THREE.Group(),PI=Math.PI,R=Math.random;
    function NI(g){g=g.toNonIndexed();g.computeVertexNormals();return g;}
    function tb(lx,ly,lz,t){return NI(new THREE.CylinderGeometry(t,1,lz,4,1).rotateX(PI/2).rotateZ(PI/4).scale(lx*0.7071,ly*0.7071,1));}
    function cv(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    var hullT=cv(1024,256,function(x,w,h){var i;x.fillStyle="#6d7378";x.fillRect(0,0,w,h);for(i=0;i<46;i++){x.globalAlpha=0.055;x.fillStyle=i%2?"#5c6268":"#7e848a";x.fillRect(R()*w,R()*h,50+R()*170,14+R()*46);}x.globalAlpha=0.4;x.strokeStyle="#555b61";x.lineWidth=1;for(i=1;i<34;i++){x.beginPath();x.moveTo(i*w/34,0);x.lineTo(i*w/34,h);x.stroke();}for(i=1;i<10;i++){x.beginPath();x.moveTo(0,i*h/10);x.lineTo(w,i*h/10);x.stroke();}x.globalAlpha=1;x.fillStyle="#24282b";x.fillRect(0,0.17*h,w,0.15*h);x.globalAlpha=0.12;x.fillStyle="#3a2b20";for(i=0;i<44;i++)x.fillRect(R()*w,0.33*h+R()*0.28*h,2+R()*4,14+R()*66);x.globalAlpha=1;});
    var deckT=cv(512,512,function(x,w,h){var i;x.fillStyle="#4b5054";x.fillRect(0,0,w,h);for(i=0;i<44;i++){x.globalAlpha=0.06;x.fillStyle=i%2?"#41464a":"#585e63";x.fillRect(R()*w,R()*h,40+R()*130,24+R()*80);}x.globalAlpha=0.35;x.strokeStyle="#383c40";x.lineWidth=2;for(i=1;i<12;i++){x.beginPath();x.moveTo(0,i*h/12);x.lineTo(w,i*h/12);x.stroke();x.beginPath();x.moveTo(i*w/12,0);x.lineTo(i*w/12,h);x.stroke();}x.globalAlpha=0.45;x.fillStyle="#2b2f32";for(i=0;i<300;i++)x.fillRect(R()*w,R()*h,3,3);x.globalAlpha=1;});
    deckT.wrapS=deckT.wrapT=THREE.RepeatWrapping;deckT.repeat.set(0.075,0.075);
    var panT=cv(128,128,function(x,w,h){var i,j;x.fillStyle="#8d8f88";x.fillRect(0,0,w,h);x.fillStyle="rgba(0,0,0,0.3)";for(i=0;i<15;i++)for(j=0;j<15;j++)x.fillRect(i*8+3,j*8+3,4,4);x.strokeStyle="rgba(255,255,255,0.15)";x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);});
    var mH=new THREE.MeshStandardMaterial({map:hullT,metalness:0.3,roughness:0.6});
    var mD=new THREE.MeshStandardMaterial({map:deckT,metalness:0.25,roughness:0.72});
    var mK=new THREE.MeshStandardMaterial({color:0x23272b,metalness:0.35,roughness:0.55});
    var mW=new THREE.MeshStandardMaterial({color:0xc9ced2,metalness:0.2,roughness:0.6});
    var mS=new THREE.MeshStandardMaterial({color:0x8d9398,metalness:0.85,roughness:0.3});
    var mP=new THREE.MeshStandardMaterial({map:panT,metalness:0.3,roughness:0.6});
    var mT=new THREE.MeshStandardMaterial({color:C.team,metalness:0.3,roughness:0.55});
    function bx(lx,ly,lz,m,x,y,z){var s=new THREE.Mesh(new THREE.BoxGeometry(lx,ly,lz),m);s.position.set(x,y,z);G.add(s);return s;}
    function cl(rt,rb,l,sg,m,x,y,z,ax){var g=new THREE.CylinderGeometry(rt,rb,l,sg);if(ax=="z")g.rotateX(PI/2);if(ax=="x")g.rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);G.add(s);return s;}
    function tbm(lx,ly,lz,t,m,x,y,z){var s=new THREE.Mesh(tb(lx,ly,lz,t),m);s.position.set(x,y,z);G.add(s);return s;}
    var stG=new THREE.CylinderGeometry(0.045,0.045,1.15,4,1,true).rotateX(PI/2);
    function rl(x0,y0,x1,y1,z){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),n=Math.max(2,Math.round(L/2.6)),i,g0=new THREE.Group();g0.position.set((x0+x1)/2,(y0+y1)/2,z);g0.rotation.z=Math.atan2(dy,dx);G.add(g0);for(i=0;i<=n;i++){var s=new THREE.Mesh(stG,mW);s.position.set(-L/2+L*i/n,0,0.57);g0.add(s);}var rg=new THREE.CylinderGeometry(0.05,0.05,L,4,1,true).rotateZ(PI/2);for(i=0;i<2;i++){var b=new THREE.Mesh(rg,mW);b.position.set(0,0,0.62+i*0.5);g0.add(b);}return g0;}
    function rl2(x0,y0,x1,y1,z){rl(x0,y0,x1,y1,z);rl(x0,-y0,x1,-y1,z);}
    function bnum(s,wd,x,y,z,tl){var t=cv(256,128,function(c,w,h){c.font="bold 92px Arial";c.fillStyle="#dfe3e6";c.textAlign="center";c.fillText(s,w/2,100);});var mm=new THREE.MeshStandardMaterial({map:t,transparent:true,metalness:0.2,roughness:0.6});var g=new THREE.PlaneGeometry(wd,wd/2);g.rotateX(PI/2);var a=new THREE.Mesh(g,mm);a.position.set(x,-y,z);a.rotation.x=-tl;G.add(a);var g2=new THREE.PlaneGeometry(wd,wd/2);g2.rotateY(PI);g2.rotateX(PI/2);var b=new THREE.Mesh(g2,mm);b.position.set(x,y,z);b.rotation.x=tl;G.add(b);}
    function pl(S,k,n0,n1){var p=[],i;for(i=n0;i<=n1;i++)p.push([S[i].x,S[i].w*k]);for(i=n1;i>=n0;i--)p.push([S[i].x,-S[i].w*k]);return p;}
    function deck(S,k,n0,n1,z,th){var d=new THREE.Mesh(M.slab(THREE,pl(S,k,n0,n1),th||0.3),mD);d.position.z=z;G.add(d);return d;}
    function vls(x,y,z,nx,ny,c){var lx=nx*c,ly=ny*c;bx(lx+0.9,ly+0.9,0.55,mK,x,y,z+0.2);var t=cv(256,256,function(g,w,h){var i,j,cw=w/nx,ch=h/ny;g.fillStyle="#3e4347";g.fillRect(0,0,w,h);for(i=0;i<nx;i++)for(j=0;j<ny;j++){var px=i*cw,py=j*ch;g.fillStyle="#15181a";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.82);g.fillStyle="#6c7378";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.1);g.fillStyle="rgba(255,255,255,0.13)";g.fillRect(px+cw*0.4,py+ch*0.14,cw*0.2,ch*0.7);}});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.4,roughness:0.5}));p.position.set(x,y,z+0.48);G.add(p);}
    function oct(r,m,x,y,z,yaw,pit){var g=new THREE.CylinderGeometry(r,r,0.34,8).rotateY(PI/8).rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);s.rotation.z=yaw;s.rotation.y=pit||0;G.add(s);return s;}
    function spy(r,x,y,z,yaw,pit){oct(r+0.42,mK,x,y,z,yaw,pit);oct(r,mP,x+Math.cos(yaw)*0.2,y+Math.sin(yaw)*0.2,z,yaw,pit);}
    function pad(x,y,z,lx,ly){var t=cv(256,256,function(g,w,h){var i;g.fillStyle="#41464a";g.fillRect(0,0,w,h);for(i=0;i<26;i++){g.globalAlpha=0.07;g.fillStyle=i%2?"#34383c":"#4d5257";g.fillRect(R()*w,R()*h,40+R()*90,30+R()*70);}g.globalAlpha=0.3;g.strokeStyle="#2c3033";g.lineWidth=2;for(i=1;i<8;i++){g.beginPath();g.moveTo(0,i*h/8);g.lineTo(w,i*h/8);g.stroke();}g.globalAlpha=1;g.strokeStyle="#d5d9dd";g.lineWidth=8;g.beginPath();g.arc(w/2,h/2,w*0.29,0,7);g.stroke();g.save();g.translate(w/2,h/2);g.rotate(PI/2);g.fillStyle="#d5d9dd";g.font="bold 118px Arial";g.textAlign="center";g.fillText("H",0,42);g.restore();});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.2,roughness:0.8}));p.position.set(x,y,z);G.add(p);return p;}
    function boat(x,y,z,L){var s=y>0?1:-1;var b=new THREE.Mesh(tb(L,L*0.33,L*0.2,0.62),mK);b.position.set(x,y,z);G.add(b);bx(L*0.2,L*0.2,L*0.11,mW,x-L*0.13,y,z+L*0.15);cl(0.09,0.09,2.9,5,mS,x+L*0.34,y-s*0.5,z+1.5,"z");cl(0.09,0.09,2.9,5,mS,x-L*0.34,y-s*0.5,z+1.5,"z");cl(0.08,0.08,1.7,5,mS,x+L*0.34,y-s*0.05,z+2.85);cl(0.08,0.08,1.7,5,mS,x-L*0.34,y-s*0.05,z+2.85);}
    function dish(r,x,y,z,yaw){var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,6,0,PI*2,0,PI*0.42).rotateZ(PI/2),mW);d.position.set(x,y,z);d.rotation.z=yaw||0;G.add(d);cl(0.09,0.09,r*0.8,5,mK,x-Math.cos(yaw||0)*r*0.4,y-Math.sin(yaw||0)*r*0.4,z,"x");return d;}
    function light(x,y,z){cl(0.06,0.06,0.9,5,mS,x,y,z,"z");bx(0.35,0.5,0.45,mW,x,y,z+0.6);}
    var DK=9.2;
    function ciws(x,y,z,aft){cl(1.1,1.25,1.6,10,mW,x,y,z+0.8,"z");var d=new THREE.Mesh(tb(2.2,2.5,1.6,0.55),mW);d.position.set(x,y,z+2.2);G.add(d);cl(0.32,0.36,2.8,10,mK,x+(aft?-1.7:1.7),y,z+2.1,"x");}
    function hq10(x,y,z,aft){var b=new THREE.Mesh(tb(3.6,6,2.6,0.85),mK);b.position.set(x,y,z+1.3);b.rotation.y=aft?0.24:-0.24;G.add(b);var i,j;for(i=0;i<6;i++)for(j=0;j<4;j++)cl(0.25,0.25,0.3,6,mS,x+(aft?-1.85:1.85),y-2.05+i*0.82,z+0.6+j*0.52,"x");}
    // tumblehome stealth hull, keel -1.0, knuckle rising to a flared stem
    var S=[{x:-90,w:8.3,h:5.51,zc:4.51,sq:0.55},{x:-80,w:10.1,h:5.51,zc:4.51,sq:0.48},{x:-56,w:11.2,h:5.51,zc:4.51,sq:0.44},{x:-18,w:11.3,h:5.51,zc:4.51,sq:0.44},{x:14,w:11.2,h:5.51,zc:4.51,sq:0.46},{x:44,w:10.5,h:5.62,zc:4.62,sq:0.5},{x:62,w:9.2,h:6.11,zc:5.11,sq:0.58},{x:76,w:6.5,h:6.92,zc:5.92,sq:0.66},{x:85,w:3.3,h:7.46,zc:6.46,sq:0.74},{x:90,w:0.5,h:7.68,zc:6.68,sq:0.82}];
    G.add(new THREE.Mesh(M.loft(THREE,S,18),mH));
    bx(0.6,13.4,10.7,mH,-90.2,0,4.35);
    deck(S,0.965,0,9,DK-0.3,0.3);
    bx(1.6,17,0.9,mK,62,0,DK+0.45).rotation.y=-0.32;
    // H/PJ-38 130mm stealth mount on a faceted barbette
    var bb=new THREE.Mesh(tb(7,6.4,1.7,0.8),mH);bb.position.set(70,0,DK+0.85);G.add(bb);
    var T=new THREE.Group();T.name="turret";T.position.set(70,0,DK+1.7);G.add(T);
    var tg=new THREE.Mesh(tb(8.6,4.9,3.4,0.4),mH);tg.position.set(-0.9,0,1.7);T.add(tg);
    var tn=new THREE.Mesh(tb(3.6,3.4,2.3,0.5),mH);tn.position.set(3.4,0,1.6);tn.rotation.y=0.12;T.add(tn);
    var bar=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.23,9,8).rotateZ(PI/2),mS);bar.position.set(7.4,0,1.6);T.add(bar);
    var slv=new THREE.Mesh(new THREE.CylinderGeometry(0.46,0.5,2.5,8).rotateZ(PI/2),mK);slv.position.set(4.1,0,1.6);T.add(slv);
    // 64 cells forward, 48 cells aft
    vls(50,0,DK,8,8,1.75);
    vls(-42,0,DK,8,6,1.75);
    // integrated deckhouse with tumblehome faces and four large AESA arrays
    tbm(76,16.4,6.4,0.82,mH,4,0,DK+3.2);
    tbm(40,13,4.4,0.84,mH,22,0,DK+8.6);
    tbm(16,11,3.8,0.84,mH,34,0,DK+12.7);
    bx(0.4,9,1.7,mK,41,0,DK+13.5).rotation.y=-0.46;
    bx(6.4,0.4,1.5,mK,37,5,DK+13.4).rotation.x=0.32;
    bx(6.4,0.4,1.5,mK,37,-5,DK+13.4).rotation.x=-0.32;
    bx(3.4,16,0.45,mH,34,0,DK+14.7);
    spy(2.6,35.4,5.2,DK+9.7,0.58,-0.16);spy(2.6,35.4,-5.2,DK+9.7,-0.58,-0.16);
    spy(2.6,7.6,6.2,DK+9.6,2.4,-0.16);spy(2.6,7.6,-6.2,DK+9.6,-2.4,-0.16);
    bx(5.4,1.3,0.55,mT,-26,7.9,DK+6.3);bx(5.4,1.3,0.55,mT,-26,-7.9,DK+6.3);
    // enclosed integrated mast block with X-band faces and radomes
    var mb=new THREE.Mesh(tb(13,11,9.4,0.5),mH);mb.position.set(17,0,DK+15.5);G.add(mb);
    spy(1.5,21.4,2.4,DK+16.6,0.5,-0.2);spy(1.5,21.4,-2.4,DK+16.6,-0.5,-0.2);
    spy(1.5,12.6,2.6,DK+16.6,2.5,-0.2);spy(1.5,12.6,-2.6,DK+16.6,-2.5,-0.2);
    var cap=new THREE.Mesh(tb(6,5.4,2.2,0.7),mH);cap.position.set(17,0,DK+21.3);G.add(cap);
    cl(0.24,0.32,7.4,6,mS,17,0,DK+26,"z");
    cl(0.1,0.1,7.6,4,mS,17,0,DK+24,"x");
    var d1=new THREE.Mesh(new THREE.SphereGeometry(1.9,12,8),mW);d1.position.set(-6,4.8,DK+10.6);G.add(d1);
    var d2=new THREE.Mesh(new THREE.SphereGeometry(1.9,12,8),mW);d2.position.set(-6,-4.8,DK+10.6);G.add(d2);
    cl(1.7,1.8,1,10,mH,-6,4.8,DK+9.3,"z");cl(1.7,1.8,1,10,mH,-6,-4.8,DK+9.3,"z");
    dish(1.8,-16,0,DK+11.9,PI);cl(1.6,1.7,1,10,mH,-16,0,DK+10.7,"z");
    // faceted funnel with team band
    var fu=new THREE.Mesh(tb(14,10.4,6.6,0.7),mH);fu.position.set(-18,0,DK+6.6);G.add(fu);
    bx(10.6,7.8,0.6,mK,-18,0,DK+10.1);
    cl(1,1.1,1.8,10,mK,-16.4,2.3,DK+10.8,"z");cl(1,1.1,1.8,10,mK,-19.6,-2.3,DK+10.8,"z");
    // twin-helicopter hangar, big flight deck, aft weapons
    tbm(20,15.6,6,0.93,mH,-60,0,DK+3);
    bx(0.5,5,5,mK,-50.2,3.9,DK+2.5);bx(0.5,5,5,mK,-50.2,-3.9,DK+2.5);
    bx(7,14.6,0.45,mH,-54,0,DK+6.2);
    ciws(-55,0,DK+6.4,1);hq10(-65,0,DK+6.2,0);
    ciws(38,0,DK+15,0);
    pad(-79,0,DK+0.14,17,17.4);
    bx(1.1,10,0.4,mW,-70,0,DK+0.18);
    function tt(y){var s=y>0?1:-1,i;for(i=0;i<3;i++)cl(0.3,0.3,6.6,8,mK,-32,y+s*i*0.72,DK+1.2+i*0.62,"x");}
    tt(8);tt(-8);
    boat(-10,8.8,DK+1.6,8);boat(-10,-8.8,DK+1.6,8);
    bx(1.8,1.8,1.5,mK,-46,7.8,DK+0.75);bx(1.8,1.8,1.5,mK,-46,-7.8,DK+0.75);
    // railings, staffs, hull number
    rl2(64,8.2,82,3.9,DK);rl2(-88,6.6,-74,8.9,DK);rl2(-72,9.2,-52,9.6,DK);
    rl(-34,7.2,-6,7.2,DK+6.5);rl(-34,-7.2,-6,-7.2,DK+6.5);
    rl(37,5.2,37,-5.2,DK+15);
    cl(0.08,0.08,4.6,5,mS,-89,0,DK+2.3,"z");cl(0.08,0.08,4,5,mS,89,0,DK+5,"z");
    bx(1,0.6,1.1,mK,83,2.8,DK-1.2);bx(1,0.6,1.1,mK,83,-2.8,DK-1.2);
    bnum("101",7,79,4.6,6.4,0.16);
    return G;
  }
};

UNIT_MODELS["cruiser_n"] = {
  len: 173,
  build: function (THREE, M, C) {
var G=new THREE.Group(),PI=Math.PI,R=Math.random;
    function NI(g){g=g.toNonIndexed();g.computeVertexNormals();return g;}
    function tb(lx,ly,lz,t){return NI(new THREE.CylinderGeometry(t,1,lz,4,1).rotateX(PI/2).rotateZ(PI/4).scale(lx*0.7071,ly*0.7071,1));}
    function cv(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    var hullT=cv(1024,256,function(x,w,h){var i;x.fillStyle="#6d7378";x.fillRect(0,0,w,h);for(i=0;i<46;i++){x.globalAlpha=0.055;x.fillStyle=i%2?"#5c6268":"#7e848a";x.fillRect(R()*w,R()*h,50+R()*170,14+R()*46);}x.globalAlpha=0.4;x.strokeStyle="#555b61";x.lineWidth=1;for(i=1;i<34;i++){x.beginPath();x.moveTo(i*w/34,0);x.lineTo(i*w/34,h);x.stroke();}for(i=1;i<10;i++){x.beginPath();x.moveTo(0,i*h/10);x.lineTo(w,i*h/10);x.stroke();}x.globalAlpha=1;x.fillStyle="#24282b";x.fillRect(0,0.17*h,w,0.15*h);x.globalAlpha=0.12;x.fillStyle="#3a2b20";for(i=0;i<44;i++)x.fillRect(R()*w,0.33*h+R()*0.28*h,2+R()*4,14+R()*66);x.globalAlpha=1;});
    var deckT=cv(512,512,function(x,w,h){var i;x.fillStyle="#4b5054";x.fillRect(0,0,w,h);for(i=0;i<44;i++){x.globalAlpha=0.06;x.fillStyle=i%2?"#41464a":"#585e63";x.fillRect(R()*w,R()*h,40+R()*130,24+R()*80);}x.globalAlpha=0.35;x.strokeStyle="#383c40";x.lineWidth=2;for(i=1;i<12;i++){x.beginPath();x.moveTo(0,i*h/12);x.lineTo(w,i*h/12);x.stroke();x.beginPath();x.moveTo(i*w/12,0);x.lineTo(i*w/12,h);x.stroke();}x.globalAlpha=0.45;x.fillStyle="#2b2f32";for(i=0;i<300;i++)x.fillRect(R()*w,R()*h,3,3);x.globalAlpha=1;});
    deckT.wrapS=deckT.wrapT=THREE.RepeatWrapping;deckT.repeat.set(0.075,0.075);
    var panT=cv(128,128,function(x,w,h){var i,j;x.fillStyle="#8d8f88";x.fillRect(0,0,w,h);x.fillStyle="rgba(0,0,0,0.3)";for(i=0;i<15;i++)for(j=0;j<15;j++)x.fillRect(i*8+3,j*8+3,4,4);x.strokeStyle="rgba(255,255,255,0.15)";x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);});
    var mH=new THREE.MeshStandardMaterial({map:hullT,metalness:0.3,roughness:0.6});
    var mD=new THREE.MeshStandardMaterial({map:deckT,metalness:0.25,roughness:0.72});
    var mK=new THREE.MeshStandardMaterial({color:0x23272b,metalness:0.35,roughness:0.55});
    var mW=new THREE.MeshStandardMaterial({color:0xc9ced2,metalness:0.2,roughness:0.6});
    var mS=new THREE.MeshStandardMaterial({color:0x8d9398,metalness:0.85,roughness:0.3});
    var mP=new THREE.MeshStandardMaterial({map:panT,metalness:0.3,roughness:0.6});
    var mT=new THREE.MeshStandardMaterial({color:C.team,metalness:0.3,roughness:0.55});
    function bx(lx,ly,lz,m,x,y,z){var s=new THREE.Mesh(new THREE.BoxGeometry(lx,ly,lz),m);s.position.set(x,y,z);G.add(s);return s;}
    function cl(rt,rb,l,sg,m,x,y,z,ax){var g=new THREE.CylinderGeometry(rt,rb,l,sg);if(ax=="z")g.rotateX(PI/2);if(ax=="x")g.rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);G.add(s);return s;}
    function tbm(lx,ly,lz,t,m,x,y,z){var s=new THREE.Mesh(tb(lx,ly,lz,t),m);s.position.set(x,y,z);G.add(s);return s;}
    var stG=new THREE.CylinderGeometry(0.045,0.045,1.15,4,1,true).rotateX(PI/2);
    function rl(x0,y0,x1,y1,z){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),n=Math.max(2,Math.round(L/2.6)),i,g0=new THREE.Group();g0.position.set((x0+x1)/2,(y0+y1)/2,z);g0.rotation.z=Math.atan2(dy,dx);G.add(g0);for(i=0;i<=n;i++){var s=new THREE.Mesh(stG,mW);s.position.set(-L/2+L*i/n,0,0.57);g0.add(s);}var rg=new THREE.CylinderGeometry(0.05,0.05,L,4,1,true).rotateZ(PI/2);for(i=0;i<2;i++){var b=new THREE.Mesh(rg,mW);b.position.set(0,0,0.62+i*0.5);g0.add(b);}return g0;}
    function rl2(x0,y0,x1,y1,z){rl(x0,y0,x1,y1,z);rl(x0,-y0,x1,-y1,z);}
    function bnum(s,wd,x,y,z,tl){var t=cv(256,128,function(c,w,h){c.font="bold 92px Arial";c.fillStyle="#dfe3e6";c.textAlign="center";c.fillText(s,w/2,100);});var mm=new THREE.MeshStandardMaterial({map:t,transparent:true,metalness:0.2,roughness:0.6});var g=new THREE.PlaneGeometry(wd,wd/2);g.rotateX(PI/2);var a=new THREE.Mesh(g,mm);a.position.set(x,-y,z);a.rotation.x=-tl;G.add(a);var g2=new THREE.PlaneGeometry(wd,wd/2);g2.rotateY(PI);g2.rotateX(PI/2);var b=new THREE.Mesh(g2,mm);b.position.set(x,y,z);b.rotation.x=tl;G.add(b);}
    function pl(S,k,n0,n1){var p=[],i;for(i=n0;i<=n1;i++)p.push([S[i].x,S[i].w*k]);for(i=n1;i>=n0;i--)p.push([S[i].x,-S[i].w*k]);return p;}
    function deck(S,k,n0,n1,z,th){var d=new THREE.Mesh(M.slab(THREE,pl(S,k,n0,n1),th||0.3),mD);d.position.z=z;G.add(d);return d;}
    function vls(x,y,z,nx,ny,c){var lx=nx*c,ly=ny*c;bx(lx+0.9,ly+0.9,0.55,mK,x,y,z+0.2);var t=cv(256,256,function(g,w,h){var i,j,cw=w/nx,ch=h/ny;g.fillStyle="#3e4347";g.fillRect(0,0,w,h);for(i=0;i<nx;i++)for(j=0;j<ny;j++){var px=i*cw,py=j*ch;g.fillStyle="#15181a";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.82);g.fillStyle="#6c7378";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.1);g.fillStyle="rgba(255,255,255,0.13)";g.fillRect(px+cw*0.4,py+ch*0.14,cw*0.2,ch*0.7);}});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.4,roughness:0.5}));p.position.set(x,y,z+0.48);G.add(p);}
    function oct(r,m,x,y,z,yaw,pit){var g=new THREE.CylinderGeometry(r,r,0.34,8).rotateY(PI/8).rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);s.rotation.z=yaw;s.rotation.y=pit||0;G.add(s);return s;}
    function spy(r,x,y,z,yaw,pit){oct(r+0.42,mK,x,y,z,yaw,pit);oct(r,mP,x+Math.cos(yaw)*0.2,y+Math.sin(yaw)*0.2,z,yaw,pit);}
    function pad(x,y,z,lx,ly){var t=cv(256,256,function(g,w,h){var i;g.fillStyle="#41464a";g.fillRect(0,0,w,h);for(i=0;i<26;i++){g.globalAlpha=0.07;g.fillStyle=i%2?"#34383c":"#4d5257";g.fillRect(R()*w,R()*h,40+R()*90,30+R()*70);}g.globalAlpha=0.3;g.strokeStyle="#2c3033";g.lineWidth=2;for(i=1;i<8;i++){g.beginPath();g.moveTo(0,i*h/8);g.lineTo(w,i*h/8);g.stroke();}g.globalAlpha=1;g.strokeStyle="#d5d9dd";g.lineWidth=8;g.beginPath();g.arc(w/2,h/2,w*0.29,0,7);g.stroke();g.save();g.translate(w/2,h/2);g.rotate(PI/2);g.fillStyle="#d5d9dd";g.font="bold 118px Arial";g.textAlign="center";g.fillText("H",0,42);g.restore();});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.2,roughness:0.8}));p.position.set(x,y,z);G.add(p);return p;}
    function boat(x,y,z,L){var s=y>0?1:-1;var b=new THREE.Mesh(tb(L,L*0.33,L*0.2,0.62),mK);b.position.set(x,y,z);G.add(b);bx(L*0.2,L*0.2,L*0.11,mW,x-L*0.13,y,z+L*0.15);cl(0.09,0.09,2.9,5,mS,x+L*0.34,y-s*0.5,z+1.5,"z");cl(0.09,0.09,2.9,5,mS,x-L*0.34,y-s*0.5,z+1.5,"z");cl(0.08,0.08,1.7,5,mS,x+L*0.34,y-s*0.05,z+2.85);cl(0.08,0.08,1.7,5,mS,x-L*0.34,y-s*0.05,z+2.85);}
    function dish(r,x,y,z,yaw){var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,6,0,PI*2,0,PI*0.42).rotateZ(PI/2),mW);d.position.set(x,y,z);d.rotation.z=yaw||0;G.add(d);cl(0.09,0.09,r*0.8,5,mK,x-Math.cos(yaw||0)*r*0.4,y-Math.sin(yaw||0)*r*0.4,z,"x");return d;}
    function light(x,y,z){cl(0.06,0.06,0.9,5,mS,x,y,z,"z");bx(0.35,0.5,0.45,mW,x,y,z+0.6);}
    var DK=7.8;
    function seg(a,b,c,d,e,f,r,m){var dx=d-a,dy=e-b,dz=f-c,L=Math.sqrt(dx*dx+dy*dy+dz*dz);var s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,L,4,1,true),m||mS);s.position.set((a+d)/2,(b+e)/2,(c+f)/2);s.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(dx/L,dy/L,dz/L));G.add(s);return s;}
    function ciws(x,y,z){cl(1,1.15,1.6,10,mW,x,y,z+0.8,"z");var d=new THREE.Mesh(new THREE.SphereGeometry(1.05,10,7),mW);d.position.set(x,y,z+2.15);G.add(d);var b=cl(0.3,0.34,2.4,8,mK,x+1.5,y,z+1.7,"x");b.rotation.y=-0.25;}
    function mk45(px,pz,nm){var T=new THREE.Group();T.position.set(px,0,pz);G.add(T);if(nm)T.name="turret";var g=new THREE.Mesh(tb(7.2,4.4,2.8,0.5),mH);g.position.set(-0.3,0,1.4);T.add(g);var sl=new THREE.Mesh(new THREE.BoxGeometry(2.5,3.8,0.25),mH);sl.position.set(2.8,0,2);sl.rotation.y=0.5;T.add(sl);var b=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.21,7.2,8).rotateZ(PI/2),mS);b.position.set(5.3,0,1.45);T.add(b);var s2=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.46,2,8).rotateZ(PI/2),mK);s2.position.set(2.6,0,1.45);T.add(s2);return T;}
    // Spruance-derived hull, keel -1.0, sheer to 11.4 at the stem
    var S=[{x:-86.5,w:6.4,h:4.4,zc:3.4,sq:0.93},{x:-78,w:7.7,h:4.5,zc:3.3,sq:0.92},{x:-58,w:8.3,h:4.6,zc:3.2,sq:0.9},{x:-20,w:8.4,h:4.7,zc:3.1,sq:0.9},{x:14,w:8.3,h:4.7,zc:3.1,sq:0.89},{x:42,w:7.7,h:4.9,zc:3.3,sq:0.87},{x:60,w:6.5,h:5.4,zc:3.8,sq:0.83},{x:74,w:4.2,h:6.1,zc:4.6,sq:0.77},{x:82,w:2,h:6.5,zc:5.1,sq:0.72},{x:86.5,w:0.4,h:6.7,zc:5.4,sq:0.7}];
    G.add(new THREE.Mesh(M.loft(THREE,S,18),mH));
    bx(0.5,12.8,8.8,mH,-86.6,0,3.4);
    deck(S,0.965,0,8,DK-0.3,0.3);
    bx(1.4,14.6,0.8,mK,60,0,DK+0.4).rotation.y=-0.3;
    // 5in Mk45 fore (trainable) and aft (baked)
    cl(2.6,2.8,1.6,12,mH,66,0,DK+0.5,"z");mk45(66,DK+1.3,1);
    cl(2.6,2.8,1.6,12,mH,-68,0,DK+0.5,"z");mk45(-68,DK+1.3,0).rotation.z=PI;
    // two 61-cell Mk41 VLS blocks
    vls(52,0,DK,8,8,1.42);
    vls(-52,0,DK,8,8,1.42);
    // long slab-sided superstructure running most of the hull
    tbm(96,13.8,6.2,0.97,mH,0,0,DK+3.1);
    tbm(52,12,3.6,0.96,mH,10,0,DK+8);
    tbm(24,11,3.4,0.95,mH,-38,0,DK+8);
    tbm(14,10.2,3.4,0.9,mH,32,0,DK+11.5);
    bx(0.35,8.6,1.6,mK,38.6,0,DK+12.3).rotation.y=-0.42;
    bx(6,0.35,1.4,mK,35,4.7,DK+12.2).rotation.x=0.3;
    bx(6,0.35,1.4,mK,35,-4.7,DK+12.2).rotation.x=-0.3;
    bx(3.2,15,0.4,mH,32,0,DK+13.4);
    bx(5.4,1.2,0.5,mT,-44,6.6,DK+5.9);bx(5.4,1.2,0.5,mT,-44,-6.6,DK+5.9);
    // SPY-1A octagons: two on the forward deckhouse, two facing aft
    spy(2,33.4,4.8,DK+9.2,0.6,-0.13);spy(2,33.4,-4.8,DK+9.2,-0.6,-0.13);
    spy(2,-40,5.6,DK+9.2,2.36,-0.13);spy(2,-40,-5.6,DK+9.2,-2.36,-0.13);
    // twin funnels
    function fun(x){tbm(11,8.4,6.2,0.78,mH,x,0,DK+9.3).rotation.y=0.06;bx(9.2,7.2,0.55,mK,x,0,DK+12.6);cl(0.85,0.9,1.7,8,mK,x+1.7,2.2,DK+13.3,"z");cl(0.85,0.9,1.7,8,mK,x-1.7,-2.2,DK+13.3,"z");}
    fun(-4);fun(-26);
    // fore pole mast and main tripod lattice with yards
    cl(0.3,0.4,12,6,mS,16,0,DK+15.6,"z");
    seg(16,0,DK+11.6,12,3,DK+21,0.13);seg(16,0,DK+11.6,12,-3,DK+21,0.13);
    cl(0.1,0.1,10,4,mS,16,0,DK+16.4,"x");
    cl(0.1,0.1,6.4,4,mS,16,0,DK+19.6,"x");
    bx(3.6,6.4,0.35,mH,16,0,DK+21.4);
    cl(0.2,0.24,5,6,mS,16,0,DK+24,"z");
    bx(0.5,4.6,1,mW,16,0,DK+26.6);
    cl(0.28,0.34,9,6,mS,-16,0,DK+15.6,"z");
    seg(-16,0,DK+11.6,-20,3.4,DK+19.4,0.12);seg(-16,0,DK+11.6,-20,-3.4,DK+19.4,0.12);
    cl(0.1,0.1,9,4,mS,-16,0,DK+16.6,"x");
    cl(0.05,0.05,5,4,mS,-11,4,DK+13.6,"z");cl(0.05,0.05,5,4,mS,-11,-4,DK+13.6,"z");
    // SPG-62 illuminators fore and aft
    dish(1.5,30,0,DK+14.6,0);cl(1.4,1.5,0.9,10,mH,30,0,DK+13.6,"z");
    dish(1.5,-44,4.2,DK+12.6,PI);cl(1.4,1.5,0.9,10,mH,-44,4.2,DK+11.6,"z");
    dish(1.5,-44,-4.2,DK+12.6,PI);cl(1.4,1.5,0.9,10,mH,-44,-4.2,DK+11.6,"z");
    dish(1.5,22,0,DK+11.6,0);cl(1.4,1.5,0.9,10,mH,22,0,DK+10.6,"z");
    ciws(26,0,DK+13.5);ciws(-62,0,DK+6.2);
    // hangar, flight deck, Harpoon canisters at the stern quarters
    tbm(15,12.4,5.2,0.95,mH,-60,0,DK+2.6);
    bx(0.5,4.2,4.2,mK,-52.6,2.6,DK+2.1);bx(0.5,4.2,4.2,mK,-52.6,-2.6,DK+2.1);
    pad(-78,0,DK+0.12,14,13.4);
    bx(1,8.4,0.35,mW,-71,0,DK+0.16);
    function harp(y){var s=y>0?1:-1,g0=new THREE.Group();g0.position.set(-74,y,DK+1.6);g0.rotation.z=s*0.5;g0.rotation.y=-0.55;G.add(g0);var i,j;for(i=0;i<2;i++)for(j=0;j<2;j++){var c1=new THREE.Mesh(new THREE.BoxGeometry(5.4,1.05,1.05),mW);c1.position.set(0,(i-0.5)*1.15,(j-0.5)*1.15+0.6);g0.add(c1);}}
    harp(6.2);harp(-6.2);
    function tt(y){var s=y>0?1:-1,i;for(i=0;i<3;i++)cl(0.3,0.3,6.2,8,mK,-30,y+s*i*0.7,DK+1.1+i*0.6,"x");}
    tt(7);tt(-7);
    boat(4,7.8,DK+1.4,7.4);boat(4,-7.8,DK+1.4,7.4);
    // railings, staffs, hull number
    rl2(58,6.6,80,2.6,DK);rl2(-85,6.2,-72,7.6,DK);rl2(-70,7.8,-58,8.1,DK);
    rl(-48,6.4,-2,6.4,DK+6.3);rl(-48,-6.4,-2,-6.4,DK+6.3);
    rl(35,5,35,-5,DK+13.6);
    cl(0.07,0.07,4.2,5,mS,-85.6,0,DK+2.1,"z");cl(0.07,0.07,3.6,5,mS,85.5,0,DK+4.6,"z");
    bx(0.9,0.5,1,mK,79,2.2,DK-1);bx(0.9,0.5,1,mK,79,-2.2,DK-1);
    bnum("63",6,76,3.4,5.6,0.16);
    return G;
  }
};

UNIT_MODELS["cruiser_p"] = {
  len: 186,
  build: function (THREE, M, C) {
var G=new THREE.Group(),PI=Math.PI,R=Math.random;
    function NI(g){g=g.toNonIndexed();g.computeVertexNormals();return g;}
    function tb(lx,ly,lz,t){return NI(new THREE.CylinderGeometry(t,1,lz,4,1).rotateX(PI/2).rotateZ(PI/4).scale(lx*0.7071,ly*0.7071,1));}
    function cv(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    var hullT=cv(1024,256,function(x,w,h){var i;x.fillStyle="#6d7378";x.fillRect(0,0,w,h);for(i=0;i<46;i++){x.globalAlpha=0.055;x.fillStyle=i%2?"#5c6268":"#7e848a";x.fillRect(R()*w,R()*h,50+R()*170,14+R()*46);}x.globalAlpha=0.4;x.strokeStyle="#555b61";x.lineWidth=1;for(i=1;i<34;i++){x.beginPath();x.moveTo(i*w/34,0);x.lineTo(i*w/34,h);x.stroke();}for(i=1;i<10;i++){x.beginPath();x.moveTo(0,i*h/10);x.lineTo(w,i*h/10);x.stroke();}x.globalAlpha=1;x.fillStyle="#24282b";x.fillRect(0,0.17*h,w,0.15*h);x.globalAlpha=0.12;x.fillStyle="#3a2b20";for(i=0;i<44;i++)x.fillRect(R()*w,0.33*h+R()*0.28*h,2+R()*4,14+R()*66);x.globalAlpha=1;});
    var deckT=cv(512,512,function(x,w,h){var i;x.fillStyle="#4b5054";x.fillRect(0,0,w,h);for(i=0;i<44;i++){x.globalAlpha=0.06;x.fillStyle=i%2?"#41464a":"#585e63";x.fillRect(R()*w,R()*h,40+R()*130,24+R()*80);}x.globalAlpha=0.35;x.strokeStyle="#383c40";x.lineWidth=2;for(i=1;i<12;i++){x.beginPath();x.moveTo(0,i*h/12);x.lineTo(w,i*h/12);x.stroke();x.beginPath();x.moveTo(i*w/12,0);x.lineTo(i*w/12,h);x.stroke();}x.globalAlpha=0.45;x.fillStyle="#2b2f32";for(i=0;i<300;i++)x.fillRect(R()*w,R()*h,3,3);x.globalAlpha=1;});
    deckT.wrapS=deckT.wrapT=THREE.RepeatWrapping;deckT.repeat.set(0.075,0.075);
    var panT=cv(128,128,function(x,w,h){var i,j;x.fillStyle="#8d8f88";x.fillRect(0,0,w,h);x.fillStyle="rgba(0,0,0,0.3)";for(i=0;i<15;i++)for(j=0;j<15;j++)x.fillRect(i*8+3,j*8+3,4,4);x.strokeStyle="rgba(255,255,255,0.15)";x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);});
    var mH=new THREE.MeshStandardMaterial({map:hullT,metalness:0.3,roughness:0.6});
    var mD=new THREE.MeshStandardMaterial({map:deckT,metalness:0.25,roughness:0.72});
    var mK=new THREE.MeshStandardMaterial({color:0x23272b,metalness:0.35,roughness:0.55});
    var mW=new THREE.MeshStandardMaterial({color:0xc9ced2,metalness:0.2,roughness:0.6});
    var mS=new THREE.MeshStandardMaterial({color:0x8d9398,metalness:0.85,roughness:0.3});
    var mP=new THREE.MeshStandardMaterial({map:panT,metalness:0.3,roughness:0.6});
    var mT=new THREE.MeshStandardMaterial({color:C.team,metalness:0.3,roughness:0.55});
    function bx(lx,ly,lz,m,x,y,z){var s=new THREE.Mesh(new THREE.BoxGeometry(lx,ly,lz),m);s.position.set(x,y,z);G.add(s);return s;}
    function cl(rt,rb,l,sg,m,x,y,z,ax){var g=new THREE.CylinderGeometry(rt,rb,l,sg);if(ax=="z")g.rotateX(PI/2);if(ax=="x")g.rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);G.add(s);return s;}
    function tbm(lx,ly,lz,t,m,x,y,z){var s=new THREE.Mesh(tb(lx,ly,lz,t),m);s.position.set(x,y,z);G.add(s);return s;}
    var stG=new THREE.CylinderGeometry(0.045,0.045,1.15,4,1,true).rotateX(PI/2);
    function rl(x0,y0,x1,y1,z){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),n=Math.max(2,Math.round(L/2.6)),i,g0=new THREE.Group();g0.position.set((x0+x1)/2,(y0+y1)/2,z);g0.rotation.z=Math.atan2(dy,dx);G.add(g0);for(i=0;i<=n;i++){var s=new THREE.Mesh(stG,mW);s.position.set(-L/2+L*i/n,0,0.57);g0.add(s);}var rg=new THREE.CylinderGeometry(0.05,0.05,L,4,1,true).rotateZ(PI/2);for(i=0;i<2;i++){var b=new THREE.Mesh(rg,mW);b.position.set(0,0,0.62+i*0.5);g0.add(b);}return g0;}
    function rl2(x0,y0,x1,y1,z){rl(x0,y0,x1,y1,z);rl(x0,-y0,x1,-y1,z);}
    function bnum(s,wd,x,y,z,tl){var t=cv(256,128,function(c,w,h){c.font="bold 92px Arial";c.fillStyle="#dfe3e6";c.textAlign="center";c.fillText(s,w/2,100);});var mm=new THREE.MeshStandardMaterial({map:t,transparent:true,metalness:0.2,roughness:0.6});var g=new THREE.PlaneGeometry(wd,wd/2);g.rotateX(PI/2);var a=new THREE.Mesh(g,mm);a.position.set(x,-y,z);a.rotation.x=-tl;G.add(a);var g2=new THREE.PlaneGeometry(wd,wd/2);g2.rotateY(PI);g2.rotateX(PI/2);var b=new THREE.Mesh(g2,mm);b.position.set(x,y,z);b.rotation.x=tl;G.add(b);}
    function pl(S,k,n0,n1){var p=[],i;for(i=n0;i<=n1;i++)p.push([S[i].x,S[i].w*k]);for(i=n1;i>=n0;i--)p.push([S[i].x,-S[i].w*k]);return p;}
    function deck(S,k,n0,n1,z,th){var d=new THREE.Mesh(M.slab(THREE,pl(S,k,n0,n1),th||0.3),mD);d.position.z=z;G.add(d);return d;}
    function vls(x,y,z,nx,ny,c){var lx=nx*c,ly=ny*c;bx(lx+0.9,ly+0.9,0.55,mK,x,y,z+0.2);var t=cv(256,256,function(g,w,h){var i,j,cw=w/nx,ch=h/ny;g.fillStyle="#3e4347";g.fillRect(0,0,w,h);for(i=0;i<nx;i++)for(j=0;j<ny;j++){var px=i*cw,py=j*ch;g.fillStyle="#15181a";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.82);g.fillStyle="#6c7378";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.1);g.fillStyle="rgba(255,255,255,0.13)";g.fillRect(px+cw*0.4,py+ch*0.14,cw*0.2,ch*0.7);}});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.4,roughness:0.5}));p.position.set(x,y,z+0.48);G.add(p);}
    function oct(r,m,x,y,z,yaw,pit){var g=new THREE.CylinderGeometry(r,r,0.34,8).rotateY(PI/8).rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);s.rotation.z=yaw;s.rotation.y=pit||0;G.add(s);return s;}
    function spy(r,x,y,z,yaw,pit){oct(r+0.42,mK,x,y,z,yaw,pit);oct(r,mP,x+Math.cos(yaw)*0.2,y+Math.sin(yaw)*0.2,z,yaw,pit);}
    function pad(x,y,z,lx,ly){var t=cv(256,256,function(g,w,h){var i;g.fillStyle="#41464a";g.fillRect(0,0,w,h);for(i=0;i<26;i++){g.globalAlpha=0.07;g.fillStyle=i%2?"#34383c":"#4d5257";g.fillRect(R()*w,R()*h,40+R()*90,30+R()*70);}g.globalAlpha=0.3;g.strokeStyle="#2c3033";g.lineWidth=2;for(i=1;i<8;i++){g.beginPath();g.moveTo(0,i*h/8);g.lineTo(w,i*h/8);g.stroke();}g.globalAlpha=1;g.strokeStyle="#d5d9dd";g.lineWidth=8;g.beginPath();g.arc(w/2,h/2,w*0.29,0,7);g.stroke();g.save();g.translate(w/2,h/2);g.rotate(PI/2);g.fillStyle="#d5d9dd";g.font="bold 118px Arial";g.textAlign="center";g.fillText("H",0,42);g.restore();});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.2,roughness:0.8}));p.position.set(x,y,z);G.add(p);return p;}
    function boat(x,y,z,L){var s=y>0?1:-1;var b=new THREE.Mesh(tb(L,L*0.33,L*0.2,0.62),mK);b.position.set(x,y,z);G.add(b);bx(L*0.2,L*0.2,L*0.11,mW,x-L*0.13,y,z+L*0.15);cl(0.09,0.09,2.9,5,mS,x+L*0.34,y-s*0.5,z+1.5,"z");cl(0.09,0.09,2.9,5,mS,x-L*0.34,y-s*0.5,z+1.5,"z");cl(0.08,0.08,1.7,5,mS,x+L*0.34,y-s*0.05,z+2.85);cl(0.08,0.08,1.7,5,mS,x-L*0.34,y-s*0.05,z+2.85);}
    function dish(r,x,y,z,yaw){var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,6,0,PI*2,0,PI*0.42).rotateZ(PI/2),mW);d.position.set(x,y,z);d.rotation.z=yaw||0;G.add(d);cl(0.09,0.09,r*0.8,5,mK,x-Math.cos(yaw||0)*r*0.4,y-Math.sin(yaw||0)*r*0.4,z,"x");return d;}
    function light(x,y,z){cl(0.06,0.06,0.9,5,mS,x,y,z,"z");bx(0.35,0.5,0.45,mW,x,y,z+0.6);}
    var DK=9.4;
    function seg(a,b,c,d,e,f,r,m){var dx=d-a,dy=e-b,dz=f-c,L=Math.sqrt(dx*dx+dy*dy+dz*dz);var s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,L,4,1,true),m||mS);s.position.set((a+d)/2,(b+e)/2,(c+f)/2);s.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(dx/L,dy/L,dz/L));G.add(s);return s;}
    function tower(x,z0,z1,w0,w1,n){var i,j,cs=[[1,1],[1,-1],[-1,-1],[-1,1]];for(i=0;i<4;i++)seg(x+cs[i][0]*w0,cs[i][1]*w0,z0,x+cs[i][0]*w1,cs[i][1]*w1,z1,0.16);for(j=0;j<=n;j++){var t=j/n,w=w0+(w1-w0)*t,z=z0+(z1-z0)*t,w2=w0+(w1-w0)*(t+1/n),z2=z0+(z1-z0)*(t+1/n);for(i=0;i<4;i++){var a=cs[i],b=cs[(i+1)%4];seg(x+a[0]*w,a[1]*w,z,x+b[0]*w,b[1]*w,z,0.1);if(j<n)seg(x+a[0]*w,a[1]*w,z,x+b[0]*w2,b[1]*w2,z2,0.08);}}}
    function ak630(x,y,z){cl(0.85,0.95,1.2,10,mW,x,y,z+0.6,"z");var d=new THREE.Mesh(new THREE.SphereGeometry(0.95,10,7),mW);d.position.set(x,y,z+1.6);G.add(d);cl(0.26,0.28,1.9,8,mK,x+1.2,y,z+1.4,"x");}
    function dome(x,y,z,r){cl(r*0.8,r*0.9,1.1,10,mH,x,y,z+0.55,"z");var d=new THREE.Mesh(new THREE.SphereGeometry(r,14,9),mW);d.position.set(x,y,z+1.6);d.scale.set(1,1,0.88);G.add(d);}
    var S=[{x:-93,w:8.1,h:5.62,zc:4.62,sq:0.55},{x:-84,w:10.1,h:5.62,zc:4.62,sq:0.5},{x:-60,w:11.4,h:5.62,zc:4.62,sq:0.45},{x:-20,w:11.6,h:5.62,zc:4.62,sq:0.45},{x:15,w:11.5,h:5.62,zc:4.62,sq:0.45},{x:45,w:10.8,h:5.73,zc:4.73,sq:0.5},{x:65,w:9.6,h:6.27,zc:5.27,sq:0.58},{x:80,w:6.9,h:7.08,zc:6.08,sq:0.66},{x:89,w:3.5,h:7.68,zc:6.68,sq:0.74},{x:93,w:0.5,h:7.95,zc:6.95,sq:0.82}];
    G.add(new THREE.Mesh(M.loft(THREE,S,18),mH));
    bx(0.6,13,11.1,mH,-93.2,0,4.55);
    deck(S,0.965,0,9,DK-0.3,0.3);
    bx(1.6,17,0.9,mK,58,0,DK+0.45).rotation.y=-0.3;
    // AK-130 twin 130mm on the forecastle
    cl(3,3.2,1.7,12,mH,74,0,DK+0.55,"z");
    var T=new THREE.Group();T.name="turret";T.position.set(74,0,DK+1.4);G.add(T);
    var tgh=new THREE.Mesh(tb(8.6,5.6,3.2,0.62),mH);tgh.position.set(-0.6,0,1.6);T.add(tgh);
    var tfr=new THREE.Mesh(new THREE.CylinderGeometry(2.8,2.8,5.6,10,1,true).scale(1,1,0.6),mH);tfr.position.set(2.6,0,1.75);T.add(tfr);
    var q;for(q=0;q<2;q++){var gb=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.2,8.4,8).rotateZ(PI/2),mS);gb.position.set(6.8,q?0.75:-0.75,1.6);T.add(gb);var gs=new THREE.Mesh(new THREE.CylinderGeometry(0.44,0.47,2.3,8).rotateZ(PI/2),mK);gs.position.set(3.5,q?0.75:-0.75,1.6);T.add(gs);}
    // SIGNATURE: sixteen SS-N-12 tubes in eight angled pairs along the foredeck
    function ssn(x,y){var s=y>0?1:-1,i;var cr=new THREE.Mesh(tb(9,5.6,1.6,0.8),mH);cr.position.set(x,y-s*1.2,DK+0.8);G.add(cr);for(i=0;i<2;i++){var tu=new THREE.Group();tu.position.set(x,y+s*i*2.4,DK+3.6+i*0.15);tu.rotation.z=s*0.06;tu.rotation.y=-0.3;G.add(tu);var c1=new THREE.Mesh(new THREE.CylinderGeometry(1.12,1.12,12.4,14).rotateZ(PI/2),mH);tu.add(c1);var cp=new THREE.Mesh(new THREE.CylinderGeometry(1.18,1.18,0.55,14).rotateZ(PI/2),mK);cp.position.set(6.4,0,0);tu.add(cp);var bd=new THREE.Mesh(new THREE.BoxGeometry(1.6,2.5,2.5),mK);bd.position.set(-5.2,0,0);tu.add(bd);var rg=new THREE.Mesh(new THREE.CylinderGeometry(1.22,1.22,0.35,14).rotateZ(PI/2),mK);rg.position.set(1,0,0);tu.add(rg);}}
    ssn(8,6.9);ssn(19,6.9);ssn(30,6.9);ssn(41,6.9);
    ssn(8,-6.9);ssn(19,-6.9);ssn(30,-6.9);ssn(41,-6.9);
    // SA-N-4 point defence bins fore and aft
    cl(2.3,2.5,1.5,12,mH,60,0,DK+0.75,"z");cl(1.9,2,0.5,12,mK,60,0,DK+1.7,"z");
    cl(2.3,2.5,1.5,12,mH,-66,0,DK+0.75,"z");cl(1.9,2,0.5,12,mK,-66,0,DK+1.7,"z");
    // superstructure and bridge
    tbm(64,15,6.2,0.9,mH,18,0,DK+3.1);
    tbm(26,12.6,4,0.9,mH,38,0,DK+8.2);
    tbm(13,11,3.6,0.88,mH,44,0,DK+12);
    bx(0.4,9.2,1.6,mK,50.4,0,DK+12.8).rotation.y=-0.42;
    bx(5.6,0.4,1.4,mK,47,5.1,DK+12.7).rotation.x=0.3;
    bx(5.6,0.4,1.4,mK,47,-5.1,DK+12.7).rotation.x=-0.3;
    bx(3.4,16.4,0.45,mH,44,0,DK+13.9);
    bx(5,1.2,0.5,mT,-2,7.8,DK+6.1);bx(5,1.2,0.5,mT,-2,-7.8,DK+6.1);
    // tall pyramid lattice mast with yards and Top Steer array
    tower(22,DK+6.2,DK+23,4.4,1.3,5);
    bx(5,5.6,0.45,mH,22,0,DK+23.3);
    cl(0.22,0.3,8,6,mS,22,0,DK+27.4,"z");
    cl(0.11,0.11,13,4,mS,22,0,DK+13.4,"x");
    cl(0.11,0.11,9,4,mS,22,0,DK+18.4,"x");
    var ts=new THREE.Mesh(new THREE.BoxGeometry(0.6,8.4,2.9),mS);ts.position.set(22,0,DK+25.2);ts.rotation.y=-0.32;G.add(ts);
    seg(22,6.5,DK+13.4,22,2.4,DK+18.4,0.07);seg(22,-6.5,DK+13.4,22,-2.4,DK+18.4,0.07);
    cl(0.05,0.05,6,4,mS,12,5,DK+11,"z");cl(0.05,0.05,6,4,mS,12,-5,DK+11,"z");
    // big Top Dome director aft plus Front Dome directors
    tbm(20,14.4,5,0.9,mH,-40,0,DK+2.5);
    tbm(12,11,4,0.88,mH,-44,0,DK+7);
    dome(-44,0,DK+9,3.5);
    dome(51,0,DK+13.9,2.2);
    dome(28,6.4,DK+6.3,1.6);dome(28,-6.4,DK+6.3,1.6);
    dome(-24,0,DK+7.4,1.8);
    // SA-N-6 revolver launcher hatches on the after deck
    var i,j;for(i=0;i<4;i++)for(j=0;j<2;j++){var hx=-20-i*7.6,hy=(j?1:-1)*5.2;cl(2,2.1,0.45,14,mK,hx,hy,DK+0.2,"z");cl(1.55,1.55,0.55,14,mH,hx,hy,DK+0.3,"z");}
    // broad funnel with twin uptakes and team band
    var fu=new THREE.Mesh(tb(14,11.4,7.6,0.74),mH);fu.position.set(4,0,DK+7);fu.rotation.y=0.07;G.add(fu);
    bx(11,8.6,0.6,mK,3.4,0,DK+11);
    cl(1.1,1.2,1.9,10,mK,5.4,2.6,DK+11.8,"z");cl(1.1,1.2,1.9,10,mK,1.8,-2.6,DK+11.8,"z");
    bx(7,10.4,0.55,mT,3.6,0,DK+9.3);
    // fantail: hangar door, helipad, AK-630 battery
    bx(0.6,7.4,5,mK,-70.4,0,DK+2.4);
    tbm(14,13,5.2,0.94,mH,-76,0,DK+2.6);
    pad(-84,0,DK+0.14,15,14);
    ak630(-6,8.4,DK+5.9);ak630(-6,-8.4,DK+5.9);ak630(-14,8.2,DK+5.9);ak630(-14,-8.2,DK+5.9);ak630(-56,7.4,DK+0.6);ak630(-56,-7.4,DK+0.6);
    boat(-32,8.8,DK+1.5,8.4);boat(-32,-8.8,DK+1.5,8.4);
    function tt(y){var s=y>0?1:-1,i;for(i=0;i<3;i++)cl(0.36,0.36,7.6,8,mK,-30,y+s*i*0.8,DK+1.2+i*0.7,"x");}
    tt(8.6);tt(-8.6);
    // railings, staffs, hull number
    rl2(62,8.6,84,4.6,DK);rl2(-92,6.2,-72,8.6,DK);rl2(-70,9,-50,9.6,DK);
    rl(-14,7.4,10,7.4,DK+6.4);rl(-14,-7.4,10,-7.4,DK+6.4);
    rl(47,5.2,47,-5.2,DK+14.1);
    cl(0.08,0.08,4.6,5,mS,-92,0,DK+2.3,"z");cl(0.08,0.08,4,5,mS,92,0,DK+5,"z");
    bx(1,0.6,1.1,mK,86,3,DK-1.2);bx(1,0.6,1.1,mK,86,-3,DK-1.2);
    bnum("011",7,82,4.9,6.6,0.16);
    return G;
  }
};

BLD_MODELS["depot"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var i, j, s, a;

    function rng(seed) { var v = seed || 11; return function () { v = (v * 16807) % 2147483647; return (v % 10000) / 10000; }; }
    function mkTex(w, h, draw, rx, ry) {
      var cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      draw(cv.getContext("2d"), w, h);
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping;
      if (rx) t.repeat.set(rx, ry || rx);
      return t;
    }
    /* oil-stained workshop floor with bay lines */
    var floorTex = mkTex(512, 512, function (x, w, h) {
      var r = rng(73), q;
      x.fillStyle = "#5a5e56"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 30; q++) {
        x.globalAlpha = 0.04 + r() * 0.05; x.fillStyle = (q % 3) ? "#000000" : "#979d90";
        x.fillRect(r() * w, r() * h, 40 + r() * 140, 30 + r() * 100);
      }
      x.globalAlpha = 0.5; x.strokeStyle = "#3b3f39"; x.lineWidth = 3;
      x.beginPath();
      for (q = 1; q < 4; q++) { x.moveTo(q * w / 4, 0); x.lineTo(q * w / 4, h); x.moveTo(0, q * h / 4); x.lineTo(w, q * h / 4); }
      x.stroke();
      x.globalAlpha = 1;
      /* oil blotches */
      for (q = 0; q < 16; q++) {
        var ox = r() * w, oy = r() * h, orad = 8 + r() * 34;
        var gr = x.createRadialGradient(ox, oy, 1, ox, oy, orad);
        gr.addColorStop(0, "rgba(16,14,12,0.55)"); gr.addColorStop(1, "rgba(16,14,12,0)");
        x.fillStyle = gr; x.beginPath(); x.arc(ox, oy, orad, 0, Math.PI * 2); x.fill();
      }
      /* painted bay markings */
      x.fillStyle = "rgba(216,206,150,0.7)";
      x.fillRect(40, 60, 8, 200); x.fillRect(300, 60, 8, 200);
      x.fillRect(40, 60, 268, 8);
      x.globalAlpha = 0.12; x.fillStyle = "#0b0d0b";
      for (q = 0; q < 16; q++) x.fillRect(r() * w, r() * h, 4 + r() * 8, 20 + r() * 60);
      x.globalAlpha = 1;
    }, 2, 2);
    var yardTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(19), q;
      x.fillStyle = "#585b50"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 500; q++) {
        x.globalAlpha = 0.1 + r() * 0.28; x.fillStyle = (q % 4) ? "#454840" : "#8a8d80";
        x.fillRect(r() * w, r() * h, 1 + r() * 3, 1 + r() * 3);
      }
      x.globalAlpha = 0.08; x.fillStyle = "#2b2d27";
      for (q = 0; q < 12; q++) x.fillRect(r() * w, r() * h, 26 + r() * 70, 20 + r() * 46);
      x.globalAlpha = 1;
    }, 8, 6);
    /* corrugated sheet */
    function ribTex(base, seed, rx, ry) {
      return mkTex(256, 64, function (x, w, h) {
        var r = rng(seed), q;
        x.fillStyle = base; x.fillRect(0, 0, w, h);
        for (q = 0; q < w; q += 9) {
          x.fillStyle = "rgba(0,0,0,0.22)"; x.fillRect(q, 0, 3, h);
          x.fillStyle = "rgba(255,255,255,0.10)"; x.fillRect(q + 4, 0, 2, h);
        }
        for (q = 0; q < 14; q++) {
          x.globalAlpha = 0.06 + r() * 0.06; x.fillStyle = (q % 2) ? "#23261f" : "#c3c9bd";
          x.fillRect(r() * w, r() * h, 16 + r() * 44, 5 + r() * 20);
        }
        x.globalAlpha = 1;
      }, rx, ry);
    }
    var panelTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(47), q;
      x.fillStyle = "#6e7369"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 20; q++) {
        x.globalAlpha = 0.05 + r() * 0.04; x.fillStyle = (q % 3) ? "#000000" : "#aab0a2";
        x.fillRect(r() * w, r() * h, 20 + r() * 70, 16 + r() * 50);
      }
      x.globalAlpha = 0.45; x.strokeStyle = "#262922"; x.lineWidth = 1.6;
      x.beginPath();
      for (q = 1; q < 4; q++) { x.moveTo(q * 64, 0); x.lineTo(q * 64, h); x.moveTo(0, q * 64); x.lineTo(w, q * 64); }
      x.stroke();
      x.globalAlpha = 0.12; x.fillStyle = "#0a0c0a";
      for (q = 0; q < 10; q++) x.fillRect(r() * w, r() * h * 0.5, 3 + r() * 5, 30 + r() * 90);
      x.globalAlpha = 1;
    });

    var floorMat = new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.92, metalness: 0.03 });
    var yard = new THREE.MeshStandardMaterial({ map: yardTex, roughness: 0.95, metalness: 0.02 });
    var roofMat = new THREE.MeshStandardMaterial({ map: ribTex("#7f857f", 23, 10, 2), color: 0xd8dcd4, roughness: 0.6, metalness: 0.35, side: THREE.DoubleSide });
    var sheet = new THREE.MeshStandardMaterial({ map: ribTex("#6d736c", 29, 6, 1), color: 0xcfd4cc, roughness: 0.62, metalness: 0.32, side: THREE.DoubleSide });
    var wallMat = new THREE.MeshStandardMaterial({ map: panelTex, roughness: 0.84, metalness: 0.08 });
    var steel = new THREE.MeshStandardMaterial({ color: 0x8c9195, roughness: 0.42, metalness: 0.8 });
    var metal = new THREE.MeshStandardMaterial({ color: 0x767b7d, roughness: 0.55, metalness: 0.4 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x282b2a, roughness: 0.6, metalness: 0.28 });
    var rubber = new THREE.MeshStandardMaterial({ color: 0x1d1f1e, roughness: 0.9, metalness: 0.02 });
    var hazard = new THREE.MeshStandardMaterial({ color: 0xc7a12a, roughness: 0.7, metalness: 0.08 });
    var team = new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.6, metalness: 0.14 });
    var glow = new THREE.MeshStandardMaterial({ color: 0xfff0cc, emissive: 0xffe2a8, emissiveIntensity: 1.1, roughness: 0.5, metalness: 0.0 });

    function box(w, d, h, mat) { return new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mat); }
    function cylZ(r1, r2, h, mat, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, h, seg || 10, 1, !!open); geo.rotateX(Math.PI / 2);
      return new THREE.Mesh(geo, mat);
    }
    function cylX(r1, r2, l, mat, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, l, seg || 8, 1, !!open); geo.rotateZ(-Math.PI / 2);
      return new THREE.Mesh(geo, mat);
    }
    function cylY(r1, r2, l, mat, seg, open) {
      return new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, l, seg || 8, 1, !!open), mat);
    }
    function put(m, x, y, z) { m.position.set(x, y, z); g.add(m); return m; }
    var upZ = new THREE.Vector3(0, 0, 1);
    function strut(p, q, rad, mat, parent, seg) {
      var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var geo = new THREE.CylinderGeometry(rad, rad, L, seg || 5, 1, true); geo.rotateX(Math.PI / 2);
      var m = new THREE.Mesh(geo, mat);
      m.position.set((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
      m.quaternion.setFromUnitVectors(upZ, new THREE.Vector3(dx / L, dy / L, dz / L));
      (parent || g).add(m); return m;
    }

    /* ---------------- yard + workshop slab ---------------- */
    put(box(60, 40, 0.22, yard), 0, 0, 0.11);
    put(box(50, 25, 0.3, floorMat), 0, 1.5, 0.28);
    put(box(50.6, 0.5, 0.5, wallMat), 0, -11.2, 0.3);
    for (i = 0; i < 12; i++) put(box(1.1, 0.55, 0.06, hazard), -24 + i * 4.4, -11.2, 0.57);

    /* ---------------- open-sided service bay: columns, trusses, roof ---------------- */
    var CX = [-20, -12, -4, 4, 12, 20], EY = 9.6, CH = 7.2, RIDGE = 8.9;
    for (i = 0; i < CX.length; i++) {
      for (s = -1; s <= 1; s += 2) {
        var cx = CX[i], cy = s * 8.8;
        put(box(1.3, 1.3, 0.45, wallMat), cx, cy, 0.5);
        put(box(0.22, 0.62, CH, steel), cx, cy, 0.6 + CH / 2);      /* I-beam web */
        for (j = -1; j <= 1; j += 2) put(box(0.5, 0.1, CH, steel), cx + j * 0.16, cy, 0.6 + CH / 2);
        put(box(0.7, 0.9, 0.12, steel), cx, cy, 0.72);
      }
      /* truss between the column pair */
      var zt = 0.6 + CH;
      strut([CX[i], -8.8, zt], [CX[i], 8.8, zt], 0.11, steel, null, 5);
      strut([CX[i], -EY, zt + 0.35], [CX[i], 0, RIDGE], 0.1, steel, null, 5);
      strut([CX[i], EY, zt + 0.35], [CX[i], 0, RIDGE], 0.1, steel, null, 5);
      for (j = 0; j < 4; j++) {
        var y0 = -8.8 + j * 4.4, y1 = y0 + 4.4;
        var zA = zt + 0.35 + (1 - Math.abs(y0) / EY) * (RIDGE - zt - 0.35);
        var zB = zt + 0.35 + (1 - Math.abs(y1) / EY) * (RIDGE - zt - 0.35);
        strut([CX[i], y0, zt], [CX[i], y1, zB], 0.055, steel, null, 4);
        strut([CX[i], y1, zt], [CX[i], y0, zA], 0.055, steel, null, 4);
        strut([CX[i], y1, zt], [CX[i], y1, zB], 0.05, steel, null, 4);
      }
    }
    /* roof panels + ridge vent + gutters */
    for (s = -1; s <= 1; s += 2) {
      var rp = box(47, 10.4, 0.26, roofMat);
      rp.position.set(0, s * 5.0, (RIDGE + 7.55) / 2);
      rp.rotation.x = -s * Math.atan2(RIDGE - 7.55, 9.6);
      g.add(rp);
      put(box(47.4, 0.45, 0.55, wallMat), 0, s * EY, 7.45);          /* fascia */
      put(box(47.4, 0.28, 0.3, team), 0, s * (EY + 0.24), 7.72);     /* team stripe */
      put(cylX(0.16, 0.16, 47.4, metal, 6, true), 0, s * (EY + 0.3), 7.2);
    }
    put(box(47.6, 1.6, 0.5, roofMat), 0, 0, RIDGE + 0.35);
    for (i = 0; i < 22; i++) put(box(0.8, 0.14, 0.3, dark), -22 + i * 2.1, 0.85, RIDGE + 0.2);
    for (i = 0; i < 5; i++) {                                        /* purlins */
      for (s = -1; s <= 1; s += 2) put(cylX(0.09, 0.09, 46, metal, 5, true), 0, s * (1.9 + i * 1.9), RIDGE - (i + 0.5) * 0.29);
    }
    /* pendant work lights */
    for (i = 0; i < 4; i++) {
      var lx = -16 + i * 10.6;
      put(cylZ(0.03, 0.03, 1.2, dark, 4, true), lx, -4.5, 6.6);
      put(cylZ(0.55, 0.42, 0.35, metal, 10), lx, -4.5, 5.9);
      put(cylZ(0.4, 0.4, 0.1, glow, 10), lx, -4.5, 5.72);
      put(cylZ(0.03, 0.03, 1.2, dark, 4, true), lx, 5.0, 6.6);
      put(cylZ(0.55, 0.42, 0.35, metal, 10), lx, 5.0, 5.9);
      put(cylZ(0.4, 0.4, 0.1, glow, 10), lx, 5.0, 5.72);
    }
    /* rear infill wall with tool board + shelving */
    put(box(47, 0.3, 4.4, sheet), 0, 9.4, 2.5);
    put(box(47.2, 0.4, 0.3, metal), 0, 9.4, 4.85);
    put(box(12, 0.16, 2.2, dark), -14, 9.15, 3.1);                   /* pegboard */
    var rr = rng(31);
    for (i = 0; i < 22; i++) {
      var tw = 0.12 + rr() * 0.2, th = 0.3 + rr() * 0.6;
      put(box(tw, 0.1, th, metal), -19.4 + i * 0.52, 9.05, 3.4 - th / 2);
    }
    for (i = 0; i < 3; i++) {                                        /* parts shelving */
      put(box(9, 1.2, 0.12, metal), 8, 8.6, 1.2 + i * 1.2);
      for (j = 0; j < 5; j++) put(box(1.2, 0.9, 0.7, j % 2 ? dark : wallMat), 4.5 + j * 1.8, 8.6, 1.62 + i * 1.2);
    }
    for (s = -1; s <= 1; s += 2) put(box(0.14, 1.3, 3.7, metal), 8 + s * 4.4, 8.6, 1.9);

    /* ---------------- inspection pit on its drive-on platform ---------------- */
    var PX = -6.5, PY = 2.0, PW = 14, PD = 7.0, PH = 0.85, SLOT = 1.3, SL = 9.4;
    for (s = -1; s <= 1; s += 2) {                                   /* side slabs */
      put(box(PW, (PD - SLOT) / 2, PH, wallMat), PX, PY + s * (SLOT + (PD - SLOT) / 2) / 2, 0.42 + PH / 2 - 0.42);
    }
    put(box((PW - SL) / 2, SLOT, PH, wallMat), PX - (SL + (PW - SL) / 2) / 2, PY, PH / 2);
    put(box((PW - SL) / 2, SLOT, PH, wallMat), PX + (SL + (PW - SL) / 2) / 2, PY, PH / 2);
    put(box(SL, SLOT, 0.1, dark), PX, PY, 0.06);                     /* pit floor */
    for (s = -1; s <= 1; s += 2) {
      put(box(SL, 0.12, PH, dark), PX, PY + s * SLOT / 2, PH / 2);   /* pit walls */
      put(box(SL + 0.2, 0.3, 0.07, hazard), PX, PY + s * (SLOT / 2 + 0.15), PH + 0.03);
      for (i = 0; i < 10; i++) put(box(0.42, 0.32, 0.075, dark), PX - 4.5 + i * 1.0, PY + s * (SLOT / 2 + 0.15), PH + 0.035);
    }
    for (i = 0; i < 2; i++) {                                        /* drive-on ramps */
      var rmp = box(3.2, PD, 0.22, wallMat);
      rmp.position.set(PX + (i ? 1 : -1) * (PW / 2 + 1.5), PY, PH / 2);
      rmp.rotation.y = (i ? 1 : -1) * Math.atan2(PH, 3.2);
      g.add(rmp);
    }
    for (i = 0; i < 5; i++) put(cylX(0.03, 0.03, 0.55, metal, 4), PX + 4.2, PY - 0.15, 0.15 + i * 0.16);
    put(cylZ(0.18, 0.18, 0.3, glow, 8), PX - 3.4, PY, 0.3);          /* pit light */
    put(box(1.1, 0.8, 0.6, metal), PX + 6.2, PY + 2.6, 1.15);        /* pit-side control box */

    /* ---------------- overhead hoist on its runway beam ---------------- */
    var BY2 = -4.6, BZ = 6.35;
    put(box(44, 0.18, 0.62, steel), 0, BY2, BZ);
    for (j = -1; j <= 1; j += 2) put(box(44, 0.52, 0.1, steel), 0, BY2, BZ + j * 0.36);
    for (i = 0; i < 6; i++) strut([CX[i], -8.8, 0.6 + CH], [CX[i], BY2, BZ + 0.5], 0.07, steel, null, 4);
    var trolley = new THREE.Group(); trolley.position.set(3.5, BY2, BZ); g.add(trolley);
    var tb = box(1.3, 1.5, 0.5, metal); tb.position.set(0, 0, -0.55); trolley.add(tb);
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2) {
      var wh = cylY(0.18, 0.18, 0.14, dark, 10);
      wh.position.set(i * 0.45, j * 0.34, 0.36); trolley.add(wh);
    }
    var hoistBody = box(1.0, 0.9, 0.8, metal); hoistBody.position.set(0.1, 0, -1.1); trolley.add(hoistBody);
    var teamB = box(1.02, 0.12, 0.28, team); teamB.position.set(0.1, -0.46, -1.1); trolley.add(teamB);
    var chain = cylZ(0.045, 0.045, 3.4, dark, 5, true); chain.position.set(0.35, 0, -3.2); trolley.add(chain);
    var blockH = box(0.42, 0.42, 0.55, dark); blockH.position.set(0.35, 0, -5.1); trolley.add(blockH);
    var hookGeo = new THREE.TorusGeometry(0.22, 0.06, 5, 10, Math.PI * 1.5);
    hookGeo.rotateX(Math.PI / 2);
    var hook = new THREE.Mesh(hookGeo, steel); hook.position.set(0.35, 0, -5.55); trolley.add(hook);
    /* pendant control on a cable */
    put(cylZ(0.02, 0.02, 2.6, dark, 4, true), 4.6, BY2 - 0.4, 4.0);
    put(box(0.16, 0.12, 0.5, dark), 4.6, BY2 - 0.4, 2.6);

    /* ---------------- workshop clutter ---------------- */
    /* tyre stacks */
    for (i = 0; i < 2; i++) {
      for (j = 0; j < 4; j++) {
        var ty = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.26, 6, 14), rubber);
        ty.position.set(-22.5 + i * 2.0, -7.0 + i * 0.4, 0.72 + j * 0.5);
        ty.rotation.z = j * 0.4; put(ty, ty.position.x, ty.position.y, ty.position.z);
      }
      put(cylZ(0.5, 0.5, 0.2, metal, 12), -22.5 + i * 2.0, -7.0 + i * 0.4, 2.75);
    }
    /* oil drums, upright and on a rack */
    var dr = rng(53);
    for (i = 0; i < 6; i++) {
      var dx2 = 18.5 + (i % 3) * 1.05, dy2 = -6.5 - Math.floor(i / 3) * 1.05;
      var drum = cylZ(0.44, 0.44, 1.0, i % 3 === 0 ? team : dark, 12);
      put(drum, dx2, dy2, 0.87);
      put(cylZ(0.46, 0.46, 0.07, metal, 12), dx2, dy2, 1.15);
      put(cylZ(0.46, 0.46, 0.07, metal, 12), dx2, dy2, 0.6);
    }
    put(box(2.6, 1.4, 0.3, metal), 18.5, -9.6, 0.9);
    for (i = 0; i < 2; i++) {
      put(cylX(0.44, 0.44, 1.9, dark, 12), 18.5, -9.9 + i * 0.95, 1.4);
      put(cylZ(0.06, 0.06, 0.4, metal, 5), 17.6, -9.9 + i * 0.95, 1.1);
    }
    for (s = -1; s <= 1; s += 2) put(box(0.16, 1.6, 1.1, metal), 18.5 + s * 1.2, -9.6, 0.9);
    /* workbench + vice + tool chest */
    put(box(5.0, 1.1, 0.16, metal), -16.5, 8.2, 1.05);
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2)
      put(box(0.12, 0.12, 1.0, metal), -16.5 + i * 2.3, 8.2 + j * 0.45, 0.5);
    put(box(0.4, 0.4, 0.32, steel), -14.8, 8.2, 1.28);
    put(box(1.4, 0.9, 1.1, team), -12.4, 8.4, 0.95);
    for (i = 0; i < 3; i++) put(box(1.3, 0.06, 0.07, metal), -12.4, 7.94, 0.6 + i * 0.32);
    /* welding bottles + compressor + jack stands */
    for (i = 0; i < 2; i++) {
      put(cylZ(0.24, 0.24, 1.5, i ? dark : team, 10), -9.6 + i * 0.6, 8.6, 1.15);
      put(cylZ(0.1, 0.1, 0.22, metal, 8), -9.6 + i * 0.6, 8.6, 2.0);
    }
    put(box(0.9, 0.8, 0.12, metal), -9.3, 8.6, 0.46);
    put(box(2.0, 1.1, 0.9, metal), -6.0, 8.7, 0.85);
    put(cylX(0.42, 0.42, 1.8, dark, 12), -6.0, 8.7, 1.55);
    for (i = 0; i < 3; i++) {
      put(cylZ(0.05, 0.05, 0.75, metal, 5), 12.5 + i * 0.9, -8.5, 0.75);
      put(cylZ(0.42, 0.12, 0.28, metal, 6), 12.5 + i * 0.9, -8.5, 0.5);
    }
    /* engine hoist */
    put(box(2.4, 0.3, 0.22, metal), 14.5, 3.0, 0.5);
    put(box(2.4, 0.3, 0.22, metal), 14.5, 5.2, 0.5);
    put(box(0.3, 2.4, 2.6, metal), 13.5, 4.1, 1.75);
    strut([13.5, 4.1, 3.0], [16.6, 4.1, 2.5], 0.13, metal, null, 6);
    put(cylZ(0.03, 0.03, 1.0, dark, 4, true), 16.4, 4.1, 1.95);
    put(box(0.3, 0.3, 0.3, dark), 16.4, 4.1, 1.4);
    /* pallets and crates in the yard */
    var pr = rng(67);
    for (i = 0; i < 5; i++) {
      var px2 = -27 + i * 2.6, py2 = 14.5 + pr() * 2.0;
      put(box(1.5, 1.2, 0.16, dark), px2, py2, 0.3);
      var cr = box(1.3 + pr() * 0.3, 1.0, 0.9 + pr() * 0.4, i % 2 ? wallMat : metal);
      cr.position.set(px2, py2, 0.85); cr.rotation.z = (pr() - 0.5) * 0.3; g.add(cr);
    }
    /* fuel/air hose reels on the columns */
    for (i = 0; i < 2; i++) {
      var hx = CX[1 + i * 3];
      put(cylX(0.55, 0.55, 0.4, metal, 12), hx + 0.5, -8.8, 3.4);
      put(cylX(0.2, 0.2, 0.5, dark, 8), hx + 0.5, -8.8, 3.4);
    }
    /* floodlight on the gable + team banner */
    put(box(0.5, 0.7, 0.45, dark), 22.6, -6.0, 7.2);
    put(box(0.12, 0.6, 0.38, glow), 22.32, -6.0, 7.2);
    put(box(0.1, 4.0, 2.6, team), 23.2, 3.0, 5.0);
    put(cylX(0.06, 0.06, 0.2, metal, 5), 23.2, 1.05, 6.35);
    return g;
  }
};

BLD_MODELS["derrick"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var i, j, k, s, a;

    function rng(seed) { var v = seed || 9; return function () { v = (v * 16807) % 2147483647; return (v % 10000) / 10000; }; }
    function mkTex(w, h, draw, rx, ry) {
      var cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      draw(cv.getContext("2d"), w, h);
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping;
      if (rx) t.repeat.set(rx, ry || rx);
      return t;
    }
    /* trodden dirt / gravel lease pad */
    var dirtTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(101), q;
      x.fillStyle = "#6a6350"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 620; q++) {
        x.globalAlpha = 0.1 + r() * 0.28; x.fillStyle = (q % 4) ? "#554f40" : "#8d866f";
        x.fillRect(r() * w, r() * h, 1 + r() * 3, 1 + r() * 3);
      }
      x.globalAlpha = 0.1; x.fillStyle = "#3a352a";
      for (q = 0; q < 14; q++) x.fillRect(r() * w, r() * h, 30 + r() * 80, 20 + r() * 50);
      x.globalAlpha = 0.14; x.fillStyle = "#2a2620";
      for (q = 0; q < 6; q++) x.fillRect(0, r() * h, w, 4 + r() * 7);
      x.globalAlpha = 1;
    }, 8, 8);
    /* crude-oil stain, alpha-faded at the edges */
    var stainTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(103), q, gr;
      x.clearRect(0, 0, w, h);
      for (q = 0; q < 22; q++) {
        var ox = 40 + r() * (w - 80), oy = 40 + r() * (h - 80), rad = 18 + r() * 60;
        gr = x.createRadialGradient(ox, oy, 1, ox, oy, rad);
        gr.addColorStop(0, "rgba(14,12,10,0.85)");
        gr.addColorStop(0.6, "rgba(20,17,13,0.45)");
        gr.addColorStop(1, "rgba(24,20,15,0)");
        x.fillStyle = gr; x.beginPath(); x.arc(ox, oy, rad, 0, Math.PI * 2); x.fill();
      }
    });
    function panelTex(base, tint, seed, cells) {
      return mkTex(256, 256, function (x, w, h) {
        var r = rng(seed), q;
        x.fillStyle = base; x.fillRect(0, 0, w, h);
        for (q = 0; q < 22; q++) {
          x.globalAlpha = 0.05 + r() * 0.05; x.fillStyle = (q % 3) ? "#000000" : tint;
          x.fillRect(r() * w, r() * h, 20 + r() * 70, 16 + r() * 50);
        }
        x.globalAlpha = 0.45; x.strokeStyle = "#26241d"; x.lineWidth = 1.8;
        x.beginPath();
        for (q = 1; q < cells; q++) { x.moveTo(q * w / cells, 0); x.lineTo(q * w / cells, h); x.moveTo(0, q * h / cells); x.lineTo(w, q * h / cells); }
        x.stroke();
        x.globalAlpha = 0.16; x.fillStyle = "#17140f";
        for (q = 0; q < 14; q++) x.fillRect(r() * w, r() * h * 0.4, 3 + r() * 6, 40 + r() * 110);
        x.globalAlpha = 1;
      });
    }
    /* tank shell: courses, weld seams, rust runs */
    var tankTex = mkTex(512, 256, function (x, w, h) {
      var r = rng(107), q;
      x.fillStyle = "#767b6f"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 26; q++) {
        x.globalAlpha = 0.05 + r() * 0.05; x.fillStyle = (q % 3) ? "#000000" : "#b0b5a6";
        x.fillRect(r() * w, r() * h, 30 + r() * 90, 16 + r() * 40);
      }
      x.globalAlpha = 0.55; x.strokeStyle = "#4a4e44"; x.lineWidth = 3;
      for (q = 1; q < 4; q++) { x.beginPath(); x.moveTo(0, q * h / 4); x.lineTo(w, q * h / 4); x.stroke(); }
      x.lineWidth = 2;
      for (q = 0; q < 8; q++) { x.beginPath(); x.moveTo(q * w / 8, 0); x.lineTo(q * w / 8, h); x.stroke(); }
      x.globalAlpha = 0.22; x.fillStyle = "#5a3a1c";
      for (q = 0; q < 16; q++) x.fillRect(r() * w, r() * h * 0.5, 3 + r() * 7, 30 + r() * 100);
      x.globalAlpha = 1;
    });

    var dirt = new THREE.MeshStandardMaterial({ map: dirtTex, roughness: 0.98, metalness: 0.0 });
    var stain = new THREE.MeshStandardMaterial({ map: stainTex, transparent: true, depthWrite: false, roughness: 0.45, metalness: 0.1 });
    var steel = new THREE.MeshStandardMaterial({ color: 0x8a8f8c, roughness: 0.42, metalness: 0.82 });
    var paint = new THREE.MeshStandardMaterial({ map: panelTex("#6c6f5e", "#a5a892", 71, 4), roughness: 0.72, metalness: 0.22 });
    var tankMat = new THREE.MeshStandardMaterial({ map: tankTex, roughness: 0.68, metalness: 0.25 });
    var metal = new THREE.MeshStandardMaterial({ color: 0x6f746e, roughness: 0.55, metalness: 0.42 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x24262a, roughness: 0.62, metalness: 0.3 });
    var team = new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.62, metalness: 0.15 });
    var lampR = new THREE.MeshStandardMaterial({ color: 0xd2352b, emissive: 0xd2352b, emissiveIntensity: 1.0, roughness: 0.4, metalness: 0.1 });
    var conc = new THREE.MeshStandardMaterial({ map: panelTex("#7b7a6c", "#a9a795", 83, 3), roughness: 0.95, metalness: 0.02 });

    function box(w, d, h, mat) { return new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mat); }
    function cylZ(r1, r2, h, mat, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, h, seg || 10, 1, !!open); geo.rotateX(Math.PI / 2);
      return new THREE.Mesh(geo, mat);
    }
    function cylX(r1, r2, l, mat, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, l, seg || 8, 1, !!open); geo.rotateZ(-Math.PI / 2);
      return new THREE.Mesh(geo, mat);
    }
    function cylY(r1, r2, l, mat, seg, open) {
      return new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, l, seg || 8, 1, !!open), mat);
    }
    function put(m, x, y, z) { m.position.set(x, y, z); g.add(m); return m; }
    var upZ = new THREE.Vector3(0, 0, 1);
    function strut(p, q, rad, mat, parent, seg) {
      var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var geo = new THREE.CylinderGeometry(rad, rad, L, seg || 5, 1, true); geo.rotateX(Math.PI / 2);
      var m = new THREE.Mesh(geo, mat);
      m.position.set((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
      m.quaternion.setFromUnitVectors(upZ, new THREE.Vector3(dx / L, dy / L, dz / L));
      (parent || g).add(m); return m;
    }
    function railing(cx, cy, rad, z, h, n, mat) {
      var pts = [], q;
      for (q = 0; q <= n; q++) pts.push([cx + Math.cos(q / n * Math.PI * 2) * rad, cy + Math.sin(q / n * Math.PI * 2) * rad]);
      for (q = 0; q < n; q++) {
        var dx = pts[q + 1][0] - pts[q][0], dy = pts[q + 1][1] - pts[q][1];
        var L = Math.sqrt(dx * dx + dy * dy);
        for (var lvl = 0; lvl < 2; lvl++) {
          var bar = cylX(0.03, 0.03, L, mat, 4, true); bar.rotation.z = Math.atan2(dy, dx);
          put(bar, pts[q][0] + dx / 2, pts[q][1] + dy / 2, z + h * (lvl ? 1 : 0.55));
        }
        put(cylZ(0.04, 0.04, h, mat, 4, true), pts[q][0], pts[q][1], z + h / 2);
      }
    }

    /* ---------------- lease pad + oil-stained ground ---------------- */
    put(box(40, 40, 0.2, dirt), 0, 0, 0.1);
    var sp = new THREE.Mesh(new THREE.PlaneGeometry(21, 17), stain);
    put(sp, 7.5, -7.0, 0.22);
    var sp2 = new THREE.Mesh(new THREE.PlaneGeometry(14, 12), stain);
    put(sp2, -7.5, 5.0, 0.22);

    /* ---------------- lattice derrick tower ---------------- */
    var TX = -8.0, TY = 6.0, DECK = 3.2, HT = 22.0, bays = 6;
    var rb = 3.4, rt = 1.0;
    function legXY(kk, t) {
      var rr = rb + (rt - rb) * t;
      var ang = Math.PI / 4 + kk * Math.PI / 2;
      return [TX + Math.cos(ang) * rr, TY + Math.sin(ang) * rr];
    }
    /* substructure / drill floor */
    put(box(10.5, 10.5, 0.4, conc), TX, TY, 0.3);
    for (k = 0; k < 4; k++) {
      var f = legXY(k, 0);
      put(box(1.5, 1.5, DECK, paint), f[0], f[1], DECK / 2 + 0.4);
      strut([f[0], f[1], 0.5], [TX, TY, DECK], 0.09, steel, null, 4);
    }
    put(box(9.6, 9.6, 0.32, steel), TX, TY, DECK + 0.16);
    put(box(9.9, 9.9, 0.16, paint), TX, TY, DECK + 0.4);
    put(cylZ(1.5, 1.5, 0.42, metal, 16), TX, TY, DECK + 0.55);        /* rotary table */
    put(cylZ(0.62, 0.62, 0.5, dark, 12), TX, TY, DECK + 0.7);
    put(box(3.4, 2.6, 2.5, paint), TX + 3.0, TY - 3.2, DECK + 1.6);   /* doghouse */
    put(box(3.6, 2.8, 0.16, metal), TX + 3.0, TY - 3.2, DECK + 2.92);
    put(box(1.0, 0.16, 1.9, dark), TX + 1.9, TY - 3.4, DECK + 1.3);
    put(box(3.7, 0.3, 0.4, team), TX + 3.0, TY - 4.6, DECK + 2.6);
    railing(TX, TY, 4.9, DECK + 0.5, 1.05, 12, metal);
    for (i = 0; i < 7; i++) put(box(1.7, 0.28, 0.1, metal), TX - 5.6 - i * 0.42, TY + 0.0, DECK - i * 0.46);
    /* the lattice mast itself */
    for (i = 0; i < bays; i++) {
      var t0 = i / bays, t1 = (i + 1) / bays;
      var z0 = DECK + 0.5 + t0 * HT, z1 = DECK + 0.5 + t1 * HT;
      for (k = 0; k < 4; k++) {
        var p0 = legXY(k, t0), p1 = legXY(k, t1);
        var q0 = legXY((k + 1) % 4, t0), q1 = legXY((k + 1) % 4, t1);
        strut([p0[0], p0[1], z0], [p1[0], p1[1], z1], 0.14, steel);
        strut([p0[0], p0[1], z1], [q0[0], q0[1], z1], 0.08, steel);
        strut([p0[0], p0[1], z0], [q1[0], q1[1], z1], 0.06, steel);
        strut([q0[0], q0[1], z0], [p1[0], p1[1], z1], 0.06, steel);
      }
    }
    /* monkey board, ladder, crown block */
    var mbT = 0.58, mbZ = DECK + 0.5 + mbT * HT;
    var mb = legXY(0, mbT), mb2 = legXY(3, mbT);
    put(box(2.6, 3.4, 0.14, metal), (mb[0] + mb2[0]) / 2 + 0.6, TY, mbZ);
    railing((mb[0] + mb2[0]) / 2 + 0.6, TY, 1.7, mbZ, 0.95, 8, metal);
    for (i = 0; i < 30; i++) put(cylX(0.025, 0.025, 0.5, metal, 4), TX + 2.3 - i * 0.055, TY, DECK + 1.2 + i * 0.72);
    for (s = -1; s <= 1; s += 2) strut([TX + 2.4, TY + s * 0.24, DECK + 1.0], [TX + 0.75, TY + s * 0.24, DECK + 0.5 + HT], 0.035, metal, null, 4);
    var crownZ = DECK + 0.5 + HT;
    put(box(3.0, 3.0, 0.3, steel), TX, TY, crownZ + 0.15);
    for (s = -1; s <= 1; s += 2) {
      put(cylY(0.62, 0.62, 0.3, metal, 14), TX + s * 0.55, TY, crownZ + 0.75);
      put(cylY(0.2, 0.2, 0.36, dark, 8), TX + s * 0.55, TY, crownZ + 0.75);
    }
    put(box(2.2, 2.2, 0.16, metal), TX, TY, crownZ + 1.05);
    put(cylZ(0.16, 0.16, 0.34, lampR, 8), TX, TY, crownZ + 1.3);
    for (s = -1; s <= 1; s += 2) put(box(0.5, 0.16, 1.2, team), TX, TY + s * 1.1, crownZ - 0.7);
    /* travelling block hanging in the derrick */
    put(cylZ(0.05, 0.05, 6.0, dark, 5, true), TX + 0.55, TY, crownZ - 3.2);
    put(cylZ(0.05, 0.05, 6.0, dark, 5, true), TX - 0.55, TY, crownZ - 3.2);
    put(box(1.1, 0.9, 1.8, dark), TX, TY, crownZ - 7.0);
    put(cylZ(0.3, 0.3, 0.9, metal, 10), TX, TY, crownZ - 8.3);

    /* ---------------- walking-beam pump (nodding donkey) ---------------- */
    var PX = 9.5, PY = -8.0;
    put(box(11.0, 4.6, 0.45, conc), PX, PY, 0.32);
    put(box(9.0, 3.0, 0.5, paint), PX - 0.5, PY, 0.72);               /* skid */
    /* Samson post */
    var postTop = 6.4;
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2)
      strut([PX + i * 1.5, PY + j * 1.35, 0.95], [PX + i * 0.28, PY + j * 0.42, postTop], 0.16, paint, null, 5);
    strut([PX - 1.5, PY - 1.35, 3.6], [PX + 1.5, PY - 1.35, 3.6], 0.09, paint, null, 4);
    strut([PX - 1.5, PY + 1.35, 3.6], [PX + 1.5, PY + 1.35, 3.6], 0.09, paint, null, 4);
    put(box(1.3, 1.5, 0.5, metal), PX, PY, postTop + 0.1);            /* saddle bearing */

    var rotor = new THREE.Group(); rotor.name = "rotor";
    rotor.position.set(PX, PY, postTop + 0.25);
    rotor.rotation.y = -0.14;
    g.add(rotor);
    var beam = box(11.0, 0.62, 0.95, paint); beam.position.set(-0.6, 0, 0.35); rotor.add(beam);
    var beamTop = box(11.0, 0.9, 0.16, metal); beamTop.position.set(-0.6, 0, 0.86); rotor.add(beamTop);
    for (i = 0; i < 6; i++) {                                          /* beam web lightening holes */
      var hole = cylY(0.22, 0.22, 0.66, dark, 10);
      hole.position.set(-4.4 + i * 1.5, 0, 0.35); rotor.add(hole);
    }
    var tb2 = box(2.4, 0.66, 0.2, team); tb2.position.set(-1.0, 0, 0.9); rotor.add(tb2);
    /* horse head: crescent slab on the forward end */
    var hp = [], A;
    for (i = 0; i <= 8; i++) { A = -0.18 - i * 0.17; hp.push([Math.cos(A) * 2.45, Math.sin(A) * 2.45]); }
    for (i = 8; i >= 0; i--) { A = -0.18 - i * 0.17; hp.push([Math.cos(A) * 1.35, Math.sin(A) * 1.35]); }
    for (s = -1; s <= 1; s += 2) {
      var hh = new THREE.Mesh(M.slab(THREE, hp, 0.16, "xz"), paint);
      hh.position.set(4.6, s * 0.34, 0.3); rotor.add(hh);
    }
    var hhWeb = box(1.4, 0.6, 0.9, paint); hhWeb.position.set(5.3, 0, 0.35); rotor.add(hhWeb);
    var hhCap = box(0.5, 0.75, 0.3, metal); hhCap.position.set(6.9, 0, -0.6); rotor.add(hhCap);
    /* bridle cables + carrier bar hanging from the head */
    for (s = -1; s <= 1; s += 2) {
      var cbl = cylZ(0.045, 0.045, 2.6, dark, 4, true);
      cbl.position.set(6.75, s * 0.3, -2.1); rotor.add(cbl);
    }
    var carrier = box(0.5, 1.0, 0.22, metal); carrier.position.set(6.75, 0, -3.45); rotor.add(carrier);
    /* equaliser / pitman arms and crank assembly (fixed frame) */
    put(box(2.2, 2.4, 1.5, paint), PX - 6.6, PY, 1.15);               /* gearbox */
    put(box(2.4, 2.6, 0.2, metal), PX - 6.6, PY, 1.95);
    put(box(1.6, 1.2, 1.0, dark), PX - 8.4, PY + 0.2, 0.95);          /* prime mover */
    put(box(0.7, 1.9, 1.4, metal), PX - 7.6, PY - 0.1, 1.5);          /* belt guard */
    for (s = -1; s <= 1; s += 2) {
      var crank = cylY(1.55, 1.55, 0.22, metal, 18);
      put(crank, PX - 6.6, PY + s * 1.35, 2.2);
      var cwt = box(1.5, 0.5, 2.4, dark);
      cwt.position.set(PX - 7.2, PY + s * 1.35, 2.9); cwt.rotation.y = 0.5; g.add(cwt);
      var pit = strut([PX - 6.0, PY + s * 1.35, 3.5], [PX - 5.2, PY + s * 0.75, postTop + 0.05], 0.11, paint, null, 5);
    }
    put(cylY(0.35, 0.35, 3.2, metal, 12), PX - 6.6, PY, 2.2);
    /* wellhead under the horse head */
    var WX = PX + 6.75;
    put(box(2.6, 2.6, 0.4, conc), WX, PY, 0.3);
    put(cylZ(0.34, 0.34, 1.5, metal, 12), WX, PY, 1.0);
    put(cylZ(0.5, 0.5, 0.25, metal, 12), WX, PY, 1.8);
    put(cylZ(0.24, 0.24, 1.1, steel, 10), WX, PY, 2.5);
    put(cylZ(0.09, 0.09, 3.6, steel, 6), WX, PY, 3.7);                /* polished rod */
    for (s = -1; s <= 1; s += 2) {
      put(cylX(0.16, 0.16, 1.5, metal, 8), WX + s * 0.75, PY, 1.55);
      var hw = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 5, 10), metal);
      hw.rotation.y = Math.PI / 2; put(hw, WX + s * 1.5, PY, 1.55);
    }
    put(box(0.9, 0.16, 0.7, team), WX, PY - 1.0, 1.2);

    /* ---------------- flow line + holding tanks ---------------- */
    var HXX = 12.0, HYY = 11.0;
    put(box(15.5, 12.5, 0.35, conc), HXX - 1.0, HYY - 0.5, 0.28);
    for (s = -1; s <= 1; s += 2) put(box(15.5, 0.5, 1.0, conc), HXX - 1.0, HYY - 0.5 + s * 6.25, 0.6);
    put(box(0.5, 12.5, 1.0, conc), HXX + 6.75, HYY - 0.5, 0.6);
    put(box(0.5, 12.5, 1.0, conc), HXX - 8.75, HYY - 0.5, 0.6);
    for (i = 0; i < 2; i++) {
      var tx = HXX - 4.0 + i * 7.6, ty = HYY, TR = 3.3, TH = 7.4;
      put(cylZ(TR, TR, TH, tankMat, 20), tx, ty, 0.45 + TH / 2);
      put(cylZ(TR + 0.12, TR + 0.12, 0.3, metal, 20), tx, ty, 0.6);
      var top = new THREE.Mesh(new THREE.ConeGeometry(TR + 0.05, 1.1, 20), metal);
      top.geometry.rotateX(Math.PI / 2);
      put(top, tx, ty, 0.45 + TH + 0.55);
      put(cylZ(0.42, 0.42, 0.4, metal, 10), tx + 0.9, ty, 0.45 + TH + 1.0);
      put(box(0.9, 0.9, 0.1, dark), tx + 0.9, ty, 0.45 + TH + 1.22);
      railing(tx, ty, TR - 0.35, 0.45 + TH + 0.1, 0.95, 10, metal);
      /* cage ladder */
      for (j = 0; j < 12; j++) put(cylX(0.025, 0.025, 0.5, metal, 4), tx, ty - TR - 0.28, 1.0 + j * 0.6);
      for (s = -1; s <= 1; s += 2) put(cylZ(0.035, 0.035, 7.4, metal, 4, true), tx + s * 0.25, ty - TR - 0.28, 4.3);
      put(box(2.0, 0.16, 0.7, team), tx, ty - TR - 0.06, 6.4);
      put(box(1.1, 0.2, 1.6, dark), tx - 1.6, ty - TR - 0.02, 1.4);
      /* nozzle + valve at the base */
      put(cylX(0.22, 0.22, 1.4, metal, 8), tx - TR - 0.6, ty, 1.2);
      put(cylZ(0.16, 0.16, 0.5, metal, 8), tx - TR - 1.2, ty, 1.5);
    }
    /* separator vessel on saddles */
    put(cylX(1.15, 1.15, 5.4, metal, 14), HXX + 1.8, HYY - 7.6, 1.8);
    for (s = -1; s <= 1; s += 2) put(box(0.5, 1.8, 1.2, paint), HXX + 1.8 + s * 1.9, HYY - 7.6, 0.6);
    put(cylZ(0.24, 0.24, 1.1, metal, 8), HXX + 3.8, HYY - 7.6, 3.2);
    put(box(1.2, 0.2, 0.5, team), HXX + 1.8, HYY - 8.75, 2.5);
    /* flow line from wellhead to the tank battery, on sleepers */
    var pipeY = -4.6;
    put(cylX(0.19, 0.19, 7.0, metal, 8), WX - 3.4, PY, 0.75);
    var elb = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.19, 6, 8, Math.PI / 2), metal);
    elb.geometry.rotateX(Math.PI / 2);
    put(elb, WX - 6.9, PY + 0.55, 0.75);
    put(cylY(0.19, 0.19, 12.0, metal, 8), WX - 7.45, PY + 6.6, 0.75);
    for (i = 0; i < 5; i++) put(box(1.0, 0.4, 0.3, paint), WX - 7.45, PY + 1.8 + i * 2.4, 0.5);
    put(cylZ(0.16, 0.16, 0.55, metal, 8), WX - 7.45, PY + 4.0, 1.2);
    var hwv = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 5, 10), metal);
    put(hwv, WX - 7.45, PY + 4.0, 1.55);
    put(cylY(0.19, 0.19, 3.0, metal, 8), WX - 7.45, PY + 13.2, 0.75);
    /* pipe rack with stands of drill pipe */
    for (i = 0; i < 2; i++) put(box(0.5, 5.0, 0.7, paint), -17.0 + i * 6.0, -8.0, 0.55);
    for (i = 0; i < 5; i++) {
      put(cylY(0.16, 0.16, 8.5, steel, 8), -17.6 + i * 0.42, -8.0, 1.05);
      put(cylY(0.16, 0.16, 8.5, steel, 8), -11.6 + i * 0.42, -8.0, 1.05);
    }
    for (i = 0; i < 3; i++) put(cylY(0.16, 0.16, 8.5, steel, 8), -17.4 + i * 0.42, -8.0, 1.37);
    /* mud tanks + pump skid beside the rig */
    put(box(6.0, 3.2, 2.2, paint), -18.0, 3.0, 1.2);
    put(box(6.2, 3.4, 0.14, metal), -18.0, 3.0, 2.35);
    railing(-18.0, 3.0, 2.0, 2.4, 0.9, 8, metal);
    put(box(3.0, 2.0, 1.4, metal), -18.0, 7.5, 0.8);
    put(cylX(0.5, 0.5, 1.6, dark, 10), -16.4, 7.5, 1.4);
    /* drums and crates */
    var r5 = rng(59);
    for (i = 0; i < 5; i++) put(cylZ(0.42, 0.42, 0.95, i % 3 ? dark : team, 10), 16.5 + (i % 3) * 0.95, -16.0 - Math.floor(i / 3) * 0.95, 0.6);
    for (i = 0; i < 3; i++) {
      var cr = box(1.6 + r5() * 0.4, 1.2, 1.0, i % 2 ? paint : metal);
      cr.position.set(-4.0 + i * 2.2, -15.5 + r5() * 1.4, 0.62); cr.rotation.z = (r5() - 0.5) * 0.4; g.add(cr);
    }
    /* warning sign + floodlight */
    put(cylZ(0.07, 0.07, 2.2, metal, 5, true), 2.0, -17.5, 1.1);
    put(box(1.3, 0.08, 0.85, team), 2.0, -17.5, 2.4);
    put(cylZ(0.16, 0.16, 8.0, metal, 8), -1.5, 13.5, 4.0);
    put(box(0.6, 0.9, 0.45, dark), -1.5, 13.1, 8.1);
    put(box(0.55, 0.12, 0.4, new THREE.MeshStandardMaterial({ color: 0xfff1d0, emissive: 0xffe6b0, emissiveIntensity: 1.0, roughness: 0.5 })), -1.5, 12.6, 8.05);
    return g;
  }
};

UNIT_MODELS["destroyer_c"] = {
  len: 157,
  build: function (THREE, M, C) {
var G=new THREE.Group(),PI=Math.PI,R=Math.random;
    function NI(g){g=g.toNonIndexed();g.computeVertexNormals();return g;}
    function tb(lx,ly,lz,t){return NI(new THREE.CylinderGeometry(t,1,lz,4,1).rotateX(PI/2).rotateZ(PI/4).scale(lx*0.7071,ly*0.7071,1));}
    function cv(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    var hullT=cv(1024,256,function(x,w,h){var i;x.fillStyle="#6d7378";x.fillRect(0,0,w,h);for(i=0;i<46;i++){x.globalAlpha=0.055;x.fillStyle=i%2?"#5c6268":"#7e848a";x.fillRect(R()*w,R()*h,50+R()*170,14+R()*46);}x.globalAlpha=0.4;x.strokeStyle="#555b61";x.lineWidth=1;for(i=1;i<34;i++){x.beginPath();x.moveTo(i*w/34,0);x.lineTo(i*w/34,h);x.stroke();}for(i=1;i<10;i++){x.beginPath();x.moveTo(0,i*h/10);x.lineTo(w,i*h/10);x.stroke();}x.globalAlpha=1;x.fillStyle="#24282b";x.fillRect(0,0.17*h,w,0.15*h);x.globalAlpha=0.12;x.fillStyle="#3a2b20";for(i=0;i<44;i++)x.fillRect(R()*w,0.33*h+R()*0.28*h,2+R()*4,14+R()*66);x.globalAlpha=1;});
    var deckT=cv(512,512,function(x,w,h){var i;x.fillStyle="#4b5054";x.fillRect(0,0,w,h);for(i=0;i<44;i++){x.globalAlpha=0.06;x.fillStyle=i%2?"#41464a":"#585e63";x.fillRect(R()*w,R()*h,40+R()*130,24+R()*80);}x.globalAlpha=0.35;x.strokeStyle="#383c40";x.lineWidth=2;for(i=1;i<12;i++){x.beginPath();x.moveTo(0,i*h/12);x.lineTo(w,i*h/12);x.stroke();x.beginPath();x.moveTo(i*w/12,0);x.lineTo(i*w/12,h);x.stroke();}x.globalAlpha=0.45;x.fillStyle="#2b2f32";for(i=0;i<300;i++)x.fillRect(R()*w,R()*h,3,3);x.globalAlpha=1;});
    deckT.wrapS=deckT.wrapT=THREE.RepeatWrapping;deckT.repeat.set(0.075,0.075);
    var panT=cv(128,128,function(x,w,h){var i,j;x.fillStyle="#8d8f88";x.fillRect(0,0,w,h);x.fillStyle="rgba(0,0,0,0.3)";for(i=0;i<15;i++)for(j=0;j<15;j++)x.fillRect(i*8+3,j*8+3,4,4);x.strokeStyle="rgba(255,255,255,0.15)";x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);});
    var mH=new THREE.MeshStandardMaterial({map:hullT,metalness:0.3,roughness:0.6});
    var mD=new THREE.MeshStandardMaterial({map:deckT,metalness:0.25,roughness:0.72});
    var mK=new THREE.MeshStandardMaterial({color:0x23272b,metalness:0.35,roughness:0.55});
    var mW=new THREE.MeshStandardMaterial({color:0xc9ced2,metalness:0.2,roughness:0.6});
    var mS=new THREE.MeshStandardMaterial({color:0x8d9398,metalness:0.85,roughness:0.3});
    var mP=new THREE.MeshStandardMaterial({map:panT,metalness:0.3,roughness:0.6});
    var mT=new THREE.MeshStandardMaterial({color:C.team,metalness:0.3,roughness:0.55});
    function bx(lx,ly,lz,m,x,y,z){var s=new THREE.Mesh(new THREE.BoxGeometry(lx,ly,lz),m);s.position.set(x,y,z);G.add(s);return s;}
    function cl(rt,rb,l,sg,m,x,y,z,ax){var g=new THREE.CylinderGeometry(rt,rb,l,sg);if(ax=="z")g.rotateX(PI/2);if(ax=="x")g.rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);G.add(s);return s;}
    function tbm(lx,ly,lz,t,m,x,y,z){var s=new THREE.Mesh(tb(lx,ly,lz,t),m);s.position.set(x,y,z);G.add(s);return s;}
    var stG=new THREE.CylinderGeometry(0.045,0.045,1.15,4,1,true).rotateX(PI/2);
    function rl(x0,y0,x1,y1,z){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),n=Math.max(2,Math.round(L/2.6)),i,g0=new THREE.Group();g0.position.set((x0+x1)/2,(y0+y1)/2,z);g0.rotation.z=Math.atan2(dy,dx);G.add(g0);for(i=0;i<=n;i++){var s=new THREE.Mesh(stG,mW);s.position.set(-L/2+L*i/n,0,0.57);g0.add(s);}var rg=new THREE.CylinderGeometry(0.05,0.05,L,4,1,true).rotateZ(PI/2);for(i=0;i<2;i++){var b=new THREE.Mesh(rg,mW);b.position.set(0,0,0.62+i*0.5);g0.add(b);}return g0;}
    function rl2(x0,y0,x1,y1,z){rl(x0,y0,x1,y1,z);rl(x0,-y0,x1,-y1,z);}
    function bnum(s,wd,x,y,z,tl){var t=cv(256,128,function(c,w,h){c.font="bold 92px Arial";c.fillStyle="#dfe3e6";c.textAlign="center";c.fillText(s,w/2,100);});var mm=new THREE.MeshStandardMaterial({map:t,transparent:true,metalness:0.2,roughness:0.6});var g=new THREE.PlaneGeometry(wd,wd/2);g.rotateX(PI/2);var a=new THREE.Mesh(g,mm);a.position.set(x,-y,z);a.rotation.x=-tl;G.add(a);var g2=new THREE.PlaneGeometry(wd,wd/2);g2.rotateY(PI);g2.rotateX(PI/2);var b=new THREE.Mesh(g2,mm);b.position.set(x,y,z);b.rotation.x=tl;G.add(b);}
    function pl(S,k,n0,n1){var p=[],i;for(i=n0;i<=n1;i++)p.push([S[i].x,S[i].w*k]);for(i=n1;i>=n0;i--)p.push([S[i].x,-S[i].w*k]);return p;}
    function deck(S,k,n0,n1,z,th){var d=new THREE.Mesh(M.slab(THREE,pl(S,k,n0,n1),th||0.3),mD);d.position.z=z;G.add(d);return d;}
    function vls(x,y,z,nx,ny,c){var lx=nx*c,ly=ny*c;bx(lx+0.9,ly+0.9,0.55,mK,x,y,z+0.2);var t=cv(256,256,function(g,w,h){var i,j,cw=w/nx,ch=h/ny;g.fillStyle="#3e4347";g.fillRect(0,0,w,h);for(i=0;i<nx;i++)for(j=0;j<ny;j++){var px=i*cw,py=j*ch;g.fillStyle="#15181a";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.82);g.fillStyle="#6c7378";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.1);g.fillStyle="rgba(255,255,255,0.13)";g.fillRect(px+cw*0.4,py+ch*0.14,cw*0.2,ch*0.7);}});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.4,roughness:0.5}));p.position.set(x,y,z+0.48);G.add(p);}
    function oct(r,m,x,y,z,yaw,pit){var g=new THREE.CylinderGeometry(r,r,0.34,8).rotateY(PI/8).rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);s.rotation.z=yaw;s.rotation.y=pit||0;G.add(s);return s;}
    function spy(r,x,y,z,yaw,pit){oct(r+0.42,mK,x,y,z,yaw,pit);oct(r,mP,x+Math.cos(yaw)*0.2,y+Math.sin(yaw)*0.2,z,yaw,pit);}
    function pad(x,y,z,lx,ly){var t=cv(256,256,function(g,w,h){var i;g.fillStyle="#41464a";g.fillRect(0,0,w,h);for(i=0;i<26;i++){g.globalAlpha=0.07;g.fillStyle=i%2?"#34383c":"#4d5257";g.fillRect(R()*w,R()*h,40+R()*90,30+R()*70);}g.globalAlpha=0.3;g.strokeStyle="#2c3033";g.lineWidth=2;for(i=1;i<8;i++){g.beginPath();g.moveTo(0,i*h/8);g.lineTo(w,i*h/8);g.stroke();}g.globalAlpha=1;g.strokeStyle="#d5d9dd";g.lineWidth=8;g.beginPath();g.arc(w/2,h/2,w*0.29,0,7);g.stroke();g.save();g.translate(w/2,h/2);g.rotate(PI/2);g.fillStyle="#d5d9dd";g.font="bold 118px Arial";g.textAlign="center";g.fillText("H",0,42);g.restore();});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.2,roughness:0.8}));p.position.set(x,y,z);G.add(p);return p;}
    function boat(x,y,z,L){var s=y>0?1:-1;var b=new THREE.Mesh(tb(L,L*0.33,L*0.2,0.62),mK);b.position.set(x,y,z);G.add(b);bx(L*0.2,L*0.2,L*0.11,mW,x-L*0.13,y,z+L*0.15);cl(0.09,0.09,2.9,5,mS,x+L*0.34,y-s*0.5,z+1.5,"z");cl(0.09,0.09,2.9,5,mS,x-L*0.34,y-s*0.5,z+1.5,"z");cl(0.08,0.08,1.7,5,mS,x+L*0.34,y-s*0.05,z+2.85);cl(0.08,0.08,1.7,5,mS,x-L*0.34,y-s*0.05,z+2.85);}
    function dish(r,x,y,z,yaw){var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,6,0,PI*2,0,PI*0.42).rotateZ(PI/2),mW);d.position.set(x,y,z);d.rotation.z=yaw||0;G.add(d);cl(0.09,0.09,r*0.8,5,mK,x-Math.cos(yaw||0)*r*0.4,y-Math.sin(yaw||0)*r*0.4,z,"x");return d;}
    function light(x,y,z){cl(0.06,0.06,0.9,5,mS,x,y,z,"z");bx(0.35,0.5,0.45,mW,x,y,z+0.6);}
    var DK=8;
    function ciws(x,y,z,aft){cl(1.05,1.2,1.5,10,mW,x,y,z+0.75,"z");var d=new THREE.Mesh(tb(2.1,2.4,1.5,0.55),mW);d.position.set(x,y,z+2.1);G.add(d);var b=cl(0.3,0.34,2.6,10,mK,x+(aft?-1.6:1.6),y,z+2);b.rotation.z=PI/2;if(aft)b.rotation.x=PI;}
    function hq10(x,y,z,aft){var b=new THREE.Mesh(tb(3.4,5.6,2.4,0.85),mK);b.position.set(x,y,z+1.2);b.rotation.y=aft?0.22:-0.22;G.add(b);var i,j;for(i=0;i<6;i++)for(j=0;j<4;j++)cl(0.24,0.24,0.3,6,mS,x+(aft?-1.75:1.75),y-1.9+i*0.76,z+0.55+j*0.5,"x");}
    // stealth hull: knuckled sides, flare forward, keel -1.0
    var S=[{x:-78.5,w:7.4,h:4.6,zc:3.6,sq:0.92},{x:-70,w:8.8,h:4.7,zc:3.5,sq:0.9},{x:-50,w:9.4,h:4.8,zc:3.4,sq:0.89},{x:-16,w:9.5,h:4.9,zc:3.3,sq:0.89},{x:12,w:9.4,h:4.9,zc:3.3,sq:0.88},{x:38,w:8.7,h:5.1,zc:3.5,sq:0.86},{x:54,w:7.2,h:5.6,zc:4,sq:0.82},{x:66,w:4.9,h:6.2,zc:4.7,sq:0.77},{x:74,w:2.4,h:6.6,zc:5.2,sq:0.72},{x:78.5,w:0.4,h:6.8,zc:5.5,sq:0.7}];
    G.add(new THREE.Mesh(M.loft(THREE,S,18),mH));
    bx(0.5,14.6,9.2,mH,-78.6,0,3.6);
    deck(S,0.96,0,8,DK-0.3,0.3);
    bx(1.5,16,0.8,mK,53,0,DK+0.4).rotation.y=-0.3;
    // H/PJ-38 130mm stealth mount
    cl(2.8,3,1.5,12,mH,60,0,DK+0.45,"z");
    var T=new THREE.Group();T.name="turret";T.position.set(60,0,DK+1.2);G.add(T);
    var tg=new THREE.Mesh(tb(8,4.6,3.2,0.42),mH);tg.position.set(-0.8,0,1.6);T.add(tg);
    var tn=new THREE.Mesh(tb(3.4,3.2,2.2,0.5),mH);tn.position.set(3.2,0,1.5);tn.rotation.y=0.12;T.add(tn);
    var bar=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.22,8.6,8).rotateZ(PI/2),mS);bar.position.set(7,0,1.5);T.add(bar);
    var slv=new THREE.Mesh(new THREE.CylinderGeometry(0.44,0.48,2.4,8).rotateZ(PI/2),mK);slv.position.set(3.9,0,1.5);T.add(slv);
    // 32 cells forward, 32 aft
    vls(44,0,DK,8,4,1.75);
    vls(-32,0,DK,8,4,1.75);
    // integrated deckhouse: sloped sides, four Type 346A AESA faces
    tbm(62,15,6,0.86,mH,6,0,DK+3);
    tbm(30,12.4,4.2,0.88,mH,20,0,DK+8.1);
    tbm(15,10.6,3.6,0.86,mH,28,0,DK+12);
    bx(0.35,8.8,1.6,mK,34.6,0,DK+12.8).rotation.y=-0.44;
    bx(6,0.35,1.4,mK,31,4.9,DK+12.7).rotation.x=0.3;
    bx(6,0.35,1.4,mK,31,-4.9,DK+12.7).rotation.x=-0.3;
    bx(3.2,15.6,0.4,mH,28,0,DK+13.9);
    spy(2.35,29.6,4.9,DK+9.3,0.6,-0.14);spy(2.35,29.6,-4.9,DK+9.3,-0.6,-0.14);
    spy(2.35,8.6,5.9,DK+9.2,2.36,-0.14);spy(2.35,8.6,-5.9,DK+9.2,-2.36,-0.14);
    bx(4.6,1.2,0.5,mT,-22,7.2,DK+5.9);bx(4.6,1.2,0.5,mT,-22,-7.2,DK+5.9);
    // enclosed mast, Type 518 array, satcom radomes
    tbm(7.6,7.6,9,0.42,mH,13,0,DK+13.5);
    cl(0.26,0.34,7,6,mS,13,0,DK+21.4,"z");
    cl(0.1,0.1,8.4,4,mS,13,0,DK+19.4,"x");
    bx(0.5,6,2.2,mS,13,0,DK+18.2).rotation.y=-0.3;
    var d1=new THREE.Mesh(new THREE.SphereGeometry(1.7,12,8),mW);d1.position.set(1,4.4,DK+9.6);G.add(d1);
    var d2=new THREE.Mesh(new THREE.SphereGeometry(1.7,12,8),mW);d2.position.set(1,-4.4,DK+9.6);G.add(d2);
    cl(1.5,1.6,0.9,10,mH,1,4.4,DK+8.4,"z");cl(1.5,1.6,0.9,10,mH,1,-4.4,DK+8.4,"z");
    dish(1.6,-2,0,DK+11.4,PI);cl(1.4,1.5,0.9,10,mH,-2,0,DK+10.3,"z");
    // single funnel with team band
    tbm(13,9.6,6.4,0.76,mH,-14,0,DK+6.2);
    bx(10,7.4,0.6,mK,-14,0,DK+9.6);
    cl(0.95,1,1.7,10,mK,-12.6,2.1,DK+10.3,"z");cl(0.95,1,1.7,10,mK,-15.4,-2.1,DK+10.3,"z");
    // hangar, flight deck, CIWS and HQ-10
    tbm(18,14.4,5.6,0.95,mH,-52,0,DK+2.8);
    bx(0.5,4.8,4.6,mK,-43.2,0,DK+2.3);
    bx(6.4,13.6,0.4,mH,-46,0,DK+5.8);
    ciws(-47,0,DK+6,1);hq10(-56,0,DK+5.8,0);
    ciws(38,0,DK+14.1,0);
    pad(-70,0,DK+0.12,15,15.2);
    bx(1,9,0.35,mW,-62.6,0,DK+0.16);
    function tt(y){var s=y>0?1:-1,i;for(i=0;i<3;i++)cl(0.3,0.3,6.2,8,mK,-24,y+s*i*0.7,DK+1.1+i*0.6,"x");}
    tt(7.4);tt(-7.4);
    boat(-8,8.1,DK+1.5,7.6);boat(-8,-8.1,DK+1.5,7.6);
    bx(1.6,1.6,1.4,mK,-38,7.2,DK+0.7);bx(1.6,1.6,1.4,mK,-38,-7.2,DK+0.7);
    // railings, staffs, hull number
    rl2(55,7,72,3,DK);rl2(-77,7.2,-64,8.6,DK);rl2(-62,8.8,-44,9.2,DK);
    rl(-28,6.8,-4,6.8,DK+6.1);rl(-28,-6.8,-4,-6.8,DK+6.1);
    rl(31,5.2,31,-5.2,DK+14.1);
    cl(0.07,0.07,4.2,5,mS,-77.6,0,DK+2.1,"z");cl(0.07,0.07,3.6,5,mS,77.5,0,DK+4.6,"z");
    bx(0.9,0.5,1,mK,72,2.6,DK-1);bx(0.9,0.5,1,mK,72,-2.6,DK-1);
    bnum("101",6.4,68,4.1,5.9,0.16);
    return G;
  }
};

UNIT_MODELS["destroyer_n"] = {
  len: 155,
  build: function (THREE, M, C) {
var G=new THREE.Group(),PI=Math.PI,R=Math.random;
    function NI(g){g=g.toNonIndexed();g.computeVertexNormals();return g;}
    function tb(lx,ly,lz,t){return NI(new THREE.CylinderGeometry(t,1,lz,4,1).rotateX(PI/2).rotateZ(PI/4).scale(lx*0.7071,ly*0.7071,1));}
    function cv(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    var hullT=cv(1024,256,function(x,w,h){var i;x.fillStyle="#6d7378";x.fillRect(0,0,w,h);for(i=0;i<46;i++){x.globalAlpha=0.055;x.fillStyle=i%2?"#5c6268":"#7e848a";x.fillRect(R()*w,R()*h,50+R()*170,14+R()*46);}x.globalAlpha=0.4;x.strokeStyle="#555b61";x.lineWidth=1;for(i=1;i<34;i++){x.beginPath();x.moveTo(i*w/34,0);x.lineTo(i*w/34,h);x.stroke();}for(i=1;i<10;i++){x.beginPath();x.moveTo(0,i*h/10);x.lineTo(w,i*h/10);x.stroke();}x.globalAlpha=1;x.fillStyle="#24282b";x.fillRect(0,0.17*h,w,0.15*h);x.globalAlpha=0.12;x.fillStyle="#3a2b20";for(i=0;i<44;i++)x.fillRect(R()*w,0.33*h+R()*0.28*h,2+R()*4,14+R()*66);x.globalAlpha=1;});
    var deckT=cv(512,512,function(x,w,h){var i;x.fillStyle="#4b5054";x.fillRect(0,0,w,h);for(i=0;i<44;i++){x.globalAlpha=0.06;x.fillStyle=i%2?"#41464a":"#585e63";x.fillRect(R()*w,R()*h,40+R()*130,24+R()*80);}x.globalAlpha=0.35;x.strokeStyle="#383c40";x.lineWidth=2;for(i=1;i<12;i++){x.beginPath();x.moveTo(0,i*h/12);x.lineTo(w,i*h/12);x.stroke();x.beginPath();x.moveTo(i*w/12,0);x.lineTo(i*w/12,h);x.stroke();}x.globalAlpha=0.45;x.fillStyle="#2b2f32";for(i=0;i<300;i++)x.fillRect(R()*w,R()*h,3,3);x.globalAlpha=1;});
    deckT.wrapS=deckT.wrapT=THREE.RepeatWrapping;deckT.repeat.set(0.075,0.075);
    var panT=cv(128,128,function(x,w,h){var i,j;x.fillStyle="#8d8f88";x.fillRect(0,0,w,h);x.fillStyle="rgba(0,0,0,0.3)";for(i=0;i<15;i++)for(j=0;j<15;j++)x.fillRect(i*8+3,j*8+3,4,4);x.strokeStyle="rgba(255,255,255,0.15)";x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);});
    var mH=new THREE.MeshStandardMaterial({map:hullT,metalness:0.3,roughness:0.6});
    var mD=new THREE.MeshStandardMaterial({map:deckT,metalness:0.25,roughness:0.72});
    var mK=new THREE.MeshStandardMaterial({color:0x23272b,metalness:0.35,roughness:0.55});
    var mW=new THREE.MeshStandardMaterial({color:0xc9ced2,metalness:0.2,roughness:0.6});
    var mS=new THREE.MeshStandardMaterial({color:0x8d9398,metalness:0.85,roughness:0.3});
    var mP=new THREE.MeshStandardMaterial({map:panT,metalness:0.3,roughness:0.6});
    var mT=new THREE.MeshStandardMaterial({color:C.team,metalness:0.3,roughness:0.55});
    function bx(lx,ly,lz,m,x,y,z){var s=new THREE.Mesh(new THREE.BoxGeometry(lx,ly,lz),m);s.position.set(x,y,z);G.add(s);return s;}
    function cl(rt,rb,l,sg,m,x,y,z,ax){var g=new THREE.CylinderGeometry(rt,rb,l,sg);if(ax=="z")g.rotateX(PI/2);if(ax=="x")g.rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);G.add(s);return s;}
    function tbm(lx,ly,lz,t,m,x,y,z){var s=new THREE.Mesh(tb(lx,ly,lz,t),m);s.position.set(x,y,z);G.add(s);return s;}
    var stG=new THREE.CylinderGeometry(0.045,0.045,1.15,4,1,true).rotateX(PI/2);
    function rl(x0,y0,x1,y1,z){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),n=Math.max(2,Math.round(L/2.6)),i,g0=new THREE.Group();g0.position.set((x0+x1)/2,(y0+y1)/2,z);g0.rotation.z=Math.atan2(dy,dx);G.add(g0);for(i=0;i<=n;i++){var s=new THREE.Mesh(stG,mW);s.position.set(-L/2+L*i/n,0,0.57);g0.add(s);}var rg=new THREE.CylinderGeometry(0.05,0.05,L,4,1,true).rotateZ(PI/2);for(i=0;i<2;i++){var b=new THREE.Mesh(rg,mW);b.position.set(0,0,0.62+i*0.5);g0.add(b);}return g0;}
    function rl2(x0,y0,x1,y1,z){rl(x0,y0,x1,y1,z);rl(x0,-y0,x1,-y1,z);}
    function bnum(s,wd,x,y,z,tl){var t=cv(256,128,function(c,w,h){c.font="bold 92px Arial";c.fillStyle="#dfe3e6";c.textAlign="center";c.fillText(s,w/2,100);});var mm=new THREE.MeshStandardMaterial({map:t,transparent:true,metalness:0.2,roughness:0.6});var g=new THREE.PlaneGeometry(wd,wd/2);g.rotateX(PI/2);var a=new THREE.Mesh(g,mm);a.position.set(x,-y,z);a.rotation.x=-tl;G.add(a);var g2=new THREE.PlaneGeometry(wd,wd/2);g2.rotateY(PI);g2.rotateX(PI/2);var b=new THREE.Mesh(g2,mm);b.position.set(x,y,z);b.rotation.x=tl;G.add(b);}
    function pl(S,k,n0,n1){var p=[],i;for(i=n0;i<=n1;i++)p.push([S[i].x,S[i].w*k]);for(i=n1;i>=n0;i--)p.push([S[i].x,-S[i].w*k]);return p;}
    function deck(S,k,n0,n1,z,th){var d=new THREE.Mesh(M.slab(THREE,pl(S,k,n0,n1),th||0.3),mD);d.position.z=z;G.add(d);return d;}
    function vls(x,y,z,nx,ny,c){var lx=nx*c,ly=ny*c;bx(lx+0.9,ly+0.9,0.55,mK,x,y,z+0.2);var t=cv(256,256,function(g,w,h){var i,j,cw=w/nx,ch=h/ny;g.fillStyle="#3e4347";g.fillRect(0,0,w,h);for(i=0;i<nx;i++)for(j=0;j<ny;j++){var px=i*cw,py=j*ch;g.fillStyle="#15181a";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.82);g.fillStyle="#6c7378";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.1);g.fillStyle="rgba(255,255,255,0.13)";g.fillRect(px+cw*0.4,py+ch*0.14,cw*0.2,ch*0.7);}});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.4,roughness:0.5}));p.position.set(x,y,z+0.48);G.add(p);}
    function oct(r,m,x,y,z,yaw,pit){var g=new THREE.CylinderGeometry(r,r,0.34,8).rotateY(PI/8).rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);s.rotation.z=yaw;s.rotation.y=pit||0;G.add(s);return s;}
    function spy(r,x,y,z,yaw,pit){oct(r+0.42,mK,x,y,z,yaw,pit);oct(r,mP,x+Math.cos(yaw)*0.2,y+Math.sin(yaw)*0.2,z,yaw,pit);}
    function pad(x,y,z,lx,ly){var t=cv(256,256,function(g,w,h){var i;g.fillStyle="#41464a";g.fillRect(0,0,w,h);for(i=0;i<26;i++){g.globalAlpha=0.07;g.fillStyle=i%2?"#34383c":"#4d5257";g.fillRect(R()*w,R()*h,40+R()*90,30+R()*70);}g.globalAlpha=0.3;g.strokeStyle="#2c3033";g.lineWidth=2;for(i=1;i<8;i++){g.beginPath();g.moveTo(0,i*h/8);g.lineTo(w,i*h/8);g.stroke();}g.globalAlpha=1;g.strokeStyle="#d5d9dd";g.lineWidth=8;g.beginPath();g.arc(w/2,h/2,w*0.29,0,7);g.stroke();g.save();g.translate(w/2,h/2);g.rotate(PI/2);g.fillStyle="#d5d9dd";g.font="bold 118px Arial";g.textAlign="center";g.fillText("H",0,42);g.restore();});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.2,roughness:0.8}));p.position.set(x,y,z);G.add(p);return p;}
    function boat(x,y,z,L){var s=y>0?1:-1;var b=new THREE.Mesh(tb(L,L*0.33,L*0.2,0.62),mK);b.position.set(x,y,z);G.add(b);bx(L*0.2,L*0.2,L*0.11,mW,x-L*0.13,y,z+L*0.15);cl(0.09,0.09,2.9,5,mS,x+L*0.34,y-s*0.5,z+1.5,"z");cl(0.09,0.09,2.9,5,mS,x-L*0.34,y-s*0.5,z+1.5,"z");cl(0.08,0.08,1.7,5,mS,x+L*0.34,y-s*0.05,z+2.85);cl(0.08,0.08,1.7,5,mS,x-L*0.34,y-s*0.05,z+2.85);}
    function dish(r,x,y,z,yaw){var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,6,0,PI*2,0,PI*0.42).rotateZ(PI/2),mW);d.position.set(x,y,z);d.rotation.z=yaw||0;G.add(d);cl(0.09,0.09,r*0.8,5,mK,x-Math.cos(yaw||0)*r*0.4,y-Math.sin(yaw||0)*r*0.4,z,"x");return d;}
    function light(x,y,z){cl(0.06,0.06,0.9,5,mS,x,y,z,"z");bx(0.35,0.5,0.45,mW,x,y,z+0.6);}
    var DK=7.6;
    function ciws(x,y,z,ry){cl(1.0,1.15,1.6,10,mW,x,y,z+0.8,"z");var d=new THREE.Mesh(new THREE.SphereGeometry(1.05,10,7),mW);d.position.set(x,y,z+2.15);G.add(d);var b=cl(0.3,0.34,2.4,8,mK,x+1.5,y,z+1.7,"x");b.rotation.y=-0.25;if(ry)b.rotation.z=ry;}
    // flared-bow hull, keel -1.0, sheer rising from 7.6 to 11.6 at the stem
    var S=[{x:-77.5,w:7.6,h:4.3,zc:3.3,sq:0.93},{x:-68,w:9.1,h:4.4,zc:3.2,sq:0.92},{x:-50,w:9.8,h:4.5,zc:3.1,sq:0.9},{x:-20,w:10,h:4.6,zc:3,sq:0.9},{x:10,w:9.9,h:4.6,zc:3,sq:0.9},{x:35,w:9.2,h:4.7,zc:3.2,sq:0.88},{x:52,w:7.7,h:5,zc:3.6,sq:0.84},{x:64,w:5.3,h:5.6,zc:4.3,sq:0.78},{x:72,w:2.8,h:6.1,zc:5,sq:0.72},{x:77.5,w:0.5,h:6.3,zc:5.3,sq:0.7}];
    G.add(new THREE.Mesh(M.loft(THREE,S,18),mH));
    bx(0.5,15.3,8.8,mH,-77.6,0,3.3);
    deck(S,0.965,0,8,DK-0.3,0.3);
    bx(1.6,17,0.7,mK,49,0,DK+0.35).rotation.y=-0.28;
    // Mk45 5in mount on a raised barbette, forward of the VLS
    cl(2.7,2.9,1.7,12,mH,58,0,DK+0.55,"z");
    var T=new THREE.Group();T.name="turret";T.position.set(58,0,DK+1.4);G.add(T);
    var tg=new THREE.Mesh(tb(7.4,4.5,2.9,0.5),mH);tg.position.set(-0.3,0,1.45);T.add(tg);
    var tsl=new THREE.Mesh(new THREE.BoxGeometry(2.6,3.9,0.25),mH);tsl.position.set(2.9,0,2.05);tsl.rotation.y=0.5;T.add(tsl);
    var bar=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.21,7.4,8).rotateZ(PI/2),mS);bar.position.set(5.4,0,1.5);T.add(bar);
    var slv=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.46,2,8).rotateZ(PI/2),mK);slv.position.set(2.7,0,1.5);T.add(slv);
    // 32-cell forward VLS and 64-cell aft VLS
    vls(44,0,DK,8,4,1.55);
    vls(-40,0,DK,8,8,1.5);
    // angular deckhouse: 01 deck, 02 deck, pilot house
    tbm(64,15.4,5.6,0.93,mH,2,0,DK+2.8);
    tbm(38,13.4,3.4,0.93,mH,8,0,DK+7.3);
    tbm(14,11.4,3.3,0.88,mH,25,0,DK+10.6);
    bx(0.35,9.8,1.5,mK,32.2,0,DK+11.4).rotation.y=-0.42;
    bx(6,0.35,1.4,mK,29,5.5,DK+11.3).rotation.x=0.3;
    bx(6,0.35,1.4,mK,29,-5.5,DK+11.3).rotation.x=-0.3;
    bx(3.2,17.6,0.4,mH,25,0,DK+12.5);
    bx(5,1.2,0.5,mT,-30,7.5,DK+5.4);bx(5,1.2,0.5,mT,-30,-7.5,DK+5.4);
    // four SPY-1D phased-array octagons
    spy(1.95,30.4,5.4,DK+8.6,0.62,-0.13);spy(1.95,30.4,-5.4,DK+8.6,-0.62,-0.13);
    spy(1.95,19.5,6.0,DK+8.5,2.3,-0.13);spy(1.95,19.5,-6.0,DK+8.5,-2.3,-0.13);
    // twin funnels with capped uptakes
    function fun(x){tbm(9,7.4,6,0.8,mH,x,0,DK+8.2).rotation.y=0.05;bx(8.2,6.6,0.5,mK,x,0,DK+11.4);cl(0.75,0.8,1.6,8,mK,x+1.4,2,DK+12,"z");cl(0.75,0.8,1.6,8,mK,x-1.4,-2,DK+12,"z");}
    fun(6);fun(-14);
    // mast: tripod legs, yards, SPS-67 bar, illuminators
    cl(0.34,0.44,10,6,mS,18,0,DK+13.6,"z");
    cl(0.24,0.3,7.4,6,mS,6,2.6,DK+11.5,"z").rotation.y=-0.14;
    cl(0.24,0.3,7.4,6,mS,6,-2.6,DK+11.5,"z").rotation.y=-0.14;
    bx(3.4,7,0.3,mH,9,0,DK+15.4);
    cl(0.1,0.1,9.4,4,mS,10,0,DK+16.6,"x");
    cl(0.1,0.1,6,4,mS,10,0,DK+20.2,"x");
    cl(0.16,0.2,4.6,6,mS,10,0,DK+20.6,"z");
    bx(0.5,4.4,0.9,mW,10,0,DK+23.2);
    cl(0.05,0.05,4,4,mS,7,3.4,DK+17.6,"z");cl(0.05,0.05,4,4,mS,7,-3.4,DK+17.6,"z");
    dish(1.5,25,0,DK+14.6,0);dish(1.5,-33,3.6,DK+12.8,PI);dish(1.5,-33,-3.6,DK+12.8,PI);
    cl(1.5,1.6,0.8,10,mH,25,0,DK+13.7,"z");cl(1.5,1.6,0.8,10,mH,-33,3.6,DK+11.9,"z");cl(1.5,1.6,0.8,10,mH,-33,-3.6,DK+11.9,"z");
    // twin hangar, flight deck, CIWS, Mk32 torpedo tubes
    tbm(17,14,5.4,0.95,mH,-55,0,DK+2.7);
    bx(0.5,4.6,4.4,mK,-46.4,3.6,DK+2.2);bx(0.5,4.6,4.4,mK,-46.4,-3.6,DK+2.2);
    bx(6,13.4,0.4,mH,-49,0,DK+5.6);
    ciws(-50,0,DK+5.8,0);ciws(35,0,DK+12.7,0);
    pad(-70,0,DK+0.12,15,15.6);
    bx(1,9,0.35,mW,-63.4,0,DK+0.16);
    function tt(y){var s=y>0?1:-1,i;for(i=0;i<3;i++)cl(0.32,0.32,6.4,8,mK,-30,y+s*i*0.72,DK+1.1+i*0.62,"x");}
    tt(7.6);tt(-7.6);
    boat(-17,8.6,DK+1.4,7.8);boat(-17,-8.6,DK+1.4,7.8);
    // railings, staffs, hull number
    rl2(53,7.5,70,3.4,DK);rl2(-77,7.4,-63,8.9,DK);rl2(-62,8.8,-46,9.5,DK);
    rl2(-6,7.4,-6,7.4,DK+5.7);rl(-24,6.6,26,6.6,DK+5.7);rl(-24,-6.6,26,-6.6,DK+5.7);
    rl(29,5.6,29,-5.6,DK+12.7);
    cl(0.07,0.07,4,5,mS,-77,0,DK+2,"z");cl(0.07,0.07,3.4,5,mS,76,0,DK+4,"z");
    bx(0.9,0.5,1,mK,71.5,2.9,DK-0.9);bx(0.9,0.5,1,mK,71.5,-2.9,DK-0.9);
    bnum("62",6,67.5,4.3,5.4,0.16);
    return G;
  }
};

UNIT_MODELS["destroyer_p"] = {
  len: 156,
  build: function (THREE, M, C) {
var G=new THREE.Group(),PI=Math.PI,R=Math.random;
    function NI(g){g=g.toNonIndexed();g.computeVertexNormals();return g;}
    function tb(lx,ly,lz,t){return NI(new THREE.CylinderGeometry(t,1,lz,4,1).rotateX(PI/2).rotateZ(PI/4).scale(lx*0.7071,ly*0.7071,1));}
    function cv(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    var hullT=cv(1024,256,function(x,w,h){var i;x.fillStyle="#6d7378";x.fillRect(0,0,w,h);for(i=0;i<46;i++){x.globalAlpha=0.055;x.fillStyle=i%2?"#5c6268":"#7e848a";x.fillRect(R()*w,R()*h,50+R()*170,14+R()*46);}x.globalAlpha=0.4;x.strokeStyle="#555b61";x.lineWidth=1;for(i=1;i<34;i++){x.beginPath();x.moveTo(i*w/34,0);x.lineTo(i*w/34,h);x.stroke();}for(i=1;i<10;i++){x.beginPath();x.moveTo(0,i*h/10);x.lineTo(w,i*h/10);x.stroke();}x.globalAlpha=1;x.fillStyle="#24282b";x.fillRect(0,0.17*h,w,0.15*h);x.globalAlpha=0.12;x.fillStyle="#3a2b20";for(i=0;i<44;i++)x.fillRect(R()*w,0.33*h+R()*0.28*h,2+R()*4,14+R()*66);x.globalAlpha=1;});
    var deckT=cv(512,512,function(x,w,h){var i;x.fillStyle="#4b5054";x.fillRect(0,0,w,h);for(i=0;i<44;i++){x.globalAlpha=0.06;x.fillStyle=i%2?"#41464a":"#585e63";x.fillRect(R()*w,R()*h,40+R()*130,24+R()*80);}x.globalAlpha=0.35;x.strokeStyle="#383c40";x.lineWidth=2;for(i=1;i<12;i++){x.beginPath();x.moveTo(0,i*h/12);x.lineTo(w,i*h/12);x.stroke();x.beginPath();x.moveTo(i*w/12,0);x.lineTo(i*w/12,h);x.stroke();}x.globalAlpha=0.45;x.fillStyle="#2b2f32";for(i=0;i<300;i++)x.fillRect(R()*w,R()*h,3,3);x.globalAlpha=1;});
    deckT.wrapS=deckT.wrapT=THREE.RepeatWrapping;deckT.repeat.set(0.075,0.075);
    var panT=cv(128,128,function(x,w,h){var i,j;x.fillStyle="#8d8f88";x.fillRect(0,0,w,h);x.fillStyle="rgba(0,0,0,0.3)";for(i=0;i<15;i++)for(j=0;j<15;j++)x.fillRect(i*8+3,j*8+3,4,4);x.strokeStyle="rgba(255,255,255,0.15)";x.lineWidth=3;x.strokeRect(2,2,w-4,h-4);});
    var mH=new THREE.MeshStandardMaterial({map:hullT,metalness:0.3,roughness:0.6});
    var mD=new THREE.MeshStandardMaterial({map:deckT,metalness:0.25,roughness:0.72});
    var mK=new THREE.MeshStandardMaterial({color:0x23272b,metalness:0.35,roughness:0.55});
    var mW=new THREE.MeshStandardMaterial({color:0xc9ced2,metalness:0.2,roughness:0.6});
    var mS=new THREE.MeshStandardMaterial({color:0x8d9398,metalness:0.85,roughness:0.3});
    var mP=new THREE.MeshStandardMaterial({map:panT,metalness:0.3,roughness:0.6});
    var mT=new THREE.MeshStandardMaterial({color:C.team,metalness:0.3,roughness:0.55});
    function bx(lx,ly,lz,m,x,y,z){var s=new THREE.Mesh(new THREE.BoxGeometry(lx,ly,lz),m);s.position.set(x,y,z);G.add(s);return s;}
    function cl(rt,rb,l,sg,m,x,y,z,ax){var g=new THREE.CylinderGeometry(rt,rb,l,sg);if(ax=="z")g.rotateX(PI/2);if(ax=="x")g.rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);G.add(s);return s;}
    function tbm(lx,ly,lz,t,m,x,y,z){var s=new THREE.Mesh(tb(lx,ly,lz,t),m);s.position.set(x,y,z);G.add(s);return s;}
    var stG=new THREE.CylinderGeometry(0.045,0.045,1.15,4,1,true).rotateX(PI/2);
    function rl(x0,y0,x1,y1,z){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),n=Math.max(2,Math.round(L/2.6)),i,g0=new THREE.Group();g0.position.set((x0+x1)/2,(y0+y1)/2,z);g0.rotation.z=Math.atan2(dy,dx);G.add(g0);for(i=0;i<=n;i++){var s=new THREE.Mesh(stG,mW);s.position.set(-L/2+L*i/n,0,0.57);g0.add(s);}var rg=new THREE.CylinderGeometry(0.05,0.05,L,4,1,true).rotateZ(PI/2);for(i=0;i<2;i++){var b=new THREE.Mesh(rg,mW);b.position.set(0,0,0.62+i*0.5);g0.add(b);}return g0;}
    function rl2(x0,y0,x1,y1,z){rl(x0,y0,x1,y1,z);rl(x0,-y0,x1,-y1,z);}
    function bnum(s,wd,x,y,z,tl){var t=cv(256,128,function(c,w,h){c.font="bold 92px Arial";c.fillStyle="#dfe3e6";c.textAlign="center";c.fillText(s,w/2,100);});var mm=new THREE.MeshStandardMaterial({map:t,transparent:true,metalness:0.2,roughness:0.6});var g=new THREE.PlaneGeometry(wd,wd/2);g.rotateX(PI/2);var a=new THREE.Mesh(g,mm);a.position.set(x,-y,z);a.rotation.x=-tl;G.add(a);var g2=new THREE.PlaneGeometry(wd,wd/2);g2.rotateY(PI);g2.rotateX(PI/2);var b=new THREE.Mesh(g2,mm);b.position.set(x,y,z);b.rotation.x=tl;G.add(b);}
    function pl(S,k,n0,n1){var p=[],i;for(i=n0;i<=n1;i++)p.push([S[i].x,S[i].w*k]);for(i=n1;i>=n0;i--)p.push([S[i].x,-S[i].w*k]);return p;}
    function deck(S,k,n0,n1,z,th){var d=new THREE.Mesh(M.slab(THREE,pl(S,k,n0,n1),th||0.3),mD);d.position.z=z;G.add(d);return d;}
    function vls(x,y,z,nx,ny,c){var lx=nx*c,ly=ny*c;bx(lx+0.9,ly+0.9,0.55,mK,x,y,z+0.2);var t=cv(256,256,function(g,w,h){var i,j,cw=w/nx,ch=h/ny;g.fillStyle="#3e4347";g.fillRect(0,0,w,h);for(i=0;i<nx;i++)for(j=0;j<ny;j++){var px=i*cw,py=j*ch;g.fillStyle="#15181a";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.82);g.fillStyle="#6c7378";g.fillRect(px+cw*0.09,py+ch*0.09,cw*0.82,ch*0.1);g.fillStyle="rgba(255,255,255,0.13)";g.fillRect(px+cw*0.4,py+ch*0.14,cw*0.2,ch*0.7);}});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.4,roughness:0.5}));p.position.set(x,y,z+0.48);G.add(p);}
    function oct(r,m,x,y,z,yaw,pit){var g=new THREE.CylinderGeometry(r,r,0.34,8).rotateY(PI/8).rotateZ(PI/2);var s=new THREE.Mesh(g,m);s.position.set(x,y,z);s.rotation.z=yaw;s.rotation.y=pit||0;G.add(s);return s;}
    function spy(r,x,y,z,yaw,pit){oct(r+0.42,mK,x,y,z,yaw,pit);oct(r,mP,x+Math.cos(yaw)*0.2,y+Math.sin(yaw)*0.2,z,yaw,pit);}
    function pad(x,y,z,lx,ly){var t=cv(256,256,function(g,w,h){var i;g.fillStyle="#41464a";g.fillRect(0,0,w,h);for(i=0;i<26;i++){g.globalAlpha=0.07;g.fillStyle=i%2?"#34383c":"#4d5257";g.fillRect(R()*w,R()*h,40+R()*90,30+R()*70);}g.globalAlpha=0.3;g.strokeStyle="#2c3033";g.lineWidth=2;for(i=1;i<8;i++){g.beginPath();g.moveTo(0,i*h/8);g.lineTo(w,i*h/8);g.stroke();}g.globalAlpha=1;g.strokeStyle="#d5d9dd";g.lineWidth=8;g.beginPath();g.arc(w/2,h/2,w*0.29,0,7);g.stroke();g.save();g.translate(w/2,h/2);g.rotate(PI/2);g.fillStyle="#d5d9dd";g.font="bold 118px Arial";g.textAlign="center";g.fillText("H",0,42);g.restore();});var p=new THREE.Mesh(new THREE.PlaneGeometry(lx,ly),new THREE.MeshStandardMaterial({map:t,metalness:0.2,roughness:0.8}));p.position.set(x,y,z);G.add(p);return p;}
    function boat(x,y,z,L){var s=y>0?1:-1;var b=new THREE.Mesh(tb(L,L*0.33,L*0.2,0.62),mK);b.position.set(x,y,z);G.add(b);bx(L*0.2,L*0.2,L*0.11,mW,x-L*0.13,y,z+L*0.15);cl(0.09,0.09,2.9,5,mS,x+L*0.34,y-s*0.5,z+1.5,"z");cl(0.09,0.09,2.9,5,mS,x-L*0.34,y-s*0.5,z+1.5,"z");cl(0.08,0.08,1.7,5,mS,x+L*0.34,y-s*0.05,z+2.85);cl(0.08,0.08,1.7,5,mS,x-L*0.34,y-s*0.05,z+2.85);}
    function dish(r,x,y,z,yaw){var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,6,0,PI*2,0,PI*0.42).rotateZ(PI/2),mW);d.position.set(x,y,z);d.rotation.z=yaw||0;G.add(d);cl(0.09,0.09,r*0.8,5,mK,x-Math.cos(yaw||0)*r*0.4,y-Math.sin(yaw||0)*r*0.4,z,"x");return d;}
    function light(x,y,z){cl(0.06,0.06,0.9,5,mS,x,y,z,"z");bx(0.35,0.5,0.45,mW,x,y,z+0.6);}
    var DK=8;
    function seg(a,b,c,d,e,f,r,m){var dx=d-a,dy=e-b,dz=f-c,L=Math.sqrt(dx*dx+dy*dy+dz*dz);var s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,L,4,1,true),m||mS);s.position.set((a+d)/2,(b+e)/2,(c+f)/2);s.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(dx/L,dy/L,dz/L));G.add(s);return s;}
    function tower(x,z0,z1,w0,w1,n){var i,j,cs=[[1,1],[1,-1],[-1,-1],[-1,1]];for(i=0;i<4;i++)seg(x+cs[i][0]*w0,cs[i][1]*w0,z0,x+cs[i][0]*w1,cs[i][1]*w1,z1,0.15);for(j=0;j<=n;j++){var t=j/n,w=w0+(w1-w0)*t,z=z0+(z1-z0)*t,w2=w0+(w1-w0)*(t+1/n),z2=z0+(z1-z0)*(t+1/n);for(i=0;i<4;i++){var a=cs[i],b=cs[(i+1)%4];seg(x+a[0]*w,a[1]*w,z,x+b[0]*w,b[1]*w,z,0.09);if(j<n)seg(x+a[0]*w,a[1]*w,z,x+b[0]*w2,b[1]*w2,z2,0.075);}}}
    function ak130(px,pz,nm){var T=new THREE.Group();T.position.set(px,0,pz);G.add(T);if(nm)T.name="turret";var b=new THREE.Mesh(tb(8.4,5.4,3.1,0.62),mH);b.position.set(-0.6,0,1.55);T.add(b);var f=new THREE.Mesh(new THREE.CylinderGeometry(2.7,2.7,5.2,10,1,true).rotateX(PI/2).rotateZ(PI/2).scale(1,1,0.55),mH);f.position.set(2.4,0,1.7);T.add(f);var i;for(i=0;i<2;i++){var g=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.19,8.2,8).rotateZ(PI/2),mS);g.position.set(6.6,i?0.7:-0.7,1.55);T.add(g);var sl=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.45,2.2,8).rotateZ(PI/2),mK);sl.position.set(3.4,i?0.7:-0.7,1.55);T.add(sl);}return T;}
    function sanz(x,z,ry){cl(1.9,2.1,1.4,12,mH,x,0,z+0.7,"z");var a=new THREE.Group();a.position.set(x,0,z+1.6);a.rotation.y=-0.5;a.rotation.z=ry||0;G.add(a);var r=new THREE.Mesh(new THREE.BoxGeometry(4.2,1.4,0.5),mK);r.position.set(1.4,0,0);a.add(r);var ms=new THREE.Mesh(new THREE.CylinderGeometry(0.26,0.26,5,8).rotateZ(PI/2),mW);ms.position.set(1.8,0,0.5);a.add(ms);var nc=new THREE.Mesh(new THREE.ConeGeometry(0.26,0.9,8).rotateZ(-PI/2),mW);nc.position.set(4.7,0,0.5);a.add(nc);var fn=new THREE.Mesh(new THREE.BoxGeometry(1.1,1.6,0.1),mW);fn.position.set(-0.2,0,0.5);a.add(fn);}
    function ak630(x,y,z){cl(0.85,0.95,1.2,10,mW,x,y,z+0.6,"z");var d=new THREE.Mesh(new THREE.SphereGeometry(0.95,10,7),mW);d.position.set(x,y,z+1.6);G.add(d);cl(0.26,0.28,1.9,8,mK,x+1.2,y,z+1.4,"x");}
    // flush-deck hull with strong sheer forward, keel -1.0
    var S=[{x:-78,w:6.6,h:4.5,zc:3.5,sq:0.93},{x:-70,w:8,h:4.6,zc:3.4,sq:0.92},{x:-52,w:8.6,h:4.7,zc:3.3,sq:0.9},{x:-20,w:8.65,h:4.8,zc:3.2,sq:0.9},{x:8,w:8.5,h:4.8,zc:3.2,sq:0.9},{x:34,w:8,h:5,zc:3.4,sq:0.87},{x:52,w:6.9,h:5.5,zc:3.9,sq:0.83},{x:66,w:4.6,h:6.2,zc:4.6,sq:0.77},{x:74,w:2.2,h:6.6,zc:5.1,sq:0.72},{x:78,w:0.4,h:6.8,zc:5.4,sq:0.7}];
    G.add(new THREE.Mesh(M.loft(THREE,S,18),mH));
    bx(0.5,13.2,9,mH,-78.1,0,3.5);
    deck(S,0.965,0,8,DK-0.3,0.3);
    bx(1.4,15,0.8,mK,54,0,DK+0.4).rotation.y=-0.3;
    // AK-130 twin 130mm fore (trainable) and aft (baked)
    cl(2.9,3.1,1.6,12,mH,62,0,DK+0.5,"z");
    ak130(62,DK+1.3,1);
    cl(2.9,3.1,1.6,12,mH,-62,0,DK+0.5,"z");
    ak130(-62,DK+1.3,0).rotation.z=PI;
    // SA-N-7 single-arm SAM launchers fore and aft
    tbm(11,11,2.6,0.9,mH,46,0,DK+1.3);
    sanz(46,DK+2.6,0);
    tbm(10,10,2.4,0.9,mH,-48,0,DK+1.2);
    sanz(-48,DK+2.4,PI);
    // superstructure and bridge
    tbm(46,14,5.4,0.93,mH,10,0,DK+2.7);
    tbm(22,12.2,3.6,0.92,mH,26,0,DK+7.2);
    tbm(12,10.4,3.4,0.9,mH,30,0,DK+10.7);
    bx(0.35,9,1.5,mK,35.6,0,DK+11.5).rotation.y=-0.4;
    bx(5,0.35,1.3,mK,32,5,DK+11.4).rotation.x=0.28;
    bx(5,0.35,1.3,mK,32,-5,DK+11.4).rotation.x=-0.28;
    bx(3,15.4,0.4,mH,30,0,DK+12.6);
    bx(4.4,1.1,0.5,mT,-8,7,DK+5.3);bx(4.4,1.1,0.5,mT,-8,-7,DK+5.3);
    // four KT-190 SSM tubes flanking the bridge, trained 15 deg up and outboard
    function kt(y,x){var s=y>0?1:-1,tu=new THREE.Group();tu.position.set(x,y,DK+6.6);tu.rotation.z=s*0.14;tu.rotation.y=-0.26;G.add(tu);var c1=new THREE.Mesh(new THREE.CylinderGeometry(0.92,0.92,11.5,12).rotateZ(PI/2),mH);tu.add(c1);var cp=new THREE.Mesh(new THREE.CylinderGeometry(0.98,0.98,0.5,12).rotateZ(PI/2),mK);cp.position.set(5.9,0,0);tu.add(cp);var bd=new THREE.Mesh(new THREE.BoxGeometry(1.4,2.1,2.1),mK);bd.position.set(-4.6,0,0);tu.add(bd);var i;for(i=0;i<2;i++)cl(0.13,0.13,2.1,5,mS,x-2+i*4,y+s*0.1,DK+5.6,"z");}
    kt(7.2,20);kt(7.2,10.6);kt(-7.2,20);kt(-7.2,10.6);
    // huge lattice mainmast with yards, Top Plate and Top Steer arrays
    tower(6,DK+5.4,DK+18,2.6,1.3,4);
    bx(4.6,5,0.4,mH,6,0,DK+18.2);
    cl(0.2,0.26,7,6,mS,6,0,DK+21.8,"z");
    cl(0.1,0.1,11,4,mS,6,0,DK+12.6,"x");
    cl(0.1,0.1,7.6,4,mS,6,0,DK+16.4,"x");
    seg(6,5.5,DK+12.6,6,2,DK+16.4,0.06);seg(6,-5.5,DK+12.6,6,-2,DK+16.4,0.06);
    var tp=new THREE.Mesh(new THREE.BoxGeometry(0.55,7.4,2.5),mS);tp.position.set(6,0,DK+19.8);tp.rotation.y=-0.32;G.add(tp);
    var ts=new THREE.Mesh(new THREE.BoxGeometry(0.5,5.4,2.1),mS);ts.position.set(24,0,DK+15.4);ts.rotation.y=-0.3;G.add(ts);
    tower(24,DK+10.8,DK+14.4,1.7,1.1,2);
    cl(0.05,0.05,5,4,mS,2,4.4,DK+9.4,"z");cl(0.05,0.05,5,4,mS,2,-4.4,DK+9.4,"z");
    // Front Dome / Kite Screech fire-control radomes
    function dome(x,y,z,r){cl(r*0.8,r*0.9,1,10,mH,x,y,z+0.5,"z");var d=new THREE.Mesh(new THREE.SphereGeometry(r,12,8),mW);d.position.set(x,y,z+1.5);d.scale.set(1,1,0.85);G.add(d);}
    dome(37,0,DK+14.1,2.2);dome(14,6.2,DK+5.6,1.5);dome(14,-6.2,DK+5.6,1.5);dome(-26,0,DK+7.4,1.7);dome(-58,0,DK+3.4,2);
    // single broad raked funnel
    var fu=new THREE.Mesh(tb(12,10.6,7.4,0.72),mH);fu.position.set(-11,0,DK+6.6);fu.rotation.y=0.08;G.add(fu);
    bx(9.4,8,0.6,mK,-11.6,0,DK+10.5);
    cl(1,1.1,1.8,10,mK,-10.6,2.4,DK+11.2,"z");cl(1,1.1,1.8,10,mK,-12.6,-2.4,DK+11.2,"z");
    bx(6,9.6,0.5,mT,-11.4,0,DK+8.6);
    // aft deckhouse, telescopic hangar and helipad
    tbm(16,12.6,4.4,0.94,mH,-30,0,DK+2.2);
    bx(9,10.6,3.6,mK,-33,0,DK+2.2);
    pad(-44,0,DK+0.12,13,12.4);
    ak630(20,7.9,DK+5.6);ak630(20,-7.9,DK+5.6);ak630(-24,6.6,DK+4.5);ak630(-24,-6.6,DK+4.5);
    boat(-2,8.1,DK+1.4,7.4);boat(-2,-8.1,DK+1.4,7.4);
    function tt(y){var s=y>0?1:-1,i;for(i=0;i<2;i++)cl(0.36,0.36,7.4,8,mK,2,y+s*i*0.8,DK+1.2+i*0.7,"x");}
    tt(7.8);tt(-7.8);
    // railings, staffs, hull number
    rl2(56,6.6,72,2.9,DK);rl2(-76,6.4,-56,8.3,DK);rl2(-52,8.5,-38,8.6,DK);
    rl(-30,6.6,-14,6.6,DK+5.5);rl(-30,-6.6,-14,-6.6,DK+5.5);
    rl(32,5,32,-5,DK+12.8);
    cl(0.07,0.07,4.2,5,mS,-77,0,DK+2.1,"z");cl(0.07,0.07,3.6,5,mS,77,0,DK+4.4,"z");
    bx(0.9,0.5,1,mK,72,2.4,DK-1);bx(0.9,0.5,1,mK,72,-2.4,DK-1);
    bnum("678",6.4,68,3.9,5.8,0.16);
    return G;
  }
};

BLD_MODELS["factory"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var SD = 77431, i, j, s, a;
    function rn() { SD = (SD * 16807) % 2147483647; return (SD % 10000) / 10000; }
    function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
    function tex(c, rx, ry) {
      var t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (rx) t.repeat.set(rx, ry);
      return t;
    }
    function patches(x, w, h, n, lt, dk) {
      for (var q = 0; q < n; q++) {
        x.globalAlpha = 0.04 + rn() * 0.04;
        x.fillStyle = (q % 3 === 0) ? lt : dk;
        x.fillRect(rn() * w, rn() * h, w * 0.05 + rn() * w * 0.24, h * 0.04 + rn() * h * 0.2);
      }
      x.globalAlpha = 1;
    }
    function seams(x, w, h, cols, rows, col) {
      x.globalAlpha = 0.5; x.strokeStyle = col || "#20241e"; x.lineWidth = 2; x.beginPath();
      for (var q = 1; q < cols; q++) { x.moveTo(q * w / cols, 0); x.lineTo(q * w / cols, h); }
      for (q = 1; q < rows; q++) { x.moveTo(0, q * h / rows); x.lineTo(w, q * h / rows); }
      x.stroke(); x.globalAlpha = 1;
    }
    function drips(x, w, h, n, col) {
      x.fillStyle = col || "#15180f";
      for (var q = 0; q < n; q++) {
        x.globalAlpha = 0.05 + rn() * 0.09;
        x.fillRect(rn() * w, rn() * h * 0.5, 1 + rn() * 4, h * 0.08 + rn() * h * 0.3);
      }
      x.globalAlpha = 1;
    }
    function hazard(x, px, py, pw, ph, step) {
      x.save(); x.beginPath(); x.rect(px, py, pw, ph); x.clip();
      x.globalAlpha = 0.94; x.fillStyle = "#c9a825"; x.fillRect(px, py, pw, ph);
      x.fillStyle = "#191a16";
      for (var q = -2; q < (pw + ph) / step + 2; q++) {
        var bx = px + q * step;
        x.beginPath();
        x.moveTo(bx, py); x.lineTo(bx + step * 0.5, py);
        x.lineTo(bx + step * 0.5 + ph, py + ph); x.lineTo(bx + ph, py + ph);
        x.closePath(); x.fill();
      }
      x.globalAlpha = 1; x.restore();
    }

    /* ---------------- textures ---------------- */
    var ac = cvs(512, 512), ax = ac.getContext("2d");
    ax.fillStyle = "#565b54"; ax.fillRect(0, 0, 512, 512);
    patches(ax, 512, 512, 44, "#7f8479", "#31352e");
    ax.globalAlpha = 0.38; ax.strokeStyle = "#2b2e28"; ax.lineWidth = 3; ax.beginPath();
    for (i = 1; i < 8; i++) { ax.moveTo(i * 64, 0); ax.lineTo(i * 64, 512); ax.moveTo(0, i * 64); ax.lineTo(512, i * 64); }
    ax.stroke(); ax.globalAlpha = 1;
    /* exit lane and hazard aprons */
    ax.globalAlpha = 0.75; ax.fillStyle = "#cdc9b4";
    ax.fillRect(300, 180, 200, 6); ax.fillRect(300, 320, 200, 6);
    for (i = 0; i < 7; i++) ax.fillRect(310 + i * 28, 250, 16, 5);
    ax.globalAlpha = 1;
    hazard(ax, 286, 176, 16, 152, 22);
    hazard(ax, 30, 460, 240, 22, 24);
    ax.globalAlpha = 0.16; ax.fillStyle = "#0a0c08";
    for (i = 0; i < 30; i++) ax.fillRect(rn() * 512, rn() * 512, 28 + rn() * 120, 4 + rn() * 8);
    for (i = 0; i < 14; i++) {
      ax.globalAlpha = 0.1 + rn() * 0.14;
      ax.beginPath(); ax.ellipse(rn() * 512, rn() * 512, 8 + rn() * 24, 6 + rn() * 16, rn() * 3, 0, 6.283); ax.fill();
    }
    ax.globalAlpha = 1;
    var apronTex = tex(ac);

    function wallCanvas(base, cols) {
      var c = cvs(256, 256), x = c.getContext("2d");
      x.fillStyle = base; x.fillRect(0, 0, 256, 256);
      patches(x, 256, 256, 26, "#b6b9ab", "#22261e");
      seams(x, 256, 256, cols, 5);
      /* ribbon glazing high on the wall */
      x.fillStyle = "#1d262a"; x.fillRect(14, 40, 228, 26);
      x.strokeStyle = "#787c72"; x.lineWidth = 2; x.strokeRect(14, 40, 228, 26);
      for (i = 0; i < 10; i++) {
        x.beginPath(); x.moveTo(14 + i * 23, 40); x.lineTo(14 + i * 23, 66); x.stroke();
        if (i % 3 === 0) { x.globalAlpha = 0.18; x.fillStyle = "#9fb3bd"; x.fillRect(16 + i * 23, 42, 18, 10); x.globalAlpha = 1; x.fillStyle = "#1d262a"; }
      }
      x.globalAlpha = 0.34; x.fillStyle = "#2a2e26"; x.fillRect(0, 232, 256, 24); x.globalAlpha = 1;
      drips(x, 256, 256, 28);
      return c;
    }
    var wallTex = tex(wallCanvas("#6f7468", 8), 2, 1);
    var endTex = tex(wallCanvas("#6f7468", 6));

    var rc = cvs(256, 256), rx = rc.getContext("2d");
    rx.fillStyle = "#4b5054"; rx.fillRect(0, 0, 256, 256);
    rx.globalAlpha = 0.32; rx.strokeStyle = "#2b2f31"; rx.lineWidth = 2;
    for (i = 0; i < 64; i++) { rx.beginPath(); rx.moveTo(i * 4, 0); rx.lineTo(i * 4, 256); rx.stroke(); }
    rx.globalAlpha = 1;
    patches(rx, 256, 256, 22, "#787d7f", "#6a4a2a");
    var roofTex = tex(rc, 4, 4);

    /* hazard-striped roller door */
    var dc = cvs(256, 256), dx = dc.getContext("2d");
    dx.fillStyle = "#5d6259"; dx.fillRect(0, 0, 256, 256);
    dx.globalAlpha = 0.45; dx.strokeStyle = "#252820"; dx.lineWidth = 4;
    for (i = 1; i < 16; i++) { dx.beginPath(); dx.moveTo(0, i * 16); dx.lineTo(256, i * 16); dx.stroke(); }
    dx.globalAlpha = 1;
    hazard(dx, 0, 0, 256, 40, 34);
    hazard(dx, 0, 216, 256, 40, 34);
    patches(dx, 256, 256, 14, "#8f948a", "#25281f");
    dx.globalAlpha = 0.8; dx.fillStyle = "#d5d2bd";
    dx.font = "bold 34px sans-serif"; dx.textAlign = "center";
    dx.fillText("BAY 1", 128, 140);
    dx.globalAlpha = 1;
    drips(dx, 256, 256, 18);
    var doorTex = tex(dc);

    var lc = cvs(64, 64), lx = lc.getContext("2d");
    lx.clearRect(0, 0, 64, 64);
    lx.strokeStyle = "rgba(198,204,206,0.98)"; lx.lineWidth = 3;
    for (i = -64; i < 128; i += 16) {
      lx.beginPath(); lx.moveTo(i, 0); lx.lineTo(i + 64, 64); lx.stroke();
      lx.beginPath(); lx.moveTo(i, 64); lx.lineTo(i + 64, 0); lx.stroke();
    }

    /* ---------------- materials ---------------- */
    var conc = new THREE.MeshStandardMaterial({ color: 0xffffff, map: wallTex, roughness: 0.78, metalness: 0.05 });
    var concEnd = new THREE.MeshStandardMaterial({ color: 0xffffff, map: endTex, roughness: 0.78, metalness: 0.05 });
    var roofM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: roofTex, roughness: 0.6, metalness: 0.3 });
    var apronM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: apronTex, roughness: 0.9, metalness: 0.02 });
    var doorM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: doorTex, roughness: 0.6, metalness: 0.25 });
    var plainM = new THREE.MeshStandardMaterial({ color: 0x565b54, roughness: 0.88, metalness: 0.02 });
    var steel = new THREE.MeshStandardMaterial({ color: 0x8b908b, roughness: 0.3, metalness: 0.85 });
    var paint = new THREE.MeshStandardMaterial({ color: 0xbb8a20, roughness: 0.55, metalness: 0.3 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x2a2d2a, roughness: 0.6, metalness: 0.4 });
    var oliveM = new THREE.MeshStandardMaterial({ color: 0x4a5240, roughness: 0.72, metalness: 0.12 });
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x20303a, roughness: 0.16, metalness: 0.2 });
    var wood = new THREE.MeshStandardMaterial({ color: 0x6d5c3f, roughness: 0.85, metalness: 0.02 });
    var teamM = new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.55, metalness: 0.15 });
    var lampM = new THREE.MeshStandardMaterial({ color: 0xf4eecb, emissive: 0x6a6440, roughness: 0.4, metalness: 0.2 });
    var drumCache = {};

    function box(w, d, h, m) { return new THREE.Mesh(new THREE.BoxGeometry(w, d, h), m); }
    function at(mesh, x, y, z, p) { mesh.position.set(x, y, z); (p || g).add(mesh); return mesh; }
    function cylZ(r1, r2, h, m, sg) { var ge = new THREE.CylinderGeometry(r1, r2, h, sg || 10); ge.rotateX(Math.PI / 2); return new THREE.Mesh(ge, m); }
    function cylX(r1, r2, l, m, sg) { var ge = new THREE.CylinderGeometry(r1, r2, l, sg || 8); ge.rotateZ(-Math.PI / 2); return new THREE.Mesh(ge, m); }
    function cylY(r1, r2, l, m, sg) { return new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, l, sg || 8), m); }
    function drum(px, py, pz, col) {
      var m = drumCache[col] || (drumCache[col] = new THREE.MeshStandardMaterial({ color: col, roughness: 0.6, metalness: 0.35 }));
      at(cylZ(0.3, 0.3, 0.92, m, 10), px, py, pz + 0.46);
      at(cylZ(0.32, 0.32, 0.07, dark, 10), px, py, pz + 0.62);
    }
    function crate(px, py, pz, sx, sy, sz, rot, mat) {
      var c = box(sx, sy, sz, mat || wood); c.position.set(px, py, pz + sz / 2); c.rotation.z = rot || 0; g.add(c);
      var b1 = box(sx + 0.05, 0.07, 0.09, dark); b1.position.set(px, py, pz + sz * 0.72); b1.rotation.z = rot || 0; g.add(b1);
    }
    function sandbags(px, py, ang, rows, per) {
      var grp = new THREE.Group(); grp.position.set(px, py, 0); grp.rotation.z = ang; g.add(grp);
      var bagM = new THREE.MeshStandardMaterial({ color: 0x7b7355, roughness: 0.95, metalness: 0.0 });
      for (var r = 0; r < rows; r++) for (var q = 0; q < per - r; q++) {
        var b = box(0.62, 0.4, 0.26, bagM);
        b.position.set((q - (per - r - 1) / 2) * 0.66 + (r % 2) * 0.16, 0, 0.14 + r * 0.25);
        b.rotation.z = (rn() - 0.5) * 0.16; grp.add(b);
      }
    }
    function fenceRun(x0, y0, x1, y1, h) {
      var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), an = Math.atan2(dy, dx);
      var t = tex(lc, L / 2.2, h / 2.2);
      var m = new THREE.MeshStandardMaterial({ color: 0x9aa0a2, map: t, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 0.5, metalness: 0.6 });
      var ge = new THREE.PlaneGeometry(L, h); ge.rotateX(Math.PI / 2);
      var mesh = new THREE.Mesh(ge, m);
      mesh.position.set((x0 + x1) / 2, (y0 + y1) / 2, h / 2 + 0.1); mesh.rotation.z = an; g.add(mesh);
      var rail = cylX(0.05, 0.05, L, steel, 5);
      rail.position.set((x0 + x1) / 2, (y0 + y1) / 2, h + 0.1); rail.rotation.z = an; g.add(rail);
      var n = Math.max(2, Math.round(L / 5));
      for (var q = 0; q <= n; q++) at(cylZ(0.07, 0.07, h + 0.3, steel, 5), x0 + dx * q / n, y0 + dy * q / n, (h + 0.3) / 2);
    }
    function floodlight(px, py, hgt, ang) {
      var p = new THREE.Group(); p.position.set(px, py, 0); p.rotation.z = ang; g.add(p);
      at(cylZ(0.5, 0.6, 0.5, plainM, 8), 0, 0, 0.25, p);
      at(cylZ(0.13, 0.18, hgt, steel, 6), 0, 0, hgt / 2, p);
      at(box(0.24, 1.8, 0.2, steel), 0, 0, hgt + 0.1, p);
      for (var q = -1; q <= 1; q += 2) {
        at(box(0.4, 0.6, 0.46, dark), -0.1, q * 0.55, hgt + 0.4, p);
        at(box(0.06, 0.5, 0.36, lampM), 0.13, q * 0.55, hgt + 0.4, p);
      }
    }

    /* ---------------- apron ---------------- */
    at(new THREE.Mesh(new THREE.BoxGeometry(58, 58, 0.3), [plainM, plainM, plainM, plainM, apronM, plainM]), 0, 0, 0.15);

    /* ---------------- hangar shell ---------------- */
    var HX = -5, HW = 40, HD = 34, HH = 12;
    at(new THREE.Mesh(new THREE.BoxGeometry(HW, HD, HH), [concEnd, concEnd, conc, conc, roofM, plainM]), HX, 0, HH / 2 + 0.3);
    /* plinth and pilasters */
    at(box(HW + 1.0, HD + 1.0, 0.7, plainM), HX, 0, 0.55);
    for (i = -4; i <= 4; i++) for (s = -1; s <= 1; s += 2) {
      at(box(0.5, 0.9, HH - 1.4, plainM), HX + i * 4.4, s * (HD / 2 + 0.2), (HH - 1.4) / 2 + 0.7);
    }
    /* team identification band along the flanks */
    at(box(HW + 0.4, HD + 0.4, 0.85, teamM), HX, 0, 10.4);

    /* ---------------- sawtooth skylight roof ---------------- */
    var bay = 8.0, rise = 2.7, x0 = HX - HW / 2;
    for (i = 0; i < 5; i++) {
      var bx0 = x0 + i * bay;
      var plate = box(Math.sqrt(bay * bay + rise * rise) + 0.2, HD + 0.6, 0.3, roofM);
      plate.position.set(bx0 + bay / 2, 0, HH + 0.3 + rise / 2);
      plate.rotation.y = -Math.atan2(rise, bay);
      g.add(plate);
      /* north-light glazing at the high edge */
      at(box(0.24, HD + 0.4, rise, glass), bx0 + bay, 0, HH + 0.3 + rise / 2);
      at(box(0.34, HD + 0.6, 0.22, steel), bx0 + bay, 0, HH + 0.3 + rise);
      at(box(0.34, HD + 0.6, 0.22, steel), bx0 + bay, 0, HH + 0.34);
      for (j = -4; j <= 4; j++) at(box(0.3, 0.16, rise, steel), bx0 + bay, j * 3.7, HH + 0.3 + rise / 2);
      /* gutter valley */
      at(cylX(0.18, 0.18, HD + 0.4, dark, 6), bx0 + 0.2, 0, HH + 0.42).rotation.z = Math.PI / 2;
    }
    /* roof fascia + extractor stacks */
    for (s = -1; s <= 1; s += 2) at(box(HW + 0.8, 0.4, 0.9, plainM), HX, s * (HD / 2 + 0.2), HH + 0.75);
    for (i = -1; i <= 1; i++) {
      at(cylZ(0.85, 0.85, 2.6, steel, 10), HX + i * 9.0 - 3.0, -12.0, HH + 3.0);
      at(cylZ(1.05, 1.05, 0.3, dark, 10), HX + i * 9.0 - 3.0, -12.0, HH + 4.4);
    }

    /* ---------------- huge front door ---------------- */
    var FX = HX + HW / 2;
    /* dark interior recess */
    at(box(3.0, 16.5, 10.0, dark), FX - 1.4, 0, 5.3);
    /* raised roller door slats (door open, hull rolling out) */
    at(box(0.4, 16.0, 3.2, doorM), FX + 0.15, 0, 8.6);
    at(box(0.65, 17.0, 0.9, steel), FX + 0.2, 0, 10.5);
    /* door jambs with hazard paint */
    for (s = -1; s <= 1; s += 2) {
      at(box(0.8, 1.6, 10.4, plainM), FX + 0.25, s * 8.6, 5.4);
      at(box(0.9, 0.5, 9.6, paint), FX + 0.35, s * 7.9, 5.0);
    }
    at(box(1.0, 18.4, 1.1, plainM), FX + 0.3, 0, 10.9);
    at(box(1.1, 18.6, 0.4, paint), FX + 0.35, 0, 10.15);
    /* threshold hazard kerbs */
    for (s = -1; s <= 1; s += 2) at(box(2.4, 0.7, 0.35, paint), FX + 1.6, s * 8.4, 0.45);
    /* personnel door */
    at(box(0.25, 1.5, 2.4, dark), FX + 0.16, -12.5, 1.7);
    at(box(1.3, 2.2, 0.35, plainM), FX + 0.9, -12.5, 0.5);

    /* ---------------- overhead crane rail projecting out ---------------- */
    var railZ = 11.2;
    for (s = -1; s <= 1; s += 2) {
      at(box(46, 0.5, 0.9, steel), 4.0, s * 5.6, railZ);
      at(box(46, 0.22, 0.3, dark), 4.0, s * 5.6, railZ + 0.55);
      /* outboard support columns and knee braces */
      for (i = 0; i < 2; i++) {
        var cx = 18.5 + i * 7.0;
        at(box(0.7, 0.7, railZ - 0.3, steel), cx, s * 5.6, (railZ - 0.3) / 2 + 0.3);
        at(box(1.6, 1.6, 0.5, plainM), cx, s * 5.6, 0.45);
        var kb = box(4.2, 0.28, 0.28, steel);
        kb.position.set(cx - 1.5, s * 5.6, railZ - 1.6); kb.rotation.y = 0.72; g.add(kb);
      }
      at(box(0.5, 0.5, 6.0, steel), 25.5, s * 5.6, railZ + 2.6);
    }
    at(box(0.4, 11.2, 0.4, steel), 25.5, 0, railZ + 5.4);
    /* crane bridge + trolley + hook */
    var bridge = new THREE.Group(); bridge.position.set(17.0, 0, railZ); g.add(bridge);
    at(box(1.8, 12.2, 1.3, paint), 0, 0, 0.95, bridge);
    at(box(1.2, 12.2, 0.35, steel), 0, 0, 1.75, bridge);
    for (s = -1; s <= 1; s += 2) {
      at(box(2.2, 1.0, 0.6, dark), 0, s * 5.6, 0.35, bridge);
      at(cylX(0.3, 0.3, 0.4, steel, 8), -0.8, s * 5.6, 0.2, bridge).rotation.z = Math.PI / 2;
      at(cylX(0.3, 0.3, 0.4, steel, 8), 0.8, s * 5.6, 0.2, bridge).rotation.z = Math.PI / 2;
    }
    var trolley = new THREE.Group(); trolley.position.set(0, 2.4, 0.4); bridge.add(trolley);
    at(box(1.6, 2.0, 0.9, dark), 0, 0, 0.5, trolley);
    at(cylX(0.45, 0.45, 1.2, steel, 10), 0, 0, 0.5, trolley);
    for (s = -1; s <= 1; s += 2) at(cylZ(0.035, 0.035, 6.2, dark, 4), 0, s * 0.42, -3.1, trolley);
    at(box(1.1, 0.9, 0.75, paint), 0, 0, -6.5, trolley);
    at(new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.09, 5, 10), steel), 0, 0, -7.15, trolley).rotation.x = Math.PI / 2;

    /* ---------------- partly built tank hull in the doorway ---------------- */
    var TXp = 9.5, TYp = 0.0;
    var hull = new THREE.Group(); hull.position.set(TXp, TYp, 0); g.add(hull);
    var hullBody = new THREE.Mesh(M.loft(THREE, [
      { x: -3.6, w: 1.55, h: 0.62, zc: 1.15, sq: 0.86 },
      { x: -2.0, w: 1.72, h: 0.72, zc: 1.12, sq: 0.86 },
      { x: 0.4, w: 1.75, h: 0.74, zc: 1.12, sq: 0.86 },
      { x: 2.2, w: 1.66, h: 0.66, zc: 1.05, sq: 0.86 },
      { x: 3.5, w: 1.35, h: 0.48, zc: 0.92, sq: 0.85 }
    ], 14), oliveM);
    hull.add(hullBody);
    at(box(2.6, 3.3, 0.12, dark), 1.9, 0, 1.86, hull);
    at(new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.14, 5, 14), steel), -0.5, 0, 1.9, hull);
    at(cylZ(1.05, 1.05, 0.2, dark, 14), -0.5, 0, 1.86, hull);
    /* running gear: bogies mounted, tracks not yet fitted */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 6; i++) at(cylX(0.42, 0.42, 0.26, dark, 10), -3.0 + i * 1.15, s * 1.62, 0.62, hull).rotation.z = Math.PI / 2;
      at(box(7.2, 0.22, 0.5, oliveM), 0.1, s * 1.66, 1.55, hull);
    }
    /* engine deck grilles + towing eyes */
    for (i = 0; i < 3; i++) at(box(0.7, 2.4, 0.1, dark), -2.6 + i * 0.85, 0, 1.82, hull);
    for (s = -1; s <= 1; s += 2) at(box(0.3, 0.3, 0.22, steel), 3.5, s * 0.9, 1.2, hull);
    /* jack stands under the hull */
    for (s = -1; s <= 1; s += 2) for (i = -1; i <= 1; i += 2) at(box(0.5, 0.5, 0.7, steel), i * 2.4, s * 1.0, 0.35, hull);
    /* the turret waiting on a stand alongside */
    var tstand = new THREE.Group(); tstand.position.set(6.5, -11.0, 0); g.add(tstand);
    at(box(3.6, 3.6, 1.2, steel), 0, 0, 0.6, tstand);
    at(new THREE.Mesh(M.loft(THREE, [
      { x: -1.5, w: 1.15, h: 0.42, zc: 1.75, sq: 0.85 },
      { x: -0.2, w: 1.25, h: 0.5, zc: 1.78, sq: 0.85 },
      { x: 1.1, w: 1.0, h: 0.42, zc: 1.74, sq: 0.85 },
      { x: 1.7, w: 0.62, h: 0.34, zc: 1.7, sq: 0.85 }
    ], 12), oliveM), 0, 0, 0, tstand);
    at(cylX(0.13, 0.11, 4.4, dark, 8), 3.6, 0, 1.78, tstand);
    at(cylX(0.2, 0.2, 0.7, dark, 8), 2.0, 0, 1.78, tstand);

    /* ---------------- parts racks and shop clutter ---------------- */
    function rack(px, py, ang) {
      var r = new THREE.Group(); r.position.set(px, py, 0); r.rotation.z = ang; g.add(r);
      for (var q = -1; q <= 1; q += 2) for (var k = -1; k <= 1; k += 2) {
        at(box(0.2, 0.2, 4.6, paint), q * 3.4, k * 1.1, 2.4, r);
      }
      for (k = 0; k < 3; k++) {
        at(box(7.0, 2.6, 0.14, steel), 0, 0, 0.9 + k * 1.6, r);
        at(box(7.0, 0.12, 0.2, paint), 0, -1.15, 1.0 + k * 1.6, r);
      }
      at(box(1.6, 1.4, 0.9, wood), -2.0, 0, 1.45, r);
      at(box(1.2, 1.0, 0.7, oliveM), 0.6, 0.2, 3.05, r);
      at(box(1.8, 1.2, 0.8, wood), 2.4, -0.2, 4.65, r);
      for (k = 0; k < 4; k++) at(cylZ(0.5, 0.5, 0.24, dark, 10), -0.4 - k * 0.02, 0.6, 1.1 + k * 0.25, r);
    }
    rack(-16.0, -24.0, 0);
    rack(-4.0, -24.0, 0);
    rack(-16.0, 24.0, 0.05);
    /* road wheel stacks and track links */
    for (i = 0; i < 5; i++) at(cylZ(0.62, 0.62, 0.3, dark, 12), 14.0, -18.0, 0.45 + i * 0.32);
    for (i = 0; i < 4; i++) at(cylZ(0.62, 0.62, 0.3, dark, 12), 15.6, -19.2, 0.45 + i * 0.32);
    for (i = 0; i < 6; i++) {
      var tl = box(0.7, 0.34, 0.16, steel);
      tl.position.set(11.5 + (i % 3) * 0.8, -15.0 + Math.floor(i / 3) * 0.5, 0.4 + Math.floor(i / 3) * 0.18);
      tl.rotation.z = (rn() - 0.5) * 0.4; g.add(tl);
    }
    /* welding bay: gas bottle rack + bench */
    at(box(2.2, 1.2, 0.2, steel), 18.0, 14.0, 1.0);
    for (i = 0; i < 4; i++) at(cylZ(0.22, 0.22, 1.5, new THREE.MeshStandardMaterial({ color: i % 2 ? 0x2f4f6b : 0x6b2f2f, roughness: 0.5, metalness: 0.4 }), 8), 17.4 + i * 0.42, 14.3, 0.85);
    at(box(2.4, 1.0, 0.9, wood), 18.0, 11.6, 0.75);
    at(box(2.6, 1.2, 0.1, steel), 18.0, 11.6, 1.25);
    /* engine block on a pallet */
    at(box(2.2, 1.8, 0.14, wood), 22.0, -6.0, 0.4);
    at(box(1.6, 1.3, 1.1, dark), 22.0, -6.0, 1.0);
    at(cylX(0.4, 0.4, 1.4, steel, 10), 22.6, -6.0, 1.7);
    crate(-24.0, 20.0, 0.3, 2.8, 2.2, 1.9, 0.15);
    crate(-21.0, 21.0, 0.3, 2.2, 1.9, 1.5, -0.3);
    crate(-24.2, 16.6, 0.3, 2.4, 2.0, 1.6, 0.4);
    crate(24.0, 22.0, 0.3, 2.6, 2.2, 1.8, 0.25);
    drum(-26.5, -6.0, 0.3, 0x7a4030); drum(-25.6, -5.5, 0.3, 0x4b5240);
    drum(-26.0, -7.1, 0.3, 0x39566b); drum(-25.1, -7.4, 0.3, 0x7a4030);
    drum(20.5, -22.0, 0.3, 0x4b5240); drum(21.4, -21.6, 0.3, 0x39566b);
    sandbags(27.0, 2.0, Math.PI / 2, 3, 6);
    sandbags(27.0, -2.0, Math.PI / 2, 3, 6);
    fenceRun(-28.6, -28.6, 28.6, -28.6, 2.6);
    fenceRun(-28.6, 28.6, 28.6, 28.6, 2.6);
    fenceRun(-28.6, -28.6, -28.6, 28.6, 2.6);
    floodlight(-27.0, -26.0, 12, 0.9);
    floodlight(27.0, -26.0, 12, 2.3);
    floodlight(27.0, 26.0, 12, 3.9);
    floodlight(-27.0, 26.0, 12, 5.5);
    return g;
  }
};

BLD_MODELS["lab"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var i, j, s, a;

    function rng(seed) { var v = seed || 3; return function () { v = (v * 16807) % 2147483647; return (v % 10000) / 10000; }; }
    function mkTex(w, h, draw, rx, ry) {
      var cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      draw(cv.getContext("2d"), w, h);
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping;
      if (rx) t.repeat.set(rx, ry || rx);
      return t;
    }
    /* precast concrete panels: joints, tonal patches, rain streaks */
    var wallTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(29), q;
      x.fillStyle = "#b7bab0"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 24; q++) {
        x.globalAlpha = 0.04 + r() * 0.04; x.fillStyle = (q % 3) ? "#4c5049" : "#ffffff";
        x.fillRect(r() * w, r() * h, 24 + r() * 80, 18 + r() * 60);
      }
      x.globalAlpha = 0.5; x.strokeStyle = "#7c8078"; x.lineWidth = 2;
      x.beginPath();
      for (q = 1; q < 4; q++) { x.moveTo(q * 64, 0); x.lineTo(q * 64, h); }
      x.moveTo(0, 128); x.lineTo(w, 128);
      x.stroke();
      x.globalAlpha = 0.09; x.fillStyle = "#3c4038";
      for (q = 0; q < 14; q++) x.fillRect(r() * w, r() * h * 0.35, 3 + r() * 5, 40 + r() * 120);
      x.globalAlpha = 1;
    }, 3, 2);
    /* plaza paving */
    var plazaTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(37), q;
      x.fillStyle = "#5d6159"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 22; q++) {
        x.globalAlpha = 0.05 + r() * 0.04; x.fillStyle = (q % 3) ? "#000000" : "#949a8d";
        x.fillRect(r() * w, r() * h, 24 + r() * 70, 20 + r() * 50);
      }
      x.globalAlpha = 0.55; x.strokeStyle = "#3d413a"; x.lineWidth = 2;
      x.beginPath();
      for (q = 1; q < 4; q++) { x.moveTo(q * 64, 0); x.lineTo(q * 64, h); x.moveTo(0, q * 64); x.lineTo(w, q * 64); }
      x.stroke();
      x.globalAlpha = 0.1; x.fillStyle = "#101210";
      for (q = 0; q < 12; q++) x.fillRect(r() * w, r() * h, 3 + r() * 5, 16 + r() * 40);
      x.globalAlpha = 1;
    }, 6, 6);
    /* walkway / apron marking strip */
    var walkTex = mkTex(128, 128, function (x, w, h) {
      var r = rng(41), q;
      x.fillStyle = "#666a60"; x.fillRect(0, 0, w, h);
      x.fillStyle = "rgba(214,212,194,0.8)";
      x.fillRect(0, 6, w, 5); x.fillRect(0, h - 11, w, 5);
      x.globalAlpha = 0.08; x.fillStyle = "#0d0f0d";
      for (q = 0; q < 10; q++) x.fillRect(r() * w, r() * h, 6 + r() * 20, 5 + r() * 16);
      x.globalAlpha = 1;
    }, 8, 1);
    /* ribbon glazing: mullions + lit interior */
    var winTex = mkTex(512, 128, function (x, w, h) {
      var r = rng(59), q;
      x.fillStyle = "#1d2f38"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 32; q++) {
        x.fillStyle = (r() > 0.55) ? "rgba(242,226,172,0.55)" : "rgba(120,160,175,0.20)";
        x.fillRect(q * 16 + 2, 12 + r() * 8, 12, h - 30);
      }
      x.fillStyle = "#8f9691";
      for (q = 0; q <= 32; q++) x.fillRect(q * 16 - 1, 0, 3, h);
      x.fillRect(0, 0, w, 6); x.fillRect(0, h - 6, w, 6);
      x.globalAlpha = 0.25; x.fillStyle = "#0a1015";
      for (q = 0; q < 10; q++) x.fillRect(r() * w, 0, 10 + r() * 30, h);
      x.globalAlpha = 1;
    });
    var domeTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(83), q;
      x.fillStyle = "#cfd3cc"; x.fillRect(0, 0, w, h);
      x.strokeStyle = "rgba(88,94,88,0.45)"; x.lineWidth = 2;
      for (q = 0; q <= 8; q++) {
        x.beginPath(); x.moveTo(q * w / 8, 0); x.lineTo(q * w / 8, h); x.stroke();
        x.beginPath(); x.moveTo(0, q * h / 8); x.lineTo(w, q * h / 8); x.stroke();
      }
      x.globalAlpha = 0.08; x.fillStyle = "#575b52";
      for (q = 0; q < 18; q++) x.fillRect(r() * w, r() * h, 12 + r() * 44, 10 + r() * 30);
      x.globalAlpha = 1;
    });

    var wallMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.78, metalness: 0.06 });
    var plaza = new THREE.MeshStandardMaterial({ map: plazaTex, roughness: 0.93, metalness: 0.02 });
    var walkMat = new THREE.MeshStandardMaterial({ map: walkTex, roughness: 0.92, metalness: 0.02 });
    var winMat = new THREE.MeshStandardMaterial({ map: winTex, roughness: 0.22, metalness: 0.45, emissive: 0xffd9a0, emissiveIntensity: 0.3 });
    var metal = new THREE.MeshStandardMaterial({ color: 0x7d8285, roughness: 0.5, metalness: 0.42 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x2c302f, roughness: 0.6, metalness: 0.3 });
    var domeMat = new THREE.MeshStandardMaterial({ map: domeTex, roughness: 0.42, metalness: 0.12, flatShading: true });
    var ribMat = new THREE.MeshStandardMaterial({ color: 0x6d7378, roughness: 0.55, metalness: 0.35, wireframe: true });
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x22343c, roughness: 0.1, metalness: 0.3, emissive: 0x2a3d45, emissiveIntensity: 0.5 });
    var glow = new THREE.MeshStandardMaterial({ color: 0xffe6b4, emissive: 0xffd08a, emissiveIntensity: 1.2, roughness: 0.5, metalness: 0.0 });
    var lampR = new THREE.MeshStandardMaterial({ color: 0xd2352b, emissive: 0xd2352b, emissiveIntensity: 1.0, roughness: 0.4, metalness: 0.1 });
    var team = new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.6, metalness: 0.14 });

    function box(w, d, h, mat) { return new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mat); }
    function cylZ(r1, r2, h, mat, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, h, seg || 10, 1, !!open); geo.rotateX(Math.PI / 2);
      return new THREE.Mesh(geo, mat);
    }
    function cylX(r1, r2, l, mat, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, l, seg || 8, 1, !!open); geo.rotateZ(-Math.PI / 2);
      return new THREE.Mesh(geo, mat);
    }
    function put(m, x, y, z) { m.position.set(x, y, z); g.add(m); return m; }
    var upZ = new THREE.Vector3(0, 0, 1);
    function strut(p, q, rad, mat, parent, seg) {
      var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var geo = new THREE.CylinderGeometry(rad, rad, L, seg || 5, 1, true); geo.rotateX(Math.PI / 2);
      var m = new THREE.Mesh(geo, mat);
      m.position.set((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
      m.quaternion.setFromUnitVectors(upZ, new THREE.Vector3(dx / L, dy / L, dz / L));
      (parent || g).add(m); return m;
    }
    function railing(pts, z, h, mat) {
      for (var p = 0; p < pts.length - 1; p++) {
        var dx = pts[p + 1][0] - pts[p][0], dy = pts[p + 1][1] - pts[p][1];
        var L = Math.sqrt(dx * dx + dy * dy), ang = Math.atan2(dy, dx);
        for (var lvl = 0; lvl < 2; lvl++) {
          var bar = cylX(0.035, 0.035, L, mat, 5, true); bar.rotation.z = ang;
          put(bar, pts[p][0] + dx / 2, pts[p][1] + dy / 2, z + h * (lvl ? 1 : 0.55));
        }
        var n = Math.max(1, Math.round(L / 2.2));
        for (var q = 0; q < n; q++)
          put(cylZ(0.045, 0.045, h, mat, 5, true), pts[p][0] + dx * q / n, pts[p][1] + dy * q / n, z + h / 2);
      }
    }

    /* ---------------- plaza ---------------- */
    put(box(40, 40, 0.25, plaza), 0, 0, 0.125);
    for (s = -1; s <= 1; s += 2) {
      put(box(40, 0.45, 0.4, wallMat), 0, s * 19.75, 0.32);
      put(box(0.45, 40, 0.4, wallMat), s * 19.75, 0, 0.32);
    }
    put(new THREE.Mesh(new THREE.PlaneGeometry(34, 3.2), walkMat), -1, -15.5, 0.27);
    put(new THREE.Mesh(new THREE.PlaneGeometry(3.2, 12), walkMat), 8.5, -8.0, 0.27);

    /* ---------------- main laboratory block ---------------- */
    var BX = -4.5, BY = -7, BW = 21, BD = 12, BH = 11.0;
    put(box(BW + 1.4, BD + 1.4, 0.45, wallMat), BX, BY, 0.35);
    put(box(BW, BD, BH, wallMat), BX, BY, 0.55 + BH / 2);
    for (i = 0; i < 2; i++) {
      var zb = 3.5 + i * 3.7;
      put(box(BW + 0.24, BD - 0.5, 1.9, winMat), BX, BY, zb);
      put(box(BW - 0.5, BD + 0.24, 1.9, winMat), BX, BY, zb);
      put(box(BW + 0.5, BD + 0.5, 0.22, metal), BX, BY, zb + 1.12);
    }
    for (i = 0; i < 9; i++) {
      for (s = -1; s <= 1; s += 2) put(box(0.16, 0.3, 9.4, wallMat), BX - 8.6 + i * 2.15, BY + s * (BD / 2 + 0.1), 6.0);
    }
    put(box(BW + 0.7, BD + 0.7, 0.85, wallMat), BX, BY, BH + 0.75);
    put(box(BW + 0.75, 0.3, 0.4, team), BX, BY - BD / 2 - 0.35, BH + 1.25);
    put(box(4.5, 3.4, 2.2, wallMat), BX - 6.5, BY + 2.6, BH + 1.7);
    put(box(4.7, 3.6, 0.2, metal), BX - 6.5, BY + 2.6, BH + 2.9);
    for (i = 0; i < 3; i++) {
      put(box(2.4, 2.0, 1.2, metal), BX + 1 + i * 3.0, BY - 3.2, BH + 1.2);
      put(cylZ(0.8, 0.8, 0.2, dark, 12), BX + 1 + i * 3.0, BY - 3.2, BH + 1.85);
    }
    put(cylZ(0.45, 0.45, 2.0, metal, 10), BX + 8.0, BY + 3.4, BH + 1.6);
    railing([[BX - BW / 2 + 0.5, BY - BD / 2 + 0.5], [BX + BW / 2 - 0.5, BY - BD / 2 + 0.5],
             [BX + BW / 2 - 0.5, BY + BD / 2 - 0.5], [BX - BW / 2 + 0.5, BY + BD / 2 - 0.5],
             [BX - BW / 2 + 0.5, BY - BD / 2 + 0.5]], BH + 1.2, 0.95, metal);
    /* entrance: canopy, glass doors, steps, lit sign */
    put(box(5.6, 3.6, 0.24, metal), BX + 7.5, BY - 7.6, 3.6);
    strut([BX + 5.4, BY - 8.9, 0.6], [BX + 5.6, BY - 6.2, 3.5], 0.1, metal, null, 6);
    strut([BX + 9.6, BY - 8.9, 0.6], [BX + 9.4, BY - 6.2, 3.5], 0.1, metal, null, 6);
    put(box(0.35, 5.0, 3.0, glass), BX + 10.4, BY - 6.0, 2.15);
    put(box(5.0, 3.0, 0.36, wallMat), BX + 8.0, BY - 7.5, 0.38);
    put(box(4.4, 2.2, 0.2, wallMat), BX + 8.0, BY - 8.9, 0.16);
    put(box(0.18, 3.6, 1.0, team), BX + 10.65, BY - 6.0, 4.4);
    put(box(4.2, 0.3, 0.2, glow), BX + 7.5, BY - 9.3, 3.42);
    /* antenna mast with guy wires */
    var MX = BX - 8.6, MY = BY - 3.6;
    put(box(1.7, 1.7, 0.6, wallMat), MX, MY, BH + 1.3);
    put(cylZ(0.22, 0.12, 12.0, metal, 8), MX, MY, BH + 7.6);
    for (i = 0; i < 3; i++) {
      a = i / 3 * Math.PI * 2 + 0.4;
      strut([MX, MY, BH + 10.6], [MX + Math.cos(a) * 4.2, MY + Math.sin(a) * 4.2, BH + 1.6], 0.03, metal, null, 4);
    }
    for (i = 0; i < 3; i++) put(cylX(0.05, 0.05, 1.5 - i * 0.35, metal, 4, true), MX, MY, BH + 8.5 + i * 2.2);
    put(cylZ(0.16, 0.16, 0.34, lampR, 8), MX, MY, BH + 13.9);
    put(box(0.7, 0.7, 0.7, dark), MX, MY, BH + 5.4);

    /* ---------------- geodesic dome on its drum ---------------- */
    var DX = 11.0, DY = 10.5, DR = 5.4;
    put(box(DR * 2 + 2.2, DR * 2 + 2.2, 0.4, plaza), DX, DY, 0.32);
    put(cylZ(DR, DR + 0.15, 3.4, wallMat, 24), DX, DY, 1.7);
    for (i = 0; i < 8; i++) {
      a = i / 8 * Math.PI * 2;
      var wq = box(0.5, 1.1, 1.4, glass);
      wq.position.set(DX + Math.cos(a) * (DR - 0.05), DY + Math.sin(a) * (DR - 0.05), 2.1);
      wq.rotation.z = a; g.add(wq);
    }
    put(cylZ(DR + 0.35, DR + 0.35, 0.35, metal, 24), DX, DY, 3.55);
    put(cylZ(DR + 0.4, DR + 0.4, 0.3, team, 24, true), DX, DY, 3.9);
    var ico = new THREE.Mesh(new THREE.IcosahedronGeometry(DR, 2), domeMat);
    ico.scale.set(1, 1, 0.82); put(ico, DX, DY, 3.7);
    var icoR = new THREE.Mesh(new THREE.IcosahedronGeometry(DR + 0.06, 1), ribMat);
    icoR.scale.set(1, 1, 0.82); put(icoR, DX, DY, 3.7);
    put(cylZ(0.5, 0.35, 0.7, metal, 10), DX, DY, 8.2);
    put(cylZ(0.12, 0.12, 0.4, lampR, 6), DX, DY, 8.7);
    var slot = box(0.35, 3.4, 1.6, glow);
    slot.position.set(DX + DR * 0.7, DY - 1.0, 5.4); slot.rotation.y = -0.5; slot.rotation.z = -0.2; g.add(slot);
    /* dome entry stair */
    put(box(2.4, 2.6, 0.5, wallMat), DX - DR - 1.0, DY - 2.0, 0.45);
    put(box(1.2, 0.3, 2.2, glass), DX - DR + 0.1, DY - 2.0, 1.6);

    /* ---------------- annex tower ---------------- */
    var AX = -13.5, AY = 11.0, AW = 8.0, AH = 12.5;
    put(box(AW + 1.2, AW + 1.2, 0.45, wallMat), AX, AY, 0.35);
    put(box(AW, AW, AH, wallMat), AX, AY, 0.55 + AH / 2);
    for (i = 0; i < 3; i++) {
      var za = 3.2 + i * 3.4;
      put(box(AW + 0.22, AW - 0.6, 1.6, winMat), AX, AY, za);
      put(box(AW - 0.6, AW + 0.22, 1.6, winMat), AX, AY, za);
    }
    put(box(AW + 0.8, AW + 0.8, 0.8, wallMat), AX, AY, AH + 0.9);
    put(box(AW + 0.85, 0.3, 0.36, team), AX, AY - AW / 2 - 0.4, AH + 1.32);
    put(cylZ(2.0, 2.0, 1.2, metal, 14), AX, AY, AH + 1.9);
    put(cylZ(2.1, 2.1, 0.2, dark, 14), AX, AY, AH + 2.6);
    railing([[AX - 3.4, AY - 3.4], [AX + 3.4, AY - 3.4], [AX + 3.4, AY + 3.4], [AX - 3.4, AY + 3.4], [AX - 3.4, AY - 3.4]], AH + 1.3, 0.9, metal);

    /* ---------------- elevated skywalk: annex -> dome drum ---------------- */
    var wy = AY - 2.0, wx0 = AX + AW / 2, wx1 = DX - DR + 0.3, wz = 6.6;
    var wl = wx1 - wx0;
    put(box(wl, 3.4, 0.35, metal), (wx0 + wx1) / 2, wy, wz);
    put(box(wl, 3.0, 2.5, glass), (wx0 + wx1) / 2, wy, wz + 1.45);
    put(box(wl + 0.3, 3.6, 0.28, metal), (wx0 + wx1) / 2, wy, wz + 2.8);
    for (i = 0; i < 7; i++) {
      for (s = -1; s <= 1; s += 2) put(box(0.14, 0.16, 2.5, metal), wx0 + 0.8 + i * (wl - 1.6) / 6, wy + s * 1.55, wz + 1.45);
    }
    put(box(wl, 0.3, 0.24, team), (wx0 + wx1) / 2, wy - 1.74, wz + 2.72);
    for (i = 0; i < 2; i++) {
      var cx = wx0 + 2.4 + i * (wl - 4.8);
      strut([cx - 1.0, wy - 1.0, 0.4], [cx, wy, wz - 0.2], 0.24, metal, null, 6);
      strut([cx + 1.0, wy + 1.0, 0.4], [cx, wy, wz - 0.2], 0.24, metal, null, 6);
      put(box(1.8, 1.8, 0.5, wallMat), cx, wy, 0.5);
    }

    /* ---------------- ground clutter ---------------- */
    for (i = 0; i < 2; i++) {
      put(box(2.2, 2.2, 0.75, wallMat), BX + 4.0 + i * 7.0, BY - 12.0, 0.62);
      put(box(1.9, 1.9, 0.18, dark), BX + 4.0 + i * 7.0, BY - 12.0, 1.02);
    }
    for (i = 0; i < 6; i++) put(cylZ(0.13, 0.13, 0.9, metal, 8), BX + 1.0 + i * 2.6, BY - 10.4, 0.65);
    for (i = 0; i < 3; i++) {
      var lx = -15 + i * 14, ly = 17.2;
      put(cylZ(0.16, 0.12, 6.0, metal, 8), lx, ly, 3.1);
      put(box(1.0, 0.5, 0.25, metal), lx + 0.5, ly, 6.1);
      put(box(0.8, 0.4, 0.1, glow), lx + 0.6, ly, 5.95);
    }
    /* gas cylinder rack + chiller plant west of the block */
    put(box(3.6, 1.8, 0.25, metal), -17.3, -3.0, 0.35);
    for (i = 0; i < 6; i++) put(cylZ(0.28, 0.28, 1.5, i % 2 ? dark : team, 10), -18.6 + (i % 3) * 1.3, -3.5 + Math.floor(i / 3) * 0.9, 1.2);
    put(box(3.8, 2.0, 0.1, metal), -17.3, -3.0, 2.0);
    put(box(2.8, 2.4, 2.0, metal), -16.8, 1.6, 1.15);
    put(cylZ(0.9, 0.9, 0.25, dark, 12), -16.8, 1.6, 2.28);
    put(box(3.0, 2.6, 0.22, dark), -16.8, 1.6, 0.24);
    /* dish antenna on a pole */
    var PX = 16.5, PY = -13.0;
    put(box(1.6, 1.6, 0.4, wallMat), PX, PY, 0.42);
    put(cylZ(0.16, 0.16, 3.0, metal, 8), PX, PY, 1.7);
    var prof = [];
    for (i = 0; i <= 5; i++) { var rr = 1.5 * i / 5; prof.push(new THREE.Vector2(rr, rr * rr / 2.2)); }
    var sdGeo = new THREE.LatheGeometry(prof, 16); sdGeo.rotateZ(-Math.PI / 2);
    var sd = new THREE.Mesh(sdGeo, new THREE.MeshStandardMaterial({ map: domeTex, roughness: 0.45, metalness: 0.2, side: THREE.DoubleSide }));
    sd.rotation.y = -0.55; sd.rotation.z = 2.2; put(sd, PX, PY, 3.5);
    put(cylZ(0.09, 0.09, 0.5, dark, 6), PX, PY, 4.4);
    /* parked equipment crates */
    var r2 = rng(13);
    for (i = 0; i < 4; i++) {
      var cb = box(1.7 + r2() * 0.5, 1.3, 1.1, i % 2 ? dark : metal);
      cb.position.set(4.0 + (i % 2) * 2.3, 16.0 - Math.floor(i / 2) * 1.8, 0.8);
      cb.rotation.z = (r2() - 0.5) * 0.35; g.add(cb);
    }
    return g;
  }
};

UNIT_MODELS["lst"] = {
  len: 26.4,
  build: function (THREE, M, C) {
    var G = new THREE.Group();
    var i, k, seed = 29;
    function R() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    /* ---------------- painted cargo deck ---------------- */
    var DX0 = -11.6, DX1 = 11.6, DY0 = -4.6, DY1 = 4.6;
    var cv = document.createElement("canvas"); cv.width = 1024; cv.height = 448;
    var g2 = cv.getContext("2d"), W = cv.width, H = cv.height;
    function PX(x) { return (x - DX0) / (DX1 - DX0) * W; }
    function PY(y) { return (DY1 - y) / (DY1 - DY0) * H; }
    g2.fillStyle = "#4b5054"; g2.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {                                   /* tonal patchwork */
      g2.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)";
      g2.fillRect(R() * W, R() * H, 30 + R() * 150, 16 + R() * 70);
    }
    g2.fillStyle = "rgba(12,14,16,0.3)";                         /* non-skid speckle */
    for (i = 0; i < 2600; i++) g2.fillRect(R() * W, R() * H, 2, 2);
    g2.strokeStyle = "rgba(0,0,0,0.28)"; g2.lineWidth = 1.4;     /* deck plate seams */
    for (i = 1; i < 12; i++) { g2.beginPath(); g2.moveTo(i * W / 12, 0); g2.lineTo(i * W / 12, H); g2.stroke(); }
    for (i = 1; i < 5; i++) { g2.beginPath(); g2.moveTo(0, i * H / 5); g2.lineTo(W, i * H / 5); g2.stroke(); }
    g2.strokeStyle = "#c8b12c"; g2.lineWidth = 6;                /* cargo lane limit lines */
    g2.beginPath(); g2.moveTo(PX(-10.4), PY(3.5)); g2.lineTo(PX(10.4), PY(3.5)); g2.stroke();
    g2.beginPath(); g2.moveTo(PX(-10.4), PY(-3.5)); g2.lineTo(PX(10.4), PY(-3.5)); g2.stroke();
    g2.strokeStyle = "rgba(200,177,44,0.55)"; g2.lineWidth = 3;  /* lane centreline */
    g2.setLineDash([26, 20]);
    g2.beginPath(); g2.moveTo(PX(-10.4), PY(0)); g2.lineTo(PX(10.4), PY(0)); g2.stroke();
    g2.setLineDash([]);
    for (k = 0; k < 2; k++) {                                    /* ramp hazard chevrons */
      var bx0 = k ? PX(9.0) : PX(-11.0);
      for (i = 0; i < 7; i++) {
        g2.fillStyle = i % 2 ? "#1d1f21" : "#c8b12c";
        g2.save(); g2.beginPath();
        g2.moveTo(bx0 + i * 12, PY(4.3)); g2.lineTo(bx0 + i * 12 + 12, PY(4.3));
        g2.lineTo(bx0 + i * 12 + 24, PY(-4.3)); g2.lineTo(bx0 + i * 12 + 12, PY(-4.3));
        g2.closePath(); g2.fill(); g2.restore();
      }
    }
    g2.fillStyle = "rgba(20,22,24,0.55)";                        /* deck padeye grid */
    for (i = 0; i < 11; i++) for (k = 0; k < 5; k++) {
      g2.beginPath(); g2.arc(PX(-9.5 + i * 1.9), PY(-3.0 + k * 1.5), 3.2, 0, 6.3); g2.fill();
    }
    g2.strokeStyle = "rgba(0,0,0,0.35)"; g2.lineWidth = 7;       /* tyre / track scuffing */
    for (i = 0; i < 6; i++) {
      var sy = -2.6 + R() * 5.2;
      g2.beginPath(); g2.moveTo(PX(-10 + R() * 4), PY(sy)); g2.lineTo(PX(4 + R() * 6), PY(sy + (R() - 0.5))); g2.stroke();
    }
    g2.fillStyle = "#b9bec2"; g2.font = "bold 26px sans-serif"; g2.textAlign = "center";
    g2.fillText("CARGO 60 TON", PX(0), PY(-3.9));
    g2.fillText("NO STEP", PX(-6.5), PY(4.1));
    var deckTex = new THREE.CanvasTexture(cv); deckTex.anisotropy = 4;

    /* ---------------- black rubber skirt skin ---------------- */
    var sv = document.createElement("canvas"); sv.width = 1024; sv.height = 256;
    var s2 = sv.getContext("2d");
    s2.fillStyle = "#17191b"; s2.fillRect(0, 0, 1024, 256);
    for (i = 0; i < 70; i++) {
      s2.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
      s2.fillRect(R() * 1024, R() * 256, 24 + R() * 90, 14 + R() * 60);
    }
    s2.strokeStyle = "rgba(0,0,0,0.5)"; s2.lineWidth = 2;        /* rubber segment seams */
    for (i = 0; i < 1024; i += 21) { s2.beginPath(); s2.moveTo(i, 0); s2.lineTo(i, 256); s2.stroke(); }
    s2.strokeStyle = "rgba(255,255,255,0.06)"; s2.lineWidth = 3;
    for (i = 0; i < 1024; i += 21) { s2.beginPath(); s2.moveTo(i + 8, 0); s2.lineTo(i + 8, 256); s2.stroke(); }
    var sg = s2.createLinearGradient(0, 200, 0, 256);            /* salt / spray bleaching low down */
    sg.addColorStop(0, "rgba(190,195,200,0)"); sg.addColorStop(1, "rgba(190,195,200,0.22)");
    s2.fillStyle = sg; s2.fillRect(0, 200, 1024, 56);
    var sg2 = s2.createLinearGradient(0, 0, 0, 46);
    sg2.addColorStop(0, "rgba(190,195,200,0.2)"); sg2.addColorStop(1, "rgba(190,195,200,0)");
    s2.fillStyle = sg2; s2.fillRect(0, 0, 1024, 46);
    var skirtTex = new THREE.CanvasTexture(sv); skirtTex.anisotropy = 4;

    /* ---------------- decals ---------------- */
    var nv = document.createElement("canvas"); nv.width = 512; nv.height = 128;
    var n2 = nv.getContext("2d");
    n2.fillStyle = "rgba(0,0,0,0)"; n2.fillRect(0, 0, 512, 128);
    n2.fillStyle = "#c6cbcf"; n2.font = "bold 92px sans-serif"; n2.textAlign = "center";
    n2.fillText("LCAC 62", 256, 96);
    var numTex = new THREE.CanvasTexture(nv);

    var deckMat = new THREE.MeshStandardMaterial({ map: deckTex, metalness: 0.25, roughness: 0.78 });
    var hullMat = new THREE.MeshStandardMaterial({ color: 0x5a6166, metalness: 0.3, roughness: 0.62 });
    var skirtMat = new THREE.MeshStandardMaterial({ map: skirtTex, metalness: 0.12, roughness: 0.85, side: THREE.DoubleSide });
    var rubMat = new THREE.MeshStandardMaterial({ color: 0x15171a, metalness: 0.1, roughness: 0.9 });
    var darkMat = new THREE.MeshStandardMaterial({ color: 0x2b3033, metalness: 0.35, roughness: 0.6 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x8a9095, metalness: 0.85, roughness: 0.3 });
    var winMat = new THREE.MeshStandardMaterial({ color: 0x121a20, metalness: 0.45, roughness: 0.22 });
    var oliveMat = new THREE.MeshStandardMaterial({ color: 0x4a5240, metalness: 0.25, roughness: 0.72 });
    var teamMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.team), metalness: 0.3, roughness: 0.55 });
    var numMat = new THREE.MeshStandardMaterial({ map: numTex, transparent: true, alphaTest: 0.45, metalness: 0.2, roughness: 0.8 });

    function bx(p, sx, sy, sz, x, y, z, mt) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mt); m.position.set(x, y, z); p.add(m); return m;
    }
    function tube(p, r1, r2, h, ax, x, y, z, mt, sg2b, open) {
      var g = new THREE.CylinderGeometry(r1, r2, h, sg2b || 8, 1, !!open);
      if (ax === "z") g.rotateX(Math.PI / 2); else if (ax === "x") g.rotateZ(Math.PI / 2);
      var m = new THREE.Mesh(g, mt); m.position.set(x, y, z); p.add(m); return m;
    }
    function prism(p, pts, h, x, y, z, mt) {
      var s = new THREE.Shape(); s.moveTo(pts[0][0], pts[0][1]);
      for (var q = 1; q < pts.length; q++) s.lineTo(pts[q][0], pts[q][1]);
      s.closePath();
      var m = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: false }), mt);
      m.position.set(x, y, z); p.add(m); return m;
    }

    /* ---------------- inflated rubber skirt ---------------- */
    G.add(new THREE.Mesh(M.loft(THREE, [
      { x: -13.1, w: 2.4, h: 0.8, zc: 1.3, sq: 0.55 },
      { x: -12.3, w: 4.9, h: 1.05, zc: 1.22, sq: 0.5 },
      { x: -10.8, w: 6.5, h: 1.15, zc: 1.18, sq: 0.45 },
      { x: -8.0, w: 7.15, h: 1.2, zc: 1.15, sq: 0.42 },
      { x: 0.0, w: 7.15, h: 1.2, zc: 1.15, sq: 0.42 },
      { x: 8.0, w: 7.15, h: 1.2, zc: 1.15, sq: 0.42 },
      { x: 10.8, w: 6.5, h: 1.15, zc: 1.18, sq: 0.45 },
      { x: 12.3, w: 4.9, h: 1.05, zc: 1.22, sq: 0.5 },
      { x: 13.1, w: 2.4, h: 0.8, zc: 1.3, sq: 0.55 }
    ], 22), skirtMat));

    /* skirt fingers around the bottom edge */
    var fing = [];
    for (i = 0; i < 15; i++) { fing.push([-11.0 + i * 1.6, 7.05]); fing.push([-11.0 + i * 1.6, -7.05]); }
    for (i = 0; i < 7; i++) { fing.push([13.05, -4.5 + i * 1.5]); fing.push([-13.05, -4.5 + i * 1.5]); }
    for (i = 0; i < fing.length; i++) {
      var fg = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.3, 0.95, 6), rubMat);
      fg.rotation.x = Math.PI / 2;
      fg.position.set(fing[i][0], fing[i][1] * 0.985, 0.42);
      G.add(fg);
    }

    /* ---------------- hard structure: cargo deck ---------------- */
    var deckPts = [[DX0, DY0], [DX1, DY0], [DX1, DY1], [DX0, DY1]];
    var ds = new THREE.Shape(); ds.moveTo(deckPts[0][0], deckPts[0][1]);
    for (i = 1; i < deckPts.length; i++) ds.lineTo(deckPts[i][0], deckPts[i][1]);
    ds.closePath();
    var dg = new THREE.ExtrudeGeometry(ds, { depth: 0.3, bevelEnabled: false });
    var dp = dg.attributes.position, du = dg.attributes.uv;
    for (i = 0; i < dp.count; i++) du.setXY(i, (dp.getX(i) - DX0) / (DX1 - DX0), (dp.getY(i) - DY0) / (DY1 - DY0));
    var deck = new THREE.Mesh(dg, [deckMat, hullMat]);
    deck.position.z = 2.32; G.add(deck);

    /* ---------------- side buoyancy / machinery boxes ---------------- */
    for (k = 0; k < 2; k++) {
      var sy2 = k ? -1 : 1;
      prism(G, [
        [-12.0, sy2 * 4.5], [-12.0, sy2 * 7.1], [8.6, sy2 * 7.1],
        [11.4, sy2 * 6.5], [12.7, sy2 * 5.3], [12.7, sy2 * 4.5]
      ], 2.7, 0, 0, 2.3, hullMat);
      bx(G, 20.0, 0.28, 0.34, -0.6, sy2 * 7.12, 4.86, darkMat);        /* rubbing strake */
      bx(G, 3.6, 0.3, 0.9, -6.0, sy2 * 7.14, 3.7, teamMat);            /* identification panel */
      /* hull number decal on the outer face */
      var nd = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 1.15), numMat);
      if (k) { nd.rotation.x = Math.PI / 2; } else { nd.rotation.set(Math.PI / 2, 0, Math.PI); }
      nd.position.set(2.2, sy2 * 7.16, 4.1); G.add(nd);
      /* gas-turbine exhaust stacks */
      tube(G, 0.42, 0.5, 1.3, "z", -3.0, sy2 * 5.9, 5.6, darkMat, 8);
      tube(G, 0.42, 0.5, 1.3, "z", -5.6, sy2 * 5.9, 5.6, darkMat, 8);
      /* lift-fan intake forward, grille bars over the mouth */
      tube(G, 1.25, 1.25, 0.55, "z", 6.4, sy2 * 5.8, 5.2, darkMat, 14);
      for (i = 0; i < 5; i++) bx(G, 2.4, 0.12, 0.1, 6.4, sy2 * 5.8 - 1.0 + i * 0.5, 5.5, steelMat);
      /* walkway railing along the outboard edge */
      for (i = 0; i < 9; i++) {
        tube(G, 0.05, 0.05, 1.0, "z", -11.0 + i * 2.4, sy2 * 6.95, 5.5, steelMat, 5);
      }
      tube(G, 0.04, 0.04, 19.2, "x", -1.4, sy2 * 6.95, 5.98, steelMat, 4);
      tube(G, 0.04, 0.04, 19.2, "x", -1.4, sy2 * 6.95, 5.55, steelMat, 4);
      /* cleats and a stowed life raft canister */
      for (i = 0; i < 4; i++) bx(G, 0.7, 0.36, 0.24, -9 + i * 6, sy2 * 6.4, 5.12, steelMat);
      tube(G, 0.45, 0.45, 1.4, "y", -8.4, sy2 * 6.0, 5.45, darkMat, 10);
    }

    /* ---------------- pilothouse (starboard bow) + engineer module (port) ---------------- */
    bx(G, 4.4, 2.5, 2.3, 8.2, -5.85, 6.15, hullMat);
    bx(G, 4.5, 2.6, 0.85, 8.2, -5.85, 6.75, winMat);                   /* wrap-around glazing */
    bx(G, 4.6, 2.7, 0.18, 8.2, -5.85, 7.38, hullMat);
    tube(G, 0.09, 0.09, 2.6, "z", 6.4, -5.85, 8.6, steelMat, 5);       /* whip antennas */
    tube(G, 0.09, 0.09, 2.0, "z", 9.8, -6.6, 8.4, steelMat, 5);
    bx(G, 0.35, 1.5, 0.6, 7.4, -5.85, 8.0, darkMat);                   /* surface-search radar */
    bx(G, 0.5, 0.5, 0.5, 9.4, -5.2, 7.75, steelMat);
    bx(G, 3.4, 2.4, 1.9, 6.2, 5.85, 5.95, hullMat);                    /* engineer module */
    bx(G, 3.5, 2.5, 0.7, 6.2, 5.85, 6.4, winMat);
    bx(G, 3.6, 2.6, 0.16, 6.2, 5.85, 6.88, hullMat);
    tube(G, 0.09, 0.09, 2.2, "z", 4.7, 5.85, 8.0, steelMat, 5);
    bx(G, 0.06, 0.85, 0.55, 4.94, 5.85, 8.9, teamMat);                 /* ensign */

    /* ---------------- ducted lift-fan / propulsion units ---------------- */
    for (k = 0; k < 2; k++) {
      var fy = k ? -5.45 : 5.45, fx = -12.2, fz = 4.7;
      bx(G, 2.6, 1.5, 2.9, -11.4, fy, 3.5, hullMat);                   /* pylon */
      tube(G, 2.2, 2.2, 2.4, "x", fx, fy, fz, hullMat, 18, true);      /* shroud skin */
      tube(G, 2.0, 2.0, 2.3, "x", fx, fy, fz, darkMat, 18, true);      /* duct interior */
      var r1 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.11, 5, 18), hullMat);
      r1.rotation.y = Math.PI / 2; r1.position.set(fx + 1.2, fy, fz); G.add(r1);
      var r2 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.11, 5, 18), hullMat);
      r2.rotation.y = Math.PI / 2; r2.position.set(fx - 1.2, fy, fz); G.add(r2);
      for (i = 0; i < 4; i++) {                                        /* duct support struts */
        var st = new THREE.Mesh(new THREE.BoxGeometry(0.24, 4.0, 0.2), hullMat);
        st.position.set(fx - 0.9, fy, fz); st.rotation.x = i * Math.PI / 4 + 0.4; G.add(st);
      }
      var rotor = new THREE.Group(); rotor.name = "rotor";
      rotor.position.set(fx + 0.15, fy, fz);
      tube(rotor, 0.42, 0.32, 1.0, "x", 0, 0, 0, steelMat, 10);
      for (i = 0; i < 4; i++) {
        var arm = new THREE.Group(); arm.rotation.x = i * Math.PI / 2;
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.75, 0.62), darkMat);
        bl.position.set(0, 1.05, 0); bl.rotation.y = 0.5;
        arm.add(bl); rotor.add(arm);
      }
      G.add(rotor);
      for (i = 0; i < 3; i++) {                                        /* air rudders astern of the duct */
        var rv = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.14, 3.7), hullMat);
        rv.position.set(fx - 2.0, fy - 1.5 + i * 1.5, fz); G.add(rv);
      }
    }

    /* ---------------- bow ramp (raised) and stern ramp (lowered) ---------------- */
    var bowR = new THREE.Group(); bowR.position.set(12.5, 0, 2.55); bowR.rotation.y = -1.05;
    bx(bowR, 5.0, 8.9, 0.3, 2.4, 0, 0, hullMat);
    bx(bowR, 0.3, 8.9, 0.5, 4.8, 0, 0.3, darkMat);
    for (i = 0; i < 5; i++) bx(bowR, 4.8, 0.16, 0.16, 2.4, -3.6 + i * 1.8, 0.22, darkMat);
    G.add(bowR);
    var stnR = new THREE.Group(); stnR.position.set(-11.8, 0, 2.55); stnR.rotation.y = -0.22;
    bx(stnR, 3.6, 8.6, 0.28, -1.7, 0, 0, hullMat);
    for (i = 0; i < 4; i++) bx(stnR, 3.4, 0.16, 0.16, -1.7, -3.2 + i * 2.1, 0.2, darkMat);
    G.add(stnR);

    /* ---------------- lashed cargo in the lane ---------------- */
    var veh = new THREE.Group(); veh.position.set(0.4, 0, 2.62);
    bx(veh, 6.6, 2.5, 1.35, 0, 0, 1.5, oliveMat);
    bx(veh, 2.0, 2.4, 0.85, 2.1, 0, 2.55, oliveMat);                  /* cab */
    bx(veh, 0.16, 2.2, 0.62, 3.02, 0, 2.6, winMat);                   /* windscreen */
    bx(veh, 3.4, 2.3, 0.9, -1.4, 0, 2.6, oliveMat);                   /* cargo box */
    bx(veh, 0.3, 2.6, 0.3, 3.3, 0, 1.15, darkMat);                    /* bumper */
    for (i = 0; i < 6; i++) {
      var wh = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.42, 10), rubMat);
      wh.position.set(-2.4 + (i % 3) * 2.3, (i < 3 ? 1 : -1) * 1.32, 0.65); veh.add(wh);
    }
    G.add(veh);
    for (i = 0; i < 4; i++) {                                          /* lashing chains */
      var ch = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.4, 4), steelMat);
      ch.position.set(0.4 + (i < 2 ? 2.6 : -2.6), (i % 2 ? 1 : -1) * 2.2, 3.35);
      ch.rotation.set((i % 2 ? 1 : -1) * 0.7, 0, (i < 2 ? 1 : -1) * 0.45);
      G.add(ch);
    }
    for (i = 0; i < 4; i++) {                                          /* palletised stores aft */
      bx(G, 1.5, 1.2, 1.1, -7.5 + (i % 2) * 1.7, (i < 2 ? 1 : -1) * 1.6, 3.15, oliveMat);
    }
    for (i = 0; i < 3; i++) tube(G, 0.32, 0.32, 0.92, "z", -9.6, -2.4 + i * 2.4, 3.05, darkMat, 8);

    return G;
  }
};

BLD_MODELS["missilesilo"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var seed = 7717;
    function rnd() { seed = (seed * 48271) % 2147483647; return seed / 2147483647; }
    function concTex(base, rep) {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var p = cv.getContext("2d");
      var i;
      p.fillStyle = base; p.fillRect(0, 0, 256, 256);
      for (i = 0; i < 26; i++) {
        p.globalAlpha = 0.04 + rnd() * 0.05;
        p.fillStyle = rnd() < 0.5 ? "#e8e6dc" : "#181a16";
        p.fillRect(rnd() * 256, rnd() * 256, 26 + rnd() * 80, 18 + rnd() * 60);
      }
      p.globalAlpha = 1;
      p.strokeStyle = "rgba(24,26,22,0.42)"; p.lineWidth = 2;
      p.beginPath();
      p.moveTo(0, 128); p.lineTo(256, 128); p.moveTo(128, 0); p.lineTo(128, 256);
      p.stroke();
      p.strokeStyle = "rgba(24,26,22,0.2)"; p.lineWidth = 1;
      for (i = 0; i < 5; i++) {
        p.beginPath();
        var sx = rnd() * 256, sy = rnd() * 256;
        p.moveTo(sx, sy);
        p.lineTo(sx + 20 + rnd() * 60, sy + (rnd() - 0.5) * 70);
        p.stroke();
      }
      p.fillStyle = "rgba(0,0,0,0.16)";
      for (i = 0; i < 160; i++) p.fillRect(rnd() * 256, rnd() * 256, 2, 2);
      for (i = 0; i < 14; i++) {
        p.fillStyle = "rgba(30,26,18,0.10)";
        p.fillRect(rnd() * 256, rnd() * 256, 6 + rnd() * 26, 24 + rnd() * 60);
      }
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(rep, rep);
      return t;
    }
    function apronTex() {
      var W = 512;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = W;
      var p = cv.getContext("2d");
      var i, j;
      p.fillStyle = "#585d55"; p.fillRect(0, 0, W, W);
      for (i = 0; i < 40; i++) {
        p.globalAlpha = 0.04 + rnd() * 0.05;
        p.fillStyle = rnd() < 0.5 ? "#e6e4d8" : "#171915";
        p.fillRect(rnd() * W, rnd() * W, 30 + rnd() * 120, 24 + rnd() * 90);
      }
      p.globalAlpha = 1;
      p.strokeStyle = "rgba(22,24,20,0.45)"; p.lineWidth = 2;
      for (i = 1; i < 8; i++) {
        p.beginPath(); p.moveTo(i * W / 8, 0); p.lineTo(i * W / 8, W); p.stroke();
        p.beginPath(); p.moveTo(0, i * W / 8); p.lineTo(W, i * W / 8); p.stroke();
      }
      /* hazard ring around the shaft */
      p.lineWidth = 16;
      p.strokeStyle = "#b89a24";
      p.beginPath(); p.arc(W / 2, W / 2, 96, 0, Math.PI * 2); p.stroke();
      p.lineWidth = 16;
      p.strokeStyle = "#1c1e1a";
      p.setLineDash([18, 18]);
      p.beginPath(); p.arc(W / 2, W / 2, 96, 0, Math.PI * 2); p.stroke();
      p.setLineDash([]);
      p.strokeStyle = "rgba(200,190,170,0.5)"; p.lineWidth = 3;
      p.beginPath(); p.arc(W / 2, W / 2, 130, 0, Math.PI * 2); p.stroke();
      /* stencilled markings */
      p.fillStyle = "rgba(214,210,190,0.55)";
      p.font = "bold 22px sans-serif";
      p.fillText("KEEP CLEAR", 176, 396);
      p.fillText("LF-07", 226, 130);
      p.font = "bold 15px sans-serif";
      p.fillText("BLAST ZONE", 44, 470);
      p.fillText("BLAST ZONE", 380, 60);
      /* scorch and tyre scuffs */
      for (i = 0; i < 22; i++) {
        p.fillStyle = "rgba(16,16,14,0.13)";
        p.fillRect(rnd() * W, rnd() * W, 8 + rnd() * 60, 5 + rnd() * 16);
      }
      for (j = 0; j < 3; j++) {
        p.fillStyle = "rgba(12,12,10,0.10)";
        p.fillRect(60 + j * 120, 20, 26, W - 40);
      }
      p.fillStyle = "rgba(0,0,0,0.12)";
      for (i = 0; i < 300; i++) p.fillRect(rnd() * W, rnd() * W, 2, 2);
      return new THREE.CanvasTexture(cv);
    }
    function hazTex(a, b, rep) {
      var cv = document.createElement("canvas");
      cv.width = 64; cv.height = 64;
      var p = cv.getContext("2d");
      p.fillStyle = a; p.fillRect(0, 0, 64, 64);
      p.fillStyle = b;
      var i;
      for (i = -2; i < 6; i++) {
        p.save();
        p.translate(i * 22, 0);
        p.rotate(0.5);
        p.fillRect(0, -40, 11, 140);
        p.restore();
      }
      p.fillStyle = "rgba(0,0,0,0.16)";
      for (i = 0; i < 40; i++) p.fillRect(rnd() * 64, rnd() * 64, 2, 2);
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(rep || 4, 1);
      return t;
    }
    function signTex(l1, l2) {
      var cv = document.createElement("canvas");
      cv.width = 128; cv.height = 96;
      var p = cv.getContext("2d");
      p.fillStyle = "#c6ab2c"; p.fillRect(0, 0, 128, 96);
      p.fillStyle = "#17190f"; p.fillRect(6, 6, 116, 84);
      p.fillStyle = "#c6ab2c";
      p.font = "bold 19px sans-serif";
      p.fillText(l1, 14, 42);
      p.font = "bold 14px sans-serif";
      p.fillText(l2, 14, 66);
      return new THREE.CanvasTexture(cv);
    }
    var concMat = new THREE.MeshStandardMaterial({ map: concTex("#565b54", 3), metalness: 0.05, roughness: 0.92 });
    var conc2Mat = new THREE.MeshStandardMaterial({ map: concTex("#4d5249", 2), metalness: 0.05, roughness: 0.9 });
    var apronMat = new THREE.MeshStandardMaterial({ map: apronTex(), metalness: 0.05, roughness: 0.94 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x3c4145, metalness: 0.85, roughness: 0.32 });
    var darkMat = new THREE.MeshStandardMaterial({ color: 0x14161a, metalness: 0.2, roughness: 0.85 });
    var voidMat = new THREE.MeshStandardMaterial({ color: 0x08090b, metalness: 0.1, roughness: 0.95, side: THREE.DoubleSide });
    var hazMat = new THREE.MeshStandardMaterial({ map: hazTex("#c2a52c", "#1b1c18", 6), metalness: 0.1, roughness: 0.8 });
    var missMat = new THREE.MeshStandardMaterial({ color: 0xb4b8bb, metalness: 0.35, roughness: 0.45 });
    var lampMat = new THREE.MeshStandardMaterial({ color: 0xffedc0, emissive: 0x6b5a1e, metalness: 0.3, roughness: 0.4 });
    var teamMat = new THREE.MeshStandardMaterial({ color: C.team, metalness: 0.3, roughness: 0.6 });
    function bx(sx, sy, sz, x, y, z, mat, parent) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
      m.position.set(x, y, z);
      (parent || g).add(m);
      return m;
    }
    function cyl(r1, r2, h, x, y, z, mat, parent, axis, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, h, seg || 12, 1, !!open);
      if (axis === "x") geo.rotateZ(Math.PI / 2);
      else if (axis === "z") geo.rotateX(Math.PI / 2);
      var m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      (parent || g).add(m);
      return m;
    }
    function tube(ax, ay, az, bxx, by, bz, r, mat, parent) {
      var dx = bxx - ax, dy = by - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 6), mat);
      m.position.set((ax + bxx) / 2, (ay + by) / 2, (az + bz) / 2);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
      (parent || g).add(m);
      return m;
    }
    function ringMesh(ri, ro, z, mat, seg) {
      var m = new THREE.Mesh(new THREE.RingGeometry(ri, ro, seg || 32), mat);
      m.position.z = z;
      g.add(m);
      return m;
    }
    function railing(x0, y0, x1, y1, z, n, parent) {
      var i, dx = (x1 - x0), dy = (y1 - y0);
      var L = Math.sqrt(dx * dx + dy * dy);
      for (i = 0; i < n; i++) {
        var t = i / (n - 1);
        cyl(0.035, 0.035, 1.05, x0 + dx * t, y0 + dy * t, z + 0.52, steelMat, parent, "z", 5, true);
      }
      tube(x0, y0, z + 1.02, x1, y1, z + 1.02, 0.03, steelMat, parent);
      tube(x0, y0, z + 0.56, x1, y1, z + 0.56, 0.026, steelMat, parent);
    }
    var i, s, a;
    // ---- hardened apron ---------------------------------------------------
    bx(40, 40, 0.5, 0, 0, 0.25, concMat);
    var top = bx(39.2, 39.2, 0.06, 0, 0, 0.53, apronMat);
    for (s = -1; s <= 1; s += 2) {
      bx(40, 0.7, 0.75, 0, s * 19.65, 0.38, conc2Mat);
      bx(0.7, 40, 0.75, s * 19.65, 0, 0.38, conc2Mat);
    }
    // ---- silo collar and shaft -------------------------------------------
    cyl(4.9, 5.2, 2.6, 0, 0, 1.75, conc2Mat, g, "z", 28, true);
    ringMesh(3.3, 4.9, 3.05, conc2Mat, 28);
    cyl(3.3, 3.3, 3.0, 0, 0, 1.55, voidMat, g, "z", 28, true);
    cyl(3.28, 3.28, 0.05, 0, 0, 0.16, darkMat, g, "z", 24);
    for (i = 0; i < 16; i++) {
      a = i / 16 * Math.PI * 2;
      bx(0.16, 0.16, 2.6, Math.cos(a) * 3.18, Math.sin(a) * 3.18, 1.6, steelMat);
    }
    var wr = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.06, 4, 20), steelMat);
    wr.position.z = 1.1;
    g.add(wr);
    // launch tube rim, hold-down bolts, rim hazard band
    var rim = new THREE.Mesh(new THREE.TorusGeometry(3.35, 0.13, 5, 22), steelMat);
    rim.position.z = 3.06;
    g.add(rim);
    for (i = 0; i < 14; i++) {
      a = i / 14 * Math.PI * 2;
      cyl(0.08, 0.08, 0.14, Math.cos(a) * 4.35, Math.sin(a) * 4.35, 3.1, steelMat, g, "z", 6);
    }
    for (i = 0; i < 12; i++) {
      a = i / 12 * Math.PI * 2;
      var hb = bx(0.26, 1.9, 0.55, Math.cos(a) * 5.02, Math.sin(a) * 5.02, 1.35, hazMat);
      hb.rotation.z = a;
    }
    // missile nose cone sitting in the shaft
    var noseG = new THREE.ConeGeometry(1.45, 3.0, 24);
    noseG.rotateX(Math.PI / 2);
    var nose = new THREE.Mesh(noseG, missMat);
    nose.position.set(0, 0, 1.8);
    g.add(nose);
    cyl(1.45, 1.45, 2.0, 0, 0, -0.7, missMat, g, "z", 24);
    cyl(1.14, 1.2, 0.26, 0, 0, 1.0, darkMat, g, "z", 24, true);
    cyl(1.44, 1.44, 0.2, 0, 0, 0.35, darkMat, g, "z", 24, true);
    cyl(0.09, 0.09, 0.34, 0, 0, 3.42, steelMat, g, "z", 8);
    for (i = 0; i < 4; i++) {
      a = i / 4 * Math.PI * 2 + 0.4;
      bx(1.5, 0.4, 0.28, Math.cos(a) * 2.4, Math.sin(a) * 2.4, 1.9, steelMat).rotation.z = a;
      cyl(0.06, 0.06, 1.5, Math.cos(a) * 3.0, Math.sin(a) * 3.0, 2.4, steelMat, g, "z", 6);
    }
    // ---- sliding blast door ----------------------------------------------
    for (s = -1; s <= 1; s += 2) {
      bx(0.7, 17, 0.34, s * 4.3, 8.5, 3.15, steelMat);
      for (i = 0; i < 5; i++) bx(1.5, 1.5, 2.7, s * 4.3, 4.5 + i * 3.1, 1.62, conc2Mat);
    }
    for (i = 0; i < 6; i++) bx(9.4, 0.3, 0.2, 0, 3.0 + i * 2.9, 3.05, steelMat);
    var door = new THREE.Group();
    door.position.set(0, 11.2, 0);
    g.add(door);
    bx(10.2, 10.2, 1.55, 0, 0, 4.12, conc2Mat, door);
    bx(10.4, 2.0, 0.16, 0, -4.1, 4.94, hazMat, door);
    bx(10.4, 2.0, 0.16, 0, 4.1, 4.94, hazMat, door);
    bx(2.0, 6.2, 0.16, -4.1, 0, 4.94, hazMat, door);
    bx(2.0, 6.2, 0.16, 4.1, 0, 4.94, hazMat, door);
    bx(6.2, 6.2, 0.1, 0, 0, 4.92, conc2Mat, door);
    for (s = -1; s <= 1; s += 2) {
      bx(0.24, 10.3, 1.6, s * 5.1, 0, 4.12, steelMat, door);
      bx(10.3, 0.24, 1.6, 0, s * 5.1, 4.12, steelMat, door);
    }
    for (i = 0; i < 5; i++) bx(0.42, 10.2, 0.4, -4.0 + i * 2.0, 0, 3.22, steelMat, door);
    for (i = 0; i < 4; i++) {
      var cx = (i < 2 ? -4.3 : 4.3), cy = (i % 2 ? -3.6 : 3.6);
      bx(1.1, 1.1, 0.5, cx, cy, 3.1, steelMat, door);
      cyl(0.34, 0.34, 0.5, cx, cy, 3.1, darkMat, door, "x", 8, true);
    }
    for (s = -1; s <= 1; s += 2) {
      var eye = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.07, 4, 10), steelMat);
      eye.position.set(s * 3.4, 4.4, 5.1);
      eye.rotation.y = Math.PI / 2;
      door.add(eye);
    }
    bx(2.0, 0.9, 0.6, 0, -5.2, 4.0, steelMat, door);
    // door drive rams running alongside the door path
    for (s = -1; s <= 1; s += 2) {
      bx(1.7, 1.7, 3.1, s * 6.5, 4.2, 1.9, conc2Mat);
      bx(1.2, 1.0, 1.0, s * 6.5, 4.2, 3.9, steelMat);
      cyl(0.4, 0.4, 4.4, s * 6.5, 6.7, 3.85, steelMat, g, "y", 14);
      cyl(0.23, 0.23, 2.8, s * 6.5, 10.2, 3.85, darkMat, g, "y", 10);
      bx(1.1, 1.3, 1.0, s * 5.4, -0.9, 4.0, steelMat, door);
    }
    // ---- blast deflector walls -------------------------------------------
    for (s = -1; s <= 1; s += 2) {
      var wall = bx(1.8, 15, 4.4, s * 12.4, -2.0, 2.5, conc2Mat);
      wall.rotation.y = s * 0.13;
      for (i = 0; i < 4; i++) {
        var but = bx(2.4, 1.2, 3.2, s * 14.0, -8.0 + i * 4.0, 1.9, concMat);
        but.rotation.y = -s * 0.3;
      }
      bx(0.14, 14.6, 0.6, s * 11.45, -2.0, 1.2, hazMat).rotation.y = s * 0.13;
      bx(2.1, 15.2, 0.32, s * 12.4, -2.0, 4.62, steelMat).rotation.y = s * 0.13;
      // exhaust ducting from the shaft to the deflector
      cyl(0.85, 0.85, 5.6, s * 8.4, -5.4, 1.6, steelMat, g, "x", 12);
      bx(2.0, 2.0, 1.4, s * 5.4, -5.4, 1.6, conc2Mat);
    }
    // ---- service gantry with slewing jib ---------------------------------
    var gx = -12.5, gy = -12.5;
    for (i = 0; i < 4; i++) {
      var lx = gx + (i < 2 ? -1.7 : 1.7), ly = gy + (i % 2 ? -1.7 : 1.7);
      cyl(0.18, 0.18, 9.6, lx, ly, 5.3, steelMat, g, "z", 8);
      bx(1.0, 1.0, 0.5, lx, ly, 0.65, concMat);
    }
    for (i = 0; i < 4; i++) {
      var z0 = 1.0 + i * 2.2, z1 = z0 + 2.2;
      tube(gx - 1.7, gy - 1.7, z0, gx + 1.7, gy - 1.7, z1, 0.055, steelMat);
      tube(gx + 1.7, gy + 1.7, z0, gx - 1.7, gy + 1.7, z1, 0.055, steelMat);
      tube(gx - 1.7, gy + 1.7, z0, gx - 1.7, gy - 1.7, z1, 0.055, steelMat);
      tube(gx + 1.7, gy - 1.7, z0, gx + 1.7, gy + 1.7, z1, 0.055, steelMat);
      bx(3.5, 0.1, 0.1, gx, gy - 1.7, z0, steelMat);
      bx(0.1, 3.5, 0.1, gx - 1.7, gy, z0, steelMat);
    }
    bx(4.2, 4.2, 0.16, gx, gy, 10.1, steelMat);
    railing(gx - 2.1, gy - 2.1, gx + 2.1, gy - 2.1, 10.18, 4);
    railing(gx - 2.1, gy + 2.1, gx + 2.1, gy + 2.1, 10.18, 4);
    railing(gx - 2.1, gy - 2.1, gx - 2.1, gy + 2.1, 10.18, 4);
    for (i = 0; i < 10; i++) cyl(0.03, 0.03, 0.8, gx + 2.0, gy, 1.1 + i * 0.9, steelMat, g, "y", 5, true);
    for (s = -1; s <= 1; s += 2) cyl(0.05, 0.05, 9.4, gx + 2.0, gy + s * 0.4, 5.5, steelMat, g, "z", 6);
    var jib = new THREE.Group();
    jib.name = "turret";
    jib.position.set(gx, gy, 10.3);
    g.add(jib);
    cyl(0.9, 0.9, 0.4, 0, 0, 0.2, steelMat, jib, "z", 16);
    bx(2.0, 2.2, 1.1, -1.2, 0, 0.95, steelMat, jib);
    bx(1.9, 2.0, 0.6, -1.2, 0, 1.8, darkMat, jib);
    for (i = 0; i < 5; i++) {
      var jx = 0.6 + i * 1.7;
      tube(jx, -0.35, 0.55, jx + 1.7, 0.35, 1.35, 0.05, steelMat, jib);
      tube(jx, 0.35, 0.55, jx + 1.7, -0.35, 1.35, 0.05, steelMat, jib);
    }
    for (s = -1; s <= 1; s += 2) {
      tube(0.4, s * 0.35, 0.5, 9.2, s * 0.35, 0.62, 0.07, steelMat, jib);
      tube(0.4, s * 0.35, 1.4, 9.2, s * 0.35, 1.4, 0.07, steelMat, jib);
    }
    cyl(0.02, 0.02, 5.0, 8.7, 0, -1.9, steelMat, jib, "z", 6);
    bx(0.5, 0.4, 0.6, 8.7, 0, -4.6, steelMat, jib);
    var hook = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.06, 4, 10), steelMat);
    hook.position.set(8.7, 0, -5.1);
    jib.add(hook);
    // ---- launch control bunker -------------------------------------------
    bx(9, 6.4, 3.0, 12.6, -12.0, 1.7, concMat);
    var roof = bx(9.6, 7.0, 0.5, 12.6, -12.0, 3.4, conc2Mat);
    bx(3.0, 0.3, 1.4, 12.6, -15.3, 3.5, conc2Mat);
    bx(0.35, 2.4, 2.4, 8.05, -12.0, 1.5, steelMat);
    for (i = 0; i < 3; i++) cyl(0.16, 0.16, 0.22, 7.9, -12.9 + i * 0.9, 2.4, steelMat, g, "x", 8);
    bx(1.4, 0.12, 0.5, 12.6, -8.75, 2.6, teamMat);
    for (i = 0; i < 3; i++) {
      cyl(0.5, 0.5, 0.8, 10.0 + i * 2.6, -14.0, 4.0, steelMat, g, "z", 12);
      cyl(0.7, 0.7, 0.16, 10.0 + i * 2.6, -14.0, 4.5, steelMat, g, "z", 12);
    }
    cyl(0.09, 0.09, 7.0, 16.4, -14.4, 7.1, steelMat, g, "z", 8);
    for (i = 0; i < 3; i++) cyl(0.02, 0.02, 1.2, 16.4, -14.4, 8.4 + i * 0.9, steelMat, g, "y", 6);
    bx(0.6, 0.05, 0.45, 16.4, -14.42, 5.4, teamMat);
    // ---- cable trench from bunker to shaft --------------------------------
    bx(10.0, 1.7, 0.14, 6.7, -6.8, 0.5, darkMat).rotation.z = -1.3;
    for (i = 0; i < 8; i++) {
      var t = i / 8;
      var px = 5.4 + t * 2.65, py = -2.0 - t * 9.6;
      if (i !== 3 && i !== 6) {
        var cp = bx(1.15, 1.7, 0.16, px, py, 0.58, steelMat);
        cp.rotation.z = -1.3;
      }
    }
    bx(1.4, 1.4, 0.9, 5.7, -2.7, 1.0, steelMat);
    bx(1.2, 1.2, 0.8, 8.0, -10.9, 0.95, steelMat);
    // ---- floodlight masts, signs, ground clutter --------------------------
    function flood(x, y, ang) {
      cyl(0.16, 0.2, 9.0, x, y, 4.7, steelMat, g, "z", 8);
      bx(0.9, 0.9, 0.3, x, y, 0.65, concMat);
      var head = new THREE.Group();
      head.position.set(x, y, 9.2);
      head.rotation.z = ang;
      g.add(head);
      bx(2.4, 0.3, 0.3, 0, 0, 0, steelMat, head);
      for (s = -1; s <= 1; s += 2) {
        bx(0.5, 0.6, 0.5, s * 0.9, 0.1, 0.3, steelMat, head);
        bx(0.44, 0.1, 0.44, s * 0.9, -0.24, 0.3, lampMat, head);
      }
    }
    flood(-17.0, 17.0, -0.8);
    flood(17.0, 17.0, 0.8);
    flood(-17.0, -17.0, 0.8);
    flood(17.5, 8.0, 3.1);
    var signMat = new THREE.MeshStandardMaterial({ map: signTex("RESTRICTED", "LAUNCH FACILITY"), metalness: 0.2, roughness: 0.7 });
    for (i = 0; i < 2; i++) {
      var sx2 = -18.0, sy2 = -4.0 + i * 9.0;
      cyl(0.07, 0.07, 2.2, sx2, sy2, 1.6, steelMat, g, "z", 6);
      bx(0.08, 1.6, 1.1, sx2, sy2, 2.6, signMat);
    }
    // crates, cable spool and gas bottles beside the gantry
    for (i = 0; i < 3; i++) {
      bx(1.8, 1.4, 0.9, -9.0 + i * 0.4, -16.5 + i * 2.0, 0.98, steelMat).rotation.z = rnd() * 0.4;
    }
    cyl(1.5, 1.5, 1.4, -15.5, -6.0, 1.25, darkMat, g, "x", 16);
    cyl(1.8, 1.8, 0.14, -16.25, -6.0, 1.25, steelMat, g, "x", 16);
    cyl(1.8, 1.8, 0.14, -14.75, -6.0, 1.25, steelMat, g, "x", 16);
    for (i = 0; i < 6; i++) cyl(0.24, 0.24, 1.5, -6.0 - (i % 3) * 0.55, 15.0 + Math.floor(i / 3) * 0.55, 1.3, steelMat, g, "z", 8);
    bx(2.4, 1.6, 0.2, -6.4, 15.2, 0.62, steelMat);
    // collar-side railings and rim beacons
    railing(-6.2, -6.2, -6.2, 6.2, 0.56, 5);
    railing(6.2, -6.2, 6.2, 6.2, 0.56, 5);
    for (i = 0; i < 4; i++) {
      a = i / 4 * Math.PI * 2 + Math.PI / 4;
      cyl(0.16, 0.16, 0.3, Math.cos(a) * 4.6, Math.sin(a) * 4.6, 3.28, steelMat, g, "z", 8);
      cyl(0.13, 0.13, 0.22, Math.cos(a) * 4.6, Math.sin(a) * 4.6, 3.52, new THREE.MeshStandardMaterial({ color: 0xd44a32, emissive: 0x5e1408, metalness: 0.3, roughness: 0.45 }), g, "z", 8);
    }
    return g;
  }
};

BLD_MODELS["navalyard"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var SD = 61403, i, j, s, a;
    function rn() { SD = (SD * 16807) % 2147483647; return (SD % 10000) / 10000; }
    function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
    function tex(c, rx, ry) {
      var t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (rx) t.repeat.set(rx, ry);
      return t;
    }
    function patches(x, w, h, n, lt, dk) {
      for (var q = 0; q < n; q++) {
        x.globalAlpha = 0.04 + rn() * 0.04;
        x.fillStyle = (q % 3 === 0) ? lt : dk;
        x.fillRect(rn() * w, rn() * h, w * 0.05 + rn() * w * 0.24, h * 0.04 + rn() * h * 0.2);
      }
      x.globalAlpha = 1;
    }
    function seams(x, w, h, cols, rows, col) {
      x.globalAlpha = 0.5; x.strokeStyle = col || "#20241e"; x.lineWidth = 2; x.beginPath();
      for (var q = 1; q < cols; q++) { x.moveTo(q * w / cols, 0); x.lineTo(q * w / cols, h); }
      for (q = 1; q < rows; q++) { x.moveTo(0, q * h / rows); x.lineTo(w, q * h / rows); }
      x.stroke(); x.globalAlpha = 1;
    }
    function drips(x, w, h, n, col) {
      x.fillStyle = col || "#15180f";
      for (var q = 0; q < n; q++) {
        x.globalAlpha = 0.05 + rn() * 0.09;
        x.fillRect(rn() * w, rn() * h * 0.5, 1 + rn() * 4, h * 0.08 + rn() * h * 0.3);
      }
      x.globalAlpha = 1;
    }
    function hazard(x, px, py, pw, ph, step) {
      x.save(); x.beginPath(); x.rect(px, py, pw, ph); x.clip();
      x.globalAlpha = 0.94; x.fillStyle = "#c9a825"; x.fillRect(px, py, pw, ph);
      x.fillStyle = "#191a16";
      for (var q = -2; q < (pw + ph) / step + 2; q++) {
        var bx = px + q * step;
        x.beginPath();
        x.moveTo(bx, py); x.lineTo(bx + step * 0.5, py);
        x.lineTo(bx + step * 0.5 + ph, py + ph); x.lineTo(bx + ph, py + ph);
        x.closePath(); x.fill();
      }
      x.globalAlpha = 1; x.restore();
    }

    /* ---------------- textures ---------------- */
    var ac = cvs(512, 512), ax = ac.getContext("2d");
    ax.fillStyle = "#565b54"; ax.fillRect(0, 0, 512, 512);
    patches(ax, 512, 512, 42, "#7f8479", "#31352e");
    ax.globalAlpha = 0.38; ax.strokeStyle = "#2b2e28"; ax.lineWidth = 3; ax.beginPath();
    for (i = 1; i < 8; i++) { ax.moveTo(i * 64, 0); ax.lineTo(i * 64, 512); ax.moveTo(0, i * 64); ax.lineTo(512, i * 64); }
    ax.stroke(); ax.globalAlpha = 1;
    ax.globalAlpha = 0.7; ax.fillStyle = "#cdc9b4";
    ax.fillRect(60, 120, 6, 300); ax.fillRect(240, 120, 6, 300);
    for (i = 0; i < 8; i++) ax.fillRect(150, 130 + i * 36, 5, 20);
    ax.font = "bold 34px sans-serif"; ax.textAlign = "center";
    ax.fillText("SLIP 1", 360, 200);
    ax.globalAlpha = 1;
    hazard(ax, 300, 430, 190, 20, 24);
    ax.globalAlpha = 0.16; ax.fillStyle = "#0a0c08";
    for (i = 0; i < 26; i++) ax.fillRect(rn() * 512, rn() * 512, 26 + rn() * 110, 4 + rn() * 8);
    ax.fillStyle = "#2c3a2a";
    for (i = 0; i < 16; i++) {
      ax.globalAlpha = 0.08 + rn() * 0.12;
      ax.beginPath(); ax.ellipse(rn() * 512, rn() * 512, 10 + rn() * 30, 8 + rn() * 20, rn() * 3, 0, 6.283); ax.fill();
    }
    ax.globalAlpha = 1;
    var apronTex = tex(ac);

    /* wet, algae-stained slipway concrete */
    var sc = cvs(256, 256), sx = sc.getContext("2d");
    sx.fillStyle = "#4f544c"; sx.fillRect(0, 0, 256, 256);
    patches(sx, 256, 256, 30, "#767b70", "#252a22");
    sx.globalAlpha = 0.5; sx.strokeStyle = "#23271f"; sx.lineWidth = 3; sx.beginPath();
    for (i = 1; i < 10; i++) { sx.moveTo(0, i * 26); sx.lineTo(256, i * 26); }
    for (i = 1; i < 4; i++) { sx.moveTo(i * 64, 0); sx.lineTo(i * 64, 256); }
    sx.stroke(); sx.globalAlpha = 1;
    sx.fillStyle = "#33452c";
    for (i = 0; i < 34; i++) {
      sx.globalAlpha = 0.1 + rn() * 0.22;
      sx.fillRect(rn() * 256, 128 + rn() * 128, 8 + rn() * 40, 10 + rn() * 60);
    }
    sx.globalAlpha = 1;
    var slipTex = tex(sc, 3, 3);

    var wc = cvs(256, 256), wx = wc.getContext("2d");
    wx.fillStyle = "#6d7378"; wx.fillRect(0, 0, 256, 256);
    patches(wx, 256, 256, 26, "#a9aeb0", "#26292b");
    seams(wx, 256, 256, 6, 4, "#2c3033");
    for (i = 0; i < 4; i++) {
      var wxx = 26 + i * 56, wyy = 54;
      wx.fillStyle = "#1c252a"; wx.fillRect(wxx, wyy, 40, 32);
      wx.globalAlpha = 0.22; wx.fillStyle = "#a3b6c0"; wx.fillRect(wxx + 2, wyy + 2, 18, 13); wx.globalAlpha = 1;
      wx.strokeStyle = "#818792"; wx.lineWidth = 2; wx.strokeRect(wxx, wyy, 40, 32);
    }
    drips(wx, 256, 256, 24);
    var wallTex = tex(wc);

    var rc = cvs(256, 256), rx = rc.getContext("2d");
    rx.fillStyle = "#4b5054"; rx.fillRect(0, 0, 256, 256);
    rx.globalAlpha = 0.32; rx.strokeStyle = "#2b2f31"; rx.lineWidth = 2;
    for (i = 0; i < 64; i++) { rx.beginPath(); rx.moveTo(i * 4, 0); rx.lineTo(i * 4, 256); rx.stroke(); }
    rx.globalAlpha = 1;
    patches(rx, 256, 256, 22, "#787d7f", "#6a4a2a");
    var roofTex = tex(rc, 3, 3);

    var lc = cvs(64, 64), lx = lc.getContext("2d");
    lx.clearRect(0, 0, 64, 64);
    lx.strokeStyle = "rgba(198,204,206,0.98)"; lx.lineWidth = 3;
    for (i = -64; i < 128; i += 16) {
      lx.beginPath(); lx.moveTo(i, 0); lx.lineTo(i + 64, 64); lx.stroke();
      lx.beginPath(); lx.moveTo(i, 64); lx.lineTo(i + 64, 0); lx.stroke();
    }

    /* ---------------- materials ---------------- */
    var apronM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: apronTex, roughness: 0.9, metalness: 0.02 });
    var slipM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: slipTex, roughness: 0.92, metalness: 0.02 });
    var conc = new THREE.MeshStandardMaterial({ color: 0xffffff, map: wallTex, roughness: 0.78, metalness: 0.06 });
    var roofM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: roofTex, roughness: 0.6, metalness: 0.3 });
    var plainM = new THREE.MeshStandardMaterial({ color: 0x565b54, roughness: 0.88, metalness: 0.02 });
    var steel = new THREE.MeshStandardMaterial({ color: 0x8b908b, roughness: 0.3, metalness: 0.85 });
    var haze = new THREE.MeshStandardMaterial({ color: 0x6d7378, roughness: 0.55, metalness: 0.35 });
    var paint = new THREE.MeshStandardMaterial({ color: 0xbb8a20, roughness: 0.55, metalness: 0.3 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x2a2d2a, roughness: 0.6, metalness: 0.4 });
    var rustM = new THREE.MeshStandardMaterial({ color: 0x6d4c30, roughness: 0.85, metalness: 0.25 });
    var wood = new THREE.MeshStandardMaterial({ color: 0x6d5c3f, roughness: 0.85, metalness: 0.02 });
    var teamM = new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.55, metalness: 0.15 });
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x1b262c, roughness: 0.18, metalness: 0.2 });
    var lampM = new THREE.MeshStandardMaterial({ color: 0xf4eecb, emissive: 0x6a6440, roughness: 0.4, metalness: 0.2 });
    var ropeM = new THREE.MeshStandardMaterial({ color: 0x8a7f63, roughness: 0.95, metalness: 0.0 });
    var drumCache = {};

    function box(w, d, h, m) { return new THREE.Mesh(new THREE.BoxGeometry(w, d, h), m); }
    function at(mesh, x, y, z, p) { mesh.position.set(x, y, z); (p || g).add(mesh); return mesh; }
    function cylZ(r1, r2, h, m, sg) { var ge = new THREE.CylinderGeometry(r1, r2, h, sg || 10); ge.rotateX(Math.PI / 2); return new THREE.Mesh(ge, m); }
    function cylX(r1, r2, l, m, sg) { var ge = new THREE.CylinderGeometry(r1, r2, l, sg || 8); ge.rotateZ(-Math.PI / 2); return new THREE.Mesh(ge, m); }
    function rib(R, tube, mat) {
      var ge = new THREE.TorusGeometry(R, tube, 4, 10, Math.PI);
      ge.rotateX(-Math.PI / 2); ge.rotateZ(Math.PI / 2);
      return new THREE.Mesh(ge, mat);
    }
    function railLine(px, py, len, ang, hgt, parent) {
      var grp = new THREE.Group(); grp.position.set(px, py, 0); grp.rotation.z = ang; (parent || g).add(grp);
      var n = Math.max(2, Math.round(len / 2.2));
      for (var q = 0; q <= n; q++) at(cylZ(0.04, 0.04, hgt, steel, 4), -len / 2 + len * q / n, 0, hgt / 2, grp);
      at(cylX(0.035, 0.035, len, steel, 4), 0, 0, hgt, grp);
      at(cylX(0.03, 0.03, len, steel, 4), 0, 0, hgt * 0.55, grp);
      return grp;
    }
    function drum(px, py, pz, col) {
      var m = drumCache[col] || (drumCache[col] = new THREE.MeshStandardMaterial({ color: col, roughness: 0.6, metalness: 0.35 }));
      at(cylZ(0.3, 0.3, 0.92, m, 10), px, py, pz + 0.46);
      at(cylZ(0.32, 0.32, 0.07, dark, 10), px, py, pz + 0.62);
    }
    function crate(px, py, pz, sx2, sy2, sz2, rot, mat) {
      var c = box(sx2, sy2, sz2, mat || wood); c.position.set(px, py, pz + sz2 / 2); c.rotation.z = rot || 0; g.add(c);
      var b1 = box(sx2 + 0.05, 0.07, 0.09, dark); b1.position.set(px, py, pz + sz2 * 0.72); b1.rotation.z = rot || 0; g.add(b1);
    }
    function fenceRun(x0, y0, x1, y1, h) {
      var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), an = Math.atan2(dy, dx);
      var t = tex(lc, L / 2.2, h / 2.2);
      var m = new THREE.MeshStandardMaterial({ color: 0x9aa0a2, map: t, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 0.5, metalness: 0.6 });
      var ge = new THREE.PlaneGeometry(L, h); ge.rotateX(Math.PI / 2);
      var mesh = new THREE.Mesh(ge, m);
      mesh.position.set((x0 + x1) / 2, (y0 + y1) / 2, h / 2 + 0.4); mesh.rotation.z = an; g.add(mesh);
      var rail = cylX(0.05, 0.05, L, steel, 5);
      rail.position.set((x0 + x1) / 2, (y0 + y1) / 2, h + 0.4); rail.rotation.z = an; g.add(rail);
      var n = Math.max(2, Math.round(L / 5));
      for (var q = 0; q <= n; q++) at(cylZ(0.07, 0.07, h + 0.3, steel, 5), x0 + dx * q / n, y0 + dy * q / n, (h + 0.3) / 2 + 0.4);
    }
    function floodlight(px, py, hgt, ang) {
      var p = new THREE.Group(); p.position.set(px, py, 0); p.rotation.z = ang; g.add(p);
      at(cylZ(0.5, 0.6, 0.6, plainM, 8), 0, 0, 0.55, p);
      at(cylZ(0.14, 0.19, hgt, steel, 6), 0, 0, hgt / 2 + 0.6, p);
      at(box(0.24, 1.8, 0.2, steel), 0, 0, hgt + 0.7, p);
      for (var q = -1; q <= 1; q += 2) {
        at(box(0.4, 0.6, 0.46, dark), -0.1, q * 0.55, hgt + 1.0, p);
        at(box(0.06, 0.5, 0.36, lampM), 0.13, q * 0.55, hgt + 1.0, p);
      }
    }
    function bollard(px, py) {
      at(cylZ(0.34, 0.3, 1.05, dark, 10), px, py, 0.95);
      at(cylZ(0.44, 0.44, 0.16, dark, 10), px, py, 1.5);
      at(cylZ(0.5, 0.5, 0.16, plainM, 10), px, py, 0.5);
    }

    /* ---------------- quay decks ---------------- */
    at(new THREE.Mesh(new THREE.BoxGeometry(36, 58, 0.8), [plainM, plainM, plainM, plainM, apronM, plainM]), 11.0, 0, 0.4);
    for (s = -1; s <= 1; s += 2) {
      at(new THREE.Mesh(new THREE.BoxGeometry(22, 15, 0.8), [plainM, plainM, plainM, plainM, apronM, plainM]), -18.0, s * 21.5, 0.4);
      /* quay wall to the water */
      at(box(1.2, 15, 3.2, plainM), -28.4, s * 21.5, -0.8);
      at(box(0.5, 15, 0.4, paint), -28.9, s * 21.5, 0.65);
      /* slipway retaining wall */
      at(box(22, 1.2, 2.4, plainM), -18.0, s * 14.6, -0.4);
      at(box(22, 0.5, 0.35, paint), -18.0, s * 14.0, 0.95);
    }

    /* ---------------- slipway ramp (down toward -X) ---------------- */
    var slope = 0.142;
    var ramp = new THREE.Group(); ramp.position.set(-6.0, 0, 0.2); ramp.rotation.y = -slope; g.add(ramp);
    at(new THREE.Mesh(new THREE.BoxGeometry(23.5, 27, 0.7), [plainM, plainM, plainM, plainM, slipM, plainM]), -11.6, 0, -0.35, ramp);
    /* keel ways / launch rails and cross timbers */
    for (s = -1; s <= 1; s += 2) {
      at(box(23.0, 1.1, 0.28, plainM), -11.6, s * 4.6, 0.14, ramp);
      at(cylX(0.14, 0.14, 23.0, steel, 6), -11.6, s * 4.6, 0.36, ramp);
    }
    for (i = 0; i < 9; i++) at(box(0.5, 11.0, 0.22, wood), -21.0 + i * 2.4, 0, 0.1, ramp);
    /* winch house at the head of the slip */
    at(box(3.4, 5.0, 2.4, plainM), -1.2, 9.0, 1.4);
    at(box(3.8, 5.4, 0.28, roofM), -1.2, 9.0, 2.75);
    at(cylX(0.75, 0.75, 3.2, steel, 12), -1.2, 6.2, 1.5).rotation.z = Math.PI / 2;
    at(cylX(0.95, 0.95, 0.2, dark, 12), -1.2, 4.7, 1.5).rotation.z = Math.PI / 2;
    at(cylX(0.95, 0.95, 0.2, dark, 12), -1.2, 7.7, 1.5).rotation.z = Math.PI / 2;

    /* ---------------- keel blocks + partial hull frame ---------------- */
    var keelZ = 1.35;
    for (i = 0; i < 8; i++) {
      var kx = -20.5 + i * 2.6;
      at(box(1.7, 3.2, 1.0, plainM), kx, 0, 0.5, ramp);
      at(box(1.5, 3.4, 0.35, wood), kx, 0, 1.15, ramp);
    }
    /* keel bar with rising stem (slab in the XZ plane) */
    var keel = new THREE.Mesh(M.slab(THREE, [
      [-21.6, 1.3], [-3.4, 1.3], [-1.4, 4.4], [-1.0, 6.6], [-1.9, 6.6], [-2.6, 4.3], [-4.2, 2.1], [-21.6, 2.1]
    ], 0.55, "xz"), rustM);
    at(keel, 0, 0.28, 0, ramp);
    /* transverse frames */
    var radii = [4.9, 5.2, 5.3, 5.2, 4.8, 4.0, 2.9, 1.9];
    for (i = 0; i < radii.length; i++) {
      var rx2 = -20.0 + i * 2.55;
      at(rib(radii[i], 0.16, rustM), rx2, 0, keelZ + radii[i] * 0.02 + 1.0, ramp);
      /* frame heads / deck beam */
      at(box(0.3, radii[i] * 2, 0.22, rustM), rx2, 0, keelZ + 1.0, ramp);
    }
    /* longitudinal stringers following the frames */
    for (s = -1; s <= 1; s += 2) {
      at(box(19.0, 0.22, 0.22, rustM), -12.0, s * 4.9, 2.6, ramp);
      at(box(17.0, 0.22, 0.22, rustM), -13.0, s * 3.4, 5.0, ramp);
      at(box(15.0, 0.2, 0.2, rustM), -14.0, s * 1.7, 6.2, ramp);
    }
    /* part-plated bow section */
    at(box(4.4, 3.0, 3.2, rustM), -4.6, 0, 3.0, ramp).rotation.y = 0.18;
    at(box(3.0, 5.6, 0.3, rustM), -8.4, 0, 5.6, ramp);
    /* staging scaffolds either side of the hull */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) {
      var scx = -18.5 + i * 5.5;
      for (j = -1; j <= 1; j += 2) at(box(0.16, 0.16, 6.4, steel), scx + j * 1.0, s * 7.0, 3.4, ramp);
      at(box(2.6, 1.7, 0.14, wood), scx, s * 7.0, 3.4, ramp);
      at(box(2.6, 1.7, 0.14, wood), scx, s * 7.0, 6.0, ramp);
      at(box(2.4, 0.1, 0.1, steel), scx, s * 6.2, 4.1, ramp);
      at(box(2.4, 0.1, 0.1, steel), scx, s * 6.2, 6.7, ramp);
    }

    /* ---------------- gantry crane on rails ---------------- */
    for (s = -1; s <= 1; s += 2) {
      at(box(44, 1.6, 0.5, plainM), 5.0, s * 16.5, 1.05);
      at(cylX(0.16, 0.16, 44, steel, 6), 5.0, s * 16.5, 1.4);
      for (i = 0; i < 6; i++) at(box(0.4, 2.0, 0.3, dark), -14.0 + i * 8.0, s * 16.5, 1.05);
    }
    var gantry = new THREE.Group(); gantry.position.set(2.0, 0, 0); g.add(gantry);
    for (s = -1; s <= 1; s += 2) {
      /* bogies */
      at(box(5.2, 2.2, 1.0, dark), 0, s * 16.5, 1.9, gantry);
      for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2) {
        at(cylX(0.5, 0.5, 0.4, steel, 10), i * 1.8, s * 16.5 + j * 0.8, 1.45, gantry).rotation.z = Math.PI / 2;
      }
      /* splayed legs */
      for (i = -1; i <= 1; i += 2) {
        var leg = box(0.9, 0.9, 17.4, haze);
        leg.position.set(i * 1.5, s * 15.85, 11.0); leg.rotation.y = i * 0.09; leg.rotation.x = -s * 0.02;
        gantry.add(leg);
      }
      for (i = 0; i < 4; i++) {
        at(box(4.6, 0.35, 0.35, steel), 0, s * 15.85, 4.6 + i * 3.6, gantry);
        var dg = box(5.4, 0.28, 0.28, steel);
        dg.position.set(0, s * 15.85, 6.4 + i * 3.6); dg.rotation.y = (i % 2 ? 1 : -1) * 0.72; gantry.add(dg);
      }
      at(box(3.0, 2.0, 0.6, steel), 0, s * 15.85, 19.6, gantry);
    }
    /* portal girder + walkway */
    at(box(3.4, 34.5, 2.2, haze), 0, 0, 20.9, gantry);
    at(box(2.2, 34.5, 0.5, steel), 0, 0, 19.5, gantry);
    for (i = 0; i < 11; i++) at(box(0.5, 0.3, 1.5, steel), 0, -15.0 + i * 3.0, 20.0, gantry);
    at(box(1.4, 34.5, 0.16, steel), 2.2, 0, 22.1, gantry);
    railLine(2.2, 0, 34.0, Math.PI / 2, 1.05, gantry).position.set(2.9, 0, 22.2);
    at(box(3.6, 34.8, 0.4, paint), 0, 0, 22.1, gantry);
    /* trolley, hoist ropes and hook block */
    var trolley = new THREE.Group(); trolley.position.set(0, -4.5, 19.4); gantry.add(trolley);
    at(box(2.6, 3.2, 1.2, dark), 0, 0, 0.2, trolley);
    at(cylX(0.55, 0.55, 1.6, steel, 10), 0, 0, 0.3, trolley);
    for (i = -1; i <= 1; i += 2) at(cylZ(0.04, 0.04, 11.0, dark, 4), 0, i * 0.6, -6.0, trolley);
    at(box(1.5, 1.3, 1.0, paint), 0, 0, -11.9, trolley);
    at(new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.11, 5, 10), steel), 0, 0, -12.8, trolley).rotation.x = Math.PI / 2;
    /* operator cab and warning light */
    at(box(2.4, 2.6, 2.6, paint), 1.6, -13.0, 15.4, gantry);
    at(box(0.14, 2.0, 1.7, glass), 2.85, -13.0, 15.8, gantry);
    at(box(2.6, 2.8, 0.2, dark), 1.6, -13.0, 16.85, gantry);
    at(new THREE.Mesh(new THREE.SphereGeometry(0.26, 6, 5),
      new THREE.MeshStandardMaterial({ color: 0xd8402c, emissive: 0x571209, roughness: 0.5, metalness: 0.2 })), 0, 0, 22.6, gantry);
    /* team identification panel on the girder */
    at(box(0.3, 6.0, 1.4, teamM), 1.75, 8.0, 20.9, gantry);

    /* ---------------- fitting-out shed ---------------- */
    var SXp = 20.0, SYp = 17.0;
    at(new THREE.Mesh(new THREE.BoxGeometry(16, 13, 7.2), [conc, conc, conc, conc, roofM, plainM]), SXp, SYp, 4.4);
    for (s = -1; s <= 1; s += 2) {
      var rp = box(16.8, 7.2, 0.3, roofM);
      rp.position.set(SXp, SYp + s * 3.35, 8.0 + 0.55); rp.rotation.x = -s * 0.2; g.add(rp);
    }
    at(box(17.0, 0.6, 0.4, roofM), SXp, SYp, 9.35);
    at(box(0.35, 5.5, 5.4, dark), SXp - 8.1, SYp, 3.5);
    at(box(0.5, 6.2, 0.5, steel), SXp - 8.1, SYp, 6.4);
    at(box(2.0, 2.6, 0.4, plainM), SXp - 9.2, SYp, 0.9);
    at(box(1.2, 0.3, 2.3, dark), SXp + 3.0, SYp - 6.6, 1.95);
    at(cylZ(0.5, 0.5, 2.6, steel, 10), SXp + 6.4, SYp + 5.0, 9.6);
    at(cylZ(0.62, 0.62, 0.25, dark, 10), SXp + 6.4, SYp + 5.0, 11.0);
    railLine(SXp, SYp - 6.9, 15.0, 0, 1.05).position.z = 8.0;

    /* ---------------- bollards, mooring lines, fenders ---------------- */
    var bolY = [15.5, 20.5, 25.5];
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) bollard(-26.6, s * bolY[i]);
    for (s = -1; s <= 1; s += 2) {
      /* lines running out over the quay edge into the water */
      for (i = 0; i < 2; i++) {
        var ml = cylX(0.075, 0.075, 4.6, ropeM, 4);
        ml.position.set(-28.6, s * (bolY[i] + 0.4), 0.9);
        ml.rotation.y = 0.55; ml.rotation.z = -s * 0.18; g.add(ml);
      }
      /* line from a bollard up to the hull staging */
      var ml2 = cylX(0.07, 0.07, 12.4, ropeM, 4);
      ml2.position.set(-21.0, s * 12.0, 1.9);
      ml2.rotation.z = s * 0.5; ml2.rotation.y = -0.12; g.add(ml2);
      /* tyre fenders on the quay face */
      for (i = 0; i < 3; i++) {
        var fen = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.2, 4, 10),
          new THREE.MeshStandardMaterial({ color: 0x22201e, roughness: 0.92 }));
        fen.position.set(-29.1, s * (14.5 + i * 5.5), -0.2); fen.rotation.y = Math.PI / 2; g.add(fen);
      }
    }

    /* ---------------- quayside stores and clutter ---------------- */
    crate(9.0, -20.0, 0.8, 3.0, 2.4, 2.0, 0.12);
    crate(12.4, -19.2, 0.8, 2.4, 2.0, 1.6, -0.3);
    crate(9.2, -16.2, 0.8, 2.6, 2.2, 1.7, 0.4);
    crate(12.8, -22.6, 0.8, 2.2, 1.8, 1.4, 0.2);
    crate(24.0, -6.0, 0.8, 3.2, 2.6, 2.2, -0.1);
    crate(24.4, -10.0, 0.8, 2.4, 2.0, 1.5, 0.3);
    drum(17.0, -13.0, 0.8, 0x39566b); drum(17.9, -12.6, 0.8, 0x7a4030);
    drum(17.4, -14.0, 0.8, 0x4b5240); drum(18.3, -13.6, 0.8, 0x39566b);
    drum(4.0, 22.0, 0.8, 0x7a4030); drum(4.9, 22.5, 0.8, 0x4b5240);
    /* cable reels */
    for (i = 0; i < 2; i++) {
      var reel = new THREE.Group(); reel.position.set(6.5 + i * 3.4, -25.0, 0.8); g.add(reel);
      for (j = -1; j <= 1; j += 2) at(cylX(1.25, 1.25, 0.18, wood, 12), 0, j * 0.7, 1.25, reel).rotation.z = Math.PI / 2;
      at(cylX(0.75, 0.75, 1.4, dark, 12), 0, 0, 1.25, reel).rotation.z = Math.PI / 2;
    }
    /* steel plate stacks and pipe bundle for the hull */
    for (i = 0; i < 3; i++) at(box(7.0, 2.6, 0.4, rustM), 15.0 + (i - 1) * 0.2, 5.0, 1.0 + i * 0.42);
    for (i = 0; i < 3; i++) for (j = 0; j <= i; j++) {
      at(cylX(0.32, 0.32, 6.0, steel, 8), 15.0, 9.0 - 1.0 + (2 - i) * 0.32 + j * 0.64, 1.1 + (2 - i) * 0.56);
    }
    /* welding sets and gas bottles by the slip head */
    at(box(1.8, 1.2, 1.0, paint), -3.0, -9.0, 1.3);
    for (i = 0; i < 4; i++) at(cylZ(0.22, 0.22, 1.5, i % 2 ? haze : rustM, 8), -1.2 + i * 0.5, -9.2, 1.55);
    at(box(2.4, 1.0, 0.9, wood), -3.2, -12.0, 1.25);
    /* sandbagged watch post at the gate */
    var bagM = new THREE.MeshStandardMaterial({ color: 0x7b7355, roughness: 0.95, metalness: 0.0 });
    for (i = 0; i < 3; i++) for (j = 0; j < 6 - i; j++) {
      var b = box(0.62, 0.4, 0.26, bagM);
      b.position.set(27.0, (j - (5 - i) / 2) * 0.66 + (i % 2) * 0.16, 0.94 + i * 0.25);
      b.rotation.z = (rn() - 0.5) * 0.16; g.add(b);
    }
    at(box(2.4, 2.4, 2.6, plainM), 26.0, 4.6, 2.1);
    at(box(2.8, 2.8, 0.25, roofM), 26.0, 4.6, 3.5);
    at(box(0.14, 1.1, 1.0, glass), 24.75, 4.6, 2.6);
    fenceRun(28.8, -28.8, 28.8, -2.0, 2.6);
    fenceRun(28.8, 8.0, 28.8, 28.8, 2.6);
    fenceRun(-6.0, -28.8, 28.8, -28.8, 2.6);
    fenceRun(-6.0, 28.8, 28.8, 28.8, 2.6);
    floodlight(-4.0, 20.0, 13, 4.0);
    floodlight(-4.0, -20.0, 13, 2.3);
    floodlight(27.0, -24.0, 13, 2.6);
    floodlight(27.0, 24.0, 13, 3.7);
    railLine(-6.4, 21.5, 14.0, Math.PI / 2, 1.05).position.z = 0.8;
    railLine(-6.4, -21.5, 14.0, Math.PI / 2, 1.05).position.z = 0.8;
    return g;
  }
};

BLD_MODELS["nukesilo"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var seed = 9091;
    function rnd() { seed = (seed * 48271) % 2147483647; return seed / 2147483647; }
    function concTex(base, rep) {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var p = cv.getContext("2d");
      var i;
      p.fillStyle = base; p.fillRect(0, 0, 256, 256);
      for (i = 0; i < 28; i++) {
        p.globalAlpha = 0.04 + rnd() * 0.05;
        p.fillStyle = rnd() < 0.5 ? "#dedbcf" : "#141612";
        p.fillRect(rnd() * 256, rnd() * 256, 26 + rnd() * 84, 18 + rnd() * 62);
      }
      p.globalAlpha = 1;
      p.strokeStyle = "rgba(20,22,18,0.45)"; p.lineWidth = 2;
      p.beginPath();
      p.moveTo(0, 128); p.lineTo(256, 128); p.moveTo(128, 0); p.lineTo(128, 256);
      p.stroke();
      p.strokeStyle = "rgba(18,20,16,0.22)"; p.lineWidth = 1;
      for (i = 0; i < 6; i++) {
        var sx = rnd() * 256, sy = rnd() * 256;
        p.beginPath(); p.moveTo(sx, sy);
        p.lineTo(sx + 16 + rnd() * 70, sy + (rnd() - 0.5) * 80);
        p.stroke();
      }
      p.fillStyle = "rgba(0,0,0,0.18)";
      for (i = 0; i < 180; i++) p.fillRect(rnd() * 256, rnd() * 256, 2, 2);
      for (i = 0; i < 16; i++) {
        p.fillStyle = "rgba(26,22,14,0.11)";
        p.fillRect(rnd() * 256, rnd() * 256, 6 + rnd() * 24, 26 + rnd() * 66);
      }
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(rep, rep);
      return t;
    }
    function trefoil(p, cx, cy, r, col) {
      var k;
      p.fillStyle = col;
      p.beginPath(); p.arc(cx, cy, r * 0.22, 0, Math.PI * 2); p.fill();
      for (k = 0; k < 3; k++) {
        var a0 = k * Math.PI * 2 / 3 - 0.52, a1 = a0 + 1.04;
        p.beginPath();
        p.arc(cx, cy, r, a0, a1);
        p.arc(cx, cy, r * 0.38, a1, a0, true);
        p.closePath();
        p.fill();
      }
    }
    function apronTex() {
      var W = 512;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = W;
      var p = cv.getContext("2d");
      var i, k;
      p.fillStyle = "#4e5249"; p.fillRect(0, 0, W, W);
      for (i = 0; i < 44; i++) {
        p.globalAlpha = 0.04 + rnd() * 0.06;
        p.fillStyle = rnd() < 0.5 ? "#dcd9cb" : "#141612";
        p.fillRect(rnd() * W, rnd() * W, 34 + rnd() * 130, 26 + rnd() * 96);
      }
      p.globalAlpha = 1;
      p.strokeStyle = "rgba(18,20,16,0.5)"; p.lineWidth = 2;
      for (i = 1; i < 8; i++) {
        p.beginPath(); p.moveTo(i * W / 8, 0); p.lineTo(i * W / 8, W); p.stroke();
        p.beginPath(); p.moveTo(0, i * W / 8); p.lineTo(W, i * W / 8); p.stroke();
      }
      /* radiation-yellow chevron ring painted around the shaft */
      for (k = 0; k < 16; k++) {
        p.save();
        p.translate(W / 2, W / 2);
        p.rotate(k * Math.PI / 8);
        p.strokeStyle = "#c8ad22"; p.lineWidth = 9; p.lineCap = "butt";
        p.beginPath();
        p.moveTo(96, -13); p.lineTo(112, 0); p.lineTo(96, 13);
        p.stroke();
        p.restore();
      }
      p.strokeStyle = "rgba(200,173,34,0.85)"; p.lineWidth = 5;
      p.beginPath(); p.arc(W / 2, W / 2, 148, 0, Math.PI * 2); p.stroke();
      p.strokeStyle = "rgba(20,20,16,0.7)"; p.lineWidth = 5;
      p.setLineDash([16, 16]);
      p.beginPath(); p.arc(W / 2, W / 2, 148, 0, Math.PI * 2); p.stroke();
      p.setLineDash([]);
      trefoil(p, 118, 396, 40, "rgba(200,173,34,0.8)");
      trefoil(p, 396, 116, 40, "rgba(200,173,34,0.8)");
      p.fillStyle = "rgba(210,206,186,0.55)";
      p.font = "bold 26px sans-serif";
      p.fillText("DANGER", 200, 60);
      p.font = "bold 18px sans-serif";
      p.fillText("DEADLY FORCE AUTHORIZED", 128, 484);
      p.fillText("SITE K-9", 30, 40);
      for (i = 0; i < 26; i++) {
        p.fillStyle = "rgba(12,12,10,0.14)";
        p.fillRect(rnd() * W, rnd() * W, 10 + rnd() * 70, 6 + rnd() * 20);
      }
      p.fillStyle = "rgba(0,0,0,0.13)";
      for (i = 0; i < 340; i++) p.fillRect(rnd() * W, rnd() * W, 2, 2);
      return new THREE.CanvasTexture(cv);
    }
    function hazTex(rep) {
      var cv = document.createElement("canvas");
      cv.width = 64; cv.height = 64;
      var p = cv.getContext("2d");
      var i;
      p.fillStyle = "#c8ad22"; p.fillRect(0, 0, 64, 64);
      p.fillStyle = "#191b16";
      for (i = -2; i < 6; i++) {
        p.save(); p.translate(i * 22, 0); p.rotate(0.52);
        p.fillRect(0, -40, 11, 140);
        p.restore();
      }
      p.fillStyle = "rgba(0,0,0,0.2)";
      for (i = 0; i < 50; i++) p.fillRect(rnd() * 64, rnd() * 64, 2, 2);
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(rep || 5, 1);
      return t;
    }
    function bodyTex() {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 128;
      var p = cv.getContext("2d");
      var i;
      p.fillStyle = "#cfd2d4"; p.fillRect(0, 0, 256, 128);
      p.fillStyle = "#22262a"; p.fillRect(0, 0, 256, 14);
      p.fillRect(0, 112, 256, 16);
      p.fillStyle = "#8f2d22"; p.fillRect(0, 30, 256, 9);
      p.fillStyle = "rgba(30,34,38,0.9)";
      p.font = "bold 15px sans-serif";
      p.fillText("R-19", 18, 68);
      p.fillText("NO STEP", 150, 68);
      p.strokeStyle = "rgba(40,44,48,0.35)"; p.lineWidth = 1;
      for (i = 1; i < 8; i++) { p.beginPath(); p.moveTo(i * 32, 14); p.lineTo(i * 32, 112); p.stroke(); }
      for (i = 0; i < 24; i++) {
        p.fillStyle = "rgba(60,64,68,0.10)";
        p.fillRect(rnd() * 256, rnd() * 128, 10 + rnd() * 40, 6 + rnd() * 22);
      }
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      return t;
    }
    function meshTex() {
      var cv = document.createElement("canvas");
      cv.width = 64; cv.height = 64;
      var p = cv.getContext("2d");
      var i;
      p.clearRect(0, 0, 64, 64);
      p.strokeStyle = "rgba(176,182,186,0.95)"; p.lineWidth = 2;
      for (i = -4; i < 9; i++) {
        p.beginPath(); p.moveTo(i * 8, 0); p.lineTo(i * 8 + 64, 64); p.stroke();
        p.beginPath(); p.moveTo(i * 8, 64); p.lineTo(i * 8 + 64, 0); p.stroke();
      }
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      return t;
    }
    function signTex(l1, l2) {
      var cv = document.createElement("canvas");
      cv.width = 128; cv.height = 96;
      var p = cv.getContext("2d");
      p.fillStyle = "#c8ad22"; p.fillRect(0, 0, 128, 96);
      p.fillStyle = "#191b16"; p.fillRect(5, 5, 118, 86);
      trefoil(p, 30, 48, 20, "#c8ad22");
      p.fillStyle = "#c8ad22";
      p.font = "bold 17px sans-serif";
      p.fillText(l1, 56, 44);
      p.font = "bold 12px sans-serif";
      p.fillText(l2, 56, 64);
      return new THREE.CanvasTexture(cv);
    }
    var concMat = new THREE.MeshStandardMaterial({ map: concTex("#525750", 3), metalness: 0.05, roughness: 0.92 });
    var conc2Mat = new THREE.MeshStandardMaterial({ map: concTex("#464b45", 2), metalness: 0.05, roughness: 0.9 });
    var apronMat = new THREE.MeshStandardMaterial({ map: apronTex(), metalness: 0.05, roughness: 0.94 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x3a3f43, metalness: 0.85, roughness: 0.32 });
    var darkMat = new THREE.MeshStandardMaterial({ color: 0x131518, metalness: 0.2, roughness: 0.85 });
    var voidMat = new THREE.MeshStandardMaterial({ color: 0x07080a, metalness: 0.1, roughness: 0.95, side: THREE.DoubleSide });
    var hazMat = new THREE.MeshStandardMaterial({ map: hazTex(5), metalness: 0.1, roughness: 0.78 });
    var yellowMat = new THREE.MeshStandardMaterial({ color: 0xbfa422, metalness: 0.1, roughness: 0.72 });
    var missMat = new THREE.MeshStandardMaterial({ map: bodyTex(), metalness: 0.35, roughness: 0.42 });
    var meshMat = new THREE.MeshStandardMaterial({ map: meshTex(), transparent: true, alphaTest: 0.35, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.55 });
    var redMat = new THREE.MeshStandardMaterial({ color: 0xd23a28, emissive: 0x6d1409, metalness: 0.3, roughness: 0.42 });
    var teamMat = new THREE.MeshStandardMaterial({ color: C.team, metalness: 0.3, roughness: 0.6 });
    function bx(sx, sy, sz, x, y, z, mat, parent) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
      m.position.set(x, y, z);
      (parent || g).add(m);
      return m;
    }
    function cyl(r1, r2, h, x, y, z, mat, parent, axis, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, h, seg || 12, 1, !!open);
      if (axis === "x") geo.rotateZ(Math.PI / 2);
      else if (axis === "z") geo.rotateX(Math.PI / 2);
      var m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      (parent || g).add(m);
      return m;
    }
    function tube(ax, ay, az, bxx, by, bz, r, mat, parent) {
      var dx = bxx - ax, dy = by - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 6), mat);
      m.position.set((ax + bxx) / 2, (ay + by) / 2, (az + bz) / 2);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
      (parent || g).add(m);
      return m;
    }
    function railing(x0, y0, x1, y1, z, n, parent) {
      var i, dx = x1 - x0, dy = y1 - y0;
      for (i = 0; i < n; i++) {
        var t = i / (n - 1);
        cyl(0.035, 0.035, 1.05, x0 + dx * t, y0 + dy * t, z + 0.52, steelMat, parent, "z", 5, true);
      }
      tube(x0, y0, z + 1.02, x1, y1, z + 1.02, 0.03, steelMat, parent);
      tube(x0, y0, z + 0.56, x1, y1, z + 0.56, 0.026, steelMat, parent);
    }
    var i, s, a, k;
    // ---- apron ------------------------------------------------------------
    bx(40, 40, 0.62, 0, 0, 0.31, concMat);
    bx(39.0, 39.0, 0.06, 0, 0, 0.65, apronMat);
    for (s = -1; s <= 1; s += 2) {
      bx(40, 0.8, 0.95, 0, s * 19.6, 0.48, conc2Mat);
      bx(0.8, 40, 0.95, s * 19.6, 0, 0.48, conc2Mat);
    }
    // raised hazard chevrons ringing the silo
    for (k = 0; k < 8; k++) {
      a = (k < 4 ? -0.62 + k * 0.41 : Math.PI - 0.62 + (k - 4) * 0.41);
      var apx = Math.cos(a) * 10.6, apy = Math.sin(a) * 10.6;
      for (s = -1; s <= 1; s += 2) {
        var d = a + s * 0.62;
        var ch = bx(3.1, 0.95, 0.24, apx + Math.cos(d) * 1.55, apy + Math.sin(d) * 1.55, 0.8, yellowMat);
        ch.rotation.z = d;
      }
    }
    // ---- silo shaft -------------------------------------------------------
    cyl(6.5, 7.0, 3.4, 0, 0, 2.35, conc2Mat, g, "z", 30, true);
    var ring = new THREE.Mesh(new THREE.RingGeometry(4.3, 6.5, 30), conc2Mat);
    ring.position.z = 4.05;
    g.add(ring);
    cyl(4.3, 4.3, 3.7, 0, 0, 2.2, voidMat, g, "z", 30, true);
    var floorRing = new THREE.Mesh(new THREE.RingGeometry(2.4, 4.28, 24), darkMat);
    floorRing.position.z = 0.42;
    g.add(floorRing);
    for (i = 0; i < 16; i++) {
      a = i / 16 * Math.PI * 2;
      bx(0.2, 0.2, 3.5, Math.cos(a) * 4.14, Math.sin(a) * 4.14, 2.2, steelMat);
    }
    var wring = new THREE.Mesh(new THREE.TorusGeometry(4.1, 0.08, 4, 20), steelMat);
    wring.position.z = 1.5;
    g.add(wring);
    var rim = new THREE.Mesh(new THREE.TorusGeometry(4.35, 0.16, 5, 24), steelMat);
    rim.position.z = 4.06;
    g.add(rim);
    for (i = 0; i < 14; i++) {
      a = i / 14 * Math.PI * 2;
      cyl(0.09, 0.09, 0.16, Math.cos(a) * 5.6, Math.sin(a) * 5.6, 4.12, steelMat, g, "z", 6);
    }
    for (i = 0; i < 14; i++) {
      a = i / 14 * Math.PI * 2;
      var hb = bx(0.3, 2.4, 0.6, Math.cos(a) * 6.72, Math.sin(a) * 6.72, 1.8, hazMat);
      hb.rotation.z = a;
    }
    // ICBM upper stage standing in the shaft
    cyl(2.35, 2.35, 3.0, 0, 0, -0.25, missMat, g, "z", 24);
    var noseG = new THREE.ConeGeometry(2.35, 2.9, 24);
    noseG.rotateX(Math.PI / 2);
    var nose = new THREE.Mesh(noseG, missMat);
    nose.position.set(0, 0, 2.7);
    g.add(nose);
    cyl(2.38, 2.38, 0.3, 0, 0, 1.05, darkMat, g, "z", 24, true);
    cyl(1.78, 1.72, 0.24, 0, 0, 2.0, darkMat, g, "z", 20, true);
    cyl(0.1, 0.1, 0.55, 0, 0, 4.3, steelMat, g, "z", 8);
    // umbilical mast and swing arms inside the shaft
    bx(0.7, 0.7, 3.6, -3.4, 0, 2.2, steelMat);
    for (i = 0; i < 2; i++) {
      bx(1.6, 0.5, 0.4, -2.5, 0, 1.4 + i * 1.9, steelMat);
      cyl(0.14, 0.14, 0.9, -2.9, 0, 1.4 + i * 1.9, darkMat, g, "z", 8);
    }
    // ---- two-piece blast door, partly retracted --------------------------
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 4; k++) {
        var rlx = (k < 2 ? -1 : 1) * (k % 2 ? 7.0 : 2.4);
        bx(0.85, 10.6, 0.42, rlx, s * 9.5, 4.26, steelMat);
      }
      bx(16.6, 2.2, 3.5, 0, s * 9.2, 2.4, conc2Mat);
      bx(16.6, 2.2, 3.5, 0, s * 12.8, 2.4, conc2Mat);
      var leaf = new THREE.Group();
      leaf.position.set(0, s * 8.9, 0);
      g.add(leaf);
      bx(17.0, 8.6, 2.0, 0, 0, 5.45, conc2Mat, leaf);
      bx(17.4, 2.2, 0.18, 0, s * -3.1, 6.54, hazMat, leaf);
      bx(1.5, 6.4, 0.18, -7.6, s * -1.1, 6.54, hazMat, leaf);
      bx(1.5, 6.4, 0.18, 7.6, s * -1.1, 6.54, hazMat, leaf);
      bx(17.4, 8.8, 0.12, 0, 0, 6.51, conc2Mat, leaf);
      bx(17.2, 0.3, 2.1, 0, -4.35, 5.45, steelMat, leaf);
      bx(17.2, 0.3, 2.1, 0, 4.35, 5.45, steelMat, leaf);
      bx(0.3, 8.7, 2.1, -8.5, 0, 5.45, steelMat, leaf);
      bx(0.3, 8.7, 2.1, 8.5, 0, 5.45, steelMat, leaf);
      for (i = 0; i < 6; i++) {
        bx(0.55, 0.36, 1.9, -7.0 + i * 2.8, -4.5, 5.45, steelMat, leaf);
        bx(0.55, 0.36, 1.9, -7.0 + i * 2.8, 4.5, 5.45, steelMat, leaf);
      }
      for (i = 0; i < 4; i++) {
        var rx = (i < 2 ? -1 : 1) * (i % 2 ? 7.0 : 2.4);
        for (k = -1; k <= 1; k += 2) {
          bx(1.2, 1.2, 0.44, rx, k * 3.3, 4.62, steelMat, leaf);
          cyl(0.21, 0.21, 0.62, rx, k * 3.3, 4.26, darkMat, leaf, "x", 8, true);
        }
      }
      for (i = 0; i < 2; i++) {
        var eye = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.08, 4, 10), steelMat);
        eye.position.set(-4.0 + i * 8.0, s * 3.0, 6.7);
        eye.rotation.y = Math.PI / 2;
        leaf.add(eye);
      }
      bx(1.2, 0.7, 0.5, 6.6, s * -3.9, 6.75, redMat, leaf);
      // drive rams and their piers
      bx(2.2, 2.2, 3.9, -9.9, s * 12.6, 2.2, conc2Mat);
      bx(1.6, 1.4, 1.2, -9.9, s * 12.6, 4.7, steelMat);
      cyl(0.5, 0.5, 5.0, -9.9, s * 10.0, 4.7, steelMat, g, "y", 14);
      cyl(0.3, 0.3, 3.2, -9.9, s * 6.4, 4.7, darkMat, g, "y", 10);
      bx(1.4, 1.6, 1.3, -9.9, s * -3.6, 4.9, steelMat, leaf);
    }
    // ---- cooling plant ----------------------------------------------------
    for (k = 0; k < 3; k++) {
      var ux = -14.0, uy = -7.0 + k * 7.0;
      bx(4.2, 3.4, 2.6, ux, uy, 1.92, steelMat);
      bx(4.4, 3.6, 0.2, ux, uy, 3.3, darkMat);
      for (i = 0; i < 4; i++) bx(0.1, 0.3, 1.7, ux - 2.05, uy - 1.05 + i * 0.7, 1.9, darkMat);
      for (i = 0; i < 4; i++) bx(3.8, 0.09, 0.1, ux, uy - 1.5, 1.25 + i * 0.42, darkMat);
      cyl(1.25, 1.25, 0.3, ux, uy, 3.45, darkMat, g, "z", 14, true);
      var fan = new THREE.Group();
      fan.name = "rotor";
      fan.position.set(ux, uy, 3.62);
      g.add(fan);
      cyl(0.28, 0.28, 0.26, 0, 0, 0, steelMat, fan, "z", 10);
      for (i = 0; i < 6; i++) {
        var bl = bx(1.05, 0.42, 0.05, 0.62, 0, 0, steelMat, fan);
        bl.rotation.z = i * Math.PI / 3;
        bl.rotation.x = 0.3;
        bl.position.set(Math.cos(i * Math.PI / 3) * 0.62, Math.sin(i * Math.PI / 3) * 0.62, 0);
      }
      var guard = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.05, 4, 12), steelMat);
      guard.position.set(ux, uy, 3.72);
      g.add(guard);
      for (i = 0; i < 2; i++) {
        var gbr = bx(2.5, 0.06, 0.06, ux, uy, 3.74, steelMat);
        gbr.rotation.z = i * Math.PI / 2;
      }
      // coolant piping to the shaft with supports
      cyl(0.4, 0.4, 6.6, ux + 5.6, uy, 1.5, steelMat, g, "x", 10);
      cyl(0.4, 0.4, 0.9, ux + 8.9, uy, 1.9, steelMat, g, "z", 10);
      bx(0.8, 0.8, 1.2, ux + 6.5, uy, 0.9, conc2Mat);
      bx(1.0, 0.5, 0.3, ux, uy + 1.9, 3.4, redMat);
    }
    cyl(1.6, 1.6, 4.6, -17.0, 8.0, 2.9, steelMat, g, "z", 16);
    cyl(1.75, 1.75, 0.2, -17.0, 8.0, 5.3, steelMat, g, "z", 16);
    railing(-15.2, 8.0, -15.2, 12.0, 0.68, 3);
    // ---- guard tower ------------------------------------------------------
    var tx = 15.6, ty = 15.6;
    for (i = 0; i < 4; i++) {
      var lx = tx + (i < 2 ? -1.9 : 1.9), ly = ty + (i % 2 ? -1.9 : 1.9);
      cyl(0.22, 0.26, 9.0, lx, ly, 5.1, steelMat, g, "z", 8);
      bx(1.2, 1.2, 0.7, lx, ly, 0.85, concMat);
    }
    for (i = 0; i < 4; i++) {
      var z0 = 1.2 + i * 2.0, z1 = z0 + 2.0;
      tube(tx - 1.9, ty - 1.9, z0, tx + 1.9, ty - 1.9, z1, 0.06, steelMat);
      tube(tx + 1.9, ty + 1.9, z0, tx - 1.9, ty + 1.9, z1, 0.06, steelMat);
      tube(tx - 1.9, ty + 1.9, z0, tx - 1.9, ty - 1.9, z1, 0.06, steelMat);
      tube(tx + 1.9, ty - 1.9, z0, tx + 1.9, ty + 1.9, z1, 0.06, steelMat);
      bx(3.9, 0.1, 0.1, tx, ty - 1.9, z0, steelMat);
      bx(0.1, 3.9, 0.1, tx - 1.9, ty, z0, steelMat);
    }
    bx(5.4, 5.4, 0.2, tx, ty, 9.6, steelMat);
    bx(3.9, 3.9, 2.5, tx, ty, 10.95, conc2Mat);
    bx(4.6, 4.6, 0.24, tx, ty, 12.3, conc2Mat);
    for (s = -1; s <= 1; s += 2) {
      bx(3.6, 0.1, 0.85, tx, ty + s * 1.98, 11.5, darkMat);
      bx(0.1, 3.6, 0.85, tx + s * 1.98, ty, 11.5, darkMat);
    }
    railing(tx - 2.6, ty - 2.6, tx + 2.6, ty - 2.6, 9.7, 4);
    railing(tx - 2.6, ty - 2.6, tx - 2.6, ty + 2.6, 9.7, 4);
    for (i = 0; i < 9; i++) cyl(0.03, 0.03, 0.8, tx - 2.2, ty, 1.1 + i * 0.95, steelMat, g, "y", 5, true);
    for (s = -1; s <= 1; s += 2) cyl(0.05, 0.05, 8.6, tx - 2.2, ty + s * 0.4, 5.2, steelMat, g, "z", 6);
    cyl(0.14, 0.14, 0.5, tx - 1.4, ty - 1.9, 12.65, steelMat, g, "z", 8);
    cyl(0.55, 0.55, 0.8, tx - 1.4, ty - 1.9, 13.15, steelMat, g, "x", 14);
    cyl(0.52, 0.52, 0.1, tx - 1.85, ty - 1.9, 13.15, new THREE.MeshStandardMaterial({ color: 0xfff0c4, emissive: 0x6f5c22, metalness: 0.3, roughness: 0.4 }), g, "x", 14);
    cyl(0.16, 0.16, 0.34, tx, ty, 12.6, steelMat, g, "z", 8);
    cyl(0.14, 0.14, 0.26, tx, ty, 12.9, redMat, g, "z", 8);
    bx(1.5, 0.1, 0.55, tx, ty - 2.0, 12.0, teamMat);
    cyl(0.06, 0.06, 3.4, tx + 1.7, ty + 1.7, 14.0, steelMat, g, "z", 6);
    // ---- security fencing -------------------------------------------------
    function fenceRun(x0, y0, x1, y1, n) {
      var dx = x1 - x0, dy = y1 - y0;
      var L = Math.sqrt(dx * dx + dy * dy);
      var ang = Math.atan2(dy, dx);
      var pg = new THREE.PlaneGeometry(L, 2.7);
      pg.rotateX(Math.PI / 2);
      var mm = meshMat.clone();
      mm.map = meshMat.map.clone();
      mm.map.needsUpdate = true;
      mm.map.wrapS = mm.map.wrapT = THREE.RepeatWrapping;
      mm.map.repeat.set(L / 1.5, 2.0);
      var pm = new THREE.Mesh(pg, mm);
      pm.position.set((x0 + x1) / 2, (y0 + y1) / 2, 2.05);
      pm.rotation.z = ang;
      g.add(pm);
      var j;
      for (j = 0; j <= n; j++) {
        var t = j / n;
        var px = x0 + dx * t, py = y0 + dy * t;
        cyl(0.09, 0.09, 3.1, px, py, 2.15, steelMat, g, "z", 5, true);
        if (j % 2 === 0) {
          var arm = cyl(0.05, 0.05, 0.7, px + Math.cos(ang + Math.PI / 2) * 0.22, py + Math.sin(ang + Math.PI / 2) * 0.22, 3.85, steelMat, g, "z", 5, true);
          arm.rotation.x = Math.cos(ang) * 0.5;
          arm.rotation.y = Math.sin(ang) * 0.5;
        }
      }
      for (j = 0; j < 2; j++) {
        var oz = 3.7 + j * 0.24;
        var off = 0.16 + j * 0.14;
        tube(x0 + Math.cos(ang + Math.PI / 2) * off, y0 + Math.sin(ang + Math.PI / 2) * off, oz,
             x1 + Math.cos(ang + Math.PI / 2) * off, y1 + Math.sin(ang + Math.PI / 2) * off, oz, 0.022, steelMat);
      }
      bx(L, 0.5, 0.3, (x0 + x1) / 2, (y0 + y1) / 2, 0.75, conc2Mat).rotation.z = ang;
    }
    fenceRun(-18.6, -18.6, -18.6, 18.6, 8);
    fenceRun(18.6, -18.6, 18.6, -3.4, 4);
    fenceRun(18.6, 3.4, 18.6, 18.6, 4);
    fenceRun(-18.6, 18.6, 18.6, 18.6, 8);
    fenceRun(-18.6, -18.6, 18.6, -18.6, 8);
    // gate: posts, parked sliding leaf, warning signs
    for (s = -1; s <= 1; s += 2) {
      cyl(0.16, 0.16, 4.4, 18.6, s * 3.4, 2.8, steelMat, g, "z", 8);
      cyl(0.12, 0.12, 0.24, 18.6, s * 3.4, 5.1, redMat, g, "z", 8);
    }
    var gate = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 2.6), meshMat);
    gate.geometry.rotateX(Math.PI / 2);
    gate.position.set(17.9, 6.9, 1.95);
    gate.rotation.z = Math.PI / 2;
    g.add(gate);
    bx(0.14, 6.5, 0.16, 17.9, 6.9, 3.28, steelMat);
    bx(0.14, 6.5, 0.16, 17.9, 6.9, 0.72, steelMat);
    var signMat = new THREE.MeshStandardMaterial({ map: signTex("RESTRICTED", "USE OF FORCE"), metalness: 0.2, roughness: 0.7 });
    for (i = 0; i < 3; i++) {
      bx(0.06, 1.5, 1.1, 18.55, -14.0 + i * 8.0, 2.4, signMat);
    }
    bx(0.06, 1.5, 1.1, -18.55, 4.0, 2.4, signMat);
    // ---- hardened equipment vault, trench, beacons -----------------------
    bx(9.0, 7.0, 3.2, 12.0, -12.5, 1.9, concMat);
    bx(9.8, 7.8, 0.6, 12.0, -12.5, 3.7, conc2Mat);
    bx(0.4, 2.6, 2.6, 7.4, -12.5, 1.7, steelMat);
    bx(0.1, 1.6, 0.9, 7.15, -12.5, 2.2, teamMat);
    for (i = 0; i < 3; i++) {
      cyl(0.55, 0.55, 0.9, 9.6 + i * 2.4, -14.8, 4.4, steelMat, g, "z", 12);
      cyl(0.75, 0.75, 0.18, 9.6 + i * 2.4, -14.8, 4.95, steelMat, g, "z", 12);
    }
    cyl(0.1, 0.1, 7.5, 16.2, -9.4, 7.5, steelMat, g, "z", 8);
    for (i = 0; i < 3; i++) cyl(0.02, 0.02, 1.3, 16.2, -9.4, 9.0 + i * 0.9, steelMat, g, "y", 6);
    cyl(0.13, 0.13, 0.25, 16.2, -9.4, 11.4, redMat, g, "z", 8);
    bx(7.6, 1.8, 0.16, 6.1, -6.7, 0.66, darkMat).rotation.z = -0.86;
    for (i = 0; i < 8; i++) {
      var t2 = i / 8;
      var px2 = 3.6 + t2 * 5.0, py2 = -3.8 - t2 * 5.8;
      if (i !== 2 && i !== 5) {
        var cp = bx(1.3, 1.8, 0.18, px2, py2, 0.74, steelMat);
        cp.rotation.z = -0.86;
      }
    }
    bx(1.6, 1.6, 1.0, 7.8, -9.6, 1.15, steelMat);
    for (i = 0; i < 6; i++) {
      a = i / 6 * Math.PI * 2 + 0.3;
      cyl(0.18, 0.18, 0.5, Math.cos(a) * 8.0, Math.sin(a) * 8.0, 0.95, steelMat, g, "z", 8);
      cyl(0.15, 0.15, 0.3, Math.cos(a) * 8.0, Math.sin(a) * 8.0, 1.32, redMat, g, "z", 8);
    }
    // floodlight masts on the fence line
    function flood(x, y, ang) {
      cyl(0.17, 0.21, 9.5, x, y, 5.0, steelMat, g, "z", 8);
      bx(1.0, 1.0, 0.4, x, y, 0.85, concMat);
      var head = new THREE.Group();
      head.position.set(x, y, 9.8);
      head.rotation.z = ang;
      g.add(head);
      bx(2.6, 0.32, 0.32, 0, 0, 0, steelMat, head);
      for (s = -1; s <= 1; s += 2) {
        bx(0.55, 0.66, 0.55, s * 1.0, 0.12, 0.32, steelMat, head);
        bx(0.48, 0.1, 0.48, s * 1.0, -0.28, 0.32, new THREE.MeshStandardMaterial({ color: 0xfff0c4, emissive: 0x6f5c22, metalness: 0.3, roughness: 0.4 }), head);
      }
      cyl(0.12, 0.12, 0.22, x, y, 9.95, redMat, g, "z", 8);
    }
    flood(-17.4, -17.4, 0.8);
    flood(-17.4, 17.4, -0.8);
    flood(17.4, -17.4, 2.35);
    flood(6.0, 17.6, -1.6);
    // crates and gas bottles near the vault
    for (i = 0; i < 3; i++) bx(2.0, 1.5, 1.0, 4.0 + i * 0.5, -16.0 + i * 2.2, 1.12, steelMat).rotation.z = rnd() * 0.5;
    for (i = 0; i < 6; i++) cyl(0.26, 0.26, 1.7, -2.0 - (i % 3) * 0.6, -16.6 - Math.floor(i / 3) * 0.6, 1.47, steelMat, g, "z", 8);
    bx(3.2, 1.8, 0.24, -2.9, -16.9, 0.74, steelMat);
    return g;
  }
};

UNIT_MODELS["oiler"] = {
  len: 206,
  build: function (THREE, M, C) {
    var G = new THREE.Group();
    var i, k, seed = 613;
    function R() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    var X0 = -103, X1 = 103, HB = 14.85;
    var DECKZ = 9.8, FCZ = 13.4;
    /* deck plan half-breadth */
    var EDGE = [[-101.5, 7.5], [-97, 11.5], [-88, 13.6], [-60, 14.7], [20, 14.7],
      [55, 14.5], [75, 13.1], [88, 10.1], [97, 6.0], [102, 1.4]];
    function edgeY(x) {
      if (x <= EDGE[0][0]) return EDGE[0][1];
      for (var q = 1; q < EDGE.length; q++) {
        if (x <= EDGE[q][0]) {
          var t = (x - EDGE[q - 1][0]) / (EDGE[q][0] - EDGE[q - 1][0]);
          return EDGE[q - 1][1] + t * (EDGE[q][1] - EDGE[q - 1][1]);
        }
      }
      return EDGE[EDGE.length - 1][1];
    }

    /* ================= hull shell texture (u = length, v = around) ================= */
    var cv = document.createElement("canvas"); cv.width = 2048; cv.height = 256;
    var g2 = cv.getContext("2d"), W = cv.width, H = cv.height;
    function HU(x) { return (x - X0) / (X1 - X0) * W; }
    function HV(v) { return (1 - v) * H; }                      /* canvas texture is flipped */
    g2.fillStyle = "#6d7378"; g2.fillRect(0, 0, W, H);
    g2.fillStyle = "#5b3730"; g2.fillRect(0, HV(0.865), W, HV(0.635) - HV(0.865));   /* anti-fouling */
    g2.fillStyle = "#191b1d"; g2.fillRect(0, HV(0.905), W, HV(0.865) - HV(0.905));   /* boot topping */
    g2.fillStyle = "#191b1d"; g2.fillRect(0, HV(0.635), W, HV(0.595) - HV(0.635));
    for (i = 0; i < 150; i++) {                                  /* tonal plate patchwork */
      g2.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
      g2.fillRect(R() * W, R() * H, 40 + R() * 190, 8 + R() * 30);
    }
    g2.strokeStyle = "rgba(20,24,28,0.34)"; g2.lineWidth = 1.3;  /* transverse frame butts */
    for (i = 0; i < 46; i++) { var fx = 30 + i * 44; g2.beginPath(); g2.moveTo(fx, 0); g2.lineTo(fx, H); g2.stroke(); }
    g2.lineWidth = 1.6;                                          /* longitudinal strake seams */
    var strakes = [0.02, 0.075, 0.13, 0.185, 0.315, 0.37, 0.425, 0.48, 0.56, 0.94, 0.9];
    for (i = 0; i < strakes.length; i++) { g2.beginPath(); g2.moveTo(0, HV(strakes[i])); g2.lineTo(W, HV(strakes[i])); g2.stroke(); }
    for (i = 0; i < 120; i++) {                                  /* rust weeping under the deck edge */
      var rx = R() * W, rv = R() < 0.5 ? 0.08 + R() * 0.1 : 0.32 + R() * 0.1;
      var rg = g2.createLinearGradient(0, HV(rv), 0, HV(rv - 0.055));
      rg.addColorStop(0, "rgba(122,78,44,0.45)"); rg.addColorStop(1, "rgba(122,78,44,0)");
      g2.fillStyle = rg; g2.fillRect(rx, HV(rv), 3 + R() * 5, HV(rv - 0.055) - HV(rv));
    }
    for (i = 0; i < 26; i++) {                                   /* shell doors / scuttles */
      g2.strokeStyle = "rgba(20,24,28,0.4)"; g2.lineWidth = 1.2;
      g2.strokeRect(160 + i * 66, HV(0.11) - 5, 14, 10);
    }
    g2.fillStyle = "rgba(240,242,244,0.9)"; g2.font = "bold 22px sans-serif"; g2.textAlign = "center";
    g2.save(); g2.translate(HU(88), HV(0.05)); g2.scale(-1, 1); g2.fillText("187", 0, 8); g2.restore();
    g2.save(); g2.translate(HU(88), HV(0.45)); g2.scale(1, -1); g2.fillText("187", 0, 8); g2.restore();
    g2.save(); g2.translate(HU(-96), HV(0.06)); g2.scale(-1, 1);
    g2.font = "bold 13px sans-serif"; g2.fillText("BIG HORN", 0, 5); g2.restore();
    g2.save(); g2.translate(HU(-96), HV(0.44)); g2.scale(1, -1);
    g2.fillText("BIG HORN", 0, 5); g2.restore();
    g2.fillStyle = "rgba(235,238,240,0.75)"; g2.font = "bold 11px sans-serif";
    for (i = 0; i < 7; i++) {                                    /* draft marks fore and aft */
      g2.fillRect(HU(94), HV(0.70 + i * 0.022) - 2, 9, 3);
      g2.fillRect(HU(-98), HV(0.70 + i * 0.022) - 2, 9, 3);
      g2.fillRect(HU(94), HV(0.80 - i * 0.022) - 2, 9, 3);
      g2.fillRect(HU(-98), HV(0.80 - i * 0.022) - 2, 9, 3);
    }
    var hullTex = new THREE.CanvasTexture(cv); hullTex.anisotropy = 4;

    /* ================= main deck texture ================= */
    var dv = document.createElement("canvas"); dv.width = 2048; dv.height = 320;
    var d2 = dv.getContext("2d"), DW = dv.width, DH = dv.height;
    function PX(x) { return (x - X0) / (X1 - X0) * DW; }
    function PY(y) { return (HB - y) / (2 * HB) * DH; }
    d2.fillStyle = "#4b5054"; d2.fillRect(0, 0, DW, DH);
    for (i = 0; i < 170; i++) {
      d2.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)";
      d2.fillRect(R() * DW, R() * DH, 40 + R() * 180, 16 + R() * 70);
    }
    d2.fillStyle = "rgba(14,16,18,0.28)";                        /* non-skid speckle */
    for (i = 0; i < 5200; i++) d2.fillRect(R() * DW, R() * DH, 2, 2);
    d2.strokeStyle = "rgba(0,0,0,0.26)"; d2.lineWidth = 1.4;     /* deck plate seams */
    for (i = 0; i < 40; i++) { var px = 24 + i * 50; d2.beginPath(); d2.moveTo(px, 0); d2.lineTo(px, DH); d2.stroke(); }
    var lgs = [-11.5, -6, 0, 6, 11.5];
    for (i = 0; i < lgs.length; i++) { d2.beginPath(); d2.moveTo(0, PY(lgs[i])); d2.lineTo(DW, PY(lgs[i])); d2.stroke(); }
    d2.strokeStyle = "rgba(198,176,44,0.75)"; d2.lineWidth = 3;  /* fore-and-aft walkway lines */
    d2.beginPath(); d2.moveTo(PX(-78), PY(13.2)); d2.lineTo(PX(60), PY(13.2)); d2.stroke();
    d2.beginPath(); d2.moveTo(PX(-78), PY(-13.2)); d2.lineTo(PX(60), PY(-13.2)); d2.stroke();
    d2.fillStyle = "rgba(20,22,24,0.55)";                        /* cargo tank hatches / vents */
    for (i = 0; i < 14; i++) for (k = 0; k < 2; k++) {
      d2.beginPath(); d2.arc(PX(-44 + i * 7.6), PY(k ? 4.2 : -4.2), 5, 0, 6.3); d2.fill();
    }
    d2.strokeStyle = "#d3d8db"; d2.lineWidth = 5;                /* helo circle aft */
    d2.beginPath(); d2.arc(PX(-90), PY(0), 62, 0, 6.3); d2.stroke();
    d2.save(); d2.translate(PX(-90), PY(0)); d2.rotate(-Math.PI / 2);
    d2.fillStyle = "#d3d8db"; d2.font = "bold 64px sans-serif"; d2.textAlign = "center";
    d2.fillText("H", 0, 24); d2.restore();
    d2.strokeStyle = "rgba(198,176,44,0.8)"; d2.lineWidth = 4;   /* RAS station boxes */
    var stx = [-22, 26];
    for (i = 0; i < 2; i++) {
      d2.strokeRect(PX(stx[i] - 5), PY(13.6), PX(stx[i] + 5) - PX(stx[i] - 5), PY(6.6) - PY(13.6));
      d2.strokeRect(PX(stx[i] - 5), PY(-6.6), PX(stx[i] + 5) - PX(stx[i] - 5), PY(-13.6) - PY(-6.6));
      d2.save(); d2.translate(PX(stx[i]), PY(10)); d2.rotate(-Math.PI / 2);
      d2.fillStyle = "#d3d8db"; d2.font = "bold 26px sans-serif"; d2.fillText(i ? "STA 3" : "STA 7", 0, 9); d2.restore();
      d2.save(); d2.translate(PX(stx[i]), PY(-10)); d2.rotate(-Math.PI / 2);
      d2.fillText(i ? "STA 4" : "STA 8", 0, 9); d2.restore();
    }
    for (i = 0; i < 60; i++) {                                   /* rust and spill staining */
      d2.fillStyle = R() < 0.5 ? "rgba(120,76,42,0.22)" : "rgba(0,0,0,0.16)";
      d2.fillRect(R() * DW, R() * DH, 12 + R() * 40, 8 + R() * 22);
    }
    var deckTex = new THREE.CanvasTexture(dv); deckTex.anisotropy = 4;

    /* ================= materials ================= */
    var hullMat = new THREE.MeshStandardMaterial({ map: hullTex, metalness: 0.3, roughness: 0.62, side: THREE.DoubleSide });
    var deckMat = new THREE.MeshStandardMaterial({ map: deckTex, metalness: 0.25, roughness: 0.76 });
    var greyMat = new THREE.MeshStandardMaterial({ color: 0x6d7378, metalness: 0.3, roughness: 0.62 });
    var darkMat = new THREE.MeshStandardMaterial({ color: 0x2f3437, metalness: 0.32, roughness: 0.6 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x8a9095, metalness: 0.85, roughness: 0.3 });
    var winMat = new THREE.MeshStandardMaterial({ color: 0x111a20, metalness: 0.45, roughness: 0.22 });
    var teamMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.team), metalness: 0.3, roughness: 0.55 });
    var orangeMat = new THREE.MeshStandardMaterial({ color: 0xc2521c, metalness: 0.2, roughness: 0.62 });
    var rubMat = new THREE.MeshStandardMaterial({ color: 0x1a1c1e, metalness: 0.1, roughness: 0.9 });

    function bx(p, sx, sy, sz, x, y, z, mt) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mt); m.position.set(x, y, z); p.add(m); return m;
    }
    function tube(p, r1, r2, h, ax, x, y, z, mt, sg) {
      var g = new THREE.CylinderGeometry(r1, r2, h, sg || 8);
      if (ax === "z") g.rotateX(Math.PI / 2); else if (ax === "x") g.rotateZ(Math.PI / 2);
      var m = new THREE.Mesh(g, mt); m.position.set(x, y, z); p.add(m); return m;
    }
    /* cylinder spanning two points */
    function link(p, a, b, r, mt, sg) {
      var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, sg || 5), mt);
      m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
      p.add(m); return m;
    }
    function prism(p, pts, h, x, y, z, mt) {
      var s = new THREE.Shape(); s.moveTo(pts[0][0], pts[0][1]);
      for (var q = 1; q < pts.length; q++) s.lineTo(pts[q][0], pts[q][1]);
      s.closePath();
      var m = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: false }), mt);
      m.position.set(x, y, z); p.add(m); return m;
    }

    /* ================= hull ================= */
    G.add(new THREE.Mesh(M.loft(THREE, [
      { x: -103, w: 7.0, h: 5.2, zc: 4.2, sq: 0.85 },
      { x: -98, w: 11.0, h: 5.3, zc: 4.15, sq: 0.85 },
      { x: -88, w: 13.6, h: 5.35, zc: 4.1, sq: 0.87 },
      { x: -70, w: 14.7, h: 5.4, zc: 4.0, sq: 0.9 },
      { x: -30, w: 14.85, h: 5.4, zc: 4.0, sq: 0.9 },
      { x: 20, w: 14.85, h: 5.4, zc: 4.0, sq: 0.9 },
      { x: 55, w: 14.5, h: 5.4, zc: 4.0, sq: 0.88 },
      { x: 75, w: 13.1, h: 5.45, zc: 4.0, sq: 0.85 },
      { x: 88, w: 10.1, h: 5.5, zc: 4.0, sq: 0.8 },
      { x: 97, w: 6.0, h: 5.6, zc: 4.05, sq: 0.75 },
      { x: 102, w: 1.4, h: 5.7, zc: 4.1, sq: 0.7 }
    ], 22), hullMat));
    bx(G, 3.0, 13.0, 9.4, -102.0, 0, 4.7, hullMat);              /* transom */
    var bulb = new THREE.Mesh(new THREE.SphereGeometry(2.6, 12, 8), hullMat);
    bulb.scale.set(2.1, 0.75, 0.75); bulb.position.set(101, 0, 0.2); G.add(bulb);

    /* main deck */
    var dpts = [];
    for (i = 0; i < EDGE.length; i++) dpts.push([EDGE[i][0], -EDGE[i][1]]);
    dpts.push([103, 0]);
    for (i = EDGE.length - 1; i >= 0; i--) dpts.push([EDGE[i][0], EDGE[i][1]]);
    var ds = new THREE.Shape(); ds.moveTo(dpts[0][0], dpts[0][1]);
    for (i = 1; i < dpts.length; i++) ds.lineTo(dpts[i][0], dpts[i][1]);
    ds.closePath();
    var dg = new THREE.ExtrudeGeometry(ds, { depth: 0.6, bevelEnabled: false });
    var dpos = dg.attributes.position, duv = dg.attributes.uv;
    for (i = 0; i < dpos.count; i++) duv.setXY(i, (dpos.getX(i) - X0) / (X1 - X0), (dpos.getY(i) + HB) / (2 * HB));
    var deck = new THREE.Mesh(dg, [deckMat, greyMat]);
    deck.position.z = DECKZ - 0.6; G.add(deck);

    /* raised forecastle with a break at frame 60 */
    var fpts = [[60, -14.4], [75, -13.1], [88, -10.1], [97, -6.0], [102, -1.4], [103, 0],
      [102, 1.4], [97, 6.0], [88, 10.1], [75, 13.1], [60, 14.4]];
    prism(G, fpts, FCZ - DECKZ, 0, 0, DECKZ, hullMat);
    prism(G, [[60, -14.4], [103, -0.6], [103, 0.6], [60, 14.4]], 0.25, 0, 0, FCZ, deckMat);
    for (i = 0; i < 2; i++) {                                    /* forecastle bulwark */
      var sy = i ? -1 : 1;
      bx(G, 16, 0.3, 1.3, 67, sy * 13.6, FCZ + 0.85, hullMat);
      bx(G, 15, 0.3, 1.3, 81.5, sy * 11.3, FCZ + 0.85, hullMat).rotation.z = sy * 0.2;
      bx(G, 12, 0.3, 1.3, 93, sy * 7.4, FCZ + 0.85, hullMat).rotation.z = sy * 0.42;
    }
    bx(G, 0.4, 12, 1.5, 60.4, 0, DECKZ + 0.75, hullMat);         /* breakwater at the break */
    bx(G, 4.0, 3.0, 1.2, 58.0, 0, DECKZ + 0.6, greyMat);

    /* ================= aft deckhouse ================= */
    bx(G, 28, 23.0, 4.2, -64, 0, DECKZ + 2.1, greyMat);
    bx(G, 26, 21.0, 3.5, -64, 0, DECKZ + 5.95, greyMat);
    bx(G, 24, 19.0, 3.5, -64, 0, DECKZ + 9.45, greyMat);
    bx(G, 20, 19.5, 3.4, -60, 0, DECKZ + 12.9, greyMat);
    bx(G, 5.0, 5.0, 3.0, -60, 12.2, DECKZ + 12.7, greyMat);      /* bridge wings */
    bx(G, 5.0, 5.0, 3.0, -60, -12.2, DECKZ + 12.7, greyMat);
    bx(G, 0.5, 19.6, 1.7, -50.2, 0, DECKZ + 13.5, winMat);       /* bridge front glazing */
    bx(G, 5.2, 0.5, 1.7, -60, 14.5, DECKZ + 13.3, winMat);
    bx(G, 5.2, 0.5, 1.7, -60, -14.5, DECKZ + 13.3, winMat);
    bx(G, 20.2, 19.7, 0.35, -60, 0, DECKZ + 14.75, greyMat);
    bx(G, 13, 12, 2.6, -62, 0, DECKZ + 16.2, greyMat);           /* nav top */
    for (i = 0; i < 3; i++) {                                    /* accommodation window bands */
      bx(G, 28.1, 23.1, 0.55, -64, 0, DECKZ + 2.6 + i * 0.0, winMat);
      break;
    }
    bx(G, 26.1, 21.1, 0.5, -64, 0, DECKZ + 6.6, winMat);
    bx(G, 24.1, 19.1, 0.5, -64, 0, DECKZ + 10.1, winMat);
    bx(G, 6, 3.0, 2.4, -77.5, 0, DECKZ + 1.2, greyMat);          /* aft house / stores */

    /* funnel */
    var fun = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 4.4, 10.0, 4), greyMat);
    fun.rotation.set(Math.PI / 2, Math.PI / 4, 0); fun.position.set(-70, 0, DECKZ + 20.0); G.add(fun);
    bx(G, 6.4, 8.0, 1.1, -70, 0, DECKZ + 25.2, darkMat);         /* black funnel cap */
    bx(G, 6.6, 8.2, 1.3, -70, 0, DECKZ + 21.4, teamMat);         /* team band */
    tube(G, 0.55, 0.55, 2.6, "z", -68.6, 1.8, DECKZ + 26.6, darkMat, 8);
    tube(G, 0.55, 0.55, 2.6, "z", -68.6, -1.8, DECKZ + 26.6, darkMat, 8);
    tube(G, 0.4, 0.4, 1.8, "z", -71.6, 0, DECKZ + 26.2, darkMat, 8);

    /* mast, radars, satcom */
    tube(G, 0.35, 0.5, 12.0, "z", -62, 0, DECKZ + 23.5, greyMat, 8);
    link(G, [-62, 0, DECKZ + 20], [-58.5, 3.6, DECKZ + 15.2], 0.24, greyMat);
    link(G, [-62, 0, DECKZ + 20], [-58.5, -3.6, DECKZ + 15.2], 0.24, greyMat);
    bx(G, 0.3, 9.0, 0.3, -62, 0, DECKZ + 26.5, greyMat);          /* yard */
    bx(G, 0.3, 6.0, 0.3, -62, 0, DECKZ + 24.0, greyMat);
    var rad = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5.2, 0.75), darkMat);
    rad.position.set(-62, 0, DECKZ + 29.9); rad.rotation.z = 0.3; G.add(rad);
    tube(G, 0.16, 0.16, 1.4, "z", -62, 0, DECKZ + 29.1, steelMat, 6);
    var dome1 = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 8), greyMat);
    dome1.position.set(-66, 4.6, DECKZ + 18.4); G.add(dome1);
    var dome2 = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 8), greyMat);
    dome2.position.set(-66, -4.6, DECKZ + 18.4); G.add(dome2);
    tube(G, 1.6, 1.6, 0.5, "z", -66, 4.6, DECKZ + 17.5, greyMat, 12);
    tube(G, 1.6, 1.6, 0.5, "z", -66, -4.6, DECKZ + 17.5, greyMat, 12);
    for (i = 0; i < 4; i++) {                                     /* whip antennas */
      tube(G, 0.07, 0.07, 6.0, "z", -74 + (i % 2) * 4, (i < 2 ? 1 : -1) * 10.6, DECKZ + 7.2, steelMat, 5);
    }
    bx(G, 0.08, 1.3, 0.85, -49.8, 0, DECKZ + 16.0, teamMat);      /* ensign at the bridge front */

    /* enclosed lifeboats on davits */
    for (i = 0; i < 2; i++) {
      var sy2 = i ? -1 : 1;
      tube(G, 0.28, 0.28, 4.4, "z", -70, sy2 * 12.0, DECKZ + 6.4, greyMat, 6);
      link(G, [-70, sy2 * 12.0, DECKZ + 8.4], [-70, sy2 * 14.6, DECKZ + 7.2], 0.25, greyMat);
      var boat = new THREE.Group(); boat.position.set(-70, sy2 * 13.9, DECKZ + 5.2);
      tube(boat, 1.05, 1.05, 7.2, "x", 0, 0, 0.5, orangeMat, 10);
      bx(boat, 7.2, 2.1, 0.9, 0, 0, -0.35, orangeMat);
      bx(boat, 1.3, 1.4, 0.5, 2.4, 0, 1.3, winMat);
      G.add(boat);
      link(G, [-70, sy2 * 14.6, DECKZ + 7.0], [-70, sy2 * 13.9, DECKZ + 6.0], 0.06, steelMat, 4);
    }
    /* gun tubs at the deckhouse corners */
    for (i = 0; i < 2; i++) {
      var sy3 = i ? -1 : 1;
      tube(G, 1.5, 1.5, 1.1, "z", -52.5, sy3 * 9.5, DECKZ + 15.3, greyMat, 12);
      tube(G, 0.16, 0.16, 1.3, "z", -52.5, sy3 * 9.5, DECKZ + 16.4, darkMat, 6);
      bx(G, 1.5, 0.25, 0.25, -51.7, sy3 * 9.5, DECKZ + 16.9, darkMat);
    }

    /* ================= replenishment kingposts ================= */
    var STA = [-22, 26];
    for (k = 0; k < STA.length; k++) {
      var XS = STA[k];
      bx(G, 11.0, 20.0, 1.0, XS, 0, DECKZ + 0.5, greyMat);        /* station foundation */
      for (i = 0; i < 2; i++) {
        var sy4 = i ? -1 : 1;
        tube(G, 0.72, 0.98, 19.0, "z", XS, sy4 * 7.2, DECKZ + 10.5, greyMat, 10);
        /* platforms */
        bx(G, 3.4, 3.4, 0.24, XS, sy4 * 7.2, DECKZ + 9.6, greyMat);
        bx(G, 2.6, 2.6, 0.24, XS, sy4 * 7.2, DECKZ + 15.2, greyMat);
        for (var q = 0; q < 4; q++) {                              /* platform railing */
          tube(G, 0.05, 0.05, 1.0, "z", XS - 1.5 + q, sy4 * 8.8, DECKZ + 10.2, steelMat, 4);
        }
        tube(G, 0.04, 0.04, 3.4, "x", XS, sy4 * 8.8, DECKZ + 10.6, steelMat, 4);
        /* outboard braces down to the deck edge */
        link(G, [XS, sy4 * 7.2, DECKZ + 8.0], [XS, sy4 * 12.8, DECKZ + 0.4], 0.26, greyMat);
        link(G, [XS, sy4 * 7.2, DECKZ + 13.0], [XS - 6.5, sy4 * 7.2, DECKZ + 0.4], 0.22, greyMat);
        link(G, [XS, sy4 * 7.2, DECKZ + 13.0], [XS + 6.5, sy4 * 7.2, DECKZ + 0.4], 0.22, greyMat);
        /* sliding padeye rail */
        bx(G, 0.4, 0.5, 11.0, XS, sy4 * 8.0, DECKZ + 12.0, darkMat);
        bx(G, 1.1, 1.0, 0.7, XS, sy4 * 8.2, DECKZ + 13.6, steelMat);
        /* outboard hose boom and the fuel rig itself */
        link(G, [XS, sy4 * 7.6, DECKZ + 15.6], [XS, sy4 * 13.6, DECKZ + 9.4], 0.28, greyMat, 6);
        link(G, [XS, sy4 * 7.4, DECKZ + 18.6], [XS, sy4 * 14.4, DECKZ + 16.2], 0.07, steelMat, 4);
        link(G, [XS, sy4 * 8.2, DECKZ + 14.6], [XS, sy4 * 11.2, DECKZ + 11.4], 0.3, rubMat, 6);
        link(G, [XS, sy4 * 11.2, DECKZ + 11.4], [XS, sy4 * 13.4, DECKZ + 9.9], 0.3, rubMat, 6);
        link(G, [XS, sy4 * 13.4, DECKZ + 9.9], [XS, sy4 * 14.2, DECKZ + 7.6], 0.3, rubMat, 6);
        bx(G, 0.8, 1.6, 0.8, XS, sy4 * 14.3, DECKZ + 6.6, steelMat);   /* probe / coupling */
        tube(G, 0.85, 0.85, 1.9, "z", XS - 3.4, sy4 * 9.4, DECKZ + 1.6, darkMat, 10);  /* riser */
        bx(G, 2.6, 2.6, 2.2, XS + 3.6, sy4 * 8.6, DECKZ + 1.6, greyMat);               /* winch house */
        tube(G, 0.55, 0.55, 2.0, "y", XS + 3.6, sy4 * 8.6, DECKZ + 2.4, steelMat, 10); /* winch drum */
      }
      bx(G, 1.5, 16.4, 1.1, XS, 0, DECKZ + 19.4, greyMat);         /* cross beam */
      bx(G, 1.1, 16.4, 0.3, XS, 0, DECKZ + 17.0, greyMat);
      link(G, [XS, 6.6, DECKZ + 18.9], [XS, 0, DECKZ + 15.4], 0.18, greyMat);
      link(G, [XS, -6.6, DECKZ + 18.9], [XS, 0, DECKZ + 15.4], 0.18, greyMat);
      tube(G, 0.12, 0.12, 2.2, "z", XS, 0, DECKZ + 21.0, steelMat, 5);
      bx(G, 0.5, 0.5, 0.5, XS, 0, DECKZ + 22.3, teamMat);          /* rig light */
    }

    /* ================= deck cargo piping ================= */
    var pipeY = [9.4, 10.6, -9.4, -10.6];
    for (i = 0; i < pipeY.length; i++) {
      tube(G, 0.3, 0.3, 104, "x", 6, pipeY[i], DECKZ + 0.75, greyMat, 8);
    }
    for (i = 0; i < 14; i++) {                                     /* pipe saddles */
      bx(G, 0.5, 2.6, 0.55, -44 + i * 8, 10.0, DECKZ + 0.3, greyMat);
      bx(G, 0.5, 2.6, 0.55, -44 + i * 8, -10.0, DECKZ + 0.3, greyMat);
    }
    for (i = 0; i < 2; i++) {                                      /* cross-deck manifold */
      tube(G, 0.28, 0.28, 20.0, "y", STA[i] - 4.4, 0, DECKZ + 0.75, greyMat, 8);
      bx(G, 1.6, 1.6, 1.4, STA[i] - 4.4, 0, DECKZ + 1.2, greyMat);
      tube(G, 0.22, 0.22, 1.2, "z", STA[i] - 4.4, 0, DECKZ + 2.4, steelMat, 6);
    }
    /* hose reels and stores between the stations */
    for (i = 0; i < 4; i++) {
      var hy = (i % 2 ? 1 : -1) * 6.4, hx = -2 + Math.floor(i / 2) * 10;
      tube(G, 1.3, 1.3, 2.2, "y", hx, hy, DECKZ + 1.6, darkMat, 12);
      bx(G, 3.0, 2.6, 0.4, hx, hy, DECKZ + 0.3, greyMat);
    }
    for (i = 0; i < 6; i++) {
      bx(G, 6.1, 2.44, 2.59, -38 + (i % 3) * 6.4, (i < 3 ? 1 : -1) * 12.0, DECKZ + 1.3,
        i % 2 ? greyMat : orangeMat);                              /* stores containers */
    }

    /* ================= deck crane (slewing) ================= */
    tube(G, 1.7, 2.0, 4.8, "z", -44, 0, DECKZ + 2.4, greyMat, 12);
    var crane = new THREE.Group(); crane.name = "turret"; crane.position.set(-44, 0, DECKZ + 4.8);
    tube(crane, 1.9, 1.9, 1.0, "z", 0, 0, 0.5, darkMat, 12);
    bx(crane, 3.6, 3.2, 2.6, -1.6, 0, 2.3, greyMat);
    bx(crane, 1.2, 3.3, 1.2, 0.4, 0, 2.9, winMat);
    bx(crane, 2.4, 3.4, 1.6, -3.8, 0, 1.6, darkMat);               /* counterweight */
    var jib = new THREE.Group(); jib.position.set(0.6, 0, 2.2); jib.rotation.y = -0.44;
    bx(jib, 17.0, 0.9, 0.8, 8.5, 0, 0, greyMat);
    bx(jib, 17.0, 0.16, 0.16, 8.5, 0.55, 0.55, steelMat);
    bx(jib, 17.0, 0.16, 0.16, 8.5, -0.55, 0.55, steelMat);
    for (i = 0; i < 8; i++) {
      link(jib, [1.6 + i * 2.0, 0.55, 0.45], [3.4 + i * 2.0, -0.55, 0.45], 0.07, steelMat, 4);
    }
    crane.add(jib);
    link(crane, [15.9, 0, 9.2], [15.9, 0, 4.6], 0.06, steelMat, 4);
    bx(crane, 0.7, 0.7, 0.9, 15.9, 0, 4.0, steelMat);              /* hook block */
    G.add(crane);

    /* ================= ground tackle, fittings, railings ================= */
    for (i = 0; i < 2; i++) {
      var sy5 = i ? -1 : 1;
      bx(G, 2.2, 0.6, 2.0, 89.5, sy5 * 9.6, 7.6, darkMat);         /* stowed anchor */
      tube(G, 0.75, 0.75, 1.4, "z", 84, sy5 * 5.0, FCZ + 0.8, steelMat, 10);  /* windlass gypsy */
      bx(G, 3.6, 3.0, 1.5, 81, sy5 * 5.0, FCZ + 1.0, greyMat);
      tube(G, 0.9, 0.9, 0.9, "z", 74, sy5 * 8.0, FCZ + 0.6, steelMat, 10);    /* warping drum */
    }
    tube(G, 0.1, 0.1, 7.0, "z", 101, 0, FCZ + 3.6, steelMat, 5);   /* jackstaff */
    tube(G, 0.1, 0.1, 6.0, "z", -100.5, 0, DECKZ + 3.2, steelMat, 5);
    var bitt = [[-95, 8], [-95, -8], [-84, 12], [-84, -12], [46, 13], [46, -13],
      [66, 12.5], [66, -12.5], [92, 6], [92, -6]];
    for (i = 0; i < bitt.length; i++) {
      var bz = bitt[i][0] > 60 ? FCZ + 0.5 : DECKZ + 0.5;
      tube(G, 0.28, 0.28, 1.0, "z", bitt[i][0], bitt[i][1], bz, steelMat, 6);
      tube(G, 0.28, 0.28, 1.0, "z", bitt[i][0] + 1.3, bitt[i][1], bz, steelMat, 6);
      bx(G, 2.6, 0.9, 0.2, bitt[i][0] + 0.65, bitt[i][1], bz - 0.5, steelMat);
    }
    /* floodlight masts around the replenishment area */
    for (i = 0; i < 4; i++) {
      var fx2 = [-34, -10, 14, 38][i];
      tube(G, 0.14, 0.14, 5.0, "z", fx2, 13.4, DECKZ + 2.5, greyMat, 6);
      bx(G, 0.7, 1.1, 0.5, fx2, 13.4, DECKZ + 5.2, darkMat);
      tube(G, 0.14, 0.14, 5.0, "z", fx2, -13.4, DECKZ + 2.5, greyMat, 6);
      bx(G, 0.7, 1.1, 0.5, fx2, -13.4, DECKZ + 5.2, darkMat);
    }
    /* deck railing following the sheer strake */
    for (i = 0; i < 21; i++) {
      var rx2 = -99 + i * 7.9;
      var ry = edgeY(rx2) - 0.5;
      tube(G, 0.05, 0.05, 1.15, "z", rx2, ry, DECKZ + 0.58, steelMat, 4);
      tube(G, 0.05, 0.05, 1.15, "z", rx2, -ry, DECKZ + 0.58, steelMat, 4);
      if (i > 0) {
        var px2 = -99 + (i - 1) * 7.9, py2 = edgeY(px2) - 0.5;
        link(G, [px2, py2, DECKZ + 1.12], [rx2, ry, DECKZ + 1.12], 0.035, steelMat, 4);
        link(G, [px2, -py2, DECKZ + 1.12], [rx2, -ry, DECKZ + 1.12], 0.035, steelMat, 4);
        link(G, [px2, py2, DECKZ + 0.66], [rx2, ry, DECKZ + 0.66], 0.035, steelMat, 4);
        link(G, [px2, -py2, DECKZ + 0.66], [rx2, -ry, DECKZ + 0.66], 0.035, steelMat, 4);
      }
    }
    return G;
  }
};

BLD_MODELS["power"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var SD = 40213, i, j, s;
    function rn() { SD = (SD * 16807) % 2147483647; return (SD % 10000) / 10000; }
    function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
    function tex(c, rx, ry) {
      var t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (rx) t.repeat.set(rx, ry);
      return t;
    }
    function patches(x, w, h, n, lt, dk) {
      for (var q = 0; q < n; q++) {
        x.globalAlpha = 0.04 + rn() * 0.04;
        x.fillStyle = (q % 3 === 0) ? lt : dk;
        x.fillRect(rn() * w, rn() * h, w * 0.05 + rn() * w * 0.24, h * 0.04 + rn() * h * 0.2);
      }
      x.globalAlpha = 1;
    }
    function seams(x, w, h, cols, rows, col) {
      x.globalAlpha = 0.5; x.strokeStyle = col || "#20241e"; x.lineWidth = 2; x.beginPath();
      for (var q = 1; q < cols; q++) { x.moveTo(q * w / cols, 0); x.lineTo(q * w / cols, h); }
      for (q = 1; q < rows; q++) { x.moveTo(0, q * h / rows); x.lineTo(w, q * h / rows); }
      x.stroke(); x.globalAlpha = 1;
    }
    function drips(x, w, h, n, col) {
      x.fillStyle = col || "#15180f";
      for (var q = 0; q < n; q++) {
        x.globalAlpha = 0.05 + rn() * 0.1;
        x.fillRect(rn() * w, rn() * h * 0.45, 1 + rn() * 4, h * 0.1 + rn() * h * 0.35);
      }
      x.globalAlpha = 1;
    }
    function hazard(x, px, py, pw, ph, step) {
      x.save(); x.beginPath(); x.rect(px, py, pw, ph); x.clip();
      x.globalAlpha = 0.94; x.fillStyle = "#c9a825"; x.fillRect(px, py, pw, ph);
      x.fillStyle = "#191a16";
      for (var q = -2; q < (pw + ph) / step + 2; q++) {
        var bx = px + q * step;
        x.beginPath();
        x.moveTo(bx, py); x.lineTo(bx + step * 0.5, py);
        x.lineTo(bx + step * 0.5 + ph, py + ph); x.lineTo(bx + ph, py + ph);
        x.closePath(); x.fill();
      }
      x.globalAlpha = 1; x.restore();
    }

    /* ---------------- textures ---------------- */
    var ac = cvs(512, 512), ax = ac.getContext("2d");
    ax.fillStyle = "#565b54"; ax.fillRect(0, 0, 512, 512);
    patches(ax, 512, 512, 40, "#7d8278", "#31352e");
    ax.globalAlpha = 0.38; ax.strokeStyle = "#2b2e28"; ax.lineWidth = 3; ax.beginPath();
    for (i = 1; i < 8; i++) { ax.moveTo(i * 64, 0); ax.lineTo(i * 64, 512); ax.moveTo(0, i * 64); ax.lineTo(512, i * 64); }
    ax.stroke(); ax.globalAlpha = 1;
    hazard(ax, 300, 20, 190, 20, 24);
    ax.globalAlpha = 0.6; ax.fillStyle = "#c8c4b0";
    ax.fillRect(40, 250, 210, 5); ax.fillRect(40, 250, 5, 120);
    for (i = 0; i < 6; i++) ax.fillRect(60 + i * 34, 400, 20, 5);
    ax.globalAlpha = 0.16; ax.fillStyle = "#0a0c08";
    for (i = 0; i < 26; i++) ax.fillRect(rn() * 512, rn() * 512, 24 + rn() * 110, 4 + rn() * 8);
    ax.globalAlpha = 1;
    var apronTex = tex(ac);

    function wallCanvas(base, rows, cols) {
      var c = cvs(256, 256), x = c.getContext("2d");
      x.fillStyle = base; x.fillRect(0, 0, 256, 256);
      patches(x, 256, 256, 24, "#b4b7a9", "#22261e");
      seams(x, 256, 256, 6, 4);
      var r, q, ww = Math.floor(212 / cols), wh = 34;
      for (r = 0; r < rows; r++) for (q = 0; q < cols; q++) {
        var wx = 20 + q * (ww + 6), wy = 36 + r * 78;
        x.fillStyle = "#1c252a"; x.fillRect(wx, wy, ww - 8, wh);
        x.globalAlpha = 0.2; x.fillStyle = "#a3b6c0"; x.fillRect(wx + 2, wy + 2, (ww - 8) * 0.5, wh * 0.4); x.globalAlpha = 1;
        x.strokeStyle = "#767a70"; x.lineWidth = 2; x.strokeRect(wx, wy, ww - 8, wh);
        x.beginPath();
        x.moveTo(wx, wy + wh / 2); x.lineTo(wx + ww - 8, wy + wh / 2);
        x.moveTo(wx + (ww - 8) / 2, wy); x.lineTo(wx + (ww - 8) / 2, wy + wh);
        x.stroke();
      }
      x.globalAlpha = 0.32; x.fillStyle = "#2b2f27"; x.fillRect(0, 238, 256, 18); x.globalAlpha = 1;
      drips(x, 256, 256, 24);
      return c;
    }
    var wallTex = tex(wallCanvas("#6e7367", 2, 6));
    var endTex = tex(wallCanvas("#6e7367", 2, 4));

    /* cooling tower shell: vertical shuttering bands + streaking */
    var tc = cvs(256, 256), tx = tc.getContext("2d");
    tx.fillStyle = "#8d9089"; tx.fillRect(0, 0, 256, 256);
    patches(tx, 256, 256, 30, "#b9bcb3", "#3c4038");
    tx.globalAlpha = 0.4; tx.strokeStyle = "#4a4e46"; tx.lineWidth = 2; tx.beginPath();
    for (i = 1; i < 18; i++) { tx.moveTo(0, i * 14); tx.lineTo(256, i * 14); }
    for (i = 1; i < 16; i++) { tx.moveTo(i * 16, 0); tx.lineTo(i * 16, 256); }
    tx.stroke(); tx.globalAlpha = 1;
    tx.fillStyle = "#4c4f45";
    for (i = 0; i < 60; i++) {
      tx.globalAlpha = 0.05 + rn() * 0.12;
      tx.fillRect(rn() * 256, rn() * 90, 2 + rn() * 7, 40 + rn() * 150);
    }
    tx.globalAlpha = 0.3; tx.fillStyle = "#2f332c"; tx.fillRect(0, 0, 256, 12); tx.globalAlpha = 1;
    var shellTex = tex(tc, 3, 1);

    var rc = cvs(256, 256), rx = rc.getContext("2d");
    rx.fillStyle = "#4b5054"; rx.fillRect(0, 0, 256, 256);
    rx.globalAlpha = 0.3; rx.strokeStyle = "#2c3032"; rx.lineWidth = 2;
    for (i = 0; i < 64; i++) { rx.beginPath(); rx.moveTo(i * 4, 0); rx.lineTo(i * 4, 256); rx.stroke(); }
    rx.globalAlpha = 1;
    patches(rx, 256, 256, 20, "#787d7f", "#6a4a2a");
    var roofTex = tex(rc, 3, 3);

    var lc = cvs(64, 64), lx = lc.getContext("2d");
    lx.clearRect(0, 0, 64, 64);
    lx.strokeStyle = "rgba(198,204,206,0.98)"; lx.lineWidth = 3;
    for (i = -64; i < 128; i += 16) {
      lx.beginPath(); lx.moveTo(i, 0); lx.lineTo(i + 64, 64); lx.stroke();
      lx.beginPath(); lx.moveTo(i, 64); lx.lineTo(i + 64, 0); lx.stroke();
    }

    /* ---------------- materials ---------------- */
    var conc = new THREE.MeshStandardMaterial({ color: 0xffffff, map: wallTex, roughness: 0.78, metalness: 0.05 });
    var concEnd = new THREE.MeshStandardMaterial({ color: 0xffffff, map: endTex, roughness: 0.78, metalness: 0.05 });
    var shellM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: shellTex, roughness: 0.85, metalness: 0.02, side: THREE.DoubleSide });
    var roofM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: roofTex, roughness: 0.6, metalness: 0.3 });
    var apronM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: apronTex, roughness: 0.9, metalness: 0.02 });
    var plainM = new THREE.MeshStandardMaterial({ color: 0x565b54, roughness: 0.88, metalness: 0.02 });
    var steel = new THREE.MeshStandardMaterial({ color: 0x8b908b, roughness: 0.3, metalness: 0.85 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x2a2d2a, roughness: 0.6, metalness: 0.4 });
    var grey = new THREE.MeshStandardMaterial({ color: 0x6d7378, roughness: 0.55, metalness: 0.35 });
    var porc = new THREE.MeshStandardMaterial({ color: 0x9aa0a3, roughness: 0.35, metalness: 0.1 });
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x1b262c, roughness: 0.18, metalness: 0.2 });
    var teamM = new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.55, metalness: 0.15 });
    var lampM = new THREE.MeshStandardMaterial({ color: 0xf4eecb, emissive: 0x6a6440, roughness: 0.4, metalness: 0.2 });
    var wood = new THREE.MeshStandardMaterial({ color: 0x6d5c3f, roughness: 0.85, metalness: 0.02 });
    var drumCache = {};

    function box(a, b, c, m) { return new THREE.Mesh(new THREE.BoxGeometry(a, b, c), m); }
    function at(mesh, x, y, z, p) { mesh.position.set(x, y, z); (p || g).add(mesh); return mesh; }
    function cylZ(r1, r2, h, m, sg) { var ge = new THREE.CylinderGeometry(r1, r2, h, sg || 10); ge.rotateX(Math.PI / 2); return new THREE.Mesh(ge, m); }
    function cylX(r1, r2, l, m, sg) { var ge = new THREE.CylinderGeometry(r1, r2, l, sg || 8); ge.rotateZ(-Math.PI / 2); return new THREE.Mesh(ge, m); }
    function cylY(r1, r2, l, m, sg) { return new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, l, sg || 8), m); }
    function fenceRun(x0, y0, x1, y1, h) {
      var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), a = Math.atan2(dy, dx);
      var t = tex(lc, L / 2.2, h / 2.2);
      var m = new THREE.MeshStandardMaterial({ color: 0x9aa0a2, map: t, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 0.5, metalness: 0.6 });
      var ge = new THREE.PlaneGeometry(L, h); ge.rotateX(Math.PI / 2);
      var mesh = new THREE.Mesh(ge, m);
      mesh.position.set((x0 + x1) / 2, (y0 + y1) / 2, h / 2 + 0.1); mesh.rotation.z = a; g.add(mesh);
      var rail = cylX(0.05, 0.05, L, steel, 6);
      rail.position.set((x0 + x1) / 2, (y0 + y1) / 2, h + 0.1); rail.rotation.z = a; g.add(rail);
      var n = Math.max(2, Math.round(L / 4.5));
      for (var q = 0; q <= n; q++) at(cylZ(0.07, 0.07, h + 0.3, steel, 6), x0 + dx * q / n, y0 + dy * q / n, (h + 0.3) / 2);
    }
    function floodlight(px, py, hgt, ang) {
      var p = new THREE.Group(); p.position.set(px, py, 0); p.rotation.z = ang; g.add(p);
      at(cylZ(0.5, 0.6, 0.5, plainM, 8), 0, 0, 0.25, p);
      at(cylZ(0.13, 0.18, hgt, steel, 8), 0, 0, hgt / 2, p);
      at(box(0.24, 1.9, 0.2, steel), 0, 0, hgt + 0.1, p);
      for (var q = -1; q <= 1; q++) {
        at(box(0.4, 0.55, 0.46, dark), -0.1, q * 0.68, hgt + 0.4, p);
        at(box(0.06, 0.46, 0.36, lampM), 0.13, q * 0.68, hgt + 0.4, p);
      }
    }
    function drum(px, py, pz, col) {
      var m = drumCache[col] || (drumCache[col] = new THREE.MeshStandardMaterial({ color: col, roughness: 0.6, metalness: 0.35 }));
      at(cylZ(0.3, 0.3, 0.92, m, 12), px, py, pz + 0.46);
      at(cylZ(0.32, 0.32, 0.07, dark, 12), px, py, pz + 0.62);
      at(cylZ(0.32, 0.32, 0.07, dark, 12), px, py, pz + 0.3);
    }
    function crate(px, py, pz, sx, sy, sz, rot) {
      var c = box(sx, sy, sz, wood); c.position.set(px, py, pz + sz / 2); c.rotation.z = rot || 0; g.add(c);
      var b1 = box(sx + 0.05, 0.07, 0.09, dark); b1.position.set(px, py, pz + sz * 0.72); b1.rotation.z = rot || 0; g.add(b1);
    }
    function sandbags(px, py, ang, rows, per) {
      var grp = new THREE.Group(); grp.position.set(px, py, 0); grp.rotation.z = ang; g.add(grp);
      var bagM = new THREE.MeshStandardMaterial({ color: 0x7b7355, roughness: 0.95, metalness: 0.0 });
      for (var r = 0; r < rows; r++) for (var q = 0; q < per - r; q++) {
        var b = box(0.62, 0.4, 0.26, bagM);
        b.position.set((q - (per - r - 1) / 2) * 0.66 + (r % 2) * 0.16, 0, 0.14 + r * 0.25);
        b.rotation.z = (rn() - 0.5) * 0.16; grp.add(b);
      }
    }
    function railing(px, py, len, ang, hgt, parent) {
      var grp = new THREE.Group(); grp.position.set(px, py, 0); grp.rotation.z = ang; (parent || g).add(grp);
      var n = Math.max(2, Math.round(len / 1.6));
      for (var q = 0; q <= n; q++) at(cylZ(0.035, 0.035, hgt, steel, 5), -len / 2 + len * q / n, 0, hgt / 2, grp);
      at(cylX(0.03, 0.03, len, steel, 5), 0, 0, hgt, grp);
      at(cylX(0.025, 0.025, len, steel, 5), 0, 0, hgt * 0.55, grp);
      return grp;
    }

    /* ---------------- ground ---------------- */
    var apron = new THREE.Mesh(new THREE.BoxGeometry(38, 38, 0.3), [plainM, plainM, plainM, plainM, apronM, plainM]);
    at(apron, 0, 0, 0.15);

    /* ---------------- turbine hall ---------------- */
    var hx = -8, hw = 20, hd = 22, hh = 10;
    at(new THREE.Mesh(new THREE.BoxGeometry(hw, hd, hh), [concEnd, concEnd, conc, conc, roofM, plainM]), hx, 0, hh / 2 + 0.3);
    for (s = -1; s <= 1; s += 2) {
      var rp = box(hw + 1.0, hd / 2 + 0.7, 0.32, roofM);
      rp.position.set(hx, s * (hd / 4 + 0.08), hh + 0.3 + Math.tan(0.16) * hd / 4 * 0.5 + 0.08);
      rp.rotation.x = -s * 0.16; g.add(rp);
    }
    at(box(hw + 1.2, 0.7, 0.45, roofM), hx, 0, hh + 0.3 + Math.tan(0.16) * hd / 4 + 0.2);
    /* roof ridge vents + turbine hall crane bump */
    for (i = -2; i <= 2; i++) at(box(2.2, 1.6, 0.9, grey), hx + i * 4.0, 0, hh + 2.2);
    for (i = -4; i <= 4; i++) at(box(0.25, hd * 0.98, 0.14, dark), hx + i * 2.2, 0, hh + 0.45 + Math.tan(0.16) * hd / 4 * 0.5);
    /* team stripe */
    at(box(hw + 0.3, hd + 0.3, 0.7, teamM), hx, 0, 8.5);
    /* boiler house annex + exhaust ducts */
    at(box(6.5, 7.0, 13.5, plainM), hx - 6.0, -12.0, 7.0);
    at(box(7.0, 7.5, 0.4, roofM), hx - 6.0, -12.0, 13.9);
    for (i = -1; i <= 1; i++) at(cylZ(0.75, 0.7, 5.0, grey, 12), hx - 8.0 + i * 2.2, -12.0, 16.4);
    for (i = -1; i <= 1; i++) at(cylZ(0.85, 0.85, 0.35, dark, 12), hx - 8.0 + i * 2.2, -12.0, 18.8);
    /* doors and stairs */
    at(box(0.3, 4.2, 5.2, dark), hx + hw / 2 + 0.06, 3.5, 2.9);
    at(box(0.3, 2.0, 2.6, grey), hx + hw / 2 + 0.06, -4.5, 1.6);
    at(box(1.6, 2.6, 0.35, plainM), hx + hw / 2 + 0.85, -4.5, 0.45);
    for (i = 0; i < 12; i++) at(cylX(0.035, 0.035, 0.6, steel, 5), hx - hw / 2 - 0.5, 8.0, 1.0 + i * 0.8).rotation.z = Math.PI / 2;
    for (s = -1; s <= 1; s += 2) at(cylZ(0.055, 0.055, hh, steel, 6), hx - hw / 2 - 0.5, 8.0 + s * 0.28, hh / 2 + 0.3);
    /* wall pilasters */
    for (i = -4; i <= 4; i++) at(box(0.4, 0.8, hh - 1.0, plainM), hx - hw / 2 - 0.16, i * 2.5, (hh - 1.0) / 2 + 0.3);

    /* ---------------- two cooling stacks ---------------- */
    function coolingStack(px, py) {
      var pts = [], n = 11, H = 20, q, t, r;
      for (q = 0; q <= n; q++) {
        t = q / n; var z = t * H;
        r = 4.05 * Math.sqrt(1 + Math.pow((z - 13.5) / 15.5, 2));
        pts.push(new THREE.Vector2(r, z));
      }
      var shell = new THREE.Mesh(new THREE.LatheGeometry(pts, 22), shellM);
      shell.geometry.rotateX(Math.PI / 2);
      at(shell, px, py, 0.3);
      /* dark inner throat + rim */
      var rTop = 4.05 * Math.sqrt(1 + Math.pow((20 - 13.5) / 15.5, 2));
      at(cylZ(rTop - 0.28, rTop - 0.28, 2.6, dark, 22), px, py, 19.2);
      at(new THREE.Mesh(new THREE.TorusGeometry(rTop - 0.12, 0.22, 6, 24), dark), px, py, 20.3);
      at(cylZ(rTop - 0.4, rTop - 0.4, 0.2, dark, 20), px, py, 17.4);
      /* base ring of raker columns and lower cowl */
      var rBase = 4.05 * Math.sqrt(1 + Math.pow(13.5 / 15.5, 2));
      for (q = 0; q < 14; q++) {
        var a = q / 14 * Math.PI * 2;
        var col = box(0.42, 0.42, 3.4, plainM);
        col.position.set(px + Math.cos(a) * (rBase + 0.15), py + Math.sin(a) * (rBase + 0.15), 1.9);
        col.rotation.z = a; col.rotation.y = 0.16; g.add(col);
      }
      at(cylZ(rBase + 0.7, rBase + 0.7, 0.7, plainM, 22), px, py, 0.6);
      at(cylZ(rBase + 0.55, rBase + 0.4, 0.5, plainM, 22), px, py, 3.7);
      /* maintenance ladder up the shell */
      for (q = 0; q < 13; q++) at(cylX(0.035, 0.035, 0.6, steel, 5), px + rBase + 0.25 - q * 0.06, py, 4.4 + q * 1.2);
      /* aircraft warning lights */
      for (q = 0; q < 4; q++) {
        var a2 = q / 4 * Math.PI * 2 + 0.4;
        at(new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6),
          new THREE.MeshStandardMaterial({ color: 0xd8402c, emissive: 0x571209, roughness: 0.5, metalness: 0.2 })),
          px + Math.cos(a2) * (rTop - 0.1), py + Math.sin(a2) * (rTop - 0.1), 20.6);
      }
    }
    coolingStack(10.5, -10.8);
    coolingStack(10.5, 10.8);
    /* steam ducts from hall to each stack */
    for (s = -1; s <= 1; s += 2) {
      at(cylX(1.15, 1.15, 8.4, grey, 12), 2.6, s * 10.8, 6.4);
      at(new THREE.Mesh(new THREE.TorusGeometry(1.6, 1.15, 8, 14, Math.PI / 2), grey), 6.8, s * 10.8, 4.8).rotation.x = Math.PI / 2;
      at(cylZ(1.15, 1.15, 3.4, grey, 12), 6.8, s * 10.8, 3.1);
      for (i = 0; i < 3; i++) at(box(0.4, 0.4, 5.4, steel), -0.8 + i * 2.6, s * 10.8, 2.9);
      at(box(3.2, 3.0, 2.6, grey), -1.2, s * 10.8, 6.4);
      at(new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.18, 6, 14), dark), 2.0, s * 10.8, 6.4).rotation.z = Math.PI / 2;
    }

    /* ---------------- transformer yard ---------------- */
    var ty = -15.6;
    at(box(19, 8.2, 0.22, plainM), -6.5, ty, 0.4);
    function transformer(px) {
      var t = new THREE.Group(); t.position.set(px, ty, 0.5); g.add(t);
      at(box(3.4, 3.0, 3.0, grey), 0, 0, 1.5, t);
      at(box(3.6, 3.2, 0.3, dark), 0, 0, 3.15, t);
      /* radiator fin banks */
      for (var q = 0; q < 7; q++) {
        at(box(0.12, 1.5, 2.1, dark), -1.85 + 0, 0, 1.4, t).position.y = 0;
        at(box(0.1, 1.6, 2.0, dark), 1.8, -1.05 + q * 0.35, 1.35, t);
        at(box(0.1, 1.6, 2.0, dark), -1.8, -1.05 + q * 0.35, 1.35, t);
      }
      /* HV bushings */
      for (q = -1; q <= 1; q++) {
        at(cylZ(0.3, 0.24, 0.4, dark, 10), q * 1.05, 0.6, 3.45, t);
        for (var k = 0; k < 5; k++) at(cylZ(0.26 - k * 0.012, 0.26 - k * 0.012, 0.12, porc, 10), q * 1.05, 0.6, 3.75 + k * 0.26);
        at(cylZ(0.09, 0.09, 1.5, porc, 8), q * 1.05, 0.6, 4.4, t);
        at(new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), steel), q * 1.05, 0.6, 5.2, t);
      }
      /* conservator drum + cooling fans */
      at(cylX(0.5, 0.5, 3.0, grey, 10), 0, -1.85, 3.0, t);
      at(box(1.0, 0.3, 1.0, dark), 0.0, -1.75, 1.0, t);
      at(box(0.2, 1.2, 0.9, teamM), 1.86, 0.9, 1.6, t);
    }
    transformer(-13.5); transformer(-6.5); transformer(0.5);
    /* insulator rows on a low frame */
    for (i = 0; i < 6; i++) {
      at(box(0.5, 0.5, 1.6, plainM), -15.0 + i * 3.2, ty + 3.4, 1.1);
      for (j = 0; j < 4; j++) at(cylZ(0.2, 0.2, 0.16, porc, 8), -15.0 + i * 3.2, ty + 3.4, 2.0 + j * 0.18);
      at(cylZ(0.07, 0.07, 0.5, steel, 6), -15.0 + i * 3.2, ty + 3.4, 2.9);
    }
    /* cable gantry with catenary conductors */
    function gantry(px) {
      var t = new THREE.Group(); t.position.set(px, ty - 2.4, 0); g.add(t);
      for (s = -1; s <= 1; s += 2) {
        at(cylZ(0.22, 0.28, 9.6, steel, 8), 0, s * 3.2, 4.8, t);
        at(box(1.2, 1.2, 0.4, plainM), 0, s * 3.2, 0.35, t);
      }
      at(box(0.4, 7.2, 0.5, steel), 0, 0, 9.4, t);
      at(box(0.3, 7.2, 0.35, steel), 0, 0, 8.2, t);
      for (var q = -1; q <= 1; q++) {
        var db = box(0.14, 0.14, 1.3, steel); db.position.set(0, q * 2.4, 8.8); t.add(db);
        for (var k = 0; k < 4; k++) at(cylZ(0.15, 0.15, 0.14, porc, 8), 0, q * 2.4, 8.9 - k * 0.22, t);
      }
      return t;
    }
    gantry(-15.5); gantry(1.5);
    for (i = -1; i <= 1; i++) {
      var cd = cylX(0.05, 0.05, 17.4, dark, 5);
      at(cd, -7.0, ty - 2.4 + i * 2.4, 8.1);
      at(cylX(0.05, 0.05, 8.9, dark, 5), -11.3, ty - 2.4 + i * 2.4, 8.35).rotation.y = 0.045;
      at(cylX(0.05, 0.05, 8.9, dark, 5), -2.7, ty - 2.4 + i * 2.4, 8.35).rotation.y = -0.045;
    }
    g.remove(cd);
    /* drop leads from transformers up to the gantry */
    for (i = -1; i <= 1; i++) {
      var lead = box(4.4, 0.07, 0.07, dark);
      lead.position.set(-13.5 + i * 1.05 + 1.0, ty + 1.0, 6.6);
      lead.rotation.y = -0.55; g.add(lead);
    }
    fenceRun(-17.5, -19.2, 3.5, -19.2, 2.6);
    fenceRun(-17.5, -11.6, -17.5, -19.2, 2.6);
    fenceRun(3.5, -11.6, 3.5, -19.2, 2.6);
    fenceRun(-17.5, -11.6, -8.0, -11.6, 2.6);
    fenceRun(-2.0, -11.6, 3.5, -11.6, 2.6);
    at(box(0.5, 0.7, 1.0, teamM), -12.0, -19.3, 1.9);

    /* ---------------- switch house, clutter ---------------- */
    at(box(5.2, 4.2, 3.4, plainM), 14.0, 0, 2.0);
    at(box(5.6, 4.6, 0.3, roofM), 14.0, 0, 3.85);
    at(box(0.14, 1.1, 1.0, glass), 11.35, -1.0, 2.4);
    at(box(0.14, 1.1, 1.0, glass), 11.35, 1.0, 2.4);
    at(box(0.3, 1.4, 2.4, dark), 16.65, 0, 1.5);
    railing(14.0, 2.4, 5.0, 0, 1.1);
    for (i = 0; i < 3; i++) at(cylZ(0.5, 0.5, 1.6, grey, 12), 17.0, -6.0 - i * 1.4, 1.1);
    crate(-16, 12, 0.3, 2.4, 1.8, 1.6, 0.2);
    crate(-13.6, 12.6, 0.3, 1.8, 1.6, 1.2, -0.3);
    crate(-16.2, 15.2, 0.3, 2.0, 2.0, 1.4, 0.5);
    drum(-9.5, 16.5, 0.3, 0x39566b); drum(-8.6, 16.9, 0.3, 0x7a4030);
    drum(-9.1, 15.6, 0.3, 0x4b5240); drum(-8.2, 15.9, 0.3, 0x39566b);
    sandbags(-1.5, -19.4, 0, 3, 5);
    sandbags(6.0, 18.6, 0.3, 2, 4);
    at(box(2.6, 1.2, 0.9, grey), 2.0, 16.0, 0.75);
    at(cylX(0.35, 0.35, 3.2, dark, 10), 2.0, 16.0, 1.5);
    floodlight(-18.2, 18.2, 11, 3.9);
    floodlight(18.2, 18.2, 11, 4.7);
    floodlight(18.2, -18.2, 11, 2.2);
    floodlight(-18.2, -6.0, 11, 1.0);
    /* cable trays running to the hall */
    for (i = 0; i < 5; i++) at(box(0.3, 0.3, 1.2, steel), -3.5 + i * 2.2, -10.6, 0.9);
    at(box(10.0, 0.9, 0.22, dark), 0.5, -10.6, 1.6);
    at(box(10.0, 0.12, 0.3, steel), 0.5, -11.0, 1.75);
    at(box(10.0, 0.12, 0.3, steel), 0.5, -10.2, 1.75);
    return g;
  }
};

BLD_MODELS["radar"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var i, j, s, a;

    function rng(seed) { var v = seed || 5; return function () { v = (v * 16807) % 2147483647; return (v % 10000) / 10000; }; }
    function mkTex(w, h, draw, rx, ry) {
      var cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      draw(cv.getContext("2d"), w, h);
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping;
      if (rx) t.repeat.set(rx, ry || rx);
      return t;
    }
    function panelTex(base, tint, seed, cells, streaks) {
      return mkTex(256, 256, function (x, w, h) {
        var r = rng(seed), q;
        x.fillStyle = base; x.fillRect(0, 0, w, h);
        for (q = 0; q < 22; q++) {
          x.globalAlpha = 0.04 + r() * 0.045; x.fillStyle = (q % 3) ? "#000000" : tint;
          x.fillRect(r() * w, r() * h, 18 + r() * 74, 14 + r() * 54);
        }
        x.globalAlpha = 0.5; x.strokeStyle = "#23261f"; x.lineWidth = 1.6;
        x.beginPath();
        for (q = 1; q < cells; q++) { x.moveTo(q * w / cells, 0); x.lineTo(q * w / cells, h); x.moveTo(0, q * h / cells); x.lineTo(w, q * h / cells); }
        x.stroke();
        x.globalAlpha = 0.13; x.fillStyle = "#0a0c0a";
        for (q = 0; q < (streaks || 10); q++) x.fillRect(r() * w, r() * h * 0.55, 2 + r() * 4, 26 + r() * 90);
        x.globalAlpha = 1;
      });
    }
    /* gravel / hardstanding */
    var padTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(23), q;
      x.fillStyle = "#5a5c52"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 700; q++) {
        x.globalAlpha = 0.12 + r() * 0.3;
        x.fillStyle = (q % 4) ? "#43463d" : "#8a8d80";
        x.fillRect(r() * w, r() * h, 1 + r() * 3, 1 + r() * 3);
      }
      x.globalAlpha = 0.09; x.fillStyle = "#2c2e28";
      for (q = 0; q < 10; q++) x.fillRect(r() * w, r() * h, 30 + r() * 70, 22 + r() * 50);
      x.globalAlpha = 1;
    }, 8, 8);
    /* white radome panel skin */
    var domeTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(43), q;
      x.fillStyle = "#d5d7d0"; x.fillRect(0, 0, w, h);
      x.strokeStyle = "rgba(90,96,88,0.55)"; x.lineWidth = 2;
      for (q = 0; q <= 8; q++) {
        x.beginPath(); x.moveTo(q * w / 8, 0); x.lineTo(q * w / 8, h); x.stroke();
        x.beginPath(); x.moveTo(0, q * h / 8); x.lineTo(w, q * h / 8); x.stroke();
      }
      x.globalAlpha = 0.09; x.fillStyle = "#5b5f56";
      for (q = 0; q < 16; q++) x.fillRect(r() * w, r() * h, 12 + r() * 40, 10 + r() * 34);
      x.globalAlpha = 1;
    });

    var conc = new THREE.MeshStandardMaterial({ map: padTex, roughness: 0.95, metalness: 0.02 });
    var wall = new THREE.MeshStandardMaterial({ map: panelTex("#6b7065", "#a3a99b", 61, 4, 12), roughness: 0.85, metalness: 0.08, side: THREE.DoubleSide });
    var steel = new THREE.MeshStandardMaterial({ color: 0x8b9094, roughness: 0.42, metalness: 0.82 });
    var metal = new THREE.MeshStandardMaterial({ color: 0x72787a, roughness: 0.55, metalness: 0.38 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x2b2e2d, roughness: 0.6, metalness: 0.3 });
    var domeMat = new THREE.MeshStandardMaterial({ map: domeTex, roughness: 0.55, metalness: 0.1, flatShading: true });
    var dishMat = new THREE.MeshStandardMaterial({ color: 0xc9ccc4, roughness: 0.5, metalness: 0.25, side: THREE.DoubleSide });
    var team = new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.62, metalness: 0.12 });
    var lampR = new THREE.MeshStandardMaterial({ color: 0xd2352b, emissive: 0xd2352b, emissiveIntensity: 1.0, roughness: 0.4, metalness: 0.1 });
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x1c2a30, roughness: 0.15, metalness: 0.3, emissive: 0x111f26, emissiveIntensity: 0.7 });

    function box(w, d, h, mat) { return new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mat); }
    function cylZ(r1, r2, h, mat, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, h, seg || 10, 1, !!open); geo.rotateX(Math.PI / 2);
      return new THREE.Mesh(geo, mat);
    }
    function cylX(r1, r2, l, mat, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, l, seg || 8, 1, !!open); geo.rotateZ(-Math.PI / 2);
      return new THREE.Mesh(geo, mat);
    }
    function put(m, x, y, z) { m.position.set(x, y, z); g.add(m); return m; }
    var upZ = new THREE.Vector3(0, 0, 1);
    /* member between two 3D points */
    function strut(p, q, rad, mat, parent, seg) {
      var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var geo = new THREE.CylinderGeometry(rad, rad, L, seg || 5, 1, true);
      geo.rotateX(Math.PI / 2);
      var m = new THREE.Mesh(geo, mat);
      m.position.set((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
      m.quaternion.setFromUnitVectors(upZ, new THREE.Vector3(dx / L, dy / L, dz / L));
      (parent || g).add(m);
      return m;
    }

    /* ---------------- ground pad, kerb, perimeter fence ---------------- */
    put(box(40, 40, 0.25, conc), 0, 0, 0.125);
    for (s = -1; s <= 1; s += 2) {
      put(box(40, 0.5, 0.45, wall), 0, s * 19.7, 0.35);
      put(box(0.5, 40, 0.45, wall), s * 19.7, 0, 0.35);
    }
    for (i = 0; i < 8; i++) {
      var fx = -17.5 + i * 5;
      for (s = -1; s <= 1; s += 2) {
        put(cylZ(0.07, 0.07, 2.2, metal, 5, true), fx, s * 17.5, 1.35);
        put(cylZ(0.07, 0.07, 2.2, metal, 5, true), s * 17.5, fx, 1.35);
      }
    }
    for (i = 0; i < 2; i++) {
      var fz = 1.1 + i * 1.1;
      for (s = -1; s <= 1; s += 2) {
        put(cylX(0.035, 0.035, 35, metal, 4, true), 0, s * 17.5, fz);
        var yr = cylX(0.035, 0.035, 35, metal, 4, true); yr.rotation.z = Math.PI / 2;
        put(yr, s * 17.5, 0, fz);
      }
    }
    put(box(0.12, 3.0, 1.8, team), 17.45, 0, 1.2);

    /* ---------------- equipment building ---------------- */
    var BX = -9.5, BY = -7;
    put(box(15, 9.5, 0.35, conc), BX, BY, 0.3);
    put(box(14, 8.5, 4.6, wall), BX, BY, 2.75);
    put(box(14.6, 9.1, 0.4, metal), BX, BY, 5.25);                 /* roof cap */
    put(box(14.6, 0.35, 0.55, team), BX, BY - 4.55, 4.9);          /* team band */
    put(box(1.4, 0.25, 2.3, dark), BX + 4.5, BY + 4.3, 1.6);       /* door */
    put(box(1.9, 0.3, 0.25, metal), BX + 4.5, BY + 4.4, 2.95);     /* door canopy */
    for (i = 0; i < 4; i++) {                                       /* louvred vents */
      put(box(1.5, 0.2, 1.1, dark), BX - 5.4 + i * 3.0, BY + 4.3, 3.2);
      for (j = 0; j < 4; j++) put(box(1.5, 0.12, 0.1, metal), BX - 5.4 + i * 3.0, BY + 4.36, 2.82 + j * 0.26);
    }
    for (i = 0; i < 2; i++) {                                       /* window slits */
      put(box(2.6, 0.2, 0.8, glass), BX - 4 + i * 8, BY - 4.3, 3.3);
    }
    for (i = 0; i < 3; i++) {                                       /* roof chillers */
      put(box(2.2, 2.0, 1.1, metal), BX - 4.5 + i * 4.5, BY + 1.6, 6.0);
      put(cylZ(0.75, 0.75, 0.22, dark, 12), BX - 4.5 + i * 4.5, BY + 1.6, 6.62);
    }
    put(cylZ(0.28, 0.28, 2.6, metal, 8), BX - 6.2, BY - 2.5, 6.6); /* exhaust stack */
    put(cylZ(0.36, 0.36, 0.3, dark, 8), BX - 6.2, BY - 2.5, 8.0);
    /* generator skid + fuel tank alongside */
    put(box(4.4, 2.2, 1.9, metal), BX - 2.0, BY - 6.6, 1.1);
    put(box(4.6, 2.4, 0.22, dark), BX - 2.0, BY - 6.6, 2.15);
    put(cylZ(0.16, 0.16, 1.5, dark, 6), BX - 3.6, BY - 6.6, 2.9);
    put(cylX(0.85, 0.85, 3.4, metal, 12), BX + 4.4, BY - 6.6, 1.2);
    for (s = -1; s <= 1; s += 2) put(box(0.3, 1.4, 0.45, dark), BX + 4.4 + s * 1.2, BY - 6.6, 0.22);

    /* ---------------- cable tray run: building -> tower ---------------- */
    var trayZ = 2.2;
    for (i = 0; i < 5; i++) put(cylZ(0.1, 0.1, trayZ, metal, 6), BX + 8.5 + i * 2.6, BY + 0.5, trayZ / 2);
    put(box(12.5, 0.7, 0.12, metal), BX + 13.5, BY + 0.5, trayZ);
    for (i = 0; i < 3; i++) put(cylX(0.09, 0.09, 12.5, dark, 5, true), BX + 13.5, BY + 0.28 + i * 0.22, trayZ + 0.14);
    for (i = 0; i < 7; i++) put(box(0.1, 0.7, 0.12, metal), BX + 8.0 + i * 1.9, BY + 0.5, trayZ + 0.13);

    /* ---------------- lattice tower ---------------- */
    var TX = 7.0, TY = 3.5, HT = 15.0;
    var bays = 5, rb = 3.1, rt = 1.25;
    function legXY(k, t) {
      var rr = rb + (rt - rb) * t;
      var ang = Math.PI / 4 + k * Math.PI / 2;
      return [TX + Math.cos(ang) * rr, TY + Math.sin(ang) * rr];
    }
    for (i = 0; i < bays; i++) {
      var t0 = i / bays, t1 = (i + 1) / bays, z0 = 1.0 + t0 * HT, z1 = 1.0 + t1 * HT;
      for (k = 0; k < 4; k++) {
        var p0 = legXY(k, t0), p1 = legXY(k, t1);
        var q0 = legXY((k + 1) % 4, t0), q1 = legXY((k + 1) % 4, t1);
        strut([p0[0], p0[1], z0], [p1[0], p1[1], z1], 0.13, steel);        /* leg */
        strut([p0[0], p0[1], z1], [q0[0], q0[1], z1], 0.075, steel);       /* girt */
        strut([p0[0], p0[1], z0], [q1[0], q1[1], z1], 0.06, steel);        /* brace */
        strut([q0[0], q0[1], z0], [p1[0], p1[1], z1], 0.06, steel);
      }
      if (i === 0) for (k = 0; k < 4; k++) {
        var b0 = legXY(k, 0), b1 = legXY((k + 1) % 4, 0);
        strut([b0[0], b0[1], 1.0], [b1[0], b1[1], 1.0], 0.075, steel);
      }
    }
    for (k = 0; k < 4; k++) {                                            /* footing blocks */
      var f = legXY(k, 0);
      put(box(1.3, 1.3, 1.1, conc), f[0], f[1], 0.55);
    }
    /* climbing ladder + safety hoops on the +X face */
    for (i = 0; i < 22; i++) put(cylX(0.03, 0.03, 0.5, metal, 4, true), TX + 2.6, TY, 1.4 + i * 0.65);
    for (s = -1; s <= 1; s += 2) put(cylZ(0.04, 0.04, 14.5, metal, 5, true), TX + 2.6, TY + s * 0.25, 8.3);
    for (i = 0; i < 5; i++) {
      var hoop = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.03, 4, 10, Math.PI * 1.2), metal);
      hoop.geometry.rotateX(Math.PI / 2); hoop.geometry.rotateZ(Math.PI / 2);
      put(hoop, TX + 2.75, TY, 5.0 + i * 2.4);
    }
    /* platform + railing under the dish */
    var plat = new THREE.Mesh(M.slab(THREE, [[-2.4, -2.4], [2.4, -2.4], [2.4, 2.4], [-2.4, 2.4]], 0.16), metal);
    put(plat, TX, TY, 16.0);
    for (i = 0; i <= 4; i++) {
      a = i / 4 * Math.PI * 2;
      for (j = 0; j < 4; j++) {
        var ax = TX + Math.cos(j / 4 * Math.PI * 2 + Math.PI / 4) * 2.3;
        var ay = TY + Math.sin(j / 4 * Math.PI * 2 + Math.PI / 4) * 2.3;
        if (i === 0) put(cylZ(0.05, 0.05, 1.05, metal, 5, true), ax, ay, 16.6);
      }
    }
    for (j = 0; j < 4; j++) {
      var c0 = [TX + Math.cos(j / 4 * Math.PI * 2 + Math.PI / 4) * 2.3, TY + Math.sin(j / 4 * Math.PI * 2 + Math.PI / 4) * 2.3];
      var c1 = [TX + Math.cos((j + 1) / 4 * Math.PI * 2 + Math.PI / 4) * 2.3, TY + Math.sin((j + 1) / 4 * Math.PI * 2 + Math.PI / 4) * 2.3];
      strut([c0[0], c0[1], 17.1], [c1[0], c1[1], 17.1], 0.035, metal, null, 4);
      strut([c0[0], c0[1], 16.6], [c1[0], c1[1], 16.6], 0.03, metal, null, 4);
    }
    /* obstruction lights on the tower */
    put(cylZ(0.16, 0.16, 0.3, lampR, 8), TX + 2.3, TY + 2.3, 17.35);
    put(cylZ(0.16, 0.16, 0.3, lampR, 8), TX - 2.3, TY - 2.3, 17.35);
    put(cylZ(0.14, 0.14, 0.28, lampR, 8), TX, TY, 8.6);
    /* cable riser up the tower */
    put(cylZ(0.11, 0.11, 15.4, dark, 6, true), TX - 2.3, TY + 2.3, 8.7);

    /* ---------------- slewing dish (turret) ---------------- */
    var tur = new THREE.Group(); tur.name = "turret";
    tur.position.set(TX, TY, 18.6); g.add(tur);
    var ped = cylZ(0.85, 1.0, 2.4, metal, 12); ped.position.set(0, 0, -1.4); tur.add(ped);
    for (s = -1; s <= 1; s += 2) {                                   /* trunnion arms */
      var arm = box(0.5, 0.35, 1.6, metal); arm.position.set(-0.3, s * 1.5, -0.5); tur.add(arm);
      var hub = cylX(0.3, 0.3, 0.5, dark, 8); hub.rotation.z = Math.PI / 2;
      hub.position.set(0, s * 1.5, 0.1); tur.add(hub);
    }
    var dishGrp = new THREE.Group(); dishGrp.rotation.y = -0.22; tur.add(dishGrp);
    var R = 4.6, F = 1.9, prof = [];
    for (i = 0; i <= 7; i++) {
      var rr2 = R * i / 7;
      prof.push(new THREE.Vector2(rr2, (rr2 * rr2) / (4 * F)));
    }
    var dishGeo = new THREE.LatheGeometry(prof, 26);
    dishGeo.rotateZ(-Math.PI / 2);
    var dishM = new THREE.Mesh(dishGeo, dishMat);
    dishM.position.set(0.15, 0, 0); dishGrp.add(dishM);
    var rimGeo = new THREE.TorusGeometry(R, 0.11, 5, 26);
    rimGeo.rotateY(Math.PI / 2);
    var rim = new THREE.Mesh(rimGeo, metal);
    rim.position.set(0.15 + R * R / (4 * F), 0, 0); dishGrp.add(rim);
    /* back structure: hub, radial ribs, hoop */
    var hubB = cylX(0.55, 0.55, 1.0, metal, 10); hubB.position.set(-0.3, 0, 0); dishGrp.add(hubB);
    for (i = 0; i < 6; i++) {
      a = i / 6 * Math.PI * 2;
      var ry2 = Math.cos(a), rz2 = Math.sin(a);
      strut([-0.6, 0, 0], [0.2 + R * R / (4 * F) * 0.85, ry2 * R * 0.9, rz2 * R * 0.9], 0.075, metal, dishGrp);
    }
    var hoopGeo = new THREE.TorusGeometry(R * 0.55, 0.06, 4, 18);
    hoopGeo.rotateY(Math.PI / 2);
    var hoop2 = new THREE.Mesh(hoopGeo, metal);
    hoop2.position.set(0.15 + (R * 0.55) * (R * 0.55) / (4 * F) * 0.6, 0, 0); dishGrp.add(hoop2);
    /* feed horn on a tripod at the focus */
    for (i = 0; i < 3; i++) {
      a = i / 3 * Math.PI * 2 + 0.5;
      strut([0.2 + R * R / (4 * F), Math.cos(a) * R * 0.94, Math.sin(a) * R * 0.94], [F + 0.15, 0, 0], 0.07, metal, dishGrp);
    }
    var horn = cylX(0.42, 0.2, 0.95, dark, 10); horn.position.set(F - 0.25, 0, 0); dishGrp.add(horn);
    var hornBack = cylX(0.24, 0.24, 0.7, metal, 8); hornBack.position.set(F + 0.5, 0, 0); dishGrp.add(hornBack);
    /* team identification panel + counterweight on the back */
    var tp = box(0.12, 1.6, 0.9, team); tp.position.set(-0.75, 0, 1.6); dishGrp.add(tp);
    var cw = box(0.7, 1.8, 0.7, dark); cw.position.set(-1.2, 0, -1.5); dishGrp.add(cw);
    var lamp = cylZ(0.13, 0.13, 0.26, lampR, 8); lamp.position.set(-0.2, 0, R + 0.35); dishGrp.add(lamp);

    /* ---------------- geodesic radome ---------------- */
    var RX = -6.5, RY = 11.0;
    put(cylZ(3.1, 3.3, 2.6, wall, 16), RX, RY, 1.3);
    put(cylZ(3.35, 3.35, 0.3, metal, 16), RX, RY, 2.6);
    put(box(1.1, 0.22, 2.0, dark), RX, RY - 3.15, 1.05);
    var ico = new THREE.Mesh(new THREE.IcosahedronGeometry(3.15, 2), domeMat);
    ico.scale.set(1, 1, 0.95);
    put(ico, RX, RY, 3.6);
    var icoRib = new THREE.Mesh(new THREE.IcosahedronGeometry(3.2, 1),
      new THREE.MeshStandardMaterial({ color: 0x6d7378, roughness: 0.6, metalness: 0.2, wireframe: true }));
    icoRib.scale.set(1, 1, 0.95);
    put(icoRib, RX, RY, 3.6);
    put(cylZ(0.1, 0.1, 0.5, lampR, 6), RX, RY, 6.9);
    /* cable trench cover from radome to building */
    put(box(1.0, 8.0, 0.2, metal), RX + 1.2, RY - 8.2, 0.3);

    /* ---------------- clutter: spares crates, dish transport frame, signs ---------------- */
    var r3 = rng(17);
    for (i = 0; i < 4; i++) {
      var cb = box(1.8 + r3() * 0.4, 1.2, 1.0, i % 2 ? dark : metal);
      cb.position.set(12.5 + (i % 2) * 2.2, -12 + Math.floor(i / 2) * 1.6, 0.75);
      cb.rotation.z = (r3() - 0.5) * 0.3; g.add(cb);
    }
    put(box(3.2, 3.2, 0.3, metal), 13.5, -5.5, 0.4);
    var spare = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), dishMat);
    spare.rotation.x = 0.5; put(spare, 13.5, -5.5, 0.9);
    for (i = 0; i < 2; i++) {
      put(cylZ(0.06, 0.06, 1.6, metal, 5, true), -15 + i * 3.5, 15.5, 0.9);
      put(box(0.9, 0.08, 0.6, i ? team : dark), -15 + i * 3.5, 15.5, 1.7);
    }
    return g;
  }
};

UNIT_MODELS["radarv_c"] = {
  len: 8.2,
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var seed = 5087;
    function rnd() { seed = (seed * 48271) % 2147483647; return seed / 2147483647; }
    function paint(base) {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var p = cv.getContext("2d");
      var i;
      p.fillStyle = base; p.fillRect(0, 0, 256, 256);
      for (i = 0; i < 30; i++) {
        p.globalAlpha = 0.04 + rnd() * 0.04;
        p.fillStyle = rnd() < 0.5 ? "#c3caa9" : "#14180f";
        p.fillRect(rnd() * 256, rnd() * 256, 22 + rnd() * 68, 12 + rnd() * 50);
      }
      p.globalAlpha = 1;
      p.strokeStyle = "rgba(10,13,8,0.32)"; p.lineWidth = 1;
      var vx = [26, 68, 112, 156, 200, 236], hz = [42, 96, 152, 208];
      for (i = 0; i < vx.length; i++) { p.beginPath(); p.moveTo(vx[i], 0); p.lineTo(vx[i] + rnd() * 4, 256); p.stroke(); }
      for (i = 0; i < hz.length; i++) { p.beginPath(); p.moveTo(0, hz[i]); p.lineTo(256, hz[i] + rnd() * 4); p.stroke(); }
      p.fillStyle = "rgba(0,0,0,0.26)";
      for (i = 0; i < 58; i++) p.fillRect(rnd() * 256, rnd() * 256, 2, 2);
      for (i = 0; i < 18; i++) {
        p.fillStyle = "rgba(44,34,14,0.10)";
        p.fillRect(rnd() * 256, 136 + rnd() * 96, 3 + rnd() * 5, 20 + rnd() * 58);
      }
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping;
      return t;
    }
    function arrayTex() {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var p = cv.getContext("2d");
      var i, j;
      p.fillStyle = "#262b2a"; p.fillRect(0, 0, 256, 256);
      for (j = 0; j < 14; j++) {
        var y = 12 + j * 17.0;
        p.fillStyle = (j % 2) ? "#31383a" : "#2b3133";
        p.fillRect(10, y, 236, 14.4);
        for (i = 0; i < 26; i++) {
          p.fillStyle = "rgba(8,10,10,0.75)";
          p.fillRect(14 + i * 9.0, y + 3.4, 5.4, 7.6);
          p.fillStyle = "rgba(158,170,172,0.16)";
          p.fillRect(14 + i * 9.0, y + 2.4, 5.4, 1.2);
        }
      }
      p.strokeStyle = "#181c1c"; p.lineWidth = 8;
      p.strokeRect(4, 4, 248, 248);
      for (i = 0; i < 10; i++) {
        p.fillStyle = "rgba(20,24,20,0.15)";
        p.fillRect(rnd() * 256, rnd() * 256, 14 + rnd() * 44, 10 + rnd() * 30);
      }
      p.fillStyle = "#c0392b";
      p.fillRect(14, 236, 40, 10);
      return new THREE.CanvasTexture(cv);
    }
    function signTex(txt) {
      var cv = document.createElement("canvas");
      cv.width = 128; cv.height = 64;
      var p = cv.getContext("2d");
      p.fillStyle = "#454e35"; p.fillRect(0, 0, 128, 64);
      p.strokeStyle = "rgba(0,0,0,0.4)"; p.lineWidth = 3; p.strokeRect(4, 4, 120, 56);
      p.fillStyle = "#dfe3d4";
      p.font = "bold 24px sans-serif";
      p.fillText(txt, 14, 42);
      return new THREE.CanvasTexture(cv);
    }
    var bodyMat = new THREE.MeshStandardMaterial({ map: paint("#4c5539"), metalness: 0.25, roughness: 0.63 });
    var trimMat = new THREE.MeshStandardMaterial({ color: 0x434c33, metalness: 0.27, roughness: 0.67 });
    var darkMat = new THREE.MeshStandardMaterial({ color: 0x1c1f1a, metalness: 0.15, roughness: 0.88 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x35383c, metalness: 0.85, roughness: 0.3 });
    var arrMat = new THREE.MeshStandardMaterial({ map: arrayTex(), metalness: 0.4, roughness: 0.52 });
    var glassMat = new THREE.MeshStandardMaterial({ color: 0x121a20, metalness: 0.6, roughness: 0.22 });
    var teamMat = new THREE.MeshStandardMaterial({ color: C.team, metalness: 0.3, roughness: 0.55 });
    function bx(sx, sy, sz, x, y, z, mat, parent) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
      m.position.set(x, y, z);
      (parent || g).add(m);
      return m;
    }
    function cyl(r1, r2, h, x, y, z, mat, parent, axis, seg) {
      var geo = new THREE.CylinderGeometry(r1, r2, h, seg || 12);
      if (axis === "x") geo.rotateZ(Math.PI / 2);
      else if (axis === "z") geo.rotateX(Math.PI / 2);
      var m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      (parent || g).add(m);
      return m;
    }
    function tube(ax, ay, az, bx2, by2, bz, r, mat, parent) {
      var dx = bx2 - ax, dy = by2 - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var geo = new THREE.CylinderGeometry(r, r, L, 6);
      var m = new THREE.Mesh(geo, mat);
      m.position.set((ax + bx2) / 2, (ay + by2) / 2, (az + bz) / 2);
      m.rotation.z = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz)) * 0 + Math.atan2(dy, dz) * 0;
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
      (parent || g).add(m);
      return m;
    }
    var i, s;
    // ---- 6x6 chassis -----------------------------------------------------
    for (s = -1; s <= 1; s += 2) bx(7.9, 0.18, 0.32, -0.15, s * 0.52, 1.02, steelMat);
    for (i = 0; i < 6; i++) bx(0.15, 1.15, 0.24, -3.6 + i * 1.35, 0, 1.02, steelMat);
    var axles = [3.0, -1.7, -3.05];
    for (i = 0; i < 3; i++) {
      cyl(0.11, 0.11, 2.3, axles[i], 0, 0.68, steelMat, g, null, 10);
      bx(0.52, 0.44, 0.5, axles[i], 0, 0.72, darkMat);
      for (s = -1; s <= 1; s += 2) {
        cyl(0.64, 0.64, 0.46, axles[i], s * 1.14, 0.64, darkMat, g, null, 16);
        cyl(0.27, 0.27, 0.48, axles[i], s * 1.14, 0.64, trimMat, g, null, 12);
        cyl(0.09, 0.09, 0.52, axles[i], s * 1.14, 0.64, steelMat, g, null, 8);
        bx(1.15, 0.14, 0.1, axles[i], s * 0.8, 0.9, steelMat);
      }
    }
    for (s = -1; s <= 1; s += 2) {
      var fg = M.slab(THREE, [[-2.35, 0.0], [-2.35, 0.32], [2.25, 0.32], [2.25, 0.0], [1.7, -0.48], [-1.75, -0.48]], 0.54, "xz");
      var fm = new THREE.Mesh(fg, trimMat);
      fm.position.set(-2.4, s * 1.14, 1.44);
      g.add(fm);
      bx(0.06, 0.54, 0.44, -4.15, s * 1.14, 1.06, darkMat);
      var ff = M.slab(THREE, [[-0.9, 0.0], [-0.9, 0.3], [0.9, 0.3], [0.9, 0.0], [0.6, -0.42], [-0.6, -0.42]], 0.54, "xz");
      var fm2 = new THREE.Mesh(ff, trimMat);
      fm2.position.set(3.0, s * 1.14, 1.4);
      g.add(fm2);
    }
    // fuel tank, air tanks, battery box, exhaust stack
    cyl(0.36, 0.36, 1.5, 0.6, 1.2, 1.0, steelMat, g, "x", 14);
    bx(0.18, 0.1, 0.7, 0.6, 1.2, 1.0, trimMat);
    cyl(0.2, 0.2, 0.9, -0.4, -1.2, 1.06, steelMat, g, "x", 10);
    bx(0.7, 0.36, 0.42, 1.3, -1.2, 1.06, darkMat);
    cyl(0.1, 0.1, 2.3, 2.05, -1.28, 2.3, steelMat, g, "z", 10);
    cyl(0.14, 0.14, 0.24, 2.05, -1.28, 3.5, darkMat, g, "z", 10);
    // ---- cab-over crew cab ----------------------------------------------
    bx(1.85, 2.42, 1.72, 3.1, 0, 2.2, bodyMat);
    bx(1.95, 2.28, 0.1, 3.1, 0, 3.08, trimMat);
    var ws = bx(0.1, 2.16, 0.86, 4.0, 0, 2.62, glassMat);
    ws.rotation.y = -0.08;
    bx(0.14, 2.46, 0.16, 4.02, 0, 3.1, trimMat);
    bx(0.5, 2.3, 0.16, 3.9, 0, 3.24, trimMat).rotation.y = 0.12;
    for (i = 0; i < 3; i++) bx(0.08, 0.14, 0.08, 4.06, -0.5 + i * 0.5, 3.22, new THREE.MeshStandardMaterial({ color: 0xc99a2e, metalness: 0.3, roughness: 0.5 }));
    bx(0.28, 2.5, 0.42, 4.16, 0, 1.34, steelMat);
    for (s = -1; s <= 1; s += 2) {
      cyl(0.16, 0.16, 0.24, 4.1, s * 0.88, 1.74, trimMat, g, "x", 12);
      cyl(0.14, 0.14, 0.06, 4.24, s * 0.88, 1.74, glassMat, g, "x", 12);
      bx(0.1, 0.3, 0.14, 4.22, s * 0.36, 1.34, steelMat);
      bx(0.05, 0.03, 1.3, 2.95, s * 1.22, 2.2, trimMat);
      bx(0.66, 0.04, 0.52, 3.34, s * 1.23, 2.62, glassMat);
      bx(0.18, 0.05, 0.05, 2.66, s * 1.23, 2.18, steelMat);
      var plate = bx(0.6, 0.03, 0.28, 3.3, s * 1.24, 1.86, new THREE.MeshStandardMaterial({ map: signTex("SLC-2"), metalness: 0.2, roughness: 0.66 }));
      var ma = cyl(0.024, 0.024, 0.7, 4.02, s * 1.34, 2.72, steelMat, g, null, 6);
      ma.rotation.x = s * 0.2;
      bx(0.06, 0.14, 0.5, 3.98, s * 1.52, 2.9, darkMat);
      cyl(0.02, 0.02, 0.5, 2.28, s * 1.22, 2.2, steelMat, g, "z", 6);
      bx(0.4, 0.22, 0.05, 2.6, s * 1.28, 1.5, steelMat);
      bx(0.4, 0.22, 0.05, 2.6, s * 1.28, 1.12, steelMat);
    }
    cyl(0.05, 0.05, 0.12, 3.3, 0, 3.18, new THREE.MeshStandardMaterial({ color: 0x8c2e22, metalness: 0.3, roughness: 0.45 }), g, "z", 8);
    cyl(0.012, 0.012, 1.6, 2.3, 1.1, 3.6, steelMat, g, "z", 6).rotation.x = 0.1;
    // ---- mission shelter -------------------------------------------------
    bx(2.5, 2.5, 1.8, 0.75, 0, 2.36, bodyMat);
    bx(2.6, 2.34, 0.08, 0.75, 0, 3.3, trimMat);
    bx(0.06, 1.9, 0.1, 1.98, 0, 3.32, trimMat);
    for (i = 0; i < 4; i++) bx(2.4, 0.05, 0.05, 0.75, -0.9 + i * 0.6, 3.36, trimMat);
    // shelter door at the rear with steps, and grab rail
    bx(0.08, 0.9, 1.5, -0.52, 0.6, 2.26, trimMat);
    bx(0.05, 0.5, 0.36, -0.57, 0.6, 2.78, glassMat);
    cyl(0.03, 0.03, 0.24, -0.62, 0.22, 2.3, steelMat, g, "z", 6);
    bx(0.5, 0.7, 0.06, -0.85, 0.6, 1.5, steelMat);
    bx(0.5, 0.7, 0.06, -0.85, 0.6, 1.14, steelMat);
    for (i = 0; i < 2; i++) cyl(0.024, 0.024, 0.8, -0.9, 0.24 + i * 0.72, 1.72, steelMat, g, "z", 6);
    // air conditioner, cable ports, filters and a team panel
    bx(0.5, 0.7, 0.6, 2.06, -0.7, 2.2, trimMat);
    for (i = 0; i < 5; i++) bx(0.04, 0.66, 0.06, 2.3, -0.7, 2.0 + i * 0.1, darkMat);
    bx(0.42, 0.62, 0.5, 2.04, 0.72, 2.9, trimMat);
    for (i = 0; i < 4; i++) cyl(0.07, 0.07, 0.14, 0.2 + i * 0.28, -1.27, 1.7, darkMat, g, "y", 8);
    bx(1.1, 0.05, 0.5, 0.8, -1.27, 2.6, trimMat);
    bx(0.9, 0.04, 0.16, 0.8, -1.29, 2.6, teamMat);
    bx(0.62, 0.03, 0.3, 0.8, 1.27, 2.5, new THREE.MeshStandardMaterial({ map: signTex("R-2"), metalness: 0.2, roughness: 0.66 }));
    // roof floodlight and GPS pucks
    bx(0.2, 0.2, 0.26, 1.9, 1.0, 3.5, trimMat);
    bx(0.06, 0.24, 0.2, 1.78, 1.0, 3.56, glassMat);
    cyl(0.09, 0.09, 0.07, 1.2, -0.9, 3.38, trimMat, g, "z", 10);
    cyl(0.09, 0.09, 0.07, 1.2, 0.9, 3.38, trimMat, g, "z", 10);
    // ---- rear deck, jacks, stowage ---------------------------------------
    bx(3.1, 2.5, 0.14, -2.55, 0, 1.44, trimMat);
    for (i = 0; i < 5; i++) bx(0.07, 2.5, 0.06, -3.9 + i * 0.66, 0, 1.53, bodyMat);
    for (s = -1; s <= 1; s += 2) {
      bx(0.9, 0.44, 0.5, -1.35, s * 1.2, 1.76, trimMat);
      cyl(0.024, 0.024, 1.0, -4.1, s * 0.34, 0.94, steelMat, g, "z", 6);
    }
    for (i = 0; i < 3; i++) cyl(0.02, 0.02, 0.68, -4.1, 0, 0.56 + i * 0.34, steelMat, g, null, 6);
    for (s = -1; s <= 1; s += 2) {
      bx(0.1, 0.2, 0.22, -4.14, s * 0.95, 1.26, darkMat);
      bx(0.03, 0.16, 0.08, -4.2, s * 0.95, 1.32, new THREE.MeshStandardMaterial({ color: 0x8c2820, metalness: 0.3, roughness: 0.5 }));
    }
    function jack(x, y) {
      bx(0.34, 0.78, 0.26, x, y * 1.48, 1.18, trimMat);
      cyl(0.11, 0.11, 1.15, x, y * 1.76, 0.62, steelMat, g, "z", 10);
      cyl(0.075, 0.075, 0.36, x, y * 1.76, 0.22, steelMat, g, "z", 8);
      cyl(0.32, 0.32, 0.1, x, y * 1.76, 0.06, darkMat, g, "z", 12);
      cyl(0.05, 0.05, 0.6, x, y * 1.62, 1.55, steelMat, g, "z", 6);
    }
    jack(-0.55, 1); jack(-0.55, -1); jack(-3.9, 1); jack(-3.9, -1);
    // spare wheel slung under the deck
    var spare = cyl(0.6, 0.6, 0.4, -2.4, 0, 0.62, darkMat, g, "z", 14);
    cyl(0.24, 0.24, 0.42, -2.4, 0, 0.62, trimMat, g, "z", 10);
    // ---- slewing angled array --------------------------------------------
    var turret = new THREE.Group();
    turret.name = "turret";
    turret.position.set(-2.5, 0, 1.51);
    g.add(turret);
    cyl(1.05, 1.12, 0.28, 0, 0, 0.14, trimMat, turret, "z", 24);
    for (i = 0; i < 18; i++) {
      var a = i / 18 * Math.PI * 2;
      cyl(0.032, 0.032, 0.06, Math.cos(a) * 0.96, Math.sin(a) * 0.96, 0.3, steelMat, turret, "z", 6);
    }
    bx(2.3, 2.5, 0.24, 0, 0, 0.4, bodyMat, turret);
    bx(0.66, 0.7, 0.66, -0.72, 0.86, 0.85, trimMat, turret);
    bx(0.66, 0.7, 0.66, -0.72, -0.86, 0.85, trimMat, turret);
    for (i = 0; i < 4; i++) bx(0.05, 0.66, 0.06, -0.42, 0.86, 0.62 + i * 0.16, darkMat, turret);
    for (s = -1; s <= 1; s += 2) {
      bx(0.4, 0.32, 1.0, 0.35, s * 1.12, 1.02, trimMat, turret);
      cyl(0.18, 0.18, 0.42, 0.35, s * 1.12, 1.5, steelMat, turret, null, 12);
    }
    var pan = new THREE.Group();
    pan.position.set(0.35, 0, 1.5);
    pan.rotation.y = -0.5;
    turret.add(pan);
    // trussed backing frame, then the array face on the front of it
    bx(0.24, 4.0, 2.66, -0.16, 0, 1.36, trimMat, pan);
    bx(0.1, 3.86, 2.5, 0.02, 0, 1.36, arrMat, pan);
    bx(0.16, 4.06, 0.16, -0.1, 0, 2.72, trimMat, pan);
    bx(0.16, 4.06, 0.16, -0.1, 0, 0.0, trimMat, pan);
    for (s = -1; s <= 1; s += 2) bx(0.16, 0.16, 2.72, -0.1, s * 1.95, 1.36, trimMat, pan);
    for (i = 0; i < 5; i++) bx(0.14, 0.13, 2.5, -0.32, -1.6 + i * 0.8, 1.36, steelMat, pan);
    for (i = 0; i < 3; i++) bx(0.14, 3.9, 0.12, -0.32, 0, 0.5 + i * 0.86, steelMat, pan);
    tube(-0.42, -1.9, 0.2, -0.42, 1.9, 2.5, 0.055, steelMat, pan);
    tube(-0.42, 1.9, 0.2, -0.42, -1.9, 2.5, 0.055, steelMat, pan);
    bx(0.5, 1.1, 0.66, -0.6, 1.0, 0.5, trimMat, pan);
    bx(0.5, 1.1, 0.66, -0.6, -1.0, 0.5, trimMat, pan);
    cyl(0.13, 0.13, 3.8, -0.56, 0, 2.2, steelMat, pan, "y", 10);
    bx(0.07, 3.8, 0.18, 0.06, 0, 0.16, teamMat, pan);
    for (s = -1; s <= 1; s += 2) {
      var eye = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.026, 6, 12), steelMat);
      eye.position.set(-0.12, s * 1.7, 2.82);
      eye.rotation.y = Math.PI / 2;
      pan.add(eye);
    }
    // elevation rams and waveguide run
    for (s = -1; s <= 1; s += 2) {
      var ram = cyl(0.11, 0.11, 1.5, -0.5, s * 1.0, 1.0, steelMat, turret, "z", 10);
      ram.rotation.y = -0.62;
      var rod = cyl(0.065, 0.065, 0.8, -0.14, s * 1.0, 1.58, trimMat, turret, "z", 8);
      rod.rotation.y = -0.62;
    }
    var wgr = cyl(0.09, 0.09, 1.9, 0.1, 1.05, 0.72, darkMat, turret, "x", 8);
    wgr.rotation.z = 0.2;
    return g;
  }
};

UNIT_MODELS["radarv_n"] = {
  len: 8.5,
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var seed = 1291;
    function rnd() { seed = (seed * 48271) % 2147483647; return seed / 2147483647; }
    function paint(base) {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var p = cv.getContext("2d");
      var i;
      p.fillStyle = base; p.fillRect(0, 0, 256, 256);
      for (i = 0; i < 30; i++) {
        p.globalAlpha = 0.04 + rnd() * 0.04;
        p.fillStyle = rnd() < 0.5 ? "#ccd1bc" : "#161a10";
        p.fillRect(rnd() * 256, rnd() * 256, 20 + rnd() * 70, 12 + rnd() * 52);
      }
      p.globalAlpha = 1;
      p.strokeStyle = "rgba(9,11,7,0.34)"; p.lineWidth = 1;
      var vx = [28, 72, 116, 158, 204], hz = [44, 102, 166, 218];
      for (i = 0; i < vx.length; i++) { p.beginPath(); p.moveTo(vx[i], 0); p.lineTo(vx[i] + rnd() * 4, 256); p.stroke(); }
      for (i = 0; i < hz.length; i++) { p.beginPath(); p.moveTo(0, hz[i]); p.lineTo(256, hz[i] + rnd() * 4); p.stroke(); }
      p.fillStyle = "rgba(0,0,0,0.26)";
      for (i = 0; i < 64; i++) p.fillRect(rnd() * 256, rnd() * 256, 2, 2);
      for (i = 0; i < 16; i++) {
        p.fillStyle = "rgba(40,32,17,0.10)";
        p.fillRect(rnd() * 256, 140 + rnd() * 90, 3 + rnd() * 5, 20 + rnd() * 54);
      }
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping;
      return t;
    }
    function arrayTex() {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var p = cv.getContext("2d");
      var i, j;
      p.fillStyle = "#23272a"; p.fillRect(0, 0, 256, 256);
      for (j = 0; j < 17; j++) {
        for (i = 0; i < 21; i++) {
          var x = 16 + i * 10.6, y = 18 + j * 12.4;
          p.fillStyle = ((i + j) % 2) ? "#333a3f" : "#2b3135";
          p.fillRect(x, y, 8.4, 10.2);
          p.fillStyle = "rgba(126,138,146,0.22)";
          p.fillRect(x + 1.1, y + 1.3, 6.2, 2.0);
          p.fillStyle = "rgba(0,0,0,0.35)";
          p.fillRect(x + 1.1, y + 7.6, 6.2, 1.2);
        }
      }
      p.strokeStyle = "#1a1d20"; p.lineWidth = 8;
      p.strokeRect(4, 4, 248, 248);
      p.fillStyle = "rgba(255,255,255,0.05)";
      p.fillRect(20, 22, 216, 26);
      for (i = 0; i < 10; i++) {
        p.fillStyle = "rgba(20,24,18,0.16)";
        p.fillRect(rnd() * 256, rnd() * 256, 10 + rnd() * 40, 8 + rnd() * 30);
      }
      p.fillStyle = "#c8b23a";
      p.fillRect(178, 232, 54, 12);
      p.fillStyle = "#15171a";
      p.font = "9px sans-serif";
      p.fillText("RF HAZARD", 180, 241);
      var t = new THREE.CanvasTexture(cv);
      return t;
    }
    function labelTex(txt, base) {
      var cv = document.createElement("canvas");
      cv.width = 128; cv.height = 64;
      var p = cv.getContext("2d");
      p.fillStyle = base; p.fillRect(0, 0, 128, 64);
      p.strokeStyle = "rgba(0,0,0,0.35)"; p.lineWidth = 2; p.strokeRect(3, 3, 122, 58);
      p.fillStyle = "#d8dcd0";
      p.font = "bold 26px sans-serif";
      p.fillText(txt, 12, 42);
      p.fillStyle = "rgba(0,0,0,0.12)";
      p.fillRect(0, 44, 128, 20);
      return new THREE.CanvasTexture(cv);
    }
    var bodyMat = new THREE.MeshStandardMaterial({ map: paint("#4a5240"), metalness: 0.25, roughness: 0.62 });
    var trimMat = new THREE.MeshStandardMaterial({ color: 0x414937, metalness: 0.28, roughness: 0.66 });
    var darkMat = new THREE.MeshStandardMaterial({ color: 0x1d201b, metalness: 0.15, roughness: 0.88 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x35383c, metalness: 0.85, roughness: 0.3 });
    var arrMat = new THREE.MeshStandardMaterial({ map: arrayTex(), metalness: 0.4, roughness: 0.52 });
    var glassMat = new THREE.MeshStandardMaterial({ color: 0x131b21, metalness: 0.6, roughness: 0.22 });
    var teamMat = new THREE.MeshStandardMaterial({ color: C.team, metalness: 0.3, roughness: 0.55 });
    function bx(sx, sy, sz, x, y, z, mat, parent) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
      m.position.set(x, y, z);
      (parent || g).add(m);
      return m;
    }
    function cyl(r1, r2, h, x, y, z, mat, parent, axis, seg) {
      var geo = new THREE.CylinderGeometry(r1, r2, h, seg || 12);
      if (axis === "x") geo.rotateZ(Math.PI / 2);
      else if (axis === "z") geo.rotateX(Math.PI / 2);
      var m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      (parent || g).add(m);
      return m;
    }
    function rail(x0, x1, y, z, n, parent) {
      var i, L = x1 - x0;
      for (i = 0; i < n; i++) cyl(0.028, 0.028, 0.92, x0 + L * i / (n - 1), y, z + 0.46, steelMat, parent, "z", 6);
      var a = cyl(0.026, 0.026, L, (x0 + x1) / 2, y, z + 0.9, steelMat, parent, "x", 6);
      cyl(0.024, 0.024, L, (x0 + x1) / 2, y, z + 0.5, steelMat, parent, "x", 6);
      return a;
    }
    var i, s;
    // ---- chassis rails, 6x6 running gear -------------------------------
    for (s = -1; s <= 1; s += 2) bx(8.0, 0.17, 0.3, -0.15, s * 0.5, 0.97, steelMat);
    for (i = 0; i < 6; i++) bx(0.14, 1.1, 0.22, -3.7 + i * 1.4, 0, 0.97, steelMat);
    var axles = [3.0, -1.55, -2.95];
    for (i = 0; i < 3; i++) {
      cyl(0.11, 0.11, 2.3, axles[i], 0, 0.68, steelMat, g, null, 10);
      bx(0.5, 0.4, 0.5, axles[i], 0, 0.72, darkMat);
      for (s = -1; s <= 1; s += 2) {
        var tire = cyl(0.63, 0.63, 0.44, axles[i], s * 1.12, 0.63, darkMat, g, null, 16);
        cyl(0.28, 0.28, 0.46, axles[i], s * 1.12, 0.63, trimMat, g, null, 12);
        cyl(0.1, 0.1, 0.5, axles[i], s * 1.12, 0.63, steelMat, g, null, 8);
        // leaf spring pack
        bx(1.1, 0.14, 0.1, axles[i], s * 0.78, 0.86, steelMat);
      }
    }
    // mudguards over the rear tandem
    for (s = -1; s <= 1; s += 2) {
      var fg = M.slab(THREE, [[-2.4, 0.0], [-2.4, 0.34], [2.3, 0.34], [2.3, 0.0], [1.7, -0.5], [-1.8, -0.5]], 0.5, "xz");
      var fm = new THREE.Mesh(fg, trimMat);
      fm.position.set(-2.25, s * 1.12, 1.42);
      g.add(fm);
      bx(0.06, 0.5, 0.42, -4.35, s * 1.12, 1.05, darkMat);
    }
    // ---- armoured cab ---------------------------------------------------
    bx(2.05, 2.32, 1.56, 2.6, 0, 2.06, bodyMat);
    bx(2.15, 2.0, 0.1, 2.6, 0, 2.87, trimMat);
    var wsg = bx(0.09, 2.02, 0.94, 3.6, 0, 2.46, glassMat);
    wsg.rotation.y = -0.19;
    bx(0.12, 2.2, 0.12, 3.66, 0, 2.86, trimMat).rotation.y = -0.19;
    bx(1.6, 2.36, 0.62, 3.85, 0, 1.6, bodyMat);
    bx(0.1, 1.7, 0.66, 4.02, 0, 1.85, darkMat);
    for (i = 0; i < 6; i++) bx(0.06, 1.62, 0.05, 4.07, 0, 1.6 + i * 0.1, trimMat);
    bx(0.34, 2.44, 0.36, 4.2, 0, 1.18, steelMat);
    for (s = -1; s <= 1; s += 2) {
      cyl(0.15, 0.15, 0.22, 4.16, s * 0.86, 1.58, trimMat, g, "x", 12);
      cyl(0.13, 0.13, 0.06, 4.29, s * 0.86, 1.58, glassMat, g, "x", 12);
      cyl(0.05, 0.05, 1.0, 4.3, s * 1.02, 1.7, steelMat, g, "z", 6);
      // door panel, window, handle, hull number
      bx(0.04, 0.03, 1.16, 2.5, s * 1.17, 2.02, trimMat);
      bx(0.98, 0.03, 0.04, 2.5, s * 1.17, 1.44, trimMat);
      bx(0.72, 0.04, 0.5, 2.6, s * 1.18, 2.46, glassMat);
      bx(0.16, 0.05, 0.05, 2.16, s * 1.18, 2.0, steelMat);
      var dec = bx(0.62, 0.03, 0.3, 2.62, s * 1.19, 1.78, new THREE.MeshStandardMaterial({ map: labelTex("Q53-4", "#49513f"), metalness: 0.2, roughness: 0.65 }));
      dec.rotation.z = 0;
      // mirror arm
      var ma = cyl(0.026, 0.026, 0.55, 3.7, s * 1.32, 2.7, steelMat, g, null, 6);
      ma.rotation.x = s * 0.25;
      bx(0.06, 0.16, 0.42, 3.66, s * 1.5, 2.9, darkMat);
      // grab handles
      cyl(0.02, 0.02, 0.5, 1.72, s * 1.18, 2.1, steelMat, g, "z", 6);
    }
    bx(0.6, 0.62, 0.08, 2.3, 0, 2.94, trimMat);
    cyl(0.05, 0.05, 0.1, 2.3, 0, 3.0, darkMat, g, "z", 10);
    cyl(0.012, 0.012, 1.5, 1.78, -1.1, 3.4, steelMat, g, "z", 6).rotation.x = -0.12;
    cyl(0.012, 0.012, 1.2, 1.78, 1.1, 3.25, steelMat, g, "z", 6).rotation.x = 0.1;
    cyl(0.1, 0.1, 1.7, 1.6, -1.16, 2.0, steelMat, g, "z", 10);
    cyl(0.13, 0.13, 0.3, 1.6, -1.16, 2.9, darkMat, g, "z", 10);
    // ---- mission deck ---------------------------------------------------
    bx(5.75, 2.5, 0.14, -1.35, 0, 1.42, trimMat);
    for (i = 0; i < 9; i++) bx(0.07, 2.5, 0.06, -4.0 + i * 0.66, 0, 1.51, bodyMat);
    // generator set behind the cab, louvered
    bx(1.36, 2.24, 1.2, 0.85, 0, 2.09, bodyMat);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 7; i++) bx(0.03, 0.06, 0.86, 0.35 + i * 0.16, s * 1.13, 2.09, darkMat);
      bx(0.5, 0.05, 0.3, 1.28, s * 1.13, 1.7, darkMat);
    }
    bx(1.0, 1.6, 0.06, 0.85, 0, 2.72, darkMat);
    cyl(0.09, 0.09, 0.9, 0.3, 0.9, 3.05, steelMat, g, "z", 8);
    cyl(0.12, 0.12, 0.14, 0.3, 0.9, 3.5, darkMat, g, "z", 8);
    var glab = bx(0.03, 0.62, 0.3, 0.16, 0, 2.2, new THREE.MeshStandardMaterial({ map: labelTex("30 kW", "#3d442f"), metalness: 0.2, roughness: 0.68 }));
    glab.rotation.z = Math.PI / 2;
    // cable reels on the left flank
    for (i = 0; i < 2; i++) {
      var rx = -2.35 - i * 1.05;
      cyl(0.42, 0.42, 0.44, rx, 1.28, 1.98, darkMat, g, "x", 14);
      cyl(0.52, 0.52, 0.04, rx - 0.24, 1.28, 1.98, trimMat, g, "x", 14);
      cyl(0.52, 0.52, 0.04, rx + 0.24, 1.28, 1.98, trimMat, g, "x", 14);
      cyl(0.06, 0.06, 0.66, rx, 1.28, 1.98, steelMat, g, "x", 8);
      bx(0.16, 0.5, 0.62, rx, 1.28, 1.66, trimMat);
    }
    // stowage crates, spare pads, jerry cans on the right flank
    bx(1.5, 0.52, 0.56, -1.5, -1.15, 1.78, trimMat);
    bx(0.9, 0.5, 0.5, -3.1, -1.15, 1.75, bodyMat);
    for (i = 0; i < 2; i++) bx(0.18, 0.36, 0.46, -3.85, -1.05 + i * 0.42, 1.73, darkMat);
    // rear ladder + platform railing
    for (s = -1; s <= 1; s += 2) cyl(0.026, 0.026, 1.3, -4.3, s * 0.3, 0.85, steelMat, g, "z", 6);
    for (i = 0; i < 4; i++) cyl(0.02, 0.02, 0.6, -4.3, 0, 0.42 + i * 0.32, steelMat, g, null, 6);
    rail(-4.1, -2.9, 1.22, 1.49, 3);
    rail(-4.1, -2.9, -1.22, 1.49, 3);
    // tail lights and pintle
    for (s = -1; s <= 1; s += 2) {
      bx(0.1, 0.2, 0.22, -4.32, s * 0.95, 1.24, darkMat);
      bx(0.03, 0.16, 0.08, -4.38, s * 0.95, 1.3, new THREE.MeshStandardMaterial({ color: 0x8c2820, metalness: 0.3, roughness: 0.5 }));
    }
    cyl(0.09, 0.09, 0.26, -4.42, 0, 1.0, steelMat, g, "x", 8);
    // ---- hydraulic stabiliser jacks -------------------------------------
    function jack(x, y, ext) {
      bx(0.36, 0.8, 0.26, x, y * 1.45, 1.14, trimMat);
      cyl(0.11, 0.11, ext, x, y * 1.72, 1.14 - ext * 0.5, steelMat, g, "z", 10);
      cyl(0.075, 0.075, 0.4, x, y * 1.72, 0.22, steelMat, g, "z", 8);
      cyl(0.33, 0.33, 0.11, x, y * 1.72, 0.06, darkMat, g, "z", 12);
      cyl(0.05, 0.05, 0.6, x, y * 1.6, 1.5, steelMat, g, "z", 6);
    }
    jack(1.25, 1, 1.1); jack(1.25, -1, 1.1);
    jack(-3.7, 1, 1.1); jack(-3.7, -1, 1.1);
    // ---- slewing phased array ------------------------------------------
    var turret = new THREE.Group();
    turret.name = "turret";
    turret.position.set(-1.75, 0, 1.49);
    g.add(turret);
    cyl(1.02, 1.08, 0.26, 0, 0, 0.13, trimMat, turret, "z", 24);
    for (i = 0; i < 16; i++) {
      var a = i / 16 * Math.PI * 2;
      cyl(0.035, 0.035, 0.06, Math.cos(a) * 0.92, Math.sin(a) * 0.92, 0.28, steelMat, turret, "z", 6);
    }
    bx(2.5, 2.44, 0.22, -0.1, 0, 0.37, bodyMat, turret);
    bx(0.7, 0.8, 0.62, -0.95, 0.72, 0.79, trimMat, turret);
    bx(0.7, 0.8, 0.62, -0.95, -0.72, 0.79, trimMat, turret);
    for (i = 0; i < 4; i++) bx(0.05, 0.7, 0.06, -0.72, 0.72, 0.6 + i * 0.14, darkMat, turret);
    // trunnion towers
    for (s = -1; s <= 1; s += 2) {
      bx(0.42, 0.3, 1.3, -0.3, s * 1.1, 1.05, trimMat, turret);
      cyl(0.17, 0.17, 0.42, -0.3, s * 1.1, 1.66, steelMat, turret, null, 12);
      var brace = bx(0.1, 0.12, 1.3, 0.28, s * 1.02, 1.02, steelMat, turret);
      brace.rotation.y = 0.45;
    }
    // erected panel assembly
    var pan = new THREE.Group();
    pan.position.set(-0.3, 0, 1.66);
    pan.rotation.y = -0.21;
    turret.add(pan);
    bx(0.3, 3.5, 3.02, 0, 0, 1.42, trimMat, pan);
    bx(0.07, 3.24, 2.78, 0.18, 0, 1.42, arrMat, pan);
    bx(0.1, 3.52, 0.13, 0.13, 0, 2.96, trimMat, pan);
    bx(0.1, 3.52, 0.13, 0.13, 0, -0.12, trimMat, pan);
    for (s = -1; s <= 1; s += 2) bx(0.1, 0.13, 3.04, 0.13, s * 1.72, 1.42, trimMat, pan);
    // rear ribs, cooling manifold, cable looms
    for (i = 0; i < 5; i++) bx(0.18, 0.14, 2.9, -0.22, -1.4 + i * 0.7, 1.42, steelMat, pan);
    bx(0.2, 3.4, 0.15, -0.24, 0, 2.55, steelMat, pan);
    cyl(0.13, 0.13, 3.3, -0.4, 0, 0.35, steelMat, pan, "y", 10);
    bx(0.42, 1.1, 0.7, -0.42, 0.9, 0.55, trimMat, pan);
    bx(0.42, 1.1, 0.7, -0.42, -0.9, 0.55, trimMat, pan);
    for (s = -1; s <= 1; s += 2) {
      var eye = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.028, 6, 12), steelMat);
      eye.position.set(0.0, s * 1.5, 3.06);
      eye.rotation.y = Math.PI / 2;
      pan.add(eye);
    }
    // IFF dipole bar over the array head
    cyl(0.05, 0.05, 3.2, 0.1, 0, 3.2, steelMat, pan, "y", 8);
    for (i = 0; i < 7; i++) cyl(0.018, 0.018, 0.34, 0.1, -1.35 + i * 0.45, 3.4, steelMat, pan, "z", 6);
    // team identification stripe across the array skirt
    bx(0.05, 3.24, 0.17, 0.22, 0, 0.12, teamMat, pan);
    // erection rams from deck to panel spine
    for (s = -1; s <= 1; s += 2) {
      var ram = cyl(0.1, 0.1, 1.85, -0.95, s * 0.95, 1.32, steelMat, turret, "z", 10);
      ram.rotation.y = -0.35;
      var rod = cyl(0.06, 0.06, 0.9, -0.68, s * 0.95, 2.02, trimMat, turret, "z", 8);
      rod.rotation.y = -0.35;
    }
    // waveguide trunk and rear power cable to the generator
    var wg = cyl(0.09, 0.09, 2.1, -0.1, 1.0, 0.75, darkMat, turret, "x", 8);
    wg.rotation.z = 0.16;
    return g;
  }
};

UNIT_MODELS["radarv_p"] = {
  len: 8.0,
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var seed = 3307;
    function rnd() { seed = (seed * 48271) % 2147483647; return seed / 2147483647; }
    function paint(base) {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var p = cv.getContext("2d");
      var i;
      p.fillStyle = base; p.fillRect(0, 0, 256, 256);
      for (i = 0; i < 28; i++) {
        p.globalAlpha = 0.04 + rnd() * 0.05;
        p.fillStyle = rnd() < 0.5 ? "#b9c3a2" : "#12180e";
        p.fillRect(rnd() * 256, rnd() * 256, 24 + rnd() * 74, 14 + rnd() * 46);
      }
      p.globalAlpha = 1;
      p.strokeStyle = "rgba(8,12,6,0.36)"; p.lineWidth = 1;
      var vx = [34, 82, 130, 178, 222], hz = [50, 110, 172, 226];
      for (i = 0; i < vx.length; i++) { p.beginPath(); p.moveTo(vx[i], 0); p.lineTo(vx[i] + rnd() * 5, 256); p.stroke(); }
      for (i = 0; i < hz.length; i++) { p.beginPath(); p.moveTo(0, hz[i]); p.lineTo(256, hz[i] + rnd() * 5); p.stroke(); }
      p.fillStyle = "rgba(0,0,0,0.3)";
      for (i = 0; i < 70; i++) p.fillRect(rnd() * 256, rnd() * 256, 2, 2);
      for (i = 0; i < 20; i++) {
        p.fillStyle = "rgba(46,36,16,0.11)";
        p.fillRect(rnd() * 256, 130 + rnd() * 100, 3 + rnd() * 6, 22 + rnd() * 60);
      }
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping;
      return t;
    }
    function arrayTex() {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var p = cv.getContext("2d");
      var i, j;
      p.fillStyle = "#2a2f2c"; p.fillRect(0, 0, 256, 256);
      for (j = 0; j < 12; j++) {
        for (i = 0; i < 16; i++) {
          var x = 12 + i * 14.6, y = 14 + j * 18.4;
          p.fillStyle = "#1c211e";
          p.fillRect(x, y, 12.4, 15.4);
          p.fillStyle = ((i + j) % 2) ? "#3c4540" : "#343c38";
          p.fillRect(x + 1.4, y + 1.6, 9.6, 12.2);
          p.fillStyle = "rgba(150,164,152,0.18)";
          p.fillRect(x + 2.6, y + 3.0, 7.0, 2.4);
        }
      }
      p.strokeStyle = "#171b18"; p.lineWidth = 9;
      p.strokeRect(4, 4, 248, 248);
      for (i = 0; i < 12; i++) {
        p.fillStyle = "rgba(18,22,16,0.16)";
        p.fillRect(rnd() * 256, rnd() * 256, 12 + rnd() * 46, 10 + rnd() * 34);
      }
      return new THREE.CanvasTexture(cv);
    }
    var bodyMat = new THREE.MeshStandardMaterial({ map: paint("#414d31"), metalness: 0.24, roughness: 0.64 });
    var trimMat = new THREE.MeshStandardMaterial({ color: 0x3a452c, metalness: 0.26, roughness: 0.68 });
    var darkMat = new THREE.MeshStandardMaterial({ color: 0x1b1f18, metalness: 0.15, roughness: 0.9 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x34373b, metalness: 0.85, roughness: 0.3 });
    var arrMat = new THREE.MeshStandardMaterial({ map: arrayTex(), metalness: 0.4, roughness: 0.54 });
    var lensMat = new THREE.MeshStandardMaterial({ color: 0x10161c, metalness: 0.6, roughness: 0.24 });
    var teamMat = new THREE.MeshStandardMaterial({ color: C.team, metalness: 0.3, roughness: 0.55 });
    function bx(sx, sy, sz, x, y, z, mat, parent) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
      m.position.set(x, y, z);
      (parent || g).add(m);
      return m;
    }
    function cyl(r1, r2, h, x, y, z, mat, parent, axis, seg) {
      var geo = new THREE.CylinderGeometry(r1, r2, h, seg || 12);
      if (axis === "x") geo.rotateZ(Math.PI / 2);
      else if (axis === "z") geo.rotateX(Math.PI / 2);
      var m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      (parent || g).add(m);
      return m;
    }
    function tube(ax, ay, az, bx2, by2, bz, r, mat, parent) {
      var dx = bx2 - ax, dy = by2 - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 5), mat);
      m.position.set((ax + bx2) / 2, (ay + by2) / 2, (az + bz) / 2);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
      (parent || g).add(m);
      return m;
    }
    function track(sy, tl, th, tw, n, wr, span) {
      var t = new THREE.Group();
      var pts = [
        [tl * 0.5, th * 0.6],
        [tl * 0.5 - 0.5, th],
        [-tl * 0.5 + 0.5, th],
        [-tl * 0.5, th * 0.6],
        [-tl * 0.5 + 0.55, 0.01],
        [tl * 0.5 - 0.55, 0.01]
      ];
      var geo = M.slab(THREE, pts, tw, "xz");
      geo.computeBoundingBox();
      geo.translate(0, -(geo.boundingBox.max.y + geo.boundingBox.min.y) / 2, 0);
      t.add(new THREE.Mesh(geo, darkMat));
      var wg = new THREE.CylinderGeometry(wr, wr, tw + 0.1, 14);
      var hg = new THREE.CylinderGeometry(wr * 0.5, wr * 0.5, tw + 0.16, 10);
      for (var i = 0; i < n; i++) {
        var wx = span * 0.5 - span * i / (n - 1);
        var w = new THREE.Mesh(wg, darkMat);
        w.position.set(wx, 0, wr + 0.02);
        t.add(w);
        var h = new THREE.Mesh(hg, trimMat);
        h.position.set(wx, 0, wr + 0.02);
        t.add(h);
      }
      var sg = new THREE.CylinderGeometry(wr * 0.78, wr * 0.78, tw + 0.06, 10);
      var s1 = new THREE.Mesh(sg, trimMat);
      s1.position.set(tl * 0.5 - 0.26, 0, th * 0.62);
      t.add(s1);
      var s2 = new THREE.Mesh(sg, trimMat);
      s2.position.set(-tl * 0.5 + 0.26, 0, th * 0.62);
      t.add(s2);
      t.position.y = sy;
      g.add(t);
      return t;
    }
    var i, s;
    // ---- MT-LBu hull -----------------------------------------------------
    var hull = new THREE.Mesh(M.loft(THREE, [
      { x: -3.6, w: 1.24, h: 0.6, zc: 1.14, sq: 0.86 },
      { x: -3.0, w: 1.42, h: 0.72, zc: 1.08, sq: 0.88 },
      { x: 1.5, w: 1.42, h: 0.72, zc: 1.08, sq: 0.88 },
      { x: 2.6, w: 1.36, h: 0.6, zc: 1.18, sq: 0.86 },
      { x: 3.6, w: 0.98, h: 0.28, zc: 1.32, sq: 0.82 }
    ], 12), bodyMat);
    g.add(hull);
    track(1.3, 6.9, 1.0, 0.42, 7, 0.33, 5.4);
    track(-1.3, 6.9, 1.0, 0.42, 7, 0.33, 5.4);
    // command superstructure
    bx(5.5, 2.52, 0.74, -0.7, 0, 2.15, bodyMat);
    bx(5.6, 2.3, 0.06, -0.7, 0, 2.55, trimMat);
    for (i = 0; i < 7; i++) bx(0.06, 2.3, 0.05, -3.1 + i * 0.8, 0, 2.59, bodyMat);
    // glacis details: trim vane, spare track, tow eyes, lights
    bx(0.1, 2.3, 0.44, 3.42, 0, 1.62, trimMat).rotation.y = 0.5;
    for (i = 0; i < 4; i++) bx(0.3, 0.44, 0.08, 2.75, -0.7 + i * 0.47, 1.78, darkMat).rotation.y = 0.3;
    for (s = -1; s <= 1; s += 2) {
      cyl(0.15, 0.15, 0.2, 3.2, s * 0.9, 1.85, trimMat, g, "x", 12);
      cyl(0.13, 0.13, 0.05, 3.32, s * 0.9, 1.85, lensMat, g, "x", 12);
      cyl(0.04, 0.04, 0.62, 3.3, s * 1.06, 1.9, steelMat, g, "z", 6);
      bx(0.24, 0.12, 0.14, 3.5, s * 0.5, 1.42, steelMat);
      // stowage bins over the track runs
      bx(2.0, 0.4, 0.5, -1.6, s * 1.52, 1.68, trimMat);
      bx(0.9, 0.4, 0.44, 0.9, s * 1.52, 1.66, bodyMat);
      for (i = 0; i < 3; i++) bx(0.05, 0.42, 0.4, -2.3 + i * 0.7, s * 1.53, 1.68, darkMat);
    }
    // driver and commander stations
    cyl(0.3, 0.3, 0.09, 2.2, 0.62, 2.57, trimMat, g, "z", 14);
    cyl(0.34, 0.34, 0.22, 2.2, -0.62, 2.63, trimMat, g, "z", 14);
    cyl(0.36, 0.36, 0.06, 2.2, -0.62, 2.76, trimMat, g, "z", 14);
    for (i = 0; i < 3; i++) bx(0.06, 0.2, 0.1, 2.44 - i * 0.12, -0.62 + (i - 1) * 0.25, 2.66, lensMat);
    bx(0.16, 0.22, 0.11, 2.42, 0.62, 2.65, lensMat);
    // exhaust, snorkel, fuel filler
    cyl(0.12, 0.12, 1.2, 0.4, -1.32, 2.0, darkMat, g, "x", 10);
    cyl(0.14, 0.14, 0.3, -0.3, -1.32, 2.12, darkMat, g, "z", 10);
    cyl(0.11, 0.11, 0.8, -2.9, 1.0, 2.9, trimMat, g, "z", 10);
    // rear generator set, cable reel, tail platform
    bx(1.3, 1.1, 0.9, -3.1, -0.6, 2.97, trimMat);
    for (i = 0; i < 6; i++) bx(0.04, 0.05, 0.66, -3.6 + i * 0.2, -0.02, 2.97, darkMat);
    cyl(0.09, 0.09, 0.5, -3.55, -0.6, 3.6, steelMat, g, "z", 8);
    cyl(0.36, 0.36, 0.4, -3.15, 0.85, 2.9, darkMat, g, "x", 12);
    cyl(0.45, 0.45, 0.04, -3.37, 0.85, 2.9, trimMat, g, "x", 12);
    cyl(0.45, 0.45, 0.04, -2.93, 0.85, 2.9, trimMat, g, "x", 12);
    bx(0.7, 0.6, 0.5, -3.9, 0, 1.6, trimMat);
    for (s = -1; s <= 1; s += 2) cyl(0.024, 0.024, 1.1, -3.85, s * 0.4, 1.05, steelMat, g, "z", 6);
    for (i = 0; i < 3; i++) cyl(0.02, 0.02, 0.8, -3.85, 0, 0.6 + i * 0.34, steelMat, g, null, 6);
    // roof railings and antenna whips
    for (i = 0; i < 4; i++) cyl(0.024, 0.024, 0.55, -3.3 + i * 0.62, 1.14, 2.85, steelMat, g, "z", 6);
    cyl(0.022, 0.022, 2.48, -2.37, 1.14, 3.12, steelMat, g, "x", 6);
    cyl(0.012, 0.012, 2.2, 1.5, 1.2, 3.6, steelMat, g, "z", 6).rotation.x = 0.1;
    cyl(0.012, 0.012, 1.6, 1.5, -1.2, 3.35, steelMat, g, "z", 6).rotation.x = -0.09;
    // ---- telescopic data-link mast at the rear left ----------------------
    bx(0.5, 0.5, 1.0, -2.5, 1.02, 3.05, trimMat);
    var mastH = [1.15, 0.98, 0.82];
    var mz = 3.55;
    for (i = 0; i < 3; i++) {
      cyl(0.13 - i * 0.03, 0.13 - i * 0.03, mastH[i], -2.5, 1.02, mz + mastH[i] * 0.5, steelMat, g, "z", 10);
      mz += mastH[i] * 0.92;
    }
    bx(0.3, 0.9, 0.08, -2.5, 1.02, mz + 0.1, trimMat);
    for (i = 0; i < 4; i++) cyl(0.014, 0.014, 0.4, -2.5, 0.62 + i * 0.27, mz + 0.32, steelMat, g, "z", 6);
    cyl(0.05, 0.05, 0.2, -2.5, 1.02, mz + 0.28, darkMat, g, "z", 8);
    var anch = [[-3.6, 1.9], [-1.4, 1.9], [-2.5, 0.2]];
    for (i = 0; i < 3; i++) tube(-2.5, 1.02, mz - 0.3, anch[i][0], anch[i][1], 2.7, 0.012, steelMat);
    // ---- slewing array mount ---------------------------------------------
    var turret = new THREE.Group();
    turret.name = "turret";
    turret.position.set(-0.9, 0, 2.55);
    g.add(turret);
    cyl(0.95, 1.0, 0.24, 0, 0, 0.12, trimMat, turret, "z", 24);
    for (i = 0; i < 14; i++) {
      var ba = i / 14 * Math.PI * 2;
      cyl(0.032, 0.032, 0.06, Math.cos(ba) * 0.86, Math.sin(ba) * 0.86, 0.26, steelMat, turret, "z", 6);
    }
    bx(2.1, 2.3, 0.24, 0, 0, 0.36, bodyMat, turret);
    bx(0.6, 0.62, 0.5, -0.7, 0.78, 0.73, trimMat, turret);
    bx(0.6, 0.62, 0.5, -0.7, -0.78, 0.73, trimMat, turret);
    for (s = -1; s <= 1; s += 2) {
      bx(0.36, 0.3, 0.9, 0.1, s * 1.02, 0.93, trimMat, turret);
      cyl(0.16, 0.16, 0.4, 0.1, s * 1.02, 1.38, steelMat, turret, null, 12);
      var br = bx(0.09, 0.11, 1.1, 0.5, s * 0.95, 0.9, steelMat, turret);
      br.rotation.y = 0.5;
    }
    var pan = new THREE.Group();
    pan.position.set(0.1, 0, 1.38);
    pan.rotation.y = -0.24;
    turret.add(pan);
    bx(0.3, 3.24, 2.34, 0, 0, 1.02, trimMat, pan);
    bx(0.08, 3.0, 2.1, 0.19, 0, 1.02, arrMat, pan);
    bx(0.12, 3.3, 0.14, 0.12, 0, 2.26, trimMat, pan);
    bx(0.12, 3.3, 0.14, 0.12, 0, -0.22, trimMat, pan);
    for (s = -1; s <= 1; s += 2) bx(0.12, 0.14, 2.36, 0.12, s * 1.59, 1.02, trimMat, pan);
    for (i = 0; i < 4; i++) bx(0.2, 0.15, 2.2, -0.23, -1.2 + i * 0.8, 1.02, steelMat, pan);
    bx(0.22, 3.1, 0.16, -0.24, 0, 1.95, steelMat, pan);
    bx(0.4, 1.0, 0.62, -0.42, 0.8, 0.3, trimMat, pan);
    bx(0.4, 1.0, 0.62, -0.42, -0.8, 0.3, trimMat, pan);
    cyl(0.12, 0.12, 3.0, -0.38, 0, 2.4, steelMat, pan, "y", 10);
    bx(0.06, 3.0, 0.16, 0.23, 0, -0.02, teamMat, pan);
    // small tracking horn above the main face
    bx(0.3, 0.36, 0.34, 0.22, 1.05, 2.5, trimMat, pan);
    cyl(0.13, 0.19, 0.24, 0.44, 1.05, 2.5, darkMat, pan, "x", 10);
    // elevation rams
    for (s = -1; s <= 1; s += 2) {
      var ram = cyl(0.1, 0.1, 1.3, -0.55, s * 0.86, 0.9, steelMat, turret, "z", 10);
      ram.rotation.y = -0.42;
      var rod = cyl(0.06, 0.06, 0.7, -0.34, s * 0.86, 1.42, trimMat, turret, "z", 8);
      rod.rotation.y = -0.42;
    }
    var wg = cyl(0.08, 0.08, 1.5, -0.1, 0.95, 0.55, darkMat, turret, "x", 8);
    wg.rotation.z = 0.2;
    return g;
  }
};

BLD_MODELS["refinery"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var SD = 55127, i, j, s, a;
    function rn() { SD = (SD * 16807) % 2147483647; return (SD % 10000) / 10000; }
    function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
    function tex(c, rx, ry) {
      var t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (rx) t.repeat.set(rx, ry);
      return t;
    }
    function patches(x, w, h, n, lt, dk) {
      for (var q = 0; q < n; q++) {
        x.globalAlpha = 0.04 + rn() * 0.04;
        x.fillStyle = (q % 3 === 0) ? lt : dk;
        x.fillRect(rn() * w, rn() * h, w * 0.05 + rn() * w * 0.24, h * 0.04 + rn() * h * 0.2);
      }
      x.globalAlpha = 1;
    }
    function seams(x, w, h, cols, rows, col) {
      x.globalAlpha = 0.5; x.strokeStyle = col || "#20241e"; x.lineWidth = 2; x.beginPath();
      for (var q = 1; q < cols; q++) { x.moveTo(q * w / cols, 0); x.lineTo(q * w / cols, h); }
      for (q = 1; q < rows; q++) { x.moveTo(0, q * h / rows); x.lineTo(w, q * h / rows); }
      x.stroke(); x.globalAlpha = 1;
    }
    function drips(x, w, h, n, col) {
      x.fillStyle = col || "#15180f";
      for (var q = 0; q < n; q++) {
        x.globalAlpha = 0.05 + rn() * 0.1;
        x.fillRect(rn() * w, rn() * h * 0.45, 1 + rn() * 4, h * 0.1 + rn() * h * 0.4);
      }
      x.globalAlpha = 1;
    }
    function hazard(x, px, py, pw, ph, step) {
      x.save(); x.beginPath(); x.rect(px, py, pw, ph); x.clip();
      x.globalAlpha = 0.94; x.fillStyle = "#c9a825"; x.fillRect(px, py, pw, ph);
      x.fillStyle = "#191a16";
      for (var q = -2; q < (pw + ph) / step + 2; q++) {
        var bx = px + q * step;
        x.beginPath();
        x.moveTo(bx, py); x.lineTo(bx + step * 0.5, py);
        x.lineTo(bx + step * 0.5 + ph, py + ph); x.lineTo(bx + ph, py + ph);
        x.closePath(); x.fill();
      }
      x.globalAlpha = 1; x.restore();
    }

    /* ---------------- textures ---------------- */
    var ac = cvs(512, 512), ax = ac.getContext("2d");
    ax.fillStyle = "#565b54"; ax.fillRect(0, 0, 512, 512);
    patches(ax, 512, 512, 42, "#7d8278", "#31352e");
    ax.globalAlpha = 0.36; ax.strokeStyle = "#2b2e28"; ax.lineWidth = 3; ax.beginPath();
    for (i = 1; i < 8; i++) { ax.moveTo(i * 64, 0); ax.lineTo(i * 64, 512); ax.moveTo(0, i * 64); ax.lineTo(512, i * 64); }
    ax.stroke(); ax.globalAlpha = 1;
    hazard(ax, 20, 430, 200, 22, 24);
    ax.globalAlpha = 0.55; ax.fillStyle = "#c8c4b0";
    for (i = 0; i < 8; i++) ax.fillRect(30 + i * 46, 360, 26, 5);
    ax.globalAlpha = 1;
    /* ore dust and spill staining */
    ax.fillStyle = "#4a3a26";
    for (i = 0; i < 30; i++) {
      ax.globalAlpha = 0.08 + rn() * 0.2;
      ax.beginPath(); ax.ellipse(rn() * 512, rn() * 512, 14 + rn() * 46, 10 + rn() * 34, rn() * 3, 0, 6.283); ax.fill();
    }
    ax.fillStyle = "#0d0f0a";
    for (i = 0; i < 20; i++) { ax.globalAlpha = 0.1 + rn() * 0.12; ax.fillRect(rn() * 512, rn() * 512, 20 + rn() * 90, 4 + rn() * 8); }
    ax.globalAlpha = 1;
    var apronTex = tex(ac);

    /* painted tank plate */
    var kc = cvs(512, 256), kx = kc.getContext("2d");
    kx.fillStyle = "#7d8177"; kx.fillRect(0, 0, 512, 256);
    patches(kx, 512, 256, 34, "#a9ada2", "#31352c");
    kx.globalAlpha = 0.5; kx.strokeStyle = "#4a4e45"; kx.lineWidth = 3; kx.beginPath();
    for (i = 1; i < 16; i++) { kx.moveTo(i * 32, 0); kx.lineTo(i * 32, 256); }
    for (i = 1; i < 5; i++) { kx.moveTo(0, i * 51); kx.lineTo(512, i * 51); }
    kx.stroke(); kx.globalAlpha = 1;
    kx.fillStyle = "#4a3a26";
    for (i = 0; i < 46; i++) {
      kx.globalAlpha = 0.06 + rn() * 0.16;
      kx.fillRect(rn() * 512, rn() * 60, 3 + rn() * 10, 40 + rn() * 170);
    }
    kx.globalAlpha = 1;
    kx.fillStyle = "#d9d6c4"; kx.globalAlpha = 0.85;
    kx.font = "bold 74px sans-serif"; kx.textAlign = "center";
    kx.fillText("ORE 02", 128, 120);
    kx.fillText("ORE 02", 384, 120);
    kx.globalAlpha = 0.7; kx.fillStyle = "#c9a825";
    kx.font = "bold 26px sans-serif";
    kx.fillText("FLAMMABLE", 128, 176); kx.fillText("FLAMMABLE", 384, 176);
    kx.globalAlpha = 1;
    var tankTex = tex(kc);

    var wc = cvs(256, 256), wx = wc.getContext("2d");
    wx.fillStyle = "#6d7268"; wx.fillRect(0, 0, 256, 256);
    patches(wx, 256, 256, 24, "#b4b7a9", "#22261e");
    seams(wx, 256, 256, 6, 4);
    for (i = 0; i < 4; i++) {
      var wxx = 26 + i * 56, wyy = 60;
      wx.fillStyle = "#1c252a"; wx.fillRect(wxx, wyy, 40, 34);
      wx.globalAlpha = 0.2; wx.fillStyle = "#a3b6c0"; wx.fillRect(wxx + 2, wyy + 2, 18, 14); wx.globalAlpha = 1;
      wx.strokeStyle = "#767a70"; wx.lineWidth = 2; wx.strokeRect(wxx, wyy, 40, 34);
    }
    drips(wx, 256, 256, 22);
    var wallTex = tex(wc);

    var rc = cvs(256, 256), rx = rc.getContext("2d");
    rx.fillStyle = "#4b5054"; rx.fillRect(0, 0, 256, 256);
    rx.globalAlpha = 0.3; rx.strokeStyle = "#2c3032"; rx.lineWidth = 2;
    for (i = 0; i < 64; i++) { rx.beginPath(); rx.moveTo(i * 4, 0); rx.lineTo(i * 4, 256); rx.stroke(); }
    rx.globalAlpha = 1;
    patches(rx, 256, 256, 20, "#787d7f", "#6a4a2a");
    var roofTex = tex(rc, 2, 2);

    var lc = cvs(64, 64), lx = lc.getContext("2d");
    lx.clearRect(0, 0, 64, 64);
    lx.strokeStyle = "rgba(198,204,206,0.98)"; lx.lineWidth = 3;
    for (i = -64; i < 128; i += 16) {
      lx.beginPath(); lx.moveTo(i, 0); lx.lineTo(i + 64, 64); lx.stroke();
      lx.beginPath(); lx.moveTo(i, 64); lx.lineTo(i + 64, 0); lx.stroke();
    }

    /* ---------------- materials ---------------- */
    var tankM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: tankTex, roughness: 0.62, metalness: 0.3 });
    var conc = new THREE.MeshStandardMaterial({ color: 0xffffff, map: wallTex, roughness: 0.8, metalness: 0.05 });
    var roofM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: roofTex, roughness: 0.6, metalness: 0.3 });
    var apronM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: apronTex, roughness: 0.9, metalness: 0.02 });
    var plainM = new THREE.MeshStandardMaterial({ color: 0x565b54, roughness: 0.88, metalness: 0.02 });
    var steel = new THREE.MeshStandardMaterial({ color: 0x8b908b, roughness: 0.3, metalness: 0.85 });
    var grey = new THREE.MeshStandardMaterial({ color: 0x6d7378, roughness: 0.55, metalness: 0.35 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x2a2d2a, roughness: 0.6, metalness: 0.4 });
    var rust = new THREE.MeshStandardMaterial({ color: 0x6d4c30, roughness: 0.85, metalness: 0.2 });
    var oreM = new THREE.MeshStandardMaterial({ color: 0x6a5334, roughness: 0.95, metalness: 0.06 });
    var teamM = new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.55, metalness: 0.15 });
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x1b262c, roughness: 0.18, metalness: 0.2 });
    var lampM = new THREE.MeshStandardMaterial({ color: 0xf4eecb, emissive: 0x6a6440, roughness: 0.4, metalness: 0.2 });
    var flameM = new THREE.MeshStandardMaterial({ color: 0xff8b28, emissive: 0xd85a12, roughness: 0.9, metalness: 0.0, transparent: true, opacity: 0.9 });
    var flameM2 = new THREE.MeshStandardMaterial({ color: 0xffe07a, emissive: 0xe8a52a, roughness: 0.9, metalness: 0.0 });
    var wood = new THREE.MeshStandardMaterial({ color: 0x6d5c3f, roughness: 0.85, metalness: 0.02 });
    var drumCache = {};

    function box(w, d, h, m) { return new THREE.Mesh(new THREE.BoxGeometry(w, d, h), m); }
    function at(mesh, x, y, z, p) { mesh.position.set(x, y, z); (p || g).add(mesh); return mesh; }
    function cylZ(r1, r2, h, m, sg) { var ge = new THREE.CylinderGeometry(r1, r2, h, sg || 10); ge.rotateX(Math.PI / 2); return new THREE.Mesh(ge, m); }
    function cylX(r1, r2, l, m, sg) { var ge = new THREE.CylinderGeometry(r1, r2, l, sg || 8); ge.rotateZ(-Math.PI / 2); return new THREE.Mesh(ge, m); }
    function cylY(r1, r2, l, m, sg) { return new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, l, sg || 8), m); }
    function elbow(px, py, pz, R, tube, mat, rotZ) {
      var e = new THREE.Mesh(new THREE.TorusGeometry(R, tube, 6, 10, Math.PI / 2), mat);
      e.position.set(px, py, pz); e.rotation.x = Math.PI / 2; e.rotation.y = rotZ || 0; g.add(e); return e;
    }
    function railingRing(px, py, pz, R, n) {
      at(new THREE.Mesh(new THREE.TorusGeometry(R, 0.045, 4, Math.max(10, n)), steel), px, py, pz + 1.05);
      at(new THREE.Mesh(new THREE.TorusGeometry(R, 0.035, 4, Math.max(10, n)), steel), px, py, pz + 0.58);
      for (var q = 0; q < n; q++) {
        var an = q / n * Math.PI * 2;
        at(cylZ(0.035, 0.035, 1.1, steel, 4), px + Math.cos(an) * R, py + Math.sin(an) * R, pz + 0.55);
      }
    }
    function railLine(px, py, len, ang, parent) {
      var grp = new THREE.Group(); grp.position.set(px, py, 0); grp.rotation.z = ang; (parent || g).add(grp);
      var n = Math.max(2, Math.round(len / 1.8));
      for (var q = 0; q <= n; q++) at(cylZ(0.035, 0.035, 1.05, steel, 4), -len / 2 + len * q / n, 0, 0.53, grp);
      at(cylX(0.03, 0.03, len, steel, 4), 0, 0, 1.05, grp);
      at(cylX(0.025, 0.025, len, steel, 4), 0, 0, 0.6, grp);
      return grp;
    }
    function ladder(px, py, z0, z1, ang) {
      var grp = new THREE.Group(); grp.position.set(px, py, 0); grp.rotation.z = ang || 0; g.add(grp);
      var h = z1 - z0, n = Math.max(2, Math.round(h / 1.4));
      for (var q = -1; q <= 1; q += 2) at(cylZ(0.05, 0.05, h, steel, 4), 0, q * 0.28, z0 + h / 2, grp);
      for (q = 0; q < n; q++) at(cylX(0.032, 0.032, 0.56, steel, 4), 0, 0, z0 + 0.4 + q * (h / n), grp).rotation.z = Math.PI / 2;
    }
    function fenceRun(x0, y0, x1, y1, h) {
      var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), an = Math.atan2(dy, dx);
      var t = tex(lc, L / 2.2, h / 2.2);
      var m = new THREE.MeshStandardMaterial({ color: 0x9aa0a2, map: t, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 0.5, metalness: 0.6 });
      var ge = new THREE.PlaneGeometry(L, h); ge.rotateX(Math.PI / 2);
      var mesh = new THREE.Mesh(ge, m);
      mesh.position.set((x0 + x1) / 2, (y0 + y1) / 2, h / 2 + 0.1); mesh.rotation.z = an; g.add(mesh);
      var rail = cylX(0.05, 0.05, L, steel, 5);
      rail.position.set((x0 + x1) / 2, (y0 + y1) / 2, h + 0.1); rail.rotation.z = an; g.add(rail);
      var n = Math.max(2, Math.round(L / 5));
      for (var q = 0; q <= n; q++) at(cylZ(0.07, 0.07, h + 0.3, steel, 5), x0 + dx * q / n, y0 + dy * q / n, (h + 0.3) / 2);
    }
    function floodlight(px, py, hgt, ang) {
      var p = new THREE.Group(); p.position.set(px, py, 0); p.rotation.z = ang; g.add(p);
      at(cylZ(0.5, 0.6, 0.5, plainM, 8), 0, 0, 0.25, p);
      at(cylZ(0.13, 0.18, hgt, steel, 6), 0, 0, hgt / 2, p);
      at(box(0.24, 1.6, 0.2, steel), 0, 0, hgt + 0.1, p);
      for (var q = -1; q <= 1; q += 2) {
        at(box(0.4, 0.6, 0.46, dark), -0.1, q * 0.5, hgt + 0.4, p);
        at(box(0.06, 0.5, 0.36, lampM), 0.13, q * 0.5, hgt + 0.4, p);
      }
    }
    function drum(px, py, pz, col) {
      var m = drumCache[col] || (drumCache[col] = new THREE.MeshStandardMaterial({ color: col, roughness: 0.6, metalness: 0.35 }));
      at(cylZ(0.3, 0.3, 0.92, m, 10), px, py, pz + 0.46);
      at(cylZ(0.32, 0.32, 0.07, dark, 10), px, py, pz + 0.62);
    }
    function crate(px, py, pz, sx, sy, sz, rot) {
      var c = box(sx, sy, sz, wood); c.position.set(px, py, pz + sz / 2); c.rotation.z = rot || 0; g.add(c);
      var b1 = box(sx + 0.05, 0.07, 0.09, dark); b1.position.set(px, py, pz + sz * 0.72); b1.rotation.z = rot || 0; g.add(b1);
    }
    function orePile(px, py, r, h) {
      at(new THREE.Mesh(new THREE.ConeGeometry(r, h, 9), oreM), px, py, h / 2 + 0.28).rotation.x = Math.PI / 2;
      for (var q = 0; q < 4; q++) {
        var c = box(0.3 + rn() * 0.4, 0.3 + rn() * 0.35, 0.22 + rn() * 0.2, oreM);
        c.position.set(px + (rn() - 0.5) * r * 3, py + (rn() - 0.5) * r * 3, 0.4);
        c.rotation.z = rn() * 3; g.add(c);
      }
    }
    function sandbags(px, py, ang, rows, per) {
      var grp = new THREE.Group(); grp.position.set(px, py, 0); grp.rotation.z = ang; g.add(grp);
      var bagM = new THREE.MeshStandardMaterial({ color: 0x7b7355, roughness: 0.95, metalness: 0.0 });
      for (var r = 0; r < rows; r++) for (var q = 0; q < per - r; q++) {
        var b = box(0.62, 0.4, 0.26, bagM);
        b.position.set((q - (per - r - 1) / 2) * 0.66 + (r % 2) * 0.16, 0, 0.14 + r * 0.25);
        b.rotation.z = (rn() - 0.5) * 0.16; grp.add(b);
      }
    }

    /* ---------------- ground ---------------- */
    at(new THREE.Mesh(new THREE.BoxGeometry(58, 38, 0.3), [plainM, plainM, plainM, plainM, apronM, plainM]), 0, 0, 0.15);

    /* ---------------- storage tank ---------------- */
    var TX = 15, TY = 5.5, TR = 8, TH = 13;
    at(cylZ(TR + 0.9, TR + 1.0, 0.55, plainM, 24), TX, TY, 0.45);
    at(cylZ(TR, TR, TH, tankM, 24), TX, TY, TH / 2 + 0.7);
    at(cylZ(1.1, TR + 0.08, 2.1, tankM, 24), TX, TY, TH + 1.75);
    at(cylZ(1.15, 1.15, 0.9, grey, 12), TX, TY, TH + 3.1);
    at(cylZ(1.3, 1.3, 0.18, dark, 12), TX, TY, TH + 3.6);
    /* wind girder + team identification band */
    at(new THREE.Mesh(new THREE.TorusGeometry(TR + 0.12, 0.16, 4, 24), grey), TX, TY, 7.2);
    at(cylZ(TR + 0.06, TR + 0.06, 1.1, teamM, 24), TX, TY, 11.6);
    /* roof rail + roof detail */
    railingRing(TX, TY, TH + 0.8, TR - 0.35, 14);
    at(box(1.2, 1.2, 0.3, grey), TX + 3.2, TY + 2.4, TH + 1.35);
    at(cylZ(0.28, 0.28, 1.2, grey, 8), TX - 3.0, TY + 2.0, TH + 1.9);
    /* nozzles at the base */
    at(cylX(0.42, 0.42, 2.6, grey, 10), TX - TR - 1.0, TY, 1.5);
    at(new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.13, 4, 10), dark), TX - TR - 2.2, TY, 1.5).rotation.z = Math.PI / 2;
    at(cylZ(0.42, 0.42, 2.4, grey, 10), TX - TR - 2.2, TY, 2.7);
    /* spiral stair around the shell */
    var steps = 26, totalTurn = Math.PI * 1.75;
    for (i = 0; i < steps; i++) {
      var t0 = i / steps;
      a = 2.4 + t0 * totalTurn;
      var zz = 1.0 + t0 * (TH - 0.6);
      var tread = box(1.5, 0.42, 0.09, steel);
      tread.position.set(TX + Math.cos(a) * (TR + 0.75), TY + Math.sin(a) * (TR + 0.75), zz);
      tread.rotation.z = a + Math.PI / 2; g.add(tread);
      if (i % 2 === 0) {
        var post = box(0.07, 0.07, 1.05, steel);
        post.position.set(TX + Math.cos(a) * (TR + 1.42), TY + Math.sin(a) * (TR + 1.42), zz + 0.52);
        g.add(post);
        var hr = box(1.3, 0.06, 0.06, steel);
        hr.position.set(TX + Math.cos(a + 0.13) * (TR + 1.42), TY + Math.sin(a + 0.13) * (TR + 1.42), zz + 1.12);
        hr.rotation.z = a + Math.PI / 2; hr.rotation.y = -0.32; g.add(hr);
      }
      if (i % 5 === 0) {
        var brk = box(0.12, 0.12, 1.0, steel);
        brk.position.set(TX + Math.cos(a) * (TR + 0.35), TY + Math.sin(a) * (TR + 0.35), zz - 0.5);
        g.add(brk);
      }
    }
    /* stair landing at grade */
    at(box(2.2, 1.6, 0.12, steel), TX + Math.cos(2.3) * (TR + 1.2), TY + Math.sin(2.3) * (TR + 1.2), 0.9);

    /* ---------------- processing tower ---------------- */
    var PX = -3, PY = -9;
    at(box(9, 9, 0.5, plainM), PX, PY, 0.4);
    at(cylZ(1.7, 2.0, 17.5, grey, 14), PX, PY, 9.2);
    at(cylZ(2.05, 2.05, 0.4, dark, 14), PX, PY, 5.0);
    at(cylZ(2.05, 2.05, 0.4, dark, 14), PX, PY, 12.4);
    at(cylZ(1.2, 0.4, 1.8, grey, 12), PX, PY, 18.7);
    at(cylZ(0.22, 0.22, 2.4, steel, 6), PX, PY, 20.4);
    /* structural frame around the column */
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2) {
      at(box(0.34, 0.34, 16.5, steel), PX + i * 3.4, PY + j * 3.4, 8.6);
    }
    for (i = 0; i < 4; i++) {
      var lz = 4.4 + i * 4.0;
      at(box(7.1, 0.24, 0.4, steel), PX, PY - 3.4, lz);
      at(box(7.1, 0.24, 0.4, steel), PX, PY + 3.4, lz);
      at(box(0.24, 7.1, 0.4, steel), PX - 3.4, PY, lz);
      at(box(0.24, 7.1, 0.4, steel), PX + 3.4, PY, lz);
    }
    /* platforms (M.slab decks) at two levels */
    for (i = 0; i < 2; i++) {
      var pz = 8.4 + i * 4.0;
      var deck = new THREE.Mesh(M.slab(THREE, [[-3.9, -3.9], [3.9, -3.9], [3.9, 3.9], [-3.9, 3.9]], 0.14), steel);
      at(deck, PX, PY, pz);
      railLine(PX, PY - 3.85, 7.6, 0).position.z = pz + 0.14;
      railLine(PX, PY + 3.85, 7.6, 0).position.z = pz + 0.14;
      railLine(PX - 3.85, PY, 7.6, Math.PI / 2).position.z = pz + 0.14;
    }
    ladder(PX + 4.0, PY, 0.5, 12.5, 0);
    /* vessel cluster beside the column */
    at(cylZ(1.05, 1.05, 6.0, grey, 12), PX + 5.4, PY + 4.6, 3.6);
    at(cylZ(0.9, 0.2, 1.0, grey, 12), PX + 5.4, PY + 4.6, 7.1);
    at(cylZ(1.05, 1.05, 0.3, dark, 12), PX + 5.4, PY + 4.6, 0.75);
    at(cylZ(0.75, 0.75, 4.4, grey, 10), PX - 5.2, PY + 3.6, 2.8);
    at(cylZ(0.8, 0.8, 0.25, dark, 10), PX - 5.2, PY + 3.6, 0.72);
    /* cyclone hoppers */
    for (i = -1; i <= 1; i += 2) {
      at(cylZ(1.0, 0.28, 2.2, rust, 10), PX + i * 2.4, PY - 5.6, 6.4);
      at(cylZ(1.0, 1.0, 1.6, rust, 10), PX + i * 2.4, PY - 5.6, 8.3);
      at(cylZ(0.26, 0.26, 3.6, grey, 6), PX + i * 2.4, PY - 5.6, 3.5);
    }

    /* ---------------- pipe runs tower -> tank ---------------- */
    for (i = 0; i < 3; i++) {
      var pz2 = 5.4 + i * 0.85, py2 = -6.0 + i * 0.9;
      at(cylX(0.32, 0.32, 13.4, grey, 8), 4.0, py2, pz2);
      elbow(10.7, py2, pz2 - 1.2, 1.2, 0.32, grey, 0);
      at(cylZ(0.32, 0.32, 3.0, grey, 8), 11.9, py2, pz2 - 2.7);
      at(new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.1, 4, 10), dark), 6.0, py2, pz2).rotation.z = Math.PI / 2;
    }
    /* pipe rack trestles */
    for (i = 0; i < 4; i++) {
      var rxp = -1.0 + i * 4.0;
      at(box(0.3, 0.3, 6.6, steel), rxp, -6.4, 3.4);
      at(box(0.3, 0.3, 6.6, steel), rxp, -3.8, 3.4);
      at(box(0.3, 3.0, 0.3, steel), rxp, -5.1, 6.8);
    }
    /* return pipe along Y with elbows */
    at(cylZ(0.28, 0.28, 4.0, grey, 8), 22.0, -1.5, 3.2);
    at(cylX(0.28, 0.28, 8.0, grey, 8), 22.0, -1.5, 1.4).rotation.z = Math.PI / 2;
    at(cylX(0.28, 0.28, 10.0, grey, 8), 26.5, 2.6, 1.4);
    at(new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.14, 4, 10), dark), 22.0, -5.0, 1.4).rotation.x = Math.PI / 2;

    /* ---------------- flare stack ---------------- */
    var FX = -25, FY = 12;
    at(box(3.4, 3.4, 0.6, plainM), FX, FY, 0.45);
    at(cylZ(0.52, 0.42, 19.0, grey, 10), FX, FY, 10.2);
    for (i = 0; i < 3; i++) {
      a = i / 3 * Math.PI * 2;
      var guy = box(11.6, 0.07, 0.07, steel);
      guy.position.set(FX + Math.cos(a) * 2.6, FY + Math.sin(a) * 2.6, 8.6);
      guy.rotation.z = a; guy.rotation.y = 1.02; g.add(guy);
    }
    at(cylZ(0.72, 0.72, 1.4, dark, 10), FX, FY, 20.2);
    at(cylZ(0.72, 1.0, 1.0, rust, 10), FX, FY, 21.3);
    at(new THREE.Mesh(new THREE.ConeGeometry(0.85, 3.2, 8), flameM), FX, FY, 23.4).rotation.x = -Math.PI / 2;
    at(new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.9, 6), flameM2), FX, FY, 22.7).rotation.x = -Math.PI / 2;
    ladder(FX + 0.75, FY, 0.6, 18.0, 0);
    at(cylX(0.2, 0.2, 6.0, grey, 8), FX + 3.2, FY, 2.2);
    at(cylZ(0.2, 0.2, 2.0, grey, 8), FX, FY, 1.4);

    /* ---------------- intake hopper + conveyor ramp ---------------- */
    var HX = -22, HY = -11;
    at(box(9.0, 8.0, 0.4, plainM), HX, HY, 0.4);
    var hop = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 1.1, 4.2, 4), rust);
    hop.geometry.rotateX(Math.PI / 2);
    hop.position.set(HX, HY, 4.6); hop.rotation.z = Math.PI / 4; g.add(hop);
    at(box(7.6, 7.6, 0.35, steel), HX, HY, 6.8);
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2) {
      at(box(0.34, 0.34, 6.6, steel), HX + i * 3.3, HY + j * 3.3, 3.6);
      var bd = box(4.7, 0.16, 0.16, steel);
      bd.position.set(HX + i * 1.65, HY + j * 3.3, 4.4); bd.rotation.y = 0.6 * i * j; g.add(bd);
    }
    /* grizzly grate + hazard kerb */
    for (i = 0; i < 7; i++) at(box(7.2, 0.14, 0.12, dark), HX, HY - 2.7 + i * 0.9, 7.05);
    at(box(0.5, 8.0, 0.7, rust), HX - 3.9, HY, 7.3);
    at(box(0.5, 8.0, 0.7, rust), HX + 3.9, HY, 7.3);
    /* ore in the hopper */
    at(new THREE.Mesh(new THREE.ConeGeometry(2.6, 1.2, 8), oreM), HX, HY, 6.6).rotation.x = Math.PI / 2;
    /* conveyor ramp up to the tower */
    var cvGrp = new THREE.Group();
    cvGrp.position.set(HX + 9.0, HY + 1.0, 5.2);
    cvGrp.rotation.y = -0.46; g.add(cvGrp);
    at(box(17.0, 2.3, 0.28, dark), 0, 0, 0, cvGrp);
    at(box(17.0, 0.28, 1.0, steel), 0, -1.25, 0.45, cvGrp);
    at(box(17.0, 0.28, 1.0, steel), 0, 1.25, 0.45, cvGrp);
    at(box(17.0, 2.0, 0.16, grey), 0, 0, 0.72, cvGrp);
    for (i = 0; i < 10; i++) at(cylX(0.22, 0.22, 2.1, steel, 6), -7.6 + i * 1.7, 0, 0.5, cvGrp).rotation.z = Math.PI / 2;
    at(cylX(0.5, 0.5, 2.5, grey, 10), 8.3, 0, 0.35, cvGrp).rotation.z = Math.PI / 2;
    at(box(2.6, 2.9, 2.4, grey), 8.0, 0, 1.5, cvGrp);
    at(box(2.0, 2.4, 1.6, rust), -8.2, 0, 1.2, cvGrp);
    /* ramp trestles */
    for (i = 0; i < 3; i++) {
      var tx2 = HX + 3.4 + i * 5.2, tz = 5.2 + Math.tan(0.46) * (tx2 - (HX + 9.0)) * -1;
      for (s = -1; s <= 1; s += 2) at(box(0.3, 0.3, tz, steel), tx2, HY + 1.0 + s * 1.1, tz / 2);
      at(box(0.3, 2.6, 0.3, steel), tx2, HY + 1.0, tz - 0.2);
    }
    /* discharge chute into the tower */
    at(box(2.2, 2.2, 3.0, rust), PX - 5.6, PY + 0.4, 12.0).rotation.y = 0.2;

    /* ---------------- ore spills, clutter, lights ---------------- */
    orePile(-13.5, -16.0, 2.6, 2.2);
    orePile(-8.0, -15.0, 1.8, 1.5);
    orePile(-18.5, -6.5, 2.0, 1.7);
    orePile(3.0, 14.0, 2.2, 1.9);
    at(box(10.0, 0.6, 0.9, plainM), -13.0, -18.4, 0.75);
    at(box(0.6, 6.0, 0.9, plainM), -18.2, -15.6, 0.75);
    /* control room */
    at(box(7.0, 5.0, 3.4, conc), 24.0, -12.5, 2.0);
    at(box(7.4, 5.4, 0.32, roofM), 24.0, -12.5, 3.85);
    at(box(0.14, 1.3, 1.1, glass), 20.45, -13.6, 2.5);
    at(box(0.14, 1.3, 1.1, glass), 20.45, -11.4, 2.5);
    at(box(0.3, 1.4, 2.4, dark), 27.55, -12.5, 1.5);
    at(box(1.6, 2.0, 0.35, plainM), 28.5, -12.5, 0.5);
    railLine(24.0, -9.8, 6.4, 0);
    crate(27.0, 8.0, 0.3, 2.4, 2.0, 1.7, 0.2);
    crate(24.6, 9.2, 0.3, 1.9, 1.7, 1.3, -0.3);
    crate(27.2, 11.4, 0.3, 2.2, 1.8, 1.5, 0.42);
    drum(20.0, 15.0, 0.3, 0x7a4030); drum(20.9, 15.4, 0.3, 0x4b5240);
    drum(20.4, 14.1, 0.3, 0x39566b); drum(21.3, 14.4, 0.3, 0x7a4030);
    drum(-28.0, -4.0, 0.3, 0x4b5240); drum(-27.2, -3.5, 0.3, 0x7a4030);
    sandbags(9.0, -17.5, 0, 3, 5);
    sandbags(-2.0, 17.4, 0.2, 2, 4);
    fenceRun(-29.0, 18.6, 8.0, 18.6, 2.6);
    fenceRun(-29.0, -18.6, -29.0, 18.6, 2.6);
    floodlight(-28.0, 17.0, 11, 5.4);
    floodlight(28.0, 17.0, 11, 3.9);
    floodlight(28.0, -17.0, 11, 2.4);
    floodlight(-10.0, -18.0, 11, 1.6);
    /* ground pipes and cable trays */
    for (i = 0; i < 4; i++) at(box(0.35, 0.35, 0.9, steel), -6.0 + i * 5.0, 12.0, 0.75);
    at(cylX(0.3, 0.3, 17.0, grey, 8), 1.5, 12.0, 1.35);
    at(cylX(0.3, 0.3, 17.0, grey, 8), 1.5, 12.7, 1.35);
    return g;
  }
};

BLD_MODELS["silo"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var i, j, k, s, a;

    function rng(seed) { var v = seed || 13; return function () { v = (v * 16807) % 2147483647; return (v % 10000) / 10000; }; }
    function mkTex(w, h, draw, rx, ry) {
      var cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      draw(cv.getContext("2d"), w, h);
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping;
      if (rx) t.repeat.set(rx, ry || rx);
      return t;
    }
    var padTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(17), q;
      x.fillStyle = "#5e6259"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 24; q++) {
        x.globalAlpha = 0.04 + r() * 0.05; x.fillStyle = (q % 3) ? "#000000" : "#969c8e";
        x.fillRect(r() * w, r() * h, 26 + r() * 76, 20 + r() * 54);
      }
      x.globalAlpha = 0.55; x.strokeStyle = "#3c403a"; x.lineWidth = 2;
      x.beginPath();
      for (q = 1; q < 4; q++) { x.moveTo(q * 64, 0); x.lineTo(q * 64, h); x.moveTo(0, q * 64); x.lineTo(w, q * 64); }
      x.stroke();
      x.globalAlpha = 0.12; x.fillStyle = "#141610";
      for (q = 0; q < 14; q++) x.fillRect(r() * w, r() * h, 4 + r() * 8, 16 + r() * 50);
      x.globalAlpha = 1;
    }, 7, 7);
    /* tank shell: plate courses, weld seams, painted level gauge, hull number */
    function shellTex(num) {
      return mkTex(1024, 512, function (x, w, h) {
        var r = rng(29 + num * 7), q;
        x.fillStyle = "#8e948a"; x.fillRect(0, 0, w, h);
        for (q = 0; q < 40; q++) {
          x.globalAlpha = 0.04 + r() * 0.05; x.fillStyle = (q % 3) ? "#000000" : "#d2d7cc";
          x.fillRect(r() * w, r() * h, 50 + r() * 180, 20 + r() * 60);
        }
        x.globalAlpha = 0.5; x.strokeStyle = "#5b6057"; x.lineWidth = 4;
        for (q = 1; q < 6; q++) { x.beginPath(); x.moveTo(0, q * h / 6); x.lineTo(w, q * h / 6); x.stroke(); }
        x.lineWidth = 3;
        for (q = 0; q < 12; q++) { x.beginPath(); x.moveTo(q * w / 12, 0); x.lineTo(q * w / 12, h); x.stroke(); }
        x.globalAlpha = 1;
        /* painted level gauge stripe at u = 0.25 with graduations */
        var gx = w * 0.25;
        x.fillStyle = "#e6e4d4"; x.fillRect(gx - 13, 40, 26, h - 80);
        x.fillStyle = "#2c2f2b";
        for (q = 0; q <= 10; q++) {
          var gy = h - 46 - q * (h - 96) / 10;
          x.fillRect(gx - 13, gy, q % 5 === 0 ? 26 : 15, q % 5 === 0 ? 6 : 4);
        }
        x.save(); x.translate(gx + 34, h * 0.5); x.scale(-1, 1);
        x.fillStyle = "#2c2f2b"; x.font = "bold 34px monospace"; x.textAlign = "center";
        x.fillText("100", 0, -h * 0.30);
        x.fillText("50", 0, 12);
        x.fillText("0", 0, h * 0.34);
        x.restore();
        /* big painted tank number on the opposite face */
        x.save(); x.translate(w * 0.72, h * 0.42); x.scale(-1, 1);
        x.globalAlpha = 0.85; x.fillStyle = "#e6e4d4";
        x.font = "bold 150px monospace"; x.textAlign = "center";
        x.fillText(String(num), 0, 0);
        x.restore();
        x.globalAlpha = 0.2; x.fillStyle = "#3b2a16";
        for (q = 0; q < 26; q++) x.fillRect(r() * w, r() * h * 0.45, 4 + r() * 9, 40 + r() * 150);
        x.globalAlpha = 0.14; x.fillStyle = "#101208";
        for (q = 0; q < 10; q++) x.fillRect(r() * w, h - 90 - r() * 60, 40 + r() * 120, 30 + r() * 80);
        x.globalAlpha = 1;
      });
    }
    var gratTex = mkTex(64, 64, function (x, w, h) {
      var q;
      x.fillStyle = "#5b6062"; x.fillRect(0, 0, w, h);
      x.fillStyle = "rgba(20,22,20,0.75)";
      for (q = 0; q < 8; q++) x.fillRect(q * 8 + 5, 0, 3, h);
      for (q = 0; q < 4; q++) x.fillRect(0, q * 16 + 6, w, 2);
    }, 8, 2);

    var pad = new THREE.MeshStandardMaterial({ map: padTex, roughness: 0.94, metalness: 0.02 });
    var shell1 = new THREE.MeshStandardMaterial({ map: shellTex(1), roughness: 0.62, metalness: 0.3 });
    var shell2 = new THREE.MeshStandardMaterial({ map: shellTex(2), roughness: 0.62, metalness: 0.3 });
    var metal = new THREE.MeshStandardMaterial({ color: 0x767c78, roughness: 0.52, metalness: 0.42 });
    var steel = new THREE.MeshStandardMaterial({ color: 0x8d9296, roughness: 0.4, metalness: 0.82 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x282c2b, roughness: 0.6, metalness: 0.3 });
    var grate = new THREE.MeshStandardMaterial({ map: gratTex, roughness: 0.7, metalness: 0.4, side: THREE.DoubleSide });
    var conc = new THREE.MeshStandardMaterial({ color: 0x7a7d72, roughness: 0.95, metalness: 0.02 });
    var team = new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.62, metalness: 0.14 });
    var hazard = new THREE.MeshStandardMaterial({ color: 0xc9a52c, roughness: 0.7, metalness: 0.08 });
    var lampW = new THREE.MeshStandardMaterial({ color: 0xfff1d0, emissive: 0xffe6b0, emissiveIntensity: 1.0, roughness: 0.5, metalness: 0.05 });

    function box(w, d, h, mat) { return new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mat); }
    function cylZ(r1, r2, h, mat, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, h, seg || 10, 1, !!open); geo.rotateX(Math.PI / 2);
      return new THREE.Mesh(geo, mat);
    }
    function cylX(r1, r2, l, mat, seg, open) {
      var geo = new THREE.CylinderGeometry(r1, r2, l, seg || 8, 1, !!open); geo.rotateZ(-Math.PI / 2);
      return new THREE.Mesh(geo, mat);
    }
    function cylY(r1, r2, l, mat, seg, open) {
      return new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, l, seg || 8, 1, !!open), mat);
    }
    function put(m, x, y, z) { m.position.set(x, y, z); g.add(m); return m; }
    var upZ = new THREE.Vector3(0, 0, 1);
    function strut(p, q, rad, mat, parent, seg) {
      var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var geo = new THREE.CylinderGeometry(rad, rad, L, seg || 5, 1, true); geo.rotateX(Math.PI / 2);
      var m = new THREE.Mesh(geo, mat);
      m.position.set((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
      m.quaternion.setFromUnitVectors(upZ, new THREE.Vector3(dx / L, dy / L, dz / L));
      (parent || g).add(m); return m;
    }
    function railLine(pts, z, h, mat) {
      for (var p = 0; p < pts.length - 1; p++) {
        var dx = pts[p + 1][0] - pts[p][0], dy = pts[p + 1][1] - pts[p][1];
        var L = Math.sqrt(dx * dx + dy * dy), ang = Math.atan2(dy, dx);
        for (var lvl = 0; lvl < 2; lvl++) {
          var bar = cylX(0.032, 0.032, L, mat, 4, true); bar.rotation.z = ang;
          put(bar, pts[p][0] + dx / 2, pts[p][1] + dy / 2, z + h * (lvl ? 1 : 0.55));
        }
        var n = Math.max(1, Math.round(L / 2.0));
        for (var q = 0; q <= n; q++)
          put(cylZ(0.042, 0.042, h, mat, 4, true), pts[p][0] + dx * q / n, pts[p][1] + dy * q / n, z + h / 2);
      }
    }
    function ringRail(cx, cy, rad, z, h, n, mat, skipFrom, skipTo) {
      for (var q = 0; q < n; q++) {
        var a0 = q / n * Math.PI * 2, a1 = (q + 1) / n * Math.PI * 2;
        if (skipFrom !== undefined && a0 >= skipFrom && a1 <= skipTo) continue;
        var x0 = cx + Math.cos(a0) * rad, y0 = cy + Math.sin(a0) * rad;
        var x1 = cx + Math.cos(a1) * rad, y1 = cy + Math.sin(a1) * rad;
        var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy);
        for (var lvl = 0; lvl < 2; lvl++) {
          var bar = cylX(0.032, 0.032, L, mat, 4, true); bar.rotation.z = Math.atan2(dy, dx);
          put(bar, x0 + dx / 2, y0 + dy / 2, z + h * (lvl ? 1 : 0.55));
        }
        put(cylZ(0.042, 0.042, h, mat, 4, true), x0, y0, z + h / 2);
      }
    }

    /* ---------------- pad, bund wall, spill kerbs ---------------- */
    put(box(40, 40, 0.25, pad), 0, 0, 0.125);
    put(box(34, 22, 0.3, conc), 0, 0.5, 0.3);
    for (s = -1; s <= 1; s += 2) {
      put(box(34, 0.7, 1.1, conc), 0, 0.5 + s * 10.65, 0.75);
      put(box(0.7, 22, 1.1, conc), s * 16.65, 0.5, 0.75);
      put(box(34, 0.3, 0.16, hazard), 0, 0.5 + s * 10.65, 1.35);
    }
    /* stepover stairs across the bund */
    for (i = 0; i < 4; i++) put(box(1.6, 0.35, 0.1, metal), -4.0, -9.4 + i * 0.55, 0.45 + i * 0.32);
    for (i = 0; i < 4; i++) put(box(1.6, 0.35, 0.1, metal), -4.0, -8.0 - i * 0.55, 1.63 - i * 0.32);

    /* ---------------- the two tanks ---------------- */
    var TR = 5.4, TH = 16.5, TZ = 0.45;
    var TXs = [-6.6, 6.6];
    for (k = 0; k < 2; k++) {
      var tx = TXs[k], ty = 0.5, mat = k ? shell2 : shell1;
      put(cylZ(TR + 0.5, TR + 0.5, 0.5, conc, 24), tx, ty, TZ - 0.05);       /* ring foundation */
      var shell = cylZ(TR, TR, TH, mat, 26, true);
      shell.rotation.z = -Math.PI / 2;                                        /* bring the gauge stripe to the front */
      put(shell, tx, ty, TZ + TH / 2);
      put(cylZ(TR + 0.1, TR + 0.1, 0.35, metal, 26), tx, ty, TZ + 0.2);      /* base angle */
      put(cylZ(TR + 0.08, TR + 0.08, 0.28, metal, 26), tx, ty, TZ + TH - 0.15);
      /* team band + shallow domed roof */
      put(cylZ(TR + 0.06, TR + 0.06, 0.75, team, 26, true), tx, ty, TZ + TH - 1.5);
      var roof = new THREE.Mesh(new THREE.SphereGeometry(TR + 0.05, 24, 6, 0, Math.PI * 2, 0, Math.PI / 2.6), metal);
      roof.scale.set(1, 1, 0.42);
      put(roof, tx, ty, TZ + TH);
      put(cylZ(0.9, 0.9, 0.5, metal, 12), tx, ty, TZ + TH + 1.55);           /* centre vent */
      put(cylZ(1.05, 1.05, 0.16, dark, 12), tx, ty, TZ + TH + 1.85);
      /* top hatch with hinged lid + handwheel */
      put(cylZ(0.62, 0.62, 0.34, metal, 12), tx - 2.4, ty + 0.6, TZ + TH + 0.9);
      var lid = cylZ(0.7, 0.7, 0.12, metal, 12);
      lid.rotation.y = -0.7; put(lid, tx - 3.0, ty + 0.6, TZ + TH + 1.35);
      var hwl = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 5, 10), metal);
      put(hwl, tx - 2.4, ty + 0.6, TZ + TH + 1.12);
      /* second hatch + gauge head */
      put(cylZ(0.45, 0.45, 0.5, metal, 10), tx + 2.3, ty - 1.4, TZ + TH + 0.95);
      put(box(0.5, 0.5, 0.3, dark), tx + 2.3, ty - 1.4, TZ + TH + 1.32);
      /* top perimeter railing, with a gap where the ladder lands */
      ringRail(tx, ty, TR - 0.45, TZ + TH + 0.55, 1.05, 14, metal, Math.PI * 1.36, Math.PI * 1.65);
      /* caged external ladder on the -Y face */
      var lx = tx, ly = ty - TR - 0.32;
      for (i = 0; i < 24; i++) put(cylX(0.026, 0.026, 0.52, metal, 4), lx, ly, 1.6 + i * 0.62);
      for (s = -1; s <= 1; s += 2) put(cylZ(0.038, 0.038, 15.6, metal, 4, true), lx + s * 0.26, ly, 8.9);
      for (i = 0; i < 6; i++) {
        var hoop = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.028, 4, 10, Math.PI * 1.15), metal);
        hoop.geometry.rotateX(Math.PI / 2);
        hoop.rotation.z = Math.PI / 2;
        put(hoop, lx, ly - 0.12, 5.0 + i * 2.2);
      }
      /* ladder landing platform at the top */
      var landing = new THREE.Mesh(M.slab(THREE, [[-1.3, -1.5], [1.3, -1.5], [1.3, 0.6], [-1.3, 0.6]], 0.12), grate);
      put(landing, tx, ty - TR + 0.2, TZ + TH + 0.5);
      railLine([[tx - 1.3, ty - TR - 1.3], [tx - 1.3, ty - TR + 0.8]], TZ + TH + 0.62, 1.0, metal);
      railLine([[tx + 1.3, ty - TR - 1.3], [tx + 1.3, ty - TR + 0.8]], TZ + TH + 0.62, 1.0, metal);
      /* physical float gauge board beside the painted stripe */
      put(box(0.12, 0.5, 13.0, metal), tx - 0.05, ty - TR - 0.03, 8.0);
      put(box(0.2, 0.62, 0.35, team), tx - 0.05, ty - TR - 0.12, 9.4);
      /* base nozzles + drain valve */
      put(cylY(0.26, 0.26, 1.6, metal, 10), tx + 1.9, ty - TR - 0.6, 1.3);
      put(cylZ(0.18, 0.18, 0.6, metal, 8), tx + 1.9, ty - TR - 1.3, 1.9);
      var hwv2 = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.05, 5, 10), metal);
      put(hwv2, tx + 1.9, ty - TR - 1.3, 2.25);
      put(box(1.3, 1.0, 0.16, metal), tx + 1.9, ty - TR - 1.0, 0.6);
      /* stiffener ribs */
      for (i = 0; i < 3; i++) put(cylZ(TR + 0.05, TR + 0.05, 0.16, metal, 26, true), tx, ty, TZ + 3.6 + i * 4.0);
    }

    /* ---------------- catwalk bridging the two tank tops ---------------- */
    var bz = TZ + TH + 0.5;
    var bridge = new THREE.Mesh(M.slab(THREE, [[-3.6, -1.3], [3.6, -1.3], [3.6, 1.3], [-3.6, 1.3]], 0.14), grate);
    put(bridge, 0, 0.5, bz);
    railLine([[-3.6, -0.8], [3.6, -0.8]], bz + 0.12, 1.05, metal);
    railLine([[-3.6, 1.8], [3.6, 1.8]], bz + 0.12, 1.05, metal);
    for (s = -1; s <= 1; s += 2) put(box(0.4, 2.8, 0.3, metal), s * 3.4, 0.5, bz - 0.16);

    /* ---------------- pipe manifold between the tanks ---------------- */
    var MZ = 2.6;
    put(cylX(0.3, 0.3, 9.6, metal, 12), 0, -6.6, MZ);                  /* header */
    for (i = 0; i < 3; i++) put(box(0.6, 0.8, MZ - 0.3, metal), -3.6 + i * 3.6, -6.6, (MZ - 0.3) / 2 + 0.45);
    for (k = 0; k < 2; k++) {
      var tx2 = TXs[k];
      put(cylY(0.26, 0.26, 5.4, metal, 10), tx2 + 1.9, -3.9, MZ);      /* branch to each tank */
      var elb = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.26, 6, 8, Math.PI / 2), metal);
      elb.geometry.rotateX(Math.PI / 2);
      elb.rotation.z = k ? Math.PI / 2 : 0;
      put(elb, tx2 + 1.9 + (k ? 0 : 0), -6.1, MZ);
      put(cylZ(0.26, 0.26, 1.4, metal, 10), tx2 + 1.9, -6.6, MZ - 0.9);
      var vw = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.06, 5, 12), metal);
      vw.rotation.y = Math.PI / 2;
      put(vw, tx2 + 1.9, -6.6, MZ + 0.75);
      put(box(0.5, 0.5, 0.55, metal), tx2 + 1.9, -6.6, MZ + 0.35);
    }
    /* pump skid + motor under the header */
    put(box(4.2, 2.4, 0.3, conc), 0, -8.8, 0.5);
    put(box(1.6, 1.0, 0.9, metal), -0.8, -8.8, 1.1);
    put(cylX(0.42, 0.42, 1.5, dark, 12), 1.0, -8.8, 1.2);
    put(cylX(0.62, 0.62, 0.5, metal, 12), 1.9, -8.8, 1.2);
    put(cylZ(0.24, 0.24, 1.5, metal, 8), 1.9, -8.8, 2.0);
    put(box(1.7, 1.1, 0.2, team), -0.8, -8.8, 1.6);
    /* fill point / loading arm at the front */
    put(cylZ(0.22, 0.22, 3.4, metal, 10), 0, -12.5, 1.9);
    put(cylX(0.22, 0.22, 2.4, metal, 10), -1.1, -12.5, 3.5);
    put(cylZ(0.2, 0.2, 1.0, metal, 8), -2.2, -12.5, 3.1);
    put(cylZ(0.26, 0.26, 0.3, dark, 8), -2.2, -12.5, 2.5);
    put(box(1.2, 1.0, 1.2, metal), 1.4, -12.5, 0.9);
    put(box(1.24, 0.2, 0.34, team), 1.4, -12.95, 1.2);

    /* ---------------- ground clutter ---------------- */
    var r6 = rng(71);
    for (i = 0; i < 6; i++) {                                          /* drums */
      var dx2 = -14.0 + (i % 3) * 1.0, dy2 = -14.5 - Math.floor(i / 3) * 1.0;
      put(cylZ(0.42, 0.42, 0.95, i % 3 === 1 ? team : dark, 10), dx2, dy2, 0.72);
      put(cylZ(0.44, 0.44, 0.07, metal, 10), dx2, dy2, 1.0);
    }
    put(box(2.6, 1.6, 2.0, metal), 12.0, -13.5, 1.25);                 /* control cabinet */
    put(box(2.8, 1.8, 0.16, metal), 12.0, -13.5, 2.33);
    put(box(2.0, 0.12, 0.5, team), 12.0, -14.35, 1.8);
    put(box(0.9, 0.14, 1.3, dark), 12.0, -14.32, 1.2);
    for (i = 0; i < 6; i++) put(cylZ(0.12, 0.12, 1.0, hazard, 8), -12.0 + i * 2.4, -17.0, 0.7);
    for (i = 0; i < 2; i++) {                                          /* floodlight masts */
      var fx = -15.0 + i * 30.0;
      put(cylZ(0.18, 0.14, 9.0, metal, 8), fx, 14.0, 4.6);
      put(box(0.7, 1.0, 0.5, dark), fx, 13.5, 9.2);
      put(box(0.6, 0.14, 0.42, lampW), fx, 12.95, 9.15);
    }
    put(cylZ(0.07, 0.07, 2.2, metal, 5, true), 5.5, -16.5, 1.2);       /* warning sign */
    put(box(1.4, 0.08, 0.9, team), 5.5, -16.5, 2.6);
    for (i = 0; i < 3; i++) {                                          /* crates + pallet */
      var cr = box(1.5 + r6() * 0.4, 1.2, 0.9, i % 2 ? dark : metal);
      cr.position.set(-15.5 + i * 1.9, 8.0 + r6() * 1.6, 0.9); cr.rotation.z = (r6() - 0.5) * 0.4; g.add(cr);
    }
    put(box(6.0, 3.0, 0.3, conc), 15.0, 8.0, 0.4);                     /* spill tray + spare valves */
    for (i = 0; i < 3; i++) put(cylX(0.3, 0.3, 1.8, metal, 10), 15.0, 7.0 + i * 1.0, 0.85);
    return g;
  }
};

UNIT_MODELS["sub_c"] = {
  len: 77.6,
  build: function (THREE, M, C) {
    var G = new THREE.Group();
    var i, seed = 53;
    function R() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    /* ---------------- hull table: x, half-beam, half-depth ---------------- */
    var ZC = 1.85;
    var SEC = [
      [-38.8, 0.4, 0.4], [-36, 1.4, 1.4], [-32, 2.4, 2.4], [-27, 3.3, 3.35],
      [-20, 4.0, 4.05], [-12, 4.15, 4.2], [-2, 4.2, 4.25], [8, 4.2, 4.25],
      [16, 4.1, 4.2], [23, 3.85, 4.0], [29, 3.3, 3.6], [34, 2.4, 2.9],
      [37.5, 1.3, 1.9], [38.8, 0.4, 0.95]
    ];
    function sec(x) {
      if (x <= SEC[0][0]) return [SEC[0][1], SEC[0][2]];
      for (var q = 1; q < SEC.length; q++) {
        if (x <= SEC[q][0]) {
          var t = (x - SEC[q - 1][0]) / (SEC[q][0] - SEC[q - 1][0]);
          return [SEC[q - 1][1] + t * (SEC[q][1] - SEC[q - 1][1]),
            SEC[q - 1][2] + t * (SEC[q][2] - SEC[q - 1][2])];
        }
      }
      return [SEC[SEC.length - 1][1], SEC[SEC.length - 1][2]];
    }
    function surf(x, y) {
      var s = sec(x), c = Math.min(1, Math.abs(y) / s[0]);
      return ZC + s[1] * Math.sqrt(1 - c * c);
    }
    function flank(x, z) {
      var s = sec(x), c = Math.min(1, Math.abs(z - ZC) / s[1]);
      return s[0] * Math.sqrt(1 - c * c);
    }

    /* ---------------- anechoic coating skin ---------------- */
    var cv = document.createElement("canvas"); cv.width = 1024; cv.height = 256;
    var g2 = cv.getContext("2d"), W = cv.width, H = cv.height;
    function HV(v) { return (1 - v) * H; }
    g2.fillStyle = "#1f2225"; g2.fillRect(0, 0, W, H);
    for (i = 0; i < 95; i++) {
      g2.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.07)";
      g2.fillRect(R() * W, R() * H, 22 + R() * 120, 10 + R() * 46);
    }
    g2.fillStyle = "#121517";                                     /* non-skid casing band */
    g2.fillRect(0.06 * W, HV(0.305), 0.88 * W, HV(0.195) - HV(0.305));
    g2.strokeStyle = "rgba(0,0,0,0.35)"; g2.lineWidth = 1;        /* coating panel seams */
    for (i = 0; i <= W; i += 13) { g2.beginPath(); g2.moveTo(i, 0); g2.lineTo(i, H); g2.stroke(); }
    for (i = 0; i <= H; i += 11) { g2.beginPath(); g2.moveTo(0, i); g2.lineTo(W, i); g2.stroke(); }
    for (i = 0; i < 75; i++) {
      g2.fillStyle = R() < 0.42 ? "rgba(146,150,155,0.14)" : "rgba(0,0,0,0.2)";
      g2.fillRect(Math.floor(R() * 78) * 13 + 1, Math.floor(R() * 23) * 11 + 1, 12, 10);
    }
    g2.strokeStyle = "rgba(178,184,188,0.45)"; g2.lineWidth = 1.5;
    g2.beginPath(); g2.moveTo(0.06 * W, HV(0.195)); g2.lineTo(0.94 * W, HV(0.195)); g2.stroke();
    g2.beginPath(); g2.moveTo(0.06 * W, HV(0.305)); g2.lineTo(0.94 * W, HV(0.305)); g2.stroke();
    var wl = [0.58, 0.91];
    for (i = 0; i < 2; i++) {
      var gr = g2.createLinearGradient(0, HV(wl[i] + 0.04), 0, HV(wl[i] - 0.04));
      gr.addColorStop(0, "rgba(72,80,58,0)"); gr.addColorStop(0.5, "rgba(76,84,60,0.5)");
      gr.addColorStop(1, "rgba(72,80,58,0)");
      g2.fillStyle = gr; g2.fillRect(0, HV(wl[i] + 0.04), W, HV(wl[i] - 0.04) - HV(wl[i] + 0.04));
    }
    g2.fillStyle = "rgba(8,10,12,0.48)";                          /* free-flood holes */
    for (i = 0; i < 42; i++) { g2.fillRect(110 + i * 19, HV(0.545), 8, 3.5); g2.fillRect(110 + i * 19, HV(0.945), 8, 3.5); }
    g2.fillStyle = "rgba(195,200,205,0.6)"; g2.font = "bold 13px sans-serif";
    for (i = 0; i < 6; i++) {
      g2.save(); g2.translate(0.89 * W, HV(0.63 + i * 0.03)); g2.scale(1, -1);
      g2.fillText("" + (i * 5 + 25), 0, 4); g2.restore();
    }
    var tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4;

    var hullMat = new THREE.MeshStandardMaterial({ map: tex, metalness: 0.26, roughness: 0.74, side: THREE.DoubleSide });
    var deckMat = new THREE.MeshStandardMaterial({ color: 0x15181a, metalness: 0.2, roughness: 0.9 });
    var sailMat = new THREE.MeshStandardMaterial({ color: 0x212528, metalness: 0.3, roughness: 0.68 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x8a9095, metalness: 0.85, roughness: 0.3 });
    var teamMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.team), metalness: 0.3, roughness: 0.55 });

    function bx(p, sx, sy, sz, x, y, z, mt) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mt); m.position.set(x, y, z); p.add(m); return m;
    }
    function tube(p, r1, r2, h, ax, x, y, z, mt, sg) {
      var g = new THREE.CylinderGeometry(r1, r2, h, sg || 8);
      if (ax === "z") g.rotateX(Math.PI / 2); else if (ax === "x") g.rotateZ(Math.PI / 2);
      var m = new THREE.Mesh(g, mt); m.position.set(x, y, z); p.add(m); return m;
    }
    function link(p, a, b, r, mt, sg) {
      var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, sg || 4), mt);
      m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
      p.add(m); return m;
    }
    function prism(p, pts, h, x, y, z, mt) {
      var s = new THREE.Shape(); s.moveTo(pts[0][0], pts[0][1]);
      for (var q = 1; q < pts.length; q++) s.lineTo(pts[q][0], pts[q][1]);
      s.closePath();
      var m = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: false }), mt);
      m.position.set(x, y, z); p.add(m); return m;
    }
    /* chined sweep: closed (y,z) profile scaled station by station along +X */
    function sweep(prof, sts, mt) {
      var pos = [], idx = [], n = prof.length, a, b, c, d, u, v;
      for (u = 0; u < sts.length; u++)
        for (v = 0; v < n; v++)
          pos.push(sts[u].x, prof[v][0] * sts[u].sy, sts[u].dz + prof[v][1] * sts[u].sz);
      for (u = 0; u < sts.length - 1; u++)
        for (v = 0; v < n; v++) {
          a = u * n + v; b = u * n + (v + 1) % n; c = a + n; d = b + n;
          idx.push(a, c, b, b, c, d);
        }
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.setIndex(idx); g.computeVertexNormals();
      var m = new THREE.Mesh(g, mt); G.add(m); return m;
    }

    /* ---------------- teardrop hull ---------------- */
    var lsec = [];
    for (i = 0; i < SEC.length; i++) lsec.push({ x: SEC[i][0], w: SEC[i][1], h: SEC[i][2], zc: ZC });
    G.add(new THREE.Mesh(M.loft(THREE, lsec, 24), hullMat));

    /* hull chine strake and flank sonar array */
    bx(G, 34, 0.4, 0.55, 4, 4.02, 2.7, deckMat);
    bx(G, 34, 0.4, 0.55, 4, -4.02, 2.7, deckMat);
    bx(G, 17, 0.35, 1.1, 12, 3.92, 3.9, deckMat);
    bx(G, 17, 0.35, 1.1, 12, -3.92, 3.9, deckMat);

    /* ---------------- chined faired sail base ---------------- */
    var prof = [[-1.0, -1.2], [-1.0, 0.05], [-0.72, 0.85], [0.72, 0.85], [1.0, 0.05], [1.0, -1.2]];
    sweep(prof, [
      { x: -17.5, sy: 0.4, sz: 0.25, dz: 5.6 },
      { x: -14.0, sy: 1.35, sz: 0.55, dz: 5.8 },
      { x: -8.0, sy: 2.15, sz: 0.95, dz: 5.95 },
      { x: 0.0, sy: 2.45, sz: 1.15, dz: 6.0 },
      { x: 10.0, sy: 2.45, sz: 1.15, dz: 6.0 },
      { x: 17.0, sy: 2.1, sz: 0.95, dz: 5.95 },
      { x: 21.5, sy: 1.3, sz: 0.6, dz: 5.85 },
      { x: 24.0, sy: 0.4, sz: 0.25, dz: 5.65 }
    ], sailMat);

    /* ---------------- angular sail ---------------- */
    var SX = 2.0, SZ = 6.9;                                        /* sits on the faired base */
    var sailPlan = [
      [-6.4, -1.5], [-5.2, -1.75], [2.2, -1.75], [4.4, -1.55], [6.3, -0.85],
      [6.8, 0], [6.3, 0.85], [4.4, 1.55], [2.2, 1.75], [-5.2, 1.75], [-6.4, 1.5]
    ];
    prism(G, sailPlan, 4.5, SX, 0, SZ, sailMat);
    var up = [];
    for (i = 0; i < sailPlan.length; i++) up.push([sailPlan[i][0] * 0.95, sailPlan[i][1] * 0.85]);
    prism(G, up, 1.4, SX, 0, SZ + 4.5, sailMat);
    var cap = [];
    for (i = 0; i < sailPlan.length; i++) cap.push([sailPlan[i][0] * 0.9, sailPlan[i][1] * 0.7]);
    prism(G, cap, 0.3, SX, 0, SZ + 5.9, sailMat);
    var TOPZ = SZ + 6.2;
    bx(G, 2.4, 3.0, 0.8, SX + 3.5, 0, TOPZ - 0.45, deckMat);       /* bridge well */
    bx(G, 0.3, 2.8, 1.3, SX + 4.6, 0, TOPZ - 0.05, sailMat);       /* windscreen */
    bx(G, 2.0, 3.6, 0.5, SX - 4.0, 0, SZ + 0.9, teamMat);          /* identification band */

    /* masts */
    tube(G, 0.14, 0.14, 3.4, "z", SX + 1.7, 0.45, TOPZ + 1.6, steelMat, 6);
    tube(G, 0.11, 0.11, 2.8, "z", SX + 0.5, -0.45, TOPZ + 1.3, steelMat, 6);
    tube(G, 0.4, 0.4, 3.0, "z", SX - 2.0, 0, TOPZ + 1.4, sailMat, 8);
    bx(G, 0.9, 0.9, 0.7, SX - 2.0, 0, TOPZ + 3.2, sailMat);
    tube(G, 0.17, 0.17, 3.2, "z", SX - 4.0, 0.55, TOPZ + 1.6, steelMat, 6);
    bx(G, 0.35, 1.2, 0.85, SX - 4.0, 0.55, TOPZ + 3.5, steelMat);
    tube(G, 0.05, 0.05, 4.2, "z", SX - 5.6, -0.85, TOPZ + 2.1, steelMat, 5);
    bx(G, 0.06, 0.7, 0.45, SX - 5.37, -0.85, TOPZ + 3.9, teamMat);

    /* ---------------- retractable bow planes on the hull ---------------- */
    for (i = 0; i < 2; i++) {
      var s2 = i ? -1 : 1;
      var pl = new THREE.Mesh(M.slab(THREE, [
        [-2.0, 0], [2.0, 0], [1.4, s2 * 3.2], [-1.2, s2 * 3.4]
      ], 0.38), sailMat);
      pl.position.set(21.0, s2 * 3.5, 3.4); pl.rotation.x = s2 * -0.3; G.add(pl);
      bx(G, 3.2, 0.9, 0.9, 21.0, s2 * 3.4, 3.5, sailMat);
    }

    /* ---------------- cruciform stern ---------------- */
    var ru = new THREE.Mesh(M.slab(THREE, [[-35.0, 4.2], [-31.5, 9.8], [-27.5, 9.8], [-22.5, 4.2]], 0.48, "xz"), sailMat);
    ru.position.y = 0.24; G.add(ru);
    var rl = new THREE.Mesh(M.slab(THREE, [[-35.0, -0.5], [-31.5, -5.8], [-27.5, -5.8], [-22.5, -0.5]], 0.48, "xz"), sailMat);
    rl.position.y = 0.24; G.add(rl);
    for (i = 0; i < 2; i++) {
      var s3 = i ? -1 : 1;
      var sp = new THREE.Mesh(M.slab(THREE, [
        [-35.0, s3 * 2.0], [-23.5, s3 * 2.0], [-26.5, s3 * 7.4], [-33.5, s3 * 7.4]
      ], 0.44), sailMat);
      sp.position.z = ZC; G.add(sp);
    }
    tube(G, 0.45, 0.95, 2.3, "x", -37.2, 0, ZC, steelMat, 10);
    for (i = 0; i < 7; i++) {
      var hold = new THREE.Group();
      var bl = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.8, 0.8), steelMat);
      bl.position.set(-0.28, 1.6, 0); bl.rotation.x = 0.55;
      hold.add(bl); hold.position.set(-37.5, 0, ZC);
      hold.rotation.x = i * Math.PI * 2 / 7; G.add(hold);
    }

    /* six bow torpedo tube shutters, three each side */
    for (i = 0; i < 6; i++) {
      var tz = ZC - 0.9 + (i % 3) * 0.9, sgn2 = i < 3 ? 1 : -1, tx = 31.5;
      var sh = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 10), deckMat);
      sh.position.set(tx, sgn2 * (flank(tx, tz) - 0.05), tz); G.add(sh);
    }
    tube(G, 0.26, 0.26, 40, "x", -14, -3.75, 3.6, deckMat, 6);                 /* towed array fairing */
    tube(G, 0.26, 0.2, 3.4, "x", 7.5, -3.75, 3.62, deckMat, 6);
    tube(G, 0.65, 0.65, 0.14, "z", -26, 0, surf(-26, 0) - 0.02, steelMat, 10); /* rescue buoy */

    /* ---------------- deck fittings, sitting on the hull skin ---------------- */
    var cl = [[-20, 1.3], [-20, -1.3], [-12, 1.3], [-12, -1.3], [26, 1.3], [26, -1.3]];
    for (i = 0; i < cl.length; i++)
      bx(G, 1.0, 0.45, 0.28, cl[i][0], cl[i][1], surf(cl[i][0], cl[i][1]) + 0.09, steelMat);
    var ht = [-24, 27.5];
    for (i = 0; i < ht.length; i++) tube(G, 0.55, 0.55, 0.16, "z", ht[i], 0, surf(ht[i], 0) - 0.02, steelMat, 10);
    tube(G, 0.48, 0.58, 0.65, "z", 29.5, 0, surf(29.5, 0) + 0.28, steelMat, 10);   /* capstan */
    bx(G, 1.4, 1.0, 0.15, 32.0, 0, surf(32.0, 0) - 0.03, steelMat);
    var st = [-30, -25.5, -21, -16.5, 26, 30];
    var tops = [];
    for (i = 0; i < st.length; i++) {
      var bz = surf(st[i], 1.4);
      tube(G, 0.05, 0.05, 1.0, "z", st[i], 1.4, bz + 0.5, steelMat, 5);
      tube(G, 0.05, 0.05, 1.0, "z", st[i], -1.4, bz + 0.5, steelMat, 5);
      tops.push([st[i], bz]);
    }
    for (i = 1; i < tops.length; i++) {
      if (tops[i][0] - tops[i - 1][0] > 8) continue;
      link(G, [tops[i - 1][0], 1.4, tops[i - 1][1] + 0.95], [tops[i][0], 1.4, tops[i][1] + 0.95], 0.035, steelMat);
      link(G, [tops[i - 1][0], -1.4, tops[i - 1][1] + 0.95], [tops[i][0], -1.4, tops[i][1] + 0.95], 0.035, steelMat);
      link(G, [tops[i - 1][0], 1.4, tops[i - 1][1] + 0.5], [tops[i][0], 1.4, tops[i][1] + 0.5], 0.035, steelMat);
      link(G, [tops[i - 1][0], -1.4, tops[i - 1][1] + 0.5], [tops[i][0], -1.4, tops[i][1] + 0.5], 0.035, steelMat);
    }

    return G;
  }
};

UNIT_MODELS["sub_n"] = {
  len: 110,
  build: function (THREE, M, C) {
    var G = new THREE.Group();
    var i, seed = 17;
    function R() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    /* ---------------- hull table: x, half-beam, half-depth ---------------- */
    var ZC = 2.4;
    var SEC = [
      [-55, 0.45, 0.45], [-52, 1.6, 1.6], [-48, 2.75, 2.75], [-43, 3.75, 3.75],
      [-36, 4.45, 4.45], [-26, 4.85, 4.85], [-10, 5.0, 5.0], [10, 5.0, 5.0],
      [24, 5.0, 5.0], [33, 4.9, 4.9], [41, 4.55, 4.6], [47, 3.85, 4.0],
      [51.5, 2.7, 3.0], [54, 1.5, 1.9], [55, 0.5, 1.0]
    ];
    function sec(x) {
      if (x <= SEC[0][0]) return [SEC[0][1], SEC[0][2]];
      for (var q = 1; q < SEC.length; q++) {
        if (x <= SEC[q][0]) {
          var t = (x - SEC[q - 1][0]) / (SEC[q][0] - SEC[q - 1][0]);
          return [SEC[q - 1][1] + t * (SEC[q][1] - SEC[q - 1][1]),
            SEC[q - 1][2] + t * (SEC[q][2] - SEC[q - 1][2])];
        }
      }
      return [SEC[SEC.length - 1][1], SEC[SEC.length - 1][2]];
    }
    /* height of the hull skin above the waterline at (x, y) */
    function surf(x, y) {
      var s = sec(x), c = Math.min(1, Math.abs(y) / s[0]);
      return ZC + s[1] * Math.sqrt(1 - c * c);
    }
    /* half-breadth of the hull skin at (x, z) */
    function flank(x, z) {
      var s = sec(x), c = Math.min(1, Math.abs(z - ZC) / s[1]);
      return s[0] * Math.sqrt(1 - c * c);
    }

    /* ---------------- anechoic tile skin (u = length, v = around) ---------------- */
    var cv = document.createElement("canvas"); cv.width = 1024; cv.height = 256;
    var g2 = cv.getContext("2d"), W = cv.width, H = cv.height;
    function HV(v) { return (1 - v) * H; }
    g2.fillStyle = "#23272b"; g2.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {                                    /* tonal patchwork */
      g2.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
      g2.fillRect(R() * W, R() * H, 24 + R() * 130, 10 + R() * 48);
    }
    g2.fillStyle = "#15181b";                                     /* non-skid casing band */
    g2.fillRect(0.06 * W, HV(0.302), 0.88 * W, HV(0.198) - HV(0.302));
    g2.strokeStyle = "rgba(0,0,0,0.36)"; g2.lineWidth = 1;        /* tile seams */
    for (i = 0; i <= W; i += 11) { g2.beginPath(); g2.moveTo(i, 0); g2.lineTo(i, H); g2.stroke(); }
    for (i = 0; i <= H; i += 10) { g2.beginPath(); g2.moveTo(0, i); g2.lineTo(W, i); g2.stroke(); }
    for (i = 0; i < 80; i++) {                                    /* replaced / lifted tiles */
      g2.fillStyle = R() < 0.4 ? "rgba(150,155,160,0.15)" : "rgba(0,0,0,0.2)";
      g2.fillRect(Math.floor(R() * 92) * 11 + 1, Math.floor(R() * 25) * 10 + 1, 10, 9);
    }
    g2.strokeStyle = "rgba(186,192,196,0.5)"; g2.lineWidth = 1.6; /* casing edge lines */
    g2.beginPath(); g2.moveTo(0.06 * W, HV(0.198)); g2.lineTo(0.94 * W, HV(0.198)); g2.stroke();
    g2.beginPath(); g2.moveTo(0.06 * W, HV(0.302)); g2.lineTo(0.94 * W, HV(0.302)); g2.stroke();
    var wl = [0.585, 0.905];                                      /* the two waterline crossings */
    for (i = 0; i < 2; i++) {
      var gr = g2.createLinearGradient(0, HV(wl[i] + 0.035), 0, HV(wl[i] - 0.035));
      gr.addColorStop(0, "rgba(70,78,58,0)"); gr.addColorStop(0.5, "rgba(74,82,60,0.5)");
      gr.addColorStop(1, "rgba(70,78,58,0)");
      g2.fillStyle = gr; g2.fillRect(0, HV(wl[i] + 0.035), W, HV(wl[i] - 0.035) - HV(wl[i] + 0.035));
    }
    g2.fillStyle = "rgba(10,12,14,0.45)";                         /* limber holes */
    for (i = 0; i < 46; i++) { g2.fillRect(90 + i * 18, HV(0.555), 7, 3); g2.fillRect(90 + i * 18, HV(0.94), 7, 3); }
    g2.fillStyle = "rgba(200,205,210,0.6)"; g2.font = "bold 13px sans-serif";
    for (i = 0; i < 6; i++) {                                     /* draft marks aft */
      g2.save(); g2.translate(0.09 * W, HV(0.62 + i * 0.028)); g2.scale(1, -1);
      g2.fillText("" + (i * 2 + 20), 0, 4); g2.restore();
    }
    var tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4;

    /* sail number decal */
    var dv = document.createElement("canvas"); dv.width = 256; dv.height = 128;
    var d2 = dv.getContext("2d");
    d2.fillStyle = "rgba(0,0,0,0)"; d2.fillRect(0, 0, 256, 128);
    d2.fillStyle = "#b9bfc4"; d2.font = "bold 86px sans-serif"; d2.textAlign = "center";
    d2.fillText("688", 128, 96);
    var dtex = new THREE.CanvasTexture(dv);

    var hullMat = new THREE.MeshStandardMaterial({ map: tex, metalness: 0.28, roughness: 0.72, side: THREE.DoubleSide });
    var sailMat = new THREE.MeshStandardMaterial({ color: 0x25292d, metalness: 0.3, roughness: 0.68 });
    var deckMat = new THREE.MeshStandardMaterial({ color: 0x181b1e, metalness: 0.2, roughness: 0.9 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x8d9297, metalness: 0.85, roughness: 0.3 });
    var teamMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.team), metalness: 0.3, roughness: 0.55 });
    var decalMat = new THREE.MeshStandardMaterial({ map: dtex, transparent: true, alphaTest: 0.45, metalness: 0.2, roughness: 0.8 });

    function bx(p, sx, sy, sz, x, y, z, mt) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mt); m.position.set(x, y, z); p.add(m); return m;
    }
    function tube(p, r1, r2, h, ax, x, y, z, mt, sg) {
      var g = new THREE.CylinderGeometry(r1, r2, h, sg || 8);
      if (ax === "z") g.rotateX(Math.PI / 2); else if (ax === "x") g.rotateZ(Math.PI / 2);
      var m = new THREE.Mesh(g, mt); m.position.set(x, y, z); p.add(m); return m;
    }
    function link(p, a, b, r, mt, sg) {
      var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, sg || 4), mt);
      m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
      p.add(m); return m;
    }
    function prism(p, pts, h, x, y, z, mt) {
      var s = new THREE.Shape(); s.moveTo(pts[0][0], pts[0][1]);
      for (var q = 1; q < pts.length; q++) s.lineTo(pts[q][0], pts[q][1]);
      s.closePath();
      var m = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: false }), mt);
      m.position.set(x, y, z); p.add(m); return m;
    }

    /* ---------------- pressure hull: long cigar, surfaced ---------------- */
    var lsec = [];
    for (i = 0; i < SEC.length; i++) lsec.push({ x: SEC[i][0], w: SEC[i][1], h: SEC[i][2], zc: ZC });
    G.add(new THREE.Mesh(M.loft(THREE, lsec, 24), hullMat));

    /* flank sonar array strakes + towed-array fairing */
    bx(G, 44, 0.5, 0.75, 8, 4.82, 3.3, deckMat);
    bx(G, 44, 0.5, 0.75, 8, -4.82, 3.3, deckMat);
    tube(G, 0.3, 0.3, 52, "x", -20, -4.45, 4.0, deckMat, 6);
    tube(G, 0.3, 0.24, 4, "x", 7, -4.45, 4.05, deckMat, 6);

    /* ---------------- sail, forward of midships ---------------- */
    var SX = 17.5, SZ = 7.0;                                       /* sail base at the casing */
    var sailPlan = [
      [-7.6, -1.55], [-5.5, -1.85], [3.0, -1.85], [5.6, -1.6], [7.2, -0.9],
      [7.6, 0], [7.2, 0.9], [5.6, 1.6], [3.0, 1.85], [-5.5, 1.85], [-7.6, 1.55]
    ];
    var fair = [];
    for (i = 0; i < sailPlan.length; i++) fair.push([sailPlan[i][0] * 1.28, sailPlan[i][1] * 1.5]);
    prism(G, fair, 1.0, SX, 0, SZ - 0.4, sailMat);                 /* base fillet */
    prism(G, sailPlan, 5.1, SX, 0, SZ + 0.4, sailMat);             /* main sail */
    var upper = [];
    for (i = 0; i < sailPlan.length; i++) upper.push([sailPlan[i][0] * 0.94, sailPlan[i][1] * 0.86]);
    prism(G, upper, 1.3, SX, 0, SZ + 5.5, sailMat);                /* tapered top */
    var cap = [];
    for (i = 0; i < sailPlan.length; i++) cap.push([sailPlan[i][0] * 0.9, sailPlan[i][1] * 0.72]);
    prism(G, cap, 0.35, SX, 0, SZ + 6.8, sailMat);
    var TOPZ = SZ + 7.15;                                          /* sail top */
    bx(G, 3.0, 3.4, 0.9, SX + 4.4, 0, TOPZ - 0.5, deckMat);        /* bridge cockpit well */
    bx(G, 0.35, 3.2, 1.5, SX + 5.9, 0, TOPZ - 0.1, sailMat);       /* windscreen */
    bx(G, 2.6, 3.85, 0.55, SX - 4.6, 0, SZ + 1.5, teamMat);        /* identification band */

    /* sail number decals, both faces */
    var dc1 = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.1), decalMat);
    dc1.rotation.x = Math.PI / 2; dc1.position.set(SX - 1.4, -1.93, SZ + 3.3); G.add(dc1);
    var dc2 = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.1), decalMat);
    dc2.rotation.set(Math.PI / 2, 0, Math.PI); dc2.position.set(SX - 1.4, 1.93, SZ + 3.3); G.add(dc2);

    /* dive planes ON the sail */
    for (i = 0; i < 2; i++) {
      var sgn = i ? -1 : 1;
      var pl = new THREE.Mesh(M.slab(THREE, [
        [SX - 2.4, sgn * 1.5], [SX + 2.0, sgn * 1.5], [SX + 1.5, sgn * 5.9], [SX - 1.5, sgn * 6.1]
      ], 0.4), sailMat);
      pl.position.z = SZ + 3.6; G.add(pl);
    }

    /* raised masts: periscopes, ESM, radar */
    tube(G, 0.13, 0.13, 3.4, "z", SX + 2.6, 0.45, TOPZ + 1.6, steelMat, 6);
    tube(G, 0.11, 0.11, 2.7, "z", SX + 1.2, -0.45, TOPZ + 1.25, steelMat, 6);
    tube(G, 0.2, 0.2, 4.0, "z", SX - 1.6, 0, TOPZ + 1.9, steelMat, 6);
    bx(G, 0.5, 0.5, 1.1, SX - 1.6, 0, TOPZ + 4.4, steelMat);       /* ESM head */
    tube(G, 0.16, 0.16, 3.0, "z", SX - 3.6, 0.5, TOPZ + 1.4, steelMat, 6);
    bx(G, 0.25, 1.5, 0.8, SX - 3.6, 0.5, TOPZ + 3.2, steelMat);    /* radar array */
    tube(G, 0.05, 0.05, 4.6, "z", SX - 5.4, -0.8, TOPZ + 2.2, steelMat, 5);
    bx(G, 0.06, 0.7, 0.45, SX - 5.15, -0.8, TOPZ + 4.2, teamMat);  /* ensign */

    /* ---------------- deck fittings, all sitting on the hull skin ---------------- */
    var cl = [[-30, 1.5], [-30, -1.5], [-12, 1.5], [-12, -1.5], [30, 1.4], [30, -1.4]];
    for (i = 0; i < cl.length; i++)
      bx(G, 1.1, 0.5, 0.3, cl[i][0], cl[i][1], surf(cl[i][0], cl[i][1]) + 0.1, steelMat);
    var ht = [-22, -6, 30];
    for (i = 0; i < ht.length; i++) tube(G, 0.62, 0.62, 0.16, "z", ht[i], 0, surf(ht[i], 0) - 0.02, steelMat, 10);
    tube(G, 0.55, 0.65, 0.7, "z", 37.5, 0, surf(37.5, 0) + 0.3, steelMat, 10);   /* capstan */
    bx(G, 1.6, 1.2, 0.15, 41.5, 0, surf(41.5, 0) - 0.03, steelMat);              /* anchor recess */

    /* twelve vertical-launch hatch caps in the bow casing */
    for (i = 0; i < 12; i++) {
      var vx = 36.5 + Math.floor(i / 2) * 1.9, vy = (i % 2 ? 1 : -1) * 1.05;
      tube(G, 0.42, 0.42, 0.14, "z", vx, vy, surf(vx, vy) - 0.02, steelMat, 10);
    }
    /* four flank torpedo tube shutters */
    for (i = 0; i < 4; i++) {
      var tx = 23 + (i % 2) * 2.8, tz = 3.4, sgn2 = i < 2 ? 1 : -1;
      var sh = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.2, 1.5), deckMat);
      sh.position.set(tx, sgn2 * (flank(tx, tz) - 0.06), tz); G.add(sh);
    }

    /* temporary safety track rigged on the casing (sells the scale) */
    var rail = [-32, -25.5, -19, -12.5, -6, 0.5, 28.5, 34, 39];
    var tops = [];
    for (i = 0; i < rail.length; i++) {
      var bz = surf(rail[i], 1.5);
      tube(G, 0.05, 0.05, 1.05, "z", rail[i], 1.5, bz + 0.5, steelMat, 5);
      tube(G, 0.05, 0.05, 1.05, "z", rail[i], -1.5, bz + 0.5, steelMat, 5);
      tops.push([rail[i], bz]);
    }
    for (i = 1; i < tops.length; i++) {
      if (tops[i][0] - tops[i - 1][0] > 12) continue;              /* skip the gap at the sail */
      link(G, [tops[i - 1][0], 1.5, tops[i - 1][1] + 1.0], [tops[i][0], 1.5, tops[i][1] + 1.0], 0.035, steelMat);
      link(G, [tops[i - 1][0], -1.5, tops[i - 1][1] + 1.0], [tops[i][0], -1.5, tops[i][1] + 1.0], 0.035, steelMat);
      link(G, [tops[i - 1][0], 1.5, tops[i - 1][1] + 0.55], [tops[i][0], 1.5, tops[i][1] + 0.55], 0.035, steelMat);
      link(G, [tops[i - 1][0], -1.5, tops[i - 1][1] + 0.55], [tops[i][0], -1.5, tops[i][1] + 0.55], 0.035, steelMat);
    }

    /* ---------------- cross-shaped stern control surfaces ---------------- */
    var ru = new THREE.Mesh(M.slab(THREE, [
      [-48.5, 5.0], [-44.0, 11.4], [-40.0, 11.4], [-33.5, 5.0]
    ], 0.55, "xz"), sailMat); ru.position.y = 0.28; G.add(ru);
    var rl = new THREE.Mesh(M.slab(THREE, [
      [-48.5, -0.2], [-44.0, -6.4], [-40.0, -6.4], [-33.5, -0.2]
    ], 0.55, "xz"), sailMat); rl.position.y = 0.28; G.add(rl);
    for (i = 0; i < 2; i++) {
      var s2 = i ? -1 : 1;
      var sp = new THREE.Mesh(M.slab(THREE, [
        [-48.5, s2 * 2.4], [-33.5, s2 * 2.4], [-37.0, s2 * 8.6], [-45.5, s2 * 8.6]
      ], 0.5), sailMat);
      sp.position.z = ZC; G.add(sp);
    }
    /* shaft cone and seven-bladed screw */
    tube(G, 0.55, 1.1, 2.6, "x", -53.4, 0, ZC, steelMat, 10);
    for (i = 0; i < 7; i++) {
      var hold = new THREE.Group();
      var bl = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.2, 0.85), steelMat);
      bl.position.set(-0.3, 1.8, 0); bl.rotation.x = 0.55;
      hold.add(bl); hold.position.set(-53.6, 0, ZC);
      hold.rotation.x = i * Math.PI * 2 / 7; G.add(hold);
    }

    return G;
  }
};

UNIT_MODELS["sub_p"] = {
  len: 74,
  build: function (THREE, M, C) {
    var G = new THREE.Group();
    var i, seed = 91;
    function R() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    /* ---------------- hull table: x, half-beam, half-depth ---------------- */
    var ZC = 2.0;
    var SEC = [
      [-37, 0.4, 0.4], [-34, 1.5, 1.5], [-30, 2.6, 2.6], [-25, 3.5, 3.55],
      [-18, 4.3, 4.35], [-10, 4.75, 4.8], [-2, 4.92, 4.95], [6, 4.95, 5.0],
      [14, 4.8, 4.9], [21, 4.4, 4.6], [27, 3.7, 4.05], [32, 2.7, 3.2],
      [35.5, 1.5, 2.1], [37, 0.45, 1.0]
    ];
    function sec(x) {
      if (x <= SEC[0][0]) return [SEC[0][1], SEC[0][2]];
      for (var q = 1; q < SEC.length; q++) {
        if (x <= SEC[q][0]) {
          var t = (x - SEC[q - 1][0]) / (SEC[q][0] - SEC[q - 1][0]);
          return [SEC[q - 1][1] + t * (SEC[q][1] - SEC[q - 1][1]),
            SEC[q - 1][2] + t * (SEC[q][2] - SEC[q - 1][2])];
        }
      }
      return [SEC[SEC.length - 1][1], SEC[SEC.length - 1][2]];
    }
    function surf(x, y) {
      var s = sec(x), c = Math.min(1, Math.abs(y) / s[0]);
      return ZC + s[1] * Math.sqrt(1 - c * c);
    }
    function flank(x, z) {
      var s = sec(x), c = Math.min(1, Math.abs(z - ZC) / s[1]);
      return s[0] * Math.sqrt(1 - c * c);
    }

    /* ---------------- rubber anechoic coating ---------------- */
    var cv = document.createElement("canvas"); cv.width = 1024; cv.height = 256;
    var g2 = cv.getContext("2d"), W = cv.width, H = cv.height;
    g2.fillStyle = "#1d2023"; g2.fillRect(0, 0, W, H);
    for (i = 0; i < 100; i++) {
      g2.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)";
      g2.fillRect(R() * W, R() * H, 26 + R() * 120, 12 + R() * 50);
    }
    g2.fillStyle = "#101315";                                       /* non-skid casing band */
    g2.fillRect(0.07 * W, (1 - 0.305) * H, 0.86 * W, 0.11 * H);
    g2.strokeStyle = "rgba(0,0,0,0.34)"; g2.lineWidth = 1;          /* rubber panel seams */
    for (i = 0; i <= W; i += 16) { g2.beginPath(); g2.moveTo(i, 0); g2.lineTo(i, H); g2.stroke(); }
    for (i = 0; i <= H; i += 13) { g2.beginPath(); g2.moveTo(0, i); g2.lineTo(W, i); g2.stroke(); }
    for (i = 0; i < 70; i++) {                                      /* lifted / replaced panels */
      g2.fillStyle = R() < 0.45 ? "rgba(140,145,150,0.14)" : "rgba(0,0,0,0.22)";
      g2.fillRect(Math.floor(R() * 63) * 16 + 1, Math.floor(R() * 19) * 13 + 1, 15, 12);
    }
    g2.strokeStyle = "rgba(180,186,190,0.45)"; g2.lineWidth = 1.6;  /* casing edge lines */
    g2.beginPath(); g2.moveTo(0.07 * W, (1 - 0.195) * H); g2.lineTo(0.93 * W, (1 - 0.195) * H); g2.stroke();
    g2.beginPath(); g2.moveTo(0.07 * W, (1 - 0.305) * H); g2.lineTo(0.93 * W, (1 - 0.305) * H); g2.stroke();
    var wl = [0.575, 0.915];                                        /* the two waterline crossings */
    function HV(v) { return (1 - v) * H; }
    for (i = 0; i < 2; i++) {
      var gr = g2.createLinearGradient(0, HV(wl[i] + 0.04), 0, HV(wl[i] - 0.04));
      gr.addColorStop(0, "rgba(84,74,50,0)"); gr.addColorStop(0.5, "rgba(90,80,52,0.55)");
      gr.addColorStop(1, "rgba(84,74,50,0)");
      g2.fillStyle = gr; g2.fillRect(0, HV(wl[i] + 0.04), W, HV(wl[i] - 0.04) - HV(wl[i] + 0.04));
    }
    g2.fillStyle = "rgba(8,10,12,0.5)";                             /* free-flood holes */
    for (i = 0; i < 40; i++) { g2.fillRect(120 + i * 20, HV(0.53), 9, 4); g2.fillRect(120 + i * 20, HV(0.955), 9, 4); }
    g2.fillStyle = "rgba(150,120,80,0.3)";                          /* rust runs below them */
    for (i = 0; i < 30; i++) { var rx = 120 + R() * 780; g2.fillRect(rx, HV(0.53), 3, 8 + R() * 26); }
    g2.fillStyle = "rgba(190,190,185,0.55)"; g2.font = "bold 14px sans-serif";
    for (i = 0; i < 6; i++) {                                       /* draft marks */
      g2.save(); g2.translate(0.9 * W, HV(0.63 + i * 0.03)); g2.scale(1, -1);
      g2.fillText("" + (i * 5 + 30), 0, 4); g2.restore();
    }
    var tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4;

    var hullMat = new THREE.MeshStandardMaterial({ map: tex, metalness: 0.24, roughness: 0.76, side: THREE.DoubleSide });
    var deckMat = new THREE.MeshStandardMaterial({ color: 0x141719, metalness: 0.2, roughness: 0.92 });
    var sailMat = new THREE.MeshStandardMaterial({ color: 0x202326, metalness: 0.28, roughness: 0.7 });
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x8a9095, metalness: 0.85, roughness: 0.3 });
    var teamMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.team), metalness: 0.3, roughness: 0.55 });

    function bx(p, sx, sy, sz, x, y, z, mt) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mt); m.position.set(x, y, z); p.add(m); return m;
    }
    function tube(p, r1, r2, h, ax, x, y, z, mt, sg) {
      var g = new THREE.CylinderGeometry(r1, r2, h, sg || 8);
      if (ax === "z") g.rotateX(Math.PI / 2); else if (ax === "x") g.rotateZ(Math.PI / 2);
      var m = new THREE.Mesh(g, mt); m.position.set(x, y, z); p.add(m); return m;
    }
    function prism(p, pts, h, x, y, z, mt) {
      var s = new THREE.Shape(); s.moveTo(pts[0][0], pts[0][1]);
      for (var q = 1; q < pts.length; q++) s.lineTo(pts[q][0], pts[q][1]);
      s.closePath();
      var m = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: false }), mt);
      m.position.set(x, y, z); p.add(m); return m;
    }
    function link(p, a, b, r, mt, sg) {
      var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, sg || 4), mt);
      m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
      p.add(m); return m;
    }
    /* aerofoil built about its own origin so it can be tilted */
    function fin(pts, th, x, y, z, rx, mt) {
      var m = new THREE.Mesh(M.slab(THREE, pts, th), mt);
      m.position.set(x, y, z); m.rotation.x = rx || 0; G.add(m); return m;
    }

    /* ---------------- fat teardrop hull ---------------- */
    var lsec = [];
    for (i = 0; i < SEC.length; i++) lsec.push({ x: SEC[i][0], w: SEC[i][1], h: SEC[i][2], zc: ZC });
    G.add(new THREE.Mesh(M.loft(THREE, lsec, 24), hullMat));

    /* flank array strake + hull chine strip */
    bx(G, 30, 0.45, 0.7, 2, 4.78, 3.1, deckMat);
    bx(G, 30, 0.45, 0.7, 2, -4.78, 3.1, deckMat);

    /* ---------------- tall slab sail, amidships ---------------- */
    var SX = 2.0, SZ = 7.0;
    var sailPlan = [
      [-6.8, -1.6], [-5.6, -1.9], [2.4, -1.9], [4.6, -1.7], [6.2, -1.0],
      [6.7, 0], [6.2, 1.0], [4.6, 1.7], [2.4, 1.9], [-5.6, 1.9], [-6.8, 1.6]
    ];
    var fair = [];
    for (i = 0; i < sailPlan.length; i++) fair.push([sailPlan[i][0] * 1.22, sailPlan[i][1] * 1.45]);
    prism(G, fair, 1.0, SX, 0, SZ - 0.4, sailMat);
    prism(G, sailPlan, 4.5, SX, 0, SZ + 0.1, sailMat);
    var up = [];
    for (i = 0; i < sailPlan.length; i++) up.push([sailPlan[i][0] * 0.96, sailPlan[i][1] * 0.88]);
    prism(G, up, 1.5, SX, 0, SZ + 4.6, sailMat);
    var TOPZ = SZ + 6.1;
    bx(G, 2.6, 3.2, 0.8, SX + 3.6, 0, TOPZ - 0.5, deckMat);        /* bridge well */
    bx(G, 0.32, 3.0, 1.4, SX + 4.9, 0, TOPZ - 0.1, sailMat);       /* windscreen */
    bx(G, 2.2, 3.9, 0.5, SX - 4.2, 0, SZ + 1.1, teamMat);          /* identification band */

    /* masts: search periscope, attack periscope, snorkel induction, ESM */
    tube(G, 0.15, 0.15, 3.6, "z", SX + 1.8, 0.5, TOPZ + 1.7, steelMat, 6);
    tube(G, 0.12, 0.12, 2.9, "z", SX + 0.5, -0.5, TOPZ + 1.35, steelMat, 6);
    tube(G, 0.42, 0.42, 3.2, "z", SX - 2.2, 0, TOPZ + 1.5, sailMat, 8);    /* snorkel induction */
    bx(G, 1.0, 1.0, 0.7, SX - 2.2, 0, TOPZ + 3.4, sailMat);
    tube(G, 0.18, 0.18, 3.4, "z", SX - 4.4, 0.6, TOPZ + 1.6, steelMat, 6);
    bx(G, 0.4, 1.3, 0.9, SX - 4.4, 0.6, TOPZ + 3.7, steelMat);             /* radar / ESM head */
    tube(G, 0.05, 0.05, 4.4, "z", SX - 6.0, -0.9, TOPZ + 2.2, steelMat, 5);
    bx(G, 0.06, 0.75, 0.5, SX - 5.76, -0.9, TOPZ + 4.1, teamMat);          /* ensign */

    /* ---------------- bow planes ON THE HULL ---------------- */
    for (i = 0; i < 2; i++) {
      var s2 = i ? -1 : 1;
      fin([[-2.2, 0], [2.2, 0], [1.6, s2 * 3.6], [-1.4, s2 * 3.8]], 0.42,
        20.5, s2 * 4.1, 3.6, s2 * -0.34, sailMat);
      bx(G, 3.4, 1.0, 1.0, 20.5, s2 * 4.2, 3.7, sailMat);           /* plane housing fairing */
    }

    /* ---------------- cruciform stern ---------------- */
    var ru = new THREE.Mesh(M.slab(THREE, [[-33.5, 4.6], [-30.0, 10.4], [-26.0, 10.4], [-21.0, 4.6]], 0.5, "xz"), sailMat);
    ru.position.y = 0.25; G.add(ru);
    var rl = new THREE.Mesh(M.slab(THREE, [[-33.5, -0.4], [-30.0, -6.0], [-26.0, -6.0], [-21.0, -0.4]], 0.5, "xz"), sailMat);
    rl.position.y = 0.25; G.add(rl);
    for (i = 0; i < 2; i++) {
      var s3 = i ? -1 : 1;
      var sp = new THREE.Mesh(M.slab(THREE, [
        [-33.5, s3 * 2.2], [-22.0, s3 * 2.2], [-25.0, s3 * 8.4], [-32.0, s3 * 8.4]
      ], 0.46), sailMat);
      sp.position.z = ZC; G.add(sp);
    }
    /* six-bladed screw on a tapered shaft cone */
    tube(G, 0.5, 1.0, 2.4, "x", -35.6, 0, ZC, steelMat, 10);
    for (i = 0; i < 6; i++) {
      var hold = new THREE.Group();
      var bl = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.0, 0.9), steelMat);
      bl.position.set(-0.3, 1.7, 0); bl.rotation.x = 0.6;
      hold.add(bl); hold.position.set(-35.9, 0, ZC);
      hold.rotation.x = i * Math.PI / 3; G.add(hold);
    }

    /* six bow torpedo tube shutters, three each side */
    for (i = 0; i < 6; i++) {
      var tz = ZC - 1.0 + (i % 3) * 1.0, sgn2 = i < 3 ? 1 : -1, tx = 30.5;
      var sh = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.22, 10), deckMat);
      sh.position.set(tx, sgn2 * (flank(tx, tz) - 0.05), tz); G.add(sh);
    }
    tube(G, 0.7, 0.7, 0.14, "z", -20, 0, surf(-20, 0) - 0.02, steelMat, 10);   /* rescue buoy */
    tube(G, 0.7, 0.7, 0.14, "z", 22, 0, surf(22, 0) - 0.02, steelMat, 10);

    /* ---------------- deck fittings, sitting on the hull skin ---------------- */
    var cl = [[-16, 1.4], [-16, -1.4], [-8, 1.4], [-8, -1.4], [18, 1.4], [18, -1.4]];
    for (i = 0; i < cl.length; i++)
      bx(G, 1.0, 0.5, 0.3, cl[i][0], cl[i][1], surf(cl[i][0], cl[i][1]) + 0.1, steelMat);
    var ht = [-14, 12, 26];
    for (i = 0; i < ht.length; i++) tube(G, 0.6, 0.6, 0.18, "z", ht[i], 0, surf(ht[i], 0) - 0.02, steelMat, 10);
    tube(G, 0.5, 0.6, 0.7, "z", 27.5, 0, surf(27.5, 0) + 0.3, steelMat, 10);   /* capstan */
    bx(G, 1.5, 1.1, 0.16, 30.5, 0, surf(30.5, 0) - 0.03, steelMat);
    /* rigged safety line fore and aft of the sail */
    var st = [-24, -18.5, -13, -7.5, 11, 16.5, 22, 27];
    var tops = [];
    for (i = 0; i < st.length; i++) {
      var bz = surf(st[i], 1.5);
      tube(G, 0.05, 0.05, 1.0, "z", st[i], 1.5, bz + 0.5, steelMat, 5);
      tube(G, 0.05, 0.05, 1.0, "z", st[i], -1.5, bz + 0.5, steelMat, 5);
      tops.push([st[i], bz]);
    }
    for (i = 1; i < tops.length; i++) {
      if (tops[i][0] - tops[i - 1][0] > 10) continue;
      link(G, [tops[i - 1][0], 1.5, tops[i - 1][1] + 0.95], [tops[i][0], 1.5, tops[i][1] + 0.95], 0.035, steelMat);
      link(G, [tops[i - 1][0], -1.5, tops[i - 1][1] + 0.95], [tops[i][0], -1.5, tops[i][1] + 0.95], 0.035, steelMat);
      link(G, [tops[i - 1][0], 1.5, tops[i - 1][1] + 0.5], [tops[i][0], 1.5, tops[i][1] + 0.5], 0.035, steelMat);
      link(G, [tops[i - 1][0], -1.5, tops[i - 1][1] + 0.5], [tops[i][0], -1.5, tops[i][1] + 0.5], 0.035, steelMat);
    }

    return G;
  }
};
