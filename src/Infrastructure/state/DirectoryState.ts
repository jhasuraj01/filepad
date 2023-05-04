import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './app/store'
import { Directory } from '../../domain/entities/Directory'
import { DirectoryState, FileStatus, FolderStatus } from '../../domain/repositories/DirectoryState'
import { AppDispatch } from './app/store'

export interface ExplorerState {
  fileMetadata: Record<Directory.NodeId, Directory.FileMetadata>
  folderMetadata: Record<Directory.NodeId, Directory.FolderMetadata>
  fileContent: Record<Directory.NodeId, Directory.FileContent>
  folderContent: Record<Directory.NodeId, Directory.FileMetadata | Directory.FolderMetadata>
  fileStatus: Record<Directory.NodeId, FileStatus>
  folderStatus: Record<Directory.NodeId, FolderStatus>
}

const initialState: ExplorerState = {
  fileMetadata: {},
  folderMetadata: {},
  fileContent: {},
  folderContent: {},
  fileStatus: {},
  folderStatus: {},
}

export const reduxDirectoryState = createSlice({
  name: 'ReduxDirectoryState',
  initialState,
  reducers: {
    setFolderMetadata(state, { payload }: PayloadAction<Directory.FolderMetadata>) {
      state.folderContent[payload.id] = payload
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

export class ReduxDirectoryState implements DirectoryState {

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