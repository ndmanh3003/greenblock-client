import { allCurrent } from '.'

export interface IGetOverallProductRes {
  total: number
  planting: number
  harvested: number
  inspecting: number
  inspected: number
  exported: number
  sold: number
  code: string
}

export interface IAccount {
  _id: string
  name: string
}

export interface IStatus {
  time: Date
  desc: string
  img: string[]
}

export interface IProduct {
  _id: string
  name: string
  current: (typeof allCurrent)[keyof typeof allCurrent]
  quantityIn: number
  record: number | IStatus[]
  business: IAccount
  variety: string
  land: string

  inspector: IAccount
  quantityOut?: number
  cert?: string
  quality?: number
  desc?: string

  exportAt?: string
}

export interface IGetAllProductReq {
  businessId?: string
  code?: string
}

export interface IHandleStatusProductReq {
  businessId: string
  productId: string
  code: string
  isDelete?: boolean
  img?: string[]
  desc?: string
  isHarvested?: boolean
  quantityOut?: number
}

export interface IUpdateProductReq {
  productId: string
  name?: string
  desc?: string
  current?: (typeof allCurrent)[keyof typeof allCurrent]
  quantityOut?: number
  inspector?: string
  quality?: number
  cert?: string
}

export interface ICreateProductReq {
  name: string
  variety: string
  land: string
  inspector: string
  quantityIn: number
}
