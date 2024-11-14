import { Form, Input, InputProps } from 'antd'
import React from 'react'

import { IFormItem, cnInput } from '.'
import { cn } from '@/utils'

export const InputC: React.FC<IFormItem & InputProps> = ({
  isOutline,
  name,
  rules,
  label,
  className,
  ...props
}) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input
        className={cn(cnInput, className, isOutline && 'border-gray-200')}
        {...props}
      />
    </Form.Item>
  )
}
