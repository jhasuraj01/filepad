import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface ExplorerState {
  expanded: Record<string, boolean>
}

const initialState: ExplorerState = {
  expanded: {}
}

export const sideExplorerSlice = createSlice({
  name: 'sideExplorer',
  initialState,
  reducers: {
    toggleExpansion(state, { payload }: PayloadAction<string>) {
      const folder = payload
      state.expanded[folder] = !state.expanded[folder]
    },
    expand(state, { payload }: PayloadAction<string>) {
      const folder = payload
      state.expanded[folder] = true
    },
    collapse(state, { payload }: PayloadAction<string>) {
      const folder = payload
      state.expanded[folder] = false
    }
  },
})

export const { expand, collapse, toggleExpansion } = sideExplorerSlice.actions

export const selectFolderExpansionState = (id: string) => (state: RootState) => Boolean(state.sideExplorer.expanded[id])

export default sideExplorerSlice.reducer
