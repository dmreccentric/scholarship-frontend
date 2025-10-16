import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Optimize static output and revalidation
  poweredByHeader: false, // hides "X-Powered-By: Next.js" for security
  compress: true, // enables gzip compression for faster delivery

  // ✅ Automatic image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // optional if you ever use Unsplash
      },
    ],
    minimumCacheTTL: 60, // cache images for 1 minute
  },

  // ✅ Cache and static file optimization
  experimental: {
    optimizeCss: true, // reduces CSS size
    scrollRestoration: true, // improves UX for navigation
  },

  // ✅ Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // ✅ Output optimization for deployment (Vercel, Netlify, etc.)
  output: "standalone",
};

export default nextConfig;
