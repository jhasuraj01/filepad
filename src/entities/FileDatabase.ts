import { DirectoryNode, FileContent, FileMetadata, FolderMetadata } from "./DirectoryNode";

export interface FileDatabase {
  createFile(file: FileContent): Promise<any>
  createFileMetadata(file: FileMetadata): Promise<any>
  fetchFileContent(metadata: FileMetadata): Promise<FileContent>
  deleteFile(file: FileMetadata): Promise<any>
  deleteFileMetadata(file: FileMetadata): Promise<any>
  createFolderMetadata(folder: FolderMetadata): Promise<any>
  deleteFolderMetadata(folder: FolderMetadata): Promise<any>
  fetchFolderContent(folder: FolderMetadata): Promise<(FileMetadata | FolderMetadata)[]>
}