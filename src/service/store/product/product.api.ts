import { IRespond } from '../../../hooks'
import { instance } from '../../api'
import {
  IGetAllProductReq,
  IGetOverallProductRes,
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
