import { Form } from 'antd'
import React from 'react'

import { IFormItem } from '.'
import { ButtonC, IButtonC } from '@/components'
import { cn } from '@/utils'

export const SubmitC: React.FC<IButtonC & IFormItem> = ({
  wrapperCol,
  className,
  children,
  variant,
  ...props
}) => {
  return (
    <Form.Item wrapperCol={{ offset: wrapperCol }}>
      <ButtonC
        className={cn('rounded-xl w-full', className)}
        htmlType='submit'
        variant={variant || 'linear'}
        {...props}
      >
        {children}
      </ButtonC>
    </Form.Item>
  )
}
