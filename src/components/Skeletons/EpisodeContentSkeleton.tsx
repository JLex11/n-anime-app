import { SkeletonBase } from './SkeletonBase'
import styles from './EpisodeContentSkeleton.module.css'

export function EpisodeContentSkeleton() {
	return (
		<section className={styles.mainContent}>
			<div className={styles.videoContainer}>
				<div className={styles.videoHeader}>
					<SkeletonBase className={styles.title} width='50%' height='2rem' />
					<SkeletonBase className={styles.languageSelect} width='5rem' height='2rem' />
				</div>
				<SkeletonBase className={styles.videoPlayer} height='auto' />
				<div className={styles.iframeNav}>
					{Array.from({ length: 4 }).map((_, i) => (
						<SkeletonBase key={i} className={styles.option} width='5rem' height='2.5rem' />
					))}
				</div>
			</div>

			<aside className={styles.aside}>
				<div className={styles.asideHeader}>
					<SkeletonBase className={styles.asideImage} width='3rem' height='3rem' />
					<SkeletonBase className={styles.asideTitle} width='60%' height='2rem' />
				</div>
				<div className={styles.asideGrid}>
					{Array.from({ length: 8 }).map((_, i) => (
						<SkeletonBase key={i} className={styles.episodeItem} height='7rem' />
					))}
				</div>
			</aside>
		</section>
	)
}
