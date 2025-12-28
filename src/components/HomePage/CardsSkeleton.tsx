import { CardSkeleton } from '../Card/CardSkeleton'

export function CardsSkeleton({ countCards, hasPill }: { countCards: number; hasPill?: boolean }) {
	return new Array(countCards).fill(0).map((_, i) => <CardSkeleton key={i} hasPill={hasPill} />)
}
