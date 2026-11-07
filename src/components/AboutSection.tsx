"use client";

import { profile } from "@/data/profile";
import ScrollReveal from "./ScrollReveal";

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-16 md:py-20 border-b border-surface-border">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Section Heading */}
        <ScrollReveal direction="up" duration={500}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-surface-border mb-10">
            <div className="flex items-center gap-3">
              <span className="text-accent font-mono text-xs tracking-widest font-semibold">01</span>
              <span className="text-text-muted font-mono text-xs">/</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">About</h2>
            </div>
            <p className="text-text-muted text-[11px] font-mono tracking-widest uppercase">
              {profile.aboutLabel || "BACKGROUND & BIO"}
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <ScrollReveal direction="up" duration={500} delay={100}>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Building functional, reliable web applications.
              </h3>
              <p className="text-sm text-text-muted font-mono leading-relaxed">
                4th-year BS Information Technology student focusing on full-stack development, modern frameworks, and practical systems engineering.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-5">
            {profile.aboutParagraphs.map((paragraph, index) => (
              <ScrollReveal key={index} direction="up" delay={150 + index * 80} duration={500}>
                <p className="text-text-secondary text-base leading-relaxed">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
