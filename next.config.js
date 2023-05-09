/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
