import clsx from 'clsx'
import { Pill } from '../Pill'
import styles from './Card.module.css'

export function CardSkeleton({ hasPill = false }) {
  return (
    <article className={clsx(styles.cardSkeleton, styles.card)}>
      <div className={styles.card_anchor}>
        <div className={styles.content}>
          {hasPill && <Pill label='' className={styles.pill} />}
          <span className={styles.title} />
        </div>
      </div>
    </article>
  )
}
