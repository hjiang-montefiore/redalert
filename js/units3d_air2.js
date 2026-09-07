/* ============ units3d_air2.js — AEW, electronic warfare, carrier wings, ASW ============
   Three parametric builders (large aircraft, fighter, helicopter) parameterised
   into the specific airframes. Proportions follow the real aircraft: an E-3 is a
   707 with a rotodome, an E-2 is a high-wing turboprop with four tail fins, a
   Ka-27 has coaxial rotors and no tail rotor at all.                          */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  function mat(THREE, c, r, m) {
    return new THREE.MeshStandardMaterial({ color: c, roughness: r === undefined ? 0.62 : r,
                                            metalness: m === undefined ? 0.35 : m });
  }
  /* a tapered lifting surface: root chord, tip chord, span, sweep, dihedral */
  function wing(THREE, M2, rootC, tipC, span, sweep, thick, dih) {
    var g = new THREE.Group();
    var N = 5;
    for (var i = 0; i < N; i++) {
      var t0 = i / N, t1 = (i + 1) / N;
      var c0 = rootC + (tipC - rootC) * t0, c1 = rootC + (tipC - rootC) * t1;
      var seg = new THREE.Mesh(
        new THREE.BoxGeometry((c0 + c1) / 2, thick * (1 - t0 * 0.55), span / N * 0.5), M2);
      seg.position.set(-sweep * (t0 + t1) / 2, 0, (t0 + t1) / 2 * span * 0.5);
      seg.position.y = (dih || 0) * (t0 + t1) / 2 * span * 0.5;
      g.add(seg);
      var seg2 = seg.clone(); seg2.position.z *= -1; g.add(seg2);
    }
    return g;
  }
  function podEngine(THREE, M2, Mdark, len, rad) {
    var g = new THREE.Group();
    var nac = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad * 0.86, len, 12), M2);
    nac.rotation.z = Math.PI / 2; g.add(nac);
    var inlet = new THREE.Mesh(new THREE.TorusGeometry(rad, rad * 0.13, 6, 14), Mdark);
    inlet.rotation.y = Math.PI / 2; inlet.position.x = len / 2; g.add(inlet);
    var fan = new THREE.Mesh(new THREE.CircleGeometry(rad * 0.86, 14), Mdark);
    fan.rotation.y = -Math.PI / 2; fan.position.x = len / 2 - 0.05; g.add(fan);
    var noz = new THREE.Mesh(new THREE.CylinderGeometry(rad * 0.62, rad * 0.72, len * 0.16, 12), Mdark);
    noz.rotation.z = Math.PI / 2; noz.position.x = -len / 2; g.add(noz);
    return g;
  }
  function prop(THREE, Mdark, Mtip, r, blades) {
    var g = new THREE.Group();
    var spin = new THREE.Mesh(new THREE.ConeGeometry(r * 0.13, r * 0.34, 10), Mdark);
    spin.rotation.z = -Math.PI / 2; g.add(spin);
    for (var i = 0; i < blades; i++) {
      var b = new THREE.Mesh(new THREE.BoxGeometry(r * 0.07, r * 0.9, r * 0.16), Mdark);
      b.rotation.x = i * Math.PI * 2 / blades;
      b.translateY(r * 0.5); b.rotation.z = 0.35;
      g.add(b);
      var tip = new THREE.Mesh(new THREE.BoxGeometry(r * 0.075, r * 0.10, r * 0.17), Mtip);
      tip.rotation.x = i * Math.PI * 2 / blades;
      tip.translateY(r * 0.92); g.add(tip);
    }
    return g;
  }

  /* ------------------------------------------------------------------ */
  /* LARGE AIRCRAFT: airliners and transports carrying a radar           */
  /* ------------------------------------------------------------------ */
  function bigPlane(P) {
    return function (THREE, M, C) {
      var G = new THREE.Group();
      var L = P.len;
      var body = mat(THREE, P.color || 0xb9bfc6, 0.55, 0.35);
      var dark = mat(THREE, 0x2a2e33, 0.7, 0.4);
      var trim = mat(THREE, P.trim || 0x6d757e, 0.6, 0.4);
      var glass = new THREE.MeshStandardMaterial({ color: 0x1b2733, roughness: 0.18,
                                                   metalness: 0.75 });

      /* fuselage: nose cone, parallel barrel, upswept tail */
      var R = L * P.fuseR;
      var barrel = new THREE.Mesh(new THREE.CylinderGeometry(R, R, L * 0.62, 16), body);
      barrel.rotation.z = Math.PI / 2; barrel.position.y = P.high ? R * 1.5 : R;
      G.add(barrel);
      var nose = new THREE.Mesh(new THREE.SphereGeometry(R, 14, 10), body);
      nose.scale.set(L * 0.20 / R, 1, 1);
      nose.position.set(L * 0.31 + L * 0.055, barrel.position.y, 0);
      G.add(nose);
      var tailCone = new THREE.Mesh(new THREE.ConeGeometry(R, L * 0.24, 14), body);
      tailCone.rotation.z = Math.PI / 2;
      tailCone.position.set(-L * 0.31 - L * 0.10, barrel.position.y + R * 0.35, 0);
      G.add(tailCone);
      /* flight deck windows */
      var wind = new THREE.Mesh(new THREE.BoxGeometry(L * 0.05, R * 0.30, R * 1.15), glass);
      wind.position.set(L * 0.40, barrel.position.y + R * 0.42, 0);
      G.add(wind);
      /* cabin window line */
      for (var wi = 0; wi < 14; wi++) {
        var win = new THREE.Mesh(new THREE.BoxGeometry(L * 0.006, R * 0.10, R * 0.04), glass);
        win.position.set(L * 0.27 - wi * L * 0.042, barrel.position.y + R * 0.30, R * 0.99);
        G.add(win);
        var win2 = win.clone(); win2.position.z *= -1; G.add(win2);
      }

      /* wing */
      var wy = P.high ? barrel.position.y + R * 0.78 : barrel.position.y - R * 0.55;
      var W = wing(THREE, body, L * P.rootC, L * P.tipC, L * P.span, L * P.sweep,
                   L * 0.016, P.high ? -0.05 : 0.06);
      W.position.set(-L * 0.02, wy, 0);
      G.add(W);

      /* engines */
      var eL = L * (P.turboprop ? 0.10 : 0.16), eR = L * (P.turboprop ? 0.026 : 0.036);
      for (var s = -1; s <= 1; s += 2) {
        for (var e = 0; e < P.engines / 2; e++) {
          var zoff = L * P.span * 0.5 * (P.turboprop ? (0.30 + e * 0.28) : (0.28 + e * 0.26));
          var eg = podEngine(THREE, trim, dark, eL, eR);
          eg.position.set(L * (P.turboprop ? 0.02 : 0.05), wy - (P.high ? 0 : L * 0.028),
                          s * zoff);
          if (P.turboprop) {
            var pr = prop(THREE, dark, mat(THREE, 0xd8c24a, 0.7, 0.2), L * 0.075, 6);
            pr.position.x = eL * 0.62;
            eg.add(pr);
          }
          G.add(eg);
        }
      }

      /* tail */
      var fy = barrel.position.y + R * 0.6;
      if (P.tailFins === 4) {
        /* Hawkeye: four fins on a wide tailplane so the rotodome does not
           blank the rudder */
        var tp = new THREE.Mesh(new THREE.BoxGeometry(L * 0.09, L * 0.012, L * 0.36), body);
        tp.position.set(-L * 0.40, fy, 0); G.add(tp);
        for (var f = 0; f < 4; f++) {
          var off = (f - 1.5) * L * 0.108;
          var fin = new THREE.Mesh(new THREE.BoxGeometry(L * 0.085, L * 0.10, L * 0.010), body);
          fin.position.set(-L * 0.40, fy + L * 0.05, off);
          fin.rotation.x = (f === 0 || f === 3) ? (f === 0 ? 0.18 : -0.18) : 0;
          G.add(fin);
        }
      } else {
        var vt = new THREE.Mesh(new THREE.BoxGeometry(L * 0.13, L * P.finH, L * 0.014), body);
        vt.position.set(-L * 0.36, fy + L * P.finH / 2, 0);
        G.add(vt);
        var htY = P.tTail ? fy + L * P.finH : fy;
        var ht = new THREE.Mesh(new THREE.BoxGeometry(L * 0.09, L * 0.011, L * 0.26), body);
        ht.position.set(P.tTail ? -L * 0.40 : -L * 0.37, htY, 0);
        G.add(ht);
      }

      /* ---- the radar ---- */
      if (P.rotodome) {
        var dR = L * P.domeR;
        var pyl = new THREE.Mesh(new THREE.BoxGeometry(L * 0.035, L * P.domeH, L * 0.05), trim);
        pyl.position.set(-L * P.domeAt, barrel.position.y + R + L * P.domeH / 2, 0);
        G.add(pyl);
        var pyl2 = pyl.clone(); pyl2.position.x -= L * 0.11; G.add(pyl2);
        var dome = new THREE.Mesh(new THREE.CylinderGeometry(dR, dR, L * 0.030, 22), trim);
        dome.position.set(-L * P.domeAt - L * 0.055,
                          barrel.position.y + R + L * P.domeH, 0);
        G.add(dome);
        /* the stripe that makes a rotodome read as a rotodome */
        var band = new THREE.Mesh(new THREE.CylinderGeometry(dR * 1.005, dR * 1.005, L * 0.010, 22), dark);
        band.position.copy(dome.position); G.add(band);
      }
      if (P.dorsalPlank) {
        /* KJ-500 style: three fixed AESA faces in a non-rotating disc */
        var pR = L * P.domeR;
        var pl = new THREE.Mesh(new THREE.CylinderGeometry(pR, pR, L * 0.026, 3), trim);
        pl.position.set(-L * P.domeAt, barrel.position.y + R + L * P.domeH, 0);
        G.add(pl);
        var mastK = new THREE.Mesh(new THREE.CylinderGeometry(L * 0.020, L * 0.026, L * P.domeH, 8), trim);
        mastK.position.set(-L * P.domeAt, barrel.position.y + R + L * P.domeH / 2, 0);
        G.add(mastK);
      }
      return G;
    };
  }

  /* ------------------------------------------------------------------ */
  /* FIGHTERS                                                            */
  /* ------------------------------------------------------------------ */
  function fighter(P) {
    return function (THREE, M, C) {
      var G = new THREE.Group();
      var L = P.len;
      var skin = mat(THREE, P.color || 0x707880, P.lo ? 0.86 : 0.55, P.lo ? 0.12 : 0.42);
      var dark = mat(THREE, 0x24282c, 0.7, 0.45);
      var glass = new THREE.MeshStandardMaterial({ color: 0x243342, roughness: 0.12,
                                                   metalness: 0.85, transparent: true, opacity: 0.85 });
      var hot = mat(THREE, 0x8a8f93, 0.45, 0.8);

      var R = L * 0.055;
      /* forward fuselage */
      var fwd = new THREE.Mesh(new THREE.BoxGeometry(L * 0.34, R * 1.7, R * 1.9), skin);
      fwd.position.set(L * 0.16, 0, 0); G.add(fwd);
      var noseC = new THREE.Mesh(new THREE.ConeGeometry(R * 0.95, L * 0.20, 10), skin);
      noseC.rotation.z = -Math.PI / 2; noseC.position.set(L * 0.42, 0, 0); G.add(noseC);
      /* centre and aft fuselage */
      var mid = new THREE.Mesh(new THREE.BoxGeometry(L * 0.40, R * 1.5, R * (P.twin ? 3.3 : 2.3)), skin);
      mid.position.set(-L * 0.12, 0, 0); G.add(mid);
      /* canopy */
      var cano = new THREE.Mesh(new THREE.SphereGeometry(R * 0.86, 12, 9), glass);
      cano.scale.set(L * 0.115 / (R * 0.86), 0.72, 0.86);
      cano.position.set(L * 0.20, R * 0.95, 0); G.add(cano);
      var spine = new THREE.Mesh(new THREE.BoxGeometry(L * 0.30, R * 0.55, R * 0.95), skin);
      spine.position.set(-L * 0.02, R * 0.80, 0); G.add(spine);

      /* intakes */
      for (var s = -1; s <= 1; s += 2) {
        if (!P.twin && s > 0) continue;
        var ink = new THREE.Mesh(new THREE.BoxGeometry(L * 0.22, R * 1.15, R * 0.95), skin);
        ink.position.set(L * 0.03, -R * 0.42, P.twin ? s * R * 1.15 : 0);
        G.add(ink);
        var mouth = new THREE.Mesh(new THREE.BoxGeometry(L * 0.012, R * 1.0, R * 0.82), dark);
        mouth.position.set(L * 0.14, -R * 0.42, P.twin ? s * R * 1.15 : 0);
        G.add(mouth);
      }

      /* main wing */
      var Wg = wing(THREE, skin, L * P.rootC, L * P.tipC, L * P.span, L * P.sweep, L * 0.013, 0.02);
      Wg.position.set(-L * 0.06, -R * 0.15, 0); G.add(Wg);
      if (P.lerx) {
        for (var sx = -1; sx <= 1; sx += 2) {
          var lx = new THREE.Mesh(new THREE.BoxGeometry(L * 0.20, L * 0.008, L * 0.035), skin);
          lx.position.set(L * 0.14, R * 0.15, sx * R * 1.5);
          lx.rotation.y = sx * 0.30; G.add(lx);
        }
      }
      if (P.canard) {
        var cn = wing(THREE, skin, L * 0.07, L * 0.03, L * 0.28, L * 0.05, L * 0.009, 0.02);
        cn.position.set(L * 0.24, R * 0.45, 0); G.add(cn);
      }

      /* tails */
      var nFin = P.twinTail ? 2 : 1;
      for (var f = 0; f < nFin; f++) {
        var zf = P.twinTail ? (f ? 1 : -1) * R * 1.5 : 0;
        var fin = new THREE.Mesh(new THREE.BoxGeometry(L * P.finC, L * P.finH, L * 0.010), skin);
        fin.position.set(-L * 0.30, L * P.finH / 2 + R * 0.4, zf);
        if (P.twinTail) fin.rotation.x = (f ? -1 : 1) * (P.canted || 0.22);
        G.add(fin);
      }
      var htp = wing(THREE, skin, L * 0.10, L * 0.04, L * 0.34, L * 0.07, L * 0.010, 0);
      htp.position.set(-L * 0.32, 0, 0); G.add(htp);

      /* exhausts */
      var nEng = P.twin ? 2 : 1;
      for (var e = 0; e < nEng; e++) {
        var ze = P.twin ? (e ? 1 : -1) * R * 1.1 : 0;
        if (P.lo) {
          /* a low-observable aircraft hides its nozzle in a flattened trough */
          var trough = new THREE.Mesh(new THREE.BoxGeometry(L * 0.09, R * 0.55, R * 1.5), dark);
          trough.position.set(-L * 0.32, 0, ze); G.add(trough);
        } else {
          var noz = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.72, R * 0.60, L * 0.09, 12), hot);
          noz.rotation.z = Math.PI / 2; noz.position.set(-L * 0.33, 0, ze); G.add(noz);
          var burn = new THREE.Mesh(new THREE.CircleGeometry(R * 0.56, 12), dark);
          burn.rotation.y = -Math.PI / 2; burn.position.set(-L * 0.375, 0, ze); G.add(burn);
        }
      }

      /* stores: what the aircraft is carrying is half its identity */
      var pods = P.pods || 0;
      for (var pI = 0; pI < pods; pI++) {
        var sd = pI % 2 ? 1 : -1, idx = Math.floor(pI / 2);
        var z = sd * (R * 1.9 + idx * L * 0.075);
        var pyl = new THREE.Mesh(new THREE.BoxGeometry(L * 0.03, L * 0.022, L * 0.008), dark);
        pyl.position.set(-L * 0.05, -R * 0.42, z); G.add(pyl);
        var store = P.podKind === "jammer"
          ? new THREE.Mesh(new THREE.CylinderGeometry(L * 0.017, L * 0.013, L * 0.16, 10), mat(THREE, 0x9aa2a8, 0.5, 0.5))
          : new THREE.Mesh(new THREE.CylinderGeometry(L * 0.012, L * 0.012, L * 0.19, 8), mat(THREE, 0xd8dade, 0.6, 0.3));
        store.rotation.z = Math.PI / 2;
        store.position.set(-L * 0.04, -R * 0.68, z); G.add(store);
        if (P.podKind !== "jammer") {
          var finsM = new THREE.Mesh(new THREE.BoxGeometry(L * 0.03, L * 0.035, L * 0.004), dark);
          finsM.position.set(-L * 0.12, -R * 0.68, z); G.add(finsM);
        }
      }
      /* wingtip ESM pods, the Growler's signature */
      if (P.tipPods) {
        for (var tp2 = -1; tp2 <= 1; tp2 += 2) {
          var tip = new THREE.Mesh(new THREE.CylinderGeometry(L * 0.014, L * 0.010, L * 0.13, 10),
                                   mat(THREE, 0xc8ccd0, 0.5, 0.4));
          tip.rotation.z = Math.PI / 2;
          tip.position.set(-L * 0.09, 0, tp2 * L * P.span * 0.5);
          G.add(tip);
        }
      }
      /* tailhook and strengthened gear mark a carrier aircraft */
      if (P.hook) {
        var hk = new THREE.Mesh(new THREE.BoxGeometry(L * 0.13, L * 0.008, L * 0.010), dark);
        hk.position.set(-L * 0.36, -R * 0.75, 0); hk.rotation.z = 0.20; G.add(hk);
      }
      return G;
    };
  }

  /* ------------------------------------------------------------------ */
  /* HELICOPTERS                                                         */
  /* ------------------------------------------------------------------ */
  function helo(P) {
    return function (THREE, M, C) {
      var G = new THREE.Group();
      var L = P.len;
      var skin = mat(THREE, P.color || 0x5a6068, 0.68, 0.28);
      var dark = mat(THREE, 0x22262a, 0.75, 0.35);
      var glass = new THREE.MeshStandardMaterial({ color: 0x1e2c38, roughness: 0.15, metalness: 0.8 });

      var R = L * 0.085;
      var cab = new THREE.Mesh(new THREE.BoxGeometry(L * 0.42, R * 2.0, R * 1.9), skin);
      cab.position.set(L * 0.06, R * 1.2, 0); G.add(cab);
      var nose = new THREE.Mesh(new THREE.SphereGeometry(R, 12, 9), skin);
      nose.scale.set(L * 0.10 / R, 0.95, 0.92);
      nose.position.set(L * 0.29, R * 1.15, 0); G.add(nose);
      var wind = new THREE.Mesh(new THREE.BoxGeometry(L * 0.11, R * 1.1, R * 1.72), glass);
      wind.position.set(L * 0.24, R * 1.45, 0); wind.rotation.z = -0.18; G.add(wind);

      /* tail boom */
      var boom = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.34, R * 0.22, L * 0.44, 10), skin);
      boom.rotation.z = Math.PI / 2; boom.position.set(-L * 0.35, R * 1.45, 0); G.add(boom);
      var vfin = new THREE.Mesh(new THREE.BoxGeometry(L * 0.10, L * 0.13, L * 0.010), skin);
      vfin.position.set(-L * 0.53, R * 1.9, 0);
      if (!P.coax) vfin.rotation.z = 0.12;
      G.add(vfin);
      var stab = new THREE.Mesh(new THREE.BoxGeometry(L * 0.07, L * 0.008, L * 0.22), skin);
      stab.position.set(-L * 0.50, R * 1.55, 0); G.add(stab);

      /* rotors */
      function rotorDisc(y, rad, blades, tilt) {
        var head = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.30, R * 0.36, R * 0.55, 10), dark);
        head.position.set(L * 0.02, y, 0); G.add(head);
        for (var b = 0; b < blades; b++) {
          var bl = new THREE.Mesh(new THREE.BoxGeometry(rad, L * 0.006, L * 0.045), dark);
          bl.position.set(L * 0.02, y + R * 0.30, 0);
          bl.rotation.y = b * Math.PI * 2 / blades;
          bl.translateX(rad * 0.5);
          bl.rotation.z = tilt || 0.04;
          G.add(bl);
        }
      }
      if (P.coax) {
        /* Kamov: two contra-rotating discs, and therefore no tail rotor */
        rotorDisc(R * 2.6, L * 0.52, 3, 0.05);
        rotorDisc(R * 3.3, L * 0.52, 3, -0.05);
        var vfin2 = vfin.clone(); vfin2.position.z = L * 0.055; G.add(vfin2);
        vfin.position.z = -L * 0.055;
      } else {
        rotorDisc(R * 2.9, L * 0.58, P.blades || 4, 0.04);
        if (P.fenestron) {
          var duct = new THREE.Mesh(new THREE.CylinderGeometry(L * 0.055, L * 0.055, L * 0.028, 14), skin);
          duct.rotation.x = Math.PI / 2;
          duct.position.set(-L * 0.53, R * 1.95, 0); G.add(duct);
        } else {
          for (var tb = 0; tb < 4; tb++) {
            var tbl = new THREE.Mesh(new THREE.BoxGeometry(L * 0.115, L * 0.005, L * 0.026), dark);
            tbl.position.set(-L * 0.545, R * 2.1, L * 0.020);
            tbl.rotation.x = tb * Math.PI / 2;
            tbl.translateX(L * 0.058);
            G.add(tbl);
          }
        }
      }

      /* sponsons / undercarriage */
      for (var s = -1; s <= 1; s += 2) {
        var sp = new THREE.Mesh(new THREE.BoxGeometry(L * 0.12, R * 0.55, R * 0.55), skin);
        sp.position.set(-L * 0.02, R * 0.42, s * R * 1.05); G.add(sp);
      }

      /* ASW fit: dipping sonar winch, sonobuoy dispenser, torpedo */
      if (P.asw) {
        var winch = new THREE.Mesh(new THREE.BoxGeometry(L * 0.07, R * 0.5, R * 0.45),
                                   mat(THREE, 0x3a4046, 0.7, 0.3));
        winch.position.set(-L * 0.10, R * 0.95, R * 1.15); G.add(winch);
        var buoy = new THREE.Mesh(new THREE.BoxGeometry(L * 0.13, R * 0.42, R * 0.30), dark);
        buoy.position.set(-L * 0.14, R * 0.85, -R * 1.15); G.add(buoy);
        var torp = new THREE.Mesh(new THREE.CylinderGeometry(L * 0.020, L * 0.020, L * 0.17, 10),
                                  mat(THREE, 0x2f6f4f, 0.7, 0.2));
        torp.rotation.z = Math.PI / 2;
        torp.position.set(L * 0.02, R * 0.55, -R * 1.35); G.add(torp);
        var radome = new THREE.Mesh(new THREE.SphereGeometry(R * 0.55, 10, 8), dark);
        radome.scale.set(1.5, 0.5, 1.1);
        radome.position.set(L * 0.12, R * 0.28, 0); G.add(radome);
      }
      return G;
    };
  }

  /* ================= registrations ================= */
  var A = {
    /* --- airborne early warning --- */
    awacs_n:  [46, bigPlane({ len:46, fuseR:0.030, rootC:0.16, tipC:0.05, span:0.92, sweep:0.13,
                 engines:4, finH:0.16, rotodome:true, domeR:0.155, domeH:0.075, domeAt:0.02,
                 color:0xc3c8cd, trim:0x8f979e })],
    cawacs_n: [30, bigPlane({ len:30, fuseR:0.042, rootC:0.15, tipC:0.09, span:1.10, sweep:0.02,
                 engines:2, turboprop:true, high:true, tailFins:4, rotodome:true,
                 domeR:0.235, domeH:0.085, domeAt:0.03, color:0x9aa4ad, trim:0x7c858d })],
    awacs_r:  [30, bigPlane({ len:30, fuseR:0.042, rootC:0.15, tipC:0.09, span:1.10, sweep:0.02,
                 engines:2, turboprop:true, high:true, tailFins:4, rotodome:true,
                 domeR:0.235, domeH:0.085, domeAt:0.03, color:0x93a0aa, trim:0x77828a })],
    awacs_p:  [47, bigPlane({ len:47, fuseR:0.033, rootC:0.16, tipC:0.05, span:0.94, sweep:0.12,
                 engines:4, high:true, tTail:true, finH:0.20, rotodome:true, domeR:0.150,
                 domeH:0.070, domeAt:0.00, color:0xbcc2c8, trim:0x8a9198 })],
    awacs_c:  [36, bigPlane({ len:36, fuseR:0.036, rootC:0.15, tipC:0.07, span:0.98, sweep:0.03,
                 engines:4, turboprop:true, high:true, tTail:true, finH:0.19,
                 dorsalPlank:true, domeR:0.155, domeH:0.085, domeAt:0.02,
                 color:0x8d959c, trim:0x6f777e })],

    /* --- electronic attack and SEAD --- */
    ew_n:   [18, fighter({ len:18, twin:true, twinTail:true, canted:0.20, lerx:true, hook:true,
              rootC:0.19, tipC:0.06, span:0.72, sweep:0.10, finC:0.12, finH:0.17,
              pods:6, podKind:"jammer", tipPods:true, color:0x5c6870 })],
    ew_c:   [21, fighter({ len:21, twin:true, twinTail:true, canted:0.05, lerx:true,
              rootC:0.21, tipC:0.06, span:0.74, sweep:0.13, finC:0.13, finH:0.18,
              pods:4, podKind:"jammer", tipPods:true, color:0x6b737b })],
    sead_n: [15, fighter({ len:15, twin:false, twinTail:false, lerx:true,
              rootC:0.20, tipC:0.06, span:0.62, sweep:0.11, finC:0.16, finH:0.20,
              pods:4, color:0x6e767e })],
    sead_c: [21, fighter({ len:21, twin:true, twinTail:true, canted:0.05, lerx:true,
              rootC:0.21, tipC:0.06, span:0.74, sweep:0.13, finC:0.13, finH:0.18,
              pods:4, color:0x69717a })],
    sead_p: [22, fighter({ len:22, twin:true, twinTail:false, rootC:0.16, tipC:0.07,
              span:0.52, sweep:0.16, finC:0.15, finH:0.19, pods:4, color:0x7b8069 })],

    /* --- carrier air wings --- */
    cfighter_n: [18, fighter({ len:18, twin:true, twinTail:true, canted:0.20, lerx:true, hook:true,
                  rootC:0.19, tipC:0.06, span:0.72, sweep:0.10, finC:0.12, finH:0.17,
                  pods:4, color:0x63707a })],
    cstealth_n: [16, fighter({ len:16, twin:false, twinTail:true, canted:0.18, lo:true, hook:true,
                  rootC:0.22, tipC:0.05, span:0.74, sweep:0.16, finC:0.13, finH:0.16,
                  color:0x4c5259 })],
    cfighter_c: [22, fighter({ len:22, twin:true, twinTail:true, canted:0.04, canard:true,
                  lerx:true, hook:true, rootC:0.22, tipC:0.06, span:0.76, sweep:0.14,
                  finC:0.13, finH:0.19, pods:4, color:0x6d7a86 })],
    cfighter_p: [22, fighter({ len:22, twin:true, twinTail:true, canted:0.04, canard:true,
                  lerx:true, hook:true, rootC:0.22, tipC:0.06, span:0.76, sweep:0.14,
                  finC:0.13, finH:0.19, pods:2, color:0x6a7d8c })],
    cstealth_c: [17, fighter({ len:17, twin:true, twinTail:true, canted:0.22, lo:true, hook:true,
                  rootC:0.21, tipC:0.05, span:0.70, sweep:0.17, finC:0.12, finH:0.15,
                  color:0x555c63 })],
    cfighter_k: [17, fighter({ len:17, twin:true, twinTail:true, canted:0.06, lerx:true, hook:true,
                  rootC:0.19, tipC:0.06, span:0.66, sweep:0.13, finC:0.13, finH:0.17,
                  pods:2, color:0x76808a })],

    /* --- anti-submarine helicopters --- */
    asw_helo_n: [20, helo({ len:20, blades:4, asw:true, color:0x4a5057 })],
    asw_helo_r: [20, helo({ len:20, blades:4, asw:true, color:0x4f5760 })],
    asw_helo_c: [14, helo({ len:14, blades:4, fenestron:true, asw:true, color:0x545c64 })],
    asw_helo_p: [12, helo({ len:12, coax:true, asw:true, color:0x596155 })],
  };
  /* These are quick parametric approximations from before air3d_era.js existed.
     They are marked so the later, far more detailed airframe builder can
     replace them; the ALIAS entries below are NOT marked, because those reuse
     genuine hand-finished models and should stay. */
  for (var k in A) UNIT_MODELS[k] = { len: A[k][0], build: A[k][1], crude: true };

  /* ---- aliases to existing airframes ----
     Several of these aircraft are not merely similar to one already modelled,
     they are the same airframe. An F-16CJ Wild Weasel is an F-16 with HARM
     pylons; an MH-60R Seahawk is a Black Hawk with a dipping sonar; a Z-20F is
     a Z-20. Reusing the existing model is both more accurate and better made
     than a fresh approximation. */
  var ALIAS = {
    sead_n:     "fighter_n",     // F-16CJ is an F-16
    asw_helo_n: "trans_n",       // MH-60R is a Black Hawk
    asw_helo_r: "trans_n",       // S-70C likewise
    asw_helo_c: "trans_c",       // Z-20F is a Z-20
    asw_helo_p: "trans_p",       // Ka-27 has no analogue; Hip is the closer fit
  };
  for (var a in ALIAS) {
    if (UNIT_MODELS[ALIAS[a]]) {
      (function (src, kind) {
        UNIT_MODELS[a] = {
          len: UNIT_MODELS[src].len,
          build: function (THREE, M, C) {
            var g = UNIT_MODELS[src].build(THREE, M, C);
            if (kind === "asw") {
              /* the ASW fit: dipping sonar winch, sonobuoy dispenser, torpedo */
              var bb = new THREE.Box3().setFromObject(g), sz = new THREE.Vector3();
              bb.getSize(sz);
              var S = Math.max(sz.x, sz.z) * 0.055;
              var dk = new THREE.MeshStandardMaterial({ color: 0x24282c, roughness: 0.8, metalness: 0.3 });
              var winch = new THREE.Mesh(new THREE.BoxGeometry(S * 1.6, S * 1.2, S * 1.1), dk);
              winch.position.set(-sz.x * 0.03, bb.min.y + sz.y * 0.32, sz.z * 0.22);
              g.add(winch);
              var torp = new THREE.Mesh(
                new THREE.CylinderGeometry(S * 0.5, S * 0.5, S * 4.2, 10),
                new THREE.MeshStandardMaterial({ color: 0x2f6f4f, roughness: 0.7, metalness: 0.2 }));
              torp.rotation.z = Math.PI / 2;
              torp.position.set(sz.x * 0.02, bb.min.y + sz.y * 0.22, -sz.z * 0.24);
              g.add(torp);
              var dome = new THREE.Mesh(new THREE.SphereGeometry(S * 1.3, 10, 8), dk);
              dome.scale.set(1.5, 0.5, 1.1);
              dome.position.set(sz.x * 0.18, bb.min.y + sz.y * 0.16, 0);
              g.add(dome);
            } else if (kind === "sead") {
              /* HARM rounds on the outboard pylons */
              var bb2 = new THREE.Box3().setFromObject(g), s2 = new THREE.Vector3();
              bb2.getSize(s2);
              var S2 = Math.max(s2.x, s2.z) * 0.04;
              var wht = new THREE.MeshStandardMaterial({ color: 0xd6d9dd, roughness: 0.6, metalness: 0.3 });
              var dk2 = new THREE.MeshStandardMaterial({ color: 0x2b2f33, roughness: 0.8, metalness: 0.3 });
              for (var sd = -1; sd <= 1; sd += 2) {
                var m2 = new THREE.Mesh(new THREE.CylinderGeometry(S2 * 0.55, S2 * 0.55, S2 * 9, 8), wht);
                m2.rotation.z = Math.PI / 2;
                m2.position.set(-s2.x * 0.02, bb2.min.y + s2.y * 0.30, sd * s2.z * 0.26);
                g.add(m2);
                var fin2 = new THREE.Mesh(new THREE.BoxGeometry(S2 * 1.6, S2 * 2.4, S2 * 0.3), dk2);
                fin2.position.set(-s2.x * 0.06, bb2.min.y + s2.y * 0.30, sd * s2.z * 0.26);
                g.add(fin2);
              }
            }
            return g;
          },
        };
      })(ALIAS[a], a.indexOf("asw") === 0 ? "asw" : "sead");
    }
  }
})();
