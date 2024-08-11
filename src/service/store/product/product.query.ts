import { useQuery } from '@tanstack/react-query'
import { getOverallProductApi } from './product.api'

export const useGetOverallProductQuery = () =>
  useQuery({
    queryKey: ['overall', 'product'],
    queryFn: () => getOverallProductApi()
  })
