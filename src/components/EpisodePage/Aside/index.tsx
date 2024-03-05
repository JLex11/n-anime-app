import { EpisodeList } from '@/components/EpisodeList/EpisodeList'
import { getAnimeEpisodes } from '@/services/getAnimeEpisodes'
import { AsideHeader } from './AsideHeader'
import { AsideWrapper } from './AsideWrapper'

export interface AsideProps {
  searchParams: {
    limit: string
  }
  animeId: string
  animeImage?: string | null
  animeTitle?: string
  currentEpisode: number
}

export async function Aside({
  searchParams,
  animeId,
  animeImage,
  animeTitle,
  currentEpisode
}: AsideProps) {
  const animeEpisodes = await getAnimeEpisodes(animeId, 0, Number(searchParams.limit) || 5)

  return (
    <AsideWrapper>
      <AsideHeader animeImage={animeImage} animeTitle={animeTitle} />
      <EpisodeList
        limit={searchParams.limit}
        episodes={animeEpisodes}
        animeId={animeId}
        animeImage={animeImage}
        animeTitle={animeTitle}
        currentEpisode={currentEpisode}
      />
    </AsideWrapper>
  )
}
