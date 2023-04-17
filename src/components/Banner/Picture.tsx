import { BannerImage } from '@/types'
import { placeholderImgs } from '@/utils/placeHolderImgs'
import Image from 'next/image'
import { useRef } from 'react'
import styles from '../../styles/Banner.module.css'

interface Props {
  animeId: string
  title: string
  images: BannerImage[]
  index: number
}

type HandleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  bannerImages: BannerImage[] | undefined
) => void

export const Picture: React.FC<Props> = ({ animeId, title, images, index }) => {
  const currentImageRef = useRef(1)
  const bannerImage = images?.at(0)
  const placeholderImg = placeholderImgs.at(0)

  const handleImageError: HandleImageError = (e, images) => {
    const target = e.target as HTMLImageElement
    if (images?.length === 0) return

    const fallbackImage = images?.at(currentImageRef.current++)
    if (!fallbackImage) return
    if (target.src === fallbackImage?.link) return

    target.src = fallbackImage?.link ?? ''
    target.width = fallbackImage?.width ?? 0
    target.height = fallbackImage?.height ?? 0
  }

  return (
    <picture className={styles.bannerPicture}>
      <Image
        src={bannerImage?.link ?? ''}
        alt={title}
        width={bannerImage?.width}
        height={bannerImage?.height}
        style={{ backgroundPosition: bannerImage?.position }}
        loading={index === 0 ? 'eager' : 'lazy'}
        priority={!index}
        quality={80}
        onError={e => handleImageError(e, images)}
        id={animeId}
        blurDataURL={placeholderImg}
        placeholder='blur'
      />
    </picture>
  )
}
