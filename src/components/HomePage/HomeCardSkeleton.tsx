import clsx from 'clsx'
import styles from './HomeCard.module.css'
import { Pill } from './Pill'

interface CardProps {
  hasPill?: boolean
}

export const HomeCardSkeleton = ({ hasPill = false }: CardProps) => {
  return (
    <article className={clsx(styles.cardSkeleton, styles.card)}>
      <div className={styles.card_anchor}>
        <div className={styles.content}>
          {hasPill && <Pill label='' />}
          <h3 className={styles.title}></h3>
        </div>
      </div>
    </article>
  )
}
