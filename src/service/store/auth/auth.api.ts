import { IRespond } from '../../../hooks'
import { instance } from '../../api'
import {
  IAccount,
  IGetAllReq,
  IGetMeRes,
  ILoginReq,
  ILoginRes
} from './auth.type'

export const loginApi = async (data: ILoginReq) => {
  return await instance.post<IRespond<ILoginRes>>('/auth/login', data)
}

export const registerApi = async (data: ILoginReq) => {
  return await instance.post<IRespond>('/auth/register', data)
}

export const getmeApi = async () => {
  return await instance.get<IRespond<IGetMeRes>>('/auth')
}

export const logoutApi = async () => {
  return await instance.delete<IRespond>('/auth/logout')
}

export const getAllApi = async (data: IGetAllReq) => {
  return await instance.get<IRespond<IAccount[]>>('/auth/all', { params: data })
}

export const verifyApi = async (accountId: string, isVerified: boolean) => {
  return await instance.put<IRespond>('/auth', { accountId, isVerified })
}
