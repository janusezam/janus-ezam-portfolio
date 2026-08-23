"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";

// ─── Point in the trail ────────────────────────────────────
interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

// ─── Tube trail configuration ──────────────────────────────
interface TubeConfig {
  colors: string[];
  glowColors: string[];
  trailLength: number;
  lineWidth: number;
  glowIntensity: number;
  fadeSpeed: number;
  smoothing: number;
}

const DARK_CONFIG: TubeConfig = {
  colors: ["#22d3ee", "#67e8f9", "#06b6d4", "#a5f3fc"],
  glowColors: ["#22d3ee", "#67e8f9", "#38bdf8", "#7dd3fc"],
  trailLength: 50,
  lineWidth: 2,
  glowIntensity: 18,
  fadeSpeed: 0.025,
  smoothing: 0.35,
};

const LIGHT_CONFIG: TubeConfig = {
  colors: ["#0891b2", "#0e7490", "#155e75", "#06b6d4"],
  glowColors: ["#0891b2", "#06b6d4", "#0284c7", "#0ea5e9"],
  trailLength: 50,
  lineWidth: 2,
  glowIntensity: 12,
  fadeSpeed: 0.025,
  smoothing: 0.35,
};

export default function CursorTubes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, mounted } = useTheme();
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailsRef = useRef<TrailPoint[][]>([[], [], [], []]);
  const rafRef = useRef<number>(0);
  const isActiveRef = useRef(false);
  const fadeRef = useRef(1);

  const getConfig = useCallback((): TubeConfig => {
    return theme === "dark" ? DARK_CONFIG : LIGHT_CONFIG;
  }, [theme]);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // ─── Resize handler ──────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ─── Mouse tracking ──────────────────────────────────
    let fadeTimeout: ReturnType<typeof setTimeout>;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      isActiveRef.current = true;
      fadeRef.current = 1;
      clearTimeout(fadeTimeout);
      fadeTimeout = setTimeout(() => {
        isActiveRef.current = false;
      }, 150);
    };

    const onMouseLeave = () => {
      isActiveRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // ─── Animation loop ──────────────────────────────────
    const animate = () => {
      const config = getConfig();
      const { trailLength, fadeSpeed } = config;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fade out when cursor stops
      if (!isActiveRef.current) {
        fadeRef.current = Math.max(0, fadeRef.current - fadeSpeed);
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update each trail with slight offsets for a multi-tube look
      const offsets = [
        { x: 0, y: 0, phase: 0 },
        { x: 0, y: 0, phase: Math.PI * 0.5 },
        { x: 0, y: 0, phase: Math.PI },
        { x: 0, y: 0, phase: Math.PI * 1.5 },
      ];

      const time = performance.now() * 0.003;

      for (let t = 0; t < 4; t++) {
        const trail = trailsRef.current[t];
        const offset = offsets[t];

        // Organic offset using sine waves
        const ox = Math.sin(time + offset.phase) * 6;
        const oy = Math.cos(time * 0.8 + offset.phase) * 6;

        if (isActiveRef.current || fadeRef.current > 0.05) {
          trail.unshift({
            x: mx + ox,
            y: my + oy,
            age: 0,
          });
        }

        // Age points and trim
        for (let i = 0; i < trail.length; i++) {
          trail[i].age += 1;
        }
        while (trail.length > trailLength) {
          trail.pop();
        }

        // Draw the tube
        if (trail.length > 2) {
          drawTube(ctx, trail, config, t, fadeRef.current);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      clearTimeout(fadeTimeout);
    };
  }, [mounted, getConfig]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

// ─── Draw a single glowing tube trail ─────────────────────
function drawTube(
  ctx: CanvasRenderingContext2D,
  trail: TrailPoint[],
  config: TubeConfig,
  tubeIndex: number,
  globalAlpha: number
) {
  const { colors, glowColors, trailLength, lineWidth, glowIntensity } = config;
  const color = colors[tubeIndex % colors.length];
  const glowColor = glowColors[tubeIndex % glowColors.length];

  // Draw glow layer
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Outer glow
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = glowIntensity;
  ctx.lineWidth = lineWidth + 4;

  ctx.beginPath();
  ctx.moveTo(trail[0].x, trail[0].y);

  for (let i = 1; i < trail.length - 1; i++) {
    const xc = (trail[i].x + trail[i + 1].x) / 2;
    const yc = (trail[i].y + trail[i + 1].y) / 2;
    ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
  }

  // Per-point alpha gradient via strokeStyle gradient
  const gradient = ctx.createLinearGradient(
    trail[0].x,
    trail[0].y,
    trail[trail.length - 1].x,
    trail[trail.length - 1].y
  );

  const headAlpha = Math.min(1, globalAlpha);
  gradient.addColorStop(0, hexToRGBA(glowColor, headAlpha * 0.4));
  gradient.addColorStop(0.3, hexToRGBA(glowColor, headAlpha * 0.2));
  gradient.addColorStop(1, hexToRGBA(glowColor, 0));

  ctx.strokeStyle = gradient;
  ctx.stroke();
  ctx.restore();

  // Draw core line
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;
  ctx.lineWidth = lineWidth;

  ctx.beginPath();
  ctx.moveTo(trail[0].x, trail[0].y);

  for (let i = 1; i < trail.length - 1; i++) {
    const xc = (trail[i].x + trail[i + 1].x) / 2;
    const yc = (trail[i].y + trail[i + 1].y) / 2;
    ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
  }

  const coreGradient = ctx.createLinearGradient(
    trail[0].x,
    trail[0].y,
    trail[trail.length - 1].x,
    trail[trail.length - 1].y
  );

  coreGradient.addColorStop(0, hexToRGBA(color, globalAlpha * 0.9));
  coreGradient.addColorStop(0.5, hexToRGBA(color, globalAlpha * 0.5));
  coreGradient.addColorStop(1, hexToRGBA(color, 0));

  ctx.strokeStyle = coreGradient;
  ctx.stroke();

  // Bright head dot
  if (globalAlpha > 0.1) {
    ctx.beginPath();
    ctx.arc(trail[0].x, trail[0].y, lineWidth * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = hexToRGBA("#ffffff", globalAlpha * 0.6);
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.fill();
  }

  ctx.restore();
}

// ─── Utility: hex color to rgba string ────────────────────
function hexToRGBA(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
