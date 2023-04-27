import { Nav } from './components/Nav'
import style from './App.module.scss'
import { Route, Routes } from 'react-router-dom'
import { NavigatePersist } from './supports/Persistence'
import { EditorPage } from './pages/editor'
import { ExplorerPage } from './pages/explorer'
import { SearchPage } from './pages/search'
import { SettingsPage } from './pages/settings'

function App() {
  return (
    <div className={style.container}>
      <Nav />
      <Routes>
        <Route path='/' element={<NavigatePersist to="/editor" />} />
        <Route path='/editor' element={<EditorPage />} />
        <Route path='/editor/:database/:fileId' element={<EditorPage />} />
        <Route path='/explorer/' element={<ExplorerPage />} />
        <Route path='/explorer/:database/:parentId' element={<ExplorerPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
    </div>
  )
}

export default App
