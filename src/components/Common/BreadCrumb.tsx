import styles from '@/styles/CustomElements.module.css'
import clsx from 'clsx'
import Link from 'next/link'

type Crumb = {
  name: string
  path?: string
}

interface Props {
  crumbs: Crumb[]
  className?: string
}

export const BreadCrumb = ({ crumbs, className: externalClass }: Props) => {
  const breadcrumbContainerClass = clsx(styles.breadcrumbContainer, externalClass)

  return (
    <div className={breadcrumbContainerClass}>
      <ul className={styles.breadcrumbList}>
        {crumbs.map(({ name, path }) => (
          <li key={path ?? name} className={styles.breadcrumbItem}>
            {path ? <Link href={path}>{name}</Link> : <span>{name}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
