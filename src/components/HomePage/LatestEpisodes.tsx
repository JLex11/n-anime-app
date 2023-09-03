import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { HomeCard } from './HomeCard'
import { HomeCardSkeleton } from './HomeCardSkeleton'

export async function LatestEpisodes() {
  const latestEpisodes = await getLatestEpisodes()

  const episodeData = latestEpisodes.map((episode, i) => {
    return {
      key: episode.episodeId,
      image: {
        src: episode.image ?? '',
        width: 350,
        height: 250,
        lazy: i < 4
      },
      title: episode.title,
      link: `/animes/${episode.animeId}/${episode.episode}`,
      pill: { label: `Episodio ${episode.episode}` }
    }
  })

  return episodeData.map(({ key, title, link, pill, image }) => (
    <HomeCard key={key} image={image} title={title} link={link} pill={pill} />
  ))
}

export function CardsSkeleton({ countCards, hasPill }: { countCards: number; hasPill?: boolean }) {
  return new Array(countCards).fill(0).map((_, i) => <HomeCardSkeleton key={i} hasPill={hasPill} />)
}