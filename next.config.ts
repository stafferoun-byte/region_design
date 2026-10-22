import type { NextConfig } from "next";
import { INSIGHT_ARTICLES, columnSlug } from "./src/data/insights";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/lawyers/lee-chang-jae", destination: "/lawyers/lee", permanent: true },
      { source: "/lawyers/kim-nam-yeol", destination: "/lawyers/kim", permanent: true },
      { source: "/lawyers/kang-nuri", destination: "/lawyers/kang", permanent: true },
      {
        source: "/partners/attorneys/lee-chang-jae",
        destination: "/lawyers/lee",
        permanent: true,
      },
      {
        source: "/partners/attorneys/kim-nam-yeol",
        destination: "/lawyers/kim",
        permanent: true,
      },
      {
        source: "/partners/attorneys/kang-nuri",
        destination: "/lawyers/kang",
        permanent: true,
      },
      ...INSIGHT_ARTICLES.map((article) => ({
        source: `/columns/${article.id}`,
        destination: `/columns/${columnSlug(article.title)}`,
        permanent: true,
      })),
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
