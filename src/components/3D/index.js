/* eslint-disable */
// Credits to https://github.com/scriptonofficial/3d-shader-image-transition ❤️ Thanks

import THREE from "./bas";
import { TimelineMax, TweenMax, Power0 } from "gsap";

/// /////////////////
// UTILS
/// /////////////////

const utils = {
  extend(dst, src) {
    for (const key in src) {
      dst[key] = src[key];
    }

    return dst;
  },
  randSign() {
    return Math.random() > 0.5 ? 1 : -1;
  },
  ease(ease, t, b, c, d) {
    return b + ease.getRatio(t / d) * c;
  },
  fibSpherePoint: (function () {
    const vec = { x: 0, y: 0, z: 0 };
    const G = Math.PI * (3 - Math.sqrt(5));

    return function (i, n, radius) {
      const step = 2.0 / n;
      let r;
      let phi;

      vec.y = i * step - 1 + step * 0.5;
      r = Math.sqrt(1 - vec.y * vec.y);
      phi = i * G;
      vec.x = Math.cos(phi) * r;
      vec.z = Math.sin(phi) * r;

      radius = radius || 1;

      vec.x *= radius;
      vec.y *= radius;
      vec.z *= radius;

      return vec;
    };
  })(),
  spherePoint: (function () {
    return function (u, v) {
      u === undefined && (u = Math.random());
      v === undefined && (v = Math.random());

      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const vec = {};
      vec.x = Math.sin(phi) * Math.cos(theta);
      vec.y = Math.sin(phi) * Math.sin(theta);
      vec.z = Math.cos(phi);

      return vec;
    };
  })(),
};

/// /////////////////
// CLASSES
/// /////////////////

function SlideGeometry(model) {
  THREE.BAS.ModelBufferGeometry.call(this, model);
}

SlideGeometry.prototype = Object.create(
  THREE.BAS.ModelBufferGeometry.prototype
);
SlideGeometry.prototype.constructor = SlideGeometry;
SlideGeometry.prototype.bufferPositions = function () {
  const positionBuffer = this.createAttribute("position", 3).array;

  for (let i = 0; i < this.faceCount; i += 1) {
    const face = this.modelGeometry.faces[i];
    const centroid = THREE.BAS.Utils.computeCentroid(this.modelGeometry, face);

    const a = this.modelGeometry.vertices[face.a];
    const b = this.modelGeometry.vertices[face.b];
    const c = this.modelGeometry.vertices[face.c];

    positionBuffer[face.a * 3] = a.x - centroid.x;
    positionBuffer[face.a * 3 + 1] = a.y - centroid.y;
    positionBuffer[face.a * 3 + 2] = a.z - centroid.z;

    positionBuffer[face.b * 3] = b.x - centroid.x;
    positionBuffer[face.b * 3 + 1] = b.y - centroid.y;
    positionBuffer[face.b * 3 + 2] = b.z - centroid.z;

    positionBuffer[face.c * 3] = c.x - centroid.x;
    positionBuffer[face.c * 3 + 1] = c.y - centroid.y;
    positionBuffer[face.c * 3 + 2] = c.z - centroid.z;
  }
};

function Slide(width, height, animationPhase) {
  const plane = new THREE.PlaneGeometry(width, height, width * 2, height * 2);

  THREE.BAS.Utils.separateFaces(plane);

  const geometry = new SlideGeometry(plane);

  geometry.bufferUVs();

  const aAnimation = geometry.createAttribute("aAnimation", 2);
  const aStartPosition = geometry.createAttribute("aStartPosition", 3);
  const aControl0 = geometry.createAttribute("aControl0", 3);
  const aControl1 = geometry.createAttribute("aControl1", 3);
  const aEndPosition = geometry.createAttribute("aEndPosition", 3);

  let i;
  let i2;
  let i3;
  let i4;
  let v;

  const minDuration = 0.8;
  const maxDuration = 1.2;
  const maxDelayX = 0.9;
  const maxDelayY = 0.125;
  const stretch = 0.11;

  this.totalDuration = maxDuration + maxDelayX + maxDelayY + stretch;

  const startPosition = new THREE.Vector3();
  const control0 = new THREE.Vector3();
  const control1 = new THREE.Vector3();
  const endPosition = new THREE.Vector3();

  const tempPoint = new THREE.Vector3();

  function getControlPoint0(centroid) {
    const signY = Math.sign(centroid.y);

    tempPoint.x = THREE.Math.randFloat(0.1, 0.3) * 50;
    tempPoint.y = signY * THREE.Math.randFloat(0.1, 0.3) * 70;
    tempPoint.z = THREE.Math.randFloatSpread(20);

    return tempPoint;
  }

  function getControlPoint1(centroid) {
    const signY = Math.sign(centroid.y);

    tempPoint.x = THREE.Math.randFloat(0.3, 0.6) * 50;
    tempPoint.y = -signY * THREE.Math.randFloat(0.3, 0.6) * 70;
    tempPoint.z = THREE.Math.randFloatSpread(20);

    return tempPoint;
  }

  for (
    i = 0, i2 = 0, i3 = 0, i4 = 0;
    i < geometry.faceCount;
    i += 1, i2 += 6, i3 += 9, i4 += 12
  ) {
    const face = plane.faces[i];
    const centroid = THREE.BAS.Utils.computeCentroid(plane, face);

    // animation
    const duration = THREE.Math.randFloat(minDuration, maxDuration);
    const delayX = THREE.Math.mapLinear(
      centroid.x,
      -width * 0.5,
      width * 0.5,
      0.0,
      maxDelayX
    );
    let delayY;

    if (animationPhase === "in") {
      delayY = THREE.Math.mapLinear(
        Math.abs(centroid.y),
        0,
        height * 0.5,
        0.0,
        maxDelayY
      );
    } else {
      delayY = THREE.Math.mapLinear(
        Math.abs(centroid.y),
        0,
        height * 0.5,
        maxDelayY,
        0.0
      );
    }

    for (v = 0; v < 6; v += 2) {
      aAnimation.array[i2 + v] =
        delayX + delayY + Math.random() * stretch * duration;
      aAnimation.array[i2 + v + 1] = duration;
    }

    // positions

    endPosition.copy(centroid);
    startPosition.copy(centroid);

    if (animationPhase === "in") {
      control0.copy(centroid).sub(getControlPoint0(centroid));
      control1.copy(centroid).sub(getControlPoint1(centroid));
    } else {
      // out
      control0.copy(centroid).add(getControlPoint0(centroid));
      control1.copy(centroid).add(getControlPoint1(centroid));
    }

    for (v = 0; v < 9; v += 3) {
      aStartPosition.array[i3 + v] = startPosition.x;
      aStartPosition.array[i3 + v + 1] = startPosition.y;
      aStartPosition.array[i3 + v + 2] = startPosition.z;

      aControl0.array[i3 + v] = control0.x;
      aControl0.array[i3 + v + 1] = control0.y;
      aControl0.array[i3 + v + 2] = control0.z;

      aControl1.array[i3 + v] = control1.x;
      aControl1.array[i3 + v + 1] = control1.y;
      aControl1.array[i3 + v + 2] = control1.z;

      aEndPosition.array[i3 + v] = endPosition.x;
      aEndPosition.array[i3 + v + 1] = endPosition.y;
      aEndPosition.array[i3 + v + 2] = endPosition.z;
    }
  }

  const material = new THREE.BAS.BasicAnimationMaterial(
    {
      shading: THREE.FlatShading,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { type: "f", value: 0 },
      },
      shaderFunctions: [
        THREE.BAS.ShaderChunk.cubic_bezier,
        // THREE.BAS.ShaderChunk[(animationPhase === 'in' ? 'ease_out_cubic' : 'ease_in_cubic')],
        THREE.BAS.ShaderChunk.ease_in_out_cubic,
        THREE.BAS.ShaderChunk.quaternion_rotation,
      ],
      shaderParameters: [
        "uniform float uTime;",
        "attribute vec2 aAnimation;",
        "attribute vec3 aStartPosition;",
        "attribute vec3 aControl0;",
        "attribute vec3 aControl1;",
        "attribute vec3 aEndPosition;",
      ],
      shaderVertexInit: [
        "float tDelay = aAnimation.x;",
        "float tDuration = aAnimation.y;",
        "float tTime = clamp(uTime - tDelay, 0.0, tDuration);",
        "float tProgress = ease(tTime, 0.0, 1.0, tDuration);",
        // 'float tProgress = tTime / tDuration;'
      ],
      shaderTransformPosition: [
        animationPhase === "in"
          ? "transformed *= tProgress;"
          : "transformed *= 1.0 - tProgress;",
        "transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);",
      ],
    },
    {
      map: new THREE.Texture(),
    }
  );

  THREE.Mesh.call(this, geometry, material);

  this.frustumCulled = false;
}
Slide.prototype = Object.create(THREE.Mesh.prototype);
Slide.prototype.constructor = Slide;
Object.defineProperty(Slide.prototype, "time", {
  get() {
    return this.material.uniforms.uTime.value;
  },
  set(v) {
    this.material.uniforms.uTime.value = v;
  },
});

Slide.prototype.setImage = function (image) {
  this.material.uniforms.map.value.image = image;
  this.material.uniforms.map.value.needsUpdate = true;
};

Slide.prototype.transition = function () {
  return TweenMax.fromTo(
    this,
    1.2,
    { time: 0.0 },
    { time: this.totalDuration, ease: Power0.easeInOut }
  );
};

function THREERoot(params) {
  params = utils.extend(
    {
      fov: 60,
      zNear: 10,
      zFar: 100000,

      createCameraControls: true,
    },
    params
  );

  this.renderer = new THREE.WebGLRenderer({
    antialias: params.antialias,
    alpha: true,
  });
  this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  params.rootElement.appendChild(this.renderer.domElement);

  this.camera = new THREE.PerspectiveCamera(
    params.fov,
    window.innerWidth / window.innerHeight,
    params.zNear,
    params.zfar
  );

  this.scene = new THREE.Scene();

  if (params.createCameraControls) {
    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
  }

  this.resize = this.resize.bind(this);
  this.tick = this.tick.bind(this);

  this.resize();
  this.tick();

  window.addEventListener("resize", this.resize, false);
}
THREERoot.prototype = {
  tick() {
    this.update();
    this.render();
    requestAnimationFrame(this.tick);
  },
  update() {
    this.controls && this.controls.update();
  },
  render() {
    this.renderer.render(this.scene, this.camera);
  },
  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  },
};

function init(rootElement) {
  const root = new THREERoot({
    createCameraControls: !true,
    antialias: window.devicePixelRatio === 1,
    fov: 80,
    rootElement,
  });

  root.renderer.setClearColor(0x000000, 0);
  root.renderer.setPixelRatio(window.devicePixelRatio || 1);
  root.camera.position.set(0, 0, 60);

  const width = 30;
  const height = 40;

  const slide = new Slide(width, height, "out");
  const l1 = new THREE.ImageLoader();
  l1.setCrossOrigin("Anonymous");
  l1.load("./static/hand_detection.png", (img) => {
    slide.setImage(img);
  });
  root.scene.add(slide);

  const slide2 = new Slide(width, height, "in");
  const l2 = new THREE.ImageLoader();
  l2.setCrossOrigin("Anonymous");
  l2.load("./static/insta_bot.png", (img) => {
    slide2.setImage(img);
  });

  root.scene.add(slide2);

  const tl = new TimelineMax({ repeatDelay: 0, yoyo: true });

  tl.add(slide.transition(), 0);
  tl.add(slide2.transition(), 0);

  return tl;
}

export default init;
