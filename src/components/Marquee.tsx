"use client";

import { useEffect, useRef } from "react";
import type { MarqueeConfig } from "@/types";

interface MarqueeProps {
  config: MarqueeConfig;
  className?: string;
}

export default function Marquee({ config, className = "" }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { text, separator = "—", speed = 30, direction = "left" } = config;

  // Build the repeated text with separators
  const segment = `${text}  ${separator}  `;
  // Repeat enough times to fill the viewport seamlessly
  const repeated = Array(12).fill(segment).join("");

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.setProperty("--marquee-speed", `${speed}s`);
    }
  }, [speed]);

  return (
    <div
      className={`overflow-hidden bg-marquee-bg border-y border-marquee-border py-3 select-none ${className}`}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className={`marquee-track ${direction === "left" ? "marquee-left" : "marquee-right"}`}
      >
        <span className="text-marquee-text text-xs font-mono tracking-[0.2em] uppercase whitespace-nowrap">
          {repeated}
        </span>
        <span className="text-marquee-text text-xs font-mono tracking-[0.2em] uppercase whitespace-nowrap">
          {repeated}
        </span>
      </div>
    </div>
  );
}
