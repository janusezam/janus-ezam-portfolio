import type { MarqueeConfig } from "@/types";

export const marquees: Record<string, MarqueeConfig> = {
  top: {
    text: "JANUS EZAM TAGUD // PROTFOLIO 2026",
    separator: "—",
    speed: 40,
    direction: "left",
  },
  tagline: {
    text: "SOLVING THROUGH CODE  —  ITERATE . BUILD . DEPLOY .",
    separator: "—",
    speed: 40,
    direction: "right",
  },
  projects: {
    text: "RECENT PROJECTS",
    separator: "—",
    speed: 40,
    direction: "left",
  },
  certifications: {
    text: "ARCADE  —  RECOGNITION",
    separator: "|",
    speed: 40,
    direction: "right",
  },
  techStack: {
    text: "TECH STACK  —  TOOLS & FRAMEWORKS",
    separator: "—",
    speed: 40,
    direction: "left",
  },
};
