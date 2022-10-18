// import { AppSection } from '../../components/AppSection'
// import { EditorArea } from '../../components/EditorArea'
// import { Explorer } from '../../features/Explorer'
import { FolderNode } from '../../libs/FolderNode'
import styles from './index.module.scss'

export interface ExplorerPageProps {
  workspace: FolderNode
}
export function ExplorerPage({ workspace }: ExplorerPageProps) {
  return (
    <div className={styles.container}>Explorer: {workspace.name}</div>
  )
}