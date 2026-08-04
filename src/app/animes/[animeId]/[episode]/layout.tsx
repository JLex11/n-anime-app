import { Suspense } from 'react'
import { BreadCrumb } from '@/components/Common/BreadCrumb'
import styles from '@/components/EpisodePage/Episode.module.css'
import { normalizeAnimeId } from '@/utils/normalizeAnimeId'
import { toCap } from '@/utils/textConverts'

interface Props {
	children: React.ReactNode
	params: Promise<{
		animeId: string
		episode: string
	}>
}

async function EpisodeBreadcrumb({ params }: { params: Props['params'] }) {
	const { animeId, episode } = await params

	const crumbs = [
		{ name: 'Inicio', path: '/' },
		{ name: toCap(normalizeAnimeId(animeId)), path: `/animes/${animeId}` },
		{ name: `Episodio ${episode}` },
	]

	return <BreadCrumb crumbs={crumbs} />
}

export default function EpisodeLayout({ children, params }: Props) {
	return (
		<main className={styles.main}>
			<nav className={styles.breadcrumb}>
				<Suspense fallback={<BreadCrumb crumbs={[{ name: 'Inicio', path: '/' }]} />}>
					<EpisodeBreadcrumb params={params} />
				</Suspense>
			</nav>
			{children}
		</main>
	)
}
