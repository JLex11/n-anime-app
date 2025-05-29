import type { NextConfig } from 'next'
import { images } from './nextImagesConfigs'

const nextConfig: NextConfig = {
	images,
	experimental: {
		viewTransition: true,
		cssChunking: true,
		reactCompiler: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
}

module.exports = nextConfig
