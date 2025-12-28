import { SkeletonBase } from './SkeletonBase'
import styles from './AnimeBannerSkeleton.module.css'

export function AnimeBannerSkeleton() {
	return (
		<div className={styles.banner}>
			<SkeletonBase height='100%' />
		</div>
	)
}
