"use client";

import Image from "next/image";
import { socialLinks, contactMethods } from "@/data/socials";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* ─── Find me on ────────────────────────────────────────── */}
      <ScrollReveal direction="left" duration={700}>
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2 flex items-center">
            <span className="section-plus">+</span> Find me on
          </h2>
          <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono mb-8">
            SOCIAL LINKS & PROFILES
          </p>

          {/* Interactive Expandable Pill Buttons displaying Social Details */}
          <ul className="social-expand-list">
            {socialLinks.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-expand-item"
                  style={
                    {
                      "--i": link.gradientFrom,
                      "--j": link.gradientTo,
                      "--hover-width": link.hoverWidth || "210px",
                    } as React.CSSProperties
                  }
                  title={`${link.platform}: ${link.handle}`}
                >
                  <span className="icon-box">
                    {link.imageIcon ? (
                      <Image
                        src={link.imageIcon}
                        alt={link.platform}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain drop-shadow"
                      />
                    ) : (
                      <span className="text-base font-bold text-text-primary">
                        {link.platform[0]}
                      </span>
                    )}
                  </span>
                  <span className="titulo">{link.handle || link.platform}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      {/* ─── Get in touch ──────────────────────────────────────── */}
      <ScrollReveal direction="right" duration={700} delay={150}>
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2 flex items-center">
            <span className="section-plus">+</span> Get in touch
          </h2>
          <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono mb-8">
            DIRECT REACH & CONTACT
          </p>

          {/* Interactive Expandable Pill Buttons displaying Contact Details */}
          <ul className="social-expand-list">
            {contactMethods.map((method) => (
              <li key={method.label}>
                <a
                  href={method.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-expand-item"
                  style={
                    {
                      "--i": method.gradientFrom,
                      "--j": method.gradientTo,
                      "--hover-width": method.hoverWidth || "220px",
                    } as React.CSSProperties
                  }
                  title={`${method.label}: ${method.value}`}
                >
                  <span className="icon-box">
                    {method.imageIcon ? (
                      <Image
                        src={method.imageIcon}
                        alt={method.label}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain drop-shadow"
                      />
                    ) : (
                      <span className="text-base font-bold text-text-primary">
                        {method.label[0]}
                      </span>
                    )}
                  </span>
                  <span className="titulo">{method.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </div>
  );
}
