
export enum ExtensionEnum {
  txt = 'txt',
}

export enum DirectoryNodeType {
  folder = 'directory',
  file = 'file',
}

export type ID = string

export interface DirectoryNode {
  database: string
  id: ID
  name: string
  parent: DirectoryNode | 'root'
  type: DirectoryNodeType
  editedAt: EpochTimeStamp
  createdAt: EpochTimeStamp
}

export interface FileMetadata extends DirectoryNode {
  extension: ExtensionEnum
  type: DirectoryNodeType.file
}

export interface FileContent {
  id: FolderMetadata['id']
  backupContent: string
  content: string
}

export type File = FileMetadata & FileContent

export interface FolderMetadata extends DirectoryNode {
  type: DirectoryNodeType.folder
}