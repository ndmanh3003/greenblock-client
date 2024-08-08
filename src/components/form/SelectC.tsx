import { Form, Select, SelectProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import React from 'react'
import { IFormItem } from '.'

interface ISelectC {
  value: { value: string | number; label: string }[]
}

export const SelectC: React.FC<ISelectC & SelectProps & IFormItem> = ({
  name,
  rules,
  label,
  value,
  ...props
}) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select
        showSearch
        suffixIcon={
          <DownOutlined style={{ color: 'white', fontSize: '13px' }} />
        }
        dropdownStyle={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(20px)'
        }}
        dropdownAlign={{ offset: [0, 10] }}
        {...props}
      >
        {value.map((item: { value: string; label: string }) => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}
