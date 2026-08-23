"use client";

import { education } from "@/data/education";
import ScrollReveal from "./ScrollReveal";
import { StaggerChildren } from "./ScrollReveal";

export default function EducationSection() {
  return (
    <div>
      <ScrollReveal direction="right" duration={600}>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
          <span className="section-plus">+</span> Education
        </h2>
      </ScrollReveal>

      <ScrollReveal direction="right" delay={100} duration={600}>
        <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono mb-8">
          ACADEMIC BACKGROUND
        </p>
      </ScrollReveal>

      <StaggerChildren stagger={150} direction="up" className="flex flex-col gap-5">
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
      </StaggerChildren>
    </div>
  );
}
