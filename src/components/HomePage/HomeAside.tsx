import { getBroadcastAnimes } from '@/services/getBroadcastAnimes'
import styles from '@/styles/Home.module.css'
import BroadcastIcon from '../Icons/BroadcastIcon'
import { AsideList } from './AsideList'

export const HomeAside = async () => {
  const broadcastAnimes = await getBroadcastAnimes(100)

  return (
    <aside className={styles.aside} id={'home-aside'}>
      <h2 className={styles.title}>
        <BroadcastIcon /> En emisión
      </h2>
      <div className={styles.asideInner}>
        <AsideList animes={broadcastAnimes} />
      </div>
    </aside>
  )
}
