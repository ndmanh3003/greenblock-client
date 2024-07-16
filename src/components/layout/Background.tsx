interface IBackground {
  media: number
}

const Background = ({ media }: IBackground) => {
  return (
    <>
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
      {media == 3 && (
        <>
          <img
            src='/hr-bg.jpg'
            className='fixed object-cover h-full w-full -z-40 object-center'
          />
          <div className='fixed h-full w-full bg-black bg-opacity-40 -z-40 backdrop-blur-sm' />
        </>
      )}
    </>
  )
}

export default Background
