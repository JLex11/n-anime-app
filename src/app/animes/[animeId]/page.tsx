import { AnimeCarousel } from '@/components/AnimePage/AnimeCarousel'
import { AnimeMain } from '@/components/AnimePage/AnimeMain'
import { Metadata } from 'next'
import { Suspense } from 'react'
import {
  PageProps,
  generateMetadataFromAnimeId,
  generatePageStaticParams
} from './pageMisc'

export default async function AnimePage({ params, searchParams }: PageProps) {
  const { animeId } = params
  const { limit } = searchParams

  return (
    <>
      <Suspense>
        <AnimeCarousel animeId={animeId} />
      </Suspense>
      <Suspense>
        <AnimeMain animeId={animeId} limit={limit} />
      </Suspense>
    </>
  )
}

export const generateMetadata = ({ params }: PageProps): Promise<Metadata> => generateMetadataFromAnimeId(params.animeId)
export const generateStaticParams = generatePageStaticParams
