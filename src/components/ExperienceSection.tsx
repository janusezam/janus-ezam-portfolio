"use client";

import { experience } from "@/data/experience";
import type { ExperienceStatus } from "@/types";
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
    <div className="bg-surface border border-surface-border rounded-lg p-6 sm:p-8 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-surface-border mb-6">
          <div>
            <h3 className="text-xl font-bold text-text-primary tracking-tight">
              Experience
            </h3>
            <p className="text-text-muted text-[11px] font-mono tracking-widest uppercase mt-1">
              Career & Capstone
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold font-mono text-accent">
              {experience.yearsCount}
            </span>
            <p className="text-text-muted text-[9px] font-mono tracking-wider uppercase">
              Years Study
            </p>
          </div>
        </div>

        {/* Experience List */}
        <StaggerChildren stagger={80} direction="up" className="flex flex-col divide-y divide-surface-border">
          {experience.entries.map((entry, index) => (
            <div
              key={index}
              className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-text-primary">
                  {entry.title}
                </h4>
                <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                  {entry.organization}
                </p>
              </div>
              <span
                className={`text-[10px] tracking-wider uppercase font-mono px-2.5 py-0.5 rounded shrink-0 font-medium ${
                  statusClass[entry.status] || "badge-completed"
                }`}
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
