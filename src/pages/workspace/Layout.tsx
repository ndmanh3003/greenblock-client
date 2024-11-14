import { Button, message } from 'antd'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Line } from '@/components'
import { useAppDispatch, useAppSelector, useHandleSuccess } from '@/hooks'
import { Routes } from '@/routes'
import { useGetMeQuery, useLogoutMutation } from '@/service/api/auth'
import { selectUser, setAccount } from '@/service/store/user'

export const Layout = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const location = useLocation()

  const { data, isLoading } = useGetMeQuery()
  useHandleSuccess(data, false, (data) => {
    dispatch(setAccount(data))
  })

  const { mutate, isPending } = useLogoutMutation()

  useEffect(() => {
    if (!user.name) {
      return
    }

    if (location.pathname.includes(Routes.BUSINESS) !== user.isBusiness) {
      mutate()
      message.error('You are not authorized to access this page')
    }
  }, [user])

  return (
    <div className='h-full w-full'>
      <header className='py-4 font-medium text-green2'>
        <div className='mb-3 flex justify-between items-center'>
          <div>
            <div className='bg-linear1 text-green3 font-semibold px-3 py-[2px] inline rounded-md'>
              {user?.isBusiness ? 'Business' : 'Inspector'}:
            </div>
            <span className='px-5 font-medium'>{user?.name}</span>
          </div>
          <Button
            className='!font-semibold !text-green2 !text-base !mr-2'
            loading={isPending || isLoading}
            type='link'
            onClick={() => mutate()}
          >
            Logout
          </Button>
        </div>
        <Line theme='light' />
      </header>
      {data && <Outlet />}
    </div>
  )
}
