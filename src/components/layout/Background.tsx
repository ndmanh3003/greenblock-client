import { useWindowWidth } from '@/hooks'

export const Background = ({ media }: { media: 0 | 1 | 2 | 3 }) => {
  const windowWidth = useWindowWidth()

  return (
    <>
      <div className='bg-linear1 fixed h-full w-full -z-[1000]' />
      {media == 1 && (
        <>
          <video
            loop
            muted
            autoPlay={windowWidth >= 1280}
            className='fixed object-cover h-full w-full -z-50 lg:block hidden'
            src='/hp-bg.mp4'
          />
          <img
            className='fixed object-cover h-full w-full -z-50 lg:hidden'
            src='/hp-bg-phone.jpg'
          />
          <div className='fixed h-full w-full bg-black bg-opacity-10 -z-40' />
        </>
      )}
      {media == 2 && (
        <img
          className='fixed object-cover h-full w-full -z-40 object-center'
          src='/auth-bg-dark.png'
        />
      )}
      {media == 3 && (
        <>
          <img
            className='fixed object-cover h-full w-full -z-40 object-center'
            src='/hr-bg.jpg'
          />
          <div className='fixed h-full w-full bg-black bg-opacity-40 -z-40 backdrop-blur-sm' />
        </>
      )}
      {media == 0 && (
        <div className='fixed h-full w-full -z-50 backdrop-blur-sm bg-white'></div>
      )}
    </>
  )
}
