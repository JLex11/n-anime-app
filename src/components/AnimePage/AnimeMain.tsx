import { getAnime } from '@/services/getAnime'
import { Suspense } from 'react'
import styles from './Anime.module.css'
import { AnimeAside } from './AnimeAside'
import { AnimeHeader } from './AnimeHeader'
import { Description } from './DescriptionSection'
import { Episodes, EpisodesSkeleton } from './EpisodesSection'
import { Genres } from './GenresSection'

interface Props {
  animeId: string
  limit: string
}

export async function AnimeMain({ animeId, limit }: Props) {
  const anime = await getAnime(animeId)
  if (!anime) return null

  return (
    <main className={styles.main}>
      <AnimeAside anime={anime} />
      <section className={styles.content}>
        <AnimeHeader animeId={anime.animeId} title={anime.title} otherTitles={anime.otherTitles} />
        <Description description={anime.description} />
        <Genres genres={anime.genres} />
        <Suspense fallback={<EpisodesSkeleton />}>
          <Episodes
            limit={limit}
            animeId={anime.animeId}
            fallbackImg={anime.images?.coverImage}
            animeTitle={anime.title}
          />
        </Suspense>
      </section>
    </main>
  )
}
