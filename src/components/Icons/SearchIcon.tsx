interface Props {
	width?: number
	height?: number
	strokeWidth?: number
	className?: string
}

export default function SearchIcon({
	width = 24,
	height,
	strokeWidth = 2,
	className: cssClass,
}: Props) {
	return (
		<svg
			className={cssClass}
			width={width}
			height={height || width}
			viewBox="0 0 24 24"
			strokeWidth={strokeWidth}
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
			<path d="M21 21l-6 -6" />
		</svg>
	)
}
