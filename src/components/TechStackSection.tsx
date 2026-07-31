"use client";

import { useEffect, useRef } from "react";
import { techStack } from "@/data/techStack";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiExpress,
  SiJsonwebtokens,
  SiGithubactions,
  SiGithub,
  SiFigma,
  SiCanvas,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import type { IconType } from "react-icons";

// Map tech names to their official icon components
const iconMap: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  ExpressJS: SiExpress,
  "React Native": SiReact,
  JWT: SiJsonwebtokens,
  "GitHub Actions": SiGithubactions,
  GitHub: SiGithub,
  VSCode: VscVscode,
  Figma: SiFigma,
  Canva: SiCanvas,
};

export default function TechStackSection() {
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
    <div ref={sectionRef} className="section-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
        <span className="section-plus">+</span> Tech Stack
      </h2>

      <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono mb-8">
        TECHNOLOGIES & DEV
      </p>

      <div className="space-y-6">
        {techStack.map((category, catIndex) => (
          <div key={catIndex}>
            <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase font-mono mb-3">
              {category.category}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {category.items.map((item, itemIndex) => {
                const IconComponent = iconMap[item.name];
                return (
                  <span
                    key={itemIndex}
                    className="tech-badge gap-2 py-1.5 px-3 rounded-md transition-all duration-300 hover:scale-105"
                    style={{
                      color: item.color,
                      borderColor: `${item.color}40`,
                      backgroundColor: `${item.color}15`,
                    }}
                  >
                    {IconComponent && (
                      <IconComponent className="w-3.5 h-3.5 shrink-0" style={{ color: item.color }} />
                    )}
                    <span>{item.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

