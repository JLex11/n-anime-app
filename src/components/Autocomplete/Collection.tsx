import type { AutocompleteOutputItem } from '@/hooks/useAutocomplete.types'
import { toCap } from '@/utils/textConverts'
import styles from './Autocomplete.module.css'
import { CollectionItem } from './CollectionItem'

interface Props {
	items: AutocompleteOutputItem[]
	sourceId: string
}

export function Collection({ items, sourceId }: Props) {
	if (items.length === 0) return null

	return (
		<section className={styles.collection}>
			<header className={styles.collectionHeader}>
				<h3 className={styles.collectionTitle}>{toCap(sourceId)}</h3>
				<span className={styles.itemsCount}>{items.length} encontrados</span>
			</header>
			{items.map(item => (
				<CollectionItem key={item.link ?? item.title} item={item} />
			))}
		</section>
	)
}
