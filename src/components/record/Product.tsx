import { Form } from 'antd'
import { ruleRequired, SelectC, SubmitC } from '../form'
import { ButtonC, IRecord, IStatus } from '../../components'
import { useState } from 'react'

export const Product = ({ data, setData, setCurrent }: IRecord) => {
  const [type, setType] = useState<number | null>(null)

  const onFinish = (values: IStatus & { type: number }) => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { type: _type, ...rest } = values
    rest.isHarvested = rest.isDeleted = undefined

    if (type === 2) rest.isDeleted = true
    else if (type === 1) rest.isHarvested = true
    else rest.isHarvested = false

    setData({ ...data, ...rest })
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
        <SelectC
          name='type'
          label='Activity'
          placeholder='Select your activity'
          rules={ruleRequired}
          value={_activities}
          onChange={(value) => setType(value)}
          defaultValue={() => {
            if (data?.isDeleted == null && data?.isHarvested == null)
              return null
            if (data?.isDeleted) return 2
            if (data?.isHarvested) return 1
            return 0
          }}
        />
        <SelectC
          name='productId'
          label='Product'
          placeholder='Select your product'
          rules={ruleRequired}
          value={_products}
        />
        <Form.Item className='relative mt-16'>
          <SubmitC className='!w-fit' wrapperCol={8}>
            Continue
          </SubmitC>
          <ButtonC
            variant='primary'
            className='!rounded-xl !w-fit absolute top-0 !text-base !font-medium !text-white hover:!text-white'
            onClick={() => setCurrent(0)}
          >
            Previous
          </ButtonC>
        </Form.Item>
      </Form>
    </div>
  )
}

const _activities = [
  { value: 0, label: 'Record product update' },
  { value: 1, label: 'Record product harvest' },
  { value: 2, label: 'Delete nearest status' }
]

const _products = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
]
