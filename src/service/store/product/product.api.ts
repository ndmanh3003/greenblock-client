import { IRespond } from '../../../hooks'
import { instance } from '../../api'
import { IGetOverallProductRes } from './product.type'

export const getOverallProductApi = async () => {
  return await instance.get<IRespond<IGetOverallProductRes>>('/product/overall')
}
