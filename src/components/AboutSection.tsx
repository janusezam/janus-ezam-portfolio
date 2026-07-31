"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
        <span className="section-plus">+</span> About
      </h2>

      <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono mb-6">
        {profile.aboutLabel}
      </p>

      <div className="space-y-5">
        {profile.aboutParagraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-text-secondary text-sm md:text-base leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
