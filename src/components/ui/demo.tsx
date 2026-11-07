"use client";

import LogoCloud, { type BrandLogo } from "@/components/ui/logo-cloud";
import { techStack } from "@/data/techStack";

// Extract all authentic icons from project tech stack data
const brandLogos: BrandLogo[] = techStack
  .flatMap((cat) => cat.items)
  .filter((item): item is typeof item & { icon: string } => Boolean(item.icon))
  .map((item) => ({
    name: item.name,
    image: item.icon,
  }));

const settings = {
  username: "@janusezam",
  summary: "Contributions & Technology Stack",
  duration: 28,
};

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };

  return <LogoCloud brandLogos={brandLogos} username={s.username} summary={s.summary} duration={s.duration} />;
}
