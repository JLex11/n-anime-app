interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function SortIcon({ width = 24, height, strokeWidth = 1.5, className: cssClass }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
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
      <path d='M3 9l4 -4l4 4m-4 -4v14'></path>
      <path d='M21 15l-4 4l-4 -4m4 4v-14'></path>
    </svg>
  )
}
