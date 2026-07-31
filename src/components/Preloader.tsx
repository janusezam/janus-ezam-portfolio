"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Hold animation on screen for ~3.4s, then fade out background over 1s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3400);

    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  const nameText = "JANUS EZAM TAGUD";
  const subtitleText = "WELCOME TO MY PORTFOLIO";

  // Pseudo-random delay order so letters reveal smoothly from the left in a random typewriter feel (non-bouncy)
  const getNameCharDelay = (index: number) => {
    const randomOffset = ((index * 13 + 5) % 9) * 0.035;
    return (0.75 + index * 0.035 + randomOffset).toFixed(3);
  };

  const getSubCharDelay = (index: number) => {
    const randomOffset = ((index * 11 + 3) % 7) * 0.025;
    return (1.5 + index * 0.03 + randomOffset).toFixed(3);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1120] text-white px-6 transition-opacity duration-1000 ease-in-out select-none overflow-hidden ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Ambient Background Radial Glow Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-10 max-w-xl w-full">
        {/* Animated Icons Row: Smooth Slide-In From Left */}
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          {/* 1. Left Icon: Code </> */}
          <div className="preloader-slide-left preloader-icon-delay-1 flex items-center justify-center">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-[0_0_20px_rgba(66,153,225,0.5)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>

          {/* 2. Middle Icon: Globe 🌐 */}
          <div className="preloader-slide-left preloader-icon-delay-2 flex items-center justify-center">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-[0_0_20px_rgba(66,153,225,0.5)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.05 12h19.9M12 2.05a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
          </div>

          {/* 3. Right Icon: Chart / Analytics 📊 */}
          <div className="preloader-slide-left preloader-icon-delay-3 flex items-center justify-center">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-[0_0_20px_rgba(66,153,225,0.5)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>

        {/* Text Container: Letter-by-Letter Left-Slide Entrance (No Bounce) */}
        <div className="text-center space-y-3">
          {/* Name: JANUS EZAM TAGUD */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white overflow-hidden">
            {nameText.split("").map((char, index) => {
              const isAccent = index >= 11; // "TAGUD" in accent color
              return (
                <span
                  key={`name-${index}`}
                  style={{ animationDelay: `${getNameCharDelay(index)}s` }}
                  className={`inline-block preloader-char-anim ${
                    isAccent ? "text-accent" : "text-white"
                  }`}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </h2>

          {/* Subtitle: WELCOME TO MY PORTFOLIO */}
          <p className="text-xs sm:text-sm font-mono text-text-muted tracking-[0.25em] uppercase overflow-hidden">
            {subtitleText.split("").map((char, index) => (
              <span
                key={`sub-${index}`}
                style={{ animationDelay: `${getSubCharDelay(index)}s` }}
                className="inline-block preloader-char-anim"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
