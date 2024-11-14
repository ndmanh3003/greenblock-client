import { Checkbox, CheckboxProps, Form } from 'antd'
import React from 'react'

import { IFormItem, cnInput } from '.'
import { cn } from '@/utils'

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
      className='-translate-y-2'
      name={name}
      rules={rules}
      valuePropName='checked'
      wrapperCol={{ offset: wrapperCol }}
    >
      <Checkbox className={cn(cnInput, '!px-0', className)} {...props}>
        {children}
      </Checkbox>
    </Form.Item>
  )
}
