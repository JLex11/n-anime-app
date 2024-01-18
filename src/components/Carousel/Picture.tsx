'use client'

import { useFallbackImage } from '@/hooks/useFallbackImage'
import Image from 'next/image'
import styles from './Carousel.module.css'

interface PictureImage {
	link?: string | null
	width?: number
	height?: number
	position?: string
}

interface Props {
	title: string
	images: PictureImage[]
	lazy: boolean
}

export function Picture({ title, images, lazy }: Props) {
	const { currentImage: carouselImage, onError } = useFallbackImage(images, { width: 1920, height: 960 })

	return (
		<picture className={styles.carouselPicture}>
			<Image
				src={carouselImage.link}
				alt={title}
				width={carouselImage.width}
				height={carouselImage.height}
				style={{ backgroundPosition: carouselImage.position || 'center' }}
				loading={lazy ? 'lazy' : 'eager'}
				priority={!lazy}
				onError={onError}
				placeholder='blur'
				blurDataURL='/lights-blur.webp'
			/>
		</picture>
	)
}
