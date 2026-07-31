"use client";

import Preloader from "@/components/Preloader";
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { marquees } from "@/data/marquees";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* ─── Page Preloader / Splash Intro ────────────────── */}
      <Preloader />

      {/* ─── Top Marquee ──────────────────────────────────── */}
      {/* ─── Top Marquee ──────────────────────────────────── */}
      <Marquee
        config={marquees.top}
        className="border-t border-b border-accent/20"
      />

      {/* ─── Hero Section ─────────────────────────────────── */}
      <Hero />

      {/* ─── Tagline Marquee ──────────────────────────────── */}
      <Marquee
        config={marquees.tagline}
        className="border-t border-b border-card-border"
      />

      {/* ─── Experience + About ───────────────────────────── */}
      <section
        id="experience"
        className="w-full bg-background py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <ExperienceSection />
          <AboutSection />
        </div>
      </section>

      {/* ─── Education + Tech Stack ───────────────────────── */}
      <section
        id="education"
        className="w-full bg-background pb-16 md:pb-24"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <EducationSection />
          <TechStackSection />
        </div>
      </section>

      {/* ─── Projects Marquee ─────────────────────────────── */}
      <Marquee
        config={marquees.projects}
        className="border-t border-b border-card-border"
      />

      {/* ─── Projects Section ─────────────────────────────── */}
      <ProjectsSection />

      {/* ─── Certifications Marquee ───────────────────────── */}
      <Marquee
        config={marquees.certifications}
        className="border-t border-b border-card-border"
      />

      {/* ─── Certifications Showcase (Dedicated Full Section) ── */}
      <CertificationsSection />

      {/* ─── Contact Section (+ Find me on & + Get in touch) ── */}
      <section id="contact" className="w-full bg-background-alt py-16 md:py-24 border-t border-card-border">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <ContactSection />
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
