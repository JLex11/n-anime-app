import { CarouselImage } from '@/types'
import { userIsMobile } from '@/utils/isMobile'
import { headers } from 'next/headers'
import Image from 'next/image'
import sharp from 'sharp'
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

async function getValidImage(images: CarouselImage[]): Promise<CarouselImage | null> {
  for await (const image of images) {
    try {
      const imgBuffer = await fetch(image.link).then(response => response.arrayBuffer())
      await sharp(imgBuffer).metadata()
      return image
    } catch (error) {}
  }

  return null
}

export async function Picture({ title, images, lazy }: Props) {
  const isMobile = userIsMobile(headers())

  const filteredImages = images.filter((image): image is CarouselImage => Boolean(image.link))
  const carouselImage = await getValidImage(filteredImages)

  const imageWidth = isMobile ? 648 : 1080
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
        placeholder='blur'
        blurDataURL='/lights-blur.webp'
      />
    </picture>
  )
}
