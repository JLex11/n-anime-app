import { Suspense } from 'react'
import { CommentsContainer } from './CommentsContainer'
import { CommentFormSection } from './CommentFormSection'
import { CommentsListSection } from './CommentsListSection'
import { CommentsSkeleton } from './CommentsSkeleton'

interface Props {
	animeId: string
	episodeId?: string | null
}

export function CommentsSectionWrapper({ animeId, episodeId }: Props) {
	return (
		<CommentsContainer>
			<Suspense fallback={null}>
				<CommentFormSection animeId={animeId} episodeId={episodeId} />
			</Suspense>

			<Suspense fallback={<CommentsSkeleton />}>
				<CommentsListSection animeId={animeId} episodeId={episodeId} />
			</Suspense>
		</CommentsContainer>
	)
}
