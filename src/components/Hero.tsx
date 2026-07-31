"use client";

import Image from "next/image";
import { profile } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";

import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { theme, mounted } = useTheme();

  const currentProfileImage =
    mounted && theme === "light"
      ? (profile.profileImageLight || "/images/profile-dark.jpg")
      : (profile.profileImageDark || "/images/profile-light.jpg");

  // Parse tagline: wrap text between * * in <em>
  const renderTagline = (text: string) => {
    const parts = text.split(/\*(.*?)\*/);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <em key={i} className="text-accent not-italic font-serif italic">
          {part}
        </em>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <section
      id="hero"
      className="relative w-full bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Profile Image */}
        <div className="flex-shrink-0 relative group">
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accent/5 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="profile-image-wrapper relative w-64 h-72 md:w-72 md:h-80 lg:w-80 lg:h-96 rounded-xl border border-card-border group-hover:border-accent/50 transition-all duration-500 shadow-2xl overflow-hidden">
            <Image
              src={currentProfileImage}
              alt={`${profile.firstName} ${profile.lastName}`}
              fill
              quality={95}
              className="object-cover object-center contrast-[1.03] saturate-[1.02] group-hover:scale-[1.03] transition-all duration-500 ease-out"
              priority
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5">
          {/* Tagline */}
          <p className="tagline text-text-secondary text-sm md:text-base tracking-wide font-light italic">
            {renderTagline(profile.tagline)}
          </p>

          {/* Name */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
              {profile.firstName}
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent leading-tight">
              {profile.lastName}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-text-muted text-xs tracking-[0.25em] uppercase font-mono">
            {profile.subtitle}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <svg
              className="w-4 h-4 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span>{profile.location}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 mt-2">
            <a
              href={profile.resumeUrl}
              className="px-6 py-2.5 border border-text-muted/40 text-text-primary text-xs tracking-[0.2em] uppercase font-mono rounded-sm hover:border-accent hover:text-accent transition-all duration-300"
              id="get-resume-btn"
            >
              GET RESUME
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="px-6 py-2.5 border border-text-muted/40 text-text-primary text-xs tracking-[0.2em] uppercase font-mono rounded-sm hover:border-accent hover:text-accent transition-all duration-300"
              id="email-me-btn"
            >
              EMAIL ME
            </a>
          </div>

          {/* Theme Toggle */}
          <div className="mt-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </section>
  );
}
