import { Suspense } from 'react'
import { AnimeBanner } from '@/components/AnimePage/AnimeBanner'
import { AnimeMain } from '@/components/AnimePage/AnimeMain'
import { AnimeBannerSkeleton, AnimeMainSkeleton, FavoriteButtonSkeleton } from '@/components/Skeletons'
import type { Metadata } from 'next'
import { FavoriteButtonContainer } from '@/components/AnimePage/FavoriteButtonContainer'
import { getAnime } from '@/api/getAnime'
import { notFound } from 'next/navigation'
import { type PageProps, generateMetadataFromAnimeId } from './pageMisc'
import { CommentsSection } from '@/components/Comments'

async function AnimePageContent({ params }: PageProps) {
	const { animeId } = await params
	const anime = await getAnime(animeId)

	if (!anime) notFound()

	return (
		<>
			<Suspense fallback={<AnimeBannerSkeleton />}>
				<AnimeBanner animeId={animeId} />
			</Suspense>
			<Suspense fallback={<AnimeMainSkeleton />}>
				<AnimeMain
					animeId={animeId}
					favoriteButtonSlot={
						<Suspense key='favorite-btn' fallback={<FavoriteButtonSkeleton />}>
							<FavoriteButtonContainer
								animeId={animeId}
								animeTitle={anime.title}
								animeImage={anime.images?.coverImage || undefined}
							/>
						</Suspense>
					}
				/>
			</Suspense>
			<CommentsSection animeId={animeId} />
		</>
	)
}

export default async function AnimePage({ params }: PageProps) {
	return (
		<Suspense fallback={<><AnimeBannerSkeleton /><AnimeMainSkeleton /></>}>
			<AnimePageContent params={params} />
		</Suspense>
	)
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
	const { animeId } = await params
	return generateMetadataFromAnimeId(animeId)
}

//export const generateStaticParams = generatePageStaticParams
