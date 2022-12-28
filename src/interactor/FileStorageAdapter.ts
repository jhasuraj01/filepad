import * as fileUseCase from '../business/File'
import * as folderUseCase from '../business/Folder'
import { LocalFileDatabase } from '../drivers/IndexedDB'
import { FileDatabase } from '../entities/Database'
import { FileMetadata, FolderMetadata } from '../entities/DirectoryNode'

const databaseName = 'FileStorage'
const ownerName = 'default'

// fetchFileContent:(metadata: FileMetadata) => fileUseCase.fetchFileContent(metadata, database)

class FileStorageInteractor {
  database: FileDatabase
  constructor(database: FileDatabase) {
    this.database = database;
  }
  fetchFileContent = (metadata: FileMetadata) => fileUseCase.fetchFileContent(metadata, this.database)
  createFile = (params: fileUseCase.createFileParams) => fileUseCase.createFile(params, this.database)
  deleteFile = (metadata: FileMetadata) => fileUseCase.deleteFile(metadata, this.database)
  createFolder = (metadata: FileMetadata) => folderUseCase.createFolder(metadata, this.database)
  deleteFolder = (metadata: FolderMetadata) => folderUseCase.deleteFolder(metadata, this.database)
  fetchFolderContent = (metadata: FolderMetadata) => folderUseCase.fetchFolderContent(metadata, this.database)
}

export class LocalFileStorageInteractor extends FileStorageInteractor {
  constructor() {
    const database = new LocalFileDatabase({
      name: 'FileStorage',
      owner: 'default'
    });
    super(database)
  }
}

