import { Form, message, UploadFile } from 'antd'
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
import { useHandleStatusProductMutation } from '../../service/store/product'
import { useHandleError, useHandleRefetch, useHandleSuccess } from '../../hooks'
import { CheckboxC } from './../form/CheckboxC'

export const Upload = ({ dispatch, state }: IRecord) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [isConfirm, setIsConfirm] = useState(false)
  const [hash, setHash] = useState<string[]>([])
  const isDelete = state.data?.isDelete
  const isHarvested = state.data?.isHarvested

  const { mutate, error, data, isPending } = useHandleStatusProductMutation()
  useHandleError([error], () => setIsConfirm(false))
  useHandleSuccess(data, true, () =>
    dispatch({ type: 'UPDATE_CURRENT', payload: 1 })
  )
  useHandleRefetch(
    () =>
      mutate({
        businessId: state.data!.businessId,
        code: state.data!.code,
        productId: state.data!.productId,
        ...(state.data?.isDelete
          ? { isDelete: Boolean(state.data?.isDelete) }
          : {
            isHarvested: Boolean(state.data?.isHarvested),
            img: state.data?.img,
            desc: state.data?.desc,
            ...(isHarvested
              ? { quantityOut: Number(state.data?.quantityOut) }
              : {})
          })
      }),
    [isConfirm],
    () => !isConfirm
  )

  const onFinish = (values: IStatus & { isConfirm: boolean }) => {
    if (fileList.some((f) => f.status !== 'done'))
      return message.warning('Please wait until all images are uploaded')

    const { isConfirm, ...rest } = values
    if (!isConfirm) return message.error('Please confirm the information')

    rest.img = hash
    dispatch({ type: 'UPDATE_DATA', payload: rest })
    setIsConfirm(true)
  }

  return (
    <div>
      <Form
        className='mx-auto'
        name='form'
        labelCol={{ span: 8 }}
        labelAlign='left'
        onFinish={onFinish}
        requiredMark={false}
        colon={false}
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
        <CheckboxC name='isConfirm' wrapperCol={8}>
          I confirm the provided information.
        </CheckboxC>
        <Form.Item className='relative'>
          <SubmitC className='!w-fit' wrapperCol={8} loading={isPending}>
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
