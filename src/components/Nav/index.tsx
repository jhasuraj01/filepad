import style from './index.module.scss'
import { ReactComponent as FilesIcon } from '../../icons/files.svg'
import { ReactComponent as SearchIcon } from '../../icons/search.svg'
import { ReactComponent as SettingsGearIcon } from '../../icons/settings-gear.svg'
import { ReactComponent as RootFolderIcon } from '../../icons/root-folder.svg'
import { NavLinkPersist } from '../../supports/Persistence'

export function Nav() {
  return (
    <div className={style.container}>
      <NavLinkPersist to='/editor' title='Files' className={({ isActive }) => isActive ? `${style.active} ${style.option}` : `${style.option}`}><FilesIcon /></NavLinkPersist>
      <NavLinkPersist to='/explorer' title='Folders' className={({ isActive }) => isActive ? `${style.active} ${style.option}` : `${style.option}`}><RootFolderIcon /></NavLinkPersist>
      <NavLinkPersist to='/search' title='Search' className={({ isActive }) => isActive ? `${style.active} ${style.option}` : `${style.option}`}><SearchIcon /></NavLinkPersist>
      <NavLinkPersist to='/settings' title='Settings' className={({ isActive }) => isActive ? `${style.active} ${style.option}` : `${style.option}`}><SettingsGearIcon /></NavLinkPersist>
    </div>
  )
}
