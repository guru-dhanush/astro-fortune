import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "astrofortune.lovestoblog.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "astrofortune.lovestoblog.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.wordpress.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
