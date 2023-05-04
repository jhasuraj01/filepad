import type { Directory } from "../entities/Directory"

export interface Database {
  id: string
}

export interface DirectoryDatabase extends Database {
  createFileContent(file: Directory.FileContent): Promise<void>
  createFileMetadata(file: Directory.FileMetadata): Promise<void>
  createFolderMetadata(folder: Directory.FolderMetadata): Promise<void>

  updateFileContent(file: Directory.FileContent): Promise<void>
  updateFileMetadata(file: Directory.FileMetadata): Promise<void>
  updateFolderMetadata(folder: Directory.FolderMetadata): Promise<void>

  deleteFile(file: Directory.FileMetadata): Promise<void>
  deleteFileMetadata(file: Directory.FileMetadata): Promise<void>
  deleteFolderMetadata(folder: Directory.FolderMetadata): Promise<void>
  
  fetchFileContent(metadata: Pick<Directory.FileMetadata, "id">): Promise<Directory.FileContent>
  fetchFolderContent(folder: Pick<Directory.FileMetadata, "id">): Promise<(Directory.FileMetadata | Directory.FolderMetadata)[]>
  fetchFileMetadata(metadata: Pick<Directory.FileMetadata, "id">): Promise<Directory.FileMetadata>
  fetchFolderMetadata(metadata: Pick<Directory.FileMetadata, "id">): Promise<Directory.FolderMetadata>
}