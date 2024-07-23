import { Form, Input } from 'antd'
import { cnInput } from '../classNames'
import cn from '../../utils/cn'
import { IInputC } from './types'

export const TextAreaC = (props: IInputC) => {
  return (
    <Form.Item name={props.name} rules={props.rules} label={props.label}>
      <Input.TextArea
        disabled={props.disabled}
        className={cn(cnInput, '!px-2', props.className)}
        placeholder={props.placeholder}
        autoSize={{ minRows: 2 }}
        maxLength={100}
        showCount
      />
    </Form.Item>
  )
}
