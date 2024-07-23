import { Form, Input } from 'antd'
import { cnInput, IInputC } from '../../const/constForm'
import cn from '../../utils/cn'

const TextAreaC = (props: IInputC) => {
  return (
    <Form.Item name={props.name} rules={props.rules} label={props.label}>
      <Input.TextArea
        className={cn(cnInput, '!px-2', props.className)}
        placeholder={props.placeholder}
        autoSize={{ minRows: 2 }}
        maxLength={100}
        showCount
      />
    </Form.Item>
  )
}

export default TextAreaC
