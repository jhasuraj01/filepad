import { Nav } from './components/Nav'
import { SubNav } from './components/SubNav'
import { EditorArea } from './components/EditorArea'
import style from './App.module.scss'

function App() {
  return (
    <div className={style.container}>
      <Nav />
      <SubNav />
      <EditorArea />
    </div>
  )
}

export default App
