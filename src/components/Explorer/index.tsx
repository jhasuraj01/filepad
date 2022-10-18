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
import { FileNode } from '../../libs/FileNode'
import { ReactNode, useState } from 'react'
import { ContextMenu, ContextMenuProps } from '../ContextMenu'

export interface ExplorerProps {
  folder: FolderNode
  setFolder: React.Dispatch<React.SetStateAction<FolderNode>>
  setParents: React.Dispatch<React.SetStateAction<FolderNode[]>>
  parents: FolderNode[]
}

// interface ContextMenuItem {

// }

function FileContextMenu(props: ContextMenuProps) {
  return (
    <ContextMenu {...props} className={styles.contextMenu}>
      <button className={styles.contextMenuOptions}>
        <RenameIcon className={styles.icon}/>
        <span className={styles.text}>Rename</span>
      </button>
      <hr />
      <button className={styles.contextMenuOptions}>
        <TrashIcon className={styles.icon}/>
        <span className={styles.text}>Delete</span>
      </button>
    </ContextMenu>
  )
}

function FolderContextMenu(props: ContextMenuProps) {
  return (
    <ContextMenu {...props} className={styles.contextMenu}>
      <button className={styles.contextMenuOptions}>
        <RenameIcon className={styles.icon}/>
        <span className={styles.text}>Rename</span>
      </button>
      <button className={styles.contextMenuOptions}>
        <TrashIcon className={styles.icon}/>
        <span className={styles.text}>Delete</span>
      </button>
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

export function Explorer({ folder, parents, setFolder, setParents }: ExplorerProps) {

  const [ contextMenu, setContextMenu ] = useState<ReactNode>()

  const handleBreakCrumbClick = (item: FolderNode | FileNode) => {
    while(parents[parents.length - 1] != item) parents.pop()
    setParents(parents)
    setFolder(item)
  }

  const handleItemClick = (item: FolderNode | FileNode) => {
    if(item instanceof FolderNode) {
      parents.push(item)
      setFolder(item)
    }
  }

  const showContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: FolderNode | FileNode | string
  ) => {
    if(typeof item == 'string' && item === 'items') {
      event.stopPropagation()
      setContextMenu(<ExplorerContextMenu hide={hideContextMenu} event={event} />)
    }
    else if(item instanceof FileNode) {
      event.stopPropagation()
      setContextMenu(<FileContextMenu hide={hideContextMenu} event={event} />)
    }
    else {
      event.stopPropagation()
      setContextMenu(<FolderContextMenu hide={hideContextMenu} event={event} />)
    }
  }

  const hideContextMenu = () => {
    setContextMenu(<></>)
  } 

  return (<>
    { contextMenu }
    <div className={styles.container} onContextMenu={(event) => showContextMenu(event, 'items')}>
      <div className={styles.toolbar}>
        <button>Create New File</button>
        <button>Create New Folder</button>
      </div>
      <div className={styles.breadcrumbs}>
        {
          parents.map((parent, index) => <>
            <div
              className={styles.breadcrumb}
              key={`bread-${parent.id}`}
              onClick={() => handleBreakCrumbClick(parent)}
            >{parent.name}</div>
            {index != parents.length - 1 ? <ChevronRightIcon key={`icon-${parent.id}`} /> : null}
          </>)
        }
      </div>
      <div className={styles.items}>
        {
          folder.items.length === 0 && <div className={styles.emptyFolderShowCase}>This Folder is Empty!</div>
        }
        {
          folder.items.map(item =>
            <div
              onClick={() => handleItemClick(item)}
              className={styles.item}
              key={item.id}
              onContextMenu={(event) => showContextMenu(event, item)}
            >
              {item instanceof FolderNode ? <FolderIcon /> : <FileIcon />}
              {item.name}
            </div>
          )
        }
      </div>
    </div>
  </>)
}