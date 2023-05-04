import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './app/store'
import { Directory } from '../../domain/entities/Directory'

export interface ExplorerState {
  expanded: Record<string, boolean>
  workspace: Directory.FolderMetadata
}

const folderUUID = (metadata: Directory.FolderMetadata) => `${metadata.id}`

const initialState: ExplorerState = {
  expanded: {},
  workspace: Directory.RootNode
}

export const sideExplorerSlice = createSlice({
  name: 'sideExplorer',
  initialState,
  reducers: {
    toggleExpansion(state, { payload }: PayloadAction<Directory.FolderMetadata>) {
      const folder = payload
      state.expanded[folderUUID(folder)] = !state.expanded[folderUUID(folder)]
    },
    expand(state, { payload }: PayloadAction<Directory.FolderMetadata>) {
      const folder = payload
      state.expanded[folderUUID(folder)] = true
    },
    collapse(state, { payload }: PayloadAction<Directory.FolderMetadata>) {
      const folder = payload
      state.expanded[folderUUID(folder)] = false
    }
  },
})

export const { expand, collapse, toggleExpansion } = sideExplorerSlice.actions

export const selectFolderExpansionState = (metadata: Directory.FolderMetadata) => (state: RootState) => Boolean(state.sideExplorer.expanded[folderUUID(metadata)])
export const selectWorkspace = (state: RootState) => state.sideExplorer.workspace

export default sideExplorerSlice.reducer