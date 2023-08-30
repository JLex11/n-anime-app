import { AutocompleteItemChilds } from '@/hooks/useAutocomplete.types'
import Link from 'next/link'
import PictureIcon from '../Icons/PictureIcon'
import styles from './Autocomplete.module.css'

interface Props {
  childItems: AutocompleteItemChilds
  handleLaunchAutocomplete: (value: boolean) => void
}

export function ItemChilds({ childItems, handleLaunchAutocomplete }: Props) {
  return (
    <div className={styles.childsItemsContainer}>
      <h5 className={styles.childsItemsTitle}>{childItems.title}</h5>
      {childItems.items.length > 0 && (
        <ul className={styles.childsItems}>
          {childItems.items.map(childItem => (
            <li key={childItem.link} className={styles.childItem}>
              <Link
                href={childItem.link}
                className={styles.childItemLink}
                onClick={() => handleLaunchAutocomplete(false)}
              >
                {/* <img {...childItem.image} width={30} height={25} /> */}
                <PictureIcon width={30} height={25} />
                <span className={styles.childItemTitle}>{childItem.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
