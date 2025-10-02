import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "directus-twoc08g80owskccsgcw04cgg.s.solvro.pl",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
