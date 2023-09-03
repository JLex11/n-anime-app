import Link from 'next/link'
import styles from './ServerAutocomplete.module.css'
import { Item } from './autocompleteTypes'

interface Props {
  item: Item
}

export function AutocompleteItem({ item }: Props) {
  return (
    <li className={styles.item}>
      <Link href={item.link} className={styles.itemContainer}>
        {typeof item.image === 'string' ? (
          <img src={item.image} alt={item.title} width={50} height={50} className={styles.itemImage} loading='lazy' decoding='async' />
        ) : (
          item.image
        )}
        <div className={styles.itemInfo}>
          <div className={styles.itemContent}>
            <h4 className={styles.itemTitle}>{item.title}</h4>
            <p className={styles.itemDescription}>{item.description.slice(0, 100)}</p>
          </div>
        </div>
        <span className={styles.itemType}>{item.type}</span>
      </Link>
    </li>
  )
}
