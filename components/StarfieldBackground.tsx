"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  depth: number; // 0 (far) … 1 (near)
  palette: string; // rgb prefix, e.g. "165,243,252"
}

interface ShootingStar {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  dirX: number;
  dirY: number;
  length: number;
  opacity: number;
  decay: number;
  width: number;
  comet: boolean;
}

interface ConstellationLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  phase: "in" | "visible" | "out";
  life: number;
  maxLife: number;
}

/* Realistic star tints — blue-white dominates, with occasional warm giants. */
const STAR_PALETTES = [
  "165,243,252", // cyan-white
  "226,232,240", // neutral white
  "191,219,254", // soft blue
  "224,242,254", // ice white
  "254,240,198", // warm amber (rare, weighted below)
];

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setSize = () => {
      canvas.width = window.innerWidth;
      // Cap the canvas height so very long pages don't allocate huge buffers.
      canvas.height = Math.min(document.documentElement.scrollHeight, 12000);
    };
    setSize();

    // ── Stars (depth-sorted twinkle field) ────────────────────────────
    const stars: Star[] = [];
    const starCount = Math.floor(Math.random() * 401) + 700;
    for (let i = 0; i < starCount; i++) {
      const baseOpacity = Math.random() * 0.5 + 0.28;
      const depth = Math.random();
      const warm = Math.random() < 0.07;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0.3 + depth * 1.3 + Math.random() * 0.4,
        baseOpacity,
        opacity: baseOpacity,
        twinkleSpeed: Math.random() * 0.0028 + 0.0008,
        twinklePhase: Math.random() * Math.PI * 2,
        depth,
        palette: STAR_PALETTES[warm ? 4 : Math.floor(Math.random() * 4)],
      });
    }

    // ── Shooting stars / comets ───────────────────────────────────────
    const shootingStars: ShootingStar[] = [];

    function spawnShootingStar() {
      const angle = Math.PI / 6 + Math.random() * (Math.PI / 6);
      const isComet = Math.random() < 0.22;
      const speed = isComet ? Math.random() * 2 + 2.6 : Math.random() * 6 + 4.5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      shootingStars.push({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height * 0.5,
        velocityX: vx,
        velocityY: vy,
        dirX: Math.cos(angle),
        dirY: Math.sin(angle),
        length: isComet ? Math.random() * 90 + 140 : Math.random() * 80 + 40,
        opacity: 1,
        decay: isComet ? 0.007 : 0.015,
        width: isComet ? 2.2 : 1.5,
        comet: isComet,
      });
    }

    // ── Constellation lines ───────────────────────────────────────────
    const constellationLines: ConstellationLine[] = [];
    const maxConstellations = 3;

    function spawnConstellation() {
      if (constellationLines.length >= maxConstellations * 4) return;

      const centerIdx = Math.floor(Math.random() * stars.length);
      const center = stars[centerIdx];
      const nearby = stars
        .filter(
          (s) =>
            s !== center &&
            Math.abs(s.x - center.x) < 200 &&
            Math.abs(s.y - center.y) < 200
        )
        .slice(0, 5);

      if (nearby.length < 2) return;

      for (let i = 0; i < nearby.length - 1; i++) {
        constellationLines.push({
          x1: nearby[i].x,
          y1: nearby[i].y,
          x2: nearby[i + 1].x,
          y2: nearby[i + 1].y,
          opacity: 0,
          phase: "in",
          life: 0,
          maxLife: 300 + Math.random() * 200,
        });
      }
      if (nearby.length > 2) {
        constellationLines.push({
          x1: nearby[nearby.length - 1].x,
          y1: nearby[nearby.length - 1].y,
          x2: center.x,
          y2: center.y,
          opacity: 0,
          phase: "in",
          life: 0,
          maxLife: 300 + Math.random() * 200,
        });
      }
    }

    // ── Scroll + pointer parallax state ───────────────────────────────
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let targetPX = 0;
    let targetPY = 0;
    let pointerPX = 0;
    let pointerPY = 0;
    const handlePointer = (e: PointerEvent) => {
      targetPX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 … 1
      targetPY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });

    let animFrame = 0;
    let lastShootingStarTime = 0;
    let lastConstellationTime = 0;

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ease the pointer parallax for a weightless feel.
      pointerPX += (targetPX - pointerPX) * 0.035;
      pointerPY += (targetPY - pointerPY) * 0.035;

      // Stars
      for (const s of stars) {
        s.opacity =
          s.baseOpacity + Math.sin(time * s.twinkleSpeed + s.twinklePhase) * (0.12 + s.depth * 0.1);
        const parallaxY = s.y - scrollY * (0.03 + s.depth * 0.05);
        const drawY = ((parallaxY % canvas.height) + canvas.height) % canvas.height;
        const drawX = s.x - pointerPX * (2 + s.depth * 9);
        const drawYp = drawY - pointerPY * (1.5 + s.depth * 6);

        ctx.beginPath();
        ctx.arc(drawX, drawYp, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.palette},${Math.max(0.05, s.opacity)})`;
        ctx.fill();

        // Bright near stars get a faint cross-glint.
        if (s.radius > 1.45) {
          const g = s.opacity * 0.5;
          ctx.strokeStyle = `rgba(${s.palette},${g})`;
          ctx.lineWidth = 0.6;
          const l = s.radius * 3.2;
          ctx.beginPath();
          ctx.moveTo(drawX - l, drawYp);
          ctx.lineTo(drawX + l, drawYp);
          ctx.moveTo(drawX, drawYp - l);
          ctx.lineTo(drawX, drawYp + l);
          ctx.stroke();
        }
      }

      // Constellations
      if (time - lastConstellationTime > 6000 + Math.random() * 4000) {
        spawnConstellation();
        lastConstellationTime = time;
      }

      for (let i = constellationLines.length - 1; i >= 0; i--) {
        const cl = constellationLines[i];
        cl.life++;

        const fadeInDuration = 60;
        const fadeOutStart = cl.maxLife - 60;

        if (cl.phase === "in") {
          cl.opacity = Math.min(1, cl.life / fadeInDuration) * 0.25;
          if (cl.life >= fadeInDuration) cl.phase = "visible";
        } else if (cl.phase === "visible") {
          cl.opacity = 0.25;
          if (cl.life >= fadeOutStart) cl.phase = "out";
        } else {
          cl.opacity = Math.max(0, (cl.maxLife - cl.life) / 60) * 0.25;
        }

        if (cl.life >= cl.maxLife) {
          constellationLines.splice(i, 1);
          continue;
        }

        const parallaxY1 = cl.y1 - scrollY * 0.05;
        const parallaxY2 = cl.y2 - scrollY * 0.05;

        ctx.beginPath();
        ctx.moveTo(cl.x1, parallaxY1);
        ctx.lineTo(cl.x2, parallaxY2);
        ctx.strokeStyle = `rgba(165,243,252,${cl.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.shadowColor = "rgba(165,243,252,0.5)";
        ctx.shadowBlur = 4;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Shooting stars & comets
      if (time - lastShootingStarTime > 5000 + Math.random() * 7000) {
        spawnShootingStar();
        lastShootingStarTime = time;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.velocityX;
        ss.y += ss.velocityY;
        ss.opacity -= ss.decay;

        if (
          ss.opacity <= 0 ||
          ss.x > canvas.width + 240 ||
          ss.y > canvas.height + 240
        ) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - ss.dirX * ss.length;
        const tailY = ss.y - ss.dirY * ss.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        gradient.addColorStop(0, "rgba(165,243,252,0)");
        gradient.addColorStop(0.75, `rgba(165,243,252,${ss.opacity * 0.55})`);
        gradient.addColorStop(1, `rgba(224,250,254,${ss.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = ss.width;
        ctx.shadowColor = "rgba(165,243,252,0.8)";
        ctx.shadowBlur = ss.comet ? 12 : 6;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Bright head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.comet ? 2.8 : 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${ss.opacity})`;
        ctx.fill();

        // Comets carry a soft halo.
        if (ss.comet) {
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, 7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(165,243,252,${ss.opacity * 0.18})`;
          ctx.fill();
        }
      }
    };

    if (reducedMotion) {
      // Static single frame for reduced-motion users.
      drawFrame(0);
    } else {
      const loop = (time: number) => {
        drawFrame(time);
        animFrame = requestAnimationFrame(loop);
      };
      animFrame = requestAnimationFrame(loop);
    }

    const resizeObserver = new ResizeObserver(() => setSize());
    resizeObserver.observe(document.body);

    window.addEventListener("resize", setSize);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointer);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
    />
  );
}
