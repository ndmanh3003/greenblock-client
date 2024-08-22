import { IRespond } from '../../../hooks'
import { instance } from '../../api'
import {
  IGetAllProductReq,
  IGetOverallProductRes,
  IHandleStatusProductReq,
  IProduct
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
