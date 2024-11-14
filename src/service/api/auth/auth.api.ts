import {
  IAccount,
  IGetAllReq,
  ILoginReq,
  ILoginRes,
  IRegisterReq,
  IVerifyReq
} from './auth.type'
import { IRespond } from '@/hooks'
import { instance } from '@/service/api'

export const loginApi = async (data: ILoginReq) => {
  return await instance.post<IRespond<ILoginRes>>('/auth/login', data)
}

export const registerApi = async (data: IRegisterReq) => {
  return await instance.post<IRespond>('/auth/register', data)
}

export const getmeApi = async () => {
  return await instance.get<IRespond<IAccount>>('/auth/getme')
}

export const logoutApi = async () => {
  return await instance.delete<IRespond>('/auth/logout')
}

export const getAllApi = async (data: IGetAllReq) => {
  return await instance.get<IRespond<IAccount[]>>('/auth/all', { params: data })
}

export const verifyApi = async (data: IVerifyReq) => {
  return await instance.put<IRespond>('/auth/verify', data)
}
