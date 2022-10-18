import { AppSection } from '../../components/AppSection'
import { EditorArea } from '../../components/EditorArea'
import { SubNav } from '../../components/SubNav'
import { Explorer } from '../../features/Explorer'
import { FolderNode } from '../../libs/FolderNode'

export interface FilesPageProps {
  workspace: FolderNode
}
export function FilesPage({ workspace }: FilesPageProps) {
  return <AppSection
    subnav={<SubNav title='Editor'><Explorer workspace={workspace} /></SubNav>}
    main={<EditorArea />} 
  />
}