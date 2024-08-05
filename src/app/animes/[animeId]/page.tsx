import { AnimeCarousel } from '@/components/AnimePage/AnimeCarousel'
import { AnimeMain } from '@/components/AnimePage/AnimeMain'
import type { Metadata } from 'next'
import { generateMetadataFromAnimeId, generatePageStaticParams, type PageProps } from './pageMisc'

export default async function AnimePage({ params }: PageProps) {
	const { animeId } = params

	return (
		<>
			<AnimeCarousel animeId={animeId} />
			<AnimeMain animeId={animeId} />
		</>
	)
}

export const generateMetadata = ({ params }: PageProps): Promise<Metadata> =>
	generateMetadataFromAnimeId(params.animeId)
export const generateStaticParams = generatePageStaticParams
