import { Outlet, useLocation, useParams } from 'react-router-dom'
import 'antd/dist/reset.css'
import { useEffect, useState } from 'react'
import { Background, Float, Footer } from '../components'
import { message } from 'antd'
import { Routes } from '../routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
message.config({ maxCount: 3, duration: 3 })

export const Layout = () => {
  const location = useLocation()
  const { id } = useParams()
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (
      location.pathname == `${Routes.HOMEPAGE}${id}` ||
      location.pathname == Routes.HOMEPAGE
    )
      setPage(1)
    else if (
      location.pathname.includes(Routes.LOGIN) ||
      location.pathname.includes(Routes.REGISTER)
    )
      setPage(2)
    else if (location.pathname.includes(Routes.RECORD)) setPage(3)
    else setPage(0)
  }, [location, id])

  useEffect(() => {
    NProgress.start()
    NProgress.done()
  }, [location])

  return (
    <div className='w-full h-screen'>
      <Background media={page} />
      {page != 1 && <Float />}
      <div className='h-fit min-h-full w-full max-w-[1500px] mx-auto lg:px-14 flex flex-col justify-between'>
        <Outlet />
      </div>
      {page != 1 && <Footer />}
    </div>
  )
}
