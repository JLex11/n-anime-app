import PlayIcon from '@/components/Icons/PlayIcon'
import type { Episode } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'
import styles from './EpisodeList.module.css'

interface AsideListItemProps {
	link: string
	episode: Episode
	isSeeing?: boolean
	animeImage?: string | null
	animeTitle?: string
}

export function ListItem({ link, episode, isSeeing, animeImage, animeTitle }: AsideListItemProps) {
	const itemClass = clsx(styles.listItem, isSeeing && styles.active, 'prefetch')
	const fixedEpisodeImgSrc = episode.image?.replace('http://anime-scrapper-lake.vercel.app/api/', '')

	return (
		<li>
			<Link href={link} className={itemClass} scroll={false}>
				<span>{isSeeing ? <PlayIcon width={50} /> : episode.episode}</span>
				<img
					src={fixedEpisodeImgSrc ?? animeImage ?? '/lights-blur.webp'}
					alt={`Episodio ${episode.episode} de ${animeTitle}`}
					width={150}
					height={100}
					decoding='async'
					loading='lazy'
					className={styles.episodeImage}
				/>
			</Link>
		</li>
	)
}
