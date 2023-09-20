import { AutocompleteItem } from './AutocompleteItem'
import { Item } from './autocompleteTypes'
import styles from './ServerAutocomplete.module.css'

interface Props {
  title: string
  items: Item[]
}

export const ItemsCollection = ({ title, items }: Props) => (
  <div className={styles.collection}>
    <header className={styles.collectionHeader}>
      <h3 className={styles.collectionTitle}>{title}</h3>
      <span className={styles.itemsCount}>{items.length} encontrados</span>
    </header>
    <ul>
      {items.map(item => (
        <AutocompleteItem key={item.id} item={item} />
      ))}
    </ul>
  </div>
)
