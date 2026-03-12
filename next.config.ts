import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
    cacheLife: {
      products: { stale: 300, revalidate: 900, expire: 3600 },
      promo:    { stale: 60,  revalidate: 120, expire: 300 },
      store:    { stale: 3600, revalidate: 86400, expire: 604800 },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;