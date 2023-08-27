/** @type {import('next').NextConfig} */

const IMAGE_DAYS_CACHE = 60

const nextConfig = {
  images: {
    minimumCacheTTL: IMAGE_DAYS_CACHE * 24 * 60 * 60,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'anime-scrapper-alpha.vercel.app',
        port: '',
        pathname: '/api/image/**'
      }
    ]
  }
}

module.exports = nextConfig
