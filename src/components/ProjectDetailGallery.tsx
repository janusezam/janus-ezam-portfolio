"use client";

import { useState, useEffect } from "react";
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

  // Keyboard navigation when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + currentList.length) % currentList.length);
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % currentList.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, currentList.length]);

  return (
    <div className="flex flex-col gap-4">
      {/* View Mode Toggle Switch */}
      {project.fullImage && (
        <div className="flex justify-end">
          <div className="flex bg-card-bg rounded-lg p-1 border border-card-border shadow-sm">
            <button
              onClick={() => {
                setDisplayMode("mockup");
                if (selectedIndex >= mockups.length) setSelectedIndex(0);
              }}
              className={`px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase rounded-md transition-all ${
                displayMode === "mockup"
                  ? "bg-accent text-white shadow-sm font-semibold"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface"
              }`}
            >
              Mockup View
            </button>
            <button
              onClick={() => {
                setDisplayMode("full");
                if (selectedIndex >= fullViews.length) setSelectedIndex(0);
              }}
              className={`px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase rounded-md transition-all ${
                displayMode === "full"
                  ? "bg-accent text-white shadow-sm font-semibold"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface"
              }`}
            >
              Full View
            </button>
          </div>
        </div>
      )}

      {/* Main Image Container: Clean Picture with Hover Animation & View Image Button */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-card-bg border border-card-border rounded-2xl overflow-hidden shadow-xl p-6 md:p-10 flex items-center justify-center min-h-[380px] md:min-h-[500px] cursor-pointer transition-all duration-300 hover:border-accent/50 hover:shadow-2xl"
      >
        {/* Subtle Background Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* The Image with Hover Scale Animation */}
        <div className="relative w-full h-[320px] md:h-[450px] flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <Image
            src={activeImage}
            alt={`${project.title} ${displayMode === "mockup" ? "Mockup" : "Full View"}`}
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Hover Overlay with "View Image" Button */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2.5 bg-accent/90 text-white font-mono text-xs tracking-wider uppercase px-5 py-3 rounded-full shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>View Image</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal (with Nav Arrows & 1-6 Counter) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl h-[85vh] flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/10 hover:bg-accent text-white transition-colors cursor-pointer backdrop-blur-sm border border-white/10"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev Navigation Arrow */}
            {currentList.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev - 1 + currentList.length) % currentList.length);
                }}
                className="absolute left-4 z-30 p-3 rounded-full bg-white/10 hover:bg-accent text-white transition-all border border-white/10 cursor-pointer backdrop-blur-sm shadow-xl"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Modal Image */}
            <div
              key={`modal-${selectedIndex}-${displayMode}`}
              className="relative w-full h-full animate-fade-in p-4 md:p-12 flex items-center justify-center"
            >
              <Image
                src={activeImage}
                alt={`${project.title} - ${selectedIndex + 1}`}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Next Navigation Arrow */}
            {currentList.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev + 1) % currentList.length);
                }}
                className="absolute right-4 z-30 p-3 rounded-full bg-white/10 hover:bg-accent text-white transition-all border border-white/10 cursor-pointer backdrop-blur-sm shadow-xl"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* 1-6 Counter Indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30 pointer-events-none">
              <span className="bg-black/75 backdrop-blur-md px-5 py-2 rounded-full text-white font-mono text-sm border border-white/10 shadow-2xl tracking-widest">
                {selectedIndex + 1} / {currentList.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
