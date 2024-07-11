import { useEffect, useState } from 'react'
import Line from '../../components/layout/Line'
import * as Routes from '../../routing/paths'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (
      location.pathname != Routes.BUSINESS &&
      location.pathname != Routes.INSPECTOR
    )
      setPage(1)
    else setPage(0)
  }, [location])

  return (
    <div className='h-full w-full'>
      <header className='py-4 font-medium text-green2'>
        {page ? (
          ' Welcome to our website!'
        ) : (
          <div className='mb-3'>
            <div className='bg-linear1 text-green3 font-semibold px-3 py-[2px] inline rounded-md'>
              {location.pathname
                .replace('/', '')
                .replace(/^./, location.pathname[1].toUpperCase())}
              :
            </div>
            <span className='px-5 font-medium'>VNController CE</span>
          </div>
        )}
        <Line theme='light' />
      </header>
      <Outlet />
    </div>
  )
}

export default Layout
