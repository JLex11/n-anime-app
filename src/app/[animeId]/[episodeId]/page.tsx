import RootLayout from '../layout'

interface Props {
  params: {
    animeId: string
    episodeId: string
  }
}

export default function AnimePage({ params }: Props) {
  const { animeId, episodeId } = params

  return (
    <RootLayout>
      <h1>Anime Page {animeId} {episodeId}</h1>
    </RootLayout>
  )
}