"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { certifications } from "@/data/certifications";
import type { Certification } from "@/types";
import ScrollReveal, { StaggerChildren } from "./ScrollReveal";

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="certifications" className="w-full bg-background py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Header */}
        <ScrollReveal direction="up" duration={600}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-1">
                <span className="section-plus">+</span> Certifications
              </h2>
              <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase font-mono">
                OFFICIAL CREDENTIALS
              </p>
            </div>
            <span className="text-text-muted text-xs tracking-[0.15em] uppercase font-mono border border-card-border px-3 py-1 rounded-full">
              {certifications.length} Certified
            </span>
          </div>
        </ScrollReveal>

        {/* Left-Aligned Single Frame Grid */}
        <StaggerChildren stagger={150} direction="scale" className="flex flex-wrap justify-start items-stretch gap-6 md:gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              onClick={() => cert.image && setSelectedCert(cert)}
              title={cert.title}
              className="group relative w-full sm:w-[380px] md:w-[440px] aspect-[4/3] bg-surface border-2 border-card-border hover:border-accent/80 rounded-xl shadow-md hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {cert.image && (
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                />
              )}

              {/* Hover View Indicator Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <span className="w-12 h-12 rounded-full bg-accent/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6"
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
                </span>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-card-bg border border-card-border rounded-xl overflow-hidden p-4 md:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 border-b border-card-border/60 pb-3">
              <div>
                <h4 className="text-base md:text-lg font-bold text-text-primary">
                  {selectedCert.title}
                </h4>
                {selectedCert.issuer && (
                  <p className="text-text-muted text-xs font-mono">
                    {selectedCert.issuer} {selectedCert.date ? `• ${selectedCert.date}` : ""}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-8 h-8 rounded-full bg-surface border border-card-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-accent transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Certificate Image Display */}
            {selectedCert.image && (
              <div className="relative w-full aspect-[4/3] max-h-[75vh] bg-surface rounded-lg overflow-hidden flex items-center justify-center border border-card-border/50">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain p-2"
                  sizes="100vw"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
