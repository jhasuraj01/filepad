// import { Route, Routes } from 'react-router-dom'
// import { SubNav, SubNavProps } from '../../components/SubNav'
// import { NavigatePersist } from '../../supports/Persistence'

interface AppSectionProps {
  subnav: React.ReactNode
  main: React.ReactNode
}

export function AppSection({ subnav, main }: AppSectionProps) {
  return (
    <>
      {subnav}
      {main}
    </>
  )
}