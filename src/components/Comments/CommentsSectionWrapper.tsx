import { Suspense } from 'react'
import { getComments, getCommentCount } from '@/app/actions/comments'
import { getUser, getUserProfile } from '@/app/actions/auth'
import { CommentsSection } from './CommentsSection'
import { SkeletonBase } from '@/components/Skeletons'
import styles from './Comments.module.css'

interface Props {
	animeId: string
	episodeId?: string | null
}

async function CommentsSectionContent({ animeId, episodeId }: Props) {
	const [comments, user, count, profile] = await Promise.all([
		getComments(animeId, episodeId),
		getUser(),
		getCommentCount(animeId, episodeId),
		getUserProfile(),
	])

	return (
		<CommentsSection
			animeId={animeId}
			episodeId={episodeId}
			initialComments={comments}
			initialCount={count}
			currentUserId={user?.id}
			isAuthenticated={!!user}
			currentUserProfile={profile}
		/>
	)
}

export function CommentsSectionWrapper({ animeId, episodeId }: Props) {
	return (
		<Suspense
			fallback={
				<div className={styles.commentsSection}>
					<SkeletonBase height='20rem' />
				</div>
			}
		>
			<CommentsSectionContent animeId={animeId} episodeId={episodeId} />
		</Suspense>
	)
}
