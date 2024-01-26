import { BroadcastList } from '../BroadcastList'
import BroadcastIcon from '../Icons/BroadcastIcon'
import styles from './Home.module.css'

export const HomeAside = () => {
  return (
    <aside className={styles.aside} id={'home-aside'}>
      <h2 className={styles.asideTitle}>
        <BroadcastIcon /> En emisión
      </h2>
      <div className={styles.asideInner}>
        <BroadcastList />
      </div>
    </aside>
  )
}
