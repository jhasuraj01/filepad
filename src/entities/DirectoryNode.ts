export enum DirectoryNodeType {
  folder = 'directory',
  file = 'file',
}

export type ID = string
type ALL_DATABASES = 'all-databases'
export const ALL_DATABASES: ALL_DATABASES = 'all-databases'

export interface DirectoryNode {
  database: string
  id: ID
  name: string
  parentId: string
  type: DirectoryNodeType
  editedAt: EpochTimeStamp
  createdAt: EpochTimeStamp
}

export interface FileMetadata extends DirectoryNode {
  extension: string
  type: DirectoryNodeType.file
}

export interface FileContent {
  database: string
  id: FolderMetadata['id']
  backupContent: string
  content: string
}

export type FileType = FileMetadata & FileContent

export interface FolderMetadata extends DirectoryNode {
  type: DirectoryNodeType.folder
}