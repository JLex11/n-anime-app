interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function LinkIcon({
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
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6'></path>
      <path d='M11 13l9 -9'></path>
      <path d='M15 4h5v5'></path>
    </svg>
  )
}
