import type { AutocompleteOutputItem } from '@/hooks/useAutocomplete.types'
import { useToggle } from '@/hooks/useToggle'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useMemo, memo } from 'react'
import { FoldIcon } from '../Icons/FoldIcon'
import styles from './Autocomplete.module.css'
import { AutocompleteContext } from './Contexts'
import { ItemChilds } from './ItemChilds'
import { ItemInfo } from './ItemInfo'
import { useChildItems } from '@/hooks/useChildItems'

interface Props {
	item: AutocompleteOutputItem
}

export const CollectionItem = memo(function CollectionItem({ item }: Props) {
	const [expanded, toggleExpanded] = useToggle(false)
	const { activeItemId, setActiveItemId, handleLaunchAutocomplete } = useContext(AutocompleteContext)

	const isActive = useMemo(
		() => activeItemId === Number(item.__autocomplete_id),
		[activeItemId, item.__autocomplete_id]
	)

	const router = useRouter()

	useEffect(() => {
		if (!isActive) return
		const timeoutId = setTimeout(() => router.prefetch(item.link), 100)
		return () => clearInterval(timeoutId)
	}, [isActive, item, router])

	const handleHover = () => {
		if (activeItemId !== Number(item.__autocomplete_id)) setActiveItemId(Number(item.__autocomplete_id))
	}

	const childItems = useChildItems(item, expanded)

	const collectionItemClass = clsx(styles.collectionItem, isActive && styles.isActive, expanded && styles.expanded)

	const itemImageElement =
		typeof item.image === 'string' ? (
			<img
				src={item.image}
				alt={item.title}
				width={40}
				height={50}
				className={styles.itemImage}
				decoding='async'
				loading='lazy'
			/>
		) : (
			item.image
		)

	return (
		<article onMouseEnter={handleHover} ref={item.getItemRef(Number(item.__autocomplete_id))} title={item.description}>
			<div className={collectionItemClass}>
				<Link
					href={item.link}
					className={`${styles.itemContainer} ${isActive ? 'prerender' : 'prerender-hover'}`}
					onClick={() => handleLaunchAutocomplete(false)}
				>
					{itemImageElement}
					<ItemInfo item={item} />
				</Link>

				{item.childsCallback && (
					<button
						className={styles.itemIcon}
						type='button'
						onClick={toggleExpanded}
						aria-expanded={expanded}
						aria-label={expanded ? 'Collapse' : 'Expand'}
					>
						<FoldIcon />
					</button>
				)}
			</div>

			{expanded && childItems && (
				<ItemChilds childItems={childItems} handleLaunchAutocomplete={handleLaunchAutocomplete} />
			)}
		</article>
	)
})
