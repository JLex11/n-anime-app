/** @type {import('next').NextConfig} */
const withRspack = require('next-rspack')

const IMAGE_DAYS_CACHE = 30

const images = {
	minimumCacheTTL: IMAGE_DAYS_CACHE * 24 * 60 * 60,
	remotePatterns: [
		{
			protocol: 'https',
			hostname: 'anime-scrapper-alpha.vercel.app',
			port: '',
			pathname: '/api/image/**',
		},
		{
			protocol: 'http',
			hostname: 'anime-scrapper-alpha.vercel.app',
			port: '',
			pathname: '/api/image/**',
		},
		{
			protocol: 'http',
			hostname: 'anime-scrapper-2rl4-dev.fl0.io',
			port: '',
			pathname: '/api/image/**',
		},
		{
			protocol: 'https',
			hostname: 'anime-scrapper-2rl4-dev.fl0.io',
			port: '',
			pathname: '/api/image/**',
		},
		{
			protocol: 'https',
			hostname: 'anime-scrapper-3c3n.onrender.com',
			port: '',
			pathname: '/api/image/**',
		},
		{
			protocol: 'http',
			hostname: 'anime-scrapper-3c3n.onrender.com',
			port: '',
			pathname: '/api/image/**',
		},
	],
}

const nextConfig = {
	images,
	experimental: {
		viewTransition: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
}

module.exports = withRspack(nextConfig)
