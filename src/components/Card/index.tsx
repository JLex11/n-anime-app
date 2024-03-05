import Link from 'next/link'
import { Pill } from '../Pill'
import styles from './Card.module.css'
import { CardImage } from './CardImage'
import { CardProps } from './types'

export function Card({ title, link, image, pill, showOnHover }: CardProps) {
  return (
    <article className={styles.card}>
      <Link href={link} className={styles.card_anchor}>
        <CardImage {...image} alt={title} className={styles.card_img} decoding='async' />
        <div className={styles.content}>
          {pill?.label && <Pill label={pill.label} className={styles.pill} />}
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
      {showOnHover && <div className={styles.showOnHoverContainer}>{showOnHover}</div>}
    </article>
  )
}
