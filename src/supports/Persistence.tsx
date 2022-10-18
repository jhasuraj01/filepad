import React, { useEffect } from 'react'
import { Navigate, NavigateProps, NavLink, NavLinkProps, useLocation, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { RootState } from '../app/store'

interface Props {
  children: React.ReactNode
}

export function PersistSelectedStates({ children }: Props) {
  const state = useAppSelector((state: RootState) => state)
  const [searchParams, setSearchParams] = useSearchParams()

  const count = String(state.counter.value)

  useEffect(() => {

    searchParams.set('count', count)
    // Add more params here

    setSearchParams(searchParams)
  }, [setSearchParams, searchParams, count])

  return (<> { children } </>)
}

export function NavLinkPersist(props: NavLinkProps ) {
  const { search } = useLocation()

  return (<>
    <NavLink {...{...props, to: `${props.to}${search}`}}>{ props.children }</NavLink>
  </>)
}

export function NavigatePersist(props: NavigateProps) {
  const { search } = useLocation()

  return (<>
    <Navigate {...{...props, to: `${props.to}${search}`}} />
  </>)
}