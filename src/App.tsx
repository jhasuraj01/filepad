import { Nav } from './components/Nav'
import { SubNav } from './components/SubNav'
import { Explorer } from './features/Explorer'
import { EditorArea } from './components/EditorArea'
import style from './App.module.scss'
import { FolderInterface } from './interfaces/Folder'
import { Route, Routes, Navigate } from 'react-router-dom'

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

function App() {
  return (
    <div className={style.container}>
      <Nav />
      <Routes>
        <Route path='/' element={<Navigate to="/files" />} />
        <Route path='/files' element={<SubNav title={'Explorer: ' + folder.name}><Explorer filesAndFolders={folder.child} /></SubNav>} />
        <Route path='/search' element={<SubNav title='Search'>Search</SubNav>} />
        <Route path='/settings' element={<SubNav title='Settings'>Settings</SubNav>} />
      </Routes>
      <EditorArea />
    </div>
  )
}

export default App
