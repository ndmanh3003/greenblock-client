import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Line } from '../../components'
import {
  IGetMeRes,
  useGetMeQuery,
  useLogoutMutation
} from '../../service/store/auth'
import { useHandleError, useHandleSuccess } from '../../hooks'
import { useState } from 'react'
import { Routes } from '../../routes'
import { Button, message } from 'antd'
import { tokensStorage } from '../../service/localStorage'

export const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [info, setInfo] = useState<IGetMeRes>()

  const { data, error } = useGetMeQuery()
  useHandleSuccess(data, false, (data) => {
    setInfo(data)
    if (
      (location.pathname.includes(Routes.BUSINESS) && !data.isBusiness) ||
      (location.pathname.includes(Routes.INSPECTOR) && data.isBusiness)
    ) {
      message.warning('You are not authorized to access this page')
      navigate('')
    }
  })

  const {
    mutate: logout,
    error: errorLogout,
    data: dataLogout,
    isPending
  } = useLogoutMutation()
  useHandleError([errorLogout, error])
  useHandleSuccess(dataLogout, true, () => navigate(''))

  return (
    <div className='h-full w-full'>
      <header className='py-4 font-medium text-green2'>
        <div className='mb-3 flex justify-between items-center'>
          <div>
            <div className='bg-linear1 text-green3 font-semibold px-3 py-[2px] inline rounded-md'>
              {info?.isBusiness ? 'Business' : 'Inspector'}:
            </div>
            <span className='px-5 font-medium'>{info?.name}</span>
          </div>
          <Button
            className='!font-semibold !text-green2 !text-base !mr-2'
            onClick={() => {
              tokensStorage.removeToken()
              logout()
            }}
            type='link'
            loading={isPending}
          >
            Logout
          </Button>
        </div>
        <Line theme='light' />
      </header>
      <Outlet />
    </div>
  )
}
