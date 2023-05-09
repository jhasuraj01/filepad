import { useEffect } from 'react'
import styles from './index.module.scss'

export interface ContextMenuOption {
  icon: React.FunctionComponent<{ className?: string }>
  text: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type ContextMenuOptions = (ContextMenuOption | null)[]

export interface ContextMenuProps {
  options: ContextMenuOptions
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
        options.map((option, index) => {
          return option ? <button key={option.text} className={styles.contextMenuOptions} onClick={option.onClick}>
            <option.icon className={styles.icon}/>
            <span className={styles.text}>{option.text}</span>
          </button> : <hr key={`${options[index - 1]}-line`} />
        })
      }
    </div>
  )
}