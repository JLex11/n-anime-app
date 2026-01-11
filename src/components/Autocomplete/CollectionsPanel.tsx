import type { AutocompleteOutputItem } from '@/hooks/useAutocomplete.types'
import { memo } from 'react'
import styles from './Autocomplete.module.css'
import { Collection } from './Collection'
import { PanelFooter } from './PanelFooter'

interface Props {
	className: string
	panelRef: React.RefObject<HTMLDivElement>
	panelProps: {
		onMouseDown(event: MouseEvent): void
		onMouseLeave(): void
	}
	collections: {
		items: AutocompleteOutputItem[]
		source: {
			sourceId: string
		}
	}[]
	query?: string
}

export const CollectionsPanel = memo(function CollectionsPanel({
	className: cssClass,
	panelRef,
	panelProps,
	collections,
	query
}: Props) {
	// Calculamos si hay resultados totales para mejorar la accesibilidad
	const totalResults = collections.reduce((sum, collection) => sum + collection.items.length, 0)

	return (
		<div
			className={cssClass}
			ref={panelRef}
			{...(panelProps as any)}
			role="region"
			aria-label={`Resultados de búsqueda: ${totalResults} items encontrados`}
		>
			<div className={styles.collectionsContainer}>
				{collections.map(collection => (
					<Collection
						key={collection.source.sourceId}
						sourceId={collection.source.sourceId}
						items={collection.items}
						query={query}
					/>
				))}
			</div>
			<PanelFooter />
		</div>
	)
})
