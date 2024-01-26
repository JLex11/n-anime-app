interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function UserIcon({
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
      <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0'></path>
      <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'></path>
    </svg>
  )
}
