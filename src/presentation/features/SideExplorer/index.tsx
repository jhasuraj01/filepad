import { ReactComponent as ChevronRightIcon } from '../../icons/chevron-right.svg'
import { ReactComponent as FileIcon } from '../../icons/file.svg'
import style from './index.module.scss'
import { useAppDispatch, useAppSelector } from '../../../Infrastructure/state/app/hooks'
import { selectFolderExpansionState, selectWorkspace, toggleExpansion } from '../../../Infrastructure/state/sideExplorerSlice'
import { Directory } from '../../../domain/entities/Directory'
import { fileStorageInteractor } from '../../../adapters/FileStorageAdapter'
import { useEffect, useState } from 'react'
import { NavLinkPersist } from '../../supports/Persistence'

interface FolderProps {
  folder: Directory.FolderMetadata
}

interface FileProps {
  file: Directory.FileMetadata
}

interface ExplorerItemsProps {
  folder: Directory.FolderMetadata
}

export function SideExplorer() {

  const workspace = useAppSelector(selectWorkspace)

  return <>
    <div className={style.workspaceName}>{workspace.name}</div>
    <FolderItems folder={workspace}/>
  </>
}

export function FolderItems({ folder }: ExplorerItemsProps) {

  const [items, setItems] = useState<(Directory.FolderMetadata | Directory.FileMetadata)[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      const folderContent = await fileStorageInteractor.fetchFolderContent(folder)
      setLoading(false)
      setItems(folderContent)
    })()

  }, [folder.id])

  if(loading) {
    return (
      <div>Loading...</div>
    )
  }

  return <>{
    items.map(item => {
      if(item.type === Directory.NodeType.file)
        return <File key={item.id} file={item} />
      else
        return <Folder key={item.id} folder={item}/>
    })
  }</>
}

export function File({ file }: FileProps) {
  return (
    <NavLinkPersist
      className={`${style.file} ${style.entry}`}
      to={`/editor/${file.id}`}>
      <span className={style.icon}><FileIcon /></span>
      <span>{file.name}</span>
    </NavLinkPersist>
  )
}

export function Folder({ folder }: FolderProps) {

  // const [isExpanded, toggleExpansion] = useState(false)
  const isExpanded = useAppSelector(selectFolderExpansionState(folder))
  const dispatch = useAppDispatch()


  const handleFolderClick = () => {
    dispatch(toggleExpansion(folder))
  }

  return (
    <div className={style.folder}>
      <div className={`${style.name} ${style.entry}`} onClick={handleFolderClick}>
        <span className={isExpanded ? `${style.icon} ${style.turn90}` : `${style.icon}`}><ChevronRightIcon /></span>
        <span>{folder.name}</span>
      </div>
      <div className={style.child}>
        { isExpanded ? <FolderItems folder={folder} /> : <></>}
      </div>
    </div>
  )
}