import { AppSection } from '../../components/AppSection'
import { EditorArea } from '../../components/EditorArea'
import { Explorer } from '../../features/Explorer'
import { FolderNode } from '../../libs/FolderNode'

export interface FoldersPageProps {
  workspace: FolderNode
}
export function FoldersPage({ workspace }: FoldersPageProps) {
  return (
    <AppSection title='Explorer'>
      <Explorer workspace={workspace} />
      <EditorArea />
    </AppSection>
  )
}