import { FileNode } from '../../libs/FileNode'
import { FolderNode } from '../../libs/FolderNode'
import { ReactComponent as ChevronRightIcon } from '../../icons/chevron-right.svg'
import { ReactComponent as FileIcon } from '../../icons/file.svg'
import style from './index.module.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectFolderExpansionState, toggleExpansion } from './explorerSlice'

interface FolderProps {
  folder: FolderNode
}
interface FileProps {
  file: FileNode
}
interface ExplorerProps {
  workspace: FolderNode
}
interface ExplorerItemsProps {
  items: (FolderNode | FileNode)[]
}

export function Explorer({ workspace }: ExplorerProps) {
  return <>
    <h1>{workspace.name}</h1>
    <ExplorerItems items={workspace.items}/>
  </>
}

export function ExplorerItems({ items }: ExplorerItemsProps) {
  return <>{
    items.map(item => {
      if(item instanceof FileNode)
        return <File key={item.id} file={item} />
      else
        return <Folder key={item.id} folder={item}/>
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

  // const [isExpanded, toggleExpansion] = useState(false)
  const isExpanded = useAppSelector(selectFolderExpansionState(folder.id))
  const dispatch = useAppDispatch()

  const handleFolderClick = () => {
    dispatch(toggleExpansion(folder.id))
  }

  return (
    <div className={style.folder}>
      <div className={`${style.name} ${style.entry}`} onClick={handleFolderClick}>
        <span className={isExpanded ? `${style.icon} ${style.turn90}` : `${style.icon}`}><ChevronRightIcon /></span>
        <span>{folder.name}</span>
      </div>
      <div className={style.child}>
        { isExpanded ? <ExplorerItems items={folder.items} /> : <></>}
      </div>
    </div>
  )
}