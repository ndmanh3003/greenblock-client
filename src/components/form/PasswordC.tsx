import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Form, Input, InputProps } from 'antd'
import React from 'react'

import { IFormItem, cnInput } from '.'
import { cn } from '@/utils'

interface IPasswordC {
  isConfirm?: boolean
}

export const PasswordC: React.FC<IPasswordC & IFormItem & InputProps> = ({
  name,
  rules,
  label,
  className,
  isConfirm,
  ...props
}) => {
  return (
    <>
      <Form.Item label={label} name={name} rules={rules}>
        <Input.Password
          className={cn(cnInput, className)}
          iconRender={(visible) =>
            visible ? (
              <EyeOutlined style={{ color: 'white' }} />
            ) : (
              <EyeInvisibleOutlined style={{ color: 'white' }} />
            )
          }
          {...props}
        />
      </Form.Item>
      {isConfirm && (
        <Form.Item
          hasFeedback
          dependencies={[name]}
          name='confirm'
          rules={[
            {
              required: true,
              message: 'Please confirm your password'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match')
                )
              }
            })
          ]}
        >
          <Input
            className={cn(cnInput, className)}
            placeholder='Confirm Password'
            type='password'
          />
        </Form.Item>
      )}
    </>
  )
}
