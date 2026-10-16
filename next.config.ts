import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/partners/attorneys/:path*",
        destination: "/lawyers/:path*",
        permanent: true,
      },
      {
        source: "/partners/attorneys",
        destination: "/lawyers",
        permanent: true,
      },
      { source: "/partners", destination: "/about", permanent: true },
      {
        source: "/practice/family",
        destination: "/practice/divorce",
        permanent: true,
      },
      {
        source: "/practice/realestate",
        destination: "/practice/real-estate",
        permanent: true,
      },
      {
        source: "/insights/:path*",
        destination: "/columns/:path*",
        permanent: true,
      },
      { source: "/insights", destination: "/columns", permanent: true },
      { source: "/location", destination: "/locations", permanent: true },
    ];
  },
  experimental: {
    // Enables React/Next View Transitions — used for Kora-style page circle mask
    viewTransition: true,
  },
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
