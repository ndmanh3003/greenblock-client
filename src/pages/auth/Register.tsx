import { Form, UploadFile } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CheckboxC,
  ImageUpload,
  InputC,
  PasswordC,
  SubmitC,
  ruleEmail,
  rulePassword,
  ruleRequired
} from '@/components'
import { useHandleSuccess } from '@/hooks'
import { Routes } from '@/routes'
import { IRegisterReq, useRegisterMutation } from '@/service/api/auth'

export const Register = () => {
  const navigate = useNavigate()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [hash, setHash] = useState<string[]>([])

  const { data, mutate: register, isPending } = useRegisterMutation()
  useHandleSuccess(data, false, () => navigate(Routes.WAITLIST))

  const onFinish = (values: IRegisterReq & { confirm: string }) => {
    const { confirm: _confirm, ...rest } = values

    rest.cert = hash[0]
    rest.isBusiness = !!rest.isBusiness
    register(rest)
  }

  return (
    <Form className='register-form' name='register' onFinish={onFinish}>
      <InputC name='name' placeholder='Company name' rules={ruleRequired} />
      <InputC name='email' placeholder='Email' rules={ruleEmail} />
      <PasswordC
        isConfirm
        name='password'
        placeholder='Password'
        rules={rulePassword}
      />
      <ImageUpload
        fileList={fileList}
        hash={hash}
        listType='picture'
        maxCount={1}
        name='cert'
        rules={ruleRequired}
        setFileList={setFileList}
        setHash={setHash}
      >
        Upload certificate
      </ImageUpload>
      <CheckboxC name='isBusiness'>I am a business</CheckboxC>
      <SubmitC loading={isPending}>Register</SubmitC>
    </Form>
  )
}
