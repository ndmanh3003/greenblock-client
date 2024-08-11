import { message } from 'antd'
import { useEffect } from 'react'

interface IError {
  response: {
    data: {
      error_key?: string
      message: string
    }
  }
  code?: string
}

export const useHandleError = (err: unknown[]) => {
  useEffect(() => {
    if (!err || err.length === 0) return

    const errors = err as IError[]

    errors.forEach((error) => {
      if (error === undefined || error === null) return

      message.error(error.response.data.message)
    })
  }, [err])
}
