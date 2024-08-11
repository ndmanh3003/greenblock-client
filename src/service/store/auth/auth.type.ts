export interface ILoginReq {
  email: string
  password: string
  isBusiness: boolean
}

export interface ILoginRes {
  accessToken: string
  refreshToken: string
  isBusiness: boolean
  name: string
}

export interface IRegisterReq {
  name: string
  email: string
  password: string
  isBusiness: boolean
  cert: string
}

export interface IGetMeRes {
  name: string
  email: string
  isBusiness: boolean
  cert: string
}

export interface IAccount {
  _id: string
  name: string
  email: string
  cert: string
  isBusiness: boolean
}

export interface IGetAllReq {
  type: 'business' | 'inspector'
  code?: string
}
