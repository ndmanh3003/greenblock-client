import { Form } from 'antd'
import {
  InputC,
  ruleRequired,
  SelectC,
  SubmitC,
  IStatus,
  IRecord
} from '../../components'

export const Hr = ({ setData, setCurrent, data }: IRecord) => {
  const onFinish = (values: IStatus) => {
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
        initialValues={data}
      >
        <InputC
          name='code'
          label='Code'
          rules={ruleRequired}
          placeholder='Input your company code'
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
        <SubmitC className='!w-fit mt-2' wrapperCol={8}>
          Continue
        </SubmitC>
      </Form>
    </div>
  )
}
