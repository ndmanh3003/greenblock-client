import { Form, Input } from 'antd'
import { cnInput, IInputC } from './constForm'
import cn from '../../utils/cn'

const InputC = (props: IInputC) => {
  return (
    <Form.Item name={props.name} rules={props.rules} label={props.label}>
      <Input
        className={cn(cnInput, props.className)}
        placeholder={props.placeholder}
      />
    </Form.Item>
  )
}

export default InputC
