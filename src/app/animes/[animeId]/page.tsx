import styles from '@/components/AnimePage/Anime.module.css'
import { AnimeAside } from '@/components/AnimePage/AnimeAside'
import { AnimeCarousel } from "@/components/AnimePage/AnimeCarousel"
import { AnimeContent } from "@/components/AnimePage/AnimeContent"
import { Metadata } from 'next'
import { Suspense } from "react"
import { PageProps, generateMetadataFromAnimeId, generatePageStaticParams } from './pageMisc'

export default async function AnimePage({
	params: { animeId },
	searchParams: { limit },
}: PageProps) {
	return (
		<>
			<AnimeCarousel animeId={animeId} />
			<main className={styles.main}>
				<Suspense fallback={<span>Loading...</span>}>
					<AnimeAside animeId={animeId} />
					<AnimeContent animeId={animeId} limit={limit} />
				</Suspense>
			</main>
		</>
	)
}

export const generateMetadata = ({ params }: PageProps): Promise<Metadata> => generateMetadataFromAnimeId(params.animeId)
export const generateStaticParams = generatePageStaticParams
