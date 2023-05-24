import { AutocompleteItem, AutocompleteItemChilds } from '@/hooks/useAutocomplete'
import { useToggle } from '@/hooks/useToggle'
import styles from '@/styles/Autocomplete.module.css'
import clsx from 'clsx'
import Link from 'next/link'
import { useContext, useEffect, useMemo, useState } from 'react'
import { FoldIcon } from '../Icons/FoldIcon'
import PictureIcon from '../Icons/PictureIcon'
import { AutocompleteContext } from './Contexts'

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
          {/* <Image src={item.image} alt={item.title} width={50} height={50} quality={10} className={styles.itemImage} loading={'lazy'} /> */}
          <PictureIcon width={50} />
          <div className={styles.itemInfo}>
            <div className={styles.itemContent}>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <p className={styles.itemDescription}>{item.description.slice(0, 100)}</p>
            </div>
            <span className={styles.itemType}>{item.type}</span>
          </div>
        </Link>
        <button className={styles.itemIcon} type='button' onClick={toggleExpanded}>
          <FoldIcon />
        </button>
      </div>
      {expanded && (
        <div className={styles.childsItemsContainer}>
          <h5 className={styles.childsItemsTitle}>{childItems.title}</h5>
          <ul className={styles.childsItems}>
            {childItems.items.map(childItem => (
              <li key={childItem.link} className={styles.childItem}>
                <Link href={childItem.link} className={styles.childItemLink} onClick={() => handleLaunchAutocomplete(false)}>
                  {/* <img {...childItem.image} width={30} height={25} /> */}
                  <PictureIcon width={30} height={25} />
                  <span className={styles.childItemTitle}>{childItem.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
