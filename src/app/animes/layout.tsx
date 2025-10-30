import { Suspense } from 'react'

interface Props {
	children: React.ReactNode
}

export default function AnimesLayout({ children }: Props) {
	return <Suspense fallback={<div style={{ padding: '2rem' }}>Cargando...</div>}>{children}</Suspense>
}
