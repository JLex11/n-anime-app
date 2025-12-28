'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'

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

	const { error } = await supabase
		.from('user_favorites')
		.insert({
			user_id: user.id,
			anime_id: animeId,
			anime_title: animeTitle,
			anime_image: animeImage || null,
		} as any)

	if (error) {
		return { error: error.message }
	}

	revalidatePath('/favoritos')
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

	revalidatePath('/favoritos')
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

	const { data, error } = await supabase
		.from('user_favorites')
		.select('*')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false })

	if (error) {
		console.error('Error fetching favorites:', error)
		return []
	}

	return data || []
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
