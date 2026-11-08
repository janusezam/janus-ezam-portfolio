"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { techStack } from "@/data/techStack";
import ScrollReveal from "./ScrollReveal";
import LogoCloud, { type BrandLogo } from "@/components/ui/logo-cloud";

export default function TechStackSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const totalSkills = techStack.reduce((acc, cat) => acc + cat.items.length, 0);

  // Close modal on Escape key & Lock background scroll
  useEffect(() => {
    if (!isModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  // Extract all authentic brand logos from Janus's tech stack
  const brandLogos: BrandLogo[] = techStack
    .flatMap((cat) => cat.items)
    .filter((item): item is typeof item & { icon: string } => Boolean(item.icon))
    .map((item) => ({
      name: item.name,
      image: item.icon,
    }));

  const categoryOptions = ["All", ...techStack.map((g) => g.category)];

  const displayedGroups =
    activeCategory === "All"
      ? techStack
      : techStack.filter((g) => g.category === activeCategory);

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
              summary="226 contributions in the last year"
              duration={28}
              onViewDetails={() => setIsModalOpen(true)}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Accessible Skills Modal (Portaled Directly to Body, No Doom Scrolling) ─── */}
      {isModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 sm:p-6 animate-fade-in"
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative max-w-2xl w-full max-h-[85vh] bg-surface border border-surface-border rounded-xl flex flex-col p-5 sm:p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-surface-border shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-mono text-xs font-semibold">03</span>
                    <span className="text-text-muted font-mono text-xs">/</span>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-text-primary">
                      Tech Stack Breakdown
                    </h3>
                    <span className="text-[10px] font-mono text-text-muted px-2 py-0.5 rounded-full border border-surface-border bg-background">
                      {totalSkills} Skills
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-background transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Category Filter Pills (Instant navigation, zero doom scrolling) */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-3 border-b border-surface-border/60 shrink-0 select-none scrollbar-none">
                {categoryOptions.map((cat) => {
                  const isActive = activeCategory === cat;
                  const count =
                    cat === "All"
                      ? totalSkills
                      : techStack.find((g) => g.category === cat)?.items.length ?? 0;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-2.5 py-1 text-xs font-mono rounded-md whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                        isActive
                          ? "bg-accent text-white font-medium"
                          : "bg-background text-text-muted hover:text-text-primary border border-surface-border/80"
                      }`}
                    >
                      {cat} <span className="opacity-70 text-[10px]">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Modal Content: Compact Scrollable Skills View */}
              <div className="overflow-y-auto max-h-[50vh] py-3 pr-1 space-y-4">
                {displayedGroups.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-2">
                    <div className="flex items-center justify-between pb-1 border-b border-surface-border/40">
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-semibold">
                        {group.category}
                      </h4>
                      <span className="text-[10px] font-mono text-text-muted">
                        {group.items.length} {group.items.length === 1 ? "tool" : "tools"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-center justify-between gap-2.5 p-2 rounded-md bg-background border border-surface-border/60 hover:border-accent/40 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {item.icon ? (
                              <div className="relative size-5 shrink-0">
                                <Image
                                  src={item.icon}
                                  alt={item.name}
                                  fill
                                  className="object-contain"
                                  sizes="20px"
                                />
                              </div>
                            ) : (
                              <div className="size-5 rounded bg-surface-border/50 flex items-center justify-center font-mono text-[10px] font-bold text-text-primary">
                                {item.name[0]}
                              </div>
                            )}
                            <span className="text-xs font-medium text-text-primary truncate">
                              {item.name}
                            </span>
                          </div>

                          {item.description && (
                            <span className="text-[10px] font-mono text-text-muted text-right truncate max-w-[130px]">
                              {item.description}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-surface-border flex items-center justify-between text-xs font-mono text-text-muted shrink-0">
                <span>Press <kbd className="px-1.5 py-0.5 rounded bg-background border border-surface-border text-[10px]">Esc</kbd> to close</span>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1 rounded bg-background border border-surface-border hover:bg-surface hover:text-text-primary transition-colors cursor-pointer text-xs font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}