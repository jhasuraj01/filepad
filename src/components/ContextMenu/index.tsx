import { useEffect } from 'react'
import styles from './index.module.scss'

export interface ContextMenuOption {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>
  text: string
}

export interface ContextMenuProps {
  options: ContextMenuOption[]
  event: React.MouseEvent<Element, MouseEvent>
  hide: () => void
}


export function ContextMenu({ event, hide, options }: ContextMenuProps) {
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
    <div key={event.timeStamp} onContextMenu={(event) => event.preventDefault()} className={styles.contextMenu} style={style} onClick={hide}>
      {
        options.map(({icon: Icon, text}) => {
          return <button key={text} className={styles.contextMenuOptions}>
            <Icon className={styles.icon}/>
            <span className={styles.text}>{text}</span>
          </button>
        })
      }
    </div>
  )
}