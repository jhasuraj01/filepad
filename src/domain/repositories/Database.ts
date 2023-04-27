import { DirectoryNode, FileContent, FileMetadata, FolderMetadata } from '../entities/DirectoryNode'

export interface Database {
  id: string,
  connect(): Promise<Database>
}

export interface FileDatabase extends Database {
  connect(): Promise<FileDatabase>
  createFile(file: FileContent): Promise<void>
  createFileMetadata(file: FileMetadata): Promise<void>
  createFolderMetadata(folder: FolderMetadata): Promise<void>

  updateFileContent(file: FileContent): Promise<void>
  updateFileMetadata(file: FileMetadata): Promise<void>
  updateFolderMetadata(folder: FolderMetadata): Promise<void>

  deleteFile(file: FileMetadata): Promise<void>
  deleteFileMetadata(file: FileMetadata): Promise<void>
  deleteFolderMetadata(folder: FolderMetadata): Promise<void>
  
  fetchFileContent(metadata: {id: FileMetadata["id"]}): Promise<FileContent>
  fetchFolderContent(folder: FolderMetadata): Promise<(FileMetadata | FolderMetadata)[]>
  fetchFileMetadata(id: FileMetadata["id"]): Promise<FileMetadata>
  fetchFolderMetadata(id: FolderMetadata['id']): Promise<FolderMetadata>
}