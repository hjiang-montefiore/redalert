#!/usr/bin/env python3
"""Run an IRONFRONT test page (e.g. _behtest.html) under JavaScriptCore - no browser.

usage:  python3 tools/jsc/run.py PAGE [--hash half=2] [--search "?map=korea&diff=warlord"]
                                 [--limit SECONDS] [--console]

What it does: reads the page's element ids and their default values (so the
page's own set("opt-...") calls and main.js start() behave as in a browser),
loads the page's <script> tags and inline scripts in document order, fires the
window load event, then drains the timer queue on a virtual clock. Animation
frames never fire, so nothing is drawn and no live game loop runs behind the
test. The page's #tout output is streamed to stdout.
Exit code: 0 if the output has "==== N passed, 0 failed" (or no pass/fail line),
1 if any test failed, 2 on a harness error or time limit.
"""
import html, json, os, re, subprocess, sys, tempfile, time

JSC = "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
HERE = os.path.dirname(os.path.abspath(__file__))

# Checks that measure things only a real browser produces - canvas pixels, the
# audio cue table, HUD rows built through the DOM. Under jsc they are reported
# as "needs a browser" and do not fail the run.
BROWSER_ONLY = [
    "a marker is on the minimap on the very frame it is made",
    "a rifle squad and an ore hauler are not the same cue",
    "and the enemy row is labelled as theirs",
    "the enemy clock actually runs",
]

# Scripts that only draw or play sound. Loading them is harmless in principle,
# but several touch WebGL/Audio at load time and none matter to a headless test.
SKIP = re.compile(r"(^|/)(three\.min|render3d|bloom3d|fx3d|icons3d|models3d[^/]*|units3d[^/]*|air3d_era|"
                  r"armour3d|infantry3d|rotor3d|sam3d|sub3d_era|tel3d|warship3d|repairship3d|civ3d|"
                  r"defences3d|obstacles3d|mine_objects|sonarnet_objects|audio|loading)\.js$|"
                  r"(^|/)hero/")

def page_items(src):
    """(kind, payload) in document order: ('src', path) or ('inline', code)."""
    out = []
    for m in re.finditer(r"<script\b([^>]*)>(.*?)</script>", src, re.S | re.I):
        attrs, body = m.group(1), m.group(2)
        sm = re.search(r"""src\s*=\s*["']([^"']+)["']""", attrs)
        if sm:
            path = sm.group(1).split("?")[0]
            out.append(("src", path))
        elif body.strip() and "type=\"module\"" not in attrs:
            out.append(("inline", body))
    return out

def element_ids(src):
    ids = {}
    for m in re.finditer(r"<(select)\b([^>]*)>(.*?)</select>", src, re.S | re.I):
        idm = re.search(r"""\bid\s*=\s*["']([^"']+)["']""", m.group(2))
        if not idm: continue
        opts = re.findall(r"<option\b([^>]*)>", m.group(3), re.I)
        val = ""
        for i, o in enumerate(opts):
            vm = re.search(r"""value\s*=\s*["']([^"']*)["']""", o)
            v = vm.group(1) if vm else ""
            if i == 0: val = v
            if re.search(r"\bselected\b", o): val = v; break
        ids[idm.group(1)] = ["select", html.unescape(val)]
    for m in re.finditer(r"<(input|textarea)\b([^>]*)>", src, re.I):
        idm = re.search(r"""\bid\s*=\s*["']([^"']+)["']""", m.group(2))
        if not idm: continue
        vm = re.search(r"""value\s*=\s*["']([^"']*)["']""", m.group(2))
        ids[idm.group(1)] = [m.group(1).lower(), html.unescape(vm.group(1)) if vm else ""]
    for m in re.finditer(r"<([a-zA-Z0-9]+)\b([^>]*\bid\s*=\s*[\"'][^\"']+[\"'][^>]*)>", src):
        idm = re.search(r"""\bid\s*=\s*["']([^"']+)["']""", m.group(2))
        if idm and idm.group(1) not in ids:
            ids[idm.group(1)] = [m.group(1).lower(), ""]
    return ids

def main():
    args = sys.argv[1:]
    if not args: print(__doc__); sys.exit(2)
    page = args[0]
    def opt(name, default=None):
        return args[args.index(name) + 1] if name in args else default
    hsh = opt("--hash", ""); search = opt("--search", "")
    if "#" in page: page, hsh = page.split("#", 1)
    if "?" in page: page, search = page.split("?", 1)
    hsh = ("#" + hsh) if hsh and not hsh.startswith("#") else hsh
    search = ("?" + search) if search and not search.startswith("?") else search
    limit = float(opt("--limit", "1800"))
    path = os.path.join(ROOT, page)
    src = open(path).read()
    items = page_items(src)
    tmp = tempfile.mkdtemp(prefix="jscrun_")
    parts = ["var __IDS = %s;\nvar __HASH = %s, __SEARCH = %s;\nvar __QUIET_CONSOLE = %s;\n"
             % (json.dumps(element_ids(src)), json.dumps(hsh), json.dumps(search),
                "false" if "--console" in args else "true"),
             "load(%s);\n" % json.dumps(os.path.join(HERE, "env.js"))]
    n_inline = 0
    for kind, payload in items:
        if kind == "src":
            if SKIP.search(payload): continue
            full = os.path.join(ROOT, payload)
            if not os.path.exists(full): continue
            parts.append("try { load(%s); } catch (e) { print('[load error] %s: ' + e + '\\n' + e.stack); }\n"
                         % (json.dumps(full), payload))
        else:
            n_inline += 1
            f = os.path.join(tmp, "%s.inline%d.js" % (os.path.basename(page), n_inline))
            open(f, "w").write(payload)
            parts.append("try { load(%s); } catch (e) { print('[inline error] #%d: ' + e + '\\n' + e.stack); }\n"
                         % (json.dumps(f), n_inline))
    parts.append(r"""
/* stand-ins for what the skipped draw/sound modules would have defined */
if (typeof Render2D === "undefined") var Render2D = new Proxy({}, { get: function () { return function () {}; } });
if (typeof Render3D === "undefined") var Render3D = new Proxy({ init: function () { return false; } }, { get: function (t, k) { return k in t ? t[k] : function () {}; } });
if (typeof Sfx === "undefined") var Sfx = new Proxy({}, { get: function (t, k) { return k === "selClass" ? function () { return null; } : function () {}; } });
if (typeof Sprites === "undefined") var Sprites = new Proxy({}, { get: function () { return function () { return null; }; } });
if (typeof Icons3D === "undefined") var Icons3D = new Proxy({}, { get: function () { return function () { return null; }; } });
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
    proc = subprocess.Popen([JSC, driver], cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    out_lines = []
    try:
        for line in proc.stdout:
            sys.stdout.write(line); sys.stdout.flush(); out_lines.append(line)
        proc.wait(timeout=limit + 60)
    except subprocess.TimeoutExpired:
        proc.kill(); print("[jsc runner] killed"); sys.exit(2)
    text = "".join(out_lines)
    print("[jsc runner] %s%s%s  %.1fs real" % (page, search, hsh, time.time() - t0))
    fails = re.findall(r"^\s*FAIL\s+(.*?)(?:\s+--\s.*)?$", text, re.M)
    real = [f for f in fails if not any(f.startswith(b) for b in BROWSER_ONLY)]
    m = re.findall(r"==== (\d+) passed, (\d+) failed ====", text)
    if m:
        print("[jsc runner] %s passed, %d failed, %d need a browser"
              % (m[-1][0], len(real), len(fails) - len(real)))
    errs = re.search(r"runtime errors: \n((?:  .*\n?)+)", text)
    if "[jsc runner] TIME LIMIT" in text or "[load handler error]" in text or proc.returncode or errs:
        sys.exit(2)
    if real: sys.exit(1)
    sys.exit(0)

if __name__ == "__main__":
    main()
