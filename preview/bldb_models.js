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
    /* taxiway: concrete with yellow centreline + holding position bars */
    var taxiTex = mkTex(256, 256, function (x, w, h) {
      var r = rng(67), q;
      x.fillStyle = "#565a53"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 18; q++) {
        x.globalAlpha = 0.05 + r() * 0.04; x.fillStyle = (q % 3) ? "#000000" : "#8f958a";
        x.fillRect(r() * w, r() * h, 22 + r() * 70, 18 + r() * 50);
      }
      x.globalAlpha = 0.5; x.strokeStyle = "#3a3d38"; x.lineWidth = 2;
      x.beginPath(); x.moveTo(0, 128); x.lineTo(w, 128); x.moveTo(128, 0); x.lineTo(128, h); x.stroke();
      x.globalAlpha = 1;
      x.fillStyle = "#c8a324"; x.fillRect(120, 0, 9, h);
      x.fillStyle = "#c8a324";
      for (q = 0; q < 2; q++) { x.fillRect(28, 34 + q * 12, 200, 6); }
      x.setLineDash([16, 14]); x.strokeStyle = "#c8a324"; x.lineWidth = 5;
      x.beginPath(); x.moveTo(28, 60); x.lineTo(228, 60); x.stroke(); x.setLineDash([]);
      grime(x, w, h, r, 8);
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
    var wall = new THREE.MeshStandardMaterial({ map: panelTex("#6a6f66", "#a7ada1", 71, 4), roughness: 0.86, metalness: 0.05, side: THREE.DoubleSide });
    var taxiMat = new THREE.MeshStandardMaterial({ map: taxiTex, roughness: 0.93, metalness: 0.0 });
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
    var taxi = new THREE.Mesh(new THREE.PlaneGeometry(11, 12), taxiMat);
    put(taxi, -3, 0.5, 0.31);
    var helo = new THREE.Mesh(new THREE.CircleGeometry(6, 26), pad);
    put(helo, 19, -20, 0.32);
    /* helipad perimeter lights */
    for (i = 0; i < 8; i++) {
      a = i / 8 * Math.PI * 2;
      put(cylZ(0.13, 0.13, 0.3, lampW, 6), 19 + Math.cos(a) * 6.6, -20 + Math.sin(a) * 6.6, 0.45);
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
      leaf.position.set(HX + HL / 2 + 1.9, HY + s * (HR - 0.42), 3.7);
      leaf.rotation.z = s * 0.09; g.add(leaf);
      var band = box(5.4, 0.12, 0.7, team);
      band.position.set(HX + HL / 2 + 1.9, HY + s * (HR - 0.59), 6.1);
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
    put(cylZ(0.62, 0.7, 0.55, metal, 10), TX + 2.6, TY - 2.4, 17.6);
    var radome = new THREE.Mesh(new THREE.SphereGeometry(0.75, 10, 8), white);
    put(radome, TX + 2.6, TY - 2.4, 18.5);
    /* flag pole + team flag beside the tower */
    put(cylZ(0.09, 0.07, 8.0, white, 6), TX + 5.2, TY + 5.2, 4.0);
    put(box(0.06, 2.0, 1.3, team), TX + 5.2, TY + 6.2, 7.3);

    /* ---------------- windsock ---------------- */
    var WX = 26, WY = 4;
    put(cylZ(0.13, 0.10, 7.0, white, 6), WX, WY, 3.5);
    for (i = 0; i < 3; i++) put(cylZ(0.14, 0.14, 0.8, orange, 6), WX, WY, 1.0 + i * 2.2);
    var ringGeo = new THREE.TorusGeometry(0.62, 0.06, 5, 10);
    ringGeo.rotateY(Math.PI / 2);
    put(new THREE.Mesh(ringGeo, metal), WX - 0.1, WY, 6.9);
    var sock = new THREE.Group(); sock.position.set(WX - 0.1, WY, 6.9);
    sock.rotation.z = 2.5; sock.rotation.y = 0.35; g.add(sock);
    var radii = [0.62, 0.53, 0.44, 0.35, 0.26];
    for (i = 0; i < 4; i++) {
      var seg = cylX(radii[i + 1], radii[i], 0.85, (i % 2) ? white : orange, 8, true);
      seg.position.set(0.44 + i * 0.85, 0, 0); sock.add(seg);
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
      put(tank, 24.5, -8.2 - i * 4.2, 2.2);
      put(box(0.35, 0.9, 1.2, conc), 22.0, -8.2 - i * 4.2, 0.6);
      put(box(0.35, 0.9, 1.2, conc), 27.0, -8.2 - i * 4.2, 0.6);
      put(box(1.2, 0.35, 0.35, team), 24.5, -8.2 - i * 4.2, 3.85);
      put(cylZ(0.1, 0.1, 1.6, metal, 6), 21.1, -8.2 - i * 4.2, 1.2);
    }
    put(box(10.5, 0.5, 0.7, conc), 24.5, -14.4, 0.55);
    put(box(0.5, 6.7, 0.7, conc), 19.4, -11.0, 0.55);
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
      var cx = -25 + i * 2.3, cy = 1.0 + rr() * 1.6;
      var cr = box(1.5 + rr() * 0.5, 1.2, 1.0 + rr() * 0.5, i % 3 ? dark : metal);
      cr.position.set(cx, cy, 0.6); cr.rotation.z = (rr() - 0.5) * 0.5; g.add(cr);
    }
    for (i = 0; i < 5; i++) put(cylZ(0.4, 0.4, 0.9, i % 2 ? dark : team, 10), 3.0 + (i % 3) * 1.0, -8.5 - Math.floor(i / 3) * 1.0, 0.75);
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
BLD_MODELS["radar"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var i, j, k, s, a;

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

    /* dish face: gore seams + concentric ring joints */
    var dishTex = mkTex(512, 128, function (x, w, h) {
      var r = rng(89), q;
      x.fillStyle = "#c6c9c1"; x.fillRect(0, 0, w, h);
      x.strokeStyle = "rgba(70,76,72,0.5)"; x.lineWidth = 2;
      for (q = 0; q <= 24; q++) { x.beginPath(); x.moveTo(q * w / 24, 0); x.lineTo(q * w / 24, h); x.stroke(); }
      x.lineWidth = 3;
      for (q = 1; q < 5; q++) { x.beginPath(); x.moveTo(0, q * h / 5); x.lineTo(w, q * h / 5); x.stroke(); }
      x.globalAlpha = 0.07; x.fillStyle = "#4b4f4a";
      for (q = 0; q < 22; q++) x.fillRect(r() * w, r() * h, 14 + r() * 46, 8 + r() * 26);
      x.globalAlpha = 0.09; x.fillStyle = "#2a2c28";
      for (q = 0; q < 8; q++) x.fillRect(r() * w, r() * h * 0.6, 3 + r() * 5, 12 + r() * 40);
      x.globalAlpha = 1;
    });

    var conc = new THREE.MeshStandardMaterial({ map: padTex, roughness: 0.95, metalness: 0.02 });
    var wall = new THREE.MeshStandardMaterial({ map: panelTex("#6b7065", "#a3a99b", 61, 4, 12), roughness: 0.85, metalness: 0.08, side: THREE.DoubleSide });
    var steel = new THREE.MeshStandardMaterial({ color: 0x8b9094, roughness: 0.42, metalness: 0.82 });
    var metal = new THREE.MeshStandardMaterial({ color: 0x72787a, roughness: 0.55, metalness: 0.38 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x2b2e2d, roughness: 0.6, metalness: 0.3 });
    var domeMat = new THREE.MeshStandardMaterial({ map: domeTex, roughness: 0.55, metalness: 0.1, flatShading: true });
    var dishMat = new THREE.MeshStandardMaterial({ map: dishTex, roughness: 0.5, metalness: 0.25, side: THREE.DoubleSide });
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
    for (s = -1; s <= 1; s += 2) put(cylZ(0.12, 0.12, 2.6, metal, 6), 17.5, s * 2.2, 1.3);
    put(box(0.1, 4.2, 0.16, metal), 17.5, 0, 2.5);
    put(box(0.14, 2.2, 0.85, team), 17.5, 0, 1.5);
    for (i = 0; i < 5; i++) put(cylZ(0.05, 0.05, 1.5, metal, 4, true), 17.44, -1.9 + i * 0.95, 1.15);

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
    put(box(4.9, 0.14, 0.3, team), TX, TY - 2.42, 16.05);
    for (j = 0; j < 4; j++) {
      put(cylZ(0.05, 0.05, 1.05, metal, 5, true),
        TX + Math.cos(j / 4 * Math.PI * 2 + Math.PI / 4) * 2.3,
        TY + Math.sin(j / 4 * Math.PI * 2 + Math.PI / 4) * 2.3, 16.6);
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
      var rr3 = R * 0.92, xs = 0.15 + rr3 * rr3 / (4 * F) - 0.14;
      strut([-0.75, 0, 0], [xs, Math.cos(a) * rr3, Math.sin(a) * rr3], 0.075, metal, dishGrp);
    }
    var hoopGeo = new THREE.TorusGeometry(R * 0.55, 0.06, 4, 18);
    hoopGeo.rotateY(Math.PI / 2);
    var hoop2 = new THREE.Mesh(hoopGeo, metal);
    hoop2.position.set(0.15 + (R * 0.55) * (R * 0.55) / (4 * F) - 0.13, 0, 0); dishGrp.add(hoop2);
    /* feed horn on a tripod at the focus */
    for (i = 0; i < 3; i++) {
      a = i / 3 * Math.PI * 2 + 0.5;
      strut([0.2 + R * R / (4 * F), Math.cos(a) * R * 0.94, Math.sin(a) * R * 0.94], [F + 0.15, 0, 0], 0.07, metal, dishGrp);
    }
    var horn = cylX(0.42, 0.2, 0.95, dark, 10); horn.position.set(F - 0.25, 0, 0); dishGrp.add(horn);
    var hornBack = cylX(0.24, 0.24, 0.7, metal, 8); hornBack.position.set(F + 0.5, 0, 0); dishGrp.add(hornBack);
    /* team identification panel + counterweight on the back */
    var cw = box(0.7, 1.8, 0.7, dark); cw.position.set(-1.2, 0, -1.5); dishGrp.add(cw);
    var tp = box(0.16, 1.5, 0.5, team); tp.position.set(-1.5, 0, -1.5); dishGrp.add(tp);
    var lamp = cylZ(0.13, 0.13, 0.26, lampR, 8); lamp.position.set(0.15 + R * R / (4 * F), 0, R + 0.3); dishGrp.add(lamp);

    /* ---------------- geodesic radome ---------------- */
    var RX = -13.5, RY = 8.0;
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
    put(box(0.9, 6.4, 0.2, metal), RX + 1.6, RY - 6.6, 0.3);
    put(box(7.0, 0.9, 0.2, metal), RX + 5.4, RY - 9.6, 0.3);

    /* ---------------- clutter: spares crates, dish transport frame, signs ---------------- */
    var r3 = rng(17);
    for (i = 0; i < 4; i++) {
      var cb = box(1.8 + r3() * 0.4, 1.2, 1.0, i % 2 ? dark : metal);
      cb.position.set(12.5 + (i % 2) * 2.2, -12 + Math.floor(i / 2) * 1.6, 0.75);
      cb.rotation.z = (r3() - 0.5) * 0.3; g.add(cb);
    }
    /* cable drum on a pallet */
    put(box(3.0, 2.6, 0.22, dark), 13.5, -5.5, 0.36);
    var drum = new THREE.Group(); drum.position.set(13.5, -5.5, 1.55); g.add(drum);
    for (s = -1; s <= 1; s += 2) {
      var flange = cylX(1.2, 1.2, 0.16, metal, 16); flange.position.set(0, s * 0.85, 0); drum.add(flange);
    }
    var hubD = cylX(0.72, 0.72, 1.55, dark, 14); drum.add(hubD);
    for (i = 0; i < 4; i++) {
      var wrapC = cylX(0.86 + i * 0.05, 0.86 + i * 0.05, 1.5, dark, 12, true);
      drum.add(wrapC);
    }
    for (i = 0; i < 2; i++) {
      put(cylZ(0.06, 0.06, 1.7, metal, 5, true), -15.5 + i * 3.2, 15.6, 0.85);
      var sg = box(1.0, 0.08, 0.62, i ? team : dark);
      sg.position.set(-15.5 + i * 3.2, 15.58, 1.75); sg.rotation.z = i ? -0.25 : 0.2; g.add(sg);
    }
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
      x.fillStyle = "#16262e"; x.fillRect(0, 0, w, h);
      for (q = 0; q < 32; q++) {
        x.fillStyle = (r() > 0.82) ? "rgba(246,224,160,0.4)" : "rgba(96,140,158,0.22)";
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
    var winMat = new THREE.MeshStandardMaterial({ map: winTex, color: 0x8fa2ab, roughness: 0.16, metalness: 0.3, emissive: 0xf6c98a, emissiveIntensity: 0.1 });
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
    for (i = 0; i <= 5; i++) { var rr = 1.5 * i / 5; prof.push(new THREE.Vector2(rr, rr * rr / 5.2)); }
    var sdGeo = new THREE.LatheGeometry(prof, 16); sdGeo.rotateZ(-Math.PI / 2);
    var sd = new THREE.Mesh(sdGeo, new THREE.MeshStandardMaterial({ map: domeTex, roughness: 0.45, metalness: 0.2, side: THREE.DoubleSide }));
    sd.rotation.y = -0.85; sd.rotation.z = 2.3; put(sd, PX, PY, 3.4);
    put(cylZ(0.09, 0.09, 0.55, dark, 6), PX - 0.35, PY + 0.45, 4.15);
    put(box(0.5, 0.5, 0.6, metal), PX, PY, 3.1);
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
BLD_MODELS["depot"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var root = new THREE.Group();
    root.rotation.z = Math.PI;                   /* the open frontage faces the default camera */
    g.add(root);
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
    function put(m, x, y, z) { m.position.set(x, y, z); root.add(m); return m; }
    var upZ = new THREE.Vector3(0, 0, 1);
    function strut(p, q, rad, mat, parent, seg) {
      var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var geo = new THREE.CylinderGeometry(rad, rad, L, seg || 5, 1, true); geo.rotateX(Math.PI / 2);
      var m = new THREE.Mesh(geo, mat);
      m.position.set((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
      m.quaternion.setFromUnitVectors(upZ, new THREE.Vector3(dx / L, dy / L, dz / L));
      (parent || root).add(m); return m;
    }

    /* ---------------- yard + workshop slab ---------------- */
    put(box(60, 40, 0.22, yard), 0, 0, 0.11);
    put(box(34, 25, 0.3, floorMat), -11, 1.0, 0.28);
    put(box(24, 18, 0.28, floorMat), 15, -1.0, 0.27);
    put(box(58, 0.5, 0.5, wallMat), 0, -11.4, 0.3);
    for (i = 0; i < 13; i++) put(box(1.2, 0.55, 0.06, hazard), -26 + i * 4.4, -11.4, 0.57);

    /* ---------------- open-sided service bay: columns, trusses, roof ---------------- */
    var CX = [-24, -16, -8, 0], EY = 9.6, CH = 7.2, RIDGE = 8.9, RL = 32;
    var RCX = -12;
    for (i = 0; i < CX.length; i++) {
      for (s = -1; s <= 1; s += 2) {
        var cx = CX[i], cy = s * 8.8;
        put(box(1.3, 1.3, 0.45, wallMat), cx, cy, 0.5);
        put(box(0.24, 0.66, CH, steel), cx, cy, 0.6 + CH / 2);
        for (j = -1; j <= 1; j += 2) put(box(0.54, 0.11, CH, steel), cx + j * 0.17, cy, 0.6 + CH / 2);
        put(box(0.75, 0.95, 0.12, steel), cx, cy, 0.72);
      }
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
      var rp = box(RL, 10.4, 0.26, roofMat);
      rp.position.set(RCX, s * 5.0, (RIDGE + 7.55) / 2);
      rp.rotation.x = -s * Math.atan2(RIDGE - 7.55, 9.6);
      root.add(rp);
      put(box(RL + 0.4, 0.45, 0.55, wallMat), RCX, s * EY, 7.45);
      put(box(RL + 0.4, 0.28, 0.3, team), RCX, s * (EY + 0.24), 7.72);
      put(cylX(0.16, 0.16, RL + 0.4, metal, 6, true), RCX, s * (EY + 0.3), 7.2);
    }
    put(box(RL + 0.6, 1.6, 0.5, roofMat), RCX, 0, RIDGE + 0.35);
    for (i = 0; i < 15; i++) put(box(0.8, 0.14, 0.3, dark), RCX - 14.7 + i * 2.1, 0.85, RIDGE + 0.2);
    for (i = 0; i < 5; i++) {
      for (s = -1; s <= 1; s += 2) put(cylX(0.09, 0.09, RL, metal, 5, true), RCX, s * (1.9 + i * 1.9), RIDGE - (i + 0.5) * 0.29);
    }
    /* gable-end wall panel at the closed end */
    put(box(0.3, 18.4, 5.0, sheet), -27.4, 0, 3.1);
    put(box(0.34, 6.0, 1.0, team), -27.5, 0, 6.4);
    /* pendant work lights */
    for (i = 0; i < 3; i++) {
      var lx = -23 + i * 8.0;
      for (j = 0; j < 2; j++) {
        var ly = j ? 5.0 : -4.5;
        put(cylZ(0.03, 0.03, 1.2, dark, 4, true), lx, ly, 6.6);
        put(cylZ(0.55, 0.42, 0.35, metal, 10), lx, ly, 5.9);
        put(cylZ(0.4, 0.4, 0.1, glow, 10), lx, ly, 5.72);
      }
    }
    /* rear wall running the full length, with tool board and shelving */
    put(box(54, 0.3, 4.4, sheet), -1, 9.4, 2.5);
    put(box(54.2, 0.4, 0.3, metal), -1, 9.4, 4.85);
    for (i = 0; i < 7; i++) put(box(0.3, 0.5, 4.6, metal), -26 + i * 9.0, 9.55, 2.4);
    put(box(10, 0.16, 2.2, dark), 6.5, 9.15, 3.1);                   /* pegboard */
    var rr = rng(31);
    for (i = 0; i < 20; i++) {
      var tw = 0.12 + rr() * 0.2, th = 0.3 + rr() * 0.6;
      put(box(tw, 0.1, th, metal), 2.2 + i * 0.46, 9.05, 3.4 - th / 2);
    }
    for (i = 0; i < 3; i++) {                                        /* parts shelving */
      put(box(9, 1.3, 0.12, metal), 18, 8.5, 1.2 + i * 1.2);
      for (j = 0; j < 5; j++) put(box(1.2, 0.9, 0.7, j % 2 ? dark : wallMat), 14.5 + j * 1.8, 8.5, 1.62 + i * 1.2);
    }
    for (s = -1; s <= 1; s += 2) put(box(0.14, 1.4, 3.7, metal), 18 + s * 4.4, 8.5, 1.9);
    put(box(9.4, 1.6, 0.16, metal), 18, 8.5, 4.5);

    /* ---------------- inspection pit on its drive-on platform ---------------- */
    var PX = 11.5, PY = -3.0, PW = 13, PD = 7.0, PH = 0.9, SLOT = 1.7, SL = 9.0;
    for (s = -1; s <= 1; s += 2) {
      put(box(PW, (PD - SLOT) / 2, PH, wallMat), PX, PY + s * (SLOT + (PD - SLOT) / 2) / 2, PH / 2);
    }
    put(box((PW - SL) / 2, SLOT, PH, wallMat), PX - (SL + (PW - SL) / 2) / 2, PY, PH / 2);
    put(box((PW - SL) / 2, SLOT, PH, wallMat), PX + (SL + (PW - SL) / 2) / 2, PY, PH / 2);
    put(box(SL, SLOT, 0.12, dark), PX, PY, 0.07);
    for (s = -1; s <= 1; s += 2) {
      put(box(SL, 0.14, PH, dark), PX, PY + s * SLOT / 2, PH / 2);
      put(box(SL + 0.2, 0.34, 0.07, hazard), PX, PY + s * (SLOT / 2 + 0.17), PH + 0.03);
      for (i = 0; i < 10; i++) put(box(0.42, 0.36, 0.075, dark), PX - 4.3 + i * 0.95, PY + s * (SLOT / 2 + 0.17), PH + 0.035);
    }
    for (i = 0; i < 2; i++) {
      var rmp = box(3.4, PD, 0.24, wallMat);
      rmp.position.set(PX + (i ? 1 : -1) * (PW / 2 + 1.55), PY, PH / 2);
      rmp.rotation.y = (i ? 1 : -1) * Math.atan2(PH, 3.4);
      root.add(rmp);
    }
    for (i = 0; i < 5; i++) put(cylX(0.03, 0.03, 0.6, metal, 4), PX + 4.0, PY - 0.2, 0.18 + i * 0.16);
    put(cylZ(0.2, 0.2, 0.3, glow, 8), PX - 3.4, PY, 0.32);
    put(box(1.1, 0.8, 0.7, metal), PX + 6.9, PY + 2.4, 1.2);
    put(box(1.14, 0.2, 0.22, team), PX + 6.9, PY + 2.0, 1.45);

    /* ---------------- overhead hoist: runway beam out over the pit ---------------- */
    var BY2 = -3.0, BZ = 6.35, BX0 = -26, BX1 = 17.5;
    put(box(BX1 - BX0, 0.2, 0.66, steel), (BX0 + BX1) / 2, BY2, BZ);
    for (j = -1; j <= 1; j += 2) put(box(BX1 - BX0, 0.56, 0.11, steel), (BX0 + BX1) / 2, BY2, BZ + j * 0.38);
    for (i = 0; i < CX.length; i++) strut([CX[i], -8.8, 0.6 + CH], [CX[i], BY2, BZ + 0.55], 0.07, steel, null, 4);
    put(box(0.6, 0.6, 0.16, steel), 16.6, BY2, BZ + 0.62);
    for (s = -1; s <= 1; s += 2) {                                   /* portal gantry outside the shed */
      put(box(1.4, 1.4, 0.5, wallMat), 16.6, BY2 + s * 3.4, 0.5);
      put(box(0.4, 0.4, 6.6, steel), 16.6, BY2 + s * 3.4, 0.65 + 3.3);
      strut([16.6, BY2 + s * 3.4, 5.9], [16.6, BY2 + s * 0.7, BZ + 0.7], 0.08, steel, null, 4);
    }
    put(box(0.5, 7.6, 0.5, steel), 16.6, BY2, BZ + 0.95);
    var trolley = new THREE.Group(); trolley.position.set(10.5, BY2, BZ); root.add(trolley);
    var tb = box(1.3, 1.5, 0.5, metal); tb.position.set(0, 0, -0.6); trolley.add(tb);
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2) {
      var wh = cylY(0.18, 0.18, 0.14, dark, 10);
      wh.position.set(i * 0.45, j * 0.36, 0.38); trolley.add(wh);
    }
    var hoistBody = box(1.0, 0.9, 0.8, metal); hoistBody.position.set(0.1, 0, -1.15); trolley.add(hoistBody);
    var teamB = box(1.02, 0.12, 0.3, team); teamB.position.set(0.1, -0.47, -1.15); trolley.add(teamB);
    var chain = cylZ(0.045, 0.045, 3.0, dark, 5, true); chain.position.set(0.35, 0, -3.1); trolley.add(chain);
    var blockH = box(0.42, 0.42, 0.55, dark); blockH.position.set(0.35, 0, -4.8); trolley.add(blockH);
    var hookGeo = new THREE.TorusGeometry(0.22, 0.06, 5, 10, Math.PI * 1.5);
    hookGeo.rotateX(Math.PI / 2);
    var hook = new THREE.Mesh(hookGeo, steel); hook.position.set(0.35, 0, -5.25); trolley.add(hook);
    put(cylZ(0.02, 0.02, 2.6, dark, 4, true), 11.6, BY2 - 0.45, 4.0);
    put(box(0.16, 0.12, 0.5, dark), 11.6, BY2 - 0.45, 2.6);

    /* ---------------- workshop clutter ---------------- */
    for (i = 0; i < 2; i++) {                                        /* tyre stacks */
      for (j = 0; j < 4; j++) {
        var ty = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.26, 6, 14), rubber);
        ty.rotation.z = j * 0.4;
        put(ty, 4.5 + i * 2.0, 5.6 - i * 0.5, 0.6 + j * 0.5);
      }
      put(cylZ(0.5, 0.5, 0.2, metal, 12), 4.5 + i * 2.0, 5.6 - i * 0.5, 2.65);
    }
    var dr = rng(53);
    for (i = 0; i < 6; i++) {                                        /* oil drums */
      var dx2 = 24.0 + (i % 3) * 1.05, dy2 = 3.0 - Math.floor(i / 3) * 1.05;
      put(cylZ(0.44, 0.44, 1.0, i % 3 === 0 ? team : dark, 12), dx2, dy2, 0.72);
      put(cylZ(0.46, 0.46, 0.07, metal, 12), dx2, dy2, 1.0);
      put(cylZ(0.46, 0.46, 0.07, metal, 12), dx2, dy2, 0.46);
    }
    put(box(2.6, 1.5, 0.3, metal), 24.5, 0.4, 0.75);                 /* drum rack */
    for (i = 0; i < 2; i++) {
      put(cylX(0.44, 0.44, 1.9, dark, 12), 24.5, 0.1 + i * 0.95, 1.25);
      put(cylZ(0.06, 0.06, 0.4, metal, 5), 23.5, 0.1 + i * 0.95, 0.95);
    }
    for (s = -1; s <= 1; s += 2) put(box(0.16, 1.7, 1.1, metal), 24.5 + s * 1.2, 0.4, 0.75);
    /* workbench, vice, tool chest just outside the bay */
    put(box(5.0, 1.1, 0.16, metal), -2.5, 7.6, 1.05);
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2)
      put(box(0.12, 0.12, 1.0, metal), -2.5 + i * 2.3, 7.6 + j * 0.45, 0.5);
    put(box(0.4, 0.4, 0.32, steel), -0.8, 7.6, 1.28);
    put(box(1.4, 0.9, 1.1, team), 1.6, 7.8, 0.86);
    for (i = 0; i < 3; i++) put(box(1.3, 0.06, 0.07, metal), 1.6, 7.34, 0.55 + i * 0.32);
    /* welding bottles, compressor, jack stands */
    for (i = 0; i < 2; i++) {
      put(cylZ(0.24, 0.24, 1.5, i ? dark : team, 10), 9.4 + i * 0.6, 7.9, 1.06);
      put(cylZ(0.1, 0.1, 0.22, metal, 8), 9.4 + i * 0.6, 7.9, 1.9);
    }
    put(box(0.9, 0.8, 0.12, metal), 9.7, 7.9, 0.37);
    put(box(2.0, 1.1, 0.9, metal), 12.6, 7.9, 0.76);
    put(cylX(0.42, 0.42, 1.8, dark, 12), 12.6, 7.9, 1.46);
    for (i = 0; i < 3; i++) {
      put(cylZ(0.05, 0.05, 0.75, metal, 5), 20.5 + i * 0.9, -8.5, 0.64);
      put(cylZ(0.42, 0.12, 0.28, metal, 6), 20.5 + i * 0.9, -8.5, 0.4);
    }
    /* engine hoist in the yard */
    put(box(2.4, 0.3, 0.22, metal), 25.0, -6.6, 0.4);
    put(box(2.4, 0.3, 0.22, metal), 25.0, -4.4, 0.4);
    put(box(0.3, 2.4, 2.6, metal), 24.0, -5.5, 1.65);
    strut([24.0, -5.5, 2.9], [27.1, -5.5, 2.4], 0.13, metal, null, 6);
    put(cylZ(0.03, 0.03, 1.0, dark, 4, true), 26.9, -5.5, 1.85);
    put(box(0.3, 0.3, 0.3, dark), 26.9, -5.5, 1.3);
    /* pallets and crates */
    var pr = rng(67);
    for (i = 0; i < 5; i++) {
      var px2 = -27 + i * 2.6, py2 = 14.5 + pr() * 2.0;
      put(box(1.5, 1.2, 0.16, dark), px2, py2, 0.3);
      var cr = box(1.3 + pr() * 0.3, 1.0, 0.9 + pr() * 0.4, i % 2 ? wallMat : metal);
      cr.position.set(px2, py2, 0.85); cr.rotation.z = (pr() - 0.5) * 0.3; root.add(cr);
    }
    for (i = 0; i < 3; i++) {
      var cr2 = box(1.6, 1.3, 1.1, i % 2 ? dark : metal);
      cr2.position.set(-6 + i * 2.4, 13.6 + pr() * 1.4, 0.85); cr2.rotation.z = (pr() - 0.5) * 0.4; root.add(cr2);
    }
    /* work under the roof: engine on a stand, tool trolley, parts bins, pallet stack */
    put(box(1.5, 1.5, 0.16, metal), -20.5, 2.6, 0.5);
    put(cylZ(0.1, 0.1, 1.1, metal, 6), -20.5, 2.6, 1.05);
    put(box(1.5, 1.1, 1.0, dark), -20.5, 2.6, 2.05);
    put(cylX(0.42, 0.42, 1.2, metal, 10), -20.5, 2.6, 2.6);
    for (i = 0; i < 4; i++) put(cylZ(0.11, 0.11, 0.5, metal, 6), -21.0 + i * 0.35, 2.1, 2.85);
    put(box(1.3, 0.8, 0.08, metal), -13.5, -6.0, 0.95);
    put(box(1.3, 0.8, 0.08, metal), -13.5, -6.0, 0.5);
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2)
      put(cylZ(0.05, 0.05, 0.95, metal, 5), -13.5 + i * 0.55, -6.0 + j * 0.32, 0.5);
    for (i = 0; i < 4; i++) put(box(0.3, 0.2, 0.12, i % 2 ? dark : team), -14.0 + i * 0.34, -6.0, 1.05);
    for (i = 0; i < 3; i++) {
      put(box(2.6, 1.0, 0.1, metal), -22.5, -6.4, 0.7 + i * 0.85);
      for (j = 0; j < 3; j++) put(box(0.7, 0.75, 0.55, j % 2 ? dark : wallMat), -23.4 + j * 0.9, -6.4, 1.03 + i * 0.85);
    }
    for (s = -1; s <= 1; s += 2) put(box(0.12, 1.1, 2.7, metal), -22.5 + s * 1.35, -6.4, 1.35);
    for (i = 0; i < 3; i++) put(box(1.6, 1.2, 0.16, dark), -5.5, 5.4, 0.42 + i * 0.34);
    put(box(1.5, 1.1, 0.9, wallMat), -5.5, 5.4, 1.4);
    /* hose reels on the columns */
    for (i = 0; i < 2; i++) {
      var hx = CX[1 + i * 2];
      put(cylX(0.55, 0.55, 0.4, metal, 12), hx + 0.5, -8.8, 3.4);
      put(cylX(0.2, 0.2, 0.5, dark, 8), hx + 0.5, -8.8, 3.4);
    }
    /* floodlights + team banner on the gable */
    for (i = 0; i < 2; i++) {
      put(cylZ(0.14, 0.14, 7.5, metal, 8), 27.5, -14.0 + i * 22.0, 3.75);
      put(box(0.6, 0.8, 0.45, dark), 27.0, -14.0 + i * 22.0, 7.6);
      put(box(0.12, 0.7, 0.38, glow), 26.65, -14.0 + i * 22.0, 7.6);
    }
    put(box(0.12, 4.2, 2.8, team), -27.6, -5.0, 4.4);
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
      strut([PX - 6.0, PY + s * 1.35, 3.5], [PX - 5.2, PY + s * 0.75, postTop + 0.05], 0.11, paint, null, 5);
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
    put(cylX(1.15, 1.15, 5.4, metal, 14), 3.6, -1.8, 1.8);
    for (s = -1; s <= 1; s += 2) put(box(0.5, 1.8, 1.2, paint), 3.6 + s * 1.9, -1.8, 0.6);
    put(cylZ(0.24, 0.24, 1.1, metal, 8), 5.6, -1.8, 3.2);
    put(box(1.2, 0.2, 0.5, team), 3.6, -2.95, 2.5);
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
    put(box(6.0, 3.2, 2.2, paint), -16.6, 3.0, 1.2);
    put(box(6.2, 3.4, 0.14, metal), -16.6, 3.0, 2.35);
    railing(-16.6, 3.0, 2.0, 2.4, 0.9, 8, metal);
    put(box(3.0, 2.0, 1.4, metal), -16.6, 7.5, 0.8);
    put(cylX(0.5, 0.5, 1.6, dark, 10), -15.0, 7.5, 1.4);
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
BLD_MODELS["silo"] = {
  build: function (THREE, M, C) {
    var g = new THREE.Group();
    var root = new THREE.Group();
    root.rotation.z = Math.PI;                   /* the ladder and manifold face the default camera */
    g.add(root);
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
        x.save(); x.translate(gx + 34, h * 0.5);
        x.fillStyle = "#2c2f2b"; x.font = "bold 34px monospace"; x.textAlign = "center";
        x.fillText("100", 0, -h * 0.30);
        x.fillText("50", 0, 12);
        x.fillText("0", 0, h * 0.34);
        x.restore();
        /* big painted tank number on the opposite face */
        x.save(); x.translate(w * 0.72, h * 0.42);
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
    function put(m, x, y, z) { m.position.set(x, y, z); root.add(m); return m; }
    var upZ = new THREE.Vector3(0, 0, 1);
    function strut(p, q, rad, mat, parent, seg) {
      var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var geo = new THREE.CylinderGeometry(rad, rad, L, seg || 5, 1, true); geo.rotateX(Math.PI / 2);
      var m = new THREE.Mesh(geo, mat);
      m.position.set((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
      m.quaternion.setFromUnitVectors(upZ, new THREE.Vector3(dx / L, dy / L, dz / L));
      (parent || root).add(m); return m;
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
      shell.rotation.z = -Math.PI / 2 + 0.62;                                 /* swing the painted gauge clear of the ladder */
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
      /* float gauge board and its pointer, alongside the painted scale */
      var ga = 0.62, gxx = tx + Math.sin(ga) * (TR + 0.06), gyy = ty - Math.cos(ga) * (TR + 0.06);
      var gb = box(0.6, 0.12, 13.0, metal); gb.position.set(gxx, gyy, 8.0); gb.rotation.z = ga; root.add(gb);
      var gp = box(0.75, 0.16, 0.3, team); gp.position.set(gxx + Math.sin(ga) * 0.08, gyy - Math.cos(ga) * 0.08, 9.6);
      gp.rotation.z = ga; root.add(gp);
      var gt = box(0.5, 0.16, 0.5, dark); gt.position.set(gxx, gyy, 14.7); gt.rotation.z = ga; root.add(gt);
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
      put(cylY(0.26, 0.26, 4.6, metal, 10), tx2 + 1.9, -4.3, MZ);      /* branch to each tank */
      put(cylZ(0.28, 0.28, 0.55, metal, 10), tx2 + 1.9, -6.6, MZ);     /* tee on the header */
      put(cylZ(0.24, 0.24, 2.3, metal, 10), tx2 + 1.9, -3.5, MZ - 1.2); /* riser to the tank nozzle */
      put(cylY(0.24, 0.24, 1.0, metal, 10), tx2 + 1.9, -TR - 1.0, 1.4);
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
      cr.position.set(-15.5 + i * 1.9, 8.0 + r6() * 1.6, 0.9); cr.rotation.z = (r6() - 0.5) * 0.4; root.add(cr);
    }
    put(box(6.0, 3.0, 0.3, conc), 15.0, 8.0, 0.4);                     /* spill tray + spare valves */
    for (i = 0; i < 3; i++) put(cylX(0.3, 0.3, 1.8, metal, 10), 15.0, 7.0 + i * 1.0, 0.85);
    return g;
  }
};
