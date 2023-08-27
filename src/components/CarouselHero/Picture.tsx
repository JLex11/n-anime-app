import { placeholderImgs } from '@/utils/placeHolderImgs'
import Image from 'next/image'
import styles from './Carousel.module.css'

interface PictureImage {
  link?: string | null
  width?: number
  height?: number
  position?: string
}

interface FilteredImage extends PictureImage {
  link: string
}

interface Props {
  title: string
  images: PictureImage[]
  lazy: boolean
}

export const Picture = ({ title, images, lazy }: Props) => {
  // const { currentImage: carouselImage, onError } = useFallbackImage(images, { width: 1080, height: 650 })
  const mappedImages = [
    ...(images.filter(({ link }) => Boolean(link)) as FilteredImage[]),
    { link: '/lights-blur.webp' }
  ]
  const [carouselImage] = mappedImages

  return (
    <picture className={styles.carouselPicture}>
      <Image
        src={carouselImage.link}
        alt={title}
        width={carouselImage.width || 1080}
        height={carouselImage.height || 650}
        style={{ backgroundPosition: carouselImage.position }}
        loading={lazy ? 'lazy' : 'eager'}
        decoding={lazy ? 'sync' : 'async'}
        priority={!lazy}
        /* onError={onError} */
        blurDataURL={placeholderImgs[0]}
        placeholder='blur'
      />
    </picture>
  )
}
