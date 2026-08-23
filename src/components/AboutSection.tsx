"use client";

import { profile } from "@/data/profile";
import ScrollReveal from "./ScrollReveal";

export default function AboutSection() {
  return (
    <div>
      <ScrollReveal direction="left" duration={600}>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
          <span className="section-plus">+</span> About
        </h2>
      </ScrollReveal>

      <ScrollReveal direction="left" delay={100} duration={600}>
        <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono mb-6">
          {profile.aboutLabel}
        </p>
      </ScrollReveal>

      <div className="space-y-5">
        {profile.aboutParagraphs.map((paragraph, index) => (
          <ScrollReveal key={index} direction="up" delay={200 + index * 120} duration={700}>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              {paragraph}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
