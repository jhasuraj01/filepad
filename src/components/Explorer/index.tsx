import { FolderNode } from '../../libs/FolderNode'
import styles from './index.module.scss'
import { ReactComponent as FolderIcon } from '../../icons/folder.svg'
import { ReactComponent as FileIcon } from '../../icons/file.svg'
import { ReactComponent as ChevronRightIcon } from '../../icons/chevron-right.svg'
import { ReactComponent as TrashIcon } from '../../icons/trash.svg'
import { ReactComponent as RenameIcon } from '../../icons/rename.svg'
import { ReactComponent as FolderOpenIcon } from '../../icons/folder-open.svg'
import { ReactComponent as NewFileIcon } from '../../icons/new-file.svg'
import { ReactComponent as NewFolderIcon } from '../../icons/new-folder.svg'
import { ReactComponent as DesktopDownloadIcon } from '../../icons/desktop-download.svg'
import { FileNode } from '../../libs/FileNode'
import { ReactNode, useRef, useState } from 'react'
import { ContextMenu, ContextMenuProps } from '../ContextMenu'
import React from 'react'
import { NavLinkPersist } from '../../supports/Persistence'

export interface ExplorerProps {
  workspace: (FolderNode | FileNode)[]
  directory: {
    name: string,
    path: string
  }[]
}

// interface ContextMenuItem {

// }

function FileContextMenu(props: ContextMenuProps) {
  return (
    <ContextMenu {...props} className={styles.contextMenu}>
      <button className={styles.contextMenuOptions}>
        <RenameIcon className={styles.icon}/>
        <span className={styles.text}>Rename File</span>
      </button>
      <button className={styles.contextMenuOptions}>
        <TrashIcon className={styles.icon}/>
        <span className={styles.text}>Delete File</span>
      </button>
      <hr />
      <button className={styles.contextMenuOptions}>
        <DesktopDownloadIcon className={styles.icon}/>
        <span className={styles.text}>Download File</span>
      </button>
    </ContextMenu>
  )
}

function FolderContextMenu(props: ContextMenuProps) {
  return (
    <ContextMenu {...props} className={styles.contextMenu}>
      <button className={styles.contextMenuOptions}>
        <RenameIcon className={styles.icon}/>
        <span className={styles.text}>Rename Folder</span>
      </button>
      <button className={styles.contextMenuOptions}>
        <TrashIcon className={styles.icon}/>
        <span className={styles.text}>Delete Folder</span>
      </button>
      <hr />
      <button className={styles.contextMenuOptions}>
        <FolderOpenIcon className={styles.icon}/>
        <span className={styles.text}>Open in Editor</span>
      </button>
    </ContextMenu>
  )
}

function ExplorerContextMenu(props: ContextMenuProps) {
  return (
    <ContextMenu {...props} className={styles.contextMenu}>
      <button className={styles.contextMenuOptions}>
        <NewFileIcon className={styles.icon}/>
        <span className={styles.text}>New File</span>
      </button>
      <button className={styles.contextMenuOptions}>
        <NewFolderIcon className={styles.icon}/>
        <span className={styles.text}>New Folder</span>
      </button>
    </ContextMenu>
  )
}

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
    item: FolderNode | FileNode | string
  ) => {
    if(item === 'items') {
      event.stopPropagation()
      const itemsElm: HTMLDivElement = itemsRef.current!
      if(event.pageY >= itemsElm.offsetTop)
        setContextMenu(<ExplorerContextMenu hide={hideContextMenu} event={event} />)
    }
    else if(item instanceof FileNode) {
      event.stopPropagation()
      setContextMenu(<FileContextMenu hide={hideContextMenu} event={event} />)
    }
    else if(item instanceof FolderNode) {
      event.stopPropagation()
      setContextMenu(<FolderContextMenu hide={hideContextMenu} event={event} />)
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
    <div ref={containerRef} className={styles.container} onContextMenu={(event) => showContextMenu(event, 'items')}>
      <div className={styles.toolbar}>
        <button>Create New File</button>
        <button>Create New Folder</button>
      </div>
      <div className={styles.breadcrumbs}>
        {
          directory.map((folder, index) =><React.Fragment key={folder.path + index}>
            <NavLinkPersist
              to={folder.path}
              className={styles.breadcrumb}>
              {folder.name}
            </NavLinkPersist>
            {index != directory.length - 1 ? <ChevronRightIcon /> : null}
          </React.Fragment>)
        }
      </div>
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
                onContextMenu={(event) => showContextMenu(event, item)}>
                {item instanceof FolderNode ? <FolderIcon /> : <FileIcon />}
                {item.name}
              </NavLinkPersist>
            }
            else {
              return <div
                // to={ [...directory, item.id].join('/') }
                onClick={() => handleItemClick(item)}
                className={styles.item}
                key={currentPath + item.id}
                onContextMenu={(event) => showContextMenu(event, item)}>
                {item instanceof FolderNode ? <FolderIcon /> : <FileIcon />}
                {item.name}
              </div>
            }
          })
        }
      </div>
    </div>
  </>)
}