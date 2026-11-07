"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { certifications } from "@/data/certifications";
import type { Certification } from "@/types";
import ScrollReveal from "./ScrollReveal";

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
    <section id="certifications" className="w-full py-16 md:py-20 border-b border-surface-border">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Section Heading */}
        <ScrollReveal direction="up" duration={500}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-surface-border mb-10">
            <div className="flex items-center gap-3">
              <span className="text-accent font-mono text-xs tracking-widest font-semibold">05</span>
              <span className="text-text-muted font-mono text-xs">/</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">Certifications</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-text-muted text-[11px] font-mono tracking-widest uppercase">
                Official Credentials
              </span>
              <span className="text-xs font-mono text-text-secondary px-2.5 py-0.5 rounded border border-surface-border bg-surface">
                {certifications.length} Credentials
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              duration={500}
              delay={index * 80}
            >
              <div
                onClick={() => cert.image && setSelectedCert(cert)}
                className="bg-surface border border-surface-border rounded-lg overflow-hidden flex flex-col justify-between h-full hover:border-accent/50 transition-colors cursor-pointer group"
              >
                {/* Certificate Image Frame */}
                {cert.image && (
                  <div className="relative w-full aspect-[4/3] bg-background border-b border-surface-border p-4 flex items-center justify-center overflow-hidden">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-surface/90 border border-surface-border text-[9px] font-mono uppercase tracking-wider text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                      Enlarge
                    </div>
                  </div>
                )}

                {/* Details */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary leading-snug group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>
                    {cert.issuer && (
                      <p className="text-xs text-text-muted mt-1.5 leading-relaxed">
                        {cert.issuer}
                      </p>
                    )}
                  </div>

                  {cert.date && (
                    <div className="pt-3 border-t border-surface-border flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-text-muted">Issued</span>
                      <span className="text-xs font-mono text-text-secondary">{cert.date}</span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full bg-surface border border-surface-border rounded-lg overflow-hidden p-5 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-surface-border mb-4">
              <div>
                <h4 className="text-base font-semibold text-text-primary">
                  {selectedCert.title}
                </h4>
                {selectedCert.issuer && (
                  <p className="text-xs font-mono text-text-muted mt-1">
                    {selectedCert.issuer} {selectedCert.date ? `• ${selectedCert.date}` : ""}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                type="button"
                className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-background transition-colors"
                aria-label="Close dialog"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Certificate Image Display */}
            {selectedCert.image && (
              <div className="relative w-full aspect-[4/3] max-h-[70vh] bg-background rounded border border-surface-border overflow-hidden flex items-center justify-center">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain p-3"
                  sizes="900px"
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
