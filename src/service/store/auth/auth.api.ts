import { instance } from '../../api'
import { ILoginReq } from './auth.type'

export const loginApi = async (data: ILoginReq) => {
  return await instance.post('/auth/login', data)
}
