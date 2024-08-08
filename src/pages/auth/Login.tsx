import { Form } from 'antd'
import {
  CheckboxC,
  InputC,
  PasswordC,
  ruleEmail,
  rulePassword,
  SubmitC
} from '../../components/form'

interface ILogin {
  email: string
  password: string
  isBusiness: boolean
}

export const Login = () => {
  const onFinish = (values: ILogin) => {
    values.isBusiness = values.isBusiness ? true : false
    console.log('Received values of form: ', values)
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
      <SubmitC> Log in </SubmitC>
    </Form>
  )
}
