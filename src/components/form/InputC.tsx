import { Form, Input } from 'antd'
import { cnInput } from '../classNames'
import cn from '../../utils/cn'
import { IInputC } from './types'

export const InputC = (props: IInputC) => {
  return (
    <Form.Item name={props.name} rules={props.rules} label={props.label}>
      <Input
        className={cn(cnInput, props.className)}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
    </Form.Item>
  )
}
