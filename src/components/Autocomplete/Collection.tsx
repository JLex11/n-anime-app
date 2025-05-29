import type { AutocompleteOutputItem } from '@/hooks/useAutocomplete.types'
import { toCap } from '@/utils/textConverts'
import { memo, useEffect, useState } from 'react'
import styles from './Autocomplete.module.css'
import { CollectionItem } from './CollectionItem'

interface Props {
	items: AutocompleteOutputItem[]
	sourceId: string
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

export function Collection({ items, sourceId }: Props) {
	if (items.length === 0) return null

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
		</section>
	)
}
