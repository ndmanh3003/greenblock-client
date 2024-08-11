import { Form } from 'antd'
import {
  CheckboxC,
  InputC,
  PasswordC,
  ruleEmail,
  rulePassword,
  SubmitC
} from '../../components'
import { useHandleError, useHandleSuccess } from '../../hooks'
import { tokensStorage } from '../../service/localStorage'
import { ILoginReq, useLoginMutation } from '../../service/store/auth'
import { Routes } from '../../routes'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()

  const { error, data, mutate: login, isPending } = useLoginMutation()
  useHandleError([error])
  useHandleSuccess(data, false, async (data) => {
    await tokensStorage.setToken({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    })

    if (data.isBusiness) navigate(Routes.BUSINESS)
    else navigate(Routes.INSPECTOR)
  })

  const onFinish = async (values: ILoginReq) => {
    values.isBusiness = !!values.isBusiness
    login(values)
  }

  return (
    <Form
      name='login'
      className='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <InputC placeholder='Email' rules={ruleEmail} name='email' />
      <PasswordC name='password' placeholder='Password' rules={rulePassword} />
      <CheckboxC name='isBusiness'>I am a business</CheckboxC>
      <SubmitC loading={isPending}> Log in </SubmitC>
    </Form>
  )
}
