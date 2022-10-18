import { AppSection } from '../../components/AppSection'
import { EditorArea } from '../../components/EditorArea'
import { SubNav } from '../../components/SubNav'

export function SearchPage() {
  return <AppSection
    subnav={<SubNav title='Search'>Search</SubNav>}
    main={<EditorArea />} 
  />
}