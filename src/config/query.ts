import { QueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { IError } from '@/hooks'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    },
    mutations: {
      retry: false,
      onError: (error: Error) => {
        const err = error as unknown as IError
        message.error(err.response.data.message)
      }
    }
  }
})
