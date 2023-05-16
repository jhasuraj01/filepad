import { Directory } from '../entities/Directory'
import { DirectoryDatabase } from '../repositories/DirectoryDatabase'
import { DirectoryState, FileStatus } from '../repositories/DirectoryState'
import { DownloadManager } from '../repositories/DownloadManager'

export type createFileParams = {
  name: Directory.FileMetadata['name'],
  parentId: Directory.FileMetadata['parentId'],
}

/**
 * 
 * @todo Implement File ID Generator
 */
export const createFile = async (
  params: createFileParams,
  database: DirectoryDatabase,
  state: DirectoryState,
): Promise<Directory.FileType> => {

  const fileId = String(Date.now())

  const fileMetadata: Directory.FileMetadata = {
    type: Directory.NodeType.file,
    id: fileId,
    name: params.name,
    parentId: params.parentId || Directory.RootNode.id,
    editedAt: Date.now(),
    createdAt: Date.now()
  }

  const fileContent: Directory.FileContent = {
    // database: params.database,
    id: fileId,
    // backupContent: params.backupContent,
    content: '',
  }

  state.setFileStatus(fileMetadata, FileStatus.Creating)
  state.setFileMetadata(fileMetadata)
  state.setFileContent(fileContent)
  await database.createFileMetadata(fileMetadata)
  await database.createFileContent(fileContent)
  state.setFileStatus(fileMetadata, FileStatus.Default)

  return {
    ...fileMetadata,
    ...fileContent,
  }
}

export const fetchFileMetadata = async (
  fileMetadataPartial: Pick<Directory.FileMetadata, 'id'>,
  database: DirectoryDatabase,
  state: DirectoryState,
): Promise<Directory.FileMetadata> => {

  const fileMetadata: Directory.FileMetadata = await database.fetchFileMetadata(fileMetadataPartial)
  state.setFileMetadata(fileMetadata)

  return {
    ...fileMetadata
  }
}

export const fetchFileContent = async (
  fileMetadataPartial: Pick<Directory.FileMetadata, 'id'>,
  database: DirectoryDatabase,
  state: DirectoryState,
): Promise<Directory.FileContent> => {

  state.setFileStatus(fileMetadataPartial, FileStatus.ContentLoading)
  const fileContent: Directory.FileContent = await database.fetchFileContent(fileMetadataPartial)
  state.setFileContent(fileContent)
  state.setFileStatus(fileMetadataPartial, FileStatus.ContentLoaded)

  return {
    ...fileContent,
  }
}

export const fetchFile = async (
  fileMetadataPartial: Pick<Directory.FileMetadata, 'id'>,
  database: DirectoryDatabase,
  state: DirectoryState,
): Promise<Directory.FileType> => {

  const fileContent: Directory.FileContent = await fetchFileContent(fileMetadataPartial, database, state)
  const fileMetadata: Directory.FileMetadata = await fetchFileMetadata(fileMetadataPartial, database, state)

  return {
    ...fileContent,
    ...fileMetadata,
  }
}

export const deleteFile = async (
  file: Pick<Directory.FileMetadata, 'id'>,
  database: DirectoryDatabase,
  state: DirectoryState,
) => {

  state.setFileStatus(file, FileStatus.Deleting)
  await database.deleteFileContent(file)
  await database.deleteFileMetadata(file)
  state.deleteFileContent(file)
  state.deleteFileMetadata(file)
  state.setFileStatus(file, FileStatus.Deleted)
}

export const saveFile = async (
  file: Directory.FileType,
  database: DirectoryDatabase,
  state: DirectoryState,
): Promise<void> => {

  state.setFileStatus(file, FileStatus.ChangesSaving)
  file.editedAt = Date.now()
  await database.updateFileContent(file)
  await database.updateFileMetadata(file)
  state.setFileContent(file)
  state.setFileMetadata(file)
  state.setFileStatus(file, FileStatus.Default)
}

export const saveFileMetadata = async (
  file: Directory.FileMetadata,
  database: DirectoryDatabase,
  state: DirectoryState,
): Promise<void> => {

  state.setFileStatus(file, FileStatus.ChangesSaving)
  file.editedAt = Date.now()
  await database.updateFileMetadata(file)
  state.setFileMetadata(file)
  state.setFileStatus(file, FileStatus.Default)
}

export const downloadFile = async (
  fileMetadataPartial: Pick<Directory.FileMetadata, 'id'>,
  database: DirectoryDatabase,
  state: DirectoryState,
  downloader: DownloadManager,
): Promise<void> => {

  const file = await fetchFile(fileMetadataPartial, database, state)
  await downloader.downloadTextFile(file)
}