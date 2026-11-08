"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import ScrollReveal from "./ScrollReveal";

export default function ProjectsSection() {
  const [activeGallery, setActiveGallery] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);

  // Track display mode ("mockup" | "full") per project ID
  const [displayModes, setDisplayModes] = useState<Record<string, "mockup" | "full">>({});

  const getMode = (id: string): "mockup" | "full" => displayModes[id] || "mockup";
  const setMode = (id: string, mode: "mockup" | "full") => {
    setDisplayModes((prev) => ({ ...prev, [id]: mode }));
  };

  // Keyboard navigation for modal & Lock background scroll
  useEffect(() => {
    if (!activeGallery) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveGallery(null);
      if (e.key === "ArrowLeft") {
        setActiveGallery((prev) =>
          prev
            ? {
                ...prev,
                index: (prev.index - 1 + prev.images.length) % prev.images.length,
              }
            : null
        );
      }
      if (e.key === "ArrowRight") {
        setActiveGallery((prev) =>
          prev
            ? {
                ...prev,
                index: (prev.index + 1) % prev.images.length,
              }
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeGallery]);

  return (
    <section id="projects" className="w-full py-16 md:py-20 border-b border-surface-border">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Section Heading */}
        <ScrollReveal direction="up" duration={500}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-surface-border mb-12">
            <div className="flex items-center gap-3">
              <span className="text-accent font-mono text-xs tracking-widest font-semibold">04</span>
              <span className="text-text-muted font-mono text-xs">/</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">Featured Projects</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-text-muted text-[11px] font-mono tracking-widest uppercase">
                Work & Architecture
              </span>
              <span className="text-xs font-mono text-text-secondary px-2.5 py-0.5 rounded border border-surface-border bg-surface">
                {projects.length} Completed
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Projects List */}
        <div className="flex flex-col gap-6">
          {projects.map((project, index) => {
            const currentMode = getMode(project.id);
            const activeImage = currentMode === "mockup" ? project.image : (project.fullImage || project.image);
            const gallery = currentMode === "mockup" ? project.gallery : (project.fullGallery || project.gallery);

            return (
              <ScrollReveal key={project.id || index} direction="up" duration={500} delay={index * 80}>
                <article className="bg-surface border border-surface-border rounded-lg overflow-hidden hover:border-accent/40 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Media / Showcase (7 cols) — Prominent Image Highlight */}
                    <div className="lg:col-span-7 bg-background/50 p-4 sm:p-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-surface-border relative">
                      {/* View Mode Toggle Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                          Project {String(index + 1).padStart(2, "0")}
                        </span>
                        {project.fullImage && (
                          <div className="flex bg-surface rounded border border-surface-border p-0.5 text-[10px] font-mono">
                            <button
                              onClick={() => setMode(project.id, "mockup")}
                              type="button"
                              className={`px-2 py-0.5 rounded transition-colors ${
                                currentMode === "mockup"
                                  ? "bg-accent text-white font-medium"
                                  : "text-text-muted hover:text-text-primary"
                              }`}
                            >
                              Mockup
                            </button>
                            <button
                              onClick={() => setMode(project.id, "full")}
                              type="button"
                              className={`px-2 py-0.5 rounded transition-colors ${
                                currentMode === "full"
                                  ? "bg-accent text-white font-medium"
                                  : "text-text-muted hover:text-text-primary"
                              }`}
                            >
                              Full View
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Clickable Image Area without background card */}
                      <div
                        onClick={() => {
                          if (gallery && gallery.length > 0) {
                            setActiveGallery({
                              images: gallery,
                              index: 0,
                              title: project.title,
                            });
                          }
                        }}
                        className="relative w-full h-[220px] sm:h-[260px] md:h-[290px] flex items-center justify-center cursor-pointer group select-none"
                      >
                        <Image
                          src={activeImage}
                          alt={`${project.title} screenshot`}
                          fill
                          className="object-contain p-1 sm:p-2 group-hover:scale-[1.02] transition-transform duration-300"
                          sizes="(max-width: 1024px) 100vw, 640px"
                          priority={index === 0}
                        />

                        {/* Quiet Zoom Hint */}
                        <div className="absolute bottom-1 right-1 px-2 py-0.5 rounded bg-surface/90 border border-surface-border text-[9px] font-mono uppercase tracking-wider text-text-muted opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-sm">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          <span>Enlarge</span>
                        </div>
                      </div>
                    </div>

                    {/* Compact Details Summary (5 cols) */}
                    <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-text-primary leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Compact Tech tags */}
                        <div className="pt-1">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="tech-badge !py-0.5 !px-2 !text-[11px]"
                              >
                                {tag.icon && (
                                  <span className="relative w-3 h-3 shrink-0">
                                    <Image
                                      src={tag.icon}
                                      alt={tag.name}
                                      fill
                                      className="object-contain"
                                      sizes="12px"
                                    />
                                  </span>
                                )}
                                <span>{tag.name}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-surface-border">
                        <Link
                          href={`/project/${project.id}`}
                          className="px-3.5 py-1.5 rounded-md bg-accent text-white text-xs font-mono tracking-wider uppercase font-semibold hover:bg-accent-hover transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>View Details</span>
                          <span aria-hidden="true">→</span>
                        </Link>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-md border border-surface-border text-xs font-mono tracking-wider uppercase text-text-secondary hover:text-accent hover:border-accent transition-colors"
                          >
                            Demo ↗
                          </a>
                        )}

                        {project.codeUrl && (
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-md border border-surface-border text-xs font-mono tracking-wider uppercase text-text-secondary hover:text-accent hover:border-accent transition-colors"
                          >
                            Code ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Accessible Lightbox Modal (Portaled Directly to Body, No Doom Scrolling) */}
      {activeGallery &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 sm:p-6 animate-fade-in"
            onClick={() => setActiveGallery(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative w-full max-w-4xl max-h-[85vh] flex flex-col justify-between bg-surface border border-surface-border rounded-xl overflow-hidden p-4 sm:p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-surface-border shrink-0">
                <span className="text-sm font-semibold text-text-primary">
                  {activeGallery.title}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-text-muted">
                    {activeGallery.index + 1} / {activeGallery.images.length}
                  </span>
                  <button
                    onClick={() => setActiveGallery(null)}
                    type="button"
                    className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-background transition-colors cursor-pointer"
                    aria-label="Close dialog"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Image Area */}
              <div className="relative flex-1 w-full my-3 min-h-[300px] max-h-[55vh] flex items-center justify-center">
                <Image
                  src={activeGallery.images[activeGallery.index]}
                  alt={`${activeGallery.title} - View ${activeGallery.index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1000px"
                  priority
                />
              </div>

              {/* Modal Footer Controls */}
              {activeGallery.images.length > 1 && (
                <div className="flex items-center justify-between pt-3 border-t border-surface-border shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveGallery((prev) =>
                        prev
                          ? {
                              ...prev,
                              index: (prev.index - 1 + prev.images.length) % prev.images.length,
                            }
                          : null
                      )
                    }
                    className="px-3 py-1.5 rounded-md border border-surface-border text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-text-primary hover:border-accent transition-colors cursor-pointer"
                  >
                    ← Previous
                  </button>
                  <span className="text-[11px] font-mono text-text-muted hidden sm:inline">
                    Use arrow keys or click buttons to navigate
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveGallery((prev) =>
                        prev
                          ? {
                              ...prev,
                              index: (prev.index + 1) % prev.images.length,
                            }
                          : null
                      )
                    }
                    className="px-3 py-1.5 rounded-md border border-surface-border text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-text-primary hover:border-accent transition-colors cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
