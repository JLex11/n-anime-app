import type { NextConfig } from "next";
import { images } from "./nextImagesConfigs";

const nextConfig = {
  images: {
    ...images,
    // In development, tolerate image optimization errors to avoid console spam
    unoptimized: process.env.NODE_ENV === 'development',
  },
  reactCompiler: true,
  cacheComponents: true,
  cacheLife: {
    animeDetails: {
      stale: 43200,      // 12 hours
      revalidate: 86400, // 24 hours
      expire: 172800,    // 48 hours
    },
    animeList: {
      stale: 21600,      // 6 hours
      revalidate: 43200, // 12 hours
      expire: 86400,     // 24 hours
    },
    episodes: {
      stale: 1800,       // 30 minutes
      revalidate: 3600,  // 1 hour
      expire: 7200,      // 2 hours
    },
  },
  experimental: {
    viewTransition: true,
    cssChunking: true,
    turbopackFileSystemCacheForDev: true,
  },
} as NextConfig;

export default nextConfig;
