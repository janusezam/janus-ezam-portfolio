"use client";

import { experience } from "@/data/experience";
import type { ExperienceStatus } from "@/types";
import ScrollReveal from "./ScrollReveal";
import { StaggerChildren } from "./ScrollReveal";

const statusClass: Record<ExperienceStatus, string> = {
  Current: "badge-current",
  Ongoing: "badge-ongoing",
  Completed: "badge-completed",
  Seeking: "badge-seeking",
  Looking: "badge-seeking",
};

export default function ExperienceSection() {
  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-6 md:p-8 h-full flex flex-col justify-between">
      <div>
        {/* Header row */}
        <ScrollReveal direction="left" duration={600}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                <span className="section-plus">+</span> Experience
              </h2>
              <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase font-mono mt-1">
                CAREER & PROJECTS
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl md:text-3xl font-bold text-accent">
                {experience.yearsCount}
              </span>
              <p className="text-text-muted text-[9px] tracking-[0.15em] uppercase font-mono whitespace-pre-line leading-tight mt-0.5">
                {experience.yearsLabel}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Experience List (Directly inside single card) */}
        <StaggerChildren stagger={100} direction="up" className="flex flex-col divide-y divide-card-border/60">
          {experience.entries.map((entry, index) => (
            <div
              key={index}
              className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-sm md:text-base font-semibold text-text-primary">
                  {entry.title}
                </h3>
                <p className="text-text-muted text-xs mt-1 leading-relaxed">
                  {entry.organization}
                </p>
              </div>
              <span
                className={`text-[10px] tracking-[0.15em] uppercase font-mono px-3 py-1 rounded-full whitespace-nowrap shrink-0 ${statusClass[entry.status]}`}
              >
                {entry.status}
              </span>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
}
