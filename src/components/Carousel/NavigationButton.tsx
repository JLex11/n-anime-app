import { useFallbackImage } from '@/hooks/useFallbackImage'
import Image from 'next/image'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  animeId: string
  images: (string | undefined | null)[]
  onClick: () => void
}

export function NavigationButton({ title, animeId, images, onClick, ...buttonProps }: Props) {
  const { currentImage, onError } = useFallbackImage(
    images.map(link => ({ link })),
    { width: 72, height: 88 }
  )

  return (
    <button
      {...buttonProps}
      type='button'
      className={buttonProps.className}
      data-anime-id={animeId}
      title={title}
      onClick={onClick}
    >
      <Image
        src={currentImage.link}
        alt={title}
        width={72}
        height={88}
        loading='eager'
        decoding='async'
        priority
        quality={15}
        onError={onError}
        style={{
          viewTransitionName: `anime-image-${animeId}`
        }}
      />
    </button>
  )
}
