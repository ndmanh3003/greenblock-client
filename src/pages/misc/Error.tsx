import { Link, useNavigate } from 'react-router-dom'

import { ButtonC, QuickPage } from '@/components'

export const Error = () => {
  const navigate = useNavigate()

  return (
    <QuickPage title='Sorry, this page is not available!'>
      The content no longer exists,
      <br /> please return to the home page.
      <div className=''>
        <div onClick={() => navigate(-1)}>
          <ButtonC
            className='!text-base !font-semibold !rounded-full mt-10'
            variant='linear'
          >
            Reload Page
          </ButtonC>
        </div>
        <div className='mt-5'>or</div>
        <Link className='hover:font-semibold transition duration-75' to='/'>
          Return to Home
        </Link>
      </div>
    </QuickPage>
  )
}
