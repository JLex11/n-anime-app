import { getUser } from '@/app/actions/auth'
import { UserCommentsSection } from './UserCommentsSection'

export async function UserCommentsWrapper() {
	const user = await getUser()

	if (!user) {
		return null
	}

	return <UserCommentsSection userId={user.id} />
}
