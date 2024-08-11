import { IRespond } from '../../../hooks'
import { instance } from '../../api'
import { IBatchReq, IBatchRes } from './batch.type'

export const getBatchApi = async (type: 'land' | 'variety') => {
  return await instance.get<IRespond<IBatchRes>>('/batch', {
    params: { type }
  })
}

export const updateBatchApi = async (data: IBatchReq) => {
  return await instance.put<IRespond<IBatchReq>>('/batch', data)
}
