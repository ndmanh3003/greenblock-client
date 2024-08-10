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
} from '../../components'
import { useRegisterMutation } from '../../service/store/auth/auth.query'
import { useHandleError, useHandleSuccess } from '../../hooks'
import { IRegisterReq } from '../../service/store/auth'
import { Routes } from '../../routes'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const navigate = useNavigate()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [hash, setHash] = useState<string[]>([])

  const { error, data, mutate: register, isPending } = useRegisterMutation()
  useHandleError([error])
  useHandleSuccess(data, false, () => navigate(Routes.WAITLIST))

  const onFinish = (values: IRegisterReq & { confirm: string }) => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { confirm, ...rest } = values

    rest.cert = hash[0]
    rest.isBusiness = !!rest.isBusiness
    register(rest)
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
        name='cert'
        maxCount={1}
        listType='picture'
        rules={ruleRequired}
      >
        Upload certificate
      </IpfsUpload>
      <CheckboxC name='isBusiness'>I am a business</CheckboxC>
      <SubmitC loading={isPending}>Register</SubmitC>
    </Form>
  )
}
