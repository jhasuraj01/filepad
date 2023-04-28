import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { FolderMetadata } from '../../../domain/entities/DirectoryNode'
import { rootFolder } from '../../../adapters/FileStorageAdapter'

export interface ExplorerState {
  expanded: Record<string, boolean>
  workspace: FolderMetadata
}

const folderUUID = (metadata: FolderMetadata) => `${metadata.database}/${metadata.id}`

const initialState: ExplorerState = {
  expanded: {},
  workspace: rootFolder
}

export const sideExplorerSlice = createSlice({
  name: 'sideExplorer',
  initialState,
  reducers: {
    toggleExpansion(state, { payload }: PayloadAction<FolderMetadata>) {
      const folder = payload
      state.expanded[folderUUID(folder)] = !state.expanded[folderUUID(folder)]
    },
    expand(state, { payload }: PayloadAction<FolderMetadata>) {
      const folder = payload
      state.expanded[folderUUID(folder)] = true
    },
    collapse(state, { payload }: PayloadAction<FolderMetadata>) {
      const folder = payload
      state.expanded[folderUUID(folder)] = false
    }
  },
})

export const { expand, collapse, toggleExpansion } = sideExplorerSlice.actions

export const selectFolderExpansionState = (metadata: FolderMetadata) => (state: RootState) => Boolean(state.sideExplorer.expanded[folderUUID(metadata)])
export const selectWorkspace = (state: RootState) => state.sideExplorer.workspace

export default sideExplorerSlice.reducer