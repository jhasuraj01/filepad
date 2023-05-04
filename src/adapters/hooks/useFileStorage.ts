import { useDispatch } from 'react-redux'
import { LocalDirectoryDatabase, useLocalDirectoryDatabase } from '../../infrastructure/databases/LocalDirectoryDatabase'
import { useReduxDirectoryState } from '../../infrastructure/state/DirectoryState'
import { DirectoryState } from '../../domain/repositories/DirectoryState'
import * as file from '../../domain/usecases/File'
import * as folder from '../../domain/usecases/Folder'
import { AppDispatch } from '../../infrastructure/state/app/store'
import { Directory } from '../../domain/entities/Directory'

const databaseId: string = 'db1'

export function useFileStorage() {
  const dispatch: AppDispatch = useDispatch()
  const directoryState: DirectoryState = useReduxDirectoryState(dispatch)
  const localDirectoryDatabase = useLocalDirectoryDatabase(databaseId)

  const createFile = (params: file.createFileParams) => {
    file.createFile(params, localDirectoryDatabase, directoryState)
  }
  const fetchFileMetadata = (fileMetadataPartial: Pick<Directory.FileMetadata, "id">) => {
    file.fetchFileMetadata(fileMetadataPartial, localDirectoryDatabase, directoryState)
  }
  const fetchFileContent = (fileMetadataPartial: Pick<Directory.FileMetadata, "id">) => {
    file.fetchFileContent(fileMetadataPartial, localDirectoryDatabase, directoryState)
  }
  const fetchFile = (fileMetadataPartial: Pick<Directory.FileMetadata, "id">) => {
    file.fetchFile(fileMetadataPartial, localDirectoryDatabase, directoryState)
  }
  const deleteFile = (fileMetadataPartial: Pick<Directory.FileMetadata, "id">) => {
    file.deleteFile(fileMetadataPartial, localDirectoryDatabase, directoryState)
  }
  const saveFile = (updatedFile: Directory.FileType) => {
    file.saveFile(updatedFile, localDirectoryDatabase, directoryState)
  }
  const createFolder = (params: folder.createFolderParams) => {
    folder.createFolder(params, localDirectoryDatabase, directoryState)
  }
  const fetchFolderContent = (folderMetadataPartial: Pick<Directory.FolderMetadata, "id">) => {
    folder.fetchFolderContent(folderMetadataPartial, localDirectoryDatabase, directoryState)
  }
  const deleteFolder = (folderMetadataPartial: Pick<Directory.FolderMetadata, "id">) => {
    folder.deleteFolder(folderMetadataPartial, localDirectoryDatabase, directoryState)
  }
  const fetchParentMetadata = (node: Pick<Directory.Node, "id" | "parentId">) => {
    folder.fetchParentMetadata(node, localDirectoryDatabase, directoryState)
  }
  const fetchAnsestors = (node: Pick<Directory.Node, "id" | "parentId">) => {
    folder.fetchAnsestors(node, localDirectoryDatabase, directoryState)
  }
  const fetchFolderMetadata = (node: Pick<Directory.Node, "id">) => {
    folder.fetchFolderMetadata(node, localDirectoryDatabase, directoryState)
  }

  return {
    createFile,
    fetchFileMetadata,
    fetchFileContent,
    fetchFile,
    deleteFile,
    saveFile,
    createFolder,
    fetchFolderContent,
    deleteFolder,
    fetchParentMetadata,
    fetchAnsestors,
    fetchFolderMetadata,
  }
}