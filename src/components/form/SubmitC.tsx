import { Form } from 'antd'
import { IFormItem } from '.'
import React from 'react'
import { cn } from '../../utils'
import { ButtonC, IButtonC } from '../../components'

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
        htmlType='submit'
        variant={variant || 'linear'}
        className={cn('rounded-xl w-full', className)}
        {...props}
      >
        {children}
      </ButtonC>
    </Form.Item>
  )
}
