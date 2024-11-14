import { Link } from 'react-router-dom'

import { ButtonC, QuickPage } from '@/components'

export const Waitlist = () => (
  <QuickPage title="You're on the Waitlist!">
    We've received your information and will notify you when a spot becomes
    available. Please check your email regularly for updates from us.
    <div>
      <Link to='/'>
        <ButtonC
          className='!text-base !font-semibold !rounded-full mt-10'
          variant='linear'
        >
          Return to Home
        </ButtonC>
      </Link>
    </div>
  </QuickPage>
)
