import { DownOutlined } from '@ant-design/icons'
import { Form, Select, SelectProps } from 'antd'
import React from 'react'

import { IFormItem } from '.'

export interface IValueSelectC {
  value: string | number
  label: string
}

interface ISelectC {
  value: IValueSelectC[]
  colorDropdown?: string
  colorIcon?: string
}

export const SelectC: React.FC<ISelectC & SelectProps & IFormItem> = ({
  name,
  rules,
  label,
  colorDropdown,
  colorIcon,
  value,
  ...props
}) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select
        // * for both value and label search
        // filterOption={(input, option) => {
        //   const { children, value } = option
        //   return (
        //     (children as string).toLowerCase().indexOf(input.toLowerCase()) >=
        //     0 || (value as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
        //   )
        // }}
        showSearch
        dropdownAlign={{ offset: [0, 10] }}
        dropdownStyle={{
          backgroundColor: colorDropdown || 'transparent'
        }}
        optionFilterProp='children'
        popupClassName='!backdrop-blur-lg'
        suffixIcon={
          <DownOutlined
            style={{ color: colorIcon || 'white', fontSize: '13px' }}
          />
        }
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
