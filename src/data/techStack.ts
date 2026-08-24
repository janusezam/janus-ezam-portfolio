import type { TechCategory } from "@/types";

export const techStack: TechCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", color: "#F7DF1E", icon: "/images/Techstack/JavaScript.png", description: "Dynamic web interactivity." },
      { name: "Java", color: "#ED8B00", icon: "/images/Techstack/Java.png", description: "Object-oriented programming." },
      { name: "PHP", color: "#777BB4", icon: "/images/Techstack/PHP.png", description: "Server-side scripting." },
      { name: "Python", color: "#3776AB", icon: "/images/Techstack/Python.png", description: "Versatile scripting language." },
    ],
  },
  {
    category: "Frontend Frameworks & Libraries",
    items: [
      { name: "HTML", color: "#E34F26", icon: "/images/Techstack/HTML5.png", description: "Semantic markup & structure." },
      { name: "CSS", color: "#1572B6", icon: "/images/Techstack/CSS3.png", description: "Styling & responsive layouts." },
      { name: "React", color: "#61DAFB", icon: "/images/Techstack/React.png", description: "Component-based UI library." },
      { name: "Vite", color: "#646CFF", icon: "/images/Techstack/Vite.js.png", description: "Lightning-fast build tool." },
      { name: "Vue", color: "#4FC08D", icon: "/images/Techstack/Vue.js.png", description: "Progressive JS framework." },
      { name: "Next.js", color: "#888888", icon: "/images/Techstack/Next.js.png", description: "Full-stack React framework." },
      { name: "React Native", color: "#61DAFB", icon: "/images/Techstack/React.png", description: "Cross-platform mobile apps." },
    ],
  },
  {
    category: "Backend Frameworks & Runtime",
    items: [
      { name: "Node.js", color: "#339933", icon: "/images/Techstack/Node.js.png", description: "JavaScript runtime engine." },
      { name: "Express.js", color: "#888888", icon: "/images/Techstack/Express.png", description: "Minimal Node web framework." },
      { name: "Laravel", color: "#FF2D20", icon: "/images/Techstack/Laravel.png", description: "Elegant PHP framework." },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", color: "#336791", icon: "/images/Techstack/PostgresSQL.png", description: "Advanced relational DB." },
      { name: "MongoDB", color: "#47A248", icon: "/images/Techstack/MongoDB.png", description: "NoSQL document database." },
      { name: "MySQL", color: "#4479A1", icon: "/images/Techstack/MySQL.png", description: "Popular relational database." },
    ],
  },
  {
    category: "AI Tools",
    items: [
      { name: "Claude", color: "#D97757", icon: "/images/Techstack/claude-color.png", description: "Anthropic's AI assistant." },
      { name: "ChatGPT", color: "#10A37F", icon: "/images/Techstack/openai.png", description: "OpenAI's conversational AI." },
      { name: "Gemini", color: "#4285F4", icon: "/images/Techstack/gemini-color.png", description: "Google's multimodal AI." },
    ],
  },
  {
    category: "Dev Tools & Platforms",
    items: [
      { name: "Git", color: "#F05032", icon: "/images/Techstack/Git.png", description: "Version control system." },
      { name: "GitHub", color: "#888888", icon: "/images/Techstack/GitHub.png", description: "Code hosting platform." },
      { name: "GitHub Actions", color: "#2088FF", icon: "/images/Techstack/GitHub Actions.png", description: "CI/CD automation." },
      { name: "Postman", color: "#FF6C37", icon: "/images/Techstack/Postman.png", description: "API testing & docs." },
      { name: "VS Code", color: "#007ACC", icon: "/images/Techstack/Visual Studio Code (VS Code).png", description: "Powerful code editor." },
      { name: "Antigravity", color: "#4285F4", icon: "/images/Techstack/Google-Antigravity-Icon-Full-Color.png", description: "Google's AI coding agent." },
      { name: "Figma", color: "#F24E1E", icon: "/images/Techstack/Figma.png", description: "Collaborative UI design." },
    ],
  },
];
