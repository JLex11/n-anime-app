import { getBroadcastAnimes } from '@/api/getBroadcastAnimes'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import styles from './BroadcastList.module.css'

export const BroadcastList = async () => {
	const broadcastAnimes = await getBroadcastAnimes(20)

	return (
		<ul className={styles.broadcastList}>
			{broadcastAnimes.map(({ animeId, images, title, rank }) => (
				<li key={animeId} className={styles.broadcastListItemParent}>
					<Link href={`/animes/${animeId}`} className={styles.broadcastListItem}>
						<Image
							src={images?.coverImage || '/lights-blur.webp'}
							alt={`cover image of the anime ${title}`}
							width={40}
							height={40}
							decoding='async'
						/>
						<div className={styles.broadcastListItemContent}>
							<h3>{title}</h3>
							<span>{'⭐'.repeat(Number(rank))}</span>
						</div>
					</Link>
				</li>
			))}
		</ul>
	)
}
