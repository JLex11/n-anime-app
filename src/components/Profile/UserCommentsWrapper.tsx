import { getUser } from '@/app/actions/auth'
import { getUserComments } from '@/app/actions/comments'
import { UserCommentsSection } from './UserCommentsSection'

interface Props {
	userId?: string
}

export async function UserCommentsWrapper({ userId }: Props) {
	const resolvedUserId = userId || (await getUser())?.id

	if (!resolvedUserId) {
		return null
	}

	const initialCommentsPage = await getUserComments(resolvedUserId, 0, 10)

	return (
		<UserCommentsSection
			userId={resolvedUserId}
			initialComments={initialCommentsPage.comments}
			initialHasMore={initialCommentsPage.hasMore}
			initialTotalCount={initialCommentsPage.totalCount}
			initialOffset={initialCommentsPage.comments.length}
		/>
	)
}
