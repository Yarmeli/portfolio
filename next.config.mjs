import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.PAYLOAD_PUBLIC_SERVER_URL.replace("https://", ""),
      },
      {
        hostname: "localhost",
      },
    ],
  },
};

export default withPayload(nextConfig);
