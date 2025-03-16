import Link from 'next/link'
import { Fragment, unstable_ViewTransition as ViewTransition } from 'react'
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
				<ViewTransition name={`anime-image-${animeId}`}>
					<CardImage {...mappedImage} className={styles.card_img} decoding='async' loading='lazy' />
				</ViewTransition>
				<div className={styles.content}>
					<h3 className={styles.title}>{title}</h3>
					<div className={styles.footer}>
						{labels?.map((label, index) => (
							<Fragment key={label}>
								<span className={styles.label}>{label}</span>
								{labels.length - 1 !== index && <span className={styles.separator}>•</span>}
							</Fragment>
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
