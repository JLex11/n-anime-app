import { AutocompleteItemChilds } from '@/hooks/useAutocomplete.types'
import Link from 'next/link'
import PictureIcon from '../Icons/PictureIcon'
import styles from './Autocomplete.module.css'

interface Props {
  childItems: AutocompleteItemChilds
  handleLaunchAutocomplete: (value: boolean) => void
}

export function ItemChilds({ childItems, handleLaunchAutocomplete }: Props) {
  const { title, items } = childItems

  const handleClick = () => handleLaunchAutocomplete(false)

  return (
    <div className={styles.childsItemsContainer}>
      <h5 className={styles.childsItemsTitle}>{title}</h5>
      {items.length > 0 && (
        <ul className={styles.childsItems}>
          {items.map(({ link, title }) => (
            <li key={link} className={styles.childItem}>
              <Link
                href={link}
                className={styles.childItemLink}
                onClick={handleClick}
              >
                <PictureIcon width={30} height={25} />
                <span className={styles.childItemTitle}>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
