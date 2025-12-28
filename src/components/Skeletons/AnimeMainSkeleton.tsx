import { SkeletonBase } from './SkeletonBase'
import styles from './AnimeMainSkeleton.module.css'

export function AnimeMainSkeleton() {
	return (
		<div className={styles.main}>
			<aside className={styles.aside}>
				<SkeletonBase className={styles.asideImg} />
				<div className={styles.status}>
					<SkeletonBase className={styles.statusBadge} />
					<SkeletonBase className={styles.statusBadge} />
				</div>
			</aside>

			<div className={styles.content}>
				<div className={styles.header}>
					<SkeletonBase className={styles.headerTitle} />
					<SkeletonBase variant='text' className={styles.metadata} />
					<SkeletonBase variant='text' className={styles.metadataSmall} />
				</div>

				<div className={styles.section}>
					<SkeletonBase className={styles.sectionTitle} />
					<SkeletonBase variant='text' className={styles.descriptionLine} />
					<SkeletonBase variant='text' className={styles.descriptionLine} />
					<SkeletonBase variant='text' className={styles.descriptionLine} />
					<SkeletonBase variant='text' className={styles.descriptionLine} />
					<SkeletonBase variant='text' className={styles.descriptionLineShort} />
				</div>

				<div className={styles.section}>
					<SkeletonBase className={styles.sectionTitle} />
					<div className={styles.genresGrid}>
						{Array.from({ length: 6 }).map((_, i) => (
							<SkeletonBase key={i} className={styles.genre} />
						))}
					</div>
				</div>

				<div className={styles.section}>
					<SkeletonBase className={styles.sectionTitle} />
					<SkeletonBase height='10rem' />
				</div>
			</div>
		</div>
	)
}
