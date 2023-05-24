import { AutocompleteItem } from '@/hooks/useAutocomplete'
import styles from '@/styles/Autocomplete.module.css'
import { toCap } from '@/utils/textConverts'
import dynamic from 'next/dynamic'

const ResultsItem = dynamic(() => import('./ResultsItem').then(m => m.ResultsItem))

interface Props {
  items: AutocompleteItem[]
  sourceId: string
}

export const Collection = ({ items, sourceId }: Props) => {
  if (items.length === 0) return null

  return (
    <section className={styles.resultsCollection}>
      <header className={styles.collectionHeader}>
        <h3 className={styles.resultsCollectionTitle}>{toCap(sourceId)}</h3>
        <span className={styles.itemsCount}>{items.length} founded</span>
      </header>
      {items.map(item => (
        <ResultsItem key={item.link ?? item.title} item={item} sourceId={sourceId} />
      ))}
    </section>
  )
}
