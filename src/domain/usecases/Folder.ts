import { DirectoryNodeType, FolderMetadata, FileMetadata } from '../entities/DirectoryNode'
import { FileDatabase } from '../repositories/Database'
import { deleteFile } from './File'

export type createFolderParams = {
  id: FolderMetadata['id'],
  name: FolderMetadata['name'],
  parentId: FolderMetadata['parentId']
}

export const createFolder = async ( params: createFolderParams, database: FileDatabase ): Promise<FolderMetadata> => {

  const folder: FolderMetadata = {
    database: database.id,
    type: DirectoryNodeType.folder,
    id: params.id,
    name: params.name,
    parentId: params.parentId,
    editedAt: Date.now(),
    createdAt: Date.now()
  }
  await database.createFolderMetadata(folder)
  return folder
}

export const fetchFolderContent = async (folder: FolderMetadata, database: FileDatabase): Promise<(FileMetadata | FolderMetadata)[]> => {
  const nodes: (FileMetadata | FolderMetadata)[] = await database.fetchFolderContent(folder)
  return nodes
}

export const deleteFolder = async (folder: FolderMetadata, database: FileDatabase) => {
  const nodes = await fetchFolderContent(folder, database)

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if(node.type == DirectoryNodeType.folder) {
      await deleteFolder(node, database)
    }
    else {
      await deleteFile(node, database)
    }
  }
  database.deleteFolderMetadata(folder)
}

export const fetchParentMetadata = async (folder: FolderMetadata, database: FileDatabase): Promise<FolderMetadata> => {
  const parentMetadata = await database.fetchFolderMetadata(folder.parentId)
  return parentMetadata
}

export const fetchFolderMetadata = async (id: FolderMetadata['id'], database: FileDatabase): Promise<FolderMetadata> => {
  const parentMetadata = await database.fetchFolderMetadata(id)
  return parentMetadata
}

/*

create(arg0: createDirectoryNodeParams): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  rename(newName: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  download(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  */