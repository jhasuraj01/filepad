import * as fileUseCase from '../domain/usecases/File'
import * as folderUseCase from '../domain/usecases/Folder'
import { LocalFileDatabase } from '../Infrastructure/databases/LocalDirectoryDatabase'
import { FileDatabase } from '../domain/repositories/DirectoryDatabase'
// import { ALL_DATABASES, DirectoryNode, DirectoryNodeType, Directory.FileMetadata,Directory.FileType, Directory.FolderMetadata } from '../domain/entities/Directory'
import { Directory } from '../domain/entities/Directory'

interface FileStorageInteractorInterface {
  fetchFile: (metadata: {id: Directory.NodeId}) => ReturnType<typeof fileUseCase.fetchFile>
  saveFile: (file:Directory.FileType) => ReturnType<typeof fileUseCase.saveFile>
  fetchFileMetadata: (metadata: {id: Directory.NodeId}) => ReturnType<typeof fileUseCase.fetchFileMetadata>
  fetchFileContent: (metadata: {id: Directory.NodeId}) => ReturnType<typeof fileUseCase.fetchFileContent>
  createFile: (params: fileUseCase.createFileParams) => ReturnType<typeof fileUseCase.createFile>
  deleteFile: (metadata: Directory.FileMetadata) => ReturnType<typeof fileUseCase.deleteFile>
  createFolder: (metadata: Directory.FolderMetadata) => ReturnType<typeof folderUseCase.createFolder>
  deleteFolder: (metadata: Directory.FolderMetadata) => ReturnType<typeof folderUseCase.deleteFolder>
  fetchFolderContent: (metadata: Directory.FolderMetadata) => ReturnType<typeof folderUseCase.fetchFolderContent>
  fetchParentMetadata: (metadata: Directory.FolderMetadata) => ReturnType<typeof folderUseCase.fetchParentMetadata>
  fetchFolderMetadata: (id: Directory.FolderMetadata['id']) => ReturnType<typeof folderUseCase.fetchFolderMetadata>
}

export class FileStorageInteractor implements FileStorageInteractorInterface {

  private database: FileDatabase
  constructor(database: FileDatabase) {
    this.database = database
  }
  
  fetchFile = (metadata: {id: Directory.NodeId}) => fileUseCase.fetchFile(metadata, this.database)
  saveFile = (file: Directory.FileType) => fileUseCase.saveFile(file, this.database)
  fetchFileMetadata = (metadata: {id: Directory.NodeId}) => fileUseCase.fetchFileMetadata(metadata, this.database)
  fetchFileContent = (metadata: {id: Directory.NodeId}) => fileUseCase.fetchFileContent(metadata, this.database)
  createFile = (params: fileUseCase.createFileParams) => fileUseCase.createFile(params, this.database)
  deleteFile = (metadata: Directory.FileMetadata) => fileUseCase.deleteFile(metadata, this.database)
  createFolder = (metadata: Directory.FolderMetadata) => folderUseCase.createFolder(metadata, this.database)
  deleteFolder = (metadata: Directory.FolderMetadata) => folderUseCase.deleteFolder(metadata, this.database)
  
  /**
   * Fetch Folder Content
   * @todo save database createdAt and editedAt time.
  */
  fetchFolderContent = (metadata: Directory.FolderMetadata): ReturnType<typeof folderUseCase.fetchFolderContent> => {
    return folderUseCase.fetchFolderContent(metadata, this.database)
  }

  fetchParentMetadata = (metadata: Directory.FolderMetadata): ReturnType<typeof folderUseCase.fetchParentMetadata> => {
    return folderUseCase.fetchParentMetadata(metadata, this.database)
  }

  fetchFolderMetadata = (id: Directory.FolderMetadata['id']): ReturnType<typeof folderUseCase.fetchFolderMetadata> => {
    return folderUseCase.fetchFolderMetadata(id, this.database)
  }

}

const database: FileDatabase = new LocalFileDatabase({ id: 'default' })
export const fileStorageInteractor = new FileStorageInteractor(database)