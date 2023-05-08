import { ReactNode } from 'react'
import style from './index.module.scss'

export interface SubNavProps {
  children: ReactNode
  title: string
  className?: string
}

export function SubNav({ children, title, className }: SubNavProps) {
  return (
    <div className={`${className} ${style.container}`}>
      <div className={style.header}>{title}</div>
      <div className={style.body}>{children}</div>
    </div>
  )
}
