import { Nav } from './components/Nav'
import style from './App.module.scss'
import { FolderInterface } from './libs/FolderNode'
import { Route, Routes } from 'react-router-dom'
import { DirectoryTree } from './libs/DirectoryTree'
import { NavigatePersist } from './supports/Persistence'
import { EditorPage } from './pages/editor'
import { ExplorerPage } from './pages/explorer'
import { SearchPage } from './pages/search'
import { SettingsPage } from './pages/settings'

const folder: FolderInterface = {
  type: 'folder',
  name: 'My Personal Folder',
  id: '0',
  child: [
    {
      type: 'file',
      name: 'suraj.txt',
      id: '1',
    },
    {
      type: 'folder',
      name: 'Projects',
      id: '2',
      child: [
        {
          type: 'file',
          name: 'suraj.txt',
          id: '3',
        },
        {
          type: 'folder',
          name: 'personal-projects',
          id: '4',
          child: [
            {
              type: 'file',
              name: 'suraj.txt',
              id: '5',
            },
            {
              type: 'folder',
              name: 'projects',
              id: '6',
              child: [
                {
                  type: 'file',
                  name: 'suraj.txt',
                  id: '7',
                },
                {
                  type: 'folder',
                  name: 'personal-projects',
                  id: '8',
                  child: []
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'file',
      name: 'suraj2.txt',
      id: '10',
    },
    {
      type: 'folder',
      name: 'Projects 2',
      id: '20',
      child: [
        {
          type: 'file',
          name: 'suraj.txt',
          id: '30',
        },
        {
          type: 'folder',
          name: 'personal-projects',
          id: '40',
          child: [
            {
              type: 'file',
              name: 'suraj.txt',
              id: '50',
            },
            {
              type: 'folder',
              name: 'projects',
              id: '60',
              child: [
                {
                  type: 'file',
                  name: 'suraj.txt',
                  id: '70',
                },
                {
                  type: 'folder',
                  name: 'personal-projects',
                  id: '80',
                  child: []
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const workspace = new DirectoryTree(folder).tree

function App() {
  return (
    <div className={style.container}>
      <Nav />
      <Routes>
        <Route path='/' element={<NavigatePersist to="/editor" />} />
        <Route path='/editor' element={<EditorPage workspace={workspace} />} />
        <Route path='/explorer' element={<ExplorerPage workspace={workspace} />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
    </div>
  )
}

export default App
