import Link from 'next/link'
import { Pill, PillProps } from '../Pill'
import { CardImage } from './CardImage'
import styles from './HomeCard.module.css'

export type ImageProps = {
  src: string | null | undefined
  fbSrc?: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

interface CardProps {
  title: string
  link: string
  image: ImageProps
  pill?: PillProps
  showOnHover?: React.ReactNode
}

export function Card({ title, link, image, pill, showOnHover }: CardProps) {
  const mappedImage = {
    ...image,
    dimensions: {
      width: image.width,
      height: image.height
    },
    alt: title
  }

  return (
    <article className={styles.card}>
      <Link href={link} className={styles.card_anchor}>
        <CardImage {...mappedImage} className={styles.card_img} />
        <div className={styles.content}>
          {pill?.label && <Pill label={pill.label} className={styles.pill} />}
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
      {showOnHover && <div className={styles.showOnHoverContainer}>{showOnHover}</div>}
    </article>
  )
}
