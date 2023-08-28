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
      }
    ]
  }
}

module.exports = nextConfig
