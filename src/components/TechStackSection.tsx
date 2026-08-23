"use client";

import { useState } from "react";
import Image from "next/image";
import { techStack } from "@/data/techStack";
import ScrollReveal from "./ScrollReveal";

export default function TechStackSection() {
  return (
    <div>
      <ScrollReveal direction="blur" duration={700}>
        <div className="flex items-center justify-between mb-14">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              <span className="section-plus">+</span> Tech Stack
            </h2>
            <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono">
              TECHNOLOGIES & DEV
            </p>
          </div>
          <span className="text-text-muted text-xs tracking-[0.15em] uppercase font-mono border border-card-border px-3 py-1.5 rounded-full">
            {techStack.reduce((acc, cat) => acc + cat.items.length, 0)} Skills
          </span>
        </div>
      </ScrollReveal>

      <div className="flex flex-col gap-12">
        {techStack.map((category, catIndex) => (
          <ScrollReveal
            key={catIndex}
            direction={catIndex % 2 === 0 ? "left" : "right"}
            duration={700}
            delay={100}
          >
            <div
              className={`flex flex-col ${
                catIndex % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-10 lg:gap-16`}
            >
              {/* Text Side */}
              <div className="w-full lg:w-[40%] flex flex-col justify-center">
                <p className="text-accent text-[10px] tracking-[0.3em] uppercase font-mono mb-2">
                  {String(catIndex + 1).padStart(2, "0")} / {String(techStack.length).padStart(2, "0")}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 tracking-tight">
                  {category.category}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  {category.items.map((i) => i.name).join(" · ")}
                </p>
                <div className="h-[1px] bg-card-border w-16" />
              </div>

              {/* Card Slider Side */}
              <div className="w-full lg:w-[60%] flex justify-center">
                <CardSlider items={category.items} categoryIndex={catIndex} />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ─── Card Slider Component ─────────────────────────────────
interface CardSliderProps {
  items: typeof techStack[0]["items"];
  categoryIndex: number;
}

function CardSlider({ items, categoryIndex }: CardSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  // Show up to 4 stacked cards
  const visibleCount = Math.min(items.length, 4);

  return (
    <div className="relative w-[180px] h-[230px] sm:w-[200px] sm:h-[250px] cursor-pointer select-none" onClick={handleClick}>
      {items.map((item, idx) => {
        // Calculate position relative to active
        const offset = (idx - activeIndex + items.length) % items.length;

        // Only render visible cards
        if (offset >= visibleCount) return null;

        const scale = 1 - offset * 0.05;
        const translateY = offset * -18;
        const translateX = offset * 14;
        const opacity = offset === 0 ? 1 : Math.max(0.4, 1 - offset * 0.2);
        const zIndex = items.length - offset;
        const rotate = offset * -3;

        return (
          <div
            key={`${categoryIndex}-${idx}`}
            className="tech-slider-card"
            style={{
              zIndex,
              transform: `translateY(${translateY}px) translateX(${translateX}px) scale(${scale}) rotate(${rotate}deg)`,
              opacity,
              "--card-color": item.color,
            } as React.CSSProperties}
          >
            {/* Card Number */}
            <span
              className="text-[11px] font-mono tracking-wider"
              style={{ color: item.color }}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>

            {/* Icon */}
            {item.icon && (
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 my-2 flex-shrink-0">
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className="object-contain drop-shadow-lg"
                  sizes="48px"
                />
              </div>
            )}

            {/* Name */}
            <h4 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
              {item.name}
            </h4>

            {/* Description */}
            {item.description && (
              <p className="text-text-muted text-[10px] mt-1 leading-snug text-center">
                {item.description}
              </p>
            )}

            {/* Bottom accent bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-60"
              style={{ backgroundColor: item.color }}
            />
          </div>
        );
      })}

      {/* Click hint */}
      <p className="absolute -bottom-9 left-0 right-0 text-center text-text-muted text-[9px] tracking-[0.2em] uppercase font-mono opacity-70">
        Click to cycle
      </p>
    </div>
  );
}
