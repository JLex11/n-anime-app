import { getAnimesByQuery } from '@/api/getAnimeByQuery'
import { getBroadcastAnimes } from '@/api/getBroadcastAnimes'
import { AnimeList } from '@/components/AnimeList'
import { SearchInput } from '@/components/AnimePage/SearchInput'
import { CardsSkeleton } from '@/components/HomePage/LatestEpisodes'
import { Suspense } from 'react'

interface Props {
	searchParams: Promise<{
		order: string
		query: string
		rank: string
		sortBy: string
		genres: string[]
		status: string[]
		type: string[]
	}>
}

export default async function AnimesPage({ searchParams }: Props) {
	const { query = '' } = await searchParams

	return (
		<main style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<h1>Animes Page</h1>
			<header>
				<div> </div>
				<SearchInput query={query} />
			</header>
			<Suspense key={query} fallback={<CardsSkeleton countCards={20} />}>
				<AnimeList animesSource={query.length > 0 ? getAnimesByQuery(query) : getBroadcastAnimes()} />
			</Suspense>
		</main>
	)
}
