"use client";

import { useState } from "react";
import WelcomePreloader, { useHasVisitedPortfolio } from "@/components/WelcomePreloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const hasVisited = useHasVisitedPortfolio();
  const [revealed, setRevealed] = useState(false);

  // If already visited in session, display content immediately; otherwise wait for preloader fade-out
  const isContentRevealed = hasVisited || revealed;

  return (
    <>
      {/* ─── Welcome Preloader ──────────────────────────────── */}
      <WelcomePreloader onFadingOut={() => setRevealed(true)} />

      {/* ─── Main Website Content (Soft Cinematic Landing) ─── */}
      <div
        className={`flex min-h-screen flex-col bg-background text-text-primary transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isContentRevealed
            ? "opacity-100 translate-y-0 filter-none"
            : "opacity-0 translate-y-4 blur-[4px]"
        }`}
      >
        {/* ─── Top Navigation ─────────────────────────────────── */}
        <Navbar />

        <main className="flex-1 flex flex-col">
          {/* ─── Hero Section ─────────────────────────────────── */}
          <Hero />

          {/* ─── 01 / About ────────────────────────────────────── */}
          <AboutSection />

          {/* ─── 02 / Experience & Education ──────────────────── */}
          <section
            id="experience"
            className="w-full py-16 md:py-20 border-b border-surface-border"
          >
            <div className="mx-auto max-w-6xl px-6 md:px-12">
              <ScrollReveal direction="up" duration={500}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-surface-border mb-10">
                  <div className="flex items-center gap-3">
                    <span className="text-accent font-mono text-xs tracking-widest font-semibold">
                      02
                    </span>
                    <span className="text-text-muted font-mono text-xs">/</span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                      Experience & Education
                    </h2>
                  </div>
                  <p className="text-text-muted text-[11px] font-mono tracking-widest uppercase">
                    Trajectory & Studies
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <ExperienceSection />
                <EducationSection />
              </div>
            </div>
          </section>

          {/* ─── 03 / Tech Stack ──────────────────────────────── */}
          <TechStackSection />

          {/* ─── 04 / Featured Projects ───────────────────────── */}
          <ProjectsSection />

          {/* ─── 05 / Certifications ──────────────────────────── */}
          <CertificationsSection />

          {/* ─── 06 / Gallery ─────────────────────────────────── */}
          <GallerySection />

          {/* ─── 07 / Contact & Connect ───────────────────────── */}
          <ContactSection />
        </main>

        {/* ─── Footer ─────────────────────────────────────────── */}
        <Footer />
      </div>
    </>
  );
}
