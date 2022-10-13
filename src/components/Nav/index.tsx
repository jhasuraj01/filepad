import style from './index.module.scss'
import { ReactComponent as FilesIcon } from '../../icons/files.svg'
import { ReactComponent as SearchIcon } from '../../icons/search.svg'
import { ReactComponent as SettingsGearIcon } from '../../icons/settings-gear.svg'
import { NavLinkPersist } from '../../supports/Persistence'

export function Nav() {
  return (
    <div className={style.container}>
      <NavLinkPersist to='/' className={style.option}><FilesIcon /></NavLinkPersist>
      <NavLinkPersist to='/search' className={style.option}><SearchIcon /></NavLinkPersist>
      <NavLinkPersist to='/settings' className={style.option}><SettingsGearIcon /></NavLinkPersist>
    </div>
  )
}
