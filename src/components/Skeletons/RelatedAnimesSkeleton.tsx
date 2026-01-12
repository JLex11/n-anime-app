import { SkeletonBase } from './SkeletonBase'

export function RelatedAnimesSkeleton() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
			<SkeletonBase width='150px' height='2rem' />
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
				<SkeletonBase height='5rem' />
				<SkeletonBase height='5rem' />
				<SkeletonBase height='5rem' />
			</div>
		</div>
	)
}
