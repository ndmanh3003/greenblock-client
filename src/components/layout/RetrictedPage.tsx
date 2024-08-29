import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { tokensStorage } from '../../service/localStorage'
import { message } from 'antd'
import { Routes } from '../../routes'

export const RetrictedPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const auth = tokensStorage.getToken()
    const isLogoutPage = window.location.pathname === Routes.LOGOUT
    if (auth && !isLogoutPage) {
      navigate(Routes.LOGOUT)
      message.warning('You are already logged in')
    }
  }, [navigate])

  return (
    <>
      <Outlet />
    </>
  )
}
