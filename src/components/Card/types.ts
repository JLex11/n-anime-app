import Image from 'next/image'
import type { PillProps } from '../Pill'

export interface ImageProps extends Omit<React.ComponentProps<typeof Image>, 'src' | 'width' | 'height'> {
	src: string | null | undefined
	fbSrc?: string
	width: number
	height: number
}

export interface CardProps {
	title: string
	link: string
	prefetch?: boolean
	image: Omit<ImageProps, 'alt'>
	pill?: PillProps
	showOnHover?: React.ReactNode
	animeId?: string
}
