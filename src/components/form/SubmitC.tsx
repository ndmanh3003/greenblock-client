import { ButtonProps, Form } from 'antd'
import { IFormItem } from '.'
import React from 'react'
import { cn } from '../../utils'
import { ButtonC } from '../../components'

export const SubmitC: React.FC<IFormItem & ButtonProps> = ({
  wrapperCol,
  className,
  children,
  ...props
}) => {
  return (
    <Form.Item wrapperCol={{ offset: wrapperCol }}>
      <ButtonC
        htmlType='submit'
        variant='linear'
        className={cn('rounded-xl w-full', className)}
        {...props}
      >
        {children}
      </ButtonC>
    </Form.Item>
  )
}
