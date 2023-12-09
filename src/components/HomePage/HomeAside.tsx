import BroadcastIcon from '../Icons/BroadcastIcon'
import { AsideList } from './AsideList'
import styles from './Home.module.css'

export const HomeAside = () => {
  return (
    <aside className={styles.aside} id={'home-aside'}>
      <h2 className={styles.title}>
        <BroadcastIcon /> En emisión
      </h2>
      <div className={styles.asideInner}>
        <AsideList />
      </div>
    </aside>
  )
}
