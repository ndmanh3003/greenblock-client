/* eslint-disable no-unused-vars */
export interface IRecord {
  setData: (data: IStatus) => void
  setCurrent: (current: number) => void
  data: IStatus | undefined
}

export interface IStatus {
  businessId: string
  code: string

  productId: string
  isHarvested?: boolean
  isDeleted?: boolean

  img?: string[]
  desc?: string
  quantityOut?: number
}
