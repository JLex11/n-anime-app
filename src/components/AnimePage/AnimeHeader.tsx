import { ViewTransition } from 'react'
import { BadgeList } from '../BadgeList'
import styles from './Anime.module.css'

interface Props {
	animeId: string
	title: string
	otherTitles?: string[] | null
}

export function AnimeHeader({ animeId, title, otherTitles }: Props) {
	const safeOtherTitles = Array.isArray(otherTitles) ? otherTitles : []

	return (
		<header className={styles.header}>
			<ViewTransition name={`anime-title-${animeId}`}>
				<h1 className={styles.headerTitle}>{title}</h1>
			</ViewTransition>
			<BadgeList
				items={safeOtherTitles.map(title => ({ name: title }))}
				width='100%'
				badgetStyles={{
					fontSize: '11pt',
					maxWidth: 'min(700px, 100%)',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					display: 'block',
				}}
			/>
		</header>
	)
}
