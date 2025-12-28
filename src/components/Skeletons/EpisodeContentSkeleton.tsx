import { SkeletonBase } from './SkeletonBase'
import styles from './EpisodeContentSkeleton.module.css'

export function EpisodeContentSkeleton() {
	return (
		<section className={styles.mainContent}>
			<div className={styles.videoContainer}>
				<div className={styles.videoHeader}>
					<SkeletonBase className={styles.title} />
					<SkeletonBase className={styles.languageSelect} />
				</div>
				<SkeletonBase className={styles.videoPlayer} />
				<div className={styles.iframeNav}>
					{Array.from({ length: 4 }).map((_, i) => (
						<SkeletonBase key={i} className={styles.option} />
					))}
				</div>
			</div>

			<aside className={styles.aside}>
				<div className={styles.asideHeader}>
					<SkeletonBase className={styles.asideImage} />
					<SkeletonBase variant='text' className={styles.asideTitle} />
				</div>
				<div className={styles.asideGrid}>
					{Array.from({ length: 8 }).map((_, i) => (
						<SkeletonBase key={i} className={styles.episodeItem} />
					))}
				</div>
			</aside>
		</section>
	)
}
