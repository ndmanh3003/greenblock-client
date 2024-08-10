import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { tokensStorage } from '../../service/localStorage'
import { message } from 'antd'

export const RetrictedPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const auth = tokensStorage.getToken()
    if (auth) {
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
