// import { Route, Routes } from 'react-router-dom'
// import { SubNav, SubNavProps } from '../../components/SubNav'
// import { NavigatePersist } from '../../supports/Persistence'

import { SubNav } from '../SubNav'

interface AppSectionProps {
  children: React.ReactNode[]
  title: string
}

export function AppSection({ children, title }: AppSectionProps) {
  const subnavChild = children[0]
  const mainChild = children[1]
  return (
    <>
      <SubNav title={title}>{subnavChild}</SubNav>
      {mainChild}
    </>
  )
}