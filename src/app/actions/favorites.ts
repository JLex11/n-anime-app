'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/supabase/types'

async function getFavoritesByUserId(userId: string) {
	const supabase = await createClient()
	const { data, error } = await supabase
		.from('user_favorites')
		.select('*')
		.eq('user_id', userId)
		.order('created_at', { ascending: false })

	if (error) {
		console.error('Error fetching favorites:', error)
		return []
	}

	return data || []
}

export async function addToFavorites(
	animeId: string,
	animeTitle: string,
	animeImage?: string,
) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return { error: 'No autenticado' }
	}

	const favoriteToInsert = {
		user_id: user.id,
		anime_id: animeId,
		anime_title: animeTitle,
		anime_image: animeImage || null,
	} satisfies Database['public']['Tables']['user_favorites']['Insert']

	const { error } = await supabase.from('user_favorites').insert(favoriteToInsert as never)

	if (error) {
		return { error: error.message }
	}

	// Invalidar caché de favoritos y página del anime usando tags
	revalidatePath('/favoritos')
	revalidateTag(`anime-${animeId}`, 'max')
	return { success: true }
}

export async function removeFromFavorites(animeId: string) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return { error: 'No autenticado' }
	}

	const { error } = await supabase
		.from('user_favorites')
		.delete()
		.eq('user_id', user.id)
		.eq('anime_id', animeId)

	if (error) {
		return { error: error.message }
	}

	// Invalidar caché de favoritos y página del anime usando tags
	revalidatePath('/favoritos')
	revalidateTag(`anime-${animeId}`, 'max')
	return { success: true }
}

export async function getFavorites() {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return []
	}

	return getFavoritesByUserId(user.id)
}

export async function getFavoritesForUser(userId: string) {
	return getFavoritesByUserId(userId)
}

export const isFavorite = cache(async (animeId: string) => {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return false
	}

	const { data } = await supabase
		.from('user_favorites')
		.select('id')
		.eq('user_id', user.id)
		.eq('anime_id', animeId)
		.single()

	return !!data
})
