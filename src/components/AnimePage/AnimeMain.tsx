import { getAnime } from '@/services/getAnime'
import { Suspense } from 'react'
import styles from './Anime.module.css'
import { AnimeAside } from './AnimeAside'
import { AnimeHeader } from './AnimeHeader'
import { Description } from './DescriptionSection'
import { Episodes } from './EpisodesSection'
import { Genres } from './GenresSection'

export async function AnimeMain({ animeId, limit }: { animeId: string, limit: string }) {
  const anime = await getAnime(animeId)
  if (!anime) return null

  return (
    <main className={styles.main}>
      <Suspense /* fallback={<span>Loading...</span>} */>
        <AnimeAside anime={anime} />
        <section className={styles.content}>
          <AnimeHeader title={anime.title} otherTitles={anime.otherTitles} />
          <Description description={anime.description} />
          <Genres genres={anime.genres} />
          <Episodes
            limit={limit}
            animeId={anime.animeId}
            fallbackImg={anime.images?.coverImage}
            animeTitle={anime.title}
          />
        </section>
      </Suspense>
    </main>
  )
}