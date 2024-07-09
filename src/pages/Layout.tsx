import { Link, Outlet, useLocation } from 'react-router-dom'
import { Tooltip } from 'antd'
import styled from 'styled-components'
import 'antd/dist/reset.css'
import { useEffect, useState } from 'react'
import * as Routes from '../routing/paths'

const Styled = styled.div`
  .ant-tooltip-inner {
    background-color: #21ba43;
    font-weight: 500;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    margin: 10px;
  }
`

export default function Layout() {
  const location = useLocation()
  const [media, setMedia] = useState(0)

  useEffect(() => {
    if (location.pathname == Routes.HOMEPAGE) setMedia(1)
    else if (
      location.pathname == Routes.LOGIN ||
      location.pathname == Routes.REGISTER
    )
      setMedia(2)
    else if (location.pathname == Routes.HR) setMedia(3)
    else setMedia(0)
  }, [location])

  return (
    <div className='w-full h-screen'>
      {media == 1 && (
        <>
          <video
            src='/hp-bg.mp4'
            className='fixed object-cover h-full w-full -z-50'
            autoPlay
            loop
            muted
          />
          <div className='fixed h-full w-full bg-black bg-opacity-40 -z-40' />
        </>
      )}
      {media == 2 && (
        <img
          src='/auth-bg-dark.png'
          className='fixed object-cover h-full w-full -z-40 object-center'
        />
      )}
      {media != 1 && (
        //! Button return to home
        <div className='fixed bottom-10 right-10 cursor-pointer w-14 h-14 z-50'>
          <Link to={Routes.HOMEPAGE}>
            <Styled>
              <Tooltip
                zIndex={9999}
                title='Return to Home'
                getPopupContainer={(triggerNode) => triggerNode}
                arrow={false}
                placement='left'
              >
                <div className='bg-transparent text-transparent absolute z-10 w-full h-full'>
                  Sample
                </div>
              </Tooltip>
            </Styled>
          </Link>
          <img src='/logo.svg' className='absolute w-full h-full z-0' />
        </div>
      )}
      <div className='h-fit min-h-full w-full max-w-[1500px] mx-auto px-14 flex flex-col justify-between'>
        <Outlet />
      </div>
      {media != 1 && (
        <footer className='w-full bg-black bg-opacity-40 text-center py-1 text-sm text-white'>
          © 2024 Copyright does not belong to GreenBlock - The traceability
          platform for Vietnam's agriculture
        </footer>
      )}
    </div>
  )
}
