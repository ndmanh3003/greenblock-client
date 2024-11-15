import { Link } from 'react-router-dom'

import { ButtonC, QuickPage } from '@/components'

export const Notfound = () => (
  <QuickPage title='404 Not Found'>
    Sorry, the page you are looking for does not exist.
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
