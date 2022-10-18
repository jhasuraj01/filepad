import { AppSection } from '../../components/AppSection'
import { EditorArea } from '../../components/EditorArea'
import { Explorer } from '../../features/Explorer'
import { FolderNode } from '../../libs/FolderNode'

export interface EditorPageProps {
  workspace: FolderNode
}
export function EditorPage({ workspace }: EditorPageProps) {
  return (
    <AppSection title='Editor'>
      <Explorer workspace={workspace} />
      <EditorArea />
    </AppSection>
  )
}