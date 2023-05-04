import { Directory } from '../../domain/entities/Directory'
import { DirectoryDatabase } from '../../domain/repositories/DirectoryDatabase'
import { openDB, IDBPDatabase } from 'idb'

export class LocalDirectoryDatabase implements DirectoryDatabase {
  private metadataStoreName = 'metadataStore'
  private contentStoreName = 'contentStore'
  private database: IDBPDatabase | null = null
  readonly id: string

  constructor({ id }: { id: string }) {
    this.id = id
  }

  get databaseName(): string {
    return `DirectoryDatabase/${this.id}`
  }

  private async connect(): Promise<LocalDirectoryDatabase> {

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

  async createFileContent(file: Directory.FileContent): Promise<void> {

    await this.connect()
    if(this.database == null) throw new Error('[LocalDirectoryDatabase] Database: NULL')

    await this.database.add(this.contentStoreName, {
      id: file.id,
      content: file.content,
    })

  }

  async createFileMetadata(file: Directory.FileMetadata): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalDirectoryDatabase] Database: NULL')

    await this.database.add(this.metadataStoreName, {
      id: file.id,
      createdAt: file.createdAt,
      editedAt: file.editedAt,
      name: file.name,
      parentId: file.parentId,
      type: file.type,
    })
  }

  async fetchFileContent(metadata: Directory.FileMetadata): Promise<Directory.FileContent> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalDirectoryDatabase] Database: NULL')

    const data = await this.database.get(this.contentStoreName, metadata.id) as Directory.FileContent

    return {
      id: metadata.id,
      content: data.content,
    }
  }

  async fetchFileMetadata(metadata: {id: string}): Promise<Directory.FileMetadata> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalDirectoryDatabase] Database: NULL')

    const data = await this.database.get(this.metadataStoreName, metadata.id) as Directory.FileMetadata | undefined

    if (data === undefined) {
      throw new Error('[LocalDirectoryDatabase]: File is undefined')
    }

    return {
      id: data.id,
      name: data.name,
      type: Directory.NodeType.file,
      parentId: data.parentId,
      createdAt: data.createdAt,
      editedAt: data.editedAt,
    }
  }

  async deleteFile(file: Directory.FileMetadata): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalDirectoryDatabase] Database: NULL')

    await this.database.delete(this.contentStoreName, file.id)
  }

  async deleteFileMetadata(file: Directory.FileMetadata): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalDirectoryDatabase] Database: NULL')

    await this.database.delete(this.metadataStoreName, file.id)
  }

  async createFolderMetadata(folder: Directory.FolderMetadata): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalDirectoryDatabase] Database: NULL')

    await this.database.add(this.metadataStoreName, {
      id: folder.id,
      createdAt: folder.createdAt,
      editedAt: folder.editedAt,
      name: folder.name,
      parentId: folder.parentId,
      type: folder.type,
    })
  }

  async updateFileContent(file: Directory.FileContent): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalDirectoryDatabase] Database: NULL')
    await this.database.put(this.contentStoreName, file)
  }
  
  async updateFileMetadata(file: Directory.FileMetadata): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalDirectoryDatabase] Database: NULL')
    await this.database.put(this.metadataStoreName, file)
  }

  updateFolderMetadata(folder: Directory.FolderMetadata): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async deleteFolderMetadata(folder: Directory.FolderMetadata): Promise<void> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalDirectoryDatabase] Database: NULL')

    await this.database.delete(this.metadataStoreName, folder.id)
  }

  async fetchFolderContent(folder: Directory.FolderMetadata): Promise<(Directory.FileMetadata | Directory.FolderMetadata)[]> {
    
    await this.connect()
    if(this.database == null) throw new Error('[LocalDirectoryDatabase] Database: NULL')

    const value = await this.database.getAllFromIndex(this.metadataStoreName, 'parentId', folder.id) as (Directory.FileMetadata | Directory.FolderMetadata)[]
  
    return value
  }

  async fetchFolderMetadata({ id }: Pick<Directory.FileMetadata, "id">): Promise<Directory.FolderMetadata> {
    await this.connect()
    if(this.database == null) throw new Error('[LocalDirectoryDatabase] Database: NULL')

    const data = await this.database.get(this.metadataStoreName, id) as Directory.FolderMetadata | undefined

    if (data === undefined) {
      throw new Error('[LocalDirectoryDatabase]: Folder is undefined')
    }

    return {
      id: data.id,
      name: data.name,
      type: Directory.NodeType.folder,
      parentId: data.parentId,
      createdAt: data.createdAt,
      editedAt: data.editedAt,
    }

  }
}