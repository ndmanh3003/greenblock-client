import { Outlet, useLocation, useParams } from 'react-router-dom'
import 'antd/dist/reset.css'
import { useEffect, useState } from 'react'
import { Background, Float, Footer } from '../components'
import { message } from 'antd'
import { Routes } from '../routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { cn } from '../utils'

NProgress.configure({ showSpinner: false })
message.config({ maxCount: 3, duration: 3 })

export const Layout = () => {
  const location = useLocation()
  const { id } = useParams()
  const [page, setPage] = useState(0)
  const [isWide, setIsWide] = useState(window.innerWidth >= 1280)

  useEffect(() => {
    console.log('effect')
    const exceptions = [
      Routes.HOMEPAGE,
      Routes.LOGIN,
      Routes.REGISTER,
      `${Routes.HOMEPAGE}${id}`
    ]
    const handleResize = () => {
      console.log('resize')
      setIsWide(window.innerWidth >= 1280)
    }
    if (exceptions.some((e) => location.pathname === e)) {
      console.log('set wide')
      setIsWide(true)
      return window.removeEventListener('resize', handleResize)
    }
    setIsWide(window.innerWidth >= 1280)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [location, id])

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
    <div
      className={cn('w-full h-screen', {
        'w-[1280px]': !isWide
      })}
    >
      <Background media={page} />
      {page != 1 && <Float />}
      <div
        className={cn(
          'h-fit min-h-full w-full max-w-[1500px] mx-auto flex flex-col justify-between',
          {
            'lg:px-14': isWide,
            'px-14': !isWide
          }
        )}
      >
        <Outlet />
      </div>
      {page != 1 && <Footer />}
    </div>
  )
}
