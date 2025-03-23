'use client'

import blurImage from '@/public/lights-blur.webp'
import Image, { type StaticImageData } from 'next/image'
import styles from './BackgroundBlurredImage.module.css'

export function BackgroundBlurredImage({ src, alt }: { src: string | StaticImageData; alt: string }) {
	return (
		<Image
			src={src}
			alt={alt}
			width={500}
			height={600}
			decoding='async'
			priority={false}
			className={styles.bgImage}
			placeholder='blur'
			blurDataURL={blurImage.src}
			onLoad={(e) => {
				e.currentTarget.setAttribute('data-loaded', 'true')
			}}
		/>
	)
}
