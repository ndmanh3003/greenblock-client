import { Rule } from 'antd/es/form'

export interface IInputC {
  name: string
  rules?: Rule[]
  placeholder?: string
  className?: string
  label?: string
}

export const cnInput =
  '!py-2 !px-5 !rounded-xl border-white hover:!bg-transparent focus:!bg-transparent !bg-transparent !text-lg'

export const ruleEmail: Rule[] = [
  {
    type: 'email',
    message: 'The input is not valid e-mail'
  },
  {
    required: true,
    message: 'Please input your e-mail'
  }
]

export const rulePassword: Rule[] = [
  { required: true, message: 'Please input your password' },
  { min: 6, message: 'Password must be at least 6 characters long' },
  { max: 20, message: 'Password must be at most 20 characters long' }
]
