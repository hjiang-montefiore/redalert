/* ============ tools/audio/check_announcer.js - the base's voice, through the real Sfx ============

   run
       jsc tools/audio/check_announcer.js -- ROOT
   ROOT is the game tree. Exit status 0 and a last line "check_announcer:
   PASS" when every rule holds; a broken rule prints FAIL and the run ends on
   an uncaught error (jsc's quit() ignores its argument, a throw exits 3).

   WHY THIS EXISTS. tools/jsc/run.py replaces Sfx with a no-op, so the
   behaviour suite ([88]) can drive js/announcer.js and every event site but
   never the half of the voice that lives in js/audio.js: Sfx.announce, the
   key-up chirp the words wait for, the crews' vox() going through the
   arbiter, mute and volume reaching the words, and the alert rail's klaxon
   giving way to them. This loads js/audio.js and js/announcer.js untouched,
   with tools/audio/webaudio_emu.js as the AudioContext and a recording
   stand-in for speechSynthesis, and holds all of it:

     CHIRP      the `eva` cue is short (under 150 ms to -60 dB), sits under
                the loudest UI cue (`alarm`) and well above `order` and every
                selection cue in pitch (spectral centroid), so it is heard as
                the base keying up and never as a click on a unit
     ROUTE      Sfx.announce reaches the announcer; the chirp sounds first
                and the words follow it, not under it; the voice list is asked
                for as the page loads, so Chrome has it by the first line
     SHARED     vox() goes through the arbiter: a crew answer waits while
                the base speaks and cuts nothing off, then answers in a voice
                that is not hers; an answer the arbiter turns away does not
                spend vox()'s 1.6 s
     MUTE       Sfx.setEnabled(false) stops a line mid-word and keeps her
                silent; Sfx.volume(v) is the volume the words go out at;
                switching the crews off does not cut the base off
     KLAXON     the alert rail's `alarm` yields to a line the base is saying
                right now for the same event, and sounds as before when her
                line had to wait (it may yet go stale) or she said nothing
     NO VOICE   a page that loads js/audio.js without the announcer - every
                frozen harness page - keeps the old vox() exactly, and
                Sfx.announce is a quiet no-op there
   ========================================================================= */

var __ARGS = (typeof arguments !== "undefined") ? arguments : [];
(function () {
  "use strict";
  var ROOT = __ARGS[0];
  if (!ROOT) throw new Error("usage: jsc tools/audio/check_announcer.js -- ROOT");
  load(ROOT + "/tools/audio/webaudio_emu.js");
  load(ROOT + "/tools/audio/analysis.js");
  globalThis.__IDS = {}; globalThis.__HASH = ""; globalThis.__SEARCH = ""; globalThis.__QUIET_CONSOLE = true;
  load(ROOT + "/tools/jsc/env.js");
  WebAudioEmu.install(globalThis);
  var perfOff = 0;
  performance.now = function () { return 1e6 + perfOff; };     // a clock this check moves
  function wait(s) { perfOff += s * 1000; }
  globalThis.Render = { cam: { x: 2048, y: 2048, z: 1 } };

  var fails = 0, checks = 0;
  function judge(ok, what, detail) {
    checks++;
    print((ok ? "  ok    " : "  FAIL  ") + what + (detail ? "   -- " + detail : ""));
    if (!ok) fails++;
  }

  /* ---- the recording speech engine ---- */
  var VOICES = [{ name: "Alex", lang: "en-US" }, { name: "Samantha", lang: "en-US" }, { name: "Daniel", lang: "en-GB" }];
  var st = { spoken: [], cancels: 0, cur: null, asked: 0 };
  var syn = {
    speaking: false, pending: false,
    getVoices: function () { st.asked++; return VOICES; },
    speak: function (u) { st.spoken.push(u); st.cur = u; syn.speaking = true; },
    cancel: function () { st.cancels++; var u = st.cur; st.cur = null; syn.speaking = false; if (u && u.onerror) u.onerror({}); },
    addEventListener: function () {},
  };
  globalThis.speechSynthesis = syn;
  globalThis.SpeechSynthesisUtterance = function (t) { this.text = t; this.voice = null; this.pitch = 1; this.rate = 1; this.volume = 1; };
  function finish() { var u = st.cur; st.cur = null; syn.speaking = false; if (u && u.onend) u.onend({}); }
  function timers() {                       // env.js's queue, run now: the chirp's hold on the words
    for (var k = 0; k < 20 && __timers.length; k++) {
      __timers.sort(function (a, b) { return a.at - b.at || a.id - b.id; });
      var t = __timers.shift(); t.fn.apply(null, t.args);
    }
  }
  function last() { var u = st.spoken[st.spoken.length - 1]; return u ? u : null; }
  var tank = { kind: "unit", cat: "vehicle", dead: false, def: { role: "mbt", weapons: ["gun_120"] } };

  /* ---------------- CHIRP ---------------- */
  function fresh() { load(ROOT + "/js/audio.js"); Sfx.ensure(); return Sfx; }
  function render(name) {
    var S = fresh(), ctx = S.ctx;
    S.play(name);
    ctx.__renderUntilQuiet(4, 0.3);
    var out = ctx.__output(0.05);
    var lv = AudioAnalysis.levels(out.L, out.R, out.sampleRate);
    var sp = AudioAnalysis.spectrogram(out.L, out.R, out.sampleRate, { span: lv, rows: 64 });
    return { peak: lv.peak_dbfs, dur: lv.dur60_ms, end: lv.end60_ms, centroid: sp.centroid };
  }
  var eva = render("eva"), alarm = render("alarm"), order = render("order"), sel = render("sel_air"), click = render("click");
  print("cue        peak dBFS   to -60 dB   centroid");
  [["eva", eva], ["alarm", alarm], ["order", order], ["sel_air", sel], ["click", click]].forEach(function (r) {
    print("  " + (r[0] + "        ").slice(0, 9) + (r[1].peak).toFixed(1) + "       " + Math.round(r[1].end) + " ms      " + Math.round(r[1].centroid) + " Hz");
  });
  judge(isFinite(eva.peak) && eva.peak > -40, "the key-up chirp sounds", eva.peak.toFixed(1) + " dBFS");
  judge(eva.end < 150, "and is over in under 150 ms", Math.round(eva.end) + " ms");
  judge(eva.peak < alarm.peak, "and sits under the klaxon", eva.peak.toFixed(1) + " against " + alarm.peak.toFixed(1) + " dBFS");
  judge(eva.centroid > order.centroid + 300 && eva.centroid > sel.centroid + 300 && eva.centroid > click.centroid + 300,
        "and above `order`, `sel_air` and `click` in pitch, so it is never a click on a unit",
        Math.round(eva.centroid) + " Hz against " + Math.round(order.centroid) + ", " + Math.round(sel.centroid) + ", " + Math.round(click.centroid));

  /* ---------------- ROUTE ---------------- */
  var S = fresh();
  var asked0 = st.asked;
  load(ROOT + "/js/announcer.js");
  judge(typeof Sfx.announce === "function" && typeof Sfx.chirp === "function" && typeof Sfx.voiceLevel === "function",
        "Sfx carries announce, chirp and voiceLevel");
  judge(st.asked > asked0, "the voice list is asked for as the page loads (Chrome starts loading it on that first call)",
        (st.asked - asked0) + " call(s) before any line");
  var n0 = S.ctx.__stats().nodes, said = Sfx.announce("construction_complete");
  judge(said === "Construction complete." && S.ctx.__stats().nodes > n0 && st.spoken.length === 0,
        "Sfx.announce reaches the announcer, the chirp is laid first and the words wait for it",
        "nodes " + n0 + " -> " + S.ctx.__stats().nodes + ", spoken before the chirp " + st.spoken.length);
  timers();
  var u1 = last();
  judge(!!u1 && u1.text === said && u1.voice === VOICES[1] && u1.volume === 1, "then she says it, in Samantha's voice, at the player's volume",
        u1 ? (u1.voice && u1.voice.name) + " at " + u1.volume : "nothing said");

  /* ---------------- SHARED ---------------- */
  var n1 = st.spoken.length, c1 = st.cancels, v1 = Sfx.vox(tank, "select");
  judge(typeof v1 === "string" && st.spoken.length === n1 && st.cancels === c1, "a crew's answer while she speaks waits, and cuts nothing off");
  wait(0.5); finish();
  var u2 = last();
  judge(!!u2 && u2.text === v1 && u2.voice === VOICES[2] && u2.voice !== u1.voice,
        "when she is done, inside a second, the crew answers, in a voice that is not hers", u2 ? (u2.voice && u2.voice.name) + ": " + u2.text : "silent");
  finish(); wait(2);
  /* a full queue behind a critical line: the answer is turned away... */
  Sfx.announce("rig_clock", null, 120); timers();
  ["unit_ready", "construction_complete", "structure_lost", "hauler_lost"].forEach(function (k) { Sfx.announce(k); });
  var v3 = Sfx.vox(tank, "select");
  Announcer.hush();
  var n3 = st.spoken.length, v4 = Sfx.vox(tank, "order");
  judge(v3 === null && typeof v4 === "string" && st.spoken.length === n3 + 1 && last().text === v4,
        "an answer turned away (her queue full) does not spend the 1.6 s: the very next click is answered", String(v3) + " then " + v4);
  finish();

  /* ---------------- MUTE ---------------- */
  wait(30); Sfx.announce("unit_ready"); timers();
  var c2 = st.cancels; Sfx.setEnabled(false);
  judge(st.cancels === c2 + 1 && Sfx.voiceLevel() === 0 && Sfx.announce("insufficient_funds") === null,
        "mute stops a line mid-word and keeps her silent");
  Sfx.setEnabled(true); Sfx.volume(0.4); wait(30);
  Sfx.announce("low_power"); timers();
  var u3 = last();
  judge(!!u3 && u3.text === "Low power." && Math.abs(u3.volume - 0.4) < 1e-9, "the player's volume is the volume of the words", u3 ? String(u3.volume) : "silent");
  var c3 = st.cancels; Sfx.voxEnabled(false);
  judge(st.cancels === c3, "switching the crews off does not cut the base off");
  Sfx.voxEnabled(true); Sfx.volume(1); finish();

  /* ---------------- KLAXON ---------------- */
  wait(30);
  var k0 = S.ctx.__stats().nodes; Sfx.announce("cannot_deploy"); var k1 = S.ctx.__stats().nodes;
  Sfx.play("alarm"); var k2 = S.ctx.__stats().nodes;
  judge(k2 === k1, "the klaxon yields to a line she has just taken", (k1 - k0) + " nodes for the chirp, " + (k2 - k1) + " for the klaxon");
  timers(); finish(); wait(1);
  Sfx.play("alarm"); var k3 = S.ctx.__stats().nodes;
  judge(k3 > k2, "and sounds as before when she has said nothing", (k3 - k2) + " nodes");
  wait(30); Sfx.announce("rig_clock", null, 120); timers();
  var k4 = S.ctx.__stats().nodes, rq = Sfx.announce("cannot_build"); Sfx.play("alarm"); var k5 = S.ctx.__stats().nodes;
  judge(rq === "Cannot build there." && Announcer.state().queue.join() === "cannot_build" && k5 > k4,
        "a refusal that has to wait behind her keeps its klaxon - it may yet go stale, and the event is never left with neither",
        (k5 - k4) + " nodes for the klaxon, queue " + Announcer.state().queue.join());
  Announcer.hush();

  /* ---------------- NO VOICE ---------------- */
  globalThis.Announcer = undefined;
  var S2 = fresh(); wait(5);
  var c4 = st.cancels, n4 = st.spoken.length, v4 = S2.vox(tank, "order"), u4 = last();
  judge(S2.announce("construction_complete") === null && typeof v4 === "string" && st.spoken.length === n4 + 1 && st.cancels === c4 + 1 && u4.text === v4,
        "without the announcer: Sfx.announce is a no-op and vox() speaks as it always did (cancel, then speak)");

  print(fails ? "check_announcer: FAIL (" + fails + " of " + checks + " rules broken)" : "check_announcer: PASS (" + checks + " rules)");
  if (fails) throw new Error("check_announcer: " + fails + " rules broken");
})();
