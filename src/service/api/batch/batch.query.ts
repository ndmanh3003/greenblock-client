import { useMutation, useQuery } from '@tanstack/react-query'

import { changeCodeApi, getBatchApi, updateBatchApi } from './batch.api'
import { IGetItemReq, IUpdateItemReq } from './batch.type'

export const useGetBatchQuery = (data: IGetItemReq) =>
  useQuery({
    queryKey: ['item', data],
    queryFn: () => getBatchApi(data)
  })

export const useUpdateBatchMutation = () =>
  useMutation({
    mutationFn: (data: IUpdateItemReq) => updateBatchApi(data)
  })

export const useChangeCodeMutation = () =>
  useMutation({
    mutationFn: (code: string) => changeCodeApi(code)
  })
