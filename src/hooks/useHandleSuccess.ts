/* eslint-disable react-hooks/exhaustive-deps */
import { message } from 'antd'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'

export interface IRespond<T = undefined> {
  message: string
  data?: T
}

export const useHandleSuccess = <T>(
  response: AxiosResponse<IRespond<T>> | null | undefined,
  isMessage?: boolean,
  // eslint-disable-next-line no-unused-vars
  fn?: (data: T) => void
) => {
  useEffect(() => {
    if (!response) return

    const { message: messageD, data } = response.data

    if (isMessage) message.success(messageD)
    fn?.(data as T)
  }, [response])
}
