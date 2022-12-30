import { DirectoryNodeType, FileContent, FileMetadata, FolderMetadata } from '../entities/DirectoryNode'
import { FileDatabase } from '../entities/Database'
import { openDB, IDBPDatabase } from 'idb'

export class LocalFileDatabase implements FileDatabase {
  private metadataStoreName = 'metadataStore'
  private contentStoreName = 'contentStore'
  private database: IDBPDatabase | null = null

  id: string

  constructor({ id }: { id: string }) {
    this.id = id
  }

  get databaseName(): string {
    return `FileDatabase/${this.id}`
  }

  async connect(): Promise<FileDatabase> {

    const metadataStoreName = this.metadataStoreName
    const contentStoreName = this.contentStoreName
  
    if(this.database == null) {
      this.database = await openDB(this.databaseName, 1, {
        upgrade(db) {
          const metadataStore = db.createObjectStore(metadataStoreName, {
            keyPath: 'id',
            autoIncrement: true,
          })
          metadataStore.createIndex('parent', 'parent')
          
          db.createObjectStore(contentStoreName, {
            keyPath: 'id'
          })
        }
      })
    }

    return this
  }

  async createFile(file: FileContent): Promise<void> {

    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')

    await this.database.add(this.contentStoreName, {
      id: file.id,
      content: file.content,
      backupContent: file.backupContent,
    })

  }

  async createFileMetadata(file: FileMetadata): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')

    await this.database.add(this.metadataStoreName, {
      id: file.id,
      database: file.database,
      createdAt: file.createdAt,
      editedAt: file.editedAt,
      extension: file.extension,
      name: file.name,
      parentId: file.parentId,
      type: file.type,
    })
  }

  async fetchFileContent(metadata: FileMetadata): Promise<FileContent> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')

    const data = await this.database.get(this.contentStoreName, metadata.id) as FileContent

    return {
      id: metadata.id,
      database: this.id,
      content: data.content,
      backupContent: data.backupContent,
    }
  }

  deleteFile(file: FileMetadata): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteFileMetadata(file: FileMetadata): Promise<void> {
    throw new Error('Method not implemented.')
  }

  createFolderMetadata(folder: FolderMetadata): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteFolderMetadata(folder: FolderMetadata): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async fetchFolderContent(folder: FolderMetadata): Promise<(FileMetadata | FolderMetadata)[]> {
    
    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')

    const value = await this.database.getFromIndex(this.metadataStoreName, 'parent', folder.id) as (FileMetadata | FolderMetadata)[]

    return value || []
  }

  async fetchFolderMetadata(id: FolderMetadata['id']): Promise<FolderMetadata> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')

    const data = await this.database.get(this.metadataStoreName, id) as FolderMetadata | undefined

    if (data === undefined) {
      throw new Error('[LocalFileDatabase]: Folder is undefined')
    }

    return {
      id: data.id,
      name: data.name,
      database: this.id,
      type: DirectoryNodeType.folder,
      parentId: data.parentId,
      createdAt: data.createdAt,
      editedAt: data.editedAt,
    }

  }
}