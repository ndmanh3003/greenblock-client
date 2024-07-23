import ButtonC from '../ButtonC'
import { Form } from 'antd'
import cn from './../../utils/cn'
import { IInputC } from './types'

export const SubmitC = (props: IInputC) => {
  return (
    <Form.Item wrapperCol={{ offset: props.wrapperCol }}>
      <ButtonC
        disabled={props.disabled}
        htmlType='submit'
        variant='linear'
        className={cn('rounded-xl w-full', props.className)}
      >
        {props.name}
      </ButtonC>
    </Form.Item>
  )
}
