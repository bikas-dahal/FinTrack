import type { NextConfig } from "next";

import { i18n } from './src/i18n.config';
import { withNextI18Next } from './src/next-i18next.config';

// const withNextIntl = createNextIntlPlugin()

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

export default withNextI18Next(nextConfig);
