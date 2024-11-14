import { _roles } from '@/assets/options'

export interface IAccount {
  _id: string
  name: string
  email: string
  cert: string
  isBusiness: boolean
}

export interface ILoginRes {
  accessToken: string
  refreshToken: string
}

export interface ILoginReq {
  email: string
  password: string
  isBusiness: boolean
}

export interface IRegisterReq {
  name: string
  email: string
  password: string
  isBusiness: boolean
  cert: string
}

export interface IGetAllReq {
  type: (typeof _roles)[number]
  code?: string
}

export interface IVerifyReq {
  accountId: string
  isVerified: boolean
}
