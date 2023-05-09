import type { Directory } from '../entities/Directory'

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

  deleteFileContent(file: Pick<Directory.FileMetadata, 'id'>): Promise<void>
  deleteFileMetadata(file: Pick<Directory.FileMetadata, 'id'>): Promise<void>
  deleteFolderMetadata(folder: Pick<Directory.FolderMetadata, 'id'>): Promise<void>
  
  fetchFileContent(file: Pick<Directory.FileMetadata, 'id'>): Promise<Directory.FileContent>
  fetchFileMetadata(file: Pick<Directory.FileMetadata, 'id'>): Promise<Directory.FileMetadata>
  fetchFolderContent(folder: Pick<Directory.FolderMetadata, 'id'>): Promise<(Directory.FileMetadata | Directory.FolderMetadata)[]>
  fetchFolderMetadata(folder: Pick<Directory.FolderMetadata, 'id'>): Promise<Directory.FolderMetadata>
}