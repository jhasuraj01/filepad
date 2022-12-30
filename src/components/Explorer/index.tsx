import { FolderNode } from '../../libs/FolderNode'
import styles from './index.module.scss'
import { ReactComponent as FolderIcon } from '../../icons/folder.svg'
import { ReactComponent as FileIcon } from '../../icons/file.svg'
import { ReactComponent as ChevronRightIcon } from '../../icons/chevron-right.svg'
import { ReactComponent as TrashIcon } from '../../icons/trash.svg'
import { ReactComponent as RenameIcon } from '../../icons/rename.svg'
import { ReactComponent as LinkExternalIcon } from '../../icons/link-external.svg'
import { ReactComponent as NewFileIcon } from '../../icons/new-file.svg'
import { ReactComponent as NewFolderIcon } from '../../icons/new-folder.svg'
import { ReactComponent as ClearAllIcon } from '../../icons/clear-all.svg'
import { ReactComponent as VMIcon } from '../../icons/vm.svg'
import { ReactComponent as DesktopDownloadIcon } from '../../icons/desktop-download.svg'
import { ReactComponent as AddIcon } from '../../icons/add.svg'
import { ReactComponent as LinkIcon } from '../../icons/link.svg'
import { FileNode } from '../../libs/FileNode'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { ContextMenu, ContextMenuOptions } from '../ContextMenu'
import React from 'react'
import { NavLinkPersist } from '../../supports/Persistence'
import { ALL_DATABASES, DirectoryNodeType, FileMetadata, FolderMetadata } from '../../entities/DirectoryNode'
import { fileStorageInteractor } from '../../interactor/FileStorageInteractor'

export interface ExplorerProps {
  workspace: FolderMetadata
}

interface FolderProps {
  folder: FolderMetadata
  showContextMenu: (event: React.MouseEvent<Element, MouseEvent>, item: string) => void
}

interface FileProps {
  file: FileMetadata
  showContextMenu: (event: React.MouseEvent<Element, MouseEvent>, item: string) => void
}

interface ExplorerItemsProps {
  folder: FolderMetadata
  showContextMenu: (event: React.MouseEvent<Element, MouseEvent>, item: string) => void
}

const fileContextOptions: ContextMenuOptions = [
  { icon: RenameIcon, text: 'Rename File' },
  { icon: TrashIcon, text: 'Delete File' },
  null,
  { icon: DesktopDownloadIcon, text: 'Download File' },
]

const breadcrumbContextOptions: ContextMenuOptions = [
  { icon: LinkIcon, text: 'Copy Link' },
  null,
  { icon: LinkExternalIcon, text: 'Open in New Tab' },
  { icon: LinkExternalIcon, text: 'Open in Editor' },
]

const folderContextOptions: ContextMenuOptions = [
  { icon: RenameIcon, text: 'Rename Folder' },
  { icon: TrashIcon, text: 'Delete Folder' },
  null,
  { icon: LinkExternalIcon, text: 'Open Folder in Editor' },
]

const itemsExplorerContextOptions: ContextMenuOptions = [
  { icon: NewFileIcon, text: 'New File' },
  { icon: NewFolderIcon, text: 'New Folder' },
]

const deviceExplorerContextOptions: ContextMenuOptions = [
  {
    icon: AddIcon,
    text: 'New Device'
  }
]

const deviceContextOptions: ContextMenuOptions = [
  {
    icon: ClearAllIcon,
    text: 'Format Device'
  },
  {
    icon: TrashIcon,
    text: 'Delete Device'
  },
  {
    icon: LinkExternalIcon,
    text: 'Open Device in Editor'
  }
]

export function Explorer({ workspace }: ExplorerProps) {

  const [contextMenu, setContextMenu] = useState<ReactNode>()
  const containerRef = useRef(null)
  const itemsRef = useRef(null)

  const showContextMenu = (
    event: React.MouseEvent<Element, MouseEvent>,
    item: string
  ) => {
    event.preventDefault()
    if (item === 'items') {
      event.stopPropagation()
      const itemsElm: HTMLDivElement = itemsRef.current!
      if (event.pageY >= itemsElm.offsetTop)
        setContextMenu(<ContextMenu options={itemsExplorerContextOptions} hide={hideContextMenu} event={event} />)
    }
    else if (item === 'devices') {
      event.stopPropagation()
      const itemsElm: HTMLDivElement = itemsRef.current!
      if (event.pageY >= itemsElm.offsetTop)
        setContextMenu(<ContextMenu options={deviceExplorerContextOptions} hide={hideContextMenu} event={event} />)
    }
    else if (item === 'file') {
      event.stopPropagation()
      setContextMenu(<ContextMenu options={fileContextOptions} hide={hideContextMenu} event={event} />)
    }
    else if (item === 'folder') {
      event.stopPropagation()
      setContextMenu(<ContextMenu options={folderContextOptions} hide={hideContextMenu} event={event} />)
    }
    else if (item === 'device') {
      event.stopPropagation()
      setContextMenu(<ContextMenu options={deviceContextOptions} hide={hideContextMenu} event={event} />)
    }
    else if (item === 'breadcrumb') {
      event.stopPropagation()
      setContextMenu(<ContextMenu options={breadcrumbContextOptions} hide={hideContextMenu} event={event} />)
    }
  }

  const hideContextMenu = () => {
    setContextMenu(<></>)
  }

  return (<>
    {contextMenu}
    <div ref={containerRef} className={styles.container} onContextMenu={(event) => showContextMenu(event, workspace.id === 'root' ? 'items' : 'devices')}>
      <BreadCrumbs folder={workspace} showContextMenu={showContextMenu} />
      <hr />
      <div ref={itemsRef}>
        <FolderItems folder={workspace} showContextMenu={showContextMenu} />
      </div>
    </div>
  </>)
}

export function BreadCrumbs({ folder, showContextMenu }: ExplorerItemsProps) {

  const [parents, setParents] = useState<FolderMetadata[]>([folder])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      const parents = [folder]
      let parent = folder
      for (let i = 0; i < 3 && parent.id !== ALL_DATABASES; i++) {
        parent = await fileStorageInteractor.fetchParentMetadata(parent)
        parents.push(parent)
      }
      parents.reverse()
      setParents(parents)
      setLoading(false)
    })()

  }, [folder.id])

  return (
    <div className={styles.breadcrumbs}>
      {
        parents.map((folder, index) => <React.Fragment key={folder.id}>
          <NavLinkPersist
            to={ folder.id === ALL_DATABASES ? '/explorer' : `/explorer/${folder.database}/${folder.id}`}
            className={styles.breadcrumb}
            onContextMenu={(event) => showContextMenu(event, 'breadcrumb')}
          >
            {folder.name}
          </NavLinkPersist>
          {index != parents.length - 1 ? <ChevronRightIcon /> : null}
        </React.Fragment>)
      }
    </div>
  )
}

export function FolderItems({ folder, showContextMenu }: ExplorerItemsProps) {

  const [items, setItems] = useState<(FolderMetadata | FileMetadata)[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const itemsRef = useRef(null)

  useEffect(() => {
    (async () => {
      const folderContent = await fileStorageInteractor.fetchFolderContent(folder)
      setLoading(false)
      setItems(folderContent)
    })()

  }, [folder.id])

  return (
    <div className={styles.items} ref={itemsRef}>
      {
        items.length === 0 && <div className={styles.emptyFolderShowCase}>This Folder is Empty!</div>
      }
      {
        items.map(item => {
          if (item.type === DirectoryNodeType.folder) {
            return <Folder key={item.database + item.id} folder={item} showContextMenu={showContextMenu} />
          }
          else {
            return <File key={item.database + item.id} file={item} showContextMenu={showContextMenu} />
          }
        })
      }
    </div>
  )
}

export function File({ file, showContextMenu }: FileProps) {
  return (
    <div
      // to={ [...directory, item.pathname].join('/') }
      // onClick={() => handleItemClick(item)}
      className={styles.item}
      onContextMenu={(event) => showContextMenu(event, 'file')}
    >
      <FileIcon />
      {file.name}
    </div>
  )
}

export function Folder({ folder, showContextMenu }: FolderProps) {

  return (
    <NavLinkPersist
      to={`/explorer/${folder.database}/${folder.id}`}
      className={styles.item}
      onContextMenu={(event) => showContextMenu(event, folder.id === 'root' ? 'device' : 'folder')}>
      {folder.id === 'root' ? <VMIcon /> : <FolderIcon />}
      {folder.name}
    </NavLinkPersist>
  )
}