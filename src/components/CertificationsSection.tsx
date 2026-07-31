"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { certifications } from "@/data/certifications";
import type { Certification } from "@/types";

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

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
    <section id="certifications" className="w-full bg-background py-16 md:py-24">
      <div
        ref={sectionRef}
        className="section-fade-in mx-auto max-w-6xl px-6 md:px-12"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              <span className="section-plus">+</span> Certifications
            </h2>
            <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono">
              OFFICIAL CREDENTIALS & RECOGNITION
            </p>
          </div>
          <span className="text-text-muted text-xs tracking-[0.15em] uppercase font-mono border border-card-border px-3 py-1.5 rounded-full">
            {certifications.length} Certified
          </span>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              onClick={() => cert.image && setSelectedCert(cert)}
              className="group bg-card-bg border border-card-border rounded-xl overflow-hidden card-hover cursor-pointer flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              {cert.image ? (
                <div className="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-card-border/60">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Hover Overlay Badge */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                </div>
              ) : null}

              {/* Card Meta & Details */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] tracking-[0.15em] uppercase font-mono px-2.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                      Certified
                    </span>
                    {cert.date && (
                      <span className="text-text-muted text-xs font-mono">
                        {cert.date}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-text-muted text-xs mt-2">
                    {cert.issuer}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-card-border/50 flex items-center justify-between text-xs text-text-secondary group-hover:text-accent">
                  <span className="font-semibold flex items-center gap-1.5">
                    View Certificate Image
                  </span>
                  <svg
                    className="w-4 h-4 link-arrow transform group-hover:translate-x-1 transition-transform"
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
            </div>
          ))}
        </div>
      </div>

      {/* Full Image Modal / Lightbox */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-card-bg border border-card-border rounded-2xl overflow-hidden shadow-2xl p-4 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 border-b border-card-border/60 pb-3">
              <div>
                <h4 className="text-base md:text-lg font-bold text-text-primary">
                  {selectedCert.title}
                </h4>
                <p className="text-text-muted text-xs">{selectedCert.issuer} {selectedCert.date ? `• ${selectedCert.date}` : ""}</p>
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
              <div className="relative w-full aspect-[4/3] max-h-[75vh] bg-surface rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
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
