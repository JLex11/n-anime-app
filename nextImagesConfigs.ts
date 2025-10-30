import type { RemotePattern } from 'next/dist/shared/lib/image-config'

const IMAGE_DAYS_CACHE = 30

export const images: { minimumCacheTTL: number; remotePatterns: RemotePattern[]; qualities: number[] } = {
	minimumCacheTTL: IMAGE_DAYS_CACHE * 24 * 60 * 60,
	qualities: [15, 50, 75, 80],  // Support all quality values used in the app
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
