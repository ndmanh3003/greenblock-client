import { useMutation, useQuery } from '@tanstack/react-query'
import { getmeApi, loginApi, logoutApi, registerApi } from './auth.api'

export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginApi
  })

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: registerApi
  })

export const useGetMeQuery = () =>
  useQuery({
    queryKey: ['info'],
    queryFn: getmeApi
  })

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: logoutApi
  })
