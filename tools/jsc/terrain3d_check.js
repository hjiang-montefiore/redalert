/* tools/jsc/terrain3d_check.js - the ground the 3D view is drawn on, checked
   on the REAL renderer under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/terrain3d_check.js -- size=144
     python3 tools/jsc/scene3d.py tools/jsc/terrain3d_check.js -- size=288 map=fulda

   render3d.js buildTerrain makes one PlaneGeometry for the whole map, lifts
   its vertices to heightAt (the 'shore' and 'elevS' fields of map.js) and
   drapes the ground texture render.js paints (buildWorldTexture). Held here:
     - the mesh keeps 8/3 segments a tile up to 576 a side, 2 a tile at 288
       (HEAD: a fixed 384, so 1.33 a tile at 288), and every vertex stands
       at heightAt;
     - the texture is painted for this battle's map, at 21 px a tile until a
       4096 px side and thinner past it (HEAD: 21 px at every size, a 6048 px
       square at 288), and the 3D copy is the 2D bake's size;
     - the drape's UVs put every tile corner on the texel edge tx * PPT,
       ty * PPT, north at the canvas top (flipY), across the whole mesh;
     - the fog overlay draws the ground's own geometry, 1.2 m above it;
     - a screen pixel picks the ground (unproject) where three.js's raycast
       against the drawn triangles does, within 2 m, and costs under 1 ms
       (HEAD: the raycast itself, tens of ms at 144 and more at 288);
     - a save loaded over the battle (a new map in the same page) gets its
       ground painted again at its own size.
   Owner's rule: no browser, ever - the owner judges the look in their own. */
var TT = 32, PXM = 0.625, TILE_M = 20, ELEV_M = 10, PASS = 0, FAIL = 0;
var A = {};
(typeof __ARGS !== "undefined" ? __ARGS : []).forEach(function (s) { var i = s.indexOf("="); if (i > 0) A[s.slice(0, i)] = s.slice(i + 1); });
var MAP = A.map || "taiwan", SIZE = parseInt(A.size || "144", 10);
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
function r2(x) { return Math.round(x * 100) / 100; }

/* time the terrain build: from the big PlaneGeometry to its normals */
var buildT0 = 0, buildMs = -1;
(function () {
  var PG = THREE.PlaneGeometry;
  THREE.PlaneGeometry = function (w, h, sx, sy) {
    if (sx >= 64) buildT0 = preciseTime();
    var g = new PG(w, h, sx, sy);
    if (sx >= 64) g.userData.__terrain = true;
    return g;
  };
  var cvn = THREE.BufferGeometry.prototype.computeVertexNormals;
  THREE.BufferGeometry.prototype.computeVertexNormals = function () {
    var r = cvn.apply(this, arguments);
    if (this.userData && this.userData.__terrain && buildMs < 0) buildMs = (preciseTime() - buildT0) * 1000;
    return r;
  };
})();

window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", MAP); set("opt-mapsize", String(SIZE)); set("opt-era", "e80"); set("opt-aera", "e80");
  set("opt-seed", "btest"); set("opt-fog", "1"); set("opt-3d", "1");
  CFG.GFX_LEVEL = "medium";
  window.IRONFRONT_SYNC_START = true;
  var t0 = preciseTime();
  document.getElementById("btn-start").click();
  var startS = preciseTime() - t0;
  setTimeout(function () {
    log("terrain3d: " + MAP + " " + SIZE + ", start-up " + r2(startS) + " s");
    try { run(); } catch (e) { log("HARNESS CRASH " + e + "\n" + e.stack); FAIL++; }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* heightAt, written again from render3d.js: the shore ramp and the hills */
function heightAt(M, wx, wy) {
  var tx = wx / TT, ty = wy / TT, FS = M.FS, FW = M.FW, sh = M.shore, el = M.elevS;
  var fx = Math.max(0, Math.min(M.FW - 1.001, tx * FS - 0.5)), fy = Math.max(0, Math.min(M.FH - 1.001, ty * FS - 0.5));
  var xi = fx | 0, yi = fy | 0, ax = fx - xi, ay = fy - yi, i0 = yi * FW + xi;
  var s = sh[i0] + (sh[i0 + 1] - sh[i0]) * ax + (sh[i0 + FW] - sh[i0]) * ay +
    (sh[i0] - sh[i0 + 1] - sh[i0 + FW] + sh[i0 + FW + 1]) * ax * ay;
  var ex = Math.max(0, Math.min(M.W - 1.001, tx - 0.5)), ey = Math.max(0, Math.min(M.H - 1.001, ty - 0.5));
  var exi = ex | 0, eyi = ey | 0, eax = ex - exi, eay = ey - eyi, e0 = eyi * M.W + exi;
  var e = el[e0] + ((el[e0 + 1] || 0) - el[e0]) * eax + ((el[e0 + M.W] || 0) - el[e0]) * eay +
    (el[e0] - (el[e0 + 1] || 0) - (el[e0 + M.W] || 0) + (el[e0 + M.W + 1] || 0)) * eax * eay;
  if (s <= 0) return Math.max(-7, s * 1.6);
  return Math.min(2.2, s * 1.1) + e * ELEV_M;
}

function run() {
  var R = Render3D.three, M = Game.map, W = M.W, H = M.H;
  var meshes = R.scene.children.filter(function (o) { return o.isMesh; });
  var terr = meshes.filter(function (o) { return o.material && o.material.map && o.geometry.parameters &&
    o.geometry.parameters.widthSegments >= 64; })[0];
  var fog = meshes.filter(function (o) { return o.material && o.material.alphaMap && o.renderOrder === 40; })[0];
  chk("the terrain mesh and the fog overlay are in the scene", !!terr && !!fog);
  if (!terr) return;
  var geo = terr.geometry, P = geo.parameters, pos = geo.attributes.position, uv = geo.attributes.uv;
  var spt = Math.min(8 / 3, 576 / Math.max(W, H)), segX = Math.round(W * spt), segY = Math.round(H * spt);

  /* ---- segments and heights ---- */
  chk("segments: 8/3 a tile up to 576 a side (" + segX + " x " + segY + " for " + W + " tiles)",
      P.widthSegments === segX && P.heightSegments === segY,
      P.widthSegments + " x " + P.heightSegments + " = " + r2(P.widthSegments / W) + " a tile");
  chk("vertices: (segments + 1) squared", pos.count === (segX + 1) * (segY + 1),
      pos.count + " vertices, " + (P.widthSegments * P.heightSegments * 2) + " triangles, built in " + Math.round(buildMs) + " ms");
  var sizeX = W * TILE_M, sizeY = H * TILE_M, worstH = 0, worstAt = -1;
  for (var i = 0; i < pos.count; i++) {
    var mx = pos.getX(i) + sizeX / 2, mz = pos.getZ(i) + sizeY / 2;
    var d = Math.abs(pos.getY(i) - heightAt(M, mx / PXM, mz / PXM));
    if (d > worstH) { worstH = d; worstAt = i; }
  }
  chk("every vertex stands at heightAt (the shore and elevS fields)", worstH < 1e-3, "worst " + worstH.toFixed(5) + " m");
  chk("the mesh spans the map: 0..W x 0..H tiles in metres",
      Math.abs(terr.position.x - sizeX / 2) < 1e-6 && Math.abs(terr.position.z - sizeY / 2) < 1e-6 &&
      Math.abs(P.width - sizeX) < 1e-6 && Math.abs(P.height - sizeY) < 1e-6);

  /* ---- the texture ---- */
  var tex = terr.material.map, img = tex.image, wt = Game._worldTex;
  var ppt = Math.max(10, Math.min(21, Math.floor(4096 / Math.max(W, H))));
  chk("the ground is painted for this map: " + ppt + " px a tile, a " + (W * ppt) + " px side",
      img.width === W * ppt && img.height === H * ppt, img.width + " x " + img.height + " = " + r2(img.width / W) + " px a tile, " +
      r2(img.width * img.height * 4 / 1e6) + " MB a canvas");
  chk("no side over 4096 px", img.width <= 4096 && img.height <= 4096);
  chk("the 3D copy is the 2D bake's size (minimap and 2D view read the bake)",
      !!wt && wt.width === img.width && wt.height === img.height);
  chk("the drape is flipped so the canvas top is the north edge", tex.flipY === true);

  /* ---- the drape: tile corners on texel edges, at the detail it was painted at ---- */
  var TWp = img.width, THp = img.height, pp = TWp / W, worstUV = 0, corners = 0, worstC = 0;
  for (var iy = 0; iy <= segY; iy++) for (var ix = 0; ix <= segX; ix++) {
    var k = iy * (segX + 1) + ix;
    var mx2 = pos.getX(k) + sizeX / 2, mz2 = pos.getZ(k) + sizeY / 2;
    var colT = uv.getX(k) * TWp, rowT = (1 - uv.getY(k)) * THp;           // texel the drape samples
    var colW = mx2 / TILE_M * pp, rowW = mz2 / TILE_M * pp;                // texel the bake painted there
    var e1 = Math.max(Math.abs(colT - colW), Math.abs(rowT - rowW));
    if (e1 > worstUV) worstUV = e1;
    if ((ix * W) % segX === 0 && (iy * H) % segY === 0) {                  // a tile corner
      corners++;
      var tx = ix * W / segX, ty = iy * H / segY;
      var e2 = Math.max(Math.abs(colT - tx * pp), Math.abs(rowT - ty * pp));
      if (e2 > worstC) worstC = e2;
    }
  }
  chk("every vertex samples the texel painted under it", worstUV < 0.01, "worst " + worstUV.toFixed(5) + " texel");
  chk("tile corners land on texel edges tx*PPT, ty*PPT", corners > 100 && worstC < 0.01,
      corners + " corners, worst " + worstC.toFixed(5) + " texel");
  var nw = 0;   // the north-west vertex
  chk("vertex 0 is the north-west corner, drawn from texel (0, 0)",
      Math.abs(pos.getX(nw) + sizeX / 2) < 1e-3 && Math.abs(pos.getZ(nw) + sizeY / 2) < 1e-3 &&
      Math.abs(uv.getX(nw)) < 1e-6 && Math.abs(uv.getY(nw) - 1) < 1e-6);

  /* ---- the fog overlay ---- */
  chk("the fog overlay draws the ground's own geometry", fog.geometry === geo);
  chk("... 1.2 m above it", Math.abs(fog.position.y - terr.position.y - 1.2) < 1e-6 &&
      fog.position.x === terr.position.x && fog.position.z === terr.position.z);

  /* ---- picking the ground ---- */
  var Wv = window.innerWidth - 216, Hv = window.innerHeight, cam = Render3D.cam;
  var rc = new THREE.Raycaster(), worstP = 0, sumP = 0, nP = 0, miss = 0, tPick = 0, nPick = 0, tRay = 0, nRay = 0;
  var poses = [
    { x: Game.human.homeX, y: Game.human.homeY, dist: 430 },
    { x: W * TT / 2, y: H * TT / 2, dist: 1200 },
    { x: Game.players[1].homeX, y: Game.players[1].homeY, dist: 130 },
  ];
  /* and one over a coast, where the ground turns hardest */
  for (var y = 8; y < H - 8 && poses.length < 4; y += 3) for (var x = 8; x < W - 8; x += 3)
    if (M.terrain[y * W + x] === T.WATER && M.terrain[y * W + x + 3] !== T.WATER) { poses.push({ x: (x + 2) * TT, y: y * TT, dist: 260 }); break; }
  poses.forEach(function (ps, pi) {
    cam.x = ps.x; cam.y = ps.y; cam.dist = ps.dist; cam.yaw = -Math.PI / 4 + pi * 0.9;
    Render.draw(CFG.DT, UI.input);
    R.camera.updateMatrixWorld(true);
    for (var gy = 0; gy < 5; gy++) for (var gx = 0; gx < 7; gx++) {
      var px = (gx + 0.5) / 7 * Wv, py = (gy + 0.5) / 5 * Hv;
      var t0 = preciseTime(); var a = Render3D.unproject(px, py); tPick += preciseTime() - t0; nPick++;
      rc.setFromCamera({ x: px / Wv * 2 - 1, y: 1 - py / Hv * 2 }, R.camera);
      var t1 = preciseTime(); var hit = rc.intersectObject(terr, false)[0]; tRay += preciseTime() - t1; nRay++;
      if (!hit) { miss++; continue; }
      var dm = Math.hypot(a.x * PXM - hit.point.x, a.y * PXM - hit.point.z);
      if (dm > worstP) worstP = dm;
      sumP += dm; nP++;
    }
  });
  for (var j = 0; j < 400; j++) { var t2 = preciseTime(); Render3D.unproject((j * 37) % Wv, (j * 53) % Hv); tPick += preciseTime() - t2; nPick++; }
  var pickUs = tPick / nPick * 1e6, rayMs = tRay / nRay * 1e3;
  chk("a screen pixel picks the ground where the drawn triangles are (" + nP + " pixels, " + poses.length + " views)",
      nP > 80 && worstP < 2.0, "worst " + r2(worstP) + " m, mean " + r2(sumP / Math.max(1, nP)) + " m, " + miss + " off the ground");
  chk("picking costs under 1 ms a call", pickUs < 1000,
      "unproject " + Math.round(pickUs) + " us a call; a raycast of the mesh " + r2(rayMs) + " ms");
  var info = R.renderer.info.render;
  log("  info  a frame draws " + info.triangles + " triangles in " + info.calls + " calls (terrain and fog overlay " +
      (P.widthSegments * P.heightSegments * 4) + ")");

  /* ---- a new map in the same page ---- */
  var opts = Object.assign({}, Game.opts, { mapSize: 96 });
  Game.init(opts);
  var wt2 = Render2D.getWorldTex(Game);
  chk("a new map in the same page is painted again at its own size (96 tiles: 21 px, 2016 px)",
      wt2.world.width === 96 * 21 && wt2.ore.width === 96 * 21 && Game._worldTex === wt2.world,
      "world " + wt2.world.width + ", ore " + wt2.ore.width);
}
