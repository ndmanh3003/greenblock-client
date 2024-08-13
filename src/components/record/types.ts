/* eslint-disable no-unused-vars */
import React from 'react'

export interface IState {
  data?: IStatus
  current: number
}

export type Action =
  | { type: 'UPDATE_CURRENT'; payload: number }
  | { type: 'UPDATE_DATA'; payload: IStatus }

export interface IRecord {
  state: IState
  dispatch: React.Dispatch<Action>
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
