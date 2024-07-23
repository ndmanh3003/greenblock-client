import ButtonC from '../ButtonC'
import { IInputC } from '../../const/constForm'
import { Form } from 'antd'
import cn from './../../utils/cn'

interface ISubmitC extends IInputC {
  wrapperCol?: number
}

const SubmitC = (props: ISubmitC) => {
  return (
    <Form.Item wrapperCol={{ offset: props.wrapperCol }}>
      <ButtonC
        htmlType='submit'
        variant='linear'
        className={cn('rounded-xl w-full', props.className)}
      >
        {props.name}
      </ButtonC>
    </Form.Item>
  )
}

export default SubmitC
