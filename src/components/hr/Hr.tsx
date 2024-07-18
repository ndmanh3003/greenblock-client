import { Form } from 'antd'
import { IStatus } from '../../pages/hr/Hr'
import InputC from './../form/InputC'
import CheckboxC from '../form/CheckboxC'
import SubmitC from '../form/SubmitC'
import SelectC from './../form/SelectC'

export interface IHr {
  // eslint-disable-next-line no-unused-vars
  setData: (data: IStatus) => void
  // eslint-disable-next-line no-unused-vars
  setCurrent: (current: number) => void
}
const Hr = ({ setData, setCurrent }: IHr) => {
  const onFinish = (values: IStatus) => {
    values.isFarmer = values.isFarmer ? true : false
    setData(values)
    setCurrent(1)
    console.log('Received values of form: ', values)
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
        <InputC
          name='phone'
          label='Phone number'
          rules={[{ required: true, message: 'Please input your information' }]}
          placeholder='Input your phone number'
        />
        <SelectC
          name='businessId'
          label='Company'
          placeholder='Select your company'
          rules={[{ required: true, message: 'Select your company' }]}
          value={[
            { value: 'china', label: 'China' },
            { value: 'usa', label: 'U.S.A' }
          ]}
        />
        <CheckboxC
          name='isFarmer'
          placeholder='Check this box if you are a farmer'
          className='!px-0'
          wrapperCol={8}
        />
        <SubmitC name='Continue' className='!w-fit mt-2' wrapperCol={8} />
      </Form>
    </div>
  )
}

export default Hr
