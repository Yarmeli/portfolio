import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL.replace("https://", ""),
      },
      {
        hostname: "localhost",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@icons-pack/react-simple-icons"],
  },
};

export default withPayload(nextConfig);
