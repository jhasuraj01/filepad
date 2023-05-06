import { useParams } from 'react-router-dom'
import { Directory } from '../../../domain/entities/Directory'
import { AppSection } from '../../components/AppSection'
import { EditorArea } from '../../components/EditorArea'
import { SideExplorer } from '../../features/SideExplorer'
import { useFolderAdapter } from '../../../adapters/DirectoryAdapter'
import { useEffect } from 'react'
import { FolderStatus } from '../../../domain/repositories/DirectoryState'

export function EditorPage() {

  const {folderId, parentId } = useParams()
  
  let workspace: Pick<Directory.FolderMetadata, 'parentId' | 'id'> = Directory.RootNode
  
  if(folderId && parentId) {
    workspace = { parentId: parentId, id: folderId, }
  }

  const { fetchFolderMetadata, folderStatus, folderMetadata } = useFolderAdapter(workspace)
  useEffect(fetchFolderMetadata, [])

  if(folderStatus == FolderStatus.Loading) {
    return <p>Loading...</p>
  }

  return (
    <AppSection title='Editor'>
      <SideExplorer workspace={folderMetadata}/>
      <EditorArea />
    </AppSection>
  )
}