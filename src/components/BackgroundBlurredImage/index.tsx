'use client'

import Image, { type StaticImageData } from 'next/image'
import styles from './BackgroundBlurredImage.module.css'

export function BackgroundBlurredImage({ src, alt }: { src: string | StaticImageData; alt: string }) {
	// External URLs cannot use blur placeholder without blurDataURL
	// Use empty placeholder for external URLs to avoid 404 errors
	const isExternalUrl = typeof src === 'string'

	return (
		<Image
			src={src}
			alt={alt}
			width={500}
			height={600}
			decoding='async'
			priority={false}
			className={styles.bgImage}
			placeholder='empty'
		/>
	)
}
