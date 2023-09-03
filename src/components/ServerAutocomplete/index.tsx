import { CollectionsPanel } from './CollectionsPanel'
import { AutocompleteInput } from './Input'
import styles from './ServerAutocomplete.module.css'
import { CollectionHandle } from './autocompleteTypes'

interface Props {
  query?: string
  getItemsHandlers: CollectionHandle[]
}

export async function ServerAutocomplete({ query, getItemsHandlers }: Props) {
  if (query === undefined) return null

  return (
    <div className={styles.autocompleteContainer}>
      <form className={styles.form}>
        <AutocompleteInput query={query} />
        <CollectionsPanel collectionHandlers={getItemsHandlers} query={query} />
      </form>
    </div>
  )
}
