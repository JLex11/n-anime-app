import { LatestAnimes } from '@/components/HomePage/LatestAnimes'

export default function AnimesPage() {
  return (
    <main>
      <h1>Animes Page</h1>
      {/* @ts-expect-error Server Component */}
      <LatestAnimes />
    </main>
  )
}
