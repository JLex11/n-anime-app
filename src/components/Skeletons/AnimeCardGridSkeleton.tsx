import { SkeletonBase } from './SkeletonBase'
import styles from './AnimeCardGridSkeleton.module.css'

interface AnimeCardGridSkeletonProps {
	count?: number
}

export function AnimeCardGridSkeleton({ count = 12 }: AnimeCardGridSkeletonProps) {
	return (
		<div className={styles.grid}>
			{Array.from({ length: count }).map((_, i) => (
				<article key={i} className={styles.card}>
					<SkeletonBase className={styles.image} />
					<div className={styles.textContainer}>
						<SkeletonBase variant='text' className={styles.title} />
						<SkeletonBase variant='text' className={styles.metadata} />
						<div className={styles.badges}>
							<SkeletonBase className={styles.badge} />
							<SkeletonBase className={styles.badge} />
							<SkeletonBase className={styles.badge} />
						</div>
					</div>
				</article>
			))}
		</div>
	)
}
