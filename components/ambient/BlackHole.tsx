"use client";

import { useEffect, useRef, useState } from "react";

/**
 * BlackHole — a single, self-contained accretion-disk renderer.
 *
 * Null geodesics are integrated per pixel around a Schwarzschild hole
 * (M = 1/2 in units of the radius, i.e. capture radius r = 1), so the
 * photon ring, the lensed far side of the disk and the Doppler-brightened
 * approaching limb all appear on their own. One animation, no decoration.
 *
 * Cost control: the frame is rendered at a reduced resolution scale that
 * adapts to the measured frame time, and it stops entirely when the canvas
 * leaves the viewport or the tab is hidden.
 */

const VERT = `attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `precision highp float;

uniform vec2  uRes;
uniform float uTime;

const float DISK_IN  = 2.3;
const float DISK_OUT = 7.0;
const int   STEPS    = 190;

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
  return mix(
    mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
    mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 4; i++) {
    s += a * vnoise(p);
    p = p * 2.02 + 11.3;
    a *= 0.5;
  }
  return s;
}

/* Faint procedural field stars — hard points, not a glowy haze. */
vec3 starField(vec3 dir) {
  vec3 col = vec3(0.0);
  for (int i = 0; i < 3; i++) {
    float sc = 40.0 * pow(2.3, float(i));
    vec3 p = dir * sc;
    vec3 cell = floor(p);
    vec3 f = fract(p) - 0.5;
    float h = hash13(cell + float(i) * 19.7);
    if (h > 0.978) {
      float core = 1.0 - smoothstep(0.0, 0.36, length(f));
      float bright = core * core * (h - 0.978) * 52.0;
      float warm = hash13(cell + 4.1);
      col += mix(vec3(0.82, 0.87, 1.0), vec3(1.0, 0.85, 0.64), warm) * bright;
    }
  }
  return col;
}

/* Emission of the thin disk at a crossing point. */
vec3 diskEmission(vec3 p, vec3 rayDir, float t) {
  float r = length(p.xz);
  float x = clamp((r - DISK_IN) / (DISK_OUT - DISK_IN), 0.0, 1.0);

  /* Keplerian shear: sample a frame that winds up differentially. */
  float ang = -t * 0.5 / pow(max(r, 1.0), 1.5);
  float ca = cos(ang);
  float sa = sin(ang);
  vec2 q = mat2(ca, -sa, sa, ca) * p.xz;

  float turb = fbm(vec3(q * 1.15, t * 0.05));
  float fine = fbm(vec3(q * 3.6, t * 0.1));

  /* thin-annulus profile: sharp inner lip, long soft outer fade */
  float dens = smoothstep(0.0, 0.05, x) * pow(1.0 - x, 1.15);
  dens *= 0.18 + 1.15 * turb;
  dens *= 0.5 + 0.7 * fine;

  /* White-hot inside, sodium orange outside. */
  vec3 tint = mix(vec3(1.0, 0.9, 0.72), vec3(1.0, 0.36, 0.07), smoothstep(0.0, 1.0, x));

  /* Relativistic beaming: the limb rotating toward the viewer flares. */
  vec3 vdir = normalize(cross(vec3(0.0, 1.0, 0.0), vec3(p.x, 0.0, p.z)));
  float beta = clamp(0.6 * inversesqrt(max(r, 1.3)), 0.0, 0.7);
  float g = 1.0 / max(1.0 - dot(vdir * beta, -normalize(rayDir)), 0.3);
  g = clamp(pow(g, 2.4), 0.18, 3.0);

  /* Gravitational redshift dims the innermost annulus. */
  float zgrav = sqrt(max(1.0 - 1.0 / max(r, 1.02), 0.03));

  return tint * dens * g * zgrav * 1.25;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime;

  /* Almost edge-on; the hole drifts slowly and breathes. */
  float orbit = 0.22 + 0.05 * sin(t * 0.031);
  float elev  = 0.115 + 0.035 * sin(t * 0.021 + 1.7);
  float dist  = 27.0;

  vec3 camPos = vec3(sin(orbit) * cos(elev), sin(elev), cos(orbit) * cos(elev)) * dist;
  vec3 fwd = normalize(-camPos);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  vec3 up = cross(fwd, right);

  vec3 dir = normalize(fwd + (uv.x * right + uv.y * up) * 0.46);

  vec3 pos = camPos;
  vec3 vel = dir;
  float h2 = dot(cross(pos, vel), cross(pos, vel));

  vec3 diskCol = vec3(0.0);
  float transmit = 1.0;
  float captured = 0.0;
  vec3 prevPos = pos;
  float prevY = pos.y;

  for (int i = 0; i < STEPS; i++) {
    float r2 = dot(pos, pos);
    if (r2 > 1.0 && r2 < 900.0) {
      float r = sqrt(r2);
      float dt = clamp(0.16 * (r - 0.92), 0.012, 0.32);

      vel += (-1.5 * h2 * pos / (r2 * r2 * r)) * dt;
      prevPos = pos;
      prevY = pos.y;
      pos += vel * dt;

      if (prevY * pos.y < 0.0) {
        vec3 hit = mix(prevPos, pos, prevY / (prevY - pos.y));
        float hr = length(hit.xz);
        if (hr > DISK_IN && hr < DISK_OUT) {
          diskCol += transmit * diskEmission(hit, vel, t);
          transmit *= 0.62;
        }
      }
    } else if (r2 <= 1.0) {
      captured = 1.0;
    }
  }
  if (dot(pos, pos) <= 1.0) captured = 1.0;

  vec3 col = starField(normalize(vel)) * (1.0 - captured) * transmit + diskCol;
  col += diskCol * diskCol * 0.1;                    /* faint bloom on the ring */
  col *= 0.82;                                        /* exposure        */
  col = col / (1.0 + col * 0.9);                      /* soft shoulder   */
  col = pow(max(col, 0.0), vec3(0.95));
  col *= vec3(1.02, 0.95, 0.88);                      /* warm bias       */
  col = clamp(col, 0.0, 1.0);

  gl_FragColor = vec4(col, 1.0);
}`;

export default function BlackHole({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {

    const gl =
      (canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        powerPreference: "high-performance",
      }) as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      setFailed(true);
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setFailed(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    const quad = gl.createBuffer();
    if (!quad) {
      setFailed(true);
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* adaptive render scale: quality follows the device */
    let scale = 0.62;
    let frameAvg = 16;
    let raf = 0;
    let running = true;
    let visible = true;
    const started = performance.now();

    const resize = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      const cssScale = reduced ? 1 : scale;
      const nextW = Math.max(2, Math.round(w * dpr * cssScale));
      const nextH = Math.max(2, Math.round(h * dpr * cssScale));
      if (canvas.width !== nextW || canvas.height !== nextH) {
        canvas.width = nextW;
        canvas.height = nextH;
        gl.viewport(0, 0, nextW, nextH);
      }
    };

    const draw = (timeMs: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, timeMs / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (!visible) return;

      resize();
      const t0 = performance.now();
      draw(now - started);
      const cost = performance.now() - t0;

      frameAvg = frameAvg * 0.92 + cost * 0.08;
      if (frameAvg > 26 && scale > 0.4) scale -= 0.06;
      else if (frameAvg < 9 && scale < 0.72) scale += 0.03;
    };

    if (reduced) {
      resize();
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      if (reduced) draw(0);
    };
    window.addEventListener("resize", onResize);

    const onLost = (e: Event) => {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("webglcontextlost", onLost);
      // NOTE: deliberately not calling WEBGL_lose_context here — under React
      // StrictMode the effect runs twice, and losing the context would make the
      // second mount fail. Dropping the loop + listeners is enough.
    };
    } catch {
      // driver refused to cooperate — fall back to the CSS variant
      setFailed(true);
    }
  }, []);

  if (failed) {
    return (
      <div className={`relative overflow-hidden ${className}`} aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #000 0 26%, rgba(255,122,41,0.85) 27%, rgba(255,177,115,0.25) 29%, rgba(10,8,6,0) 44%)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 w-[62%] h-[7%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] astro-spin-slower"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,122,41,0) 0%, rgba(255,177,115,0.75) 45%, rgba(255,122,41,0) 100%)",
            filter: "blur(6px)",
          }}
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block h-full w-full ${className}`}
    />
  );
}
