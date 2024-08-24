import { useEffect, useState } from 'react'

export const Background = ({ media }: { media: number }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {media == 1 && (
        <>
          <video
            src='/hp-bg.mp4'
            className='fixed object-cover h-full w-full -z-50 lg:block hidden'
            autoPlay={windowWidth >= 1280}
            loop
            muted
          />
          <img
            src='/hp-bg-phone.jpg'
            className='fixed object-cover h-full w-full -z-50 lg:hidden'
          />
          <div className='fixed h-full w-full bg-black bg-opacity-10 -z-40' />
        </>
      )}
      {media == 2 && (
        <img
          src='/auth-bg-dark.png'
          className='fixed object-cover h-full w-full -z-40 object-center'
        />
      )}
      {media == 3 && (
        <>
          <img
            src='/hr-bg.jpg'
            className='fixed object-cover h-full w-full -z-40 object-center'
          />
          <div className='fixed h-full w-full bg-black bg-opacity-40 -z-40 backdrop-blur-sm' />
        </>
      )}
      {media == 0 && (
        <div className='fixed h-full w-full -z-50 backdrop-blur-sm'></div>
      )}
    </>
  )
}
