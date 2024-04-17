export type ImageProps = {
  src: string | null | undefined
  fbSrc?: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

export interface CardProps {
  title: string
  link: string
  image: ImageProps
  labels?: string[]
  rank?: number | null
  description?: string
  animeId: string
}
