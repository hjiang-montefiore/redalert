#!/usr/bin/env python3
"""Run a test script against the REAL 3D renderer under JavaScriptCore - no browser.

usage:  python3 tools/jsc/scene3d.py TEST.js [--page index.html] [--limit SECONDS]
                                     [--console] [-- ARGS...]

What it does: the same as run.py - element ids and defaults from the page, its
scripts in document order, the load event, then the timer queue on a virtual
clock - with two differences. The 3D scripts are NOT skipped (three.min.js,
render3d.js, fx3d.js, the model packs, ...), and tools/jsc/gl_stub.js is loaded
after env.js, so THREE.WebGLRenderer runs for real over a context that draws
nothing. renderer.info then reports what a browser's GPU would be holding.

TEST.js is loaded after the page's own scripts and before the load event. It
starts a match the way the test pages do (set the opt-* selects, click
btn-start with IRONFRONT_SYNC_START) and drives Game.tick and Render.draw
itself: animation frames never fire here. Anything after "--" reaches the
script as the global __ARGS (an array of strings).
Exit code: as run.py - 0 on "==== N passed, 0 failed" or no pass/fail line.
"""
import json, os, re, subprocess, sys, tempfile, time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import run as R                                    # page_items, element_ids, JSC, ROOT

# Only what makes sound or waits on a person: every draw module loads.
SKIP3D = re.compile(r"(^|/)(audio|loading)\.js$")

def main():
    args = sys.argv[1:]
    if not args or args[0].startswith("-"): print(__doc__); sys.exit(2)
    extra = []
    if "--" in args:
        i = args.index("--"); extra = args[i + 1:]; args = args[:i]
    test = os.path.abspath(args[0])
    def opt(name, default=None):
        return args[args.index(name) + 1] if name in args else default
    page = opt("--page", "index.html")
    limit = float(opt("--limit", "1800"))
    src = open(os.path.join(R.ROOT, page)).read()
    tmp = tempfile.mkdtemp(prefix="jsc3d_")
    parts = ["var __IDS = %s;\nvar __HASH = \"\", __SEARCH = \"\";\nvar __QUIET_CONSOLE = %s;\nvar __ARGS = %s;\n"
             % (json.dumps(R.element_ids(src)), "false" if "--console" in args else "true", json.dumps(extra)),
             "load(%s);\n" % json.dumps(os.path.join(HERE, "env.js")),
             "load(%s);\n" % json.dumps(os.path.join(HERE, "gl_stub.js"))]
    n_inline = 0
    for kind, payload in R.page_items(src):
        if kind == "src":
            if SKIP3D.search(payload): continue
            full = os.path.join(R.ROOT, payload)
            if not os.path.exists(full): continue
            parts.append("try { load(%s); } catch (e) { print('[load error] %s: ' + e + '\\n' + e.stack); }\n"
                         % (json.dumps(full), payload))
        else:
            n_inline += 1
            f = os.path.join(tmp, "inline%d.js" % n_inline)
            open(f, "w").write(payload)
            parts.append("try { load(%s); } catch (e) { print('[inline error] #%d: ' + e + '\\n' + e.stack); }\n"
                         % (json.dumps(f), n_inline))
    parts.append(r"""
if (typeof Sfx === "undefined") var Sfx = new Proxy({}, { get: function (t, k) { return k === "selClass" ? function () { return null; } : function () {}; } });
if (typeof LoadScreen === "undefined") var LoadScreen = { available: function () { return false; }, adopt: function () {},
  run: function (o) { o.stages.forEach(function (s) { s.run(); }); if (o.onReveal) o.onReveal(); } };
""")
    parts.append("try { load(%s); } catch (e) { print('[test load error] ' + e + '\\n' + e.stack); }\n" % json.dumps(test))
    parts.append(r"""
(__listeners["doc:DOMContentLoaded"] || []).forEach(function (f) { try { f({}); } catch (e) { print("[DOMContentLoaded error] " + e + "\n" + e.stack); } });
(__listeners["win:load"] || []).forEach(function (f) { try { f({}); } catch (e) { print("[load handler error] " + e + "\n" + e.stack); } });
var __deadline = Date.now() + __LIMIT * 1000, __steps = 0;
while (__timers.length) {
  if (Date.now() > __deadline) { __toutFlush(); print("[jsc runner] TIME LIMIT at game t=" + (typeof Game !== "undefined" ? Math.round(Game.time) : "?")); break; }
  __timers.sort(function (a, b) { return a.at - b.at || a.id - b.id; });
  var __t = __timers.shift();
  __vnow = Math.max(__vnow, __t.at);
  try { __t.fn.apply(null, __t.args); }
  catch (e) { print("[timer error] " + e + "\n" + String(e.stack).split("\n").slice(0, 6).join("\n")); }
  if (++__steps > 5e6) { print("[jsc runner] too many timers"); break; }
}
__toutFlush();
""".replace("__LIMIT", str(limit)))
    driver = os.path.join(tmp, "driver.js")
    open(driver, "w").write("".join(parts))
    t0 = time.time()
    proc = subprocess.Popen([R.JSC, driver], cwd=R.ROOT, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    out = []
    try:
        for line in proc.stdout:
            sys.stdout.write(line); sys.stdout.flush(); out.append(line)
        proc.wait(timeout=limit + 60)
    except subprocess.TimeoutExpired:
        proc.kill(); print("[jsc runner] killed"); sys.exit(2)
    text = "".join(out)
    print("[jsc runner] %s  %.1fs real" % (os.path.basename(test), time.time() - t0))
    m = re.findall(r"==== (\d+) passed, (\d+) failed ====", text)
    if "[jsc runner] TIME LIMIT" in text or "[load handler error]" in text or proc.returncode: sys.exit(2)
    if m and m[-1][1] != "0": sys.exit(1)
    sys.exit(0)

if __name__ == "__main__":
    main()
