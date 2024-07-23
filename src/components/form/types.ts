/* eslint-disable no-unused-vars */
import { UploadFile } from 'antd'
import { Rule } from 'antd/es/form'

interface IInputC {
  name: string
  rules?: Rule[]
  placeholder?: string
  className?: string
  label?: string
  wrapperCol?: number
  disabled?: boolean
}

interface IUploadC extends IInputC {
  setHash: (data: string[]) => void
  setFileList: (data: UploadFile[]) => void
  fileList: UploadFile[]
  hash: string[] | undefined
  placeholder: string
  maxCount: number
  wrapperCol?: number
  listType: 'picture' | 'picture-card'
}

interface ISelectC extends IInputC {
  value: { value: string | number; label: string }[]
}

interface IPasswordC extends IInputC {
  isConfirm?: boolean
}

export type { IInputC, IUploadC, ISelectC, IPasswordC }
