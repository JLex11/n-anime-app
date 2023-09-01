import { Episode } from '@/types'
import { AsideHeader } from './AsideHeader'
import { AsideList } from './AsideList'
import { AsideWrapper } from './AsideWrapper'

export interface AsideProps {
  limit: string
  episodes: Episode[]
  animeId: string
  animeImage?: string | null
  animeTitle?: string
  currentEpisode: number
}

export function Aside({ limit, episodes, animeId, animeImage, animeTitle, currentEpisode }: AsideProps) {
  return (
    <AsideWrapper>
      <AsideHeader animeImage={animeImage} animeTitle={animeTitle} />
      <AsideList
        limit={limit}
        episodes={episodes}
        animeId={animeId}
        animeImage={animeImage}
        animeTitle={animeTitle}
        currentEpisode={currentEpisode}
      />
    </AsideWrapper>
  )
}
