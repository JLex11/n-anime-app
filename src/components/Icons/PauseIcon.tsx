interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function PauseIcon({ width = 24, height, strokeWidth = 1.5, className: cssClass }: Props) {
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
      <path
        d='M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z'
        strokeWidth={0}
        fill='currentColor'
      ></path>
      <path
        d='M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z'
        strokeWidth={0}
        fill='currentColor'
      ></path>
    </svg>
  )
}
