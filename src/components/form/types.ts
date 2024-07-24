/* eslint-disable no-unused-vars */
import { UploadFile } from 'antd'
import { Rule } from 'antd/es/form'

interface IFormItem {
  name?: string
  rules?: Rule[]
  label?: string
  wrapperCol?: number
}

interface IIpfsUploadC {
  setHash: (data: string[]) => void
  setFileList: (data: UploadFile[]) => void
  fileList: UploadFile[]
  hash: string[] | undefined
  listType: 'picture' | 'picture-card'
}

interface ISelectC {
  value: { value: string | number; label: string }[]
}

interface IPasswordC {
  isConfirm?: boolean
}

export type { IFormItem, IIpfsUploadC, ISelectC, IPasswordC }
