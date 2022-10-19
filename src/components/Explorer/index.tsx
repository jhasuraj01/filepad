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
import { ReactNode, useRef, useState } from 'react'
import { ContextMenu, ContextMenuOptions } from '../ContextMenu'
import React from 'react'
import { NavLinkPersist } from '../../supports/Persistence'

export interface ExplorerProps {
  workspace: (FolderNode | FileNode)[]
  directory: {
    name: string,
    path: string
  }[]
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

export function Explorer({ workspace, directory }: ExplorerProps) {

  const [ contextMenu, setContextMenu ] = useState<ReactNode>()
  const containerRef = useRef(null)
  const itemsRef = useRef(null)

  const handleItemClick = (item: FolderNode | FileNode) => {
    if(item instanceof FolderNode) {
      // parents.push(item)
      // setFolder(item)
    }
  }

  const showContextMenu = (
    event: React.MouseEvent<Element, MouseEvent>,
    item: string
  ) => {
    event.preventDefault()
    if(item === 'items') {
      event.stopPropagation()
      const itemsElm: HTMLDivElement = itemsRef.current!
      if(event.pageY >= itemsElm.offsetTop)
        setContextMenu(<ContextMenu options={itemsExplorerContextOptions} hide={hideContextMenu} event={event} />)
    }
    else if(item === 'devices') {
      event.stopPropagation()
      const itemsElm: HTMLDivElement = itemsRef.current!
      if(event.pageY >= itemsElm.offsetTop)
        setContextMenu(<ContextMenu options={deviceExplorerContextOptions} hide={hideContextMenu} event={event} />)
    }
    else if(item === 'file') {
      event.stopPropagation()
      setContextMenu(<ContextMenu options={fileContextOptions} hide={hideContextMenu} event={event} />)
    }
    else if(item === 'folder') {
      event.stopPropagation()
      setContextMenu(<ContextMenu options={folderContextOptions} hide={hideContextMenu} event={event} />)
    }
    else if(item === 'device') {
      event.stopPropagation()
      setContextMenu(<ContextMenu options={deviceContextOptions} hide={hideContextMenu} event={event} />)
    }
    else if(item === 'breadcrumb') {
      event.stopPropagation()
      setContextMenu(<ContextMenu options={breadcrumbContextOptions} hide={hideContextMenu} event={event} />)
    }
  }

  const hideContextMenu = () => {
    setContextMenu(<></>)
  }

  let currentPath = directory[directory.length - 1].path
  if(currentPath === '/') currentPath = ''
  else currentPath += '/'

  return (<>
    { contextMenu }
    <div ref={containerRef} className={styles.container} onContextMenu={(event) => showContextMenu(event, directory.length > 1 ? 'items' : 'devices')}>
      <div className={styles.breadcrumbs}>
        {
          directory.map((folder, index) =><React.Fragment key={folder.path + index}>
            <NavLinkPersist
              to={folder.path}
              className={styles.breadcrumb}
              onContextMenu={(event) => showContextMenu(event, 'breadcrumb')}>
              {folder.name}
            </NavLinkPersist>
            {index != directory.length - 1 ? <ChevronRightIcon /> : null}
          </React.Fragment>)
        }
      </div>
      <hr />
      <div className={styles.items} ref={itemsRef}>
        {
          workspace.length === 0 && <div className={styles.emptyFolderShowCase}>This Folder is Empty!</div>
        }
        {
          workspace.map(item => {
            if(item instanceof FolderNode) {
              return <NavLinkPersist
                to={currentPath + item.id}
                onClick={() => handleItemClick(item)}
                className={styles.item}
                key={currentPath + item.id}
                onContextMenu={(event) => showContextMenu(event, directory.length > 1 ? 'folder' : 'device')}>
                {directory.length > 1 ? <FolderIcon /> : <VMIcon />}
                {item.name}
              </NavLinkPersist>
            }
            else {
              return <div
                // to={ [...directory, item.id].join('/') }
                onClick={() => handleItemClick(item)}
                className={styles.item}
                key={currentPath + item.id}
                onContextMenu={(event) => showContextMenu(event, 'file')}>
                <FileIcon />
                {item.name}
              </div>
            }
          })
        }
      </div>
    </div>
  </>)
}