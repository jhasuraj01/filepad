import { AppSection } from '../../components/AppSection'
import { EditorArea } from '../../components/EditorArea'
import { SideExplorer } from '../../features/SideExplorer'
import { FolderNode } from '../../libs/FolderNode'

export interface EditorPageProps {
  workspace: FolderNode
}
export function EditorPage({ workspace }: EditorPageProps) {
  return (
    <AppSection title='Editor'>
      <SideExplorer />
      <EditorArea />
    </AppSection>
  )
}