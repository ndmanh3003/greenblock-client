import { _order, _types } from '@/assets/options'

export interface IItem {
  _id: string
  name: string
  updatedAt: string
}

export interface IUpdateItemReq {
  type: (typeof _types)[number]
  _id?: string
  name?: string
}

export interface IGetItemReq {
  type: (typeof _types)[number]
  page?: number
  limit?: number
  sortBy?: string
  order?: (typeof _order)[number]
  filterBy?: string
  filterValue?: string
}

export interface IGetAllItemsRes {
  totalItems: number
  items: IItem[]
  currentPage: number
  totalPages: number
  limit: number
}
