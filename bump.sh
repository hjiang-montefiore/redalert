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
# \1 followed by a digit is read as an octal escape, so \1 + "202609071436"
# became \120 = "P" and stamped "P2609071436". \g<1> is unambiguous.
s = re.sub(r'(<span id="buildid">)[^<]*',                   r'\g<1>' + V, s)
open("index.html", "w").write(s)
PY
echo "stamped build $V"
grep -c "?v=$V" index.html
