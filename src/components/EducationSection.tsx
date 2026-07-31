"use client";

import { useEffect, useRef } from "react";
import { education } from "@/data/education";

export default function EducationSection() {
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
        <span className="section-plus">+</span> Education
      </h2>

      <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono mb-8">
        ACADEMIC BACKGROUND
      </p>

      <div className="flex flex-col gap-5">
        {education.map((entry, index) => (
          <div key={index} className="flex items-start gap-4">
            {/* Dot Indicator */}
            <div className="dot-indicator mt-1" />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-text-primary">
                    {entry.degree}
                  </h3>
                  <p className="text-text-muted text-xs mt-0.5">
                    {entry.institution}
                  </p>
                </div>
                <span className="text-text-muted text-xs font-mono shrink-0">
                  {entry.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
