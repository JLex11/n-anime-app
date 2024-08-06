import { getLatestEpisodes } from '@/services/getLatestEpisodes'
import { Card } from '../Card'
import { CardSkeleton } from '../Card/CardSkeleton'

export async function LatestEpisodes() {
	const latestEpisodes = await getLatestEpisodes()

	const episodeData = latestEpisodes.map((episode, index) => {
		return {
			key: episode.episodeId,
			image: {
				src: episode.image ?? '',
				width: 350,
				height: 250,
				loading: index < 3 ? ('eager' as const) : ('lazy' as const),
			},
			title: episode.title,
			link: `/animes/${episode.animeId}/${episode.episode}`,
			prefetch: true,
			pill: { label: `Episodio ${episode.episode}` },
		}
	})

	return episodeData.map(({ key, ...props }) => <Card key={key} {...props} />)
}

export function CardsSkeleton({ countCards, hasPill }: { countCards: number; hasPill?: boolean }) {
	return new Array(countCards).fill(0).map((_, i) => <CardSkeleton key={i} hasPill={hasPill} />)
}
