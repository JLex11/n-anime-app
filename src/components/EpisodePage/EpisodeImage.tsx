interface Props {
  image: {
    link: string
    width?: number
    height?: number
    position?: string
  }
  episode: number
  title: string
  className?: string
}

export const EpisodeImage = ({ image, episode, title, className }: Props) => {
  return (
    <img
      src={image.link}
      alt={`Episodio ${episode} de ${title}`}
      width={image.width}
      height={image.height}
      decoding='async'
      loading='lazy'
      className={className}
    />
  )
}
