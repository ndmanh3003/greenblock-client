import { Form } from 'antd'
import { IStatus } from '../../pages/Status'
import { CheckboxC, InputC, ruleRequired, SelectC, SubmitC } from '../form'
import { IHr } from './types'

export const HrInfo = ({ setData, setCurrent }: IHr) => {
  const onFinish = (values: IStatus) => {
    values.isFarmer = values.isFarmer ? true : false
    setData(values)
    setCurrent(1)
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
          rules={ruleRequired}
          placeholder='Input your phone number'
        />
        <SelectC
          name='businessId'
          label='Company'
          placeholder='Select your company'
          rules={ruleRequired}
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
