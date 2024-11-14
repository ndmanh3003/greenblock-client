import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import {
  getAllApi,
  getmeApi,
  loginApi,
  logoutApi,
  registerApi,
  verifyApi
} from './auth.api'
import { IGetAllReq, IVerifyReq } from './auth.type'
import { _roles } from '@/assets/options'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { tokensStorage } from '@/service/localStorage'
import { clearAccount, selectUser } from '@/service/store/user'

export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginApi
  })

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: registerApi
  })

export const useGetMeQuery = () => {
  const user = useAppSelector(selectUser)
  const auth = tokensStorage.getToken()

  return useQuery({
    queryKey: ['getme'],
    queryFn: getmeApi,
    enabled: !user.name || !auth
  })
}

export const useLogoutMutation = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      tokensStorage.removeToken()
      dispatch(clearAccount())
      navigate('/')
    }
  })
}

export const useGetAllQuery = (data: IGetAllReq) =>
  useQuery({
    queryKey: ['account', data.type, data.code],
    queryFn: () => getAllApi(data),
    enabled: _roles.includes(data.type)
  })

export const useVerifyMutation = () =>
  useMutation({
    mutationFn: (data: IVerifyReq) => verifyApi(data)
  })
