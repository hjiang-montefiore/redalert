#!/usr/bin/env python3
"""The 3D half of the damage-state checks, under JavaScriptCore - no browser.

usage:  python3 tools/jsc/damage3d_check.py [--alloc] [--body FILE.js]

_behtest.html runs the 2D renderer and never loads three.js, so everything
that lives in the WebGL scene - the pooled particle layers, how many objects
the scene holds while a battle burns, where on a model the smoke comes out,
the list on a sinking ship - cannot be reached from there. This harness loads
index.html's own scripts in document order INCLUDING three.min.js, the model
packs and render3d.js, swaps WebGLRenderer and PMREMGenerator for stand-ins
that keep the scene graph and draw nothing, deploys a real battle through
main.js with the 3D renderer, and then drives Game.tick and Render3D.draw
itself. The checks are in damage3d_check.js next to this file.

--body runs another check body in place of damage3d_check.js (a probe).
--alloc runs the JavaScriptCore VM with its collector switched off, so the
heap can only grow; the steady-state section then reads heapCapacity() across
thousands of frames of the damage module and reports what it allocated.
Exit code: 0 if every check passed, 1 if any failed, 2 on a harness error.
"""
import json, os, re, subprocess, sys, tempfile, time

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
sys.path.insert(0, HERE)
import run as R   # the page parser the suite runner already uses

# Sound, the loading screen and the build-icon renderer are not what is being
# measured; bloom3d is left out so the plain render path is the one exercised.
SKIP = re.compile(r"(^|/)(audio|loading|icons3d|bloom3d|gallery)\.js$")

STUB = r"""
/* A WebGLRenderer that keeps the scene graph honest and draws nothing: render()
   updates world matrices exactly as the real one does before it draws, and
   counts what a frame would have submitted. */
(function () {
  function Stub(o) {
    this.domElement = (o && o.canvas) || document.createElement("canvas");
    this.shadowMap = { enabled: false, type: 0 };
    this.capabilities = { isWebGL2: true, getMaxAnisotropy: function () { return 8; } };
    this.info = { render: { calls: 0 }, memory: {} };
    this.frames = 0; this.pr = 1;
  }
  Stub.prototype.setPixelRatio = function (r) { this.pr = r; };
  Stub.prototype.getPixelRatio = function () { return this.pr; };
  Stub.prototype.setSize = function () {};
  Stub.prototype.setClearColor = function () {};
  Stub.prototype.setRenderTarget = function () {};
  Stub.prototype.getRenderTarget = function () { return null; };
  Stub.prototype.clear = function () {};
  Stub.prototype.dispose = function () {};
  Stub.prototype.compile = function () {};
  Stub.prototype.getContext = function () { return null; };
  Stub.prototype.render = function (scene, camera) {
    this.frames++;
    if (scene.matrixWorldAutoUpdate !== false) scene.updateMatrixWorld();
    if (camera.parent === null) camera.updateMatrixWorld();
    var n = 0;
    scene.traverseVisible(function (o) { if (o.isMesh || o.isPoints || o.isLine || o.isSprite) n++; });
    this.info.render.calls = n;
  };
  THREE.WebGLRenderer = Stub;
  THREE.PMREMGenerator = function () {};
  THREE.PMREMGenerator.prototype.fromEquirectangular = function () { return { texture: new THREE.Texture() }; };
  THREE.PMREMGenerator.prototype.fromScene = function () { return { texture: new THREE.Texture() }; };
  THREE.PMREMGenerator.prototype.compileEquirectangularShader = function () {};
  THREE.PMREMGenerator.prototype.dispose = function () {};
})();
"""

def main():
    args = sys.argv[1:]
    body = os.path.abspath(args[args.index("--body") + 1]) if "--body" in args else \
        os.path.join(HERE, "damage3d_check.js")
    page = os.path.join(ROOT, "index.html")
    src = open(page).read()
    tmp = tempfile.mkdtemp(prefix="dmg3d_")
    ids = R.element_ids(src)
    parts = ["var __IDS = %s;\nvar __HASH = %s, __SEARCH = %s;\nvar __QUIET_CONSOLE = true;\n"
             % (json.dumps(ids), json.dumps("#noloadscreen"), json.dumps("")),
             "var __ALLOC = %s;\n" % ("true" if "--alloc" in args else "false"),
             "load(%s);\n" % json.dumps(os.path.join(HERE, "env.js"))]
    stubf = os.path.join(tmp, "stub.js"); open(stubf, "w").write(STUB)
    n_inline = 0
    for kind, payload in R.page_items(src):
        if kind == "src":
            if SKIP.search(payload): continue
            full = os.path.join(ROOT, payload)
            if not os.path.exists(full): continue
            parts.append("try { load(%s); } catch (e) { print('[load error] %s: ' + e); }\n"
                         % (json.dumps(full), payload))
            if payload.endswith("three.min.js"):
                parts.append("load(%s);\n" % json.dumps(stubf))
        else:
            n_inline += 1
            f = os.path.join(tmp, "inline%d.js" % n_inline)
            open(f, "w").write(payload)
            parts.append("try { load(%s); } catch (e) { print('[inline error] #%d: ' + e); }\n"
                         % (json.dumps(f), n_inline))
    parts.append(r"""
if (typeof Sfx === "undefined") var Sfx = new Proxy({}, { get: function (t, k) { return k === "selClass" ? function () { return null; } : function () {}; } });
if (typeof Icons3D === "undefined") var Icons3D = new Proxy({}, { get: function () { return function () { return null; }; } });
(__listeners["doc:DOMContentLoaded"] || []).forEach(function (f) { try { f({}); } catch (e) { print("[DOMContentLoaded error] " + e); } });
(__listeners["win:load"] || []).forEach(function (f) { try { f({}); } catch (e) { print("[load handler error] " + e); } });
""")
    parts.append("load(%s);\n" % json.dumps(body))
    driver = os.path.join(tmp, "driver.js")
    open(driver, "w").write("".join(parts))
    cmd = [R.JSC] + (["--useGC=false"] if "--alloc" in args else []) + [driver]
    t0 = time.time()
    proc = subprocess.run(cmd, cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    sys.stdout.write(proc.stdout)
    print("[damage3d_check] %.1fs real" % (time.time() - t0))
    m = re.findall(r"==== (\d+) passed, (\d+) failed ====", proc.stdout)
    if proc.returncode or not m: sys.exit(2)
    sys.exit(1 if int(m[-1][1]) else 0)

if __name__ == "__main__":
    main()
