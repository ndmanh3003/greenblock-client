import { Outlet, useLocation } from 'react-router-dom'
import 'antd/dist/reset.css'
import { useEffect, useState } from 'react'
import * as Routes from '../routing/paths'
import Float from '../components/layout/Float'
import Footer from '../components/layout/Footer'
import Background from '../components/layout/Background'

export default function Layout() {
  const location = useLocation()
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (location.pathname == Routes.HOMEPAGE) setPage(1)
    else if (
      location.pathname == Routes.LOGIN ||
      location.pathname == Routes.REGISTER
    )
      setPage(2)
    else if (location.pathname == Routes.HR) setPage(3)
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
