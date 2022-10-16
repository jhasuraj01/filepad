import { FileInterface } from '../../interfaces/File'
import { FolderInterface } from '../../interfaces/Folder'
import { ReactComponent as ChevronRightIcon } from '../../icons/chevron-right.svg'
import { ReactComponent as FileIcon } from '../../icons/file.svg'
import style from './index.module.scss'
import { useState } from 'react'

interface FolderProps {
  folder: FolderInterface
}
interface FileProps {
  file: FileInterface
}
interface ExplorerProps {
  filesAndFolders: (FileInterface | FolderInterface)[]
}

export function Explorer({ filesAndFolders }: ExplorerProps) {
  return <>{
    filesAndFolders.map(f => {
      if(f.type == 'file')
        return <File key={f.id} file={f} />
      else
        return <Folder key={f.id} folder={f}/>
    })
  }</>
}

export function File({ file }: FileProps) {
  return (
    <div className={`${style.file} ${style.entry}`}>
      <span className={style.icon}><FileIcon /></span>
      <span>{file.name}</span>
    </div>
  )
}

export function Folder({ folder }: FolderProps) {

  const [isExpanded, toggleExpansion] = useState(false)

  const handleFolderClick = () => {
    toggleExpansion(!isExpanded)
  }

  return (
    <div className={style.folder}>
      <div className={`${style.name} ${style.entry}`} onClick={handleFolderClick}>
        <span className={isExpanded ? `${style.icon} ${style.turn90}` : `${style.icon}`}><ChevronRightIcon /></span>
        <span>{folder.name}</span>
      </div>
      <div className={style.child}>
        { isExpanded ? <Explorer filesAndFolders={folder.child} /> : <></>}
      </div>
    </div>
  )
}