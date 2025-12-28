'use client'

import { addToFavorites, removeFromFavorites } from '@/app/actions/favorites'
import { useState, useTransition } from 'react'
import styles from './Anime.module.css'

interface Props {
	animeId: string
	animeTitle: string
	animeImage?: string
	initialIsFavorite: boolean
	isAuthenticated: boolean
}

export function FavoriteButton({
	animeId,
	animeTitle,
	animeImage,
	initialIsFavorite,
	isAuthenticated,
}: Props) {
	const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
	const [isPending, startTransition] = useTransition()

	const handleToggleFavorite = () => {
		if (!isAuthenticated) {
			window.location.href = `/login?redirect=/animes/${animeId}`
			return
		}

		startTransition(async () => {
			if (isFavorite) {
				const result = await removeFromFavorites(animeId)
				if (result.success) {
					setIsFavorite(false)
				}
			} else {
				const result = await addToFavorites(animeId, animeTitle, animeImage)
				if (result.success) {
					setIsFavorite(true)
				}
			}
		})
	}

	return (
		<button
			onClick={handleToggleFavorite}
			disabled={isPending}
			className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
			aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
			type="button"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill={isFavorite ? 'currentColor' : 'none'}
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<title>{isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}</title>
				<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
			</svg>
			{isPending
				? 'Guardando...'
				: isFavorite
					? 'En favoritos'
					: 'Agregar a favoritos'}
		</button>
	)
}
