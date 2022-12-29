import * as fileUseCase from '../business/File'
import * as folderUseCase from '../business/Folder'
import { LocalFileDatabase } from '../drivers/IndexedDB'
import { FileDatabase } from '../entities/Database'
import { DirectoryNodeType, FileMetadata, FolderMetadata } from '../entities/DirectoryNode'

const ALL_DATABASE = 'all-databases'

interface FileStorageInteractorInterface {
  fetchFileContent: (metadata: FileMetadata) => ReturnType<typeof fileUseCase.fetchFileContent>
  createFile: (params: fileUseCase.createFileParams) => ReturnType<typeof fileUseCase.createFile>
  deleteFile: (metadata: FileMetadata) => ReturnType<typeof fileUseCase.deleteFile>
  createFolder: (metadata: FileMetadata) => ReturnType<typeof folderUseCase.createFolder>
  deleteFolder: (metadata: FolderMetadata) => ReturnType<typeof folderUseCase.deleteFolder>
  fetchFolderContent: (metadata: FolderMetadata) => ReturnType<typeof folderUseCase.fetchFolderContent>
}

export class FileStorageInteractor implements FileStorageInteractorInterface {

  databases: FileDatabase[]
  constructor(databases: FileDatabase[]) {
    this.databases = databases
  }

  /**
   * Database Selector
   * @todo use duplicate database `id` to maintain multiple copies of data at different location.
   */
  private selectDatabases(metadata: FileMetadata | FolderMetadata | fileUseCase.createFileParams): FileDatabase {
    const result = this.databases.filter(database => database.id == metadata.database)
    if(result.length === 0) throw new Error('[FileStorageInteractor] Invalid Databases')
    if(result.length > 1) throw new Error('[FileStorageInteractor] Duplicate Databases')
    return result[0]
  }

  fetchFileContent = (metadata: FileMetadata) => fileUseCase.fetchFileContent(metadata, this.selectDatabases(metadata))
  createFile = (params: fileUseCase.createFileParams) => fileUseCase.createFile(params, this.selectDatabases(params))
  deleteFile = (metadata: FileMetadata) => fileUseCase.deleteFile(metadata, this.selectDatabases(metadata))
  createFolder = (metadata: FileMetadata) => folderUseCase.createFolder(metadata, this.selectDatabases(metadata))
  deleteFolder = (metadata: FolderMetadata) => folderUseCase.deleteFolder(metadata, this.selectDatabases(metadata))
  
  /**
   * Fetch Folder Content
   * @todo save database createdAt and editedAt time.
   */
  fetchFolderContent = (metadata: FolderMetadata): ReturnType<typeof folderUseCase.fetchFolderContent> => {
    if(metadata.id == ALL_DATABASE) {
      return Promise.resolve(this.databases.map(database => ({
        id: 'root',
        database: database.id,
        parent: ALL_DATABASE,
        type: DirectoryNodeType.folder,
        createdAt: 0,
        editedAt: 0,
        name: database.id,
      })))
    }
    // console.log('Hi')
    return folderUseCase.fetchFolderContent(metadata, this.selectDatabases(metadata))
  }
}

const databases: FileDatabase[] = [
  new LocalFileDatabase({ id: 'default' }),
  new LocalFileDatabase({ id: 'default1' }),
  new LocalFileDatabase({ id: 'default2' }),
]

/**
 * @todo save database createdAt and editedAt time.
 */
export const rootFolder: FolderMetadata = {
  id: ALL_DATABASE,
  parent: ALL_DATABASE,
  database: ALL_DATABASE,
  type: DirectoryNodeType.folder,
  name: 'notepad',
  createdAt: 0,
  editedAt: 0,
}

export const fileStorageInteractor = new FileStorageInteractor(databases)