'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Effect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';

type PixelBlastVariant = 'square' | 'circle' | 'triangle' | 'diamond';

export interface PixelBlastProps {
  variant?: PixelBlastVariant;
  pixelSize?: number;
  color?: string;
  patternScale?: number;
  patternDensity?: number;
  pixelSizeJitter?: number;
  enableRipples?: boolean;
  rippleIntensityScale?: number;
  rippleThickness?: number;
  rippleSpeed?: number;
  liquid?: boolean;
  liquidStrength?: number;
  liquidRadius?: number;
  liquidWobbleSpeed?: number;
  speed?: number;
  edgeFade?: number;
  transparent?: boolean;
  noiseAmount?: number;
  className?: string;
  style?: React.CSSProperties;
}

const createTouchTexture = () => {
  const size = 64;
  const data = new Float32Array(size * size * 4);
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  interface Trail {
    x: number;
    y: number;
    age: number;
    force: number;
    vx: number;
    vy: number;
  }
  const trail: Trail[] = [];
  const maxAge = 64;
  let radius = 0.1 * size;
  const speed = 1 / maxAge;

  const clear = () => {
    data.fill(0);
  };

  const drawPoint = (point: Trail) => {
    const pos = {
      x: point.x * size,
      y: point.y * size
    };
    let intensity = 1;
    if (point.age < maxAge * 0.3) {
      intensity = point.age / (maxAge * 0.3);
    } else {
      intensity = 1 - (point.age - maxAge * 0.3) / (maxAge * 0.7);
    }
    intensity *= point.force;

    const radiusSq = radius * radius;
    const minX = Math.max(0, Math.floor(pos.x - radius));
    const maxX = Math.min(size - 1, Math.ceil(pos.x + radius));
    const minY = Math.max(0, Math.floor(pos.y - radius));
    const maxY = Math.min(size - 1, Math.ceil(pos.y + radius));

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const dx = pos.x - x;
        const dy = pos.y - y;
        const dd = dx * dx + dy * dy;
        if (dd > radiusSq) continue;
        const d = Math.sqrt(dd);
        const t = 1 - d / radius;
        const a = t * intensity;
        const idx = (y * size + x) * 4;
        data[idx] += point.vx * a;
        data[idx + 1] += point.vy * a;
        data[idx + 2] += a;
        data[idx + 3] = 1;
      }
    }
  };

  const addTouch = (x: number, y: number) => {
    let force = 0;
    let vx = 0;
    let vy = 0;
    const last = trail[trail.length - 1];
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      vx = dx / (d || 1);
      vy = dy / (d || 1);
      force = Math.min(dd * 10000, 1);
    }
    trail.push({ x, y, age: 0, force, vx, vy });
  };

  const update = () => {
    clear();
    for (let i = trail.length - 1; i >= 0; i--) {
      const point = trail[i];
      const f = point.force * speed * (1 - point.age / maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;
      if (point.age > maxAge) {
        trail.splice(i, 1);
      }
    }
    for (let i = 0; i < trail.length; i++) {
      drawPoint(trail[i]);
    }
    texture.needsUpdate = true;
  };

  return {
    texture,
    addTouch,
    update,
    set radiusScale(v: number) {
      radius = 0.1 * size * v;
    }
  };
};

const LiquidFragment = /* glsl */ `
uniform sampler2D uTexture;
uniform float uStrength;
void mainUv(inout vec2 uv) {
  vec4 tex = texture2D(uTexture, uv);
  vec2 disp = tex.rg * uStrength;
  uv += disp;
}
`;

class LiquidEffect extends Effect {
  constructor(texture: THREE.Texture, strength = 0.05) {
    super('LiquidEffect', LiquidFragment, {
      uniforms: new Map<string, THREE.Uniform>([
        ['uTexture', new THREE.Uniform(texture)],
        ['uStrength', new THREE.Uniform(strength)]
      ])
    });
  }
}

const VERTEX_SRC = /* glsl */ `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const SHAPE_MAP: Record<PixelBlastVariant, number> = {
  square: 0,
  circle: 1,
  triangle: 2,
  diamond: 3
};

const createFragment = () => /* glsl */ `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;
uniform int uShapeType;
uniform sampler2D uClickTex;

const int MAX_CLICKS = 10;
uniform vec2 uClickPos[MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
#define Bayer4(a) (Bayer2(0.5 * (a)) * 0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(0.5 * (a)) * 0.25 + Bayer2(a))

float hash11(float n) {
  return fract(sin(n) * 43758.5453);
}
float vnoise(vec3 p) {
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = dot(ip + vec3(0.0, 0.0, 0.0), vec3(1.0, 57.0, 113.0));
  float n100 = dot(ip + vec3(1.0, 0.0, 0.0), vec3(1.0, 57.0, 113.0));
  float n010 = dot(ip + vec3(0.0, 1.0, 0.0), vec3(1.0, 57.0, 113.0));
  float n110 = dot(ip + vec3(1.0, 1.0, 0.0), vec3(1.0, 57.0, 113.0));
  float n001 = dot(ip + vec3(0.0, 0.0, 1.0), vec3(1.0, 57.0, 113.0));
  float n101 = dot(ip + vec3(1.0, 0.0, 1.0), vec3(1.0, 57.0, 113.0));
  float n011 = dot(ip + vec3(0.0, 1.0, 1.0), vec3(1.0, 57.0, 113.0));
  float n111 = dot(ip + vec3(1.0, 1.0, 1.0), vec3(1.0, 57.0, 113.0));
  vec3 w = fp * fp * (3.0 - 2.0 * fp);
  float x00 = mix(hash11(n000), hash11(n100), w.x);
  float x10 = mix(hash11(n010), hash11(n110), w.x);
  float x01 = mix(hash11(n001), hash11(n101), w.x);
  float x11 = mix(hash11(n011), hash11(n111), w.x);
  float y0 = mix(x00, x10, w.y);
  float y1 = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}
float fbm2(vec2 uv, float t) {
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 0.0;
  for (int i = 0; i < 5; ++i) {
    sum += amp * vnoise(p * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return sum * 0.5 + 0.5;
}
float maskCircle(vec2 p, float cov) {
  float r = sqrt(cov) * 1.0;
  float d = length(p - 0.5) / r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(1.0 - aa, 1.0 + aa, d));
}
float maskTriangle(vec2 p, vec2 id, float cov) {
  if (mod(id.x + id.y, 2.0) > 0.5) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d = p.y - (1.0 - p.x);
  float aa = fwidth(d);
  return cov * smoothstep(r, r - aa - 0.0001, d * 1.0);
}
float maskDiamond(vec2 p, float cov) {
  float r = sqrt(cov) * 1.0;
  return step(length(abs(p - 0.5)) / r, 0.5) * cov;
}
void main() {
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * 0.5;
  float aspectRatio = uResolution.x / uResolution.y;
  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);
  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);
  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;
  float feed = base + (uDensity - 0.5) * 0.3;
  const float speed = 0.3;
  float pixelRipple = 0.0;
  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i) {
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      vec2 cuv = (((pos - uResolution * 0.5 - cellPixelSize * 0.5) / uResolution) * vec2(aspectRatio, 1.0));
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring = exp(-pow((r - waveR) / uRippleThickness, 2.0));
      float atten = exp(-1.5 * t) * smoothstep(1.0, 0.0, r);
      pixelRipple += ring * atten;
    }
    feed = max(feed, pixelRipple * uRippleIntensity);
  }
  float bayer = Bayer8(fragCoord / pixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);
  float coverage = bw;
  float h = hash11(pixelId.x * 57.0 + pixelId.y * 113.0);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float finalCoverage = coverage * jitterScale;
  int shape = uShapeType;
  float M;
  if (shape == 0) {
    M = finalCoverage;
  } else if (shape == 1) {
    M = maskCircle(pixelUV, finalCoverage);
  } else if (shape == 2) {
    M = maskTriangle(pixelUV, pixelId, finalCoverage);
  } else {
    M = maskDiamond(pixelUV, finalCoverage);
  }
  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }
  vec3 color = uColor;
  fragColor = vec4(color, M);
}
`;

const PixelBlast: React.FC<PixelBlastProps> = ({
  variant = 'square',
  pixelSize = 4,
  color = '#B19EEF',
  patternScale = 2,
  patternDensity = 1,
  pixelSizeJitter = 0,
  enableRipples = true,
  rippleIntensityScale = 1,
  rippleThickness = 0.1,
  rippleSpeed = 0.4,
  liquid = false,
  liquidStrength = 0.1,
  liquidRadius = 1,
  liquidWobbleSpeed = 4.5,
  speed = 0.5,
  edgeFade = 0.5,
  transparent = true,
  noiseAmount = 0,
  className,
  style
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const threeRef = useRef<any>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof window === 'undefined') return;

    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) {
      // WebGL2 unsupported; bail out gracefully.
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: transparent,
      powerPreference: 'high-performance'
    });
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const clickPos = new Array(10).fill(0).map(() => new THREE.Vector2(-1, -1));
    const clickTimes = new Float32Array(10);
    let clickIx = 0;

    const uniforms: Record<string, THREE.IUniform> = {
      uResolution: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uClickPos: { value: clickPos },
      uClickTimes: { value: clickTimes },
      uShapeType: { value: SHAPE_MAP[variant] ?? 0 },
      uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
      uScale: { value: patternScale },
      uDensity: { value: patternDensity },
      uPixelJitter: { value: pixelSizeJitter },
      uEnableRipples: { value: enableRipples ? 1 : 0 },
      uRippleSpeed: { value: rippleSpeed },
      uRippleThickness: { value: rippleThickness },
      uRippleIntensity: { value: rippleIntensityScale },
      uEdgeFade: { value: edgeFade }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SRC,
      fragmentShader: createFragment(),
      uniforms,
      glslVersion: THREE.GLSL3,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });

    const quadGeometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(quadGeometry, material);
    scene.add(quad);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const touch = createTouchTexture();
    touch.radiusScale = liquidRadius;
    let liquidEffect: LiquidEffect | null = null;
    if (liquid) {
      liquidEffect = new LiquidEffect(touch.texture, liquidStrength);
      composer.addPass(new EffectPass(camera, liquidEffect));
    }

    const setSize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      uniforms.uResolution.value.set(
        w * renderer.getPixelRatio(),
        h * renderer.getPixelRatio()
      );
      uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
    };
    setSize();

    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    const mapPointer = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const px = (e.clientX - rect.left) * renderer.getPixelRatio();
      const py = (rect.height - (e.clientY - rect.top)) * renderer.getPixelRatio();
      return { px, py, nx: (e.clientX - rect.left) / rect.width, ny: 1 - (e.clientY - rect.top) / rect.height };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!liquid) return;
      const { nx, ny } = mapPointer(e);
      touch.addTouch(nx, ny);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!enableRipples) return;
      const { px, py } = mapPointer(e);
      clickPos[clickIx].set(px, py);
      clickTimes[clickIx] = uniforms.uTime.value;
      clickIx = (clickIx + 1) % clickPos.length;
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    const clock = new THREE.Clock();
    let raf = 0;
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      uniforms.uTime.value += prefersReducedMotion ? 0 : dt * speed * 6.0;
      if (liquid) touch.update();
      composer.render();
    };
    animate();

    threeRef.current = {
      renderer,
      composer,
      material,
      quadGeometry,
      ro,
      stop: () => cancelAnimationFrame(raf),
      onPointerMove,
      onPointerDown,
      liquidEffect
    };

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      quadGeometry.dispose();
      material.dispose();
      touch.texture.dispose();
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    variant,
    pixelSize,
    color,
    patternScale,
    patternDensity,
    pixelSizeJitter,
    enableRipples,
    rippleIntensityScale,
    rippleThickness,
    rippleSpeed,
    liquid,
    liquidStrength,
    liquidRadius,
    liquidWobbleSpeed,
    speed,
    edgeFade,
    transparent,
    noiseAmount
  ]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', ...style }} />;
};

export default PixelBlast;
