import { Form, UploadFile } from 'antd'
import { useState } from 'react'
import InputC from '../../components/form/InputC'
import { ruleEmail, rulePassword } from '../../components/form/constForm'
import PasswordC from '../../components/form/PasswordC'
import SubmitC from '../../components/form/SubmitC'
import CheckboxC from '../../components/form/CheckboxC'
import IpfsUpload from './../../components/IpfsUpload/index'

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
      onFinish={onFinish}
      autoComplete='off'
    >
      <InputC
        placeholder='Company name'
        rules={[{ required: true, message: 'Please input your company name' }]}
        name='name'
      />
      <InputC placeholder='Email' rules={ruleEmail} name='email' />
      <PasswordC
        name='password'
        placeholder='Password'
        rules={rulePassword}
        isConfirm
      />
      <IpfsUpload
        setHash={setHash}
        fileList={fileList}
        setFileList={setFileList}
      />
      <CheckboxC
        name='isBusiness'
        placeholder='Check this box if you are a business'
      />
      <SubmitC name='Register' />
    </Form>
  )
}

{
  /* <img src='https://ipfs.io/ipfs/QmbFdofdZ5fRaNhSRnoarWmTMQPpb8nAjkzYGwoXdEEBX4' /> */
}
