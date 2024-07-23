import { Form, Input } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { cnInput } from '../classNames'
import cn from '../../utils/cn'
import { IPasswordC } from './types'

export const PasswordC = (props: IPasswordC) => {
  return (
    <>
      <Form.Item name={props.name} rules={props.rules} label={props.label}>
        <Input.Password
          iconRender={(visible) =>
            visible ? (
              <EyeOutlined style={{ color: 'white' }} />
            ) : (
              <EyeInvisibleOutlined style={{ color: 'white' }} />
            )
          }
          placeholder={props.placeholder}
          className={cn(cnInput, props.className)}
        />
      </Form.Item>
      {props.isConfirm && (
        <Form.Item
          name='confirm'
          dependencies={[props.name]}
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
            disabled={props.disabled}
            type='password'
            className={cnInput}
            placeholder='Confirm Password'
          />
        </Form.Item>
      )}
    </>
  )
}
