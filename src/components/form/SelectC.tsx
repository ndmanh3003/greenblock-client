import { Form, Select } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { ISelectC } from './types'

export const SelectC = (props: ISelectC) => {
  return (
    <Form.Item label={props.label} name={props.name} rules={props.rules}>
      <Select
        disabled={props.disabled}
        showSearch
        suffixIcon={
          <DownOutlined style={{ color: 'white', fontSize: '13px' }} />
        }
        placeholder={props.placeholder}
        dropdownStyle={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(20px)'
        }}
        dropdownAlign={{ offset: [0, 10] }}
      >
        {props.value.map((item) => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}
