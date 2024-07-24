import { IStatus } from '../../pages/Status'
import { Form } from 'antd'
import { ruleRequired, SelectC, SubmitC } from '../form'
import { IHr } from './types'
import ButtonC from '../ButtonC'

export const Product = ({ data, setData, setCurrent }: IHr) => {
  const onFinish = (values: IStatus) => {
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
        <SelectC
          name='type'
          label='Activity'
          placeholder='Select your activity'
          rules={ruleRequired}
          value={_activities[data?.isFarmer ? 1 : 0].activities}
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
  {
    role: 'processor',
    activities: [{ value: 3, label: 'Record product export ' }]
  },
  {
    role: 'farmer',
    activities: [
      { value: 0, label: 'Record product growth update' },
      { value: 1, label: 'Retract recent product update' },
      { value: 2, label: 'Record product harvest' }
    ]
  }
]

const _products = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
]
