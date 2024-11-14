import 'antd/dist/reset.css'
import { message } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { useEffect, useState } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'

import { Background, Float, Footer } from '@/components'
import { Routes } from '@/routes'
import { cn, responsiveScreen } from '@/utils'

NProgress.configure({ showSpinner: false })
message.config({ maxCount: 3, duration: 3 })

export const Layout = () => {
  const location = useLocation()
  const { id } = useParams()
  const [page, setPage] = useState<1 | 2 | 3 | 0>(0)
  const [isWide, setIsWide] = useState(window.innerWidth >= 1280)

  const exceptions = [...responsiveScreen, `${Routes.HOMEPAGE}${id}`]

  const screenMap = {
    [`${Routes.HOMEPAGE}${id}`]: 1,
    [Routes.HOMEPAGE]: 1,
    [Routes.LOGIN]: 2,
    [Routes.REGISTER]: 2,
    [Routes.RECORD]: 3
  }

  useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth >= 1280)
    if (exceptions.some((e) => location.pathname === e)) {
      setIsWide(true)
      return window.removeEventListener('resize', handleResize)
    }
    setIsWide(window.innerWidth >= 1280)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [location, id])

  useEffect(() => {
    const matchingPage = Object.keys(screenMap).find(
      (path) => location.pathname === path
    )

    setPage(matchingPage ? (screenMap[matchingPage] as 1 | 2 | 3) : 0)
  }, [location, id])

  useEffect(() => {
    NProgress.start()
    NProgress.done()
  }, [location])

  return (
    <div
      className={cn('min-h-dvh flex flex-col', {
        'w-[1280px]': !isWide
      })}
    >
      <Background media={page} />
      {page != 1 && <Float />}
      <div
        className={cn(
          'h-fit min-h-full w-full max-w-[1500px] mx-auto flex flex-col justify-between flex-auto relative',
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
