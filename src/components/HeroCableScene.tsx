import React, { useEffect, useRef, useState } from 'react';

type Vec2 = [number, number];
type RGB = [number, number, number];
type CableSide = 'left' | 'right';

interface HeroCableSceneProps {
  className?: string;
}

interface RibbonGeometry {
  buffer: WebGLBuffer;
  vertexCount: number;
}

interface CableRecord {
  side: CableSide;
  body: RibbonGeometry;
  collar: RibbonGeometry;
  localTip: Vec2;
  baseRadius: number;
  depth: number;
  delay: number;
  travelDuration: number;
  wobbleFrequency: number;
  wobblePhase: number;
  wobbleAmplitude: number;
  secondaryWobbleFrequency: number;
  secondaryWobblePhase: number;
  secondaryWobbleAmplitude: number;
  lateralDriftFrequency: number;
  lateralDriftPhase: number;
  lateralDriftAmplitude: number;
  travelArcAmplitude: number;
  travelBias: number;
  travelSmoothness: number;
  flexFrequency: number;
  flexPhase: number;
  flexAmplitude: number;
  flexLongitudinalAmplitude: number;
  tipPulseFrequency: number;
  tipPulsePhase: number;
  color: RGB;
  tint: RGB;
  tipColor: RGB;
  tipIntensity: number;
  tipScale: number;
}

interface CableProgramInfo {
  program: WebGLProgram;
  attributes: {
    center: number;
    normal: number;
    side: number;
    progress: number;
  };
  uniforms: {
    translation: WebGLUniformLocation;
    scale: WebGLUniformLocation;
    halfView: WebGLUniformLocation;
    radius: WebGLUniformLocation;
    color: WebGLUniformLocation;
    tint: WebGLUniformLocation;
    tipColor: WebGLUniformLocation;
    alpha: WebGLUniformLocation;
    shadowPass: WebGLUniformLocation;
    time: WebGLUniformLocation;
    flexAmplitude: WebGLUniformLocation;
    flexFrequency: WebGLUniformLocation;
    flexPhase: WebGLUniformLocation;
    longitudinalAmplitude: WebGLUniformLocation;
  };
}

interface PointProgramInfo {
  program: WebGLProgram;
  attributes: {
    position: number;
  };
  uniforms: {
    translation: WebGLUniformLocation;
    halfView: WebGLUniformLocation;
    color: WebGLUniformLocation;
    alpha: WebGLUniformLocation;
    size: WebGLUniformLocation;
  };
}

const WORLD_HEIGHT = 9;
const BASE_WORLD_WIDTH = 16;
const BASE_CABLE_LENGTH = 12.8;
const CABLES_PER_SIDE = 12;
const CYCLE_DURATION = 12.8;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

const mulberry32 = (seed: number) => {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

const randomBetween = (random: () => number, min: number, max: number) =>
  min + (max - min) * random();

const catmullRom = (p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2 => {
  const t2 = t * t;
  const t3 = t2 * t;
  return [
    0.5 *
      (2 * p1[0] +
        (-p0[0] + p2[0]) * t +
        (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
        (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
    0.5 *
      (2 * p1[1] +
        (-p0[1] + p2[1]) * t +
        (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
        (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
  ];
};

const sampleCurve = (controlPoints: Vec2[], segmentCount = 104): Vec2[] => {
  const samples: Vec2[] = [];
  const spanCount = controlPoints.length - 1;

  for (let index = 0; index <= segmentCount; index += 1) {
    const normalized = index / segmentCount;
    const spanPosition = normalized * spanCount;
    const spanIndex = Math.min(spanCount - 1, Math.floor(spanPosition));
    const localT = spanPosition - spanIndex;

    const p0 = controlPoints[Math.max(0, spanIndex - 1)];
    const p1 = controlPoints[spanIndex];
    const p2 = controlPoints[Math.min(controlPoints.length - 1, spanIndex + 1)];
    const p3 = controlPoints[Math.min(controlPoints.length - 1, spanIndex + 2)];
    samples.push(catmullRom(p0, p1, p2, p3, localT));
  }

  return samples;
};

const buildRibbonData = (samples: Vec2[]) => {
  const stride = 6;
  const values = new Float32Array(samples.length * 2 * stride);
  let cursor = 0;

  for (let index = 0; index < samples.length; index += 1) {
    const previous = samples[Math.max(0, index - 1)];
    const next = samples[Math.min(samples.length - 1, index + 1)];
    const tangentX = next[0] - previous[0];
    const tangentY = next[1] - previous[1];
    const tangentLength = Math.max(0.0001, Math.hypot(tangentX, tangentY));
    const normalX = -tangentY / tangentLength;
    const normalY = tangentX / tangentLength;
    const progress = index / Math.max(1, samples.length - 1);

    for (const side of [-1, 1]) {
      values[cursor] = samples[index][0];
      values[cursor + 1] = samples[index][1];
      values[cursor + 2] = normalX;
      values[cursor + 3] = normalY;
      values[cursor + 4] = side;
      values[cursor + 5] = progress;
      cursor += stride;
    }
  }

  return values;
};

const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('WebGL shader yaratilmadi.');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || 'WebGL shader xatosi.';
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
};

const createProgram = (
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
) => {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!program) throw new Error('WebGL dasturi yaratilmadi.');

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || 'WebGL link xatosi.';
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
};

const requireUniform = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
) => {
  const location = gl.getUniformLocation(program, name);
  if (!location) throw new Error(`${name} uniform topilmadi.`);
  return location;
};

const createRibbonGeometry = (
  gl: WebGLRenderingContext,
  samples: Vec2[],
): RibbonGeometry => {
  const buffer = gl.createBuffer();
  if (!buffer) throw new Error('WebGL buffer yaratilmadi.');
  const data = buildRibbonData(samples);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return { buffer, vertexCount: samples.length * 2 };
};

const makeControlPoints = (
  side: CableSide,
  index: number,
  random: () => number,
): Vec2[] => {
  const orderedX = [-6.4, -4.35, -2.2, -0.15, 1.95, 4.15, 6.4];
  const xValues = side === 'left' ? orderedX : [...orderedX].reverse();
  const rowStep = 0.245;
  const rightRowOrder = [4, 1, 9, 6, 11, 2, 8, 0, 5, 10, 3, 7];
  const rowIndex = side === 'left' ? index : rightRowOrder[index];
  const baseY = -1.36 + rowIndex * rowStep + randomBetween(random, -0.055, 0.055);
  const directionBias = side === 'left' ? 1 : -1;
  const firstCurve = randomBetween(random, -0.18, 0.18);
  const secondCurve = randomBetween(random, -0.21, 0.21);
  const thirdCurve = randomBetween(random, -0.17, 0.17);
  const asymmetry = directionBias * randomBetween(random, -0.055, 0.055);

  return xValues.map((x, pointIndex) => {
    const normalized = pointIndex / (xValues.length - 1);
    const broadArc =
      Math.sin(normalized * Math.PI) * firstCurve +
      Math.sin(normalized * Math.PI * 1.63 + index * 0.31) * secondCurve * 0.52;
    const localVariation =
      pointIndex === 0 || pointIndex === xValues.length - 1
        ? randomBetween(random, -0.035, 0.035)
        : randomBetween(random, -0.095, 0.095);
    const oneOffBend = pointIndex === 3 ? thirdCurve : 0;
    return [x, baseY + broadArc + localVariation + oneOffBend + asymmetry] as Vec2;
  });
};

const createCableProgram = (gl: WebGLRenderingContext): CableProgramInfo => {
  const vertexSource = `
    attribute vec2 a_center;
    attribute vec2 a_normal;
    attribute float a_side;
    attribute float a_progress;

    uniform vec2 u_translation;
    uniform vec2 u_scale;
    uniform vec2 u_halfView;
    uniform float u_radius;
    uniform float u_time;
    uniform float u_flexAmplitude;
    uniform float u_flexFrequency;
    uniform float u_flexPhase;
    uniform float u_longitudinalAmplitude;

    varying float v_side;
    varying float v_progress;

    void main() {
      vec2 transformedNormal = normalize(vec2(
        a_normal.x / max(u_scale.x, 0.0001),
        a_normal.y / max(u_scale.y, 0.0001)
      ));
      vec2 position = a_center * u_scale;

      float flexEnvelope = 0.24 + 0.76 * pow(sin(a_progress * 3.14159265), 2.0);
      float flexPrimary = sin(
        a_progress * 5.4 +
        u_time * u_flexFrequency +
        u_flexPhase
      );
      float flexSecondary = sin(
        a_progress * 9.2 -
        u_time * u_flexFrequency * 0.61 +
        u_flexPhase * 1.73
      );
      float flexMotion = (flexPrimary * 0.68 + flexSecondary * 0.32) * flexEnvelope;
      position.y += flexMotion * u_flexAmplitude;
      position.x += sin(
        a_progress * 3.7 +
        u_time * u_flexFrequency * 0.34 +
        u_flexPhase * 0.83
      ) * u_longitudinalAmplitude * flexEnvelope;

      position += transformedNormal * a_side * u_radius;
      position += u_translation;

      vec2 clip = position / u_halfView;
      gl_Position = vec4(clip, 0.0, 1.0);
      v_side = a_side;
      v_progress = a_progress;
    }
  `;

  const fragmentSource = `
    precision mediump float;

    uniform vec3 u_color;
    uniform vec3 u_tint;
    uniform vec3 u_tipColor;
    uniform float u_alpha;
    uniform float u_shadowPass;

    varying float v_side;
    varying float v_progress;

    void main() {
      float edge = abs(v_side);
      float edgeAlpha = 1.0 - smoothstep(0.80, 1.0, edge);

      if (u_shadowPass > 0.5) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, edgeAlpha * u_alpha);
        return;
      }

      float cylinder = sqrt(max(0.0, 1.0 - edge * edge));
      float upperHighlight = exp(-pow((v_side + 0.30) * 4.8, 2.0));
      float lowerShade = smoothstep(-0.15, 1.0, v_side);
      float tipInfluence = smoothstep(0.70, 1.0, v_progress);

      vec3 color = u_color * (0.28 + cylinder * 0.76);
      color += u_tint * upperHighlight * 0.38;
      color *= 1.0 - lowerShade * 0.14;
      color += u_tipColor * tipInfluence * 0.075;

      gl_FragColor = vec4(color, edgeAlpha * u_alpha);
    }
  `;

  const program = createProgram(gl, vertexSource, fragmentSource);
  return {
    program,
    attributes: {
      center: gl.getAttribLocation(program, 'a_center'),
      normal: gl.getAttribLocation(program, 'a_normal'),
      side: gl.getAttribLocation(program, 'a_side'),
      progress: gl.getAttribLocation(program, 'a_progress'),
    },
    uniforms: {
      translation: requireUniform(gl, program, 'u_translation'),
      scale: requireUniform(gl, program, 'u_scale'),
      halfView: requireUniform(gl, program, 'u_halfView'),
      radius: requireUniform(gl, program, 'u_radius'),
      color: requireUniform(gl, program, 'u_color'),
      tint: requireUniform(gl, program, 'u_tint'),
      tipColor: requireUniform(gl, program, 'u_tipColor'),
      alpha: requireUniform(gl, program, 'u_alpha'),
      shadowPass: requireUniform(gl, program, 'u_shadowPass'),
      time: requireUniform(gl, program, 'u_time'),
      flexAmplitude: requireUniform(gl, program, 'u_flexAmplitude'),
      flexFrequency: requireUniform(gl, program, 'u_flexFrequency'),
      flexPhase: requireUniform(gl, program, 'u_flexPhase'),
      longitudinalAmplitude: requireUniform(gl, program, 'u_longitudinalAmplitude'),
    },
  };
};

const createPointProgram = (gl: WebGLRenderingContext): PointProgramInfo => {
  const vertexSource = `
    attribute vec2 a_position;
    uniform vec2 u_translation;
    uniform vec2 u_halfView;
    uniform float u_size;

    void main() {
      vec2 clip = (a_position + u_translation) / u_halfView;
      gl_Position = vec4(clip, 0.0, 1.0);
      gl_PointSize = u_size;
    }
  `;

  const fragmentSource = `
    precision mediump float;
    uniform vec3 u_color;
    uniform float u_alpha;

    void main() {
      vec2 point = gl_PointCoord * 2.0 - 1.0;
      float radius = length(point);
      float glow = 1.0 - smoothstep(0.0, 1.0, radius);
      glow = pow(glow, 2.1);
      gl_FragColor = vec4(u_color, glow * u_alpha);
    }
  `;

  const program = createProgram(gl, vertexSource, fragmentSource);
  return {
    program,
    attributes: {
      position: gl.getAttribLocation(program, 'a_position'),
    },
    uniforms: {
      translation: requireUniform(gl, program, 'u_translation'),
      halfView: requireUniform(gl, program, 'u_halfView'),
      color: requireUniform(gl, program, 'u_color'),
      alpha: requireUniform(gl, program, 'u_alpha'),
      size: requireUniform(gl, program, 'u_size'),
    },
  };
};

const bindRibbonAttributes = (
  gl: WebGLRenderingContext,
  program: CableProgramInfo,
  geometry: RibbonGeometry,
) => {
  const stride = 6 * Float32Array.BYTES_PER_ELEMENT;
  gl.bindBuffer(gl.ARRAY_BUFFER, geometry.buffer);

  gl.enableVertexAttribArray(program.attributes.center);
  gl.vertexAttribPointer(program.attributes.center, 2, gl.FLOAT, false, stride, 0);

  gl.enableVertexAttribArray(program.attributes.normal);
  gl.vertexAttribPointer(
    program.attributes.normal,
    2,
    gl.FLOAT,
    false,
    stride,
    2 * Float32Array.BYTES_PER_ELEMENT,
  );

  gl.enableVertexAttribArray(program.attributes.side);
  gl.vertexAttribPointer(
    program.attributes.side,
    1,
    gl.FLOAT,
    false,
    stride,
    4 * Float32Array.BYTES_PER_ELEMENT,
  );

  gl.enableVertexAttribArray(program.attributes.progress);
  gl.vertexAttribPointer(
    program.attributes.progress,
    1,
    gl.FLOAT,
    false,
    stride,
    5 * Float32Array.BYTES_PER_ELEMENT,
  );
};

export const HeroCableScene: React.FC<HeroCableSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      depth: false,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      setWebglUnavailable(true);
      return;
    }

    let cableProgram: CableProgramInfo;
    let pointProgram: PointProgramInfo;

    try {
      cableProgram = createCableProgram(gl);
      pointProgram = createPointProgram(gl);
    } catch (error) {
      console.error('Hero WebGL animation error:', error);
      setWebglUnavailable(true);
      return;
    }

    const pointBuffer = gl.createBuffer();
    if (!pointBuffer) {
      setWebglUnavailable(true);
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0]), gl.STATIC_DRAW);

    const random = mulberry32(20260803);
    const cables: CableRecord[] = [];

    const buildSide = (side: CableSide) => {
      for (let index = 0; index < CABLES_PER_SIDE; index += 1) {
        const controlPoints = makeControlPoints(side, index, random);
        const samples = sampleCurve(controlPoints);
        const collarSamples = samples.slice(-5);
        const depth = index / Math.max(1, CABLES_PER_SIDE - 1) + randomBetween(random, -0.08, 0.08);
        const depthScale = mix(0.88, 1.13, clamp(depth));
        const cyan = side === 'left';

        cables.push({
          side,
          body: createRibbonGeometry(gl, samples),
          collar: createRibbonGeometry(gl, collarSamples),
          localTip: samples[samples.length - 1],
          baseRadius: randomBetween(random, 0.045, 0.071) * depthScale,
          depth,
          delay: 0.34 + index * 0.018 + randomBetween(random, 0, 1.08),
          travelDuration: randomBetween(random, 7.65, 9.85),
          wobbleFrequency: randomBetween(random, 0.34, 0.78),
          wobblePhase: randomBetween(random, 0, Math.PI * 2),
          wobbleAmplitude: randomBetween(random, 0.025, 0.085),
          secondaryWobbleFrequency: randomBetween(random, 0.82, 1.48),
          secondaryWobblePhase: randomBetween(random, 0, Math.PI * 2),
          secondaryWobbleAmplitude: randomBetween(random, 0.012, 0.048),
          lateralDriftFrequency: randomBetween(random, 0.25, 0.58),
          lateralDriftPhase: randomBetween(random, 0, Math.PI * 2),
          lateralDriftAmplitude: randomBetween(random, 0.018, 0.064),
          travelArcAmplitude: randomBetween(random, -0.19, 0.19),
          travelBias: randomBetween(random, -0.52, 0.52),
          travelSmoothness: randomBetween(random, 0.08, 0.72),
          flexFrequency: randomBetween(random, 0.46, 1.08),
          flexPhase: randomBetween(random, 0, Math.PI * 2),
          flexAmplitude: randomBetween(random, 0.018, 0.082),
          flexLongitudinalAmplitude: randomBetween(random, 0.006, 0.032),
          tipPulseFrequency: randomBetween(random, 0.82, 1.75),
          tipPulsePhase: randomBetween(random, 0, Math.PI * 2),
          color: cyan
            ? [0.022, randomBetween(random, 0.045, 0.065), randomBetween(random, 0.075, 0.105)]
            : [randomBetween(random, 0.032, 0.052), 0.028, randomBetween(random, 0.075, 0.11)],
          tint: cyan
            ? [randomBetween(random, 0.08, 0.15), randomBetween(random, 0.31, 0.45), randomBetween(random, 0.48, 0.65)]
            : [randomBetween(random, 0.32, 0.48), randomBetween(random, 0.13, 0.22), randomBetween(random, 0.54, 0.72)],
          tipColor: cyan
            ? [randomBetween(random, 0.08, 0.28), randomBetween(random, 0.72, 0.98), 1]
            : [randomBetween(random, 0.46, 0.72), randomBetween(random, 0.2, 0.42), 1],
          tipIntensity: randomBetween(random, 0.68, 1.08),
          tipScale: randomBetween(random, 0.82, 1.18),
        });
      }
    };

    buildSide('left');
    buildSide('right');
    cables.sort((first, second) => first.depth - second.depth);

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.clearColor(0, 0, 0, 0);

    let viewWidth = BASE_WORLD_WIDTH;
    let halfView: Vec2 = [BASE_WORLD_WIDTH / 2, WORLD_HEIGHT / 2];
    let horizontalScale = 1;
    let pixelRatio = 1;
    let animationFrame = 0;
    let visible = true;
    let startedAt = performance.now();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, width < 640 ? 1.25 : 1.7);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);

      viewWidth = WORLD_HEIGHT * (width / height);
      halfView = [viewWidth / 2, WORLD_HEIGHT / 2];
      horizontalScale = clamp(viewWidth / BASE_WORLD_WIDTH, 0.52, 1.2);
    };

    const drawRibbon = (
      cable: CableRecord,
      geometry: RibbonGeometry,
      translation: Vec2,
      radius: number,
      color: RGB,
      tint: RGB,
      alpha: number,
      shadowPass: boolean,
      elapsedSeconds: number,
    ) => {
      gl.useProgram(cableProgram.program);
      bindRibbonAttributes(gl, cableProgram, geometry);
      gl.uniform2f(cableProgram.uniforms.translation, translation[0], translation[1]);
      gl.uniform2f(cableProgram.uniforms.scale, horizontalScale, 1);
      gl.uniform2f(cableProgram.uniforms.halfView, halfView[0], halfView[1]);
      gl.uniform1f(cableProgram.uniforms.radius, radius);
      gl.uniform3f(cableProgram.uniforms.color, color[0], color[1], color[2]);
      gl.uniform3f(cableProgram.uniforms.tint, tint[0], tint[1], tint[2]);
      gl.uniform3f(
        cableProgram.uniforms.tipColor,
        cable.tipColor[0],
        cable.tipColor[1],
        cable.tipColor[2],
      );
      gl.uniform1f(cableProgram.uniforms.alpha, alpha);
      gl.uniform1f(cableProgram.uniforms.shadowPass, shadowPass ? 1 : 0);
      gl.uniform1f(cableProgram.uniforms.time, elapsedSeconds);
      gl.uniform1f(cableProgram.uniforms.flexAmplitude, cable.flexAmplitude);
      gl.uniform1f(cableProgram.uniforms.flexFrequency, cable.flexFrequency);
      gl.uniform1f(cableProgram.uniforms.flexPhase, cable.flexPhase);
      gl.uniform1f(
        cableProgram.uniforms.longitudinalAmplitude,
        cable.flexLongitudinalAmplitude,
      );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, geometry.vertexCount);
    };

    const drawPoint = (
      position: Vec2,
      color: RGB,
      size: number,
      alpha: number,
      additive: boolean,
    ) => {
      gl.useProgram(pointProgram.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
      gl.enableVertexAttribArray(pointProgram.attributes.position);
      gl.vertexAttribPointer(pointProgram.attributes.position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(pointProgram.uniforms.translation, position[0], position[1]);
      gl.uniform2f(pointProgram.uniforms.halfView, halfView[0], halfView[1]);
      gl.uniform3f(pointProgram.uniforms.color, color[0], color[1], color[2]);
      gl.uniform1f(pointProgram.uniforms.alpha, alpha);
      gl.uniform1f(pointProgram.uniforms.size, size * pixelRatio);
      gl.blendFunc(gl.SRC_ALPHA, additive ? gl.ONE : gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.POINTS, 0, 1);
    };

    const shapeTravelProgress = (cable: CableRecord, progress: number) => {
      const smooth = progress * progress * (3 - 2 * progress);
      const biased = progress + cable.travelBias * progress * (1 - progress);
      return clamp(mix(biased, smooth, cable.travelSmoothness));
    };

    const calculateFlexOffset = (
      cable: CableRecord,
      elapsedSeconds: number,
      curveProgress: number,
    ): Vec2 => {
      const envelope = 0.24 + 0.76 * Math.sin(curveProgress * Math.PI) ** 2;
      const primary = Math.sin(
        curveProgress * 5.4 +
          elapsedSeconds * cable.flexFrequency +
          cable.flexPhase,
      );
      const secondary = Math.sin(
        curveProgress * 9.2 -
          elapsedSeconds * cable.flexFrequency * 0.61 +
          cable.flexPhase * 1.73,
      );
      return [
        Math.sin(
          curveProgress * 3.7 +
            elapsedSeconds * cable.flexFrequency * 0.34 +
            cable.flexPhase * 0.83,
        ) *
          cable.flexLongitudinalAmplitude *
          envelope,
        (primary * 0.68 + secondary * 0.32) *
          cable.flexAmplitude *
          envelope,
      ];
    };

    const render = (now: number) => {
      if (!visible) {
        animationFrame = requestAnimationFrame(render);
        return;
      }

      const elapsed = reducedMotion ? 3.8 : (now - startedAt) / 1000;
      const cycleTime = elapsed % CYCLE_DURATION;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const visibleCables: Array<{
        cable: CableRecord;
        translation: Vec2;
        alpha: number;
        tip: Vec2;
      }> = [];

      const scaledLength = BASE_CABLE_LENGTH * horizontalScale;
      const outsideGap = Math.max(0.58, viewWidth * 0.035);

      for (const cable of cables) {
        const rawProgress = (cycleTime - cable.delay) / cable.travelDuration;
        if (rawProgress < 0 || rawProgress > 1) continue;

        const progress = clamp(rawProgress);
        const travelProgress = shapeTravelProgress(cable, progress);
        const leftStart = -viewWidth / 2 - scaledLength / 2 - outsideGap;
        const leftEnd = viewWidth / 2 + scaledLength / 2 + outsideGap;
        const rightStart = -leftStart;
        const rightEnd = -leftEnd;
        const direction = cable.side === 'left' ? 1 : -1;
        const baseX =
          cable.side === 'left'
            ? mix(leftStart, leftEnd, travelProgress)
            : mix(rightStart, rightEnd, travelProgress);
        const lateralEnvelope = Math.sin(progress * Math.PI) ** 2;
        const x =
          baseX +
          Math.sin(
            elapsed * cable.lateralDriftFrequency + cable.lateralDriftPhase,
          ) *
            cable.lateralDriftAmplitude *
            lateralEnvelope *
            direction;

        const fadeIn = clamp(progress / 0.045);
        const fadeOut = clamp((1 - progress) / 0.045);
        const alpha = Math.min(fadeIn, fadeOut);
        const primaryY =
          Math.sin(elapsed * cable.wobbleFrequency + cable.wobblePhase) *
          cable.wobbleAmplitude;
        const secondaryY =
          Math.sin(
            elapsed * cable.secondaryWobbleFrequency +
              cable.secondaryWobblePhase,
          ) * cable.secondaryWobbleAmplitude;
        const travelArc =
          Math.sin(progress * Math.PI) * cable.travelArcAmplitude;
        const y = primaryY + secondaryY + travelArc;
        const translation: Vec2 = [x, y];
        const tipFlex = calculateFlexOffset(cable, elapsed, 1);
        const tip: Vec2 = [
          cable.localTip[0] * horizontalScale + x + tipFlex[0],
          cable.localTip[1] + y + tipFlex[1],
        ];

        visibleCables.push({ cable, translation, alpha, tip });
      }

      for (const item of visibleCables) {
        const depthScale = mix(0.9, 1.12, clamp(item.cable.depth));
        const depthAlpha = mix(0.76, 1, clamp(item.cable.depth));
        drawRibbon(
          item.cable,
          item.cable.body,
          [item.translation[0], item.translation[1] - 0.035],
          item.cable.baseRadius * depthScale * 1.68,
          [0, 0, 0],
          [0, 0, 0],
          item.alpha * depthAlpha * 0.76,
          true,
          elapsed,
        );
      }

      for (const item of visibleCables) {
        const depthScale = mix(0.9, 1.12, clamp(item.cable.depth));
        const depthAlpha = mix(0.76, 1, clamp(item.cable.depth));
        drawRibbon(
          item.cable,
          item.cable.body,
          item.translation,
          item.cable.baseRadius * depthScale,
          item.cable.color,
          item.cable.tint,
          item.alpha * depthAlpha,
          false,
          elapsed,
        );
        drawRibbon(
          item.cable,
          item.cable.collar,
          item.translation,
          item.cable.baseRadius * depthScale * 1.26,
          [0.09, 0.12, 0.16],
          [0.34, 0.42, 0.52],
          item.alpha * depthAlpha,
          false,
          elapsed,
        );
      }

      for (const item of visibleCables) {
        const depthScale = mix(0.88, 1.14, clamp(item.cable.depth));
        const pulse =
          0.84 +
          Math.sin(
            elapsed * item.cable.tipPulseFrequency + item.cable.tipPulsePhase,
          ) * 0.16;
        const intensity = item.cable.tipIntensity * pulse;
        const tipScale = item.cable.tipScale * (0.96 + pulse * 0.04);
        drawPoint(item.tip, item.cable.tipColor, 42 * depthScale * tipScale, item.alpha * 0.18 * intensity, true);
        drawPoint(item.tip, item.cable.tipColor, 18 * depthScale * tipScale, item.alpha * 0.44 * intensity, true);
        drawPoint(item.tip, [0.9, 0.98, 1], 7.5 * depthScale * tipScale, item.alpha * intensity, false);
      }

      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      animationFrame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && !document.hidden;
        if (visible) startedAt = performance.now() - ((performance.now() - startedAt) % (CYCLE_DURATION * 1000));
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      visible = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibility);
    resize();
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);

      for (const cable of cables) {
        gl.deleteBuffer(cable.body.buffer);
        gl.deleteBuffer(cable.collar.buffer);
      }
      gl.deleteBuffer(pointBuffer);
      gl.deleteProgram(cableProgram.program);
      gl.deleteProgram(pointProgram.program);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-transparent ${className}`}
      aria-hidden="true"
    >
      {webglUnavailable ? (
        <img
          src="/assets/hero/uztransformator-hero-poster.webp"
          alt=""
          className="h-full w-full object-cover object-center opacity-80"
        />
      ) : (
        <canvas ref={canvasRef} className="block h-full w-full" />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,3,8,0.02)_0%,rgba(2,3,8,0.07)_44%,rgba(2,3,8,0.36)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020308]/18 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#020308]/48 to-transparent" />
      <div className="absolute left-[-18%] top-1/2 h-[46%] w-[42%] -translate-y-1/2 rounded-full bg-[#00D9FF]/[0.035] blur-[90px]" />
      <div className="absolute right-[-18%] top-1/2 h-[46%] w-[42%] -translate-y-1/2 rounded-full bg-[#7044FF]/[0.04] blur-[90px]" />
    </div>
  );
};
