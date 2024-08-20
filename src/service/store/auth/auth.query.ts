import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getAllApi,
  getmeApi,
  loginApi,
  logoutApi,
  registerApi,
  verifyApi
} from './auth.api'
import { IGetAllReq } from './auth.type'

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

export const useGetAllQuery = (data: IGetAllReq) =>
  useQuery({
    queryKey: ['all', data.type, data.code],
    queryFn: () => getAllApi(data),
    enabled: false
  })

export const useVerifyMutation = () =>
  useMutation({
    mutationFn: (data: { accountId: string; isVerified: boolean }) =>
      verifyApi(data.accountId, data.isVerified)
  })
