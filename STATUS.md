# What was asked for, and where it is

Run `./status.sh` for this list plus live workflow progress, machine load and
recent commits. It reads the workflow journals directly, so it never waits for
anything to finish or time out.

Markers: `[x]` done and committed · `[~]` running now · `[ ]` queued ·
`[!]` blocked or needs a decision.

## Reported by you, and fixed

- [x] The batch in "Expansion, a standing budget" is now VERIFIED: behaviour
      suite 78 + 99 passed / 0 failed in halves, naval 67/0, learner 8/0,
      models 5/0.
- [x] Derricks pipeline 22 tiles instead of being exempt from the radius
- [x] Obstacles no longer EXTEND the build radius (the 20-credit razor-wire
      chain reached any node on the map, for the player as well)
- [x] A standing budget: CFG.BASE_INCOME, 5 credits a second, every player
- [x] The AI can use the MCV - G.deployRig was written into the UI keyboard
      handler against G.human, so the game's own stated way to expand was
      available to the player and to nobody else

- [x] A B-52 flew 0.0 tiles in sixty seconds while attacking; an AC-130 hovered
- [x] The AI worked its own corner dry and never expanded for more oil

- [x] The AI built almost no aircraft at Elite and Warlord - an else-if ladder
      that ended on a purchase it could not make, a fighter rule that deadlocked
      at zero, and a one-airbase ceiling on the whole air force

- [x] B-2, F/A-18 and Growler launched themselves and never stayed landed
- [x] Self-launch is the EW aircraft's privilege: find the emitter, shoot it, flee
- [x] Fuel was only added at base - the boom was chosen and then overwritten

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

- [x] The 1980s American carrier can strike land - A-6A, A-6E TRAM and A-6E
      SWIP added in a new "cstrike" deck role, and G.deckAircraftFor now gives
      one spot in three to a strike aircraft where the navy has one. An e80
      deck sails as 2 Tomcats, 1 Intruder and an ASW helo instead of a single
      squadron. The Tomcat is still correctly unable to bomb.

- [x] Corvette air defence - 24 hulls given their real point-defence fit.

- [x] eras.js duplicate keys - CLOSED. It was not twelve scattered mistakes: a
      476-line block was pasted twice at the foot of the file, producing ~57
      duplicated keys at a constant 578-line offset. The two copies were
      BYTE-IDENTICAL, so deleting the later one fixed every duplicate at once
      and changed nothing. Verified: 0 duplicates, both suites unchanged.

## Still to do, biggest first

- [x] Explore/exploit - SHIPPED on the third attempt. Three force postures
      (armour / gunline / swarm) under UCB1 over PER-ARM sample means, with NO
      centring: a constant common to all arms cancels in the argmax, and that
      baseline is exactly what broke both earlier designs. Scored on a
      40-second interval rather than per push, because measurement showed a
      full match is DECIDED at t=577 having produced exactly ONE push - the
      sample rate was the binding constraint, not the estimator, and neither
      adversarial review had looked at it. Measured on three seeds: every
      commander scores 9-15 intervals, tries all three arms, and separates
      them (spread 0.12-0.56). Verified by _learn.html.
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
- [x] "a Weasel hears a radiating battery on its own receiver" - CLOSED, and it
      was never test isolation. The SAM was DARK: the suite stacks several
      batteries and a dozen structures on the enemy across earlier sections, the
      grid could not carry them, and the brownout rule switched the battery off.
      A Weasel that hears nothing from an unpowered radar is right. The test
      builds generation until the grid is up, and now reports emitting/
      radiating/range on a miss instead of only a set size.
- [x] `radarGen` / `jamGen` - the electronic contest keys off the SET now, not
      the airframe. France and Taiwan fly E-2Cs today and were being scored as
      2020s radars; an APS-145 is dated e00 and an E-2D's APY-9 e20.
- [x] A parked radar or jamming aircraft is off the air. G.emitting() always
      said so and jamAt/jamAgainst/radarCovers always asked; the FOG REVEAL and
      G.airTrack never did.
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
      --enable-unsafe-swiftshader --virtual-time-budget=900000 \
      --dump-dom "file://$PWD/_behtest.html#half=1"

RUN IT IN HALVES: append #half=1 or #half=2. A HASH, not a query string - on a
file:// URL Chrome resolves ?half=1 as part of the FILENAME, the page never
loads, the run finishes in eleven seconds and the output is empty, which reads
exactly like a suite that passed nothing. Each half is about 35 seconds; the
whole thing together had grown past what one run is allowed.

AND DO NOT TIME IT FROM INSIDE THE PAGE. --virtual-time-budget VIRTUALISES
Date.now(), so an in-page timer reports 0 ms while the machine burns four
minutes. Every "0 ms" measurement taken that way is a lie. Time it with the
shell's `time`.

then read the element `id="tout"`. Under load the full run gets killed, so it
can be split in halves - see the note in this file's history.

`_learn.html` is the learner harness, built on the same pattern: a brain on
both seats, and it prints each commander's per-arm estimates as the match runs.
Pass a seed with `?seed=learnB`. Use it for anything that has to be measured
over a whole match rather than in a scenario.

`_comp.html` is the match harness: it drives `Game.tick` directly with a brain
on both seats and prints the LIVE composition of each side. It runs 900 game
seconds in about a minute. Purchase totals are NOT the same as what is alive -
reading totals produced one wrong diagnosis here already.
