import { Rule } from 'antd/es/form'

export const ruleRequired: Rule[] = [
  { required: true, message: 'This field is required' }
]

export const ruleEmail: Rule[] = [
  ...ruleRequired,
  {
    type: 'email',
    message: 'The input is not valid e-mail'
  }
]

export const rulePassword: Rule[] = [
  ...ruleRequired,
  { min: 6, message: 'Password must be at least 6 characters long' },
  { max: 20, message: 'Password must be at most 20 characters long' }
]

export const ruleNumber: Rule[] = [
  ...ruleRequired,
  {
    type: 'number',
    min: 0,
    message: 'This field must be a positive number',
    transform(value) {
      return Number(value)
    }
  }
]
