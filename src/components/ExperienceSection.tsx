"use client";

import { experience } from "@/data/experience";
import type { ExperienceStatus } from "@/types";
import ScrollReveal from "./ScrollReveal";
import { StaggerChildren } from "./ScrollReveal";

const statusClass: Record<ExperienceStatus, string> = {
  Current: "badge-current",
  Ongoing: "badge-ongoing",
  Completed: "badge-completed",
};

export default function ExperienceSection() {
  return (
    <div>
      {/* Header row */}
      <ScrollReveal direction="left" duration={600}>
        <div className="flex items-start justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            <span className="section-plus">+</span> Experience
          </h2>
          <div className="text-right">
            <span className="text-3xl md:text-4xl font-bold text-accent">
              {experience.yearsCount}
            </span>
            <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase font-mono whitespace-pre-line leading-relaxed mt-1">
              {experience.yearsLabel}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Experience Cards */}
      <StaggerChildren stagger={120} direction="up" className="flex flex-col gap-3">
        {experience.entries.map((entry, index) => (
          <div
            key={index}
            className="bg-card-bg border border-card-border rounded-lg p-5 card-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-text-primary">
                  {entry.title}
                </h3>
                <p className="text-text-muted text-xs mt-1">
                  {entry.organization}
                </p>
              </div>
              <span
                className={`text-[10px] tracking-[0.15em] uppercase font-mono px-3 py-1 rounded-full whitespace-nowrap ${statusClass[entry.status]}`}
              >
                {entry.status}
              </span>
            </div>
          </div>
        ))}
      </StaggerChildren>
    </div>
  );
}
