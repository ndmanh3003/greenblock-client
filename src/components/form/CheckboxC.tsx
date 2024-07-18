import { Checkbox, Form } from 'antd'
import { cnInput, IInputC } from './constForm'
import cn from '../../utils/cn'

interface ICheckboxC extends IInputC {
  wrapperCol?: number
}

const CheckboxC = (props: ICheckboxC) => {
  return (
    <Form.Item
      name={props.name}
      valuePropName='checked'
      className='-translate-y-2'
      wrapperCol={{ offset: props.wrapperCol }}
    >
      <Checkbox className={cn(cnInput, '!text-base !px-0')}>
        {props.placeholder}
      </Checkbox>
    </Form.Item>
  )
}

export default CheckboxC
