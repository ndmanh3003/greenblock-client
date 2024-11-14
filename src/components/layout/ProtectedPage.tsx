import { message } from 'antd'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Routes } from '@/routes'
import { tokensStorage } from '@/service/localStorage'

export const ProtectedPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const auth = tokensStorage.getToken()
    const isLoginPage = window.location.pathname.includes(Routes.LOGIN)
    if (!auth && !isLoginPage) {
      navigate(Routes.LOGIN)
      message.warning('Login to access this page')
    }
  }, [navigate])

  return (
    <>
      <Outlet />
    </>
  )
}
