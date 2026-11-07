"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { techStack } from "@/data/techStack";
import ScrollReveal from "./ScrollReveal";
import LogoCloud, { type BrandLogo } from "@/components/ui/logo-cloud";

export default function TechStackSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalSkills = techStack.reduce((acc, cat) => acc + cat.items.length, 0);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Extract all authentic brand logos from Janus's tech stack
  const brandLogos: BrandLogo[] = techStack
    .flatMap((cat) => cat.items)
    .filter((item): item is typeof item & { icon: string } => Boolean(item.icon))
    .map((item) => ({
      name: item.name,
      image: item.icon,
    }));

  return (
    <section id="tech-stack" className="w-full py-16 md:py-20 border-b border-surface-border">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Section Heading */}
        <ScrollReveal direction="up" duration={500}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-surface-border mb-10">
            <div className="flex items-center gap-3">
              <span className="text-accent font-mono text-xs tracking-widest font-semibold">03</span>
              <span className="text-text-muted font-mono text-xs">/</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                Tech Stack & Contributions
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-text-muted text-[11px] font-mono tracking-widest uppercase">
                Tools & GitHub Activity
              </span>
              <span className="text-xs font-mono text-text-secondary px-2.5 py-0.5 rounded border border-surface-border bg-surface">
                {totalSkills} Skills
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── GitHub Contributions Graph & Dual Marquee Logo Cloud Hero ─── */}
        <ScrollReveal direction="up" duration={500} delay={100}>
          <div>
            <LogoCloud
              brandLogos={brandLogos}
              username="@janusezam"
              summary="GitHub contributions & core technology stack"
              duration={28}
              onViewDetails={() => setIsModalOpen(true)}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Accessible Skills Breakdown Modal Dialog ─── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full max-h-[85vh] bg-surface border border-surface-border rounded-lg overflow-hidden flex flex-col p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-surface-border mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-accent font-mono text-xs tracking-widest font-semibold">03</span>
                  <span className="text-text-muted font-mono text-xs">/</span>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-text-primary">
                    Detailed Categorized Skills
                  </h3>
                </div>
                <p className="text-xs font-mono text-text-muted">
                  {totalSkills} Technologies across {techStack.length} specialized development areas
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-background transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content: Categorized Grid (Scrollable) */}
            <div className="overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {techStack.map((group, groupIdx) => (
                <div
                  key={groupIdx}
                  className="bg-background border border-surface-border rounded-lg p-4 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-surface-border mb-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                      {group.category}
                    </h4>
                    <span className="text-[10px] font-mono text-text-muted">
                      {String(groupIdx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {group.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-center justify-between gap-3 p-1.5 rounded hover:bg-surface transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.icon ? (
                            <div className="relative w-5 h-5 shrink-0">
                              <Image
                                src={item.icon}
                                alt={item.name}
                                fill
                                className="object-contain"
                                sizes="20px"
                              />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded bg-surface-border/50 flex items-center justify-center font-mono text-[10px] font-bold text-text-primary">
                              {item.name[0]}
                            </div>
                          )}
                          <span className="text-xs font-medium text-text-primary truncate">
                            {item.name}
                          </span>
                        </div>

                        {item.description && (
                          <span className="text-[10px] font-mono text-text-muted text-right truncate max-w-[120px]">
                            {item.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
