import { IRespond } from '../../../hooks'
import { instance } from '../../api'
import {
  ICreateProductReq,
  IGetAllProductReq,
  IGetOverallProductRes,
  IHandleStatusProductReq,
  IProduct,
  IUpdateProductReq
} from './product.type'

export const getOverallProductApi = async () => {
  return await instance.get<IRespond<IGetOverallProductRes>>('/product/overall')
}

export const getAllProductApi = async (data: IGetAllProductReq) => {
  return await instance.get<IRespond<IProduct[]>>('/product', {
    params: data
  })
}

export const handleStatusProductApi = async (data: IHandleStatusProductReq) => {
  return await instance.put<IRespond>('/product/record', data)
}

export const getProductDetailApi = async (id: string) => {
  return await instance.get<IRespond<IProduct>>('/product/' + id)
}

export const updateProductApi = async (data: IUpdateProductReq) => {
  return await instance.put<IRespond>('/product', data)
}

export const deleteProductApi = async (id: string) => {
  return await instance.delete<IRespond>('/product/' + id)
}

export const createProductApi = async (data: ICreateProductReq) => {
  return await instance.post<IRespond>('/product', data)
}
