import { EpisodeList } from '@/components/EpisodeList/EpisodeList'
import { getAnimeEpisodes } from '@/services/getAnimeEpisodes'
import styles from './Anime.module.css'

interface EpisodesProps {
  limit: string | number
  animeId: string
  animeTitle: string
  fallbackImg?: string | null
}

export async function Episodes({ limit, animeId, animeTitle, fallbackImg }: EpisodesProps) {
  const animeEpisodes = await getAnimeEpisodes(animeId, 0, Number(limit) || 5)
  if (animeEpisodes.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Episodios</h2>
      <EpisodeList
        animeId={animeId}
        animeTitle={animeTitle}
        episodes={animeEpisodes}
        limit={limit}
        animeImage={fallbackImg}
        linkPrefix={`${animeId}/`}
      />
    </section>
  )
}
