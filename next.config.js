/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle media files
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    // Handle punycode deprecation
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        punycode: 'punycode-lite',
      };
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }

    return config;
  },
  images: {
    domains: ['localhost'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Disable source maps in production to reduce bundle size
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // This helps prevent hydration mismatches
    optimizeFonts: true,
    optimizeCss: true,
  },
}

module.exports = nextConfig
