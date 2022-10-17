import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface ExplorerState {
  expanded: Record<string, boolean>
}

const initialState: ExplorerState = {
  expanded: {}
}

export const explorerSlice = createSlice({
  name: 'explorer',
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

export const { expand, collapse, toggleExpansion } = explorerSlice.actions

export const selectFolderExpansionState = (id: string) => (state: RootState) => Boolean(state.explorer.expanded[id])

export default explorerSlice.reducer
