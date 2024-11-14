import { Form } from 'antd'
import { useNavigate } from 'react-router-dom'

import {
  CheckboxC,
  InputC,
  PasswordC,
  SubmitC,
  ruleEmail,
  rulePassword
} from '@/components'
import { useHandleSuccess } from '@/hooks'
import { Routes } from '@/routes'
import { ILoginReq, useLoginMutation } from '@/service/api/auth'
import { tokensStorage } from '@/service/localStorage'

export const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { data, mutate, isPending } = useLoginMutation()
  useHandleSuccess(data, false, async (data) => {
    await tokensStorage.setToken({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    })

    const isBusiness = form.getFieldsValue().isBusiness
    if (isBusiness) {
      navigate(Routes.BUSINESS)
    } else {
      navigate(Routes.INSPECTOR)
    }
  })

  const onFinish = async (values: ILoginReq) => {
    values.isBusiness = !!values.isBusiness
    mutate(values)
  }

  return (
    <Form
      className='login-form'
      disabled={isPending}
      form={form}
      initialValues={{ remember: true }}
      name='login'
      onFinish={onFinish}
    >
      <InputC name='email' placeholder='Email' rules={ruleEmail} />
      <PasswordC name='password' placeholder='Password' rules={rulePassword} />
      <CheckboxC name='isBusiness'>I am a business</CheckboxC>
      <SubmitC loading={isPending}> Log in </SubmitC>
    </Form>
  )
}
