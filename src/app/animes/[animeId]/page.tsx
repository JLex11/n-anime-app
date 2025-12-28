import { Suspense } from 'react'
import { AnimeBanner } from '@/components/AnimePage/AnimeBanner'
import { AnimeMain } from '@/components/AnimePage/AnimeMain'
import { AnimeBannerSkeleton, AnimeMainSkeleton } from '@/components/Skeletons'
import type { Metadata } from 'next'
import { type PageProps, generateMetadataFromAnimeId, generatePageStaticParams } from './pageMisc'

export default async function AnimePage({ params }: PageProps) {
	const { animeId } = await params

	return (
		<>
			<Suspense fallback={<AnimeBannerSkeleton />}>
				<AnimeBanner animeId={animeId} />
			</Suspense>
			<Suspense fallback={<AnimeMainSkeleton />}>
				<AnimeMain animeId={animeId} />
			</Suspense>
		</>
	)
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
	const { animeId } = await params
	return generateMetadataFromAnimeId(animeId)
}

export const generateStaticParams = generatePageStaticParams
