import Image from 'next/image'
import Link from 'next/link'
import { CardImage } from './CardImage'
import styles from './HomeCard.module.css'
import { Pill, PillProps } from './Pill'

type Image = {
  src: string
  fbSrc?: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

interface CardProps {
  title: string
  link: string
  image: Image
  pill?: PillProps
  showOnHover?: React.ReactNode
}

export function HomeCard({ title, link, image, pill, showOnHover }: CardProps) {
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
      <Link href={link ?? ''} className={styles.card_anchor}>
        <CardImage {...mappedImage} className={styles.card_img} />
        <div className={styles.content}>
          {pill?.label && <Pill label={pill.label} />}
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
      {showOnHover && <div className={styles.showOnHoverContainer}>{showOnHover}</div>}
    </article>
  )
}
