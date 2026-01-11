import { getAnimesByQuery } from '@/api/getAnimeByQuery'
import { getBroadcastAnimes } from '@/api/getBroadcastAnimes'
import { AnimeList } from '@/components/AnimeList'
import { SearchInput } from '@/components/AnimePage/SearchInput'
import { CardsSkeleton } from '@/components/HomePage/CardsSkeleton'
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

async function AnimesPageContent({ searchParams }: Props) {
	const { query = '' } = await searchParams

	return (
		<main style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<h1>Animes Page</h1>
			<header>
				<div> </div>
				<SearchInput query={query} />
			</header>
			<Suspense key={query} fallback={<CardsSkeleton countCards={20} />}>
				<AnimeListContent query={query} />
			</Suspense>
		</main>
	)
}

async function AnimeListContent({ query }: { query: string }) {

	const animes = query.length > 0 ? await getAnimesByQuery(query) : await getBroadcastAnimes()
	return <AnimeList animesSource={Promise.resolve(animes)} />
}

export default async function AnimesPage({ searchParams }: Props) {
	return (
		<Suspense fallback={<CardsSkeleton countCards={20} />}>
			<AnimesPageContent searchParams={searchParams} />
		</Suspense>
	)
}
