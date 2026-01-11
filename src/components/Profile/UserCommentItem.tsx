'use client'

import Link from 'next/link'
import { MarkdownRenderer } from '@/components/Comments/MarkdownRenderer'
import type { Comment } from '@/types'
import styles from './Profile.module.css'

interface UserCommentItemProps {
	comment: Comment & {
		anime: {
			title: string
			images: any
		}
	}
}

export function UserCommentItem({ comment }: UserCommentItemProps) {
	// Create link to the original comment
	const episodeSlug = comment.episode_id ? comment.episode_id.split('-').pop() : null
	const commentUrl = comment.episode_id 
		? `/animes/${comment.anime_id}/${episodeSlug}#comment-${comment.id}`
		: `/animes/${comment.anime_id}#comment-${comment.id}`

	const date = new Date(comment.created_at).toLocaleDateString('es-ES', {
		day: 'numeric',
		month: 'short',
	})

	return (
		<div 
			className={styles.commentItemInner}
			style={{ viewTransitionName: `comment-${comment.id}` } as any}
		>
			<div className={styles.commentHeader}>
				{comment.episode_id && (
					<span className={styles.commentEpisodeSmall}>
						Ep. {episodeSlug}
					</span>
				)}
				<span className={styles.commentDateSmall}>{date}</span>
				<Link href={commentUrl} className={styles.commentExternalLinkSmall} title="Ver original">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
						<polyline points="15 3 21 3 21 9"></polyline>
						<line x1="10" y1="14" x2="21" y2="3"></line>
					</svg>
				</Link>
			</div>
			
			<div className={styles.commentContentSmall}>
				<MarkdownRenderer content={comment.content} />
			</div>
			
			<div className={styles.commentFooterSmall}>
				<div className={styles.commentStatSmall}>
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
					</svg>
					<span>{comment.like_count || 0}</span>
				</div>
				<div className={styles.commentStatSmall}>
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M17 14V2" />
						<path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
					</svg>
					<span>{comment.dislike_count || 0}</span>
				</div>
				{comment.reply_count !== undefined && comment.reply_count > 0 && (
					<div className={styles.commentStatSmall}>
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
						</svg>
						<span>{comment.reply_count}</span>
					</div>
				)}
			</div>
		</div>
	)
}
