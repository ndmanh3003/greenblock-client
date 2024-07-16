import { Checkbox, Form, Input, Select } from 'antd'
import { IStatus } from '../../pages/hr/Hr'
import ButtonC from '../ButtonC'
import { cnInput } from '../../pages/auth/Layout'
import { DownOutlined } from '@ant-design/icons'
import cn from '../../utils/cn'

export interface IHr {
  // eslint-disable-next-line no-unused-vars
  setData: (data: IStatus) => void
  // eslint-disable-next-line no-unused-vars
  setCurrent: (current: number) => void
}
const Hr = ({ setData, setCurrent }: IHr) => {
  const onFinish = (values: IStatus) => {
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
        <Form.Item
          label='Phone number'
          name='phone'
          rules={[{ required: true, message: 'Please input your information' }]}
        >
          <Input
            className={cnInput}
            placeholder='Input your phone number'
            onChange={(e) => {
              e.preventDefault()
            }}
          />
        </Form.Item>

        <Form.Item
          label='Company'
          name='businessId'
          rules={[{ required: true, message: 'Select your company' }]}
        >
          <Select
            showSearch
            suffixIcon={
              <DownOutlined style={{ color: 'white', fontSize: '13px' }} />
            }
            placeholder='Select your company'
            dropdownStyle={{
              backgroundColor: 'transparent',
              backdropFilter: 'blur(20px)'
            }}
            dropdownAlign={{ offset: [0, 10] }}
          >
            <Select.Option value='china'>China</Select.Option>
            <Select.Option value='usa'>U.S.A</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='isBusiness'
          valuePropName='checked'
          className='-translate-y-2'
          wrapperCol={{ offset: 8 }}
        >
          <Checkbox className={cn(cnInput, '!px-0')}>
            Check this box if you are a farmer
          </Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <ButtonC
            htmlType='submit'
            variant='linear'
            className='rounded-xl w-fit mt-2'
          >
            Continue
          </ButtonC>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Hr
