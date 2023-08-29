import { CardsSection } from '@/components/CardsSection'
import { LatestAnimes } from '@/components/HomePage/LatestAnimes'
import { CardsSkeleton } from '@/components/HomePage/LatestEpisodes'
import { Suspense } from 'react'

export default function AnimesPage() {
  return (
    <main>
      <h1>Animes Page</h1>
      <CardsSection gridWidth={180} gridHeight={270}>
        <Suspense fallback={<CardsSkeleton countCards={10} />}>
          <LatestAnimes />
        </Suspense>
      </CardsSection>
    </main>
  )
}
