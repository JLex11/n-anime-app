import { AutocompleteItem, AutocompleteItemChilds } from '@/hooks/useAutocomplete.types'
import { useToggle } from '@/hooks/useToggle'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useMemo, useState } from 'react'
import { FoldIcon } from '../Icons/FoldIcon'
import styles from './Autocomplete.module.css'
import { AutocompleteContext } from './Contexts'
import { ItemChilds } from './ItemChilds'
import { ItemInfo } from './ItemInfo'

interface Props {
  item: AutocompleteItem
}

export const ResultsItem = ({ item }: Props) => {
  const [childItems, setChildItems] = useState<AutocompleteItemChilds | null>(null)
  const [expanded, toggleExpanded] = useToggle(false)
  const { activeItemId, setActiveItemId, handleLaunchAutocomplete } = useContext(AutocompleteContext)

  const router = useRouter()

  const isActive = useMemo(() => activeItemId === Number(item.__autocomplete_id), [activeItemId, item])

  const handleHover = () => {
    if (activeItemId === Number(item.__autocomplete_id)) return
    setActiveItemId(Number(item.__autocomplete_id))
  }

  useEffect(() => {
    if (!isActive) return
    const timeoutId = setTimeout(() => router.prefetch(item.link), 200)
    return () => clearInterval(timeoutId)
  }, [isActive, item, router])

  useEffect(() => {
    if (!expanded || childItems) return
    if (item.childsCallback) item.childsCallback().then(setChildItems)
  }, [expanded, item])

  const resultsItemClassName = clsx(styles.resultsItem, isActive && styles.isActive, expanded && styles.expanded)

  return (
    <article onMouseMove={handleHover} ref={item.getItemRef(Number(item.__autocomplete_id))}>
      <div className={resultsItemClassName}>
        <Link href={item.link} className={styles.itemContainer} onClick={() => handleLaunchAutocomplete(false)}>
          <img
            src={item.image}
            alt={item.title}
            width={50}
            height={50}
            className={styles.itemImage}
            loading={'lazy'}
            decoding='async'
          />
          <ItemInfo item={item} />
        </Link>
        {item.childsCallback && (
          <button className={styles.itemIcon} type='button' onClick={toggleExpanded}>
            <FoldIcon />
          </button>
        )}
      </div>
      {expanded && childItems && (
        <ItemChilds childItems={childItems} handleLaunchAutocomplete={handleLaunchAutocomplete} />
      )}
    </article>
  )
}
