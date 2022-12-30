import { DirectoryNode, FileContent, FileMetadata, FolderMetadata } from './DirectoryNode'

export interface Database {
  id: string,
  connect(): Promise<Database>
}

export interface FileDatabase extends Database {
  connect(): Promise<FileDatabase>
  createFile(file: FileContent): Promise<void>
  createFileMetadata(file: FileMetadata): Promise<void>
  fetchFileContent(metadata: FileMetadata): Promise<FileContent>
  deleteFile(file: FileMetadata): Promise<void>
  deleteFileMetadata(file: FileMetadata): Promise<void>
  createFolderMetadata(folder: FolderMetadata): Promise<void>
  deleteFolderMetadata(folder: FolderMetadata): Promise<void>
  fetchFolderContent(folder: FolderMetadata): Promise<(FileMetadata | FolderMetadata)[]>
  fetchFolderMetadata(id: FolderMetadata['id']): Promise<FolderMetadata>
}