import { Suspense } from 'react'
import { AnimeBanner } from '@/components/AnimePage/AnimeBanner'
import { AnimeMain } from '@/components/AnimePage/AnimeMain'
import type { Metadata } from 'next'
import { type PageProps, generateMetadataFromAnimeId, generatePageStaticParams } from './pageMisc'

export default async function AnimePage({ params }: PageProps) {
	const { animeId } = await params

	return (
		<>
			<Suspense fallback={<div style={{ height: '400px', background: '#1a1a1a' }}>Cargando banner...</div>}>
				<AnimeBanner animeId={animeId} />
			</Suspense>
			<Suspense fallback={<div style={{ padding: '2rem' }}>Cargando información...</div>}>
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
