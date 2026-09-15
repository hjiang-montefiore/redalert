#!/bin/sh
# ============================================================================
#  status.sh - what is being worked on, right now, without waiting for anything
#
#  Run it any time:  ./status.sh
#  It reads the workflow journals directly, so it reports live progress rather
#  than waiting for a workflow to finish or time out. Costs nothing - no Chrome,
#  no game, just file reads.
#
#  Sections:
#    REQUESTS   every thing asked for, and whether it is done, running or queued
#    RUNNING    live agent workflows with real progress and whether they moved
#    MACHINE    load and browser count, because these decide how fast anything is
#    RECENT     the last commits, newest first
# ============================================================================
cd "$(dirname "$0")" || exit 1
ROOT=$(pwd)
WF="$HOME/.claude/projects/-Users-hjiang-Desktop-redalert/6321f229-fd3c-451c-bfae-d045a3e13cf4/subagents/workflows"

printf '\n\033[1m================ OPERATION IRONFRONT - STATUS ================\033[0m\n'
date '+  %Y-%m-%d %H:%M'

# ---------------------------------------------------------------- REQUESTS
printf '\n\033[1m-- REQUESTS ------------------------------------------------\033[0m\n'
if [ -f STATUS.md ]; then
  awk '
    /^## / { sect=substr($0,4); printf "\n  %s\n", sect; next }
    /^- / {
      line=substr($0,3)
      if (line ~ /^\[x\]/) { printf "    \033[32m done  \033[0m%s\n", substr(line,5) }
      else if (line ~ /^\[~\]/) { printf "    \033[33m RUN   \033[0m%s\n", substr(line,5) }
      else if (line ~ /^\[!\]/) { printf "    \033[31m BLOCK \033[0m%s\n", substr(line,5) }
      else if (line ~ /^\[ \]/) { printf "     wait  %s\n", substr(line,5) }
    }
  ' STATUS.md
else
  echo "  (STATUS.md missing)"
fi

# ---------------------------------------------------------------- RUNNING
printf '\n\033[1m-- RUNNING -------------------------------------------------\033[0m\n'
if [ ! -d "$WF" ]; then
  echo "  no workflow directory"
else
  python3 - "$WF" <<'PY'
import json, os, sys, time
WF = sys.argv[1]
now = time.time()
rows = []
for d in sorted(os.listdir(WF)):
    p = os.path.join(WF, d, 'journal.jsonl')
    if not os.path.isfile(p): continue
    name = ''; started = done = 0; phases = []
    try:
        for l in open(p):
            try: e = json.loads(l)
            except: continue
            t = e.get('type')
            if t == 'started': started += 1
            elif t == 'result': done += 1
            elif t == 'phase': phases.append(e.get('title') or '')
            if not name: name = e.get('workflowName') or e.get('name') or ''
    except Exception:
        continue
    ages = []
    try:
        for f in os.listdir(os.path.join(WF, d)):
            if f.startswith('agent-') and f.endswith('.jsonl'):
                a = now - os.path.getmtime(os.path.join(WF, d, f))
                if a < 86400: ages.append(int(a))
    except Exception: pass
    if not ages and done == 0: continue
    jage = int(now - os.path.getmtime(p))
    # Only this session's work. A run nobody has touched in six hours is
    # history, not status, and listing eight days of finished workflows buries
    # the two that are actually moving.
    if jage > 21600 and (not ages or min(ages) > 21600): continue
    live = len([a for a in ages if a < 300])
    fresh = min(ages) if ages else -1
    # finished workflows: journal old and nothing live
    # Only finished when every agent that started has returned. An old journal
    # is not evidence of completion - the era-chain run sat at 17/27 for half an
    # hour and this line reported it as done, which is exactly the blind spot
    # this script exists to remove.
    if done >= started and started > 0 and live == 0: state = 'done'
    elif live: state = 'RUN'
    elif jage > 900: state = 'STALL'
    else: state = 'idle'
    rows.append((state, name or d[:14], done, started, live, fresh, jage))
if not rows:
    print('  nothing running')
for state, name, done, started, live, fresh, jage in rows:
    if state == 'done': continue
    col = '\033[33m' if state == 'RUN' else ('\033[31m' if state == 'STALL' else '\033[90m')
    bar = ''
    if started:
        n = int(12.0 * done / max(started, 1))
        bar = '[' + '#' * n + '.' * (12 - n) + ']'
    print('  %s%-5s\033[0m %-34s %s %d/%d agents  live %d  last wrote %ss ago'
          % (col, state, name[:34], bar, done, started, live, fresh))
    if state == 'STALL':
        idle = fresh if fresh >= 0 else jage
        print('        \033[31mno agent has written in %d min. Usually a poll loop -' % (idle // 60))
        print('        an agent waiting on a backgrounded Chrome the sandbox killed.\033[0m')
PY
fi

# ---------------------------------------------------------------- MACHINE
printf '\n\033[1m-- MACHINE -------------------------------------------------\033[0m\n'
LOAD=$(uptime | awk -F'load average[s]*:' '{print $2}' | tr ',' ' ' | awk '{print $1}')
CHR=$(ps -eo comm 2>/dev/null | grep -c 'Google Chrome')
BUSY=$(ps -eo pcpu,comm 2>/dev/null | grep 'Google Chrome' | awk '$1>=1.0' | wc -l | tr -d ' ')
IDLE=$((CHR - BUSY))
printf '  load %-8s  chrome %s total (%s working, %s idle)\n' "$LOAD" "$CHR" "$BUSY" "$IDLE"
if [ "$IDLE" -gt 30 ]; then
  printf '  \033[31m%s idle browsers are leaked - they slow everything down\033[0m\n' "$IDLE"
  printf '    clear them:  ps -eo pid,pcpu,command | grep headless | awk "\\$2<1.0 {print \\$1}" | xargs kill\n'
fi
POLL=$(ps -eo command 2>/dev/null | grep -c 'until \[ -s')
[ "$POLL" -gt 1 ] && printf '  \033[31m%s orphaned poll loops spinning\033[0m\n' "$POLL"

# ---------------------------------------------------------------- RECENT
printf '\n\033[1m-- RECENT --------------------------------------------------\033[0m\n'
git -C "$ROOT" log --oneline -8 2>/dev/null | sed 's/^/  /'
DIRTY=$(git -C "$ROOT" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
if [ "$DIRTY" -gt 0 ]; then
  printf '  \033[33m%s file(s) uncommitted:\033[0m\n' "$DIRTY"
  git -C "$ROOT" status --short 2>/dev/null | sed 's/^/    /'
fi
printf '\n'
