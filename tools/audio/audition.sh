#!/bin/sh
# tools/audio/audition.sh - play a folder of rendered sounds in order, each
# announced by name first, so the owner can sit back and listen through the
# whole catalogue (or a slice of it) without a browser.
#
#   tools/audio/audition.sh DIR [REGEX] [--no-say] [--gap SECONDS] [--volume 0..1]
#
#   DIR      a folder written by tools/audio/audition.py (it reads playlist.txt
#            for the spoken names; any folder of .wav files works too)
#   REGEX    only the files whose name matches (grep -E), e.g. 'wpn_gun_12'
#   --no-say print the names instead of speaking them
#   --gap    silence after each sound (default 0.6 s)
#   --volume afplay volume (default 1)
#
# macOS: afplay plays, say announces. Ctrl-C stops the whole run.
set -u
dir=""; pat=""; speak=1; gap=0.6; vol=1
while [ $# -gt 0 ]; do
  case "$1" in
    --no-say) speak=0 ;;
    --gap) shift; gap="$1" ;;
    --volume) shift; vol="$1" ;;
    -h|--help) sed -n '2,16p' "$0"; exit 0 ;;
    *) if [ -z "$dir" ]; then dir="$1"; else pat="$1"; fi ;;
  esac
  shift
done
[ -n "$dir" ] && [ -d "$dir" ] || { echo "usage: $0 DIR [REGEX] [--no-say] [--gap S] [--volume V]"; exit 2; }
command -v afplay >/dev/null 2>&1 || { echo "afplay not found (macOS only)"; exit 2; }
command -v say >/dev/null 2>&1 || speak=0
trap 'echo; echo "stopped"; exit 130' INT TERM

list="$dir/playlist.txt"
tmp=""
if [ ! -f "$list" ]; then
  tmp=$(mktemp -t audition); list="$tmp"
  for f in "$dir"/*.wav; do [ -f "$f" ] || continue; b=$(basename "$f"); printf '%s\t%s\n' "$b" "$(echo "${b%.wav}" | sed 's/^[0-9]*_//; s/_/ /g')"; done > "$list"
fi
total=$(grep -c . "$list"); n=0
while IFS="$(printf '\t')" read -r file label; do
  [ -n "$file" ] || continue
  n=$((n + 1))
  if [ -n "$pat" ] && ! echo "$file" | grep -Eq -- "$pat"; then continue; fi
  [ -f "$dir/$file" ] || { echo "missing $file"; continue; }
  printf '[%d/%d] %s  -  %s\n' "$n" "$total" "$file" "$label"
  if [ "$speak" = 1 ]; then say -r 210 "$label"; fi
  afplay -v "$vol" "$dir/$file"
  sleep "$gap"
done < "$list"
[ -n "$tmp" ] && rm -f "$tmp"
exit 0
