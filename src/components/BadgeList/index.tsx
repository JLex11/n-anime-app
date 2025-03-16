import Link from 'next/link'
import { Badge } from '../Common/Badge'
import styles from './BadgeList.module.css'

interface Props {
	items: {
		name: string
		url?: string
	}[]
	width?: string
	columnGap?: string
	rowGap?: string
	wrap?: boolean
	badgetStyles?: React.CSSProperties
}

interface CSSProps extends React.CSSProperties {
	'--badge-width': string
	'--badge-column-gap': string
	'--badge-row-gap': string
	'--badge-wrap': string
}

export function BadgeList({ items, width, columnGap, rowGap, wrap = true, badgetStyles }: Props) {
	const cssProps: CSSProps = {
		'--badge-width': width || 'auto',
		'--badge-column-gap': columnGap || '0.5rem',
		'--badge-row-gap': rowGap || '1rem',
		'--badge-wrap': wrap ? 'wrap' : 'nowrap',
	}

	return (
		<ul className={styles.badgeList} style={cssProps}>
			{items.map(item => (
				<li key={item.name}>
					<Badge customStyle={badgetStyles}>{item.url ? <Link href={item.url}>{item.name}</Link> : item.name}</Badge>
				</li>
			))}
		</ul>
	)
}
