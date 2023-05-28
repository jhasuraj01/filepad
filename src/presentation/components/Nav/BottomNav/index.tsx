import styles from './index.module.scss'
import { TabBar } from 'antd-mobile'
import { useLocation, useNavigate } from 'react-router-dom'
import { FolderOutline, ContentOutline } from 'antd-mobile-icons'

export interface BottomNavProps {
  className?: string;
}

const tabs = [
  {
    key: '/editor',
    title: 'Editor',
    icon: <ContentOutline />,
  },
  {
    key: '/explorer',
    title: 'Explorer',
    icon: <FolderOutline />,
  },
]

export const BottomNav = ({ className }: BottomNavProps) => {
  const navigate = useNavigate()
  const { pathname: activePath } = useLocation()

  return (
    <TabBar className={`${className ?? ''} ${styles.container}`} activeKey={activePath} onChange={path => navigate(path)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}
