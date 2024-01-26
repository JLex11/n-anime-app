interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function LatestIcon({
  width = 24,
  height,
  strokeWidth = 1.5,
  className: cssClass
}: Props) {
  return (
    <svg
      className={cssClass}
      width={width}
      height={height ?? width}
      viewBox='0 0 24 24'
      strokeWidth={strokeWidth}
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4'></path>
      <path d='M4 13a8.094 8.094 0 0 0 3 5.24'></path>
      <path d='M11 15h2a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-1a1 1 0 0 0 -1 1v1a1 1 0 0 0 1 1h2'></path>
      <path d='M17 15v2a1 1 0 0 0 1 1h1'></path>
      <path d='M20 15v6'></path>
    </svg>
  )
}
