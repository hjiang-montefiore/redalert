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

## Everything you reported is now done

- [x] Nuclear/ballistic silo countdown is GLOBAL, both sides, like Red Alert 2

- [x] Era chains - 40 single-machine roles down to 21
- [x] The scout that parks in your construction yard
- [x] The navy is too weak - a prereq deadlock, not the dice roll I blamed
- [x] Fixed-wing aircraft must not hangar; F-35, B-52 and AC-130 ordnance

- [x] SEAD complete: off the ramp, transit routes round a ring, and EW aircraft
      engage a radiating emitter automatically off a SHARED electronic picture

## Known data faults, recorded not swept

- [!] The 1980s American carrier has no strike aircraft. The F-14A is correctly
      withheld from ground attack (LANTIRN reached the squadrons in 1996), but
      the A-6E Intruder that really did that job from 1963 to 1997 is not in the
      roster at all - and G.deckAircraftFor fills a deck from the "cfighter"
      role, so there is nowhere for it to go without a new role. The honest fix
      is to add the Intruder, not to arm the Tomcat.

- [x] Corvette air defence - 24 hulls given their real point-defence fit.

- [x] eras.js duplicate keys - CLOSED. It was not twelve scattered mistakes: a
      476-line block was pasted twice at the foot of the file, producing ~57
      duplicated keys at a constant 578-line offset. The two copies were
      BYTE-IDENTICAL, so deleting the later one fixed every duplicate at once
      and changed nothing. Verified: 0 duplicates, both suites unchanged.

## Still to do, biggest first

- [!] Explore/exploit - DESIGNED AND REJECTED. Two of three reviewers returned
      BROKEN: the reward is uncentred and the drift clamp bounds q absolutely, so
      every arm converges to the same value and the bandit never exploits -
      exactly the 'randomness wearing a bandit's clothes' failure. Also: kills
      count units only, so razing a base scores zero; the 'rear' axis arm is
      mathematically unreachable; and it reads ref on a 5s liveness invariant
      using 8s. Needs redesigning, not patching.
- [x] Pre-trained doctrine prior - derived from CFG.DMG, modulating counterMix
- [x] Surface fleet audit - APPLIED IN FULL. The first pass fixed the six hulls
      the audit files named; sweeping the rest found 34 of 58 air-defence hulls
      could not engage an aircraft at all, and 37 mounts that targeted air with
      a warhead scoring 0.00 against it. Both closed, 41 live-fire checks.
- [x] Britain's V-force and France's Mirage IV - Valiant, Vulcan B.2 with Blue
      Steel, the Black Buck Vulcan, Mirage IVA and IVP. Every megaton round is
      held under release authority.
- [x] British, French and German 3D models - 93 vehicles given their own
      ARMOUR spec rows. The 24 left borrowing are sam/tel/radarv, deliberately:
      sam3d.js and tel3d.js hand-author those and load AFTER armour_specs.js,
      so a row here would replace a detailed launcher with a generic tube
      block - a regression.

## Known and not yet addressed

- [x] The AA Battery scores on the close-in intercept layer
- [x] "aggressive stance overrides the routing" - FIXED as a side effect of
      routing pickAirTarget by capability. It was never test isolation.
- [!] "a Weasel hears a radiating battery on its own receiver" still fails in a
      full run and passes in a split one. Present at HEAD before this work.
- [!] `radarGen` / `jamGen` do not exist - the generation contest runs on `from`,
      which conflates the hull's service date with the set inside it. This is a
      modelling gap and needs an owner decision, not a fix from me.
- [x] Five open-topped howitzers drawn with no gun - M44, M7B1 Priest, M110
      and two 122s - given turret:"opentop", which builds the real crew tub AND
      mounts the gun. (The first count of thirteen was wrong: the other eight
      are casemates, and armour3d does draw a gun for those.)
- [x] Units defaulted to e50 by the timeless-role branch are marked eraStamped
      (a guard: no timeless-role unit carries radar/radarQ/jam today, so the
      behavioural effect is nil until one does)
- [x] The 2D renderer gets all three alert rungs
- [x] Russia has a nuclear attack submarine line in every era - November,
      Victor I, Akula, Akula II, Yasen, Yasen-M

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
