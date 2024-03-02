import Link from 'next/link'
import { Pill } from '../Pill'
import styles from './Card.module.css'
import { CardImage } from './CardImage'
import { CardProps } from './types'

export function Card({ title, link, image, pill, showOnHover }: CardProps) {
  const mappedImage = {
    ...image,
    size: {
      width: image.width,
      height: image.height
    },
    alt: title
  }

  return (
    <article className={styles.card}>
      <Link href={link} className={styles.card_anchor}>
        <CardImage {...mappedImage} className={styles.card_img} useNext={false} />
        <div className={styles.content}>
          {pill?.label && <Pill label={pill.label} className={styles.pill} />}
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
      {showOnHover && <div className={styles.showOnHoverContainer}>{showOnHover}</div>}
    </article>
  )
}
