import { useQuery } from '@tanstack/react-query'
import { getAllProductApi, getOverallProductApi } from './product.api'
import { IGetAllProductReq } from './product.type'

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
