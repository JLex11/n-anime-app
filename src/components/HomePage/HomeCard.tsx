import styles from '@/styles/HomeCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { CardImage } from './CardImage'
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
}

export const HomeCard = ({ title, link, image, pill }: CardProps) => {
  return (
    <article className={styles.card}>
      <Link href={link ?? ''} className={styles.card_anchor}>
        <CardImage
          src={image.src}
          fbSrc={image.fbSrc}
          alt={title}
          width={image.width}
          height={image.height}
          loading={image.loading ?? 'lazy'}
          priority={image.priority ?? false}
          className={styles.card_img}
        />
        <div className={styles.content}>
          {pill?.label && <Pill label={pill.label} />}
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
    </article>
  )
}
