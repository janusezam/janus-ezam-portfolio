"use client";

import { useEffect, useRef } from "react";
import { socialLinks, contactMethods } from "@/data/socials";
import type { SocialLink, ContactMethod } from "@/types";

/* ─── Icon map for social links ────────────────────────── */
function SocialIcon({ icon }: { icon: SocialLink["icon"] }) {
  switch (icon) {
    case "linkedin":
      return (
        <span className="w-8 h-8 rounded-md bg-[#0A66C2]/15 text-[#0A66C2] flex items-center justify-center text-xs font-bold">
          in
        </span>
      );
    case "github":
      return (
        <span className="w-8 h-8 rounded-md bg-text-muted/15 text-text-secondary flex items-center justify-center">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </span>
      );
    case "facebook":
      return (
        <span className="w-8 h-8 rounded-md bg-[#1877F2]/15 text-[#1877F2] flex items-center justify-center text-xs font-bold">
          f
        </span>
      );
  }
}

/* ─── Icon map for contact methods ─────────────────────── */
function ContactIcon({ icon }: { icon: ContactMethod["icon"] }) {
  switch (icon) {
    case "email":
      return (
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
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      );
    case "at":
      return (
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
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
      );
    case "messenger":
      return (
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
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
      );
  }
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-fade-in grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Find me on */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
          <span className="section-plus">+</span> Find me on
        </h2>
        <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono mb-6">
          SOCIAL LINKS
        </p>

        <div className="flex flex-col gap-3">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card-bg border border-card-border rounded-lg p-4 card-hover flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <SocialIcon icon={link.icon} />
                <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                  {link.platform}
                </span>
              </div>
              <svg
                className="w-4 h-4 text-text-muted link-arrow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Get in touch */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
          <span className="section-plus">+</span> Get in touch
        </h2>
        <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono mb-6">
          DIRECT REACH
        </p>

        <div className="flex flex-col gap-3">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card-bg border border-card-border rounded-lg p-4 card-hover flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <ContactIcon icon={method.icon} />
                <div>
                  <p className="text-text-muted text-[10px] tracking-wider uppercase">
                    {method.label}
                  </p>
                  <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                    {method.value}
                  </p>
                </div>
              </div>
              <svg
                className="w-4 h-4 text-text-muted link-arrow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
