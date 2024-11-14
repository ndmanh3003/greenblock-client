import { useMutation, useQuery } from '@tanstack/react-query'

import {
  createProductApi,
  deleteProductApi,
  getAllProductApi,
  getProductDetailApi,
  getStatisticsProductApi,
  handleRecordApi,
  updateProductApi
} from './product.api'
import {
  ICreateProductReq,
  IGetAllProductReq,
  IHandleRecordReq,
  IUpdateProductReq
} from './product.type'

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: (data: ICreateProductReq) => createProductApi(data)
  })
}

export const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProductApi(id)
  })
}

export const useGetAllProductQuery = (data: IGetAllProductReq) =>
  useQuery({
    queryKey: ['product', 'all', data.businessId, data.code],
    queryFn: () => getAllProductApi(data)
  })

export const useUpdateProductMutation = () => {
  return useMutation({
    mutationFn: (data: IUpdateProductReq) => updateProductApi(data)
  })
}

export const useGetStatisticsProduct = () =>
  useQuery({
    queryKey: ['product', 'statistics'],
    queryFn: () => getStatisticsProductApi()
  })

export const useHandleRecordMutation = () => {
  return useMutation({
    mutationFn: (data: IHandleRecordReq) => handleRecordApi(data)
  })
}

export const useGetProductDetailQuery = (id: string) =>
  useQuery({
    queryKey: ['product', 'detail', id],
    queryFn: () => getProductDetailApi(id),
    enabled: !!id
  })
