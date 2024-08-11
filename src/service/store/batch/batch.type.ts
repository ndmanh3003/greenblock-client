export interface IItem {
  _id: string
  name: string
  product: string[]
  metadata: {
    quantity?: number
  }
}

export interface IBatchRes {
  items: IItem[]
  empty: number
  planting?: number
  available?: number
}

export interface IBatchReq {
  type: 'land' | 'variety'
  items: {
    name?: string
    itemId?: string
    quantity?: number
  }[]
}
