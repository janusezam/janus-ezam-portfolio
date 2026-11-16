import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@base-ui/react", "motion"],
  images: {
    qualities: [75, 95],
  },
};

export default nextConfig;
