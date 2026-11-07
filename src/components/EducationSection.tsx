"use client";

import { education } from "@/data/education";
import { StaggerChildren } from "./ScrollReveal";

export default function EducationSection() {
  return (
    <div className="bg-surface border border-surface-border rounded-lg p-6 sm:p-8 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="pb-6 border-b border-surface-border mb-6">
          <h3 className="text-xl font-bold text-text-primary tracking-tight">
            Education
          </h3>
          <p className="text-text-muted text-[11px] font-mono tracking-widest uppercase mt-1">
            Academic Background
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-4 border-l border-surface-border space-y-6">
          <StaggerChildren stagger={80} direction="up" className="flex flex-col gap-6">
            {education.map((entry, index) => {
              const isLatest = index === 0;
              return (
                <div key={index} className="relative">
                  {/* Timeline indicator node */}
                  <span
                    className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                      isLatest
                        ? "bg-accent border-accent"
                        : "bg-background border-surface-border"
                    }`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">
                        {entry.degree}
                      </h4>
                      <p className="text-text-secondary text-xs mt-0.5">
                        {entry.institution}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-text-muted shrink-0">
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
