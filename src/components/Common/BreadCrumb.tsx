import Link from 'next/link'
import styles from './CustomElements.module.css'

type Crumb = {
  name: string
  path?: string
}

interface Props {
  crumbs: Crumb[]
}

export const BreadCrumb = ({ crumbs }: Props) => {
  return (
    <ul className={styles.breadcrumbList}>
      {crumbs.map(({ name, path }, index) => (
        <>
          <li key={path ?? name} className={styles.breadcrumbItem}>
            {path ? <Link href={path}>{name}</Link> : <span>{name}</span>}
          </li>
          {index < crumbs.length - 1 && <span className={styles.breadcrumbSeparator}>/</span>}
        </>
      ))}
    </ul>
  )
}
