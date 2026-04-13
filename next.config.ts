import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "https://notionclone-alpha.vercel.app/",
    "http://localhost:3000/",
    "https://smell-trash-impulse.ngrok-free.dev/",
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
