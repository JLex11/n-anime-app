import { genre } from '@/types'
import Link from 'next/link'
import styles from '../../styles/Banner.module.css'
import CustomLi from '../CustomLi'

interface Props {
  animeId: string
  title: string
  genres: genre[]
  isActive: boolean
}

export function ItemInfo({ animeId, title, genres, isActive }: Props) {
  return (
    <div className={`${styles.info} ${isActive ? styles.active : ''}`} id='info'>
      <div className={styles.content}>
        <a href={animeId}>
          <h1 className={styles.infoTitle}>{title}</h1>
        </a>
        <ul>
          {genres.map(genre => (
            <CustomLi key={genre}>
              <Link href={`/search/${genre}`}>{genre}</Link>
            </CustomLi>
          ))}
        </ul>
      </div>
    </div>
  )
}
