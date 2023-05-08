import { useParams } from 'react-router-dom'
import { Directory } from '../../../domain/entities/Directory'
import { EditorArea } from '../../components/EditorArea'
import { SideExplorer } from '../../components/SideExplorer'
import { useFolderAdapter } from '../../../adapters/DirectoryAdapter'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FolderStatus } from '../../../domain/repositories/DirectoryState'
import { Set } from '@anorcle/dsa'
import { FloatingPanel, FloatingPanelRef } from 'antd-mobile'
import { useWindowSize } from 'react-use'
import { SubNav } from '../../components/SubNav'
import style from './index.module.scss'

export function EditorPage() {

  const { parentId, folderId, fileId } = useParams()
  let workspace: Pick<Directory.FolderMetadata, 'parentId' | 'id'> = Directory.RootNode

  if (parentId && folderId) {
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
      if (a.name === b.name) return 0
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
      if (a.name === b.name) return 0
      return a.name > b.name ? 1 : -1
    })

    files.forEach(file => uniqueFilesSet.insert(file))
    uniqueFilesSet.delete(file)
    const updatedFiles = uniqueFilesSet.toArray

    // console.log({files, updatedFiles})

    setFiles(updatedFiles)

    if (file.id === openedFile?.id) {
      setOpenedFile(updatedFiles[0])
    }

  }, [files])

  useEffect(() => {
    folderContent.forEach(node => {
      if (node.type === Directory.NodeType.file && node.id === fileId) openFile(node)
    })
  }, [folderContent.length])

  const anchors = [72, 72 + 119, window.innerHeight * 0.8]
  const ref = useRef<FloatingPanelRef>(null)
  const { width: windowWidth } = useWindowSize()

  if (folderStatus == FolderStatus.Loading) {
    return <p>Loading...</p>
  }

  if (folderMetadata === undefined) {
    return <p>Could not Find Folder</p>
  }

  return (
    <div className={style.container}>
      {
        windowWidth >= 800
          ? <SubNav title='Editor' className={style.sideNav}>
            <SideExplorer workspace={folderMetadata} openFile={openFile} />
          </SubNav>
          : <FloatingPanel anchors={anchors} ref={ref}>
            <div style={{ padding: '0 16px 16px 16px' }}>
              <SideExplorer workspace={folderMetadata} openFile={openFile} />
            </div>
          </FloatingPanel>
      }
      {openedFile && <EditorArea className={style.editorArea} files={files} open={openedFile} openFile={openFile} closeFile={closeFile} />}
    </div>
  )
}