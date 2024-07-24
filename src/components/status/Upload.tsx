import { IStatus } from '../../pages/Status'
import { Form, UploadFile } from 'antd'
import { useState } from 'react'
import { IpfsUpload, ruleRequired, SubmitC, TextAreaC } from '../form'
import { IHr } from './types'
import ButtonC from '../ButtonC'

export const Upload = ({ data, setData, setCurrent }: IHr) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [hash, setHash] = useState<string[]>([])
  const isRetract = data?.type === 1

  const onFinish = (values: IStatus) => {
    if (fileList.some((f) => f.status !== 'done')) return
    values.img = hash
    setData({ ...data, ...values })
    setCurrent(2)
  }

  return (
    <div>
      <Form
        className='mx-auto'
        name='form'
        labelCol={{ span: 8 }}
        labelAlign='left'
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
        colon={false}
        initialValues={data}
      >
        <TextAreaC
          name='desc'
          label='Description'
          rules={isRetract ? [] : ruleRequired}
          disabled={isRetract}
          placeholder={!isRetract ? 'Description your activity' : 'Retracted'}
        />
        <IpfsUpload
          disabled={isRetract}
          setHash={setHash}
          fileList={fileList}
          setFileList={setFileList}
          wrapperCol={8}
          hash={hash}
          name='img'
          maxCount={5}
          listType='picture-card'
          label='Upload'
          rules={isRetract ? [] : ruleRequired}
        >
          Upload
        </IpfsUpload>
        <Form.Item className='relative'>
          <SubmitC className='!w-fit' wrapperCol={8}>
            Submit
          </SubmitC>
          <ButtonC
            variant='primary'
            className='!rounded-xl !w-fit absolute top-0 !text-base !font-medium !text-white hover:!text-white'
            onClick={() => setCurrent(1)}
          >
            Previous
          </ButtonC>
        </Form.Item>
      </Form>
    </div>
  )
}
