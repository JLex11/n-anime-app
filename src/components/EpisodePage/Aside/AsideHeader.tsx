import Image from 'next/image'
import { AsideProps } from '.'
import styles from '../Episode.module.css'

export function AsideHeader({
  animeImage,
  animeTitle
}: Pick<AsideProps, 'animeImage' | 'animeTitle'>) {
  return (
    <header className={styles.asideHeader}>
      {animeImage && (
        <Image
          src={animeImage}
          alt={animeTitle ?? ''}
          style={{ objectFit: 'cover' }}
          width={36}
          height={36}
          priority={false}
          loading='lazy'
        />
      )}
      <h2>Episodios</h2>
    </header>
  )
}
