import { Rule } from 'antd/es/form'

export interface IFormItem {
  name?: string
  rules?: Rule[]
  label?: string
  wrapperCol?: number
  isOutline?: boolean
}
