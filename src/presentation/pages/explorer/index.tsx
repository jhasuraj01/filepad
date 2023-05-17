import { Explorer } from '../../components/Explorer'
import { Directory } from '../../../domain/entities/Directory'
import { useFolderAdapter } from '../../../adapters/DirectoryAdapter'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FolderStatus } from '../../../domain/repositories/DirectoryState'

export function ExplorerPage() {
  const {folderId, parentId } = useParams()
  
  let workspace: Pick<Directory.FolderMetadata, 'parentId' | 'id'> = Directory.RootNode
  
  if(folderId && parentId) {
    workspace = { parentId: parentId, id: folderId, }
  }
  
  const { fetchFolderMetadata, folderStatus, folderMetadata } = useFolderAdapter(workspace)
  useEffect(fetchFolderMetadata, [])

  if(folderMetadata === undefined || folderStatus == FolderStatus.Loading) {
    return <p>Loading...</p>
  }

  return (
    <Explorer workspace={folderMetadata} />
  )
}