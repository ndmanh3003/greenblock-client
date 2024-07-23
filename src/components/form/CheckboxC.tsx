import { Checkbox, Form } from 'antd'
import { cnInput } from '../classNames'
import cn from '../../utils/cn'
import { IInputC } from './types'

export const CheckboxC = (props: IInputC) => {
  return (
    <Form.Item
      name={props.name}
      valuePropName='checked'
      className='-translate-y-2'
      wrapperCol={{ offset: props.wrapperCol }}
    >
      <Checkbox
        className={cn(cnInput, '!text-base !px-0')}
        disabled={props.disabled}
      >
        {props.placeholder}
      </Checkbox>
    </Form.Item>
  )
}
