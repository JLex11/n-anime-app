/** @type {import('next').NextConfig} */

const IMAGE_MONTHS_CACHE = 3

const nextConfig = {
  images: {
    minimumCacheTTL: IMAGE_MONTHS_CACHE * 30 * 24 * 60 * 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'anime-app.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.animeflv.net',
        port: '',
        pathname: '/screenshots/**',
      },
    ],
  },
}

module.exports = nextConfig
