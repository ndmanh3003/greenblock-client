import { Form } from 'antd'
import InputC from '../../components/form/InputC'
import { ruleEmail, rulePassword } from '../../const/constForm'
import PasswordC from '../../components/form/PasswordC'
import CheckboxC from '../../components/form/CheckboxC'
import SubmitC from './../../components/form/SubmitC'

interface ILogin {
  email: string
  password: string
  isBusiness: boolean
}

export default function Login() {
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
      <CheckboxC
        name='isBusiness'
        placeholder='Check this box if you are a business'
      />
      <SubmitC name='Login' />
    </Form>
  )
}
