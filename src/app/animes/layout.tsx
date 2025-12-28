import { SkeletonBase } from '@/components/Skeletons'
import { Suspense } from 'react'

interface Props {
	children: React.ReactNode
}

export default function AnimesLayout({ children }: Props) {
	return (
		<Suspense
			fallback={
				<div style={{ padding: '2rem', width: '100%' }}>
					<SkeletonBase height='20rem' />
				</div>
			}
		>
			{children}
		</Suspense>
	)
}
