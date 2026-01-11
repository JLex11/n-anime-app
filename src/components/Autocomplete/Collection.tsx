import type { AutocompleteOutputItem } from '@/hooks/useAutocomplete.types'
import { toCap } from '@/utils/textConverts'
import { memo, useEffect, useState } from 'react'
import styles from './Autocomplete.module.css'
import { CollectionItem } from './CollectionItem'
import Link from 'next/link'
import { useAutocompleteContext } from './Contexts'
import SearchIcon from '../Icons/SearchIcon'

interface Props {
	items: AutocompleteOutputItem[]
	sourceId: string
	query?: string
}

const LazyCollectionItem = memo(function LazyCollectionItem({
	item,
	delay = 0,
}: {
	item: AutocompleteOutputItem
	delay?: number
}) {
	const [shouldRender, setShouldRender] = useState(delay === 0)

	useEffect(() => {
		if (delay > 0) {
			const timer = setTimeout(() => setShouldRender(true), delay)
			return () => clearTimeout(timer)
		}
	}, [delay])

	if (!shouldRender) {
		return (
			<div className={styles.collectionItemSkeleton}>
				<div className={styles.skeletonImage} />
				<div className={styles.skeletonContent}>
					<div className={styles.skeletonTitle} />
					<div className={styles.skeletonDescription} />
					<div className={styles.skeletonBadges} />
				</div>
			</div>
		)
	}

	return <CollectionItem item={item} />
})

export function Collection({ items, sourceId, query }: Props) {
	const { handleLaunchAutocomplete } = useAutocompleteContext()

	if (items.length === 0) return null

	const shouldShowViewMore = sourceId === 'Animes' && query && query.length > 0

	return (
		<section className={styles.collection}>
			<header className={styles.collectionHeader}>
				<h3 className={styles.collectionTitle}>{toCap(sourceId)}</h3>
				<span className={styles.itemsCount}>{items.length} encontrados</span>
			</header>
			{items.map((item, index) => (
				<LazyCollectionItem
					key={item.link ?? item.title}
					item={item}
					delay={index * 30} // Escalonar la carga
				/>
			))}
			{shouldShowViewMore && (
				<Link
					href={`/animes?query=${encodeURIComponent(query)}`}
					className={styles.viewMoreButton}
					onClick={() => handleLaunchAutocomplete(false)}
				>
					<div className={styles.viewMoreIconContainer}>
						<SearchIcon width={50} />
					</div>
					<div className={styles.viewMoreContent}>
						<span className={styles.viewMoreTitle}>Ver más resultados</span>
						<span className={styles.viewMoreSubtitle}>Animes: {query}</span>
					</div>
				</Link>
			)}
		</section>
	)
}
