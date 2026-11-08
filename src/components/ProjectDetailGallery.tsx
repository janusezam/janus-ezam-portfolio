"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Project } from "@/types";

interface ProjectDetailGalleryProps {
  project: Project;
}

export default function ProjectDetailGallery({ project }: ProjectDetailGalleryProps) {
  const [displayMode, setDisplayMode] = useState<"mockup" | "full">("mockup");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockups = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const fullViews =
    project.fullGallery && project.fullGallery.length > 0
      ? project.fullGallery
      : project.fullImage
      ? [project.fullImage]
      : mockups;

  const currentList = displayMode === "mockup" ? mockups : fullViews;
  const activeImage = currentList[selectedIndex] || currentList[0] || project.image;

  // Keyboard navigation when modal is open & Lock background scroll
  useEffect(() => {
    if (!isModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + currentList.length) % currentList.length);
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % currentList.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, currentList.length]);

  return (
    <div className="flex flex-col gap-4">
      {/* View Mode Toggle Switch */}
      {project.fullImage && (
        <div className="flex justify-end">
          <div className="flex bg-surface rounded border border-surface-border p-0.5 text-[11px] font-mono">
            <button
              onClick={() => {
                setDisplayMode("mockup");
                if (selectedIndex >= mockups.length) setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded transition-colors ${
                displayMode === "mockup"
                  ? "bg-accent text-white font-medium"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              Mockup View
            </button>
            <button
              onClick={() => {
                setDisplayMode("full");
                if (selectedIndex >= fullViews.length) setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded transition-colors ${
                displayMode === "full"
                  ? "bg-accent text-white font-medium"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              Full View
            </button>
          </div>
        </div>
      )}

      {/* Main Image Container */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-surface border border-surface-border rounded-lg overflow-hidden p-6 md:p-8 flex items-center justify-center min-h-[380px] md:min-h-[460px] cursor-pointer hover:border-accent/50 transition-colors"
      >
        <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
          <Image
            src={activeImage}
            alt={`${project.title} ${displayMode === "mockup" ? "Mockup" : "Full View"}`}
            fill
            className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
            priority
          />
        </div>

        {/* Quiet Enlarge Hint */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-background/90 border border-surface-border text-[10px] font-mono uppercase tracking-wider text-text-muted opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          <span>Enlarge</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {currentList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {currentList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-14 shrink-0 rounded border overflow-hidden transition-colors ${
                selectedIndex === idx
                  ? "border-accent ring-1 ring-accent"
                  : "border-surface-border opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Accessible Full Screen Modal (Portaled Directly to Body, No Doom Scrolling) */}
      {isModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 sm:p-6 animate-fade-in"
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative w-full max-w-4xl max-h-[85vh] flex flex-col justify-between bg-surface border border-surface-border rounded-xl overflow-hidden p-4 sm:p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-surface-border shrink-0">
                <span className="text-sm font-semibold text-text-primary">
                  {project.title}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-text-muted">
                    {selectedIndex + 1} / {currentList.length}
                  </span>
                  <button
                    onClick={() => setIsModalOpen(false)}
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

              {/* Modal Image Display */}
              <div className="relative flex-1 w-full my-3 min-h-[300px] max-h-[55vh] flex items-center justify-center">
                <Image
                  src={activeImage}
                  alt={`${project.title} - ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1000px"
                  priority
                />
              </div>

              {/* Navigation Controls */}
              {currentList.length > 1 && (
                <div className="flex items-center justify-between pt-3 border-t border-surface-border shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((prev) => (prev - 1 + currentList.length) % currentList.length)
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
                    onClick={() => setSelectedIndex((prev) => (prev + 1) % currentList.length)}
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
    </div>
  );
}
