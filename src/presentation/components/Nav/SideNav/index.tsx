import style from './index.module.scss'
import { NavLinkPersist } from '../../../supports/Persistence'
import { FolderOutline, ContentOutline } from 'antd-mobile-icons'

export interface SideNavProps {
  className?: string;
}

export function SideNav({ className }: SideNavProps) {
  return (
    <div className={`${className ?? '' } ${style.container}`}>
      <NavLinkPersist to='/editor' title='Editor' className={({ isActive }) => isActive ? `${style.active} ${style.option}` : `${style.option}`}><ContentOutline /></NavLinkPersist>
      <NavLinkPersist to='/explorer' title='Explorer' className={({ isActive }) => isActive ? `${style.active} ${style.option}` : `${style.option}`}><FolderOutline /></NavLinkPersist>
      {/* <NavLinkPersist to='/search' title='Search' className={({ isActive }) => isActive ? `${style.active} ${style.option}` : `${style.option}`}><SearchIcon /></NavLinkPersist> */}
      {/* <NavLinkPersist to='/settings' title='Settings' className={({ isActive }) => isActive ? `${style.active} ${style.option}` : `${style.option}`}><SettingsGearIcon /></NavLinkPersist> */}
    </div>
  )
}
