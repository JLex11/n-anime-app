/** @type {import('next').NextConfig} */

const IMAGE_DAYS_CACHE = 30

const nextConfig = {
  images: {
    minimumCacheTTL: IMAGE_DAYS_CACHE * 24 * 60 * 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'anime-scrapper-alpha.vercel.app',
        port: '',
        pathname: '/api/image/**'
      },
      {
        protocol: 'http',
        hostname: 'anime-scrapper-alpha.vercel.app',
        port: '',
        pathname: '/api/image/**'
      },
      {
        protocol: 'http',
        hostname: 'anime-scrapper-2rl4-dev.fl0.io',
        port: '',
        pathname: '/api/image/**'
      },
      {
        protocol: 'https',
        hostname: 'anime-scrapper-2rl4-dev.fl0.io',
        port: '',
        pathname: '/api/image/**'
      }
    ]
  }
}

module.exports = nextConfig
