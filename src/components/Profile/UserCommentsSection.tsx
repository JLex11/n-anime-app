'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { getUserComments } from '@/app/actions/comments'
import { UserAnimeCommentsCard } from './UserAnimeCommentsCard'
import { LoadMoreButton } from '@/components/Comments/LoadMoreButton'
import { useViewTransition } from '@/hooks/useViewTransition'
import styles from './Profile.module.css'

interface UserCommentsSectionProps {
	userId: string
}

export function UserCommentsSection({ userId }: UserCommentsSectionProps) {
	const [comments, setComments] = useState<any[]>([])
	const [hasMore, setHasMore] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const [offset, setOffset] = useState(0)
	const { startTransition } = useViewTransition()
	const limit = 10 

	const fetchComments = useCallback(async (currentOffset: number) => {
		try {
			const res = await getUserComments(userId, currentOffset, limit)
			
			startTransition(() => {
				if (currentOffset === 0) {
					setComments(res.comments)
				} else {
					setComments(prev => [...prev, ...res.comments])
				}
				setHasMore(res.hasMore)
			})
		} catch (error) {
			console.error('Error fetching user comments:', error)
		} finally {
			setIsLoading(false)
			setIsLoadingMore(false)
		}
	}, [userId, startTransition])

	useEffect(() => {
		fetchComments(0)
	}, [fetchComments])

	const handleLoadMore = () => {
		if (isLoadingMore || !hasMore) return
		setIsLoadingMore(true)
		const nextOffset = offset + limit
		setOffset(nextOffset)
		fetchComments(nextOffset)
	}

	// Group comments by anime_id while preserving order of first appearance
	const groupedComments = useMemo(() => {
		const groups: { anime: any, comments: any[] }[] = []
		const animeMap = new Map<string, number>() // anime_id -> index in groups array

		comments.forEach(comment => {
			const animeId = comment.anime_id
			if (animeMap.has(animeId)) {
				const index = animeMap.get(animeId)!
				groups[index].comments.push(comment)
			} else {
				animeMap.set(animeId, groups.length)
				groups.push({
					anime: {
						id: animeId,
						title: comment.anime?.title,
						images: comment.anime?.images
					},
					comments: [comment]
				})
			}
		})
		return groups
	}, [comments])

	if (isLoading && comments.length === 0) {
		return (
			<div className={styles.section}>
				<h2 className={styles.sectionTitle}>Mis Comentarios</h2>
				<div className={styles.commentsList}>
					{Array.from({ length: 2 }).map((_, i) => (
						<div key={i} className={styles.commentSkeleton} style={{ height: '200px' }} />
					))}
				</div>
			</div>
		)
	}

	return (
		<div className={styles.section}>
			<h2 className={styles.sectionTitle}>Mis Comentarios</h2>
			
			{comments.length === 0 ? (
				<div className={styles.emptyState}>
					<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
						<line x1="3" y1="3" x2="21" y2="21"></line>
					</svg>
					<p>Aún no has hecho ningún comentario.</p>
				</div>
			) : (
				<div className={styles.commentsList}>
					{groupedComments.map(group => (
						<UserAnimeCommentsCard 
							key={group.anime.id} 
							anime={group.anime} 
							comments={group.comments} 
						/>
					))}
					
					{hasMore && (
						<LoadMoreButton 
							onClick={handleLoadMore} 
							isLoading={isLoadingMore} 
							label="Cargar más comentarios" 
						/>
					)}
				</div>
			)}
		</div>
	)
}
