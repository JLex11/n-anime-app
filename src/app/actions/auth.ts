'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export async function signUp(formData: FormData) {
	const supabase = await createClient()

	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}

	const { error } = await supabase.auth.signUp(data)

	if (error) {
		return { error: error.message }
	}

	revalidatePath('/', 'layout')
	redirect('/')
}

export async function signIn(_prevState: unknown, formData: FormData) {
	const supabase = await createClient()

	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}

	const { error } = await supabase.auth.signInWithPassword(data)

	if (error) {
		return { error: error.message }
	}

	const redirectTo = formData.get('redirect') as string
	revalidatePath('/', 'layout')
	redirect(redirectTo || '/')
}

export async function signOut() {
	const supabase = await createClient()
	await supabase.auth.signOut()
	revalidatePath('/', 'layout')
	redirect('/login')
}

export async function signInWithOAuth(provider: 'google' | 'github') {
	const supabase = await createClient()

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
		},
	})

	if (error) {
		return { error: error.message }
	}

	if (data.url) {
		redirect(data.url)
	}
}

export const getUser = cache(async () => {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	return user
})

export const getUserProfile = cache(async () => {
	const user = await getUser()
	if (!user) return null

	const supabase = await createClient()
	const { data } = await supabase
		.from('user_profiles')
		.select('username, avatar_url')
		.eq('id', user.id)
		.single()

	return data
})
