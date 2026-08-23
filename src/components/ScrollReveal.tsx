"use client";

import { useEffect, useRef, type ReactNode } from "react";

// ─── Animation direction types ─────────────────────────────
type AnimDirection = "up" | "down" | "left" | "right" | "fade" | "scale" | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: AnimDirection;
  delay?: number;       // ms
  duration?: number;    // ms
  distance?: number;    // px
  threshold?: number;   // 0-1
  once?: boolean;       // only animate once
  className?: string;
  stagger?: number;     // ms delay between child items
  as?: "div" | "section" | "article" | "span" | "main" | "header" | "footer" | "aside" | "nav";
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = 40,
  threshold = 0.1,
  once = true,
  className = "",
  stagger = 0,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("scroll-reveal--visible");
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.classList.remove("scroll-reveal--visible");
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold, once]);

  // Build CSS custom properties for the animation
  const style: React.CSSProperties = {
    "--sr-delay": `${delay}ms`,
    "--sr-duration": `${duration}ms`,
    "--sr-distance": `${distance}px`,
    "--sr-stagger": `${stagger}ms`,
  } as React.CSSProperties;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`scroll-reveal scroll-reveal--${direction} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

// ─── Staggered children wrapper ────────────────────────────
// Wraps each child in a scroll-reveal item with incremental delay
interface StaggerChildrenProps {
  children: ReactNode;
  stagger?: number;
  direction?: AnimDirection;
  duration?: number;
  distance?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  stagger = 100,
  direction = "up",
  duration = 600,
  distance = 30,
  className = "",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("stagger-parent--visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const style: React.CSSProperties = {
    "--sr-stagger": `${stagger}ms`,
    "--sr-duration": `${duration}ms`,
    "--sr-distance": `${distance}px`,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={`stagger-parent stagger-parent--${direction} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
