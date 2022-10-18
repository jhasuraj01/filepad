import { ReactNode, useEffect } from 'react'
import styles from './index.module.scss'

export interface ContextMenuProps {
  children?: ReactNode
  event: React.MouseEvent<Element, MouseEvent>
  hide: () => void
  className?: string
}

export function ContextMenu({ children, event, hide, className }: ContextMenuProps) {
  event.stopPropagation()
  event.preventDefault()

  const style: React.CSSProperties = {
    top: event.pageY,
    left: event.pageX
  }

  useEffect(() => {
    window.addEventListener('click', hide)
    window.addEventListener('contextmenu', hide)
    return () => {
      window.removeEventListener('click', hide)
      window.removeEventListener('contextmenu', hide)
    }
  }, [])

  return (
    <div key={event.timeStamp} onContextMenu={(event) => event.preventDefault()} className={`${className} ${styles.contextMenu}`} style={style} onClick={hide}>
      {children}
    </div>
  )
}