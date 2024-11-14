import { IItem } from '../batch'
import { _currents } from '@/assets/options'

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
  current: (typeof _currents)[keyof typeof _currents]
  record: IStatus[]
  business: IAccount
  variety: Omit<IItem, 'updatedAt'>
  land: Omit<IItem, 'updatedAt'>

  inspector: IAccount
  cert?: string
  quality?: number
  desc?: string

  exportAt?: string
}

export interface ICreateProductReq {
  name: string
  varietyId: string
  landId: string
  inspectorId: string
}

export interface IGetStatisticsProductRes {
  total: number
  planting: number
  harvested: number
  inspecting: number
  inspected: number
  exported: number
  sold: number
  code: string
}

export interface IGetAllProductRes {
  totalProducts: number
  currentPage: number
  limit: number
  totalPages: number

  products: Pick<
    IProduct,
    '_id' | 'name' | 'current' | 'business' | 'inspector'
  >[]
}

export interface IGetAllProductReq {
  businessId?: string
  code?: string

  page?: number
  limit?: number
  filterCurrent?: (typeof _currents)[keyof typeof _currents][]
  searchValue?: string
}

export interface IHandleRecordReq {
  code: string
  productId: string
  businessId: string

  isHarvested?: 1 | 0 | -1

  img?: string[]
  desc?: string
}

export interface IUpdateProductReq {
  productId: string
  name?: string
  desc?: string
  current?: (typeof _currents)[keyof typeof _currents]

  quality?: number
  cert?: string
}
