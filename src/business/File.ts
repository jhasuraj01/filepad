import { DirectoryNodeType, ExtensionEnum, FileMetadata, FileContent, File } from '../entities/DirectoryNode'
import { FileDatabase } from '../entities/Database'

export type createFileParams = {
  id: FileMetadata['id'],
  name: FileMetadata['name'],
  extension: ExtensionEnum,
  parent: FileMetadata['parent'],
  content: FileContent['content']
  backupContent: FileContent['backupContent']
}



export const createFile = async ( params: createFileParams, database: FileDatabase ): Promise<File> => {

  const metadata: FileMetadata = {
    extension: params.extension,
    type: DirectoryNodeType.file,
    id: params.id,
    name: params.name,
    parent: params.parent,
    editedAt: Date.now(),
    createdAt: Date.now()
  }

  const file: FileContent = {
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

export const fetchFileContent = async (metadata: FileMetadata, database: FileDatabase): Promise<File> => {
  const content: FileContent = await database.fetchFileContent(metadata)
  return {
    ...metadata,
    ...content,
  }
}

export const deleteFile = async (file: FileMetadata, database: FileDatabase) => {
  await database.deleteFile(file)
  await database.deleteFileMetadata(file)
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