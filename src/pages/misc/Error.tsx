import { Link, useNavigate } from 'react-router-dom'
import { ButtonC, QuickPage } from '../../components'

export const Error = () => {
  const navigate = useNavigate()
  return (
    <QuickPage title='Sorry, this page is not available!'>
      The content no longer exists,
      <br /> please return to the home page.
      <div className=''>
        <div onClick={() => navigate(-1)}>
          <ButtonC
            variant='linear'
            className='!text-base !font-semibold !rounded-full mt-10'
          >
            Reload Page
          </ButtonC>
        </div>
        <div className='mt-5'>or</div>
        <Link to='/' className='hover:font-semibold transition duration-75'>
          Return to Home
        </Link>
      </div>
    </QuickPage>
  )
}
