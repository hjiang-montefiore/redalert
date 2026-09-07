#!/bin/sh
# Re-stamps every <script src="js/..."> in index.html with a fresh version so
# browsers can never serve a stale mix of old and new game code.
# Run this after editing anything under js/.
V=$(date +%Y%m%d%H%M)
# sed -i differs between GNU and BSD (macOS), and BSD sed rejects \1 in this
# form outright - it stamped nothing at all and said "stamped" anyway. python3
# ships with both platforms and behaves the same on each.
python3 - "$V" <<'PY'
import re, sys
V = sys.argv[1]
s = open("index.html").read()
s = re.sub(r'(src="js/[A-Za-z0-9_/]+\.js)(\?v=\d+)?"',    r'\1?v=' + V + '"', s)
s = re.sub(r'(href="css/[A-Za-z0-9_/]+\.css)(\?v=\d+)?"', r'\1?v=' + V + '"', s)
s = re.sub(r'(<span id="buildid">)[^<]*',                   r'\1' + V, s)
open("index.html", "w").write(s)
PY
echo "stamped build $V"
grep -c "?v=$V" index.html
