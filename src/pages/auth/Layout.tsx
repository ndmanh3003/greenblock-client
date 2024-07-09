import { Link, Outlet, useLocation } from 'react-router-dom'
import * as Routes from '../../routing/paths'
import { useEffect, useState } from 'react'
import { ConfigProvider } from 'antd'

const _content = [
  {
    name: 'Register',
    footText: 'Already have an account? Login now!',
    link: Routes.LOGIN
  },
  {
    name: 'Login',
    footText: 'You do not have an account? Register now!',
    link: Routes.REGISTER
  }
]

export const cnInput =
  '!py-2 !px-5 !rounded-xl border-white hover:!bg-transparent focus:!bg-transparent !bg-transparent !text-lg'

export default function Layout() {
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(1)

  useEffect(() => {
    if (location.pathname == Routes.LOGIN) setIsLogin(1)
    else setIsLogin(0)
  }, [location])
  return (
    <div className='w-[420px] p-8 m-auto rounded-xl flex flex-col items-center gap-8'>
      <div className='fixed blur-3xl bg-gray-900 bg-opacity-20 w-[600px] h-3/4 max-h-[800px] top-1/2 -translate-y-1/2 -z-10 rounded-full' />
      <img src='/logo-horizontal.svg' className='h-12' />
      <span className='text-white'>Welcome</span>
      <main className='w-full'>
        <ConfigProvider
          theme={{
            token: {
              colorTextPlaceholder: '#ffffffa2',
              colorText: '#ffffff'
            },
            components: {
              Form: {
                marginLG: 27
              }
            }
          }}
        >
          <Outlet />
        </ConfigProvider>
      </main>
      <Link
        className='text-white font-medium -mt-5 hover:text-green1 transition ease-in-out duration-200'
        to={_content[isLogin].link}
      >
        {_content[isLogin].footText}
      </Link>
    </div>
  )
}
