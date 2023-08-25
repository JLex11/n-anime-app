import Image from 'next/image'
import { AsideProps } from '.'
import styles from '../Episode.module.css'

export const AsideHeader = ({ animeImage, animeTitle }: Pick<AsideProps, 'animeImage' | 'animeTitle'>) => {
  return (
    <header className={styles.asideHeader}>
      {animeImage && <Image src={animeImage} alt={animeTitle ?? ''} width={50} height={50} />}
      <h2>Episodios</h2>
    </header>
  )
}
