"use client";

import { useState } from "react";
import Image from "next/image";
import { socialLinks, contactMethods } from "@/data/socials";
import { profile } from "@/data/profile";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    const emailSubject = encodeURIComponent(
      formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim() || "Visitor"}`
    );
    const emailBody = encodeURIComponent(
      `Hello Janus,\n\n${formData.message}\n\nFrom:\n${formData.name || "Anonymous"}\nEmail: ${formData.email}`
    );

    // Trigger user's mail client
    window.location.href = `mailto:${profile.email}?subject=${emailSubject}&body=${emailBody}`;

    setStatus("sent");
    setTimeout(() => setStatus("idle"), 5000);
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
              Get in Touch & Send Message
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div id="contact-form" className="lg:col-span-7 flex flex-col gap-6 scroll-mt-24">
            <ScrollReveal direction="up" duration={500} delay={100}>
              <div className="bg-surface border border-surface-border rounded-lg p-6 sm:p-8 shadow-sm">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted">
                      Direct Message
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                    Send me an email
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-1">
                    Have an internship opportunity, project inquiry, or just want to connect? Fill out the fields below and it will compose your email directly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="sender-name"
                        className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-medium mb-1.5"
                      >
                        Your Name
                      </label>
                      <input
                        id="sender-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-background border border-surface-border rounded-md px-3.5 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors font-sans"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="sender-email"
                        className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-medium mb-1.5"
                      >
                        Your Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="sender-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full bg-background border border-surface-border rounded-md px-3.5 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors font-sans"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label
                      htmlFor="email-subject"
                      className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-medium mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="email-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Opportunity / Collaboration Inquiry"
                      className="w-full bg-background border border-surface-border rounded-md px-3.5 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors font-sans"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor="email-message"
                      className="block text-xs font-mono uppercase tracking-wider text-text-secondary font-medium mb-1.5"
                    >
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="email-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here..."
                      className="w-full bg-background border border-surface-border rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors font-sans resize-none"
                    />
                  </div>

                  {/* Submit Button & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-accent text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-accent-hover transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer"
                    >
                      <span>Send Email</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>

                    {status === "sent" && (
                      <span className="text-xs font-mono text-emerald-500 flex items-center gap-1.5">
                        <span className="font-bold">✓</span> Opening email client...
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Direct Contacts & Verified Profiles (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ScrollReveal direction="up" duration={500} delay={150}>
              <div className="bg-surface border border-surface-border rounded-lg p-6 sm:p-7 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-bold text-text-primary tracking-tight mb-1">
                    Quick Contacts
                  </h3>
                  <p className="text-xs text-text-muted font-mono">
                    Direct access via email or instant messaging
                  </p>
                </div>

                {/* Email Callout Box */}
                <div className="p-4 rounded-md bg-background border border-surface-border flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-text-muted tracking-wider block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-xs sm:text-sm font-mono font-medium text-accent hover:underline truncate block"
                    >
                      {profile.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="px-3 py-1.5 rounded border border-surface-border text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-text-primary hover:border-accent transition-colors shrink-0 cursor-pointer"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>

                {/* Messenger / Phone Contacts */}
                <div className="flex flex-col gap-2.5">
                  {contactMethods.map((method, idx) => (
                    <a
                      key={idx}
                      href={method.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-md border border-surface-border hover:border-accent/50 hover:bg-background transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {method.imageIcon && (
                          <div className="relative w-4 h-4 shrink-0">
                            <Image
                              src={method.imageIcon}
                              alt={method.label}
                              fill
                              className="object-contain"
                              sizes="16px"
                            />
                          </div>
                        )}
                        <span className="text-xs font-mono text-text-muted">
                          {method.label}:
                        </span>
                        <span className="text-xs font-medium text-text-primary group-hover:text-accent transition-colors truncate">
                          {method.value}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-text-muted group-hover:text-accent transition-colors">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>

                {/* Social Profiles Grid */}
                <div>
                  <span className="text-[10px] font-mono uppercase text-text-muted tracking-wider block mb-2.5">
                    Verified Profiles
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {socialLinks.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-md border border-surface-border hover:border-accent hover:bg-background transition-all group"
                        title={`${link.platform}: ${link.handle}`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {link.imageIcon && (
                            <div className="relative w-4 h-4 shrink-0">
                              <Image
                                src={link.imageIcon}
                                alt={link.platform}
                                fill
                                className="object-contain"
                                sizes="16px"
                              />
                            </div>
                          )}
                          <span className="text-xs font-medium text-text-primary group-hover:text-accent transition-colors truncate">
                            {link.platform}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-text-muted group-hover:text-accent transition-colors">
                          ↗
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Location indicator */}
                <div className="pt-3 border-t border-surface-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>GMT+8 (PHT)</span>
                  <span>Malaybalay City, PH</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
