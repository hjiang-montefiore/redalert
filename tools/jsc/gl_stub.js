/* tools/jsc/gl_stub.js - a WebGL2 context that draws nothing, so the REAL
   THREE.WebGLRenderer can run under JavaScriptCore.

   Why a stub context and not a stub renderer: render3d.js goes through the
   renderer for everything that matters to a leak or a frame budget - it
   uploads geometry on first draw and keeps it until dispose(), it builds one
   program per material variant, and it counts draw calls. A fake renderer
   would have to re-implement all three and would then measure itself. With a
   real WebGLRenderer over this context, renderer.info.memory.geometries is
   the number of geometries the GPU would be holding, renderer.info.programs
   is the shader variants compiled, and renderer.info.render.calls is the draw
   calls a frame issues - the three numbers a browser's WebGL inspector shows.

   It also keeps the source of every shader three.js composes (__GLSTUB.shaders)
   so a test can at least read what would have been compiled; nothing here can
   compile GLSL, and a shader that would fail in a browser passes here. Owner's
   rule: never launch a browser to find out (see tools/jsc/env.js).

   Loaded after env.js by tools/jsc/scene3d.py. */
var __GLSTUB = { shaders: [], contexts: 0 };
function WebGL2RenderingContext() {}
function WebGLRenderingContext() {}
(function () {
  var NUM = {
    7936: "stub", 7937: "stub", 7938: "WebGL 2.0 (jsc stub)",           // VENDOR RENDERER VERSION
    35724: "WebGL GLSL ES 3.00 (jsc stub)",                               // SHADING_LANGUAGE_VERSION
    3379: 4096, 34076: 4096, 34024: 4096, 3386: new Int32Array([4096, 4096]), // sizes
    34930: 16, 35660: 16, 35661: 32, 34921: 16, 36347: 1024, 36348: 32, 36349: 1024,
    36183: 4, 34047: 16, 32883: 2048, 35071: 256,
  };
  function vec4() { return new Int32Array([0, 0, 1, 1]); }
  function makeGL(canvas) {
    __GLSTUB.contexts++;
    var target = new WebGL2RenderingContext();
    target.canvas = canvas;
    target.drawingBufferWidth = canvas.width || 1;
    target.drawingBufferHeight = canvas.height || 1;
    var fns = {
      getExtension: function (n) {
        if (n === "EXT_texture_filter_anisotropic")
          return { MAX_TEXTURE_MAX_ANISOTROPY_EXT: 34047, TEXTURE_MAX_ANISOTROPY_EXT: 34046 };
        if (n === "EXT_color_buffer_float" || n === "OES_texture_float_linear") return {};
        return null;
      },
      getSupportedExtensions: function () { return ["EXT_color_buffer_float", "OES_texture_float_linear"]; },
      getParameter: function (p) {
        if (p === 2978 || p === 3088) return vec4();                     // VIEWPORT, SCISSOR_BOX
        if (p in NUM) return NUM[p];
        return 16;
      },
      getContextAttributes: function () {
        return { alpha: false, antialias: true, depth: true, stencil: false, premultipliedAlpha: true,
                 preserveDrawingBuffer: false, powerPreference: "high-performance",
                 failIfMajorPerformanceCaveat: false, xrCompatible: false };
      },
      getShaderPrecisionFormat: function () { return { precision: 23, rangeMin: 127, rangeMax: 127 }; },
      shaderSource: function (sh, src) { sh.src = src; __GLSTUB.shaders.push(src); },
      getShaderParameter: function () { return true; },
      getProgramParameter: function (pr, p) { return (p === 35718 || p === 35721) ? 0 : true; },
      getShaderInfoLog: function () { return ""; },
      getProgramInfoLog: function () { return ""; },
      getShaderSource: function (sh) { return sh.src || ""; },
      checkFramebufferStatus: function () { return 36053; },               // FRAMEBUFFER_COMPLETE
      isContextLost: function () { return false; },
      getError: function () { return 0; },
      getAttribLocation: function () { return -1; },
      getUniformLocation: function () { return {}; },
      createBuffer: function () { return {}; }, createTexture: function () { return {}; },
      createFramebuffer: function () { return {}; }, createRenderbuffer: function () { return {}; },
      createProgram: function () { return {}; }, createShader: function () { return {}; },
      createVertexArray: function () { return {}; }, createQuery: function () { return {}; },
      fenceSync: function () { return {}; }, clientWaitSync: function () { return 0; },
      isEnabled: function () { return false; },
    };
    return new Proxy(target, {
      get: function (t, k) {
        if (k in fns) return fns[k];
        if (k in t) return t[k];
        if (typeof k === "string" && /^[A-Z0-9_]+$/.test(k)) return 1;     // an enum
        return function () {};
      },
      set: function (t, k, v) { t[k] = v; return true; },
    });
  }
  /* every element env.js makes gets a getContext that can answer webgl2 */
  var base = __el;
  __el = function (tag, id, value) {
    var e = base(tag, id, value);
    var get2d = e.getContext;
    var gl = null;
    e.getContext = function (k) {
      if (k === "webgl2" || k === "webgl" || k === "experimental-webgl") return gl || (gl = makeGL(e));
      return get2d.call(e, k);
    };
    return e;
  };
  /* the page's own elements were made before env.js had an orphan parent to
     give them; render3d.js inserts its GL canvas next to #cv */
  for (var k in __els) if (__els[k] && !__els[k].parentElement) {
    __els[k].parentElement = __orphan; __els[k].parentNode = __orphan;
  }
  if (typeof window.innerWidth === "undefined") { window.innerWidth = 1496; window.innerHeight = 900; }
  if (typeof window.devicePixelRatio === "undefined") window.devicePixelRatio = 1;
})();
