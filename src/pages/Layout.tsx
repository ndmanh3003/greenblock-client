import { Outlet, useLocation } from 'react-router-dom'
import 'antd/dist/reset.css'
import { useEffect, useState } from 'react'
import { Background, Float, Footer } from '../components'
import { message } from 'antd'
import { Routes } from '../routes'

export const Layout = () => {
  const location = useLocation()
  const [page, setPage] = useState(0)
  message.config({ maxCount: 3, duration: 2 })

  useEffect(() => {
    if (
      location.pathname == Routes.HOMEPAGE ||
      location.pathname == Routes.WAITLIST
    )
      setPage(1)
    else if (
      location.pathname == Routes.LOGIN ||
      location.pathname == Routes.REGISTER
    )
      setPage(2)
    else if (location.pathname == Routes.RECORD) setPage(3)
    else setPage(0)
  }, [location])

  return (
    <div className='w-full h-screen'>
      <Background media={page} />
      {page != 1 && <Float />}
      <div className='h-fit min-h-full w-full max-w-[1500px] mx-auto px-14 flex flex-col justify-between'>
        <Outlet />
      </div>
      {page != 1 && <Footer />}
    </div>
  )
}
