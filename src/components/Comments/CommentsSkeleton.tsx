import { SkeletonBase } from '@/components/Skeletons'
import styles from './Comments.module.css'

export function CommentsSkeleton() {
	return (
		<div className={styles.commentsSkeletonContainer}>
			<SkeletonBase height='6rem' />
			<SkeletonBase height='6rem' />
			<SkeletonBase height='6rem' />
		</div>
	)
}
