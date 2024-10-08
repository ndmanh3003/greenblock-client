import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { tokensStorage } from '../../service/localStorage'
import { message } from 'antd'
import { Routes } from '../../routes'

export const ProtectedPage = () => {
  const navigate = useNavigate()
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const auth = tokensStorage.getToken()
    const isLoginPage = window.location.pathname.includes(Routes.LOGIN)
    if (!auth && !isLoginPage) {
      navigate(Routes.LOGIN)
      message.warning('Login to access this page')
    }

    setIsShow(true)
  }, [navigate])

  return <>{isShow && <Outlet />}</>
}
