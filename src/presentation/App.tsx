import { Nav } from './components/Nav'
import style from './App.module.scss'
import { Route, Routes } from 'react-router-dom'
import { NavigatePersist } from './supports/Persistence'
import { EditorPage } from './pages/editor'
import { ExplorerPage } from './pages/explorer'
import { SearchPage } from './pages/search'
import { SettingsPage } from './pages/settings'
import 'antd/dist/reset.css'

function App() {
  return (
    <div className={style.container}>
      <Nav />
      <Routes>
        <Route path='/' element={<NavigatePersist to="/explorer" />} />
        <Route path='/editor' element={<EditorPage />} />
        <Route path='/editor/:workspaceId' element={<EditorPage />} />
        <Route path='/editor/:workspaceId/:fileId' element={<EditorPage />} />
        <Route path='/explorer/' element={<ExplorerPage />} />
        <Route path='/explorer/:parentId/:folderId' element={<ExplorerPage />} />
        {/* <Route path='/search' element={<SearchPage />} /> */}
        {/* <Route path='/settings' element={<SettingsPage />} /> */}
      </Routes>
    </div>
  )
}

export default App
