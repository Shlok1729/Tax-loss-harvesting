import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
      },
      {
        protocol: 'https',
        hostname: 'koinx-statics.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
