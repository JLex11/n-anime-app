import { getBroadcastAnimes } from '@/services/getBroadcastAnimes'
import BroadcastIcon from '../Icons/BroadcastIcon'
import { AsideList } from './AsideList'
import styles from './Home.module.css'

export const HomeAside = async () => {
  const broadcastAnimes = await getBroadcastAnimes(30)

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
