import { AutocompleteItem } from '@/hooks/useAutocomplete.types'
import styles from './Autocomplete.module.css'
import { Collection } from './Collection'
import { CollectionsPanelFooter } from './CollectionsPanelFooter'

interface Props {
  className: string
  panelRef: React.RefObject<HTMLDivElement>
  panelProps: {
    onMouseDown(event: MouseEvent): void
    onMouseLeave(): void
  }
  collections: {
    items: AutocompleteItem[]
    source: {
      sourceId: string
    }
  }[]
}

export function CollectionsPanel({ className: cssClass, panelRef, panelProps, collections }: Props) {
  return (
    <div className={cssClass} ref={panelRef} {...(panelProps as any)}>
      <div className={styles.resultsContainer}>
        {collections.map(collection => (
          <Collection key={collection.source.sourceId} sourceId={collection.source.sourceId} items={collection.items} />
        ))}
      </div>
      <CollectionsPanelFooter />
    </div>
  )
}
