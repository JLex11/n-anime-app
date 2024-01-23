import { useFallbackImage } from '@/hooks/useFallbackImage'
import Image from 'next/image'

interface Props {
  title: string
  animeId: string
  images: (string | undefined | null)[]
  onClick: () => void
  className?: string
}

export function NavigationButton({ title, animeId, images, onClick, className }: Props) {
  const { currentImage, onError } = useFallbackImage(
    images.map(link => ({ link })),
    { width: 50, height: 65 }
  )

  return (
    <button
      type='button'
      className={className}
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
        quality={30}
        onError={onError}
      />
    </button>
  )
}