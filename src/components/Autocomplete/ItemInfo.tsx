import type { AutocompleteItem } from '@/hooks/useAutocomplete.types'
import { BadgeList } from '../BadgeList'
import styles from './Autocomplete.module.css'

export function ItemInfo({ item }: { item: AutocompleteItem }) {
	const badgeItems = item.genres?.map(genre => ({ name: genre })) || []

	return (
		<div className={styles.itemInfo}>
			<div className={styles.itemContent}>
				<h4 className={styles.itemTitle}>{item.title}</h4>
				<p className={styles.itemDescription}>{item.description.slice(0, 100)}</p>
				<footer className={styles.itemFooter}>
					<BadgeList items={badgeItems} badgetStyles={{ fontSize: '11pt', padding: '0.1rem 0.35rem' }} wrap={false} />
				</footer>
			</div>
			<span className={styles.itemType}>{item.type}</span>
		</div>
	)
}
