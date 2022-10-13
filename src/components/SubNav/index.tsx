import { ReactNode } from 'react'
import style from './index.module.scss'

interface SubNavProps {
  children: ReactNode
  title: string
}

export function SubNav({ children, title }: SubNavProps) {
  return (
    <div className={style.container}>
      <div className={style.header}>{title}</div>
      <div className={style.body}>{children}</div>
    </div>
  )
}
