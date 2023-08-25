/** @type {import('next').NextConfig} */

const IMAGE_DAYS_CACHE = 60

const nextConfig = {
  images: {
    minimumCacheTTL: IMAGE_DAYS_CACHE * 24 * 60 * 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'anime-app.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'anime-scrapper-alpha.vercel.app',
        port: '',
        pathname: '/api/image/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.animeflv.net',
        port: '',
        pathname: '/screenshots/**',
      },
      {
        protocol: 'https',
        hostname: 'www3.animeflv.net',
        port: '',
        pathname: '/uploads/animes/covers/**',
      },
    ],
  },
}

module.exports = nextConfig
