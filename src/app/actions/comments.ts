'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import type { Comment, CommentWithReplies } from '@/types'

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Extract @username mentions from markdown content
 * Matches @username (alphanumeric, underscore, hyphen, dot)
 */
function extractMentions(content: string): string[] {
	const mentionRegex = /@([a-zA-Z0-9_.-]+)/g
	const mentions = new Set<string>()
	let match

	while ((match = mentionRegex.exec(content)) !== null) {
		mentions.add(match[1])
	}

	return Array.from(mentions)
}

/**
 * Get user IDs from usernames
 */
async function getUserIdsByUsernames(usernames: string[]): Promise<string[]> {
	if (usernames.length === 0) return []

	const supabase = await createClient()
	const { data } = await supabase
		.from('user_profiles')
		.select('id')
		.in('username', usernames)
		.returns<{ id: string }[]>()

	return data?.map(u => u.id) || []
}

// =====================================================
// CREATE COMMENT
// =====================================================

export async function createComment(
	animeId: string,
	content: string,
	episodeId?: string | null,
	parentId?: string | null
) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return { error: 'No autenticado' }
	}

	// Validate content
	if (!content || content.trim().length === 0) {
		return { error: 'El comentario no puede estar vacío' }
	}

	if (content.length > 10000) {
		return { error: 'El comentario es demasiado largo (máximo 10,000 caracteres)' }
	}

	// Insert comment
	const { data: comment, error } = await supabase
		.from('comments')
		.insert({
			user_id: user.id,
			anime_id: animeId,
			episode_id: episodeId || null,
			parent_id: parentId || null,
			content: content.trim(),
		} as any)
		.select()
		.single()

	if (error || !comment) {
		console.error('Error creating comment:', error)
		console.error('Error details:', JSON.stringify(error, null, 2))
		console.error('Trying to insert:', {
			user_id: user.id,
			anime_id: animeId,
			episode_id: episodeId,
			parent_id: parentId,
			content_length: content.trim().length,
		})
		return { error: 'Error al crear el comentario' }
	}

	// Extract and save mentions
	const mentions = extractMentions(content)
	if (mentions.length > 0) {
		const mentionedUserIds = await getUserIdsByUsernames(mentions)

		if (mentionedUserIds.length > 0) {
			await supabase
				.from('comment_mentions')
				.insert(
					mentionedUserIds.map(userId => ({
						comment_id: (comment as any).id,
						mentioned_user_id: userId,
					})) as any
				)
		}
	}

	// Revalidate paths
	if (episodeId) {
		const parts = episodeId.split('-')
		const episodeNumber = parts[parts.length - 1]
		revalidatePath(`/animes/${animeId}/${episodeNumber}`)
	} else {
		revalidatePath(`/animes/${animeId}`)
	}

	return { success: true, data: comment }
}

// =====================================================
// UPDATE COMMENT
// =====================================================

export async function updateComment(commentId: string, content: string) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return { error: 'No autenticado' }
	}

	// Validate content
	if (!content || content.trim().length === 0) {
		return { error: 'El comentario no puede estar vacío' }
	}

	if (content.length > 10000) {
		return { error: 'El comentario es demasiado largo' }
	}

	// Check ownership
	const { data: existingComment } = (await supabase
		.from('comments')
		.select('user_id, anime_id, episode_id')
		.eq('id', commentId)
		.single()) as any

	if (!existingComment || existingComment.user_id !== user.id) {
		return { error: 'No tienes permiso para editar este comentario' }
	}

	// Update comment
	const { error } = (await (supabase as any)
		.from('comments')
		.update({
			content: content.trim(),
			edited: true,
		})
		.eq('id', commentId)) as any

	if (error) {
		return { error: 'Error al actualizar el comentario' }
	}

	// Update mentions
	// Delete old mentions
	await supabase.from('comment_mentions').delete().eq('comment_id', commentId)

	// Add new mentions
	const mentions = extractMentions(content)
	if (mentions.length > 0) {
		const mentionedUserIds = await getUserIdsByUsernames(mentions)

		if (mentionedUserIds.length > 0) {
			await supabase
				.from('comment_mentions')
				.insert(
					mentionedUserIds.map(userId => ({
						comment_id: commentId,
						mentioned_user_id: userId,
					})) as any
				)
		}
	}

	// Revalidate
	if (existingComment.episode_id) {
		const parts = existingComment.episode_id.split('-')
		const episodeNumber = parts[parts.length - 1]
		revalidatePath(`/animes/${existingComment.anime_id}/${episodeNumber}`)
	} else {
		revalidatePath(`/animes/${existingComment.anime_id}`)
	}

	return { success: true }
}

// =====================================================
// DELETE COMMENT
// =====================================================

export async function deleteComment(commentId: string) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return { error: 'No autenticado' }
	}

	// Check ownership
	const { data: existingComment } = (await supabase
		.from('comments')
		.select('user_id, anime_id, episode_id')
		.eq('id', commentId)
		.single()) as any

	if (!existingComment || existingComment.user_id !== user.id) {
		return { error: 'No tienes permiso para eliminar este comentario' }
	}

	// Delete comment (cascade will delete likes and mentions)
	const { error } = await supabase.from('comments').delete().eq('id', commentId)

	if (error) {
		return { error: 'Error al eliminar el comentario' }
	}

	// Revalidate
	if (existingComment.episode_id) {
		const parts = existingComment.episode_id.split('-')
		const episodeNumber = parts[parts.length - 1]
		revalidatePath(`/animes/${existingComment.anime_id}/${episodeNumber}`)
	} else {
		revalidatePath(`/animes/${existingComment.anime_id}`)
	}

	return { success: true }
}

// =====================================================
// LIKE / UNLIKE COMMENT
// =====================================================

export async function toggleCommentLike(commentId: string) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return { error: 'No autenticado' }
	}

	// Check if already liked
	const { data: existingLike } = (await supabase
		.from('comment_likes')
		.select('id')
		.eq('user_id', user.id)
		.eq('comment_id', commentId)
		.single()) as any

	if (existingLike) {
		// Unlike
		const { error } = await supabase.from('comment_likes').delete().eq('id', existingLike.id)

		if (error) {
			return { error: 'Error al quitar el like' }
		}

		// Get comment info for revalidation
		const { data: comment } = (await supabase
			.from('comments')
			.select('anime_id, episode_id')
			.eq('id', commentId)
			.single()) as any

		if (comment) {
			if (comment.episode_id) {
				const parts = comment.episode_id.split('-')
				const episodeNumber = parts[parts.length - 1]
				revalidatePath(`/animes/${comment.anime_id}/${episodeNumber}`)
			} else {
				revalidatePath(`/animes/${comment.anime_id}`)
			}
		}

		return { success: true, liked: false }
	} else {
		// Like - también remover dislike si existe
		const { data: existingDislike } = (await supabase
			.from('comment_dislikes')
			.select('id')
			.eq('user_id', user.id)
			.eq('comment_id', commentId)
			.single()) as any

		if (existingDislike) {
			await supabase.from('comment_dislikes').delete().eq('id', existingDislike.id)
		}

		const { error } = await supabase.from('comment_likes').insert({
			user_id: user.id,
			comment_id: commentId,
		} as any)

		if (error) {
			return { error: 'Error al dar like' }
		}

		// Get comment info for revalidation
		const { data: comment } = (await supabase
			.from('comments')
			.select('anime_id, episode_id')
			.eq('id', commentId)
			.single()) as any

		if (comment) {
			if (comment.episode_id) {
				const parts = comment.episode_id.split('-')
				const episodeNumber = parts[parts.length - 1]
				revalidatePath(`/animes/${comment.anime_id}/${episodeNumber}`)
			} else {
				revalidatePath(`/animes/${comment.anime_id}`)
			}
		}

		return { success: true, liked: true }
	}
}

// =====================================================
// DISLIKE / UNDISLIKE COMMENT
// =====================================================

export async function toggleCommentDislike(commentId: string) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return { error: 'No autenticado' }
	}

	// Check if already disliked
	const { data: existingDislike } = (await supabase
		.from('comment_dislikes')
		.select('id')
		.eq('user_id', user.id)
		.eq('comment_id', commentId)
		.single()) as any

	if (existingDislike) {
		// Remove dislike
		const { error } = await supabase.from('comment_dislikes').delete().eq('id', existingDislike.id)

		if (error) {
			return { error: 'Error al quitar el dislike' }
		}

		// Get comment info for revalidation
		const { data: comment } = (await supabase
			.from('comments')
			.select('anime_id, episode_id')
			.eq('id', commentId)
			.single()) as any

		if (comment) {
			if (comment.episode_id) {
				const parts = comment.episode_id.split('-')
				const episodeNumber = parts[parts.length - 1]
				revalidatePath(`/animes/${comment.anime_id}/${episodeNumber}`)
			} else {
				revalidatePath(`/animes/${comment.anime_id}`)
			}
		}

		return { success: true, disliked: false }
	} else {
		// Dislike - también remover like si existe
		const { data: existingLike } = (await supabase
			.from('comment_likes')
			.select('id')
			.eq('user_id', user.id)
			.eq('comment_id', commentId)
			.single()) as any

		if (existingLike) {
			await supabase.from('comment_likes').delete().eq('id', existingLike.id)
		}

		const { error } = await supabase.from('comment_dislikes').insert({
			user_id: user.id,
			comment_id: commentId,
		} as any)

		if (error) {
			return { error: 'Error al dar dislike' }
		}

		// Get comment info for revalidation
		const { data: comment } = (await supabase
			.from('comments')
			.select('anime_id, episode_id')
			.eq('id', commentId)
			.single()) as any

		if (comment) {
			if (comment.episode_id) {
				const parts = comment.episode_id.split('-')
				const episodeNumber = parts[parts.length - 1]
				revalidatePath(`/animes/${comment.anime_id}/${episodeNumber}`)
			} else {
				revalidatePath(`/animes/${comment.anime_id}`)
			}
		}

		return { success: true, disliked: true }
	}
}

// =====================================================
// GET COMMENTS (WITH NESTED REPLIES - 2 LEVELS)
// =====================================================

export const getComments = cache(
	async (animeId: string, episodeId?: string | null): Promise<CommentWithReplies[]> => {
		const supabase = await createClient()
		const {
			data: { user },
		} = await supabase.auth.getUser()

		// Build query for top-level comments
		const query = supabase
			.from('comments')
			.select(
				`
      *,
      user_profiles!comments_user_id_fkey(username, avatar_url)
    `
			)
			.eq('anime_id', animeId)
			.is('parent_id', null)
			.order('created_at', { ascending: false })

		if (episodeId) {
			query.eq('episode_id', episodeId)
		} else {
			query.is('episode_id', null)
		}

		const { data: topLevelComments, error } = (await query) as any

		if (error || !topLevelComments) {
			console.error('Error fetching comments:', error)
			return []
		}

		// Get all comment IDs (for fetching likes and replies)
		const topLevelIds = topLevelComments.map((c: any) => c.id)

		// Fetch ALL replies using thread_id (single query instead of 2)
		const { data: allReplies } = (await supabase
			.from('comments')
			.select(
				`
      *,
      user_profiles!comments_user_id_fkey(username, avatar_url)
    `
			)
			.in('thread_id', topLevelIds)
			.not('parent_id', 'is', null) // Excluir los roots
			.order('created_at', { ascending: true })) as any

		// Get all comment IDs for likes
		const allCommentIds = [
			...topLevelIds,
			...(allReplies?.map((c: any) => c.id) || []),
		]

		// Fetch like counts
		const { data: likeCounts } = (await supabase
			.from('comment_likes')
			.select('comment_id')
			.in('comment_id', allCommentIds)) as any

		// Fetch dislike counts
		const { data: dislikeCounts } = (await supabase
			.from('comment_dislikes')
			.select('comment_id')
			.in('comment_id', allCommentIds)) as any

		// Fetch user's likes
		let userLikes: string[] = []
		let userDislikes: string[] = []
		if (user) {
			const { data: likesData } = (await supabase
				.from('comment_likes')
				.select('comment_id')
				.eq('user_id', user.id)
				.in('comment_id', allCommentIds)) as any

			const { data: dislikesData } = (await supabase
				.from('comment_dislikes')
				.select('comment_id')
				.eq('user_id', user.id)
				.in('comment_id', allCommentIds)) as any

			userLikes = likesData?.map((l: any) => l.comment_id) || []
			userDislikes = dislikesData?.map((d: any) => d.comment_id) || []
		}

		// Build like count map
		const likeCountMap = new Map<string, number>()
		likeCounts?.forEach((like: any) => {
			likeCountMap.set(like.comment_id, (likeCountMap.get(like.comment_id) || 0) + 1)
		})

		// Build dislike count map
		const dislikeCountMap = new Map<string, number>()
		dislikeCounts?.forEach((dislike: any) => {
			dislikeCountMap.set(dislike.comment_id, (dislikeCountMap.get(dislike.comment_id) || 0) + 1)
		})

		// Build reply map: primero creamos un mapa por ID para acceso rápido
		// También creamos un mapa de IDs a usernames para resolver @menciones
		const usernameById = new Map<string, string>()
		topLevelComments.forEach((c: any) => {
			usernameById.set(c.id, c.user_profiles?.username || 'Usuario')
		})

		const repliesById = new Map<string, CommentWithReplies>()
		allReplies?.forEach((reply: any) => {
			usernameById.set(reply.id, reply.user_profiles?.username || 'Usuario')

			const enrichedReply: CommentWithReplies = {
				...reply,
				user_profile: reply.user_profiles as any,
				like_count: likeCountMap.get(reply.id) || 0,
				user_has_liked: userLikes.includes(reply.id),
				dislike_count: dislikeCountMap.get(reply.id) || 0,
				user_has_disliked: userDislikes.includes(reply.id),
				replies: [],
				reply_count: 0,
			}
			repliesById.set(reply.id, enrichedReply)
		})

		// Identificar comentarios de nivel 1 (hijos directos de roots)
		const level1Ids = new Set<string>()
		allReplies?.forEach((reply: any) => {
			if (topLevelComments.some((c: any) => c.id === reply.parent_id)) {
				level1Ids.add(reply.id)
			}
		})

		// Agrupar respuestas: nivel 1 y aplanar nivel 2+ como hermanos
		const repliesByLevel1 = new Map<string, CommentWithReplies[]>()
		
		allReplies?.forEach((reply: any) => {
			const enrichedReply = repliesById.get(reply.id)!
			enrichedReply.replying_to_username = usernameById.get(reply.parent_id) || null

			if (level1Ids.has(reply.id)) {
				// Este es nivel 1: no hacer nada aquí, se asignará después
			} else {
				// Este es nivel 2+: encontrar su ancestro de nivel 1 y agregarlo ahí (flat)
				let currentParentId = reply.parent_id
				
				// Buscar el ancestro de nivel 1
				while (currentParentId && !level1Ids.has(currentParentId)) {
					const parent = allReplies?.find((r: any) => r.id === currentParentId)
					if (!parent) break
					currentParentId = parent.parent_id
				}

				// Si encontramos el nivel 1, agregar como hermano
				if (currentParentId && level1Ids.has(currentParentId)) {
					if (!repliesByLevel1.has(currentParentId)) {
						repliesByLevel1.set(currentParentId, [])
					}
					repliesByLevel1.get(currentParentId)!.push(enrichedReply)
				}
			}
		})

		// Asignar replies a los comentarios de nivel 1
		level1Ids.forEach((level1Id) => {
			const level1Comment = repliesById.get(level1Id)
			if (level1Comment) {
				const flatReplies = repliesByLevel1.get(level1Id) || []
				level1Comment.replies = flatReplies
				level1Comment.reply_count = flatReplies.length
			}
		})

		// Agrupar nivel 1 por su parent (root)
		const repliesByRoot = new Map<string, CommentWithReplies[]>()
		allReplies?.forEach((reply: any) => {
			if (level1Ids.has(reply.id)) {
				const enrichedReply = repliesById.get(reply.id)!
				if (!repliesByRoot.has(reply.parent_id)) {
					repliesByRoot.set(reply.parent_id, [])
				}
				repliesByRoot.get(reply.parent_id)!.push(enrichedReply)
			}
		})

		// Enrich top-level comments
		const enrichedComments: CommentWithReplies[] = topLevelComments.map((comment: any) => {
			const directReplies = repliesByRoot.get(comment.id) || []
			return {
				...comment,
				user_profile: comment.user_profiles as any,
				like_count: likeCountMap.get(comment.id) || 0,
				user_has_liked: userLikes.includes(comment.id),
				dislike_count: dislikeCountMap.get(comment.id) || 0,
				user_has_disliked: userDislikes.includes(comment.id),
				replies: directReplies,
				reply_count: directReplies.length,
			}
		})

		return enrichedComments
	}
)

// =====================================================
// GET COMMENT COUNT
// =====================================================

export const getCommentCount = cache(
	async (animeId: string, episodeId?: string | null): Promise<number> => {
		const supabase = await createClient()

		const query = supabase
			.from('comments')
			.select('id', { count: 'exact', head: true })
			.eq('anime_id', animeId)

		if (episodeId) {
			query.eq('episode_id', episodeId)
		} else {
			query.is('episode_id', null)
		}

		const { count } = (await query) as any

		return count || 0
	}
)
