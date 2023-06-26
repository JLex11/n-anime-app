import { AutocompleteItem, AutocompleteItemChilds } from '@/hooks/useAutocomplete.types'
import { useToggle } from '@/hooks/useToggle'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
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
  const [childItems, setChildItems] = useState<AutocompleteItemChilds>({ title: '', items: [] })
  const [expanded, toggleExpanded] = useToggle(false)
  const { activeItemId, setActiveItemId, handleLaunchAutocomplete } = useContext(AutocompleteContext)

  const isActive = useMemo(() => activeItemId === (item.__autocomplete_id as number), [activeItemId, item])

  const handleHover = () => {
    if (activeItemId === (item.__autocomplete_id as number)) return
    setActiveItemId(item.__autocomplete_id as number)
  }

  useEffect(() => {
    if (!expanded) return
    if (item.childsCallback) item.childsCallback().then(setChildItems)
  }, [expanded, item])

  const resultsItemClassName = clsx(styles.resultsItem, isActive && styles.isActive, expanded && styles.expanded)

  return (
    <article onMouseMove={handleHover} id={`autocompleteItem-${item.link}`}>
      <div className={resultsItemClassName}>
        <Link href={item.link} className={styles.itemContainer} onClick={() => handleLaunchAutocomplete(false)}>
          <Image src={item.image} alt={item.title} width={50} height={50} quality={10} className={styles.itemImage} loading={'lazy'} />
          {/* <PictureIcon width={50} /> */}
          <ItemInfo item={item} />
        </Link>
        {item.childsCallback && (
          <button className={styles.itemIcon} type='button' onClick={toggleExpanded}>
            <FoldIcon />
          </button>
        )}
      </div>
      {expanded && <ItemChilds childItems={childItems} handleLaunchAutocomplete={handleLaunchAutocomplete} />}
    </article>
  )
}
