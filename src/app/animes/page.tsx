import { AnimeList } from '@/components/AnimeList'
import { SearchInput } from '@/components/AnimePage/SearchInput'
import { CardsSkeleton } from '@/components/HomePage/LatestEpisodes'
import { getAnimesByQuery } from '@/services/getAnimeByQuery'
import { getBroadcastAnimes } from '@/services/getBroadcastAnimes'
import { Suspense } from 'react'

interface Props { searchParams: { query: string } }

export default function AnimesPage({ searchParams }: Props) {
  const { query = '' } = searchParams

  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h1>Animes Page</h1>
      <header>
        <div>Filters section</div>
        <SearchInput query={query} />
      </header>
      <Suspense key={query} fallback={<CardsSkeleton countCards={20} />}>
        <AnimeList
          animesSource={query.length > 0 ? getAnimesByQuery(query) : getBroadcastAnimes()}
        />
      </Suspense>
    </main>
  )
}
