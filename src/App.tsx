import { Nav } from './components/Nav'
import { SubNav } from './components/SubNav'
import { EditorArea } from './components/EditorArea'
import style from './App.module.scss'
import { FolderInterface } from './interfaces/Folder'
import { FilesAndFolders, Folder } from './features/folder/Folder'
import { Route, Routes, Navigate } from 'react-router-dom'

const folder: FolderInterface = {
  type: 'folder',
  name: 'My Personal Folder',
  child: [
    {
      type: 'file',
      name: 'suraj.txt',
    },
    {
      type: 'folder',
      name: 'projects',
      child: [
        {
          type: 'file',
          name: 'suraj.txt',
        },
        {
          type: 'folder',
          name: 'personal-projects',
          child: [
            {
              type: 'file',
              name: 'suraj.txt',
            },
            {
              type: 'folder',
              name: 'projects',
              child: [
                {
                  type: 'file',
                  name: 'suraj.txt',
                },
                {
                  type: 'folder',
                  name: 'personal-projects',
                  child: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

function App() {
  return (
    <div className={style.container}>
      <Nav />
      <Routes>
        <Route path='/' element={<Navigate to="/files" />} />
        <Route path='/files' element={<SubNav title={'WorkSpace: ' + folder.name}><FilesAndFolders filesAndFolders={folder.child} /></SubNav>} />
        <Route path='/search' element={<SubNav title='Search'>Search</SubNav>} />
        <Route path='/settings' element={<SubNav title='Settings'>Settings</SubNav>} />
      </Routes>
      <EditorArea />
    </div>
  )
}

export default App
