import type { TechCategory } from "@/types";

export const techStack: TechCategory[] = [
  {
    category: "FRONTEND",
    items: [
      { name: "HTML", color: "#E34F26" },
      { name: "CSS", color: "#1572B6" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "React", color: "#61DAFB" },
      { name: "Tailwind CSS", color: "#06B6D4" },
    ],
  },
  {
    category: "BACKEND",
    items: [
      { name: "Node.js", color: "#339933" },
      { name: "MySQL", color: "#4479A1" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "ExpressJS", color: "#888888" },
    ],
  },
  {
    category: "MOBILE",
    items: [
      { name: "React Native", color: "#61DAFB" },
    ],
  },
  {
    category: "DEVOPS / AUTH",
    items: [
      { name: "JWT", color: "#D63AFF" },
      { name: "GitHub Actions", color: "#2088FF" },
    ],
  },
  {
    category: "TOOLS",
    items: [
      { name: "GitHub", color: "#888888" },
      { name: "VSCode", color: "#007ACC" },
      { name: "Figma", color: "#F24E1E" },
      { name: "Canva", color: "#00C4CC" },
    ],
  },
];
