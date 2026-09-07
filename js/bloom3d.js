/* ============ bloom3d.js — light bleed for the battlefield ============
   Three.js ships a bloom pass, but only as an ES module under examples/,
   which cannot be loaded from the classic script tags this game uses. So
   this is a self-contained one written against core Three only.

   The order matters. Bloom has to see the scene BEFORE tone mapping, or the
   bright things have already been compressed to white and there is nothing
   left to bleed. So when bloom is on:

     scene -> HDR target (linear, no tone map)
           -> bright pass (threshold with a soft knee, quarter resolution)
           -> separable gaussian blur, two octaves
           -> composite: scene + bloom, then ACES, then sRGB, to the canvas

   Everything already emissive gets the benefit for free: muzzle flashes,
   tracer rounds, missile exhausts, burning wrecks and explosions.

   If anything at all goes wrong during setup the module reports failure and
   the renderer falls back to drawing straight to the canvas, tone mapping
   and all, exactly as it did before.                                      */
var Bloom3D = (function () {
  "use strict";

  var VERT = [
    "varying vec2 vUv;",
    "void main() {",
    "  vUv = uv;",
    "  gl_Position = vec4(position.xy, 0.0, 1.0);",
    "}",
  ].join("\n");

  /* keep only what is brighter than the threshold, easing in over a knee so
     the transition does not band on gradients */
  var BRIGHT = [
    "uniform sampler2D tSrc;",
    "uniform float uThresh;",
    "uniform float uKnee;",
    "varying vec2 vUv;",
    "void main() {",
    "  vec3 c = texture2D(tSrc, vUv).rgb;",
    "  float b = max(c.r, max(c.g, c.b));",
    "  float soft = clamp((b - uThresh + uKnee) / (2.0 * uKnee), 0.0, 1.0);",
    "  soft = soft * soft * uKnee;",
    "  float w = max(soft, b - uThresh) / max(b, 0.0001);",
    "  gl_FragColor = vec4(c * w, 1.0);",
    "}",
  ].join("\n");

  /* nine-tap gaussian, run once across and once down */
  var BLUR = [
    "uniform sampler2D tSrc;",
    "uniform vec2 uStep;",
    "varying vec2 vUv;",
    "void main() {",
    "  float w0 = 0.2270270270;",
    "  float w1 = 0.3162162162;",
    "  float w2 = 0.0702702703;",
    "  vec3 c = texture2D(tSrc, vUv).rgb * w0;",
    "  c += texture2D(tSrc, vUv + uStep * 1.3846153846).rgb * w1;",
    "  c += texture2D(tSrc, vUv - uStep * 1.3846153846).rgb * w1;",
    "  c += texture2D(tSrc, vUv + uStep * 3.2307692308).rgb * w2;",
    "  c += texture2D(tSrc, vUv - uStep * 3.2307692308).rgb * w2;",
    "  gl_FragColor = vec4(c, 1.0);",
    "}",
  ].join("\n");

  /* add the glow back, then tone map and encode — this is the only pass that
     writes to the canvas, so it owns both */
  var COMPOSITE = [
    "uniform sampler2D tScene;",
    "uniform sampler2D tBloomA;",
    "uniform sampler2D tBloomB;",
    "uniform float uStrength;",
    "uniform float uExposure;",
    "varying vec2 vUv;",
    "vec3 aces(vec3 x) {",
    "  float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;",
    "  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);",
    "}",
    "vec3 toSRGB(vec3 c) {",
    "  vec3 lo = c * 12.92;",
    "  vec3 hi = 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;",
    "  return mix(hi, lo, step(c, vec3(0.0031308)));",
    "}",
    "void main() {",
    "  vec3 base = texture2D(tScene, vUv).rgb;",
    "  vec3 glow = texture2D(tBloomA, vUv).rgb * 0.62",
    "            + texture2D(tBloomB, vUv).rgb * 0.38;",
    "  vec3 c = base + glow * uStrength;",
    "  c = aces(c * uExposure);",
    "  gl_FragColor = vec4(toSRGB(c), 1.0);",
    "}",
  ].join("\n");

  function quadMesh(THREE, material) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(
      [-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));
    return new THREE.Mesh(g, material);
  }

  function makeRT(THREE, w, h, type) {
    var rt = new THREE.WebGLRenderTarget(Math.max(2, w | 0), Math.max(2, h | 0), {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: type,
      depthBuffer: false,
      stencilBuffer: false,
    });
    rt.texture.generateMipmaps = false;
    return rt;
  }

  /* Build a compositor for this renderer. Returns null if the device cannot
     support it, in which case the caller keeps rendering the old way. */
  function create(THREE, renderer, w, h, opts) {
    opts = opts || {};
    try {
      var half = THREE.HalfFloatType;
      /* a float target is what makes values above 1.0 survive to be bloomed;
         without the extension there is nothing to bleed and we decline */
      if (!renderer.capabilities.isWebGL2 &&
          !renderer.extensions.get("OES_texture_half_float")) return null;

      var scenePass = makeRT(THREE, w, h, half);
      scenePass.depthBuffer = true;
      /* the depth buffer has to be recreated with the target, so build it via
         the constructor rather than by mutating the flag afterwards */
      scenePass.dispose();
      scenePass = new THREE.WebGLRenderTarget(Math.max(2, w | 0), Math.max(2, h | 0), {
        minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat, type: half,
        depthBuffer: true, stencilBuffer: false,
      });
      scenePass.texture.generateMipmaps = false;

      var hw = Math.max(2, (w / 2) | 0), hh = Math.max(2, (h / 2) | 0);
      var qw = Math.max(2, (w / 4) | 0), qh = Math.max(2, (h / 4) | 0);

      var brightRT = makeRT(THREE, hw, hh, half);
      var pingA    = makeRT(THREE, hw, hh, half);
      var pongA    = makeRT(THREE, hw, hh, half);
      var pingB    = makeRT(THREE, qw, qh, half);
      var pongB    = makeRT(THREE, qw, qh, half);

      var mBright = new THREE.ShaderMaterial({
        uniforms: { tSrc: { value: null }, uThresh: { value: opts.threshold || 0.86 },
                    uKnee: { value: opts.knee || 0.35 } },
        vertexShader: VERT, fragmentShader: BRIGHT, depthTest: false, depthWrite: false });
      var mBlur = new THREE.ShaderMaterial({
        uniforms: { tSrc: { value: null }, uStep: { value: new THREE.Vector2() } },
        vertexShader: VERT, fragmentShader: BLUR, depthTest: false, depthWrite: false });
      var mComp = new THREE.ShaderMaterial({
        uniforms: {
          tScene:    { value: scenePass.texture },
          tBloomA:   { value: pongA.texture },
          tBloomB:   { value: pongB.texture },
          uStrength: { value: opts.strength === undefined ? 0.85 : opts.strength },
          uExposure: { value: opts.exposure || 1.0 },
        },
        vertexShader: VERT, fragmentShader: COMPOSITE, depthTest: false, depthWrite: false });

      var fsScene = new THREE.Scene();
      var fsCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      var quad = quadMesh(THREE, mBright);
      quad.frustumCulled = false;
      fsScene.add(quad);

      var api = {
        ok: true,
        width: w, height: h,

        setSize: function (nw, nh) {
          if (nw === this.width && nh === this.height) return;
          this.width = nw; this.height = nh;
          scenePass.setSize(Math.max(2, nw | 0), Math.max(2, nh | 0));
          var a = Math.max(2, (nw / 2) | 0), b = Math.max(2, (nh / 2) | 0);
          var c = Math.max(2, (nw / 4) | 0), d = Math.max(2, (nh / 4) | 0);
          brightRT.setSize(a, b); pingA.setSize(a, b); pongA.setSize(a, b);
          pingB.setSize(c, d); pongB.setSize(c, d);
        },

        setStrength: function (v) { mComp.uniforms.uStrength.value = v; },

        render: function (scene, camera) {
          var prevTarget = renderer.getRenderTarget();
          /* 1. the scene, linear and untone-mapped, so highlights stay hot */
          renderer.setRenderTarget(scenePass);
          renderer.clear();
          renderer.render(scene, camera);

          /* 2. isolate the bright pixels at half resolution */
          quad.material = mBright;
          mBright.uniforms.tSrc.value = scenePass.texture;
          renderer.setRenderTarget(brightRT);
          renderer.render(fsScene, fsCam);

          /* 3. two octaves of separable blur */
          quad.material = mBlur;
          function blur(src, mid, dst, sw, sh) {
            mBlur.uniforms.tSrc.value = src.texture;
            mBlur.uniforms.uStep.value.set(1 / sw, 0);
            renderer.setRenderTarget(mid);
            renderer.render(fsScene, fsCam);
            mBlur.uniforms.tSrc.value = mid.texture;
            mBlur.uniforms.uStep.value.set(0, 1 / sh);
            renderer.setRenderTarget(dst);
            renderer.render(fsScene, fsCam);
          }
          var aw = Math.max(2, (api.width / 2) | 0), ah = Math.max(2, (api.height / 2) | 0);
          var bw = Math.max(2, (api.width / 4) | 0), bh = Math.max(2, (api.height / 4) | 0);
          blur(brightRT, pingA, pongA, aw, ah);
          /* the wide octave starts from the tight one, so it spreads further */
          mBlur.uniforms.tSrc.value = pongA.texture;
          mBlur.uniforms.uStep.value.set(1 / bw, 0);
          renderer.setRenderTarget(pingB);
          renderer.render(fsScene, fsCam);
          mBlur.uniforms.tSrc.value = pingB.texture;
          mBlur.uniforms.uStep.value.set(0, 1 / bh);
          renderer.setRenderTarget(pongB);
          renderer.render(fsScene, fsCam);

          /* 4. back together, tone mapped and encoded, onto the canvas */
          quad.material = mComp;
          mComp.uniforms.tScene.value = scenePass.texture;
          mComp.uniforms.tBloomA.value = pongA.texture;
          mComp.uniforms.tBloomB.value = pongB.texture;
          renderer.setRenderTarget(prevTarget);
          renderer.render(fsScene, fsCam);
        },

        dispose: function () {
          [scenePass, brightRT, pingA, pongA, pingB, pongB].forEach(function (t) {
            try { t.dispose(); } catch (e) {}
          });
          [mBright, mBlur, mComp].forEach(function (m) {
            try { m.dispose(); } catch (e) {}
          });
          try { quad.geometry.dispose(); } catch (e) {}
        },
      };
      return api;
    } catch (e) {
      return null;
    }
  }

  return { create: create };
})();
