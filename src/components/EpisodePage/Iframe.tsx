import styles from '@/styles/Episode.module.css'

interface Props {
  src: string
  title?: string
  id: string
}

export const Iframe = ({ src, title = 'Episode video', id }: Props) => {
  return (
    <iframe name={id} className={styles.iframe} src={src} title={title} width={720} allowFullScreen loading={'eager'} />
  )
}
