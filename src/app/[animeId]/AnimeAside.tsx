import { placeholderImgs } from '@/utils/placeHolderImgs'
import Image from 'next/image'
import styles from './Anime.module.css'

interface Props {
  image: string
  status: string | undefined
  title: string
}

export const AnimeAside = ({ image, status, title }: Props) => {
  const aspectRatio = 9 / 12
  const placeholderImg = placeholderImgs.at(0)

  return (
    <section className={styles.sidebar}>
      <Image
        src={image}
        alt={title}
        width={300}
        height={300 / aspectRatio}
        className={styles.asideImg}
        priority
        loading='eager'
        blurDataURL={placeholderImg}
        placeholder='blur'
      />
      {status && (
        <div className={styles.status}>
          <span className={styles.statusValue}>{status}</span>
        </div>
      )}
    </section>
  )
}
