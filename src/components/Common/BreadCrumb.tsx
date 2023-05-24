import styles from '@/styles/CustomElements.module.css'
import Link from 'next/link'

type Crumb = {
  name: string
  path?: string
}

interface Props {
  crumbs: Crumb[]
}

export const BreadCrumb = ({ crumbs }: Props) => {
  return (
    <div className={styles.breadcrumbContainer}>
      <ul className={styles.breadcrumbList}>
        {crumbs.map(({ name, path }, index) => (
          <li key={path ?? name} className={styles.breadcrumbItem}>
            {path ? <Link href={path}>{name}</Link> : <span>{name}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
