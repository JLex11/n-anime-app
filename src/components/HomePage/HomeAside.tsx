import { getBroadcastAnimes } from '@/services/getBroadcastAnimes'
import styles from '@/styles/Home.module.css'
import BroadcastIcon from '../Icons/BroadcastIcon'
import { AsideList } from './AsideList'

export const HomeAside = async () => {
  const broadcastAnimes = await getBroadcastAnimes(50)

  return (
    <aside className={styles.aside} id={'home-aside'}>
      <h2 className={styles.title}>
        <BroadcastIcon /> Broadcast
      </h2>
      <div className={styles.asideInner}>
        <AsideList animes={broadcastAnimes} />
      </div>
    </aside>
  )
}
