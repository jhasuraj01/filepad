import { useParams } from 'react-router-dom'
import { Directory } from '../../../domain/entities/Directory'
import { AppSection } from '../../components/AppSection'
import { EditorArea } from '../../components/EditorArea'
import { SideExplorer } from '../../components/SideExplorer'
import { useFileAdapter, useFolderAdapter } from '../../../adapters/DirectoryAdapter'
import { useEffect, useMemo, useState } from 'react'
import { FolderStatus } from '../../../domain/repositories/DirectoryState'
import { Set } from '@anorcle/dsa'

export function EditorPage() {

  const {parentId, folderId, fileId } = useParams()
  let workspace: Pick<Directory.FolderMetadata, 'parentId' | 'id'> = Directory.RootNode
  
  if(parentId && folderId) {
    workspace = { parentId: parentId, id: folderId, }
  }

  const [files, setFiles] = useState<Directory.FileMetadata[]>([])
  const [openedFile, setOpenedFile] = useState<Directory.FileMetadata | undefined>()

  const { fetchFolderMetadata, fetchFolderContent, folderStatus, folderMetadata, folderContent } = useFolderAdapter(workspace)
  useEffect(fetchFolderMetadata, [])
  useEffect(fetchFolderContent, [])

  const openFile = useMemo(() => (file: Directory.FileMetadata) => {

    // console.log('Open: ', file.name)

    const uniqueFilesSet = new Set<Directory.FileMetadata>((a, b) => {
      if(a.name === b.name) return 0
      return a.name > b.name ? 1 : -1
    })

    files.forEach(file => uniqueFilesSet.insert(file))
    uniqueFilesSet.insert(file)
    const updatedFiles = uniqueFilesSet.toArray

    // console.log({files, updatedFiles})

    setFiles(updatedFiles)
    setOpenedFile(file)
  }, [files])

  const closeFile = useMemo(() => (file: Directory.FileMetadata) => {

    // console.log('Close: ', file.name)

    const uniqueFilesSet = new Set<Directory.FileMetadata>((a, b) => {
      if(a.name === b.name) return 0
      return a.name > b.name ? 1 : -1
    })

    files.forEach(file => uniqueFilesSet.insert(file))
    uniqueFilesSet.delete(file)
    const updatedFiles = uniqueFilesSet.toArray

    // console.log({files, updatedFiles})
  
    setFiles(updatedFiles)

    if(file.id === openedFile?.id) {
      setOpenedFile(updatedFiles[0])
    }

  }, [files])

  useEffect(() => {
    folderContent.forEach(node => {
      if(node.type === Directory.NodeType.file && node.id === fileId) openFile(node)
    })
  }, [folderContent.length])

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