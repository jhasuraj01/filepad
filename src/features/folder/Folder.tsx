import { FolderInterface } from '../../interfaces/Folder'
import style from './Folder.module.scss'

interface FolderProps {
  folder: FolderInterface
}
export function Folder({ folder }: FolderProps) {
  return (
    <div className={style.container}>
      <div className={style.header}>{folder.name}</div>
      <div className={style.body}>
        {
          folder.child.map(child => {
            if(child.type == 'file') {
              return <div key={child.name}>{child.name}</div>
            }
            else {
              return <Folder key={child.name} folder={child}/>
            }
          })
        }
      </div>
    </div>
  )
}