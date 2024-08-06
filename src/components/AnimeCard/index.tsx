import { Link } from 'next-view-transitions'
import { CardImage } from '../Card/CardImage'
import styles from './AnimeCard.module.css'
import type { CardProps } from './types'

export function AnimeCard({ title, link, image, labels, rank, description, animeId }: CardProps) {
	const mappedImage = {
		...image,
		size: {
			width: image.width,
			height: image.height,
		},
		alt: title,
	}

	return (
		<article className={styles.card}>
			<Link href={link} className={styles.card_container}>
				<CardImage
					{...mappedImage}
					className={styles.card_img}
					decoding='async'
					loading='lazy'
					style={{
						viewTransitionName: `anime-image-${animeId}`,
					}}
				/>
				<div className={styles.content}>
					<h3 className={styles.title}>{title}</h3>
					<div className={styles.footer}>
						{labels?.map((label, index) => (
							<>
								<span key={label} className={styles.label}>
									{label}
								</span>
								{labels.length - 1 !== index && <span className={styles.separator}>•</span>}
							</>
						))}
					</div>
				</div>
				<div className={styles.extraInfo}>
					<h4 className={styles.title}>{title}</h4>
					{rank && <span>{rank.toFixed(1)} ⭐</span>}
					<p>{description}</p>
				</div>
			</Link>
		</article>
	)
}
