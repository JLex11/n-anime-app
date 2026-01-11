'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { WatchProgress } from '@/types'

export async function updateWatchProgress(
	animeId: string,
	episodeNumber: number,
	episodeId: string,
	progressSeconds: number,
	durationSeconds?: number,
) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return { error: 'No autenticado' }
	}

	const completed = durationSeconds
		? progressSeconds / durationSeconds > 0.9
		: false

	const { error } = await supabase
		.from('watch_progress')
		.upsert(
			{
				user_id: user.id,
				anime_id: animeId,
				episode_number: episodeNumber,
				episode_id: episodeId,
				progress_seconds: progressSeconds,
				duration_seconds: durationSeconds || null,
				completed,
				last_watched: new Date().toISOString(),
			} as any,
			{
				onConflict: 'user_id,anime_id,episode_id',
			},
		)

	if (error) {
		return { error: error.message }
	}

	// Invalidar caché de mi-lista
	revalidatePath('/mi-lista')
	return { success: true }
}

export async function getWatchProgress(animeId: string, episodeId: string): Promise<WatchProgress | null>
export async function getWatchProgress(animeId: string): Promise<WatchProgress[] | null>
export async function getWatchProgress(animeId: string, episodeId?: string): Promise<WatchProgress | WatchProgress[] | null> {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return null
	}

	if (episodeId) {
		const { data, error } = await supabase
			.from('watch_progress')
			.select('*')
			.eq('user_id', user.id)
			.eq('anime_id', animeId)
			.eq('episode_id', episodeId)
			.single()

		if (error) {
			return null
		}

		return data
	}

	const { data, error } = await supabase
		.from('watch_progress')
		.select('*')
		.eq('user_id', user.id)
		.eq('anime_id', animeId)
		.order('last_watched', { ascending: false })

	if (error) {
		return null
	}

	return data
}

export async function getContinueWatching() {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return []
	}

	const { data, error } = await supabase
		.from('watch_progress')
		.select('*')
		.eq('user_id', user.id)
		.eq('completed', false)
		.order('last_watched', { ascending: false })
		.limit(10)

	if (error) {
		return []
	}

	return data || []
}
