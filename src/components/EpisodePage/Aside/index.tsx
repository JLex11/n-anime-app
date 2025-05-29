import { getAnimeEpisodes } from '@/api/getAnimeEpisodes'
import { EpisodeList } from '@/components/EpisodeList/EpisodeList'
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

export async function Aside({ searchParams, animeId, animeImage, animeTitle, currentEpisode }: AsideProps) {
	const limit = Number(searchParams.limit)
	const animeEpisodes = await getAnimeEpisodes(animeId, 0, limit || 5)

	return (
		<AsideWrapper>
			<AsideHeader animeImage={animeImage} animeTitle={animeTitle} />
			<EpisodeList
				animeId={animeId}
				initialEpisodes={animeEpisodes}
				animeImage={animeImage}
				animeTitle={animeTitle}
				currentEpisode={currentEpisode}
			/>
		</AsideWrapper>
	)
}
