import { AutocompleteAnimeItem } from '@/hooks/useAutocomplete'
import styles from '@/styles/Autocomplete.module.css'
import clsx from 'clsx'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { FoldIcon } from '../Icons/FoldIcon'
import PictureIcon from '../Icons/PictureIcon'
import { AutocompleteContext } from './Contexts'

interface Props {
  item: AutocompleteAnimeItem
}

export const ResultsItem = ({ item }: Props) => {
  const [expanded, setExpanded] = useState(false)

  const { activeItemId, setActiveItemId } = useContext(AutocompleteContext)

  const isActive = activeItemId === (item.__autocomplete_id as number)

  const handleHover = () => {
    setActiveItemId(item.__autocomplete_id as number)
  }

  const resultsItemClassName = clsx(styles.resultsItem, isActive && styles.isActive, expanded && styles.expanded)

  return (
    <article onMouseMove={handleHover} id={`autocompleteItem-${item.link}`}>
      <div className={resultsItemClassName}>
        <Link href={item.link} className={styles.itemContainer}>
          {/* <Image src={item.image} alt={item.title} width={50} height={50} quality={10} className={styles.itemImage} loading={'lazy'} /> */}
          <PictureIcon />
          <div className={styles.itemInfo}>
            <div className={styles.itemContent}>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <p className={styles.itemDescription}>{item.description.slice(0, 100)}</p>
            </div>
            <span className={styles.itemType}>{item.type}</span>
          </div>
        </Link>
        <button className={styles.itemIcon} type='button' onClick={() => setExpanded(!expanded)}>
          <FoldIcon />
        </button>
      </div>
      {expanded && (
        <div className={styles.itemDetails}>
          <div className={styles.itemDetailsContent}>
            <p className={styles.itemDetailsDescription}>{item.description}</p>
            <div className={styles.itemDetailsInfo}>
              <span className={styles.itemDetailsType}>{item.type}</span>
              <span className={styles.itemDetailsStatus}>{item.rank}</span>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
