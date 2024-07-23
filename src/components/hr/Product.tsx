import { IStatus } from '../../pages/Hr'
import { IHr } from './Hr'
import { Form, UploadFile } from 'antd'
import SelectC from '../form/SelectC'
import SubmitC from '../form/SubmitC'
import TextAreaC from '../form/TextAreaC'
import IpfsUpload from '../IpfsUpload'
import { useState } from 'react'
import { _activities, _products } from '../../const/data'

interface IHrData extends IHr {
  data: IStatus | undefined
  // eslint-disable-next-line no-unused-vars
  setData: (data: IStatus) => void
  // eslint-disable-next-line no-unused-vars
  setCurrent: (current: number) => void
}

const Product = ({ data, setData, setCurrent }: IHrData) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [hash, setHash] = useState<string[]>([])

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
      >
        <SelectC
          name='type'
          label='Activity'
          placeholder='Select your activity'
          rules={[{ required: true, message: 'Select your activity' }]}
          value={_activities[data?.isFarmer ? 1 : 0].activities}
        />
        <SelectC
          name='productId'
          label='Product'
          placeholder='Select your product'
          rules={[{ required: true, message: 'Select your product' }]}
          value={_products}
        />
        <TextAreaC
          name='desc'
          label='Description'
          rules={[{ required: true, message: 'Description your activity' }]}
          placeholder='Description your activity'
        />
        <IpfsUpload
          setHash={setHash}
          fileList={fileList}
          setFileList={setFileList}
          hash={hash}
          name='img'
          placeholder='Upload'
          maxCount={5}
          listType='picture-card'
          label='Upload'
        />
        <SubmitC name='Continue' className='!w-fit mt-2' wrapperCol={8} />
      </Form>
    </div>
  )
}

export default Product
