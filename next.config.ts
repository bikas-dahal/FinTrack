import type { NextConfig } from "next";

// import createNextIntlPlugin from 'next-intl/plugin';


// const  withNextIntl = createNextIntlPlugin()


const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', 
      },
      {
        protocol: 'https',
        hostname: 'w7.pngwing.com', 
      },
    ]
  }
};

export default (nextConfig);
