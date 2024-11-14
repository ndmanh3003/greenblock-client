import {
  ICreateProductReq,
  IGetAllProductReq,
  IGetAllProductRes,
  IGetStatisticsProductRes,
  IHandleRecordReq,
  IProduct,
  IUpdateProductReq
} from './product.type'

import { IRespond } from '@/hooks'
import { instance } from '@/service/api'

export const createProductApi = async (data: ICreateProductReq) => {
  return await instance.post<IRespond>('/product', data)
}

export const deleteProductApi = async (id: string) => {
  return await instance.delete<IRespond>('/product/' + id)
}

export const updateProductApi = async (data: IUpdateProductReq) => {
  return await instance.put<IRespond>('/product', data)
}

export const getAllProductApi = async (data: IGetAllProductReq) => {
  return await instance.get<IRespond<IGetAllProductRes>>('/product/all', {
    params: data
  })
}

export const getStatisticsProductApi = async () => {
  return await instance.get<IRespond<IGetStatisticsProductRes>>(
    '/product/statistics'
  )
}

export const handleRecordApi = async (data: IHandleRecordReq) => {
  return await instance.put<IRespond>('/product/record', data)
}

export const getProductDetailApi = async (id: string) => {
  return await instance.get<IRespond<IProduct>>('/product/' + id)
}
