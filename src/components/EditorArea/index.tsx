import style from './index.module.scss'
import { useEffect, useRef } from 'react'

export function EditorArea() {
  const ref = useRef(null)

  useEffect(() => {
    const element: HTMLDivElement = ref.current!
    element.focus()
  }, [ref])

  return (
    <div ref={ref} className={style.container} contentEditable></div>
  )
}
