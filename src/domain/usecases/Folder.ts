import { Directory } from '../entities/Directory'
import { DirectoryDatabase } from '../repositories/DirectoryDatabase'
import { DirectoryState, FolderStatus } from '../repositories/DirectoryState'
import { deleteFile } from './File'

export type createFolderParams = {
  id: Directory.NodeId,
  name: Directory.FolderMetadata['name'],
  parentId?: Directory.FolderMetadata['parentId']
}

export const createFolder = async (
  params: createFolderParams,
  database: DirectoryDatabase,
  state: DirectoryState
): Promise<Directory.FolderMetadata> => {

  const folder: Directory.FolderMetadata = {
    type: Directory.NodeType.folder,
    id: params.id,
    name: params.name,
    parentId: params.parentId || Directory.RootNode.id,
    editedAt: Date.now(),
    createdAt: Date.now()
  }

  state.setFolderMetadata(folder)
  state.setFolderStatus(folder, FolderStatus.Creating)
  await database.createFolderMetadata(folder)
  state.setFolderStatus(folder, FolderStatus.Default)

  return folder
}

export const fetchFolderContent = async (
  folder: Pick<Directory.FolderMetadata, "id">,
  database: DirectoryDatabase,
  state: DirectoryState
): Promise<Directory.FolderContent> => {

  state.setFolderStatus(folder, FolderStatus.ContentLoading)

  const nodes: Directory.FolderContent = await database.fetchFolderContent(folder)

  nodes.forEach(node => {
    if(node.type === Directory.NodeType.file)
      state.setFileMetadata(node)
    else
      state.setFolderMetadata(node)
  })

  state.setFolderStatus(folder, FolderStatus.Default)

  return nodes
}

export const deleteFolder = async (
  folder: Pick<Directory.FolderMetadata, "id">,
  database: DirectoryDatabase,
  state: DirectoryState
) => {

  state.setFolderStatus(folder, FolderStatus.Deleting)
  const nodes: Directory.FolderContent = await fetchFolderContent(folder, database, state)

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.type == Directory.NodeType.folder) {
      await deleteFolder(node, database, state)
    }
    else {
      await deleteFile(node, database, state)
    }
  }

  await database.deleteFolderMetadata(folder)
  state.deleteFolderMetadata(folder)
  state.setFolderStatus(folder, FolderStatus.Deleted)

}

export const fetchParentMetadata = async (
  node: Pick<Directory.Node, "id" | "parentId">,
  database: DirectoryDatabase,
  state: DirectoryState
): Promise<Directory.FolderMetadata> => {
  if (node.parentId == Directory.RootNode.id) return Directory.RootNode
  const parentMetadata = await database.fetchFolderMetadata(node)
  state.setFolderMetadata(parentMetadata)
  return parentMetadata
}

export const fetchAnsestors = async (
  node: Pick<Directory.Node, "id" | "parentId">,
  database: DirectoryDatabase,
  state: DirectoryState
): Promise<Directory.FolderMetadata[]> => {
  if (node.id === Directory.RootNode.id) return [];

  const parents: Directory.FolderMetadata[] = []
  let parent: Directory.FolderMetadata

  do {
    parent = await fetchParentMetadata(node, database, state);
    parents.push(parent);
  } while (parent.id != Directory.RootNode.id);

  parents.reverse();

  return parents
}

export const fetchFolderMetadata = async (
  folderMetadataPartial: Pick<Directory.FileMetadata, "id">,
  database: DirectoryDatabase,
  state: DirectoryState
): Promise<Directory.FolderMetadata> => {
  
  const folderMetadata = await database.fetchFolderMetadata(folderMetadataPartial)
  state.setFolderMetadata(folderMetadata)
  
  return folderMetadata
}