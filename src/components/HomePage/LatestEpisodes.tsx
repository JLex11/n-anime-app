import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { CardsSection } from '../CardsSection'
import LatestIcon from '../Icons/LatestIcon'

export const LatestEpisodes = async () => {
  const latestEpisodes = await getLatestEpisodes()

  const episodeData = latestEpisodes.map(episode => {
    return {
      key: episode.episodeId,
      imageSrc: episode.image ?? '',
      title: episode.title,
      link: `/episodes/${episode.episodeId}`,
      pill: { label: `Episode ${episode.episode}` },
      width: 350,
      height: 250,
    }
  })

  return <CardsSection title='Latest Episodes' icon={<LatestIcon />} data={episodeData} gridWidth={230} gridHeight={190} />
}
