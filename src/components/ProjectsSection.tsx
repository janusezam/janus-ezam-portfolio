"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeGallery, setActiveGallery] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);
  const [displayMode, setDisplayMode] = useState<"mockup" | "full">("mockup");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

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
      <div
        ref={sectionRef}
        className="section-fade-in mx-auto max-w-6xl px-6 md:px-12"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            <span className="section-plus">+</span> Recent Projects
          </h2>
          <p className="text-text-muted text-xs tracking-[0.15em] uppercase font-mono">
            {projects.length} {projects.length === 1 ? "Project" : "Projects"}
          </p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-card-bg border border-card-border rounded-lg overflow-hidden card-hover"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Left: Image Showcase with Toggle */}
                <div className="relative w-full lg:w-[50%] min-h-[320px] md:min-h-[380px] flex flex-col cursor-pointer select-none border-b lg:border-b-0 lg:border-r border-card-border overflow-hidden group/laptop">
                  
                  {/* Toggle Switch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex bg-black/40 backdrop-blur-md rounded-lg p-1 border border-white/10 shadow-xl" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setDisplayMode("mockup")}
                      className={`px-3 py-1.5 text-[9px] md:text-[10px] font-mono tracking-wider uppercase rounded-md transition-all ${displayMode === "mockup" ? "bg-accent text-white shadow-md scale-100" : "text-white/60 hover:text-white hover:bg-white/10 scale-95"}`}
                    >
                      Mockup View
                    </button>
                    <button
                      onClick={() => setDisplayMode("full")}
                      className={`px-3 py-1.5 text-[9px] md:text-[10px] font-mono tracking-wider uppercase rounded-md transition-all ${displayMode === "full" ? "bg-accent text-white shadow-md scale-100" : "text-white/60 hover:text-white hover:bg-white/10 scale-95"}`}
                    >
                      Full View
                    </button>
                  </div>

                  {/* Image Display Area (Clickable) */}
                  <div
                    onClick={() => {
                      const gallery = displayMode === "mockup" ? project.gallery : project.fullGallery;
                      if (gallery) {
                        setActiveGallery({
                          images: gallery,
                          index: 0,
                          title: project.title,
                        });
                      }
                    }}
                    className="w-full h-full flex flex-col p-6 items-center justify-between relative flex-1 transition-transform duration-300 hover:scale-[1.02]"
                  >
                    {/* Image Container with Crossfade */}
                    <div className="w-full flex-1 relative flex items-center justify-center py-6 md:py-8">
                      {/* Mockup Image */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${displayMode === "mockup" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}>
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={project.image}
                            alt={`${project.title} Mockup`}
                            width={800}
                            height={500}
                            className="laptop-mockup-img max-h-full object-contain"
                            priority
                          />
                        </div>
                      </div>

                      {/* Full Image */}
                      {project.fullImage && (
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${displayMode === "full" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}>
                          <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
                            <Image
                              src={project.fullImage}
                              alt={`${project.title} Full View`}
                              width={800}
                              height={500}
                              className="max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                              priority
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Content Details */}
                <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="mb-8">
                      <h4 className="text-xs font-mono uppercase text-text-muted tracking-wider mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="tech-badge text-[12px] py-1 px-3"
                            style={{
                              color: tag.color,
                              borderColor: `${tag.color}40`,
                              backgroundColor: `${tag.color}15`,
                            }}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons / Links */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-card-border/60">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-[10px] font-mono tracking-[0.15em] uppercase px-4 py-2 rounded-md transition-all"
                      >
                        <span>View Project</span>
                        <svg
                          className="w-4 h-4 link-arrow"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 bg-card-bg hover:bg-surface border border-card-border hover:border-accent text-text-secondary hover:text-accent text-[10px] font-mono tracking-[0.15em] uppercase px-4 py-2 rounded-md transition-all"
                      >
                        <span>View Code</span>
                        <svg
                          className="w-4 h-4 link-arrow text-text-muted group-hover:text-accent transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Centered Modal */}
      {activeGallery && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-fade-in"
          onClick={() => setActiveGallery(null)}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-5xl bg-card-bg rounded-xl border border-card-border shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveGallery(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/80 text-white transition-colors cursor-pointer backdrop-blur-sm"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Display Area */}
            <div className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center bg-black/20">
              {/* Prev Button */}
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
                className="absolute left-4 z-20 p-3 rounded-full bg-black/40 hover:bg-accent text-white transition-all border border-white/10 cursor-pointer backdrop-blur-sm"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* The Image with fade effect */}
              <div
                key={activeGallery.index}
                className="absolute inset-0 w-full h-full animate-fade-in p-2 md:p-8"
              >
                <Image
                  src={activeGallery.images[activeGallery.index]}
                  alt={`${activeGallery.title} - ${activeGallery.index + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Next Button */}
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
                className="absolute right-4 z-20 p-3 rounded-full bg-black/40 hover:bg-accent text-white transition-all border border-white/10 cursor-pointer backdrop-blur-sm"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Numeric Indicator */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 pointer-events-none">
              <span className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white font-mono text-sm border border-white/10 shadow-lg tracking-widest">
                {activeGallery.index + 1} / {activeGallery.images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
