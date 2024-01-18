import Image from 'next/image'
import styles from './BackgroundBlurredImage.module.css'

export function BackgroundBlurredImage({ src, alt }: { src: string, alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={600}
      decoding="async"
      priority={false}
      className={styles.bgImage}
      placeholder='blur'
      blurDataURL='/lights-blur.webp'
    />
  )
}