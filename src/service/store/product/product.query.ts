import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createProductApi,
  deleteProductApi,
  getAllProductApi,
  getOverallProductApi,
  getProductDetailApi,
  handleStatusProductApi,
  updateProductApi
} from './product.api'
import {
  ICreateProductReq,
  IGetAllProductReq,
  IHandleStatusProductReq,
  IUpdateProductReq
} from './product.type'

export const useGetOverallProductQuery = () =>
  useQuery({
    queryKey: ['overall', 'product'],
    queryFn: () => getOverallProductApi()
  })

export const useGetAllProductQuery = (data: IGetAllProductReq) =>
  useQuery({
    queryKey: ['allproduct', data.businessId, data.code],
    queryFn: () => getAllProductApi(data)
  })

export const useHandleStatusProductMutation = () => {
  return useMutation({
    mutationFn: (data: IHandleStatusProductReq) => handleStatusProductApi(data)
  })
}

export const useGetProductDetailQuery = (id: string) =>
  useQuery({
    queryKey: ['detail', id],
    queryFn: () => getProductDetailApi(id),
    enabled: !!id
  })

export const useUpdateProductMutation = () => {
  return useMutation({
    mutationFn: (data: IUpdateProductReq) => updateProductApi(data)
  })
}

export const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProductApi(id)
  })
}

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: (data: ICreateProductReq) => createProductApi(data)
  })
}
