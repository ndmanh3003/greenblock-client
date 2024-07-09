import { Checkbox, Form, Input, UploadFile } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import ButtonC from '../../components/ButtonC'
import { cnInput } from './Layout'
import cn from '../../utils/cn'
import UploadC from '../../components/UploadC'
import { useState } from 'react'

interface IRegister {
  email: string
  password: string
  isBusiness: boolean
  imgCert: string
  name: string
}

export default function Register() {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [hash, setHash] = useState('')

  const onFinish = (values: IRegister) => {
    values.imgCert = hash
    values.isBusiness = values.isBusiness ? true : false
    console.log('Received values of form: ', values)
  }

  return (
    <Form
      name='register'
      className='register-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete='off'
    >
      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Please input your company name' }]}
      >
        <Input className={cnInput} placeholder='Company name' />
      </Form.Item>
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
        name='confirm'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('The new password that you entered do not match')
              )
            }
          })
        ]}
      >
        <Input
          type='password'
          className={cnInput}
          placeholder='Confirm Password'
        />
      </Form.Item>

      <div className={cn(!fileList.length && 'relative')}>
        {!fileList.length && (
          <Form.Item
            name='imgCert'
            className={cn(!fileList.length && '!absolute top-0')}
            rules={[
              { required: true, message: 'Please upload your certificate' }
            ]}
          >
            <Input className={cn(cnInput, '!mt-[22px] !w-2 !h-2')} />
          </Form.Item>
        )}
        <Form.Item>
          <UploadC
            setHash={setHash}
            fileList={fileList}
            setFileList={setFileList}
          />
        </Form.Item>
      </div>

      <Form.Item
        name='isBusiness'
        valuePropName='checked'
        className='-translate-y-2'
      >
        <Checkbox className={cn(cnInput, '!text-base !px-0')}>
          You are business
        </Checkbox>
      </Form.Item>
      {/* <img src='https://ipfs.io/ipfs/QmbFdofdZ5fRaNhSRnoarWmTMQPpb8nAjkzYGwoXdEEBX4' /> */}

      <Form.Item>
        <ButtonC
          htmlType='submit'
          variant='linear'
          className='rounded-xl w-full'
        >
          Register
        </ButtonC>
      </Form.Item>
    </Form>
  )
}
