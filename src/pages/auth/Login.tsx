import { Checkbox, Form, Input } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import ButtonC from '../../components/ButtonC'
import { cnInput } from './Layout'
import cn from '../../utils/cn'

interface ILogin {
  email: string
  password: string
  isBusiness: boolean
}

export default function Login() {
  const onFinish = (values: ILogin) => {
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
      <Form.Item
        name='email'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid e-mail'
          },
          {
            required: true,
            message: 'Please input your e-mail'
          }
        ]}
      >
        <Input className={cnInput} placeholder='Email' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          { required: true, message: 'Please input your password' },
          { min: 6, message: 'Password must be at least 6 characters long' },
          { max: 20, message: 'Password must be at most 20 characters long' }
        ]}
      >
        <Input.Password
          iconRender={(visible) =>
            visible ? (
              <EyeOutlined style={{ color: 'white' }} />
            ) : (
              <EyeInvisibleOutlined style={{ color: 'white' }} />
            )
          }
          placeholder='Password'
          className={cnInput}
        />
      </Form.Item>
      <Form.Item
        name='isBusiness'
        valuePropName='checked'
        className='-translate-y-2'
      >
        <Checkbox className={cn(cnInput, '!text-base !px-0')}>
          You are business
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <ButtonC
          htmlType='submit'
          variant='linear'
          className='rounded-xl w-full'
        >
          Login
        </ButtonC>
      </Form.Item>
    </Form>
  )
}
