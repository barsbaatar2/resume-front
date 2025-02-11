import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactRoot: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
