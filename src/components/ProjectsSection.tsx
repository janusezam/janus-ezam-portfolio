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
      className="w-full bg-background-alt py-16 md:py-24 relative"
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
              className="bg-card-bg border border-card-border rounded-2xl overflow-hidden card-hover shadow-sm"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Left: Laptop Screen Showcase */}
                <div
                  onClick={() =>
                    project.gallery &&
                    setActiveGallery({
                      images: project.gallery,
                      index: 0,
                      title: project.title,
                    })
                  }
                  className="laptop-mockup-wrapper group/laptop relative w-full lg:w-[50%] min-h-[320px] md:min-h-[380px] p-6 flex flex-col items-center justify-between cursor-pointer select-none border-b lg:border-b-0 lg:border-r border-card-border"
                >
                  <div className="w-full flex-1 flex items-center justify-center py-2">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={500}
                      priority
                      className="laptop-mockup-img"
                    />
                  </div>

                  {/* Hover Overlay matching Certifications exactly */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover/laptop:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                    <span className="px-4 py-2 rounded-full bg-accent/90 text-white font-medium text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg backdrop-blur-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                      Click to View
                    </span>
                  </div>

                  {/* Bottom Bar: View Project Image with Arrow (matching Certifications) */}
                  <div className="w-full pt-3 border-t border-card-border/50 flex items-center justify-between text-xs text-text-secondary group-hover/laptop:text-accent transition-colors">
                    <span className="font-semibold flex items-center gap-1.5">
                      View Project Image
                    </span>
                    <svg
                      className="w-4 h-4 link-arrow transform group-hover/laptop:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
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
                        className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
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
                        className="group inline-flex items-center gap-2 bg-surface hover:bg-background-alt border border-card-border text-text-primary text-sm font-semibold px-5 py-2.5 rounded-lg transition-all"
                      >
                        <span>View Code</span>
                        <svg
                          className="w-4 h-4 link-arrow text-text-muted group-hover:text-accent"
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

      {/* Lightbox Modal */}
      {activeGallery && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 transition-opacity duration-300">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10 max-w-6xl mx-auto w-full">
            <div>
              <h3 className="text-lg md:text-xl font-bold">
                {activeGallery.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-mono">
                {activeGallery.index + 1} / {activeGallery.images.length}
              </p>
            </div>
            <button
              onClick={() => setActiveGallery(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Image Display with Nav Buttons */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            {/* Prev Button */}
            <button
              onClick={() =>
                setActiveGallery((prev) =>
                  prev
                    ? {
                        ...prev,
                        index:
                          (prev.index - 1 + prev.images.length) %
                          prev.images.length,
                      }
                    : null
                )
              }
              className="absolute left-2 md:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-accent text-white transition-all border border-white/10 cursor-pointer"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Active Image */}
            <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
              <Image
                src={activeGallery.images[activeGallery.index]}
                alt={`Screenshot ${activeGallery.index + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Next Button */}
            <button
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
              className="absolute right-2 md:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-accent text-white transition-all border border-white/10 cursor-pointer"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto py-2 z-10 max-w-6xl mx-auto w-full">
            {activeGallery.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() =>
                  setActiveGallery((prev) =>
                    prev ? { ...prev, index: idx } : null
                  )
                }
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                  activeGallery.index === idx
                    ? "border-accent scale-110 shadow-lg shadow-accent/20"
                    : "border-white/20 opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
