import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import NProgress from 'nprogress'

import { tokensStorage } from '../localStorage/token'

type callback = (token: string) => void

let isRefreshing = false
const subscribers: callback[] = []

function onRefreshed(token: string) {
  subscribers.map((cb) => cb(token))
}

function subscribeTokenRefresh(cb: (token: string) => void) {
  subscribers.push(cb)
}

const logout = () => {
  tokensStorage.removeToken()
  window.location.href = ''
}

const refreshAccessToken = async () => {
  const auth = tokensStorage.getToken()
  if (!auth) {
    logout()
  }

  const refreshToken = auth?.refreshToken
  try {
    const timeout = setTimeout(() => {
      logout()
    }, 5000)

    const response = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/auth/refresh/${refreshToken}`
    )

    clearTimeout(timeout)

    if (response.status === 200) {
      tokensStorage.setToken(response.data.data)
      return response.data.data.accessToken
    }
  } catch (error) {
    logout()
  }
  return ''
}

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    NProgress.start()
    const auth = tokensStorage.getToken()
    if (
      config.headers &&
      !config.headers['Authorization'] &&
      auth !== undefined &&
      auth !== null
    ) {
      config.headers['Authorization'] = `Bearer ${auth.accessToken}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done()
    return response
  },
  async (error: AxiosError) => {
    const { config } = error
    const originalRequest = config

    if (error?.code === 'ERR_NETWORK') {
      window.location.href = import.meta.env.VITE_API_ERROR_PAGE
      NProgress.done()
      return
    } else if (error?.response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true
        refreshAccessToken().then((newToken) => {
          isRefreshing = false
          onRefreshed(newToken)
        })
      }

      const retryOrigReq = new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          if (originalRequest) {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            resolve(axios(originalRequest))
          }
        })
      })
      return retryOrigReq
    } else {
      NProgress.done()
    }
    return Promise.reject(error)
  }
)
