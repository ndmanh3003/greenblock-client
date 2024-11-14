import { Form, UploadFile, message } from 'antd'
import { useState } from 'react'

import { CheckboxC } from '../form/CheckboxC'
import { ImageUpload, SubmitC, TextAreaC, ruleRequired } from '@/components'
import {
  useAppDispatch,
  useAppSelector,
  useHandleError,
  useHandleRefetch,
  useHandleSuccess
} from '@/hooks'
import {
  IHandleRecordReq,
  useHandleRecordMutation
} from '@/service/api/product'
import { selectState, setCurrent, setData } from '@/service/store/state'

export const Upload = () => {
  const state = useAppSelector(selectState)
  const dispatch = useAppDispatch()

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [isConfirm, setIsConfirm] = useState(false)
  const [hash, setHash] = useState<string[]>([])

  const { mutate, error, data, isPending } = useHandleRecordMutation()
  useHandleError([error], () => setIsConfirm(false))
  useHandleSuccess(data, false, () => dispatch(setCurrent(1)))
  useHandleRefetch(
    () =>
      mutate({
        businessId: state.data!.businessId,
        code: state.data!.code,
        productId: state.data!.productId,
        isHarvested: state.data!.isHarvested,
        ...(state.data?.isHarvested !== -1 && {
          img: state.data?.img,
          desc: state.data?.desc
        })
      }),
    [isConfirm],
    () => !isConfirm
  )

  const onFinish = (values: IHandleRecordReq & { isConfirm: boolean }) => {
    if (fileList.some((f) => f.status !== 'done')) {
      return message.warning('Please wait until all images are uploaded')
    }

    const { isConfirm, ...rest } = values
    if (!isConfirm) {
      return message.error('Please confirm the information')
    }

    rest.img = hash
    dispatch(setData(rest))
    setIsConfirm(true)
  }

  return (
    <div>
      <Form
        className='mx-auto'
        colon={false}
        labelAlign='left'
        labelCol={{ span: 8 }}
        name='form'
        requiredMark={false}
        onFinish={onFinish}
      >
        {state.data?.isHarvested !== -1 && (
          <>
            <TextAreaC
              label='Description'
              name='desc'
              placeholder='Description your activity'
              rules={ruleRequired}
            />
            <ImageUpload
              isIpfs
              fileList={fileList}
              hash={hash}
              label='Upload'
              listType='picture-card'
              maxCount={5}
              name='img'
              rules={ruleRequired}
              setFileList={setFileList}
              setHash={setHash}
            >
              Upload
            </ImageUpload>
          </>
        )}
        <CheckboxC className='sm:ml-52' name='isConfirm'>
          I confirm the provided information.
        </CheckboxC>
        <Form.Item className='relative flex flex-col items-center'>
          <SubmitC className='!w-fit' loading={isPending}>
            Submit
          </SubmitC>
          <div
            className='!w-full text-base font-medium !text-primary underline-offset-1 text-center underline cursor-pointer'
            onClick={() => dispatch(setCurrent(1))}
          >
            Previous
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
