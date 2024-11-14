import { IGetAllItemsRes, IGetItemReq, IUpdateItemReq } from './batch.type'
import { IRespond } from '@/hooks'
import { instance } from '@/service/api'

export const getBatchApi = async (data: IGetItemReq) => {
  return await instance.get<IRespond<IGetAllItemsRes>>('/batch/item', {
    params: data
  })
}

export const updateBatchApi = async (data: IUpdateItemReq) => {
  return await instance.put<IRespond>('/batch/item', data)
}

export const changeCodeApi = async (code: string) => {
  return await instance.put<IRespond>('/batch/code/' + code)
}
