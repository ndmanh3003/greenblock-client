import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getAllProductApi,
  getOverallProductApi,
  handleStatusProductApi
} from './product.api'
import { IGetAllProductReq, IHandleStatusProductReq } from './product.type'

export const useGetOverallProductQuery = () =>
  useQuery({
    queryKey: ['overall', 'product'],
    queryFn: () => getOverallProductApi()
  })

export const useGetAllProductQuery = (data: IGetAllProductReq) =>
  useQuery({
    queryKey: ['all', data.businessId, data.code],
    queryFn: () => getAllProductApi(data)
  })

export const useHandleStatusProductMutation = () => {
  return useMutation({
    mutationFn: (data: IHandleStatusProductReq) => handleStatusProductApi(data)
  })
}
