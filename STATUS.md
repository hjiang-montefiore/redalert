# What was asked for, and where it is

Run `./status.sh` for this list plus live workflow progress, machine load and
recent commits. It reads the workflow journals directly, so it never waits for
anything to finish or time out.

Markers: `[x]` done and committed · `[~]` running now · `[ ]` queued ·
`[!]` blocked or needs a decision.

## Reported by you, and fixed

- [x] Rocket-launched scatterable mine, persistent until triggered - no timer
- [x] HARM and mobile ballistic missiles only fire when ordered
- [x] PAVE radar building, jammer building, strategic early warning
- [x] Radar/jammer generation gap - a modern jammer beats an old radar
- [x] Great Britain, France and Germany independent of NATO
- [x] Seven new theatres, plus the menu bug that hid them all
- [x] Donbas and Florida Straits 1962 - the two you named
- [x] Engineer capture: the flag changes and our units stop shooting it
- [x] The AI built concrete instead of an army (10 emplacements, 6 soldiers)
- [x] Every IFV in the game carried the same 1983 American missile
- [x] Seven navies' submarines audited - who can strike land and who cannot
- [x] Los Angeles, Seawolf and Virginia can reach the shore
- [x] The Trident is ejected, not fired - flight model
- [x] The Trident cold launch VISUAL - unlit underwater, breach, late ignition
- [x] E-2D was four times easier to jam than the E-2C it replaced
- [x] Low power kills the radar picture, SAM, silo and jammer
- [x] Spoken acknowledgement - "MCV reporting", "Running the ore"
- [x] Silo launch animation
- [x] Minimap attack warning, sign and sound
- [x] Per-class unit selection audio

## Running now

- [ ] (workflows stopped - designs salvaged, applying them by hand)

- [~] Era chains - 40 roles where one machine stands in for every decade
- [x] The scout that parks in your construction yard
- [~] The navy is too weak
- [~] Fixed-wing aircraft must not hangar; F-35, B-52 and AC-130 ordnance
- [~] Aircraft flee a detected SAM; EW aircraft engage radars automatically

## Queued

- [ ] Explore/exploit - the AI learns what works instead of repeating
- [ ] Pre-trained doctrine prior, which learning then overrides
- [ ] Surface fleet audit - 8 navies audited, findings salvaged, not yet applied
- [ ] Restore Britain's V-force and France's Mirage IV
- [ ] British, French and German 3D models - they borrow American hulls

## Known and not yet addressed

- [!] The AA Battery scores zero on both intercept layers
- [!] `radarGen` / `jamGen` do not exist - the generation contest runs on `from`
- [!] Units defaulted to an era by rules.js:3912 are not marked `eraStamped`,
      so a fabricated date is contested as if it were real
- [!] The 2D renderer gets only two of the three alert rungs; `Threat.flash`,
      `.banner` and `.shake` are read by render3d.js only
- [!] Russia has no nuclear attack submarine in any era - no November, Victor,
      Sierra, Akula or Yasen anywhere in the game

## How the work is verified

The behaviour suite is `_behtest.html`. Run it in the FOREGROUND - backgrounding
Chrome gets it killed by the sandbox at exit 144, and there is no `timeout`
command on this machine:

    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
      --headless=new --disable-gpu --no-sandbox --use-gl=swiftshader \
      --enable-unsafe-swiftshader --virtual-time-budget=400000 \
      --dump-dom "file://$PWD/_behtest.html"

then read the element `id="tout"`. Under load the full run gets killed, so it
can be split in halves - see the note in this file's history.

`_comp.html` is the match harness: it drives `Game.tick` directly with a brain
on both seats and prints the LIVE composition of each side. It runs 900 game
seconds in about a minute. Purchase totals are NOT the same as what is alive -
reading totals produced one wrong diagnosis here already.
