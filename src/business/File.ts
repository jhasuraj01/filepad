import { DirectoryNodeType, FileMetadata, FileContent, FileType } from '../entities/DirectoryNode'
import { FileDatabase } from '../entities/Database'

export type createFileParams = {
  database: FileMetadata['database']
  id: FileMetadata['id'],
  name: FileMetadata['name'],
  extension: string,
  parentId: FileMetadata['parentId'],
  content: FileContent['content']
  backupContent: FileContent['backupContent']
}

export const createFile = async ( params: createFileParams, database: FileDatabase ): Promise<FileType> => {
  const metadata: FileMetadata = {
    database: params.database,
    extension: params.extension || `.${params.name.split('.').pop()}` || '.txt',
    type: DirectoryNodeType.file,
    id: params.id,
    name: params.name,
    parentId: params.parentId,
    editedAt: Date.now(),
    createdAt: Date.now()
  }

  const file: FileContent = {
    database: params.database,
    id: params.id,
    backupContent: params.backupContent,
    content: params.content,
  }

  await database.createFileMetadata(metadata)
  await database.createFile(file)
  return {
    ...metadata,
    ...file,
  }
}

export const fetchFileMetadata = async (metadata: {id: FileMetadata['id']}, database: FileDatabase): Promise<FileMetadata> => {
  const metadataRes: FileMetadata = await database.fetchFileMetadata(metadata.id)
  return {
    ...metadataRes
  }
}

export const fetchFileContent = async (metadata: {id: FileMetadata['id']}, database: FileDatabase): Promise<FileContent> => {
  const content: FileContent = await database.fetchFileContent(metadata)
  return {
    ...metadata,
    ...content,
  }
}

export const fetchFile = async (metadata: {id: FileMetadata['id']}, database: FileDatabase): Promise<FileType> => {
  const contentRes: FileContent = await fetchFileContent(metadata, database)
  const metadataRes: FileMetadata = await fetchFileMetadata(metadata, database)
  return {
    ...contentRes,
    ...metadataRes,
  }
}

export const deleteFile = async (file: FileMetadata, database: FileDatabase) => {
  await database.deleteFile(file)
  await database.deleteFileMetadata(file)
}

export const saveFile = async (file: FileType, database: FileDatabase): Promise<void> => {
  file.editedAt = Date.now()
  await database.updateFileContent(file)
  await database.updateFileMetadata(file)
}

/*
  save(): void {
    this.backupContent = this.content
  }

  backup(database: Database): Promise<any> {
    throw new Error("Method not implemented.")
  }
  create(): Promise<any> {
    throw new Error("Method not implemented.")
  }
  delete(): Promise<any> {
    throw new Error("Method not implemented.")
  }
  rename(newName: string): Promise<any> {
    throw new Error("Method not implemented.")
  }
  download(): Promise<any> {
    throw new Error("Method not implemented.")
  }
  
*/