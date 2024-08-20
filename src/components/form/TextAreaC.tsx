import { Form, Input } from 'antd'
import React from 'react'
import { IFormItem } from '.'
import { TextAreaProps } from 'antd/es/input'
import { cn, cnInput } from '../../utils'

export const TextAreaC: React.FC<IFormItem & TextAreaProps> = ({
  name,
  rules,
  label,
  className,
  isOutline,
  ...props
}) => {
  return (
    <Form.Item name={name} rules={rules} label={label}>
      <Input.TextArea
        className={cn(
          cnInput,
          '!px-2',
          isOutline && 'border-gray-200',
          className
        )}
        showCount
        autoSize={{ minRows: 2 }}
        maxLength={100}
        {...props}
      />
    </Form.Item>
  )
}
