interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export function FoldIcon({ width = 24, height, strokeWidth = 1.5, className: cssClass }: Props) {
  return (
    <svg
      className={cssClass}
      width={width}
      height={height || width}
      viewBox='0 0 24 24'
      strokeWidth={strokeWidth}
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M12 11v8l3 -3m-6 0l3 3'></path>
      <path d='M9 7l1 0'></path>
      <path d='M14 7l1 0'></path>
      <path d='M19 7l1 0'></path>
      <path d='M4 7l1 0'></path>
    </svg>
  )
}
