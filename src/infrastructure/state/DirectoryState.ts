import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Directory } from '../../domain/entities/Directory'
import { DirectoryState, FileStatus, FolderStatus } from '../../domain/repositories/DirectoryState'
import { AppDispatch, RootState } from './app/store'

interface ExplorerState {
  fileMetadata: Record<Directory.NodeId, Directory.FileMetadata>
  folderMetadata: Record<Directory.NodeId, Directory.FolderMetadata>
  fileContent: Record<Directory.NodeId, Directory.FileContent>
  fileStatus: Record<Directory.NodeId, FileStatus>
  folderStatus: Record<Directory.NodeId, FolderStatus>
}

const initialState: ExplorerState = {
  fileMetadata: {},
  folderMetadata: {
    [Directory.RootNode.id]: Directory.RootNode
  },
  fileContent: {},
  fileStatus: {},
  folderStatus: {
    [Directory.RootNode.id]: FolderStatus.Default
  },
}

const reduxDirectoryState = createSlice({
  name: 'ReduxDirectoryState',
  initialState,
  reducers: {
    setFolderMetadata(state, { payload }: PayloadAction<Directory.FolderMetadata>) {
      state.folderMetadata[payload.id] = payload
    },
    setFileMetadata(state, { payload }: PayloadAction<Directory.FileMetadata>) {
      state.fileMetadata[payload.id] = payload
    },
    setFileContent(state, { payload }: PayloadAction<Directory.FileContent>) {
      state.fileContent[payload.id] = payload
    },

    setFileStatus(state, { payload }: PayloadAction<{file: Pick<Directory.Node, 'id'>, status: FileStatus}>) {
      if(payload.status === FileStatus.Deleted) {
        delete state.fileStatus[payload.file.id]
      }
      else {
        state.fileStatus[payload.file.id] = payload.status
      }
    },
    setFolderStatus(state, { payload }: PayloadAction<{folder: Pick<Directory.Node, 'id'>, status: FolderStatus}>) {
      if(payload.status === FolderStatus.Deleted) {
        delete state.fileStatus[payload.folder.id]
      }
      else {
        state.folderStatus[payload.folder.id] = payload.status
      }
    },

    deleteFolderMetadata(state, { payload }: PayloadAction<Pick<Directory.Node, 'id'>>) {
      delete state.folderMetadata[payload.id]
    },
    deleteFileMetadata(state, { payload }: PayloadAction<Pick<Directory.Node, 'id'>>) {
      delete state.fileMetadata[payload.id]
    },
    deleteFileContent(state, { payload }: PayloadAction<Pick<Directory.Node, 'id'>>) {
      delete state.fileContent[payload.id]
    },

  },
})

class ReduxDirectoryState implements DirectoryState {

  private readonly dispatch: AppDispatch

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch
  }

  setFolderMetadata(folder: Directory.FolderMetadata): void {
    this.dispatch(reduxDirectoryState.actions.setFolderMetadata(folder))
  }
  setFileMetadata(file: Directory.FileMetadata): void {
    this.dispatch(reduxDirectoryState.actions.setFileMetadata(file))
  }
  setFileContent(file: Directory.FileContent): void {
    this.dispatch(reduxDirectoryState.actions.setFileContent(file))
  }

  setFileStatus(file: Pick<Directory.Node, 'id'>, status: FileStatus): void {
    this.dispatch(reduxDirectoryState.actions.setFileStatus({file, status}))
  }
  setFolderStatus(folder: Pick<Directory.Node, 'id'>, status: FolderStatus): void {
    this.dispatch(reduxDirectoryState.actions.setFolderStatus({folder, status}))
  }

  deleteFileContent(file: Pick<Directory.Node, 'id'>): void {
    this.dispatch(reduxDirectoryState.actions.deleteFileContent(file))
  }
  deleteFileMetadata(file: Pick<Directory.Node, 'id'>): void {
    this.dispatch(reduxDirectoryState.actions.deleteFileMetadata(file))
  }
  deleteFolderMetadata(folder: Pick<Directory.Node, 'id'>): void {
    this.dispatch(reduxDirectoryState.actions.deleteFolderMetadata(folder))
  }
  
}

export default reduxDirectoryState.reducer

let reduxDirectoryStateInstance: ReduxDirectoryState
export const useReduxDirectoryState = (dispatch: AppDispatch) => {
  if(reduxDirectoryStateInstance === undefined) {
    reduxDirectoryStateInstance = new ReduxDirectoryState(dispatch)
  }
  return reduxDirectoryStateInstance
}

export const selectFolderContent = (folderMetadata: Pick<Directory.FolderMetadata, 'id'>) => {
  return (state: RootState) => {
    const content: (Directory.FolderMetadata | Directory.FileMetadata)[] = []

    for (const nodeId in state.directory.folderMetadata) {
      const node = state.directory.folderMetadata[nodeId]
      if(node && node.parentId === folderMetadata.id) {
        content.push(node)
      }
    }

    for (const nodeId in state.directory.fileMetadata) {
      const node = state.directory.fileMetadata[nodeId]
      if(node && node.parentId === folderMetadata.id) {
        content.push(node)
      }
    }
  
    return content
  }
}

export const selectFolderMetadata = (folderMetadata: Pick<Directory.FolderMetadata, 'id'>) => {
  return (state: RootState): Directory.FolderMetadata | undefined => {
    return state.directory.folderMetadata[folderMetadata.id]
  }
}

export const selectFileMetadata = (fileMetadata: Pick<Directory.FileMetadata, 'id'>) => {
  return (state: RootState) => {
    return state.directory.fileMetadata[fileMetadata.id]
  }
}

export const selectFileContent = (fileMetadata: Pick<Directory.FileMetadata, 'id'>) => {
  return (state: RootState): Directory.FileContent | undefined => {
    return state.directory.fileContent[fileMetadata.id]
  }
}

export const selectFolderStatus = (folderMetadata: Pick<Directory.FolderMetadata, 'id'>) => {
  return (state: RootState) => {
    return state.directory.folderStatus[folderMetadata.id]
  }
}

export const selectAnsestors = (folderMetadata: Pick<Directory.FolderMetadata, 'id'>) => {
  return (state: RootState) => {
    let currentNode: Directory.FolderMetadata | undefined = state.directory.folderMetadata[folderMetadata.id]
    const ansestors = []
    while(currentNode && currentNode.id !== Directory.RootNode.id) {
      ansestors.push(currentNode)
      currentNode = state.directory.folderMetadata[currentNode.parentId]
    }
    ansestors.push(Directory.RootNode)
    return ansestors.reverse()
  }
}

export const selectFileStatus = (fileMetadata: Pick<Directory.FileMetadata, 'id'>) => {
  return (state: RootState) => {
    return state.directory.fileStatus[fileMetadata.id]
  }
}