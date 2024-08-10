import { Form } from 'antd'
import {
  CheckboxC,
  InputC,
  PasswordC,
  ruleEmail,
  rulePassword,
  SubmitC
} from '../../components'
import { useHandleError } from '../../hooks'
import { useLoginMutation } from '../../service/store/auth/auth.query'

interface ILogin {
  email: string
  password: string
  isBusiness: boolean
}

export const Login = () => {
  const { error, mutate: loginApi, isPending } = useLoginMutation()

  useHandleError([error])

  const onFinish = async (values: ILogin) => {
    values.isBusiness = !!values.isBusiness
    loginApi(values)
  }

  return (
    <Form
      name='login'
      className='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete='off'
    >
      <InputC placeholder='Email' rules={ruleEmail} name='email' />
      <PasswordC name='password' placeholder='Password' rules={rulePassword} />
      <CheckboxC name='isBusiness'>I am a business</CheckboxC>
      <SubmitC loading={isPending}> Log in </SubmitC>
    </Form>
  )
}
