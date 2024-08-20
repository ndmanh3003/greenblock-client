import { Form, Input, InputProps } from 'antd'
import { IFormItem } from '.'
import React from 'react'
import { cn, cnInput } from '../../utils'

export const InputC: React.FC<IFormItem & InputProps> = ({
  isOutline,
  name,
  rules,
  label,
  className,
  ...props
}) => {
  return (
    <Form.Item name={name} rules={rules} label={label}>
      <Input
        className={cn(cnInput, className, isOutline && 'border-gray-200')}
        {...props}
      />
    </Form.Item>
  )
}
