interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function RefreshIcon({
  width = 24,
  height,
  strokeWidth = 1.5,
  className: cssClass
}: Props) {
  return (
    <svg
      className={cssClass}
      width={width}
      height={height || width}
      viewBox='0 0 24 24'
      strokeWidth={strokeWidth}
      stroke='currentColor'
      fill='none'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4'></path>
      <path d='M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4'></path>
    </svg>
  )
}
