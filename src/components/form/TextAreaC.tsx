import { Form, Input } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import React from 'react'

import { IFormItem, cnInput } from '.'
import { cn } from '@/utils'

export const TextAreaC: React.FC<IFormItem & TextAreaProps> = ({
  name,
  rules,
  label,
  className,
  isOutline,
  ...props
}) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input.TextArea
        showCount
        autoSize={{ minRows: 2 }}
        className={cn(
          cnInput,
          '!px-2',
          isOutline && 'border-gray-200',
          className
        )}
        maxLength={100}
        {...props}
      />
    </Form.Item>
  )
}
