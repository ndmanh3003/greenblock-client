import { Form, UploadFile } from 'antd'
import { useState } from 'react'
import {
  ButtonC,
  InputC,
  IpfsUpload,
  IRecord,
  IStatus,
  ruleNumber,
  ruleRequired,
  SubmitC,
  TextAreaC
} from '../../components'

export const Upload = ({ dispatch, state }: IRecord) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [hash, setHash] = useState<string[]>([])
  const isDelete = state.data?.isDeleted
  const isHarvested = state.data?.isHarvested

  const onFinish = (values: IStatus) => {
    if (fileList.some((f) => f.status !== 'done')) return
    values.img = hash
    dispatch({ type: 'UPDATE_DATA', payload: values })
    dispatch({ type: 'UPDATE_CURRENT', payload: 1 })
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
        initialValues={state.data || {}}
      >
        {!isDelete && (
          <>
            <TextAreaC
              name='desc'
              label='Description'
              rules={ruleRequired}
              placeholder='Description your activity'
            />
            {isHarvested && (
              <InputC
                name='quantityOut'
                label='Quantity'
                rules={ruleNumber}
                placeholder='Input product quantity'
              />
            )}
            <IpfsUpload
              setHash={setHash}
              fileList={fileList}
              setFileList={setFileList}
              wrapperCol={8}
              hash={hash}
              name='img'
              maxCount={5}
              listType='picture-card'
              label='Upload'
              rules={ruleRequired}
            >
              Upload
            </IpfsUpload>
          </>
        )}
        <Form.Item className='relative'>
          <SubmitC className='!w-fit' wrapperCol={8}>
            Submit
          </SubmitC>
          <ButtonC
            variant='primary'
            className='!rounded-xl !w-fit absolute top-0 !text-base !font-medium !text-white hover:!text-white'
            onClick={() => dispatch({ type: 'UPDATE_CURRENT', payload: 1 })}
          >
            Previous
          </ButtonC>
        </Form.Item>
      </Form>
    </div>
  )
}
