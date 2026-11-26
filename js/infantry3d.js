/* ============ infantry3d.js -- parametric infantry kit ============
   The same problem the aircraft and the armour had. Every infantry squad in
   the game resolved to ONE present-day model per role, so a 1950s rifle
   section with M1 Garands and steel pots was drawn as a modern soldier in a
   plate carrier with a MICH helmet, in every era and for every army.

   At map zoom a soldier is a few dozen pixels. Three things carry from that
   distance and nothing else does:
     - overall bulk: a plate carrier is visibly wider and squarer through the
       chest than a 1950s webbing belt, and a greatcoat swallows the legs;
     - the helmet outline: a steel pot is a wide brimmed disc from above, a
       PASGT is a flared shell with ear coverage, a MICH is a small high-cut
       dome with an NVG shroud on the brow, a field cap barely reads at all;
     - the weapon: a long rifle, a stubby carbine and a shoulder tube are
       three different bars across the body.
   So that is what this layer builds. No faces, no fabric folds, no seams.

   Model space follows models3d.js: +X forward (facing), +Y left, +Z up, real
   metres, feet on z = 0. render3d.js stands the model up with rotation.x of
   -PI/2 and rescales it by the MEASURED x extent, so every figure here is
   posed mid-stride with the weapon carried ACROSS the body -- the fore-and-
   aft reach stays near constant whatever the weapon is, which is both how a
   long tube is really carried and the only way a MANPADS gunner does not get
   silently shrunk relative to a rifleman by that rescale.

   The spec table lives in infantry_specs.js, keyed by unit id.            */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }
if (typeof INFKIT === "undefined") { var INFKIT = {}; }

var Infantry3D = (function () {
  "use strict";

  /* ------------------------------------------------------------ palette */
  var CAMO = {
    olive:    { c: 0x3d442c, gear: 0x2b2f22, blot: ["#2b3120", "#525a3a"],            style: "blob" },
    green:    { c: 0x333d24, gear: 0x252c1d, blot: ["#222b19", "#47523a"],            style: "blob" },
    grey:     { c: 0x484d4e, gear: 0x313537, blot: ["#363b3c", "#5c6162"],            style: "blob" },
    woodland: { c: 0x3c4433, gear: 0x282c22, blot: ["#1e241a", "#5d5439", "#171713"], style: "blob" },
    digital:  { c: 0x49503d, gear: 0x2f3529, blot: ["#333929", "#666b53", "#20241b"], style: "pixel" },
    desert:   { c: 0x958868, gear: 0x69614a, blot: ["#7b6f52", "#b3a884"],            style: "blob" },
    /* US Army OCP (Scorpion W2), worn since 2019: a khaki ground under soft
       green and brown fields, small dark-brown branches and pale flecks.
       The colours follow a six-colour quantisation of the Commons swatch
       File:OCP_Swatch.jpg (mean #97938a as photographed, lit flat), darkened
       to author under the game's sun. The IOTV / plate carrier, its pouches
       and the assault pack are issued in the same print (Commons
       File:MultiCam_IOTV.jpg), so the carrier and pack take the cloth map,
       a shade darker so the bulk of the carrier still reads; the boots and
       knee pads are plain coyote brown. */
    ocp:      { c: 0x6c6a52, gear: 0x564b39, blot: ["#565b3f", "#6a513d", "#33271f", "#8f8b76", "#7a7259"],
                style: "ocp", vest: 0xc4c4c4, pack: true, boot: 0x6a5a43 },
    /* M81 woodland BDU of the 1980s-90s US Army: the same print as
       `woodland`. The PASGT vest is made in the woodland print too (Commons
       File:PASGT_vest_and_helmet,_1991.jpg); the ALICE webbing and pack
       over it stay plain olive drab. */
    bdu:      { c: 0x3c4433, gear: 0x282c22, blot: ["#1e241a", "#5d5439", "#171713"], style: "blob",
                vest: 0xb0b0b0, tex: "woodland" },
  };
  function camoOf(n) { return CAMO[n] || CAMO.olive; }

  function mat(THREE, c, r, m) {
    return new THREE.MeshStandardMaterial({
      color: c, roughness: r === undefined ? 0.92 : r,
      metalness: m === undefined ? 0.04 : m });
  }
  function hex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* A soldier is small on screen, so the cloth texture is only there to stop
     the uniform reading as flat plastic; 96px is plenty and it is cached per
     scheme, not per unit -- 107 specs share six canvases. */
  var texCache = {};
  function clothTex(THREE, name) {
    if (texCache[name] !== undefined) return texCache[name];
    var t = null;
    try {
      var P = camoOf(name), N = 96;
      var cv = document.createElement("canvas");
      cv.width = N; cv.height = N;
      var x = cv.getContext("2d");
      var R = rngFor(name.length * 8191 + 37);
      x.fillStyle = hex(P.c); x.fillRect(0, 0, N, N);
      if (P.style === "ocp") {
        /* soft, wide fields first, then the small hard branches and flecks
           on top, as the print is layered */
        for (var f = 0; f < 26; f++) {
          x.fillStyle = P.blot[f % 2 === 0 ? 0 : (f % 3 === 0 ? 4 : 1)];
          x.globalAlpha = 0.55;
          x.beginPath();
          x.ellipse(R() * N, R() * N, 9 + R() * 14, 4 + R() * 6, (R() - 0.5) * 0.5, 0, 6.29);
          x.fill();
        }
        for (var f2 = 0; f2 < 44; f2++) {
          x.fillStyle = P.blot[f2 % 4 === 0 ? 3 : 2];
          x.globalAlpha = 0.85;
          x.beginPath();
          x.ellipse(R() * N, R() * N, 1 + R() * 3.2, 0.8 + R() * 1.8, R() * 3.14, 0, 6.29);
          x.fill();
        }
      } else if (P.style === "pixel") {
        /* pixellated print: small hard-edged blocks, no soft shapes */
        for (var i = 0; i < 340; i++) {
          x.fillStyle = P.blot[(R() * P.blot.length) | 0];
          x.globalAlpha = 0.62;
          var s = 4 + ((R() * 2) | 0) * 4;
          x.fillRect(((R() * N / 4) | 0) * 4, ((R() * N / 4) | 0) * 4, s, s);
        }
      } else {
        for (var b = 0; b < 22; b++) {
          x.fillStyle = P.blot[b % P.blot.length];
          x.globalAlpha = 0.52;
          x.beginPath();
          x.ellipse(R() * N, R() * N, 5 + R() * 13, 3 + R() * 8, R() * 3.14, 0, 6.29);
          x.fill();
        }
      }
      x.globalAlpha = 0.18; x.fillStyle = "#000";
      for (var k = 0; k < 60; k++) x.fillRect(R() * N, R() * N, 1, 1);
      x.globalAlpha = 1;
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.repeat.set(2, 2);
    } catch (e) { t = null; }
    texCache[name] = t;
    return t;
  }

  /* ------------------------------------------------------------- tables */

  /* Helmets, described by what survives at 30 pixels: how far the shell
     overhangs the skull, whether it has a brim, and whether it covers the
     ears. rz is the dome squash, brim the overhang of the rim ring.      */
  var HELMET = {
    steel:  { r: 0.146, rz: 0.80, brim: 0.062, brimH: 0.030, brimDrop: 0.070, ear: 0,     z: 1.712 },
    para:   { r: 0.140, rz: 0.90, brim: 0.010, brimH: 0.018, brimDrop: 0.052, ear: 0.030, z: 1.706, strap: true },
    kevlar: { r: 0.152, rz: 0.82, brim: 0.026, brimH: 0.046, brimDrop: 0.062, ear: 0.085, z: 1.706 },
    modern: { r: 0.138, rz: 0.74, brim: 0.006, brimH: 0.020, brimDrop: 0.044, ear: 0.046, z: 1.716, shroud: true, rails: true },
    cap:    { soft: true, r: 0.113, rz: 0.36, peak: 0.125, z: 1.712 },
  };
  function helmetOf(n) { return HELMET[n] || HELMET.steel; }

  /* Webbing, described by the bulk it adds to the torso. dw/dd are the extra
     HALF width and HALF depth over the bare torso -- a plate carrier adds
     about six centimetres a side, which is the whole difference between the
     1950s silhouette and the present-day one.                            */
  var WEB = {
    belt:  { dw: 0.000, dd: 0.000, carrier: false, pouch: 3, shoulder: 0.000, yoke: true },
    vest:  { dw: 0.022, dd: 0.014, carrier: true,  pouch: 4, shoulder: 0.016 },
    plate: { dw: 0.040, dd: 0.028, carrier: true,  pouch: 4, shoulder: 0.038, cummer: true, collar: true },
  };
  function webOf(n) { return WEB[n] || WEB.belt; }

  /* Weapons. len is real overall metres; that is what decides whether the
     bar across the chest reads as a long rifle, a carbine or a tube.     */
  var WEAPON = {
    smg:           { kind: "gun",  len: 0.72, cal: 0.011, mag: "stick", wood: 0.35, sight: "iron" },
    assault:       { kind: "gun",  len: 0.88, cal: 0.012, mag: "curve", wood: 0.55, sight: "iron" },
    modernassault: { kind: "gun",  len: 0.79, cal: 0.010, mag: "stick", wood: 0.00, sight: "optic", rail: true },
    battlerifle:   { kind: "gun",  len: 1.10, cal: 0.011, mag: "stick", wood: 0.70, sight: "iron" },
    boltrifle:     { kind: "gun",  len: 1.14, cal: 0.010, mag: "none",  wood: 0.85, sight: "iron", bolt: true },
    sniper:        { kind: "gun",  len: 1.20, cal: 0.011, mag: "stick", wood: 0.30, sight: "scope", bipod: true },
    mg:            { kind: "gun",  len: 1.15, cal: 0.014, mag: "box",   wood: 0.15, sight: "iron", bipod: true, belt: true },
    bazooka:       { kind: "tube", len: 1.52, dia: 0.062, breech: "open",    grips: 2 },
    recoilless:    { kind: "tube", len: 1.12, dia: 0.086, breech: "venturi", grips: 2, optic: true },
    rpg:           { kind: "tube", len: 0.96, dia: 0.044, breech: "venturi", grips: 2, warhead: true },
    manpads:       { kind: "tube", len: 1.50, dia: 0.074, breech: "cap",     grips: 1, gripstock: true, bcu: true },
    atgm:          { kind: "tube", len: 1.18, dia: 0.078, breech: "cap",     grips: 1, sightbox: true },
    mortar:        { kind: "mortar", len: 1.22, dia: 0.041 },
    /* US weapons. The generic rows above give a battle rifle and a machine
       gun wooden furniture and an assault rifle the curved magazine, which is
       what says AK; the US guns have none of that.
       m16   M16A2, 1.006 m (published). Off Commons File:M16A2_noBG.jpg, side
             on, 924 px butt to muzzle: all-black polymer, a straight 30-round
             magazine, the carry handle 54 mm proud of the receiver and the
             tall A-frame front sight post 0.395 L ahead of the receiver.
       m240  M240B, 1.245 m (published); black polymer stock, long bipod
             (Commons File:PEO_M240B_Profile.jpg).
       m110  M110 SASS with its suppressor, 1.181 m (published, 1.029 m bare);
             black, big scope, bipod, the suppressor a fat can on the muzzle
             (Commons File:US_Army_10th_Mountain_Division_Snipers.jpg).
       javelin  FGM-148 launch tube, 1.20 m long (published), body 0.145 m
             across over the 127 mm missile; the end caps are about 1.8 x the
             body across on Commons File:Javelin_with_checkout_equipment.jpg
             (measured at the near end, where the two are at one range), and
             the command launch unit hangs low on the left side, about 0.34 m
             back from the front cap. `half` overrides the reach the carry
             angle is worked out from (build): 1.1 lays the tube nearly
             square across the chest, so the caps and the CLU keep the
             figure's fore-and-aft extent at 0.90 m (the generic atgm row
             0.89 m) and render3d's length rescale does not shrink him. */
    m16:           { kind: "gun",  len: 1.006, cal: 0.011, mag: "stick", wood: 0, sight: "carry" },
    m240:          { kind: "gun",  len: 1.245, cal: 0.013, mag: "box",   wood: 0, sight: "iron", bipod: true, belt: true },
    m110:          { kind: "gun",  len: 1.181, cal: 0.011, mag: "stick", wood: 0, sight: "scope", bipod: true, supp: true },
    javelin:       { kind: "tube", len: 1.20, dia: 0.145, breech: "none", grips: 1, javelin: true, half: 1.1 },
  };
  function weaponOf(n) { return WEAPON[n] || WEAPON.assault; }

  function hasGear(P, what) {
    var g = P && P.gear;
    if (!g) return false;
    for (var i = 0; i < g.length; i++) if (g[i] === what) return true;
    return false;
  }

  /* --------------------------------------------------------- primitives */
  function box(THREE, a, b, c, m) { return new THREE.Mesh(new THREE.BoxGeometry(a, b, c), m); }
  /* cylinder standing on its end, axis +Z, radiusTop upward */
  function cylZ(THREE, r1, r2, h, seg, m) {
    var q = new THREE.CylinderGeometry(r1, r2, h, seg || 10);
    q.rotateX(Math.PI / 2);
    return new THREE.Mesh(q, m);
  }
  /* cylinder lying along +X, radiusTop forward */
  function cylX(THREE, r1, r2, h, seg, m) {
    var q = new THREE.CylinderGeometry(r1, r2, h, seg || 8);
    q.rotateZ(-Math.PI / 2);
    return new THREE.Mesh(q, m);
  }
  /* a limb hanging along -Z from its own origin, so rotation is at the joint */
  function limb(THREE, len, rA, rB, m) {
    var q = new THREE.CylinderGeometry(rA, rB, len, 6);
    q.rotateX(Math.PI / 2); q.translate(0, 0, -len / 2);
    return new THREE.Mesh(q, m);
  }

  /* ------------------------------------------------------------- weapon */

  function buildGun(THREE, W, K) {
    var g = new THREE.Group();
    var L = W.len;
    var furn = W.wood > 0.5 ? K.wood : (W.wood > 0 ? K.wood : K.gun);
    /* butt -> muzzle laid out along local +X about the receiver */
    var butt = -0.42 * L, muzzle = 0.58 * L;
    var stockL = (-0.10 * L) - butt;
    var st = box(THREE, stockL, 0.040, 0.082, furn);
    st.position.set(butt + stockL / 2, 0, -0.008); g.add(st);
    var rec = box(THREE, 0.30 * L, 0.044, 0.072, K.gun);
    rec.position.set(0.02 * L, 0, 0); g.add(rec);
    var hgL = 0.26 * L;
    var hg = box(THREE, hgL, 0.042, 0.050, W.wood > 0 ? furn : K.gun);
    hg.position.set(0.19 * L + hgL / 2 - 0.05 * L, 0, 0.002); g.add(hg);
    var brlL = muzzle - 0.36 * L;
    var brl = cylX(THREE, W.cal, W.cal, brlL, 7, K.gun);
    brl.position.set(0.36 * L + brlL / 2, 0, 0.004); g.add(brl);
    if (W.mag === "stick") {
      var m1 = box(THREE, 0.042, 0.030, 0.135, K.gun);
      m1.position.set(0.01 * L, 0, -0.095); g.add(m1);
    } else if (W.mag === "curve") {
      /* the banana magazine is most of what says Kalashnikov at any range */
      var m2 = box(THREE, 0.052, 0.032, 0.185, K.gun);
      m2.position.set(0.01 * L, 0, -0.115); m2.rotation.y = 0.42; g.add(m2);
    } else if (W.mag === "box") {
      var m3 = box(THREE, 0.135, 0.098, 0.120, K.gear);
      m3.position.set(-0.02 * L, 0, -0.100); g.add(m3);
      if (W.belt) {
        var lk = box(THREE, 0.050, 0.026, 0.070, K.gun);
        lk.position.set(0.03 * L, 0, -0.048); g.add(lk);
      }
    }
    if (W.sight === "scope") {
      var sc = cylX(THREE, 0.026, 0.030, 0.235, 8, K.gun);
      sc.position.set(0.06 * L, 0, 0.078); g.add(sc);
      for (var i = -1; i <= 1; i += 2) {
        var mt = box(THREE, 0.024, 0.030, 0.040, K.gun);
        mt.position.set(0.06 * L + i * 0.070, 0, 0.048); g.add(mt);
      }
    } else if (W.sight === "optic") {
      var op = box(THREE, 0.088, 0.036, 0.052, K.gun);
      op.position.set(0.05 * L, 0, 0.062); g.add(op);
    } else if (W.sight === "carry") {
      /* M16A2: the carry handle along the receiver and the tall front post */
      var ch = box(THREE, 0.150, 0.014, 0.050, K.gun);
      ch.position.set(0.04 * L, 0, 0.036 + 0.025); g.add(ch);
      var fp = box(THREE, 0.022, 0.014, 0.060, K.gun);
      fp.position.set(0.395 * L, 0, 0.004 + 0.030); g.add(fp);
    } else {
      var fs = box(THREE, 0.016, 0.014, 0.040, K.gun);
      fs.position.set(0.50 * L, 0, 0.030); g.add(fs);
      var rs = box(THREE, 0.020, 0.030, 0.026, K.gun);
      rs.position.set(0.13 * L, 0, 0.048); g.add(rs);
    }
    if (W.supp) {
      var su = cylX(THREE, W.cal * 1.75, W.cal * 1.75, 0.150, 8, K.gun);
      su.position.set(muzzle - 0.075, 0, 0.004); g.add(su);
    }
    if (W.bolt) {
      var bh = box(THREE, 0.020, 0.070, 0.020, K.gun);
      bh.position.set(0.09 * L, -0.042, 0.010); g.add(bh);
    }
    var grip = box(THREE, 0.038, 0.036, 0.090, K.gun);
    grip.position.set(-0.09 * L, 0, -0.062); grip.rotation.y = -0.22; g.add(grip);
    if (W.bipod) {
      for (var s = -1; s <= 1; s += 2) {
        var lg = limb(THREE, 0.230, 0.008, 0.008, K.gun);
        lg.position.set(0.42 * L, 0, -0.020);
        lg.rotation.x = s * 0.42; lg.rotation.y = 0.20; g.add(lg);
      }
    }
    g.userData.gripX = -0.09 * L;
    g.userData.frontX = 0.30 * L;
    return g;
  }

  function buildTube(THREE, W, K) {
    var g = new THREE.Group();
    var L = W.len, R = W.dia * 0.5;
    var tb = cylX(THREE, R, R, L, 10, K.gun);
    g.add(tb);
    if (W.breech === "venturi") {
      var vn = cylX(THREE, R, R * 1.75, 0.170, 10, K.gun);
      vn.position.set(-L / 2 - 0.082, 0, 0); g.add(vn);
    } else if (W.breech === "cap") {
      var cp = cylZ(THREE, R * 1.06, R * 1.06, 0.050, 10, K.gear);
      cp.rotation.y = Math.PI / 2; cp.position.set(-L / 2 - 0.024, 0, 0); g.add(cp);
    } else if (W.breech !== "none") {
      var rim = cylX(THREE, R * 1.12, R * 1.12, 0.035, 10, K.gun);
      rim.position.set(-L / 2 + 0.018, 0, 0); g.add(rim);
    }
    if (W.javelin) {
      /* the two fat end caps and the box of the command launch unit on the
         left: the Javelin's whole silhouette */
      for (var e = -1; e <= 1; e += 2) {
        var ec = cylX(THREE, R * 1.8, R * 1.8, 0.120, 12, K.gun);
        ec.position.set(e * (L / 2 - 0.060), 0, 0); g.add(ec);
      }
      var clu = box(THREE, 0.300, 0.170, 0.240, K.gun);
      clu.position.set(L / 2 - 0.340, R + 0.040, -0.085); g.add(clu);
      var ep = box(THREE, 0.060, 0.090, 0.070, K.gun);
      ep.position.set(L / 2 - 0.520, R + 0.060, -0.060); g.add(ep);
    }
    if (W.warhead) {
      /* the bulbous shaped-charge head hanging off the front of an RPG */
      var wh = cylX(THREE, R * 0.55, R * 2.05, 0.185, 10, K.gun);
      wh.position.set(L / 2 + 0.092, 0, 0); g.add(wh);
      var tip = cylX(THREE, 0.006, R * 0.55, 0.075, 8, K.gun);
      tip.position.set(L / 2 + 0.222, 0, 0); g.add(tip);
    }
    if (W.gripstock) {
      /* MANPADS: the squared gripstock and the bottle-shaped coolant unit
         hanging under the tube are the whole recognition cue */
      var gs = box(THREE, 0.170, 0.052, 0.150, K.gear);
      gs.position.set(-0.10, 0, -R - 0.070); g.add(gs);
      if (W.bcu) {
        var bc = box(THREE, 0.105, 0.070, 0.085, K.gun);
        bc.position.set(0.04, 0, -R - 0.052); g.add(bc);
      }
      var sg = box(THREE, 0.055, 0.040, 0.115, K.gun);
      sg.position.set(0.10, 0, R + 0.055); g.add(sg);
    }
    if (W.sightbox) {
      /* the big square optical sight box on the side of a wire-guided
         launcher, sitting at eye height */
      var sb = box(THREE, 0.175, 0.140, 0.170, K.gear);
      sb.position.set(0.02, R + 0.082, 0.020); g.add(sb);
      var lens = cylX(THREE, 0.036, 0.036, 0.045, 8, K.gun);
      lens.position.set(0.10, R + 0.082, 0.020); g.add(lens);
    }
    if (W.optic) {
      var oc = box(THREE, 0.145, 0.048, 0.058, K.gun);
      oc.position.set(0.02, R + 0.036, R + 0.030); g.add(oc);
    }
    for (var i = 0; i < (W.grips || 0); i++) {
      var gr = box(THREE, 0.042, 0.038, 0.098, K.gun);
      gr.position.set(-0.11 + i * 0.30, 0, -R - 0.046); g.add(gr);
    }
    var sh = box(THREE, 0.130, 0.026, 0.030, K.gear);
    sh.position.set(-0.16, 0, R + 0.018); g.add(sh);
    /* the shoulder sits about a third back from the muzzle, not at the
       balance point, so slide the whole launcher forward of the hold */
    var off = 0.085 * L;
    for (var k = 0; k < g.children.length; k++) g.children[k].position.x += off;
    g.userData.gripX = -0.11;
    g.userData.frontX = 0.19;
    return g;
  }

  function buildMortar(THREE, M, W, K) {
    var g = new THREE.Group();
    var tb = cylX(THREE, W.dia, W.dia, W.len, 10, K.gun);
    g.add(tb);
    var col = cylX(THREE, W.dia * 1.30, W.dia * 1.30, 0.075, 10, K.gun);
    col.position.set(-W.len / 2 + 0.05, 0, 0); g.add(col);
    var cl = box(THREE, 0.085, 0.075, 0.075, K.gear);
    cl.position.set(0.10, 0, 0); g.add(cl);
    for (var s = -1; s <= 1; s += 2) {
      var lg = limb(THREE, 0.520, 0.010, 0.008, K.gun);
      lg.position.set(0.12, 0, -0.02);
      lg.rotation.x = s * 0.30; lg.rotation.y = 1.15; g.add(lg);
    }
    g.userData.gripX = 0.00;
    g.userData.frontX = 0.16;
    return g;
  }

  /* Round baseplate, carried strapped across the back: an unmistakable disc
     nobody else in the roster has. Built with the shared slab helper. */
  function baseplate(THREE, M, K) {
    var pts = [], n = 10;
    for (var i = 0; i < n; i++) {
      var a = i / n * Math.PI * 2;
      pts.push([Math.cos(a) * 0.155, Math.sin(a) * 0.155]);
    }
    var m = new THREE.Mesh(M.slab(THREE, pts, 0.030), K.gun);
    m.rotation.y = Math.PI / 2;
    return m;
  }

  /* -------------------------------------------------------------- torso */

  /* The torso is a loft run along the body's own long axis and then stood
     up, which is the only way to get a chest that tapers to the waist out of
     the shared helper -- loft always runs along +X. */
  function torsoGeo(THREE, M, hw, hd) {
    var S = [
      { x: 0.000, w: hw * 0.78, h: hd * 0.86, zc: 0.000, sq: 0.50 },
      { x: 0.120, w: hw * 0.84, h: hd * 0.92, zc: -0.006, sq: 0.48 },
      { x: 0.300, w: hw * 0.99, h: hd * 1.00, zc: -0.012, sq: 0.44 },
      { x: 0.440, w: hw * 1.00, h: hd * 0.96, zc: -0.008, sq: 0.44 },
      { x: 0.535, w: hw * 0.80, h: hd * 0.80, zc: 0.000, sq: 0.55 },
    ];
    var q = M.loft(THREE, S, 12);
    /* loft +X is the body's up axis; stand it on end (+X -> +Z) */
    q.rotateY(-Math.PI / 2);
    q.translate(0, 0, 0.985);
    return q;
  }

  /* ---------------------------------------------------------------- arm */
  function addArm(THREE, g, K, side, shY, shZ, ry, rx, fy, fx) {
    var ua = limb(THREE, 0.285, 0.052, 0.045, K.cloth);
    ua.position.set(0.005, side * shY, shZ);
    ua.rotation.y = ry; ua.rotation.x = rx;
    var fa = limb(THREE, 0.265, 0.044, 0.037, K.cloth);
    fa.position.set(0, 0, -0.285);
    fa.rotation.y = fy; fa.rotation.x = fx || 0;
    ua.add(fa);
    var hn = new THREE.Mesh(new THREE.SphereGeometry(0.043, 6, 5), K.skin);
    hn.position.set(0, 0, -0.262); fa.add(hn);
    g.add(ua);
    return ua;
  }

  /* --------------------------------------------------------------- main */
  function build(THREE, M, C, P) {
    P = P || {};
    var g = new THREE.Group();
    var CP = camoOf(P.camo);
    var H = helmetOf(P.helmet);
    var V = webOf(P.webbing);
    var W = weaponOf(P.weapon);
    var coat = hasGear(P, "greatcoat");

    var tex = clothTex(THREE, CP.tex || P.camo || "olive");
    var K = {
      cloth: new THREE.MeshStandardMaterial({
        color: tex ? 0xffffff : CP.c, map: tex || null, roughness: 0.94, metalness: 0.02 }),
      gear:  mat(THREE, CP.gear, 0.93, 0.03),
      skin:  mat(THREE, 0xa9835f, 0.92, 0.0),
      gun:   mat(THREE, 0x25282b, 0.55, 0.42),
      wood:  mat(THREE, 0x6a4a2c, 0.80, 0.05),
      glass: new THREE.MeshStandardMaterial({ color: 0x1a2a30, roughness: 0.25, metalness: 0.55 }),
      team:  mat(THREE, (C && C.team) || 0x3f7fd0, 0.70, 0.10),
    };
    /* straps were their own material at roughness 0.95 against the gear's
       0.93, same colour: one material, so they merge with the gear */
    K.strap = K.gear;
    /* the carrier (and, where the issue says so, the pack and its pouches)
       in the uniform's own print, and the boots in their own colour. All
       fall back to the gear material, so the other schemes build exactly as
       before. */
    K.vest = (CP.vest && tex) ? new THREE.MeshStandardMaterial({
      color: CP.vest, map: tex, roughness: 0.93, metalness: 0.03 }) : K.gear;
    K.pack = CP.pack ? K.vest : K.gear;
    K.boot = CP.boot ? mat(THREE, CP.boot, 0.90, 0.03) : K.gear;

    var hipZ = 0.955, shZ = 1.435;
    var hw = 0.163 + V.dw, hd = 0.098 + V.dd;   /* torso half width / depth */
    var shY = 0.190 + V.shoulder;

    /* ------------------------------------------------------------ legs */
    /* mid-stride: the stance sets the fore-and-aft extent that render3d
       measures, so it is deliberately the widest thing on the figure and it
       does not change with the kit. */
    function leg(side, thY, shYr, kneepad) {
      var th = limb(THREE, 0.455, 0.076, 0.060, K.cloth);
      th.position.set(0, side * 0.098, hipZ);
      th.rotation.y = thY; th.rotation.x = side * 0.035;
      var ca = limb(THREE, 0.430, 0.058, 0.046, K.cloth);
      ca.position.set(0, 0, -0.455); ca.rotation.y = shYr;
      th.add(ca);
      var bt = box(THREE, 0.275, 0.108, 0.098, K.boot);
      bt.position.set(0.055, 0, -0.408); ca.add(bt);
      if (kneepad) {
        var kp = box(THREE, 0.098, 0.112, 0.100, K.boot);
        kp.position.set(0.038, 0, -0.045); ca.add(kp);
      }
      /* Named and tagged with the pose it was built in, so render3d can swing
         it. Until now the figure was frozen mid-stride and slid across the
         ground like a chess piece - the single most artificial thing left in
         the game to look at. The rotation axis is +Y because in model space
         +Y is LEFT, so turning about it swings the limb fore and aft. */
      th.name = side > 0 ? "leg.L" : "leg.R";
      th.userData.stride = thY;
      th.userData.shin = ca;
      th.userData.shinBase = shYr;
      g.add(th);
    }
    var kn = hasGear(P, "kneepads");
    leg(1, -0.300, 0.285, kn);    /* left leg forward */
    leg(-1, 0.265, 0.150, kn);    /* right leg driving back */

    /* ----------------------------------------------------------- torso */
    var tor = new THREE.Mesh(torsoGeo(THREE, M, hw, hd), K.cloth);
    g.add(tor);
    var pel = box(THREE, hd * 1.75, hw * 1.62, 0.150, K.cloth);
    pel.position.set(0, 0, 0.965); g.add(pel);

    if (coat) {
      /* a greatcoat hides the legs to the knee and doubles the apparent
         bulk of the figure -- the Korean-winter silhouette */
      var sk = cylZ(THREE, hw * 1.10, hw * 1.40, 0.500, 12, K.cloth);
      sk.position.set(-0.008, 0, 0.735); g.add(sk);
      var lap = box(THREE, 0.024, hw * 1.55, 0.500, K.cloth);
      lap.position.set(hd * 0.98, 0, 0.735); g.add(lap);
    }

    /* --------------------------------------------------------- webbing */
    if (V.carrier) {
      /* front and back plates plus the cummerbund: a slab across the chest
         only, so the shoulders and the waist still taper around it */
      var car = box(THREE, (hd + 0.018) * 2, (hw - 0.006) * 2, 0.290, K.vest);
      car.position.set(-0.004, 0, 1.278); g.add(car);
      if (V.collar) {
        var col = box(THREE, (hd + 0.002) * 2, (hw + 0.026) * 2, 0.055, K.vest);
        col.position.set(-0.004, 0, 1.440); g.add(col);
      }
      if (V.cummer) {
        var cum = box(THREE, (hd + 0.020) * 2, (hw - 0.020) * 2, 0.095, K.vest);
        cum.position.set(-0.004, 0, 1.098); g.add(cum);
      }
      for (var i = 0; i < V.pouch; i++) {
        var col2 = (i % 2) ? 1 : -1, row = (i < 2) ? 0 : 1;
        var pu = box(THREE, 0.056, 0.082, 0.096, K.pack);
        pu.position.set(hd + 0.040, col2 * (hw * 0.42), 1.312 - row * 0.112);
        g.add(pu);
      }
    } else {
      /* 1950s pattern: a belt at the waist and a Y of shoulder straps, so
         the chest stays narrow */
      var blt = box(THREE, (hd + 0.014) * 2, (hw + 0.012) * 2, 0.070, K.gear);
      blt.position.set(0, 0, 1.048); g.add(blt);
      for (var s2 = -1; s2 <= 1; s2 += 2) {
        var yk = box(THREE, 0.030, 0.052, 0.400, K.strap);
        yk.position.set(hd * 0.72, s2 * hw * 0.44, 1.245);
        yk.rotation.x = s2 * 0.16; g.add(yk);
      }
      for (var j = 0; j < V.pouch; j++) {
        var pu2 = box(THREE, 0.062, 0.090, 0.100, K.gear);
        pu2.position.set(hd + 0.036, (j - (V.pouch - 1) / 2) * 0.105, 1.070);
        g.add(pu2);
      }
    }
    if (V.shoulder > 0.001) {
      for (var s3 = -1; s3 <= 1; s3 += 2) {
        var sp = box(THREE, 0.125, 0.088, 0.068, K.vest);
        sp.position.set(-0.004, s3 * (hw + 0.014), 1.408); g.add(sp);
      }
    }

    /* ------------------------------------------------------------ gear */
    if (hasGear(P, "backpack")) {
      var deep = V.carrier ? 0.140 : 0.158;
      var pk = box(THREE, deep, 0.255, V.carrier ? 0.320 : 0.285, K.pack);
      pk.position.set(-(hd + deep * 0.5 + 0.010), 0, V.carrier ? 1.185 : 1.215);
      g.add(pk);
      /* rolled shelter half lashed across the top of the pack: breaks the
         crate outline that a plain box gives from above */
      var rl = cylX(THREE, 0.048, 0.048, 0.275, 8, K.strap);
      rl.rotation.z = Math.PI / 2;
      rl.position.set(pk.position.x + 0.010, 0, pk.position.z + 0.176); g.add(rl);
    }
    if (hasGear(P, "radio")) {
      var rd = box(THREE, 0.105, 0.175, 0.230, K.gear);
      rd.position.set(-(hd + 0.190), 0.055, 1.230); g.add(rd);
      var ant = limb(THREE, 0.760, 0.006, 0.004, K.gun);
      ant.position.set(-(hd + 0.150), 0.130, 2.090);
      ant.rotation.y = 0.14; g.add(ant);
    }
    if (hasGear(P, "canteen")) {
      var cn = cylZ(THREE, 0.046, 0.046, 0.118, 8, K.gear);
      cn.position.set(-0.075, -(hw + 0.062), 1.040); g.add(cn);
    }
    if (hasGear(P, "entrench")) {
      var pts = [[-0.058, -0.070], [0.058, -0.070], [0.072, 0.028], [0, 0.098], [-0.072, 0.028]];
      var bl = new THREE.Mesh(M.slab(THREE, pts, 0.018), K.gear);
      bl.rotation.x = Math.PI / 2;
      bl.position.set(-(hd + 0.055), hw + 0.058, 1.055); g.add(bl);
      var hd2 = box(THREE, 0.026, 0.024, 0.150, K.wood);
      hd2.position.set(-(hd + 0.055), hw + 0.058, 0.940); g.add(hd2);
    }
    if (hasGear(P, "bandolier")) {
      for (var b2 = 0; b2 < 2; b2++) {
        var bd = box(THREE, 0.030, 0.430, 0.062, K.gear);
        bd.position.set(hd + (V.carrier ? 0.062 : 0.030), 0, 1.230);
        bd.rotation.x = (b2 ? -0.85 : 0.85); g.add(bd);
      }
    }

    /* ------------------------------------------------------------ head */
    var neck = cylZ(THREE, 0.048, 0.052, 0.080, 7, K.skin);
    neck.position.set(0.004, 0, 1.542); g.add(neck);
    var head = new THREE.Mesh(new THREE.SphereGeometry(0.098, 8, 6), K.skin);
    head.scale.set(1.06, 0.94, 1.10);
    head.position.set(0.012, 0, 1.638); g.add(head);

    if (H.soft) {
      /* a field cap barely breaks the outline of the head at all: that IS
         the recognition cue against a helmet */
      var cp2 = cylZ(THREE, H.r * 0.96, H.r, H.rz * 0.30, 10, K.cloth);
      cp2.position.set(0.010, 0, H.z); g.add(cp2);
      var crown = new THREE.Mesh(new THREE.SphereGeometry(H.r * 0.96, 9, 5), K.cloth);
      crown.scale.set(1, 1, 0.42);
      crown.position.set(0.010, 0, H.z + H.rz * 0.16); g.add(crown);
      var pk2 = box(THREE, H.peak, H.r * 1.70, 0.014, K.cloth);
      pk2.position.set(0.010 + H.r * 0.80 + H.peak * 0.40, 0, H.z - 0.018);
      pk2.rotation.y = 0.16; g.add(pk2);
    } else {
      var shell = new THREE.Mesh(new THREE.SphereGeometry(H.r, 10, 7), K.cloth);
      shell.scale.set(1, 1, H.rz);
      shell.position.set(0.008, 0, H.z); g.add(shell);
      /* the rim ring is what separates a steel pot from a MICH from above */
      var rim = cylZ(THREE, H.r * 0.99, H.r + H.brim, H.brimH, 12, K.cloth);
      rim.position.set(0.008, 0, H.z - H.brimDrop); g.add(rim);
      if (H.ear > 0.001) {
        for (var s4 = -1; s4 <= 1; s4 += 2) {
          var ef = box(THREE, 0.150, 0.030, H.ear, K.cloth);
          ef.position.set(0.004, s4 * (H.r * 0.94), H.z - H.brimDrop - H.ear * 0.42);
          g.add(ef);
        }
      }
      if (H.shroud) {
        var sh2 = box(THREE, 0.052, 0.088, 0.036, K.gear);
        sh2.position.set(0.008 + H.r * 0.92, 0, H.z + 0.012); g.add(sh2);
      }
      if (H.rails) {
        for (var s5 = -1; s5 <= 1; s5 += 2) {
          var rr = box(THREE, 0.150, 0.012, 0.026, K.gear);
          rr.position.set(0.004, s5 * (H.r * 0.96), H.z - 0.030); g.add(rr);
        }
      }
      if (H.strap) {
        var cu = box(THREE, 0.070, 0.100, 0.045, K.gear);
        cu.position.set(0.070, 0, 1.548); g.add(cu);
      }
    }
    if (hasGear(P, "goggles")) {
      var go = box(THREE, 0.048, 0.245, 0.052, K.glass);
      go.position.set(0.070, 0, H.z - (H.soft ? 0.030 : H.brimDrop) + 0.010); g.add(go);
    }
    if (hasGear(P, "nvg")) {
      var mnt = box(THREE, 0.050, 0.048, 0.060, K.gear);
      mnt.position.set(0.150, 0, H.z + 0.006); g.add(mnt);
      for (var s6 = -1; s6 <= 1; s6 += 2) {
        var tu = cylX(THREE, 0.024, 0.024, 0.105, 8, K.gun);
        tu.position.set(0.212, s6 * 0.034, H.z - 0.006); g.add(tu);
      }
    }
    /* team colour: helmet band plus a brassard, so ownership still reads */
    var bandZ = H.soft ? H.z - 0.006 : H.z - H.brimDrop + H.brimH * 0.5 + 0.010;
    var bandR = H.soft ? H.r * 1.02 : H.r + H.brim * 0.35;
    var bq = new THREE.CylinderGeometry(bandR, bandR, 0.030, 12, 1, true);
    bq.rotateX(Math.PI / 2);
    var band = new THREE.Mesh(bq, K.team);
    band.position.set(0.008, 0, bandZ); g.add(band);
    var bra = box(THREE, 0.052, 0.026, 0.090, K.team);
    bra.position.set(0.010, shY + 0.030, 1.372); g.add(bra);

    /* ---------------------------------------------------------- weapon */
    var wep, hold;
    if (W.kind === "gun") { wep = buildGun(THREE, W, K); hold = "gun"; }
    else if (W.kind === "tube") { wep = buildTube(THREE, W, K); hold = "tube"; }
    else { wep = buildMortar(THREE, M, W, K); hold = "mortar"; }

    /* Carried across the body at whatever yaw keeps the fore-and-aft reach
       near 0.30 m. A 1.5 m MANPADS tube therefore lies almost square across
       the chest and a short carbine sits at a shallow angle -- which is both
       what soldiers actually do and what stops render3d's length-based
       rescale from shrinking the heavy-weapons teams. */
    var half = W.half || (W.len || 1.0) * 0.58;
    var yaw = Math.acos(Math.max(0.16, Math.min(0.86, 0.300 / half)));

    if (hold === "gun") {
      wep.position.set(hd + 0.092, 0.020, 1.232);
      wep.rotation.set(0.30, -0.22, yaw);
      addArm(THREE, g, K, -1, shY, shZ, -0.52, 0.30, -1.30, 0.12);
      addArm(THREE, g, K, 1, shY, shZ, -0.86, -0.26, -0.98, -0.16);
    } else if (hold === "tube") {
      /* up on the right shoulder, pointing forward and to the right, clear
         of the head */
      wep.position.set(hd + 0.030, -0.128, 1.462);
      wep.rotation.set(-0.16, -0.16, -yaw);
      addArm(THREE, g, K, -1, shY, shZ, -1.02, 0.16, -1.15, 0.05);
      addArm(THREE, g, K, 1, shY, shZ, -0.72, -0.52, -1.30, -0.30);
    } else {
      /* mortar tube slung over the shoulder, muzzle up and forward */
      wep.position.set(hd + 0.010, 0.150, 1.560);
      wep.rotation.set(0.0, -0.62, 0.95);
      addArm(THREE, g, K, -1, shY, shZ, -0.40, 0.30, -1.05, 0.20);
      addArm(THREE, g, K, 1, shY, shZ, -1.28, -0.42, -0.85, -0.10);
      var bp = baseplate(THREE, M, K);
      bp.position.set(-(hd + 0.115), -0.020, 1.180); g.add(bp);
    }
    g.add(wep);

    /* Put the boots exactly on z = 0 whatever the kit does. render3d only
       corrects models that dip BELOW the ground plane, so a figure whose
       lowest boot sole sat two centimetres high would hover. */
    var bb = new THREE.Box3().setFromObject(g);
    if (Math.abs(bb.min.z) > 1e-4)
      for (var q = 0; q < g.children.length; q++) g.children[q].position.z -= bb.min.z;

    packFigure(THREE, g);
    return g;
  }

  /* ------------------------------------------------------------ packing */

  /* Every part above is its own Mesh, which made a figure cost 43-54 draw
     calls for ~1.2k triangles, and render3d neither merges nor instances, so
     a squad cost hundreds. The only parts the engine moves are the two legs
     (render3d's walk cycle swings the thigh named leg.L / leg.R about its hip
     and folds userData.shin about the knee), so those keep their own meshes
     and transforms; everything else is baked into one mesh per material,
     with its world transform, normals and UVs, so the picture is the same.
     The figure then costs: 2 x (thigh, shin, boot) + one per material used
     by the rest (cloth, gear, skin, gun, team, and wood / glass where the
     row has them) = 11-13.

     hero_kit.js merges as it draws (its pens write triangles straight into
     per-material buffers) and loads after this file, so there is nothing
     there to call on finished meshes: this is the small hand-written merge. */
  function mergeParts(THREE, parts) {
    var nv = 0, ni = 0, p, i;
    for (p = 0; p < parts.length; p++) {
      var q0 = parts[p].geo, n0 = q0.attributes.position.count;
      nv += n0; ni += q0.index ? q0.index.count : n0;
    }
    var pos = new Float32Array(nv * 3), nor = new Float32Array(nv * 3), uv = new Float32Array(nv * 2);
    var idx = nv > 65535 ? new Uint32Array(ni) : new Uint16Array(ni);
    var v = new THREE.Vector3(), nm = new THREE.Matrix3(), o = 0, k = 0;
    for (p = 0; p < parts.length; p++) {
      var q = parts[p].geo, m = parts[p].m, P = q.attributes.position,
          N = q.attributes.normal, U = q.attributes.uv, n = P.count, I = q.index;
      nm.getNormalMatrix(m);
      var flip = m.determinant() < 0;
      for (i = 0; i < n; i++) {
        v.fromBufferAttribute(P, i).applyMatrix4(m);
        pos[(o + i) * 3] = v.x; pos[(o + i) * 3 + 1] = v.y; pos[(o + i) * 3 + 2] = v.z;
        if (N) {
          v.fromBufferAttribute(N, i).applyMatrix3(nm).normalize();
          nor[(o + i) * 3] = v.x; nor[(o + i) * 3 + 1] = v.y; nor[(o + i) * 3 + 2] = v.z;
        }
        /* a part with no UVs samples texel (0, 0) everywhere, as it did alone */
        if (U) { uv[(o + i) * 2] = U.getX(i); uv[(o + i) * 2 + 1] = U.getY(i); }
      }
      var cnt = I ? I.count : n;
      for (i = 0; i + 2 < cnt; i += 3) {
        var a = I ? I.getX(i) : i, b = I ? I.getX(i + 1) : i + 1, c = I ? I.getX(i + 2) : i + 2;
        idx[k++] = o + a;
        idx[k++] = o + (flip ? c : b);
        idx[k++] = o + (flip ? b : c);
      }
      o += n;
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    g.setIndex(new THREE.BufferAttribute(k < ni ? idx.slice(0, k) : idx, 1));
    g.computeBoundingBox(); g.computeBoundingSphere();
    return g;
  }

  /* bake every mesh under `root` (excluding `skip`) into one mesh per
     material, in root's own space, and hang the results on `host` */
  function bakeInto(THREE, root, list, host) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var order = [], by = {};
    for (var c = 0; c < list.length; c++) {
      list[c].traverse(function (o) {
        if (!o.isMesh) return;
        var id = o.material.uuid;
        if (!by[id]) { by[id] = { mat: o.material, parts: [] }; order.push(id); }
        by[id].parts.push({ geo: o.geometry, m: new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld) });
      });
    }
    for (var r = 0; r < list.length; r++) if (list[r].parent) list[r].parent.remove(list[r]);
    for (var j = 0; j < order.length; j++) {
      var B = by[order[j]];
      host.add(new THREE.Mesh(mergeParts(THREE, B.parts), B.mat));
      for (var d = 0; d < B.parts.length; d++) B.parts[d].geo.dispose();
    }
  }

  function packFigure(THREE, g) {
    var rest = [], legs = [];
    for (var i = 0; i < g.children.length; i++) {
      var ch = g.children[i];
      if (ch.name === "leg.L" || ch.name === "leg.R") legs.push(ch); else rest.push(ch);
    }
    /* each leg: the thigh and the shin stay as they are (they swing), and
       whatever hangs on the shin (boot, knee pad) becomes one mesh on it */
    for (var l = 0; l < legs.length; l++) {
      var sh = legs[l].userData.shin;
      if (sh && sh.children.length > 1) bakeInto(THREE, sh, sh.children.slice(), sh);
    }
    bakeInto(THREE, g, rest, g);
  }

  /* A hand-finished mesh already in UNIT_MODELS wins unless it is marked
     crude; this layer exists to give the era rosters their own kit. */
  function registerAll(override) {
    var made = 0, kept = 0;
    for (var id in INFKIT) {
      if (!Object.prototype.hasOwnProperty.call(INFKIT, id)) continue;
      if (!override && UNIT_MODELS[id] && !UNIT_MODELS[id].crude) { kept++; continue; }
      (function (Q, key) {
        UNIT_MODELS[key] = {
          len: Q.len || 0.9,
          build: function (THREE, M, C) { return build(THREE, M, C, Q); },
        };
      })(INFKIT[id], id);
      made++;
    }
    return { made: made, kept: kept };
  }

  return { build: build, registerAll: registerAll,
           HELMET: HELMET, WEB: WEB, WEAPON: WEAPON, CAMO: CAMO };
})();
