export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			user_profiles: {
				Row: {
					id: string
					username: string | null
					avatar_url: string | null
					created_at: string
					updated_at: string
				}
				Insert: {
					id: string
					username?: string | null
					avatar_url?: string | null
					created_at?: string
					updated_at?: string
				}
				Update: {
					id?: string
					username?: string | null
					avatar_url?: string | null
					updated_at?: string
				}
			}
			user_favorites: {
				Row: {
					id: string
					user_id: string
					anime_id: string
					anime_title: string
					anime_image: string | null
					created_at: string
				}
				Insert: {
					id?: string
					user_id: string
					anime_id: string
					anime_title: string
					anime_image?: string | null
					created_at?: string
				}
				Update: {
					anime_title?: string
					anime_image?: string | null
				}
			}
			watch_progress: {
				Row: {
					id: string
					user_id: string
					anime_id: string
					episode_number: number
					episode_id: string
					progress_seconds: number
					duration_seconds: number | null
					completed: boolean
					last_watched: string
				}
				Insert: {
					id?: string
					user_id: string
					anime_id: string
					episode_number: number
					episode_id: string
					progress_seconds?: number
					duration_seconds?: number | null
					completed?: boolean
					last_watched?: string
				}
				Update: {
					progress_seconds?: number
					duration_seconds?: number | null
					completed?: boolean
					last_watched?: string
				}
			}
			comments: {
				Row: {
					id: string
					user_id: string
					anime_id: string
					episode_id: string | null
					parent_id: string | null
					thread_id: string | null
					content: string
					edited: boolean
					created_at: string
					updated_at: string
				}
				Insert: {
					id?: string
					user_id: string
					anime_id: string
					episode_id?: string | null
					parent_id?: string | null
					thread_id?: string | null
					content: string
					edited?: boolean
					created_at?: string
					updated_at?: string
				}
				Update: {
					content?: string
					edited?: boolean
					thread_id?: string | null
					updated_at?: string
				}
			}
			comment_likes: {
				Row: {
					id: string
					user_id: string
					comment_id: string
					created_at: string
				}
				Insert: {
					id?: string
					user_id: string
					comment_id: string
					created_at?: string
				}
				Update: {
					[key: string]: never
				}
			}
			comment_dislikes: {
				Row: {
					id: string
					user_id: string
					comment_id: string
					created_at: string
				}
				Insert: {
					id?: string
					user_id: string
					comment_id: string
					created_at?: string
				}
				Update: {
					[key: string]: never
				}
			}
			comment_mentions: {
				Row: {
					id: string
					comment_id: string
					mentioned_user_id: string
					created_at: string
				}
				Insert: {
					id?: string
					comment_id: string
					mentioned_user_id: string
					created_at?: string
				}
				Update: {
					[key: string]: never
				}
			}
		}
	}
}
