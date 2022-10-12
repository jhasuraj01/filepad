import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface FolderState {
  isExpanded: boolean,
}

const initialState: FolderState = {
  isExpanded: false,
}

export const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    expand(state) {
      state.isExpanded = true
    },
    collapse(state) {
      state.isExpanded = false
    },
    toggleExpansion(state) {
      state.isExpanded = !state.isExpanded
    }
  },
})

export const { expand, collapse, toggleExpansion } = folderSlice.actions

export const selectIsExpanded = (state: RootState) => state.folder.isExpanded

export default folderSlice.reducer
