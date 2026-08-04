import { SkeletonBase } from './SkeletonBase'
import styles from './EpisodeContentSkeleton.module.css'

export function EpisodeVideoSkeleton() {
	return (
		<div className={styles.videoContainer}>
			<div className={styles.videoHeader}>
				<SkeletonBase className={styles.title} width='50%' height='2rem' />
				<SkeletonBase className={styles.languageSelect} width='5rem' height='2rem' />
			</div>
			<SkeletonBase className={styles.videoPlayer} height='auto' />
			<div className={styles.iframeNav}>
				{['video-1', 'video-2', 'video-3', 'video-4'].map(key => (
					<SkeletonBase key={key} className={styles.option} width='5rem' height='2.5rem' />
				))}
			</div>
		</div>
	)
}

export function EpisodeAsideSkeleton() {
	return (
		<aside className={styles.aside}>
			<div className={styles.asideHeader}>
				<SkeletonBase className={styles.asideImage} width='3rem' height='3rem' />
				<SkeletonBase className={styles.asideTitle} width='60%' height='2rem' />
			</div>
			<div className={styles.asideGrid}>
				{['episode-1', 'episode-2', 'episode-3', 'episode-4', 'episode-5', 'episode-6', 'episode-7', 'episode-8'].map(key => (
					<SkeletonBase key={key} className={styles.episodeItem} height='7rem' />
				))}
			</div>
		</aside>
	)
}

export function EpisodeContentSkeleton() {
	return (
		<section className={styles.mainContent}>
			<EpisodeVideoSkeleton />
			<EpisodeAsideSkeleton />
		</section>
	)
}
