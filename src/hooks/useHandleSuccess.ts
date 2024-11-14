import { message as messageAntd } from 'antd'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'

export interface IRespond<T = undefined> {
  message: string
  data?: T
}

export const useHandleSuccess = <T>(
  response: AxiosResponse<IRespond<T>> | null | undefined,
  message?: string | false,
  fn?: (data: T) => void
) => {
  useEffect(() => {
    if (!response) {
      return
    }

    if (message) {
      messageAntd.success(message)
    }

    fn?.(response.data.data as T)
  }, [response])
}
