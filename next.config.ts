import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "amplify-d1glye0ah9ybc6-ma-chafanastoragebucket9cc0-s7hlzcjsjaym.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
