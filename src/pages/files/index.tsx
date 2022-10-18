import { AppSection } from '../../components/AppSection'
import { EditorArea } from '../../components/EditorArea'
import { Explorer } from '../../features/Explorer'
import { FolderNode } from '../../libs/FolderNode'

export interface FilesPageProps {
  workspace: FolderNode
}
export function FilesPage({ workspace }: FilesPageProps) {
  return (
    <AppSection title='Editor'>
      <Explorer workspace={workspace} />
      <EditorArea />
    </AppSection>
  )
}