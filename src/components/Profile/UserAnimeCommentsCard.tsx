'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { UserCommentItem } from './UserCommentItem'
import { useViewTransition } from '@/hooks/useViewTransition'
import type { Comment } from '@/types'
import styles from './Profile.module.css'
import clsx from 'clsx'

interface UserAnimeCommentsCardProps {
	anime: {
		id: string
		title: string
		images: any
	}
	comments: (Comment & {
		anime: {
			title: string
			images: any
		}
	})[]
}

export function UserAnimeCommentsCard({ anime, comments }: UserAnimeCommentsCardProps) {
	const [isCollapsed, setIsCollapsed] = useState(true)
	const { startTransition } = useViewTransition()
	const coverImage = anime.images?.coverImage || '/placeholder-anime.jpg'

	const toggleCollapse = () => {
		startTransition(() => {
			setIsCollapsed(!isCollapsed)
		})
	}

	return (
		<article 
			className={styles.animeCommentsCard}
			style={{ viewTransitionName: `anime-card-${anime.id}` } as any}
		>
			<header 
				className={styles.animeCommentsHeader} 
				onClick={toggleCollapse}
				role="button"
				aria-expanded={!isCollapsed}
			>
				<Link 
					href={`/animes/${anime.id}`} 
					className={styles.animeCommentsImage}
					onClick={(e) => e.stopPropagation()}
				>
					<Image 
						src={coverImage} 
						alt={anime.title} 
						width={45} 
						height={62}
						className={styles.animeImage}
					/>
				</Link>
				<div className={styles.animeCommentsInfo}>
					<Link 
						href={`/animes/${anime.id}`} 
						className={styles.animeCommentsTitle}
						onClick={(e) => e.stopPropagation()}
					>
						{anime.title}
					</Link>
					<span className={styles.animeCommentsCount}>
						{comments.length} {comments.length === 1 ? 'comentario' : 'comentarios'}
					</span>
				</div>
				<button 
					className={clsx(styles.collapseToggle, !isCollapsed && styles.collapseToggleActive)}
					aria-label={isCollapsed ? "Expandir comentarios" : "Colapsar comentarios"}
					onClick={(e) => {
						e.stopPropagation()
						toggleCollapse()
					}}
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</button>
			</header>
			
			<div className={clsx(styles.animeCommentsList, isCollapsed && styles.animeCommentsListCollapsed)}>
				{comments.map(comment => (
					<UserCommentItem key={comment.id} comment={comment} />
				))}
			</div>
		</article>
	)
}
