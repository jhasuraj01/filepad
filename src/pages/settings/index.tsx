import { AppSection } from '../../components/AppSection'
import { EditorArea } from '../../components/EditorArea'
import { SubNav } from '../../components/SubNav'

export function SettingsPage() {
  return <AppSection
    subnav={<SubNav title='Settings'>Settings</SubNav>}
    main={<EditorArea />} 
  />
}