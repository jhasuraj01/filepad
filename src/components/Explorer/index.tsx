import { FolderNode } from '../../libs/FolderNode'
import styles from './index.module.scss'
import { ReactComponent as FolderIcon } from '../../icons/folder.svg'
import { ReactComponent as FileIcon } from '../../icons/file.svg'
import { ReactComponent as ChevronRightIcon } from '../../icons/chevron-right.svg'
import { useState } from 'react'
import { FileNode } from '../../libs/FileNode'

export interface ExplorerProps {
  workspace: FolderNode
  parents: FolderNode[]
}

export function Explorer({ workspace, parents }: ExplorerProps) {

  const [folder, setFolder] = useState(workspace)

  const handleBreakCrumbClick = (item: FolderNode | FileNode) => {
    while(parents[parents.length - 1] != item) parents.pop()
    setFolder(item)
  }

  const handleItemClick = (item: FolderNode | FileNode) => {
    if(item instanceof FolderNode) {
      parents.push(item)
      setFolder(item)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        {
          parents.map((parent, index) => <>
            <div
              className={styles.breadcrumb}
              key={parent.id}
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
          folder.items.map(item => <div onClick={() => handleItemClick(item)} className={styles.item} key={item.id}>
            {item instanceof FolderNode ? <FolderIcon /> : <FileIcon />}
            {item.name}
          </div>)
        }
      </div>
    </div>
  )
}