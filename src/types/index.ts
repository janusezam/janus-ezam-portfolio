// ─── Profile ─────────────────────────────────────────────
export interface Profile {
  firstName: string;
  middleName?: string;
  lastName: string;
  tagline: string;
  subtitle: string;
  location: string;
  resumeUrl: string;
  email: string;
  profileImage: string;
  profileImageDark?: string;
  profileImageLight?: string;
  aboutLabel: string;
  aboutParagraphs: string[];
}

// ─── Experience ──────────────────────────────────────────
export type ExperienceStatus = "Current" | "Ongoing" | "Completed";

export interface ExperienceEntry {
  title: string;
  organization: string;
  status: ExperienceStatus;
}

export interface ExperienceData {
  yearsCount: string;
  yearsLabel: string;
  entries: ExperienceEntry[];
}

// ─── Education ───────────────────────────────────────────
export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
}

// ─── Tech Stack ──────────────────────────────────────────
export interface TechItem {
  name: string;
  color: string;
}

export interface TechCategory {
  category: string;
  items: TechItem[];
}

// ─── Projects ────────────────────────────────────────────
export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  fullImage?: string;
  gallery?: string[];
  fullGallery?: string[];
  tags: ProjectTag[];
  liveUrl?: string;
  codeUrl?: string;
}

// ─── Certifications ─────────────────────────────────────
export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  image?: string;
  url?: string;
}

// ─── Socials & Contact ──────────────────────────────────
export interface SocialLink {
  platform: string;
  url: string;
  icon: "linkedin" | "github" | "facebook";
}

export interface ContactMethod {
  label: string;
  value: string;
  url?: string;
  icon: "email" | "at" | "messenger";
}

// ─── Marquee ─────────────────────────────────────────────
export interface MarqueeConfig {
  text: string;
  separator?: string;
  speed?: number; // seconds for one full cycle
  direction?: "left" | "right";
}

// ─── Site Meta ───────────────────────────────────────────
export interface SiteMeta {
  title: string;
  description: string;
  copyrightName: string;
  copyrightYear: string;
}
