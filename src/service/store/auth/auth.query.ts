import { useMutation } from '@tanstack/react-query'
import { loginApi } from './auth.api'

export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginApi
  })
