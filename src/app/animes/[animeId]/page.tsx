import { AnimeBanner } from '@/components/AnimePage/AnimeBanner'
import { AnimeMain } from '@/components/AnimePage/AnimeMain'
import type { Metadata } from 'next'
import { type PageProps, generateMetadataFromAnimeId, generatePageStaticParams } from './pageMisc'

export default async function AnimePage({ params }: PageProps) {
	const { animeId } = await params

	return (
		<>
			<AnimeBanner animeId={animeId} />
			<AnimeMain animeId={animeId} />
		</>
	)
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
	const { animeId } = await params
	return generateMetadataFromAnimeId(animeId)
}
export const generateStaticParams = generatePageStaticParams
