import { useParams } from 'react-router-dom'
import { Directory } from '../../../domain/entities/Directory'
import { AppSection } from '../../components/AppSection'
import { EditorArea } from '../../components/EditorArea'
import { SideExplorer } from '../../features/SideExplorer'
import { useFolderAdapter } from '../../../adapters/DirectoryAdapter'
import { useEffect, useMemo, useState } from 'react'
import { FolderStatus } from '../../../domain/repositories/DirectoryState'

export function EditorPage() {

  const {parentId, folderId, fileId } = useParams()
  const [files, setFiles] = useState<Directory.FileMetadata['id'][]>(fileId ? [fileId] : [])
  const [openedFile, setOpenedFile] = useState<Directory.FileMetadata['id'] | undefined>(fileId)

  let workspace: Pick<Directory.FolderMetadata, 'parentId' | 'id'> = Directory.RootNode
  
  if(parentId && folderId) {
    workspace = { parentId: parentId, id: folderId, }
  }

  const { fetchFolderMetadata, folderStatus, folderMetadata } = useFolderAdapter(workspace)
  useEffect(fetchFolderMetadata, [])

  const openFile = useMemo(() => (fileId: string) => {
    const updatedFiles = Array.from(new Set([...files, fileId]))
    setFiles(updatedFiles)
    setOpenedFile(fileId)
  }, [workspace.id])

  const closeFile = useMemo(() => (fileId: string) => {
    const filesSet = new Set(files)
    filesSet.delete(fileId)
    const updatedFiles = Array.from(filesSet)
    setFiles(updatedFiles)

    if(fileId === openedFile) {
      setOpenedFile(updatedFiles[0])
    }

  }, [workspace.id])

  if(folderStatus == FolderStatus.Loading) {
    return <p>Loading...</p>
  }

  if(folderMetadata === undefined) {
    return <p>Could not Find Folder</p>
  }

  return (
    <AppSection title='Editor'>
      <SideExplorer workspace={folderMetadata} openFile={openFile} />
      {openedFile && <EditorArea files={files} open={openedFile} openFile={openFile} closeFile={closeFile}/>}
    </AppSection>
  )
}