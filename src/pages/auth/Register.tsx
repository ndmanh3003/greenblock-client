import { Form, UploadFile } from 'antd'
import { useState } from 'react'
import {
  CheckboxC,
  InputC,
  IpfsUpload,
  PasswordC,
  ruleEmail,
  rulePassword,
  ruleRequired,
  SubmitC
} from '../../components/form'

interface IRegister {
  email: string
  password: string
  isBusiness: boolean
  imgCert: string
  name: string
}

export const Register = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [hash, setHash] = useState<string[]>([])

  const onFinish = (values: IRegister) => {
    values.imgCert = hash[0]
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
      <InputC placeholder='Company name' rules={ruleRequired} name='name' />
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
        hash={hash}
        name='imgCert'
        maxCount={1}
        listType='picture'
        rules={ruleRequired}
      >
        Upload certificate
      </IpfsUpload>
      <CheckboxC name='isBusiness'>I am a business</CheckboxC>
      <SubmitC>Register</SubmitC>
    </Form>
  )
}
