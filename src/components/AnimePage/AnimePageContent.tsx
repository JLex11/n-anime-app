import styles from '@/components/AnimePage/Anime.module.css'
import { AnimeHeader } from '@/components/AnimePage/AnimeHeader'
import { Description } from '@/components/AnimePage/Description'
import { Episodes } from '@/components/AnimePage/Episodes'
import { Genres } from '@/components/AnimePage/Genres'
import { Anime } from '@/types'

export const AnimePageContent = ({ anime, limit }: { anime: Anime; limit: string | number }) => (
  <section className={styles.content}>
    <AnimeHeader title={anime.title} otherTitles={anime.otherTitles} />
    <Description description={anime.description} />
    <Genres genres={anime.genres} />
    <Episodes limit={limit} animeId={anime.animeId} fallbackImg={anime.images?.coverImage} animeTitle={anime.title} />
  </section>
)
