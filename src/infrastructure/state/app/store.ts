import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../counterSlice'
import explorerReducer from '../sideExplorerSlice'
import directoryReducer from '../DirectoryState'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sideExplorer: explorerReducer,
    directory: directoryReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
