import { PillProps } from '../Pill'

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
  pill?: PillProps
  showOnHover?: React.ReactNode
}

export interface CardImageProps {
  src: string | null | undefined
  fbSrc?: string
  alt: string
  size: {
    width: number
    height: number
  }
  lazy?: boolean
  priority?: boolean
  className?: string
  useNext?: boolean
}
