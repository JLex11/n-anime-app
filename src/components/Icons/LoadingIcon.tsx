interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function LoadingIcon({
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
      <path d='M12 3a9 9 0 1 0 9 9'></path>
    </svg>
  )
}
