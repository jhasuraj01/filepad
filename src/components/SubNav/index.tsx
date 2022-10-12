import { ReactNode } from 'react'
import style from './index.module.scss'

interface SubNavProps {
  children: ReactNode
}

export function SubNav({ children }: SubNavProps) {
  return (
    <div className={style.container}>
      {children}
    </div>
  )
}
