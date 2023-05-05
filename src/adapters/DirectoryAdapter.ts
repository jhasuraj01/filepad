import { useDispatch, useSelector } from 'react-redux'
import { useLocalDirectoryDatabase } from '../infrastructure/databases/LocalDirectoryDatabase'
import { selectFileContent, selectFileMetadata, selectFileStatus, selectFolderContent, selectFolderMetadata, selectFolderStatus, useReduxDirectoryState } from '../infrastructure/state/DirectoryState'
import { DirectoryState } from '../domain/repositories/DirectoryState'
import * as File from '../domain/usecases/File'
import * as Folder from '../domain/usecases/Folder'
import { AppDispatch } from '../infrastructure/state/app/store'
import { Directory } from '../domain/entities/Directory'

const databaseId = 'db1'

export function useFileAdapter(metadata: Pick<Directory.FileContent, 'id'>) {
  const dispatch: AppDispatch = useDispatch()
  const directoryState: DirectoryState = useReduxDirectoryState(dispatch)
  const localDirectoryDatabase = useLocalDirectoryDatabase(databaseId)
  
  const fileMetadata = useSelector(selectFileMetadata(metadata))
  const fileContent = useSelector(selectFileContent(metadata))
  const fileStatus = useSelector(selectFileStatus(metadata))

  const file: Directory.FileType = {...fileContent, ...fileMetadata}

  const createFile = (params: Pick<File.createFileParams, 'name'>) => {
    File.createFile({
      parentId: metadata.id,
      name: params.name,
    }, localDirectoryDatabase, directoryState)
  }

  const fetchFileMetadata = () => {
    File.fetchFileMetadata(metadata, localDirectoryDatabase, directoryState)
  }
  const fetchFileContent = () => {
    File.fetchFileContent(metadata, localDirectoryDatabase, directoryState)
  }
  const fetchFile = () => {
    File.fetchFile(metadata, localDirectoryDatabase, directoryState)
  }
  const deleteFile = () => {
    File.deleteFile(metadata, localDirectoryDatabase, directoryState)
  }

  const updateContent = (newContent: Directory.FileContent['content']) => {
    File.saveFile({
      ...file,
      content: newContent
    }, localDirectoryDatabase, directoryState)
  }

  return {
    createFile,
    fetchFileMetadata,
    fetchFileContent,
    fetchFile,
    deleteFile,
    updateContent,
    fileMetadata,
    fileContent,
    fileStatus,
  }
}

export function useFolderAdapter(metadata: Pick<Directory.FolderMetadata, 'id' | 'parentId'> = Directory.RootNode) {
  const dispatch: AppDispatch = useDispatch()
  const directoryState: DirectoryState = useReduxDirectoryState(dispatch)
  const localDirectoryDatabase = useLocalDirectoryDatabase(databaseId)

  const createFolder = (params: Pick<File.createFileParams, 'name'>) => {
    Folder.createFolder({
      name: params.name,
      parentId: metadata.id,
    }, localDirectoryDatabase, directoryState)
  }
  const fetchFolderContent = () => {
    Folder.fetchFolderContent(metadata, localDirectoryDatabase, directoryState)
  }
  const deleteFolder = () => {
    Folder.deleteFolder(metadata, localDirectoryDatabase, directoryState)
  }
  const fetchParentMetadata = () => {
    Folder.fetchParentMetadata(metadata, localDirectoryDatabase, directoryState)
  }
  const fetchAnsestors = () => {
    Folder.fetchAnsestors(metadata, localDirectoryDatabase, directoryState)
  }
  const fetchFolderMetadata = () => {
    Folder.fetchFolderMetadata(metadata, localDirectoryDatabase, directoryState)
  }

  const folderContent = useSelector(selectFolderContent(metadata))
  const folderMetadata = useSelector(selectFolderMetadata(metadata))
  const folderStatus = useSelector(selectFolderStatus(metadata))

  return {
    createFolder,
    fetchFolderContent,
    deleteFolder,
    fetchParentMetadata,
    fetchAnsestors,
    fetchFolderMetadata,
    folderContent,
    folderMetadata,
    folderStatus,
  }
}