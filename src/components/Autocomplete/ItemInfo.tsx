import { AutocompleteItem } from '@/hooks/useAutocomplete'
import styles from './Autocomplete.module.css'

export const ItemInfo = ({ item }: { item: AutocompleteItem }) => {
  return (
    <div className={styles.itemInfo}>
      <div className={styles.itemContent}>
        <h4 className={styles.itemTitle}>{item.title}</h4>
        <p className={styles.itemDescription}>{item.description.slice(0, 100)}</p>
      </div>
      <span className={styles.itemType}>{item.type}</span>
    </div>
  )
}
