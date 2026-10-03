"use client";

import { education } from "@/data/education";
import ScrollReveal from "./ScrollReveal";
import { StaggerChildren } from "./ScrollReveal";

export default function EducationSection() {
  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-6 md:p-8 h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <ScrollReveal direction="right" duration={600}>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
            <span className="section-plus">+</span> Education
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={100} duration={600}>
          <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono mb-8">
            ACADEMIC BACKGROUND
          </p>
        </ScrollReveal>

        {/* Education Timeline */}
        <div className="relative ml-2">
          {/* Continuous Vertical Timeline Line: Centered at 0px anchor */}
          <div className="absolute left-0 top-2 bottom-2 w-[2px] -translate-x-1/2 bg-card-border" />

          <StaggerChildren stagger={100} direction="up" className="flex flex-col gap-6">
            {education.map((entry, index) => {
              const isLatest = index === 0;
              return (
                <div key={index} className="relative pl-6">
                  {/* Timeline Circle Dot Node: Centered at 0px anchor */}
                  <div
                    className={`absolute left-0 top-1.5 w-3 h-3 -translate-x-1/2 rounded-full border-2 border-card-bg transition-colors ${
                      isLatest
                        ? "bg-accent border-accent"
                        : "bg-surface border-card-border"
                    }`}
                  />

                  {/* Details */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                    <div>
                      <h3 className="text-sm md:text-base font-semibold text-text-primary">
                        {entry.degree}
                      </h3>
                      <p className="text-text-muted text-xs mt-0.5">
                        {entry.institution}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-text-muted shrink-0 mt-0.5 sm:mt-0">
                      {entry.year}
                    </span>
                  </div>
                </div>
              );
            })}
          </StaggerChildren>
        </div>
      </div>
    </div>
  );
}
