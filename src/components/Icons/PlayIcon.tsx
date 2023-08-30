interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function PlayIcon({ width = 24, height, strokeWidth = 1.5, className: cssClass }: Props) {
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
      <path
        d='M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z'
        strokeWidth={0}
        fill='currentColor'
      ></path>
    </svg>
  )
}
