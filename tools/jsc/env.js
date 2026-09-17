/* tools/jsc/env.js - a minimal browser for running IRONFRONT's test pages under
   JavaScriptCore. No rendering, no audio, no animation frames: the pages drive
   Game.tick themselves. The runner (run.py) prepends __IDS (the page's element
   ids with their default values) and __HASH/__SEARCH before this file. */
var window = this, self = this, globalThis = this;
var __store = {};
var localStorage = {
  getItem: function (k) { return Object.prototype.hasOwnProperty.call(__store, k) ? __store[k] : null; },
  setItem: function (k, v) { __store[k] = String(v); },
  removeItem: function (k) { delete __store[k]; },
};
var sessionStorage = localStorage;
var navigator = { userAgent: "jsc", language: "en", hardwareConcurrency: 4 };
var location = { hash: __HASH, search: __SEARCH, href: "file:///jsc" + __SEARCH + __HASH, reload: function () {} };
var history = { replaceState: function () {} };
var __t0 = Date.now();
var performance = { now: function () { return typeof preciseTime === "function" ? preciseTime() * 1000 : Date.now(); } };

/* ---- timers: a queue on a virtual clock, drained by run.py's driver ---- */
var __timers = [], __tid = 1, __vnow = 0;
function setTimeout(fn, ms) {
  if (typeof fn !== "function") return 0;
  var id = __tid++;
  __timers.push({ id: id, at: __vnow + Math.max(0, +ms || 0), fn: fn, args: Array.prototype.slice.call(arguments, 2) });
  return id;
}
function clearTimeout(id) { __timers = __timers.filter(function (t) { return t.id !== id; }); }
function setInterval(fn, ms) {
  var id = __tid++;
  var rep = function () { fn(); __timers.push({ id: id, at: __vnow + Math.max(1, +ms || 1), fn: rep, args: [] }); };
  __timers.push({ id: id, at: __vnow + Math.max(1, +ms || 1), fn: rep, args: [] });
  return id;
}
var clearInterval = clearTimeout;
/* animation frames never fire: nothing is drawn, and a live game loop running
   behind a finished test is exactly what made the old Chrome runs take hours */
function requestAnimationFrame() { return 0; }
function cancelAnimationFrame() {}
function queueMicrotask(fn) { setTimeout(fn, 0); }

/* ---- a permissive DOM ---- */
var __listeners = {};
function __mkClassList() {
  var s = {};
  return { add: function () { for (var i = 0; i < arguments.length; i++) s[arguments[i]] = 1; },
           remove: function () { for (var i = 0; i < arguments.length; i++) delete s[arguments[i]]; },
           toggle: function (c, f) { var on = f === undefined ? !s[c] : !!f; if (on) s[c] = 1; else delete s[c]; return on; },
           contains: function (c) { return !!s[c]; } };
}
function __ctx2d() {
  return new Proxy({ getImageData: function (x, y, w, h) { return { data: new Uint8ClampedArray(Math.max(1, w * h * 4)), width: w, height: h }; },
                     createImageData: function (w, h) { return { data: new Uint8ClampedArray(Math.max(1, w * h * 4)), width: w, height: h }; },
                     measureText: function (t) { return { width: String(t).length * 7 }; },
                     createLinearGradient: function () { return { addColorStop: function () {} }; },
                     createRadialGradient: function () { return { addColorStop: function () {} }; },
                     createPattern: function () { return {}; } },
    { get: function (t, k) { return k in t ? t[k] : function () {}; }, set: function (t, k, v) { t[k] = v; return true; } });
}
function __el(tag, id, value) {
  var e = {
    tagName: (tag || "div").toUpperCase(), id: id || "", style: {}, dataset: {}, classList: __mkClassList(),
    children: [], childNodes: [], parentNode: __orphanParent(), parentElement: __orphanParent(), value: value === undefined ? "" : value, checked: false,
    className: "", disabled: false, hidden: false, width: 300, height: 150,
    offsetWidth: 1280, offsetHeight: 800, clientWidth: 1280, clientHeight: 800,
    appendChild: function (c) {
      this.children.push(c); if (c) { c.parentNode = this; c.parentElement = this; }
      /* a select takes its first option's value, as a browser's does */
      if (c && this.tagName === "SELECT" && c.tagName === "OPTION" &&
          (this.value === "" || c.selected)) this.value = c.value;
      return c;
    },
    add: function (c) { return this.appendChild(c); },
    removeChild: function (c) { var i = this.children.indexOf(c); if (i >= 0) this.children.splice(i, 1); return c; },
    insertBefore: function (c) { this.children.push(c); return c; },
    remove: function () {}, replaceChildren: function () { this.children = []; },
    setAttribute: function (k, v) { this[k] = v; }, getAttribute: function (k) { return this[k] === undefined ? null : this[k]; },
    removeAttribute: function () {}, hasAttribute: function () { return false; },
    addEventListener: function () {}, removeEventListener: function () {}, dispatchEvent: function () {},
    focus: function () {}, blur: function () {}, click: function () { if (this.onclick) this.onclick({ isTrusted: false }); (this.__click || []).forEach(function (f) { f({ isTrusted: false, preventDefault: function () {} }); }); },
    querySelector: function (q) { return __qs(q); }, querySelectorAll: function () { return []; },
    getBoundingClientRect: function () { return { left: 0, top: 0, right: 1280, bottom: 800, width: 1280, height: 800 }; },
    getContext: function (k) { return k === "2d" ? __ctx2d() : null; },
    toDataURL: function () { return "data:,"; }, closest: function () { return null; }, contains: function () { return false; },
    scrollIntoView: function () {}, animate: function () { return { finished: Promise.resolve(), cancel: function () {} }; },
  };
  var inner = "";
  Object.defineProperty(e, "innerHTML", {
    get: function () { return inner; },
    set: function (v) {
      inner = String(v); __registerIds(inner);
      if (e.tagName === "SELECT") {
        var opts = inner.match(/<option\b[^>]*>/gi) || [], val = "";
        for (var i = 0; i < opts.length; i++) {
          var vm = opts[i].match(/value\s*=\s*["']([^"']*)["']/i), v2 = vm ? vm[1] : "";
          if (i === 0) val = v2;
          if (/\bselected\b/i.test(opts[i])) { val = v2; break; }
        }
        e.value = val; e.children = [];
      }
    },
  });
  var text = "";
  Object.defineProperty(e, "textContent", {
    get: function () { return text; },
    set: function (v) { text = String(v); if (e.id === "tout") __tout(text); },
  });
  e.addEventListener = function (type, fn) { if (type === "click") (e.__click = e.__click || []).push(fn); };
  return e;
}
var __els = {};
/* elements the page never attached still answer parentNode/parentElement */
var __orphan = null;
function __orphanParent() { return __orphan; }
/* "#id" finds a registered element; anything else (".cls", "#id span") gets a
   stand-in whose writes go nowhere - the HUD writes through selectors every
   frame and a null there would stop the page */
function __qs(q) {
  q = String(q || "");
  var m = q.match(/^#([\w-]+)$/);
  if (m) return __els[m[1]] || null;
  return __el("div");
}
/* markup assigned through innerHTML can carry ids the page then looks up -
   main.js builds the faction selects that way */
function __registerIds(markup) {
  var re = /<select\b[^>]*\bid\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/select>/gi, m;
  while ((m = re.exec(markup))) {
    var val = "", opts = m[2].match(/<option\b[^>]*>/gi) || [];
    for (var i = 0; i < opts.length; i++) {
      var vm = opts[i].match(/value\s*=\s*["']([^"']*)["']/i), v = vm ? vm[1] : "";
      if (i === 0) val = v;
      if (/\bselected\b/i.test(opts[i])) { val = v; break; }
    }
    if (!__els[m[1]]) __els[m[1]] = __el("select", m[1], val);
  }
  var re2 = /<([a-zA-Z0-9]+)\b[^>]*\bid\s*=\s*["']([^"']+)["'][^>]*>/g;
  while ((m = re2.exec(markup))) if (!__els[m[2]]) __els[m[2]] = __el(m[1], m[2], "");
}
for (var __k in __IDS) __els[__k] = __el(__IDS[__k][0], __k, __IDS[__k][1]);
if (!__els.tout) __els.tout = __el("pre", "tout", "");
__orphan = __el("div");
var __body = __el("body");
var document = {
  readyState: "complete", body: __body, documentElement: __el("html"), head: __el("head"), hidden: false,
  getElementById: function (id) { return __els[id] || null; },
  createElement: function (t) { return __el(t); },
  createElementNS: function (ns, t) { return __el(t); },
  createTextNode: function (t) { return { textContent: t }; },
  createDocumentFragment: function () { return __el("fragment"); },
  querySelector: function (q) { return __qs(q); },
  querySelectorAll: function () { return []; },
  getElementsByTagName: function () { return []; },
  addEventListener: function (t, f) { (__listeners["doc:" + t] = __listeners["doc:" + t] || []).push(f); },
  removeEventListener: function () {},
  fonts: { ready: Promise.resolve() },
};
window.addEventListener = function (t, f) { (__listeners["win:" + t] = __listeners["win:" + t] || []).push(f); };
window.removeEventListener = function () {};
window.matchMedia = function () { return { matches: false, addEventListener: function () {}, addListener: function () {} }; };
window.innerWidth = 1280; window.innerHeight = 800; window.devicePixelRatio = 1;
window.getComputedStyle = function () { return { getPropertyValue: function () { return ""; } }; };
var Image = function () { return __el("img"); };
var AudioContext = undefined, webkitAudioContext = undefined;
var ResizeObserver = function () { return { observe: function () {}, disconnect: function () {} }; };
var MutationObserver = ResizeObserver, IntersectionObserver = ResizeObserver;
var Event = function (t) { this.type = t; };
var CustomEvent = Event;
var alert = function (m) { print("[alert] " + m); }, confirm = function () { return true; }, prompt = function () { return null; };

/* ---- output: stream #tout as it grows, and console to stdout ---- */
var __printed = 0;
function __tout(text) {
  if (text.length < __printed) __printed = 0;              // rewritten from scratch
  var fresh = text.slice(__printed);
  var cut = fresh.lastIndexOf("\n");
  if (cut < 0) return;
  print(fresh.slice(0, cut));
  __printed += cut + 1;
}
function __toutFlush() { var t = __els.tout.textContent; if (t.length > __printed) print(t.slice(__printed)); __printed = t.length; }
var console = {
  log: function () { if (__QUIET_CONSOLE) return; print("[console] " + Array.prototype.join.call(arguments, " ")); },
  info: function () {}, debug: function () {},
  warn: function () { if (__QUIET_CONSOLE) return; print("[warn] " + Array.prototype.join.call(arguments, " ")); },
  error: function () { print("[error] " + Array.prototype.join.call(arguments, " ")); },
  profile: function () {}, profileEnd: function () {}, trace: function () {},
};
