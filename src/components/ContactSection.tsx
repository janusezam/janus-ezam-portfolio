"use client";

import { useState } from "react";
import Image from "next/image";
import { socialLinks, contactMethods } from "@/data/socials";
import { profile } from "@/data/profile";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Section Heading */}
        <ScrollReveal direction="up" duration={500}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-surface-border mb-10">
            <div className="flex items-center gap-3">
              <span className="text-accent font-mono text-xs tracking-widest font-semibold">07</span>
              <span className="text-text-muted font-mono text-xs">/</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">Contact & Connect</h2>
            </div>
            <p className="text-text-muted text-[11px] font-mono tracking-widest uppercase">
              Get in Touch
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Direct Communication (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <ScrollReveal direction="up" duration={500} delay={100}>
              <div className="bg-surface border border-surface-border rounded-lg p-6 sm:p-8">
                <h3 className="text-lg font-bold text-text-primary tracking-tight mb-2">
                  Let&apos;s build something reliable together.
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Currently seeking OJT / internship opportunities and open to discussing full-stack web projects. Reach out directly via email or message.
                </p>

                {/* Email Callout Box */}
                <div className="p-4 rounded-md bg-background border border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-text-muted tracking-wider block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm sm:text-base font-mono font-medium text-accent hover:underline"
                    >
                      {profile.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="px-3 py-1.5 rounded border border-surface-border text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-text-primary hover:border-accent transition-colors shrink-0"
                    >
                      {copied ? "Copied ✓" : "Copy"}
                    </button>
                    <a
                      href={`mailto:${profile.email}`}
                      className="px-3 py-1.5 rounded bg-accent text-white text-xs font-mono uppercase tracking-wider hover:bg-accent-hover transition-colors shrink-0 font-medium"
                    >
                      Send ↗
                    </a>
                  </div>
                </div>

                {/* Additional Contact Methods */}
                <div className="flex flex-col gap-3">
                  {contactMethods.map((method, idx) => (
                    <a
                      key={idx}
                      href={method.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-md border border-surface-border hover:border-accent/50 hover:bg-background transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        {method.imageIcon && (
                          <div className="relative w-5 h-5 shrink-0">
                            <Image
                              src={method.imageIcon}
                              alt={method.label}
                              fill
                              className="object-contain"
                              sizes="20px"
                            />
                          </div>
                        )}
                        <div>
                          <span className="text-xs font-mono text-text-muted block">
                            {method.label}
                          </span>
                          <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                            {method.value}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-text-muted group-hover:text-accent transition-colors">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Social Profiles & Developer Links (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <ScrollReveal direction="up" duration={500} delay={150}>
              <div className="bg-surface border border-surface-border rounded-lg p-6 sm:p-8">
                <h3 className="text-lg font-bold text-text-primary tracking-tight mb-2">
                  Profiles & Activity
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Explore verified code repositories, professional profile, and social channels.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-md border border-surface-border hover:border-accent hover:bg-background transition-all group"
                      title={`${link.platform}: ${link.handle}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {link.imageIcon ? (
                          <div className="relative w-6 h-6 shrink-0">
                            <Image
                              src={link.imageIcon}
                              alt={link.platform}
                              fill
                              className="object-contain"
                              sizes="24px"
                            />
                          </div>
                        ) : (
                          <span className="w-6 h-6 rounded bg-surface-border flex items-center justify-center font-mono text-xs font-bold text-text-primary">
                            {link.platform[0]}
                          </span>
                        )}
                        <div className="min-w-0">
                          <span className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors block truncate">
                            {link.platform}
                          </span>
                          <span className="text-xs font-mono text-text-muted block truncate">
                            {link.handle}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-text-muted group-hover:text-accent transition-colors pl-2">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>

                {/* Location indicator */}
                <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between text-xs font-mono text-text-muted">
                  <span>Timezone: GMT+8 (PHT)</span>
                  <span>Based in Bukidnon, PH</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
