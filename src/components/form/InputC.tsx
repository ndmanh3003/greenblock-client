import { Form, Input, InputProps } from 'antd'
import { IFormItem } from './types'
import React from 'react'
import { cn, cnInput } from '../../utils'

export const InputC: React.FC<IFormItem & InputProps> = ({
  name,
  rules,
  label,
  className,
  ...props
}) => {
  return (
    <Form.Item name={name} rules={rules} label={label}>
      <Input className={cn(cnInput, className)} {...props} />
    </Form.Item>
  )
}
