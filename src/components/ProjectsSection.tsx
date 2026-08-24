"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import ScrollReveal from "./ScrollReveal";
import { StaggerChildren } from "./ScrollReveal";

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

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeGallery) return;
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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGallery]);

  return (
    <section
      id="projects"
      className="w-full bg-background py-16 md:py-24 relative"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Header */}
        <ScrollReveal direction="up" duration={600}>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
              <span className="section-plus">+</span> Recent Projects
            </h2>
            <p className="text-text-muted text-xs tracking-[0.15em] uppercase font-mono">
              {projects.length} {projects.length === 1 ? "Project" : "Projects"}
            </p>
          </div>
        </ScrollReveal>

        <StaggerChildren stagger={200} direction="up" className="flex flex-col gap-8">
          {projects.map((project, index) => {
            const currentMode = getMode(project.id);
            return (
              <div
                key={project.id || index}
                className="bg-card-bg border border-card-border rounded-lg overflow-hidden card-hover"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left: Image Showcase with Toggle & Hover View Image Effect */}
                  <div className="relative w-full lg:w-[50%] min-h-[320px] md:min-h-[380px] flex flex-col select-none border-b lg:border-b-0 lg:border-r border-card-border overflow-hidden group/img">
                    
                    {/* Toggle Switch */}
                    <div
                      className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex bg-black/40 backdrop-blur-md rounded-lg p-1 border border-white/10 shadow-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setMode(project.id, "mockup")}
                        className={`px-3 py-1.5 text-[9px] md:text-[10px] font-mono tracking-wider uppercase rounded-md transition-all ${
                          currentMode === "mockup"
                            ? "bg-accent text-white shadow-md scale-100"
                            : "text-white/60 hover:text-white hover:bg-white/10 scale-95"
                        }`}
                      >
                        Mockup View
                      </button>
                      <button
                        onClick={() => setMode(project.id, "full")}
                        className={`px-3 py-1.5 text-[9px] md:text-[10px] font-mono tracking-wider uppercase rounded-md transition-all ${
                          currentMode === "full"
                            ? "bg-accent text-white shadow-md scale-100"
                            : "text-white/60 hover:text-white hover:bg-white/10 scale-95"
                        }`}
                      >
                        Full View
                      </button>
                    </div>

                    {/* Image Display Area (Clickable with Hover Animation) */}
                    <div
                      onClick={() => {
                        const gallery = currentMode === "mockup" ? project.gallery : project.fullGallery;
                        if (gallery && gallery.length > 0) {
                          setActiveGallery({
                            images: gallery,
                            index: 0,
                            title: project.title,
                          });
                        }
                      }}
                      className="w-full h-full flex flex-col p-6 items-center justify-between relative flex-1 cursor-pointer"
                    >
                      {/* Subtle Glow on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-accent/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Image Container with Crossfade & Hover Scale */}
                      <div className="w-full flex-1 relative flex items-center justify-center py-6 md:py-8 transition-transform duration-500 ease-out group-hover/img:scale-[1.03]">
                        {/* Mockup Image */}
                        <div
                          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                            currentMode === "mockup" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                          }`}
                        >
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                              src={project.image}
                              alt={`${project.title} Mockup`}
                              width={800}
                              height={500}
                              className="laptop-mockup-img max-h-full object-contain drop-shadow-xl"
                              priority={index === 0}
                            />
                          </div>
                        </div>

                        {/* Full Image */}
                        {project.fullImage && (
                          <div
                            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                              currentMode === "full" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                            }`}
                          >
                            <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
                              <Image
                                src={project.fullImage}
                                alt={`${project.title} Full View`}
                                width={800}
                                height={500}
                                className="max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                                priority={index === 0}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Hover Overlay with "View Image" Button */}
                      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none z-20">
                        <div className="flex items-center gap-2.5 bg-accent/90 text-white font-mono text-xs tracking-wider uppercase px-5 py-3 rounded-full shadow-2xl transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>View Image</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content Details */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Tags preview */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.slice(0, 5).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-mono px-2 py-0.5 rounded border"
                            style={{
                              color: tag.color,
                              borderColor: `${tag.color}35`,
                              backgroundColor: `${tag.color}10`,
                            }}
                          >
                            {tag.name}
                          </span>
                        ))}
                        {project.tags.length > 5 && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-card-border text-text-muted bg-surface">
                            +{project.tags.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Link */}
                    <div>
                      <Link
                        href={`/project/${project.id}`}
                        className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-[10px] font-mono tracking-[0.15em] uppercase px-4 py-2.5 rounded-md transition-all shadow-md shadow-accent/20"
                      >
                        <span>View Details</span>
                        <svg
                          className="w-4 h-4 link-arrow transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </StaggerChildren>
      </div>

      {/* Floating Centered Modal with Left/Right Arrows & 1-6 Counter */}
      {activeGallery && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 animate-fade-in"
          onClick={() => setActiveGallery(null)}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-5xl h-[80vh] flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveGallery(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/10 hover:bg-accent text-white transition-colors cursor-pointer backdrop-blur-sm border border-white/10"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Nav Arrow */}
            {activeGallery.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveGallery((prev) =>
                    prev
                      ? {
                          ...prev,
                          index: (prev.index - 1 + prev.images.length) % prev.images.length,
                        }
                      : null
                  );
                }}
                className="absolute left-4 z-30 p-3 rounded-full bg-white/10 hover:bg-accent text-white transition-all border border-white/10 cursor-pointer backdrop-blur-sm shadow-xl"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Image Display Area */}
            <div
              key={activeGallery.index}
              className="relative w-full h-full animate-fade-in p-4 md:p-12 flex items-center justify-center"
            >
              <Image
                src={activeGallery.images[activeGallery.index]}
                alt={`${activeGallery.title} - ${activeGallery.index + 1}`}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Right Nav Arrow */}
            {activeGallery.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveGallery((prev) =>
                    prev
                      ? {
                          ...prev,
                          index: (prev.index + 1) % prev.images.length,
                        }
                      : null
                  );
                }}
                className="absolute right-4 z-30 p-3 rounded-full bg-white/10 hover:bg-accent text-white transition-all border border-white/10 cursor-pointer backdrop-blur-sm shadow-xl"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            
            {/* Numeric Indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30 pointer-events-none">
              <span className="bg-black/75 backdrop-blur-md px-5 py-2 rounded-full text-white font-mono text-sm border border-white/10 shadow-2xl tracking-widest">
                {activeGallery.index + 1} / {activeGallery.images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
