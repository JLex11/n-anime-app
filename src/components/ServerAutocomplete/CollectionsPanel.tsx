import clsx from 'clsx'
import { ItemsCollection } from './ItemsCollection'
import { PanelFooter } from './PanelFooter'
import styles from './ServerAutocomplete.module.css'
import type { Collection, CollectionHandle } from './autocompleteTypes'

interface Props {
  query: string
  collectionHandlers: CollectionHandle[]
}

export async function CollectionsPanel({ query, collectionHandlers }: Props) {
  const resolvedPromises = await resolveItemsHandlers(query, collectionHandlers)
  const collections = filterResolvedItemsHandlers(resolvedPromises)

  const hasItems = collections.length > 0
  const panelClass = clsx(styles.panel, !hasItems && styles.panelClosed)

  return (
    <div className={panelClass}>
      <div className={styles.collectionsContainer}>
        {collections.map((collection, i) => (
          <ItemsCollection
            key={collection.id}
            title={collection.title}
            items={collection.items}
          />
        ))}
      </div>
      <PanelFooter />
    </div>
  )
}

async function resolveItemsHandlers(
  query: string,
  itemsHandlers: CollectionHandle[]
) {
  return Promise.allSettled(
    itemsHandlers.map(async ({ title, id, getItemsCallback }) => {
      const items = await getItemsCallback(query)
      return { title, id, items }
    })
  )
}

function filterResolvedItemsHandlers(
  resolvedPromises: PromiseSettledResult<Collection>[]
) {
  return resolvedPromises
    .filter(
      (rPromise): rPromise is PromiseFulfilledResult<Collection> =>
        rPromise.status === 'fulfilled'
    )
    .map(({ value }) => value)
    .filter(({ items }) => items.length > 0)
}
