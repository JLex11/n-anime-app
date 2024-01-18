interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function BroadcastIcon({
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
      <path d='M18.364 19.364a9 9 0 1 0 -12.728 0'></path>
      <path d='M15.536 16.536a5 5 0 1 0 -7.072 0'></path>
      <path d='M12 13m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0'></path>
    </svg>
  )
}
