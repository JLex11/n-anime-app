import type { AutocompleteOutputItem } from '@/hooks/useAutocomplete.types'
import { useChildItems } from '@/hooks/useChildItems'
import { useToggle } from '@/hooks/useToggle'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { memo, useContext, useEffect, useMemo, useCallback } from 'react'
import { FoldIcon } from '../Icons/FoldIcon'
import styles from './Autocomplete.module.css'
import { AutocompleteContext } from './Contexts'
import { ItemChilds } from './ItemChilds'
import { ItemInfo } from './ItemInfo'

interface Props {
	item: AutocompleteOutputItem
}

export const CollectionItem = memo(function CollectionItem({ item }: Props) {
	const [expanded, toggleExpanded] = useToggle(false)
	const { activeItemId, setActiveItemId, handleLaunchAutocomplete } = useContext(AutocompleteContext)
	const router = useRouter()
	
	const itemId = Number(item.__autocomplete_id)
	const isActive = useMemo(() => activeItemId === itemId, [activeItemId, itemId])

	useEffect(() => {
		if (!isActive) return
		
		// Solo prefetch cuando el item está activo
		const timeoutId = setTimeout(() => router.prefetch(item.link), 200)
		return () => clearTimeout(timeoutId)
	}, [isActive, item.link, router])

	const handleHover = useCallback(() => {
		if (activeItemId !== itemId) setActiveItemId(itemId)
	}, [activeItemId, itemId, setActiveItemId])

	const childItems = useChildItems(item, expanded)

	const collectionItemClass = clsx(
		styles.collectionItem, 
		isActive && styles.isActive, 
		expanded && styles.expanded
	)

	const handleItemClick = useCallback(() => handleLaunchAutocomplete(false), [handleLaunchAutocomplete])
	
	// Renderiza imagen o componente React según el tipo de item.image
	const itemImageElement = useMemo(() => {
		if (typeof item.image === 'string') {
			return (
				<img
					src={item.image}
					alt={item.title}
					width={50}
					height={62.5}
					className={styles.itemImage}
					decoding='async'
					loading='lazy'
				/>
			)
		}
		return item.image
	}, [item.image, item.title])

	return (
		<article 
			onMouseEnter={handleHover} 
			ref={item.getItemRef(itemId)} 
			title={item.description}
		>
			<div className={collectionItemClass}>
				<Link
					href={item.link}
					className={`${styles.itemContainer} ${isActive ? 'prerender' : 'prerender-hover'}`}
					onClick={handleItemClick}
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
						aria-label={expanded ? 'Contraer' : 'Expandir'}
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
