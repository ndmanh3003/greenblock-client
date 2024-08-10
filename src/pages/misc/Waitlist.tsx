import { Link } from 'react-router-dom'
import { ButtonC } from '../../components'

export const Waitlist = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center text-white'>
      <h1 className='text-5xl font-extrabold bg-linear2 inline-block text-transparent bg-clip-text'>
        You're on the Waitlist!
      </h1>
      <div className='w-[500px] text-center leading-relaxed text-lg'>
        We've received your information and will notify you when a spot becomes
        available. Please check your email regularly for updates from us.
      </div>

      <Link to='/'>
        <ButtonC
          variant='linear'
          className='!text-base !font-semibold !rounded-full mt-10'
        >
          Return to Home
        </ButtonC>
      </Link>
    </div>
  )
}
