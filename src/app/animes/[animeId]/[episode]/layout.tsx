import { BreadCrumb } from '@/components/Common/BreadCrumb'
import styles from '@/components/EpisodePage/Episode.module.css'
import { normalizeAnimeId } from '@/utils/normalizeAnimeId'
import { toCap } from '@/utils/textConverts'

interface Props {
	children: React.ReactNode
	params: {
		animeId: string
		episode: string
	}
}

export default async function EpisodeLayout({ children, params }: Props) {
	const { animeId, episode } = params

	const crumbs = [
		{ name: 'Inicio', path: '/' },
		{ name: toCap(normalizeAnimeId(animeId)), path: `/animes/${animeId}` },
		{ name: `Episodio ${episode}` }
	]

	return (
		<main className={styles.main}>
			<nav className={styles.breadcrumb}>
				<BreadCrumb crumbs={crumbs} />
			</nav>
			{children}
		</main>
	)
}
