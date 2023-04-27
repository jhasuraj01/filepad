import { AppSection } from '../../components/AppSection'
import { EditorArea } from '../../components/EditorArea'
import { SideExplorer } from '../../features/SideExplorer'

export function EditorPage() {
  return (
    <AppSection title='Editor'>
      <SideExplorer />
      <EditorArea />
    </AppSection>
  )
}