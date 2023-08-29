import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { HomeCard } from './HomeCard'
import { HomeCardSkeleton } from './HomeCardSkeleton'

export const LatestEpisodes = async () => {
  const latestEpisodes = await getLatestEpisodes()

  const episodeData = latestEpisodes.map(episode => {
    return {
      key: episode.episodeId,
      imageSrc: episode.image ?? '',
      title: episode.title,
      link: `/animes/${episode.animeId}/${episode.episode}`,
      pill: { label: `Episodio ${episode.episode}` },
      width: 350,
      height: 250
    }
  })

  return (
    <>
      {episodeData.map(({ key, title, link, pill, imageSrc, width, height }) => (
        <HomeCard key={key} image={{ src: imageSrc, width, height }} title={title} link={link} pill={pill} />
      ))}
    </>
  )
}

export const CardsSkeleton = ({ countCards, hasPill }: { countCards: number; hasPill?: boolean }) => (
  <>
    {new Array(countCards).fill(0).map((_, i) => (
      <HomeCardSkeleton key={i} hasPill={hasPill} />
    ))}
  </>
)