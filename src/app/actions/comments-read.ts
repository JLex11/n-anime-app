import { getAnime } from '@/services/fetchAnimeHelper'
import type { Database } from '@/lib/supabase/types'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Anime, Comment, CommentWithReplies } from '@/types'

type SupabaseServerClient = SupabaseClient<Database>
type CommentRow = Database['public']['Tables']['comments']['Row']
type UserProfileRow = Database['public']['Tables']['user_profiles']['Row']
type JoinedCommentRow = CommentRow & {
	user_profiles?: Pick<UserProfileRow, 'username' | 'avatar_url'> | null
}

type ReactionCountsRow = {
	comment_id: string
	like_count: number | string
	dislike_count: number | string
}

type ThreadReplyCountRow = {
	thread_id: string
	reply_count: number | string
}

type ThreadReplyPreviewRpcRow = CommentRow & {
	username: string | null
	avatar_url: string | null
	thread_reply_count: number | string
}

type UserCommentsEnrichedRpcRow = CommentRow & {
	like_count: number | string
	dislike_count: number | string
	total_count: number | string
}

interface ReactionState {
	dislikeCountMap: Map<string, number>
	likeCountMap: Map<string, number>
	userDislikes: Set<string>
	userLikes: Set<string>
}

interface ThreadPreviewData {
	previewReplies: JoinedCommentRow[]
	replyCountMap: Map<string, number>
}

export interface UserCommentsPage {
	comments: (Comment & {
		anime: {
			images: Anime['images'] | null
			title: string
		}
	})[]
	totalCount: number
}

export async function loadReactionState(
	supabase: SupabaseServerClient,
	commentIds: string[],
	userId?: string
): Promise<ReactionState> {
	const likeCountMap = new Map<string, number>()
	const dislikeCountMap = new Map<string, number>()
	const userLikes = new Set<string>()
	const userDislikes = new Set<string>()

	if (commentIds.length === 0) {
		return { likeCountMap, dislikeCountMap, userLikes, userDislikes }
	}

	const { data: aggregatedRows, error: aggregatedError } = await supabase.rpc('get_comment_likes_counts', {
		comment_ids: commentIds,
	} as any)

	if (!aggregatedError && Array.isArray(aggregatedRows)) {
		for (const row of aggregatedRows as ReactionCountsRow[]) {
			likeCountMap.set(row.comment_id, Number(row.like_count))
			dislikeCountMap.set(row.comment_id, Number(row.dislike_count))
		}
	} else {
		const [{ data: likeRows }, { data: dislikeRows }] = await Promise.all([
			supabase.from('comment_likes').select('comment_id').in('comment_id', commentIds),
			supabase.from('comment_dislikes').select('comment_id').in('comment_id', commentIds),
		])

		for (const row of (likeRows || []) as Array<{ comment_id: string }>) {
			likeCountMap.set(row.comment_id, (likeCountMap.get(row.comment_id) || 0) + 1)
		}

		for (const row of (dislikeRows || []) as Array<{ comment_id: string }>) {
			dislikeCountMap.set(row.comment_id, (dislikeCountMap.get(row.comment_id) || 0) + 1)
		}
	}

	if (userId) {
		const [{ data: likesData }, { data: dislikesData }] = await Promise.all([
			supabase.from('comment_likes').select('comment_id').eq('user_id', userId).in('comment_id', commentIds),
			supabase.from('comment_dislikes').select('comment_id').eq('user_id', userId).in('comment_id', commentIds),
		])

		for (const row of (likesData || []) as Array<{ comment_id: string }>) {
			userLikes.add(row.comment_id)
		}

		for (const row of (dislikesData || []) as Array<{ comment_id: string }>) {
			userDislikes.add(row.comment_id)
		}
	}

	return { likeCountMap, dislikeCountMap, userLikes, userDislikes }
}

export async function loadThreadPreviewData(
	supabase: SupabaseServerClient,
	threadIds: string[],
	perThreadLimit: number
): Promise<ThreadPreviewData> {
	if (threadIds.length === 0) {
		return { previewReplies: [], replyCountMap: new Map<string, number>() }
	}

	const [{ data: previewRows, error: previewError }, { data: countRows, error: countError }] = await Promise.all([
		supabase.rpc('get_thread_reply_previews', {
			thread_ids: threadIds,
			per_thread_limit: perThreadLimit,
		} as any),
		supabase.rpc('get_thread_reply_counts', {
			thread_ids: threadIds,
		} as any),
	])

	if (!previewError && Array.isArray(previewRows) && !countError && Array.isArray(countRows)) {
		const replyCountMap = new Map<string, number>()

		for (const row of countRows as ThreadReplyCountRow[]) {
			replyCountMap.set(row.thread_id, Number(row.reply_count))
		}

		return {
			previewReplies: (previewRows as ThreadReplyPreviewRpcRow[]).map(row => ({
				id: row.id,
				user_id: row.user_id,
				anime_id: row.anime_id,
				episode_id: row.episode_id,
				parent_id: row.parent_id,
				thread_id: row.thread_id,
				content: row.content,
				edited: row.edited,
				created_at: row.created_at,
				updated_at: row.updated_at,
				user_profiles: {
					username: row.username,
					avatar_url: row.avatar_url,
				},
			})),
			replyCountMap,
		}
	}

	const { data: allReplies } = await supabase
		.from('comments')
		.select('*, user_profiles!comments_user_id_fkey(username, avatar_url)')
		.in('thread_id', threadIds)
		.not('parent_id', 'is', null)
		.order('created_at', { ascending: true })

	const replyCountMap = new Map<string, number>()
	const repliesByThread = new Map<string, JoinedCommentRow[]>()

	for (const reply of (allReplies || []) as JoinedCommentRow[]) {
		if (!reply.thread_id) continue

		replyCountMap.set(reply.thread_id, (replyCountMap.get(reply.thread_id) || 0) + 1)

		if (!repliesByThread.has(reply.thread_id)) {
			repliesByThread.set(reply.thread_id, [])
		}

		const threadReplies = repliesByThread.get(reply.thread_id)
		if (threadReplies && threadReplies.length < perThreadLimit) {
			threadReplies.push(reply)
		}
	}

	return {
		previewReplies: Array.from(repliesByThread.values()).flat(),
		replyCountMap,
	}
}

export function buildThreadPreviewComments(
	topLevelComments: JoinedCommentRow[],
	previewReplies: JoinedCommentRow[],
	reactionState: ReactionState,
	replyCountMap: Map<string, number>
): CommentWithReplies[] {
	const topLevelIds = new Set(topLevelComments.map(comment => comment.id))
	const usernameById = new Map<string, string>()

	for (const comment of topLevelComments) {
		usernameById.set(comment.id, comment.user_profiles?.username || 'Usuario')
	}

	for (const reply of previewReplies) {
		usernameById.set(reply.id, reply.user_profiles?.username || 'Usuario')
	}

	const rawRepliesById = new Map(previewReplies.map(reply => [reply.id, reply]))
	const repliesById = new Map<string, CommentWithReplies>()

	for (const reply of previewReplies) {
		repliesById.set(reply.id, {
			...reply,
			user_profile: reply.user_profiles || undefined,
			like_count: reactionState.likeCountMap.get(reply.id) || 0,
			user_has_liked: reactionState.userLikes.has(reply.id),
			dislike_count: reactionState.dislikeCountMap.get(reply.id) || 0,
			user_has_disliked: reactionState.userDislikes.has(reply.id),
			replies: [],
			reply_count: 0,
		})
	}

	const repliesByRoot = new Map<string, CommentWithReplies[]>()
	const nestedRepliesByLevel1 = new Map<string, CommentWithReplies[]>()

	for (const reply of previewReplies) {
		const enrichedReply = repliesById.get(reply.id)
		if (!enrichedReply || !reply.parent_id) continue

		enrichedReply.replying_to_username = usernameById.get(reply.parent_id) || null

		if (topLevelIds.has(reply.parent_id)) {
			if (!repliesByRoot.has(reply.parent_id)) {
				repliesByRoot.set(reply.parent_id, [])
			}
			repliesByRoot.get(reply.parent_id)?.push(enrichedReply)
			continue
		}

		let currentParentId: string | null = reply.parent_id
		while (currentParentId && !topLevelIds.has(currentParentId)) {
			const parentReply = rawRepliesById.get(currentParentId)
			if (!parentReply) break

			if (parentReply.parent_id && topLevelIds.has(parentReply.parent_id)) {
				if (!nestedRepliesByLevel1.has(parentReply.id)) {
					nestedRepliesByLevel1.set(parentReply.id, [])
				}
				nestedRepliesByLevel1.get(parentReply.id)?.push(enrichedReply)
				break
			}

			currentParentId = parentReply.parent_id
		}
	}

	for (const directReplies of repliesByRoot.values()) {
		for (const directReply of directReplies) {
			const nestedReplies = nestedRepliesByLevel1.get(directReply.id) || []
			directReply.replies = nestedReplies
			directReply.reply_count = nestedReplies.length
		}
	}

	return topLevelComments.map(comment => {
		const directReplies = repliesByRoot.get(comment.id) || []
		const loadedReplyCount = directReplies.reduce((loadedCount, reply) => {
			return loadedCount + 1 + (reply.replies?.length || 0)
		}, 0)
		const totalReplies = replyCountMap.get(comment.id) || 0

		return {
			...comment,
			user_profile: comment.user_profiles || undefined,
			like_count: reactionState.likeCountMap.get(comment.id) || 0,
			user_has_liked: reactionState.userLikes.has(comment.id),
			dislike_count: reactionState.dislikeCountMap.get(comment.id) || 0,
			user_has_disliked: reactionState.userDislikes.has(comment.id),
			replies: directReplies,
			reply_count: totalReplies,
			has_hidden_replies: totalReplies > loadedReplyCount,
			loaded_reply_count: loadedReplyCount,
		}
	})
}

export async function loadUserCommentsPage(
	supabase: SupabaseServerClient,
	userId: string,
	offset = 0,
	limit = 10
): Promise<UserCommentsPage> {
	let comments: Comment[] = []
	let totalCount = 0

	const { data: enrichedRows, error: enrichedError } = await supabase.rpc('get_user_comments_enriched', {
		target_user_id: userId,
		offset_count: offset,
		limit_count: limit,
	} as any)

	if (!enrichedError && Array.isArray(enrichedRows)) {
		const rows = enrichedRows as UserCommentsEnrichedRpcRow[]
		totalCount = rows.length > 0 ? Number(rows[0].total_count) : 0
		comments = rows.map(row => ({
			id: row.id,
			user_id: row.user_id,
			anime_id: row.anime_id,
			episode_id: row.episode_id,
			parent_id: row.parent_id,
			thread_id: row.thread_id,
			content: row.content,
			edited: row.edited,
			created_at: row.created_at,
			updated_at: row.updated_at,
			like_count: Number(row.like_count),
			dislike_count: Number(row.dislike_count),
			user_has_liked: false,
			user_has_disliked: false,
		}))
	} else {
		const { data: rawComments, error, count } = await supabase
			.from('comments')
			.select('*', { count: 'exact' })
			.eq('user_id', userId)
			.order('created_at', { ascending: false })
			.range(offset, offset + limit - 1)

		if (error || !rawComments) {
			return { comments: [], totalCount: 0 }
		}

		const commentsRows = rawComments as CommentRow[]
		totalCount = count || 0
		const reactionState = await loadReactionState(
			supabase,
			commentsRows.map(comment => comment.id)
		)

		comments = commentsRows.map(comment => ({
			...comment,
			like_count: reactionState.likeCountMap.get(comment.id) || 0,
			dislike_count: reactionState.dislikeCountMap.get(comment.id) || 0,
			user_has_liked: false,
			user_has_disliked: false,
		}))
	}

	const animeIds = Array.from(new Set(comments.map(comment => comment.anime_id)))
	const animeResults = await Promise.all(animeIds.map(animeId => getAnime(animeId)))
	const animeMap = new Map<string, { images: Anime['images'] | null; title: string }>()

	for (const [index, anime] of animeResults.entries()) {
		const animeId = animeIds[index]
		if (!animeId || !anime) continue

		animeMap.set(animeId, {
			title: anime.title,
			images: anime.images || null,
		})
	}

	return {
		comments: comments.map(comment => ({
			...comment,
			anime: animeMap.get(comment.anime_id) || {
				title: 'Anime Desconocido',
				images: null,
			},
		})),
		totalCount,
	}
}
