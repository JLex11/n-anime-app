import { LastEpisode } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/EpisodeCard.module.css'

interface Props {
  episode: LastEpisode
}

export const EpisodeCard: React.FC<Props> = ({ episode }) => {
  if (!episode?.image) return null
  episode.link = `/${episode.animeId}/${episode.episode}`

  return (
    <article className={styles.link_card}>
      <Link href={episode.link ?? ''} legacyBehavior>
        <a href={episode.link} className={styles.card_anchor}>
          <Image
            src={episode.image}
            alt={episode.title}
            width={200}
            height={300}
            loading='lazy'
            priority={false}
            className={styles.card_img}
          />
          <div className={styles.content}>
            <span className={styles.episode}>Episode {episode.episode}</span>
            <h3 className={styles.title}>{episode.title}</h3>
          </div>
        </a>
      </Link>
    </article>
  )
}
