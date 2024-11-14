import { Link } from 'react-router-dom'

import { ButtonC, QuickPage } from '@/components'
import { useAppSelector } from '@/hooks'
import { Routes } from '@/routes'
import { useLogoutMutation } from '@/service/api/auth'
import { selectRole } from '@/service/store/user'

export const Logout = () => {
  const isBusiness = useAppSelector(selectRole)

  const { mutate, isPending } = useLogoutMutation()

  return (
    <QuickPage title='You are already logged in'>
      To continue, please logout first. This page will automatically redirect
      <div>
        <ButtonC
          className='!text-base !font-semibold !rounded-full mt-10'
          disabled={isPending}
          variant='linear'
          onClick={() => mutate()}
        >
          Logout and Continue
        </ButtonC>
        <div className='mt-5'>or</div>
        <Link
          className='hover:font-semibold transition duration-75'
          to={isBusiness ? Routes.BUSINESS : Routes.INSPECTOR}
        >
          Go to Workspaces
        </Link>
      </div>
    </QuickPage>
  )
}
