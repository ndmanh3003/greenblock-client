import { useMutation, useQuery } from '@tanstack/react-query'
import { changeCodeApi, getBatchApi, updateBatchApi } from './batch.api'
import { IBatchReq } from './batch.type'

export const useGetBatchQuery = (type: 'land' | 'variety') =>
  useQuery({
    queryKey: ['items', type],
    queryFn: () => getBatchApi(type)
  })

export const useUpdateBatchMutation = () =>
  useMutation({
    mutationFn: (data: IBatchReq) => updateBatchApi(data)
  })

export const useChangeCodeMutation = () =>
  useMutation({
    mutationFn: (code: string) => changeCodeApi(code)
  })
