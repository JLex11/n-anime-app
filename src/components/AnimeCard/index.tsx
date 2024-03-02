import Link from 'next/link'
import { CardImage } from '../Card/CardImage'
import styles from './AnimeCard.module.css'
import { CardProps } from './types'

export function AnimeCard({ title, link, image, labels, rank, description }: CardProps) {
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
      <Link href={link} className={styles.card_container}>
        <CardImage {...mappedImage} className={styles.card_img} useNext={false} />
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <footer className={styles.footer}>
            {labels &&
              labels.map((label, index) => (
                <>
                  <span key={index} className={styles.label}>
                    {label}
                  </span>
                  {labels.length - 1 !== index && <span className={styles.separator}>•</span>}
                </>
              ))}
          </footer>
        </div>
        <div className={styles.extraInfo}>
          <h4 className={styles.title}>{title}</h4>
          {rank && <span>{rank.toFixed(1)} ⭐</span>}
          <p>{description}</p>
        </div>
      </Link>
    </article>
  )
}
