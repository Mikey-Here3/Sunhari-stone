import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from any domain (for user-uploaded URLs)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
