import style from './index.module.scss'
import { ReactComponent as FilesIcon } from '../../icons/files.svg'
import { ReactComponent as SearchIcon } from '../../icons/search.svg'
import { ReactComponent as SettingsGearIcon } from '../../icons/settings-gear.svg'

export function Nav() {
  return (
    <div className={style.container}>
      <div className={style.option}><FilesIcon /></div>
      <div className={style.option}><SearchIcon /></div>
      <div className={style.option}><SettingsGearIcon /></div>
    </div>
  )
}
