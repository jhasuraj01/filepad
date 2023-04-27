import { DirectoryNodeType, FileContent, FileMetadata, FolderMetadata } from '../../domain/entities/DirectoryNode'
import { FileDatabase } from '../../domain/repositories/Database'
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
          metadataStore.createIndex('parentId', 'parentId')
          
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

  async fetchFileMetadata(id: string ): Promise<FileMetadata> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')

    const data = await this.database.get(this.metadataStoreName, id) as FileMetadata | undefined

    if (data === undefined) {
      throw new Error('[LocalFileDatabase]: File is undefined')
    }

    return {
      id: data.id,
      name: data.name,
      database: this.id,
      type: DirectoryNodeType.file,
      parentId: data.parentId,
      createdAt: data.createdAt,
      editedAt: data.editedAt,
      extension: data.extension,
    }
  }

  async deleteFile(file: FileMetadata): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')

    await this.database.delete(this.contentStoreName, file.id)
  }

  async deleteFileMetadata(file: FileMetadata): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')

    await this.database.delete(this.metadataStoreName, file.id)
  }

  async createFolderMetadata(folder: FolderMetadata): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')

    await this.database.add(this.metadataStoreName, {
      id: folder.id,
      database: folder.database,
      createdAt: folder.createdAt,
      editedAt: folder.editedAt,
      name: folder.name,
      parentId: folder.parentId,
      type: folder.type,
    })
  }

  async updateFileContent(file: FileContent): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')
    await this.database.put(this.contentStoreName, file)
  }
  
  async updateFileMetadata(file: FileMetadata): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')
    await this.database.put(this.metadataStoreName, file)
  }

  updateFolderMetadata(folder: FolderMetadata): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async deleteFolderMetadata(folder: FolderMetadata): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')

    await this.database.delete(this.metadataStoreName, folder.id)
  }

  async fetchFolderContent(folder: FolderMetadata): Promise<(FileMetadata | FolderMetadata)[]> {
    
    await this.connect()
    if(this.database == null) throw new Error('[LocalFileDatabase] Database: NULL')

    const value = await this.database.getAllFromIndex(this.metadataStoreName, 'parentId', folder.id) as (FileMetadata | FolderMetadata)[]
  
    return value
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