"use client";

import Image from "next/image";
import { profile } from "@/data/profile";
import ScrollReveal from "./ScrollReveal";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { theme, mounted } = useTheme();

  const currentProfileImage =
    mounted && theme === "light"
      ? (profile.profileImageLight || "/images/profile-dark.jpg")
      : (profile.profileImageDark || "/images/profile-light.jpg");

  // Render tagline with clean emphasis (no decorative serif)
  const renderTagline = (text: string) => {
    const parts = text.split(/\*(.*?)\*/);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className="text-accent font-medium">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <section
      id="hero"
      className="relative w-full py-16 md:py-24 border-b border-surface-border"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-12 lg:gap-16">
          {/* Left / Main Text Content */}
          <div className="flex-1 flex flex-col items-start gap-6 max-w-2xl">
            <ScrollReveal direction="up" duration={500}>
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface border border-surface-border">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-[11px] font-mono tracking-widest uppercase text-text-secondary font-medium">
                    {profile.subtitle}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface border border-surface-border text-text-secondary">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono tracking-wider uppercase font-medium">
                    <span className="text-text-primary font-semibold">490 Hours</span> Internship / On-Site
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" duration={500} delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.1]">
                {profile.firstName} <span className="text-accent">{profile.lastName}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" duration={500} delay={200}>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                {renderTagline(profile.tagline)}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" duration={500} delay={300}>
              <div className="flex items-center gap-2 text-text-muted text-xs font-mono">
                <svg
                  className="w-3.5 h-3.5 text-accent shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{profile.location}</span>
              </div>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" duration={500} delay={400}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={profile.resumeUrl || "/Janus_Ezam_Tagud_Resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-white text-xs font-mono tracking-wider uppercase font-semibold hover:bg-accent-hover transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Get Resume</span>
                </a>
                <a
                  href="#contact-form"
                  className="px-5 py-2.5 rounded-md border border-surface-border bg-surface text-text-primary text-xs font-mono tracking-wider uppercase font-medium hover:border-accent hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40"
                  id="email-me-btn"
                >
                  Email Me
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Authentic Profile Photo */}
          <ScrollReveal direction="scale" duration={600} delay={150}>
            <div className="relative shrink-0">
              <div className="relative w-56 h-64 sm:w-64 sm:h-72 md:w-72 md:h-80 rounded-lg border border-surface-border overflow-hidden bg-surface shadow-sm">
                <Image
                  src={currentProfileImage}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  fill
                  quality={95}
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
