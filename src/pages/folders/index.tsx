import { AppSection } from '../../components/AppSection'
import { EditorArea } from '../../components/EditorArea'
import { SubNav } from '../../components/SubNav'
import { Explorer } from '../../features/Explorer'
import { FolderNode } from '../../libs/FolderNode'

export interface FoldersPageProps {
  workspace: FolderNode
}
export function FoldersPage({ workspace }: FoldersPageProps) {
  return <AppSection
    subnav={<SubNav title='Drive'><Explorer workspace={workspace} /></SubNav>}
    main={<EditorArea />} 
  />
}