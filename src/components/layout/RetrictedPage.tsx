import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { tokensStorage } from '../../service/localStorage'
import { message } from 'antd'

export const RetrictedPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const auth = tokensStorage.getToken()
    const isHomePage = window.location.pathname === '/'
    if (auth && !isHomePage) {
      navigate('')
      message.warning('You are already logged in')
    }
  }, [navigate])

  return (
    <>
      <Outlet />
    </>
  )
}
