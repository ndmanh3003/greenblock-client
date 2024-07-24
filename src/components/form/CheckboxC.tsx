import { Checkbox, CheckboxProps, Form } from 'antd'
import { IFormItem } from '.'
import React from 'react'
import { cn, cnInput } from '../../utils'

export const CheckboxC: React.FC<IFormItem & CheckboxProps> = ({
  name,
  rules,
  wrapperCol,
  className,
  children,
  ...props
}) => {
  return (
    <Form.Item
      name={name}
      valuePropName='checked'
      className='-translate-y-2'
      wrapperCol={{ offset: wrapperCol }}
      rules={rules}
    >
      <Checkbox
        className={cn(cnInput, '!text-base !px-0', className)}
        {...props}
      >
        {children}
      </Checkbox>
    </Form.Item>
  )
}
