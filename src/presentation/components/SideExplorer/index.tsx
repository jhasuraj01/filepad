import { ReactComponent as ChevronRightIcon } from '../../icons/chevron-right.svg'
import { ReactComponent as FileIcon } from '../../icons/file.svg'
import style from './index.module.scss'
import { useAppDispatch, useAppSelector } from '../../../infrastructure/state/app/hooks'
import { selectFolderExpansionState, selectWorkspace, toggleExpansion } from '../../../infrastructure/state/sideExplorerSlice'
import { Directory } from '../../../domain/entities/Directory'
// import { fileStorageInteractor } from '../../../adapters/FileStorageAdapter'
import { useEffect, useState } from 'react'
import { NavLinkPersist } from '../../supports/Persistence'
import { useParams } from 'react-router-dom'
import { useFolderAdapter } from '../../../adapters/DirectoryAdapter'
import { FolderStatus } from '../../../domain/repositories/DirectoryState'
import { CloudDownloadOutlined, FileAddOutlined, FilePdfOutlined, FolderAddOutlined } from '@ant-design/icons'

interface FolderProps {
  folder: Directory.FolderMetadata
  openFile: (file: Directory.FileMetadata) => void
}

interface FileProps {
  file: Directory.FileMetadata
  openFile: (file: Directory.FileMetadata) => void
}

interface ExplorerItemsProps {
  folder: Directory.FolderMetadata
  openFile: (file: Directory.FileMetadata) => void
}

interface SideExplorerProps {
  workspace: Directory.FolderMetadata
  openFile: (file: Directory.FileMetadata) => void
}

export function SideExplorer({ workspace, openFile }: SideExplorerProps) {
  return <>
    <div className={style.workspaceName}>{workspace.name}</div>
    <FolderItems folder={workspace} openFile={openFile} />
  </>
}

export function FolderItems({ folder, openFile }: ExplorerItemsProps) {

  const { fetchFolderContent, folderContent, folderStatus } = useFolderAdapter(folder)

  useEffect(fetchFolderContent, [])

  if (folderStatus === FolderStatus.ContentLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return <>{
    folderContent.map(item => {
      if (item.type === Directory.NodeType.file)
        return <File key={item.id} file={item} openFile={openFile} />
      else
        return <Folder key={item.id} folder={item} openFile={openFile} />
    })
  }</>
}

export function File({ file, openFile }: FileProps) {
  return (
    <div className={style.file}>
      <div
        className={`${style.name} ${style.entry}`}
        onClick={() => openFile(file)}
      >
        <div className={style.left}>
          <span className={style.icon}><FileIcon /></span>
          <span>{file.name}</span>
        </div>
        <div className={style.right}>
          <FilePdfOutlined title={`Download ${file.name} as PDF`} />
          <CloudDownloadOutlined title={`Download ${file.name}`} />
        </div>
      </div>
    </div>
  )
}

export function Folder({ folder, openFile }: FolderProps) {

  // const [isExpanded, toggleExpansion] = useState(false)
  const isExpanded = useAppSelector(selectFolderExpansionState(folder))
  const dispatch = useAppDispatch()


  const handleFolderClick = () => {
    dispatch(toggleExpansion(folder))
  }

  return (
    <div className={style.folder}>
      <div className={`${style.name} ${style.entry}`} onClick={handleFolderClick}>
        <div className={style.left}>
          <span className={isExpanded ? `${style.icon} ${style.turn90}` : `${style.icon}`}><ChevronRightIcon /></span>
          <span>{folder.name}</span>
        </div>
        <div className={style.right}>
          <FolderAddOutlined title={`Create new folder in ${folder.name}`} />
          <FileAddOutlined title={`Create new file in ${folder.name}`} />
        </div>
      </div>
      <div className={style.child}>
        {isExpanded ? <FolderItems folder={folder} openFile={openFile} /> : <></>}
      </div>
    </div>
  )
}