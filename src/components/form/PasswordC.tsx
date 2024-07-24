import { Form, Input, InputProps } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { IFormItem, IPasswordC } from '.'
import React from 'react'
import { cn, cnInput } from '../../utils'

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
      <Form.Item name={name} rules={rules} label={label}>
        <Input.Password
          iconRender={(visible) =>
            visible ? (
              <EyeOutlined style={{ color: 'white' }} />
            ) : (
              <EyeInvisibleOutlined style={{ color: 'white' }} />
            )
          }
          className={cn(cnInput, className)}
          {...props}
        />
      </Form.Item>
      {isConfirm && (
        <Form.Item
          name='confirm'
          dependencies={[name]}
          hasFeedback
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
            type='password'
            placeholder='Confirm Password'
          />
        </Form.Item>
      )}
    </>
  )
}
