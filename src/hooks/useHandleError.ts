import { message } from 'antd'
import { useEffect } from 'react'

export interface IError {
  response: {
    data: {
      error_key?: string
      message: string
    }
  }
}

export const useHandleError = (errs: unknown[], fn?: () => void) => {
  useEffect(() => {
    if (!errs || errs.length === 0) {
      return
    }

    errs.forEach((err) => {
      if (err === undefined || err === null) {
        return
      }
      fn?.()
      message.error((err as IError).response.data.message)
    })
  }, errs)
}
