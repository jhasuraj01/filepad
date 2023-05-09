import React, { useEffect } from 'react'
import { Navigate, NavigateOptions, NavigateProps, NavLink, NavLinkProps, To, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../infrastructure/state/app/hooks'
import { RootState } from '../../infrastructure/state/app/store'

interface Props {
  children: React.ReactNode
}

export function PersistSelectedStates({ children }: Props) {
  const state = useAppSelector((state: RootState) => state)
  const [searchParams, setSearchParams] = useSearchParams()

  const count = String(state.counter.value)

  useEffect(() => {

    // searchParams.set('count', count)
    // Add more params here

    setSearchParams(searchParams)
  }, [count])

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
    <Navigate {...{replace: true, ...props, to: `${props.to}${search}`}} />
  </>)
}

export function useNavigatePersist() {
  const navigate = useNavigate()
  const { search: oldSearch, hash: oldHash } = useLocation()

  const navigateProxy = (to: To, options?: NavigateOptions | undefined) => {

    let pathname: string | undefined = ''
    let search: string | undefined = ''
    let hash: string | undefined = ''

    if(typeof to == 'string') {
      const link = mergeLink(to, oldSearch)
      pathname = to.split('?')[0]
      search = link.search
      hash = oldHash
    }
    else {
      pathname = to.pathname
      search = to.search !== undefined ? to.search : oldSearch
      hash = to.hash !== undefined ? to.hash : oldHash
    }

    navigate({ pathname, search, hash }, options)
  }

  return navigateProxy
}

function mergeLink(to: string, oldSearch: string) {
  const url = new URL(to, new URL(location.href))
  const oldSearchObj = Object.fromEntries(new URLSearchParams(oldSearch).entries())
  const newSearchObj = Object.fromEntries(new URLSearchParams(url.search).entries())
  const pathname = url.pathname
  const search = new URLSearchParams({...oldSearchObj, ...newSearchObj}).toString()

  return { pathname, search }
}