import { SkeletonBase } from './SkeletonBase'
import styles from './HomeAsideSkeleton.module.css'

export function HomeAsideSkeleton() {
	return (
		<aside className={styles.aside}>
			<div className={styles.asideTitle}>
				<SkeletonBase variant='circle' className={styles.icon} />
				<SkeletonBase variant='text' className={styles.titleText} />
			</div>
			<div className={styles.asideInner}>
				{Array.from({ length: 10 }).map((_, i) => (
					<div key={i} className={styles.broadcastItem}>
						<SkeletonBase className={styles.itemImage} />
						<div className={styles.itemContent}>
							<SkeletonBase variant='text' className={styles.itemTitle} />
							<SkeletonBase variant='text' className={styles.itemRating} />
						</div>
					</div>
				))}
			</div>
		</aside>
	)
}
