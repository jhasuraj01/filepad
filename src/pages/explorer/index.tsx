import { Explorer } from '../../components/Explorer'
import { FolderNode } from '../../libs/FolderNode'

export interface ExplorerPageProps {
  workspace: FolderNode
}
export function ExplorerPage({ workspace }: ExplorerPageProps) {
  return (
    <Explorer workspace={workspace} parents={[workspace]} />
  )
}