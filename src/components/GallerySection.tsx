"use client";

import ScrollReveal from "./ScrollReveal";
import PictureRailGallery from "@/components/ui/picture-rail-gallery";
import { academicGalleryItems } from "@/data/gallery";

export default function GallerySection() {
  return (
    <section id="gallery" className="w-full py-16 md:py-20 border-b border-surface-border">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Section Heading */}
        <ScrollReveal direction="up" duration={500}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-surface-border mb-8">
            <div className="flex items-center gap-3">
              <span className="text-accent font-mono text-xs tracking-widest font-semibold">06</span>
              <span className="text-text-muted font-mono text-xs">/</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                Gallery
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-text-muted text-[11px] font-mono tracking-widest uppercase">
                Academic Journey & Milestones
              </span>
              <span className="text-xs font-mono text-text-secondary px-2.5 py-0.5 rounded border border-surface-border bg-surface">
                {academicGalleryItems.length} Moments
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Picture Rail Gallery */}
        <ScrollReveal direction="up" duration={500} delay={100}>
          <div className="rounded-lg border border-surface-border bg-surface/50 overflow-hidden shadow-sm">
            <PictureRailGallery
              items={academicGalleryItems}
              eyebrow="ACADEMIC ARCHIVE · 2022 – 2024"
              heading="A curated picture rail of achievements, defense, and hands-on laboratory milestones."
              caption="Slide frames along the rail, hover to illuminate, or click to lift and inspect the gallery label on the back."
              autoplay={true}
              interval={3000}
              className="py-4"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
