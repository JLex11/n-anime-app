import { CarouselImage } from '@/types'
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

export async function Picture({ title, images, lazy }: Props) {
  const filteredImages = images.filter((image): image is CarouselImage => Boolean(image.link))
  const carouselImage = filteredImages[0]

  const imageWidth = 1920
  const imageHeight = imageWidth / 2

  return (
    <picture className={styles.carouselPicture}>
      <Image
        src={carouselImage ? carouselImage.link : '/lights-blur.webp'}
        alt={title}
        width={imageWidth}
        height={imageHeight}
        style={{ backgroundPosition: carouselImage ? carouselImage.position : 'center' }}
        loading={lazy ? 'lazy' : 'eager'}
        priority={!lazy}
      />
    </picture>
  )
}
