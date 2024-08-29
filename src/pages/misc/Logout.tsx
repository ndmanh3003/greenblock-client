import { Link, useNavigate } from 'react-router-dom'
import { ButtonC, QuickPage } from '../../components'
import { useHandleError, useHandleSuccess } from '../../hooks'
import { tokensStorage } from '../../service/localStorage'
import { useLogoutMutation } from '../../service/store/auth'
import { Routes } from '../../routes'

export const Logout = () => {
  const navigate = useNavigate()
  const { mutate, error, data, isPending } = useLogoutMutation()
  useHandleError([error])
  useHandleSuccess(data, true, () => navigate(0))

  return (
    <QuickPage title='You are already logged in'>
      To continue, please logout first. This page will automatically redirect
      <div>
        <ButtonC
          disabled={isPending}
          variant='linear'
          className='!text-base !font-semibold !rounded-full mt-10'
          onClick={() => {
            tokensStorage.removeToken()
            mutate()
          }}
        >
          Logout and Continue
        </ButtonC>
        <div className='mt-5'>or</div>
        <Link
          to={Routes.INSPECTOR}
          className='hover:font-semibold transition duration-75'
        >
          Go to Workspaces
        </Link>
      </div>
    </QuickPage>
  )
}
