interface Props {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function AdsIcon({ width = 24, height, strokeWidth = 1.5, className: cssClass }: Props) {
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
      <path d='M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0'></path>
      <path d='M7 15v-4.5a1.5 1.5 0 0 1 3 0v4.5'></path>
      <path d='M7 13h3'></path>
      <path d='M14 9v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z'></path>
    </svg>
  )
}
