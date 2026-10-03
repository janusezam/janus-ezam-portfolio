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

      {/* ─── Personal Information ─────────────────────────── */}
      <section
        id="personal-info"
        className="w-full bg-background py-16 md:py-24 relative overflow-hidden"
      >
        {/* Background Ambient Radial Glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-[128px] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-6 md:px-12 flex flex-col gap-10 md:gap-14 relative z-10">
          {/* Top: About Card */}
          <div className="w-full">
            <AboutSection />
          </div>
          
          {/* Bottom: Experience & Education side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch">
            <ExperienceSection />
            <EducationSection />
          </div>
        </div>
      </section>

      {/* ─── Tech Stack Marquee ───────────────────────────── */}
      <Marquee
        config={marquees.techStack}
        className="border-t border-b border-card-border"
      />

      {/* ─── Tech Stack Section ───────────────────────────── */}
      <section
        id="tech-stack"
        className="w-full bg-background py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-12">
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
      <section id="contact" className="w-full bg-background py-16 md:py-24 border-t border-card-border">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <ContactSection />
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
