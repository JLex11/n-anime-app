import Image from 'next/image'
import { PillProps } from '../Pill'

export interface ImageProps extends Omit<React.ComponentProps<typeof Image>, 'src' | 'width' | 'height'> {
  src: string | null | undefined
  fbSrc?: string
  width: number
  height: number
}

export interface CardProps {
  title: string
  link: string
  image: Omit<ImageProps, 'alt'>
  pill?: PillProps
  showOnHover?: React.ReactNode
  animeId?: string
}
